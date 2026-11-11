// TH!Nk2 · JeffQ · © Jeff SHNaZLab · W³
// The People's Pulse — layout preview. Same question bank, same rotation,
// same on-device data and world-tally keys as the live app. Live site is untouched.
(function(){"use strict";
var J="Jeff SHNaZLab",AI="SI/AI";
var MC="mc",SC="scale",OPEN="open",YN="yesno",TOT="tot",FILL="fill";
var FIVE=["Strongly Support","Support","Neutral","Oppose","Strongly Oppose"];
var TYPE_LABEL={mc:"Pick one",scale:"1 to 10",open:"Open answer",yesno:"Yes or No",tot:"This or that",fill:"Fill in the blank"};
function q(t,m,w,type,by,opts){return{t:t,m:m,w:w,type:type||MC,by:by||J,opts:opts}}
var Q=[
q("Universal Basic Income","Should every adult receive a basic income, no strings attached?","It would change how people survive automation, care work and hard times."),
q("Global Education Standard","Should there be a shared global minimum standard for what every child learns?","Where you are born still decides what you get to learn.",SC),
q("AI Governance","Should powerful AI systems require a license and a working kill switch?","Rules set now shape who controls the most powerful tools ever made."),
q("Renewable Energy by 2040","Should the world commit to 100% renewable electricity by 2040?","Energy choices this decade decide the climate our kids inherit.",SC),
q("Mental Health as a Human Right","Should mental health care be recognized as a human right?","Most people who need help still can't get it."),
q("Free Speech Limits","What rule should govern speech online?","Speech rules decide who gets heard and who gets hurt.",MC,J,["Minimal limits","Harm-based rules","Platform accountability"]),
q("Longevity Research","Should governments fund research to slow human aging?","Longer, healthier lives raise questions about fairness and who benefits.",SC),
q("Global Carbon Tax","Should there be one global price on carbon emissions?","A shared price could stop pollution from simply moving elsewhere."),
q("6-month Parental Leave","Should every new parent get 6 months of paid leave?","The first months shape a child's health and a family's stability.",SC),
q("Digital Privacy","Should people legally own the data they create?","Your data is worth money — usually to someone else."),
q("Universal Healthcare","Should healthcare be guaranteed to every person?","Medical bills remain a leading cause of financial ruin.",SC),
q("Ethical Meat Alternatives","Should governments support plant-based and cultivated meat?","Food systems touch climate, animals and health at once."),
q("Voting Age 16","Should 16-year-olds vote, with secure online voting available?","Young people live longest with today's decisions.",SC),
q("1% GDP to Space","Should nations spend 1% of GDP on space exploration?","Space spending competes with needs on Earth — and creates new ones."),
q("4-day Workweek","Should the standard workweek be 4 days?","Time is the one thing nobody can earn back.",SC),
q("Gender & Opportunity","What is the biggest barrier to equal opportunity where you live?","Barriers look different everywhere; naming them is the first step.",OPEN),
q("50% Ocean Protection","Should half of the world's oceans be fully protected?","Oceans feed billions and absorb much of our heat.",SC),
q("Personal Data Inheritance","Should your accounts and data pass to your heirs like property?","Our digital lives outlast us, often locked away."),
q("1-year Community Service","Should every young adult do one year of community service?","Shared service could build trust across divides.",SC),
q("Real-time Leadership Transparency","Should leaders' meetings, money and decisions be public in real time?","Trust in leaders depends on seeing what they do."),
q("Nuclear vs Renewables","Should nuclear power be part of the clean-energy plan alongside renewables?","Low-carbon power must be both reliable and safe.",SC,AI),
q("CRISPR Ethics","Should editing human embryos to prevent disease be allowed?","Gene editing could end inherited illness — or redefine what is normal.",MC,AI),
q("Global Minimum Wage","Should there be a global minimum wage, adjusted for local cost of living?","Billions work full time and still live in poverty.",SC,AI),
q("Algorithmic Bias","Should algorithms that decide jobs, loans or bail be independently audited?","Hidden bias in code can affect millions of lives at once.",MC,AI),
q("Universal Language Learning","Should every child learn a second language, including a shared world language?","Language can be a bridge or a wall.",SC,AI),
q("Right to Disconnect","Should workers have a legal right to ignore work messages after hours?","Always-on work blurs the line between job and life.",MC,AI),
q("Animal Rights & Factory Farming","Should factory farming be phased out?","Billions of animals live in industrial conditions every year.",SC,AI),
q("Water Rights","Should clean water be a protected right that cannot be privatized?","Water scarcity is rising as populations and heat grow.",MC,AI),
q("Elderly Care","Should every elder be guaranteed dignified, affordable care?","The world is aging faster than care systems are growing.",SC,AI),
q("Peace Education","Should conflict resolution and peace skills be taught in every school?","Peace is a skill that can be learned, not only a treaty.",MC,AI)
];
window.SZPulse={QUESTIONS:Q};

function pad(n){return String(n).padStart(2,"0")}
function dkey(d){d=d||new Date();return d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate())}
function dnum(k){var p=k.split("-");return Math.floor(Date.UTC(+p[0],p[1]-1,+p[2])/864e5)}
function qFor(k){return dnum(k)%Q.length}
function addDays(k,n){var p=k.split("-"),d=new Date(+p[0],p[1]-1,+p[2]+n);return dkey(d)}
var TODAY=dkey();
var STACK=[];
for(var i=0;i<30;i++)STACK.push(addDays(TODAY,-i)); // today first, then previous days; upcoming hidden
var si=0;
function DK(){return STACK[si]}
function QI(){return qFor(DK())}
function CQ(){return Q[QI()]}

var $=function(s){return document.getElementById(s)};
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function prettyDate(k){return new Date(k+"T12:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric"})}
function whenLabel(k){
  if(k===TODAY)return "Today's question";
  if(k===addDays(TODAY,-1))return "Yesterday";
  return prettyDate(k);
}

var LS="sz-pulse-v1"; // same store as the live app, so existing answers stay
function load(){try{return JSON.parse(localStorage.getItem(LS))||{}}catch(e){return{}}}
var S=load();S.answers=S.answers||{};S.sugg=S.sugg||[];S.cvotes=S.cvotes||{};
function save(){try{localStorage.setItem(LS,JSON.stringify(S))}catch(e){}}

var bankChain=null;function bank(){if(!bankChain&&window.SHNBank)bankChain=SHNBank.chain("daily-pulse");return bankChain}
function deposit(type,data){var c=bank();return c?c.append(type,data):Promise.resolve(null)}

