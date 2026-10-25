(()=>{const f=document.querySelector('.hp25');if(!f)return;const ip=f.querySelector('.ip'),wb=f.querySelector('.wb'),st=f.querySelector('.wh-n span'),nt=f.querySelector('.hp-n');
const red=matchMedia('(prefers-reduced-motion: reduce)').matches;const FINAL=wb.innerHTML;
if(red){nt&&nt.classList.add('show');return}
const fine=matchMedia('(pointer:fine)').matches;
if(fine&&!f.classList.contains("hx")){f.addEventListener('mousemove',e=>{const r=f.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;ip.style.transform=`rotateY(${x*14}deg) rotateX(${-y*10}deg)`});f.addEventListener('mouseleave',()=>{ip.style.transform='rotateY(-7deg) rotateX(3deg)'});ip.style.transform='rotateY(-7deg) rotateX(3deg)'}
const w=ms=>new Promise(r=>setTimeout(r,ms));
const tmp=document.createElement('div');tmp.innerHTML=FINAL;const parts=[...tmp.children];
const el=(i)=>parts[i].cloneNode(true);
let on=true;
async function loop(){for(;;){
 nt&&nt.classList.remove('show');wb.innerHTML='';wb.append(el(0),el(1));st.textContent='online';await w(900);
 const m1=el(2);m1.classList.add('pop');m1.querySelectorAll('.tk').forEach(t=>t.classList.remove('r'));wb.append(m1);await w(900);m1.querySelector('.tk').classList.add('r');
 st.textContent='typing…';const ty=document.createElement('div');ty.className='wm i ty pop';ty.innerHTML='<i></i><i></i><i></i>';wb.append(ty);await w(1500);ty.remove();st.textContent='online';
 const m2=el(3);m2.classList.add('pop');wb.append(m2);await w(1700);
 const b=m2.querySelectorAll('.qb span')[1];b.classList.add('tap');await w(550);
 const m3=el(4);m3.classList.add('pop');m3.querySelector('.tk').classList.remove('r');wb.append(m3);await w(800);m3.querySelector('.tk').classList.add('r');
 st.textContent='typing…';const t2=ty.cloneNode(true);wb.append(t2);await w(1300);t2.remove();st.textContent='online';
 const m4=el(5);m4.classList.add('pop');wb.append(m4);await w(700);nt&&nt.classList.add('show');await w(4200);
}}
const io=new IntersectionObserver(e=>{if(e[0].isIntersecting&&on){on=false;loop()}},{threshold:.3});io.observe(f);
})();
