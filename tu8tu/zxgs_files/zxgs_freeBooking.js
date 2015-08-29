/** 
 * 免费申请预约
 * Date: 2014-08-27
 * By: Gavin 
 */
var cityCode = getCookie('to8to_tcode') || 0; 
function freeBooking(obj,special){
	var bookingStr = '', ptag='', titleName, descriptContent;
  if(special=="1"){
    titleName="免费做设计与报价";
    descriptContent="为了您的利益及我们的口碑，您的隐私将被严格保密。"
  }else{
    titleName="免费预约装修公司";
    descriptContent="预约需要土巴兔来审核，请耐心等待，我们会在收到您的信息之后第一时间和您取得联系！"
  }
        if(typeof(obj.ptag) != 'undefined' ){
            ptag = obj.ptag;
        }
  bookingStr += '<form id="yyForm"><input type="hidden" value="7" name = "sourceid"/>';
  bookingStr += '<input type="hidden" value="'+obj.toid+'" id="toid" name="toid">';
  bookingStr += '<input type="hidden" id="s_source" value="'+obj.s_source+'" name="s_sourceid">';
  bookingStr += '<input type="hidden" name="ptag" id="ptag" value="'+ptag+'">';
  bookingStr += '<div class="free_booking"><ul>';
  bookingStr += '<li class="height_auto"><span class="fb_title">您的称呼</span><input type="text" name="name" id="name" class="fq_text fq_text2"></li>';
  bookingStr += '<li><span class="fb_title">手机号码</span><input type="text" name="phone" id="phone" class="fq_text fq_text2"></li>';
  bookingStr += '<li><span class="fb_title">所在城市</span><select class="fb_province"  id="User_Shen2" name="User_Shen" onchange="changeProvince(\'User_Shen2\',\'User_City2\',\'User_Town2\');"><option>省/市</option></select><select class="fb_city"  id="User_City2" name="User_City" onchange="changeTown(\'User_Shen2\',\'User_City2\',\'User_Town2\');"><option value="">市/地区</option></select><div style="display: none;"><select class="langSelect" id="User_Town2" name="User_Town2"><option>县/区</option></select></div></li>';
  bookingStr += '</ul>';
  bookingStr += '<div class="fb_upload"><input type="button" id="saveYY" value="提交" onClick=javascript:checkFreeBooking(this)><em>全国免费热线:400-6900-288</em></div>';
  bookingStr += '<div class="fb_description"><b></b><em>'+descriptContent+'</em></div></div></form>';

	jq('.window_box').windowBox({
		width:459,
		title:''+titleName+'',
                littleTitle:"装修立省30%",
		wbcStr:bookingStr
	  });
  gpm.def_province = ["省/市", ""];
  gpm.def_city1 = ["市/地区", ""];
  gpm.initProvince($("User_Shen2"));
  
}
function checkFreeBooking(obj){//免费申请预约验证
   var myData = 'city='+cityCode+':id='+(window.whoid||0);
    if(jq("#ptag").val() != ''){
        clickStream.getCvParams( jq("#ptag").val() );     //埋点
    }
  var obj = jq(obj).parent()[0];
  var chkForm = jq(this).parents('form'); 
  var nNameValue = jq('input[name="name"]').checkForm({className:"fb_check",content:["称呼不可以为空"],type:[1],checkFormType:obj,displayNum:true});
  var nPhoneValue = jq('input[name="phone"]').checkForm({className:"fb_check",content:["手机号码不可以为空","请填写正确的手机号码"],type:[1,2], reg:0,checkFormType:obj,displayNum:true})
  var sheng = jq('#User_Shen2').checkForm({className:"fb_check",content:["请选择你的所在地"],type:[1], reg:0,checkFormType:obj,checkType:"select",displayNum:true});
  if(sheng == 0) {
    var city = jq('#User_City2').checkForm({className:"fb_check",content:["请选择你的所在地"],type:[1], reg:0,checkFormType:obj,checkType:"select",displayNum:true});
  }

  if(nNameValue == 0 && nPhoneValue ==0 && sheng ==0 && city ==0){
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
      var encryptData = rsaEncryptNameAndPhone({phoneObj: jq('#yyForm').find('input[name="phone"]'), chenhuObj: jq('#yyForm').find('input[name="name"]')});
	  jq.ajax({
          type: "POST",
          url: "/zb/index.php",
        data: jq("#yyForm").serialize()+encryptData,
        success: function(data){
            var res = jq.parseJSON(data);
            //JSON.parse(result); 
           jq ('.window_box').remove();
            jq("form").each(function(){
                this.reset();
				jq(this).find(".login_select > span").show();
            }); 
			
			if (res.status == 5)
			{
				
				 window_box_close();
					 indexYYFail(res.cityname);
					 return false;
		
				  //backFirstFrame();
				  //jq("#tmpCity").html(res.cityname);
			}
            if (res.status == 1) {
				if (!res.tmpYid)
				{
					overFive();
				}
                jq("#free_zhaobiao_form").hide();
                jq("#free_zhaobiao_result_news").show();
				
				//add by alan 2014/9/4
				/*var successStr = zb_first_pop(weixin_code,res.tmpYid);
				jq('.window_box').windowBox({
				  width:560,
				  title:"提示",
				  wbcStr:successStr,
					closeFn:'stop_code_status'
				});
                zb_getwxstatus(start_qrcode_id,res.tmpYid);*/
                indexSubZbStepOneNew(res, weixin_code, 2, myData);
				zb_getwxstatus(start_qrcode_id, res.tmpYid);
				var i = jq('#zxb_addamount').html();
				jq('#zxb_addamount').html(parseInt(i)+1);

				var i2 = jq('span.apply_dn').html();
				jq('span.apply_dn').html(parseInt(i2)+1);
				var i3 = jq('span.apply_mn').html();
				jq('span.apply_mn').html(parseInt(i3)+1);
                return false;
            }
            else if(res.status == 5)
            {
                showPopWin("http://www.meijialz.com/zb/frame_global.php?status=" + res.status + "&msg=" + res.cityname, 456, 254, null, true);
            }
            else
            {
                var cityname = encodeURI(res.cityname);
                var tyid     = encodeURI(res.tmpid);
                showPopWin("http://www.meijialz.com/zb/frame_global.php?msg="+cityname + "&tyid=" + tyid , 456, 254, null, true);
            }   
			
			
        },
        error: function(){
            window_box_close();
            freeFail_one();
        }
     });
/*******************************微信招标************************************/  						  
									}
						else
						{
							alert(res.msg); 
						} 
							 
					}              
			  });