var dbp=null;function db(){if(dbp)return dbp;dbp=new Promise(function(res,rej){var r=indexedDB.open("sz-pulse-media",1);r.onupgradeneeded=function(){r.result.createObjectStore("files",{keyPath:"id"})};r.onsuccess=function(){res(r.result)};r.onerror=function(){rej(r.error)}});return dbp}
function idb(mode,fn){return db().then(function(d){return new Promise(function(res,rej){var t=d.transaction("files",mode),s=t.objectStore("files"),out=fn(s);t.oncomplete=function(){res(out&&out.result!==undefined?out.result:out)};t.onerror=function(){rej(t.error)}})})}
function allMedia(){return idb("readonly",function(s){return s.getAll()})}
function hex(buf){return Array.prototype.map.call(new Uint8Array(buf),function(b){return b.toString(16).padStart(2,"0")}).join("")}

function recFor(k){return S.answers[k]||{}}
function optsOf(qq){
  if(qq.type===YN)return qq.opts||["Yes","No"];
  if(qq.type===TOT)return qq.opts||["This","That"];
  if(qq.type===SC||qq.type===OPEN||qq.type===FILL)return [];
  return qq.opts||FIVE;
}
function label(qq,c){
  if(qq.type===SC)return c+"/10";
  if(qq.type===OPEN||qq.type===FILL)return typeof c==="string"?c:"open answer";
  return (optsOf(qq)[c])||String(c);
}
function ckeyOf(qq,c){return (qq.type===OPEN||qq.type===FILL)?"open":"c"+c}
function baseFor(k,qi){return "d"+k.replace(/-/g,"")+"-q"+qi}

function isBinary(qq){return qq.type===YN||qq.type===TOT||(qq.type===MC&&optsOf(qq).length===2)}
function isText(qq){return qq.type===OPEN||qq.type===FILL}

/* ---------- world tallies ---------- */
var worldCache={};
function worldCount(k,rec){
  if(!window.PulseSync||rec.synced)return;
  rec.synced=true;save();
  var qq=Q[rec.q],b=baseFor(k,rec.q);
  Promise.all([PulseSync.hit(b+"-"+ckeyOf(qq,rec.choice)),PulseSync.hit(b+"-n")]).then(function(r){
    var g=r[0].global;
    var el=$("savedMsg");if(el)el.innerHTML+=(g?' <span class="ok">· counted in the world tally</span>':' <span class="sz-warn-tx">· offline: world vote queued, will send when online</span>');
    deposit("pulse.worldVote",{date:k,question:qq.t,answer:label(qq,rec.choice),global:g,queued:!g});
    fetchWorld(k,true);
  });
}
function fetchWorld(k,force){
  k=k||DK();
  var qq=Q[qFor(k)],o,keys;
  if(!window.PulseSync){paintWorld(k,null);return Promise.resolve()}
  if(!force&&worldCache[k]&&worldCache[k].t>Date.now()-15000){paintWorld(k,worldCache[k]);return Promise.resolve(worldCache[k])}
  if(qq.type===SC)o=[1,2,3,4,5,6,7,8,9,10];
  else if(isText(qq))o=[];
  else o=optsOf(qq).map(function(_,i){return i});
  keys=o.map(function(c){return baseFor(k,qFor(k))+"-c"+c});
  keys.push(baseFor(k,qFor(k))+"-n");
  if(isText(qq))keys.unshift(baseFor(k,qFor(k))+"-open");
  return PulseSync.getMany(keys).then(function(r){
    var pack={k:k,r:r,o:o,qq:qq,t:Date.now()};
    worldCache[k]=pack;paintWorld(k,pack);syncPill(r.global);return pack;
  }).catch(function(){paintWorld(k,null)});
}
function syncPill(g){
  var p=$("syncPill");if(!p)return;
  p.textContent=g?"● world tally live":"● on-device (offline)";
  p.className="pill "+(g?"g":"");
}

function resultHTML(k,pack){
  var qq=Q[qFor(k)],mine=S.answers[k],h="";
  if(!pack||!pack.r){
    if(mine)h+='<p class="tally-meta"><span class="ok">✓ Answered</span> on this device'+(mine.anon?" (anonymous)":"")+". World tally is loading…</p>";
    return h;
  }
  var v=pack.r.values,n=v[v.length-1],o=pack.o;
  h+='<p class="tally-meta"><span class="src '+(pack.r.global?'g">● global tally':'w">● on-device fallback')+'</span><b>'+n+'</b> '+(n===1?"vote":"votes");
  if(mine)h+=' · <span class="ok">you picked '+esc(label(qq,mine.choice))+"</span>";
  h+="</p>";
  if(isText(qq)){
    h+='<p class="note">Open answers stay on each device. The world tally only counts that an answer was given.</p>';
    if(mine&&typeof mine.choice==="string")h+='<div class="mag-card"><div class="d">Your words</div><h3>'+esc(mine.choice)+"</h3></div>";
    return h;
  }
  if(qq.type===SC){
    var tot=o.reduce(function(a,_,i){return a+v[i]},0);
    var sm=tot?o.reduce(function(a,c,i){return a+c*v[i]},0):0;
    if(tot)h+='<p class="tally-meta">World average: <b>'+(sm/tot).toFixed(1)+"</b> / 10</p>";
    h+=o.map(function(c,i){var pc=tot?Math.round(100*v[i]/tot):0;return barRow(c+"/10",v[i],pc,mine&&mine.choice===c)}).join("");
    return h;
  }
  var tot2=o.reduce(function(a,_,i){return a+v[i]},0);
  var labs=optsOf(qq);
  if(isBinary(qq)&&tot2>0){
    var p0=Math.round(100*v[0]/tot2),p1=100-p0;
    h+='<div class="split" role="img" aria-label="'+esc(labs[0])+" "+p0+" percent, "+esc(labs[1])+" "+p1+' percent">';
    h+='<i class="a'+(v[0]?" ":" zero")+'" style="flex:'+v[0]+'">'+(p0>=12?esc(labs[0])+" "+p0+"%":(p0?p0+"%":""))+"</i>";
    h+='<i class="b'+(v[1]?" ":" zero")+'" style="flex:'+v[1]+'">'+(p1>=12?esc(labs[1])+" "+p1+"%":(p1?p1+"%":""))+"</i>";
    h+="</div>";
  }
  h+=o.map(function(c,i){var pc=tot2?Math.round(100*v[i]/tot2):0;return barRow(labs[c],v[i],pc,mine&&mine.choice===c)}).join("");
  return h;
}
function barRow(lab,count,pc,me){
  return '<div class="gbar'+(me?" me":"")+'"><div class="lab"><b>'+esc(lab)+"</b><span>"+count+" · "+pc+'%</span></div><div class="bar"><i style="width:'+pc+'%"></i></div></div>';
}
function paintWorld(k,pack){
  if(k===DK()){
    var box=$("resultBox");
    if(box)box.innerHTML=resultHTML(k,pack);
  }
  if(k===TODAY){
    var w=$("wOut");
    if(w){
      var qq=Q[qFor(k)];
      $("wTitle")&&($("wTitle").textContent=qq.t+" — world vote");
      w.innerHTML=resultHTML(k,pack)||'<p class="note">Loading…</p>';
      var pd=window.PulseSync&&PulseSync.pending();
      if($("wNote"))$("wNote").textContent=(pd?pd+" vote(s) waiting to send · ":"")+(window.PulseSync?("Source: "+PulseSync.label):"");
    }
  }
}

