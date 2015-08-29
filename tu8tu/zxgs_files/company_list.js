// create by dean, zgsCompanyList javascript   
var cityCode = getCookie('to8to_tcode') || 0; 
!function(){
  var zgsList = {
    init:function(){
      zgsListDocReady();//doc ready 
    }
  }
  function zgsListDocReady(){
    jq('.zgs_clr_zsm > ul > li ').find('input').val("");
    var str = '<span class="xgt_nav_showMore" onClick="javascript:showMore(this)" title="点击展开"></span>',
        strTwo = '<span class="xgt_nav_showMore_two" onClick="javascript:showMore(this)" title="点击展开"></span>',
      hasHdd,hasHdd1;
    jq('.zgs_st_dl >dd').each(function(index, element) {
      if(jq(this).height() > 40 && jq(this).parent().find('div').length == 0){
          jq(this).addClass('height_40');
          jq(this).append(str);
      }else if(jq(this).height() > 40 && jq(this).parent().find('div').length > 0){
          jq(this).parent().find('div').addClass('height_40');
          jq(this).append(strTwo);
      }
    });
    jq('.zgs_st_dl_two >dd >.all_gz:eq(1)').each(function(index, element) {
    	if(jq(this).height() > 40 && jq(this).parent().find('div').length == 0){
		      jq(this).addClass('height_40');
		      jq(this).append(str);
		  }else if(jq(this).height() > 40 && jq(this).parent().find('div').length > 0){
        jq(this).parent().find('div').addClass('height_40');
        jq(this).append(strTwo);
      }
    });
    jq('.zgs_st_dl_two  > dd > div > a').on("click", function(){
      jq(this).parent().find('a').removeClass('on');
      jq(this).addClass('on');
    });
    jq('.zgs_st_dl > dd > a').on("click", function(){
      jq(this).parent().find('a').removeClass('on');
      jq(this).addClass('on');
    });
    jq('.zgs_st_sorts > a').on("click", function(){
      jq('.xgt_st_sorts > a').removeClass('on');
      jq(this).addClass('on');
    });
    jq('.zgsclc_score').mouseenter(function(){
      jq(this).find('div.zgsclc_score_window').show();
    });
    jq('.zgsclc_score').mouseleave(function(){
      jq(this).find('div.zgsclc_score_window').hide();
    });
    
    jq(".zgs_select_type > dl.zgs_st_dl:gt(2)").hide();
    jq(".zgs_select_type > p.more_type > a").click(function() {
      if(jq(this).text() == "更多") {
        jq(".zgs_select_type > dl.zgs_st_dl:gt(2)").show();
        jq(this).html("收起<em></em>"); 
        jq(this).find("em").addClass("lowrow");
      } else {
        jq(".zgs_select_type > dl.zgs_st_dl:gt(2)").hide();
        jq(this).html("更多<em></em>"); 
        jq(this).find("em").removeClass("lowrow");  
      };  
    });
    jq('.zgs_cl_right > .zgs_clr_zsm > ul > li > label').click(function(){
            jq(this).parent().find('input').focus();
    });
    jq('.zgs_cl_right > .zgs_clr_zsm > ul > li > input').on("keydown", function(){
      jq(this).parent().find('label').hide();
    });
    jq('.zgs_cl_right > .zgs_clr_zsm > ul > li > input').on("blur", function(){
      if(jq(this).val() == ""){
        jq(this).parent().find('label').show();
      };
      
    });
    hasHdd1 = jq(".zgs_select_type > dl.zgs_st_dl_two > dd> .all_gz.height_40"),
    hasHdd2 = jq(".zgs_select_type > dl.zgs_st_dl > dd.height_40");
    if(jq(".zgs_select_type > dl.zgs_st_dl:gt(2)").find("dd").find("a.on").length != 0) {
      jq(".zgs_select_type > p.more_type > a").click(); 
    }
    hasHdd1.each(function(){
       if(jq(this).length!=0 && jq(this).find("a.on").length!=0 && jq(this).find("a.on").position().top >= 40) {
          jq(this).find("span").click();   
        };
    });
    hasHdd2.each(function(){
       if(jq(this).length!=0 && jq(this).find("a.on").length!=0 && jq(this).find("a.on").position().top >= 40) {
          jq(this).find("span").click();   
        };
    });
    jq('.zgs_company_list > ul > li').mouseenter(function(){
      jq(this).addClass('on');
    }).bind('mouseleave',function(){
      jq(this).removeClass('on');
    });
    // jq('.zgs_clr_fc .zcz_btn').click(function(){
    //   try{clickStream.getCvParams('1_5_1_9');}catch(e){}
    //   window.open('http://dzt.twos.net.cn/LR/Chatpre.aspx?id=DZT39460052&lng=cn', '_blank',"height=500,width=750");
    // });
	if(jq(".zgs_select_type > dl.zgs_st_dl.height_40")) {
		jq(".zgs_select_type > dl.zgs_st_dl.height_40").each(function() {
			hasHdd = jq(this).find("dd");
			if(hasHdd.length!=0 && hasHdd.find("a.on").length!=0 && hasHdd.find("a.on").position().top >= 40) {
				hasHdd.next().click();  
			}	
		});
	}


	//广告
	jq('a.zgs_ad_link, a.zgs_ad_close').click(function() {
		jq('.zgs_ad').toggle();
	});
  }
  window.zlDocReady = zgsList;
}(jQuery)
 

