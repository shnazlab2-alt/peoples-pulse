// TH!Nk2 · JeffQ · © Jeff SHNaZLab · W³
/* pulse-sync.js — shared ("global") vote tallies for The People's Pulse, with on-device fallback.
 *
 * Adapter interface (every backend implements the same two calls):
 *   hit(key)   -> Promise<number>          add 1 to a counter, resolve new value
 *   get(key)   -> Promise<number>          read a counter (0 if it doesn't exist yet)
 *
 * Built-in backends:
 *   "abacus"   — LIVE. Free public counter API (abacus.jasoncameron.dev). No account, no key.
 *                Limits: counts only go up (no undo), anyone could inflate a counter, counters
 *                expire after ~6 months unused, rate-limited, third-party uptime. Only numbers
 *                are sent — never names, stories, media or suggestion text.
 *   "supabase" — READY, needs config: PulseSync.configure({backend:"supabase",url,anonKey}).
 *                Expects table pulse_tallies(key text primary key, value int) + RPC pulse_hit(k text).
 *   "firebase" — READY, needs config: PulseSync.configure({backend:"firebase",databaseURL}).
 *                Uses the Realtime Database REST API (/pulse/<key>.json) with rules allowing increments.
 *   "local"    — always available; counts on this device only.
 * Anything that fails is queued in localStorage and retried when the device is back online.
 */
(function(g){"use strict";
var NS="shnazlab-peoples-pulse",OUT="pp-sync-outbox",CFG="pp-sync-config",LOC="pp-sync-local";
function J(k,d){try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}}
function W(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
function to(p,ms){return Promise.race([p,new Promise(function(_,r){setTimeout(function(){r(new Error("timeout"))},ms)})])}
function js(url,opt){return to(fetch(url,opt||{}),8000).then(function(r){return r.json().then(function(b){return{ok:r.ok,status:r.status,body:b}})})}
var B={
  abacus:{name:"Abacus public counters (no account)",global:true,
    hit:function(k){return js("https://abacus.jasoncameron.dev/hit/"+NS+"/"+k).then(function(r){if(!r.ok)throw new Error(r.body&&r.body.error||r.status);return r.body.value})},
    get:function(k){return js("https://abacus.jasoncameron.dev/info/"+NS+"/"+k).then(function(r){if(!r.ok)throw new Error(r.body&&r.body.error||r.status);return r.body.exists?r.body.value:0})}},
  supabase:{name:"Supabase",global:true,
    h:function(c){return{apikey:c.anonKey,Authorization:"Bearer "+c.anonKey,"Content-Type":"application/json"}},
    hit:function(k,c){return js(c.url+"/rest/v1/rpc/pulse_hit",{method:"POST",headers:this.h(c),body:JSON.stringify({k:k})}).then(function(r){if(!r.ok)throw new Error(r.status);return +r.body||0})},
    get:function(k,c){return js(c.url+"/rest/v1/pulse_tallies?key=eq."+encodeURIComponent(k)+"&select=value",{headers:this.h(c)}).then(function(r){if(!r.ok)throw new Error(r.status);return r.body[0]?r.body[0].value:0})}},
  firebase:{name:"Firebase Realtime Database",global:true,
    hit:function(k,c){return js(c.databaseURL+"/pulse/"+k+".json",{method:"PATCH",body:JSON.stringify({".sv":{"increment":1}})}).then(function(){return B.firebase.get(k,c)})},
    get:function(k,c){return js(c.databaseURL+"/pulse/"+k+".json").then(function(r){if(!r.ok)throw new Error(r.status);return +r.body||0})}},
  local:{name:"This device only",global:false,
    hit:function(k){var m=J(LOC,{});m[k]=(m[k]||0)+1;W(LOC,m);return Promise.resolve(m[k])},
    get:function(k){return Promise.resolve(J(LOC,{})[k]||0)}}
};
var cfg=J(CFG,{backend:"abacus"});if(!B[cfg.backend])cfg.backend="abacus";
var status={online:null,lastError:null};
function be(){return B[cfg.backend]}
function key(s){return String(s).toLowerCase().replace(/[^a-z0-9_-]/g,"-").slice(0,64)}
function flush(){var q=J(OUT,[]);if(!q.length||!navigator.onLine)return Promise.resolve(0);
  return q.reduce(function(p,k){return p.then(function(left){return be().hit(k,cfg).then(function(){return left},function(){left.push(k);return left})})},Promise.resolve([])).then(function(left){W(OUT,left);return q.length-left.length})}
var PulseSync={
  backends:B,status:status,key:key,
  get backend(){return cfg.backend},get label(){return be().name},get isGlobal(){return be().global},
  configure:function(c){cfg=Object.assign({},cfg,c);if(!B[cfg.backend])cfg.backend="local";W(CFG,cfg);return cfg},
  /* count one vote: always recorded locally, then sent to the shared backend (queued if offline) */
  hit:function(k){k=key(k);B.local.hit(k);if(!be().global)return Promise.resolve({global:false});
    return be().hit(k,cfg).then(function(v){status.online=true;return{global:true,value:v}},function(e){status.online=false;status.lastError=String(e.message||e);var q=J(OUT,[]);q.push(k);W(OUT,q);return{global:false,queued:true}})},
  /* read many counters; falls back to on-device numbers if the backend can't be reached */
  getMany:function(keys){keys=keys.map(key);if(!be().global)return Promise.all(keys.map(function(k){return B.local.get(k)})).then(function(v){return{global:false,values:v}});
    return Promise.all(keys.map(function(k){return be().get(k,cfg)})).then(function(v){status.online=true;return{global:true,values:v}},function(e){status.online=false;status.lastError=String(e.message||e);
      return Promise.all(keys.map(function(k){return B.local.get(k)})).then(function(v){return{global:false,values:v}})})},
  pending:function(){return J(OUT,[]).length},flush:flush
};
g.addEventListener&&g.addEventListener("online",flush);
g.PulseSync=PulseSync;
})(window);
