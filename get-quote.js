(function(){
  var f=document.getElementById('gq-form'); if(!f) return;
  var main=document.getElementById('gq-main'), doneEl=document.getElementById('gq-done'), btn=f.querySelector('.gq-cta'), st=document.getElementById('gq-status');
  var WA='https://wa.me/918289094569?text=', EP='https://formsubmit.co/ajax/boozuka@boozuka.com';
  var ph=document.getElementById('gq-whatsapp');
  ph.addEventListener('input',function(){var d=ph.value.replace(/\D/g,'');if(d.length>10)d=d.replace(/^(91|0)/,'');d=d.slice(0,10);ph.value=d.length>5?d.slice(0,5)+' '+d.slice(5):d;});
  function err(id,msg,wrap){var e=document.getElementById(id);if(e)e.textContent=msg||'';if(wrap)wrap.classList.toggle('gq-invalid',!!msg);}
  function checkName(){var el=document.getElementById('gq-name'),m=el.value.trim()?'':el.dataset.req;err('gq-name-err',m,el.closest('.gq-field'));el.setAttribute('aria-invalid',!!m);return !m;}
  function checkPhone(){var d=ph.value.replace(/\D/g,''),m='';if(!d)m=ph.dataset.req;else if(!/^[6-9]\d{9}$/.test(d))m='Almost! Enter a 10-digit mobile number, e.g. 98765 43210.';err('gq-whatsapp-err',m,ph.closest('.gq-field'));ph.setAttribute('aria-invalid',!!m);return !m;}
  function checkSvc(){var fs=document.getElementById('gq-services'),m=fs.querySelector('input:checked')?'':fs.dataset.req;err('gq-services-err',m,fs);return !m;}
  function checkEmail(){var el=document.getElementById('gq-email'),m=(el.value.trim()&&!el.checkValidity())?'That email looks incomplete. You can also leave it empty.':'';err('gq-email-err',m,el.closest('.gq-field'));if(m)f.querySelector('.gq-more').open=true;return !m;}
  var nm=document.getElementById('gq-name');
  nm.addEventListener('input',function(){if(nm.closest('.gq-invalid'))checkName();});
  ph.addEventListener('input',function(){if(ph.closest('.gq-invalid')&&/^[6-9]\d{9}$/.test(ph.value.replace(/\D/g,'')))checkPhone();});
  f.querySelectorAll('input[name=services]').forEach(function(c){c.addEventListener('change',function(){if(f.querySelector('#gq-services.gq-invalid'))checkSvc();});});
  function data(){var fd=new FormData(f),o={};fd.forEach(function(v,k){if(k.charAt(0)==='_')return;v=String(v).trim();if(!v)return;o[k]=o[k]?o[k]+', '+v:v;});return o;}
  var LABELS={name:'Name',whatsapp:'WhatsApp',services:'Services',business:'Business',city:'City',email:'Email'};
  function summary(o){var t='Hi Boozuka, I want a free growth plan.\n';Object.keys(LABELS).forEach(function(k){if(o[k])t+=LABELS[k]+': '+o[k]+'\n';});return t+'[get-quote]';}
  function finish(h,p){if(h)document.getElementById('gq-thanks-h').textContent=h;if(p)document.getElementById('gq-thanks-p').textContent=p;main.hidden=true;doneEl.hidden=false;var top=f.getBoundingClientRect().top+scrollY-90;if(scrollY>top)scrollTo(0,top);}
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var ok=[checkName(),checkPhone(),checkSvc(),checkEmail()];
    if(ok.indexOf(false)>-1){var bad=f.querySelector('.gq-invalid input, .gq-invalid');if(bad)(bad.querySelector?bad.querySelector('input')||bad:bad).focus();return;}
    if(f._honey&&f._honey.value) return;
    var o=data();o.whatsapp='+91 '+o.whatsapp;var waLink=WA+encodeURIComponent(summary(o));document.getElementById('gq-wa').href=waLink;
    btn.disabled=true;btn.innerHTML='Sending…';st.textContent='';
    var payload={_subject:'New Boozuka lead: '+(o.business||o.name)+' — '+o.services,_template:'table',_captcha:'false',_honey:''};
    Object.keys(LABELS).forEach(function(k){if(o[k])payload[LABELS[k]]=o[k];});payload['Page']=location.href;
    var done=false,timer=setTimeout(function(){if(!done){done=true;fail();}},15000);
    function fail(){finish('Almost done: send it on WhatsApp','We could not send the form just now. WhatsApp is opening with your details filled in. Just press send.');var w=window.open(waLink,'_blank','noopener');if(!w)location.href=waLink;}
    fetch(EP,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload)})
      .then(function(r){return r.json().then(function(j){return {ok:r.ok,j:j};});})
      .then(function(x){if(done)return;done=true;clearTimeout(timer);if(x.ok&&String(x.j.success)==='true'){finish();if(window.gtag)gtag('event','generate_lead');}else fail();})
      .catch(function(){if(done)return;done=true;clearTimeout(timer);fail();});
  });
})();
