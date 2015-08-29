var yuyue_apply_agin=0; 
function isTel(str){
    var reg=/^([0-9]|[\-])+$/g ;
    if(str.length<7 || str.length>18){
        return false;
    }
    else{
        return reg.exec(str);
    }
}

function indexSubZb(i) {//全国站首页申请
    var biao = 1,demo='',
        errDiv = jq('.check_text').eq(i - 1),
        thisForm = jq('.sub_zb_form').eq(i - 1),
        nameVal = thisForm.find('input[name=chenhu]').val(),
        phoneVal = thisForm.find('input[name=phone]').val(),ptag;           //手机
        phonePre = phoneVal;   
         //加密之後的手機號
        // phoneVal = RSAUtils.encryptfun(phoneVal);
  var encryptData = rsaEncryptNameAndPhone({phoneObj:thisForm.find('input[name=phone]'),chenhuObj:thisForm.find('input[name=chenhu]')});


        // rsastr = 1;
	switch(i){
		case 1:demo='免费户型设计';ptag='1_1_2_1';break;
		case 2:demo='精准装修报价';ptag='1_1_2_2';break;
		case 3:demo='装修保';ptag='1_1_2_3';break;
		case 4:demo='免费验房';ptag='1_1_2_4';break;
		case 5:demo='第三方监理';ptag='1_1_2_5';break;
	}
	demo=',来源于全国站首页:'+demo;
		
    jq.ajax({
        type: "POST",
        url: "/zb/index.php",
        data: "type=0"+ "&demo=" + demo + "&i=" + i+"&ptag=" + ptag+encryptData,
        beforeSend:function(){
            var reg1 =/^((\(\d{2,3}\))|(\d{3}\-))?(13|15|18)\d{9}$/;    //判断手机  
            if (!isTel(phonePre) && !reg1.test(phonePre)) {
                errDiv.removeClass('cor_text').addClass('err_text').text('* 电话号码错误');
                return false;
            }
            if (nameVal == '请输入您的姓名') {
                errDiv.removeClass('cor_text').addClass('err_text').text('* 请输入您的姓名');
                return false;
            }
            if (yuyue_apply_agin > 0) {
                return false;
            } else {
                yuyue_apply_agin++;
            }
        },
        success: function(result) {
            if (typeof(JSON) == "undefined") {
                var res = eval("(" + result + ")")
            } else {
                var res = JSON.parse(result)
            }
            yuyue_apply_agin = 0;
            if (res.status == 1) {
                showPopWin('http://www.meijialz.com/ask/popdialog.php?info=1', 369, 145, null, false);
                return false;
                jq("#izxlc_cmdl_" + id + "_" + sid).html('<a target="_blank" href="http://bbs.meijialz.com/forum-1582-1.html"><img src="http://img.meijialz.com/front_end/pic/index_v3_tjym.jpg" /></a>')
            }
            else if(res.status == 5)
            {
                showPopWin("http://www.meijialz.com/zb/frame_global.php?status=" + res.status + "&msg=" + res.cityname, 456, 254, null, true);
                return false;
            }
            else
            {
                var cityname = encodeURI(res.cityname);
                var tyid     = encodeURI(res.tmpid);
                showPopWin("http://www.meijialz.com/zb/frame_global.php?msg="+cityname + "&tyid=" + tyid , 456, 254, null, true);
                return false;
            }               
        }
    });
}

