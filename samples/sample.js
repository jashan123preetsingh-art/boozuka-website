(function(){
var d=document,rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
d.documentElement.classList.add('js');
var nav=d.querySelector('.sx-nav');
function onS(){ if(nav) nav.classList.toggle('scrolled',scrollY>24); }
addEventListener('scroll',onS,{passive:true}); onS();
var t=d.querySelector('.sx-burger'), m=d.getElementById('sx-menu');
if(t&&m){ t.addEventListener('click',function(){var o=t.getAttribute('aria-expanded')==='true'; t.setAttribute('aria-expanded',String(!o)); d.body.classList.toggle('menu-open',!o);});
  m.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){t.setAttribute('aria-expanded','false');d.body.classList.remove('menu-open');});});
  addEventListener('keydown',function(e){if(e.key==='Escape'&&d.body.classList.contains('menu-open')){t.click();t.focus();}}); }
var els=d.querySelectorAll('[data-rv]');
if(rm||!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});}
else{var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}})},{rootMargin:'0px 0px -8% 0px',threshold:.08});els.forEach(function(e){io.observe(e)});}
d.querySelectorAll('[role=tablist]').forEach(function(tl){
  var tabs=[].slice.call(tl.querySelectorAll('[role=tab]'));
  function sel(tab){tabs.forEach(function(x){var on=x===tab;x.setAttribute('aria-selected',on);x.tabIndex=on?0:-1;d.getElementById(x.getAttribute('aria-controls')).hidden=!on;});}
  tabs.forEach(function(tab,i){tab.addEventListener('click',function(){sel(tab)});tab.addEventListener('keydown',function(e){var k=e.key,n=null;if(k==='ArrowRight')n=tabs[(i+1)%tabs.length];if(k==='ArrowLeft')n=tabs[(i-1+tabs.length)%tabs.length];if(n){e.preventDefault();sel(n);n.focus();}});});
});
d.querySelectorAll('.sx-slots').forEach(function(g){g.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;g.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});var h=g.parentNode.querySelector('input[name=slot]');if(h)h.value=b.textContent;});});
d.querySelectorAll('form.sx-form').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();
  var bad=null;f.querySelectorAll('[required]').forEach(function(i){var ok=i.value.trim()!=='';i.setAttribute('aria-invalid',!ok);if(!ok&&!bad)bad=i;});
  var st=f.querySelector('.sx-formstatus'); if(bad){bad.focus(); if(st) st.textContent='Please fill the highlighted fields.'; return;}
  var parts=[];new FormData(f).forEach(function(v,k){if(v)parts.push(k+': '+v)});
  if(st) st.textContent='Sample form: opening WhatsApp to Boozuka…';
  window.open('https://wa.me/918289094569?text='+encodeURIComponent('Hi Boozuka, I tried the '+f.dataset.biz+' sample form and want one like it.\n'+parts.join('\n')+'\n['+f.dataset.tag+']'),'_blank','noopener');
});});
})();
