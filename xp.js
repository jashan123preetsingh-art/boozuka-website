(()=>{const f=document.querySelector('.hx');if(!f)return;const ch=f.querySelector('.xp-ch'),st=f.querySelector('.xp-st');if(!ch)return;
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
const R=f.closest('section.hero')||document.documentElement,run=()=>R.classList.contains('hx-run');
const parts=[...ch.children].map(n=>n.cloneNode(true));
const w=async ms=>{while(!run())await new Promise(r=>setTimeout(r,400));await new Promise(r=>setTimeout(r,ms))};
const add=i=>{const n=parts[i].cloneNode(true);n.classList.add('xpop');ch.append(n);return n};
const typing=async ms=>{st.textContent='typing…';const t=document.createElement('p');t.className='xm i ty xpop';t.innerHTML='<i></i><i></i><i></i>';ch.append(t);await w(ms);t.remove();st.textContent='Business account'};
async function loop(){await w(600);for(;;){ch.innerHTML='';add(0);add(1);await w(700);
 const m1=add(2),k1=m1.querySelector('.tk');k1.classList.remove('r');await w(700);k1.classList.add('r');
 await typing(1100);add(3);await w(250);const q=add(4);await w(1600);
 q.children[1].classList.add('tap');await w(450);
 const m2=add(5),k2=m2.querySelector('.tk');k2.classList.remove('r');await w(600);k2.classList.add('r');
 await typing(900);add(6);await w(1100);add(7);await w(5200);
 ch.style.transition='opacity .4s';ch.style.opacity=0;await w(400);ch.style.opacity=1}}
loop();
})();
