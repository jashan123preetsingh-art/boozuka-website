const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.navigation nav');
function setMenu(open) {
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  menu.textContent = open ? 'Close −' : 'Menu +';
  nav.classList.toggle('open', open);
}
menu?.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') { setMenu(false); menu.focus(); }
});
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
document.querySelectorAll('a[data-service]').forEach(link => {
  if (link.getAttribute('href') === 'contact.html') {
    link.setAttribute('href', 'contact.html?service=' + encodeURIComponent(link.dataset.service));
  }
});
const examples = {
  leads: {
    source: 'New website enquiry',
    input: '“Hi, we run a coaching centre and need help following up with course enquiries.”',
    stages: [
      {title:'One inquiry. A clear handover.',copy:'See how an inquiry can become a structured lead and a reply for your team to review.',fields:[['Source','Website enquiry'],['Next step','Prepare a follow-up draft']],badge:'Ready to explore',status:'Sample workflow · ready'},
      {title:'The useful details, in one place.',copy:'The sample inquiry is organised into the fields your team needs. A real build would connect your approved sources and records.',fields:[['Business','Coaching centre'],['Need','Course enquiry follow-up'],['Review queue','Admissions team']],badge:'Sample record',status:'Example record organised'},
      {title:'A draft. Ready for a person.',copy:'“Thanks for reaching out. Which courses do you offer, and where do you currently track your enquiries? We can then discuss a suitable follow-up workflow.”',fields:[['Draft status','Needs human review'],['Messages sent','None — this is an example']],badge:'Review required',status:'Example complete · nothing sent'}
    ]
  },
  reporting: {
    source: 'Sample weekly activity',
    input: '“This week: 24 new enquiries, 18 contacted, 6 still awaiting follow-up. Prepare a team handover.”',
    stages: [
      {title:'From scattered numbers to a handover.',copy:'Explore how a recurring report can organise activity and flag the next action for your team.',fields:[['Source','Fixed sample activity'],['Next step','Organise a team report']],badge:'Ready to explore',status:'Sample workflow · ready'},
      {title:'The numbers, consistently structured.',copy:'In this example, the source counts are grouped into an agreed report format. Live builds need source validation and exception handling.',fields:[['New enquiries','24'],['Contacted','18'],['Awaiting follow-up','6']],badge:'Sample summary',status:'Example summary prepared'},
      {title:'The handover, ready for review.',copy:'“Weekly activity: 24 enquiries received. The team contacted 18. Review and assign the remaining 6 for follow-up.”',fields:[['Report status','Needs human review'],['Reports delivered','None — this is an example']],badge:'Review required',status:'Example complete · nothing sent'}
    ]
  }
};
const runDemo = document.querySelector('#run-demo');
if (runDemo) {
  let selected = 'leads', stage = 0;
  const labels = ['Explore workflow', 'See the handover', 'Replay example'];
  const setText = (id, text) => { document.getElementById(id).textContent = text; };
  function render() {
    const example = examples[selected], current = example.stages[stage];
    setText('sample-source', example.source); setText('sample-input', example.input);
    setText('output-title', current.title); setText('output-copy', current.copy);
    setText('output-badge', current.badge); setText('demo-status', current.status);
    const fields = document.getElementById('output-fields'); fields.replaceChildren();
    current.fields.forEach(([label,value]) => {
      const li=document.createElement('li'), span=document.createElement('span'), strong=document.createElement('strong');
      span.textContent=label; strong.textContent=value; li.append(span,strong); fields.append(li);
    });
    runDemo.replaceChildren(document.createTextNode(labels[stage] + ' '));
    const arrow=document.createElementNS('http://www.w3.org/2000/svg','svg'); arrow.setAttribute('viewBox','0 0 24 24'); arrow.setAttribute('class','glyph-icon'); arrow.setAttribute('aria-hidden','true'); const path=document.createElementNS('http://www.w3.org/2000/svg','path'); path.setAttribute('d','M6 18 18 6M6 6h12v12'); path.setAttribute('fill','none'); path.setAttribute('stroke','currentColor'); path.setAttribute('stroke-width','1.6'); arrow.append(path); runDemo.append(arrow);
    document.querySelectorAll('.console-flow span').forEach((el,i)=>el.classList.toggle('active',i===stage*2));
    document.querySelectorAll('[data-demo]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.demo===selected)));
  }
  runDemo.addEventListener('click', () => { stage=(stage+1)%3; render(); });
  document.querySelectorAll('[data-demo]').forEach(button=>button.addEventListener('click',()=>{selected=button.dataset.demo;stage=0;render();}));
  render();
}
const form = document.querySelector('#inquiry-form');
if (form) {
  const selected = new URLSearchParams(window.location.search).get('service');
  const radio = [...form.querySelectorAll('[name="service"]')].find(input=>input.value===selected);
  if (radio) radio.checked=true;
  function prepareBrief() {
    if (!form.reportValidity()) return null;
    const data=new FormData(form);
    const name=String(data.get('name')).trim(), project=String(data.get('project')).trim();
    const status=document.querySelector('#form-status');
    if(!name||!project){status.textContent='Please add your name and what you want more of.';return null;}
    return { name, text:`Hello Boozuka,\n\nName: ${name}\nBusiness: ${data.get('business')||''}\nCity: ${data.get('city')||''}\nWhatsApp: ${data.get('phone')||''}\nEmail: ${data.get('email')||''}\nInterested in: ${data.get('service')}\n\nWhat I want more of:\n${project}\n\n[contact-form]` };
  }
  const emailLink=document.querySelector('#email-fallback');
  form.addEventListener('submit', event => {
    event.preventDefault(); const brief=prepareBrief(); if(!brief) return;
    window.open('https://wa.me/918289094569?text='+encodeURIComponent(brief.text),'_blank','noopener,noreferrer');
    if(emailLink) emailLink.href='mailto:boozuka@boozuka.com?subject='+encodeURIComponent('Project inquiry from '+brief.name)+'&body='+encodeURIComponent(brief.text);
    document.querySelector('#form-status').textContent='Your brief opens in WhatsApp. Review it there and press Send. Prefer email? Use the email link below.';
  });
  form.addEventListener('input',()=>{ if(!emailLink) return; const d=new FormData(form); emailLink.href='mailto:boozuka@boozuka.com?subject='+encodeURIComponent('Project inquiry'+(d.get('name')?' from '+d.get('name'):''))+'&body='+encodeURIComponent(`Name: ${d.get('name')||''}\nBusiness: ${d.get('business')||''}\nCity: ${d.get('city')||''}\nWhatsApp: ${d.get('phone')||''}\nEmail: ${d.get('email')||''}\nInterested in: ${d.get('service')||''}\n\n${d.get('project')||''}`); });
}

// Motion is progressive enhancement: every section stays visible without JS.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const entranceTargets = []; // v3: one hero moment only, no per-section fades
const activeEntrances = new Set();
let entrances;
if ('IntersectionObserver' in window && !motionPreference.matches) {
  entrances = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      if (typeof entry.target.animate === 'function' && !motionPreference.matches) {
        const animation = entry.target.animate([
          {opacity:.35, transform:'translateY(16px)'},
          {opacity:1, transform:'translateY(0)'}
        ], {duration:560, easing:'cubic-bezier(.22,1,.36,1)'});
        activeEntrances.add(animation);
        animation.finished.then(()=>activeEntrances.delete(animation)).catch(()=>activeEntrances.delete(animation));
      }
      entrances.unobserve(entry.target);
    }
  }, {threshold:.1, rootMargin:'0px 0px -35px 0px'});
  entranceTargets.forEach(target=>entrances.observe(target));
}
motionPreference.addEventListener('change',()=>{
  if (motionPreference.matches) { entrances?.disconnect(); activeEntrances.forEach(animation=>animation.cancel()); activeEntrances.clear(); }
});
window.addEventListener('pagehide',()=>{entrances?.disconnect();activeEntrances.forEach(animation=>animation.cancel());});

