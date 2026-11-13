var e=Object.defineProperty,t=(t,n)=>{let r={};for(var i in t)e(r,i,{get:t[i],enumerable:!0});return n||e(r,Symbol.toStringTag,{value:`Module`}),r};(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var n=1e3,r=1001,i=1002,a=1003,o=1004,s=1005,c=1006,l=1007,u=1008,d=1009,f=1010,p=1011,m=1012,h=1013,g=1014,_=1015,v=1016,y=1017,b=1018,x=1020,S=35902,C=35899,w=1021,T=1022,E=1023,D=1026,ee=1027,O=1028,k=1029,A=1030,te=1031,ne=1033,j=33776,re=33777,M=33778,ie=33779,ae=35840,oe=35841,se=35842,ce=35843,le=36196,ue=37492,N=37496,de=37488,fe=37489,pe=37490,me=37491,he=37808,ge=37809,_e=37810,ve=37811,ye=37812,be=37813,xe=37814,Se=37815,Ce=37816,we=37817,Te=37818,Ee=37819,De=37820,Oe=37821,ke=36492,Ae=36494,je=36495,Me=36283,Ne=36284,Pe=36285,P=36286,Fe=2300,Ie=2301,Le=2302,F=2303,Re=2400,ze=2401,Be=2402,Ve=3200,He=`srgb`,Ue=`srgb-linear`,We=`linear`,Ge=`srgb`,Ke=7680,qe=35044,Je=35048,Ye=2e3;function Xe(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Ze(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Qe(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function $e(){let e=Qe(`canvas`);return e.style.display=`block`,e}var et={};function tt(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function nt(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function I(...e){e=nt(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function rt(...e){e=nt(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function it(...e){let t=e.join(` `);t in et||(et[t]=!0,I(...e))}function at(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var ot={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},st=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},ct=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),lt=1234567,ut=Math.PI/180,dt=180/Math.PI;function ft(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(ct[e&255]+ct[e>>8&255]+ct[e>>16&255]+ct[e>>24&255]+`-`+ct[t&255]+ct[t>>8&255]+`-`+ct[t>>16&15|64]+ct[t>>24&255]+`-`+ct[n&63|128]+ct[n>>8&255]+`-`+ct[n>>16&255]+ct[n>>24&255]+ct[r&255]+ct[r>>8&255]+ct[r>>16&255]+ct[r>>24&255]).toLowerCase()}function pt(e,t,n){return Math.max(t,Math.min(n,e))}function mt(e,t){return(e%t+t)%t}function ht(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function gt(e,t,n){return e===t?0:(n-e)/(t-e)}function _t(e,t,n){return(1-n)*e+n*t}function vt(e,t,n,r){return _t(e,t,1-Math.exp(-n*r))}function yt(e,t=1){return t-Math.abs(mt(e,t*2)-t)}function bt(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function xt(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function St(e,t){return e+Math.floor(Math.random()*(t-e+1))}function Ct(e,t){return e+Math.random()*(t-e)}function wt(e){return e*(.5-Math.random())}function Tt(e){e!==void 0&&(lt=e);let t=lt+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Et(e){return e*ut}function Dt(e){return e*dt}function Ot(e){return e>0&&Number.isInteger(e)&&2**Math.round(Math.log2(e))===e}function kt(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function At(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function jt(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:I(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function Mt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function Nt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var Pt={DEG2RAD:ut,RAD2DEG:dt,generateUUID:ft,clamp:pt,euclideanModulo:mt,mapLinear:ht,inverseLerp:gt,lerp:_t,damp:vt,pingpong:yt,smoothstep:bt,smootherstep:xt,randInt:St,randFloat:Ct,randFloatSpread:wt,seededRandom:Tt,degToRad:Et,radToDeg:Dt,isPowerOfTwo:Ot,ceilPowerOfTwo:kt,floorPowerOfTwo:At,setQuaternionFromProperEuler:jt,normalize:Nt,denormalize:Mt},L=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=pt(this.x,e.x,t.x),this.y=pt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=pt(this.x,e,t),this.y=pt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(pt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(pt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ft=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:I(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(pt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},R=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Lt.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Lt.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=pt(this.x,e.x,t.x),this.y=pt(this.y,e.y,t.y),this.z=pt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=pt(this.x,e,t),this.y=pt(this.y,e,t),this.z=pt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(pt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return It.copy(this).projectOnVector(e),this.sub(It)}reflect(e){return this.sub(It.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(pt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},It=new R,Lt=new Ft,Rt=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return it(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(zt.makeScale(e,t)),this}rotate(e){return it(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(zt.makeRotation(-e)),this}translate(e,t){return it(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(zt.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},zt=new Rt,Bt=new Rt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Vt=new Rt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ht(){let e={enabled:!0,workingColorSpace:Ue,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===`srgb`&&(e.r=Wt(e.r),e.g=Wt(e.g),e.b=Wt(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=Gt(e.r),e.g=Gt(e.g),e.b=Gt(e.b))),e},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?We:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return it(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return it(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[Ue]:{primaries:t,whitePoint:r,transfer:We,toXYZ:Bt,fromXYZ:Vt,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:He},outputColorSpaceConfig:{drawingBufferColorSpace:He}},[He]:{primaries:t,whitePoint:r,transfer:Ge,toXYZ:Bt,fromXYZ:Vt,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:He}}}),e}var Ut=Ht();function Wt(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function Gt(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var Kt,qt=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Kt===void 0&&(Kt=Qe(`canvas`)),Kt.width=e.width,Kt.height=e.height;let t=Kt.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Kt}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=Qe(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Wt(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Wt(t[e]/255)*255):t[e]=Wt(t[e]);return{data:t,width:e.width,height:e.height}}return I(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Jt=0,Yt=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Jt++}),this.uuid=ft(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Xt(r[t].image)):e.push(Xt(r[t]))}else e=Xt(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Xt(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?qt.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(I(`Texture: Unable to serialize Texture.`),{})}var Zt=0,Qt=new R,$t=class e extends st{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,i=r,a=r,o=c,s=u,l=E,f=d,p=e.DEFAULT_ANISOTROPY,m=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Zt++}),this.uuid=ft(),this.name=``,this.source=new Yt(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=o,this.minFilter=s,this.anisotropy=p,this.format=l,this.internalFormat=null,this.type=f,this.offset=new L(0,0),this.repeat=new L(1,1),this.center=new L(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Rt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=m,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Qt).x}get height(){return this.source.getSize(Qt).y}get depth(){return this.source.getSize(Qt).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){I(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?I(`Texture.setValues(): property '${t}' does not exist.`):r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case n:e.x-=Math.floor(e.x);break;case r:e.x=e.x<0?0:1;break;case i:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case n:e.y-=Math.floor(e.y);break;case r:e.y=e.y<0?0:1;break;case i:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};$t.DEFAULT_IMAGE=null,$t.DEFAULT_MAPPING=300,$t.DEFAULT_ANISOTROPY=1;var en=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=pt(this.x,e.x,t.x),this.y=pt(this.y,e.y,t.y),this.z=pt(this.z,e.z,t.z),this.w=pt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=pt(this.x,e,t),this.y=pt(this.y,e,t),this.z=pt(this.z,e,t),this.w=pt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(pt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},tn=class extends st{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:c,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new en(0,0,e,t),this.scissorTest=!1,this.viewport=new en(0,0,e,t),this.textures=[];let r=new $t({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:c,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Yt(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},nn=class extends tn{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},rn=class extends $t{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=a,this.minFilter=a,this.wrapR=r,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},an=class extends $t{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=a,this.minFilter=a,this.wrapR=r,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},on=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/sn.setFromMatrixColumn(e,0).length(),i=1/sn.setFromMatrixColumn(e,1).length(),a=1/sn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ln,e,un)}lookAt(e,t,n){let r=this.elements;return pn.subVectors(e,t),pn.lengthSq()===0&&(pn.z=1),pn.normalize(),dn.crossVectors(n,pn),dn.lengthSq()===0&&(Math.abs(n.z)===1?pn.x+=1e-4:pn.z+=1e-4,pn.normalize(),dn.crossVectors(n,pn)),dn.normalize(),fn.crossVectors(pn,dn),r[0]=dn.x,r[4]=fn.x,r[8]=pn.x,r[1]=dn.y,r[5]=fn.y,r[9]=pn.y,r[2]=dn.z,r[6]=fn.z,r[10]=pn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],ee=r[13],O=r[2],k=r[6],A=r[10],te=r[14],ne=r[3],j=r[7],re=r[11],M=r[15];return i[0]=a*x+o*T+s*O+c*ne,i[4]=a*S+o*E+s*k+c*j,i[8]=a*C+o*D+s*A+c*re,i[12]=a*w+o*ee+s*te+c*M,i[1]=l*x+u*T+d*O+f*ne,i[5]=l*S+u*E+d*k+f*j,i[9]=l*C+u*D+d*A+f*re,i[13]=l*w+u*ee+d*te+f*M,i[2]=p*x+m*T+h*O+g*ne,i[6]=p*S+m*E+h*k+g*j,i[10]=p*C+m*D+h*A+g*re,i[14]=p*w+m*ee+h*te+g*M,i[3]=_*x+v*T+y*O+b*ne,i[7]=_*S+v*E+y*k+b*j,i[11]=_*C+v*D+y*A+b*re,i[15]=_*w+v*ee+y*te+b*M,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,ee=d*g-f*h,O=_*ee-v*D+y*E+b*T-x*w+S*C;if(O===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let k=1/O;return e[0]=(o*ee-s*D+c*E)*k,e[1]=(r*D-n*ee-i*E)*k,e[2]=(m*S-h*x+g*b)*k,e[3]=(d*x-u*S-f*b)*k,e[4]=(s*T-a*ee-c*w)*k,e[5]=(t*ee-r*T+i*w)*k,e[6]=(h*y-p*S-g*v)*k,e[7]=(l*S-d*y+f*v)*k,e[8]=(a*D-o*T+c*C)*k,e[9]=(n*T-t*D-i*C)*k,e[10]=(p*x-m*y+g*_)*k,e[11]=(u*y-l*x-f*_)*k,e[12]=(o*w-a*E-s*C)*k,e[13]=(t*E-n*w+r*C)*k,e[14]=(m*v-p*b-h*_)*k,e[15]=(l*b-u*v+d*_)*k,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=sn.set(r[0],r[1],r[2]).length(),o=sn.set(r[4],r[5],r[6]).length(),s=sn.set(r[8],r[9],r[10]).length();i<0&&(a=-a),cn.copy(this);let c=1/a,l=1/o,u=1/s;return cn.elements[0]*=c,cn.elements[1]*=c,cn.elements[2]*=c,cn.elements[4]*=l,cn.elements[5]*=l,cn.elements[6]*=l,cn.elements[8]*=u,cn.elements[9]*=u,cn.elements[10]*=u,t.setFromRotationMatrix(cn),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=Ye,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Ye,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},sn=new R,cn=new on,ln=new R(0,0,0),un=new R(1,1,1),dn=new R,fn=new R,pn=new R,mn=new on,hn=new Ft,gn=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(pt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-pt(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(pt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-pt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(pt(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-pt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:I(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return mn.makeRotationFromQuaternion(e),this.setFromRotationMatrix(mn,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return hn.setFromEuler(this),this.setFromQuaternion(hn,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};gn.DEFAULT_ORDER=`XYZ`;var _n=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},vn=0,yn=new R,bn=new Ft,xn=new on,Sn=new R,Cn=new R,wn=new R,Tn=new Ft,En=new R(1,0,0),Dn=new R(0,1,0),On=new R(0,0,1),kn={type:`added`},An={type:`removed`},jn={type:`childadded`,child:null},Mn={type:`childremoved`,child:null},Nn=class e extends st{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:vn++}),this.uuid=ft(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new R,n=new gn,r=new Ft,i=new R(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new on},normalMatrix:{value:new Rt}}),this.matrix=new on,this.matrixWorld=new on,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new _n,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return bn.setFromAxisAngle(e,t),this.quaternion.multiply(bn),this}rotateOnWorldAxis(e,t){return bn.setFromAxisAngle(e,t),this.quaternion.premultiply(bn),this}rotateX(e){return this.rotateOnAxis(En,e)}rotateY(e){return this.rotateOnAxis(Dn,e)}rotateZ(e){return this.rotateOnAxis(On,e)}translateOnAxis(e,t){return yn.copy(e).applyQuaternion(this.quaternion),this.position.add(yn.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(En,e)}translateY(e){return this.translateOnAxis(Dn,e)}translateZ(e){return this.translateOnAxis(On,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(xn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Sn.copy(e):Sn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Cn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xn.lookAt(Cn,Sn,this.up):xn.lookAt(Sn,Cn,this.up),this.quaternion.setFromRotationMatrix(xn),r&&(xn.extractRotation(r.matrixWorld),bn.setFromRotationMatrix(xn),this.quaternion.premultiply(bn.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(rt(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(kn),jn.child=e,this.dispatchEvent(jn),jn.child=null):rt(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(An),Mn.child=e,this.dispatchEvent(Mn),Mn.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),xn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),xn.multiply(e.parent.matrixWorld)),e.applyMatrix4(xn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(kn),jn.child=e,this.dispatchEvent(jn),jn.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cn,e,wn),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cn,Tn,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};Nn.DEFAULT_UP=new R(0,1,0),Nn.DEFAULT_MATRIX_AUTO_UPDATE=!0,Nn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var z=class extends Nn{constructor(){super(),this.isGroup=!0,this.type=`Group`}},Pn={type:`move`},Fn=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new z,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new z,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new z,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Pn)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new z;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},In={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ln={h:0,s:0,l:0},Rn={h:0,s:0,l:0};function zn(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var B=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=He){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ut.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Ut.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ut.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Ut.workingColorSpace){if(e=mt(e,1),t=pt(t,0,1),n=pt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=zn(i,r,e+1/3),this.g=zn(i,r,e),this.b=zn(i,r,e-1/3)}return Ut.colorSpaceToWorking(this,r),this}setStyle(e,t=He){function n(t){t!==void 0&&parseFloat(t)<1&&I(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:I(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);I(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=He){let n=In[e.toLowerCase()];return n===void 0?I(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Wt(e.r),this.g=Wt(e.g),this.b=Wt(e.b),this}copyLinearToSRGB(e){return this.r=Gt(e.r),this.g=Gt(e.g),this.b=Gt(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=He){return Ut.workingToColorSpace(Bn.copy(this),e),Math.round(pt(Bn.r*255,0,255))*65536+Math.round(pt(Bn.g*255,0,255))*256+Math.round(pt(Bn.b*255,0,255))}getHexString(e=He){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ut.workingColorSpace){Ut.workingToColorSpace(Bn.copy(this),t);let n=Bn.r,r=Bn.g,i=Bn.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=Ut.workingColorSpace){return Ut.workingToColorSpace(Bn.copy(this),t),e.r=Bn.r,e.g=Bn.g,e.b=Bn.b,e}getStyle(e=He){Ut.workingToColorSpace(Bn.copy(this),e);let t=Bn.r,n=Bn.g,r=Bn.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(Ln),this.setHSL(Ln.h+e,Ln.s+t,Ln.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ln),e.getHSL(Rn);let n=_t(Ln.h,Rn.h,t),r=_t(Ln.s,Rn.s,t),i=_t(Ln.l,Rn.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Bn=new B;B.NAMES=In;var Vn=class e{constructor(e,t=1,n=1e3){this.isFog=!0,this.name=``,this.color=new B(e),this.near=t,this.far=n}clone(){return new e(this.color,this.near,this.far)}toJSON(){return{type:`Fog`,name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Hn=class extends Nn{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new gn,this.environmentIntensity=1,this.environmentRotation=new gn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Un=new R,Wn=new R,Gn=new R,Kn=new R,qn=new R,Jn=new R,Yn=new R,Xn=new R,Zn=new R,Qn=new R,$n=new en,er=new en,tr=new en,nr=class e{constructor(e=new R,t=new R,n=new R){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Un.subVectors(e,t),r.cross(Un);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Un.subVectors(r,t),Wn.subVectors(n,t),Gn.subVectors(e,t);let a=Un.dot(Un),o=Un.dot(Wn),s=Un.dot(Gn),c=Wn.dot(Wn),l=Wn.dot(Gn),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Kn)!==null&&Kn.x>=0&&Kn.y>=0&&Kn.x+Kn.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,Kn)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,Kn.x),s.addScaledVector(a,Kn.y),s.addScaledVector(o,Kn.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return $n.setScalar(0),er.setScalar(0),tr.setScalar(0),$n.fromBufferAttribute(e,t),er.fromBufferAttribute(e,n),tr.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector($n,i.x),a.addScaledVector(er,i.y),a.addScaledVector(tr,i.z),a}static isFrontFacing(e,t,n,r){return Un.subVectors(n,t),Wn.subVectors(e,t),Un.cross(Wn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Un.subVectors(this.c,this.b),Wn.subVectors(this.a,this.b),Un.cross(Wn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;qn.subVectors(r,n),Jn.subVectors(i,n),Xn.subVectors(e,n);let s=qn.dot(Xn),c=Jn.dot(Xn);if(s<=0&&c<=0)return t.copy(n);Zn.subVectors(e,r);let l=qn.dot(Zn),u=Jn.dot(Zn);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(qn,a);Qn.subVectors(e,i);let f=qn.dot(Qn),p=Jn.dot(Qn);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Jn,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Yn.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Yn,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(qn,a).addScaledVector(Jn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},rr=class{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ar.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ar.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=ar.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,ar):ar.fromBufferAttribute(r,t),ar.applyMatrix4(e.matrixWorld),this.expandByPoint(ar);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),or.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),or.copy(e.boundingBox)),or.applyMatrix4(e.matrixWorld),this.union(or)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ar),ar.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(pr),mr.subVectors(this.max,pr),sr.subVectors(e.a,pr),cr.subVectors(e.b,pr),lr.subVectors(e.c,pr),ur.subVectors(cr,sr),dr.subVectors(lr,cr),fr.subVectors(sr,lr);let t=[0,-ur.z,ur.y,0,-dr.z,dr.y,0,-fr.z,fr.y,ur.z,0,-ur.x,dr.z,0,-dr.x,fr.z,0,-fr.x,-ur.y,ur.x,0,-dr.y,dr.x,0,-fr.y,fr.x,0];return!_r(t,sr,cr,lr,mr)||(t=[1,0,0,0,1,0,0,0,1],!_r(t,sr,cr,lr,mr))?!1:(hr.crossVectors(ur,dr),t=[hr.x,hr.y,hr.z],_r(t,sr,cr,lr,mr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ar).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ar).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(ir[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ir[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ir[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ir[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ir[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ir[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ir[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ir[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ir)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ir=[new R,new R,new R,new R,new R,new R,new R,new R],ar=new R,or=new rr,sr=new R,cr=new R,lr=new R,ur=new R,dr=new R,fr=new R,pr=new R,mr=new R,hr=new R,gr=new R;function _r(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){gr.fromArray(e,a);let o=i.x*Math.abs(gr.x)+i.y*Math.abs(gr.y)+i.z*Math.abs(gr.z),s=t.dot(gr),c=n.dot(gr),l=r.dot(gr);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var vr=new R,yr=new L,br=0,xr=class extends st{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:br++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=qe,this.updateRanges=[],this.gpuType=_,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)yr.fromBufferAttribute(this,t),yr.applyMatrix3(e),this.setXY(t,yr.x,yr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)vr.fromBufferAttribute(this,t),vr.applyMatrix3(e),this.setXYZ(t,vr.x,vr.y,vr.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)vr.fromBufferAttribute(this,t),vr.applyMatrix4(e),this.setXYZ(t,vr.x,vr.y,vr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)vr.fromBufferAttribute(this,t),vr.applyNormalMatrix(e),this.setXYZ(t,vr.x,vr.y,vr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)vr.fromBufferAttribute(this,t),vr.transformDirection(e),this.setXYZ(t,vr.x,vr.y,vr.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Mt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Nt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Mt(t,this.array)),t}setX(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Mt(t,this.array)),t}setY(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Mt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Mt(t,this.array)),t}setW(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Nt(t,this.array),n=Nt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Nt(t,this.array),n=Nt(n,this.array),r=Nt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=Nt(t,this.array),n=Nt(n,this.array),r=Nt(r,this.array),i=Nt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}},Sr=class extends xr{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Cr=class extends xr{constructor(e,t,n){super(new Uint32Array(e),t,n)}},wr=class extends xr{constructor(e,t,n){super(new Float32Array(e),t,n)}},Tr=new rr,Er=new R,Dr=new R,Or=class{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?Tr.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Er.subVectors(e,this.center);let t=Er.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(Er,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Dr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Er.copy(e.center).add(Dr)),this.expandByPoint(Er.copy(e.center).sub(Dr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},kr=0,Ar=new on,jr=new Nn,Mr=new R,Nr=new rr,Pr=new rr,Fr=new R,Ir=class e extends st{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:kr++}),this.uuid=ft(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Xe(e)?Cr:Sr)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new Rt().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Ar.makeRotationFromQuaternion(e),this.applyMatrix4(Ar),this}rotateX(e){return Ar.makeRotationX(e),this.applyMatrix4(Ar),this}rotateY(e){return Ar.makeRotationY(e),this.applyMatrix4(Ar),this}rotateZ(e){return Ar.makeRotationZ(e),this.applyMatrix4(Ar),this}translate(e,t,n){return Ar.makeTranslation(e,t,n),this.applyMatrix4(Ar),this}scale(e,t,n){return Ar.makeScale(e,t,n),this.applyMatrix4(Ar),this}lookAt(e){return jr.lookAt(e),jr.updateMatrix(),this.applyMatrix4(jr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Mr).negate(),this.translate(Mr.x,Mr.y,Mr.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new wr(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&I(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new rr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)rt(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Nr.setFromBufferAttribute(n),this.morphTargetsRelative?(Fr.addVectors(this.boundingBox.min,Nr.min),this.boundingBox.expandByPoint(Fr),Fr.addVectors(this.boundingBox.max,Nr.max),this.boundingBox.expandByPoint(Fr)):(this.boundingBox.expandByPoint(Nr.min),this.boundingBox.expandByPoint(Nr.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&rt(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Or);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)rt(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new R,1/0);else if(e){let n=this.boundingSphere.center;if(Nr.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Pr.setFromBufferAttribute(n),this.morphTargetsRelative?(Fr.addVectors(Nr.min,Pr.min),Nr.expandByPoint(Fr),Fr.addVectors(Nr.max,Pr.max),Nr.expandByPoint(Fr)):(Nr.expandByPoint(Pr.min),Nr.expandByPoint(Pr.max))}Nr.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Fr.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Fr));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Fr.fromBufferAttribute(a,t),o&&(Mr.fromBufferAttribute(e,t),Fr.add(Mr)),r=Math.max(r,n.distanceToSquared(Fr))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&rt(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){rt(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new xr(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new R,s[e]=new R;let c=new R,l=new R,u=new R,d=new L,f=new L,p=new L,m=new R,h=new R;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new R,y=new R,b=new R,x=new R;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new xr(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new R,i=new R,a=new R,o=new R,s=new R,c=new R,l=new R,u=new R;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Fr.fromBufferAttribute(e,t),Fr.normalize(),e.setXYZ(t,Fr.x,Fr.y,Fr.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new xr(a,r,i)}if(this.index===null)return I(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},Lr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=qe,this.updateRanges=[],this.version=0,this.uuid=ft()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,i=this.stride;r<i;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ft()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ft()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},Rr=new R,zr=class e{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Rr.fromBufferAttribute(this,t),Rr.applyMatrix4(e),this.setXYZ(t,Rr.x,Rr.y,Rr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Rr.fromBufferAttribute(this,t),Rr.applyNormalMatrix(e),this.setXYZ(t,Rr.x,Rr.y,Rr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Rr.fromBufferAttribute(this,t),Rr.transformDirection(e),this.setXYZ(t,Rr.x,Rr.y,Rr.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Mt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Nt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Nt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Mt(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Mt(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Mt(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Mt(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Nt(t,this.array),n=Nt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Nt(t,this.array),n=Nt(n,this.array),r=Nt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Nt(t,this.array),n=Nt(n,this.array),r=Nt(r,this.array),i=Nt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=i,this}clone(t){if(t===void 0){tt(`InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return new xr(new this.array.constructor(e),this.itemSize,this.normalized)}return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new e(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){tt(`InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Br=new R,Vr=new R,Hr=new Rt,Ur=class{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Br.subVectors(n,t).cross(Vr.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Br),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Hr.getNormalMatrix(e),r=this.coplanarPoint(Br).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Wr=0,Gr=class extends st{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Wr++}),this.uuid=ft(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new B(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ke,this.stencilZFail=Ke,this.stencilZPass=Ke,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){I(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?I(`Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new B().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new Ur().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new L().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new L().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Kr=class extends Gr{constructor(e){super(),this.isSpriteMaterial=!0,this.type=`SpriteMaterial`,this.color=new B(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},qr,Jr=new R,Yr=new R,Xr=new R,Zr=new L,Qr=new L,$r=new on,ei=new R,ti=new R,ni=new R,ri=new L,ii=new L,ai=new L,oi=class extends Nn{constructor(e=new Kr){if(super(),this.isSprite=!0,this.type=`Sprite`,qr===void 0){qr=new Ir;let e=new Lr(new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),5);qr.setIndex([0,1,2,0,2,3]),qr.setAttribute(`position`,new zr(e,3,0,!1)),qr.setAttribute(`uv`,new zr(e,2,3,!1))}this.geometry=qr,this.material=e,this.center=new L(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&rt(`Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.`),Yr.setFromMatrixScale(this.matrixWorld),$r.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Xr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Yr.multiplyScalar(-Xr.z);let n=this.material.rotation,r,i;n!==0&&(i=Math.cos(n),r=Math.sin(n));let a=this.center;si(ei.set(-.5,-.5,0),Xr,a,Yr,r,i),si(ti.set(.5,-.5,0),Xr,a,Yr,r,i),si(ni.set(.5,.5,0),Xr,a,Yr,r,i),ri.set(0,0),ii.set(1,0),ai.set(1,1);let o=e.ray.intersectTriangle(ei,ti,ni,!1,Jr);if(o===null&&(si(ti.set(-.5,.5,0),Xr,a,Yr,r,i),ii.set(0,1),o=e.ray.intersectTriangle(ei,ni,ti,!1,Jr),o===null))return;let s=e.ray.origin.distanceTo(Jr);s<e.near||s>e.far||t.push({distance:s,point:Jr.clone(),uv:nr.getInterpolation(Jr,ei,ti,ni,ri,ii,ai,new L),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function si(e,t,n,r,i,a){Zr.subVectors(e,n).addScalar(.5).multiply(r),i===void 0?Qr.copy(Zr):(Qr.x=a*Zr.x-i*Zr.y,Qr.y=i*Zr.x+a*Zr.y),e.copy(t),e.x+=Qr.x,e.y+=Qr.y,e.applyMatrix4($r)}var ci=new R,li=new R,ui=new R,di=new R,fi=class{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ci)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ci.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ci.copy(this.origin).addScaledVector(this.direction,t),ci.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){li.copy(e).add(t).multiplyScalar(.5),ui.copy(t).sub(e).normalize(),di.copy(this.origin).sub(li);let i=e.distanceTo(t)*.5,a=-this.direction.dot(ui),o=di.dot(this.direction),s=-di.dot(ui),c=di.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(li).addScaledVector(ui,d),f}intersectSphere(e,t){if(e.radius<0)return null;ci.subVectors(e.center,this.origin);let n=ci.dot(this.direction),r=ci.dot(ci)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,ci)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,ee,O,k,A,te,ne;if(y>=b&&y>=x?(w=s,D=u,k=p,ne=g,s>=0?(S=c,C=l,T=d,E=f,ee=m,O=h,A=_,te=v):(S=l,C=c,T=f,E=d,ee=h,O=m,A=v,te=_)):b>=x?(w=c,D=d,k=m,ne=_,c>=0?(S=l,C=s,T=f,E=u,ee=h,O=p,A=v,te=g):(S=s,C=l,T=u,E=f,ee=p,O=h,A=g,te=v)):(w=l,D=f,k=h,ne=v,l>=0?(S=s,C=c,T=u,E=d,ee=p,O=m,A=g,te=_):(S=c,C=s,T=d,E=u,ee=m,O=p,A=_,te=g)),w===0)return null;let j=S/w,re=C/w,M=1/w,ie=T-j*D,ae=E-re*D,oe=ee-j*k,se=O-re*k,ce=A-j*ne,le=te-re*ne,ue=ce*se-le*oe,N=ie*le-ae*ce,de=oe*ae-se*ie;if(r){if(ue<0||N<0||de<0)return null}else if((ue<0||N<0||de<0)&&(ue>0||N>0||de>0))return null;let fe=ue+N+de;if(fe===0)return null;let pe=M*(ue*D+N*k+de*ne);return(fe>0?pe<0:pe>0)?null:this.at(pe/fe,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},pi=class extends Gr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new B(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},mi=new on,hi=new fi,gi=new Or,_i=new R,vi=new R,yi=new R,bi=new R,xi=new R,Si=new R,Ci=new R,wi=new R,V=class extends Nn{constructor(e=new Ir,t=new pi){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){Si.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(xi.fromBufferAttribute(s,e),a?Si.addScaledVector(xi,r):Si.addScaledVector(xi.sub(t),r))}t.add(Si)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),gi.copy(n.boundingSphere),gi.applyMatrix4(i),hi.copy(e.ray).recast(e.near),!(gi.containsPoint(hi.origin)===!1&&(hi.intersectSphere(gi,_i)===null||hi.origin.distanceToSquared(_i)>(e.far-e.near)**2))&&(mi.copy(i).invert(),hi.copy(e.ray).applyMatrix4(mi),(n.boundingBox===null||hi.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,hi)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=Ei(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=Ei(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=Ei(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=Ei(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function Ti(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;wi.copy(s),wi.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(wi);return l<n.near||l>n.far?null:{distance:l,point:wi.clone(),object:e}}function Ei(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,vi),e.getVertexPosition(c,yi),e.getVertexPosition(l,bi);let u=Ti(e,t,n,r,vi,yi,bi,Ci);if(u){let e=new R;nr.getBarycoord(Ci,vi,yi,bi,e),i&&(u.uv=nr.getInterpolatedAttribute(i,s,c,l,e,new L)),a&&(u.uv1=nr.getInterpolatedAttribute(a,s,c,l,e,new L)),o&&(u.normal=nr.getInterpolatedAttribute(o,s,c,l,e,new R),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new R,materialIndex:0};nr.getNormal(vi,yi,bi,t.normal),u.face=t,u.barycoord=e}return u}var Di=class extends $t{constructor(e=null,t=1,n=1,r,i,o,s,c,l=a,u=a,d,f){super(null,o,s,c,l,u,r,i,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Oi=class extends xr{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},ki=new on,Ai=new on,ji=[],Mi=new rr,Ni=new on,Pi=new V,Fi=new Or,Ii=class extends V{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Oi(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,Ni)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new rr),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ki),Mi.copy(e.boundingBox).applyMatrix4(ki),this.boundingBox.union(Mi)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Or),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ki),Fi.copy(e.boundingSphere).applyMatrix4(ki),this.boundingSphere.union(Fi)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(Pi.geometry=this.geometry,Pi.material=this.material,Pi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Fi.copy(this.boundingSphere),Fi.applyMatrix4(n),e.ray.intersectsSphere(Fi)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,ki),Ai.multiplyMatrices(n,ki),Pi.matrixWorld=Ai,Pi.raycast(e,ji);for(let e=0,n=ji.length;e<n;e++){let n=ji[e];n.instanceId=i,n.object=this,t.push(n)}ji.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Oi(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Di(new Float32Array(r*this.count),r,this.count,O,_));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Li=new Or,Ri=new L(.5,.5),zi=new R,Bi=class{constructor(e=new Ur,t=new Ur,n=new Ur,r=new Ur,i=new Ur,a=new Ur){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Ye,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Li.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Li.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Li)}intersectsSprite(e){return Li.center.set(0,0,0),Li.radius=.7071067811865476+Ri.distanceTo(e.center),Li.applyMatrix4(e.matrixWorld),this.intersectsSphere(Li)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(zi.x=r.normal.x>0?e.max.x:e.min.x,zi.y=r.normal.y>0?e.max.y:e.min.y,zi.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(zi)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Vi=class extends Gr{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new B(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Hi=new on,Ui=new fi,Wi=new Or,Gi=new R,Ki=class extends Nn{constructor(e=new Ir,t=new Vi){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Wi.copy(n.boundingSphere),Wi.applyMatrix4(r),Wi.radius+=i,e.ray.intersectsSphere(Wi)===!1)return;Hi.copy(r).invert(),Ui.copy(e.ray).applyMatrix4(Hi);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);Gi.fromBufferAttribute(l,n),qi(Gi,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)Gi.fromBufferAttribute(l,a),qi(Gi,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function qi(e,t,n,r,i,a,o){let s=Ui.distanceSqToPoint(e);if(s<n){let n=new R;Ui.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Ji=class extends $t{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Yi=class extends $t{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Xi=class extends $t{constructor(e,t,n=g,r,i,o,s=a,c=a,l,u=D,d=1){if(u!==1026&&u!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:d},r,i,o,s,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Yt(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Zi=class extends Xi{constructor(e,t=g,n=301,r,i,o=a,s=a,c,l=D){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,r,i,o,s,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Qi=class extends $t{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},H=class e extends Ir{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new wr(c,3)),this.setAttribute(`normal`,new wr(l,3)),this.setAttribute(`uv`,new wr(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new R;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},$i=class e extends Ir{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new R,l=new L;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new wr(a,3)),this.setAttribute(`normal`,new wr(o,3)),this.setAttribute(`uv`,new wr(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},U=class e extends Ir{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new wr(u,3)),this.setAttribute(`normal`,new wr(d,3)),this.setAttribute(`uv`,new wr(f,2));function _(){let a=new R,_=new R,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new L,m=new R,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},ea=class e extends U{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},ta=class e extends Ir{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new wr(i,3)),this.setAttribute(`normal`,new wr(i.slice(),3)),this.setAttribute(`uv`,new wr(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new R,r=new R,i=new R;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new R;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new R;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new R,t=new R,n=new R,r=new R,o=new L,s=new L,c=new L;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},na=class{constructor(){this.type=`Curve`,this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){I(`Curve: .getPoint() not implemented.`)}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),i=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),i+=n.distanceTo(r),t.push(i),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,i=n.length,a;a=t||e*n[i-1];let o=0,s=i-1,c;for(;o<=s;)if(r=Math.floor(o+(s-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)s=r-1;else{s=r;break}if(r=s,n[r]===a)return r/(i-1);let l=n[r],u=n[r+1]-l,d=(a-l)/u;return(r+d)/(i-1)}getTangent(e,t){let n=1e-4,r=e-n,i=e+n;r<0&&(r=0),i>1&&(i=1);let a=this.getPoint(r),o=this.getPoint(i),s=t||(a.isVector2?new L:new R);return s.copy(o).sub(a).normalize(),s}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new R,r=[],i=[],a=[],o=new R,s=new on;for(let t=0;t<=e;t++){let n=t/e;r[t]=this.getTangentAt(n,new R)}i[0]=new R,a[0]=new R;let c=Number.MAX_VALUE,l=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(pt(r[t-1].dot(r[t]),-1,1));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(pt(i[0].dot(i[e]),-1,1));t/=e,r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:`Curve`,generator:`Curve.toJSON`}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},ra=class extends na{constructor(e=0,t=0,n=1,r=1,i=0,a=Math.PI*2,o=!1,s=0){super(),this.isEllipseCurve=!0,this.type=`EllipseCurve`,this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=s}getPoint(e,t=new L){let n=t,r=Math.PI*2,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<2**-52;for(;i<0;)i+=r;for(;i>r;)i-=r;i<2**-52&&(i=a?0:r),this.aClockwise===!0&&!a&&(i===r?i=-r:i-=r);let o=this.aStartAngle+e*i,s=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),n=s-this.aX,r=c-this.aY;s=n*e-r*t+this.aX,c=n*t+r*e+this.aY}return n.set(s,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},ia=class extends ra{constructor(e,t,n,r,i,a){super(e,t,n,n,r,i,a),this.isArcCurve=!0,this.type=`ArcCurve`}};function aa(){let e=0,t=0,n=0,r=0;function i(i,a,o,s){e=i,t=o,n=-3*i+3*a-2*o-s,r=2*i-2*a+o+s}return{initCatmullRom:function(e,t,n,r,a){i(t,n,a*(n-e),a*(r-t))},initNonuniformCatmullRom:function(e,t,n,r,a,o,s){let c=(t-e)/a-(n-e)/(a+o)+(n-t)/o,l=(n-t)/o-(r-t)/(o+s)+(r-n)/s;c*=o,l*=o,i(t,n,c,l)},calc:function(i){let a=i*i,o=a*i;return e+t*i+n*a+r*o}}}var oa=new R,sa=new R,ca=new aa,la=new aa,ua=new aa,da=class extends na{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.isCatmullRomCurve3=!0,this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new R){let n=t,r=this.points,i=r.length,a=(i-+!this.closed)*e,o=Math.floor(a),s=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:s===0&&o===i-1&&(o=i-2,s=1);let c,l;this.closed||o>0?c=r[(o-1)%i]:(sa.subVectors(r[0],r[1]).add(r[0]),c=sa);let u=r[o%i],d=r[(o+1)%i];if(this.closed||o+2<i?l=r[(o+2)%i]:(oa.subVectors(r[i-1],r[i-2]).add(r[i-1]),l=oa),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=c.distanceToSquared(u)**+e,n=u.distanceToSquared(d)**+e,r=d.distanceToSquared(l)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),ca.initNonuniformCatmullRom(c.x,u.x,d.x,l.x,t,n,r),la.initNonuniformCatmullRom(c.y,u.y,d.y,l.y,t,n,r),ua.initNonuniformCatmullRom(c.z,u.z,d.z,l.z,t,n,r)}else this.curveType===`catmullrom`&&(ca.initCatmullRom(c.x,u.x,d.x,l.x,this.tension),la.initCatmullRom(c.y,u.y,d.y,l.y,this.tension),ua.initCatmullRom(c.z,u.z,d.z,l.z,this.tension));return n.set(ca.calc(s),la.calc(s),ua.calc(s)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new R().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function fa(e,t,n,r,i){let a=(r-t)*.5,o=(i-n)*.5,s=e*e,c=e*s;return(2*n-2*r+a+o)*c+(-3*n+3*r-2*a-o)*s+a*e+n}function pa(e,t){let n=1-e;return n*n*t}function ma(e,t){return 2*(1-e)*e*t}function ha(e,t){return e*e*t}function ga(e,t,n,r){return pa(e,t)+ma(e,n)+ha(e,r)}function _a(e,t){let n=1-e;return n*n*n*t}function va(e,t){let n=1-e;return 3*n*n*e*t}function ya(e,t){return 3*(1-e)*e*e*t}function ba(e,t){return e*e*e*t}function xa(e,t,n,r,i){return _a(e,t)+va(e,n)+ya(e,r)+ba(e,i)}var Sa=class extends na{constructor(e=new L,t=new L,n=new L,r=new L){super(),this.isCubicBezierCurve=!0,this.type=`CubicBezierCurve`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new L){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(xa(e,r.x,i.x,a.x,o.x),xa(e,r.y,i.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ca=class extends na{constructor(e=new R,t=new R,n=new R,r=new R){super(),this.isCubicBezierCurve3=!0,this.type=`CubicBezierCurve3`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new R){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(xa(e,r.x,i.x,a.x,o.x),xa(e,r.y,i.y,a.y,o.y),xa(e,r.z,i.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},wa=class extends na{constructor(e=new L,t=new L){super(),this.isLineCurve=!0,this.type=`LineCurve`,this.v1=e,this.v2=t}getPoint(e,t=new L){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new L){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ta=class extends na{constructor(e=new R,t=new R){super(),this.isLineCurve3=!0,this.type=`LineCurve3`,this.v1=e,this.v2=t}getPoint(e,t=new R){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new R){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ea=class extends na{constructor(e=new L,t=new L,n=new L){super(),this.isQuadraticBezierCurve=!0,this.type=`QuadraticBezierCurve`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new L){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(ga(e,r.x,i.x,a.x),ga(e,r.y,i.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Da=class extends na{constructor(e=new R,t=new R,n=new R){super(),this.isQuadraticBezierCurve3=!0,this.type=`QuadraticBezierCurve3`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new R){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(ga(e,r.x,i.x,a.x),ga(e,r.y,i.y,a.y),ga(e,r.z,i.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Oa=class extends na{constructor(e=[]){super(),this.isSplineCurve=!0,this.type=`SplineCurve`,this.points=e}getPoint(e,t=new L){let n=t,r=this.points,i=(r.length-1)*e,a=Math.floor(i),o=i-a,s=r[a===0?a:a-1],c=r[a],l=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set(fa(o,s.x,c.x,l.x,u.x),fa(o,s.y,c.y,l.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new L().fromArray(n))}return this}},ka=Object.freeze({__proto__:null,ArcCurve:ia,CatmullRomCurve3:da,CubicBezierCurve:Sa,CubicBezierCurve3:Ca,EllipseCurve:ra,LineCurve:wa,LineCurve3:Ta,QuadraticBezierCurve:Ea,QuadraticBezierCurve3:Da,SplineCurve:Oa}),Aa=class extends na{constructor(){super(),this.type=`CurvePath`,this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?`LineCurve`:`LineCurve3`;this.curves.push(new ka[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),i=0;for(;i<r.length;){if(r[i]>=n){let e=r[i]-n,a=this.curves[i],o=a.getLength(),s=o===0?0:1-e/o;return a.getPointAt(s,t)}i++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,i=this.curves;r<i.length;r++){let a=i[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,s=a.getPoints(o);for(let e=0;e<s.length;e++){let r=s[e];n&&n.equals(r)||(t.push(r),n=r)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(n.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let n=this.curves[t];e.curves.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(new ka[n.type]().fromJSON(n))}return this}},ja=class extends Aa{constructor(e){super(),this.type=`Path`,this.currentPoint=new L,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new wa(this.currentPoint.clone(),new L(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let i=new Ea(this.currentPoint.clone(),new L(e,t),new L(n,r));return this.curves.push(i),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,i,a){let o=new Sa(this.currentPoint.clone(),new L(e,t),new L(n,r),new L(i,a));return this.curves.push(o),this.currentPoint.set(i,a),this}splineThru(e){let t=new Oa([this.currentPoint.clone()].concat(e));return this.curves.push(t),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,i,a){let o=this.currentPoint.x,s=this.currentPoint.y;return this.absarc(e+o,t+s,n,r,i,a),this}absarc(e,t,n,r,i,a){return this.absellipse(e,t,n,n,r,i,a),this}ellipse(e,t,n,r,i,a,o,s){let c=this.currentPoint.x,l=this.currentPoint.y;return this.absellipse(e+c,t+l,n,r,i,a,o,s),this}absellipse(e,t,n,r,i,a,o,s){let c=new ra(e,t,n,r,i,a,o,s);if(this.curves.length>0){let e=c.getPoint(0);e.equals(this.currentPoint)||this.lineTo(e.x,e.y)}this.curves.push(c);let l=c.getPoint(1);return this.currentPoint.copy(l),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Ma=class extends ja{constructor(e){super(e),this.uuid=ft(),this.type=`Shape`,this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let n=this.holes[t];e.holes.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(new ja().fromJSON(n))}return this}};function Na(e,t,n=2){let r=t&&t.length,i=r?t[0]*n:e.length,a=Pa(e,0,i,n,!0),o=[];if(!a||a.next===a.prev)return o;let s,c,l;if(r&&(a=Va(e,t,a,n)),e.length>80*n){s=e[0],c=e[1];let t=s,r=c;for(let a=n;a<i;a+=n){let n=e[a],i=e[a+1];n<s&&(s=n),i<c&&(c=i),n>t&&(t=n),i>r&&(r=i)}l=Math.max(t-s,r-c),l=l===0?0:32767/l}return Ia(a,o,n,s,c,l,0),o}function Pa(e,t,n,r,i){let a;if(i===fo(e,t,n,r)>0)for(let i=t;i<n;i+=r)a=co(i/r|0,e[i],e[i+1],a);else for(let i=n-r;i>=t;i-=r)a=co(i/r|0,e[i],e[i+1],a);return a&&eo(a,a.next)&&(lo(a),a=a.next),a}function Fa(e,t){if(!e)return e;t||=e;let n=e,r;do if(r=!1,!n.steiner&&(eo(n,n.next)||$a(n.prev,n,n.next)===0)){if(lo(n),n=t=n.prev,n===n.next)break;r=!0}else n=n.next;while(r||n!==t);return t}function Ia(e,t,n,r,i,a,o){if(!e)return;!o&&a&&Ka(e,r,i,a);let s=e;for(;e.prev!==e.next;){let c=e.prev,l=e.next;if(a?Ra(e,r,i,a):La(e))t.push(c.i,e.i,l.i),lo(e),e=l.next,s=l.next;else if(e=l,e===s){o?o===1?(e=za(Fa(e),t),Ia(e,t,n,r,i,a,2)):o===2&&Ba(e,t,n,r,i,a):Ia(Fa(e),t,n,r,i,a,1);break}}}function La(e){let t=e.prev,n=e,r=e.next;if($a(t,n,r)>=0)return!1;let i=t.x,a=n.x,o=r.x,s=t.y,c=n.y,l=r.y,u=Math.min(i,a,o),d=Math.min(s,c,l),f=Math.max(i,a,o),p=Math.max(s,c,l),m=r.next;for(;m!==t;){if(m.x>=u&&m.x<=f&&m.y>=d&&m.y<=p&&Za(i,s,a,c,o,l,m.x,m.y)&&$a(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Ra(e,t,n,r){let i=e.prev,a=e,o=e.next;if($a(i,a,o)>=0)return!1;let s=i.x,c=a.x,l=o.x,u=i.y,d=a.y,f=o.y,p=Math.min(s,c,l),m=Math.min(u,d,f),h=Math.max(s,c,l),g=Math.max(u,d,f),_=Ja(p,m,t,n,r),v=Ja(h,g,t,n,r),y=e.prevZ,b=e.nextZ;for(;y&&y.z>=_&&b&&b.z<=v;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&Za(s,u,c,d,l,f,y.x,y.y)&&$a(y.prev,y,y.next)>=0||(y=y.prevZ,b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&Za(s,u,c,d,l,f,b.x,b.y)&&$a(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;y&&y.z>=_;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&Za(s,u,c,d,l,f,y.x,y.y)&&$a(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;b&&b.z<=v;){if(b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&Za(s,u,c,d,l,f,b.x,b.y)&&$a(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function za(e,t){let n=e;do{let r=n.prev,i=n.next.next;!eo(r,i)&&to(r,n,n.next,i)&&ao(r,i)&&ao(i,r)&&(t.push(r.i,n.i,i.i),lo(n),lo(n.next),n=e=i),n=n.next}while(n!==e);return Fa(n)}function Ba(e,t,n,r,i,a){let o=e;do{let e=o.next.next;for(;e!==o.prev;){if(o.i!==e.i&&Qa(o,e)){let s=so(o,e);o=Fa(o,o.next),s=Fa(s,s.next),Ia(o,t,n,r,i,a,0),Ia(s,t,n,r,i,a,0);return}e=e.next}o=o.next}while(o!==e)}function Va(e,t,n,r){let i=[];for(let n=0,a=t.length;n<a;n++){let o=Pa(e,t[n]*r,n<a-1?t[n+1]*r:e.length,r,!1);o===o.next&&(o.steiner=!0),i.push(Ya(o))}i.sort(Ha);for(let e=0;e<i.length;e++)n=Ua(i[e],n);return n}function Ha(e,t){let n=e.x-t.x;return n===0&&(n=e.y-t.y,n===0&&(n=(e.next.y-e.y)/(e.next.x-e.x)-(t.next.y-t.y)/(t.next.x-t.x))),n}function Ua(e,t){let n=Wa(e,t);if(!n)return t;let r=so(n,e);return Fa(r,r.next),Fa(n,n.next)}function Wa(e,t){let n=t,r=e.x,i=e.y,a=-1/0,o;if(eo(e,n))return n;do{if(eo(e,n.next))return n.next;if(i<=n.y&&i>=n.next.y&&n.next.y!==n.y){let e=n.x+(i-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(e<=r&&e>a&&(a=e,o=n.x<n.next.x?n:n.next,e===r))return o}n=n.next}while(n!==t);if(!o)return null;let s=o,c=o.x,l=o.y,u=1/0;n=o;do{if(r>=n.x&&n.x>=c&&r!==n.x&&Xa(i<l?r:a,i,c,l,i<l?a:r,i,n.x,n.y)){let t=Math.abs(i-n.y)/(r-n.x);ao(n,e)&&(t<u||t===u&&(n.x>o.x||n.x===o.x&&Ga(o,n)))&&(o=n,u=t)}n=n.next}while(n!==s);return o}function Ga(e,t){return $a(e.prev,e,t.prev)<0&&$a(t.next,e,e.next)<0}function Ka(e,t,n,r){let i=e;do i.z===0&&(i.z=Ja(i.x,i.y,t,n,r)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==e);i.prevZ.nextZ=null,i.prevZ=null,qa(i)}function qa(e){let t,n=1;do{let r=e,i;e=null;let a=null;for(t=0;r;){t++;let o=r,s=0;for(let e=0;e<n&&(s++,o=o.nextZ,o);e++);let c=n;for(;s>0||c>0&&o;)s!==0&&(c===0||!o||r.z<=o.z)?(i=r,r=r.nextZ,s--):(i=o,o=o.nextZ,c--),a?a.nextZ=i:e=i,i.prevZ=a,a=i;r=o}a.nextZ=null,n*=2}while(t>1);return e}function Ja(e,t,n,r,i){return e=(e-n)*i|0,t=(t-r)*i|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function Ya(e){let t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function Xa(e,t,n,r,i,a,o,s){return(i-o)*(t-s)>=(e-o)*(a-s)&&(e-o)*(r-s)>=(n-o)*(t-s)&&(n-o)*(a-s)>=(i-o)*(r-s)}function Za(e,t,n,r,i,a,o,s){return(e!==o||t!==s)&&Xa(e,t,n,r,i,a,o,s)}function Qa(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!io(e,t)&&(ao(e,t)&&ao(t,e)&&oo(e,t)&&($a(e.prev,e,t.prev)||$a(e,t.prev,t))||eo(e,t)&&$a(e.prev,e,e.next)>0&&$a(t.prev,t,t.next)>0)}function $a(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function eo(e,t){return e.x===t.x&&e.y===t.y}function to(e,t,n,r){let i=ro($a(e,t,n)),a=ro($a(e,t,r)),o=ro($a(n,r,e)),s=ro($a(n,r,t));return!!(i!==a&&o!==s||i===0&&no(e,n,t)||a===0&&no(e,r,t)||o===0&&no(n,e,r)||s===0&&no(n,t,r))}function no(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function ro(e){return e>0?1:e<0?-1:0}function io(e,t){let n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&to(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function ao(e,t){return $a(e.prev,e,e.next)<0?$a(e,t,e.next)>=0&&$a(e,e.prev,t)>=0:$a(e,t,e.prev)<0||$a(e,e.next,t)<0}function oo(e,t){let n=e,r=!1,i=(e.x+t.x)/2,a=(e.y+t.y)/2;do n.y>a!=n.next.y>a&&n.next.y!==n.y&&i<(n.next.x-n.x)*(a-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next;while(n!==e);return r}function so(e,t){let n=uo(e.i,e.x,e.y),r=uo(t.i,t.x,t.y),i=e.next,a=t.prev;return e.next=t,t.prev=e,n.next=i,i.prev=n,r.next=n,n.prev=r,a.next=r,r.prev=a,r}function co(e,t,n,r){let i=uo(e,t,n);return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function lo(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function uo(e,t,n){return{i:e,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function fo(e,t,n,r){let i=0;for(let a=t,o=n-r;a<n;a+=r)i+=(e[o]-e[a])*(e[a+1]+e[o+1]),o=a;return i}var po=class{static triangulate(e,t,n=2){return Na(e,t,n)}},mo=class e{static area(e){let t=e.length,n=0;for(let r=t-1,i=0;i<t;r=i++)n+=e[r].x*e[i].y-e[i].x*e[r].y;return n*.5}static isClockWise(t){return e.area(t)<0}static triangulateShape(e,t){let n=[],r=[],i=[];ho(e),go(n,e);let a=e.length;t.forEach(ho);for(let e=0;e<t.length;e++)r.push(a),a+=t[e].length,go(n,t[e]);let o=po.triangulate(n,r);for(let e=0;e<o.length;e+=3)i.push(o.slice(e,e+3));return i}};function ho(e){let t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function go(e,t){for(let n=0;n<t.length;n++)e.push(t[n].x),e.push(t[n].y)}var _o=class e extends Ir{constructor(e=new Ma([new L(.5,.5),new L(-.5,.5),new L(-.5,-.5),new L(.5,-.5)]),t={}){super(),this.type=`ExtrudeGeometry`,this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],i=[];for(let t=0,n=e.length;t<n;t++){let n=e[t];a(n)}this.setAttribute(`position`,new wr(r,3)),this.setAttribute(`uv`,new wr(i,2)),this.computeVertexNormals();function a(e){let a=[],o=t.curveSegments===void 0?12:t.curveSegments,s=t.steps===void 0?1:t.steps,c=t.depth===void 0?1:t.depth,l=t.bevelEnabled===void 0||t.bevelEnabled,u=t.bevelThickness===void 0?.2:t.bevelThickness,d=t.bevelSize===void 0?u-.1:t.bevelSize,f=t.bevelOffset===void 0?0:t.bevelOffset,p=t.bevelSegments===void 0?3:t.bevelSegments,m=t.extrudePath,h=t.UVGenerator===void 0?vo:t.UVGenerator,g,_=!1,v,y,b,x;if(m){g=m.getSpacedPoints(s),_=!0,l=!1;let e=m.isCatmullRomCurve3?m.closed:!1;v=m.computeFrenetFrames(s,e),y=new R,b=new R,x=new R}l||(p=0,u=0,d=0,f=0);let S=e.extractPoints(o),C=S.shape,w=S.holes;if(!mo.isClockWise(C)){C=C.reverse();for(let e=0,t=w.length;e<t;e++){let t=w[e];mo.isClockWise(t)&&(w[e]=t.reverse())}}function T(e){let t=e[0];for(let n=1;n<=e.length;n++){let r=n%e.length,i=e[r],a=i.x-t.x,o=i.y-t.y,s=a*a+o*o,c=Math.max(Math.abs(i.x),Math.abs(i.y),Math.abs(t.x),Math.abs(t.y));s<=10000000000000001e-36*c*c?(e.splice(r,1),n--):t=i}}T(C),w.forEach(T);let E=w.length,D=C;for(let e=0;e<E;e++){let t=w[e];C=C.concat(t)}function ee(e,t,n){return t||rt(`ExtrudeGeometry: vec does not exist`),e.clone().addScaledVector(t,n)}let O=C.length;function k(e,t,n){let r,i,a,o=e.x-t.x,s=e.y-t.y,c=n.x-e.x,l=n.y-e.y,u=o*o+s*s,d=o*l-s*c;if(Math.abs(d)>2**-52){let d=Math.sqrt(u),f=Math.sqrt(c*c+l*l),p=t.x-s/d,m=t.y+o/d,h=n.x-l/f,g=n.y+c/f,_=((h-p)*l-(g-m)*c)/(o*l-s*c);r=p+o*_-e.x,i=m+s*_-e.y;let v=r*r+i*i;if(v<=2)return new L(r,i);a=Math.sqrt(v/2)}else{let e=!1;o>2**-52?c>2**-52&&(e=!0):o<-(2**-52)?c<-(2**-52)&&(e=!0):Math.sign(s)===Math.sign(l)&&(e=!0),e?(r=-s,i=o,a=Math.sqrt(u)):(r=o,i=s,a=Math.sqrt(u/2))}return new L(r/a,i/a)}let A=[];for(let e=0,t=D.length,n=t-1,r=e+1;e<t;e++,n++,r++)n===t&&(n=0),r===t&&(r=0),A[e]=k(D[e],D[n],D[r]);let te=[],ne,j=A.concat();for(let e=0,t=E;e<t;e++){let t=w[e];ne=[];for(let e=0,n=t.length,r=n-1,i=e+1;e<n;e++,r++,i++)r===n&&(r=0),i===n&&(i=0),ne[e]=k(t[e],t[r],t[i]);te.push(ne),j=j.concat(ne)}let re;if(p===0)re=mo.triangulateShape(D,w);else{let e=[],t=[];for(let n=0;n<p;n++){let r=n/p,i=u*Math.cos(r*Math.PI/2),a=d*Math.sin(r*Math.PI/2)+f;for(let t=0,n=D.length;t<n;t++){let n=ee(D[t],A[t],a);ce(n.x,n.y,-i),r===0&&e.push(n)}for(let e=0,n=E;e<n;e++){let n=w[e];ne=te[e];let o=[];for(let e=0,t=n.length;e<t;e++){let t=ee(n[e],ne[e],a);ce(t.x,t.y,-i),r===0&&o.push(t)}r===0&&t.push(o)}}re=mo.triangulateShape(e,t)}let M=re.length,ie=d+f;for(let e=0;e<O;e++){let t=l?ee(C[e],j[e],ie):C[e];_?(b.copy(v.normals[0]).multiplyScalar(t.x),y.copy(v.binormals[0]).multiplyScalar(t.y),x.copy(g[0]).add(b).add(y),ce(x.x,x.y,x.z)):ce(t.x,t.y,0)}for(let e=1;e<=s;e++)for(let t=0;t<O;t++){let n=l?ee(C[t],j[t],ie):C[t];_?(b.copy(v.normals[e]).multiplyScalar(n.x),y.copy(v.binormals[e]).multiplyScalar(n.y),x.copy(g[e]).add(b).add(y),ce(x.x,x.y,x.z)):ce(n.x,n.y,c/s*e)}for(let e=p-1;e>=0;e--){let t=e/p,n=u*Math.cos(t*Math.PI/2),r=d*Math.sin(t*Math.PI/2)+f;for(let e=0,t=D.length;e<t;e++){let t=ee(D[e],A[e],r);ce(t.x,t.y,c+n)}for(let e=0,t=w.length;e<t;e++){let t=w[e];ne=te[e];for(let e=0,i=t.length;e<i;e++){let i=ee(t[e],ne[e],r);_?ce(i.x,i.y+g[s-1].y,g[s-1].x+n):ce(i.x,i.y,c+n)}}}ae(),oe();function ae(){let e=r.length/3;if(l){let e=0,t=O*e;for(let e=0;e<M;e++){let n=re[e];le(n[2]+t,n[1]+t,n[0]+t)}e=s+p*2,t=O*e;for(let e=0;e<M;e++){let n=re[e];le(n[0]+t,n[1]+t,n[2]+t)}}else{for(let e=0;e<M;e++){let t=re[e];le(t[2],t[1],t[0])}for(let e=0;e<M;e++){let t=re[e];le(t[0]+O*s,t[1]+O*s,t[2]+O*s)}}n.addGroup(e,r.length/3-e,0)}function oe(){let e=r.length/3,t=0;se(D,t),t+=D.length;for(let e=0,n=w.length;e<n;e++){let n=w[e];se(n,t),t+=n.length}n.addGroup(e,r.length/3-e,1)}function se(e,t){let n=e.length;for(;--n>=0;){let r=n,i=n-1;i<0&&(i=e.length-1);for(let e=0,n=s+p*2;e<n;e++){let n=O*e,a=O*(e+1);ue(t+r+n,t+i+n,t+i+a,t+r+a)}}}function ce(e,t,n){a.push(e),a.push(t),a.push(n)}function le(e,t,i){N(e),N(t),N(i);let a=r.length/3,o=h.generateTopUV(n,r,a-3,a-2,a-1);de(o[0]),de(o[1]),de(o[2])}function ue(e,t,i,a){N(e),N(t),N(a),N(t),N(i),N(a);let o=r.length/3,s=h.generateSideWallUV(n,r,o-6,o-3,o-2,o-1);de(s[0]),de(s[1]),de(s[3]),de(s[1]),de(s[2]),de(s[3])}function N(e){r.push(a[e*3+0]),r.push(a[e*3+1]),r.push(a[e*3+2])}function de(e){i.push(e.x),i.push(e.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return yo(t,n,e)}static fromJSON(t,n){let r=[];for(let e=0,i=t.shapes.length;e<i;e++){let i=n[t.shapes[e]];r.push(i)}let i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new ka[i.type]().fromJSON(i)),new e(r,t.options)}},vo={generateTopUV:function(e,t,n,r,i){let a=t[n*3],o=t[n*3+1],s=t[r*3],c=t[r*3+1],l=t[i*3],u=t[i*3+1];return[new L(a,o),new L(s,c),new L(l,u)]},generateSideWallUV:function(e,t,n,r,i,a){let o=t[n*3],s=t[n*3+1],c=t[n*3+2],l=t[r*3],u=t[r*3+1],d=t[r*3+2],f=t[i*3],p=t[i*3+1],m=t[i*3+2],h=t[a*3],g=t[a*3+1],_=t[a*3+2];return Math.abs(s-u)<Math.abs(o-l)?[new L(o,1-c),new L(l,1-d),new L(f,1-m),new L(h,1-_)]:[new L(s,1-c),new L(u,1-d),new L(p,1-m),new L(g,1-_)]}};function yo(e,t,n){if(n.shapes=[],Array.isArray(e))for(let t=0,r=e.length;t<r;t++){let r=e[t];n.shapes.push(r.uuid)}else n.shapes.push(e.uuid);return n.options=Object.assign({},t),t.extrudePath!==void 0&&(n.options.extrudePath=t.extrudePath.toJSON()),n}var bo=class e extends ta{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];super(r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},xo=class e extends Ir{constructor(e=[new L(0,-.5),new L(.5,0),new L(0,.5)],t=12,n=0,r=Math.PI*2){super(),this.type=`LatheGeometry`,this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=pt(r,0,Math.PI*2);let i=[],a=[],o=[],s=[],c=[],l=1/t,u=new R,d=new L,f=new R,p=new R,m=new R,h=0,g=0;for(let t=0;t<=e.length-1;t++)switch(t){case 0:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,m.copy(f),f.normalize(),s.push(f.x,f.y,f.z);break;case e.length-1:s.push(m.x,m.y,m.z);break;default:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,p.copy(f),f.x+=m.x,f.y+=m.y,f.z+=m.z,f.normalize(),s.push(f.x,f.y,f.z),m.copy(p)}for(let i=0;i<=t;i++){let f=n+i*l*r,p=Math.sin(f),m=Math.cos(f);for(let n=0;n<=e.length-1;n++){u.x=e[n].x*p,u.y=e[n].y,u.z=e[n].x*m,a.push(u.x,u.y,u.z),d.x=i/t,d.y=n/(e.length-1),o.push(d.x,d.y);let r=s[3*n+0]*p,l=s[3*n+1],f=s[3*n+0]*m;c.push(r,l,f)}}for(let n=0;n<t;n++)for(let t=0;t<e.length-1;t++){let r=t+n*e.length,a=r,o=r+e.length,s=r+e.length+1,c=r+1;i.push(a,o,c),i.push(s,c,o)}this.setIndex(i),this.setAttribute(`position`,new wr(a,3)),this.setAttribute(`uv`,new wr(o,2)),this.setAttribute(`normal`,new wr(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.points,t.segments,t.phiStart,t.phiLength)}},So=class e extends Ir{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new wr(p,3)),this.setAttribute(`normal`,new wr(m,3)),this.setAttribute(`uv`,new wr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},Co=class e extends Ir{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new R,p=new L;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new wr(s,3)),this.setAttribute(`normal`,new wr(c,3)),this.setAttribute(`uv`,new wr(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},wo=class e extends Ir{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new R,d=new R,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new wr(p,3)),this.setAttribute(`normal`,new wr(m,3)),this.setAttribute(`uv`,new wr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},To=class e extends Ir{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2,a=0,o=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let s=[],c=[],l=[],u=[],d=new R,f=new R,p=new R;for(let s=0;s<=n;s++){let m=a+s/n*o;for(let a=0;a<=r;a++){let o=a/r*i;f.x=(e+t*Math.cos(m))*Math.cos(o),f.y=(e+t*Math.cos(m))*Math.sin(o),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(o),d.y=e*Math.sin(o),p.subVectors(f,d).normalize(),l.push(p.x,p.y,p.z),u.push(a/r),u.push(s/n)}}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,a=(r+1)*(e-1)+t,o=(r+1)*e+t;s.push(n,i,o),s.push(i,a,o)}this.setIndex(s),this.setAttribute(`position`,new wr(c,3)),this.setAttribute(`normal`,new wr(l,3)),this.setAttribute(`uv`,new wr(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};function Eo(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(Oo(i))i.isRenderTargetTexture?(I(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(Oo(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function Do(e){let t={};for(let n=0;n<e.length;n++){let r=Eo(e[n]);for(let e in r)t[e]=r[e]}return t}function Oo(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function ko(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Ao(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Ut.workingColorSpace}var jo={clone:Eo,merge:Do},Mo=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,No=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Po=class extends Gr{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Mo,this.fragmentShader=No,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Eo(e.uniforms),this.uniformsGroups=ko(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new B().setHex(r.value);break;case`v2`:this.uniforms[n].value=new L().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new R().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new en().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new Rt().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new on().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Fo=class extends Po{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},Io=class extends Gr{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type=`MeshPhongMaterial`,this.color=new B(16777215),this.specular=new B(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new B(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new L(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gn,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},W=class extends Gr{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new B(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new B(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new L(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gn,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Lo=class extends Gr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=Ve,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ro=class extends Gr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function zo(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function Bo(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var Vo=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},Ho=class extends Vo{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Re,endingEnd:Re}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case ze:i=e,o=2*t-n;break;case Be:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case ze:a=e,s=2*n-t;break;case Be:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},Uo=class extends Vo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},Wo=class extends Vo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Go=class extends Vo{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=Jo(n,t,g,y,r);i[p]=Ko(x,o,_,b,m)}return i}};function Ko(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function qo(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function Jo(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=Ko(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=qo(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var Yo=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=zo(t,this.TimeBufferType),this.values=zo(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:zo(e.times,Array),values:zo(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),Bo(e.settings)&&(n.settings={inTangents:zo(e.settings.inTangents,Array),outTangents:zo(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Wo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Uo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ho(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Go(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Fe:t=this.InterpolantFactoryMethodDiscrete;break;case Ie:t=this.InterpolantFactoryMethodLinear;break;case Le:t=this.InterpolantFactoryMethodSmooth;break;case F:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return I(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Fe;case this.InterpolantFactoryMethodLinear:return Ie;case this.InterpolantFactoryMethodSmooth:return Le;case this.InterpolantFactoryMethodBezier:return F}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;Bo(this.settings)&&(Xo(this.settings.inTangents,e),Xo(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(rt(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(rt(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){rt(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){rt(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&Ze(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){rt(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Le,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,Bo(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function Xo(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}Yo.prototype.ValueTypeName=``,Yo.prototype.TimeBufferType=Float32Array,Yo.prototype.ValueBufferType=Float32Array,Yo.prototype.DefaultInterpolation=Ie;var Zo=class extends Yo{constructor(e,t,n){super(e,t,n)}};Zo.prototype.ValueTypeName=`bool`,Zo.prototype.ValueBufferType=Array,Zo.prototype.DefaultInterpolation=Fe,Zo.prototype.InterpolantFactoryMethodLinear=void 0,Zo.prototype.InterpolantFactoryMethodSmooth=void 0;var Qo=class extends Yo{constructor(e,t,n,r){super(e,t,n,r)}};Qo.prototype.ValueTypeName=`color`;var $o=class extends Yo{constructor(e,t,n,r){super(e,t,n,r)}};$o.prototype.ValueTypeName=`number`;var es=class extends Vo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)Ft.slerpFlat(i,0,a,c-o,a,c,s);return i}},ts=class extends Yo{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new es(this.times,this.values,this.getValueSize(),e)}};ts.prototype.ValueTypeName=`quaternion`,ts.prototype.InterpolantFactoryMethodSmooth=void 0;var ns=class extends Yo{constructor(e,t,n){super(e,t,n)}};ns.prototype.ValueTypeName=`string`,ns.prototype.ValueBufferType=Array,ns.prototype.DefaultInterpolation=Fe,ns.prototype.InterpolantFactoryMethodLinear=void 0,ns.prototype.InterpolantFactoryMethodSmooth=void 0;var rs=class extends Yo{constructor(e,t,n,r){super(e,t,n,r)}};rs.prototype.ValueTypeName=`vector`;var is=class extends Nn{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new B(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},as=class extends is{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(Nn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new B(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},os=new on,ss=new R,cs=new R,ls=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new L(512,512),this.mapType=d,this.map=null,this.mapPass=null,this.matrix=new on,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Bi,this._frameExtents=new L(1,1),this._viewportCount=1,this._viewports=[new en(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;ss.setFromMatrixPosition(e.matrixWorld),t.position.copy(ss),cs.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(cs),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){os.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(os,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(os)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},us=new R,ds=new Ft,fs=new R,ps=class extends Nn{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new on,this.projectionMatrix=new on,this.projectionMatrixInverse=new on,this.coordinateSystem=Ye,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(us,ds,fs),fs.x===1&&fs.y===1&&fs.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(us,ds,fs.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(us,ds,fs),fs.x===1&&fs.y===1&&fs.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(us,ds,fs.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ms=new R,hs=new L,gs=new L,_s=class extends ps{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=dt*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ut*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return dt*2*Math.atan(Math.tan(ut*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ms.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ms.x,ms.y).multiplyScalar(-e/ms.z),ms.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ms.x,ms.y).multiplyScalar(-e/ms.z)}getViewSize(e,t){return this.getViewBounds(e,hs,gs),t.subVectors(gs,hs)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ut*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},vs=class extends ps{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},ys=class extends ls{constructor(){super(new vs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},bs=class extends is{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(Nn.DEFAULT_UP),this.updateMatrix(),this.target=new Nn,this.shadow=new ys}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},xs=class extends Ir{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type=`InstancedBufferGeometry`,this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}},Ss=-90,Cs=1,ws=class extends Nn{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new _s(Ss,Cs,e,t);r.layers=this.layers,this.add(r);let i=new _s(Ss,Cs,e,t);i.layers=this.layers,this.add(i);let a=new _s(Ss,Cs,e,t);a.layers=this.layers,this.add(a);let o=new _s(Ss,Cs,e,t);o.layers=this.layers,this.add(o);let s=new _s(Ss,Cs,e,t);s.layers=this.layers,this.add(s);let c=new _s(Ss,Cs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Ts=class extends _s{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Es=`\\[\\]\\.:\\/`,Ds=RegExp(`[\\[\\]\\.:\\/]`,`g`),Os=`[^\\[\\]\\.:\\/]`,ks=`[^`+Es.replace(`\\.`,``)+`]`,As=`((?:WC+[\\/:])*)`.replace(`WC`,Os),js=`(WCOD+)?`.replace(`WCOD`,ks),Ms=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,Os),Ns=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,Os),Ps=RegExp(`^`+As+js+Ms+Ns+`$`),Fs=[`material`,`materials`,`bones`,`map`],Is=class{constructor(e,t,n){let r=n||Ls.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Ls=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(Ds,``)}static parseTrackName(e){let t=Ps.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);Fs.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){I(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){rt(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){rt(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){rt(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){rt(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){rt(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){rt(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){rt(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;rt(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){rt(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){rt(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ls.Composite=Is,Ls.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Ls.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Ls.prototype.GetterByBindingType=[Ls.prototype._getValue_direct,Ls.prototype._getValue_array,Ls.prototype._getValue_arrayElement,Ls.prototype._getValue_toArray],Ls.prototype.SetterByBindingTypeAndVersioning=[[Ls.prototype._setValue_direct,Ls.prototype._setValue_direct_setNeedsUpdate,Ls.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ls.prototype._setValue_array,Ls.prototype._setValue_array_setNeedsUpdate,Ls.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ls.prototype._setValue_arrayElement,Ls.prototype._setValue_arrayElement_setNeedsUpdate,Ls.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ls.prototype._setValue_fromArray,Ls.prototype._setValue_fromArray_setNeedsUpdate,Ls.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]],class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}};function Rs(e,t,n,r){let i=zs(r);switch(n){case w:return e*t;case O:return e*t/i.components*i.byteLength;case k:return e*t/i.components*i.byteLength;case A:return e*t*2/i.components*i.byteLength;case te:return e*t*2/i.components*i.byteLength;case T:return e*t*3/i.components*i.byteLength;case E:return e*t*4/i.components*i.byteLength;case ne:return e*t*4/i.components*i.byteLength;case j:case re:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case M:case ie:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case oe:case ce:return Math.max(e,16)*Math.max(t,8)/4;case ae:case se:return Math.max(e,8)*Math.max(t,8)/2;case le:case ue:case de:case fe:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case N:case pe:case me:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case he:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ge:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case _e:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case ve:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case ye:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case be:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case xe:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Se:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Ce:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case we:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Te:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Ee:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case De:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Oe:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case ke:case Ae:case je:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Me:case Ne:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Pe:case P:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function zs(e){switch(e){case d:case f:return{byteLength:1,components:1};case m:case p:case v:return{byteLength:2,components:1};case y:case b:return{byteLength:2,components:4};case g:case h:case _:return{byteLength:4,components:1};case S:case C:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`186`}})),typeof window<`u`&&(window.__THREE__?I(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`186`);function Bs(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Vs(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var Hs={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},G={common:{diffuse:{value:new B(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Rt},alphaMap:{value:null},alphaMapTransform:{value:new Rt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Rt}},envmap:{envMap:{value:null},envMapRotation:{value:new Rt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Rt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Rt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Rt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Rt},normalScale:{value:new L(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Rt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Rt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Rt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Rt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new B(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new R},probesMax:{value:new R},probesResolution:{value:new R}},points:{diffuse:{value:new B(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Rt},alphaTest:{value:0},uvTransform:{value:new Rt}},sprite:{diffuse:{value:new B(16777215)},opacity:{value:1},center:{value:new L(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Rt},alphaMap:{value:null},alphaMapTransform:{value:new Rt},alphaTest:{value:0}}},Us={basic:{uniforms:Do([G.common,G.specularmap,G.envmap,G.aomap,G.lightmap,G.fog]),vertexShader:Hs.meshbasic_vert,fragmentShader:Hs.meshbasic_frag},lambert:{uniforms:Do([G.common,G.specularmap,G.envmap,G.aomap,G.lightmap,G.emissivemap,G.bumpmap,G.normalmap,G.displacementmap,G.fog,G.lights,{emissive:{value:new B(0)},envMapIntensity:{value:1}}]),vertexShader:Hs.meshlambert_vert,fragmentShader:Hs.meshlambert_frag},phong:{uniforms:Do([G.common,G.specularmap,G.envmap,G.aomap,G.lightmap,G.emissivemap,G.bumpmap,G.normalmap,G.displacementmap,G.fog,G.lights,{emissive:{value:new B(0)},specular:{value:new B(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Hs.meshphong_vert,fragmentShader:Hs.meshphong_frag},standard:{uniforms:Do([G.common,G.envmap,G.aomap,G.lightmap,G.emissivemap,G.bumpmap,G.normalmap,G.displacementmap,G.roughnessmap,G.metalnessmap,G.fog,G.lights,{emissive:{value:new B(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Hs.meshphysical_vert,fragmentShader:Hs.meshphysical_frag},toon:{uniforms:Do([G.common,G.aomap,G.lightmap,G.emissivemap,G.bumpmap,G.normalmap,G.displacementmap,G.gradientmap,G.fog,G.lights,{emissive:{value:new B(0)}}]),vertexShader:Hs.meshtoon_vert,fragmentShader:Hs.meshtoon_frag},matcap:{uniforms:Do([G.common,G.bumpmap,G.normalmap,G.displacementmap,G.fog,{matcap:{value:null}}]),vertexShader:Hs.meshmatcap_vert,fragmentShader:Hs.meshmatcap_frag},points:{uniforms:Do([G.points,G.fog]),vertexShader:Hs.points_vert,fragmentShader:Hs.points_frag},dashed:{uniforms:Do([G.common,G.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Hs.linedashed_vert,fragmentShader:Hs.linedashed_frag},depth:{uniforms:Do([G.common,G.displacementmap]),vertexShader:Hs.depth_vert,fragmentShader:Hs.depth_frag},normal:{uniforms:Do([G.common,G.bumpmap,G.normalmap,G.displacementmap,{opacity:{value:1}}]),vertexShader:Hs.meshnormal_vert,fragmentShader:Hs.meshnormal_frag},sprite:{uniforms:Do([G.sprite,G.fog]),vertexShader:Hs.sprite_vert,fragmentShader:Hs.sprite_frag},background:{uniforms:{uvTransform:{value:new Rt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Hs.background_vert,fragmentShader:Hs.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Rt}},vertexShader:Hs.backgroundCube_vert,fragmentShader:Hs.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Hs.cube_vert,fragmentShader:Hs.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Hs.equirect_vert,fragmentShader:Hs.equirect_frag},distance:{uniforms:Do([G.common,G.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Hs.distance_vert,fragmentShader:Hs.distance_frag},shadow:{uniforms:Do([G.lights,G.fog,{color:{value:new B(0)},opacity:{value:1}}]),vertexShader:Hs.shadow_vert,fragmentShader:Hs.shadow_frag}};Us.physical={uniforms:Do([Us.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Rt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Rt},clearcoatNormalScale:{value:new L(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Rt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Rt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Rt},sheen:{value:0},sheenColor:{value:new B(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Rt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Rt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Rt},transmissionSamplerSize:{value:new L},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Rt},attenuationDistance:{value:0},attenuationColor:{value:new B(0)},specularColor:{value:new B(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Rt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Rt},anisotropyVector:{value:new L},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Rt}}]),vertexShader:Hs.meshphysical_vert,fragmentShader:Hs.meshphysical_frag};var Ws={r:0,b:0,g:0},Gs=new on,Ks=new Rt;Ks.set(-1,0,0,0,1,0,0,0,1);function qs(e,t,n,r,i,a){let o=new B(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new V(new H(1,1,1),new Po({name:`BackgroundCubeMaterial`,uniforms:Eo(Us.backgroundCube.uniforms),vertexShader:Us.backgroundCube.vertexShader,fragmentShader:Us.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Gs.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Ks),l.material.toneMapped=Ut.getTransfer(i.colorSpace)!==Ge,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new V(new So(2,2),new Po({name:`BackgroundMaterial`,uniforms:Eo(Us.background.uniforms),vertexShader:Us.background.vertexShader,fragmentShader:Us.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=Ut.getTransfer(i.colorSpace)!==Ge,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(Ws,Ao(e)),n.buffers.color.setClear(Ws.r,Ws.g,Ws.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function Js(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Ys(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Xs(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(I(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&I(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Zs(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Ur,s=new Rt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Qs=4,$s=6,ec=20,tc=256,nc=new vs,rc=new B,ic=null,ac=0,oc=0,sc=!1,cc=new R,lc=new R,uc=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=cc}=i;ic=this._renderer.getRenderTarget(),ac=this._renderer.getActiveCubeFace(),oc=this._renderer.getActiveMipmapLevel(),sc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=_c(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=gc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(ic,ac,oc),this._renderer.xr.enabled=sc,e.scissorTest=!1,pc(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ic=this._renderer.getRenderTarget(),ac=this._renderer.getActiveCubeFace(),oc=this._renderer.getActiveMipmapLevel(),sc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:c,minFilter:c,generateMipmaps:!1,type:v,format:E,colorSpace:Ue,depthBuffer:!1},r=fc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=fc(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=dc(r)),this._blurMaterial=hc(r,e,t),this._ggxMaterial=mc(r,e,t)}return r}_compileMaterial(e){let t=new V(new Ir,e);this._renderer.compile(t,nc)}_sceneToCubeUV(e,t,n,r,i){let a=new _s(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(rc),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new V(new H,new pi({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(rc),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;pc(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=_c()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=gc());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;pc(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,nc)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-Qs?n-d+Qs:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,pc(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,nc),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,pc(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,nc)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];pc(t,3*l*(r>this._lodMax-Qs?r-this._lodMax+Qs:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,nc)}};function dc(e){let t=[],n=[],r=e,i=e-Qs+1+$s;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?lc.set(1,r,n):e===1?lc.set(-n,1,-r):e===2?lc.set(-n,r,1):e===3?lc.set(-1,r,-n):e===4?lc.set(-n,-1,r):lc.set(n,r,-1),lc.toArray(l,(e*6+t)*3)}}let u=new Ir;u.setAttribute(`position`,new xr(c,3)),u.setAttribute(`outputDirection`,new xr(l,3)),n.push(new V(u,null)),r>Qs&&r--}return{lodMeshes:n,sizeLods:t}}function fc(e,t,n){let r=new nn(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function pc(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function mc(e,t,n){return new Po({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:tc,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:vc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function hc(e,t,n){return new Po({name:`SphericalGaussianBlur`,defines:{SAMPLES:ec,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:vc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function gc(){return new Po({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:vc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function _c(){return new Po({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:vc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function vc(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var yc=class extends nn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Ji(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new H(5,5,5),i=new Po({name:`CubemapFromEquirect`,uniforms:Eo(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new V(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=c),new ws(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function bc(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new yc(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new uc(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new uc(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function xc(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&it(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Sc(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0||(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++),t}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?Cr:Sr)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function Cc(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function wc(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:rt(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Tc(e,t,n){let r=new WeakMap,i=new en;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new rn(h,p,m,u);g.type=_,g.needsUpdate=!0;let v=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*v;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new L(p,m)},r.set(o,d);function y(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,y)}o.addEventListener(`dispose`,y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function Ec(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var Dc={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function Oc(e,t,n,r,i,a){let o=new nn(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new Ir;l.setAttribute(`position`,new wr([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new wr([0,2,0,0,2,0],2));let u=new Fo({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new V(l,u),f=new vs(-1,1,1,-1,0,1),p=null,m=null,h=!1,g,_=null,y=[],b=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<y.length;n++){let r=y[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){y=e,b=y.length>0&&y[0].isRenderPass===!0;let t=o.width,n=o.height;y.length>0&&s===null&&(s=new nn(t,n,{type:v,depthBuffer:!1,stencilBuffer:!1}),c=new nn(t,n,{type:v,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<y.length;e++){let r=y[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&y.length===0)return!1;if(_=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return b===!1&&e.setRenderTarget(o),g=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return b},this.end=function(e,t){e.toneMapping=g,h=!0;let n=o,r=s;for(let i=0;i<y.length;i++){let a=y[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},Ut.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=Dc[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(_),e.render(d,f),_=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var kc=new $t,Ac=new Xi(1,1),jc=new rn,Mc=new an,Nc=new Ji,Pc=[],Fc=[],Ic=new Float32Array(16),Lc=new Float32Array(9),Rc=new Float32Array(4);function zc(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Pc[i];if(a===void 0&&(a=new Float32Array(i),Pc[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Bc(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Vc(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Hc(e,t){let n=Fc[t];n===void 0&&(n=new Int32Array(t),Fc[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Uc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Wc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Bc(n,t))return;e.uniform2fv(this.addr,t),Vc(n,t)}}function Gc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Bc(n,t))return;e.uniform3fv(this.addr,t),Vc(n,t)}}function Kc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Bc(n,t))return;e.uniform4fv(this.addr,t),Vc(n,t)}}function qc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Bc(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Vc(n,t)}else{if(Bc(n,r))return;Rc.set(r),e.uniformMatrix2fv(this.addr,!1,Rc),Vc(n,r)}}function Jc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Bc(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Vc(n,t)}else{if(Bc(n,r))return;Lc.set(r),e.uniformMatrix3fv(this.addr,!1,Lc),Vc(n,r)}}function Yc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Bc(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Vc(n,t)}else{if(Bc(n,r))return;Ic.set(r),e.uniformMatrix4fv(this.addr,!1,Ic),Vc(n,r)}}function Xc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Zc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Bc(n,t))return;e.uniform2iv(this.addr,t),Vc(n,t)}}function Qc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Bc(n,t))return;e.uniform3iv(this.addr,t),Vc(n,t)}}function $c(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Bc(n,t))return;e.uniform4iv(this.addr,t),Vc(n,t)}}function el(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function tl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Bc(n,t))return;e.uniform2uiv(this.addr,t),Vc(n,t)}}function nl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Bc(n,t))return;e.uniform3uiv(this.addr,t),Vc(n,t)}}function rl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Bc(n,t))return;e.uniform4uiv(this.addr,t),Vc(n,t)}}function il(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(Ac.compareFunction=n.isReversedDepthBuffer()?518:515,a=Ac):a=kc,n.setTexture2D(t||a,i)}function al(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||Mc,i)}function ol(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||Nc,i)}function sl(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||jc,i)}function cl(e){switch(e){case 5126:return Uc;case 35664:return Wc;case 35665:return Gc;case 35666:return Kc;case 35674:return qc;case 35675:return Jc;case 35676:return Yc;case 5124:case 35670:return Xc;case 35667:case 35671:return Zc;case 35668:case 35672:return Qc;case 35669:case 35673:return $c;case 5125:return el;case 36294:return tl;case 36295:return nl;case 36296:return rl;case 35678:case 36198:case 36298:case 36306:case 35682:return il;case 35679:case 36299:case 36307:return al;case 35680:case 36300:case 36308:case 36293:return ol;case 36289:case 36303:case 36311:case 36292:return sl}}function ll(e,t){e.uniform1fv(this.addr,t)}function ul(e,t){let n=zc(t,this.size,2);e.uniform2fv(this.addr,n)}function dl(e,t){let n=zc(t,this.size,3);e.uniform3fv(this.addr,n)}function fl(e,t){let n=zc(t,this.size,4);e.uniform4fv(this.addr,n)}function pl(e,t){let n=zc(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function ml(e,t){let n=zc(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function hl(e,t){let n=zc(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function gl(e,t){e.uniform1iv(this.addr,t)}function _l(e,t){e.uniform2iv(this.addr,t)}function vl(e,t){e.uniform3iv(this.addr,t)}function yl(e,t){e.uniform4iv(this.addr,t)}function bl(e,t){e.uniform1uiv(this.addr,t)}function xl(e,t){e.uniform2uiv(this.addr,t)}function Sl(e,t){e.uniform3uiv(this.addr,t)}function Cl(e,t){e.uniform4uiv(this.addr,t)}function wl(e,t,n){let r=this.cache,i=t.length,a=Hc(n,i);Bc(r,a)||(e.uniform1iv(this.addr,a),Vc(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?Ac:kc;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function Tl(e,t,n){let r=this.cache,i=t.length,a=Hc(n,i);Bc(r,a)||(e.uniform1iv(this.addr,a),Vc(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||Mc,a[e])}function El(e,t,n){let r=this.cache,i=t.length,a=Hc(n,i);Bc(r,a)||(e.uniform1iv(this.addr,a),Vc(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||Nc,a[e])}function Dl(e,t,n){let r=this.cache,i=t.length,a=Hc(n,i);Bc(r,a)||(e.uniform1iv(this.addr,a),Vc(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||jc,a[e])}function Ol(e){switch(e){case 5126:return ll;case 35664:return ul;case 35665:return dl;case 35666:return fl;case 35674:return pl;case 35675:return ml;case 35676:return hl;case 5124:case 35670:return gl;case 35667:case 35671:return _l;case 35668:case 35672:return vl;case 35669:case 35673:return yl;case 5125:return bl;case 36294:return xl;case 36295:return Sl;case 36296:return Cl;case 35678:case 36198:case 36298:case 36306:case 35682:return wl;case 35679:case 36299:case 36307:return Tl;case 35680:case 36300:case 36308:case 36293:return El;case 36289:case 36303:case 36311:case 36292:return Dl}}var kl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=cl(t.type)}},Al=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ol(t.type)}},jl=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},Ml=/(\w+)(\])?(\[|\.)?/g;function Nl(e,t){e.seq.push(t),e.map[t.id]=t}function Pl(e,t,n){let r=e.name,i=r.length;for(Ml.lastIndex=0;;){let a=Ml.exec(r),o=Ml.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Nl(n,l===void 0?new kl(s,e,t):new Al(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new jl(s),Nl(n,e)),n=e}}}var Fl=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);Pl(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Il(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var Ll=37297,Rl=0;function zl(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Bl=new Rt;function Vl(e){Ut._getMatrix(Bl,Ut.workingColorSpace,e);let t=`mat3( ${Bl.elements.map(e=>e.toFixed(4))} )`;switch(Ut.getTransfer(e)){case We:return[t,`LinearTransferOETF`];case Ge:return[t,`sRGBTransferOETF`];default:return I(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Hl(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+zl(e.getShaderSource(t),r)}return i}function Ul(e,t){let n=Vl(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var Wl={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function Gl(e,t){let n=Wl[t];return n===void 0?(I(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Kl=new R;function ql(){return Ut.getLuminanceCoefficients(Kl),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Kl.x.toFixed(4)}, ${Kl.y.toFixed(4)}, ${Kl.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Jl(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Zl).join(`
`)}function Yl(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Xl(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Zl(e){return e!==``}function Ql(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function $l(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var eu=/^[ \t]*#include +<([\w\d./]+)>/gm;function tu(e){return e.replace(eu,ru)}var nu=new Map;function ru(e,t){let n=Hs[t];if(n===void 0){let e=nu.get(t);if(e!==void 0)n=Hs[e],I(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return tu(n)}var iu=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function au(e){return e.replace(iu,ou)}function ou(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function su(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var cu={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function lu(e){return cu[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var uu={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function du(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:uu[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var fu={302:`ENVMAP_MODE_REFRACTION`};function pu(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:fu[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var mu={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function hu(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:mu[e.combine]||`ENVMAP_BLENDING_NONE`}function gu(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function _u(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=lu(n),l=du(n),u=pu(n),d=hu(n),f=gu(n),p=Jl(n),m=Yl(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Zl).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Zl).join(`
`),_.length>0&&(_+=`
`)):(g=[su(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Zl).join(`
`),_=[su(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Hs.tonemapping_pars_fragment,n.toneMapping===0?``:Gl(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Hs.colorspace_pars_fragment,Ul(`linearToOutputTexel`,n.outputColorSpace),ql(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Zl).join(`
`)),o=tu(o),o=Ql(o,n),o=$l(o,n),s=tu(s),s=Ql(s,n),s=$l(s,n),o=au(o),s=au(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=Il(i,i.VERTEX_SHADER,y),S=Il(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=Hl(i,x,`vertex`),n=Hl(i,S,`fragment`);rt(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):I(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new Fl(i,h),T=Xl(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,Ll)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Rl++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var vu=0,yu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new bu(e),t.set(e,n)),n}},bu=class{constructor(e){this.id=vu++,this.code=e,this.usedTimes=0}};function xu(e){return e===1030||e===37490||e===36285}function Su(e,t,n,r,i,a){let o=new _n,s=new yu,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&I(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,ee,O,k;if(C){let e=Us[C];D=e.vertexShader,ee=e.fragmentShader}else{D=i.vertexShader,ee=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),O=e.id,k=t.id}let A=e.getRenderTarget(),te=e.state.buffers.depth.getReversed(),ne=h.isInstancedMesh===!0,j=h.isBatchedMesh===!0,re=!!i.map,M=!!i.matcap,ie=!!x,ae=!!i.aoMap,oe=!!i.lightMap,se=!!i.bumpMap&&i.wireframe===!1,ce=!!i.normalMap,le=!!i.displacementMap,ue=!!i.emissiveMap,N=!!i.metalnessMap,de=!!i.roughnessMap,fe=i.anisotropy>0,pe=i.clearcoat>0,me=i.dispersion>0,he=i.retroreflectivity>0,ge=i.iridescence>0,_e=i.sheen>0,ve=i.transmission>0,ye=fe&&!!i.anisotropyMap,be=pe&&!!i.clearcoatMap,xe=pe&&!!i.clearcoatNormalMap,Se=pe&&!!i.clearcoatRoughnessMap,Ce=ge&&!!i.iridescenceMap,we=ge&&!!i.iridescenceThicknessMap,Te=_e&&!!i.sheenColorMap,Ee=_e&&!!i.sheenRoughnessMap,De=!!i.specularMap,Oe=!!i.specularColorMap,ke=!!i.specularIntensityMap,Ae=ve&&!!i.transmissionMap,je=ve&&!!i.thicknessMap,Me=!!i.gradientMap,Ne=!!i.alphaMap,Pe=i.alphaTest>0,P=!!i.alphaHash,Fe=!!i.extensions,Ie=0;i.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Ie=e.toneMapping);let Le={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:ee,defines:i.defines,customVertexShaderID:O,customFragmentShaderID:k,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:j,batchingColor:j&&h._colorsTexture!==null,instancing:ne,instancingColor:ne&&h.instanceColor!==null,instancingMorph:ne&&h.morphTexture!==null,outputColorSpace:A===null?e.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Ut.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:re,matcap:M,envMap:ie,envMapMode:ie&&x.mapping,envMapCubeUVHeight:S,aoMap:ae,lightMap:oe,bumpMap:se,normalMap:ce,displacementMap:le,emissiveMap:ue,normalMapObjectSpace:ce&&i.normalMapType===1,normalMapTangentSpace:ce&&i.normalMapType===0,packedNormalMap:ce&&i.normalMapType===0&&xu(i.normalMap.format),metalnessMap:N,roughnessMap:de,anisotropy:fe,anisotropyMap:ye,clearcoat:pe,clearcoatMap:be,clearcoatNormalMap:xe,clearcoatRoughnessMap:Se,dispersion:me,retroreflection:he,iridescence:ge,iridescenceMap:Ce,iridescenceThicknessMap:we,sheen:_e,sheenColorMap:Te,sheenRoughnessMap:Ee,specularMap:De,specularColorMap:Oe,specularIntensityMap:ke,transmission:ve,transmissionMap:Ae,thicknessMap:je,gradientMap:Me,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Ne,alphaTest:Pe,alphaHash:P,combine:i.combine,mapUv:re&&m(i.map.channel),aoMapUv:ae&&m(i.aoMap.channel),lightMapUv:oe&&m(i.lightMap.channel),bumpMapUv:se&&m(i.bumpMap.channel),normalMapUv:ce&&m(i.normalMap.channel),displacementMapUv:le&&m(i.displacementMap.channel),emissiveMapUv:ue&&m(i.emissiveMap.channel),metalnessMapUv:N&&m(i.metalnessMap.channel),roughnessMapUv:de&&m(i.roughnessMap.channel),anisotropyMapUv:ye&&m(i.anisotropyMap.channel),clearcoatMapUv:be&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:xe&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Se&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:Ce&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:we&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&m(i.sheenRoughnessMap.channel),specularMapUv:De&&m(i.specularMap.channel),specularColorMapUv:Oe&&m(i.specularColorMap.channel),specularIntensityMapUv:ke&&m(i.specularIntensityMap.channel),transmissionMapUv:Ae&&m(i.transmissionMap.channel),thicknessMapUv:je&&m(i.thicknessMap.channel),alphaMapUv:Ne&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(ce||fe),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(re||Ne),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&ce===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:te,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Ie,decodeVideoTexture:re&&i.map.isVideoTexture===!0&&Ut.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:ue&&i.emissiveMap.isVideoTexture===!0&&Ut.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Fe&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Fe&&i.extensions.multiDraw===!0||j)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Le.vertexUv1s=c.has(1),Le.vertexUv2s=c.has(2),Le.vertexUv3s=c.has(3),c.clear(),Le}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=Us[t];n=jo.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new _u(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function Cu(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function wu(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Tu(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Eu(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||wu),r.length>1&&r.sort(t||Tu),i.length>1&&i.sort(t||Tu)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function Du(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new Eu,e.set(t,[i])):n>=r.length?(i=new Eu,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Ou(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new R,color:new B};break;case`SpotLight`:n={position:new R,direction:new R,color:new B,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new R,color:new B,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new R,skyColor:new B,groundColor:new B};break;case`RectAreaLight`:n={color:new B,position:new R,halfWidth:new R,halfHeight:new R}}return e[t.id]=n,n}}}function ku(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new L};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new L};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new L,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var Au=0;function ju(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function Mu(e){let t=new Ou,n=ku(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new R);let i=new R,a=new on,o=new on;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(ju);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=G.LTC_FLOAT_1,r.rectAreaLTC2=G.LTC_FLOAT_2):(r.rectAreaLTC1=G.LTC_HALF_1,r.rectAreaLTC2=G.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=Au++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function Nu(e){let t=new Mu(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function Pu(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new Nu(e),t.set(n,[a])):r>=i.length?(a=new Nu(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var Fu=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Iu=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Lu=[new R(1,0,0),new R(-1,0,0),new R(0,1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1)],Ru=[new R(0,-1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1),new R(0,-1,0),new R(0,-1,0)],zu=new on,Bu=new R,Vu=new R;function Hu(e,t,n){let r=new Bi,i=new L,o=new L,s=new en,l=new Lo,u=new Ro,d={},f=n.maxTextureSize,p={0:1,1:0,2:2},m=new Po({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new L},radius:{value:4}},vertexShader:Fu,fragmentShader:Iu}),h=m.clone();h.defines.HORIZONTAL_PASS=1;let y=new Ir;y.setAttribute(`position`,new xr(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new V(y,m),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let S=this.type;this.render=function(t,n,l){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||t.length===0)return;this.type===2&&(I(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),m=e.state;m.setBlending(0),m.buffers.depth.getReversed()===!0?m.buffers.color.setClear(0,0,0,0):m.buffers.color.setClear(1,1,1,1),m.buffers.depth.setTest(!0),m.setScissorTest(!1);let h=S!==this.type;h&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let u=0,d=t.length;u<d;u++){let d=t[u],p=d.shadow;if(p===void 0){I(`WebGLShadowMap:`,d,`has no shadow.`);continue}if(p.autoUpdate===!1&&p.needsUpdate===!1)continue;i.copy(p.mapSize);let y=p.getFrameExtents();i.multiply(y),o.copy(p.mapSize),(i.x>f||i.y>f)&&(i.x>f&&(o.x=Math.floor(f/y.x),i.x=o.x*y.x,p.mapSize.x=o.x),i.y>f&&(o.y=Math.floor(f/y.y),i.y=o.y*y.y,p.mapSize.y=o.y));let b=e.state.buffers.depth.getReversed();if(p.camera._reversedDepth=b,p.map===null||h===!0){if(p.map!==null&&(p.map.depthTexture!==null&&(p.map.depthTexture.dispose(),p.map.depthTexture=null),p.map.dispose()),this.type===3){if(d.isPointLight){I(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}p.map=new nn(i.x,i.y,{format:A,type:v,minFilter:c,magFilter:c,generateMipmaps:!1}),p.map.texture.name=d.name+`.shadowMap`,p.map.depthTexture=new Xi(i.x,i.y,_),p.map.depthTexture.name=d.name+`.shadowMapDepth`,p.map.depthTexture.format=D,p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=a,p.map.depthTexture.magFilter=a}else d.isPointLight?(p.map=new yc(i.x),p.map.depthTexture=new Zi(i.x,g)):(p.map=new nn(i.x,i.y),p.map.depthTexture=new Xi(i.x,i.y,g)),p.map.depthTexture.name=d.name+`.shadowMap`,p.map.depthTexture.format=D,this.type===1?(p.map.depthTexture.compareFunction=b?518:515,p.map.depthTexture.minFilter=c,p.map.depthTexture.magFilter=c):(p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=a,p.map.depthTexture.magFilter=a);p.camera.updateProjectionMatrix()}p.map.isWebGLCubeRenderTarget!==!0&&(p.map.width!==i.x||p.map.height!==i.y)&&p.map.setSize(i.x,i.y);let x=p.map.isWebGLCubeRenderTarget?6:p.getViewportCount();d.isPointLight!==!0&&p.updateMatrices(d,l);for(let t=0;t<x;t++){let i=p.getCamera(t);if(d.isPointLight){let e=p.camera,n=p.matrix,r=d.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),Bu.setFromMatrixPosition(d.matrixWorld),e.position.copy(Bu),Vu.copy(e.position),Vu.add(Lu[t]),e.up.copy(Ru[t]),e.lookAt(Vu),e.updateMatrixWorld(),n.makeTranslation(-Bu.x,-Bu.y,-Bu.z),zu.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),p._frustum.setFromProjectionMatrix(zu,e.coordinateSystem,e.reversedDepth)}if(p.map.isWebGLCubeRenderTarget)e.setRenderTarget(p.map,t),e.clear();else{t===0&&(e.setRenderTarget(p.map),e.clear());let n=p.getViewport(t);s.set(o.x*n.x,o.y*n.y,o.x*n.z,o.y*n.w),m.viewport(s)}r=p.getFrustum(t),T(n,l,i,d,this.type)}p.isPointLightShadow!==!0&&this.type===3&&C(p,l),p.needsUpdate=!1}S=this.type,x.needsUpdate=!1,e.setRenderTarget(u,d,p)};function C(n,r){let a=t.update(b);m.defines.VSM_SAMPLES!==n.blurSamples&&(m.defines.VSM_SAMPLES=n.blurSamples,h.defines.VSM_SAMPLES=n.blurSamples,m.needsUpdate=!0,h.needsUpdate=!0),n.mapPass===null?n.mapPass=new nn(i.x,i.y,{format:A,type:v}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),m.uniforms.shadow_pass.value=n.map.depthTexture,m.uniforms.resolution.value.set(n.map.width,n.map.height),m.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,m,b,null),h.uniforms.shadow_pass.value=n.mapPass.texture,h.uniforms.resolution.value.set(n.map.width,n.map.height),h.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,h,b,null)}function w(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?u:l,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=d[e];r===void 0&&(r={},d[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,E)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?p[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function T(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=w(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=w(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)T(c[e],i,a,o,s)}function E(e){e.target.removeEventListener(`dispose`,E);for(let t in d){let n=d[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function Uu(e,t){function n(){let t=!1,n=new en,r=null,i=new en(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?N(e.DEPTH_TEST):de(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=ot[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?N(e.STENCIL_TEST):de(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new B(0,0,0),T=0,E=!1,D=null,ee=null,O=null,k=null,A=null,te=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),ne=!1,j=0,re=e.getParameter(e.VERSION);re.indexOf(`WebGL`)===-1?re.indexOf(`OpenGL ES`)!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(re)[1]),ne=j>=2):(j=parseFloat(/^WebGL (\d)/.exec(re)[1]),ne=j>=1);let M=null,ie={},ae=e.getParameter(e.SCISSOR_BOX),oe=e.getParameter(e.VIEWPORT),se=new en().fromArray(ae),ce=new en().fromArray(oe);function le(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let ue={};ue[e.TEXTURE_2D]=le(e.TEXTURE_2D,e.TEXTURE_2D,1),ue[e.TEXTURE_CUBE_MAP]=le(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),ue[e.TEXTURE_2D_ARRAY]=le(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),ue[e.TEXTURE_3D]=le(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),N(e.DEPTH_TEST),o.setFunc(3),ye(!1),be(1),N(e.CULL_FACE),_e(0);function N(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function de(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function fe(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function pe(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function me(t){return h!==t&&(e.useProgram(t),h=t,!0)}let he={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};he[103]=e.MIN,he[104]=e.MAX;let ge={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function _e(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(de(e.BLEND),g=!1);else if(g===!1&&(N(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:rt(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:rt(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:rt(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:rt(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(he[n],he[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(ge[r],ge[i],ge[o],ge[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function ve(t,n){t.side===2?de(e.CULL_FACE):N(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ye(r),t.blending===1&&t.transparent===!1?_e(0):_e(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),Se(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?N(e.SAMPLE_ALPHA_TO_COVERAGE):de(e.SAMPLE_ALPHA_TO_COVERAGE)}function ye(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function be(t){t===0?de(e.CULL_FACE):(N(e.CULL_FACE),t!==ee&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),ee=t}function xe(t){t!==O&&(ne&&e.lineWidth(t),O=t)}function Se(t,n,r){t?(N(e.POLYGON_OFFSET_FILL),(k!==n||A!==r)&&(k=n,A=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):de(e.POLYGON_OFFSET_FILL)}function Ce(t){t?N(e.SCISSOR_TEST):de(e.SCISSOR_TEST)}function we(t){t===void 0&&(t=e.TEXTURE0+te-1),M!==t&&(e.activeTexture(t),M=t)}function Te(t,n,r){r===void 0&&(r=M===null?e.TEXTURE0+te-1:M);let i=ie[r];i===void 0&&(i={type:void 0,texture:void 0},ie[r]=i),(i.type!==t||i.texture!==n)&&(M!==r&&(e.activeTexture(r),M=r),e.bindTexture(t,n||ue[t]),i.type=t,i.texture=n)}function Ee(){let t=ie[M];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function De(){try{e.compressedTexImage2D(...arguments)}catch(e){rt(`WebGLState:`,e)}}function Oe(){try{e.compressedTexImage3D(...arguments)}catch(e){rt(`WebGLState:`,e)}}function ke(){try{e.texSubImage2D(...arguments)}catch(e){rt(`WebGLState:`,e)}}function Ae(){try{e.texSubImage3D(...arguments)}catch(e){rt(`WebGLState:`,e)}}function je(){try{e.compressedTexSubImage2D(...arguments)}catch(e){rt(`WebGLState:`,e)}}function Me(){try{e.compressedTexSubImage3D(...arguments)}catch(e){rt(`WebGLState:`,e)}}function Ne(){try{e.texStorage2D(...arguments)}catch(e){rt(`WebGLState:`,e)}}function Pe(){try{e.texStorage3D(...arguments)}catch(e){rt(`WebGLState:`,e)}}function P(){try{e.texImage2D(...arguments)}catch(e){rt(`WebGLState:`,e)}}function Fe(){try{e.texImage3D(...arguments)}catch(e){rt(`WebGLState:`,e)}}function Ie(t){return d[t]===void 0?e.getParameter(t):d[t]}function Le(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function F(t){se.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),se.copy(t))}function Re(t){ce.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),ce.copy(t))}function ze(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Be(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Ve(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},M=null,ie={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new B(0,0,0),T=0,E=!1,D=null,ee=null,O=null,k=null,A=null,se.set(0,0,e.canvas.width,e.canvas.height),ce.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:N,disable:de,bindFramebuffer:fe,drawBuffers:pe,useProgram:me,setBlending:_e,setMaterial:ve,setFlipSided:ye,setCullFace:be,setLineWidth:xe,setPolygonOffset:Se,setScissorTest:Ce,activeTexture:we,bindTexture:Te,unbindTexture:Ee,compressedTexImage2D:De,compressedTexImage3D:Oe,texImage2D:P,texImage3D:Fe,pixelStorei:Le,getParameter:Ie,updateUBOMapping:ze,uniformBlockBinding:Be,texStorage2D:Ne,texStorage3D:Pe,texSubImage2D:ke,texSubImage3D:Ae,compressedTexSubImage2D:je,compressedTexSubImage3D:Me,scissor:F,viewport:Re,reset:Ve}}function Wu(e,t,d,f,p,m,h){let g=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,_=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),v=new L,y=new WeakMap,b=new Set,x,S=new WeakMap,C=!1;try{C=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function w(e,t){return C?new OffscreenCanvas(e,t):Qe(`canvas`)}function T(e,t,n){let r=1,i=Ie(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);x===void 0&&(x=w(n,a));let o=t?w(n,a):x;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),I(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&I(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function E(e){return e.generateMipmaps}function D(t){e.generateMipmap(t)}function O(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function k(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];I(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||I(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?We:Ut.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function A(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,I(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function te(e,t){return E(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function ne(e){let t=e.target;t.removeEventListener(`dispose`,ne),re(t),t.isVideoTexture&&y.delete(t),t.isHTMLTexture&&b.delete(t)}function j(e){let t=e.target;t.removeEventListener(`dispose`,j),ie(t)}function re(e){let t=f.get(e);if(t.__webglInit===void 0)return;let n=e.source,r=S.get(n);if(r){let i=r[t.__cacheKey];i.usedTimes--,i.usedTimes===0&&M(e),Object.keys(r).length===0&&S.delete(n)}f.remove(e)}function M(t){let n=f.get(t);e.deleteTexture(n.__webglTexture);let r=t.source,i=S.get(r);delete i[n.__cacheKey],h.memory.textures--}function ie(t){let n=f.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),f.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let r=t.textures;for(let t=0,n=r.length;t<n;t++){let n=f.get(r[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),h.memory.textures--),f.remove(r[t])}f.remove(t)}let ae=0;function oe(){ae=0}function se(){return ae}function ce(e){ae=e}function le(){let e=ae;return e>=p.maxTextures&&I(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+p.maxTextures),ae+=1,e}function ue(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function N(t,n){let r=f.get(t);if(t.isVideoTexture&&P(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&r.__version!==t.version){let e=t.image;if(e===null)I(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)I(`WebGLRenderer: Texture marked for update but image is incomplete`);else{xe(r,t,n);return}}else t.isExternalTexture&&(r.__webglTexture=t.sourceTexture?t.sourceTexture:null);d.bindTexture(e.TEXTURE_2D,r.__webglTexture,e.TEXTURE0+n)}function de(t,n){let r=f.get(t);t.isRenderTargetTexture===!1&&t.version>0&&r.__version!==t.version?xe(r,t,n):(t.isExternalTexture&&(r.__webglTexture=t.sourceTexture?t.sourceTexture:null),d.bindTexture(e.TEXTURE_2D_ARRAY,r.__webglTexture,e.TEXTURE0+n))}function fe(t,n){let r=f.get(t);t.isRenderTargetTexture===!1&&t.version>0&&r.__version!==t.version?xe(r,t,n):d.bindTexture(e.TEXTURE_3D,r.__webglTexture,e.TEXTURE0+n)}function pe(t,n){let r=f.get(t);t.isCubeDepthTexture!==!0&&t.version>0&&r.__version!==t.version?Se(r,t,n):d.bindTexture(e.TEXTURE_CUBE_MAP,r.__webglTexture,e.TEXTURE0+n)}let me={[n]:e.REPEAT,[r]:e.CLAMP_TO_EDGE,[i]:e.MIRRORED_REPEAT},he={[a]:e.NEAREST,[o]:e.NEAREST_MIPMAP_NEAREST,[s]:e.NEAREST_MIPMAP_LINEAR,[c]:e.LINEAR,[l]:e.LINEAR_MIPMAP_NEAREST,[u]:e.LINEAR_MIPMAP_LINEAR},ge={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function _e(n,r){if(r.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(r.magFilter===1006||r.magFilter===1007||r.magFilter===1005||r.magFilter===1008||r.minFilter===1006||r.minFilter===1007||r.minFilter===1005||r.minFilter===1008)&&I(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,me[r.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,me[r.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,me[r.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,he[r.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,he[r.minFilter]),r.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,ge[r.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(r.magFilter===1003||r.minFilter!==1005&&r.minFilter!==1008||r.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(r.anisotropy>1||f.get(r).__currentAnisotropy){let i=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,i.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(r.anisotropy,p.getMaxAnisotropy())),f.get(r).__currentAnisotropy=r.anisotropy}}}function ve(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,ne));let i=n.source,a=S.get(i);a===void 0&&(a={},S.set(i,a));let o=ue(n);if(o!==t.__cacheKey){a[o]===void 0&&(a[o]={texture:e.createTexture(),usedTimes:0},h.memory.textures++,r=!0),a[o].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&M(n)),t.__cacheKey=o,t.__webglTexture=a[o].texture}return r}function ye(e,t,n){return Math.floor(Math.floor(e/n)/t)}function be(t,n,r,i){let a=t.updateRanges;if(a.length===0)d.texSubImage2D(e.TEXTURE_2D,0,0,0,n.width,n.height,r,i,n.data);else{a.sort((e,t)=>e.start-t.start);let o=0;for(let e=1;e<a.length;e++){let t=a[o],r=a[e],i=t.start+t.count,s=ye(r.start,n.width,4),c=ye(t.start,n.width,4);r.start<=i+1&&s===c&&ye(r.start+r.count-1,n.width,4)===s?t.count=Math.max(t.count,r.start+r.count-t.start):(++o,a[o]=r)}a.length=o+1;let s=d.getParameter(e.UNPACK_ROW_LENGTH),c=d.getParameter(e.UNPACK_SKIP_PIXELS),l=d.getParameter(e.UNPACK_SKIP_ROWS);d.pixelStorei(e.UNPACK_ROW_LENGTH,n.width);for(let t=0,o=a.length;t<o;t++){let o=a[t],s=Math.floor(o.start/4),c=Math.ceil(o.count/4),l=s%n.width,u=Math.floor(s/n.width),f=c;d.pixelStorei(e.UNPACK_SKIP_PIXELS,l),d.pixelStorei(e.UNPACK_SKIP_ROWS,u),d.texSubImage2D(e.TEXTURE_2D,0,l,u,f,1,r,i,n.data)}t.clearUpdateRanges(),d.pixelStorei(e.UNPACK_ROW_LENGTH,s),d.pixelStorei(e.UNPACK_SKIP_PIXELS,c),d.pixelStorei(e.UNPACK_SKIP_ROWS,l)}}function xe(t,n,r){let i=e.TEXTURE_2D;(n.isDataArrayTexture||n.isCompressedArrayTexture)&&(i=e.TEXTURE_2D_ARRAY),n.isData3DTexture&&(i=e.TEXTURE_3D);let a=ve(t,n),o=n.source;d.bindTexture(i,t.__webglTexture,e.TEXTURE0+r);let s=f.get(o);if(o.version!==s.__version||a===!0){if(d.activeTexture(e.TEXTURE0+r),!(typeof ImageBitmap<`u`&&n.image instanceof ImageBitmap)){let t=Ut.getPrimaries(Ut.workingColorSpace),r=n.colorSpace===``?null:Ut.getPrimaries(n.colorSpace),i=n.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;d.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,n.flipY),d.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,n.premultiplyAlpha),d.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}d.pixelStorei(e.UNPACK_ALIGNMENT,n.unpackAlignment);let t=T(n.image,!1,p.maxTextureSize);t=Fe(n,t);let c=m.convert(n.format,n.colorSpace),l=m.convert(n.type),u=k(n.internalFormat,c,l,n.normalized,n.colorSpace,n.isVideoTexture);_e(i,n);let f,h=n.mipmaps,g=n.isVideoTexture!==!0,_=s.__version===void 0||a===!0,v=o.dataReady,y=te(n,t);if(n.isDepthTexture)u=A(n.format===ee,n.type),_&&(g?d.texStorage2D(e.TEXTURE_2D,1,u,t.width,t.height):d.texImage2D(e.TEXTURE_2D,0,u,t.width,t.height,0,c,l,null));else if(n.isDataTexture){if(h.length>0){g&&_&&d.texStorage2D(e.TEXTURE_2D,y,u,h[0].width,h[0].height);for(let t=0,n=h.length;t<n;t++)f=h[t],g?v&&d.texSubImage2D(e.TEXTURE_2D,t,0,0,f.width,f.height,c,l,f.data):d.texImage2D(e.TEXTURE_2D,t,u,f.width,f.height,0,c,l,f.data);n.generateMipmaps=!1}else g?(_&&d.texStorage2D(e.TEXTURE_2D,y,u,t.width,t.height),v&&be(n,t,c,l)):d.texImage2D(e.TEXTURE_2D,0,u,t.width,t.height,0,c,l,t.data)}else if(n.isCompressedTexture){if(n.isCompressedArrayTexture){g&&_&&d.texStorage3D(e.TEXTURE_2D_ARRAY,y,u,h[0].width,h[0].height,t.depth);for(let r=0,i=h.length;r<i;r++)if(f=h[r],n.format!==1023){if(c!==null){if(g){if(v){if(n.layerUpdates.size>0){let t=Rs(f.width,f.height,n.format,n.type);for(let i of n.layerUpdates){let n=f.data.subarray(i*t/f.data.BYTES_PER_ELEMENT,(i+1)*t/f.data.BYTES_PER_ELEMENT);d.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,r,0,0,i,f.width,f.height,1,c,n)}}else d.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,r,0,0,0,f.width,f.height,t.depth,c,f.data)}}else d.compressedTexImage3D(e.TEXTURE_2D_ARRAY,r,u,f.width,f.height,t.depth,0,f.data,0,0)}else I(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else g?v&&d.texSubImage3D(e.TEXTURE_2D_ARRAY,r,0,0,0,f.width,f.height,t.depth,c,l,f.data):d.texImage3D(e.TEXTURE_2D_ARRAY,r,u,f.width,f.height,t.depth,0,c,l,f.data);n.layerUpdates.size>0&&n.clearLayerUpdates()}else{g&&_&&d.texStorage2D(e.TEXTURE_2D,y,u,h[0].width,h[0].height);for(let t=0,r=h.length;t<r;t++)f=h[t],n.format===1023?g?v&&d.texSubImage2D(e.TEXTURE_2D,t,0,0,f.width,f.height,c,l,f.data):d.texImage2D(e.TEXTURE_2D,t,u,f.width,f.height,0,c,l,f.data):c===null?I(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):g?v&&d.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,f.width,f.height,c,f.data):d.compressedTexImage2D(e.TEXTURE_2D,t,u,f.width,f.height,0,f.data)}}else if(n.isDataArrayTexture){if(g){if(_&&d.texStorage3D(e.TEXTURE_2D_ARRAY,y,u,t.width,t.height,t.depth),v){if(n.layerUpdates.size>0){let r=Rs(t.width,t.height,n.format,n.type);for(let i of n.layerUpdates){let n=t.data.subarray(i*r/t.data.BYTES_PER_ELEMENT,(i+1)*r/t.data.BYTES_PER_ELEMENT);d.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,i,t.width,t.height,1,c,l,n)}n.clearLayerUpdates()}else d.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,c,l,t.data)}}else d.texImage3D(e.TEXTURE_2D_ARRAY,0,u,t.width,t.height,t.depth,0,c,l,t.data)}else if(n.isData3DTexture)g?(_&&d.texStorage3D(e.TEXTURE_3D,y,u,t.width,t.height,t.depth),v&&d.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,c,l,t.data)):d.texImage3D(e.TEXTURE_3D,0,u,t.width,t.height,t.depth,0,c,l,t.data);else if(n.isFramebufferTexture){if(_){if(g)d.texStorage2D(e.TEXTURE_2D,y,u,t.width,t.height);else{let n=t.width,r=t.height;for(let t=0;t<y;t++)d.texImage2D(e.TEXTURE_2D,t,u,n,r,0,c,l,null),n>>=1,r>>=1}}}else if(n.isHTMLTexture){if(`texElementImage2D`in e){let r=e.canvas;if(r.hasAttribute(`layoutsubtree`)||r.setAttribute(`layoutsubtree`,`true`),t.parentNode!==r){r.appendChild(t),b.add(n),r.onpaint=e=>{let t=e.changedElements;for(let e of b)t.includes(e.image)&&(e.needsUpdate=!0)},r.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(h.length>0){if(g&&_){let t=Ie(h[0]);d.texStorage2D(e.TEXTURE_2D,y,u,t.width,t.height)}for(let t=0,n=h.length;t<n;t++)f=h[t],g?v&&d.texSubImage2D(e.TEXTURE_2D,t,0,0,c,l,f):d.texImage2D(e.TEXTURE_2D,t,u,c,l,f);n.generateMipmaps=!1}else if(g){if(_){let n=Ie(t);d.texStorage2D(e.TEXTURE_2D,y,u,n.width,n.height)}v&&d.texSubImage2D(e.TEXTURE_2D,0,0,0,c,l,t)}else d.texImage2D(e.TEXTURE_2D,0,u,c,l,t);E(n)&&D(i),s.__version=o.version,n.onUpdate&&n.onUpdate(n)}t.__version=n.version}function Se(t,n,r){if(n.image.length!==6)return;let i=ve(t,n),a=n.source;d.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+r);let o=f.get(a);if(a.version!==o.__version||i===!0){d.activeTexture(e.TEXTURE0+r);let t=Ut.getPrimaries(Ut.workingColorSpace),s=n.colorSpace===``?null:Ut.getPrimaries(n.colorSpace),c=n.colorSpace===``||t===s?e.NONE:e.BROWSER_DEFAULT_WEBGL;d.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,n.flipY),d.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,n.premultiplyAlpha),d.pixelStorei(e.UNPACK_ALIGNMENT,n.unpackAlignment),d.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,c);let l=n.isCompressedTexture||n.image[0].isCompressedTexture,u=n.image[0]&&n.image[0].isDataTexture,f=[];for(let e=0;e<6;e++)!l&&!u?f[e]=T(n.image[e],!0,p.maxCubemapSize):f[e]=u?n.image[e].image:n.image[e],f[e]=Fe(n,f[e]);let h=f[0],g=m.convert(n.format,n.colorSpace),_=m.convert(n.type),v=k(n.internalFormat,g,_,n.normalized,n.colorSpace),y=n.isVideoTexture!==!0,b=o.__version===void 0||i===!0,x=a.dataReady,S=te(n,h);_e(e.TEXTURE_CUBE_MAP,n);let C;if(l){y&&b&&d.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,h.width,h.height);for(let t=0;t<6;t++){C=f[t].mipmaps;for(let r=0;r<C.length;r++){let i=C[r];n.format===1023?y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,_,i.data):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,g,_,i.data):g===null?I(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):y?x&&d.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,i.data):d.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,i.data)}}}else{if(C=n.mipmaps,y&&b){C.length>0&&S++;let t=Ie(f[0]);d.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,t.width,t.height)}for(let t=0;t<6;t++)if(u){y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,f[t].width,f[t].height,g,_,f[t].data):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,f[t].width,f[t].height,0,g,_,f[t].data);for(let n=0;n<C.length;n++){let r=C[n].image[t].image;y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,0,0,r.width,r.height,g,_,r.data):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,v,r.width,r.height,0,g,_,r.data)}}else{y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,g,_,f[t]):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,g,_,f[t]);for(let n=0;n<C.length;n++){let r=C[n];y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,0,0,g,_,r.image[t]):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,v,g,_,r.image[t])}}}E(n)&&D(e.TEXTURE_CUBE_MAP),o.__version=a.version,n.onUpdate&&n.onUpdate(n)}t.__version=n.version}function Ce(t,n,r,i,a,o){let s=m.convert(r.format,r.colorSpace),c=m.convert(r.type),l=k(r.internalFormat,s,c,r.normalized,r.colorSpace),u=f.get(n),p=f.get(r);if(p.__renderTarget=n,!u.__hasExternalTextures){let t=Math.max(1,n.width>>o),r=Math.max(1,n.height>>o);a===e.TEXTURE_3D||a===e.TEXTURE_2D_ARRAY?d.texImage3D(a,o,l,t,r,n.depth,0,s,c,null):d.texImage2D(a,o,l,t,r,0,s,c,null)}d.bindFramebuffer(e.FRAMEBUFFER,t),Pe(n)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,i,a,p.__webglTexture,0,Ne(n)):(a===e.TEXTURE_2D||a>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&a<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,i,a,p.__webglTexture,o),d.bindFramebuffer(e.FRAMEBUFFER,null)}function we(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=A(n.stencilBuffer,a),s=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Pe(n)?g.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ne(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ne(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,s,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let a=t[i],o=m.convert(a.format,a.colorSpace),s=m.convert(a.type),c=k(a.internalFormat,o,s,a.normalized,a.colorSpace);Pe(n)?g.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ne(n),c,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ne(n),c,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,c,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Te(t,n,r){let i=n.isWebGLCubeRenderTarget===!0;if(d.bindFramebuffer(e.FRAMEBUFFER,t),!(n.depthTexture&&n.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let a=f.get(n.depthTexture);if(a.__renderTarget=n,a.__webglTexture&&n.depthTexture.image.width===n.width&&n.depthTexture.image.height===n.height||(n.depthTexture.image.width=n.width,n.depthTexture.image.height=n.height,n.depthTexture.needsUpdate=!0),i){if(a.__webglInit===void 0&&(a.__webglInit=!0,n.depthTexture.addEventListener(`dispose`,ne)),a.__webglTexture===void 0){a.__webglTexture=e.createTexture(),d.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture),_e(e.TEXTURE_CUBE_MAP,n.depthTexture);let t=m.convert(n.depthTexture.format),r=m.convert(n.depthTexture.type),i;n.depthTexture.format===1026?i=e.DEPTH_COMPONENT24:n.depthTexture.format===1027&&(i=e.DEPTH24_STENCIL8);for(let a=0;a<6;a++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+a,0,i,n.width,n.height,0,t,r,null)}}else N(n.depthTexture,0);let o=a.__webglTexture,s=Ne(n),c=i?e.TEXTURE_CUBE_MAP_POSITIVE_X+r:e.TEXTURE_2D,l=n.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(n.depthTexture.format===1026)Pe(n)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,l,c,o,0,s):e.framebufferTexture2D(e.FRAMEBUFFER,l,c,o,0);else if(n.depthTexture.format===1027)Pe(n)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,l,c,o,0,s):e.framebufferTexture2D(e.FRAMEBUFFER,l,c,o,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function Ee(t){let n=f.get(t),r=t.isWebGLCubeRenderTarget===!0;if(n.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(n.__depthDisposeCallback&&n.__depthDisposeCallback(),e){let t=()=>{delete n.__boundDepthTexture,delete n.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),n.__depthDisposeCallback=t}n.__boundDepthTexture=e}if(t.depthTexture&&!n.__autoAllocateDepthBuffer){if(r)for(let e=0;e<6;e++)Te(n.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?Te(n.__webglFramebuffer[0],t,0):Te(n.__webglFramebuffer,t,0)}}else if(r){n.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(d.bindFramebuffer(e.FRAMEBUFFER,n.__webglFramebuffer[r]),n.__webglDepthbuffer[r]===void 0)n.__webglDepthbuffer[r]=e.createRenderbuffer(),we(n.__webglDepthbuffer[r],t,!1);else{let i=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=n.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,i,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?d.bindFramebuffer(e.FRAMEBUFFER,n.__webglFramebuffer[0]):d.bindFramebuffer(e.FRAMEBUFFER,n.__webglFramebuffer),n.__webglDepthbuffer===void 0)n.__webglDepthbuffer=e.createRenderbuffer(),we(n.__webglDepthbuffer,t,!1);else{let r=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,i=n.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,i),e.framebufferRenderbuffer(e.FRAMEBUFFER,r,e.RENDERBUFFER,i)}}d.bindFramebuffer(e.FRAMEBUFFER,null)}function De(t,n,r){let i=f.get(t);n!==void 0&&Ce(i.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),r!==void 0&&Ee(t)}function Oe(t){let n=t.texture,r=f.get(t),i=f.get(n);t.addEventListener(`dispose`,j);let a=t.textures,o=t.isWebGLCubeRenderTarget===!0,s=a.length>1;if(s||(i.__webglTexture===void 0&&(i.__webglTexture=e.createTexture()),i.__version=n.version,h.memory.textures++),o){r.__webglFramebuffer=[];for(let t=0;t<6;t++)if(n.mipmaps&&n.mipmaps.length>0){r.__webglFramebuffer[t]=[];for(let i=0;i<n.mipmaps.length;i++)r.__webglFramebuffer[t][i]=e.createFramebuffer()}else r.__webglFramebuffer[t]=e.createFramebuffer()}else{if(n.mipmaps&&n.mipmaps.length>0){r.__webglFramebuffer=[];for(let t=0;t<n.mipmaps.length;t++)r.__webglFramebuffer[t]=e.createFramebuffer()}else r.__webglFramebuffer=e.createFramebuffer();if(s)for(let t=0,n=a.length;t<n;t++){let n=f.get(a[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),h.memory.textures++)}if(t.samples>0&&Pe(t)===!1){r.__webglMultisampledFramebuffer=e.createFramebuffer(),r.__webglColorRenderbuffer=[],d.bindFramebuffer(e.FRAMEBUFFER,r.__webglMultisampledFramebuffer);for(let n=0;n<a.length;n++){let i=a[n];r.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,r.__webglColorRenderbuffer[n]);let o=m.convert(i.format,i.colorSpace),s=m.convert(i.type),c=k(i.internalFormat,o,s,i.normalized,i.colorSpace,t.isXRRenderTarget===!0),l=Ne(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,l,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,r.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(r.__webglDepthRenderbuffer=e.createRenderbuffer(),we(r.__webglDepthRenderbuffer,t,!0)),d.bindFramebuffer(e.FRAMEBUFFER,null)}}if(o){d.bindTexture(e.TEXTURE_CUBE_MAP,i.__webglTexture),_e(e.TEXTURE_CUBE_MAP,n);for(let i=0;i<6;i++)if(n.mipmaps&&n.mipmaps.length>0)for(let a=0;a<n.mipmaps.length;a++)Ce(r.__webglFramebuffer[i][a],t,n,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+i,a);else Ce(r.__webglFramebuffer[i],t,n,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+i,0);E(n)&&D(e.TEXTURE_CUBE_MAP),d.unbindTexture()}else if(s){for(let n=0,i=a.length;n<i;n++){let i=a[n],o=f.get(i),s=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(s=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),d.bindTexture(s,o.__webglTexture),_e(s,i),Ce(r.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0+n,s,0),E(i)&&D(s)}d.unbindTexture()}else{let a=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(a=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),d.bindTexture(a,i.__webglTexture),_e(a,n),n.mipmaps&&n.mipmaps.length>0)for(let i=0;i<n.mipmaps.length;i++)Ce(r.__webglFramebuffer[i],t,n,e.COLOR_ATTACHMENT0,a,i);else Ce(r.__webglFramebuffer,t,n,e.COLOR_ATTACHMENT0,a,0);E(n)&&D(a),d.unbindTexture()}t.depthBuffer&&Ee(t)}function ke(e){let t=e.textures;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(E(r)){let t=O(e),n=f.get(r).__webglTexture;d.bindTexture(t,n),D(t),d.unbindTexture()}}}let Ae=[],je=[];function Me(t){if(t.samples>0){if(Pe(t)===!1){let n=t.textures,r=t.width,i=t.height,a=e.COLOR_BUFFER_BIT,o=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,s=f.get(t),c=n.length>1;if(c)for(let t=0;t<n.length;t++)d.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),d.bindFramebuffer(e.FRAMEBUFFER,s.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);d.bindFramebuffer(e.READ_FRAMEBUFFER,s.__webglMultisampledFramebuffer);let l=t.texture.mipmaps;l&&l.length>0?d.bindFramebuffer(e.DRAW_FRAMEBUFFER,s.__webglFramebuffer[0]):d.bindFramebuffer(e.DRAW_FRAMEBUFFER,s.__webglFramebuffer);for(let l=0;l<n.length;l++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(a|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(a|=e.STENCIL_BUFFER_BIT)),c){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,s.__webglColorRenderbuffer[l]);let t=f.get(n[l]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,r,i,0,0,r,i,a,e.NEAREST),_===!0&&(Ae.length=0,je.length=0,Ae.push(e.COLOR_ATTACHMENT0+l),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&(Ae.push(o),je.push(o),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,je)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Ae))}if(d.bindFramebuffer(e.READ_FRAMEBUFFER,null),d.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),c)for(let t=0;t<n.length;t++){d.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,s.__webglColorRenderbuffer[t]);let r=f.get(n[t]).__webglTexture;d.bindFramebuffer(e.FRAMEBUFFER,s.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,r,0)}d.bindFramebuffer(e.DRAW_FRAMEBUFFER,s.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&_){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Ne(e){return Math.min(p.maxSamples,e.samples)}function Pe(e){let n=f.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function P(e){let t=h.render.frame;y.get(e)!==t&&(y.set(e,t),e.update())}function Fe(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Ut.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&I(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):rt(`WebGLTextures: Unsupported texture color space:`,n)),t}function Ie(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(v.width=e.naturalWidth||e.width,v.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(v.width=e.displayWidth,v.height=e.displayHeight):(v.width=e.width,v.height=e.height),v}this.allocateTextureUnit=le,this.resetTextureUnits=oe,this.getTextureUnits=se,this.setTextureUnits=ce,this.setTexture2D=N,this.setTexture2DArray=de,this.setTexture3D=fe,this.setTextureCube=pe,this.rebindTextures=De,this.setupRenderTarget=Oe,this.updateRenderTargetMipmap=ke,this.updateMultisampleRenderTarget=Me,this.setupDepthRenderbuffer=Ee,this.setupFrameBufferTexture=Ce,this.useMultisampledRTT=Pe,this.isReversedDepthBuffer=function(){return d.buffers.depth.getReversed()}}function Gu(e,t){function n(n,r=``){let i,a=Ut.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Ku=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,qu=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Ju=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Qi(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Po({vertexShader:Ku,fragmentShader:qu,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new V(new So(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Yu=class extends st{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,f=null,p=null,m=null,h=typeof XRWebGLBinding<`u`,_=new Ju,v={},y=t.getContextAttributes(),b=null,S=null,C=[],w=[],T=new L,O=null,k=null,A=new _s;A.viewport=new en;let te=new _s;te.viewport=new en;let ne=[A,te],j=new Ts,re=null,M=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=C[e];return t===void 0&&(t=new Fn,C[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=C[e];return t===void 0&&(t=new Fn,C[e]=t),t.getGripSpace()},this.getHand=function(e){let t=C[e];return t===void 0&&(t=new Fn,C[e]=t),t.getHandSpace()};function ie(e){let t=w.indexOf(e.inputSource);if(t===-1)return;let n=C[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function ae(){r.removeEventListener(`select`,ie),r.removeEventListener(`selectstart`,ie),r.removeEventListener(`selectend`,ie),r.removeEventListener(`squeeze`,ie),r.removeEventListener(`squeezestart`,ie),r.removeEventListener(`squeezeend`,ie),r.removeEventListener(`end`,ae),r.removeEventListener(`inputsourceschange`,oe);for(let e=0;e<C.length;e++){let t=w[e];t!==null&&(w[e]=null,C[e].disconnect(t))}re=null,M=null,_.reset();for(let e in v)delete v[e];if(e.setRenderTarget(b),p=null,f=null,u=null,r=null,S=null,pe.stop(),n.isPresenting=!1,e.setPixelRatio(O),e.setSize(T.width,T.height,!1),k!==null){let e=k.camera;e.fov=k.fov,e.zoom=k.zoom,e.updateProjectionMatrix(),k=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&I(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&I(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return f===null?p:f},this.getBinding=function(){return u===null&&h&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(b=e.getRenderTarget(),r.addEventListener(`select`,ie),r.addEventListener(`selectstart`,ie),r.addEventListener(`selectend`,ie),r.addEventListener(`squeeze`,ie),r.addEventListener(`squeezestart`,ie),r.addEventListener(`squeezeend`,ie),r.addEventListener(`end`,ae),r.addEventListener(`inputsourceschange`,oe),y.xrCompatible!==!0&&await t.makeXRCompatible(),O=e.getPixelRatio(),e.getSize(T),h&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;y.depth&&(o=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=y.stencil?ee:D,a=y.stencil?x:g);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),f=u.createProjectionLayer(s),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),S=new nn(f.textureWidth,f.textureHeight,{format:E,type:d,depthTexture:new Xi(f.textureWidth,f.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let n={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:i};p=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new nn(p.framebufferWidth,p.framebufferHeight,{format:E,type:d,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),pe.setContext(r),pe.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function oe(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=w.indexOf(n);r>=0&&(w[r]=null,C[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=w.indexOf(n);if(r===-1){for(let e=0;e<C.length;e++)if(e>=w.length){w.push(n),r=e;break}else if(w[e]===null){w[e]=n,r=e;break}if(r===-1)break}let i=C[r];i&&i.connect(n)}}let se=new R,ce=new R;function le(e,t,n){se.setFromMatrixPosition(t.matrixWorld),ce.setFromMatrixPosition(n.matrixWorld);let r=se.distanceTo(ce),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function ue(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;_.texture!==null&&(_.depthNear>0&&(t=_.depthNear),_.depthFar>0&&(n=_.depthFar)),j.near=te.near=A.near=t,j.far=te.far=A.far=n,(re!==j.near||M!==j.far)&&(r.updateRenderState({depthNear:j.near,depthFar:j.far}),re=j.near,M=j.far),j.layers.mask=e.layers.mask|6,A.layers.mask=j.layers.mask&-5,te.layers.mask=j.layers.mask&-3;let i=e.parent,a=j.cameras;ue(j,i);for(let e=0;e<a.length;e++)ue(a[e],i);a.length===2?le(j,A,te):j.projectionMatrix.copy(A.projectionMatrix),k===null&&e.isPerspectiveCamera&&(k={camera:e,fov:e.fov,zoom:e.zoom}),N(e,j,i)};function N(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=dt*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return j},this.getFoveation=function(){if(f!==null||p!==null)return s},this.setFoveation=function(e){s=e,f!==null&&(f.fixedFoveation=e),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=e)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(j)},this.getCameraTexture=function(e){return v[e]};let de=null;function fe(t,i){if(l=i.getViewerPose(c||a),m=i,l!==null){let t=l.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let i=!1;t.length!==j.cameras.length&&(j.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(p!==null)a=p.getViewport(r);else{let t=u.getViewSubImage(f,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(S,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(S))}let o=ne[n];o===void 0&&(o=new _s,o.layers.enable(n),o.viewport=new en,ne[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(j.matrix.copy(o.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale)),i===!0&&j.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&h){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&_.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&h){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=v[n];e||(e=new Qi,v[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<C.length;e++){let t=w[e],n=C[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}de&&de(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),m=null}let pe=new Bs;pe.setAnimationLoop(fe),this.setAnimationLoop=function(e){de=e},this.dispose=function(){}}},Xu=new on,Zu=new Rt;Zu.set(-1,0,0,0,1,0,0,0,1);function Qu(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Ao(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Xu.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Zu),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function $u(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return rt(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?I(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):I(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var ed=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),td=null;function nd(){return td===null&&(td=new Di(ed,16,16,A,v),td.name=`DFG_LUT`,td.minFilter=c,td.magFilter=c,td.wrapS=r,td.wrapT=r,td.generateMipmaps=!1,td.needsUpdate=!0),td}var rd=class{constructor(e={}){let{canvas:t=$e(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:p=!1,outputBufferType:h=d}=e;this.isWebGLRenderer=!0;let _;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);_=n.getContextAttributes().alpha}else _=a;let S=h,C=new Set([ne,te,k]),w=new Set([d,g,m,x,y,b]),T=new Uint32Array(4),E=new Int32Array(4),D=new R,ee=null,O=null,A=[],j=[],re=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let M=this,ie=!1,ae=null,oe=null,se=null,ce=null;this._outputColorSpace=He;let le=0,ue=0,N=null,de=-1,fe=null,pe=new en,me=new en,he=null,ge=new B(0),_e=0,ve=t.width,ye=t.height,be=1,xe=null,Se=null,Ce=new en(0,0,ve,ye),we=new en(0,0,ve,ye),Te=!1,Ee=new Bi,De=!1,Oe=!1,ke=new on,Ae=new R,je=new en,Me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ne=!1;function Pe(){return N===null?be:1}let P=n;function Fe(e,n){return t.getContext(e,n)}let Ie,Le,F,Re,ze,Be,Ve,Ue,We,Ge,Ke,qe,Je,Xe,Ze,Qe,et,nt,it,ot,st,ct,lt;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:f};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,ft,!1),t.addEventListener(`webglcontextrestored`,pt,!1),t.addEventListener(`webglcontextcreationerror`,mt,!1),P===null){let t=`webgl2`;if(P=Fe(t,e),P===null)throw Fe(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}ut()}catch(e){throw t.removeEventListener(`webglcontextlost`,ft,!1),t.removeEventListener(`webglcontextrestored`,pt,!1),t.removeEventListener(`webglcontextcreationerror`,mt,!1),rt(`WebGLRenderer: `+e.message),e}function ut(){Ie=new xc(P),Ie.init(),st=new Gu(P,Ie),Le=new Xs(P,Ie,e,st),F=new Uu(P,Ie),Le.reversedDepthBuffer&&p&&F.buffers.depth.setReversed(!0),oe=P.createFramebuffer(),se=P.createFramebuffer(),ce=P.createFramebuffer(),Re=new wc(P),ze=new Cu,Be=new Wu(P,Ie,F,ze,Le,st,Re),Ve=new bc(M),Ue=new Vs(P),ct=new Js(P,Ue),We=new Sc(P,Ue,Re,ct),Ge=new Ec(P,We,Ue,ct,Re),nt=new Tc(P,Le,Be),Ze=new Zs(ze),Ke=new Su(M,Ve,Ie,Le,ct,Ze),qe=new Qu(M,ze),Je=new Du,Xe=new Pu(Ie),et=new qs(M,Ve,F,Ge,_,s),Qe=new Hu(M,Ge,Le),lt=new $u(P,Re,Le,F),it=new Ys(P,Ie,Re),ot=new Cc(P,Ie,Re),Re.programs=Ke.programs,M.capabilities=Le,M.extensions=Ie,M.properties=ze,M.renderLists=Je,M.shadowMap=Qe,M.state=F,M.info=Re}S!==1009&&(re=new Oc(S,t.width,t.height,o,r,i));let dt=new Yu(M,P);this.xr=dt,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let e=Ie.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Ie.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return be},this.setPixelRatio=function(e){e!==void 0&&(be=e,this.setSize(ve,ye,!1))},this.getSize=function(e){return e.set(ve,ye)},this.setSize=function(e,n,r=!0){dt.isPresenting?I(`WebGLRenderer: Can't change size while VR device is presenting.`):(ve=e,ye=n,t.width=Math.floor(e*be),t.height=Math.floor(n*be),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),re!==null&&re.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(ve*be,ye*be).floor()},this.setDrawingBufferSize=function(e,n,r){ve=e,ye=n,be=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(S===1009)rt(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){I(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}re.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(pe)},this.getViewport=function(e){return e.copy(Ce)},this.setViewport=function(e,t,n,r){e.isVector4?Ce.set(e.x,e.y,e.z,e.w):Ce.set(e,t,n,r),F.viewport(pe.copy(Ce).multiplyScalar(be).round())},this.getScissor=function(e){return e.copy(we)},this.setScissor=function(e,t,n,r){e.isVector4?we.set(e.x,e.y,e.z,e.w):we.set(e,t,n,r),F.scissor(me.copy(we).multiplyScalar(be).round())},this.getScissorTest=function(){return Te},this.setScissorTest=function(e){F.setScissorTest(Te=e)},this.setOpaqueSort=function(e){xe=e},this.setTransparentSort=function(e){Se=e},this.getClearColor=function(e){return e.copy(et.getClearColor())},this.setClearColor=function(){et.setClearColor(...arguments)},this.getClearAlpha=function(){return et.getClearAlpha()},this.setClearAlpha=function(){et.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(N!==null){let t=N.texture.format;e=C.has(t)}if(e){let e=N.texture.type,t=w.has(e),n=et.getClearColor(),r=et.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(T[0]=i,T[1]=a,T[2]=o,T[3]=r,P.clearBufferuiv(P.COLOR,0,T)):(E[0]=i,E[1]=a,E[2]=o,E[3]=r,P.clearBufferiv(P.COLOR,0,E))}else r|=P.COLOR_BUFFER_BIT}t&&(r|=P.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&P.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),ae=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,ft,!1),t.removeEventListener(`webglcontextrestored`,pt,!1),t.removeEventListener(`webglcontextcreationerror`,mt,!1),et.dispose(),Je.dispose(),Xe.dispose(),ze.dispose(),Ve.dispose(),Ge.dispose(),ct.dispose(),lt.dispose(),Ke.dispose(),dt.dispose(),dt.removeEventListener(`sessionstart`,xt),dt.removeEventListener(`sessionend`,St),Ct.stop()};function ft(e){e.preventDefault(),tt(`WebGLRenderer: Context Lost.`),ie=!0}function pt(){tt(`WebGLRenderer: Context Restored.`),ie=!1;let e=Re.autoReset,t=Qe.enabled,n=Qe.autoUpdate,r=Qe.needsUpdate,i=Qe.type;ut(),Re.autoReset=e,Qe.enabled=t,Qe.autoUpdate=n,Qe.needsUpdate=r,Qe.type=i}function mt(e){rt(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function ht(e){let t=e.target;t.removeEventListener(`dispose`,ht),gt(t)}function gt(e){_t(e),ze.remove(e)}function _t(e){let t=ze.get(e).programs;t!==void 0&&(t.forEach(function(e){Ke.releaseProgram(e)}),e.isShaderMaterial&&Ke.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=Me);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=Nt(e,t,n,r,i);F.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=We.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;ct.setup(i,r,s,n,c);let h,g=it;if(c!==null&&(h=Ue.get(c),g=ot,g.setIndex(h)),i.isMesh)r.wireframe===!0?(F.setLineWidth(r.wireframeLinewidth*Pe()),g.setMode(P.LINES)):g.setMode(P.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),F.setLineWidth(e*Pe()),i.isLineSegments?g.setMode(P.LINES):i.isLineLoop?g.setMode(P.LINE_LOOP):g.setMode(P.LINE_STRIP)}else i.isPoints?g.setMode(P.POINTS):i.isSprite&&g.setMode(P.TRIANGLES);if(i.isBatchedMesh){if(Ie.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Ue.get(c).bytesPerElement:1,o=ze.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(P,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function vt(e,t,n,r){ae!==null&&e.isNodeMaterial&&ae.setObject(r,e),De===!0&&Ze.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,kt(e,t,r),e.side=0,e.needsUpdate=!0,kt(e,t,r),e.side=2):kt(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),ae!==null&&ae.renderStart(e,t,n),O=Xe.get(n),O.init(t),j.push(O),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(O.pushLight(e),e.castShadow&&O.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(O.pushLight(e),e.castShadow&&O.pushShadow(e))}),O.setupLights(),ae!==null&&ae.updateLights(O.state.lightsArray),Oe=this.localClippingEnabled,De=Ze.init(this.clippingPlanes,Oe),De===!0&&Ze.setGlobalState(this.clippingPlanes,t),ae!==null&&Qe.render(O.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];vt(o,n,t,e),r.add(o)}else vt(i,n,t,e),r.add(i)}}),O=j.pop(),ae!==null&&ae.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=ze.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}Ie.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let yt=null;function bt(e){yt&&yt(e)}function xt(){Ct.stop()}function St(){Ct.start()}let Ct=new Bs;Ct.setAnimationLoop(bt),typeof self<`u`&&Ct.setContext(self),this.setAnimationLoop=function(e){yt=e,dt.setAnimationLoop(e),e===null?Ct.stop():Ct.start()},dt.addEventListener(`sessionstart`,xt),dt.addEventListener(`sessionend`,St),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){rt(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(ie===!0)return;ae!==null&&ae.renderStart(e,t);let n=dt.enabled===!0&&dt.isPresenting===!0,r=re!==null&&(N===null||n)&&re.begin(M,N);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),dt.enabled===!0&&dt.isPresenting===!0&&(re===null||re.isCompositing()===!1)&&(dt.cameraAutoUpdate===!0&&dt.updateCamera(t),t=dt.getCamera()),e.isScene===!0&&e.onBeforeRender(M,e,t,N),O=Xe.get(e,j.length),O.init(t),O.state.textureUnits=Be.getTextureUnits(),j.push(O),ke.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),Ee.setFromProjectionMatrix(ke,Ye,t.reversedDepth),Oe=this.localClippingEnabled,De=Ze.init(this.clippingPlanes,Oe),ee=Je.get(e,A.length),ee.init(),A.push(ee),dt.enabled===!0&&dt.isPresenting===!0){let e=M.xr.getDepthSensingMesh();e!==null&&wt(e,t,-1/0,M.sortObjects)}wt(e,t,0,M.sortObjects),ee.finish(),ae!==null&&ae.updateLights(O.state.lightsArray),M.sortObjects===!0&&ee.sort(xe,Se),Ne=dt.enabled===!1||dt.isPresenting===!1||dt.hasDepthSensing()===!1,Ne&&et.addToRenderList(ee,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),De===!0&&Ze.beginShadows();let i=O.state.shadowsArray;if(Qe.render(i,e,t),De===!0&&Ze.endShadows(),(r&&re.hasRenderPass())===!1){let n=ee.opaque,r=ee.transmissive;if(O.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];Et(n,r,e,a)}Ne&&et.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];Tt(ee,e,n,n.viewport)}}else r.length>0&&Et(n,r,e,t),Ne&&et.render(e),Tt(ee,e,t)}N!==null&&ue===0&&(Be.updateMultisampleRenderTarget(N),Be.updateRenderTargetMipmap(N)),r&&re.end(M),e.isScene===!0&&e.onAfterRender(M,e,t),ct.resetDefaultState(),de=-1,fe=null,j.pop(),j.length>0?(O=j[j.length-1],Be.setTextureUnits(O.state.textureUnits),De===!0&&Ze.setGlobalState(M.clippingPlanes,O.state.camera)):O=null,A.pop(),ee=A.length>0?A[A.length-1]:null,ae!==null&&ae.renderEnd()};function wt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)O.pushLightProbeGrid(e);else if(e.isLight)O.pushLight(e),e.castShadow&&O.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(Ee)){r&&je.setFromMatrixPosition(e.matrixWorld).applyMatrix4(ke);let i=Ge.update(e),a=e.material;a.visible&&ee.push(e,i,a,n,je.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(Ee))){let i=Ge.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),je.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),je.copy(e.boundingSphere.center)),je.applyMatrix4(e.matrixWorld).applyMatrix4(ke)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&ee.push(e,i,c,n,je.z,s,t)}}else a.visible&&ee.push(e,i,a,n,je.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)wt(i[e],t,n,r)}function Tt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;O.setupLightsView(n),De===!0&&Ze.setGlobalState(M.clippingPlanes,n),r&&F.viewport(pe.copy(r)),i.length>0&&Dt(i,t,n),a.length>0&&Dt(a,t,n),o.length>0&&Dt(o,t,n),F.buffers.depth.setTest(!0),F.buffers.depth.setMask(!0),F.buffers.color.setMask(!0),F.setPolygonOffset(!1)}function Et(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(O.state.transmissionRenderTarget[r.id]===void 0){let e=Ie.has(`EXT_color_buffer_half_float`)||Ie.has(`EXT_color_buffer_float`);O.state.transmissionRenderTarget[r.id]=new nn(1,1,{generateMipmaps:!0,type:e?v:d,minFilter:u,samples:Math.max(4,Le.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ut.workingColorSpace})}let a=O.state.transmissionRenderTarget[r.id],o=r.viewport||pe;a.setSize(o.z*M.transmissionResolutionScale,o.w*M.transmissionResolutionScale);let s=M.getRenderTarget(),c=M.getActiveCubeFace(),l=M.getActiveMipmapLevel();M.setRenderTarget(a),M.getClearColor(ge),_e=M.getClearAlpha(),_e<1&&M.setClearColor(16777215,.5),M.clear(),Ne&&et.render(n);let f=M.toneMapping;M.toneMapping=0;let p=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),O.setupLightsView(r),De===!0&&Ze.setGlobalState(M.clippingPlanes,r),Dt(e,n,r),Be.updateMultisampleRenderTarget(a),Be.updateRenderTargetMipmap(a),Ie.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,Ot(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(Be.updateMultisampleRenderTarget(a),Be.updateRenderTargetMipmap(a))}M.setRenderTarget(s,c,l),M.setClearColor(ge,_e),p!==void 0&&(r.viewport=p),M.toneMapping=f}function Dt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&Ot(o,t,n,s,l,c)}}function Ot(e,t,n,r,i,a){ae!==null&&i.isNodeMaterial&&ae.setObject(e,i),e.onBeforeRender(M,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(M,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,M.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,M.renderBufferDirect(n,t,r,i,e,a),i.side=2):M.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(M,t,n,r,i,a)}function kt(e,t,n){t.isScene!==!0&&(t=Me);let r=ze.get(e),i=O.state.lights,a=O.state.shadowsArray,o=i.state.version,s=Ke.getParameters(e,i.state,a,t,n,O.state.lightProbeGridArray),c=Ke.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Ve.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,ht),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return jt(e,s),d}else s.uniforms=Ke.getUniforms(e),ae!==null&&e.isNodeMaterial&&ae.build(e,n,s),e.onBeforeCompile(s,M),d=Ke.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Ze.uniform),jt(e,s),r.needsLights=L(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=O.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function At(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=Fl.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function jt(e,t){let n=ze.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function Mt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];D.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(D))return n}return null}function Nt(e,t,n,r,i){t.isScene!==!0&&(t=Me),Be.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=N===null?M.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:Ut.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Ve.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(h=M.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=ze.get(r),y=O.state.lights;if(De===!0&&(Oe===!0||e!==fe)){let t=e===fe&&r.id===de;Ze.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Ze.numPlanes||v.numIntersection!==Ze.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=O.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let x=v.currentProgram;b===!0&&(x=kt(r,t,i),ae&&r.isNodeMaterial&&ae.onUpdateProgram(r,x,v));let S=!1,C=!1,w=!1,T=x.getUniforms(),E=v.uniforms;if(F.useProgram(x.program)&&(S=!0,C=!0,w=!0),r.id!==de&&(de=r.id,C=!0),v.needsLights){let e=Mt(O.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,C=!0)}if(S||fe!==e){F.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),T.setValue(P,`projectionMatrix`,e.projectionMatrix),T.setValue(P,`viewMatrix`,e.matrixWorldInverse);let t=T.map.cameraPosition;t!==void 0&&t.setValue(P,Ae.setFromMatrixPosition(e.matrixWorld)),Le.logarithmicDepthBuffer&&T.setValue(P,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&T.setValue(P,`isOrthographic`,e.isOrthographicCamera===!0),fe!==e&&(fe=e,C=!0,w=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&T.setValue(P,`sunShadowMap`,y.state.sunShadowMap,Be),y.state.directionalShadowMap.length>0&&T.setValue(P,`directionalShadowMap`,y.state.directionalShadowMap,Be),y.state.spotShadowMap.length>0&&T.setValue(P,`spotShadowMap`,y.state.spotShadowMap,Be),y.state.pointShadowMap.length>0&&T.setValue(P,`pointShadowMap`,y.state.pointShadowMap,Be)),i.isSkinnedMesh){T.setOptional(P,i,`bindMatrix`),T.setOptional(P,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),T.setValue(P,`boneTexture`,e.boneTexture,Be))}i.isBatchedMesh&&(T.setOptional(P,i,`batchingTexture`),T.setValue(P,`batchingTexture`,i._matricesTexture,Be),T.setOptional(P,i,`batchingIdTexture`),T.setValue(P,`batchingIdTexture`,i._indirectTexture,Be),T.setOptional(P,i,`batchingColorTexture`),i._colorsTexture!==null&&T.setValue(P,`batchingColorTexture`,i._colorsTexture,Be));let D=n.morphAttributes;if((D.position!==void 0||D.normal!==void 0||D.color!==void 0)&&nt.update(i,n,x),(C||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,T.setValue(P,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(E.envMapIntensity.value=t.environmentIntensity),E.dfgLUT!==void 0&&(E.dfgLUT.value=nd()),C){if(T.setValue(P,`toneMappingExposure`,M.toneMappingExposure),v.needsLights&&Pt(E,w),a&&r.fog===!0&&qe.refreshFogUniforms(E,a),qe.refreshMaterialUniforms(E,r,be,ye,O.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;E.probesSH.value=e.texture,E.probesMin.value.copy(e.boundingBox.min),E.probesMax.value.copy(e.boundingBox.max),E.probesResolution.value.copy(e.resolution)}Fl.upload(P,At(v),E,Be)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(Fl.upload(P,At(v),E,Be),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&T.setValue(P,`center`,i.center),T.setValue(P,`modelViewMatrix`,i.modelViewMatrix),T.setValue(P,`normalMatrix`,i.normalMatrix),T.setValue(P,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];lt.update(n,x),lt.bind(n,x)}}return x}function Pt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function L(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return le},this.getActiveMipmapLevel=function(){return ue},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(e,t,n){let r=ze.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),ze.get(e.texture).__webglTexture=t,ze.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=ze.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){N=e,le=t,ue=n;let r=null,i=!1,a=!1;if(e){let o=ze.get(e);if(o.__useDefaultFramebuffer!==void 0){F.bindFramebuffer(P.FRAMEBUFFER,o.__webglFramebuffer),pe.copy(e.viewport),me.copy(e.scissor),he=e.scissorTest,F.viewport(pe),F.scissor(me),F.setScissorTest(he),de=-1;return}if(o.__webglFramebuffer===void 0)Be.setupRenderTarget(e);else if(o.__hasExternalTextures)Be.rebindTextures(e,ze.get(e.texture).__webglTexture,ze.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&ze.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);Be.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=ze.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&Be.useMultisampledRTT(e)===!1?ze.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,pe.copy(e.viewport),me.copy(e.scissor),he=e.scissorTest}else pe.copy(Ce).multiplyScalar(be).floor(),me.copy(we).multiplyScalar(be).floor(),he=Te;if(n!==0&&(r=oe),F.bindFramebuffer(P.FRAMEBUFFER,r)&&F.drawBuffers(e,r),F.viewport(pe),F.scissor(me),F.setScissorTest(he),i){let r=ze.get(e.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=ze.get(e.textures[t]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=ze.get(e.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,t.__webglTexture,n)}de=-1};function Ft(e){let t=ze.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Le.textureFormatReadable(e.format),t.__typeReadable=Le.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){rt(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=ze.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){F.bindFramebuffer(P.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+s);let u=Ft(o);if(u.__formatReadable===!1){rt(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){rt(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&P.readPixels(t,n,r,i,st.convert(c),st.convert(l),a)}finally{let e=N===null?null:ze.get(N).__webglFramebuffer;F.bindFramebuffer(P.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=ze.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){F.bindFramebuffer(P.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+s);let d=Ft(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,f),P.bufferData(P.PIXEL_PACK_BUFFER,a.byteLength,P.STREAM_READ),P.readPixels(t,n,r,i,st.convert(l),st.convert(u),0),P.bindBuffer(P.PIXEL_PACK_BUFFER,null);let p=N===null?null:ze.get(N).__webglFramebuffer;F.bindFramebuffer(P.FRAMEBUFFER,p);let m=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await at(P,m,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,f),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,a),P.bindBuffer(P.PIXEL_PACK_BUFFER,null),P.deleteBuffer(f),P.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;Be.setTexture2D(e,0),P.copyTexSubImage2D(P.TEXTURE_2D,n,0,0,o,s,i,a),F.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=st.convert(t.format),_=st.convert(t.type),v;t.isData3DTexture?(Be.setTexture3D(t,0),v=P.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(Be.setTexture2DArray(t,0),v=P.TEXTURE_2D_ARRAY):(Be.setTexture2D(t,0),v=P.TEXTURE_2D),F.activeTexture(P.TEXTURE0),F.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,t.flipY),F.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),F.pixelStorei(P.UNPACK_ALIGNMENT,t.unpackAlignment);let y=F.getParameter(P.UNPACK_ROW_LENGTH),b=F.getParameter(P.UNPACK_IMAGE_HEIGHT),x=F.getParameter(P.UNPACK_SKIP_PIXELS),S=F.getParameter(P.UNPACK_SKIP_ROWS),C=F.getParameter(P.UNPACK_SKIP_IMAGES);F.pixelStorei(P.UNPACK_ROW_LENGTH,h.width),F.pixelStorei(P.UNPACK_IMAGE_HEIGHT,h.height),F.pixelStorei(P.UNPACK_SKIP_PIXELS,l),F.pixelStorei(P.UNPACK_SKIP_ROWS,u),F.pixelStorei(P.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=ze.get(e),r=ze.get(t),h=ze.get(n.__renderTarget),g=ze.get(r.__renderTarget);F.bindFramebuffer(P.READ_FRAMEBUFFER,h.__webglFramebuffer),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,ze.get(e).__webglTexture,i,d+n),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,ze.get(t).__webglTexture,a,m+n)),P.blitFramebuffer(l,u,o,s,f,p,o,s,P.DEPTH_BUFFER_BIT,P.NEAREST);F.bindFramebuffer(P.READ_FRAMEBUFFER,null),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||ze.has(e)){let n=ze.get(e),r=ze.get(t);F.bindFramebuffer(P.READ_FRAMEBUFFER,se),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,ce);for(let e=0;e<c;e++)w?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,n.__webglTexture,i),T?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,r.__webglTexture,a),i===0?T?P.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):P.copyTexSubImage2D(v,a,f,p,l,u,o,s):P.blitFramebuffer(l,u,o,s,f,p,o,s,P.COLOR_BUFFER_BIT,P.NEAREST);F.bindFramebuffer(P.READ_FRAMEBUFFER,null),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?P.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?P.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):P.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):P.texSubImage2D(P.TEXTURE_2D,a,f,p,o,s,g,_,h);F.pixelStorei(P.UNPACK_ROW_LENGTH,y),F.pixelStorei(P.UNPACK_IMAGE_HEIGHT,b),F.pixelStorei(P.UNPACK_SKIP_PIXELS,x),F.pixelStorei(P.UNPACK_SKIP_ROWS,S),F.pixelStorei(P.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&P.generateMipmap(v),F.unbindTexture()},this.initRenderTarget=function(e){ze.get(e).__webglFramebuffer===void 0&&Be.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?Be.setTextureCube(e,0):e.isData3DTexture?Be.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?Be.setTexture2DArray(e,0):Be.setTexture2D(e,0),F.unbindTexture()},this.resetState=function(){le=0,ue=0,N=null,F.reset(),ct.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Ye}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Ut._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ut._getUnpackColorSpace()}},K={laneW:2.4,laneCount:3,speed:{base:15,max:36,k:55,launchTime:1.1},hitSlow:.55,hitSlowRecover:1.8,jump:{v0:11.5,gravity:34,fastFall:26,buffer:.14},slide:{duration:.75},lane:{omega:21,zeta:1,kick:1.5,overLimit:.12},player:{halfW:.3,halfDepth:.3,height:1.75,slideHeight:.7},hitForgive:.12,bear:{chaseTime:5,grace:1,leaveTime:1.3,enterTime:.5,distance:4.4,riderDistance:3.6},score:{perUnit:1,perCoin:10},gen:{ahead:150,behind:14,laneTime:.23,recover:.5,gapEasy:2.3,gapHard:1.05,difficultyTime:150,minGapDist:11,firstRowS:52},coinSpacing:2.3,coinRadius:.4,power:{magnet:{duration:15,first:30,every:60},board:{duration:10,first:60,every:120},jetpack:{duration:10,first:120,every:180},shield:{duration:12,first:45,every:150},slowmo:{duration:6,first:95,every:210},shieldGrace:.8,slowScale:.55,slowEase:5,jitter:5,minSeparation:14,warnTime:2,pickupY:1.15,magnetRange:18,boardJumpV0:17,jetHeight:5.2,jetRise:5,jetLandGrace:.7,skyCoinY:.9}};K.biome={duration:300,preGate:2.6,postGate:2.4},K.gen.movingChance={easy:.22,hard:.38};var id=(e=1,t=.8)=>({cell:`JUMP`,lanes:1,depth:e,bottom:0,top:t}),ad=(e=1,t=.85)=>({cell:`JUMP`,lanes:3,depth:e,bottom:0,top:t}),od=(e=.9)=>({cell:`SLIDE`,lanes:1,depth:e,bottom:1.35,top:2.9}),sd=(e=1.6)=>({cell:`BLOCK`,lanes:1,depth:e,bottom:0,top:3}),cd=(e,t,n)=>({...sd(e),move:{k:t,run:n}}),ld={log:id(1,.8),ridge:id(1.7,.7),wideLog:ad(1,.85),branchL:od(),branchR:od(),rock:sd(1.9),snowman:sd(1.5),stump:sd(1.4),snowball:cd(2.2,.5,50),bench:id(1,.8),flowerBox:id(1,.75),chainPosts:ad(.6,.85),awningL:od(1.9),awningR:od(1.9),kiosk:sd(1.8),treePlanter:sd(1.6),terrace:sd(1.8),cyclist:cd(1.9,.45,50),bikeRack:id(.8,.8),hedge:id(1,.75),hedgeRow:ad(1,.8),pergolaL:od(1),pergolaR:od(1),cubePlanter:sd(1.7),iceCream:sd(1.7),gear:sd(1.2),cyclistB:cd(1.9,.45,50),wetFloor:id(.8,.8),mallBench:id(1,.8),ropeLine:ad(.6,.85),bannerL:od(.8),bannerR:od(.8),mallKiosk:sd(1.8),palmPot:sd(1.4),mannequins:sd(1.6),scrubber:cd(2,.3,40),floatLog:id(1,.7),buoys:id(.8,.75),boom:ad(.8,.75),willowL:od(1),willowR:od(1),islet:sd(2),duckHouse:sd(1.6),pier:sd(1.6),pedalBoat:{...cd(2.4,.35,45),top:2.6}},ud=K.laneW/2-.12;K.feel={hitStop:.07,hitStopCaught:.12,hintRuns:2},K.economy={maxCoins:9999999,maxCrowns:99999,crownRun:{first:150,every:300,jitter:60}},K.revive={costs:[2,4,8],maxAds:2,invulnerable:3,clearTime:3.5,restartSlow:.35},K.ads={mockSeconds:5,mockNeedsNetwork:!0},K.pass={tiers:40,xpPerTier:120,seasonDays:42,epoch:[2026,11,2],premiumCost:80},K.xp={perRun:10,per100m:2,perPortal:15,maxPerRun:120},K.missions={dailyCount:3,weeklyCount:3,runCount:3,reward:{daily:{xp:60,coins:100},dailyBonus:{xp:50,crowns:1},weekly:{xp:250,coins:300,crowns:4},run:{xp:40,coins:60}},runGoalGrowth:.25};function dd(e){let t=e>>>0;return function(){t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function fd(e,t=K.speed){let n=Math.max(0,e);return t.base+(t.max-t.base)*(1-Math.exp(-n/t.k))}function pd(e,t=K.speed){let n=Math.min(1,Math.max(0,e/t.launchTime));return n*n*(3-2*n)}function md(e,t,n=K.score){return Math.floor(e*n.perUnit+t*n.perCoin)}var hd=[{id:`partie`,name:`Poiana Brașov`,subtitle:`Pârtia de schi`,ride:`snowboard`,winter:!0,jump:[`log`,`ridge`],wide:`wideLog`,slide:[`branchL`,`branchR`],block:[`rock`,`snowman`,`stump`],moving:`snowball`},{id:`republicii`,name:`Strada Republicii`,subtitle:`Centrul vechi`,ride:`skate`,jump:[`bench`,`flowerBox`],wide:`chainPosts`,slide:[`awningL`,`awningR`],block:[`kiosk`,`treePlanter`,`terrace`],moving:`cyclist`},{id:`tractorul`,name:`Pietonala Tractorul`,subtitle:`Cartierul Coresi`,ride:`bike`,bear:`unicycle`,jump:[`bikeRack`,`hedge`],wide:`hedgeRow`,slide:[`pergolaL`,`pergolaR`],block:[`cubePlanter`,`iceCream`,`gear`],moving:`cyclistB`},{id:`afi`,name:`AFI Brașov`,subtitle:`Mall-ul`,ride:`skate`,indoor:!0,jump:[`wetFloor`,`mallBench`],wide:`ropeLine`,slide:[`bannerL`,`bannerR`],block:[`mallKiosk`,`palmPot`,`mannequins`],moving:`scrubber`},{id:`noua`,name:`Lacul Noua`,subtitle:`Hidrobicicleta`,ride:`boat`,bear:`hydro`,water:!0,jump:[`floatLog`,`buoys`],wide:`boom`,slide:[`willowL`,`willowR`],block:[`islet`,`duckHouse`,`pier`],moving:`pedalBoat`}];hd.length;var gd=e=>(e+1)%hd.length;function _d(e,t){let{k:n,run:r}=ld[e.type].move;return Math.min(e.rowS+r,e.rowS+n*(e.rowS-t))}var{EMPTY:vd,JUMP:yd,SLIDE:bd,BLOCK:xd}=Object.freeze({EMPTY:0,JUMP:1,SLIDE:2,BLOCK:3}),Sd={[vd]:`none`,[yd]:`jump`,[bd]:`slide`};function Cd(e,t,n,r=K.gen){let i=new Map;for(let a=0;a<3;a++){if(t[a]===xd)continue;let o=Sd[t[a]];for(let[t,s]of e){let e=Math.abs(t-a)*r.laneTime;if(o!==`none`&&s!==`none`&&s!==o&&(e+=r.recover),e<=n+1e-9){i.set(a,o);break}}}return i}function wd(){return new Map([[0,`none`],[1,`none`],[2,`none`]])}function Td(e,t){for(let n=t.length-1;n>0;n--){let r=Math.floor(e()*(n+1));[t[n],t[r]]=[t[r],t[n]]}return t}var Ed=e=>Math.floor(e()*3),Dd=e=>e()<.5?0:2,Od=[{name:`singleBlock`,weight:e=>3-1.6*e,make:e=>{let t=[vd,vd,vd];return t[Ed(e)]=xd,{cells:t}}},{name:`singleJump`,weight:()=>3,make:e=>{let t=[vd,vd,vd];return t[Ed(e)]=yd,{cells:t}}},{name:`wideJump`,weight:()=>2,make:()=>({cells:[yd,yd,yd],wide:`jump`})},{name:`branchBlock`,weight:()=>2.4,make:e=>{let t=[vd,xd,vd];return t[Dd(e)]=bd,{cells:t}}},{name:`branchJump`,weight:e=>.8+.6*e,make:e=>{let t=[vd,yd,vd];return t[Dd(e)]=bd,{cells:t}}},{name:`branchTunnel`,weight:e=>.3+1.2*e,make:()=>({cells:[bd,xd,bd]})},{name:`doubleBlock`,weight:e=>1+3*e,make:e=>{let t=[xd,xd,xd];return t[Ed(e)]=vd,{cells:t}}},{name:`blockJump`,weight:e=>.5+2*e,make:e=>({cells:Td(e,[xd,yd,vd])})},{name:`blockJumpJump`,weight:e=>.2+1.6*e,make:e=>({cells:Td(e,[xd,yd,yd])})}];function kd(e,t){let n=Od.map(e=>Math.max(.05,e.weight(t))),r=e()*n.reduce((e,t)=>e+t,0);for(let e=0;e<Od.length;e++)if(r-=n[e],r<=0)return Od[e];return Od[0]}var Ad=(e,t)=>t[Math.floor(e()*t.length)],jd=class{constructor(e=Math.random()*2**32>>>0,t=0){this.seed=e,this.rng=dd(e),this.last={s:K.gen.firstRowS-30,cells:[vd,vd,vd]},this.reach=wd(),this.rowCount=0,this.pendingPower=null,this.biome=t,this.pendingTransition=null,this.zone=null,this.reserved=[-1/0,-1/0,-1/0]}requestTransition(e){this.pendingTransition=e}requestPowerUp(e){this.pendingPower=e}ensure(e,t,n,r={}){let i={obstacles:[],coins:[],powerups:[],rows:[],transitions:[]};this.clear=r.clear||null;let a=e+K.gen.ahead,o=0;for(;this._nextRowS(e,t,n).s<a&&o++<50;){let{s:r,gapTime:a}=this._nextRowS(e,t,n);this._makeRow(r,a,n,i)}return i}_nextRowS(e,t,n){let r=K.gen;if(this.rowCount===0)return{s:r.firstRowS,gapTime:99};let i=Math.min(1,n/r.difficultyTime),a=dd(this.seed+this.rowCount*7919)(),o=r.gapEasy+(r.gapHard-r.gapEasy)*i+a*.55*(1-.5*i),s=this.last.s+r.minGapDist;for(let i=0;i<3;i++){let i=fd(n+Math.max(0,s-e)/Math.max(t,1))*1.03;s=this.last.s+Math.max(o*i,r.minGapDist)}return{s,gapTime:o}}_makeRow(e,t,n,r){let i=Math.min(1,n/K.gen.difficultyTime);this._updateZone(e,n,r);let a=!!this.zone&&e<=this.zone.to,o=!!this.clear&&e>=this.clear.from&&e<=this.clear.to,s=this.reserved.map(t=>e>t),c=null;if(a||o){let e={cells:[vd,vd,vd],empty:!0};c={row:e,next:Cd(this.reach,e.cells,t)}}for(let e=0;e<8&&!c;e++){let e=kd(this.rng,i).make(this.rng);if(e.cells.some((e,t)=>e!==vd&&!s[t]))continue;let n=Cd(this.reach,e.cells,t);n.size>0&&(c={row:e,next:n})}if(!c){let e=s.every(Boolean)?{cells:[yd,yd,yd],wide:`jump`}:{cells:[vd,vd,vd],empty:!0};c={row:e,next:Cd(this.reach,e.cells,t)}}let{row:l,next:u}=c;this.reach=u.size>0?u:wd(),this._emitObstacles(e,l,r,i);let d=r.coins.length;this._emitCoins(this.last,{s:e,cells:l.cells},r),this.pendingPower&&this.rowCount>0&&!a&&this._emitPowerUp(this.last,{s:e,cells:l.cells},r,d),r.rows.push({s:e,cells:l.cells.slice(),gapTime:t,biome:this.biome}),this.last={s:e,cells:l.cells},this.rowCount++}_updateZone(e,t,n){if(this.zone&&e>this.zone.to&&(this.biome=this.zone.biome,this.zone=null),this.pendingTransition!==null&&!this.zone&&this.rowCount>0){let r=fd(t+6)*1.03,i=this.last.s+4,a=Math.max(e,i+r*K.biome.preGate);this.zone={from:i,gateS:a,to:a+r*K.biome.postGate,biome:this.pendingTransition},n.transitions.push({gateS:a,from:i,to:this.zone.to,biome:this.pendingTransition,fromBiome:this.biome}),this.pendingTransition=null}}_emitPowerUp(e,t,n,r){let i=this.rng,a=(e.s+t.s)/2,o=e=>this.reserved[e]<a,s=[0,1,2].filter(n=>e.cells[n]!==xd&&t.cells[n]!==xd&&o(n));if(s.length||(s=[0,1,2].filter(e=>t.cells[e]!==xd&&o(e))),!s.length)return;let c=Ad(i,s)-1;for(let e=n.coins.length-1;e>=r;e--){let t=n.coins[e];t.lane===c&&Math.abs(t.s-a)<1.8&&n.coins.splice(e,1)}n.powerups.push({type:this.pendingPower,lane:c,s:a}),this.pendingPower=null}_emitObstacles(e,t,n,r=0){if(t.empty)return;let i=this.rng,a=hd[this.biome];if(t.wide===`jump`){n.obstacles.push({type:a.wide,lanes:[-1,0,1],s:e,cell:yd,biome:this.biome});return}let o=K.gen.movingChance.easy+(K.gen.movingChance.hard-K.gen.movingChance.easy)*r,s=!1;for(let r=0;r<3;r++){let c=t.cells[r];if(c===vd)continue;let l=r-1,u;if(c===yd)u=Ad(i,a.jump);else if(c===bd)u=l<0?a.slide[0]:a.slide[1];else if(!s&&this.rowCount>=3&&i()<o){u=a.moving,s=!0,this.reserved[r]=e+ld[u].move.run+ld[u].depth+4,n.obstacles.push({type:u,lanes:[l],s:e+ld[u].move.run,rowS:e,hitS:e,cell:c,biome:this.biome});continue}else u=Ad(i,a.block);n.obstacles.push({type:u,lanes:[l],s:e,cell:c,biome:this.biome})}}_emitCoins(e,t,n){let r=this.rng,i=K.coinSpacing,a=e.s+4.5,o=t.s-4.5-a;if(o>=4&&r()<.75){let s=[0,1,2].filter(n=>e.cells[n]!==xd&&t.cells[n]!==xd&&this.reserved[n]<e.s);if(s.length){let e=Ad(r,s)-1,t=Math.min(1+Math.floor(o/i),9),c=a+(o-(t-1)*i)/2;for(let r=0;r<t;r++)n.coins.push({lane:e,s:c+r*i,y:1})}}for(let e of[0,2])if(t.cells[e]===bd&&r()<.6)for(let r of[-1.4,0,1.4])n.coins.push({lane:e-1,s:t.s+r,y:.5});let s=[0,1,2].filter(e=>t.cells[e]===yd);if(s.length&&r()<.7){let e=Ad(r,s)-1,i=[-3.2,-1.6,0,1.6,3.2],a=[1,1.75,2.15,1.75,1];for(let r=0;r<5;r++)n.coins.push({lane:e,s:t.s+i[r],y:a[r]})}}},Md=class{constructor(){this.reset()}reset(){this.lane=0,this.x=0,this.laneVel=0,this.y=0,this.vy=0,this.grounded=!0,this.sliding=!1,this.slideT=0,this.slideAfterLand=!1,this.jumpBuffer=0,this.superJump=!1,this.flying=!1,this.events=[]}moveLane(e){let t=Math.max(-1,Math.min(1,this.lane+e));if(t===this.lane)return this.events.push(`edge`),!1;this.lane=t;let n=e*K.lane.kick*K.laneW;return this.laneVel=e>0?Math.max(this.laneVel,n):Math.min(this.laneVel,n),this.events.push(`lane`),!0}jump(){this.flying||(this.grounded?this._startJump():this.jumpBuffer=K.jump.buffer)}slide(){this.flying||(this.grounded?this._startSlide():(this.vy=Math.min(this.vy,-K.jump.fastFall),this.slideAfterLand=!0))}_startJump(){this.vy=this.superJump?K.power.boardJumpV0:K.jump.v0,this.grounded=!1,this.sliding=!1,this.slideT=0,this.slideAfterLand=!1,this.events.push(this.superJump?`superjump`:`jump`)}startFlight(){this.flying=!0,this.grounded=!1,this.sliding=!1,this.slideT=0,this.slideAfterLand=!1,this.jumpBuffer=0}endFlight(){this.flying&&(this.flying=!1,this.vy=Math.min(this.vy,0))}revive(){this.y=0,this.vy=0,this.grounded=!0,this.sliding=!1,this.slideT=0,this.slideAfterLand=!1,this.jumpBuffer=0,this.flying=!1,this.events.length=0}_startSlide(){this.sliding=!0,this.slideT=K.slide.duration,this.events.push(`slide`)}update(e){if(this._stepLane(e),this.flying){let t=this.y;this.y+=(K.power.jetHeight-this.y)*(1-Math.exp(-K.power.jetRise*e)),this.vy=e>0?(this.y-t)/e:0}else this.grounded||(this.vy-=K.jump.gravity*e,this.y+=this.vy*e,this.y<=0&&(this.y=0,this.vy=0,this.grounded=!0,this.events.push(`land`),this.jumpBuffer>0?(this.jumpBuffer=0,this._startJump()):this.slideAfterLand&&(this.slideAfterLand=!1,this._startSlide())));this.jumpBuffer>0&&(this.jumpBuffer=Math.max(0,this.jumpBuffer-e)),this.sliding&&(this.slideT-=e,this.slideT<=0&&(this.sliding=!1,this.slideT=0))}_stepLane(e){let t=K.lane,n=this.lane*K.laneW,r=K.laneW+t.overLimit,i=e;for(;i>1e-9;){let e=Math.min(i,1/240);i-=e;let r=t.omega*t.omega*(n-this.x)-2*t.zeta*t.omega*this.laneVel;this.laneVel+=r*e,this.x+=this.laneVel*e}(this.x>r||this.x<-r)&&(this.x=Math.max(-r,Math.min(r,this.x)),this.laneVel=0),Math.abs(n-this.x)<.002&&Math.abs(this.laneVel)<.05&&(this.x=n,this.laneVel=0)}box(){let e=K.player;return{x:this.x,feetY:this.y,height:this.sliding?e.slideHeight:e.height,halfW:e.halfW,halfDepth:e.halfDepth}}takeEvents(){let e=this.events;return this.events=[],e}},Nd=Object.freeze({NONE:`none`,CHASING:`chasing`,LEAVING:`leaving`,CAUGHT:`caught`}),Pd=class{constructor(e=K.bear){this.cfg=e,this.reset()}reset(){this.phase=Nd.NONE,this.elapsed=0,this.leaveT=0,this.graceLeft=0}get remaining(){return this.phase===Nd.CHASING?Math.max(0,this.cfg.chaseTime-this.elapsed):0}get remainingFraction(){return this.remaining/this.cfg.chaseTime}get leaveProgress(){return this.phase===Nd.LEAVING?Math.min(1,this.leaveT/this.cfg.leaveTime):0}get invulnerable(){return this.graceLeft>0}get visible(){return this.phase!==Nd.NONE}hit(){return this.phase===Nd.CAUGHT||this.invulnerable?`ignored`:this.phase===Nd.CHASING?(this.phase=Nd.CAUGHT,`caught`):(this.phase=Nd.CHASING,this.elapsed=0,this.leaveT=0,this.graceLeft=this.cfg.grace,`chase-start`)}update(e){if(this.graceLeft>0&&(this.graceLeft=Math.max(0,this.graceLeft-e)),this.phase===Nd.CHASING){if(this.elapsed+=e,this.elapsed>=this.cfg.chaseTime)return this.phase=Nd.LEAVING,this.leaveT=0,`escaped`}else if(this.phase===Nd.LEAVING&&(this.leaveT+=e,this.leaveT>=this.cfg.leaveTime))return this.phase=Nd.NONE,`gone`;return null}};function Fd(e,t,n,r,i){let a=Math.min(e,t)-n;return Math.max(e,t)+n>=r-i&&a<=r+i}function Id(e){let t=e.map(e=>e*K.laneW);return[Math.min(...t)-ud,Math.max(...t)+ud]}function Ld(e,t,n,r){let i=ld[r.type],a=i.move?1/(1+i.move.k):1,o=i.move?r.rowS:r.s;if(!Fd(e,t,n.halfDepth*a,o,i.depth/2*a))return!1;let[s,c]=Id(r.lanes);if(n.x+n.halfW<=s||n.x-n.halfW>=c)return!1;let l=K.hitForgive,u=n.feetY+l<i.top,d=n.feetY+n.height-l>i.bottom;return u&&d}function Rd(e,t,n,r){return!Fd(e,t,n.halfDepth+.25,r.s,.3)||Math.abs(r.lane*K.laneW-n.x)>K.laneW*.42+n.halfW?!1:r.y>n.feetY-.35&&r.y<n.feetY+n.height+.35}var zd=Object.freeze([`magnet`,`board`,`jetpack`,`shield`,`slowmo`]),Bd=new Set([`slowmo`]),Vd=class{constructor(){this.reset()}reset(){this.remaining=Object.fromEntries(zd.map(e=>[e,0])),this.landGrace=0,this.shieldGrace=0,this.timeScale=1}activate(e){if(!zd.includes(e))throw Error(`unknown power-up ${e}`);this.remaining[e]=K.power[e].duration}active(e){return this.remaining[e]>0}ending(e){let t=this.remaining[e];return t>0&&t<K.power.warnTime}absorbHit(){return this.active(`shield`)?(this.remaining.shield=0,this.shieldGrace=K.power.shieldGrace,!0):!1}stepTimeScale(e){let t=this.active(`slowmo`)?K.power.slowScale:1;return this.timeScale+=(t-this.timeScale)*(1-Math.exp(-K.power.slowEase*e)),Math.abs(t-this.timeScale)<.002&&(this.timeScale=t),this.timeScale}update(e,t=e){let n=[];for(let r of zd)this.remaining[r]>0&&(this.remaining[r]=Math.max(0,this.remaining[r]-(Bd.has(r)?t:e)),this.remaining[r]===0&&n.push(r));return this.landGrace>0&&(this.landGrace=Math.max(0,this.landGrace-e)),this.shieldGrace>0&&(this.shieldGrace=Math.max(0,this.shieldGrace-e)),n}},Hd=class{constructor(e=Math.random()*2**32>>>0){this.rng=dd(e),this.due={};for(let e of zd)this.due[e]=K.power[e].first+this._jitter();this.lastSpawn=-1/0}_jitter(){return(this.rng()*2-1)*K.power.jitter}poll(e,t=!1){if(t||e-this.lastSpawn<K.power.minSeparation)return null;let n=null;for(let t of zd)this.due[t]<=e&&(n===null||this.due[t]<this.due[n])&&(n=t);return n===null?null:(this.due[n]=e+K.power[n].every+this._jitter(),this.lastSpawn=e,n)}},Ud=class{constructor(e=1){this.rng=dd(e),this.active=!1}start(e,t){this.active=!0,this.nextS=e,this.lane=t,this.count=0}stop(){this.active=!1}emit(e,t){let n=[];if(!this.active)return n;for(;this.nextS<e;)if(n.push({lane:this.lane,s:this.nextS,y:t}),this.nextS+=K.coinSpacing,this.count++,this.count%12==0){let e=[this.lane-1,this.lane+1].filter(e=>e>=-1&&e<=1);this.lane=e[Math.floor(this.rng()*e.length)],this.nextS+=K.coinSpacing*2}return n}},Wd=class{constructor(e=Math.random()*2**32>>>0,t=K.economy.crownRun){this.rng=dd(e),this.cfg=t,this.due=t.first+this._jitter()}_jitter(){return(this.rng()*2-1)*this.cfg.jitter}poll(e,t=!1){return t||e<this.due?!1:(this.due=e+this.cfg.every+this._jitter(),!0)}},Gd=Object.freeze([`coins`,`crowns`]);Object.freeze({coins:`bănuți`,crowns:`Coroane`});var Kd=()=>({coins:K.economy.maxCoins,crowns:K.economy.maxCrowns});function qd(e,t=2**53-1){return typeof e!=`number`||!Number.isFinite(e)?0:Math.min(t,Math.max(0,Math.floor(e)))}function Jd(e){let t=Kd(),n=e&&typeof e==`object`?e:{};return{coins:qd(n.coins,t.coins),crowns:qd(n.crowns,t.crowns)}}function Yd(e){let t=e&&typeof e==`object`?e:{};return{coins:qd(t.coins),crowns:qd(t.crowns)}}function Xd(e,t){let n=Yd(t);return e.coins>=n.coins&&e.crowns>=n.crowns}function Zd(e,t){let n=Yd(t),r=Kd(),i={};for(let t of Gd){let a=e[t];e[t]=Math.min(r[t],a+n[t]),i[t]=e[t]-a}return i}function Qd(e,t){let n=Yd(t),r=t&&typeof t==`object`?t:{};for(let e of Gd)if(r[e]!==void 0&&r[e]!==n[e])return!1;return Xd(e,n)?(e.coins-=n.coins,e.crowns-=n.crowns,!0):!1}function $d(e){let t=Yd(e),n=[];return t.coins&&n.push(`${t.coins} ${t.coins===1?`bănuț`:`bănuți`}`),t.crowns&&n.push(`${t.crowns} ${t.crowns===1?`Coroană`:`Coroane`}`),n.join(` + `)||`gratuit`}var ef=class{constructor(e=K.revive){this.cfg=e,this.used=0,this.adsUsed=0,this.state=`idle`,this.token=0}get limit(){return this.cfg.costs.length}get left(){return Math.max(0,this.limit-this.used)}get available(){return this.state!==`over`&&this.used<this.limit}get cost(){return this.used<this.limit?this.cfg.costs[this.used]:null}get adAllowed(){return this.adsUsed<this.cfg.maxAds}offer(){return this.state!==`idle`||!this.available?!1:(this.state=`offered`,!0)}payCrowns(e){if(this.state!==`offered`)return{ok:!1,reason:`state`};let t={crowns:this.cost};return!Xd(e,t)||!Qd(e,t)?{ok:!1,reason:`funds`}:(this._granted(),{ok:!0,cost:t.crowns})}startAd(){return this.state!==`offered`||!this.adAllowed?null:(this.state=`ad`,this.token++,this.token)}adFinished(e,t){return this.state!==`ad`||e!==this.token?`ignored`:t===!0?(this.adsUsed++,this._granted(),`revived`):(this.state=`offered`,`back`)}decline(){return this.state===`offered`&&(this.state=`over`,!0)}cancel(){this.state=`over`,this.token++}_granted(){this.used++,this.state=`idle`}};function tf(e,t=new Date(2026,0,1)){return e instanceof Date&&Number.isFinite(e.getTime())?e:t}function nf(e){let t=tf(e);return Math.floor(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate())/864e5)}function rf(e){let t=tf(e),n=(e,t=2)=>String(e).padStart(t,`0`);return`${n(t.getFullYear(),4)}-${n(t.getMonth()+1)}-${n(t.getDate())}`}function af(e){let t=tf(e),n=(t.getDay()+6)%7;return rf(new Date(t.getFullYear(),t.getMonth(),t.getDate()-n))}var of=/^\d{4}-\d{2}-\d{2}$/;function sf(e){return typeof e==`string`&&of.test(e)}function cf(e){return 7-(tf(e).getDay()+6)%7}function lf(e){let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return t>>>0}function uf(){return{runs:1,coins:0,crowns:0,distance:0,score:0,time:0,jumps:0,slides:0,laneChanges:0,powers:0,escapes:0,portals:0,hits:0,cleanSeconds:0,shieldBlocks:0,revives:0}}Object.freeze(Object.keys(uf()));var df=(e,t,n,r,i=`sum`)=>({id:e,metric:t,goal:n,text:r,kind:i}),ff=Object.freeze([df(`d_coins`,`coins`,150,`Adună {N} bănuți`),df(`d_jumps`,`jumps`,40,`Sari de {N} ori`),df(`d_slides`,`slides`,25,`Alunecă de {N} ori`),df(`d_distance`,`distance`,3e3,`Parcurge {n} m`),df(`d_runs`,`runs`,3,`Joacă {N} curse`),df(`d_powers`,`powers`,4,`Culege {N} abilități speciale`),df(`d_escapes`,`escapes`,2,`Scapă de urs de {N} ori`),df(`d_lanes`,`laneChanges`,60,`Schimbă culoarul de {N} ori`),df(`d_score`,`score`,2500,`Fă {N} puncte într-o cursă`,`max`),df(`d_clean`,`cleanSeconds`,45,`Rezistă {n} s fără nicio lovitură`,`max`)]),pf=Object.freeze([df(`w_coins`,`coins`,1500,`Adună {N} bănuți`),df(`w_distance`,`distance`,25e3,`Parcurge {n} m`),df(`w_runs`,`runs`,20,`Joacă {N} curse`),df(`w_jumps`,`jumps`,300,`Sari de {N} ori`),df(`w_powers`,`powers`,30,`Culege {N} abilități speciale`),df(`w_escapes`,`escapes`,12,`Scapă de urs de {N} ori`),df(`w_portals`,`portals`,5,`Treci prin {N} portaluri`),df(`w_score`,`score`,8e3,`Fă {N} puncte într-o cursă`,`max`)]),mf=Object.freeze([df(`r_jumps`,`jumps`,20,`Sari de {N} ori într-o cursă`,`max`),df(`r_coins`,`coins`,100,`Adună {N} bănuți într-o cursă`,`max`),df(`r_distance`,`distance`,1500,`Parcurge {n} m într-o cursă`,`max`),df(`r_slides`,`slides`,10,`Alunecă de {N} ori într-o cursă`,`max`),df(`r_clean`,`cleanSeconds`,60,`Rezistă {n} s fără lovitură într-o cursă`,`max`),df(`r_powers`,`powers`,3,`Culege {N} abilități într-o cursă`,`max`),df(`r_lanes`,`laneChanges`,40,`Schimbă culoarul de {N} ori într-o cursă`,`max`),df(`r_score`,`score`,3e3,`Fă {N} puncte într-o cursă`,`max`),df(`r_escape`,`escapes`,1,`Scapă de urs într-o cursă`,`max`),df(`r_portal`,`portals`,1,`Treci printr-un portal într-o cursă`,`max`)]),hf={daily:ff,weekly:pf,run:mf},gf=Object.freeze([`daily`,`weekly`,`run`]),_f=Object.freeze({daily:`Zilnice`,weekly:`Săptămânale`,run:`Pe cursă`});function vf(e,t){return hf[e]?.find(e=>e.id===t)??null}function yf(e,t){let n=vf(e,t.id);if(!n)return 1;if(e!==`run`||n.goal===1)return n.goal;let r=Math.max(0,Math.floor(t.round||0));return Math.max(1,Math.round(n.goal*(1+K.missions.runGoalGrowth*r)))}function bf(e,t){return t.progress>=yf(e,t)}function xf(e){let t=e%100;return e>=20&&(t===0||t>=20)?`${e} de`:String(e)}function Sf(e,t){let n=vf(e,t.id);if(!n)return``;let r=yf(e,t);return n.text.replace(`{N}`,xf(r)).replace(`{n}`,String(r))}function Cf(e){return{...K.missions.reward[e]}}function wf(e,t,n){let r=dd(lf(t)),i=e.map(e=>e.id);for(let e=i.length-1;e>0;e--){let t=Math.floor(r()*(e+1));[i[e],i[t]]=[i[t],i[e]]}return i.slice(0,Math.min(n,i.length))}var Tf=(e,t={})=>({id:e,progress:0,claimed:!1,...t});function Ef(e,t){let n=e===`daily`?K.missions.dailyCount:K.missions.weeklyCount;return{key:t,list:wf(hf[e],`${e}:${t}`,n).map(e=>Tf(e)),bonusClaimed:!1}}function Df(){let e=K.missions.runCount;return{cursor:e,list:mf.slice(0,e).map(e=>Tf(e.id,{round:0}))}}function Of(e=new Date){return{daily:Ef(`daily`,rf(e)),weekly:Ef(`weekly`,af(e)),run:Df()}}var kf=(e,t=1e9)=>typeof e==`number`&&Number.isFinite(e)?Math.min(t,Math.max(0,Math.floor(e))):0;function Af(e,t,n){let r=new Set,i=[];for(let a of Array.isArray(t)?t:[]){if(!a||typeof a!=`object`||typeof a.id!=`string`||!vf(e,a.id)||r.has(a.id))continue;r.add(a.id);let t=Tf(a.id,{progress:kf(a.progress),claimed:a.claimed===!0});if(e===`run`&&(t.round=kf(a.round,1e3)),t.claimed&&!bf(e,t)&&(t.claimed=!1),i.push(t),i.length>=n)break}return i}function jf(e,t=new Date){let n=e&&typeof e==`object`?e:{},r={};for(let e of[`daily`,`weekly`]){let i=n[e],a=e===`daily`?K.missions.dailyCount:K.missions.weeklyCount,o=i&&typeof i==`object`&&sf(i.key)?Af(e,i.list,a):[];r[e]=o.length===a?{key:i.key,list:o,bonusClaimed:i.bonusClaimed===!0}:Ef(e,e===`daily`?rf(t):af(t)),r[e].bonusClaimed&&!r[e].list.every(e=>e.claimed)&&(r[e].bonusClaimed=!1)}let i=n.run,a=i&&typeof i==`object`?Af(`run`,i.list,K.missions.runCount):[];return r.run=a.length===K.missions.runCount?{cursor:Math.max(K.missions.runCount,kf(i.cursor,1e6)),list:a}:Df(),r}function Mf(e,t,n){let r=vf(e,t.id);if(!r)return t.progress;let i=kf(n?.[r.metric]);return r.kind===`max`?Math.max(t.progress,i):Math.min(1e9,t.progress+i)}function Nf(e,t){let n=[];for(let r of gf)for(let i of e[r].list){if(i.claimed)continue;let e=bf(r,i);i.progress=Mf(r,i,t),!e&&bf(r,i)&&n.push({scope:r,id:i.id})}return n}function Pf(e,t){let n=[];for(let r of gf)for(let i of e[r].list){let e=yf(r,i),a=i.claimed?i.progress:Mf(r,i,t);n.push({scope:r,id:i.id,progress:Math.min(a,e),goal:e,complete:a>=e,claimed:i.claimed})}return n}function Ff(e,t,n){let r=e[t];if(!r)return null;let i=r.list.findIndex(e=>e.id===n),a=r.list[i];if(!a||a.claimed||!bf(t,a))return null;if(a.claimed=!0,t===`run`){let e=new Set(r.list.map(e=>e.id));for(let t=0;t<mf.length;t++){let t=mf[r.cursor%mf.length],a=Math.floor(r.cursor/mf.length);if(r.cursor++,!(e.has(t.id)&&t.id!==n)){r.list[i]=Tf(t.id,{round:a});break}}}return Cf(t)}function If(e){let t=e.daily;return t.bonusClaimed||!t.list.every(e=>e.claimed)?null:(t.bonusClaimed=!0,{...K.missions.reward.dailyBonus})}function Lf(e){return!e.daily.bonusClaimed&&e.daily.list.every(e=>e.claimed)}function Rf(e){let t=0;for(let n of gf)for(let r of e[n].list)!r.claimed&&bf(n,r)&&t++;return Lf(e)&&t++,t}function zf(e,t=new Date){let n={rolled:[],autoClaimed:[],clockWentBack:!1},r={daily:rf(t),weekly:af(t)};for(let t of[`daily`,`weekly`]){let i=e[t],a=r[t];if(a!==i.key){if(a<i.key)i.key=a,n.clockWentBack=!0;else{for(let e of i.list)!e.claimed&&bf(t,e)&&(e.claimed=!0,n.autoClaimed.push({scope:t,id:e.id,reward:Cf(t)}));t===`daily`&&Lf(e)&&(i.bonusClaimed=!0,n.autoClaimed.push({scope:t,id:`bonus`,reward:{...K.missions.reward.dailyBonus}})),e[t]=Ef(t,a),n.rolled.push(t)}}}return n}var Bf=Object.freeze([`boy`,`bear`,`trail`,`emoji`]),Vf=Object.freeze({boy:`Băiatul`,bear:`Ursul`,trail:`Trail`,emoji:`Emoji`}),Hf=Object.freeze({boy:[{id:`clasic`,name:`Clasic`,desc:`Geaca roșie și fularul galben de la prima cursă.`,price:null},{id:`schior`,name:`Schior din Poiana`,desc:`Combinezon de concurs, cască și dosar cu numărul 7.`,price:{coins:1500}},{id:`salvamont`,name:`Salvamontist`,desc:`Echipament Salvamont: cruce albă, rucsac și frontală.`,price:{crowns:30}},{id:`junii`,name:`Junele Brașovului`,desc:`Costum de sărbătoare al Junilor din Șchei, cu căciulă și brâu tricolor.`,price:{crowns:45}},{id:`stegar`,name:`Stegarul`,desc:`Galben-negru din cap până-n picioare, ca suporterii din Brașov.`,price:{coins:3e3}},{id:`mascota`,name:`Mascota Ursuleț`,desc:`Costum de urs de pluș. Ursul adevărat nu se lasă păcălit.`,price:{crowns:60}}],bear:[{id:`brun`,name:`Ursul brun`,desc:`Ursul carpatin, exact cum îl știi.`,price:null},{id:`racadau`,name:`Ursul din Răcădău`,desc:`Vine direct de la tomberoane: capac pe cap și bandană.`,price:{coins:4e3}},{id:`craciun`,name:`Ursul de Crăciun`,desc:`Alb ca zăpada, cu fular și căciulă de la Târgul din Piața Sfatului.`,price:{crowns:40}}],trail:[{id:`none`,name:`Fără trail`,desc:`Doar zăpada (sau apa) ridicată de tine.`,price:null},{id:`fulgi`,name:`Fulgi de nea`,desc:`Fulgi albaștri care plutesc în urma ta.`,price:{coins:800}},{id:`scantei`,name:`Scântei aurii`,desc:`Scântei de aur, ca la artificiile de Zilele Brașovului.`,price:{coins:2e3}},{id:`frunze`,name:`Frunze de pe Tâmpa`,desc:`Frunze de toamnă luate de vânt.`,price:{crowns:15}},{id:`tricolor`,name:`Tricolor`,desc:`Trei dâre: roșu, galben și albastru.`,price:{crowns:25}}],emoji:[{id:`none`,name:`Fără emoji`,desc:`Nicio reacție.`,price:null,glyph:``},{id:`urs`,name:`Urs`,desc:`Pentru când scapi de el.`,price:{coins:300},glyph:`🐻`},{id:`schi`,name:`Schior`,desc:`Poiana, venim!`,price:{coins:300},glyph:`⛷️`},{id:`munte`,name:`Munte`,desc:`Tâmpa e a ta.`,price:{coins:500},glyph:`🏔️`},{id:`foc`,name:`Foc`,desc:`Ești pe val.`,price:{coins:700},glyph:`🔥`},{id:`cool`,name:`Ochelari`,desc:`Fără emoții.`,price:{crowns:5},glyph:`😎`},{id:`coroana`,name:`Coroană`,desc:`Orașul Coroanei.`,price:{crowns:10},glyph:`👑`}]}),Uf=Object.freeze({boy:`clasic`,bear:`brun`,trail:`none`,emoji:`none`});function Wf(e,t){return Hf[e]?.find(e=>e.id===t)??null}function Gf(){let e={},t={};for(let n of Bf)e[n]=[Uf[n]],t[n]=Uf[n];return{owned:e,equipped:t}}function Kf(e){let t=Gf(),n=e&&typeof e==`object`?e:{};for(let e of Bf){let r=Array.isArray(n.owned?.[e])?n.owned[e]:[];for(let n of r)typeof n==`string`&&Wf(e,n)&&!t.owned[e].includes(n)&&t.owned[e].push(n);let i=n.equipped?.[e];typeof i==`string`&&t.owned[e].includes(i)&&(t.equipped[e]=i)}return t}function qf(e,t,n){return!!e.owned[t]?.includes(n)}function Jf(e,t,n){return!Wf(t,n)||qf(e,t,n)?!1:(e.owned[t].push(n),!0)}function Yf(e,t,n){return qf(e,t,n)?(e.equipped[t]=n,!0):!1}function Xf(e,t,n,r){let i=Wf(n,r);return i?qf(e,n,r)?{ok:!1,reason:`owned`}:i.price&&!Xd(t,i.price)||i.price&&!Qd(t,i.price)?{ok:!1,reason:`funds`}:(e.owned[n].push(r),{ok:!0}):{ok:!1,reason:`unknown`}}function Zf(e,t){let n=Wf(e,t)?.price;return n?Math.max(100,Math.floor(((n.coins||0)+(n.crowns||0)*50)/2)):100}function Qf(e){return new Po({uniforms:{uTop:{value:new B(4029636)},uMid:{value:new B(9420777)},uHor:{value:new B(14149622)},uSunDir:{value:new R(0,.3,-1).normalize()},uSunCol:{value:new B(16773848)},uSun:{value:new R(.035,.8,1)},uCloud:{value:new R(.45,.012,1)},uCloudLit:{value:new B(16777215)},uCloudShade:{value:new B(12044508)},uTime:{value:0}},defines:{OCT:e?3:4},side:1,depthWrite:!1,depthFunc:3,fog:!1,vertexShader:`
      varying vec3 vDir;
      void main() {
        vDir = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_Position.z = gl_Position.w * 0.99999;
      }`,fragmentShader:`
      uniform vec3 uTop, uMid, uHor, uSunDir, uSunCol, uSun, uCloud, uCloudLit, uCloudShade;
      uniform float uTime;
      varying vec3 vDir;
      float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
      float noise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
      }
      float fbm(vec2 p) {
        float a = 0.5, s = 0.0;
        for (int i = 0; i < OCT; i++) { s += a * noise(p); p = p * 2.03 + 11.7; a *= 0.5; }
        return s;
      }
      void main() {
        vec3 d = normalize(vDir);
        float h = d.y;
        vec3 c = mix(uHor, uMid, smoothstep(0.0, 0.22, h));
        c = mix(c, uTop, smoothstep(0.18, 0.85, h));
        float sd = max(dot(d, uSunDir), 0.0);
        // clouds: lit from the sun side, with a bright rim toward the sun
        if (h > 0.0 && uCloud.z > 0.0) {
          vec2 uv = d.xz / (h + 0.22) * 1.3 + vec2(uTime * uCloud.y, uTime * uCloud.y * 0.3);
          float n = fbm(uv);
          float cov = smoothstep(1.0 - uCloud.x, 1.0 - uCloud.x + 0.22, n);
          float n2 = fbm(uv + uSunDir.xz * 0.12);
          float lit = clamp(0.55 + (n - n2) * 3.5, 0.0, 1.0);
          vec3 cc = mix(uCloudShade, uCloudLit, lit);
          cc += uSunCol * pow(sd, 6.0) * 0.35 * lit;
          float fadeH = smoothstep(0.02, 0.2, h);
          c = mix(c, cc, cov * fadeH * uCloud.z);
        }
        // sun: wide halo, tight glow and a hard HDR disc (the bloom pass turns it into a shining sun)
        c += uSunCol * (pow(sd, 5.0) * 0.22 + pow(sd, 40.0) * 0.55) * uSun.y;
        float r = uSun.x;
        float disc = smoothstep(cos(r * 1.25), cos(r * 0.9), sd);
        c = mix(c, uSunCol * 9.0, disc * uSun.z);
        gl_FragColor = vec4(c, 1.0);
        #ifdef TONE_MAPPING
          gl_FragColor.rgb = toneMapping(gl_FragColor.rgb);
        #endif
        gl_FragColor = linearToOutputTexel(gl_FragColor);
      }`})}var $f={uTime:{value:0},uDist:{value:0},uSunDir:{value:new R(0,.4,-1).normalize()},uSunCol:{value:new B(1,.9,.7)},uSkyCol:{value:new B(.4,.6,.9)},uHorCol:{value:new B(.8,.85,.9)}},ep=`
float gHash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float gNoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(gHash(i), gHash(i + vec2(1.0, 0.0)), f.x), mix(gHash(i + vec2(0.0, 1.0)), gHash(i + vec2(1.0, 1.0)), f.x), f.y);
}`;function tp(e,t,{pars:n=``,color:r=``,out:i=``,uniforms:a=null}){return e.customProgramCacheKey=()=>t,e.onBeforeCompile=e=>{Object.assign(e.uniforms,$f),a&&Object.assign(e.uniforms,a),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vGW;`).replace(`#include <project_vertex>`,`#include <project_vertex>
vGW = (modelMatrix * vec4(transformed, 1.0)).xyz;`);let t=Object.keys($f).map(e=>`uniform ${e===`uTime`||e===`uDist`?`float`:`vec3`} ${e};`).join(`
`),o=a?Object.entries(a).map(([e,t])=>`uniform ${typeof t.value==`number`?`float`:`vec3`} ${e};`).join(`
`):``;e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>\nvarying vec3 vGW;\n${t}\n${o}\n${ep}\n${n}`).replace(`#include <color_fragment>`,`#include <color_fragment>\n${r}`).replace(`#include <opaque_fragment>`,`${i}\n#include <opaque_fragment>`)},e.needsUpdate=!0,e}function np(e,{bank:t}){return tp(e,`water1`,{uniforms:{uBank:{value:t},uDeep:{value:new B(876408)},uShallow:{value:new B(3843764)},uGlitter:{value:1}},pars:`
      vec2 waterGrad(vec2 p, float t) {
        vec2 g = vec2(0.0);
        g += vec2(0.90, 0.43) * 0.50 * 1.7 * cos(dot(p, vec2(0.90, 0.43)) * 1.7 + t * 1.3);
        g += vec2(-0.50, 0.87) * 0.32 * 2.9 * cos(dot(p, vec2(-0.50, 0.87)) * 2.9 + t * 1.9);
        g += vec2(0.20, -0.98) * 0.20 * 5.1 * cos(dot(p, vec2(0.20, -0.98)) * 5.1 + t * 2.6);
        g += vec2(-0.95, -0.30) * 0.12 * 9.0 * cos(dot(p, vec2(-0.95, -0.30)) * 9.0 + t * 3.4);
        g += vec2(0.55, 0.83) * 0.08 * 15.0 * cos(dot(p, vec2(0.55, 0.83)) * 15.0 - t * 4.1);
        return g;
      }`,color:`
      vec2 wp = vec2(vGW.x, vGW.z - uDist);
      float wvar = gNoise(wp * 0.35 + vec2(0.0, uTime * 0.05)) * 0.7 + gNoise(wp * 1.1) * 0.3;
      diffuseColor.rgb = mix(uDeep, uShallow, wvar);
      float wedge = uBank - abs(vGW.x);`,out:`
      {
        vec2 g = waterGrad(wp, uTime);
        vec3 wn = normalize(vec3(-g.x * 0.05, 1.0, -g.y * 0.05));
        vec3 wv = normalize(cameraPosition - vGW);
        float wd = length(cameraPosition - vGW);
        float fres = 0.04 + 0.96 * pow(1.0 - clamp(dot(wn, wv), 0.0, 1.0), 4.0);
        vec3 wr = reflect(-wv, wn);
        vec3 refl = mix(uHorCol, uSkyCol, clamp(wr.y * 1.8, 0.0, 1.0));
        // (capped: the track must stay water-colored so the orange coins and buoys read against it)
        outgoingLight = mix(outgoingLight, refl, clamp(fres, 0.0, 0.55));
        // sun glitter: tiny bright flashes where a ripple faces the sun (HDR, so bloom picks them up)
        float sp = pow(max(dot(wr, uSunDir), 0.0), 140.0);
        float sp2 = pow(max(dot(wr, uSunDir), 0.0), 18.0);
        float fade = 1.0 - smoothstep(30.0, 110.0, wd) * 0.6;
        outgoingLight += uSunCol * (sp * 2.6 + sp2 * 0.03) * uGlitter * fade;
        // foam: a wobbly white band where the water meets the bank, plus a few streaks drifting off it
        float fw = 0.55 + 0.45 * sin(wp.y * 1.3 + uTime * 0.8 + vGW.x * 2.0) + (gNoise(wp * 2.2 + uTime * 0.3) - 0.5) * 0.9;
        float foam = (1.0 - smoothstep(0.0, max(1.25 * fw + 0.15, 0.05), wedge)) * (0.55 + 0.45 * gNoise(wp * 3.0 - uTime * 0.2));
        outgoingLight = mix(outgoingLight, vec3(0.95, 0.98, 1.0) * (0.75 + 0.25 * uSunCol), clamp(foam, 0.0, 0.85));
      }`}),e}function rp(e,{strength:t=1}={}){return tp(e,`snow1`,{uniforms:{uSpark:{value:t}},out:`
      {
        vec2 sp = vec2(vGW.x, vGW.z - uDist) * 7.0;
        vec2 cell = floor(sp);
        float h = gHash(cell);
        float dd = length(cameraPosition - vGW);
        float on = step(0.93, h) * (1.0 - smoothstep(9.0, 34.0, dd));
        float tw = pow(max(0.0, sin(uTime * (2.0 + h * 4.0) + h * 80.0)), 6.0);
        vec2 f = fract(sp) - 0.5;
        float pt = smoothstep(0.32, 0.0, length(f + (vec2(gHash(cell + 7.0), gHash(cell + 3.0)) - 0.5) * 0.4));
        outgoingLight += vec3(0.9, 0.97, 1.0) * on * tw * pt * 5.0 * uSpark;
        // faint cool tint in the unlit (shadowed) parts: ambient light is bluer than the sun
        outgoingLight *= vec3(0.985, 0.995, 1.015);
      }`}),e}function ip(e,{ceilY:t,halfW:n}){return tp(e,`gloss1`,{uniforms:{uCeil:{value:t},uHalfW:{value:n}},out:`
      {
        vec3 gv = normalize(cameraPosition - vGW);
        vec3 gr = vec3(-gv.x, gv.y, -gv.z);
        float gt = (uCeil - vGW.y) / max(gr.y, 0.02);
        vec3 hit = vGW + gr * gt;
        float inside = smoothstep(uHalfW, uHalfW - 0.7, abs(hit.x));
        float beam = smoothstep(0.0, 0.5, abs(fract((hit.z - uDist) / 6.0 + 0.5) - 0.5) * 6.0 - 0.1);
        float distFade = 1.0 - smoothstep(25.0, 110.0, length(cameraPosition - vGW));
        float fres = pow(1.0 - clamp(gv.y, 0.0, 1.0), 3.0);
        float grout = 0.55 + 0.45 * smoothstep(0.35, 0.8, dot(diffuseColor.rgb, vec3(0.3, 0.5, 0.2)));
        float shine = 0.6 + 0.4 * gNoise(vec2(vGW.x * 0.7, vGW.z - uDist) * 0.5);
        outgoingLight += vec3(0.95, 0.98, 1.0) * inside * beam * fres * grout * shine * distFade * 0.85;
        // soft warm bounce from the shop windows at the sides
        outgoingLight += vec3(1.0, 0.82, 0.55) * smoothstep(3.0, 9.0, abs(vGW.x)) * fres * 0.10 * distFade;
      }`}),e}function ap(e,{scale:t=.18,amount:n=.14,warm:r=0}={}){return tp(e,`var-${t}-${n}-${r}`,{color:`
      {
        vec2 vp = vec2(vGW.x, vGW.z - uDist);
        float vn = gNoise(vp * ${t.toFixed(3)}) * 0.65 + gNoise(vp * ${(t*3.7).toFixed(3)}) * 0.35;
        diffuseColor.rgb *= 1.0 + (vn - 0.5) * ${n.toFixed(3)} * 2.0;
        diffuseColor.rgb *= vec3(1.0 + ${r.toFixed(3)} * (vn - 0.5), 1.0, 1.0 - ${r.toFixed(3)} * (vn - 0.5));
      }`}),e}function op(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new Ir,l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let e in d.morphAttributes){if(!i.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;o[e]===void 0&&(o[e]=[]),o[e].push(d.morphAttributes[e])}if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=sp(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=sp(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function sp(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new xr(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}var cp=new Map;function q(e,t={}){let n=e+`|`+JSON.stringify(t),r=cp.get(n);return r||(r=new W({color:e,flatShading:!0,...t}),cp.set(n,r)),r}var lp=new Map;function J(e,t){let n=lp.get(e);return n||(n=t(),lp.set(e,n)),n}var up={snow:15988990,snowShade:14017780,ice:11130613,iceDark:7319776,wood:8014374,woodDark:5714457,woodLight:13146722,pine:2056264,pineLight:2915674,rock:7964314,rockDark:5990265,red:14236464,orange:15764004,yellow:16764735,navy:1914199,blue:1929144,skin:15910048,steel:9148328};function Y(e,t,n=0,r=0,i=0){let a=new V(e,t);return a.position.set(n,r,i),a}function dp(e,t){let n=new B(t),r=e.attributes.position.count,i=new Float32Array(r*3);for(let e=0;e<r;e++)i[e*3]=n.r,i[e*3+1]=n.g,i[e*3+2]=n.b;return e.setAttribute(`color`,new xr(i,3)),e}var fp=Math.PI*2,pp=K.laneW*3/2+.6;function mp(e,t,n,r){let i=(e-t+n)%r;return(i<0?i+r:i)-n}function hp(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function gp(e,t,r,i=1,a=1,o=1){let s=document.createElement(`canvas`);s.width=e,s.height=t,r(s.getContext(`2d`),e,t);let c=new Yi(s);return c.colorSpace=He,c.wrapS=c.wrapT=n,c.repeat.set(i,a),c.anisotropy=o,c}function _p(e){return op(e.map(e=>{let t=e.index?e.toNonIndexed():e;for(let e of Object.keys(t.attributes))e!==`position`&&e!==`normal`&&e!==`color`&&t.deleteAttribute(e);return t.attributes.normal||t.computeVertexNormals(),t}),!1)}function X(e,t,n=0,r=0,i=0){return e.translate(n,r,i),dp(e,t)}var vp=()=>new W({vertexColors:!0,flatShading:!0});function yp(e,t,n){return new B(e).lerp(new B(t),n).getHex()}var bp=class{constructor(e){this.ctx=e,this.mobile=!!e.mobile,this.aniso=e.aniso||1,this.group=new z,this.backdrop=new z,this.recyclers=[],this.singles=[],this.slabs=null,this.treeRecyclers=[],this.dummy=new Nn}recycler(e,t,n,r,i,a={}){let o=new Ii(e,t,Math.max(1,n.length));if(o.count=n.length,o.frustumCulled=!1,o.castShadow=!!a.cast,o.receiveShadow=!!a.receive,a.tint){let e=new B;n.forEach((t,n)=>{typeof t.tint==`number`&&t.tint>2?e.set(t.tint):e.setScalar(t.tint??1),o.setColorAt(n,e)})}this.group.add(o);let s={im:o,items:n,span:r,behind:i,bob:a.bob};return this.recyclers.push(s),s}single(e,t,n,r,i=0,a=0){return this.group.add(e),this.singles.push({obj:e,o:t,span:n,behind:r,x:i,y:a}),e}ground(e,t,{len:n=60,count:r=5,width:i=140,trackY:a=.02,trackHalf:o=pp}={}){let s=new So(i,n).rotateX(-Math.PI/2),c=new So(o*2,n).rotateX(-Math.PI/2),l=[];for(let i=0;i<r;i++){let r=new V(s,e);if(r.receiveShadow=!0,t){let e=new V(c,t);e.position.y=a,e.receiveShadow=!0,r.add(e)}r.userData.o=i*n,this.group.add(r),l.push(r)}this.slabs={list:l,len:n,count:r}}updateTrack(e){let t=this.dummy;if(this.slabs){let{list:t,len:n,count:r}=this.slabs;for(let i of t){let t=mp(i.userData.o,e,20+n,n*r);i.position.set(0,0,-(t+n/2))}}let n=performance.now()*.001;for(let r of this.recyclers){let{im:i,items:a,span:o,behind:s,bob:c}=r;for(let r=0;r<a.length;r++){let l=a[r],u=mp(l.o,e,s,o);t.position.set(l.x,(l.y||0)+(c?Math.sin(n*2+r*1.7)*c:0),-u),t.rotation.set(0,l.rot||0,c?Math.sin(n*1.6+r)*.06:0),l.sx?t.scale.set(l.sx,l.sy,l.sz):t.scale.setScalar(l.s??1),t.updateMatrix(),i.setMatrixAt(r,t.matrix)}i.instanceMatrix.needsUpdate=!0}for(let t of this.singles){let n=mp(t.o,e,t.behind,t.span);t.obj.position.set(t.x,t.y,-n)}}update(e,t,n,r){this.updateTrack(e),this.backdrop.position.x=r.position.x*.9,this.animate?.(e,t,n,r)}visibleTreeCount(e){let t=0;for(let n of this.treeRecyclers)for(let r of n.items){let i=mp(r.o,e,n.behind,n.span);i>0&&i<150&&t++}return t}};function xp(e=5214010,t=4160048,n=6965804){let r=[X(new U(.16,.24,2.4,6),n,0,1.2,0)],i=new bo(1.5,1);i.scale(1,.9,1),r.push(X(i,e,0,3.2,0));let a=new bo(1.05,1);r.push(X(a,t,.7,2.7,.3));let o=new bo(.95,1);return r.push(X(o,e,-.6,3.9,-.2)),_p(r)}function Sp(){return _p([X(new U(.16,.22,.5,8),1908516,0,.25,0),X(new U(.06,.08,3.6,6),2303532,0,2.2,0),X(new U(.2,.12,.12,6),2303532,0,4.05,0),X(new U(.18,.13,.5,6),16770728,0,4.35,0),X(new ea(.26,.3,6),1908516,0,4.75,0),X(new wo(.05,5,4),1908516,0,4.95,0)])}function Cp(e=10119740,t=2895928){let n=[];for(let e of[-.7,.7])n.push(X(new H(.5,.45,.08),t,0,.22,e)),n.push(X(new H(.08,.5,.08),t,-.22,.65,e));for(let t of[-.12,.08])n.push(X(new H(.16,.05,1.7),e,t,.47,0));for(let t of[.68,.85])n.push(X(new H(.05,.12,1.7),e,-.24,t,0));return _p(n)}var wp=new Map;function Tp(e){if(wp.has(e))return wp.get(e);let t=document.createElement(`canvas`);t.width=128,t.height=160;let n=t.getContext(`2d`);n.font=`900 150px "Arial Black", Arial, Helvetica, sans-serif`,n.textAlign=`center`,n.textBaseline=`alphabetic`,n.lineWidth=8,n.strokeStyle=`rgba(40,50,60,0.55)`,n.strokeText(e,64,e===`Ș`?120:140),n.fillStyle=`#ffffff`,n.fillText(e,64,e===`Ș`?120:140);let r=new Yi(t);return r.colorSpace=He,wp.set(e,r),r}function Ep({x:e=0,z:t=-150,winter:n=!1,haze:r=14149622,hazeK:i=.35,scale:a=1,tall:o=1,letters:s=1}={}){let c=new z,l=62*a,u=40*a*o,d=30*a,f=-8*a,p=new wo(1,56,28,0,fp,0,Math.PI/2),m=p.attributes.position,h=new Float32Array(m.count*3),g=hp(77),_=new B,v=n?[2377274,2904644,3365964,2772032]:[3103274,3894065,4618807,3366701];for(let e=0;e<m.count;e++){let t=m.getX(e),a=m.getY(e),o=m.getZ(e),s=1+(g()-.5)*.025+Math.sin(t*11)*Math.cos(o*9)*.015;m.setXYZ(e,t*l*s,a*u*s*(1-.18*Math.abs(t)),o*d*s);let c=v[g()*v.length|0];n&&g()<.12+a*.3&&(c=g()<.5?14674162:13228006),!n&&a>.86&&(c=5603402),_.set(yp(c,r,i)),h.set([_.r,_.g,_.b],e*3)}p.setAttribute(`color`,new xr(h,3)),p.computeVertexNormals();let y=new V(p,new W({vertexColors:!0,flatShading:!0,fog:!1}));y.position.set(0,f,0),c.add(y);let b=[`B`,`R`,`A`,`Ș`,`O`,`V`],x=7.2*a*s,S=new R;return b.forEach((e,t)=>{let n=(t-(b.length-1)/2)*x*1.12+l*.06,o=n/l,s=.68,p=Math.sqrt(Math.max(.02,1-o*o-s*s)),m=new R(n,f+s*u*(1-.18*Math.abs(o)),p*d);S.set(o/l,s/u,p/d).normalize(),m.addScaledVector(S,1.6*a);let h=new V(new So(x,x*1.25),new pi({map:Tp(e),transparent:!0,fog:!1,color:yp(16777215,r,i*.4),depthWrite:!1}));h.position.copy(m),h.lookAt(m.clone().add(S.clone().setY(S.y*.35).normalize())),h.renderOrder=2,c.add(h);let g=new V(new H(.4*a,x*.5,.4*a),new pi({color:yp(7107712,r,i),fog:!1}));g.position.copy(m).add(new R(0,-x*.75,-.8*a)),c.add(g)}),c.position.set(e,0,t),c}function Dp({z:e,n:t,h:n,rad:r,seed:i,color:a,cap:o=null,haze:s,hazeK:c=.45,keepOpen:l=0,spread:u=460}){let d=hp(i),f=[];for(let i=0;i<t;i++){let p=-u/2+i/Math.max(1,t-1)*u+(d()-.5)*30;if(Math.abs(p)<l)continue;let m=n[0]+d()*(n[1]-n[0]),h=r[0]+d()*(r[1]-r[0]),g=5+Math.floor(d()*3),_=new ea(h,m,g);if(_.rotateY(d()*fp),_.translate(p,m/2-3,e+(d()-.5)*16),f.push(dp(_,yp(a,s,c))),o!==null){let t=m*(.3+d()*.12),n=new ea(t/m*h*1.04,t,g);n.rotateY(d()*fp),n.translate(p,m-t/2-3+.2,e+(d()-.5)*2),f.push(dp(n,yp(o,s,c*.6)))}}return new V(_p(f),new W({vertexColors:!0,flatShading:!0,fog:!1}))}var Op=14412278;function kp(e){return gp(128,256,(e,t,n)=>{e.fillStyle=`#eef4fb`,e.fillRect(0,0,t,n);for(let r=0;r<t;r+=8)e.fillStyle=`rgba(160,186,214,0.30)`,e.fillRect(r,0,2,n),e.fillStyle=`rgba(255,255,255,0.65)`,e.fillRect(r+3,0,2,n);let r=hp(7);for(let i=0;i<900;i++)e.fillStyle=r()<.5?`rgba(150,175,205,0.16)`:`rgba(255,255,255,0.5)`,e.fillRect(r()*t,r()*n,1+r()*3,1+r()*5);for(let i=0;i<40;i++)e.fillStyle=`#fff`,e.fillRect(r()*t,r()*n,1,1)},3,10,e)}function Ap(e){return gp(256,256,(e,t,n)=>{e.fillStyle=`#f2f7fd`,e.fillRect(0,0,t,n);let r=hp(11);for(let i=0;i<160;i++){let i=r()*t,a=r()*n,o=6+r()*26,s=e.createRadialGradient(i,a,0,i,a,o);s.addColorStop(0,r()<.55?`rgba(170,196,226,0.22)`:`rgba(255,255,255,0.6)`),s.addColorStop(1,`rgba(255,255,255,0)`),e.fillStyle=s,e.fillRect(i-o,a-o,o*2,o*2)}for(let i=0;i<120;i++)e.fillStyle=`#fff`,e.fillRect(r()*t,r()*n,1,1)},12,7,e)}function jp(){let e=[X(new U(.2,.3,1.3,6),7029795,0,.65,0)];for(let t of[{r:1.9,h:2.1,y:1.1},{r:1.5,h:1.9,y:2.4},{r:1.1,h:1.8,y:3.6}])e.push(X(new ea(t.r,t.h,7),up.pine,0,t.y+t.h/2,0)),e.push(X(new ea(t.r*.62,t.h*.5,7),up.snow,0,t.y+t.h*.74,0));return _p(e)}function Mp(){let e=[X(new U(.16,.24,1,6),5913119,0,.5,0)];for(let t=0;t<5;t++){let n=t/4,r=1.35-n*.95,i=1.5-n*.35,a=.8+t*1.05;e.push(X(new ea(r,i,6),1791297,0,a+i/2,0)),e.push(X(new ea(r*.7,i*.42,6),up.snow,0,a+i*.78,0))}return _p(e)}function Np(){let e=new bo(.7,0);e.scale(1.2,.75,1);let t=new bo(.62,0);return t.scale(1.15,.45,.95),_p([X(e,8161952,0,.3,0),X(t,up.snow,0,.62,0)])}function Pp(){return _p([X(new U(.06,.07,1.5,6),15887133,0,.75,0),X(new U(.065,.065,.32,6),1844019,0,1.36,0),X(new wo(.09,6,4),up.snow,0,1.55,0)])}function Fp(){let e=new z,t=new W({map:gp(128,128,(e,t,n)=>{e.fillStyle=`#6e4325`,e.fillRect(0,0,t,n);for(let r=0;r<n;r+=16)e.fillStyle=`#86542f`,e.fillRect(0,r+2,t,10),e.fillStyle=`rgba(0,0,0,0.25)`,e.fillRect(0,r+13,t,3)})}),n=Y(new H(6,3.4,7),t,0,2.3,0);e.add(n),e.add(Y(new H(6.4,.6,7.4),q(7304320),0,.3,0));let r=new Ma;r.moveTo(-3.7,0),r.lineTo(0,3.4),r.lineTo(3.7,0),r.lineTo(-3.7,0);let i=new _o(r,{depth:8.2,bevelEnabled:!1});i.translate(0,0,-8.2/2),e.add(Y(i,q(4860953),0,4,0));let a=new _o(r,{depth:8.3,bevelEnabled:!1});a.translate(0,0,-8.3/2);let o=Y(a,q(up.snow),0,4.25,0);o.scale.set(1.02,.96,1),e.add(o);let s=new pi({color:16765562}),c=q(15918800);for(let t of[-2,2])e.add(Y(new H(.12,1.3,1.3),c,-3.02,2.4,t)),e.add(Y(new H(.14,1.05,1.05),s,-3.04,2.4,t));e.add(Y(new H(.14,2.1,1.2),q(4006932),-3.03,1.65,0)),e.add(Y(new H(1.6,.15,6),q(4860953),-3.8,3.3,0)),e.add(Y(new H(1.7,.2,6.2),q(up.snow),-3.8,3.45,0));for(let t of[-2.8,2.8])e.add(Y(new H(.2,2.7,.2),q(5913119),-4.45,1.95,t));e.add(Y(new H(.8,2.2,.8),q(7830404),1,6.8,-1.8)),e.add(Y(new H(.95,.25,.95),q(up.snow),1,7.9,-1.8));let l=new W({color:15265267,transparent:!0,opacity:.7,depthWrite:!1}),u=[];for(let t=0;t<5;t++){let t=Y(new bo(.55,1),l,1,8.4,-1.8);e.add(t),u.push(t)}e.userData.puffs=u;for(let t=0;t<3;t++){let n=Y(new U(.22,.22,2.4,7).rotateX(Math.PI/2),q(9067059),-3.4,.85+t*.4,-7/2-1.6);n.position.x+=t%2*.25,e.add(n)}return e.traverse(e=>e.castShadow=!0),e}function Ip(e){let t=new z,n=gp(512,256,(e,t,n)=>{e.fillStyle=`#e9e4da`,e.fillRect(0,0,t,n);for(let n=0;n<5;n++){let r=22+n*44;e.fillStyle=`#3d6f9e`,e.fillRect(14,r,t-28,24),e.fillStyle=`rgba(255,255,255,0.35)`;for(let n=14;n<t-14;n+=34)e.fillRect(n,r,3,24);e.fillStyle=`#cfc8bb`,e.fillRect(0,r+28,t,6)}e.fillStyle=`#2a4f78`,e.fillRect(t/2-40,n-40,80,40)}),i=new W({color:yp(14472907,e,.3),fog:!1}),a=new W({map:n,color:yp(16777215,e,.3),fog:!1}),o=new V(new H(34,17,12),[i,i,i,i,a,i]);o.position.y=8.5,t.add(o),t.add(Y(new H(34.4,.7,12.4),new W({color:16054525,fog:!1}),0,17.3,0));let s=gp(512,128,(e,t,n)=>{e.font=`900 104px "Arial Black", Arial, sans-serif`,e.textAlign=`center`,e.fillStyle=`#0d3b7a`,e.fillText(`UNITBV`,t/2,102)});s.wrapS=s.wrapT=r;let c=new V(new So(20,5),new pi({map:s,transparent:!0,fog:!1}));c.position.set(0,20.4,5.8),t.add(c),t.add(Y(new H(20,.4,.4),new pi({color:5595246,fog:!1}),0,17.9,5.8));let l=new V(new H(14,9,10),[i,i,i,i,a,i]);return l.position.set(22,4.5,2),t.add(l),t.add(Y(new H(14.4,.6,10.4),new W({color:16054525,fog:!1}),22,9.2,2)),t}var Lp=class extends bp{constructor(e){super(e),this.env={fog:Op,fogNear:this.mobile?34:46,fogFar:this.mobile?120:155,sky:{top:3107e3,mid:8830442,hor:Op,sun:{dir:[-.5,.34,-1],color:16774108,size:.04,halo:.75},clouds:{cover:.52,lit:16777215,shade:11848162}},hemi:{sky:13820927,ground:9085135,intensity:1.6},sun:{color:16773337,intensity:1.85},exposure:1.05,marks:{color:11126500,opacity:.75},weather:`snow`,confetti:[16777215,13625599,10474495,16769658]},this.ground(rp(new W({map:Ap(this.aniso)})),rp(new W({map:kp(this.aniso)}),{strength:1.2})),this._edges(),this._trees(),this._hills(),this._backdrop()}_edges(){let e=hp(41),t=[];for(let n of[-1,1])for(let r=0;r<26;r++)t.push({o:r/26*240+e()*4,x:n*(pp+1.4+e()*.5),y:-.1,sx:1.5+e()*.6,sy:.2+e()*.2,sz:4.5+e()*3.5,rot:(e()-.5)*.25});this.recycler(new bo(1,2),new W({color:16054525,flatShading:!0}),t,240,30,{receive:!0});let n=[];for(let e of[-1,1])for(let t=0;t<18;t++)n.push({o:t*12+(e>0?6:0),x:e*(pp+1.6)});this.recycler(Pp(),vp(),n,216,14,{cast:!0});let r=[];for(let t=0;t<26;t++){let n=t%2?1:-1;r.push({o:t/26*200+e()*5,x:n*(pp+2.6+e()*4),s:.6+e()*.9,rot:e()*fp,tint:.9+e()*.15})}this.recycler(Np(),vp(),r,200,16,{cast:!0,receive:!0,tint:!0})}_trees(){let e=this.mobile?40:60,t=hp(51),n=[],r=[];for(let i=0;i<e;i++){let a=i%2==0?-1:1,o=t()<.35,s={o:i/e*230+t()*3,x:a*(o?7.6+t()*2.5:10.5+t()*10),s:.8+t()*.7,rot:t()*fp,tint:.82+t()*.3},c=t();a>0&&Math.abs(s.o-120)<11&&s.x>9||(c<.55?n:r).push(s)}let i=vp();this.treeRecyclers=[this.recycler(jp(),i,n,230,18,{cast:!0,tint:!0}),this.recycler(Mp(),i,r,230,18,{cast:!0,tint:!0})],this.cabin=this.single(Fp(),120,230,18,15.5,0)}_hills(){let e=hp(61),t=[];for(let n=0;n<12;n++){let r=n%2==0?-1:1,i=4+e()*4;t.push({o:n/12*180,x:r*(30+e()*12),sx:11+e()*8,sy:i,sz:14+e()*10,y:-i*.35})}this.recycler(new wo(1,12,7),q(15660283),t,180,40)}_backdrop(){let e=this.backdrop;e.add(Dp({z:-215,n:9,h:[55,85],rad:[55,85],seed:21,color:13031660,cap:16251903,haze:Op,hazeK:.35})),e.add(Dp({z:-185,n:8,h:[38,62],rad:[40,62],seed:22,color:10928091,cap:16054783,haze:Op,hazeK:.3,keepOpen:40})),e.add(Ep({x:34,z:-160,winter:!0,haze:Op,hazeK:.16,scale:.9}));let t=Ip(Op);t.position.set(-44,0,-150),t.rotation.y=.35,e.add(t);let n=hp(31),r=[];for(let e=0;e<80;e++){let e=(n()-.5)*320;if(Math.abs(e)<16)continue;let t=5+n()*6,i=new ea(t*.3,t,5);i.translate(e,t/2-1,-142-n()*12),r.push(X(i,yp(n()<.5?3103574:4025192,Op,.35)))}e.add(new V(_p(r),new W({vertexColors:!0,flatShading:!0,fog:!1})))}animate(e,t,n){let r=this.cabin.userData.puffs;for(let e=0;e<r.length;e++){let t=(n*.35+e/r.length)%1,i=r[e];i.position.set(1+t*1.5,8.6+t*4.5,-1.8-t*.8),i.scale.setScalar(.6+t*1.6)}}},Rp=15784381,zp=pp+4.4,Bp=10,Vp=9,Hp=[{base:`#e8c36a`,trim:`#fbf3e0`,shutter:`#5d7f4a`,storeys:3},{base:`#efa59a`,trim:`#fff4ec`,shutter:null,storeys:2},{base:`#a9d3b8`,trim:`#f6fbf4`,shutter:`#6a4a2e`,storeys:3},{base:`#9fc3e3`,trim:`#f4f8fc`,shutter:null,storeys:2},{base:`#f2e2c4`,trim:`#ffffff`,shutter:`#7a3b2e`,storeys:3},{base:`#d98d6c`,trim:`#fbeee2`,shutter:null,storeys:2},{base:`#d6c3e2`,trim:`#fbf7ff`,shutter:`#4f6a7a`,storeys:2}],Up=3.8,Wp=3.1,Gp=e=>Up+e.storeys*Wp+.6;function Kp(e,t){let n=Gp(e),r=256/Bp,i=Math.round(n*r);return gp(256,i,n=>{let a=hp(t),o=e=>i-e*r;n.fillStyle=e.base,n.fillRect(0,0,256,i);for(let e=0;e<500;e++)n.fillStyle=a()<.5?`rgba(255,255,255,0.06)`:`rgba(0,0,0,0.05)`,n.fillRect(a()*256,a()*i,2+a()*6,2+a()*6);n.fillStyle=`rgba(255,255,255,0.28)`,n.fillRect(0,0,.45*r,i),n.fillRect(256-.45*r,0,.45*r,i),n.fillStyle=`#8f8a82`,n.fillRect(0,o(.55),256,.55*r),n.fillStyle=`rgba(0,0,0,0.08)`,n.fillRect(0,o(Up),256,3.25*r);for(let t=0;t<3;t++){let i=(1.9+t*3.1)*r,a=2.1*r,s=o(3.3),c=o(.55);n.fillStyle=e.trim,n.beginPath(),n.moveTo(i-a/2-5,c),n.lineTo(i-a/2-5,s+a/2),n.arc(i,s+a/2,31.880000000000003,Math.PI,0),n.lineTo(i+a/2+5,c),n.fill();let l=t===1;if(n.fillStyle=l?`#5a3a22`:`#2b3a48`,n.beginPath(),n.moveTo(i-a/2,c),n.lineTo(i-a/2,s+a/2),n.arc(i,s+a/2,a/2,Math.PI,0),n.lineTo(i+a/2,c),n.fill(),l)n.fillStyle=`rgba(0,0,0,0.25)`,n.fillRect(i-1,s+a/2,2,c-s-a/2);else{let e=n.createLinearGradient(0,s,0,c);e.addColorStop(0,`rgba(255,214,140,0.55)`),e.addColorStop(1,`rgba(255,190,110,0.15)`),n.fillStyle=e,n.fillRect(i-a/2+3,s+a/2,47.760000000000005,c-s-a/2),n.fillStyle=`rgba(255,255,255,0.7)`,n.fillRect(i-1,s+6,2,c-s-6)}}n.fillStyle=e.trim,n.fillRect(0,o(3.8499999999999996),256,.3*r);for(let t=0;t<e.storeys;t++){let i=Up+t*Wp;for(let s=0;s<4;s++){let c=(1.5+s*2.33)*r,l=1.05*r,u=1.7*r,d=o(i+.75+1.7);n.fillStyle=e.trim,n.fillRect(c-l/2-4,d-4,34.88,51.52),t===0?(n.beginPath(),n.moveTo(c-l/2-8,d-6),n.lineTo(c,d-6-.45*r),n.lineTo(c+l/2+8,d-6),n.fill()):n.fillRect(c-l/2-7,d-10,40.88,5),n.fillRect(c-l/2-7,d+u+2,40.88,6);let f=n.createLinearGradient(0,d,0,d+u);if(f.addColorStop(0,`#5c7f9e`),f.addColorStop(1,`#2c4256`),n.fillStyle=f,n.fillRect(c-l/2,d,l,u),n.fillStyle=e.trim,n.fillRect(c-1.5,d,3,u),n.fillRect(c-l/2,d+u*.38,l,3),e.shutter){n.fillStyle=e.shutter,n.fillRect(c-l/2-.42*r-4,d,.42*r,u),n.fillRect(c+l/2+4,d,.42*r,u),n.fillStyle=`rgba(0,0,0,0.2)`;for(let e=4;e<u;e+=5)n.fillRect(c-l/2-.42*r-4,d+e,.42*r,1),n.fillRect(c+l/2+4,d+e,.42*r,1)}if(t===0&&a()<.5){n.fillStyle=`#7a4a2a`,n.fillRect(c-l/2-2,d+u+6,30.880000000000003,6);for(let e=0;e<6;e++)n.fillStyle=a()<.5?`#e63946`:`#ff8fab`,n.beginPath(),n.arc(c-l/2+2+l/5.5*e,d+u+5,3,0,Math.PI*2),n.fill()}}n.fillStyle=`rgba(255,255,255,0.35)`,n.fillRect(0,o(i+Wp),256,4)}if(t%2==0){let e=o(4.55);n.fillStyle=`#1f2228`,n.fillRect(2.6*r,e-2,5*r,3);for(let t=2.6*r;t<7.6*r;t+=5)n.fillRect(t,e-.9*r,1.5,.9*r);n.fillRect(2.6*r,e-.9*r,5*r,2)}n.fillStyle=e.trim,n.fillRect(0,0,256,.6*r),n.fillStyle=`rgba(0,0,0,0.15)`,n.fillRect(0,.6*r,256,3)})}function qp(){return gp(128,128,(e,t,n)=>{e.fillStyle=`#9c4a2c`,e.fillRect(0,0,t,n);let r=hp(5);for(let i=0;i<n;i+=10){for(let n=i/10%2?-8:0;n<t;n+=16)e.fillStyle=[`#a8532f`,`#8f4126`,`#b45f37`,`#9a4a2b`][r()*4|0],e.beginPath(),e.ellipse(n+8,i+6,8,6,0,0,Math.PI),e.fill();e.fillStyle=`rgba(0,0,0,0.18)`,e.fillRect(0,i+9,t,1)}},4,3)}function Jp(){let e=new Ma;e.moveTo(-4.85,0),e.lineTo(0,6.4),e.lineTo(4.85,0),e.lineTo(-4.85,0);let t=new _o(e,{depth:10.02,bevelEnabled:!1});return t.translate(0,0,-5),t}function Yp(){let e=[],t=Math.atan2(6.4,4.85);for(let[n,r]of[[1.9,[-3,0,3]],[3.7,[-1.6,1.6]]]){let i=4.85*(1-n/6.4);for(let a of r){let r=new U(.42,.42,1.3,8,1,!1,0,Math.PI);r.rotateX(Math.PI/2),r.rotateZ(-Math.PI/2+t),e.push(X(r,9388326,i+.05,n,a));let o=new H(.06,.14,.8);o.rotateZ(t-Math.PI/2+Math.PI/2),e.push(X(o,1774608,i+.3,n+.12,a))}}return e.push(X(new H(.6,1.6,.6),14208960,-1.2,5.2,2.6)),_p(e)}function Xp(){let e=[];e.push(X(new H(1,.06,1),3877664,0,.75,0)),e.push(X(new U(.05,.08,.75,6),2829099,0,.37,0));for(let[t,n]of[[-.75,0],[.75,0],[0,-.75],[0,.75]])e.push(X(new H(.45,.06,.45),4864556,t,.45,n)),e.push(X(new H(.45,.5,.06),4864556,t+(t?Math.sign(t)*.2:0),.7,n+(n?Math.sign(n)*.2:0)));e.push(X(new U(.05,.05,2.4,6),15658734,0,1.2,0));let t=new ea(1.9,.7,4);return t.rotateY(Math.PI/4),e.push(X(t,15985366,0,2.55,0)),e.push(X(new H(2.7,.18,2.7),15326400,0,2.2,0)),_p(e)}function Zp(){return _p([X(new U(.45,.35,.7,8),8088410,0,.35,0),X(new bo(.55,1),4160048,0,.95,0),X(new bo(.22,0),15087942,.25,1.2,.2),X(new bo(.2,0),16758531,-.25,1.15,-.1)])}function Qp(e,t=!1){return gp(256,256,(e,n,r)=>{let i=hp(t?17:13);e.fillStyle=`#6f6a63`,e.fillRect(0,0,n,r);let a=t?[`#c9c3b8`,`#bdb6aa`,`#d4cec4`,`#b2ab9f`]:[`#a39d92`,`#9a9387`,`#aea89d`,`#918b80`];for(let t=0;t<r;t+=32){let r=t/32%2?-24:0;for(;r<n;){let n=40+(i()*3|0)*12;e.fillStyle=a[i()*a.length|0],e.fillRect(r+1,t+1,n-2,30),e.fillStyle=`rgba(255,255,255,0.06)`,e.fillRect(r+1,t+1,n-2,4),r+=n}}for(let t=0;t<1400;t++)e.fillStyle=i()<.5?`rgba(0,0,0,0.07)`:`rgba(255,255,255,0.07)`,e.fillRect(i()*n,i()*r,1+i()*2,1+i()*2)},t?3:18,7,e)}function $p(){let e=new z,t=new W({color:yp(5985100,Rp,.35),fog:!1,flatShading:!0}),n=new W({color:yp(7224106,Rp,.35),fog:!1,flatShading:!0}),r=new V(new H(24,22,70),t);r.position.set(0,11,0),e.add(r);let i=new Ma;i.moveTo(-12.5,0),i.lineTo(0,22),i.lineTo(12.5,0),i.lineTo(-12.5,0);let a=new _o(i,{depth:70,bevelEnabled:!1});a.translate(0,22,-35),e.add(new V(a,n));let o=new V(new H(13,50,13),t);o.position.set(0,25,40),e.add(o);let s=new V(new ea(5,14,4),n);s.rotation.y=Math.PI/4,s.position.set(0,57,40),e.add(s);let c=new pi({color:yp(2762274,Rp,.3),fog:!1});for(let t=0;t<6;t++){let n=new V(new H(.4,11,3),c);n.position.set(12.2,10,-28+t*10),e.add(n)}return e}var em=class extends bp{constructor(e){super(e),this.env={fog:Rp,fogNear:this.mobile?50:70,fogFar:this.mobile?170:230,sky:{top:3828916,mid:14072226,hor:Rp,sun:{dir:[-.55,.2,-1],color:16761980,size:.05,halo:1.2},clouds:{cover:.36,lit:16770760,shade:11833238}},hemi:{sky:16772827,ground:10127996,intensity:1.32},sun:{color:16765596,intensity:2.25,offset:[-15,16,3]},exposure:1.02,marks:{color:8222573,opacity:.55},weather:`none`,confetti:[15087942,16758531,16777215,11129784,15705498]},this.ground(ap(new W({map:Qp(this.aniso)}),{scale:.16,amount:.12,warm:.12}),ap(new W({map:Qp(this.aniso,!0)}),{scale:.22,amount:.1,warm:.1})),this._houses(),this._street(),this._backdrop()}_houses(){let e=280/Bp,t=qp(),n=hp(91),r=Hp.map(()=>[]),i=[],a=[];for(let t of[-1,1])for(let o=0;o<e;o++){let e=(o*3+(t>0?2:0)+(n()*2|0))%Hp.length,s=Hp[e],c={o:o*Bp+(t>0?4:0),x:t*(zp+Vp/2),y:0,rot:t<0?0:Math.PI};r[e].push(c);let l=.85+n()*.25;i.push({...c,y:Gp(s),tint:l}),a.push({...c,y:Gp(s),tint:l})}Hp.forEach((e,t)=>{let n=Gp(e),i=new H(Vp,n,Bp).translate(0,n/2,0),a=new W({color:e.base}),o=new W({map:Kp(e,t+1)});this.recycler(i,[o,a,a,a,a,a],r[t],280,30,{cast:!0,receive:!0})}),this.recycler(Jp(),new W({map:t,flatShading:!0}),i,280,30,{cast:!0,tint:!0}),this.recycler(Yp(),vp(),a,280,30,{tint:!0})}_street(){let e=hp(92),t=[],n=[],r=[];for(let i of[-1,1])for(let a=0;a<20;a++){let o=a*12+(i>0?5:0);e()<.75&&t.push({o,x:i*(pp+2.2),rot:e()*.2}),a%2==0?n.push({o:o+6,x:i*(pp+.55)}):r.push({o:o+6,x:i*(pp+.6),s:.9+e()*.3})}this.recycler(Xp(),vp(),t,240,20,{cast:!0}),this.recycler(Sp(),vp(),n,240,20,{cast:!0}),this.recycler(Zp(),vp(),r,240,20,{cast:!0});let i=[];for(let t=0;t<8;t++)i.push({o:t*30+13,x:(t%2?1:-1)*(pp+3.6),s:.8+e()*.2,rot:e()*6});this.treeRecyclers=[this.recycler(xp(),vp(),i,240,20,{cast:!0})];let a=[];for(let e=0;e<10;e++)a.push({o:e*24+9,x:(e%2?1:-1)*(pp+3.9),rot:e%2?Math.PI:0});this.recycler(Cp(),vp(),a,240,20,{cast:!0})}_backdrop(){let e=this.backdrop;e.add(Dp({z:-260,n:8,h:[60,90],rad:[55,80],seed:33,color:7180198,cap:null,haze:Rp,hazeK:.55})),e.add(Ep({x:2,z:-215,haze:Rp,hazeK:.36,scale:1.25,tall:1.5,letters:.85}));let t=$p();t.position.set(-30,0,-185),t.rotation.y=.25,e.add(t)}},tm=15391942,nm=26,rm=14,im=pp+9,am=[{wall:`#f4f4f1`,frame:`#4b4f55`,panel:`#c07a45`,floors:9},{wall:`#d9dcdf`,frame:`#33373d`,panel:`#e9e4d8`,floors:8},{wall:`#efe6d6`,frame:`#5a5048`,panel:`#b5543a`,floors:9}],om=3.05,sm=4.6,cm=e=>sm+(e.floors-1)*om+1;function lm(e,t){let n=cm(e),r=512/nm,i=Math.round(n*r);return gp(512,i,n=>{let a=hp(t),o=e=>i-e*r;n.fillStyle=e.wall,n.fillRect(0,0,512,i),n.fillStyle=`#3a4048`,n.fillRect(0,o(sm),512,sm*r);for(let e=.6;e<25;e+=3.2){let t=n.createLinearGradient(0,o(3.5999999999999996),0,o(0));t.addColorStop(0,`#9ab7c9`),t.addColorStop(1,`#e6d2b0`),n.fillStyle=t,n.fillRect(e*r,o(3.4999999999999996),2.8*r,3.3*r),a()<.6&&(n.fillStyle=[`#e63946`,`#2a9d8f`,`#f4a261`,`#264653`,`#ffffff`][a()*5|0],n.fillRect(e*r+6,o(4.35),2.8*r-12,.5*r))}for(let t=1;t<e.floors;t++){let i=sm+(t-1)*om;for(let a=.5,s=0;a<25;a+=3.15,s++){let c=(s+t)%3!=0;n.fillStyle=e.frame,n.fillRect(a*r,o(i+2.6),2.5*r,2.2*r);let l=n.createLinearGradient(0,o(i+2.6),0,o(i+.4));l.addColorStop(0,`#9fc0d8`),l.addColorStop(1,`#4f6f88`),n.fillStyle=l,n.fillRect(a*r+3,o(i+2.55),2.5*r-6,2.1*r),c&&(n.fillStyle=(s+t*2)%4==0?e.panel:`rgba(220,235,245,0.55)`,n.fillRect(a*r-4,o(i+1.1),57.23076923076923,1.1*r),n.fillStyle=`rgba(0,0,0,0.25)`,n.fillRect(a*r-4,o(i+1.1),57.23076923076923,2))}n.fillStyle=`rgba(0,0,0,0.08)`,n.fillRect(0,o(i),512,3)}n.fillStyle=e.panel,n.fillRect(317.44,0,.9*r,o(sm)),n.fillStyle=e.frame,n.fillRect(0,0,512,.6*r)})}function um(e){return gp(256,256,(e,t,n)=>{let r=hp(21);e.fillStyle=`#b8b3aa`,e.fillRect(0,0,t,n);for(let i=0;i<n;i+=32)for(let n=0;n<t;n+=64)e.fillStyle=[`#d8d4cc`,`#cfcac1`,`#dedad3`,`#c9c4bb`][r()*4|0],e.fillRect(n+1,i+1,62,30);e.fillStyle=`#8d8a85`,e.fillRect(0,96,t,8),e.fillRect(0,224,t,8);for(let i=0;i<900;i++)e.fillStyle=r()<.5?`rgba(0,0,0,0.05)`:`rgba(255,255,255,0.08)`,e.fillRect(r()*t,r()*n,1+r()*2,1+r()*2)},16,8,e)}function dm(e){return gp(128,128,(e,t,n)=>{let r=hp(23);e.fillStyle=`#6aa04a`,e.fillRect(0,0,t,n);for(let i=0;i<1600;i++)e.fillStyle=[`#5e9441`,`#78ad55`,`#64993f`,`#86b864`][r()*4|0],e.fillRect(r()*t,r()*n,1,2+r()*3)},8,8,e)}function fm(){return _p([X(new U(.09,.12,6,8),5988456,0,3,0),X(new H(1.4,.12,.3),5988456,.55,6,0),X(new H(.9,.06,.24),16774096,.75,5.92,0)])}function pm(){let e=new z,t=new W({color:yp(10177075,tm,.32),fog:!1,flatShading:!0}),n=new W({color:yp(6251627,tm,.32),fog:!1,flatShading:!0}),r=new W({color:yp(11126744,tm,.32),fog:!1,flatShading:!0}),i=new V(new H(60,14,34),t);i.position.y=7,e.add(i);for(let t=0;t<6;t++){let i=new Ma;i.moveTo(0,0),i.lineTo(10,0),i.lineTo(10,5),i.lineTo(0,0);let a=new _o(i,{depth:34,bevelEnabled:!1});a.translate(-30+t*10,14,-17),e.add(new V(a,n));let o=new V(new H(.3,4.6,34),r);o.position.set(-20.1+t*10,16.4,0),e.add(o)}let a=new V(new U(1.6,2.6,52,12),t);a.position.set(36,26,0),e.add(a);let o=new V(new U(1.9,1.9,1.2,12),n);return o.position.set(36,50,0),e.add(o),e}var mm=class extends bp{constructor(e){super(e),this.env={fog:tm,fogNear:this.mobile?50:70,fogFar:this.mobile?175:235,sky:{top:3699647,mid:11848156,hor:tm,sun:{dir:[.55,.26,-1],color:16767912,size:.045,halo:.95},clouds:{cover:.42,lit:16773598,shade:11451600}},hemi:{sky:16183782,ground:9673087,intensity:1.4},sun:{color:16769724,intensity:2.1,offset:[13,18,6]},exposure:1.02,marks:{color:16777215,opacity:.55},weather:`none`,confetti:[12614213,2792847,16777215,16032353,15087942]},this.ground(ap(new W({map:dm(this.aniso)}),{scale:.09,amount:.16,warm:.2}),ap(new W({map:um(this.aniso)}),{scale:.2,amount:.1,warm:.1}),{trackHalf:pp+6.5}),this._promenade(),this._blocks(),this._backdrop()}_blocks(){let e=hp(71),t=am.map(()=>[]);for(let n of[-1,1])for(let r=0;r<8;r++)t[(r+ +(n>0))%am.length].push({o:r*38+(n>0?17:0)+e()*2,x:n*(im+rm/2),rot:n<0?0:Math.PI});am.forEach((e,n)=>{let r=cm(e),i=new H(rm,r,nm).translate(0,r/2,0),a=new W({color:e.wall}),o=new W({map:lm(e,n+3)}),s=new W({color:9211796});this.recycler(i,[o,a,s,a,o,o],t[n],304,40,{cast:!0,receive:!0})})}_promenade(){let e=hp(72),t=new V(new So(2,300).rotateX(-Math.PI/2),new W({color:11027514}));t.position.set(pp+3.6,.03,-130),t.receiveShadow=!0,this.group.add(t);let n=[],r=[],i=[],a=[];for(let t of[-1,1])for(let o=0;o<14;o++){let s=o*18+(t>0?9:0),c=t*(pp+(t>0?1.4:2.4));n.push({o:s,x:c,s:.7+e()*.25,rot:e()*6}),a.push({o:s,x:c}),r.push({o:s+9,x:t*(pp+.9),rot:t<0?0:Math.PI}),o%2==0&&i.push({o:s+4.5,x:t*(pp+5.5),rot:t<0?0:Math.PI})}this.treeRecyclers=[this.recycler(xp(7319114,6003260),vp(),n,252,20,{cast:!0})],this.recycler(new H(1.5,.06,1.5),new W({color:4145992}),a,252,20),this.recycler(fm(),vp(),r,252,20,{cast:!0}),this.recycler(Cp(12158290,7041144),vp(),i,252,20,{cast:!0});let o=[];for(let e of[-1,1])for(let t=0;t<12;t++)o.push({o:t*21+6,x:e*(pp+7.2),sx:1,sy:1,sz:1});let s=new H(1.2,.9,12).translate(0,.45,0);this.recycler(s,new W({color:4161338,flatShading:!0}),o,252,20,{cast:!0})}_backdrop(){let e=this.backdrop;e.add(Dp({z:-290,n:7,h:[80,110],rad:[60,90],seed:44,color:5666922,cap:null,haze:tm,hazeK:.55,spread:520})),e.add(Ep({x:-6,z:-235,haze:tm,hazeK:.4,scale:1.4,tall:1.22,letters:.9}));let t=pm();t.position.set(62,0,-175),e.add(t)}},hm=15788252,gm=5.6,_m=12,vm=17.599999999999998,ym=`Arial, Helvetica, sans-serif`,bm=`Georgia, "Times New Roman", serif`,xm=[{name:`ZARA`,theme:`fashion`,bg:`#111111`,sign:`#ffffff`,glow:`#fff4e6`,font:bm},{name:`DEICHMANN`,theme:`shoes`,bg:`#d7262e`,sign:`#ffffff`,glow:`#fff1ea`},{name:`SEPHORA`,theme:`beauty`,bg:`#0b0b0b`,sign:`#ffffff`,glow:`#fff0f3`},{name:`JD SPORTS`,theme:`sport`,bg:`#101010`,sign:`#ffd200`,glow:`#eef3ff`},{name:`ALTEX`,theme:`tech`,bg:`#e30613`,sign:`#ffffff`,glow:`#e9f4ff`},{name:`NORIEL`,theme:`toys`,bg:`#f7c600`,sign:`#d4145a`,glow:`#fff9e0`},{name:`STARBUCKS`,theme:`coffee`,bg:`#00704a`,sign:`#ffffff`,glow:`#ffe9c7`},{name:`TEILOR`,theme:`jewelry`,bg:`#1e2b3a`,sign:`#e8c76a`,glow:`#fff6dc`,font:bm},{name:`MANGO`,theme:`fashion`,bg:`#2a2a2a`,sign:`#f2e8da`,glow:`#fff1df`,font:bm},{name:`SKECHERS`,theme:`shoes`,bg:`#1f3b8f`,sign:`#ffffff`,glow:`#eef4ff`},{name:`YVES ROCHER`,theme:`beauty`,bg:`#2e6b34`,sign:`#ffffff`,glow:`#f2fbe9`},{name:`INTERSPORT`,theme:`sport`,bg:`#003a8c`,sign:`#ffffff`,glow:`#eaf2ff`},{name:`ZARA HOME`,theme:`home`,bg:`#3b3a36`,sign:`#f4efe6`,glow:`#fff3e2`,font:bm},{name:`INTIMISSIMI`,theme:`lingerie`,bg:`#f3d9df`,sign:`#7a2a3d`,glow:`#fff3f6`,font:bm},{name:`BERSHKA`,theme:`fashion`,bg:`#ffffff`,sign:`#111111`,glow:`#f1f1f1`},{name:`CARREFOUR`,theme:`market`,bg:`#0e4ea3`,sign:`#ffffff`,glow:`#eef6ff`},{name:`LEVI’S`,theme:`denim`,bg:`#c8102e`,sign:`#ffffff`,glow:`#eef2f8`},{name:`NIKE`,theme:`sport`,bg:`#f26b21`,sign:`#ffffff`,glow:`#fff3ea`},{name:`ECCO`,theme:`shoes`,bg:`#4a3a2c`,sign:`#f3e6d3`,glow:`#fff4e6`},{name:`MAC`,theme:`beauty`,bg:`#1a1a1a`,sign:`#ffffff`,glow:`#fbeef0`},{name:`CALZEDONIA`,theme:`lingerie`,bg:`#fdfdfd`,sign:`#1f2a44`,glow:`#fff4f6`},{name:`THE NORTH FACE`,theme:`outdoor`,bg:`#1b1b1b`,sign:`#ffffff`,glow:`#eef4f1`},{name:`TOMMY HILFIGER`,theme:`fashion`,bg:`#0c2340`,sign:`#ffffff`,glow:`#f2f5fb`},{name:`VODAFONE`,theme:`tech`,bg:`#e60000`,sign:`#ffffff`,glow:`#fff2f2`}],Sm=[`#c0392b`,`#2c3e50`,`#16a085`,`#8e44ad`,`#f39c12`,`#7f8c8d`,`#e9c46a`,`#264653`,`#e76f51`,`#f4f1ea`],Cm=(e,t=Sm)=>t[e()*t.length|0];function wm(e,t,n,r,i,a){e.beginPath(),e.moveTo(t+a,n),e.arcTo(t+r,n,t+r,n+i,a),e.arcTo(t+r,n+i,t,n+i,a),e.arcTo(t,n+i,t,n,a),e.arcTo(t,n,t+r,n,a),e.closePath(),e.fill()}function Tm(e,t,n,r,i=`rgba(90,70,55,0.55)`){e.fillStyle=i;for(let i of r)e.fillRect(t,i,n-t,4)}function Em(e,t,n,r,i,a){e.fillStyle=a,e.beginPath(),e.moveTo(t+r*.3,n),e.lineTo(t+r*.7,n),e.lineTo(t+r,n+i*.22),e.lineTo(t+r*.86,n+i*.38),e.lineTo(t+r*.78,n+i*.3),e.lineTo(t+r*.78,n+i),e.lineTo(t+r*.22,n+i),e.lineTo(t+r*.22,n+i*.3),e.lineTo(t+r*.14,n+i*.38),e.lineTo(t,n+i*.22),e.closePath(),e.fill()}function Dm(e,t,n,r,i,a){e.fillStyle=a,e.beginPath(),e.moveTo(t+r*.35,n),e.lineTo(t+r*.65,n),e.lineTo(t+r*.7,n+i*.35),e.lineTo(t+r,n+i),e.lineTo(t,n+i),e.lineTo(t+r*.3,n+i*.35),e.closePath(),e.fill()}function Om(e,t,n,r,i,a=`#f4f4f4`){e.fillStyle=i,e.beginPath(),e.moveTo(t,n),e.lineTo(t+r*.45,n),e.quadraticCurveTo(t+r*.6,n+r*.22,t+r,n+r*.3),e.lineTo(t+r,n+r*.45),e.lineTo(t,n+r*.45),e.closePath(),e.fill(),e.fillStyle=a,e.fillRect(t,n+r*.4,r,r*.08)}function km(e,t,n,r,i){e.fillStyle=`#f2ece4`,e.beginPath(),e.arc(t,n+r*.08,r*.07,0,Math.PI*2),e.fill(),Dm(e,t-r*.18,n+r*.16,r*.36,r*.62,i),e.fillStyle=`#8a8a8a`,e.fillRect(t-2,n+r*.78,4,r*.2),e.fillRect(t-r*.1,n+r*.97,r*.2,3)}var Am={fashion(e,t,n,r,i,a){e.fillStyle=`rgba(60,60,60,0.8)`,e.fillRect(n+10,i+30,r-n-20,3);for(let a=n+18;a<r-40;a+=30)Math.abs(a-(n+r)/2)<70||(e.fillStyle=`rgba(60,60,60,0.7)`,e.fillRect(a+11,i+26,2,8),(t()<.5?Em:Dm)(e,a,i+34,24,52+t()*18,Cm(t)));km(e,(n+r)/2-34,i+22,a-i-26,Cm(t)),km(e,(n+r)/2+34,i+22,a-i-26,Cm(t))},denim(e,t,n,r,i,a){let o=[`#1f3a68`,`#2c5288`,`#3e6aa8`,`#5b84bf`,`#18304f`];Tm(e,n+8,r-8,[i+52,i+100,i+148]);for(let a of[i+52,i+100,i+148])for(let i=n+14;i<r-30;i+=22)Math.abs(i-(n+r)/2)<60||(e.fillStyle=Cm(t,o),wm(e,i,a-14,18,14,2),e.fillStyle=`rgba(255,255,255,0.25)`,e.fillRect(i+2,a-9,14,1));km(e,(n+r)/2,i+22,a-i-26,`#2c5288`)},shoes(e,t,n,r,i,a){let o=[i+44,i+82,i+120,i+158];Tm(e,n+8,r-8,o,`rgba(255,255,255,0.85)`);for(let i of o)for(let a=n+14;a<r-36;a+=34)Math.abs(a-(n+r)/2)<60||Om(e,a,i-13,28,Cm(t,[`#1a1a1a`,`#7b4a2b`,`#c0392b`,`#f4f4f4`,`#2c3e50`,`#d4a373`,`#e76f51`]));e.fillStyle=`#b07a4c`,e.fillRect((n+r)/2-40,a-26,80,10),e.fillStyle=`rgba(200,230,240,0.8)`,e.fillRect((n+r)/2-14,i+20,28,90)},sport(e,t,n,r,i,a){let o=[i+44,i+80,i+116,i+152];Tm(e,n+8,(n+r)/2-50,o,`rgba(255,255,255,0.9)`);for(let i of o)for(let a=n+14;a<(n+r)/2-80;a+=32)Om(e,a,i-12,26,Cm(t,[`#ffffff`,`#111111`,`#e63946`,`#2a9d8f`,`#ffd166`,`#4361ee`]));for(let a=(n+r)/2+56;a<r-30;a+=34)Em(e,a,i+36,30,60,Cm(t,[`#e63946`,`#1d3557`,`#ffd166`,`#2a9d8f`,`#111111`,`#ffffff`])),e.fillStyle=`rgba(255,255,255,0.9)`,e.font=`900 16px ${ym}`,e.textAlign=`center`,e.fillText(String((t()*30|0)+1),a+15,i+72);for(let t=0;t<4;t++){let i=(n+r)/2+60+t*44;e.fillStyle=t%2?`#f77f00`:`#ffffff`,e.beginPath(),e.arc(i,a-18,14,0,Math.PI*2),e.fill(),e.strokeStyle=`rgba(0,0,0,0.5)`,e.lineWidth=2,e.beginPath(),e.arc(i,a-18,14,0,Math.PI*2),e.moveTo(i-14,a-18),e.lineTo(i+14,a-18),e.stroke()}},outdoor(e,t,n,r,i,a){for(let a=n+16;a<(n+r)/2-60;a+=36){let n=Cm(t,[`#e63946`,`#f4a261`,`#264653`,`#1b1b1b`,`#2a9d8f`,`#ffd166`]);Em(e,a,i+34,32,74,n),e.fillStyle=`rgba(0,0,0,0.18)`;for(let t=1;t<5;t++)e.fillRect(a+8,i+34+t*14,16,2)}e.fillStyle=`#e9a23b`,e.beginPath(),e.moveTo((n+r)/2+50,a-6),e.lineTo((n+r)/2+120,i+70),e.lineTo((n+r)/2+190,a-6),e.closePath(),e.fill(),e.fillStyle=`#3d2b1f`,e.beginPath(),e.moveTo((n+r)/2+105,a-6),e.lineTo((n+r)/2+120,i+120),e.lineTo((n+r)/2+135,a-6),e.fill();for(let n=0;n<2;n++)e.fillStyle=Cm(t,[`#2a9d8f`,`#e63946`,`#264653`]),wm(e,r-60+n*26,a-60,22,50,6)},beauty(e,t,n,r,i,a){let o=[i+50,i+92,i+134];Tm(e,n+8,r-8,o,`rgba(255,255,255,0.95)`);for(let i of o)for(let a=n+14;a<r-20;a+=14){if(Math.abs(a-(n+r)/2)<56)continue;let o=14+t()*18;e.fillStyle=Cm(t,[`#f4a6b8`,`#d63384`,`#1a1a1a`,`#f1c6a8`,`#b5179e`,`#ffd6a5`,`#ffffff`,`#c9184a`]),wm(e,a,i-o,9,o,2),e.fillStyle=t()<.5?`#d4af37`:`#222222`,e.fillRect(a+2,i-o-5,5,5)}e.fillStyle=`#ffffff`,e.fillRect((n+r)/2-46,a-40,92,34),e.fillStyle=`#111111`,e.fillRect((n+r)/2-46,a-40,92,5),e.fillStyle=`rgba(255,255,255,0.95)`,e.beginPath(),e.arc((n+r)/2,i+60,26,0,Math.PI*2),e.fill(),e.fillStyle=`#ffe9a8`;for(let t=0;t<10;t++)e.beginPath(),e.arc((n+r)/2+Math.cos(t/10*Math.PI*2)*32,i+60+Math.sin(t/10*Math.PI*2)*32,3.5,0,Math.PI*2),e.fill()},jewelry(e,t,n,r,i,a){e.fillStyle=`rgba(25,35,50,0.85)`,e.fillRect(n+10,i+10,r-n-20,a-i-20);for(let o=0;o<6;o++){let s=n+40+o*((r-n-80)/5);Math.abs(s-(n+r)/2)<40||(e.fillStyle=`#f5f0e6`,e.beginPath(),e.moveTo(s-22,a-30),e.lineTo(s-10,i+60),e.lineTo(s+10,i+60),e.lineTo(s+22,a-30),e.fill(),e.strokeStyle=`#e8c76a`,e.lineWidth=2,e.beginPath(),e.arc(s,i+64,16,.15*Math.PI,.85*Math.PI),e.stroke(),e.fillStyle=Cm(t,[`#e63946`,`#4cc9f0`,`#80ed99`,`#ffffff`]),e.beginPath(),e.arc(s,i+81,3.5,0,Math.PI*2),e.fill())}e.fillStyle=`rgba(220,240,255,0.5)`,e.fillRect(n+14,a-34,r-n-28,28),e.strokeStyle=`#e8c76a`,e.lineWidth=2;for(let t=n+24;t<r-20;t+=20)e.beginPath(),e.arc(t,a-20,5,0,Math.PI*2),e.stroke();e.fillStyle=`#ffffff`;for(let o=0;o<18;o++){let o=n+t()*(r-n),s=i+t()*(a-i);e.fillRect(o-4,s,9,1.5),e.fillRect(o,s-4,1.5,9)}},lingerie(e,t,n,r,i,a){e.fillStyle=`rgba(255,214,224,0.45)`,e.fillRect(n+10,i+6,r-n-20,a-i-12);for(let a=n+20;a<r-30;a+=34){if(Math.abs(a-(n+r)/2)<70)continue;let o=Cm(t,[`#d63384`,`#ffffff`,`#1a1a1a`,`#f4a6b8`,`#7a2a3d`,`#f1c6a8`]);e.fillStyle=`rgba(60,60,60,0.7)`,e.fillRect(a+12,i+26,2,10),Dm(e,a,i+36,26,60,o),e.fillStyle=Cm(t,[`#ffe0e9`,`#f8f9fa`,`#ffccd5`,`#e7c6ff`]),wm(e,a+3,i+110,20,36,4)}km(e,(n+r)/2,i+22,a-i-26,`#d63384`)},tech(e,t,n,r,i,a){for(let a=0;a<2;a++)for(let o=n+16;o<r-70;o+=74){if(Math.abs(o+32-(n+r)/2)<60)continue;let s=i+16+a*62;e.fillStyle=`#111111`,e.fillRect(o,s,66,44);let c=e.createLinearGradient(o,s,o+66,s+44);c.addColorStop(0,Cm(t,[`#4cc9f0`,`#f72585`,`#80ed99`,`#ffd166`,`#4361ee`])),c.addColorStop(1,Cm(t,[`#3a0ca3`,`#06d6a0`,`#ef476f`,`#118ab2`])),e.fillStyle=c,e.fillRect(o+3,s+3,60,38)}e.fillStyle=`#ffffff`,e.fillRect(n+14,a-34,r-n-28,28);for(let i=n+26;i<r-26;i+=22)Math.abs(i-(n+r)/2)<50||(e.fillStyle=`#1a1a1a`,wm(e,i,a-52,12,22,2),e.fillStyle=Cm(t,[`#4cc9f0`,`#80ed99`,`#ffd166`,`#f72585`]),e.fillRect(i+1.5,a-50,9,17))},toys(e,t,n,r,i,a){let o=[i+60,i+112,i+164];Tm(e,n+8,r-8,o,`rgba(255,255,255,0.9)`);for(let i of o)for(let a=n+16;a<r-30;a+=30){if(Math.abs(a-(n+r)/2)<60)continue;let o=t()*3|0;e.fillStyle=Cm(t,[`#e63946`,`#ffd166`,`#06d6a0`,`#118ab2`,`#f72585`,`#ff9f1c`]),o===0?wm(e,a,i-34,22,34,3):o===1?(e.beginPath(),e.arc(a+11,i-12,12,0,Math.PI*2),e.fill()):(e.fillStyle=`#b07a4c`,e.beginPath(),e.arc(a+11,i-12,11,0,Math.PI*2),e.arc(a+11,i-30,8,0,Math.PI*2),e.arc(a+4,i-37,3.5,0,Math.PI*2),e.arc(a+18,i-37,3.5,0,Math.PI*2),e.fill())}for(let a=0;a<5;a++){let o=(n+r)/2-40+a*20;e.fillStyle=Cm(t,[`#e63946`,`#ffd166`,`#06d6a0`,`#118ab2`,`#f72585`]),e.beginPath(),e.ellipse(o,i+24+a%2*8,9,11,0,0,Math.PI*2),e.fill()}},coffee(e,t,n,r,i,a){e.fillStyle=`#2b2b2b`,e.fillRect(n+20,i+14,150,70),e.fillStyle=`#f4efe6`,e.font=`700 13px ${ym}`,e.textAlign=`left`,[`LATTE`,`CAPPUCCINO`,`FRAPPUCCINO`,`ESPRESSO`].forEach((t,r)=>e.fillText(t,n+30,i+32+r*15)),e.fillStyle=`#7a4b2a`,e.fillRect(n+14,a-46,200,40);for(let t=n+22;t<n+206;t+=18)e.fillStyle=`#ffffff`,e.fillRect(t,a-62,11,16),e.fillStyle=`#00704a`,e.fillRect(t,a-56,11,4);for(let t=0;t<3;t++){let i=(n+r)/2+70+t*52;e.fillStyle=`#3b2a1e`,e.fillRect(i-2,a-40,4,34),e.beginPath(),e.ellipse(i,a-42,18,5,0,0,Math.PI*2),e.fill(),e.fillStyle=`#ffffff`,e.fillRect(i-8,a-54,7,10)}},home(e,t,n,r,i,a){e.fillStyle=`#c9b79c`,wm(e,n+24,a-60,150,50,8),e.fillStyle=`#b3a080`,wm(e,n+24,a-84,150,30,8);for(let r=0;r<3;r++)e.fillStyle=Cm(t,[`#e9c46a`,`#264653`,`#e76f51`,`#f4f1ea`]),wm(e,n+36+r*46,a-76,32,26,5);for(let t of[(n+r)/2+70,r-50])e.fillStyle=`#3b3a36`,e.fillRect(t-2,i+60,4,a-i-66),e.fillStyle=`#fff1cf`,e.beginPath(),e.moveTo(t-22,i+62),e.lineTo(t-12,i+30),e.lineTo(t+12,i+30),e.lineTo(t+22,i+62),e.fill();Tm(e,(n+r)/2+100,r-80,[i+90,i+130],`rgba(120,100,80,0.8)`);for(let a=(n+r)/2+106;a<r-90;a+=18)e.fillStyle=Cm(t,[`#f4f1ea`,`#d4a373`,`#a3b18a`,`#6c757d`]),wm(e,a,i+70,12,20,5),wm(e,a,i+112,12,18,5)},market(e,t,n,r,i,a){let o=[i+42,i+78,i+114,i+150];Tm(e,n+8,r-8,o,`rgba(140,150,160,0.9)`);for(let i of o)for(let a=n+12;a<r-14;a+=11){if(Math.abs(a-(n+r)/2)<52)continue;e.fillStyle=Cm(t,[`#e63946`,`#ffd166`,`#06d6a0`,`#118ab2`,`#f4a261`,`#ffffff`,`#8338ec`]);let o=16+t()*14;e.fillRect(a,i-o,9,o)}e.strokeStyle=`#555555`,e.lineWidth=3;let s=(n+r)/2-22;e.strokeRect(s,a-46,44,28),e.beginPath(),e.arc(s+8,a-10,5,0,Math.PI*2),e.arc(s+36,a-10,5,0,Math.PI*2),e.stroke()}};function jm(e,t){return gp(512,240,(n,r,i)=>{let a=hp(t);n.fillStyle=e.bg,n.fillRect(0,0,r,i),n.fillStyle=e.sign;let o=48;for(n.font=`900 ${o}px ${e.font??ym}`;n.measureText(e.name).width>r-40&&o>20;)o-=2,n.font=`900 ${o}px ${e.font??ym}`;n.textAlign=`center`,n.textBaseline=`middle`,n.fillText(e.name,r/2,34),n.textBaseline=`alphabetic`;let s=n.createLinearGradient(0,66,0,i);s.addColorStop(0,e.glow),s.addColorStop(1,`#f6efe6`),n.fillStyle=s,n.fillRect(14,66,r-28,i-66-6),Am[e.theme](n,a,14,r-14,66,i-6),n.fillStyle=`rgba(40,40,45,0.9)`;for(let e=14;e<=r-14;e+=124)n.fillRect(e-3,66,6,i-66);n.fillStyle=`rgba(255,255,255,0.14)`,n.fillRect(r/2-50,76,100,i-66-16),n.fillStyle=`rgba(255,255,255,0.16)`;for(let e=0;e<5;e++){n.beginPath();let e=a()*r;n.moveTo(e,66),n.lineTo(e+30,66),n.lineTo(e-30,i),n.lineTo(e-60,i),n.fill()}})}function Mm(e){return gp(256,256,(e,t,n)=>{let r=hp(31);for(let i=0;i<n;i+=64)for(let n=0;n<t;n+=64)e.fillStyle=[`#efe7da`,`#ebe2d3`,`#f3ece1`,`#e6dccb`][r()*4|0],e.fillRect(n,i,64,64),e.strokeStyle=`rgba(160,140,120,0.18)`,e.lineWidth=1,e.beginPath(),e.moveTo(n+r()*64,i),e.bezierCurveTo(n+r()*64,i+20,n+r()*64,i+44,n+r()*64,i+64),e.stroke(),e.fillStyle=`rgba(120,105,90,0.35)`,e.fillRect(n,i,64,1),e.fillRect(n,i,1,64)},12,12,e)}var Nm=class extends bp{constructor(e){super(e),this.env={fog:hm,fogNear:this.mobile?36:46,fogFar:this.mobile?140:175,sky:null,clouds:!1,sunGlow:!1,hemi:{sky:16775148,ground:13220002,intensity:1.75},sun:{color:16774886,intensity:1.25,offset:[-4,24,3]},exposure:1,marks:{color:12166798,opacity:.45},weather:`none`,confetti:[16732067,5951999,16765286,16777215,10182117]};let t=ip(new Io({map:Mm(this.aniso),specular:6969928,shininess:70}),{ceilY:18.049999999999997,halfW:pp+1.5});this.ground(t,null,{width:40}),this._shops(),this._levels(),this._ceiling(),this._furniture()}_shops(){let e=xm.map(()=>[]);for(let t of[-1,1])for(let n=0;n<3;n++){let r=pp+5+n*.9;for(let i=0;i<22;i++)e[(i*7+n*5+(t>0?11:0))%xm.length].push({o:i*_m+(t>0?5:0),x:t*(r+2),y:n*gm,rot:t<0?0:Math.PI})}let t=new H(4,5,11.6).translate(0,5/2,0),n=new W({color:15327959});xm.forEach((r,i)=>{let a=new pi({map:jm(r,i+9)});this.recycler(t,[a,n,n,n,n,n],e[i],264,30)});let r=[];for(let e of[-1,1])for(let t=0;t<3;t++)for(let n=0;n<22;n++)r.push({o:n*_m+(e>0?5:0)+_m/2,x:e*(pp+5+t*.9+.1),y:t*gm});this.recycler(new H(.5,gm,.7).translate(0,gm/2,0),new W({color:16249836}),r,264,30)}_levels(){let e=[],t=[],n=[];for(let r of[-1,1])for(let i=1;i<3;i++){let a=pp+2.6+i*.5;for(let o=0;o<11;o++){let s=o*24;e.push({o:s,x:r*(a+4),y:i*gm-.35}),t.push({o:s,x:r*(a+.1),y:i*gm}),n.push({o:s,x:r*(a+.1),y:i*gm+1.1})}}this.recycler(new H(8,.7,24.02),new W({color:16513267}),e,264,30,{cast:!0}),this.recycler(new H(.06,1.1,24).translate(0,.55,0),new Io({color:12575722,transparent:!0,opacity:.32,shininess:90,specular:16777215,depthWrite:!1}),t,264,30),this.recycler(new H(.12,.08,24),new W({color:12106946}),n,264,30);let r=[{o:60},{o:190}].map(e=>({...e,x:0,y:gm*2-.35})),i=_p([X(new H(pp*2+6,.5,4),16184042),X(new H(pp*2+6,.12,.1),12106946,0,1.35,1.95),X(new H(pp*2+6,.12,.1),12106946,0,1.35,-1.95)]);this.recycler(i,vp(),r,264,30,{cast:!0});let a=[];for(let e of[-1,1])for(let t=0;t<11;t++)a.push({o:t*24+12,x:e*(pp+2.2)});this.recycler(new U(.45,.45,vm,14).translate(0,vm/2,0),new Io({color:16777215,shininess:40}),a,264,30,{cast:!0})}_ceiling(){let e=new V(new So(60,400).rotateX(Math.PI/2),new W({color:16052199}));e.position.set(0,18.099999999999998,-150),this.group.add(e);let t=new V(new So(pp*2+3,400).rotateX(Math.PI/2),new pi({color:new B(14676991).multiplyScalar(2.6)}));t.position.set(0,18.049999999999997,-150),this.group.add(t);let n=[];for(let e=0;e<44;e++)n.push({o:e*6,x:0,y:vm});this.recycler(new H(pp*2+4,.35,.25),new W({color:10134445}),n,264,30);let r=[],i=hp(33);for(let e=0;e<12;e++)r.push({o:e*22+7,x:(e%2?1:-1)*(pp-.6),y:11.299999999999997,tint:[16732067,5951999,16765286,10182117][i()*4|0]});this.recycler(new H(.06,5,1.8).translate(0,2.5,0),new W({color:16777215}),r,264,30,{tint:!0})}_furniture(){let e=hp(34),t=[],n=[];for(let r of[-1,1])for(let i=0;i<11;i++)t.push({o:i*24+4+(r>0?8:0),x:r*(pp+1.2),s:.85+e()*.2,rot:e()*6}),n.push({o:i*24+18+(r>0?-6:0),x:r*(pp+1),rot:r<0?0:Math.PI});let r=[X(new U(.7,.55,.9,10),14275270,0,.45,0),X(new U(.1,.14,2.2,6),8018490,0,2,0)];for(let e=0;e<7;e++){let t=new ea(.25,1.9,4);t.rotateZ(Math.PI/2-.5),t.translate(.95,0,0),t.rotateY(e/7*Math.PI*2),r.push(X(t,e%2?4098620:5152324,0,3,0))}this.recycler(_p(r),vp(),t,264,30,{cast:!0});let i=_p([X(new H(.8,.45,2.4),11565644,0,.42,0),X(new H(.7,.2,2.2),9146262,0,.1,0)]);this.recycler(i,vp(),n,264,30,{cast:!0})}},Pm=15910564,Fm=13148344,Im=pp+11;function Lm(){return gp(128,128,(e,t,n)=>{let r=hp(52);e.fillStyle=`#5f9a44`,e.fillRect(0,0,t,n);for(let i=0;i<1500;i++)e.fillStyle=[`#548d3b`,`#6fa94f`,`#5a9440`,`#7db45a`][r()*4|0],e.fillRect(r()*t,r()*n,1,2+r()*3);e.fillStyle=`#cdbf9f`,e.fillRect(2,0,7,n);for(let t=0;t<120;t++)e.fillStyle=r()<.5?`#b8aa8a`:`#ddd1b4`,e.fillRect(2+r()*7,r()*n,1,1)},1,4)}function Rm(){let e=[X(new U(.3,.45,3.2,7),6178352,0,1.6,0)],t=new bo(2.2,1);t.scale(1.2,.75,1.2),e.push(X(t,8365642,0,4.2,0));let n=hp(53);for(let t=0;t<16;t++){let r=t/16*Math.PI*2,i=1.6+n()*.9,a=2.2+n()*1.4,o=new ea(.42,a,4);o.rotateX(Math.PI),e.push(X(o,n()<.5?9286487:7576386,Math.cos(r)*i,4-a/2,Math.sin(r)*i))}return _p(e)}function zm(){let e=[],t=hp(54);for(let n=0;n<9;n++){let n=1.2+t()*.9,r=(t()-.5)*1.4,i=(t()-.5)*1.4;e.push(X(new U(.03,.05,n,4),7180092,r,n/2,i)),t()<.5&&e.push(X(new U(.07,.07,.35,5),7031338,r,n-.1,i))}return _p(e)}function Bm(){let e=[],t=hp(55);for(let n=0;n<6;n++){let n=new U(.35+t()*.2,.35,.03,9,1,!1,.4,Math.PI*1.85);e.push(X(n,5212730,(t()-.5)*2.2,.03,(t()-.5)*2.2))}return e.push(X(new bo(.13,0),16769263,.3,.1,.2)),_p(e)}function Vm(){let e=[];for(let[t,n]of[[-1.6,-2],[1.6,-2],[-1.6,2],[1.6,2]])e.push(X(new H(.2,2.6,.2),7031340,t,1.3,n));let t=new Ma;t.moveTo(-2.3,0),t.lineTo(0,1.4),t.lineTo(2.3,0),t.lineTo(-2.3,0);let n=new _o(t,{depth:5.2,bevelEnabled:!1});n.translate(0,2.6,-2.6),e.push(Hm(n,8014378)),e.push(X(new H(1,.08,3.2),10119740,0,.8,0));for(let t of[-.85,.85])e.push(X(new H(.35,.06,3.2),10119740,t,.48,0));return _p(e)}function Hm(e,t){return X(e,t)}function Um(){return _p([X(new wo(.3,8,6).scale(1,.7,1.5),9071178,0,.12,0),X(new wo(.16,8,6),3107642,0,.42,-.32),X(new ea(.06,.18,5).rotateX(-Math.PI/2),15769632,0,.4,-.5)])}function Wm(){let e=[X(new H(3.4,.25,9),9069632,0,.55,0)];for(let[t,n]of[[-1.6,-4.3],[1.6,-4.3],[-1.6,4.3],[1.6,4.3],[-1.6,0],[1.6,0]])e.push(X(new U(.14,.14,1.4,6),5914672,t,.1,n));for(let t=0;t<3;t++){let n=-3+t*3,r=[3120086,15909424,15228234][t];e.push(X(new H(.45,.4,2.6),16053492,-3,.1,n)),e.push(X(new H(.45,.4,2.6),16053492,-4.4,.1,n)),e.push(X(new H(1.8,.2,1.4),r,-3.7,.45,n)),e.push(X(new H(1.6,.6,.2),r,-3.7,.8,n+.6))}return _p(e)}function Gm(){let e=new z,t=Im*2+16;for(let n of[-1,1]){let r=new z;for(let e of[-.6,.6])for(let t of[-.6,.6])r.add(Y(new H(.18,16-(n>0?3:0),.18),q(7031340),e,(16-(n>0?3:0))/2,t));r.add(Y(new H(1.8,.2,1.8),q(9069632),0,15-(n>0?3:0),0)),r.position.x=n*t/2,e.add(r)}let n=Y(new U(.03,.03,Math.hypot(t,3),4).rotateZ(Math.PI/2),q(3355443),0,13.8,0);n.rotation.z=Math.atan2(-3,t),e.add(n);let r=new z;r.add(Y(new U(.03,.03,1,4),q(3355443),0,-.5,0)),r.add(Y(new H(.45,.6,.3),q(15224923),0,-1.3,0)),r.add(Y(new wo(.17,8,6),q(up.skin),0,-.85,0)),r.add(Y(new wo(.19,8,6,0,Math.PI*2,0,Math.PI/2),q(16763904),0,-.8,0));for(let e of[-.12,.12])r.add(Y(new H(.14,.6,.16),q(2832981),e,-1.85,.1));return e.add(r),e.userData={rider:r,L:t,H:15},e}var Km={partie:Lp,republicii:em,tractorul:mm,afi:Nm,noua:class extends bp{constructor(e){super(e),this.env={fog:Pm,fogNear:this.mobile?45:60,fogFar:this.mobile?160:210,sky:{top:2572428,mid:12615580,hor:Pm,sun:{dir:[-.28,.42,-1],color:16757610,size:.065,halo:1.5},clouds:{cover:.55,lit:16763304,shade:9068428}},hemi:{sky:16768198,ground:5208672,intensity:1.4},sun:{color:16759672,intensity:2.1,offset:[-13,15,6]},exposure:1.03,marks:null,weather:`pollen`,confetti:[16777215,9286487,5951999,16769126,16748459]},this.water=np(new W({color:16777215}),{bank:Im}),this.ground(this.water,null,{width:Im*2+.4}),this._shores(),this._water(),this._park(),this._backdrop()}_shores(){let e=new W({map:Lm()}),t=new W({color:9143672,flatShading:!0}),n=[];for(let e of[-1,1])for(let t=0;t<10;t++)n.push({o:t*30,x:e*(Im+30),y:-.3,rot:e<0?Math.PI:0});let r=new H(60,1,30.02);this.recycler(r,[t,t,e,t,t,t],n,300,40,{receive:!0});let i=[],a=hp(56);for(let e of[-1,1])for(let t=0;t<40;t++)i.push({o:t*7.5+a()*3,x:e*(Im+.2),y:.05,s:.5+a()*.6,rot:a()*6,tint:.85+a()*.3});this.recycler(new bo(.6,0).scale(1.3,.6,1),new W({color:10130570,flatShading:!0}),i,300,30,{tint:!0,receive:!0})}_water(){let e=hp(57),t=[],n=[];for(let e of[-1.2,1.2])for(let r=0;r<60;r++)(r%2?n:t).push({o:r*3,x:e,y:.05});let r=new wo(.16,8,6);this.recycler(r,q(16777215),t,180,14,{bob:.04}),this.recycler(r,q(15087942),n,180,14,{bob:.04});let i=[],a=[];for(let t of[-1,1])for(let n=0;n<14;n++)i.push({o:n*20+e()*8,x:t*(Im-.9-e()*1.2),s:.8+e()*.5,rot:e()*6}),a.push({o:n*20+10+e()*6,x:t*(pp+1.4+e()*7.5),rot:e()*6});this.recycler(zm(),vp(),i,280,20),this.recycler(Bm(),vp(),a,280,20);let o=[];for(let t=0;t<6;t++)o.push({o:t*46+20,x:(t%2?1:-1)*(pp+2.4+e()*6),rot:e()*6});this.recycler(Um(),vp(),o,276,20,{bob:.05}),this.recycler(Wm(),vp(),[{o:70,x:Im-1.2}],300,30,{cast:!0})}_park(){let e=hp(58),t=[],n=[],r=[];for(let i of[-1,1])for(let a=0;a<18;a++){let o=a*15+e()*8,s=e(),c={o,x:i*(Im+3+e()*14),s:.9+e()*.5,rot:e()*6,y:.2};s<.3?n.push({...c,x:i*(Im+1.8+e()*1.5)}):s<.75?t.push(c):r.push(c)}this.treeRecyclers=[this.recycler(xp(6068798,4950580),vp(),t,270,20,{cast:!0}),this.recycler(Rm(),vp(),n,270,20,{cast:!0})];let i=_p([X(new U(.2,.28,1.2,6),5913119,0,.6,0),X(new ea(1.6,3.2,7),2910789,0,2.6,0),X(new ea(1.2,2.6,7),3439184,0,4.2,0)]);this.recycler(i,vp(),r,270,20,{cast:!0});let a=[],o=[],s=[];for(let e of[-1,1]){for(let t=0;t<9;t++)o.push({o:t*30+(e>0?15:0),x:e*(Im+1.6),y:.2}),a.push({o:t*30+7+(e>0?15:0),x:e*(Im+1.9),y:.2,rot:e<0?0:Math.PI});s.push({o:e<0?40:160,x:e*(Im+6),y:.2}),s.push({o:e<0?205:95,x:e*(Im+7),y:.2})}this.recycler(Sp(),vp(),o,270,20,{cast:!0}),this.recycler(Cp(),vp(),a,270,20,{cast:!0}),this.recycler(Vm(),vp(),s,270,20,{cast:!0}),this.zip=this.single(Gm(),120,270,30,0,.2)}_backdrop(){let e=this.backdrop;e.add(Dp({z:-270,n:7,h:[85,120],rad:[70,95],seed:61,color:4880984,haze:Fm,hazeK:.55,spread:520})),e.add(Dp({z:-200,n:8,h:[45,70],rad:[45,65],seed:62,color:4024896,haze:Fm,hazeK:.3,keepOpen:26,spread:420}));let t=hp(63),n=[];for(let e=0;e<90;e++){let e=(t()-.5)*340;if(Math.abs(e)<20)continue;let r=6+t()*7,i=new ea(r*.32,r,5);i.translate(e,r/2-1,-165-t()*14),n.push(X(i,yp(t()<.5?3107390:4094536,Fm,.25)))}e.add(new V(_p(n),new W({vertexColors:!0,flatShading:!0,fog:!1})))}animate(e,t,n){let{rider:r,L:i,H:a}=this.zip.userData,o=n*.12%1;r.position.set(-i/2+o*i,a-1.5+.3+1.5-o*3,0),r.rotation.z=Math.sin(n*3)*.12}}},qm=class{constructor(e,t={}){this.scene=e,this.mobile=!!t.mobile,this.dummy=new Nn,e.fog=new Vn(14149622,46,155),this.hemi=new as(15266559,9348806,1.55),e.add(this.hemi),this.sun=new bs(16773596,1.9),this.sun.castShadow=!!t.shadows;let n=this.sun.shadow.camera;n.left=-16,n.right=16,n.top=30,n.bottom=-22,n.near=1,n.far=80;let r=this.mobile?1024:2048;this.sun.shadow.mapSize.set(r,r),this.sun.shadow.bias=-6e-4,this.sun.shadow.normalBias=.03,this.sun.shadow.radius=2,e.add(this.sun,this.sun.target),this._buildSky(),this._buildLaneMarks(),this._buildWeather();let i={mobile:this.mobile,aniso:t.anisotropy||1};this.sets={};for(let[t,n]of Object.entries(Km)){let r=new n(i);r.group.visible=!1,r.backdrop.visible=!1,e.add(r.group,r.backdrop),this.sets[t]=r}this.active=null,this.setBiome(`partie`)}setShadows(e){this.sun.castShadow=e}setBiome(e){let t=this.sets[e];if(!t||t===this.active)return;this.active&&(this.active.group.visible=!1,this.active.backdrop.visible=!1),this.active=t,this.biomeId=e,t.group.visible=!0,t.backdrop.visible=!0;let n=t.env;this.env=n,this.scene.fog.color.set(n.fog),this.scene.fog.near=n.fogNear,this.scene.fog.far=n.fogFar,this.hemi.color.set(n.hemi.sky),this.hemi.groundColor.set(n.hemi.ground),this.hemi.intensity=n.hemi.intensity,this.sun.color.set(n.sun.color),this.sun.intensity=n.sun.intensity,this.sunOffset=n.sun.offset||[-9,19,7],this._applySky(n),this.marks.visible=!!n.marks,n.marks&&(this.marks.material.color.set(n.marks.color),this.marks.material.opacity=n.marks.opacity),this.weather=n.weather||`none`,this.flakes.visible=this.weather!==`none`;let r=this.flakes.material;this.weather===`snow`?(r.size=.22,r.color.set(16777215),r.opacity=.95):this.weather===`pollen`&&(r.size=.16,r.color.set(16776168),r.opacity=.8)}_buildSky(){this.sky=new V(new wo(300,24,16),Qf(this.mobile)),this.sky.renderOrder=1e3,this.sky.frustumCulled=!1,this.skyU=this.sky.material.uniforms,this.scene.add(this.sky)}_applySky(e){this.sky.visible=!!e.sky;let t=e.sky||{},n=this.skyU,r=t.sun||{};n.uTop.value.set(t.top??4029636),n.uMid.value.set(t.mid??9420777),n.uHor.value.set(t.hor??e.fog);let i=r.dir||[-.4,.3,-1];n.uSunDir.value.set(i[0],i[1],i[2]).normalize(),n.uSunCol.value.set(r.color??16773848),n.uSun.value.set(r.size??.035,r.halo??.8,r.disc??1);let a=t.clouds||{};n.uCloud.value.set(a.cover??.4,a.speed??.012,a.visible??1),n.uCloudLit.value.set(a.lit??16777215),n.uCloudShade.value.set(a.shade??12044508),$f.uSunDir.value.copy(n.uSunDir.value),$f.uSunCol.value.copy(n.uSunCol.value),$f.uSkyCol.value.set(t.mid??13421772),$f.uHorCol.value.set(t.hor??e.fog)}_buildLaneMarks(){this.markSpacing=6;let e=new H(.08,.02,2.4),t=[-K.laneW/2,K.laneW/2];this.marks=new Ii(e,new W({color:11126500,transparent:!0,opacity:.75}),26*t.length),this.marks.frustumCulled=!1,this.marks.receiveShadow=!0,this.markXs=t,this.markPer=26,this.scene.add(this.marks)}_buildWeather(){this.snowMax=this.mobile?260:520,this.snowCount=this.snowMax;let e=new Float32Array(this.snowMax*3);this.snowSeed=new Float32Array(this.snowMax);for(let t=0;t<this.snowMax;t++)e[t*3]=(Math.random()-.5)*50,e[t*3+1]=Math.random()*20,e[t*3+2]=-Math.random()*130+10,this.snowSeed[t]=Math.random()*10;let t=new Ir;this.snowAttr=new xr(e,3).setUsage(Je),t.setAttribute(`position`,this.snowAttr);let n=document.createElement(`canvas`);n.width=n.height=32;let r=n.getContext(`2d`),i=r.createRadialGradient(16,16,1,16,16,15);i.addColorStop(0,`rgba(255,255,255,1)`),i.addColorStop(1,`rgba(255,255,255,0)`),r.fillStyle=i,r.fillRect(0,0,32,32);let a=new Yi(n);a.colorSpace=He;let o=new Vi({size:.22,map:a,transparent:!0,depthWrite:!1,sizeAttenuation:!0,opacity:.95});this.flakes=new Ki(t,o),this.flakes.frustumCulled=!1,this.scene.add(this.flakes)}setSnowAmount(e){this.snowCount=Math.max(60,Math.floor(this.snowMax*e)),this.flakes.geometry.setDrawRange(0,this.snowCount)}update(e,t,n,r,i=0){let a=this.dummy,o=performance.now()*.001;if($f.uTime.value=o%3600,$f.uDist.value=e,this.skyU.uTime.value=o,this.active.update(e,n,o,r),this.marks.visible){let t=0,n=this.markSpacing,r=Math.floor((e-12)/n)*n;a.rotation.set(0,0,0),a.scale.set(1,1,1);for(let i of this.markXs)for(let o=0;o<this.markPer;o++)a.position.set(i,.035,-(r+o*n-e)),a.updateMatrix(),this.marks.setMatrixAt(t++,a.matrix);this.marks.instanceMatrix.needsUpdate=!0}if(this.flakes.visible){let e=this.snowAttr.array,r=this.snowCount,i=this.weather===`pollen`,a=i?.25:1.6;for(let s=0;s<r;s++){let r=s*3;e[r+1]-=(a+s%5*(i?.05:.25))*n,e[r]+=Math.sin(o*.8+this.snowSeed[s])*(i?.8:.35)*n,e[r+2]+=t*n*.9,(e[r+1]<0||e[r+2]>12)&&(e[r]=(Math.random()-.5)*50,e[r+1]=i?1+Math.random()*9:14+Math.random()*8,e[r+2]=e[r+2]>12?-120-Math.random()*10:e[r+2])}this.snowAttr.needsUpdate=!0}let s=this.sunOffset;this.sun.position.set(i+s[0],s[1],s[2]),this.sun.target.position.set(i,0,-12),this.sun.target.updateMatrixWorld(),this.sky.position.copy(r.position)}visibleTreeCount(e){return this.active.visibleTreeCount(e)}},Jm={partie:[10474495,16777215,5943551],republicii:[16758531,15087942,16773569],tractorul:[2792847,16032353,16777215],afi:[16732067,5951999,16777215],noua:[9286487,5951999,16774856]},Ym=6,Xm=9;function Zm(){let e=document.createElement(`canvas`);e.width=e.height=256;let t=e.getContext(`2d`),n=t.createRadialGradient(128,128,4,128,128,128);n.addColorStop(0,`rgba(255,255,255,1)`),n.addColorStop(.35,`rgba(255,255,255,0.55)`),n.addColorStop(1,`rgba(255,255,255,0)`),t.fillStyle=n,t.fillRect(0,0,256,256),t.strokeStyle=`rgba(255,255,255,0.55)`,t.lineWidth=9;for(let e=0;e<4;e++){t.beginPath();for(let n=0;n<60;n++){let r=Math.PI/2*e+n*.09,i=n*2,a=128+Math.cos(r)*i,o=128+Math.sin(r)*i;n===0?t.moveTo(a,o):t.lineTo(a,o)}t.stroke()}let r=new Yi(e);return r.colorSpace=He,r}function Qm(){let e=document.createElement(`canvas`);e.width=e.height=256;let t=e.getContext(`2d`);t.translate(128,128);for(let e=0;e<14;e++){t.save(),t.rotate(e/14*Math.PI*2);let n=t.createLinearGradient(0,0,128,0);n.addColorStop(0,`rgba(255,255,255,0.7)`),n.addColorStop(1,`rgba(255,255,255,0)`),t.fillStyle=n,t.beginPath(),t.moveTo(0,0),t.lineTo(128,-9-e%3*3),t.lineTo(128,9+e%3*3),t.fill(),t.restore()}let n=new Yi(e);return n.colorSpace=He,n}var $m=class{constructor(e){this.root=new z,this.root.visible=!1,e.add(this.root);let t=e=>e.renderOrder=3;this.glowMat=new pi({color:16777215,transparent:!0,opacity:.95,blending:2,depthWrite:!1,fog:!1}),this.ringMat=new pi({color:16777215,transparent:!0,opacity:.7,blending:2,depthWrite:!1,fog:!1}),this.swirlMat=new pi({map:Zm(),color:16777215,transparent:!0,opacity:.85,blending:2,depthWrite:!1,side:2,fog:!1}),this.arch=new z;let n=new V(new To(6.2,.38,10,40,Math.PI),this.glowMat);n.position.y=1.2,this.arch.add(n);for(let e of[-1,1]){let t=new V(new U(.38,.38,1.2,10),this.glowMat);t.position.set(e*6.2,.6,0),this.arch.add(t)}this.swirl=new V(new $i(6,40),this.swirlMat),this.swirl.position.y=1.2,this.arch.add(this.swirl),this.raysMat=new pi({map:Qm(),color:16777215,transparent:!0,opacity:.5,blending:2,depthWrite:!1,side:2,fog:!1}),this.rays=new V(new $i(11,32),this.raysMat),this.rays.position.set(0,1.2,-.15),this.arch.add(this.rays),this.arch.traverse(t),this.root.add(this.arch),this.rings=[];let r=new To(5.6,.12,6,36,Math.PI);for(let e=0;e<Ym;e++){let t=new V(r,this.ringMat);t.position.set(0,1.2,(e+1)*Xm),t.renderOrder=3,this.root.add(t),this.rings.push(t)}this.signCanvas=document.createElement(`canvas`),this.signCanvas.width=1024,this.signCanvas.height=192,this.signTex=new Yi(this.signCanvas),this.signTex.colorSpace=He;let i=new V(new So(13,2.45),new pi({map:this.signTex,transparent:!0,depthWrite:!1,fog:!1}));i.position.set(0,9.1,.2),i.renderOrder=4,this.root.add(i),this.colors=Jm.partie}_drawSign(e,t){let n=this.signCanvas.getContext(`2d`),{width:r,height:i}=this.signCanvas;n.clearRect(0,0,r,i),n.fillStyle=`rgba(11,36,71,0.78)`,n.beginPath(),n.moveTo(48,0),n.arcTo(r,0,r,i,48),n.arcTo(r,i,0,i,48),n.arcTo(0,i,0,0,48),n.arcTo(0,0,r,0,48),n.fill(),n.strokeStyle=`#`+new B(t).getHexString(),n.lineWidth=10,n.stroke(),n.fillStyle=`#ffffff`,n.textAlign=`center`,n.textBaseline=`middle`;let a=`→ `+e.toUpperCase(),o=92;do n.font=`900 ${o}px Arial, Helvetica, sans-serif`,o-=4;while(n.measureText(a).width>r-90&&o>40);n.fillText(a,r/2,i/2+4),this.signTex.needsUpdate=!0}show(e,t){let n=hd[t];this.gateS=e,this.colors=Jm[n.id],this.glowMat.color.set(this.colors[0]),this.ringMat.color.set(this.colors[1]),this.swirlMat.color.set(this.colors[0]),this.raysMat.color.set(this.colors[2]),this._drawSign(n.name,this.colors[0]),this.root.visible=!0}hide(){this.root.visible=!1}update(e,t,n){if(!this.root.visible)return;this.root.position.z=-(this.gateS-e),this.swirl.rotation.z=-t*1.6;let r=.5+.5*Math.sin(t*6),i=Pt.clamp(1-n/2.5,0,1);this.glowMat.opacity=.75+.25*r,this.swirlMat.opacity=.55+.4*i,this.arch.scale.setScalar(1+i*.08+r*.02),this.rays.rotation.z=t*.5,this.raysMat.opacity=.3+.3*i+.1*r;for(let e=0;e<this.rings.length;e++){let n=this.rings[e];n.scale.setScalar(1+.06*Math.sin(t*5+e)),n.rotation.z=Math.sin(t*2+e)*.04}}},Z=(e,t,n)=>J(`b${e},${t},${n}`,()=>new H(e,t,n)),eh=(e,t=10,n=8)=>J(`s${e},${t},${n}`,()=>new wo(e,t,n)),th=(e,t,n=8)=>J(`cx${e},${t},${n}`,()=>new U(e,e,t,n).rotateZ(Math.PI/2)),nh=(e,t,n=8)=>J(`cz${e},${t},${n}`,()=>new U(e,e,t,n).rotateX(Math.PI/2)),rh=(e,t,n,r=8)=>J(`cy${e},${t},${n},${r}`,()=>new U(e,t,n,r)),ih=(e,t,n=7)=>J(`co${e},${t},${n}`,()=>new ea(e,t,n)),ah=(e,t=0)=>J(`ic${e},${t}`,()=>new bo(e,t)),oh=(e,t,n=6,r=16)=>J(`to${e},${t},${n},${r}`,()=>new To(e,t,n,r)),sh=new Map;function ch(e,{bg:t=`#ffffff`,fg:n=`#111111`,w:r=256,h:i=96,font:a=900,size:o=60}={}){let s=[e,t,n,r,i,o].join(`|`);if(sh.has(s))return sh.get(s);if(typeof document>`u`)return q(t);let c=document.createElement(`canvas`);c.width=r,c.height=i;let l=c.getContext(`2d`);l.fillStyle=t,l.fillRect(0,0,r,i),l.fillStyle=n,l.font=`${a} ${o}px Arial, Helvetica, sans-serif`,l.textAlign=`center`,l.textBaseline=`middle`,l.fillText(e,r/2,i/2+2);let u=new Yi(c);u.colorSpace=He;let d=new W({map:u});return sh.set(s,d),d}var lh=new Map;function uh(e,t,n=8){let r=`${e}|${t}|${n}`;if(lh.has(r))return lh.get(r);if(typeof document>`u`)return q(e);let i=document.createElement(`canvas`);i.width=128,i.height=16;let a=i.getContext(`2d`);for(let r=0;r<n;r++)a.fillStyle=r%2?t:e,a.fillRect(r*128/n,0,128/n+1,16);let o=new Yi(i);o.colorSpace=He;let s=new W({map:o,side:2});return lh.set(r,s),s}function dh(e={}){let t=q(e.shirt??3832789),n=q(e.pants??2832981),r=q(e.skin??up.skin),i=new z,a=new z;a.position.y=0,a.userData.dynamic=!0,i.add(a),a.add(Y(Z(.5,.62,.3),t,0,.36,0));let o=new z;o.position.set(0,.86,0),o.add(Y(eh(.2,10,8),r,0,0,0));let s=q(e.hair??2825492);e.hairStyle===`helmet`?o.add(Y(J(`helmet`,()=>new wo(.23,10,6,0,Math.PI*2,0,Math.PI*.55)),q(e.helmet??16734774),0,.03,-.02)):e.hairStyle===`long`?(o.add(Y(J(`hairLong`,()=>new wo(.215,10,7,0,Math.PI*2,0,Math.PI*.6)),s,0,.02,-.02)),o.add(Y(Z(.38,.4,.12),s,0,-.18,-.15))):e.hairStyle===`cap`?(o.add(Y(J(`cap`,()=>new wo(.215,10,6,0,Math.PI*2,0,Math.PI*.5)),q(e.helmet??15087942),0,.03,0)),o.add(Y(Z(.3,.04,.2),q(e.helmet??15087942),0,.05,.22))):(o.add(Y(J(`hairShort`,()=>new wo(.212,10,6,0,Math.PI*2,0,Math.PI*.42)),s,0,.025,-.01)),o.add(Y(Z(.34,.16,.08),s,0,-.03,-.17)));for(let e of[-.07,.07])o.add(Y(eh(.025,5,4),q(1710618),e,.03,.18));a.add(o);let c=[];for(let e of[-1,1]){let n=new z;n.position.set(e*.31,.62,0),n.add(Y(Z(.14,.5,.15),t,0,-.2,0)),n.add(Y(eh(.075,6,5),r,0,-.48,0)),a.add(n),c.push(n)}let l=[];for(let e of[-1,1]){let t=new z;t.position.set(e*.13,.05,0),t.userData.dynamic=!0;let r=new z;r.add(Y(Z(.17,.17,.48),n,0,0,.22));let a=new z;a.position.set(0,0,.44),a.userData.dynamic=!0,a.add(Y(Z(.15,.48,.15),n,0,-.22,0)),a.add(Y(Z(.17,.1,.26),q(2236962),0,-.48,.05)),r.add(a),t.add(r),t.userData.shin=a,i.add(t),l.push(t)}return i.userData.torso=a,{group:i,legs:l,arms:c,torso:a}}function fh(e,t){for(let n=0;n<e.length;n++){let r=t+n*Math.PI;e[n].rotation.x=.25+Math.sin(r)*.35,e[n].userData.shin.rotation.x=.35-Math.cos(r)*.4}}function ph(e,t,n=.04,r=2){e.rotation.z=Math.sin(t*r)*n}var mh=()=>q(1908516);function hh(){let e=new z,t=q(10119740);for(let t of[-.85,.85])e.add(Y(Z(.08,.42,.5),mh(),t,.21,0)),e.add(Y(Z(.08,.36,.08),mh(),t,.6,-.22));for(let n of[-.12,.05,.2])e.add(Y(Z(2,.05,.13),t,0,.44,n));for(let n of[.62,.76])e.add(Y(Z(2,.1,.05),t,0,n,-.24));return e}function gh(){let e=new z;e.add(Y(Z(2,.5,.7),q(9208439),0,.25,0)),e.add(Y(Z(2.08,.06,.78),q(12037535),0,.5,0)),e.add(Y(Z(1.9,.08,.6),q(4863012),0,.53,0));let t=[15087942,16758531,16748459,16777215,10182117];for(let n=0;n<9;n++){let r=-.8+n*.2;e.add(Y(ah(.13),q(4160048),r,.6,n%2*.16-.08)),e.add(Y(eh(.075,6,5),q(t[n%t.length]),r,.72,n%2*.16-.08))}return e}function _h(){let e=new z,t=[-3.4,-1.15,1.15,3.4];for(let n of t)e.add(Y(rh(.13,.17,.75,8),mh(),n,.37,0)),e.add(Y(eh(.15,8,6),mh(),n,.8,0)),e.add(Y(rh(.2,.2,.08,8),mh(),n,.04,0));let n=oh(.05,.015,4,8);for(let r=0;r<t.length-1;r++)for(let i=1;i<12;i++){let a=i/12,o=t[r]+(t[r+1]-t[r])*a,s=.68-Math.sin(a*Math.PI)*.22,c=Y(n,mh(),o,s,0);c.rotation.y=i%2?Math.PI/2:0,e.add(c)}return e}function vh(e){let t=new z,n=e*1.75,r=1.9;for(let e of[-.87,r/2-.08])t.add(Y(rh(.06,.06,3,6),mh(),n,1.5,e));t.add(Y(Z(.5,.12,2.1999999999999997),q(7301731),n,.06,0));let i=uh(`#b3122e`,`#f6efe2`,10),a=new V(Z(2.65,.05,r),i);a.position.set(e*.38,2.33,0),a.rotation.z=e*.42,t.add(a);let o=new z;o.userData.dynamic=!0,o.position.set(-e*.82,1.8,0),o.add(Y(Z(.04,.32,r),i,0,0,0));for(let e=0;e<8;e++)o.add(Y(nh(.06,r/8,6),q(e%2?11735598:16183266),0,-.2,-.8312499999999999+e*r/8));t.add(o);for(let n of[-1.9/2,r/2]){let r=Y(Z(2.4,.3,.03),i,e*.4,2.15,n);r.rotation.z=e*.42,t.add(r)}return t.add(Y(th(.035,2.7,6),mh(),e*.42,2.38,r/2-.05)),t.add(Y(th(.035,2.7,6),mh(),e*.42,2.38,-1.9/2+.05)),t.add(Y(Z(.06,.5,.8),ch(`CAFENEA`,{bg:`#2b2620`,fg:`#f6efe2`,w:256,h:96,size:44}),n-e*.08,1.4,0)),t.userData.animate=(e,t)=>ph(o,t,.05,2.4),t}function yh(){let e=new z,t=q(3107663);e.add(Y(Z(1.9,2.2,1.6),t,0,1.1,0)),e.add(Y(Z(2.2,.15,1.9),q(7224106),0,2.3,0));let n=Y(ih(1.6,.6,4),q(9058852),0,2.68,0);n.rotation.y=Math.PI/4,e.add(n),e.add(Y(Z(1.4,.9,.05),q(2827808),0,1.45,.8)),e.add(Y(Z(1.6,.08,.35),q(13146722),0,1,.95)),e.add(Y(Z(1.4,.3,.06),ch(`FLORI`,{bg:`#f2e6c8`,fg:`#2f6b4f`,size:64}),0,2.05,.82));let r=[15087942,16758531,16748459,16777215];for(let t=0;t<4;t++){let n=-.75+t*.5;e.add(Y(rh(.17,.13,.4,7),q(7107965),n,.2,1.05));for(let i=0;i<3;i++)e.add(Y(eh(.1,6,5),q(r[(t+i)%4]),n+(i-1)*.08,.5+i*.04,1.05))}return e}function bh(){let e=new z;return e.add(Y(Z(1.7,.8,1.5),q(10393226),0,.4,0)),e.add(Y(Z(1.82,.1,1.62),q(12761516),0,.82,0)),e.add(Y(Z(1.55,.06,1.35),q(4863012),0,.86,0)),e.add(Y(rh(.1,.14,1.6,6),q(6965804),0,1.65,0)),e.add(Y(ah(.95,1),q(5214010),0,2.85,0)),e.add(Y(ah(.65,1),q(4160048),.45,2.45,.3)),e.add(Y(ah(.6,1),q(5937730),-.4,3.25,-.1)),e}function xh(){let e=new z,t=q(4864556);e.add(Y(rh(.5,.5,.05,12),q(3877664),0,.75,0)),e.add(Y(rh(.05,.08,.75,6),mh(),0,.37,0));for(let[n,r,i]of[[-.75,0,Math.PI/2],[.75,0,-Math.PI/2],[0,.72,Math.PI],[0,-.72,0]]){let a=new z;a.add(Y(Z(.42,.05,.42),t,0,.45,0)),a.add(Y(Z(.42,.5,.05),t,0,.7,-.2));for(let e of[-.18,.18])for(let t of[-.18,.18])a.add(Y(Z(.04,.45,.04),mh(),e,.22,t));a.position.set(n,0,r),a.rotation.y=i,e.add(a)}e.add(Y(rh(.04,.04,2.5,6),q(15658734),0,1.25,0));let n=Y(ih(1.25,.55,8),q(15985366),0,2.65,0);e.add(n),e.add(Y(rh(1.25,1.25,.18,8),q(15326400),0,2.32,0));for(let t of[-.2,.18])e.add(Y(rh(.05,.04,.09,6),q(16777215),t,.82,.1));return e}function Sh(e={}){let t=new z,n=q(e.frame??2001125),r=q(1710618),i=[];for(let e of[-.58,.58]){let n=new z;n.userData.dynamic=!0,n.position.set(0,.36,e),n.add(Y(oh(.33,.045,6,18),r,0,0,0).rotateY(Math.PI/2));for(let e=0;e<3;e++){let t=Y(Z(.02,.62,.02),q(12568012),0,0,0);t.rotation.x=e*Math.PI/3,n.add(t)}t.add(n),i.push(n)}let a=(e,r,i,a,o)=>{let s=Y(Z(.05,.05,e),n,r,i,a);s.rotation.x=o,t.add(s)};a(1,0,.62,.02,.15),a(.65,0,.5,-.3,-.9),a(.6,0,.5,.33,.95),t.add(Y(Z(.05,.5,.05),n,0,.68,-.18)),t.add(Y(Z(.2,.06,.28),q(2236962),0,.95,-.22)),t.add(Y(Z(.05,.45,.05),n,0,.82,.48)),t.add(Y(th(.025,.62,6),q(3355443),0,1.06,.48)),t.add(Y(Z(.22,.1,.12),q(15921906),0,.92,.6)),t.add(Y(eh(.04,5,4),new pi({color:16774856}),0,.92,.67));let o=new z;o.userData.dynamic=!0,o.position.set(0,.36,0),o.add(Y(th(.11,.06,10),q(7829367),0,0,0)),t.add(o),e.basket&&(t.add(Y(Z(.42,.26,.32),q(11569754),0,.92,.82)),t.add(Y(eh(.1,6,5),q(15087942),.08,1.08,.82)),t.add(Y(eh(.09,6,5),q(16758531),-.1,1.06,.86)));let s=dh({shirt:e.shirt??16032353,pants:e.pants??2508371,hair:e.hair??3877406,hairStyle:e.hairStyle??`helmet`,helmet:e.helmet??16777215});s.group.position.set(0,1,-.22),s.torso.rotation.x=.42;for(let e of s.arms)e.rotation.x=-1.1;return t.add(s.group),t.userData.animate=e=>{let n=e/.33;for(let e of i)e.rotation.x=n;o.rotation.x=n*.5,fh(s.legs,n*.5),t.rotation.z=Math.sin(n*.25)*.03},fh(s.legs,0),t}function Ch(){let e=new z,t=q(12107719);for(let n of[-.75,0,.75]){for(let r of[-.25,.25])e.add(Y(rh(.04,.04,.62,6),t,n+r,.31,0));e.add(Y(th(.04,.5,6),t,n,.62,0));let r=Y(oh(.25,.04,5,10),t,n,.62,0);r.scale.set(1,.6,1),e.add(r)}return e.add(Y(Z(2.1,.04,.3),q(7041144),0,.02,0)),e}function wh(){let e=new z;e.add(Y(Z(2.1,.2,.95),q(10855067),0,.1,0));let t=q(4161338);for(let n=0;n<5;n++){let r=Y(ah(.36,1),t,-.8+n*.4,.45,0);r.scale.set(1.15,.85,1.2),e.add(r)}return e}function Th(){let e=new z;e.add(Y(Z(7.4,.22,1),q(10855067),0,.11,0));let t=q(4028983);for(let n=0;n<17;n++){let r=Y(ah(.4,1),t,-3.3+n*.41,.47,0);r.scale.set(1.1,.8,1.15),e.add(r),n%2&&e.add(Y(eh(.06,5,4),q(16777215),-3.3+n*.41,.77,.25))}return e}function Eh(e){let t=new z,n=q(4014664),r=q(12158290),i=e*1.75;t.add(Y(Z(.18,2.95,.18),n,i,1.47,-.4)),t.add(Y(Z(.18,2.95,.18),n,i,1.47,.4)),t.add(Y(Z(2.9,.16,.16),n,e*.35,2.85,-.4)),t.add(Y(Z(2.9,.16,.16),n,e*.35,2.85,.4));for(let n=0;n<9;n++){let i=e*(1.45-n*.29);t.add(Y(Z(.1,1.45,.9),r,i,2.1,0))}for(let n=0;n<4;n++)t.add(Y(ah(.32,1),q(5214010),e*(1.2-n*.7),2.98,n%2*.3-.15));return t}function Dh(){let e=new z;return e.add(Y(Z(1.8,1,1.6),q(12170926),0,.5,0)),e.add(Y(Z(1.6,.06,1.4),q(4863012),0,1,0)),e.add(Y(Z(.9,.08,.25),q(12158290),0,1.04,.72)),e.add(Y(rh(.08,.11,1.5,6),q(6965804),0,1.75,0)),e.add(Y(ah(.85,1),q(7319114),0,2.85,0)),e.add(Y(ah(.55,1),q(6003260),.4,2.55,.25)),e}function Oh(){let e=new z;e.add(Y(Z(1.7,1,1),q(16777215),0,.7,0)),e.add(Y(Z(1.72,.25,1.02),q(16748459),0,.85,0)),e.add(Y(Z(1.5,.3,.06),ch(`ÎNGHEȚATĂ`,{bg:`#ffffff`,fg:`#e63970`,size:40}),0,.5,.51));for(let t of[-.65,.65])e.add(Y(nh(.2,.08,10),q(3355443),t,.2,.45));for(let t=0;t<3;t++)e.add(Y(J(`cone-down`,()=>new ea(.08,.25,6).rotateX(Math.PI)),q(14262374),-.4+t*.4,1.35,.1)),e.add(Y(eh(.1,6,5),q([16748459,16773569,9263675][t]),-.4+t*.4,1.5,.1));return e.add(Y(rh(.04,.04,1.6,6),q(14540253),.6,2,-.2)),e.add(Y(ih(1.1,.5,10),uh(`#ff8fab`,`#ffffff`,10),.6,2.9,-.2)),e}function kh(){let e=new z;e.add(Y(Z(1.4,.4,1),q(9276037),0,.2,0));let t=new z;t.userData.dynamic=!0,t.position.set(0,1.62,0);let n=q(12597547);t.add(Y(nh(1,.32,20),n,0,0,0)),t.add(Y(nh(.38,.36,12),q(8006175),0,0,0));for(let e=0;e<14;e++){let r=Y(Z(.26,.3,.32),n,0,0,0),i=e/14*Math.PI*2;r.position.set(Math.cos(i)*1.08,Math.sin(i)*1.08,0),r.rotation.z=i,t.add(r)}for(let e=0;e<5;e++){let n=Y(nh(.13,.4,8),q(8006175),Math.cos(e/5*Math.PI*2)*.65,Math.sin(e/5*Math.PI*2)*.65,0);t.add(n)}return e.add(t),e.userData.animate=(e,n)=>t.rotation.z=n*.3,e}var Ah={bench:hh,flowerBox:gh,chainPosts:_h,awningL:()=>vh(-1),awningR:()=>vh(1),kiosk:yh,treePlanter:bh,terrace:xh,cyclist:()=>Sh({frame:2792847,shirt:15320170,pants:3817304,hairStyle:`long`,hair:7027999,basket:!0}),bikeRack:Ch,hedge:wh,hedgeRow:Th,pergolaL:()=>Eh(-1),pergolaR:()=>Eh(1),cubePlanter:Dh,iceCream:Oh,gear:kh,cyclistB:()=>Sh({frame:15087942,shirt:1914199,pants:2238513,hairStyle:`helmet`,helmet:16765286})},jh=()=>new Io({color:14278372,specular:16777215,shininess:90}),Mh=null,Nh=()=>Mh??=jh();function Ph(){let e=new z,t=q(16765471),n=ch(`! UD`,{bg:`#ffd21f`,fg:`#1a1a1a`,w:128,h:128,size:54});for(let r of[-.82,.82])for(let i of[-1,1]){let a=Y(Z(.42,.75,.04),i>0?n:t,r,.37,i*.12);a.rotation.x=-i*.3,e.add(a)}let r=Y(Z(1.25,.1,.02),uh(`#ffd21f`,`#1a1a1a`,12),0,.6,0);return r.userData.keep=!0,e.add(r),e.add(Y(rh(.9,.9,.01,16),new Io({color:12575730,transparent:!0,opacity:.45,shininess:100}),.1,.012,.6)),e.userData.animate=(e,t)=>ph(r,t,.03,3),e}function Fh(){let e=new z;e.add(Y(Z(2,.42,.75),q(9133628),0,.42,0)),e.add(Y(Z(2,.12,.75),q(4013381),0,.68,0));for(let t of[-.85,.85])e.add(Y(Z(.12,.25,.6),Nh(),t,.12,0));return e}function Ih(){let e=new z,t=[-3.5,-1.2,1.2,3.5];for(let n of t)e.add(Y(rh(.22,.24,.05,12),Nh(),n,.03,0)),e.add(Y(rh(.04,.04,.85,8),Nh(),n,.45,0)),e.add(Y(eh(.07,8,6),Nh(),n,.9,0));let n=q(11735598);for(let r=0;r<t.length-1;r++)for(let i=0;i<10;i++){let a=(i+.5)/10,o=t[r]+(t[r+1]-t[r])*a,s=.82-Math.sin(a*Math.PI)*.2;e.add(Y(th(.035,.26,6),n,o,s,0))}return e}function Lh(e){let t=new z,n=e*1.75;t.add(Y(rh(.22,.22,3.4,12),q(16777215),n,1.7,0)),t.add(Y(Z(2.9,.12,.12),Nh(),e*.35,3,0));let r=new z;r.userData.dynamic=!0,r.position.set(-e*.1,3,0);let i=ch(`REDUCERI -50%`,{bg:`#e6007e`,fg:`#ffffff`,w:512,h:256,size:72});return r.add(Y(Z(2,1.55,.05),i,0,-.85,0)),r.add(Y(th(.04,2.1,6),Nh(),0,-1.65,0)),t.add(r),t.userData.animate=(e,t)=>r.rotation.x=Math.sin(t*1.8)*.05,t}function Rh(){let e=new z;e.add(Y(Z(1.9,1.05,1.5),q(16777215),0,.52,0)),e.add(Y(Z(1.95,.08,1.55),q(2830136),0,1.08,0)),e.add(Y(Z(1.7,.5,1.3),new Io({color:13626101,transparent:!0,opacity:.35,shininess:100}),0,1.38,0));let t=[5951999,16732067,16765286,10182117,1118481];for(let n=0;n<6;n++)e.add(Y(Z(.16,.3,.04),q(t[n%5]),-.6+n*.24,1.3,.4));for(let t of[-.85,.85])e.add(Y(Z(.08,1.4,.08),q(2830136),t,1.85,0));return e.add(Y(Z(1.9,.45,.12),ch(`ACCESORII GSM`,{bg:`#2b2f38`,fg:`#5ad1ff`,w:512,h:112,size:64}),0,2.55,0)),e}function zh(){let e=new z;e.add(Y(rh(.8,.6,1,14),q(15986664),0,.5,0)),e.add(Y(rh(.72,.72,.05,14),q(4863012),0,1,0)),e.add(Y(rh(.11,.16,2.2,7),q(8018490),0,2,0));let t=q(4098620),n=q(5152324);for(let r=0;r<8;r++){let i=Y(ih(.28,1.9,4),r%2?t:n,0,0,0),a=r/8*Math.PI*2;i.position.set(Math.cos(a)*.85,3,Math.sin(a)*.85),i.rotation.set(0,-a,Math.PI/2-.55),e.add(i)}return e}function Bh(){let e=new z;e.add(Y(rh(1,1,.35,18),q(16777215),0,.17,0)),e.add(Y(rh(1.02,1.02,.06,18),q(15073406),0,.36,0));let t=q(15921906);return[[-.42,10182117,2236962],[.42,16765286,3829413]].forEach(([n,r,i])=>{e.add(Y(Z(.2,.75,.2),q(i),n-.1,.78,0)),e.add(Y(Z(.2,.75,.2),q(i),n+.1,.78,0)),e.add(Y(Z(.5,.65,.3),q(r),n,1.48,0)),e.add(Y(Z(.13,.55,.13),q(r),n-.32,1.45,0)),e.add(Y(Z(.13,.55,.13),q(r),n+.32,1.45,0)),e.add(Y(rh(.06,.06,.12,6),t,n,1.86,0)),e.add(Y(eh(.19,10,8),t,n,2.08,0))}),e.add(Y(Z(.9,.3,.05),ch(`NOU`,{bg:`#e6007e`,fg:`#ffffff`,w:128,h:64,size:44}),0,2.55,0)),e.add(Y(rh(.03,.03,.3,5),Nh(),0,2.35,0)),e}function Vh(){let e=new z,t=q(15909424),n=q(4869975);e.add(Y(Z(1.25,.85,1.75),t,0,.6,-.1)),e.add(Y(Z(1.3,.25,1.8),n,0,.18,-.1)),e.add(Y(Z(1.1,.12,.9),n,0,1.08,-.45)),e.add(Y(Z(.55,.12,.5),q(2236962),0,1.2,-.45)),e.add(Y(Z(.55,.5,.1),q(2236962),0,1.45,-.72)),e.add(Y(Z(.9,.35,.5),t,0,1.15,.5));let r=Y(rh(.05,.05,.5,6),n,0,1.5,.48);r.rotation.x=-.4,e.add(r);let i=Y(oh(.2,.035,6,14),q(2236962),0,1.72,.4);i.rotation.x=-Math.PI/2+.5,i.userData.keep=!0,e.add(i),e.add(Y(Z(1.45,.2,.55),n,0,.12,.95));let a=[];for(let t of[-.36,.36]){let n=new z;n.userData.dynamic=!0,n.position.set(t,.05,.95),n.add(Y(rh(.3,.3,.08,12),q(2845872),0,0,0)),n.add(Y(Z(.5,.09,.06),q(10405352),0,0,0)),e.add(n),a.push(n)}for(let t of[-.62,.62])e.add(Y(th(.22,.16,10),q(2236962),t,.22,-.75));e.add(Y(rh(.03,.03,.55,5),n,.5,1.3,-.85));let o=new z;o.userData.dynamic=!0,o.position.set(.5,1.62,-.85),o.add(Y(rh(.1,.12,.16,8),new pi({color:16747008}),0,0,0)),o.add(Y(Z(.05,.1,.24),new pi({color:16773552}),0,0,.06)),e.add(o),e.add(Y(Z(1.3,.01,2.6),new Io({color:13624558,transparent:!0,opacity:.4,shininess:120}),0,.012,-2.2));let s=dh({shirt:16744118,pants:5593439,hair:2037522,hairStyle:`short`});s.group.position.set(0,1.26,-.42),s.torso.rotation.x=.1;for(let e of s.arms)e.rotation.x=-.95;for(let e of s.legs)e.rotation.x=.35,e.userData.shin.rotation.x=.55;s.torso.add(Y(Z(.34,.07,.31),q(16754383),0,.68,.01));for(let e=0;e<3;e++)s.torso.add(Y(eh(.018,4,3),q(16777215),0,.55-e*.14,.16));return e.add(s.group),e.userData.animate=(e,t)=>{for(let e of a)e.rotation.y=t*14;o.rotation.y=t*7,i.rotation.z=Math.sin(t*1.3)*.3,s.torso.rotation.z=Math.sin(t*1.3)*.05},e}var Hh={wetFloor:Ph,mallBench:Fh,ropeLine:Ih,bannerL:()=>Lh(-1),bannerR:()=>Lh(1),mallKiosk:Rh,palmPot:zh,mannequins:Bh,scrubber:Vh},Uh=()=>new pi({color:15268863,transparent:!0,opacity:.65,depthWrite:!1}),Wh=null,Gh=()=>Wh??=Uh();function Kh(e){return Y(J(`foam${e}`,()=>new Co(e,e+.18,20).rotateX(-Math.PI/2)),Gh(),0,.02,0)}var qh=(e,t=.05,n=2.2)=>(r,i,a)=>{e.position.y=Math.sin(i*n+a*.37)*t,e.rotation.z=Math.sin(i*n*.8+a)*.03};function Jh(){let e=new z,t=new z;t.userData.dynamic=!0,e.add(t);let n=J(`flog`,()=>new U(.36,.36,2.1,9).rotateZ(Math.PI/2));return t.add(Y(n,[q(7227948),q(12819306),q(12819306)],0,.22,0)),t.add(Y(th(.09,.6,5),q(5913122),.3,.5,.15)),t.add(Y(ah(.15),q(6262078),-.5,.55,0)),t.add(Y(Z(2.3,.02,.9),Gh(),0,.02,0)),e.userData.animate=qh(t,.06,2),e}function Yh(){let e=new z,t=new z;t.userData.dynamic=!0,e.add(t);for(let e of[-.7,0,.7])t.add(Y(eh(.36,12,9),q(16742938),e,.3,0)),t.add(Y(rh(.37,.37,.1,12),q(16777215),e,.36,0)),t.add(Kh(.36).translateX(e));return t.add(Y(th(.025,2.1,5),q(15261896),0,.3,0)),e.userData.animate=qh(t,.07,2.6),e}function Xh(){let e=new z,t=new z;t.userData.dynamic=!0,e.add(t);let n=J(`boomFloat`,()=>new U(.3,.3,.9,10).rotateZ(Math.PI/2));for(let e=0;e<8;e++){let r=-3.5+e*1;t.add(Y(n,q(e%2?16765471:16752412),r,.25,0))}t.add(Y(th(.04,7.6,5),q(4473924),0,.5,0));for(let e of[-3.9,3.9])t.add(Y(rh(.1,.1,1.1,6),q(7227948),e,.3,0)),t.add(Y(eh(.12,6,5),q(15087942),e,.88,0));return t.add(Y(Z(8,.02,.8),Gh(),0,.02,0)),e.userData.animate=qh(t,.05,1.8),e}function Zh(e){let t=new z,n=e*1.9;t.add(Y(rh(1,1.3,.45,10),q(6265412),n,.12,0)),t.add(Y(rh(.3,.42,3.4,7),q(6178352),n,1.9,0));let r=Y(ah(1.7,1),q(8365642),n-e*.4,3.9,0);r.scale.set(1.3,.7,1),t.add(r);let i=new z;i.userData.dynamic=!0,i.position.set(0,3,0);let a=J(`willowStrand`,()=>new ea(.17,1.6,4).rotateX(Math.PI).translate(0,-.8,0)),o=[q(9286487),q(7576386),q(10272870)];for(let t=0;t<12;t++){let n=e*1.5-e*t*.22;for(let e of[-.25,.25]){let r=Y(a,o[(t+ +(e>0))%3],n,0,e);r.scale.y=.95+t*7%3*.03,i.add(r)}}return i.add(Y(th(.08,3.3,5),q(6178352),e*.3,.05,0)),t.add(i),t.userData.animate=(e,t)=>{i.rotation.z=Math.sin(t*1.4)*.03,i.rotation.x=Math.sin(t*1.1)*.04},t}function Qh(){let e=new z,t=Y(ah(1),q(8223346),0,.45,0);return t.scale.set(1.05,.8,1),e.add(t),e.add(Y(ah(.6),q(9341568),.55,.3,.45)),e.add(Y(ah(.5),q(7104863),-.6,.2,-.3)),e.add(Y(rh(.6,.8,.2,9),q(6265412),0,1.15,0)),e.add(Y(rh(.07,.1,1.4,6),q(15921126),.05,1.9,0)),e.add(Y(ah(.6,1),q(9420623),.05,2.8,0)),e.add(Y(ah(.42,1),q(8040002),.35,2.45,.2)),e.add(Kh(1.05)),e}function $h(){let e=new z,t=new z;t.userData.dynamic=!0,e.add(t),t.add(Y(Z(1.9,.3,1.6),q(9069632),0,.12,0)),t.add(Y(Z(1.3,1.1,1.1),q(14267004),0,.85,0));let n=Y(J(`duckRoof`,()=>{let e=new Ma;return e.moveTo(-.85,0),e.lineTo(0,.75),e.lineTo(.85,0),e.lineTo(-.85,0),new _o(e,{depth:1.4,bevelEnabled:!1}).translate(0,0,-.7)}),q(11747630),0,1.4,0);t.add(n),t.add(Y(nh(.25,.06,10),q(2825492),0,.85,.56)),t.add(Y(Z(.5,.05,.6),q(9069632),0,.3,1.05));for(let[e,n]of[[-.6,.9],[.75,.6]]){let r=Y(eh(.25,8,6),q(16777215),e,.45,n);r.scale.set(1,.7,1.4),t.add(r),t.add(Y(eh(.14,8,6),q(16777215),e,.68,n+.25)),t.add(Y(ih(.05,.16,5),q(15769632),e,.66,n+.42).rotateX(Math.PI/2))}return t.add(Y(Z(2.1,.02,1.8),Gh(),0,.02,0)),e.userData.animate=qh(t,.05,1.6),e}function eg(){let e=new z,t=q(7227948);for(let n of[-.7,.7])for(let r of[-.55,.55])e.add(Y(rh(.16,.18,2.4,7),t,n,.9,r));e.add(Y(Z(1.9,.18,1.5),q(9069632),0,1.25,0));for(let t=0;t<5;t++)e.add(Y(Z(.34,.04,1.52),q(10122320),-.76+t*.38,1.36,0));e.add(Y(rh(.06,.06,1.3,6),q(15921906),.7,2,.55));let n=Y(J(`lifebuoy`,()=>new To(.3,.09,8,16)),uh(`#ffffff`,`#e63946`,8),.7,2.1,.62);e.add(n),e.add(Y(ah(.18),q(3095109),-.6,1.5,.2));for(let t of[-.7,.7])for(let n of[-.55,.55])e.add(Kh(.2).translateX(t).translateZ(n));return e}function tg(e={}){let t=new z,n=q(e.hull??16185074),r=q(e.seat??3120086),i=J(`pbFloat`,()=>new U(.26,.26,2.3,10).rotateX(Math.PI/2)),a=J(`pbNose`,()=>new wo(.26,10,8,0,Math.PI*2,0,Math.PI/2).rotateX(Math.PI/2));for(let e of[-.55,.55])t.add(Y(i,n,e,.12,0)),t.add(Y(a,n,e,.12,1.15));t.add(Y(Z(1.4,.16,1.8),n,0,.42,-.05)),t.add(Y(Z(1.3,.12,.7),r,0,.62,-.25)),t.add(Y(Z(1.3,.55,.12),r,0,.9,-.62));let o=new z;o.userData.dynamic=!0,o.position.set(0,.25,-1.1),o.add(Y(th(.08,.6,8),q(5592405),0,0,0));for(let e=0;e<6;e++){let t=Y(Z(.55,.06,.36),r,0,0,0);t.rotation.x=e/6*Math.PI*2,t.position.set(0,Math.sin(e/6*Math.PI*2)*.18,Math.cos(e/6*Math.PI*2)*.18),o.add(t)}return t.add(o),t.add(Y(Z(1.2,.3,.1),r,0,.6,.8)),t.userData.wheel=o,t}function ng(){let e=new z,t=new z;t.userData.dynamic=!0,e.add(t);let n=tg({seat:15909424});t.add(n);let r=dh({shirt:2792847,pants:2508371,hairStyle:`cap`,helmet:15087942});r.group.position.set(-.3,.68,-.25),r.group.scale.setScalar(.9);for(let e of r.arms)e.rotation.x=-.4;t.add(r.group);let i=dh({shirt:16748459,pants:3817304,hairStyle:`long`,hair:9067051});i.group.position.set(.32,1.56,-.25),i.group.scale.setScalar(.9);for(let e of i.legs)e.rotation.x=Math.PI/2,e.userData.shin.rotation.x=-Math.PI/2;let[a,o]=i.arms;a.userData.dynamic=!0,a.rotation.x=Math.PI+.15,o.rotation.x=-1.85,o.add(Y(Z(.1,.18,.03),q(1710618),0,-.6,.02)),o.add(Y(Z(.08,.14,.01),new pi({color:10478591}),0,-.6,.04)),t.add(i.group),t.add(Y(rh(.03,.03,.9,5),q(14540253),-.62,.95,-.85)),t.add(Y(Z(.02,.26,.4),uh(`#f2c230`,`#2f9bd6`,4),-.62,1.28,-.65)),t.add(Y(Z(1.7,.02,2.7),Gh(),0,.02,.2));let s=n.userData.wheel;return e.userData.animate=(e,n,o)=>{t.position.y=Math.sin(n*2.4+o)*.05,t.rotation.z=Math.sin(n*1.9+o)*.035,s.rotation.x=-e*1.6,fh(r.legs,e*1.6),a.rotation.z=-.35+Math.sin(n*9+o)*.35,i.torso.rotation.z=Math.sin(n*2.4+o)*.06},fh(r.legs,0),e}var rg={floatLog:Jh,buoys:Yh,boom:Xh,willowL:()=>Zh(-1),willowR:()=>Zh(1),islet:Qh,duckHouse:$h,pier:eg,pedalBoat:ng},ig=(e,t,n)=>J(`b${e},${t},${n}`,()=>new H(e,t,n)),ag=(e,t=10,n=8)=>J(`s${e},${t},${n}`,()=>new wo(e,t,n)),og=(e,t,n=8)=>J(`cx${e},${t},${n}`,()=>new U(e,e,t,n).rotateZ(Math.PI/2)),sg=(e,t,n,r=7)=>J(`cy${e},${t},${n},${r}`,()=>new U(e,t,n,r)),cg=(e,t,n=7)=>J(`co${e},${t},${n}`,()=>new ea(e,t,n)),lg=e=>J(`ic${e}`,()=>new bo(e,0)),ug=()=>q(up.snow),dg=K.laneW;function fg(){let e=new z,t=q(up.wood),n=q(up.woodLight),r=J(`log-geo`,()=>new U(.42,.42,2.2,9).rotateZ(Math.PI/2));return e.add(Y(r,[t,n,n],0,.4,0)),e.add(Y(ig(1.3,.12,.5),ug(),.1,.8,0)),e.add(Y(og(.1,.5,6),q(up.woodDark),-.3,.72,.38)),e}function pg(){let e=new z,t=q(up.wood),n=q(up.woodLight),r=J(`wlog-geo`,()=>new U(.44,.44,dg*3+.4,10).rotateZ(Math.PI/2));e.add(Y(r,[t,n,n],0,.42,0));for(let t of[-2.3,.4,2.6])e.add(Y(ig(1.5,.12,.5),ug(),t,.84,0));for(let t of[-2.9,1.7])e.add(Y(og(.1,.5,6),q(up.woodDark),t,.78,.4));return e}function mg(){let e=new z,t=Y(ag(1,10,6),q(15200763),0,0,0);t.scale.set(1.12,.72,1.05),e.add(t);for(let[t,n,r]of[[-.4,.1,.5],[.35,-.2,.38]])e.add(Y(cg(.14,r,5),q(up.ice),t,.5+r/2-.2,n));return e}function hg(e){let t=new z,n=e*1.75;t.add(Y(sg(.3,.45,6.4,7),q(up.woodDark),n,3.2,0));for(let[e,r,i]of[[4.2,1.7,2],[5.3,1.35,1.8],[6.3,.95,1.5]])t.add(Y(cg(r,i,7),q(up.pine),n,e,0)),t.add(Y(cg(r*.78,i*.5,7),ug(),n,e+i*.3,0));t.add(Y(og(.17,2.9,7),q(up.woodDark),e*.3,2.45,0));for(let e of[-.5,0,.5]){let n=Y(ag(.62,8,6),q(up.pine),e,1.95,0);n.scale.set(1,.9,.85),t.add(n);let r=Y(ag(.62,8,5),ug(),e,2.5,0);r.scale.set(1,.45,.8),t.add(r)}let r=J(`icicle`,()=>new ea(.1,.38,5).rotateX(Math.PI));for(let e of[-.6,.1,.65])t.add(Y(r,q(up.ice),e,1.5,.12));return t}function gg(){let e=new z,t=Y(lg(1),q(up.rock),0,1.15,0);t.scale.set(1,1.3,1),t.rotation.y=.6,e.add(t);let n=Y(lg(.6),q(up.rockDark),.55,.5,.5);e.add(n);let r=Y(lg(.62),ug(),-.05,2.05,0);return r.scale.set(1,.55,1),e.add(r),e}function _g(){let e=new z,t=new z,n=q(16580095);t.add(Y(ag(.9,12,10),n,0,.9,0)),t.add(Y(ag(.66,12,10),n,0,2,0)),t.add(Y(ag(.46,12,10),n,0,2.9,0)),t.add(Y(cg(.07,.4,6),q(up.orange),0,2.9,.62).rotateX(Math.PI/2));for(let e of[-.17,.17])t.add(Y(ag(.06,6,5),q(1118481),e,3.03,.4));for(let e of[1.85,2.1])t.add(Y(ag(.07,6,5),q(1118481),0,e,.64));t.add(Y(sg(.5,.5,.12,12),q(2829107),0,3.3,0)),t.add(Y(sg(.32,.32,.5,12),q(2829107),0,3.55,0)),t.add(Y(sg(.33,.33,.1,12),q(up.red),0,3.38,0));let r=Y(new To(.4,.09,6,12),q(up.red),0,2.5,0);r.rotation.x=Math.PI/2,t.add(r);for(let e of[-1,1]){let n=Y(og(.04,.9,5),q(up.woodDark),e*.95,2.1,0);n.rotation.z=e*.5,t.add(n)}return t.scale.setScalar(.8),e.add(t),e}function vg(){let e=new z;return e.add(Y(sg(.62,.78,2.4,8),q(up.woodDark),0,1.2,0)),e.add(Y(cg(.6,.7,6),q(up.wood),.05,2.75,0)),e.add(Y(cg(.3,.5,5),q(up.wood),.4,2.65,.15)),e.add(Y(sg(.66,.66,.16,8),ug(),0,2.38,0)),e.add(Y(og(.12,.9,5),q(up.woodDark),.7,1.4,.1)),e}function yg(){let e=new z,t=new z;t.position.set(0,1.2,0),t.userData.dynamic=!0,t.add(Y(ag(1.2,12,10),q(16251903),0,0,0)),t.name=`ball`;for(let[e,n,r]of[[.5,.4,.95],[-.7,.2,.85],[.1,-.7,.95],[-.3,.8,.9],[.8,-.3,.85]])t.add(Y(ag(.2,6,5),q(up.snowShade),e,n,r));return e.add(t),e.userData.animate=e=>t.rotation.x=e/1.2,e}var bg={log:fg,ridge:mg,wideLog:pg,branchL:()=>hg(-1),branchR:()=>hg(1),rock:gg,snowman:_g,stump:vg,snowball:yg,...Ah,...Hh,...rg},xg=new on;function Sg(e){e.updateMatrixWorld(!0);let t=new Map,n=[];e.traverse(r=>{if(!r.isMesh||Array.isArray(r.material)||r.userData.keep)return;let i=r.parent;for(;i!==e&&!i.userData.dynamic;)i=i.parent;xg.copy(i.matrixWorld).invert().multiply(r.matrixWorld);let a=r.geometry.index?r.geometry.toNonIndexed():r.geometry.clone();a.applyMatrix4(xg);for(let e of Object.keys(a.attributes))[`position`,`normal`,`uv`].includes(e)||a.deleteAttribute(e);a.attributes.uv||a.setAttribute(`uv`,new xr(new Float32Array(a.attributes.position.count*2),2)),a.attributes.normal||a.computeVertexNormals(),a.clearGroups(),t.has(i)||t.set(i,new Map);let o=t.get(i);o.has(r.material)||o.set(r.material,[]),o.get(r.material).push(a),n.push(r)});for(let e of n)e.parent.remove(e);for(let[e,n]of t)for(let[t,r]of n){let n=r.length===1?r[0]:op(r,!1);e.add(new V(n,t))}return e}var Cg=class{constructor(e){this.scene=e,this.free=Object.fromEntries(Object.keys(bg).map(e=>[e,[]])),this.created=0}acquire(e){let t=this.free[e].pop();return t||(t=Sg(bg[e]()),t.traverse(e=>{e.castShadow=!0,e.receiveShadow=!0}),t.userData.type=e,this.scene.add(t),this.created++),t.visible=!0,t.scale.set(1,1,1),t.rotation.set(0,0,0),t.position.y=0,t}release(e){e.visible=!1,this.free[e.userData.type].push(e)}},wg=null,Tg=null;function Eg(){let e={value:0},t=new Io({vertexColors:!0,emissive:9067008,specular:16773824,shininess:80});return t.onBeforeCompile=t=>{t.uniforms.uTime=e,t.vertexShader=t.vertexShader.replace(`#include <common>`,`#include <common>
varying vec2 vCoin;
varying float vCoinZ;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
vCoin = position.xy;
vCoinZ = (modelMatrix * vec4(position, 1.0)).z;`),t.fragmentShader=t.fragmentShader.replace(`#include <common>`,`#include <common>
uniform float uTime;
varying vec2 vCoin;
varying float vCoinZ;`).replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
        float band = (vCoin.x + vCoin.y) * 0.7;
        float ph = fract(uTime * 0.55 - vCoinZ * 0.035) * 2.2 - 0.9;
        totalEmissiveRadiance += vec3(1.0, 0.85, 0.45) * smoothstep(0.13, 0.0, abs(band - ph)) * 0.9;`)},t.userData.uTime=e,t}function Dg(){if(!wg){wg=Eg();let e=new xo([[.29,-.05],[.37,-.05],[.41,-.02],[.41,.02],[.37,.05],[.29,.05]].map(([e,t])=>new L(e,t)),20).rotateX(Math.PI/2),t=new xo([[0,-.075],[.22,-.075],[.29,-.05],[.29,.05],[.22,.075],[0,.075]].map(([e,t])=>new L(e,t)),20).rotateX(Math.PI/2),n=new U(.1,.12,.17,6).rotateX(Math.PI/2);Tg=op([dp(e,15771672),dp(t,16767311),dp(n,16773280)].map(e=>e.index?e.toNonIndexed():e))}let e=new z,t=new V(Tg,wg);return t.onBeforeRender=()=>wg.userData.uTime.value=performance.now()/1e3,e.add(t),e}var Og=class{constructor(e,{castShadow:t=!0}={}){this.scene=e,this.free=[],this.created=0,this.castShadow=t}acquire(){let e=this.free.pop();return e||(e=Dg(),e.traverse(e=>e.castShadow=this.castShadow),this.scene.add(e),this.created++),e.visible=!0,e}release(e){e.visible=!1,this.free.push(e)}},kg={magnet:16731486,board:16762161,jetpack:4638975,shield:5233003,slowmo:11766783,crown:16740312},Ag=()=>q(14673647,{emissive:2764600});function jg(){let e=new z,t=J(`magnet-arc`,()=>new To(.34,.12,8,18,Math.PI));e.add(Y(t,q(15217215,{emissive:3802376}),0,0,0));let n=J(`magnet-leg`,()=>new U(.12,.12,.26,10)),r=J(`magnet-tip`,()=>new U(.125,.125,.16,10));for(let t of[-1,1])e.add(Y(n,q(15217215,{emissive:3802376}),t*.34,-.13,0)),e.add(Y(r,Ag(),t*.34,-.33,0));return e}function Mg(){let e=new z,t=q(16762161,{emissive:5913600});e.add(Y(J(`sb-deck`,()=>new H(.5,.07,1.4)),t,0,0,0));for(let n of[-1,1]){let r=Y(J(`sb-tip`,()=>new H(.5,.07,.26)),t,0,.05,n*.76);r.rotation.x=n*.45,e.add(r)}let n=J(`sb-stripe`,()=>new H(.12,.075,.42)),r=q(16777215,{emissive:5592405});for(let[t,i,a]of[[.06,-.35,.5],[-.04,0,-.5],[.06,.35,.5]]){let o=Y(n,r,t,.01,i);o.rotation.y=a,e.add(o)}return e}function Ng(){let e=new z,t=J(`jp-tank`,()=>new U(.16,.16,.62,12)),n=J(`jp-nose`,()=>new ea(.16,.24,12)),r=J(`jp-nozzle`,()=>new U(.09,.13,.14,10));e.add(Y(J(`jp-plate`,()=>new H(.5,.56,.12)),q(3425372),0,0,-.1));for(let i of[-1,1])e.add(Y(t,Ag(),i*.19,0,.06)),e.add(Y(n,q(up.red,{emissive:3342336}),i*.19,.43,.06)),e.add(Y(r,q(2830912),i*.19,-.38,.06));return e.add(Y(J(`jp-band`,()=>new H(.62,.08,.36)),q(4638975,{emissive:735826}),0,.12,.04)),e}function Pg(){let e=new z,t=q(3124818,{emissive:735768}),n=q(14673647,{emissive:2764600}),r=q(16762161,{emissive:5913600});e.add(Y(J(`sh-rim-top`,()=>new H(.78,.5,.08)),n,0,.2,0));let i=Y(J(`sh-rim-tip`,()=>new U(.39*Math.SQRT2,0,.5,4,1).rotateY(Math.PI/4)),n,0,-.3,0);i.scale.z=.08/.78,e.add(i),e.add(Y(J(`sh-top`,()=>new H(.66,.44,.12)),t,0,.2,0));let a=Y(J(`sh-tip`,()=>new U(.33*Math.SQRT2,0,.42,4,1).rotateY(Math.PI/4)),t,0,-.23,0);a.scale.z=.12/.66,e.add(a);for(let n of[-.075,.075]){e.add(Y(J(`sh-tower`,()=>new H(.26,.34,.04)),r,0,.08,n));for(let t of[-.1,0,.1])e.add(Y(J(`sh-merlon`,()=>new H(.06,.08,.04)),r,t,.29,n));e.add(Y(J(`sh-door`,()=>new H(.08,.14,.045)),t,0,-.02,n))}return e}function Fg(){let e=new z,t=q(3813212,{emissive:1380138}),n=q(16644067,{emissive:4867638}),r=q(2761024);e.add(Y(J(`ck-rim`,()=>new U(.42,.42,.14,20).rotateX(Math.PI/2)),t,0,0,0)),e.add(Y(J(`ck-face`,()=>new U(.35,.35,.17,20).rotateX(Math.PI/2)),n,0,0,0));let i=J(`ck-mark`,()=>new H(.035,.09,.19));for(let t=0;t<12;t+=3){let n=t/12*Math.PI*2,a=Y(i,r,Math.sin(n)*.28,Math.cos(n)*.28,0);a.rotation.z=-n,e.add(a)}let a=new z;a.name=`hands`;let o=new z;o.name=`hour`,o.rotation.z=-1;let s=new z;s.name=`minute`;for(let e of[o,s])e.userData.dynamic=!0;for(let e of[-.095,.095])o.add(Y(J(`ck-hour`,()=>new H(.05,.19,.02).translate(0,.085,0)),r,0,0,e)),s.add(Y(J(`ck-min`,()=>new H(.035,.29,.02).translate(0,.13,0)),r,0,0,e));return a.add(o,s),e.add(a),e.add(Y(J(`ck-roof`,()=>new ea(.3,.36,4).rotateY(Math.PI/4)),q(13124666,{emissive:3804424}),0,.6,0)),e.add(Y(J(`ck-neck`,()=>new H(.3,.1,.16)),t,0,.43,0)),e}function Ig(){let e=new z,t=q(16764735,{emissive:6964480});e.add(Y(J(`cr-band`,()=>new U(.34,.3,.2,10,1,!0)),q(16764735,{emissive:6964480,side:2}),0,-.05,0)),e.add(Y(J(`cr-ring`,()=>new To(.31,.045,6,14).rotateX(Math.PI/2)),t,0,-.15,0));let n=J(`cr-spike`,()=>new ea(.085,.26,4)),r=J(`cr-ball`,()=>new wo(.055,6,5));for(let i=0;i<5;i++){let a=i/5*Math.PI*2;e.add(Y(n,t,Math.sin(a)*.31,.16,Math.cos(a)*.31)),e.add(Y(r,q(i%2?3842303:16727386,{emissive:i%2?666197:5570575}),Math.sin(a)*.31,.31,Math.cos(a)*.31))}return e}var Lg={magnet:jg,board:Mg,jetpack:Ng,shield:Pg,slowmo:Fg,crown:Ig};function Rg(){let e=document.createElement(`canvas`);e.width=e.height=64;let t=e.getContext(`2d`),n=t.createRadialGradient(32,32,0,32,32,32);n.addColorStop(0,`rgba(255,255,255,0.9)`),n.addColorStop(.35,`rgba(255,255,255,0.45)`),n.addColorStop(1,`rgba(255,255,255,0)`),t.fillStyle=n,t.fillRect(0,0,64,64);let r=new Yi(e);return r.colorSpace=He,r}var zg=null,Bg=null;function Vg(){let e=document.createElement(`canvas`);e.width=32,e.height=128;let t=e.getContext(`2d`),n=t.createLinearGradient(0,0,0,128);n.addColorStop(0,`rgba(255,255,255,0)`),n.addColorStop(.7,`rgba(255,255,255,0.35)`),n.addColorStop(1,`rgba(255,255,255,0.9)`),t.fillStyle=n,t.fillRect(0,0,32,128),t.globalCompositeOperation=`destination-in`;let r=t.createLinearGradient(0,0,32,0);r.addColorStop(0,`rgba(0,0,0,0)`),r.addColorStop(.5,`rgba(0,0,0,1)`),r.addColorStop(1,`rgba(0,0,0,0)`),t.fillStyle=r,t.fillRect(0,0,32,128);let i=new Yi(e);return i.colorSpace=He,i}function Hg(e){let t=new z,n=new z;n.name=`spin`;let r=Sg(Lg[e]());r.scale.setScalar(e===`board`?.95:e===`crown`?1.4:1.25),e===`board`&&r.rotation.set(.5,0,.35),r.traverse(e=>e.castShadow=!0),n.add(r),t.add(n),zg??=Rg();let i=new oi(new Kr({map:zg,color:kg[e],transparent:!0,depthWrite:!1,blending:2}));i.scale.setScalar(2.4),i.name=`halo`,t.add(i);let a=Y(J(`pu-ring`,()=>new Co(.55,.85,28).rotateX(-Math.PI/2)),new pi({color:kg[e],transparent:!0,opacity:.55,depthWrite:!1}),0,0,0);a.name=`ring`,t.add(a),Bg??=Vg();let o=6.5,s=new So(1.1,o),c=new V(op([s,s.clone().rotateY(Math.PI/2)]),new pi({map:Bg,color:kg[e],transparent:!0,opacity:.4,depthWrite:!1,blending:2,side:2,fog:!1}));return c.position.y=-K.power.pickupY+o/2,c.userData.noShadow=!0,c.renderOrder=3,c.onBeforeRender=()=>{let e=performance.now()/1e3;c.material.opacity=.32+.12*Math.sin(e*4+o),c.rotation.y=e*.8},t.add(c),t}var Ug=class{constructor(e){this.scene=e,this.free=Object.fromEntries(Object.keys(Lg).map(e=>[e,[]])),this.created=0}acquire(e){let t=this.free[e].pop();return t||(t=Hg(e),t.userData.type=e,this.scene.add(t),this.created++),t.visible=!0,t.scale.set(1,1,1),t.position.set(0,0,0),t}release(e){e.visible=!1,this.free[e.userData.type].push(e)}},Wg=class e{static live={geometries:0,materials:0};constructor(){this.geos=new Map,this.mats=new Map,this.disposed=!1}geo(t,n){let r=this.geos.get(t);return r||(r=n(),this.geos.set(t,r),e.live.geometries++),r}mat(t,n={}){let r=t+`|`+JSON.stringify(n),i=this.mats.get(r);return i||(i=new W({color:t,flatShading:!0,...n}),this.mats.set(r,i),e.live.materials++),i}box(e,t,n){return this.geo(`b${e},${t},${n}`,()=>new H(e,t,n))}sph(e,t=10,n=8,r=Math.PI*2,i=Math.PI){return this.geo(`s${e},${t},${n},${r},${i}`,()=>new wo(e,t,n,0,r,0,i))}cyl(e,t,n,r=10,i=!1){return this.geo(`c${e},${t},${n},${r},${i}`,()=>new U(e,t,n,r,1,i))}cone(e,t,n=8){return this.geo(`k${e},${t},${n}`,()=>new ea(e,t,n))}torus(e,t,n=6,r=14){return this.geo(`t${e},${t},${n},${r}`,()=>new To(e,t,n,r))}mesh(e,t,n=0,r=0,i=0,a=0,o=0,s=0){let c=new V(e,t);return c.position.set(n,r,i),c.rotation.set(a,o,s),c}compact(t){let n=[],r=new Map;for(let e of t){if(!e.isMesh||e.children.length||!e.parent){n.push(e);continue}r.has(e.parent)||r.set(e.parent,new Map);let t=r.get(e.parent);t.has(e.material)||t.set(e.material,[]),t.get(e.material).push(e)}for(let[t,i]of r)for(let[r,a]of i){if(a.length===1){n.push(a[0]);continue}let i=a.map(e=>{e.updateMatrix();let t=e.geometry.index?e.geometry.toNonIndexed():e.geometry.clone();t.applyMatrix4(e.matrix);for(let e of Object.keys(t.attributes))[`position`,`normal`,`uv`].includes(e)||t.deleteAttribute(e);return t}),o=op(i,!1);for(let e of i)e.dispose();this.geos.set(`merged#${this.geos.size}`,o),e.live.geometries++;for(let e of a)e.removeFromParent();let s=new V(o,r);t.add(s),n.push(s)}return n}dispose(){if(!this.disposed){this.disposed=!0;for(let e of this.geos.values())e.dispose();for(let e of this.mats.values())e.dispose();e.live.geometries-=this.geos.size,e.live.materials-=this.mats.size,this.geos.clear(),this.mats.clear()}}},Gg=Object.freeze({jacket:14236464,hem:16777215,pants:1914199,boots:2239034,mitten:2989275,skin:15910048,hat:2989275,pompom:16777215,strap:1778224,lens:8376831,cap:14236464,hair:4861466,scarf:16764735}),Kg=(e,t,...n)=>{for(let r of n)e.add(r),t.push(r)},qg=Object.freeze({clasic:{id:`clasic`,colors:{},winter:[`hem`,`hat`,`pompom`,`strap`,`lens`,`scarf`,`scarfTail`],summer:[`hem`,`cap`,`visor`,`hair`,`eyes`],build:null},schior:{id:`schior`,colors:{jacket:1402304,hem:16777215,pants:1402304,boots:15331061,mitten:1120295,strap:1120295,lens:16752412},winter:[`hem`,`strap`,`lens`],summer:[`hem`,`strap`,`lens`],build(e,t){let n=[],r=[],i=e.mat(16777215),a=e.mat(15087942);Kg(t.head,n,e.mesh(e.sph(.31,12,8,Math.PI*2,Math.PI*.6),i,0,.04,0)),Kg(t.head,n,e.mesh(e.box(.1,.05,.5),a,0,.325,0));for(let r of[-1,1])Kg(t.head,n,e.mesh(e.sph(.09,8,6),e.mat(1120295),r*.28,-.08,.02));let o=(n,r)=>{Kg(t.torso,r,e.mesh(e.box(.5,.44,.03),i,0,.47,n)),Kg(t.torso,r,e.mesh(e.box(.2,.055,.04),a,0,.6,n)),Kg(t.torso,r,e.mesh(e.box(.055,.28,.04),a,.03,.46,n,0,0,n<0?.32:-.32))};o(-.225,n),o(.225,r);for(let r of[t.armL,t.armR])Kg(r,n,e.mesh(e.box(.21,.5,.06),i,0,-.28,0));return{always:n,noJet:r}}},salvamont:{id:`salvamont`,colors:{jacket:14034984,hem:1914199,pants:1914199,boots:4862752,mitten:1120295,hat:14034984,pompom:16777215,cap:14034984},winter:[`hem`,`hat`,`pompom`,`eyes`],summer:[`hem`,`cap`,`visor`,`hair`,`eyes`],build(e,t){let n=[],r=[],i=[],a=e.mat(16777215),o=e.mat(1914199);Kg(t.torso,n,e.mesh(e.box(.68,.16,.44),o,0,.72,0)),Kg(t.torso,n,e.mesh(e.box(.26,.08,.03),a,0,.42,-.225),e.mesh(e.box(.08,.26,.03),a,0,.42,-.225)),Kg(t.torso,n,e.mesh(e.torus(.15,.04,5,12),e.mat(15764004),-.36,.16,0,0,Math.PI/2,0));let s=e.mat(2509427);return Kg(t.torso,i,e.mesh(e.box(.46,.5,.2),s,0,.42,.31)),Kg(t.torso,i,e.mesh(e.cyl(.09,.09,.46,8),e.mat(15764004),0,.74,.3,0,0,Math.PI/2)),Kg(t.torso,i,e.mesh(e.box(.2,.06,.02),a,0,.45,.415),e.mesh(e.box(.06,.2,.02),a,0,.45,.415)),Kg(t.head,r,e.mesh(e.torus(.285,.025,5,14),o,0,.09,0,Math.PI/2,0,0)),Kg(t.head,r,e.mesh(e.box(.11,.09,.07),e.mat(16774064,{emissive:9075232}),0,.1,-.3)),{always:n,winter:r,noJet:i}}},junii:{id:`junii`,colors:{jacket:16118246,pants:1579035,boots:1579035,mitten:15910048,hair:2825492},winter:[`eyes`,`hair`],summer:[`eyes`,`hair`],build(e,t){let n=[],r=e.mat(1579035),i=e.mat(13934615,{emissive:3811840});for(let a of[-1,1])Kg(t.torso,n,e.mesh(e.box(.2,.58,.03),r,a*.22,.48,-.225)),Kg(t.torso,n,e.mesh(e.box(.03,.58,.035),i,a*.115,.48,-.226)),Kg(t.torso,n,e.mesh(e.box(.03,.58,.44),r,a*.335,.48,0));Kg(t.torso,n,e.mesh(e.box(.66,.58,.03),r,0,.48,.225));let a=[11135,16568598,13504806];a.forEach((r,i)=>Kg(t.torso,n,e.mesh(e.box(.7,.055,.46),e.mat(r),0,.05+i*.055,0))),Kg(t.head,n,e.mesh(e.cyl(.25,.285,.36,10),e.mat(1380879),0,.32,0)),a.forEach((r,i)=>Kg(t.head,n,e.mesh(e.box(.045,.1,.03),e.mat(r),(i-1)*.045,.32,-.275)));for(let r of[t.armL,t.armR])Kg(r,n,e.mesh(e.box(.215,.07,.235),e.mat(13504806),0,-.5,0));return{always:n}}},stegar:{id:`stegar`,colors:{jacket:16765440,hem:1579035,pants:1579035,boots:2763306,mitten:1579035,hat:16765440,pompom:1579035,cap:16765440,scarf:16765440},winter:[`hem`,`hat`,`pompom`,`scarf`,`scarfTail`,`eyes`],summer:[`hem`,`cap`,`visor`,`hair`,`eyes`,`scarf`,`scarfTail`],build(e,t){let n=[],r=[],i=e.mat(1579035);for(let a of[-1,1])Kg(t.torso,n,e.mesh(e.box(.1,.62,.03),i,a*.17,.47,-.225)),Kg(t.torso,r,e.mesh(e.box(.1,.62,.03),i,a*.17,.47,.225));for(let r of[t.armL,t.armR])Kg(r,n,e.mesh(e.box(.21,.1,.23),i,0,-.2,0),e.mesh(e.box(.21,.1,.23),i,0,-.44,0));for(let r of[-.2,.1])Kg(t.scarfTail,n,e.mesh(e.box(.145,.105,.14),i,0,0,r));return{always:n,noJet:r}}},mascota:{id:`mascota`,colors:{jacket:10119740,pants:10119740,boots:5978652,mitten:5978652,scarf:14034984},winter:[`scarf`,`scarfTail`,`eyes`],summer:[`eyes`],build(e,t){let n=[],r=[],i=e.mat(10119740),a=e.mat(5978652),o=e.mat(14862236);Kg(t.head,n,e.mesh(e.sph(.315,12,8,Math.PI*2,Math.PI*.62),i,0,.03,.04,.38,0,0));for(let r of[-1,1])Kg(t.head,n,e.mesh(e.sph(.105,8,6),i,r*.21,.3,.06)),Kg(t.head,n,e.mesh(e.sph(.055,6,5),o,r*.21,.3,-.01)),Kg(t.head,n,e.mesh(e.sph(.03,5,4),e.mat(1118481),r*.09,.27,-.2));return Kg(t.head,n,e.mesh(e.sph(.085,8,6),o,0,.2,-.25)),Kg(t.head,n,e.mesh(e.sph(.035,6,5),e.mat(1118481),0,.22,-.325)),Kg(t.torso,n,e.mesh(e.box(.38,.46,.03),o,0,.38,-.225)),Kg(t.torso,r,e.mesh(e.sph(.1,8,6),a,0,.1,.26)),{always:n,noJet:r}}}});Object.freeze(Object.keys(qg));var Jg=class{constructor(e){this.root=new z,e.add(this.root);let t=(e,t,n)=>J(`b${e},${t},${n}`,()=>new H(e,t,n)),n=(e,t=12,n=9)=>J(`s${e},${t},${n}`,()=>new wo(e,t,n)),r=(e,t,n,r,i,a,o,s)=>{let c=Y(e,t,n,r,i);return c.scale.set(a,o,s),c},i=new z;this.boardMat=q(up.blue),this.boardGold=q(16762161,{emissive:6964480}),this.deckParts=[];let a=Y(t(.62,.09,2.1),this.boardMat,0,.06,0);i.add(a),this.deckParts.push(a),i.add(Y(t(.2,.095,1.6),q(16777215),0,.065,0));for(let e of[-1,1]){let n=Y(t(.62,.09,.36),this.boardMat,0,.12,e*1.1);n.rotation.x=e*.4,i.add(n),this.deckParts.push(n)}for(let e of[-.5,.5])i.add(Y(t(.36,.1,.3),q(2239034),0,.15,e));this.root.add(i),this.board=i;let o=new z;this.skateMat=q(2763312),this.skateParts=[];let s=Y(t(.5,.06,1.6),this.skateMat,0,.2,0);o.add(s),this.skateParts.push(s),o.add(Y(t(.42,.065,1.2),q(15087942),0,.205,0));for(let e of[-1,1]){let n=Y(t(.5,.06,.3),this.skateMat,0,.25,e*.9);n.rotation.x=e*.35,o.add(n),this.skateParts.push(n),o.add(Y(t(.36,.06,.12),q(12107719),0,.14,e*.55))}this.skateWheels=[];for(let e of[-.55,.55])for(let t of[-.2,.2]){let n=Y(J(`skwheel`,()=>new U(.075,.075,.08,10).rotateZ(Math.PI/2)),q(16773569),t,.08,e);o.add(n),this.skateWheels.push(n)}o.visible=!1,this.root.add(o),this.skate=o;let c=new z;this.bikeMat=q(2989275),this.bikeParts=[];let l=(e,n,r,i,a,o,s=0)=>{let l=Y(t(e,n,r),this.bikeMat,i,a,o);l.rotation.x=s,c.add(l),this.bikeParts.push(l)},u=new z;u.position.set(0,.66,-.56),u.rotation.x=.194,this.bikeSteer=new z;let d=new z;d.rotation.x=-.194,d.position.copy(u.position).applyEuler(new gn(-.194,0,0)).negate(),this.bikeSteer.add(d),u.add(this.bikeSteer),c.add(u),this.bikeWheels=[];for(let e of[-.62,.62]){let n=new z;n.position.set(0,.36,e),n.add(Y(J(`bkTire`,()=>new To(.33,.05,6,18).rotateY(Math.PI/2)),q(1710618),0,0,0));for(let e=0;e<3;e++){let r=Y(t(.02,.62,.02),q(13686235),0,0,0);r.rotation.x=e*Math.PI/3,n.add(r)}n.add(Y(J(`bkHub`,()=>new U(.05,.05,.12,8).rotateZ(Math.PI/2)),q(8947848),0,0,0)),(e<0?d:c).add(n),this.bikeWheels.push(n)}l(.06,.06,.7,0,.86,-.15),l(.06,.06,.67,0,.58,-.25,.72),l(.06,.58,.06,0,.63,.09,.32),l(.05,.05,.62,0,.36,.31),l(.05,.05,.68,0,.62,.4,.87),l(.05,.52,.05,0,.6,-.56,.24),d.add(this.bikeParts[this.bikeParts.length-1]),d.add(Y(t(.06,.2,.06),q(12107719),0,.97,-.5)),d.add(Y(J(`bkBar`,()=>new U(.025,.025,.62,6).rotateZ(Math.PI/2)),q(3355443),0,1.06,-.5));for(let e of[-1,1])d.add(Y(t(.06,.06,.1),q(2236962),e*.3,1.06,-.5));c.add(Y(t(.2,.07,.3),q(2236962),0,.93,.2)),d.add(Y(t(.16,.1,.1),q(15921906),0,.9,-.66)),c.add(Y(t(.14,.06,.04),q(15087942),0,.88,.48));let f=new z;f.position.set(0,.36,0),f.add(Y(J(`bkSprocket`,()=>new U(.11,.11,.05,12).rotateZ(Math.PI/2)),q(7829367),.06,0,0));for(let e of[-1,1]){let t=Y(J(`bkCrank`,()=>new H(.04,.3,.05).translate(0,-.13,0)),q(6710886),e*.12,0,0);t.rotation.x=e>0?Math.PI:0,f.add(t)}c.add(f),this.bikeCrank=f,c.visible=!1,this.root.add(c),this.bike=c;let p=tg({seat:3120086});p.rotation.y=Math.PI,p.visible=!1,this.root.add(p),this.hull=p,this.hullParts=[],p.traverse(e=>{e.isMesh&&e.material===q(16185074)&&this.hullParts.push(e)}),this.hullMat=q(16185074),this.body=new z,this.root.add(this.body);let m={};for(let[e,t]of Object.entries(Gg))m[e]=new W({color:t,flatShading:!0});this.skinMats=m;let h=m.pants;this.legs=[];for(let e of[-.5,.5]){let i=new z;i.position.set(0,.2,e),i.add(Y(t(.24,.9,.26),h,0,.45,0)),i.add(r(n(.5,10,8),m.boots,0,.07,-.06,.34,.2,.52)),i.rotation.x=e>0?-.44:.44,this.body.add(i),this.legs.push(i)}this.seatLegs=[];for(let e of[-.14,.14]){let i=new z;i.position.set(e,1.02,0);let a=Y(t(.22,.22,.55),h,0,0,-.26);i.add(a);let o=new z;o.position.set(0,0,-.52),o.add(Y(t(.2,.55,.2),h,0,-.26,0)),o.add(r(n(.5,10,8),m.boots,0,-.55,-.08,.27,.17,.44)),i.add(o),i.userData.shin=o,i.visible=!1,this.body.add(i),this.seatLegs.push(i)}this.torso=new z,this.torso.position.set(0,1.02,0),this.torso.rotation.y=-.75,this.body.add(this.torso),this.torso.add(Y(t(.66,.78,.42),m.jacket,0,.4,0));let g=Y(t(.7,.14,.46),m.hem,0,.1,0);this.torso.add(g),this.armL=new z,this.armR=new z;for(let[e,r]of[[this.armL,-1],[this.armR,1]])e.position.set(r*.42,.72,0),e.add(Y(t(.2,.62,.22),m.jacket,0,-.28,0)),e.add(Y(n(.13,8,6),m.mitten,0,-.62,0)),this.torso.add(e);let _=new z;_.position.set(0,.99,0),_.scale.setScalar(1.14),_.add(Y(n(.27),m.skin,0,0,0));let v=Y(J(`hat`,()=>new wo(.3,12,8,0,Math.PI*2,0,Math.PI*.58)),m.hat,0,.04,0);_.add(v);let y=Y(n(.1,8,6),m.pompom,0,.34,0);_.add(y);let b=Y(t(.46,.14,.1),m.strap,0,.02,-.26),x=Y(t(.32,.11,.06),m.lens,0,.02,-.3);_.add(b,x);let S=Y(J(`pcap`,()=>new wo(.29,12,6,0,Math.PI*2,0,Math.PI*.5)),m.cap,0,.05,0),C=Y(t(.34,.04,.26),m.cap,0,.07,-.33),w=Y(t(.5,.14,.2),m.hair,0,-.06,.18),T=new z;for(let e of[-.095,.095])T.add(Y(n(.052,8,6),q(16777215),e,.03,-.235)),T.add(Y(n(.034,6,5),q(1710618),e,.03,-.275));Sg(T);let E=new z;E.add(r(n(.5,8,6),m.skin,0,-.05,-.27,.1,.09,.09));for(let e of[-.15,.15])E.add(r(n(.5,8,6),q(15899274),e,-.08,-.22,.1,.06,.05));E.add(Y(t(.1,.025,.03),q(9058864),0,-.14,-.245)),Sg(E),_.add(S,C,w,T,E),this.head=_,this.torso.add(_);let D=Y(J(`scarf`,()=>new To(.27,.08,6,12)),m.scarf,0,.8,0);D.rotation.x=Math.PI/2,this.torso.add(D),this.scarfTail=Y(t(.14,.1,.7),m.scarf,.12,.76,.45),this.torso.add(this.scarfTail),this.baseParts={hem:g,hat:v,pompom:y,strap:b,lens:x,cap:S,visor:C,hair:w,eyes:T,scarf:D,scarfTail:this.scarfTail},this.face=E,this.winter=!0,this.kit=null,this.extras={always:[],winter:[],summer:[],noJet:[]},this.castShadows=!0,this.skinId=null,this.ride=`snowboard`,this.magnetProp=jg(),this.magnetProp.scale.setScalar(.62),this.magnetProp.position.set(0,-.86,0),this.armR.add(this.magnetProp),this.jetProp=Ng(),this.jetProp.position.set(0,.42,.34),this.torso.add(this.jetProp);let ee=J(`jp-flame`,()=>new ea(.11,.6,10).rotateX(Math.PI).translate(0,-.3,0)),O=new pi({color:16753210,transparent:!0,opacity:.9,blending:2,depthWrite:!1}),k=new pi({color:16774064,transparent:!0,opacity:.95,blending:2,depthWrite:!1});this.flames=[];for(let e of[-1,1]){let t=new z;t.position.set(e*.19,-.45,.06),t.add(new V(ee,O));let n=new V(ee,k);n.scale.set(.5,.6,.5),t.add(n),this.jetProp.add(t),this.flames.push(t)}this.magnetProp.visible=!1,this.jetProp.visible=!1;let A=new pi({color:7208864,transparent:!0,opacity:.13,depthWrite:!1,blending:2}),te=new pi({color:13238233,transparent:!0,opacity:.6,depthWrite:!1,blending:2});this.shieldProp=new z,this.shieldProp.position.set(0,1,0);let ne=new V(J(`shield-bubble`,()=>new wo(1.3,20,14)),A);ne.scale.set(1,1.08,1),this.shieldProp.add(ne),this.shieldRing=new z,this.shieldRing.add(new V(J(`shield-ring`,()=>new To(1.32,.03,5,40).rotateX(Math.PI/2)),te));for(let e=0;e<12;e++){let t=e/12*Math.PI*2,n=new V(J(`shield-merlon`,()=>new H(.2,.2,.05)),te);n.position.set(Math.sin(t)*1.32,.12,Math.cos(t)*1.32),n.rotation.y=t,this.shieldRing.add(n)}Sg(this.shieldRing),this.shieldProp.add(this.shieldRing),this.shieldProp.traverse(e=>e.userData.noShadow=!0),this.shieldProp.visible=!1,this.root.add(this.shieldProp),this.shieldMat=A,this.clockProp=Sg(Fg()),this.clockProp.traverse(e=>e.userData.noShadow=!0),this.clockProp.scale.setScalar(.7),this.clockProp.position.set(.85,2.15,.1),this.clockHands=this.clockProp.getObjectByName(`hands`),this.clockProp.visible=!1,this.root.add(this.clockProp),this.shadow=Y(J(`shadow`,()=>new $i(.95,16).rotateX(-Math.PI/2)),new pi({color:1715274,transparent:!0,opacity:.2,depthWrite:!1}),0,.04,0),e.add(this.shadow);let j=()=>({x:0,v:0});this.roll=j(),this.yaw=j(),this.sq=j(),this.hop=j(),this.flinch=j(),this.joy=j(),this.crouch=j(),this.look=0,this.airK=0,this.deadK=0,this.airT=-1,this.superAir=!1,this.flipDir=1,this.flipA=0,this.spinA=0,this.barA=0,this.lastVy=0,this.blinkT=2,this.t=0,this.tumble=0,this.tumbleTotal=.55,this.flicker=!1,this.goldBoard=!1,this.blob=!0,this.setSkin(`clasic`)}setSkin(e){let t=qg[e]??qg.clasic;if(t.id===this.skinId)return;for(let e of Object.values(this.extras))for(let t of e)t.removeFromParent();this.kit?.dispose(),this.kit=new Wg;for(let[e,n]of Object.entries(this.skinMats))n.color.setHex(t.colors[e]??Gg[e]);let n={torso:this.torso,head:this.head,armL:this.armL,armR:this.armR,scarfTail:this.scarfTail},r=t.build?t.build(this.kit,n):{},i=e=>this.kit.compact(e??[]);this.extras={always:i(r.always),winter:i(r.winter),summer:i(r.summer),noJet:i(r.noJet)};for(let e of Object.values(this.extras))for(let t of e)t.traverse(e=>e.castShadow=this.castShadows);this.skin=t,this.skinId=t.id,this._applyOutfit()}_applyOutfit(){let e=this.skin;if(!e)return;let t=new Set(this.winter?e.winter:e.summer);for(let[e,n]of Object.entries(this.baseParts))n.visible=t.has(e);for(let e of this.extras.winter)e.visible=this.winter;for(let e of this.extras.summer)e.visible=!this.winter}dispose(){for(let e of Object.values(this.extras))for(let t of e)t.removeFromParent();this.extras={always:[],winter:[],summer:[],noJet:[]},this.kit?.dispose(),this.kit=null,this.skinId=null;for(let e of Object.values(this.skinMats))e.dispose()}setBlobShadow(e){this.blob=e,this.shadow.visible=e}_setGold(e){if(e!==this.goldBoard){this.goldBoard=e;for(let t of this.deckParts)t.material=e?this.boardGold:this.boardMat;for(let t of this.skateParts)t.material=e?this.boardGold:this.skateMat;for(let t of this.hullParts)t.material=e?this.boardGold:this.hullMat;for(let t of this.bikeParts)t.material=e?this.boardGold:this.bikeMat}}_seat(){return this.ride===`boat`?{y:-.36,z:0}:this.ride===`bike`?{y:-.08,z:.16}:{y:0,z:0}}setRide(e,t){this.ride=e,this.board.visible=e===`snowboard`,this.skate.visible=e===`skate`,this.hull.visible=e===`boat`,this.bike.visible=e===`bike`;let n=e===`boat`||e===`bike`;for(let e of this.legs)e.visible=!n;for(let e of this.seatLegs)e.visible=n;this.torso.rotation.y=n?0:-.75;let r=this._seat();this.body.position.set(0,r.y,r.z),this.winter=!!t,this._applyOutfit();let i=this.goldBoard;this.goldBoard=!i,this._setGold(i)}startTumble(){this.tumble=this.tumbleTotal}reset(){for(let e of[this.roll,this.yaw,this.sq,this.hop,this.flinch,this.joy,this.crouch])e.x=e.v=0;this.look=this.airK=this.deadK=this.flipA=this.spinA=this.barA=0,this.airT=-1,this.tumble=0,this.root.visible=!0,this.root.rotation.set(0,0,0),this.body.scale.set(1,1,1);let e=this._seat();this.body.position.set(0,e.y,e.z),this.flicker=!1,this.magnetProp.visible=!1,this.jetProp.visible=!1,this.shieldProp.visible=!1,this.clockProp.visible=!1,this._setGold(!1)}_headBase(){return this.ride===`boat`||this.ride===`bike`?0:.55}_onEvents(e,t){for(let t of e)if(t===`jump`||t===`superjump`)this.sq.x=-.13,this.sq.v=t===`superjump`?12:9,this.airT=0,this.superAir=t===`superjump`,this.flipDir=Math.random()<.5?-1:1,this.hop.v+=1.2;else if(t===`land`){let e=Math.min(1,this.lastVy/11);this.sq.x=-.08-.14*e,this.sq.v=0,this.hop.v+=this.ride===`boat`?2.6+2*e:.4,this.airT=-1}else t===`nearMiss`?this.flinch.v+=7:t===`coin`?this.joy.v+=3.2:t===`slide`&&(this.sq.v-=1.5)}update(e,t,n={}){this.t+=t;let r=this.root;r.position.set(e.x,e.y,0);let i=this.t,a=Math.min(t,1/30),o=this.ride===`boat`,s=this.ride===`bike`,c=this.ride===`skate`,l=o||s,u=n.speedK??0,d=n.state===`menu`;n.events&&n.events.length&&t>0&&this._onEvents(n.events,e),e.grounded||(this.lastVy=-e.vy),e.grounded||e.flying?this.airT=-1:this.airT<0?this.airT=0:this.airT+=t;let f=this.airT>=0?Math.min(1,this.airT/(this.superAir?1:.68)):0;if(t>0){let r=Pt.clamp(e.laneVel,-30,30),i=Pt.clamp(-r*(o?.016:.012),-.5,.5),s=-r*(o?.03:.008),c=2*Math.sqrt(240)*.8;for(let t=0;t<2;t++){let t=a/2;this.roll.v+=((i-this.roll.x)*240-this.roll.v*c)*t,this.roll.x+=this.roll.v*t,this.yaw.v+=((s-this.yaw.x)*160-this.yaw.v*2*Math.sqrt(160)*.8)*t,this.yaw.x+=this.yaw.v*t,this.sq.v+=(-this.sq.x*420-this.sq.v*2*Math.sqrt(420)*.32)*t,this.sq.x+=this.sq.v*t,this.hop.v+=(-this.hop.x*300-this.hop.v*2*Math.sqrt(300)*.22)*t,this.hop.x+=this.hop.v*t,this.flinch.v+=(-this.flinch.x*260-this.flinch.v*2*Math.sqrt(260)*.35)*t,this.flinch.x+=this.flinch.v*t,this.joy.v+=(-this.joy.x*260-this.joy.v*2*Math.sqrt(260)*.3)*t,this.joy.x+=this.joy.v*t;let n=+!!e.sliding;this.crouch.v+=((n-this.crouch.x)*700-this.crouch.v*2*Math.sqrt(700)*.85)*t,this.crouch.x+=this.crouch.v*t}this.sq.x=Pt.clamp(this.sq.x,-.3,.3),this.crouch.x=Pt.clamp(this.crouch.x,-.05,1.08);let l=1-Math.exp(-10*t);this.look+=(Pt.clamp(-r*.035,-.6,.6)-this.look)*l,this.airK+=(+(f>0||!e.grounded)-this.airK)*(1-Math.exp(-14*t)),this.deadK+=(+!!n.dead-this.deadK)*(1-Math.exp(-9*t)),this.blinkT-=t,this.blinkT<-.12&&(this.blinkT=2+Math.random()*3)}let p=this.crouch.x;this.crouchView=p;let m=Pt.clamp(e.vy*.016,-.35,.3),h=n.riding===!1?0:o?Math.sin(i*2.3)*.045:Math.sin(i*9)*.025*(e.grounded?1:.3),g=m+(o&&e.grounded?Math.sin(i*2.9+1)*.03:0)+(o&&!e.grounded?-.12*Math.sin(Math.min(1,f*1.6)*Math.PI):0),_=this.roll.x+h,v=n.previewYaw===void 0?this.yaw.x:n.previewYaw,y=0;if(o&&e.grounded&&(y=Math.sin(i*2.3)*.045+.02),o&&(y+=Math.max(-.12,this.hop.x)*.5),this.tumble>0&&t>0&&(this.tumble=Math.max(0,this.tumble-t)),this.tumble>0){let e=1-this.tumble/this.tumbleTotal;g=-(e*e*(3-2*e))*Math.PI*2+m*(1-e),_+=Math.sin(e*Math.PI*2)*.35,y+=Math.sin(e*Math.PI)*.7}g=g*(1-this.deadK)+(o?-.35:-1.1)*this.deadK,y+=.1*this.deadK;let b=this.ride===`snowboard`,x=Math.PI*2;if(this.airT>=0&&!e.flying&&!n.dead&&this.tumble<=0&&b)this.spinA=Pt.smoothstep(f,.06,.8)*x*(this.superAir?2:1)*this.flipDir;else if(this.spinA){let e=Math.round(this.spinA/x)*x;this.spinA+=(e-this.spinA)*(1-Math.exp(-22*t)),(Math.abs(e-this.spinA)<.05||t<=0)&&(this.spinA=0)}this.spinA&&b&&(v+=this.spinA),s&&this.airT>=0&&!e.flying&&!n.dead&&this.tumble<=0&&(v+=.6*this.flipDir*Math.sin(Pt.clamp((f-.04)/.92,0,1)*Math.PI)),r.rotation.set(g,v,_),r.position.y+=y;let S=.18*this.airK,C=d?Math.sin(i*2.2)*.012:0,w=this.sq.x;this.body.scale.set(1-w*.55,(1-.46*p-S)*(1+w)+C,1-w*.55);let T=l?0:.2*u*(1-p),E=.85*p-(s?.35*(1-p):0)+T-.3*this.flinch.x;this.torso.rotation.z=Pt.clamp(-this.roll.x*.5,-.3,.3);let D=e.grounded?Math.sin(i*6)*.3:0,ee=e.grounded?0:.9,O=this.roll.x*1.6,k=-.4-D-ee-O-this.flinch.x*1.2,A=.4+D+ee-O+this.flinch.x*1.2,te=-this.joy.x*1.2,ne=-this.joy.x*1.2,j=-.45*p+this.joy.x*.4+this.flinch.x*.2,re=this._headBase()+this.look;d&&(re+=Math.sin(i*.8)*.3),d&&(k+=Math.sin(i*1.7)*.06);let M=this.deadK,ie=f,ae=(e,t)=>{let n=Pt.clamp((ie-e)/(t-e),0,1);return Math.sin(n*Math.PI)},oe=this.board;oe.rotation.set(0,0,0),oe.position.set(0,0,0);let se=this.skate;se.rotation.set(0,0,0),se.position.set(0,0,0);let ce=this.bike;ce.rotation.set(0,0,0),ce.position.set(0,0,0);let le=this._seat();this.body.position.set(0,le.y,le.z),this.body.rotation.set(0,0,0),this.hull.position.y=0;let ue=0;if(s||(this.barA=0),this.airT>=0&&!e.flying){if(this.ride===`snowboard`){let e=Math.min(1,ae(.1,.92)*1.6);oe.rotation.z=.22*e,oe.rotation.x=-.18*e,E+=.35*e,A=A*(1-e)+(.15+this.roll.x)*e,ne=ne*(1-e)+.9*e,k=k*(1-e)+-1.5*e,j+=.15*e}else if(c){let e=Pt.smoothstep(ie,.1,.72)*Math.PI*2*this.flipDir;this.flipA=e;let t=Math.cos(e),n=Math.sin(e);se.rotation.z=e,se.position.set(.2*n,.2-.2*t,0),E-=.12*ae(.1,.9),k-=.4*ae(.1,.9),A+=.4*ae(.1,.9)}else if(s){let e=ae(.05,.95),t=.3*e;this._pivot(ce,t,.36,.62),this.body.rotation.x=t*.9,this._pivotPos(this.body,t*.9,.36,.62,le),E-=.1*e,this.barA=Pt.smoothstep(ie,.12,.74)*Math.PI*2*this.flipDir,ue=ae(.08,.8)}else o&&(this.hull.position.y=.05*ae(0,1))}else if(s&&this.barA){let e=Math.round(this.barA/(Math.PI*2))*Math.PI*2;this.barA+=(e-this.barA)*(1-Math.exp(-22*t)),(Math.abs(e-this.barA)<.05||t<=0)&&(this.barA=0)}else c&&this.flipA&&(this.flipA+=(Math.round(this.flipA/(Math.PI*2))*Math.PI*2-this.flipA)*(1-Math.exp(-22*t)),Math.abs(Math.round(this.flipA/(Math.PI*2))*Math.PI*2-this.flipA)<.05&&(this.flipA=0),se.rotation.z=this.flipA,se.position.set(.2*Math.sin(this.flipA),.2-.2*Math.cos(this.flipA),0));if(this.torso.rotation.x=E,this.bikeSteer.rotation.y=this.barA,o){let r=n.speed??15;this.pedalPhase=(this.pedalPhase??0)+t*(4+r*.25);for(let t=0;t<this.seatLegs.length;t++){let n=this.pedalPhase+t*Math.PI;this.seatLegs[t].rotation.x=-.2+Math.sin(n)*.32-(e.grounded?0:.35),this.seatLegs[t].userData.shin.rotation.x=-.25+Math.cos(n)*.35}this.hull.userData.wheel.rotation.x=this.pedalPhase*1.4,e.grounded&&(k=-.25-O,A=.25-O,te=.35,ne=.35)}else if(s){let e=t*(n.speed??15)/.33;for(let t of this.bikeWheels)t.rotation.x-=e;this.pedalPhase=(this.pedalPhase??0)+e*.45,this.bikeCrank.rotation.x=-this.pedalPhase;for(let e=0;e<this.seatLegs.length;e++){let t=this.pedalPhase+e*Math.PI;this.seatLegs[e].rotation.x=-.42+Math.sin(t)*.28,this.seatLegs[e].userData.shin.rotation.x=-.3+Math.cos(t)*.35}k=-.15-O*.5-.7*ue,A=.15-O*.5+.7*ue,te=.95-this.flinch.x*.8-.55*ue,ne=.95-this.flinch.x*.8-.55*ue}else{if(c){let e=t*(n.speed??15)*9;for(let t of this.skateWheels)t.rotation.x-=e}let r=c&&e.grounded?Math.sin(i*5)*.06:0;this.legs[0].rotation.x=.44+.2*this.airK+r,this.legs[1].rotation.x=-.44-.2*this.airK+r}if(this.tumble>0){let e=Math.sin(i*38)*.5;k=-1.7+e,A=1.7-e}M>.01&&(k=k*(1-M)+-.9*M,A=A*(1-M)+.9*M),this.armL.rotation.z=k,this.armR.rotation.z=A,this.armL.rotation.x=te,this.armR.rotation.x=ne,this.head.rotation.set(j,re,-this.roll.x*.6+this.torso.rotation.z*.4),this.baseParts.eyes.scale.y=this.blinkT<0?.12:1;let N=.35+.65*u;this.scarfTail.rotation.y=Math.sin(i*11)*.3*N-this.roll.v*.05,this.scarfTail.rotation.x=Pt.clamp(-.25*u+e.vy*.03+Math.sin(i*8)*.1*N,-.6,.6),this.scarfTail.position.z=.45+Math.sin(i*13)*.05*N,this.baseParts.pompom.position.set(-this.roll.v*.01,.34-w*.3+this.joy.x*.03,Math.max(0,-w)*.2);let de=n.power,fe=Math.floor(i*9)%2==0,pe=e=>!!de&&de[e]&&(!de.ending[e]||fe);if(this.magnetProp.visible=pe(`magnet`),this.jetProp.visible=!!de&&de.jetpack,this._setGold(pe(`board`)),this.jetProp.visible){let e=!de.ending.jetpack||fe;for(let t=0;t<this.flames.length;t++){let n=this.flames[t];n.visible=e;let r=.8+Math.sin(i*40+t*2)*.15+Math.random()*.15;n.scale.set(1,r,1)}this.armL.rotation.z=-1.1,this.armR.rotation.z=1.1,this.legs[0].rotation.x=.69,this.legs[1].rotation.x=-.69}this.magnetProp.visible&&(this.armR.rotation.z=2.3,this.armR.rotation.x=0);let me=!this.jetProp.visible;for(let e of this.extras.noJet)e.visible=me;if(this.shieldProp.visible=pe(`shield`),this.shieldProp.visible){this.shieldRing.rotation.y=i*1.6,this.shieldRing.position.y=Math.sin(i*2.2)*.35,this.shieldMat.opacity=.12+Math.sin(i*5)*.04;let t=(e.sliding?.72:1)+Math.sin(i*5)*.015;this.shieldProp.scale.set(1,t,1),this.shieldProp.position.y=e.sliding?.75:1,this.shieldProp.rotation.z=-r.rotation.z}if(this.clockProp.visible=pe(`slowmo`),this.clockProp.visible){this.clockProp.position.y=2.15+Math.sin(i*2.4)*.08,this.clockProp.rotation.y=Math.sin(i*1.3)*.5-r.rotation.y;for(let e of this.clockHands.children)e.rotation.z=-i*(e.name===`minute`?7:.9)-(e.name===`hour`)}n.invulnerable?(this.flicker=!this.flicker||Math.floor(i*14)%2==0,r.visible=Math.floor(i*14)%2==0):r.visible=!0,this.shadow.position.x=e.x;let he=1/(1+e.y*.5);this.shadow.scale.set(he,1,he),this.shadow.material.opacity=.2*he,this.shadow.visible=this.blob}_pivot(e,t,n,r){let i=Math.cos(t),a=Math.sin(t);e.rotation.x=t,e.position.set(0,n-(n*i-r*a),r-(n*a+r*i))}_pivotPos(e,t,n,r,i){let a=Math.cos(t),o=Math.sin(t);e.position.set(0,i.y+n-(n*a-r*o),i.z+r-(n*o+r*a))}},Yg=Object.freeze({fur:7226660,dark:5189658,light:10119740}),Xg=(e,t,...n)=>{for(let r of n)e.add(r),t.push(r)};function Zg(e,t,n,r,i=!0){let a=e.mat(r);Xg(t.rig,n,e.mesh(e.torus(.56,.11,6,14),a,0,1.68,-1.08,1.05,0,0)),i&&Xg(t.rig,n,e.mesh(e.box(.2,.5,.1),a,.28,1.25,-1.42,.25,0,-.15)),Xg(t.rider,n,e.mesh(e.torus(.34,.08,6,14),a,0,.96,-.03,Math.PI/2,0,0)),i&&Xg(t.rider,n,e.mesh(e.box(.14,.36,.07),a,.17,.76,-.33,.15,0,-.1))}var Qg=Object.freeze({brun:{id:`brun`,colors:{},build:null},racadau:{id:`racadau`,colors:{fur:6044450,dark:3875859,light:9069112},build(e,t){let n=[],r=e.mat(10135476),i=e.mat(7108740);Zg(e,t,n,14034984,!1),Xg(t.rig,n,e.mesh(e.cone(.2,.36,4),e.mat(14034984),0,1.3,-1.5,Math.PI+.5,0,0)),Xg(t.rider,n,e.mesh(e.cone(.15,.3,4),e.mat(14034984),0,.8,-.36,Math.PI+.2,0,0));let a=[e.mesh(e.cyl(.52,.56,.07,14),r,.05,.62,.02,.12,0,-.22),e.mesh(e.cyl(.3,.5,.09,14),i,.07,.69,.03,.12,0,-.22),e.mesh(e.box(.2,.09,.06),i,.09,.77,.04,.12,0,-.22)];Xg(t.head,n,...a),Xg(t.rider,n,e.mesh(e.cyl(.44,.44,.06,14),r,0,.5,.5,Math.PI/2-.1,0,0)),Xg(t.rider,n,e.mesh(e.cyl(.24,.4,.07,14),i,0,.5,.55,Math.PI/2-.1,0,0));let o=e.mat(16767050);return Xg(t.rig,n,e.mesh(e.box(.34,.05,.1),o,.2,2.42,-.5,0,.6,.25),e.mesh(e.box(.1,.05,.3),o,.12,2.43,-.42,.2,.6,0)),n}},craciun:{id:`craciun`,colors:{fur:15722973,dark:13484976,light:16777215},build(e,t){let n=[],r=e.mat(12986408),i=e.mat(16777215);return Zg(e,t,n,12986408,!0),Xg(t.head,n,e.mesh(e.torus(.4,.11,6,14),i,0,.45,.06,Math.PI/2-.2,0,0)),Xg(t.head,n,e.mesh(e.cone(.4,.8,10),r,0,.86,.2,-.45,0,0)),Xg(t.head,n,e.mesh(e.sph(.14,8,6),i,0,1.22,.4)),Xg(t.head,n,e.mesh(e.sph(.125,8,6),e.mat(15022389,{emissive:4849664}),0,-.04,-.82)),Xg(t.riderHead,n,e.mesh(e.sph(.1,8,6),e.mat(15022389,{emissive:4849664}),0,-.02,-.6)),Xg(t.rider,n,e.mesh(e.sph(.3,10,8),e.mat(9263659),0,.5,.52)),Xg(t.rider,n,e.mesh(e.torus(.09,.03,5,10),e.mat(16767050),0,.8,.5,Math.PI/2,0,0)),n}}});Object.freeze(Object.keys(Qg));var $g=e=>1-(1-e)*(1-e),e_=1,t_=.85,n_=class{constructor(e){this.root=new z,this.root.visible=!1,e.add(this.root);let t=e=>new W({color:e,flatShading:!0}),n=t(Yg.fur),r=t(Yg.dark),i=t(Yg.light);this.furMats={fur:n,dark:r,light:i};let a=(e,t=12,n=9)=>J(`bs${e},${t},${n}`,()=>new wo(e,t,n)),o=(e,t,n)=>J(`bc${e},${t},${n}`,()=>new U(e,t,n,8));this.rig=new z,this.root.add(this.rig),this.rig.scale.setScalar(e_);let s=Y(a(1),n,0,1.25,0);s.scale.set(.95,.9,1.45),this.rig.add(s);let c=Y(a(.75),n,0,1.85,-.5);this.rig.add(c),this.rig.add(Y(a(.45,8,6),r,0,1.3,1.45)),this.head=new z,this.head.position.set(0,1.75,-1.55),this.head.add(Y(a(.62),n,0,0,0));let l=Y(a(.34,10,8),i,0,-.14,-.5);l.scale.set(1,.8,1.2),this.head.add(l),this.head.add(Y(a(.1,8,6),q(1118481),0,-.04,-.82));for(let e of[-1,1])this.head.add(Y(a(.2,8,6),r,e*.42,.5,.05)),this.head.add(Y(a(.075,6,5),q(16771488),e*.24,.12,-.5)),this.head.add(Y(a(.04,6,5),q(1118481),e*.24,.12,-.57));this.mouth=Y(a(.3,10,8),q(5903380),0,-.34,-.62),this.mouth.scale.set(.8,.01,.9),this.mouth.visible=!1,this.head.add(this.mouth),this.rig.add(this.head),this.legs=[];for(let[e,t]of[[-.55,-.9],[.55,-.9],[-.55,.9],[.55,.9]]){let i=new z;i.position.set(e,.95,t),i.add(Y(o(.3,.24,1),n,0,-.45,0)),i.add(Y(a(.3,8,6),r,0,-.95,-.05)),this.rig.add(i),this.legs.push(i)}this._buildRider({fur:n,furDark:r,furLight:i,sph:a,cyl:o}),this.t=0,this.px=0,this.pedalPhase=0,this.roar=0,this.mode=`run`,this.riding=!1,this.kit=null,this.extras=[],this.skinId=null,this.castShadows=!0,this.setMode(`run`),this.setSkin(`brun`)}setSkin(e){let t=Qg[e]??Qg.brun;if(t.id===this.skinId)return;for(let e of this.extras)e.removeFromParent();this.kit?.dispose(),this.kit=new Wg;for(let[e,n]of Object.entries(this.furMats))n.color.setHex(t.colors[e]??Yg[e]);let n={rig:this.rig,head:this.head,rider:this.rider,riderHead:this.riderHead};this.extras=this.kit.compact(t.build?t.build(this.kit,n):[]);for(let e of this.extras)e.traverse(e=>e.castShadow=this.castShadows);this.skinId=t.id}dispose(){for(let e of this.extras)e.removeFromParent();this.extras=[],this.kit?.dispose(),this.kit=null,this.skinId=null;for(let e of Object.values(this.furMats))e.dispose()}showcase(e,t,n,r,i){let a={phase:Nd.CHASING,elapsed:99,remaining:3,leaveProgress:0};this.px=e,this.update(a,e,r,i),this.root.position.x=e,this.root.position.z=t,this.root.rotation.y=n}_buildRider({fur:e,furDark:t,furLight:n,sph:r,cyl:i}){let a=new z;a.scale.setScalar(t_),this.root.add(a),this.riderRig=a;let o=new z;a.add(o),this.rider=o;let s=Y(r(1),e,0,.45,0);s.scale.set(.62,.7,.52),o.add(s);let c=Y(r(.42),n,0,.38,-.3);c.scale.set(1,1.15,.5),o.add(c);let l=new z;l.position.set(0,1.2,-.05),l.add(Y(r(.45),e,0,0,0));let u=Y(r(.24,10,8),n,0,-.1,-.36);u.scale.set(1.1,.85,1.1),l.add(u),l.add(Y(r(.08,8,6),q(1118481),0,-.02,-.6));let d=Y(r(.1,8,6),q(5903380),0,-.24,-.5);d.scale.set(1.2,.8,.5),l.add(d);for(let e of[-1,1])l.add(Y(r(.15,8,6),t,e*.3,.36,.04)),l.add(Y(r(.075,6,5),q(16777215),e*.17,.12,-.37)),l.add(Y(r(.04,6,5),q(1118481),e*.17,.12,-.44));o.add(l),this.riderHead=l,this.riderArms=[];for(let n of[-1,1]){let a=new z;a.position.set(n*.5,.8,-.05),a.add(Y(i(.17,.14,.62),e,0,-.31,0)),a.add(Y(r(.17,8,6),t,0,-.64,0)),o.add(a),this.riderArms.push(a)}this.riderLegs=[];for(let n of[-1,1]){let i=new z;i.position.set(n*.26,.02,-.08);let a=Y(J(`bearLegDown`,()=>new U(.2,.15,1,8).translate(0,-.5,0)),e,0,0,0);i.add(a);let s=Y(r(.19,8,6),t,0,-.7,-.08);s.scale.set(1,.7,1.3),i.add(s),i.userData={limb:a,paw:s},o.add(i),this.riderLegs.push(i)}let f=Y(J(`bearHelmet`,()=>new wo(.47,12,6,0,Math.PI*2,0,Math.PI*.45)),q(16762161),0,.12,.02);l.add(f);let p=new z;p.add(Y(i(.6,.66,.62),q(16739098),0,.5,.02));for(let e of[.32,.62])p.add(Y(i(.67,.67,.06),q(15921906),0,e,.02));o.add(p);let m=new z;m.position.set(0,.36,.02),m.add(Y(i(.34,.36,.22),q(16777215),0,.1,0)),m.add(Y(i(.48,.48,.04),q(1778224),0,0,-.04)),m.add(Y(i(.355,.355,.06),q(1778224),0,.04,0)),m.add(Y(r(.06,6,5),q(16762161),0,.06,-.35)),l.add(m),this.outfits={unicycle:[f],hydro:[p,m]};let h=new z,g=new z;g.position.set(0,.45,0),g.add(Y(J(`uniTire`,()=>new To(.4,.06,6,20).rotateY(Math.PI/2)),q(1710618),0,0,0));for(let e=0;e<4;e++){let t=Y(J(`uniSpoke`,()=>new H(.03,.78,.03)),q(13686235),0,0,0);t.rotation.x=e*Math.PI/4,g.add(t)}g.add(Y(J(`uniHub`,()=>new U(.07,.07,.3,8).rotateZ(Math.PI/2)),q(8947848),0,0,0));for(let e of[-1,1]){let t=Y(J(`uniCrank`,()=>new H(.04,.3,.05).translate(0,-.13,0)),q(6710886),e*.17,0,0);t.rotation.x=e>0?Math.PI:0,g.add(t)}h.add(g);for(let e of[-1,1])h.add(Y(J(`uniFork`,()=>new H(.05,.8,.06)),q(15087942),e*.11,.85,0));h.add(Y(J(`uniPost`,()=>new H(.07,.22,.07)),q(12107719),0,1.3,0));let _=Y(r(.2,10,6),q(2236962),0,1.42,0);_.scale.set(.9,.35,1.4),h.add(_),a.add(h);let v=new z,y=new z;y.position.set(0,.3,0),y.add(Y(J(`hydroRim`,()=>new To(.85,.1,8,24).rotateY(Math.PI/2)),q(3120086),0,0,0)),y.add(Y(J(`hydroRim2`,()=>new To(.55,.05,6,20).rotateY(Math.PI/2)),q(16777215),0,0,0));for(let e=0;e<10;e++){let t=e/10*Math.PI*2,n=Y(J(`hydroPaddle`,()=>new H(.5,.07,.32)),q(e%2?16752412:16765471),0,Math.sin(t)*.95,Math.cos(t)*.95);n.rotation.x=-t,y.add(n)}for(let e=0;e<3;e++){let t=Y(J(`hydroSpoke`,()=>new H(.05,1.7,.05)),q(15921906),0,0,0);t.rotation.x=e*Math.PI/3,y.add(t)}y.add(Y(J(`hydroHub`,()=>new U(.12,.12,.6,10).rotateZ(Math.PI/2)),q(8947848),0,0,0)),v.add(y);for(let e of[-1,1]){v.add(Y(J(`hydroFloat`,()=>new U(.2,.2,1.6,10).rotateX(Math.PI/2)),q(16777215),e*.85,.08,0)),v.add(Y(r(.2,10,6),q(15087942),e*.85,.08,-.8));let t=Y(J(`hydroStrut`,()=>new H(.85,.06,.08)),q(10134445),e*.45,.25,0);t.rotation.z=e*.2,v.add(t),v.add(Y(J(`hydroFork`,()=>new H(.07,1,.08)),q(3120086),e*.24,.85,0))}let b=new z;b.position.set(0,.92,-.12),b.add(Y(J(`hydroSprocket`,()=>new U(.13,.13,.05,12).rotateZ(Math.PI/2)),q(6710886),.3,0,0));for(let e of[-1,1]){let t=Y(J(`uniCrank`,()=>new H(.04,.3,.05).translate(0,-.13,0)),q(6710886),e*.33,0,0);t.rotation.x=e>0?Math.PI:0,b.add(t)}v.add(b),v.add(Y(J(`hydroChain`,()=>new H(.03,.66,.05)),q(3355443),.3,.6,-.06));let x=Y(r(.22,10,6),q(16739098),0,1.38,.05);x.scale.set(1,.35,1.3),v.add(x),v.add(Y(J(`hydroPole`,()=>new U(.02,.02,1.4,5)),q(14540253),.35,1.5,.35)),v.add(Y(J(`hydroFlag`,()=>new H(.02,.24,.4)),q(15087942),.35,2.08,.55)),a.add(v),this.vehicles={unicycle:{group:h,wheel:g,crank:g,seatY:1.45,legLen:.95},hydro:{group:v,wheel:y,crank:b,seatY:1.42,legLen:.55}}}setMode(e){this.mode=e;let t=this.vehicles[e];this.riding=!!t,this.rig.visible=!t,this.riderRig.visible=!!t;for(let[t,n]of Object.entries(this.vehicles))n.group.visible=t===e;for(let[t,n]of Object.entries(this.outfits))for(let r of n)r.visible=t===e;if(t){this.rider.position.y=t.seatY;for(let e of this.riderLegs)e.userData.limb.scale.y=t.legLen,e.userData.paw.position.y=-t.legLen}}reset(){this.root.visible=!1,this.t=0}update(e,t,n,r){this.t+=n;let i=e.phase;if(this.root.visible=i!==Nd.NONE,!this.root.visible){this.px=t;return}this.px+=(t-this.px)*(1-Math.exp(-6*n));let a=K.bear.distance,o=a,s=0,c=0,l=1,u=(8+r*.12)*(this.mode===`swim`?.6:1),d=this.t*u,f=i===Nd.CHASING?e.elapsed-K.bear.enterTime:-1,p=+(f>0&&f<.8||i===Nd.CAUGHT);if(this.roar+=(p-this.roar)*(1-Math.exp(-(p?14:6)*n)),i===Nd.CHASING)o=a+(1-$g(Math.min(1,e.elapsed/K.bear.enterTime)))*6,o+=Math.sin(this.t*4.2)*.35,s=Math.max(0,Math.sin(d+.6))*.36*(1-.7*this.roar),e.remaining<1&&(o+=(1-e.remaining)*1.2);else if(i===Nd.LEAVING){let t=e.leaveProgress;o=a+1.2+t*t*16,s=Math.abs(Math.sin(this.t*6))*.2*(1-t)}else if(i===Nd.CAUGHT){let e=Math.min(1,(this.caughtT??0)/.4);o=a*(1-$g(e))+.6*$g(e),s=Math.sin(e*Math.PI)*1.4,c=-.5*e,l=1+.15*e}let m=this.vehicles[this.mode];if(m){this._updateRider(e,m,n,r,o,s,c,l);return}this.mode===`swim`&&(s=s*.3-.95+Math.sin(this.t*3)*.08),this.root.position.set(this.px,s,o),this.root.rotation.set(c,0,Math.sin(this.t*4.2)*.06);let h=Math.sin(d+.6),g=this.mode===`swim`?0:h*.05;this.rig.scale.set(e_*l*(1-g*.5+.04*this.roar),e_*l*(1-g+.05*this.roar),e_*l*(1+g)),this.rig.rotation.x=Math.cos(d+.6)*.06+.12*this.roar;let _=i===Nd.LEAVING?.6:.95,v=Math.sin(d)*_,y=Math.sin(d-.9)*_;this.legs[0].rotation.x=v,this.legs[1].rotation.x=v,this.legs[2].rotation.x=y,this.legs[3].rotation.x=y;for(let e=0;e<4;e++)this.legs[e].position.y=.95+Math.max(0,Math.cos(d-(e<2?0:.9)))*.14;let b=0;if(this.mode!==`swim`){if(i===Nd.CAUGHT)b=Math.sin(Math.min(1,(this.caughtT??0)/.4)*Math.PI);else if(i===Nd.CHASING&&f>.9&&e.remaining>1){let e=this.t*.6%1;b=e<.22?Math.sin(e/.22*Math.PI):0}}b>0?(this.legs[1].rotation.x=-2.1*b+v*(1-b),this.legs[1].rotation.z=-.5*b):this.legs[1].rotation.z=0;let x=this.roar*(.75+.25*Math.sin(this.t*30));this.head.rotation.x=Math.sin(d+2.2)*.12-.55*this.roar,this.head.rotation.z=Math.sin(this.t*3)*.1*(1-this.roar),this.head.position.y=1.75+Math.sin(d+1.4)*.07,this.head.position.z=-1.55-.1*this.roar,this.mouth.visible=x>.05,this.mouth.scale.y=Math.max(.01,x*.55)}_updateRider(e,t,n,r,i,a,o,s){let c=e.phase,l=this.mode===`hydro`;i+=K.bear.riderDistance-K.bear.distance,c!==Nd.CAUGHT&&(a=Math.abs(Math.sin(this.t*7))*.06),l&&(a+=Math.sin(this.t*2.6)*.06);let u=Math.sin(this.t*3.3)*.12+Math.sin(this.t*7.9)*.04,d=Math.sin(this.t*2.1)*.12,f=7+r*.28;if(c===Nd.CHASING&&e.remaining<1&&(u*=1.8),c===Nd.LEAVING){let t=e.leaveProgress;u=Math.min(1,t*1.6)*1.35,l&&(a-=t*1.2),f*=1-t,d=0}this.root.position.set(this.px,a,i),this.root.rotation.set(o*.6,d,u),this.riderRig.scale.setScalar(t_*s),this.pedalPhase+=n*f;let p=this.pedalPhase;t.wheel.rotation.x=-p*(l?.6:1),t.crank!==t.wheel&&(t.crank.rotation.x=-p);for(let e=0;e<this.riderLegs.length;e++)this.riderLegs[e].rotation.x=Math.sin(p+e*Math.PI)*.45-.15;let m=c===Nd.LEAVING?.9:.35;if(this.riderArms[0].rotation.z=-1.25+Math.sin(this.t*6.5)*m-u*.6,this.riderArms[1].rotation.z=1.25+Math.sin(this.t*6.5+2)*m-u*.6,this.riderArms[0].rotation.x=Math.sin(this.t*5)*.3,this.riderArms[1].rotation.x=Math.sin(this.t*5+1.5)*.3,c===Nd.CAUGHT)for(let e of this.riderArms)e.rotation.x=2.4;this.rider.rotation.x=-.12+Math.sin(p*2)*.03,this.rider.scale.y=1+Math.sin(p*2)*.025,this.riderHead.rotation.x=Math.sin(this.t*4)*.08,this.riderHead.rotation.z=-u*.5+Math.sin(this.t*3)*.08}};function r_(){let e=document.createElement(`canvas`);e.width=e.height=64;let t=e.getContext(`2d`),n=t.createRadialGradient(32,32,2,32,32,30);n.addColorStop(0,`rgba(255,255,255,1)`),n.addColorStop(.6,`rgba(255,255,255,0.9)`),n.addColorStop(1,`rgba(255,255,255,0)`),t.fillStyle=n,t.fillRect(0,0,64,64);let r=new Yi(e);return r.colorSpace=He,r}var i_=class{constructor(e,t=320){this.capacity=t,this.pos=new Float32Array(t*3),this.col=new Float32Array(t*4),this.vel=new Float32Array(t*3),this.life=new Float32Array(t),this.maxLife=new Float32Array(t),this.cursor=0,this.limit=t;let n=new Ir;this.posAttr=new xr(this.pos,3).setUsage(Je),this.colAttr=new xr(this.col,4).setUsage(Je),n.setAttribute(`position`,this.posAttr),n.setAttribute(`color`,this.colAttr);let r=new Vi({size:.3,map:r_(),vertexColors:!0,transparent:!0,depthWrite:!1,sizeAttenuation:!0});this.points=new Ki(n,r),this.points.frustumCulled=!1,this.points.renderOrder=5,e.add(this.points),this.clear()}clear(){this.life.fill(0);for(let e=0;e<this.capacity;e++)this.pos[e*3+1]=-999,this.col[e*4+3]=0;this.posAttr.needsUpdate=!0,this.colAttr.needsUpdate=!0}emit(e,t,n,r,i,a,o,s){let c=this.cursor;this.cursor=(this.cursor+1)%this.limit;let l=this._c??=new B;l.set(s),this.pos[c*3]=e,this.pos[c*3+1]=t,this.pos[c*3+2]=n,this.vel[c*3]=r,this.vel[c*3+1]=i,this.vel[c*3+2]=a,this.life[c]=this.maxLife[c]=o,this.col[c*4]=l.r,this.col[c*4+1]=l.g,this.col[c*4+2]=l.b,this.col[c*4+3]=1}burst(e,t,n,r,i,a,o){for(let s=0;s<r;s++){let r=Math.random()*Math.PI*2,s=Math.random()*.9+.1,c=i*(.4+Math.random()*.8);this.emit(e,t,n,Math.cos(r)*c*s,Math.random()*c*.9+c*.2,Math.sin(r)*c*s,a*(.6+Math.random()*.6),o[Math.random()*o.length|0])}}update(e,t){for(let n=0;n<this.capacity;n++)this.life[n]<=0||(this.life[n]-=e,this.life[n]<=0?(this.col[n*4+3]=0,this.pos[n*3+1]=-999):(this.vel[n*3+1]-=9*e,this.pos[n*3]+=this.vel[n*3]*e,this.pos[n*3+1]=Math.max(.05,this.pos[n*3+1]+this.vel[n*3+1]*e),this.pos[n*3+2]+=(this.vel[n*3+2]+t)*e,this.col[n*4+3]=Math.min(1,this.life[n]/this.maxLife[n]*1.6)));this.posAttr.needsUpdate=!0,this.colAttr.needsUpdate=!0}},a_=class{constructor(e,t){this.w=e,this.z=t,this.x=0,this.v=0}step(e,t){let n=Math.min(t,.1);for(;n>1e-9;){let t=Math.min(n,1/90);n-=t,this.v+=(this.w*this.w*(e-this.x)-2*this.z*this.w*this.v)*t,this.x+=this.v*t}return this.x}reset(){this.x=0,this.v=0}},o_=.15,s_=class{constructor(e){this.camera=e,this.sx=new a_(6.5,1),this.roll=new a_(9,.85),this.dip=new a_(14,.55),this.back=new a_(10,.6),this.punch=new a_(16,.55),this.fovS=new a_(5,1),this.sway=new a_(12,.6),this.reduced=!1;try{let e=window.matchMedia(`(prefers-reduced-motion: reduce)`);this.reduced=e.matches,e.addEventListener?.(`change`,e=>{this.reduced=e.matches})}catch{}this.reset()}reset(){this.camX=0,this.camLift=0,this.camChase=0,this.shake=0,this.noiseT=0;for(let e of[this.sx,this.roll,this.dip,this.back,this.punch,this.fovS,this.sway])e.reset()}addShake(e){this.shake=Math.max(this.shake,e)}on(e,t){let n=this.reduced?o_:1;switch(e){case`start`:case`revive`:this.reset();break;case`jump`:case`superjump`:this.dip.v+=2.2*n;break;case`land`:this.dip.v-=4.5*n;break;case`slide`:this.dip.v-=1.2*n;break;case`nearMiss`:this.punch.v-=22*n;break;case`hit`:this.back.v+=(t?.result===`shield`?3:7)*n,this.dip.v-=3*n,this.sway.v+=(t&&t.x<0?1:-1)*4*n,this.roll.v+=(t&&t.x<0?-1:1)*.5*n;break;case`level`:this.punch.v-=18*n}}update(e,t){let n=this.camera,r=t.player,i=this.reduced?o_:1,a=n.aspect<.75,o=a?6.5:5.6,s=a?9.6:8.6,c=this.sx.step(r.x*.5,e);this.camX=c;let l=this.roll.step(0,e);this.noiseT+=e;let u=this.noiseT,d=Math.min(1,this.shake),f=.4*d*d*i,p=f*(Math.sin(u*31.3)+Math.sin(u*47.1+1.7))*.5,m=f*(Math.sin(u*36.9+.6)+Math.sin(u*53.3+2.9))*.5,h=f*.12*Math.sin(u*27.7+4.1),g=t.lifted?r.y:Math.max(0,r.y-2.2)*.6;this.camLift+=(g-this.camLift)*(1-Math.exp(-4*e));let _=this.dip.step(Math.min(r.y,2.2)*.07*i,e);this.camChase+=(+!!t.chase-this.camChase)*(1-Math.exp(-3*e));let v=this.camChase,y=this.back.step(0,e),b=this.sway.step(0,e);n.position.set(c+p+b*.12,o+this.camLift*.62+m+v*2+_,s+v*1+y*.12-_*.4),n.lookAt(c,.9+this.camLift*.5+_*.3,-9+v*3),n.rotateZ(-l-h),this.shake=Math.max(0,this.shake*Math.exp(-3.6*e)-.25*e),this.shake<.002&&(this.shake=0);let x=this.fovS.step(t.speedK*(this.reduced?1.5:4.5),e),S=t.baseFov+x+this.punch.step(0,e)+(t.warp||0)*16;Math.abs(S-n.fov)>.02&&(n.fov=S,n.updateProjectionMatrix())}},c_=e=>Pt.clamp((e-K.speed.base)/(K.speed.max-K.speed.base),0,1),l_={GLOW:0,RING:1,STAR:2,STREAK:3,LEAF:4},u_={BILLBOARD:0,FLAT:1,ZSTREAK:2,VERTICAL:3},d_=`
attribute vec3 aPos;
attribute vec2 aSize;
attribute vec4 aColor;
attribute vec3 aMisc; // shape, orient, rotation
varying vec2 vUv;
varying vec4 vColor;
varying float vShape;
void main() {
  vec2 q = position.xy;
  vUv = q + 0.5;
  vColor = aColor;
  vShape = aMisc.x;
  float orient = aMisc.y;
  float cr = cos(aMisc.z), sr = sin(aMisc.z);
  vec3 toCam = normalize(cameraPosition - aPos);
  vec3 right;
  vec3 up;
  if (orient < 0.5) {
    vec3 cx = vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]);
    vec3 cy = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);
    right = cx * cr + cy * sr;
    up = -cx * sr + cy * cr;
  } else if (orient < 1.5) {
    right = vec3(cr, 0.0, sr);
    up = vec3(sr, 0.0, -cr);
  } else if (orient < 2.5) {
    up = vec3(0.0, 0.0, -1.0);
    right = normalize(cross(up, toCam));
  } else {
    up = vec3(0.0, 1.0, 0.0);
    right = normalize(cross(up, toCam));
  }
  vec3 wp = aPos + right * (q.x * aSize.x) + up * (q.y * aSize.y);
  gl_Position = projectionMatrix * viewMatrix * vec4(wp, 1.0);
}
`,f_=`
varying vec2 vUv;
varying vec4 vColor;
varying float vShape;
void main() {
  vec2 p = (vUv - 0.5) * 2.0;
  float r = length(p);
  float a;
  if (vShape < 0.5) {
    a = pow(max(1.0 - r, 0.0), 2.0);
  } else if (vShape < 1.5) {
    a = smoothstep(0.62, 0.8, r) * (1.0 - smoothstep(0.9, 1.0, r));
  } else if (vShape < 2.5) {
    float cross4 = 1.0 / (1.0 + 36.0 * abs(p.x * p.y));
    a = cross4 * pow(max(1.0 - r, 0.0), 1.4) + pow(max(1.0 - r * 1.6, 0.0), 2.0);
  } else if (vShape < 3.5) {
    float across = pow(max(1.0 - abs(p.x), 0.0), 1.6);
    a = across * pow(max(sin(3.14159 * vUv.y), 0.0), 0.7);
  } else {
    float e = p.x * p.x * 3.2 + p.y * p.y;
    a = (1.0 - smoothstep(0.72, 0.95, e)) * (0.75 + 0.25 * step(0.0, p.x));
  }
  gl_FragColor = vec4(vColor.rgb, vColor.a * a);
  if (gl_FragColor.a < 0.004) discard;
  #include <colorspace_fragment>
}
`,p_=class{constructor(e,t,n,r=6){this.capacity=t;let i=t;this.pos=new Float32Array(i*3),this.size=new Float32Array(i*2),this.color=new Float32Array(i*4),this.misc=new Float32Array(i*3),this.vel=new Float32Array(i*3),this.age=new Float32Array(i),this.life=new Float32Array(i),this.s0=new Float32Array(i*2),this.s1=new Float32Array(i*2),this.alpha=new Float32Array(i),this.grav=new Float32Array(i),this.wsK=new Float32Array(i),this.spin=new Float32Array(i),this.fin=new Float32Array(i),this.flick=new Float32Array(i),this.rgb=new Float32Array(i*3),this.cursors=new Map,this._c=new B;let a=new So(1,1),o=new xs;o.index=a.index,o.setAttribute(`position`,a.getAttribute(`position`)),o.setAttribute(`uv`,a.getAttribute(`uv`));let s=(e,t,n)=>{let r=new Oi(e,t).setUsage(Je);return o.setAttribute(n,r),r};this.attrs=[s(this.pos,3,`aPos`),s(this.size,2,`aSize`),s(this.color,4,`aColor`),s(this.misc,3,`aMisc`)],o.instanceCount=i;let c=new Po({vertexShader:d_,fragmentShader:f_,transparent:!0,depthWrite:!1,blending:n,fog:!1,toneMapped:!1});this.mesh=new V(o,c),this.mesh.frustumCulled=!1,this.mesh.renderOrder=r,this.mesh.userData.noShadow=!0,this.mesh.castShadow=!1,e.add(this.mesh),this.clear()}clear(){this.life.fill(0),this.size.fill(0),this.color.fill(0);for(let e of this.attrs)e.needsUpdate=!0}slot(e,t){let n=this.cursors.get(e)??e;return(n<e||n>=t)&&(n=e),this.cursors.set(e,n+1>=t?e:n+1),n}emit(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g,_=0,v=1,y=0,b=0,x=.04,S=0){let C=this.slot(e,t),w=this._c.set(h);return this.pos[C*3]=i,this.pos[C*3+1]=a,this.pos[C*3+2]=o,this.vel[C*3]=s,this.vel[C*3+1]=c,this.vel[C*3+2]=l,this.s0[C*2]=u,this.s0[C*2+1]=d,this.s1[C*2]=f,this.s1[C*2+1]=p,this.size[C*2]=u,this.size[C*2+1]=d,this.rgb[C*3]=w.r,this.rgb[C*3+1]=w.g,this.rgb[C*3+2]=w.b,this.alpha[C]=g,this.grav[C]=_,this.wsK[C]=v,this.spin[C]=b,this.fin[C]=x,this.flick[C]=S,this.age[C]=0,this.life[C]=m,this.misc[C*3]=n,this.misc[C*3+1]=r,this.misc[C*3+2]=y,this.color[C*4]=w.r,this.color[C*4+1]=w.g,this.color[C*4+2]=w.b,this.color[C*4+3]=0,C}update(e,t){let n=this.capacity;for(let r=0;r<n;r++){let n=this.life[r];if(n<=0)continue;let i=this.age[r]+=e;if(i>=n){this.life[r]=0,this.size[r*2]=this.size[r*2+1]=0,this.color[r*4+3]=0;continue}let a=i/n,o=1-(1-a)*(1-a);this.vel[r*3+1]-=this.grav[r]*e,this.pos[r*3]+=this.vel[r*3]*e,this.pos[r*3+1]+=this.vel[r*3+1]*e,this.pos[r*3+2]+=(this.vel[r*3+2]+t*this.wsK[r])*e,this.size[r*2]=this.s0[r*2]+(this.s1[r*2]-this.s0[r*2])*o,this.size[r*2+1]=this.s0[r*2+1]+(this.s1[r*2+1]-this.s0[r*2+1])*o,this.misc[r*3+2]+=this.spin[r]*e;let s=this.fin[r],c=this.alpha[r]*Math.min(a/s,1)*Math.min((1-a)/.45,1);this.flick[r]>0&&(c*=.65+.35*Math.sin(i*this.flick[r]+r*1.7)),this.color[r*4+3]=c}for(let e of this.attrs)e.needsUpdate=!0}},{GLOW:m_,RING:h_,STAR:g_,STREAK:__,LEAF:v_}=l_,{BILLBOARD:y_,FLAT:b_,ZSTREAK:x_,VERTICAL:S_}=u_,C_=0,w_=56,T_=56,E_=104,D_=104,O_=250,k_=36,A_=[16766814,16773800,10481919,16777215],j_={partie:{ground:15135743,ground2:10473727,wind:14479359,ambient:null},republicii:{ground:15127464,ground2:16769696,wind:16773071,ambient:`leaf`},tractorul:{ground:14732192,ground2:16767392,wind:16771264,ambient:`leaf`},afi:{ground:16054015,ground2:12112127,wind:15397119,ambient:`mote`},noua:{ground:13170431,ground2:9430002,wind:15007743,ambient:`firefly`}},M_=[14189355,12865823,14919994,10115612],N_=Math.random,P_=class{constructor({scene:e,camera:t,particles:n,mobile:r}){this.camera=t,this.particles=n,this.mobile=!!r,this.A=new p_(e,O_,2,6),this.N=new p_(e,k_,1,5),this.look=j_.partie,this.biome=`partie`,this.ride=`snowboard`,this.q=0,this.qf=1,this.speedAcc=0,this.ambAcc=0,this.speed=0,this.speedK=0,this.lastX=0,this.lastY=0}setBiome(e,t){this.biome=e,this.ride=t,this.look=j_[e]??j_.partie,this._clearRange(T_,E_),this.N.clear()}setQuality(e){this.q=e,this.qf=[1,.7,.4,.2][e]??1,e>=2&&(this._clearRange(C_,w_),this._clearRange(T_,E_),this.N.clear())}clear(){this.A.clear(),this.N.clear(),this.speedAcc=this.ambAcc=0}_clearRange(e,t){let n=this.A;for(let r=e;r<t;r++)n.life[r]=0,n.size[r*2]=n.size[r*2+1]=0,n.color[r*4+3]=0}_ring(e,t,n,r,i,a,o,s,c,l=0,u=0){this.A.emit(D_,O_,h_,r?b_:y_,e,t,n,0,0,u,i*2,i*2,a*2,a*2,o,s,c,0,l,0,0,.02)}_flash(e,t,n,r,i,a,o,s,c=0){this.A.emit(D_,O_,g_,y_,e,t,n,0,0,0,r*2,r*2,i*2,i*2,a,o,s,0,0,c,1.5,.02)}_glow(e,t,n,r,i,a,o,s){this.A.emit(D_,O_,m_,y_,e,t,n,0,0,0,r*2,r*2,i*2,i*2,a,o,s,0,0,0,0,.02)}_sparkle(e,t,n,r,i,a,o,s=6,c=0){let l=N_()*6.2832,u=r*(.5+N_()*.7);this.A.emit(D_,O_,g_,y_,e,t,n,Math.cos(l)*u,Math.sin(l)*u*.9+r*.25,(N_()-.5)*u*.5,o,o,o*.2,o*.2,i*(.7+N_()*.5),a,1,s,c,0,0,.02)}_ray(e,t,n,r,i,a,o,s,c,l){let u=Math.cos(r),d=Math.sin(r);this.A.emit(D_,O_,__,y_,e+u*.3,t+d*.3,n,u*i,d*i,0,o,a,o*.5,a*.35,s,c,l,0,0,r-Math.PI/2,0,.02)}_zstreak(e,t,n,r,i,a,o,s,c=0,l=1){this.A.emit(D_,O_,__,x_,e,t,n,0,0,c,i,r,i*.4,r*1.25,a,o,s,0,l,0,0,.05)}_pillar(e,t,n,r,i,a,o){this.A.emit(D_,O_,__,S_,e,n*.5,t,0,0,0,r,n*.6,r*.35,n,i,a,o,0,0,0,0,.05)}on(e,t){let n=t?.x??this.lastX,r=t?.y??this.lastY,i=this.look,a=this.qf,o=this.ride===`boat`;switch(e){case`start`:this._ring(n,.05,0,!0,.4,2.4,.5,i.ground2,.5);break;case`jump`:case`superjump`:{let t=e===`superjump`;this._ring(n,.05,0,!0,.3,o?2.8:t?2.6:1.7,o?.65:.4,o?i.ground:t?16766814:i.ground2,.65,1),o&&this._ring(n,.05,0,!0,.2,1.6,.5,16777215,.5,1);let r=Math.ceil((t?6:3)*a);for(let e=0;e<r;e++)this._pillar(n+(e-(r-1)/2)*.28,.1,.9+N_()*.6,.07,.3,t?16769658:i.ground,.7);t&&this._ring(n,.9,.2,!1,.3,2.2,.35,16769658,.6);break}case`land`:if(this._ring(n,.05,0,!0,.35,o?3.2:2.1,o?.7:.38,o?i.ground:i.ground2,.7,1),o){this._ring(n,.05,0,!0,.2,2,.55,16777215,.5,1);for(let e=0;e<6*a;e++)this._sparkle(n,.3,0,3.2,.5,15269119,.22,9,1)}else this._glow(n,.25,.3,.2,1.1,.3,i.ground,.35);break;case`lane`:{let e=t?.dir??1,r=o?3:2;for(let t=0;t<r;t++)this._zstreak(n-e*(.45+t*.1),.06,.6+t*.5,2.2+t*.6,o?.2:.14,.45,o?i.ground:i.ground2,.6-t*.15);o&&this._ring(n-e*.4,.05,.3,!0,.3,1.5,.5,16777215,.4,1);break}case`slide`:for(let e of[-1,1])this._zstreak(n+e*.55,.07,.4,3.2,.2,.5,i.ground,.55);this._glow(n,.3,.3,.3,1.2,.3,i.ground,.3);break;case`edge`:for(let e=0;e<3;e++)this._sparkle(n+(n<0?-.5:.5),r+.5,.2,3,.3,16777215,.2,4,1);break;case`pickup`:{let e=kg[t?.type]??16777215;this._pillar(n,.2,7,1.7,.7,e,.6),this._pillar(n,.2,5,.8,.5,16777215,.7),this._ring(n,.05,0,!0,.4,3,.55,e,.8),this._ring(n,.9,.2,!1,.3,2,.4,16777215,.6);for(let t=0;t<10*a;t++)this.A.emit(D_,O_,g_,y_,n+(N_()-.5)*1.2,.3,.2+(N_()-.5)*.6,0,3+N_()*3,0,.26,.26,.05,.05,.7+N_()*.3,t&1?e:16777215,1,-1,0,0,0,.02);break}case`powerEnd`:{let e=kg[t?.type]??16777215;this._ring(n,r+1,.3,!1,1.8,.2,.35,e,.5);break}case`hit`:{let e=t?.result;if(e===`shield`){this._ring(n,r+1,.3,!1,.4,3.2,.4,7208864,.85),this._flash(n,r+1,.3,.4,2,.28,13238233,.9);for(let e=0;e<12;e++)this._ray(n,r+1,.3,e/12*6.2832+N_()*.3,8+N_()*3,.55,.09,.45,e&1?13238233:7208864,.9)}else{this._flash(n,r+1,.5,.5,2.8,.3,16777215,1),this._glow(n,r+1,.4,.5,3,.35,e===`caught`?16743002:16765088,.7);for(let e=0;e<10;e++)this._ray(n,r+1,.5,e/10*6.2832+N_()*.4,9+N_()*4,1.5,.12,.32,16773839,.9);this._ring(n,.06,0,!0,.5,3.4,.45,16777215,.7,1);for(let e=0;e<14*a;e++)this._sparkle(n,r+.9,.4,7,.8,e&1?16773839:16752010,.2+N_()*.12,14)}break}case`escape`:this._ring(n,r+1,.3,!1,.3,2.4,.45,16777215,.5);for(let e=0;e<8*a;e++)this._sparkle(n,r+1.2,.3,4,.7,16769658,.2,4);break;case`revive`:this._pillar(n,.2,8,2,.9,16769658,.6),this._ring(n,.05,0,!0,.4,3.6,.7,16769658,.8),this._flash(n,r+1,.4,.4,2.4,.4,16777215,.9);break;case`level`:{let e=i.ground2;this._ring(n,r+1.2,.5,!1,.6,9,.9,16777215,.55),this._ring(n,r+1.2,.5,!1,.4,6,.7,e,.7),this._ring(n,.05,0,!0,.6,7,.9,e,.7,1),this._flash(n,r+1.3,.5,.8,4,.5,16777215,.8),this._pillar(n,.3,10,3,1,e,.5);for(let t=0;t<18;t++)this._ray(n,r+1.2,.5,t/18*6.2832,13+N_()*6,2.4,.14,.7,t&1?16777215:e,.85);for(let e=0;e<14*a;e++)this._sparkle(n,r+1.2,.5,9,1.1,A_[e&3],.28,3);break}}}update(e,t){let n=t.player;n&&(this.lastX=n.x,this.lastY=n.y),this.speed=t.speed||0,this.speedK=t.speedK||0,e>0&&(t.state===`playing`||t.state===`menu`)&&this.q<2&&(t.state===`playing`&&this._windLines(e),this._ambient(e)),this.A.update(e,this.speed),this.N.update(e,this.speed)}_windLines(e){let t=this.speedK;if(t<.12)return;this.speedAcc+=e*(4+t*34)*(this.mobile?.55:1)*this.qf;let n=this.camera.position.x,r=this.look.wind;for(;this.speedAcc>=1;){--this.speedAcc;let e=n+(N_()<.5?-1:1)*(4.3+N_()*5.5),i=.3+N_()*N_()*7,a=3+N_()*5+t*4,o=.045+N_()*.05;this.A.emit(C_,w_,__,x_,e,i,-34+N_()*26,0,0,this.speed*.5,o,a,o*.6,a*1.1,.55+N_()*.3,r,.14+t*.28,0,1,0,0,.15)}}_ambient(e){let t=this.look.ambient;if(!t)return;let n=this.camera.position.x,r=(t===`leaf`?3.2:t===`mote`?7:3.5)*(this.mobile?.6:1)*this.qf;for(this.ambAcc+=e*r;this.ambAcc>=1;){--this.ambAcc;let e=N_()<.5?-1:1,r=n+e*(1.5+N_()*7),i=-2-N_()*20;if(t===`leaf`){let t=M_[N_()*M_.length|0];this.N.emit(0,k_,v_,y_,r,4.5+N_()*3,i,e*-(.3+N_()),-.9-N_()*.5,0,.2,.28,.2,.28,5.5,t,.95,0,1,N_()*6,(N_()-.5)*5,.1)}else t===`mote`?this.A.emit(T_,E_,m_,y_,r,1+N_()*5,i,(N_()-.5)*.3,.1+N_()*.15,0,.14,.14,.14,.14,4.5,16773320,.55,0,1,0,0,.25,2+N_()*2):this.A.emit(T_,E_,m_,y_,r,.5+N_()*3,i,(N_()-.5)*.8,(N_()-.3)*.4,0,.2,.2,.2,.2,5,N_()<.6?14221178:16773280,.8,0,1,0,0,.2,3+N_()*4)}}},F_=new vs(-1,1,1,-1,0,1),I_=new class extends Ir{constructor(){super(),this.setAttribute(`position`,new wr([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new wr([0,2,0,0,2,0],2))}},L_=class{constructor(e){this._mesh=new V(I_,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,F_)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},R_={partie:{bloom:.5,thrW:3.4,thrC:1,contrast:1.05,sat:1.1,tint:[.985,1,1.035],vig:.26},republicii:{bloom:.6,thrW:2.6,thrC:.85,contrast:1.07,sat:1.12,tint:[1.035,1,.955],vig:.3},tractorul:{bloom:.55,thrW:2.6,thrC:.85,contrast:1.06,sat:1.1,tint:[1.025,1,.965],vig:.28},afi:{bloom:.5,thrW:2.4,thrC:.9,contrast:1.04,sat:1.05,tint:[1.01,1,.985],vig:.2},noua:{bloom:.75,thrW:2.2,thrC:.8,contrast:1.08,sat:1.14,tint:[1.04,.995,.955],vig:.32}},z_=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }`,B_=`
  uniform sampler2D tScene;
  uniform vec2 uTexel;
  uniform float uThrW, uThrC;
  varying vec2 vUv;
  vec3 pass(vec3 c) {
    float lum = dot(c, vec3(0.2126, 0.7152, 0.0722));
    float mx = max(max(c.r, c.g), c.b);
    float sat = (mx - min(min(c.r, c.g), c.b)) / max(mx, 1e-3);
    float g = max(lum - uThrW, 0.0) + max(lum - uThrC, 0.0) * 2.5 * smoothstep(0.3, 0.65, sat);
    return min(c * (g / max(lum, 1e-3)), vec3(12.0)); // clamp: one tiny very bright pixel must not flicker the whole halo
  }
  void main() {
    vec3 s = pass(texture2D(tScene, vUv + vec2(-1.0, -1.0) * uTexel).rgb) + pass(texture2D(tScene, vUv + vec2(1.0, -1.0) * uTexel).rgb)
           + pass(texture2D(tScene, vUv + vec2(-1.0, 1.0) * uTexel).rgb) + pass(texture2D(tScene, vUv + vec2(1.0, 1.0) * uTexel).rgb);
    gl_FragColor = vec4(s * 0.25, 1.0);
  }`,V_=`
  uniform sampler2D tSrc;
  uniform vec2 uDir; // texel step along the blur axis, in the UV space of tSrc
  varying vec2 vUv;
  void main() {
    // 9-tap gaussian folded into 5 bilinear taps
    vec3 c = texture2D(tSrc, vUv).rgb * 0.2270270270;
    c += (texture2D(tSrc, vUv + uDir * 1.3846153846).rgb + texture2D(tSrc, vUv - uDir * 1.3846153846).rgb) * 0.3162162162;
    c += (texture2D(tSrc, vUv + uDir * 3.2307692308).rgb + texture2D(tSrc, vUv - uDir * 3.2307692308).rgb) * 0.0702702703;
    gl_FragColor = vec4(c, 1.0);
  }`,H_=`
  uniform sampler2D tScene, tBloomA, tBloomB;
  uniform float uBloomA, uBloomB, uContrast, uSat, uVig, uAspect;
  uniform vec3 uTint;
  varying vec2 vUv;
  void main() {
    vec3 c = texture2D(tScene, vUv).rgb;
    #ifdef BLOOM
      c += texture2D(tBloomA, vUv).rgb * uBloomA;
      #ifdef BLOOM2
        c += texture2D(tBloomB, vUv).rgb * uBloomB;
      #endif
    #endif
    gl_FragColor = vec4(c, 1.0);
    #ifdef TONE_MAPPING
      gl_FragColor.rgb = toneMapping(gl_FragColor.rgb);
    #endif
    // grade in the encoded (display) space, where contrast behaves as people expect
    vec3 s = linearToOutputTexel(gl_FragColor).rgb;
    s = (s - 0.5) * uContrast + 0.5;
    float l = dot(s, vec3(0.299, 0.587, 0.114));
    s = mix(vec3(l), s, uSat) * uTint;
    vec2 q = (vUv - 0.5) * vec2(uAspect, 1.0);
    s *= 1.0 - uVig * smoothstep(0.25, 1.05, length(q) * 1.25);
    // 1/255 triangular-ish dither: the smooth sky gradient would show bands otherwise
    s += (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) / 255.0;
    gl_FragColor = vec4(clamp(s, 0.0, 1.0), 1.0);
  }`;function U_(e,t,n={}){return new nn(Math.max(2,e|0),Math.max(2,t|0),{type:v,depthBuffer:!1,...n})}var W_=class{constructor(e,t,n,r={}){this.renderer=e,this.scene=t,this.camera=n,this.mobile=!!r.mobile;let i=e.getContext();this.supported=e.capabilities.isWebGL2!==!1&&!!(i.getExtension(`EXT_color_buffer_float`)||i.getExtension(`EXT_color_buffer_half_float`)),this.level=0,this.w=this.h=0,this.look={...R_.partie},this.rt=null,this.quad=new L_(null),this.bright=new Po({uniforms:{tScene:{value:null},uTexel:{value:new L},uThrW:{value:3},uThrC:{value:1}},vertexShader:z_,fragmentShader:B_,depthTest:!1,depthWrite:!1,toneMapped:!1}),this.blur=new Po({uniforms:{tSrc:{value:null},uDir:{value:new L}},vertexShader:z_,fragmentShader:V_,depthTest:!1,depthWrite:!1,toneMapped:!1}),this.final=new Po({uniforms:{tScene:{value:null},tBloomA:{value:null},tBloomB:{value:null},uBloomA:{value:0},uBloomB:{value:0},uContrast:{value:1},uSat:{value:1},uVig:{value:0},uAspect:{value:1},uTint:{value:new R(1,1,1)}},vertexShader:z_,fragmentShader:H_,depthTest:!1,depthWrite:!1}),this._variant=``}get active(){return this.level<2&&!!this.rt}setSize(e,t,n){let r=Math.max(2,Math.round(e*n)),i=Math.max(2,Math.round(t*n));this.w=r,this.h=i,this._alloc()}setQuality(e){this.level=e,this._alloc()}setBiome(e,t){Object.assign(this.look,R_[e]||R_.partie,t&&t.post?t.post:null),this.id=e}_alloc(){if(this.level>=2||!this.w||!this.supported){this._free();return}let e=!(this.mobile&&this.level>=1),t=e&&!this.mobile&&this.level===0,n=`${this.w}x${this.h}|${e}|${t}`;if(n===this._key)return;if(this._free(),this._key=n,this.bloom=e,this.two=t,this.rt=new nn(this.w,this.h,{type:v,depthBuffer:!0,samples:this.mobile?2:4}),e){let e=this.mobile?6:4,n=t=>Math.max(2,Math.round(t/e));this.a1=U_(n(this.w),n(this.h)),this.a2=U_(n(this.w),n(this.h)),t&&(this.b1=U_(n(this.w)>>1,n(this.h)>>1),this.b2=U_(n(this.w)>>1,n(this.h)>>1))}let r=(e?`B`:``)+(t?`2`:``);r!==this._variant&&(this.final.defines={},e&&(this.final.defines.BLOOM=``),t&&(this.final.defines.BLOOM2=``),this.final.needsUpdate=!0,this._variant=r)}_free(){for(let e of[`rt`,`a1`,`a2`,`b1`,`b2`])this[e]&&this[e].dispose(),this[e]=null;this._key=``}_pass(e,t){this.quad.material=e,this.renderer.setRenderTarget(t),this.quad.render(this.renderer)}render(){let e=this.renderer;if(!this.active){e.setRenderTarget(null),e.render(this.scene,this.camera);return}let t=this.look;e.setRenderTarget(this.rt),e.render(this.scene,this.camera);let n=this.final.uniforms;if(this.bloom){let e=this.bright.uniforms;e.tScene.value=this.rt.texture,e.uTexel.value.set(.5/this.w,.5/this.h),e.uThrW.value=t.thrW,e.uThrC.value=t.thrC,this._pass(this.bright,this.a1);let r=this.blur.uniforms;r.tSrc.value=this.a1.texture,r.uDir.value.set(1/this.a1.width,0),this._pass(this.blur,this.a2),r.tSrc.value=this.a2.texture,r.uDir.value.set(0,1/this.a2.height),this._pass(this.blur,this.a1),n.tBloomA.value=this.a1.texture,n.uBloomA.value=t.bloom*(this.two?.65:1),this.two&&(r.tSrc.value=this.a1.texture,r.uDir.value.set(1/this.a1.width,0),this._pass(this.blur,this.b1),r.tSrc.value=this.b1.texture,r.uDir.value.set(0,1/this.b1.height),this._pass(this.blur,this.b2),n.tBloomB.value=this.b2.texture,n.uBloomB.value=t.bloom*.8)}n.tScene.value=this.rt.texture,n.uContrast.value=t.contrast,n.uSat.value=t.sat,n.uVig.value=t.vig,n.uAspect.value=this.w/this.h,n.uTint.value.set(t.tint[0],t.tint[1],t.tint[2]),this._pass(this.final,null)}},G_=.1,K_=1/120,q_=1.5,J_=7,Y_=.45,X_=1,Z_=class{constructor({canvas:e,ui:t,sfx:n,leaderboard:r,meta:i,ads:a}){this.canvas=e,this.ui=t,this.sfx=n,this.lb=r,this.meta=i,this.ads=a,this.isTouch=typeof matchMedia==`function`&&matchMedia(`(pointer: coarse)`).matches,this.mobile=this.isTouch||Math.min(window.innerWidth,window.innerHeight)<600,this.renderer=new rd({canvas:e,antialias:!this.mobile,powerPreference:`high-performance`}),this.renderer.setClearColor(14149622),this.renderer.toneMapping=7,this.renderer.toneMappingExposure=1.05,this.shadows=!0,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=1,this.scene=new Hn,this.camera=new _s(58,1,.1,320),this.rig=new s_(this.camera),this.baseFov=58,this.renderer.info.autoReset=!1;let o=Math.min(window.devicePixelRatio||1,2);this.dprSteps=[o,Math.min(o,1.5),1,.75],this.qualityLevel=0,this.fpsT=0,this.fpsN=0,this.lowFpsCount=0,this.world=new qm(this.scene,{mobile:this.mobile,shadows:this.shadows,anisotropy:Math.min(8,this.renderer.capabilities.getMaxAnisotropy())}),this.playerView=new Jg(this.scene),this.bearView=new n_(this.scene);for(let e of[this.playerView.root,this.bearView.root])e.traverse(e=>e.castShadow=!e.userData.noShadow);this.playerView.setBlobShadow(!this.shadows),this.obstaclePool=new Cg(this.scene),this.coinPool=new Og(this.scene,{castShadow:!this.mobile}),this.pickupPool=new Ug(this.scene),this.particles=new i_(this.scene,this.mobile?260:400),this.gate=new $m(this.scene),this.fx=new P_({scene:this.scene,camera:this.camera,particles:this.particles,mobile:this.mobile}),this.post=new W_(this.renderer,this.scene,this.camera,{mobile:this.mobile}),this.frameEvents=[],this.hitStop=0,this.startBiome=0,this.biome=-1,this.player=new Md,this.bear=new Pd,this.powers=new Vd,this.skyTrail=new Ud,this.powerupsEnabled=!0,this.reviveEnabled=!0,this.revive=new ef,this.stats=uf(),this.runOpen=!1,this.preview=null,this.timeScale=1,this.trailId=`none`,this.emoji=``,this.obstacles=[],this.coins=[],this.pickups=[],this.state=`menu`,this.generationEnabled=!0,this.clock=0,this.last=performance.now(),this.applyCosmetics(),this.resetRun(),this.resize(),this.loop=this.loop.bind(this)}applyCosmetics(){let e=this.meta.cosmetics.equipped;this.playerView.setSkin(e.boy),this.bearView.setSkin(e.bear),this.trailId=e.trail,this.emoji=Wf(`emoji`,e.emoji)?.glyph??``,this.ui.setEmote?.(this.emoji)}resetRun(){this.closeRun(!1),this.cancelRevive(),this.revive=new ef,this.stats=uf(),this.cleanT=0,this.crownsCollected=0,this.banked={coins:0,crowns:0},this.reviveGrace=0,this.timeScale=1,this.announced=new Set,this.missionT=0,this.crownSchedule=new Wd;for(let e of this.obstacles)this.obstaclePool.release(e.mesh);for(let e of this.coins)this.coinPool.release(e.mesh);for(let e of this.pickups)this.pickupPool.release(e.mesh);this.obstacles.length=0,this.coins.length=0,this.pickups.length=0,this.generator=new jd(void 0,this.startBiome),this.transitions=[],this.transitionPending=!1,this.biomeStart=0,this.warpOut=X_,this.gate.hide(),this.applyBiome(this.startBiome),this.schedule=new Hd,this.powers.reset(),this.skyTrail.stop(),this.jetLanding=!1,this.rig.reset(),this.hitStop=0,this.frameEvents.length=0,this.sfx.jet(!1),this.distance=0,this.runTime=0,this.speed=0,this.slow=1,this.coinsCollected=0,this.deathT=0,this.caughtT=0,this.caught=!1,this.saved=!1,this.player.reset(),this.bear.reset(),this.playerView.reset(),this.bearView.reset(),this.particles.clear(),this.fx.clear(),this.populate()}setStartBiome(e){e===this.startBiome||e<0||e>=hd.length||(this.startBiome=e,this.state===`menu`&&(this.resetRun(),this.speed=J_,this.preview&&this.setPreview(this.preview)))}setPreview(e){if(this.state!==`menu`)return;let t=hd[this.biome];if(!e){this.preview=null,this.playerView.setRide(t.ride,!!t.winter),this.bearView.setMode(t.bear??(t.water?`swim`:`run`)),this.bearView.reset(),this.playerView.root.visible=!0;return}let n=e.kind===`bear`?`bear`:`boy`;this.preview={kind:n,yaw:this.preview?.kind===n?this.preview.yaw:2.5,ride:e.ride,mode:e.mode};let r=e.ride??t.ride;this.playerView.setRide(r,e.ride?r===`snowboard`:!!t.winter),this.bearView.setMode(e.mode??t.bear??(t.water?`swim`:`run`)),n!==`bear`&&this.bearView.reset()}rotatePreview(e){this.preview&&(this.preview.yaw+=e*.012)}applyBiome(e){if(e===this.biome)return;this.biome=e;let t=hd[e];this.world.setBiome(t.id),this.renderer.setClearColor(this.world.env.fog),this.renderer.toneMappingExposure=this.world.env.exposure??1.05,this.playerView.setRide(t.ride,!!t.winter),this.bearView.setMode(t.bear??(t.water?`swim`:`run`)),this.fx.setBiome(t.id,t.ride),this.post.setBiome(t.id,this.world.env),this.ui.setLevel?.(e,t.name)}enterBiome(e){this.applyBiome(e),this.biomeStart=this.runTime,this.transitionPending=!1,this.warpOut=0,this.gate.hide(),this.rig.addShake(.25),this.emit(`level`,{id:hd[e].id});let t=hd[e];this.ui.showLevelTitle?.(t.name,t.subtitle,e),this.stats.portals++,this.sfx.warp?.();let n=this.player;this.particles.burst(n.x,n.y+1.2,-1,46,9,1.1,this.world.env.confetti)}startRun(){this.preview&&this.setPreview(null),this.meta.sync(),this.resetRun(),this.runOpen=!0,this.state=`playing`,this.ui.hideAll(),this.ui.showHud(!0),this.ui.setBear(null),this.ui.setMuted(this.sfx.muted),this.sfx.start(),this.emit(`start`),this.meta.settings.hints<K.feel.hintRuns?(this.meta.setSetting(`hints`,this.meta.settings.hints+1),this.ui.showHints?.(this.isTouch)):this.ui.hideHints?.()}toMenu(){this.resetRun(),this.speed=J_,this.state=`menu`,this.preview=null,this.ui.hideHints?.(),this.meta.sync(),this.ui.showStart(this.lb.getTop())}pause(){this.state===`playing`&&(this.state=`paused`,this.ui.showPause(!0))}resume(){this.state===`paused`&&(this.state=`playing`,this.ui.showPause(!1),this.last=performance.now())}autoPause(){this.state===`playing`&&this.pause()}finishRun(){this.state=`gameover`,this.sfx.jet(!1);let e=this.score;this.result={score:e,coins:this.coinsCollected,crowns:this.crownsCollected,distance:this.distance};let t=this.closeRun(!0),n=this.meta.sync(),r=this.scoreboard?.user??null,i=Math.max(this.lb.getTop()[0]?.score??0,this.scoreboard?.myBest??0);r&&e>0&&this.lb.qualifies(e)&&(this.lb.add({name:r.name,score:e,coins:this.result.coins,distance:Math.floor(this.distance)}),this.saved=!0),this.ui.showGameOver({...this.result,auto:!!r,record:r?e>0&&e>i:void 0,qualifies:!r&&this.lb.qualifies(e),entries:this.lb.getTop(),caught:this.caught,lastName:this.meta.settings.name,xp:t?.xp??0,tiersGained:t?.tiersGained??0,missions:t?.completed??[],autoClaimed:n.granted}),this.ui.h.onMenuShown?.(),this.sfx.gameOver(),r&&e>0&&this.onAccountScore?.(e)}submitName(e){if(this.state!==`gameover`||this.saved||!this.result)return;let t=this.lb.add({name:e,score:this.result.score,coins:this.result.coins,distance:Math.floor(this.result.distance)});this.saved=!0,this.meta.setSetting(`name`,t.entry.name),this.ui.showSaved(t.entries,t.entry.id,t.rank)}liveStats(){let e=this.stats;return e.coins=this.coinsCollected,e.crowns=this.crownsCollected,e.distance=Math.floor(this.distance),e.score=this.score,e.time=Math.floor(this.runTime),e.cleanSeconds=Math.max(e.cleanSeconds,Math.floor(this.cleanT)),e}bankRun(){if(!this.runOpen)return;let e=this.coinsCollected-this.banked.coins,t=this.crownsCollected-this.banked.crowns;e<=0&&t<=0||(this.banked.coins=this.coinsCollected,this.banked.crowns=this.crownsCollected,this.meta.bank({coins:e,crowns:t}))}closeRun(e){if(!this.runOpen)return null;this.bankRun(),this.runOpen=!1;let t={...this.liveStats(),runs:+!!e};return this.meta.endRun(t)}afterDeath(){this.reviveEnabled&&this.revive.offer()?(this.state=`revive`,this.sfx.jet(!1),this.bankRun(),this.ui.showRevive(this.reviveInfo())):this.finishRun()}reviveInfo(e=``){let t=this.revive,n=this.ads.isAvailable();return{cost:t.cost,crowns:this.meta.wallet.crowns,canPay:this.meta.wallet.crowns>=t.cost,used:t.used,limit:t.limit,adAllowed:t.adAllowed,adAvailable:n.ok,adReason:n.reason??``,message:e}}reviveWithCrowns(){if(this.state!==`revive`)return!1;let e=this.revive.payCrowns(this.meta.wallet);return e.ok?(this.meta.store.save(),this.doRevive(),!0):(e.reason===`funds`&&this.ui.showRevive(this.reviveInfo(`Nu ai destule Coroane.`)),!1)}reviveWithAd(){if(this.state!==`revive`)return!1;let e=this.ads.isAvailable();if(!e.ok)return this.ui.showRevive(this.reviveInfo(e.reason===`offline`?`Reclama nu este disponibilă fără internet.`:`Reclama nu este disponibilă acum.`)),!1;let t=this.revive,n=t.startAd();return n!==null&&(this.ui.setReviveBusy(!0),this.ads.showRewarded().then(e=>{if(t!==this.revive||this.state!==`revive`)return;let r=t.adFinished(n,e?.completed===!0);r===`revived`?this.doRevive():r===`back`&&this.ui.showRevive(this.reviveInfo(`Reclama nu a fost vizionată până la capăt.`))},()=>{t===this.revive&&this.state===`revive`&&t.adFinished(n,!1)===`back`&&this.ui.showRevive(this.reviveInfo(`Reclama nu a putut fi afișată.`))}),!0)}declineRevive(){return this.state!==`revive`||!this.revive.decline()?!1:(this.ui.hideRevive(),this.finishRun(),!0)}cancelRevive(){this.revive.cancel(),this.ads?.cancel(),this.ui.hideRevive?.()}doRevive(){this.stats.revives++,this.caught=!1,this.deathT=0,this.caughtT=0,this.bear.reset(),this.bearView.reset(),this.player.revive(),this.jetLanding=!1,this.reviveGrace=K.revive.invulnerable,this.slow=K.revive.restartSlow,this.cleanT=0;let e=this.distance+fd(this.runTime)*K.revive.clearTime,t=0;for(let n of this.obstacles)(n.rowS??n.s)<=e?this.obstaclePool.release(n.mesh):this.obstacles[t++]=n;this.obstacles.length=t,this.state=`playing`,this.last=performance.now(),this.ui.hideRevive(),this.ui.showHud(!0),this.ui.setBear(null),this.sfx.revive?.(),this.emit(`revive`);let n=this.player;this.particles.burst(n.x,n.y+1,0,40,7,.9,[16769658,16777215,16740312])}get invulnerable(){return this.bear.invulnerable||this.powers.shieldGrace>0||this.reviveGrace>0}emote(){this.emoji&&(this.state===`playing`||this.state===`paused`)&&this.ui.showEmote?.(this.emoji)}get actions(){let e=()=>this.state===`playing`;return{left:()=>e()&&this.player.moveLane(-1),right:()=>e()&&this.player.moveLane(1),jump:()=>e()&&this.player.jump(),slide:()=>e()&&this.player.slide(),pause:()=>{this.state===`playing`?this.pause():this.state===`paused`&&this.resume()},enter:()=>{this.state===`menu`?this.ui.startVisible()&&this.startRun():this.state===`paused`?this.resume():this.state===`gameover`&&this.ui.el.nameForm.hidden&&this.startRun()},emote:()=>this.emote(),drag:e=>this.rotatePreview(e)}}populate(){if(!this.generationEnabled)return;let e=Math.max(this.speed,fd(this.runTime)*.5),t=null;if(this.powers.active(`jetpack`)){let n=this.distance+e*this.powers.remaining.jetpack;t={from:n-e*1-6,to:n+e*1.6+6};let r=Math.min(this.distance+K.gen.ahead,n-e*1.2);for(let e of this.skyTrail.emit(r,K.power.jetHeight+K.power.skyCoinY))this._addCoin(e)}let n=this.generator.ensure(this.distance,fd(this.runTime),this.runTime,{clear:t});for(let e of n.transitions)this.transitions.push(e),this.gate.show(e.gateS,e.biome);for(let e of n.powerups){let t=this.pickupPool.acquire(e.type);this.pickups.push({...e,mesh:t,taken:!1})}for(let e of n.obstacles){let t=this.obstaclePool.acquire(e.type),n=e.lanes.reduce((e,t)=>e+t,0)/e.lanes.length*K.laneW;t.position.x=n;let r={...e,mesh:t,ghost:!1,knockT:0};r.rowS!==void 0&&(r.s=_d(r,this.distance)),this.obstacles.push(r)}for(let e of n.coins)this._addCoin(e)}_addCoin(e){let t=this.coinPool.acquire();this.coins.push({...e,x:e.lane*K.laneW,mesh:t,spin:Math.random()*6,pull:!1,rel:0,pullT:0})}cull(){let e=this.distance-K.gen.behind,t=0;for(let n=0;n<this.obstacles.length;n++){let r=this.obstacles[n];r.s<e?this.obstaclePool.release(r.mesh):this.obstacles[t++]=r}this.obstacles.length=t,t=0;for(let n=0;n<this.coins.length;n++){let r=this.coins[n];r.s<e?this.coinPool.release(r.mesh):this.coins[t++]=r}this.coins.length=t,t=0;for(let n=0;n<this.pickups.length;n++){let r=this.pickups[n];r.taken||r.s<e?r.taken||this.pickupPool.release(r.mesh):this.pickups[t++]=r}this.pickups.length=t}advance(e){let t=Math.min(e,G_);for(;t>1e-9&&(this.state===`playing`||this.state===`dying`);){let e=Math.min(t,K_);this.simStep(e),t-=e}this.populate(),this.cull()}simStep(e){let t=this.state===`dying`;this.timeScale=t?1:this.powers.stepTimeScale(e);let n=e*this.timeScale;t?(this.speed*=Math.exp(-4.5*n),this.deathT+=n,this.caughtT+=n):(this.runTime+=n,this.slow+=(1-this.slow)*(1-Math.exp(-K.hitSlowRecover*n)),this.speed=fd(this.runTime)*pd(this.runTime)*this.slow);let r=this.distance;if(!t){!this.transitionPending&&this.runTime-this.biomeStart>=K.biome.duration&&(this.generator.requestTransition(gd(this.biome)),this.transitionPending=!0);for(let t of this.powers.update(n,e))this.onPowerEnd(t);if(this.player.superJump=this.powers.active(`board`),this.powerupsEnabled&&this.generator.pendingPower===null){let e=this.powers.active(`jetpack`)||this.jetLanding,t=this.schedule.poll(this.runTime,e);t?this.generator.requestPowerUp(t):this.crownSchedule.poll(this.runTime,e)&&this.generator.requestPowerUp(`crown`)}this.reviveGrace>0&&(this.reviveGrace=Math.max(0,this.reviveGrace-n)),this.cleanT+=e}this.player.update(n),this.distance+=this.speed*n,this.handlePlayerEvents();for(let e of this.obstacles)e.rowS!==void 0&&(e.s=_d(e,this.distance));let i=this.transitions[0];i&&!t&&this.distance>=i.gateS&&(this.transitions.shift(),this.enterBiome(i.biome)),t?this.deathT>=q_&&this.afterDeath():(this.bear.update(e)===`escaped`&&(this.emit(`escape`),this.sfx.escape(),this.stats.escapes++,this.emoji&&this.ui.showEmote?.(this.emoji)),this.player.flying||this.jetLanding||this.powers.landGrace>0||this.checkCollisions(r),this.state===`playing`&&(this.collectCoins(r,n),this.collectPickups(r)))}checkCollisions(e){let t=this.player.box();for(let n of this.obstacles){if(n.ghost)continue;let r=n.rowS??n.s;if(!(r>this.distance+8||r<e-8)&&Ld(e,this.distance,t,n)){if(this.invulnerable)n.ghost=!0;else if(this.onHit(n),this.state!==`playing`)break}}}emit(e,t){let n=this.player,r={x:n.x,y:n.y,...t};this.fx.on(e,r),this.rig.on(e,r),this.frameEvents.length<32&&this.frameEvents.push(e)}haptic(e){if(this.isTouch&&!this.hapticsOff)try{navigator.vibrate?.(e)}catch{}}get score(){return md(this.distance,this.coinsCollected)}onHit(e){let t=this.player;if(this.powers.absorbHit()){e.ghost=!0,e.knockT=0,this.stats.shieldBlocks++,this.rig.addShake(.5),this.hitStop=K.feel.hitStop,this.emit(`hit`,{result:`shield`}),this.haptic(30),this.sfx.shieldBreak?.(),this.particles.burst(t.x,t.y+1,0,34,8,.8,[7208864,16777215,13238233]);return}let n=this.bear.hit();e.ghost=!0,e.knockT=0,n!==`ignored`&&(this.stats.hits++,this.stats.cleanSeconds=Math.max(this.stats.cleanSeconds,Math.floor(this.cleanT)),this.cleanT=0,this.emit(`hit`,{result:n}),this.hitStop=n===`caught`?K.feel.hitStopCaught:K.feel.hitStop,this.haptic(n===`caught`?[60,40,120]:60)),n===`chase-start`?(this.slow=K.hitSlow,this.rig.addShake(.8),this.ui.flash(),this.sfx.hit(),this.sfx.growl(),this.playerView.startTumble(),this.particles.burst(t.x,t.y+.9,0,26,7,.8,[16777215,13625599,11130613])):n===`caught`&&(this.caught=!0,this.state=`dying`,this.deathT=0,this.caughtT=0,this.rig.addShake(1.1),this.ui.flash(),this.ui.setBear(null),this.sfx.hit(),this.sfx.growl(),this.particles.burst(t.x,t.y+.9,.5,34,8,.9,[16777215,13625599,16752010]))}collectCoins(e,t=1/120){let n=this.player,r=n.box(),i=this.powers.active(`magnet`),a=K.power.magnetRange,o=1-Math.exp(-12*t),s=n.x,c=n.y+1,l=!1;for(let n of this.coins){if(n.collected)continue;let u=n.s-this.distance;if(i&&!n.pull&&u<a&&u>-1.5&&(n.pull=!0,n.rel=u,n.pullT=0),n.pull){if(n.pullT+=t,n.rel+=(.2-n.rel)*o,n.x+=(s-n.x)*o,n.y+=(c-n.y)*o,n.s=this.distance+n.rel,!(Math.abs(n.rel)<1&&Math.abs(n.x-s)<.9&&Math.abs(n.y-c)<1.4)&&n.pullT<.9)continue}else if(n.s>this.distance+4||n.s<e-4||!Rd(e,this.distance,r,n))continue;n.collected=!0,l=!0,this.coinsCollected++,this.sfx.coin(),this.emit(`coin`,{cx:n.x,cy:n.y}),this.particles.burst(n.x,n.y,0,7,3.2,.45,[16769658,16764735,16777215]),this.coinPool.release(n.mesh)}l&&(this.coins=this.coins.filter(e=>!e.collected))}collectPickups(e){let t=this.player;for(let n of this.pickups)n.taken||Fd(e,this.distance,K.player.halfDepth+.4,n.s,.5)&&(Math.abs(n.lane*K.laneW-t.x)>K.laneW*.45+K.player.halfW||!t.flying&&t.y>K.power.pickupY+.9||(n.taken=!0,this.pickupPool.release(n.mesh),this.applyPickup(n.type)))}applyPickup(e){if(e!==`crown`)return this.activatePower(e);this.crownsCollected++,this.emit(`pickup`,{type:e}),this.sfx.crown?.();let t=this.player;this.particles.burst(t.x,t.y+1,0,26,6,.9,[kg.crown,16769658,16777215])}activatePower(e){this.powers.activate(e),this.stats.powers++,this.emit(`pickup`,{type:e}),this.sfx.powerUp(e);let t=this.player,n=kg[e];this.particles.burst(t.x,t.y+1,0,30,6,.8,[n,16777215,n]),e===`jetpack`&&(this.jetLanding=!1,t.startFlight(),this.skyTrail.start(this.distance+14,t.lane))}onPowerEnd(e){this.emit(`powerEnd`,{type:e}),this.sfx.powerEnd(),e===`jetpack`&&(this.player.endFlight(),this.jetLanding=!0,this.skyTrail.stop())}handlePlayerEvents(){let e=this.player;for(let t of e.takeEvents()){let n=this.groundFx();this.emit(t,t===`lane`?{dir:Math.sign(e.lane*K.laneW-e.x)||1}:void 0),t===`jump`?(this.stats.jumps++,this.sfx.jump(),this.particles.burst(e.x,.15,.2,n.n,n.speed,.4,n.colors)):t===`superjump`?(this.stats.jumps++,this.sfx.superJump(),this.particles.burst(e.x,.15,.2,18,5,.5,[16769658,16777215,16762161])):t===`land`?(this.jetLanding&&(this.jetLanding=!1,this.powers.landGrace=K.power.jetLandGrace,this.rig.addShake(.35)),this.particles.burst(e.x,.15,.2,n.n+4,n.speed*1.2,.5,n.colors),n.splash&&this.sfx.splash?.()):t===`slide`?(this.stats.slides++,this.sfx.slide()):t===`lane`&&(this.stats.laneChanges++,this.sfx.lane())}}syncEntities(e){let t=this.distance,n=this.clock,r=!(this.preview&&this.state===`menu`);for(let i of this.obstacles){let a=i.mesh;if(i.rowS!==void 0&&(i.s=_d(i,t)),a.position.z=-(i.s-t),a.visible=r&&(i.biome===void 0||i.biome===this.biome),i.ghost){i.knockT+=e;let t=Math.min(1,i.knockT/.45);a.scale.setScalar(Math.max(.001,1-t)),a.position.y=t*2.5,a.rotation.z=t*2.5}else if(a.userData.animate){let e=i.rowS===void 0?0:i.rowS+ld[i.type].move.run-i.s;a.userData.animate(e,n,i.s)}}for(let e of this.coins)e.mesh.visible=r,e.mesh.position.set(e.x,e.y+Math.sin(n*3+e.spin)*.06,-(e.s-t)),e.mesh.rotation.y=n*(e.pull?12:4)+e.spin;for(let e of this.pickups){let i=e.mesh;i.visible=r&&!e.taken;let a=K.power.pickupY+Math.sin(n*2.6+e.s)*.15;i.position.set(e.lane*K.laneW,a,-(e.s-t));let o=i.getObjectByName(`spin`);o.rotation.y=n*2.2,i.getObjectByName(`halo`).scale.setScalar(2.2+Math.sin(n*5)*.25);let s=i.getObjectByName(`ring`);s.position.y=-a+.04,s.scale.setScalar(1+Math.sin(n*5)*.12)}}groundFx(){let e=hd[this.biome].ride;return e===`boat`?{n:16,speed:4.5,colors:[16777215,14086646,10475232],splash:!0}:e===`skate`||e===`bike`?{n:5,speed:2,colors:[14209736,15658734]}:{n:8,speed:3,colors:[16777215,14412540]}}emitTrail(){let e=this.trailId;if(e===`none`)return;let t=this.player;if(this.trailTick=(this.trailTick??0)+1,this.mobile&&this.trailTick%2)return;let n=t.y,r=Math.random;if(e===`fulgi`)this.particles.emit(t.x+(r()-.5)*1,n+.4+r()*1.3,.8,(r()-.5)*1.2,2.2+r(),0,.8,r()<.5?16777215:12575743);else if(e===`scantei`)this.particles.emit(t.x+(r()-.5)*.5,n+.2,.9,(r()-.5)*3,3+r()*3,0,.5,r()<.5?16766814:r()<.5?16777215:16752412);else if(e===`frunze`){let e=[14711327,13124666,9263659,15905857];this.particles.emit(t.x+(r()-.5)*1.2,n+.5+r(),1,(r()-.5)*2.5,2.5+r()*1.5,0,.9,e[r()*e.length|0])}else if(e===`tricolor`){let e=[2776023,16568598,15020095];for(let r=0;r<3;r++)this.particles.emit(t.x+(r-1)*.24,n+.3,.9,0,1.2,0,.7,e[r])}}emitRideParticles(){let e=this.player,t=hd[this.biome].ride;if(t===`snowboard`){let t=e.sliding?3:1;for(let n=0;n<t;n++)this.particles.emit(e.x+(Math.random()-.5)*.4,.12,.9,(Math.random()-.5)*2.2,1.2+Math.random()*1.6,0,.45+Math.random()*.25,Math.random()<.5?16777215:14412540)}else if(t===`boat`){for(let t of[-.55,.55])this.particles.emit(e.x+t,.06,1.3,t*2.2,.4+Math.random()*.6,0,.7+Math.random()*.3,Math.random()<.5?16777215:14086646);Math.random()<.7&&this.particles.emit(e.x+(Math.random()-.5)*.5,.35,1.5,(Math.random()-.5)*1.5,2+Math.random()*2.5,1,.45,15268863),Math.abs(e.laneVel)>3&&Math.random()<.8&&this.particles.emit(e.x-Math.sign(e.laneVel)*.9,.1,.2,-Math.sign(e.laneVel)*3,2.5,0,.5,16777215)}}updateWarp(e){let t=this.transitions[0],n=0;if(this.warpAmt=0,t){let r=(t.gateS-this.distance)/Math.max(this.speed,4);if(this.gate.update(this.distance,this.clock,r),r<Y_&&(n=Math.min(1,(1-r/Y_)**2)),this.warpAmt=Pt.clamp(1-r/1.6,0,1),r<3&&r>0&&e>0&&this.state===`playing`){let e=this.gate.colors;for(let n=0;n<3;n++){let n=Math.random()*Math.PI*2,r=1.5+Math.random()*3.5;this.particles.emit(Math.cos(n)*r,2.6+Math.sin(n)*r*.8,-(t.gateS-this.distance)+2,-Math.cos(n)*2,1.5,10+Math.random()*6,.8,e[Math.random()*e.length|0])}}}this.warpOut<X_&&(this.warpOut+=e,n=Math.max(n,1-this.warpOut/X_),this.warpAmt=Math.max(this.warpAmt,1-this.warpOut/X_)),this.ui.setWarp?.(n)}emitPowerParticles(){let e=this.player;if(e.flying){for(let t of[-.25,.1])this.particles.emit(e.x+t,e.y+.55,.35,(Math.random()-.5)*.6,-6-Math.random()*3,1.5,.35,Math.random()<.6?16753210:16773296);Math.random()<.5&&this.particles.emit(e.x,e.y+.3,.6,(Math.random()-.5)*1.2,-2,2.5,.7,15660283)}this.powers.active(`board`)&&Math.random()<.7&&this.particles.emit(e.x+(Math.random()-.5)*.5,e.y+.12,.9,(Math.random()-.5)*1.5,1+Math.random()*1.5,.5,.5,Math.random()<.5?16766814:16777215)}updatePreviewCamera(){let e=this.camera.aspect,t=this.preview.kind===`bear`,n=t?3.3:2.4,r=t?4.4:2.7,i=Pt.degToRad(this.baseFov),a=Math.tan(i/2);if(e<1.25){let t=Math.max(n/(.8*a),r/(1.84*a*e)),o=n*.42;this.camera.position.set(0,o,t),this.camera.lookAt(0,o-t*Math.tan(i*.235),0)}else{let t=Math.max(n/(1.16*a),r/(.84*a*e)),i=a*e*t*.4;this.camera.position.set(i,n*.62,t),this.camera.lookAt(i,n*.44,0)}Math.abs(this.baseFov-this.camera.fov)>.05&&(this.camera.fov=this.baseFov,this.camera.updateProjectionMatrix())}updateCamera(e){if(this.preview&&this.state===`menu`)return this.updatePreviewCamera();this.rig.update(e,{player:this.player,speed:this.speed*this.timeScale,speedK:c_(this.speed*this.timeScale),baseFov:this.baseFov,warp:this.warpAmt||0,chase:this.bearView.riding&&this.bearView.root.visible,lifted:this.player.flying||this.jetLanding})}render(e){this.renderer.info.reset(),this.clock+=e;let t=this.state===`playing`,n=this.state===`dying`,r=this.state===`gameover`;this.state===`menu`&&(this.distance+=J_*e);let i=this.speed*this.timeScale,a=this.state===`menu`?this.preview:null;if(a&&e>0&&(a.yaw+=e*.5),this.syncEntities(e),this.world.update(this.distance,i,e,this.camera,this.player.x),this.updateWarp(e),this.ui.setSlowmo?.(t||this.state===`paused`?(1-this.timeScale)/(1-K.power.slowScale):0),this.playerView.update(this.player,e,{invulnerable:t&&(this.invulnerable||this.powers.landGrace>0),dead:this.caught&&(n||r||this.state===`revive`),riding:!r&&!this.caught,speed:i,speedK:c_(i),events:this.frameEvents,state:this.state,previewYaw:a?a.yaw:void 0,power:{magnet:this.powers.active(`magnet`),board:this.powers.active(`board`),jetpack:this.powers.active(`jetpack`)||this.jetLanding,shield:this.powers.active(`shield`),slowmo:this.powers.active(`slowmo`),ending:{magnet:this.powers.ending(`magnet`),board:this.powers.ending(`board`),jetpack:this.powers.ending(`jetpack`)||this.jetLanding,shield:this.powers.ending(`shield`),slowmo:this.powers.ending(`slowmo`)}}}),this.sfx.jet(t&&this.player.flying),t&&e>0&&this.emitPowerParticles(),this.bearView.caughtT=this.caughtT,a?.kind===`bear`?(this.playerView.root.visible=!1,this.playerView.shadow.visible=!1,this.bearView.showcase(0,0,a.yaw,e,14)):this.bearView.update(this.bear,this.player.x,e,this.speed),(t||this.state===`menu`)&&this.player.grounded&&e>0&&a?.kind!==`bear`&&this.emitRideParticles(),(t||this.state===`menu`)&&e>0&&a?.kind!==`bear`&&this.emitTrail(),this.bearView.root.visible&&hd[this.biome].water&&e>0&&Math.random()<.6){let e=this.bearView.root.position.z,t=this.bearView.root.position.x;if(this.bearView.mode===`hydro`){this.particles.emit(t+(Math.random()-.5)*.5,.5,e+.4,(Math.random()-.5)*1.5,3+Math.random()*3,3,.55,Math.random()<.5?16777215:12576496);let n=Math.random()<.5?-.85:.85;this.particles.emit(t+n*.85,.08,e-.4,n*1.5,.6,0,.6,15268863)}else this.particles.emit(t+(Math.random()-.5)*1.6,.1,e-1.2,(Math.random()-.5)*2,2+Math.random()*2,0,.5,Math.random()<.5?16777215:12576496)}this.particles.update(e,i);let o=c_(i);this.fx.update(e,{state:this.state,player:this.player,speed:i,speedK:o,distance:this.distance,timeScale:this.timeScale,chasing:this.bear.phase===Nd.CHASING}),this.sfx.update?.(e,{state:this.state,biome:hd[this.biome].id,speedK:o,chasing:this.bear.phase===Nd.CHASING,timeScale:this.timeScale,flying:this.player.flying}),this.frameEvents.length=0,this.updateCamera(e),(t||n)&&(this.ui.setHud(this.score,this.coinsCollected,Math.round(i*3),this.crownsCollected),this.ui.setBear(this.bear.phase===Nd.CHASING?this.bear.remainingFraction:null)),t&&e>0&&this.announceMissions(e),this.post.render(e)}announceMissions(e){if(this.missionT+=e,!(this.missionT<.5)){this.missionT=0;for(let e of Pf(this.meta.missions,this.liveStats())){let t=`${e.scope}:${e.id}`;if(!e.complete||e.claimed||this.announced.has(t))continue;this.announced.add(t);let n=this.meta.missions[e.scope].list.find(t=>t.id===e.id);!n||n.progress>=e.goal||(this.ui.toast?.(`Misiune îndeplinită: ${Sf(e.scope,n)}`,`good`),this.sfx.claim?.())}}}start(){this.last=performance.now(),requestAnimationFrame(this.loop)}loop(e){requestAnimationFrame(this.loop),this.frame(e)}frame(e){let t=Math.max(0,(e-this.last)/1e3);this.last=e;let n=Math.min(t,G_),r=this.hitStop>0;r?this.hitStop=Math.max(0,this.hitStop-t):(this.state===`playing`||this.state===`dying`)&&this.advance(n),this.render(r||this.state===`paused`||this.state===`revive`?0:n),this.trackFps(t)}resize(){let e=Math.max(1,this.canvas.clientWidth||window.innerWidth),t=Math.max(1,this.canvas.clientHeight||window.innerHeight);this.renderer.setPixelRatio(this.dprSteps[this.qualityLevel]),this.renderer.setSize(e,t,!1),this.post.setSize(e,t,this.dprSteps[this.qualityLevel]);let n=e/t;this.camera.aspect=n;let r=2*Math.atan(.52/n)*180/Math.PI;this.baseFov=Math.min(88,Math.max(58,r)),this.camera.fov=this.baseFov,this.camera.updateProjectionMatrix();let i=this.isTouch&&window.innerWidth>window.innerHeight&&window.innerHeight<520;this.ui.showRotate(i),i&&this.autoPause()}trackFps(e){if(this.state!==`playing`||this.runTime<2.5||document.hidden){this.fpsT=0,this.fpsN=0;return}if(this.fpsT+=e,this.fpsN++,this.fpsT<1.5)return;let t=this.fpsN/this.fpsT;this.fps=t,this.fpsT=0,this.fpsN=0,this.lowFpsCount=t<45?this.lowFpsCount+1:0,this.lowFpsCount>=2&&this.qualityLevel<this.dprSteps.length-1&&(this.qualityLevel++,this.lowFpsCount=0,this.applyQuality())}applyQuality(){let e=this.qualityLevel;this.setShadows(e<(this.mobile?1:2)),this.world.setSnowAmount([1,.6,.35,.2][e]),this.particles.limit=Math.max(40,Math.floor(this.particles.capacity*[1,.6,.35,.2][e])),this.particles.cursor=0,this.fx.setQuality(e),this.post.setQuality(e),this.resize()}setShadows(e){this.shadows=e,this.world.setShadows(e),this.playerView.setBlobShadow(!e)}stepSim(e,t=1/60,n){for(let r=0;r<e-1e-9&&(n&&n(this),this.state===`playing`||this.state===`dying`);r+=t)this.advance(t)}spawnDebug(e,t,n){let r=ld[e],i=r.lanes===3?[-1,0,1]:[t],a=this.obstaclePool.acquire(e);a.position.x=t*K.laneW*(r.lanes===3?0:1);let o={type:e,lanes:i,s:this.distance+n,cell:r.cell,mesh:a,ghost:!1,knockT:0,biome:this.biome};return r.move&&(o.rowS=o.s,o.s=_d(o,this.distance)),this.obstacles.push(o),o}givePower(e){this.applyPickup(e)}spawnPickup(e,t,n){let r=this.pickupPool.acquire(e),i={type:e,lane:t,s:this.distance+n,mesh:r,taken:!1};return this.pickups.push(i),i}get biomes(){return hd}get cfg(){return K}get defs(){return ld}forceTransition(){this.biomeStart=this.runTime-K.biome.duration}snapshot(){return{biome:this.biome,biomeId:hd[this.biome].id,transitions:this.transitions.length,powers:{...this.powers.remaining},landGrace:this.powers.landGrace,timeScale:this.timeScale,crowns:this.crownsCollected,revivesUsed:this.revive.used,reviveState:this.revive.state,reviveGrace:this.reviveGrace,skin:this.playerView.skinId,bearSkin:this.bearView.skinId,wallet:{...this.meta.wallet},flying:this.player.flying,superJump:this.player.superJump,pickups:this.pickups.length,state:this.state,distance:this.distance,speed:this.speed,runTime:this.runTime,score:this.score,coins:this.coinsCollected,bear:this.bear.phase,bearRemaining:this.bear.remaining,invulnerable:this.bear.invulnerable,protected:this.invulnerable,obstacles:this.obstacles.length,coinEntities:this.coins.length,meshesCreated:this.obstaclePool.created+this.coinPool.created+this.pickupPool.created,quality:this.qualityLevel,lane:this.player.lane,x:this.player.x,y:this.player.y,geometries:this.renderer.info.memory.geometries,textures:this.renderer.info.memory.textures}}},Q_=`winterRunner.leaderboard.v1`;function $_(e){let t=typeof e==`string`?e:``;return t=t.replace(/[\u0000-\u001f\u007f<>]/g,``).replace(/\s+/g,` `).trim(),t=Array.from(t).slice(0,12).join(``).trim(),t||`Jucător`}function ev(e){return e&&typeof e==`object`&&typeof e.score==`number`&&Number.isFinite(e.score)&&e.score>=0}function tv(e){if(!Array.isArray(e))return[];let t=e.filter(ev).map((e,t)=>({id:typeof e.id==`string`?e.id:`legacy-${t}`,name:$_(e.name),score:Math.min(1e9,Math.floor(e.score)),coins:Number.isFinite(e.coins)?Math.max(0,Math.floor(e.coins)):0,distance:Number.isFinite(e.distance)?Math.max(0,Math.floor(e.distance)):0,date:typeof e.date==`string`?e.date:``}));return t.sort((e,t)=>t.score-e.score||(e.date<t.date?-1:+(e.date>t.date))),t.slice(0,10)}function nv(){try{let e=globalThis.localStorage;if(!e)throw Error(`no storage`);let t=`__wr_probe__`;return e.setItem(t,`1`),e.removeItem(t),e}catch{let e=new Map;return{getItem:t=>e.has(t)?e.get(t):null,setItem:(t,n)=>void e.set(t,String(n)),removeItem:t=>void e.delete(t)}}}function rv(e=nv(),t=()=>new Date){function n(){try{let t=e.getItem(Q_);return t?tv(JSON.parse(t)):[]}catch{return[]}}function r(t){try{return e.setItem(Q_,JSON.stringify(t)),!0}catch{return!1}}let i=null;return{getTop(){return i??n()},qualifies(e){let t=Math.floor(e);if(!Number.isFinite(t)||t<=0)return!1;let n=this.getTop();return n.length<10||t>n[n.length-1].score},add({name:e,score:n,coins:a=0,distance:o=0}){let s={id:`${t().getTime().toString(36)}-${Math.random().toString(36).slice(2,8)}`,name:$_(e),score:Math.floor(n),coins:a,distance:o,date:t().toISOString()},c=tv([...this.getTop(),s]),l=c.findIndex(e=>e.id===s.id);return i=r(c)?null:c,{entries:c,entry:s,rank:l>=0?l+1:null}},clear(){i=null;try{e.removeItem(Q_)}catch{}}}}function Q(e,t={},n=[]){let r=document.createElement(e);if(t.class&&(r.className=t.class),t.text!==void 0&&(r.textContent=String(t.text)),t.attrs)for(let[e,n]of Object.entries(t.attrs))r.setAttribute(e,String(n));if(t.on)for(let[e,n]of Object.entries(t.on))r.addEventListener(e,n);for(let e of n)e&&r.appendChild(e);return r}var iv=320,av=32,ov={t:-1/0,x:0,y:0,el:null};function sv(e,t){return e.addEventListener(`click`,n=>{n.currentTarget.blur?.();let r=performance.now(),i=n.detail>0&&Math.hypot(n.clientX-ov.x,n.clientY-ov.y)<av;r-ov.t<iv&&(e===ov.el||i)||(ov.t=r,ov.x=n.clientX,ov.y=n.clientY,ov.el=e,t(n))}),e}function cv(e){return`${Math.round((Number.isFinite(e)?Math.max(0,Math.min(1,e)):0)*100)}%`}var lv=[`Poiana`,`Republicii`,`Tractorul`,`AFI`,`Noua`],uv=()=>({score:-1,coins:-1,speed:-1,bear:-2,crowns:-1,combo:``}),dv=4,fv=()=>!!globalThis.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches,pv=class{constructor(e){this.h=e;let t=e=>document.getElementById(e);this.el={flash:t(`flash`),hud:t(`hud`),score:t(`hud-score`),coins:t(`hud-coins`),crowns:t(`hud-crowns`),crownChip:t(`hud-crown-chip`),speed:t(`hud-speed`),bearBar:t(`bear-bar`),bearFill:t(`bear-fill`),btnMute:t(`btn-mute`),muteIcon:t(`mute-icon`),btnSound:t(`btn-sound`),btnPause:t(`btn-pause`),btnEmote:t(`btn-emote`),emote:t(`emote`),edge:t(`edge`),coinChip:t(`hud-coins`).parentElement,combo:t(`combo`),comboX:t(`combo-x`),comboFill:t(`combo-fill`),popups:t(`popups`),hints:t(`hints`),btnMusic:t(`btn-music`),overRecord:t(`over-record`),overStyle:t(`over-style`),start:t(`screen-start`),pause:t(`screen-pause`),over:t(`screen-over`),revive:t(`screen-revive`),rotate:t(`screen-rotate`),boardStart:t(`board-start`),boardOver:t(`board-over`),boardStartTitle:t(`board-start-title`),boardStartNote:t(`board-start-note`),boardOverTitle:t(`board-over-title`),overTitle:t(`over-title`),overScore:t(`over-score`),overCoins:t(`over-coins`),overDistance:t(`over-distance`),overCrowns:t(`over-crowns`),overCrownsWrap:t(`over-crowns-wrap`),overEarned:t(`over-earned`),overMissions:t(`over-missions`),nameForm:t(`name-form`),nameInput:t(`name-input`),nameMsg:t(`name-msg`),overNote:t(`over-note`),warp:t(`warp`),slowmo:t(`slowmo`),levelTitle:t(`level-title`),levelNum:t(`level-num`),levelName:t(`level-name`),levelSub:t(`level-sub`),hudLevel:t(`hud-level`),levelPick:t(`level-pick`),reviveSub:t(`revive-sub`),reviveAd:t(`btn-revive-ad`),reviveCrowns:t(`btn-revive-crowns`),reviveNo:t(`btn-revive-no`),reviveWallet:t(`revive-wallet`),reviveMsg:t(`revive-msg`),ad:t(`ad-overlay`),adFill:t(`ad-fill`),adCount:t(`ad-count`),toasts:t(`toasts`),install:t(`btn-install`),iosHint:t(`ios-hint`),saveWarning:t(`save-warning`)},this.warpValue=-1,this.slowValue=-1,this.pickButtons=hd.map((e,t)=>{let n=Q(`button`,{class:`level-chip`,attrs:{type:`button`,role:`radio`,"data-level":t,title:e.name}},[Q(`b`,{text:t+1}),Q(`span`,{text:lv[t]??e.name})]);return sv(n,()=>this.h.onPickLevel?.(t)),this.el.levelPick.appendChild(n),n}),this.markLevel(0),this.last=uv(),this.el.nameInput.maxLength=12;let n=(e,n)=>sv(t(e),n);n(`btn-play`,()=>this.h.onPlay()),n(`btn-resume`,()=>this.h.onResume()),n(`btn-restart`,()=>this.h.onRestart()),n(`btn-menu-pause`,()=>this.h.onMenu()),n(`btn-again`,()=>this.h.onPlay()),n(`btn-menu-over`,()=>this.h.onMenu()),n(`btn-pause`,()=>this.h.onPause()),n(`btn-mute`,()=>this.h.onToggleMute()),n(`btn-sound`,()=>this.h.onToggleMute()),n(`btn-music`,()=>this.h.onMusic?.()),n(`btn-emote`,()=>this.h.onEmote?.()),n(`btn-revive-ad`,()=>this.h.onReviveAd?.()),n(`btn-revive-crowns`,()=>this.h.onReviveCrowns?.()),n(`btn-revive-no`,()=>this.h.onReviveNo?.()),n(`btn-install`,()=>this.h.onInstall?.()),n(`btn-missions`,()=>this.h.onOpen?.(`missions`)),n(`btn-pass`,()=>this.h.onOpen?.(`pass`)),n(`side-pass`,()=>this.h.onOpen?.(`pass`)),n(`btn-wardrobe`,()=>this.h.onOpen?.(`wardrobe`)),t(`name-form`).addEventListener(`submit`,e=>{e.preventDefault(),this.h.onSubmitName(this.el.nameInput.value)})}showHud(e){this.el.hud.hidden=!e,e?this.last=uv():(this.clearPopups(),this.hideHints(),this.el.edge.classList.remove(`on`,`low`))}retrigger(e,t){e.classList.remove(t),e.offsetWidth,e.classList.add(t)}setHud(e,t,n,r=0){let i=this.last;e!==i.score&&(this.el.score.textContent=String(e),i.score=e),t!==i.coins&&(this.el.coins.textContent=String(t),i.coins>=0&&t>i.coins&&this.retrigger(this.el.coinChip,`bump`),i.coins=t),n!==i.speed&&(this.el.speed.textContent=String(n),i.speed=n),r!==i.crowns&&(this.el.crowns.textContent=String(r),this.el.crownChip.hidden=r<=0,i.crowns=r)}setBear(e){let t=e===null?-1:Math.round(e*200);if(t!==this.last.bear){if(this.last.bear=t,e===null)this.el.bearBar.hidden=!0,this.el.bearBar.classList.remove(`low`),this.el.edge.classList.remove(`on`,`low`);else{let t=Math.max(0,Math.min(1,e));this.el.bearBar.hidden=!1,this.el.bearFill.style.transform=`scaleX(${t})`,this.el.bearBar.classList.toggle(`low`,t<.3),this.el.edge.classList.add(`on`),this.el.edge.classList.toggle(`low`,t<.3)}}}setCombo(e,t){let n=e<3?``:`${e}|${Math.round(Math.max(0,Math.min(1,t))*40)}`;if(n===this.last.combo)return;let r=this.last.combo?Number(this.last.combo.split(`|`)[0]):0;this.last.combo=n;let i=this.el;if(!n){i.combo.hidden=!0;return}let a=i.combo.hidden;i.combo.hidden=!1,i.combo.dataset.heat=e>=25?`3`:e>=10?`2`:`1`,i.comboFill.style.transform=`scaleX(${Math.max(0,Math.min(1,t))})`,e!==r&&(i.comboX.textContent=`×${e}`,this.retrigger(i.combo,a?`in`:`pop`),a&&i.combo.classList.remove(`pop`))}popup(e,t=`near`){let n=this.el.popups;if(!n||this.el.hud.hidden)return;for(;n.children.length>=dv;)n.firstChild.remove();let r=Q(`div`,{class:`popup ${t}`,text:e});this.popupSide=(this.popupSide||0)^1,r.style.setProperty(`--dx`,`${this.popupSide?18:-18}px`),r.style.setProperty(`--dy`,`${this.popupSide?40:0}px`),n.appendChild(r),setTimeout(()=>r.remove(),1500)}clearPopups(){this.el.popups?.replaceChildren()}showHints(e){let t=this.el.hints;if(t.replaceChildren(),e)t.appendChild(Q(`span`,{text:`Glisează ← → pentru benzi, ↑ sari, ↓ aluneci`}));else{let e=e=>Q(`kbd`,{text:e}),n=(e,t)=>Q(`span`,{class:`hint-item`},[...e,Q(`span`,{text:t})]);t.appendChild(n([e(`←`),e(`→`)],`schimbi culoarul`)),t.appendChild(n([e(`↑`),e(`Space`)],`sari`)),t.appendChild(n([e(`↓`)],`aluneci`))}t.hidden=!1,t.classList.remove(`out`),this.retrigger(t,`in`),clearTimeout(this.hintTimer),this.hintTimer=setTimeout(()=>this.hideHints(),5200)}hideHints(){clearTimeout(this.hintTimer),this.el.hints.hidden=!0}markLevel(e){this.pickButtons.forEach((t,n)=>{t.classList.toggle(`on`,n===e),t.setAttribute(`aria-checked`,n===e?`true`:`false`)})}setLevel(e,t){this.el.hudLevel.textContent=`${e+1} · ${t}`}setWarp(e){let t=Math.round(e*100)/100;t!==this.warpValue&&(this.warpValue=t,this.el.warp.style.opacity=String(t))}setSlowmo(e){let t=Math.round(Math.max(0,Math.min(1,e))*50)/50;t!==this.slowValue&&(this.slowValue=t,this.el.slowmo.style.opacity=String(t))}showLevelTitle(e,t,n){let r=this.el.levelTitle;this.el.levelNum.textContent=`NIVELUL ${n+1}`,this.el.levelName.textContent=e,this.el.levelSub.textContent=t,r.hidden=!1,r.classList.remove(`show`),r.offsetWidth,r.classList.add(`show`),clearTimeout(this.titleTimer),this.titleTimer=setTimeout(()=>r.hidden=!0,3200)}hideLevelTitle(){clearTimeout(this.titleTimer),this.el.levelTitle.hidden=!0}flash(){let e=this.el.flash;e.classList.remove(`on`),e.offsetWidth,e.classList.add(`on`)}setMuted(e){this.el.btnMute.classList.toggle(`muted`,e),this.el.btnMute.setAttribute(`aria-label`,e?`Pornește sunetul`:`Oprește sunetul`),this.el.muteIcon.textContent=e?`✕`:`♪`,this.el.btnSound.textContent=e?`Sunet: oprit`:`Sunet: pornit`}setMusic(e){let t=this.el.btnMusic;t.hidden=!1,t.classList.toggle(`off`,!e),t.setAttribute(`aria-pressed`,e?`true`:`false`),t.textContent=e?`Muzică: pornită`:`Muzică: oprită`}setEmote(e){this.el.btnEmote.hidden=!e,this.el.btnEmote.textContent=e||``}showEmote(e){if(!e)return;let t=this.el.emote;t.textContent=e,t.hidden=!1,t.classList.remove(`show`),t.offsetWidth,t.classList.add(`show`),clearTimeout(this.emoteTimer),this.emoteTimer=setTimeout(()=>t.hidden=!0,1600)}toast(e,t=``,{action:n,sticky:r=!1}={}){let i=this.el.toasts;for(;i.children.length>=3;)i.firstChild.remove();let a=Q(`div`,{class:`toast ${t}`.trim()},[Q(`span`,{text:e})]),o=()=>a.remove();return n&&a.appendChild(sv(Q(`button`,{class:`toast-btn`,text:n.label,attrs:{type:`button`}}),()=>{o(),n.run()})),r?a.appendChild(sv(Q(`button`,{class:`toast-x`,text:`✕`,attrs:{type:`button`,"aria-label":`Închide`}}),o)):setTimeout(o,t===`warn`?7e3:3600),i.appendChild(a),a}hideAll(){this.hideLevelTitle(),this.setWarp(0),this.setSlowmo(0),this.cancelCount(),this.hideHints(),this.el.start.hidden=!0,this.el.pause.hidden=!0,this.el.over.hidden=!0,this.el.revive.hidden=!0,this.h.onHideAll?.()}startVisible(){return!this.el.start.hidden}showStart(e){this.hideAll(),this.showHud(!1),this.renderBoard(this.el.boardStart,e),this.el.start.hidden=!1,this.h.onMenuShown?.()}showPause(e){this.el.pause.hidden=!e}showRotate(e){this.el.rotate.hidden=!e}showRevive(e){let t=this.el;this.showHud(!1),t.reviveSub.textContent=`Te-a prins ursul. Poți continua cursa de aici (reluarea ${e.used+1} din ${e.limit}).`,t.reviveCrowns.textContent=`Plătește ${e.cost} 👑`,t.reviveCrowns.disabled=!e.canPay,t.reviveWallet.textContent=e.canPay?`Ai ${e.crowns} 👑.`:`Ai ${e.crowns} 👑: nu ajung pentru această reluare.`,t.reviveAd.hidden=!e.adAllowed,t.reviveAd.disabled=!e.adAvailable,t.reviveAd.textContent=e.adAvailable?`▶ Vezi o reclamă`:e.adReason===`offline`?`Reclamă indisponibilă (offline)`:`Reclamă indisponibilă`,t.reviveMsg.hidden=!e.message,t.reviveMsg.textContent=e.message||``,t.reviveNo.disabled=!1,t.revive.hidden=!1}setReviveBusy(e){this.el.reviveAd.disabled=e,this.el.reviveCrowns.disabled=e,this.el.reviveNo.disabled=e}hideRevive(){this.el.revive.hidden=!0}adView(){return{open:e=>{this.el.ad.hidden=!1,this.adView().update(e)},update:e=>{this.el.adFill.style.width=cv(e.fraction);let t=Math.ceil(e.remaining);this.el.adCount.textContent=e.visible===!1?`Pauză: revino în joc ca să continue.`:t===1?`Mai rămâne 1 secundă`:`Mai rămân ${t} secunde`},close:()=>{this.el.ad.hidden=!0}}}showGameOver(e){this.hideAll(),this.showHud(!1),this.el.overTitle.textContent=e.caught?`Te-a prins ursul!`:`Cursă încheiată`,this.countUp(this.el.overScore,e.score);let t=e.record??(!!e.qualifies&&e.score>0&&!(e.entries?.length&&e.entries[0].score>=e.score));this.el.overRecord.hidden=!t,t&&this.retrigger(this.el.overRecord,`in`);let n=e.style,r=this.el.overStyle;if(r.hidden=!(n&&n.bonus>0),!r.hidden){let e=[`Bonus de stil +${n.bonus}`];n.nearMisses>0&&e.push(`${n.nearMisses} la limită`),n.bestStreak>=3&&e.push(`serie de ${n.bestStreak}`),r.textContent=e.join(` · `)}this.el.over.classList.remove(`land`),this.el.over.offsetWidth,this.el.over.classList.add(`land`),this.el.overCoins.textContent=String(e.coins),this.el.overDistance.textContent=String(Math.floor(e.distance)),this.el.overCrowns.textContent=String(e.crowns||0),this.el.overCrownsWrap.hidden=!(e.crowns>0);let i=[`+${e.xp||0} XP pentru pass`];e.tiersGained>0&&i.push(e.tiersGained===1?`treaptă nouă în pass!`:`${e.tiersGained} trepte noi în pass!`),this.el.overEarned.textContent=i.join(` · `);let a=this.el.overMissions;a.replaceChildren();for(let t of e.missions||[])a.appendChild(Q(`li`,{text:`✓ ${t.text}`}));a.hidden=!a.children.length,this.el.overNote.hidden=!0,e.auto?(this.el.nameForm.hidden=!0,this.el.overNote.hidden=!1,this.el.overNote.textContent=e.score>0?`Scorul se salvează în clasament…`:`Mai încearcă!`,this.renderBoard(this.el.boardOver,e.entries),this.el.over.hidden=!1):e.qualifies?(this.el.nameForm.hidden=!1,this.el.nameMsg.textContent=`Scor nou în Top 10! Scrie-ți numele:`,this.el.nameInput.value=e.lastName||``,this.renderBoard(this.el.boardOver,e.entries),this.el.over.hidden=!1,setTimeout(()=>this.el.nameInput.focus(),50)):(this.el.nameForm.hidden=!0,this.el.overNote.hidden=!1,this.el.overNote.textContent=e.score>0?`De data asta n-ai intrat în Top 10. Mai încearcă!`:`Mai încearcă!`,this.renderBoard(this.el.boardOver,e.entries),this.el.over.hidden=!1)}countUp(e,t,n=900){this.cancelCount();let r=String(t);if(fv()||t<20){e.textContent=r;return}let i=performance.now();e.textContent=`0`;let a=r=>{let o=Math.min(1,(r-i)/n);e.textContent=String(Math.round(t*(1-(1-o)**3))),this.countRaf=o<1?requestAnimationFrame(a):0};this.countRaf=requestAnimationFrame(a),this.countTimer=setTimeout(()=>{this.cancelCount(),e.textContent=r},n+250)}cancelCount(){cancelAnimationFrame(this.countRaf),clearTimeout(this.countTimer),this.countRaf=0}showSaved(e,t,n){this.el.nameForm.hidden=!0,this.el.overNote.hidden=!1,this.el.overNote.textContent=n?`Salvat! Ești pe locul ${n}.`:`Salvat!`,this.renderBoard(this.el.boardOver,e,t),this.el.nameInput.blur()}setOverNote(e){this.el.over.hidden||(this.el.overNote.hidden=!e,this.el.overNote.textContent=e||``)}setGlobalBoard(e){this.globalBoard=e,this.el.boardStartTitle.textContent=e?e.title:`Top 10`,this.el.boardOverTitle.textContent=e?.over?e.title:`Top 10`,this.el.boardStartNote.hidden=!this.boardNote&&!e?.note,this.el.boardStartNote.textContent=e?.note||this.boardNote||``;for(let e of[this.el.boardStart,this.el.boardOver])this.renderBoard(e,...e._local||[[]])}setBoardNote(e){this.boardNote=e||``,this.globalBoard||(this.el.boardStartNote.hidden=!e,this.el.boardStartNote.textContent=e||``)}renderBoard(e,t,n){e._local=[t,n];let r=this.globalBoard;r&&(e===this.el.boardStart||r.over)&&(t=r.entries,n=r.meId),e.replaceChildren(),t.length?t.forEach((t,r)=>{let i=Q(`li`,{class:t.id===n?`me`:``},[Q(`span`,{class:`rank`,text:t.rank??r+1}),Q(`span`,{class:`name`,text:t.name}),Q(`span`,{class:`score`,text:t.score})]);e.appendChild(i)}):e.appendChild(Q(`li`,{class:`empty`,text:`Niciun scor încă. Fii primul!`}))}},mv=Object.freeze([`free`,`premium`]),hv=[`Iarna în Poiana`,`Mărțișor pe Republicii`,`Zilele Brașovului`,`Junii din Șchei`,`Vara la Noua`,`Toamna pe Tâmpa`,`Târgul de Crăciun`];function gv(e=K.pass){let[t,n,r]=e.epoch;return Math.floor(Date.UTC(t,n-1,r)/864e5)}function _v(e,t=K.pass){return Math.max(0,Math.floor((nf(e)-gv(t))/t.seasonDays))}function vv(e,t=K.pass){let n=nf(e)-gv(t);return n<0?t.seasonDays:t.seasonDays-n%t.seasonDays}function yv(e){return`Sezonul ${e+1}: ${hv[e%hv.length]}`}var bv=K.pass.tiers,xv={10:[`emoji`,`urs`],20:[`trail`,`fulgi`],30:[`emoji`,`munte`],[bv]:[`boy`,`schior`]},Sv={8:[`emoji`,`cool`],22:[`trail`,`frunze`],34:[`trail`,`tricolor`],[bv]:[`bear`,`craciun`]};function Cv(e=K.pass){return{free:{tier:e.tiers,...wv(e.tiers,`free`)},premium:{tier:e.tiers,...wv(e.tiers,`premium`)}}}function wv(e,t){let n=t===`premium`?Sv:xv;return n[e]?{item:{kind:n[e][0],id:n[e][1]}}:t===`free`?e%4==0?{crowns:5}:{coins:100+20*Math.floor(e/5)}:e%3==0?{crowns:10}:{coins:250+50*Math.floor(e/5)}}function Tv(e=K.pass){let t=[];for(let n=1;n<=e.tiers;n++)t.push({tier:n,free:wv(n,`free`),premium:wv(n,`premium`)});return t}function Ev(e=new Date){return{season:_v(e),xp:0,premium:!1,claimed:{free:[],premium:[]}}}function Dv(e=K.pass){return e.tiers*e.xpPerTier}function Ov(e,t=K.pass){return Math.min(t.tiers,Math.floor(Math.max(0,e)/t.xpPerTier))}function kv(e,t=K.pass){let n=Ov(e.xp,t);return n>=t.tiers?{tier:n,into:t.xpPerTier,need:t.xpPerTier,done:!0}:{tier:n,into:e.xp-n*t.xpPerTier,need:t.xpPerTier,done:!1}}function Av(e,t=new Date,n=K.pass){let r=e&&typeof e==`object`?e:{},i=e=>typeof e==`number`&&Number.isFinite(e)?Math.max(0,Math.floor(e)):0,a={season:Number.isFinite(r.season)?Math.min(1e5,i(r.season)):_v(t,n),xp:Math.min(Dv(n),i(r.xp)),premium:r.premium===!0,claimed:{free:[],premium:[]}},o=Ov(a.xp,n);for(let e of mv){let t=new Set;for(let n of Array.isArray(r.claimed?.[e])?r.claimed[e]:[])!Number.isInteger(n)||n<1||n>o||t.has(n)||(e!==`premium`||a.premium)&&t.add(n);a.claimed[e]=[...t].sort((e,t)=>e-t)}return a}function jv(e,t,n=K.pass){let r=typeof t==`number`&&Number.isFinite(t)?Math.max(0,Math.floor(t)):0,i=e.xp,a=Ov(i,n);return e.xp=Math.min(Dv(n),i+r),{added:e.xp-i,tiersGained:Ov(e.xp,n)-a}}function Mv(e,t,n,r=K.pass){return!mv.includes(n)||!Number.isInteger(t)||t<1||t>r.tiers||t>Ov(e.xp,r)||n===`premium`&&!e.premium?!1:!e.claimed[n].includes(t)}function Nv(e,t,n,r=K.pass){return Mv(e,t,n,r)?(e.claimed[n].push(t),e.claimed[n].sort((e,t)=>e-t),wv(t,n)):null}function Pv(e,t=K.pass){let n=[],r=Ov(e.xp,t);for(let i=1;i<=r;i++)for(let r of mv)Mv(e,i,r,t)&&n.push({tier:i,track:r});return n}function Fv(e){return!e.premium&&(e.premium=!0,!0)}function Iv(e,t=new Date,n=K.pass){let r=_v(t,n),i={rolled:!1,autoClaimed:[],clockWentBack:!1,corrected:!1};if(r===e.season)return i;if(r<e.season)return i.clockWentBack=!0,e.season-r>1&&(e.season=r,i.corrected=!0),i;for(let t of Pv(e,n))i.autoClaimed.push({...t,reward:wv(t.tier,t.track)});return e.season=r,e.xp=0,e.premium=!1,e.claimed={free:[],premium:[]},i.rolled=!0,i}var Lv=[[`snowboard`,`Snowboard`,0],[`skate`,`Skateboard`,1],[`bike`,`Bicicletă`,2],[`boat`,`Hidrobicicletă`,4]],Rv=[[`run`,`Aleargă`,0],[`swim`,`Înoată`,4],[`unicycle`,`Monociclu`,2],[`hydro`,`Hidro-monociclu`,4]],zv={boy:`🧥`,bear:`🐻`,trail:`✨`,emoji:`😀`},Bv={boy:`Skin`,bear:`Skin de urs`,trail:`Trail`,emoji:`Emoji`};function Vv(e){if(!e)return``;if(e.item){let t=Wf(e.item.kind,e.item.id);return`${Bv[e.item.kind]??`Obiect`}: ${t?.glyph?`${t.glyph} `:``}${t?.name??e.item.id}`}let t=[];return e.xp&&t.push(`${e.xp} XP`),e.coins&&t.push(`${e.coins} bănuți`),e.crowns&&t.push(`${e.crowns} 👑`),t.join(` + `)}function Hv(e){return e.item?Wf(e.item.kind,e.item.id)?.name??e.item.id:e.crowns?e.crowns===1?`1 Coroană`:`${e.crowns} Coroane`:`${e.coins} bănuți`}function Uv(e){let t={coins:0,crowns:0,xp:0},n=[];for(let r of e||[])r.type===`item`?r.duplicate?(t.coins+=r.coins,n.push(`${r.name} (îl aveai deja: bănuți în schimb)`)):n.push(`nou: ${r.name}`):t[r.type]+=r.amount;let r=[];return t.xp&&r.push(`+${t.xp} XP`),t.coins&&r.push(`+${t.coins} bănuți`),t.crowns&&r.push(`+${t.crowns} 👑`),[...r,...n].join(` · `)}var Wv=class{constructor({meta:e,ui:t,game:n,sfx:r}){this.meta=e,this.ui=t,this.game=n,this.sfx=r;let i=e=>document.getElementById(e);this.el={start:i(`screen-start`),missions:i(`screen-missions`),pass:i(`screen-pass`),wardrobe:i(`screen-wardrobe`),missionTabs:i(`mission-tabs`),missionNote:i(`missions-note`),missionList:i(`missions-list`),bonus:i(`daily-bonus`),bonusText:i(`daily-bonus-text`),bonusBtn:i(`btn-daily-bonus`),passSeason:i(`pass-season`),passDays:i(`pass-days`),passTier:i(`pass-tier`),passXp:i(`pass-xp`),passFill:i(`pass-fill`),passPremium:i(`btn-pass-premium`),passClaimAll:i(`btn-pass-claim-all`),passNote:i(`pass-note`),passList:i(`pass-list`),passFeatured:i(`pass-featured`),wardTabs:i(`wardrobe-tabs`),wardRides:i(`wardrobe-rides`),wardList:i(`wardrobe-list`),wardName:i(`wardrobe-name`),wardDesc:i(`wardrobe-desc`),wardAction:i(`btn-wardrobe-action`),badgeMissions:i(`badge-missions`),badgePass:i(`badge-pass`),sidePassName:i(`side-pass-name`),sidePassSub:i(`side-pass-sub`),sidePassFill:i(`side-pass-fill`),sideMissions:i(`side-missions`)},this.open=null,this.scope=`daily`,this.kind=`boy`,this.selected=null,this.previewRide=null;for(let e of document.querySelectorAll(`[data-back]`))sv(e,()=>this.close());sv(this.el.bonusBtn,()=>this.claim(()=>this.meta.claimDailyBonus())),sv(this.el.passPremium,()=>this.buyPremium()),sv(this.el.passClaimAll,e=>{let t=new Set(this.meta.pass.claimed.free.map(e=>`free${e}`).concat(this.meta.pass.claimed.premium.map(e=>`premium${e}`))),n=e.currentTarget.getBoundingClientRect(),r=this.meta.claimAllPass();if(!r.length)return;this.afterGrant(r),this.burst(n.left+n.width/2,n.top+n.height/2,!0);let i=0;for(let e of this.el.passList.querySelectorAll(`.cell.claimed`))t.has(e.dataset.track+e.dataset.tier)||(e.style.setProperty(`--pop`,`${Math.min(i++,14)*40}ms`),e.classList.add(`pop`))}),sv(this.el.wardAction,()=>this.wardrobeAction());for(let e of gf)this.el.missionTabs.appendChild(sv(Q(`button`,{class:`tab`,text:_f[e],attrs:{type:`button`,role:`tab`,"data-scope":e}}),()=>{this.scope=e,this.renderMissions()}));for(let e of Bf)this.el.wardTabs.appendChild(sv(Q(`button`,{class:`tab`,text:`${zv[e]} ${Vf[e]}`,attrs:{type:`button`,role:`tab`,"data-kind":e}}),()=>this.showKind(e)))}show(e){if([`missions`,`pass`,`wardrobe`].includes(e)){if(this.meta.sync(),this.hideScreens(),this.open=e,this.el.start.hidden=!0,this.el[e].hidden=!1,e===`missions`)this.renderMissions();else if(e===`pass`){this.renderPass(),(this.el.passList.querySelector(`.cell.can`)??this.el.passList.querySelector(`.pass-row.current`))?.scrollIntoView({block:`center`});let e=this.el.pass;e.classList.remove(`intro`),e.offsetWidth,e.classList.add(`intro`),clearTimeout(this.introTimer),this.introTimer=setTimeout(()=>e.classList.remove(`intro`),1400)}else this.previewRide=null,this.showKind(this.kind);this.refreshWallet()}}hideScreens(){for(let e of[`missions`,`pass`,`wardrobe`])this.el[e].hidden=!0;this.open===`wardrobe`&&this.leaveWardrobe(),this.open=null}close(){this.open&&(this.hideScreens(),this.el.start.hidden=!1,this.refreshMenu())}closeSilently(){this.hideScreens()}refresh(){this.refreshMenu(),this.open===`missions`?this.renderMissions():this.open===`pass`?this.renderPass():this.open===`wardrobe`&&this.renderWardrobe()}refreshWallet(){let e=this.meta.wallet;for(let t of document.querySelectorAll(`[data-wallet]`)){let n=String(e[t.dataset.wallet]??0);if(t.textContent===n||(t.textContent=n,t.offsetParent===null))continue;let r=t.closest(`.chip`)??t;r.classList.remove(`bump`),r.offsetWidth,r.classList.add(`bump`)}}refreshMenu(){this.refreshWallet();let e=this.meta.badges();for(let[t,n]of[[this.el.badgeMissions,e.missions],[this.el.badgePass,e.pass]])t.hidden=n<=0,t.textContent=String(n);let t=this.meta.passInfo();this.el.sidePassName.textContent=t.name,this.el.sidePassSub.textContent=`Treapta ${t.tier} din ${K.pass.tiers} · ${this.daysText(t.daysLeft)}`,this.el.sidePassFill.style.width=cv(t.done?1:t.into/t.need);let n=this.el.sideMissions;n.replaceChildren();for(let e of this.meta.missions.daily.list){let t=yf(`daily`,e),r=e.progress>=t;n.appendChild(Q(`li`,{class:r?`done`:``},[Q(`span`,{text:Sf(`daily`,e)}),Q(`b`,{text:e.claimed?`✓`:r?`gata!`:`${Math.min(e.progress,t)}/${t}`})]))}}daysText(e){return e===1?`ultima zi`:`mai sunt ${e} zile`}afterGrant(e){this.sfx?.claim?.();let t=Uv(e);t&&this.ui.toast(t,`good`),this.refresh()}claim(e){let t=e();t&&this.afterGrant(t)}renderMissions(){let e=this.meta.missions;for(let e of this.el.missionTabs.children)e.classList.toggle(`on`,e.dataset.scope===this.scope);let t=this.scope;this.el.missionNote.textContent=t===`daily`?`Se schimbă în fiecare zi, la miezul nopții (după ceasul telefonului).`:t===`weekly`?`Se schimbă lunea (${this.daysText(cf(this.meta.now()))}).`:`Fiecare trebuie îndeplinită într-o singură cursă. După revendicare apare una nouă.`;let n=this.el.missionList;n.replaceChildren();for(let r of e[t].list){let e=yf(t,r),i=r.progress>=e,a=r.claimed?Q(`span`,{class:`claimed`,text:`Revendicat ✓`}):sv(Q(`button`,{class:`btn small primary`,text:`Revendică`,attrs:{type:`button`,"data-claim":r.id}}),()=>this.claim(()=>this.meta.claimMission(t,r.id)));r.claimed||(a.disabled=!i),n.appendChild(Q(`li`,{class:`mission${i?` done`:``}${r.claimed?` claimed`:``}`},[Q(`div`,{class:`mission-main`},[Q(`span`,{class:`mission-text`,text:Sf(t,r)}),Q(`span`,{class:`mission-reward`,text:Vv(Cf(t))}),Q(`span`,{class:`xp-bar`},[Q(`span`,{attrs:{style:`width:${cv(r.progress/e)}`}})]),Q(`span`,{class:`mission-count`,text:`${Math.min(r.progress,e)} / ${e}`})]),a]))}let r=t===`daily`;if(this.el.bonus.hidden=!r,r){let t=e.daily.bonusClaimed;this.el.bonusText.textContent=`Bonus pentru toate cele ${e.daily.list.length} misiuni zilnice: ${Vv(K.missions.reward.dailyBonus)}`,this.el.bonusBtn.textContent=t?`Revendicat ✓`:`Revendică`,this.el.bonusBtn.disabled=t||!Lf(e)}}renderPass(){let e=this.meta.passInfo(),t=this.meta.pass,n=this.el;n.passSeason.textContent=e.name,n.passDays.textContent=e.daysLeft===1?`Ultima zi a sezonului`:`Mai sunt ${e.daysLeft} zile`,n.passTier.textContent=`Treapta ${e.tier} din ${K.pass.tiers}`,n.passXp.textContent=e.done?`Pass terminat!`:`${e.into} / ${e.need} XP până la treapta următoare`,n.passFill.style.width=cv(e.done?1:e.into/e.need);let r=Xd(this.meta.wallet,{crowns:K.pass.premiumCost});n.passPremium.hidden=e.premium,n.passPremium.textContent=`Deblochează pista premium · ${K.pass.premiumCost} 👑`,n.passPremium.disabled=!r,n.passClaimAll.disabled=e.claimable===0,n.passClaimAll.textContent=e.claimable?`Revendică tot (${e.claimable})`:`Revendică tot`,n.passNote.textContent=e.premium?`Pista premium este deblocată în acest sezon.`:r?`Pista premium se cumpără doar cu Coroane câștigate în joc. Nu există plăți cu bani reali.`:`Îți mai trebuie ${K.pass.premiumCost-this.meta.wallet.crowns} 👑. Coroanele vin din misiuni, din pass și, rar, din curse. Nu există plăți cu bani reali.`;let i=e.tier,a=Cv();n.passFeatured.replaceChildren();for(let e of mv){let r=a[e],o=Wf(r.item.kind,r.item.id),s=t.claimed[e].includes(r.tier),c=Mv(t,r.tier,e),l=e===`premium`&&!t.premium,u=s?`Al tău ✓`:c?`Gata de revendicat!`:l?`🔒 Premium · treapta ${r.tier}`:`Treapta ${r.tier} · mai ai ${Math.max(0,r.tier-i)}`;n.passFeatured.appendChild(sv(Q(`button`,{class:`feat ${e}${s?` claimed`:``}${c?` can`:``}`,attrs:{type:`button`,"data-feat":e}},[Q(`span`,{class:`feat-ico`,text:zv[r.item.kind]}),Q(`span`,{class:`feat-body`},[Q(`span`,{class:`feat-track`,text:e===`free`?`Gratuit`:`Premium`}),Q(`span`,{class:`feat-name`,text:o?.name??``}),Q(`span`,{class:`feat-state`,text:u})])]),()=>n.passList.querySelector(`.pass-row[data-tier="${r.tier}"]`)?.scrollIntoView({block:`center`,behavior:`smooth`})))}let o=n.passList;o.replaceChildren();let s=Math.min(K.pass.tiers,i+1);for(let e of Tv()){let n=mv.map(n=>{let r=t.claimed[n].includes(e.tier),i=Mv(t,e.tier,n),a=n===`premium`&&!t.premium,o=e[n],s=!!o.item&&(o.item.kind===`boy`||o.item.kind===`bear`),c=`cell ${n}${r?` claimed`:``}${i?` can`:``}${a?` locked`:``}${s?` big`:``}`,l=Q(`span`,{class:`cell-ico${o.coins?` coin`:``}`,text:o.coins?``:o.crowns?`👑`:Wf(o.item.kind,o.item.id)?.glyph||zv[o.item.kind]}),u=Q(`span`,{class:`cell-reward`,text:Hv(o)}),d={"data-tier":e.tier,"data-track":n};return i?sv(Q(`button`,{class:c,attrs:{type:`button`,...d}},[l,u,Q(`span`,{class:`cell-state`,text:`Revendică`})]),t=>this.claimPassCell(e.tier,n,t)):Q(`div`,{class:c,attrs:d},[l,u,Q(`span`,{class:`cell-state`,text:r?`✓`:a?`🔒`:``})])}),r=Q(`li`,{class:`pass-row${e.tier<=i?` reached`:``}${e.tier===s?` current`:``}`,attrs:{"data-tier":e.tier}},[Q(`span`,{class:`tier-num`,text:e.tier}),...n]);r.style.setProperty(`--i`,String(Math.min(12,Math.abs(e.tier-s)))),o.appendChild(r)}}claimPassCell(e,t,n){let r=n?.currentTarget?.getBoundingClientRect?.(),i=this.meta.claimPass(e,t);i&&(this.afterGrant(i),r&&this.burst(r.left+r.width/2,r.top+r.height/2,t===`premium`),this.el.passList.querySelector(`.cell[data-tier="${e}"][data-track="${t}"]`)?.classList.add(`pop`))}burst(e,t,n=!1){let r=document.getElementById(`fx`);if(!r||window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches)return;let i=n?[`#ffe27a`,`#ffb300`,`#fff`,`#ff8fe0`]:[`#2ec4f1`,`#7df0c2`,`#fff`,`#ffcf3f`];for(let n=0;n<16;n++){let a=n/16*Math.PI*2+Math.random()*.5,o=46+Math.random()*60,s=Q(`i`,{class:`confetti`});s.style.left=`${e}px`,s.style.top=`${t}px`,s.style.background=i[n%i.length],s.style.setProperty(`--dx`,`${Math.cos(a)*o}px`),s.style.setProperty(`--dy`,`${Math.sin(a)*o-20}px`),s.style.setProperty(`--rot`,`${(Math.random()-.5)*720}deg`),r.appendChild(s),setTimeout(()=>s.remove(),900)}}buyPremium(){let e=this.meta.buyPremiumPass();e.ok?(this.sfx?.claim?.(),this.ui.toast(`Pista premium este deblocată!`,`good`)):(this.sfx?.deny?.(),e.reason===`funds`&&this.ui.toast(`Nu ai destule Coroane.`,`warn`)),this.refresh()}showKind(e){this.kind=e,this.selected=this.meta.cosmetics.equipped[e],this.previewRide=null,this.renderWardrobe(),this.applyPreview()}renderWardrobe(){let e=this.kind,t=this.meta.cosmetics;for(let t of this.el.wardTabs.children)t.classList.toggle(`on`,t.dataset.kind===e);let n=this.el.wardRides;n.replaceChildren();let r=e===`bear`?Rv:e===`emoji`?[]:Lv;for(let[e,t]of r)n.appendChild(sv(Q(`button`,{class:`level-chip${this.previewRide===e?` on`:``}`,text:t,attrs:{type:`button`,"data-ride":e}}),()=>{this.previewRide=this.previewRide===e?null:e,this.renderWardrobe(),this.applyPreview()}));n.hidden=r.length===0;let i=this.el.wardList;i.replaceChildren();for(let n of Hf[e]){let r=qf(t,e,n.id),a=t.equipped[e]===n.id,o=a?`Echipat`:r?`Al tău`:$d(n.price).replace(`Coroane`,`👑`).replace(`Coroană`,`👑`);i.appendChild(sv(Q(`button`,{class:`card${this.selected===n.id?` on`:``}${r?` own`:``}${a?` equipped`:``}`,attrs:{type:`button`,"data-item":n.id}},[Q(`span`,{class:`card-ico`,text:n.glyph||zv[e]}),Q(`span`,{class:`card-name`,text:n.name}),Q(`span`,{class:`card-tag`,text:o})]),()=>{this.selected=n.id,this.renderWardrobe(),this.applyPreview()}))}let a=Wf(e,this.selected)??Hf[e][0],o=qf(t,e,a.id),s=t.equipped[e]===a.id;this.el.wardName.textContent=a.name,this.el.wardDesc.textContent=a.desc;let c=this.el.wardAction;if(s)c.textContent=`Echipat ✓`,c.disabled=!0;else if(o)c.textContent=`Echipează`,c.disabled=!1;else{let e=Xd(this.meta.wallet,a.price);c.textContent=e?`Cumpără · ${$d(a.price)}`:`Costă ${$d(a.price)}`,c.disabled=!e}}wardrobeAction(){let e=this.kind,t=this.selected;if(t){if(!qf(this.meta.cosmetics,e,t)){let n=this.meta.buy(e,t);if(!n.ok){this.sfx?.deny?.(),n.reason===`funds`&&this.ui.toast(`Nu ai destul pentru acest obiect.`,`warn`),this.renderWardrobe();return}this.ui.toast(`Ai cumpărat: ${Wf(e,t).name}`,`good`)}this.meta.equip(e,t)&&this.sfx?.claim?.(),this.refreshWallet(),this.renderWardrobe(),this.applyPreview()}}applyPreview(){let e=this.game();if(!e||this.open!==`wardrobe`)return;let t=this.meta.cosmetics.equipped,n=this.kind,r=this.selected;e.playerView.setSkin(n===`boy`?r:t.boy),e.bearView.setSkin(n===`bear`?r:t.bear),e.trailId=n===`trail`?r:t.trail;let i=(n===`bear`?Rv:Lv).find(e=>e[0]===this.previewRide);if(e.applyBiome(i?i[2]:e.startBiome),n===`bear`?e.setPreview({kind:`bear`,mode:i?.[0]}):e.setPreview({kind:`boy`,ride:i?.[0]}),n===`emoji`){let e=Wf(`emoji`,r)?.glyph;e&&this.ui.toast(e,`emoji`)}}leaveWardrobe(){let e=this.game();e&&(e.applyBiome(e.startBiome),e.setPreview(null),e.applyCosmetics())}},Gv={ArrowLeft:`left`,KeyA:`left`,ArrowRight:`right`,KeyD:`right`,ArrowUp:`jump`,KeyW:`jump`,Space:`jump`,ArrowDown:`slide`,KeyS:`slide`,Escape:`pause`,KeyP:`pause`,Enter:`enter`,NumpadEnter:`enter`,KeyE:`emote`},Kv=8,qv=450,Jv=.55,Yv=26,Xv=1.3,Zv=44;function Qv(e){let t=e?.tagName;return t===`INPUT`||t===`TEXTAREA`||t===`SELECT`||e?.isContentEditable}var $v=class{constructor(e,t){this.h=t,this.touch=null,window.addEventListener(`keydown`,e=>{if(Qv(e.target)||e.ctrlKey||e.metaKey||e.altKey)return;let t=Gv[e.code];t&&(e.preventDefault(),!e.repeat&&this.h[t]?.())}),window.addEventListener(`keyup`,e=>{Qv(e.target)||Gv[e.code]&&e.preventDefault()}),e.addEventListener(`pointerdown`,t=>{this.touch={id:t.pointerId,x:t.clientX,y:t.clientY,x0:t.clientX,y0:t.clientY,t0:performance.now(),swiped:!1,button:t.button};try{e.setPointerCapture(t.pointerId)}catch{}}),e.addEventListener(`pointermove`,e=>{let t=this.touch;if(!t||t.id!==e.pointerId)return;let n=e.clientX-t.x,r=e.clientY-t.y,i=e.clientX-(t.lx??t.x0);t.lx=e.clientX,i&&this.h.drag?.(i);let a=Math.abs(n),o=Math.abs(r),s=Math.max(a,o);s<Yv||s<Zv&&s<Math.min(a,o)*Xv||(t.swiped=!0,a>o?this.h[n<0?`left`:`right`]?.():this.h[r<0?`jump`:`slide`]?.(),t.x=e.clientX,t.y=e.clientY)});let n=e=>{this.touch&&this.touch.id===e.pointerId&&(this.touch=null)};e.addEventListener(`pointerup`,t=>{let n=this.touch;if(!n||n.id!==t.pointerId||t.pointerType!==`mouse`||n.swiped||Math.hypot(t.clientX-n.x0,t.clientY-n.y0)>Kv||performance.now()-n.t0>qv)return;if(n.button===2)return void this.h.slide?.();if(n.button!==0)return;let r=e.getBoundingClientRect(),i=(t.clientX-r.left)/Math.max(1,r.width);i<1/3?this.h.left?.():i>2/3?this.h.right?.():this.h.jump?.()}),e.addEventListener(`pointerup`,n),e.addEventListener(`pointercancel`,n),e.addEventListener(`lostpointercapture`,n),window.addEventListener(`blur`,()=>{this.touch=null});let r=e=>e.preventDefault();e.addEventListener(`touchmove`,r,{passive:!1}),e.addEventListener(`touchstart`,r,{passive:!1}),e.addEventListener(`contextmenu`,r),document.addEventListener(`gesturestart`,r),document.addEventListener(`dblclick`,r),this.pad={buttons:[],axis:0},this.padLoop=this.padLoop.bind(this),this.padRunning=!1,window.addEventListener(`gamepadconnected`,()=>{this.padRunning||(this.padRunning=!0,requestAnimationFrame(this.padLoop))})}padLoop(){let e=null;try{e=[...navigator.getGamepads?.()??[]].find(e=>e&&e.connected)??null}catch{e=null}if(!e){this.padRunning=!1;return}requestAnimationFrame(this.padLoop);let t=t=>!!e.buttons[t]?.pressed,n=e=>{let n=t(e),r=!!this.pad.buttons[e];return this.pad.buttons[e]=n,n&&!r};n(14)&&this.h.left?.(),n(15)&&this.h.right?.(),n(12)&&this.h.jump?.(),(n(13)||n(1))&&this.h.slide?.(),n(0)&&(this.h.jump?.(),this.h.enter?.()),n(9)&&this.h.pause?.(),n(3)&&this.h.emote?.();let r=e.axes[0]??0,i=e.axes[1]??0,a=r<-.55?1:r>Jv?2:i<-.55?3:i>Jv?4:0;a!==this.pad.axis&&(this.pad.axis=a,a===1?this.h.left?.():a===2?this.h.right?.():a===3?this.h.jump?.():a===4&&this.h.slide?.())}},ey=e=>440*2**((e-69)/12);function ty(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}var ny=new WeakMap;function ry(e){let t=ny.get(e);if(!t){let n=Math.floor(e.sampleRate*2);t=e.createBuffer(1,n,e.sampleRate);let r=t.getChannelData(0),i=ty(12345);for(let e=0;e<n;e++)r[e]=i()*2-1;ny.set(e,t)}return t}function iy(e,{rng:t=Math.random,pitch:n=null}={}){return{ctx:e,rng:t,noise:ry(e),pitch:n,live:0}}var ay=(e,t)=>1+(e.rng()*2-1)*t;function oy(e,t,n){e.live++,t.onended=()=>{e.live--,t.disconnect();for(let e of n)e.disconnect()}}function $(e,t,n){let{ctx:r}=e,i=n.t,a=n.dur??.12,o=Math.min(n.attack??.008,a*.5),s=n.vol??.1,c=n.f0,l=n.f1??c,u=r.createOscillator();u.type=n.type??`sine`,u.frequency.setValueAtTime(c,i),l!==c&&u.frequency.exponentialRampToValueAtTime(Math.max(20,l),i+(n.glide??a)),n.detune&&(u.detune.value=n.detune),n.pitched&&e.pitch&&e.pitch.connect(u.detune);let d=r.createGain();if(d.gain.setValueAtTime(1e-4,i),d.gain.linearRampToValueAtTime(s,i+o),n.sustain){let e=Math.min(n.release??a*.3,a-o);d.gain.setValueAtTime(s,i+a-e)}d.gain.exponentialRampToValueAtTime(1e-4,i+a);let f=[d],p=u;if(n.lp){let e=r.createBiquadFilter();e.type=`lowpass`,e.frequency.setValueAtTime(n.lp,i),n.lp1&&e.frequency.exponentialRampToValueAtTime(n.lp1,i+a),e.Q.value=n.q??.7,p.connect(e),p=e,f.push(e)}p.connect(d);let m=d;if(n.pan&&r.createStereoPanner){let e=r.createStereoPanner();e.pan.value=n.pan,d.connect(e),m=e,f.push(e)}m.connect(t),u.start(i),u.stop(i+a+.03),oy(e,u,f)}function sy(e,t,n){let{ctx:r}=e,i=n.t,a=n.dur??.2,o=Math.min(n.attack??.004,a*.5),s=r.createBufferSource();s.buffer=e.noise;let c=r.createBiquadFilter();c.type=n.type??`lowpass`,c.frequency.setValueAtTime(n.freq??800,i),n.f1&&c.frequency.exponentialRampToValueAtTime(n.f1,i+a),c.Q.value=n.q??.7;let l=r.createGain();l.gain.setValueAtTime(1e-4,i),l.gain.linearRampToValueAtTime(n.vol??.2,i+o),l.gain.exponentialRampToValueAtTime(1e-4,i+a),s.connect(c).connect(l);let u=[c,l],d=l;if(n.pan&&r.createStereoPanner){let e=r.createStereoPanner();e.pan.value=n.pan,l.connect(e),d=e,u.push(e)}d.connect(t),s.start(i,e.rng()*.9),s.stop(i+a+.03),oy(e,s,u)}var cy=[72,74,76,79,81,84,86,88,91,93,96],ly=(e,t,n,r,i={})=>r.forEach((r,a)=>$(e,t,{t:n+a*(i.gap??.06),f0:ey(r),type:`triangle`,vol:.1,dur:.16,...i.voice})),uy={coin(e,t,n,r=1){let i=ey(cy[Math.min(Math.max(1,r|0)-1,cy.length-1)])*ay(e,.004);$(e,t,{t:n,f0:i,dur:.26,vol:.1,attack:.002}),$(e,t,{t:n,f0:i*2.01,dur:.14,vol:.05,attack:.002}),$(e,t,{t:n,f0:i*3.98,dur:.07,vol:.022,attack:.002}),sy(e,t,{t:n,dur:.025,vol:.03,freq:6500,type:`highpass`}),r>=10&&$(e,t,{t:n+.05,f0:i*2,dur:.2,vol:.04,attack:.002})},nearMiss(e,t,n,r=1){let i=1+.07*Math.min(Math.max(1,r|0)-1,6);sy(e,t,{t:n,dur:.26,vol:.2,freq:500*i,f1:3800*i,q:1.4,type:`bandpass`,attack:.05,pan:0}),$(e,t,{t:n,f0:620*i,f1:1500*i,dur:.18,vol:.06,type:`triangle`}),r>=2&&$(e,t,{t:n+.12,f0:1760*i,dur:.18,vol:.06,attack:.002})},combo(e,t,n,r=10){let i=72+Math.min(Math.floor(r/10),5)*2;[0,4,7,12].forEach((r,a)=>{let o=a===3;$(e,t,{t:n+a*.065,f0:ey(i+r),type:`triangle`,dur:o?.5:.18,vol:.1}),$(e,t,{t:n+a*.065,f0:ey(i+r+12)*1.002,dur:o?.4:.12,vol:.04})}),sy(e,t,{t:n+.2,dur:.4,vol:.05,freq:7e3,type:`highpass`})},powerUp(e,t,n,r){let i={magnet:523,board:659,jetpack:784,shield:587,slowmo:440}[r]??600;[1,1.25,1.5,2].forEach((r,a)=>{$(e,t,{t:n+a*.07,f0:i*r,dur:.16,type:`triangle`,vol:.11}),$(e,t,{t:n+a*.07,f0:i*r*2,dur:.1,vol:.03})}),r===`jetpack`&&sy(e,t,{t:n+.1,dur:.6,vol:.22,freq:300,f1:1600}),r===`slowmo`&&$(e,t,{t:n,f0:880,f1:220,dur:.5,vol:.08}),r===`shield`&&sy(e,t,{t:n,dur:.3,vol:.06,freq:5e3,type:`highpass`})},shieldBreak(e,t,n){sy(e,t,{t:n,dur:.3,vol:.22,freq:4200,type:`highpass`,f1:2e3}),[1320,990,660].forEach((r,i)=>$(e,t,{t:n+i*.05,f0:r*ay(e,.01),dur:.14,type:`triangle`,vol:.11})),$(e,t,{t:n,f0:180,f1:60,dur:.2,vol:.15})},crown(e,t,n){ly(e,t,n,[79,83,86,91],{gap:.06,voice:{dur:.22,vol:.1}}),$(e,t,{t:n+.18,f0:ey(103),dur:.35,vol:.04})},claim(e,t,n){$(e,t,{t:n,f0:660,dur:.1,type:`triangle`,vol:.1}),$(e,t,{t:n+.08,f0:990,dur:.2,type:`triangle`,vol:.1}),$(e,t,{t:n+.08,f0:1980,dur:.12,vol:.03})},revive(e,t,n){$(e,t,{t:n,f0:220,f1:880,dur:.45,vol:.13}),sy(e,t,{t:n,dur:.45,vol:.06,freq:500,f1:4e3,type:`bandpass`}),ly(e,t,n+.3,[72,76,79,84],{gap:.07,voice:{dur:.3,vol:.1}})},deny(e,t,n){$(e,t,{t:n,f0:200,f1:150,dur:.16,type:`square`,vol:.06,lp:900}),$(e,t,{t:n+.09,f0:170,f1:120,dur:.16,type:`square`,vol:.05,lp:900})},tap(e,t,n){$(e,t,{t:n,f0:520*ay(e,.02),dur:.045,type:`triangle`,vol:.08})},powerEnd(e,t,n){$(e,t,{t:n,f0:660,f1:330,dur:.28,type:`triangle`,vol:.1}),$(e,t,{t:n+.04,f0:330,f1:165,dur:.28,vol:.05})},superJump(e,t,n){$(e,t,{t:n,f0:300,f1:900,dur:.24,vol:.14}),$(e,t,{t:n,f0:150,f1:450,dur:.24,vol:.08,type:`triangle`}),sy(e,t,{t:n,dur:.25,vol:.1,freq:800,f1:5e3,type:`bandpass`})},warp(e,t,n){sy(e,t,{t:n,dur:.9,vol:.22,freq:400,f1:5200,type:`bandpass`,q:1.2,attack:.5}),$(e,t,{t:n,f0:200,f1:1200,dur:.6,vol:.12}),$(e,t,{t:n,f0:100,f1:600,dur:.6,vol:.07,type:`triangle`}),[72,76,79,84].forEach((r,i)=>{$(e,t,{t:n+.35+i*.06,f0:ey(r),dur:.45,type:`triangle`,vol:.09}),$(e,t,{t:n+.35+i*.06,f0:ey(r+12),dur:.35,vol:.03})})},splash(e,t,n){sy(e,t,{t:n,dur:.4,vol:.18,freq:2600,f1:500}),sy(e,t,{t:n+.03,dur:.18,vol:.07,freq:5e3,type:`highpass`}),$(e,t,{t:n,f0:260,f1:90,dur:.18,vol:.1})},jump(e,t,n){let r=ay(e,.04);$(e,t,{t:n,f0:280*r,f1:560*r,dur:.15,vol:.13}),$(e,t,{t:n,f0:560*r,f1:1120*r,dur:.1,vol:.03,type:`triangle`}),sy(e,t,{t:n,dur:.08,vol:.03,freq:3e3,type:`highpass`})},slide(e,t,n){sy(e,t,{t:n,dur:.28,vol:.13,freq:2600*ay(e,.05),f1:900,type:`bandpass`,q:.9})},lane(e,t,n){let r=ay(e,.05);$(e,t,{t:n,f0:420*r,f1:330*r,dur:.06,type:`triangle`,vol:.08}),sy(e,t,{t:n,dur:.06,vol:.04,freq:2200,type:`bandpass`})},hit(e,t,n){sy(e,t,{t:n,dur:.35,vol:.34,freq:2400,f1:200}),$(e,t,{t:n,f0:130,f1:38,dur:.38,vol:.34}),$(e,t,{t:n,f0:160,f1:50,dur:.3,type:`sawtooth`,vol:.1,lp:900}),sy(e,t,{t:n,dur:.03,vol:.14,freq:3e3,type:`highpass`})},growl(e,t,n){let r=n+.1;$(e,t,{t:r,f0:95,f1:60,dur:.7,type:`sawtooth`,vol:.11,lp:420,attack:.08}),$(e,t,{t:r,f0:98,f1:62,dur:.7,type:`sawtooth`,vol:.08,lp:420,attack:.08,detune:12}),$(e,t,{t:r,f0:140,f1:80,dur:.6,type:`square`,vol:.04,lp:500,attack:.08}),sy(e,t,{t:r,dur:.7,vol:.06,freq:350,type:`bandpass`,q:1.5,attack:.1})},escape(e,t,n){[440,660,880].forEach((r,i)=>{$(e,t,{t:n+i*.1,f0:r,dur:i===2?.25:.12,type:`triangle`,vol:.12}),$(e,t,{t:n+i*.1,f0:r*2,dur:.1,vol:.03})})},start(e,t,n){[392,523,784].forEach((r,i)=>{$(e,t,{t:n+i*.1,f0:r,dur:i===2?.22:.12,type:`triangle`,vol:.12}),$(e,t,{t:n+i*.1,f0:r*2,dur:.1,vol:.03})})},gameOver(e,t,n){[400,320,240,160].forEach((r,i)=>{$(e,t,{t:n+i*.18,f0:r,f1:r*.94,dur:.24,type:`sawtooth`,vol:.1,lp:1400}),$(e,t,{t:n+i*.18,f0:r/2,dur:.24,vol:.08})})}};function dy(e,t,{type:n=`lowpass`,freq:r=500,q:i=.7}={}){let{ctx:a}=e,o=a.createBufferSource();o.buffer=e.noise,o.loop=!0;let s=a.createBiquadFilter();s.type=n,s.frequency.value=r,s.Q.value=i;let c=a.createGain();return c.gain.value=0,o.connect(s).connect(c).connect(t),o.start(),{src:o,gain:c,filter:s}}function fy(e,t=1.3){let n=Math.floor(e.sampleRate*t),r=e.createBuffer(2,n,e.sampleRate);for(let e=0;e<2;e++){let t=r.getChannelData(e),i=ty(777+e*31),a=0;for(let e=0;e<n;e++)a+=(i()*2-1-a)*.45,t[e]=a*(1-e/n)**2.4}return r}var py=.9,my=2.2,hy=.3;function gy(e,{dynamics:t=!0,reverb:n=!0}={}){let r=e.createGain();r.gain.value=py;let i=e.createGain();i.gain.value=my;let a=e.createGain(),o=e.createBiquadFilter();o.type=`lowpass`,o.frequency.value=16e3,o.Q.value=.5;let s=e.createGain();if(s.gain.value=hy,i.connect(r),a.connect(o),n){let t=e.createConvolver();t.buffer=fy(e);let n=e.createGain();n.gain.value=.28,a.connect(t),t.connect(n),n.connect(o)}o.connect(s),s.connect(r);let c=null,l=null;return t?(c=e.createDynamicsCompressor(),c.threshold.value=-20,c.knee.value=16,c.ratio.value=3,c.attack.value=.006,c.release.value=.25,l=e.createDynamicsCompressor(),l.threshold.value=-3,l.knee.value=0,l.ratio.value=20,l.attack.value=.001,l.release.value=.08,r.connect(c),c.connect(l),l.connect(e.destination)):r.connect(e.destination),{master:r,sfx:i,musicIn:a,musicFilter:o,musicBus:s,comp:c,limiter:l}}var _y=[`pad`,`bass`,`arp`,`drums`,`mel`,`tension`],vy={maj:[0,4,7],min:[0,3,7],maj7:[0,4,7,11],min7:[0,3,7,10]},yy=(e,t)=>t+((e-t)%12+12)%12,by=e=>Math.max(0,Math.min(1,e)),xy=(e,t,n)=>by((e-t)/(n-t)),Sy={partie:{bpm:112,seed:11,chords:[{pc:2,q:`maj`},{pc:11,q:`min`},{pc:7,q:`maj`},{pc:9,q:`maj`}],scale:[2,4,6,7,9,11,1],melLo:69,melHi:90,rhythm:[`x.x.x...x.x.x...`,`x...x.x.x...x.x.`,`x.x...x.x.x.x...`,`x...x...x.x.x.x.`],bass:`x.....x.x.....x.`,arp:`0.1.2.1.0.1.2.3.`,arpInstr:`glock`,melInstr:`glock`,kick:`x.......x.......`,snare:`....x.......x...`,hat:`..o...o...o...o.`,padLp:1500,padVol:.028,arpVol:.05,melVol:.07,bassVol:.15},republicii:{bpm:118,seed:23,chords:[{pc:9,q:`min`},{pc:2,q:`min`},{pc:4,q:`maj`},{pc:9,q:`min`}],scale:[9,11,0,2,4,5,8],melLo:64,melHi:86,rhythm:[`x.xxx.x.x.xxx.x.`,`x.x.xxx.x...x.x.`,`x.xxx.x.xxx.x.x.`,`x.x.x.xxx.......`],bass:`x.....x.x.....x.`,arp:`..s...s...s...s.`,arpInstr:`stab`,melInstr:`tambal`,kick:`x.......x.......`,snare:`....o.......o...`,hat:`o.o.o.o.o.o.o.o.`,padLp:1100,padVol:.022,arpVol:.05,melVol:.075,bassVol:.16},tractorul:{bpm:104,seed:37,chords:[{pc:5,q:`maj7`},{pc:0,q:`maj`},{pc:2,q:`min7`},{pc:10,q:`maj7`}],scale:[5,7,9,10,0,2,4],melLo:65,melHi:86,rhythm:[`x..x..x.x..x....`,`x.x...x..x..x.x.`,`x..x..x.x.....x.`,`x...x.x.x.x.....`],bass:`x..x..x.x..x..x.`,arp:`0.1.2.1.3.2.1.2.`,arpInstr:`epiano`,melInstr:`epiano`,kick:`x.....x...x.....`,snare:`....x.......x...`,hat:`o.o.o.o.o.o.o.o.`,padLp:1300,padVol:.026,arpVol:.05,melVol:.07,bassVol:.16},afi:{bpm:120,seed:53,chords:[{pc:4,q:`min`},{pc:0,q:`maj`},{pc:7,q:`maj`},{pc:2,q:`maj`}],scale:[7,9,11,0,2,4,6],melLo:67,melHi:91,rhythm:[`x.x.x.x.x.x.x...`,`x...x.x...x.x.x.`,`x.x...x.x.x.x...`,`x.x.x...x.....x.`],bass:`x.x.x.x.x.x.x.x.`,arp:`0.1.2.3.2.1.2.1.`,arpInstr:`pluck`,melInstr:`pluck`,kick:`x...x...x...x...`,snare:`....x.......x...`,hat:`..x...x...x...x.`,padLp:1800,padVol:.025,arpVol:.05,melVol:.065,bassVol:.15},noua:{bpm:90,seed:71,chords:[{pc:0,q:`maj7`},{pc:9,q:`min7`},{pc:5,q:`maj7`},{pc:7,q:`maj`}],scale:[0,2,4,5,7,9,11],melLo:67,melHi:88,rhythm:[`x.......x...x...`,`x...x.......x...`,`x.......x.......`,`x...x...x.x.....`],bass:`x.......x.......`,arp:`0...1...2...1...`,arpInstr:`soft`,melInstr:`soft`,kick:`x...............`,snare:`................`,hat:`o.o.o.o.o.o.o.o.`,padLp:1700,padVol:.032,arpVol:.05,melVol:.06,bassVol:.13}},Cy=Object.keys(Sy),wy={glock(e,t,n,r,i,a){let o=ey(r);$(e,t,{t:n,f0:o,dur:.6,vol:a,attack:.003,pitched:!0}),$(e,t,{t:n,f0:o*2.76,dur:.25,vol:a*.3,attack:.003,pitched:!0})},tambal(e,t,n,r,i,a){let o=ey(r);$(e,t,{t:n,f0:o,dur:.4,vol:a,type:`triangle`,attack:.003,pitched:!0}),$(e,t,{t:n,f0:o,dur:.22,vol:a*.45,type:`sawtooth`,lp:3200,lp1:700,attack:.002,pitched:!0}),$(e,t,{t:n,f0:o*1.004,dur:.3,vol:a*.3,type:`triangle`,attack:.003,pitched:!0,detune:9})},epiano(e,t,n,r,i,a){let o=ey(r);$(e,t,{t:n,f0:o,dur:.7,vol:a,attack:.004,pitched:!0}),$(e,t,{t:n,f0:o*2,dur:.25,vol:a*.35,attack:.002,pitched:!0}),$(e,t,{t:n,f0:o*4,dur:.08,vol:a*.15,attack:.002,pitched:!0})},pluck(e,t,n,r,i,a){let o=ey(r);$(e,t,{t:n,f0:o,dur:.32,vol:a*.7,type:`sawtooth`,lp:4200,lp1:500,attack:.002,pitched:!0}),$(e,t,{t:n,f0:o*.5,dur:.2,vol:a*.5,attack:.002,pitched:!0})},soft(e,t,n,r,i,a){let o=ey(r),s=Math.min(Math.max(i,.4),1.6);$(e,t,{t:n,f0:o,dur:s,vol:a,attack:.05,sustain:!0,release:s*.5,pitched:!0}),$(e,t,{t:n,f0:o*2,dur:s*.6,vol:a*.2,attack:.05,pitched:!0})},stab(e,t,n,r,i,a){$(e,t,{t:n,f0:ey(r),dur:.14,vol:a,type:`triangle`,attack:.003,lp:2400,pitched:!0})}},Ty={kick(e,t,n,r){$(e,t,{t:n,f0:150,f1:45,dur:.2,vol:.34*r,attack:.002})},snare(e,t,n,r){sy(e,t,{t:n,dur:.14,vol:.12*r,freq:1900,type:`bandpass`,q:.8,attack:.002}),$(e,t,{t:n,f0:200,f1:150,dur:.1,vol:.07*r,type:`triangle`,attack:.002})},hat(e,t,n,r){sy(e,t,{t:n,dur:.045,vol:.045*r,freq:7500,type:`highpass`,attack:.001})}};function Ey(e,t){let n=ty(e.seed*1009+t*7919),r=[];for(let t=e.melLo;t<=e.melHi;t++)e.scale.includes(t%12)&&r.push(t);let i=e.rhythm[t%e.rhythm.length],a=Array(16).fill(null),o=Math.floor(r.length*.4);for(let s=0;s<16;s++){if(i[s]!==`x`)continue;let c=e.chords[(2*t+ +(s>=8))%e.chords.length],l=vy[c.q].map(e=>(c.pc+e)%12),u=o;if(s%4==0){let e=[];for(let t=Math.max(0,o-3);t<=Math.min(r.length-1,o+3);t++)l.includes(r[t]%12)&&e.push(t);e.length&&(e.sort((e,t)=>Math.abs(e-o)-Math.abs(t-o)),u=e[Math.floor(n()*Math.min(2,e.length))])}else{let e=n();u=o+(e<.2?0:e<.62?1:-1),(u<0||u>=r.length)&&(u=o)}o=u,a[s]={m:r[u],slots:1}}for(let e=0;e<16;e++){if(!a[e])continue;let t=1;for(;e+t<16&&!a[e+t]&&t<6;)t++;a[e].slots=t}return a}function Dy({state:e=`playing`,speedK:t=0,chasing:n=!1}={}){let r=e===`playing`||e===`dying`,i=by(t);if(!r){let t=e===`menu`;return{pad:1,bass:t?.6:.5,arp:.7,drums:0,mel:t?.8:.3,tension:0}}return{pad:1,bass:.6+.4*i,arp:.55+.45*i,drums:xy(i,.05,.35),mel:xy(i,.3,.7),tension:+!!n}}var Oy=class{constructor(e,t,n){this.env=e,this.id=n,this.def=Sy[n];let{ctx:r}=e;this.bus=r.createGain(),this.bus.connect(t),this.layers={},this.want={};for(let e of _y){let t=r.createGain();t.gain.value=0,t.connect(this.bus),this.layers[e]=t,this.want[e]=0}this.step=0,this.next=0,this.phrases=[]}stepDur(e=1){return 60/(this.def.bpm*e)/4}setMix(e,t=!1){let n=this.env.ctx.currentTime;for(let r of _y){let i=e[r]??0;this.want[r]=i;let a=this.layers[r].gain;t?a.setValueAtTime(i,n):a.setTargetAtTime(i,n,.35)}}scheduleUntil(e,t=1){let n=this.stepDur(t);for(;this.next<e;)this.playStep(this.step,this.next,n),this.next+=n,this.step++}playStep(e,t,n){let{env:r,def:i,layers:a,want:o}=this,s=e/16|0,c=e%16,l=i.chords[s%i.chords.length],u=vy[l.q];if(o.pad>.02&&c===0){let e=n*16*1.05,o=Math.min(.4,n*16*.3);u.forEach((n,s)=>{let c=ey(yy((l.pc+n)%12,55));$(r,a.pad,{t,f0:c,dur:e,vol:i.padVol,type:`sawtooth`,lp:i.padLp,attack:o,sustain:!0,release:.4,detune:s%2?7:-7,pitched:!0}),$(r,a.pad,{t,f0:c,dur:e,vol:i.padVol*1.2,attack:o,sustain:!0,release:.4,pitched:!0})})}let d=i.bass[c];if(o.bass>.02&&d!==`.`){let e=yy(l.pc,33),o=ey(d===`o`?e+12:d===`f`?e+7:e),s=n*2.4;$(r,a.bass,{t,f0:o,dur:s,vol:i.bassVol,type:`triangle`,lp:700,attack:.01,pitched:!0}),$(r,a.bass,{t,f0:o,dur:s,vol:i.bassVol*.7,attack:.01,pitched:!0})}let f=i.arp[c];if(o.arp>.02&&f!==`.`){let e=u.map(e=>yy((l.pc+e)%12,60));if(f===`s`)for(let o of e)wy.stab(r,a.arp,t,o,n,i.arpVol*.8);else{let o=+f,s=o<e.length?e[o]:e[o%e.length]+12;wy[i.arpInstr](r,a.arp,t,s,n*2,i.arpVol)}}if(o.drums>.02&&(i.kick[c]!==`.`&&Ty.kick(r,a.drums,t,i.kick[c]===`o`?.6:1),i.snare[c]!==`.`&&Ty.snare(r,a.drums,t,i.snare[c]===`o`?.6:1),i.hat[c]!==`.`&&Ty.hat(r,a.drums,t,i.hat[c]===`o`?.6:1)),o.mel>.02&&c%2==0){let e=(s/2|0)%4,o=(this.phrases[e]||(this.phrases[e]=Ey(i,e)))[s%2*8+c/2];o&&wy[i.melInstr](r,a.mel,t,o.m,o.slots*n*2,i.melVol)}if(o.tension>.02){if(c===0){let e=ey(yy(l.pc,36)),i=n*16*1.05;$(r,a.tension,{t,f0:e,dur:i,vol:.06,type:`sawtooth`,lp:260,attack:.3,sustain:!0,release:.4,pitched:!0}),$(r,a.tension,{t,f0:e*1.5,dur:i,vol:.03,type:`sawtooth`,lp:320,attack:.3,sustain:!0,release:.4,detune:14,pitched:!0})}(c%8==0||c%8==2)&&$(r,a.tension,{t,f0:85,f1:42,dur:.18,vol:c%8==0?.2:.13,attack:.002}),c%2==1&&sy(r,a.tension,{t,dur:.03,vol:.025,freq:8e3,type:`highpass`})}}dispose(){try{this.bus.disconnect();for(let e of _y)this.layers[e].disconnect()}catch{}}},ky={menu:.65,playing:1,dying:.5,paused:.3,revive:.3,gameover:.35},Ay={menu:9e3,playing:16e3,dying:1500,paused:800,revive:800,gameover:900},jy=.5,My=100,Ny=class{constructor(e,t){this.env=e,this.mixer=t,this.song=null,this.timer=null,this.fadeTimers=new Set,this.info={state:`menu`,biome:`partie`,speedK:0,chasing:!1,timeScale:1},this.acc=1,this.enabled=!1}setEnabled(e){e=!!e,e!==this.enabled&&(this.enabled=e,e?(this.timer||=setInterval(()=>this.tick(),My),this.acc=1,this.apply(!0)):(clearInterval(this.timer),this.timer=null,this.dropSong(this.song,.15),this.song=null))}update(e,t){Object.assign(this.info,t),this.enabled&&(this.acc+=e,!(this.acc<.1)&&(this.acc=0,this.apply(!1)))}apply(e){let{ctx:t}=this.env,n=t.currentTime,r=this.info;if(!this.song||this.song.id!==r.biome){if(!Sy[r.biome])return;let t=this.song;this.song=new Oy(this.env,this.mixer.musicIn,r.biome),this.song.next=n+.08,this.song.bus.gain.setValueAtTime(1e-4,n),this.song.bus.gain.linearRampToValueAtTime(1,n+(e||!t?.3:.9)),this.song.setMix(Dy(r),!0),this.dropSong(t,.8)}this.song.setMix(Dy(r));let i=Math.max(.3,Math.min(1,r.timeScale??1)),a=1-i,{musicBus:o,musicFilter:s}=this.mixer;o.gain.setTargetAtTime(hy*(ky[r.state]??1),n,.25),s.frequency.setTargetAtTime(Math.min(Ay[r.state]??16e3,16e3-a*16e3),n,.3),this.env.pitch&&this.env.pitch.offset.setTargetAtTime(1200*Math.log2(.7+.3*i),n,.3),e&&this.tick()}tick(){let e=this.song;if(!e)return;let{ctx:t}=this.env,n=t.currentTime,r=Math.max(.3,Math.min(1,this.info.timeScale??1));e.next<n&&(e.next=n+.03),e.scheduleUntil(n+jy,.6+.4*r)}dropSong(e,t){if(!e)return;let{ctx:n}=this.env,r=n.currentTime;e.bus.gain.cancelScheduledValues(r),e.bus.gain.setValueAtTime(e.bus.gain.value,r),e.bus.gain.linearRampToValueAtTime(1e-4,r+t);let i=setTimeout(()=>{this.fadeTimers.delete(i),e.dispose()},(t+jy+.5)*1e3);this.fadeTimers.add(i)}},Py=t({EFFECT_CASES:()=>Ly,analyze:()=>Iy,runAll:()=>Vy}),Fy=44100;function Iy(e){let t=0,n=0,r=0,i=0,a=0,o=-1,s=-1;for(let n=0;n<e.numberOfChannels;n++){let r=e.getChannelData(n);for(let e=0;e<r.length;e++){let n=r[e];if(n!==n||!isFinite(n)){i++;continue}let c=Math.abs(n);c>t&&(t=c),c>=.999&&a++,c>.001&&((o<0||e<o)&&(o=e),e>s&&(s=e))}}if(o>=0)for(let t=0;t<e.numberOfChannels;t++){let i=e.getChannelData(t);for(let e=o;e<=s;e++)n+=i[e]*i[e],r++}let c=r?Math.sqrt(n/r):0,l=e=>e>0?Math.round(20*Math.log10(e)*10)/10:-1/0;return{peak:t,rms:c,peakDb:l(t),rmsDb:l(c),nan:i,clipped:a,silent:t<.003,lengthMs:o<0?0:Math.round((s-o)/e.sampleRate*1e3)}}var Ly=[[`coin(1)`,`coin`,[1]],[`coin(5)`,`coin`,[5]],[`coin(12)`,`coin`,[12]],[`coin(40)`,`coin`,[40]],[`nearMiss(1)`,`nearMiss`,[1]],[`nearMiss(5)`,`nearMiss`,[5]],[`combo(10)`,`combo`,[10]],[`combo(50)`,`combo`,[50]],[`powerUp(magnet)`,`powerUp`,[`magnet`]],[`powerUp(board)`,`powerUp`,[`board`]],[`powerUp(jetpack)`,`powerUp`,[`jetpack`]],[`powerUp(shield)`,`powerUp`,[`shield`]],[`powerUp(slowmo)`,`powerUp`,[`slowmo`]],[`shieldBreak`,`shieldBreak`,[]],[`crown`,`crown`,[]],[`claim`,`claim`,[]],[`revive`,`revive`,[]],[`deny`,`deny`,[]],[`tap`,`tap`,[]],[`powerEnd`,`powerEnd`,[]],[`superJump`,`superJump`,[]],[`warp`,`warp`,[]],[`splash`,`splash`,[]],[`jump`,`jump`,[]],[`slide`,`slide`,[]],[`lane`,`lane`,[]],[`hit`,`hit`,[]],[`growl`,`growl`,[]],[`escape`,`escape`,[]],[`start`,`start`,[]],[`gameOver`,`gameOver`,[]]];async function Ry(e,t,n,r){let i=new OfflineAudioContext(2,Math.ceil(Fy*n),Fy),a=gy(i,{dynamics:r}),o=iy(i,{rng:ty(99)});return uy[e](o,a.sfx,.01,...t),{buf:await i.startRendering(),live:o.live}}var zy={calm:{state:`playing`,speedK:0,chasing:!1},full:{state:`playing`,speedK:1,chasing:!1},chase:{state:`playing`,speedK:1,chasing:!0},menu:{state:`menu`,speedK:0,chasing:!1}};async function By(e,t,n,r){let i=new OfflineAudioContext(2,Math.ceil(Fy*n),Fy),a=gy(i,{dynamics:r}),o=i.createConstantSource();o.offset.value=0,o.start();let s=new Oy(iy(i,{rng:ty(5),pitch:o}),a.musicIn,e);return s.next=.02,s.setMix(Dy(zy[t]),!0),s.scheduleUntil(n),await i.startRendering()}async function Vy({musicSecs:e=8}={}){let t={effects:[],music:[],levels:Cy,errors:[]};for(let[e,n,r]of Ly)try{let i=n===`warp`||n===`gameOver`?2:1.4,a=await Ry(n,r,i,!0),o=await Ry(n,r,i,!1);t.effects.push({label:e,...Iy(a.buf),rawPeak:Iy(o.buf).peak,live:a.live})}catch(n){t.errors.push(`${e}: ${n&&n.message}`)}for(let n of Cy)for(let r of Object.keys(zy))try{let i=Iy(await By(n,r,e,!0)),a=Iy(await By(n,r,e,!1));t.music.push({level:n,mix:r,bpm:Sy[n].bpm,...i,rawPeak:a.peak})}catch(e){t.errors.push(`music ${n}/${r}: ${e&&e.message}`)}return t}var Hy=class{constructor({muted:e=!1,onMutedChange:t,musicOn:n=!0,onMusicChange:r}={}){this.ctx=null,this.mixer=null,this.env=null,this.music=null,this.muted=!!e,this._musicOn=!!n,this.onMutedChange=t,this.onMusicChange=r,this.jetLoop=null,this.windLoop=null,this._lastCoin=-1,this._windT=0}unlock(){try{if(!this.ctx){let e=globalThis.AudioContext||globalThis.webkitAudioContext;if(!e)return;this.ctx=new e,this.mixer=gy(this.ctx);let t=this.ctx.createConstantSource();t.offset.value=0,t.start(),this.env=iy(this.ctx,{pitch:t}),this.mixer.master.gain.value=this.muted?0:py,this.music=new Ny(this.env,this.mixer),this.windLoop=dy(this.env,this.mixer.sfx,{type:`bandpass`,freq:500,q:.5})}this.ctx.state===`suspended`&&this.ctx.resume(),this._syncMusic()}catch{}}get musicOn(){return this._musicOn}setMusic(e){this._musicOn=!!e,this.onMusicChange?.(this._musicOn),this._syncMusic()}setMuted(e){this.muted=!!e,this.onMutedChange?.(this.muted),this.mixer&&(this.mixer.master.gain.value=this.muted?0:py),e&&this.jet(!1),this._syncMusic()}_syncMusic(){this.music?.setEnabled(this._musicOn&&!this.muted&&!!this.ctx)}update(e,t){if(!this.ctx||this.muted)return;this.music?.update(e,t);let n=this.windLoop;if(n&&(this._windT+=e,this._windT>.1)){this._windT=0;let e=t.state===`playing`||t.state===`dying`,r=Math.max(0,Math.min(1,t.speedK??0)),i=this.ctx.currentTime;n.gain.gain.setTargetAtTime(e?.012+.05*r*r:0,i,.3),n.filter.frequency.setTargetAtTime(350+1500*r,i,.3)}}_play(e,...t){if(this.ctx&&!this.muted&&this.env)try{uy[e](this.env,this.mixer.sfx,this.ctx.currentTime+.005,...t)}catch{}}coin(e=1){let t=this.ctx?this.ctx.currentTime:0;t-this._lastCoin<.045||(this._lastCoin=t,this._play(`coin`,e))}nearMiss(e=1){this._play(`nearMiss`,e)}combo(e=10){this._play(`combo`,e)}powerUp(e){this._play(`powerUp`,e)}shieldBreak(){this._play(`shieldBreak`)}crown(){this._play(`crown`)}claim(){this._play(`claim`)}revive(){this._play(`revive`)}deny(){this._play(`deny`)}tap(){this._play(`tap`)}powerEnd(){this._play(`powerEnd`)}superJump(){this._play(`superJump`)}warp(){this._play(`warp`)}splash(){this._play(`splash`)}jump(){this._play(`jump`)}slide(){this._play(`slide`)}lane(){this._play(`lane`)}hit(){this._play(`hit`)}growl(){this._play(`growl`)}escape(){this._play(`escape`)}start(){this._play(`start`)}gameOver(){this._play(`gameOver`)}jet(e){if(!this.ctx||!this.env)return;let t=this.ctx.currentTime;if(e&&!this.jetLoop&&!this.muted){let e=dy(this.env,this.mixer.sfx,{type:`lowpass`,freq:520});e.gain.gain.setValueAtTime(1e-4,t),e.gain.gain.exponentialRampToValueAtTime(.16,t+.25),this.jetLoop=e}else if(!e&&this.jetLoop){let e=this.jetLoop;this.jetLoop=null,e.gain.gain.cancelScheduledValues(t),e.gain.gain.setValueAtTime(Math.max(1e-4,e.gain.gain.value),t),e.gain.gain.exponentialRampToValueAtTime(1e-4,t+.3),e.src.stop(t+.32),e.src.onended=()=>{e.src.disconnect(),e.filter.disconnect(),e.gain.disconnect()}}}};typeof location<`u`&&/[?&]debug/.test(location.search)&&(globalThis.__audioLab={...Py,async liveSoak(e=6){let t=new Hy({muted:!1});t.unlock();let n=[],r=[`partie`,`republicii`,`tractorul`,`afi`,`noua`],i=performance.now(),a=i,o=0;await new Promise(s=>{let c=setInterval(()=>{let l=performance.now(),u=(l-a)/1e3;a=l;let d=(l-i)/1e3;t.update(u,{state:`playing`,biome:r[Math.floor(d/1.2)%5],speedK:Math.min(1,d/3),chasing:d>3,timeScale:d>4?.5:1}),o++%6==0&&t.coin(1+o%12),o%50==0&&n.push(t.env.live),d>e&&(clearInterval(c),s())},16)});let s={state:t.ctx&&t.ctx.state,series:n,max:Math.max(...n,0),musicOn:t.musicOn};return t.music?.setEnabled(!1),t.ctx?.close(),s}});var Uy=5e6;function Wy(e){let t=typeof e==`string`?e:``;return t=t.replace(/[\u0000-\u001f\u007f<>]/g,``).replace(/\s+/g,` `).trim(),t=Array.from(t).slice(0,20).join(``).trim(),t||`Jucător`}function Gy(e,t=20){if(!Array.isArray(e))return[];let n=new Set,r=[];for(let t of e)t&&typeof t==`object`&&typeof t.uid==`string`&&t.uid&&!n.has(t.uid)&&(typeof t.score!=`number`||!Number.isFinite(t.score)||t.score<0||(n.add(t.uid),r.push({id:t.uid,name:Wy(t.name),score:Math.min(Uy,Math.floor(t.score))})));return r.sort((e,t)=>t.score-e.score||(e.id<t.id?-1:1)),r.slice(0,t)}var Ky=class{constructor({cloud:e,getUser:t,localBest:n=()=>0,onChange:r=()=>{},now:i=()=>Date.now(),minGap:a=2e4}){this.cloud=e&&typeof e.topScores==`function`&&typeof e.submitScore==`function`?e:null,this.getUser=t,this.localBest=n,this.onChange=r,this.now=i,this.minGap=a,this.rows=[],this.status=this.cloud?`idle`:`off`,this.mine={},this.lastLoad=-1/0,this.busy=null}get available(){return!!this.cloud}get loaded(){return this.status===`ready`||this.status===`offline`&&this.lastLoad>-1/0}get user(){return this.cloud?this.getUser():null}get myRank(){let e=this.user;return e?this.rows.findIndex(t=>t.id===e.uid)+1:0}get myBest(){let e=this.user;if(!e)return null;let t=this.rows.find(t=>t.id===e.uid);return t?Math.max(t.score,this.mine[e.uid]??0):this.mine[e.uid]??null}async refresh(e=!1){return this.cloud?this.busy?this.busy:!e&&this.now()-this.lastLoad<this.minGap||(this.status=this.loaded?this.status:`loading`,this.busy=(async()=>{try{return this.rows=Gy(await this.cloud.topScores(20)),this.lastLoad=this.now(),this.status=`ready`,!0}catch{return this.status=`offline`,!1}finally{this.busy=null,this.onChange()}})(),this.busy):!1}async submit(e){if(!this.cloud)return{ok:!1,reason:`off`};let t=this.getUser();if(!t)return{ok:!1,reason:`guest`};e=Math.min(Uy,Math.floor(Number(e)||0));let n=this.mine[t.uid];if(e<=0||n!==void 0&&e<=n)return{ok:!0,improved:!1,best:n??0,rank:this.myRank};try{let n=await this.cloud.submitScore(t.uid,{name:String(t.name||``),score:e}),r=Math.max(Number(n?.best)||0,n?.ok?e:0);this.mine[t.uid]=r;let i=this.rows.filter(e=>e.id!==t.uid);return i.push({uid:t.uid,name:t.name,score:r}),this.rows=Gy(i.map(e=>({uid:e.uid??e.id,name:e.name,score:e.score}))),this.onChange(),{ok:!0,improved:r===e&&!!n?.ok,best:r,rank:this.myRank}}catch{return this.status=`offline`,this.onChange(),{ok:!1,reason:`offline`}}}async sync(e=!1){if(!this.cloud||(await this.refresh(e),!this.getUser()))return;let t=Math.floor(Number(this.localBest())||0),n=this.myBest;t>0&&(n===null||t>n)&&await this.submit(t)}},qy=`brasovRunner.save`,Jy=`brasovRunner.session`,Yy=`guest`,Xy=`brasovRunner.save.bak`,Zy=`brasovRunner.save.corrupt`,Qy=`brasovRunner.save.newer`,$y=Object.freeze({leaderboard:Q_,name:`winterRunner.name`,muted:`winterRunner.muted`}),eb=2e5,tb=(e,t=0xe8d4a51000)=>typeof e==`number`&&Number.isFinite(e)?Math.min(t,Math.max(0,Math.floor(e))):0;function nb(e=new Date){return{v:2,wallet:{coins:0,crowns:0},cosmetics:Gf(),missions:Of(e),pass:Ev(e),leaderboard:[],settings:{muted:!1,name:``,startBiome:0,music:!0,hints:0},stats:{runs:0,bestScore:0,totalDistance:0,totalCoins:0,revives:0},sync:{rev:0,at:0}}}function rb(e){let t=e&&typeof e==`object`?e:{};return{rev:tb(t.rev,1e9),at:tb(t.at,0x5af3107a4000)}}var ib=/^u\.[A-Za-z0-9_-]{1,80}$/;function ab(e){return typeof e==`string`&&ib.test(e)?e:Yy}function ob(e){let t=String(e??``),n=/^[A-Za-z0-9_-]{1,80}$/.test(t)?t:Array.from(t,e=>e.charCodeAt(0).toString(16)).join(``).slice(0,80);return n?`u.${n}`:Yy}function sb(e){let t=e&&typeof e==`object`?e:{},n=(e,t)=>typeof e==`string`?e.replace(/[\u0000-\u001f\u007f]/g,``).trim().slice(0,t):``;return{profile:ab(t.profile),name:n(t.name,40),provider:n(t.provider,20),welcomed:t.welcomed===!0}}function cb(e){let t=e&&typeof e==`object`?e:{},n=typeof t.name==`string`&&t.name.trim()?$_(t.name):``;return{muted:t.muted===!0,name:n,startBiome:Math.min(4,tb(t.startBiome)),music:t.music!==!1,hints:Math.min(9,tb(t.hints))}}function lb(e){let t=e&&typeof e==`object`?e:{};return{runs:tb(t.runs),bestScore:tb(t.bestScore,1e9),totalDistance:tb(t.totalDistance),totalCoins:tb(t.totalCoins),revives:tb(t.revives)}}function ub(e,t=new Date){let n=e&&typeof e==`object`&&!Array.isArray(e)?e:{};return{v:2,wallet:Jd(n.wallet),cosmetics:Kf(n.cosmetics),missions:jf(n.missions,t),pass:Av(n.pass,t),leaderboard:tv(n.leaderboard),settings:cb(n.settings),stats:lb(n.stats),sync:rb(n.sync)}}var db={1:e=>({...e,v:2})};function fb(e){let t=e&&typeof e==`object`&&!Array.isArray(e)?{...e}:{},n=Number.isInteger(t.v)&&t.v>=1?t.v:1,r=0;for(;n<2&&r++<50;){let e=db[n];t=e?e(t):{...t,v:n+1},n=Number.isInteger(t.v)&&t.v>n?t.v:n+1,t.v=n}return t}function pb(e){let t=!1,n={v:1,leaderboard:[],settings:{}};try{let r=e.getItem($y.leaderboard);if(r){t=!0;try{n.leaderboard=tv(JSON.parse(r))}catch{}}let i=e.getItem($y.name);typeof i==`string`&&i&&(t=!0,n.settings.name=i);let a=e.getItem($y.muted);(a===`1`||a===`0`)&&(t=!0,n.settings.muted=a===`1`)}catch{return null}return t?n:null}function mb(){let e=new Map;return{getItem:t=>e.has(t)?e.get(t):null,setItem:(t,n)=>void e.set(t,String(n)),removeItem:t=>void e.delete(t)}}function hb(){try{let e=globalThis.localStorage;if(!e)return null;let t=`__br_probe__`;return e.setItem(t,`1`),e.removeItem(t),e}catch{return null}}function gb({storage:e,now:t=()=>new Date}={}){let n=e===void 0?hb():e,r=n??mb(),i={mode:n?`storage`:`memory`,loaded:`fresh`,writeOk:!0,lastError:``},a=nb(t()),o=null,s=Yy,c=(e,t=s)=>t===`guest`?e:e.replace(qy,`${qy}.${t}`),l=null,u=e=>{try{let t=r.getItem(e);return typeof t==`string`?t:null}catch(e){return i.mode=`memory`,i.lastError=String(e?.message||e),null}},d=e=>{if(!(typeof e!=`string`||e.length>eb))try{let t=JSON.parse(e);return t&&typeof t==`object`&&!Array.isArray(t)?t:void 0}catch{return}},f=(e,t)=>{try{return r.setItem(e,t),!0}catch(e){return i.lastError=String(e?.message||e),!1}},p=e=>{try{r.removeItem(e)}catch{}};function m(){let e=u(c(qy)),n=e===null?void 0:d(e),l=`ok`;if(e!==null&&n===void 0&&(f(c(Zy),e.slice(0,eb)),n=d(u(c(Xy))),l=n?`backup`:`reset`),n===void 0&&l===`ok`){let e=s===`guest`?pb(r):null;e?(n=e,l=`migrated`):l=`fresh`}n&&Number.isInteger(n.v)&&n.v>2?(e&&f(c(Qy),e),l=`ok`):n&&(!Number.isInteger(n.v)||n.v<2)&&(n=fb(n),l===`ok`&&(l=`migrated`)),a=n?ub(n,t()):nb(t()),i.loaded=l;let p=JSON.stringify(a);return l===`ok`&&e===p?(o=p,u(c(`brasovRunner.save.bak`))!==p&&f(c(Xy),p)):l!==`fresh`&&h(!1),a}function h(e){let n;try{if(n=JSON.stringify(a),n===o&&i.writeOk)return!0;e&&n!==o&&(a.sync.rev+=1,a.sync.at=t().getTime(),n=JSON.stringify(a))}catch(e){return i.writeOk=!1,i.lastError=String(e?.message||e),!1}let r=f(c(qy),n);return r||=(p(c(Xy)),p(c(Zy)),f(c(qy),n)),i.writeOk=r,r&&(o=n,i.lastError=``),e&&l?.(),r}let g=()=>h(!0),_=sb(d(u(Jy)));s=_.profile,m();function v(){let e=u(c(qy));if(e===null||e===o)return!1;let n=d(e);return n?(a=ub(fb(n),t()),o=e,!0):!1}return{get state(){return a},status:i,save:g,update(e){let t=e(a);return g(),t},reload:v,leaderboardStorage(){return{getItem:()=>(v(),JSON.stringify(a.leaderboard)),setItem:(e,t)=>{v(),a.leaderboard=tv(JSON.parse(t)),g()},removeItem:()=>{a.leaderboard=[],g()}}},reset(){return a=nb(t()),o=null,p(c(Xy)),p(c(Zy)),g(),a},get profile(){return s},get session(){return{..._}},setSession(e){return _=sb({..._,...e,profile:s}),f(Jy,JSON.stringify(_)),{..._}},hasProfile(e){return u(c(qy,ab(e)))!==null},switchProfile(e){let t=ab(e);return t===s?a:(s=t,o=null,i.loaded=`fresh`,i.writeOk=!0,_=sb({..._,profile:s}),f(Jy,JSON.stringify(_)),m())},exportDoc(){return JSON.parse(JSON.stringify(a))},adopt(e,{rev:n}={}){return a=ub(fb(e),t()),Number.isInteger(n)&&(a.sync.rev=Math.max(0,n)),o=null,h(!1),a},set onSaved(e){l=typeof e==`function`?e:null},sideSlot(e){let t=`${qy}.x.${String(e).replace(/[^a-z0-9]/gi,``)}`;return{read:()=>u(t),write:e=>f(t,String(e)),clear:()=>p(t)}}}}var _b=class{constructor({store:e,now:t=()=>new Date}){this.store=e,this.now=t,this.sync()}get state(){return this.store.state}get wallet(){return this.state.wallet}get cosmetics(){return this.state.cosmetics}get missions(){return this.state.missions}get pass(){return this.state.pass}get settings(){return this.state.settings}_fresh(){this.store.reload?.()}_grant(e){let t=[],n=e&&typeof e==`object`?e:{},r=Zd(this.wallet,n);if(n.coins&&t.push({type:`coins`,amount:r.coins}),n.crowns&&t.push({type:`crowns`,amount:r.crowns}),n.xp&&t.push({type:`xp`,amount:jv(this.pass,n.xp).added}),n.item){let e=Wf(n.item.kind,n.item.id);if(e){if(Jf(this.cosmetics,n.item.kind,n.item.id))t.push({type:`item`,kind:n.item.kind,id:e.id,name:e.name,duplicate:!1});else{let r=Zf(n.item.kind,n.item.id);Zd(this.wallet,{coins:r}),t.push({type:`item`,kind:n.item.kind,id:e.id,name:e.name,duplicate:!0,coins:r})}}}return t}sync(){this._fresh();let e=this.now(),t=zf(this.missions,e),n=Iv(this.pass,e),r=[];for(let e of n.autoClaimed)r.push(...this._grant(e.reward));for(let e of t.autoClaimed)r.push(...this._grant(e.reward));let i=[...t.rolled];n.rolled&&i.push(`season`);let a=i.length>0||r.length>0||t.clockWentBack||n.corrected;return a&&this.store.save(),{changed:a,rolled:i,granted:r}}bank({coins:e=0,crowns:t=0}={}){this._fresh(),(e>0||t>0)&&(Zd(this.wallet,{coins:e,crowns:t}),this.store.save())}runXp(e){let t=K.xp,n=qd(e?.distance),r=qd(e?.portals),i=qd(e?.runs)>0?t.perRun:0;return Math.min(t.maxPerRun,i+Math.floor(n/100)*t.per100m+r*t.perPortal)}endRun(e){this._fresh();let t=e&&typeof e==`object`?e:{},n=Nf(this.missions,t).map(e=>({...e,text:Sf(e.scope,this.missions[e.scope].list.find(t=>t.id===e.id))})),r=this.runXp(t),{added:i,tiersGained:a}=jv(this.pass,r),o=this.state.stats;return o.runs+=+(qd(t.runs)>0),o.bestScore=Math.max(o.bestScore,qd(t.score,1e9)),o.totalDistance+=qd(t.distance),o.totalCoins+=qd(t.coins),o.revives+=qd(t.revives),this.store.save(),{xp:i,tiersGained:a,completed:n}}claimMission(e,t){this._fresh();let n=Ff(this.missions,e,t);if(!n)return null;let r=this._grant(n);return this.store.save(),r}claimDailyBonus(){this._fresh();let e=If(this.missions);if(!e)return null;let t=this._grant(e);return this.store.save(),t}claimPass(e,t){this._fresh();let n=Nv(this.pass,e,t);if(!n)return null;let r=this._grant(n);return this.store.save(),r}claimAllPass(){this._fresh();let e=[];for(let t of Pv(this.pass)){let n=Nv(this.pass,t.tier,t.track);n&&e.push(...this._grant(n))}return e.length&&this.store.save(),e}buyPremiumPass(){return this._fresh(),this.pass.premium?{ok:!1,reason:`owned`}:Qd(this.wallet,{crowns:K.pass.premiumCost})?(Fv(this.pass),this.store.save(),{ok:!0}):{ok:!1,reason:`funds`}}passInfo(){let e=this.now(),t=kv(this.pass);return{name:yv(this.pass.season),daysLeft:vv(e),tier:t.tier,into:t.into,need:t.need,done:t.done,premium:this.pass.premium,claimable:Pv(this.pass).length}}buy(e,t){this._fresh();let n=Xf(this.cosmetics,this.wallet,e,t);return n.ok&&this.store.save(),n}equip(e,t){this._fresh();let n=Yf(this.cosmetics,e,t);return n&&this.store.save(),n}setSetting(e,t){this._fresh(),e in this.settings&&(this.settings[e]=t,this.store.save())}badges(){return{missions:Rf(this.missions),pass:Pv(this.pass).length}}},vb=1,yb=class{constructor(e=K.ads.mockSeconds){this.duration=Math.max(.1,e),this.watched=0,this.visible=!0,this.state=`playing`}setVisible(e){this.visible=!!e}tick(e){return this.state===`playing`&&this.visible&&e>0&&Number.isFinite(e)&&(this.watched=Math.min(this.duration,this.watched+Math.min(e,vb)),this.watched>=this.duration-1e-9&&(this.watched=this.duration,this.state=`completed`)),this.state}cancel(){return this.state===`playing`&&(this.state=`cancelled`),this.state}get remaining(){return Math.max(0,this.duration-this.watched)}get fraction(){return this.watched/this.duration}get rewardEarned(){return this.state===`completed`}},bb=class{constructor({view:e,duration:t=K.ads.mockSeconds,needsNetwork:n=K.ads.mockNeedsNetwork,isOnline:r,isVisible:i,schedule:a,now:o}={}){this.view=e??{open(){},update(){},close(){}},this.duration=t,this.needsNetwork=n,this.isOnline=r??(()=>typeof navigator>`u`||navigator.onLine!==!1),this.isVisible=i??(()=>typeof document>`u`||!document.hidden),this.schedule=a??(e=>setTimeout(e,100)),this.now=o??(()=>typeof performance<`u`?performance.now():Date.now()),this.active=null}isAvailable(){return this.active?{ok:!1,reason:`busy`}:this.needsNetwork&&!this.isOnline()?{ok:!1,reason:`offline`}:{ok:!0}}showRewarded(){let e=this.isAvailable();return e.ok?new Promise(e=>{let t=new yb(this.duration),n={session:t,resolve:e,last:this.now()};this.active=n,this.view.open(t);let r=()=>{if(this.active!==n)return;let e=this.now();t.setVisible(this.isVisible()),t.tick((e-n.last)/1e3),n.last=e,this.view.update(t),t.state===`completed`?this._finish(n,{completed:!0}):this.schedule(r)};this.schedule(r)}):Promise.resolve({completed:!1,reason:e.reason})}cancel(){let e=this.active;e&&(e.session.cancel(),this._finish(e,{completed:!1,reason:`cancelled`}))}_finish(e,t){this.active===e&&(this.active=null,this.view.close(),e.resolve(t))}},xb=`modulepreload`,Sb=function(e,t){return new URL(e,t).href},Cb={},wb=function(e){return e.pathname.endsWith(`.css`)},Tb=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},Eb=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=Sb(t,n);let r=s(t),i=wb(r);return Tb(Cb,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:xb,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{t.addEventListener(`load`,e),t.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${r}`)))})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},Db=`false`,Ob=`false`,kb=Db===`true`,Ab=Ob===`true`;function jb(e={}){let{immediate:t=!1,onNeedReload:n,onNeedRefresh:r,onOfflineReady:i,onRegistered:a,onRegisteredSW:o,onRegisterError:s}=e,c,l,u,d=async(e=!0)=>{await l,kb||u?.()};async function f(){if(`serviceWorker`in navigator){if(c=await Eb(async()=>{let{Workbox:e}=await import(`./workbox-window.prod.es5-Bd17z0YL.js`);return{Workbox:e}},[],import.meta.url).then(({Workbox:e})=>new e(`./sw.js`,{scope:`./`,type:`classic`})).catch(e=>{s?.(e)}),!c)return;if(u=()=>{c?.messageSkipWaiting()},!Ab){if(kb)c.addEventListener(`activated`,e=>{(e.isUpdate||e.isExternal)&&(n?n():window.location.reload())}),c.addEventListener(`installed`,e=>{e.isUpdate||i?.()});else{let e=!1,t=()=>{e=!0,c?.addEventListener(`controlling`,e=>{e.isUpdate&&(n?n():window.location.reload())}),r?.()};c.addEventListener(`installed`,n=>{n.isUpdate===void 0?n.isExternal===void 0?!e&&i?.():n.isExternal?t():!e&&i?.():n.isUpdate||i?.()}),c.addEventListener(`waiting`,t)}}c.register({immediate:t}).then(e=>{o?o(`./sw.js`,e):a?.(e)}).catch(e=>{s?.(e)})}}return l=f(),d}function Mb({onUpdateReady:e,onOfflineReady:t,onInstallable:n,onInstalled:r}={}){if(!(typeof window<`u`&&window.Capacitor?.isNativePlatform?.()))try{let n=jb({immediate:!0,onNeedRefresh:()=>e?.(()=>n(!0)),onOfflineReady:()=>t?.(),onRegisteredSW(e,t){if(!t)return;let n=()=>{navigator.onLine!==!1&&t.update().catch(()=>{})};document.addEventListener(`visibilitychange`,()=>!document.hidden&&n()),setInterval(n,36e5)},onRegisterError:()=>{}})}catch{}let i=null;window.addEventListener(`beforeinstallprompt`,e=>{e.preventDefault(),i=e,n?.(async()=>{let e=i;return i=null,e?(e.prompt(),(await e.userChoice.catch(()=>null))?.outcome===`accepted`):!1})}),window.addEventListener(`appinstalled`,()=>{i=null,r?.()})}function Nb(){return window.matchMedia?.(`(display-mode: standalone), (display-mode: fullscreen)`).matches||window.navigator.standalone===!0||!!window.Capacitor?.isNativePlatform?.()}function Pb(){let e=navigator.userAgent||``;return(/iPad|iPhone|iPod/.test(e)||navigator.platform===`MacIntel`&&navigator.maxTouchPoints>1)&&!Nb()}var Fb=class{constructor({store:e,auth:t,cloud:n,canSwitch:r=()=>!0,onChange:i=()=>{},schedule:a=e=>setTimeout(e,2500)}){this.store=e,this.auth=t,this.cloud=n,this.canSwitch=r,this.onChange=i,this.schedule=a,this.user=null,this.status=`guest`,this.busy=!1,this.pendingUser=void 0,this.pushQueued=!1,this.chain=Promise.resolve(),e.onSaved=()=>this._queuePush()}get providers(){return this.auth?.providers??[]}get available(){return this.providers.length>0}get needsWelcome(){return this.available&&!this.user&&!this.store.session.welcomed}async start(){if(this.auth)try{await this.auth.init(),this.auth.onChange(e=>this._onUser(e))}catch{this.auth=null,this.onChange({type:`unavailable`})}}playAsGuest(){this.store.setSession({welcomed:!0}),this.onChange({type:`guest`})}async signIn(e){if(!this.auth||this.busy)return{ok:!1,reason:this.busy?`busy`:`unavailable`};if(!this.providers.includes(e))return{ok:!1,reason:`unavailable`};this.busy=!0;try{let t=await this.auth.signIn(e);return t?.ok?{ok:!0}:{ok:!1,reason:t?.reason||`error`}}catch{return{ok:!1,reason:`error`}}finally{this.busy=!1}}async signOut(){if(this.auth&&this.user){await this.flush();try{await this.auth.signOut()}catch{}}}resume(){if(this.pendingUser===void 0)return;let e=this.pendingUser;this.pendingUser=void 0,this._onUser(e)}flush(){return this.user?(this.pushQueued=!1,this._run(()=>this._push())):Promise.resolve()}refresh(){return!this.user||!this.canSwitch()?Promise.resolve():this._run(async()=>{let e=this.user.uid,t=await this._load(e);t&&this.user?.uid===e&&Ib(t)>this.store.state.sync.rev&&this.canSwitch()&&(this.store.adopt(t),this._set(`synced`,{type:`pulled`,user:this.user}))})}_run(e){return this.chain=this.chain.then(e).catch(()=>{}),this.chain}_set(e,t){this.status=e,t&&this.onChange(t)}_onUser(e){return this.canSwitch()?this._run(()=>this._apply(e)):(this.pendingUser=e,this.chain)}async _load(e){try{let t=await this.cloud.load(e);return t&&typeof t==`object`?t:null}catch{return}}async _apply(e){if(!e){let e=this.user;this.user=null;let t=this.store.profile!==Yy;t&&this.store.switchProfile(Yy),(e||t)&&this.store.setSession({name:``,provider:``,welcomed:!0}),this._set(`guest`,e||t?{type:`signed-out`}:null);return}let t=ob(e.uid),n=this.store.profile===t,r=!this.store.hasProfile(t),i=this.store.profile===`guest`?this.store.exportDoc():null;this.user={uid:String(e.uid),name:String(e.name||`Jucător`).slice(0,40),provider:String(e.provider||``)},this.store.switchProfile(t),this.store.setSession({name:this.user.name,provider:this.user.provider,welcomed:!0}),this._set(`syncing`,n?null:{type:`signed-in`,user:this.user});let a=await this._load(e.uid);if(this.user?.uid!==String(e.uid))return;if(a===void 0){r&&i&&this.store.adopt(i,{rev:0}),this._set(`offline`,{type:`offline`,user:this.user});return}if(a&&(r||Ib(a)>=this.store.state.sync.rev)){this.store.adopt(a),this._set(`synced`,{type:`pulled`,user:this.user});return}let o=!1;!a&&r&&i&&(this.store.adopt(i),o=!0),await this._push(),this.status===`synced`&&this.onChange({type:o?`carried`:`pushed`,user:this.user})}_queuePush(){this.user&&!this.pushQueued&&(this.pushQueued=!0,this.schedule(()=>{this.pushQueued&&(this.pushQueued=!1,this._run(()=>this._push()))}))}async _push(){let e=this.user;if(e&&this.store.profile===ob(e.uid))try{let t=await this.cloud.save(e.uid,this.store.exportDoc());if(this.user?.uid!==e.uid)return;if(t?.ok)return this._set(`synced`,{type:`saved`,user:e});if(t?.conflict&&Ib(t.conflict)>this.store.state.sync.rev)return this.canSwitch()?(this.store.adopt(t.conflict),this._set(`synced`,{type:`pulled`,user:e})):this._set(`offline`);this._set(`offline`,{type:`offline`,user:e})}catch{this.user?.uid===e.uid&&this._set(`offline`,{type:`offline`,user:e})}}},Ib=e=>{let t=e?.sync?.rev;return typeof t==`number`&&Number.isFinite(t)?Math.max(0,Math.floor(t)):0},Lb={apiKey:`AIzaSyBtVlFhDS3n30FlxSRdr_LLn1uuPNd9lMI`,authDomain:`brasov-runnerbrasov-runner.firebaseapp.com`,projectId:`brasov-runnerbrasov-runner`,storageBucket:`brasov-runnerbrasov-runner.firebasestorage.app`,messagingSenderId:`367225327407`,appId:`1:367225327407:web:f41598a6be6261cbbbdbda`},Rb=[`google`],zb={google:`Google`,apple:`Apple`},Bb={cancelled:`Conectarea a fost anulată.`,offline:`Nu există conexiune la internet. Poți juca și ca invitat.`,popup:`Browserul a blocat fereastra de conectare. Permite ferestrele pop-up pentru acest site și încearcă din nou.`,unavailable:`Această metodă de conectare nu este activată încă.`,busy:`O conectare este deja în curs.`,error:`Conectarea nu a reușit. Încearcă din nou.`},Vb={syncing:`Se sincronizează cu contul…`,synced:`Progresul este salvat în cont ✓`,offline:`Fără conexiune: progresul este pe dispozitiv și se urcă în cont când revine internetul.`,guest:``},Hb=class{constructor({account:e,ui:t,sfx:n,demo:r=!1}){this.account=e,this.ui=t,this.sfx=n,this.demo=r;let i=e=>document.getElementById(e);this.el={start:i(`screen-start`),screen:i(`screen-login`),back:i(`btn-login-back`),title:i(`login-title`),text:i(`login-text`),buttons:i(`login-buttons`),guest:i(`btn-login-guest`),box:i(`account-box`),name:i(`account-name`),status:i(`account-status`),logout:i(`btn-logout`),note:i(`login-note`),msg:i(`login-msg`),chip:i(`btn-account`),chipText:i(`account-chip-text`)},this.open=!1,this.providerButtons=e.providers.map(e=>{let t=Q(`button`,{class:`btn login-btn ${e}`,attrs:{type:`button`,"data-provider":e}},[Q(`span`,{class:`login-ico`,text:(zb[e]??e).charAt(0)}),Q(`span`,{text:`Continuă cu ${zb[e]??e}`})]);return sv(t,()=>this.signIn(e)),this.el.buttons.appendChild(t),t}),sv(this.el.guest,()=>{this.account.playAsGuest(),this.close()}),sv(this.el.back,()=>this.close()),sv(this.el.logout,()=>this.signOut()),sv(this.el.chip,()=>this.show()),this.refresh()}show(e=!1){this.sfx?.tap?.(),this.welcome=e,this.open=!0,this.el.msg.hidden=!0,this.el.start.hidden=!0,this.el.screen.hidden=!1,this.refresh()}close(){this.open&&(this.open=!1,this.el.screen.hidden=!0,this.el.start.hidden=!1,this.ui.h.onMenuShown?.())}closeSilently(){this.open=!1,this.el.screen.hidden=!0}async signIn(e){this.setBusy(!0);let t=await this.account.signIn(e);this.setBusy(!1),t.ok?this.close():(this.sfx?.deny?.(),this.el.msg.textContent=Bb[t.reason]??Bb.error,this.el.msg.hidden=!1)}async signOut(){this.setBusy(!0),await this.account.signOut(),this.setBusy(!1),this.refresh()}setBusy(e){for(let t of[...this.providerButtons,this.el.guest,this.el.logout,this.el.back])t.disabled=e;e?(this.el.msg.textContent=`Se conectează…`,this.el.msg.hidden=!1):this.el.msg.textContent===`Se conectează…`&&(this.el.msg.hidden=!0)}refresh(){let e=this.account,t=this.el,n=e.user;t.chip.hidden=!e.available,t.chipText.textContent=n?n.name:`Invitat · Conectează-te`,t.chip.classList.toggle(`in`,!!n),t.chip.classList.toggle(`warn`,!!n&&e.status===`offline`),this.open&&(t.back.hidden=this.welcome&&!n,t.buttons.hidden=!!n,t.guest.hidden=!!n||!this.welcome,t.box.hidden=!n,n?(t.title.textContent=`Contul tău`,t.text.textContent=``,t.name.textContent=`${n.name}${zb[n.provider]?` · ${zb[n.provider]}`:``}`,t.status.textContent=Vb[e.status]??``):(t.title.textContent=this.welcome?`Bine ai venit!`:`Conectează-te`,t.text.textContent=`Conectează-te ca să îți păstrezi progresul (bănuți, Coroane, skinuri, pass, misiuni) și să îl regăsești pe orice dispozitiv. Ce ai jucat ca invitat se mută în cont la prima conectare.`),t.note.textContent=this.demo?`Mod demonstrativ: acestea sunt conturi de test, nimic nu părăsește dispozitivul.`:`În cont se salvează doar progresul din joc. Fără reclame și fără urmărire.`)}},Ub=document.getElementById(`game-canvas`),Wb=gb(),Gb=new _b({store:Wb}),Kb=new Hy({muted:Gb.settings.muted,onMutedChange:e=>Gb.setSetting(`muted`,e),musicOn:Gb.settings.music}),qb=rv(Wb.leaderboardStorage()),Jb=null,Yb=null,Xb=null,Zb=null,Qb=null,$b=new pv({onPlay:()=>Jb?.startRun(),onResume:()=>Jb?.resume(),onRestart:()=>Jb?.startRun(),onMenu:()=>Jb?.toMenu(),onPause:()=>Jb?.pause(),onToggleMute:()=>{Kb.setMuted(!Kb.muted),$b.setMuted(Kb.muted)},onMusic:()=>{let e=!Gb.settings.music;Gb.setSetting(`music`,e),Kb.setMusic?.(e),$b.setMusic?.(e)},onSubmitName:e=>Jb?.submitName(e),onPickLevel:e=>{Jb?.setStartBiome(e),$b.markLevel(e),Gb.setSetting(`startBiome`,e)},onReviveAd:()=>Jb?.reviveWithAd(),onReviveCrowns:()=>Jb?.reviveWithCrowns(),onReviveNo:()=>Jb?.declineRevive(),onEmote:()=>Jb?.emote(),onOpen:e=>{Kb.tap(),Yb?.show(e)},onHideAll:()=>{Yb?.closeSilently(),Zb?.closeSilently()},onMenuShown:()=>{Yb?.refreshMenu(),ax(),rx(),Xb?.resume(),Zb?.refresh(),Qb?.sync()},onInstall:()=>tx?.().then(e=>e&&($b.el.install.hidden=!0))}),ex=new bb({view:$b.adView()}),tx=null,nx=null;function rx(){if(!nx||Jb&&![`menu`,`gameover`].includes(Jb.state))return;let e=nx;nx=null,$b.toast(`Este disponibilă o versiune nouă a jocului.`,`good`,{sticky:!0,action:{label:`Actualizează`,run:e}})}function ix(e){let t=document.createElement(`div`);t.style.cssText=`position:absolute;inset:0;display:grid;place-items:center;padding:24px;text-align:center;font:600 18px system-ui;color:#fff;background:#0b2447`,t.textContent=e,document.getElementById(`app`).appendChild(t)}function ax(){let e=Wb.status,t=$b.el.saveWarning;t.textContent=e.mode===`memory`?`Stocarea este blocată pe acest dispozitiv: progresul se păstrează doar până închizi jocul.`:e.writeOk?``:`Nu am putut salva progresul (spațiu de stocare plin?). Jocul merge mai departe din memorie.`,t.hidden=!t.textContent}function ox(){if(Jb&&![`menu`,`gameover`].includes(Jb.state))return;let e=Gb.sync();if(!e.changed)return;e.rolled.includes(`season`)?$b.toast(`A început un sezon nou al pass-ului!`,`good`):e.rolled.length&&$b.toast(`Au apărut misiuni noi!`,`good`);let t=Uv(e.granted);t&&$b.toast(`Recompense revendicate automat: ${t}`,`good`),Yb?.refresh()}function sx(){if(Gb.sync(),Kb.setMuted(Gb.settings.muted),$b.setMuted(Kb.muted),Kb.setMusic?.(Gb.settings.music),$b.setMusic?.(Gb.settings.music),Jb&&(Jb.setStartBiome(Gb.settings.startBiome),$b.markLevel(Jb.startBiome),Jb.applyCosmetics(),Jb.state===`menu`)){let e=Zb?.open;Jb.toMenu(),e&&Zb.show(Zb.welcome)}}var cx={pulled:`Progresul din cont a fost încărcat.`,carried:`Progresul tău de invitat a fost salvat în cont.`,"signed-out":`Te-ai deconectat. Acum joci ca invitat.`};function lx(){let e=Qb;if(!e?.available)return;if(!e.loaded){$b.setGlobalBoard(null),$b.setBoardNote(e.status===`offline`?`Clasamentul comun nu a putut fi încărcat (fără internet?). Vezi scorurile de pe acest dispozitiv.`:``);return}let t=e.user,n=e.myRank,r=e.rows.slice(0,10).map((e,t)=>({...e,rank:t+1}));n>10&&r.push({...e.rows[n-1],rank:n});let i;i=t?n?`Apari ca „${Wy(t.name)}”: locul ${n}, ${e.rows[n-1].score} puncte.`:e.myBest?`Apari ca „${Wy(t.name)}”. Recordul tău: ${e.myBest} puncte (încă în afara primelor ${e.rows.length}).`:`Apari ca „${Wy(t.name)}”. Termină o cursă ca să intri în clasament.`:`Joci ca invitat: scorurile tale rămân pe acest dispozitiv. Conectează-te cu Google ca să apari în clasament.`,e.status===`offline`&&(i+=` (Fără conexiune: lista poate fi veche.)`),$b.setGlobalBoard({title:`Clasament`,entries:r,meId:t?.uid??null,note:i,over:!!t})}async function ux(){let e=!!window.Capacitor?.isNativePlatform?.(),t=new URLSearchParams(location.search),n=t.has(`mockauth`),r=t.has(`noauth`),i=null;try{if(n){let{createMockCloud:e}=await Eb(async()=>{let{createMockCloud:e}=await import(`./mockCloud-D_LFf2Vd.js`);return{createMockCloud:e}},[],import.meta.url);i=e({slot:Wb.sideSlot(`mockCloud`),sessionSlot:Wb.sideSlot(`mockSession`),providers:Rb})}else if(Lb&&!e&&!r){let{createFirebaseCloud:e}=await Eb(async()=>{let{createFirebaseCloud:e}=await import(`./firebaseCloud-D6DAtwnN.js`);return{createFirebaseCloud:e}},[],import.meta.url);i=await e(Lb,Rb)}}catch(e){console.warn(`sign-in is not available`,e)}let a=!1;Xb=new Fb({store:Wb,auth:i?.auth??null,cloud:i?.cloud??null,canSwitch:()=>!Jb||Jb.state===`menu`,onChange:e=>{[`signed-in`,`signed-out`,`pulled`,`carried`].includes(e.type)&&sx(),e.type===`signed-in`&&$b.toast(`Bine ai venit, ${e.user.name}!`,`good`),cx[e.type]&&$b.toast(cx[e.type],`good`),e.type===`offline`&&!a&&(a=!0,$b.toast(`Fără conexiune la cont: progresul rămâne pe dispozitiv și se salvează în cont mai târziu.`,`warn`)),e.type===`saved`&&(a=!1),Zb?.refresh(),[`signed-in`,`signed-out`,`pulled`,`carried`].includes(e.type)&&(lx(),Qb?.sync(!0))}}),Zb=new Hb({account:Xb,ui:$b,sfx:Kb,demo:n}),Qb=new Ky({cloud:i?.cloud??null,getUser:()=>Xb.user,localBest:()=>qb.getTop()[0]?.score??0,onChange:lx}),Jb&&(Jb.scoreboard=Qb,Jb.onAccountScore=async e=>{let t=await Qb.submit(e);Jb.state===`gameover`&&(t.ok?t.improved?$b.setOverNote(t.rank?`Record personal! Ești pe locul ${t.rank} în clasament.`:`Record personal! Scorul a fost salvat în clasament.`):$b.setOverNote(`Recordul tău din clasament rămâne ${t.best}.`):$b.setOverNote(`Fără conexiune: scorul rămâne pe dispozitiv și intră în clasament când revine internetul.`))}),await Xb.start(),Zb.refresh(),Qb.sync(),Xb.needsWelcome&&Jb?.state===`menu`&&$b.startVisible()&&Zb.show(!0),window.addEventListener(`online`,()=>{Xb.flush(),Qb.sync(!0)}),window.__game&&(window.__scoreboard=Qb,window.__account=Xb,window.__accountUI=Zb)}try{Jb=new Z_({canvas:Ub,ui:$b,sfx:Kb,leaderboard:qb,meta:Gb,ads:ex})}catch(e){console.error(e),ix(`Ne pare rău, jocul are nevoie de WebGL, care nu este disponibil în acest browser sau pe acest dispozitiv.`)}if(Jb){Yb=new Wv({meta:Gb,ui:$b,game:()=>Jb,sfx:Kb}),new $v(Ub,Jb.actions);let e=()=>Kb.unlock();for(let t of[`pointerdown`,`keydown`,`touchend`])window.addEventListener(t,e,{passive:!0});$b.setMuted(Kb.muted),Kb.setMusic?.(Gb.settings.music),$b.setMusic?.(Gb.settings.music),Gb.settings.startBiome&&(Jb.setStartBiome(Gb.settings.startBiome),$b.markLevel(Gb.settings.startBiome)),window.addEventListener(`resize`,()=>Jb.resize()),window.addEventListener(`orientationchange`,()=>setTimeout(()=>Jb.resize(),250)),window.visualViewport?.addEventListener(`resize`,()=>Jb.resize());let t=()=>{Jb.autoPause(),Jb.bankRun(),Xb?.flush()};document.addEventListener(`visibilitychange`,()=>{if(document.hidden)return t();ox(),Xb?.refresh()}),window.addEventListener(`blur`,()=>Jb.autoPause()),window.addEventListener(`pagehide`,t),window.addEventListener(`focus`,ox),setInterval(ox,3e4),window.addEventListener(`storage`,e=>{e.key!==`brasovRunner.save`&&e.key!==null||Jb.state!==`menu`&&Jb.state!==`gameover`||!Wb.reload()||(Jb.applyCosmetics(),Yb.refresh())}),Ub.addEventListener(`webglcontextlost`,e=>{e.preventDefault(),Jb.autoPause()}),Jb.toMenu(),Jb.start(),Wb.status.loaded===`backup`?$b.toast(`Salvarea era deteriorată: am încărcat copia de rezervă.`,`warn`,{sticky:!0}):Wb.status.loaded===`reset`&&$b.toast(`Salvarea era deteriorată și nu a putut fi citită. Începi de la zero.`,`warn`,{sticky:!0}),Mb({onUpdateReady:e=>{nx=e,rx()},onOfflineReady:()=>$b.toast(`Gata: jocul merge acum și fără internet.`,`good`),onInstallable:e=>{tx=e,$b.el.install.hidden=!1},onInstalled:()=>{$b.el.install.hidden=!0,$b.toast(`Aplicația a fost instalată.`,`good`)}}),$b.el.iosHint.hidden=!Pb(),document.getElementById(`app-version`).textContent=`Brașov Runner v3.3.1`,new URLSearchParams(location.search).has(`debug`)&&(window.__game=Jb,window.__meta=Gb,window.__store=Wb,window.__screens=Yb,window.__ads=ex),ux()}export{Eb as t};