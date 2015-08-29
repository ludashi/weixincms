// JavaScript Document
/*************************************************
 *
 * js File,created by dean, on 09.29 2014
 * 
 * 最后编辑人：dean  (每次修改本文件)
 *
 * 前端JS文件，开发的代码可先自行创建文件
 *
 **************************************************/

/*小区列表JS区块*/
!function(){
    var myFamilyList = {
	    init:function(){
	    	myFamilyListReady();//doc ready 
	    }
    }
    function myFamilyListReady(){
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
        jq('.zgs_st_dl > dd > a').click(function(){
	      jq(this).parent().find('a').removeClass('on');
	      jq(this).addClass('on');
	    });
        hasHdd2 = jq(".zgs_select_type > dl.zgs_st_dl > dd.height_40");
        hasHdd2.each(function(){
	        if(jq(this).length!=0 && jq(this).find("a.on").length!=0 && jq(this).find("a.on").position().top >= 40) {
	          jq(this).find("span").click();   
	        };
	    });
      jq('.fmf_search_container > div.fmf_search > label').click(function(){
        jq(this).parent().find('input:text').focus();
      });
      jq('.fmf_search_input').bind('keydown',function(){
        jq(this).parent().find('label').hide();
      }).bind('blur',function(){
        if(jq(this).val()==""){
          jq(this).parent().find('label').show();
        }
      });

    }
    
  window.myfamilyListDocReady = myFamilyList; 
}(jQuery)

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
function freeOrder(obj){
    if(typeof(obj.toid) == 'undefined' || typeof(obj.gid) == 'undefined' ) {
        alert( '系统繁忙，请稍后再试.' );
        return;
    }
  
    jq.get('/zs/visit_yuyue.php?toid=' + obj.toid + '&gid='+ obj.gid +'&ptag='+ obj.ptag +'&rand=' + Math.random(), function(result) {
        jq('.window_box').windowBox({
            width: 459,
            title: "免费预约参观",
            wbcStr: result
        });
    });
};
/*小区列表JS区块 End*/

