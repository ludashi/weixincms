var server_host = '/';
var rankhelp_doc = '/help/rankhelp.html';
var isIE = navigator.userAgent.indexOf("compatible") > -1 && navigator.userAgent.indexOf("MSIE") > -1 && (navigator.appName !== "Oprea");
var isIE7 = (isIE && window.XMLHttpRequest) ? true: false;
var isIE6 = (isIE && !window.XMLHttpRequest && window.ActiveXObject) ? true: false;
var isFirefox = navigator.userAgent.indexOf('Firefox') == -1 ? false: true;
var userAgent = navigator.userAgent.toLowerCase();
var is_opera = userAgent.indexOf('opera') != -1 && opera.version();
var is_moz = (navigator.product == 'Gecko') && userAgent.substr(userAgent.indexOf('firefox') + 8, 3);
var is_ie = (userAgent.indexOf('msie') != -1 && !is_opera) && userAgent.substr(userAgent.indexOf('msie') + 5, 3);
var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
var to8to_uid = getCookie('uid', 1);
var to8to_ind = getCookie('ind', 1);
var divTop,
divLeft,
divWidth,
divHeight,
docHeight,
docWidth,
objTimer,
secI;
if ((window.location.href.indexOf(".meijialz.com") != -1))
 {
    server_host = "http://www.meijialz.com/"
}
//查询数组大小
if (!Array.prototype.push) {
    Array.prototype.push = function() {
        var startLength = this.length;
        for (var i = 0; i < arguments.length; i++)
        this[startLength + i] = arguments[i];
        return this.length
    }
}
//封装类
function $()
 {
    var obj = new Array();
    for (var i = 0, j = arguments.length; i < j; i++)
    {
        ele = arguments[i];
        if (typeof ele == 'object')
        return ele;
        if (typeof ele == 'string')
        ele = document.getElementById(ele) ? document.getElementById(ele) : document.getElementsByTagName(ele).length > 0 ? document.getElementsByTagName(ele) : false;
        if (j == 1)
        return ele;
        obj.push(ele);
    }
    return obj;
}
//判断是否冒泡
function doane(event) {
    e = event ? event: window.event;
    if (is_ie) {
        e.returnValue = false;
        e.cancelBubble = true;
    } else if (e) {
        e.stopPropagation();
        e.preventDefault();
    }
}
function doane_but_a(event) {
    e = event ? event: window.event;
    if (is_ie) {
        e.cancelBubble = true;
    } else if (e) {
        e.stopPropagation();
    }
}
function addNodes(o, O, d)
 {
    if (!O)
    return;
    d = parseInt(d);
    if (d < 0)
    {
        o.appendChild(O);
    }
    else if (d == 0)
    {
        if (o.childNodes.length != 0)
        o.insertBefore(O, o.firstChild);
        else
        o.appendChild(O);
    }
    else
    {
        if (o.childNodes.length - 1 < d)
        o.appendChild(O);
        else
        o.insertBefore(O, o.childNodes[d]);
    }
}
Object.extend = function(oFrom, oTo)
 {
    for (property in oFrom)
    {
        oTo[property] = oFrom[property];
    }
    return oTo;
}
var Events = new Object();
Events.addEvent = function(oTarget, sEventType, fnLister)
 {
    if (oTarget.addEventListener)
    {
        oTarget.addEventListener(sEventType, fnLister, false);
    }
    else if (oTarget.attachEvent)
    {
        oTarget.attachEvent("on" + sEventType, fnLister);
    }
    else
    {
        oTarget["on" + sEventType] = fnLister;
    }
}
Events.removeEvent = function(oTarget, sEventType, fnLister)
 {
    if (oTarget.removeEventListener)
    {
        oTarget.removeEventListener(sEventType, fnLister, false);
    }
    else if (oTarget.detachEvent)
    {
        oTarget.detachEvent("on" + sEventType, fnLister);
    }
    else
    {
        oTarget["on" + sEventType] = null;
    }
}
Events.formatEvent = function(oEvent)
 {
    if (isIE && isWin)
    {
        oEvent.charCode = (oEvent.type == "keypress") ? oEvent.keyCode: 0;
        oEvent.eventPhase = 2;
        oEvent.isChar = (oEvent.charCode > 0);
        oEvent.pageX = oEvent.cleintX + (document.body.scrollLeft || document.documentElement.scrollLeft);
        oEvent.pageY = oEvent.cleintY + (document.body.scrollTop || document.documentElement.scrollTop);
        oEvent.preventDefalt = function() {
            this.returnValue = false;
        }
        if (this.type == "mouseout")
        {
            oEvent.relatedTarget = oEvent.toElement;
        }
        else if (this.type == "mouseover")
        {
            oEvent.relatedTarget = oEvent.fromElement;
        }
        oEvent.target = oEvent.srcElement;
        oEvent.time = (new Date()).getTime();
    }
    return oEvent;
}
Events.getEvent = function()
 {
    if (window.event)
    return this.formatEvent(window.event);
    else
    return Event.getEvent.caller.arguments[0];
}
function autoSize(obj, w, h)
 {
    var oIMG = new Image()
    oIMG.onload = function()
    {
        var oW = this.width;
        var oH = this.height;
        var tax = 1;
        if (oW > w || oH > h)
        tax = (oW / oH) > (w / h) ? (w / oW) : (h / oH);
        obj.style.marginLeft = (w - Math.floor(oW * tax)) / 2 + "px";
        obj.style.marginTop = (h - Math.floor(oH * tax)) / 2 + "px";
        obj.width = oW * tax;
        obj.height = oH * tax;
    }
    oIMG.src = obj.src;
}  
//限定宽度，高度自适应
function autoSize_w(obj, w)
 {
    var oIMG = new Image()
    oIMG.onload = function()
    {
        var oW = this.width;
        if (oW > w)
        {
            obj.width = w;
            obj.height = Math.floor((this.height) * (w / this.width));

        }

    }
    oIMG.src = obj.src;

}
function autoSize_cut(obj, w, h) {
    var oIMG = new Image()
    oIMG.onload = function() {
        var oW = this.width;
        var oH = this.height;
        var tax = 1;
        if (oW > w || oH > h)
        tax = (oW / oH) < (w / h) ? (w / oW) : (h / oH);
        /*obj.style.marginLeft=(w-Math.floor(oW*tax))/2+"px";
		obj.style.marginTop=(h-Math.floor(oH*tax))/2+"px";*/
        obj.style.marginTop = -(Math.floor(oH * tax) - h) / 2 + "px";
        obj.width = oW * tax;
        obj.height = oH * tax;

    }
    oIMG.src = obj.src;

}


