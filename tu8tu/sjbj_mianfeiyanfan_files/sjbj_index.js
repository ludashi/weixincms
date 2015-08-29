//免费验房

(function(jq,window) {
	var freeCheck = {
		init:function() {
			freeCheckInit();
			bindBodyClick();	
		}	
	};

	jq.fn.focusAndBlur = function(oldClass,newClass) {
		jq(this).val("").click(function() {
			jq(this).addClass(newClass).removeClass(oldClass);
		}).bind("keydown input",function() {
			jq(this).next("span").hide();	
		}).blur(function() {
			if(jq(this).val() == "") {
				jq(this).addClass(oldClass).next("span").show();	
			}
			jq(this).removeClass(newClass);
		});			
	}
	
	function freeCheckInit() {
		jq(".login_select > input[type=text]").each(function() {
			jq(this).focusAndBlur("grey","focus");	
		});
		jq("#userTime").click(function(e) {
            var event = window.event || e;
			showcalendar(event, this, true,"","","timeTipSpan",true);	
		}).bind("keydown",function() {
			return;	
		}).next("span").click(function(e) {
			var event = window.event || e;
			showcalendar(event, document.getElementById("userTime"), true ,"","","timeTipSpan",true);	
		});
		jq(".login_box a.btn_free").click(function() {
			bindValidate(this);	
		});
		jq(".slide_box>ul>li").hover(function() {
			jq(this).find("a.large").show();	
		},function() {
			jq(this).find("a.large").hide();	
		});
		jq(".slide_box > ul").slideTxq({margin:40,num:4});
		scrollTopFn(10,"#scrolldiv1 > ul > li");
	}	
	function bindValidate(obj) {
		var a = jq('#chenghu').checkForm({className:"wrong_text",content:["称呼不可为空","称呼最多输入10个汉字（20个英文字符）"],type:[1,2], reg:{len:20},checkFormType:obj,displayNum:true}),
			b = jq('#myphone1').checkForm({className:"wrong_text",content:["手机号码不可以为空","请填写正确的手机号码"],type:[1,2], reg:0,checkFormType:obj,displayNum:true}),
			d = jq('#User_Shen').checkForm({className:"wrong_text",content:["请选择您的所在地"],type:[1], reg:1,checkFormType:obj,checkType:"select",displayNum:true}),
			e = jq('#User_City').checkForm({className:"wrong_text",content:["请选择您的所在地"],type:[1], reg:1,checkFormType:obj,checkType:"select",displayNum:true}),
			c = jq('#address').checkForm({className:"wrong_text",content:["小区名不可以为空"],type:[1], reg:0,checkFormType:obj,displayNum:true}),
			f = jq('#userTime').checkForm({className:"wrong_text",content:["申请验房时间不可为空"],type:[1], reg:1,checkFormType:obj,displayNum:true});

		getFirstErrorFocus(obj);
	}
	
	function bindBodyClick() {
		var obj = checkBrowser();
		if(obj.name = "msie") {
			if(obj.version > 6) {
				jq("body").bind("click",function() {
					jq("#calendar,#calendar_year,#calendar_month").hide();
				});	
			} else {
				jq("body").bind("click",function() {
					jq("#calendariframe,#calendariframe_year,#calendariframe_month").hide();
				});	
			}
				
		}	
	}
	window.freeCheck = freeCheck;
})(jQuery,window);
//免费设计
(function(jq,window) {
	var freeDesign = {
		init:function() {
			freeDesignInit();
		}	
	};
	
	jq.fn.focusAndBlur = function(oldClass,newClass) {
		jq(this).val("").click(function() {
			jq(this).addClass(newClass).removeClass(oldClass);
		}).bind("keydown input",function() {
			jq(this).next("span").hide();	
		}).blur(function() {
			if(jq(this).val() == "") {
				jq(this).addClass(oldClass).next("span").show();	
			}
			jq(this).removeClass(newClass);
		});			
	}
	
	function freeDesignInit() {
		jq(".login_select > input[type=text]").each(function() {
			jq(this).focusAndBlur("grey","focus");	
		});
		jq(".login_select > textarea").each(function() {
			jq(this).focusAndBlur("grey","focus");	
		});
		jq(".login_box a.btn_free#btn_free1").click(function() {
			bindValidate1(this);	
		});
		jq('.design_zb tr').hover(
			function(){
			  jq(this).addClass("tr_hover");
			},
			function(){
			  jq(this).removeClass("tr_hover");
			}
		 );
		scrollTopFn(10,"#scrolldiv1 > table > tbody > tr");
		jq(".slide_box>ul>li").hover(function() {
			jq(this).find("a.large").show();	
		},function() {
			jq(this).find("a.large").hide();	
		});
		jq(".slide_box > ul").slideTxq({margin:40,num:4});
	}	
	function bindValidate1(obj) {
		var a = jq('#chenghu').checkForm({className:"wrong_text",content:["称呼不可为空","称呼最多输入10个汉字（20个英文字符）"],type:[1,2], reg:{len:20},checkFormType:obj,displayNum:true}),
			b = jq('#myphone1').checkForm({className:"wrong_text",content:["手机号码不可以为空","请填写正确的手机号码"],type:[1,2], reg:0,checkFormType:obj,displayNum:true}),
			c = jq('#demo').checkForm({className:"wrong_text",content:["","称呼最多输入70个汉字（140个英文字符）"],type:[2], reg:{len:140},checkFormType:obj,displayNum:true}),
			d = jq('#User_Shen').checkForm({className:"wrong_text",content:["请选择您的所在地"],type:[1], reg:1,checkFormType:obj,checkType:"select",displayNum:true}),
			e = jq('#User_City').checkForm({className:"wrong_text",content:["请选择您的所在地"],type:[1], reg:1,checkFormType:obj,checkType:"select",displayNum:true});

		getFirstErrorFocus(obj);
	}
	window.freeDesign = freeDesign;
})(jQuery,window);
//装修保
(function(jq,window) {
	var zhuangXiuBao = {
		init:function() {
			zhuangXiuBaoInit();
		}	
	};
	
	jq.fn.focusAndBlur = function(oldClass,newClass) {
		jq(this).next("span").click(function() {
			jq(this).prev().focus();	
		});
		jq(this).val("").click(function() {
			jq(this).addClass(newClass).removeClass(oldClass);
		}).bind("keydown input",function() {
			jq(this).next("span").hide();	
		}).blur(function() {
			if(jq(this).val() == "") {
				jq(this).addClass(oldClass).next("span").show();	
			}
			jq(this).removeClass(newClass);
		});			
	}
	
	function zhuangXiuBaoInit() {
		jq(".login_select > input[type=text]").each(function() {
			jq(this).focusAndBlur("grey","focus");	
		});
		jq(".login_box a.btn_free").click(function() {
			bindValidate(this);	
		});
		jq('.design_zb tr').hover(
			function(){
			  jq(this).addClass("tr_hover");
			},
			function(){
			  jq(this).removeClass("tr_hover");
			}
		 );
		jq(".slide_box>ul>li").hover(function() {
			jq(this).find("a.large").show();	
		},function() {
			jq(this).find("a.large").hide();	
		});
		jq(".supervisor_box > ul").slideTxq();
		jq(".slide_box > ul").slideTxq({margin:40,num:4});
		
	}	
	function bindValidate(obj) {
		var a = jq('#chenghu').checkForm({className:"wrong_text",content:["称呼不可为空","称呼最多输入10个汉字（20个英文字符）"],type:[1,2], reg:{len:20},checkFormType:obj,displayNum:true}),
			b = jq('#myphone1').checkForm({className:"wrong_text",content:["手机号码不可以为空","请填写正确的手机号码"],type:[1,2], reg:0,checkFormType:obj,displayNum:true}),
			d = jq('#User_Shen').checkForm({className:"wrong_text",content:["请选择您的所在地"],type:[1], reg:1,checkFormType:obj,checkType:"select",displayNum:true}),
			e = jq('#User_City').checkForm({className:"wrong_text",content:["请选择您的所在地"],type:[1], reg:1,checkFormType:obj,checkType:"select",displayNum:true});

		getFirstErrorFocus(obj);
	}
	window.zhuangXiuBao = zhuangXiuBao;
})(jQuery,window);

