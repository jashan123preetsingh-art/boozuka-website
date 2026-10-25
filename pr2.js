(function(){var d=document,t=[].slice.call(d.querySelectorAll('.p2-tab')),g=[].slice.call(d.querySelectorAll('.p2-grp'));if(!t.length)return;
d.documentElement.classList.add('p2-js');
function sel(i,f){t.forEach(function(b,j){var on=i===j;b.setAttribute('aria-selected',on);b.tabIndex=on?0:-1;g[j].hidden=!on});if(f)t[i].focus()}
t.forEach(function(b,i){b.addEventListener('click',function(){sel(i)});b.addEventListener('keydown',function(e){var k=e.key;if(k=='ArrowRight'||k=='ArrowLeft'){e.preventDefault();sel((i+(k=='ArrowRight'?1:t.length-1))%t.length,1)}})});
var h=location.hash.replace('#','');var m={build:0,design:1,automate:2,grow:3};sel(m[h]||0)})();
