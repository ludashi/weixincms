//Add by windy.tong   
//公共
jq('body').on('click', '.bdshare_t a[data-cmd]', function() {
    var title = jq(this).parent().attr('data-text'),
        loc = jq(this).parent().attr('data-url'),
        flag = jq(this).attr('data-cmd'),
        url = '';

    if(flag == 'tsina') {
        url = 'http://v.t.sina.com.cn/share/share.php?url='+encodeURIComponent(loc) + '&title=' + encodeURIComponent(title);
    } else if(flag == 'qzone') {
        url = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+encodeURIComponent(loc) + '&desc=' + encodeURIComponent(title);
    }

    window.open(url, '_blank');
});

//继续添加弹窗
function goonAddBox(obj){
    var cate_id = '';
    if(typeof(obj.cate_id) != 'undefined'){
        cate_id = obj.cate_id;
    }
    if(typeof(obj.click_flag) != 'undefined'){
        click_flag = obj.click_flag;
    }
  var successStr = '<div class="zxgl_box goods_channel"><div class="channel_hd">请选择商品购买渠道</div><div class="clearfix"><a href="javascript:;" buy-from="1" cate-id="'+cate_id+'" class="channel_btnl">线上网站</a><a href="javascript:;" buy-from="2"  cate-id="'+cate_id+'" class="channel_btnr">线下卖场</a></div></div>';
    jq('.window_box').windowBox({
      width:460,
      title:"新增购物清单",
      wbcStr:successStr,
      callback: showAddDetailBox
    }); 
};



 //清除标记
function setZero(){
    userClickCollect=0
    userClickCollectDiary=0;
    userClickDeleteComment=0;
    userClickDeleteDiary_did = 0;
    userClickDeleteDiary_sid = 0;
    userCommentDiary = 0;
    replayI = 0;
    replayName = 0;
    replayCid = 0;
    userSendContent = 0 ;
}

 

function showAddDetailBox() {
    jq('.window_box > .window_box_container > .goods_channel > div > a').click(function() {
        window_box_close();
        var buyForm = jq(this).attr('buy-from');
        var cateId = jq(this).attr('cate-id');
        if(buyForm == 1) {
            click_stream('1_3_8_7');
        } else {
            click_stream('1_3_8_8');
        }
        jq.ajax({
            url: '/riji/editscenediary.php?act=ajaxProduct',
            type: 'post',
            data: {buyfrom: buyForm, cate_id: cateId, scene_id: scene_id},  //scene_id变量在页面加载时创建，模版文件scene_writediary.html 第4行
            beforeSend: function(){
                jq('.window_box').windowBox({
                  width:460,
                  title:"新增购物清单",
                  wbcStr: '<div style="text-align: center; padding: 20px 0;"><img src="http://img.meijialz.com/front_end/icon/ajax-loader.gif"></div>'
                });
            },
            success: function(data){
                window_box_close();
				jq('.window_box').windowBox({
                  width:460,
                  title:"新增购物清单",
                  wbcStr: data,
                  callback:saveDetailInfo
                });
            },
            error: function(){
                
            }
        })
    }); 
}



//添加详细信息
function addDetailInfo(obj){
  var successStr = '<div class="zxgl_box box_write_list"><div class="box_form"><div class="step_item"><div class="form_line"><label class="label">商品名称</label><div class="form_element"><div class="text_tip"><input id="producName" type="text" class="text" value=""><em class="text_tip_i">必填</em></div></div></div><div class="form_line"><label for="" class="label">价格</label><div class="form_element"><div class="text_tip"><input type="text" class="text" value="" id="price"><span class="dw">元</span><em class="text_tip_i">必填</em></div></div></div><div class="form_line"><label class="label">品牌</label><div class="form_element"><input type="text" class="text"></div></div><div class="form_line"><label class="label">购买地址</label><div class="form_element"><div class=""><select class="select"><option>商场</option></select></div><div class="form_element_s"><input type="text" class="text"></div></div></div><div class="form_line"><label class="label">规格/款式</label><div class="form_element"><input type="text" class="text"></div></div><div class="form_line"><label class="label">商品类别</label><div class="form_element"><div class="clearfix"><select class="select select_s" id="class1"><option>五金</option></select><select class="select select_s" id="class2"><option>五金</option></select></div></div></div><div class="form_line"><label class="label">备注</label><div class="form_element"><textarea name="" id=""></textarea></div></div><div class="form_btn"><div class="form_element"><input type="button" class="btn_org btn_next" value="提交"></div></div></div></div></div>';
    jq('.window_box').windowBox({
      width:460,
      title:"新增购物清单",
      wbcStr:successStr,
      callback:saveDetailInfo
    });
};

function saveDetailInfo() {
    jq('.window_box > .window_box_container > .box_write_list > .box_form > .step_item > .form_btn > .form_element > input').click(function() {
        
        //TODO 1.检测所填数据的合法性 
		var res = initValidate();
		if(res) {
			// 2.提交数据
			window_box_close();
        	showList();	
		} 
    });
	
	//提交前合法性检测
	function initValidate() {
		var obj = jq('div.form_line'),
			a;
			
		jq('#producName').checkForm({className:"form_error",content:["请输入商品名称"],type:[1], reg:1,checkFormType:obj, displayNum:true});
		jq('#price').checkForm({className:"form_error",content:["请输入价格","请输入正确价格"],type:[1,2], reg:3,checkFormType:obj, displayNum:true});
		a = jq('#class1').checkForm({className:"form_error",content:["请选择商品类别"],type:[1], reg:1,checkFormType:obj, displayNum:true});
		if(a === 0) {
			jq('#class2').checkForm({className:"form_error",content:["请选择商品类别"],type:[1], reg:1,checkFormType:obj, displayNum:true});	
		}
		
		if(obj.find("div.form_error").length == 0) {
			return true;
		} else {
			return false;	
		}
	} 
}

//保存提交后列表
function showList(){

    jq.ajax({
        url: '/riji/editscenediary.php?act=ajaxSelectProduct&rand='+Math.random(),
        type: 'get',
        data: {scene_id: scene_id},
        success: function(data){
            // jq("#selectProduct").html( data);
            jq('.window_box').windowBox({
              width:854,
              title:"添加清单",
              wbcStr: data
            });
        },
        error: function(){

        }
    }); 
};


function chargeLogin() {
	checkLogin();
			
	var ind=getCookie('to8to_ind',false);
	if(ind!='yz') {
		failTip('您不是业主，无法写日记！');
		return false;
	}
	return true;
}

function checkLogin() {
	var username=getCookie('username',true);
	if(!username) {	
		setZero();			
		showPopWin('http://www.meijialz.com/pop_login.php', 500, 426, null, false);
		return false;
	}
	return true;
}

//还剩可输入字数提示
function numCharLeft(that, pos, maxNum) {
	var maxLen = maxNum,
		len = jq(that).val().length,
		obj = pos;   
		
	if(len >= maxLen) {
		obj.html('已达到最大字数限制');  
		jq(that).val(jq(that).val().substr(0,maxLen));
	} else {
		obj.html('您还可以输入 '+(maxLen - len)+' 字')  ;   
	}
}

//hover显示回复
function hoverShowReply() {
	jq('body').on('mouseenter','div.comment_quote > div.quote_item', function() {
        jq(this).find('div.quote_hd > a.reply_lnk').show();
    }).on('mouseleave','div.comment_quote > div.quote_item', function() {
        jq(this).find('div.quote_hd > a.reply_lnk').hide();
    });
 
    jq('div.new_com_bd > textarea').bind('keyup',function() {
		var pos = jq(this).parent().next().next('.comment_fnum');      
		numCharLeft(this, pos, 200);
    });

    jq("div.diary_items_publish_box > textarea").val('').bind("focus", function(){
		jq(this).parent().next('.comment_fnum').fadeIn();
    }).bind("keyup", function(){
		var pos = jq(this).parent().next('.comment_fnum');      
		numCharLeft(this, pos, 200);
    }).bind("blur", function(){
        jq(this).parent().next('.comment_fnum').hide();
    });
	
	jq('body').on('click','div.comment_quote > .quote_item > .quote_wrap > .quote_hd > a.reply_lnk', function() {
		var loginFlag = checkLogin();
		if(!loginFlag) {
			return;	
		}

		var obj  = jq(this).parents('.comment_quote');
        var infoObj = jq(this).parents('.quote_item');
        var info = new Object;
        info.rfid  = infoObj.attr('cid');
        info.name  = infoObj.attr('cname');
        info.rfuid = infoObj.attr('rfuid'); 
        if(infoObj.attr('show_self')){
            info.show_self = infoObj.attr('show_self');
        }
        if (typeof(loginuser)!='undefined')
        {
            info.pic   = loginuser.pic; 
            info.user  = loginuser.name;
        }     
		addReplyBox2(obj,info);
	});
	
	
	jq('body').on('click', 'div.comment_title > a.reply_lnk', function() {
		var loginFlag = checkLogin();
        if(!loginFlag) {
            return; 
        }
        
        var obj  = jq(this).parents('.comment_detail');
        var infoObj = jq(this).parents('.comment_item');
        var info = new Object;
        info.rfid  = infoObj.attr('cid');
        info.name  = infoObj.attr('cname');
        info.rfuid = infoObj.attr('rfuid');
        
		if(infoObj.attr('show_self')){
			info.show_self = infoObj.attr('show_self');
		}
		
        if (typeof(loginuser)!='undefined')
        {
            info.pic   = loginuser.pic; 
            info.user  = loginuser.name;
        }       
        addReplyBox1(obj,info);
	});
	
	jq('body').on('click','.quote_reply_btn > a:eq(1)', function() {
		jq(this).parents('.quote_item').remove();
	});
}

//取消1
function cancelReply1(obj) {
	jq(obj).parents('.comment_quote').remove();
}
//取消2
function cancelReply2(obj) {
	jq(obj).parents('.quote_item').remove();
}

//确定提交数据
var is_submitComment = false;
var show_self = 0;
function submitComent(obj) {
	if(is_submitComment)return;
	is_submitComment = true;
    var comment_item = jq(obj).parents('.quote_item');
    var content      = comment_item.find('textarea').val();
    var tgt_type     = 4;
    var rfid         = comment_item.find('.rfid').val();
    var rfuid        = comment_item.find('.rfuid').val(); 
    var org_rfid         = comment_item.parents('.comment_item').attr('cid');
    var org_rfuid        = comment_item.parents('.comment_item').attr('rfuid');  
    var did=comment_item.parents('.comment_item').attr('did');
	var a = comment_item.find('textarea').checkForm({className:"form_error",content:["回复内容不能为空","回复不能大于200个汉字"],type:[1,2], reg:{len:200},checkFormType:this, displayNum:true});
	if(a !== 0) {
		is_submitComment = false;
        return;	
	}
	/*if(content.length == 0) {
        failTip("回复内容不能为空.");
        is_submitComment = false;
        return;
    }

    if(content.length > 100) {
        failTip("回复不能大于100个汉字.");
        is_submitComment = false;
        return;
    }*/
	if(comment_item.find('.show_self').val()){
		var show_self = comment_item.find('.show_self').val();
	}
	
	if(comment_item.find('.did').val()){
		var did = comment_item.find('.did').val();
	}
/*	//日记详情页日记的回复 的回复
	if(!did){
		var did=comment_item.parents().parents().attr("did");	
	}
	//日记详情页现场的回复 的回复
	if(!did){
		var sid=comment_item.parents().parents().parents().attr("sid");	
	}*/
	
    jq.post('http://www.meijialz.com/riji/ajaxpost.php',
            {act:'add_comments',content:content,uid:owner_id,tgt_type:tgt_type,sid:sid,did:did,ref_comment_user_id:org_rfuid,ref_comment_id:org_rfid,parent_comment_id:rfid,parent_comment_user_id:rfuid},
            function(res){                
                if (res.res=='succ')
                {
                    jq.post('http://www.meijialz.com/riji/ajaxpost.php',{act:'refresh_comments_id',pid:org_rfid,show_self:show_self},function(res)
                        { 
                    		is_submitComment = false;
                            jq(obj).parents('.comment_item').parent().html(res); 
                            var all_comment_num=jq('.all_comment_num').html();
                            jq('.all_comment_num').html(+all_comment_num+1);
                            loadings();
                        }); 
					is_submitComment = false;
                } 
				is_submitComment = false;		
    },'json');  
}

//添加回复框
function addReplyBox1(obj,info) { 
	var str = '<div class="comment_quote "><div class="quote_item quote_item_edit"><img src="'+info.pic+'" width="50" height="50" class="comment_img"><div class="quote_wrap"><div class="quote_hd">'+info.user+'<span>回复</span><em>'+info.name+'</em>：</div><div class="quote_bd"><div class="quote_reply"><textarea name="" id="" style="border:1px solid #CCCCCC;" onkeyup="numCharLeft(this,jq(this).parent().find(\'.quote_reply_num\'),200)"></textarea><input type="hidden" class="rfid" value='+info.rfid+'><input type="hidden" class="rfuid" value='+info.rfuid+'><input type="hidden" class="show_self" value='+info.show_self+'><div class="quote_reply_btn"><span class="quote_reply_num">您还可以输入 <em>200</em> 字</span><a href="javascript:;" class="btn_confirm" onclick="submitComent(this)">确定</a> <a href="javascript:;" onclick="cancelReply1(this)">取消</a></div></div></div></div></div></div>';	
	
	if(obj.find('.comment_quote').length == 0) {
		obj.append(str);

//        obj.find('.quote_reply > textarea').bind("keyup", function(){
//            jq(this).val( jq(this).val().substring(0, 100) ) ; 
//        })
	} else {
		addReplyBox2(obj.find('.comment_quote'),info);	
	}
	obj.find('.quote_reply > textarea').focus();
}