/* ---------- save / answer ---------- */
function currentDraft(){
  var A=recFor(DK());
  return {choice:A.choice!=null?A.choice:null,anon:A.anon!=null?A.anon:true,story:A.story||"",counter:A.counter||""};
}
function commitAnswer(choice,extra){
  extra=extra||{};
  var k=DK(),qq=CQ(),qi=QI(),A=recFor(k);
  if(choice==null||choice==="")return false;
  var rec={
    q:qi,choice:choice,
    story:extra.story!=null?extra.story:(A.story||""),
    counter:extra.counter!=null?extra.counter:(A.counter||""),
    anon:extra.anon!=null?extra.anon:(A.anon!=null?A.anon:true),
    saved:true
  };
  if(!rec.anon)rec.at=new Date().toISOString();
  if(A.synced)rec.synced=true;
  S.answers[k]=rec;save();
  if(!A.saved){
    deposit("pulse.answer",{date:k,question:qq.t,answer:label(qq,choice),story:rec.story?1:0,counter:rec.counter?1:0,anonymous:rec.anon}).then(function(){
      var el=$("savedMsg");if(el)el.innerHTML='<span class="ok">✓ Saved and deposited in the Bank</span>';
    });
    worldCount(k,rec);
  }else{
    var el=$("savedMsg");if(el)el.innerHTML='<span class="ok">✓ Updated on this device</span>';
  }
  return true;
}

/* ---------- stack card ---------- */
function renderCard(){
  var k=DK(),qq=CQ(),qi=QI(),A=recFor(k),el=$("stackCard");
  if(!el)return;
  var qHtml=esc(qq.m).replace(/\?$/,'<span class="qmark">?</span>');
  var h='<div class="card-meta"><div class="brand"><img src="../icon-192.png" alt=""><span>The People\'s Pulse <span class="q">Q</span></span></div>';
  h+='<div class="when">'+esc(whenLabel(k))+'<b>Q '+(qi+1)+'/30 · '+esc(prettyDate(k))+"</b></div></div>";
  h+='<div class="asked">asked by <b>'+esc(qq.by)+"</b> · "+esc(TYPE_LABEL[qq.type]||"Pick one")+"</div>";
  h+='<div class="qmain">'+qHtml+"</div>";
  h+='<p class="why">'+esc(qq.w)+"</p>";

  if(A.saved){
    h+='<div class="results"><div id="resultBox">'+resultHTML(k,worldCache[k])+"</div>";
    h+='<div class="row" style="margin-top:8px"><button class="gold" id="receiptBtn">Share receipt</button><button class="ghost" id="refreshTally">Refresh tally</button></div>';
    h+='<div id="savedMsg" class="note" style="margin-top:8px"></div></div>';
  }else{
    h+=answerControls(qq,A);
  }

  h+=extrasHTML(A);
  h+='<p class="swipe-hint">'+(si<STACK.length-1?"Swipe up for earlier questions":"This is the oldest card in the stack")+"</p>";
  h+='<div class="nudge">';
  h+='<button class="ghost" id="prevDay"'+(si===0?" disabled":"")+' aria-label="Newer question">↑</button>';
  h+='<button class="ghost" id="nextDay"'+(si===STACK.length-1?" disabled":"")+' aria-label="Earlier question">↓</button>';
  h+="</div>";
  el.innerHTML=h;
  bindCard();
  if(A.saved)fetchWorld(k);
  renderMedia();
}
function answerControls(qq,A){
  var choice=A.choice,h="";
  if(qq.type===SC){
    h+='<div class="answers"><div class="scale">';
    for(var i=1;i<=10;i++)h+='<button data-c="'+i+'" class="'+(choice===i?"sel":"")+'" aria-label="'+i+'">'+i+"</button>";
    h+='</div><div class="ends"><span>1 = never implement</span><span>10 = must implement globally</span></div></div>';
  }else if(qq.type===OPEN){
    h+='<div class="answers"><label class="lb" for="openA">Your answer</label><textarea id="openA" class="sz-input" placeholder="Answer in your own words…">'+esc(typeof choice==="string"?choice:"")+"</textarea>";
    h+='<button class="gold" id="sendOpen">Share my answer</button></div>';
  }else if(qq.type===FILL){
    h+='<div class="answers"><label class="lb" for="openA">Fill in the blank</label><input id="openA" class="sz-input" placeholder="Write a short answer…" value="'+esc(typeof choice==="string"?choice:"")+'">';
    h+='<button class="gold" id="sendOpen">Share my answer</button></div>';
  }else if(qq.type===YN||qq.type===TOT){
    var o=optsOf(qq);
    h+='<div class="answers pair">'+o.map(function(x,i){return '<button class="opt '+(i?"b":"a")+(choice===i?" sel":"")+'" data-c="'+i+'">'+esc(x)+"</button>"}).join("")+"</div>";
  }else{
    var o2=optsOf(qq);
    h+='<div class="answers">'+o2.map(function(x,i){return '<button class="opt'+(choice===i?" sel":"")+'" data-c="'+i+'">'+esc(x)+"</button>"}).join("")+"</div>";
  }
  return h;
}
function extrasHTML(A){
  var h='<details class="more-fold"><summary>Story, proof, counter-argument</summary>';
  h+='<label class="lb" for="story">Your story <span class="note">(optional)</span></label>';
  h+='<textarea id="story" class="sz-input" placeholder="How does this question touch your life?">'+esc(A.story||"")+"</textarea>";
  h+='<label class="lb" for="counter">Counter-arguments <span class="note">(the strongest case against your view)</span></label>';
  h+='<textarea id="counter" class="sz-input" placeholder="What would someone who disagrees say?">'+esc(A.counter||"")+"</textarea>";
  h+='<label class="lb">Photos, videos, documents, receipts</label>';
  h+='<label class="ghost" for="file">＋ Add media</label><input id="file" type="file" multiple accept="image/*,video/*,application/pdf,.doc,.docx,.txt,.csv" class="hidden">';
  h+='<p class="note">Files stay in this browser (IndexedDB). Each one gets a dated SHA-256 fingerprint deposited in the Bank as a coin.</p>';
  h+='<div class="media" id="media"></div>';
  var anon=A.anon!=null?A.anon:true;
  h+='<div class="tog"><div><b>Answer anonymously?</b><div class="note">Yes = no name and no time saved with this answer.</div></div><div class="sw" id="anon"><button data-a="yes"'+(anon?' class="on"':'')+'>Yes</button><button data-a="no"'+(!anon?' class="on"':'')+">No</button></div></div>";
  h+='<div class="row" style="margin-top:14px"><button class="gold" id="saveExtras">Save story &amp; details</button><span id="savedMsg2" class="note"></span></div>';
  h+="</details>";
  return h;
}
function bindCard(){
  $("stackCard").querySelectorAll("[data-c]").forEach(function(b){
    b.onclick=function(){
      var c=+b.dataset.c;
      commitAnswer(c,{});
      renderCard();
    };
  });
  if($("sendOpen"))$("sendOpen").onclick=function(){
    var t=($("openA").value||"").trim();
    if(!t){if($("savedMsg"))$("savedMsg").innerHTML='<span class="sz-warn-tx">Write an answer first.</span>';return}
    commitAnswer(t,{});renderCard();
  };
  if($("prevDay"))$("prevDay").onclick=function(){moveStack(-1)};
  if($("nextDay"))$("nextDay").onclick=function(){moveStack(1)};
  if($("refreshTally"))$("refreshTally").onclick=function(){if(window.PulseSync)PulseSync.flush().then(function(){fetchWorld(DK(),true)})};
  if($("receiptBtn"))$("receiptBtn").onclick=function(){makeReceipt(DK())};
  if($("anon"))$("anon").onclick=function(e){
    var b=e.target.closest("button");if(!b)return;
    var anon=b.dataset.a==="yes";
    $("anon").querySelectorAll("button").forEach(function(x){x.classList.toggle("on",(x.dataset.a==="yes")===anon)});
    var A=recFor(DK());if(A.saved){A.anon=anon;if(!anon&&!A.at)A.at=new Date().toISOString();if(anon)delete A.at;S.answers[DK()]=A;save()}
  };
  if($("saveExtras"))$("saveExtras").onclick=function(){
    var A=recFor(DK());
    if(!A.saved){
      $("savedMsg2").innerHTML='<span class="sz-warn-tx">Pick an answer first, then you can save a story.</span>';
      return;
    }
    var anon=$("anon").querySelector('button.on').dataset.a==="yes";
    commitAnswer(A.choice,{story:$("story").value.trim(),counter:$("counter").value.trim(),anon:anon});
    $("savedMsg2").innerHTML='<span class="ok">✓ Saved on this device</span>';
  };
  if($("file"))$("file").onchange=function(){
    var day=DK(),fs=[].slice.call(this.files);this.value="";
    fs.reduce(function(p,f){return p.then(function(){return f.arrayBuffer().then(function(buf){return crypto.subtle.digest("SHA-256",buf).then(function(h){var sha=hex(h),id=Date.now()+"-"+Math.random().toString(36).slice(2,7),rec={id:id,date:day,name:f.name,type:f.type,size:f.size,sha256:sha,blob:new Blob([buf],{type:f.type})};
      return idb("readwrite",function(s){s.put(rec)}).then(function(){return deposit("pulse.media",{date:day,name:f.name,type:f.type||"file",size:f.size,sha256:sha})})})})})},Promise.resolve()).then(renderMedia);
  };
}

