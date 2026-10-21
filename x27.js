(()=>{const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
const c=document.getElementById('x27net');if(c){const x=c.getContext('2d');let w,h,P=[],dpr=Math.min(2,devicePixelRatio||1),vis=true;
const size=()=>{w=c.clientWidth;h=c.clientHeight;c.width=w*dpr;c.height=h*dpr;x.setTransform(dpr,0,0,dpr,0,0);const n=Math.min(70,Math.round(w*h/16000));P=Array.from({length:n},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,g:Math.random()<.3}))};
const draw=()=>{x.clearRect(0,0,w,h);for(let i=0;i<P.length;i++){const a=P[i];if(!rm){a.x+=a.vx;a.y+=a.vy;if(a.x<0||a.x>w)a.vx*=-1;if(a.y<0||a.y>h)a.vy*=-1}
for(let j=i+1;j<P.length;j++){const b=P[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<140){x.strokeStyle=`rgba(${a.g?'212,176,106':'125,211,252'},${(1-d/140)*.22})`;x.lineWidth=1;x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.stroke()}}
x.fillStyle=a.g?'rgba(236,211,157,.9)':'rgba(125,211,252,.7)';x.beginPath();x.arc(a.x,a.y,a.g?1.8:1.3,0,7);x.fill()}if(!rm&&vis)requestAnimationFrame(draw)};
size();addEventListener('resize',size);new IntersectionObserver(e=>{const v=e[0].isIntersecting;if(v&&!vis){vis=true;draw()}else vis=v}).observe(c);draw()}
const T=['answering a WhatsApp enquiry at 2 am','calling back a lead in Punjabi','booking a demo class for Thursday','sending a renewal reminder','writing this week’s reel captions','summing up last week’s leads'];const el=document.getElementById('x27typed');
if(el&&!rm){let i=0,k=T[0].length,del=true;const tick=()=>{const s=T[i];if(del){k--;if(k<=0){del=false;i=(i+1)%T.length}}else{k++;if(k>=T[i].length){del=true;el.textContent=T[i];return setTimeout(tick,1800)}}el.textContent=T[i].slice(0,Math.max(0,k));setTimeout(tick,del?28:55)};setTimeout(tick,1800)}
const cards=[...document.querySelectorAll('.x27-card')],links=[...document.querySelectorAll('.x27-rail a')];
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');const id=e.target.id;links.forEach(l=>l.classList.toggle('on',l.getAttribute('href')==='#'+id))}}),{threshold:.35});cards.forEach(c=>io.observe(c));
cards.forEach(c=>c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')}))})();