//免费帮我设计弹框
function freeDesign(obj,toid,ptag){
	var str = '<div class="freeQuote_box_content clear">' +
			  '<div id="form"><input type="hidden" name="toid" value="'+toid+'" />' +
			  '<ul>' +
			  '<li><span class="fbc_name">您的称呼</span><input type="text" class="fq_text text" name="yourname"></li><li><span class="fbc_name">手机号码</span><input type="text"class="fq_text text" name="yourphone"></li>' +
			  '<li><span class="fbc_name">所在城市</span><select class="fq_sheng" id="User_Shen1" name="User_Shen" onchange="changeProvince(\'User_Shen1\',\'User_City1\',\'User_Town1\');"><option value="1">省/市</option></select><select class="fq_shi"  id="User_City1" name="User_City" onchange="changeTown(\'User_Shen1\',\'User_City1\',\'User_Town1\');"><option value="0">市/地区</option></select><div style="display:none;"><select class="langSelect" id="User_Town1" name="User_Town"><option>县/区</option></select></div></li>' +
			  '</ul>' +
			  '<input type="submit" submit_type="ajax_design" value="免费申请" class="fq_btn" onClick=javascript:checkFromLine(this,"fb_check","'+ptag+'")>' +
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
	initProvince('User_Shen1');   
};
//表单验证
function checkFromLine(obj, cl, ptag ){
	var cls = 'add_wrong';
	if(cl) {
		cls = cl;	
	}

  var a =  jq(obj).parent().find('input[name="yourname"]').checkForm({className:cls,content:["称呼不可为空","称呼最多6个中文（12个英文字符）"],type:[1,2],reg:{len:12},checkFormType:obj, displayNum:true, labl:'i', lablClass: 'ico_error'});
  var b =   jq(obj).parent().find('input[name="yourphone"]').checkForm({className:cls,content:["手机号码不可以为空","请填写正确的手机号码"],type:[1,2], reg:0,checkFormType:obj, displayNum:true, labl:'i', lablClass: 'ico_error'});
  var c = jq(obj).parent().find('select[name="User_Shen"]').checkForm({className:cls,content:["请选择您的所在地"],type:[1],checkFormType:obj, displayNum:true, labl:'i', lablClass: 'ico_error'});
   if(c === 0) {
		var d = jq(obj).parent().find('select[name="User_City"]').checkForm({className:cls,content:["请选择您的所在地"],type:[1],checkFormType:obj, displayNum:true, labl:'i', lablClass: 'ico_error'});   
   }
  if( a === 0 && b === 0 && c === 0 && d === 0){
      //TODO 提交数据
	  upLoadData(obj,ptag);
   }
}
function upLoadData(obj,ptag){
	  var chenghu =  jq(obj).parent().find('.text[name="yourname"]').val();
	  var phone   =  jq(obj).parent().find('.text[name="yourphone"]').val();
	  var price   =  jq(obj).parent().find('#select').val();
	  var shen    =  jq(obj).parent().find('select[name="User_Shen"]').val();
	  var city    =  jq(obj).parent().find('select[name="User_City"]').val();
	  price = price?price:'';
	  pro_sourceid = 3;
	  pro_s_sourceid = 0;
	  forum_sourice = 3;
	  operating_type = 1;
	  device_src = 7;
	  sourceid = 45;
	  s_sourceid = 125;
	  var url = "/zb/index.php";
	  var encryptData = rsaEncryptNameAndPhone({phoneObj: jq('input[name="yourphone"]'), chenhuObj: jq('input[name="yourname"]')});
	  // var encryptData = rsaEncryptNameAndPhone({phoneObj:jq('#your_phone'),chenhuObj:jq('#your_name')});
	  var _data ="pro_sourceid=" + pro_sourceid +  encryptData+"&pro_s_sourceid=" + pro_s_sourceid + "&forum_sourice=" + forum_sourice + "&operating_type=" + operating_type +  "&device_src=" + device_src + "&sourceid=" + sourceid + "&s_sourceid=" + s_sourceid +"&ptag="+ptag +"&zxys="+price+"&shen="+shen +"&city="+city;
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
	    url: url,
	    data: _data,
	    beforeSend: function() {
	      var reg1 = /^((\(\d{2,3}\))|(\d{3}\-))?(13|14|15|17|18)\d{9}$/;
	      if (!reg1.test(phone)) {
	        return false;
	      }
	      if (!chenghu || chenghu == "请填写您的姓名") {
	        return false;
	      }
	      	  //清空数据的值
/*        jq(obj).parent().find('.text[name="yourname"]').val('');
		jq(obj).parent().find('.text[name="yourphone"]').val('');*/

	    },
	    success: function(result) {
	      if (typeof(JSON) == "undefined") {
	        var res = eval("(" + result + ")")
	      } else {
	        var res = JSON.parse(result)
	      }
	      if (res.status == 1) {
		  
			   if (!res.tmpYid)
			  {
						overFive();
						return false;
			  }
	          var successStr = zb_first_pop(weixin_code,res.tmpYid);
				window_box_close();
									jq('.window_box').windowBox({
									  width:560,
									  title:"提示",
									  wbcStr:successStr,
								  		closeFn:'stop_code_status'
									});
					zb_getwxstatus(start_qrcode_id,res.tmpYid);
	        return false;
	      }
	      else if(res.status == 5)
	      {
	         window_box_close();
	         indexYYFail(res.cityname);
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
	 /*******************************微信招标************************************/  						  
										}
							else
							{
								alert(res.msg); 
							} 
								 
						}              
				  });
	/*******************************微信招标************************************/ }
function initProvince(proId) {
	gpm.def_province = ["省/市", ""];
	gpm.def_city1 = ["市/地区", ""];
	gpm.initProvince($(proId)); 
}

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

function zwj_public() {
	jq('div.fmc_construction_data > dl').each(function() {
		jq(this).find('dd:last').addClass('last');
	});

	//收藏
    jq('ul.tag_list').clickChgClass({data:{act:'behave',type:'collect_scene'},callback:addnum,check:checkLogin});
	jq('div.fmc_nav').tabToggle({target1:'a'});	
	jq('.apply_btn').click(function() {
		//checkFromLine(this);	
	});
	initProvince('User_Shen');

	jq('.apply_line > input').placeholder({oLabel: 'label', derc: 'prev'});
	
	scrollTopFn(3,"#scrolldiv1 > table > tbody > tr");
}

function addnum(which,value) {
    var num = parseInt(jq(which).text());
    num = num + value;
    jq(which).text(num);
}


