/**
 * Accounts ("Continuă cu Google / Apple"): configuration.
 *
 * The game signs players in and keeps their progress through Firebase (Authentication + Firestore).
 * Paste the web-app configuration of YOUR Firebase project below (Firebase console -> Project
 * settings -> Your apps -> Web app -> "firebaseConfig"). These values are not secret: they only
 * say which project to talk to; who may read or write what is decided by the Firestore rules
 * (see README, "Conturi").
 *
 * While FIREBASE_CONFIG is null the game has no real login: everybody plays as a guest and the
 * progress stays on the device, exactly like before.
 */
export const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyBtVlFhDS3n30FlxSRdr_LLn1uuPNd9lMI',
  authDomain: 'brasov-runnerbrasov-runner.firebaseapp.com',
  projectId: 'brasov-runnerbrasov-runner',
  storageBucket: 'brasov-runnerbrasov-runner.firebasestorage.app',
  messagingSenderId: '367225327407',
  appId: '1:367225327407:web:f41598a6be6261cbbbdbda',
};
/* Example:
export const FIREBASE_CONFIG = {
  apiKey: 'AIza...',
  authDomain: 'brasov-runner.firebaseapp.com',
  projectId: 'brasov-runner',
  appId: '1:1234567890:web:abcdef',
};
*/

/**
 * Which sign-in buttons are shown. Only Google: it is free. Apple sign-in needs a paid Apple
 * Developer account (99 USD / year); the code for it is ready, add 'apple' here to switch it on.
 */
export const LOGIN_PROVIDERS = ['google'];

export const PROVIDER_NAMES = { google: 'Google', apple: 'Apple' };
