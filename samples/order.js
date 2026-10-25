(function(){
var P={"Flat white":220,"Cappuccino":210,"Hazelnut latte":260,"Pour-over":280,"Cortado":200,"Mocha":270,"Cold brew tonic":290,"Iced Spanish latte":280,"Masala chai":120,"Kashmiri kahwa":160,"Hibiscus cooler":190,"Cold coffee shake":240,"Masala omelette":220,"Avocado sourdough":380,"Granola bowl":320,"Stuffed paratha":240,"Eggs Benedict":420,"Paneer tikka sandwich":320,"Chicken pesto toastie":360,"Shakshuka":390,"Buttermilk pancakes":350,"Harvest bowl":380,"Basque cheesecake":320,"Almond croissant":210,"Butter croissant":180,"Cinnamon roll":190,"Gulab jamun cheesecake":330,"Dark chocolate tart":290};
var K='eo-cart-v1',WA='918289094569',S;
try{S=JSON.parse(localStorage.getItem(K))||{}}catch(e){S={}}
S.items=S.items||{};S.mode=S.mode||'pickup';S.f=S.f||{};
var lis=[].slice.call(document.querySelectorAll('.c-items li'));if(!lis.length)return;
function sv(){try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}}
function r(n){return '\u20b9'+n.toLocaleString('en-IN')}
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
var nodes={};
lis.forEach(function(li){var b=li.querySelector('b');if(!b)return;var n=b.firstChild.textContent.trim();if(!(n in P))return;
 var d=li.querySelector('.dash');if(d)d.remove();li.classList.add('eo-li');
 var t=document.createElement('div');t.className='eo-t';while(li.firstChild)t.appendChild(li.firstChild);li.appendChild(t);
 var w=document.createElement('div');w.className='eo-pr';w.innerHTML='<span class="eo-p">'+r(P[n])+'</span><span class="eo-ctl"></span>';li.appendChild(w);
 (nodes[n]=nodes[n]||[]).push(w.lastChild);});
function ctl(n,el){var q=S.items[n]||0;
 el.innerHTML=q?'<span class="eo-st" role="group" aria-label="'+esc(n)+' quantity"><button type="button" data-a="-" aria-label="Remove one '+esc(n)+'">\u2212</button><output aria-live="polite">'+q+'</output><button type="button" data-a="+" aria-label="Add one more '+esc(n)+'">+</button></span>':'<button type="button" class="eo-add" data-a="+" aria-label="Add '+esc(n)+' to order">Add</button>';
 el.dataset.n=n;}
function set(n,q,keep){var had=!!S.items[n];if(q<=0)delete S.items[n];else S.items[n]=q;sv();draw();
 if(keep&&keep.closest('.eo-ctl')){var el=keep.closest('.eo-ctl');var f=el.querySelector(q>0?'[data-a="'+keep.dataset.a+'"]':'.eo-add');if(f)f.focus();}}
document.addEventListener('click',function(e){var bt=e.target.closest('.eo-ctl [data-a],.eo-row [data-a]');if(!bt)return;var n=bt.closest('[data-n]').dataset.n;var q=S.items[n]||0;set(n,bt.dataset.a=='+'?q+1:bt.dataset.a=='-'?q-1:0,bt);});
// UI
var fab=document.createElement('button');fab.type='button';fab.className='eo-fab';fab.hidden=true;fab.setAttribute('aria-haspopup','dialog');
document.body.appendChild(fab);
var root=document.createElement('div');root.innerHTML='<div class="eo-bg"></div><aside class="eo-d" role="dialog" aria-modal="true" aria-labelledby="eo-tt" aria-hidden="true" inert><div class="eo-h"><div><h2 id="eo-tt">Your order</h2><small>Sample site \u00b7 orders are sent as a demo on WhatsApp</small></div><button type="button" class="eo-x" aria-label="Close cart">\u2715</button></div><div class="eo-b"><div class="eo-list"></div><div class="eo-sec"><label for="eo-code">Discount code</label><div class="eo-code"><input id="eo-code" autocomplete="off" placeholder="WELCOME10 or FREEBAKE" aria-describedby="eo-cm"><button type="button" class="eo-ap">Apply</button></div><p class="eo-msg" id="eo-cm" role="status"></p></div><div class="eo-sec"><span class="eo-lbl" id="eo-ml">Pickup or delivery</span><div class="eo-tg" role="group" aria-labelledby="eo-ml"><button type="button" data-m="pickup">Pickup</button><button type="button" data-m="delivery">Delivery</button></div><div class="eo-f"></div></div></div><div class="eo-sum"><dl></dl><button type="button" class="eo-go"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z"/></svg>Place order on WhatsApp</button><p class="eo-demo">Demo order for a fictional cafe. No payment is taken.</p></div></aside>';
document.body.appendChild(root);
var D=root.querySelector('.eo-d'),lastF;
function open(){lastF=document.activeElement;document.documentElement.classList.add('eo-open');document.body.classList.add('eo-lock');D.removeAttribute('inert');D.setAttribute('aria-hidden','false');setTimeout(function(){D.querySelector('.eo-x').focus()},50)}
function close(){document.documentElement.classList.remove('eo-open');document.body.classList.remove('eo-lock');D.setAttribute('inert','');D.setAttribute('aria-hidden','true');(lastF||fab).focus()}
fab.onclick=open;root.querySelector('.eo-bg').onclick=close;D.querySelector('.eo-x').onclick=close;
document.addEventListener('keydown',function(e){if(!document.documentElement.classList.contains('eo-open'))return;if(e.key=='Escape')close();if(e.key=='Tab'){var f=[].filter.call(D.querySelectorAll('button,input,textarea'),function(x){return x.offsetParent});var a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement==a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement==z){e.preventDefault();a.focus()}}});
var CODES={WELCOME10:1,FREEBAKE:1};
function calc(){var sub=0,c=0;for(var n in S.items){sub+=P[n]*S.items[n];c+=S.items[n]}var disc=0,free=false,note='';
 if(S.code=='WELCOME10'){disc=Math.round(sub*.1)}
 if(S.code=='FREEBAKE'){if(sub>499)free=true;else note='Add '+r(500-sub)+' more to unlock your free croissant.'}
 return{sub:sub,c:c,disc:disc,free:free,note:note,tot:sub-disc}}