function flashZhaoBiao(){
    var phone = jq("#myphone2")[0].value;
    var word =  jq("#word")[0].value;
    var biao = 0;
    var phonePre = phone;
  // phone = RSAUtils.encryptfun(phone);

    var encryptData = rsaEncryptNameAndPhone({phoneObj:jq("#myphone2")[0]});
	
   /* if ($('biao11').checked){
        biao = 1;
    }*/
    jq.ajax({
        type: "POST",
        url: "/zb/index.php",
        data: "type=1"+"&biao="+biao+"&word="+word+encryptData,
        beforeSend:function(){
            var reg1 =/^((\(\d{2,3}\))|(\d{3}\-))?(13|15|18)\d{9}$/;                     //判断 手机  
               
            if(!isTel(phonePre) &&  !reg1.test(phonePre))
            {
                $('erro_msg2').innerHTML = '请填写真实的联系电话。';
                jq("#myphone2")[0].focus();
                return false;
            }
           /* else if(!$('biao01').checked && !$('biao11').checked)
            {            
                $('erro_msg2').innerHTML = '是否优先考虑有保障金公司？';
                jq("#biao01")[0].focus();
                return false;
            }*/
			if(yuyue_apply_agin>0){
				return false;
			}else{
				yuyue_apply_agin++;
			}
			
        },
        success: function(result) {
            var res = JSON.parse(result);
            jq("#flash_zhaobiao_form").hide();
            jq("#flash_zhaobiao_result_news").show();
          	yuyue_apply_agin=0;
            jq("form").each(function(){
                this.reset();
				jq(this).find(".login_select > span").show();
            });      
        }
    })
	try {
		_tsa.push(['trackEvent', 154, 0.00]);
	}catch(e){}
}



