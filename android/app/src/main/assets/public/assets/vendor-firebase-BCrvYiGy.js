import{o as Vy,R as Tl}from"./vendor-Cpe9YZDt.js";const xy=()=>{};var nd={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ap={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const x=function(n,e){if(!n)throw Gr(e)},Gr=function(n){return new Error("Firebase Database ("+ap.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cp=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Dy=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],o=n[t++],c=n[t++],l=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const i=n[t++],o=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},wl={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],o=s+1<n.length,c=o?n[s+1]:0,l=s+2<n.length,u=l?n[s+2]:0,f=i>>2,p=(i&3)<<4|c>>4;let m=(c&15)<<2|u>>6,A=u&63;l||(A=64,o||(m=64)),r.push(t[f],t[p],t[m],t[A])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(cp(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Dy(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const u=s<n.length?t[n.charAt(s)]:64;++s;const p=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||c==null||u==null||p==null)throw new Oy;const m=i<<2|c>>4;if(r.push(m),u!==64){const A=c<<4&240|u>>2;if(r.push(A),p!==64){const S=u<<6&192|p;r.push(S)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Oy extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const lp=function(n){const e=cp(n);return wl.encodeByteArray(e,!0)},wo=function(n){return lp(n).replace(/\./g,"")},Io=function(n){try{return wl.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ly(n){return up(void 0,n)}function up(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!My(t)||(n[t]=up(n[t],e[t]));return n}function My(n){return n!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fy(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uy=()=>Fy().__FIREBASE_DEFAULTS__,By=()=>{if(typeof process>"u"||typeof nd>"u")return;const n=nd.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},qy=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Io(n[1]);return e&&JSON.parse(e)},ia=()=>{try{return xy()||Uy()||By()||qy()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},hp=n=>{var e,t;return(t=(e=ia())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},dp=n=>{const e=hp(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},fp=()=>{var n;return(n=ia())==null?void 0:n.config},pp=n=>{var e;return(e=ia())==null?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hr{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _p(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[wo(JSON.stringify(t)),wo(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function je(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Il(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(je())}function $y(){var e;const n=(e=ia())==null?void 0:e.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Wy(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function jy(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function mp(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function zy(){const n=je();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Gy(){return ap.NODE_ADMIN===!0}function Hy(){return!$y()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Ky(){try{return typeof indexedDB=="object"}catch{return!1}}function Qy(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)==null?void 0:i.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yy="FirebaseError";class Jt extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Yy,Object.setPrototypeOf(this,Jt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ei.prototype.create)}}class Ei{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?Jy(i,r):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new Jt(s,c,r)}}function Jy(n,e){return n.replace(Xy,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Xy=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ys(n){return JSON.parse(n)}function Se(n){return JSON.stringify(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gp=function(n){let e={},t={},r={},s="";try{const i=n.split(".");e=Ys(Io(i[0])||""),t=Ys(Io(i[1])||""),s=i[2],r=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:r,signature:s}},Zy=function(n){const e=gp(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},eE=function(n){const e=gp(n).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ot(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function kr(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function Dc(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Ao(n,e,t){const r={};for(const s in n)Object.prototype.hasOwnProperty.call(n,s)&&(r[s]=e.call(t,n[s],s,n));return r}function Cn(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],o=e[s];if(rd(i)&&rd(o)){if(!Cn(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function rd(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kr(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Ns(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function ks(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tE{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const r=this.W_;if(typeof e=="string")for(let p=0;p<16;p++)r[p]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let p=0;p<16;p++)r[p]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let p=16;p<80;p++){const m=r[p-3]^r[p-8]^r[p-14]^r[p-16];r[p]=(m<<1|m>>>31)&4294967295}let s=this.chain_[0],i=this.chain_[1],o=this.chain_[2],c=this.chain_[3],l=this.chain_[4],u,f;for(let p=0;p<80;p++){p<40?p<20?(u=c^i&(o^c),f=1518500249):(u=i^o^c,f=1859775393):p<60?(u=i&o|c&(i|o),f=2400959708):(u=i^o^c,f=3395469782);const m=(s<<5|s>>>27)+u+l+f+r[p]&4294967295;l=c,c=o,o=(i<<30|i>>>2)&4294967295,i=s,s=m}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+i&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+c&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const r=t-this.blockSize;let s=0;const i=this.buf_;let o=this.inbuf_;for(;s<t;){if(o===0)for(;s<=r;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<t;)if(i[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(i),o=0;break}}else for(;s<t;)if(i[o]=e[s],++o,++s,o===this.blockSize){this.compress_(i),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=t&255,t/=256;this.compress_(this.buf_);let r=0;for(let s=0;s<5;s++)for(let i=24;i>=0;i-=8)e[r]=this.chain_[s]>>i&255,++r;return e}}function nE(n,e){const t=new rE(n,e);return t.subscribe.bind(t)}class rE{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");sE(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=_c),s.error===void 0&&(s.error=_c),s.complete===void 0&&(s.complete=_c);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function sE(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function _c(){}function oa(n,e){return`${n} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iE=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);if(s>=55296&&s<=56319){const i=s-55296;r++,x(r<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(r)-56320;s=65536+(i<<10)+o}s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):s<65536?(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},aa=function(n){let e=0;for(let t=0;t<n.length;t++){const r=n.charCodeAt(t);r<128?e++:r<2048?e+=2:r>=55296&&r<=56319?(e+=4,t++):e+=3}return e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ue(n){return n&&n._delegate?n._delegate:n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ar(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Al(n){return(await fetch(n,{credentials:"include"})).ok}class Rn{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oE{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Hr;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(cE(e))try{this.getOrInitializeService({instanceIdentifier:jn})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=jn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=jn){return this.instances.has(e)}getOptions(e=jn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&o.resolve(s)}return s}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:aE(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=jn){return this.component?this.component.multipleInstances?e:jn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function aE(n){return n===jn?void 0:n}function cE(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lE{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new oE(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Y;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(Y||(Y={}));const uE={debug:Y.DEBUG,verbose:Y.VERBOSE,info:Y.INFO,warn:Y.WARN,error:Y.ERROR,silent:Y.SILENT},hE=Y.INFO,dE={[Y.DEBUG]:"log",[Y.VERBOSE]:"log",[Y.INFO]:"info",[Y.WARN]:"warn",[Y.ERROR]:"error"},fE=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=dE[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ca{constructor(e){this.name=e,this._logLevel=hE,this._logHandler=fE,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Y))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?uE[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Y.DEBUG,...e),this._logHandler(this,Y.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Y.VERBOSE,...e),this._logHandler(this,Y.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Y.INFO,...e),this._logHandler(this,Y.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Y.WARN,...e),this._logHandler(this,Y.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Y.ERROR,...e),this._logHandler(this,Y.ERROR,...e)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pE{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(_E(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function _E(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Oc="@firebase/app",sd="0.15.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zt=new ca("@firebase/app"),mE="@firebase/app-compat",gE="@firebase/analytics-compat",yE="@firebase/analytics",EE="@firebase/app-check-compat",vE="@firebase/app-check",TE="@firebase/auth",wE="@firebase/auth-compat",IE="@firebase/database",AE="@firebase/data-connect",CE="@firebase/database-compat",RE="@firebase/functions",SE="@firebase/functions-compat",PE="@firebase/installations",bE="@firebase/installations-compat",NE="@firebase/messaging",kE="@firebase/messaging-compat",VE="@firebase/performance",xE="@firebase/performance-compat",DE="@firebase/remote-config",OE="@firebase/remote-config-compat",LE="@firebase/storage",ME="@firebase/storage-compat",FE="@firebase/firestore",UE="@firebase/ai",BE="@firebase/firestore-compat",qE="firebase",$E="12.16.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lc="[DEFAULT]",WE={[Oc]:"fire-core",[mE]:"fire-core-compat",[yE]:"fire-analytics",[gE]:"fire-analytics-compat",[vE]:"fire-app-check",[EE]:"fire-app-check-compat",[TE]:"fire-auth",[wE]:"fire-auth-compat",[IE]:"fire-rtdb",[AE]:"fire-data-connect",[CE]:"fire-rtdb-compat",[RE]:"fire-fn",[SE]:"fire-fn-compat",[PE]:"fire-iid",[bE]:"fire-iid-compat",[NE]:"fire-fcm",[kE]:"fire-fcm-compat",[VE]:"fire-perf",[xE]:"fire-perf-compat",[DE]:"fire-rc",[OE]:"fire-rc-compat",[LE]:"fire-gcs",[ME]:"fire-gcs-compat",[FE]:"fire-fst",[BE]:"fire-fst-compat",[UE]:"fire-vertex","fire-js":"fire-js",[qE]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vr=new Map,Mc=new Map,Fc=new Map;function id(n,e){try{n.container.addComponent(e)}catch(t){zt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Zn(n){const e=n.name;if(Fc.has(e))return zt.debug(`There were multiple attempts to register component ${e}.`),!1;Fc.set(e,n);for(const t of Vr.values())id(t,n);for(const t of Mc.values())id(t,n);return!0}function la(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function et(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jE={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},gn=new Ei("app","Firebase",jE);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zE{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Rn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw gn.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cr=$E;function GE(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:Lc,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw gn.create("bad-app-name",{appName:String(s)});if(t||(t=fp()),!t)throw gn.create("no-options");const i=Vr.get(s);if(i){if(Cn(t,i.options)&&Cn(r,i.config))return i;throw gn.create("duplicate-app",{appName:s})}const o=new lE(s);for(const l of Fc.values())o.addComponent(l);const c=new zE(t,r,o);return Vr.set(s,c),c}function Cl(n=Lc){const e=Vr.get(n);if(!e&&n===Lc&&fp())return GE();if(!e)throw gn.create("no-app",{appName:n});return e}async function lN(n){let e=!1;const t=n.name;Vr.has(t)?(e=!0,Vr.delete(t)):Mc.has(t)&&n.decRefCount()<=0&&(Mc.delete(t),e=!0),e&&(await Promise.all(n.container.getProviders().map(r=>r.delete())),n.isDeleted=!0)}function Nt(n,e,t){let r=WE[n]??n;t&&(r+=`-${t}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const o=[`Unable to register library "${r}" with version "${e}":`];s&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),zt.warn(o.join(" "));return}Zn(new Rn(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HE="firebase-heartbeat-database",KE=1,Js="firebase-heartbeat-store";let mc=null;function yp(){return mc||(mc=Vy(HE,KE,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Js)}catch(t){console.warn(t)}}}}).catch(n=>{throw gn.create("idb-open",{originalErrorMessage:n.message})})),mc}async function QE(n){try{const t=(await yp()).transaction(Js),r=await t.objectStore(Js).get(Ep(n));return await t.done,r}catch(e){if(e instanceof Jt)zt.warn(e.message);else{const t=gn.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});zt.warn(t.message)}}}async function od(n,e){try{const r=(await yp()).transaction(Js,"readwrite");await r.objectStore(Js).put(e,Ep(n)),await r.done}catch(t){if(t instanceof Jt)zt.warn(t.message);else{const r=gn.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});zt.warn(r.message)}}}function Ep(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YE=1024,JE=30;class XE{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new ev(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=ad();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>JE){const o=tv(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){zt.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=ad(),{heartbeatsToSend:r,unsentEntries:s}=ZE(this._heartbeatsCache.heartbeats),i=wo(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return zt.warn(t),""}}}function ad(){return new Date().toISOString().substring(0,10)}function ZE(n,e=YE){const t=[];let r=n.slice();for(const s of n){const i=t.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),cd(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),cd(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class ev{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ky()?Qy().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await QE(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return od(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return od(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function cd(n){return wo(JSON.stringify({version:2,heartbeats:n})).length}function tv(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nv(n){Zn(new Rn("platform-logger",e=>new pE(e),"PRIVATE")),Zn(new Rn("heartbeat",e=>new XE(e),"PRIVATE")),Nt(Oc,sd,n),Nt(Oc,sd,"esm2020"),Nt("fire-js","")}nv("");var rv="firebase",sv="12.16.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Nt(rv,sv,"app");var ld={};const ud="@firebase/database",hd="1.1.3";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let vp="";function iv(n){vp=n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ov{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),Se(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:Ys(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class av{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return Ot(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tp=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new ov(e)}}catch{}return new av},Hn=Tp("localStorage"),cv=Tp("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wr=new ca("@firebase/database"),lv=(function(){let n=1;return function(){return n++}})(),wp=function(n){const e=iE(n),t=new tE;t.update(e);const r=t.digest();return wl.encodeByteArray(r)},vi=function(...n){let e="";for(let t=0;t<n.length;t++){const r=n[t];Array.isArray(r)||r&&typeof r=="object"&&typeof r.length=="number"?e+=vi.apply(null,r):typeof r=="object"?e+=Se(r):e+=r,e+=" "}return e};let Ms=null,dd=!0;const uv=function(n,e){x(!0,"Can't turn on custom loggers persistently."),wr.logLevel=Y.VERBOSE,Ms=wr.log.bind(wr)},Oe=function(...n){if(dd===!0&&(dd=!1,Ms===null&&cv.get("logging_enabled")===!0&&uv()),Ms){const e=vi.apply(null,n);Ms(e)}},Ti=function(n){return function(...e){Oe(n,...e)}},Uc=function(...n){const e="FIREBASE INTERNAL ERROR: "+vi(...n);wr.error(e)},Gt=function(...n){const e=`FIREBASE FATAL ERROR: ${vi(...n)}`;throw wr.error(e),new Error(e)},Ye=function(...n){const e="FIREBASE WARNING: "+vi(...n);wr.warn(e)},hv=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&Ye("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Rl=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},dv=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},xr="[MIN_NAME]",er="[MAX_NAME]",lr=function(n,e){if(n===e)return 0;if(n===xr||e===er)return-1;if(e===xr||n===er)return 1;{const t=fd(n),r=fd(e);return t!==null?r!==null?t-r===0?n.length-e.length:t-r:-1:r!==null?1:n<e?-1:1}},fv=function(n,e){return n===e?0:n<e?-1:1},As=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+Se(e))},Sl=function(n){if(typeof n!="object"||n===null)return Se(n);const e=[];for(const r in n)e.push(r);e.sort();let t="{";for(let r=0;r<e.length;r++)r!==0&&(t+=","),t+=Se(e[r]),t+=":",t+=Sl(n[e[r]]);return t+="}",t},Ip=function(n,e){const t=n.length;if(t<=e)return[n];const r=[];for(let s=0;s<t;s+=e)s+e>t?r.push(n.substring(s,t)):r.push(n.substring(s,s+e));return r};function Le(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const Ap=function(n){x(!Rl(n),"Invalid JSON number");const e=11,t=52,r=(1<<e-1)-1;let s,i,o,c,l;n===0?(i=0,o=0,s=1/n===-1/0?1:0):(s=n<0,n=Math.abs(n),n>=Math.pow(2,1-r)?(c=Math.min(Math.floor(Math.log(n)/Math.LN2),r),i=c+r,o=Math.round(n*Math.pow(2,t-c)-Math.pow(2,t))):(i=0,o=Math.round(n/Math.pow(2,1-r-t))));const u=[];for(l=t;l;l-=1)u.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)u.push(i%2?1:0),i=Math.floor(i/2);u.push(s?1:0),u.reverse();const f=u.join("");let p="";for(l=0;l<64;l+=8){let m=parseInt(f.substr(l,8),2).toString(16);m.length===1&&(m="0"+m),p=p+m}return p.toLowerCase()},pv=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},_v=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function mv(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const r=new Error(n+" at "+e._path.toString()+": "+t);return r.code=n.toUpperCase(),r}const gv=new RegExp("^-?(0*)\\d{1,10}$"),yv=-2147483648,Ev=2147483647,fd=function(n){if(gv.test(n)){const e=Number(n);if(e>=yv&&e<=Ev)return e}return null},Qr=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw Ye("Exception was thrown by user callback.",t),e},Math.floor(0))}},vv=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Fs=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tv{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,et(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t==null?void 0:t.getImmediate({optional:!0}),this.appCheck||t==null||t.get().then(r=>this.appCheck=r)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,r)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,r):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)==null||t.get().then(r=>r.addTokenListener(e))}notifyForInvalidToken(){Ye(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wv{constructor(e,t,r){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=r,this.auth_=null,this.auth_=r.getImmediate({optional:!0}),this.auth_||r.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(Oe("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,r)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,r):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',Ye(e)}}class lo{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}lo.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pl="5",Cp="v",Rp="s",Sp="r",Pp="f",bp=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Np="ls",kp="p",Bc="ac",Vp="websocket",xp="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dp{constructor(e,t,r,s,i=!1,o="",c=!1,l=!1,u=null){this.secure=t,this.namespace=r,this.webSocketOnly=s,this.nodeAdmin=i,this.persistenceKey=o,this.includeNamespaceInQueryParams=c,this.isUsingEmulator=l,this.emulatorOptions=u,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Hn.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Hn.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function Iv(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function Op(n,e,t){x(typeof e=="string","typeof type must == string"),x(typeof t=="object","typeof params must == object");let r;if(e===Vp)r=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===xp)r=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);Iv(n)&&(t.ns=n.namespace);const s=[];return Le(t,(i,o)=>{s.push(i+"="+o)}),r+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Av{constructor(){this.counters_={}}incrementCounter(e,t=1){Ot(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return Ly(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gc={},yc={};function bl(n){const e=n.toString();return gc[e]||(gc[e]=new Av),gc[e]}function Cv(n,e){const t=n.toString();return yc[t]||(yc[t]=e()),yc[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rv{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const r=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<r.length;++s)r[s]&&Qr(()=>{this.onMessage_(r[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pd="start",Sv="close",Pv="pLPCommand",bv="pRTLPCB",Lp="id",Mp="pw",Fp="ser",Nv="cb",kv="seg",Vv="ts",xv="d",Dv="dframe",Up=1870,Bp=30,Ov=Up-Bp,Lv=25e3,Mv=3e4;class Tr{constructor(e,t,r,s,i,o,c){this.connId=e,this.repoInfo=t,this.applicationId=r,this.appCheckToken=s,this.authToken=i,this.transportSessionId=o,this.lastSessionId=c,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Ti(e),this.stats_=bl(t),this.urlFn=l=>(this.appCheckToken&&(l[Bc]=this.appCheckToken),Op(t,xp,l))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new Rv(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(Mv)),dv(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Nl((...i)=>{const[o,c,l,u,f]=i;if(this.incrementIncomingBytes_(i),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===pd)this.id=c,this.password=l;else if(o===Sv)c?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(c,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...i)=>{const[o,c]=i;this.incrementIncomingBytes_(i),this.myPacketOrderer.handleResponse(o,c)},()=>{this.onClosed_()},this.urlFn);const r={};r[pd]="t",r[Fp]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(r[Nv]=this.scriptTagHolder.uniqueCallbackIdentifier),r[Cp]=Pl,this.transportSessionId&&(r[Rp]=this.transportSessionId),this.lastSessionId&&(r[Np]=this.lastSessionId),this.applicationId&&(r[kp]=this.applicationId),this.appCheckToken&&(r[Bc]=this.appCheckToken),typeof location<"u"&&location.hostname&&bp.test(location.hostname)&&(r[Sp]=Pp);const s=this.urlFn(r);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Tr.forceAllow_=!0}static forceDisallow(){Tr.forceDisallow_=!0}static isAvailable(){return Tr.forceAllow_?!0:!Tr.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!pv()&&!_v()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=Se(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const r=lp(t),s=Ip(r,Ov);for(let i=0;i<s.length;i++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[i]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const r={};r[Dv]="t",r[Lp]=e,r[Mp]=t,this.myDisconnFrame.src=this.urlFn(r),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=Se(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class Nl{constructor(e,t,r,s){this.onDisconnect=r,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=lv(),window[Pv+this.uniqueCallbackIdentifier]=e,window[bv+this.uniqueCallbackIdentifier]=t,this.myIFrame=Nl.createIFrame_();let i="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(i='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+i+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(c){Oe("frame writing exception"),c.stack&&Oe(c.stack),Oe(c)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||Oe("No IE domain setting required")}catch{const r=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+r+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Lp]=this.myID,e[Mp]=this.myPW,e[Fp]=this.currentSerial;let t=this.urlFn(e),r="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Bp+r.length<=Up;){const o=this.pendingSegs.shift();r=r+"&"+kv+s+"="+o.seg+"&"+Vv+s+"="+o.ts+"&"+xv+s+"="+o.d,s++}return t=t+r,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,r){this.pendingSegs.push({seg:e,ts:t,d:r}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const r=()=>{this.outstandingRequests.delete(t),this.newRequest_()},s=setTimeout(r,Math.floor(Lv)),i=()=>{clearTimeout(s),r()};this.addTag(e,i)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const r=this.myIFrame.doc.createElement("script");r.type="text/javascript",r.async=!0,r.src=e,r.onload=r.onreadystatechange=function(){const s=r.readyState;(!s||s==="loaded"||s==="complete")&&(r.onload=r.onreadystatechange=null,r.parentNode&&r.parentNode.removeChild(r),t())},r.onerror=()=>{Oe("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(r)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fv=16384,Uv=45e3;let Co=null;typeof MozWebSocket<"u"?Co=MozWebSocket:typeof WebSocket<"u"&&(Co=WebSocket);class mt{constructor(e,t,r,s,i,o,c){this.connId=e,this.applicationId=r,this.appCheckToken=s,this.authToken=i,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Ti(this.connId),this.stats_=bl(t),this.connURL=mt.connectionURL_(t,o,c,s,r),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,r,s,i){const o={};return o[Cp]=Pl,typeof location<"u"&&location.hostname&&bp.test(location.hostname)&&(o[Sp]=Pp),t&&(o[Rp]=t),r&&(o[Np]=r),s&&(o[Bc]=s),i&&(o[kp]=i),Op(e,Vp,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Hn.set("previous_websocket_failure",!0);try{let r;Gy(),this.mySock=new Co(this.connURL,[],r)}catch(r){this.log_("Error instantiating WebSocket.");const s=r.message||r.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=r=>{this.handleIncomingFrame(r)},this.mySock.onerror=r=>{this.log_("WebSocket error.  Closing connection.");const s=r.message||r.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){mt.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,r=navigator.userAgent.match(t);r&&r.length>1&&parseFloat(r[1])<4.4&&(e=!0)}return!e&&Co!==null&&!mt.forceDisallow_}static previouslyFailed(){return Hn.isInMemoryStorage||Hn.get("previous_websocket_failure")===!0}markConnectionHealthy(){Hn.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const r=Ys(t);this.onMessage(r)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(x(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const r=this.extractFrameCount_(t);r!==null&&this.appendFrame_(r)}}send(e){this.resetKeepAlive();const t=Se(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const r=Ip(t,Fv);r.length>1&&this.sendString_(String(r.length));for(let s=0;s<r.length;s++)this.sendString_(r[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(Uv))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}mt.responsesRequiredToBeHealthy=2;mt.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xs{static get ALL_TRANSPORTS(){return[Tr,mt]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=mt&&mt.isAvailable();let r=t&&!mt.previouslyFailed();if(e.webSocketOnly&&(t||Ye("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),r=!0),r)this.transports_=[mt];else{const s=this.transports_=[];for(const i of Xs.ALL_TRANSPORTS)i&&i.isAvailable()&&s.push(i);Xs.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Xs.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bv=6e4,qv=5e3,$v=10*1024,Wv=100*1024,Ec="t",_d="d",jv="s",md="r",zv="e",gd="o",yd="a",Ed="n",vd="p",Gv="h";class Hv{constructor(e,t,r,s,i,o,c,l,u,f){this.id=e,this.repoInfo_=t,this.applicationId_=r,this.appCheckToken_=s,this.authToken_=i,this.onMessage_=o,this.onReady_=c,this.onDisconnect_=l,this.onKill_=u,this.lastSessionId=f,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Ti("c:"+this.id+":"),this.transportManager_=new Xs(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),r=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,r)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=Fs(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>Wv?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>$v?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Ec in e){const t=e[Ec];t===yd?this.upgradeIfSecondaryHealthy_():t===md?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===gd&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=As("t",e),r=As("d",e);if(t==="c")this.onSecondaryControl_(r);else if(t==="d")this.pendingDataMessages.push(r);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:vd,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:yd,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Ed,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=As("t",e),r=As("d",e);t==="c"?this.onControl_(r):t==="d"&&this.onDataMessage_(r)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=As(Ec,e);if(_d in e){const r=e[_d];if(t===Gv){const s={...r};this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(t===Ed){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===jv?this.onConnectionShutdown_(r):t===md?this.onReset_(r):t===zv?Uc("Server Error: "+r):t===gd?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Uc("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,r=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),Pl!==r&&Ye("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),r=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,r),Fs(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(Bv))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Fs(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(qv))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:vd,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Hn.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qp{put(e,t,r,s){}merge(e,t,r,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,r){}onDisconnectMerge(e,t,r){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $p{constructor(e){this.allowedEvents_=e,this.listeners_={},x(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const r=[...this.listeners_[e]];for(let s=0;s<r.length;s++)r[s].callback.apply(r[s].context,t)}}on(e,t,r){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:r});const s=this.getInitialEvent(e);s&&t.apply(r,s)}off(e,t,r){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let i=0;i<s.length;i++)if(s[i].callback===t&&(!r||r===s[i].context)){s.splice(i,1);return}}validateEventType_(e){x(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ro extends $p{static getInstance(){return new Ro}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Il()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return x(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Td=32,wd=768;class ie{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let r=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[r]=this.pieces_[s],r++);this.pieces_.length=r,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function ne(){return new ie("")}function K(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function Sn(n){return n.pieces_.length-n.pieceNum_}function ce(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new ie(n.pieces_,e)}function kl(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function Kv(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function Zs(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function Wp(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new ie(e,0)}function _e(n,e){const t=[];for(let r=n.pieceNum_;r<n.pieces_.length;r++)t.push(n.pieces_[r]);if(e instanceof ie)for(let r=e.pieceNum_;r<e.pieces_.length;r++)t.push(e.pieces_[r]);else{const r=e.split("/");for(let s=0;s<r.length;s++)r[s].length>0&&t.push(r[s])}return new ie(t,0)}function J(n){return n.pieceNum_>=n.pieces_.length}function Qe(n,e){const t=K(n),r=K(e);if(t===null)return e;if(t===r)return Qe(ce(n),ce(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function Qv(n,e){const t=Zs(n,0),r=Zs(e,0);for(let s=0;s<t.length&&s<r.length;s++){const i=lr(t[s],r[s]);if(i!==0)return i}return t.length===r.length?0:t.length<r.length?-1:1}function Vl(n,e){if(Sn(n)!==Sn(e))return!1;for(let t=n.pieceNum_,r=e.pieceNum_;t<=n.pieces_.length;t++,r++)if(n.pieces_[t]!==e.pieces_[r])return!1;return!0}function dt(n,e){let t=n.pieceNum_,r=e.pieceNum_;if(Sn(n)>Sn(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[r])return!1;++t,++r}return!0}class Yv{constructor(e,t){this.errorPrefix_=t,this.parts_=Zs(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let r=0;r<this.parts_.length;r++)this.byteLength_+=aa(this.parts_[r]);jp(this)}}function Jv(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=aa(e),jp(n)}function Xv(n){const e=n.parts_.pop();n.byteLength_-=aa(e),n.parts_.length>0&&(n.byteLength_-=1)}function jp(n){if(n.byteLength_>wd)throw new Error(n.errorPrefix_+"has a key path longer than "+wd+" bytes ("+n.byteLength_+").");if(n.parts_.length>Td)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Td+") or object contains a cycle "+zn(n))}function zn(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xl extends $p{static getInstance(){return new xl}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const r=!document[e];r!==this.visible_&&(this.visible_=r,this.trigger("visible",r))},!1)}getInitialEvent(e){return x(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cs=1e3,Zv=300*1e3,Id=30*1e3,eT=1.3,tT=3e4,nT="server_kill",Ad=3;class $t extends qp{constructor(e,t,r,s,i,o,c,l){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=r,this.onConnectStatus_=s,this.onServerInfoUpdate_=i,this.authTokenProvider_=o,this.appCheckTokenProvider_=c,this.authOverride_=l,this.id=$t.nextPersistentConnectionId_++,this.log_=Ti("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Cs,this.maxReconnectDelay_=Zv,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");xl.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Ro.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,r){const s=++this.requestNumber_,i={r:s,a:e,b:t};this.log_(Se(i)),x(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(i),r&&(this.requestCBHash_[s]=r)}get(e){this.initConnection_();const t=new Hr,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const c=o.d;o.s==="ok"?t.resolve(c):t.reject(c)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const i=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(i),t.promise}listen(e,t,r,s){this.initConnection_();const i=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+i),this.listens.has(o)||this.listens.set(o,new Map),x(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),x(!this.listens.get(o).has(i),"listen() called twice for same path/queryId.");const c={onComplete:s,hashFn:t,query:e,tag:r};this.listens.get(o).set(i,c),this.connected_&&this.sendListen_(c)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,r=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(r)})}sendListen_(e){const t=e.query,r=t._path.toString(),s=t._queryIdentifier;this.log_("Listen on "+r+" for "+s);const i={p:r},o="q";e.tag&&(i.q=t._queryObject,i.t=e.tag),i.h=e.hashFn(),this.sendRequest(o,i,c=>{const l=c.d,u=c.s;$t.warnOnListenWarnings_(l,t),(this.listens.get(r)&&this.listens.get(r).get(s))===e&&(this.log_("listen response",c),u!=="ok"&&this.removeListen_(r,s),e.onComplete&&e.onComplete(u,l))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&Ot(e,"w")){const r=kr(e,"w");if(Array.isArray(r)&&~r.indexOf("no_index")){const s='".indexOn": "'+t._queryParams.getIndex().toString()+'"',i=t._path.toString();Ye(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${i} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||eE(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Id)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=Zy(e)?"auth":"gauth",r={cred:e};this.authOverride_===null?r.noauth=!0:typeof this.authOverride_=="object"&&(r.authvar=this.authOverride_),this.sendRequest(t,r,s=>{const i=s.s,o=s.d||"error";this.authToken_===e&&(i==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(i,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,r=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,r)})}unlisten(e,t){const r=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+r+" "+s),x(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(r,s)&&this.connected_&&this.sendUnlisten_(r,s,e._queryObject,t)}sendUnlisten_(e,t,r,s){this.log_("Unlisten on "+e+" for "+t);const i={p:e},o="n";s&&(i.q=r,i.t=s),this.sendRequest(o,i)}onDisconnectPut(e,t,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:r})}onDisconnectMerge(e,t,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:r})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,r,s){const i={p:t,d:r};this.log_("onDisconnect "+e,i),this.sendRequest(e,i,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,t,r,s){this.putInternal("p",e,t,r,s)}merge(e,t,r,s){this.putInternal("m",e,t,r,s)}putInternal(e,t,r,s,i){this.initConnection_();const o={p:t,d:r};i!==void 0&&(o.h=i),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const c=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(c):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,r=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,r,i=>{this.log_(t+" response",i),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(i.s,i.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,r=>{if(r.s!=="ok"){const i=r.d;this.log_("reportStats","Error sending stats: "+i)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+Se(e));const t=e.r,r=this.requestCBHash_[t];r&&(delete this.requestCBHash_[t],r(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):Uc("Unrecognized action received from server: "+Se(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){x(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Cs,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Cs,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>tT&&(this.reconnectDelay_=Cs),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*eT)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),r=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+$t.nextConnectionId_++,i=this.lastSessionId;let o=!1,c=null;const l=function(){c?c.close():(o=!0,r())},u=function(p){x(c,"sendRequest call when we're not connected not allowed."),c.sendRequest(p)};this.realtime_={close:l,sendRequest:u};const f=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[p,m]=await Promise.all([this.authTokenProvider_.getToken(f),this.appCheckTokenProvider_.getToken(f)]);o?Oe("getToken() completed but was canceled"):(Oe("getToken() completed. Creating connection."),this.authToken_=p&&p.accessToken,this.appCheckToken_=m&&m.token,c=new Hv(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,r,A=>{Ye(A+" ("+this.repoInfo_.toString()+")"),this.interrupt(nT)},i))}catch(p){this.log_("Failed to get token: "+p),o||(this.repoInfo_.nodeAdmin&&Ye(p),l())}}}interrupt(e){Oe("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){Oe("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Dc(this.interruptReasons_)&&(this.reconnectDelay_=Cs,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let r;t?r=t.map(i=>Sl(i)).join("$"):r="default";const s=this.removeListen_(e,r);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,t){const r=new ie(e).toString();let s;if(this.listens.has(r)){const i=this.listens.get(r);s=i.get(t),i.delete(t),i.size===0&&this.listens.delete(r)}else s=void 0;return s}onAuthRevoked_(e,t){Oe("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Ad&&(this.reconnectDelay_=Id,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){Oe("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Ad&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+vp.replace(/\./g,"-")]=1,Il()?e["framework.cordova"]=1:mp()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Ro.getInstance().currentlyOnline();return Dc(this.interruptReasons_)&&e}}$t.nextPersistentConnectionId_=0;$t.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new Q(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ua{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const r=new Q(xr,e),s=new Q(xr,t);return this.compare(r,s)!==0}minPost(){return Q.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let eo;class zp extends ua{static get __EMPTY_NODE(){return eo}static set __EMPTY_NODE(e){eo=e}compare(e,t){return lr(e.name,t.name)}isDefinedOn(e){throw Gr("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return Q.MIN}maxPost(){return new Q(er,eo)}makePost(e,t){return x(typeof e=="string","KeyIndex indexValue must always be a string."),new Q(e,eo)}toString(){return".key"}}const Ir=new zp;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let to=class{constructor(e,t,r,s,i=null){this.isReverse_=s,this.resultGenerator_=i,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?r(e.key,t):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}},at=class Vs{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??Vs.RED,this.left=s??St.EMPTY_NODE,this.right=i??St.EMPTY_NODE}copy(e,t,r,s,i){return new Vs(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return i<0?s=s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s=s.copy(null,t,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return St.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let r,s;if(r=this,t(e,r.key)<0)!r.left.isEmpty()&&!r.left.isRed_()&&!r.left.left.isRed_()&&(r=r.moveRedLeft_()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed_()&&(r=r.rotateRight_()),!r.right.isEmpty()&&!r.right.isRed_()&&!r.right.left.isRed_()&&(r=r.moveRedRight_()),t(e,r.key)===0){if(r.right.isEmpty())return St.EMPTY_NODE;s=r.right.min_(),r=r.copy(s.key,s.value,null,null,r.right.removeMin_())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,Vs.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,Vs.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}};at.RED=!0;at.BLACK=!1;class rT{copy(e,t,r,s,i){return this}insert(e,t,r){return new at(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}let St=class uo{constructor(e,t=uo.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new uo(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,at.BLACK,null,null))}remove(e){return new uo(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,at.BLACK,null,null))}get(e){let t,r=this.root_;for(;!r.isEmpty();){if(t=this.comparator_(e,r.key),t===0)return r.value;t<0?r=r.left:t>0&&(r=r.right)}return null}getPredecessorKey(e){let t,r=this.root_,s=null;for(;!r.isEmpty();)if(t=this.comparator_(e,r.key),t===0){if(r.left.isEmpty())return s?s.key:null;for(r=r.left;!r.right.isEmpty();)r=r.right;return r.key}else t<0?r=r.left:t>0&&(s=r,r=r.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new to(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new to(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new to(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new to(this.root_,null,this.comparator_,!0,e)}};St.EMPTY_NODE=new rT;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sT(n,e){return lr(n.name,e.name)}function Dl(n,e){return lr(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let qc;function iT(n){qc=n}const Gp=function(n){return typeof n=="number"?"number:"+Ap(n):"string:"+n},Hp=function(n){if(n.isLeafNode()){const e=n.val();x(typeof e=="string"||typeof e=="number"||typeof e=="object"&&Ot(e,".sv"),"Priority must be a string or number.")}else x(n===qc||n.isEmpty(),"priority of unexpected type.");x(n===qc||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Cd;class Ne{static set __childrenNodeConstructor(e){Cd=e}static get __childrenNodeConstructor(){return Cd}constructor(e,t=Ne.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,x(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Hp(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new Ne(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:Ne.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return J(e)?this:K(e)===".priority"?this.priorityNode_:Ne.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:Ne.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const r=K(e);return r===null?t:t.isEmpty()&&r!==".priority"?this:(x(r!==".priority"||Sn(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(r,Ne.__childrenNodeConstructor.EMPTY_NODE.updateChild(ce(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Gp(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=Ap(this.value_):e+=this.value_,this.lazyHash_=wp(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===Ne.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof Ne.__childrenNodeConstructor?-1:(x(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,r=typeof this.value_,s=Ne.VALUE_TYPE_ORDER.indexOf(t),i=Ne.VALUE_TYPE_ORDER.indexOf(r);return x(s>=0,"Unknown leaf type: "+t),x(i>=0,"Unknown leaf type: "+r),s===i?r==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:i-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}Ne.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Kp,Qp;function oT(n){Kp=n}function aT(n){Qp=n}class cT extends ua{compare(e,t){const r=e.node.getPriority(),s=t.node.getPriority(),i=r.compareTo(s);return i===0?lr(e.name,t.name):i}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return Q.MIN}maxPost(){return new Q(er,new Ne("[PRIORITY-POST]",Qp))}makePost(e,t){const r=Kp(e);return new Q(t,new Ne("[PRIORITY-POST]",r))}toString(){return".priority"}}const me=new cT;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lT=Math.log(2);class uT{constructor(e){const t=i=>parseInt(Math.log(i)/lT,10),r=i=>parseInt(Array(i+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const s=r(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const So=function(n,e,t,r){n.sort(e);const s=function(l,u){const f=u-l;let p,m;if(f===0)return null;if(f===1)return p=n[l],m=t?t(p):p,new at(m,p.node,at.BLACK,null,null);{const A=parseInt(f/2,10)+l,S=s(l,A),O=s(A+1,u);return p=n[A],m=t?t(p):p,new at(m,p.node,at.BLACK,S,O)}},i=function(l){let u=null,f=null,p=n.length;const m=function(S,O){const F=p-S,H=p;p-=S;const se=s(F+1,H),fe=n[F],Je=t?t(fe):fe;A(new at(Je,fe.node,O,null,se))},A=function(S){u?(u.left=S,u=S):(f=S,u=S)};for(let S=0;S<l.count;++S){const O=l.nextBitIsOne(),F=Math.pow(2,l.count-(S+1));O?m(F,at.BLACK):(m(F,at.BLACK),m(F,at.RED))}return f},o=new uT(n.length),c=i(o);return new St(r||e,c)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let vc;const mr={};class Mt{static get Default(){return x(mr&&me,"ChildrenNode.ts has not been loaded"),vc=vc||new Mt({".priority":mr},{".priority":me}),vc}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=kr(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof St?t:null}hasIndex(e){return Ot(this.indexSet_,e.toString())}addIndex(e,t){x(e!==Ir,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const r=[];let s=!1;const i=t.getIterator(Q.Wrap);let o=i.getNext();for(;o;)s=s||e.isDefinedOn(o.node),r.push(o),o=i.getNext();let c;s?c=So(r,e.getCompare()):c=mr;const l=e.toString(),u={...this.indexSet_};u[l]=e;const f={...this.indexes_};return f[l]=c,new Mt(f,u)}addToIndexes(e,t){const r=Ao(this.indexes_,(s,i)=>{const o=kr(this.indexSet_,i);if(x(o,"Missing index implementation for "+i),s===mr)if(o.isDefinedOn(e.node)){const c=[],l=t.getIterator(Q.Wrap);let u=l.getNext();for(;u;)u.name!==e.name&&c.push(u),u=l.getNext();return c.push(e),So(c,o.getCompare())}else return mr;else{const c=t.get(e.name);let l=s;return c&&(l=l.remove(new Q(e.name,c))),l.insert(e,e.node)}});return new Mt(r,this.indexSet_)}removeFromIndexes(e,t){const r=Ao(this.indexes_,s=>{if(s===mr)return s;{const i=t.get(e.name);return i?s.remove(new Q(e.name,i)):s}});return new Mt(r,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Rs;class j{static get EMPTY_NODE(){return Rs||(Rs=new j(new St(Dl),null,Mt.Default))}constructor(e,t,r){this.children_=e,this.priorityNode_=t,this.indexMap_=r,this.lazyHash_=null,this.priorityNode_&&Hp(this.priorityNode_),this.children_.isEmpty()&&x(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Rs}updatePriority(e){return this.children_.isEmpty()?this:new j(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?Rs:t}}getChild(e){const t=K(e);return t===null?this:this.getImmediateChild(t).getChild(ce(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(x(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const r=new Q(e,t);let s,i;t.isEmpty()?(s=this.children_.remove(e),i=this.indexMap_.removeFromIndexes(r,this.children_)):(s=this.children_.insert(e,t),i=this.indexMap_.addToIndexes(r,this.children_));const o=s.isEmpty()?Rs:this.priorityNode_;return new j(s,o,i)}}updateChild(e,t){const r=K(e);if(r===null)return t;{x(K(e)!==".priority"||Sn(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(r).updateChild(ce(e),t);return this.updateImmediateChild(r,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let r=0,s=0,i=!0;if(this.forEachChild(me,(o,c)=>{t[o]=c.val(e),r++,i&&j.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):i=!1}),!e&&i&&s<2*r){const o=[];for(const c in t)o[c]=t[c];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Gp(this.getPriority().val())+":"),this.forEachChild(me,(t,r)=>{const s=r.hash();s!==""&&(e+=":"+t+":"+s)}),this.lazyHash_=e===""?"":wp(e)}return this.lazyHash_}getPredecessorChildName(e,t,r){const s=this.resolveIndex_(r);if(s){const i=s.getPredecessorKey(new Q(e,t));return i?i.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const r=t.minKey();return r&&r.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new Q(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const r=t.maxKey();return r&&r.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new Q(t,this.children_.get(t)):null}forEachChild(e,t){const r=this.resolveIndex_(e);return r?r.inorderTraversal(s=>t(s.name,s.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const r=this.resolveIndex_(t);if(r)return r.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,Q.Wrap);let i=s.peek();for(;i!=null&&t.compare(i,e)<0;)s.getNext(),i=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const r=this.resolveIndex_(t);if(r)return r.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,Q.Wrap);let i=s.peek();for(;i!=null&&t.compare(i,e)>0;)s.getNext(),i=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===wi?-1:0}withIndex(e){if(e===Ir||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new j(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===Ir||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const r=this.getIterator(me),s=t.getIterator(me);let i=r.getNext(),o=s.getNext();for(;i&&o;){if(i.name!==o.name||!i.node.equals(o.node))return!1;i=r.getNext(),o=s.getNext()}return i===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Ir?null:this.indexMap_.get(e.toString())}}j.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class hT extends j{constructor(){super(new St(Dl),j.EMPTY_NODE,Mt.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return j.EMPTY_NODE}isEmpty(){return!1}}const wi=new hT;Object.defineProperties(Q,{MIN:{value:new Q(xr,j.EMPTY_NODE)},MAX:{value:new Q(er,wi)}});zp.__EMPTY_NODE=j.EMPTY_NODE;Ne.__childrenNodeConstructor=j;iT(wi);aT(wi);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dT=!0;function Re(n,e=null){if(n===null)return j.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),x(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new Ne(t,Re(e))}if(!(n instanceof Array)&&dT){const t=[];let r=!1;if(Le(n,(o,c)=>{if(o.substring(0,1)!=="."){const l=Re(c);l.isEmpty()||(r=r||!l.getPriority().isEmpty(),t.push(new Q(o,l)))}}),t.length===0)return j.EMPTY_NODE;const i=So(t,sT,o=>o.name,Dl);if(r){const o=So(t,me.getCompare());return new j(i,Re(e),new Mt({".priority":o},{".priority":me}))}else return new j(i,Re(e),Mt.Default)}else{let t=j.EMPTY_NODE;return Le(n,(r,s)=>{if(Ot(n,r)&&r.substring(0,1)!=="."){const i=Re(s);(i.isLeafNode()||!i.isEmpty())&&(t=t.updateImmediateChild(r,i))}}),t.updatePriority(Re(e))}}oT(Re);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fT extends ua{constructor(e){super(),this.indexPath_=e,x(!J(e)&&K(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const r=this.extractChild(e.node),s=this.extractChild(t.node),i=r.compareTo(s);return i===0?lr(e.name,t.name):i}makePost(e,t){const r=Re(e),s=j.EMPTY_NODE.updateChild(this.indexPath_,r);return new Q(t,s)}maxPost(){const e=j.EMPTY_NODE.updateChild(this.indexPath_,wi);return new Q(er,e)}toString(){return Zs(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pT extends ua{compare(e,t){const r=e.node.compareTo(t.node);return r===0?lr(e.name,t.name):r}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return Q.MIN}maxPost(){return Q.MAX}makePost(e,t){const r=Re(e);return new Q(t,r)}toString(){return".value"}}const _T=new pT;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yp(n){return{type:"value",snapshotNode:n}}function Dr(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function ei(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function ti(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function mT(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ol{constructor(e){this.index_=e}updateChild(e,t,r,s,i,o){x(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const c=e.getImmediateChild(t);return c.getChild(s).equals(r.getChild(s))&&c.isEmpty()===r.isEmpty()||(o!=null&&(r.isEmpty()?e.hasChild(t)?o.trackChildChange(ei(t,c)):x(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):c.isEmpty()?o.trackChildChange(Dr(t,r)):o.trackChildChange(ti(t,r,c))),e.isLeafNode()&&r.isEmpty())?e:e.updateImmediateChild(t,r).withIndex(this.index_)}updateFullNode(e,t,r){return r!=null&&(e.isLeafNode()||e.forEachChild(me,(s,i)=>{t.hasChild(s)||r.trackChildChange(ei(s,i))}),t.isLeafNode()||t.forEachChild(me,(s,i)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(i)||r.trackChildChange(ti(s,i,o))}else r.trackChildChange(Dr(s,i))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?j.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ni{constructor(e){this.indexedFilter_=new Ol(e.getIndex()),this.index_=e.getIndex(),this.startPost_=ni.getStartPost_(e),this.endPost_=ni.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,r=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&r}updateChild(e,t,r,s,i,o){return this.matches(new Q(t,r))||(r=j.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,r,s,i,o)}updateFullNode(e,t,r){t.isLeafNode()&&(t=j.EMPTY_NODE);let s=t.withIndex(this.index_);s=s.updatePriority(j.EMPTY_NODE);const i=this;return t.forEachChild(me,(o,c)=>{i.matches(new Q(o,c))||(s=s.updateImmediateChild(o,j.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,r)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gT{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const r=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?r<=0:r<0},this.withinEndPost=t=>{const r=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?r<=0:r<0},this.rangedFilter_=new ni(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,r,s,i,o){return this.rangedFilter_.matches(new Q(t,r))||(r=j.EMPTY_NODE),e.getImmediateChild(t).equals(r)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,r,s,i,o):this.fullLimitUpdateChild_(e,t,r,i,o)}updateFullNode(e,t,r){let s;if(t.isLeafNode()||t.isEmpty())s=j.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){s=j.EMPTY_NODE.withIndex(this.index_);let i;this.reverse_?i=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):i=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;i.hasNext()&&o<this.limit_;){const c=i.getNext();if(this.withinDirectionalStart(c))if(this.withinDirectionalEnd(c))s=s.updateImmediateChild(c.name,c.node),o++;else break;else continue}}else{s=t.withIndex(this.index_),s=s.updatePriority(j.EMPTY_NODE);let i;this.reverse_?i=s.getReverseIterator(this.index_):i=s.getIterator(this.index_);let o=0;for(;i.hasNext();){const c=i.getNext();o<this.limit_&&this.withinDirectionalStart(c)&&this.withinDirectionalEnd(c)?o++:s=s.updateImmediateChild(c.name,j.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,r)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,r,s,i){let o;if(this.reverse_){const p=this.index_.getCompare();o=(m,A)=>p(A,m)}else o=this.index_.getCompare();const c=e;x(c.numChildren()===this.limit_,"");const l=new Q(t,r),u=this.reverse_?c.getFirstChild(this.index_):c.getLastChild(this.index_),f=this.rangedFilter_.matches(l);if(c.hasChild(t)){const p=c.getImmediateChild(t);let m=s.getChildAfterChild(this.index_,u,this.reverse_);for(;m!=null&&(m.name===t||c.hasChild(m.name));)m=s.getChildAfterChild(this.index_,m,this.reverse_);const A=m==null?1:o(m,l);if(f&&!r.isEmpty()&&A>=0)return i!=null&&i.trackChildChange(ti(t,r,p)),c.updateImmediateChild(t,r);{i!=null&&i.trackChildChange(ei(t,p));const O=c.updateImmediateChild(t,j.EMPTY_NODE);return m!=null&&this.rangedFilter_.matches(m)?(i!=null&&i.trackChildChange(Dr(m.name,m.node)),O.updateImmediateChild(m.name,m.node)):O}}else return r.isEmpty()?e:f&&o(u,l)>=0?(i!=null&&(i.trackChildChange(ei(u.name,u.node)),i.trackChildChange(Dr(t,r))),c.updateImmediateChild(t,r).updateImmediateChild(u.name,j.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ll{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=me}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return x(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return x(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:xr}hasEnd(){return this.endSet_}getIndexEndValue(){return x(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return x(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:er}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return x(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===me}copy(){const e=new Ll;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function yT(n){return n.loadsAllData()?new Ol(n.getIndex()):n.hasLimit()?new gT(n):new ni(n)}function Rd(n){const e={};if(n.isDefault())return e;let t;if(n.index_===me?t="$priority":n.index_===_T?t="$value":n.index_===Ir?t="$key":(x(n.index_ instanceof fT,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=Se(t),n.startSet_){const r=n.startAfterSet_?"startAfter":"startAt";e[r]=Se(n.indexStartValue_),n.startNameSet_&&(e[r]+=","+Se(n.indexStartName_))}if(n.endSet_){const r=n.endBeforeSet_?"endBefore":"endAt";e[r]=Se(n.indexEndValue_),n.endNameSet_&&(e[r]+=","+Se(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function Sd(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==me&&(e.i=n.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Po extends qp{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(x(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,r,s){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=r,this.appCheckTokenProvider_=s,this.log_=Ti("p:rest:"),this.listens_={}}listen(e,t,r,s){const i=e._path.toString();this.log_("Listen called for "+i+" "+e._queryIdentifier);const o=Po.getListenId_(e,r),c={};this.listens_[o]=c;const l=Rd(e._queryParams);this.restRequest_(i+".json",l,(u,f)=>{let p=f;if(u===404&&(p=null,u=null),u===null&&this.onDataUpdate_(i,p,!1,r),kr(this.listens_,o)===c){let m;u?u===401?m="permission_denied":m="rest_error:"+u:m="ok",s(m,null)}})}unlisten(e,t){const r=Po.getListenId_(e,t);delete this.listens_[r]}get(e){const t=Rd(e._queryParams),r=e._path.toString(),s=new Hr;return this.restRequest_(r+".json",t,(i,o)=>{let c=o;i===404&&(c=null,i=null),i===null?(this.onDataUpdate_(r,c,!1,null),s.resolve(c)):s.reject(new Error(c))}),s.promise}refreshAuthToken(e){}restRequest_(e,t={},r){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,i])=>{s&&s.accessToken&&(t.auth=s.accessToken),i&&i.token&&(t.ac=i.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Kr(t);this.log_("Sending REST request for "+o);const c=new XMLHttpRequest;c.onreadystatechange=()=>{if(r&&c.readyState===4){this.log_("REST Response for "+o+" received. status:",c.status,"response:",c.responseText);let l=null;if(c.status>=200&&c.status<300){try{l=Ys(c.responseText)}catch{Ye("Failed to parse JSON response for "+o+": "+c.responseText)}r(null,l)}else c.status!==401&&c.status!==404&&Ye("Got unsuccessful REST response for "+o+" Status: "+c.status),r(c.status);r=null}},c.open("GET",o,!0),c.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ET{constructor(){this.rootNode_=j.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bo(){return{value:null,children:new Map}}function Jp(n,e,t){if(J(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const r=K(e);n.children.has(r)||n.children.set(r,bo());const s=n.children.get(r);e=ce(e),Jp(s,e,t)}}function $c(n,e,t){n.value!==null?t(e,n.value):vT(n,(r,s)=>{const i=new ie(e.toString()+"/"+r);$c(s,i,t)})}function vT(n,e){n.children.forEach((t,r)=>{e(r,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TT{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t={...e};return this.last_&&Le(this.last_,(r,s)=>{t[r]=t[r]-s}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pd=10*1e3,wT=30*1e3,IT=300*1e3;class AT{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new TT(e);const r=Pd+(wT-Pd)*Math.random();Fs(this.reportStats_.bind(this),Math.floor(r))}reportStats_(){const e=this.statsListener_.get(),t={};let r=!1;Le(e,(s,i)=>{i>0&&Ot(this.statsToReport_,s)&&(t[s]=i,r=!0)}),r&&this.server_.reportStats(t),Fs(this.reportStats_.bind(this),Math.floor(Math.random()*2*IT))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var yt;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(yt||(yt={}));function Ml(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Fl(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Ul(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class No{constructor(e,t,r){this.path=e,this.affectedTree=t,this.revert=r,this.type=yt.ACK_USER_WRITE,this.source=Ml()}operationForChild(e){if(J(this.path)){if(this.affectedTree.value!=null)return x(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new ie(e));return new No(ne(),t,this.revert)}}else return x(K(this.path)===e,"operationForChild called for unrelated child."),new No(ce(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ri{constructor(e,t){this.source=e,this.path=t,this.type=yt.LISTEN_COMPLETE}operationForChild(e){return J(this.path)?new ri(this.source,ne()):new ri(this.source,ce(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr{constructor(e,t,r){this.source=e,this.path=t,this.snap=r,this.type=yt.OVERWRITE}operationForChild(e){return J(this.path)?new tr(this.source,ne(),this.snap.getImmediateChild(e)):new tr(this.source,ce(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Or{constructor(e,t,r){this.source=e,this.path=t,this.children=r,this.type=yt.MERGE}operationForChild(e){if(J(this.path)){const t=this.children.subtree(new ie(e));return t.isEmpty()?null:t.value?new tr(this.source,ne(),t.value):new Or(this.source,ne(),t)}else return x(K(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Or(this.source,ce(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pn{constructor(e,t,r){this.node_=e,this.fullyInitialized_=t,this.filtered_=r}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(J(e))return this.isFullyInitialized()&&!this.filtered_;const t=K(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CT{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function RT(n,e,t,r){const s=[],i=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&i.push(mT(o.childName,o.snapshotNode))}),Ss(n,s,"child_removed",e,r,t),Ss(n,s,"child_added",e,r,t),Ss(n,s,"child_moved",i,r,t),Ss(n,s,"child_changed",e,r,t),Ss(n,s,"value",e,r,t),s}function Ss(n,e,t,r,s,i){const o=r.filter(c=>c.type===t);o.sort((c,l)=>PT(n,c,l)),o.forEach(c=>{const l=ST(n,c,i);s.forEach(u=>{u.respondsTo(c.type)&&e.push(u.createEvent(l,n.query_))})})}function ST(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function PT(n,e,t){if(e.childName==null||t.childName==null)throw Gr("Should only compare child_ events.");const r=new Q(e.childName,e.snapshotNode),s=new Q(t.childName,t.snapshotNode);return n.index_.compare(r,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ha(n,e){return{eventCache:n,serverCache:e}}function Us(n,e,t,r){return ha(new Pn(e,t,r),n.serverCache)}function Xp(n,e,t,r){return ha(n.eventCache,new Pn(e,t,r))}function ko(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function nr(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Tc;const bT=()=>(Tc||(Tc=new St(fv)),Tc);class ae{static fromObject(e){let t=new ae(null);return Le(e,(r,s)=>{t=t.set(new ie(r),s)}),t}constructor(e,t=bT()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:ne(),value:this.value};if(J(e))return null;{const r=K(e),s=this.children.get(r);if(s!==null){const i=s.findRootMostMatchingPathAndValue(ce(e),t);return i!=null?{path:_e(new ie(r),i.path),value:i.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(J(e))return this;{const t=K(e),r=this.children.get(t);return r!==null?r.subtree(ce(e)):new ae(null)}}set(e,t){if(J(e))return new ae(t,this.children);{const r=K(e),i=(this.children.get(r)||new ae(null)).set(ce(e),t),o=this.children.insert(r,i);return new ae(this.value,o)}}remove(e){if(J(e))return this.children.isEmpty()?new ae(null):new ae(null,this.children);{const t=K(e),r=this.children.get(t);if(r){const s=r.remove(ce(e));let i;return s.isEmpty()?i=this.children.remove(t):i=this.children.insert(t,s),this.value===null&&i.isEmpty()?new ae(null):new ae(this.value,i)}else return this}}get(e){if(J(e))return this.value;{const t=K(e),r=this.children.get(t);return r?r.get(ce(e)):null}}setTree(e,t){if(J(e))return t;{const r=K(e),i=(this.children.get(r)||new ae(null)).setTree(ce(e),t);let o;return i.isEmpty()?o=this.children.remove(r):o=this.children.insert(r,i),new ae(this.value,o)}}fold(e){return this.fold_(ne(),e)}fold_(e,t){const r={};return this.children.inorderTraversal((s,i)=>{r[s]=i.fold_(_e(e,s),t)}),t(e,this.value,r)}findOnPath(e,t){return this.findOnPath_(e,ne(),t)}findOnPath_(e,t,r){const s=this.value?r(t,this.value):!1;if(s)return s;if(J(e))return null;{const i=K(e),o=this.children.get(i);return o?o.findOnPath_(ce(e),_e(t,i),r):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,ne(),t)}foreachOnPath_(e,t,r){if(J(e))return this;{this.value&&r(t,this.value);const s=K(e),i=this.children.get(s);return i?i.foreachOnPath_(ce(e),_e(t,s),r):new ae(null)}}foreach(e){this.foreach_(ne(),e)}foreach_(e,t){this.children.inorderTraversal((r,s)=>{s.foreach_(_e(e,r),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,r)=>{r.value&&e(t,r.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt{constructor(e){this.writeTree_=e}static empty(){return new vt(new ae(null))}}function Bs(n,e,t){if(J(e))return new vt(new ae(t));{const r=n.writeTree_.findRootMostValueAndPath(e);if(r!=null){const s=r.path;let i=r.value;const o=Qe(s,e);return i=i.updateChild(o,t),new vt(n.writeTree_.set(s,i))}else{const s=new ae(t),i=n.writeTree_.setTree(e,s);return new vt(i)}}}function Wc(n,e,t){let r=n;return Le(t,(s,i)=>{r=Bs(r,_e(e,s),i)}),r}function bd(n,e){if(J(e))return vt.empty();{const t=n.writeTree_.setTree(e,new ae(null));return new vt(t)}}function jc(n,e){return ur(n,e)!=null}function ur(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(Qe(t.path,e)):null}function Nd(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(me,(r,s)=>{e.push(new Q(r,s))}):n.writeTree_.children.inorderTraversal((r,s)=>{s.value!=null&&e.push(new Q(r,s.value))}),e}function yn(n,e){if(J(e))return n;{const t=ur(n,e);return t!=null?new vt(new ae(t)):new vt(n.writeTree_.subtree(e))}}function zc(n){return n.writeTree_.isEmpty()}function Lr(n,e){return Zp(ne(),n.writeTree_,e)}function Zp(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let r=null;return e.children.inorderTraversal((s,i)=>{s===".priority"?(x(i.value!==null,"Priority writes must always be leaf nodes"),r=i.value):t=Zp(_e(n,s),i,t)}),!t.getChild(n).isEmpty()&&r!==null&&(t=t.updateChild(_e(n,".priority"),r)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function da(n,e){return r_(e,n)}function NT(n,e,t,r,s){x(r>n.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),n.allWrites.push({path:e,snap:t,writeId:r,visible:s}),s&&(n.visibleWrites=Bs(n.visibleWrites,e,t)),n.lastWriteId=r}function kT(n,e,t,r){x(r>n.lastWriteId,"Stacking an older merge on top of newer ones"),n.allWrites.push({path:e,children:t,writeId:r,visible:!0}),n.visibleWrites=Wc(n.visibleWrites,e,t),n.lastWriteId=r}function VT(n,e){for(let t=0;t<n.allWrites.length;t++){const r=n.allWrites[t];if(r.writeId===e)return r}return null}function xT(n,e){const t=n.allWrites.findIndex(c=>c.writeId===e);x(t>=0,"removeWrite called with nonexistent writeId.");const r=n.allWrites[t];n.allWrites.splice(t,1);let s=r.visible,i=!1,o=n.allWrites.length-1;for(;s&&o>=0;){const c=n.allWrites[o];c.visible&&(o>=t&&DT(c,r.path)?s=!1:dt(r.path,c.path)&&(i=!0)),o--}if(s){if(i)return OT(n),!0;if(r.snap)n.visibleWrites=bd(n.visibleWrites,r.path);else{const c=r.children;Le(c,l=>{n.visibleWrites=bd(n.visibleWrites,_e(r.path,l))})}return!0}else return!1}function DT(n,e){if(n.snap)return dt(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&dt(_e(n.path,t),e))return!0;return!1}function OT(n){n.visibleWrites=e_(n.allWrites,LT,ne()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function LT(n){return n.visible}function e_(n,e,t){let r=vt.empty();for(let s=0;s<n.length;++s){const i=n[s];if(e(i)){const o=i.path;let c;if(i.snap)dt(t,o)?(c=Qe(t,o),r=Bs(r,c,i.snap)):dt(o,t)&&(c=Qe(o,t),r=Bs(r,ne(),i.snap.getChild(c)));else if(i.children){if(dt(t,o))c=Qe(t,o),r=Wc(r,c,i.children);else if(dt(o,t))if(c=Qe(o,t),J(c))r=Wc(r,ne(),i.children);else{const l=kr(i.children,K(c));if(l){const u=l.getChild(ce(c));r=Bs(r,ne(),u)}}}else throw Gr("WriteRecord should have .snap or .children")}}return r}function t_(n,e,t,r,s){if(!r&&!s){const i=ur(n.visibleWrites,e);if(i!=null)return i;{const o=yn(n.visibleWrites,e);if(zc(o))return t;if(t==null&&!jc(o,ne()))return null;{const c=t||j.EMPTY_NODE;return Lr(o,c)}}}else{const i=yn(n.visibleWrites,e);if(!s&&zc(i))return t;if(!s&&t==null&&!jc(i,ne()))return null;{const o=function(u){return(u.visible||s)&&(!r||!~r.indexOf(u.writeId))&&(dt(u.path,e)||dt(e,u.path))},c=e_(n.allWrites,o,e),l=t||j.EMPTY_NODE;return Lr(c,l)}}}function MT(n,e,t){let r=j.EMPTY_NODE;const s=ur(n.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(me,(i,o)=>{r=r.updateImmediateChild(i,o)}),r;if(t){const i=yn(n.visibleWrites,e);return t.forEachChild(me,(o,c)=>{const l=Lr(yn(i,new ie(o)),c);r=r.updateImmediateChild(o,l)}),Nd(i).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}else{const i=yn(n.visibleWrites,e);return Nd(i).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}}function FT(n,e,t,r,s){x(r||s,"Either existingEventSnap or existingServerSnap must exist");const i=_e(e,t);if(jc(n.visibleWrites,i))return null;{const o=yn(n.visibleWrites,i);return zc(o)?s.getChild(t):Lr(o,s.getChild(t))}}function UT(n,e,t,r){const s=_e(e,t),i=ur(n.visibleWrites,s);if(i!=null)return i;if(r.isCompleteForChild(t)){const o=yn(n.visibleWrites,s);return Lr(o,r.getNode().getImmediateChild(t))}else return null}function BT(n,e){return ur(n.visibleWrites,e)}function qT(n,e,t,r,s,i,o){let c;const l=yn(n.visibleWrites,e),u=ur(l,ne());if(u!=null)c=u;else if(t!=null)c=Lr(l,t);else return[];if(c=c.withIndex(o),!c.isEmpty()&&!c.isLeafNode()){const f=[],p=o.getCompare(),m=i?c.getReverseIteratorFrom(r,o):c.getIteratorFrom(r,o);let A=m.getNext();for(;A&&f.length<s;)p(A,r)!==0&&f.push(A),A=m.getNext();return f}else return[]}function $T(){return{visibleWrites:vt.empty(),allWrites:[],lastWriteId:-1}}function Vo(n,e,t,r){return t_(n.writeTree,n.treePath,e,t,r)}function Bl(n,e){return MT(n.writeTree,n.treePath,e)}function kd(n,e,t,r){return FT(n.writeTree,n.treePath,e,t,r)}function xo(n,e){return BT(n.writeTree,_e(n.treePath,e))}function WT(n,e,t,r,s,i){return qT(n.writeTree,n.treePath,e,t,r,s,i)}function ql(n,e,t){return UT(n.writeTree,n.treePath,e,t)}function n_(n,e){return r_(_e(n.treePath,e),n.writeTree)}function r_(n,e){return{treePath:n,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jT{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,r=e.childName;x(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),x(r!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(r);if(s){const i=s.type;if(t==="child_added"&&i==="child_removed")this.changeMap.set(r,ti(r,e.snapshotNode,s.snapshotNode));else if(t==="child_removed"&&i==="child_added")this.changeMap.delete(r);else if(t==="child_removed"&&i==="child_changed")this.changeMap.set(r,ei(r,s.oldSnap));else if(t==="child_changed"&&i==="child_added")this.changeMap.set(r,Dr(r,e.snapshotNode));else if(t==="child_changed"&&i==="child_changed")this.changeMap.set(r,ti(r,e.snapshotNode,s.oldSnap));else throw Gr("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(r,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zT{getCompleteChild(e){return null}getChildAfterChild(e,t,r){return null}}const s_=new zT;class $l{constructor(e,t,r=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=r}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const r=this.optCompleteServerCache_!=null?new Pn(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return ql(this.writes_,e,r)}}getChildAfterChild(e,t,r){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:nr(this.viewCache_),i=WT(this.writes_,s,t,1,r,e);return i.length===0?null:i[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function GT(n){return{filter:n}}function HT(n,e){x(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),x(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function KT(n,e,t,r,s){const i=new jT;let o,c;if(t.type===yt.OVERWRITE){const u=t;u.source.fromUser?o=Gc(n,e,u.path,u.snap,r,s,i):(x(u.source.fromServer,"Unknown source."),c=u.source.tagged||e.serverCache.isFiltered()&&!J(u.path),o=Do(n,e,u.path,u.snap,r,s,c,i))}else if(t.type===yt.MERGE){const u=t;u.source.fromUser?o=YT(n,e,u.path,u.children,r,s,i):(x(u.source.fromServer,"Unknown source."),c=u.source.tagged||e.serverCache.isFiltered(),o=Hc(n,e,u.path,u.children,r,s,c,i))}else if(t.type===yt.ACK_USER_WRITE){const u=t;u.revert?o=ZT(n,e,u.path,r,s,i):o=JT(n,e,u.path,u.affectedTree,r,s,i)}else if(t.type===yt.LISTEN_COMPLETE)o=XT(n,e,t.path,r,i);else throw Gr("Unknown operation type: "+t.type);const l=i.getChanges();return QT(e,o,l),{viewCache:o,changes:l}}function QT(n,e,t){const r=e.eventCache;if(r.isFullyInitialized()){const s=r.getNode().isLeafNode()||r.getNode().isEmpty(),i=ko(n);(t.length>0||!n.eventCache.isFullyInitialized()||s&&!r.getNode().equals(i)||!r.getNode().getPriority().equals(i.getPriority()))&&t.push(Yp(ko(e)))}}function i_(n,e,t,r,s,i){const o=e.eventCache;if(xo(r,t)!=null)return e;{let c,l;if(J(t))if(x(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const u=nr(e),f=u instanceof j?u:j.EMPTY_NODE,p=Bl(r,f);c=n.filter.updateFullNode(e.eventCache.getNode(),p,i)}else{const u=Vo(r,nr(e));c=n.filter.updateFullNode(e.eventCache.getNode(),u,i)}else{const u=K(t);if(u===".priority"){x(Sn(t)===1,"Can't have a priority with additional path components");const f=o.getNode();l=e.serverCache.getNode();const p=kd(r,t,f,l);p!=null?c=n.filter.updatePriority(f,p):c=o.getNode()}else{const f=ce(t);let p;if(o.isCompleteForChild(u)){l=e.serverCache.getNode();const m=kd(r,t,o.getNode(),l);m!=null?p=o.getNode().getImmediateChild(u).updateChild(f,m):p=o.getNode().getImmediateChild(u)}else p=ql(r,u,e.serverCache);p!=null?c=n.filter.updateChild(o.getNode(),u,p,f,s,i):c=o.getNode()}}return Us(e,c,o.isFullyInitialized()||J(t),n.filter.filtersNodes())}}function Do(n,e,t,r,s,i,o,c){const l=e.serverCache;let u;const f=o?n.filter:n.filter.getIndexedFilter();if(J(t))u=f.updateFullNode(l.getNode(),r,null);else if(f.filtersNodes()&&!l.isFiltered()){const A=l.getNode().updateChild(t,r);u=f.updateFullNode(l.getNode(),A,null)}else{const A=K(t);if(!l.isCompleteForPath(t)&&Sn(t)>1)return e;const S=ce(t),F=l.getNode().getImmediateChild(A).updateChild(S,r);A===".priority"?u=f.updatePriority(l.getNode(),F):u=f.updateChild(l.getNode(),A,F,S,s_,null)}const p=Xp(e,u,l.isFullyInitialized()||J(t),f.filtersNodes()),m=new $l(s,p,i);return i_(n,p,t,s,m,c)}function Gc(n,e,t,r,s,i,o){const c=e.eventCache;let l,u;const f=new $l(s,e,i);if(J(t))u=n.filter.updateFullNode(e.eventCache.getNode(),r,o),l=Us(e,u,!0,n.filter.filtersNodes());else{const p=K(t);if(p===".priority")u=n.filter.updatePriority(e.eventCache.getNode(),r),l=Us(e,u,c.isFullyInitialized(),c.isFiltered());else{const m=ce(t),A=c.getNode().getImmediateChild(p);let S;if(J(m))S=r;else{const O=f.getCompleteChild(p);O!=null?kl(m)===".priority"&&O.getChild(Wp(m)).isEmpty()?S=O:S=O.updateChild(m,r):S=j.EMPTY_NODE}if(A.equals(S))l=e;else{const O=n.filter.updateChild(c.getNode(),p,S,m,f,o);l=Us(e,O,c.isFullyInitialized(),n.filter.filtersNodes())}}}return l}function Vd(n,e){return n.eventCache.isCompleteForChild(e)}function YT(n,e,t,r,s,i,o){let c=e;return r.foreach((l,u)=>{const f=_e(t,l);Vd(e,K(f))&&(c=Gc(n,c,f,u,s,i,o))}),r.foreach((l,u)=>{const f=_e(t,l);Vd(e,K(f))||(c=Gc(n,c,f,u,s,i,o))}),c}function xd(n,e,t){return t.foreach((r,s)=>{e=e.updateChild(r,s)}),e}function Hc(n,e,t,r,s,i,o,c){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,u;J(t)?u=r:u=new ae(null).setTree(t,r);const f=e.serverCache.getNode();return u.children.inorderTraversal((p,m)=>{if(f.hasChild(p)){const A=e.serverCache.getNode().getImmediateChild(p),S=xd(n,A,m);l=Do(n,l,new ie(p),S,s,i,o,c)}}),u.children.inorderTraversal((p,m)=>{const A=!e.serverCache.isCompleteForChild(p)&&m.value===null;if(!f.hasChild(p)&&!A){const S=e.serverCache.getNode().getImmediateChild(p),O=xd(n,S,m);l=Do(n,l,new ie(p),O,s,i,o,c)}}),l}function JT(n,e,t,r,s,i,o){if(xo(s,t)!=null)return e;const c=e.serverCache.isFiltered(),l=e.serverCache;if(r.value!=null){if(J(t)&&l.isFullyInitialized()||l.isCompleteForPath(t))return Do(n,e,t,l.getNode().getChild(t),s,i,c,o);if(J(t)){let u=new ae(null);return l.getNode().forEachChild(Ir,(f,p)=>{u=u.set(new ie(f),p)}),Hc(n,e,t,u,s,i,c,o)}else return e}else{let u=new ae(null);return r.foreach((f,p)=>{const m=_e(t,f);l.isCompleteForPath(m)&&(u=u.set(f,l.getNode().getChild(m)))}),Hc(n,e,t,u,s,i,c,o)}}function XT(n,e,t,r,s){const i=e.serverCache,o=Xp(e,i.getNode(),i.isFullyInitialized()||J(t),i.isFiltered());return i_(n,o,t,r,s_,s)}function ZT(n,e,t,r,s,i){let o;if(xo(r,t)!=null)return e;{const c=new $l(r,e,s),l=e.eventCache.getNode();let u;if(J(t)||K(t)===".priority"){let f;if(e.serverCache.isFullyInitialized())f=Vo(r,nr(e));else{const p=e.serverCache.getNode();x(p instanceof j,"serverChildren would be complete if leaf node"),f=Bl(r,p)}f=f,u=n.filter.updateFullNode(l,f,i)}else{const f=K(t);let p=ql(r,f,e.serverCache);p==null&&e.serverCache.isCompleteForChild(f)&&(p=l.getImmediateChild(f)),p!=null?u=n.filter.updateChild(l,f,p,ce(t),c,i):e.eventCache.getNode().hasChild(f)?u=n.filter.updateChild(l,f,j.EMPTY_NODE,ce(t),c,i):u=l,u.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Vo(r,nr(e)),o.isLeafNode()&&(u=n.filter.updateFullNode(u,o,i)))}return o=e.serverCache.isFullyInitialized()||xo(r,ne())!=null,Us(e,u,o,n.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ew{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const r=this.query_._queryParams,s=new Ol(r.getIndex()),i=yT(r);this.processor_=GT(i);const o=t.serverCache,c=t.eventCache,l=s.updateFullNode(j.EMPTY_NODE,o.getNode(),null),u=i.updateFullNode(j.EMPTY_NODE,c.getNode(),null),f=new Pn(l,o.isFullyInitialized(),s.filtersNodes()),p=new Pn(u,c.isFullyInitialized(),i.filtersNodes());this.viewCache_=ha(p,f),this.eventGenerator_=new CT(this.query_)}get query(){return this.query_}}function tw(n){return n.viewCache_.serverCache.getNode()}function nw(n){return ko(n.viewCache_)}function rw(n,e){const t=nr(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!J(e)&&!t.getImmediateChild(K(e)).isEmpty())?t.getChild(e):null}function Dd(n){return n.eventRegistrations_.length===0}function sw(n,e){n.eventRegistrations_.push(e)}function Od(n,e,t){const r=[];if(t){x(e==null,"A cancel should cancel all event registrations.");const s=n.query._path;n.eventRegistrations_.forEach(i=>{const o=i.createCancelEvent(t,s);o&&r.push(o)})}if(e){let s=[];for(let i=0;i<n.eventRegistrations_.length;++i){const o=n.eventRegistrations_[i];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(n.eventRegistrations_.slice(i+1));break}}n.eventRegistrations_=s}else n.eventRegistrations_=[];return r}function Ld(n,e,t,r){e.type===yt.MERGE&&e.source.queryId!==null&&(x(nr(n.viewCache_),"We should always have a full cache before handling merges"),x(ko(n.viewCache_),"Missing event cache, even though we have a server cache"));const s=n.viewCache_,i=KT(n.processor_,s,e,t,r);return HT(n.processor_,i.viewCache),x(i.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=i.viewCache,o_(n,i.changes,i.viewCache.eventCache.getNode(),null)}function iw(n,e){const t=n.viewCache_.eventCache,r=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(me,(i,o)=>{r.push(Dr(i,o))}),t.isFullyInitialized()&&r.push(Yp(t.getNode())),o_(n,r,t.getNode(),e)}function o_(n,e,t,r){const s=r?[r]:n.eventRegistrations_;return RT(n.eventGenerator_,e,t,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Oo;class a_{constructor(){this.views=new Map}}function ow(n){x(!Oo,"__referenceConstructor has already been defined"),Oo=n}function aw(){return x(Oo,"Reference.ts has not been loaded"),Oo}function cw(n){return n.views.size===0}function Wl(n,e,t,r){const s=e.source.queryId;if(s!==null){const i=n.views.get(s);return x(i!=null,"SyncTree gave us an op for an invalid query."),Ld(i,e,t,r)}else{let i=[];for(const o of n.views.values())i=i.concat(Ld(o,e,t,r));return i}}function c_(n,e,t,r,s){const i=e._queryIdentifier,o=n.views.get(i);if(!o){let c=Vo(t,s?r:null),l=!1;c?l=!0:r instanceof j?(c=Bl(t,r),l=!1):(c=j.EMPTY_NODE,l=!1);const u=ha(new Pn(c,l,!1),new Pn(r,s,!1));return new ew(e,u)}return o}function lw(n,e,t,r,s,i){const o=c_(n,e,r,s,i);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),sw(o,t),iw(o,t)}function uw(n,e,t,r){const s=e._queryIdentifier,i=[];let o=[];const c=bn(n);if(s==="default")for(const[l,u]of n.views.entries())o=o.concat(Od(u,t,r)),Dd(u)&&(n.views.delete(l),u.query._queryParams.loadsAllData()||i.push(u.query));else{const l=n.views.get(s);l&&(o=o.concat(Od(l,t,r)),Dd(l)&&(n.views.delete(s),l.query._queryParams.loadsAllData()||i.push(l.query)))}return c&&!bn(n)&&i.push(new(aw())(e._repo,e._path)),{removed:i,events:o}}function l_(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function En(n,e){let t=null;for(const r of n.views.values())t=t||rw(r,e);return t}function u_(n,e){if(e._queryParams.loadsAllData())return fa(n);{const r=e._queryIdentifier;return n.views.get(r)}}function h_(n,e){return u_(n,e)!=null}function bn(n){return fa(n)!=null}function fa(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Lo;function hw(n){x(!Lo,"__referenceConstructor has already been defined"),Lo=n}function dw(){return x(Lo,"Reference.ts has not been loaded"),Lo}let fw=1;class Md{constructor(e){this.listenProvider_=e,this.syncPointTree_=new ae(null),this.pendingWriteTree_=$T(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function d_(n,e,t,r,s){return NT(n.pendingWriteTree_,e,t,r,s),s?Yr(n,new tr(Ml(),e,t)):[]}function pw(n,e,t,r){kT(n.pendingWriteTree_,e,t,r);const s=ae.fromObject(t);return Yr(n,new Or(Ml(),e,s))}function _n(n,e,t=!1){const r=VT(n.pendingWriteTree_,e);if(xT(n.pendingWriteTree_,e)){let i=new ae(null);return r.snap!=null?i=i.set(ne(),!0):Le(r.children,o=>{i=i.set(new ie(o),!0)}),Yr(n,new No(r.path,i,t))}else return[]}function Ii(n,e,t){return Yr(n,new tr(Fl(),e,t))}function _w(n,e,t){const r=ae.fromObject(t);return Yr(n,new Or(Fl(),e,r))}function mw(n,e){return Yr(n,new ri(Fl(),e))}function gw(n,e,t){const r=zl(n,t);if(r){const s=Gl(r),i=s.path,o=s.queryId,c=Qe(i,e),l=new ri(Ul(o),c);return Hl(n,i,l)}else return[]}function Mo(n,e,t,r,s=!1){const i=e._path,o=n.syncPointTree_.get(i);let c=[];if(o&&(e._queryIdentifier==="default"||h_(o,e))){const l=uw(o,e,t,r);cw(o)&&(n.syncPointTree_=n.syncPointTree_.remove(i));const u=l.removed;if(c=l.events,!s){const f=u.findIndex(m=>m._queryParams.loadsAllData())!==-1,p=n.syncPointTree_.findOnPath(i,(m,A)=>bn(A));if(f&&!p){const m=n.syncPointTree_.subtree(i);if(!m.isEmpty()){const A=vw(m);for(let S=0;S<A.length;++S){const O=A[S],F=O.query,H=m_(n,O);n.listenProvider_.startListening(qs(F),si(n,F),H.hashFn,H.onComplete)}}}!p&&u.length>0&&!r&&(f?n.listenProvider_.stopListening(qs(e),null):u.forEach(m=>{const A=n.queryToTagMap.get(pa(m));n.listenProvider_.stopListening(qs(m),A)}))}Tw(n,u)}return c}function f_(n,e,t,r){const s=zl(n,r);if(s!=null){const i=Gl(s),o=i.path,c=i.queryId,l=Qe(o,e),u=new tr(Ul(c),l,t);return Hl(n,o,u)}else return[]}function yw(n,e,t,r){const s=zl(n,r);if(s){const i=Gl(s),o=i.path,c=i.queryId,l=Qe(o,e),u=ae.fromObject(t),f=new Or(Ul(c),l,u);return Hl(n,o,f)}else return[]}function Kc(n,e,t,r=!1){const s=e._path;let i=null,o=!1;n.syncPointTree_.foreachOnPath(s,(m,A)=>{const S=Qe(m,s);i=i||En(A,S),o=o||bn(A)});let c=n.syncPointTree_.get(s);c?(o=o||bn(c),i=i||En(c,ne())):(c=new a_,n.syncPointTree_=n.syncPointTree_.set(s,c));let l;i!=null?l=!0:(l=!1,i=j.EMPTY_NODE,n.syncPointTree_.subtree(s).foreachChild((A,S)=>{const O=En(S,ne());O&&(i=i.updateImmediateChild(A,O))}));const u=h_(c,e);if(!u&&!e._queryParams.loadsAllData()){const m=pa(e);x(!n.queryToTagMap.has(m),"View does not exist, but we have a tag");const A=ww();n.queryToTagMap.set(m,A),n.tagToQueryMap.set(A,m)}const f=da(n.pendingWriteTree_,s);let p=lw(c,e,t,f,i,l);if(!u&&!o&&!r){const m=u_(c,e);p=p.concat(Iw(n,e,m))}return p}function jl(n,e,t){const s=n.pendingWriteTree_,i=n.syncPointTree_.findOnPath(e,(o,c)=>{const l=Qe(o,e),u=En(c,l);if(u)return u});return t_(s,e,i,t,!0)}function Ew(n,e){const t=e._path;let r=null;n.syncPointTree_.foreachOnPath(t,(u,f)=>{const p=Qe(u,t);r=r||En(f,p)});let s=n.syncPointTree_.get(t);s?r=r||En(s,ne()):(s=new a_,n.syncPointTree_=n.syncPointTree_.set(t,s));const i=r!=null,o=i?new Pn(r,!0,!1):null,c=da(n.pendingWriteTree_,e._path),l=c_(s,e,c,i?o.getNode():j.EMPTY_NODE,i);return nw(l)}function Yr(n,e){return p_(e,n.syncPointTree_,null,da(n.pendingWriteTree_,ne()))}function p_(n,e,t,r){if(J(n.path))return __(n,e,t,r);{const s=e.get(ne());t==null&&s!=null&&(t=En(s,ne()));let i=[];const o=K(n.path),c=n.operationForChild(o),l=e.children.get(o);if(l&&c){const u=t?t.getImmediateChild(o):null,f=n_(r,o);i=i.concat(p_(c,l,u,f))}return s&&(i=i.concat(Wl(s,n,r,t))),i}}function __(n,e,t,r){const s=e.get(ne());t==null&&s!=null&&(t=En(s,ne()));let i=[];return e.children.inorderTraversal((o,c)=>{const l=t?t.getImmediateChild(o):null,u=n_(r,o),f=n.operationForChild(o);f&&(i=i.concat(__(f,c,l,u)))}),s&&(i=i.concat(Wl(s,n,r,t))),i}function m_(n,e){const t=e.query,r=si(n,t);return{hashFn:()=>(tw(e)||j.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return r?gw(n,t._path,r):mw(n,t._path);{const i=mv(s,t);return Mo(n,t,null,i)}}}}function si(n,e){const t=pa(e);return n.queryToTagMap.get(t)}function pa(n){return n._path.toString()+"$"+n._queryIdentifier}function zl(n,e){return n.tagToQueryMap.get(e)}function Gl(n){const e=n.indexOf("$");return x(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new ie(n.substr(0,e))}}function Hl(n,e,t){const r=n.syncPointTree_.get(e);x(r,"Missing sync point for query tag that we're tracking");const s=da(n.pendingWriteTree_,e);return Wl(r,t,s,null)}function vw(n){return n.fold((e,t,r)=>{if(t&&bn(t))return[fa(t)];{let s=[];return t&&(s=l_(t)),Le(r,(i,o)=>{s=s.concat(o)}),s}})}function qs(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(dw())(n._repo,n._path):n}function Tw(n,e){for(let t=0;t<e.length;++t){const r=e[t];if(!r._queryParams.loadsAllData()){const s=pa(r),i=n.queryToTagMap.get(s);n.queryToTagMap.delete(s),n.tagToQueryMap.delete(i)}}}function ww(){return fw++}function Iw(n,e,t){const r=e._path,s=si(n,e),i=m_(n,t),o=n.listenProvider_.startListening(qs(e),s,i.hashFn,i.onComplete),c=n.syncPointTree_.subtree(r);if(s)x(!bn(c.value),"If we're adding a query, it shouldn't be shadowed");else{const l=c.fold((u,f,p)=>{if(!J(u)&&f&&bn(f))return[fa(f).query];{let m=[];return f&&(m=m.concat(l_(f).map(A=>A.query))),Le(p,(A,S)=>{m=m.concat(S)}),m}});for(let u=0;u<l.length;++u){const f=l[u];n.listenProvider_.stopListening(qs(f),si(n,f))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kl{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new Kl(t)}node(){return this.node_}}class Ql{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=_e(this.path_,e);return new Ql(this.syncTree_,t)}node(){return jl(this.syncTree_,this.path_)}}const Aw=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},Fd=function(n,e,t){if(!n||typeof n!="object")return n;if(x(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return Cw(n[".sv"],e,t);if(typeof n[".sv"]=="object")return Rw(n[".sv"],e);x(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},Cw=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:x(!1,"Unexpected server value: "+n)}},Rw=function(n,e,t){n.hasOwnProperty("increment")||x(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const r=n.increment;typeof r!="number"&&x(!1,"Unexpected increment value: "+r);const s=e.node();if(x(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return r;const o=s.getValue();return typeof o!="number"?r:o+r},g_=function(n,e,t,r){return Yl(e,new Ql(t,n),r)},y_=function(n,e,t){return Yl(n,new Kl(e),t)};function Yl(n,e,t){const r=n.getPriority().val(),s=Fd(r,e.getImmediateChild(".priority"),t);let i;if(n.isLeafNode()){const o=n,c=Fd(o.getValue(),e,t);return c!==o.getValue()||s!==o.getPriority().val()?new Ne(c,Re(s)):n}else{const o=n;return i=o,s!==o.getPriority().val()&&(i=i.updatePriority(new Ne(s))),o.forEachChild(me,(c,l)=>{const u=Yl(l,e.getImmediateChild(c),t);u!==l&&(i=i.updateImmediateChild(c,u))}),i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jl{constructor(e="",t=null,r={children:{},childCount:0}){this.name=e,this.parent=t,this.node=r}}function Xl(n,e){let t=e instanceof ie?e:new ie(e),r=n,s=K(t);for(;s!==null;){const i=kr(r.node.children,s)||{children:{},childCount:0};r=new Jl(s,r,i),t=ce(t),s=K(t)}return r}function Jr(n){return n.node.value}function E_(n,e){n.node.value=e,Qc(n)}function v_(n){return n.node.childCount>0}function Sw(n){return Jr(n)===void 0&&!v_(n)}function _a(n,e){Le(n.node.children,(t,r)=>{e(new Jl(t,n,r))})}function T_(n,e,t,r){t&&e(n),_a(n,s=>{T_(s,e,!0)})}function Pw(n,e,t){let r=n.parent;for(;r!==null;){if(e(r))return!0;r=r.parent}return!1}function Ai(n){return new ie(n.parent===null?n.name:Ai(n.parent)+"/"+n.name)}function Qc(n){n.parent!==null&&bw(n.parent,n.name,n)}function bw(n,e,t){const r=Sw(t),s=Ot(n.node.children,e);r&&s?(delete n.node.children[e],n.node.childCount--,Qc(n)):!r&&!s&&(n.node.children[e]=t.node,n.node.childCount++,Qc(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nw=/[\[\].#$\/\u0000-\u001F\u007F]/,kw=/[\[\].#$\u0000-\u001F\u007F]/,wc=10*1024*1024,Zl=function(n){return typeof n=="string"&&n.length!==0&&!Nw.test(n)},w_=function(n){return typeof n=="string"&&n.length!==0&&!kw.test(n)},Vw=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),w_(n)},xw=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!Rl(n)||n&&typeof n=="object"&&Ot(n,".sv")},Dw=function(n,e,t,r){ma(oa(n,"value"),e,t)},ma=function(n,e,t){const r=t instanceof ie?new Yv(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+zn(r));if(typeof e=="function")throw new Error(n+"contains a function "+zn(r)+" with contents = "+e.toString());if(Rl(e))throw new Error(n+"contains "+e.toString()+" "+zn(r));if(typeof e=="string"&&e.length>wc/3&&aa(e)>wc)throw new Error(n+"contains a string greater than "+wc+" utf8 bytes "+zn(r)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,i=!1;if(Le(e,(o,c)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(i=!0,!Zl(o)))throw new Error(n+" contains an invalid key ("+o+") "+zn(r)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Jv(r,o),ma(n,c,r),Xv(r)}),s&&i)throw new Error(n+' contains ".value" child '+zn(r)+" in addition to actual children.")}},Ow=function(n,e){let t,r;for(t=0;t<e.length;t++){r=e[t];const i=Zs(r);for(let o=0;o<i.length;o++)if(!(i[o]===".priority"&&o===i.length-1)){if(!Zl(i[o]))throw new Error(n+"contains an invalid key ("+i[o]+") in path "+r.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(Qv);let s=null;for(t=0;t<e.length;t++){if(r=e[t],s!==null&&dt(s,r))throw new Error(n+"contains a path "+s.toString()+" that is ancestor of another path "+r.toString());s=r}},Lw=function(n,e,t,r){const s=oa(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const i=[];Le(e,(o,c)=>{const l=new ie(o);if(ma(s,c,_e(t,l)),kl(l)===".priority"&&!xw(c))throw new Error(s+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");i.push(l)}),Ow(s,i)},I_=function(n,e,t,r){if(!w_(t))throw new Error(oa(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},Mw=function(n,e,t,r){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),I_(n,e,t)},A_=function(n,e){if(K(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},Fw=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Zl(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!Vw(t))throw new Error(oa(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uw{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function ga(n,e){let t=null;for(let r=0;r<e.length;r++){const s=e[r],i=s.getPath();t!==null&&!Vl(i,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:i}),t.events.push(s)}t&&n.eventLists_.push(t)}function C_(n,e,t){ga(n,t),R_(n,r=>Vl(r,e))}function ft(n,e,t){ga(n,t),R_(n,r=>dt(r,e)||dt(e,r))}function R_(n,e){n.recursionDepth_++;let t=!0;for(let r=0;r<n.eventLists_.length;r++){const s=n.eventLists_[r];if(s){const i=s.path;e(i)?(Bw(n.eventLists_[r]),n.eventLists_[r]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function Bw(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const r=t.getEventRunner();Ms&&Oe("event: "+t.toString()),Qr(r)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qw="repo_interrupt",$w=25;class Ww{constructor(e,t,r,s){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=r,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new Uw,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=bo(),this.transactionQueueTree_=new Jl,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function jw(n,e,t){if(n.stats_=bl(n.repoInfo_),n.forceRestClient_||vv())n.server_=new Po(n.repoInfo_,(r,s,i,o)=>{Ud(n,r,s,i,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>Bd(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{Se(t)}catch(r){throw new Error("Invalid authOverride provided: "+r)}}n.persistentConnection_=new $t(n.repoInfo_,e,(r,s,i,o)=>{Ud(n,r,s,i,o)},r=>{Bd(n,r)},r=>{Gw(n,r)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(r=>{n.server_.refreshAuthToken(r)}),n.appCheckProvider_.addTokenChangeListener(r=>{n.server_.refreshAppCheckToken(r.token)}),n.statsReporter_=Cv(n.repoInfo_,()=>new AT(n.stats_,n.server_)),n.infoData_=new ET,n.infoSyncTree_=new Md({startListening:(r,s,i,o)=>{let c=[];const l=n.infoData_.getNode(r._path);return l.isEmpty()||(c=Ii(n.infoSyncTree_,r._path,l),setTimeout(()=>{o("ok")},0)),c},stopListening:()=>{}}),eu(n,"connected",!1),n.serverSyncTree_=new Md({startListening:(r,s,i,o)=>(n.server_.listen(r,i,s,(c,l)=>{const u=o(c,l);ft(n.eventQueue_,r._path,u)}),[]),stopListening:(r,s)=>{n.server_.unlisten(r,s)}})}function zw(n){const t=n.infoData_.getNode(new ie(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function ya(n){return Aw({timestamp:zw(n)})}function Ud(n,e,t,r,s){n.dataUpdateCount++;const i=new ie(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(s)if(r){const l=Ao(t,u=>Re(u));o=yw(n.serverSyncTree_,i,l,s)}else{const l=Re(t);o=f_(n.serverSyncTree_,i,l,s)}else if(r){const l=Ao(t,u=>Re(u));o=_w(n.serverSyncTree_,i,l)}else{const l=Re(t);o=Ii(n.serverSyncTree_,i,l)}let c=i;o.length>0&&(c=Mr(n,i)),ft(n.eventQueue_,c,o)}function Bd(n,e){eu(n,"connected",e),e===!1&&Yw(n)}function Gw(n,e){Le(e,(t,r)=>{eu(n,t,r)})}function eu(n,e,t){const r=new ie("/.info/"+e),s=Re(t);n.infoData_.updateSnapshot(r,s);const i=Ii(n.infoSyncTree_,r,s);ft(n.eventQueue_,r,i)}function tu(n){return n.nextWriteId_++}function Hw(n,e,t){const r=Ew(n.serverSyncTree_,e);return r!=null?Promise.resolve(r):n.server_.get(e).then(s=>{const i=Re(s).withIndex(e._queryParams.getIndex());Kc(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=Ii(n.serverSyncTree_,e._path,i);else{const c=si(n.serverSyncTree_,e);o=f_(n.serverSyncTree_,e._path,i,c)}return ft(n.eventQueue_,e._path,o),Mo(n.serverSyncTree_,e,t,null,!0),i},s=>(Ci(n,"get for query "+Se(e)+" failed: "+s),Promise.reject(new Error(s))))}function Kw(n,e,t,r,s){Ci(n,"set",{path:e.toString(),value:t,priority:r});const i=ya(n),o=Re(t,r),c=jl(n.serverSyncTree_,e),l=y_(o,c,i),u=tu(n),f=d_(n.serverSyncTree_,e,l,u,!0);ga(n.eventQueue_,f),n.server_.put(e.toString(),o.val(!0),(m,A)=>{const S=m==="ok";S||Ye("set at "+e+" failed: "+m);const O=_n(n.serverSyncTree_,u,!S);ft(n.eventQueue_,e,O),Yc(n,s,m,A)});const p=ru(n,e);Mr(n,p),ft(n.eventQueue_,p,[])}function Qw(n,e,t,r){Ci(n,"update",{path:e.toString(),value:t});let s=!0;const i=ya(n),o={};if(Le(t,(c,l)=>{s=!1,o[c]=g_(_e(e,c),Re(l),n.serverSyncTree_,i)}),s)Oe("update() called with empty data.  Don't do anything."),Yc(n,r,"ok",void 0);else{const c=tu(n),l=pw(n.serverSyncTree_,e,o,c);ga(n.eventQueue_,l),n.server_.merge(e.toString(),t,(u,f)=>{const p=u==="ok";p||Ye("update at "+e+" failed: "+u);const m=_n(n.serverSyncTree_,c,!p),A=m.length>0?Mr(n,e):e;ft(n.eventQueue_,A,m),Yc(n,r,u,f)}),Le(t,u=>{const f=ru(n,_e(e,u));Mr(n,f)}),ft(n.eventQueue_,e,[])}}function Yw(n){Ci(n,"onDisconnectEvents");const e=ya(n),t=bo();$c(n.onDisconnect_,ne(),(s,i)=>{const o=g_(s,i,n.serverSyncTree_,e);Jp(t,s,o)});let r=[];$c(t,ne(),(s,i)=>{r=r.concat(Ii(n.serverSyncTree_,s,i));const o=ru(n,s);Mr(n,o)}),n.onDisconnect_=bo(),ft(n.eventQueue_,ne(),r)}function Jw(n,e,t){let r;K(e._path)===".info"?r=Kc(n.infoSyncTree_,e,t):r=Kc(n.serverSyncTree_,e,t),C_(n.eventQueue_,e._path,r)}function qd(n,e,t){let r;K(e._path)===".info"?r=Mo(n.infoSyncTree_,e,t):r=Mo(n.serverSyncTree_,e,t),C_(n.eventQueue_,e._path,r)}function Xw(n){n.persistentConnection_&&n.persistentConnection_.interrupt(qw)}function Ci(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),Oe(t,...e)}function Yc(n,e,t,r){e&&Qr(()=>{if(t==="ok")e(null);else{const s=(t||"error").toUpperCase();let i=s;r&&(i+=": "+r);const o=new Error(i);o.code=s,e(o)}})}function S_(n,e,t){return jl(n.serverSyncTree_,e,t)||j.EMPTY_NODE}function nu(n,e=n.transactionQueueTree_){if(e||Ea(n,e),Jr(e)){const t=b_(n,e);x(t.length>0,"Sending zero length transaction queue"),t.every(s=>s.status===0)&&Zw(n,Ai(e),t)}else v_(e)&&_a(e,t=>{nu(n,t)})}function Zw(n,e,t){const r=t.map(u=>u.currentWriteId),s=S_(n,e,r);let i=s;const o=s.hash();for(let u=0;u<t.length;u++){const f=t[u];x(f.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),f.status=1,f.retryCount++;const p=Qe(e,f.path);i=i.updateChild(p,f.currentOutputSnapshotRaw)}const c=i.val(!0),l=e;n.server_.put(l.toString(),c,u=>{Ci(n,"transaction put response",{path:l.toString(),status:u});let f=[];if(u==="ok"){const p=[];for(let m=0;m<t.length;m++)t[m].status=2,f=f.concat(_n(n.serverSyncTree_,t[m].currentWriteId)),t[m].onComplete&&p.push(()=>t[m].onComplete(null,!0,t[m].currentOutputSnapshotResolved)),t[m].unwatcher();Ea(n,Xl(n.transactionQueueTree_,e)),nu(n,n.transactionQueueTree_),ft(n.eventQueue_,e,f);for(let m=0;m<p.length;m++)Qr(p[m])}else{if(u==="datastale")for(let p=0;p<t.length;p++)t[p].status===3?t[p].status=4:t[p].status=0;else{Ye("transaction at "+l.toString()+" failed: "+u);for(let p=0;p<t.length;p++)t[p].status=4,t[p].abortReason=u}Mr(n,e)}},o)}function Mr(n,e){const t=P_(n,e),r=Ai(t),s=b_(n,t);return eI(n,s,r),r}function eI(n,e,t){if(e.length===0)return;const r=[];let s=[];const o=e.filter(c=>c.status===0).map(c=>c.currentWriteId);for(let c=0;c<e.length;c++){const l=e[c],u=Qe(t,l.path);let f=!1,p;if(x(u!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)f=!0,p=l.abortReason,s=s.concat(_n(n.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=$w)f=!0,p="maxretry",s=s.concat(_n(n.serverSyncTree_,l.currentWriteId,!0));else{const m=S_(n,l.path,o);l.currentInputSnapshot=m;const A=e[c].update(m.val());if(A!==void 0){ma("transaction failed: Data returned ",A,l.path);let S=Re(A);typeof A=="object"&&A!=null&&Ot(A,".priority")||(S=S.updatePriority(m.getPriority()));const F=l.currentWriteId,H=ya(n),se=y_(S,m,H);l.currentOutputSnapshotRaw=S,l.currentOutputSnapshotResolved=se,l.currentWriteId=tu(n),o.splice(o.indexOf(F),1),s=s.concat(d_(n.serverSyncTree_,l.path,se,l.currentWriteId,l.applyLocally)),s=s.concat(_n(n.serverSyncTree_,F,!0))}else f=!0,p="nodata",s=s.concat(_n(n.serverSyncTree_,l.currentWriteId,!0))}ft(n.eventQueue_,t,s),s=[],f&&(e[c].status=2,(function(m){setTimeout(m,Math.floor(0))})(e[c].unwatcher),e[c].onComplete&&(p==="nodata"?r.push(()=>e[c].onComplete(null,!1,e[c].currentInputSnapshot)):r.push(()=>e[c].onComplete(new Error(p),!1,null))))}Ea(n,n.transactionQueueTree_);for(let c=0;c<r.length;c++)Qr(r[c]);nu(n,n.transactionQueueTree_)}function P_(n,e){let t,r=n.transactionQueueTree_;for(t=K(e);t!==null&&Jr(r)===void 0;)r=Xl(r,t),e=ce(e),t=K(e);return r}function b_(n,e){const t=[];return N_(n,e,t),t.sort((r,s)=>r.order-s.order),t}function N_(n,e,t){const r=Jr(e);if(r)for(let s=0;s<r.length;s++)t.push(r[s]);_a(e,s=>{N_(n,s,t)})}function Ea(n,e){const t=Jr(e);if(t){let r=0;for(let s=0;s<t.length;s++)t[s].status!==2&&(t[r]=t[s],r++);t.length=r,E_(e,t.length>0?t:void 0)}_a(e,r=>{Ea(n,r)})}function ru(n,e){const t=Ai(P_(n,e)),r=Xl(n.transactionQueueTree_,e);return Pw(r,s=>{Ic(n,s)}),Ic(n,r),T_(r,s=>{Ic(n,s)}),t}function Ic(n,e){const t=Jr(e);if(t){const r=[];let s=[],i=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(x(i===o-1,"All SENT items should be at beginning of queue."),i=o,t[o].status=3,t[o].abortReason="set"):(x(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),s=s.concat(_n(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&r.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));i===-1?E_(e,void 0):t.length=i+1,ft(n.eventQueue_,Ai(e),s);for(let o=0;o<r.length;o++)Qr(r[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tI(n){let e="";const t=n.split("/");for(let r=0;r<t.length;r++)if(t[r].length>0){let s=t[r];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function nI(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const r=t.split("=");r.length===2?e[decodeURIComponent(r[0])]=decodeURIComponent(r[1]):Ye(`Invalid query segment '${t}' in query '${n}'`)}return e}const $d=function(n,e){const t=rI(n),r=t.namespace;t.domain==="firebase.com"&&Gt(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!r||r==="undefined")&&t.domain!=="localhost"&&Gt("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||hv();const s=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new Dp(t.host,t.secure,r,s,e,"",r!==t.subdomain),path:new ie(t.pathString)}},rI=function(n){let e="",t="",r="",s="",i="",o=!0,c="https",l=443;if(typeof n=="string"){let u=n.indexOf("//");u>=0&&(c=n.substring(0,u-1),n=n.substring(u+2));let f=n.indexOf("/");f===-1&&(f=n.length);let p=n.indexOf("?");p===-1&&(p=n.length),e=n.substring(0,Math.min(f,p)),f<p&&(s=tI(n.substring(f,p)));const m=nI(n.substring(Math.min(n.length,p)));u=e.indexOf(":"),u>=0?(o=c==="https"||c==="wss",l=parseInt(e.substring(u+1),10)):u=e.length;const A=e.slice(0,u);if(A.toLowerCase()==="localhost")t="localhost";else if(A.split(".").length<=2)t=A;else{const S=e.indexOf(".");r=e.substring(0,S).toLowerCase(),t=e.substring(S+1),i=r}"ns"in m&&(i=m.ns)}return{host:e,port:l,domain:t,subdomain:r,secure:o,scheme:c,pathString:s,namespace:i}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sI{constructor(e,t,r,s){this.eventType=e,this.eventRegistration=t,this.snapshot=r,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+Se(this.snapshot.exportVal())}}class iI{constructor(e,t,r){this.eventRegistration=e,this.error=t,this.path=r}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k_{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return x(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class su{constructor(e,t,r,s){this._repo=e,this._path=t,this._queryParams=r,this._orderByCalled=s}get key(){return J(this._path)?null:kl(this._path)}get ref(){return new Xt(this._repo,this._path)}get _queryIdentifier(){const e=Sd(this._queryParams),t=Sl(e);return t==="{}"?"default":t}get _queryObject(){return Sd(this._queryParams)}isEqual(e){if(e=ue(e),!(e instanceof su))return!1;const t=this._repo===e._repo,r=Vl(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return t&&r&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+Kv(this._path)}}class Xt extends su{constructor(e,t){super(e,t,new Ll,!1)}get parent(){const e=Wp(this._path);return e===null?null:new Xt(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class ii{constructor(e,t,r){this._node=e,this.ref=t,this._index=r}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new ie(e),r=Jc(this.ref,e);return new ii(this._node.getChild(t),r,me)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(r,s)=>e(new ii(s,Jc(this.ref,r),me)))}hasChild(e){const t=new ie(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function hN(n,e){return n=ue(n),n._checkNotDeleted("ref"),e!==void 0?Jc(n._root,e):n._root}function Jc(n,e){return n=ue(n),K(n._path)===null?Mw("child","path",e):I_("child","path",e),new Xt(n._repo,_e(n._path,e))}function dN(n){return A_("remove",n._path),oI(n,null)}function oI(n,e){n=ue(n),A_("set",n._path),Dw("set",e,n._path);const t=new Hr;return Kw(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function fN(n,e){Lw("update",e,n._path);const t=new Hr;return Qw(n._repo,n._path,e,t.wrapCallback(()=>{})),t.promise}function pN(n){n=ue(n);const e=new k_(()=>{}),t=new va(e);return Hw(n._repo,n,t).then(r=>new ii(r,new Xt(n._repo,n._path),n._queryParams.getIndex()))}class va{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const r=t._queryParams.getIndex();return new sI("value",this,new ii(e.snapshotNode,new Xt(t._repo,t._path),r))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new iI(this,e,t):null}matches(e){return e instanceof va?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function aI(n,e,t,r,s){let i;if(typeof r=="object"&&(i=void 0,s=r),typeof r=="function"&&(i=r),s&&s.onlyOnce){const l=t,u=(f,p)=>{qd(n._repo,n,c),l(f,p)};u.userCallback=t.userCallback,u.context=t.context,t=u}const o=new k_(t,i||void 0),c=new va(o);return Jw(n._repo,n,c),()=>qd(n._repo,n,c)}function _N(n,e,t,r){return aI(n,"value",e,t,r)}ow(Xt);hw(Xt);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cI="FIREBASE_DATABASE_EMULATOR_HOST",Xc={};let lI=!1;function uI(n,e,t,r){const s=e.lastIndexOf(":"),i=e.substring(0,s),o=ar(i);n.repoInfo_=new Dp(e,o,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0,t),r&&(n.authTokenProvider_=r)}function hI(n,e,t,r,s){let i=r||n.options.databaseURL;i===void 0&&(n.options.projectId||Gt("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),Oe("Using default host for project ",n.options.projectId),i=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=$d(i,s),c=o.repoInfo,l;typeof process<"u"&&ld&&(l=ld[cI]),l?(i=`http://${l}?ns=${c.namespace}`,o=$d(i,s),c=o.repoInfo):o.repoInfo.secure;const u=new wv(n.name,n.options,e);Fw("Invalid Firebase Database URL",o),J(o.path)||Gt("Database URL must point to the root of a Firebase Database (not including a child path).");const f=fI(c,n,u,new Tv(n,t));return new pI(f,n)}function dI(n,e){const t=Xc[e];(!t||t[n.key]!==n)&&Gt(`Database ${e}(${n.repoInfo_}) has already been deleted.`),Xw(n),delete t[n.key]}function fI(n,e,t,r){let s=Xc[e.name];s||(s={},Xc[e.name]=s);let i=s[n.toURLString()];return i&&Gt("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),i=new Ww(n,lI,t,r),s[n.toURLString()]=i,i}class pI{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(jw(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Xt(this._repo,ne())),this._rootInternal}_delete(){return this._rootInternal!==null&&(dI(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Gt("Cannot call "+e+" on a deleted database.")}}function mN(n=Cl(),e){const t=la(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const r=dp("database");r&&_I(t,...r)}return t}function _I(n,e,t,r={}){n=ue(n),n._checkNotDeleted("useEmulator");const s=`${e}:${t}`,i=n._repoInternal;if(n._instanceStarted){if(s===n._repoInternal.repoInfo_.host&&Cn(r,i.repoInfo_.emulatorOptions))return;Gt("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(i.repoInfo_.nodeAdmin)r.mockUserToken&&Gt('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new lo(lo.OWNER);else if(r.mockUserToken){const c=typeof r.mockUserToken=="string"?r.mockUserToken:_p(r.mockUserToken,n.app.options.projectId);o=new lo(c)}ar(e)&&Al(e),uI(i,s,r,o)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mI(n){iv(cr),Zn(new Rn("database",(e,{instanceIdentifier:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),i=e.getProvider("app-check-internal");return hI(r,s,i,t)},"PUBLIC").setMultipleInstances(!0)),Nt(ud,hd,n),Nt(ud,hd,"esm2020")}$t.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};$t.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};mI();function V_(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const gI=V_,x_=new Ei("auth","Firebase",V_());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fo=new ca("@firebase/auth");function yI(n,...e){Fo.logLevel<=Y.WARN&&Fo.warn(`Auth (${cr}): ${n}`,...e)}function ho(n,...e){Fo.logLevel<=Y.ERROR&&Fo.error(`Auth (${cr}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pt(n,...e){throw ou(n,...e)}function Tt(n,...e){return ou(n,...e)}function iu(n,e,t){const r={...gI(),[e]:t};return new Ei("auth","Firebase",r).create(e,{appName:n.name})}function Wt(n){return iu(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function EI(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&pt(n,"argument-error"),iu(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function ou(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return x_.create(n,...e)}function W(n,e,...t){if(!n)throw ou(e,...t)}function Ft(n){const e="INTERNAL ASSERTION FAILED: "+n;throw ho(e),new Error(e)}function Ht(n,e){n||Ft(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zc(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function vI(){return Wd()==="http:"||Wd()==="https:"}function Wd(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function TI(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(vI()||jy()||"connection"in navigator)?navigator.onLine:!0}function wI(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ri{constructor(e,t){this.shortDelay=e,this.longDelay=t,Ht(t>e,"Short delay should be less than long delay!"),this.isMobile=Il()||mp()}get(){return TI()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function au(n,e){Ht(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class D_{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Ft("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Ft("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Ft("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const II={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AI=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],CI=new Ri(3e4,6e4);function Zt(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function Lt(n,e,t,r,s={}){return O_(n,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const c=Kr({...o,key:n.config.apiKey}).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const u={method:e,headers:l,...i};return Wy()||(u.referrerPolicy="strict-origin-when-cross-origin"),n.emulatorConfig&&ar(n.emulatorConfig.host)&&(u.credentials="include"),D_.fetch()(await L_(n,n.config.apiHost,t,c),u)})}async function O_(n,e,t){n._canInitEmulator=!1;const r={...II,...e};try{const s=new SI(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw no(n,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[l,u]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw no(n,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw no(n,"email-already-in-use",o);if(l==="USER_DISABLED")throw no(n,"user-disabled",o);const f=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(u)throw iu(n,f,u);pt(n,f)}}catch(s){if(s instanceof Jt)throw s;pt(n,"network-request-failed",{message:String(s)})}}async function Si(n,e,t,r,s={}){const i=await Lt(n,e,t,r,s);return"mfaPendingCredential"in i&&pt(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function L_(n,e,t,r){const s=`${e}${t}?${r}`,i=n,o=i.config.emulator?au(n.config,s):`${n.config.apiScheme}://${s}`;return AI.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}function RI(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class SI{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Tt(this.auth,"network-request-failed")),CI.get())})}}function no(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=Tt(n,e,r);return s.customData._tokenResponse=t,s}function jd(n){return n!==void 0&&n.enterprise!==void 0}class PI{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return RI(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function bI(n,e){return Lt(n,"GET","/v2/recaptchaConfig",Zt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function NI(n,e){return Lt(n,"POST","/v1/accounts:delete",e)}async function Uo(n,e){return Lt(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $s(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function kI(n,e=!1){const t=ue(n),r=await t.getIdToken(e),s=cu(r);W(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:$s(Ac(s.auth_time)),issuedAtTime:$s(Ac(s.iat)),expirationTime:$s(Ac(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Ac(n){return Number(n)*1e3}function cu(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return ho("JWT malformed, contained fewer than 3 sections"),null;try{const s=Io(t);return s?JSON.parse(s):(ho("Failed to decode base64 JWT payload"),null)}catch(s){return ho("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function zd(n){const e=cu(n);return W(e,"internal-error"),W(typeof e.exp<"u","internal-error"),W(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Fr(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Jt&&VI(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function VI({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xI{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class el{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=$s(this.lastLoginAt),this.creationTime=$s(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Bo(n){var p;const e=n.auth,t=await n.getIdToken(),r=await Fr(n,Uo(e,{idToken:t}));W(r==null?void 0:r.users.length,e,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=(p=s.providerUserInfo)!=null&&p.length?M_(s.providerUserInfo):[],o=OI(n.providerData,i),c=n.isAnonymous,l=!(n.email&&s.passwordHash)&&!(o!=null&&o.length),u=c?l:!1,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new el(s.createdAt,s.lastLoginAt),isAnonymous:u};Object.assign(n,f)}async function DI(n){const e=ue(n);await Bo(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function OI(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function M_(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function LI(n,e){const t=await O_(n,{},async()=>{const r=Kr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,o=await L_(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const l={method:"POST",headers:c,body:r};return n.emulatorConfig&&ar(n.emulatorConfig.host)&&(l.credentials="include"),D_.fetch()(o,l)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function MI(n,e){return Lt(n,"POST","/v2/accounts:revokeToken",Zt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ar{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){W(e.idToken,"internal-error"),W(typeof e.idToken<"u","internal-error"),W(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):zd(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){W(e.length!==0,"internal-error");const t=zd(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(W(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await LI(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,o=new Ar;return r&&(W(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(W(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(W(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Ar,this.toJSON())}_performRefresh(){return Ft("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cn(n,e){W(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Et{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new xI(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new el(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Fr(this,this.stsTokenManager.getToken(this.auth,e));return W(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return kI(this,e)}reload(){return DI(this)}_assign(e){this!==e&&(W(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Et({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){W(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Bo(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(et(this.auth.app))return Promise.reject(Wt(this.auth));const e=await this.getIdToken();return await Fr(this,NI(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,o=t.photoURL??void 0,c=t.tenantId??void 0,l=t._redirectEventId??void 0,u=t.createdAt??void 0,f=t.lastLoginAt??void 0,{uid:p,emailVerified:m,isAnonymous:A,providerData:S,stsTokenManager:O}=t;W(p&&O,e,"internal-error");const F=Ar.fromJSON(this.name,O);W(typeof p=="string",e,"internal-error"),cn(r,e.name),cn(s,e.name),W(typeof m=="boolean",e,"internal-error"),W(typeof A=="boolean",e,"internal-error"),cn(i,e.name),cn(o,e.name),cn(c,e.name),cn(l,e.name),cn(u,e.name),cn(f,e.name);const H=new Et({uid:p,auth:e,email:s,emailVerified:m,displayName:r,isAnonymous:A,photoURL:o,phoneNumber:i,tenantId:c,stsTokenManager:F,createdAt:u,lastLoginAt:f});return S&&Array.isArray(S)&&(H.providerData=S.map(se=>({...se}))),l&&(H._redirectEventId=l),H}static async _fromIdTokenResponse(e,t,r=!1){const s=new Ar;s.updateFromServerResponse(t);const i=new Et({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Bo(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];W(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?M_(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),c=new Ar;c.updateFromIdToken(r);const l=new Et({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:o}),u={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new el(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(l,u),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gd=new Map;function Ut(n){Ht(n instanceof Function,"Expected a class definition");let e=Gd.get(n);return e?(Ht(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Gd.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F_{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}F_.type="NONE";const Hd=F_;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fo(n,e,t){return`firebase:${n}:${e}:${t}`}class Cr{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=fo(this.userKey,s.apiKey,i),this.fullPersistenceKey=fo("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Uo(this.auth,{idToken:e}).catch(()=>{});return t?Et._fromGetAccountInfoResponse(this.auth,t,e):null}return Et._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Cr(Ut(Hd),e,r);const s=(await Promise.all(t.map(async u=>{if(await u._isAvailable())return u}))).filter(u=>u);let i=s[0]||Ut(Hd);const o=fo(r,e.config.apiKey,e.name);let c=null;for(const u of t)try{const f=await u._get(o);if(f){let p;if(typeof f=="string"){const m=await Uo(e,{idToken:f}).catch(()=>{});if(!m)break;p=await Et._fromGetAccountInfoResponse(e,m,f)}else p=Et._fromJSON(e,f);u!==i&&(c=p),i=u;break}}catch{}const l=s.filter(u=>u._shouldAllowMigration);return!i._shouldAllowMigration||!l.length?new Cr(i,e,r):(i=l[0],c&&await i._set(o,c.toJSON()),await Promise.all(t.map(async u=>{if(u!==i)try{await u._remove(o)}catch{}})),new Cr(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kd(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if($_(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(U_(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(j_(e))return"Blackberry";if(z_(e))return"Webos";if(B_(e))return"Safari";if((e.includes("chrome/")||q_(e))&&!e.includes("edge/"))return"Chrome";if(W_(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function U_(n=je()){return/firefox\//i.test(n)}function B_(n=je()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function q_(n=je()){return/crios\//i.test(n)}function $_(n=je()){return/iemobile/i.test(n)}function W_(n=je()){return/android/i.test(n)}function j_(n=je()){return/blackberry/i.test(n)}function z_(n=je()){return/webos/i.test(n)}function lu(n=je()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function FI(n=je()){var e;return lu(n)&&!!((e=window.navigator)!=null&&e.standalone)}function UI(){return zy()&&document.documentMode===10}function G_(n=je()){return lu(n)||W_(n)||z_(n)||j_(n)||/windows phone/i.test(n)||$_(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function H_(n,e=[]){let t;switch(n){case"Browser":t=Kd(je());break;case"Worker":t=`${Kd(je())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${cr}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BI{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((o,c)=>{try{const l=e(i);o(l)}catch(l){c(l)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qI(n,e={}){return Lt(n,"GET","/v2/passwordPolicy",Zt(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $I=6;class WI{constructor(e){var r;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??$I,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jI{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Qd(this),this.idTokenSubscription=new Qd(this),this.beforeStateQueue=new BI(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=x_,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Ut(t)),this._initializationPromise=this.queue(async()=>{var r,s,i;if(!this._deleted&&(this.persistenceManager=await Cr.create(this,e),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Uo(this,{idToken:e}),r=await Et._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var i;if(et(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(i=this.redirectUser)==null?void 0:i._redirectEventId,c=r==null?void 0:r._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===c)&&(l!=null&&l.user)&&(r=l.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(o){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return W(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Bo(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=wI()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(et(this.app))return Promise.reject(Wt(this));const t=e?ue(e):null;return t&&W(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&W(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return et(this.app)?Promise.reject(Wt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return et(this.app)?Promise.reject(Wt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Ut(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await qI(this),t=new WI(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Ei("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await MI(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Ut(e)||this._popupRedirectResolver;W(t,this,"argument-error"),this.redirectPersistenceManager=await Cr.create(this,[Ut(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(W(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,r,s);return()=>{o=!0,l()}}else{const l=e.addObserver(t);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return W(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=H_(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var t;if(et(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&yI(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function en(n){return ue(n)}class Qd{constructor(e){this.auth=e,this.observer=null,this.addObserver=nE(t=>this.observer=t)}get next(){return W(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ta={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function zI(n){Ta=n}function K_(n){return Ta.loadJS(n)}function GI(){return Ta.recaptchaEnterpriseScript}function HI(){return Ta.gapiScript}function KI(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class QI{constructor(){this.enterprise=new YI}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class YI{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const JI="recaptcha-enterprise",Q_="NO_RECAPTCHA",Yd="onFirebaseAuthREInstanceReady";class ln{constructor(e){this.type=JI,this.auth=en(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,c)=>{bI(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const u=new PI(l);return i.tenantId==null?i._agentRecaptchaConfig=u:i._tenantRecaptchaConfigs[i.tenantId]=u,o(u.siteKey)}}).catch(l=>{c(l)})})}function s(i,o,c){const l=window.grecaptcha;jd(l)?l.enterprise.ready(()=>{l.enterprise.execute(i,{action:e}).then(u=>{o(u)}).catch(()=>{o(Q_)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new QI().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{r(this.auth).then(async c=>{if(!t&&jd(window.grecaptcha)&&ln.scriptInjectionDeferred)await ln.scriptInjectionDeferred.promise,s(c,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let l=GI();l.length!==0&&(l+=c+`&onload=${Yd}`),ln.scriptInjectionDeferred=new Hr,window[Yd]=()=>{var u;(u=ln.scriptInjectionDeferred)==null||u.resolve()},K_(l).then(()=>{var u;return(u=ln.scriptInjectionDeferred)==null?void 0:u.promise}).then(()=>{s(c,i,o)}).catch(u=>{o(u)})}}).catch(c=>{o(c)})})}}ln.scriptInjectionDeferred=null;async function Jd(n,e,t,r=!1,s=!1){const i=new ln(n);let o;if(s)o=Q_;else try{o=await i.verify(t)}catch{o=await i.verify(t,!0)}const c={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const l=c.phoneEnrollmentInfo.phoneNumber,u=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:l,recaptchaToken:u,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const l=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:l,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:o}):Object.assign(c,{captchaResponse:o}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function qo(n,e,t,r,s){var i;if((i=n._getRecaptchaConfig())!=null&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await Jd(n,e,t,t==="getOobCode");return r(n,o)}else return r(n,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const c=await Jd(n,e,t,t==="getOobCode");return r(n,c)}else return Promise.reject(o)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function XI(n,e){const t=la(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(Cn(i,e??{}))return s;pt(s,"already-initialized")}return t.initialize({options:e})}function ZI(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(Ut);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function eA(n,e,t){const r=en(n);W(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=Y_(e),{host:o,port:c}=tA(e),l=c===null?"":`:${c}`,u={url:`${i}//${o}${l}/`},f=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){W(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),W(Cn(u,r.config.emulator)&&Cn(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=u,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,ar(o)?Al(`${i}//${o}${l}`):nA()}function Y_(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function tA(n){const e=Y_(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Xd(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:Xd(o)}}}function Xd(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function nA(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uu{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Ft("not implemented")}_getIdTokenResponse(e){return Ft("not implemented")}_linkToIdToken(e,t){return Ft("not implemented")}_getReauthenticationResolver(e){return Ft("not implemented")}}async function rA(n,e){return Lt(n,"POST","/v1/accounts:update",e)}async function sA(n,e){return Lt(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function iA(n,e){return Si(n,"POST","/v1/accounts:signInWithPassword",Zt(n,e))}async function oA(n,e){return Lt(n,"POST","/v1/accounts:sendOobCode",Zt(n,e))}async function aA(n,e){return oA(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cA(n,e){return Si(n,"POST","/v1/accounts:signInWithEmailLink",Zt(n,e))}async function lA(n,e){return Si(n,"POST","/v1/accounts:signInWithEmailLink",Zt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oi extends uu{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new oi(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new oi(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return qo(e,t,"signInWithPassword",iA);case"emailLink":return cA(e,{email:this._email,oobCode:this._password});default:pt(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return qo(e,r,"signUpPassword",sA);case"emailLink":return lA(e,{idToken:t,email:this._email,oobCode:this._password});default:pt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Rr(n,e){return Si(n,"POST","/v1/accounts:signInWithIdp",Zt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uA="http://localhost";class rr extends uu{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new rr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):pt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=t;if(!r||!s)return null;const o=new rr(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Rr(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Rr(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Rr(e,t)}buildRequest(){const e={requestUri:uA,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Kr(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hA(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function dA(n){const e=Ns(ks(n)).link,t=e?Ns(ks(e)).deep_link_id:null,r=Ns(ks(n)).deep_link_id;return(r?Ns(ks(r)).link:null)||r||t||e||n}class hu{constructor(e){const t=Ns(ks(e)),r=t.apiKey??null,s=t.oobCode??null,i=hA(t.mode??null);W(r&&s&&i,"argument-error"),this.apiKey=r,this.operation=i,this.code=s,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=dA(e);try{return new hu(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xr{constructor(){this.providerId=Xr.PROVIDER_ID}static credential(e,t){return oi._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=hu.parseLink(t);return W(r,"argument-error"),oi._fromEmailAndCode(e,r.code,r.tenantId)}}Xr.PROVIDER_ID="password";Xr.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Xr.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class du{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pi extends du{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class un extends Pi{constructor(){super("facebook.com")}static credential(e){return rr._fromParams({providerId:un.PROVIDER_ID,signInMethod:un.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return un.credentialFromTaggedObject(e)}static credentialFromError(e){return un.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return un.credential(e.oauthAccessToken)}catch{return null}}}un.FACEBOOK_SIGN_IN_METHOD="facebook.com";un.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hn extends Pi{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return rr._fromParams({providerId:hn.PROVIDER_ID,signInMethod:hn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return hn.credentialFromTaggedObject(e)}static credentialFromError(e){return hn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return hn.credential(t,r)}catch{return null}}}hn.GOOGLE_SIGN_IN_METHOD="google.com";hn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dn extends Pi{constructor(){super("github.com")}static credential(e){return rr._fromParams({providerId:dn.PROVIDER_ID,signInMethod:dn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return dn.credentialFromTaggedObject(e)}static credentialFromError(e){return dn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return dn.credential(e.oauthAccessToken)}catch{return null}}}dn.GITHUB_SIGN_IN_METHOD="github.com";dn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fn extends Pi{constructor(){super("twitter.com")}static credential(e,t){return rr._fromParams({providerId:fn.PROVIDER_ID,signInMethod:fn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return fn.credentialFromTaggedObject(e)}static credentialFromError(e){return fn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return fn.credential(t,r)}catch{return null}}}fn.TWITTER_SIGN_IN_METHOD="twitter.com";fn.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fA(n,e){return Si(n,"POST","/v1/accounts:signUp",Zt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sr{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await Et._fromIdTokenResponse(e,r,s),o=Zd(r);return new sr({user:i,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=Zd(r);return new sr({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function Zd(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $o extends Jt{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,$o.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new $o(e,t,r,s)}}function J_(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?$o._fromErrorAndOperation(n,i,e,r):i})}async function pA(n,e,t=!1){const r=await Fr(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return sr._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function X_(n,e,t=!1){const{auth:r}=n;if(et(r.app))return Promise.reject(Wt(r));const s="reauthenticate";try{const i=await Fr(n,J_(r,s,e,n),t);W(i.idToken,r,"internal-error");const o=cu(i.idToken);W(o,r,"internal-error");const{sub:c}=o;return W(n.uid===c,r,"user-mismatch"),sr._forOperation(n,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&pt(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Z_(n,e,t=!1){if(et(n.app))return Promise.reject(Wt(n));const r="signIn",s=await J_(n,r,e),i=await sr._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}async function _A(n,e){return Z_(en(n),e)}async function gN(n,e){return X_(ue(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function em(n){const e=en(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function yN(n,e,t){const r=en(n);await qo(r,{requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"},"getOobCode",aA)}async function EN(n,e,t){if(et(n.app))return Promise.reject(Wt(n));const r=en(n),o=await qo(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",fA).catch(l=>{throw l.code==="auth/password-does-not-meet-requirements"&&em(n),l}),c=await sr._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(c.user),c}function vN(n,e,t){return et(n.app)?Promise.reject(Wt(n)):_A(ue(n),Xr.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&em(n),r})}function TN(n,e){return mA(ue(n),null,e)}async function mA(n,e,t){const{auth:r}=n,i={idToken:await n.getIdToken(),returnSecureToken:!0};t&&(i.password=t);const o=await Fr(n,rA(r,i));await n._updateTokensIfNecessary(o,!0)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wN(n,e){return ue(n).setPersistence(e)}function gA(n,e,t,r){return ue(n).onIdTokenChanged(e,t,r)}function yA(n,e,t){return ue(n).beforeAuthStateChanged(e,t)}function IN(n,e,t,r){return ue(n).onAuthStateChanged(e,t,r)}function AN(n){return ue(n).signOut()}async function CN(n){return ue(n).delete()}const Wo="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tm{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Wo,"1"),this.storage.removeItem(Wo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const EA=1e3,vA=10;class nm extends tm{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=G_(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,l)=>{this.notifyListeners(o,l)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);UI()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,vA):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},EA)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}nm.type="LOCAL";const TA=nm;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rm extends tm{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}rm.type="SESSION";const sm=rm;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wA(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wa{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new wa(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(o).map(async u=>u(t.origin,i)),l=await wA(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}wa.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fu(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IA{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,l)=>{const u=fu("",20);s.port1.start();const f=setTimeout(()=>{l(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(p){const m=p;if(m.data.eventId===u)switch(m.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(m.data.response);break;default:clearTimeout(f),clearTimeout(i),l(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:u,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kt(){return window}function AA(n){kt().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function im(){return typeof kt().WorkerGlobalScope<"u"&&typeof kt().importScripts=="function"}async function CA(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function RA(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function SA(){return im()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const om="firebaseLocalStorageDb",PA=1,jo="firebaseLocalStorage",am="fbase_key";class bi{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Ia(n,e){return n.transaction([jo],e?"readwrite":"readonly").objectStore(jo)}function bA(){const n=indexedDB.deleteDatabase(om);return new bi(n).toPromise()}function cm(){const n=indexedDB.open(om,PA);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(jo,{keyPath:am})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(jo)?e(r):(r.close(),await bA(),e(await cm()))})})}async function ef(n,e,t){const r=Ia(n,!0).put({[am]:e,value:t});return new bi(r).toPromise()}async function NA(n,e){const t=Ia(n,!1).get(e),r=await new bi(t).toPromise();return r===void 0?null:r.value}function tf(n,e){const t=Ia(n,!0).delete(e);return new bi(t).toPromise()}const kA=800,VA=3;class lm{constructor(){this.type="LOCAL",this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.dbPromise?this.dbPromise:(this.dbPromise=cm(),this.dbPromise.catch(()=>{this.dbPromise=null}),this.dbPromise)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>VA)throw r;this.dbPromise&&((await this.dbPromise).close(),this.dbPromise=null)}}async initializeServiceWorkerMessaging(){return im()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=wa._getInstance(SA()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,r;if(this.activeServiceWorker=await CA(),!this.activeServiceWorker)return;this.sender=new IA(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||RA()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return indexedDB?(await this._withRetries(async e=>{await ef(e,Wo,"1"),await tf(e,Wo)}),!0):!1}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>ef(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>NA(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>tf(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Ia(s,!1).getAll();return new bi(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),kA)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}lm.type="LOCAL";const xA=lm;new Ri(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function um(n,e){return e?Ut(e):(W(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pu extends uu{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Rr(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Rr(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Rr(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function DA(n){return Z_(n.auth,new pu(n),n.bypassAuthState)}function OA(n){const{auth:e,user:t}=n;return W(t,e,"internal-error"),X_(t,new pu(n),n.bypassAuthState)}async function LA(n){const{auth:e,user:t}=n;return W(t,e,"internal-error"),pA(t,new pu(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hm{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:o,type:c}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(u){this.reject(u)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return DA;case"linkViaPopup":case"linkViaRedirect":return LA;case"reauthViaPopup":case"reauthViaRedirect":return OA;default:pt(this.auth,"internal-error")}}resolve(e){Ht(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Ht(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const MA=new Ri(2e3,1e4);async function RN(n,e,t){if(et(n.app))return Promise.reject(Tt(n,"operation-not-supported-in-this-environment"));const r=en(n);EI(n,e,du);const s=um(r,t);return new Kn(r,"signInViaPopup",e,s).executeNotNull()}class Kn extends hm{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Kn.currentPopupAction&&Kn.currentPopupAction.cancel(),Kn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return W(e,this.auth,"internal-error"),e}async onExecution(){Ht(this.filter.length===1,"Popup operations only handle one event");const e=fu();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Tt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(Tt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Kn.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if((r=(t=this.authWindow)==null?void 0:t.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Tt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,MA.get())};e()}}Kn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const FA="pendingRedirect",po=new Map;class UA extends hm{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=po.get(this.auth._key());if(!e){try{const r=await BA(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}po.set(this.auth._key(),e)}return this.bypassAuthState||po.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function BA(n,e){const t=WA(e),r=$A(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function qA(n,e){po.set(n._key(),e)}function $A(n){return Ut(n._redirectPersistence)}function WA(n){return fo(FA,n.config.apiKey,n.name)}async function jA(n,e,t=!1){if(et(n.app))return Promise.reject(Wt(n));const r=en(n),s=um(r,e),o=await new UA(r,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zA=600*1e3;class GA{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!HA(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!dm(e)){const s=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";t.onError(Tt(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=zA&&this.cachedEventUids.clear(),this.cachedEventUids.has(nf(e))}saveEventToCache(e){this.cachedEventUids.add(nf(e)),this.lastProcessedEventTime=Date.now()}}function nf(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function dm({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function HA(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return dm(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function KA(n,e={}){return Lt(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QA=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,YA=/^https?/;async function JA(n){if(n.config.emulator)return;const{authorizedDomains:e}=await KA(n);for(const t of e)try{if(XA(t))return}catch{}pt(n,"unauthorized-domain")}function XA(n){const e=Zc(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!YA.test(t))return!1;if(QA.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZA=new Ri(3e4,6e4);function rf(){const n=kt().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function eC(n){return new Promise((e,t)=>{var s,i,o;function r(){rf(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{rf(),t(Tt(n,"network-request-failed"))},timeout:ZA.get()})}if((i=(s=kt().gapi)==null?void 0:s.iframes)!=null&&i.Iframe)e(gapi.iframes.getContext());else if((o=kt().gapi)!=null&&o.load)r();else{const c=KI("iframefcb");return kt()[c]=()=>{gapi.load?r():t(Tt(n,"network-request-failed"))},K_(`${HI()}?onload=${c}`).catch(l=>t(l))}}).catch(e=>{throw _o=null,e})}let _o=null;function tC(n){return _o=_o||eC(n),_o}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nC=new Ri(5e3,15e3),rC="__/auth/iframe",sC="emulator/auth/iframe",iC={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},oC=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function aC(n){const e=n.config;W(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?au(e,sC):`https://${n.config.authDomain}/${rC}`,r={apiKey:e.apiKey,appName:n.name,v:cr},s=oC.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${Kr(r).slice(1)}`}async function cC(n){const e=await tC(n),t=kt().gapi;return W(t,n,"internal-error"),e.open({where:document.body,url:aC(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:iC,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=Tt(n,"network-request-failed"),c=kt().setTimeout(()=>{i(o)},nC.get());function l(){kt().clearTimeout(c),s(r)}r.ping(l).then(l,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lC={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},uC=500,hC=600,dC="_blank",fC="http://localhost";class sf{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function pC(n,e,t,r=uC,s=hC){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const l={...lC,width:r.toString(),height:s.toString(),top:i,left:o},u=je().toLowerCase();t&&(c=q_(u)?dC:t),U_(u)&&(e=e||fC,l.scrollbars="yes");const f=Object.entries(l).reduce((m,[A,S])=>`${m}${A}=${S},`,"");if(FI(u)&&c!=="_self")return _C(e||"",c),new sf(null);const p=window.open(e||"",c,f);W(p,n,"popup-blocked");try{p.focus()}catch{}return new sf(p)}function _C(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mC="__/auth/handler",gC="emulator/auth/handler",yC=encodeURIComponent("fac");async function of(n,e,t,r,s,i){W(n.config.authDomain,n,"auth-domain-config-required"),W(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:cr,eventId:s};if(e instanceof du){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",Dc(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,p]of Object.entries({}))o[f]=p}if(e instanceof Pi){const f=e.getScopes().filter(p=>p!=="");f.length>0&&(o.scopes=f.join(","))}n.tenantId&&(o.tid=n.tenantId);const c=o;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const l=await n._getAppCheckToken(),u=l?`#${yC}=${encodeURIComponent(l)}`:"";return`${EC(n)}?${Kr(c).slice(1)}${u}`}function EC({config:n}){return n.emulator?au(n,gC):`https://${n.authDomain}/${mC}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cc="webStorageSupport";class vC{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=sm,this._completeRedirectFn=jA,this._overrideRedirectResult=qA}async _openPopup(e,t,r,s){var o;Ht((o=this.eventManagers[e._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const i=await of(e,t,r,Zc(),s);return pC(e,i,fu())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await of(e,t,r,Zc(),s);return AA(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(Ht(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await cC(e),r=new GA(e);return t.register("authEvent",s=>(W(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Cc,{type:Cc},s=>{var o;const i=(o=s==null?void 0:s[0])==null?void 0:o[Cc];i!==void 0&&t(!!i),pt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=JA(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return G_()||B_()||lu()}}const TC=vC;var af="@firebase/auth",cf="1.13.3";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wC{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){W(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function IC(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function AC(n){Zn(new Rn("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;W(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:o,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:H_(n)},u=new jI(r,s,i,l);return ZI(u,t),u},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Zn(new Rn("auth-internal",e=>{const t=en(e.getProvider("auth").getImmediate());return(r=>new wC(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Nt(af,cf,IC(n)),Nt(af,cf,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CC=300,RC=pp("authIdTokenMaxAge")||CC;let lf=null;const SC=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>RC)return;const s=t==null?void 0:t.token;lf!==s&&(lf=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function SN(n=Cl()){const e=la(n,"auth");if(e.isInitialized())return e.getImmediate();const t=XI(n,{popupRedirectResolver:TC,persistence:[xA,TA,sm]}),r=pp("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=SC(i.toString());yA(t,o,()=>o(t.currentUser)),gA(t,c=>o(c))}}const s=hp("auth");return s&&eA(t,`http://${s}`),t}function PC(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}zI({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=Tt("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",PC().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});AC("Browser");var uf=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var vn,fm;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(w,g){function E(){}E.prototype=g.prototype,w.F=g.prototype,w.prototype=new E,w.prototype.constructor=w,w.D=function(I,T,R){for(var y=Array(arguments.length-2),Xe=2;Xe<arguments.length;Xe++)y[Xe-2]=arguments[Xe];return g.prototype[T].apply(I,y)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(w,g,E){E||(E=0);const I=Array(16);if(typeof g=="string")for(var T=0;T<16;++T)I[T]=g.charCodeAt(E++)|g.charCodeAt(E++)<<8|g.charCodeAt(E++)<<16|g.charCodeAt(E++)<<24;else for(T=0;T<16;++T)I[T]=g[E++]|g[E++]<<8|g[E++]<<16|g[E++]<<24;g=w.g[0],E=w.g[1],T=w.g[2];let R=w.g[3],y;y=g+(R^E&(T^R))+I[0]+3614090360&4294967295,g=E+(y<<7&4294967295|y>>>25),y=R+(T^g&(E^T))+I[1]+3905402710&4294967295,R=g+(y<<12&4294967295|y>>>20),y=T+(E^R&(g^E))+I[2]+606105819&4294967295,T=R+(y<<17&4294967295|y>>>15),y=E+(g^T&(R^g))+I[3]+3250441966&4294967295,E=T+(y<<22&4294967295|y>>>10),y=g+(R^E&(T^R))+I[4]+4118548399&4294967295,g=E+(y<<7&4294967295|y>>>25),y=R+(T^g&(E^T))+I[5]+1200080426&4294967295,R=g+(y<<12&4294967295|y>>>20),y=T+(E^R&(g^E))+I[6]+2821735955&4294967295,T=R+(y<<17&4294967295|y>>>15),y=E+(g^T&(R^g))+I[7]+4249261313&4294967295,E=T+(y<<22&4294967295|y>>>10),y=g+(R^E&(T^R))+I[8]+1770035416&4294967295,g=E+(y<<7&4294967295|y>>>25),y=R+(T^g&(E^T))+I[9]+2336552879&4294967295,R=g+(y<<12&4294967295|y>>>20),y=T+(E^R&(g^E))+I[10]+4294925233&4294967295,T=R+(y<<17&4294967295|y>>>15),y=E+(g^T&(R^g))+I[11]+2304563134&4294967295,E=T+(y<<22&4294967295|y>>>10),y=g+(R^E&(T^R))+I[12]+1804603682&4294967295,g=E+(y<<7&4294967295|y>>>25),y=R+(T^g&(E^T))+I[13]+4254626195&4294967295,R=g+(y<<12&4294967295|y>>>20),y=T+(E^R&(g^E))+I[14]+2792965006&4294967295,T=R+(y<<17&4294967295|y>>>15),y=E+(g^T&(R^g))+I[15]+1236535329&4294967295,E=T+(y<<22&4294967295|y>>>10),y=g+(T^R&(E^T))+I[1]+4129170786&4294967295,g=E+(y<<5&4294967295|y>>>27),y=R+(E^T&(g^E))+I[6]+3225465664&4294967295,R=g+(y<<9&4294967295|y>>>23),y=T+(g^E&(R^g))+I[11]+643717713&4294967295,T=R+(y<<14&4294967295|y>>>18),y=E+(R^g&(T^R))+I[0]+3921069994&4294967295,E=T+(y<<20&4294967295|y>>>12),y=g+(T^R&(E^T))+I[5]+3593408605&4294967295,g=E+(y<<5&4294967295|y>>>27),y=R+(E^T&(g^E))+I[10]+38016083&4294967295,R=g+(y<<9&4294967295|y>>>23),y=T+(g^E&(R^g))+I[15]+3634488961&4294967295,T=R+(y<<14&4294967295|y>>>18),y=E+(R^g&(T^R))+I[4]+3889429448&4294967295,E=T+(y<<20&4294967295|y>>>12),y=g+(T^R&(E^T))+I[9]+568446438&4294967295,g=E+(y<<5&4294967295|y>>>27),y=R+(E^T&(g^E))+I[14]+3275163606&4294967295,R=g+(y<<9&4294967295|y>>>23),y=T+(g^E&(R^g))+I[3]+4107603335&4294967295,T=R+(y<<14&4294967295|y>>>18),y=E+(R^g&(T^R))+I[8]+1163531501&4294967295,E=T+(y<<20&4294967295|y>>>12),y=g+(T^R&(E^T))+I[13]+2850285829&4294967295,g=E+(y<<5&4294967295|y>>>27),y=R+(E^T&(g^E))+I[2]+4243563512&4294967295,R=g+(y<<9&4294967295|y>>>23),y=T+(g^E&(R^g))+I[7]+1735328473&4294967295,T=R+(y<<14&4294967295|y>>>18),y=E+(R^g&(T^R))+I[12]+2368359562&4294967295,E=T+(y<<20&4294967295|y>>>12),y=g+(E^T^R)+I[5]+4294588738&4294967295,g=E+(y<<4&4294967295|y>>>28),y=R+(g^E^T)+I[8]+2272392833&4294967295,R=g+(y<<11&4294967295|y>>>21),y=T+(R^g^E)+I[11]+1839030562&4294967295,T=R+(y<<16&4294967295|y>>>16),y=E+(T^R^g)+I[14]+4259657740&4294967295,E=T+(y<<23&4294967295|y>>>9),y=g+(E^T^R)+I[1]+2763975236&4294967295,g=E+(y<<4&4294967295|y>>>28),y=R+(g^E^T)+I[4]+1272893353&4294967295,R=g+(y<<11&4294967295|y>>>21),y=T+(R^g^E)+I[7]+4139469664&4294967295,T=R+(y<<16&4294967295|y>>>16),y=E+(T^R^g)+I[10]+3200236656&4294967295,E=T+(y<<23&4294967295|y>>>9),y=g+(E^T^R)+I[13]+681279174&4294967295,g=E+(y<<4&4294967295|y>>>28),y=R+(g^E^T)+I[0]+3936430074&4294967295,R=g+(y<<11&4294967295|y>>>21),y=T+(R^g^E)+I[3]+3572445317&4294967295,T=R+(y<<16&4294967295|y>>>16),y=E+(T^R^g)+I[6]+76029189&4294967295,E=T+(y<<23&4294967295|y>>>9),y=g+(E^T^R)+I[9]+3654602809&4294967295,g=E+(y<<4&4294967295|y>>>28),y=R+(g^E^T)+I[12]+3873151461&4294967295,R=g+(y<<11&4294967295|y>>>21),y=T+(R^g^E)+I[15]+530742520&4294967295,T=R+(y<<16&4294967295|y>>>16),y=E+(T^R^g)+I[2]+3299628645&4294967295,E=T+(y<<23&4294967295|y>>>9),y=g+(T^(E|~R))+I[0]+4096336452&4294967295,g=E+(y<<6&4294967295|y>>>26),y=R+(E^(g|~T))+I[7]+1126891415&4294967295,R=g+(y<<10&4294967295|y>>>22),y=T+(g^(R|~E))+I[14]+2878612391&4294967295,T=R+(y<<15&4294967295|y>>>17),y=E+(R^(T|~g))+I[5]+4237533241&4294967295,E=T+(y<<21&4294967295|y>>>11),y=g+(T^(E|~R))+I[12]+1700485571&4294967295,g=E+(y<<6&4294967295|y>>>26),y=R+(E^(g|~T))+I[3]+2399980690&4294967295,R=g+(y<<10&4294967295|y>>>22),y=T+(g^(R|~E))+I[10]+4293915773&4294967295,T=R+(y<<15&4294967295|y>>>17),y=E+(R^(T|~g))+I[1]+2240044497&4294967295,E=T+(y<<21&4294967295|y>>>11),y=g+(T^(E|~R))+I[8]+1873313359&4294967295,g=E+(y<<6&4294967295|y>>>26),y=R+(E^(g|~T))+I[15]+4264355552&4294967295,R=g+(y<<10&4294967295|y>>>22),y=T+(g^(R|~E))+I[6]+2734768916&4294967295,T=R+(y<<15&4294967295|y>>>17),y=E+(R^(T|~g))+I[13]+1309151649&4294967295,E=T+(y<<21&4294967295|y>>>11),y=g+(T^(E|~R))+I[4]+4149444226&4294967295,g=E+(y<<6&4294967295|y>>>26),y=R+(E^(g|~T))+I[11]+3174756917&4294967295,R=g+(y<<10&4294967295|y>>>22),y=T+(g^(R|~E))+I[2]+718787259&4294967295,T=R+(y<<15&4294967295|y>>>17),y=E+(R^(T|~g))+I[9]+3951481745&4294967295,w.g[0]=w.g[0]+g&4294967295,w.g[1]=w.g[1]+(T+(y<<21&4294967295|y>>>11))&4294967295,w.g[2]=w.g[2]+T&4294967295,w.g[3]=w.g[3]+R&4294967295}r.prototype.v=function(w,g){g===void 0&&(g=w.length);const E=g-this.blockSize,I=this.C;let T=this.h,R=0;for(;R<g;){if(T==0)for(;R<=E;)s(this,w,R),R+=this.blockSize;if(typeof w=="string"){for(;R<g;)if(I[T++]=w.charCodeAt(R++),T==this.blockSize){s(this,I),T=0;break}}else for(;R<g;)if(I[T++]=w[R++],T==this.blockSize){s(this,I),T=0;break}}this.h=T,this.o+=g},r.prototype.A=function(){var w=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);w[0]=128;for(var g=1;g<w.length-8;++g)w[g]=0;g=this.o*8;for(var E=w.length-8;E<w.length;++E)w[E]=g&255,g/=256;for(this.v(w),w=Array(16),g=0,E=0;E<4;++E)for(let I=0;I<32;I+=8)w[g++]=this.g[E]>>>I&255;return w};function i(w,g){var E=c;return Object.prototype.hasOwnProperty.call(E,w)?E[w]:E[w]=g(w)}function o(w,g){this.h=g;const E=[];let I=!0;for(let T=w.length-1;T>=0;T--){const R=w[T]|0;I&&R==g||(E[T]=R,I=!1)}this.g=E}var c={};function l(w){return-128<=w&&w<128?i(w,function(g){return new o([g|0],g<0?-1:0)}):new o([w|0],w<0?-1:0)}function u(w){if(isNaN(w)||!isFinite(w))return p;if(w<0)return F(u(-w));const g=[];let E=1;for(let I=0;w>=E;I++)g[I]=w/E|0,E*=4294967296;return new o(g,0)}function f(w,g){if(w.length==0)throw Error("number format error: empty string");if(g=g||10,g<2||36<g)throw Error("radix out of range: "+g);if(w.charAt(0)=="-")return F(f(w.substring(1),g));if(w.indexOf("-")>=0)throw Error('number format error: interior "-" character');const E=u(Math.pow(g,8));let I=p;for(let R=0;R<w.length;R+=8){var T=Math.min(8,w.length-R);const y=parseInt(w.substring(R,R+T),g);T<8?(T=u(Math.pow(g,T)),I=I.j(T).add(u(y))):(I=I.j(E),I=I.add(u(y)))}return I}var p=l(0),m=l(1),A=l(16777216);n=o.prototype,n.m=function(){if(O(this))return-F(this).m();let w=0,g=1;for(let E=0;E<this.g.length;E++){const I=this.i(E);w+=(I>=0?I:4294967296+I)*g,g*=4294967296}return w},n.toString=function(w){if(w=w||10,w<2||36<w)throw Error("radix out of range: "+w);if(S(this))return"0";if(O(this))return"-"+F(this).toString(w);const g=u(Math.pow(w,6));var E=this;let I="";for(;;){const T=Je(E,g).g;E=H(E,T.j(g));let R=((E.g.length>0?E.g[0]:E.h)>>>0).toString(w);if(E=T,S(E))return R+I;for(;R.length<6;)R="0"+R;I=R+I}},n.i=function(w){return w<0?0:w<this.g.length?this.g[w]:this.h};function S(w){if(w.h!=0)return!1;for(let g=0;g<w.g.length;g++)if(w.g[g]!=0)return!1;return!0}function O(w){return w.h==-1}n.l=function(w){return w=H(this,w),O(w)?-1:S(w)?0:1};function F(w){const g=w.g.length,E=[];for(let I=0;I<g;I++)E[I]=~w.g[I];return new o(E,~w.h).add(m)}n.abs=function(){return O(this)?F(this):this},n.add=function(w){const g=Math.max(this.g.length,w.g.length),E=[];let I=0;for(let T=0;T<=g;T++){let R=I+(this.i(T)&65535)+(w.i(T)&65535),y=(R>>>16)+(this.i(T)>>>16)+(w.i(T)>>>16);I=y>>>16,R&=65535,y&=65535,E[T]=y<<16|R}return new o(E,E[E.length-1]&-2147483648?-1:0)};function H(w,g){return w.add(F(g))}n.j=function(w){if(S(this)||S(w))return p;if(O(this))return O(w)?F(this).j(F(w)):F(F(this).j(w));if(O(w))return F(this.j(F(w)));if(this.l(A)<0&&w.l(A)<0)return u(this.m()*w.m());const g=this.g.length+w.g.length,E=[];for(var I=0;I<2*g;I++)E[I]=0;for(I=0;I<this.g.length;I++)for(let T=0;T<w.g.length;T++){const R=this.i(I)>>>16,y=this.i(I)&65535,Xe=w.i(T)>>>16,Fn=w.i(T)&65535;E[2*I+2*T]+=y*Fn,se(E,2*I+2*T),E[2*I+2*T+1]+=R*Fn,se(E,2*I+2*T+1),E[2*I+2*T+1]+=y*Xe,se(E,2*I+2*T+1),E[2*I+2*T+2]+=R*Xe,se(E,2*I+2*T+2)}for(w=0;w<g;w++)E[w]=E[2*w+1]<<16|E[2*w];for(w=g;w<2*g;w++)E[w]=0;return new o(E,0)};function se(w,g){for(;(w[g]&65535)!=w[g];)w[g+1]+=w[g]>>>16,w[g]&=65535,g++}function fe(w,g){this.g=w,this.h=g}function Je(w,g){if(S(g))throw Error("division by zero");if(S(w))return new fe(p,p);if(O(w))return g=Je(F(w),g),new fe(F(g.g),F(g.h));if(O(g))return g=Je(w,F(g)),new fe(F(g.g),g.h);if(w.g.length>30){if(O(w)||O(g))throw Error("slowDivide_ only works with positive integers.");for(var E=m,I=g;I.l(w)<=0;)E=Fe(E),I=Fe(I);var T=Ue(E,1),R=Ue(I,1);for(I=Ue(I,2),E=Ue(E,2);!S(I);){var y=R.add(I);y.l(w)<=0&&(T=T.add(E),R=y),I=Ue(I,1),E=Ue(E,1)}return g=H(w,T.j(g)),new fe(T,g)}for(T=p;w.l(g)>=0;){for(E=Math.max(1,Math.floor(w.m()/g.m())),I=Math.ceil(Math.log(E)/Math.LN2),I=I<=48?1:Math.pow(2,I-48),R=u(E),y=R.j(g);O(y)||y.l(w)>0;)E-=I,R=u(E),y=R.j(g);S(R)&&(R=m),T=T.add(R),w=H(w,y)}return new fe(T,w)}n.B=function(w){return Je(this,w).h},n.and=function(w){const g=Math.max(this.g.length,w.g.length),E=[];for(let I=0;I<g;I++)E[I]=this.i(I)&w.i(I);return new o(E,this.h&w.h)},n.or=function(w){const g=Math.max(this.g.length,w.g.length),E=[];for(let I=0;I<g;I++)E[I]=this.i(I)|w.i(I);return new o(E,this.h|w.h)},n.xor=function(w){const g=Math.max(this.g.length,w.g.length),E=[];for(let I=0;I<g;I++)E[I]=this.i(I)^w.i(I);return new o(E,this.h^w.h)};function Fe(w){const g=w.g.length+1,E=[];for(let I=0;I<g;I++)E[I]=w.i(I)<<1|w.i(I-1)>>>31;return new o(E,w.h)}function Ue(w,g){const E=g>>5;g%=32;const I=w.g.length-E,T=[];for(let R=0;R<I;R++)T[R]=g>0?w.i(R+E)>>>g|w.i(R+E+1)<<32-g:w.i(R+E);return new o(T,w.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,fm=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=u,o.fromString=f,vn=o}).apply(typeof uf<"u"?uf:typeof self<"u"?self:typeof window<"u"?window:{});var ro=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var pm,xs,_m,mo,tl,mm,gm,ym;(function(){var n,e=Object.defineProperty;function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof ro=="object"&&ro];for(var h=0;h<a.length;++h){var d=a[h];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=t(this);function s(a,h){if(h)e:{var d=r;a=a.split(".");for(var _=0;_<a.length-1;_++){var C=a[_];if(!(C in d))break e;d=d[C]}a=a[a.length-1],_=d[a],h=h(_),h!=_&&h!=null&&e(d,a,{configurable:!0,writable:!0,value:h})}}s("Symbol.dispose",function(a){return a||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(a){return a||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(a){return a||function(h){var d=[],_;for(_ in h)Object.prototype.hasOwnProperty.call(h,_)&&d.push([_,h[_]]);return d}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},o=this||self;function c(a){var h=typeof a;return h=="object"&&a!=null||h=="function"}function l(a,h,d){return a.call.apply(a.bind,arguments)}function u(a,h,d){return u=l,u.apply(null,arguments)}function f(a,h){var d=Array.prototype.slice.call(arguments,1);return function(){var _=d.slice();return _.push.apply(_,arguments),a.apply(this,_)}}function p(a,h){function d(){}d.prototype=h.prototype,a.Z=h.prototype,a.prototype=new d,a.prototype.constructor=a,a.Ob=function(_,C,P){for(var D=Array(arguments.length-2),G=2;G<arguments.length;G++)D[G-2]=arguments[G];return h.prototype[C].apply(_,D)}}var m=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?a=>a&&AsyncContext.Snapshot.wrap(a):a=>a;function A(a){const h=a.length;if(h>0){const d=Array(h);for(let _=0;_<h;_++)d[_]=a[_];return d}return[]}function S(a,h){for(let _=1;_<arguments.length;_++){const C=arguments[_];var d=typeof C;if(d=d!="object"?d:C?Array.isArray(C)?"array":d:"null",d=="array"||d=="object"&&typeof C.length=="number"){d=a.length||0;const P=C.length||0;a.length=d+P;for(let D=0;D<P;D++)a[d+D]=C[D]}else a.push(C)}}class O{constructor(h,d){this.i=h,this.j=d,this.h=0,this.g=null}get(){let h;return this.h>0?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function F(a){o.setTimeout(()=>{throw a},0)}function H(){var a=w;let h=null;return a.g&&(h=a.g,a.g=a.g.next,a.g||(a.h=null),h.next=null),h}class se{constructor(){this.h=this.g=null}add(h,d){const _=fe.get();_.set(h,d),this.h?this.h.next=_:this.g=_,this.h=_}}var fe=new O(()=>new Je,a=>a.reset());class Je{constructor(){this.next=this.g=this.h=null}set(h,d){this.h=h,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let Fe,Ue=!1,w=new se,g=()=>{const a=Promise.resolve(void 0);Fe=()=>{a.then(E)}};function E(){for(var a;a=H();){try{a.h.call(a.g)}catch(d){F(d)}var h=fe;h.j(a),h.h<100&&(h.h++,a.next=h.g,h.g=a)}Ue=!1}function I(){this.u=this.u,this.C=this.C}I.prototype.u=!1,I.prototype.dispose=function(){this.u||(this.u=!0,this.N())},I.prototype[Symbol.dispose]=function(){this.dispose()},I.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function T(a,h){this.type=a,this.g=this.target=h,this.defaultPrevented=!1}T.prototype.h=function(){this.defaultPrevented=!0};var R=(function(){if(!o.addEventListener||!Object.defineProperty)return!1;var a=!1,h=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const d=()=>{};o.addEventListener("test",d,h),o.removeEventListener("test",d,h)}catch{}return a})();function y(a){return/^[\s\xa0]*$/.test(a)}function Xe(a,h){T.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a&&this.init(a,h)}p(Xe,T),Xe.prototype.init=function(a,h){const d=this.type=a.type,_=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement,this.g=h,h=a.relatedTarget,h||(d=="mouseover"?h=a.fromElement:d=="mouseout"&&(h=a.toElement)),this.relatedTarget=h,_?(this.clientX=_.clientX!==void 0?_.clientX:_.pageX,this.clientY=_.clientY!==void 0?_.clientY:_.pageY,this.screenX=_.screenX||0,this.screenY=_.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=a.pointerType,this.state=a.state,this.i=a,a.defaultPrevented&&Xe.Z.h.call(this)},Xe.prototype.h=function(){Xe.Z.h.call(this);const a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var Fn="closure_listenable_"+(Math.random()*1e6|0),ey=0;function ty(a,h,d,_,C){this.listener=a,this.proxy=null,this.src=h,this.type=d,this.capture=!!_,this.ha=C,this.key=++ey,this.da=this.fa=!1}function Ui(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Bi(a,h,d){for(const _ in a)h.call(d,a[_],_,a)}function ny(a,h){for(const d in a)h.call(void 0,a[d],d,a)}function th(a){const h={};for(const d in a)h[d]=a[d];return h}const nh="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function rh(a,h){let d,_;for(let C=1;C<arguments.length;C++){_=arguments[C];for(d in _)a[d]=_[d];for(let P=0;P<nh.length;P++)d=nh[P],Object.prototype.hasOwnProperty.call(_,d)&&(a[d]=_[d])}}function qi(a){this.src=a,this.g={},this.h=0}qi.prototype.add=function(a,h,d,_,C){const P=a.toString();a=this.g[P],a||(a=this.g[P]=[],this.h++);const D=Ga(a,h,_,C);return D>-1?(h=a[D],d||(h.fa=!1)):(h=new ty(h,this.src,P,!!_,C),h.fa=d,a.push(h)),h};function za(a,h){const d=h.type;if(d in a.g){var _=a.g[d],C=Array.prototype.indexOf.call(_,h,void 0),P;(P=C>=0)&&Array.prototype.splice.call(_,C,1),P&&(Ui(h),a.g[d].length==0&&(delete a.g[d],a.h--))}}function Ga(a,h,d,_){for(let C=0;C<a.length;++C){const P=a[C];if(!P.da&&P.listener==h&&P.capture==!!d&&P.ha==_)return C}return-1}var Ha="closure_lm_"+(Math.random()*1e6|0),Ka={};function sh(a,h,d,_,C){if(Array.isArray(h)){for(let P=0;P<h.length;P++)sh(a,h[P],d,_,C);return null}return d=ah(d),a&&a[Fn]?a.J(h,d,c(_)?!!_.capture:!1,C):ry(a,h,d,!1,_,C)}function ry(a,h,d,_,C,P){if(!h)throw Error("Invalid event type");const D=c(C)?!!C.capture:!!C;let G=Ya(a);if(G||(a[Ha]=G=new qi(a)),d=G.add(h,d,_,D,P),d.proxy)return d;if(_=sy(),d.proxy=_,_.src=a,_.listener=d,a.addEventListener)R||(C=D),C===void 0&&(C=!1),a.addEventListener(h.toString(),_,C);else if(a.attachEvent)a.attachEvent(oh(h.toString()),_);else if(a.addListener&&a.removeListener)a.addListener(_);else throw Error("addEventListener and attachEvent are unavailable.");return d}function sy(){function a(d){return h.call(a.src,a.listener,d)}const h=iy;return a}function ih(a,h,d,_,C){if(Array.isArray(h))for(var P=0;P<h.length;P++)ih(a,h[P],d,_,C);else _=c(_)?!!_.capture:!!_,d=ah(d),a&&a[Fn]?(a=a.i,P=String(h).toString(),P in a.g&&(h=a.g[P],d=Ga(h,d,_,C),d>-1&&(Ui(h[d]),Array.prototype.splice.call(h,d,1),h.length==0&&(delete a.g[P],a.h--)))):a&&(a=Ya(a))&&(h=a.g[h.toString()],a=-1,h&&(a=Ga(h,d,_,C)),(d=a>-1?h[a]:null)&&Qa(d))}function Qa(a){if(typeof a!="number"&&a&&!a.da){var h=a.src;if(h&&h[Fn])za(h.i,a);else{var d=a.type,_=a.proxy;h.removeEventListener?h.removeEventListener(d,_,a.capture):h.detachEvent?h.detachEvent(oh(d),_):h.addListener&&h.removeListener&&h.removeListener(_),(d=Ya(h))?(za(d,a),d.h==0&&(d.src=null,h[Ha]=null)):Ui(a)}}}function oh(a){return a in Ka?Ka[a]:Ka[a]="on"+a}function iy(a,h){if(a.da)a=!0;else{h=new Xe(h,this);const d=a.listener,_=a.ha||a.src;a.fa&&Qa(a),a=d.call(_,h)}return a}function Ya(a){return a=a[Ha],a instanceof qi?a:null}var Ja="__closure_events_fn_"+(Math.random()*1e9>>>0);function ah(a){return typeof a=="function"?a:(a[Ja]||(a[Ja]=function(h){return a.handleEvent(h)}),a[Ja])}function Be(){I.call(this),this.i=new qi(this),this.M=this,this.G=null}p(Be,I),Be.prototype[Fn]=!0,Be.prototype.removeEventListener=function(a,h,d,_){ih(this,a,h,d,_)};function Ge(a,h){var d,_=a.G;if(_)for(d=[];_;_=_.G)d.push(_);if(a=a.M,_=h.type||h,typeof h=="string")h=new T(h,a);else if(h instanceof T)h.target=h.target||a;else{var C=h;h=new T(_,a),rh(h,C)}C=!0;let P,D;if(d)for(D=d.length-1;D>=0;D--)P=h.g=d[D],C=$i(P,_,!0,h)&&C;if(P=h.g=a,C=$i(P,_,!0,h)&&C,C=$i(P,_,!1,h)&&C,d)for(D=0;D<d.length;D++)P=h.g=d[D],C=$i(P,_,!1,h)&&C}Be.prototype.N=function(){if(Be.Z.N.call(this),this.i){var a=this.i;for(const h in a.g){const d=a.g[h];for(let _=0;_<d.length;_++)Ui(d[_]);delete a.g[h],a.h--}}this.G=null},Be.prototype.J=function(a,h,d,_){return this.i.add(String(a),h,!1,d,_)},Be.prototype.K=function(a,h,d,_){return this.i.add(String(a),h,!0,d,_)};function $i(a,h,d,_){if(h=a.i.g[String(h)],!h)return!0;h=h.concat();let C=!0;for(let P=0;P<h.length;++P){const D=h[P];if(D&&!D.da&&D.capture==d){const G=D.listener,Ce=D.ha||D.src;D.fa&&za(a.i,D),C=G.call(Ce,_)!==!1&&C}}return C&&!_.defaultPrevented}function oy(a,h){if(typeof a!="function")if(a&&typeof a.handleEvent=="function")a=u(a.handleEvent,a);else throw Error("Invalid listener argument");return Number(h)>2147483647?-1:o.setTimeout(a,h||0)}function ch(a){a.g=oy(()=>{a.g=null,a.i&&(a.i=!1,ch(a))},a.l);const h=a.h;a.h=null,a.m.apply(null,h)}class ay extends I{constructor(h,d){super(),this.m=h,this.l=d,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:ch(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function cs(a){I.call(this),this.h=a,this.g={}}p(cs,I);var lh=[];function uh(a){Bi(a.g,function(h,d){this.g.hasOwnProperty(d)&&Qa(h)},a),a.g={}}cs.prototype.N=function(){cs.Z.N.call(this),uh(this)},cs.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Xa=o.JSON.stringify,cy=o.JSON.parse,ly=class{stringify(a){return o.JSON.stringify(a,void 0)}parse(a){return o.JSON.parse(a,void 0)}};function hh(){}function dh(){}var ls={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Za(){T.call(this,"d")}p(Za,T);function ec(){T.call(this,"c")}p(ec,T);var Un={},fh=null;function Wi(){return fh=fh||new Be}Un.Ia="serverreachability";function ph(a){T.call(this,Un.Ia,a)}p(ph,T);function us(a){const h=Wi();Ge(h,new ph(h))}Un.STAT_EVENT="statevent";function _h(a,h){T.call(this,Un.STAT_EVENT,a),this.stat=h}p(_h,T);function He(a){const h=Wi();Ge(h,new _h(h,a))}Un.Ja="timingevent";function mh(a,h){T.call(this,Un.Ja,a),this.size=h}p(mh,T);function hs(a,h){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){a()},h)}function ds(){this.g=!0}ds.prototype.ua=function(){this.g=!1};function uy(a,h,d,_,C,P){a.info(function(){if(a.g)if(P){var D="",G=P.split("&");for(let oe=0;oe<G.length;oe++){var Ce=G[oe].split("=");if(Ce.length>1){const be=Ce[0];Ce=Ce[1];const Ct=be.split("_");D=Ct.length>=2&&Ct[1]=="type"?D+(be+"="+Ce+"&"):D+(be+"=redacted&")}}}else D=null;else D=P;return"XMLHTTP REQ ("+_+") [attempt "+C+"]: "+h+`
`+d+`
`+D})}function hy(a,h,d,_,C,P,D){a.info(function(){return"XMLHTTP RESP ("+_+") [ attempt "+C+"]: "+h+`
`+d+`
`+P+" "+D})}function fr(a,h,d,_){a.info(function(){return"XMLHTTP TEXT ("+h+"): "+fy(a,d)+(_?" "+_:"")})}function dy(a,h){a.info(function(){return"TIMEOUT: "+h})}ds.prototype.info=function(){};function fy(a,h){if(!a.g)return h;if(!h)return null;try{const P=JSON.parse(h);if(P){for(a=0;a<P.length;a++)if(Array.isArray(P[a])){var d=P[a];if(!(d.length<2)){var _=d[1];if(Array.isArray(_)&&!(_.length<1)){var C=_[0];if(C!="noop"&&C!="stop"&&C!="close")for(let D=1;D<_.length;D++)_[D]=""}}}}return Xa(P)}catch{return h}}var ji={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},gh={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},yh;function tc(){}p(tc,hh),tc.prototype.g=function(){return new XMLHttpRequest},yh=new tc;function fs(a){return encodeURIComponent(String(a))}function py(a){var h=1;a=a.split(":");const d=[];for(;h>0&&a.length;)d.push(a.shift()),h--;return a.length&&d.push(a.join(":")),d}function tn(a,h,d,_){this.j=a,this.i=h,this.l=d,this.S=_||1,this.V=new cs(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Eh}function Eh(){this.i=null,this.g="",this.h=!1}var vh={},nc={};function rc(a,h,d){a.M=1,a.A=Gi(At(h)),a.u=d,a.R=!0,Th(a,null)}function Th(a,h){a.F=Date.now(),zi(a),a.B=At(a.A);var d=a.B,_=a.S;Array.isArray(_)||(_=[String(_)]),Dh(d.i,"t",_),a.C=0,d=a.j.L,a.h=new Eh,a.g=Xh(a.j,d?h:null,!a.u),a.P>0&&(a.O=new ay(u(a.Y,a,a.g),a.P)),h=a.V,d=a.g,_=a.ba;var C="readystatechange";Array.isArray(C)||(C&&(lh[0]=C.toString()),C=lh);for(let P=0;P<C.length;P++){const D=sh(d,C[P],_||h.handleEvent,!1,h.h||h);if(!D)break;h.g[D.key]=D}h=a.J?th(a.J):{},a.u?(a.v||(a.v="POST"),h["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.B,a.v,a.u,h)):(a.v="GET",a.g.ea(a.B,a.v,null,h)),us(),uy(a.i,a.v,a.B,a.l,a.S,a.u)}tn.prototype.ba=function(a){a=a.target;const h=this.O;h&&sn(a)==3?h.j():this.Y(a)},tn.prototype.Y=function(a){try{if(a==this.g)e:{const G=sn(this.g),Ce=this.g.ya(),oe=this.g.ca();if(!(G<3)&&(G!=3||this.g&&(this.h.h||this.g.la()||qh(this.g)))){this.K||G!=4||Ce==7||(Ce==8||oe<=0?us(3):us(2)),sc(this);var h=this.g.ca();this.X=h;var d=_y(this);if(this.o=h==200,hy(this.i,this.v,this.B,this.l,this.S,G,h),this.o){if(this.U&&!this.L){t:{if(this.g){var _,C=this.g;if((_=C.g?C.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!y(_)){var P=_;break t}}P=null}if(a=P)fr(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,ic(this,a);else{this.o=!1,this.m=3,He(12),Bn(this),ps(this);break e}}if(this.R){a=!0;let be;for(;!this.K&&this.C<d.length;)if(be=my(this,d),be==nc){G==4&&(this.m=4,He(14),a=!1),fr(this.i,this.l,null,"[Incomplete Response]");break}else if(be==vh){this.m=4,He(15),fr(this.i,this.l,d,"[Invalid Chunk]"),a=!1;break}else fr(this.i,this.l,be,null),ic(this,be);if(wh(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),G!=4||d.length!=0||this.h.h||(this.m=1,He(16),a=!1),this.o=this.o&&a,!a)fr(this.i,this.l,d,"[Invalid Chunked Response]"),Bn(this),ps(this);else if(d.length>0&&!this.W){this.W=!0;var D=this.j;D.g==this&&D.aa&&!D.P&&(D.j.info("Great, no buffering proxy detected. Bytes received: "+d.length),fc(D),D.P=!0,He(11))}}else fr(this.i,this.l,d,null),ic(this,d);G==4&&Bn(this),this.o&&!this.K&&(G==4?Kh(this.j,this):(this.o=!1,zi(this)))}else Ny(this.g),h==400&&d.indexOf("Unknown SID")>0?(this.m=3,He(12)):(this.m=0,He(13)),Bn(this),ps(this)}}}catch{}finally{}};function _y(a){if(!wh(a))return a.g.la();const h=qh(a.g);if(h==="")return"";let d="";const _=h.length,C=sn(a.g)==4;if(!a.h.i){if(typeof TextDecoder>"u")return Bn(a),ps(a),"";a.h.i=new o.TextDecoder}for(let P=0;P<_;P++)a.h.h=!0,d+=a.h.i.decode(h[P],{stream:!(C&&P==_-1)});return h.length=0,a.h.g+=d,a.C=0,a.h.g}function wh(a){return a.g?a.v=="GET"&&a.M!=2&&a.j.Aa:!1}function my(a,h){var d=a.C,_=h.indexOf(`
`,d);return _==-1?nc:(d=Number(h.substring(d,_)),isNaN(d)?vh:(_+=1,_+d>h.length?nc:(h=h.slice(_,_+d),a.C=_+d,h)))}tn.prototype.cancel=function(){this.K=!0,Bn(this)};function zi(a){a.T=Date.now()+a.H,Ih(a,a.H)}function Ih(a,h){if(a.D!=null)throw Error("WatchDog timer not null");a.D=hs(u(a.aa,a),h)}function sc(a){a.D&&(o.clearTimeout(a.D),a.D=null)}tn.prototype.aa=function(){this.D=null;const a=Date.now();a-this.T>=0?(dy(this.i,this.B),this.M!=2&&(us(),He(17)),Bn(this),this.m=2,ps(this)):Ih(this,this.T-a)};function ps(a){a.j.I==0||a.K||Kh(a.j,a)}function Bn(a){sc(a);var h=a.O;h&&typeof h.dispose=="function"&&h.dispose(),a.O=null,uh(a.V),a.g&&(h=a.g,a.g=null,h.abort(),h.dispose())}function ic(a,h){try{var d=a.j;if(d.I!=0&&(d.g==a||oc(d.h,a))){if(!a.L&&oc(d.h,a)&&d.I==3){try{var _=d.Ba.g.parse(h)}catch{_=null}if(Array.isArray(_)&&_.length==3){var C=_;if(C[0]==0){e:if(!d.v){if(d.g)if(d.g.F+3e3<a.F)Ji(d),Qi(d);else break e;dc(d),He(18)}}else d.xa=C[1],0<d.xa-d.K&&C[2]<37500&&d.F&&d.A==0&&!d.C&&(d.C=hs(u(d.Va,d),6e3));Rh(d.h)<=1&&d.ta&&(d.ta=void 0)}else $n(d,11)}else if((a.L||d.g==a)&&Ji(d),!y(h))for(C=d.Ba.g.parse(h),h=0;h<C.length;h++){let oe=C[h];const be=oe[0];if(!(be<=d.K))if(d.K=be,oe=oe[1],d.I==2)if(oe[0]=="c"){d.M=oe[1],d.ba=oe[2];const Ct=oe[3];Ct!=null&&(d.ka=Ct,d.j.info("VER="+d.ka));const Wn=oe[4];Wn!=null&&(d.za=Wn,d.j.info("SVER="+d.za));const on=oe[5];on!=null&&typeof on=="number"&&on>0&&(_=1.5*on,d.O=_,d.j.info("backChannelRequestTimeoutMs_="+_)),_=d;const an=a.g;if(an){const Zi=an.g?an.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Zi){var P=_.h;P.g||Zi.indexOf("spdy")==-1&&Zi.indexOf("quic")==-1&&Zi.indexOf("h2")==-1||(P.j=P.l,P.g=new Set,P.h&&(ac(P,P.h),P.h=null))}if(_.G){const pc=an.g?an.g.getResponseHeader("X-HTTP-Session-Id"):null;pc&&(_.wa=pc,le(_.J,_.G,pc))}}d.I=3,d.l&&d.l.ra(),d.aa&&(d.T=Date.now()-a.F,d.j.info("Handshake RTT: "+d.T+"ms")),_=d;var D=a;if(_.na=Jh(_,_.L?_.ba:null,_.W),D.L){Sh(_.h,D);var G=D,Ce=_.O;Ce&&(G.H=Ce),G.D&&(sc(G),zi(G)),_.g=D}else Gh(_);d.i.length>0&&Yi(d)}else oe[0]!="stop"&&oe[0]!="close"||$n(d,7);else d.I==3&&(oe[0]=="stop"||oe[0]=="close"?oe[0]=="stop"?$n(d,7):hc(d):oe[0]!="noop"&&d.l&&d.l.qa(oe),d.A=0)}}us(4)}catch{}}var gy=class{constructor(a,h){this.g=a,this.map=h}};function Ah(a){this.l=a||10,o.PerformanceNavigationTiming?(a=o.performance.getEntriesByType("navigation"),a=a.length>0&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Ch(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Rh(a){return a.h?1:a.g?a.g.size:0}function oc(a,h){return a.h?a.h==h:a.g?a.g.has(h):!1}function ac(a,h){a.g?a.g.add(h):a.h=h}function Sh(a,h){a.h&&a.h==h?a.h=null:a.g&&a.g.has(h)&&a.g.delete(h)}Ah.prototype.cancel=function(){if(this.i=Ph(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Ph(a){if(a.h!=null)return a.i.concat(a.h.G);if(a.g!=null&&a.g.size!==0){let h=a.i;for(const d of a.g.values())h=h.concat(d.G);return h}return A(a.i)}var bh=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function yy(a,h){if(a){a=a.split("&");for(let d=0;d<a.length;d++){const _=a[d].indexOf("=");let C,P=null;_>=0?(C=a[d].substring(0,_),P=a[d].substring(_+1)):C=a[d],h(C,P?decodeURIComponent(P.replace(/\+/g," ")):"")}}}function nn(a){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let h;a instanceof nn?(this.l=a.l,_s(this,a.j),this.o=a.o,this.g=a.g,ms(this,a.u),this.h=a.h,cc(this,Oh(a.i)),this.m=a.m):a&&(h=String(a).match(bh))?(this.l=!1,_s(this,h[1]||"",!0),this.o=gs(h[2]||""),this.g=gs(h[3]||"",!0),ms(this,h[4]),this.h=gs(h[5]||"",!0),cc(this,h[6]||"",!0),this.m=gs(h[7]||"")):(this.l=!1,this.i=new Es(null,this.l))}nn.prototype.toString=function(){const a=[];var h=this.j;h&&a.push(ys(h,Nh,!0),":");var d=this.g;return(d||h=="file")&&(a.push("//"),(h=this.o)&&a.push(ys(h,Nh,!0),"@"),a.push(fs(d).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.u,d!=null&&a.push(":",String(d))),(d=this.h)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(ys(d,d.charAt(0)=="/"?Ty:vy,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",ys(d,Iy)),a.join("")},nn.prototype.resolve=function(a){const h=At(this);let d=!!a.j;d?_s(h,a.j):d=!!a.o,d?h.o=a.o:d=!!a.g,d?h.g=a.g:d=a.u!=null;var _=a.h;if(d)ms(h,a.u);else if(d=!!a.h){if(_.charAt(0)!="/")if(this.g&&!this.h)_="/"+_;else{var C=h.h.lastIndexOf("/");C!=-1&&(_=h.h.slice(0,C+1)+_)}if(C=_,C==".."||C==".")_="";else if(C.indexOf("./")!=-1||C.indexOf("/.")!=-1){_=C.lastIndexOf("/",0)==0,C=C.split("/");const P=[];for(let D=0;D<C.length;){const G=C[D++];G=="."?_&&D==C.length&&P.push(""):G==".."?((P.length>1||P.length==1&&P[0]!="")&&P.pop(),_&&D==C.length&&P.push("")):(P.push(G),_=!0)}_=P.join("/")}else _=C}return d?h.h=_:d=a.i.toString()!=="",d?cc(h,Oh(a.i)):d=!!a.m,d&&(h.m=a.m),h};function At(a){return new nn(a)}function _s(a,h,d){a.j=d?gs(h,!0):h,a.j&&(a.j=a.j.replace(/:$/,""))}function ms(a,h){if(h){if(h=Number(h),isNaN(h)||h<0)throw Error("Bad port number "+h);a.u=h}else a.u=null}function cc(a,h,d){h instanceof Es?(a.i=h,Ay(a.i,a.l)):(d||(h=ys(h,wy)),a.i=new Es(h,a.l))}function le(a,h,d){a.i.set(h,d)}function Gi(a){return le(a,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),a}function gs(a,h){return a?h?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function ys(a,h,d){return typeof a=="string"?(a=encodeURI(a).replace(h,Ey),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function Ey(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Nh=/[#\/\?@]/g,vy=/[#\?:]/g,Ty=/[#\?]/g,wy=/[#\?@]/g,Iy=/#/g;function Es(a,h){this.h=this.g=null,this.i=a||null,this.j=!!h}function qn(a){a.g||(a.g=new Map,a.h=0,a.i&&yy(a.i,function(h,d){a.add(decodeURIComponent(h.replace(/\+/g," ")),d)}))}n=Es.prototype,n.add=function(a,h){qn(this),this.i=null,a=pr(this,a);let d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(h),this.h+=1,this};function kh(a,h){qn(a),h=pr(a,h),a.g.has(h)&&(a.i=null,a.h-=a.g.get(h).length,a.g.delete(h))}function Vh(a,h){return qn(a),h=pr(a,h),a.g.has(h)}n.forEach=function(a,h){qn(this),this.g.forEach(function(d,_){d.forEach(function(C){a.call(h,C,_,this)},this)},this)};function xh(a,h){qn(a);let d=[];if(typeof h=="string")Vh(a,h)&&(d=d.concat(a.g.get(pr(a,h))));else for(a=Array.from(a.g.values()),h=0;h<a.length;h++)d=d.concat(a[h]);return d}n.set=function(a,h){return qn(this),this.i=null,a=pr(this,a),Vh(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[h]),this.h+=1,this},n.get=function(a,h){return a?(a=xh(this,a),a.length>0?String(a[0]):h):h};function Dh(a,h,d){kh(a,h),d.length>0&&(a.i=null,a.g.set(pr(a,h),A(d)),a.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],h=Array.from(this.g.keys());for(let _=0;_<h.length;_++){var d=h[_];const C=fs(d);d=xh(this,d);for(let P=0;P<d.length;P++){let D=C;d[P]!==""&&(D+="="+fs(d[P])),a.push(D)}}return this.i=a.join("&")};function Oh(a){const h=new Es;return h.i=a.i,a.g&&(h.g=new Map(a.g),h.h=a.h),h}function pr(a,h){return h=String(h),a.j&&(h=h.toLowerCase()),h}function Ay(a,h){h&&!a.j&&(qn(a),a.i=null,a.g.forEach(function(d,_){const C=_.toLowerCase();_!=C&&(kh(this,_),Dh(this,C,d))},a)),a.j=h}function Cy(a,h){const d=new ds;if(o.Image){const _=new Image;_.onload=f(rn,d,"TestLoadImage: loaded",!0,h,_),_.onerror=f(rn,d,"TestLoadImage: error",!1,h,_),_.onabort=f(rn,d,"TestLoadImage: abort",!1,h,_),_.ontimeout=f(rn,d,"TestLoadImage: timeout",!1,h,_),o.setTimeout(function(){_.ontimeout&&_.ontimeout()},1e4),_.src=a}else h(!1)}function Ry(a,h){const d=new ds,_=new AbortController,C=setTimeout(()=>{_.abort(),rn(d,"TestPingServer: timeout",!1,h)},1e4);fetch(a,{signal:_.signal}).then(P=>{clearTimeout(C),P.ok?rn(d,"TestPingServer: ok",!0,h):rn(d,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(C),rn(d,"TestPingServer: error",!1,h)})}function rn(a,h,d,_,C){try{C&&(C.onload=null,C.onerror=null,C.onabort=null,C.ontimeout=null),_(d)}catch{}}function Sy(){this.g=new ly}function lc(a){this.i=a.Sb||null,this.h=a.ab||!1}p(lc,hh),lc.prototype.g=function(){return new Hi(this.i,this.h)};function Hi(a,h){Be.call(this),this.H=a,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}p(Hi,Be),n=Hi.prototype,n.open=function(a,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=a,this.D=h,this.readyState=1,Ts(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const h={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};a&&(h.body=a),(this.H||o).fetch(new Request(this.D,h)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,vs(this)),this.readyState=0},n.Pa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Ts(this)),this.g&&(this.readyState=3,Ts(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Lh(this)}else a.text().then(this.Oa.bind(this),this.ga.bind(this))};function Lh(a){a.j.read().then(a.Ma.bind(a)).catch(a.ga.bind(a))}n.Ma=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var h=a.value?a.value:new Uint8Array(0);(h=this.B.decode(h,{stream:!a.done}))&&(this.response=this.responseText+=h)}a.done?vs(this):Ts(this),this.readyState==3&&Lh(this)}},n.Oa=function(a){this.g&&(this.response=this.responseText=a,vs(this))},n.Na=function(a){this.g&&(this.response=a,vs(this))},n.ga=function(){this.g&&vs(this)};function vs(a){a.readyState=4,a.l=null,a.j=null,a.B=null,Ts(a)}n.setRequestHeader=function(a,h){this.A.append(a,h)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],h=this.h.entries();for(var d=h.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=h.next();return a.join(`\r
`)};function Ts(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Hi.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Mh(a){let h="";return Bi(a,function(d,_){h+=_,h+=":",h+=d,h+=`\r
`}),h}function uc(a,h,d){e:{for(_ in d){var _=!1;break e}_=!0}_||(d=Mh(d),typeof a=="string"?d!=null&&fs(d):le(a,h,d))}function pe(a){Be.call(this),this.headers=new Map,this.L=a||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}p(pe,Be);var Py=/^https?$/i,by=["POST","PUT"];n=pe.prototype,n.Fa=function(a){this.H=a},n.ea=function(a,h,d,_){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);h=h?h.toUpperCase():"GET",this.D=a,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():yh.g(),this.g.onreadystatechange=m(u(this.Ca,this));try{this.B=!0,this.g.open(h,String(a),!0),this.B=!1}catch(P){Fh(this,P);return}if(a=d||"",d=new Map(this.headers),_)if(Object.getPrototypeOf(_)===Object.prototype)for(var C in _)d.set(C,_[C]);else if(typeof _.keys=="function"&&typeof _.get=="function")for(const P of _.keys())d.set(P,_.get(P));else throw Error("Unknown input type for opt_headers: "+String(_));_=Array.from(d.keys()).find(P=>P.toLowerCase()=="content-type"),C=o.FormData&&a instanceof o.FormData,!(Array.prototype.indexOf.call(by,h,void 0)>=0)||_||C||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[P,D]of d)this.g.setRequestHeader(P,D);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(a),this.v=!1}catch(P){Fh(this,P)}};function Fh(a,h){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=h,a.o=5,Uh(a),Ki(a)}function Uh(a){a.A||(a.A=!0,Ge(a,"complete"),Ge(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=a||7,Ge(this,"complete"),Ge(this,"abort"),Ki(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ki(this,!0)),pe.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?Bh(this):this.Xa())},n.Xa=function(){Bh(this)};function Bh(a){if(a.h&&typeof i<"u"){if(a.v&&sn(a)==4)setTimeout(a.Ca.bind(a),0);else if(Ge(a,"readystatechange"),sn(a)==4){a.h=!1;try{const P=a.ca();e:switch(P){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var d;if(!(d=h)){var _;if(_=P===0){let D=String(a.D).match(bh)[1]||null;!D&&o.self&&o.self.location&&(D=o.self.location.protocol.slice(0,-1)),_=!Py.test(D?D.toLowerCase():"")}d=_}if(d)Ge(a,"complete"),Ge(a,"success");else{a.o=6;try{var C=sn(a)>2?a.g.statusText:""}catch{C=""}a.l=C+" ["+a.ca()+"]",Uh(a)}}finally{Ki(a)}}}}function Ki(a,h){if(a.g){a.m&&(clearTimeout(a.m),a.m=null);const d=a.g;a.g=null,h||Ge(a,"ready");try{d.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function sn(a){return a.g?a.g.readyState:0}n.ca=function(){try{return sn(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(a){if(this.g){var h=this.g.responseText;return a&&h.indexOf(a)==0&&(h=h.substring(a.length)),cy(h)}};function qh(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.F){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function Ny(a){const h={};a=(a.g&&sn(a)>=2&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let _=0;_<a.length;_++){if(y(a[_]))continue;var d=py(a[_]);const C=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const P=h[C]||[];h[C]=P,P.push(d)}ny(h,function(_){return _.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function ws(a,h,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||h}function $h(a){this.za=0,this.i=[],this.j=new ds,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=ws("failFast",!1,a),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=ws("baseRetryDelayMs",5e3,a),this.Za=ws("retryDelaySeedMs",1e4,a),this.Ta=ws("forwardChannelMaxRetries",2,a),this.va=ws("forwardChannelRequestTimeoutMs",2e4,a),this.ma=a&&a.xmlHttpFactory||void 0,this.Ua=a&&a.Rb||void 0,this.Aa=a&&a.useFetchStreams||!1,this.O=void 0,this.L=a&&a.supportsCrossDomainXhr||!1,this.M="",this.h=new Ah(a&&a.concurrentRequestLimit),this.Ba=new Sy,this.S=a&&a.fastHandshake||!1,this.R=a&&a.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=a&&a.Pb||!1,a&&a.ua&&this.j.ua(),a&&a.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&a&&a.detectBufferingProxy||!1,this.ia=void 0,a&&a.longPollingTimeout&&a.longPollingTimeout>0&&(this.ia=a.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=$h.prototype,n.ka=8,n.I=1,n.connect=function(a,h,d,_){He(0),this.W=a,this.H=h||{},d&&_!==void 0&&(this.H.OSID=d,this.H.OAID=_),this.F=this.X,this.J=Jh(this,null,this.W),Yi(this)};function hc(a){if(Wh(a),a.I==3){var h=a.V++,d=At(a.J);if(le(d,"SID",a.M),le(d,"RID",h),le(d,"TYPE","terminate"),Is(a,d),h=new tn(a,a.j,h),h.M=2,h.A=Gi(At(d)),d=!1,o.navigator&&o.navigator.sendBeacon)try{d=o.navigator.sendBeacon(h.A.toString(),"")}catch{}!d&&o.Image&&(new Image().src=h.A,d=!0),d||(h.g=Xh(h.j,null),h.g.ea(h.A)),h.F=Date.now(),zi(h)}Yh(a)}function Qi(a){a.g&&(fc(a),a.g.cancel(),a.g=null)}function Wh(a){Qi(a),a.v&&(o.clearTimeout(a.v),a.v=null),Ji(a),a.h.cancel(),a.m&&(typeof a.m=="number"&&o.clearTimeout(a.m),a.m=null)}function Yi(a){if(!Ch(a.h)&&!a.m){a.m=!0;var h=a.Ea;Fe||g(),Ue||(Fe(),Ue=!0),w.add(h,a),a.D=0}}function ky(a,h){return Rh(a.h)>=a.h.j-(a.m?1:0)?!1:a.m?(a.i=h.G.concat(a.i),!0):a.I==1||a.I==2||a.D>=(a.Sa?0:a.Ta)?!1:(a.m=hs(u(a.Ea,a,h),Qh(a,a.D)),a.D++,!0)}n.Ea=function(a){if(this.m)if(this.m=null,this.I==1){if(!a){this.V=Math.floor(Math.random()*1e5),a=this.V++;const C=new tn(this,this.j,a);let P=this.o;if(this.U&&(P?(P=th(P),rh(P,this.U)):P=this.U),this.u!==null||this.R||(C.J=P,P=null),this.S)e:{for(var h=0,d=0;d<this.i.length;d++){t:{var _=this.i[d];if("__data__"in _.map&&(_=_.map.__data__,typeof _=="string")){_=_.length;break t}_=void 0}if(_===void 0)break;if(h+=_,h>4096){h=d;break e}if(h===4096||d===this.i.length-1){h=d+1;break e}}h=1e3}else h=1e3;h=zh(this,C,h),d=At(this.J),le(d,"RID",a),le(d,"CVER",22),this.G&&le(d,"X-HTTP-Session-Id",this.G),Is(this,d),P&&(this.R?h="headers="+fs(Mh(P))+"&"+h:this.u&&uc(d,this.u,P)),ac(this.h,C),this.Ra&&le(d,"TYPE","init"),this.S?(le(d,"$req",h),le(d,"SID","null"),C.U=!0,rc(C,d,null)):rc(C,d,h),this.I=2}}else this.I==3&&(a?jh(this,a):this.i.length==0||Ch(this.h)||jh(this))};function jh(a,h){var d;h?d=h.l:d=a.V++;const _=At(a.J);le(_,"SID",a.M),le(_,"RID",d),le(_,"AID",a.K),Is(a,_),a.u&&a.o&&uc(_,a.u,a.o),d=new tn(a,a.j,d,a.D+1),a.u===null&&(d.J=a.o),h&&(a.i=h.G.concat(a.i)),h=zh(a,d,1e3),d.H=Math.round(a.va*.5)+Math.round(a.va*.5*Math.random()),ac(a.h,d),rc(d,_,h)}function Is(a,h){a.H&&Bi(a.H,function(d,_){le(h,_,d)}),a.l&&Bi({},function(d,_){le(h,_,d)})}function zh(a,h,d){d=Math.min(a.i.length,d);const _=a.l?u(a.l.Ka,a.l,a):null;e:{var C=a.i;let G=-1;for(;;){const Ce=["count="+d];G==-1?d>0?(G=C[0].g,Ce.push("ofs="+G)):G=0:Ce.push("ofs="+G);let oe=!0;for(let be=0;be<d;be++){var P=C[be].g;const Ct=C[be].map;if(P-=G,P<0)G=Math.max(0,C[be].g-100),oe=!1;else try{P="req"+P+"_"||"";try{var D=Ct instanceof Map?Ct:Object.entries(Ct);for(const[Wn,on]of D){let an=on;c(on)&&(an=Xa(on)),Ce.push(P+Wn+"="+encodeURIComponent(an))}}catch(Wn){throw Ce.push(P+"type="+encodeURIComponent("_badmap")),Wn}}catch{_&&_(Ct)}}if(oe){D=Ce.join("&");break e}}D=void 0}return a=a.i.splice(0,d),h.G=a,D}function Gh(a){if(!a.g&&!a.v){a.Y=1;var h=a.Da;Fe||g(),Ue||(Fe(),Ue=!0),w.add(h,a),a.A=0}}function dc(a){return a.g||a.v||a.A>=3?!1:(a.Y++,a.v=hs(u(a.Da,a),Qh(a,a.A)),a.A++,!0)}n.Da=function(){if(this.v=null,Hh(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var a=4*this.T;this.j.info("BP detection timer enabled: "+a),this.B=hs(u(this.Wa,this),a)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,He(10),Qi(this),Hh(this))};function fc(a){a.B!=null&&(o.clearTimeout(a.B),a.B=null)}function Hh(a){a.g=new tn(a,a.j,"rpc",a.Y),a.u===null&&(a.g.J=a.o),a.g.P=0;var h=At(a.na);le(h,"RID","rpc"),le(h,"SID",a.M),le(h,"AID",a.K),le(h,"CI",a.F?"0":"1"),!a.F&&a.ia&&le(h,"TO",a.ia),le(h,"TYPE","xmlhttp"),Is(a,h),a.u&&a.o&&uc(h,a.u,a.o),a.O&&(a.g.H=a.O);var d=a.g;a=a.ba,d.M=1,d.A=Gi(At(h)),d.u=null,d.R=!0,Th(d,a)}n.Va=function(){this.C!=null&&(this.C=null,Qi(this),dc(this),He(19))};function Ji(a){a.C!=null&&(o.clearTimeout(a.C),a.C=null)}function Kh(a,h){var d=null;if(a.g==h){Ji(a),fc(a),a.g=null;var _=2}else if(oc(a.h,h))d=h.G,Sh(a.h,h),_=1;else return;if(a.I!=0){if(h.o)if(_==1){d=h.u?h.u.length:0,h=Date.now()-h.F;var C=a.D;_=Wi(),Ge(_,new mh(_,d)),Yi(a)}else Gh(a);else if(C=h.m,C==3||C==0&&h.X>0||!(_==1&&ky(a,h)||_==2&&dc(a)))switch(d&&d.length>0&&(h=a.h,h.i=h.i.concat(d)),C){case 1:$n(a,5);break;case 4:$n(a,10);break;case 3:$n(a,6);break;default:$n(a,2)}}}function Qh(a,h){let d=a.Qa+Math.floor(Math.random()*a.Za);return a.isActive()||(d*=2),d*h}function $n(a,h){if(a.j.info("Error code "+h),h==2){var d=u(a.bb,a),_=a.Ua;const C=!_;_=new nn(_||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||_s(_,"https"),Gi(_),C?Cy(_.toString(),d):Ry(_.toString(),d)}else He(2);a.I=0,a.l&&a.l.pa(h),Yh(a),Wh(a)}n.bb=function(a){a?(this.j.info("Successfully pinged google.com"),He(2)):(this.j.info("Failed to ping google.com"),He(1))};function Yh(a){if(a.I=0,a.ja=[],a.l){const h=Ph(a.h);(h.length!=0||a.i.length!=0)&&(S(a.ja,h),S(a.ja,a.i),a.h.i.length=0,A(a.i),a.i.length=0),a.l.oa()}}function Jh(a,h,d){var _=d instanceof nn?At(d):new nn(d);if(_.g!="")h&&(_.g=h+"."+_.g),ms(_,_.u);else{var C=o.location;_=C.protocol,h=h?h+"."+C.hostname:C.hostname,C=+C.port;const P=new nn(null);_&&_s(P,_),h&&(P.g=h),C&&ms(P,C),d&&(P.h=d),_=P}return d=a.G,h=a.wa,d&&h&&le(_,d,h),le(_,"VER",a.ka),Is(a,_),_}function Xh(a,h,d){if(h&&!a.L)throw Error("Can't create secondary domain capable XhrIo object.");return h=a.Aa&&!a.ma?new pe(new lc({ab:d})):new pe(a.ma),h.Fa(a.L),h}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Zh(){}n=Zh.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function Xi(){}Xi.prototype.g=function(a,h){return new it(a,h)};function it(a,h){Be.call(this),this.g=new $h(h),this.l=a,this.h=h&&h.messageUrlParams||null,a=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(a?a["X-WebChannel-Content-Type"]=h.messageContentType:a={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.sa&&(a?a["X-WebChannel-Client-Profile"]=h.sa:a={"X-WebChannel-Client-Profile":h.sa}),this.g.U=a,(a=h&&h.Qb)&&!y(a)&&(this.g.u=a),this.A=h&&h.supportsCrossDomainXhr||!1,this.v=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!y(h)&&(this.g.G=h,a=this.h,a!==null&&h in a&&(a=this.h,h in a&&delete a[h])),this.j=new _r(this)}p(it,Be),it.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},it.prototype.close=function(){hc(this.g)},it.prototype.o=function(a){var h=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.v&&(d={},d.__data__=Xa(a),a=d);h.i.push(new gy(h.Ya++,a)),h.I==3&&Yi(h)},it.prototype.N=function(){this.g.l=null,delete this.j,hc(this.g),delete this.g,it.Z.N.call(this)};function ed(a){Za.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var h=a.__sm__;if(h){e:{for(const d in h){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,h=h!==null&&a in h?h[a]:void 0),this.data=h}else this.data=a}p(ed,Za);function td(){ec.call(this),this.status=1}p(td,ec);function _r(a){this.g=a}p(_r,Zh),_r.prototype.ra=function(){Ge(this.g,"a")},_r.prototype.qa=function(a){Ge(this.g,new ed(a))},_r.prototype.pa=function(a){Ge(this.g,new td)},_r.prototype.oa=function(){Ge(this.g,"b")},Xi.prototype.createWebChannel=Xi.prototype.g,it.prototype.send=it.prototype.o,it.prototype.open=it.prototype.m,it.prototype.close=it.prototype.close,ym=function(){return new Xi},gm=function(){return Wi()},mm=Un,tl={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},ji.NO_ERROR=0,ji.TIMEOUT=8,ji.HTTP_ERROR=6,mo=ji,gh.COMPLETE="complete",_m=gh,dh.EventType=ls,ls.OPEN="a",ls.CLOSE="b",ls.ERROR="c",ls.MESSAGE="d",Be.prototype.listen=Be.prototype.J,xs=dh,pe.prototype.listenOnce=pe.prototype.K,pe.prototype.getLastError=pe.prototype.Ha,pe.prototype.getLastErrorCode=pe.prototype.ya,pe.prototype.getStatus=pe.prototype.ca,pe.prototype.getResponseJson=pe.prototype.La,pe.prototype.getResponseText=pe.prototype.la,pe.prototype.send=pe.prototype.ea,pe.prototype.setWithCredentials=pe.prototype.Fa,pm=pe}).apply(typeof ro<"u"?ro:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $e{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}$e.UNAUTHENTICATED=new $e(null),$e.GOOGLE_CREDENTIALS=new $e("google-credentials-uid"),$e.FIRST_PARTY=new $e("first-party-uid"),$e.MOCK_USER=new $e("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Zr="12.15.0";function bC(n){Zr=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ir=new ca("@firebase/firestore");function gr(){return ir.logLevel}function M(n,...e){if(ir.logLevel<=Y.DEBUG){const t=e.map(_u);ir.debug(`Firestore (${Zr}): ${n}`,...t)}}function Kt(n,...e){if(ir.logLevel<=Y.ERROR){const t=e.map(_u);ir.error(`Firestore (${Zr}): ${n}`,...t)}}function wt(n,...e){if(ir.logLevel<=Y.WARN){const t=e.map(_u);ir.warn(`Firestore (${Zr}): ${n}`,...t)}}function _u(n){if(typeof n=="string")return n;try{return(function(t){return JSON.stringify(t)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,Em(n,r,t)}function Em(n,e,t){let r=`FIRESTORE (${Zr}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw Kt(r),new Error(r)}function B(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||Em(e,s,r)}function te(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const k={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class L extends Jt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tn{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vm{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class NC{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t($e.UNAUTHENTICATED)))}shutdown(){}}class kC{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class VC{constructor(e){this.t=e,this.currentUser=$e.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){B(this.o===void 0,42304);let r=this.i;const s=l=>this.i!==r?(r=this.i,t(l)):Promise.resolve();let i=new Tn;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Tn,e.enqueueRetryable((()=>s(this.currentUser)))};const o=()=>{const l=i;e.enqueueRetryable((async()=>{await l.promise,await s(this.currentUser)}))},c=l=>{M("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit((l=>c(l))),setTimeout((()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?c(l):(M("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Tn)}}),0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((r=>this.i!==e?(M("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(B(typeof r.accessToken=="string",31837,{l:r}),new vm(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return B(e===null||typeof e=="string",2055,{h:e}),new $e(e)}}class xC{constructor(e,t,r){this.T=e,this.P=t,this.R=r,this.type="FirstParty",this.user=$e.FIRST_PARTY,this.I=new Map}A(){return this.R?this.R():null}get headers(){this.I.set("X-Goog-AuthUser",this.T);const e=this.A();return e&&this.I.set("Authorization",e),this.P&&this.I.set("X-Goog-Iam-Authorization-Token",this.P),this.I}}class DC{constructor(e,t,r){this.T=e,this.P=t,this.R=r}getToken(){return Promise.resolve(new xC(this.T,this.P,this.R))}start(e,t){e.enqueueRetryable((()=>t($e.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class hf{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class OC{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,et(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){B(this.o===void 0,3512);const r=i=>{i.error!=null&&M("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.m;return this.m=i.token,M("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable((()=>r(i)))};const s=i=>{M("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):M("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new hf(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(B(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new hf(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function LC(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mu{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=LC(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function X(n,e){return n<e?-1:n>e?1:0}function nl(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const s=n.charAt(r),i=e.charAt(r);if(s!==i)return Rc(s)===Rc(i)?X(s,i):Rc(s)?1:-1}return X(n.length,e.length)}const MC=55296,FC=57343;function Rc(n){const e=n.charCodeAt(0);return e>=MC&&e<=FC}function Ur(n,e,t){return n.length===e.length&&n.every(((r,s)=>t(r,e[s])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pt="__name__";class Rt{constructor(e,t,r){t===void 0?t=0:t>e.length&&$(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&$(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return Rt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Rt?e.forEach((r=>{t.push(r)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=Rt.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return X(e.length,t.length)}static compareSegments(e,t){const r=Rt.isNumericId(e),s=Rt.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?Rt.extractNumericId(e).compare(Rt.extractNumericId(t)):nl(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return vn.fromString(e.substring(4,e.length-2))}}class re extends Rt{construct(e,t,r){return new re(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toStringWithLeadingSlash(){return`/${this.canonicalString()}`}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new L(k.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter((s=>s.length>0)))}return new re(t)}static emptyPath(){return new re([])}}const UC=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ve extends Rt{construct(e,t,r){return new Ve(e,t,r)}static isValidIdentifier(e){return UC.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ve.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Pt}static keyField(){return new Ve([Pt])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new L(k.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new L(k.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[s+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new L(k.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,s+=2}else c==="`"?(o=!o,s++):c!=="."||o?(r+=c,s++):(i(),s++)}if(i(),o)throw new L(k.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ve(t)}static emptyPath(){return new Ve([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U{constructor(e){this.path=e}static fromPath(e){return new U(re.fromString(e))}static fromName(e){return new U(re.fromString(e).popFirst(5))}static empty(){return new U(re.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&re.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return re.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new U(new re(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tm(n,e,t){if(!t)throw new L(k.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function BC(n,e,t,r){if(e===!0&&r===!0)throw new L(k.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function df(n){if(!U.isDocumentKey(n))throw new L(k.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function ff(n){if(U.isDocumentKey(n))throw new L(k.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Ni(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Aa(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":$(12329,{type:typeof n})}function ai(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new L(k.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Aa(n);throw new L(k.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ve(n,e){const t={typeString:n};return e&&(t.value=e),t}function ki(n,e){if(!Ni(n))throw new L(k.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const o=n[r];if(s&&typeof o!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&o!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new L(k.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pf=-62135596800,_f=1e6;class he{static now(){return he.fromMillis(Date.now())}static fromDate(e){return he.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*_f);return new he(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new L(k.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new L(k.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<pf)throw new L(k.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new L(k.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/_f}_compareTo(e){return this.seconds===e.seconds?X(this.nanoseconds,e.nanoseconds):X(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:he._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(ki(e,he._jsonSchema))return new he(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-pf;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}he._jsonSchemaVersion="firestore/timestamp/1.0",he._jsonSchema={type:ve("string",he._jsonSchemaVersion),seconds:ve("number"),nanoseconds:ve("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z{static fromTimestamp(e){return new z(e)}static min(){return new z(new he(0,0))}static max(){return new z(new he(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ci=-1;function qC(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=z.fromTimestamp(r===1e9?new he(t+1,0):new he(t,r));return new Nn(s,U.empty(),e)}function $C(n){return new Nn(n.readTime,n.key,ci)}class Nn{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new Nn(z.min(),U.empty(),ci)}static max(){return new Nn(z.max(),U.empty(),ci)}}function WC(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=U.comparator(n.documentKey,e.documentKey),t!==0?t:X(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jC="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class zC{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ca(n){if(n.code!==k.FAILED_PRECONDITION||n.message!==jC)throw n;M("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&$(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new N(((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof N?t:N.resolve(t)}catch(t){return N.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):N.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):N.reject(t)}static resolve(e){return new N(((t,r)=>{t(e)}))}static reject(e){return new N(((t,r)=>{r(e)}))}static waitFor(e){return new N(((t,r)=>{let s=0,i=0,o=!1;e.forEach((c=>{++s,c.next((()=>{++i,o&&i===s&&t()}),(l=>r(l)))})),o=!0,i===s&&t()}))}static or(e){let t=N.resolve(!1);for(const r of e)t=t.next((s=>s?N.resolve(s):r()));return t}static forEach(e,t){const r=[];return e.forEach(((s,i)=>{r.push(t.call(this,s,i))})),this.waitFor(r)}static mapArray(e,t){return new N(((r,s)=>{const i=e.length,o=new Array(i);let c=0;for(let l=0;l<i;l++){const u=l;t(e[u]).next((f=>{o[u]=f,++c,c===i&&r(o)}),(f=>s(f)))}}))}static doWhile(e,t){return new N(((r,s)=>{const i=()=>{e()===!0?t().next((()=>{i()}),s):r()};i()}))}}function GC(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function es(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ra{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Ra.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HC=-1;function Sa(n){return n==null}function li(n){return n===0&&1/n==-1/0}function KC(n){return typeof n=="number"&&Number.isInteger(n)&&!li(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}function QC(n){return typeof n=="string"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wm="";function YC(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=mf(e)),e=JC(n.get(t),e);return mf(e)}function JC(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case wm:t+="";break;default:t+=i}}return t}function mf(n){return n+wm+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ge{constructor(e,t){this.comparator=e,this.root=t||De.EMPTY}insert(e,t){return new ge(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,De.BLACK,null,null))}remove(e){return new ge(this.comparator,this.root.remove(e,this.comparator).copy(null,null,De.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,r)=>(e(t,r),!1)))}toString(){const e=[];return this.inorderTraversal(((t,r)=>(e.push(`${t}:${r}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new so(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new so(this.root,e,this.comparator,!1)}getReverseIterator(){return new so(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new so(this.root,e,this.comparator,!0)}}class so{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class De{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??De.RED,this.left=s??De.EMPTY,this.right=i??De.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new De(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return De.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return De.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,De.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,De.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw $(43730,{key:this.key,value:this.value});if(this.right.isRed())throw $(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw $(27949);return e+(this.isRed()?0:1)}}De.EMPTY=null,De.RED=!0,De.BLACK=!1;De.EMPTY=new class{constructor(){this.size=0}get key(){throw $(57766)}get value(){throw $(16141)}get color(){throw $(16727)}get left(){throw $(29726)}get right(){throw $(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new De(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class we{constructor(e){this.comparator=e,this.data=new ge(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,r)=>(e(t),!1)))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new gf(this.data.getIterator())}getIteratorFrom(e){return new gf(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((r=>{t=t.add(r)})),t}isEqual(e){if(!(e instanceof we)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new we(this.comparator);return t.data=e,t}}class gf{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mn{constructor(e){this.fields=e,e.sort(Ve.comparator)}static empty(){return new mn([])}unionWith(e){let t=new we(Ve.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new mn(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Ur(this.fields,e.fields,((t,r)=>t.isEqual(r)))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zo(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function ts(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function XC(n,e){const t=[];for(const r in n)Object.prototype.hasOwnProperty.call(n,r)&&t.push(e(n[r],r,n));return t}function Im(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Am extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ie{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Am("Invalid base64 string: "+i):i}})(e);return new Ie(t)}static fromUint8Array(e){const t=(function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i})(e);return new Ie(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return X(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Ie.EMPTY_BYTE_STRING=new Ie("");const ZC=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function kn(n){if(B(!!n,39018),typeof n=="string"){let e=0;const t=ZC.exec(n);if(B(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:de(n.seconds),nanos:de(n.nanos)}}function de(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Vn(n){return typeof n=="string"?Ie.fromBase64String(n):Ie.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cm="server_timestamp",Rm="__type__",Sm="__previous_value__",Pm="__local_write_time__";function Pa(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[Rm])==null?void 0:r.stringValue)===Cm}function Vi(n){const e=n.mapValue.fields[Sm];return Pa(e)?Vi(e):e}function Br(n){const e=kn(n.mapValue.fields[Pm].timestampValue);return new he(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eR{constructor(e,t,r,s,i,o,c,l,u,f,p){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=u,this.isUsingEmulator=f,this.apiKey=p}}const Go="(default)";class ui{constructor(e,t){this.projectId=e,this.database=t||Go}static empty(){return new ui("","")}get isDefaultDatabase(){return this.database===Go}isEqual(e){return e instanceof ui&&e.projectId===this.projectId&&e.database===this.database}}function tR(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new L(k.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ui(n.options.projectId,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bm="__type__",nR="__max__",io={mapValue:{}},Nm="__vector__",hi="value",qr={nullValue:"NULL_VALUE"},nt={booleanValue:!0},xe={booleanValue:!1};function Ae(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Pa(n)?4:rR(n)?9007199254740991:Ho(n)?10:11:$(28295,{value:n})}function _t(n,e,t){if(n===e)return!0;const r=Ae(n);if(r!==Ae(e))return!1;switch(r){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Br(n).isEqual(Br(e));case 3:return(function(i,o){if(typeof i.timestampValue=="string"&&typeof o.timestampValue=="string"&&i.timestampValue.length===o.timestampValue.length)return i.timestampValue===o.timestampValue;const c=kn(i.timestampValue),l=kn(o.timestampValue);return c.seconds===l.seconds&&c.nanos===l.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(i,o){return Vn(i.bytesValue).isEqual(Vn(o.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(i,o){return de(i.geoPointValue.latitude)===de(o.geoPointValue.latitude)&&de(i.geoPointValue.longitude)===de(o.geoPointValue.longitude)})(n,e);case 2:return(function(i,o,c){if("integerValue"in i&&"integerValue"in o)return de(i.integerValue)===de(o.integerValue);let l,u;if("doubleValue"in i&&"doubleValue"in o)l=de(i.doubleValue),u=de(o.doubleValue);else{if(!(c!=null&&c.Ee))return!1;l=de(i.integerValue??i.doubleValue),u=de(o.integerValue??o.doubleValue)}return l===u?!!(c!=null&&c.he)||li(l)===li(u):!!(c===void 0||c.Te)&&isNaN(l)&&isNaN(u)})(n,e,t);case 9:return Ur(n.arrayValue.values||[],e.arrayValue.values||[],((s,i)=>_t(s,i,t)));case 10:case 11:return(function(i,o,c){const l=i.mapValue.fields||{},u=o.mapValue.fields||{};if(zo(l)!==zo(u))return!1;for(const f in l)if(l.hasOwnProperty(f)&&(u[f]===void 0||!_t(l[f],u[f],c)))return!1;return!0})(n,e,t);default:return $(52216,{left:n})}}function di(n,e){return(n.values||[]).find((t=>_t(t,e)))!==void 0}function rt(n,e){if(n===e)return 0;const t=Ae(n),r=Ae(e);if(t!==r)return X(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return X(n.booleanValue,e.booleanValue);case 2:return(function(i,o){const c=de(i.integerValue||i.doubleValue),l=de(o.integerValue||o.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1})(n,e);case 3:return yf(n.timestampValue,e.timestampValue);case 4:return yf(Br(n),Br(e));case 5:return nl(n.stringValue,e.stringValue);case 6:return(function(i,o){const c=Vn(i),l=Vn(o);return c.compareTo(l)})(n.bytesValue,e.bytesValue);case 7:return(function(i,o){const c=i.split("/"),l=o.split("/");for(let u=0;u<c.length&&u<l.length;u++){const f=X(c[u],l[u]);if(f!==0)return f}return X(c.length,l.length)})(n.referenceValue,e.referenceValue);case 8:return(function(i,o){const c=X(de(i.latitude),de(o.latitude));return c!==0?c:X(de(i.longitude),de(o.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return Ef(n.arrayValue,e.arrayValue);case 10:return(function(i,o){var m,A,S,O;const c=i.fields||{},l=o.fields||{},u=(m=c[hi])==null?void 0:m.arrayValue,f=(A=l[hi])==null?void 0:A.arrayValue,p=X(((S=u==null?void 0:u.values)==null?void 0:S.length)||0,((O=f==null?void 0:f.values)==null?void 0:O.length)||0);return p!==0?p:Ef(u,f)})(n.mapValue,e.mapValue);case 11:return(function(i,o){if(i===io.mapValue&&o===io.mapValue)return 0;if(i===io.mapValue)return 1;if(o===io.mapValue)return-1;const c=i.fields||{},l=Object.keys(c),u=o.fields||{},f=Object.keys(u);l.sort(),f.sort();for(let p=0;p<l.length&&p<f.length;++p){const m=nl(l[p],f[p]);if(m!==0)return m;const A=rt(c[l[p]],u[f[p]]);if(A!==0)return A}return X(l.length,f.length)})(n.mapValue,e.mapValue);default:throw $(23264,{Pe:t})}}function yf(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return X(n,e);const t=kn(n),r=kn(e),s=X(t.seconds,r.seconds);return s!==0?s:X(t.nanos,r.nanos)}function Ef(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=rt(t[s],r[s]);if(i!==void 0&&i!==0)return i}return X(t.length,r.length)}function $r(n){return rl(n)}function rl(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const r=kn(t);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return Vn(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return U.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=rl(i);return r+"]"})(n.arrayValue):"mapValue"in n?(function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${rl(t.fields[o])}`;return s+"}"})(n.mapValue):$(61005,{value:n})}function go(n){switch(Ae(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Vi(n);return e?16+go(e):16;case 5:return 2*n.stringValue.length;case 6:return Vn(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,i)=>s+go(i)),0)})(n.arrayValue);case 10:case 11:return(function(r){let s=0;return ts(r.fields,((i,o)=>{s+=i.length+go(o)})),s})(n.mapValue);default:throw $(13486,{value:n})}}function vf(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function bt(n){return!!n&&"integerValue"in n}function Qn(n){return!!n&&"doubleValue"in n}function xn(n){return bt(n)||Qn(n)}function Wr(n){return!!n&&"arrayValue"in n}function ct(n){return!!n&&"nullValue"in n}function st(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Sr(n){return!!n&&"mapValue"in n}function Ho(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[bm])==null?void 0:r.stringValue)===Nm}function sl(n){var e,t;return(t=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[hi])==null?void 0:t.arrayValue}function Ws(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return ts(n.mapValue.fields,((t,r)=>e.mapValue.fields[t]=Ws(r))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Ws(n.arrayValue.values[t]);return e}return{...n}}function rR(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===nR}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(e){this.value=e}static empty(){return new gt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Sr(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Ws(t)}setAll(e){let t=Ve.emptyPath(),r={},s=[];e.forEach(((o,c)=>{if(!t.isImmediateParentOf(c)){const l=this.getFieldsMap(t);this.applyChanges(l,r,s),r={},s=[],t=c.popLast()}o?r[c.lastSegment()]=Ws(o):s.push(c.lastSegment())}));const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());Sr(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return _t(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];Sr(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){ts(t,((s,i)=>e[s]=i));for(const s of r)delete e[s]}clone(){return new gt(Ws(this.value))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ba(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:li(e)?"-0":e}}function gu(n){return{integerValue:""+n}}function yu(n,e,t){return Number.isInteger(e)&&(t!=null&&t.preferIntegers)||KC(e)?gu(e):ba(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Na{constructor(){this._=void 0}}function sR(n,e,t){return n instanceof il?(function(s,i){const o={fields:{[Rm]:{stringValue:Cm},[Pm]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Pa(i)&&(i=Vi(i)),i&&(o.fields[Sm]=i),{mapValue:o}})(t,e):n instanceof Ko?km(n,e):n instanceof Qo?Vm(n,e):n instanceof Yo?(function(s,i){const o=oR(s,i),c=Jo(o)+Jo(s.Re);return bt(o)&&bt(s.Re)?gu(c):ba(s.serializer,c)})(n,e):n instanceof ol?(function(s,i){return Tf(s,i,Math.min)})(n,e):n instanceof al?(function(s,i){return Tf(s,i,Math.max)})(n,e):void 0}function iR(n,e,t){return n instanceof Ko?km(n,e):n instanceof Qo?Vm(n,e):t}function oR(n,e){return n instanceof Yo?xn(e)?e:{integerValue:0}:null}class il extends Na{}class Ko extends Na{constructor(e){super(),this.elements=e}}function km(n,e){const t=xm(e);for(const r of n.elements)t.some((s=>_t(s,r)))||t.push(r);return{arrayValue:{values:t}}}class Qo extends Na{constructor(e){super(),this.elements=e}}function Vm(n,e){let t=xm(e);for(const r of n.elements)t=t.filter((s=>!_t(s,r)));return{arrayValue:{values:t}}}class Eu extends Na{constructor(e,t){super(),this.serializer=e,this.Re=t}}class Yo extends Eu{}class ol extends Eu{}class al extends Eu{}function Tf(n,e,t){if(!xn(e))return n.Re;const r=t(Jo(e),Jo(n.Re));return bt(e)&&bt(n.Re)?gu(r):ba(n.serializer,r)}function Jo(n){return de(n.integerValue||n.doubleValue)}function xm(n){return Wr(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function aR(n,e){return n.field.isEqual(e.field)&&(function(r,s){return r instanceof Ko&&s instanceof Ko||r instanceof Qo&&s instanceof Qo?Ur(r.elements,s.elements,_t):r instanceof Yo&&s instanceof Yo||r instanceof ol&&s instanceof ol||r instanceof al&&s instanceof al?_t(r.Re,s.Re):r instanceof il&&s instanceof il})(n.transform,e.transform)}class Yn{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Yn}static exists(e){return new Yn(void 0,e)}static updateTime(e){return new Yn(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function yo(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class vu{}function Dm(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new lR(n.key,Yn.none()):new Tu(n.key,n.data,Yn.none());{const t=n.data,r=gt.empty();let s=new we(Ve.comparator);for(let i of e.fields)if(!s.has(i)){let o=t.field(i);o===null&&i.length>1&&(i=i.popLast(),o=t.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new ka(n.key,r,new mn(s.toArray()),Yn.none())}}function cR(n,e,t){n instanceof Tu?(function(s,i,o){const c=s.value.clone(),l=If(s.fieldTransforms,i,o.transformResults);c.setAll(l),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()})(n,e,t):n instanceof ka?(function(s,i,o){if(!yo(s.precondition,i))return void i.convertToUnknownDocument(o.version);const c=If(s.fieldTransforms,i,o.transformResults),l=i.data;l.setAll(Om(s)),l.setAll(c),i.convertToFoundDocument(o.version,l).setHasCommittedMutations()})(n,e,t):(function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()})(0,e,t)}function js(n,e,t,r){return n instanceof Tu?(function(i,o,c,l){if(!yo(i.precondition,o))return c;const u=i.value.clone(),f=Af(i.fieldTransforms,l,o);return u.setAll(f),o.convertToFoundDocument(o.version,u).setHasLocalMutations(),null})(n,e,t,r):n instanceof ka?(function(i,o,c,l){if(!yo(i.precondition,o))return c;const u=Af(i.fieldTransforms,l,o),f=o.data;return f.setAll(Om(i)),f.setAll(u),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((p=>p.field)))})(n,e,t,r):(function(i,o,c){return yo(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c})(n,e,t)}function wf(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Ur(r,s,((i,o)=>aR(i,o)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Tu extends vu{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class ka extends vu{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Om(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}})),e}function If(n,e,t){const r=new Map;B(n.length===t.length,32656,{Ie:t.length,Ae:n.length});for(let s=0;s<t.length;s++){const i=n[s],o=i.transform,c=e.data.field(i.field);r.set(i.field,iR(o,c,t[s]))}return r}function Af(n,e,t){const r=new Map;for(const s of n){const i=s.transform,o=t.data.field(s.field);r.set(s.field,sR(i,o,e))}return r}class lR extends vu{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xo{constructor(e,t){this.position=e,this.inclusive=t}}function Cf(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],o=n.position[s];if(i.field.isKeyField()?r=U.comparator(U.fromName(o.referenceValue),t.key):r=rt(o,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Rf(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!_t(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lm{}class Ee extends Lm{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new hR(e,t,r):t==="array-contains"?new pR(e,r):t==="in"?new _R(e,r):t==="not-in"?new mR(e,r):t==="array-contains-any"?new gR(e,r):new Ee(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new dR(e,r):new fR(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(rt(t,this.value)):t!==null&&Ae(this.value)===Ae(t)&&this.matchesComparison(rt(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return $(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class It extends Lm{constructor(e,t){super(),this.filters=e,this.op=t,this.Ve=null}static create(e,t){return new It(e,t)}matches(e){return Mm(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Ve!==null||(this.Ve=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Ve}getFilters(){return Object.assign([],this.filters)}}function Mm(n){return n.op==="and"}function Fm(n){return uR(n)&&Mm(n)}function uR(n){for(const e of n.filters)if(e instanceof It)return!1;return!0}function cl(n){if(n instanceof Ee)return n.field.canonicalString()+n.op.toString()+$r(n.value);if(Fm(n))return n.filters.map((e=>cl(e))).join(",");{const e=n.filters.map((t=>cl(t))).join(",");return`${n.op}(${e})`}}function Um(n,e){return n instanceof Ee?(function(r,s){return s instanceof Ee&&r.op===s.op&&r.field.isEqual(s.field)&&_t(r.value,s.value)})(n,e):n instanceof It?(function(r,s){return s instanceof It&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((i,o,c)=>i&&Um(o,s.filters[c])),!0):!1})(n,e):void $(19439)}function Bm(n){return n instanceof Ee?(function(t){return`${t.field.canonicalString()} ${t.op} ${$r(t.value)}`})(n):n instanceof It?(function(t){return t.op.toString()+" {"+t.getFilters().map(Bm).join(" ,")+"}"})(n):"Filter"}class hR extends Ee{constructor(e,t,r){super(e,t,r),this.key=U.fromName(r.referenceValue)}matches(e){const t=U.comparator(e.key,this.key);return this.matchesComparison(t)}}class dR extends Ee{constructor(e,t){super(e,"in",t),this.keys=qm("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class fR extends Ee{constructor(e,t){super(e,"not-in",t),this.keys=qm("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function qm(n,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map((r=>U.fromName(r.referenceValue)))}class pR extends Ee{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Wr(t)&&di(t.arrayValue,this.value)}}class _R extends Ee{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&di(this.value.arrayValue,t)}}class mR extends Ee{constructor(e,t){super(e,"not-in",t)}matches(e){if(di(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!di(this.value.arrayValue,t)}}class gR extends Ee{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Wr(t)||!t.arrayValue.values)&&t.arrayValue.values.some((r=>di(this.value.arrayValue,r)))}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zo{constructor(e,t="asc"){this.field=e,this.dir=t}}function yR(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class We{constructor(e,t,r,s,i,o,c){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=c}static newInvalidDocument(e){return new We(e,0,z.min(),z.min(),z.min(),gt.empty(),0)}static newFoundDocument(e,t,r,s){return new We(e,1,t,z.min(),r,s,0)}static newNoDocument(e,t){return new We(e,2,t,z.min(),z.min(),gt.empty(),0)}static newUnknownDocument(e,t){return new We(e,3,t,z.min(),z.min(),gt.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(z.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=gt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=gt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=z.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof We&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new We(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ER{constructor(e,t=null,r=[],s=[],i=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=c,this.de=null}}function Sf(n,e=null,t=[],r=[],s=null,i=null,o=null){return new ER(n,e,t,r,s,i,o)}function $m(n){const e=te(n);if(e.de===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((r=>cl(r))).join(","),t+="|ob:",t+=e.orderBy.map((r=>(function(i){return i.field.canonicalString()+i.dir})(r))).join(","),Sa(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((r=>$r(r))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((r=>$r(r))).join(",")),e.de=t}return e.de}function Wm(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!yR(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Um(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Rf(n.startAt,e.startAt)&&Rf(n.endAt,e.endAt)}function Gn(n){return!!n.isCorePipeline}function jm(n){return!!n.path&&U.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xi{constructor(e,t=null,r=[],s=[],i=null,o="F",c=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=c,this.endAt=l,this.fe=null,this.me=null,this.pe=null,this.startAt,this.endAt}}function vR(n,e,t,r,s,i,o,c){return new xi(n,e,t,r,s,i,o,c)}function wu(n){return new xi(n)}function Pf(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function TR(n){return U.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function zm(n){return n.collectionGroup!==null}function zs(n){const e=te(n);if(e.fe===null){e.fe=[];const t=new Set;for(const i of e.explicitOrderBy)e.fe.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new we(Ve.comparator);return o.filters.forEach((l=>{l.getFlattenedFilters().forEach((u=>{u.isInequality()&&(c=c.add(u.field))}))})),c})(e).forEach((i=>{t.has(i.canonicalString())||i.isKeyField()||e.fe.push(new Zo(i,r))})),t.has(Ve.keyField().canonicalString())||e.fe.push(new Zo(Ve.keyField(),r))}return e.fe}function Vt(n){const e=te(n);return e.me||(e.me=wR(e,zs(n))),e.me}function wR(n,e){if(n.limitType==="F")return Sf(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new Zo(s.field,i)}));const t=n.endAt?new Xo(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Xo(n.startAt.position,n.startAt.inclusive):null;return Sf(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function ll(n,e){const t=n.filters.concat([e]);return new xi(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function ul(n,e,t){return new xi(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function IR(n,e){return Wm(Vt(n),Vt(e))&&n.limitType===e.limitType}function Gs(n){return`Query(target=${(function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map((s=>Bm(s))).join(", ")}]`),Sa(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map((s=>(function(o){return`${o.field.canonicalString()} (${o.dir})`})(s))).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map((s=>$r(s))).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map((s=>$r(s))).join(",")),`Target(${r})`})(Vt(n))}; limitType=${n.limitType})`}function Va(n,e){return e.isFoundDocument()&&(function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):U.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)})(n,e)&&(function(r,s){for(const i of zs(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(n,e)&&(function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0})(n,e)&&(function(r,s){return!(r.startAt&&!(function(o,c,l){const u=Cf(o,c,l);return o.inclusive?u<=0:u<0})(r.startAt,zs(r),s)||r.endAt&&!(function(o,c,l){const u=Cf(o,c,l);return o.inclusive?u>=0:u>0})(r.endAt,zs(r),s))})(n,e)}function Iu(n){return(e,t)=>{let r=!1;for(const s of zs(n)){const i=AR(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function AR(n,e,t){const r=n.field.isKeyField()?U.comparator(e.key,t.key):(function(i,o,c){const l=o.data.field(i),u=c.data.field(i);return l!==null&&u!==null?rt(l,u):$(42886)})(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return $(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CR{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ye,ee;function Gm(n){if(n===void 0)return Kt("GRPC error has no .code"),k.UNKNOWN;switch(n){case ye.OK:return k.OK;case ye.CANCELLED:return k.CANCELLED;case ye.UNKNOWN:return k.UNKNOWN;case ye.DEADLINE_EXCEEDED:return k.DEADLINE_EXCEEDED;case ye.RESOURCE_EXHAUSTED:return k.RESOURCE_EXHAUSTED;case ye.INTERNAL:return k.INTERNAL;case ye.UNAVAILABLE:return k.UNAVAILABLE;case ye.UNAUTHENTICATED:return k.UNAUTHENTICATED;case ye.INVALID_ARGUMENT:return k.INVALID_ARGUMENT;case ye.NOT_FOUND:return k.NOT_FOUND;case ye.ALREADY_EXISTS:return k.ALREADY_EXISTS;case ye.PERMISSION_DENIED:return k.PERMISSION_DENIED;case ye.FAILED_PRECONDITION:return k.FAILED_PRECONDITION;case ye.ABORTED:return k.ABORTED;case ye.OUT_OF_RANGE:return k.OUT_OF_RANGE;case ye.UNIMPLEMENTED:return k.UNIMPLEMENTED;case ye.DATA_LOSS:return k.DATA_LOSS;default:return $(39323,{code:n})}}(ee=ye||(ye={}))[ee.OK=0]="OK",ee[ee.CANCELLED=1]="CANCELLED",ee[ee.UNKNOWN=2]="UNKNOWN",ee[ee.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ee[ee.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ee[ee.NOT_FOUND=5]="NOT_FOUND",ee[ee.ALREADY_EXISTS=6]="ALREADY_EXISTS",ee[ee.PERMISSION_DENIED=7]="PERMISSION_DENIED",ee[ee.UNAUTHENTICATED=16]="UNAUTHENTICATED",ee[ee.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ee[ee.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ee[ee.ABORTED=10]="ABORTED",ee[ee.OUT_OF_RANGE=11]="OUT_OF_RANGE",ee[ee.UNIMPLEMENTED=12]="UNIMPLEMENTED",ee[ee.INTERNAL=13]="INTERNAL",ee[ee.UNAVAILABLE=14]="UNAVAILABLE",ee[ee.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hr{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){ts(this.inner,((t,r)=>{for(const[s,i]of r)e(s,i)}))}isEmpty(){return Im(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RR=new ge(U.comparator);function lt(){return RR}const Hm=new ge(U.comparator);function yr(...n){let e=Hm;for(const t of n)e=e.insert(t.key,t);return e}function SR(n){let e=Hm;return n.forEach(((t,r)=>e=e.insert(t,r.overlayedDocument))),e}function pn(){return Hs()}function Km(){return Hs()}function Hs(){return new hr((n=>n.toString()),((n,e)=>n.isEqual(e)))}const PR=new we(U.comparator);function Z(...n){let e=PR;for(const t of n)e=e.add(t);return e}const bR=new we(X);function NR(){return bR}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kR(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VR=new vn([4294967295,4294967295],0);function bf(n){const e=kR().encode(n),t=new fm;return t.update(e),new Uint8Array(t.digest())}function Nf(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new vn([t,r],0),new vn([s,i],0)]}class Au{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Ds(`Invalid padding: ${t}`);if(r<0)throw new Ds(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Ds(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Ds(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.ye=vn.fromNumber(this.ge)}we(e,t,r){let s=e.add(t.multiply(vn.fromNumber(r)));return s.compare(VR)===1&&(s=new vn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.ye).toNumber()}be(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=bf(e),[r,s]=Nf(t);for(let i=0;i<this.hashCount;i++){const o=this.we(r,s,i);if(!this.be(o))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new Au(i,s,t);return r.forEach((c=>o.insert(c))),o}insert(e){if(this.ge===0)return;const t=bf(e),[r,s]=Nf(t);for(let i=0;i<this.hashCount;i++){const o=this.we(r,s,i);this.ve(o)}}ve(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Ds extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Di{constructor(e,t,r,s,i,o){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.augmentedDocumentUpdates=i,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,Oi.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new Di(z.min(),s,new ge(X),lt(),lt(),Z())}}class Oi{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Oi(r,t,Z(),Z(),Z())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eo{constructor(e,t,r,s){this.Se=e,this.removedTargetIds=t,this.key=r,this.De=s}}class Qm{constructor(e,t){this.targetId=e,this.xe=t}}class Ym{constructor(e,t,r=Ie.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class kf{constructor(e){this.targetId=e,this.Ce=0,this.Fe=Vf(),this.Oe=Ie.EMPTY_BYTE_STRING,this.Me=!1,this.Ne=!0}get current(){return this.Me}get resumeToken(){return this.Oe}get Le(){return this.Ce!==0}get Be(){return this.Ne}Ue(e){e.approximateByteSize()>0&&(this.Ne=!0,this.Oe=e)}ke(){let e=Z(),t=Z(),r=Z();return this.Fe.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:$(38017,{changeType:i})}})),new Oi(this.Oe,this.Me,e,t,r)}qe(){this.Ne=!1,this.Fe=Vf()}$e(e,t){this.Ne=!0,this.Fe=this.Fe.insert(e,t)}Ke(e){this.Ne=!0,this.Fe=this.Fe.remove(e)}We(){this.Ce+=1}Qe(){this.Ce-=1,B(this.Ce>=0,3241,{Ce:this.Ce,targetId:this.targetId})}Ge(){this.Ne=!0,this.Me=!0}}const Ps="WatchChangeAggregator";class xR{constructor(e){this.ze=e,this.je=new Map,this.He=lt(),this.Je=oo(),this.Ye=lt(),this.Ze=oo(),this.Xe=new ge(X)}et(e){for(const t of e.Se)e.De&&e.De.isFoundDocument()?this.tt(t,e.De):this.nt(t,e.key,e.De);for(const t of e.removedTargetIds)this.nt(t,e.key,e.De)}rt(e){this.forEachTarget(e,(t=>{const r=this.je.get(t);if(r)switch(e.state){case 0:this.it(t)&&r.Ue(e.resumeToken);break;case 1:r.Qe(),r.Le||r.qe(),r.Ue(e.resumeToken);break;case 2:r.Qe(),r.Le||this.removeTarget(t);break;case 3:this.it(t)&&(r.Ge(),r.Ue(e.resumeToken));break;case 4:this.it(t)&&(this.st(t),r.Ue(e.resumeToken));break;default:$(56790,{state:e.state})}else M(Ps,`handleTargetChange received targetChange for untracked target ID (${t}) with state (${e.state})`)}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.je.forEach(((r,s)=>{this.it(s)&&t(s)}))}_t(e){var t;return Gn(e)?e.getPipelineSourceType()==="documents"&&((t=e.getPipelineDocuments())==null?void 0:t.length)===1:jm(e)}ot(e){const t=e.targetId,r=e.xe.count,s=this.ut(t);if(s){const i=s.target;if(this._t(i))if(r===0){const o=new U(Gn(i)?re.fromString(i.getPipelineDocuments()[0]):i.path);this.nt(t,o,We.newNoDocument(o,z.min()))}else B(r===1,20013,"Single document existence filter with count: "+r);else{const o=this.ct(t);if(o!==r){const c=this.lt(e),l=c?this.Et(c,e,o):1;if(l!==0){this.st(t);const u=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Xe=this.Xe.insert(t,u)}}}}}lt(e){const t=e.xe.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let o,c;try{o=Vn(r).toUint8Array()}catch(l){if(l instanceof Am)return wt("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new Au(o,s,i)}catch(l){return wt(l instanceof Ds?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.ge===0?null:c}Et(e,t,r){return t.xe.count===r-this.Pt(e,t.targetId)?0:2}Pt(e,t){const r=this.ze.getRemoteKeysForTarget(t);let s=0;return r.forEach((i=>{const o=this.ze.Tt(),c=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.nt(t,i,null),s++)})),s}Rt(e){const t=new Map;this.je.forEach(((i,o)=>{const c=this.ut(o);if(c){if(i.current&&this._t(c.target)){const l=Gn(c.target)?re.fromString(c.target.getPipelineDocuments()[0]):c.target.path,u=new U(l);this.It(u).has(o)||this.At(o,u)||this.nt(o,u,We.newNoDocument(u,e))}i.Be&&(t.set(o,i.ke()),i.qe())}}));let r=Z();this.Ze.forEach(((i,o)=>{let c=!0;o.forEachWhile((l=>{const u=this.ut(l);return!u||u.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)})),c&&(r=r.add(i))})),this.He.forEach(((i,o)=>o.setReadTime(e))),this.Ye.forEach(((i,o)=>o.setReadTime(e)));const s=new Di(e,t,this.Xe,this.He,this.Ye,r);return this.He=lt(),this.Je=oo(),this.Ye=lt(),this.Ze=oo(),this.Xe=new ge(X),s}tt(e,t){const r=this.je.get(e);if(!r||!this.it(e))return void M(Ps,`addDocumentToTarget received document for unknown inactive target (${e})`);const s=this.At(e,t.key)?2:0;r.$e(t.key,s),Gn(this.ut(e).target)&&this.ut(e).target.getPipelineFlavor()!=="exact"?this.Ye=this.Ye.insert(t.key,t):this.He=this.He.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.Ze=this.Ze.insert(t.key,this.Vt(t.key).add(e))}nt(e,t,r){const s=this.je.get(e);s&&this.it(e)?(this.At(e,t)?s.$e(t,1):s.Ke(t),this.Ze=this.Ze.insert(t,this.Vt(t).delete(e)),this.Ze=this.Ze.insert(t,this.Vt(t).add(e)),r&&(Gn(this.ut(e).target)&&this.ut(e).target.getPipelineFlavor()!=="exact"?this.Ye=this.Ye.insert(t,r):this.He=this.He.insert(t,r))):M(Ps,`removeDocumentFromTarget received document for unknown or inactive target (${e})`)}removeTarget(e){this.je.delete(e)}ct(e){const t=this.je.get(e);if(!t)return 0;const r=t.ke();return this.ze.getRemoteKeysForTarget(e).size+r.addedDocuments.size-r.removedDocuments.size}We(e){let t=this.je.get(e);t||(M(Ps,`recordPendingTargetRequest set up tracking for target ID ${e}`),t=new kf(e),this.je.set(e,t)),t.We()}Vt(e){let t=this.Ze.get(e);return t||(t=new we(X),this.Ze=this.Ze.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new we(X),this.Je=this.Je.insert(e,t)),t}it(e){const t=this.ut(e)!==null;return t||M(Ps,"Detected inactive target",e),t}ut(e){const t=this.je.get(e);return t===void 0||t.Le?null:this.ze.dt(e)}st(e){this.je.set(e,new kf(e)),this.ze.getRemoteKeysForTarget(e).forEach((t=>{this.nt(e,t,null)}))}At(e,t){return this.ze.getRemoteKeysForTarget(e).has(t)}}function oo(){return new ge(U.comparator)}function Vf(){return new ge(U.comparator)}const DR={asc:"ASCENDING",desc:"DESCENDING"},OR={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},LR={and:"AND",or:"OR"};class MR{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function hl(n,e){return n.useProto3Json||Sa(e)?e:{value:e}}function ea(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Cu(n){const e=kn(n);return new he(e.seconds,e.nanos)}function Jm(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Sc(n,e){return ea(n,e.toTimestamp())}function Pr(n){return B(!!n,49232),z.fromTimestamp(Cu(n))}function Ru(n,e){return dl(n,e).canonicalString()}function dl(n,e){const t=(function(s){return new re(["projects",s.projectId,"databases",s.database])})(n).child("documents");return e===void 0?t:t.child(e)}function Xm(n){const e=re.fromString(n);return B(rg(e),10190,{key:e.toString()}),e}function FR(n,e){return Ru(n.databaseId,e.path)}function Pc(n,e){const t=Xm(e);if(t.get(1)!==n.databaseId.projectId)throw new L(k.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new L(k.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new U(eg(t))}function Zm(n,e){return Ru(n.databaseId,e)}function UR(n){const e=Xm(n);return e.length===4?re.emptyPath():eg(e)}function xf(n){return new re(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function eg(n){return B(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function BR(n,e){let t;if("targetChange"in e){e.targetChange;const r=(function(u){return u==="NO_CHANGE"?0:u==="ADD"?1:u==="REMOVE"?2:u==="CURRENT"?3:u==="RESET"?4:$(39313,{state:u})})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=(function(u,f){return u.useProto3Json?(B(f===void 0||typeof f=="string",58123),Ie.fromBase64String(f||"")):(B(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),Ie.fromUint8Array(f||new Uint8Array))})(n,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&(function(u){const f=u.code===void 0?k.UNKNOWN:Gm(u.code);return new L(f,u.message||"")})(o);t=new Ym(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Pc(n,r.document.name),i=Pr(r.document.updateTime),o=r.document.createTime?Pr(r.document.createTime):z.min(),c=new gt({mapValue:{fields:r.document.fields}}),l=We.newFoundDocument(s,i,o,c),u=r.targetIds||[],f=r.removedTargetIds||[];t=new Eo(u,f,l.key,l)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Pc(n,r.document),i=r.readTime?Pr(r.readTime):z.min(),o=We.newNoDocument(s,i),c=r.removedTargetIds||[];t=new Eo([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Pc(n,r.document),i=r.removedTargetIds||[];t=new Eo([],i,s,null)}else{if(!("filter"in e))return $(11601,{ft:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new CR(s,i),c=r.targetId;t=new Qm(c,o)}}return t}function qR(n,e){return{documents:[Zm(n,e.path)]}}function $R(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Zm(n,s);const i=(function(u){if(u.length!==0)return ng(It.create(u,"and"))})(e.filters);i&&(t.structuredQuery.where=i);const o=(function(u){if(u.length!==0)return u.map((f=>(function(m){return{field:Er(m.field),direction:GR(m.dir)}})(f)))})(e.orderBy);o&&(t.structuredQuery.orderBy=o);const c=hl(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=(function(u){return{before:u.inclusive,values:u.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(u){return{before:!u.inclusive,values:u.position}})(e.endAt)),{yt:t,parent:s}}function WR(n){let e=UR(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){B(r===1,65062);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=(function(p){const m=tg(p);return m instanceof It&&Fm(m)?m.getFilters():[m]})(t.where));let o=[];t.orderBy&&(o=(function(p){return p.map((m=>(function(S){return new Zo(vr(S.field),(function(F){switch(F){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(S.direction))})(m)))})(t.orderBy));let c=null;t.limit&&(c=(function(p){let m;return m=typeof p=="object"?p.value:p,Sa(m)?null:m})(t.limit));let l=null;t.startAt&&(l=(function(p){const m=!!p.before,A=p.values||[];return new Xo(A,m)})(t.startAt));let u=null;return t.endAt&&(u=(function(p){const m=!p.before,A=p.values||[];return new Xo(A,m)})(t.endAt)),vR(e,s,o,i,c,"F",l,u)}function jR(n,e){const t=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return $(28987,{purpose:s})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function zR(n,e){return{structuredPipeline:{pipeline:{stages:e.stages.map((t=>t._toProto(n)))}}}}function tg(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=vr(t.unaryFilter.field);return Ee.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=vr(t.unaryFilter.field);return Ee.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=vr(t.unaryFilter.field);return Ee.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=vr(t.unaryFilter.field);return Ee.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return $(61313);default:return $(60726)}})(n):n.fieldFilter!==void 0?(function(t){return Ee.create(vr(t.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return $(58110);default:return $(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return It.create(t.compositeFilter.filters.map((r=>tg(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return $(1026)}})(t.compositeFilter.op))})(n):$(30097,{filter:n})}function GR(n){return DR[n]}function HR(n){return OR[n]}function KR(n){return LR[n]}function Er(n){return{fieldPath:n.canonicalString()}}function vr(n){return Ve.fromServerFormat(n.fieldPath)}function ng(n){return n instanceof Ee?(function(t){if(t.op==="=="){if(st(t.value))return{unaryFilter:{field:Er(t.field),op:"IS_NAN"}};if(ct(t.value))return{unaryFilter:{field:Er(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(st(t.value))return{unaryFilter:{field:Er(t.field),op:"IS_NOT_NAN"}};if(ct(t.value))return{unaryFilter:{field:Er(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Er(t.field),op:HR(t.op),value:t.value}}})(n):n instanceof It?(function(t){const r=t.getFilters().map((s=>ng(s)));return r.length===1?r[0]:{compositeFilter:{op:KR(t.op),filters:r}}})(n):$(54877,{filter:n})}function rg(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function sg(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}function fi(n,e){const t={fields:{}};return e.forEach(((r,s)=>{if(typeof s!="string")throw new Error(`Cannot encode map with non-string key: ${s}`);t.fields[s]=r._toProto(n)})),{mapValue:t}}function ig(n){return{stringValue:n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xa(n){return new MR(n,!0)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ht{constructor(e){this._byteString=e}static fromBase64String(e){try{return new ht(Ie.fromBase64String(e))}catch(t){throw new L(k.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new ht(Ie.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:ht._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(ki(e,ht._jsonSchema))return ht.fromBase64String(e.bytes)}}ht._jsonSchemaVersion="firestore/bytes/1.0",ht._jsonSchema={type:ve("string",ht._jsonSchemaVersion),bytes:ve("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Su{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new L(k.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ve(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function QR(){return new Su(Pt)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class og{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xt{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new L(k.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new L(k.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return X(this._lat,e._lat)||X(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:xt._jsonSchemaVersion}}static fromJSON(e){if(ki(e,xt._jsonSchema))return new xt(e.latitude,e.longitude)}}function ag(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */xt._jsonSchemaVersion="firestore/geoPoint/1.0",xt._jsonSchema={type:ve("string",xt._jsonSchemaVersion),latitude:ve("number"),longitude:ve("number")};class YR{bt(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Df="ConnectivityMonitor";class Of{constructor(){this.vt=()=>this.St(),this.Dt=()=>this.xt(),this.Ct=[],this.Ft()}bt(e){this.Ct.push(e)}shutdown(){window.removeEventListener("online",this.vt),window.removeEventListener("offline",this.Dt)}Ft(){window.addEventListener("online",this.vt),window.addEventListener("offline",this.Dt)}St(){M(Df,"Network connectivity changed: AVAILABLE");for(const e of this.Ct)e(0)}xt(){M(Df,"Network connectivity changed: UNAVAILABLE");for(const e of this.Ct)e(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ao=null;function fl(){return ao===null?ao=(function(){return 268435456+Math.round(2147483648*Math.random())})():ao++,"0x"+ao.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bc="RestConnection",JR={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class XR{get Ot(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Mt=t+"://"+e.host,this.Nt=`projects/${r}/databases/${s}`,this.Lt=this.databaseId.database===Go?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Bt(e,t,r,s,i){const o=fl(),c=this.Ut(e,t.toUriEncodedString());M(bc,`Sending RPC '${e}' ${o}:`,c,r);const l={"google-cloud-resource-prefix":this.Nt,"x-goog-request-params":this.Lt};this.kt(l,s,i);const{host:u}=new URL(c),f=ar(u);return this.qt(e,c,l,r,f).then((p=>(M(bc,`Received RPC '${e}' ${o}: `,p),p)),(p=>{throw wt(bc,`RPC '${e}' ${o} failed with error: `,p,"url: ",c,"request:",r),p}))}$t(e,t,r,s,i,o){return this.Bt(e,t,r,s,i)}kt(e,t,r){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Zr})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((s,i)=>e[i]=s)),r&&r.headers.forEach(((s,i)=>e[i]=s))}Ut(e,t){const r=JR[e];let s=`${this.Mt}/v1/${t}:${r}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZR{constructor(e){this.Kt=e.Kt,this.Wt=e.Wt}Qt(e){this.Gt=e}zt(e){this.jt=e}Ht(e){this.Jt=e}onMessage(e){this.Yt=e}close(){this.Wt()}send(e){this.Kt(e)}Zt(){this.Gt()}Xt(){this.jt()}en(e){this.Jt(e)}tn(e){this.Yt(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qe="WebChannelConnection",bs=(n,e,t)=>{n.listen(e,(r=>{try{t(r)}catch(s){setTimeout((()=>{throw s}),0)}}))};class br extends XR{constructor(e){super(e),this.nn=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static rn(){if(!br.sn){const e=gm();bs(e,mm.STAT_EVENT,(t=>{t.stat===tl.PROXY?M(qe,"STAT_EVENT: detected buffering proxy"):t.stat===tl.NOPROXY&&M(qe,"STAT_EVENT: detected no buffering proxy")})),br.sn=!0}}qt(e,t,r,s,i){const o=fl();return new Promise(((c,l)=>{const u=new pm;u.setWithCredentials(!0),u.listenOnce(_m.COMPLETE,(()=>{try{switch(u.getLastErrorCode()){case mo.NO_ERROR:const p=u.getResponseJson();M(qe,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(p)),c(p);break;case mo.TIMEOUT:M(qe,`RPC '${e}' ${o} timed out`),l(new L(k.DEADLINE_EXCEEDED,"Request time out"));break;case mo.HTTP_ERROR:const m=u.getStatus();if(M(qe,`RPC '${e}' ${o} failed with status:`,m,"response text:",u.getResponseText()),m>0){let A=u.getResponseJson();Array.isArray(A)&&(A=A[0]);const S=A==null?void 0:A.error;if(S&&S.status&&S.message){const O=(function(H){const se=H.toLowerCase().replace(/_/g,"-");return Object.values(k).indexOf(se)>=0?se:k.UNKNOWN})(S.status);l(new L(O,S.message))}else l(new L(k.UNKNOWN,"Server responded with status "+u.getStatus()))}else l(new L(k.UNAVAILABLE,"Connection failed."));break;default:$(9055,{_n:e,streamId:o,an:u.getLastErrorCode(),un:u.getLastError()})}}finally{M(qe,`RPC '${e}' ${o} completed.`)}}));const f=JSON.stringify(s);M(qe,`RPC '${e}' ${o} sending request:`,s),u.send(t,"POST",f,r,15)}))}cn(e,t,r){const s=fl(),i=[this.Mt,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=this.createWebChannelTransport(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},l=this.longPollingOptions.timeoutSeconds;l!==void 0&&(c.longPollingTimeout=Math.round(1e3*l)),this.useFetchStreams&&(c.useFetchStreams=!0),this.kt(c.initMessageHeaders,t,r),c.encodeInitMessageHeaders=!0;const u=i.join("");M(qe,`Creating RPC '${e}' stream ${s}: ${u}`,c);const f=o.createWebChannel(u,c);this.En(f);let p=!1,m=!1;const A=new ZR({Kt:S=>{m?M(qe,`Not sending because RPC '${e}' stream ${s} is closed:`,S):(p||(M(qe,`Opening RPC '${e}' stream ${s} transport.`),f.open(),p=!0),M(qe,`RPC '${e}' stream ${s} sending:`,S),f.send(S))},Wt:()=>f.close()});return bs(f,xs.EventType.OPEN,(()=>{m||(M(qe,`RPC '${e}' stream ${s} transport opened.`),A.Zt())})),bs(f,xs.EventType.CLOSE,(()=>{m||(m=!0,M(qe,`RPC '${e}' stream ${s} transport closed`),A.en(),this.hn(f))})),bs(f,xs.EventType.ERROR,(S=>{m||(m=!0,wt(qe,`RPC '${e}' stream ${s} transport errored. Name:`,S.name,"Message:",S.message),A.en(new L(k.UNAVAILABLE,"The operation could not be completed")))})),bs(f,xs.EventType.MESSAGE,(S=>{var O;if(!m){const F=S.data[0];B(!!F,16349);const H=F,se=(H==null?void 0:H.error)||((O=H[0])==null?void 0:O.error);if(se){M(qe,`RPC '${e}' stream ${s} received error:`,se);const fe=se.status;let Je=(function(w){const g=ye[w];if(g!==void 0)return Gm(g)})(fe),Fe=se.message;fe==="NOT_FOUND"&&Fe.includes("database")&&Fe.includes("does not exist")&&Fe.includes(this.databaseId.database)&&wt(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),Je===void 0&&(Je=k.INTERNAL,Fe="Unknown error status: "+fe+" with message "+se.message),m=!0,A.en(new L(Je,Fe)),f.close()}else M(qe,`RPC '${e}' stream ${s} received:`,F),A.tn(F)}})),br.rn(),setTimeout((()=>{A.Xt()}),0),A}terminate(){this.nn.forEach((e=>e.close())),this.nn=[]}En(e){this.nn.push(e)}hn(e){this.nn=this.nn.filter((t=>t===e))}kt(e,t,r){super.kt(e,t,r),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return ym()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eS(n){return new br(n)}br.sn=!1;class cg{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Tn=e,this.timerId=t,this.Pn=r,this.Rn=s,this.In=i,this.An=0,this.Vn=null,this.dn=Date.now(),this.reset()}reset(){this.An=0}fn(){this.An=this.In}mn(e){this.cancel();const t=Math.floor(this.An+this.pn()),r=Math.max(0,Date.now()-this.dn),s=Math.max(0,t-r);s>0&&M("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.An} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.Vn=this.Tn.enqueueAfterDelay(this.timerId,s,(()=>(this.dn=Date.now(),e()))),this.An*=this.Rn,this.An<this.Pn&&(this.An=this.Pn),this.An>this.In&&(this.An=this.In)}gn(){this.Vn!==null&&(this.Vn.skipDelay(),this.Vn=null)}cancel(){this.Vn!==null&&(this.Vn.cancel(),this.Vn=null)}pn(){return(Math.random()-.5)*this.An}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lf="PersistentStream";class tS{constructor(e,t,r,s,i,o,c,l){this.Tn=e,this.yn=r,this.wn=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.bn=0,this.vn=null,this.Sn=null,this.stream=null,this.Dn=0,this.xn=new cg(e,t)}Cn(){return this.state===1||this.state===5||this.Fn()}Fn(){return this.state===2||this.state===3}start(){this.Dn=0,this.state!==4?this.auth():this.On()}async stop(){this.Cn()&&await this.close(0)}Mn(){this.state=0,this.xn.reset()}Nn(){this.Fn()&&this.vn===null&&(this.vn=this.Tn.enqueueAfterDelay(this.yn,6e4,(()=>this.Ln())))}Bn(e){this.Un(),this.stream.send(e)}async Ln(){if(this.Fn())return this.close(0)}Un(){this.vn&&(this.vn.cancel(),this.vn=null)}kn(){this.Sn&&(this.Sn.cancel(),this.Sn=null)}async close(e,t){this.Un(),this.kn(),this.xn.cancel(),this.bn++,e!==4?this.xn.reset():t&&t.code===k.RESOURCE_EXHAUSTED?(Kt(t.toString()),Kt("Using maximum backoff delay to prevent overloading the backend."),this.xn.fn()):t&&t.code===k.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.qn(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Ht(t)}qn(){}auth(){this.state=1;const e=this.$n(this.bn),t=this.bn;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.bn===t&&this.Kn(r,s)}),(r=>{e((()=>{const s=new L(k.UNKNOWN,"Fetching auth token failed: "+r.message);return this.Wn(s)}))}))}Kn(e,t){const r=this.$n(this.bn);this.stream=this.Qn(e,t),this.stream.Qt((()=>{r((()=>this.listener.Qt()))})),this.stream.zt((()=>{r((()=>(this.state=2,this.Sn=this.Tn.enqueueAfterDelay(this.wn,1e4,(()=>(this.Fn()&&(this.state=3),Promise.resolve()))),this.listener.zt())))})),this.stream.Ht((s=>{r((()=>this.Wn(s)))})),this.stream.onMessage((s=>{r((()=>++this.Dn==1?this.Gn(s):this.onNext(s)))}))}On(){this.state=5,this.xn.mn((async()=>{this.state=0,this.start()}))}Wn(e){return M(Lf,`close with error: ${e}`),this.stream=null,this.close(4,e)}$n(e){return t=>{this.Tn.enqueueAndForget((()=>this.bn===e?t():(M(Lf,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class nS extends tS{constructor(e,t,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}Qn(e,t){return this.connection.cn("Listen",e,t)}Gn(e){return this.onNext(e)}onNext(e){this.xn.reset();const t=BR(this.serializer,e),r=(function(i){if(!("targetChange"in i))return z.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?z.min():o.readTime?Pr(o.readTime):z.min()})(e);return this.listener.zn(t,r)}jn(e){const t={};t.database=xf(this.serializer),t.addTarget=(function(i,o){let c;const l=o.target;if(c=Gn(l)?{pipelineQuery:zR(i,l)}:jm(l)?{documents:qR(i,l)}:{query:$R(i,l).yt},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=Jm(i,o.resumeToken);const u=hl(i,o.expectedCount);u!==null&&(c.expectedCount=u)}else if(o.snapshotVersion.compareTo(z.min())>0){c.readTime=ea(i,o.snapshotVersion.toTimestamp());const u=hl(i,o.expectedCount);u!==null&&(c.expectedCount=u)}return c})(this.serializer,e);const r=jR(this.serializer,e);r&&(t.labels=r),this.Bn(t)}Hn(e){const t={};t.database=xf(this.serializer),t.removeTarget=e,this.Bn(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rS{}class sS extends rS{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.tr=!1}nr(){if(this.tr)throw new L(k.FAILED_PRECONDITION,"The client has already been terminated.")}Bt(e,t,r,s){return this.nr(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,o])=>this.connection.Bt(e,dl(t,r),s,i,o))).catch((i=>{throw i.name==="FirebaseError"?(i.code===k.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new L(k.UNKNOWN,i.toString())}))}$t(e,t,r,s,i){return this.nr(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,c])=>this.connection.$t(e,dl(t,r),s,o,c,i))).catch((o=>{throw o.name==="FirebaseError"?(o.code===k.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new L(k.UNKNOWN,o.toString())}))}terminate(){this.tr=!0,this.connection.terminate()}}function iS(n,e,t,r){return new sS(n,e,t,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oS="ComponentProvider",Mf=new Map;function aS(n,e,t,r,s){return new eR(n,e,t,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,ag(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ff={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},lg=41943040;class Ze{static withCacheSize(e){return new Ze(e,Ze.DEFAULT_COLLECTION_PERCENTILE,Ze.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}Ze.DEFAULT_COLLECTION_PERCENTILE=10,Ze.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Ze.DEFAULT=new Ze(lg,Ze.DEFAULT_COLLECTION_PERCENTILE,Ze.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Ze.DISABLED=new Ze(-1,0,0);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uf="LruGarbageCollector",cS=1048576;function Bf([n,e],[t,r]){const s=X(n,t);return s===0?X(e,r):s}class lS{constructor(e){this.rr=e,this.buffer=new we(Bf),this.ir=0}sr(){return++this.ir}_r(e){const t=[e,this.sr()];if(this.buffer.size<this.rr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();Bf(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class uS{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.ur(6e4)}stop(){this.ar&&(this.ar.cancel(),this.ar=null)}get started(){return this.ar!==null}ur(e){M(Uf,`Garbage collection scheduled in ${e}ms`),this.ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){es(t)?M(Uf,"Ignoring IndexedDB error during garbage collection: ",t):await Ca(t)}await this.ur(3e5)}))}}class hS{constructor(e,t){this.cr=e,this.params=t}calculateTargetCount(e,t){return this.cr.lr(e).next((r=>Math.floor(t/100*r)))}nthSequenceNumber(e,t){if(t===0)return N.resolve(Ra.ce);const r=new lS(t);return this.cr.forEachTarget(e,(s=>r._r(s.sequenceNumber))).next((()=>this.cr.Er(e,(s=>r._r(s))))).next((()=>r.maxValue))}removeTargets(e,t,r){return this.cr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.cr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(M("LruGarbageCollector","Garbage collection skipped; disabled"),N.resolve(Ff)):this.getCacheSize(e).next((r=>r<this.params.cacheSizeCollectionThreshold?(M("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Ff):this.hr(e,t)))}getCacheSize(e){return this.cr.getCacheSize(e)}hr(e,t){let r,s,i,o,c,l,u;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((p=>(p>this.params.maximumSequenceNumbersToCollect?(M("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,o=Date.now(),this.nthSequenceNumber(e,s)))).next((p=>(r=p,c=Date.now(),this.removeTargets(e,r,t)))).next((p=>(i=p,l=Date.now(),this.removeOrphanedDocuments(e,r)))).next((p=>(u=Date.now(),gr()<=Y.DEBUG&&M("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${s} in `+(c-o)+`ms
	Removed ${i} targets in `+(l-c)+`ms
	Removed ${p} documents in `+(u-l)+`ms
Total Duration: ${u-f}ms`),N.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p}))))}}function dS(n,e){return new hS(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ug="firestore.googleapis.com",qf=!0;class $f{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new L(k.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=ug,this.ssl=qf}else this.host=e.host,this.ssl=e.ssl??qf;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=lg;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<cS)throw new L(k.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}BC("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=ag(e.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new L(k.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new L(k.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new L(k.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Da{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new $f({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new L(k.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new L(k.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new $f(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new NC;switch(r.type){case"firstParty":return new DC(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new L(k.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const r=Mf.get(t);r&&(M(oS,"Removing Datastore"),Mf.delete(t),r.terminate())})(this),Promise.resolve()}}function fS(n,e,t,r={}){var u;n=ai(n,Da);const s=ar(e),i=n._getSettings(),o={...i,emulatorOptions:n._getEmulatorOptions()},c=`${e}:${t}`;s&&Al(`https://${c}`),i.host!==ug&&i.host!==c&&wt("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const l={...i,host:c,ssl:s,emulatorOptions:r};if(!Cn(l,o)&&(n._setSettings(l),r.mockUserToken)){let f,p;if(typeof r.mockUserToken=="string")f=r.mockUserToken,p=$e.MOCK_USER;else{f=_p(r.mockUserToken,(u=n._app)==null?void 0:u.options.projectId);const m=r.mockUserToken.sub||r.mockUserToken.user_id;if(!m)throw new L(k.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new $e(m)}n._authCredentials=new kC(new vm(f,p))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ns{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new ns(this.firestore,e,this._query)}}class Te{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new wn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Te(this.firestore,e,this._key)}toJSON(){return{type:Te._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(ki(t,Te._jsonSchema))return new Te(e,r||null,new U(re.fromString(t.referencePath)))}}Te._jsonSchemaVersion="firestore/documentReference/1.0",Te._jsonSchema={type:ve("string",Te._jsonSchemaVersion),referencePath:ve("string")};class wn extends ns{constructor(e,t,r){super(e,t,wu(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Te(this.firestore,null,new U(e))}withConverter(e){return new wn(this.firestore,e,this._path)}}function bN(n,e,...t){if(n=ue(n),Tm("collection","path",e),n instanceof Da){const r=re.fromString(e,...t);return ff(r),new wn(n,null,r)}{if(!(n instanceof Te||n instanceof wn))throw new L(k.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(re.fromString(e,...t));return ff(r),new wn(n.firestore,null,r)}}function NN(n,e,...t){if(n=ue(n),arguments.length===1&&(e=mu.newId()),Tm("doc","path",e),n instanceof Da){const r=re.fromString(e,...t);return df(r),new Te(n,null,new U(r))}{if(!(n instanceof Te||n instanceof wn))throw new L(k.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(re.fromString(e,...t));return df(r),new Te(n.firestore,n instanceof wn?n.converter:null,new U(r))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tt{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0})(this._values,e._values)}toJSON(){return{type:tt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(ki(e,tt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new tt(e.vectorValues);throw new L(k.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}tt._jsonSchemaVersion="firestore/vectorValue/1.0",tt._jsonSchema={type:ve("string",tt._jsonSchemaVersion),vectorValues:ve("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pS=/^__.*__$/;function hg(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw $(40011,{dataSource:n})}}class Pu{constructor(e,t,r,s,i,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.validatePath(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(e){return new Pu({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePathSegment(e),r}childContextForFieldPath(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePath(),r}childContextForArray(e){return this.contextWith({path:void 0,arrayElement:!0})}createError(e){return ta(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}validatePath(){if(this.path)for(let e=0;e<this.path.length;e++)this.validatePathSegment(this.path.get(e))}validatePathSegment(e){if(e.length===0)throw this.createError("Document fields must not be empty");if(hg(this.dataSource)&&pS.test(e))throw this.createError('Document fields cannot begin and end with "__"')}}class _S{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||xa(e)}createContext(e,t,r,s=!1){return new Pu({dataSource:e,methodName:t,targetDoc:r,path:Ve.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function mS(n){const e=n._freezeSettings(),t=xa(n._databaseId);return new _S(n._databaseId,!!e.ignoreUndefinedProperties,t)}function gS(n,e,t,r=!1){return jr(t,n.createContext(r?4:3,e))}function jr(n,e,t){if(dg(n=ue(n)))return ES("Unsupported field value:",e,n),yS(n,e);if(n instanceof og)return(function(s,i){if(!hg(i.dataSource))throw i.createError(`${s._methodName}() can only be used with update() and set()`);if(!i.path)throw i.createError(`${s._methodName}() is not currently supported inside arrays`);const o=s._toFieldTransform(i);o&&i.fieldTransforms.push(o)})(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.createError("Nested arrays are not supported");return(function(s,i){const o=[];let c=0;for(const l of s){let u=jr(l,i.childContextForArray(c));u==null&&(u={nullValue:"NULL_VALUE"}),o.push(u),c++}return{arrayValue:{values:o}}})(n,e)}return(function(s,i,o){if((s=ue(s))===null)return{nullValue:"NULL_VALUE"};if(typeof s=="number")return yu(i.serializer,s,o);if(typeof s=="boolean")return{booleanValue:s};if(typeof s=="string")return{stringValue:s};if(s instanceof Date){const c=he.fromDate(s);return{timestampValue:ea(i.serializer,c)}}if(s instanceof he){const c=new he(s.seconds,1e3*Math.floor(s.nanoseconds/1e3));return{timestampValue:ea(i.serializer,c)}}if(s instanceof xt)return{geoPointValue:{latitude:s.latitude,longitude:s.longitude}};if(s instanceof ht)return{bytesValue:Jm(i.serializer,s._byteString)};if(s instanceof Te){const c=i.databaseId,l=s.firestore._databaseId;if(!l.isEqual(c))throw i.createError(`Document reference is for database ${l.projectId}/${l.database} but should be for database ${c.projectId}/${c.database}`);return{referenceValue:Ru(s.firestore._databaseId||i.databaseId,s._key.path)}}if(s instanceof tt)return(function(l,u){const f=l instanceof tt?l.toArray():l;return{mapValue:{fields:{[bm]:{stringValue:Nm},[hi]:{arrayValue:{values:f.map((m=>{if(typeof m!="number")throw u.createError("VectorValues must only contain numeric values.");return ba(u.serializer,m)}))}}}}}})(s,i);if(sg(s))return s._toProto(i.serializer);throw i.createError(`Unsupported field value: ${Aa(s)}`)})(n,e,t)}function yS(n,e){const t={};return Im(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):ts(n,((r,s)=>{const i=jr(s,e.childContextForField(r));i!=null&&(t[r]=i)})),{mapValue:{fields:t}}}function dg(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof he||n instanceof xt||n instanceof ht||n instanceof Te||n instanceof og||n instanceof tt||sg(n))}function ES(n,e,t){if(!dg(t)||!Ni(t)){const r=Aa(t);throw r==="an object"?e.createError(n+" a custom object"):e.createError(n+" "+r)}}function Oa(n,e,t){if((e=ue(e))instanceof Su)return e._internalPath;if(typeof e=="string")return TS(n,e);throw ta("Field path arguments must be of type string or ",n,!1,void 0,t)}const vS=new RegExp("[~\\*/\\[\\]]");function TS(n,e,t){if(e.search(vS)>=0)throw ta(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Su(...e.split("."))._internalPath}catch{throw ta(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function ta(n,e,t,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(i||o)&&(l+=" (found",i&&(l+=` in field ${r}`),o&&(l+=` in document ${s}`),l+=")"),new L(k.INVALID_ARGUMENT,c+n+l)}function fg(n){return typeof n._readUserData=="function"}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ze{constructor(e){this.optionDefinitions=e}_getKnownOptions(e,t){const r=gt.empty();for(const s in this.optionDefinitions)if(this.optionDefinitions.hasOwnProperty(s)){const i=this.optionDefinitions[s];if(s in e){const o=e[s];let c;i.nestedOptions&&Ni(o)?c={mapValue:{fields:new ze(i.nestedOptions).getOptionsProto(t,o)}}:o&&(c=jr(o,t)??void 0),c&&r.set(Ve.fromServerFormat(i.serverName),c)}}return r}getOptionsProto(e,t,r){const s=this._getKnownOptions(t,e);if(r){const i=new Map(XC(r,((o,c)=>[Ve.fromServerFormat(c),o!==void 0?jr(o,e):null])));s.setAll(i)}return s.value.mapValue.fields??{}}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wS(n){return typeof n=="object"&&n!==null&&!!("nullValue"in n&&(n.nullValue===null||n.nullValue==="NULL_VALUE")||"booleanValue"in n&&(n.booleanValue===null||typeof n.booleanValue=="boolean")||"integerValue"in n&&(n.integerValue===null||typeof n.integerValue=="number"||typeof n.integerValue=="string")||"doubleValue"in n&&(n.doubleValue===null||typeof n.doubleValue=="number")||"timestampValue"in n&&(n.timestampValue===null||(function(t){return typeof t=="object"&&t!==null&&"seconds"in t&&(t.seconds===null||typeof t.seconds=="number"||typeof t.seconds=="string")&&"nanos"in t&&(t.nanos===null||typeof t.nanos=="number")})(n.timestampValue))||"stringValue"in n&&(n.stringValue===null||typeof n.stringValue=="string")||"bytesValue"in n&&(n.bytesValue===null||n.bytesValue instanceof Uint8Array)||"referenceValue"in n&&(n.referenceValue===null||typeof n.referenceValue=="string")||"geoPointValue"in n&&(n.geoPointValue===null||(function(t){return typeof t=="object"&&t!==null&&"latitude"in t&&(t.latitude===null||typeof t.latitude=="number")&&"longitude"in t&&(t.longitude===null||typeof t.longitude=="number")})(n.geoPointValue))||"arrayValue"in n&&(n.arrayValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("values"in t)||t.values!==null&&!Array.isArray(t.values))})(n.arrayValue))||"mapValue"in n&&(n.mapValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("fields"in t)||t.fields!==null&&!Ni(t.fields))})(n.mapValue))||"fieldReferenceValue"in n&&(n.fieldReferenceValue===null||typeof n.fieldReferenceValue=="string")||"functionValue"in n&&(n.functionValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("name"in t)||t.name!==null&&typeof t.name!="string"||!("args"in t)||t.args!==null&&!Array.isArray(t.args))})(n.functionValue))||"pipelineValue"in n&&(n.pipelineValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("stages"in t)||t.stages!==null&&!Array.isArray(t.stages))})(n.pipelineValue)))}function IS(n){return new tt(n)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function V(n){let e;return n instanceof dr?n:(e=Ni(n)?PS(n):n instanceof Array?bS(n):pg(n,void 0),e)}function Nc(n){if(n instanceof dr)return n;if(n instanceof tt)return pi(n);if(Array.isArray(n))return pi(IS(n));throw new Error("Unsupported value: "+typeof n)}function bu(n){return QC(n)?vo(n):V(n)}class dr{constructor(){this._protoValueType="ProtoValue"}add(e){return new b("add",[this,V(e)],"add")}asBoolean(){if(this instanceof Dn)return this;if(this instanceof ss)return new mg(this);if(this instanceof rs)return new SS(this);if(this instanceof b)return new _g(this);throw new L("invalid-argument",`Conversion of type ${typeof this} to BooleanExpression not supported.`)}subtract(e){return new b("subtract",[this,V(e)],"subtract")}multiply(e){return new b("multiply",[this,V(e)],"multiply")}divide(e){return new b("divide",[this,V(e)],"divide")}mod(e){return new b("mod",[this,V(e)],"mod")}equal(e){return new b("equal",[this,V(e)],"equal").asBoolean()}notEqual(e){return new b("not_equal",[this,V(e)],"notEqual").asBoolean()}lessThan(e){return new b("less_than",[this,V(e)],"lessThan").asBoolean()}lessThanOrEqual(e){return new b("less_than_or_equal",[this,V(e)],"lessThanOrEqual").asBoolean()}greaterThan(e){return new b("greater_than",[this,V(e)],"greaterThan").asBoolean()}greaterThanOrEqual(e){return new b("greater_than_or_equal",[this,V(e)],"greaterThanOrEqual").asBoolean()}arrayConcat(e,...t){const r=[e,...t].map((s=>V(s)));return new b("array_concat",[this,...r],"arrayConcat")}arrayContains(e){return new b("array_contains",[this,V(e)],"arrayContains").asBoolean()}arrayContainsAll(e){const t=Array.isArray(e)?new Os(e.map(V),"arrayContainsAll"):e;return new b("array_contains_all",[this,t],"arrayContainsAll").asBoolean()}arrayContainsAny(e){const t=Array.isArray(e)?new Os(e.map(V),"arrayContainsAny"):e;return new b("array_contains_any",[this,t],"arrayContainsAny").asBoolean()}arrayReverse(){return new b("array_reverse",[this])}arrayLength(){return new b("array_length",[this],"arrayLength")}equalAny(e){const t=Array.isArray(e)?new Os(e.map(V),"equalAny"):e;return new b("equal_any",[this,t],"equalAny").asBoolean()}notEqualAny(e){const t=Array.isArray(e)?new Os(e.map(V),"notEqualAny"):e;return new b("not_equal_any",[this,t],"notEqualAny").asBoolean()}exists(){return new b("exists",[this],"exists").asBoolean()}charLength(){return new b("char_length",[this],"charLength")}like(e){return new b("like",[this,V(e)],"like").asBoolean()}regexContains(e){return new b("regex_contains",[this,V(e)],"regexContains").asBoolean()}regexFind(e){return new b("regex_find",[this,V(e)],"regexFind")}regexFindAll(e){return new b("regex_find_all",[this,V(e)],"regexFindAll")}regexMatch(e){return new b("regex_match",[this,V(e)],"regexMatch").asBoolean()}stringContains(e){return new b("string_contains",[this,V(e)],"stringContains").asBoolean()}startsWith(e){return new b("starts_with",[this,V(e)],"startsWith").asBoolean()}endsWith(e){return new b("ends_with",[this,V(e)],"endsWith").asBoolean()}toLower(){return new b("to_lower",[this],"toLower")}toUpper(){return new b("to_upper",[this],"toUpper")}trim(e){const t=[this];return e&&t.push(V(e)),new b("trim",t,"trim")}ltrim(e){const t=[this];return e&&t.push(V(e)),new b("ltrim",t,"ltrim")}rtrim(e){const t=[this];return e&&t.push(V(e)),new b("rtrim",t,"rtrim")}type(){return new b("type",[this])}isType(e){return new b("is_type",[this,pi(e)],"isType").asBoolean()}stringConcat(e,...t){const r=[e,...t].map(V);return new b("string_concat",[this,...r],"stringConcat")}stringIndexOf(e){return new b("string_index_of",[this,V(e)],"stringIndexOf")}stringRepeat(e){return new b("string_repeat",[this,V(e)],"stringRepeat")}stringReplaceAll(e,t){return new b("string_replace_all",[this,V(e),V(t)],"stringReplaceAll")}stringReplaceOne(e,t){return new b("string_replace_one",[this,V(e),V(t)],"stringReplaceOne")}concat(e,...t){const r=[e,...t].map(V);return new b("concat",[this,...r],"concat")}reverse(){return new b("reverse",[this],"reverse")}arrayFilter(e,t){return new b("array_filter",[this,V(e),t],"arrayFilter")}arrayTransform(e,t){return new b("array_transform",[this,V(e),t],"arrayTransform")}arrayTransformWithIndex(e,t,r){return new b("array_transform",[this,V(e),V(t),r],"arrayTransformWithIndex")}arraySlice(e,t){const r=[this,V(e)];return t!==void 0&&r.push(V(t)),new b("array_slice",r,"arraySlice")}arrayFirst(){return new b("array_first",[this],"arrayFirst")}arrayFirstN(e){return new b("array_first_n",[this,V(e)],"arrayFirstN")}arrayLast(){return new b("array_last",[this],"arrayLast")}arrayLastN(e){return new b("array_last_n",[this,V(e)],"arrayLastN")}arrayMaximum(){return new b("maximum",[this],"arrayMaximum")}arrayMaximumN(e){return new b("maximum_n",[this,V(e)],"arrayMaximumN")}arrayMinimum(){return new b("minimum",[this],"arrayMinimum")}arrayMinimumN(e){return new b("minimum_n",[this,V(e)],"arrayMinimumN")}arrayIndexOf(e){return new b("array_index_of",[this,V(e),V("first")],"arrayIndexOf")}arrayLastIndexOf(e){return new b("array_index_of",[this,V(e),V("last")],"arrayLastIndexOf")}arrayIndexOfAll(e){return new b("array_index_of_all",[this,V(e)],"arrayIndexOfAll")}byteLength(){return new b("byte_length",[this],"byteLength")}ceil(){return new b("ceil",[this])}floor(){return new b("floor",[this])}abs(){return new b("abs",[this])}exp(){return new b("exp",[this])}mapGet(e){return new b("map_get",[this,pi(e)],"mapGet")}mapSet(e,t,...r){const s=[this,V(e),V(t),...r.map(V)];return new b("map_set",s,"mapSet")}mapKeys(){return new b("map_keys",[this],"mapKeys")}mapValues(){return new b("map_values",[this],"mapValues")}mapEntries(){return new b("map_entries",[this],"mapEntries")}getField(e){return new b("get_field",[this,V(e)],"get_field")}count(){return ot._create("count",[this],"count")}sum(){return ot._create("sum",[this],"sum")}average(){return ot._create("average",[this],"average")}minimum(){return ot._create("minimum",[this],"minimum")}maximum(){return ot._create("maximum",[this],"maximum")}first(){return ot._create("first",[this],"first")}last(){return ot._create("last",[this],"last")}arrayAgg(){return ot._create("array_agg",[this],"arrayAgg")}arrayAggDistinct(){return ot._create("array_agg_distinct",[this],"arrayAggDistinct")}countDistinct(){return ot._create("count_distinct",[this],"countDistinct")}logicalMaximum(e,...t){const r=[e,...t];return new b("maximum",[this,...r.map(V)],"logicalMaximum")}logicalMinimum(e,...t){const r=[e,...t];return new b("minimum",[this,...r.map(V)],"minimum")}vectorLength(){return new b("vector_length",[this],"vectorLength")}cosineDistance(e){return new b("cosine_distance",[this,Nc(e)],"cosineDistance")}dotProduct(e){return new b("dot_product",[this,Nc(e)],"dotProduct")}euclideanDistance(e){return new b("euclidean_distance",[this,Nc(e)],"euclideanDistance")}unixMicrosToTimestamp(){return new b("unix_micros_to_timestamp",[this],"unixMicrosToTimestamp")}timestampToUnixMicros(){return new b("timestamp_to_unix_micros",[this],"timestampToUnixMicros")}unixMillisToTimestamp(){return new b("unix_millis_to_timestamp",[this],"unixMillisToTimestamp")}timestampToUnixMillis(){return new b("timestamp_to_unix_millis",[this],"timestampToUnixMillis")}unixSecondsToTimestamp(){return new b("unix_seconds_to_timestamp",[this],"unixSecondsToTimestamp")}timestampToUnixSeconds(){return new b("timestamp_to_unix_seconds",[this],"timestampToUnixSeconds")}timestampAdd(e,t){return new b("timestamp_add",[this,V(e),V(t)],"timestampAdd")}timestampSubtract(e,t){return new b("timestamp_subtract",[this,V(e),V(t)],"timestampSubtract")}timestampDiff(e,t){return new b("timestamp_diff",[this,bu(e),V(t)],"timestampDiff")}timestampExtract(e,t){const r=[this,V(e)];return t&&r.push(V(t)),new b("timestamp_extract",r,"timestampExtract")}documentId(){return new b("document_id",[this],"documentId")}parent(){return new b("parent",[this],"parent")}substring(e,t){const r=V(e);return new b("substring",t===void 0?[this,r]:[this,r,V(t)],"substring")}arrayGet(e){return new b("array_get",[this,V(e)],"arrayGet")}isError(){return new b("is_error",[this],"isError").asBoolean()}ifError(e){const t=new b("if_error",[this,V(e)],"ifError");return e instanceof Dn?t.asBoolean():t}isAbsent(){return new b("is_absent",[this],"isAbsent").asBoolean()}mapRemove(e){return new b("map_remove",[this,V(e)],"mapRemove")}mapMerge(e,...t){const r=V(e),s=t.map(V);return new b("map_merge",[this,r,...s],"mapMerge")}pow(e){return new b("pow",[this,V(e)])}trunc(e){return e===void 0?new b("trunc",[this]):new b("trunc",[this,V(e)],"trunc")}round(e){return e===void 0?new b("round",[this]):new b("round",[this,V(e)],"round")}collectionId(){return new b("collection_id",[this])}length(){return new b("length",[this])}ln(){return new b("ln",[this])}sqrt(){return new b("sqrt",[this])}stringReverse(){return new b("string_reverse",[this])}ifAbsent(e){return new b("if_absent",[this,V(e)],"ifAbsent")}ifNull(e){return new b("if_null",[this,V(e)],"ifNull")}coalesce(e,...t){return new b("coalesce",[this,V(e),...t.map(V)],"coalesce")}join(e){return new b("join",[this,V(e)],"join")}log10(){return new b("log10",[this])}arraySum(){return new b("sum",[this])}split(e){return new b("split",[this,V(e)])}timestampTruncate(e,t){const r=[this,V(e)];return t&&r.push(V(t)),new b("timestamp_trunc",r)}ascending(){return NS(this)}descending(){return kS(this)}as(e){return new CS(this,e,"as")}}class ot{constructor(e,t){this.name=e,this.params=t,this.exprType="AggregateFunction",this._protoValueType="ProtoValue"}static _create(e,t,r){const s=new ot(e,t);return s._methodName=r,s}as(e){return new AS(this,e,"as")}_toProto(e){return{functionValue:{name:this.name,args:this.params.map((t=>t._toProto(e)))}}}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach((t=>t._readUserData(e)))}}class AS{constructor(e,t,r){this.aggregate=e,this.alias=t,this._methodName=r}_readUserData(e){this.aggregate._readUserData(e)}}class CS{constructor(e,t,r){this.expr=e,this.alias=t,this._methodName=r,this.exprType="AliasedExpression",this.selectable=!0}_readUserData(e){this.expr._readUserData(e)}}class Os extends dr{constructor(e,t){super(),this.Rr=e,this._methodName=t,this.expressionType="ListOfExpressions"}_toProto(e){return{arrayValue:{values:this.Rr.map((t=>t._toProto(e)))}}}_readUserData(e){this.Rr.forEach((t=>t._readUserData(e)))}}class rs extends dr{constructor(e,t){super(),this.fieldPath=e,this._methodName=t,this.expressionType="Field",this.selectable=!0}get _fieldPath(){return this.fieldPath}get fieldName(){return this.fieldPath.canonicalString()}get alias(){return this.fieldName}get expr(){return this}geoDistance(e){return new b("geo_distance",[this,V(e)],"geoDistance")}_toProto(e){return{fieldReferenceValue:this.fieldPath.canonicalString()}}_readUserData(e){}}function vo(n){return RS(n,"field")}function RS(n,e){return new rs(typeof n=="string"?Pt===n?QR()._internalPath:Oa("field",n):n._internalPath,e)}class ss extends dr{constructor(e,t){super(),this.value=e,this._methodName=t,this.expressionType="Constant"}static _fromProto(e){const t=new ss(e,void 0);return t._protoValue=e,t}_toProto(e){return B(this._protoValue!==void 0,237),this._protoValue}_getValue(){return this._protoValue}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,wS(this._protoValue)||(this._protoValue=jr(this.value,e))}}function pi(n,e){return pg(n,"constant")}function pg(n,e){const t=new ss(n,e);return typeof n=="boolean"?new mg(t):t}class b extends dr{constructor(e,t,r,s){super(),this.name=e,this.params=t,this.expressionType="Function",this._optionsProto=void 0,r!==void 0&&(this._methodName=r),s!==void 0&&(this._options=s)}get _optionsUtil(){return new ze({})}_toProto(e){const t={functionValue:{name:this.name,args:this.params.map((r=>r._toProto(e)))}};return this._optionsProto&&(t.functionValue.options=this._optionsProto),t}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach((t=>t._readUserData(e))),this._options&&(this._optionsProto=this._optionsUtil.getOptionsProto(e,this._options))}}class Dn extends dr{get _methodName(){return this._expr._methodName}countIf(){return ot._create("count_if",[this],"countIf")}not(){return new b("not",[this],"not").asBoolean()}conditional(e,t){return new b("conditional",[this,e,t],"conditional")}ifError(e){const t=V(e),r=new b("if_error",[this,t],"ifError");return t instanceof Dn?r.asBoolean():r}_toProto(e){return this._expr._toProto(e)}_readUserData(e){this._expr._readUserData(e)}}class _g extends Dn{constructor(e){super(),this._expr=e,this.expressionType="Function"}}class mg extends Dn{constructor(e){super(),this._expr=e,this.expressionType="Constant"}_getValue(){return this._expr._getValue()}}class SS extends Dn{constructor(e){super(),this._expr=e,this.expressionType="Field"}}function PS(n,e){const t=[];for(const r in n)if(Object.prototype.hasOwnProperty.call(n,r)){const s=n[r];t.push(pi(r)),t.push(V(s))}return new b("map",t,"map")}function bS(n){return(function(t,r){return new b("array",t.map((s=>V(s))),r)})(n,"array")}function NS(n){return new gg(bu(n),"ascending","ascending")}function kS(n){return new gg(bu(n),"descending","descending")}class gg{constructor(e,t,r){this.expr=e,this.direction=t,this._methodName=r,this._protoValueType="ProtoValue"}_toProto(e){return{mapValue:{fields:{direction:ig(this.direction),expression:this.expr._toProto(e)}}}}_readUserData(e){this.expr._readUserData(e)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(e){this.optionsProto=void 0,{rawOptions:this.rawOptions,...this.knownOptions}=e}_readUserData(e){this.optionsProto=this._optionsUtil.getOptionsProto(e,this.knownOptions,this.rawOptions)}_toProto(e){return{name:this._name,options:this.optionsProto}}}class yg extends ut{get _name(){return"add_fields"}get _optionsUtil(){return new ze({})}constructor(e,t){super(t),this.fields=e}_toProto(e){return{...super._toProto(e),args:[fi(e,this.fields)]}}_readUserData(e){super._readUserData(e),On(this.fields,e)}}class Eg extends ut{get _name(){return"aggregate"}get _optionsUtil(){return new ze({})}constructor(e,t,r){super(r),this.groups=e,this.accumulators=t}_toProto(e){return{...super._toProto(e),args:[fi(e,this.accumulators),fi(e,this.groups)]}}_readUserData(e){super._readUserData(e),On(this.groups,e),On(this.accumulators,e)}}class vg extends ut{get _name(){return"distinct"}get _optionsUtil(){return new ze({})}constructor(e,t){super(t),this.groups=e}_toProto(e){return{...super._toProto(e),args:[fi(e,this.groups)]}}_readUserData(e){super._readUserData(e),On(this.groups,e)}}class La extends ut{get _name(){return"collection"}get _optionsUtil(){return new ze({forceIndex:{serverName:"force_index"}})}constructor(e,t){super(t),this.Vr=e.startsWith("/")?e:"/"+e}_toProto(e){return{...super._toProto(e),args:[{referenceValue:this.Vr}]}}_readUserData(e){super._readUserData(e)}}class Ma extends ut{get _name(){return"collection_group"}get _optionsUtil(){return new ze({forceIndex:{serverName:"force_index"}})}constructor(e,t){super(t),this.collectionId=e}_toProto(e){return{...super._toProto(e),args:[{referenceValue:""},{stringValue:this.collectionId}]}}_readUserData(e){super._readUserData(e)}}class Nu extends ut{get _name(){return"database"}get _optionsUtil(){return new ze({})}_toProto(e){return{...super._toProto(e)}}_readUserData(e){super._readUserData(e)}}class ku extends ut{get _name(){return"documents"}get _optionsUtil(){return new ze({})}constructor(e,t){if(super(t),!e||e.length===0)throw new L(k.INVALID_ARGUMENT,"Empty document paths are not allowed in DocumentsSource");const r=e.map((i=>i.startsWith("/")?i:"/"+i)),s=new Set(r);if(s.size!==r.length)throw new L(k.INVALID_ARGUMENT,"Duplicate document paths are not allowed in DocumentsSource");this.dr=r,this.mr=s}_toProto(e){return{...super._toProto(e),args:this.dr.map((t=>({referenceValue:t})))}}_readUserData(e){super._readUserData(e)}}class Fa extends ut{get _name(){return"where"}get _optionsUtil(){return new ze({})}constructor(e,t){super(t),this.condition=e}_toProto(e){return{...super._toProto(e),args:[this.condition._toProto(e)]}}_readUserData(e){super._readUserData(e),On(this.condition,e)}}class or extends ut{get _name(){return"limit"}get _optionsUtil(){return new ze({})}constructor(e,t){B(!isNaN(e)&&e!==1/0&&e!==-1/0,34860),super(t),this.limit=e}_toProto(e){return{...super._toProto(e),args:[yu(e,this.limit)]}}}class Wf extends ut{get _name(){return"offset"}get _optionsUtil(){return new ze({})}constructor(e,t){super(t),this.offset=e}_toProto(e){return{...super._toProto(e),args:[yu(e,this.offset)]}}}class VS extends ut{get _name(){return"select"}get _optionsUtil(){return new ze({})}constructor(e,t){super(t),this.selections=e}_toProto(e){return{...super._toProto(e),args:[fi(e,this.selections)]}}_readUserData(e){super._readUserData(e),On(this.selections,e)}}class Bt extends ut{get _name(){return"sort"}get _optionsUtil(){return new ze({})}constructor(e,t){super(t),this.orderings=e}_toProto(e){return{...super._toProto(e),args:this.orderings.map((t=>t._toProto(e)))}}_readUserData(e){super._readUserData(e),On(this.orderings,e)}}class Vu extends ut{get _name(){return"replace_with"}get _optionsUtil(){return new ze({})}constructor(e,t){super(t),this.map=e}_toProto(e){return{...super._toProto(e),args:[this.map._toProto(e),ig(Vu.pr)]}}_readUserData(e){super._readUserData(e),On(this.map,e)}}Vu.pr="full_replace";function On(n,e){return fg(n)?n._readUserData(e):Array.isArray(n)?n.forEach((t=>t._readUserData(e))):n instanceof Map?n.forEach((t=>t._readUserData(e))):Object.values(n).forEach((t=>t._readUserData(e))),n}// Copyright 2024 Google LLC* @license
class Ke{constructor(e,t,r){this.serializer=e,this.stages=t,this.listenOptions=r,this.isCorePipeline=!0}getPipelineCollection(){return Ua(this)}getPipelineCollectionGroup(){return xu(this)}getPipelineCollectionId(){return xS(this)}getPipelineDocuments(){return pl(this)}getPipelineFlavor(){return(function(t){let r="exact";return t.stages.forEach(((s,i)=>{s._name!==vg.name&&s._name!==Eg.name||(r="keyless"),s._name===VS.name&&r==="exact"&&(r="augmented"),s._name===yg.name&&i<t.stages.length-1&&r==="exact"&&(r="augmented")})),r})(this)}getPipelineSourceType(){return In(this)}}function In(n){const e=n.stages[0];return e instanceof La||e instanceof Ma||e instanceof Nu||e instanceof ku?e._name:"unknown"}function Ua(n){if(In(n)==="collection")return n.stages[0].Vr}function xu(n){if(In(n)==="collection_group")return n.stages[0].collectionId}function xS(n){switch(In(n)){case"collection":return re.fromString(Ua(n)).lastSegment();case"collection_group":return xu(n);default:return}}function pl(n){if(In(n)==="documents")return n.stages[0].dr}class Ks{constructor(e,t,r,s){this._db=e,this.userDataReader=t,this._userDataWriter=r,this.stages=s}wr(e,t){const r=this.userDataReader.createContext(3,e);return fg(t)?t._readUserData(r):Array.isArray(t)?t.forEach((s=>s._readUserData(r))):t.forEach((s=>s._readUserData(r))),t}where(e){const t=this.stages.map((r=>r));return this.wr("where",e),t.push(new Fa(e,{})),new Ks(this._db,this.userDataReader,this._userDataWriter,t)}limit(e){const t=this.stages.map((r=>r));return t.push(new or(e,{})),new Ks(this._db,this.userDataReader,this._userDataWriter,t)}sort(e,...t){const r=this.stages.map((s=>s));return"orderings"in e?r.push(new Bt(this.wr("sort",e.orderings),{})):r.push(new Bt(this.wr("sort",[e,...t]),{})),new Ks(this._db,this.userDataReader,this._userDataWriter,r)}br(e){return{pipeline:{stages:this.stages.map((t=>t._toProto(e)))}}}}// Copyright 2024 Google LLC* @license
class v{constructor(e,t){this.type=e,this.value=t}static vr(){return new v("ERROR",void 0)}static Sr(){return new v("UNSET",void 0)}static Dr(){return new v("NULL",qr)}static newValue(e){return ct(e)?new v("NULL",qr):(function(r){return!!r&&"booleanValue"in r})(e)?new v("BOOLEAN",e):bt(e)?new v("INT",e):Qn(e)?new v("DOUBLE",e):(function(r){return!!r&&"timestampValue"in r&&!!r.timestampValue})(e)?new v("TIMESTAMP",e):(function(r){return!!r&&"stringValue"in r})(e)?new v("STRING",e):(function(r){return!!r&&"bytesValue"in r})(e)?new v("BYTES",e):e.referenceValue?new v("REFERENCE",e):e.geoPointValue?new v("GEO_POINT",e):Wr(e)?new v("ARRAY",e):Ho(e)?new v("VECTOR",e):Sr(e)?new v("MAP",e):new v("ERROR",void 0)}Cr(){return this.type==="ERROR"||this.type==="UNSET"}Fr(){return this.type==="NULL"}}function Qs(n){if(!n.Cr())return n.value}function Tg(n){return n instanceof Dn?n._expr:n}function q(n){if((n=Tg(n))instanceof rs)return new DS(n);if(n instanceof ss)return new OS(n);if(n instanceof Os)return new LS(n);if(n instanceof b){if(n.name==="add")return new US(n);if(n.name==="subtract")return new BS(n);if(n.name==="multiply")return new qS(n);if(n.name==="divide")return new $S(n);if(n.name==="mod")return new WS(n);if(n.name==="and")return new jS(n);if(n.name==="equal")return new nP(n);if(n.name==="not_equal")return new rP(n);if(n.name==="less_than")return new sP(n);if(n.name==="less_than_or_equal")return new iP(n);if(n.name==="greater_than")return new oP(n);if(n.name==="greater_than_or_equal")return new aP(n);if(n.name==="array_concat")return new cP(n);if(n.name==="array_reverse")return new lP(n);if(n.name==="array_contains")return new uP(n);if(n.name==="array_contains_all")return new hP(n);if(n.name==="array_contains_any")return new dP(n);if(n.name==="array_length")return new fP(n);if(n.name==="array_element")return new pP(n);if(n.name==="equal_any")return new wg(n);if(n.name==="not_equal_any")return new GS(n);if(n.name==="is_nan")return new HS(n);if(n.name==="is_not_nan")return new KS(n);if(n.name==="is_null")return new QS(n);if(n.name==="is_not_null")return new YS(n);if(n.name==="is_error")return new JS(n);if(n.name==="exists")return new XS(n);if(n.name==="not")return new Ba(n);if(n.name==="or")return new zS(n);if(n.name==="xor")return new Du(n);if(n.name==="conditional")return new ZS(n);if(n.name==="maximum")return new eP(n);if(n.name==="minimum")return new tP(n);if(n.name==="reverse")return new _P(n);if(n.name==="replace_first")return new mP(n);if(n.name==="replace_all")return new gP(n);if(n.name==="char_length")return new yP(n);if(n.name==="byte_length")return new EP(n);if(n.name==="like")return new vP(n);if(n.name==="regex_contains")return new TP(n);if(n.name==="regex_match")return new wP(n);if(n.name==="string_contains")return new IP(n);if(n.name==="starts_with")return new AP(n);if(n.name==="ends_with")return new CP(n);if(n.name==="to_lower")return new RP(n);if(n.name==="to_upper")return new SP(n);if(n.name==="trim")return new PP(n);if(n.name==="string_concat")return new bP(n);if(n.name==="map_get")return new NP(n);if(n.name==="cosine_distance")return new kP(n);if(n.name==="dot_product")return new VP(n);if(n.name==="euclidean_distance")return new xP(n);if(n.name==="vector_length")return new DP(n);if(n.name==="unix_micros_to_timestamp")return new UP(n);if(n.name==="timestamp_to_unix_micros")return new $P(n);if(n.name==="unix_millis_to_timestamp")return new BP(n);if(n.name==="timestamp_to_unix_millis")return new WP(n);if(n.name==="unix_seconds_to_timestamp")return new qP(n);if(n.name==="timestamp_to_unix_seconds")return new jP(n);if(n.name==="timestamp_add")return new zP(n);if(n.name==="timestamp_subtract")return new GP(n)}throw new Error(`Unknown Expr : ${n}`)}class DS{constructor(e){this.expr=e}evaluate(e,t){if(this.expr.fieldName===Pt)return v.newValue({referenceValue:FR(e.serializer,t.key)});if(this.expr.fieldName==="__update_time__")return v.newValue({timestampValue:Sc(e.serializer,t.version)});if(this.expr.fieldName==="__create_time__")return v.newValue({timestampValue:Sc(e.serializer,t.createTime)});const r=t.data.field(this.expr._fieldPath);return r?Pa(r)?v.newValue((function(i,o){if(i.serverTimestampBehavior==="estimate")return{timestampValue:Sc(i.serializer,z.fromTimestamp(Br(o)))};if(i.serverTimestampBehavior==="previous"){const c=Vi(o);if(c)return c}return{nullValue:"NULL_VALUE"}})(e,r)):v.newValue(r):v.Sr()}}class OS{constructor(e){this.expr=e}evaluate(e,t){return v.newValue(this.expr._getValue())}}class LS{constructor(e){this.expr=e}evaluate(e,t){const r=this.expr.Rr.map((s=>q(s).evaluate(e,t)));return r.some((s=>s.Cr()))?v.vr():v.newValue({arrayValue:{values:r.map((s=>s.value))}})}}function Me(n){return Qn(n)?Number(n.doubleValue):Number(n.integerValue)}function Dt(n){return BigInt(n.integerValue)}const MS=BigInt("0x7fffffffffffffff"),FS=-BigInt("0x8000000000000000");class Li{constructor(e){this.expr=e}evaluate(e,t){B(this.expr.params.length>=2,24778);const r=q(this.expr.params[0]).evaluate(e,t),s=q(this.expr.params[1]).evaluate(e,t);let i=this.Or(r,s);for(const o of this.expr.params.slice(2)){const c=q(o).evaluate(e,t);i=this.Or(i,c)}return i}Or(e,t){if(e.Cr()||t.Cr())return v.vr();if(e.Fr()||t.Fr())return v.Dr();const r=e.value,s=t.value;if(!Qn(r)&&!bt(r)||!Qn(s)&&!bt(s))return v.vr();if(Qn(r)||Qn(s)){const i=this.Mr(r,s);return i?v.newValue(i):v.vr()}if(bt(r)&&bt(s)){const i=this.Nr(r,s);return i===void 0?v.vr():typeof i=="number"?v.newValue({doubleValue:i}):i<FS||i>MS?v.vr():v.newValue({integerValue:`${i}`})}return v.vr()}}function Qt(n,e){return Ae(n)!==Ae(e)?"TYPE_MISMATCH":st(n)||st(e)?"NOT_EQ":ct(n)&&ct(e)?"EQ":ct(n)||ct(e)?"NULL":Wr(n)&&Wr(e)?(function(r,s){var o,c,l;if(((o=r.values)==null?void 0:o.length)!==((c=s.values)==null?void 0:c.length))return"NOT_EQ";let i=!1;for(let u=0;u<(((l=r.values)==null?void 0:l.length)??0);u++){const f=r.values[u],p=s.values[u];switch(Qt(f,p)){case"EQ":break;case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":i=!0;break;default:$(44609,{Lr:f,Br:p})}}return i?"NULL":"EQ"})(n.arrayValue,e.arrayValue):Ho(n)&&Ho(e)||Sr(n)&&Sr(e)?(function(r,s){const i=r.fields||{},o=s.fields||{};if(zo(i)!==zo(o))return"NOT_EQ";let c=!1;for(const l in i)if(i.hasOwnProperty(l)){if(o[l]===void 0)return"NOT_EQ";switch(Qt(i[l],o[l])){case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":c=!0}}return c?"NULL":"EQ"})(n.mapValue,e.mapValue):(function(r,s){return _t(r,s,{Te:!1,Ee:!0,he:!0})})(n,e)?"EQ":"NOT_EQ"}class US extends Li{Nr(e,t){return Dt(e)+Dt(t)}Mr(e,t){return{doubleValue:Me(e)+Me(t)}}}class BS extends Li{constructor(e){super(e),this.expr=e}Nr(e,t){return Dt(e)-Dt(t)}Mr(e,t){return{doubleValue:Me(e)-Me(t)}}}class qS extends Li{constructor(e){super(e),this.expr=e}Nr(e,t){return Dt(e)*Dt(t)}Mr(e,t){return{doubleValue:Me(e)*Me(t)}}}class $S extends Li{constructor(e){super(e),this.expr=e}Nr(e,t){const r=Dt(t);if(r!==BigInt(0))return Dt(e)/r}Mr(e,t){const r=Me(t);return r===0?{doubleValue:li(r)?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY}:{doubleValue:Me(e)/r}}}class WS extends Li{constructor(e){super(e),this.expr=e}Nr(e,t){const r=Dt(t);if(r!==BigInt(0))return Dt(e)%r}Mr(e,t){const r=Me(t);if(r!==0)return{doubleValue:Me(e)%r}}}class jS{constructor(e){this.expr=e}evaluate(e,t){var i;let r=!1,s=!1;for(const o of this.expr.params){const c=q(o).evaluate(e,t);switch(c.type){case"BOOLEAN":if(!((i=c.value)!=null&&i.booleanValue))return v.newValue(xe);break;case"NULL":s=!0;break;default:r=!0}}return r?v.vr():s?v.Dr():v.newValue(nt)}}class Ba{constructor(e){this.expr=e}evaluate(e,t){var s;B(this.expr.params.length===1,9634);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"BOOLEAN":return v.newValue({booleanValue:!((s=r.value)!=null&&s.booleanValue)});case"NULL":return v.Dr();default:return v.vr()}}}class zS{constructor(e){this.expr=e}evaluate(e,t){var i;let r=!1,s=!1;for(const o of this.expr.params){const c=q(o).evaluate(e,t);switch(c.type){case"BOOLEAN":if((i=c.value)!=null&&i.booleanValue)return v.newValue(nt);break;case"NULL":s=!0;break;default:r=!0}}return r?v.vr():s?v.Dr():v.newValue(xe)}}class Du{constructor(e){this.expr=e}evaluate(e,t){var i;let r=!1,s=!1;for(const o of this.expr.params){const c=q(o).evaluate(e,t);switch(c.type){case"BOOLEAN":r=Du.xor(r,!!((i=c.value)!=null&&i.booleanValue));break;case"NULL":s=!0;break;default:return v.vr()}}return s?v.Dr():v.newValue({booleanValue:r})}static xor(e,t){return(e||t)&&!(e&&t)}}class wg{constructor(e){this.expr=e}evaluate(e,t){var o,c;B(this.expr.params.length===2,55094);let r=!1;const s=q(this.expr.params[0]).evaluate(e,t);switch(s.type){case"NULL":r=!0;break;case"ERROR":case"UNSET":return v.vr()}const i=q(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return v.vr()}if(r)return v.Dr();for(const l of((c=(o=i.value)==null?void 0:o.arrayValue)==null?void 0:c.values)??[])switch(ct(s.value)&&ct(l)?"EQ":Qt(s.value,l)){case"EQ":return v.newValue(nt);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:$(44608,{value:s.value,candidate:l})}return r?v.Dr():v.newValue(xe)}}class GS{constructor(e){this.expr=e}evaluate(e,t){return new Ba(new b("not",[new b("equal_any",this.expr.params)])).evaluate(e,t)}}class HS{constructor(e){this.expr=e}evaluate(e,t){B(this.expr.params.length===1,23322);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"INT":return v.newValue(xe);case"DOUBLE":return v.newValue({booleanValue:isNaN(Me(r.value))});case"NULL":return v.Dr();default:return v.vr()}}}class KS{constructor(e){this.expr=e}evaluate(e,t){return B(this.expr.params.length===1,50406),new Ba(new b("not",[new b("is_nan",this.expr.params)])).evaluate(e,t)}}class QS{constructor(e){this.expr=e}evaluate(e,t){switch(B(this.expr.params.length===1,23123),q(this.expr.params[0]).evaluate(e,t).type){case"NULL":return v.newValue(nt);case"UNSET":case"ERROR":return v.vr();default:return v.newValue(xe)}}}class YS{constructor(e){this.expr=e}evaluate(e,t){return B(this.expr.params.length===1,23167),new Ba(new b("not",[new b("is_null",this.expr.params)])).evaluate(e,t)}}class JS{constructor(e){this.expr=e}evaluate(e,t){return B(this.expr.params.length===1,5228),q(this.expr.params[0]).evaluate(e,t).type==="ERROR"?v.newValue(nt):v.newValue(xe)}}class XS{constructor(e){this.expr=e}evaluate(e,t){switch(B(this.expr.params.length===1,6877),q(this.expr.params[0]).evaluate(e,t).type){case"ERROR":return v.vr();case"UNSET":return v.newValue(xe);default:return v.newValue(nt)}}}class ZS{constructor(e){this.expr=e}evaluate(e,t){var s;B(this.expr.params.length===3,11706);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"BOOLEAN":return(s=r.value)!=null&&s.booleanValue?q(this.expr.params[1]).evaluate(e,t):q(this.expr.params[2]).evaluate(e,t);case"NULL":return q(this.expr.params[2]).evaluate(e,t);default:return v.vr()}}}class eP{constructor(e){this.expr=e}evaluate(e,t){const r=this.expr.params.map((i=>q(i).evaluate(e,t)));let s;for(const i of r)switch(i.type){case"ERROR":case"UNSET":case"NULL":continue;default:s=s===void 0||rt(i.value,s.value)>0?i:s}return s===void 0?v.Dr():s}}class tP{constructor(e){this.expr=e}evaluate(e,t){const r=this.expr.params.map((i=>q(i).evaluate(e,t)));let s;for(const i of r)switch(i.type){case"ERROR":case"UNSET":case"NULL":continue;default:s=s===void 0||rt(i.value,s.value)<0?i:s}return s===void 0?v.Dr():s}}class is{constructor(e){this.expr=e}evaluate(e,t){B(this.expr.params.length===2,31033,`${this.expr.name}() function should have exactly 2 params`);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"ERROR":case"UNSET":return v.vr()}const s=q(this.expr.params[1]).evaluate(e,t);switch(s.type){case"ERROR":case"UNSET":return v.vr()}return this.Ur(r,s)}}class nP extends is{constructor(e){super(e),this.expr=e}Ur(e,t){if(e.Fr()&&t.Fr())return v.newValue(nt);if(e.Fr()||t.Fr()||st(e.value)||st(t.value)||Ae(e.value)!==Ae(t.value))return v.newValue(xe);switch(Qt(e.value,t.value)){case"EQ":return v.newValue(nt);case"NOT_EQ":return v.newValue(xe);case"NULL":return v.Dr();default:$(44615,{left:e,right:t})}}}class rP extends is{constructor(e){super(e),this.expr=e}Ur(e,t){switch(Qt(e.value,t.value)){case"EQ":return v.newValue(xe);case"NOT_EQ":case"TYPE_MISMATCH":return v.newValue(nt);case"NULL":return v.Dr();default:$(44614,{left:e,right:t})}}}class sP extends is{constructor(e){super(e),this.expr=e}Ur(e,t){return Ae(e.value)!==Ae(t.value)||st(e.value)||st(t.value)?v.newValue(xe):v.newValue({booleanValue:rt(e.value,t.value)<0})}}class iP extends is{constructor(e){super(e),this.expr=e}Ur(e,t){return Ae(e.value)!==Ae(t.value)||st(e.value)||st(t.value)?v.newValue(xe):Qt(e.value,t.value)==="EQ"?v.newValue(nt):v.newValue({booleanValue:rt(e.value,t.value)<0})}}class oP extends is{constructor(e){super(e),this.expr=e}Ur(e,t){return Ae(e.value)!==Ae(t.value)||st(e.value)||st(t.value)?v.newValue(xe):v.newValue({booleanValue:rt(e.value,t.value)>0})}}class aP extends is{constructor(e){super(e),this.expr=e}Ur(e,t){return Ae(e.value)!==Ae(t.value)||st(e.value)||st(t.value)?v.newValue(xe):Qt(e.value,t.value)==="EQ"?v.newValue(nt):v.newValue({booleanValue:rt(e.value,t.value)>0})}}class cP{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class lP{constructor(e){this.expr=e}evaluate(e,t){var s;B(this.expr.params.length===1,216);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return v.Dr();case"ARRAY":{const i=((s=r.value.arrayValue)==null?void 0:s.values)??[];return v.newValue({arrayValue:{values:[...i].reverse()}})}default:return v.vr()}}}class uP{constructor(e){this.expr=e}evaluate(e,t){return B(this.expr.params.length===2,52884),new wg(new b("eq_any",[this.expr.params[1],this.expr.params[0]])).evaluate(e,t)}}class hP{constructor(e){this.expr=e}evaluate(e,t){var l,u,f,p;B(this.expr.params.length===2,1392);let r=!1;const s=q(this.expr.params[0]).evaluate(e,t);switch(s.type){case"ARRAY":break;case"NULL":r=!0;break;default:return v.vr()}const i=q(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return v.vr()}if(r)return v.Dr();const o=((u=(l=i.value)==null?void 0:l.arrayValue)==null?void 0:u.values)??[],c=((p=(f=s.value)==null?void 0:f.arrayValue)==null?void 0:p.values)??[];for(const m of o){let A=!1;r=!1;for(const S of c){switch(ct(m)&&ct(S)?"EQ":Qt(m,S)){case"EQ":A=!0;break;case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:$(44613,{value:S,search:m})}if(A)break}if(!A)return v.newValue(xe)}return v.newValue(nt)}}class dP{constructor(e){this.expr=e}evaluate(e,t){var l,u,f,p;B(this.expr.params.length===2,2680);let r=!1;const s=q(this.expr.params[0]).evaluate(e,t);switch(s.type){case"ARRAY":break;case"NULL":r=!0;break;default:return v.vr()}const i=q(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return v.vr()}if(r)return v.Dr();const o=((u=(l=i.value)==null?void 0:l.arrayValue)==null?void 0:u.values)??[],c=((p=(f=s.value)==null?void 0:f.arrayValue)==null?void 0:p.values)??[];for(const m of c)for(const A of o)switch(ct(m)&&ct(A)?"EQ":Qt(m,A)){case"EQ":return v.newValue(nt);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:$(44608,{value:m,search:A})}return r?v.Dr():v.newValue(xe)}}class fP{constructor(e){this.expr=e}evaluate(e,t){var s,i,o;B(this.expr.params.length===1,38605);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return v.Dr();case"ARRAY":return v.newValue({integerValue:`${((o=(i=(s=r.value)==null?void 0:s.arrayValue)==null?void 0:i.values)==null?void 0:o.length)??0}`});default:return v.vr()}}}class pP{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class _P{constructor(e){this.expr=e}evaluate(e,t){var s,i;B(this.expr.params.length===1,1508);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return v.Dr();case"BYTES":{const o=(s=r.value)==null?void 0:s.bytesValue;if(typeof o=="string"){const c=Ie.fromBase64String(o).toUint8Array();return c.reverse(),v.newValue({bytesValue:Ie.fromUint8Array(c).toBase64()})}return v.newValue({bytesValue:new Uint8Array(o).reverse()})}case"STRING":{const o=(i=r.value)==null?void 0:i.stringValue,c=new Intl.__PRIVATE_Segmenter(void 0,{granularity:"grapheme"}).segment(o),l=Array.from(c,(u=>u.segment)).reverse();return v.newValue({stringValue:l.join("")})}default:return v.vr()}}}class mP{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class gP{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class yP{constructor(e){this.expr=e}evaluate(e,t){B(this.expr.params.length===1,19400);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return v.Dr();case"STRING":{const s=(function(o){let c=0;for(let l=0;l<o.length;l++){const u=o.codePointAt(l);if(u===void 0)return;if(u<=65535)if(u>=55296&&u<=57343)if(u<=56319){const f=o.codePointAt(l+1);f!==void 0&&f>=56320&&f<=57343?(c+=1,l++):c+=1}else c+=1;else c+=1;else{if(!(u<=1114111))return;c+=1,l++}}return c})(r.value.stringValue);return s===void 0?v.vr():v.newValue({integerValue:s})}default:return v.vr()}}}class EP{constructor(e){this.expr=e}evaluate(e,t){var s,i;B(this.expr.params.length===1,8486);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"BYTES":{const o=(s=r.value)==null?void 0:s.bytesValue;return typeof o=="string"?v.newValue({integerValue:Ie.fromBase64String(o).toUint8Array().length}):v.newValue({integerValue:new Uint8Array(o).length})}case"STRING":{const o=(function(l){let u=0;for(let f=0;f<l.length;f++){const p=l.codePointAt(f);if(p===void 0)return;if(p>=55296&&p<=57343){if(!(p<=56319))return;{const m=l.codePointAt(f+1);if(m===void 0||!(m>=56320&&m<=57343))return;u+=4,f++}}else if(p<=127)u+=1;else if(p<=2047)u+=2;else if(p<=65535)u+=3;else{if(!(p<=1114111))return;u+=4,f++}}return u})((i=r.value)==null?void 0:i.stringValue);return o===void 0?v.vr():v.newValue({integerValue:o})}case"NULL":return v.Dr();default:return v.vr()}}}class os{constructor(e){this.expr=e}evaluate(e,t){var o,c;B(this.expr.params.length===2,39773,`${this.expr.name}() function should have exactly two parameters`);let r=!1;const s=q(this.expr.params[0]).evaluate(e,t);switch(s.type){case"STRING":break;case"NULL":r=!0;break;default:return v.vr()}const i=q(this.expr.params[1]).evaluate(e,t);switch(i.type){case"STRING":break;case"NULL":r=!0;break;default:return v.vr()}return r?v.Dr():this.kr((o=s.value)==null?void 0:o.stringValue,(c=i.value)==null?void 0:c.stringValue)}}class vP extends os{kr(e,t){try{const r=(function(o){let c="";for(let l=0;l<o.length;l++){const u=o.charAt(l);switch(u){case"_":c+=".";break;case"%":c+=".*";break;case"\\":case".":case"*":case"?":case"+":case"^":case"$":case"|":case"(":case")":case"[":case"]":case"{":case"}":c+="\\"+u;break;default:c+=u}}return"^"+c+"$"})(t),s=Tl.compile(r);return v.newValue({booleanValue:s.matches(e)})}catch(r){return wt(`Invalid LIKE pattern converted to regex: ${t}, returning error. Error: ${r}`),v.vr()}}}class TP extends os{kr(e,t){try{const r=Tl.compile(t);return v.newValue({booleanValue:r.matcher(e).find()})}catch{return wt(`Invalid regex pattern found in regex_contains: ${t}, returning error`),v.vr()}}}class wP extends os{kr(e,t){try{return v.newValue({booleanValue:Tl.compile(t).matches(e)})}catch{return wt(`Invalid regex pattern found in regex_match: ${t}, returning error`),v.vr()}}}class IP extends os{kr(e,t){return v.newValue({booleanValue:e.includes(t)})}}class AP extends os{kr(e,t){return v.newValue({booleanValue:e.startsWith(t)})}}class CP extends os{kr(e,t){return v.newValue({booleanValue:e.endsWith(t)})}}class RP{constructor(e){this.expr=e}evaluate(e,t){var s,i;B(this.expr.params.length===1,29079);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"STRING":return v.newValue({stringValue:(i=(s=r.value)==null?void 0:s.stringValue)==null?void 0:i.toLowerCase()});case"NULL":return v.Dr();default:return v.vr()}}}class SP{constructor(e){this.expr=e}evaluate(e,t){var s,i;B(this.expr.params.length===1,60487);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"STRING":return v.newValue({stringValue:(i=(s=r.value)==null?void 0:s.stringValue)==null?void 0:i.toUpperCase()});case"NULL":return v.Dr();default:return v.vr()}}}class PP{constructor(e){this.expr=e}evaluate(e,t){var s,i;B(this.expr.params.length===1,28544);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"STRING":return v.newValue({stringValue:(i=(s=r.value)==null?void 0:s.stringValue)==null?void 0:i.trim()});case"NULL":return v.Dr();default:return v.vr()}}}class bP{constructor(e){this.expr=e}evaluate(e,t){const r=this.expr.params.map((o=>q(o).evaluate(e,t)));let s="",i=!1;for(const o of r)switch(o.type){case"STRING":s+=o.value.stringValue;break;case"NULL":i=!0;break;default:return v.vr()}return i?v.Dr():v.newValue({stringValue:s})}}class NP{constructor(e){this.expr=e}evaluate(e,t){var o,c,l,u;B(this.expr.params.length===2,4483);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"UNSET":return v.Sr();case"MAP":break;default:return v.vr()}const s=q(this.expr.params[1]).evaluate(e,t);if(s.type!=="STRING")return v.vr();const i=(u=(c=(o=r.value)==null?void 0:o.mapValue)==null?void 0:c.fields)==null?void 0:u[(l=s.value)==null?void 0:l.stringValue];return i===void 0?v.Sr():v.newValue(i)}}class Ou{constructor(e){this.expr=e}evaluate(e,t){var u,f;B(this.expr.params.length===2,25231,`${this.expr.name}() function should have exactly 2 params`);let r=!1;const s=q(this.expr.params[0]).evaluate(e,t);switch(s.type){case"VECTOR":break;case"NULL":r=!0;break;default:return v.vr()}const i=q(this.expr.params[1]).evaluate(e,t);switch(i.type){case"VECTOR":break;case"NULL":r=!0;break;default:return v.vr()}if(r)return v.Dr();const o=sl(s.value),c=sl(i.value);if(o===void 0||c===void 0||((u=o.values)==null?void 0:u.length)!==((f=c.values)==null?void 0:f.length))return v.vr();const l=this.qr(o,c);return l===void 0||isNaN(l)?v.vr():v.newValue({doubleValue:l})}}class kP extends Ou{qr(e,t){const r=(e==null?void 0:e.values)??[],s=(t==null?void 0:t.values)??[];if(r.length===0)return;let i=0,o=0,c=0;for(let u=0;u<r.length;u++){if(!xn(r[u])||!xn(s[u]))return;const f=Me(r[u]),p=Me(s[u]);i+=f*p,o+=f*f,c+=p*p}const l=Math.sqrt(o)*Math.sqrt(c);if(l!==0)return 1-Math.max(-1,Math.min(1,i/l))}}class VP extends Ou{qr(e,t){const r=(e==null?void 0:e.values)??[],s=(t==null?void 0:t.values)??[];if(r.length===0)return 0;let i=0;for(let o=0;o<r.length;o++){if(!xn(r[o])||!xn(s[o]))return;i+=Me(r[o])*Me(s[o])}return i}}class xP extends Ou{qr(e,t){const r=(e==null?void 0:e.values)??[],s=(t==null?void 0:t.values)??[];if(r.length===0)return 0;let i=0;for(let o=0;o<r.length;o++){if(!xn(r[o])||!xn(s[o]))return;const c=Me(r[o]),l=Me(s[o]);i+=Math.pow(c-l,2)}return Math.sqrt(i)}}class DP{constructor(e){this.expr=e}evaluate(e,t){var s;B(this.expr.params.length===1,39044);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"VECTOR":{const i=sl(r.value);return v.newValue({integerValue:((s=i==null?void 0:i.values)==null?void 0:s.length)??0})}case"NULL":return v.Dr();default:return v.vr()}}}const _i=BigInt(-62135596800),mi=BigInt(253402300799),na=BigInt(1e3),An=BigInt(1e6),OP=_i*na,LP=mi*na+BigInt(999),MP=_i*An,FP=mi*An+BigInt(999999);function Lu(n){return n>=MP&&n<=FP}function Ig(n){return n>=_i&&n<=mi}function gi(n,e){const t=BigInt(n);return!(t<_i||t>mi)&&!(e<0||e>=1e9)&&(t!==_i||e===0)&&!(t===mi&&e>999999999)}function Ag(n,e){return e<0?{seconds:n-1,nanos:e+1e9}:{seconds:n,nanos:e}}function Mu(n){return BigInt(n.seconds)*An+BigInt(Math.trunc(n.nanoseconds/1e3))}class Fu{constructor(e){this.expr=e}evaluate(e,t){B(this.expr.params.length===1,49262,`${this.expr.name}() function should have exactly one parameter`);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"INT":return this.toTimestamp(BigInt(r.value.integerValue));case"NULL":return v.Dr();default:return v.vr()}}}class UP extends Fu{toTimestamp(e){if(!Lu(e))return v.vr();let t=Number(e/An),r=Number(e%An*BigInt(1e3));const s=Ag(t,r);return t=s.seconds,r=s.nanos,gi(t,r)?v.newValue({timestampValue:{seconds:t,nanos:r}}):v.vr()}}class BP extends Fu{toTimestamp(e){if(!(function(o){return o>=OP&&o<=LP})(e))return v.vr();let t=Number(e/na),r=Number(e%na*BigInt(1e6));const s=Ag(t,r);return t=s.seconds,r=s.nanos,gi(t,r)?v.newValue({timestampValue:{seconds:t,nanos:r}}):v.vr()}}class qP extends Fu{toTimestamp(e){if(!Ig(e))return v.vr();const t=Number(e);return v.newValue({timestampValue:{seconds:t,nanos:0}})}}class Uu{constructor(e){this.expr=e}evaluate(e,t){B(this.expr.params.length===1,1265,`${this.expr.name}() function should have exactly one parameter`);const r=q(this.expr.params[0]).evaluate(e,t);switch(r.type){case"TIMESTAMP":break;case"NULL":return v.Dr();default:return v.vr()}const s=Cu(r.value.timestampValue);return gi(s.seconds,s.nanoseconds)?this.$r(s):v.vr()}}class $P extends Uu{$r(e){const t=Mu(e);return Lu(t)?v.newValue({integerValue:`${t.toString()}`}):v.vr()}}class WP extends Uu{$r(e){const t=Mu(e),r=t/BigInt(1e3),s=t%BigInt(1e3);return r>BigInt(0)||s===BigInt(0)?v.newValue({integerValue:r.toString()}):v.newValue({integerValue:(r-BigInt(1)).toString()})}}class jP extends Uu{$r(e){const t=BigInt(e.seconds);return Ig(t)?v.newValue({integerValue:t.toString()}):v.vr()}}class Cg{constructor(e){this.expr=e}evaluate(e,t){B(this.expr.params.length===3,2775,`${this.expr.name}() function should have exactly 3 parameters`);let r=!1;const s=q(this.expr.params[0]).evaluate(e,t);switch(s.type){case"TIMESTAMP":break;case"NULL":r=!0;break;default:return v.vr()}const i=q(this.expr.params[1]).evaluate(e,t);let o;switch(i.type){case"STRING":if(o=(function(se){switch(se){case"microsecond":return"microsecond";case"millisecond":return"millisecond";case"second":return"second";case"minute":return"minute";case"hour":return"hour";case"day":return"day";default:return}})(i.value.stringValue),o===void 0)return v.vr();break;case"NULL":r=!0;break;default:return v.vr()}const c=q(this.expr.params[2]).evaluate(e,t);switch(c.type){case"INT":break;case"NULL":r=!0;break;default:return v.vr()}if(r)return v.Dr();const l=BigInt(c.value.integerValue);let u;try{switch(o){case"microsecond":u=l;break;case"millisecond":u=l*BigInt(1e3);break;case"second":u=l*BigInt(1e6);break;case"minute":u=l*BigInt(6e7);break;case"hour":u=l*BigInt(36e8);break;case"day":u=l*BigInt(864e8);break;default:return v.vr()}if(o!=="microsecond"&&l!==BigInt(0)&&u/l!==BigInt(this.Kr(o)))return v.vr()}catch(H){return wt(`Error during timestamp arithmetic: ${H}`),v.vr()}const f=Cu(s.value.timestampValue);if(!gi(f.seconds,f.nanoseconds))return v.vr();const p=Mu(f),m=this.Wr(p,u);if(!Lu(m))return v.vr();const A=Number(m/An),S=m%An,O=Number((S<0?S+An:S)*BigInt(1e3)),F=S<0?A-1:A;return gi(F,O)?v.newValue({timestampValue:{seconds:F,nanos:O}}):v.vr()}Kr(e){switch(e){case"millisecond":return 1e3;case"second":return 1e6;case"minute":return 6e7;case"hour":return 36e8;case"day":return 864e8;default:return 1}}}class zP extends Cg{Wr(e,t){return e+t}}class GP extends Cg{Wr(e,t){return e-t}}function yi(n){if((n=Tg(n))instanceof rs)return`fld(${n.fieldName})`;if(n instanceof ss)return`cst(${(function(t){return t===null?"null":typeof t=="number"?t.toString():typeof t=="string"?`"${t}"`:t instanceof Te?`ref(${t.path})`:t instanceof tt?`vec(${JSON.stringify(t)})`:JSON.stringify(t)})(n.value)})`;if(n instanceof b)return`fn(${n.name},[${n.params.map(yi).join(",")}])`;if(n.expressionType==="ListOfExpressions")return`list([${n.Rr.map(yi).join(",")}])`;throw new Error(`Unrecognized expr ${JSON.stringify(n,null,2)}`)}function HP(n){if(n instanceof yg)return`${n._name}(${co(n.fields)})`;if(n instanceof Eg){let e=`${n._name}(${co(n.accumulators)})`;return n.groups.size>0&&(e+=`grouping(${co(n.groups)})`),e}if(n instanceof vg)return`${n._name}(${co(n.groups)})`;if(n instanceof La)return`${n._name}(${n.Vr})`;if(n instanceof Ma)return`${n._name}(${n.collectionId})`;if(n instanceof Nu)return`${n._name}()`;if(n instanceof ku)return`${n._name}(${n.dr.sort()})`;if(n instanceof Fa)return`${n._name}(${yi(n.condition)})`;if(n instanceof or)return`${n._name}(${n.limit})`;if(n instanceof Bt)return`${n._name}(${(function(t){return t.map((r=>`${yi(r.expr)}${r.direction}`)).join(",")})(n.orderings)})`;throw new Error(`Unrecognized stage ${n._name}`)}function co(n){return`${Array.from(n.entries()).sort().map((([e,t])=>`${e}=${yi(t)}`)).join(",")}`}function jt(n){return n.stages.map((e=>HP(e))).join("|")}function Rg(n,e){return jt(n)===jt(e)}function Pe(n){return n instanceof Ke}function jf(n){return Pe(n)?jt(n):Gs(n)}function Sg(n){return Pe(n)?jt(n):(function(t){return`${$m(Vt(t))}|lt:${t.limitType}`})(n)}function qa(n,e){return n instanceof Ke&&e instanceof Ke?Rg(n,e):!(n instanceof Ke&&!(e instanceof Ke)||!(n instanceof Ke)&&e instanceof Ke)&&IR(n,e)}function Pg(n){return Gn(n)?jt(n):$m(n)}function bg(n,e){return n instanceof Ke&&e instanceof Ke?Rg(n,e):!(n instanceof Ke&&!(e instanceof Ke)||!(n instanceof Ke)&&e instanceof Ke)&&Wm(n,e)}function KP(n,e){const t=(function(s){let i=!1;const o=[];for(const c of s)if(c instanceof Bt)if(i=!0,c.orderings.some((l=>l.expr instanceof rs&&l.expr.fieldName===Pt)))o.push(c);else{const l=c.orderings.map((u=>u));l.push(vo(Pt).ascending()),o.push(new Bt(l,{}))}else c instanceof or&&(i||(o.push(new Bt([vo(Pt).ascending()],{})),i=!0)),o.push(c);return i||o.push(new Bt([vo(Pt).ascending()],{})),o})(n.stages);if(n.userDataReader){const r=n.userDataReader.createContext(3,"toCorePipeline");t.forEach((s=>s._readUserData(r)))}return new Ke(n.userDataReader.serializer,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QP{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&cR(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=js(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=js(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Km();return this.mutations.forEach((s=>{const i=e.get(s.key),o=i.overlayedDocument;let c=this.applyToLocalView(o,i.mutatedFields);c=t.has(s.key)?null:c;const l=Dm(o,c);l!==null&&r.set(s.key,l),o.isValidDocument()||o.convertToNoDocument(z.min())})),r}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),Z())}isEqual(e){return this.batchId===e.batchId&&Ur(this.mutations,e.mutations,((t,r)=>wf(t,r)))&&Ur(this.baseMutations,e.baseMutations,((t,r)=>wf(t,r)))}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YP{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt{constructor(e,t,r,s,i=z.min(),o=z.min(),c=Ie.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new qt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new qt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new qt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new qt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JP{constructor(e){this.zr=e}}function XP(n){const e=WR({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?ul(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZP{constructor(){this.Hi=new eb}addToCollectionParentIndex(e,t){return this.Hi.add(t),N.resolve()}getCollectionParents(e,t){return N.resolve(this.Hi.getEntries(t))}addFieldIndex(e,t){return N.resolve()}deleteFieldIndex(e,t){return N.resolve()}deleteAllFieldIndexes(e){return N.resolve()}createTargetIndexes(e,t){return N.resolve()}getDocumentsMatchingTarget(e,t){return N.resolve(null)}getIndexType(e,t){return N.resolve(0)}getFieldIndexes(e,t){return N.resolve([])}getNextCollectionGroupToUpdate(e){return N.resolve(null)}getMinOffset(e,t){return N.resolve(Nn.min())}getMinOffsetFromCollectionGroup(e,t){return N.resolve(Nn.min())}updateCollectionGroup(e,t,r){return N.resolve()}updateIndexEntries(e,t){return N.resolve()}}class eb{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new we(re.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new we(re.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ln{constructor(e){this.Ds=e}next(){return this.Ds+=2,this.Ds}static xs(){return new Ln(0)}static Cs(){return new Ln(-1)}}// Copyright 2024 Google LLC* @license
function Ng(n,e){var r;let t=e;for(const s of n.stages)t=nb({serializer:n.serializer,serverTimestampBehavior:(r=n.listenOptions)==null?void 0:r.serverTimestampBehavior},s,t);return t}function $a(n,e){return Ng(n,[e]).length>0}function tb(n,e){return Pe(n)?$a(n,e):Va(n,e)}function nb(n,e,t){if(e instanceof La)return(function(s,i,o){return o.filter((c=>c.isFoundDocument()&&`/${c.key.getCollectionPath().canonicalString()}`===i.Vr))})(0,e,t);if(e instanceof Fa)return(function(s,i,o){return o.filter((c=>{const l=Qs(q(i.condition).evaluate(s,c));return l!==void 0&&_t(l,nt)}))})(n,e,t);if(e instanceof Ma)return(function(s,i,o){return o.filter((c=>c.isFoundDocument()&&c.key.getCollectionPath().lastSegment()===i.collectionId))})(0,e,t);if(e instanceof Nu)return(function(s,i,o){return o.filter((c=>c.isFoundDocument()))})(0,0,t);if(e instanceof ku)return(function(s,i,o){return o.filter((c=>c.isFoundDocument()&&i.mr.has(c.key.path.toStringWithLeadingSlash())))})(0,e,t);if(e instanceof or)return(function(s,i,o){return o.slice(0,i.limit)})(0,e,t);if(e instanceof Bt)return(function(s,i,o){const c=i.orderings.map((l=>({ks:q(l.expr),direction:l.direction})));return[...o].sort(((l,u)=>{for(const{ks:f,direction:p}of c){const m=Qs(f.evaluate(s,l)),A=Qs(f.evaluate(s,u)),S=rt(m??qr,A??qr);if(S!==0)return p==="ascending"?S:-S}return 0}))})(n,e,t);throw new Error(`Unknown stage: ${e._name}`)}function _l(n){const e=(function(r){for(let s=r.stages.length-1;s>=0;s--){const i=r.stages[s];if(i instanceof Bt)return i.orderings}throw new Error("Pipeline must contain at least one Sort stage")})(n);return(t,r)=>{for(const s of e){const i=Qs(q(s.expr).evaluate({serializer:n.serializer},t)),o=Qs(q(s.expr).evaluate({serializer:n.serializer},r)),c=rt(i||qr,o||qr);if(c!==0)return s.direction==="ascending"?c:-c}return 0}}function kc(n){for(let e=n.stages.length-1;e>=0;e--){const t=n.stages[e];if(t instanceof or)return{limit:t.limit}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rb{constructor(){this.changes=new hr((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,We.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?N.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sb{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ib{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(r=s,this.remoteDocumentCache.getEntry(e,t)))).next((s=>(r!==null&&js(r.mutation,s,mn.empty(),he.now()),s)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.getLocalViewOfDocuments(e,r,Z()).next((()=>r))))}getLocalViewOfDocuments(e,t,r=Z()){const s=pn();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,r).next((i=>{let o=yr();return i.forEach(((c,l)=>{o=o.insert(c,l.overlayedDocument)})),o}))))}getOverlayedDocuments(e,t){const r=pn();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,Z())))}populateOverlays(e,t,r){const s=[];return r.forEach((i=>{t.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(e,s).next((i=>{i.forEach(((o,c)=>{t.set(o,c)}))}))}computeViews(e,t,r,s){let i=lt();const o=Hs(),c=(function(){return Hs()})();return t.forEach(((l,u)=>{const f=r.get(u.key);s.has(u.key)&&(f===void 0||f.mutation instanceof ka)?i=i.insert(u.key,u):f!==void 0?(o.set(u.key,f.mutation.getFieldMask()),js(f.mutation,u,f.mutation.getFieldMask(),he.now())):o.set(u.key,mn.empty())})),this.recalculateAndSaveOverlays(e,i).next((l=>(l.forEach(((u,f)=>o.set(u,f))),t.forEach(((u,f)=>c.set(u,new sb(f,o.get(u)??null)))),c)))}recalculateAndSaveOverlays(e,t){const r=Hs();let s=new ge(((o,c)=>o-c)),i=Z();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((o=>{for(const c of o)c.keys().forEach((l=>{const u=t.get(l);if(u===null)return;let f=r.get(l)||mn.empty();f=c.applyToLocalView(u,f),r.set(l,f);const p=(s.get(c.batchId)||Z()).add(l);s=s.insert(c.batchId,p)}))})).next((()=>{const o=[],c=s.getReverseIterator();for(;c.hasNext();){const l=c.getNext(),u=l.key,f=l.value,p=Km();f.forEach((m=>{if(!i.has(m)){const A=Dm(t.get(m),r.get(m));A!==null&&p.set(m,A),i=i.add(m)}})),o.push(this.documentOverlayCache.saveOverlays(e,u,p))}return N.waitFor(o)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.recalculateAndSaveOverlays(e,r)))}getDocumentsMatchingQuery(e,t,r,s){return Pe(t)?this.getDocumentsMatchingPipeline(e,t,r,s):TR(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):zm(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next((i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):N.resolve(pn());let c=ci,l=i;return o.next((u=>N.forEach(u,((f,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),i.get(f)?N.resolve():this.remoteDocumentCache.getEntry(e,f).next((m=>{l=l.insert(f,m)}))))).next((()=>this.populateOverlays(e,u,i))).next((()=>this.computeViews(e,l,u,Z()))).next((f=>({batchId:c,changes:SR(f)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new U(t)).next((r=>{let s=yr();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let o=yr();return this.indexManager.getCollectionParents(e,i).next((c=>N.forEach(c,(l=>{const u=(function(p,m){return new xi(m,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)})(t,l.child(i));return this.getDocumentsMatchingCollectionQuery(e,u,r,s).next((f=>{f.forEach(((p,m)=>{o=o.insert(p,m)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next((o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s)))).next((o=>this.retrieveMatchingLocalDocuments(i,o,(c=>Va(t,c)))))}getDocumentsMatchingPipeline(e,t,r,s){if(In(t)==="collection_group"){const i=xu(t);let o=yr();return this.indexManager.getCollectionParents(e,i).next((c=>N.forEach(c,(l=>{const u=(function(p,m){const A=p.stages.map((S=>S instanceof Ma?new La(m.canonicalString(),{}):S));return new Ke(p.serializer,A)})(t,l.child(i));return this.getDocumentsMatchingPipeline(e,u,r,s).next((f=>{f.forEach(((p,m)=>{o=o.insert(p,m)}))}))})).next((()=>o))))}{let i;return this.getOverlaysForPipeline(e,t,r.largestBatchId).next((o=>{switch(i=o,In(t)){case"collection":return this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s);case"documents":let c=Z();for(const l of pl(t))c=c.add(U.fromPath(l));return this.remoteDocumentCache.getEntries(e,c);case"database":return this.remoteDocumentCache.getAllEntries(e);default:throw new L("invalid-argument",`Invalid pipeline source to execute offline: ${jt(t)}`)}})).next((o=>this.retrieveMatchingLocalDocuments(i,o,(c=>$a(t,c)))))}}retrieveMatchingLocalDocuments(e,t,r){e.forEach(((i,o)=>{const c=o.getKey();t.get(c)===null&&(t=t.insert(c,We.newInvalidDocument(c)))}));let s=yr();return t.forEach(((i,o)=>{const c=e.get(i);c!==void 0&&js(c.mutation,o,mn.empty(),he.now()),r(o)&&(s=s.insert(i,o))})),s}getOverlaysForPipeline(e,t,r){switch(In(t)){case"collection":return this.documentOverlayCache.getOverlaysForCollection(e,re.fromString(Ua(t)),r);case"collection_group":throw new L("invalid-argument",`Unexpected collection group pipeline: ${jt(t)}`);case"documents":return this.documentOverlayCache.getOverlays(e,pl(t).map((s=>U.fromPath(s))));case"database":return this.documentOverlayCache.getAllOverlays(e,r);default:throw new L("invalid-argument",`Failed to get overlays for pipeline: ${jt(t)}`)}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ob{constructor(e){this.serializer=e,this.Hs=new Map,this.Js=new Map}getBundleMetadata(e,t){return N.resolve(this.Hs.get(t))}saveBundleMetadata(e,t){return this.Hs.set(t.id,(function(s){return{id:s.id,version:s.version,createTime:Pr(s.createTime)}})(t)),N.resolve()}getNamedQuery(e,t){return N.resolve(this.Js.get(t))}saveNamedQuery(e,t){return this.Js.set(t.name,(function(s){return{name:s.name,query:XP(s.bundledQuery),readTime:Pr(s.readTime)}})(t)),N.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ab{constructor(){this.overlays=new ge(U.comparator),this.Ys=new Map}getOverlay(e,t){return N.resolve(this.overlays.get(t))}getOverlays(e,t){const r=pn();return N.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}getAllOverlays(e,t){const r=pn();return this.overlays.forEach(((s,i)=>{i.largestBatchId>t&&r.set(s,i)})),N.resolve(r)}saveOverlays(e,t,r){return r.forEach(((s,i)=>{this.Hr(e,t,i)})),N.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Ys.get(r);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.Ys.delete(r)),N.resolve()}getOverlaysForCollection(e,t,r){const s=pn(),i=t.length+1,o=new U(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const l=c.getNext().value,u=l.getKey();if(!t.isPrefixOf(u.path))break;u.path.length===i&&l.largestBatchId>r&&s.set(l.getKey(),l)}return N.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new ge(((u,f)=>u-f));const o=this.overlays.getIterator();for(;o.hasNext();){const u=o.getNext().value;if(u.getKey().getCollectionGroup()===t&&u.largestBatchId>r){let f=i.get(u.largestBatchId);f===null&&(f=pn(),i=i.insert(u.largestBatchId,f)),f.set(u.getKey(),u)}}const c=pn(),l=i.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach(((u,f)=>c.set(u,f))),!(c.size()>=s)););return N.resolve(c)}Hr(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.Ys.get(s.largestBatchId).delete(r.key);this.Ys.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new YP(t,r));let i=this.Ys.get(t);i===void 0&&(i=Z(),this.Ys.set(t,i)),this.Ys.set(t,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cb{constructor(){this.sessionToken=Ie.EMPTY_BYTE_STRING}getSessionToken(e){return N.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,N.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bu{constructor(){this.Zs=new we(ke.Xs),this.e_=new we(ke.t_)}isEmpty(){return this.Zs.isEmpty()}addReference(e,t){const r=new ke(e,t);this.Zs=this.Zs.add(r),this.e_=this.e_.add(r)}n_(e,t){e.forEach((r=>this.addReference(r,t)))}removeReference(e,t){this.r_(new ke(e,t))}i_(e,t){e.forEach((r=>this.removeReference(r,t)))}s_(e){const t=new U(new re([])),r=new ke(t,e),s=new ke(t,e+1),i=[];return this.e_.forEachInRange([r,s],(o=>{this.r_(o),i.push(o.key)})),i}__(){this.Zs.forEach((e=>this.r_(e)))}r_(e){this.Zs=this.Zs.delete(e),this.e_=this.e_.delete(e)}o_(e){const t=new U(new re([])),r=new ke(t,e),s=new ke(t,e+1);let i=Z();return this.e_.forEachInRange([r,s],(o=>{i=i.add(o.key)})),i}containsKey(e){const t=new ke(e,0),r=this.Zs.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class ke{constructor(e,t){this.key=e,this.a_=t}static Xs(e,t){return U.comparator(e.key,t.key)||X(e.a_,t.a_)}static t_(e,t){return X(e.a_,t.a_)||U.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lb{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.gs=1,this.u_=new we(ke.Xs)}checkEmpty(e){return N.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.gs;this.gs++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new QP(i,t,r,s);this.mutationQueue.push(o);for(const c of s)this.u_=this.u_.add(new ke(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return N.resolve(o)}lookupMutationBatch(e,t){return N.resolve(this.c_(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.l_(r),i=s<0?0:s;return N.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return N.resolve(this.mutationQueue.length===0?HC:this.gs-1)}getAllMutationBatches(e){return N.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new ke(t,0),s=new ke(t,Number.POSITIVE_INFINITY),i=[];return this.u_.forEachInRange([r,s],(o=>{const c=this.c_(o.a_);i.push(c)})),N.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new we(X);return t.forEach((s=>{const i=new ke(s,0),o=new ke(s,Number.POSITIVE_INFINITY);this.u_.forEachInRange([i,o],(c=>{r=r.add(c.a_)}))})),N.resolve(this.E_(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;U.isDocumentKey(i)||(i=i.child(""));const o=new ke(new U(i),0);let c=new we(X);return this.u_.forEachWhile((l=>{const u=l.key.path;return!!r.isPrefixOf(u)&&(u.length===s&&(c=c.add(l.a_)),!0)}),o),N.resolve(this.E_(c))}E_(e){const t=[];return e.forEach((r=>{const s=this.c_(r);s!==null&&t.push(s)})),t}removeMutationBatch(e,t){B(this.h_(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.u_;return N.forEach(t.mutations,(s=>{const i=new ke(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.u_=r}))}bs(e){}containsKey(e,t){const r=new ke(t,0),s=this.u_.firstAfterOrEqual(r);return N.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,N.resolve()}h_(e,t){return this.l_(e)}l_(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}c_(e){const t=this.l_(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ub{constructor(e){this.T_=e,this.docs=(function(){return new ge(U.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,o=this.T_(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return N.resolve(r?r.document.mutableCopy():We.newInvalidDocument(t))}getEntries(e,t){let r=lt();return t.forEach((s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():We.newInvalidDocument(s))})),N.resolve(r)}getAllEntries(e){let t=lt();return this.docs.forEach(((r,s)=>{t=t.insert(r,s.document)})),N.resolve(t)}getDocumentsMatchingQuery(e,t,r,s){let i,o;Pe(t)?(i=re.fromString(Ua(t)),o=f=>$a(t,f)):(i=t.path,o=f=>Va(t,f));let c=lt();const l=new U(i.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(l);for(;u.hasNext();){const{key:f,value:{document:p}}=u.getNext();if(!i.isPrefixOf(f.path))break;f.path.length>i.length+1||WC($C(p),r)<=0||(s.has(p.key)||o(p))&&(c=c.insert(p.key,p.mutableCopy()))}return N.resolve(c)}getAllFromCollectionGroup(e,t,r,s){$(9500)}P_(e,t){return N.forEach(this.docs,(r=>t(r)))}newChangeBuffer(e){return new hb(this)}getSize(e){return N.resolve(this.size)}}class hb extends rb{constructor(e){super(),this.zs=e}applyChanges(e){const t=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?t.push(this.zs.addEntry(e,s)):this.zs.removeEntry(r)})),N.waitFor(t)}getFromCache(e,t){return this.zs.getEntry(e,t)}getAllFromCache(e,t){return this.zs.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class db{constructor(e){this.persistence=e,this.R_=new hr((t=>Pg(t)),bg),this.lastRemoteSnapshotVersion=z.min(),this.highestTargetId=0,this.I_=0,this.A_=new Bu,this.targetCount=0,this.V_=Ln.xs()}forEachTarget(e,t){return this.R_.forEach(((r,s)=>t(s))),N.resolve()}getLastRemoteSnapshotVersion(e){return N.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return N.resolve(this.I_)}allocateTargetId(e){return this.highestTargetId=this.V_.next(),N.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.I_&&(this.I_=t),N.resolve()}Ms(e){this.R_.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.V_=new Ln(t),this.highestTargetId=t),e.sequenceNumber>this.I_&&(this.I_=e.sequenceNumber)}addTargetData(e,t){return this.Ms(t),this.targetCount+=1,N.resolve()}updateTargetData(e,t){return this.Ms(t),N.resolve()}removeTargetData(e,t){return this.R_.delete(t.target),this.A_.s_(t.targetId),this.targetCount-=1,N.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.R_.forEach(((o,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.R_.delete(o),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)})),N.waitFor(i).next((()=>s))}getTargetCount(e){return N.resolve(this.targetCount)}getTargetData(e,t){const r=this.R_.get(t)||null;return N.resolve(r)}addMatchingKeys(e,t,r){return this.A_.n_(t,r),N.resolve()}removeMatchingKeys(e,t,r){this.A_.i_(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach((o=>{i.push(s.markPotentiallyOrphaned(e,o))})),N.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.A_.s_(t),N.resolve()}getMatchingKeysForTargetId(e,t){const r=this.A_.o_(t);return N.resolve(r)}containsKey(e,t){return N.resolve(this.A_.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kg{constructor(e,t){this.d_={},this.overlays={},this.f_=new Ra(0),this.m_=!1,this.m_=!0,this.p_=new cb,this.referenceDelegate=e(this),this.g_=new db(this),this.indexManager=new ZP,this.remoteDocumentCache=(function(s){return new ub(s)})((r=>this.referenceDelegate.y_(r))),this.serializer=new JP(t),this.w_=new ob(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.m_=!1,Promise.resolve()}get started(){return this.m_}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new ab,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.d_[e.toKey()];return r||(r=new lb(t,this.referenceDelegate),this.d_[e.toKey()]=r),r}getGlobalsCache(){return this.p_}getTargetCache(){return this.g_}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.w_}runTransaction(e,t,r){M("MemoryPersistence","Starting transaction:",e);const s=new fb(this.f_.next());return this.referenceDelegate.b_(),r(s).next((i=>this.referenceDelegate.v_(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}S_(e,t){return N.or(Object.values(this.d_).map((r=>()=>r.containsKey(e,t))))}}class fb extends zC{constructor(e){super(),this.currentSequenceNumber=e}}class qu{constructor(e){this.persistence=e,this.D_=new Bu,this.x_=null}static C_(e){return new qu(e)}get F_(){if(this.x_)return this.x_;throw $(60996)}addReference(e,t,r){return this.D_.addReference(r,t),this.F_.delete(r.toString()),N.resolve()}removeReference(e,t,r){return this.D_.removeReference(r,t),this.F_.add(r.toString()),N.resolve()}markPotentiallyOrphaned(e,t){return this.F_.add(t.toString()),N.resolve()}removeTarget(e,t){this.D_.s_(t.targetId).forEach((s=>this.F_.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next((s=>{s.forEach((i=>this.F_.add(i.toString())))})).next((()=>r.removeTargetData(e,t)))}b_(){this.x_=new Set}v_(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return N.forEach(this.F_,(r=>{const s=U.fromPath(r);return this.O_(e,s).next((i=>{i||t.removeEntry(s,z.min())}))})).next((()=>(this.x_=null,t.apply(e))))}updateLimboDocument(e,t){return this.O_(e,t).next((r=>{r?this.F_.delete(t.toString()):this.F_.add(t.toString())}))}y_(e){return 0}O_(e,t){return N.or([()=>N.resolve(this.D_.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.S_(e,t)])}}class ra{constructor(e,t){this.persistence=e,this.M_=new hr((r=>YC(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=dS(this,t)}static C_(e,t){return new ra(e,t)}b_(){}v_(e){return N.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}lr(e){const t=this.Ls(e);return this.persistence.getTargetCache().getTargetCount(e).next((r=>t.next((s=>r+s))))}Ls(e){let t=0;return this.Er(e,(r=>{t++})).next((()=>t))}Er(e,t){return N.forEach(this.M_,((r,s)=>this.Us(e,r,s).next((i=>i?N.resolve():t(s)))))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.P_(e,(o=>this.Us(e,o,t).next((c=>{c||(r++,i.removeEntry(o,z.min()))})))).next((()=>i.apply(e))).next((()=>r))}markPotentiallyOrphaned(e,t){return this.M_.set(t,e.currentSequenceNumber),N.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.M_.set(r,e.currentSequenceNumber),N.resolve()}removeReference(e,t,r){return this.M_.set(r,e.currentSequenceNumber),N.resolve()}updateLimboDocument(e,t){return this.M_.set(t,e.currentSequenceNumber),N.resolve()}y_(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=go(e.data.value)),t}Us(e,t,r){return N.or([()=>this.persistence.S_(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.M_.get(t);return N.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $u{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.wo=r,this.bo=s}static vo(e,t){let r=Z(),s=Z();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new $u(e,t.fromCache,r,s)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pb(n,e){return U.comparator(n.key,e.key)}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _b{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mb{constructor(){this.So=!1,this.Do=!1,this.xo=100,this.Co=(function(){return Hy()?8:GC(je())>0?6:4})()}initialize(e,t){this.Fo=e,this.indexManager=t,this.So=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.Oo(e,t).next((o=>{i.result=o})).next((()=>{if(!i.result)return this.Mo(e,t,s,r).next((o=>{i.result=o}))})).next((()=>{if(i.result)return;const o=new _b;return this.No(e,t,o).next((c=>{if(i.result=c,this.Do)return this.Lo(e,t,o,c.size)}))})).next((()=>i.result))}Lo(e,t,r,s){return Pe(t)?N.resolve():r.documentReadCount<this.xo?(gr()<=Y.DEBUG&&M("QueryEngine","SDK will not create cache indexes for query:",Gs(t),"since it only creates cache indexes for collection contains","more than or equal to",this.xo,"documents"),N.resolve()):(gr()<=Y.DEBUG&&M("QueryEngine","Query:",Gs(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Co*s?(gr()<=Y.DEBUG&&M("QueryEngine","The SDK decides to create cache indexes for query:",Gs(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Vt(t))):N.resolve())}Oo(e,t){if(Pe(t))return N.resolve(null);let r=t;if(Pf(r))return N.resolve(null);let s=Vt(r);return this.indexManager.getIndexType(e,s).next((i=>i===0?null:(r.limit!==null&&i===1&&(r=ul(r,null,"F"),s=Vt(r)),this.indexManager.getDocumentsMatchingTarget(e,s).next((o=>{const c=Z(...o);return this.Fo.getDocuments(e,c).next((l=>this.indexManager.getMinOffset(e,s).next((u=>{const f=this.Bo(r,l);return this.Uo(r,f,c,u.readTime)?this.Oo(e,ul(r,null,"F")):this.ko(e,f,r,u)}))))})))))}Mo(e,t,r,s){return(Pe(t)?(function(o){for(const c of o.stages){if(c instanceof or||c instanceof Wf)return!1;if(c instanceof Fa){if(c.condition instanceof _g&&c.condition._expr.name==="exists"&&c.condition._expr.params[0]instanceof rs&&c.condition._expr.params[0].fieldName===Pt)continue;return!1}}return!0})(t):Pf(t))||s.isEqual(z.min())?N.resolve(null):this.Fo.getDocuments(e,r).next((i=>{const o=this.Bo(t,i);return this.Uo(t,o,r,s)?N.resolve(null):(gr()<=Y.DEBUG&&M("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),jf(t)),this.ko(e,o,t,qC(s,ci)).next((c=>c)))}))}Bo(e,t){let r,s;return Pe(e)?(r=new we(pb),s=i=>$a(e,i)):(r=new we(Iu(e)),s=i=>Va(e,i)),t.forEach(((i,o)=>{s(o)&&(r=r.add(o))})),r}Uo(e,t,r,s){if(Pe(e))return(function(c){return c.stages.some((l=>l instanceof or||l instanceof Wf))})(e);if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}No(e,t,r){return gr()<=Y.DEBUG&&M("QueryEngine","Using full collection scan to execute query:",jf(t)),this.Fo.getDocumentsMatchingQuery(e,t,Nn.min(),r)}ko(e,t,r,s){return this.Fo.getDocumentsMatchingQuery(e,r,s).next((i=>(t.forEach((o=>{i=i.insert(o.key,o)})),i)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wu="LocalStore",gb=3e8;class yb{constructor(e,t,r,s){this.persistence=e,this.qo=t,this.serializer=s,this.$o=new ge(X),this.Ko=new hr((i=>Pg(i)),bg),this.Wo=new Map,this.Qo=e.getRemoteDocumentCache(),this.g_=e.getTargetCache(),this.w_=e.getBundleCache(),this.Go(r)}Go(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new ib(this.Qo,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Qo.setIndexManager(this.indexManager),this.qo.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.$o)))}}function Eb(n,e,t,r){return new yb(n,e,t,r)}async function Vg(n,e){const t=te(n);return await t.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next((i=>(s=i,t.Go(e),t.mutationQueue.getAllMutationBatches(r)))).next((i=>{const o=[],c=[];let l=Z();for(const u of s){o.push(u.batchId);for(const f of u.mutations)l=l.add(f.key)}for(const u of i){c.push(u.batchId);for(const f of u.mutations)l=l.add(f.key)}return t.localDocuments.getDocuments(r,l).next((u=>({zo:u,removedBatchIds:o,addedBatchIds:c})))}))}))}function xg(n){const e=te(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.g_.getLastRemoteSnapshotVersion(t)))}function vb(n,e){const t=te(n),r=e.snapshotVersion;let s=t.$o;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const o=t.Qo.newChangeBuffer({trackRemovals:!0});s=t.$o;const c=[];e.targetChanges.forEach(((f,p)=>{const m=s.get(p);if(!m)return;c.push(t.g_.removeMatchingKeys(i,f.removedDocuments,p).next((()=>t.g_.addMatchingKeys(i,f.addedDocuments,p))));let A=m.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?A=A.withResumeToken(Ie.EMPTY_BYTE_STRING,z.min()).withLastLimboFreeSnapshotVersion(z.min()):f.resumeToken.approximateByteSize()>0&&(A=A.withResumeToken(f.resumeToken,r)),s=s.insert(p,A),(function(O,F,H){return O.resumeToken.approximateByteSize()===0||F.snapshotVersion.toMicroseconds()-O.snapshotVersion.toMicroseconds()>=gb?!0:H.addedDocuments.size+H.modifiedDocuments.size+H.removedDocuments.size>0})(m,A,f)&&c.push(t.g_.updateTargetData(i,A))}));let l=lt(),u=Z();if(e.documentUpdates.forEach((f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))})),c.push(Tb(i,o,e.documentUpdates).next((f=>{l=f.jo,u=f.Ho}))),!r.isEqual(z.min())){const f=t.g_.getLastRemoteSnapshotVersion(i).next((p=>t.g_.setTargetsMetadata(i,i.currentSequenceNumber,r)));c.push(f)}return N.waitFor(c).next((()=>o.apply(i))).next((()=>t.localDocuments.getLocalViewOfDocuments(i,l,u))).next((()=>l))})).then((i=>(t.$o=s,i)))}function Tb(n,e,t){let r=Z(),s=Z();return t.forEach((i=>r=r.add(i))),e.getEntries(n,r).next((i=>{let o=lt();return t.forEach(((c,l)=>{const u=i.get(c);l.isFoundDocument()!==u.isFoundDocument()&&(s=s.add(c)),l.isNoDocument()&&l.version.isEqual(z.min())?(e.removeEntry(c,l.readTime),o=o.insert(c,l)):!u.isValidDocument()||l.version.compareTo(u.version)>0||l.version.compareTo(u.version)===0&&u.hasPendingWrites?(e.addEntry(l),o=o.insert(c,l)):M(Wu,"Ignoring outdated watch update for ",c,". Current version:",u.version," Watch version:",l.version)})),{jo:o,Ho:s}}))}function wb(n,e){const t=te(n);return t.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return t.g_.getTargetData(r,e).next((i=>i?(s=i,N.resolve(s)):t.g_.allocateTargetId(r).next((o=>(s=new qt(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.g_.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=t.$o.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.$o=t.$o.insert(r.targetId,r),t.Ko.set(e,r.targetId)),r}))}async function ml(n,e,t){const r=te(n),s=r.$o.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,(o=>r.persistence.referenceDelegate.removeTarget(o,s)))}catch(o){if(!es(o))throw o;M(Wu,`Failed to update sequence numbers for target ${e}: ${o}`)}r.$o=r.$o.remove(e),r.Ko.delete(s.target)}function zf(n,e,t){const r=te(n);let s=z.min(),i=Z();return r.persistence.runTransaction("Execute query","readwrite",(o=>(function(l,u,f){const p=te(l),m=p.Ko.get(f);return m!==void 0?N.resolve(p.$o.get(m)):p.g_.getTargetData(u,f)})(r,o,Pe(e)?e:Vt(e)).next((c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.g_.getMatchingKeysForTargetId(o,c.targetId).next((l=>{i=l}))})).next((()=>r.qo.getDocumentsMatchingQuery(o,e,t?s:z.min(),t?i:Z()))).next((c=>(Ib(r,c),{documents:c,Jo:i})))))}function Ib(n,e){e.forEach(((t,r)=>{const s=r.key.getCollectionGroup(),i=n.Wo.get(s)||z.min();r.readTime.compareTo(i)>0&&n.Wo.set(s,r.readTime)}))}class Gf{constructor(){this.activeTargetIds=NR()}na(e){this.activeTargetIds=this.activeTargetIds.add(e)}ra(e){this.activeTargetIds=this.activeTargetIds.delete(e)}ta(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Ab{constructor(){this.Ua=new Gf,this.ka={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Ua.na(e),this.ka[e]||"not-current"}updateQueryState(e,t,r){this.ka[e]=t}removeLocalQueryTarget(e){this.Ua.ra(e)}isLocalQueryTarget(e){return this.Ua.activeTargetIds.has(e)}clearQueryState(e){delete this.ka[e]}getAllActiveQueryTargets(){return this.Ua.activeTargetIds}isActiveQueryTarget(e){return this.Ua.activeTargetIds.has(e)}start(){return this.Ua=new Gf,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}function Vc(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cb{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.qa=0,this.$a=null,this.Ka=!0}Wa(){this.qa===0&&(this.Qa("Unknown"),this.$a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.$a=null,this.Ga("Backend didn't respond within 10 seconds."),this.Qa("Offline"),Promise.resolve()))))}za(e){this.state==="Online"?this.Qa("Unknown"):(this.qa++,this.qa>=1&&(this.ja(),this.Ga(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.Qa("Offline")))}set(e){this.ja(),this.qa=0,e==="Online"&&(this.Ka=!1),this.Qa(e)}Qa(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}Ga(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.Ka?(Kt(t),this.Ka=!1):M("OnlineStateTracker",t)}ja(){this.$a!==null&&(this.$a.cancel(),this.$a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yt="RemoteStore";class Rb{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ha=[],this.Ja=new Map,this.Ya=new Map,this.Za=new Map,this.Xa=new Ln(1e3),this.eu=new Ln(1001),this.tu=new Set,this.nu=[],this.ru=i,this.ru.bt((o=>{r.enqueueAndForget((async()=>{Fi(this)&&(M(Yt,"Restarting streams for network reachability change."),await(async function(l){const u=te(l);u.tu.add(4),await Mi(u),u.iu.set("Unknown"),u.tu.delete(4),await Wa(u)})(this))}))})),this.iu=new Cb(r,s)}}async function Wa(n){if(Fi(n))for(const e of n.nu)await e(!0)}async function Mi(n){for(const e of n.nu)await e(!1)}function gl(n,e){return n.Ya.get(e)||void 0}function Dg(n,e){const t=te(n),r=gl(t,e.targetId);if(r!==void 0&&t.Ja.has(r))return;const s=(function(c,l){const u=gl(c,l);u!==void 0&&c.Za.delete(u);const f=(function(m,A){return A%2!=0?m.eu.next():m.Xa.next()})(c,l);return c.Ya.set(l,f),c.Za.set(f,l),f})(t,e.targetId);M(Yt,"remoteStoreListen mapping SDK target ID to remote",e.targetId,s);const i=new qt(e.target,s,e.purpose,e.sequenceNumber,e.snapshotVersion,e.lastLimboFreeSnapshotVersion,e.resumeToken);t.Ja.set(s,i),Hu(t)?Gu(t):as(t).Fn()&&zu(t,i)}function ju(n,e){const t=te(n),r=as(t),s=gl(t,e);M(Yt,"remoteStoreUnlisten removing mapping of SDK target ID to remote",e,s),t.Ja.delete(s),t.Ya.delete(e),t.Za.delete(s),r.Fn()&&Og(t,s),t.Ja.size===0&&(r.Fn()?r.Nn():Fi(t)&&t.iu.set("Unknown"))}function zu(n,e){if(n.su.We(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(z.min())>0){const t=n.Za.get(e.targetId);if(t===void 0)return void M(Yt,"SDK target ID not found for remote ID: "+e.targetId);const r=n.remoteSyncer.getRemoteKeysForTarget(t).size;e=e.withExpectedCount(r)}as(n).jn(e)}function Og(n,e){n.su.We(e),as(n).Hn(e)}function Gu(n){n.su=new xR({getRemoteKeysForTarget:e=>{const t=n.Za.get(e);return t!==void 0?n.remoteSyncer.getRemoteKeysForTarget(t):Z()},dt:e=>n.Ja.get(e)||null,Tt:()=>n.datastore.serializer.databaseId}),as(n).start(),n.iu.Wa()}function Hu(n){return Fi(n)&&!as(n).Cn()&&n.Ja.size>0}function Fi(n){return te(n).tu.size===0}function Lg(n){n.su=void 0}async function Sb(n){n.iu.set("Online")}async function Pb(n){n.Ja.forEach(((e,t)=>{zu(n,e)}))}async function bb(n,e){Lg(n),Hu(n)?(n.iu.za(e),Gu(n)):n.iu.set("Unknown")}async function Nb(n,e,t){if(n.iu.set("Online"),e instanceof Ym&&e.state===2&&e.cause)try{await(async function(s,i){const o=i.cause;for(const c of i.targetIds){if(s.Ja.has(c)){const l=s.Za.get(c);l!==void 0&&(await s.remoteSyncer.rejectListen(l,o),s.Ya.delete(l),s.Za.delete(c)),s.Ja.delete(c)}s.su.removeTarget(c)}})(n,e)}catch(r){M(Yt,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Hf(n,r)}else if(e instanceof Eo?n.su.et(e):e instanceof Qm?n.su.ot(e):n.su.rt(e),!t.isEqual(z.min()))try{const r=await xg(n.localStore);t.compareTo(r)>=0&&await(function(i,o){const c=i.su.Rt(o);c.targetChanges.forEach(((u,f)=>{if(u.resumeToken.approximateByteSize()>0){const p=i.Ja.get(f);p&&i.Ja.set(f,p.withResumeToken(u.resumeToken,o))}})),c.targetMismatches.forEach(((u,f)=>{const p=i.Ja.get(u);if(!p)return;i.Ja.set(u,p.withResumeToken(Ie.EMPTY_BYTE_STRING,p.snapshotVersion)),Og(i,u);const m=new qt(p.target,u,f,p.sequenceNumber);zu(i,m)}));const l=(function(f,p){const m=new Map;p.targetChanges.forEach(((S,O)=>{const F=f.Za.get(O);F!==void 0&&m.set(F,S)}));let A=new ge(X);return p.targetMismatches.forEach(((S,O)=>{const F=f.Za.get(S);F!==void 0&&(A=A.insert(F,O))})),new Di(p.snapshotVersion,m,A,p.documentUpdates,p.augmentedDocumentUpdates,p.resolvedLimboDocuments)})(i,c);return i.remoteSyncer.applyRemoteEvent(l)})(n,t)}catch(r){M(Yt,"Failed to raise snapshot:",r),await Hf(n,r)}}async function Hf(n,e,t){if(!es(e))throw e;n.tu.add(1),await Mi(n),n.iu.set("Offline"),t||(t=()=>xg(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{M(Yt,"Retrying IndexedDB access"),await t(),n.tu.delete(1),await Wa(n)}))}async function Kf(n,e){const t=te(n);t.asyncQueue.verifyOperationInProgress(),M(Yt,"RemoteStore received new credentials");const r=Fi(t);t.tu.add(3),await Mi(t),r&&t.iu.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.tu.delete(3),await Wa(t)}async function kb(n,e){const t=te(n);e?(t.tu.delete(2),await Wa(t)):e||(t.tu.add(2),await Mi(t),t.iu.set("Unknown"))}function as(n){return n._u||(n._u=(function(t,r,s){const i=te(t);return i.nr(),new nS(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Qt:Sb.bind(null,n),zt:Pb.bind(null,n),Ht:bb.bind(null,n),zn:Nb.bind(null,n)}),n.nu.push((async e=>{e?(n._u.Mn(),Hu(n)?Gu(n):n.iu.set("Unknown")):(await n._u.stop(),Lg(n))}))),n._u}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ku{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Tn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((o=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const o=Date.now()+r,c=new Ku(e,t,o,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new L(k.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Mg(n,e){if(Kt("AsyncQueue",`${e}: ${n}`),es(n))return new L(k.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jn{static emptySet(e){return new Jn(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||U.comparator(t.key,r.key):(t,r)=>U.comparator(t.key,r.key),this.keyedMap=yr(),this.sortedSet=new ge(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,r)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Jn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new Jn;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qf{constructor(){this.au=new ge(U.comparator)}track(e){const t=e.doc.key,r=this.au.get(t);r?e.type!==0&&r.type===3?this.au=this.au.insert(t,e):e.type===3&&r.type!==1?this.au=this.au.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.au=this.au.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.au=this.au.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.au=this.au.remove(t):e.type===1&&r.type===2?this.au=this.au.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.au=this.au.insert(t,{type:2,doc:e.doc}):$(63341,{ft:e,uu:r}):this.au=this.au.insert(t,e)}cu(){const e=[];return this.au.inorderTraversal(((t,r)=>{e.push(r)})),e}}class zr{constructor(e,t,r,s,i,o,c,l,u){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=u}static fromInitialDocuments(e,t,r,s,i){const o=[];return t.forEach((c=>{o.push({type:0,doc:c})})),new zr(e,t,Jn.emptySet(t),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&qa(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vb{constructor(){this.lu=void 0,this.Eu=[]}hu(){return this.Eu.some((e=>e.Tu()))}}class xb{constructor(){this.queries=Yf(),this.onlineState="Unknown",this.Pu=new Set}terminate(){(function(t,r){const s=te(t),i=s.queries;s.queries=Yf(),i.forEach(((o,c)=>{for(const l of c.Eu)l.onError(r)}))})(this,new L(k.ABORTED,"Firestore shutting down"))}}function Yf(){return new hr((n=>Sg(n)),qa)}async function Fg(n,e){const t=te(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.hu()&&e.Tu()&&(r=2):(i=new Vb,r=e.Tu()?0:1);try{switch(r){case 0:i.lu=await t.onListen(s,!0);break;case 1:i.lu=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(o){const c=Mg(o,`Initialization of query '${Pe(e.query)?jt(e.query):Gs(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.Eu.push(e),e.Ru(t.onlineState),i.lu&&e.Iu(i.lu)&&Qu(t)}async function Ug(n,e){const t=te(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const o=i.Eu.indexOf(e);o>=0&&(i.Eu.splice(o,1),i.Eu.length===0?s=e.Tu()?0:1:!i.hu()&&e.Tu()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function Db(n,e){const t=te(n);let r=!1;for(const s of e){const i=s.query,o=t.queries.get(i);if(o){for(const c of o.Eu)c.Iu(s)&&(r=!0);o.lu=s}}r&&Qu(t)}function Ob(n,e,t){const r=te(n),s=r.queries.get(e);if(s)for(const i of s.Eu)i.onError(t);r.queries.delete(e)}function Qu(n){n.Pu.forEach((e=>{e.next()}))}var yl;(function(n){n.Default="default",n.Cache="cache"})(yl||(yl={}));class Bg{constructor(e,t,r){this.query=e,this.Au=t,this.Vu=!1,this.du=null,this.onlineState="Unknown",this.options=r||{}}Iu(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new zr(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Vu?this.fu(e)&&(this.Au.next(e),t=!0):this.mu(e,this.onlineState)&&(this.pu(e),t=!0),this.du=e,t}onError(e){this.Au.error(e)}Ru(e){this.onlineState=e;let t=!1;return this.du&&!this.Vu&&this.mu(this.du,e)&&(this.pu(this.du),t=!0),t}mu(e,t){if(!e.fromCache||!this.Tu())return!0;const r=t!=="Offline";return(!this.options.waitForSyncWhenOnline||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}fu(e){if(e.docChanges.length>0)return!0;const t=this.du&&this.du.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}pu(e){e=zr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Vu=!0,this.Au.next(e)}Tu(){return this.options.source!==yl.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qg{constructor(e){this.key=e}}class $g{constructor(e){this.key=e}}class Lb{constructor(e,t){this.query=e,this.Ou=t,this.Mu=null,this.hasCachedResults=!1,this.current=!1,this.Nu=Z(),this.mutatedKeys=Z(),this.Lu=Pe(e)?_l(e):Iu(e),this.Bu=new Jn(this.Lu)}get Uu(){return this.Ou}ku(e,t){const r=t?t.qu:new Qf,s=t?t.Bu:this.Bu;let i=t?t.mutatedKeys:this.mutatedKeys,o=s,c=!1;const[l,u]=this.$u(this.query,s);e.inorderTraversal(((p,m)=>{const A=s.get(p),S=tb(this.query,m)?m:null,O=!!A&&this.mutatedKeys.has(A.key),F=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations);let H=!1;A&&S?A.data.isEqual(S.data)?O!==F&&(r.track({type:3,doc:S}),H=!0):this.Ku(A,S)||(r.track({type:2,doc:S}),H=!0,(l&&this.Lu(S,l)>0||u&&this.Lu(S,u)<0)&&(c=!0)):!A&&S?(r.track({type:0,doc:S}),H=!0):A&&!S&&(r.track({type:1,doc:A}),H=!0,(l||u)&&(c=!0)),H&&(S?(o=o.add(S),i=F?i.add(p):i.delete(p)):(o=o.delete(p),i=i.delete(p)))}));const f=this.Wu(this.query);if(f)if(Pe(this.query)){const p=[];o.forEach((S=>p.push(S)));const m=Ng(this.query,p);let A=new Jn(_l(this.query));for(const S of m)A=A.add(S);o.forEach((S=>{A.has(S.key)||(i=i.delete(S.key),r.track({type:1,doc:S}))})),o=A}else{const p=this.Qu(this.query);for(;o.size>f;){const m=p==="F"?o.last():o.first();o=o.delete(m.key),i=i.delete(m.key),r.track({type:1,doc:m})}}return{Bu:o,qu:r,Uo:c,mutatedKeys:i}}Wu(e){var t;return Pe(e)?(t=kc(e))==null?void 0:t.limit:e.limit||void 0}Qu(e){if(Pe(e)){const t=kc(e);return t&&t.limit<0?"L":"F"}return e.limitType}$u(e,t){var r;if(Pe(e)){const s=(r=kc(e))==null?void 0:r.limit;return[t.size===s?t.last():null,null]}return[e.limitType==="F"&&t.size===this.Wu(this.query)?t.last():null,e.limitType==="L"&&t.size===this.Wu(this.query)?t.first():null]}Ku(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.Bu;this.Bu=e.Bu,this.mutatedKeys=e.mutatedKeys;const o=e.qu.cu();o.sort(((f,p)=>(function(A,S){const O=F=>{switch(F){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return $(20277,{ft:F})}};return O(A)-O(S)})(f.type,p.type)||this.Lu(f.doc,p.doc))),this.Gu(r),s=s??!1;const c=t&&!s?this.zu():[],l=this.Nu.size===0&&this.current&&!s?1:0,u=l!==this.Mu;return this.Mu=l,o.length!==0||u?{snapshot:new zr(this.query,e.Bu,i,o,e.mutatedKeys,l===0,u,!1,!!r&&r.resumeToken.approximateByteSize()>0),ju:c}:{ju:c}}Ru(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Bu:this.Bu,qu:new Qf,mutatedKeys:this.mutatedKeys,Uo:!1},!1)):{ju:[]}}Hu(e){return!this.Ou.has(e)&&!!this.Bu.has(e)&&!this.Bu.get(e).hasLocalMutations}Gu(e){e&&(e.addedDocuments.forEach((t=>this.Ou=this.Ou.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Ou=this.Ou.delete(t))),this.current=e.current)}zu(){if(!this.current)return[];const e=this.Nu;this.Nu=Z(),this.Bu.forEach((r=>{this.Hu(r.key)&&(this.Nu=this.Nu.add(r.key))}));const t=[];return e.forEach((r=>{this.Nu.has(r)||t.push(new $g(r))})),this.Nu.forEach((r=>{e.has(r)||t.push(new qg(r))})),t}Ju(e){this.Ou=e.Jo,this.Nu=Z();const t=this.ku(e.documents);return this.applyChanges(t,!0)}Yu(){return zr.fromInitialDocuments(this.query,this.Bu,this.mutatedKeys,this.Mu===0,this.hasCachedResults)}}const Yu="SyncEngine";class Mb{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class Fb{constructor(e){this.key=e,this.Zu=!1}}class Ub{constructor(e,t,r,s,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Xu={},this.ec=new hr((c=>Sg(c)),qa),this.tc=new Map,this.nc=new Set,this.rc=new ge(U.comparator),this.sc=new Map,this._c=new Bu,this.oc={},this.ac=new Map,this.uc=Ln.Cs(),this.onlineState="Unknown",this.cc=void 0}get isPrimaryClient(){return this.cc===!0}}async function Bb(n,e,t=!0){const r=Hg(n);let s;const i=r.ec.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Yu()):s=await Wg(r,e,t,!0),s}async function qb(n,e){const t=Hg(n);await Wg(t,e,!0,!1)}async function Wg(n,e,t,r){const s=await wb(n.localStore,Pe(e)?e:Vt(e)),i=s.targetId,o=n.sharedClientState.addLocalQueryTarget(i,t);let c;return r&&(c=await $b(n,e,i,o==="current",s.resumeToken)),n.isPrimaryClient&&t&&Dg(n.remoteStore,s),c}async function $b(n,e,t,r,s){n.lc=(p,m,A)=>(async function(O,F,H,se){let fe=F.view.ku(H);fe.Uo&&(fe=await zf(O.localStore,F.query,!1).then((({documents:w})=>F.view.ku(w,fe))));const Je=se&&se.targetChanges.get(F.targetId),Fe=se&&se.targetMismatches.get(F.targetId)!=null,Ue=F.view.applyChanges(fe,O.isPrimaryClient,Je,Fe);return Xf(O,F.targetId,Ue.ju),Ue.snapshot})(n,p,m,A);const i=await zf(n.localStore,e,!0),o=new Lb(e,i.Jo),c=o.ku(i.documents),l=Oi.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),u=o.applyChanges(c,n.isPrimaryClient,l);Xf(n,t,u.ju);const f=new Mb(e,t,o);return n.ec.set(e,f),n.tc.has(t)?n.tc.get(t).push(e):n.tc.set(t,[e]),u.snapshot}async function Wb(n,e,t){const r=te(n),s=r.ec.get(e),i=r.tc.get(s.targetId);if(i.length>1)return r.tc.set(s.targetId,i.filter((o=>!qa(o,e)))),void r.ec.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await ml(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),t&&ju(r.remoteStore,s.targetId),El(r,s.targetId)})).catch(Ca)):(El(r,s.targetId),await ml(r.localStore,s.targetId,!0))}async function jb(n,e){const t=te(n),r=t.ec.get(e),s=t.tc.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),ju(t.remoteStore,r.targetId))}async function jg(n,e){const t=te(n);try{const r=await vb(t.localStore,e);e.targetChanges.forEach(((s,i)=>{const o=t.sc.get(i);o&&(B(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.Zu=!0:s.modifiedDocuments.size>0?B(o.Zu,14607):s.removedDocuments.size>0&&(B(o.Zu,42227),o.Zu=!1))})),await Gg(t,r,e)}catch(r){await Ca(r)}}function Jf(n,e,t){const r=te(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.ec.forEach(((i,o)=>{const c=o.view.Ru(e);c.snapshot&&s.push(c.snapshot)})),(function(o,c){const l=te(o);l.onlineState=c;let u=!1;l.queries.forEach(((f,p)=>{for(const m of p.Eu)m.Ru(c)&&(u=!0)})),u&&Qu(l)})(r.eventManager,e),s.length&&r.Xu.zn(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function zb(n,e,t){const r=te(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.sc.get(e),i=s&&s.key;if(i){let o=new ge(U.comparator);o=o.insert(i,We.newNoDocument(i,z.min()));const c=Z().add(i),l=new Di(z.min(),new Map,new ge(X),o,lt(),c);await jg(r,l),r.rc=r.rc.remove(i),r.sc.delete(e),Ju(r)}else await ml(r.localStore,e,!1).then((()=>El(r,e,t))).catch(Ca)}function El(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.tc.get(e))n.ec.delete(r),t&&n.Xu.Ec(r,t);n.tc.delete(e),n.isPrimaryClient&&n._c.s_(e).forEach((r=>{n._c.containsKey(r)||zg(n,r)}))}function zg(n,e){n.nc.delete(e.path.canonicalString());const t=n.rc.get(e);t!==null&&(ju(n.remoteStore,t),n.rc=n.rc.remove(e),n.sc.delete(t),Ju(n))}function Xf(n,e,t){for(const r of t)r instanceof qg?(n._c.addReference(r.key,e),Gb(n,r)):r instanceof $g?(M(Yu,"Document no longer in limbo: "+r.key),n._c.removeReference(r.key,e),n._c.containsKey(r.key)||zg(n,r.key)):$(19791,{hc:r})}function Gb(n,e){const t=e.key,r=t.path.canonicalString();n.rc.get(t)||n.nc.has(r)||(M(Yu,"New document in limbo: "+t),n.nc.add(r),Ju(n))}function Ju(n){for(;n.nc.size>0&&n.rc.size<n.maxConcurrentLimboResolutions;){const e=n.nc.values().next().value;n.nc.delete(e);const t=new U(re.fromString(e)),r=n.uc.next();n.sc.set(r,new Fb(t)),n.rc=n.rc.insert(t,r),Dg(n.remoteStore,new qt(Vt(wu(t.path)),r,"TargetPurposeLimboResolution",Ra.ce))}}async function Gg(n,e,t){const r=te(n),s=[],i=[],o=[];r.ec.isEmpty()||(r.ec.forEach(((c,l)=>{o.push(r.lc(l,e,t).then((u=>{var f;if((u||t)&&r.isPrimaryClient){const p=u?!u.fromCache:(f=t==null?void 0:t.targetChanges.get(l.targetId))==null?void 0:f.current;r.sharedClientState.updateQueryState(l.targetId,p?"current":"not-current")}if(u){s.push(u);const p=$u.vo(l.targetId,u);i.push(p)}})))})),await Promise.all(o),r.Xu.zn(s),await(async function(l,u){const f=te(l);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",(p=>N.forEach(u,(m=>N.forEach(m.wo,(A=>f.persistence.referenceDelegate.addReference(p,m.targetId,A))).next((()=>N.forEach(m.bo,(A=>f.persistence.referenceDelegate.removeReference(p,m.targetId,A)))))))))}catch(p){if(!es(p))throw p;M(Wu,"Failed to update sequence numbers: "+p)}for(const p of u){const m=p.targetId;if(!p.fromCache){const A=f.$o.get(m),S=A.snapshotVersion,O=A.withLastLimboFreeSnapshotVersion(S);f.$o=f.$o.insert(m,O)}}})(r.localStore,i))}async function Hb(n,e){const t=te(n);if(!t.currentUser.isEqual(e)){M(Yu,"User change. New user:",e.toKey());const r=await Vg(t.localStore,e);t.currentUser=e,(function(i,o){i.ac.forEach((c=>{c.forEach((l=>{l.reject(new L(k.CANCELLED,o))}))})),i.ac.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Gg(t,r.zo)}}function Kb(n,e){const t=te(n),r=t.sc.get(e);if(r&&r.Zu)return Z().add(r.key);{let s=Z();const i=t.tc.get(e);if(!i)return s;for(const o of i??[]){const c=t.ec.get(o);s=s.unionWith(c.view.Uu)}return s}}function Hg(n){const e=te(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=jg.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Kb.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=zb.bind(null,e),e.Xu.zn=Db.bind(null,e.eventManager),e.Xu.Ec=Ob.bind(null,e.eventManager),e}class sa{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=xa(e.databaseInfo.databaseId),this.sharedClientState=this.Rc(e),this.persistence=this.Ic(e),await this.persistence.start(),this.localStore=this.Ac(e),this.gcScheduler=this.Vc(e,this.localStore),this.indexBackfillerScheduler=this.dc(e,this.localStore)}Vc(e,t){return null}dc(e,t){return null}Ac(e){return Eb(this.persistence,new mb,e.initialUser,this.serializer)}Ic(e){return new kg(qu.C_,this.serializer)}Rc(e){return new Ab}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}sa.provider={build:()=>new sa};class Qb extends sa{constructor(e){super(),this.cacheSizeBytes=e}Vc(e,t){B(this.persistence.referenceDelegate instanceof ra,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new uS(r,e.asyncQueue,t)}Ic(e){const t=this.cacheSizeBytes!==void 0?Ze.withCacheSize(this.cacheSizeBytes):Ze.DEFAULT;return new kg((r=>ra.C_(r,t)),this.serializer)}}class vl{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Jf(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Hb.bind(null,this.syncEngine),await kb(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new xb})()}createDatastore(e){const t=xa(e.databaseInfo.databaseId),r=eS(e.databaseInfo);return iS(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return(function(r,s,i,o,c){return new Rb(r,s,i,o,c)})(this.localStore,this.datastore,e.asyncQueue,(t=>Jf(this.syncEngine,t,0)),(function(){return Of.C()?new Of:new YR})())}createSyncEngine(e,t){return(function(s,i,o,c,l,u,f){const p=new Ub(s,i,o,c,l,u);return f&&(p.cc=!0),p})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await(async function(s){const i=te(s);M(Yt,"RemoteStore shutting down."),i.tu.add(5),await Mi(i),i.ru.shutdown(),i.iu.set("Unknown")})(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}vl.provider={build:()=>new vl};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kg{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.mc(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.mc(this.observer.error,e):Kt("Uncaught Error in snapshot listener:",e.toString()))}gc(){this.muted=!0}mc(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mn="FirestoreClient";class Yb{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this._databaseInfo=s,this.user=$e.UNAUTHENTICATED,this.clientId=mu.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,(async o=>{M(Mn,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(r,(o=>(M(Mn,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Tn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Mg(t,"Failed to shutdown persistence");e.reject(r)}})),e.promise}}async function xc(n,e){n.asyncQueue.verifyOperationInProgress(),M(Mn,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener((async s=>{r.isEqual(s)||(await Vg(e.localStore,s),r=s)})),e.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=e}async function Zf(n,e){n.asyncQueue.verifyOperationInProgress();const t=await Jb(n);M(Mn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((r=>Kf(e.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,s)=>Kf(e.remoteStore,s))),n._onlineComponents=e}async function Jb(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){M(Mn,"Using user provided OfflineComponentProvider");try{await xc(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(s){return s.name==="FirebaseError"?s.code===k.FAILED_PRECONDITION||s.code===k.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(t))throw t;wt("Error using user provided cache. Falling back to memory cache: "+t),await xc(n,new sa)}}else M(Mn,"Using default OfflineComponentProvider"),await xc(n,new Qb(void 0));return n._offlineComponents}async function Xb(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(M(Mn,"Using user provided OnlineComponentProvider"),await Zf(n,n._uninitializedComponentsProvider._online)):(M(Mn,"Using default OnlineComponentProvider"),await Zf(n,new vl))),n._onlineComponents}async function Qg(n){const e=await Xb(n),t=e.eventManager;return t.onListen=Bb.bind(null,e.syncEngine),t.onUnlisten=Wb.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=qb.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=jb.bind(null,e.syncEngine),t}function Zb(n,e,t={}){const r=new Tn;return n.asyncQueue.enqueueAndForget((async()=>(function(i,o,c,l,u){const f=new Kg({next:m=>{f.gc(),o.enqueueAndForget((()=>Ug(i,p)));const A=m.docs.has(c);!A&&m.fromCache?u.reject(new L(k.UNAVAILABLE,"Failed to get document because the client is offline.")):A&&m.fromCache&&l&&l.source==="server"?u.reject(new L(k.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):u.resolve(m)},error:m=>u.reject(m)}),p=new Bg(wu(c.path),f,{includeMetadataChanges:!0,waitForSyncWhenOnline:!0});return Fg(i,p)})(await Qg(n),n.asyncQueue,e,t,r))),r.promise}function eN(n,e,t={}){const r=new Tn;return n.asyncQueue.enqueueAndForget((async()=>(function(i,o,c,l,u){const f=new Kg({next:m=>{f.gc(),o.enqueueAndForget((()=>Ug(i,p))),m.fromCache&&l.source==="server"?u.reject(new L(k.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):u.resolve(m)},error:m=>u.reject(m)}),p=new Bg(c instanceof Ks?KP(c):c,f,{includeMetadataChanges:!0,waitForSyncWhenOnline:!0});return Fg(i,p)})(await Qg(n),n.asyncQueue,e,t,r))),r.promise}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ep="AsyncQueue";class tp{constructor(e=Promise.resolve()){this.qc=[],this.$c=!1,this.Kc=[],this.Wc=null,this.Qc=!1,this.Gc=!1,this.zc=[],this.xn=new cg(this,"async_queue_retry"),this.jc=()=>{const r=Vc();r&&M(ep,"Visibility state changed to "+r.visibilityState),this.xn.gn()},this.Hc=e;const t=Vc();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.jc)}get isShuttingDown(){return this.$c}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Jc(),this.Yc(e)}enterRestrictedMode(e){if(!this.$c){this.$c=!0,this.Gc=e||!1;const t=Vc();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.jc)}}enqueue(e){if(this.Jc(),this.$c)return new Promise((()=>{}));const t=new Tn;return this.Yc((()=>this.$c&&this.Gc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.qc.push(e),this.Zc())))}async Zc(){if(this.qc.length!==0){try{await this.qc[0](),this.qc.shift(),this.xn.reset()}catch(e){if(!es(e))throw e;M(ep,"Operation failed with retryable error: "+e)}this.qc.length>0&&this.xn.mn((()=>this.Zc()))}}Yc(e){const t=this.Hc.then((()=>(this.Qc=!0,e().catch((r=>{throw this.Wc=r,this.Qc=!1,Kt("INTERNAL UNHANDLED ERROR: ",np(r)),r})).then((r=>(this.Qc=!1,r))))));return this.Hc=t,t}enqueueAfterDelay(e,t,r){this.Jc(),this.zc.indexOf(e)>-1&&(t=0);const s=Ku.createAndSchedule(this,e,t,r,(i=>this.Xc(i)));return this.Kc.push(s),s}Jc(){this.Wc&&$(47125,{el:np(this.Wc)})}verifyOperationInProgress(){}async tl(){let e;do e=this.Hc,await e;while(e!==this.Hc)}nl(e){for(const t of this.Kc)if(t.timerId===e)return!0;return!1}rl(e){return this.tl().then((()=>{this.Kc.sort(((t,r)=>t.targetTimeMs-r.targetTimeMs));for(const t of this.Kc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.tl()}))}il(e){this.zc.push(e)}Xc(e){const t=this.Kc.indexOf(e);this.Kc.splice(t,1)}}function np(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class Xu extends Da{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new tp,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new tp(e),this._firestoreClient=void 0,await e}}}function kN(n,e){const t=typeof n=="object"?n:Cl(),r=typeof n=="string"?n:Go,s=la(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=dp("firestore");i&&fS(s,...i)}return s}function Yg(n){if(n._terminated)throw new L(k.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||tN(n),n._firestoreClient}function tN(n){var r,s,i,o;const e=n._freezeSettings(),t=aS(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,(s=n._app)==null?void 0:s.options.apiKey,e);n._componentsProvider||(i=e.localCache)!=null&&i._offlineComponentProvider&&((o=e.localCache)!=null&&o._onlineComponentProvider)&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new Yb(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&(function(l){const u=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(u),_online:u}})(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nN{convertValue(e,t="none"){switch(Ae(e)){case 0:return null;case 1:return e.booleanValue;case 2:return de(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Vn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw $(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return ts(e,((s,i)=>{r[s]=this.convertValue(i,t)})),r}convertVectorValue(e){var r,s,i;const t=(i=(s=(r=e.fields)==null?void 0:r[hi].arrayValue)==null?void 0:s.values)==null?void 0:i.map((o=>de(o.doubleValue)));return new tt(t)}convertGeoPoint(e){return new xt(de(e.latitude),de(e.longitude))}convertArray(e,t){return(e.values||[]).map((r=>this.convertValue(r,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const r=Vi(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Br(e));default:return null}}convertTimestamp(e){const t=kn(e);return new he(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=re.fromString(e);B(rg(r),9688,{name:e});const s=new ui(r.get(1),r.get(3)),i=new U(r.popFirst(5));return s.isEqual(t)||Kt(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jg extends nN{constructor(e){super(),this.firestore=e}convertBytes(e){return new ht(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Te(this.firestore,null,t)}}const rp="@firebase/firestore",sp="4.16.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xg{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Te(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new rN(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const t=this._document.data.field(Oa("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class rN extends Xg{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sN(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new L(k.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Zu{}class iN extends Zu{}function VN(n,e,...t){let r=[];e instanceof Zu&&r.push(e),r=r.concat(t),(function(i){const o=i.filter((l=>l instanceof eh)).length,c=i.filter((l=>l instanceof ja)).length;if(o>1||o>0&&c>0)throw new L(k.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const s of r)n=s._apply(n);return n}class ja extends iN{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new ja(e,t,r)}_apply(e){const t=this._parse(e);return Zg(e._query,t),new ns(e.firestore,e.converter,ll(e._query,t))}_parse(e){const t=mS(e.firestore);return(function(i,o,c,l,u,f,p){let m;if(u.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new L(k.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){op(p,f);const S=[];for(const O of p)S.push(ip(l,i,O));m={arrayValue:{values:S}}}else m=ip(l,i,p)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||op(p,f),m=gS(c,o,p,f==="in"||f==="not-in");return Ee.create(u,f,m)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function xN(n,e,t){const r=e,s=Oa("where",n);return ja._create(s,r,t)}class eh extends Zu{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new eh(e,t)}_parse(e){const t=this._queryConstraints.map((r=>r._parse(e))).filter((r=>r.getFilters().length>0));return t.length===1?t[0]:It.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(s,i){let o=s;const c=i.getFlattenedFilters();for(const l of c)Zg(o,l),o=ll(o,l)})(e._query,t),new ns(e.firestore,e.converter,ll(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function ip(n,e,t){if(typeof(t=ue(t))=="string"){if(t==="")throw new L(k.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!zm(e)&&t.indexOf("/")!==-1)throw new L(k.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(re.fromString(t));if(!U.isDocumentKey(r))throw new L(k.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return vf(n,new U(r))}if(t instanceof Te)return vf(n,t._key);throw new L(k.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Aa(t)}.`)}function op(n,e){if(!Array.isArray(n)||n.length===0)throw new L(k.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Zg(n,e){const t=(function(s,i){for(const o of s)for(const c of o.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null})(n.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new L(k.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new L(k.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class Ls{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Xn extends Xg{constructor(e,t,r,s,i,o){super(e,t,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new To(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Oa("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new L(k.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Xn._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}Xn._jsonSchemaVersion="firestore/documentSnapshot/1.0",Xn._jsonSchema={type:ve("string",Xn._jsonSchemaVersion),bundleSource:ve("string","DocumentSnapshot"),bundleName:ve("string"),bundle:ve("string")};class To extends Xn{data(e={}){return super.data(e)}}class Nr{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Ls(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((r=>{e.call(t,new To(this._firestore,this._userDataWriter,r.key,r,new Ls(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new L(k.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map((c=>{Pe(s._snapshot.query)?_l(s._snapshot.query):Iu(s.query._query);const l=new To(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Ls(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:o++}}))}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((c=>i||c.type!==3)).map((c=>{const l=new To(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Ls(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let u=-1,f=-1;return c.type!==0&&(u=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),f=o.indexOf(c.doc.key)),{type:oN(c.type),doc:l,oldIndex:u,newIndex:f}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new L(k.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Nr._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=mu.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function oN(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return $(61501,{type:n})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Nr._jsonSchemaVersion="firestore/querySnapshot/1.0",Nr._jsonSchema={type:ve("string",Nr._jsonSchemaVersion),bundleSource:ve("string","QuerySnapshot"),bundleName:ve("string"),bundle:ve("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function DN(n){n=ai(n,Te);const e=ai(n.firestore,Xu),t=Yg(e);return Zb(t,n._key).then((r=>aN(e,n,r)))}function ON(n){n=ai(n,ns);const e=ai(n.firestore,Xu),t=Yg(e),r=new Jg(e);return sN(n._query),eN(t,n._query).then((s=>new Nr(e,r,n,s)))}function aN(n,e,t){const r=t.docs.get(e._key),s=new Jg(n);return new Xn(n,s,e._key,r,new Ls(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){bC(cr),Zn(new Rn("firestore",((r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),c=new Xu(new VC(r.getProvider("auth-internal")),new OC(o,r.getProvider("app-check-internal")),tR(o,s),o);return i={useFetchStreams:t,...i},c._setSettings(i),c}),"PUBLIC").setMultipleInstances(!0)),Nt(rp,sp,e),Nt(rp,sp,"esm2020")})();export{xN as A,vN as B,Xr as E,hn as G,SN as a,kN as b,TA as c,yN as d,dN as e,hN as f,mN as g,pN as h,GE as i,CN as j,AN as k,RN as l,EN as m,lN as n,IN as o,_N as p,oI as q,gN as r,wN as s,TN as t,fN as u,ON as v,bN as w,DN as x,NN as y,VN as z};