D.querySelector('.eo-ap').onclick=function(){var i=D.querySelector('#eo-code'),v=i.value.trim().toUpperCase(),m=D.querySelector('#eo-cm');
 if(!v){S.code='';m.className='eo-msg';m.textContent='';}else if(CODES[v]){S.code=v;i.setAttribute('aria-invalid','false');}else{S.code='';i.setAttribute('aria-invalid','true');m.className='eo-msg err';m.textContent='"'+v+'" isn\u2019t a valid code. Try WELCOME10 or FREEBAKE.';sv();draw(true);return}
 sv();draw();};
D.querySelector('#eo-code').addEventListener('keydown',function(e){if(e.key=='Enter'){e.preventDefault();D.querySelector('.eo-ap').click()}});
D.querySelectorAll('.eo-tg button').forEach(function(b){b.onclick=function(){S.mode=b.dataset.m;sv();form();draw()}});
function fld(id,l,t,ph,ac){var v=S.f[id]||'';return '<div><label class="eo-lbl" for="eo-'+id+'">'+l+'</label>'+(t=='ta'?'<textarea id="eo-'+id+'" rows="2" placeholder="'+ph+'">'+esc(v)+'</textarea>':'<input id="eo-'+id+'" type="'+t+'" placeholder="'+ph+'" autocomplete="'+ac+'" value="'+esc(v)+'" aria-describedby="eo-'+id+'-e">')+'<p class="eo-err" id="eo-'+id+'-e"></p></div>'}
function form(){var F=D.querySelector('.eo-f');F.innerHTML=fld('name','Name','text','Your name','name')+fld('phone','Phone','tel','10-digit mobile','tel')+(S.mode=='delivery'?fld('addr','Delivery address','text','House, street, area, Ludhiana','street-address'):fld('time','Pickup time','time','','off'))+fld('notes','Order notes (optional)','ta','Less sugar, oat milk, no onion\u2026','off');
 F.querySelectorAll('input,textarea').forEach(function(i){i.addEventListener('input',function(){S.f[i.id.slice(3)]=i.value;sv();if(i.getAttribute('aria-invalid')=='true')val(i)})})}