//滚动
!function() {
  jq.fn.scrollList = function(settings) {
    var defaults = {
      child:"li",//要滚动的元素
      num:3,//小于这个数不滚动
      time:1000,//滚动一行的时间
      interval:3000,//滚动间隔
      direct:"down" //滚动方向
    },
    settings = jq.extend(defaults,settings),
    obj = jq(this),myScroll;
    
    if(obj.find(settings.child).length > settings.num) {
      obj.hover(function() {
        clearInterval(myScroll);  
      }, function() {
        if(settings.direct == "up") {
          myScroll = setInterval(function() {
            var h1 = obj.find(settings.child+":first").height();
            obj.animate({"margin-top":-h1+"px"},settings.time,function() {
              jq(this).css("margin-top",0).find(settings.child+":first").appendTo(this);
            });  
          },settings.interval); 
        } else {
          myScroll = setInterval(function() {
            var h1 = obj.find(settings.child+":last").height();
            obj.animate({"margin-bottom":-h1+"px"},settings.time,function() {
              jq(this).css("margin-bottom",0).find(settings.child+":last").insertBefore(jq(this).find(settings.child+":first"));
            }); 
          },settings.interval);
        }
      }).trigger("mouseleave"); 
    }
  };    
}(jQuery);

function showMore(a){
  var obj = jq(a);
  if(!obj.hasClass('showMore_down' || !obj.hasClass('showMore_down_two'))){
    obj.attr('title', '点击收缩').addClass('showMore_down');
    if(obj.parent().find('div').length > 0){
      obj.parent().find('div').addClass('height_auto');
    }else{
      obj.parent().addClass('height_auto');
    }
    
  }else{
    obj.attr('title', '点击展开').removeClass('showMore_down');
    if(obj.parent().find('div').length > 0){
      obj.parent().find('div').removeClass('height_auto');
    }else{
      obj.parent().removeClass('height_auto');
    }
  }
} 