function makeCode()
 {
    var color = Array("#069", "#966", "#639", "#F00", "#303", "#F00", "#B4FF00", "#369");
    var code = "";
    var out = "";
    for (var i = 0; i < 4; i++) {
        var str = Math.floor(Math.random() * 10);
        code += str;
        out += "<b style='color:" + color[Math.floor(Math.random() * 8 + 1)] + ";font-size:18px;'>" + str + "</b>&nbsp;";
    }
    $("checkcode").innerHTML = out;
    $("checkcode").style.backgroundColor = '#FFF';
    if (!document.all)
    $("checkcode").style.padding = "1px";
    $("checkcodevalue").value = code;
}
function newverifypic() {
    var A = new Date().getTime();
    if ($('passport')) $('passport').src = 'http://www.meijialz.com/passport.php?t=' + A;
}

String.prototype.trim = function()
 {
    var res = /^\s*/;
    var value = this;
    value = value.replace(res, '')
    res = /\s*$/;
    return value.replace(res, '');
}
function drag(o, m)
 {
    var x;
    var y;
    o.onmousedown = MouseDown;
    if (o.firstChild)
    o.firstChild.onmousedown = function() {
        return false
    };
    var oP = o.parentNode;
    var r = new Array();
    function MouseDown(evt)
    {
        var evt = evt ? evt: window.event;
        if (o.setCapture)
        o.setCapture();
        else if (!isFirefox && window.captureEvents)
        window.captureEvents(evt.mousemove | evt.mouseup);
        if (m)
        {
            r[0] = oP.layerLeft ? oP.layerLeft: oP.offsetLeft;
            r[1] = r[0] + oP.offsetWidth ? oP.offsetWidth: oP.layerWidth;
            r[2] = oP.layerTop ? oP.layerTop: oP.offsetTop
            r[3] = r[2] + oP.offsetHeight ? oP.offsetHeight: oP.layerHeight;
        }
        x = evt.layerX ? evt.layerX: evt.offsetX;
        y = evt.layerY ? evt.layerY: evt.offsetY;
        document.onmousemove = MouseMove;
        document.onmouseup = MouseUp;
        stopEvent(evt)
        return false;
        function MouseMove(evt)
        {
            var evt = evt ? evt: window.event;
            var Tx = evt.pageX ? evt.pageX: evt.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
            var Ty = evt.pageY ? evt.pageY: evt.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
            if (m)
            {
                Tx = Tx - r[0];
                Ty = Ty - r[2];
            }
            o.style.left = parseInt(Tx - x);
            o.style.top = parseInt(Ty - y);
            document.body.style.cursor = "move";
            stopEvent(evt)
            return false;
        }
        function MouseUp(evt)
        {
            evt = evt || window.event;
            if (o.releaseCapture)
            o.releaseCapture();
            else if (!isFirefox && window.releaseEvents)
            window.releaseEvents(evt.mousemove | evt.mouseup);
            document.onmousemove = null;
            document.onmouseup = null;
            document.body.style.cursor = "";
            stopEvent(evt)
            return false;
        }
        function stopEvent(evt)
        {
            if (evt.preventDefault)
            {
                evt.stopPropagation();
                evt.preventDefault();
            }
            else
            {
                evt.returnValue = false;
                evt.cancelBubble = true;
            }
        }
    }
}
function scroll2top(o) {
    var top = 0;
    if (typeof o == 'string')
    {
        var node = $(o);
    }
    else if (typeof o == 'object')
    {
        var node = o;
    }
    else if (typeof o == 'number')
    {
        top = o;
    }
    if (node) {
        top += node.offsetTop;
    }
    window.scrollTo(0, top);
}
function get_content(oEle, nMax)
 {
    var nNum = string_bytes(oEle.value);
    if (nNum > nMax)
    {
        var maxwords = getbybytes(oEle.value, nMax);
        oEle.value = oEle.value.substring(0, maxwords);
    }
}
function string_bytes(sStr)
 {
    if (typeof(sStr) != 'string')
    {
        sStr = sStr.value
    }
    var nLen = 0;
    for (var i = 0; i < sStr.length; i++)
    {
        if (sStr.charCodeAt(i) > 127)
        {
            nLen++
        }
        nLen++
    }
    return nLen
}
function getbybytes(sStr, nNum) {
    var sWords = 0;
    var nBytes = 0;
    for (var i = 0; i < sStr.length; i++) {
        if (nBytes < nNum - 1) {
            if (sStr.charCodeAt(i) > 127) {
                sWords++;
                nBytes = nBytes + 2
            } else {
                sWords++;
                nBytes++
            }
        } else if (nBytes == nNum - 1) {
            if (sStr.charCodeAt(i) > 127) return sWords;
            else {
                sWords++;
                nBytes++
            }
        } else return sWords
    }
}

function pic_type(sUrl)
 {
    var sType = sUrl.substr(sUrl.lastIndexOf('.') + 1);
    var j = 0;
    var arr = new Array('jpg', 'gif', 'bmp', 'png', 'jpeg', 'pjpeg');
    for (var i = 0; i < arr.length; i++)
    {
        if (arr[i] != sType.toLowerCase())
        j++;
    }
    if (j == arr.length)
    return false;
    else
    return true;
}

function setCookie(name, value, expire, pre)
 {
    if (!expire)
    expire = 5000;
    if (pre)
    name = 'to8to_' + name;
    var expiry = new Date();
    expiry.setTime(expiry.getTime() + expire)
    document.cookie = name + '=' + value + ';expires=' + expiry.toGMTString() + ';path=/;domain=.meijialz.com';
}
function getCookie(name, pre)
 {
    if (pre)
    name = 'to8to_' + name;
    var r = new RegExp("(\\b)" + name + "=([^;]*)(;|$)");
    var m = document.cookie.match(r);
    var res = !m ? "": decodeURIComponent(m[2]);
    var result = stripscript(res);
    return result;

}

/****************XSS过滤********************/
function stripscript(s)
 {
    var pattern = new RegExp("[%`~!@#$^&*()=|{}':;',\\[\\]<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
    //格式 RegExp("[在中间定义特殊过滤字符]")
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');

    }
    return rs;

}

