(function(){
  var f=document.getElementById('gq-form'); if(!f) return;
  var steps=[].slice.call(f.querySelectorAll('.gq-step')), cur=0;
  var bar=document.getElementById('gq-bar-fill'), lbl=document.getElementById('gq-step-label'), prog=document.getElementById('gq-progress');
  var WA='https://wa.me/918289094569?text=';
  function show(i){
    steps.forEach(function(s,k){s.hidden=k!==i;});
    cur=i; var n=steps.length-1; // last is thank-you
    var pct=i>=n?100:Math.round((i+1)/n*100);
    bar.style.width=pct+'%'; prog.setAttribute('aria-valuenow',pct);
    lbl.textContent=i>=n?'Done':'Step '+(i+1)+' of '+n;
    var h=steps[i].querySelector('h2'); if(h){h.setAttribute('tabindex','-1'); h.focus({preventScroll:true});}
    var top=f.getBoundingClientRect().top+window.scrollY-90; if(window.scrollY>top) window.scrollTo(0,top);
  }
  function err(el,msg){
    var id=el.getAttribute('data-err')||(el.id+'-err'), e=document.getElementById(id);
    if(e){e.textContent=msg||'';}
    var wrap=el.closest('.gq-field')||el; wrap.classList.toggle('gq-invalid',!!msg);
    if(el.setAttribute&&el.tagName!=='FIELDSET') el.setAttribute('aria-invalid',msg?'true':'false');
  }
  function validate(step){
    var ok=true, first=null;
    step.querySelectorAll('input[required],select[required],textarea[required]').forEach(function(el){
      if(el.type==='checkbox'&&el.closest('fieldset.gq-chips')) return;
      var v=(el.type==='checkbox')?el.checked:el.value.trim(), m='';
      if(!v) m=el.getAttribute('data-req')||'This field is required.';
      else if(el.name==='whatsapp'){var d=el.value.replace(/\D/g,'').replace(/^(91|0)(?=\d{10}$)/,''); if(!/^[6-9]\d{9}$/.test(d)) m='Enter a valid 10-digit Indian mobile number, e.g. 98765 43210.';}
      else if(el.type==='email'&&!el.checkValidity()) m='Enter a valid email address.';
      err(el,m); if(m){ok=false; first=first||el;}
    });
    step.querySelectorAll('input[type=email]:not([required]),input[type=url]').forEach(function(el){
      var m=(el.value.trim()&&!el.checkValidity())?(el.type==='email'?'Enter a valid email address.':'Enter a full link starting with https://'):''; err(el,m); if(m){ok=false;first=first||el;}
    });
    step.querySelectorAll('fieldset.gq-chips[data-required]').forEach(function(fs){
      var any=fs.querySelector('input:checked'), m=any?'':fs.getAttribute('data-req');
      var e=document.getElementById(fs.id+'-err'); e.textContent=m; fs.classList.toggle('gq-invalid',!!m);
      if(m){ok=false; first=first||fs.querySelector('input');}
    });
    if(first) first.focus();
    return ok;
  }
  f.addEventListener('click',function(e){
    var b=e.target.closest('[data-next],[data-back]'); if(!b) return;
    e.preventDefault();
    if(b.hasAttribute('data-back')) return show(cur-1);
    if(validate(steps[cur])) show(cur+1);
  });
  function data(){
    var fd=new FormData(f), o={};
    fd.forEach(function(v,k){ if(k.charAt(0)==='_') return; v=String(v).trim(); if(!v) return; o[k]=o[k]?o[k]+', '+v:v; });
    return o;
  }
  var LABELS={name:'Name',business:'Business',whatsapp:'WhatsApp',email:'Email',city:'City',business_type:'Business type',services:'Services',goal:'Main goal',has_website:'Has website',website_url:'Website',has_maps:'Google Maps profile',instagram:'Instagram',budget:'Monthly budget',call_time:'Preferred call time',notes:'Notes'};
  function summary(o){
    var t='Hi Boozuka, I want a custom growth plan.\n';
    Object.keys(LABELS).forEach(function(k){ if(o[k]) t+=LABELS[k]+': '+o[k]+'\n'; });
    return t+'[get-quote]';
  }
  f.addEventListener('submit',function(e){
    e.preventDefault();
    if(!validate(steps[cur])) return;
    if(f._honey&&f._honey.value) return; // bot
    var o=data(), btn=f.querySelector('[type=submit]'), st=document.getElementById('gq-status');
    var waLink=WA+encodeURIComponent(summary(o));
    document.getElementById('gq-wa').href=waLink;
    btn.disabled=true; btn.textContent='Sending…'; st.textContent='Sending your details…';
    var payload={_subject:'New Boozuka lead: '+(o.business||o.name),_template:'table',_captcha:'false',_honey:''};
    Object.keys(LABELS).forEach(function(k){ if(o[k]) payload[LABELS[k]]=o[k]; });
    payload['Consent']='Yes'; payload['Page']=location.href;
    var done=false, timer=setTimeout(function(){ if(!done){done=true; fail();} },15000);
    function fail(){
      st.textContent='';
      document.getElementById('gq-thanks-h').textContent='Almost done: send it on WhatsApp';
      document.getElementById('gq-thanks-p').textContent='We could not send the form just now. WhatsApp is opening with your details filled in. Just press send.';
      show(steps.length-1);
      var w=window.open(waLink,'_blank','noopener'); if(!w) location.href=waLink;
    }
    fetch('https://formsubmit.co/ajax/boozukaa@gmail.com',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload)})
      .then(function(r){return r.json().then(function(j){return {ok:r.ok,j:j};});})
      .then(function(x){ if(done) return; done=true; clearTimeout(timer);
        if(x.ok&&String(x.j.success)==='true'){ st.textContent=''; show(steps.length-1); if(window.gtag) gtag('event','generate_lead'); }
        else fail(); })
      .catch(function(){ if(done) return; done=true; clearTimeout(timer); fail(); });
  });
  var wsel=f.querySelector('#gq-has-website'), wurl=document.getElementById('gq-url-wrap');
  if(wsel) wsel.addEventListener('change',function(){ wurl.hidden=wsel.value!=='Yes'; });
  show(0);
})();