function freeZhaoBiao(n){

	try{
		
		var ptag='1_4_2_1';
		if(n==6){
			ptag='1_4_1_1';
		}
		if(n==7){
			ptag='1_4_3_1';
		}
		if(n==2){
			ptag='1_3_5_2';
		}
        if (n == 8) {
            ptag = '1_4_6_1';
        }
        if (n == 9) {
            ptag = '1_4_8_1';
        }
        if (n == 10) {
            ptag = '1_1_1_96';
        }
        if (n ==11)
        {
            ptag = '1_4_24_1'
        }
        if (n ==12)
        {
            ptag = '6_5_1_10'
        }
        if(n !=9)
		clickStream.getCvParams(ptag);
		jq("#ptag").val(ptag);
    var chenghu = jq("#chenghu")[0].value;
    var phone = jq("#myphone1")[0].value;
     //把加密之后的数据放回表单
    // var phone1 = RSAUtils.encryptfun(phone) ;
      var encryptData = rsaEncryptNameAndPhone({phoneObj:jq("#myphone1"),chenhuObj:jq("#chenghu")});

    jq("#myphone1").val(phone1);
	
    var shen = jq("#User_Shen")[0].value;
    var city = jq("#User_City")[0].value;
    var town = jq("#User_Town")[0].value;
    var oarea = jq("#oarea")[0].value;
    var zxys = jq("#zxys")[0].value;
    var demo = jq("#demo")[0].value; 
	var yuyue_type = jq("#yuyue_type")[0].value;
    var word = jq("#word")[0].value;
    var biao = 0;
	var sourceid = jq("#sourceid")[0].value;
	var s_sourceid = jq("#s_sourceid")[0].value;
	var zblx = jq("#zblx").val();
	var zxtype = jq("#zxtype").val();
	
	}catch(e){
		
	}
    if ($('biao1').checked){
        biao = 1;
    }
	/*******************************微信招标************************************/  
			  var weixin_code = ''; 
			  var start_qrcode_id = '';
			  jq.ajax({  
						async:true, 
						type:"GET",      
						dataType: 'jsonp',    
						url:"http://www.meijialz.com/api/weixin/run.php",      
						data:{action:'createQrcode',cookie_id:'test',data:'createWxCode',type:1}, 
						success:function(res){ 
								if(res.code==0)
								{
									weixin_code = res.url;
									start_qrcode_id = res.qrcode_id;
	/*******************************微信招标************************************/ 
    jq.ajax({
        type: "POST",
        url: "/zb/index.php",
        /*data:{
           encryptData:encryptData,
            User_Shen : shen,
            User_City : city,
            User_Town : town,
            ptag : ptag
        },*/
        data: "User_Shen="+jq("#User_Shen").val()+"&User_City="+jq("#User_City").val()+'&ptag='+ptag+encryptData,
        // data : jq('#free_zhaobiao').serialize(),  //
		beforeSend:function(){	          
        jq('div.saving_form').find('input[name="yourname"]').val();		
            var reg1 =/(\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/;                     //判断 手机
            
            if(!chenghu || chenghu=='真实姓名' || chenghu=='称呼')
            {
               
                try{
                	 $('erro_msg').innerHTML = '请填写您的称呼';
                	 jq('#chenghu').parent().find('div.zb_mes_error').remove();
					 jq( '.zb_mes_input_one' ).css('border-color','#e8e8e8');
					 jq( '.zb_mes_name' ).css( 'border-color','#fec1c1' );
                     // alert('请填写您的称呼');
                	 // jq('#chenghu').after("<div class=\"zb_mes_error\"><em></em>请输入您的称呼</div>");
    			}catch(e){}
				if( jq( '.container_width' ).length != 1){
                  jq("#chenghu")[0].focus();
				};
                return false;
            }
            else if(!isTel(phone) && !reg1.test(phone))
            {    
                
                try{
					jq('#chenghu').parent().find('div.zb_mes_error').remove();
					jq( '.zb_mes_input_one' ).css('border-color','#e8e8e8');
                	$('erro_msg').innerHTML = '请填写真实的联系电话。';          
            
                	jq('#myphone1').parent().find('div.zb_mes_error').remove();
					jq( '.zb_mes_phone' ).css( 'border-color','#fec1c1' );
                    //alert('请填写真实的联系电话。');
                	// jq('#myphone1').after("<div class=\"zb_mes_error\"><em></em>您的电话输入有误</div>");
                }catch(e){}
				if( jq( '.container_width' ).length != 1){
                   jq("#myphone1")[0].focus();
				}
                return false;
            }
            
            /*else if(!town)
            {
                $('erro_msg').innerHTML = '请选择所在城市与区域。';
                jq("#User_Town")[0].focus();
                return false;
            }
            else if(!isDigit(parseInt(oarea)))
            {
                $('erro_msg').innerHTML = '请合理填写建筑面积，数字！';
                jq("#oarea")[0].focus();
                return false;
            }
            else if(!parseInt(zxys))
            {
                $('erro_msg').innerHTML = '请选择您的装修预算。';
                jq("#zxys")[0].focus();
                return false;
            }
            else if(!$('biao0').checked && !$('biao1').checked)
            {
                $('erro_msg').innerHTML = '是否优先考虑有保障金公司？';
                jq("#biao0")[0].focus();
                return false;
            }*/
			if(yuyue_apply_agin>0){
				return false;
			}else{
				yuyue_apply_agin++;
			}
					
        },
        success: function(result) {
			
			jq( '.zb_mes > ul > li > input' ).css('border-color','#e8e8e8');
			jq( '.zb_mes_error ').remove();   
            var res = jq.parseJSON(result);
            //JSON.parse(result); 
            yuyue_apply_agin=0;
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
										yuyue_apply_agin = 0;
                                        setTimeout(function() {
                                            reSizeBarWidtgh();
                                        }, 200);
										return;	
									}
									jq("#free_zhaobiao_form").hide();
									jq("#free_zhaobiao_result_news").show();
									
									/*var successStr = zb_first_pop(weixin_code,res.tmpYid);
									jq('.window_box').windowBox({
									  width:560,
									  title:"提示",
									  wbcStr:successStr,
								  		closeFn:'stop_code_status'
									});*/
									
									//更改部分，完善资料弹窗
									//indexSubZbStepOne(res,weixin_code);
									
									//zb_getwxstatus(start_qrcode_id,res.tmpYid);
									
									/*var loc = window.location.toString(),
										yanfang = loc.indexOf('index6');
									if(yanfang != -1) {//验房不需要完善资料
										var successStr = zb_first_pop(weixin_code,res.tmpYid);
										jq('.window_box').windowBox({
										  width:560,
										  title:"提示",
										  wbcStr:successStr,
											closeFn:'stop_code_status'
										});
										zb_getwxstatus(start_qrcode_id,res.tmpYid);
									} else {
										indexSubZbStepOneNew(res,weixin_code);	
									}*/
									indexSubZbStepOneNew(res,weixin_code);	
									
									setTimeout(function() {
										reSizeBarWidtgh();	
									},200);
									var i = jq('#zxb_addamount').html();
									jq('#zxb_addamount').html(parseInt(i)+1);
					
									var i2 = jq('span.apply_dn').html();
									jq('span.apply_dn').html(parseInt(i2)+1);
									var i3 = jq('span.apply_mn').html();
									jq('span.apply_mn').html(parseInt(i3)+1);


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
			// try{
			// 	jq('#tj').html('<iframe src="http://www.meijialz.com/api/test.html"></iframe>');
			// }catch(e){}
            // alert(res.req);
			// window.location=res.req;			//'/zb/?success=1';
        }
    })
	
/*******************************微信招标************************************/  						  
									}
						else
						{
							alert(res.msg); 
						} 
							 
					}              
			  });
/*******************************微信招标************************************/ /*try {
		_tsa.push(['trackEvent', 153, 0.00]); 
	}catch(e){}*/
        if(n == 0){
            try{_tsa.push(['_trackEvent', '访客', '点击','找公司']);}catch(e){}
        }
        if(n == 2){
            try{_tsa.push(['_trackEvent', '访客', '点击','设计']);}catch(e){}
        }
        if(n == 5){
            try{_tsa.push(['_trackEvent', '访客', '点击','预算']);}catch(e){}
        }
         if(n == 6){
            try{_tsa.push(['_trackEvent', '访客', '点击','验房']);}catch(e){}
        }
         if(n == 7){
            try{_tsa.push(['_trackEvent', '访客', '点击','找监理']);}catch(e){}
        }
}