function getFirstErrorFocus(obj) {
	var errLen = jq(obj).parents("form").find(".wrong_text").length;

	if(errLen == 0) {
		setTimeout(function() {
			jq(obj).parents("form").submit();	
		},0);
	}
}

//装后保
(function(jq,window) {
	var zhuanghouBao = {
		init:function() {
			zhuanghouBaoInit();
		}	
	};
	
	jq.fn.focusAndBlur = function(oldClass,newClass) {
		jq(this).next("span").click(function() {
			jq(this).prev().focus();	
		});
		jq(this).val("").click(function() {
			jq(this).addClass(newClass).removeClass(oldClass);
		}).bind("keydown input",function() {
			jq(this).next("span").hide();	
		}).blur(function() {
			if(jq(this).val() == "") {
				jq(this).addClass(oldClass).next("span").show();	
			}
			jq(this).removeClass(newClass);
		});			
	}
	
	function zhuanghouBaoInit() {
		jq(".login_select > input[type=text]").each(function() {
			jq(this).focusAndBlur("grey","focus");	
		});
		jq(".login_box a.btn_free").click(function() {
			var res = bindValidate(this);
			if(res){
				jq("#free_zhaobiao").submit();
			}	
		});
		jq('.design_zb tr').hover(
			function(){
			  jq(this).addClass("tr_hover");
			},
			function(){
			  jq(this).removeClass("tr_hover");
			}
		 );
		jq(".slide_box>ul>li").hover(function() {
			jq(this).find("a.large").show();	
		},function() {
			jq(this).find("a.large").hide();	
		});
		jq(".supervisor_box > ul").slideTxq();
		jq(".slide_box > ul").slideTxq({margin:40,num:4});

		//申请装修保
		jq("div.bottom_nav").on("click","a",function(){
			var str = '<form id="zhbApply" class="apply" method="post" action="javascript:freeZhaoBiaoForZhb(8,\'zhbApply\')">'+
						'<input name="ptag" type="hidden" value="1_4_6_2" />'+
						'<div class="free_apply clear zxbapply">'+
				          '<div class="apply_line">'+
				              '<label for="" class="app_lbl">您的称呼</label>'+
				              '<div class="app_ele">'+
				                  '<input name="chenghu" type="text" class="ap_text chenghu">'+
				              '</div>'+
				          '</div>'+
				          '<div class="apply_line">'+
				              '<label for="" class="app_lbl">手机号码</label>'+
				              '<div class="app_ele">'+
				                  '<input name="phone" type="text" class="ap_text myphone">'+
				              '</div>'+
				          '</div>'+
				          '<div class="apply_line">'+
				              '<label for="" class="app_lbl">申请城市</label>'+
				              '<div class="app_ele  provincediv">'+
				                  '<div class="clear">'+
				                      '<select class="col_l User_Shen" id="User_Shen1" name="User_Shen" onchange="changeProvince('+"User_Shen1"+','+"User_City1"+','+"User_Town1"+');">'+
				                          '<option value="">省/市</option>'+
				                      '</select>'+
				                      '<select class="col_l User_City"  id="User_City1" name="User_City" onchange="changeTown('+"User_Shen1"+','+"User_City1"+','+"User_Town1"+');">'+
				                          '<option value="">市/地区</option>'+
				                      '</select>'+
				                       '<div style="display:none">'+
				                       		'<select class="langSelect" id="User_Town1" name="User_Town">'+
				                       			'<option>县/区</option>'+
				                       		'</select>'+
				                       	'</div>'+
				                  '</div>'+
				             ' </div>'+
				          '</div>'+
				          '<div class="apply_line apply_line_btn">'+
				              '<div class="app_ele">'+
				                  '<input type="submit" submit_type="ajax_design" value="免费申请" class="apply_btn">'+
				                  '<div class="app_tip"><i class="ico_info_s"></i>为了你的利益及我们的口碑，你的隐私将被严格保密。</div>'+
				              '</div>'+
				          '</div>'+
				      '</div>'+
				    '</form>';  
			jq('.window_box').windowBox({
				width:480,
				title:"申请装修保",
				littleTitle:'免费享受八“心”级装修保障服务',
				wbcStr:str
			});	

		    gpm.initProvince($('User_Shen1'));
		    $('User_Shen1').value="广东";  
		    gpm.initCity1($('User_City1'), gpm.getSelValue($('User_Shen1')));
		    $('User_City1').value="深圳";
		});
		
		//提交装修保申请
		jq('body').on('click','input.apply_btn',function(){
			return bindValidate(jq(this));
		});
	}	
	function bindValidate(obj) {
		var container = jq(obj).parents("div.zxbapply"),
			a,b,c,d;
			a = container.find('.chenghu').checkForm({className:"wrong_text",content:["称呼不可为空","称呼最多输入10个汉字（20个英文字符）"],type:[1,2], reg:{len:20},checkFormType:container,displayNum:true,labl:'i', lablClass: 'ico_error'});
			b = container.find('.myphone').checkForm({className:"wrong_text",content:["手机号码不可以为空","请填写正确的手机号码"],type:[1,2], reg:0,checkFormType:container,displayNum:true,labl:'i', lablClass: 'ico_error'});
			c = container.find('.User_Shen').checkForm({className:"wrong_text",content:["请选择您的所在地"],type:[1], reg:1,checkFormType:container,checkType:"select",displayNum:true,labl:'i', lablClass: 'ico_error',parCls: '.provincediv'});
			if(c === 0) {
				d = container.find('.User_City').checkForm({className:"wrong_text",content:["请选择您的所在地"],type:[1], reg:1,checkFormType:container,checkType:"select",displayNum:true,labl:'i', lablClass: 'ico_error',parCls: '.provincediv'});
			}
		if(a===0&&b===0&&c===0&&d===0){
			return true;
		}else{
			return false;
		}
	}
	window.zhuanghouBao = zhuanghouBao;
})(jQuery,window);

