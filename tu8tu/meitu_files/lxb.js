window.lxb=window.lxb||{};lxb.instance=lxb.instance||0;lxb.instance++;(function(){var a={};lxb.add=lxb.add||function(b,d){var c=a[b];if(!c){c=a[b]={};d.call(null,c)}};lxb.use=lxb.use||function(b){if(typeof b=="string"){if(!a[b]){throw"no module: "+b}else{return a[b]}}else{b.call(null,a)}}})();lxb.add("base",function(w){w.g=function(e){return document.getElementById(e)};var g={className:"class",maxLength:"maxlength"};w.create=function(y,x){var A=document.createElement(y);var e;if(x){for(var z in x){if(x.hasOwnProperty(z)){e=g[z]||z;A.setAttribute(e,x[z])}}}return A};w.jsonToQuery=function(e){var y=[];for(var x in e){if(e.hasOwnProperty(x)){y.push(x+"="+encodeURIComponent(e[x]))}}return y.join("&")};w.extend=function(y,x){for(var e in x){if(x.hasOwnProperty(e)){y[e]=x[e]}}return y};w.encodeHTML=function(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")};var h=new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)","g");w.trim=function(e){return e.replace(h,"")};w.queryToJSON=function(z){var x={};z=z.split("&");for(var e=0,y;y=z[e];e++){y=y.split("=");if(y[0]){x[y[0]]=y[1]}}return x};var o=w.setCookie=function(y,z,A,e){var B=y+"="+z;if(A){B+="; path="+A}if(e){var x=new Date();x.setTime(x.getTime()+e*24*3600*1000);B+="; expires="+x.toGMTString()}document.cookie=B};var s=w.getCookie=function(x){var y=new RegExp("(^| )"+x+"=([^;]*)(;|\x24)");var e=y.exec(document.cookie);if(e){return e[2]||null}else{return null}};var j=[];var a;var q=false;function l(){if(!q){q=true;for(var x=0,e=j.length;x<e;x++){j[x]()}}}function f(){try{document.documentElement.doScroll("left")}catch(x){setTimeout(f,1);return}l()}if(document.addEventListener){a=function(){document.removeEventListener("DOMContentLoaded",a,false);l()}}else{if(document.attachEvent){a=function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",a);l()}}}}if(document.readyState==="complete"){q=true}else{if(document.addEventListener){document.addEventListener("DOMContentLoaded",a,false);window.addEventListener("load",l,false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",a);window.attachEvent("onload",l);var m=false;try{m=window.frameElement==null}catch(t){}if(document.documentElement.doScroll&&m){f()}}}}w.ready=function(e){q?e():j.push(e)};var r=[];function k(){for(var e=0,x;x=r[e];e++){u(x)}}function u(x){var e=document.compatMode=="CSS1Compat"?document.documentElement:document.body;var y=x.ele;var A;var z;if(x.top===A){z=y.style.top||y.currentStyle.top;if(!z||z=="auto"){z=y.style.bottom||y.currentStyle.bottom;if(z&&z.indexOf("%")>=0){z=e.clientHeight*(100-parseInt(z,10))/100-y.offsetHeight}else{if(z=="auto"){z=A}else{if(z){z=e.clientHeight-y.offsetHeight-parseInt(z,10)}}}}if(z){if(typeof z=="string"&&z.indexOf("%")>=0){z=e.clientHeight*parseInt(z,10)/100}else{z=parseInt(z,10)}x.top=z}else{x.top=A}}if(x.top!==A){y.style.top=e.scrollTop+x.top+"px"}}w.addClass=function(x,e){var z=x.className;if(!x){return}var y=new RegExp(e);if(!y.test(x.className)){z=x.className+" "+e}x.className=z.replace(/\s+/," ").replace(/^\s|\s$/,"")};w.removeClass=function(x,e){var z=x.className;if(!x){return}var y=new RegExp(e);if(y.test(x.className)){z=x.className.replace(y,"")}x.className=z.replace(/\s+/," ").replace(/^\s|\s$/,"")};w.q=function(A,z){var x=[],e,y,C,B;if(!(A=A.replace(/\s+/,""))){return x}if("undefined"==typeof z){z=document}else{z=document.getElementById(z);if(!z){return x}}if(z.getElementsByClassName){C=z.getElementsByClassName(A);e=C.length;for(y=0;y<e;y++){B=C[y];x[x.length]=B}}else{A=new RegExp("(^|\\s)"+A+"(\\s|\x24)");C=z.all||z.getElementsByTagName("*");e=C.length;for(y=0;y<e;y++){B=C[y];A.test(B.className)&&(x[x.length]=B)}}return x};var p=null;var d=null;w.visitorLog=function(C,e){var y=512;var z=lxb.use("config");if(!z.lxbvt){return}var x="http://lxbjs.baidu.com/vt/lxb.gif";var D=(document.title||"").substr(0,y);var F=(document.referrer||"").substr(0,y);var G=(document.URL||"").substr(0,y);var H=z.bdcbid;var B=[];B.push(encodeURIComponent(C||""));B.push(encodeURIComponent(D||""));B.push(encodeURIComponent(F||""));B.push(encodeURIComponent(G||""));B.push(+b());var E=c(B.join(","));var A=function(){if(!p){p=document.createElement("div");p.style.display="none"}p.innerHTML='<form action="'+x+'" method="post" target="lxbHideIframe"><input name="p" value="'+E+'"/><input name="sid" value="'+e+'"/><input name="bdcbid" value="'+H+'"/><input name="t" value="'+(new Date()).valueOf()+'"/></form><iframe id="lxbHideIframe" name="lxbHideIframe" src="about:blank"></iframe>';if(document.body){document.body.appendChild(p);d=p.getElementsByTagName("form")[0];d.submit()}};if(!document.body){window.onload=A}else{A()}};var v=w.getDomain=function(e){e=e.replace(/^https?:\/\//,"").split("/");return e[0].replace(/:.*$/,"")};var i=function(x){x=x.replace(/\r\n/g,"\n");var e="";for(var z=0;z<x.length;z++){var y=x.charCodeAt(z);if(y<128){e+=String.fromCharCode(y)}else{if((y>127)&&(y<2048)){e+=String.fromCharCode((y>>6)|192);e+=String.fromCharCode((y&63)|128)}else{e+=String.fromCharCode((y>>12)|224);e+=String.fromCharCode(((y>>6)&63)|128);e+=String.fromCharCode((y&63)|128)}}}return e};_keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var c=w.base64=function(y){var e="";var F,D,B,E,C,A,z;var x=0;y=i(y);while(x<y.length){F=y.charCodeAt(x++);D=y.charCodeAt(x++);B=y.charCodeAt(x++);E=F>>2;C=((F&3)<<4)|(D>>4);A=((D&15)<<2)|(B>>6);z=B&63;if(isNaN(D)){A=z=64}else{if(isNaN(B)){z=64}}e=e+_keyStr.charAt(E)+_keyStr.charAt(C)+_keyStr.charAt(A)+_keyStr.charAt(z)}return e};var n=-1;var b=w.isLoadPage=function(){if(n!==-1){return n}var e=v(window.location.href);var x=v(document.referrer);if(document.referrer){if(e===x){n=false;return n}else{n=true;return n}}else{if(s("isLoadPage")==="loaded"){n=false;return n}else{o("isLoadPage","loaded","/");n=true;return n}}};w.localStorage={};try{if(window.localStorage){w.localStorage.setItem=function(e,x){window.localStorage.setItem(e,x)};w.localStorage.getItem=function(e){return window.localStorage.getItem(e)}}else{w.localStorage.setItem=function(){};w.localStorage.getItem=function(){return null}}}catch(t){w.localStorage.setItem=function(){};w.localStorage.getItem=function(){return null}}w.checking=function(z,A,y){if(document.readyState==="complete"){y?clearInterval(A):clearTimeout(A);var x=lxb.use("base").g("LXB_CONTAINER");if(!!x){var e=((x.currentStyle?x.currentStyle:window.getComputedStyle(x,null)).display)==="block"?z+1:z+0}lxb.use("base").create("img",{src:lxb.use("config").Root+"/count.gif?t=m&s="+(e||0)})}};cssToggle=w.cssToggle=function(e,x){var y=/display:\s{0,2}[a-z\s{0,2}!]*;/i;deport=e.replace(y,x);return deport}});lxb.add("config",function(b){var f=lxb.use("base");var d=f.localStorage;var i={BDCBID:'893f5958-e0cf-4dbc-a688-56e30475cab1',LXBVT:0,TEMPSITEID:'380056',TEMPPORT:'lxbjs.baidu.com/',TEMPFILEROOT:'float'};var c={BDCBID:"bdcbid",LXBVT:1,TEMPSITEID:"siteid",TEMPPORT:"localhost:7710",TEMPFILEROOT:"/mobileFloat"};f.extend(c,i);var h=location.href.indexOf("https://")===0?"https://":"http://";b.SiteId=c.TEMPSITEID;b.Root=h+c.TEMPPORT+c.TEMPFILEROOT;b.lxbvt=c.LXBVT;b.bdcbid=c.BDCBID;var a=d.getItem("bdcbid");if(!a){try{d.setItem("bdcbid",c.BDCBID)}catch(g){}}else{b.bdcbid=a}b.Lang={TRAN:"\u8f6c",CB_INPUT_TIP_1:"\u624b\u673a\u8bf7\u76f4\u63a5\u8f93\u5165\uff0c",CB_INPUT_TIP_2:"\u5ea7\u673a\u524d\u52a0\u533a\u53f7\uff1a\u59820105992xxxx",CB_INPUT_TIP_3:"\u6211\u4eec\u5c06\u7acb\u5373\u56de\u7535\u3002\u8be5\u901a\u8bdd<b>\u5bf9\u60a8\u514d\u8d39</b>\uff0c\u8bf7\u653e\u5fc3\u63a5\u542c\uff01",CB_INPUT_TIP_HOLDER:"\u8bf7\u8f93\u5165\u60a8\u7684\u7535\u8bdd\u53f7\u7801",CB_SUCCESS_TIP_1:"\u7a0d\u540e\u60a8\u5c06\u63a5\u5230\u6211\u4eec\u7684\u7535\u8bdd\uff0c<br />\u8be5\u901a\u8bdd\u5bf9\u60a8\u5b8c\u5168\u514d\u8d39\uff0c<br />\u8bf7\u653e\u5fc3\u63a5\u542c\uff01",ERROR_CB_PHONE:"\u8bf7\u60a8\u8f93\u5165\u6b63\u786e\u7684\u53f7\u7801\uff0c\u624b\u673a\u53f7\u7801\u8bf7\u76f4\u63a5\u8f93\u5165\uff0c\u5ea7\u673a\u8bf7\u52a0\u533a\u53f7",ERROR_CB_FAIL:"\u7cfb\u7edf\u7e41\u5fd9\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5",CB_INPUT_CALLBACK:"\u7ed9\u60a8\u56de\u7535",BTN_SHOW_TIP:"\u70b9<br />\u51fb<br />\u514d<br />\u8d39<br />\u901a<br />\u8bdd"};b.ClassName={MAIN:"lxb-container",CB_INPUT:"lxb-cb-input",CB_INPUT_BTN:"lxb-cb-input-btn",CB_INPUT_TIP:"lxb-cb-input-tip",CB_LALESET_CALL:"lxb-cb-latest-call",CB_INPUT_CLEAR:"lxb-cb-input-clear",CB_INPUT_FEEDBACK:"lxb-cb-input-feedback",MobilePosition:{HOR:["lxb-mobile-pos-left","lxb-mobile-pos-right"],VER:["lxb-mobile-pos-top","lxb-mobile-pos-middle","lxb-mobile-pos-bottom"]}};b.ID={MAIN:"LXB_CONTAINER",IMG_PREV:"LXB_IMG_PREV_",BTN_SHOW:"LXB_CONTAINER_SHOW",COOKIE_DBCLKID:"LXB_DBCLICKID",COOKIE_REFER:"LXB_REFER"};b.TPL={MOBILE_CB_INPUT_TIP:'<ins class="lxb-cb-input-tip-content">'+b.Lang.CB_INPUT_TIP_3+b.Lang.CB_INPUT_TIP_1+b.Lang.CB_INPUT_TIP_2+"</ins>"}});lxb.add("net",function(a){var d=lxb.use("base");function e(f,g){return function(h){g.call(null,h);setTimeout(function(){var i=lxb.use("base").g(f);i.parentNode.removeChild(i)},0)}}function b(g,i){var h=document.getElementsByTagName("head")[0];var f=d.create("script",{type:"text/javascript",src:g,id:i||"",charset:"utf-8"});h.appendChild(f)}function c(f){var h=document.getElementsByTagName("head")[0];var g=d.create("link",{rel:"stylesheet",href:f,type:"text/css",charset:"utf-8"});h.appendChild(g)}a.send=function(f,h,j){var g="_lxb_jsonp_"+new Date().getTime().toString(36)+"_";var i=["t="+(new Date().getTime())];i.push("callback="+g);window[g]=e(g,j);h=h||"";if(typeof h!=="string"){h=d.jsonToQuery(h)}h+=(h?"&":"")+i.join("&");f+=(f.indexOf("?")>=0?"&":"?")+h;b(f,g)};a.loadCSS=c;a.log=function(f,g){if(window.console&&console.log){console.log("["+f+"]"+g)}}});lxb.add("business.container",function(d){var a=lxb.use("base");var f=lxb.use("config").ClassName;var h=lxb.use("config").ID;var g=lxb.use("config").Lang;var e={};var i={};function b(){var m=f.MAIN;var k=i.main=a.create("ins",{id:h.MAIN});k.style.visibility="hidden";var l=f.MAIN+"-"+e.style+"-"+e.styleType;var p=0;var j=0;if(e.styleType==5){p=0;if(e.position>0){j=0}else{j=2}}else{e.position<0?p=0:p=1;j=1}var n=f.MobilePosition.HOR[p]+" "+f.MobilePosition.VER[j];k.className=m+" "+l+" "+n;if(e.styleType==5){k.style.backgroundColor=e.floatColor}var o=i.btnHide=a.create("ins",{className:f.MAIN+"-btn-hide"});if(e.styleType<5){}else{o.style.display="none"}k.appendChild(o);o=i.btnShow=a.create("ins");m=f.MAIN+"-btn-show";m+=" "+f.MAIN+"-btn-show-"+e.style;m+=" "+n;m+=" "+f.MAIN+"-btn-show-"+e.style+f.MobilePosition.HOR[p];o.id=h.BTN_SHOW;o.className=m;if(e.styleType<5){o.style.backgroundColor=e.btnColor;o.style.top=Math.abs(e.position)+"%";o.style.color=e.fontColor;o.style.fontSize=Math.round(e.btnSize*100)+"%";o.innerHTML=g.BTN_SHOW_TIP}if(e.styleType==5){o.style.display="none";k.style.cssText+="display: block!important;"}else{o.style.display="block";k.style.display="none"}document.body.appendChild(o);document.body.appendChild(k);checkrnd=setInterval(function(){a.checking("rnd",checkrnd,true)},0)}function c(){i.main.onkeypress=i.main.onkeydown=i.main.onkeyup=i.main.onmousedown=i.main.onmouseup=i.main.onclick=function(l){l=l||window.event;if(l.stopPropagation){l.stopPropagation()}else{l.cancelBubble=true}};i.btnHide.onclick=function(){i.main.style.cssText=a.cssToggle(i.main.style.cssText,"display: none;");i.btnShow.style.display=""};var k=true;function j(){var l=document.body.childNodes;if(l[l.length-1]!==i.main){document.body.appendChild(i.main)}i.btnShow.style.display="none";i.main.style.cssText=a.cssToggle(i.main.style.cssText,"display: block!important;");checkclk=setTimeout(function(){k?a.checking("clk",checkclk):null;k=false},0)}if(i.btnShowMask){i.btnShowMask.contentWindow.document.onclick=j}i.btnShow.onclick=j}d.init=function(j){a.extend(e,j);b();c();return i.main}});lxb.add("business.callback",function(x){var g=lxb.use("base");var f=lxb.use("config").Lang;var c=lxb.use("config").TPL;var d=lxb.use("config").ClassName;var s=g.localStorage;var v=[];var h=0;var w=null;var e={};var k={};function y(){var C=k.tel=g.create("ins",{className:d.CB_LALESET_CALL});C.style.display="none";e.main.appendChild(C);var B=k.input=g.create("input",{type:"text",name:"phone",className:d.CB_INPUT,maxlength:12,placeholder:f.CB_INPUT_TIP_HOLDER});e.main.appendChild(B);var A=k.clearText=g.create("ins",{className:d.CB_INPUT_CLEAR});e.main.appendChild(A);var z=lxb.use("config").TPL;var D=k.btn=g.create("ins",{className:d.CB_INPUT_BTN});D.innerHTML=f.CB_INPUT_CALLBACK;if(e.btnColor){D.style.backgroundColor=e.btnColor;D.style.color=e.fontColor}e.main.appendChild(D);var E=k.tip=g.create("ins",{className:d.CB_INPUT_TIP});var z=lxb.use("config").TPL;if(e.styleType==5){E.style.display="none"}E.innerHTML=z.MOBILE_CB_INPUT_TIP;e.main.appendChild(E);var E=k.feedBackTip=g.create("ins",{className:d.CB_INPUT_FEEDBACK});E.style.display="none";e.main.appendChild(E)}function b(){e.main.onclick=function(){k.tel.style.display="none"};k.clearText.onclick=function(){k.input.value="";k.feedBackTip.style.display="none";k.tel.style.display="none"};k.tel.onclick=function(){k.input.value=k.tel.innerHTML;k.tel.style.display="none"};k.btn.onclick=function(){t();var z=k.input.value=g.trim(k.input.value);k.tel.style.display="none";if(!l(z)){return}j(z)};k.input.onfocus=function(){k.tip.style.display="";k.feedBackTip.style.display="none";k.feedBackTip.style.color="";var z=s.getItem("latestCall");if(z){k.tel.innerHTML=z;k.tel.style.display=""}};k.input.onclick=function(z){z=z||window.event;if(z.stopPropagation){z.stopPropagation()}else{z.cancelBubble=true}};k.input.onkeyup=function(z){z=z||window.event;if(z.keyCode==13){k.btn.onclick()}}}function p(A,z){k.feedBackTip.innerHTML=A;k.feedBackTip.style.color=z;k.feedBackTip.style.display="";k.tip.style.display="none";setTimeout(function(){k.feedBackTip.style.display="none";k.feedBackTip.innerHTML="";if(e.styleType<5){k.tip.style.display=""}},3000)}function r(z){p(f.CB_SUCCESS_TIP_1,"#477d00")}function l(A){var z=true;if(!/^\d{11,12}$/.test(A)){z=false;p(f.ERROR_CB_PHONE,"#f00")}return z}function j(C){var D=lxb.use("net");var B=lxb.use("config").Root+"/_c.js";var A=lxb.use("config").Root+"/xCode";var z=lxb.use("config").bdcbid;if(e.submitTimer){return}e.submitTimer=setTimeout(function(){e.submitTimer=null},5000);var E={vtel:C,siteid:e.siteid,bdcbid:z,refer_domain:e.refer};D.send(A,E,function(F){E.code=F.data.code;D.send(B,E,function(H){if(!!H.status){var I=H.msg||f.ERROR_CB_FAIL;p(I+" ( code: "+H.status+" )","#f00")}else{var G=H.data&&H.data.phone;r(G||e.callPhone);s.setItem("latestCall",C);k.input.value=""}if(e.submitTimer){clearTimeout(e.submitTimer);e.submitTimer=null}})});g.visitorLog(2,e.siteid)}function t(){lxb.use("base").create("img",{src:lxb.use("config").Root+"/count.gif?t=m"})}var u=function(z){z=z.replace(/^https?:\/\//,"").split("/");return z[0].replace(/:.*$/,"")};var a=function(){var z=u(window.location.href);var A=u(document.referrer);if(document.referrer){if(z===A){return false}else{return true}}else{if(g.getCookie("isLoadPage")==="loaded"){return false}else{g.setCookie("isLoadPage","loaded","/");return true}}};var m=function(){var z=v.shift();if(!z){return}var A=function(){var B=(new Date()).valueOf();if(B-h<3000){setTimeout(A,3000)}else{z.callback.call(null)}};setTimeout(A,z.delay*1000)};var n=true;function i(){var B=g.q("lxb-container")[0];var A=g.q("lxb-container-btn-show")[0];var z=document.body.childNodes;if(z[z.length-1]!==B){document.body.appendChild(B)}B.style.cssText=g.cssToggle(B.style.cssText,"display: block!important;");A.style.display="none";checkinv=setTimeout(function(){n?lxb.use("base").checking("inv",checkinv):null;n=false},0);m()}function o(){var A=g.q("lxb-container")[0];var z=g.q("lxb-container-btn-show")[0];A.style.cssText=g.cssToggle(A.style.cssText,"display: none;");z.style.display="block";m()}function q(){var z=w.stayTime;var D=w.inviteTimes;var B=w.inviteInterval;var A=w.closeTime||99999;v.push({delay:z,callback:function(){i()}});v.push({delay:A,callback:function(){o()}});D--;for(var C=0;C<D;C++){v.push({delay:B,callback:function(){i()}});v.push({delay:A,callback:function(){o()}})}m()}x.init=function(A){g.extend(e,A);w=A;var z=(e.styleType==5||e.styleType==3);y();b();var D=g.q("lxb-cb-input")[0];var E=g.q("lxb-cb-input-btn")[0];var C=g.q("lxb-container-btn-hide")[0];var B=function(){g.setCookie("isCalled","called","/");v=[]};var F=function(G){G=G||window.event;if(G.keycode===13){B()}h=(new Date()).valueOf()};if(D.addEventListener){D.addEventListener("keydown",F,false);D.addEventListener("mousedown",F,false);E.addEventListener("click",B,false);!z&&(C.addEventListener("click",o,false))}else{D.attachEvent("onkeydown",F);D.attachEvent("onmousedown",F);E.attachEvent("onclick",B);!z&&(C.attachEvent("onclick",o,false))}if(g.getCookie("isCalled")==="called"){return}if(z){return}if(w.ifStartPage===0){q();return}else{if(w.ifStartPage===1){if(a()){q();return}}}}});(function(){function h(q){var o={};var p=q.float_window;if(!p||p=="0"){return{}}o.base={btnSize:q.btnSize,btnColor:q.btnColor,floatColor:q.floatColor,fontColor:q.fontColor,position:q.position,styleType:q.styleType,style:"mobile"};var r=q.inviteWay||{};o.callback={callPhone:q.cbPhone||"",siteid:q.siteid,code:q.code,styleType:q.styleType,ifStartPage:r.ifStartPage||0,stayTime:r.stayTime||0,inviteTimes:r.inviteTimes||1,inviteInterval:r.inviteInterval||0,closeTime:r.closeTime||0,siteId:r.siteId||"",refer:n||""};if(q.styleType==5){o.callback.btnColor=q.btnColor;o.callback.fontColor=q.fontColor}return o}function d(r){var q=lxb.use("net");if(!!r.status){q.log("error","init");return}var p=r.data;p=h(p);var s;if(p.base){var o=lxb.use("config").Root+"/asset/"+p.base.style+".css";q.loadCSS(o);s=lxb.use("business.container").init(p.base)}if(p.callback){p.callback.main=s;lxb.use("business.callback").init(p.callback)}}function i(){var o=location.search?location.search.substring(1):"";o=c.queryToJSON(o);return o.bdclkid}function e(){var o=document.referrer;o=o.replace(/^https?:\/\//,"").split("/");return o[0].replace(/:.*$/,"")}function l(r){var o="";var p=[".com",".co",".cn",".info",".net",".org",".me",".mobi",".us",".biz",".xxx",".ca",".co.jp",".com.cn",".net.cn",".org.cn",".gov.cn",".mx",".tv",".ws",".ag",".com.ag",".net.ag",".org.ag",".am",".asia",".at",".be",".com.br",".net.br",".bz",".com.bz",".net.bz",".cc",".com.co",".net.co",".nom.co",".de",".es",".com.es",".nom.es",".org.es",".eu",".fm",".fr",".gs",".in",".co.in",".firm.in",".gen.in",".ind.in",".net.in",".org.in",".it",".jobs",".jp",".ms",".com.mx",".nl",".nu",".co.nz",".net.nz",".org.nz",".se",".tc",".tk",".tw",".com.tw",".com.hk",".idv.tw",".org.tw",".hk",".co.uk",".me.uk",".org.uk",".vg",".name"];p=p.join("|").replace(".","\\.");var q=new RegExp("\\.?([^.]+("+p+"))$");r.replace(q,function(t,s){o=s});return o}if(window.top!=window){lxb.instance++}if(lxb.instance>1){return}var f=lxb.use("config");var j=lxb.use("net");var c=lxb.use("base");var a=f.Root+"/_l.js";var k=i();if(!k){k=c.getCookie(f.ID.COOKIE_DBCLKID)}else{c.setCookie(f.ID.COOKIE_DBCLKID,k)}var n=e();if(!n||l(n)==l(location.hostname)){n=c.getCookie(f.ID.COOKIE_REFER)}else{var b=n+"; path=/";if(location.hostname.indexOf("baidu.com")<0){b+="; domain=."+l(location.hostname)}c.setCookie(f.ID.COOKIE_REFER,b)}var m=lxb.use("config").bdcbid;var g={siteid:f.SiteId,bdclickid:k||"",bdcbid:m||"",refer_domain:n||""};j.send(a,g,d);c.visitorLog(1,f.SiteId)})();
