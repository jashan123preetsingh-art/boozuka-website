(function(){var d=document;function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function img(i){return i&&i.src?'<img src="'+esc(i.src)+'" width="'+(+i.w||1280)+'" height="'+(+i.h||800)+'" alt="'+esc(i.alt)+'" loading="lazy" decoding="async">':''}
function quote(q){return q&&q.text&&q.name&&q.consent?'<blockquote class="wk-q"><p>“'+esc(q.text)+'”</p><cite>'+esc(q.name)+(q.role?', '+esc(q.role):'')+'</cite></blockquote>':''}
d.querySelectorAll('[data-cases]').forEach(function(el){fetch(el.dataset.cases).then(function(r){return r.json()}).then(function(cs){if(!cs||!cs.length){el.remove();return}
el.innerHTML=cs.map(function(c){return '<article class="wk-case" id="'+esc(c.slug)+'"><p class="eyebrow">'+esc(c.industry)+' · '+esc(c.city)+'</p><h2>'+esc(c.client)+'</h2>'+
'<div class="wk-g"><div><h3>Problem</h3><p>'+esc(c.problem)+'</p><h3>What we did</h3><ul>'+(c.did||[]).map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul></div>'+
'<div class="wk-ba"><figure>'+img(c.before)+'<figcaption>Before</figcaption></figure><figure>'+img(c.after)+'<figcaption>After</figcaption></figure></div></div>'+
((c.results||[]).length?'<h3>Results</h3><table class="wk-r"><tr><th>Measure</th><th>Before</th><th>After</th><th>Period · source</th></tr>'+c.results.map(function(r){return '<tr><td>'+esc(r.label)+'</td><td>'+esc(r.before)+'</td><td>'+esc(r.after)+'</td><td>'+esc(r.period)+' · '+esc(r.source)+'</td></tr>'}).join('')+'</table>':'')+quote(c.quote)+'</article>'}).join('')}).catch(function(){el.remove()})});
d.querySelectorAll('[data-testimonials]').forEach(function(el){fetch(el.dataset.testimonials).then(function(r){return r.json()}).then(function(ts){ts=(ts||[]).filter(function(t){return t.text&&t.name&&t.consent});if(!ts.length){el.remove();return}
el.innerHTML='<h2 class="wk-th">What clients say</h2><div class="wk-ts">'+ts.map(quote).join('')+'</div>'}).catch(function(){el.remove()})})})();