function backWinInfo(obj,res)
{
  window_box_close(jq(".window_box_close"));  
  if (res['status']==5 && res['cityname']!='undefined')
  {
    freeFail(obj,res['cityname']);
  }
  else
  {
    freeSuceess(obj);
  }
}
//找公司列表页右侧验证
function checkCompanyForm(obj,ptag, whoid){
   var ptag = arguments[1] ? arguments[1] : '';
   var a = jq(obj).parent().find('.yourname[name="yourname"]').checkForm({className:"index_check",content:["称呼不可为空"],type:[1],checkFormType:obj, displayNum:true});
   var b = jq(obj).parent().find('.youriphone[name="youriphone"]').checkForm({className:"index_check",content:["手机号码不可以为空","请填写正确的手机号码"],type:[1,2], reg:0,checkFormType:obj, displayNum:true});
   var c = jq(obj).parent().find('.province[name="User_Shen"]').checkForm({className:"index_check",content:["请选择您的所在地"],type:[1],checkFormType:obj, displayNum:true,checkType:"select"});
   if(c == 0) {
		var d = jq(obj).parent().find('.city[name="User_City"]').checkForm({className:"index_check",content:["请选择您的所在地"],type:[1],checkFormType:obj, displayNum:true,checkType:"select"});   
   }
   if( a == 0 && b == 0  && c==0 && d==0){
      submit_ajax(obj, ptag, whoid)
   }
};