var urls=[];
function renderMedia(){
  var box=$("media");if(!box)return;
  urls.forEach(URL.revokeObjectURL);urls=[];
  var day=DK();
  allMedia().then(function(list){
    var t=list.filter(function(m){return m.date===day});
    box.innerHTML=t.map(function(m){
      var u=URL.createObjectURL(m.blob);urls.push(u);
      var inner=/^image\//.test(m.type)?'<img src="'+u+'" alt="">':/^video\//.test(m.type)?'<video src="'+u+'" muted playsinline></video>':'<div>📄<br>'+esc(m.name)+"</div>";
      return '<div class="m">'+inner+'<div class="h">'+m.sha256.slice(0,12)+"…</div></div>";
    }).join("");
  }).catch(function(){box.innerHTML='<p class="warnbox">This browser blocked on-device storage, so media can\'t be kept here.</p>'});
}

function moveStack(dir){
  var n=si+dir;
  if(n<0||n>=STACK.length)return;
  si=n;renderCard();syncHash();
}

/* swipe on the stack */
(function(){
  var startY=null,startX=null,locked=false;
  var stage;
  function bind(){
    stage=$("stage");if(!stage||stage._bound)return;stage._bound=true;
    stage.addEventListener("touchstart",function(e){var t=e.changedTouches[0];startY=t.clientY;startX=t.clientX;locked=false},{passive:true});
    stage.addEventListener("touchmove",function(e){
      if(startY==null)return;
      var t=e.changedTouches[0],dy=t.clientY-startY,dx=t.clientX-startX;
      if(Math.abs(dy)>Math.abs(dx)&&Math.abs(dy)>12)locked=true;
    },{passive:true});
    stage.addEventListener("touchend",function(e){
      if(startY==null)return;
      var t=e.changedTouches[0],dy=t.clientY-startY,dx=t.clientX-startX;
      startY=null;startX=null;
      if(Math.abs(dy)<50||Math.abs(dy)<Math.abs(dx))return;
      if(dy<0)moveStack(1);else moveStack(-1);
    });
  }
  document.addEventListener("keydown",function(e){
    if(document.body.dataset.view!=="stack")return;
    if(e.key==="ArrowDown"||e.key==="PageDown"){e.preventDefault();moveStack(1)}
    if(e.key==="ArrowUp"||e.key==="PageUp"){e.preventDefault();moveStack(-1)}
  });
  window._bindSwipe=bind;
})();