/**********************************************/
function check_point(sValue)
 {
    var re = /^[\s0-9a-zA-Z\u0391-\uFFE5]+$/gi;
    if (!re.test(sValue))
    return false;
    else
    return true;
}
function show_error(sIdName)
 {
    if (sIdName)
    var oObj = $(sIdName);
    oObj.style.display = "block";
}
function hide_error(sIdName)
 {
    if (sIdName)
    var oObj = $(sIdName);
    oObj.style.display = "none";
}
function show_cat_err(sStr, sIdName)
 {
    var oObj = $(sIdName);
    show_error(sIdName)
    oObj.innerHTML = sStr;
}
jsPage = function(iNums, iPrePage, iCurpage, fnCallBack, sInnerId)
 {
    _this = this;
    this.iNums = Math.ceil(iNums);
    this.iPrePage = Math.ceil(iPrePage);
    this.iCurPage = Math.ceil(iCurpage);
    this.fnCallBack = fnCallBack;
    this.sInnerId = sInnerId;
    this.sPageDivClass = 'pages';
    this.sPrevClass = 'prev';
    this.sNextClass = 'next';
    this.sFirstClass = 'first';
    this.sLastClass = 'last';
    if (this.iNums <= this.iPrePage)
    {
        return false;
    }
    this.setPageDivClass = function(css)
    {
        this.sPageDivClass = css;
    }
    this.setPrevClass = function(css)
    {
        this.sPrevClass = css;
    }
    this.setNextClass = function(css)
    {
        this.sNextClass = css;
    }
    this.multi = function(i)
    {
        if (i)
        this.iCurPage = Math.ceil(i);
        var sHtmlPage = '';
        if (this.iNums < this.iPrePage)
        sHtmlPage = '';
        else
        {
            var iPages = Math.ceil(this.iNums / this.iPrePage);
            if (!this.iCurPage || this.iCurPage < 1)
            this.iCurPage = 1;
            if (this.iCurPage > iPages)
            this.iCurPage = iPages;
            var iFrom = 1;
            var iTo = 1;
            if (iPages < 10)
            {
                iFrom = 1;
                iTo = iPages;
            }
            else
            {
                iFrom = this.iCurPage - 4;
                iTo = iFrom + 10 - 1;
                if (iFrom < 1)
                {
                    iTo = this.iCurPage - iFrom + 1;
                    iFrom = 1;
                    if (iTo - iFrom < 10)
                    iTo = 10;
                }
                else if (iTo > iPages)
                {
                    iFrom = iPages - 10 + 1;
                    iTo = iPages;
                }
            }
            sHtmlPage = this.iCurPage - 4 > 1 && iPages > 10 ? '<a href="#" class="' + this.sFirstClass + '" onclick="_this.fnCallBack(1);_this.multi(1);return false;">1 ...</a>': '';
            sHtmlPage += this.iCurPage > 1 ? '<a href="void(0)" class="' + this.sPrevClass + '" onclick="_this.fnCallBack(' + (this.iCurPage - 1) + ');_this.multi(' + (this.iCurPage - 1) + ');return false;">&lsaquo;&lsaquo;</a>': '';
            for (var i = iFrom; i <= iTo; i++)
            {
                sHtmlPage += i == this.iCurPage ? '<strong>' + i + '</strong>': '<a href="#" onclick="_this.fnCallBack(' + i + ');_this.multi(' + i + ');return false;">' + i + '</a>';
            }
            sHtmlPage += this.iCurPage < iPages ? '<a href="#" class="' + this.sNextClass + '" onclick="_this.fnCallBack(' + (this.iCurPage + 1) + ');_this.multi(' + (this.iCurPage + 1) + ');return false;">&rsaquo;&rsaquo;</a>': '';
            sHtmlPage += iTo < iPages ? '<a href="#" class="' + this.sLastClass + '" onclick="_this.fnCallBack(' + iPages + ');_this.multi(' + iPages + ');return false;">... ' + iPages + '</a>': '';
            sHtmlPage = sHtmlPage ? '<div class="' + this.sPageDivClass + '"><em>&nbsp;' + this.iNums + '&nbsp;</em>' + sHtmlPage + '</div>': '';
        }
        if (this.sInnerId && document.getElementById(sInnerId))
        document.getElementById(sInnerId).innerHTML = sHtmlPage;
        else
        return sHtmlPage;
    }
}
function jsSelectItem(arr, itemValue, mod, selectName, attribute, echo, defaultValue)
 {
    if (!attribute)
    attribute = '';
    var js = '<select id="' + selectName + '" name="' + selectName + '" ' + attribute + '>';
    if (defaultValue)
    js += '<option>' + defaultValue + '</option>';
    if (arr)
    {
        if ('K-V' == mod)
        {
            for (var i in arr)
            {
                if (typeof arr[i] == 'function')
                continue;
                js += '<option  value="' + (parseInt(i)) + '"';
                if (parseInt(i) == itemValue)
                {
                    js += 'selected="selected"';
                }
                js += '>' + arr[i] + '</option>';
            }
        }
        else if ('V-V' == mod)
        {
            for (var i = 0, j = arr.length; i < j; i++)
            {
                js += '<option  value="' + arr[i] + '"';
                if (arr[i] == itemValue)
                {
                    js += 'selected="selected"';
                }
                if (selectName == "User_Shen")
                js += '>' + GP_EN[i] + '</option>';
                else
                js += '>' + arr[i] + '</option>';
            }
        }
    }
    js += '</select>';
    if (echo)
    document.write(js);
    else
    return js;
}
function in_array(value, arr)
 {
    if (!arr || arr.length == 0)
    return false;
    var flag = false;
    for (var i = 0, j = arr.length; i < j; i++)
    {
        if (arr[i] == value)
        flag = true;
    }
    return flag;
}
function middle(o)
 {
    if (!o)
    return false;
    o = $(o);
    o.style.position = 'absolute';
    if (o.offsetWidth == 0)
    o.offsetWidth = parseInt(o.style.width)
    if (o.offsetHeight == 0)
    o.offsetHeight = parseInt(o.style.height)
    var sClientWidth = document.body.clientWidth || document.documentElement.clientWidth;
    var sClientHeight = window.screen.height;
    var iLeft = (document.body.clientWidth / 2) - (o.offsetWidth / 2);
    var sScrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var iTop = -80 + (sClientHeight / 2 + sScrollTop) - (o.offsetHeight / 2);
    iTop = iTop > 0 ? iTop: (sClientHeight / 2 + sScrollTop) - (oDialog.offsetHeight / 2);
    o.style.left = iLeft + 'px';
    o.style.top = iTop + 'px';
}
function insertScript(id, url) {
    var oScript = $(id);
    if (oScript)
    oScript.parentNode.removeChild(oScript);
    oScript = document.createElement('script');
    oScript.setAttribute('id', id);
    oScript.setAttribute('src', url);
    oScript.setAttribute('type', 'text/javascript');
    oScript.setAttribute('language', 'javascript');
    var header = $('head').item(0);
    header.appendChild(oScript);

}
function jsLoader()
 {
    this.load = function(f)
    {
        var oTags = document.getElementsByTagName('script');
        for (i = oTags.length - 1; i >= 0; i--)
        {
            var src = oTags[i].src;
            if (src && src.indexOf(f) > -1)
            {
                this.onsuccess();
                return;
            }
        }
        var s = document.createElement('script');
        var header = document.getElementsByTagName('head').item(0);
        s.setAttribute('src', f);
        s.setAttribute('type', 'text/javascript');
        s.setAttribute('language', 'javascript');
        header.appendChild(s);
        var _self = this;
        s.onload = s.onreadystatechange = function()
        {
            if (this.readyState && this.readyState == "loading")
            return;
            _self.onsuccess();
        }
        s.onerror = function()
        {
            header.removeChild(s);
            _self.onfailure();
        }
    };
    this.onfailure = function() {};
    this.onsuccess = function() {};
}