function checkLogin() {
	var username=getCookie('username',true);
	if(!username) {	
		//setZero();			
		showPopWin('http://www.meijialz.com/pop_login.php', 500, 426, null, false);
		return false;
	}
	return true;
}

//收藏(心形)点击效果
(function(jq) {
	jq.fn.clickChgClass = function(settings) {
		var defaults = {
			target1: 'li:eq(1)',
			target2: 'a > em.ico_star2',
			togClass: 'ico_star2_act',
            url:'/zwj/ajaxpost.php',
            data:{}, 
            callback:function(){},
            targetTxt: 'a > font', 
            check:function(){}
		};
        
		var settings = jq.fn.extend({}, defaults, settings);
		jq(this).each(function() {
            var obj = jq(this);
			var set = settings;             
			obj.find(set.target1).click(function() {
				var that = jq(this);
				toggleStatus(that,set,obj);		
			});
		});
		
		function toggleStatus(that,set,obj) {
			var res = set.check();
			if (!res) return false;
			that.unbind('click');
			var cid  = obj.find(set.target2).attr('value-id');  
			if(typeof(cid)!='undefined')
			{
				set.data.cid  = cid;
				//set.data.sign = obj.find(set.target2).attr('class').indexOf(set.togClass)==-1 ? 1 : -1; 
                set.data.sign = obj.find(set.target2).hasClass(set.togClass) ? -1 : 1;
				jq.post(set.url,set.data,function(res){
					if(res.res=='succ'){
                        set.callback(obj.find(set.target1).find(set.targetTxt),set.data.sign);
						obj.find(set.target2).toggleClass(set.togClass); 
						that.click(function() {
							toggleStatus(that,set,obj);	
						});
					}else{
                        failTip("这是自己的日记哦!");
                    }
					
				},'json'); 
			}		
		}
	};
})(jQuery);

//houseDetail
(function(jq, that) {
	var houseDetail = {
		init: function() {
			zwj_public();	
		}	
	};
	
	that.houseDetail = houseDetail;
		
})(jQuery, this);

//楼盘图册
(function(jq, that) {
	var album = {
		init: function() {
			zwj_public();
			initEvent();	
		}	
	};
	
	function initEvent() {
		var obj = jq('ul.fmc_type_list > li > a');
		obj.click(function() {
			var idx = obj.index(jq(this)),
				page = jq('div.pages > strong').html() || 1,
				mod = jq(this).attr('data-mod');
			idx = (page - 1)*12 + idx;	
			obj.ppt({
				isFirst:true,
				isLast:false,
				curNum: idx,
				mod: mod
			}); 
		});
		//浮层地图
		jq('a.ico_location').click(function() {		
			var str = '<div class="translucence_layer" style="_height:799px; display:none; position:fixed"><iframe style="position:absolute;top:0;left:0;width:100%;height:100%;filter:alpha(opacity=0);"></iframe></div>';
			jq('#coverMap').parent().after(str);
			jq('div.translucence_layer, div.tip_fmf_map').show();	
			
			if(bType.version == 6 && bType.name == 'msie') {
				setStyleForie6();
			}
			myDefineMap.init({options:{mapId: 'coverMap', city: myCity, map: 'map'}, data: posArr, markOpt: {cls: 'Bmap_img f_c_03b065', hcls: 'Bmap_img f_c_f36f20', ofst: {left: 10, top: 47}, hoverChg: false, clickSrc:false}});

			setOverflow();
		});
		//关闭浮层地图
		jq('a.tip_close').click(function() {
			jq('div.tip_fmf_map').hide();
			jq('div.translucence_layer').remove();
			recoverOverflow();	
			if(bType.version == 6 && bType.name == 'msie') {
				jq("html").css("overflow-x","scroll");
	   			jq("body").css("overflow-x","visible");
			}
		});
	}
	
	that.album = album;
})(jQuery, this);