/*******************************微信招标************************************/ }

};

function checkBookStylist() {
  
  jq('input[name="name"]').checkForm({className:"fb_check",content:["称呼不可以为空"],type:[1]});
  jq('input[name="phone"]').checkForm({className:"fb_check",content:["手机号码不可以为空","请填写正确的手机号码"],type:[1,2], reg:0});
}

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
//申请失败
function freeFail_one(obj){
	var failStr = '<div class="apply_fail"><span class="as_fail"></span><strong>非常抱歉,您当前的申请失败，请稍候再试！</strong></div>';
	jq('.window_box').windowBox({
		width:480,
		height:257,
		title:"提示",
		wbcStr:failStr,
       closeTime:3000

	  })
};

//免费报价申请失败
function freeFail_notkt(city){ 
  var failStr = '<div class="apply_fail"><span class="as_fail"></span><strong>非常抱歉,您当前的城市'+city+'尚未开通装修服务，敬请期待！</strong></div>';
  jq('.window_box').windowBox({
    width:480,
    height:257,
    title:"提示",
    wbcStr:failStr,
    closeTime:3000
    })
};

jQuery(function() {
  try{
    var footObj = document.getElementById('out_footer'),
        wrapObj = document.getElementById('i_body'),
        htmlObj = document.documentElement,
        bodyObj = document.body,
        windowHeight  = htmlObj.clientHeight || bodyObj.clientHeight,
        docScrollHeihgt =  htmlObj.scrollHeight || bodyObj.scrollHeight,
        wrapHeight = wrapObj.offsetHeight,
        cb = (function() {
            var u = window.navigator.userAgent.toLocaleLowerCase(),
            msie = /(msie) ([\d.]+)/,
            chrome = /(chrome)\/([\d.]+)/,
            firefox = /(firefox)\/([\d.]+)/,
            safari = /(safari)\/([\d.]+)/,
            opera = /(opera)\/([\d.]+)/,
            ie11 = /(trident)\/([\d.]+)/,
            b = u.match(msie)||u.match(chrome)||u.match(firefox)||u.match(safari)||u.match(opera)||u.match(ie11);
            return {name: b[1], version: parseInt(b[2])};
        })();
       
    if(docScrollHeihgt <= windowHeight){//文档高度小于窗口高度
      if(cb.version < 8 && cb.name == 'msie'){
        footObj.style.position = 'absolute';
        htmlObj.style.overflowY = 'hidden';
      } else {
        footObj.style.position = 'fixed';
      }
      
      wrapObj.style.height =  windowHeight + "px";
      footObj.style.width =  '100%';
      footObj.style.backgroundColor = '#fff';
      footObj.style.bottom = 0;
    }
  }catch(e){

  } 
}); 