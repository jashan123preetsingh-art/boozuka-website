(function(){var d=document,m=matchMedia('(prefers-reduced-motion: reduce)');if(m.matches||!('IntersectionObserver' in window))return;
var els=[].slice.call(d.querySelectorAll('.sl-sec .sl-in>*,.sl-get li,.sl-faq details,.sl-rel a,.sl-end .sl-in>*,.sl-proof .sl-pf'));
var vh=innerHeight;els=els.filter(function(e){return e.getBoundingClientRect().top>vh});
els.forEach(function(e,i){e.classList.add('sv-rv');var p=e.parentNode,k=[].indexOf.call(p.children,e);e.style.setProperty('--d',Math.min(k,5)*70+'ms')});
var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('sv-in');io.unobserve(x.target)}})},{rootMargin:'0px 0px -8% 0px'});
els.forEach(function(e){io.observe(e)});})();