function reSizeBarWidtgh() {
	var winWidth = jq(window).width(),
		obj = checkBrowser();
	if(winWidth > 1220 && obj.name == "msie" && obj.version < 9) {
		jq(".top_bar > a").width((winWidth - 17)/3);	
	}	
}

function resetZB(type){
	var yuyue_apply_agin=0;
    if (type==1){           
        jq("form").each(function(){
            this.reset();
			jq(this).find(".login_select > span").show();
        });
        jq("#free_zhaobiao_form").show();
        jq("#free_zhaobiao_result").hide();
    }else{
        jq("form").each(function(){
            this.reset();
			jq(this).find(".login_select > span").show();
        });
        jq("#flash_zhaobiao_form").show();
        jq("#myphone2").val('');    
        jq("#flash_zhaobiao_result").hide();              
    }    
}







function sjZhaoBiao(){
    var chenghu = jq("#chenghu")[0].value;
    var phone = jq("#myphone1")[0].value;
    var shen = jq("#User_Shen")[0].value;
    var city = jq("#User_City")[0].value;
    var town = jq("#User_Town")[0].value;
    var oarea = jq("#oarea")[0].value;
    var hometype = jq("#hometype")[0].value;
    var demo = jq("#demo")[0].value;    
    var biao = 0;
    var id = jq("#sj_biao_id")[0].value;
    var sid = jq("#sj_biao_sid")[0].value;
    if ($('biao1').checked){
        biao = 1;
    }
    jq.ajax({
        type: "POST",
        url: "http://sjs.meijialz.com/zb/zbAjax.php",
        data: "ajax=1&sourceid="+id+"&s_sourceid="+sid+"&phone="+phone+"&chenghu="+chenghu+"&User_Shen="+shen+"&User_City="+city+"&User_Town="+town+"&oarea="+oarea+"&hometype="+hometype+"&demo="+demo+"&biao="+biao+"&rsastr=" + rsastr,
        beforeSend:function(){
            var reg1 =/^((\(\d{2,3}\))|(\d{3}\-))?(13|15|18)\d{9}$/;                     //判断 手机  
            if(!chenghu)
            {
                $('erro_msg').innerHTML = '请填写您的称呼。';
                jq("#chenghu")[0].focus();
                return false;
            }
            else if(!isTel(phone) && !reg1.test(phone))
            {            
                $('erro_msg').innerHTML = '请填写真实的联系电话。';            
                jq("#myphone1")[0].focus();
                return false;
            }
            else if(!town)
            {
                $('erro_msg').innerHTML = '请选择所在城市与区域。';
                jq("#User_Town")[0].focus();
                return false;
            }
            else if(!isDigit(parseInt(oarea)))
            {
                $('erro_msg').innerHTML = '请合理填写建筑面积，数字！';
                jq("#oarea")[0].focus();
                return false;
            }
            else if(!parseInt(hometype))
            {
                $('erro_msg').innerHTML = '请选择您的房屋类型。';
                jq("#hometype")[0].focus();
                return false;
            }
			if(yuyue_apply_agin>0){
				return false;
			}else{
				yuyue_apply_agin++;
			}
			
        },
        success: function(result) {   
            var res = JSON.parse(result);    
            jq("#sj_zhaobiao_form").hide();
            jq("#sj_zhaobiao_result").show();
            jq("#sj_zhaobiao_result>dd")[0].innerHTML = res.msg;
            yuyue_apply_agin=0;          
            jq("form").each(function(){
                this.reset();
				jq(this).find(".login_select > span").show();
            });
        }
    })
}

