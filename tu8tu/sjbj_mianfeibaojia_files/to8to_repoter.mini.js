(function(){var k={addParamObjToUrl:function(a,b){var c=[],d;for(d in b)c.push(d+"="+encodeURIComponent(b[d]));a=0<=a.indexOf("?")?a+"&":a+"?";return a+=c.join("&")}},l=function(){var a=new Image;return function(b){a.onload=a.onerror=a.onabort=function(){a=a.onload=a.onerror=a.onabort=null};a.src=b}},g={speed:function(a,b){b.url=a;b.dt=Math.ceil((new Date).getTime()/1E3);var c="http://www.meijialz.com/api/front_report.php?action=speed";if("undefined"!==typeof jQuery)jQuery.post(c,b);else{var d=l(),c=
    k.addParamObjToUrl(c,b);d(c)}},captureSpeed:function(){var a={};if("performance"in window&&"getEntriesByType"in window.performance&&window.performance.getEntriesByType("resource")instanceof Array){var b=window.performance.getEntriesByType("resource"),c=[],d=[],f="",h;for(h in b)if(f=b[h].name.match(/(http|https):\/\/([^/]*)/),f=null!=f?f[2]:"",f.length){var e;if(e=f.match(/to8to\.com/)){a:{e=c;var g=void 0;for(g in e)if(f==e[g]){e=!0;break a}e=!1}e=!e}if(e){c.push(f);d[h]=[];for(var k in b[h])d[h].push(b[h][k])}}a.tim=
    [];for(var l in window.performance.timing)a.tim.push(window.performance.timing[l]);a.samp=[];for(var m in d)a.samp.push(d[m])}window.htmlLoadTime&&(a.hl=new Date-htmlLoadTime,window.fstScreenLoadTime&&(a.fs=fstScreenLoadTime-htmlLoadTime));return a}};try{if("performance"in window&&"getEntriesByType"in window.performance&&window.performance.getEntriesByType("resource")instanceof Array)if("undefined"!==typeof jQuery)jQuery(function(){var a=g.captureSpeed();g.speed(window.location.href,a)});else{var m=
    g.captureSpeed();g.speed(window.location.href,m)}}catch(n){}})();