/* Boozuka: send website enquiries to Boozuka Terminal CRM. Never blocks the existing WhatsApp/email flow. */
(function(){
  var EP='https://boozuka-terminal.jashan123preetsingh.workers.dev/intake';
  function src(){var p={};try{p=JSON.parse(sessionStorage.getItem('bz_cta')||'{}')}catch(e){}var q=new URLSearchParams(location.search);return {cta:q.get('cta')||p.cta||'direct',from:q.get('from')||p.from||document.referrer.replace(/^https?:\/\/(www\.)?boozuka\.com/,'')||''};}
  window.bzIntake=function(o){var s=src();var body={name:o.name||'',whatsapp:o.whatsapp||'',service:o.service||'',business:o.business||'',city:o.city||'',email:o.email||'',notes:o.notes||'',page:location.pathname+(s.from?' (from '+s.from+')':''),cta:(o.form||'form')+':'+s.cta,website_url:o.hp||''};
    return fetch(EP,{method:'POST',mode:'cors',keepalive:true,headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}).then(function(r){return r.ok}).catch(function(){return false});};
  var cf=document.getElementById('inquiry-form');
  if(cf)cf.addEventListener('submit',function(){var g=function(n){var e=cf.elements[n];return e?String(e.value||'').trim():''};var d=g('phone').replace(/\D/g,'');if(d.length>10)d=d.replace(/^(91|0)/,'');if(!/^[6-9]\d{9}$/.test(d)||!g('name'))return;var sv=cf.querySelector('input[name=service]:checked');window.bzIntake({form:'contact',name:g('name'),whatsapp:d,service:sv?sv.value:'Not sure',business:g('business'),city:g('city'),email:g('email'),notes:g('project')});},true);
})();