/* ---------- receipt ---------- */
function receiptUrl(k){return "https://shnazlab2-alt.github.io/peoples-pulse/preview/#q="+k}
function makeReceipt(k){
  k=k||DK();
  var qq=Q[qFor(k)],pack=worldCache[k],mine=S.answers[k];
  var W=1080,H=1350,c=document.createElement("canvas");c.width=W;c.height=H;
  var g=c.getContext("2d");
  g.fillStyle="#0C0D10";g.fillRect(0,0,W,H);
  g.fillStyle="#E8B923";g.font="bold 72px ui-sans-serif,system-ui,sans-serif";g.fillText("Q",64,110);
  g.fillStyle="#F4F1EA";g.font="bold 36px ui-sans-serif,system-ui,sans-serif";g.fillText("The People's Pulse",130,100);
  g.fillStyle="#9B968C";g.font="22px ui-sans-serif,system-ui,sans-serif";g.fillText(prettyDate(k)+"  ·  W³ / What Matters³",130,136);
  g.fillStyle="#E8B923";g.fillRect(64,170,160,4);
  g.fillStyle="#F4F1EA";
  wrapText(g,qq.m,64,240,W-128,52,"bold 44px ui-sans-serif,system-ui,sans-serif");
  var y=420;
  if(pack&&pack.r&&!isText(qq)){
    var v=pack.r.values,o=pack.o,tot=o.reduce(function(a,_,i){return a+v[i]},0),n=v[v.length-1];
    g.fillStyle="#9B968C";g.font="22px ui-sans-serif,system-ui,sans-serif";
    g.fillText((pack.r.global?"World tally":"On-device tally")+"  ·  "+n+" vote"+(n===1?"":"s"),64,y);y+=30;
    var labs=qq.type===SC?o.map(function(c){return c+"/10"}):optsOf(qq);
    o.forEach(function(c,i){
      var pc=tot?Math.round(100*v[i]/tot):0,me=mine&&mine.choice===c;
      g.fillStyle="#9B968C";g.font="20px ui-sans-serif,system-ui,sans-serif";
      g.fillText(labs[qq.type===SC?i:c]+(me?"  ·  you":""),64,y+28);
      g.fillStyle="#F4F1EA";g.font="bold 20px ui-sans-serif,system-ui,sans-serif";
      g.fillText(pc+"%",W-64-g.measureText(pc+"%").width,y+28);
      g.fillStyle="#2A2E38";g.fillRect(64,y+40,W-128,16);
      g.fillStyle="#E8B923";g.fillRect(64,y+40,Math.max(0,(W-128)*pc/100),16);
      y+=78;
    });
  }else if(mine){
    g.fillStyle="#3DA66B";g.font="bold 28px ui-sans-serif,system-ui,sans-serif";
    g.fillText("Your answer: "+label(qq,mine.choice),64,y+20);
    y+=80;
  }
  y=Math.max(y+40,1080);
  g.fillStyle="#E8B923";g.fillRect(64,y,160,4);y+=50;
  g.fillStyle="#9B968C";g.font="20px ui-sans-serif,system-ui,sans-serif";
  g.fillText("Check the live numbers:",64,y);
  g.fillStyle="#F4F1EA";g.font="bold 22px ui-monospace,monospace";
  g.fillText(receiptUrl(k),64,y+36);
  g.fillStyle="#9B968C";g.font="18px ui-sans-serif,system-ui,sans-serif";
  g.fillText("Jeff SHNaZLab  ·  a pulse, not an official poll",64,H-60);

  c.toBlob(function(blob){
    if(!blob)return;
    var file=new File([blob],"peoples-pulse-"+k+".png",{type:"image/png"});
    var url=URL.createObjectURL(blob);
    if(navigator.share&&navigator.canShare&&navigator.canShare({files:[file]})){
      navigator.share({title:"The People's Pulse",text:qq.m+" — "+receiptUrl(k),files:[file],url:receiptUrl(k)}).catch(function(){download(url,file.name)});
    }else download(url,file.name);
  },"image/png");
}
function download(url,name){var a=document.createElement("a");a.href=url;a.download=name;a.click()}
function wrapText(g,text,x,y,maxW,lh,font){
  g.font=font;g.fillStyle="#F4F1EA";
  var words=text.split(" "),line="",yy=y;
  words.forEach(function(w,i){
    var test=line?line+" "+w:w;
    if(g.measureText(test).width>maxW&&line){g.fillText(line,x,yy);line=w;yy+=lh}
    else line=test;
    if(i===words.length-1)g.fillText(line,x,yy);
  });
}

/* ---------- You / stats ---------- */
function stats(keys){var n=0,sup=0,sum=0,sc=0,st=0,cn=0;keys.forEach(function(k){var a=S.answers[k];if(!a)return;n++;var qq=Q[a.q];if(qq.type===SC){sum+=a.choice;sc++;if(a.choice>=6)sup++}else if(qq.type===MC&&!qq.opts){if(a.choice<=1)sup++}if(a.story)st++;if(a.counter)cn++});return{n:n,sup:sup,avg:sc?(sum/sc).toFixed(1):"—",sc:sc,st:st,cn:cn}}
function mediaCount(keys){return allMedia().then(function(l){return l.filter(function(m){return keys.indexOf(m.date)>=0}).length}).catch(function(){return 0})}
function statGrid(s,m,sg,period){var pct=s.n?Math.round(100*s.sup/s.n)+"%":"—";return'<div class="stat"><div class="s"><div class="n">'+pct+'</div><div class="l">support ('+period+', this device)</div></div><div class="s"><div class="n">'+s.avg+'</div><div class="l">average 1–10 score</div></div><div class="s"><div class="n">'+s.st+'</div><div class="l">stories</div></div><div class="s"><div class="n">'+m+'</div><div class="l">media uploads</div></div><div class="s"><div class="n">'+sg+'</div><div class="l">question suggestions</div></div><div class="s"><div class="n">'+s.cn+'</div><div class="l">counter-arguments</div></div></div>'}
function empty(){return'<p class="note">No answers on this device yet. These numbers only count what was entered here — there are no sample or invented figures.</p>'}
function lastN(n){var k=[];for(var i=0;i<n;i++)k.push(addDays(TODAY,-i));return k}