function submit_ajax(obj,ptag, whoid){
	  var myData = 'city='+cityCode+':id='+(whoid||window.whoid||0);
	  if(!ptag)
	  {
		ptag = '1_5_1_3';//默认招公司列表页
	  }

      var submittype = jq(obj).attr("submit_type");
      var sform = jq(obj).parents('div#form');
      var s_type = submittype.split("_")[0];
      var f_type = submittype.split("_")[1];
      //var fromid = getcookie('uid',1);

	/*******************************微信招标************************************/  
			  var weixin_code = ''; 
			  var start_qrcode_id = '';
			  jq.ajax({  
						async:true, 
						type:"GET",      
						dataType: 'jsonp',    
						url:"http://www.meijialz.com/api/weixin/run.php",      
						data:{action:'createQrcode',cookie_id:'test',data:myData,type:5}, 
						success:function(res){ 
								if(res.code==0)
								{
									weixin_code = res.url;
									start_qrcode_id = res.qrcode_id;
	/*******************************微信招标************************************/ 
						
						      if(s_type=='ajax'){

								  if(f_type=='design'){
									checkFreeDesign(obj);
									var toid = sform.find("input[name='toid']").val();
									var n = 2;
									var sourceid=0;
									var s_sourceid=0;
									var price=0;
									var cid = 0;
									var phone = sform.find("input[name='youriphone']").val();
									var nick = sform.find("input[name='yourname']").val();
									var User_Shen = sform.find("#User_Shen1").val();
									var User_City = sform.find("#User_City1").val();  
									
                                      ptag = ptag ? ptag : '1_5_1_1';
                                      clickStream.getCvParams(ptag);
									
									var encryptData = rsaEncryptNameAndPhone({phoneObj: sform.find("input[name='youriphone']"), chenhuObj: sform.find("input[name='yourname']")});
									jq.ajax({
										type: "POST",
										url: '/zb/index.php',
										data: 'ptag='+ptag+'&User_Shen='+User_Shen+'&User_City='+User_City+'&sourceid=7&s_sourceid=3'+encryptData,

                                        success: function (result) {
                                            jq('.window_box').remove();
                                            jq('.translucence_layer').remove();
                                            if (typeof(JSON) == "undefined") {
                                                var res = eval("(" + result + ")")
                                            } else {
                                                var res = JSON.parse(result)
                                            }

                                            if (res.status == 1) {
                                                if (!res.tmpYid) {
                                                    overFive();
                                                }
                                                /*var successStr = zb_first_pop(weixin_code, res.tmpYid);
                                                 jq('.window_box').windowBox({
                                                 width: 560,
                                                 title: "提示",
                                                 wbcStr: successStr,
                                                 closeFn: 'stop_code_status'
                                                 });
                                                 zb_getwxstatus(start_qrcode_id, res.tmpYid);*/
                                                
                                                indexSubZbStepOneNew(res, weixin_code, 2, myData);
												zb_getwxstatus(start_qrcode_id, res.tmpYid);
                                                return false;
                                            }
                                            else if (res.status == 5) {
                                                window_box_close();
                                                indexYYFail(res.cityname);
                                                return false;
                                            }
                                            else {
                                                var cityname = encodeURI(res.cityname);
                                                var tyid = encodeURI(res.tmpid);
                                                showPopWin("http://www.meijialz.com/zb/frame_global.php?msg=" + cityname + "&tyid=" + tyid, 456, 254, null, true);
                                            }
                                            yuyue_apply_agin = 0
                                        }
									  })

								  }
						
								  if(f_type=='price'){
									checkFreeDesign(obj);
									var toid = sform.find("input[name='toid']").val();
									var n = 3;
									var sourceid=0;
									var s_sourceid=0;
									var price=0;
									var cid = 0;
									var phone = sform.find("input[name='youriphone']").val();
									var nick = sform.find("input[name='yourname']").val();
									var User_Shen = sform.find("#User_Shen1").val();
									var User_City = sform.find("#User_City1").val();  
									clickStream.getCvParams('1_5_1_2');

                                      var encryptData = rsaEncryptNameAndPhone({phoneObj: sform.find("input[name='youriphone']"), chenhuObj: sform.find("input[name='yourname']")});
									  jq.ajax({
                                          type: "POST",
                                          url: '/zb/index.php',
                                          data: 'rsastr=1&ptag=1_5_1_2&User_Shen=' + User_Shen + '&User_City=' + User_City + '&sourceid=7&s_sourceid=3'+encryptData,

                                          success: function (result) {
                                              jq('.window_box').remove();
                                              jq('.translucence_layer').remove();
                                              if (typeof(JSON) == "undefined") {
                                                  var res = eval("(" + result + ")")
                                              } else {
                                                  var res = JSON.parse(result)
                                              }

                                              if (res.status == 1) {
                                                  if (!res.tmpYid) {
                                                      //alert('申请次数超过五次');
                                                      overFive();
                                                  }
                                                  /*var successStr = zb_first_pop(weixin_code, res.tmpYid);
                                                  jq('.window_box').windowBox({
                                                      width: 560,
                                                      title: "提示",
                                                      wbcStr: successStr,
                                                      closeFn: 'stop_code_status'
                                                  });
                                                  zb_getwxstatus(start_qrcode_id, res.tmpYid);*/
                                                indexSubZbStepOneNew(res, weixin_code, 2, myData);
												zb_getwxstatus(start_qrcode_id, res.tmpYid);
                                                  return false;
                                              }
                                              else if (res.status == 5) {
                                                  window_box_close();
                                                  indexYYFail(res.cityname);
                                                  return false;
                                              }
                                              else {
                                                  var cityname = encodeURI(res.cityname);
                                                  var tyid = encodeURI(res.tmpid);
                                                  showPopWin("http://www.meijialz.com/zb/frame_global.php?msg=" + cityname + "&tyid=" + tyid, 456, 254, null, true);
                                              }
                                              yuyue_apply_agin = 0
                                          }
                                      })

								  }
						
								  if(f_type=='select3'){
									var phone = sform.find("input[name='youriphone']").val();
									var nick = sform.find("input[name='yourname']").val();
						
									var shen = sform.find("#User_Shen").find("option:selected").val();//
									var city = sform.find('#User_City').find("option:selected").val();
									clickStream.getCvParams(ptag);
								   
								   var encryptData = rsaEncryptNameAndPhone({phoneObj: sform.find("input[name='youriphone']"), chenhuObj: sform.find("input[name='yourname']")});
								   jq.ajax({
										type: "POST",
										url: '/zb/index.php',
										data: 'rsastr=1&ptag='+ptag+'&User_Shen='+shen+'&User_City='+city+'&sourceid=7&s_sourceid=3'+encryptData,
										
										success: function(result) {
										  if (typeof(JSON) == "undefined") {
											var res = eval("(" + result + ")")
										  } else {
											var res = JSON.parse(result)
										  }
										   jq ('.window_box').remove();
			  							   jq ('.translucence_layer').remove();
                                            if (res.status == 1) {
                                                if (!res.tmpYid) {

                                                    //alert('申请次数超过五次');
                                                    overFive();
                                                }
                                                /*var successStr = zb_first_pop(weixin_code, res.tmpYid);
                                                jq('.window_box').windowBox({
                                                    width: 560,
                                                    title: "提示",
                                                    wbcStr: successStr,
                                                    closeFn: 'stop_code_status'
                                                });
                                                zb_getwxstatus(start_qrcode_id, res.tmpYid);*/
                                                indexSubZbStepOneNew(res, weixin_code, 2, myData);
												zb_getwxstatus(start_qrcode_id, res.tmpYid);
                                                return false;
                                            }
                                            else if (res.status == 5) {
                                                window_box_close();
                                                indexYYFail(res.cityname);
                                                return false;
                                            }
                                            else {
                                                var cityname = encodeURI(res.cityname);
                                                var tyid = encodeURI(res.tmpid);
                                                showPopWin("http://www.meijialz.com/zb/frame_global.php?msg=" + cityname + "&tyid=" + tyid, 456, 254, null, true);
                                            }
										  yuyue_apply_agin = 0
										}                                                                                                                                                                                                                                                                                   
									  })
								   
								   
								   
								   
								   
								  }
                                  //价值点专题
                                  if(f_type=='select4'){
                                      var phone = sform.find("input[name='youriphone']").val();
                                      var nick = sform.find("input[name='yourname']").val();
                                      var shen = sform.find("#User_Shen_val").find("option:selected").val();
                                      var city = sform.find('#User_City_val').find("option:selected").val();
                                      clickStream.getCvParams(ptag);
                                      var encryptData = rsaEncryptNameAndPhone({phoneObj: sform.find("input[name='youriphone']"), chenhuObj: sform.find("input[name='yourname']")});
									  jq.ajax({
                                          type: "POST",
                                          url: '/zb/index.php',
                                          data: 'rsastr=1&ptag='+ptag+'&User_Shen='+shen+'&User_City='+city+'&sourceid=7&s_sourceid=3'+encryptData,

                                          success: function(result) {
                                              function bindAgain() {
                                              	jq(':input.btn_org').bind('click', function() {
								                    var chkArr = [{id: '#name_val', info:[{reg:[0], tip:'请输入您的称呼'}], parCls: '.element', parentTip: '.mod_form'}, {id: '#phone_val', info:[{reg:[0], tip:'请输入您的手机号码'}, {reg:[/^13[0-9]{1}[0-9]{8}$|14[0-9]{1}[0-9]{8}$|15[0-9]{1}[0-9]{8}$|18[0-9]{1}[0-9]{8}$|17[0-9]{1}[0-9]{8}$/], tip:'请正确输入手机号码'}], parCls: '.element', parentTip: '.mod_form'}, {id: '#User_Shen_val', info:[{reg:[0], tip:'请选择您的所在地区'}], parCls: '.element', parentTip: '.mod_form'}, {id: '#User_City_val', info:[{reg:[0], tip:'请选择您的所在地区'}], parCls: '.element', parentTip: '.mod_form'}];
									                var check_res = simplifyCheck2(chkArr);
									                if (check_res) {
									                    jq(this).unbind('click');
									                    submit_ajax(this, '1_5_6_1');
									                }
								                });
                                              }
                                              
                                              if (typeof(JSON) == "undefined") {
                                                  var res = eval("(" + result + ")")
                                              } else {
                                                  var res = JSON.parse(result)
                                              }
                                              jq ('.window_box').remove();
                                              jq ('.translucence_layer').remove();
                                              if (res.status == 1) {
                                                  if (!res.tmpYid)
                                                  {

                                                      //alert('申请次数超过五次');
                                                      overFive();}
                                                  var successStr = zb_first_pop(weixin_code,res.tmpYid);
                                                  jq('.window_box').windowBox({
                                                      width:560,
                                                      title:"提示",
                                                      wbcStr:successStr,
                                                      closeFn:'stop_code_status'
                                                  });
                                                  zb_getwxstatus(start_qrcode_id,res.tmpYid);
                                                  bindAgain();
                                                  return false;
                                              }
                                              else if(res.status == 5)
                                              {
                                                  window_box_close();
                                                  indexYYFail(res.cityname);
                                                  bindAgain();
                                                  return false;
                                              }
                                              else
                                              {
                                                  var cityname = encodeURI(res.cityname);
                                                  var tyid   = encodeURI(res.tmpid);
                                                  showPopWin("http://www.meijialz.com/zb/frame_global.php?msg="+cityname + "&tyid=" + tyid , 456, 254, null, true);
                                              }
                                              yuyue_apply_agin = 0
                                          }
                                      })

                                  }

							 }
						
/*******************************微信招标************************************/
									}
						else
						{
							alert(res.msg); 
						} 
							 
					}              
			  });
/*******************************微信招标************************************/ }