function referURL(url){
    var isIe=(document.all)?true:false;
    if(isIe) {
        var linka = document.createElement("a");
        linka.href=url;
        document.body.appendChild(linka);
        linka.click();
    }else {
        window.location = url;
    }
}



function needLogin(url){
    var txt = '欢迎下载土巴兔设计资源，下载之前请先登录，没有用户请先注册。';
    jq.prompt(txt,{
        buttons:{
            点击登录:1,
            去注册:2
        },
        callback: function(v,m,f){
            if(v == 1){
                referURL(url);
            }else if (v==2){
                window.location.href='http://www.meijialz.com/reg/';   
            }
        }
    });
}

function downloadFile(url,mid){
    var txt = '欢迎下载土巴兔设计资源，请选择下载通道：<br/><a onclick="document.getElementById(\'rar\').value=\''+mid+'\';document.getElementById(\'download_form\').submit(); this.href=\''+url+'\'" href="javascript:" class="highlight">中国电信</a> <a onclick="document.getElementById(\'rar\').value=\''+mid+'\';document.getElementById(\'download_form\').submit(); this.href=\''+url+'\'" href="javascript:" class="highlight">中国网通</a> <a onclick="document.getElementById(\'rar\').value=\''+mid+'\';document.getElementById(\'download_form\').submit(); this.href=\''+url+'\'" href="javascript:"  class="highlight">长城宽带</a>';
	
    jq.prompt(txt,{
        show:'slideDown',
        timeout:7000
    });
}

function switchJb(id){
    jq.ajax({
        type: "POST",
        url: "/zt/zhuanti.php",
        data: "AJAX=1&id="+id,
        beforeSend:function(){
            
        },
        success: function(result) {
            var res = JSON.parse(result);
            jq("img[id^='jia_img_']").css('border','1px solid #ccc');
            jq("img#jia_img_"+id).css('border','2px solid #ffb900');
            jq("#zt_t_right")[0].innerHTML = res.vurl;
            jq("dl[id^='intro_']").hide();
            jq("dl#intro_"+id).show();
        }
    })
}

function dy_phone(){
	var dy_phone = jq("#dy_phone")[0].value;
    jq.ajax({
        type: "POST",
        url: "/yezhu/jhkj/index.php",
        data: "dy_phone="+dy_phone+"&type=dy_phone_cr",
        beforeSend:function(){
            if(!(/^(13|14|15|18)\d{9}$/g.test(dy_phone)))
            {         
				sjdy_show();
                $('erro_msg').innerHTML = '请填写真实的手机号码。';            
                jq("#dy_phone")[0].focus();
                return false;
            }
        },
        success: function(result) {            
            var res = JSON.parse(result);       
			sjdy_close();
			alert(res.msg);
        }
    })
}

