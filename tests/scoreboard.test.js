import test from 'node:test';
import assert from 'node:assert/strict';
import { Scoreboard, boardName, cleanRows, BOARD_SIZE, SCORE_CAP } from '../src/cloud/scoreboard.js';
import { createMockCloud } from '../src/cloud/mockCloud.js';

/** A fake server: rows by uid, optional failures, a log of what was asked. */
function fakeCloud(rows = {}) {
  const c = {
    rows: { ...rows },
    online: true,
    calls: [],
    async topScores(n) {
      c.calls.push(['top', n]);
      if (!c.online) throw new Error('offline');
      return Object.entries(c.rows)
        .map(([uid, r]) => ({ uid, ...r }))
        .sort((a, b) => b.score - a.score)
        .slice(0, n);
    },
    async submitScore(uid, { name, score }) {
      c.calls.push(['submit', uid, name, score]);
      if (!c.online) throw new Error('offline');
      const old = c.rows[uid]?.score ?? -1;
      if (score <= old) return { ok: false, best: old };
      c.rows[uid] = { name, score };
      return { ok: true, best: score };
    },
  };
  return c;
}
const ANA = { uid: 'u-ana', name: 'Ana Pop' };
function board(cloud, o = {}) {
  const env = { user: ANA, local: 0, t: 0, changes: 0, ...o };
  const sb = new Scoreboard({ cloud, getUser: () => env.user, localBest: () => env.local, onChange: () => env.changes++, now: () => env.t });
  return { sb, env };
}

test('scoreboard: names are cleaned for display, the list is sorted, capped and has one row per account', () => {
  assert.equal(boardName('  Ana   <b>Pop</b>\n'), 'Ana bPop/b');
  assert.equal(boardName(''), 'Jucător');
  assert.equal(boardName(null), 'Jucător');
  assert.equal(Array.from(boardName('x'.repeat(50))).length, 20);
  const rows = cleanRows([
    { uid: 'a', name: 'A', score: 10 },
    { uid: 'b', name: 'B', score: 30.9 },
    { uid: 'a', name: 'A again', score: 99 },
    { uid: 'c', name: 'C', score: -1 },
    { uid: 'd', name: 'D', score: NaN },
    { uid: '', name: 'E', score: 5 },
    null,
    'x',
    { uid: 'f', name: 'F', score: 1e12 },
  ]);
  assert.deepEqual(rows, [
    { id: 'f', name: 'F', score: SCORE_CAP },
    { id: 'b', name: 'B', score: 30 },
    { id: 'a', name: 'A', score: 10 },
  ]);
  assert.deepEqual(cleanRows('garbage'), []);
  const many = Array.from({ length: 50 }, (_, i) => ({ uid: `u${i}`, name: `N${i}`, score: i }));
  assert.equal(cleanRows(many).length, BOARD_SIZE);
});

test('scoreboard: without a server it is off and never throws', async () => {
  const { sb } = board(null);
  assert.equal(sb.available, false);
  assert.equal(sb.status, 'off');
  assert.equal(await sb.refresh(), false);
  assert.deepEqual(await sb.submit(100), { ok: false, reason: 'off' });
  await sb.sync();
  assert.equal(sb.user, null);
});

test('scoreboard: everybody sees the same list; a guest can read it but cannot be in it', async () => {
  const cloud = fakeCloud({ 'u-bob': { name: 'Bob', score: 500 }, 'u-ana': { name: 'Ana Pop', score: 300 } });
  const { sb, env } = board(cloud, { user: null });
  assert.equal(await sb.refresh(), true);
  assert.deepEqual(sb.rows.map((r) => [r.name, r.score]), [['Bob', 500], ['Ana Pop', 300]]);
  assert.equal(sb.myRank, 0);
  assert.deepEqual(await sb.submit(9999), { ok: false, reason: 'guest' });
  env.local = 9999;
  await sb.sync(true);
  assert.equal(cloud.calls.filter((c) => c[0] === 'submit').length, 0, 'a guest never writes');
  assert.equal(cloud.rows['u-bob'].score, 500);
});

