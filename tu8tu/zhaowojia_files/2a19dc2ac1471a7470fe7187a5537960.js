"object"!=typeof JSON&&(JSON={}),function(){"use strict";function f(a){return 10>a?"0"+a:a}function quote(a){return escapable.lastIndex=0,escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return"string"==typeof b?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function str(a,b){var c,d,e,f,h,g=gap,i=b[a];switch(i&&"object"==typeof i&&"function"==typeof i.toJSON&&(i=i.toJSON(a)),"function"==typeof rep&&(i=rep.call(b,a,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";if(gap+=indent,h=[],"[object Array]"===Object.prototype.toString.apply(i)){for(f=i.length,c=0;f>c;c+=1)h[c]=str(c,i)||"null";return e=0===h.length?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]",gap=g,e}if(rep&&"object"==typeof rep)for(f=rep.length,c=0;f>c;c+=1)"string"==typeof rep[c]&&(d=rep[c],e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));else for(d in i)Object.prototype.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));return e=0===h.length?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}",gap=g,e}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()});var cx,escapable,gap,indent,meta,rep;"function"!=typeof JSON.stringify&&(escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,meta={"\b":"\\b","  ":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(a,b,c){var d;if(gap="",indent="","number"==typeof c)for(d=0;c>d;d+=1)indent+=" ";else"string"==typeof c&&(indent=c);if(rep=b,b&&"function"!=typeof b&&("object"!=typeof b||"number"!=typeof b.length))throw new Error("JSON.stringify");return str("",{"":a})}),"function"!=typeof JSON.parse&&(cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&"object"==typeof e)for(c in e)Object.prototype.hasOwnProperty.call(e,c)&&(d=walk(e,c),void 0!==d?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();define=window.define?window.define:function(name,callback){callback=callback||name;callback(function(){},window,window)};define(function(require,exports,module){var jQuery=window.jQuery||require('jquery');function cookieEnable(){return"undefined"!==typeof navigator.cookieEnabled?navigator.cookieEnabled:!1}function getPropertyCount(a){var c,b=0;for(c in a)a.hasOwnProperty(c)&&b++;return b}function _setCookie(a,c,b,g){b=new Date;b.setTime(b.getTime()+2592E6);var d="";g&&(d="domain="+g+";");document.cookie=a+"="+c+";expires="+b.toGMTString()+";path=/;"+d}function _getCookie(a,c){c&&(a="to8to_"+a);var b=document.cookie.match(new RegExp("(\\b)"+a+"=([^;]*)(;|$)"));return b?decodeURIComponent(b[2]):""}var clickStream={timeout_id:"clickStreamTimeout",vt:"",cd:"",gu:"",lastUrl:"",tag_id:"",item:0,sendSpeed:4E3,firefoxEnable:!0,sendCvTime:4E3,cvTimtOut:0,allowSend:!0,data:{pv:{},cv:{}},clearTimeOut:function(){clearTimeout(this.timeout_id)},createGuid:function(){for(var a="",c=1;32>=c;c++){var b=Math.floor(16*Math.random()).toString(16),a=a+b;if(8==c||12==c||16==c||20==c)a+=""}return this.guid=a+=Math.ceil(1E6*Math.random())},sendPvTimeout:function(){if(!0!==this.allowSend)return!1;var a=this;clearTimeout(a.timeout_id);this.timeout_id=setTimeout(function(){a.sendPv("refreshSpeed");a.data.pv.vt=a.getDate()},a.sendSpeed);this.allowSend=!1},refreshSpeed:function(){32E3>this.sendSpeed&&(this.sendSpeed*=2)},newPv:function(){var a=Math.floor(1E5*Math.random());this.cd=(new Date).getTime().toString()+a.toString();this.vt=this.getDate();this.gu=window.location.href;this.lastUrl=document.referrer;_setCookie("to8to_cook","OkOcClPzRWV8ZFJlCIF4Ag==",7776E3,".meijialz.com")},getPvParams:function(){this.data.pv={};this.data.pv.lu=this.lastUrl;this.data.pv.ly=1;this.data.pv.vt=this.vt;this.data.pv.cd=this.cd;this.data.pv.gu=this.gu;this.data.pv.ov=this.detectOS()},getCvParams:function(a){this.data.cv[this.item]={};var c=(new Date).getTime(),b=Math.floor(1E5*Math.random());this.data.cv[this.item].lu=document.referrer;this.data.cv[this.item].ly=2;this.data.cv[this.item].cg=a;this.data.cv[this.item].cd=c.toString()+b.toString();this.data.cv[this.item].vt=this.getDate();this.data.cv[this.item].gu=window.location.href;this.data.cv[this.item].ov=this.detectOS();this.item++;this.sendCv()},getTo8toCid:function(){return _getCookie("to8tocookieid")},sendPv:function(a){this.data.cid=this.getTo8toCid();this.data.pv.lt=this.getDate();var c=JSON.stringify(this.data);jQuery("#clickValId").val(c);jQuery("#frm_dealer").submit();this.data.cv={};this.item=0;this.data.pv.vt=this.getDate();this.allowSend=!0;if("function"===typeof clickStream[a])clickStream[a]()},sendCv:function(){var a=this;if(!getPropertyCount(this.data.cv))return!1;clearTimeout(this.cvTimtOut);clearTimeout(this.timeout_id);this.cvTimtOut=setTimeout(function(){a.sendPv("flushTimeout")},a.sendCvTime)},flushTimeout:function(){32E3>this.sendCvTime&&(this.sendCvTime*=2)},createIframe:function(){var a;a="<iframe frameborder='0' height='0' name='frm_dealer' id='clsIframe'></iframe><form action='http://www.meijialz.com/count/a682ab23d4b4c95f84c744b2826419cd.php' method='POST' id = 'frm_dealer' target='frm_dealer'>";a+="<input type='hidden' id='clickValId' name='key' value=''>";a+="</form>";jQuery("body").append(a)},getDate:function(){var a=new Date,c=a.getFullYear(),b=a.getMonth()+1,b=10>b?"0"+b:b,g=a.getDate(),g=10>g?"0"+g:g,d=a.getHours(),d=10>d?"0"+d:d,f=a.getMinutes(),f=10>f?"0"+f:f,k=a.getSeconds(),k=10>k?"0"+k:k,a=a.getMilliseconds();return c.toString()+b.toString()+g.toString()+d.toString()+f.toString()+k.toString()+"."+a},initCookie:function(){if(!_getCookie("to8tocookieid")){var a=clickStream.createGuid();_setCookie("to8tocookieid",a,7776E3,"meijialz.com")}},detectOS:function(){var a=navigator.userAgent,c="Win32"==navigator.platform||"Windows"==navigator.platform,b="Mac68K"==navigator.platform||"MacPPC"==navigator.platform||"Macintosh"==navigator.platform||"MacIntel"==navigator.platform;if(b)return"09";if("X11"==navigator.platform&&!c&&!b)return"08";var b=-1<String(navigator.platform).indexOf("Linux"),g="android"==a.toLowerCase().match(/android/i);if(b)return g?"07":"06";if(c){if(-1<a.indexOf("Windows NT 5.0")||-1<a.indexOf("Windows 2000"))return"05";if(-1<a.indexOf("Windows NT 5.1")||-1<a.indexOf("Windows XP"))return"04";if(-1<a.indexOf("Windows NT 5.2")||-1<a.indexOf("Windows 2003"))return"03";if(-1<a.indexOf("Windows NT 6.0")||-1<a.indexOf("Windows Vista"))return"02";if(-1<a.indexOf("Windows NT 6.1")||-1<a.indexOf("Windows 7"))return"01"}return"404"},init:function(){if(!cookieEnable())return!1;clickStream.initCookie();clickStream.newPv();clickStream.getPvParams();clickStream.createIframe();clickStream.sendPv();clickStream.bindEvents()},bindEvents:function(){jQuery(document).bind("click",function(){clickStream.sendPvTimeout()});jQuery(window).bind("scroll",function(){clickStream.sendPvTimeout()});jQuery(document).bind("mousemove",function(){clickStream.sendPvTimeout()})}};window.clickStream=clickStream;jQuery(document).ready(function(){clickStream.init()});window.onbeforeunload=function(){clickStream.sendPv()}});