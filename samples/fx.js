(function(){
var d=document,h=d.documentElement,W=window,rm=matchMedia('(prefers-reduced-motion: reduce)').matches,fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
function ready(){h.classList.add('fx-ready')}
if(d.readyState==='complete')setTimeout(ready,60);else W.addEventListener('load',function(){setTimeout(ready,60)});setTimeout(ready,2200);
/* split words */
d.querySelectorAll('[data-split]').forEach(function(el){var i=0;
  (function walk(n){[].slice.call(n.childNodes).forEach(function(c){
    if(c.nodeType===3){var parts=c.textContent.split(/(\s+)/),f=d.createDocumentFragment();
      parts.forEach(function(p){if(!p)return;if(/^\s+$/.test(p)){f.appendChild(d.createTextNode(p));return;}
        var o=d.createElement('span');o.className='fx-w';var w=d.createElement('span');w.textContent=p;w.style.setProperty('--i',i++);o.appendChild(w);f.appendChild(o);});
      n.replaceChild(f,c);}
    else if(c.nodeType===1&&c.tagName!=='BR')walk(c);});})(el);
  el.classList.add('fx-split');});
/* auto stagger */
d.querySelectorAll('[data-stagger]').forEach(function(g){[].slice.call(g.children).forEach(function(c,i){c.style.transitionDelay=(i*90)+'ms';});});
/* counters (non-claim figures only) */
var cs=d.querySelectorAll('[data-count]');
if(!rm&&'IntersectionObserver' in W){var co=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;co.unobserve(e.target);var el=e.target,n=+el.dataset.count,t0=performance.now();
  (function tick(t){var p=Math.min(1,(t-t0)/1400);el.textContent=Math.round(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(tick);})(t0);});},{threshold:.6});
  cs.forEach(function(c){c.textContent='0';co.observe(c)});}
/* parallax */
var px=[].slice.call(d.querySelectorAll('[data-px]'));
if(!rm&&px.length){var tk=false;function upd(){var vh=innerHeight;px.forEach(function(el){var r=el.parentNode.getBoundingClientRect();if(r.bottom<0||r.top>vh)return;var o=(r.top+r.height/2-vh/2)*(+el.dataset.px||.1);el.style.transform='translate3d(0,'+(-o).toFixed(1)+'px,0) scale(1.18)';});tk=false;}
  addEventListener('scroll',function(){if(!tk){tk=true;requestAnimationFrame(upd)}},{passive:true});addEventListener('resize',upd);upd();}
/* timeline progress */
d.querySelectorAll('[data-tl]').forEach(function(tl){var bar=tl.querySelector('.fx-tl-fill');if(!bar)return;if(rm){bar.style.transform='scaleY(1)';return;}
  function u(){var r=tl.getBoundingClientRect(),p=(innerHeight*.6-r.top)/r.height;bar.style.transform='scaleY('+Math.max(0,Math.min(1,p)).toFixed(3)+')';
    tl.querySelectorAll('li').forEach(function(li){li.classList.toggle('on',li.getBoundingClientRect().top<innerHeight*.6)});}
  addEventListener('scroll',function(){requestAnimationFrame(u)},{passive:true});u();});
/* magnetic + tilt (pointer devices) */
if(fine&&!rm){
  d.querySelectorAll('[data-mag]').forEach(function(b){b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.22).toFixed(1)+'px,'+((e.clientY-r.top-r.height/2)*.32).toFixed(1)+'px)';});b.addEventListener('pointerleave',function(){b.style.transform=''});});
  d.querySelectorAll('[data-tilt]').forEach(function(c){c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform='perspective(900px) rotateX('+(-y*7).toFixed(2)+'deg) rotateY('+(x*7).toFixed(2)+'deg) translateY(-4px)';});c.addEventListener('pointerleave',function(){c.style.transform=''});});}
/* horizontal galleries + carousels */
d.querySelectorAll('.fx-hs').forEach(function(w){var t=w.querySelector('.fx-hs-track'),bar=w.querySelector('.fx-hs-bar i'),p=w.querySelector('[data-dir="-1"]'),n=w.querySelector('[data-dir="1"]');if(!t)return;
  function st(){var m=t.scrollWidth-t.clientWidth,f=m>0?t.scrollLeft/m:1;if(bar)bar.style.transform='scaleX('+Math.max(.08,f).toFixed(3)+')';if(p)p.disabled=t.scrollLeft<4;if(n)n.disabled=t.scrollLeft>m-4;}
  [p,n].forEach(function(b){if(b)b.addEventListener('click',function(){t.scrollBy({left:+b.dataset.dir*t.clientWidth*.8,behavior:rm?'auto':'smooth'})})});
  t.addEventListener('scroll',function(){requestAnimationFrame(st)},{passive:true});addEventListener('resize',st);st();});
/* before / after */
d.querySelectorAll('.fx-ba').forEach(function(b){var r=b.querySelector('input');function s(){b.style.setProperty('--x',r.value+'%')}r.addEventListener('input',s);s();});
/* animated tab indicator */
d.querySelectorAll('[data-ind]').forEach(function(tl){var ind=tl.querySelector('.fx-ind');function u(){var s=tl.querySelector('[aria-selected=true]');if(!s)return;ind.style.width='100px';ind.style.transform='translateX('+s.offsetLeft+'px) scaleX('+(s.offsetWidth/100)+')';ind.style.height=s.offsetHeight+'px';ind.style.top=s.offsetTop+'px';}
  new MutationObserver(u).observe(tl,{attributes:true,subtree:true,attributeFilter:['aria-selected']});addEventListener('resize',u);u();setTimeout(function(){tl.classList.add('fx-ind-on')},50);});
/* back to top */
var top=d.querySelector('.fx-top');if(top){addEventListener('scroll',function(){top.classList.toggle('on',scrollY>900)},{passive:true});top.addEventListener('click',function(){scrollTo({top:0,behavior:rm?'auto':'smooth'});var f=d.querySelector('.sx-nav a');if(f)f.focus({preventScroll:true});});}

/* sticky story */
d.querySelectorAll('[data-story]').forEach(function(st){var steps=[].slice.call(st.querySelectorAll('[data-step]')),shots=st.querySelectorAll('[data-shot]'),num=st.querySelector('[data-story-n]'),bar=st.querySelector('.st-bar i');
  function set(i){shots.forEach(function(m,j){m.classList.toggle('on',j===i)});steps.forEach(function(x,j){x.classList.toggle('on',j===i)});if(num)num.textContent=('0'+(i+1)).slice(-2);if(bar)bar.style.transform='scaleX('+((i+1)/steps.length)+')';}
  set(0);if(!('IntersectionObserver' in W))return;
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)set(steps.indexOf(e.target))})},{rootMargin:'-45% 0px -45% 0px'});steps.forEach(function(x){io.observe(x)});});
})();