function zoompic(obj, zimg)
 {
    var oJsLoader = new jsLoader();
    oJsLoader.onsuccess = function() {
        zoom(obj, zimg)
    };
    oJsLoader.load('http://www.meijialz.com/gb_js/zoom.js');
}
function zoompic2(obj, zimg)
 {
    var oJsLoader = new jsLoader();
    oJsLoader.onsuccess = function() {
        zoom(obj, zimg)
    };
    oJsLoader.load('http://www.meijialz.com/gb_js/zoom2.js');
}

function addFriends(u, f, t, w, h)
 {
    var oJsLoader = new jsLoader();
    var uid = getCookie('uid', 1);
    if (!uid)
    {
        oJsLoader.onsuccess = function() {
            editPhotoCat('/pop_login.php', '登陆', 360, 250);
        }
        oJsLoader.load('/gb_js/popup.js');
        return false;
    }
    u = uid;
    var url = '/friend_modify.php?uid=' + u + '&type=' + encodeURIComponent(t);
    if (f)
    url = url.concat('&fid=').concat(f);
    oJsLoader.onsuccess = function() {
        editPhotoCat(url, t, w, h);
    };
    oJsLoader.load('/gb_js/popup.js');
}
function SendMsg(act, toid)
 {
    var openurl = 'http://bbs.meijialz.com/home.php?mod=spacecp&ac=pm&op=showmsg&handlekey=showmsg_' + toid + '&touid=' + toid + '&daterange=2&msg_from_to8to=2&inajax=1';
    var uid = getCookie('uid', true);
    if (!uid) {
        openurl = '/pop_login.php'
    };
    var sToid = "";
    if (toid) sToid = "&toid=" + toid;
    var sAct = "";
    sAct = act + sToid;
    var oJsLoader = new jsLoader();
    oJsLoader.onsuccess = function() {
        editPhotoCat(openurl, '发短消息', 400, 480);
    }
    oJsLoader.load('http://www.meijialz.com/gb_js/popup.js');
    return false;
}
function showSingleLogin(n)
 {
    var goUrl = 'http://www.meijialz.com/pop_login.php'
    if (n && parseInt(n)) goUrl = 'http://www.meijialz.com/pop_login.php?id=' + parseInt(n);
    var oJsLoader = new jsLoader();
    oJsLoader.onsuccess = function() {
        editPhotoCat(goUrl, '登陆', 360, 250);
    }
    oJsLoader.load('http://www.meijialz.com/gb_js/popup.js');
    return false;
}

function noLogin_button()
 {
    var uid = getCookie('uid', true);
    if (!uid)
    return showSingleLogin();
    return true;
}
function isDigit(num)
 {
    var regs = /^\d+$/
    if (regs.test(num)) {
        return true;
    }
    else
    {
        return false;
    }
}
function getRadioValue(name) {
    var radioes = document.getElementsByName(name);
    for (var i = 0; i < radioes.length; i++)
    {
        if (radioes[i].checked) {
            return radioes[i].value;
        }
    }
    return false;
}

function Upload_clear(id, i)
 {
    var up = (typeof id == "string") ? document.getElementById(id) : id;
    if (typeof up != "object") return null;
    var tt = document.createElement("span");
    tt.id = "__tt__";
    up.parentNode.insertBefore(tt, up);
    var tf = document.createElement("form");
    tf.appendChild(up);
    document.getElementsByTagName("body")[0].appendChild(tf);
    tf.reset();
    tt.parentNode.insertBefore(up, tt);
    tt.parentNode.removeChild(tt);
    tt = null;
    tf.parentNode.removeChild(tf);
    if ($("view_del_" + i)) $("view_del_" + i).style.display = 'none';
    if ($("view_text_" + i)) $("view_text_" + i).style.display = 'none';
    if ($("view_textarea_" + i)) $("view_textarea_" + i).style.display = 'none';
    if ($("view_message_" + i)) $("view_message_" + i).innerHTML = '';
    if ($("pic" + i)) $('pic' + i).style.display = 'none';
    if ($("view_img_" + i)) $("view_img_" + i).style.display = 'none';
    if (isIE6 || isIE7) {
        if ($("p_view_img_" + i)) {
            $("p_view_img_" + i).style.display = 'block';
            $("p_view_img_" + i).src = '/img/css/view.gif';
        }
    }
    else
    if ($("p_view_img_" + i))
    $("p_view_img_" + i).style.display = 'none';
}
function checkImageFileNone(i)
 {
    if ($("view_img_" + i)) $("view_img_" + i).style.display = 'none';
    if ($("p_view_img_" + i)) {
        $("p_view_img_" + i).style.display = 'block';
        $("p_view_img_" + i).src = '/img/css/view.gif';
    }
    $("pic" + i).style.display = 'none';
}
function checkImageFile(i, obj, w, h, z)
 {
    $("view_message_" + i).innerHTML = '';
    $("view_del_" + i).style.display = 'block';
    checkImageFileNone(i);
    var dFile = $(obj.id);
    if ($('view_img_' + i)) {
        $('view_img_' + i).style.display = 'block';
        var dImg = $('view_img_' + i);
    }
    if ($('p_view_img_' + i))
    var dImg = $('p_view_img_' + i);
    if (!dFile.value.match(/.jpg|.gif|.png|.bmp/i))
    {
        $("view_message_" + i).innerHTML = '抱歉图片格式错误,请阅读上传说明';
        checkImageFileNone(i);
        return false;
    }
    if (dFile.files) {
        dImg.src = dFile.files[0].getAsDataURL();
    }
    else
    {
        if (isIE6) {
            var img = new Image();
            img.onload = function()
            {
                var size = Math.round(this.fileSize / 1024);
                if (size > (z * 1024))
                {
                    $("view_message_" + i).innerHTML = '图片<span style="color:#00F">' + size + 'KB</span>,超过最大允许限制';
                    checkImageFileNone(i);
                    return false;
                }
                if (img.height < h && img.width < w)
                {
                    $("view_message_" + i).innerHTML = '图片宽高不能小于<span style="color:#00F;float:none;">' + w + '*' + h + '</span>,请重新上传！';
                    checkImageFileNone(i);
                }
                if ($('view_img_' + i)) {
                    $('view_img_' + i).style.display = 'block';
                    $('view_img_' + i).firstChild.src = obj.value;
                }
                if ($('p_view_img_' + i)) $('p_view_img_' + i).src = obj.value;
                $("pic" + i).style.display = 'none';
                dImg.style.display = 'block';
            }
            img.src = dFile.value;
        }
        if (isIE7 || (img.height == 30 && img.width == 28) || (img.height == 0 && img.width == 0))
        {
            var newPreview = $('pic' + i);
            newPreview.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dFile.value;
            $("pic" + i).style.display = 'block';
            dImg.style.display = 'none';
        }
        if (isIE7)
        {
            $('img_hidden' + i).filters.item("DXImageTransform.Microsoft.AlphaImageLoader").sizingMethod = 'image';
            $('img_hidden' + i).style.minHeight = h + 'px';
            $('img_hidden' + i).style.minWidth = w + 'px';
            try
            {
                $('img_hidden' + i).filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dFile.value;
                imgwidth = $('img_hidden' + i).offsetWidth;
                imgheight = $('img_hidden' + i).offsetHeight;
                if (imgheight < h && imgwidth < w)
                {
                    $("view_message_" + i).innerHTML = '图片宽高不能小于<span style="color:#00F;float:none;">' + w + '*' + h + '</span>,请重新上传！';
                    checkImageFileNone(i);
                    return false;
                }
            } catch(e) {
                alert('无效的图片文件。');
                w = 0;
                h = 0;
                return;
            }
        }
    }
    if ($('view_text_' + i))
    $('view_text_' + i).style.display = 'block';
    if ($('view_textarea_' + i))
    {
        $('view_textarea_' + i).style.display = 'block';
        if ($('view_textarea_' + i).getElementsByTagName('textarea')[0])
        {
            $('view_textarea_' + i).getElementsByTagName('textarea')[0].focus();
            $('view_textarea_' + i).getElementsByTagName('textarea')[0].onblur = function() {
                if (!$('view_textarea_' + i).getElementsByTagName('textarea')[0].value) $('view_textarea_' + i).style.display = 'none';
            }
        }
    }
}
function DelHtml(str)
 {
    str = str.trim();
    str = str.replace(/<\/?[^>]*>/g, '');
    str = str.replace(/<iframe/g, '');
    return (str);
}