function renderYou(){
  var keys=Object.keys(S.answers).filter(function(k){return S.answers[k]&&S.answers[k].saved}).sort().reverse();
  var h='<p class="lede">A magazine of your answers on this device. It grows with every question you answer. Nothing here is sent anywhere unless you copy it yourself.</p>';
  h+='<div class="mag-card"><div class="d">You</div><h3>'+keys.length+' answered</h3><p class="note">Today first, then earlier days. Upcoming questions stay hidden until their day.</p></div>';
  if(!keys.length)h+=empty();
  else h+='<div class="mag">'+keys.map(function(k){
    var a=S.answers[k],qq=Q[a.q];
    return '<button class="mag-card" data-goto="'+k+'" style="width:100%;text-align:left;cursor:pointer;color:inherit"><div class="d">'+esc(prettyDate(k))+(k===TODAY?" · today":"")+'</div><h3>'+esc(qq.m)+'</h3><p><span class="pill g">'+esc(label(qq,a.choice))+"</span> · asked by "+esc(qq.by)+"</p></button>";
  }).join("")+"</div>";
  $("youMag").innerHTML=h;
  $("youMag").querySelectorAll("[data-goto]").forEach(function(b){b.onclick=function(){openDate(b.dataset.goto)}});
  renderResults();renderWeekly();renderMonthly();
}
function renderResults(){var a=S.answers[TODAY];mediaCount([TODAY]).then(function(m){var sg=S.sugg.filter(function(x){return x.date===TODAY}).length;
  var h=a?'<p>Your answer today: <b>'+esc(label(Q[a.q],a.choice))+'</b> <span class="pill g">answered</span></p>':empty();
  $("res").innerHTML=h+statGrid(stats([TODAY]),m,sg,"today")+'<p class="note" style="margin-top:10px">Counts are from this device only. See World for the shared tally.</p>'})}
function renderWeekly(){var ks=lastN(7),answered=ks.filter(function(k){return S.answers[k]});mediaCount(ks).then(function(m){var sg=S.sugg.filter(function(x){return ks.indexOf(x.date)>=0}).length,h="";
  if(!answered.length)h=empty();else{var best=answered.map(function(k){return S.answers[k]}).filter(function(a){return a.story}).sort(function(x,y){return y.story.length-x.story.length})[0];
  h+='<ul class="list">'+answered.map(function(k){var a=S.answers[k];return"<li><b>"+k+"</b> · "+esc(Q[a.q].t)+" — "+esc(label(Q[a.q],a.choice))+"</li>"}).join("")+"</ul>";
  if(best)h+='<p class="why"><b>Highlight story — '+esc(Q[best.q].t)+":</b> "+esc(best.story)+"</p>"}
  $("wk").innerHTML=h+statGrid(stats(ks),m,sg,"7 days")})}
function renderMonthly(){var p=TODAY.slice(0,7),ks=[];for(var i=0;i<31;i++){var k=addDays(p+"-01",i);if(k.slice(0,7)===p)ks.push(k)}
  var name=new Date(TODAY+"T12:00").toLocaleString("en-US",{month:"long",year:"numeric"});$("moTitle").textContent=name;
  mediaCount(ks).then(function(m){var sg=S.sugg.filter(function(x){return x.date.slice(0,7)===p}).length,ans=ks.filter(function(k){return S.answers[k]});
    var h=statGrid(stats(ks),m,sg,"this month")+"<p style=\"margin-top:12px\"><b>"+ans.length+"</b> of "+ks.length+" days answered on this device.</p><div class=\"gbar\"><div class=\"bar\"><i style=\"width:"+Math.round(100*ans.length/ks.length)+'%"></i></div></div>';
    if(ans.length)h+='<ul class="list">'+ans.map(function(k){var a=S.answers[k];return"<li><b>"+k+"</b> · "+esc(Q[a.q].t)+" — "+esc(label(Q[a.q],a.choice))+"</li>"}).join("")+"</ul>";else h+=empty();
    $("mo").innerHTML=h+"<p class=\"note\">Monthly Impact Report · The People's Pulse · W³ / What Matters³ by Jeff SHNaZLab · figures from this device only.</p>"})}
$("printMo")&&($("printMo").onclick=function(){var w=window.open("","_blank");if(!w){window.print();return}w.document.write('<!doctype html><meta charset="utf-8"><title>Monthly Impact Report</title><style>body{font:15px/1.5 system-ui,sans-serif;max-width:720px;margin:30px auto;padding:0 16px;color:#111}.stat{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.s{border:1px solid #ccc;border-radius:10px;padding:10px}.n{font:800 24px system-ui}.l,.note{color:#555;font-size:12px}.bar{height:10px;background:#eee;border-radius:9px;overflow:hidden}.bar i{display:block;height:100%;background:#E8B923}ul{padding-left:18px}</style><h1>Monthly Impact Report — '+esc($("moTitle").textContent)+"</h1><p>The People's Pulse (this device)</p>"+$("mo").innerHTML);w.document.close();w.focus();setTimeout(function(){w.print()},300)});

/* ---------- Ask / community ---------- */
var suggType=MC,suggOpts="";
function renderAsk(){
  $("types").querySelectorAll("button").forEach(function(b){b.classList.toggle("on",b.dataset.ty===suggType)});
  var need=suggType===TOT||suggType==="mc-custom";
  $("suggOptsWrap").classList.toggle("hidden",suggType!==TOT&&suggType!==MC);
  renderCommunity();
}
function renderCommunity(){var l=S.sugg.slice().sort(function(a,b){return(S.cvotes[b.id]||0)-(S.cvotes[a.id]||0)});
  $("cv").innerHTML=l.length?l.map(function(s){return '<li class="row" style="justify-content:space-between;flex-wrap:nowrap"><span>'+esc(s.text)+"<br><span class=\"note\">suggested "+s.date+(s.type?" · "+esc(TYPE_LABEL[s.type]||s.type):"")+"</span></span><button class=\"ghost\" data-up=\""+s.id+"\">▲ "+(S.cvotes[s.id]||0)+"</button></li>"}).join(""):'<li class="note">No suggestions yet. Add one above.</li>';
  $("cv").querySelectorAll("[data-up]").forEach(function(b){b.onclick=function(){S.cvotes[b.dataset.up]=(S.cvotes[b.dataset.up]||0)+1;save();deposit("pulse.communityVote",{id:b.dataset.up});renderCommunity()}})}

/* ---------- Bank, all 30, files, summary ---------- */
function renderBank(){var c=bank(),el=$("bankEl");if(!c){el.innerHTML='<p class="note">Bank is loading…</p>';setTimeout(function(){if(!bank())return;renderBank()},400);return}if(!c.records.length){el.innerHTML='<p class="note">No coins yet.</p>';return}
  el.innerHTML='<ul class="list">'+c.records.slice().reverse().map(function(r){var d=r.data||{};return"<li><b>#"+r.seq+" "+esc(r.type.replace("pulse.",""))+"</b> · "+esc(new Date(r.ts).toLocaleString("en-US",{timeZone:"America/Denver",dateStyle:"medium",timeStyle:"short"}))+" MT"+(d.name?" · "+esc(d.name):"")+(d.sha256?'<div class="mono">file SHA-256 '+d.sha256+"</div>":"")+'<div class="mono" style="color:var(--mu)">coin '+r.hash+"</div></li>"}).join("")+"</ul>"}