//预约参观弹窗
function freeOrder(obj){
    if(typeof(obj.toid) == 'undefined' || typeof(obj.gid) == 'undefined' ) {
        alert( '系统繁忙，请稍后再试.' );
        return;
    }
    jq.get('/zs/visit_yuyue.php?toid=' + obj.toid + '&gid='+ obj.gid +'&ptag='+ obj.ptag +'&module_source=zwj'+'&rand=' + Math.random(), function(result) {
        jq('.window_box').windowBox({
            width: 459,
            title: "免费预约参观",
            wbcStr: result
        });
    });
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
function freeFail(obj){
	var failStr = '<div class="apply_fail"><span class="as_fail"></span><strong>非常抱歉,您当前的申请失败，请稍候再试！</strong></div>';
	jq('.window_box').windowBox({ 
		width:480,
		height:257,
		title:"提示",
		wbcStr:failStr,
        closeTime:3000
	  })
};
function checkowner(cid,gid,yid,ptag)
{
		var uid = getCookie('to8to_uid');
		
		if (uid!='' && (uid==cid || uid==yid) )
		{
			failTip('对不起，不能向自己发送预约');
		}
		else
		{			
			freeOrder({toid:cid,gid:gid, ptag:ptag});
		}
}
//不能向自己发送预约提示语
function failTip(failStr){
	var failStr = '<div class="apply_fail"><span class="as_fail"></span><strong>'+failStr+'</strong></div>';
	jq('.window_box').windowBox({ 
		width:480,
		height:200,
		title:"提示",
		wbcStr:failStr,
        closeTime:3000
	  })
}
//预约参观弹窗


//社区Community
(function(jq, that) {
	var community = {
		init: function() {
			zwj_public();	
			initEvent();
		}	
	};

	function initEvent() {
		var obj = jq('a[data-mod]');
		obj.click(function() {
			var idx = jq(this).parents('ul').find('a[data-mod]').index(jq(this)),
				mod = jq(this).attr('data-mod');	
			obj.ppt({
				isFirst:true,
				isLast:false,
				curNum: idx,
				mod: mod
			}); 
		});
		//浮层地图
		jq('a.ico_location').click(function() {		
			var str = '<div class="translucence_layer" style="_height:799px; display:none; position:fixed"><iframe style="position:absolute;top:0;left:0;width:100%;height:100%;filter:alpha(opacity=0);"></iframe></div>';
			jq('#coverMap').parent().after(str);
			jq('div.translucence_layer, div.tip_fmf_map').show();	
			
			if(bType.version == 6 && bType.name == 'msie') {
				setStyleForie6();
			}
			myDefineMap.init({options:{mapId: 'coverMap', city: myCity, map: 'map'}, data: posArr, markOpt: {cls: 'Bmap_img f_c_03b065', hcls: 'Bmap_img f_c_f36f20', ofst: {left: 10, top: 47}, hoverChg: false, clickSrc:false}});
			setOverflow();
		});
		//关闭浮层地图
		jq('a.tip_close').click(function() {
			jq('div.tip_fmf_map').hide();
			jq('div.translucence_layer').remove();
			recoverOverflow();	
			if(bType.version == 6 && bType.name == 'msie') {
				jq("html").css("overflow-x","scroll");
	   			jq("body").css("overflow-x","visible");
			}
		});
	}
	
	that.community = community;
		
})(jQuery, this);

//construction
(function(jq, that) {
	var construction = {
		init: function() {
			zwj_public();	
		}	
	};
	
	
	that.construction = construction;
		
})(jQuery, this);

//myDiary
(function(jq, that) {
	var myDiary = {
		init: function() {
			zwj_public();	
		}	
	};
	
	that.myDiary = myDiary;
		
})(jQuery, this);

//find_my3d
(function(jq, that) {
	var find_my3d = {
		init: function() {
			zwj_public();
		}	
	};
	
	that.find_my3d = find_my3d;
		
})(jQuery, this);

//my3dCase
(function(jq, that) {
	var my3dCase = {
		init: function() {
			zwj_public();
		}	
	};
	
	that.my3dCase = my3dCase;
		
})(jQuery, this);

//find_my3d_sample
(function(jq, that) {
	var my3dSample = {
		init: function() {
			zwj_public();
		}	
	};
	
	that.my3dSample = my3dSample;
		
})(jQuery, this);

//地图对象
var myDefineMap = {
    init: function(obj) {
       if(obj.data.length == 0) {
			this.initMapNoPoint(obj.options);   
	   } else {
			this.initMap(obj.options);
        	this.markPosition(obj.options.map, obj.data, obj.markOpt);   
	   }
    },
    initMapNoPoint: function(obj) {
		// 百度地图API功能
		var map = new BMap.Map(obj.mapId);    // 创建Map实例
		map.centerAndZoom(obj.city, 15); 
		map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
		window[obj.map] = map;
    },
    initMap: function(obj) {
		var map = null;
		map = new BMap.Map(obj.mapId);    // 创建Map实例
        //map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
        map.setCurrentCity(obj.city);          // 设置地图显示的城市 此项是必须设置的
       	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
		window[obj.map] = map;
    },
    DefineOverlay: function(point, num, text, src, cls, cls_hover, ofst, hoverChg, clickSrc) {//自定义覆盖物构造函数 
        function DefineOverlay(point, num, text, src, cls, cls_hover, ofst, hoverChg, clickSrc) {
            this._point  = point;
            this._num = num;
            this._text = text;
            this._src = src;
            this._cls = cls;
            this._cls_hover = cls_hover;
            this._ofst = ofst;
			this._hoverChg = hoverChg;
			this._clickSrc = clickSrc;
        }

        DefineOverlay.prototype = new BMap.Overlay();
        DefineOverlay.prototype.initialize = function(map) {
            
            this._map = map;
            var div = this._div = document.createElement("span"),
            	sMap = '';
            if(this._hoverChg == undefined || this._hoverChg) {
				div.setAttribute('data-num', this._num);
			} else {
				this._num = '';
			}
            div.className = this._cls;
            if(this._cls.indexOf('Bmap_img_s') != -1) {
            	sMap = 'Bmap_top_img_s';
            }
            div.innerHTML = '<span class="Bmap_top_img '+sMap+'"></span><span>'+ this._text + '</span><b class="Bmap_txt">'+this._num+'</b>';    
            var that = this;

            div.onmouseover = function(){
                this.className = that._cls_hover;
				if(that._hoverChg || that._hoverChg == undefined) {
                	document.getElementById('mapMark_'+that._num).className = 'bg_hover';
				}
            };

            div.onmouseout = function(){
                this.className = that._cls;
				if(that._hoverChg || that._hoverChg == undefined) {
                	document.getElementById('mapMark_'+that._num).removeAttribute('class');
				}
            };

            div.onclick = function() {
				if(that._clickSrc || that._hoverChg == undefined) {
            		window.open(that._src, '_blank');
				}
            };

            map.getPanes().labelPane.appendChild(div);
            return div;
        };

        DefineOverlay.prototype.draw = function(){
            var map = this._map;
            var pixel = map.pointToOverlayPixel(this._point);
            this._div.style.left = pixel.x + this._ofst.left + "px";
            this._div.style.top  = pixel.y - this._ofst.top + "px";
        }

        return new DefineOverlay(point, num, text, src, cls, cls_hover, ofst, hoverChg, clickSrc);
    },
    markPosition: function(map, posArr, markOpt) {//标记
        var map = window[map];
		map.clearOverlays();//移除所有的标记
        var myIcon = new BMap.Icon("http://img.meijialz.com/to8to_img/fmf/find_myFamily.png", new BMap.Size(0,0)),
            points = [], p, m, dm,
            cls = markOpt.cls,//当前的class
            hcls = markOpt.hcls,//hover时的class
            ofst  = markOpt.ofst,//标记的偏移
			hoverChg = markOpt.hoverChg,//hover时相应的DIV改变背景
			clickSrc = markOpt.clickSrc;//点击跳转链接

        for(var i = 0, len = posArr.length;i < len;i++) {
            p = new BMap.Point(posArr[i].lng, posArr[i].lat);
            dm = this.DefineOverlay(p, posArr[i].num, posArr[i].text, posArr[i].src, cls, hcls, ofst, hoverChg, clickSrc);
            map.addOverlay(dm);

            m = new BMap.Marker(p, {icon: myIcon});
            map.addOverlay(m);
            points.push(m.getPosition());
            if(i == len - 1) {
              //map.centerAndZoom(p, 12);//设置最后的点为中心点
              map.setViewport(points);//调整最佳缩放比列
            }
        }
    }
};
var bType = checkBrowser();

function setOverflow() {
	 if(bType.version == "6"  ){
		jq("html").css("overflow-y","visible");
		jq("body").css("overflow-y","hidden");
	}else if(bType.version == "7" || bType.version == "8"){
		jq("html").css("overflow-y","hidden");
		jq("body").css("overflow-y","hidden");
	}else{
		jq("html").css("overflow-y","hidden");
		jq("body").css("overflow-y","hidden");
	};	
}
		
 function recoverOverflow() {
	if(bType.version == "6"){
	   jq("html").css("overflow-y","scroll");
	   jq("body").css("overflow-y","visible");
	}else if(bType.version == "7"){
	   jq("html").css("overflow-y","scroll");
	   jq("body").css("overflow-y","visible");
	}else if(bType.version == "8"){
		jq("html").css("overflow-y","scroll");
		jq('body').css('overflow-y','visible');
	}else{
	   jq("html").css("overflow-y","visible");
	   jq("body").css("overflow-y","inherit"); 
	};	
}

function setStyleForie6() {
	var obj1 = jq('div.tip_fmf_map'),
		ch = jq(window).height(),
		cw = jq(window).width(),
		sh = jq(document).scrollTop(),
		h = (ch - 200)/2;
	obj1.css({'position': 'absolute', 'top': (sh+h)+'px'});	

	var obj2 = obj1.next('.translucence_layer');
	obj2.css({'position': 'absolute', 'top': '-500px', 'width':'2000px', 'height':'9000px'});
	jq("html").css("overflow-x","visible");
	jq("body").css("overflow-x","hidden");
}

//找我家小地图
(function(jq, that) {
	var find_myfamily = {
		init: function() {
			initEvent();
			scrollFixed();
	        initMapMark();
	        scrollReMarkMap();
	        appendFindBigMap();
		}	
	};

	function initEvent() {
		jq('input.fmf_search_input').placeholder({oLabel: 'label'});
		var dl = jq('div.fmf_area_top > div');

		dl.each(function() {
			jq(this).mouseover(function() {
				jq(this).addClass('bg_hover');
				var idx = dl.index(jq(this)) + 1;
				jq('span.Bmap_img[data-num="'+idx+'"]').addClass('f_c_f36f20').removeClass('f_c_03b065');
			});
			jq(this).mouseout(function() {
				jq(this).removeClass('bg_hover');
				var idx = dl.index(jq(this)) + 1;
				jq('span.Bmap_img[data-num="'+idx+'"]').addClass('f_c_03b065').removeClass('f_c_f36f20');
			});
		});
		//浮层地图
		jq('span.fmf_at_address > a').click(function() {		
			var str = '<div class="translucence_layer" style="_height:799px; display:none; position:fixed"><iframe style="position:absolute;top:0;left:0;width:100%;height:100%;filter:alpha(opacity=0);"></iframe></div>';
			jq('#coverMap').parent().after(str);
			jq('div.translucence_layer, div.tip_fmf_map').show();
			
			//var idx = jq(this).parents('div').attr('id').split('_')[1] - 1;
			var idx = jq('span.fmf_at_address > a').index(jq(this));	

			if(bType.version == 6 && bType.name == 'msie') {
				setStyleForie6();
			}

			myDefineMap.init({options:{mapId: 'coverMap', city: myCity, map: 'floatMap'}, data: [posArr[idx]], markOpt: {cls: 'Bmap_img f_c_03b065', hcls: 'Bmap_img f_c_f36f20', ofst: {left: 10, top: 47}, hoverChg: false, clickSrc: false}});

			setOverflow();
		});
		//关闭浮层地图
		jq('a.tip_close').click(function() {
			jq('div.tip_fmf_map').hide();
			jq('div.translucence_layer').remove();
			recoverOverflow();	
			if(bType.version == 6 && bType.name == 'msie') {
				jq("html").css("overflow-x","scroll");
	   			jq("body").css("overflow-x","visible");
			}
		});
	}

	//滚动fIXED
    function scrollFixed() {
        var cls = 'fmf_list_right_act',
            obj = jq("#smallmap"),
            ofH = obj.offset().top;

        if(!(bType.version <= 6 && bType.name == 'msie')) {
        	fixedClass(obj, cls, ofH);
	        jq(window).bind("scroll", function() {
	            fixedClass(obj, cls, ofH);
	        });
        }  
    } 

    function fixedClass(obj, cls, ofH) {
        if(jq(window).scrollTop() >= ofH) {
          obj.addClass(cls);
        } else {
           obj.removeClass(cls);
        }
    }
    //END滚动fIXED

    //获取当前视口可见的工地
    function getCurrentItems() {
        var offsetArr = [],
            tObjs = jq('.fmf_at_title'),
            ch = jq(window).height(),
            st = jq(window).scrollTop(),
            h = ch + st,
            aObj = jq('span.fmf_at_address > a');

        tObjs.each(function() {
            var fst = jq(this).offset().top,
                //idx = tObjs.index(jq(this));
                oObj = jq(this).next().next('.fmf_at_address').find('a'),
                idx = aObj.index(oObj);

            if(fst <= h && fst > st && idx != -1) {
               offsetArr.push(posArr[idx]); 
            }
        });

        return offsetArr;
    }

    //标注地图
    function initMapMark() {
        var offsetArr = getCurrentItems();
        myDefineMap.markPosition('map', offsetArr, {cls: 'Bmap_img Bmap_img_s f_c_03b065', hcls: 'Bmap_img Bmap_img_s f_c_f36f20', ofst: {left: 5, top: 37}});
    }

    //滚动完后重新标注地图
    function scrollReMarkMap() {
        var myTime = 0;
        jq(window).bind('scroll', function() {
            clearTimeout(myTime);
            myTime = setTimeout(initMapMark, 800);
        });
    }
	//添加查看大地图样式
	function appendFindBigMap(){
		var url = window.location.href;
		var qy = getUrlParam('qy');
		if(qy==null)
		{
			url = window.location.host;
			url = "http://"+url+"/zwj/index.php?ac=map&qy=-1&hx=-1&mj=-1&ys=-1&fg=-1&keyword_zh=&page=1";
		}
		else
		{
			var hx = getUrlParam('hx');
			var mj = getUrlParam('mj');
			var ys = getUrlParam('ys');
			var fg = getUrlParam('fg');
			url = url.replace('ac=index','ac=map');
			if(qy==0) url = url.replace('qy='+qy,'qy=-1');
			if(hx==0) url = url.replace('hx='+hx,'hx=-1');
			if(mj==0) url = url.replace('mj='+mj,'mj=-1');
			if(ys==0) url = url.replace('ys='+ys,'ys=-1');
			if(fg==0) url = url.replace('fg='+fg,'fg=-1');
		}
		
    	jq("#smallmap").append("<a target='_blank' href='"+url+"' class='smallmap_top'><i></i>看大地图</a>");
    }

    //获取url参数
    function getUrlParam(name)
	{
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg);  //匹配目标参数
		if (r!=null) return unescape(r[2]); 
		return null; //返回参数值
	}
	
	that.find_myfamily = find_myfamily;
		
})(jQuery, this);