function to8toyx()
 {
    url = window.location.href;
    if (null == url || url.indexOf("?") == -1)
    {
        return null;
    }
    var argsUrl = url.split("?")[1];
    if (argsUrl.indexOf("=") == -1)
    {
        return null;
    }
    if (argsUrl.indexOf("welcome=") != -1)
    {
        href = "http://www.meijialz.com/getuserdata.php?pos=to8toyx&" + argsUrl;
        href += '&s=' + Math.random(5);
        insertScript('sInsertScript', href);
    }
    else
    {
        return null;
    }
}





function objoper(ind, obj)
 {
    var uid = getCookie('uid', true);
    if (!uid)
    {
        showSingleLogin();
        return false;
    }
    else
    {
        var to8to_ind = getCookie('ind', true);
        if (to8to_ind != ind)
        {
            var str_ind;
            switch (ind)
            {
            case 'sjs':
                str_ind = '设计师';
                break;
            case 'yz':
                str_ind = '业主';
                break;
            case 'zs':
                str_ind = '装饰公司';
                break;
            case 'sj':
                str_ind = '商家';
                break;
            }
            alert('对不起只有' + str_ind + '才能进行此项操作！');
            return false;
        }
        else
        {
            var href = obj.href;
            var temStr = 'uid=' + uid;
            if (href.indexOf('uid') > -1 && href.indexOf(temStr) == -1)
            {
                obj.href = href.replace('uid=', temStr);
            }
        }
    }
}
function copyToClipboard(txt, str) {
    if (window.clipboardData) {
        window.clipboardData.clearData();
        window.clipboardData.setData("Text", txt);
    } else if (navigator.userAgent.indexOf("Opera") != -1) {
        window.location = txt;
    } else if (window.netscape) {
        try {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
        } catch(e) {
            alert("你使用的FF浏览器,复制功能被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true'");
        }
        var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
        if (!clip)
        return;
        var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
        if (!trans)
        return;
        trans.addDataFlavor('text/unicode');
        var str = new Object();
        var len = new Object();
        var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
        var copytext = txt;
        str.data = copytext;
        trans.setTransferData("text/unicode", str, copytext.length * 2);
        var clipid = Components.interfaces.nsIClipboard;
        if (!clip)
        return false;
        clip.setData(trans, null, clipid.kGlobalClipboard);
    }
    str = str ? str: '招聘地址';
    alert(str + "已经复制到粘贴板，您可以直接点粘贴发给您的好友！");
}
function SetHome(obj, url) {
    try {
        obj.style.behavior = 'url(#default#homepage)';
        obj.setHomePage(url);
    } catch(e) {
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            } catch(e) {
                alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
            };
        } else {
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将'" + url + "'设置为首页。");
        };
    };
};
function addfavorite(url, title)
 {
    try
    {
        window.external.addFavorite(url, title);
    }
    catch(e)
    {
        try
        {
            window.sidebar.addPanel(title, url, "");
        }
        catch(e)
        {
            alert("加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}
function pageKeyDown(e)
 {
    if (document.all) e = window.event;
    if (e.keyCode == 39)
    {
        if ($('nextpageid'))
        window.location = $('nextpageid').href;
        else
        {
            alert('已达到最后一页');
            return false;
        }
    }
    else if (e.keyCode == 37)
    {
        if ($('prepageid'))
        window.location = $('prepageid').href;
        else
        {
            alert('已达到第一页');
            return false;
        }
    }
}
Object.extend(Array.prototype, {
    shift: function() {
        var result = this[0];
        for (var i = 0; i < this.length - 1; i++)
        this[i] = this[i + 1];
        this.length--;
        return result;
    }
});
function mb_strlen(str)
 {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        len += str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255 ? (charset == 'utf-8' ? 3: 2) : 1;
    }
    return len;
}

function goods_tg(placeid, oid)
 {
    var uid = getCookie('uid', 1);
    var ind = getCookie('ind', 1);
    if (uid)
    {
        if (ind == 'sj')
        {
            if (oid)
            {
                var oJsLoader = new jsLoader();
                oJsLoader.onsuccess = function() {
                    editPhotoCat('/goods_tg_win.php?placeid=' + placeid + '&oid=' + oid, '商品推广', 300, 100);
                }
                oJsLoader.load('/gb_js/popup.js');
            }
            else
            {
                var href = server_host + 'getuserdata.php?pos=sj_tg&placeid=' + placeid + '&s=' + Math.random(5);
                insertScript('sInsertScript_sj_tg', href);
            }
        }
        else
        alert('对不起，只有商家才能进行此项操作！');
    }
    else
    showSingleLogin();
    return false;
}
function slideLine(ul, delay, speed, lh, stepvalue) {
    var slideBox = (typeof ul == 'string') ? document.getElementById(ul) : ul;
    var slideBox2 = (typeof ul == 'string') ? document.getElementById(ul) : ul;
    for (var i = 0; i < slideBox2.childNodes.length; i++) {
        if (slideBox2.childNodes[i].nodeType == 1) {
            if (slideBox2.childNodes[i].tagName == "UL")
            slideBox2 = slideBox2.childNodes[i];
            break;
        }
    }
    var delay = delay || 1000,
    speed = speed || 0,
    lh = lh || 1,
    stepvalue = stepvalue || 2;
    var tid = null,
    pause = false;
    var start = function() {
        tid = setInterval(slide, speed);
    }
    function slide()
    {
        if (pause) return;
        slideBox.scrollTop += stepvalue;
        if (slideBox.scrollTop % lh == 0) {
            clearInterval(tid);
            slideBox2.appendChild(slideBox2.getElementsByTagName('li')[0]);
            slideBox.scrollTop = 0;
            setTimeout(start, delay);
        }
    }
    slideBox.onmouseover = function() {
        pause = true;
    }
    slideBox.onmouseout = function() {
        pause = false;
    }
    setTimeout(start, delay);
}
function getCookieVal(offset) {
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr == -1) endstr = document.cookie.length;
    return unescape(document.cookie.substring(offset, endstr));
}
function get_historyCookie(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg) return getCookieVal(j);
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break;
    }
    return null;
}
function set_historyCookie(name, value, _T) {
    var exp = new Date();
    exp.setTime(exp.getTime() + 3600000000);
    var path = "/";
    var domain = ".meijialz.com";
    if (_T) exp.setTime(exp.getTime() - 3600000000); {
        var curCookie = name + "=" + value + "; expires=" + exp.toGMTString() + "; path=" + path + "; domain=" + domain + ";";
        document.cookie = curCookie;
    }
}
function glog(evt) {
    try {
        while (evt)
        {
            wlink = evt + ",";
            old_info = get_historyCookie("history_info");
            var insert = true;
            if (old_info == null) {
                insert = true;
            }
            else {
                var old_link = old_info.split(",");
                for (var j = 0; j <= 10; j++)
                {
                    if (old_link[j] == "null")
                    break;
                }
            }
            if (insert) {
                wlink += get_historyCookie("history_info");
                var wlink = wlink.split(",");
                for (var i = 0; i < wlink.length; i++)
                {
                    for (var j = wlink.length - 1; j > i; j--)
                    {
                        if (wlink[j] == wlink[i])
                        {
                            wlink.splice(j, 1);
                        }
                    }
                }
                var wlinks = '';
                for (var k = 0; k < wlink.length; k++)
                {
                    if (k < 10)
                    {
                        if (wlink[k] != 'null')
                        {
                            if (wlinks == '')
                            wlinks = wlink[k] + ',';
                            else
                            wlinks = wlinks + wlink[k] + ',';
                        }
                    }
                }
                if (wlinks != '')
                wlink = wlinks + 'null';
                set_historyCookie("history_info", wlink);
                history_show().reload();
                break;
            }
            evt = evt.parentNode;
        }
    }
    catch(e) {}
    return true;
}
function clearHistoty() {
    wlink = null;
    set_historyCookie("history_info", wlink, 1);
    $("history").innerHTML = "暂无浏览纪录！";
    $("history").className = "now_none";
    $("clshistoty").style.display = "none"
}
function loadPng(o)
 {
    if (isIE6)
    {
        try {
            var img = o;
            var imgName = o.src.toUpperCase();
            if (imgName.substring(imgName.length - 3, imgName.length) == "PNG")
            {
                var imgID = (img.id) ? "id='" + img.id + "' ": "";
                var imgClass = (img.className) ? "class='" + img.className + "' ": "";
                var imgTitle = (img.title) ? "title='" + img.title + "' ": "title='" + img.alt + "' ";
                var imgStyle = "display:inline-block;" + img.style.cssText;
                if (img.align == "left") imgStyle = "float:left;" + imgStyle;
                if (img.align == "right") imgStyle = "float:right;" + imgStyle;
                if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle;
                var strNewHTML = "<span " + imgID + imgClass + imgTitle + " style=\"" + imgStyle + ";" + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader" + "(src=\'" + img.src + "\', sizingMethod='image');width:1px;\"></span>";
                img.outerHTML = strNewHTML;
            }
        }
        catch(e) {}
    }
}
function toNew(id, mod)
 {
    var strtname = '深圳';
    if (getCookie('townid', 1))
    {
        if (mod != 'my')
        {
            var strtname = decodeURIComponent(getCookie('tname', 1)).substring(0, 2);
            oload_online_zx(getCookie('townid', 1), strtname);
        }
    }
    if (mod == 'jc')
    {
        var tag = $('header').getElementsByTagName('h1');
        var oSpan = document.createElement('span');
        oSpan.innerHTML = '[' + strtname + ']';
        tag[0].appendChild(oSpan);
    }
}
function updateDiv_SC(id)
 {
    var oA = $('city' + id).parentNode.getElementsByTagName('a');
    for (var i = 0, j = oA.length; i < j; i++)
    {
        oA[i].className = '';
    }
    $('city' + id).className = 'on';
    var oJsLoader = new jsLoader();
    oJsLoader.load("http://www.meijialz.com/getuserdata.php?pos=seltown&id=" + id + "&s=" + Math.random(5));
    return false;
}
function closeDiv_SC()
 {
    $("select_city").style.display = "none";
    if (isIE6)
    {
        var oSelect = document.getElementsByTagName('select');
        for (var i = 0, j = oSelect.length; i < j; i++)
        {
            oSelect[i].style.visibility = 'visible';
        }
    }
}
function load_SC(id)
 {
    if (!$('select_city'))
    {
        var obj = document.createElement('div');
        obj.id = 'select_city';
        obj.className = 'select_city';
        obj.innerHTML = '<div class="border"><a onclick="closeDiv_SC()" title="close" class="close"></a><p class="tit" id="cur_title">当前所在范围：</p>	<div class="citys"><p id="select_town"><span>请选择您所在的区域：</span></p ></div><div class="citys2"><p class="title">您还可以去以下城市的装修网：</p><p><a href="#" onclick="updateDiv_SC(102)" id="city102">南昌</a><a href="#" onclick="updateDiv_SC(103)" id="city103">景德镇</a><a href="#" onclick="updateDiv_SC(104)" id="city104">萍乡</a><a href="#" onclick="updateDiv_SC(105)" id="city105">新余</a><a href="#" onclick="updateDiv_SC(106)" id="city106">九江</a><a href="#" onclick="updateDiv_SC(107)" id="city107">鹰潭</a><a href="#" onclick="updateDiv_SC(108)" id="city108">赣州</a><a href="#" onclick="updateDiv_SC(109)" id="city109">吉安</a><a href="#" onclick="updateDiv_SC(110)" id="city110">宜春</a><a href="#" onclick="updateDiv_SC(111)" id="city111">抚州</a><a href="#" onclick="updateDiv_SC(112)" id="city112">上饶</a></p ></div></div>';
        addNodes(document.getElementsByTagName('body')[0], obj, -1);
    }
    $("select_city").style.display = "block";
    middle($("select_city"));
    if (isIE6)
    {
        var oSelect = document.getElementsByTagName('select');
        for (var i = 0, j = oSelect.length; i < j; i++)
        {
            oSelect[i].style.visibility = 'hidden';
        }
    }
    if (!id) id = getCookie('cityid', 1);
    updateDiv_SC(id);
}
function oload_online_zx(townid, strtname)
 {
    var aCity_zx = new Array({
        'uid': 131662,
        'cname': '黎川川之居装饰',
        'headphoto': 'lccj.gif',
        'qq': '77825230',
        'phone': '13607942485'
    },
    {
        'uid': 151285,
        'cname': '南丰华庭装饰',
        'headphoto': 'huating.jpg',
        'qq': '441066828',
        'phone': '13607942485'
    },
    {
        'uid': 128498,
        'cname': '宜春华宜装饰',
        'headphoto': 'huayi.jpg',
        'qq': '178901579',
        'phone': '0795-3585333'
    },
    {
        'uid': 150842,
        'cname': '南城文业装饰设计',
        'headphoto': 'wenya.jpg',
        'qq': '402780519',
        'phone': '0794-7388299'
    });
    var aIndex = {
        959: 0,
        952: 1,
        940: 2,
        954: 3
    };
    var tcode = getCookie('tcode', 1);
    if (aIndex[townid] > -1 && aCity_zx[aIndex[townid]].uid)
    {
        window.onload = function() {
            if (!$('ionline_zx'))
            {
                var obj = document.createElement('div');
                obj.id = 'ionline_zx';
                obj.className = 'ifloat_online_zx';
                obj.innerHTML = '<div><table><tr><td><p id="izhixun_bar" onmouseover="online_zx_oper(\'over\')" class="bar">装修问题免费咨询</p><div id="izhixun_con" class="sidefloat" style="display:none;" onmouseout="online_zx_oper(\'out\')"><p class="tit">在线装修专家</p><p class="c_logo"><a href="http://www.meijialz.com/zs/' + aCity_zx[aIndex[townid]].uid + '/" target="_blank"><img src="http://www.meijialz.com/img/front_end/bg/' + aCity_zx[aIndex[townid]].headphoto + '" /></a></p><div class="info"><p class="nick"><a href="http://www.meijialz.com/zs/' + aCity_zx[aIndex[townid]].uid + '/" target="_blank">' + aCity_zx[aIndex[townid]].cname + '</a></p><p class="demo">业主可以向我免费咨询装修设计上的疑难问题</p></div><p class="lxfs"><span class="s1"><a href="tencent://message/?uin=' + aCity_zx[aIndex[townid]].qq + '&Menu=yes;">' + aCity_zx[aIndex[townid]].qq + '</a></span><span class="s2">' + aCity_zx[aIndex[townid]].phone + '</span></p><p class="site">' + strtname + '装修网 http://' + tcode + '.meijialz.com</p></td></tr></table></div></div>';
                addNodes(document.getElementsByTagName('body')[0], obj, -1);
            }
            $('ionline_zx').style.position = 'absolute';
            $('ionline_zx').style.zIndex = 100;
            $('ionline_zx').style.right = 0;
            var stmnBASE = document.documentElement.clientHeight - parseInt($("ionline_zx").offsetHeight, 10) - 100;
            $('ionline_zx').style.top = document.documentElement.scrollTop + stmnBASE;
            load_online_zx();
        }
    }
}
function load_online_zx()
 {
    var stmnGAP1 = document.documentElement.clientHeight - parseInt($("ionline_zx").offsetHeight, 10) - 100;
    var stmnGAP2 = document.documentElement.clientHeight - parseInt($("ionline_zx").offsetHeight, 10);
    var stmnActivateSpeed = 200;
    var stmnScrollSpeed = 10;
    var stmnTimer;
    var stmnStartPoint,
    stmnEndPoint,
    stmnRefreshTimer;
    stmnStartPoint = parseInt($('ionline_zx').style.top, 10);
    stmnEndPoint = document.documentElement.scrollTop + stmnGAP2;
    if (stmnEndPoint < stmnGAP1)
    {
        stmnEndPoint = stmnGAP1;
        stmnRefreshTimer = stmnActivateSpeed;
    }
    if (stmnStartPoint != stmnEndPoint)
    {
        stmnScrollAmount = Math.ceil(Math.abs(stmnEndPoint - stmnStartPoint) / 15);
        $('ionline_zx').style.top = parseInt($('ionline_zx').style.top, 10) + ((stmnEndPoint < stmnStartPoint) ? -stmnScrollAmount: stmnScrollAmount);
        stmnRefreshTimer = stmnScrollSpeed;
    }
    stmnTimer = setTimeout("load_online_zx();", stmnRefreshTimer);
}
function online_zx_oper(str)
 {
    if (str == 'over')
    {
        $('izhixun_con').style.display = '';
        $('izhixun_bar').style.display = 'none';
    }
    else if (str == 'out')
    {
        if (!$('izhixun_con').contains(event.toElement))
        {
            $('izhixun_con').style.display = 'none';
            $('izhixun_bar').style.display = '';
        }
    }
}
function yuyue_apply(id)
 {
    id = id ? id: 0;
    var oJsLoader = new jsLoader();
    oJsLoader.onsuccess = function() {
        editPhotoCat("/yuyue_apply.html?id=" + id, '免费量房/免费做预算/免费出平面图/立即申请', 620, 520);
    }
    oJsLoader.load('/gb_js/popup.js');
    return false;
}
function Integral2money(num)
 {
    return num;
}

function goTopEx()
 {
    var createDiv = document.createElement("div");
    createDiv.id = "goTopBtn";
    createDiv.style.display = "none";
    createDiv.innerHTML = '<a href="http://www.meijialz.com/about/feedback.php" target="_blank" class="feed"></a> <a href="javascript:" id="goTopBtna" style="width:50px;margin-top:121px;height:50px; float:left;"></a>';
    document.body.appendChild(createDiv);
    var obj = document.getElementById("goTopBtn");
    function getScrollTop() {
        return document.documentElement.scrollTop + document.body.scrollTop;
    }
    function setScrollTop(value) {
        document.body.scrollTop = document.documentElement.scrollTop = value;
    }
    window.onscroll = function() {
        getScrollTop() > 0 ? obj.style.display = "": obj.style.display = "none";
        var top = document.documentElement.scrollTop + document.body.scrollTop;
        if (isIE6) obj.style.top = top + 77 + "px";
    }
    $('goTopBtna').onclick = function() {
        //var goTop=setInterval(scrollMove,2); function scrollMove(){setScrollTop(getScrollTop()/2.1);if(getScrollTop()<1)clearInterval(goTop);}
        document.documentElement.scrollTop = document.body.scrollTop = 0;

    }

}
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;

}

