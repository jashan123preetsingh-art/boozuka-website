(()=>{const r=document.getElementById('wf37');if(!r)return;const $=s=>r.querySelector(s);
const DR='Hi Riya! Yes, our IELTS evening batch runs 6–8 pm. Fees are shared on the call, and I can book your free demo class for Thursday 5 pm. Shall I confirm?';
const red=matchMedia('(prefers-reduced-motion: reduce)').matches;let tk=0;const w=ms=>new Promise(x=>setTimeout(x,ms));
const cards=[...r.querySelectorAll('.wf37-c')];
function act(n){cards.forEach((c,i)=>{c.classList.toggle('act',i===n);c.classList.toggle('dn',i<n||n>2)})}
function done(){act(3);$('#w37dr').textContent=DR;const b=$('#w37b');b.className='wf37-btn ok';b.textContent='Sent ✓';$('#w37fu').classList.add('on')}
async function run(){const id=++tk;if(red){done();return}
const b=$('#w37b'),fu=$('#w37fu'),bub=$('#w37bub'),row=$('#w37row'),dr=$('#w37dr');
act(0);bub.classList.remove('pop');void bub.offsetWidth;bub.classList.add('pop');await w(1800);if(id!==tk)return;
act(1);row.classList.remove('in','hl');void row.offsetWidth;row.classList.add('in','hl');await w(1400);row.classList.remove('hl');await w(600);if(id!==tk)return;
act(2);b.className='wf37-btn';b.textContent='Approve & send';fu.classList.remove('on');const c=document.createElement('span');c.className='wf37-cr';
for(let i=0;i<=DR.length;i++){if(id!==tk)return;dr.textContent=DR.slice(0,i);dr.append(c);await w(22)}c.remove();await w(900);if(id!==tk)return;
b.classList.add('pr');await w(180);b.classList.remove('pr');b.classList.add('ok');b.textContent='Sent ✓';act(3);await w(500);fu.classList.add('on');
await w(5200);if(id===tk)run()}
$('#w37rp').addEventListener('click',run);
done();let st=0;new IntersectionObserver(e=>{if(e[0].isIntersecting&&!st){st=1;run()}},{threshold:.35}).observe(r)})();