//免费报价申请失败
function freeFail(obj){
  var failStr = '<div class="apply_fail"><span class="as_fail"></span><strong>非常抱歉,您当前的城市局域网尚未<br />开通装修服务，敬请期待！</strong><em>如果当前城市判断有误，您可以手动选择城市纠错！</em></div>';
  jq('.window_box').windowBox({
    width:480,
    height:200,
    title:"提示",
    wbcStr:failStr
    })
};
function scrollTopFn(num,selc) {
	var curNum = jq(selc).length;
	if(curNum > num) {	
		var SD=24,
			myScroll,
			tardiv = document.getElementById('scrolldiv'),
			tardiv1 = document.getElementById('scrolldiv1'),
			tardiv2 = document.getElementById('scrolldiv2'); 
		
		tardiv2.innerHTML=tardiv1.innerHTML; 
		function Marquee2(){ 
			if(tardiv2.offsetTop-tardiv.scrollTop<=0) 
				tardiv.scrollTop-=tardiv1.offsetHeight; 
			else{
				tardiv.scrollTop++; 
			} 
		} 
		myScroll=window.setInterval(Marquee2,24); ;
		tardiv.onmouseover=function() {clearInterval(myScroll)}; 
		tardiv.onmouseout=function() {myScroll=setInterval(Marquee2,SD)};	
	}
}
(function(jq) {
	jq.fn.fixBottom = function() {
		var that = jq(this),
			h = jq(this).height(),
			bH = jq(document).height(),
			obj = checkBrowser(),
			outWrapDiff = bH - jq('#gloWrap').height(),
			ie6 = false;
		if(obj.name == "msie" && obj.version == 6) {
			ie6 = true;	
		};
		
		function resizeBottomNav() {	
			var cH = jq(window).height(),
                diff = bH - cH,
                sH = jq(window).scrollTop(),
                ie6Diff = sH + cH - that.height();

            if (ie6) {
                that.css("top", ie6Diff - outWrapDiff + "px");
            }

            if (diff - sH <= 204) {
                that.css("bottom", 203 - (diff - sH) + 'px');
                if (ie6) {
                    that.css("top", sH + cH  - h - (203 - (diff - sH)) - outWrapDiff + 5 + "px");
                }
            } else {
                that.css('bottom', 0);
            }
		}

		if(jq(this).is(":visible")) {
			resizeBottomNav();
		}

		jq(window).on('scroll resize', resizeBottomNav);
	};
	
	var docInit = {
		init:function() {
			docInit.ctrlBarWidth();
			jq(window).bind("scroll resize", function() {
			  if (jq(window).scrollTop() > 550) {
				  jq('.bottom_nav').css('visibility', 'visible');
			  } else {
				  jq('.bottom_nav').css('visibility', 'hidden');
			  }
			 docInit.ctrlBarWidth();
			});	
		},
		ctrlBarWidth:function() {
			var winWidth = jq(window).width(),
				obj = checkBrowser(),
				bottom_nav = jq(".bottom_nav > .container"),
				to8to_townid = getCookie('to8to_townid'),
				idsVal = jq('#zhuangxiudai_city_ids').val(),
				ids = (idsVal && idsVal.split(',')) || [ 1130, 1672, 1103, 118,762,1121,591,1681,2951,1,2619],//深圳，北京，上海，成都,武汉,广州,杭州,福州,沈阳,西安,长沙
				idFlag = false;

			for(var i = 0, len = ids.length; i < len; i++) {
				if( to8to_townid == ids[i] ) {
					idFlag = true;
					break;
				}
			}
			//当宽度小于1400时加缩放
			if( !idFlag ) {
				jq('.top_bar > a:eq(3)').remove();
			}
			var bar = jq(".top_bar"),
				nav = jq(".top_bar > a"),
				html = jq("html"),
				nav_span = jq('.top_bar > a > span'),
				hot = nav_span.eq(1).next('i'),
				nav_num = nav.length;

			if(nav_num == 4) {//支持装修贷
				if(winWidth < 1400) {
					if(obj.name != "firefox") {
						nav_span.css('zoom', '.9');
					} else {
						nav_span.css('transform', 'scale(.9)');
					}
					
					hot.css('margin-left', '120px');
				} else {
					if(obj.name != "firefox") {
						nav_span.css('zoom', '1');
					} else {
						nav_span.css('transform', 'scale(1)');
					}
					hot.css('margin-left', '140px');
				}

				if(winWidth <= 1220) {
					bar.width('1220px');
					nav.width('305px');
					bottom_nav.addClass("m_l");
					html.css("overflow-x","scroll");
				} else {
					bar.width('100%');
					if(obj.name == "msie" && obj.version < 9){
						nav.width(Math.ceil(winWidth/4));
						bar.width(winWidth+5);
						html.css("overflow-x","hidden");
					} else {
						nav.width(winWidth/4);
						html.css("overflow-x","visible");
					}
					bottom_nav.removeClass("m_l");
				}
			} else {
				if(winWidth <= 1220) {
					bar.width('1220px');
					nav.width('407px');	
					nav.eq(0).width('406px');
					bottom_nav.addClass("m_l");
					html.css("overflow-x","scroll");
				} else {
					bar.width('100%');
					nav.width(winWidth/3);	
					bottom_nav.removeClass("m_l");
					bottom_nav.removeClass("m_l");
				}		
			}
		}
	};
	docInit.init();
	setTimeout(function() {
		jq(".bottom_nav").fixBottom();		
	},500);
})(jQuery);