function dy_phone_yz(){
	var dy_phone = jq("#dy_phone")[0].value;
	jq.ajax({
		type: "POST",
		url: "/yezhu/jhkj/index.php",
		data: "dy_phone="+dy_phone+"&type=dy_phone_yz",
		beforeSend:function(){  
            if(!(/^(13|14|15|18)\d{9}$/g.test(dy_phone)))
            {            
                $('erro_msg').innerHTML = '请填写真实的手机号码。';            
                jq("#dy_phone")[0].focus();
                return false;
            }
        },
		success: function(result){
			var res = JSON.parse(result);
			jq("#dy_phone").each(function(){
				$('erro_msg').innerHTML = res.msg;
			}); 
		}
	});	
}
function dy_tx(type){
	var oarea = jq("#oarea")[0].value;
	var shhtml = '';
	townid=getCookie('to8to_townid');
	
	if(townid==1130 || townid==1672 || townid==1103 || townid==1121){
		if(oarea>0 && oarea<150){
			pt_ys = Math.round(oarea*450/1000)/10;
			gd_ys = Math.round(oarea*650/1000)/10;
			hh_ys = Math.round(oarea*900/1000)/10;
			shhtml=shhtml + '<div><em>经济型:</em><span>'+pt_ys+'万</span></div>';
			shhtml=shhtml + '<div><em>中档型:</em><span>'+gd_ys+'万</span></div>';
			shhtml=shhtml +'<div><em>豪华型:</em><span>'+hh_ys+'万</span></div>';
			shhtml=shhtml +'<div class="ts_zxys" onclick="dy_tx(0);"></div>';
			$("tx_zxys").innerHTML=shhtml;
			jq("#if_tz_zxys").show();
			jq("#tx_zxys").show();
		}else if(oarea>=150 && oarea<=300){	
			pt_ys = Math.round(oarea*600/1000)/10;
			gd_ys = Math.round(oarea*1000/1000)/10;
			hh_ys = Math.round(oarea*1500/1000)/10;
			shhtml=shhtml + '<div><em>经济型:</em><span>'+pt_ys+'万</span></div>';
			shhtml=shhtml + '<div><em>中档型:</em><span>'+gd_ys+'万</span></div>';
			shhtml=shhtml +'<div><em>豪华型:</em><span>'+hh_ys+'万</span></div>';
			shhtml=shhtml +'<div class="ts_zxys" onclick="dy_tx(0);"></div>';
			$("tx_zxys").innerHTML=shhtml;
			jq("#if_tz_zxys").show();
			jq("#tx_zxys").show();
		}else{
			jq("#tx_zxys").hide();	
			jq("#if_tz_zxys").hide();
		}
		
	}else{
		if(oarea>0 && oarea<150){
			pt_ys = Math.round(oarea*400/1000)/10;
			gd_ys = Math.round(oarea*600/1000)/10;
			hh_ys = Math.round(oarea*800/1000)/10;
			shhtml=shhtml + '<div><em>经济型:</em><span>'+pt_ys+'万</span></div>';
			shhtml=shhtml + '<div><em>中档型:</em><span>'+gd_ys+'万</span></div>';
			shhtml=shhtml +'<div><em>豪华型:</em><span>'+hh_ys+'万</span></div>';
			shhtml=shhtml +'<div class="ts_zxys" onclick="dy_tx(0);"></div>';
			$("tx_zxys").innerHTML=shhtml;
			jq("#if_tz_zxys").show();
			jq("#tx_zxys").show();
		}else if(oarea>=150 && oarea<=300){	
			pt_ys = Math.round(oarea*500/1000)/10;
			gd_ys = Math.round(oarea*900/1000)/10;
			hh_ys = Math.round(oarea*1400/1000)/10;
			shhtml=shhtml + '<div><em>经济型:</em><span>'+pt_ys+'万</span></div>';
			shhtml=shhtml + '<div><em>中档型:</em><span>'+gd_ys+'万</span></div>';
			shhtml=shhtml +'<div><em>豪华型:</em><span>'+hh_ys+'万</span></div>';
			shhtml=shhtml +'<div class="ts_zxys" onclick="dy_tx(0);"></div>';
			$("tx_zxys").innerHTML=shhtml;
			jq("#if_tz_zxys").show();
			jq("#tx_zxys").show();
		}else{
			jq("#tx_zxys").hide();	
			jq("#if_tz_zxys").hide();
		}
	}
	
	
	if(type==0){
			jq("#tx_zxys").hide();
			jq("#if_tz_zxys").hide();
	}
}