//添加回复框
function addReplyBox2(obj,info) { 
    var show_self = '';
    if(typeof(info.show_self) != 'undefined' && info.show_self != null){
        show_self = info.show_self;
    }
	var str = '<div class="quote_item  quote_item_edit"><img src="'+info.pic+'" width="50" height="50" class="comment_img"><div class="quote_wrap"><div class="quote_hd">'+info.user+'<span>回复</span><em>'+info.name+'</em>：</div><div class="quote_bd"><div class="quote_reply"><textarea name="" id="" style="border:1px solid #CCCCCC;" onkeyup="numCharLeft(this,jq(this).parent().find(\'.quote_reply_num\'),200)"></textarea><input type="hidden" class="rfid" value='+info.rfid+'><input type="hidden" class="rfuid" value='+info.rfuid+'><div class="quote_reply_btn"><input type="hidden" class="show_self" value='+show_self+'><span class="quote_reply_num">您还可以输入 <em>200</em> 字</span><a href="javascript:;" class="btn_confirm" onclick="submitComent(this)">确定</a> <a href="javascript:;" onclick="cancelReply2(this)">取消</a></div></div></div></div></div>';	
	
	if(obj.find('.quote_reply').length == 0) {
		obj.append(str);
//        obj.find('.quote_reply > textarea').bind("keyup", function(){
//            jq(this).val( jq(this).val().substring(0, 100) ) ; 
//        })
	}
	obj.find('.quote_reply > textarea').focus();
}

//获取字符串长度 一个中文2个字符
function getWordLen(val) {
    var len;
    if(null == val.match(/[\u4e00-\u9fa5]/g)) {
        len = val.length;   
    } else if(null == val.match(/[^\u4e00-\u9fa5]/g)) {
        len = val.length * 2;   
    } else {
        len = val.match(/[^\u4e00-\u9fa5]/g).length + val.match(/[\u4e00-\u9fa5]/g).length * 2;     
    }     
    return len;
}

