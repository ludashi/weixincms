document.domain = 'meijialz.com';
var gpm = new GlobalProvincesModule();
jQuery(function() {
    initEvent();
    var resultHref = '',
        mitZXBJFlag = true,
        mitJCXJFlag = true;
    function initEvent() {
        jq('.zxbj-calc-wrap .tab-nav a').bind('click', function() {
            changeTab(this);
        });
        // jq('.zxbj-calc-wrap .tab-nav a').hover(function() {
        //     changeTab(this);
        // });
        jq('[name="square"], [name="chkPhone"], [name="chkYzm"]').placeholder();
        gpm.def_province = ["省/市", ""];
        gpm.def_city1 = ["市/地区", ""];
        gpm.initProvince($('zxbjcalcUser_Shen'));

        jq('.zxbj-calc-wrap .zxbj .step1 .submit-btn').bind('click', function() {
            zxbjFirstStep();
        });

        jq('.zxbj-calc-wrap .jcxj .step1 .submit-btn').bind('click', function() {
            jcxjFirstStep();
        });
        //第2步
        jq('.zxbj-calc-wrap .step2 .submit-btn').bind('click', function() {
            checkPhoneStep2(this);
        });
        //第3步
        jq('.zxbj-calc-wrap .zxbj .step3 .submit-btn').bind('click', function() {
            getResultStatus(this);
        });

        jq('.zxbj-calc-wrap .jcxj .step3 .submit-btn').bind('click', function() {
            resetFormError();
            jq('.zxbj-calc-wrap .jcxj .step').hide().filter('.step1').show();
        });

        jq('[searchtage]').bind('click', function() {
            var tag = jq(this).attr('searchtage');

            clickStream.getCvParams(tag);
        });
        //换一张
        jq('.chg-pic').click(function() {
            jq(this).prev('.passport').trigger('click');
        });

        jq(':radio[name="dangci"]').click(function() {//兼容safari
            jq(this).parents('.element').removeClass('height_auto').find('.erro').remove();
        });
        jq(':radio[name="status"]').click(function() {//兼容safari
            jq(this).parents('.element').removeClass('height_auto').find('.erro').remove();
        });
    }
 
    function getResultStatus(obj) {
        var chkArr = [{
            id: '.zxbj-calc-wrap :radio[name="status"]',
            parentTip: '.zxbj',
            chkType:'radio',
            parCls:'.element',
            className: 'erro',
            labl: 'em',
            lablClass: '',
            info: [{
                reg: [0],
                tip: '请选择 合理 或 偏低 或 偏高'
            }]
        }];

        if(simplifyCheck2(chkArr)) {
            var idx = jq(obj).parents('.zxbj-content').find(':radio:checked').val() || 0;
            jq.ajax({
                type: "POST",
                url: '/yezhu/zxbjnew.php',
                dataType: 'json',
                data:'addDemoAjx=1&backState='+idx,
                success:function(data){
                    //var res = JSON.parse(data);
                    jq('.zxbj-calc-wrap .zxbj .step4 .tips').html('<i></i>'+data.desc2.top);
                    jq('.zxbj-calc-wrap .zxbj .step4 .text-box').html(data.desc2.bottom);
                    jq('.zxbj-calc-wrap .zxbj .step').hide().filter('.step4').show().find('.submit-btn').attr('href', resultHref);
                }
            });
        }
        
    }

    function resetFormError() {
        resetData();
        jq('.bottom-img').css('visibility', 'visible');
        var wrap = jq('.zxbj-calc-wrap');
        wrap.find('.height_auto').removeClass('height_auto');
        wrap.find('.erro').remove();
        wrap.find(':text, select').css('border-color', '#ccc');
    }

    function resetData() {
        mitZXBJFlag = true;
        mitJCXJFlag = true;
        var wrap = jq('.zxbj-calc-wrap');

        wrap.find(':text').val('').trigger('blur');
        wrap.find('.zxbj select, .jcxj select[name="fang"], .jcxj select[name="wei"]').each(function() {
            jq(this)[0].selectedIndex = 0;
        });
        wrap.find('.jcxj select[name="ting"]')[0].selectedIndex = 1;

        wrap.find('.zxbj :radio').each(function() {
            jq(this)[0].checked = false;
        });
        wrap.find('.jcxj :radio[name="brand"]:eq(0)')[0].checked = true;
    }
    
    function changeTab(obj) {
        resetFormError();
        var idx = jq(obj).index(),
            obj1 = jq('.zxbj-calc-wrap .zxbj'),
            obj2 = jq('.zxbj-calc-wrap .jcxj');
        jq(obj).addClass('on').siblings().removeClass('on');

        jq('.zxbj-calc-wrap .zxbj, .zxbj-calc-wrap .jcxj').hide().find('.step').hide();
        if (0 === idx) {
            obj1.show().find('.step1').show();
        } else {    
            obj2.show().find('.step1').show();
        }
    }
    //装修报价第1步检测
    function checkZXBJFirst() {
        var chkArr = [{
            id: jq('.zxbj-calc-wrap .zxbj :text[name="square"]')[0],
            parentTip: '.zxbj',
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
        }, {
            id: jq('.zxbj-calc-wrap .zxbj select[name="User_Shen"]')[0],
            parentTip: '.zxbj',
            className: 'erro',
            labl: 'em',
            lablClass: '',
            info: [{
                reg: [0],
                tip: '请选择所在地'
            }]
        },{
            id: jq('.zxbj-calc-wrap .zxbj select[name="User_City"]')[0],
            parentTip: '.zxbj',
            className: 'erro',
            labl: 'em',
            lablClass: '',
            info: [{
                reg: [0],
                tip: '请选择所在地'
            }]
        },{
            id: '.zxbj-calc-wrap :input[name="dangci"]',
            parentTip: '.zxbj',
            chkType:'radio',
            parCls:'.element',
            className: 'erro',
            labl: 'em',
            lablClass: '',
            info: [{
                reg: [0],
                tip: '请选择装修档次'
            }]
        }];

        return simplifyCheck2(chkArr);
    }

    function getZXBJdata() {
        var wrap = jq('.zxbj-calc-wrap .zxbj'),
            area = wrap.find(':text[name="square"]'),
            shen = wrap.find('select[name="User_Shen"]'),
            city = wrap.find('select[name="User_City"]'),
            dangci = wrap.find(':input[name="dangci"]:checked'),
            ptag = wrap.find(':hidden[name="ptag"]');

        return 'square='+area.val()+'&User_Shen='+shen.val()+'&User_City='+city.val() + '&dangci='+ dangci.val()+'&ptag='+ptag.val();
    }

    function getJCXJdata() {
        var wrap = jq('.zxbj-calc-wrap .jcxj'),
            area = wrap.find(':text[name="square"]'),
            fang = wrap.find('select[name="fang"]'),
            ting = wrap.find('select[name="ting"]'),
            wei = wrap.find('select[name="wei"]'),
            brand = wrap.find(':input[name="brand"]:checked'),
            ptag = wrap.find(':hidden[name="ptag"]');

        return 'square='+area.val()+'&fang='+fang.val()+'&ting='+ting.val() + '&wei='+ wei.val()+'&brand='+brand.val()+'&ptag='+ptag.val();
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
                        jq('#zxbj_area_box').html(lioption);
                        jq(".zxbj-calc-wrap .zxbj .passport").trigger('click');
                        jq('.zxbj-calc-wrap .zxbj .step').hide().filter('.step2').show();
                    }
                }
            });
        }
    }
    // 建材询价第1步检测
    function checkJCXJFirst() {
        var chkArr = [{
            id: jq('.zxbj-calc-wrap .jcxj :text[name="square"]')[0],
            parentTip: '.jcxj',
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
        }];

        return simplifyCheck2(chkArr);
    }
    // 建材询价第1步提交
    function jcxjFirstStep() {
        if(checkJCXJFirst()) {
            jq(".zxbj-calc-wrap .jcxj .passport").trigger('click');
            jq('.zxbj-calc-wrap .jcxj .step').hide().filter('.step2').show();
            // jq.ajax({
            //     type: "POST",
            //     url: '/yezhu/zxbjnew.php',
            //     dataType: 'json',
            //     data:'areaAjax=1&widget=1&'+getJCXJdata(),
            //     success:function(data){
            //         if(data['success']==1) {
            //             jq('.zxbj-calc-wrap .jcxj .step').hide().filter('.step2').show();
            //         }
            //     }
            // });
        }
    }

    function checkPhone(obj) {
        var wrapStep2 = jq(obj).parents('.zxbj-content'),
            phone = wrapStep2.find(':text[name="chkPhone"]'),
            yzm = wrapStep2.find(':text[name="chkYzm"]');

        var chkArr = [{
            id: phone[0],
            parentTip: wrapStep2[0],
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
            parentTip: wrapStep2[0],
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
        var area = jq('.zxbj-calc-wrap .zxbj :text[name="square"]'),
            shen = jq('.zxbj-calc-wrap .zxbj select[name="User_Shen"]'),
            city = jq('.zxbj-calc-wrap .zxbj select[name="User_City"]'),
            dangci = jq('.zxbj-calc-wrap :input[name="dangci"]:checked');

        da += '&secStepWidgetAjax=1&type=side&'+getZXBJdata()+'&mobile='+ phone.val();
        jq.ajax({
            type: "post",
            url: '/yezhu/zxbjnew.php',
            dataType: 'text',
            data:da,
            success: function(res) {
             var res = JSON.parse(res),
                wrap = jq('.zxbj-calc-wrap .zxbj .step3');
             if(res.status == 1) {//发送成功
                 var price = wrap.find('.price-box').find('span');
                 var href = 'http://www.meijialz.com/yezhu/zxbj.php?windbox=boxhref&square='+area.val()+'&User_Shen='+encodeURIComponent(shen.val())+'&User_City='+encodeURIComponent(city.val()) + '&dangci='+ dangci.val()+'&ptag='+jq('.zxbj-calc-wrap .zxbj').find(':hidden[name="ptag"]').val();
                 //wrap.find('a.submit-btn').attr('href', href);
                 resultHref = href;
                 price.eq(0).html(res.banbaoPrice);
                 price.eq(1).html(res.quanbaoPrice);
                 jq('.bottom-img').css('visibility', 'hidden');
                 jq('.zxbj-calc-wrap .zxbj .step3 .tips').html('<i></i>'+res.desc1);
                 jq('.zxbj-calc-wrap .zxbj .step').hide().filter('.step3').show();
             }
            }
        });
    }

    function submitJCXJData(da, phone) {
        da += '&secStepWidgetAjax=1&'+getJCXJdata()+'&mobile='+ phone.val();
        jq.ajax({
            type: "post",
            url: '/yezhu/zxbjnew.php',
            dataType: 'text',
            data: da,
            success: function() {
                jq('.zxbj-calc-wrap .jcxj .step').hide().filter('.step3').show();
            }
        });
    }
    //第2步
    function checkPhoneStep2(obj) {
        var wrapStep2 = jq(obj).parents('.zxbj-content'),
            phone = wrapStep2.find(':text[name="chkPhone"]'),
            yzm = wrapStep2.find(':text[name="chkYzm"]'),
            rand_num = yzm.val(),
            zxbjFlag = jq('.zxbj-calc-wrap .zxbj').is(':visible');

        if((zxbjFlag && !mitZXBJFlag) || (!zxbjFlag && !mitJCXJFlag)) {
            return false;
        }

        if(checkPhone(obj)) {
            zxbjFlag && (mitZXBJFlag = false);
            !zxbjFlag && (mitJCXJFlag = false);
            if(rand_num == '') {
                 yzm.focus();
            } else {
                var  da= jq('#zxbj_area_form').serialize();
                var  refurl = window.parent.location.href;
                da += '&refurl='+refurl;
                jq.ajax({
                    type: "GET",
                    url: "/my/get_moblie_yz.php",
                    dataType: 'json',
                    data: {ajax:1, rand_num: rand_num},
                    success:function(data){
						if(data == 1) {//验证码正确
                            if (zxbjFlag) { //装修报价
                                submitZXBJData(da, phone);
                            } else {// 建材询价
                                submitJCXJData(da, phone);
                            }
                        }else{
                            mitZXBJFlag = true;
                            mitJCXJFlag = true;
                            alert('验证码错误');
                            yzm.focus();
                        }
                    }
                });
            }
        }
    }
});