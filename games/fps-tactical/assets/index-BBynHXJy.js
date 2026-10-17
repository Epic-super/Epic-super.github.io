(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=t(s);fetch(s.href,n)}})();(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))t(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&t(n)}).observe(document,{childList:!0,subtree:!0});function e(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(i){if(i.ep)return;i.ep=!0;const s=e(i);fetch(i.href,s)}})();(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))t(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&t(n)}).observe(document,{childList:!0,subtree:!0});function e(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(i){if(i.ep)return;i.ep=!0;const s=e(i);fetch(i.href,s)}})();(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))t(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&t(n)}).observe(document,{childList:!0,subtree:!0});function e(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(i){if(i.ep)return;i.ep=!0;const s=e(i);fetch(i.href,s)}})();/**
* @license
* Copyright 2010-2023 Three.js Authors
* SPDX-License-Identifier: MIT
*/const ua="160",Vc=0,Va=1,Wc=2,kl=1,Hl=2,pi=3,gi=0,It=1,ei=2,wi=0,xs=1,Wa=2,Xa=3,ja=4,Xc=5,Hi=100,jc=101,qc=102,qa=103,Ya=104,Yc=200,Kc=201,Jc=202,Zc=203,Yr=204,Kr=205,$c=206,Qc=207,eh=208,th=209,ih=210,sh=211,nh=212,rh=213,ah=214,oh=0,lh=1,ch=2,Vn=3,hh=4,uh=5,dh=6,ph=7,Gl=0,mh=1,fh=2,Ri=0,gh=1,_h=2,vh=3,yh=4,xh=5,Sh=6,Ka="attached",Mh="detached",Vl=300,Ts=301,Es=302,Jr=303,Zr=304,Zn=306,ji=1e3,Vt=1001,Wn=1002,gt=1003,$r=1004,Hn=1005,Pt=1006,Wl=1007,qi=1008,Li=1009,bh=1010,Th=1011,da=1012,Xl=1013,Ei=1014,mi=1015,Zs=1016,jl=1017,ql=1018,Vi=1020,Eh=1021,Wt=1023,Ah=1024,wh=1025,Wi=1026,As=1027,Rh=1028,Yl=1029,Lh=1030,Kl=1031,Jl=1033,or=33776,lr=33777,cr=33778,hr=33779,Ja=35840,Za=35841,$a=35842,Qa=35843,Zl=36196,eo=37492,to=37496,io=37808,so=37809,no=37810,ro=37811,ao=37812,oo=37813,lo=37814,co=37815,ho=37816,uo=37817,po=37818,mo=37819,fo=37820,go=37821,ur=36492,_o=36494,vo=36495,Ch=36283,yo=36284,xo=36285,So=36286,Qr=2200,Ph=2201,Ih=2202,$s=2300,ws=2301,dr=2302,gs=2400,_s=2401,Xn=2402,pa=2500,Uh=2501,Nh=0,$l=1,ea=2,Ql=3e3,Xi=3001,Dh=3200,Oh=3201,ec=0,Fh=1,Xt="",at="srgb",_t="srgb-linear",ma="display-p3",$n="display-p3-linear",jn="linear",tt="srgb",qn="rec709",Yn="p3",Qi=7680,Mo=519,Bh=512,zh=513,kh=514,tc=515,Hh=516,Gh=517,Vh=518,Wh=519,ta=35044,bo="300 es",ia=1035,fi=2e3,Kn=2001;class Zi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const t=this._listeners[e.type];if(t!==void 0){e.target=this;const i=t.slice(0);for(let s=0,n=i.length;s<n;s++)i[s].call(this,e);e.target=null}}}const Mt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let To=1234567;const Ss=Math.PI/180,Rs=180/Math.PI;function Zt(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Mt[r&255]+Mt[r>>8&255]+Mt[r>>16&255]+Mt[r>>24&255]+"-"+Mt[e&255]+Mt[e>>8&255]+"-"+Mt[e>>16&15|64]+Mt[e>>24&255]+"-"+Mt[t&63|128]+Mt[t>>8&255]+"-"+Mt[t>>16&255]+Mt[t>>24&255]+Mt[i&255]+Mt[i>>8&255]+Mt[i>>16&255]+Mt[i>>24&255]).toLowerCase()}function ut(r,e,t){return Math.max(e,Math.min(t,r))}function fa(r,e){return(r%e+e)%e}function Xh(r,e,t,i,s){return i+(r-e)*(s-i)/(t-e)}function jh(r,e,t){return r!==e?(t-r)/(e-r):0}function js(r,e,t){return(1-t)*r+t*e}function qh(r,e,t,i){return js(r,e,1-Math.exp(-t*i))}function Yh(r,e=1){return e-Math.abs(fa(r,e*2)-e)}function Kh(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function Jh(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function Zh(r,e){return r+Math.floor(Math.random()*(e-r+1))}function $h(r,e){return r+Math.random()*(e-r)}function Qh(r){return r*(.5-Math.random())}function eu(r){r!==void 0&&(To=r);let e=To+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function tu(r){return r*Ss}function iu(r){return r*Rs}function sa(r){return(r&r-1)===0&&r!==0}function su(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function Jn(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function nu(r,e,t,i,s){const n=Math.cos,a=Math.sin,o=n(t/2),l=a(t/2),c=n((e+i)/2),h=a((e+i)/2),u=n((e-i)/2),d=a((e-i)/2),p=n((i-e)/2),g=a((i-e)/2);switch(s){case"XYX":r.set(o*h,l*u,l*d,o*c);break;case"YZY":r.set(l*d,o*h,l*u,o*c);break;case"ZXZ":r.set(l*u,l*d,o*h,o*c);break;case"XZX":r.set(o*h,l*g,l*p,o*c);break;case"YXY":r.set(l*p,o*h,l*g,o*c);break;case"ZYZ":r.set(l*g,l*p,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ti(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Je(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const ru={DEG2RAD:Ss,RAD2DEG:Rs,generateUUID:Zt,clamp:ut,euclideanModulo:fa,mapLinear:Xh,inverseLerp:jh,lerp:js,damp:qh,pingpong:Yh,smoothstep:Kh,smootherstep:Jh,randInt:Zh,randFloat:$h,randFloatSpread:Qh,seededRandom:eu,degToRad:tu,radToDeg:iu,isPowerOfTwo:sa,ceilPowerOfTwo:su,floorPowerOfTwo:Jn,setQuaternionFromProperEuler:nu,normalize:Je,denormalize:ti};class le{constructor(e=0,t=0){le.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(ut(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),n=this.x-e.x,a=this.y-e.y;return this.x=n*i-a*s+e.x,this.y=n*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ke{constructor(e,t,i,s,n,a,o,l,c){ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,n,a,o,l,c)}set(e,t,i,s,n,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=n,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,n=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],u=i[7],d=i[2],p=i[5],g=i[8],v=s[0],f=s[3],m=s[6],S=s[1],y=s[4],A=s[7],C=s[2],w=s[5],R=s[8];return n[0]=a*v+o*S+l*C,n[3]=a*f+o*y+l*w,n[6]=a*m+o*A+l*R,n[1]=c*v+h*S+u*C,n[4]=c*f+h*y+u*w,n[7]=c*m+h*A+u*R,n[2]=d*v+p*S+g*C,n[5]=d*f+p*y+g*w,n[8]=d*m+p*A+g*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],n=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-i*n*h+i*o*l+s*n*c-s*a*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],n=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,d=o*l-h*n,p=c*n-a*l,g=t*u+i*d+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=u*v,e[1]=(s*c-h*i)*v,e[2]=(o*i-s*a)*v,e[3]=d*v,e[4]=(h*t-s*l)*v,e[5]=(s*n-o*t)*v,e[6]=p*v,e[7]=(i*l-c*t)*v,e[8]=(a*t-i*n)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,n,a,o){const l=Math.cos(n),c=Math.sin(n);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(pr.makeScale(e,t)),this}rotate(e){return this.premultiply(pr.makeRotation(-e)),this}translate(e,t){return this.premultiply(pr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const pr=new ke;function ic(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Qs(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function au(){const r=Qs("canvas");return r.style.display="block",r}const Eo={};function qs(r){r in Eo||(Eo[r]=!0,console.warn(r))}const Ao=new ke().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),wo=new ke().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),ln={[_t]:{transfer:jn,primaries:qn,toReference:r=>r,fromReference:r=>r},[at]:{transfer:tt,primaries:qn,toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[$n]:{transfer:jn,primaries:Yn,toReference:r=>r.applyMatrix3(wo),fromReference:r=>r.applyMatrix3(Ao)},[ma]:{transfer:tt,primaries:Yn,toReference:r=>r.convertSRGBToLinear().applyMatrix3(wo),fromReference:r=>r.applyMatrix3(Ao).convertLinearToSRGB()}},ou=new Set([_t,$n]),qe={enabled:!0,_workingColorSpace:_t,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!ou.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,e,t){if(this.enabled===!1||e===t||!e||!t)return r;const i=ln[e].toReference,s=ln[t].fromReference;return s(i(r))},fromWorkingColorSpace:function(r,e){return this.convert(r,this._workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this._workingColorSpace)},getPrimaries:function(r){return ln[r].primaries},getTransfer:function(r){return r===Xt?jn:ln[r].transfer}};function Ms(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function mr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let es;class sc{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{es===void 0&&(es=Qs("canvas")),es.width=e.width,es.height=e.height;const i=es.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=es}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Qs("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),n=s.data;for(let a=0;a<n.length;a++)n[a]=Ms(n[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Ms(t[i]/255)*255):t[i]=Ms(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let lu=0;class nc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:lu++}),this.uuid=Zt(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let n;if(Array.isArray(s)){n=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?n.push(fr(s[a].image)):n.push(fr(s[a]))}else n=fr(s);i.url=n}return t||(e.images[this.uuid]=i),i}}function fr(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?sc.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let cu=0;class yt extends Zi{constructor(e=yt.DEFAULT_IMAGE,t=yt.DEFAULT_MAPPING,i=Vt,s=Vt,n=Pt,a=qi,o=Wt,l=Li,c=yt.DEFAULT_ANISOTROPY,h=Xt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:cu++}),this.uuid=Zt(),this.name="",this.source=new nc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=n,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new le(0,0),this.repeat=new le(1,1),this.center=new le(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(qs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Xi?at:Xt),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Vl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ji:e.x=e.x-Math.floor(e.x);break;case Vt:e.x=e.x<0?0:1;break;case Wn:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ji:e.y=e.y-Math.floor(e.y);break;case Vt:e.y=e.y<0?0:1;break;case Wn:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return qs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===at?Xi:Ql}set encoding(e){qs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Xi?at:Xt}}yt.DEFAULT_IMAGE=null;yt.DEFAULT_MAPPING=Vl;yt.DEFAULT_ANISOTROPY=1;class Ze{constructor(e=0,t=0,i=0,s=1){Ze.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,n=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*n,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*n,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*n,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*n,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,n;const a=e.elements,o=a[0],l=a[4],c=a[8],h=a[1],u=a[5],d=a[9],p=a[2],g=a[6],v=a[10];if(Math.abs(l-h)<.01&&Math.abs(c-p)<.01&&Math.abs(d-g)<.01){if(Math.abs(l+h)<.1&&Math.abs(c+p)<.1&&Math.abs(d+g)<.1&&Math.abs(o+u+v-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const m=(o+1)/2,S=(u+1)/2,y=(v+1)/2,A=(l+h)/4,C=(c+p)/4,w=(d+g)/4;return m>S&&m>y?m<.01?(i=0,s=.707106781,n=.707106781):(i=Math.sqrt(m),s=A/i,n=C/i):S>y?S<.01?(i=.707106781,s=0,n=.707106781):(s=Math.sqrt(S),i=A/s,n=w/s):y<.01?(i=.707106781,s=.707106781,n=0):(n=Math.sqrt(y),i=C/n,s=w/n),this.set(i,s,n,t),this}let f=Math.sqrt((g-d)*(g-d)+(c-p)*(c-p)+(h-l)*(h-l));return Math.abs(f)<.001&&(f=1),this.x=(g-d)/f,this.y=(c-p)/f,this.z=(h-l)/f,this.w=Math.acos((o+u+v-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class hu extends Zi{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Ze(0,0,e,t),this.scissorTest=!1,this.viewport=new Ze(0,0,e,t);const s={width:e,height:t,depth:1};i.encoding!==void 0&&(qs("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===Xi?at:Xt),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Pt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new yt(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new nc(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Yi extends hu{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class rc extends yt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=gt,this.minFilter=gt,this.wrapR=Vt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class uu extends yt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=gt,this.minFilter=gt,this.wrapR=Vt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ut{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,n,a,o){let l=i[s+0],c=i[s+1],h=i[s+2],u=i[s+3];const d=n[a+0],p=n[a+1],g=n[a+2],v=n[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=d,e[t+1]=p,e[t+2]=g,e[t+3]=v;return}if(u!==v||l!==d||c!==p||h!==g){let f=1-o;const m=l*d+c*p+h*g+u*v,S=m>=0?1:-1,y=1-m*m;if(y>Number.EPSILON){const C=Math.sqrt(y),w=Math.atan2(C,m*S);f=Math.sin(f*w)/C,o=Math.sin(o*w)/C}const A=o*S;if(l=l*f+d*A,c=c*f+p*A,h=h*f+g*A,u=u*f+v*A,f===1-o){const C=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=C,c*=C,h*=C,u*=C}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,s,n,a){const o=i[s],l=i[s+1],c=i[s+2],h=i[s+3],u=n[a],d=n[a+1],p=n[a+2],g=n[a+3];return e[t]=o*g+h*u+l*p-c*d,e[t+1]=l*g+h*d+c*u-o*p,e[t+2]=c*g+h*p+o*d-l*u,e[t+3]=h*g-o*u-l*d-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,n=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(s/2),u=o(n/2),d=l(i/2),p=l(s/2),g=l(n/2);switch(a){case"XYZ":this._x=d*h*u+c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u-d*p*g;break;case"YXZ":this._x=d*h*u+c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u+d*p*g;break;case"ZXY":this._x=d*h*u-c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u-d*p*g;break;case"ZYX":this._x=d*h*u-c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u+d*p*g;break;case"YZX":this._x=d*h*u+c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u-d*p*g;break;case"XZY":this._x=d*h*u-c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],n=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=i+o+u;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-l)*p,this._y=(n-c)*p,this._z=(a-s)*p}else if(i>o&&i>u){const p=2*Math.sqrt(1+i-o-u);this._w=(h-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(n+c)/p}else if(o>u){const p=2*Math.sqrt(1+o-i-u);this._w=(n-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+u-i-o);this._w=(a-s)/p,this._x=(n+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ut(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,n=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=i*h+a*o+s*c-n*l,this._y=s*h+a*l+n*o-i*c,this._z=n*h+a*c+i*l-s*o,this._w=a*h-i*o-s*l-n*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,n=this._z,a=this._w;let o=a*e._w+i*e._x+s*e._y+n*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=s,this._z=n,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-t;return this._w=p*a+t*this._w,this._x=p*i+t*this._x,this._y=p*s+t*this._y,this._z=p*n+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=a*u+this._w*d,this._x=i*u+this._x*d,this._y=s*u+this._y*d,this._z=n*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),s=2*Math.PI*Math.random(),n=2*Math.PI*Math.random();return this.set(t*Math.cos(s),i*Math.sin(n),i*Math.cos(n),t*Math.sin(s))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class _{constructor(e=0,t=0,i=0){_.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ro.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ro.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,n=e.elements;return this.x=n[0]*t+n[3]*i+n[6]*s,this.y=n[1]*t+n[4]*i+n[7]*s,this.z=n[2]*t+n[5]*i+n[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,n=e.elements,a=1/(n[3]*t+n[7]*i+n[11]*s+n[15]);return this.x=(n[0]*t+n[4]*i+n[8]*s+n[12])*a,this.y=(n[1]*t+n[5]*i+n[9]*s+n[13])*a,this.z=(n[2]*t+n[6]*i+n[10]*s+n[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,n=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*i),h=2*(o*t-n*s),u=2*(n*i-a*t);return this.x=t+l*c+a*u-o*h,this.y=i+l*h+o*c-n*u,this.z=s+l*u+n*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,n=e.elements;return this.x=n[0]*t+n[4]*i+n[8]*s,this.y=n[1]*t+n[5]*i+n[9]*s,this.z=n[2]*t+n[6]*i+n[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,n=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-n*o,this.y=n*a-i*l,this.z=i*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return gr.copy(this).projectOnVector(e),this.sub(gr)}reflect(e){return this.sub(gr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(ut(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const gr=new _,Ro=new Ut;class Ot{constructor(e=new _(1/0,1/0,1/0),t=new _(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(jt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(jt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=jt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const n=i.getAttribute("position");if(t===!0&&n!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=n.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,jt):jt.fromBufferAttribute(n,a),jt.applyMatrix4(e.matrixWorld),this.expandByPoint(jt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),cn.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),cn.copy(i.boundingBox)),cn.applyMatrix4(e.matrixWorld),this.union(cn)}const s=e.children;for(let n=0,a=s.length;n<a;n++)this.expandByObject(s[n],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,jt),jt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Bs),hn.subVectors(this.max,Bs),ts.subVectors(e.a,Bs),is.subVectors(e.b,Bs),ss.subVectors(e.c,Bs),vi.subVectors(is,ts),yi.subVectors(ss,is),Ii.subVectors(ts,ss);let t=[0,-vi.z,vi.y,0,-yi.z,yi.y,0,-Ii.z,Ii.y,vi.z,0,-vi.x,yi.z,0,-yi.x,Ii.z,0,-Ii.x,-vi.y,vi.x,0,-yi.y,yi.x,0,-Ii.y,Ii.x,0];return!_r(t,ts,is,ss,hn)||(t=[1,0,0,0,1,0,0,0,1],!_r(t,ts,is,ss,hn))?!1:(un.crossVectors(vi,yi),t=[un.x,un.y,un.z],_r(t,ts,is,ss,hn))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,jt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(jt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(oi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),oi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),oi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),oi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),oi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),oi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),oi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),oi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(oi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const oi=[new _,new _,new _,new _,new _,new _,new _,new _],jt=new _,cn=new Ot,ts=new _,is=new _,ss=new _,vi=new _,yi=new _,Ii=new _,Bs=new _,hn=new _,un=new _,Ui=new _;function _r(r,e,t,i,s){for(let n=0,a=r.length-3;n<=a;n+=3){Ui.fromArray(r,n);const o=s.x*Math.abs(Ui.x)+s.y*Math.abs(Ui.y)+s.z*Math.abs(Ui.z),l=e.dot(Ui),c=t.dot(Ui),h=i.dot(Ui);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const du=new Ot,zs=new _,vr=new _;class si{constructor(e=new _,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):du.setFromPoints(e).getCenter(i);let s=0;for(let n=0,a=e.length;n<a;n++)s=Math.max(s,i.distanceToSquared(e[n]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;zs.subVectors(e,this.center);const t=zs.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(zs,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(vr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(zs.copy(e.center).add(vr)),this.expandByPoint(zs.copy(e.center).sub(vr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const li=new _,yr=new _,dn=new _,xi=new _,xr=new _,pn=new _,Sr=new _;class tn{constructor(e=new _,t=new _(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,li)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=li.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(li.copy(this.origin).addScaledVector(this.direction,t),li.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){yr.copy(e).add(t).multiplyScalar(.5),dn.copy(t).sub(e).normalize(),xi.copy(this.origin).sub(yr);const n=e.distanceTo(t)*.5,a=-this.direction.dot(dn),o=xi.dot(this.direction),l=-xi.dot(dn),c=xi.lengthSq(),h=Math.abs(1-a*a);let u,d,p,g;if(h>0)if(u=a*l-o,d=a*o-l,g=n*h,u>=0)if(d>=-g)if(d<=g){const v=1/h;u*=v,d*=v,p=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=n,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;else d=-n,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-a*n+o)),d=u>0?-n:Math.min(Math.max(-n,-l),n),p=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-n,-l),n),p=d*(d+2*l)+c):(u=Math.max(0,-(a*n+o)),d=u>0?n:Math.min(Math.max(-n,-l),n),p=-u*u+d*(d+2*l)+c);else d=a>0?-n:n,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(yr).addScaledVector(dn,d),p}intersectSphere(e,t){li.subVectors(e.center,this.origin);const i=li.dot(this.direction),s=li.dot(li)-i*i,n=e.radius*e.radius;if(s>n)return null;const a=Math.sqrt(n-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,n,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),h>=0?(n=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(n=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),i>a||n>s||((n>i||isNaN(i))&&(i=n),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,li)!==null}intersectTriangle(e,t,i,s,n){xr.subVectors(t,e),pn.subVectors(i,e),Sr.crossVectors(xr,pn);let a=this.direction.dot(Sr),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;xi.subVectors(this.origin,e);const l=o*this.direction.dot(pn.crossVectors(xi,pn));if(l<0)return null;const c=o*this.direction.dot(xr.cross(xi));if(c<0||l+c>a)return null;const h=-o*xi.dot(Sr);return h<0?null:this.at(h/a,n)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Fe{constructor(e,t,i,s,n,a,o,l,c,h,u,d,p,g,v,f){Fe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,n,a,o,l,c,h,u,d,p,g,v,f)}set(e,t,i,s,n,a,o,l,c,h,u,d,p,g,v,f){const m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=s,m[1]=n,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=u,m[14]=d,m[3]=p,m[7]=g,m[11]=v,m[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Fe().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/ns.setFromMatrixColumn(e,0).length(),n=1/ns.setFromMatrixColumn(e,1).length(),a=1/ns.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*n,t[5]=i[5]*n,t[6]=i[6]*n,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,n=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(n),u=Math.sin(n);if(e.order==="XYZ"){const d=a*h,p=a*u,g=o*h,v=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=p+g*c,t[5]=d-v*c,t[9]=-o*l,t[2]=v-d*c,t[6]=g+p*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*h,p=l*u,g=c*h,v=c*u;t[0]=d+v*o,t[4]=g*o-p,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=p*o-g,t[6]=v+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*h,p=l*u,g=c*h,v=c*u;t[0]=d-v*o,t[4]=-a*u,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*h,t[9]=v-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*h,p=a*u,g=o*h,v=o*u;t[0]=l*h,t[4]=g*c-p,t[8]=d*c+v,t[1]=l*u,t[5]=v*c+d,t[9]=p*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,p=a*c,g=o*l,v=o*c;t[0]=l*h,t[4]=v-d*u,t[8]=g*u+p,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=p*u+g,t[10]=d-v*u}else if(e.order==="XZY"){const d=a*l,p=a*c,g=o*l,v=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+v,t[5]=a*h,t[9]=p*u-g,t[2]=g*u-p,t[6]=o*h,t[10]=v*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(pu,e,mu)}lookAt(e,t,i){const s=this.elements;return Nt.subVectors(e,t),Nt.lengthSq()===0&&(Nt.z=1),Nt.normalize(),Si.crossVectors(i,Nt),Si.lengthSq()===0&&(Math.abs(i.z)===1?Nt.x+=1e-4:Nt.z+=1e-4,Nt.normalize(),Si.crossVectors(i,Nt)),Si.normalize(),mn.crossVectors(Nt,Si),s[0]=Si.x,s[4]=mn.x,s[8]=Nt.x,s[1]=Si.y,s[5]=mn.y,s[9]=Nt.y,s[2]=Si.z,s[6]=mn.z,s[10]=Nt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,n=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],u=i[5],d=i[9],p=i[13],g=i[2],v=i[6],f=i[10],m=i[14],S=i[3],y=i[7],A=i[11],C=i[15],w=s[0],R=s[4],G=s[8],M=s[12],E=s[1],H=s[5],k=s[9],ee=s[13],P=s[2],F=s[6],V=s[10],j=s[14],X=s[3],W=s[7],Z=s[11],Q=s[15];return n[0]=a*w+o*E+l*P+c*X,n[4]=a*R+o*H+l*F+c*W,n[8]=a*G+o*k+l*V+c*Z,n[12]=a*M+o*ee+l*j+c*Q,n[1]=h*w+u*E+d*P+p*X,n[5]=h*R+u*H+d*F+p*W,n[9]=h*G+u*k+d*V+p*Z,n[13]=h*M+u*ee+d*j+p*Q,n[2]=g*w+v*E+f*P+m*X,n[6]=g*R+v*H+f*F+m*W,n[10]=g*G+v*k+f*V+m*Z,n[14]=g*M+v*ee+f*j+m*Q,n[3]=S*w+y*E+A*P+C*X,n[7]=S*R+y*H+A*F+C*W,n[11]=S*G+y*k+A*V+C*Z,n[15]=S*M+y*ee+A*j+C*Q,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],n=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],p=e[14],g=e[3],v=e[7],f=e[11],m=e[15];return g*(+n*l*u-s*c*u-n*o*d+i*c*d+s*o*p-i*l*p)+v*(+t*l*p-t*c*d+n*a*d-s*a*p+s*c*h-n*l*h)+f*(+t*c*u-t*o*p-n*a*u+i*a*p+n*o*h-i*c*h)+m*(-s*o*h-t*l*u+t*o*d+s*a*u-i*a*d+i*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],n=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],p=e[11],g=e[12],v=e[13],f=e[14],m=e[15],S=u*f*c-v*d*c+v*l*p-o*f*p-u*l*m+o*d*m,y=g*d*c-h*f*c-g*l*p+a*f*p+h*l*m-a*d*m,A=h*v*c-g*u*c+g*o*p-a*v*p-h*o*m+a*u*m,C=g*u*l-h*v*l-g*o*d+a*v*d+h*o*f-a*u*f,w=t*S+i*y+s*A+n*C;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/w;return e[0]=S*R,e[1]=(v*d*n-u*f*n-v*s*p+i*f*p+u*s*m-i*d*m)*R,e[2]=(o*f*n-v*l*n+v*s*c-i*f*c-o*s*m+i*l*m)*R,e[3]=(u*l*n-o*d*n-u*s*c+i*d*c+o*s*p-i*l*p)*R,e[4]=y*R,e[5]=(h*f*n-g*d*n+g*s*p-t*f*p-h*s*m+t*d*m)*R,e[6]=(g*l*n-a*f*n-g*s*c+t*f*c+a*s*m-t*l*m)*R,e[7]=(a*d*n-h*l*n+h*s*c-t*d*c-a*s*p+t*l*p)*R,e[8]=A*R,e[9]=(g*u*n-h*v*n-g*i*p+t*v*p+h*i*m-t*u*m)*R,e[10]=(a*v*n-g*o*n+g*i*c-t*v*c-a*i*m+t*o*m)*R,e[11]=(h*o*n-a*u*n-h*i*c+t*u*c+a*i*p-t*o*p)*R,e[12]=C*R,e[13]=(h*v*s-g*u*s+g*i*d-t*v*d-h*i*f+t*u*f)*R,e[14]=(g*o*s-a*v*s-g*i*l+t*v*l+a*i*f-t*o*f)*R,e[15]=(a*u*s-h*o*s+h*i*l-t*u*l-a*i*d+t*o*d)*R,this}scale(e){const t=this.elements,i=e.x,s=e.y,n=e.z;return t[0]*=i,t[4]*=s,t[8]*=n,t[1]*=i,t[5]*=s,t[9]*=n,t[2]*=i,t[6]*=s,t[10]*=n,t[3]*=i,t[7]*=s,t[11]*=n,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),n=1-i,a=e.x,o=e.y,l=e.z,c=n*a,h=n*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+i,h*l-s*a,0,c*l-s*o,h*l+s*a,n*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,n,a){return this.set(1,i,n,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,n=t._x,a=t._y,o=t._z,l=t._w,c=n+n,h=a+a,u=o+o,d=n*c,p=n*h,g=n*u,v=a*h,f=a*u,m=o*u,S=l*c,y=l*h,A=l*u,C=i.x,w=i.y,R=i.z;return s[0]=(1-(v+m))*C,s[1]=(p+A)*C,s[2]=(g-y)*C,s[3]=0,s[4]=(p-A)*w,s[5]=(1-(d+m))*w,s[6]=(f+S)*w,s[7]=0,s[8]=(g+y)*R,s[9]=(f-S)*R,s[10]=(1-(d+v))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let n=ns.set(s[0],s[1],s[2]).length();const a=ns.set(s[4],s[5],s[6]).length(),o=ns.set(s[8],s[9],s[10]).length();this.determinant()<0&&(n=-n),e.x=s[12],e.y=s[13],e.z=s[14],qt.copy(this);const l=1/n,c=1/a,h=1/o;return qt.elements[0]*=l,qt.elements[1]*=l,qt.elements[2]*=l,qt.elements[4]*=c,qt.elements[5]*=c,qt.elements[6]*=c,qt.elements[8]*=h,qt.elements[9]*=h,qt.elements[10]*=h,t.setFromRotationMatrix(qt),i.x=n,i.y=a,i.z=o,this}makePerspective(e,t,i,s,n,a,o=fi){const l=this.elements,c=2*n/(t-e),h=2*n/(i-s),u=(t+e)/(t-e),d=(i+s)/(i-s);let p,g;if(o===fi)p=-(a+n)/(a-n),g=-2*a*n/(a-n);else if(o===Kn)p=-a/(a-n),g=-a*n/(a-n);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,n,a,o=fi){const l=this.elements,c=1/(t-e),h=1/(i-s),u=1/(a-n),d=(t+e)*c,p=(i+s)*h;let g,v;if(o===fi)g=(a+n)*u,v=-2*u;else if(o===Kn)g=n*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const ns=new _,qt=new Fe,pu=new _(0,0,0),mu=new _(1,1,1),Si=new _,mn=new _,Nt=new _,Lo=new Fe,Co=new Ut;class Ls{constructor(e=0,t=0,i=0,s=Ls.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,n=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(ut(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,n)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ut(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,n),this._z=0);break;case"ZXY":this._x=Math.asin(ut(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,n));break;case"ZYX":this._y=Math.asin(-ut(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,n)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ut(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,n)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-ut(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,n)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Lo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Lo,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Co.setFromEuler(this),this.setFromQuaternion(Co,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ls.DEFAULT_ORDER="XYZ";class ga{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let fu=0;const Po=new _,rs=new Ut,ci=new Fe,fn=new _,ks=new _,gu=new _,_u=new Ut,Io=new _(1,0,0),Uo=new _(0,1,0),No=new _(0,0,1),vu={type:"added"},yu={type:"removed"};class it extends Zi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:fu++}),this.uuid=Zt(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=it.DEFAULT_UP.clone();const e=new _,t=new Ls,i=new Ut,s=new _(1,1,1);function n(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(n),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Fe},normalMatrix:{value:new ke}}),this.matrix=new Fe,this.matrixWorld=new Fe,this.matrixAutoUpdate=it.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=it.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ga,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return rs.setFromAxisAngle(e,t),this.quaternion.multiply(rs),this}rotateOnWorldAxis(e,t){return rs.setFromAxisAngle(e,t),this.quaternion.premultiply(rs),this}rotateX(e){return this.rotateOnAxis(Io,e)}rotateY(e){return this.rotateOnAxis(Uo,e)}rotateZ(e){return this.rotateOnAxis(No,e)}translateOnAxis(e,t){return Po.copy(e).applyQuaternion(this.quaternion),this.position.add(Po.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Io,e)}translateY(e){return this.translateOnAxis(Uo,e)}translateZ(e){return this.translateOnAxis(No,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ci.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?fn.copy(e):fn.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),ks.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ci.lookAt(ks,fn,this.up):ci.lookAt(fn,ks,this.up),this.quaternion.setFromRotationMatrix(ci),s&&(ci.extractRotation(s.matrixWorld),rs.setFromRotationMatrix(ci),this.quaternion.premultiply(rs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(vu)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(yu)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ci.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ci.multiply(e.parent.matrixWorld)),e.applyMatrix4(ci),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const n=this.children[i].getObjectByProperty(e,t);if(n!==void 0)return n}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let n=0,a=s.length;n<a;n++)s[n].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ks,e,gu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ks,_u,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++){const n=t[i];(n.matrixWorldAutoUpdate===!0||e===!0)&&n.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const s=this.children;for(let n=0,a=s.length;n<a;n++){const o=s[n];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function n(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=n(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];n(e.shapes,u)}else n(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(n(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(n(e.materials,this.material[l]));s.material=o}else s.material=n(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(n(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=s,i;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}it.DEFAULT_UP=new _(0,1,0);it.DEFAULT_MATRIX_AUTO_UPDATE=!0;it.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Yt=new _,hi=new _,Mr=new _,ui=new _,as=new _,os=new _,Do=new _,br=new _,Tr=new _,Er=new _;let gn=!1;class Gt{constructor(e=new _,t=new _,i=new _){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Yt.subVectors(e,t),s.cross(Yt);const n=s.lengthSq();return n>0?s.multiplyScalar(1/Math.sqrt(n)):s.set(0,0,0)}static getBarycoord(e,t,i,s,n){Yt.subVectors(s,t),hi.subVectors(i,t),Mr.subVectors(e,t);const a=Yt.dot(Yt),o=Yt.dot(hi),l=Yt.dot(Mr),c=hi.dot(hi),h=hi.dot(Mr),u=a*c-o*o;if(u===0)return n.set(0,0,0),null;const d=1/u,p=(c*l-o*h)*d,g=(a*h-o*l)*d;return n.set(1-p-g,g,p)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,ui)===null?!1:ui.x>=0&&ui.y>=0&&ui.x+ui.y<=1}static getUV(e,t,i,s,n,a,o,l){return gn===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),gn=!0),this.getInterpolation(e,t,i,s,n,a,o,l)}static getInterpolation(e,t,i,s,n,a,o,l){return this.getBarycoord(e,t,i,s,ui)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(n,ui.x),l.addScaledVector(a,ui.y),l.addScaledVector(o,ui.z),l)}static isFrontFacing(e,t,i,s){return Yt.subVectors(i,t),hi.subVectors(e,t),Yt.cross(hi).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Yt.subVectors(this.c,this.b),hi.subVectors(this.a,this.b),Yt.cross(hi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Gt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Gt.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,s,n){return gn===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),gn=!0),Gt.getInterpolation(e,this.a,this.b,this.c,t,i,s,n)}getInterpolation(e,t,i,s,n){return Gt.getInterpolation(e,this.a,this.b,this.c,t,i,s,n)}containsPoint(e){return Gt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Gt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,n=this.c;let a,o;as.subVectors(s,i),os.subVectors(n,i),br.subVectors(e,i);const l=as.dot(br),c=os.dot(br);if(l<=0&&c<=0)return t.copy(i);Tr.subVectors(e,s);const h=as.dot(Tr),u=os.dot(Tr);if(h>=0&&u<=h)return t.copy(s);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(i).addScaledVector(as,a);Er.subVectors(e,n);const p=as.dot(Er),g=os.dot(Er);if(g>=0&&p<=g)return t.copy(n);const v=p*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(i).addScaledVector(os,o);const f=h*g-p*u;if(f<=0&&u-h>=0&&p-g>=0)return Do.subVectors(n,s),o=(u-h)/(u-h+(p-g)),t.copy(s).addScaledVector(Do,o);const m=1/(f+v+d);return a=v*m,o=d*m,t.copy(i).addScaledVector(as,a).addScaledVector(os,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const ac={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Mi={h:0,s:0,l:0},_n={h:0,s:0,l:0};function Ar(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class xe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=at){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,qe.toWorkingColorSpace(this,t),this}setRGB(e,t,i,s=qe.workingColorSpace){return this.r=e,this.g=t,this.b=i,qe.toWorkingColorSpace(this,s),this}setHSL(e,t,i,s=qe.workingColorSpace){if(e=fa(e,1),t=ut(t,0,1),i=ut(i,0,1),t===0)this.r=this.g=this.b=i;else{const n=i<=.5?i*(1+t):i+t-i*t,a=2*i-n;this.r=Ar(a,n,e+1/3),this.g=Ar(a,n,e),this.b=Ar(a,n,e-1/3)}return qe.toWorkingColorSpace(this,s),this}setStyle(e,t=at){function i(n){n!==void 0&&parseFloat(n)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let n;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(n=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(n[4]),this.setRGB(Math.min(255,parseInt(n[1],10))/255,Math.min(255,parseInt(n[2],10))/255,Math.min(255,parseInt(n[3],10))/255,t);if(n=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(n[4]),this.setRGB(Math.min(100,parseInt(n[1],10))/100,Math.min(100,parseInt(n[2],10))/100,Math.min(100,parseInt(n[3],10))/100,t);break;case"hsl":case"hsla":if(n=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(n[4]),this.setHSL(parseFloat(n[1])/360,parseFloat(n[2])/100,parseFloat(n[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const n=s[1],a=n.length;if(a===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(n,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=at){const i=ac[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ms(e.r),this.g=Ms(e.g),this.b=Ms(e.b),this}copyLinearToSRGB(e){return this.r=mr(e.r),this.g=mr(e.g),this.b=mr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=at){return qe.fromWorkingColorSpace(bt.copy(this),e),Math.round(ut(bt.r*255,0,255))*65536+Math.round(ut(bt.g*255,0,255))*256+Math.round(ut(bt.b*255,0,255))}getHexString(e=at){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=qe.workingColorSpace){qe.fromWorkingColorSpace(bt.copy(this),t);const i=bt.r,s=bt.g,n=bt.b,a=Math.max(i,s,n),o=Math.min(i,s,n);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case i:l=(s-n)/u+(s<n?6:0);break;case s:l=(n-i)/u+2;break;case n:l=(i-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=qe.workingColorSpace){return qe.fromWorkingColorSpace(bt.copy(this),t),e.r=bt.r,e.g=bt.g,e.b=bt.b,e}getStyle(e=at){qe.fromWorkingColorSpace(bt.copy(this),e);const t=bt.r,i=bt.g,s=bt.b;return e!==at?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Mi),this.setHSL(Mi.h+e,Mi.s+t,Mi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Mi),e.getHSL(_n);const i=js(Mi.h,_n.h,t),s=js(Mi.s,_n.s,t),n=js(Mi.l,_n.l,t);return this.setHSL(i,s,n),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,n=e.elements;return this.r=n[0]*t+n[3]*i+n[6]*s,this.g=n[1]*t+n[4]*i+n[7]*s,this.b=n[2]*t+n[5]*i+n[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const bt=new xe;xe.NAMES=ac;let xu=0;class ii extends Zi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:xu++}),this.uuid=Zt(),this.name="",this.type="Material",this.blending=xs,this.side=gi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Yr,this.blendDst=Kr,this.blendEquation=Hi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new xe(0,0,0),this.blendAlpha=0,this.depthFunc=Vn,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Mo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Qi,this.stencilZFail=Qi,this.stencilZPass=Qi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==xs&&(i.blending=this.blending),this.side!==gi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Yr&&(i.blendSrc=this.blendSrc),this.blendDst!==Kr&&(i.blendDst=this.blendDst),this.blendEquation!==Hi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Vn&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Mo&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Qi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Qi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Qi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(n){const a=[];for(const o in n){const l=n[o];delete l.metadata,a.push(l)}return a}if(t){const n=s(e.textures),a=s(e.images);n.length>0&&(i.textures=n),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let n=0;n!==s;++n)i[n]=t[n].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Kt extends ii{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Gl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ct=new _,vn=new le;class Tt{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=ta,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=mi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,n=this.itemSize;s<n;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)vn.fromBufferAttribute(this,t),vn.applyMatrix3(e),this.setXY(t,vn.x,vn.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)ct.fromBufferAttribute(this,t),ct.applyMatrix3(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)ct.fromBufferAttribute(this,t),ct.applyMatrix4(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)ct.fromBufferAttribute(this,t),ct.applyNormalMatrix(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)ct.fromBufferAttribute(this,t),ct.transformDirection(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=ti(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Je(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ti(t,this.array)),t}setX(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ti(t,this.array)),t}setY(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ti(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ti(t,this.array)),t}setW(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),i=Je(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),i=Je(i,this.array),s=Je(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,n){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),i=Je(i,this.array),s=Je(s,this.array),n=Je(n,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=n,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ta&&(e.usage=this.usage),e}}class oc extends Tt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class lc extends Tt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class st extends Tt{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Su=0;const kt=new Fe,wr=new it,ls=new _,Dt=new Ot,Hs=new Ot,mt=new _;class vt extends Zi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Su++}),this.uuid=Zt(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ic(e)?lc:oc)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const n=new ke().getNormalMatrix(e);i.applyNormalMatrix(n),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return kt.makeRotationFromQuaternion(e),this.applyMatrix4(kt),this}rotateX(e){return kt.makeRotationX(e),this.applyMatrix4(kt),this}rotateY(e){return kt.makeRotationY(e),this.applyMatrix4(kt),this}rotateZ(e){return kt.makeRotationZ(e),this.applyMatrix4(kt),this}translate(e,t,i){return kt.makeTranslation(e,t,i),this.applyMatrix4(kt),this}scale(e,t,i){return kt.makeScale(e,t,i),this.applyMatrix4(kt),this}lookAt(e){return wr.lookAt(e),wr.updateMatrix(),this.applyMatrix4(wr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ls).negate(),this.translate(ls.x,ls.y,ls.z),this}setFromPoints(e){const t=[];for(let i=0,s=e.length;i<s;i++){const n=e[i];t.push(n.x,n.y,n.z||0)}return this.setAttribute("position",new st(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ot);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new _(-1/0,-1/0,-1/0),new _(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const n=t[i];Dt.setFromBufferAttribute(n),this.morphTargetsRelative?(mt.addVectors(this.boundingBox.min,Dt.min),this.boundingBox.expandByPoint(mt),mt.addVectors(this.boundingBox.max,Dt.max),this.boundingBox.expandByPoint(mt)):(this.boundingBox.expandByPoint(Dt.min),this.boundingBox.expandByPoint(Dt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new si);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new _,1/0);return}if(e){const i=this.boundingSphere.center;if(Dt.setFromBufferAttribute(e),t)for(let n=0,a=t.length;n<a;n++){const o=t[n];Hs.setFromBufferAttribute(o),this.morphTargetsRelative?(mt.addVectors(Dt.min,Hs.min),Dt.expandByPoint(mt),mt.addVectors(Dt.max,Hs.max),Dt.expandByPoint(mt)):(Dt.expandByPoint(Hs.min),Dt.expandByPoint(Hs.max))}Dt.getCenter(i);let s=0;for(let n=0,a=e.count;n<a;n++)mt.fromBufferAttribute(e,n),s=Math.max(s,i.distanceToSquared(mt));if(t)for(let n=0,a=t.length;n<a;n++){const o=t[n],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)mt.fromBufferAttribute(o,c),l&&(ls.fromBufferAttribute(e,c),mt.add(ls)),s=Math.max(s,i.distanceToSquared(mt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,s=t.position.array,n=t.normal.array,a=t.uv.array,o=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Tt(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let E=0;E<o;E++)c[E]=new _,h[E]=new _;const u=new _,d=new _,p=new _,g=new le,v=new le,f=new le,m=new _,S=new _;function y(E,H,k){u.fromArray(s,E*3),d.fromArray(s,H*3),p.fromArray(s,k*3),g.fromArray(a,E*2),v.fromArray(a,H*2),f.fromArray(a,k*2),d.sub(u),p.sub(u),v.sub(g),f.sub(g);const ee=1/(v.x*f.y-f.x*v.y);isFinite(ee)&&(m.copy(d).multiplyScalar(f.y).addScaledVector(p,-v.y).multiplyScalar(ee),S.copy(p).multiplyScalar(v.x).addScaledVector(d,-f.x).multiplyScalar(ee),c[E].add(m),c[H].add(m),c[k].add(m),h[E].add(S),h[H].add(S),h[k].add(S))}let A=this.groups;A.length===0&&(A=[{start:0,count:i.length}]);for(let E=0,H=A.length;E<H;++E){const k=A[E],ee=k.start,P=k.count;for(let F=ee,V=ee+P;F<V;F+=3)y(i[F+0],i[F+1],i[F+2])}const C=new _,w=new _,R=new _,G=new _;function M(E){R.fromArray(n,E*3),G.copy(R);const H=c[E];C.copy(H),C.sub(R.multiplyScalar(R.dot(H))).normalize(),w.crossVectors(G,H);const k=w.dot(h[E])<0?-1:1;l[E*4]=C.x,l[E*4+1]=C.y,l[E*4+2]=C.z,l[E*4+3]=k}for(let E=0,H=A.length;E<H;++E){const k=A[E],ee=k.start,P=k.count;for(let F=ee,V=ee+P;F<V;F+=3)M(i[F+0]),M(i[F+1]),M(i[F+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Tt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);const s=new _,n=new _,a=new _,o=new _,l=new _,c=new _,h=new _,u=new _;if(e)for(let d=0,p=e.count;d<p;d+=3){const g=e.getX(d+0),v=e.getX(d+1),f=e.getX(d+2);s.fromBufferAttribute(t,g),n.fromBufferAttribute(t,v),a.fromBufferAttribute(t,f),h.subVectors(a,n),u.subVectors(s,n),h.cross(u),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,f),o.add(h),l.add(h),c.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(f,c.x,c.y,c.z)}else for(let d=0,p=t.count;d<p;d+=3)s.fromBufferAttribute(t,d+0),n.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,n),u.subVectors(s,n),h.cross(u),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)mt.fromBufferAttribute(e,t),mt.normalize(),e.setXYZ(t,mt.x,mt.y,mt.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let p=0,g=0;for(let v=0,f=l.length;v<f;v++){o.isInterleavedBufferAttribute?p=l[v]*o.data.stride+o.offset:p=l[v]*h;for(let m=0;m<h;m++)d[g++]=c[p++]}return new Tt(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new vt,i=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,i);t.setAttribute(o,c)}const n=this.morphAttributes;for(const o in n){const l=[],c=n[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],p=e(d,i);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let n=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const p=c[u];h.push(p.toJSON(e.data))}h.length>0&&(s[l]=h,n=!0)}n&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const n=e.morphAttributes;for(const c in n){const h=[],u=n[c];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Oo=new Fe,Ni=new tn,yn=new si,Fo=new _,cs=new _,hs=new _,us=new _,Rr=new _,xn=new _,Sn=new le,Mn=new le,bn=new le,Bo=new _,zo=new _,ko=new _,Tn=new _,En=new _;class Xe extends it{constructor(e=new vt,t=new Kt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){const i=e[t[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,n=i.length;s<n;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,n=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(n&&o){xn.set(0,0,0);for(let l=0,c=n.length;l<c;l++){const h=o[l],u=n[l];h!==0&&(Rr.fromBufferAttribute(u,e),a?xn.addScaledVector(Rr,h):xn.addScaledVector(Rr.sub(t),h))}t.add(xn)}return t}raycast(e,t){const i=this.geometry,s=this.material,n=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),yn.copy(i.boundingSphere),yn.applyMatrix4(n),Ni.copy(e.ray).recast(e.near),!(yn.containsPoint(Ni.origin)===!1&&(Ni.intersectSphere(yn,Fo)===null||Ni.origin.distanceToSquared(Fo)>(e.far-e.near)**2))&&(Oo.copy(n).invert(),Ni.copy(e.ray).applyMatrix4(Oo),!(i.boundingBox!==null&&Ni.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Ni)))}_computeIntersections(e,t,i){let s;const n=this.geometry,a=this.material,o=n.index,l=n.attributes.position,c=n.attributes.uv,h=n.attributes.uv1,u=n.attributes.normal,d=n.groups,p=n.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=d.length;g<v;g++){const f=d[g],m=a[f.materialIndex],S=Math.max(f.start,p.start),y=Math.min(o.count,Math.min(f.start+f.count,p.start+p.count));for(let A=S,C=y;A<C;A+=3){const w=o.getX(A),R=o.getX(A+1),G=o.getX(A+2);s=An(this,m,e,i,c,h,u,w,R,G),s&&(s.faceIndex=Math.floor(A/3),s.face.materialIndex=f.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);for(let f=g,m=v;f<m;f+=3){const S=o.getX(f),y=o.getX(f+1),A=o.getX(f+2);s=An(this,a,e,i,c,h,u,S,y,A),s&&(s.faceIndex=Math.floor(f/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=d.length;g<v;g++){const f=d[g],m=a[f.materialIndex],S=Math.max(f.start,p.start),y=Math.min(l.count,Math.min(f.start+f.count,p.start+p.count));for(let A=S,C=y;A<C;A+=3){const w=A,R=A+1,G=A+2;s=An(this,m,e,i,c,h,u,w,R,G),s&&(s.faceIndex=Math.floor(A/3),s.face.materialIndex=f.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),v=Math.min(l.count,p.start+p.count);for(let f=g,m=v;f<m;f+=3){const S=f,y=f+1,A=f+2;s=An(this,a,e,i,c,h,u,S,y,A),s&&(s.faceIndex=Math.floor(f/3),t.push(s))}}}}function Mu(r,e,t,i,s,n,a,o){let l;if(e.side===It?l=i.intersectTriangle(a,n,s,!0,o):l=i.intersectTriangle(s,n,a,e.side===gi,o),l===null)return null;En.copy(o),En.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(En);return c<t.near||c>t.far?null:{distance:c,point:En.clone(),object:r}}function An(r,e,t,i,s,n,a,o,l,c){r.getVertexPosition(o,cs),r.getVertexPosition(l,hs),r.getVertexPosition(c,us);const h=Mu(r,e,t,i,cs,hs,us,Tn);if(h){s&&(Sn.fromBufferAttribute(s,o),Mn.fromBufferAttribute(s,l),bn.fromBufferAttribute(s,c),h.uv=Gt.getInterpolation(Tn,cs,hs,us,Sn,Mn,bn,new le)),n&&(Sn.fromBufferAttribute(n,o),Mn.fromBufferAttribute(n,l),bn.fromBufferAttribute(n,c),h.uv1=Gt.getInterpolation(Tn,cs,hs,us,Sn,Mn,bn,new le),h.uv2=h.uv1),a&&(Bo.fromBufferAttribute(a,o),zo.fromBufferAttribute(a,l),ko.fromBufferAttribute(a,c),h.normal=Gt.getInterpolation(Tn,cs,hs,us,Bo,zo,ko,new _),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new _,materialIndex:0};Gt.getNormal(cs,hs,us,u.normal),h.face=u}return h}class Lt extends vt{constructor(e=1,t=1,i=1,s=1,n=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:n,depthSegments:a};const o=this;s=Math.floor(s),n=Math.floor(n),a=Math.floor(a);const l=[],c=[],h=[],u=[];let d=0,p=0;g("z","y","x",-1,-1,i,t,e,a,n,0),g("z","y","x",1,-1,i,t,-e,a,n,1),g("x","z","y",1,1,e,i,t,s,a,2),g("x","z","y",1,-1,e,i,-t,s,a,3),g("x","y","z",1,-1,e,t,i,s,n,4),g("x","y","z",-1,-1,e,t,-i,s,n,5),this.setIndex(l),this.setAttribute("position",new st(c,3)),this.setAttribute("normal",new st(h,3)),this.setAttribute("uv",new st(u,2));function g(v,f,m,S,y,A,C,w,R,G,M){const E=A/R,H=C/G,k=A/2,ee=C/2,P=w/2,F=R+1,V=G+1;let j=0,X=0;const W=new _;for(let Z=0;Z<V;Z++){const Q=Z*H-ee;for(let oe=0;oe<F;oe++){const z=oe*E-k;W[v]=z*S,W[f]=Q*y,W[m]=P,c.push(W.x,W.y,W.z),W[v]=0,W[f]=0,W[m]=w>0?1:-1,h.push(W.x,W.y,W.z),u.push(oe/R),u.push(1-Z/G),j+=1}}for(let Z=0;Z<G;Z++)for(let Q=0;Q<R;Q++){const oe=d+Q+F*Z,z=d+Q+F*(Z+1),q=d+(Q+1)+F*(Z+1),ue=d+(Q+1)+F*Z;l.push(oe,z,ue),l.push(z,q,ue),X+=6}o.addGroup(p,X,M),p+=X,d+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Lt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Cs(r){const e={};for(const t in r){e[t]={};for(const i in r[t]){const s=r[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function Rt(r){const e={};for(let t=0;t<r.length;t++){const i=Cs(r[t]);for(const s in i)e[s]=i[s]}return e}function bu(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function cc(r){return r.getRenderTarget()===null?r.outputColorSpace:qe.workingColorSpace}const Tu={clone:Cs,merge:Rt};var Eu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Au=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ki extends ii{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Eu,this.fragmentShader=Au,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Cs(e.uniforms),this.uniformsGroups=bu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const n=this.uniforms[s].value;n&&n.isTexture?t.uniforms[s]={type:"t",value:n.toJSON(e).uuid}:n&&n.isColor?t.uniforms[s]={type:"c",value:n.getHex()}:n&&n.isVector2?t.uniforms[s]={type:"v2",value:n.toArray()}:n&&n.isVector3?t.uniforms[s]={type:"v3",value:n.toArray()}:n&&n.isVector4?t.uniforms[s]={type:"v4",value:n.toArray()}:n&&n.isMatrix3?t.uniforms[s]={type:"m3",value:n.toArray()}:n&&n.isMatrix4?t.uniforms[s]={type:"m4",value:n.toArray()}:t.uniforms[s]={value:n}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class hc extends it{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Fe,this.projectionMatrix=new Fe,this.projectionMatrixInverse=new Fe,this.coordinateSystem=fi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Ct extends hc{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Rs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ss*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Rs*2*Math.atan(Math.tan(Ss*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,s,n,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=n,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ss*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,n=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;n+=a.offsetX*s/l,t-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(n+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(n,n+s,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ds=-90,ps=1;class wu extends it{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ct(ds,ps,e,t);s.layers=this.layers,this.add(s);const n=new Ct(ds,ps,e,t);n.layers=this.layers,this.add(n);const a=new Ct(ds,ps,e,t);a.layers=this.layers,this.add(a);const o=new Ct(ds,ps,e,t);o.layers=this.layers,this.add(o);const l=new Ct(ds,ps,e,t);l.layers=this.layers,this.add(l);const c=new Ct(ds,ps,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,n,a,o,l]=t;for(const c of t)this.remove(c);if(e===fi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),n.up.set(0,0,-1),n.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Kn)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),n.up.set(0,0,1),n.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[n,a,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,n),e.setRenderTarget(i,1,s),e.render(t,a),e.setRenderTarget(i,2,s),e.render(t,o),e.setRenderTarget(i,3,s),e.render(t,l),e.setRenderTarget(i,4,s),e.render(t,c),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,s),e.render(t,h),e.setRenderTarget(u,d,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class uc extends yt{constructor(e,t,i,s,n,a,o,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:Ts,super(e,t,i,s,n,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ru extends Yi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];t.encoding!==void 0&&(qs("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Xi?at:Xt),this.texture=new uc(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Pt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Lt(5,5,5),n=new Ki({name:"CubemapFromEquirect",uniforms:Cs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:It,blending:wi});n.uniforms.tEquirect.value=t;const a=new Xe(s,n),o=t.minFilter;return t.minFilter===qi&&(t.minFilter=Pt),new wu(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,s){const n=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(n)}}const Lr=new _,Lu=new _,Cu=new ke;class zi{constructor(e=new _(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=Lr.subVectors(i,t).cross(Lu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Lr),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const n=-(e.start.dot(this.normal)+this.constant)/s;return n<0||n>1?null:t.copy(e.start).addScaledVector(i,n)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Cu.getNormalMatrix(e),s=this.coplanarPoint(Lr).applyMatrix4(e),n=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(n),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Di=new si,wn=new _;class _a{constructor(e=new zi,t=new zi,i=new zi,s=new zi,n=new zi,a=new zi){this.planes=[e,t,i,s,n,a]}set(e,t,i,s,n,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(n),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=fi){const i=this.planes,s=e.elements,n=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],u=s[6],d=s[7],p=s[8],g=s[9],v=s[10],f=s[11],m=s[12],S=s[13],y=s[14],A=s[15];if(i[0].setComponents(l-n,d-c,f-p,A-m).normalize(),i[1].setComponents(l+n,d+c,f+p,A+m).normalize(),i[2].setComponents(l+a,d+h,f+g,A+S).normalize(),i[3].setComponents(l-a,d-h,f-g,A-S).normalize(),i[4].setComponents(l-o,d-u,f-v,A-y).normalize(),t===fi)i[5].setComponents(l+o,d+u,f+v,A+y).normalize();else if(t===Kn)i[5].setComponents(o,u,v,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Di.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Di.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Di)}intersectsSprite(e){return Di.center.set(0,0,0),Di.radius=.7071067811865476,Di.applyMatrix4(e.matrixWorld),this.intersectsSphere(Di)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let n=0;n<6;n++)if(t[n].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(wn.x=s.normal.x>0?e.max.x:e.min.x,wn.y=s.normal.y>0?e.max.y:e.min.y,wn.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(wn)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function dc(){let r=null,e=!1,t=null,i=null;function s(n,a){t(n,a),i=r.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=r.requestAnimationFrame(s),e=!0)},stop:function(){r.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(n){t=n},setContext:function(n){r=n}}}function Pu(r,e){const t=e.isWebGL2,i=new WeakMap;function s(c,h){const u=c.array,d=c.usage,p=u.byteLength,g=r.createBuffer();r.bindBuffer(h,g),r.bufferData(h,u,d),c.onUploadCallback();let v;if(u instanceof Float32Array)v=r.FLOAT;else if(u instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)v=r.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else v=r.UNSIGNED_SHORT;else if(u instanceof Int16Array)v=r.SHORT;else if(u instanceof Uint32Array)v=r.UNSIGNED_INT;else if(u instanceof Int32Array)v=r.INT;else if(u instanceof Int8Array)v=r.BYTE;else if(u instanceof Uint8Array)v=r.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)v=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:g,type:v,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version,size:p}}function n(c,h,u){const d=h.array,p=h._updateRange,g=h.updateRanges;if(r.bindBuffer(u,c),p.count===-1&&g.length===0&&r.bufferSubData(u,0,d),g.length!==0){for(let v=0,f=g.length;v<f;v++){const m=g[v];t?r.bufferSubData(u,m.start*d.BYTES_PER_ELEMENT,d,m.start,m.count):r.bufferSubData(u,m.start*d.BYTES_PER_ELEMENT,d.subarray(m.start,m.start+m.count))}h.clearUpdateRanges()}p.count!==-1&&(t?r.bufferSubData(u,p.offset*d.BYTES_PER_ELEMENT,d,p.offset,p.count):r.bufferSubData(u,p.offset*d.BYTES_PER_ELEMENT,d.subarray(p.offset,p.offset+p.count)),p.count=-1),h.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=i.get(c);h&&(r.deleteBuffer(h.buffer),i.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const d=i.get(c);(!d||d.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const u=i.get(c);if(u===void 0)i.set(c,s(c,h));else if(u.version<c.version){if(u.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(u.buffer,c,h),u.version=c.version}}return{get:a,remove:o,update:l}}class Qn extends vt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const n=e/2,a=t/2,o=Math.floor(i),l=Math.floor(s),c=o+1,h=l+1,u=e/o,d=t/l,p=[],g=[],v=[],f=[];for(let m=0;m<h;m++){const S=m*d-a;for(let y=0;y<c;y++){const A=y*u-n;g.push(A,-S,0),v.push(0,0,1),f.push(y/o),f.push(1-m/l)}}for(let m=0;m<l;m++)for(let S=0;S<o;S++){const y=S+c*m,A=S+c*(m+1),C=S+1+c*(m+1),w=S+1+c*m;p.push(y,A,w),p.push(A,C,w)}this.setIndex(p),this.setAttribute("position",new st(g,3)),this.setAttribute("normal",new st(v,3)),this.setAttribute("uv",new st(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qn(e.width,e.height,e.widthSegments,e.heightSegments)}}var Iu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Uu=`#ifdef USE_ALPHAHASH
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
#endif`,Nu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Du=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ou=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Fu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Bu=`#ifdef USE_AOMAP
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
#endif`,zu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ku=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
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
#endif`,Hu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Gu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Vu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Wu=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Xu=`#ifdef USE_IRIDESCENCE
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
#endif`,ju=`#ifdef USE_BUMPMAP
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
#endif`,qu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
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
#endif`,Yu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ku=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ju=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Zu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,$u=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Qu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,ed=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,td=`#define PI 3.141592653589793
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
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
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
} // validated`,id=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,sd=`vec3 transformedNormal = objectNormal;
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
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,nd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,rd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ad=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,od=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ld="gl_FragColor = linearToOutputTexel( gl_FragColor );",cd=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,hd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,ud=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,dd=`#ifdef USE_ENVMAP
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
#endif`,pd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,md=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,gd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,_d=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,vd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,yd=`#ifdef USE_GRADIENTMAP
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
}`,xd=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Sd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Md=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,bd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Td=`uniform bool receiveShadow;
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
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
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
#endif`,Ed=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
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
	#endif
#endif`,Ad=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,wd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Rd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ld=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Cd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
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
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
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
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
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
#endif`,Pd=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
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
		vec3 iridescenceF0;
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
		float v = 0.5 / ( gv + gl );
		return saturate(v);
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
	vec3 f0 = material.specularColor;
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
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
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
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
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
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
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
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Id=`
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
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
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
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ud=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Nd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Dd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Od=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Fd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Bd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,zd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,kd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Hd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Gd=`#if defined( USE_POINTS_UV )
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
#endif`,Vd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Wd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Xd=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,jd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,qd=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Yd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Kd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
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
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Jd=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Zd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$d=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Qd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ep=`#ifdef USE_NORMALMAP
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
#endif`,tp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ip=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,sp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,np=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,rp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ap=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,op=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,lp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,cp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,hp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,up=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,dp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,pp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,mp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
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
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,fp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
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
#endif`,gp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,_p=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,vp=`#ifdef USE_SKINNING
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
#endif`,yp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,xp=`#ifdef USE_SKINNING
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
#endif`,Sp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Mp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,bp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Tp=`#ifndef saturate
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
vec3 OptimizedCineonToneMapping( vec3 color ) {
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
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ep=`#ifdef USE_TRANSMISSION
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
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Ap=`#ifdef USE_TRANSMISSION
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
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,wp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Rp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Lp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Cp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Pp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ip=`uniform sampler2D t2D;
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
}`,Up=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Np=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Op=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fp=`#include <common>
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
}`,Bp=`#if DEPTH_PACKING == 3200
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,zp=`#define DISTANCE
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
}`,kp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Hp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Gp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vp=`uniform float scale;
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
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Wp=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Xp=`#include <common>
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
}`,jp=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,qp=`#define LAMBERT
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
}`,Yp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,Kp=`#define MATCAP
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
}`,Jp=`#define MATCAP
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,Zp=`#define NORMAL
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
}`,$p=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Qp=`#define PHONG
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
}`,em=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
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
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,tm=`#define STANDARD
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
}`,im=`#define STANDARD
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
#include <packing>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
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
}`,sm=`#define TOON
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
}`,nm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,rm=`uniform float size;
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
}`,am=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,om=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
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
}`,lm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
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
}`,cm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
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
}`,hm=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,Ie={alphahash_fragment:Iu,alphahash_pars_fragment:Uu,alphamap_fragment:Nu,alphamap_pars_fragment:Du,alphatest_fragment:Ou,alphatest_pars_fragment:Fu,aomap_fragment:Bu,aomap_pars_fragment:zu,batching_pars_vertex:ku,batching_vertex:Hu,begin_vertex:Gu,beginnormal_vertex:Vu,bsdfs:Wu,iridescence_fragment:Xu,bumpmap_pars_fragment:ju,clipping_planes_fragment:qu,clipping_planes_pars_fragment:Yu,clipping_planes_pars_vertex:Ku,clipping_planes_vertex:Ju,color_fragment:Zu,color_pars_fragment:$u,color_pars_vertex:Qu,color_vertex:ed,common:td,cube_uv_reflection_fragment:id,defaultnormal_vertex:sd,displacementmap_pars_vertex:nd,displacementmap_vertex:rd,emissivemap_fragment:ad,emissivemap_pars_fragment:od,colorspace_fragment:ld,colorspace_pars_fragment:cd,envmap_fragment:hd,envmap_common_pars_fragment:ud,envmap_pars_fragment:dd,envmap_pars_vertex:pd,envmap_physical_pars_fragment:Ed,envmap_vertex:md,fog_vertex:fd,fog_pars_vertex:gd,fog_fragment:_d,fog_pars_fragment:vd,gradientmap_pars_fragment:yd,lightmap_fragment:xd,lightmap_pars_fragment:Sd,lights_lambert_fragment:Md,lights_lambert_pars_fragment:bd,lights_pars_begin:Td,lights_toon_fragment:Ad,lights_toon_pars_fragment:wd,lights_phong_fragment:Rd,lights_phong_pars_fragment:Ld,lights_physical_fragment:Cd,lights_physical_pars_fragment:Pd,lights_fragment_begin:Id,lights_fragment_maps:Ud,lights_fragment_end:Nd,logdepthbuf_fragment:Dd,logdepthbuf_pars_fragment:Od,logdepthbuf_pars_vertex:Fd,logdepthbuf_vertex:Bd,map_fragment:zd,map_pars_fragment:kd,map_particle_fragment:Hd,map_particle_pars_fragment:Gd,metalnessmap_fragment:Vd,metalnessmap_pars_fragment:Wd,morphcolor_vertex:Xd,morphnormal_vertex:jd,morphtarget_pars_vertex:qd,morphtarget_vertex:Yd,normal_fragment_begin:Kd,normal_fragment_maps:Jd,normal_pars_fragment:Zd,normal_pars_vertex:$d,normal_vertex:Qd,normalmap_pars_fragment:ep,clearcoat_normal_fragment_begin:tp,clearcoat_normal_fragment_maps:ip,clearcoat_pars_fragment:sp,iridescence_pars_fragment:np,opaque_fragment:rp,packing:ap,premultiplied_alpha_fragment:op,project_vertex:lp,dithering_fragment:cp,dithering_pars_fragment:hp,roughnessmap_fragment:up,roughnessmap_pars_fragment:dp,shadowmap_pars_fragment:pp,shadowmap_pars_vertex:mp,shadowmap_vertex:fp,shadowmask_pars_fragment:gp,skinbase_vertex:_p,skinning_pars_vertex:vp,skinning_vertex:yp,skinnormal_vertex:xp,specularmap_fragment:Sp,specularmap_pars_fragment:Mp,tonemapping_fragment:bp,tonemapping_pars_fragment:Tp,transmission_fragment:Ep,transmission_pars_fragment:Ap,uv_pars_fragment:wp,uv_pars_vertex:Rp,uv_vertex:Lp,worldpos_vertex:Cp,background_vert:Pp,background_frag:Ip,backgroundCube_vert:Up,backgroundCube_frag:Np,cube_vert:Dp,cube_frag:Op,depth_vert:Fp,depth_frag:Bp,distanceRGBA_vert:zp,distanceRGBA_frag:kp,equirect_vert:Hp,equirect_frag:Gp,linedashed_vert:Vp,linedashed_frag:Wp,meshbasic_vert:Xp,meshbasic_frag:jp,meshlambert_vert:qp,meshlambert_frag:Yp,meshmatcap_vert:Kp,meshmatcap_frag:Jp,meshnormal_vert:Zp,meshnormal_frag:$p,meshphong_vert:Qp,meshphong_frag:em,meshphysical_vert:tm,meshphysical_frag:im,meshtoon_vert:sm,meshtoon_frag:nm,points_vert:rm,points_frag:am,shadow_vert:om,shadow_frag:lm,sprite_vert:cm,sprite_frag:hm},se={common:{diffuse:{value:new xe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ke}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ke},normalScale:{value:new le(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new xe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new xe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0},uvTransform:{value:new ke}},sprite:{diffuse:{value:new xe(16777215)},opacity:{value:1},center:{value:new le(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}}},Qt={basic:{uniforms:Rt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.fog]),vertexShader:Ie.meshbasic_vert,fragmentShader:Ie.meshbasic_frag},lambert:{uniforms:Rt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new xe(0)}}]),vertexShader:Ie.meshlambert_vert,fragmentShader:Ie.meshlambert_frag},phong:{uniforms:Rt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new xe(0)},specular:{value:new xe(1118481)},shininess:{value:30}}]),vertexShader:Ie.meshphong_vert,fragmentShader:Ie.meshphong_frag},standard:{uniforms:Rt([se.common,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.roughnessmap,se.metalnessmap,se.fog,se.lights,{emissive:{value:new xe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ie.meshphysical_vert,fragmentShader:Ie.meshphysical_frag},toon:{uniforms:Rt([se.common,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.gradientmap,se.fog,se.lights,{emissive:{value:new xe(0)}}]),vertexShader:Ie.meshtoon_vert,fragmentShader:Ie.meshtoon_frag},matcap:{uniforms:Rt([se.common,se.bumpmap,se.normalmap,se.displacementmap,se.fog,{matcap:{value:null}}]),vertexShader:Ie.meshmatcap_vert,fragmentShader:Ie.meshmatcap_frag},points:{uniforms:Rt([se.points,se.fog]),vertexShader:Ie.points_vert,fragmentShader:Ie.points_frag},dashed:{uniforms:Rt([se.common,se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ie.linedashed_vert,fragmentShader:Ie.linedashed_frag},depth:{uniforms:Rt([se.common,se.displacementmap]),vertexShader:Ie.depth_vert,fragmentShader:Ie.depth_frag},normal:{uniforms:Rt([se.common,se.bumpmap,se.normalmap,se.displacementmap,{opacity:{value:1}}]),vertexShader:Ie.meshnormal_vert,fragmentShader:Ie.meshnormal_frag},sprite:{uniforms:Rt([se.sprite,se.fog]),vertexShader:Ie.sprite_vert,fragmentShader:Ie.sprite_frag},background:{uniforms:{uvTransform:{value:new ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ie.background_vert,fragmentShader:Ie.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ie.backgroundCube_vert,fragmentShader:Ie.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ie.cube_vert,fragmentShader:Ie.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ie.equirect_vert,fragmentShader:Ie.equirect_frag},distanceRGBA:{uniforms:Rt([se.common,se.displacementmap,{referencePosition:{value:new _},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ie.distanceRGBA_vert,fragmentShader:Ie.distanceRGBA_frag},shadow:{uniforms:Rt([se.lights,se.fog,{color:{value:new xe(0)},opacity:{value:1}}]),vertexShader:Ie.shadow_vert,fragmentShader:Ie.shadow_frag}};Qt.physical={uniforms:Rt([Qt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ke},clearcoatNormalScale:{value:new le(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ke},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ke},sheen:{value:0},sheenColor:{value:new xe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ke},transmissionSamplerSize:{value:new le},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ke},attenuationDistance:{value:0},attenuationColor:{value:new xe(0)},specularColor:{value:new xe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ke},anisotropyVector:{value:new le},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ke}}]),vertexShader:Ie.meshphysical_vert,fragmentShader:Ie.meshphysical_frag};const Rn={r:0,b:0,g:0};function um(r,e,t,i,s,n,a){const o=new xe(0);let l=n===!0?0:1,c,h,u=null,d=0,p=null;function g(f,m){let S=!1,y=m.isScene===!0?m.background:null;y&&y.isTexture&&(y=(m.backgroundBlurriness>0?t:e).get(y)),y===null?v(o,l):y&&y.isColor&&(v(y,1),S=!0);const A=r.xr.getEnvironmentBlendMode();A==="additive"?i.buffers.color.setClear(0,0,0,1,a):A==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(r.autoClear||S)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),y&&(y.isCubeTexture||y.mapping===Zn)?(h===void 0&&(h=new Xe(new Lt(1,1,1),new Ki({name:"BackgroundCubeMaterial",uniforms:Cs(Qt.backgroundCube.uniforms),vertexShader:Qt.backgroundCube.vertexShader,fragmentShader:Qt.backgroundCube.fragmentShader,side:It,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,w,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=m.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,h.material.toneMapped=qe.getTransfer(y.colorSpace)!==tt,(u!==y||d!==y.version||p!==r.toneMapping)&&(h.material.needsUpdate=!0,u=y,d=y.version,p=r.toneMapping),h.layers.enableAll(),f.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new Xe(new Qn(2,2),new Ki({name:"BackgroundMaterial",uniforms:Cs(Qt.background.uniforms),vertexShader:Qt.background.vertexShader,fragmentShader:Qt.background.fragmentShader,side:gi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,c.material.toneMapped=qe.getTransfer(y.colorSpace)!==tt,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||d!==y.version||p!==r.toneMapping)&&(c.material.needsUpdate=!0,u=y,d=y.version,p=r.toneMapping),c.layers.enableAll(),f.unshift(c,c.geometry,c.material,0,0,null))}function v(f,m){f.getRGB(Rn,cc(r)),i.buffers.color.setClear(Rn.r,Rn.g,Rn.b,m,a)}return{getClearColor:function(){return o},setClearColor:function(f,m=1){o.set(f),l=m,v(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(f){l=f,v(o,l)},render:g}}function dm(r,e,t,i){const s=r.getParameter(r.MAX_VERTEX_ATTRIBS),n=i.isWebGL2?null:e.get("OES_vertex_array_object"),a=i.isWebGL2||n!==null,o={},l=f(null);let c=l,h=!1;function u(P,F,V,j,X){let W=!1;if(a){const Z=v(j,V,F);c!==Z&&(c=Z,p(c.object)),W=m(P,j,V,X),W&&S(P,j,V,X)}else{const Z=F.wireframe===!0;(c.geometry!==j.id||c.program!==V.id||c.wireframe!==Z)&&(c.geometry=j.id,c.program=V.id,c.wireframe=Z,W=!0)}X!==null&&t.update(X,r.ELEMENT_ARRAY_BUFFER),(W||h)&&(h=!1,G(P,F,V,j),X!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(X).buffer))}function d(){return i.isWebGL2?r.createVertexArray():n.createVertexArrayOES()}function p(P){return i.isWebGL2?r.bindVertexArray(P):n.bindVertexArrayOES(P)}function g(P){return i.isWebGL2?r.deleteVertexArray(P):n.deleteVertexArrayOES(P)}function v(P,F,V){const j=V.wireframe===!0;let X=o[P.id];X===void 0&&(X={},o[P.id]=X);let W=X[F.id];W===void 0&&(W={},X[F.id]=W);let Z=W[j];return Z===void 0&&(Z=f(d()),W[j]=Z),Z}function f(P){const F=[],V=[],j=[];for(let X=0;X<s;X++)F[X]=0,V[X]=0,j[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:V,attributeDivisors:j,object:P,attributes:{},index:null}}function m(P,F,V,j){const X=c.attributes,W=F.attributes;let Z=0;const Q=V.getAttributes();for(const oe in Q)if(Q[oe].location>=0){const z=X[oe];let q=W[oe];if(q===void 0&&(oe==="instanceMatrix"&&P.instanceMatrix&&(q=P.instanceMatrix),oe==="instanceColor"&&P.instanceColor&&(q=P.instanceColor)),z===void 0||z.attribute!==q||q&&z.data!==q.data)return!0;Z++}return c.attributesNum!==Z||c.index!==j}function S(P,F,V,j){const X={},W=F.attributes;let Z=0;const Q=V.getAttributes();for(const oe in Q)if(Q[oe].location>=0){let z=W[oe];z===void 0&&(oe==="instanceMatrix"&&P.instanceMatrix&&(z=P.instanceMatrix),oe==="instanceColor"&&P.instanceColor&&(z=P.instanceColor));const q={};q.attribute=z,z&&z.data&&(q.data=z.data),X[oe]=q,Z++}c.attributes=X,c.attributesNum=Z,c.index=j}function y(){const P=c.newAttributes;for(let F=0,V=P.length;F<V;F++)P[F]=0}function A(P){C(P,0)}function C(P,F){const V=c.newAttributes,j=c.enabledAttributes,X=c.attributeDivisors;V[P]=1,j[P]===0&&(r.enableVertexAttribArray(P),j[P]=1),X[P]!==F&&((i.isWebGL2?r:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](P,F),X[P]=F)}function w(){const P=c.newAttributes,F=c.enabledAttributes;for(let V=0,j=F.length;V<j;V++)F[V]!==P[V]&&(r.disableVertexAttribArray(V),F[V]=0)}function R(P,F,V,j,X,W,Z){Z===!0?r.vertexAttribIPointer(P,F,V,X,W):r.vertexAttribPointer(P,F,V,j,X,W)}function G(P,F,V,j){if(i.isWebGL2===!1&&(P.isInstancedMesh||j.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;y();const X=j.attributes,W=V.getAttributes(),Z=F.defaultAttributeValues;for(const Q in W){const oe=W[Q];if(oe.location>=0){let z=X[Q];if(z===void 0&&(Q==="instanceMatrix"&&P.instanceMatrix&&(z=P.instanceMatrix),Q==="instanceColor"&&P.instanceColor&&(z=P.instanceColor)),z!==void 0){const q=z.normalized,ue=z.itemSize,fe=t.get(z);if(fe===void 0)continue;const me=fe.buffer,Le=fe.type,Ce=fe.bytesPerElement,be=i.isWebGL2===!0&&(Le===r.INT||Le===r.UNSIGNED_INT||z.gpuType===Xl);if(z.isInterleavedBufferAttribute){const We=z.data,D=We.stride,Et=z.offset;if(We.isInstancedInterleavedBuffer){for(let ve=0;ve<oe.locationSize;ve++)C(oe.location+ve,We.meshPerAttribute);P.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=We.meshPerAttribute*We.count)}else for(let ve=0;ve<oe.locationSize;ve++)A(oe.location+ve);r.bindBuffer(r.ARRAY_BUFFER,me);for(let ve=0;ve<oe.locationSize;ve++)R(oe.location+ve,ue/oe.locationSize,Le,q,D*Ce,(Et+ue/oe.locationSize*ve)*Ce,be)}else{if(z.isInstancedBufferAttribute){for(let We=0;We<oe.locationSize;We++)C(oe.location+We,z.meshPerAttribute);P.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=z.meshPerAttribute*z.count)}else for(let We=0;We<oe.locationSize;We++)A(oe.location+We);r.bindBuffer(r.ARRAY_BUFFER,me);for(let We=0;We<oe.locationSize;We++)R(oe.location+We,ue/oe.locationSize,Le,q,ue*Ce,ue/oe.locationSize*We*Ce,be)}}else if(Z!==void 0){const q=Z[Q];if(q!==void 0)switch(q.length){case 2:r.vertexAttrib2fv(oe.location,q);break;case 3:r.vertexAttrib3fv(oe.location,q);break;case 4:r.vertexAttrib4fv(oe.location,q);break;default:r.vertexAttrib1fv(oe.location,q)}}}}w()}function M(){k();for(const P in o){const F=o[P];for(const V in F){const j=F[V];for(const X in j)g(j[X].object),delete j[X];delete F[V]}delete o[P]}}function E(P){if(o[P.id]===void 0)return;const F=o[P.id];for(const V in F){const j=F[V];for(const X in j)g(j[X].object),delete j[X];delete F[V]}delete o[P.id]}function H(P){for(const F in o){const V=o[F];if(V[P.id]===void 0)continue;const j=V[P.id];for(const X in j)g(j[X].object),delete j[X];delete V[P.id]}}function k(){ee(),h=!0,c!==l&&(c=l,p(c.object))}function ee(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:u,reset:k,resetDefaultState:ee,dispose:M,releaseStatesOfGeometry:E,releaseStatesOfProgram:H,initAttributes:y,enableAttribute:A,disableUnusedAttributes:w}}function pm(r,e,t,i){const s=i.isWebGL2;let n;function a(h){n=h}function o(h,u){r.drawArrays(n,h,u),t.update(u,n,1)}function l(h,u,d){if(d===0)return;let p,g;if(s)p=r,g="drawArraysInstanced";else if(p=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[g](n,h,u,d),t.update(u,n,d)}function c(h,u,d){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<d;g++)this.render(h[g],u[g]);else{p.multiDrawArraysWEBGL(n,h,0,u,0,d);let g=0;for(let v=0;v<d;v++)g+=u[v];t.update(g,n,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function mm(r,e,t){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function n(R){if(R==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&r.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const l=n(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,u=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),d=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),v=r.getParameter(r.MAX_VERTEX_ATTRIBS),f=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),m=r.getParameter(r.MAX_VARYING_VECTORS),S=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),y=d>0,A=a||e.has("OES_texture_float"),C=y&&A,w=a?r.getParameter(r.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:s,getMaxPrecision:n,precision:o,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:d,maxTextureSize:p,maxCubemapSize:g,maxAttributes:v,maxVertexUniforms:f,maxVaryings:m,maxFragmentUniforms:S,vertexTextures:y,floatFragmentTextures:A,floatVertexTextures:C,maxSamples:w}}function fm(r){const e=this;let t=null,i=0,s=!1,n=!1;const a=new zi,o=new ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const p=u.length!==0||d||i!==0||s;return s=d,i=u.length,p},this.beginShadows=function(){n=!0,h(null)},this.endShadows=function(){n=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,p){const g=u.clippingPlanes,v=u.clipIntersection,f=u.clipShadows,m=r.get(u);if(!s||g===null||g.length===0||n&&!f)n?h(null):c();else{const S=n?0:i,y=S*4;let A=m.clippingState||null;l.value=A,A=h(g,d,y,p);for(let C=0;C!==y;++C)A[C]=t[C];m.clippingState=A,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(u,d,p,g){const v=u!==null?u.length:0;let f=null;if(v!==0){if(f=l.value,g!==!0||f===null){const m=p+v*4,S=d.matrixWorldInverse;o.getNormalMatrix(S),(f===null||f.length<m)&&(f=new Float32Array(m));for(let y=0,A=p;y!==v;++y,A+=4)a.copy(u[y]).applyMatrix4(S,o),a.normal.toArray(f,A),f[A+3]=a.constant}l.value=f,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,f}}function gm(r){let e=new WeakMap;function t(a,o){return o===Jr?a.mapping=Ts:o===Zr&&(a.mapping=Es),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Jr||o===Zr)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Ru(l.height/2);return c.fromEquirectangularTexture(r,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function n(){e=new WeakMap}return{get:i,dispose:n}}class va extends hc{constructor(e=-1,t=1,i=1,s=-1,n=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=n,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,n,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=n,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let n=i-e,a=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;n+=c*this.view.offsetX,a=n+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(n,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const vs=4,Ho=[.125,.215,.35,.446,.526,.582],Gi=20,Cr=new va,Go=new xe;let Pr=null,Ir=0,Ur=0;const ki=(1+Math.sqrt(5))/2,ms=1/ki,Vo=[new _(1,1,1),new _(-1,1,1),new _(1,1,-1),new _(-1,1,-1),new _(0,ki,ms),new _(0,ki,-ms),new _(ms,0,ki),new _(-ms,0,ki),new _(ki,ms,0),new _(-ki,ms,0)];class Wo{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100){Pr=this._renderer.getRenderTarget(),Ir=this._renderer.getActiveCubeFace(),Ur=this._renderer.getActiveMipmapLevel(),this._setSize(256);const n=this._allocateTargets();return n.depthBuffer=!0,this._sceneToCubeUV(e,i,s,n),t>0&&this._blur(n,0,0,t),this._applyPMREM(n),this._cleanup(n),n}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=qo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=jo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Pr,Ir,Ur),e.scissorTest=!1,Ln(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ts||e.mapping===Es?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Pr=this._renderer.getRenderTarget(),Ir=this._renderer.getActiveCubeFace(),Ur=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Pt,minFilter:Pt,generateMipmaps:!1,type:Zs,format:Wt,colorSpace:_t,depthBuffer:!1},s=Xo(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Xo(e,t,i);const{_lodMax:n}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=_m(n)),this._blurMaterial=vm(n,e,t)}return s}_compileMaterial(e){const t=new Xe(this._lodPlanes[0],e);this._renderer.compile(t,Cr)}_sceneToCubeUV(e,t,i,s){const n=new Ct(90,1,t,i),a=[1,-1,1,1,1,1],o=[1,1,1,-1,-1,-1],l=this._renderer,c=l.autoClear,h=l.toneMapping;l.getClearColor(Go),l.toneMapping=Ri,l.autoClear=!1;const u=new Kt({name:"PMREM.Background",side:It,depthWrite:!1,depthTest:!1}),d=new Xe(new Lt,u);let p=!1;const g=e.background;g?g.isColor&&(u.color.copy(g),e.background=null,p=!0):(u.color.copy(Go),p=!0);for(let v=0;v<6;v++){const f=v%3;f===0?(n.up.set(0,a[v],0),n.lookAt(o[v],0,0)):f===1?(n.up.set(0,0,a[v]),n.lookAt(0,o[v],0)):(n.up.set(0,a[v],0),n.lookAt(0,0,o[v]));const m=this._cubeSize;Ln(s,f*m,v>2?m:0,m,m),l.setRenderTarget(s),p&&l.render(d,n),l.render(e,n)}d.geometry.dispose(),d.material.dispose(),l.toneMapping=h,l.autoClear=c,e.background=g}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===Ts||e.mapping===Es;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=qo()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=jo());const n=s?this._cubemapMaterial:this._equirectMaterial,a=new Xe(this._lodPlanes[0],n),o=n.uniforms;o.envMap.value=e;const l=this._cubeSize;Ln(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Cr)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const n=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Vo[(s-1)%Vo.length];this._blur(e,s-1,s,n,a)}t.autoClear=i}_blur(e,t,i,s,n){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,s,"latitudinal",n),this._halfBlur(a,e,i,i,s,"longitudinal",n)}_halfBlur(e,t,i,s,n,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Xe(this._lodPlanes[s],c),d=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(n)?Math.PI/(2*p):2*Math.PI/(2*Gi-1),v=n/g,f=isFinite(n)?1+Math.floor(h*v):Gi;f>Gi&&console.warn(`sigmaRadians, ${n}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${Gi}`);const m=[];let S=0;for(let R=0;R<Gi;++R){const G=R/v,M=Math.exp(-G*G/2);m.push(M),R===0?S+=M:R<f&&(S+=2*M)}for(let R=0;R<m.length;R++)m[R]=m[R]/S;d.envMap.value=e.texture,d.samples.value=f,d.weights.value=m,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:y}=this;d.dTheta.value=g,d.mipInt.value=y-i;const A=this._sizeLods[s],C=3*A*(s>y-vs?s-y+vs:0),w=4*(this._cubeSize-A);Ln(t,C,w,3*A,2*A),l.setRenderTarget(t),l.render(u,Cr)}}function _m(r){const e=[],t=[],i=[];let s=r;const n=r-vs+1+Ho.length;for(let a=0;a<n;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>r-vs?l=Ho[a-r+vs-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,v=3,f=2,m=1,S=new Float32Array(v*g*p),y=new Float32Array(f*g*p),A=new Float32Array(m*g*p);for(let w=0;w<p;w++){const R=w%3*2/3-1,G=w>2?0:-1,M=[R,G,0,R+2/3,G,0,R+2/3,G+1,0,R,G,0,R+2/3,G+1,0,R,G+1,0];S.set(M,v*g*w),y.set(d,f*g*w);const E=[w,w,w,w,w,w];A.set(E,m*g*w)}const C=new vt;C.setAttribute("position",new Tt(S,v)),C.setAttribute("uv",new Tt(y,f)),C.setAttribute("faceIndex",new Tt(A,m)),e.push(C),s>vs&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Xo(r,e,t){const i=new Yi(r,e,t);return i.texture.mapping=Zn,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ln(r,e,t,i,s){r.viewport.set(e,t,i,s),r.scissor.set(e,t,i,s)}function vm(r,e,t){const i=new Float32Array(Gi),s=new _(0,1,0);return new Ki({name:"SphericalGaussianBlur",defines:{n:Gi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ya(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:wi,depthTest:!1,depthWrite:!1})}function jo(){return new Ki({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ya(),fragmentShader:`

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
		`,blending:wi,depthTest:!1,depthWrite:!1})}function qo(){return new Ki({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ya(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wi,depthTest:!1,depthWrite:!1})}function ya(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function ym(r){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===Jr||l===Zr,h=l===Ts||l===Es;if(c||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let u=e.get(o);return t===null&&(t=new Wo(r)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),e.set(o,u),u.texture}else{if(e.has(o))return e.get(o).texture;{const u=o.image;if(c&&u&&u.height>0||h&&u&&s(u)){t===null&&(t=new Wo(r));const d=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,d),o.addEventListener("dispose",n),d.texture}else return null}}}return o}function s(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function n(o){const l=o.target;l.removeEventListener("dispose",n);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function xm(r){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=r.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const s=t(i);return s===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function Sm(r,e,t,i){const s={},n=new WeakMap;function a(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);for(const g in d.morphAttributes){const v=d.morphAttributes[g];for(let f=0,m=v.length;f<m;f++)e.remove(v[f])}d.removeEventListener("dispose",a),delete s[d.id];const p=n.get(d);p&&(e.remove(p),n.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const g in d)e.update(d[g],r.ARRAY_BUFFER);const p=u.morphAttributes;for(const g in p){const v=p[g];for(let f=0,m=v.length;f<m;f++)e.update(v[f],r.ARRAY_BUFFER)}}function c(u){const d=[],p=u.index,g=u.attributes.position;let v=0;if(p!==null){const S=p.array;v=p.version;for(let y=0,A=S.length;y<A;y+=3){const C=S[y+0],w=S[y+1],R=S[y+2];d.push(C,w,w,R,R,C)}}else if(g!==void 0){const S=g.array;v=g.version;for(let y=0,A=S.length/3-1;y<A;y+=3){const C=y+0,w=y+1,R=y+2;d.push(C,w,w,R,R,C)}}else return;const f=new(ic(d)?lc:oc)(d,1);f.version=v;const m=n.get(u);m&&e.remove(m),n.set(u,f)}function h(u){const d=n.get(u);if(d){const p=u.index;p!==null&&d.version<p.version&&c(u)}else c(u);return n.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function Mm(r,e,t,i){const s=i.isWebGL2;let n;function a(p){n=p}let o,l;function c(p){o=p.type,l=p.bytesPerElement}function h(p,g){r.drawElements(n,g,o,p*l),t.update(g,n,1)}function u(p,g,v){if(v===0)return;let f,m;if(s)f=r,m="drawElementsInstanced";else if(f=e.get("ANGLE_instanced_arrays"),m="drawElementsInstancedANGLE",f===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[m](n,g,o,p*l,v),t.update(g,n,v)}function d(p,g,v){if(v===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<v;m++)this.render(p[m]/l,g[m]);else{f.multiDrawElementsWEBGL(n,g,0,o,p,0,v);let m=0;for(let S=0;S<v;S++)m+=g[S];t.update(m,n,1)}}this.setMode=a,this.setIndex=c,this.render=h,this.renderInstances=u,this.renderMultiDraw=d}function bm(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(n,a,o){switch(t.calls++,a){case r.TRIANGLES:t.triangles+=o*(n/3);break;case r.LINES:t.lines+=o*(n/2);break;case r.LINE_STRIP:t.lines+=o*(n-1);break;case r.LINE_LOOP:t.lines+=o*n;break;case r.POINTS:t.points+=o*n;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function Tm(r,e){return r[0]-e[0]}function Em(r,e){return Math.abs(e[1])-Math.abs(r[1])}function Am(r,e,t){const i={},s=new Float32Array(8),n=new WeakMap,a=new Ze,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,h,u){const d=c.morphTargetInfluences;if(e.isWebGL2===!0){const p=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,g=p!==void 0?p.length:0;let v=n.get(h);if(v===void 0||v.count!==g){let S=function(){ee.dispose(),n.delete(h),h.removeEventListener("dispose",S)};v!==void 0&&v.texture.dispose();const y=h.morphAttributes.position!==void 0,A=h.morphAttributes.normal!==void 0,C=h.morphAttributes.color!==void 0,w=h.morphAttributes.position||[],R=h.morphAttributes.normal||[],G=h.morphAttributes.color||[];let M=0;y===!0&&(M=1),A===!0&&(M=2),C===!0&&(M=3);let E=h.attributes.position.count*M,H=1;E>e.maxTextureSize&&(H=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const k=new Float32Array(E*H*4*g),ee=new rc(k,E,H,g);ee.type=mi,ee.needsUpdate=!0;const P=M*4;for(let F=0;F<g;F++){const V=w[F],j=R[F],X=G[F],W=E*H*4*F;for(let Z=0;Z<V.count;Z++){const Q=Z*P;y===!0&&(a.fromBufferAttribute(V,Z),k[W+Q+0]=a.x,k[W+Q+1]=a.y,k[W+Q+2]=a.z,k[W+Q+3]=0),A===!0&&(a.fromBufferAttribute(j,Z),k[W+Q+4]=a.x,k[W+Q+5]=a.y,k[W+Q+6]=a.z,k[W+Q+7]=0),C===!0&&(a.fromBufferAttribute(X,Z),k[W+Q+8]=a.x,k[W+Q+9]=a.y,k[W+Q+10]=a.z,k[W+Q+11]=X.itemSize===4?a.w:1)}}v={count:g,texture:ee,size:new le(E,H)},n.set(h,v),h.addEventListener("dispose",S)}let f=0;for(let S=0;S<d.length;S++)f+=d[S];const m=h.morphTargetsRelative?1:1-f;u.getUniforms().setValue(r,"morphTargetBaseInfluence",m),u.getUniforms().setValue(r,"morphTargetInfluences",d),u.getUniforms().setValue(r,"morphTargetsTexture",v.texture,t),u.getUniforms().setValue(r,"morphTargetsTextureSize",v.size)}else{const p=d===void 0?0:d.length;let g=i[h.id];if(g===void 0||g.length!==p){g=[];for(let y=0;y<p;y++)g[y]=[y,0];i[h.id]=g}for(let y=0;y<p;y++){const A=g[y];A[0]=y,A[1]=d[y]}g.sort(Em);for(let y=0;y<8;y++)y<p&&g[y][1]?(o[y][0]=g[y][0],o[y][1]=g[y][1]):(o[y][0]=Number.MAX_SAFE_INTEGER,o[y][1]=0);o.sort(Tm);const v=h.morphAttributes.position,f=h.morphAttributes.normal;let m=0;for(let y=0;y<8;y++){const A=o[y],C=A[0],w=A[1];C!==Number.MAX_SAFE_INTEGER&&w?(v&&h.getAttribute("morphTarget"+y)!==v[C]&&h.setAttribute("morphTarget"+y,v[C]),f&&h.getAttribute("morphNormal"+y)!==f[C]&&h.setAttribute("morphNormal"+y,f[C]),s[y]=w,m+=w):(v&&h.hasAttribute("morphTarget"+y)===!0&&h.deleteAttribute("morphTarget"+y),f&&h.hasAttribute("morphNormal"+y)===!0&&h.deleteAttribute("morphNormal"+y),s[y]=0)}const S=h.morphTargetsRelative?1:1-m;u.getUniforms().setValue(r,"morphTargetBaseInfluence",S),u.getUniforms().setValue(r,"morphTargetInfluences",s)}}return{update:l}}function wm(r,e,t,i){let s=new WeakMap;function n(l){const c=i.render.frame,h=l.geometry,u=e.get(l,h);if(s.get(u)!==c&&(e.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:n,dispose:a}}class pc extends yt{constructor(e,t,i,s,n,a,o,l,c,h){if(h=h!==void 0?h:Wi,h!==Wi&&h!==As)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===Wi&&(i=Ei),i===void 0&&h===As&&(i=Vi),super(null,s,n,a,o,l,h,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:gt,this.minFilter=l!==void 0?l:gt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const mc=new yt,fc=new pc(1,1);fc.compareFunction=tc;const gc=new rc,_c=new uu,vc=new uc,Yo=[],Ko=[],Jo=new Float32Array(16),Zo=new Float32Array(9),$o=new Float32Array(4);function Ns(r,e,t){const i=r[0];if(i<=0||i>0)return r;const s=e*t;let n=Yo[s];if(n===void 0&&(n=new Float32Array(s),Yo[s]=n),e!==0){i.toArray(n,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(n,o)}return n}function dt(r,e){if(r.length!==e.length)return!1;for(let t=0,i=r.length;t<i;t++)if(r[t]!==e[t])return!1;return!0}function pt(r,e){for(let t=0,i=e.length;t<i;t++)r[t]=e[t]}function er(r,e){let t=Ko[e];t===void 0&&(t=new Int32Array(e),Ko[e]=t);for(let i=0;i!==e;++i)t[i]=r.allocateTextureUnit();return t}function Rm(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function Lm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(dt(t,e))return;r.uniform2fv(this.addr,e),pt(t,e)}}function Cm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(dt(t,e))return;r.uniform3fv(this.addr,e),pt(t,e)}}function Pm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(dt(t,e))return;r.uniform4fv(this.addr,e),pt(t,e)}}function Im(r,e){const t=this.cache,i=e.elements;if(i===void 0){if(dt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),pt(t,e)}else{if(dt(t,i))return;$o.set(i),r.uniformMatrix2fv(this.addr,!1,$o),pt(t,i)}}function Um(r,e){const t=this.cache,i=e.elements;if(i===void 0){if(dt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),pt(t,e)}else{if(dt(t,i))return;Zo.set(i),r.uniformMatrix3fv(this.addr,!1,Zo),pt(t,i)}}function Nm(r,e){const t=this.cache,i=e.elements;if(i===void 0){if(dt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),pt(t,e)}else{if(dt(t,i))return;Jo.set(i),r.uniformMatrix4fv(this.addr,!1,Jo),pt(t,i)}}function Dm(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function Om(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(dt(t,e))return;r.uniform2iv(this.addr,e),pt(t,e)}}function Fm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(dt(t,e))return;r.uniform3iv(this.addr,e),pt(t,e)}}function Bm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(dt(t,e))return;r.uniform4iv(this.addr,e),pt(t,e)}}function zm(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function km(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(dt(t,e))return;r.uniform2uiv(this.addr,e),pt(t,e)}}function Hm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(dt(t,e))return;r.uniform3uiv(this.addr,e),pt(t,e)}}function Gm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(dt(t,e))return;r.uniform4uiv(this.addr,e),pt(t,e)}}function Vm(r,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(r.uniform1i(this.addr,s),i[0]=s);const n=this.type===r.SAMPLER_2D_SHADOW?fc:mc;t.setTexture2D(e||n,s)}function Wm(r,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(r.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||_c,s)}function Xm(r,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(r.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||vc,s)}function jm(r,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(r.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||gc,s)}function qm(r){switch(r){case 5126:return Rm;case 35664:return Lm;case 35665:return Cm;case 35666:return Pm;case 35674:return Im;case 35675:return Um;case 35676:return Nm;case 5124:case 35670:return Dm;case 35667:case 35671:return Om;case 35668:case 35672:return Fm;case 35669:case 35673:return Bm;case 5125:return zm;case 36294:return km;case 36295:return Hm;case 36296:return Gm;case 35678:case 36198:case 36298:case 36306:case 35682:return Vm;case 35679:case 36299:case 36307:return Wm;case 35680:case 36300:case 36308:case 36293:return Xm;case 36289:case 36303:case 36311:case 36292:return jm}}function Ym(r,e){r.uniform1fv(this.addr,e)}function Km(r,e){const t=Ns(e,this.size,2);r.uniform2fv(this.addr,t)}function Jm(r,e){const t=Ns(e,this.size,3);r.uniform3fv(this.addr,t)}function Zm(r,e){const t=Ns(e,this.size,4);r.uniform4fv(this.addr,t)}function $m(r,e){const t=Ns(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function Qm(r,e){const t=Ns(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function ef(r,e){const t=Ns(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function tf(r,e){r.uniform1iv(this.addr,e)}function sf(r,e){r.uniform2iv(this.addr,e)}function nf(r,e){r.uniform3iv(this.addr,e)}function rf(r,e){r.uniform4iv(this.addr,e)}function af(r,e){r.uniform1uiv(this.addr,e)}function of(r,e){r.uniform2uiv(this.addr,e)}function lf(r,e){r.uniform3uiv(this.addr,e)}function cf(r,e){r.uniform4uiv(this.addr,e)}function hf(r,e,t){const i=this.cache,s=e.length,n=er(t,s);dt(i,n)||(r.uniform1iv(this.addr,n),pt(i,n));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||mc,n[a])}function uf(r,e,t){const i=this.cache,s=e.length,n=er(t,s);dt(i,n)||(r.uniform1iv(this.addr,n),pt(i,n));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||_c,n[a])}function df(r,e,t){const i=this.cache,s=e.length,n=er(t,s);dt(i,n)||(r.uniform1iv(this.addr,n),pt(i,n));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||vc,n[a])}function pf(r,e,t){const i=this.cache,s=e.length,n=er(t,s);dt(i,n)||(r.uniform1iv(this.addr,n),pt(i,n));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||gc,n[a])}function mf(r){switch(r){case 5126:return Ym;case 35664:return Km;case 35665:return Jm;case 35666:return Zm;case 35674:return $m;case 35675:return Qm;case 35676:return ef;case 5124:case 35670:return tf;case 35667:case 35671:return sf;case 35668:case 35672:return nf;case 35669:case 35673:return rf;case 5125:return af;case 36294:return of;case 36295:return lf;case 36296:return cf;case 35678:case 36198:case 36298:case 36306:case 35682:return hf;case 35679:case 36299:case 36307:return uf;case 35680:case 36300:case 36308:case 36293:return df;case 36289:case 36303:case 36311:case 36292:return pf}}class ff{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=qm(t.type)}}class gf{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=mf(t.type)}}class _f{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let n=0,a=s.length;n!==a;++n){const o=s[n];o.setValue(e,t[o.id],i)}}}const Nr=/(\w+)(\])?(\[|\.)?/g;function Qo(r,e){r.seq.push(e),r.map[e.id]=e}function vf(r,e,t){const i=r.name,s=i.length;for(Nr.lastIndex=0;;){const n=Nr.exec(i),a=Nr.lastIndex;let o=n[1];const l=n[2]==="]",c=n[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Qo(t,c===void 0?new ff(o,r,e):new gf(o,r,e));break}else{let h=t.map[o];h===void 0&&(h=new _f(o),Qo(t,h)),t=h}}}class Gn{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const n=e.getActiveUniform(t,s),a=e.getUniformLocation(t,n.name);vf(n,a,this)}}setValue(e,t,i,s){const n=this.map[t];n!==void 0&&n.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let n=0,a=t.length;n!==a;++n){const o=t[n],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,n=e.length;s!==n;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function el(r,e,t){const i=r.createShader(e);return r.shaderSource(i,t),r.compileShader(i),i}const yf=37297;let xf=0;function Sf(r,e){const t=r.split(`
`),i=[],s=Math.max(e-6,0),n=Math.min(e+6,t.length);for(let a=s;a<n;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}function Mf(r){const e=qe.getPrimaries(qe.workingColorSpace),t=qe.getPrimaries(r);let i;switch(e===t?i="":e===Yn&&t===qn?i="LinearDisplayP3ToLinearSRGB":e===qn&&t===Yn&&(i="LinearSRGBToLinearDisplayP3"),r){case _t:case $n:return[i,"LinearTransferOETF"];case at:case ma:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[i,"LinearTransferOETF"]}}function tl(r,e,t){const i=r.getShaderParameter(e,r.COMPILE_STATUS),s=r.getShaderInfoLog(e).trim();if(i&&s==="")return"";const n=/ERROR: 0:(\d+)/.exec(s);if(n){const a=parseInt(n[1]);return t.toUpperCase()+`

`+s+`

`+Sf(r.getShaderSource(e),a)}else return s}function bf(r,e){const t=Mf(e);return`vec4 ${r}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Tf(r,e){let t;switch(e){case gh:t="Linear";break;case _h:t="Reinhard";break;case vh:t="OptimizedCineon";break;case yh:t="ACESFilmic";break;case Sh:t="AgX";break;case xh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Ef(r){return[r.extensionDerivatives||r.envMapCubeUVHeight||r.bumpMap||r.normalMapTangentSpace||r.clearcoatNormalMap||r.flatShading||r.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(r.extensionFragDepth||r.logarithmicDepthBuffer)&&r.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",r.extensionDrawBuffers&&r.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(r.extensionShaderTextureLOD||r.envMap||r.transmission)&&r.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(ys).join(`
`)}function Af(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(ys).join(`
`)}function wf(r){const e=[];for(const t in r){const i=r[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Rf(r,e){const t={},i=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const n=r.getActiveAttrib(e,s),a=n.name;let o=1;n.type===r.FLOAT_MAT2&&(o=2),n.type===r.FLOAT_MAT3&&(o=3),n.type===r.FLOAT_MAT4&&(o=4),t[a]={type:n.type,location:r.getAttribLocation(e,a),locationSize:o}}return t}function ys(r){return r!==""}function il(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function sl(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Lf=/^[ \t]*#include +<([\w\d./]+)>/gm;function na(r){return r.replace(Lf,Pf)}const Cf=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Pf(r,e){let t=Ie[e];if(t===void 0){const i=Cf.get(e);if(i!==void 0)t=Ie[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return na(t)}const If=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function nl(r){return r.replace(If,Uf)}function Uf(r,e,t,i){let s="";for(let n=parseInt(e);n<parseInt(t);n++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+n+" ]").replace(/UNROLLED_LOOP_INDEX/g,n);return s}function rl(r){let e="precision "+r.precision+` float;
precision `+r.precision+" int;";return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Nf(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===kl?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===Hl?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===pi&&(e="SHADOWMAP_TYPE_VSM"),e}function Df(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Ts:case Es:e="ENVMAP_TYPE_CUBE";break;case Zn:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Of(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Es:e="ENVMAP_MODE_REFRACTION";break}return e}function Ff(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Gl:e="ENVMAP_BLENDING_MULTIPLY";break;case mh:e="ENVMAP_BLENDING_MIX";break;case fh:e="ENVMAP_BLENDING_ADD";break}return e}function Bf(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function zf(r,e,t,i){const s=r.getContext(),n=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Nf(t),c=Df(t),h=Of(t),u=Ff(t),d=Bf(t),p=t.isWebGL2?"":Ef(t),g=Af(t),v=wf(n),f=s.createProgram();let m,S,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(ys).join(`
`),m.length>0&&(m+=`
`),S=[p,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(ys).join(`
`),S.length>0&&(S+=`
`)):(m=[rl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ys).join(`
`),S=[p,rl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ri?"#define TONE_MAPPING":"",t.toneMapping!==Ri?Ie.tonemapping_pars_fragment:"",t.toneMapping!==Ri?Tf("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ie.colorspace_pars_fragment,bf("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ys).join(`
`)),a=na(a),a=il(a,t),a=sl(a,t),o=na(o),o=il(o,t),o=sl(o,t),a=nl(a),o=nl(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,S=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===bo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===bo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);const A=y+m+a,C=y+S+o,w=el(s,s.VERTEX_SHADER,A),R=el(s,s.FRAGMENT_SHADER,C);s.attachShader(f,w),s.attachShader(f,R),t.index0AttributeName!==void 0?s.bindAttribLocation(f,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(f,0,"position"),s.linkProgram(f);function G(k){if(r.debug.checkShaderErrors){const ee=s.getProgramInfoLog(f).trim(),P=s.getShaderInfoLog(w).trim(),F=s.getShaderInfoLog(R).trim();let V=!0,j=!0;if(s.getProgramParameter(f,s.LINK_STATUS)===!1)if(V=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(s,f,w,R);else{const X=tl(s,w,"vertex"),W=tl(s,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(f,s.VALIDATE_STATUS)+`

Program Info Log: `+ee+`
`+X+`
`+W)}else ee!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ee):(P===""||F==="")&&(j=!1);j&&(k.diagnostics={runnable:V,programLog:ee,vertexShader:{log:P,prefix:m},fragmentShader:{log:F,prefix:S}})}s.deleteShader(w),s.deleteShader(R),M=new Gn(s,f),E=Rf(s,f)}let M;this.getUniforms=function(){return M===void 0&&G(this),M};let E;this.getAttributes=function(){return E===void 0&&G(this),E};let H=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return H===!1&&(H=s.getProgramParameter(f,yf)),H},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(f),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=xf++,this.cacheKey=e,this.usedTimes=1,this.program=f,this.vertexShader=w,this.fragmentShader=R,this}let kf=0;class Hf{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),n=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(n)===!1&&(a.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Gf(e),t.set(e,i)),i}}class Gf{constructor(e){this.id=kf++,this.code=e,this.usedTimes=0}}function Vf(r,e,t,i,s,n,a){const o=new ga,l=new Hf,c=[],h=s.isWebGL2,u=s.logarithmicDepthBuffer,d=s.vertexTextures;let p=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(M){return M===0?"uv":`uv${M}`}function f(M,E,H,k,ee){const P=k.fog,F=ee.geometry,V=M.isMeshStandardMaterial?k.environment:null,j=(M.isMeshStandardMaterial?t:e).get(M.envMap||V),X=j&&j.mapping===Zn?j.image.height:null,W=g[M.type];M.precision!==null&&(p=s.getMaxPrecision(M.precision),p!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",p,"instead."));const Z=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,Q=Z!==void 0?Z.length:0;let oe=0;F.morphAttributes.position!==void 0&&(oe=1),F.morphAttributes.normal!==void 0&&(oe=2),F.morphAttributes.color!==void 0&&(oe=3);let z,q,ue,fe;if(W){const lt=Qt[W];z=lt.vertexShader,q=lt.fragmentShader}else z=M.vertexShader,q=M.fragmentShader,l.update(M),ue=l.getVertexShaderID(M),fe=l.getFragmentShaderID(M);const me=r.getRenderTarget(),Le=ee.isInstancedMesh===!0,Ce=ee.isBatchedMesh===!0,be=!!M.map,We=!!M.matcap,D=!!j,Et=!!M.aoMap,ve=!!M.lightMap,Ae=!!M.bumpMap,de=!!M.normalMap,nt=!!M.displacementMap,Ue=!!M.emissiveMap,T=!!M.metalnessMap,x=!!M.roughnessMap,N=M.anisotropy>0,$=M.clearcoat>0,K=M.iridescence>0,J=M.sheen>0,pe=M.transmission>0,re=N&&!!M.anisotropyMap,ce=$&&!!M.clearcoatMap,Se=$&&!!M.clearcoatNormalMap,Ne=$&&!!M.clearcoatRoughnessMap,Y=K&&!!M.iridescenceMap,Ke=K&&!!M.iridescenceThicknessMap,He=J&&!!M.sheenColorMap,Ee=J&&!!M.sheenRoughnessMap,_e=!!M.specularMap,he=!!M.specularColorMap,Pe=!!M.specularIntensityMap,Ye=pe&&!!M.transmissionMap,rt=pe&&!!M.thicknessMap,Be=!!M.gradientMap,te=!!M.alphaMap,L=M.alphaTest>0,ie=!!M.alphaHash,ae=!!M.extensions,we=!!F.attributes.uv1,ye=!!F.attributes.uv2,$e=!!F.attributes.uv3;let Qe=Ri;return M.toneMapped&&(me===null||me.isXRRenderTarget===!0)&&(Qe=r.toneMapping),{isWebGL2:h,shaderID:W,shaderType:M.type,shaderName:M.name,vertexShader:z,fragmentShader:q,defines:M.defines,customVertexShaderID:ue,customFragmentShaderID:fe,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:p,batching:Ce,instancing:Le,instancingColor:Le&&ee.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:me===null?r.outputColorSpace:me.isXRRenderTarget===!0?me.texture.colorSpace:_t,map:be,matcap:We,envMap:D,envMapMode:D&&j.mapping,envMapCubeUVHeight:X,aoMap:Et,lightMap:ve,bumpMap:Ae,normalMap:de,displacementMap:d&&nt,emissiveMap:Ue,normalMapObjectSpace:de&&M.normalMapType===Fh,normalMapTangentSpace:de&&M.normalMapType===ec,metalnessMap:T,roughnessMap:x,anisotropy:N,anisotropyMap:re,clearcoat:$,clearcoatMap:ce,clearcoatNormalMap:Se,clearcoatRoughnessMap:Ne,iridescence:K,iridescenceMap:Y,iridescenceThicknessMap:Ke,sheen:J,sheenColorMap:He,sheenRoughnessMap:Ee,specularMap:_e,specularColorMap:he,specularIntensityMap:Pe,transmission:pe,transmissionMap:Ye,thicknessMap:rt,gradientMap:Be,opaque:M.transparent===!1&&M.blending===xs,alphaMap:te,alphaTest:L,alphaHash:ie,combine:M.combine,mapUv:be&&v(M.map.channel),aoMapUv:Et&&v(M.aoMap.channel),lightMapUv:ve&&v(M.lightMap.channel),bumpMapUv:Ae&&v(M.bumpMap.channel),normalMapUv:de&&v(M.normalMap.channel),displacementMapUv:nt&&v(M.displacementMap.channel),emissiveMapUv:Ue&&v(M.emissiveMap.channel),metalnessMapUv:T&&v(M.metalnessMap.channel),roughnessMapUv:x&&v(M.roughnessMap.channel),anisotropyMapUv:re&&v(M.anisotropyMap.channel),clearcoatMapUv:ce&&v(M.clearcoatMap.channel),clearcoatNormalMapUv:Se&&v(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ne&&v(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Y&&v(M.iridescenceMap.channel),iridescenceThicknessMapUv:Ke&&v(M.iridescenceThicknessMap.channel),sheenColorMapUv:He&&v(M.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&v(M.sheenRoughnessMap.channel),specularMapUv:_e&&v(M.specularMap.channel),specularColorMapUv:he&&v(M.specularColorMap.channel),specularIntensityMapUv:Pe&&v(M.specularIntensityMap.channel),transmissionMapUv:Ye&&v(M.transmissionMap.channel),thicknessMapUv:rt&&v(M.thicknessMap.channel),alphaMapUv:te&&v(M.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(de||N),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,vertexUv1s:we,vertexUv2s:ye,vertexUv3s:$e,pointsUvs:ee.isPoints===!0&&!!F.attributes.uv&&(be||te),fog:!!P,useFog:M.fog===!0,fogExp2:P&&P.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:ee.isSkinnedMesh===!0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:oe,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:M.dithering,shadowMapEnabled:r.shadowMap.enabled&&H.length>0,shadowMapType:r.shadowMap.type,toneMapping:Qe,useLegacyLights:r._useLegacyLights,decodeVideoTexture:be&&M.map.isVideoTexture===!0&&qe.getTransfer(M.map.colorSpace)===tt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===ei,flipSided:M.side===It,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionDerivatives:ae&&M.extensions.derivatives===!0,extensionFragDepth:ae&&M.extensions.fragDepth===!0,extensionDrawBuffers:ae&&M.extensions.drawBuffers===!0,extensionShaderTextureLOD:ae&&M.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ae&&M.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()}}function m(M){const E=[];if(M.shaderID?E.push(M.shaderID):(E.push(M.customVertexShaderID),E.push(M.customFragmentShaderID)),M.defines!==void 0)for(const H in M.defines)E.push(H),E.push(M.defines[H]);return M.isRawShaderMaterial===!1&&(S(E,M),y(E,M),E.push(r.outputColorSpace)),E.push(M.customProgramCacheKey),E.join()}function S(M,E){M.push(E.precision),M.push(E.outputColorSpace),M.push(E.envMapMode),M.push(E.envMapCubeUVHeight),M.push(E.mapUv),M.push(E.alphaMapUv),M.push(E.lightMapUv),M.push(E.aoMapUv),M.push(E.bumpMapUv),M.push(E.normalMapUv),M.push(E.displacementMapUv),M.push(E.emissiveMapUv),M.push(E.metalnessMapUv),M.push(E.roughnessMapUv),M.push(E.anisotropyMapUv),M.push(E.clearcoatMapUv),M.push(E.clearcoatNormalMapUv),M.push(E.clearcoatRoughnessMapUv),M.push(E.iridescenceMapUv),M.push(E.iridescenceThicknessMapUv),M.push(E.sheenColorMapUv),M.push(E.sheenRoughnessMapUv),M.push(E.specularMapUv),M.push(E.specularColorMapUv),M.push(E.specularIntensityMapUv),M.push(E.transmissionMapUv),M.push(E.thicknessMapUv),M.push(E.combine),M.push(E.fogExp2),M.push(E.sizeAttenuation),M.push(E.morphTargetsCount),M.push(E.morphAttributeCount),M.push(E.numDirLights),M.push(E.numPointLights),M.push(E.numSpotLights),M.push(E.numSpotLightMaps),M.push(E.numHemiLights),M.push(E.numRectAreaLights),M.push(E.numDirLightShadows),M.push(E.numPointLightShadows),M.push(E.numSpotLightShadows),M.push(E.numSpotLightShadowsWithMaps),M.push(E.numLightProbes),M.push(E.shadowMapType),M.push(E.toneMapping),M.push(E.numClippingPlanes),M.push(E.numClipIntersection),M.push(E.depthPacking)}function y(M,E){o.disableAll(),E.isWebGL2&&o.enable(0),E.supportsVertexTextures&&o.enable(1),E.instancing&&o.enable(2),E.instancingColor&&o.enable(3),E.matcap&&o.enable(4),E.envMap&&o.enable(5),E.normalMapObjectSpace&&o.enable(6),E.normalMapTangentSpace&&o.enable(7),E.clearcoat&&o.enable(8),E.iridescence&&o.enable(9),E.alphaTest&&o.enable(10),E.vertexColors&&o.enable(11),E.vertexAlphas&&o.enable(12),E.vertexUv1s&&o.enable(13),E.vertexUv2s&&o.enable(14),E.vertexUv3s&&o.enable(15),E.vertexTangents&&o.enable(16),E.anisotropy&&o.enable(17),E.alphaHash&&o.enable(18),E.batching&&o.enable(19),M.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.skinning&&o.enable(4),E.morphTargets&&o.enable(5),E.morphNormals&&o.enable(6),E.morphColors&&o.enable(7),E.premultipliedAlpha&&o.enable(8),E.shadowMapEnabled&&o.enable(9),E.useLegacyLights&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),M.push(o.mask)}function A(M){const E=g[M.type];let H;if(E){const k=Qt[E];H=Tu.clone(k.uniforms)}else H=M.uniforms;return H}function C(M,E){let H;for(let k=0,ee=c.length;k<ee;k++){const P=c[k];if(P.cacheKey===E){H=P,++H.usedTimes;break}}return H===void 0&&(H=new zf(r,E,M,n),c.push(H)),H}function w(M){if(--M.usedTimes===0){const E=c.indexOf(M);c[E]=c[c.length-1],c.pop(),M.destroy()}}function R(M){l.remove(M)}function G(){l.dispose()}return{getParameters:f,getProgramCacheKey:m,getUniforms:A,acquireProgram:C,releaseProgram:w,releaseShaderCache:R,programs:c,dispose:G}}function Wf(){let r=new WeakMap;function e(n){let a=r.get(n);return a===void 0&&(a={},r.set(n,a)),a}function t(n){r.delete(n)}function i(n,a,o){r.get(n)[a]=o}function s(){r=new WeakMap}return{get:e,remove:t,update:i,dispose:s}}function Xf(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function al(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function ol(){const r=[];let e=0;const t=[],i=[],s=[];function n(){e=0,t.length=0,i.length=0,s.length=0}function a(u,d,p,g,v,f){let m=r[e];return m===void 0?(m={id:u.id,object:u,geometry:d,material:p,groupOrder:g,renderOrder:u.renderOrder,z:v,group:f},r[e]=m):(m.id=u.id,m.object=u,m.geometry=d,m.material=p,m.groupOrder=g,m.renderOrder=u.renderOrder,m.z=v,m.group=f),e++,m}function o(u,d,p,g,v,f){const m=a(u,d,p,g,v,f);p.transmission>0?i.push(m):p.transparent===!0?s.push(m):t.push(m)}function l(u,d,p,g,v,f){const m=a(u,d,p,g,v,f);p.transmission>0?i.unshift(m):p.transparent===!0?s.unshift(m):t.unshift(m)}function c(u,d){t.length>1&&t.sort(u||Xf),i.length>1&&i.sort(d||al),s.length>1&&s.sort(d||al)}function h(){for(let u=e,d=r.length;u<d;u++){const p=r[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:s,init:n,push:o,unshift:l,finish:h,sort:c}}function jf(){let r=new WeakMap;function e(i,s){const n=r.get(i);let a;return n===void 0?(a=new ol,r.set(i,[a])):s>=n.length?(a=new ol,n.push(a)):a=n[s],a}function t(){r=new WeakMap}return{get:e,dispose:t}}function qf(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new _,color:new xe};break;case"SpotLight":t={position:new _,direction:new _,color:new xe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new _,color:new xe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new _,skyColor:new xe,groundColor:new xe};break;case"RectAreaLight":t={color:new xe,position:new _,halfWidth:new _,halfHeight:new _};break}return r[e.id]=t,t}}}function Yf(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let Kf=0;function Jf(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function Zf(r,e){const t=new qf,i=Yf(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)s.probe.push(new _);const n=new _,a=new Fe,o=new Fe;function l(h,u){let d=0,p=0,g=0;for(let k=0;k<9;k++)s.probe[k].set(0,0,0);let v=0,f=0,m=0,S=0,y=0,A=0,C=0,w=0,R=0,G=0,M=0;h.sort(Jf);const E=u===!0?Math.PI:1;for(let k=0,ee=h.length;k<ee;k++){const P=h[k],F=P.color,V=P.intensity,j=P.distance,X=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)d+=F.r*V*E,p+=F.g*V*E,g+=F.b*V*E;else if(P.isLightProbe){for(let W=0;W<9;W++)s.probe[W].addScaledVector(P.sh.coefficients[W],V);M++}else if(P.isDirectionalLight){const W=t.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity*E),P.castShadow){const Z=P.shadow,Q=i.get(P);Q.shadowBias=Z.bias,Q.shadowNormalBias=Z.normalBias,Q.shadowRadius=Z.radius,Q.shadowMapSize=Z.mapSize,s.directionalShadow[v]=Q,s.directionalShadowMap[v]=X,s.directionalShadowMatrix[v]=P.shadow.matrix,A++}s.directional[v]=W,v++}else if(P.isSpotLight){const W=t.get(P);W.position.setFromMatrixPosition(P.matrixWorld),W.color.copy(F).multiplyScalar(V*E),W.distance=j,W.coneCos=Math.cos(P.angle),W.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),W.decay=P.decay,s.spot[m]=W;const Z=P.shadow;if(P.map&&(s.spotLightMap[R]=P.map,R++,Z.updateMatrices(P),P.castShadow&&G++),s.spotLightMatrix[m]=Z.matrix,P.castShadow){const Q=i.get(P);Q.shadowBias=Z.bias,Q.shadowNormalBias=Z.normalBias,Q.shadowRadius=Z.radius,Q.shadowMapSize=Z.mapSize,s.spotShadow[m]=Q,s.spotShadowMap[m]=X,w++}m++}else if(P.isRectAreaLight){const W=t.get(P);W.color.copy(F).multiplyScalar(V),W.halfWidth.set(P.width*.5,0,0),W.halfHeight.set(0,P.height*.5,0),s.rectArea[S]=W,S++}else if(P.isPointLight){const W=t.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity*E),W.distance=P.distance,W.decay=P.decay,P.castShadow){const Z=P.shadow,Q=i.get(P);Q.shadowBias=Z.bias,Q.shadowNormalBias=Z.normalBias,Q.shadowRadius=Z.radius,Q.shadowMapSize=Z.mapSize,Q.shadowCameraNear=Z.camera.near,Q.shadowCameraFar=Z.camera.far,s.pointShadow[f]=Q,s.pointShadowMap[f]=X,s.pointShadowMatrix[f]=P.shadow.matrix,C++}s.point[f]=W,f++}else if(P.isHemisphereLight){const W=t.get(P);W.skyColor.copy(P.color).multiplyScalar(V*E),W.groundColor.copy(P.groundColor).multiplyScalar(V*E),s.hemi[y]=W,y++}}S>0&&(e.isWebGL2?r.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=se.LTC_FLOAT_1,s.rectAreaLTC2=se.LTC_FLOAT_2):(s.rectAreaLTC1=se.LTC_HALF_1,s.rectAreaLTC2=se.LTC_HALF_2):r.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=se.LTC_FLOAT_1,s.rectAreaLTC2=se.LTC_FLOAT_2):r.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=se.LTC_HALF_1,s.rectAreaLTC2=se.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=d,s.ambient[1]=p,s.ambient[2]=g;const H=s.hash;(H.directionalLength!==v||H.pointLength!==f||H.spotLength!==m||H.rectAreaLength!==S||H.hemiLength!==y||H.numDirectionalShadows!==A||H.numPointShadows!==C||H.numSpotShadows!==w||H.numSpotMaps!==R||H.numLightProbes!==M)&&(s.directional.length=v,s.spot.length=m,s.rectArea.length=S,s.point.length=f,s.hemi.length=y,s.directionalShadow.length=A,s.directionalShadowMap.length=A,s.pointShadow.length=C,s.pointShadowMap.length=C,s.spotShadow.length=w,s.spotShadowMap.length=w,s.directionalShadowMatrix.length=A,s.pointShadowMatrix.length=C,s.spotLightMatrix.length=w+R-G,s.spotLightMap.length=R,s.numSpotLightShadowsWithMaps=G,s.numLightProbes=M,H.directionalLength=v,H.pointLength=f,H.spotLength=m,H.rectAreaLength=S,H.hemiLength=y,H.numDirectionalShadows=A,H.numPointShadows=C,H.numSpotShadows=w,H.numSpotMaps=R,H.numLightProbes=M,s.version=Kf++)}function c(h,u){let d=0,p=0,g=0,v=0,f=0;const m=u.matrixWorldInverse;for(let S=0,y=h.length;S<y;S++){const A=h[S];if(A.isDirectionalLight){const C=s.directional[d];C.direction.setFromMatrixPosition(A.matrixWorld),n.setFromMatrixPosition(A.target.matrixWorld),C.direction.sub(n),C.direction.transformDirection(m),d++}else if(A.isSpotLight){const C=s.spot[g];C.position.setFromMatrixPosition(A.matrixWorld),C.position.applyMatrix4(m),C.direction.setFromMatrixPosition(A.matrixWorld),n.setFromMatrixPosition(A.target.matrixWorld),C.direction.sub(n),C.direction.transformDirection(m),g++}else if(A.isRectAreaLight){const C=s.rectArea[v];C.position.setFromMatrixPosition(A.matrixWorld),C.position.applyMatrix4(m),o.identity(),a.copy(A.matrixWorld),a.premultiply(m),o.extractRotation(a),C.halfWidth.set(A.width*.5,0,0),C.halfHeight.set(0,A.height*.5,0),C.halfWidth.applyMatrix4(o),C.halfHeight.applyMatrix4(o),v++}else if(A.isPointLight){const C=s.point[p];C.position.setFromMatrixPosition(A.matrixWorld),C.position.applyMatrix4(m),p++}else if(A.isHemisphereLight){const C=s.hemi[f];C.direction.setFromMatrixPosition(A.matrixWorld),C.direction.transformDirection(m),f++}}}return{setup:l,setupView:c,state:s}}function ll(r,e){const t=new Zf(r,e),i=[],s=[];function n(){i.length=0,s.length=0}function a(h){i.push(h)}function o(h){s.push(h)}function l(h){t.setup(i,h)}function c(h){t.setupView(i,h)}return{init:n,state:{lightsArray:i,shadowsArray:s,lights:t},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function $f(r,e){let t=new WeakMap;function i(n,a=0){const o=t.get(n);let l;return o===void 0?(l=new ll(r,e),t.set(n,[l])):a>=o.length?(l=new ll(r,e),o.push(l)):l=o[a],l}function s(){t=new WeakMap}return{get:i,dispose:s}}class Qf extends ii{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Dh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class eg extends ii{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const tg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ig=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function sg(r,e,t){let i=new _a;const s=new le,n=new le,a=new Ze,o=new Qf({depthPacking:Oh}),l=new eg,c={},h=t.maxTextureSize,u={[gi]:It,[It]:gi,[ei]:ei},d=new Ki({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new le},radius:{value:4}},vertexShader:tg,fragmentShader:ig}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const g=new vt;g.setAttribute("position",new Tt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Xe(g,d),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=kl;let m=this.type;this.render=function(w,R,G){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||w.length===0)return;const M=r.getRenderTarget(),E=r.getActiveCubeFace(),H=r.getActiveMipmapLevel(),k=r.state;k.setBlending(wi),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const ee=m!==pi&&this.type===pi,P=m===pi&&this.type!==pi;for(let F=0,V=w.length;F<V;F++){const j=w[F],X=j.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;s.copy(X.mapSize);const W=X.getFrameExtents();if(s.multiply(W),n.copy(X.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(n.x=Math.floor(h/W.x),s.x=n.x*W.x,X.mapSize.x=n.x),s.y>h&&(n.y=Math.floor(h/W.y),s.y=n.y*W.y,X.mapSize.y=n.y)),X.map===null||ee===!0||P===!0){const Q=this.type!==pi?{minFilter:gt,magFilter:gt}:{};X.map!==null&&X.map.dispose(),X.map=new Yi(s.x,s.y,Q),X.map.texture.name=j.name+".shadowMap",X.camera.updateProjectionMatrix()}r.setRenderTarget(X.map),r.clear();const Z=X.getViewportCount();for(let Q=0;Q<Z;Q++){const oe=X.getViewport(Q);a.set(n.x*oe.x,n.y*oe.y,n.x*oe.z,n.y*oe.w),k.viewport(a),X.updateMatrices(j,Q),i=X.getFrustum(),A(R,G,X.camera,j,this.type)}X.isPointLightShadow!==!0&&this.type===pi&&S(X,G),X.needsUpdate=!1}m=this.type,f.needsUpdate=!1,r.setRenderTarget(M,E,H)};function S(w,R){const G=e.update(v);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Yi(s.x,s.y)),d.uniforms.shadow_pass.value=w.map.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,r.setRenderTarget(w.mapPass),r.clear(),r.renderBufferDirect(R,null,G,d,v,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,r.setRenderTarget(w.map),r.clear(),r.renderBufferDirect(R,null,G,p,v,null)}function y(w,R,G,M){let E=null;const H=G.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(H!==void 0)E=H;else if(E=G.isPointLight===!0?l:o,r.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const k=E.uuid,ee=R.uuid;let P=c[k];P===void 0&&(P={},c[k]=P);let F=P[ee];F===void 0&&(F=E.clone(),P[ee]=F,R.addEventListener("dispose",C)),E=F}if(E.visible=R.visible,E.wireframe=R.wireframe,M===pi?E.side=R.shadowSide!==null?R.shadowSide:R.side:E.side=R.shadowSide!==null?R.shadowSide:u[R.side],E.alphaMap=R.alphaMap,E.alphaTest=R.alphaTest,E.map=R.map,E.clipShadows=R.clipShadows,E.clippingPlanes=R.clippingPlanes,E.clipIntersection=R.clipIntersection,E.displacementMap=R.displacementMap,E.displacementScale=R.displacementScale,E.displacementBias=R.displacementBias,E.wireframeLinewidth=R.wireframeLinewidth,E.linewidth=R.linewidth,G.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const k=r.properties.get(E);k.light=G}return E}function A(w,R,G,M,E){if(w.visible===!1)return;if(w.layers.test(R.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&E===pi)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,w.matrixWorld);const k=e.update(w),ee=w.material;if(Array.isArray(ee)){const P=k.groups;for(let F=0,V=P.length;F<V;F++){const j=P[F],X=ee[j.materialIndex];if(X&&X.visible){const W=y(w,X,M,E);w.onBeforeShadow(r,w,R,G,k,W,j),r.renderBufferDirect(G,null,k,W,w,j),w.onAfterShadow(r,w,R,G,k,W,j)}}}else if(ee.visible){const P=y(w,ee,M,E);w.onBeforeShadow(r,w,R,G,k,P,null),r.renderBufferDirect(G,null,k,P,w,null),w.onAfterShadow(r,w,R,G,k,P,null)}}const H=w.children;for(let k=0,ee=H.length;k<ee;k++)A(H[k],R,G,M,E)}function C(w){w.target.removeEventListener("dispose",C);for(const R in c){const G=c[R],M=w.target.uuid;M in G&&(G[M].dispose(),delete G[M])}}}function ng(r,e,t){const i=t.isWebGL2;function s(){let L=!1;const ie=new Ze;let ae=null;const we=new Ze(0,0,0,0);return{setMask:function(ye){ae!==ye&&!L&&(r.colorMask(ye,ye,ye,ye),ae=ye)},setLocked:function(ye){L=ye},setClear:function(ye,$e,Qe,lt,Ft){Ft===!0&&(ye*=lt,$e*=lt,Qe*=lt),ie.set(ye,$e,Qe,lt),we.equals(ie)===!1&&(r.clearColor(ye,$e,Qe,lt),we.copy(ie))},reset:function(){L=!1,ae=null,we.set(-1,0,0,0)}}}function n(){let L=!1,ie=null,ae=null,we=null;return{setTest:function(ye){ye?Ce(r.DEPTH_TEST):be(r.DEPTH_TEST)},setMask:function(ye){ie!==ye&&!L&&(r.depthMask(ye),ie=ye)},setFunc:function(ye){if(ae!==ye){switch(ye){case oh:r.depthFunc(r.NEVER);break;case lh:r.depthFunc(r.ALWAYS);break;case ch:r.depthFunc(r.LESS);break;case Vn:r.depthFunc(r.LEQUAL);break;case hh:r.depthFunc(r.EQUAL);break;case uh:r.depthFunc(r.GEQUAL);break;case dh:r.depthFunc(r.GREATER);break;case ph:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}ae=ye}},setLocked:function(ye){L=ye},setClear:function(ye){we!==ye&&(r.clearDepth(ye),we=ye)},reset:function(){L=!1,ie=null,ae=null,we=null}}}function a(){let L=!1,ie=null,ae=null,we=null,ye=null,$e=null,Qe=null,lt=null,Ft=null;return{setTest:function(et){L||(et?Ce(r.STENCIL_TEST):be(r.STENCIL_TEST))},setMask:function(et){ie!==et&&!L&&(r.stencilMask(et),ie=et)},setFunc:function(et,At,$t){(ae!==et||we!==At||ye!==$t)&&(r.stencilFunc(et,At,$t),ae=et,we=At,ye=$t)},setOp:function(et,At,$t){($e!==et||Qe!==At||lt!==$t)&&(r.stencilOp(et,At,$t),$e=et,Qe=At,lt=$t)},setLocked:function(et){L=et},setClear:function(et){Ft!==et&&(r.clearStencil(et),Ft=et)},reset:function(){L=!1,ie=null,ae=null,we=null,ye=null,$e=null,Qe=null,lt=null,Ft=null}}}const o=new s,l=new n,c=new a,h=new WeakMap,u=new WeakMap;let d={},p={},g=new WeakMap,v=[],f=null,m=!1,S=null,y=null,A=null,C=null,w=null,R=null,G=null,M=new xe(0,0,0),E=0,H=!1,k=null,ee=null,P=null,F=null,V=null;const j=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,W=0;const Z=r.getParameter(r.VERSION);Z.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(Z)[1]),X=W>=1):Z.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),X=W>=2);let Q=null,oe={};const z=r.getParameter(r.SCISSOR_BOX),q=r.getParameter(r.VIEWPORT),ue=new Ze().fromArray(z),fe=new Ze().fromArray(q);function me(L,ie,ae,we){const ye=new Uint8Array(4),$e=r.createTexture();r.bindTexture(L,$e),r.texParameteri(L,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(L,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Qe=0;Qe<ae;Qe++)i&&(L===r.TEXTURE_3D||L===r.TEXTURE_2D_ARRAY)?r.texImage3D(ie,0,r.RGBA,1,1,we,0,r.RGBA,r.UNSIGNED_BYTE,ye):r.texImage2D(ie+Qe,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,ye);return $e}const Le={};Le[r.TEXTURE_2D]=me(r.TEXTURE_2D,r.TEXTURE_2D,1),Le[r.TEXTURE_CUBE_MAP]=me(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(Le[r.TEXTURE_2D_ARRAY]=me(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Le[r.TEXTURE_3D]=me(r.TEXTURE_3D,r.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Ce(r.DEPTH_TEST),l.setFunc(Vn),Ue(!1),T(Va),Ce(r.CULL_FACE),de(wi);function Ce(L){d[L]!==!0&&(r.enable(L),d[L]=!0)}function be(L){d[L]!==!1&&(r.disable(L),d[L]=!1)}function We(L,ie){return p[L]!==ie?(r.bindFramebuffer(L,ie),p[L]=ie,i&&(L===r.DRAW_FRAMEBUFFER&&(p[r.FRAMEBUFFER]=ie),L===r.FRAMEBUFFER&&(p[r.DRAW_FRAMEBUFFER]=ie)),!0):!1}function D(L,ie){let ae=v,we=!1;if(L)if(ae=g.get(ie),ae===void 0&&(ae=[],g.set(ie,ae)),L.isWebGLMultipleRenderTargets){const ye=L.texture;if(ae.length!==ye.length||ae[0]!==r.COLOR_ATTACHMENT0){for(let $e=0,Qe=ye.length;$e<Qe;$e++)ae[$e]=r.COLOR_ATTACHMENT0+$e;ae.length=ye.length,we=!0}}else ae[0]!==r.COLOR_ATTACHMENT0&&(ae[0]=r.COLOR_ATTACHMENT0,we=!0);else ae[0]!==r.BACK&&(ae[0]=r.BACK,we=!0);we&&(t.isWebGL2?r.drawBuffers(ae):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ae))}function Et(L){return f!==L?(r.useProgram(L),f=L,!0):!1}const ve={[Hi]:r.FUNC_ADD,[jc]:r.FUNC_SUBTRACT,[qc]:r.FUNC_REVERSE_SUBTRACT};if(i)ve[qa]=r.MIN,ve[Ya]=r.MAX;else{const L=e.get("EXT_blend_minmax");L!==null&&(ve[qa]=L.MIN_EXT,ve[Ya]=L.MAX_EXT)}const Ae={[Yc]:r.ZERO,[Kc]:r.ONE,[Jc]:r.SRC_COLOR,[Yr]:r.SRC_ALPHA,[ih]:r.SRC_ALPHA_SATURATE,[eh]:r.DST_COLOR,[$c]:r.DST_ALPHA,[Zc]:r.ONE_MINUS_SRC_COLOR,[Kr]:r.ONE_MINUS_SRC_ALPHA,[th]:r.ONE_MINUS_DST_COLOR,[Qc]:r.ONE_MINUS_DST_ALPHA,[sh]:r.CONSTANT_COLOR,[nh]:r.ONE_MINUS_CONSTANT_COLOR,[rh]:r.CONSTANT_ALPHA,[ah]:r.ONE_MINUS_CONSTANT_ALPHA};function de(L,ie,ae,we,ye,$e,Qe,lt,Ft,et){if(L===wi){m===!0&&(be(r.BLEND),m=!1);return}if(m===!1&&(Ce(r.BLEND),m=!0),L!==Xc){if(L!==S||et!==H){if((y!==Hi||w!==Hi)&&(r.blendEquation(r.FUNC_ADD),y=Hi,w=Hi),et)switch(L){case xs:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Wa:r.blendFunc(r.ONE,r.ONE);break;case Xa:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case ja:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case xs:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Wa:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Xa:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case ja:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}A=null,C=null,R=null,G=null,M.set(0,0,0),E=0,S=L,H=et}return}ye=ye||ie,$e=$e||ae,Qe=Qe||we,(ie!==y||ye!==w)&&(r.blendEquationSeparate(ve[ie],ve[ye]),y=ie,w=ye),(ae!==A||we!==C||$e!==R||Qe!==G)&&(r.blendFuncSeparate(Ae[ae],Ae[we],Ae[$e],Ae[Qe]),A=ae,C=we,R=$e,G=Qe),(lt.equals(M)===!1||Ft!==E)&&(r.blendColor(lt.r,lt.g,lt.b,Ft),M.copy(lt),E=Ft),S=L,H=!1}function nt(L,ie){L.side===ei?be(r.CULL_FACE):Ce(r.CULL_FACE);let ae=L.side===It;ie&&(ae=!ae),Ue(ae),L.blending===xs&&L.transparent===!1?de(wi):de(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),l.setFunc(L.depthFunc),l.setTest(L.depthTest),l.setMask(L.depthWrite),o.setMask(L.colorWrite);const we=L.stencilWrite;c.setTest(we),we&&(c.setMask(L.stencilWriteMask),c.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),c.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),N(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?Ce(r.SAMPLE_ALPHA_TO_COVERAGE):be(r.SAMPLE_ALPHA_TO_COVERAGE)}function Ue(L){k!==L&&(L?r.frontFace(r.CW):r.frontFace(r.CCW),k=L)}function T(L){L!==Vc?(Ce(r.CULL_FACE),L!==ee&&(L===Va?r.cullFace(r.BACK):L===Wc?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):be(r.CULL_FACE),ee=L}function x(L){L!==P&&(X&&r.lineWidth(L),P=L)}function N(L,ie,ae){L?(Ce(r.POLYGON_OFFSET_FILL),(F!==ie||V!==ae)&&(r.polygonOffset(ie,ae),F=ie,V=ae)):be(r.POLYGON_OFFSET_FILL)}function $(L){L?Ce(r.SCISSOR_TEST):be(r.SCISSOR_TEST)}function K(L){L===void 0&&(L=r.TEXTURE0+j-1),Q!==L&&(r.activeTexture(L),Q=L)}function J(L,ie,ae){ae===void 0&&(Q===null?ae=r.TEXTURE0+j-1:ae=Q);let we=oe[ae];we===void 0&&(we={type:void 0,texture:void 0},oe[ae]=we),(we.type!==L||we.texture!==ie)&&(Q!==ae&&(r.activeTexture(ae),Q=ae),r.bindTexture(L,ie||Le[L]),we.type=L,we.texture=ie)}function pe(){const L=oe[Q];L!==void 0&&L.type!==void 0&&(r.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function re(){try{r.compressedTexImage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ce(){try{r.compressedTexImage3D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Se(){try{r.texSubImage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ne(){try{r.texSubImage3D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Y(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ke(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function He(){try{r.texStorage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ee(){try{r.texStorage3D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function _e(){try{r.texImage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function he(){try{r.texImage3D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Pe(L){ue.equals(L)===!1&&(r.scissor(L.x,L.y,L.z,L.w),ue.copy(L))}function Ye(L){fe.equals(L)===!1&&(r.viewport(L.x,L.y,L.z,L.w),fe.copy(L))}function rt(L,ie){let ae=u.get(ie);ae===void 0&&(ae=new WeakMap,u.set(ie,ae));let we=ae.get(L);we===void 0&&(we=r.getUniformBlockIndex(ie,L.name),ae.set(L,we))}function Be(L,ie){const ae=u.get(ie).get(L);h.get(ie)!==ae&&(r.uniformBlockBinding(ie,ae,L.__bindingPointIndex),h.set(ie,ae))}function te(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),i===!0&&(r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null)),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),d={},Q=null,oe={},p={},g=new WeakMap,v=[],f=null,m=!1,S=null,y=null,A=null,C=null,w=null,R=null,G=null,M=new xe(0,0,0),E=0,H=!1,k=null,ee=null,P=null,F=null,V=null,ue.set(0,0,r.canvas.width,r.canvas.height),fe.set(0,0,r.canvas.width,r.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:Ce,disable:be,bindFramebuffer:We,drawBuffers:D,useProgram:Et,setBlending:de,setMaterial:nt,setFlipSided:Ue,setCullFace:T,setLineWidth:x,setPolygonOffset:N,setScissorTest:$,activeTexture:K,bindTexture:J,unbindTexture:pe,compressedTexImage2D:re,compressedTexImage3D:ce,texImage2D:_e,texImage3D:he,updateUBOMapping:rt,uniformBlockBinding:Be,texStorage2D:He,texStorage3D:Ee,texSubImage2D:Se,texSubImage3D:Ne,compressedTexSubImage2D:Y,compressedTexSubImage3D:Ke,scissor:Pe,viewport:Ye,reset:te}}function rg(r,e,t,i,s,n,a){const o=s.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let u;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,x){return p?new OffscreenCanvas(T,x):Qs("canvas")}function v(T,x,N,$){let K=1;if((T.width>$||T.height>$)&&(K=$/Math.max(T.width,T.height)),K<1||x===!0)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap){const J=x?Jn:Math.floor,pe=J(K*T.width),re=J(K*T.height);u===void 0&&(u=g(pe,re));const ce=N?g(pe,re):u;return ce.width=pe,ce.height=re,ce.getContext("2d").drawImage(T,0,0,pe,re),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+T.width+"x"+T.height+") to ("+pe+"x"+re+")."),ce}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+T.width+"x"+T.height+")."),T;return T}function f(T){return sa(T.width)&&sa(T.height)}function m(T){return o?!1:T.wrapS!==Vt||T.wrapT!==Vt||T.minFilter!==gt&&T.minFilter!==Pt}function S(T,x){return T.generateMipmaps&&x&&T.minFilter!==gt&&T.minFilter!==Pt}function y(T){r.generateMipmap(T)}function A(T,x,N,$,K=!1){if(o===!1)return x;if(T!==null){if(r[T]!==void 0)return r[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let J=x;if(x===r.RED&&(N===r.FLOAT&&(J=r.R32F),N===r.HALF_FLOAT&&(J=r.R16F),N===r.UNSIGNED_BYTE&&(J=r.R8)),x===r.RED_INTEGER&&(N===r.UNSIGNED_BYTE&&(J=r.R8UI),N===r.UNSIGNED_SHORT&&(J=r.R16UI),N===r.UNSIGNED_INT&&(J=r.R32UI),N===r.BYTE&&(J=r.R8I),N===r.SHORT&&(J=r.R16I),N===r.INT&&(J=r.R32I)),x===r.RG&&(N===r.FLOAT&&(J=r.RG32F),N===r.HALF_FLOAT&&(J=r.RG16F),N===r.UNSIGNED_BYTE&&(J=r.RG8)),x===r.RGBA){const pe=K?jn:qe.getTransfer($);N===r.FLOAT&&(J=r.RGBA32F),N===r.HALF_FLOAT&&(J=r.RGBA16F),N===r.UNSIGNED_BYTE&&(J=pe===tt?r.SRGB8_ALPHA8:r.RGBA8),N===r.UNSIGNED_SHORT_4_4_4_4&&(J=r.RGBA4),N===r.UNSIGNED_SHORT_5_5_5_1&&(J=r.RGB5_A1)}return(J===r.R16F||J===r.R32F||J===r.RG16F||J===r.RG32F||J===r.RGBA16F||J===r.RGBA32F)&&e.get("EXT_color_buffer_float"),J}function C(T,x,N){return S(T,N)===!0||T.isFramebufferTexture&&T.minFilter!==gt&&T.minFilter!==Pt?Math.log2(Math.max(x.width,x.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?x.mipmaps.length:1}function w(T){return T===gt||T===$r||T===Hn?r.NEAREST:r.LINEAR}function R(T){const x=T.target;x.removeEventListener("dispose",R),M(x),x.isVideoTexture&&h.delete(x)}function G(T){const x=T.target;x.removeEventListener("dispose",G),H(x)}function M(T){const x=i.get(T);if(x.__webglInit===void 0)return;const N=T.source,$=d.get(N);if($){const K=$[x.__cacheKey];K.usedTimes--,K.usedTimes===0&&E(T),Object.keys($).length===0&&d.delete(N)}i.remove(T)}function E(T){const x=i.get(T);r.deleteTexture(x.__webglTexture);const N=T.source,$=d.get(N);delete $[x.__cacheKey],a.memory.textures--}function H(T){const x=T.texture,N=i.get(T),$=i.get(x);if($.__webglTexture!==void 0&&(r.deleteTexture($.__webglTexture),a.memory.textures--),T.depthTexture&&T.depthTexture.dispose(),T.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(N.__webglFramebuffer[K]))for(let J=0;J<N.__webglFramebuffer[K].length;J++)r.deleteFramebuffer(N.__webglFramebuffer[K][J]);else r.deleteFramebuffer(N.__webglFramebuffer[K]);N.__webglDepthbuffer&&r.deleteRenderbuffer(N.__webglDepthbuffer[K])}else{if(Array.isArray(N.__webglFramebuffer))for(let K=0;K<N.__webglFramebuffer.length;K++)r.deleteFramebuffer(N.__webglFramebuffer[K]);else r.deleteFramebuffer(N.__webglFramebuffer);if(N.__webglDepthbuffer&&r.deleteRenderbuffer(N.__webglDepthbuffer),N.__webglMultisampledFramebuffer&&r.deleteFramebuffer(N.__webglMultisampledFramebuffer),N.__webglColorRenderbuffer)for(let K=0;K<N.__webglColorRenderbuffer.length;K++)N.__webglColorRenderbuffer[K]&&r.deleteRenderbuffer(N.__webglColorRenderbuffer[K]);N.__webglDepthRenderbuffer&&r.deleteRenderbuffer(N.__webglDepthRenderbuffer)}if(T.isWebGLMultipleRenderTargets)for(let K=0,J=x.length;K<J;K++){const pe=i.get(x[K]);pe.__webglTexture&&(r.deleteTexture(pe.__webglTexture),a.memory.textures--),i.remove(x[K])}i.remove(x),i.remove(T)}let k=0;function ee(){k=0}function P(){const T=k;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),k+=1,T}function F(T){const x=[];return x.push(T.wrapS),x.push(T.wrapT),x.push(T.wrapR||0),x.push(T.magFilter),x.push(T.minFilter),x.push(T.anisotropy),x.push(T.internalFormat),x.push(T.format),x.push(T.type),x.push(T.generateMipmaps),x.push(T.premultiplyAlpha),x.push(T.flipY),x.push(T.unpackAlignment),x.push(T.colorSpace),x.join()}function V(T,x){const N=i.get(T);if(T.isVideoTexture&&nt(T),T.isRenderTargetTexture===!1&&T.version>0&&N.__version!==T.version){const $=T.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ue(N,T,x);return}}t.bindTexture(r.TEXTURE_2D,N.__webglTexture,r.TEXTURE0+x)}function j(T,x){const N=i.get(T);if(T.version>0&&N.__version!==T.version){ue(N,T,x);return}t.bindTexture(r.TEXTURE_2D_ARRAY,N.__webglTexture,r.TEXTURE0+x)}function X(T,x){const N=i.get(T);if(T.version>0&&N.__version!==T.version){ue(N,T,x);return}t.bindTexture(r.TEXTURE_3D,N.__webglTexture,r.TEXTURE0+x)}function W(T,x){const N=i.get(T);if(T.version>0&&N.__version!==T.version){fe(N,T,x);return}t.bindTexture(r.TEXTURE_CUBE_MAP,N.__webglTexture,r.TEXTURE0+x)}const Z={[ji]:r.REPEAT,[Vt]:r.CLAMP_TO_EDGE,[Wn]:r.MIRRORED_REPEAT},Q={[gt]:r.NEAREST,[$r]:r.NEAREST_MIPMAP_NEAREST,[Hn]:r.NEAREST_MIPMAP_LINEAR,[Pt]:r.LINEAR,[Wl]:r.LINEAR_MIPMAP_NEAREST,[qi]:r.LINEAR_MIPMAP_LINEAR},oe={[Bh]:r.NEVER,[Wh]:r.ALWAYS,[zh]:r.LESS,[tc]:r.LEQUAL,[kh]:r.EQUAL,[Vh]:r.GEQUAL,[Hh]:r.GREATER,[Gh]:r.NOTEQUAL};function z(T,x,N){if(N?(r.texParameteri(T,r.TEXTURE_WRAP_S,Z[x.wrapS]),r.texParameteri(T,r.TEXTURE_WRAP_T,Z[x.wrapT]),(T===r.TEXTURE_3D||T===r.TEXTURE_2D_ARRAY)&&r.texParameteri(T,r.TEXTURE_WRAP_R,Z[x.wrapR]),r.texParameteri(T,r.TEXTURE_MAG_FILTER,Q[x.magFilter]),r.texParameteri(T,r.TEXTURE_MIN_FILTER,Q[x.minFilter])):(r.texParameteri(T,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(T,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),(T===r.TEXTURE_3D||T===r.TEXTURE_2D_ARRAY)&&r.texParameteri(T,r.TEXTURE_WRAP_R,r.CLAMP_TO_EDGE),(x.wrapS!==Vt||x.wrapT!==Vt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),r.texParameteri(T,r.TEXTURE_MAG_FILTER,w(x.magFilter)),r.texParameteri(T,r.TEXTURE_MIN_FILTER,w(x.minFilter)),x.minFilter!==gt&&x.minFilter!==Pt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),x.compareFunction&&(r.texParameteri(T,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(T,r.TEXTURE_COMPARE_FUNC,oe[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const $=e.get("EXT_texture_filter_anisotropic");if(x.magFilter===gt||x.minFilter!==Hn&&x.minFilter!==qi||x.type===mi&&e.has("OES_texture_float_linear")===!1||o===!1&&x.type===Zs&&e.has("OES_texture_half_float_linear")===!1)return;(x.anisotropy>1||i.get(x).__currentAnisotropy)&&(r.texParameterf(T,$.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy)}}function q(T,x){let N=!1;T.__webglInit===void 0&&(T.__webglInit=!0,x.addEventListener("dispose",R));const $=x.source;let K=d.get($);K===void 0&&(K={},d.set($,K));const J=F(x);if(J!==T.__cacheKey){K[J]===void 0&&(K[J]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,N=!0),K[J].usedTimes++;const pe=K[T.__cacheKey];pe!==void 0&&(K[T.__cacheKey].usedTimes--,pe.usedTimes===0&&E(x)),T.__cacheKey=J,T.__webglTexture=K[J].texture}return N}function ue(T,x,N){let $=r.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&($=r.TEXTURE_2D_ARRAY),x.isData3DTexture&&($=r.TEXTURE_3D);const K=q(T,x),J=x.source;t.bindTexture($,T.__webglTexture,r.TEXTURE0+N);const pe=i.get(J);if(J.version!==pe.__version||K===!0){t.activeTexture(r.TEXTURE0+N);const re=qe.getPrimaries(qe.workingColorSpace),ce=x.colorSpace===Xt?null:qe.getPrimaries(x.colorSpace),Se=x.colorSpace===Xt||re===ce?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,x.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,x.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se);const Ne=m(x)&&f(x.image)===!1;let Y=v(x.image,Ne,!1,s.maxTextureSize);Y=Ue(x,Y);const Ke=f(Y)||o,He=n.convert(x.format,x.colorSpace);let Ee=n.convert(x.type),_e=A(x.internalFormat,He,Ee,x.colorSpace,x.isVideoTexture);z($,x,Ke);let he;const Pe=x.mipmaps,Ye=o&&x.isVideoTexture!==!0&&_e!==Zl,rt=pe.__version===void 0||K===!0,Be=C(x,Y,Ke);if(x.isDepthTexture)_e=r.DEPTH_COMPONENT,o?x.type===mi?_e=r.DEPTH_COMPONENT32F:x.type===Ei?_e=r.DEPTH_COMPONENT24:x.type===Vi?_e=r.DEPTH24_STENCIL8:_e=r.DEPTH_COMPONENT16:x.type===mi&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),x.format===Wi&&_e===r.DEPTH_COMPONENT&&x.type!==da&&x.type!==Ei&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),x.type=Ei,Ee=n.convert(x.type)),x.format===As&&_e===r.DEPTH_COMPONENT&&(_e=r.DEPTH_STENCIL,x.type!==Vi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),x.type=Vi,Ee=n.convert(x.type))),rt&&(Ye?t.texStorage2D(r.TEXTURE_2D,1,_e,Y.width,Y.height):t.texImage2D(r.TEXTURE_2D,0,_e,Y.width,Y.height,0,He,Ee,null));else if(x.isDataTexture)if(Pe.length>0&&Ke){Ye&&rt&&t.texStorage2D(r.TEXTURE_2D,Be,_e,Pe[0].width,Pe[0].height);for(let te=0,L=Pe.length;te<L;te++)he=Pe[te],Ye?t.texSubImage2D(r.TEXTURE_2D,te,0,0,he.width,he.height,He,Ee,he.data):t.texImage2D(r.TEXTURE_2D,te,_e,he.width,he.height,0,He,Ee,he.data);x.generateMipmaps=!1}else Ye?(rt&&t.texStorage2D(r.TEXTURE_2D,Be,_e,Y.width,Y.height),t.texSubImage2D(r.TEXTURE_2D,0,0,0,Y.width,Y.height,He,Ee,Y.data)):t.texImage2D(r.TEXTURE_2D,0,_e,Y.width,Y.height,0,He,Ee,Y.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Ye&&rt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Be,_e,Pe[0].width,Pe[0].height,Y.depth);for(let te=0,L=Pe.length;te<L;te++)he=Pe[te],x.format!==Wt?He!==null?Ye?t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,te,0,0,0,he.width,he.height,Y.depth,He,he.data,0,0):t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,te,_e,he.width,he.height,Y.depth,0,he.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?t.texSubImage3D(r.TEXTURE_2D_ARRAY,te,0,0,0,he.width,he.height,Y.depth,He,Ee,he.data):t.texImage3D(r.TEXTURE_2D_ARRAY,te,_e,he.width,he.height,Y.depth,0,He,Ee,he.data)}else{Ye&&rt&&t.texStorage2D(r.TEXTURE_2D,Be,_e,Pe[0].width,Pe[0].height);for(let te=0,L=Pe.length;te<L;te++)he=Pe[te],x.format!==Wt?He!==null?Ye?t.compressedTexSubImage2D(r.TEXTURE_2D,te,0,0,he.width,he.height,He,he.data):t.compressedTexImage2D(r.TEXTURE_2D,te,_e,he.width,he.height,0,he.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?t.texSubImage2D(r.TEXTURE_2D,te,0,0,he.width,he.height,He,Ee,he.data):t.texImage2D(r.TEXTURE_2D,te,_e,he.width,he.height,0,He,Ee,he.data)}else if(x.isDataArrayTexture)Ye?(rt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Be,_e,Y.width,Y.height,Y.depth),t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,Y.width,Y.height,Y.depth,He,Ee,Y.data)):t.texImage3D(r.TEXTURE_2D_ARRAY,0,_e,Y.width,Y.height,Y.depth,0,He,Ee,Y.data);else if(x.isData3DTexture)Ye?(rt&&t.texStorage3D(r.TEXTURE_3D,Be,_e,Y.width,Y.height,Y.depth),t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,Y.width,Y.height,Y.depth,He,Ee,Y.data)):t.texImage3D(r.TEXTURE_3D,0,_e,Y.width,Y.height,Y.depth,0,He,Ee,Y.data);else if(x.isFramebufferTexture){if(rt)if(Ye)t.texStorage2D(r.TEXTURE_2D,Be,_e,Y.width,Y.height);else{let te=Y.width,L=Y.height;for(let ie=0;ie<Be;ie++)t.texImage2D(r.TEXTURE_2D,ie,_e,te,L,0,He,Ee,null),te>>=1,L>>=1}}else if(Pe.length>0&&Ke){Ye&&rt&&t.texStorage2D(r.TEXTURE_2D,Be,_e,Pe[0].width,Pe[0].height);for(let te=0,L=Pe.length;te<L;te++)he=Pe[te],Ye?t.texSubImage2D(r.TEXTURE_2D,te,0,0,He,Ee,he):t.texImage2D(r.TEXTURE_2D,te,_e,He,Ee,he);x.generateMipmaps=!1}else Ye?(rt&&t.texStorage2D(r.TEXTURE_2D,Be,_e,Y.width,Y.height),t.texSubImage2D(r.TEXTURE_2D,0,0,0,He,Ee,Y)):t.texImage2D(r.TEXTURE_2D,0,_e,He,Ee,Y);S(x,Ke)&&y($),pe.__version=J.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function fe(T,x,N){if(x.image.length!==6)return;const $=q(T,x),K=x.source;t.bindTexture(r.TEXTURE_CUBE_MAP,T.__webglTexture,r.TEXTURE0+N);const J=i.get(K);if(K.version!==J.__version||$===!0){t.activeTexture(r.TEXTURE0+N);const pe=qe.getPrimaries(qe.workingColorSpace),re=x.colorSpace===Xt?null:qe.getPrimaries(x.colorSpace),ce=x.colorSpace===Xt||pe===re?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,x.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,x.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ce);const Se=x.isCompressedTexture||x.image[0].isCompressedTexture,Ne=x.image[0]&&x.image[0].isDataTexture,Y=[];for(let te=0;te<6;te++)!Se&&!Ne?Y[te]=v(x.image[te],!1,!0,s.maxCubemapSize):Y[te]=Ne?x.image[te].image:x.image[te],Y[te]=Ue(x,Y[te]);const Ke=Y[0],He=f(Ke)||o,Ee=n.convert(x.format,x.colorSpace),_e=n.convert(x.type),he=A(x.internalFormat,Ee,_e,x.colorSpace),Pe=o&&x.isVideoTexture!==!0,Ye=J.__version===void 0||$===!0;let rt=C(x,Ke,He);z(r.TEXTURE_CUBE_MAP,x,He);let Be;if(Se){Pe&&Ye&&t.texStorage2D(r.TEXTURE_CUBE_MAP,rt,he,Ke.width,Ke.height);for(let te=0;te<6;te++){Be=Y[te].mipmaps;for(let L=0;L<Be.length;L++){const ie=Be[L];x.format!==Wt?Ee!==null?Pe?t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,L,0,0,ie.width,ie.height,Ee,ie.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,L,he,ie.width,ie.height,0,ie.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Pe?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,L,0,0,ie.width,ie.height,Ee,_e,ie.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,L,he,ie.width,ie.height,0,Ee,_e,ie.data)}}}else{Be=x.mipmaps,Pe&&Ye&&(Be.length>0&&rt++,t.texStorage2D(r.TEXTURE_CUBE_MAP,rt,he,Y[0].width,Y[0].height));for(let te=0;te<6;te++)if(Ne){Pe?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Y[te].width,Y[te].height,Ee,_e,Y[te].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,he,Y[te].width,Y[te].height,0,Ee,_e,Y[te].data);for(let L=0;L<Be.length;L++){const ie=Be[L].image[te].image;Pe?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,L+1,0,0,ie.width,ie.height,Ee,_e,ie.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,L+1,he,ie.width,ie.height,0,Ee,_e,ie.data)}}else{Pe?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Ee,_e,Y[te]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,he,Ee,_e,Y[te]);for(let L=0;L<Be.length;L++){const ie=Be[L];Pe?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,L+1,0,0,Ee,_e,ie.image[te]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,L+1,he,Ee,_e,ie.image[te])}}}S(x,He)&&y(r.TEXTURE_CUBE_MAP),J.__version=K.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function me(T,x,N,$,K,J){const pe=n.convert(N.format,N.colorSpace),re=n.convert(N.type),ce=A(N.internalFormat,pe,re,N.colorSpace);if(!i.get(x).__hasExternalTextures){const Se=Math.max(1,x.width>>J),Ne=Math.max(1,x.height>>J);K===r.TEXTURE_3D||K===r.TEXTURE_2D_ARRAY?t.texImage3D(K,J,ce,Se,Ne,x.depth,0,pe,re,null):t.texImage2D(K,J,ce,Se,Ne,0,pe,re,null)}t.bindFramebuffer(r.FRAMEBUFFER,T),de(x)?l.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,$,K,i.get(N).__webglTexture,0,Ae(x)):(K===r.TEXTURE_2D||K>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,$,K,i.get(N).__webglTexture,J),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Le(T,x,N){if(r.bindRenderbuffer(r.RENDERBUFFER,T),x.depthBuffer&&!x.stencilBuffer){let $=o===!0?r.DEPTH_COMPONENT24:r.DEPTH_COMPONENT16;if(N||de(x)){const K=x.depthTexture;K&&K.isDepthTexture&&(K.type===mi?$=r.DEPTH_COMPONENT32F:K.type===Ei&&($=r.DEPTH_COMPONENT24));const J=Ae(x);de(x)?l.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,J,$,x.width,x.height):r.renderbufferStorageMultisample(r.RENDERBUFFER,J,$,x.width,x.height)}else r.renderbufferStorage(r.RENDERBUFFER,$,x.width,x.height);r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,T)}else if(x.depthBuffer&&x.stencilBuffer){const $=Ae(x);N&&de(x)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,$,r.DEPTH24_STENCIL8,x.width,x.height):de(x)?l.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,$,r.DEPTH24_STENCIL8,x.width,x.height):r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_STENCIL,x.width,x.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.RENDERBUFFER,T)}else{const $=x.isWebGLMultipleRenderTargets===!0?x.texture:[x.texture];for(let K=0;K<$.length;K++){const J=$[K],pe=n.convert(J.format,J.colorSpace),re=n.convert(J.type),ce=A(J.internalFormat,pe,re,J.colorSpace),Se=Ae(x);N&&de(x)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Se,ce,x.width,x.height):de(x)?l.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Se,ce,x.width,x.height):r.renderbufferStorage(r.RENDERBUFFER,ce,x.width,x.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Ce(T,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,T),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(x.depthTexture).__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),V(x.depthTexture,0);const N=i.get(x.depthTexture).__webglTexture,$=Ae(x);if(x.depthTexture.format===Wi)de(x)?l.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,N,0,$):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,N,0);else if(x.depthTexture.format===As)de(x)?l.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,N,0,$):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,N,0);else throw new Error("Unknown depthTexture format")}function be(T){const x=i.get(T),N=T.isWebGLCubeRenderTarget===!0;if(T.depthTexture&&!x.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");Ce(x.__webglFramebuffer,T)}else if(N){x.__webglDepthbuffer=[];for(let $=0;$<6;$++)t.bindFramebuffer(r.FRAMEBUFFER,x.__webglFramebuffer[$]),x.__webglDepthbuffer[$]=r.createRenderbuffer(),Le(x.__webglDepthbuffer[$],T,!1)}else t.bindFramebuffer(r.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer=r.createRenderbuffer(),Le(x.__webglDepthbuffer,T,!1);t.bindFramebuffer(r.FRAMEBUFFER,null)}function We(T,x,N){const $=i.get(T);x!==void 0&&me($.__webglFramebuffer,T,T.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),N!==void 0&&be(T)}function D(T){const x=T.texture,N=i.get(T),$=i.get(x);T.addEventListener("dispose",G),T.isWebGLMultipleRenderTargets!==!0&&($.__webglTexture===void 0&&($.__webglTexture=r.createTexture()),$.__version=x.version,a.memory.textures++);const K=T.isWebGLCubeRenderTarget===!0,J=T.isWebGLMultipleRenderTargets===!0,pe=f(T)||o;if(K){N.__webglFramebuffer=[];for(let re=0;re<6;re++)if(o&&x.mipmaps&&x.mipmaps.length>0){N.__webglFramebuffer[re]=[];for(let ce=0;ce<x.mipmaps.length;ce++)N.__webglFramebuffer[re][ce]=r.createFramebuffer()}else N.__webglFramebuffer[re]=r.createFramebuffer()}else{if(o&&x.mipmaps&&x.mipmaps.length>0){N.__webglFramebuffer=[];for(let re=0;re<x.mipmaps.length;re++)N.__webglFramebuffer[re]=r.createFramebuffer()}else N.__webglFramebuffer=r.createFramebuffer();if(J)if(s.drawBuffers){const re=T.texture;for(let ce=0,Se=re.length;ce<Se;ce++){const Ne=i.get(re[ce]);Ne.__webglTexture===void 0&&(Ne.__webglTexture=r.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&T.samples>0&&de(T)===!1){const re=J?x:[x];N.__webglMultisampledFramebuffer=r.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let ce=0;ce<re.length;ce++){const Se=re[ce];N.__webglColorRenderbuffer[ce]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,N.__webglColorRenderbuffer[ce]);const Ne=n.convert(Se.format,Se.colorSpace),Y=n.convert(Se.type),Ke=A(Se.internalFormat,Ne,Y,Se.colorSpace,T.isXRRenderTarget===!0),He=Ae(T);r.renderbufferStorageMultisample(r.RENDERBUFFER,He,Ke,T.width,T.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ce,r.RENDERBUFFER,N.__webglColorRenderbuffer[ce])}r.bindRenderbuffer(r.RENDERBUFFER,null),T.depthBuffer&&(N.__webglDepthRenderbuffer=r.createRenderbuffer(),Le(N.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(K){t.bindTexture(r.TEXTURE_CUBE_MAP,$.__webglTexture),z(r.TEXTURE_CUBE_MAP,x,pe);for(let re=0;re<6;re++)if(o&&x.mipmaps&&x.mipmaps.length>0)for(let ce=0;ce<x.mipmaps.length;ce++)me(N.__webglFramebuffer[re][ce],T,x,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+re,ce);else me(N.__webglFramebuffer[re],T,x,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);S(x,pe)&&y(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(J){const re=T.texture;for(let ce=0,Se=re.length;ce<Se;ce++){const Ne=re[ce],Y=i.get(Ne);t.bindTexture(r.TEXTURE_2D,Y.__webglTexture),z(r.TEXTURE_2D,Ne,pe),me(N.__webglFramebuffer,T,Ne,r.COLOR_ATTACHMENT0+ce,r.TEXTURE_2D,0),S(Ne,pe)&&y(r.TEXTURE_2D)}t.unbindTexture()}else{let re=r.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(o?re=T.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(re,$.__webglTexture),z(re,x,pe),o&&x.mipmaps&&x.mipmaps.length>0)for(let ce=0;ce<x.mipmaps.length;ce++)me(N.__webglFramebuffer[ce],T,x,r.COLOR_ATTACHMENT0,re,ce);else me(N.__webglFramebuffer,T,x,r.COLOR_ATTACHMENT0,re,0);S(x,pe)&&y(re),t.unbindTexture()}T.depthBuffer&&be(T)}function Et(T){const x=f(T)||o,N=T.isWebGLMultipleRenderTargets===!0?T.texture:[T.texture];for(let $=0,K=N.length;$<K;$++){const J=N[$];if(S(J,x)){const pe=T.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,re=i.get(J).__webglTexture;t.bindTexture(pe,re),y(pe),t.unbindTexture()}}}function ve(T){if(o&&T.samples>0&&de(T)===!1){const x=T.isWebGLMultipleRenderTargets?T.texture:[T.texture],N=T.width,$=T.height;let K=r.COLOR_BUFFER_BIT;const J=[],pe=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,re=i.get(T),ce=T.isWebGLMultipleRenderTargets===!0;if(ce)for(let Se=0;Se<x.length;Se++)t.bindFramebuffer(r.FRAMEBUFFER,re.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Se,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,re.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Se,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,re.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,re.__webglFramebuffer);for(let Se=0;Se<x.length;Se++){J.push(r.COLOR_ATTACHMENT0+Se),T.depthBuffer&&J.push(pe);const Ne=re.__ignoreDepthValues!==void 0?re.__ignoreDepthValues:!1;if(Ne===!1&&(T.depthBuffer&&(K|=r.DEPTH_BUFFER_BIT),T.stencilBuffer&&(K|=r.STENCIL_BUFFER_BIT)),ce&&r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,re.__webglColorRenderbuffer[Se]),Ne===!0&&(r.invalidateFramebuffer(r.READ_FRAMEBUFFER,[pe]),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[pe])),ce){const Y=i.get(x[Se]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Y,0)}r.blitFramebuffer(0,0,N,$,0,0,N,$,K,r.NEAREST),c&&r.invalidateFramebuffer(r.READ_FRAMEBUFFER,J)}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ce)for(let Se=0;Se<x.length;Se++){t.bindFramebuffer(r.FRAMEBUFFER,re.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Se,r.RENDERBUFFER,re.__webglColorRenderbuffer[Se]);const Ne=i.get(x[Se]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,re.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Se,r.TEXTURE_2D,Ne,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,re.__webglMultisampledFramebuffer)}}function Ae(T){return Math.min(s.maxSamples,T.samples)}function de(T){const x=i.get(T);return o&&T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function nt(T){const x=a.render.frame;h.get(T)!==x&&(h.set(T,x),T.update())}function Ue(T,x){const N=T.colorSpace,$=T.format,K=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||T.format===ia||N!==_t&&N!==Xt&&(qe.getTransfer(N)===tt?o===!1?e.has("EXT_sRGB")===!0&&$===Wt?(T.format=ia,T.minFilter=Pt,T.generateMipmaps=!1):x=sc.sRGBToLinear(x):($!==Wt||K!==Li)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),x}this.allocateTextureUnit=P,this.resetTextureUnits=ee,this.setTexture2D=V,this.setTexture2DArray=j,this.setTexture3D=X,this.setTextureCube=W,this.rebindTextures=We,this.setupRenderTarget=D,this.updateRenderTargetMipmap=Et,this.updateMultisampleRenderTarget=ve,this.setupDepthRenderbuffer=be,this.setupFrameBufferTexture=me,this.useMultisampledRTT=de}function ag(r,e,t){const i=t.isWebGL2;function s(n,a=Xt){let o;const l=qe.getTransfer(a);if(n===Li)return r.UNSIGNED_BYTE;if(n===jl)return r.UNSIGNED_SHORT_4_4_4_4;if(n===ql)return r.UNSIGNED_SHORT_5_5_5_1;if(n===bh)return r.BYTE;if(n===Th)return r.SHORT;if(n===da)return r.UNSIGNED_SHORT;if(n===Xl)return r.INT;if(n===Ei)return r.UNSIGNED_INT;if(n===mi)return r.FLOAT;if(n===Zs)return i?r.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(n===Eh)return r.ALPHA;if(n===Wt)return r.RGBA;if(n===Ah)return r.LUMINANCE;if(n===wh)return r.LUMINANCE_ALPHA;if(n===Wi)return r.DEPTH_COMPONENT;if(n===As)return r.DEPTH_STENCIL;if(n===ia)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(n===Rh)return r.RED;if(n===Yl)return r.RED_INTEGER;if(n===Lh)return r.RG;if(n===Kl)return r.RG_INTEGER;if(n===Jl)return r.RGBA_INTEGER;if(n===or||n===lr||n===cr||n===hr)if(l===tt)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(n===or)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===lr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===cr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===hr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(n===or)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===lr)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===cr)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===hr)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ja||n===Za||n===$a||n===Qa)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(n===Ja)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Za)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===$a)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Qa)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Zl)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(n===eo||n===to)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(n===eo)return l===tt?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(n===to)return l===tt?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===io||n===so||n===no||n===ro||n===ao||n===oo||n===lo||n===co||n===ho||n===uo||n===po||n===mo||n===fo||n===go)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(n===io)return l===tt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===so)return l===tt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===no)return l===tt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ro)return l===tt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ao)return l===tt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===oo)return l===tt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===lo)return l===tt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===co)return l===tt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ho)return l===tt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===uo)return l===tt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===po)return l===tt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===mo)return l===tt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===fo)return l===tt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===go)return l===tt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ur||n===_o||n===vo)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(n===ur)return l===tt?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===_o)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===vo)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ch||n===yo||n===xo||n===So)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(n===ur)return o.COMPRESSED_RED_RGTC1_EXT;if(n===yo)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===xo)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===So)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Vi?i?r.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):r[n]!==void 0?r[n]:null}return{convert:s}}class og extends Ct{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Jt extends it{constructor(){super(),this.isGroup=!0,this.type="Group"}}const lg={type:"move"};class Dr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Jt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Jt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new _,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new _),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Jt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new _,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new _),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,n=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const f=t.getJointPose(v,i),m=this._getHandJoint(c,v);f!==null&&(m.matrix.fromArray(f.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=f.radius),m.visible=f!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,g=.005;c.inputState.pinching&&d>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(n=t.getPose(e.gripSpace,i),n!==null&&(l.matrix.fromArray(n.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,n.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(n.linearVelocity)):l.hasLinearVelocity=!1,n.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(n.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&n!==null&&(s=n),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(lg)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=n!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Jt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class cg extends Zi{constructor(e,t){super();const i=this;let s=null,n=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,p=null,g=null;const v=t.getContextAttributes();let f=null,m=null;const S=[],y=[],A=new le;let C=null;const w=new Ct;w.layers.enable(1),w.viewport=new Ze;const R=new Ct;R.layers.enable(2),R.viewport=new Ze;const G=[w,R],M=new og;M.layers.enable(1),M.layers.enable(2);let E=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(z){let q=S[z];return q===void 0&&(q=new Dr,S[z]=q),q.getTargetRaySpace()},this.getControllerGrip=function(z){let q=S[z];return q===void 0&&(q=new Dr,S[z]=q),q.getGripSpace()},this.getHand=function(z){let q=S[z];return q===void 0&&(q=new Dr,S[z]=q),q.getHandSpace()};function k(z){const q=y.indexOf(z.inputSource);if(q===-1)return;const ue=S[q];ue!==void 0&&(ue.update(z.inputSource,z.frame,c||a),ue.dispatchEvent({type:z.type,data:z.inputSource}))}function ee(){s.removeEventListener("select",k),s.removeEventListener("selectstart",k),s.removeEventListener("selectend",k),s.removeEventListener("squeeze",k),s.removeEventListener("squeezestart",k),s.removeEventListener("squeezeend",k),s.removeEventListener("end",ee),s.removeEventListener("inputsourceschange",P);for(let z=0;z<S.length;z++){const q=y[z];q!==null&&(y[z]=null,S[z].disconnect(q))}E=null,H=null,e.setRenderTarget(f),p=null,d=null,u=null,s=null,m=null,oe.stop(),i.isPresenting=!1,e.setPixelRatio(C),e.setSize(A.width,A.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(z){n=z,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(z){o=z,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(z){c=z},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(z){if(s=z,s!==null){if(f=e.getRenderTarget(),s.addEventListener("select",k),s.addEventListener("selectstart",k),s.addEventListener("selectend",k),s.addEventListener("squeeze",k),s.addEventListener("squeezestart",k),s.addEventListener("squeezeend",k),s.addEventListener("end",ee),s.addEventListener("inputsourceschange",P),v.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(A),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const q={antialias:s.renderState.layers===void 0?v.antialias:!0,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:n};p=new XRWebGLLayer(s,t,q),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),m=new Yi(p.framebufferWidth,p.framebufferHeight,{format:Wt,type:Li,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil})}else{let q=null,ue=null,fe=null;v.depth&&(fe=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,q=v.stencil?As:Wi,ue=v.stencil?Vi:Ei);const me={colorFormat:t.RGBA8,depthFormat:fe,scaleFactor:n};u=new XRWebGLBinding(s,t),d=u.createProjectionLayer(me),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),m=new Yi(d.textureWidth,d.textureHeight,{format:Wt,type:Li,depthTexture:new pc(d.textureWidth,d.textureHeight,ue,void 0,void 0,void 0,void 0,void 0,void 0,q),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0});const Le=e.properties.get(m);Le.__ignoreDepthValues=d.ignoreDepthValues}m.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),oe.setContext(s),oe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function P(z){for(let q=0;q<z.removed.length;q++){const ue=z.removed[q],fe=y.indexOf(ue);fe>=0&&(y[fe]=null,S[fe].disconnect(ue))}for(let q=0;q<z.added.length;q++){const ue=z.added[q];let fe=y.indexOf(ue);if(fe===-1){for(let Le=0;Le<S.length;Le++)if(Le>=y.length){y.push(ue),fe=Le;break}else if(y[Le]===null){y[Le]=ue,fe=Le;break}if(fe===-1)break}const me=S[fe];me&&me.connect(ue)}}const F=new _,V=new _;function j(z,q,ue){F.setFromMatrixPosition(q.matrixWorld),V.setFromMatrixPosition(ue.matrixWorld);const fe=F.distanceTo(V),me=q.projectionMatrix.elements,Le=ue.projectionMatrix.elements,Ce=me[14]/(me[10]-1),be=me[14]/(me[10]+1),We=(me[9]+1)/me[5],D=(me[9]-1)/me[5],Et=(me[8]-1)/me[0],ve=(Le[8]+1)/Le[0],Ae=Ce*Et,de=Ce*ve,nt=fe/(-Et+ve),Ue=nt*-Et;q.matrixWorld.decompose(z.position,z.quaternion,z.scale),z.translateX(Ue),z.translateZ(nt),z.matrixWorld.compose(z.position,z.quaternion,z.scale),z.matrixWorldInverse.copy(z.matrixWorld).invert();const T=Ce+nt,x=be+nt,N=Ae-Ue,$=de+(fe-Ue),K=We*be/x*T,J=D*be/x*T;z.projectionMatrix.makePerspective(N,$,K,J,T,x),z.projectionMatrixInverse.copy(z.projectionMatrix).invert()}function X(z,q){q===null?z.matrixWorld.copy(z.matrix):z.matrixWorld.multiplyMatrices(q.matrixWorld,z.matrix),z.matrixWorldInverse.copy(z.matrixWorld).invert()}this.updateCamera=function(z){if(s===null)return;M.near=R.near=w.near=z.near,M.far=R.far=w.far=z.far,(E!==M.near||H!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),E=M.near,H=M.far);const q=z.parent,ue=M.cameras;X(M,q);for(let fe=0;fe<ue.length;fe++)X(ue[fe],q);ue.length===2?j(M,w,R):M.projectionMatrix.copy(w.projectionMatrix),W(z,M,q)};function W(z,q,ue){ue===null?z.matrix.copy(q.matrixWorld):(z.matrix.copy(ue.matrixWorld),z.matrix.invert(),z.matrix.multiply(q.matrixWorld)),z.matrix.decompose(z.position,z.quaternion,z.scale),z.updateMatrixWorld(!0),z.projectionMatrix.copy(q.projectionMatrix),z.projectionMatrixInverse.copy(q.projectionMatrixInverse),z.isPerspectiveCamera&&(z.fov=Rs*2*Math.atan(1/z.projectionMatrix.elements[5]),z.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(z){l=z,d!==null&&(d.fixedFoveation=z),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=z)};let Z=null;function Q(z,q){if(h=q.getViewerPose(c||a),g=q,h!==null){const ue=h.views;p!==null&&(e.setRenderTargetFramebuffer(m,p.framebuffer),e.setRenderTarget(m));let fe=!1;ue.length!==M.cameras.length&&(M.cameras.length=0,fe=!0);for(let me=0;me<ue.length;me++){const Le=ue[me];let Ce=null;if(p!==null)Ce=p.getViewport(Le);else{const We=u.getViewSubImage(d,Le);Ce=We.viewport,me===0&&(e.setRenderTargetTextures(m,We.colorTexture,d.ignoreDepthValues?void 0:We.depthStencilTexture),e.setRenderTarget(m))}let be=G[me];be===void 0&&(be=new Ct,be.layers.enable(me),be.viewport=new Ze,G[me]=be),be.matrix.fromArray(Le.transform.matrix),be.matrix.decompose(be.position,be.quaternion,be.scale),be.projectionMatrix.fromArray(Le.projectionMatrix),be.projectionMatrixInverse.copy(be.projectionMatrix).invert(),be.viewport.set(Ce.x,Ce.y,Ce.width,Ce.height),me===0&&(M.matrix.copy(be.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),fe===!0&&M.cameras.push(be)}}for(let ue=0;ue<S.length;ue++){const fe=y[ue],me=S[ue];fe!==null&&me!==void 0&&me.update(fe,q,c||a)}Z&&Z(z,q),q.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:q}),g=null}const oe=new dc;oe.setAnimationLoop(Q),this.setAnimationLoop=function(z){Z=z},this.dispose=function(){}}}function hg(r,e){function t(f,m){f.matrixAutoUpdate===!0&&f.updateMatrix(),m.value.copy(f.matrix)}function i(f,m){m.color.getRGB(f.fogColor.value,cc(r)),m.isFog?(f.fogNear.value=m.near,f.fogFar.value=m.far):m.isFogExp2&&(f.fogDensity.value=m.density)}function s(f,m,S,y,A){m.isMeshBasicMaterial||m.isMeshLambertMaterial?n(f,m):m.isMeshToonMaterial?(n(f,m),u(f,m)):m.isMeshPhongMaterial?(n(f,m),h(f,m)):m.isMeshStandardMaterial?(n(f,m),d(f,m),m.isMeshPhysicalMaterial&&p(f,m,A)):m.isMeshMatcapMaterial?(n(f,m),g(f,m)):m.isMeshDepthMaterial?n(f,m):m.isMeshDistanceMaterial?(n(f,m),v(f,m)):m.isMeshNormalMaterial?n(f,m):m.isLineBasicMaterial?(a(f,m),m.isLineDashedMaterial&&o(f,m)):m.isPointsMaterial?l(f,m,S,y):m.isSpriteMaterial?c(f,m):m.isShadowMaterial?(f.color.value.copy(m.color),f.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function n(f,m){f.opacity.value=m.opacity,m.color&&f.diffuse.value.copy(m.color),m.emissive&&f.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(f.map.value=m.map,t(m.map,f.mapTransform)),m.alphaMap&&(f.alphaMap.value=m.alphaMap,t(m.alphaMap,f.alphaMapTransform)),m.bumpMap&&(f.bumpMap.value=m.bumpMap,t(m.bumpMap,f.bumpMapTransform),f.bumpScale.value=m.bumpScale,m.side===It&&(f.bumpScale.value*=-1)),m.normalMap&&(f.normalMap.value=m.normalMap,t(m.normalMap,f.normalMapTransform),f.normalScale.value.copy(m.normalScale),m.side===It&&f.normalScale.value.negate()),m.displacementMap&&(f.displacementMap.value=m.displacementMap,t(m.displacementMap,f.displacementMapTransform),f.displacementScale.value=m.displacementScale,f.displacementBias.value=m.displacementBias),m.emissiveMap&&(f.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,f.emissiveMapTransform)),m.specularMap&&(f.specularMap.value=m.specularMap,t(m.specularMap,f.specularMapTransform)),m.alphaTest>0&&(f.alphaTest.value=m.alphaTest);const S=e.get(m).envMap;if(S&&(f.envMap.value=S,f.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,f.reflectivity.value=m.reflectivity,f.ior.value=m.ior,f.refractionRatio.value=m.refractionRatio),m.lightMap){f.lightMap.value=m.lightMap;const y=r._useLegacyLights===!0?Math.PI:1;f.lightMapIntensity.value=m.lightMapIntensity*y,t(m.lightMap,f.lightMapTransform)}m.aoMap&&(f.aoMap.value=m.aoMap,f.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,f.aoMapTransform))}function a(f,m){f.diffuse.value.copy(m.color),f.opacity.value=m.opacity,m.map&&(f.map.value=m.map,t(m.map,f.mapTransform))}function o(f,m){f.dashSize.value=m.dashSize,f.totalSize.value=m.dashSize+m.gapSize,f.scale.value=m.scale}function l(f,m,S,y){f.diffuse.value.copy(m.color),f.opacity.value=m.opacity,f.size.value=m.size*S,f.scale.value=y*.5,m.map&&(f.map.value=m.map,t(m.map,f.uvTransform)),m.alphaMap&&(f.alphaMap.value=m.alphaMap,t(m.alphaMap,f.alphaMapTransform)),m.alphaTest>0&&(f.alphaTest.value=m.alphaTest)}function c(f,m){f.diffuse.value.copy(m.color),f.opacity.value=m.opacity,f.rotation.value=m.rotation,m.map&&(f.map.value=m.map,t(m.map,f.mapTransform)),m.alphaMap&&(f.alphaMap.value=m.alphaMap,t(m.alphaMap,f.alphaMapTransform)),m.alphaTest>0&&(f.alphaTest.value=m.alphaTest)}function h(f,m){f.specular.value.copy(m.specular),f.shininess.value=Math.max(m.shininess,1e-4)}function u(f,m){m.gradientMap&&(f.gradientMap.value=m.gradientMap)}function d(f,m){f.metalness.value=m.metalness,m.metalnessMap&&(f.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,f.metalnessMapTransform)),f.roughness.value=m.roughness,m.roughnessMap&&(f.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,f.roughnessMapTransform)),e.get(m).envMap&&(f.envMapIntensity.value=m.envMapIntensity)}function p(f,m,S){f.ior.value=m.ior,m.sheen>0&&(f.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),f.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(f.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,f.sheenColorMapTransform)),m.sheenRoughnessMap&&(f.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,f.sheenRoughnessMapTransform))),m.clearcoat>0&&(f.clearcoat.value=m.clearcoat,f.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(f.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,f.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(f.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===It&&f.clearcoatNormalScale.value.negate())),m.iridescence>0&&(f.iridescence.value=m.iridescence,f.iridescenceIOR.value=m.iridescenceIOR,f.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(f.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,f.iridescenceMapTransform)),m.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),m.transmission>0&&(f.transmission.value=m.transmission,f.transmissionSamplerMap.value=S.texture,f.transmissionSamplerSize.value.set(S.width,S.height),m.transmissionMap&&(f.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,f.transmissionMapTransform)),f.thickness.value=m.thickness,m.thicknessMap&&(f.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=m.attenuationDistance,f.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(f.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(f.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=m.specularIntensity,f.specularColor.value.copy(m.specularColor),m.specularColorMap&&(f.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,f.specularColorMapTransform)),m.specularIntensityMap&&(f.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,f.specularIntensityMapTransform))}function g(f,m){m.matcap&&(f.matcap.value=m.matcap)}function v(f,m){const S=e.get(m).light;f.referencePosition.value.setFromMatrixPosition(S.matrixWorld),f.nearDistance.value=S.shadow.camera.near,f.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function ug(r,e,t,i){let s={},n={},a=[];const o=t.isWebGL2?r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(S,y){const A=y.program;i.uniformBlockBinding(S,A)}function c(S,y){let A=s[S.id];A===void 0&&(g(S),A=h(S),s[S.id]=A,S.addEventListener("dispose",f));const C=y.program;i.updateUBOMapping(S,C);const w=e.render.frame;n[S.id]!==w&&(d(S),n[S.id]=w)}function h(S){const y=u();S.__bindingPointIndex=y;const A=r.createBuffer(),C=S.__size,w=S.usage;return r.bindBuffer(r.UNIFORM_BUFFER,A),r.bufferData(r.UNIFORM_BUFFER,C,w),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,y,A),A}function u(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){const y=s[S.id],A=S.uniforms,C=S.__cache;r.bindBuffer(r.UNIFORM_BUFFER,y);for(let w=0,R=A.length;w<R;w++){const G=Array.isArray(A[w])?A[w]:[A[w]];for(let M=0,E=G.length;M<E;M++){const H=G[M];if(p(H,w,M,C)===!0){const k=H.__offset,ee=Array.isArray(H.value)?H.value:[H.value];let P=0;for(let F=0;F<ee.length;F++){const V=ee[F],j=v(V);typeof V=="number"||typeof V=="boolean"?(H.__data[0]=V,r.bufferSubData(r.UNIFORM_BUFFER,k+P,H.__data)):V.isMatrix3?(H.__data[0]=V.elements[0],H.__data[1]=V.elements[1],H.__data[2]=V.elements[2],H.__data[3]=0,H.__data[4]=V.elements[3],H.__data[5]=V.elements[4],H.__data[6]=V.elements[5],H.__data[7]=0,H.__data[8]=V.elements[6],H.__data[9]=V.elements[7],H.__data[10]=V.elements[8],H.__data[11]=0):(V.toArray(H.__data,P),P+=j.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,k,H.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function p(S,y,A,C){const w=S.value,R=y+"_"+A;if(C[R]===void 0)return typeof w=="number"||typeof w=="boolean"?C[R]=w:C[R]=w.clone(),!0;{const G=C[R];if(typeof w=="number"||typeof w=="boolean"){if(G!==w)return C[R]=w,!0}else if(G.equals(w)===!1)return G.copy(w),!0}return!1}function g(S){const y=S.uniforms;let A=0;const C=16;for(let R=0,G=y.length;R<G;R++){const M=Array.isArray(y[R])?y[R]:[y[R]];for(let E=0,H=M.length;E<H;E++){const k=M[E],ee=Array.isArray(k.value)?k.value:[k.value];for(let P=0,F=ee.length;P<F;P++){const V=ee[P],j=v(V),X=A%C;X!==0&&C-X<j.boundary&&(A+=C-X),k.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=A,A+=j.storage}}}const w=A%C;return w>0&&(A+=C-w),S.__size=A,S.__cache={},this}function v(S){const y={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(y.boundary=4,y.storage=4):S.isVector2?(y.boundary=8,y.storage=8):S.isVector3||S.isColor?(y.boundary=16,y.storage=12):S.isVector4?(y.boundary=16,y.storage=16):S.isMatrix3?(y.boundary=48,y.storage=48):S.isMatrix4?(y.boundary=64,y.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),y}function f(S){const y=S.target;y.removeEventListener("dispose",f);const A=a.indexOf(y.__bindingPointIndex);a.splice(A,1),r.deleteBuffer(s[y.id]),delete s[y.id],delete n[y.id]}function m(){for(const S in s)r.deleteBuffer(s[S]);a=[],s={},n={}}return{bind:l,update:c,dispose:m}}class yc{constructor(e={}){const{canvas:t=au(),context:i=null,depth:s=!0,stencil:n=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let d;i!==null?d=i.getContextAttributes().alpha:d=a;const p=new Uint32Array(4),g=new Int32Array(4);let v=null,f=null;const m=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=at,this._useLegacyLights=!1,this.toneMapping=Ri,this.toneMappingExposure=1;const y=this;let A=!1,C=0,w=0,R=null,G=-1,M=null;const E=new Ze,H=new Ze;let k=null;const ee=new xe(0);let P=0,F=t.width,V=t.height,j=1,X=null,W=null;const Z=new Ze(0,0,F,V),Q=new Ze(0,0,F,V);let oe=!1;const z=new _a;let q=!1,ue=!1,fe=null;const me=new Fe,Le=new le,Ce=new _,be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function We(){return R===null?j:1}let D=i;function Et(b,I){for(let O=0;O<b.length;O++){const B=b[O],U=t.getContext(B,I);if(U!==null)return U}return null}try{const b={alpha:!0,depth:s,stencil:n,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ua}`),t.addEventListener("webglcontextlost",te,!1),t.addEventListener("webglcontextrestored",L,!1),t.addEventListener("webglcontextcreationerror",ie,!1),D===null){const I=["webgl2","webgl","experimental-webgl"];if(y.isWebGL1Renderer===!0&&I.shift(),D=Et(I,b),D===null)throw Et(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&D instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),D.getShaderPrecisionFormat===void 0&&(D.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let ve,Ae,de,nt,Ue,T,x,N,$,K,J,pe,re,ce,Se,Ne,Y,Ke,He,Ee,_e,he,Pe,Ye;function rt(){ve=new xm(D),Ae=new mm(D,ve,e),ve.init(Ae),he=new ag(D,ve,Ae),de=new ng(D,ve,Ae),nt=new bm(D),Ue=new Wf,T=new rg(D,ve,de,Ue,Ae,he,nt),x=new gm(y),N=new ym(y),$=new Pu(D,Ae),Pe=new dm(D,ve,$,Ae),K=new Sm(D,$,nt,Pe),J=new wm(D,K,$,nt),He=new Am(D,Ae,T),Ne=new fm(Ue),pe=new Vf(y,x,N,ve,Ae,Pe,Ne),re=new hg(y,Ue),ce=new jf,Se=new $f(ve,Ae),Ke=new um(y,x,N,de,J,d,l),Y=new sg(y,J,Ae),Ye=new ug(D,nt,Ae,de),Ee=new pm(D,ve,nt,Ae),_e=new Mm(D,ve,nt,Ae),nt.programs=pe.programs,y.capabilities=Ae,y.extensions=ve,y.properties=Ue,y.renderLists=ce,y.shadowMap=Y,y.state=de,y.info=nt}rt();const Be=new cg(y,D);this.xr=Be,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const b=ve.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=ve.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(b){b!==void 0&&(j=b,this.setSize(F,V,!1))},this.getSize=function(b){return b.set(F,V)},this.setSize=function(b,I,O=!0){if(Be.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}F=b,V=I,t.width=Math.floor(b*j),t.height=Math.floor(I*j),O===!0&&(t.style.width=b+"px",t.style.height=I+"px"),this.setViewport(0,0,b,I)},this.getDrawingBufferSize=function(b){return b.set(F*j,V*j).floor()},this.setDrawingBufferSize=function(b,I,O){F=b,V=I,j=O,t.width=Math.floor(b*O),t.height=Math.floor(I*O),this.setViewport(0,0,b,I)},this.getCurrentViewport=function(b){return b.copy(E)},this.getViewport=function(b){return b.copy(Z)},this.setViewport=function(b,I,O,B){b.isVector4?Z.set(b.x,b.y,b.z,b.w):Z.set(b,I,O,B),de.viewport(E.copy(Z).multiplyScalar(j).floor())},this.getScissor=function(b){return b.copy(Q)},this.setScissor=function(b,I,O,B){b.isVector4?Q.set(b.x,b.y,b.z,b.w):Q.set(b,I,O,B),de.scissor(H.copy(Q).multiplyScalar(j).floor())},this.getScissorTest=function(){return oe},this.setScissorTest=function(b){de.setScissorTest(oe=b)},this.setOpaqueSort=function(b){X=b},this.setTransparentSort=function(b){W=b},this.getClearColor=function(b){return b.copy(Ke.getClearColor())},this.setClearColor=function(){Ke.setClearColor.apply(Ke,arguments)},this.getClearAlpha=function(){return Ke.getClearAlpha()},this.setClearAlpha=function(){Ke.setClearAlpha.apply(Ke,arguments)},this.clear=function(b=!0,I=!0,O=!0){let B=0;if(b){let U=!1;if(R!==null){const ne=R.texture.format;U=ne===Jl||ne===Kl||ne===Yl}if(U){const ne=R.texture.type,ge=ne===Li||ne===Ei||ne===da||ne===Vi||ne===jl||ne===ql,Me=Ke.getClearColor(),Te=Ke.getClearAlpha(),Ge=Me.r,De=Me.g,Oe=Me.b;ge?(p[0]=Ge,p[1]=De,p[2]=Oe,p[3]=Te,D.clearBufferuiv(D.COLOR,0,p)):(g[0]=Ge,g[1]=De,g[2]=Oe,g[3]=Te,D.clearBufferiv(D.COLOR,0,g))}else B|=D.COLOR_BUFFER_BIT}I&&(B|=D.DEPTH_BUFFER_BIT),O&&(B|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",te,!1),t.removeEventListener("webglcontextrestored",L,!1),t.removeEventListener("webglcontextcreationerror",ie,!1),ce.dispose(),Se.dispose(),Ue.dispose(),x.dispose(),N.dispose(),J.dispose(),Pe.dispose(),Ye.dispose(),pe.dispose(),Be.dispose(),Be.removeEventListener("sessionstart",Ft),Be.removeEventListener("sessionend",et),fe&&(fe.dispose(),fe=null),At.stop()};function te(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function L(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const b=nt.autoReset,I=Y.enabled,O=Y.autoUpdate,B=Y.needsUpdate,U=Y.type;rt(),nt.autoReset=b,Y.enabled=I,Y.autoUpdate=O,Y.needsUpdate=B,Y.type=U}function ie(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function ae(b){const I=b.target;I.removeEventListener("dispose",ae),we(I)}function we(b){ye(b),Ue.remove(b)}function ye(b){const I=Ue.get(b).programs;I!==void 0&&(I.forEach(function(O){pe.releaseProgram(O)}),b.isShaderMaterial&&pe.releaseShaderCache(b))}this.renderBufferDirect=function(b,I,O,B,U,ne){I===null&&(I=be);const ge=U.isMesh&&U.matrixWorld.determinant()<0,Me=zc(b,I,O,B,U);de.setMaterial(B,ge);let Te=O.index,Ge=1;if(B.wireframe===!0){if(Te=K.getWireframeAttribute(O),Te===void 0)return;Ge=2}const De=O.drawRange,Oe=O.attributes.position;let xt=De.start*Ge,ht=(De.start+De.count)*Ge;ne!==null&&(xt=Math.max(xt,ne.start*Ge),ht=Math.min(ht,(ne.start+ne.count)*Ge)),Te!==null?(xt=Math.max(xt,0),ht=Math.min(ht,Te.count)):Oe!=null&&(xt=Math.max(xt,0),ht=Math.min(ht,Oe.count));const Bt=ht-xt;if(Bt<0||Bt===1/0)return;Pe.setup(U,B,Me,O,Te);let ai,ot=Ee;if(Te!==null&&(ai=$.get(Te),ot=_e,ot.setIndex(ai)),U.isMesh)B.wireframe===!0?(de.setLineWidth(B.wireframeLinewidth*We()),ot.setMode(D.LINES)):ot.setMode(D.TRIANGLES);else if(U.isLine){let ze=B.linewidth;ze===void 0&&(ze=1),de.setLineWidth(ze*We()),U.isLineSegments?ot.setMode(D.LINES):U.isLineLoop?ot.setMode(D.LINE_LOOP):ot.setMode(D.LINE_STRIP)}else U.isPoints?ot.setMode(D.POINTS):U.isSprite&&ot.setMode(D.TRIANGLES);if(U.isBatchedMesh)ot.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else if(U.isInstancedMesh)ot.renderInstances(xt,Bt,U.count);else if(O.isInstancedBufferGeometry){const ze=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,ir=Math.min(O.instanceCount,ze);ot.renderInstances(xt,Bt,ir)}else ot.render(xt,Bt)};function $e(b,I,O){b.transparent===!0&&b.side===ei&&b.forceSinglePass===!1?(b.side=It,b.needsUpdate=!0,on(b,I,O),b.side=gi,b.needsUpdate=!0,on(b,I,O),b.side=ei):on(b,I,O)}this.compile=function(b,I,O=null){O===null&&(O=b),f=Se.get(O),f.init(),S.push(f),O.traverseVisible(function(U){U.isLight&&U.layers.test(I.layers)&&(f.pushLight(U),U.castShadow&&f.pushShadow(U))}),b!==O&&b.traverseVisible(function(U){U.isLight&&U.layers.test(I.layers)&&(f.pushLight(U),U.castShadow&&f.pushShadow(U))}),f.setupLights(y._useLegacyLights);const B=new Set;return b.traverse(function(U){const ne=U.material;if(ne)if(Array.isArray(ne))for(let ge=0;ge<ne.length;ge++){const Me=ne[ge];$e(Me,O,U),B.add(Me)}else $e(ne,O,U),B.add(ne)}),S.pop(),f=null,B},this.compileAsync=function(b,I,O=null){const B=this.compile(b,I,O);return new Promise(U=>{function ne(){if(B.forEach(function(ge){Ue.get(ge).currentProgram.isReady()&&B.delete(ge)}),B.size===0){U(b);return}setTimeout(ne,10)}ve.get("KHR_parallel_shader_compile")!==null?ne():setTimeout(ne,10)})};let Qe=null;function lt(b){Qe&&Qe(b)}function Ft(){At.stop()}function et(){At.start()}const At=new dc;At.setAnimationLoop(lt),typeof self<"u"&&At.setContext(self),this.setAnimationLoop=function(b){Qe=b,Be.setAnimationLoop(b),b===null?At.stop():At.start()},Be.addEventListener("sessionstart",Ft),Be.addEventListener("sessionend",et),this.render=function(b,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),Be.enabled===!0&&Be.isPresenting===!0&&(Be.cameraAutoUpdate===!0&&Be.updateCamera(I),I=Be.getCamera()),b.isScene===!0&&b.onBeforeRender(y,b,I,R),f=Se.get(b,S.length),f.init(),S.push(f),me.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),z.setFromProjectionMatrix(me),ue=this.localClippingEnabled,q=Ne.init(this.clippingPlanes,ue),v=ce.get(b,m.length),v.init(),m.push(v),$t(b,I,0,y.sortObjects),v.finish(),y.sortObjects===!0&&v.sort(X,W),this.info.render.frame++,q===!0&&Ne.beginShadows();const O=f.state.shadowsArray;if(Y.render(O,b,I),q===!0&&Ne.endShadows(),this.info.autoReset===!0&&this.info.reset(),Ke.render(v,b),f.setupLights(y._useLegacyLights),I.isArrayCamera){const B=I.cameras;for(let U=0,ne=B.length;U<ne;U++){const ge=B[U];Fa(v,b,ge,ge.viewport)}}else Fa(v,b,I);R!==null&&(T.updateMultisampleRenderTarget(R),T.updateRenderTargetMipmap(R)),b.isScene===!0&&b.onAfterRender(y,b,I),Pe.resetDefaultState(),G=-1,M=null,S.pop(),S.length>0?f=S[S.length-1]:f=null,m.pop(),m.length>0?v=m[m.length-1]:v=null};function $t(b,I,O,B){if(b.visible===!1)return;if(b.layers.test(I.layers)){if(b.isGroup)O=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(I);else if(b.isLight)f.pushLight(b),b.castShadow&&f.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||z.intersectsSprite(b)){B&&Ce.setFromMatrixPosition(b.matrixWorld).applyMatrix4(me);const ne=J.update(b),ge=b.material;ge.visible&&v.push(b,ne,ge,O,Ce.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||z.intersectsObject(b))){const ne=J.update(b),ge=b.material;if(B&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Ce.copy(b.boundingSphere.center)):(ne.boundingSphere===null&&ne.computeBoundingSphere(),Ce.copy(ne.boundingSphere.center)),Ce.applyMatrix4(b.matrixWorld).applyMatrix4(me)),Array.isArray(ge)){const Me=ne.groups;for(let Te=0,Ge=Me.length;Te<Ge;Te++){const De=Me[Te],Oe=ge[De.materialIndex];Oe&&Oe.visible&&v.push(b,ne,Oe,O,Ce.z,De)}}else ge.visible&&v.push(b,ne,ge,O,Ce.z,null)}}const U=b.children;for(let ne=0,ge=U.length;ne<ge;ne++)$t(U[ne],I,O,B)}function Fa(b,I,O,B){const U=b.opaque,ne=b.transmissive,ge=b.transparent;f.setupLightsView(O),q===!0&&Ne.setGlobalState(y.clippingPlanes,O),ne.length>0&&Bc(U,ne,I,O),B&&de.viewport(E.copy(B)),U.length>0&&an(U,I,O),ne.length>0&&an(ne,I,O),ge.length>0&&an(ge,I,O),de.buffers.depth.setTest(!0),de.buffers.depth.setMask(!0),de.buffers.color.setMask(!0),de.setPolygonOffset(!1)}function Bc(b,I,O,B){if((O.isScene===!0?O.overrideMaterial:null)!==null)return;const U=Ae.isWebGL2;fe===null&&(fe=new Yi(1,1,{generateMipmaps:!0,type:ve.has("EXT_color_buffer_half_float")?Zs:Li,minFilter:qi,samples:U?4:0})),y.getDrawingBufferSize(Le),U?fe.setSize(Le.x,Le.y):fe.setSize(Jn(Le.x),Jn(Le.y));const ne=y.getRenderTarget();y.setRenderTarget(fe),y.getClearColor(ee),P=y.getClearAlpha(),P<1&&y.setClearColor(16777215,.5),y.clear();const ge=y.toneMapping;y.toneMapping=Ri,an(b,O,B),T.updateMultisampleRenderTarget(fe),T.updateRenderTargetMipmap(fe);let Me=!1;for(let Te=0,Ge=I.length;Te<Ge;Te++){const De=I[Te],Oe=De.object,xt=De.geometry,ht=De.material,Bt=De.group;if(ht.side===ei&&Oe.layers.test(B.layers)){const ai=ht.side;ht.side=It,ht.needsUpdate=!0,Ba(Oe,O,B,xt,ht,Bt),ht.side=ai,ht.needsUpdate=!0,Me=!0}}Me===!0&&(T.updateMultisampleRenderTarget(fe),T.updateRenderTargetMipmap(fe)),y.setRenderTarget(ne),y.setClearColor(ee,P),y.toneMapping=ge}function an(b,I,O){const B=I.isScene===!0?I.overrideMaterial:null;for(let U=0,ne=b.length;U<ne;U++){const ge=b[U],Me=ge.object,Te=ge.geometry,Ge=B===null?ge.material:B,De=ge.group;Me.layers.test(O.layers)&&Ba(Me,I,O,Te,Ge,De)}}function Ba(b,I,O,B,U,ne){b.onBeforeRender(y,I,O,B,U,ne),b.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),U.onBeforeRender(y,I,O,B,b,ne),U.transparent===!0&&U.side===ei&&U.forceSinglePass===!1?(U.side=It,U.needsUpdate=!0,y.renderBufferDirect(O,I,B,U,b,ne),U.side=gi,U.needsUpdate=!0,y.renderBufferDirect(O,I,B,U,b,ne),U.side=ei):y.renderBufferDirect(O,I,B,U,b,ne),b.onAfterRender(y,I,O,B,U,ne)}function on(b,I,O){I.isScene!==!0&&(I=be);const B=Ue.get(b),U=f.state.lights,ne=f.state.shadowsArray,ge=U.state.version,Me=pe.getParameters(b,U.state,ne,I,O),Te=pe.getProgramCacheKey(Me);let Ge=B.programs;B.environment=b.isMeshStandardMaterial?I.environment:null,B.fog=I.fog,B.envMap=(b.isMeshStandardMaterial?N:x).get(b.envMap||B.environment),Ge===void 0&&(b.addEventListener("dispose",ae),Ge=new Map,B.programs=Ge);let De=Ge.get(Te);if(De!==void 0){if(B.currentProgram===De&&B.lightsStateVersion===ge)return ka(b,Me),De}else Me.uniforms=pe.getUniforms(b),b.onBuild(O,Me,y),b.onBeforeCompile(Me,y),De=pe.acquireProgram(Me,Te),Ge.set(Te,De),B.uniforms=Me.uniforms;const Oe=B.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Oe.clippingPlanes=Ne.uniform),ka(b,Me),B.needsLights=Hc(b),B.lightsStateVersion=ge,B.needsLights&&(Oe.ambientLightColor.value=U.state.ambient,Oe.lightProbe.value=U.state.probe,Oe.directionalLights.value=U.state.directional,Oe.directionalLightShadows.value=U.state.directionalShadow,Oe.spotLights.value=U.state.spot,Oe.spotLightShadows.value=U.state.spotShadow,Oe.rectAreaLights.value=U.state.rectArea,Oe.ltc_1.value=U.state.rectAreaLTC1,Oe.ltc_2.value=U.state.rectAreaLTC2,Oe.pointLights.value=U.state.point,Oe.pointLightShadows.value=U.state.pointShadow,Oe.hemisphereLights.value=U.state.hemi,Oe.directionalShadowMap.value=U.state.directionalShadowMap,Oe.directionalShadowMatrix.value=U.state.directionalShadowMatrix,Oe.spotShadowMap.value=U.state.spotShadowMap,Oe.spotLightMatrix.value=U.state.spotLightMatrix,Oe.spotLightMap.value=U.state.spotLightMap,Oe.pointShadowMap.value=U.state.pointShadowMap,Oe.pointShadowMatrix.value=U.state.pointShadowMatrix),B.currentProgram=De,B.uniformsList=null,De}function za(b){if(b.uniformsList===null){const I=b.currentProgram.getUniforms();b.uniformsList=Gn.seqWithValue(I.seq,b.uniforms)}return b.uniformsList}function ka(b,I){const O=Ue.get(b);O.outputColorSpace=I.outputColorSpace,O.batching=I.batching,O.instancing=I.instancing,O.instancingColor=I.instancingColor,O.skinning=I.skinning,O.morphTargets=I.morphTargets,O.morphNormals=I.morphNormals,O.morphColors=I.morphColors,O.morphTargetsCount=I.morphTargetsCount,O.numClippingPlanes=I.numClippingPlanes,O.numIntersection=I.numClipIntersection,O.vertexAlphas=I.vertexAlphas,O.vertexTangents=I.vertexTangents,O.toneMapping=I.toneMapping}function zc(b,I,O,B,U){I.isScene!==!0&&(I=be),T.resetTextureUnits();const ne=I.fog,ge=B.isMeshStandardMaterial?I.environment:null,Me=R===null?y.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:_t,Te=(B.isMeshStandardMaterial?N:x).get(B.envMap||ge),Ge=B.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,De=!!O.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Oe=!!O.morphAttributes.position,xt=!!O.morphAttributes.normal,ht=!!O.morphAttributes.color;let Bt=Ri;B.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(Bt=y.toneMapping);const ai=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,ot=ai!==void 0?ai.length:0,ze=Ue.get(B),ir=f.state.lights;if(q===!0&&(ue===!0||b!==M)){const zt=b===M&&B.id===G;Ne.setState(B,b,zt)}let sr=!1;B.version===ze.__version?(ze.needsLights&&ze.lightsStateVersion!==ir.state.version||ze.outputColorSpace!==Me||U.isBatchedMesh&&ze.batching===!1||!U.isBatchedMesh&&ze.batching===!0||U.isInstancedMesh&&ze.instancing===!1||!U.isInstancedMesh&&ze.instancing===!0||U.isSkinnedMesh&&ze.skinning===!1||!U.isSkinnedMesh&&ze.skinning===!0||U.isInstancedMesh&&ze.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&ze.instancingColor===!1&&U.instanceColor!==null||ze.envMap!==Te||B.fog===!0&&ze.fog!==ne||ze.numClippingPlanes!==void 0&&(ze.numClippingPlanes!==Ne.numPlanes||ze.numIntersection!==Ne.numIntersection)||ze.vertexAlphas!==Ge||ze.vertexTangents!==De||ze.morphTargets!==Oe||ze.morphNormals!==xt||ze.morphColors!==ht||ze.toneMapping!==Bt||Ae.isWebGL2===!0&&ze.morphTargetsCount!==ot)&&(sr=!0):(sr=!0,ze.__version=B.version);let Ci=ze.currentProgram;sr===!0&&(Ci=on(B,I,U));let Ha=!1,Fs=!1,nr=!1;const St=Ci.getUniforms(),Pi=ze.uniforms;if(de.useProgram(Ci.program)&&(Ha=!0,Fs=!0,nr=!0),B.id!==G&&(G=B.id,Fs=!0),Ha||M!==b){St.setValue(D,"projectionMatrix",b.projectionMatrix),St.setValue(D,"viewMatrix",b.matrixWorldInverse);const zt=St.map.cameraPosition;zt!==void 0&&zt.setValue(D,Ce.setFromMatrixPosition(b.matrixWorld)),Ae.logarithmicDepthBuffer&&St.setValue(D,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&St.setValue(D,"isOrthographic",b.isOrthographicCamera===!0),M!==b&&(M=b,Fs=!0,nr=!0)}if(U.isSkinnedMesh){St.setOptional(D,U,"bindMatrix"),St.setOptional(D,U,"bindMatrixInverse");const zt=U.skeleton;zt&&(Ae.floatVertexTextures?(zt.boneTexture===null&&zt.computeBoneTexture(),St.setValue(D,"boneTexture",zt.boneTexture,T)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}U.isBatchedMesh&&(St.setOptional(D,U,"batchingTexture"),St.setValue(D,"batchingTexture",U._matricesTexture,T));const rr=O.morphAttributes;if((rr.position!==void 0||rr.normal!==void 0||rr.color!==void 0&&Ae.isWebGL2===!0)&&He.update(U,O,Ci),(Fs||ze.receiveShadow!==U.receiveShadow)&&(ze.receiveShadow=U.receiveShadow,St.setValue(D,"receiveShadow",U.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(Pi.envMap.value=Te,Pi.flipEnvMap.value=Te.isCubeTexture&&Te.isRenderTargetTexture===!1?-1:1),Fs&&(St.setValue(D,"toneMappingExposure",y.toneMappingExposure),ze.needsLights&&kc(Pi,nr),ne&&B.fog===!0&&re.refreshFogUniforms(Pi,ne),re.refreshMaterialUniforms(Pi,B,j,V,fe),Gn.upload(D,za(ze),Pi,T)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(Gn.upload(D,za(ze),Pi,T),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&St.setValue(D,"center",U.center),St.setValue(D,"modelViewMatrix",U.modelViewMatrix),St.setValue(D,"normalMatrix",U.normalMatrix),St.setValue(D,"modelMatrix",U.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){const zt=B.uniformsGroups;for(let ar=0,Gc=zt.length;ar<Gc;ar++)if(Ae.isWebGL2){const Ga=zt[ar];Ye.update(Ga,Ci),Ye.bind(Ga,Ci)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Ci}function kc(b,I){b.ambientLightColor.needsUpdate=I,b.lightProbe.needsUpdate=I,b.directionalLights.needsUpdate=I,b.directionalLightShadows.needsUpdate=I,b.pointLights.needsUpdate=I,b.pointLightShadows.needsUpdate=I,b.spotLights.needsUpdate=I,b.spotLightShadows.needsUpdate=I,b.rectAreaLights.needsUpdate=I,b.hemisphereLights.needsUpdate=I}function Hc(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(b,I,O){Ue.get(b.texture).__webglTexture=I,Ue.get(b.depthTexture).__webglTexture=O;const B=Ue.get(b);B.__hasExternalTextures=!0,B.__hasExternalTextures&&(B.__autoAllocateDepthBuffer=O===void 0,B.__autoAllocateDepthBuffer||ve.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),B.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(b,I){const O=Ue.get(b);O.__webglFramebuffer=I,O.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(b,I=0,O=0){R=b,C=I,w=O;let B=!0,U=null,ne=!1,ge=!1;if(b){const Me=Ue.get(b);Me.__useDefaultFramebuffer!==void 0?(de.bindFramebuffer(D.FRAMEBUFFER,null),B=!1):Me.__webglFramebuffer===void 0?T.setupRenderTarget(b):Me.__hasExternalTextures&&T.rebindTextures(b,Ue.get(b.texture).__webglTexture,Ue.get(b.depthTexture).__webglTexture);const Te=b.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(ge=!0);const Ge=Ue.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Ge[I])?U=Ge[I][O]:U=Ge[I],ne=!0):Ae.isWebGL2&&b.samples>0&&T.useMultisampledRTT(b)===!1?U=Ue.get(b).__webglMultisampledFramebuffer:Array.isArray(Ge)?U=Ge[O]:U=Ge,E.copy(b.viewport),H.copy(b.scissor),k=b.scissorTest}else E.copy(Z).multiplyScalar(j).floor(),H.copy(Q).multiplyScalar(j).floor(),k=oe;if(de.bindFramebuffer(D.FRAMEBUFFER,U)&&Ae.drawBuffers&&B&&de.drawBuffers(b,U),de.viewport(E),de.scissor(H),de.setScissorTest(k),ne){const Me=Ue.get(b.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+I,Me.__webglTexture,O)}else if(ge){const Me=Ue.get(b.texture),Te=I||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,Me.__webglTexture,O||0,Te)}G=-1},this.readRenderTargetPixels=function(b,I,O,B,U,ne,ge){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Me=Ue.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&ge!==void 0&&(Me=Me[ge]),Me){de.bindFramebuffer(D.FRAMEBUFFER,Me);try{const Te=b.texture,Ge=Te.format,De=Te.type;if(Ge!==Wt&&he.convert(Ge)!==D.getParameter(D.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Oe=De===Zs&&(ve.has("EXT_color_buffer_half_float")||Ae.isWebGL2&&ve.has("EXT_color_buffer_float"));if(De!==Li&&he.convert(De)!==D.getParameter(D.IMPLEMENTATION_COLOR_READ_TYPE)&&!(De===mi&&(Ae.isWebGL2||ve.has("OES_texture_float")||ve.has("WEBGL_color_buffer_float")))&&!Oe){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=b.width-B&&O>=0&&O<=b.height-U&&D.readPixels(I,O,B,U,he.convert(Ge),he.convert(De),ne)}finally{const Te=R!==null?Ue.get(R).__webglFramebuffer:null;de.bindFramebuffer(D.FRAMEBUFFER,Te)}}},this.copyFramebufferToTexture=function(b,I,O=0){const B=Math.pow(2,-O),U=Math.floor(I.image.width*B),ne=Math.floor(I.image.height*B);T.setTexture2D(I,0),D.copyTexSubImage2D(D.TEXTURE_2D,O,0,0,b.x,b.y,U,ne),de.unbindTexture()},this.copyTextureToTexture=function(b,I,O,B=0){const U=I.image.width,ne=I.image.height,ge=he.convert(O.format),Me=he.convert(O.type);T.setTexture2D(O,0),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,O.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,O.unpackAlignment),I.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,B,b.x,b.y,U,ne,ge,Me,I.image.data):I.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,B,b.x,b.y,I.mipmaps[0].width,I.mipmaps[0].height,ge,I.mipmaps[0].data):D.texSubImage2D(D.TEXTURE_2D,B,b.x,b.y,ge,Me,I.image),B===0&&O.generateMipmaps&&D.generateMipmap(D.TEXTURE_2D),de.unbindTexture()},this.copyTextureToTexture3D=function(b,I,O,B,U=0){if(y.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ne=b.max.x-b.min.x+1,ge=b.max.y-b.min.y+1,Me=b.max.z-b.min.z+1,Te=he.convert(B.format),Ge=he.convert(B.type);let De;if(B.isData3DTexture)T.setTexture3D(B,0),De=D.TEXTURE_3D;else if(B.isDataArrayTexture||B.isCompressedArrayTexture)T.setTexture2DArray(B,0),De=D.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,B.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,B.unpackAlignment);const Oe=D.getParameter(D.UNPACK_ROW_LENGTH),xt=D.getParameter(D.UNPACK_IMAGE_HEIGHT),ht=D.getParameter(D.UNPACK_SKIP_PIXELS),Bt=D.getParameter(D.UNPACK_SKIP_ROWS),ai=D.getParameter(D.UNPACK_SKIP_IMAGES),ot=O.isCompressedTexture?O.mipmaps[U]:O.image;D.pixelStorei(D.UNPACK_ROW_LENGTH,ot.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ot.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,b.min.x),D.pixelStorei(D.UNPACK_SKIP_ROWS,b.min.y),D.pixelStorei(D.UNPACK_SKIP_IMAGES,b.min.z),O.isDataTexture||O.isData3DTexture?D.texSubImage3D(De,U,I.x,I.y,I.z,ne,ge,Me,Te,Ge,ot.data):O.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),D.compressedTexSubImage3D(De,U,I.x,I.y,I.z,ne,ge,Me,Te,ot.data)):D.texSubImage3D(De,U,I.x,I.y,I.z,ne,ge,Me,Te,Ge,ot),D.pixelStorei(D.UNPACK_ROW_LENGTH,Oe),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,xt),D.pixelStorei(D.UNPACK_SKIP_PIXELS,ht),D.pixelStorei(D.UNPACK_SKIP_ROWS,Bt),D.pixelStorei(D.UNPACK_SKIP_IMAGES,ai),U===0&&B.generateMipmaps&&D.generateMipmap(De),de.unbindTexture()},this.initTexture=function(b){b.isCubeTexture?T.setTextureCube(b,0):b.isData3DTexture?T.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?T.setTexture2DArray(b,0):T.setTexture2D(b,0),de.unbindTexture()},this.resetState=function(){C=0,w=0,R=null,de.reset(),Pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return fi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===ma?"display-p3":"srgb",t.unpackColorSpace=qe.workingColorSpace===$n?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===at?Xi:Ql}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Xi?at:_t}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class dg extends yc{}dg.prototype.isWebGL1Renderer=!0;class xa{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new xe(e),this.near=t,this.far=i}clone(){return new xa(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class pg extends it{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class mg{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=ta,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Zt()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,n=this.stride;s<n;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Zt()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Zt()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const wt=new _;class Sa{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix4(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.applyNormalMatrix(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.transformDirection(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}setX(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=ti(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=ti(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=ti(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=ti(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Je(t,this.array),i=Je(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Je(t,this.array),i=Je(i,this.array),s=Je(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Je(t,this.array),i=Je(i,this.array),s=Je(s,this.array),n=Je(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=n,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let n=0;n<this.itemSize;n++)t.push(this.data.array[s+n])}return new Tt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Sa(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let n=0;n<this.itemSize;n++)t.push(this.data.array[s+n])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const cl=new _,hl=new Ze,ul=new Ze,fg=new _,dl=new Fe,Cn=new _,Or=new si,pl=new Fe,Fr=new tn;class gg extends Xe{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Ka,this.bindMatrix=new Fe,this.bindMatrixInverse=new Fe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Ot),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,Cn),this.boundingBox.expandByPoint(Cn)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new si),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,Cn),this.boundingSphere.expandByPoint(Cn)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const i=this.material,s=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Or.copy(this.boundingSphere),Or.applyMatrix4(s),e.ray.intersectsSphere(Or)!==!1&&(pl.copy(s).invert(),Fr.copy(e.ray).applyMatrix4(pl),!(this.boundingBox!==null&&Fr.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Fr)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Ze,t=this.geometry.attributes.skinWeight;for(let i=0,s=t.count;i<s;i++){e.fromBufferAttribute(t,i);const n=1/e.manhattanLength();n!==1/0?e.multiplyScalar(n):e.set(1,0,0,0),t.setXYZW(i,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Ka?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Mh?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const i=this.skeleton,s=this.geometry;hl.fromBufferAttribute(s.attributes.skinIndex,e),ul.fromBufferAttribute(s.attributes.skinWeight,e),cl.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let n=0;n<4;n++){const a=ul.getComponent(n);if(a!==0){const o=hl.getComponent(n);dl.multiplyMatrices(i.bones[o].matrixWorld,i.boneInverses[o]),t.addScaledVector(fg.copy(cl).applyMatrix4(dl),a)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,t)}}class xc extends it{constructor(){super(),this.isBone=!0,this.type="Bone"}}class _g extends yt{constructor(e=null,t=1,i=1,s,n,a,o,l,c=gt,h=gt,u,d){super(null,a,o,l,c,h,s,n,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ml=new Fe,vg=new Fe;class Ma{constructor(e=[],t=[]){this.uuid=Zt(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,s=this.bones.length;i<s;i++)this.boneInverses.push(new Fe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const i=new Fe;this.bones[e]&&i.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const i=this.bones[e];i&&i.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const i=this.bones[e];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){const e=this.bones,t=this.boneInverses,i=this.boneMatrices,s=this.boneTexture;for(let n=0,a=e.length;n<a;n++){const o=e[n]?e[n].matrixWorld:vg;ml.multiplyMatrices(o,t[n]),ml.toArray(i,n*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new Ma(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const i=new _g(t,e,e,Wt,mi);return i.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=i,this}getBoneByName(e){for(let t=0,i=this.bones.length;t<i;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let i=0,s=e.bones.length;i<s;i++){const n=e.bones[i];let a=t[n];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",n),a=new xc),this.bones.push(a),this.boneInverses.push(new Fe().fromArray(e.boneInverses[i]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,i=this.boneInverses;for(let s=0,n=t.length;s<n;s++){const a=t[s];e.bones.push(a.uuid);const o=i[s];e.boneInverses.push(o.toArray())}return e}}class ra extends Tt{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const fs=new Fe,fl=new Fe,Pn=[],gl=new Ot,yg=new Fe,Gs=new Xe,Vs=new si;class xg extends Xe{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ra(new Float32Array(i*16),16),this.instanceColor=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,yg)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ot),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,fs),gl.copy(e.boundingBox).applyMatrix4(fs),this.boundingBox.union(gl)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new si),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,fs),Vs.copy(e.boundingSphere).applyMatrix4(fs),this.boundingSphere.union(Vs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const i=this.matrixWorld,s=this.count;if(Gs.geometry=this.geometry,Gs.material=this.material,Gs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Vs.copy(this.boundingSphere),Vs.applyMatrix4(i),e.ray.intersectsSphere(Vs)!==!1))for(let n=0;n<s;n++){this.getMatrixAt(n,fs),fl.multiplyMatrices(i,fs),Gs.matrixWorld=fl,Gs.raycast(e,Pn);for(let a=0,o=Pn.length;a<o;a++){const l=Pn[a];l.instanceId=n,l.object=this,t.push(l)}Pn.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ra(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class sn extends ii{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new xe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const _l=new _,vl=new _,yl=new Fe,Br=new tn,In=new si;class tr extends it{constructor(e=new vt,t=new sn){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,n=t.count;s<n;s++)_l.fromBufferAttribute(t,s-1),vl.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=_l.distanceTo(vl);e.setAttribute("lineDistance",new st(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,n=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),In.copy(i.boundingSphere),In.applyMatrix4(s),In.radius+=n,e.ray.intersectsSphere(In)===!1)return;yl.copy(s).invert(),Br.copy(e.ray).applyMatrix4(yl);const o=n/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=new _,h=new _,u=new _,d=new _,p=this.isLineSegments?2:1,g=i.index,v=i.attributes.position;if(g!==null){const f=Math.max(0,a.start),m=Math.min(g.count,a.start+a.count);for(let S=f,y=m-1;S<y;S+=p){const A=g.getX(S),C=g.getX(S+1);if(c.fromBufferAttribute(v,A),h.fromBufferAttribute(v,C),Br.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);const w=e.ray.origin.distanceTo(d);w<e.near||w>e.far||t.push({distance:w,point:u.clone().applyMatrix4(this.matrixWorld),index:S,face:null,faceIndex:null,object:this})}}else{const f=Math.max(0,a.start),m=Math.min(v.count,a.start+a.count);for(let S=f,y=m-1;S<y;S+=p){if(c.fromBufferAttribute(v,S),h.fromBufferAttribute(v,S+1),Br.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);const A=e.ray.origin.distanceTo(d);A<e.near||A>e.far||t.push({distance:A,point:u.clone().applyMatrix4(this.matrixWorld),index:S,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){const i=e[t[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,n=i.length;s<n;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}const xl=new _,Sl=new _;class ba extends tr{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let s=0,n=t.count;s<n;s+=2)xl.fromBufferAttribute(t,s),Sl.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+xl.distanceTo(Sl);e.setAttribute("lineDistance",new st(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Sg extends tr{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Ta extends ii{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new xe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Ml=new Fe,aa=new tn,Un=new si,Nn=new _;class Sc extends it{constructor(e=new vt,t=new Ta){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,n=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Un.copy(i.boundingSphere),Un.applyMatrix4(s),Un.radius+=n,e.ray.intersectsSphere(Un)===!1)return;Ml.copy(s).invert(),aa.copy(e.ray).applyMatrix4(Ml);const o=n/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,h=i.attributes.position;if(c!==null){const u=Math.max(0,a.start),d=Math.min(c.count,a.start+a.count);for(let p=u,g=d;p<g;p++){const v=c.getX(p);Nn.fromBufferAttribute(h,v),bl(Nn,v,l,s,e,t,this)}}else{const u=Math.max(0,a.start),d=Math.min(h.count,a.start+a.count);for(let p=u,g=d;p<g;p++)Nn.fromBufferAttribute(h,p),bl(Nn,p,l,s,e,t,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){const i=e[t[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,n=i.length;s<n;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function bl(r,e,t,i,s,n,a){const o=aa.distanceSqToPoint(r);if(o<t){const l=new _;aa.closestPointToPoint(r,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;n.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,object:a})}}class ni{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,s=this.getPoint(0),n=0;t.push(0);for(let a=1;a<=e;a++)i=this.getPoint(a/e),n+=i.distanceTo(s),t.push(n),s=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const i=this.getLengths();let s=0;const n=i.length;let a;t?a=t:a=e*i[n-1];let o=0,l=n-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=i[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===a)return s/(n-1);const h=i[s],u=i[s+1]-h,d=(a-h)/u;return(s+d)/(n-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);const n=this.getPoint(i),a=this.getPoint(s),o=t||(n.isVector2?new le:new _);return o.copy(a).sub(n).normalize(),o}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t){const i=new _,s=[],n=[],a=[],o=new _,l=new Fe;for(let p=0;p<=e;p++){const g=p/e;s[p]=this.getTangentAt(g,new _)}n[0]=new _,a[0]=new _;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=c&&(c=h,i.set(1,0,0)),u<=c&&(c=u,i.set(0,1,0)),d<=c&&i.set(0,0,1),o.crossVectors(s[0],i).normalize(),n[0].crossVectors(s[0],o),a[0].crossVectors(s[0],n[0]);for(let p=1;p<=e;p++){if(n[p]=n[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(s[p-1],s[p]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(ut(s[p-1].dot(s[p]),-1,1));n[p].applyMatrix4(l.makeRotationAxis(o,g))}a[p].crossVectors(s[p],n[p])}if(t===!0){let p=Math.acos(ut(n[0].dot(n[e]),-1,1));p/=e,s[0].dot(o.crossVectors(n[0],n[e]))>0&&(p=-p);for(let g=1;g<=e;g++)n[g].applyMatrix4(l.makeRotationAxis(s[g],p*g)),a[g].crossVectors(s[g],n[g])}return{tangents:s,normals:n,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Ea extends ni{constructor(e=0,t=0,i=1,s=1,n=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=s,this.aStartAngle=n,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t){const i=t||new le,s=Math.PI*2;let n=this.aEndAngle-this.aStartAngle;const a=Math.abs(n)<Number.EPSILON;for(;n<0;)n+=s;for(;n>s;)n-=s;n<Number.EPSILON&&(a?n=0:n=s),this.aClockwise===!0&&!a&&(n===s?n=-s:n=n-s);const o=this.aStartAngle+e*n;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,p=c-this.aY;l=d*h-p*u+this.aX,c=d*u+p*h+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Mg extends Ea{constructor(e,t,i,s,n,a){super(e,t,i,i,s,n,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Aa(){let r=0,e=0,t=0,i=0;function s(n,a,o,l){r=n,e=o,t=-3*n+3*a-2*o-l,i=2*n-2*a+o+l}return{initCatmullRom:function(n,a,o,l,c){s(a,o,c*(o-n),c*(l-a))},initNonuniformCatmullRom:function(n,a,o,l,c,h,u){let d=(a-n)/c-(o-n)/(c+h)+(o-a)/h,p=(o-a)/h-(l-a)/(h+u)+(l-o)/u;d*=h,p*=h,s(a,o,d,p)},calc:function(n){const a=n*n,o=a*n;return r+e*n+t*a+i*o}}}const Dn=new _,zr=new Aa,kr=new Aa,Hr=new Aa;class bg extends ni{constructor(e=[],t=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=s}getPoint(e,t=new _){const i=t,s=this.points,n=s.length,a=(n-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/n)+1)*n:l===0&&o===n-1&&(o=n-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%n]:(Dn.subVectors(s[0],s[1]).add(s[0]),c=Dn);const u=s[o%n],d=s[(o+1)%n];if(this.closed||o+2<n?h=s[(o+2)%n]:(Dn.subVectors(s[n-1],s[n-2]).add(s[n-1]),h=Dn),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),p),v=Math.pow(u.distanceToSquared(d),p),f=Math.pow(d.distanceToSquared(h),p);v<1e-4&&(v=1),g<1e-4&&(g=v),f<1e-4&&(f=v),zr.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,v,f),kr.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,v,f),Hr.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,v,f)}else this.curveType==="catmullrom"&&(zr.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),kr.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Hr.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return i.set(zr.calc(l),kr.calc(l),Hr.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new _().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Tl(r,e,t,i,s){const n=(i-e)*.5,a=(s-t)*.5,o=r*r,l=r*o;return(2*t-2*i+n+a)*l+(-3*t+3*i-2*n-a)*o+n*r+t}function Tg(r,e){const t=1-r;return t*t*e}function Eg(r,e){return 2*(1-r)*r*e}function Ag(r,e){return r*r*e}function Ys(r,e,t,i){return Tg(r,e)+Eg(r,t)+Ag(r,i)}function wg(r,e){const t=1-r;return t*t*t*e}function Rg(r,e){const t=1-r;return 3*t*t*r*e}function Lg(r,e){return 3*(1-r)*r*r*e}function Cg(r,e){return r*r*r*e}function Ks(r,e,t,i,s){return wg(r,e)+Rg(r,t)+Lg(r,i)+Cg(r,s)}class Mc extends ni{constructor(e=new le,t=new le,i=new le,s=new le){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new le){const i=t,s=this.v0,n=this.v1,a=this.v2,o=this.v3;return i.set(Ks(e,s.x,n.x,a.x,o.x),Ks(e,s.y,n.y,a.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Pg extends ni{constructor(e=new _,t=new _,i=new _,s=new _){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new _){const i=t,s=this.v0,n=this.v1,a=this.v2,o=this.v3;return i.set(Ks(e,s.x,n.x,a.x,o.x),Ks(e,s.y,n.y,a.y,o.y),Ks(e,s.z,n.z,a.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class bc extends ni{constructor(e=new le,t=new le){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new le){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new le){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ig extends ni{constructor(e=new _,t=new _){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new _){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new _){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Tc extends ni{constructor(e=new le,t=new le,i=new le){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new le){const i=t,s=this.v0,n=this.v1,a=this.v2;return i.set(Ys(e,s.x,n.x,a.x),Ys(e,s.y,n.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ug extends ni{constructor(e=new _,t=new _,i=new _){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new _){const i=t,s=this.v0,n=this.v1,a=this.v2;return i.set(Ys(e,s.x,n.x,a.x),Ys(e,s.y,n.y,a.y),Ys(e,s.z,n.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ec extends ni{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new le){const i=t,s=this.points,n=(s.length-1)*e,a=Math.floor(n),o=n-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],u=s[a>s.length-3?s.length-1:a+2];return i.set(Tl(o,l.x,c.x,h.x,u.x),Tl(o,l.y,c.y,h.y,u.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new le().fromArray(s))}return this}}var El=Object.freeze({__proto__:null,ArcCurve:Mg,CatmullRomCurve3:bg,CubicBezierCurve:Mc,CubicBezierCurve3:Pg,EllipseCurve:Ea,LineCurve:bc,LineCurve3:Ig,QuadraticBezierCurve:Tc,QuadraticBezierCurve3:Ug,SplineCurve:Ec});class Ng extends ni{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new El[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),s=this.getCurveLengths();let n=0;for(;n<s.length;){if(s[n]>=i){const a=s[n]-i,o=this.curves[n],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}n++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,s=this.curves.length;i<s;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let s=0,n=this.curves;s<n.length;s++){const a=n[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];i&&i.equals(h)||(t.push(h),i=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const s=e.curves[t];this.curves.push(new El[s.type]().fromJSON(s))}return this}}class Dg extends Ng{constructor(e){super(),this.type="Path",this.currentPoint=new le,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new bc(this.currentPoint.clone(),new le(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,s){const n=new Tc(this.currentPoint.clone(),new le(e,t),new le(i,s));return this.curves.push(n),this.currentPoint.set(i,s),this}bezierCurveTo(e,t,i,s,n,a){const o=new Mc(this.currentPoint.clone(),new le(e,t),new le(i,s),new le(n,a));return this.curves.push(o),this.currentPoint.set(n,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new Ec(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,s,n,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,i,s,n,a),this}absarc(e,t,i,s,n,a){return this.absellipse(e,t,i,i,s,n,a),this}ellipse(e,t,i,s,n,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,i,s,n,a,o,l),this}absellipse(e,t,i,s,n,a,o,l){const c=new Ea(e,t,i,s,n,a,o,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class wa extends vt{constructor(e=[new le(0,-.5),new le(.5,0),new le(0,.5)],t=12,i=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:i,phiLength:s},t=Math.floor(t),s=ut(s,0,Math.PI*2);const n=[],a=[],o=[],l=[],c=[],h=1/t,u=new _,d=new le,p=new _,g=new _,v=new _;let f=0,m=0;for(let S=0;S<=e.length-1;S++)switch(S){case 0:f=e[S+1].x-e[S].x,m=e[S+1].y-e[S].y,p.x=m*1,p.y=-f,p.z=m*0,v.copy(p),p.normalize(),l.push(p.x,p.y,p.z);break;case e.length-1:l.push(v.x,v.y,v.z);break;default:f=e[S+1].x-e[S].x,m=e[S+1].y-e[S].y,p.x=m*1,p.y=-f,p.z=m*0,g.copy(p),p.x+=v.x,p.y+=v.y,p.z+=v.z,p.normalize(),l.push(p.x,p.y,p.z),v.copy(g)}for(let S=0;S<=t;S++){const y=i+S*h*s,A=Math.sin(y),C=Math.cos(y);for(let w=0;w<=e.length-1;w++){u.x=e[w].x*A,u.y=e[w].y,u.z=e[w].x*C,a.push(u.x,u.y,u.z),d.x=S/t,d.y=w/(e.length-1),o.push(d.x,d.y);const R=l[3*w+0]*A,G=l[3*w+1],M=l[3*w+0]*C;c.push(R,G,M)}}for(let S=0;S<t;S++)for(let y=0;y<e.length-1;y++){const A=y+S*e.length,C=A,w=A+e.length,R=A+e.length+1,G=A+1;n.push(C,w,G),n.push(R,G,w)}this.setIndex(n),this.setAttribute("position",new st(a,3)),this.setAttribute("uv",new st(o,2)),this.setAttribute("normal",new st(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wa(e.points,e.segments,e.phiStart,e.phiLength)}}class Ra extends wa{constructor(e=1,t=1,i=4,s=8){const n=new Dg;n.absarc(0,-t/2,e,Math.PI*1.5,0),n.absarc(0,t/2,e,0,Math.PI*.5),super(n.getPoints(i),s),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:i,radialSegments:s}}static fromJSON(e){return new Ra(e.radius,e.length,e.capSegments,e.radialSegments)}}class La extends vt{constructor(e=1,t=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:s},t=Math.max(3,t);const n=[],a=[],o=[],l=[],c=new _,h=new le;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){const p=i+u/t*s;c.x=e*Math.cos(p),c.y=e*Math.sin(p),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)n.push(u,u+1,0);this.setIndex(n),this.setAttribute("position",new st(a,3)),this.setAttribute("normal",new st(o,3)),this.setAttribute("uv",new st(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new La(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Ps extends vt{constructor(e=1,t=1,i=1,s=32,n=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:n,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),n=Math.floor(n);const h=[],u=[],d=[],p=[];let g=0;const v=[],f=i/2;let m=0;S(),a===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new st(u,3)),this.setAttribute("normal",new st(d,3)),this.setAttribute("uv",new st(p,2));function S(){const A=new _,C=new _;let w=0;const R=(t-e)/i;for(let G=0;G<=n;G++){const M=[],E=G/n,H=E*(t-e)+e;for(let k=0;k<=s;k++){const ee=k/s,P=ee*l+o,F=Math.sin(P),V=Math.cos(P);C.x=H*F,C.y=-E*i+f,C.z=H*V,u.push(C.x,C.y,C.z),A.set(F,R,V).normalize(),d.push(A.x,A.y,A.z),p.push(ee,1-E),M.push(g++)}v.push(M)}for(let G=0;G<s;G++)for(let M=0;M<n;M++){const E=v[M][G],H=v[M+1][G],k=v[M+1][G+1],ee=v[M][G+1];h.push(E,H,ee),h.push(H,k,ee),w+=6}c.addGroup(m,w,0),m+=w}function y(A){const C=g,w=new le,R=new _;let G=0;const M=A===!0?e:t,E=A===!0?1:-1;for(let k=1;k<=s;k++)u.push(0,f*E,0),d.push(0,E,0),p.push(.5,.5),g++;const H=g;for(let k=0;k<=s;k++){const ee=k/s*l+o,P=Math.cos(ee),F=Math.sin(ee);R.x=M*F,R.y=f*E,R.z=M*P,u.push(R.x,R.y,R.z),d.push(0,E,0),w.x=P*.5+.5,w.y=F*.5*E+.5,p.push(w.x,w.y),g++}for(let k=0;k<s;k++){const ee=C+k,P=H+k;A===!0?h.push(P,P+1,ee):h.push(P+1,P,ee),G+=3}c.addGroup(m,G,A===!0?1:2),m+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ps(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}const On=new _,Fn=new _,Gr=new _,Bn=new Gt;class Og extends vt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const i=Math.pow(10,4),s=Math.cos(Ss*t),n=e.getIndex(),a=e.getAttribute("position"),o=n?n.count:a.count,l=[0,0,0],c=["a","b","c"],h=new Array(3),u={},d=[];for(let p=0;p<o;p+=3){n?(l[0]=n.getX(p),l[1]=n.getX(p+1),l[2]=n.getX(p+2)):(l[0]=p,l[1]=p+1,l[2]=p+2);const{a:g,b:v,c:f}=Bn;if(g.fromBufferAttribute(a,l[0]),v.fromBufferAttribute(a,l[1]),f.fromBufferAttribute(a,l[2]),Bn.getNormal(Gr),h[0]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,h[1]=`${Math.round(v.x*i)},${Math.round(v.y*i)},${Math.round(v.z*i)}`,h[2]=`${Math.round(f.x*i)},${Math.round(f.y*i)},${Math.round(f.z*i)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let m=0;m<3;m++){const S=(m+1)%3,y=h[m],A=h[S],C=Bn[c[m]],w=Bn[c[S]],R=`${y}_${A}`,G=`${A}_${y}`;G in u&&u[G]?(Gr.dot(u[G].normal)<=s&&(d.push(C.x,C.y,C.z),d.push(w.x,w.y,w.z)),u[G]=null):R in u||(u[R]={index0:l[m],index1:l[S],normal:Gr.clone()})}}for(const p in u)if(u[p]){const{index0:g,index1:v}=u[p];On.fromBufferAttribute(a,g),Fn.fromBufferAttribute(a,v),d.push(On.x,On.y,On.z),d.push(Fn.x,Fn.y,Fn.z)}this.setAttribute("position",new st(d,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class en extends vt{constructor(e=1,t=32,i=16,s=0,n=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:n,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new _,d=new _,p=[],g=[],v=[],f=[];for(let m=0;m<=i;m++){const S=[],y=m/i;let A=0;m===0&&a===0?A=.5/t:m===i&&l===Math.PI&&(A=-.5/t);for(let C=0;C<=t;C++){const w=C/t;u.x=-e*Math.cos(s+w*n)*Math.sin(a+y*o),u.y=e*Math.cos(a+y*o),u.z=e*Math.sin(s+w*n)*Math.sin(a+y*o),g.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),f.push(w+A,1-y),S.push(c++)}h.push(S)}for(let m=0;m<i;m++)for(let S=0;S<t;S++){const y=h[m][S+1],A=h[m][S],C=h[m+1][S],w=h[m+1][S+1];(m!==0||a>0)&&p.push(y,A,w),(m!==i-1||l<Math.PI)&&p.push(A,C,w)}this.setIndex(p),this.setAttribute("position",new st(g,3)),this.setAttribute("normal",new st(v,3)),this.setAttribute("uv",new st(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new en(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ft extends ii{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new xe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ec,this.normalScale=new le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class _i extends ft{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new le(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ut(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new xe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new xe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new xe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}function zn(r,e,t){return!r||r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function Fg(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function Bg(r){function e(s,n){return r[s]-r[n]}const t=r.length,i=new Array(t);for(let s=0;s!==t;++s)i[s]=s;return i.sort(e),i}function Al(r,e,t){const i=r.length,s=new r.constructor(i);for(let n=0,a=0;a!==i;++n){const o=t[n]*e;for(let l=0;l!==e;++l)s[a++]=r[o+l]}return s}function Ac(r,e,t,i){let s=1,n=r[0];for(;n!==void 0&&n[i]===void 0;)n=r[s++];if(n===void 0)return;let a=n[i];if(a!==void 0)if(Array.isArray(a))do a=n[i],a!==void 0&&(e.push(n.time),t.push.apply(t,a)),n=r[s++];while(n!==void 0);else if(a.toArray!==void 0)do a=n[i],a!==void 0&&(e.push(n.time),a.toArray(t,t.length)),n=r[s++];while(n!==void 0);else do a=n[i],a!==void 0&&(e.push(n.time),t.push(a)),n=r[s++];while(n!==void 0)}class nn{constructor(e,t,i,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let i=this._cachedIndex,s=t[i],n=t[i-1];e:{t:{let a;i:{s:if(!(e<s)){for(let o=i+2;;){if(s===void 0){if(e<n)break s;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(n=s,s=t[++i],e<s)break t}a=t.length;break i}if(!(e>=n)){const o=t[1];e<o&&(i=2,n=o);for(let l=i-2;;){if(n===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=n,n=t[--i-1],e>=n)break t}a=i,i=0;break i}break e}for(;i<a;){const o=i+a>>>1;e<t[o]?a=o:i=o+1}if(s=t[i],n=t[i-1],n===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,n,s)}return this.interpolate_(i,n,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,n=e*s;for(let a=0;a!==s;++a)t[a]=i[n+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class zg extends nn{constructor(e,t,i,s){super(e,t,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:gs,endingEnd:gs}}intervalChanged_(e,t,i){const s=this.parameterPositions;let n=e-2,a=e+1,o=s[n],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case _s:n=e,o=2*t-i;break;case Xn:n=s.length-2,o=t+s[n]-s[n+1];break;default:n=e,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case _s:a=e,l=2*i-t;break;case Xn:a=1,l=i+s[1]-s[0];break;default:a=e-1,l=t}const c=(i-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-i),this._offsetPrev=n*h,this._offsetNext=a*h}interpolate_(e,t,i,s){const n=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,p=this._weightNext,g=(i-t)/(s-t),v=g*g,f=v*g,m=-d*f+2*d*v-d*g,S=(1+d)*f+(-1.5-2*d)*v+(-.5+d)*g+1,y=(-1-p)*f+(1.5+p)*v+.5*g,A=p*f-p*v;for(let C=0;C!==o;++C)n[C]=m*a[h+C]+S*a[c+C]+y*a[l+C]+A*a[u+C];return n}}class wc extends nn{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){const n=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(i-t)/(s-t),u=1-h;for(let d=0;d!==o;++d)n[d]=a[c+d]*u+a[l+d]*h;return n}}class kg extends nn{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class ri{constructor(e,t,i,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=zn(t,this.TimeBufferType),this.values=zn(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:zn(e.times,Array),values:zn(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(i.interpolation=s)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new kg(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new wc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new zg(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case $s:t=this.InterpolantFactoryMethodDiscrete;break;case ws:t=this.InterpolantFactoryMethodLinear;break;case dr:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return $s;case this.InterpolantFactoryMethodLinear:return ws;case this.InterpolantFactoryMethodSmooth:return dr}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]*=e}return this}trim(e,t){const i=this.times,s=i.length;let n=0,a=s-1;for(;n!==s&&i[n]<e;)++n;for(;a!==-1&&i[a]>t;)--a;if(++a,n!==0||a!==s){n>=a&&(a=Math.max(a,1),n=a-1);const o=this.getValueSize();this.times=i.slice(n,a),this.values=this.values.slice(n*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const i=this.times,s=this.values,n=i.length;n===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==n;o++){const l=i[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&Fg(s))for(let o=0,l=s.length;o!==l;++o){const c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===dr,n=e.length-1;let a=1;for(let o=1;o<n;++o){let l=!1;const c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(s)l=!0;else{const u=o*i,d=u-i,p=u+i;for(let g=0;g!==i;++g){const v=t[u+g];if(v!==t[d+g]||v!==t[p+g]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const u=o*i,d=a*i;for(let p=0;p!==i;++p)t[d+p]=t[u+p]}++a}}if(n>0){e[a]=e[n];for(let o=n*i,l=a*i,c=0;c!==i;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*i)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),i=this.constructor,s=new i(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}ri.prototype.TimeBufferType=Float32Array;ri.prototype.ValueBufferType=Float32Array;ri.prototype.DefaultInterpolation=ws;class Ds extends ri{}Ds.prototype.ValueTypeName="bool";Ds.prototype.ValueBufferType=Array;Ds.prototype.DefaultInterpolation=$s;Ds.prototype.InterpolantFactoryMethodLinear=void 0;Ds.prototype.InterpolantFactoryMethodSmooth=void 0;class Rc extends ri{}Rc.prototype.ValueTypeName="color";class Is extends ri{}Is.prototype.ValueTypeName="number";class Hg extends nn{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){const n=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-t)/(s-t);let c=e*o;for(let h=c+o;c!==h;c+=4)Ut.slerpFlat(n,0,a,c-o,a,c,l);return n}}class Ji extends ri{InterpolantFactoryMethodLinear(e){return new Hg(this.times,this.values,this.getValueSize(),e)}}Ji.prototype.ValueTypeName="quaternion";Ji.prototype.DefaultInterpolation=ws;Ji.prototype.InterpolantFactoryMethodSmooth=void 0;class Os extends ri{}Os.prototype.ValueTypeName="string";Os.prototype.ValueBufferType=Array;Os.prototype.DefaultInterpolation=$s;Os.prototype.InterpolantFactoryMethodLinear=void 0;Os.prototype.InterpolantFactoryMethodSmooth=void 0;class Us extends ri{}Us.prototype.ValueTypeName="vector";class oa{constructor(e,t=-1,i,s=pa){this.name=e,this.tracks=i,this.duration=t,this.blendMode=s,this.uuid=Zt(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],i=e.tracks,s=1/(e.fps||1);for(let a=0,o=i.length;a!==o;++a)t.push(Vg(i[a]).scale(s));const n=new this(e.name,e.duration,t,e.blendMode);return n.uuid=e.uuid,n}static toJSON(e){const t=[],i=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let n=0,a=i.length;n!==a;++n)t.push(ri.toJSON(i[n]));return s}static CreateFromMorphTargetSequence(e,t,i,s){const n=t.length,a=[];for(let o=0;o<n;o++){let l=[],c=[];l.push((o+n-1)%n,o,(o+1)%n),c.push(0,1,0);const h=Bg(l);l=Al(l,1,h),c=Al(c,1,h),!s&&l[0]===0&&(l.push(n),c.push(c[0])),a.push(new Is(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/i))}return new this(e,-1,a)}static findByName(e,t){let i=e;if(!Array.isArray(e)){const s=e;i=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<i.length;s++)if(i[s].name===t)return i[s];return null}static CreateClipsFromMorphTargetSequences(e,t,i){const s={},n=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],h=c.name.match(n);if(h&&h.length>1){const u=h[1];let d=s[u];d||(s[u]=d=[]),d.push(c)}}const a=[];for(const o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,i));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const i=function(h,u,d,p,g){if(d.length!==0){const v=[],f=[];Ac(d,v,f,p),v.length!==0&&g.push(new h(u,v,f))}},s=[],n=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let h=0;h<c.length;h++){const u=c[h].keys;if(!(!u||u.length===0))if(u[0].morphTargets){const d={};let p;for(p=0;p<u.length;p++)if(u[p].morphTargets)for(let g=0;g<u[p].morphTargets.length;g++)d[u[p].morphTargets[g]]=-1;for(const g in d){const v=[],f=[];for(let m=0;m!==u[p].morphTargets.length;++m){const S=u[p];v.push(S.time),f.push(S.morphTarget===g?1:0)}s.push(new Is(".morphTargetInfluence["+g+"]",v,f))}l=d.length*a}else{const d=".bones["+t[h].name+"]";i(Us,d+".position",u,"pos",s),i(Ji,d+".quaternion",u,"rot",s),i(Us,d+".scale",u,"scl",s)}}return s.length===0?null:new this(n,l,s,o)}resetDuration(){const e=this.tracks;let t=0;for(let i=0,s=e.length;i!==s;++i){const n=this.tracks[i];t=Math.max(t,n.times[n.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function Gg(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Is;case"vector":case"vector2":case"vector3":case"vector4":return Us;case"color":return Rc;case"quaternion":return Ji;case"bool":case"boolean":return Ds;case"string":return Os}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function Vg(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Gg(r.type);if(r.times===void 0){const t=[],i=[];Ac(r.keys,t,i,"value"),r.times=t,r.values=i}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const Ai={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class Lc{constructor(e,t,i){const s=this;let n=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.itemStart=function(h){o++,n===!1&&s.onStart!==void 0&&s.onStart(h,a,o),n=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(n=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const p=c[u],g=c[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null}}}const Wg=new Lc;class $i{constructor(e){this.manager=e!==void 0?e:Wg,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const i=this;return new Promise(function(s,n){i.load(e,s,t,n)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}$i.DEFAULT_MATERIAL_NAME="__DEFAULT";const di={};class Xg extends Error{constructor(e,t){super(e),this.response=t}}class Ca extends $i{constructor(e){super(e)}load(e,t,i,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const n=Ai.get(e);if(n!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(n),this.manager.itemEnd(e)},0),n;if(di[e]!==void 0){di[e].push({onLoad:t,onProgress:i,onError:s});return}di[e]=[],di[e].push({onLoad:t,onProgress:i,onError:s});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=di[e],u=c.body.getReader(),d=c.headers.get("Content-Length")||c.headers.get("X-File-Size"),p=d?parseInt(d):0,g=p!==0;let v=0;const f=new ReadableStream({start(m){S();function S(){u.read().then(({done:y,value:A})=>{if(y)m.close();else{v+=A.byteLength;const C=new ProgressEvent("progress",{lengthComputable:g,loaded:v,total:p});for(let w=0,R=h.length;w<R;w++){const G=h[w];G.onProgress&&G.onProgress(C)}m.enqueue(A),S()}})}}});return new Response(f)}else throw new Xg(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o===void 0)return c.text();{const h=/charset="?([^;"\s]*)"?/i.exec(o),u=h&&h[1]?h[1].toLowerCase():void 0,d=new TextDecoder(u);return c.arrayBuffer().then(p=>d.decode(p))}}}).then(c=>{Ai.add(e,c);const h=di[e];delete di[e];for(let u=0,d=h.length;u<d;u++){const p=h[u];p.onLoad&&p.onLoad(c)}}).catch(c=>{const h=di[e];if(h===void 0)throw this.manager.itemError(e),c;delete di[e];for(let u=0,d=h.length;u<d;u++){const p=h[u];p.onError&&p.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class jg extends $i{constructor(e){super(e)}load(e,t,i,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const n=this,a=Ai.get(e);if(a!==void 0)return n.manager.itemStart(e),setTimeout(function(){t&&t(a),n.manager.itemEnd(e)},0),a;const o=Qs("img");function l(){h(),Ai.add(e,this),t&&t(this),n.manager.itemEnd(e)}function c(u){h(),s&&s(u),n.manager.itemError(e),n.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),n.manager.itemStart(e),o.src=e,o}}class Cc extends $i{constructor(e){super(e)}load(e,t,i,s){const n=new yt,a=new jg(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){n.image=o,n.needsUpdate=!0,t!==void 0&&t(n)},i,s),n}}class rn extends it{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new xe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class qg extends rn{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(it.DEFAULT_UP),this.updateMatrix(),this.groundColor=new xe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Vr=new Fe,wl=new _,Rl=new _;class Pa{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new le(512,512),this.map=null,this.mapPass=null,this.matrix=new Fe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new _a,this._frameExtents=new le(1,1),this._viewportCount=1,this._viewports=[new Ze(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;wl.setFromMatrixPosition(e.matrixWorld),t.position.copy(wl),Rl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Rl),t.updateMatrixWorld(),Vr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Vr),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Vr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Yg extends Pa{constructor(){super(new Ct(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,i=Rs*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,n=e.distance||t.far;(i!==t.fov||s!==t.aspect||n!==t.far)&&(t.fov=i,t.aspect=s,t.far=n,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Kg extends rn{constructor(e,t,i=0,s=Math.PI/3,n=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(it.DEFAULT_UP),this.updateMatrix(),this.target=new it,this.distance=i,this.angle=s,this.penumbra=n,this.decay=a,this.map=null,this.shadow=new Yg}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Ll=new Fe,Ws=new _,Wr=new _;class Jg extends Pa{constructor(){super(new Ct(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new le(4,2),this._viewportCount=6,this._viewports=[new Ze(2,1,1,1),new Ze(0,1,1,1),new Ze(3,1,1,1),new Ze(1,1,1,1),new Ze(3,0,1,1),new Ze(1,0,1,1)],this._cubeDirections=[new _(1,0,0),new _(-1,0,0),new _(0,0,1),new _(0,0,-1),new _(0,1,0),new _(0,-1,0)],this._cubeUps=[new _(0,1,0),new _(0,1,0),new _(0,1,0),new _(0,1,0),new _(0,0,1),new _(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,s=this.matrix,n=e.distance||i.far;n!==i.far&&(i.far=n,i.updateProjectionMatrix()),Ws.setFromMatrixPosition(e.matrixWorld),i.position.copy(Ws),Wr.copy(i.position),Wr.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(Wr),i.updateMatrixWorld(),s.makeTranslation(-Ws.x,-Ws.y,-Ws.z),Ll.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ll)}}class Pc extends rn{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new Jg}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Zg extends Pa{constructor(){super(new va(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ic extends rn{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(it.DEFAULT_UP),this.updateMatrix(),this.target=new it,this.shadow=new Zg}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class $g extends rn{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Js{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let i=0,s=e.length;i<s;i++)t+=String.fromCharCode(e[i]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class Qg extends $i{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,i,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const n=this,a=Ai.get(e);if(a!==void 0){if(n.manager.itemStart(e),a.then){a.then(c=>{t&&t(c),n.manager.itemEnd(e)}).catch(c=>{s&&s(c)});return}return setTimeout(function(){t&&t(a),n.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;const l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(n.options,{colorSpaceConversion:"none"}))}).then(function(c){return Ai.add(e,c),t&&t(c),n.manager.itemEnd(e),c}).catch(function(c){s&&s(c),Ai.remove(e),n.manager.itemError(e),n.manager.itemEnd(e)});Ai.add(e,l),n.manager.itemStart(e)}}let kn;class Uc{static getContext(){return kn===void 0&&(kn=new(window.AudioContext||window.webkitAudioContext)),kn}static setContext(e){kn=e}}class e_ extends $i{constructor(e){super(e)}load(e,t,i,s){const n=this,a=new Ca(this.manager);a.setResponseType("arraybuffer"),a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(l){try{const c=l.slice(0);Uc.getContext().decodeAudioData(c,function(h){t(h)}).catch(o)}catch(c){o(c)}},i,s);function o(l){s?s(l):console.error(l),n.manager.itemError(e)}}}class Nc{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Cl(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Cl();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Cl(){return(typeof performance>"u"?Date:performance).now()}const Oi=new _,Pl=new Ut,t_=new _,Fi=new _;class i_ extends it{constructor(){super(),this.type="AudioListener",this.context=Uc.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._clock=new Nc}getInput(){return this.gain}removeFilter(){return this.filter!==null&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(e){return this.filter!==null?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=e,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}updateMatrixWorld(e){super.updateMatrixWorld(e);const t=this.context.listener,i=this.up;if(this.timeDelta=this._clock.getDelta(),this.matrixWorld.decompose(Oi,Pl,t_),Fi.set(0,0,-1).applyQuaternion(Pl),t.positionX){const s=this.context.currentTime+this.timeDelta;t.positionX.linearRampToValueAtTime(Oi.x,s),t.positionY.linearRampToValueAtTime(Oi.y,s),t.positionZ.linearRampToValueAtTime(Oi.z,s),t.forwardX.linearRampToValueAtTime(Fi.x,s),t.forwardY.linearRampToValueAtTime(Fi.y,s),t.forwardZ.linearRampToValueAtTime(Fi.z,s),t.upX.linearRampToValueAtTime(i.x,s),t.upY.linearRampToValueAtTime(i.y,s),t.upZ.linearRampToValueAtTime(i.z,s)}else t.setPosition(Oi.x,Oi.y,Oi.z),t.setOrientation(Fi.x,Fi.y,Fi.z,i.x,i.y,i.z)}}class s_{constructor(e,t,i){this.binding=e,this.valueSize=i;let s,n,a;switch(t){case"quaternion":s=this._slerp,n=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(i*6),this._workIndex=5;break;case"string":case"bool":s=this._select,n=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(i*5);break;default:s=this._lerp,n=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(i*5)}this._mixBufferRegion=s,this._mixBufferRegionAdditive=n,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const i=this.buffer,s=this.valueSize,n=e*s+s;let a=this.cumulativeWeight;if(a===0){for(let o=0;o!==s;++o)i[n+o]=i[o];a=t}else{a+=t;const o=t/a;this._mixBufferRegion(i,n,0,o,s)}this.cumulativeWeight=a}accumulateAdditive(e){const t=this.buffer,i=this.valueSize,s=i*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,s,0,e,i),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,i=this.buffer,s=e*t+t,n=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,n<1){const l=t*this._origIndex;this._mixBufferRegion(i,s,l,1-n,t)}a>0&&this._mixBufferRegionAdditive(i,s,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(i[l]!==i[l+t]){o.setValue(i,s);break}}saveOriginalState(){const e=this.binding,t=this.buffer,i=this.valueSize,s=i*this._origIndex;e.getValue(t,s);for(let n=i,a=s;n!==a;++n)t[n]=t[s+n%i];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let i=e;i<t;i++)this.buffer[i]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let i=0;i<this.valueSize;i++)this.buffer[t+i]=this.buffer[e+i]}_select(e,t,i,s,n){if(s>=.5)for(let a=0;a!==n;++a)e[t+a]=e[i+a]}_slerp(e,t,i,s){Ut.slerpFlat(e,t,e,t,e,i,s)}_slerpAdditive(e,t,i,s,n){const a=this._workIndex*n;Ut.multiplyQuaternionsFlat(e,a,e,t,e,i),Ut.slerpFlat(e,t,e,t,e,a,s)}_lerp(e,t,i,s,n){const a=1-s;for(let o=0;o!==n;++o){const l=t+o;e[l]=e[l]*a+e[i+o]*s}}_lerpAdditive(e,t,i,s,n){for(let a=0;a!==n;++a){const o=t+a;e[o]=e[o]+e[i+a]*s}}}const Ia="\\[\\]\\.:\\/",n_=new RegExp("["+Ia+"]","g"),Ua="[^"+Ia+"]",r_="[^"+Ia.replace("\\.","")+"]",a_=/((?:WC+[\/:])*)/.source.replace("WC",Ua),o_=/(WCOD+)?/.source.replace("WCOD",r_),l_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ua),c_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ua),h_=new RegExp("^"+a_+o_+l_+c_+"$"),u_=["material","materials","bones","map"];class d_{constructor(e,t,i){const s=i||je.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(e,t)}setValue(e,t){const i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,n=i.length;s!==n;++s)i[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}}class je{constructor(e,t,i){this.path=t,this.parsedPath=i||je.parseTrackName(t),this.node=je.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new je.Composite(e,t,i):new je(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(n_,"")}static parseTrackName(e){const t=h_.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const n=i.nodeName.substring(s+1);u_.indexOf(n)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=n)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){const i=function(n){for(let a=0;a<n.length;a++){const o=n[a];if(o.name===t||o.uuid===t)return o;const l=i(o.children);if(l)return l}return null},s=i(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const i=this.resolvedProperty;for(let s=0,n=i.length;s!==n;++s)e[t++]=i[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const i=this.resolvedProperty;for(let s=0,n=i.length;s!==n;++s)i[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const i=this.resolvedProperty;for(let s=0,n=i.length;s!==n;++s)i[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const i=this.resolvedProperty;for(let s=0,n=i.length;s!==n;++s)i[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,i=t.objectName,s=t.propertyName;let n=t.propertyIndex;if(e||(e=je.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[s];if(a===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(n!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[n]!==void 0&&(n=e.morphTargetDictionary[n])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=n}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}je.Composite=d_;je.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};je.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};je.prototype.GetterByBindingType=[je.prototype._getValue_direct,je.prototype._getValue_array,je.prototype._getValue_arrayElement,je.prototype._getValue_toArray];je.prototype.SetterByBindingTypeAndVersioning=[[je.prototype._setValue_direct,je.prototype._setValue_direct_setNeedsUpdate,je.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[je.prototype._setValue_array,je.prototype._setValue_array_setNeedsUpdate,je.prototype._setValue_array_setMatrixWorldNeedsUpdate],[je.prototype._setValue_arrayElement,je.prototype._setValue_arrayElement_setNeedsUpdate,je.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[je.prototype._setValue_fromArray,je.prototype._setValue_fromArray_setNeedsUpdate,je.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class p_{constructor(e,t,i=null,s=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=i,this.blendMode=s;const n=t.tracks,a=n.length,o=new Array(a),l={endingStart:gs,endingEnd:gs};for(let c=0;c!==a;++c){const h=n[c].createInterpolant(null);o[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Ph,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,i){if(e.fadeOut(t),this.fadeIn(t),i){const s=this._clip.duration,n=e._clip.duration,a=n/s,o=s/n;e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,i){return e.crossFadeFrom(this,t,i)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,i){const s=this._mixer,n=s.time,a=this.timeScale;let o=this._timeScaleInterpolant;o===null&&(o=s._lendControlInterpolant(),this._timeScaleInterpolant=o);const l=o.parameterPositions,c=o.sampleValues;return l[0]=n,l[1]=n+i,c[0]=e/a,c[1]=t/a,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,i,s){if(!this.enabled){this._updateWeight(e);return}const n=this._startTime;if(n!==null){const l=(e-n)*i;l<0||i===0?t=0:(this._startTime=null,t=i*l)}t*=this._updateTimeScale(e);const a=this._updateTime(t),o=this._updateWeight(e);if(o>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Uh:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(a),c[h].accumulateAdditive(o);break;case pa:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(a),c[h].accumulate(s,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const i=this._weightInterpolant;if(i!==null){const s=i.evaluate(e)[0];t*=s,e>i.parameterPositions[1]&&(this.stopFading(),s===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const i=this._timeScaleInterpolant;if(i!==null){const s=i.evaluate(e)[0];t*=s,e>i.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,i=this.loop;let s=this.time+e,n=this._loopCount;const a=i===Ih;if(e===0)return n===-1?s:a&&(n&1)===1?t-s:s;if(i===Qr){n===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(s>=t)s=t;else if(s<0)s=0;else{this.time=s;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(n===-1&&(e>=0?(n=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),s>=t||s<0){const o=Math.floor(s/t);s-=t*o,n+=Math.abs(o);const l=this.repetitions-n;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,s=e>0?t:0,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,a)}else this._setEndings(!1,!1,a);this._loopCount=n,this.time=s,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this.time=s;if(a&&(n&1)===1)return t-s}return s}_setEndings(e,t,i){const s=this._interpolantSettings;i?(s.endingStart=_s,s.endingEnd=_s):(e?s.endingStart=this.zeroSlopeAtStart?_s:gs:s.endingStart=Xn,t?s.endingEnd=this.zeroSlopeAtEnd?_s:gs:s.endingEnd=Xn)}_scheduleFading(e,t,i){const s=this._mixer,n=s.time;let a=this._weightInterpolant;a===null&&(a=s._lendControlInterpolant(),this._weightInterpolant=a);const o=a.parameterPositions,l=a.sampleValues;return o[0]=n,l[0]=t,o[1]=n+e,l[1]=i,this}}const m_=new Float32Array(1);class Na extends Zi{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const i=e._localRoot||this._root,s=e._clip.tracks,n=s.length,a=e._propertyBindings,o=e._interpolants,l=i.uuid,c=this._bindingsByRootAndName;let h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==n;++u){const d=s[u],p=d.name;let g=h[p];if(g!==void 0)++g.referenceCount,a[u]=g;else{if(g=a[u],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,l,p));continue}const v=t&&t._propertyBindings[u].binding.parsedPath;g=new s_(je.create(i,p,v),d.ValueTypeName,d.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,l,p),a[u]=g}o[u].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const i=(e._localRoot||this._root).uuid,s=e._clip.uuid,n=this._actionsByClip[s];this._bindAction(e,n&&n.knownActions[0]),this._addInactiveAction(e,s,i)}const t=e._propertyBindings;for(let i=0,s=t.length;i!==s;++i){const n=t[i];n.useCount++===0&&(this._lendBinding(n),n.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let i=0,s=t.length;i!==s;++i){const n=t[i];--n.useCount===0&&(n.restoreOriginalState(),this._takeBackBinding(n))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,i){const s=this._actions,n=this._actionsByClip;let a=n[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,n[t]=a;else{const o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=s.length,s.push(e),a.actionByRoot[i]=e}_removeInactiveAction(e){const t=this._actions,i=t[t.length-1],s=e._cacheIndex;i._cacheIndex=s,t[s]=i,t.pop(),e._cacheIndex=null;const n=e._clip.uuid,a=this._actionsByClip,o=a[n],l=o.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;const u=o.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],l.length===0&&delete a[n],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let i=0,s=t.length;i!==s;++i){const n=t[i];--n.referenceCount===0&&this._removeInactiveBinding(n)}}_lendAction(e){const t=this._actions,i=e._cacheIndex,s=this._nActiveActions++,n=t[s];e._cacheIndex=s,t[s]=e,n._cacheIndex=i,t[i]=n}_takeBackAction(e){const t=this._actions,i=e._cacheIndex,s=--this._nActiveActions,n=t[s];e._cacheIndex=s,t[s]=e,n._cacheIndex=i,t[i]=n}_addInactiveBinding(e,t,i){const s=this._bindingsByRootAndName,n=this._bindings;let a=s[t];a===void 0&&(a={},s[t]=a),a[i]=e,e._cacheIndex=n.length,n.push(e)}_removeInactiveBinding(e){const t=this._bindings,i=e.binding,s=i.rootNode.uuid,n=i.path,a=this._bindingsByRootAndName,o=a[s],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete o[n],Object.keys(o).length===0&&delete a[s]}_lendBinding(e){const t=this._bindings,i=e._cacheIndex,s=this._nActiveBindings++,n=t[s];e._cacheIndex=s,t[s]=e,n._cacheIndex=i,t[i]=n}_takeBackBinding(e){const t=this._bindings,i=e._cacheIndex,s=--this._nActiveBindings,n=t[s];e._cacheIndex=s,t[s]=e,n._cacheIndex=i,t[i]=n}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let i=e[t];return i===void 0&&(i=new wc(new Float32Array(2),new Float32Array(2),1,m_),i.__cacheIndex=t,e[t]=i),i}_takeBackControlInterpolant(e){const t=this._controlInterpolants,i=e.__cacheIndex,s=--this._nActiveControlInterpolants,n=t[s];e.__cacheIndex=s,t[s]=e,n.__cacheIndex=i,t[i]=n}clipAction(e,t,i){const s=t||this._root,n=s.uuid;let a=typeof e=="string"?oa.findByName(s,e):e;const o=a!==null?a.uuid:e,l=this._actionsByClip[o];let c=null;if(i===void 0&&(a!==null?i=a.blendMode:i=pa),l!==void 0){const u=l.actionByRoot[n];if(u!==void 0&&u.blendMode===i)return u;c=l.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;const h=new p_(this,a,t,i);return this._bindAction(h,c),this._addInactiveAction(h,o,n),h}existingAction(e,t){const i=t||this._root,s=i.uuid,n=typeof e=="string"?oa.findByName(i,e):e,a=n?n.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[s]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let i=t-1;i>=0;--i)e[i].stop();return this}update(e){e*=this.timeScale;const t=this._actions,i=this._nActiveActions,s=this.time+=e,n=Math.sign(e),a=this._accuIndex^=1;for(let c=0;c!==i;++c)t[c]._update(s,e,n,a);const o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,i=e.uuid,s=this._actionsByClip,n=s[i];if(n!==void 0){const a=n.knownActions;for(let o=0,l=a.length;o!==l;++o){const c=a[o];this._deactivateAction(c);const h=c._cacheIndex,u=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(c)}delete s[i]}}uncacheRoot(e){const t=e.uuid,i=this._actionsByClip;for(const a in i){const o=i[a].actionByRoot,l=o[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const s=this._bindingsByRootAndName,n=s[t];if(n!==void 0)for(const a in n){const o=n[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){const i=this.existingAction(e,t);i!==null&&(this._deactivateAction(i),this._removeInactiveAction(i))}}class f_{constructor(e,t,i=0,s=1/0){this.ray=new tn(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new ga,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,i=[]){return la(e,this,i,t),i.sort(Il),i}intersectObjects(e,t=!0,i=[]){for(let s=0,n=e.length;s<n;s++)la(e[s],this,i,t);return i.sort(Il),i}}function Il(r,e){return r.distance-e.distance}function la(r,e,t,i){if(r.layers.test(e.layers)&&r.raycast(e,t),i===!0){const s=r.children;for(let n=0,a=s.length;n<a;n++)la(s[n],e,t,!0)}}class g_ extends ba{constructor(e=10,t=10,i=4473924,s=8947848){i=new xe(i),s=new xe(s);const n=t/2,a=e/t,o=e/2,l=[],c=[];for(let d=0,p=0,g=-o;d<=t;d++,g+=a){l.push(-o,0,g,o,0,g),l.push(g,0,-o,g,0,o);const v=d===n?i:s;v.toArray(c,p),p+=3,v.toArray(c,p),p+=3,v.toArray(c,p),p+=3,v.toArray(c,p),p+=3}const h=new vt;h.setAttribute("position",new st(l,3)),h.setAttribute("color",new st(c,3));const u=new sn({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ua}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ua);class Dc{constructor(e,t,i,s){this.position=e.clone(),this.direction=t.clone().normalize(),this.speed=i,this.scene=s,this.active=!0,this.lifetime=0,this.maxLifetime=5,this.tracer=null,this.createTracer()}createTracer(){const e=new vt,t=new Float32Array([0,0,0,0,0,-.5]);e.setAttribute("position",new Tt(t,3));const i=new sn({color:16776960,transparent:!0,opacity:.8});this.tracer=new tr(e,i),this.scene.add(this.tracer)}update(e){if(!this.active){this.tracer&&(this.scene.remove(this.tracer),this.tracer=null);return}const t=this.direction.clone().multiplyScalar(this.speed*e);if(this.position.add(t),this.tracer&&(this.tracer.position.copy(this.position),this.tracer.quaternion.setFromUnitVectors(new _(0,0,-1),this.direction)),this.lifetime+=e,this.lifetime>this.maxLifetime){this.active=!1;const i=this.speed*this.maxLifetime;console.log(`🔸 Bullet expired after ${this.maxLifetime}s, traveled ~${i.toFixed(0)} units`)}}getDistanceTraveled(){return this.speed*this.lifetime}}class Ul{constructor(e,t,i,s,n,a=null){this.name=e,this.type=t,this.scene=i,this.audioManager=s,this.physicsManager=n,this.assetLoader=a,this.setupStats(),this.currentAmmo=this.magazineSize,this.reserveAmmo=this.magazineSize*10,this.isReloading=!1,this.reloadTime=0,this.lastShotTime=0,this.bullets=[],this.mixer=null,this.animations={},this.model=null,this.muzzleFlash=null,this.createModel()}setupStats(){this.type==="rifle"?(this.damage=25,this.fireRate=.1,this.recoil=.05,this.magazineSize=30,this.reloadDuration=2,this.bulletSpeed=150,this.spread=.008):this.type==="pistol"&&(this.damage=20,this.fireRate=.15,this.recoil=.03,this.magazineSize=15,this.reloadDuration=1.5,this.bulletSpeed=120,this.spread=.015)}createModel(){const e=this.type==="rifle"?"m4a1":"glock";this.assetLoader&&this.assetLoader.hasModel(e)?this.loadRealModel(e):this.createProceduralModel()}loadRealModel(e){const t=this.assetLoader.getModel(e);this.model=t.scene.clone(),t.animations&&t.animations.length>0&&(this.mixer=new Na(this.model),t.animations.forEach(s=>{const n=this.mixer.clipAction(s);s.name.toLowerCase().includes("shoot")||s.name.toLowerCase().includes("fire")?this.animations.shoot=n:s.name.toLowerCase().includes("reload")?this.animations.reload=n:s.name.toLowerCase().includes("idle")&&(this.animations.idle=n,n.play())})),this.type==="rifle"?this.model.scale.set(1.8,1.8,1.8):this.type==="pistol"&&this.model.scale.set(.8,.8,.8),this.model.visible=!0,this.model.traverse(s=>{s.isMesh&&(s.castShadow=!0,s.receiveShadow=!0,s.visible=!0)});const i=this.model.getObjectByName("Muzzle")||this.model;this.createMuzzleFlash(i),this.scene.add(this.model),console.log(`✓ Using real model for ${e}, type: ${this.type}, scale: ${this.model.scale.x}`)}createProceduralModel(){const e=new Jt,t=new Lt(.1,.15,.6),i=new ft({color:3355443,metalness:.8,roughness:.3}),s=new Xe(t,i);s.castShadow=!0,e.add(s);const n=new Ps(.02,.02,.4,8),a=new ft({color:1118481,metalness:.9,roughness:.2}),o=new Xe(n,a);o.rotation.x=Math.PI/2,o.position.z=-.5,o.position.y=.05,o.castShadow=!0,e.add(o),this.createMuzzleFlash(e,new _(0,.05,-.7)),this.model=e,this.scene.add(this.model),console.log(`⚠ Using procedural model for ${this.type}`)}createMuzzleFlash(e,t=new _(0,0,0)){const i=new en(.1,8,8),s=new Kt({color:16755200,transparent:!0,opacity:0});this.muzzleFlash=new Xe(i,s),this.muzzleFlash.position.copy(t),e.add(this.muzzleFlash)}update(e,t,i,s){this.mixer&&this.mixer.update(e),this.isReloading&&(this.reloadTime+=e,this.reloadTime>=this.reloadDuration&&this.finishReload()),this.bullets.forEach(n=>n.update(e)),this.model&&this.model.visible&&this.updatePosition(i,s,t),this.muzzleFlash&&this.muzzleFlash.material.opacity>0&&(this.muzzleFlash.material.opacity*=.8)}updatePosition(e,t,i){if(!this.model){console.warn("No weapon model to update!");return}let s,n;this.type==="rifle"?(s=new _(.35,-.25,-.65),n=new _(0,-.15,-.55)):this.type==="pistol"&&(s=new _(.4,-.38,-.7),n=new _(0,-.2,-.6));const a=new _().lerpVectors(s,n,t),o=(1-t)*.008;a.x+=Math.sin(i*2)*o,a.y+=Math.cos(i*3)*o,this.model.position.copy(e.position);const l=a.clone().applyQuaternion(e.quaternion);this.model.position.add(l),this.model.rotation.copy(e.rotation),this.model.visible=!0,this.model.renderOrder=999}canShoot(){const e=performance.now()/1e3;return!this.isReloading&&this.currentAmmo>0&&e-this.lastShotTime>=this.fireRate}shoot(e){if(!this.canShoot())return;this.currentAmmo--,this.lastShotTime=performance.now()/1e3,this.animations.shoot&&this.animations.shoot.reset().play();const t=new _(0,0,-1);t.applyQuaternion(e.quaternion),t.x+=(Math.random()-.5)*this.spread,t.y+=(Math.random()-.5)*this.spread,t.normalize();const i=new Dc(e.position.clone(),t,this.bulletSpeed,this.scene);this.bullets.push(i),this.muzzleFlash&&(this.muzzleFlash.material.opacity=1);const s=this.type+"_shot";console.log(`🔫 Shooting! Playing sound: ${s}`),this.audioManager.sounds&&this.audioManager.sounds.has("gunshot")?this.audioManager.play("gunshot",1):this.audioManager.play(s,1),this.currentAmmo===0&&this.reload()}reload(){if(console.log(`🔄 Reload attempt - Current: ${this.currentAmmo}, Reserve: ${this.reserveAmmo}, IsReloading: ${this.isReloading}`),this.isReloading){console.log("❌ Already reloading");return}if(this.currentAmmo===this.magazineSize){console.log("❌ Magazine full");return}if(this.reserveAmmo===0){console.log("❌ No reserve ammo");return}this.isReloading=!0,this.reloadTime=0,console.log(`✓ Starting reload - Duration: ${this.reloadDuration}s`),this.animations.reload&&this.animations.reload.reset().play(),this.audioManager.play("reload",.2)}finishReload(){const e=this.magazineSize-this.currentAmmo,t=Math.min(e,this.reserveAmmo);console.log(`✓ Reload complete - Adding ${t} ammo (${this.currentAmmo} -> ${this.currentAmmo+t})`),this.currentAmmo+=t,this.reserveAmmo-=t,this.isReloading=!1,console.log(`   New totals - Current: ${this.currentAmmo}, Reserve: ${this.reserveAmmo}`)}reset(){this.currentAmmo=this.magazineSize,this.reserveAmmo=this.magazineSize*10,this.isReloading=!1,this.reloadTime=0}}class __{constructor(e,t,i,s,n,a=null){this.scene=e,this.camera=t,this.inputManager=i,this.audioManager=s,this.physicsManager=n,this.assetLoader=a,this.health=150,this.maxHealth=150,this.isAlive=!0,this.position=new _(0,1.7,0),this.velocity=new _,this.moveSpeed=5,this.runSpeed=8,this.crouchSpeed=3,this.jumpForce=8,this.isGrounded=!1,this.isCrouching=!1,this.isRunning=!1,this.yaw=0,this.pitch=0,this.mouseSensitivity=.002,this.weapons=[],this.currentWeaponIndex=0,this.isADS=!1,this.isShooting=!1,this.cameraShake=new _,this.recoilOffset=new _,this.adsProgress=0,this.init()}init(){if(this.weapons.push(new Ul("M4A1","rifle",this.scene,this.audioManager,this.physicsManager,this.assetLoader)),this.weapons.push(new Ul("Glock","pistol",this.scene,this.audioManager,this.physicsManager,this.assetLoader)),this.weapons.forEach(e=>{e.model&&(e.model.visible=!1)}),this.assetLoader&&this.assetLoader.hasModel("player_arms")){const e=this.assetLoader.getModel("player_arms");if(this.armsModel=e.scene.clone(),e.animations&&e.animations.length>0){this.armsMixer=new Na(this.armsModel);const s=e.animations[0];this.armsIdleAction=this.armsMixer.clipAction(s),this.armsIdleAction.play(),console.log("✓ Playing animation:",s.name,"to fix skeleton")}const t=.15;this.armsModel.scale.set(t,t,t),this.armsModel.traverse(s=>{s.isMesh&&(s.material&&(s.material=s.material.clone(),s.material.color&&s.material.color.multiplyScalar(1.2)),s.renderOrder=999,s.frustumCulled=!1,s.visible=!0)}),this.armsModel.updateMatrixWorld(!0);const i=new Ot().setFromObject(this.armsModel).getCenter(new _);this.armsModelCenterOffset=i.clone(),this.armsModel.visible=!0,this.scene.add(this.armsModel),console.log("✓ Player arms loaded with animation")}this.camera.position.copy(this.position)}getCurrentWeapon(){return this.weapons[this.currentWeaponIndex]}update(e,t){this.handleInput(e),this.updateMovement(e),this.updateCamera(e),this.updateWeapons(e,t)}handleInput(e){const t=this.inputManager,i=t.getMouseMovement(),s=t.isTouchEnabled()?this.mouseSensitivity*1.35:this.mouseSensitivity;this.yaw-=i.x*s,this.pitch-=i.y*s,this.pitch=Math.max(-Math.PI/2,Math.min(Math.PI/2,this.pitch)),this.isRunning=t.isKeyPressed("ShiftLeft")&&!this.isCrouching,this.isCrouching=t.isKeyPressed("ControlLeft"),t.isKeyPressed("Space")&&this.isGrounded&&!this.isCrouching&&(this.velocity.y=this.jumpForce,this.isGrounded=!1),t.isMouseButtonPressed(0)&&this.shoot(),t.isKeyPressed("KeyR")&&this.getCurrentWeapon().reload(),this.isADS=t.isMouseButtonPressed(2),t.isKeyPressed("Digit1")&&(this.currentWeaponIndex=0,console.log("Switched to M4A1 Rifle")),t.isKeyPressed("Digit2")&&(this.currentWeaponIndex=1,console.log("Switched to Glock Pistol"))}updateMovement(e){const t=this.inputManager,i=new _(0,0,-1).applyAxisAngle(new _(0,1,0),this.yaw),s=new _(1,0,0).applyAxisAngle(new _(0,1,0),this.yaw),n=new _;t.isKeyPressed("KeyW")&&n.add(i),t.isKeyPressed("KeyS")&&n.sub(i),t.isKeyPressed("KeyD")&&n.add(s),t.isKeyPressed("KeyA")&&n.sub(s);const a=t.getMovementVector();if(a.y<-.08&&n.add(i.clone().multiplyScalar(-a.y)),a.y>.08&&n.sub(i.clone().multiplyScalar(a.y)),a.x>.08&&n.add(s.clone().multiplyScalar(a.x)),a.x<-.08&&n.sub(s.clone().multiplyScalar(-a.x)),n.length()>0){n.normalize();let l=this.moveSpeed;this.isRunning&&(l=this.runSpeed),this.isCrouching&&(l=this.crouchSpeed),this.velocity.x=n.x*l,this.velocity.z=n.z*l}else this.velocity.x*=.8,this.velocity.z*=.8;this.velocity.y+=this.physicsManager.gravity*e;const o=this.position.clone();o.x+=this.velocity.x*e,o.y+=this.velocity.y*e,o.z+=this.velocity.z*e,this.isGrounded=this.physicsManager.checkGrounded(o),this.isGrounded&&this.velocity.y<0&&(this.velocity.y=0,o.y=Math.max(o.y,this.isCrouching?1.2:1.7)),this.physicsManager.resolveCollision(o,this.velocity)&&this.velocity.length()>2&&this.cameraShake.set((Math.random()-.5)*.03,(Math.random()-.5)*.03,0),this.position.copy(o)}updateCamera(e){const t=this.isADS?1:0;this.adsProgress+=(t-this.adsProgress)*10*e,this.cameraShake.multiplyScalar(.9),this.recoilOffset.multiplyScalar(.85);const i=this.isCrouching?1.2:1.7;this.camera.position.copy(this.position),this.camera.position.y=i,this.camera.position.add(this.cameraShake),this.camera.rotation.order="YXZ",this.camera.rotation.y=this.yaw,this.camera.rotation.x=this.pitch+this.recoilOffset.x;const s=this.isADS?50:75;this.camera.fov+=(s-this.camera.fov)*10*e,this.camera.updateProjectionMatrix()}updateWeapons(e,t){const i=this.getCurrentWeapon();if(i&&i.update(e,t,this.camera,this.adsProgress),this.armsMixer&&this.armsMixer.update(e),this.armsModel&&this.armsModelCenterOffset){this.armsModel.position.copy(this.camera.position);const s=new _(0,0,-1);s.applyQuaternion(this.camera.quaternion);const n=new _(1,0,0);n.applyQuaternion(this.camera.quaternion);const a=new _(0,-1,0);a.applyQuaternion(this.camera.quaternion),this.armsModel.position.add(s.multiplyScalar(.25)),this.armsModel.position.add(n.multiplyScalar(.18)),this.armsModel.position.add(a.multiplyScalar(.18));const o=this.armsModelCenterOffset.clone();o.applyQuaternion(this.camera.quaternion),this.armsModel.position.sub(o),this.armsModel.quaternion.copy(this.camera.quaternion);const l=new Ls(0,Math.PI/2,0,"XYZ"),c=new Ut().setFromEuler(l);this.armsModel.quaternion.multiply(c);const h=new Ls(this.recoilOffset.x*.5,0,0,"XYZ"),u=new Ut().setFromEuler(h);this.armsModel.quaternion.multiply(u)}}shoot(){const e=this.getCurrentWeapon();if(e.canShoot()){e.shoot(this.camera);const t=e.recoil;this.recoilOffset.x+=t*(.5+Math.random()*.5),this.yaw+=(Math.random()-.5)*t*.3,this.cameraShake.set((Math.random()-.5)*.02,(Math.random()-.5)*.02,(Math.random()-.5)*.02)}}takeDamage(e){if(!this.isAlive)return;this.health-=e,this.health=Math.max(0,this.health),this.cameraShake.set((Math.random()-.5)*.05,(Math.random()-.5)*.05,0);const t=document.getElementById("damage-overlay");t&&(t.style.opacity="1",setTimeout(()=>{t.style.opacity="0"},200)),this.health<=0&&(this.isAlive=!1)}respawn(){this.health=this.maxHealth,this.isAlive=!0,this.position.set(0,1.7,0),this.velocity.set(0,0,0),this.weapons.forEach(e=>e.reset())}}class v_{constructor(e,t,i,s,n=null){this.scene=e,this.physicsManager=t,this.audioManager=i,this.spawnPosition=s.clone(),this.assetLoader=n,this.health=100,this.maxHealth=100,this.isAlive=!0,this.position=s.clone(),this.velocity=new _,this.moveSpeed=3,this.rotationSpeed=2,this.lookDirection=new _(0,0,-1),this.state="hold",this.stateTimer=0,this.targetPosition=null,this.coverPosition=null,this.alertRadius=12,this.reactionDelay=.35,this.alertCooldown=0,this.alertBroadcastCooldown=0,this.hasLineOfSightToPlayer=!1,this.detectionRange=20,this.shootRange=18,this.accuracy=.55,this.fireRate=.6,this.lastShotTime=0,this.currentAmmo=30,this.magazineSize=30,this.reloadTime=2,this.isReloading=!1,this.reloadTimer=0,this.bullets=[],this.squadPosition=null,this.suppressionLevel=0,this.mixer=null,this.animations={},this.model=null,this.muzzleFlash=null,this.createModel(),this.patrolPoints=this.generatePatrolPoints(),this.currentPatrolIndex=0}createModel(){this.createProceduralModel()}loadRealModel(){const e=this.assetLoader.getModel("enemy");this.model=e.scene.clone(),console.log("🎮 Loading enemy model with animations..."),e.animations&&e.animations.length>0&&(this.mixer=new Na(this.model),console.log(`  Found ${e.animations.length} animations:`),e.animations.forEach(s=>{const n=this.mixer.clipAction(s),a=s.name.toLowerCase();console.log(`    - ${s.name} (${s.duration.toFixed(2)}s)`),a.includes("idle")?(this.animations.idle=n,n.play(),console.log("      ✓ Mapped to IDLE")):a.includes("walk")?(this.animations.walk=n,console.log("      ✓ Mapped to WALK")):a.includes("run")?(this.animations.run=n,console.log("      ✓ Mapped to RUN")):a.includes("shoot")||a.includes("fire")||a.includes("attack")?(this.animations.shoot=n,console.log("      ✓ Mapped to SHOOT")):a.includes("death")||a.includes("die")?(this.animations.death=n,n.loop=Qr,n.clampWhenFinished=!0,console.log("      ✓ Mapped to DEATH")):a.includes("reload")&&(this.animations.reload=n,n.loop=Qr,console.log("      ✓ Mapped to RELOAD"))}));const t=1e-4;this.model.scale.set(t,t,t),console.log("✓ Enemy scaled to:",t,"at position:",this.position.x.toFixed(1),this.position.z.toFixed(1)),this.model.position.copy(this.position),this.model.position.y=0,this.model.traverse(s=>{s.isMesh&&(s.castShadow=!0,s.receiveShadow=!0,s.material&&(s.material=s.material.clone(),s.material.color&&s.material.color.multiplyScalar(1.5),s.material.emissive||(s.material.emissive=new xe(2105376)),s.material.emissiveIntensity=.3,s.material.roughness!==void 0&&(s.material.roughness=.5),s.material.metalness!==void 0&&(s.material.metalness=.2)))});const i=this.model.getObjectByName("Muzzle")||this.model;this.createMuzzleFlash(i),this.scene.add(this.model)}createProceduralModel(){const e=new Jt,t=new Ra(.4,1.5,4,8),i=new ft({color:16711680,roughness:.8,emissive:16711680,emissiveIntensity:.5}),s=new Xe(t,i);s.castShadow=!0,s.position.y=1.1,e.add(s);const n=new en(.35,8,8),a=new ft({color:16776960,roughness:.9,emissive:16776960,emissiveIntensity:.5}),o=new Xe(n,a);o.castShadow=!0,o.position.y=2.1,e.add(o);const l=new Lt(.15,.15,.6),c=new ft({color:3355443,emissive:1118481,emissiveIntensity:.2}),h=new Xe(l,c);h.position.set(.4,1.5,-.4),h.rotation.x=-.3,e.add(h);const u=new Ps(.1,.1,3,8),d=new Kt({color:16711935,transparent:!0,opacity:.6}),p=new Xe(u,d);p.position.y=3.5,e.add(p),this.createMuzzleFlash(e,new _(.4,1.5,-.7)),e.position.copy(this.position),this.model=e,this.scene.add(this.model),console.log("✓ Using BRIGHT procedural enemy model at position:",this.position.x.toFixed(1),this.position.y.toFixed(1),this.position.z.toFixed(1))}createMuzzleFlash(e,t=new _(0,0,0)){const i=new en(.1,8,8),s=new Kt({color:16755200,transparent:!0,opacity:0});this.muzzleFlash=new Xe(i,s),this.muzzleFlash.position.copy(t),e.add(this.muzzleFlash)}generatePatrolPoints(){const e=[];for(let t=0;t<4;t++){const i=t/4*Math.PI*2,s=10;e.push(new _(this.spawnPosition.x+Math.cos(i)*s,0,this.spawnPosition.z+Math.sin(i)*s))}return e}update(e,t,i,s){this.isAlive&&(Math.random()<.01&&console.log("🔄 Enemy.update() called - isAlive:",this.isAlive,"state:",this.state),this.mixer&&this.mixer.update(e),this.updateAI(e,t,i,s),this.updateMovement(e),this.bullets.forEach(n=>n.update(e)),this.updateVisual(e),this.suppressionLevel=Math.max(0,this.suppressionLevel-e))}updateAI(e,t,i,s){this.stateTimer+=e,this.alertCooldown=Math.max(0,this.alertCooldown-e),this.alertBroadcastCooldown=Math.max(0,this.alertBroadcastCooldown-e);const n=this.position.distanceTo(i.position);switch(this.hasLineOfSightToPlayer=this.hasLineOfSight(i.position),Math.random()<.01&&console.log(`🤖 Enemy AI - State: ${this.state}, Distance: ${n.toFixed(1)}, CanSee: ${this.hasLineOfSightToPlayer}`),this.state){case"hold":n<this.alertRadius&&this.hasLineOfSightToPlayer&&this.alertCooldown<=0&&(this.alertCooldown=this.reactionDelay,console.log("👀 Enemy is alerting! Switching to alert in",this.reactionDelay.toFixed(2),"s"),this.setState("alert"));break;case"alert":this.stateTimer>=this.reactionDelay&&(console.log("🎯 Enemy engaging! Switching to chase"),this.broadcastAlert(s),this.setState("chase"));break;case"patrol":this.hasLineOfSightToPlayer&&n<this.alertRadius?(console.log("🎯 Enemy detected player while patrolling!"),this.broadcastAlert(s),this.setState("chase")):this.reachedTarget()&&(this.currentPatrolIndex=(this.currentPatrolIndex+1)%this.patrolPoints.length,this.targetPosition=this.patrolPoints[this.currentPatrolIndex]);break;case"chase":!this.hasLineOfSightToPlayer||n>this.alertRadius*2?Math.random()<.5?this.setState("patrol"):this.setState("hold"):n<this.shootRange&&this.hasLineOfSightToPlayer?(console.log("🔫 Enemy in range! Switching to shoot"),this.setState("shoot")):this.targetPosition=this.calculateTacticalPosition(i,s);break;case"shoot":this.currentAmmo===0?this.setState("reload"):this.health<30?this.setState("retreat"):!this.hasLineOfSightToPlayer||n>this.shootRange*1.2?this.setState("chase"):this.shootAtPlayer(i,t);break;case"reload":this.reloadTimer+=e,this.reloadTimer>=this.reloadTime&&(this.currentAmmo=this.magazineSize,this.reloadTimer=0,this.setState("shoot")),this.coverPosition||(this.coverPosition=this.findNearestCover(i.position)),this.targetPosition=this.coverPosition;break;case"retreat":this.health>50?this.setState("chase"):(!this.coverPosition||this.reachedTarget())&&(this.coverPosition=this.findCoverAwayFrom(i.position),this.targetPosition=this.coverPosition);break}}broadcastAlert(e){if(this.alertBroadcastCooldown>0)return;this.alertBroadcastCooldown=1;const t=35;let i=0;e.forEach(s=>{s===this||!s.isAlive||this.position.distanceTo(s.position)<t&&(s.state==="hold"||s.state==="patrol"||s.state==="idle")&&s.alertCooldown<=0&&(s.alertCooldown=s.reactionDelay*(.8+Math.random()*.4),s.setState("alert"),i++)}),i>0&&console.log(`📢 ${this.state,"Enemy"} alerted ${i} nearby allies!`)}setState(e){this.state!==e&&(this.state=e,this.stateTimer=0,this.playStateAnimation(e))}playStateAnimation(e){if(!(!this.mixer||!this.animations))switch(Object.values(this.animations).forEach(t=>{t&&t.stop()}),e){case"hold":case"idle":this.animations.idle&&this.animations.idle.reset().fadeIn(.2).play();break;case"patrol":this.animations.walk?this.animations.walk.reset().fadeIn(.2).play():this.animations.idle&&this.animations.idle.reset().fadeIn(.2).play();break;case"alert":this.animations.idle&&this.animations.idle.reset().fadeIn(.1).play();break;case"chase":this.animations.run?this.animations.run.reset().fadeIn(.2).play():this.animations.walk&&this.animations.walk.reset().fadeIn(.2).play();break;case"shoot":this.animations.shoot&&this.animations.shoot.reset().fadeIn(.1).play(),this.animations.idle&&this.animations.idle.play();break;case"reload":this.animations.reload?this.animations.reload.reset().fadeIn(.2).play():this.animations.idle&&this.animations.idle.reset().fadeIn(.2).play();break;case"retreat":this.animations.run?this.animations.run.reset().fadeIn(.2).play():this.animations.walk&&this.animations.walk.reset().fadeIn(.2).play();break}}calculateTacticalPosition(e,t){const i=new _().subVectors(e.position,this.position),s=i.length(),n=this.shootRange*.7;if(s>n)return i.normalize().multiplyScalar(n),e.position.clone().sub(i);if(s<n*.5)return i.normalize().multiplyScalar(-n*.3),this.position.clone().add(i);const a=Math.random()>.5?Math.PI/3:-Math.PI/3;return i.applyAxisAngle(new _(0,1,0),a),i.normalize().multiplyScalar(n),e.position.clone().sub(i)}findNearestCover(e){const t=new _().subVectors(this.position,e);t.y=0,t.normalize();const i=new _(-t.z,0,t.x),s=t.add(i.multiplyScalar(Math.random()>.5?1:-1));return s.normalize().multiplyScalar(10),this.position.clone().add(s)}findCoverAwayFrom(e){const t=new _().subVectors(this.position,e);return t.y=0,t.normalize().multiplyScalar(15),this.position.clone().add(t)}updateMovement(e){if(this.state==="hold"){this.velocity.x*=.8,this.velocity.z*=.8,this.position.x+=this.velocity.x*e,this.position.z+=this.velocity.z*e,this.position.y=0;return}this.targetPosition||(this.targetPosition=this.patrolPoints[this.currentPatrolIndex]);const t=new _().subVectors(this.targetPosition,this.position);if(t.y=0,t.length()>.5){t.normalize();let i=this.moveSpeed;this.state==="retreat"&&(i*=1.3),this.state==="reload"&&(i*=.8),this.state==="shoot"&&(i*=.3),this.velocity.x=t.x*i,this.velocity.z=t.z*i,this.lookDirection.copy(t)}else this.velocity.x*=.8,this.velocity.z*=.8;this.position.x+=this.velocity.x*e,this.position.z+=this.velocity.z*e,this.position.y=0}shootAtPlayer(e,t){const i=t;if(i-this.lastShotTime<this.fireRate||this.currentAmmo===0)return;this.lastShotTime=i,this.currentAmmo--,this.animations.shoot&&this.animations.shoot.reset().play();const s=new _().subVectors(e.position,this.position);s.normalize();const n=(1-this.accuracy)*.1;s.x+=(Math.random()-.5)*n,s.y+=(Math.random()-.5)*n,s.z+=(Math.random()-.5)*n,s.normalize();const a=this.position.clone();a.y=1.5;const o=new Dc(a,s,80,this.scene);this.bullets.push(o),this.muzzleFlash&&(this.muzzleFlash.material.opacity=1),this.audioManager.play("rifle_shot",.2)}hasLineOfSight(e){const t=new _().subVectors(e,this.position),i=t.length();t.normalize();const s=this.position.clone();s.y=1.5;const n=this.physicsManager.raycast(s,t,i);return!n.hit||n.distance>=i-1}reachedTarget(){return this.targetPosition?this.position.distanceTo(this.targetPosition)<2:!0}updateVisual(e){if(!this.model){console.warn("⚠️ Enemy has no model!");return}if(this.model.position.set(this.position.x,this.position.y,this.position.z),this.model.visible=!0,this.lookDirection.length()>0){const t=Math.atan2(this.lookDirection.x,this.lookDirection.z),i=this.model.rotation.y;let s=t-i;for(;s>Math.PI;)s-=Math.PI*2;for(;s<-Math.PI;)s+=Math.PI*2;this.model.rotation.y+=s*this.rotationSpeed*e}this.muzzleFlash&&this.muzzleFlash.material.opacity>0&&(this.muzzleFlash.material.opacity*=.8)}takeDamage(e){this.isAlive&&(this.health-=e,this.health=Math.max(0,this.health),this.suppressionLevel=Math.min(1,this.suppressionLevel+.3),this.health<=0?this.die():this.health<30&&this.state!=="retreat"&&this.setState("retreat"))}die(){this.isAlive=!1,console.log("💀 Enemy died"),this.animations.death?(Object.values(this.animations).forEach(e=>{e&&e!==this.animations.death&&e.stop()}),this.animations.death.reset().play(),console.log("  Playing death animation")):this.model&&(this.model.rotation.x=Math.PI/2,this.model.position.y=-.5)}respawn(){this.health=this.maxHealth,this.isAlive=!0,this.position.copy(this.spawnPosition),this.currentAmmo=this.magazineSize,this.setState("idle"),this.model&&(this.model.rotation.x=0,this.model.position.copy(this.position))}}class y_{constructor(e,t){this.scene=e,this.physicsManager=t,this.mapObjects=[]}clearMap(){console.log(`🗑️ Clearing map - ${this.mapObjects.length} objects, ${this.physicsManager.colliders.length} colliders`),this.mapObjects.forEach(e=>{this.scene.remove(e),e.geometry&&e.geometry.dispose(),e.material&&(Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material.dispose())}),this.mapObjects=[],this.physicsManager.colliders=[],console.log("✓ Map cleared - Ready for new level")}buildMapForLevel(e){switch(this.clearMap(),this.createGround(),e){case 1:this.buildLevel1();break;case 2:this.buildLevel2();break;case 3:this.buildLevel3();break;default:this.buildLevel1()}console.log(`✓ Built map for Level ${e} - ${this.mapObjects.length} objects, ${this.physicsManager.colliders.length} colliders`)}buildLevel1(){this.createBuilding(new _(15,0,30),10,6,8,13944249),this.createBuilding(new _(-15,0,30),10,6,8,15260868),this.createBuilding(new _(0,0,35),8,5,6,13220003),this.createBuilding(new _(18,0,-25),8,5,8,12101002),this.createBuilding(new _(-18,0,-25),8,5,8,13944249),this.createBuilding(new _(0,0,-30),10,6,10,13220003),this.createBuilding(new _(30,0,10),8,7,8,15260868),this.createBuilding(new _(30,0,-10),8,7,8,13944249),this.createBuilding(new _(-30,0,10),8,7,8,12101002),this.createBuilding(new _(-30,0,-10),8,7,8,13220003),this.createCrate(new _(5,0,5)),this.createCrate(new _(-5,0,5)),this.createCrate(new _(5,0,-5)),this.createCrate(new _(-5,0,-5)),this.createWall(new _(0,0,15),12,2,.5),this.createWall(new _(15,0,0),.5,2,12),this.createWall(new _(-15,0,0),.5,2,12),this.createCar(new _(10,0,20),0),this.createCar(new _(-10,0,20),Math.PI),this.createCar(new _(20,0,0),Math.PI/2),this.createCar(new _(-20,0,-15),-Math.PI/4),this.createStreetLight(new _(12,0,12)),this.createStreetLight(new _(-12,0,12)),this.createStreetLight(new _(12,0,-12)),this.createStreetLight(new _(-12,0,-12))}buildLevel2(){this.createBuilding(new _(0,0,0),12,25,12,4871528),this.createBuilding(new _(20,0,0),10,22,10,5925498),this.createBuilding(new _(-20,0,0),10,22,10,3820122),this.createBuilding(new _(0,0,20),10,20,10,6978186),this.createBuilding(new _(0,0,-20),10,20,10,4872810),this.createBuilding(new _(35,0,35),14,28,14,7372944),this.createBuilding(new _(-35,0,35),14,28,14,7833753),this.createBuilding(new _(35,0,-35),14,28,14,6978186),this.createBuilding(new _(-35,0,-35),14,28,14,5925498),this.createBuilding(new _(40,0,15),12,15,10,8952234),this.createBuilding(new _(-40,0,15),12,15,10,7833770),this.createBuilding(new _(40,0,-15),12,15,10,6978202),this.createBuilding(new _(-40,0,-15),12,15,10,8952251),this.createBuilding(new _(15,0,40),10,15,12,7833770),this.createBuilding(new _(-15,0,40),10,15,12,6978202),this.createBuilding(new _(15,0,-40),10,15,12,8952234),this.createBuilding(new _(-15,0,-40),10,15,12,5925514),this.createWall(new _(10,0,10),8,3,.5),this.createWall(new _(-10,0,10),8,3,.5),this.createWall(new _(10,0,-10),8,3,.5),this.createWall(new _(-10,0,-10),8,3,.5),this.createWall(new _(25,0,25),10,3,.5),this.createWall(new _(-25,0,-25),10,3,.5),this.createCrate(new _(8,0,8)),this.createCrate(new _(-8,0,8)),this.createCrate(new _(8,0,-8)),this.createCrate(new _(-8,0,-8)),this.createCrate(new _(28,0,0)),this.createCrate(new _(-28,0,0)),this.createCrate(new _(0,0,28)),this.createCrate(new _(0,0,-28)),this.createCar(new _(12,0,0),0),this.createCar(new _(-12,0,0),Math.PI),this.createCar(new _(0,0,12),Math.PI/2),this.createCar(new _(0,0,-12),-Math.PI/2),this.createCar(new _(25,0,25),Math.PI/4),this.createCar(new _(-25,0,25),-Math.PI/4),this.createCar(new _(25,0,-25),3*Math.PI/4),this.createCar(new _(-25,0,-25),-3*Math.PI/4),this.createStreetLight(new _(15,0,15)),this.createStreetLight(new _(-15,0,15)),this.createStreetLight(new _(15,0,-15)),this.createStreetLight(new _(-15,0,-15)),this.createStreetLight(new _(30,0,30)),this.createStreetLight(new _(-30,0,30)),this.createStreetLight(new _(30,0,-30)),this.createStreetLight(new _(-30,0,-30))}buildLevel3(){this.createBuilding(new _(8,0,25),8,12,12,9127187),this.createBuilding(new _(-10,0,28),10,14,8,10179875),this.createBuilding(new _(22,0,30),6,10,10,8077075),this.createBuilding(new _(-25,0,22),12,16,6,10506797),this.createBuilding(new _(5,0,42),8,11,8,9127187),this.createBuilding(new _(-18,0,45),10,13,10,10179875),this.createBuilding(new _(12,0,-22),10,15,8,7029795),this.createBuilding(new _(-8,0,-28),8,12,12,8082739),this.createBuilding(new _(28,0,-25),6,14,10,5977107),this.createBuilding(new _(-22,0,-30),12,10,8,9135411),this.createBuilding(new _(8,0,-45),10,16,6,7029795),this.createBuilding(new _(-15,0,-42),8,13,10,8082739),this.createBuilding(new _(35,0,8),8,14,10,12088143),this.createBuilding(new _(42,0,-5),10,12,8,11035455),this.createBuilding(new _(38,0,20),6,16,12,13140831),this.createBuilding(new _(50,0,12),12,11,8,12088143),this.createBuilding(new _(45,0,-18),8,15,10,11035455),this.createBuilding(new _(-35,0,5),10,13,8,5917242),this.createBuilding(new _(-42,0,-8),8,14,10,6969930),this.createBuilding(new _(-38,0,18),12,12,6,4864554),this.createBuilding(new _(-48,0,-15),8,16,10,8022618),this.createBuilding(new _(-45,0,25),10,11,8,5917242),this.createBuilding(new _(5,0,5),6,8,8,9132604),this.createBuilding(new _(-8,0,8),8,10,6,10185292),this.createBuilding(new _(12,0,-5),6,12,10,8079916),this.createBuilding(new _(-5,0,-10),10,9,8,11237980),this.createBuilding(new _(18,0,10),8,14,6,9132604),this.createBuilding(new _(-15,0,-2),6,11,8,10185292),this.createWall(new _(15,0,15),6,3,.5),this.createWall(new _(-15,0,15),6,3,.5),this.createWall(new _(15,0,-15),6,3,.5),this.createWall(new _(-15,0,-15),6,3,.5),this.createWall(new _(25,0,0),.5,3,8),this.createWall(new _(-25,0,0),.5,3,8),this.createWall(new _(0,0,25),8,3,.5),this.createWall(new _(0,0,-25),8,3,.5),this.createWall(new _(32,0,32),10,3,.5),this.createWall(new _(-32,0,32),10,3,.5),this.createWall(new _(32,0,-32),10,3,.5),this.createWall(new _(-32,0,-32),10,3,.5);for(let e=0;e<20;e++){const t=e/20*Math.PI*2,i=15+Math.random()*25,s=Math.cos(t)*i,n=Math.sin(t)*i;this.createCrate(new _(s,0,n))}for(let e=0;e<12;e++){const t=e/12*Math.PI*2,i=10+Math.random()*30,s=Math.cos(t)*i,n=Math.sin(t)*i,a=Math.random()*Math.PI*2;this.createCar(new _(s,0,n),a)}this.createStreetLight(new _(20,0,20)),this.createStreetLight(new _(-20,0,20)),this.createStreetLight(new _(20,0,-20)),this.createStreetLight(new _(-20,0,-20)),this.createStreetLight(new _(35,0,0)),this.createStreetLight(new _(-35,0,0)),this.createStreetLight(new _(0,0,35)),this.createStreetLight(new _(0,0,-35))}buildUrbanMap(){this.buildMapForLevel(1)}createGround(){const e=new Qn(200,200),t=new ft({color:5592405,roughness:.9,metalness:.1}),i=new Xe(e,t);i.rotation.x=-Math.PI/2,i.receiveShadow=!0,this.scene.add(i),this.mapObjects.push(i),i.updateMatrixWorld(!0),this.physicsManager.addCollider(i);const s=new g_(200,50,3355443,4473924);this.scene.add(s),this.mapObjects.push(s)}createBuilding(e,t,i,s,n=null){const a=new Lt(t,i,s),o=n||9139029,l=new ft({color:o,roughness:.8,metalness:.2}),c=new Xe(a,l);return c.position.copy(e),c.position.y=i/2,c.castShadow=!0,c.receiveShadow=!0,this.scene.add(c),this.mapObjects.push(c),this.addWindows(c,t,i,s),c.updateMatrixWorld(!0),this.physicsManager.addCollider(c),c}addWindows(e,t,i,s){const n=new ft({color:1710638,emissive:657950,metalness:.9,roughness:.1}),a=1.5,o=3,l=Math.floor(i/o),c=Math.floor(t/o);for(let h=1;h<l;h++)for(let u=0;u<c;u++){const d=new Lt(a,a,.1),p=new Xe(d,n);p.position.set(-t/2+o*(u+.5),-i/2+h*o,s/2+.05),e.add(p);const g=new Xe(d,n);g.position.set(-t/2+o*(u+.5),-i/2+h*o,-s/2-.05),e.add(g)}}createWall(e,t,i,s){const n=new Lt(t,i,s),a=new ft({color:9145227,roughness:.9}),o=new Xe(n,a);return o.position.copy(e),o.position.y=i/2,o.castShadow=!0,o.receiveShadow=!0,this.scene.add(o),this.mapObjects.push(o),o.updateMatrixWorld(!0),this.physicsManager.addCollider(o),o}createCar(e,t){const i=new Jt,s=new Lt(2,1.2,4),n=new ft({color:Math.random()>.5?1710618:9109504,metalness:.8,roughness:.3}),a=new Xe(s,n);a.position.y=.8,a.castShadow=!0,i.add(a);const o=new Lt(1.8,.8,2),l=new Xe(o,n);l.position.y=1.6,l.position.z=-.3,l.castShadow=!0,i.add(l);const c=new ft({color:1710638,metalness:.9,roughness:.1,transparent:!0,opacity:.6}),h=new Lt(1.7,.7,1.9),u=new Xe(h,c);u.position.y=1.6,u.position.z=-.3,i.add(u);const d=new Ps(.3,.3,.3,16),p=new ft({color:1710618,roughness:.9});return[[-.9,.3,1.3],[.9,.3,1.3],[-.9,.3,-1.3],[.9,.3,-1.3]].forEach(g=>{const v=new Xe(d,p);v.rotation.z=Math.PI/2,v.position.set(...g),v.castShadow=!0,i.add(v)}),i.position.copy(e),i.rotation.y=t,this.scene.add(i),this.mapObjects.push(i),i.updateMatrixWorld(!0),this.physicsManager.addCollider(i),i}createCrate(e){const t=new Lt(1.5,1.5,1.5),i=new ft({color:9136404,roughness:.9,metalness:.1}),s=new Xe(t,i);s.position.copy(e),s.position.y=1.5/2,s.castShadow=!0,s.receiveShadow=!0,this.scene.add(s),this.mapObjects.push(s);const n=new Og(t),a=new sn({color:5917194}),o=new ba(n,a);return s.add(o),s.updateMatrixWorld(!0),this.physicsManager.addCollider(s),s}createStreetLight(e){const t=new Jt,i=new Ps(.1,.1,6,8),s=new ft({color:3355443,metalness:.8,roughness:.3}),n=new Xe(i,s);n.position.y=3,n.castShadow=!0,t.add(n);const a=new Lt(.3,.3,.3),o=new ft({color:16777113,emissive:16777113,emissiveIntensity:.5}),l=new Xe(a,o);l.position.y=6,t.add(l);const c=new Pc(16777113,.5,20);return c.position.y=6,c.castShadow=!0,t.add(c),t.position.copy(e),this.scene.add(t),this.mapObjects.push(t),this.physicsManager.addCollider(n),t}}class x_{constructor(){this.keys={},this.mouse={movementX:0,movementY:0,buttons:{}},this.touch={enabled:window.matchMedia("(hover: none), (pointer: coarse), (max-width: 760px)").matches,moveX:0,moveY:0,lookX:0,lookY:0,activeLookId:null,lastLookX:0,lastLookY:0},this.setupEventListeners(),this.setupTouchControls()}setupEventListeners(){document.addEventListener("keydown",e=>{this.keys[e.code]=!0}),document.addEventListener("keyup",e=>{this.keys[e.code]=!1}),document.addEventListener("mousemove",e=>{this.mouse.movementX=e.movementX||0,this.mouse.movementY=e.movementY||0}),document.addEventListener("mousedown",e=>{this.mouse.buttons[e.button]=!0}),document.addEventListener("mouseup",e=>{this.mouse.buttons[e.button]=!1}),document.addEventListener("contextmenu",e=>{(this.touch.enabled||this.isMouseButtonPressed(2))&&e.preventDefault()})}setupTouchControls(){const e=document.getElementById("touch-move-pad"),t=document.getElementById("touch-move-stick"),i=document.getElementById("touch-look-zone");if(!e||!t||!i)return;const s=(c,h,u=h)=>{const d=document.querySelector(c);if(!d)return;const p=v=>{v.preventDefault(),d.classList.add("is-active"),h(!0)},g=v=>{v.preventDefault(),d.classList.remove("is-active"),u(!1)};d.addEventListener("pointerdown",p),d.addEventListener("pointerup",g),d.addEventListener("pointercancel",g),d.addEventListener("pointerleave",g)};let n=null;const a=c=>{const h=e.getBoundingClientRect(),u=h.width/2,d=h.left+u,p=h.top+u,g=c.clientX-d,v=c.clientY-p,f=Math.hypot(g,v),m=Math.min(f,u),S=Math.atan2(v,g),y=Math.cos(S)*m,A=Math.sin(S)*m;this.touch.moveX=f>8?y/u:0,this.touch.moveY=f>8?A/u:0,t.style.transform=`translate(calc(-50% + ${y}px), calc(-50% + ${A}px))`},o=()=>{n=null,this.touch.moveX=0,this.touch.moveY=0,t.style.transform="translate(-50%, -50%)"};e.addEventListener("pointerdown",c=>{c.preventDefault(),n=c.pointerId,e.setPointerCapture(c.pointerId),a(c)}),e.addEventListener("pointermove",c=>{c.pointerId===n&&(c.preventDefault(),a(c))}),e.addEventListener("pointerup",o),e.addEventListener("pointercancel",o),i.addEventListener("pointerdown",c=>{this.touch.activeLookId===null&&(c.preventDefault(),this.touch.activeLookId=c.pointerId,this.touch.lastLookX=c.clientX,this.touch.lastLookY=c.clientY,i.setPointerCapture(c.pointerId))}),i.addEventListener("pointermove",c=>{c.pointerId===this.touch.activeLookId&&(c.preventDefault(),this.touch.lookX+=c.clientX-this.touch.lastLookX,this.touch.lookY+=c.clientY-this.touch.lastLookY,this.touch.lastLookX=c.clientX,this.touch.lastLookY=c.clientY)});const l=c=>{c.pointerId===this.touch.activeLookId&&(this.touch.activeLookId=null)};i.addEventListener("pointerup",l),i.addEventListener("pointercancel",l),s('[data-touch-action="shoot"]',c=>{this.mouse.buttons[0]=c}),s('[data-touch-action="ads"]',c=>{this.mouse.buttons[2]=c}),s('[data-touch-action="reload"]',c=>{this.keys.KeyR=c}),s('[data-touch-action="run"]',c=>{this.keys.ShiftLeft=c}),s('[data-touch-action="jump"]',c=>{this.keys.Space=c})}isKeyPressed(e){return this.keys[e]||!1}isMouseButtonPressed(e){return this.mouse.buttons[e]||!1}getMouseMovement(){const e={x:this.mouse.movementX+this.touch.lookX,y:this.mouse.movementY+this.touch.lookY};return this.mouse.movementX=0,this.mouse.movementY=0,this.touch.lookX=0,this.touch.lookY=0,e}getMovementVector(){return{x:this.touch.moveX,y:this.touch.moveY}}isTouchEnabled(){return this.touch.enabled}}class S_{constructor(){this.context=null,this.sounds=new Map,this.masterVolume=.7,this.listener=null,this.initialized=!1}init(){if(this.initialized){console.log("Audio already initialized");return}try{this.context=new(window.AudioContext||window.webkitAudioContext),console.log("AudioContext created, state:",this.context.state),this.listener=new i_,this.initialized=!0,this.context.state==="suspended"?this.context.resume().then(()=>{console.log("✓ Audio context resumed to:",this.context.state),this.generateSounds()}):this.generateSounds(),console.log("✓ Audio system initialized")}catch(e){console.error("Web Audio API not supported:",e)}}generateSounds(){this.createGunshot("rifle"),this.createGunshot("pistol"),this.createReloadSound(),this.createImpactSound(),console.log("✓ Procedural sounds generated")}createGunshot(e){const t=e==="rifle"?.15:.12;this.sounds.set(e+"_shot",{type:"procedural",duration:t,isGunshot:!0,baseFreq:e==="rifle"?60:80}),console.log(`Created ${e} gunshot sound`)}createReloadSound(){this.sounds.set("reload",{type:"procedural",duration:.4,frequency:250})}createImpactSound(){this.sounds.set("impact",{type:"procedural",duration:.08,frequency:80})}loadAudioBuffer(e,t){this.sounds.set(e,{type:"buffer",buffer:t})}play(e,t=1){if(console.log(`🔊 play() called for: ${e}, volume: ${t}`),this.initialized||(console.log("⚠️ Audio not initialized, initializing now..."),this.init()),!this.context){console.error("❌ No audio context available after init!");return}if(console.log("AudioContext state:",this.context.state),this.context.state==="suspended"){console.log("⏸️ Audio context suspended, resuming..."),this.context.resume().then(()=>{console.log("✅ Audio context resumed to:",this.context.state),this.playSound(e,t)}).catch(i=>{console.error("❌ Failed to resume audio context:",i)});return}this.playSound(e,t)}playSound(e,t){if(console.log(`🎵 playSound() called for: ${e}`),!this.context){console.error("❌ No audio context in playSound!");return}const i=this.sounds.get(e);if(!i){console.error(`❌ Sound not found: ${e}`),console.log("Available sounds:",Array.from(this.sounds.keys()));return}console.log(`Found sound: ${e}, type: ${i.type}`);try{if(i.type==="buffer"){const s=this.context.createBufferSource(),n=this.context.createGain();s.buffer=i.buffer,s.connect(n),n.connect(this.context.destination),n.gain.value=t*this.masterVolume,s.start(0),console.log(`✅ Playing audio buffer: ${e}`)}else if(i.isGunshot)this.playGunshotSound(i,t);else{const s=this.context.createOscillator(),n=this.context.createGain();s.connect(n),n.connect(this.context.destination),s.frequency.value=i.frequency,s.type="sine";const a=this.context.currentTime,o=t*this.masterVolume;n.gain.setValueAtTime(o,a),n.gain.exponentialRampToValueAtTime(.001,a+i.duration),s.start(a),s.stop(a+i.duration),console.log(`✅ Playing procedural sound: ${e}`)}}catch(s){console.error("❌ Audio playback error:",s),console.error("Error stack:",s.stack)}}playGunshotSound(e,t){const i=this.context.currentTime,s=t*this.masterVolume,n=this.context.createOscillator(),a=this.context.createGain();n.connect(a),a.connect(this.context.destination),n.frequency.value=e.baseFreq,n.type="sine",a.gain.setValueAtTime(s*.8,i),a.gain.exponentialRampToValueAtTime(.001,i+e.duration),n.start(i),n.stop(i+e.duration);const o=this.context.createOscillator(),l=this.context.createGain();o.connect(l),l.connect(this.context.destination),o.frequency.value=e.baseFreq*4,o.type="square",l.gain.setValueAtTime(s*.4,i),l.gain.exponentialRampToValueAtTime(.001,i+e.duration*.5),o.start(i),o.stop(i+e.duration*.5);const c=this.context.createOscillator(),h=this.context.createGain();c.connect(h),h.connect(this.context.destination),c.frequency.value=e.baseFreq*12,c.type="sawtooth",h.gain.setValueAtTime(s*.3,i),h.gain.exponentialRampToValueAtTime(.001,i+e.duration*.3),c.start(i),c.stop(i+e.duration*.3),console.log(`✅ Playing realistic gunshot: ${e.baseFreq}Hz base`)}}class M_{constructor(){this.colliders=[],this.gravity=-20}addCollider(e,t="box"){const i=new Ot().setFromObject(e),s={mesh:e,type:t,bounds:i,updateBounds:function(){this.bounds.setFromObject(this.mesh)}};this.colliders.push(s);const n=i.getSize(new _);return console.log(`✓ Collider #${this.colliders.length}:`,`pos(${e.position.x.toFixed(1)}, ${e.position.y.toFixed(1)}, ${e.position.z.toFixed(1)})`,`size(${n.x.toFixed(1)} x ${n.y.toFixed(1)} x ${n.z.toFixed(1)})`),s}checkCollision(e,t=.5,i=1.8){const s=new Ot(new _(e.x-t,e.y,e.z-t),new _(e.x+t,e.y+i,e.z+t));for(const n of this.colliders)if(s.intersectsBox(n.bounds))return!0;return!1}resolveCollision(e,t,i=.5,s=1.8){const n=new Ot(new _(e.x-i,e.y,e.z-i),new _(e.x+i,e.y+s,e.z+i));let a=!1,o=0;for(const l of this.colliders)if(l.bounds.setFromObject(l.mesh),n.intersectsBox(l.bounds)){a=!0,o++;const c=new _;n.getCenter(c);const h=new _;l.bounds.getCenter(h);const u=new _().subVectors(c,h),d=new _;n.getSize(d);const p=new _;l.bounds.getSize(p);const g=(d.x+p.x)/2-Math.abs(u.x),v=(d.z+p.z)/2-Math.abs(u.z);if(g>0&&v>0)if(g<v){const f=g*1.1;e.x+=Math.sign(u.x)*f,t.x=0}else{const f=v*1.1;e.z+=Math.sign(u.z)*f,t.z=0}}return o>0&&console.log(`🚧 Hit ${o} obstacles`),a}raycast(e,t,i=100){const s=new f_(e,t,0,i).intersectObjects(this.colliders.map(n=>n.mesh),!0);return s.length>0?{hit:!0,point:s[0].point,distance:s[0].distance,object:s[0].object}:{hit:!1}}checkGrounded(e,t=.5){const i=e.clone();i.y+=.1;const s=new _(0,-1,0);return this.raycast(i,s,.2).hit}}class b_{constructor(){this.healthFill=document.getElementById("health-fill"),this.ammoCounter=document.getElementById("ammo-counter"),this.weaponName=document.getElementById("weapon-name"),this.damageOverlay=document.getElementById("damage-overlay"),this.deathScreen=document.getElementById("death-screen"),this.levelCompleteScreen=document.getElementById("level-complete-screen"),this.gameCompleteScreen=document.getElementById("game-complete-screen"),this.pauseScreen=document.getElementById("pause-screen"),this.crosshair=document.getElementById("crosshair"),this.audioStatus=document.getElementById("audio-status"),this.minimap=document.getElementById("minimap"),this.minimapCtx=this.minimap.getContext("2d"),this.resizeMinimap(),this.minimapScale=1.5}resizeMinimap(){const e=window.matchMedia("(max-width: 760px), (hover: none) and (pointer: coarse)").matches?112:300;this.minimap.width=e,this.minimap.height=e}update(e,t=[]){const i=e.health/e.maxHealth*100;this.healthFill.style.width=i+"%";const s=e.getCurrentWeapon();s&&(this.ammoCounter.textContent=`${s.currentAmmo} / ${s.reserveAmmo}`,this.weaponName.textContent=s.name.toUpperCase()),e.isADS?this.crosshair.style.opacity="0":this.crosshair.style.opacity="0.7",this.updateMinimap(e,t)}updateMinimap(e,t){const i=this.minimapCtx,s=this.minimap.width,n=this.minimap.height;i.fillStyle="rgba(0, 0, 0, 0.8)",i.fillRect(0,0,s,n),i.strokeStyle="rgba(0, 255, 0, 0.2)",i.lineWidth=1;for(let u=0;u<s;u+=20)i.beginPath(),i.moveTo(u,0),i.lineTo(u,n),i.stroke(),i.beginPath(),i.moveTo(0,u),i.lineTo(s,u),i.stroke();const a=2,o=s/2,l=n/2,c=u=>({x:o+u.x/a,y:l+u.z/a});t.forEach(u=>{if(u.isAlive){const d=c(u.position);if(d.x>=0&&d.x<=s&&d.y>=0&&d.y<=n){let p="#ff0000",g="rgba(255, 0, 0, 0.5)";u.state==="hold"||u.state==="idle"?(p="#00ff00",g="rgba(0, 255, 0, 0.4)"):u.state==="alert"?(p="#ffaa00",g="rgba(255, 170, 0, 0.5)"):u.state==="patrol"&&(p="#ff8800",g="rgba(255, 136, 0, 0.4)"),i.fillStyle=p,i.beginPath(),i.arc(d.x,d.y,4,0,Math.PI*2),i.fill(),i.strokeStyle=g,i.lineWidth=2,i.beginPath(),i.arc(d.x,d.y,6,0,Math.PI*2),i.stroke()}}});const h=c(e.position);i.save(),i.translate(h.x,h.y),i.rotate(e.yaw),i.fillStyle="#00aaff",i.beginPath(),i.moveTo(0,-8),i.lineTo(4,4),i.lineTo(0,0),i.lineTo(-4,4),i.closePath(),i.fill(),i.restore(),i.fillStyle="#00aaff",i.beginPath(),i.arc(h.x,h.y,5,0,Math.PI*2),i.fill(),i.strokeStyle="rgba(0, 170, 255, 0.7)",i.lineWidth=2,i.beginPath(),i.arc(h.x,h.y,7,0,Math.PI*2),i.stroke()}updateAudioStatus(e){if(!e||!e.context){this.audioStatus.textContent="🔇 Audio: Not initialized",this.audioStatus.style.color="#ff0000";return}const t=e.context.state;t==="running"?(this.audioStatus.textContent="🔊 Audio: Active",this.audioStatus.style.color="#00ff00"):t==="suspended"?(this.audioStatus.textContent="🔇 Audio: Click to activate",this.audioStatus.style.color="#ffaa00"):(this.audioStatus.textContent="🔇 Audio: "+t,this.audioStatus.style.color="#ff0000")}showDamageEffect(){this.damageOverlay.style.opacity="1",setTimeout(()=>{this.damageOverlay.style.opacity="0"},200)}showDeathScreen(){this.deathScreen.style.display="flex"}hideDeathScreen(){this.deathScreen.style.display="none"}showLevelCompleteScreen(e,t){const i=document.getElementById("level-stats"),s=t*100;i.textContent=`Level ${e} Complete!
Enemies Defeated: ${t}
Points: ${s}`,this.levelCompleteScreen.style.display="flex"}hideLevelCompleteScreen(){this.levelCompleteScreen.style.display="none"}showGameCompleteScreen(){this.gameCompleteScreen.style.display="flex"}hideGameCompleteScreen(){this.gameCompleteScreen.style.display="none"}showPauseScreen(){this.pauseScreen.style.display="flex"}hidePauseScreen(){this.pauseScreen.style.display="none"}}function Nl(r,e){if(e===Nh)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===ea||e===$l){let t=r.getIndex();if(t===null){const a=[],o=r.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);r.setIndex(a),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const i=t.count-2,s=[];if(e===ea)for(let a=1;a<=i;a++)s.push(t.getX(0)),s.push(t.getX(a)),s.push(t.getX(a+1));else for(let a=0;a<i;a++)a%2===0?(s.push(t.getX(a)),s.push(t.getX(a+1)),s.push(t.getX(a+2))):(s.push(t.getX(a+2)),s.push(t.getX(a+1)),s.push(t.getX(a)));s.length/3!==i&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const n=r.clone();return n.setIndex(s),n.clearGroups(),n}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}class T_ extends $i{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new L_(t)}),this.register(function(t){return new B_(t)}),this.register(function(t){return new z_(t)}),this.register(function(t){return new k_(t)}),this.register(function(t){return new P_(t)}),this.register(function(t){return new I_(t)}),this.register(function(t){return new U_(t)}),this.register(function(t){return new N_(t)}),this.register(function(t){return new R_(t)}),this.register(function(t){return new D_(t)}),this.register(function(t){return new C_(t)}),this.register(function(t){return new F_(t)}),this.register(function(t){return new O_(t)}),this.register(function(t){return new A_(t)}),this.register(function(t){return new H_(t)}),this.register(function(t){return new G_(t)})}load(e,t,i,s){const n=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const c=Js.extractUrlBase(e);a=Js.resolveURL(c,this.path)}else a=Js.extractUrlBase(e);this.manager.itemStart(e);const o=function(c){s?s(c):console.error(c),n.manager.itemError(e),n.manager.itemEnd(e)},l=new Ca(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{n.parse(c,a,function(h){t(h),n.manager.itemEnd(e)},o)}catch(h){o(h)}},i,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,i,s){let n;const a={},o={},l=new TextDecoder;if(typeof e=="string")n=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Oc){try{a[Ve.KHR_BINARY_GLTF]=new V_(e)}catch(h){s&&s(h);return}n=JSON.parse(a[Ve.KHR_BINARY_GLTF].content)}else n=JSON.parse(l.decode(e));else n=e;if(n.asset===void 0||n.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new iv(n,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(n.extensionsUsed)for(let h=0;h<n.extensionsUsed.length;++h){const u=n.extensionsUsed[h],d=n.extensionsRequired||[];switch(u){case Ve.KHR_MATERIALS_UNLIT:a[u]=new w_;break;case Ve.KHR_DRACO_MESH_COMPRESSION:a[u]=new W_(n,this.dracoLoader);break;case Ve.KHR_TEXTURE_TRANSFORM:a[u]=new X_;break;case Ve.KHR_MESH_QUANTIZATION:a[u]=new j_;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(i,s)}parseAsync(e,t){const i=this;return new Promise(function(s,n){i.parse(e,t,s,n)})}}function E_(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const Ve={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class A_{constructor(e){this.parser=e,this.name=Ve.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let i=0,s=t.length;i<s;i++){const n=t[i];n.extensions&&n.extensions[this.name]&&n.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,n.extensions[this.name].light)}}_loadLight(e){const t=this.parser,i="light:"+e;let s=t.cache.get(i);if(s)return s;const n=t.json,a=((n.extensions&&n.extensions[this.name]||{}).lights||[])[e];let o;const l=new xe(16777215);a.color!==void 0&&l.setRGB(a.color[0],a.color[1],a.color[2],_t);const c=a.range!==void 0?a.range:0;switch(a.type){case"directional":o=new Ic(l),o.target.position.set(0,0,-1),o.add(o.target);break;case"point":o=new Pc(l),o.distance=c;break;case"spot":o=new Kg(l),o.distance=c,a.spot=a.spot||{},a.spot.innerConeAngle=a.spot.innerConeAngle!==void 0?a.spot.innerConeAngle:0,a.spot.outerConeAngle=a.spot.outerConeAngle!==void 0?a.spot.outerConeAngle:Math.PI/4,o.angle=a.spot.outerConeAngle,o.penumbra=1-a.spot.innerConeAngle/a.spot.outerConeAngle,o.target.position.set(0,0,-1),o.add(o.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+a.type)}return o.position.set(0,0,0),o.decay=2,Ti(o,a),a.intensity!==void 0&&(o.intensity=a.intensity),o.name=t.createUniqueName(a.name||"light_"+e),s=Promise.resolve(o),t.cache.add(i,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,i=this.parser,s=i.json.nodes[e],n=(s.extensions&&s.extensions[this.name]||{}).light;return n===void 0?null:this._loadLight(n).then(function(a){return i._getNodeRef(t.cache,n,a)})}}class w_{constructor(){this.name=Ve.KHR_MATERIALS_UNLIT}getMaterialType(){return Kt}extendParams(e,t,i){const s=[];e.color=new xe(1,1,1),e.opacity=1;const n=t.pbrMetallicRoughness;if(n){if(Array.isArray(n.baseColorFactor)){const a=n.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],_t),e.opacity=a[3]}n.baseColorTexture!==void 0&&s.push(i.assignTexture(e,"map",n.baseColorTexture,at))}return Promise.all(s)}}class R_{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class L_{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const t=this.parser.json.materials[e];return!t.extensions||!t.extensions[this.name]?null:_i}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const n=[],a=s.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&n.push(i.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&n.push(i.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(n.push(i.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new le(o,o)}return Promise.all(n)}}class C_{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const t=this.parser.json.materials[e];return!t.extensions||!t.extensions[this.name]?null:_i}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const n=[],a=s.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&n.push(i.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&n.push(i.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(n)}}class P_{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_SHEEN}getMaterialType(e){const t=this.parser.json.materials[e];return!t.extensions||!t.extensions[this.name]?null:_i}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const n=[];t.sheenColor=new xe(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=s.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],_t)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&n.push(i.assignTexture(t,"sheenColorMap",a.sheenColorTexture,at)),a.sheenRoughnessTexture!==void 0&&n.push(i.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(n)}}class I_{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const t=this.parser.json.materials[e];return!t.extensions||!t.extensions[this.name]?null:_i}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const n=[],a=s.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&n.push(i.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(n)}}class U_{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_VOLUME}getMaterialType(e){const t=this.parser.json.materials[e];return!t.extensions||!t.extensions[this.name]?null:_i}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const n=[],a=s.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&n.push(i.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new xe().setRGB(o[0],o[1],o[2],_t),Promise.all(n)}}class N_{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_IOR}getMaterialType(e){const t=this.parser.json.materials[e];return!t.extensions||!t.extensions[this.name]?null:_i}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class D_{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_SPECULAR}getMaterialType(e){const t=this.parser.json.materials[e];return!t.extensions||!t.extensions[this.name]?null:_i}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const n=[],a=s.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&n.push(i.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new xe().setRGB(o[0],o[1],o[2],_t),a.specularColorTexture!==void 0&&n.push(i.assignTexture(t,"specularColorMap",a.specularColorTexture,at)),Promise.all(n)}}class O_{constructor(e){this.parser=e,this.name=Ve.EXT_MATERIALS_BUMP}getMaterialType(e){const t=this.parser.json.materials[e];return!t.extensions||!t.extensions[this.name]?null:_i}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const n=[],a=s.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&n.push(i.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(n)}}class F_{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const t=this.parser.json.materials[e];return!t.extensions||!t.extensions[this.name]?null:_i}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const n=[],a=s.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&n.push(i.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(n)}}class B_{constructor(e){this.parser=e,this.name=Ve.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,i=t.json,s=i.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const n=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,n.source,a)}}class z_{constructor(e){this.parser=e,this.name=Ve.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,i=this.parser,s=i.json,n=s.textures[e];if(!n.extensions||!n.extensions[t])return null;const a=n.extensions[t],o=s.images[a.source];let l=i.textureLoader;if(o.uri){const c=i.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return i.loadTextureImage(e,a.source,l);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return i.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class k_{constructor(e){this.parser=e,this.name=Ve.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,i=this.parser,s=i.json,n=s.textures[e];if(!n.extensions||!n.extensions[t])return null;const a=n.extensions[t],o=s.images[a.source];let l=i.textureLoader;if(o.uri){const c=i.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return i.loadTextureImage(e,a.source,l);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return i.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class H_{constructor(e){this.name=Ve.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,i=t.bufferViews[e];if(i.extensions&&i.extensions[this.name]){const s=i.extensions[this.name],n=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return n.then(function(o){const l=s.byteOffset||0,c=s.byteLength||0,h=s.count,u=s.byteStride,d=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,s.mode,s.filter).then(function(p){return p.buffer}):a.ready.then(function(){const p=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(p),h,u,d,s.mode,s.filter),p})})}else return null}}class G_{constructor(e){this.name=Ve.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,i=t.nodes[e];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;const s=t.meshes[i.mesh];for(const l of s.primitives)if(l.mode!==Ht.TRIANGLES&&l.mode!==Ht.TRIANGLE_STRIP&&l.mode!==Ht.TRIANGLE_FAN&&l.mode!==void 0)return null;const n=i.extensions[this.name].attributes,a=[],o={};for(const l in n)a.push(this.parser.getDependency("accessor",n[l]).then(c=>(o[l]=c,o[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{const c=l.pop(),h=c.isGroup?c.children:[c],u=l[0].count,d=[];for(const p of h){const g=new Fe,v=new _,f=new Ut,m=new _(1,1,1),S=new xg(p.geometry,p.material,u);for(let y=0;y<u;y++)o.TRANSLATION&&v.fromBufferAttribute(o.TRANSLATION,y),o.ROTATION&&f.fromBufferAttribute(o.ROTATION,y),o.SCALE&&m.fromBufferAttribute(o.SCALE,y),S.setMatrixAt(y,g.compose(v,f,m));for(const y in o)if(y==="_COLOR_0"){const A=o[y];S.instanceColor=new ra(A.array,A.itemSize,A.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&p.geometry.setAttribute(y,o[y]);it.prototype.copy.call(S,p),this.parser.assignFinalMaterial(S),d.push(S)}return c.isGroup?(c.clear(),c.add(...d),c):d[0]}))}}const Oc="glTF",Xs=12,Dl={JSON:1313821514,BIN:5130562};class V_{constructor(e){this.name=Ve.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Xs),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Oc)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-Xs,n=new DataView(e,Xs);let a=0;for(;a<s;){const o=n.getUint32(a,!0);a+=4;const l=n.getUint32(a,!0);if(a+=4,l===Dl.JSON){const c=new Uint8Array(e,Xs+a,o);this.content=i.decode(c)}else if(l===Dl.BIN){const c=Xs+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class W_{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Ve.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const i=this.json,s=this.dracoLoader,n=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(const h in a){const u=ca[h]||h.toLowerCase();o[u]=a[h]}for(const h in e.attributes){const u=ca[h]||h.toLowerCase();if(a[h]!==void 0){const d=i.accessors[e.attributes[h]],p=bs[d.componentType];c[u]=p.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",n).then(function(h){return new Promise(function(u,d){s.decodeDracoFile(h,function(p){for(const g in p.attributes){const v=p.attributes[g],f=l[g];f!==void 0&&(v.normalized=f)}u(p)},o,c,_t,d)})})}}class X_{constructor(){this.name=Ve.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class j_{constructor(){this.name=Ve.KHR_MESH_QUANTIZATION}}class Fc extends nn{constructor(e,t,i,s){super(e,t,i,s)}copySampleValue_(e){const t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,n=e*s*3+s;for(let a=0;a!==s;a++)t[a]=i[n+a];return t}interpolate_(e,t,i,s){const n=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=s-t,u=(i-t)/h,d=u*u,p=d*u,g=e*c,v=g-c,f=-2*p+3*d,m=p-d,S=1-f,y=m-d+u;for(let A=0;A!==o;A++){const C=a[v+A+o],w=a[v+A+l]*h,R=a[g+A+o],G=a[g+A]*h;n[A]=S*C+y*w+f*R+m*G}return n}}const q_=new Ut;class Y_ extends Fc{interpolate_(e,t,i,s){const n=super.interpolate_(e,t,i,s);return q_.fromArray(n).normalize().toArray(n),n}}const Ht={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},bs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Ol={9728:gt,9729:Pt,9984:$r,9985:Wl,9986:Hn,9987:qi},Fl={33071:Vt,33648:Wn,10497:ji},Xr={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},ca={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},bi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},K_={CUBICSPLINE:void 0,LINEAR:ws,STEP:$s},jr={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function J_(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new ft({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:gi})),r.DefaultMaterial}function Bi(r,e,t){for(const i in t.extensions)r[i]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[i]=t.extensions[i])}function Ti(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Z_(r,e,t){let i=!1,s=!1,n=!1;for(let c=0,h=e.length;c<h;c++){const u=e[c];if(u.POSITION!==void 0&&(i=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(n=!0),i&&s&&n)break}if(!i&&!s&&!n)return Promise.resolve(r);const a=[],o=[],l=[];for(let c=0,h=e.length;c<h;c++){const u=e[c];if(i){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):r.attributes.position;a.push(d)}if(s){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):r.attributes.normal;o.push(d)}if(n){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):r.attributes.color;l.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2];return i&&(r.morphAttributes.position=h),s&&(r.morphAttributes.normal=u),n&&(r.morphAttributes.color=d),r.morphTargetsRelative=!0,r})}function $_(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,i=e.weights.length;t<i;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let i=0,s=t.length;i<s;i++)r.morphTargetDictionary[t[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Q_(r){let e;const t=r.extensions&&r.extensions[Ve.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+qr(t.attributes):e=r.indices+":"+qr(r.attributes)+":"+r.mode,r.targets!==void 0)for(let i=0,s=r.targets.length;i<s;i++)e+=":"+qr(r.targets[i]);return e}function qr(r){let e="";const t=Object.keys(r).sort();for(let i=0,s=t.length;i<s;i++)e+=t[i]+":"+r[t[i]]+";";return e}function ha(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function ev(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const tv=new Fe;class iv{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new E_,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,s=!1,n=-1;typeof navigator<"u"&&(i=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,s=navigator.userAgent.indexOf("Firefox")>-1,n=s?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||i||s&&n<98?this.textureLoader=new Cc(this.options.manager):this.textureLoader=new Qg(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Ca(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const i=this,s=this.json,n=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(a){const o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:i,userData:{}};return Bi(n,o,s),Ti(o,s),Promise.all(i._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],i=this.json.meshes||[];for(let s=0,n=t.length;s<n;s++){const a=t[s].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let s=0,n=e.length;s<n;s++){const a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(i[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,i){if(e.refs[t]<=1)return i;const s=i.clone(),n=(a,o)=>{const l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(const[c,h]of a.children.entries())n(h,o.children[c])};return n(i,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let i=0;i<t.length;i++){const s=e(t[i]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const i=[];for(let s=0;s<t.length;s++){const n=e(t[s]);n&&i.push(n)}return i}getDependency(e,t){const i=e+":"+t;let s=this.cache.get(i);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(n){return n.loadNode&&n.loadNode(t)});break;case"mesh":s=this._invokeOne(function(n){return n.loadMesh&&n.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(n){return n.loadBufferView&&n.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(n){return n.loadMaterial&&n.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(n){return n.loadTexture&&n.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(n){return n.loadAnimation&&n.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(n){return n!=this&&n.getDependency&&n.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(i,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const i=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(n,a){return i.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],i=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Ve.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(n,a){i.load(Js.resolveURL(t.uri,s.path),n,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(i){const s=t.byteLength||0,n=t.byteOffset||0;return i.slice(n,n+s)})}loadAccessor(e){const t=this,i=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const a=Xr[s.type],o=bs[s.componentType],l=s.normalized===!0,c=new o(s.count*a);return Promise.resolve(new Tt(c,a,l))}const n=[];return s.bufferView!==void 0?n.push(this.getDependency("bufferView",s.bufferView)):n.push(null),s.sparse!==void 0&&(n.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),n.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(n).then(function(a){const o=a[0],l=Xr[s.type],c=bs[s.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=s.byteOffset||0,p=s.bufferView!==void 0?i.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0;let v,f;if(p&&p!==u){const m=Math.floor(d/p),S="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+m+":"+s.count;let y=t.cache.get(S);y||(v=new c(o,m*p,s.count*p/h),y=new mg(v,p/h),t.cache.add(S,y)),f=new Sa(y,l,d%p/h,g)}else o===null?v=new c(s.count*l):v=new c(o,d,s.count*l),f=new Tt(v,l,g);if(s.sparse!==void 0){const m=Xr.SCALAR,S=bs[s.sparse.indices.componentType],y=s.sparse.indices.byteOffset||0,A=s.sparse.values.byteOffset||0,C=new S(a[1],y,s.sparse.count*m),w=new c(a[2],A,s.sparse.count*l);o!==null&&(f=new Tt(f.array.slice(),f.itemSize,f.normalized));for(let R=0,G=C.length;R<G;R++){const M=C[R];if(f.setX(M,w[R*l]),l>=2&&f.setY(M,w[R*l+1]),l>=3&&f.setZ(M,w[R*l+2]),l>=4&&f.setW(M,w[R*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return f})}loadTexture(e){const t=this.json,i=this.options,s=t.textures[e].source,n=t.images[s];let a=this.textureLoader;if(n.uri){const o=i.manager.getHandler(n.uri);o!==null&&(a=o)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,i){const s=this,n=this.json,a=n.textures[e],o=n.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,i).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);const u=(n.samplers||{})[a.sampler]||{};return h.magFilter=Ol[u.magFilter]||Pt,h.minFilter=Ol[u.minFilter]||qi,h.wrapS=Fl[u.wrapS]||ji,h.wrapT=Fl[u.wrapT]||ji,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const i=this,s=this.json,n=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const a=s.images[e],o=self.URL||self.webkitURL;let l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=i.getDependency("bufferView",a.bufferView).then(function(u){c=!0;const d=new Blob([u],{type:a.mimeType});return l=o.createObjectURL(d),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(d,p){let g=d;t.isImageBitmapLoader===!0&&(g=function(v){const f=new yt(v);f.needsUpdate=!0,d(f)}),t.load(Js.resolveURL(u,n.path),g,void 0,p)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),u.userData.mimeType=a.mimeType||ev(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,i,s){const n=this;return this.getDependency("texture",i.index).then(function(a){if(!a)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(a=a.clone(),a.channel=i.texCoord),n.extensions[Ve.KHR_TEXTURE_TRANSFORM]){const o=i.extensions!==void 0?i.extensions[Ve.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const l=n.associations.get(a);a=n.extensions[Ve.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),n.associations.set(a,l)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let i=e.material;const s=t.attributes.tangent===void 0,n=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+i.uuid;let l=this.cache.get(o);l||(l=new Ta,ii.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,l.sizeAttenuation=!1,this.cache.add(o,l)),i=l}else if(e.isLine){const o="LineBasicMaterial:"+i.uuid;let l=this.cache.get(o);l||(l=new sn,ii.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,this.cache.add(o,l)),i=l}if(s||n||a){let o="ClonedMaterial:"+i.uuid+":";s&&(o+="derivative-tangents:"),n&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=i.clone(),n&&(l.vertexColors=!0),a&&(l.flatShading=!0),s&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(i))),i=l}e.material=i}getMaterialType(){return ft}loadMaterial(e){const t=this,i=this.json,s=this.extensions,n=i.materials[e];let a;const o={},l=n.extensions||{},c=[];if(l[Ve.KHR_MATERIALS_UNLIT]){const u=s[Ve.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),c.push(u.extendParams(o,n,t))}else{const u=n.pbrMetallicRoughness||{};if(o.color=new xe(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],_t),o.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",u.baseColorTexture,at)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}n.doubleSided===!0&&(o.side=ei);const h=n.alphaMode||jr.OPAQUE;if(h===jr.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===jr.MASK&&(o.alphaTest=n.alphaCutoff!==void 0?n.alphaCutoff:.5)),n.normalTexture!==void 0&&a!==Kt&&(c.push(t.assignTexture(o,"normalMap",n.normalTexture)),o.normalScale=new le(1,1),n.normalTexture.scale!==void 0)){const u=n.normalTexture.scale;o.normalScale.set(u,u)}if(n.occlusionTexture!==void 0&&a!==Kt&&(c.push(t.assignTexture(o,"aoMap",n.occlusionTexture)),n.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=n.occlusionTexture.strength)),n.emissiveFactor!==void 0&&a!==Kt){const u=n.emissiveFactor;o.emissive=new xe().setRGB(u[0],u[1],u[2],_t)}return n.emissiveTexture!==void 0&&a!==Kt&&c.push(t.assignTexture(o,"emissiveMap",n.emissiveTexture,at)),Promise.all(c).then(function(){const u=new a(o);return n.name&&(u.name=n.name),Ti(u,n),t.associations.set(u,{materials:e}),n.extensions&&Bi(s,u,n),u})}createUniqueName(e){const t=je.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,i=this.extensions,s=this.primitiveCache;function n(o){return i[Ve.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return Bl(l,o,t)})}const a=[];for(let o=0,l=e.length;o<l;o++){const c=e[o],h=Q_(c),u=s[h];if(u)a.push(u.promise);else{let d;c.extensions&&c.extensions[Ve.KHR_DRACO_MESH_COMPRESSION]?d=n(c):d=Bl(new vt,c,t),s[h]={primitive:c,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){const t=this,i=this.json,s=this.extensions,n=i.meshes[e],a=n.primitives,o=[];for(let l=0,c=a.length;l<c;l++){const h=a[l].material===void 0?J_(this.cache):this.getDependency("material",a[l].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let p=0,g=h.length;p<g;p++){const v=h[p],f=a[p];let m;const S=c[p];if(f.mode===Ht.TRIANGLES||f.mode===Ht.TRIANGLE_STRIP||f.mode===Ht.TRIANGLE_FAN||f.mode===void 0)m=n.isSkinnedMesh===!0?new gg(v,S):new Xe(v,S),m.isSkinnedMesh===!0&&m.normalizeSkinWeights(),f.mode===Ht.TRIANGLE_STRIP?m.geometry=Nl(m.geometry,$l):f.mode===Ht.TRIANGLE_FAN&&(m.geometry=Nl(m.geometry,ea));else if(f.mode===Ht.LINES)m=new ba(v,S);else if(f.mode===Ht.LINE_STRIP)m=new tr(v,S);else if(f.mode===Ht.LINE_LOOP)m=new Sg(v,S);else if(f.mode===Ht.POINTS)m=new Sc(v,S);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+f.mode);Object.keys(m.geometry.morphAttributes).length>0&&$_(m,n),m.name=t.createUniqueName(n.name||"mesh_"+e),Ti(m,n),f.extensions&&Bi(s,m,f),t.assignFinalMaterial(m),u.push(m)}for(let p=0,g=u.length;p<g;p++)t.associations.set(u[p],{meshes:e,primitives:p});if(u.length===1)return n.extensions&&Bi(s,u[0],n),u[0];const d=new Jt;n.extensions&&Bi(s,d,n),t.associations.set(d,{meshes:e});for(let p=0,g=u.length;p<g;p++)d.add(u[p]);return d})}loadCamera(e){let t;const i=this.json.cameras[e],s=i[i.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?t=new Ct(ru.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):i.type==="orthographic"&&(t=new va(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),i.name&&(t.name=this.createUniqueName(i.name)),Ti(t,i),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],i=[];for(let s=0,n=t.joints.length;s<n;s++)i.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",t.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(s){const n=s.pop(),a=s,o=[],l=[];for(let c=0,h=a.length;c<h;c++){const u=a[c];if(u){o.push(u);const d=new Fe;n!==null&&d.fromArray(n.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Ma(o,l)})}loadAnimation(e){const t=this.json,i=this,s=t.animations[e],n=s.name?s.name:"animation_"+e,a=[],o=[],l=[],c=[],h=[];for(let u=0,d=s.channels.length;u<d;u++){const p=s.channels[u],g=s.samplers[p.sampler],v=p.target,f=v.node,m=s.parameters!==void 0?s.parameters[g.input]:g.input,S=s.parameters!==void 0?s.parameters[g.output]:g.output;v.node!==void 0&&(a.push(this.getDependency("node",f)),o.push(this.getDependency("accessor",m)),l.push(this.getDependency("accessor",S)),c.push(g),h.push(v))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){const d=u[0],p=u[1],g=u[2],v=u[3],f=u[4],m=[];for(let S=0,y=d.length;S<y;S++){const A=d[S],C=p[S],w=g[S],R=v[S],G=f[S];if(A===void 0)continue;A.updateMatrix&&A.updateMatrix();const M=i._createAnimationTracks(A,C,w,R,G);if(M)for(let E=0;E<M.length;E++)m.push(M[E])}return new oa(n,void 0,m)})}createNodeMesh(e){const t=this.json,i=this,s=t.nodes[e];return s.mesh===void 0?null:i.getDependency("mesh",s.mesh).then(function(n){const a=i._getNodeRef(i.meshCache,s.mesh,n);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=s.weights.length;l<c;l++)o.morphTargetInfluences[l]=s.weights[l]}),a})}loadNode(e){const t=this.json,i=this,s=t.nodes[e],n=i._loadNodeShallow(e),a=[],o=s.children||[];for(let c=0,h=o.length;c<h;c++)a.push(i.getDependency("node",o[c]));const l=s.skin===void 0?Promise.resolve(null):i.getDependency("skin",s.skin);return Promise.all([n,Promise.all(a),l]).then(function(c){const h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(p){p.isSkinnedMesh&&p.bind(d,tv)});for(let p=0,g=u.length;p<g;p++)h.add(u[p]);return h})}_loadNodeShallow(e){const t=this.json,i=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const n=t.nodes[e],a=n.name?s.createUniqueName(n.name):"",o=[],l=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),n.camera!==void 0&&o.push(s.getDependency("camera",n.camera).then(function(c){return s._getNodeRef(s.cameraCache,n.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let h;if(n.isBone===!0?h=new xc:c.length>1?h=new Jt:c.length===1?h=c[0]:h=new it,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(n.name&&(h.userData.name=n.name,h.name=a),Ti(h,n),n.extensions&&Bi(i,h,n),n.matrix!==void 0){const u=new Fe;u.fromArray(n.matrix),h.applyMatrix4(u)}else n.translation!==void 0&&h.position.fromArray(n.translation),n.rotation!==void 0&&h.quaternion.fromArray(n.rotation),n.scale!==void 0&&h.scale.fromArray(n.scale);return s.associations.has(h)||s.associations.set(h,{}),s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,i=this.json.scenes[e],s=this,n=new Jt;i.name&&(n.name=s.createUniqueName(i.name)),Ti(n,i),i.extensions&&Bi(t,n,i);const a=i.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(s.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let h=0,u=l.length;h<u;h++)n.add(l[h]);const c=h=>{const u=new Map;for(const[d,p]of s.associations)(d instanceof ii||d instanceof yt)&&u.set(d,p);return h.traverse(d=>{const p=s.associations.get(d);p!=null&&u.set(d,p)}),u};return s.associations=c(n),n})}_createAnimationTracks(e,t,i,s,n){const a=[],o=e.name?e.name:e.uuid,l=[];bi[n.path]===bi.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(o);let c;switch(bi[n.path]){case bi.weights:c=Is;break;case bi.rotation:c=Ji;break;case bi.position:case bi.scale:c=Us;break;default:switch(i.itemSize){case 1:c=Is;break;case 2:case 3:default:c=Us;break}break}const h=s.interpolation!==void 0?K_[s.interpolation]:ws,u=this._getArrayFromAccessor(i);for(let d=0,p=l.length;d<p;d++){const g=new c(l[d]+"."+bi[n.path],t.array,u,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),a.push(g)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const i=ha(t.constructor),s=new Float32Array(t.length);for(let n=0,a=t.length;n<a;n++)s[n]=t[n]*i;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(t){const i=this instanceof Ji?Y_:Fc;return new i(this.times,this.values,this.getValueSize()/3,t)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function sv(r,e,t){const i=e.attributes,s=new Ot;if(i.POSITION!==void 0){const o=t.json.accessors[i.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(s.set(new _(l[0],l[1],l[2]),new _(c[0],c[1],c[2])),o.normalized){const h=ha(bs[o.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const n=e.targets;if(n!==void 0){const o=new _,l=new _;for(let c=0,h=n.length;c<h;c++){const u=n[c];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],p=d.min,g=d.max;if(p!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(p[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(p[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(p[2]),Math.abs(g[2]))),d.normalized){const v=ha(bs[d.componentType]);l.multiplyScalar(v)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}r.boundingBox=s;const a=new si;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,r.boundingSphere=a}function Bl(r,e,t){const i=e.attributes,s=[];function n(a,o){return t.getDependency("accessor",a).then(function(l){r.setAttribute(o,l)})}for(const a in i){const o=ca[a]||a.toLowerCase();o in r.attributes||s.push(n(i[a],o))}if(e.indices!==void 0&&!r.index){const a=t.getDependency("accessor",e.indices).then(function(o){r.setIndex(o)});s.push(a)}return qe.workingColorSpace!==_t&&"COLOR_0"in i&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${qe.workingColorSpace}" not supported.`),Ti(r,e),sv(r,e,t),Promise.all(s).then(function(){return e.targets!==void 0?Z_(r,e.targets,t):r})}class nv{constructor(){this.gltfLoader=new T_,this.textureLoader=new Cc,this.audioLoader=new e_,this.assets={models:new Map,textures:new Map,audio:new Map},this.loadingManager=new Lc,this.setupLoadingManager()}setupLoadingManager(){this.loadingManager.onStart=(e,t,i)=>{console.log(`Started loading: ${e}`)},this.loadingManager.onLoad=()=>{console.log("All assets loaded!")},this.loadingManager.onProgress=(e,t,i)=>{const s=t/i*100;console.log(`Loading progress: ${s.toFixed(0)}%`),this.updateLoadingUI(s)},this.loadingManager.onError=e=>{console.warn(`Error loading: ${e}`)}}updateLoadingUI(e){const t=document.getElementById("loading-progress");t&&(t.style.width=e+"%")}async loadAllAssets(){return console.log("Loading assets..."),await Promise.allSettled([this.loadCharacterModels(),this.loadTextures(),this.loadAudio()]),console.log("Asset loading complete"),this.assets}async loadCharacterModels(){var e;const t="/urban-warfare/",i=[{name:"enemy",path:`${t}models/characters/enemy_soldier.glb`},{name:"player_arms",path:`${t}models/weapons/glock.glb`}];for(const s of i)try{console.log(`📦 Attempting to load: ${s.name} from ${s.path}`);const n=await this.gltfLoader.loadAsync(s.path);this.assets.models.set(s.name,n),console.log(`✓ Loaded character: ${s.name}`),console.log(`  - Scene children: ${n.scene.children.length}`),console.log(`  - Animations: ${((e=n.animations)==null?void 0:e.length)||0}`)}catch(n){console.error(`✗ Could not load ${s.name}:`,n),console.warn(`  Using procedural model for ${s.name}`)}}async loadTextures(){const e=[{name:"ground_diffuse",path:"/textures/ground/concrete_diffuse.jpg"},{name:"ground_normal",path:"/textures/ground/concrete_normal.jpg"},{name:"ground_roughness",path:"/textures/ground/concrete_roughness.jpg"},{name:"wall_diffuse",path:"/textures/walls/brick_diffuse.jpg"}];for(const t of e)try{const i=await this.textureLoader.loadAsync(t.path);i.wrapS=i.wrapT=ji,this.assets.textures.set(t.name,i),console.log(`✓ Loaded texture: ${t.name}`)}catch{console.warn(`✗ Could not load ${t.name}, using solid color`)}}async loadAudio(){const e="/urban-warfare/",t=[{name:"gunshot",path:`${e}gunshot.ogg`},{name:"background_music",path:`${e}background-music.mp3`}];for(const i of t)try{const s=await this.audioLoader.loadAsync(i.path);this.assets.audio.set(i.name,s),console.log(`✓ Loaded audio: ${i.name}`)}catch{console.warn(`✗ Could not load ${i.name}, using procedural sound`)}}integrateWithAudioManager(e){this.assets.audio.forEach((t,i)=>{e.loadAudioBuffer(i,t)})}getModel(e){return this.assets.models.get(e)}getTexture(e){return this.assets.textures.get(e)}getAudio(e){return this.assets.audio.get(e)}hasModel(e){return this.assets.models.has(e)}hasTexture(e){return this.assets.textures.has(e)}hasAudio(e){return this.assets.audio.has(e)}}class rv{constructor(e){this.scene=e,this.particles=[]}createBloodSplatter(e,t){const i=new vt,s=[],n=[];for(let l=0;l<15;l++){s.push(e.x,e.y,e.z);const c=.5,h=new _(t.x+(Math.random()-.5)*c,t.y+(Math.random()-.5)*c+.3,t.z+(Math.random()-.5)*c);h.multiplyScalar(2+Math.random()*3),n.push(h)}i.setAttribute("position",new st(s,3));const a=new Ta({color:9109504,size:.15,transparent:!0,opacity:.9,depthWrite:!1}),o=new Sc(i,a);this.scene.add(o),this.particles.push({mesh:o,velocities:n,lifetime:0,maxLifetime:1.5}),this.createBloodDecal(e)}createBloodDecal(e){const t=new La(.3+Math.random()*.2,8),i=new Kt({color:6684672,transparent:!0,opacity:.7,depthWrite:!1}),s=new Xe(t,i);s.rotation.x=-Math.PI/2,s.position.copy(e),s.position.y=.01,this.scene.add(s),setTimeout(()=>{const n=setInterval(()=>{s.material.opacity-=.05,s.material.opacity<=0&&(this.scene.remove(s),s.geometry.dispose(),s.material.dispose(),clearInterval(n))},100)},1e4)}update(e){for(let t=this.particles.length-1;t>=0;t--){const i=this.particles[t];if(i.lifetime+=e,i.lifetime>=i.maxLifetime){this.scene.remove(i.mesh),i.mesh.geometry.dispose(),i.mesh.material.dispose(),this.particles.splice(t,1);continue}const s=i.mesh.geometry.attributes.position.array;for(let a=0;a<i.velocities.length;a++){const o=i.velocities[a];o.y-=9.8*e,s[a*3]+=o.x*e,s[a*3+1]+=o.y*e,s[a*3+2]+=o.z*e,s[a*3+1]<.1&&(s[a*3+1]=.1,o.multiplyScalar(.3))}i.mesh.geometry.attributes.position.needsUpdate=!0;const n=i.lifetime/i.maxLifetime;i.mesh.material.opacity=.9*(1-n)}}}class av{constructor(){this.scene=null,this.camera=null,this.renderer=null,this.player=null,this.enemies=[],this.mapBuilder=null,this.inputManager=null,this.audioManager=null,this.physicsManager=null,this.uiManager=null,this.assetLoader=null,this.bloodEffect=null,this.clock=new Nc,this.isPaused=!1,this.isRunning=!1,this.backgroundMusicSource=null,this.gameState="playing",this.currentLevel=1,this.maxLevel=3,this.enemiesKilled=0,this.isMobile=window.matchMedia("(hover: none), (pointer: coarse), (max-width: 760px)").matches}async init(){this.renderer=new yc({antialias:!0,powerPreference:"high-performance"}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,this.isMobile?1.25:2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Hl,document.body.appendChild(this.renderer.domElement),this.scene=new pg,this.scene.background=new xe(2767450),this.scene.fog=new xa(2767450,40,180),this.camera=new Ct(75,window.innerWidth/window.innerHeight,.01,1e3),this.inputManager=new x_,this.audioManager=new S_,this.physicsManager=new M_,this.uiManager=new b_,this.assetLoader=new nv,this.bloodEffect=new rv(this.scene),await this.assetLoader.loadAllAssets(),this.assetLoader.integrateWithAudioManager(this.audioManager),this.startBackgroundMusic(),this.mapBuilder=new y_(this.scene,this.physicsManager),this.mapBuilder.buildMapForLevel(1),this.setupLighting(),this.player=new __(this.scene,this.camera,this.inputManager,this.audioManager,this.physicsManager,this.assetLoader),this.player.position.set(0,0,0),console.log("✓ Player spawned at CENTER:",this.player.position),this.spawnEnemies(),console.log("✓ Enemies enabled with 0.01 scale"),window.addEventListener("resize",()=>this.onWindowResize()),document.getElementById("respawn-button").addEventListener("click",()=>{this.respawn()}),document.getElementById("next-level-button").addEventListener("click",()=>{this.nextLevel()}),document.getElementById("restart-button").addEventListener("click",()=>{this.restartGame()})}startBackgroundMusic(){if(this.audioManager.initialized||this.audioManager.init(),this.assetLoader.hasAudio("background_music")){const e=this.assetLoader.getAudio("background_music"),t=()=>{if(!this.audioManager.context){console.log("⚠️ Audio context not ready yet");return}const s=this.audioManager.context.createBufferSource(),n=this.audioManager.context.createGain();s.buffer=e,s.loop=!0,s.connect(n),n.connect(this.audioManager.context.destination),n.gain.value=.3*this.audioManager.masterVolume,this.audioManager.context.state==="suspended"?this.audioManager.context.resume().then(()=>{s.start(0),console.log("🎵 Background music started (after resume)")}):(s.start(0),console.log("🎵 Background music started")),this.backgroundMusicSource=s};setTimeout(t,1e3);const i=()=>{t(),document.removeEventListener("click",i),document.removeEventListener("keydown",i)};document.addEventListener("click",i),document.addEventListener("keydown",i)}else console.log("⚠️ No background music loaded")}setupLighting(){const e=new $g(6316160,.65);this.scene.add(e);const t=new Ic(8952251,.75);t.position.set(50,100,50),t.castShadow=!0,t.shadow.camera.left=-100,t.shadow.camera.right=100,t.shadow.camera.top=100,t.shadow.camera.bottom=-100,t.shadow.camera.near=.5,t.shadow.camera.far=500,t.shadow.mapSize.width=this.isMobile?1024:2048,t.shadow.mapSize.height=this.isMobile?1024:2048,this.scene.add(t);const i=new qg(4872826,2763322,.55);this.scene.add(i)}spawnEnemies(){this.enemies.forEach(t=>{t.model&&this.scene.remove(t.model)}),this.enemies=[];let e=[];this.currentLevel===1?(e=[new _(20,0,20),new _(-20,0,25),new _(25,0,-15),new _(-22,0,-18),new _(15,0,30)],console.log("🎮 LEVEL 1: 5 enemies spawned")):this.currentLevel===2?(e=[new _(20,0,20),new _(-20,0,25),new _(25,0,-15),new _(-22,0,-18),new _(15,0,30),new _(30,0,20),new _(-25,0,30),new _(40,0,-15),new _(-30,0,-20),new _(15,0,35)],console.log("🎮 LEVEL 2: 10 enemies spawned")):this.currentLevel===3&&(e=[new _(20,0,20),new _(-20,0,25),new _(25,0,-15),new _(-22,0,-18),new _(15,0,30),new _(30,0,20),new _(-25,0,30),new _(40,0,-15),new _(-30,0,-20),new _(15,0,35),new _(50,0,40),new _(-45,0,45),new _(45,0,-45),new _(-40,0,-50),new _(60,0,10),new _(-55,0,20),new _(35,0,-55),new _(-35,0,55)],console.log("🎮 LEVEL 3: 18 enemies spawned - FINAL LEVEL!")),e.forEach(t=>{const i=new v_(this.scene,this.physicsManager,this.audioManager,t,this.assetLoader);Math.random()<.7?i.setState("hold"):(i.setState("patrol"),i.targetPosition=i.patrolPoints[0]),this.enemies.push(i)}),console.log(`✓ Level ${this.currentLevel}: Spawned ${this.enemies.length} enemies`)}start(){this.isRunning=!0,this.animate()}pause(){this.isPaused=!0}resume(){this.isPaused=!1}animate(){if(!this.isRunning||(requestAnimationFrame(()=>this.animate()),this.isPaused))return;const e=this.clock.getDelta(),t=this.clock.getElapsedTime();this.update(e,t),this.render()}update(e,t){this.gameState==="dead"||this.gameState==="levelComplete"||(this.player.update(e,t),this.bloodEffect&&this.bloodEffect.update(e),this.enemies.forEach(i=>{i.isAlive&&(i.update(e,t,this.player,this.enemies),i.bullets.forEach(s=>{s.active&&this.checkBulletHit(s,this.player.position,.5)&&(this.player.takeDamage(10),s.active=!1,this.player.health<=0&&this.onPlayerDeath())}))}),this.player.weapons.forEach(i=>{i.bullets.forEach(s=>{s.active&&this.enemies.forEach(n=>{if(n.isAlive&&this.checkBulletHit(s,n.position,3)){const a=s.position.distanceTo(n.position),o=s.getDistanceTraveled();console.log(`💥 HIT! Enemy at distance: ${a.toFixed(1)}m, bullet traveled: ${o.toFixed(1)}m`),console.log(`   Enemy health: ${n.health}/${n.maxHealth} -> ${n.health-i.damage}/${n.maxHealth}`);const l=s.direction.clone(),c=n.position.clone();c.y+=1,this.bloodEffect.createBloodSplatter(c,l);const h=n.isAlive;if(n.takeDamage(i.damage),s.active=!1,h&&!n.isAlive){this.enemiesKilled++,console.log(`💀 Enemy killed! Total: ${this.enemiesKilled}/${this.enemies.length}`);const u=this.enemies.filter(d=>d.isAlive).length;console.log(`👹 Enemies remaining: ${u}`),u===0&&(console.log("🎉 ALL ENEMIES DEAD - LEVEL COMPLETE!"),setTimeout(()=>this.onLevelComplete(),500))}}})})}),this.uiManager.update(this.player,this.enemies),this.uiManager.updateAudioStatus(this.audioManager))}checkBulletHit(e,t,i){const s=[t.clone(),t.clone().add(new _(0,.5,0)),t.clone().add(new _(0,1,0)),t.clone().add(new _(0,1.5,0)),t.clone().add(new _(0,1.8,0))];for(const n of s)if(e.position.distanceTo(n)<i)return!0;return!1}onPlayerDeath(){this.gameState="dead",this.uiManager.showDeathScreen(),document.pointerLockElement&&document.exitPointerLock()}onLevelComplete(){console.log(`🎉 LEVEL ${this.currentLevel} COMPLETE!`),this.gameState="levelComplete",this.uiManager.showLevelCompleteScreen(this.currentLevel,this.enemiesKilled),document.pointerLockElement&&document.exitPointerLock()}nextLevel(){this.currentLevel<this.maxLevel?(this.currentLevel++,this.enemiesKilled=0,this.gameState="playing",this.player.health=this.player.maxHealth,this.player.position.set(0,1.7,0),this.player.velocity.set(0,0,0),this.mapBuilder.buildMapForLevel(this.currentLevel),console.log(`🗺️ Built new map for Level ${this.currentLevel}`),this.spawnEnemies(),this.uiManager.hideLevelCompleteScreen(),this.requestPointerLock(),console.log(`🎮 Starting Level ${this.currentLevel}`)):(this.uiManager.hideLevelCompleteScreen(),this.uiManager.showGameCompleteScreen())}restartGame(){this.currentLevel=1,this.enemiesKilled=0,this.gameState="playing",this.player.health=this.player.maxHealth,this.player.isAlive=!0,this.player.position.set(0,1.7,0),this.player.velocity.set(0,0,0),this.player.weapons.forEach(e=>e.reset()),this.mapBuilder.buildMapForLevel(1),console.log("🗺️ Built Level 1 map"),this.spawnEnemies(),this.uiManager.hideGameCompleteScreen(),this.requestPointerLock(),console.log("🎮 Game restarted - Level 1")}respawn(){this.gameState="playing",this.player.respawn(),this.player.isAlive=!0,this.uiManager.hideDeathScreen(),this.enemies.forEach(e=>{e.isAlive||e.respawn()}),this.requestPointerLock(),console.log("✓ Respawned - Player alive:",this.player.isAlive,"Health:",this.player.health)}render(){this.renderer.render(this.scene,this.camera)}onWindowResize(){this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,this.isMobile?1.25:2)),this.uiManager.resizeMinimap()}requestPointerLock(){if(this.isMobile)return;const e=document.body;e.requestPointerLock=e.requestPointerLock||e.mozRequestPointerLock||e.webkitRequestPointerLock,e.requestPointerLock&&e.requestPointerLock()}togglePause(){this.isPaused?(this.isPaused=!1,this.uiManager.hidePauseScreen(),this.requestPointerLock()):(this.isPaused=!0,this.uiManager.showPauseScreen(),document.pointerLockElement&&document.exitPointerLock())}quitToMenu(){this.isRunning=!1,this.isPaused=!1,this.uiManager.hidePauseScreen(),this.uiManager.hideDeathScreen(),this.uiManager.hideLevelCompleteScreen(),this.uiManager.hideGameCompleteScreen(),document.getElementById("start-screen").style.display="flex",document.pointerLockElement&&document.exitPointerLock(),this.currentLevel=1,this.enemiesKilled=0,this.gameState="playing",console.log("✓ Quit to menu")}getTextState(){const e=this.player?this.player.getCurrentWeapon():null;return{mode:this.gameState,paused:this.isPaused,level:this.currentLevel,player:this.player?{x:Number(this.player.position.x.toFixed(2)),y:Number(this.player.position.y.toFixed(2)),z:Number(this.player.position.z.toFixed(2)),yaw:Number(this.player.yaw.toFixed(2)),health:this.player.health}:null,weapon:e?{name:e.name,ammo:e.currentAmmo,reserve:e.reserveAmmo,reloading:e.isReloading}:null,enemiesAlive:this.enemies.filter(t=>t.isAlive).length,controls:this.isMobile?"touch joystick, swipe look, fire/ads/reload/run/jump buttons":"keyboard and mouse",coordinates:"x/z are ground plane coordinates; y is height"}}}let Re=null;const Da=window.matchMedia("(hover: none), (pointer: coarse), (max-width: 760px)").matches,ov=document.getElementById("start-button"),lv=document.getElementById("start-screen");ov.addEventListener("click",async()=>{lv.style.display="none";const r=document.getElementById("background-music");r&&(r.volume=.2,r.play().catch(e=>console.log("Background music autoplay blocked:",e))),Re||(Re=new av,await Re.init(),Re.audioManager.init(),setTimeout(()=>{console.log("Testing audio..."),Re.audioManager.play("rifle_shot",1)},500),Re.start(),!Da&&Re.renderer&&Re.renderer.domElement?(Re.renderer.domElement.addEventListener("click",()=>{!document.pointerLockElement&&!document.webkitPointerLockElement&&zl()}),zl()):document.body.classList.add("playing"),window.game=Re,window.render_game_to_text=()=>JSON.stringify(Re.getTextState()),window.advanceTime=e=>{if(!Re||!Re.isRunning||Re.isPaused)return;const t=Math.max(1,Math.round(e/(1e3/60)));for(let i=0;i<t;i++)Re.update(1/60,Re.clock.getElapsedTime());Re.render()},console.log('Game started! Type "game" in console to debug.'),console.log("Click on the game screen to lock cursor"))});const Oa=()=>{if(Da)return;const r=Re&&Re.renderer?Re.renderer.domElement:null;document.pointerLockElement===document.body||document.pointerLockElement===r||document.mozPointerLockElement===document.body||document.mozPointerLockElement===r||document.webkitPointerLockElement===document.body||document.webkitPointerLockElement===r?(console.log("✓ Pointer locked!"),Re&&Re.isPaused&&Re.resume(),document.body.style.cursor="none",document.body.classList.add("playing"),r&&(r.style.cursor="none")):(console.log("✗ Pointer unlocked"),Re&&Re.gameState==="playing"&&!Re.isPaused&&Re.togglePause(),document.body.style.cursor="default",document.body.classList.remove("playing"))};document.addEventListener("pointerlockchange",Oa);document.addEventListener("mozpointerlockchange",Oa);document.addEventListener("webkitpointerlockchange",Oa);document.addEventListener("keydown",r=>{r.key==="Escape"&&Re&&Re.isRunning&&Re.gameState==="playing"&&(r.preventDefault(),Re.togglePause())});document.getElementById("resume-button").addEventListener("click",()=>{Re&&Re.togglePause()});document.getElementById("quit-button").addEventListener("click",()=>{Re&&Re.quitToMenu()});document.getElementById("touch-pause-button").addEventListener("click",()=>{Re&&Re.isRunning&&Re.gameState==="playing"&&Re.togglePause()});function zl(){if(Da)return;const r=Re&&Re.renderer?Re.renderer.domElement:document.body;if(r.requestPointerLock=r.requestPointerLock||r.mozRequestPointerLock||r.webkitRequestPointerLock,!r.requestPointerLock){console.error("❌ Pointer Lock API not available");return}try{r.requestPointerLock(),console.log("✓ Pointer lock requested on",r.tagName)}catch(e){console.error("❌ Pointer lock request failed:",e)}document.body.classList.add("playing"),document.body.style.cursor="none",r.style.cursor="none"}
//# sourceMappingURL=index-BBynHXJy.js.map