function checkFreeDesign(obj){//免费设计验证
  if(obj == undefined ) {
    obj = false;
  }else{
    obj = true;
  };
  jq('.fq_text[name="yourname"]').checkForm({className:"fb_check",content:["称呼不可为空"],type:[1],checkFormType:obj});
  jq('.fq_text[name="youriphone"]').checkForm({className:"fb_check",content:["手机号码不可以为空","请填写正确的手机号码"],type:[1,2], reg:0,checkFormType:obj});
};

function checkFreeBooking(obj){//免费申请预约验证
  if(obj == undefined ) {
    obj = false;
  }else{
    obj = true;
  };
  jq('.fb_area').checkForm({className:"fb_check",content:["请填写建筑面积","请填写有效的建筑面积"],type:[1,2],reg:2,checkFormType:obj});
  jq('.fb_phone').checkForm({className:"fb_check",content:["手机号码不可以为空","请填写正确的手机号码"],type:[1,2], reg:0,checkFormType:obj});
  jq('.fb_qq').checkForm({className:"fb_check",content:["QQ号不能为空","请填写有效的QQ号"],type:[1,2], reg:1,checkFormType:obj});
  jq('.fb_email').checkForm({className:"fb_check",content:["","E-mail格式不正确"],type:[2],reg:2,checkFormType:obj});
};


