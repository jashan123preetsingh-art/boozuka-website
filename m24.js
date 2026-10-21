(()=>{const r=document.getElementById('wf24');if(!r)return;
const $=s=>r.querySelector(s),$$=s=>[...r.querySelectorAll(s)];
const MSG='Hi, IELTS evening batch hai? Fees aur demo class ke baare mein batao.',DR='Hi Riya! Yes, our IELTS evening batch runs 6–8 pm. I can book your free demo class for Thursday 5 pm. Shall I confirm?';
const red=matchMedia('(prefers-reduced-motion: reduce)').matches;let tk=0;
const wait=ms=>new Promise(res=>setTimeout(res,ms));
async function type(el,t,sp,id){el.textContent='';const c=document.createElement('span');c.className='wf24-caret';for(let i=0;i<=t.length;i++){if(id!==tk)return;el.textContent=t.slice(0,i);el.append(c);await wait(sp)}c.remove()}
function step(n){$$('.wf24-rail li').forEach(l=>l.classList.toggle('on',+l.dataset.s<=n));$$('.wf24-card').forEach(c=>{c.classList.toggle('show',+c.dataset.c<=Math.min(n,3));c.classList.toggle('act',+c.dataset.c===Math.min(n,3))})}
function reset(){step(0);$('#wf24-msg').textContent='';$('#wf24-draft').textContent='';$$('.wf24-cell').forEach(c=>c.classList.remove('in'));const b=$('#wf24-send');b.className='wf24-btn pri';b.textContent='Approve & send';$('#wf24-note').textContent='Nothing goes out without a person'}
function final(){step(4);$('#wf24-msg').textContent=MSG;$$('.wf24-cell').forEach(c=>c.classList.add('in'));$('#wf24-draft').textContent=DR;const b=$('#wf24-send');b.classList.add('done');b.textContent='Sent ✓✓';$('#wf24-note').textContent='Approved by your team';$('#wf24-state').textContent='Sample run complete'}
async function run(){const id=++tk;reset();r.classList.add('run');$('#wf24-state').textContent='Running sample…';
if(red){final();return}
step(1);const m=$('#wf24-msg');m.innerHTML='<span class="wf24-typing"><i></i><i></i><i></i></span>';await wait(1300);if(id!==tk)return;
await type(m,MSG,22,id);await wait(500);if(id!==tk)return;
step(2);for(const c of $$('.wf24-cell')){await wait(380);if(id!==tk)return;c.classList.add('in')}await wait(600);if(id!==tk)return;
step(3);await type($('#wf24-draft'),DR,18,id);await wait(700);if(id!==tk)return;
const b=$('#wf24-send');b.classList.add('press');await wait(180);b.classList.remove('press');step(4);final();r.classList.remove('run')}
$('#wf24-run').addEventListener('click',run);
final();r.classList.remove('run');
const io=new IntersectionObserver(e=>{if(e[0].isIntersecting){io.disconnect();run()}},{threshold:.35});io.observe(r)})();
