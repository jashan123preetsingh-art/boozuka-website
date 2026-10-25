(function(){var d=document;
d.querySelectorAll('.pz-pillar').forEach(function(p){var r=p.querySelector('.pz-rows');if(!r)return;var n=r.children.length;p.classList.add('pz-c');var b=d.createElement('button');b.type='button';b.className='pz-tog';b.setAttribute('aria-expanded','false');b.innerHTML='<span>Show '+n+' services</span><span aria-hidden="true">+</span>';r.parentNode.insertBefore(b,r);b.addEventListener('click',function(){var o=p.classList.toggle('pz-c');b.setAttribute('aria-expanded',String(!o));b.firstChild.textContent=(o?'Show ':'Hide ')+n+' services';b.lastChild.textContent=o?'+':'–';});});
if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window))return;
var sel='.xb .xb-in>*,.xb-end .xb-in>*,.ar-body>h2,.ar-body>figure,.ar-body>.ar-sum,.ar-body>ul,.ar-body>ol,.ar-body>.ar-faq,.ar-cta,.contact-next article,.xg>figure';
var vh=innerHeight,els=[].slice.call(d.querySelectorAll(sel)).filter(function(e){return e.getBoundingClientRect().top>vh});
els.forEach(function(e){e.classList.add('pg-rv');e.style.setProperty('--d',Math.min([].indexOf.call(e.parentNode.children,e),4)*70+'ms')});
var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('pg-in');io.unobserve(x.target)}})},{rootMargin:'0px 0px -8% 0px'});
els.forEach(function(e){io.observe(e)});})();