//免费帮我设计弹框
function freeDesign(obj, toid, ptag) {
    var ptag = arguments[2] ? arguments[2] : '1_5_1_1';
    var str = '<div class="freeQuote_box_content clear">' +
			  '<div id="form"><input type="hidden" name="toid" value="'+toid+'" />' +
			  '<ul>' +
			  '<li><span class="fbc_name">您的称呼</span><input type="text" class="fq_text" name="yourname"></li><li><span class="fbc_name">手机号码</span><input type="text"class="fq_text" name="youriphone"></li>' +
			  '<li><span class="fbc_name">所在城市</span><select class="fq_sheng" id="User_Shen1" name="User_Shen1" onchange="changeProvince(\'User_Shen1\',\'User_City1\',\'User_Town1\');"><option value="1">省/市</option></select><select class="fq_shi"  id="User_City1" name="User_City1" onchange="changeTown(\'User_Shen1\',\'User_City1\',\'User_Town1\');"><option value="0">市/地区</option></select><div style="display:none;"><select class="langSelect" id="User_Town1" name="User_Town1"><option>县/区</option></select></div></li>' +
			  '</ul>' +
			  '<input type="submit" submit_type="ajax_design" value="免费申请" class="fq_btn" onClick="javascript:checkFreeBookingForm(this,\''+ptag+'\', \''+toid+'\')">' +
			  '<span class="fq_free_line">全国免费热线:400-6900-288</span><div class="fq_description"><em></em>为了你的利益及我们的口碑，你的隐私将被严格保密。</div>' +
			  '</div></div>';
      jq('.window_box').windowBox({
          width:480,    //弹框宽度
          title:"申请免费设计", //标题
          littleTitle:"您将获得3套设计方案参考",
          wbcStr:str,  //可编辑内容
          cancleBtn:false,    //是否显示取消按钮
          confirmBtn:false,  // 是否显示确认按钮
          callback:false
      });
    gpm.def_province = ["省/市", ""];
    gpm.def_city1 = ["市/地区", ""];
	  gpm.initProvince($("User_Shen1"));	

};

