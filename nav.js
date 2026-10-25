(()=>{const h=document.querySelector('.navigation');if(!h)return;const f=()=>h.classList.toggle('scrolled',scrollY>8);f();addEventListener('scroll',f,{passive:true});
const p=location.pathname.replace(/index\.html$/,'').replace(/\.html$/,'');h.querySelectorAll('nav > a, nav .nav-dd-label').forEach(a=>{let u=new URL(a.getAttribute('href'),location.href).pathname.replace(/index\.html$/,'').replace(/\.html$/,'');if(u!=='/'&&(p===u||(u.endsWith('/')&&p.startsWith(u))))a.classList.add('is-active')});
if(/\/(ai-services|services)$/.test(p))h.querySelector('.nav-dd-label')?.classList.add('is-active');
const m=h.querySelector('.menu-toggle'),n=h.querySelector('nav');if(m&&n)new MutationObserver(()=>document.body.classList.toggle('nav-open',n.classList.contains('open'))).observe(n,{attributes:true,attributeFilter:['class']});})();