//找我家大地图
(function(jq, that) {
	var bigMap = {
		init: function() {
			initEvent();
		}	
	};

	function initEvent() {
		var obj = jq('.full_menu > ul > li');
		obj.mouseover(function() {
			jq(this).addClass('focus');
            jq(this).children('i').addClass('triangle_up');
            jq(this).children('.full_list_dwon').show();
		});
		obj.mouseout(function() {
			jq(this).removeClass('focus');
            jq(this).children('i').removeClass('triangle_up');
            jq(this).children('.full_list_dwon').hide();
		});
        // obj.hover(function() {
        //     jq(this).toggleClass('focus');
        //     jq(this).children('i').toggleClass('triangle_up');
        //     jq(this).children('.full_list_dwon').toggle();
        // });
		jq('input.full_search_input').placeholder({oLabel: 'label'});

		var dl = jq('div.full_list_areas > dl');

		dl.each(function() {
			/*jq(this).hover(function() {
				jq(this).toggleClass('bg_hover');
				var idx = dl.index(jq(this));
				jq('span.Bmap_img').eq(idx).toggleClass('f_c_03b065 f_c_f36f20');
			});*/
			jq(this).mouseover(function() {
				jq(this).addClass('bg_hover');
				var idx = jq(this).attr('id').split('_')[1];
				jq('span.Bmap_img').filter('[data-num="'+idx+'"]').addClass('f_c_f36f20').removeClass('f_c_03b065');
			});
			jq(this).mouseout(function() {
				jq(this).removeClass('bg_hover');
				var idx = jq(this).attr('id').split('_')[1];
				jq('span.Bmap_img').filter('[data-num="'+idx+'"]').addClass('f_c_03b065').removeClass('f_c_f36f20');
			});
		});
	}
	
	that.bigMap = bigMap;	
})(jQuery, this);