function checkFreeBookingForm(obj, ptag, whoid) {
    var ptag = arguments[1] ? arguments[1] : '';
	var a = jq(obj).parent().find('.fq_text[name="yourname"]').checkForm({className:"fb_check",content:["称呼不可为空"],type:[1],checkFormType:obj, displayNum:true});
	var b = jq(obj).parent().find('.fq_text[name="youriphone"]').checkForm({className:"fb_check",content:["手机号码不可以为空","请填写正确的手机号码"],type:[1,2], reg:0,checkFormType:obj, displayNum:true});
	var c = jq(obj).parent().find('.fq_sheng[name="User_Shen1"]').checkForm({className:"fb_check",content:["请选择您的所在地"],type:[1],checkFormType:obj, displayNum:true,checkType:"select"});
	if(c == 0) {
		var d = jq(obj).parent().find('.fq_shi[name="User_City1"]').checkForm({className:"fb_check",content:["请选择您的所在地"],type:[1],checkFormType:obj, displayNum:true,checkType:"select"});   
	}
    if (a == 0 && b == 0 && c == 0 && d == 0) {
        submit_ajax(obj, ptag, whoid)
    }
}
//免费帮我报价
function freePrice(obj,toid){
	var str = '<div class="freeQuote_box_content clear">' +
			  '<div id="form"><input type="hidden" name="toid" value="'+toid+'" />' +
			  '<ul>' +
			  '<li><span class="fbc_name">您的称呼</span><input type="text"class="fq_text" name="yourname"></li><li><span class="fbc_name">手机号码</span><input type="text"class="fq_text" name="youriphone"></li>' +
			  '<li><span class="fbc_name">所在城市</span><select class="fq_sheng" id="User_Shen1" name="User_Shen1" onchange="changeProvince(\'User_Shen1\',\'User_City1\',\'User_Town1\');"><option value="1">省/市</option></select><select class="fq_shi"  id="User_City1" name="User_City1" onchange="changeTown(\'User_Shen1\',\'User_City1\',\'User_Town1\');"><option value="0">市/地区</option></select><div style="display:none;"><select class="langSelect" id="User_Town1" name="User_Town1"><option>县/区</option></select></div></li>' +
			  '</ul>' +
			  '<input type="submit" submit_type="ajax_price" value="免费申请" class="fq_btn" onClick="javascript:checkFreeBookingForm(this, \'\', \''+toid+'\')">' +
			  '<span class="fq_free_line">全国免费热线:400-6900-288</span><div class="fq_description"><em></em>为了你的利益及我们的口碑，你的隐私将被严格保密。</div>' +
			  '</div></div>';
      jq('.window_box').windowBox({
          width:480,    //弹框宽度
          title:"免费申请装修报价", //标题
          littleTitle:"帮您节省半年的工资",
          wbcStr:str,  //可编辑内容
          cancleBtn:false,    //是否显示取消按钮
          confirmBtn:false,  // 是否显示确认按钮
          callback:false
      });
  gpm.def_province = ["省/市", ""];
  gpm.def_city1 = ["市/地区", ""];
	gpm.initProvince($("User_Shen1")); 
};

//免费报价申请成功
function freeSuceess(obj){
	var successStr = '<div class="apply_success"><span class="as_true"></span><strong>恭喜您，申请成功!</strong><em>土巴兔客服将于24小时内与您联系！</em></div>';
	  jq('.window_box').windowBox({
		  width:480,
		  height:200,
		  title:"提示",
		  wbcStr:successStr,
		  closeTime:3000
	  })
};

//免费报价申请失败
function freeFail(obj,city){ 
	var failStr = '<div class="apply_fail"><span class="as_fail"></span><strong>非常抱歉,您当前的城市'+city+'尚未开通装修服务，敬请期待！</strong></div>';
	jq('.window_box').windowBox({
		width:480,
		height:257,
		title:"提示",
		wbcStr:failStr,
		closeTime:3000
	  })
};