var return_ad = '';

function getad(adid) {
    townid = getCookie("townid", 1);
    preview_com = getQueryString("preview_com");
    //获取url传递的参数
    preview_ad = getQueryString("preview_ad");
    if (preview_com) {
        if (preview_ad == adid) {
            ad_parameter = "adid=" + preview_ad + "&preview=" + preview_com;

        } else {
            ad_parameter = "adid=" + adid + "&preview=" + preview_com;

        }

    } else {
        ad_parameter = "adid=" + adid + "&townid=" + townid;

    }

    host = getCookie('tcode', 1);
    if (window.location.host == "xiaoguotu.meijialz.com") {
        host_url = 'http://xiaoguotu.meijialz.com/';

    } else if (window.location.host == "www.meijialz.com") {
        host_url = 'http://www.meijialz.com/company/';

    } else {
        host_url = 'http://' + host + '.meijialz.com/company/';

    }
    var xmlhttp;
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();

    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //try{
            $("to8to_credits_ad_" + adid).innerHTML = xmlhttp.responseText;
            //}catch(e){}

        }

    }
    xmlhttp.open("GET", host_url + "ad_online.php?callback=ad_callback&" + ad_parameter, true);
    xmlhttp.send();

}

var weChatQrcode = {
    init: function() {

        var _this = this;
        _this.destroy();
        if ( isIE6 ) {
            return false;
        }

        //需要剔除的页面
        if(!_this.validPage()){
            return;
        }
        jq(function() {
            var wechat_barcode = jq('#wechat_barcode'),
                wechat_broadside = jq('#wechat_broadside');
            if ( !wechat_barcode.length || !wechat_broadside.length ) {
                try {
                    _this.createQrcodeTmp();
                } catch (e) {
                    return;
                }
            }

            _this.initPosition();
            _this.bindQrcodeEvents();
        })
    },
    validPage: function(){
        var removeReg = /^http:\/\/xiaoguotu.meijialz.com\/[A-Za-z0-9]+.html$/;
        var url = window.location.href;
        if(removeReg.test(url)){
            return false;
        }else{
            return true;
        }
    },
    destroy: function() {
        try {
            var wechat_barcode = jq('#wechat_barcode'),
                wechat_broadside = jq('#wechat_broadside');
            wechat_barcode.remove();
            wechat_broadside.remove();
        } catch (e) {
            return;
        }
    },
    checkScreen: function() {
        var midCW = jq('.narrow_980').length ? 980 : 1220;

        return (jq('body').width() - midCW) / 2 > 120;
    },
    createQrcodeTmp: function() {
        this.destroy();
        var qrcodeTmp = '<div class="wechat_barcode" id="wechat_barcode">\
                            <div class="we_inwrap">\
                            <a href="http://www.meijialz.com/apps/index.php?act=apps_wechat" rel="nofollow">\
                            <i class="my_wechat_bar"></i></a>\
                            <i class="my_wechat_cancel" id="cancel_wechat_qrcode"></i>\
                        </div>\
                            </div>\
                        <div class="wechat_broadside" id="wechat_broadside">\
                            <i class="my_wechat_broadside"></i>\
                        </div>';
        jq('body').append(qrcodeTmp);
    },
    showQrcode: function () {
        if(!this.checkScreen()) {
            jq(".wechat_barcode").css({"left":"auto","right":"0"}).show();
        }else{
            jq(".wechat_barcode").show();
        }
    },
    bindQrcodeEvents: function() {
        var wechat_barcode = jq('#wechat_barcode'),
            wechat_broadside = jq('#wechat_broadside'),
            closeBtn = jq('#cancel_wechat_qrcode'),
            _this = this,
            _offsetTop_bar = wechat_barcode.offset().top,
            _offsetTop_bro = wechat_broadside.offset().top;

        // IE6 下fix 问题
        if ( isIE6 ) {
            jq(window).bind('scroll', function() {
                var _topWin = jq(window).scrollTop();
                wechat_barcode.css({ top: (_topWin + _offsetTop_bar) + 'px'  });
                wechat_broadside.css({ top: (_topWin + _offsetTop_bro) + 'px'  } );
            })
        }

        closeBtn.bind('click', function () {
            wechat_barcode.hide();
            wechat_broadside.show().stop().animate({
                width: '41px'
            }, 500)
        });
        /*jq("body").on('click','#cancel_wechat_qrcode',function () {
         wechat_barcode.hide();
         wechat_broadside.show().animate({
         width: '41px'
         }, 500)
         });*/
        wechat_broadside.bind('click', function () {
            wechat_broadside.stop().animate({
                width: '0px'
            }, 500, function() {
                wechat_broadside.hide();
            })
            _this.showQrcode();
        });
        /*jq("body").on('click', "#wechat_broadside",function () {
         wechat_broadside.animate({
         width: '0px'
         }, 500, function() {
         wechat_broadside.hide();
         })
         _this.showQrcode();
         });*/
    },
    initPosition: function() {
        var wechat_barcode = jq('#wechat_barcode'),
            wechat_broadside = jq('#wechat_broadside'),
            _this = this;
        if(!this.checkScreen()){
            wechat_barcode.hide();
            wechat_broadside.show().css({'width':'41px'});
        }else{
            _this.showQrcode();
            wechat_broadside.hide().css({'width': '0px'});
        }
    }
}

