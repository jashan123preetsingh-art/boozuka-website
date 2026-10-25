(()=>{if(/\/samples\//.test(location.pathname)||document.querySelector('.mbar'))return;
const i=(d)=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+d+'</svg>';
const b=document.createElement('nav');b.className='mbar';b.setAttribute('aria-label','Quick contact');
const pg=(location.pathname.replace(/^\/|\.html$/g,'')||'home');
b.innerHTML='<a class="mb-call" href="tel:+918289094569">'+i('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>')+'Call</a>'+
'<a class="mb-wa" href="https://wa.me/918289094569?text='+encodeURIComponent('Hi Boozuka, I would like to talk about my business. ['+pg+']')+'" target="_blank" rel="noopener noreferrer">'+i('<path d="M3 21l1.7-4.9A8.5 8.5 0 1 1 8 19.4z"/>')+'WhatsApp</a>'+
'<a class="mb-book" data-book-call href="https://cal.com/boozuka/30min" target="_blank" rel="noopener noreferrer">'+i('<rect x="3" y="4.5" width="18" height="17" rx="3"/><path d="M8 2.5v4M16 2.5v4M3 10h18"/>')+'Book a call</a>';
document.body.appendChild(b);document.body.classList.add('has-mbar');
const f=document.querySelector('footer');let foot=false,typing=false;const up=()=>b.classList.toggle('hide',foot||typing);
if(f&&'IntersectionObserver'in window)new IntersectionObserver(e=>{foot=e[0].isIntersecting;up()},{rootMargin:'0px 0px -40px 0px'}).observe(f);
addEventListener('focusin',e=>{if(e.target.matches('input,textarea,select')){typing=true;up()}});addEventListener('focusout',()=>{typing=false;up()});})();