test('scoreboard: a score is saved under the account name; only a better one replaces it', async () => {
  const cloud = fakeCloud({ 'u-bob': { name: 'Bob', score: 500 } });
  const { sb } = board(cloud);
  await sb.refresh();
  let r = await sb.submit(300);
  assert.deepEqual(r, { ok: true, improved: true, best: 300, rank: 2 });
  assert.deepEqual(cloud.rows['u-ana'], { name: 'Ana Pop', score: 300 });
  r = await sb.submit(200);
  assert.deepEqual(r, { ok: true, improved: false, best: 300, rank: 2 });
  assert.equal(cloud.calls.filter((c) => c[0] === 'submit').length, 1, 'a worse score is not even sent');
  r = await sb.submit(800);
  assert.deepEqual(r, { ok: true, improved: true, best: 800, rank: 1 });
  assert.deepEqual(sb.rows.map((x) => x.name), ['Ana Pop', 'Bob']);
  assert.equal(sb.myBest, 800);
  assert.equal((await sb.submit(0)).improved, false);
  assert.equal((await sb.submit(-5)).improved, false);
});

test('scoreboard: another device with an older, lower record cannot overwrite the better one', async () => {
  const cloud = fakeCloud({ 'u-ana': { name: 'Ana Pop', score: 900 } });
  const { sb } = board(cloud); // a fresh device: it does not know the 900 yet
  const r = await sb.submit(400);
  assert.deepEqual(r, { ok: true, improved: false, best: 900, rank: 1 });
  assert.equal(cloud.rows['u-ana'].score, 900);
  assert.equal(sb.myBest, 900);
});

test('scoreboard: offline nothing breaks, and the best local score is sent when the connection is back', async () => {
  const cloud = fakeCloud({ 'u-bob': { name: 'Bob', score: 500 } });
  const { sb, env } = board(cloud);
  await sb.refresh();
  cloud.online = false;
  assert.deepEqual(await sb.submit(700), { ok: false, reason: 'offline' });
  assert.equal(sb.status, 'offline');
  assert.deepEqual(sb.rows.map((x) => x.name), ['Bob'], 'the list stays as it was');
  env.local = 700; // the run was saved on the device
  env.t += 60000;
  await sb.sync();
  assert.equal(cloud.rows['u-ana'], undefined);
  cloud.online = true;
  env.t += 60000;
  await sb.sync();
  assert.deepEqual(cloud.rows['u-ana'], { name: 'Ana Pop', score: 700 });
  assert.equal(sb.status, 'ready');
  assert.equal(sb.myRank, 1);
});

test('scoreboard: the list is not requested more often than the minimum gap, unless forced', async () => {
  const cloud = fakeCloud();
  const { sb, env } = board(cloud, { user: null });
  await sb.refresh();
  await sb.refresh();
  env.t += 5000;
  await sb.refresh();
  assert.equal(cloud.calls.length, 1);
  await sb.refresh(true);
  env.t += 30000;
  await sb.refresh();
  assert.equal(cloud.calls.length, 3);
  // two calls at the same time share one request
  env.t += 30000;
  await Promise.all([sb.refresh(), sb.refresh()]);
  assert.equal(cloud.calls.length, 4);
});

test('scoreboard: sync does not resend a local best that is already on the server', async () => {
  const cloud = fakeCloud({ 'u-ana': { name: 'Ana Pop', score: 700 } });
  const { sb, env } = board(cloud, { local: 700 });
  await sb.sync();
  env.local = 650;
  env.t += 60000;
  await sb.sync();
  assert.equal(cloud.calls.filter((c) => c[0] === 'submit').length, 0);
});

test('scoreboard: switching accounts never mixes their records', async () => {
  const cloud = fakeCloud();
  const { sb, env } = board(cloud);
  await sb.submit(500);
  env.user = { uid: 'u-dan', name: 'Dan' };
  assert.equal(sb.myBest, null);
  const r = await sb.submit(100);
  assert.equal(r.improved, true);
  assert.deepEqual(cloud.rows, { 'u-ana': { name: 'Ana Pop', score: 500 }, 'u-dan': { name: 'Dan', score: 100 } });
});

test('mock cloud: the fake server enforces the same rules (own row, account name, only upward)', async () => {
  const { auth, cloud, users } = createMockCloud({ providers: ['google'], isOnline: () => true });
  auth.onChange(() => {});
  await assert.rejects(cloud.submitScore(users.google.uid, { name: 'x', score: 10 }), /permission/, 'signed out');
  await auth.signIn('google');
  await assert.rejects(cloud.submitScore('someone-else', { name: 'x', score: 10 }), /permission/);
  assert.deepEqual(await cloud.submitScore(users.google.uid, { name: 'Hacker', score: 10 }), { ok: true, best: 10 });
  assert.deepEqual(await cloud.submitScore(users.google.uid, { name: 'Hacker', score: 5 }), { ok: false, best: 10 });
  assert.deepEqual(await cloud.topScores(5), [{ uid: users.google.uid, name: users.google.name, score: 10 }], 'the name is the account name, not what was sent');
});
