/* Boozuka meeting booking — change the link ONLY here */
window.BOOZUKA_CAL_LINK = 'boozuka-3tmqaf/30min';
(function(){
  var LINK=window.BOOZUKA_CAL_LINK, NS='30min', URL='https://cal.com/'+LINK, CFG={layout:'month_view',theme:'light'};
  var UI={theme:'light',cssVarsPerTheme:{light:{'cal-brand':'#0B0F19'},dark:{'cal-brand':'#C9A96E'}},hideEventTypeDetails:false,layout:'month_view'};
  var btns=document.querySelectorAll('[data-book-call]');
  btns.forEach(function(a){a.href=URL;a.target='_blank';a.rel='noopener noreferrer';a.setAttribute('data-cal-link',LINK);a.setAttribute('data-cal-namespace',NS);a.setAttribute('data-cal-config',JSON.stringify(CFG));});
  var loaded=false;
  function load(){ if(loaded) return; loaded=true;
    (function (C, A, L) { var p = function (a, ar) { a.q.push(ar); }; var d = C.document; C.Cal = C.Cal || function () { var cal = C.Cal; var ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { var api = function () { p(api, arguments); }; var namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return; } p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
    Cal("init", NS, {origin:"https://cal.com"});
    Cal.ns[NS]("ui", UI);
    var sc=document.querySelector('script[src="https://app.cal.com/embed/embed.js"]'); if(sc) sc.addEventListener('load',function(){ready=true;});
  }
  var ready=false;
  window.boozukaCalLoad=load;
  // warm up on intent; open as overlay on click
  ['pointerenter','touchstart','focus'].forEach(function(ev){btns.forEach(function(a){a.addEventListener(ev,load,{once:true,passive:true});});});
  document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('[data-book-call]');if(!a)return;
    if(e.metaKey||e.ctrlKey||e.shiftKey) return;
    if(ready) return; /* official data-cal-link handler takes over */
    e.preventDefault(); load();
    // delegated data-cal-link handler only exists once embed.js has run; use modal API (queued safely)
    Cal.ns[NS]("modal",{calLink:LINK,config:CFG});
  },true);
  // inline embed (contact page), lazy when near viewport
  var box=document.getElementById('cal-inline');
  if(box){var go=function(){load();Cal.ns[NS]("inline",{elementOrSelector:'#cal-inline',config:CFG,calLink:LINK});box.classList.add('loaded');};
    if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){io.disconnect();go();}},{rootMargin:'300px'});io.observe(box);}else go();}
})();