function renderAll(){$("allq").innerHTML=Q.map(function(x,i){var today=i===qFor(TODAY);return "<li"+(today?' style="color:#E8B923;font-weight:700"':"")+"><b>"+esc(x.t)+"</b> — "+esc(x.m)+' <span class="note">('+(TYPE_LABEL[x.type]||x.type)+" · asked by "+esc(x.by)+(today?" · today":"")+")</span></li>"}).join("")}

function rel(p){return !p?p:(/^https?:/i.test(p)?p:"../"+p)}
var FL=null;
function renderFiles(){if(!FL){fetch("../files.json").then(function(r){return r.json()}).then(function(d){FL=d;var cs={};d.forEach(function(i){cs[i.cat]=1});var sel=$("flCat");if(sel&&!sel._filled){sel._filled=true;Object.keys(cs).sort().forEach(function(c){var o=document.createElement("option");o.textContent=c;sel.appendChild(o)})}paintFiles()}).catch(function(){$("flOut").innerHTML='<p class="note">Could not load the library.</p>'})}else paintFiles();renderMine()}
function paintFiles(){var qv=$("flQ").value.toLowerCase(),c=$("flCat").value,st=$("flSt").value,g={};FL.forEach(function(i){if(c&&i.cat!==c||st&&i.status!==st)return;if(qv&&(i.title+" "+i.sha256+" "+i.cat).toLowerCase().indexOf(qv)<0)return;(g[i.cat]=g[i.cat]||[]).push(i)});
  var h="";Object.keys(g).sort().forEach(function(k){h+='<div class="fl-cat">'+esc(k)+" · "+g[k].length+"</div>";g[k].forEach(function(i){var t=esc(i.title.split("\n")[0].slice(0,120));h+='<div class="fl-it">'+(i.thumb?'<img loading="lazy" src="'+esc(rel(i.thumb))+'" alt="">':"")+"<div><div class=\"t\">"+(i.path?'<a href="'+esc(rel(i.path))+'" target="_blank" rel="noopener">'+t+"</a>":t)+'</div><div class="m"><span class="st '+i.status+'">'+i.status+"</span>"+esc(i.date)+(i.created?" · created "+esc(i.created):"")+(i.exif_date?" · photo "+esc(i.exif_date):"")+(i.record?" · "+esc(i.record):"")+(i.sha256?"<br>SHA-256 "+esc(i.sha256):"")+"</div></div></div>"})});
  $("flOut").innerHTML=h||'<p class="note">No matches.</p>'}
var mdbp=null;function mdb(){if(mdbp)return mdbp;mdbp=new Promise(function(res,rej){var r=indexedDB.open("sz-pulse-myfiles",1);r.onupgradeneeded=function(){r.result.createObjectStore("files",{keyPath:"id"})};r.onsuccess=function(){res(r.result)};r.onerror=function(){rej(r.error)}});return mdbp}
function mtx(mode,fn){return mdb().then(function(d){return new Promise(function(res,rej){var t=d.transaction("files",mode),o=fn(t.objectStore("files"));t.oncomplete=function(){res(o&&o.result)};t.onerror=function(){rej(t.error)}})})}
function renderMine(){mtx("readonly",function(s){return s.getAll()}).then(function(a){a=a||[];$("myOut").innerHTML=a.length?a.map(function(f){return '<div class="fl-it"><div><div class="t">'+esc(f.name)+'</div><div class="m">'+esc(new Date(f.at).toLocaleString("en-US",{timeZone:"America/Denver",year:"numeric",month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}))+" MT · "+Math.round(f.size/1024)+" KB<br>SHA-256 "+esc(f.sha256)+"</div></div></div>"}).join(""):'<p class="note">No device files yet.</p>'}).catch(function(){})}

function buildSummary(){var a=S.answers[TODAY],s=stats([TODAY]),nk=addDays(TODAY,1),nq=Q[qFor(nk)];mediaCount([TODAY]).then(function(m){
  var lines=["🌍 The People's Pulse — "+TODAY,"Today's question: "+Q[qFor(TODAY)].t+" — "+Q[qFor(TODAY)].m,"Why it matters: "+Q[qFor(TODAY)].w,""];
  if(a)lines.push("My answer: "+label(Q[a.q],a.choice));else lines.push("My answer: (not answered yet)");
  lines.push("This device: "+s.st+" story, "+m+" media, "+S.sugg.filter(function(x){return x.date===TODAY}).length+" suggestion(s).","","Tomorrow's question ("+nk+"): "+nq.t+" — "+nq.m+(nq.by===AI?" (asked by SI/AI)":""),"","Answer at https://shnazlab2-alt.github.io/peoples-pulse/","W³ / What Matters³ by Jeff SHNaZLab");
  var txt=lines.join("\n");$("sumOut").innerHTML='<pre class="sum" id="sumTxt"></pre><button class="gold" id="copySum">Copy summary</button> <span class="note" id="copyMsg">Copy it and post it yourself — nothing is sent.</span>';$("sumTxt").textContent=txt;
  $("copySum").onclick=function(){(navigator.clipboard?navigator.clipboard.writeText(txt):Promise.reject()).then(function(){$("copyMsg").innerHTML='<span class="ok">✓ Copied</span>'},function(){var r=document.createRange();r.selectNode($("sumTxt"));getSelection().removeAllRanges();getSelection().addRange(r);$("copyMsg").textContent="Selected — press copy."})}})}

/* ---------- more sections inside More ---------- */
function showMoreSection(id){
  ["moreHome","v-bank","v-all","v-files"].forEach(function(k){
    var n=$(k);if(n)n.classList.toggle("hidden",k!==id);
  });
  if(id==="v-bank")renderBank();
  if(id==="v-all")renderAll();
  if(id==="v-files")renderFiles();
}