//装后保了解详情使用
function freeZhaoBiaoForZhb(n, formID) {

    try {

        var ptag = '1_4_2_1';
        if (n == 6) {
            ptag = '1_4_1_1';
        }
        if (n == 7) {
            ptag = '1_4_3_1';
        }
        if (n == 2) {
            ptag = '1_3_5_2';
        }
        if (n == 8) {
            ptag = '1_4_6_2';
        }
        clickStream.getCvParams(ptag);
        jq("#ptag").val(ptag);

        var form = jq("#" + formID),
            chenghuInput = form.find(".chenghu"),
            phoneInput = form.find(".myphone"),
            chenghu = chenghuInput.val(),
            phone = phoneInput.val();

    } catch (e) {

    }
    if ($('biao1').checked) {
        biao = 1;
    }
    /*******************************微信招标************************************/
    var weixin_code = '';
    var start_qrcode_id = '';
    jq.ajax({
        async: true,
        type: "GET",
        dataType: 'jsonp',
        url: "http://www.meijialz.com/api/weixin/run.php",
        data: {
            action: 'createQrcode',
            cookie_id: 'test',
            data: 'createWxCode',
            type: 1
        },
        success: function(res) {
            if (res.code == 0) {
                weixin_code = res.url;
                start_qrcode_id = res.qrcode_id;
                /*******************************微信招标************************************/

                jq.ajax({
                        type: "POST",
                        url: "/zb/index.php",
                        //data: "type=0&phone="+phone+"&zblx="+zblx+"&zxtype="+zxtype+"&chenghu="+chenghu+"&shen="+shen+"&city="+city+"&town="+town+"&oarea="+oarea+"&zxys="+zxys+"&demo="+demo+"&biao="+biao+"&word="+word+"&yuyue_type="+yuyue_type+"&sourceid="+sourceid+"&s_sourceid="+s_sourceid,
                        data: form.serialize(),
                        beforeSend: function() {

                            var reg1 = /(\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/; //判断 手机

                            if (!chenghu || chenghu == '真实姓名' || chenghu == '称呼') {

                                try {
                                    $('erro_msg').innerHTML = '请填写您的称呼';
                                    chenghuInput.parent().find('div.zb_mes_error').remove();
                                    jq('.zb_mes_input_one').css('border-color', '#e8e8e8');
                                    jq('.zb_mes_name').css('border-color', '#fec1c1');
                                } catch (e) {}
                                if (jq('.container_width').length != 1) {
                                    chenghuInput.focus();
                                };
                                return false;
                            } else if (!isTel(phone) && !reg1.test(phone)) {
                                try {
                                    chenghuInput.parent().find('div.zb_mes_error').remove();
                                    jq('.zb_mes_input_one').css('border-color', '#e8e8e8');
                                    $('erro_msg').innerHTML = '请填写真实的联系电话。';
                                    phoneInput.parent().find('div.zb_mes_error').remove();
                                    jq('.zb_mes_phone').css('border-color', '#fec1c1');

                                } catch (e) {}
                                if (jq('.container_width').length != 1) {
                                    jq("#myphone1")[0].focus();
                                }
                                return false;
                            }

                            /*else if(!town)
        {
                $('erro_msg').innerHTML = '请选择所在城市与区域。';
                jq("#User_Town")[0].focus();
                return false;
            }
            else if(!isDigit(parseInt(oarea)))
            {
                $('erro_msg').innerHTML = '请合理填写建筑面积，数字！';
                jq("#oarea")[0].focus();
                return false;
            }
            else if(!parseInt(zxys))
            {
                $('erro_msg').innerHTML = '请选择您的装修预算。';
                jq("#zxys")[0].focus();
                return false;
            }
            else if(!$('biao0').checked && !$('biao1').checked)
            {
                $('erro_msg').innerHTML = '是否优先考虑有保障金公司？';
                jq("#biao0")[0].focus();
                return false;
            }*/
                            if (yuyue_apply_agin > 0) {
                                return false;
                            } else {
                                yuyue_apply_agin++;
                            }

                        },
                        success: function(result) {
                            jq('.zb_mes > ul > li > input').css('border-color', '#e8e8e8');
                            jq('.zb_mes_error ').remove();
                            var res = jq.parseJSON(result);
                            //JSON.parse(result); 
                            yuyue_apply_agin = 0;
                            jq("form").each(function() {
                                this.reset();
                                jq(this).find(".login_select > span").show();
                            });

                            if (res.status == 5) {
                              
                                window_box_close();
                                indexYYFail(res.cityname);
                                return false;

                                //backFirstFrame();
                                //jq("#tmpCity").html(res.cityname);
                            }
                            if (res.status == 1) {
                             
                                if (!res.tmpYid) {
                                    overFive();
                                    yuyue_apply_agin = 0;
                                    setTimeout(function() {
                                        reSizeBarWidtgh();
                                    }, 200);
									return;
                                }
                                jq("#free_zhaobiao_form").hide();
                                jq("#free_zhaobiao_result_news").show();

                                jq("div.window_box").remove();
								/*
                                var successStr = zb_first_pop(weixin_code,res.tmpYid);
									jq('.window_box').windowBox({
									  width:560,
									  title:"提示",
									  wbcStr:successStr,
								  		closeFn:'stop_code_status'
									});
								*/
								//更改部分，完善资料弹窗
								indexSubZbStepOneNew(res,weixin_code);	
								
                                //zb_getwxstatus(start_qrcode_id,res.tmpYid);
                                setTimeout(function() {
                                    reSizeBarWidtgh();
                                }, 200);
                                var i = jq('#zxb_addamount').html();
                                jq('#zxb_addamount').html(parseInt(i) + 1);

                                var i2 = jq('span.apply_dn').html();
                                jq('span.apply_dn').html(parseInt(i2) + 1);
                                var i3 = jq('span.apply_mn').html();
                                jq('span.apply_mn').html(parseInt(i3) + 1);

                            } else if (res.status == 5) {
                                showPopWin("http://www.meijialz.com/zb/frame_global.php?status=" + res.status + "&msg=" + res.cityname, 456, 254, null, true);
                            } else {
                                var cityname = encodeURI(res.cityname);
                                var tyid = encodeURI(res.tmpid);
                                showPopWin("http://www.meijialz.com/zb/frame_global.php?msg=" + cityname + "&tyid=" + tyid, 456, 254, null, true);
                            }
                            // try{
                            //  jq('#tj').html('<iframe src="http://www.meijialz.com/api/test.html"></iframe>');
                            // }catch(e){}
                            // alert(res.req);
                            // window.location=res.req;         //'/zb/?success=1';
                        }
                    })
                    /*******************************微信招标************************************/
            } else {
                alert(res.msg);
            }

        }
    });
    /*******************************微信招标************************************/
    /*try {
           _tsa.push(['trackEvent', 153, 0.00]); 
       }catch(e){}*/
    if (n == 0) {
        try {
            _tsa.push(['_trackEvent', '访客', '点击', '找公司']);
        } catch (e) {}
    }
    if (n == 2) {
        try {
            _tsa.push(['_trackEvent', '访客', '点击', '设计']);
        } catch (e) {}
    }
    if (n == 5) {
        try {
            _tsa.push(['_trackEvent', '访客', '点击', '预算']);
        } catch (e) {}
    }
    if (n == 6) {
        try {
            _tsa.push(['_trackEvent', '访客', '点击', '验房']);
        } catch (e) {}
    }
    if (n == 7) {
        try {
            _tsa.push(['_trackEvent', '访客', '点击', '找监理']);
        } catch (e) {}
    }
}