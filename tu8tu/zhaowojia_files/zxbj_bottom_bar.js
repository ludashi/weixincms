// 浏览器判断  
function checkBrowser(){
   var u = window.navigator.userAgent.toLocaleLowerCase(),
    msie = /(msie) ([\d.]+)/,
    chrome = /(chrome)\/([\d.]+)/,
    firefox = /(firefox)\/([\d.]+)/,
    safari = /(safari)\/([\d.]+)/,
    opera = /(opera)\/([\d.]+)/,
    ie11 = /(trident)\/([\d.]+)/,
    b = u.match(msie)||u.match(chrome)||u.match(firefox)||u.match(safari)||u.match(opera)||u.match(ie11);
    return {name: b[1], version: parseInt(b[2])};

};
// 验证码
jq(".img_yzm_a").click(function(event) {

    var idCode=jq("#passCode");
    var id = idCode || 'passport',

            str = window.location.href.toString().split('.')[0].replace('http://', "") || 'www',
            A = new Date().getTime();
    if ($(id)) {
        $(id).attr('src','http://'+str+'.meijialz.com/passport.php?t=' + A);
    }

});


function newverifypicMy(id) {
    var id = id || 'passport',
            str = window.location.href.toString().split('.')[0].replace('http://', "") || 'www',
            A = new Date().getTime();
    if ($(id)) {
        $(id).src = 'http://'+str+'.meijialz.com/passport.php?t=' + A;
    };
};
var gpm = new GlobalProvincesModule();
jQuery(function() {
    var totleWrap = jq('.zxbj-apply-bottom-bar'),
        wrapCenter = totleWrap.find('.bottom_sjybj_center'),
        link = jq('.zxbj-apply-bottom-bar-link'),
        closeBtn = totleWrap.find('.icn_tip_close'),
        bwObj = checkBrowser(),
        ie6Flag = false,
        mitZXBJFlag = true,
        //flag = true,
        flag = getCookie('to8to_bottomBarHidden'),
        flag1220 = 1220;//显示小的
    var resultHref = '';    
    initEvent();
    initPeopleNum();

    function initPeopleNum() {
    //该数据的伪造规则 (月*12 + 日*24 + 时*180 + 分*3 + 秒/20)
        var date = new Date(),
            num = (date.getMonth() + 1)*12 + date.getDate()*24 + date.getHours()*180 + date.getMinutes()*3 + date.getSeconds()/20;
        totleWrap.find('.apply_mn').html(Math.ceil(num));    
    }
    function setVisible() {
        if(jq(window).scrollTop() > 273) {
            if(!getCookie('to8to_bottomBarHidden')) {
                totleWrap.css('left', 0);
                link.css('left', '-156px');
                flag = false;
                wrapCenter.show();
            } else {
                setSmallLeft()
                totleWrap.css('left', '-100%');
                flag = true;
                wrapCenter.hide();
            }
        } else {
            link.css('left', '-156px');
            totleWrap.css('left', '-100%');
            wrapCenter.hide();
        }
    }

    function setSmallLeft() {
        var wW = (jq(window).width() - flag1220)/2;

        if(wW < 125) {
            link.css('left', '-125px')
        } else {
            link.css('left', 0);
        }
    }
    function initEvent() {
        if(bwObj.name == 'safari') {
            totleWrap.addClass('sarifi-sepesil');
        } else if(bwObj.name == 'msie' && bwObj.version == 6) {
            ie6Flag = true;
        }
        if(jq('body:eq(0)').hasClass('narrow_980')) {
            flag1220 = 980;
        }
        setVisible();
        jq(window).bind('scroll resize', function() {
           if(jq(window).scrollTop() > 273) {
                if(flag) {
                    setSmallLeft()
                    totleWrap.css('left', '-100%');
                    wrapCenter.hide();
                } else {
                    totleWrap.css('left', 0);
                    link.css('left', '-156px');
                    wrapCenter.show();
                }
            } else {
                link.css('left', '-156px');
                totleWrap.css('left', '-100%');
                wrapCenter.hide();
            }
        });
    
        totleWrap.find('[name="square"], [name="chkPhone"], [name="chkYzm"]').placeholder();
        gpm.def_province = ["省/市", ""];
        gpm.def_city1 = ["市/地区", ""];
        gpm.initProvince($('zxbjBottomUser_Shen'));

        //第1步
        totleWrap.find('.step1 .btn_ffa00b').bind('click', function() {
            zxbjFirstStep();
        });

        //第2步
        totleWrap.find('.step2 .btn_ffa00b').bind('click', function() {
            checkPhoneStep2();
        });
        //第3步
        totleWrap.find('.step3 .btn_detail_ffa00b').bind('click', function() {
            getResultStatus(this);
        });

        link.bind('click', function() {
            link.animate({'left': '-156px'}, 200, function() {
                totleWrap.animate({'left': '0'}, 800);
                wrapCenter.show();
                flag = false;
            });
        });

        closeBtn.bind('click', function() {
            setCookie('bottomBarHidden', true, 24*60*60*1000, true);
            totleWrap.animate({'left': '-100%'}, 800, function(){
                var wW = (jq(window).width() - flag1220)/2;

                if(wW < 125) {
                    link.animate({'left': '-125px'}, 200);
                } else {
                    link.animate({'left': 0}, 200);
                }
                wrapCenter.hide();
                flag = true;
            });

        });

        totleWrap.find(':radio[name="status"]').click(function() {//兼容safari
            jq(this).parents('.bottom_sjybj_content').removeClass('height_auto').find('.erro').remove();
        });
        var ptag = totleWrap.find(':hidden[name="ptag"]').val();
        jq('[searchtage]').bind('click', function() {
            var tag = jq(this).attr('searchtage');
            zxbjClickCream(ptag,tag);
        });
    }

    function getResultStatus(obj) {
        var chkArr = [{
            id: totleWrap.find(':radio[name="status"]'),
            parentTip: '.zxbj-apply-bottom-bar',
            parCls:'.bottom_sjybj_content',
            className: 'erro',
            labl: 'em',
            lablClass: '',
            chkType:'radio',
            info: [{
                reg: [0],
                tip: '请选择 合理 或 偏低 或 偏高'
            }]
        }];

        if(simplifyCheck2(chkArr)) {
            var idx = jq(obj).parents('.bottom_sjybj_content').find(':radio:checked').val() || 0;
            jq.ajax({
                type: "POST",
                url: '/yezhu/zxbjnew.php',
                dataType: 'json',
                data:'addDemoAjx=1&backState='+idx,
                success:function(data){
                    var step4Obj = totleWrap.find('.step4');
                    totleWrap.find('.step4 .p2:eq(0)').html(data.desc2.top);
                    totleWrap.find('.step4 .p2:eq(1)').html(data.desc2.bottom);
                    step4Obj.find('.btn_detail_fff').attr('href', resultHref);
                    totleWrap.find('.step3').animate({'z-index': 9996},100, function() {
                        ie6Flag && totleWrap.find('.step3').hide();
                        step4Obj.css({'opacity': 0, 'z-index': 9998}).show();
                        step4Obj.animate({'opacity': 1}, 200);
                    });  
                }
            });
        }
        
    }
    //装修报价第1步检测
    function checkZXBJFirst() {
        var chkArr = [{
            id: totleWrap.find(':text[name="square"]')[0],
            parentTip: '.zxbj-apply-bottom-bar',
            parCls:'.bottom_sjybj_content',
            className: 'erro',
            labl: 'em',
            lablClass: '',
            info: [{
                reg:[0],
                tip:'请输入建筑面积'
            },{
                reg:[/^\d+(\.[0-9]?[1-9]{1})?$/],
                tip:'建筑面积不能超过两位小数'
            },{
                reg:[/^[0-4]{1}(\.[0-9]?[1-9]{1})?$/],
                tip:'建筑面积必须大于5', negate:true
            },{
                reg:[/^[1-9]{1}[0-9]{0,2}(\.[0-9]?[1-9]{1})?$|^1000$/],
                tip: '建筑面积必须是1000以内'
            }]
        },{
            id: totleWrap.find('select[name="dangci"]')[0],
            parentTip: '.zxbj-apply-bottom-bar',
            parCls:'.bottom_sjybj_content',
            className: 'erro',
            labl: 'em',
            lablClass: '',
            info: [{
                reg: [0],
                tip: '请选择装修档次'
            }]
        }, {
            id: totleWrap.find('select[name="User_Shen_bottom"]')[0],
            parentTip: '.zxbj-apply-bottom-bar',
            parCls:'.bottom_sjybj_content',
            className: 'erro',
            labl: 'em',
            lablClass: '',
            info: [{
                reg: [0],
                tip: '请选择所在地'
            }]
        },{
            id: totleWrap.find('select[name="User_City_bottom"]')[0],
            parentTip: '.zxbj-apply-bottom-bar',
            parCls:'.bottom_sjybj_content',
            className: 'erro',
            labl: 'em',
            lablClass: '',
            info: [{
                reg: [0],
                tip: '请选择所在地'
            }]
        }];

        return simplifyCheck2(chkArr);
    }

    function getZXBJdata() {
        var area = totleWrap.find(':text[name="square"]'),
                shen = totleWrap.find('select[name="User_Shen_bottom"]'),
                city = totleWrap.find('select[name="User_City_bottom"]'),
                dangci = totleWrap.find('select[name="dangci"]'),
                ptag = totleWrap.find(':hidden[name="ptag"]');

        return 'square='+area.val()+'&User_Shen='+shen.val()+'&User_City='+city.val() + '&dangci='+ dangci.val()+'&ptag='+ptag.val();
    }

    //装修报价第1步提交
    function zxbjFirstStep() {
        if(checkZXBJFirst()) {
            jq.ajax({
                type: "POST",
                url: '/yezhu/zxbjnew.php',
                dataType: 'json',
                data:'areaAjax=1&widget=1&'+getZXBJdata(),
                success:function(data){
                    if(data['success']==1) {
                        var lioption='';
                        for(var i=0;i<data['res'].length;i++) {
                            lioption+='<li><em>'+data['res'][i]['name']+'</em><input name="'+data['res'][i]['key']+'" type="text" value="'+data['res'][i]['num']+'"></li>';
                        }
                        totleWrap.find('ul[name="zxbj_area_box"]').html(lioption);
                        totleWrap.find('.passport').trigger('click');

                        totleWrap.find('.step1').animate({'z-index': 9996},100, function() {
                            ie6Flag && totleWrap.find('.step1').hide();
                            totleWrap.find('.step2').css({'opacity': 0, 'z-index': 9998}).show();
                            totleWrap.find('.step2').animate({'opacity': 1}, 200);
                        });       
                    }
                }
            });
        }
    }

    function checkPhone() {
        var phone = totleWrap.find(':text[name="chkPhone"]'),
                yzm = totleWrap.find(':text[name="chkYzm"]');

        var chkArr = [{
            id: phone[0],
            parentTip: '.zxbj-apply-bottom-bar',
            parCls:'.bottom_sjybj_content',
            className: 'erro',
            labl: 'em',
            lablClass: '',
            info: [{
                reg: [0],
                tip: '请输入手机号码'
            },{
                reg: [/^1{1}[34578]{1}\d{9}$/],
                tip: '请输入正确的手机号码'
            }]
        }, {
            id: yzm[0],
            parentTip: '.zxbj-apply-bottom-bar',
            parCls:'.bottom_sjybj_content',
            className: 'erro',
            labl: 'em',
            lablClass: '',
            info: [{
                reg: [0],
                tip: '请输入验证码'
            }]
        }];

        return simplifyCheck2(chkArr);
    }

    function submitZXBJData(da, phone) {
        var area = totleWrap.find(':text[name="square"]'),
                shen = totleWrap.find('select[name="User_Shen_bottom"]'),
                city = totleWrap.find('select[name="User_City_bottom"]'),
                dangci = totleWrap.find('select[name="dangci"]');

        da += '&secStepWidgetAjax=1&type=bottom&'+getZXBJdata()+'&mobile='+ phone.val();
        jq.ajax({
            type: "post",
            url: '/yezhu/zxbjnew.php',
            dataType: 'text',
            data:da,
            success: function(res) {
                mitZXBJFlag = true;
                var res = JSON.parse(res),
                        wrap = jq('.zxbj-calc-wrap .zxbj .step3');
                if(res.status == 1) {//发送成功
                    var price = totleWrap.find('.con_p1');
                    var href = 'http://www.meijialz.com/yezhu/zxbj.php?windbox=boxhref&square='+area.val()+'&User_Shen='+encodeURIComponent(shen.val())+'&User_City='+encodeURIComponent(city.val()) + '&dangci='+ dangci.val()+'&ptag='+totleWrap.find(':hidden[name="ptag"]').val();
                    //totleWrap.find('.step3 .btn_detail').attr('href', href);
                    resultHref = href;
                    price.eq(0).find('span').html(res.banbaoPrice);
                    price.eq(1).find('span').html(res.quanbaoPrice);
                    totleWrap.find('.step3 .p1:eq(0)').html(res.desc1);
                    totleWrap.find('.step2').animate({'z-index': 9996},100, function() {
                        totleWrap.find('.step3').css({'opacity': 0, 'z-index': 9998}).show();
                        totleWrap.find('.step3').animate({'opacity': 1}, 200);
                    });
                }
            }
        });
    }

    //第2步
    function checkPhoneStep2() {
        var phone = totleWrap.find(':text[name="chkPhone"]'),
                yzm = totleWrap.find(':text[name="chkYzm"]');

        if(!mitZXBJFlag) {
            return false;
        }
        if(checkPhone()) {
            var rand_num = yzm.val();
            mitZXBJFlag = false;
            if(rand_num == '') {
                yzm.focus();
            } else {
                var  da =totleWrap.find('form[name="zxbj_area_form"]').serialize();
                jq.ajax({
                    type: "GET",
                    url: "/my/get_moblie_yz.php",
                    dataType: 'json',
                    data: {ajax:1, rand_num: rand_num},
                    success:function(data){
						if(data == 1) {//验证码正确
                            submitZXBJData(da, phone);
                        }else{
                            mitZXBJFlag = true;
                            alert('验证码错误');
                            yzm.focus();
                        }
                    }
                });
            }
        }
    }
    //** 点击流
    function zxbjClickCream(ptag,tag)
    {
        var zxbjCfgObj={"1_1_1_99":{"first":"1_1_1_98","second":"1_1_1_99","three":"1_1_1_97"},
        "1_2_3_99":{"first":"1_2_3_98","second":"1_2_3_99","three":"1_2_3_97"},"1_2_1_99":{"first":"1_2_1_98","second":"1_2_1_99","three":"1_2_1_97"},"1_2_5_99":{"first":"1_2_5_98","second":"1_2_5_99","three":"1_2_5_97"},"1_2_6_99":{"first":"1_2_6_98","second":"1_2_6_99","three":"1_2_6_97"},"1_3_5_100":{"first":"1_3_5_96","second":"1_3_5_100","three":"1_3_5_95"},"1_3_5_101":{"first":"1_3_5_94","second":"1_3_5_101","three":"1_3_5_93"},"1_3_5_102":{"first":"1_3_5_92","second":"1_3_5_102","three":"1_3_5_91"},"1_3_4_99":{"first":"1_3_4_90","second":"1_3_4_99","three":"1_3_4_89"},"1_3_6_99":{"first":"1_3_6_98","second":"1_3_6_99","three":"1_3_6_97"},"1_8_6_1":{"first":"1_3_5_92","second":"1_8_6_1","three":"1_3_5_91"},"1_8_5_1":{"first":"1_3_5_92","second":"1_8_5_1","three":"1_3_5_91"}};
        
        var subPtag='';
        for(var key in zxbjCfgObj)
        {
            if(key==ptag)
            {
                subPtag=zxbjCfgObj[ptag][tag];
                break;
            }
        }
        if(typeof clickStream=='object' && subPtag)
        {
            clickStream.getCvParams(subPtag);
        }
    }
});