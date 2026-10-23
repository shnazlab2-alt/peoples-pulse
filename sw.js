// TH!Nk2 · JeffQ · © Jeff SHNaZLab · W³
// The People's Pulse service worker: offline app shell. Never caches tally API calls.
var CACHE="peoples-pulse-v2";
var SHELL=["./","./index.html","./manifest.json","./pulse-sync.js","./icon.svg","./icon-192.png","./icon-512.png","./icon-180.png","./files.json",
  "/shnaz.css","/shnaz-nav.js","/shnaz-tools.js","/shared/bank.js","/shared/highlight.js","/favicon.svg"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(CACHE).then(function(c){
  return Promise.all(SHELL.map(function(u){return c.add(new Request(u,{cache:"reload"})).catch(function(){})}))}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k.indexOf("peoples-pulse-")===0&&k!==CACHE}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){var r=e.request;if(r.method!=="GET")return;var u=new URL(r.url);if(u.origin!==location.origin)return; /* tallies go straight to network */
  if(r.mode==="navigate"){e.respondWith(fetch(r).then(function(res){var cp=res.clone();caches.open(CACHE).then(function(c){c.put("./index.html",cp)});return res}).catch(function(){return caches.match("./index.html")}));return}
  e.respondWith(caches.match(r).then(function(hit){var net=fetch(r).then(function(res){if(res.ok){var cp=res.clone();caches.open(CACHE).then(function(c){c.put(r,cp)})}return res}).catch(function(){return hit});return hit||net}))});