/* ---------- navigation ---------- */
var VIEWS={stack:function(){renderCard();window._bindSwipe&&_bindSwipe()},world:function(){fetchWorld(TODAY,true)},you:renderYou,ask:renderAsk,more:function(){showMoreSection("moreHome");paintThemes()}};
function show(v){
  if(!VIEWS[v])v="stack";
  document.body.dataset.view=v;
  document.querySelectorAll(".dock button").forEach(function(b){b.classList.toggle("on",b.dataset.v===v)});
  document.querySelectorAll("main > .panel").forEach(function(p){p.classList.toggle("on",p.id==="v-"+v)});
  VIEWS[v]();syncHash();
}
function openDate(k){
  var i=STACK.indexOf(k);
  if(i<0){ /* older than the 30-day stack: jump if we can extend? keep hidden upcoming, allow older by inserting */
    if(dnum(k)<dnum(TODAY)){STACK.push(k);STACK.sort(function(a,b){return dnum(b)-dnum(a)});i=STACK.indexOf(k)}
  }
  if(i>=0){si=i;show("stack")}
}
function syncHash(){
  var v=document.body.dataset.view||"stack",h;
  if(v==="stack")h="q="+DK();
  else h=v;
  if(location.hash.slice(1)!==h)history.replaceState(null,"","#"+h);
}
function applyHash(){
  var h=location.hash.slice(1)||"";
  if(h.indexOf("q=")===0){var k=h.slice(2);if(/^\d{4}-\d{2}-\d{2}$/.test(k)){openDate(k);return}}
  if(VIEWS[h])show(h);
  else if(h==="files"||h==="bank"||h==="all"){show("more");showMoreSection(h==="all"?"v-all":h==="files"?"v-files":"v-bank")}
  else show("stack");
}

/* ---------- themes ---------- */
var THEME_KEY="pp-preview-theme";
function currentTheme(){try{return localStorage.getItem(THEME_KEY)||"quiet"}catch(e){return"quiet"}}
function setTheme(t){
  try{localStorage.setItem(THEME_KEY,t)}catch(e){}
  if(t==="quiet"){
    document.documentElement.setAttribute("data-pp-theme","quiet");
    /* do not write an unknown value into the shared ecosystem theme */
  }else{
    document.documentElement.removeAttribute("data-pp-theme");
    if(window.SZTheme)SZTheme.set(t);
  }
  paintThemes();
}
function paintThemes(){
  var t=currentTheme();
  $("themes").querySelectorAll("button").forEach(function(b){b.classList.toggle("on",b.dataset.t===t)});
}

/* ---------- install (points at the live PWA; preview does not replace it) ---------- */
var dp=null,standalone=matchMedia("(display-mode: standalone)").matches||navigator.standalone;
addEventListener("beforeinstallprompt",function(e){e.preventDefault();dp=e;if(!standalone)$("inst").classList.remove("hidden")});
if($("instBtn"))$("instBtn").onclick=function(){if(dp){dp.prompt();dp.userChoice.then(function(){dp=null;$("inst").classList.add("hidden")})}};
if(!standalone&&/iphone|ipad|ipod/i.test(navigator.userAgent)){if($("inst"))$("inst").classList.remove("hidden");if($("instBtn"))$("instBtn").classList.add("hidden");if($("instTxt"))$("instTxt").innerHTML="Install the live app: tap Share <b>⬆︎</b>, then <b>Add to Home Screen</b>."}
addEventListener("appinstalled",function(){if($("inst"))$("inst").classList.add("hidden")});
/* Do not register a service worker from this preview — the live app already covers /peoples-pulse/. */

/* ---------- wire remaining UI once DOM is ready (this file is at end of body) ---------- */
$("dock").onclick=function(e){var b=e.target.closest("button");if(b&&b.dataset.v)show(b.dataset.v)};
$("themes").onclick=function(e){var b=e.target.closest("button");if(b)setTheme(b.dataset.t)};
(function(){var on=localStorage.getItem("pp-sec")!=="0";document.body.classList.toggle("sec-on",on);$("secToggle").checked=on;$("secToggle").onchange=function(){localStorage.setItem("pp-sec",this.checked?"1":"0");document.body.classList.toggle("sec-on",this.checked)}})();
$("types").onclick=function(e){var b=e.target.closest("button");if(!b)return;suggType=b.dataset.ty;renderAsk()};
$("addSugg").onclick=function(){
  var t=$("sugg").value.trim();if(!t){$("suggMsg").innerHTML='<span class="sz-warn-tx">Write a question first.</span>';return}
  var s={id:Date.now().toString(36),text:t,date:TODAY,type:suggType};
  if(suggType===TOT||suggType===MC){var raw=($("suggOpts").value||"").split(",").map(function(x){return x.trim()}).filter(Boolean);if(raw.length)s.opts=raw}
  S.sugg.push(s);save();$("sugg").value="";deposit("pulse.suggestion",{date:TODAY,text:t,type:suggType}).then(function(){$("suggMsg").innerHTML='<span class="ok">✓ Added to Community Vote</span>';renderCommunity()});
};
$("sumBtn").onclick=buildSummary;
$("verify").onclick=function(){var c=bank();if(!c)return;c.verify().then(function(r){$("vres").innerHTML=r.ok?'<span class="ok">✓ chain intact ('+r.n+" coins)</span>":'<span class="sz-review">needs review — chain breaks at #'+r.at+"</span>"})};
$("wRefresh").onclick=function(){if(window.PulseSync)PulseSync.flush().then(function(){fetchWorld(TODAY,true)})};
["flQ","flCat","flSt"].forEach(function(k){if($(k))$(k).oninput=function(){if(FL)paintFiles()}});
$("myFile").onchange=function(){var fs=[].slice.call(this.files);Promise.all(fs.map(function(f){return f.arrayBuffer().then(function(b){return crypto.subtle.digest("SHA-256",b).then(function(d){var h=hex(d),rec={id:h+"-"+Date.now(),name:f.name,type:f.type,size:f.size,at:Date.now(),sha256:h,blob:new Blob([b],{type:f.type})};return mtx("readwrite",function(s){s.put(rec)}).then(function(){return deposit("pulse.myfile",{name:f.name,size:f.size,sha256:h})})})})})).then(renderMine);this.value=""};
document.querySelectorAll("[data-more]").forEach(function(b){b.onclick=function(){showMoreSection(b.dataset.more)}});
if($("backMore"))$("backMore").onclick=function(){showMoreSection("moreHome")};
document.querySelectorAll("[data-back-more]").forEach(function(b){b.onclick=function(){showMoreSection("moreHome")}});

if($("dayPill"))$("dayPill").textContent=prettyDate(TODAY)+" · Q "+(qFor(TODAY)+1)+"/30";
setTheme(currentTheme());
var A0=S.answers[TODAY];
if(A0&&A0.saved&&!A0.synced&&window.PulseSync)worldCount(TODAY,A0);
if(window.PulseSync)PulseSync.flush();
applyHash();
addEventListener("hashchange",applyHash);
})();