//收藏(心形)点击效果
(function(jq) {
	jq.fn.clickChgClass = function(settings) {
		var defaults = {
			target1: 'li:eq(1)',
			target2: 'a > em.ico_star2',
			togClass: 'ico_star2_act',
            url:'http://www.meijialz.com/riji/ajaxpost.php',
            data:{act:'collect'}, 
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
                if(settings.togClass != '') {
                    set.data.sign = obj.find(set.target2).hasClass(set.togClass) ? -1 : 1;
                } else {
                    var which = obj.find(set.target1).find(set.targetTxt),
                        orgval = jq(which).attr('data-collect');
                    
                    if(orgval == 1) {
                        set.data.sign = -1;
                    } else {
                        set.data.sign = 1;
                    }
                } 
				
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



//大的TAB切换
(function(jq) {
	jq.fn.tabToggle = function(settings) {
		var defaults = {
			target1: 'li',
			togClass: 'on',
			toggleDiv: false,
			chgText:false
		};

		var settings = jq.fn.extend({}, defaults, settings),
			li = jq(this).find(settings.target1),
			len = li.length,
			that = jq(this);

        li.click(function() {
            jq(this).addClass(settings.togClass).siblings().removeClass(settings.togClass);
            if(settings.toggleDiv) {//需要切换DIV
            	var idx = li.index(jq(this)),
                    div = that.siblings('div');
                div.eq(idx).show().siblings('div').hide();
            }
			
			if(settings.chgText) {
				var obj = jq('span.picked'),
					htm = '';
				if(settings.togClass != 'keyon') {
					htm = jq('#tagType').children('div:visible').find('a.keyon').html();
					obj.html(htm);	
				} else {
					htm = jq(this).html();
					obj.html(htm);	
				}	
			}
        });
	};
})(jQuery);


//相关日记浮框
function relativeRjBox(obj) {

    var str = '';
    if (typeof(obj) == 'undefined')
    {
        return '';
    }
    else if (obj.status == 'ready')
    {
        str += '<div class="layer_loading"></div>';
    }
    else if (obj.status == 'suc')
    {
        if(obj.data != null){
            for(var i in obj.data)
            {
                if (obj.data[i]['progress'] != null)
                {
                    str += '<a target="_blank" href="/riji/scenedetail.php?id='+scene_id+'&did='+obj.data[i]['id']+'#diary-'+obj.data[i]['id']+'"><span>'+obj.data[i]['progress']+'</span><em>'+obj.data[i]['content']+'</em></a>';
                }
            }
        } else {
            str += '暂无相关日记';
        } 
    }

	return str;
}

//备注详情浮框
function showNoteDetail(obj) {
	var str = '<div class="table_layer"><i class="ico_layer_left"></i><p>'+obj.text()+'</p></div>';
	return str;
}


//选择该日记所属的新家弹窗
function selectRjClassBox(scenes, scene_id,type) {
    var title = "选择该日记所属的新家";
    if (type == 'product')
    {
        substr = '&act=product';
        title  = '选择该清单所属的新家';
    }else
    {
        substr = '';
    }
    var sStr = '<div class="zxgl_box zxgl_select_scene"><div class="box_form"><select name="sid" id="sid" class="select">';
    if(scenes.length > 1) {
        jq.each(scenes, function(index, data){
            if(data.name_u != null){
                sStr += '<option value="'+ data._id +'"';
                if(data._id == scene_id) {
                    sStr += 'selected';
                }
                sStr += '>'+ data.name_u +'</option>';
            }
        })
    }
    else if(scenes.length==1)
    {
        //window.open('http://www.meijialz.com/riji/editscenediary.php?sid='+scenes[0]._id+substr);
        window.location = 'http://www.meijialz.com/riji/editscenediary.php?sid='+scenes[0]._id+substr;
        return;
    }
    sStr += '</select><div><input type="button" class="btn_org" id="ok_scene" value="确定"></div></div></div>'; 

    
	jq('.window_box').windowBox({
	  width:455,
	  title:title,
	  wbcStr: sStr,
      callback: function(){
        jq("#ok_scene").on("click", function(){
			window_box_close();           
		    window.open('http://www.meijialz.com/riji/editscenediary.php?sid='+jq(this).parents('.window_box_container').find('select').val()+substr);
        })
      }
	});
}
//End 公共


function write_diary(click_num)
{
    if (typeof(click_num)!='undefined')
    {
        clickStream.getCvParams(click_num);
    }  
       
    var uid=getCookie('to8to_uid',false);
    var ind=getCookie('to8to_ind',false); 

    if (uid=='' || ind!='yz')
    {
        writeDiary(0);
    }
    else
    {
        jq.post("http://www.meijialz.com/riji/ajaxpost.php",{act:"my_scene"},function(res){
            if (res.length>0)
            {
                selectRjClassBox(res,0,'diary');
            }
            else
            {
                writeDiary(0);
            }            
        },'json');
    }    
}

function write_product(click_num)
{
    if (typeof(click_num)!='undefined')
    {
        clickStream.getCvParams(click_num);
    }  

    var ind=getCookie('to8to_ind',false);
    if (ind=='')
    {
        writeProduct();
    }
    else
    {
        jq.post("http://www.meijialz.com/riji/ajaxpost.php",{act:"my_scene"},function(res){
            if (res.length>0)
            {
                selectRjClassBox(res,0,'product');
            }
            else
            {
                writeDiary(0);
            }    
            
        },'json');
    }    
    
}


function selectScene(which,type,click_num)
{

    if (typeof(click_num)!='undefined')
    { 
        clickStream.getCvParams(click_num);
    }

    var arr = jq(which).attr('scene-id');
    if (typeof(arr)!='undefined' && arr!=0)
    {
        var reg=new RegExp("-","g");
        var str = arr.replace(reg,'"');
        var sceneArr = eval(str);
        selectRjClassBox(sceneArr,0,type);
    }
}

//日记评论页面（scene_comment.html）JS
(function(jq, that) {
        var rjComment = {
            init: function() {
                hoverShowReply();
				initEvent();
            }
        };
		
		function initEvent() {
			//发表回复框效果
            jq('div.new_com_bd > textarea').blur(function() {
                if(jq(this).val() == '') {
                    jq(this).next('em').show().parent().removeClass('on');
                }
            }).bind('keydown input', function() {
                jq(this).next('em').hide();
            }).next('em').click(function() {
                jq(this).prev('textarea').focus();
            });	

            //悬停显示出日记摘要
            rjAbstract.init();
		}

        that.rjComment = rjComment;
})(jQuery, this);

//日记列表页面（scene_list.html）JS
(function(jq, that) {
        var rjList = {
            init: function() {
                eventInit();
            }
        };

        function eventInit() {
			//TAB切换
			//jq('ul.diary_detail_tab').tabToggle();
			//收藏
            jq('ul.tag_list').clickChgClass({data:{act:'behave',type:'collect_scene'},callback:addnum,check:checkLogin});
        
        }
        that.rjList = rjList;        
})(jQuery, this);

function addnum(which,value)
{
    var num = parseInt(jq(which).text());
    if(num=='0' && value=='-1'){
		//alert(num);
	}else{
		num = num + value;
	}
    jq(which).text(num);
}

function addnumRiDetail(which, value) {
    var flag = jq(which).attr('data-collect'),
        curval = jq(which).html()
    
    if(flag == 1) {//先已收藏,--
        jq(which).html(curval - 1);
        jq(which).attr('data-collect',0);
    } else {//反之++
        jq(which).html(+curval + 1);
        jq(which).attr('data-collect',1);
    }
}

//日记详情页面（scene_scenedetail.html）JS
(function(jq, that) {
        var rjGuest = {
            init: function() {
                eventInit();
            }
        };

        function eventInit() {
            //tab切换
            var li = jq('ul.diary_guest_tab > li');
            li.click(function() {
                var idx = li.index(jq(this));
                jq(this).addClass('on').siblings().removeClass('on');
                if(idx == 0) {
                    jq(this).parent('ul').next().show().next().hide();
                } else {
                     jq(this).parent('ul').next().hide().next().show();
                }
            });
            //收藏点击效果
            // jq('ul.tag_list').clickChgClass({data:{act:'behave',type:'collect_scene'},callback:addnum,check:checkLogin});
            jq('ul.tag_list').clickChgClass({data:{act:'behave',type:'collect_scene'},callback:addnumRiDetail,check:checkLogin, target2: 'a', targetTxt: 'a > span',togClass: ''});
             //心形点击切换class
            jq('ul.diary_items_list').clickChgClass({target1: 'li:eq(2)',target2:'a > i.ico_like', targetTxt: 'a > span.like_num_ico', togClass:'ico_like_act',data:{act:'behave',type:'like_diary'},callback:addnum,check:checkLogin, targetTxt: 'a > span'});
            //排序点击效果
			jq('div.diary_select').tabToggle({target1: 'a.diary_select_tab'});
            //发表回复框效果
            jq('div.diary_items_publish_box > textarea, div.new_com_bd > textarea').val('').blur(function() {
                if(jq(this).val() == '') {
                    jq(this).next('em').show();
                }
            }).bind('keydown input', function() {
                jq(this).next('em').hide();
            }).next('em').click(function() {
                jq(this).prev('textarea').focus();
            });
            jq('div.diary_items_publish_box > textarea').bind("keyup", function(){
                var pos = jq(this).siblings('span');      
                numCharLeft(this, pos, 200);
            });
            //hover显示回复
            hoverShowReply();
            //装修清单hover时显示浮框
            jq('div.diary_content > div.diary_items_box > table > tbody > tr').each(function() {
                var td0 = jq(this).find('td:eq(0)');
                if(!td0.hasClass('table_layer_td3')) {
                    td0.hover(function() {
                        
                        var obj_ = jq(this);
                        var obj_2 = jq(this).find('.tb_over_box');
                        var pid = obj_.attr('pro-id');
                        var scene_id = obj_.attr('scene-id');
                        var str = '<div class="table_layer"><i class="ico_layer_left"></i><h3>相关日记</h3><span class="tab_con"></span></div>';
                        
                        obj_.parent().addClass('on');
                        obj_2.append(str);
                        jq.ajax({
                            url:  'http://www.meijialz.com/riji/ajaxpost.php',
                            type: 'post',
                            data: {act:'listProductDiary', pid: pid, owner_id:owner_id},
                            dataType:'json',
                            beforeSend: function(){
                                //转圈
                                obj_2.find(".table_layer .tab_con").html(relativeRjBox({'status':'ready'}));
                            },
                            success: function(data){
                                 //返回内容
                                obj_2.find(".table_layer .tab_con").html(relativeRjBox({'status':'suc','data':data}));
                            },
                            error: function(){
                                obj_2.find(".table_layer .tab_con").html(relativeRjBox({'status':'err'}));
                            }
                        })

                    }, function() {
                        jq(this).find('div.table_layer').remove(); 
                        jq(this).parent().removeClass('on');
                    });
                }
                
                jq(this).find('td:eq(5)').hover(function() {
                    var html = jq(this).text(),
                        str = '';
                    if(len > 20) {
                        str = showNoteDetail(jq(this));
                        jq(this).addClass('table_layer_td table_layer_td2').append(str);
                    }
                }, function() {
                    jq(this).removeClass('table_layer_td table_layer_td2').find('div.table_layer').remove();
                });
            });
            // //心形点击切换class
            // jq('ul.diary_items_list').clickChgClass({target2:'a > i.ico_like', targetTxt: 'a > span.like_num_ico', togClass:'ico_like_act',data:{act:'behave',type:'like_diary'},callback:addnum,check:checkLogin});
            //点击小图弹出大图蒙层
            jq('ul.diary_items_photo > li > a > img').click(function() {
                var parents = jq(this).parents("ul.diary_items_photo"),
                    curNum = parents.find('li > a > img').index(jq(this)),
					ulIdx = jq('body').find('ul.diary_items_photo').index(parents),
                    rjIdx = parents.attr('data-did');//日记ID
                    sId = parents.attr('data-sid'),//现场ID
                    oId = parents.attr('data-oid'),
                    order = jq('a.btn_diary_time > em.ico_sort_upon').length ;//顺序

                if(order === 1) {
                    order = 1;
                } else {
                    order = -1;
                }
				
				jq("ul.diary_items_photo > li > a > img").ppt({
                    oLeft:'prevImg',
                    oRight:'nextImg',
                    isFirst:true,
                    isLast:false,
                    curNum: curNum,
                    ulIdx: ulIdx,
                    scene_id: sId,
                    owner_id: oId,
                    rjIdx: rjIdx,
                    order: order
				});  
            });
            //点击删除弹出确认删除弹窗
            jq('div.edit_box > a[did]').click(function() {
            	var did = jq(this).attr('did');
                confirmDeleteBox(did);
            });

            //弹出继续添加弹窗
            jq('tr.table_t > th > a').click(function() {
                click_stream('1_3_8_6');
                goonAddBox({cate_id: jq(this).attr('cate-id'), click_flag: jq(this).attr('class') });
            });

            //input keydown placeholder消失
            jq('body').on('keydown input','.form_line input', function() {
                jq(this).siblings('em').hide(); 
            });
            
            jq('body').on('blur','.form_line input', function() {
                if(jq(this).val() == '') {
                    jq(this).siblings('em').show(); 
                }   
            });
        }
        //确认删除日记弹窗
        function confirmDeleteBox(did) {
            var str = '<div class="zxgl_box"><div class="mod_pagetip mod_pagetip_noinfo"><span class="mod_pagetip_ico"><em class="ico_tip_warn"></em></span><div class="mod_pagetip_bd"><div class="mod_pagetip_title">您确定要删除该日记吗？</div><div class="mod_pagetip_btn"><a href="javascript:;" onclick="del_diary('+did+')" class="btn_yes">确定</a><a href="javascript:window_box_close(this);" class="btn_cancel">取消</a></div></div></div></div>';

            jq('.window_box').windowBox({
              width:455,
              title:"提示",
              wbcStr:str
            });
        }

        that.rjGuest = rjGuest;
})(jQuery, this);

//悬停显示出日记摘要
(function(jq,that){
    var rjAbstract = {
            init: function() {
                eventInit();
            }
        };
    function eventInit(){
        var authorTimer;
        var rjAbstractData = [];
        jq(document.body).on("mouseenter","a.specail_a",function(evt){ 
            evt.stopPropagation();
            var container = jq(this),
                uid = container.attr("uid"),
                iTag = container.find('i.diary_icn_yes'),
                rjAbstractDiv;
            container.css({position:"relative"});
            if(!iTag.length){return;}
            if(rjAbstractData[uid]){
                rjAbstractDiv = jq(rjAbstractData[uid]);
                showRjAbstract(rjAbstractDiv, container);
            }else{
                jq.ajax({
                        url:  'http://www.meijialz.com/riji/ajaxpost.php',
                        type: 'post',
                        data: {act:'specail',uid:uid},
                        dataType:'json',
                        success: function(data){
                            //返回内容
                            if(data.status=="succ"){
                                rjAbstractData[data.uid] = data.str;
                                rjAbstractDiv = jq(data.str);
                                showRjAbstract(rjAbstractDiv, container);
                            }
                            
                        }
                    })  
            }
        }).on("mouseleave","a.specail_a",function(evt){
            evt.stopPropagation();
            var tip = jq(document.body).find('div.tip_triangle_left');
            if(!tip){return;}
            clearTimeout(authorTimer);
            authorTimer = setTimeout(function(){
                tip.remove();
            }, 100);
        });
        jq(document.body).on("mouseenter","div.tip_triangle_left",function(evt){
            evt.stopPropagation();
            clearTimeout(authorTimer);
            jq(this).show();
        }).on("mouseleave","div.tip_triangle_left",function(evt){
            evt.stopPropagation();
            jq(this).remove();
        }); 
    };
    function showRjAbstract(obj,container){
        setPosition(obj,container);
        obj.appendTo(document.body);
        obj.show();
    };
    function setPosition(obj,refer){
        var cssMap = {};
        cssMap["top"] = parseInt(refer.offset().top) + parseInt(refer.outerHeight())/2 - 30 + "px";
        cssMap["left"] = parseInt(refer.offset().left) + parseInt(refer.outerWidth()) + 4 + "px";
        cssMap["z-index"] = 9998;
        obj.css(cssMap);
    }
    that.rjAbstract = rjAbstract;
})(jQuery,this);

//阶段查看日记页面（scene_taglist.html）JS
(function(jq, that) {
        var rjStage = {
            init: function() {
                eventInit();
            }
        };

        function eventInit() {
            jq('div.diary_select').tabToggle({target1:'a',togClass:'selected'});

            jq('ul.classify_stage > li > div.classify_step').click(function() {
                //jq(this).next('div.stage_lnk').toggle().parent('li').toggleClass('stage_unfold').siblings().removeClass('stage_unfold');
				jq(this).next('div.stage_lnk').show().parent('li').addClass('stage_unfold').siblings().removeClass('stage_unfold').find('div.stage_lnk').hide();
            });
			jq('ul.classify_stage > li > div.stage_lnk > a').click(function() {
				jq(this).addClass('on').siblings().removeClass('on');
            });

            //心形点击切换class
            jq('ul.diary_items_list').clickChgClass({target2:'a > i.ico_like', targetTxt: 'a > span.like_num_ico', togClass:'ico_like_act',data:{act:'behave',type:'like_diary'},callback:addnum,check:checkLogin});
			
            
			 //装修清单hover时显示浮框
            jq('div.diary_items_box > table > tbody > tr').each(function() {
                var td0 = jq(this).find('td:eq(0)');
                if(!td0.hasClass('table_layer_td3')) {
                    td0.hover(function() {
                        var obj_ = jq(this);
                        obj_.append(str);
                        jq.ajax({
                            url:  'http://www.meijialz.com/riji/ajaxpost.php',
                            type: 'post',
                            data: {act:'listProductDiary'},
                            dataType:'json',
                            beforeSend: function(){
                                //转圈
                                obj_.find(".table_layer .tab_con").html(relativeRjBox({'status':'ready'}));
                            },
                            success: function(data){
                                //返回内容
                                obj_.find(".table_layer .tab_con").html(relativeRjBox({'status':'suc','data':data}));
                            },
                            error: function(){
                                obj_.find(".table_layer .tab_con").html(relativeRjBox({'status':'err','data':data}));
                            }
                        })
                    }, function() {
                        jq(this).find('div.table_layer').remove(); 
                    });
                }
                
                jq(this).find('td:eq(5)').hover(function() {
                    var html = jq(this).html(),
                        len = getWordLen(html),
                        str = '';

                    if(len > 20) {
                        str = showNoteDetail(jq(this));
                        jq(this).addClass('table_layer_td table_layer_td2').append(str);
                    }
                }, function() {
                    jq(this).removeClass('table_layer_td table_layer_td2').find('div.table_layer').remove();
                });
				
				jq('.diary_items_box > table > tbody > tr.table_t').click(function() {
					var type = jq(this).attr('data-type');	
					jq(this).nextAll('[data-type='+type+']').toggle();	
				});
            });
        }

        that.rjStage = rjStage;
})(jQuery, this);


//写日记页面（scene_writediary.html）JS

var id_str = '';//新增清单返回的id
var click_flag = '';//标示是新增清单还是继续添加清单

(function(jq, that) {
        var rjWriteDiary = {
            init: function() {
                //render();
                uploadFileInit();
                eventInit();
            }
        };
        function render(){
            //上传图片，显示9个上传位置
            var type = 1;
            var sum = jq('#upload_result_'+ type).find("li").length-1;
            var liId,str_div="";
            for(var i = sum; i < 9; i++){
                var liId = 'div_'+type+'_'+ i;
                    str_div += '<li id="' + liId + '">\
                                <img src="http://img.meijialz.com/front_end/pic/xq_logo_default.jpg" width="100px" height="100px">\
                            </li>';
            }
            jq('#upload_result_'+ type).append(str_div);
        }

        function uploadFileInit() {
        	// 作品上传初始换配置
		    var upload1                 = new initUpload();
		    upload1.config.obj          = upload1;
		    upload1.config.obj_name     = 'upload1';
		    upload1.config.pic_host     = 'http://pic.meijialz.com/live',
            upload1.config.uploader     = 'http://www.meijialz.com/sys_php/riji_upload.php',
		    upload1.config.id           = 'file_upload_1';
		    upload1.config.submit_cls   = 'post_btn';
		    upload1.config.type         = 1;
            upload1.config.queueSizeLimit = 9;
            upload1.config.myUploadLimit = 9;
            upload1.config.fileExt = '*.jpg,*.png,*.gif';
		    upload1.config.riji = true;
            upload1.config.overUploadLimitTip = '一篇日记最多可上传{0}张图片，如果有多张照片，建议分多篇日记来发布，让日记更适合阅读';
		    upload1.config.queueSizeLimitTip = upload1.config.overUploadLimitTip;
            upload1.config.init = onInit;
            upload1.config.select = onSelect;
            //upload1.config.beforeUploadFn = onBeforeUpload;
            upload1.config.uploadError = onUploadError;
            upload1.run(upload1.config);
        }

        //删除图片以及占位LI
        function delImgPlace(container,delObj){
            if(!delObj){return;}
            var index = delObj.index();
            if(index<0){return;}
            var len = container.find("li").length-1;
            var type = container.attr("id").split("_")[2] || 1;
            var li_Id;
            delObj.remove();
            //标示页面已经被修改 
            thisPage = false;
            //修改占位ID
            for(var i = index; i <len; i++){
                li_Id = 'div_'+ type +'_' + i;
                jq('#'+li_Id).attr("id",'div_'+ type +'_' + (i-1));
            }
        }

        function onInit(config){
            jq('#upload_result_'+ config.type).on("click","li a.upload_del",function() {
                //删除当前图片
                /*var index = jq(this).parent().index();
                var len = jq('#upload_result_' + config.type).find("li").length-1;
                jq(this).unbind('click');
                jq(this).parent().remove();
                //标示页面已经被修改 
                thisPage = false;
                //修改占位ID
                var li_Id;
                for(var i = index; i <len; i++){
                    li_Id = 'div_'+ config.type +'_' + i;
                    jq('#'+li_Id).attr("id",'div_'+ config.type +'_' + (i-1));
                }*/
                delImgPlace(jq('#upload_result_'+ config.type), jq(this).parent());
            });
        }

        function onSelect(file){
            var type = 1;
            var sum = jq('#upload_result_'+ type).find("li").length-1;
            var liId,str_div="";
            liId = 'div_'+type+'_'+ sum;
            str_div += '<li id="' + liId + '">\
                            <img src="http://img.meijialz.com/icon/load_circle.gif" width="100px" height="100px">\
                        </li>';
            var curPivNum   = jq('#upload_result_'+ type).find("li").length -1; //当前张数
            var maxPic = 9;
            if(curPivNum < maxPic) {//超过最大限制            
                jq('#upload_result_'+ type).append(str_div);
            }         
        }

        function onBeforeUpload(config){
            //添加上传中的背景图片
            var lastLi  = jq('#upload_result_'+ config.type+" li").has("input").last().index();
            lastLi      = lastLi < 0 ? 0 : lastLi;
            var li_id   = 'div_' + config.type + '_' + lastLi;
            jq('#upload_result_'+ config.type).find('#'+ li_id ).find('img').attr("src","http://img.meijialz.com/icon/load_circle.gif");
        }

        function onUploadError(config){
            var lastLi = jq('#upload_result_'+ config.type+" li.imgupload").last().index();
            lastLi = lastLi < 0 ? 0 : lastLi;
            var li_id  = 'div_' + config.type + '_' + lastLi;
            delImgPlace(jq('#upload_result_'+ config.type), jq('#'+li_id));
        }

        function eventInit() {
            //TAB切换
			//jq('ul.diary_detail_tab').tabToggle({toggleDiv: true});
            //装修阶段点击样式切换
            jq('div.pick_stage > div.stage_hd > ul').tabToggle({chgText:true});
            jq('div.pick_stage > div.stage_keys').tabToggle({target1:'a',togClass:'keyon',chgText:true});
            jq('#allTagType').on('click','a',function(){
                var tag_id = jq(this).attr("tag-id");
                jq("#tag_id").val(tag_id); 
                /* 需求变化，不修改阶段ID */
                //var pro_id = jq(this).attr("pro-id");
                // jq("#progress_id").val( pro_id );
                // jq("#progressType li").each(function(){
                //     if(jq(this).find("a").attr("pro-id") === pro_id){
                //         jq(this).addClass('on');
                //     }else{
                //         jq(this).removeClass('on');
                //     }
                // });
            });
            //选择日期
            jq("span.text_date, a.date_modify").click(function(e) {
                var event = window.event || e;
                showcalendar(event, document.getElementById("userTime"), false,'','','','',true);   
            });
            //弹出继续添加弹窗
            jq('tr.table_t > th > a').click(function() {
                click_stream('1_3_8_6');
                var cat_id = jq(this).attr("cate-id")
                goonAddBox({cate_id: cat_id});   
            });
			
			jq('body').on('click','ul.bill_list_tab >li', function() {
				var idx = jq(this).attr('id').replace('ptab-','');
				jq(this).addClass('on').siblings().removeClass('on');	
				jq('ul.bill_list').hide();
				jq('#proList-' + idx).show();
			});
			
			jq('body').on('click','.zxgl_box > a.add_bill',function() {
				var idx = jq('ul.bill_list_tab > li.on').attr('id').replace('ptab-','');
				window_box_close();
				goonAddBox({cate_id: idx});	
			});
			//切换点击的click_flag
			jq('div.add_list > a, tr.table_t a.add_product').click(function() {
				click_flag = jq(this).attr('class');	
			});
			
			//列表li点击选择checkbox			
			jq('body').on('click', '#selectProducts .bill_list li', function(event) {
				var chBox = jq(this).find(':checkbox'),
					selNum = 0,
					e = event || window.event,
					ele = e.target || e.srcElement;
				if(ele.type != 'checkbox') {
					chBox.trigger('click');	
				}
				selNum = jq(".checkbox_1:checked").length;
                jq("#selectNum").html( selNum );
			});
			
			jq('body').on('keydown input','.form_line input', function() {
				jq(this).siblings('em').hide();	
			});
			
			jq('body').on('blur','.form_line input', function() {
				if(jq(this).val() == '') {
					jq(this).siblings('em').show();	
				}	
			});

            jq('body').on('change', '#buy_from', function() {
                jq(this).parent().removeClass('height_auto').next().find('input').css('border-color','#ddd');
                jq(this).parents('.form_element').find('div.form_error').remove();
            });

            jq('div.add_list > a').on('click',function() {
                var sceneid = jq('#scene_id').val();
                createList(sceneid);   
            });
            
            //展开更多，收起
            jq('#unfold').show();
            jq('#fold').hide();
            jq('#unfold').on('click',function(){
                jq('#tagType').hide();
                jq('#allTagType').show();
                jq(this).hide();
                jq('#fold').show();
                var proid = jq('div.stage_hd li[class=on]').find('a').attr('pro-id');
                //var tagid = jq('#tagType a.keyon').attr('tag-id');
                var tagid = jq('#tag-type-'+ proid).find('a.keyon').attr('tag-id');
                jq('#allTagType').find('a[tag-id='+ tagid +']').addClass('keyon').siblings().removeClass('keyon');
            });
            jq('#fold').on('click',function(){
                jq('#tagType').show();
                jq('#allTagType').hide();
                jq(this).hide();
                jq('#unfold').show();
                var proid = jq('div.stage_hd li[class=on]').find('a').attr('pro-id');
                var tagid = jq('#tag-type-'+ proid).find('a.keyon').attr('tag-id');
                jq("#tag_id").val(tagid); 
            })
            
            //评价
            jq('span.recommend_box').on('click','input.mr10',function(){
                jq(this).siblings('i.recommen_yes').addClass('focus');
                jq(this).siblings('i.recommen_no').removeClass('focus');
            }).on('click','input.recommend',function(){
                jq(this).siblings('i.recommen_yes').removeClass('focus');
                jq(this).siblings('i.recommen_no').addClass('focus');
            });
            jq('input.mr10').hover(function(){
                var cssMap = {};
                jq('#recommennote').show();
                cssMap = getHoverStyle(jq(this),jq("#recommennote"));
                jq('#recommennote').css(cssMap);
            },function(){
                jq('#recommennote').hide();
            });
            jq('input.recommend').hover(function(){
                var cssMap = {};
                jq('#unrecommennote').show();
                cssMap = getHoverStyle(jq(this),jq("#unrecommennote"));
                jq('#unrecommennote').css(cssMap);
            },function(){
                jq('#unrecommennote').hide();
            });
            function getHoverStyle(refer,obj){
              var cssMap = {},
                  parentObj = obj.offsetParent(),
                  parentTop = parentObj.offset().top,
                  parentLeft = parentObj.offset().left;
                cssMap["top"] =  refer.offset().top - obj.outerHeight() -parentTop + "px";
                cssMap["left"] = refer.offset().left + refer.outerWidth()/2 -  obj.outerWidth()/2 - parentLeft + "px";
                cssMap["z-index"] = 9998;
              return cssMap;
            }
        }

        that.rjWriteDiary = rjWriteDiary;
})(jQuery, this);
 
//生成添加清单的弹窗

 // var textArr = [{"cid":"1","name":"家电","list":[{"pid":"1","name":"\u55b7\u5b50","brand":"zoo","style":"red","addr":"beijing","price":120,"demo":"hehe"},{"pid":"2","name":"\u55b7\u5b502","brand":"zoo","style":"red","addr":"beijing","price":120,"demo":"hehe"},{"pid":"3","name":"家饰","brand":"zoo","style":"red","addr":"beijing","price":120,"demo":"hehe"},{"pid":"4","name":"\u55b7\u5b504","brand":"zoo","style":"red","addr":"beijing","price":120,"demo":"hehe"},{"pid":"5","name":"\u55b7\u5b505","brand":"zoo","style":"red","addr":"beijing","price":120,"demo":"hehe"}]},{"cid":"2","name":"\u5bb6\u7eba","list":[{"pid":"5","name":"\u706f\u5177q","brand":"zoo","style":"red","addr":"beijing","price":120,"demo":"hehe"},{"pid":"6","name":"\u706f\u5177w","brand":"zoo","style":"red","addr":"beijing","price":120,"demo":"hehe"},{"pid":"7","name":"\u706f\u5177e","brand":"zoo","style":"red","addr":"beijing","price":120,"demo":"hehe"},{"pid":"8","name":"\u706f\u5177r","brand":"zoo","style":"red","addr":"beijing","price":120,"demo":"hehe"},{"pid":"9","name":"\u706f\u5177t","brand":"zoo","style":"red","addr":"beijing","price":120,"demo":"hehe"}]},{"cid":"3","name":"\u5efa\u6750","list":[{"pid":"10","name":"a","brand":"zoo","style":"red","addr":"beijing","price":120,"demo":"hehe"},{"pid":"11","name":"c","brand":"zoo","style":"red","addr":"beijing","price":120,"demo":"hehe"},{"pid":"12","name":"v","brand":"zoo","style":"red","addr":"beijing","price":120,"demo":"hehe"},{"pid":"14","name":"b","brand":"zoo","style":"red","addr":"beijing","price":120,"demo":"hehe"},{"pid":"15","name":"n","brand":"zoo","style":"red","addr":"beijing","price":120,"demo":"hehe"}]},{"cid":"4","name":"\u88c5\u9970","list":[{"pid":"41","name":"\u6c99\u53d1","brand":"zoo","style":"red","addr":"beijing","price":120,"demo":"hehe"},{"pid":"42","name":"\u6c99\u53d12","brand":"zoo","style":"red","addr":"beijing","price":120,"demo":"hehe"},{"pid":"43","name":"\u6c99\u53d13","brand":"zoo","style":"red","addr":"beijing","price":120,"demo":"hehe"},{"pid":"44","name":"\u6c99\u53d14","brand":"zoo","style":"red","addr":"beijing","price":120,"demo":"hehe"},{"pid":"45","name":"\u6c99\u53d15","brand":"zoo","style":"red","addr":"beijing","price":120,"demo":"hehe"}]},{"cid":"5","name":"\u5bb6\u5c45","list":[{"pid":"51","name":"\u55b7\u6c99\u53d1\u5b50","brand":"zoo","style":"red","addr":"beijing","price":120,"demo":"hehe"},{"pid":"52","name":"\u55b7\u6c99\u53d1\u5b502","brand":"zoo","style":"red","addr":"beijing","price":120,"demo":"hehe"},{"pid":"53","name":"\u55b7\u6c99\u53d1\u5b503","brand":"zoo","style":"red","addr":"beijing","price":120,"demo":"hehe"},{"pid":"54","name":"\u55b7\u6c99\u53d1\u6c99\u53d1\u5b504","brand":"zoo","style":"red","addr":"beijing","price":120,"demo":"hehe"},{"pid":"55","name":"\u55b7\u6c99\u53d1\u5b505","brand":"zoo","style":"red","addr":"beijing","price":120,"demo":"hehe"}]}];


var textArr = [];
function createList(sid) {
    jq.post('http://www.meijialz.com/riji/ajaxpost.php',{act:'listProduct',scene_id:sid},function(res){
        textArr = res;
        if(textArr == null){
            goonAddBox({});
        } else {
            var str = '<form id="selectProducts"><div class="zxgl_box"><a href="javascript:;" class="add_bill">+&nbsp;新增清单</a>',
            subStr = '';
        
            str += '<ul class="bill_list_tab"><li id="ptab-'+textArr[0].cid+'" style="cursor: pointer" class="on"><a href="javascript:;">'+textArr[0].name+'</a></li>';

            subStr += createOneList(textArr[0].list,textArr[0].cid,'block');
            for(var i = 1,len = textArr.length;i < len;i++) {
                str += '<li id="ptab-'+textArr[i].cid+'" style="cursor: pointer"><a href="javascript:;">'+textArr[i].name+'</a></li>';
                
                subStr += createOneList(textArr[i].list,textArr[i].cid,'none');
            }   
            str += '</ul><ul class="bill_list_title"><li class="bill_list_title_li1">选择</li><li class="bill_list_title_li2">名称</li><li class="bill_list_title_li3">品牌</li><li class="bill_list_title_li4">规格/款式</li><li class="bill_list_title_li7">购买地址</li><li class="bill_list_title_li5">价格</li><li class="bill_list_title_li8">数量</li><li class="bill_list_title_li6">备注</li><li class="bill_list_title_li9">评价</li></ul>';

            str += subStr;
            str += '<p class="bill_list_text">已选中<span id="selectNum">0</span> 条清单</p><div class="bill_list_btn"><input type="button" class="btn_org" value="确定" onclick="addTr()"></div></div></form>';
			
            jq('.window_box').windowBox({
              width:854,
              title:"添加清单",
              wbcStr: str
            });

            jq(".checkbox_1").on("click", function(){
                var selNum = jq(".checkbox_1:checked").length;
                jq("#selectNum").html( selNum );
            });


            initChecked();
        }

    },'json');


}

function addTr() {
	var str = '<table><tbody><tr><th>名称</th><th>品牌</th><th>款式/规格</th><th>购买地址</th><th>价格</th><th>数量</th><th>备注</th><th>评价</th><th class="table_l">操作</th></tr>';
	jq('ul.bill_list_tab > li').each(function() {
		var idx = jq(this).attr('id').replace('ptab-','');
		var subStr = getUllist(idx);	
		str += subStr;
	});	
	
	str += '</tbody></table>';
	
	jq('div.diary_items_box:eq(0)').html(str);
	window_box_close();
}
function delOneList(obj) {
	jq(obj).parents('tr').remove();	
}

function getUllist(idx) {
	var str = '',title = '',
		obj = jq('#proList-'+idx);
	if(obj.find(':checkbox:checked').length != 0) {
		title = jq('#ptab-'+idx).find('a').html();
		str += '<tr class="table_t" data-mark="'+idx+'"><th colspan="9"><p class="line"></p>'+title+'</th></tr>';	
	} else {
		return str;	
	}
	
	jq('#proList-'+idx).find('li').each(function() {
		if(jq(this).find(':checkbox').is(':checked')) {
			var mark = jq(this).attr('check-mark');
			var id1 = mark.split('_')[0];	
			var id2 = mark.split('_')[1];
			var subStr = '';
			var t1,t2,t3,t4,t5,t8,t9;
			t1 = jq(this).find('.bill_list_li2').html();
			t2 = jq(this).find('.bill_list_li3').html();
			t3 = jq(this).find('.bill_list_li4').html();
			t4 = jq(this).find('.bill_list_li5').html();
			t5 = jq(this).find('.bill_list_li6').html();
			t6 = jq(this).find('.bill_list_li7').html();
			t8 = jq(this).find('.bill_list_li8').html();
			t9 = jq(this).find('.bill_list_li9').html();
			
			subStr = '<tr data-mark="'+id1+'" data-value="'+id2+'"><td style="text-align:left;padding-left:20px"><input type="hidden" name="pids[]" value="'+id2+'"><div class="tb_over">'+t1+'</div></td><td><div class="tb_over">'+t2+'</div></td><td><div class="tb_over">'+t3+'</div></td><td><div class="tb_over">'+t6+'</div></td><td><div class="tb_over">'+t4+'</div></td><td>'+t8+'</td><td><div class="tb_over">'+t5+'</div></td><td class="table_l">'+t9+'</td><td class="table_l"><!--<a onclick="javascript: editProduct(this,1)" pro-id="'+id2+'" href="javascript:;">编辑</a>&nbsp;&nbsp; --><a class="del_product" href="javascript:;" onclick="delOneList(this)">删除</a></td></tr>';	
			str += subStr;
		}		
	});
	return str;	
}


function createOneList(arr,id,state) {
	var str = '<ul id="proList-'+id+'" class="bill_list" style="display: '+state+'">';
	
	for(var j = 0,subLen = arr.length;j < subLen;j++) {
		var mark = id + '_' + arr[j].pid;
		str += '<li check-mark="'+mark+'"><p class="bill_list_li1"><input type="checkbox" class="checkbox_1" value="34" name="pid[]"></p><p class="bill_list_li2">'+arr[j].name+'</p><p class="bill_list_li3">'+arr[j].brand+'</p><p class="bill_list_li4">'+arr[j].style+'</p><p class="bill_list_li7">'+arr[j].addr+'</p><p class="bill_list_li5">￥'+arr[j].price+'</p><p class="bill_list_li8">'+arr[j].num+'</p><p class="bill_list_li6">'+arr[j].demo+'</p>';
		
		if(arr[j].feeling=='3'){
			str +='<p class="bill_list_li9 table_l "><span class="recommend_box"><a href="javascript:"> <input type="radio" name="recommend1" value="3" pro-id="" class="recommend" title="不值得买,不推荐"/></a><i class="one recommen_no focus" ></i></span></p>';
		}
		if(arr[j].feeling=='1'){
			str +='<p class="bill_list_li9 table_l"><span class="recommend_box"><a href="javascript:"> <input type="radio" name="recommend1" value="1" pro-id="" class="" title="值得买,推荐"/></a><i class="one recommen_yes focus" ></i></span></p> ';
		}
		if(arr[j].feeling=='2'){
			str +='<p class="bill_list_li9 table_l"></p>';
		}
		str +='</li>';
	}	
	str += '</ul>';
	
	return str;
}

function getCheckedPid() {
	var len = textArr.length;
	var obj1 = jq('.diary_items_box').find('tr.table_t');
	var arr = [];
	
	obj1.each(function() {
		var id = jq(this).attr('data-mark');
		var obj2 = jq(this).nextAll('[data-mark="'+id+'"]');	
		obj2.each(function() {
			var val = jq(this).attr('data-value'),
				xx = id+'_'+val;	
			arr.push(xx);
		});
	});	
	
	arr.push(id_str);
	return arr;
}

function initChecked() {
	var chkPid = getCheckedPid(),
		obj = jq('div.zxgl_box').find('ul.bill_list'),
		markId = 1;
	if(!!id_str) {
		markId = id_str.split('_')[0];
		jq('#ptab-'+markId).trigger('click');	
	}
	
	for(var i = 0,len = chkPid.length;i < len;i++) {
		obj.find('li[check-mark="'+chkPid[i]+'"]').find('input.checkbox_1').attr('checked',true);
	}
	var selNum = jq(".checkbox_1:checked").length;
    jq("#selectNum").html( selNum );	
}

function validateProduct(){

    var obj = jq('div.form_line'),
            a;
            
    jq('#producName').checkForm({className:"form_error",content:["请输入商品名称","商品名称不能超过10个字"],type:[1,2], reg:{len:10},checkFormType:obj, displayNum:true});
    jq('#price').checkForm({className:"form_error",content:["请输入价格","请输入正确价格（0.1-9999999.9）"],type:[1,2], reg:9,checkFormType:obj, displayNum:true});
	
	if(jq('#brand').val() != '') {
		jq('#brand').checkForm({className:"form_error",content:["请输入品牌","品牌不能超过10个字"],type:[1,2], reg:{len:10},checkFormType:obj, displayNum:true});	
	}
    jq('#buy_from').checkForm({className:"form_error",content:["请选择购买地址"],type:[1], reg:1,checkFormType:obj,displayNum:true});
	if(jq('#buy_from').val() == 500 || jq('#buy_from').val() == 1000) {
        jq('#from_name').checkForm({className:"form_error",content:["请输入购买地址","购买地址不能超过10个字"],type:[1,2], reg:{len:10},checkFormType:obj, displayNum:true});
    }
    //if(jq('#spec').val() != '') {
	jq('#spec').checkForm({className:"form_error",content:["请输入规格款式","规格款式不能超过10个字"],type:[1,2], reg:{len:10},checkFormType:obj, displayNum:true});	
	//}


	
    a = jq('#category_1').checkForm({className:"form_error",content:["请选择商品类别"],type:[1], reg:1,checkFormType:obj, displayNum:true});
    if(a === 0) {
        jq('#category_2').checkForm({className:"form_error",content:["请选择商品类别"],type:[1], reg:1,checkFormType:obj, displayNum:true});   
    }
	if(jq('#description').val() != '') {
		jq('#description').checkForm({className:"form_error",content:["请输入备注","备注不能超过50个字"],type:[1,2], reg:{len:50},checkFormType:obj, displayNum:true});	
	}
	    
    if(obj.find("div.form_error").length == 0) {
        return true;
    } else {
        return false;   
    }    
}

//End add

// 选择列表

!function(){
  var zgsList = {
    init:function(){
      zgsListDocReady();//doc ready 
    }
    
  }
  function zgsListDocReady(){
    var str = '<a href="javascript:void(0)" class="xgt_nav_showMore" onClick="javascript:showMore(this)" title="点击展开"></a>',
      hasHdd;
    jq('.zgs_st_dl >dd').each(function(index, element) {
            if(jq(this).height() > 40){
        jq(this).parent().addClass('height_40');
        jq(this).parent().append(str);
      }
        });
    jq('.zgs_st_dl  > dd > a').on("click", function(){
      jq(this).parent().find('a').removeClass('on');
      jq(this).addClass('on');
    });
    if(jq(".zgs_select_type > dl.zgs_st_dl.height_40")) {
      jq(".zgs_select_type > dl.zgs_st_dl.height_40").each(function() {
        hasHdd = jq(this).find("dd");
        if(hasHdd.length!=0 && hasHdd.find("a.on").length!=0 && hasHdd.find("a.on").position().top >= 40) {
          hasHdd.next().click();  
        } 
      });
    }
  }
  window.zlDocReady = zgsList;
}(jQuery)
function showMore(a){
  var obj = jq(a);
  if(!obj.hasClass('showMore_down')){
    obj.attr('title', '点击收起').addClass('showMore_down');
    obj.parent().addClass('height_auto');
  }else{
    obj.attr('title', '点击展开').removeClass('showMore_down');
    obj.parent().removeClass('height_auto');
  }
}


//表单focus样式
function blurStyle(focusEle,focusClass){
  if(focusEle.hasClass(focusClass)){
      focusEle.removeClass(focusClass);
      if(focusEle.parents('.edit_form').length != 0){
      	focusEle.css('border-color','#eee');
      }else{
      	focusEle.css('border-color','#ccc');
      }
      
  }
}
function focusStyle(focusEle,focusClass,errClass){
  if(!focusEle.hasClass(errClass)){
    focusEle.addClass(focusClass);
    focusEle.css('border-color','#96d5b9');
  }
  else{
  	focusEle.removeClass(errClass).addClass(focusClass);
  	focusEle.css('border-color','#96d5b9');
  	focusEle.parents('.form_element').find('.form_error').remove();
  }
}

function formInputStyle(){
	jq("body").on("focus",".text",function(){
	    focusStyle(jq(this),"focus_input","error_input")
	})
	jq("body").on("blur",".text",function(){
	    blurStyle(jq(this),"focus_input")
	});
	jq("body").on("focus",".select",function(){
	    focusStyle(jq(this),"focus_input","error_input")
	})
	jq("body").on("blur",".select",function(){
	    blurStyle(jq(this),"focus_input")
	});
}

//上一步
function btn_pre(){
	jq("body").off("click",".box_write_diary .btn_white");
	jq("body").on("click",".box_write_diary .btn_white",function() {
		jq(".write_diary_step > ul > li.on").removeClass("on").prev().addClass("on");
		jq(this).parents("div.step_item").find(".form_error").remove();
		jq(this).parents("div.step_item").hide().prev("div.step_item").show();	
	});
}

var chooseQueue = [];
function indexOfArr(arr , item){
    for(var i=0;i<arr.length;i++){
        if(item === arr[i])return i;
    }
    return -1;
}
//装修风格选择
function choose_style(){
    chooseQueue = [];
	jq("body").off("click","ul.design_style > li");
	jq("body").on("click","ul.design_style > li",function() {
        var _this = this;
		jq(this).parents('.form_element').find('.form_error').remove();
		var slecLen = 0;
	
		if(jq(this).hasClass("select_status")) {
            var idx = indexOfArr(chooseQueue,_this);
            chooseQueue.splice(idx,1);
            jq(this).removeClass("select_status").find("span").remove();
		} else {
            chooseQueue.push(_this);
            jq(this).addClass("select_status").append(jq("<span></span>")); 
			slecLen = jq(this).parent().find("li.select_status").length;
			/*if(slecLen >= 2) {
				jq(this).parent().find("li").not(".select_status").click(function() {
					return;	
				});	
			} else {
				jq(this).addClass("select_status").append(jq("<span></span>"));	
			}*/
            if(slecLen >2) {
                var firstSelect = chooseQueue.shift();
                jq(firstSelect).removeClass("select_status").find("span").remove();
            }
		}
	}); 
}

//下一步
function btn_next(){
    jq("body").off("click",".box_write_diary .btn_next");
	jq("body").on("click",".box_write_diary .btn_next",function(){
		//点击下一步验证数据是否正确
		step_item = jq(".write_diary_step > ul > li.on > em").html();
		if(!xperimental(step_item))
		{
			return ;
		}
		jq(".write_diary_step > ul > li.on").removeClass("on").next().addClass("on");
		jq(this).parents("div.step_item").find(".form_error").remove();
		jq(this).parents("div.step_item").hide().next("div.step_item").show();
	});
	btn_pre();
	choose_style();
}	

	//预约看现场
    function bookSpot(obj){
      var str = '<div class="zxgl_box zxgl_box_bookspot"><div class="box_form"><div class="form_line"><label class="label">您的称呼</label><div class="form_element"><input type="text" class="text" id="chenhu" name="chenhu" autocomplete=off><input type="hidden" name="gdid" id="gdid" value="" /><input type="hidden" name="fid" id="fid" value="" /></div></div><div class="form_line"><label class="label">您的电话</label><div class="form_element"><input type="text" class="text" id="phone" name="phone" autocomplete=off></div></div><div class="form_line"><label class="label">申请类型</label><div class="form_element"><textarea class="text" name="odemo" id="odemo"></textarea></div></div><div class="form_btn"><div class="form_element"><a href="javascript:yuyuePost();" class="btn_org">免费申请</a><a href="javascript:window_box_close();" class="btn_white">取消</a></div></div></div></div>';
      jq('.window_box').windowBox({
          width:455,    //弹框宽度
          title:"预约看现场", //标题
          wbcStr:str,  //可编辑内容
          cancleBtn:false,    //是否显示取消按钮
          confirmBtn:false,  // 是否显示确认按钮
          callback:""
      }); 
	  jq("#gdid").val(obj.gid);
	  jq("#fid").val(obj.fid);
	  jq("body").on('focus','.zxgl_box_bookspot .text',function(){
	  		jq(this).parents('.form_element').find('.form_error').remove();
	  });
    }
	
	function yuyuePost()
	{
		//日记详情页通过全局变量click_id置顶点击流ID 现场详情页使用默认的
		if (typeof(click_id)!="undefined") 
		{
			clickStream.getCvParams(click_id);
		}
		else
		{
			clickStream.getCvParams('1_3_2_1');
		}
				
		var chenhu		= jq("#chenhu").val();
		var phone		= jq("#phone").val();
		var odemo		= jq("#odemo").val();
		var gdid		= jq("#gdid").val();
		var fid			= jq("#fid").val();

		var cityid		= getCookie('townid',true);
		{
			jq.ajax({
				type:'post',
				url:"http://www.meijialz.com/riji/ajaxpost.php",
				dataType:'json',
				data:{'act':'yuyuePost','chenghu':chenhu,'phone':phone,'odemo':odemo,'gid':gdid,'cityid':cityid,'fid':fid},
				beforeSend:function(){
					return xperimental(5);
				},
				success:function(res)
				{
					window_box_close();
					successTip(res.msg); 
				}
			});
			
		}		
	}
	
	
	
/***************************************修改资料 start********************************************/	
//修改资料
	var design_style_selected='';
	//mtype=1中标,2未中标
	//sid是工地id
	function modifyInfo(mtype,id){
		if(mtype==2)
		{
			writeDiary(id);
			return ;
		}
		
		
		var str = '<div class="zxgl_box box_modify"><div class="box_form"><div class="form_line"><label class="label">标题</label><div class="form_element"><input type="text" class="text" id="title" name="title" maxlength="40" autocomplete=off /><input type="hidden" name="gdid" id="gdid" value="" /></div></div><div class="form_line"><label class="label">风格</label><div class="form_element"><ul class="design_style" id="design_style"><li design_date="1"><a href="javascript:void(0)">简约</a></li><li design_date="2"><a href="javascript:void(0)">现代</a></li><li design_date="3"><a href="javascript:void(0)">中式</a></li><li design_date="4"><a href="javascript:void(0)">欧式</a></li><li design_date="5"><a href="javascript:void(0)">美式</a></li><li design_date="6"><a href="javascript:void(0)">田园</a></li><li design_date="7"><a href="javascript:void(0)">新古典</a></li><li design_date="8"><a href="javascript:void(0)">混搭</a></li><li design_date="9"><a href="javascript:void(0)">地中海</a></li><li design_date="10"><a href="javascript:void(0)">东南亚</a></li><li design_date="11"><a href="javascript:void(0)">日式</a></li><li design_date="12"><a href="javascript:void(0)">宜家</a></li><li design_date="13"><a href="javascript:void(0)">北欧</a></li><li design_date="14"><a href="javascript:void(0)">简欧</a></li></ul><div class="form_info">最多可选两个风格标签</div></div></div><div class="form_line"><label class="label">装修方式</label><div class="form_element"><select class="select" name="zxtype" id="zxtype"><option value="1">清包</option><option value="2">半包</option><option value="3">全包</option></select></div></div><div class="form_line"><label class="label">面积</label><div class="form_element"><input type="text" autocomplete=off class="text text_s" id="oarea" name="oarea" /><em class="dw">㎡</em></div></div><div class="form_btn"><div class="form_element"><a href="javascript:modifyDiaryInfo();" class="btn_org">确定</a><a href="javascript:window_box_close();" class="btn_white">取消</a></div></div></div></div>';
		
		jq('.window_box').windowBox({
          width:455,    //弹框宽度
          title:"修改资料", //标题
          wbcStr:str,  //可编辑内容
          cancleBtn:false,    //是否显示取消按钮
          confirmBtn:false,  // 是否显示确认按钮
          callback:""
    	});
		
		//获取工地信息
		getgongdiInfo(id);
		formInputStyle();
		btn_next();
		btn_pre();
	}
	
	
	var design_style= '';
	function modifyDiaryInfo()
	{
		var oarea		= jq("#oarea").val();
		var zxtype		= jq("#zxtype option:selected").val();
		var title		= jq("#title").val();
		var gdid		= jq("#gdid").val();
		design_style = '';
		jq("#design_style li").each(function(){
			if(jq(this).attr('class') == "select_status")
			{
				design_fg    = design_style==''?'':',';
				design_style = design_style + design_fg + jq(this).attr('design_date');
			}								 
		});
		
		{
			jq.ajax({
				type:'post',
				url:"http://www.meijialz.com/riji/ajaxpost.php",
				datatype:'json',
				data:{'act':'modifyDiary','oarea':oarea,'zxtype':zxtype,'title':title,'design_style':design_style,'gdid':gdid},
				beforeSend:function(){
					return xperimental(4);
				},
				success:function(result){
					if (typeof(JSON) == "undefined") {
						var res = eval("(" + result + ")")
					} else {
						var res = JSON.parse(result)
					}
					successTip(res.msg);
					window_box_close();
                                        window.location.reload(); //修复BUG #5903
				}
			});
			
		}
		
	}


//写清单
function writeProduct()
{
    writeDiary(0,'product');
}

/***********************************写日记start***********************************************************/

function reloadLocation() {
	var loc = location.href;
	window_box_close();
	window.location = loc.replace('write_diary_from_yz','');	
}


//写日记
var userWriteDiary = 0;
    function writeDiary(id,act,isReload){
		var username=getCookie('username',true);
		if(!username)
		{	
			setZero();	
			userWriteDiary = 1;
			showPopWin('http://www.meijialz.com/pop_login.php', 500, 426, null, false);
			return;
		}
        		
		
		var ind=getCookie('ind',true);
		if(ind!='yz')
		{
			failTip('您不是业主，无法写日记！');
			return false;
		}
        var closeCallback = "window_box_close";
        //判断是否需要刷新页面
        if(isReload){
           closeCallback = "reloadLocation";
        }

		formInputStyle();
		/*var boxtitle	= "新建日记";
		var subbutten 	= "开始写日记";
        var editinfo 	= "开始写日记";

		if(id)
		{
			boxtitle	= "修改资料";
			subbutten 	= "修改完成";
            editinfo    = '完成资料修改';
		}
        if (act=='product')
        {
            var boxtitle	= "新建清单";
            var subbutten 	= "开始写清单";
            var editinfo 	= "开始写清单";
        }*/

        //var str = '<div class="zxgl_box box_write_diary"><div class="write_diary_step"><ul class="clearfix"><li class="on"><em>1</em>填写您家信息</li><li><em>2</em>完善装修资料</li><li class="step3"><em>3</em>'+editinfo+'</li></ul></div><div class="box_form"><div class="step_item"><div class="form_line"><label class="label">地址</label><div class="form_element"><div class="clearfix"><select class="select select_s" onchange="changeProvince(\'User_Shen\',\'User_City\',\'User_Town\');" name="User_Shen" id="User_Shen"></select><select class="select select_s" onchange="changeTown(\'User_Shen\',\'User_City\',\'User_Town\');"  name="User_City" id="User_City"></select><select class="select select_s" id="User_Town" name="User_Town"></select></div></div></div><div class="form_line"><label for="" class="label">小区</label><div class="form_element"><div class="option_list"><input type="text" class="text" id="address" name="address" autocomplete=off maxlength="64"/><div class="" id="js_new"></div></div></div></div><div class="form_line"><label class="label">面积</label><div class="form_element"><input type="text" class="text text_s" id="oarea" name="oarea" autocomplete=off maxlength="5" /><em class="dw">㎡</em></div></div><div class="form_line"><label class="label">户型</label><div class="form_element"><select class="select select_s"  id="house_type" name="house_type"><option value="1">小户型</option><option value="7">一居</option><option value="2">二居</option><option value="3">三居</option><option value="4">四居</option><option value="5">复式</option><option value="6">别墅</option><option value="8">公寓</option></select></div></div><div class="form_btn"><div class="form_element"><a href="javascript:;" class="btn_org btn_next">下一步</a></div></div></div><div class="step_item"  style="display:none;"><div class="form_line"><label class="label">装修方式</label><div class="form_element"><select class="select" name="zxtype" id="zxtype"><option value="1">清包</option><option value="2">半包</option><option value="3">全包</option></select></div></div><div class="form_line"><label class="label">风格</label><div class="form_element"><ul class="design_style" id="design_style"><li design_date="1"><a href="javascript:void(0)">简约</a></li><li design_date="2"><a href="javascript:void(0)">现代</a></li><li design_date="3"><a href="javascript:void(0)">中式</a></li><li design_date="4"><a href="javascript:void(0)">欧式</a></li><li design_date="5"><a href="javascript:void(0)">美式</a></li><li design_date="6"><a href="javascript:void(0)">田园</a></li><li design_date="7"><a href="javascript:void(0)">新古典</a></li><li design_date="8"><a href="javascript:void(0)">混搭</a></li><li design_date="9"><a href="javascript:void(0)">地中海</a></li><li design_date="10"><a href="javascript:void(0)">东南亚</a></li><li design_date="11"><a href="javascript:void(0)">日式</a></li><li design_date="12"><a href="javascript:void(0)">宜家</a></li><li design_date="13"><a href="javascript:void(0)">北欧</a></li><li design_date="14"><a href="javascript:void(0)">简欧</a></li></ul><div class="form_info">最多可选两个风格标签</div></div></div><div class="form_btn"><div class="form_element"><a href="javascript:;" class="btn_white">上一步</a><a href="javascript:;" class="btn_org btn_next">下一步</a></div></div></div><div class="step_item" style="display:none;"><div class="form_line"><label class="label">装修公司</label><div class="form_element"><div class="option_list"><label for="select_company1" class="radio_lbl"><input name="select_company" id="select_company1" class="select_company radio"  type="radio" value=1 checked>已选择装修公司</label><input type="text" class="text" maxlength="16" id="companyname" name="companyname" autocomplete=off/><em>请输入装修公司名称</em><div class="" id="show_companyname" style="display:none;left:112px;"></div></div><div class=""><label for="select_company2" class="radio_lbl"><input name="select_company" id="select_company2" class="select_company radio" type="radio" value=2>未选择装修公司</label></div></div></div><div class="form_line"><label class="label">日记主题</label><div class="form_element"><input type="text" maxlength="40" class="text" value="" id="title" name="title" autocomplete=off /><input type="hidden" name="gdid" id="gdid" value="" /></div></div><div class="form_btn"><div class="form_element"><a href="javascript:;" class="btn_white">上一步</a><a href="javascript:createDiaryInfo();" class="btn_org">'+subbutten+'</a></div></div></div></div></div>';

        var str = '<div class="zxgl_box box_write_diary">\
                        <div class="box_form">\
                            <div class="step_item">\
                                <div class="form_line">\
                                    <label class="label">日记标题</label>\
                                    <div class="form_element">\
                                        <input  id="title" name="title" class="text" value="" type="text" maxlength="20">\
                                        <em class="text_lbl">给装修起个好听的名字吧！</em>\
                                        <input type="hidden" name="gdid" id="gdid" value="0">\
                                    </div>\
                                </div>\
                                <div class="form_line"><label class="label">户型</label><div class="form_element">\
                                <select class="select select_b" id="house_type" name="house_type">\
                                <option value="1">小户型</option><option value="7">一居</option><option value="2">二居</option>\
                                <option value="3">三居</option><option value="4">四居</option><option value="5">复式</option>\
                                <option value="6">别墅</option><option value="8">公寓</option>\
                                </select></div></div>\
                                 <div class="form_line">\
                                    <label class="label">面积</label>\
                                    <div class="form_element"><input id="oarea" name="oarea" class="text text_s" type="text" maxlength="4"><em class="dw">㎡</em></div>\
                                </div>\
                                <div class="form_line">\
                                    <label class="label">城市</label>\
                                    <div class="form_element">\
                                        <div class="clearfix">\
                                            <select class="select select_s" onchange="changeProvince(\'User_Shen\',\'User_City\',\'User_Town\');"name="User_Shen" id="User_Shen">\
                                            </select><select class="select select_s" onchange="changeTown(\'User_Shen\',\'User_City\',\'User_Town\');" \
                                            name="User_City" id="User_City"></select>\
                                            <select class="select select_s" id="User_Town" name="User_Town"></select>\
                                        </div>\
                                    </div>\
                                </div>\
                                 <div class="form_line">\
                                    <label class="label_fl">风格</label>\
                                    <label class="label_fr">(选择您装修的风格，最多两个哦~)</label>\
                                    <div class="form_element">\
                                        <ul class="design_style" id="design_style">\
                                            <li design_date="1"><a href="javascript:void(0)">简约</a></li>\
                                            <li design_date="2"><a href="javascript:void(0)">现代</a></li>\
                                            <li design_date="3"><a href="javascript:void(0)">中式</a></li><li design_date="4"><a href="javascript:void(0)">欧式</a></li>\
                                            <li design_date="5"><a href="javascript:void(0)">美式</a></li><li design_date="6"><a href="javascript:void(0)">田园</a></li>\
                                            <li design_date="7"><a href="javascript:void(0)">新古典</a></li><li design_date="8"><a href="javascript:void(0)">混搭</a></li>\
                                            <li design_date="9"><a href="javascript:void(0)">地中海</a></li><li design_date="10"><a href="javascript:void(0)">东南亚</a></li>\
                                            <li design_date="11"><a href="javascript:void(0)">日式</a></li><li design_date="12"><a href="javascript:void(0)">宜家</a></li>\
                                            <li design_date="13"><a href="javascript:void(0)">北欧</a></li><li design_date="14"><a href="javascript:void(0)">简欧</a></li>\
                                        </ul>\
                                     </div>\
                                </div>\
                                 <div class="form_line">\
                                    <label class="label">装修方式</label>\
                                    <div class="form_element">\
                                        <select  name="zxtype" id="zxtype" class="select select_c">\
                                           <option value="1">清包（预算最低，装修公司只包施工）</option><option value="2">半包（大众首选，装修公司包施工和辅料）</option><option value="3">全包（省时省力，装修公司包工包料）</option>\
                                        </select>\
										<span class="special_span"></span>\
                                    </div>\
                                </div>\
                                <div class="form_line" style="position: relative; z-index: 1;">\
                                    <label for="" class="label">小区名称</label>\
                                    <div class="form_element option_list">\
                                            <input id="address" name="address" class="text" value="" type="text"  maxlength="20">\
                                            <div class="" id="js_new"></div>\
                                    </div>\
                                </div>\
                            </div>\
                            <div class="step_item">\
                                <div class="form_line">\
                                    <label class="label">装修公司</label>\
                                    <div class="form_element">\
                                        <div class="option_list">\
                                            <label for="select_company1" class="radio_lbl"><input name="select_company" id="select_company1" class="select_company radio" type="radio" value="1" checked>已选择装修公司</label>\
                                            <span><input type="text" class="text" maxlength="20" id="companyname" name="companyname">\
                                            <em class="text_lbl_t">请输入装修公司名称</em></span>\
                                            <div class="" id="show_companyname" style="display:none;left:116px;*left: 123px;"></div>\
                                        </div>\
                                        <div class="">\
                                            <label for="select_company2" class="radio_lbl"><input name="select_company" id="select_company2" class="select_company radio" type="radio" value="2">未选择装修公司</label>\
                                        </div>\
                                    </div>\
                                </div>\
                                <div class="form_btn">\
                                    <div class="form_element">\
                                        <a href="javascript:createDiaryInfo();" class="btn_org">开始写日记</a>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>';

        jq('.window_box').windowBox({
          width:455,    //弹框宽度
          title:'我的新家装修', //标题
          wbcStr:str,  //可编辑内容
          cancleBtn:false,    //是否显示取消按钮
          confirmBtn:false,  // 是否显示确认按钮
          closeFn: closeCallback
        });

        jq('.form_element').on('click','.select_company',function(){
            //移除出错提示
            jq('#companyname').focus();
            if (jq(this).val()==1){
                jq('#companyname').parent().show();
            }else {
                jq('#companyname').parent().hide();
            }
        });

		/********************楼盘提示start**********************/
		// jq("#address").click(function(){
		// 	if(jq(this).val() == "小区")
		// 	{
		// 		jq(this).val('');
		// 	}
		// });
        jq('#companyname').keydown(function() {
            jq(this).next().hide();
        }).blur(function() {
            if(jq(this).val() == '') {
                jq(this).next().show();
            }
        }).next().click(function() {
            jq(this).prev().focus();
        });
		
        jq("#title").placeholder();

		jq("#address").keyup(function(){
			address();
		});
                
        jq("#address").click(function(){
			address();
		});
        function address() {
            var keyword_value= jq.trim(jq("#address").val());
			var User_Shen 	= jq("#User_Shen option:selected").val();
			var User_City 	= jq("#User_City option:selected").val();
			var User_Town 	= jq("#User_Town option:selected").val();
			if(keyword_value)
			{
				jq.ajax({
					type:'get',
					url:"http://www.meijialz.com/api/loupan_search.php",
					datatype:'jsonp',
					data:{'loupan_key':keyword_value,'shen':User_Shen,'city':User_City,'town':User_Town},
					success:function(data){
						if(data==0)
						{
							jq("#js_new").css("display","none");
						}
						else
						{
							jq("#js_new").css("display","block");
							jq("#js_new").html(data);
							jq("#js_new ul li").each(function(){
								jq(this).bind("click",function(){ 
									jq("#address").val(jq(this).html());
									jq("#js_new").css("display","none");
								});						
							});
							jq(".window_box_container").click(function(){
								jq("#js_new").css("display","none");
							});
						}
						
					}
				});
			} else {
				jq("#js_new").css("display","none");	
			}
        }
		jq("#companyname").keyup(function(){show_companyname()});
		jq("#companyname").click(function(){show_companyname()});
		setgpm(); //初始化城市
		getgongdiInfo(id);
		btn_next();
		/*********************end****************/
    }
	
	function show_companyname(){
			var keyword_value= jq.trim(jq("#companyname").val());
			if(keyword_value)
			{
				jq.ajax({
					type:'get',
					url:"http://www.meijialz.com/api/company_search.php",
					datatype:'jsonp',
					data:{'companyname':keyword_value},
					success:function(result){
						if(result==0)
						{
							jq("#show_companyname").css("display","none");
						}
						else
						{
							if (typeof(JSON) == "undefined") {
								var res = eval("(" + result + ")")
							} else {
								var res = JSON.parse(result)
							}
							if(res.length>0)
							{
								str='<ul>';
								for(var i=0;i<res.length;i++){
									str+='<li>'+res[i].name+'</li>';
								}
								str+='</ul>';
								jq("#show_companyname").css("display","block");
								jq("#show_companyname").html(str);
								jq("#show_companyname ul li").each(function(){
									jq(this).bind("click",function(){ 
										document.getElementById("companyname").value=html_decode(this.innerHTML);
										jq("#show_companyname").css("display","none");
									});						
								});
								jq(".window_box_container").click(function(){
									jq("#show_companyname").css("display","none");
								});
								
							}
						}
					}
				});
			} else {
				jq("#show_companyname").css("display","none");	
			}
	} 

	if(typeof showPopWin== "undefined")
	{
		jq("head").append('<link type="text/css" rel="stylesheet" href="http://static.meijialz.com/css/start/popupsubModal.css">');
		jq("head").append('<script src="http://static.meijialz.com/gb_js/subModal.js" type="text/javascript"></script>');
	}	
	
	function pop_parent_submit()
	{
		
        //登录成功后刷新页面
        location.reload();
        return;
		var exec = false;
		try{

			if(userClickCollect>0)
			{
				exec = true;
				var ucc = userClickCollect;
				setZero();
				collect(ucc);
				return;
			}
			if(userClickCollectDiary>0)
			{
				exec = true;
				var ud =userClickCollectDiary;
				setZero();
				collect_diary(ud);
				return;
			}
			if(userClickDeleteComment>0)
			{
				exec = true;
				var uc = userClickDeleteComment;
				setZero();
				deleteComment(uc);
				return;
			}
			if(userClickDeleteDiary_did>0)
			{
				exec = true;
				var udid = userClickDeleteDiary_did;
				var usid = userClickDeleteDiary_sid;
				setZero();
				deletediary(udid,usid);
				return;
			}
			if(userCommentDiary>0)
			{
				exec = true;
				setZero();
				comment_diary();
				return;
			}
			if(parseInt(replayI)>0)
			{
				exec = true;
				var ri = replayI;
				var rn = replayName;
				var rc = replayCid;
				setZero();
				replay(ri,rn,rc);
				return;
			}

			if(userSendContent>0)
			{
				exec = true;
				setZero();
				sendContent();
				return;
			}

			if(userWriteDiary>0)
			{ 
				location.reload();
				//exec = true;
				//setZero();
				//writeDiary(0);
				return;
			}
			
		}catch(e){} 
		if(exec===false){
    		writeDiary();
    		jq.post(
    			'http://www.meijialz.com/riji/ajax.php?ac=getLastSceneId',
    			{},
    			function(msg){
    				msg = eval('(' + msg + ')');
    				
    				if(msg.result=='ok'){
    					//存在现场id
    					location.href="http://www.meijialz.com/riji/editscenediary.php?sid="+msg.scene_id;
    					return;
    				}

    				if(msg.result=='notok'){
    					//未找到现场id
    					writeDiary();
    					return;
    				}

    			}

    			);
		}
	}
	/**********************start************************/
	var design_style= '';
	function createDiaryInfo()
	{
		var User_Shen 	= jq("#User_Shen option:selected").val();
		var User_City 	= jq("#User_City option:selected").val();
		var User_Town 	= jq("#User_Town option:selected").val();
		var address 	= jq("#address").val();
		var oarea		= jq("#oarea").val();
		var zxys	 	= jq("#zxys").val();
		var zxtype		= jq("#zxtype option:selected").val();
		var companyname = jq("#companyname").val();
        var select_company = jq(':radio[name="select_company"]:checked').val();
		var title		= jq("#title").val();
		var gdid		= jq("#gdid").val();
        var house_type  = jq("#house_type").val();;
		design_style = '';
		jq("#design_style li").each(function(){
			if(jq(this).attr('class') == "select_status")
			{
				design_fg    = design_style==''?'':',';
				design_style = design_style + design_fg + jq(this).attr('design_date');
			}								 
		});
		
		{
			jq.ajax({
				type:'post',
				url:'http://www.meijialz.com/riji/ajaxpost.php',
				dataType:'json',
				data:{'act':'createDiary','User_Shen':User_Shen,'User_City':User_City,'User_Town':User_Town,'address':address,'oarea':oarea,'zxys':zxys,'zxtype':zxtype,'companyname':companyname,'house_type':house_type,'select_company':select_company,'title':title,'design_style':design_style,'gdid':gdid},
				beforeSend:function(){
					var result =  xperimental(1) && xperimental(2) && xperimental(3);
                    result && jq("div.form_btn a.btn_org").attr("href","javascript:;"); 
                    return result; 
				},
				success:function(res){
					if(res.status==2)
					{
						insertErrorTip("#title",res.msg);
						return;
					} 

					window_box_close();
					submit_sign = 1;//为0时页面跳转，关闭会弹出提示
					if(res.sid)
					{
						location.href = "http://www.meijialz.com/riji/editscenediary.php?sid="+res.sid;
					}
					else
					{
						successTip(res.msg);
						setTimeout(function() {
						 	location.reload();	
						},200);
					}
				}
			});
			
		}
	  
	}
	
	jq("head").append('<script src="http://static.meijialz.com/gb_js/GlobalProvinces.js" type="text/javascript"></script>');
	var gpm = ''; //城市类
	function setgpm()
	{     
		gpm = new GlobalProvincesModule;
        gpm.def_province = ["省/市", ""];
        gpm.def_city1 = ["市/地区", ""];
        gpm.def_city2 = ["县/市", ""];
        gpm.initProvince($('User_Shen'));
        $('User_Shen').value="广东";            
		gpm.initCity1($('User_City'), gpm.getSelValue($('User_Shen')));
        $('User_City').value="深圳";            
		gpm.initCity2($('User_Town'), gpm.getSelValue($('User_Shen')), gpm.getSelValue($('User_City')));
	}
	/*function $(){var obj=new Array();for(var i=0,j=arguments.length;i<j;i++){ele=arguments[i];if(typeof ele=='object')return ele;if(typeof ele=='string')ele=document.getElementById(ele)?document.getElementById(ele):document.getElementsByTagName(ele).length>0?document.getElementsByTagName(ele):false;if(j==1)return ele;obj.push(ele);}return obj;}*/
	
	function getgongdiInfo(id){
		jq("#gdid").val(id);
		//获取工地信息
		if(id)
		{
			jq.ajax({
				type:'post',
				url:"http://www.meijialz.com/riji/ajaxpost.php",
				dataType:'json',
				data:{'act':'getDiaryInfo','gdid':id},
				success:function(res){ 
					jq("#oarea").val(res.oarea);
					jq("#title").val(res.title);
                    if(jq("#title").val()!=""){
                        jq("#title").next().hide();
                    }else{
                        jq("#title").next().show();
                    }
					jq("#house_type").val(res.house_type);
					jq("#zxtype option[value='"+res.zxtype+"']").attr("selected",true);
					jq("#address").val(res.address);
					jq("#zxys").val(res.zxys);
					jq("#companyname").val(res.companyname);
                    if(jq("#companyname").val()!=""){
                       jq('#companyname').next().hide(); 
                    }else{
                        jq('#companyname').next().show();
                    }
                    res.city = res.city.replace('市','');
					jq("#User_Shen option[value='"+res.shen+"']").attr("selected",true);
					jq("#User_City option[value='"+res.city+"']").attr("selected",true);
					jq("#User_Town option[value='"+res.town+"']").attr("selected",true);
					if(res.design_style.length)
                    {
                        design_style_selected = res.design_style.split(',');
                    }
                    var amount = 0;
					jq("#design_style li").each(function(){
                        //默认只赋值两个
                        if(amount > 1){return;}
						if(jq.inArray(jq(this).attr('design_date'),design_style_selected)>-1)
						{
							jq(this).addClass("select_status").append(jq("<span></span>"));	
                            chooseQueue.push(this);
                            amount++;
						}								 
					});
					if(jq("#User_Shen")){
						gpm = new GlobalProvincesModule;
						gpm.def_province = ["省/市", ""];
						gpm.def_city1 = ["市/地区", ""];
						gpm.def_city2 = ["县/市", ""];
						gpm.initProvince($('User_Shen'));
						$('User_Shen').value=res.shen;            
						gpm.initCity1($('User_City'), gpm.getSelValue($('User_Shen')));
						$('User_City').value=res.city;            
						gpm.initCity2($('User_Town'), gpm.getSelValue($('User_Shen')), gpm.getSelValue($('User_City')));
						$('User_Town').value=res.town;  
					}
					
				 //}catch(e){}
					
				}
			});
		}
	}
	
	//插入错误信息
	function insertErrorTip(errPos,errTip){
		if(jq(errPos).is("input") || jq(errPos).is("select")|| jq(errPos).is("textarea")){
			jq(errPos).addClass("error_input");
			jq(errPos).css("border-color","#FF6767");
		}
		var errTipAll = '<div class="form_error"><span class="form_error_ico"></span>' + errTip + '</div>';
		var errObj = jq(errPos).parents(".form_element").children(".form_error");
		if(errObj.length == 0){
			jq(errPos).parents(".form_element").append(errTipAll);
		}
		else{
			var errTipCur = errObj.text();
			if(errTipCur != errTip){
				errObj.text(errTip);
			}
		}
	}
	function checkWordLen(maxLen,val) {
		var len;
		if(null == val.match(/[\u4e00-\u9fa5]/g)) {
			len = val.length;	
		} else if(null == val.match(/[^\u4e00-\u9fa5]/g)) {
			len = val.length * 2;	
		} else {
			len = val.match(/[^\u4e00-\u9fa5]/g).length + val.match(/[\u4e00-\u9fa5]/g).length * 2;		
		}	
		if(maxLen < len) {
			return false;	
		}	
		return true;
	}

	//验证输入是否正确
	function xperimental(step_item)
	{
		var regOareaNum = /^[0-9]+$/g;
		var regZXYSNum = /^[0-9]+(\.\d){0,1}$/g;
		if(step_item==1)
		{
			var source	= {'User_Shen':"#User_Shen",'User_City':"#User_City",'User_Town':"#User_Town",'address':"#address"};
			var sourcedate	= {'User_Shen':jq("#User_Shen option:selected").val(),'User_City':jq("#User_City option:selected").val(),'User_Town':jq("#User_Town option:selected").val(),'address':jq("#address").val()};
			var xperimental = {'User_Shen':'省/市','User_City':'市/地区','User_Town':'县/市','address':'小区'};
			var prompts 	= {'User_Shen':'请选择您所在的省份','User_City':'请选择您所在的城市','User_Town':'请选择您所在的区域','address':'请输入您所在的小区'};
			for(var key in xperimental)
			{
				if(sourcedate[key] == '' ||  sourcedate[key] == xperimental[key])
				{
					//alert(prompts[key]);
					insertErrorTip(source[key],prompts[key]);
					return false;
				}
			}
			var chkLenAdd = checkWordLen(64,jq.trim(jq("#address").val()));
            if(jq.trim(jq("#address").val()).length <= 0){
                insertErrorTip("#address","小区名称不能为空");    
                return false;
            }
			if(!chkLenAdd) {
				insertErrorTip("#address","小区名称过长");	
				return false;
			}
			if(/^\d+$/.test(jq("#address").val())) {
				insertErrorTip("#address","小区名称不能输入纯数字");		
				return false;
			}
			
			var oarea		= jq("#oarea").val();
			if( !regOareaNum.exec(oarea) || oarea<=0 || oarea>10000 || !oarea)
			{
				//alert('请输入正确面积');
				insertErrorTip("#oarea",'请输入正确面积（10000以下）');
				return false;
			}
		}
		else if(step_item==2)
		{
			design_style = '';
			jq("#design_style li").each(function(){
				if(jq(this).attr('class') == "select_status")
				{
					design_fg    = design_style==''?'':',';
					design_style = design_style + design_fg + jq(this).attr('design_date');
				}								 
			});
			if(design_style=='')
			{
				//alert('请选择装修风格');
				insertErrorTip("#design_style",'请选择装修风格');
				return false;
			}
			 
			
			var zxtype		= parseInt(jq("#zxtype option:selected").val());
			if(!zxtype)
			{
				//alert('请选择装修方式');
				insertErrorTip("#zxtype",'请选择装修方式');
				return false;
			}
		}
		else if(step_item==3)
		{
			var source = {'companyname':"#companyname",'title':"#title"};
			var sourcedate	= {'companyname':jq.trim(jq("#companyname").val()),'title':jq.trim(jq("#title").val())};
			var xperimental = {'companyname':'','title':''};
			var prompts 	= {'companyname':'请输入装修公司名称','title':'请输入日记标题'};
			for(var key in xperimental)
			{
				// if(jq(source[key]).is(':visible') || sourcedate[key] == '' ||  sourcedate[key] == xperimental[key])
                if(jq(source[key]).is(':visible') && (sourcedate[key] == '' || sourcedate[key] == prompts[key]) )
				{
					insertErrorTip(source[key],prompts[key]);
					return false;
				}
			}
			/*var chkLenCom = checkWordLen(64,jq("#companyname").val());
			if(!chkLenCom) {
				insertErrorTip("#companyname","公司名称过长");	
				return false;
			}
			var chkLenTit = checkWordLen(40,jq("#title").val());
			if(!chkLenTit) {
				insertErrorTip("#title","日记标题过长");	
				return false;
			}*/
			var chkLenTit = jq("#title").val().length;
			if(chkLenTit > 20) {
				insertErrorTip("#title","日记标题最多可输入20个字");	
				return false;
			}
		}
		else if(step_item==4)
		{
			var source	= {'title':"#title",'zxtype':"#zxtype"};
			var sourcedate	= {'title':jq("#title").val(),'zxtype':jq("#zxtype option:selected").val()};
			var xperimental = {'title':'','zxtype':0};
			var prompts 	= {'title':'请输入日记标题','zxtype':'请选择装修方式'};
			for(var key in xperimental)
			{
				if(sourcedate[key] == '' ||  sourcedate[key] == xperimental[key])
				{
					//alert(prompts[key]);
					insertErrorTip(source[key],prompts[key]);
					return false;
				}
			}
			/*var chkLenTit = checkWordLen(40,jq("#title").val());
			if(!chkLenTit) {
				insertErrorTip("#title","日记标题过长");	
				return false;
			}*/
			var chkLenTit = jq("#title").val().length;
			if(chkLenTit > 20) {
				insertErrorTip("#title","日记标题最多可输入20个字");	
				return false;
			}
			var oarea		= jq("#oarea").val();
			if(!regOareaNum.exec(oarea) || oarea<=0 || oarea>10000 || !oarea)
			{
				//alert('请输入正确面积');
				insertErrorTip("#oarea",'请输入正确面积（10000以下）');
				return false;
			}
			
			design_style = '';
			jq("#design_style li").each(function(){
				if(jq(this).attr('class') == "select_status")
				{
					design_fg    = design_style==''?'':',';
					design_style = design_style + design_fg + jq(this).attr('design_date');
				}								 
			});
			if(design_style=='')
			{
				//alert('请选择装修风格');
				insertErrorTip("#design_style",'请选择装修风格');
				return false;
			}
			
		}
		else if(step_item==5)
		{
			var source	= {'chenhu':"#chenhu",'phone':"#phone",'odemo':"#odemo"};
			var sourcedate	= {'chenhu':jq("#chenhu").val(),'phone':jq("#phone").val(),'odemo':jq("#odemo").val()};
			var xperimental = {'chenhu':'','phone':'','odemo':''};
			var prompts 	= {'chenhu':'请输入您的称呼','phone':'请输入正确的电话号码','odemo':'请输入申请类型'};
			for(var key in xperimental)
			{
				if(sourcedate[key] == '' ||  sourcedate[key] == xperimental[key])
				{
					//alert(prompts[key]);
					insertErrorTip(source[key],prompts[key]);
					return false;
				}
				switch(key)
				{
					case 'phone':
						var reg1 =/^((\(\d{2,3}\))|(\d{3}\-))?(13|14|15|16|17|18)\d{9}$/;   
						if(!reg1.test(sourcedate[key]))
						{
							//alert(prompts[key]);
							insertErrorTip(source[key],prompts[key]);
							return false;
						};break;
				}
				
			}
				
			
		}
		return true;
	}
	/**********************end*************************/


/********************************写日记 end*************************************************/	



	
/*****************************************************/
jq(".diary_detail .diary_select .btn_diary_time").click(function() {
	var em = jq(this).find("em");
	if(em.hasClass("ico_arrows_down")) {
		em.removeClass("ico_arrows_down").addClass("ico_arrows_up");
	} else {
		em.removeClass("ico_arrows_up").addClass("ico_arrows_down");	
	}  
});




// 确认日记删除
function deleteDiaryConfirm(delStr,did,sid){
    var str = '<div class="zxgl_box zxgl_box_confirm">' + delStr + '<div class="form_btn clearfix"><a href="javascript:void(0);" onclick="deletediary('+did+','+sid+')" class="btn_org">确定</a><a href="javascript:void(0);" onclick="concelDelete();" class="btn_white">取消</a></div></div>';
    jq('.window_box').windowBox({
      width:455,    //弹框宽度
      title:"提示", //标题
      wbcStr:str,  //可编辑内容
      cancleBtn:false,    //是否显示取消按钮
      confirmBtn:false,  // 是否显示确认按钮
      callback:""
    });
}

// 确认评论删除
function deleteCommentConfirm(delStr,cid){
    var str = '<div class="zxgl_box zxgl_box_confirm">' + delStr + '<div class="form_btn clearfix"><a href="javascript:void(0);" onclick="deleteComment('+cid+')" class="btn_org">确定</a><a href="javascript:void(0);" onclick="concelDelete();" class="btn_white" >取消</a></div></div>';
    jq('.window_box').windowBox({
      width:455,    //弹框宽度
      title:"提示", //标题
      wbcStr:str,  //可编辑内容
      cancleBtn:false,    //是否显示取消按钮
      confirmBtn:false,  // 是否显示确认按钮
      callback:""
    });
}

function concelDelete()
{
	window_box_close();
}


// 成功提示
function successTip(sucStr){
	var str = '<div class="zxgl_box_tip"><span class="as_true_suc"></span><strong>' + sucStr + '</strong></div>' ;
    jq('.window_box').windowBox({
      width:455,    //弹框宽度
      title:"提示", //标题
      wbcStr:str,  //可编辑内容
      cancleBtn:false,    //是否显示取消按钮
      confirmBtn:false,  // 是否显示确认按钮
      callback:"",
      closeTime:3000
    });
}

// 装修日记成功提示
function successTip2(){
	var str = '<div class="zxgl_box_tip zxgl_box_tipbtn"><span class="as_true_suc"></span><strong>恭喜您，您的日记已经提交成功！</strong><em>为了您和其他用户看到更优质真实的装修日记内容，您的日记提交后在24小时内会有专人审核，通过的日记将会展示在装修日记频道，请耐心等待！</em></div>' ;
    jq('.window_box').windowBox({
      width:560,    //弹框宽度
      title:"提示", //标题
      wbcStr:str,  //可编辑内容
      cancleBtn:false,    //是否显示取消按钮
      confirmBtn:false,  // 是否显示确认按钮
      callback:""
    });
}

// 失败提示
function failTip(failStr){
	var str = '<div class="zxgl_box_tip"><span class="as_true_fail"></span><strong>' + failStr + '</strong></div>' ;
    jq('.window_box').windowBox({
      width:455,    //弹框宽度
      title:"提示", //标题
      wbcStr:str,  //可编辑内容
      cancleBtn:false,    //是否显示取消按钮
      confirmBtn:false,  // 是否显示确认按钮
      callback:""
    });
}

// 失败提示2(带灰色文字)
function failTip2(failStr,failStr2){
	var str = '<div class="zxgl_box_tip zxgl_box_tip2"><span class="as_true_fail"></span><div class="tip2_bd"><div class="tip2_title">' + failStr + '</div><div class="tip2_info">' + failStr2 + '</div></div></div>' ;
    jq('.window_box').windowBox({
      width:500,    //弹框宽度
      title:"提示", //标题
      wbcStr:str,  //可编辑内容
      cancleBtn:false,    //是否显示取消按钮
      confirmBtn:false,  // 是否显示确认按钮
      callback:""
    });
}

/*function getCookie(name,pre)
{
	if(pre)
		name='to8to_'+name;
	var r=new RegExp("(\\b)"+name+"=([^;]*)(;|$)");
	var m=document.cookie.match(r);
	return(!m?"":decodeURIComponent(m[2]));
}*/

function html_decode(str)
{
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/&amp;/g, "&");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&nbsp;/g, " ");
    s = s.replace(/&quot;/g, "\"");
    return s;
  }

/**
 * 埋点用到的
 * @return {[type]} [description]
 */
  function click_stream(ptag){
    clickStream.getCvParams(ptag);
  }

//延迟加载
  ;(function($) {
    var defaults = {
        arr : [],
        callback:function(){}
    };
    var Lazy = function(config){
        this.init(config);
    }

    Lazy.prototype.init = function(config){
        this.config = $.extend({},defaults,config);
        this.initEvent();
    }

    Lazy.prototype.initEvent = function(){
        var _this = this;
        $(window).bind("scroll",function(){  
            autocheck(_this);
        });
        $(window).resize(function() {
            autocheck(_this);
        });
    }

    // 返回浏览器的可视区域位置 
    function getClient() {
        var l, t, w, h;
        l = document.documentElement.scrollLeft || document.body.scrollLeft;
        t = document.documentElement.scrollTop || document.body.scrollTop;
        w = document.documentElement.clientWidth;
        h = document.documentElement.clientHeight;
        return {
            left: l,
            top: t,
            width: w,
            height: h
        };
    }

    // 返回待加载资源位置 
    function getSubClient(p) {
        var l = 0,
            t = 0,
            w, h;
        w = p.offsetWidth;
        h = p.offsetHeight;
        while (p.offsetParent) {
            l += p.offsetLeft;
            t += p.offsetTop;
            p = p.offsetParent;
        }
        return {
            left: l,
            top: t,
            width: w,
            height: h
        };
    }

    // 判断两个矩形是否相交,返回一个布尔值 
    function intersect(rec1, rec2) {
        var lc1, lc2, tc1, tc2, w1, h1;
        lc1 = rec1.left + rec1.width / 2;
        lc2 = rec2.left + rec2.width / 2;
        tc1 = rec1.top + rec1.height / 2;
        tc2 = rec2.top + rec2.height / 2;
        w1 = (rec1.width + rec2.width) / 2;
        h1 = (rec1.height + rec2.height) / 2;
        return Math.abs(lc1 - lc2) < w1 && Math.abs(tc1 - tc2) < h1;
    }


    // 检测某个子区域是否呈现在浏览器区域 
    function jiance(arr, prec1, callback) {
        var prec2;
        for (var i = arr.length - 1; i >= 0; i--) {
            if (arr[i]) {
                prec2 = getSubClient(arr[i]);
                if (intersect(prec1, prec2)) {
                    callback(arr[i]);
                    // 加载资源后，删除监测 
                    delete arr[i];
                }
            }
        }
    }

    // 检测目标对象是否出现在可视区域 
    function autocheck(obj) {
        var prec1 = getClient(),
            arr = obj.config.arr,
            callback = obj.config.callback;
        jiance(arr, prec1, callback);
    }

    window.Lazy = Lazy;
})(jQuery);