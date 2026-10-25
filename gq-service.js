(function(){var s=new URLSearchParams(location.search).get('service');if(!s)return;s=s.slice(0,80);
var row=document.querySelector('#gq-services .gq-chip-row');if(!row)return;
var l=s.toLowerCase(),map=[['Website',/website|landing|shopify|e-commerce|web app|saas|mobile app|crm|erp|api|hosting|email setup/],['Social media & Ads',/ads|social|influencer|funnel|email & whatsapp|email and whatsapp/],['SEO / Google ranking',/seo|google business|review|reputation/],['AI chatbot / automation',/ai|chatbot|whatsapp business|automation|agent/],['Video editing',/reel|video/]];
var box=null;for(var i=0;i<map.length;i++){if(map[i][1].test(l)){box=row.querySelector('input[value="'+map[i][0]+'"]');break;}}
if(!box){var lab=document.createElement('label');lab.className='gq-chip';box=document.createElement('input');box.type='checkbox';box.name='services';box.value=s;var sp=document.createElement('span');sp.textContent=s;lab.appendChild(box);lab.appendChild(sp);row.insertBefore(lab,row.firstChild);}
box.checked=true;box.dispatchEvent(new Event('change',{bubbles:true}));
var h=document.createElement('input');h.type='hidden';h.name='requested_service';h.value=s;row.closest('form').appendChild(h);})();