function val(i){var k=i.id.slice(3),v=i.value.trim(),e='';
 if(k=='name'&&v.length<2)e='Please enter your name.';
 if(k=='phone'&&!/^(\+?91[\s-]?)?[6-9]\d{9}$/.test(v.replace(/[\s-]/g,'')))e='Enter a valid 10-digit Indian mobile number.';
 if(k=='addr'&&v.length<8)e='Please enter the full delivery address.';
 if(k=='time'&&!v)e='Choose a pickup time.';
 i.setAttribute('aria-invalid',e?'true':'false');var p=D.querySelector('#'+i.id+'-e');if(p)p.textContent=e;return !e}
function draw(keepMsg){var c=calc(),L=D.querySelector('.eo-list'),h='';
 for(var n in S.items)h+='<div class="eo-row" data-n="'+esc(n)+'"><b>'+esc(n)+'</b><span class="eo-p">'+r(P[n]*S.items[n])+'</span><button type="button" class="eo-rm" data-a="x" aria-label="Remove '+esc(n)+'">Remove</button><span class="eo-st" role="group" aria-label="'+esc(n)+' quantity"><button type="button" data-a="-" aria-label="One less">\u2212</button><output>'+S.items[n]+'</output><button type="button" data-a="+" aria-label="One more">+</button></span></div>';
 if(c.free)h+='<div class="eo-row"><b>Butter croissant</b><span class="eo-p eo-free">Free</span><span class="eo-free">FREEBAKE applied</span></div>';
 L.innerHTML=h||'<p class="eo-empty">Your cart is empty. Add something from the menu.</p>';
 var m=D.querySelector('#eo-cm');if(!keepMsg){if(S.code=='WELCOME10'){m.className='eo-msg ok';m.textContent='WELCOME10 applied: 10% off.'}else if(S.code=='FREEBAKE'){m.className='eo-msg '+(c.free?'ok':'err');m.textContent=c.free?'FREEBAKE applied: a butter croissant on us.':c.note}else if(!m.classList.contains('err')){m.textContent=''}}
 D.querySelector('#eo-code').value=D.querySelector('#eo-code').value||S.code||'';
 D.querySelector('.eo-sum dl').innerHTML='<dt>Subtotal</dt><dd>'+r(c.sub)+'</dd>'+(c.disc?'<dt>Discount (WELCOME10)</dt><dd>\u2212'+r(c.disc)+'</dd>':'')+(c.free?'<dt>Free croissant (FREEBAKE)</dt><dd>'+r(0)+'</dd>':'')+'<dt class="eo-tot">Total</dt><dd class="eo-tot">'+r(c.tot)+'</dd>';
 D.querySelector('.eo-go').disabled=!c.c;
 D.querySelectorAll('.eo-tg button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.m==S.mode)});
 fab.hidden=!c.c;fab.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 8h14l-1.2 11.2A2 2 0 0 1 15.8 21H8.2a2 2 0 0 1-2-1.8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>View order <span class="eo-c">'+c.c+'</span><span class="eo-ft">'+r(c.tot)+'</span>';
 fab.setAttribute('aria-label','View order, '+c.c+' item'+(c.c>1?'s':'')+', total '+r(c.tot));
 for(var k in nodes)nodes[k].forEach(function(el){ctl(k,el)});}
D.querySelector('.eo-go').onclick=function(){var ok=true,first;D.querySelectorAll('.eo-f input').forEach(function(i){if(!val(i)){ok=false;first=first||i}});if(!ok){first.focus();return}
 var c=calc(),L=['DEMO ORDER \u2013 Ember & Oat sample site','','*Items*'];for(var n in S.items)L.push(S.items[n]+' x '+n+' \u2013 '+r(P[n]*S.items[n]));if(c.free)L.push('1 x Butter croissant \u2013 FREE');
 L.push('','Subtotal: '+r(c.sub));if(S.code)L.push('Code: '+S.code);if(c.disc)L.push('Discount: \u2212'+r(c.disc));L.push('*Total: '+r(c.tot)+'*','','Mode: '+(S.mode=='delivery'?'Delivery':'Pickup'),'Name: '+S.f.name,'Phone: '+S.f.phone);
 L.push(S.mode=='delivery'?'Address: '+S.f.addr:'Pickup time: '+S.f.time);if((S.f.notes||'').trim())L.push('Notes: '+S.f.notes.trim());
 var txt=L.join('\n');window.__eoLast=txt;window.open('https://wa.me/'+WA+'?text='+encodeURIComponent(txt),'_blank','noopener');};
form();draw();
})();