// Magnetic primary CTAs (fine pointers only, respects reduced motion)
if (window.matchMedia('(pointer:fine)').matches && !motionPreference.matches) {
  document.querySelectorAll('.button.lime, .nav-contact').forEach(btn => {
    btn.classList.add('magnetic');
    btn.addEventListener('pointermove', e => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.18, y = (e.clientY - r.top - r.height / 2) * 0.3;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
  });
}

// v4: growth calculator (local.html). Estimate only; formula shown on the page.
(function(){
  const f=document.getElementById('growth-calc'); if(!f) return;
  const g=id=>document.getElementById(id);
  const num=(id,max)=>{const v=parseFloat(g(id).value);return isFinite(v)?Math.min(Math.max(v,0),max):0;};
  const inr=n=>Math.round(n).toLocaleString('en-IN');
  function calc(){
    const e=num('c-enq',100000), m=num('c-miss',100), c=num('c-conv',100), v=num('c-val',10000000);
    const cust=e*(m/100)*(c/100), rev=cust*v;
    g('r-cust').textContent=String(Math.floor(cust));
    g('r-rev').textContent=inr(rev);
    g('r-formula').textContent=`${inr(e)} × ${m}% × ${c}% = ${(Math.round(cust*10)/10).toLocaleString('en-IN')} customers × ₹${inr(v)}`;
  }
  f.addEventListener('input',calc); f.addEventListener('submit',e=>e.preventDefault()); calc();
})();

(()=>{document.querySelectorAll('.nav-dd').forEach(d=>{const b=d.querySelector('.nav-dd-tog');if(!b)return;
  b.addEventListener('click',e=>{e.preventDefault();const o=d.classList.toggle('open');b.setAttribute('aria-expanded',o)});
  d.addEventListener('mouseleave',()=>{if(matchMedia('(min-width:601px)').matches){d.classList.remove('open');b.setAttribute('aria-expanded','false')}});
  document.addEventListener('click',e=>{if(!d.contains(e.target)){d.classList.remove('open');b.setAttribute('aria-expanded','false')}});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){d.classList.remove('open');b.setAttribute('aria-expanded','false')}});});})();