function stop_code_status(){
    if(!(typeof status_request == 'undefined')) {
        status_request.abort();
    }
    status_num=0;
    window_box_close();
}

function zb_first_pop(weixin_code,yid){
	var successStr ='<div class="mod_fbbox mod_fbbox_wxservice">'+
					'<div class="fbbox_s1">'+
					
						'<div class="s1_hd">恭喜您申请成功!</div>'+
						'<div class="s1_hd_sub">土巴兔客服将于24小时内联系您，请您保持手机畅通。</div>'+
						'<div class="service_img">'+
							'<img src="'+weixin_code+'" alt="" id="weixin_img">'+
							'<div class="mod_pagetip mod_pagetip_s mod_pagetips_noinfo" id="status_success" style="display:none" >'+
							  '<span class="mod_pagetip_ico"><em class="ico_tip_ok_s"></em></span>'+
							  '<div class="mod_pagetip_bd">'+
								  '<div class="mod_pagetip_title">扫描成功</div>'+
							  '</div>'+
							'</div>'+
							'<div class="mod_pagetip mod_pagetip_s" style="display:none" id="status_fail"> <!-- 二维码失效 -->'+
							  '<span class="mod_pagetip_ico"><em class="ico_tip_warn_s"></em></span>'+
							  '<div class="mod_pagetip_bd">'+
								  '<div class="mod_pagetip_title">二维码失效</div>'+
								  '<div class="mod_pagetip_info">请点击<a href="javascript:;" onclick="getnewcode('+yid+')">刷新二维码</a></div>'+
							  '</div>'+
							'</div>'+
						'</div>'+
						
					'</div>'+
				'</div>'
				;
	return successStr; 
}