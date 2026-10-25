(()=>{const f=document.querySelector('.hx');if(!f)return;const ch=f.querySelector('.xp-ch'),st=f.querySelector('.xp-st');if(!ch)return;
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
const parts=[...ch.children].map(n=>n.cloneNode(true)),w=ms=>new Promise(r=>setTimeout(r,ms));
const add=i=>{const n=parts[i].cloneNode(true);n.classList.add('xpop');ch.append(n);return n};
const typing=async ms=>{st.textContent='typing…';const t=document.createElement('p');t.className='xm i ty xpop';t.innerHTML='<i></i><i></i><i></i>';ch.append(t);await w(ms);t.remove();st.textContent='Business account'};
async function loop(){for(;;){ch.innerHTML='';add(0);add(1);await w(700);
 const m1=add(2),k1=m1.querySelector('.tk');k1.classList.remove('r');await w(700);k1.classList.add('r');
 await typing(1100);add(3);await w(250);const q=add(4);await w(1600);
 const b=q.children[1];b.classList.add('tap');await w(450);
 const m2=add(5),k2=m2.querySelector('.tk');k2.classList.remove('r');await w(600);k2.classList.add('r');
 await typing(900);add(6);await w(1100);add(7);await w(5200);
 ch.style.transition='opacity .4s';ch.style.opacity=0;await w(400);ch.style.opacity=1}}
let go=0;const io=new IntersectionObserver(e=>{if(e[0].isIntersecting&&!go){go=1;loop()}},{threshold:.3});
addEventListener('load',()=>setTimeout(()=>io.observe(f),900));
})();