//装修贷相关JS
var yuyue_apply_agin = 0;
(function(jq, that) {
	var zxdai = {
		init: function() {
			initEvent();
		}
	};

	function initEvent() {
		jq('#chenghu, #myphone1').placeholder({oLabel: 'span'});

		//计算器
		jq('#calc').click(function() {
			var result = validateDKData();
            clickStream.getCvParams('1_4_9_2');
			if(result) {
				if(window.location.href.indexOf('zxdmxhuodong') != -1) {
					calcDaiKuangZK();
				} else {
					calcDaiKuang();
				}
				
			}
		});

		//立即申请装修贷（中部）
		jq(':input.btn_f25618_round, a.btn_f25618, #zxd_act_btn, a.bottom_apply_btn').click(function() {
            //
			var username = getCookie('username', true),
				myObj = this,
				tag = '1_4_9_5',
				flag = 1;

			if(jq(this).hasClass('btn_f25618'))	{
				flag = 2;
				tag = '1_4_9_3';
			}
			clickStream.getCvParams(tag);

			if(!username) {//未登录， 弹出登陆框
				showPopWin('http://www.meijialz.com/pop_login.php', 500, 426, function() {
					var username    = getCookie('to8to_username');
					if(username) {
						jq(myObj).trigger('click');
					}
				}, false);
				return;
			} else {//判断是否有项目
				chargeProject(flag);
			}
		});
	}

	//判断是否有项目
	function chargeProject(flag) {
		jq.ajax({
			type: 'POST',
			url: '/zb/index.php',
			data: 'act=getUserProjectInfo&step=zhaolian',
            dataType: 'json',
			success: function(res) {
				if(res.status == 1) {//无项目
					zhaoBiaoBox(flag);//弹出招标框
				} else if(res.status == 4){//有项目，非深圳
                    projectNotShenzhenTip();
                } 
    //             else if(res.status == 2){//有项目未量房
				// 	projectNotAmountHouse();
				// }
				 else {//有项目已量房  3
                    //res.other_data = eval("(" + res.other_data +")");
                    //跳转至招联填写资料页面。链接待定
                    jq('#sjybj_dai_form :input[name="budget"]').val(res.other_data['budget']);
                    jq('#sjybj_dai_form :input[name="channelId"]').val(res.other_data['channelId']);
                    jq('#sjybj_dai_form :input[name="charSet"]').val(res.other_data['charSet']);
                    jq('#sjybj_dai_form :input[name="houseAddress"]').val(res.other_data['houseAddress']);
                    jq('#sjybj_dai_form :input[name="houseArea"]').val(res.other_data['houseArea']);
                    jq('#sjybj_dai_form :input[name="houseCity"]').val(res.other_data['houseCity']);
                    jq('#sjybj_dai_form :input[name="houseProvince"]').val(res.other_data['houseProvince']);
                    jq('#sjybj_dai_form :input[name="houseRegion"]').val(res.other_data['houseRegion']);
                    jq('#sjybj_dai_form :input[name="serialNo"]').val(res.other_data['serialNo']);
                    jq('#sjybj_dai_form :input[name="signMsg"]').val(res.other_data['signMsg']);
                    jq('#sjybj_dai_form :input[name="signType"]').val(res.other_data['signType']);
                    jq('#sjybj_dai_form :input[name="mobile"]').val(res.other_data['mobile']);
                    jq('#sjybj_dai_form :input[name="partnerUserId"]').val(res.other_data['partnerUserId']);
                    jq('#sjybj_dai_form').submit();
				}
			}
		});
	}
	
	var _dataObj = {};
	//获取招标数据
	function getZhaoBiaoData(ptag) {
		var loginFlag = getCookie('username', true);
			ch = '#box_ch',
			phn = '#box_phn',
			shen = '#User_Shen1',
			shi = '#User_City1',
            s_sourceid=210;
        var sourceid=48;
		var phoneTmp = jq('#box_phn').val();
		var chenghuTmp = jq('#box_ch').val();
		var encryptData = rsaEncryptNameAndPhone({phoneObj: jq(phn), chenhuObj: jq(ch)});
        var data = "zbymid=11&s_sourceid="+s_sourceid+"&sourceid="+sourceid+"&ptag="+ptag + "&shen="+ jq(shen).val() + "&city=" +jq(shi).val()+encryptData;
        _dataObj = {'zbymid': 11, 's_sourceid': 210, 'sourceid': 48, 'ptag': ptag, 'chenghu': chenghuTmp, 'phone': phoneTmp,'rsadata': RSAUtils.encryptfun(phoneTmp+','+chenghuTmp+','+(new Date()).getTime()+','+Math.random()), 'rsastatus': 1, 'shen': jq('#User_Shen1').val(), 'city': jq('#User_City1').val()};
		postZhaoBiaoData(data);
	}
	//发送招标数据
	function postZhaoBiaoData(_data) {
		jq.ajax({
            type: "POST",
            url: '/zb/index.php',
            data: _data,
            beforeSend: function() {
                if (yuyue_apply_agin > 0) {
                    return false;
                } else {
                    yuyue_apply_agin++;
                }
            },
            success: function(result) {
                var username = getCookie('username', true),
                    res = jq.parseJSON(result),
                    idsVal = jq('#zhuangxiudai_city_names').val(),
                    ids = (idsVal && idsVal.split(','))  || ['深圳', '北京', '上海', '成都'],
					idFlag = false;
                
                window_box_close();
                if(res.status == 1) {//成功
                    yuyue_apply_agin = 0;
                    if(!res.tmpYid && res.isZxd==0) {//超过5次
                        overFive();
                        return;
                    } 
                    for(var i = 0, len = ids.length; i < len; i++) {
						if( res.city == ids[i] ) {
							idFlag = true;
							break;
						}
					}
                    if( idFlag ) {
                    	//projectNotAmountHouse();//请先量房弹窗
                    	chargeProject(1);
                    } else {
                    	weixinZBRequest(res);//完善资料弹框
                    }
                } else if(res.status == 5) {//失败
                    notCooperationCity(res.cityname);//未合作城市
                } else {//城市站未开通
                    var cityname = encodeURI(res.cityname),
                        tyid   = encodeURI(res.tmpid);
                    showPopWin("http://www.meijialz.com/zb/frame_global.php?msg="+cityname + "&tyid=" + tyid , 456, 254, null, true);
                }
                yuyue_apply_agin = 0;
            }
        });
	}
	//微信招标Ajax请求
	function weixinZBRequest(res) {
		jq.ajax({  
	        type: "GET",      
	        dataType: 'jsonp',    
	        url: "http://www.meijialz.com/api/weixin/run.php",      
	        data: {action: 'createQrcode', cookie_id: 'test', data: 'createWxCode', type: 1}, 
	        success: function(data) { 
	            if(data.code == 0) {//获取二维码返回成功
	                var weixin_code = data.url,//微信扫码图片url
	                    start_qrcode_id = data.qrcode_id;                    
	        	
					indexSubZbStepOne(res, weixin_code);                    
	            } else {//获取二维码返回失败
	                alert(data.msg); 
	            } 
	        }              
	    });
	}

	//完善招标资料
	function indexSubZbStepOne(res, weixin_code){
	    if(res.status==1) {
	        window_box_close();

	        var str = '<div class="mod_fbbox w528">'+
	            '<div class="fbbox_s2">'+
	                '<h3 class="fbbox_s2_t">非常抱歉，装修贷服务暂未覆盖到您所在的城市！</h3>'+
	                '<p class="fbbox_s2_text">土巴兔还可以为您提供免费设计报价、免费量房、免费监理等服务，您若需要请您完善详细资料！我们将尽快为您安排服务。</p>'+
	                '<div class="clear">';
	                 if(res.sendmobiletime==''||res.sendmobiletime==0||typeof(res.sendmobiletime)=='undefined'||res.sendmobiletime==null){
	                     str +='<div class="s2_line">'+
	                            '<label for="" class="label"><span>*</span>&nbsp;量房时间</label>'+
	                            '<div class="s2_element">'+
	                              '<div>'+
	                                '<select class="select" name="sendmobiletime" id="sendmobiletime" style="border-color: rgb(221, 221, 221);">'+
	                                  '<option value="今天内">今天内</option>'+
	                                  '<option value="明天">明天</option>'+
	                                  '<option value="三天内">三天内</option>'+
	                                  '<option value="近一周内">近一周内</option>'+
	                                  '<option value="一周以上">一周以上</option>'+
	                                '</select>'+
	                              '</div>'+
	                            '</div>'+
	                          '</div>';
	                 }
	                   if(res.oarea==''||res.oarea==0||typeof(res.oarea)=='undefined'||res.oarea==null){
	                     str +='<div class="s2_line">'+
	                            '<label for="" class="label"><span>*</span>&nbsp;装修面积</label>'+
	                            '<div class="s2_element">'+
	                              '<div>'+
	                                '<input type="text" class="text" name="oarea" id="oarea" maxlength="4" style="border-color: rgb(221, 221, 221);"><em class="text_uni">㎡</em>'+
	                              '</div>'+
	                              '<div class="err_tip" style="display: none;">'+
	                                '<span class="ico_error"></span>请填写合理的面积'+
	                              '</div>'+
	                              '<div class="err_tip" style="display: none;">'+
	                                '<span class="ico_error"></span>面积必须小于9999'+
	                              '</div>'+
	                            '</div>'+
	                          '</div>';
	                    }
	                   if(res.zxtime==''||res.zxtime==0||typeof(res.zxtime)=='undefined'||res.zxtime==null){
	                     str += '<div class="s2_line">'+
	                            '<label for="" class="label"><span>*</span>&nbsp;装修时间</label>'+
	                            '<div class="s2_element">'+
	                              '<div>'+
	                                '<select class="select" name="zxtime" id="zxtime" style="border-color: rgb(221, 221, 221);">'+
	                                  '<option value="半个月内">半个月内</option>'+
	                                  '<option value="1个月">1个月</option>'+
	                                  '<option value="2个月">2个月</option>'+
	                                  '<option value="2个月以上">2个月以上</option>'+
	                                '</select>'+
	                              '</div>'+
	                            '</div>'+
	                          '</div>';
	                    }
	                   if(res.hometype==''||res.hometype==0||typeof(res.hometype)=='undefined'||res.hometype==null){
	                    str += '<div class="s2_line">'+
	                            '<label for="" class="label"><span>*</span>&nbsp;房屋类型</label>'+
	                            '<div class="s2_element">'+
	                              '<div>'+
	                                '<select class="select" name="hometype" id="hometype" style="border-color: rgb(221, 221, 221);">'+
	                                  '<option value="1">住宅公寓</option>'+
	                                  '<option value="2">别墅</option>'+
	                                  '<option value="4">商场</option>'+
	                                  '<option value="21">其他</option>'+
	                                  
	                                '</select>'+
	                              '</div>'+
	                            '</div>'+
	                          '</div>';
	                  }

	                if(res.zxys==''||res.zxys==0||typeof(res.zxys)=='undefined'||res.zxys==null){
	                  str += '<div class="s2_line">'+
	                            '<label for="" class="label"><span>*</span>&nbsp;装修预算</label>'+
	                            '<div class="s2_element">'+
	                              '<div>'+
	                                '<select class="select" name="zxys" id="zxys" style="border-color: rgb(221, 221, 221);">'+
	                                  '<option value="3万以下">3万以下</option>'+
	                                  '<option value="3-5万">3-5万</option>'+
	                                  '<option value="5-8万">5-8万</option>'+
	                                  '<option value="8-12万">8-12万</option>'+
	                                  '<option value="12-18万">12-18万</option>'+
	                                  '<option value="18-25万">18-25万</option>'+
	                                  '<option value="25-30万">25-30万</option>'+
	                                  '<option value="30万以上">30万以上</option>'+
	                                '</select>'+
	                              '</div>'+
	                            '</div>'+
	                          '</div>';
	                }  


	                if(res.zxtype==''||res.zxtype==0||typeof(res.zxtype)=='undefined'||res.zxtype==null) {
	                  str += '<div class="s2_line">'+
	                            '<label for="" class="label"><span>*</span>&nbsp;装修类型</label>'+
	                            '<div class="s2_element">'+
	                              '<div>'+
	                                '<select class="select" name="zxtype" id="zxtype" style="border-color: rgb(221, 221, 221);">'+
	                                  '<option value="1" selected="">半包</option>'+
	                                  '<option value="2">全包</option>'+
	                                '</select>'+
	                              '</div>'+
	                            '</div>'+
	                          '</div>';
	                } 
	                str += '</div>';

	                if(res.address==''||res.address==0||typeof(res.address)=='undefined'||res.address==null) {
	                  str += '<div class="s2_line_b">'+
	                          '<label for="" class="label">楼盘名称</label>'+
	                          '<div class="s2_element">'+
	                              '<div>'+
	                                '<input class="text" type="text" style="border-color: rgb(221, 221, 221);" name="address" id="address">'+
	                              '</div>'+
	                          '</div>'+
	                        '</div>';
	                }
	                        str += '<input type="hidden" id="User_City_1" value="'+res.city+'" name="User_City"><input type="hidden" value="'+res.tmpYid+'" name="tyid" id="tyid"><input type="button" value="提交" class="mod_fbbox_btn" id="completeInfoSubmit">'+
	                        '<div class="service_img_box clear" style="display:none">'+
	                          '<div class="service_img">'+
	                            '<p class="service_img_text"><i class="ico_code_s"></i>如需关注项目进展，请扫二维码</p>'+
	                            '<img src="'+weixin_code+'" alt="" id="weixin_img" style="width:100px;height:100px">'+
	                            '<div class="mod_pagetip mod_pagetip_s mod_pagetips_noinfo" id="status_success" style="display:none">'+
	                              '<span class="mod_pagetip_ico"><em class="ico_tip_ok_s"></em></span>'+
	                              '<div class="mod_pagetip_bd">'+
	                                '<div class="mod_pagetip_title">扫描成功</div>'+
	                              '</div>'+
	                            '</div>'+
	                            '<div class="mod_pagetip mod_pagetip_s" style="display:none" id="status_fail">'+
	                              '<!-- 二维码失效 --><span class="mod_pagetip_ico"><em class="ico_tip_warn_s"></em></span>'+
	                              '<div class="mod_pagetip_bd">'+
	                                '<div class="mod_pagetip_title">二维码失效</div>'+
	                                '<div class="mod_pagetip_info">'+
	                                  '请点击<a href="javascript:;" onclick="getnewcode('+res.tmpYid+')">刷新二维码</a>'+
	                                '</div>'+
	                              '</div>'+
	                            '</div>'+
	                          '</div>'+
	                        '</div>'+
	                      '</div>'+
	                '</div>';

	        jq('.window_box').windowBox({
	            width: 640,
	            title: "提示",
	            wbcStr: str,
	            closeFn: 'stop_code_status'
	        });

	        jq('#completeInfoSubmit').click(function() {
	        	selectConfirmZbOver();
	        });
	    }
	};

	//招标完善资料最后一步
	function selectConfirmZbOver(){
	    var mjObj = jq("#oarea"),
	        errTip = mjObj.parent().parent().find(".err_tip");
	    if(isNaN(mjObj.val())||mjObj.val()==''||mjObj.val()=='0'){
	       errTip.eq(0).css('display',"block");
	       mjObj.focus();
	       setTimeout(function(){ errTip.eq(0).css("display","none");},2500);
	       return;
	    } else if(mjObj.val() > 9999){
	        errTip.eq(1).css('display',"block");
	        mjObj.focus();
	        setTimeout(function(){ errTip.eq(1).css("display","none");},2500);
	        return;
	    }
	    
	    var User_City   = jq("#User_City_1").val();
	    var oarea  = jq("#oarea").val();
	    var zxys   = jq("#zxys").val();
	    var zxtype = jq("#zxtype").val();
	    var address = jq("#address").val();
	    if(jq("#txttype_1").val())
	    {
	        zxtype = jq("#txttype_1").val();
	    };
	    var zxtime = jq("#zxtime").val();
	    var hometype = jq("#hometype").val();
	    var sendmobiletime = jq("#sendmobiletime").val();
	    var tyid   = jq("#tyid").val();
        clickStream.getCvParams('1_4_9_8');
	    var _myData = jq.extend({invite:2,User_City:User_City,tyid:tyid,oarea:oarea,zxys:zxys,zxtype_two:zxtype,zxtime:zxtime,sendmobiletime:sendmobiletime,hometype:hometype,address:address}, _dataObj);
	    jq.ajax({
			type: "POST",
			url: "/zb/index.php",
			data: _myData,
			beforeSend: function() {
                if (yuyue_apply_agin > 0) {
                    return false;
                } else {
                    yuyue_apply_agin++;
                }
            },
			success:function(result){
				yuyue_apply_agin = 0;
				window_box_close();
				var res = JSON.parse(result);

				if (res.status == 4) {
				     window_box_close();
				     indexYYFail(res.cityname);
				     return false;
				} else {
					window_box_close();
					if(res.overFive && res.overFive == 1) {
						overFive();
                        return;
					}
					var successStr ='<div class="mod_pagetip"><span class="mod_pagetip_ico mod_special"><em class="ico_tip_ok"></em></span><div class="mod_pagetip_title mt25 col_l">恭喜您成功完善资料!<br><p class="window_txt_be895f">土巴兔特卖商城还为您提供最实惠的建材商品！</p></div></div><div class="mod_fbbox" style="text-align:center"><a href="http://mall.meijialz.com" target="_blank" class="mod_fbbox_btn" onclick="clickStream.getCvParams(\'1_4_9_6\')">立即抢购</a></div>';
			    	stop_code_status();//关闭微信扫码状态请求
			    
			        jq('.window_box').windowBox({
						width:612,
						title:"提示",
						wbcStr:successStr
			      	});
				}
			}
		});
	}

	//验证招标数据
	function validateData() {
		var ch = '#box_ch',
			phn = '#box_phn',
			shen = '#User_Shen1',
			shi = '#User_City1';

		var chkArr = [{id: ch, info: [{reg:[0], tip: '称呼不可为空'}, {reg: [/^.{1,20}$/], tip: '称呼不能超过20个字符'}]}, {id: phn, info: [{reg:[0], tip: '手机号码不可以为空'}, {reg: [/^1[34578]{1}\d{9}$/], tip: '请填写正确的手机号码'}]}, {id: shen, info:[{reg:[0], tip: '请选择您的所在地'}], parCls:'.provincediv'}, {id: shi, info:[{reg:[0], tip: '请选择您的所在地'}], parCls:'.provincediv'}];

		return simplifyCheck2(chkArr);
	}

	//验证贷款数据
	function validateDKData() {
		var chkArr = [{id: '#jine', info: [{reg: [0], tip: '请输入贷款金额'}, {reg:[/^\d{1,}$/], tip: '贷款金额必须是整数'}, {reg: [/^[1-9]{1}\d{0,3}$/],tip: '贷款金额不能低于1万', negate: true}, {reg: [/^[1-9]{1}\d{0,4}$|^1\d{0,5}$|^200000$/], tip: '贷款金额不能超过20万'}], parentTip: 'ul'}];

		return simplifyCheck2(chkArr);
	}

	//装修贷计算器
	function calcDaiKuang() {
		var DAY = 30,
			jine = jq('#jine').val(),//金额
			lilv = 0.625/100,//日利率
			qishu = jq('#qishu').val(),//期数
			huankuan = 0,
			tatal = 0;
			

		if(qishu == 3) {//免息
			lilvZK = 0;
		} else if(qishu == 6) {
			lilvZK = lilv*0.5;
		} else if(qishu == 12) {
			lilvZK = lilv*0.5;
		} else {
			lilvZK = lilv;
			jq('#hkTotalOld,#yhTip').hide();
		}
		
		huankuan = jine/qishu+jine*lilvZK;
		tatal = huankuan*qishu;
		jq('#dkJine').html(jine);
		jq('#dkZhouqi').html(qishu);
		jq('#huankuan').html(huankuan.toFixed(2));
		jq('#hkTotal').html(tatal.toFixed(2));
		
		
	
	}
	//装修贷折扣计算器
	function calcDaiKuangZK() {
			jine = jq('#jine').val(),//金额
			lilv = 0.625/100,//日利率
			qishu = jq('#qishu').val(),//期数
			huankuan = 0,
			tatal = 0;
			huankuanZK = 0,
			tatalZK = 0,
			lilvZK = 0;
			
		jq('#hkTotalOld, #yhTip').show();
		if(qishu == 3) {//免息
			lilvZK = 0;
		} else if(qishu == 6) {
			lilvZK = lilv*0.5;
		} else if(qishu == 12) {
			lilvZK = lilv*0.5;
		} else {
			lilvZK = lilv;
			jq('#hkTotalOld,#yhTip').hide();
		}
		huankuan = jine/qishu+jine*lilvZK;
		tatalZK = huankuan*qishu;
		jq('#huankuan').html(huankuan.toFixed(2));
		jq('#dkJine').html(jine);
		jq('#dkZhouqi').html(qishu);
		
		jq('#hkTotal').html(tatalZK.toFixed(2));
		tatal = (jine/qishu+jine*lilv)*qishu;
		jq('#hkTotalOld').html(tatal.toFixed(2));
	}

	//招标弹窗
	function zhaoBiaoBox(flag) {
		var str = '<form onsubmit="return false;"><div class="free_apply clear mod_form"><div class="apply_line"><label for="" class="app_lbl">您的称呼</label><div class="app_ele"><input type="text" id="box_ch" class="ap_text"></div></div><div class="apply_line"><label for="" class="app_lbl">手机号码</label><div class="app_ele"><input type="text" class="ap_text" id="box_phn"></div></div><div class="apply_line"><label for="" class="app_lbl">所在城市</label><div class="app_ele"><div class="clear provincediv"><div class="clear"><select class="col_l" id="User_Shen1" name="User_Shen1" onchange="changeProvince(\'User_Shen1\',\'User_City1\',\'User_Town1\')"><option value="0">省/市</option></select><select class="col_l" id="User_City1" name="User_City1" onchange="changeTown(\'User_Shen1\',\'User_City1\',\'User_Town1\')"><option value="0">市/地区</option></select><div style="display:none"><select class="langSelect" id="User_Town1" name="User_Town1"><option>县/区</option></select></div></div></div></div></div><div class="apply_line apply_line_btn"><div class="app_ele"><input type="submit" value="申请装修贷" class="apply_btn" id="apply_btn"><div class="app_tip"><i class="ico_info_s"></i>为了您的利益及我们的口碑，您的隐私将被严格保密。</div></div></div></div></form>';
		jq('.window_box').windowBox({
			width: 480,
			height: 353,
			title: "申请装修贷，轻松把装修款“贷”回家",
			wbcStr: str
		});
	    gpm = new GlobalProvincesModule();
	    gpm.def_province = ["省/市", ""];
    	gpm.def_city    = ["市/地区", ""];  
	    gpm.initProvince($("User_Shen1"));

	    jq('#apply_btn').click(function() {
	    	var result = validateData(2),
	    		tag = '1_4_9_1';
	    	if(flag == 2) {
	    		tag = '1_4_9_4';
	    	}
            clickStream.getCvParams(tag);
	    	if(result) {
	    		getZhaoBiaoData(tag);
	    	}
	    });

	}

	//有项目非深圳弹窗
	function projectNotShenzhenTip() {
		var str = '<div class="mod_pagetip sjybj_zxd_tip pb40"><span class="mod_pagetip_ico"><em class="icn_cry_rabbit"></em></span><div class="mod_pagetip_title pt40l0">很抱歉，装修贷服务暂未覆盖到你所在的城市！<br>土巴兔正在火速开通，请耐心等待！</div></div>';
		jq('.window_box').windowBox({
			width: 612,
			title: "提示",
			wbcStr: str
		});
	}
	//有项目未量房
	function projectNotAmountHouse() {
		var str = '<div class="mod_pagetip sjybj_zxd_tip"><span class="mod_pagetip_ico"><em class="icn_cry_rabbit"></em></span><div class="mod_pagetip_title pl0 lh24">不好意思！申请土巴兔装修贷请先量房！土巴兔客服<br>将会24小时之内联系您，尽快为您预约免费服务量房，<br>请您保持手机畅通！<br><p class="window_txt_be895f mt6">想省心省钱不被坑，来装修学堂就够了！</p></div></div><div class="mod_fbbox" style="text-align:center"><a href="http://www.meijialz.com/huodong/tuangou.php?id=126" target="_blank" class="mod_fbbox_btn" onclick="clickStream.getCvParams(\'1_4_9_7\')">猛戳报名</a></div>';
		jq('.window_box').windowBox({
			width: 670,
			title: "提示",
			wbcStr: str
		});
	}

	//非合作城市提示
	function notCooperationCity(name) {
		var str = '<div class="mod_pagetip sjybj_zxd_tip"><span class="mod_pagetip_ico"><em class="icn_cry_rabbit"></em></span><div class="mod_pagetip_title pt40l0" style="width:430px;">非常抱歉，您当前城市'+name+'尚未开通装修服务！<br><p class="window_txt_be895f">没关系，土巴兔特卖商城为您提供最实惠的建材商品！</p></div></div><div class="mod_fbbox mt_special6" style="text-align:center"><a href="http://mall.meijialz.com" target="_blank" class="mod_fbbox_btn" onclick="clickStream.getCvParams(\'1_4_9_6\')">立即抢购</a></div>';
		jq('.window_box').windowBox({
			width: 612,
			title: "提示",
			wbcStr: str
		});
	}

	that.zxdai = zxdai;
})(jQuery, this);
