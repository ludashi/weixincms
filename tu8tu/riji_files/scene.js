function submit_form(i){
	//弹窗
	var username=getCookie('username',true);
	if(!username)
	{	
		showPopWin('http://www.meijialz.com/pop_login.php', 500, 426, null, false);
		return;
	}

	//防重复提交
	if(issubmit) return;
	//除去错误提示
	jq('.edit_form').find('.form_error').remove();

	//验证为空
	var title = jq("#diarytitle").val();
	if(jq.trim(title).length==0)
	{
		insertErrorTip("#diarytitle",'日记标题不能为空字符！');
		return;
	}

	//获取值
	var sceneId = jq("#sceneId").find("option:selected").val();
	var progressId = jq("#progressId").find("option:selected").val();

	//标题验证
	if(title=='请输入日记标题'){
		//jq("#diarytitle").val('').focus();
		insertErrorTip("#diarytitle",'请输入日记标题');
		return false;
	}

	var chkLenTitle = checkWordLen(40,title);
	//标题不应超过40个字
	if(!chkLenTitle){
		//jq("#diarytitle").focus();
		insertErrorTip("#diarytitle",'日记标题长度不应超过40！');
		return false;
	}


	var content = editor_a.getContent();
	var content1 = editor_a.getContentTxt();
	content1 = content1.replace(/\s+/g,"");//过滤所有换行，制表符，空格，enter

	//日记内容验证
	var imgReg = /<img.*?>/;
	if(content1.length==0 && !imgReg.test(content)){
		//content=='<p><br /></p>'
		jq(".editor_error").html('<span class="form_error_ico"></span>日记内容不能为空！');
		jq(".editor_error").show();
		return false;
	}
	else if(content1.length>1800)
	{
		jq(".editor_error").html('<span class="form_error_ico"></span>日记内容不应超过1800字！');
		jq(".editor_error").show();
		return false;
	}	
	else
	{
		jq(".editor_error").hide();
	}

	//表单值保存
	jq("#content").val(content);
	//判断提交数据
	if(title.length>0 && content.length>0 && sceneId && progressId){


		//检测内容，过滤广告，非法内容不能提交
		jq.post(
			'http://www.meijialz.com/riji/ajax.php?ac=checkContent',
			{
				title:title,
				content:content1
			},
			function(msg){
				//if(msg.msg!='notok'){
						jq("#type").val(i);//提交类型，正常发布或者草稿

						issubmit = true;
						
						submit_sign = 1;//为0时页面跳转，关闭会弹出提示

						if(msg.msg!='ok')
						{
							//内容需要审核
							jq("#becare").val(1);
						}

						jq("form#form1").submit();

						return;
				//}
				//else
				//{
				//	failTip('对不起，您发表的日记含有违规内容，请修改后发布。');
				//	return;
				//}

			},
			'json'
			)
	}else{
		if(title.length == 0){
			insertErrorTip("#diarytitle",'请输入日记标题');
			return;
		}
		if(sceneId == ''){
			insertErrorTip("#sceneId",'请选择所属现场');
			return;
		}
		if(progressId == ''){
			insertErrorTip("#progressId",'请选择所属阶段');
			return;
		}
		return;
	}
}

//阶段过滤 已废弃 2014-9-15
// function onlyShow(i){
// 	//切换显示阶段
// 	jq(".diary_select_all").html(jq("#progress_"+i).html()+'<em class="ico_t"></em>');
// 	if(i=='all'){
// 		jq(".diary_content").find(".diary_items").each(function(n,obj){
// 			jq(obj).show();
// 		});
// 	}else{ 
// 		jq(".diary_content").find(".diary_items").each(function(n,obj){
// 			var pid = jq(obj).find("em").attr('pid')
// 			if(pid==i){
// 				jq(obj).show();
// 			}else{
// 				jq(obj).hide();
// 			}
// 		});
// 	}
// }

//收藏现场
var userClickCollect=0;
function collect(sid){
	//sid  
	//ajax to ajax//

	var username=getCookie('username',true);
	if(!username)
	{	
		setZero();
		userClickCollect = sid;
		showPopWin('http://www.meijialz.com/pop_login.php', 500, 426, null, false);
		return;
	}

	jq.post(
		'http://www.meijialz.com/riji/ajax.php?ac=collectscene',
		{
    		sid:sid
  		},
		function(msg){
			msg = eval('(' + msg + ')');
			//主人态刷新
			if(msg.result=='isowner'){
				location.reload();
				return;
			}

			//如果已经收藏
			if(msg.result=='hascol'){
				jq(".ico_collect").parent().attr('href','javascript:void(0);');
				jq(".ico_collect").parent().addClass('btn_list_lock');
				var collstr = jq(".ico_collect").parent().html().replace('已收藏','收藏').replace('收藏','已收藏');
				jq(".ico_collect").parent().html(collstr);
				return;
			}
			
			//收藏成功
			if(msg.result=='ok'){
				jq(".ico_collect").parent().attr('href','javascript:void(0);');
				jq(".ico_collect").parent().addClass('btn_list_lock');
				var collstr = jq(".ico_collect").parent().html().replace('已收藏','收藏').replace('收藏','已收藏');
				jq(".ico_collect").parent().html(collstr);
				var c_num = parseInt(jq("#collect_scene").html().replace('<em class="ico_star"></em>',''));
				c_num = c_num+1;
				jq("#collect_scene").html('<em class="ico_star"></em>'+c_num);
				successTip("收藏成功！");
				return;
			}
			//收藏失败
			if(msg.result=='notok'){
				//msg.msg 错误信息
				failTip("收藏失败！");
				return false;
			}
		}
		);
}


var userClickCollectDiary=0;
function collect_diary(did){

	var username=getCookie('username',true);
	if(!username)
	{	
		setZero();
		userClickCollectDiary = did;
		showPopWin('http://www.meijialz.com/pop_login.php', 500, 426, null, false);
		return;
	}

	//sid  现场id，收藏所有日记
	//ajax to ajax//
	jq.post(
		'http://www.meijialz.com/riji/ajax.php?ac=collectdiary',
		{
    		did:did
  		},
		function(msg){
						msg = eval('(' + msg + ')');
						//主人态刷新
						if(msg.result=='isowner'){
							location.reload();
							return;
						}

						//如果已经收藏
						if(msg.result=='hascol'){
							jq(".ico_collect").parent().attr('href','javascript:void(0);');
							jq(".ico_collect").parent().addClass('btn_list_lock');
							var collstr = jq(".ico_collect").parent().html().replace('已收藏','收藏').replace('收藏','已收藏');
							jq(".ico_collect").parent().html(collstr);
							return;
						}
						//收藏成功
						if(msg.result=='ok'){
							jq(".ico_collect").parent().attr('href','javascript:void(0);');
							jq(".ico_collect").parent().addClass('btn_list_lock');
							var collstr = jq(".ico_collect").parent().html().replace('已收藏','收藏').replace('收藏','已收藏');
							jq(".ico_collect").parent().html(collstr);
							var c_num = jq("#collect_diary").html().replace('<em class="ico_star"></em>','');
							c_num = parseInt(c_num);
							c_num = c_num+1;
							jq("#collect_diary").html('<em class="ico_star"></em>'+c_num);
							successTip("收藏成功！");
							return;
						}
						//收藏失败
						if(msg.result=='notok'){
							//msg.msg 错误信息
							failTip("收藏失败！");
							return false;
						}

					}
		);
}

var userClickDeleteComment = 0;
function deleteComment(comment_id)
{
	var username=getCookie('username',true);
	if(!username)
	{	
		setZero();
		userClickDeleteComment = comment_id;
		showPopWin('http://www.meijialz.com/pop_login.php', 500, 426, null, false);
		return;
	}

	window_box_close();


	jq.post(
		'http://www.meijialz.com/riji/ajax.php?ac=deletecomment',
		{
    		commentId:comment_id
  		},
		function(msg){
			msg = eval('(' + msg + ')');
			if(msg.result=='ok'){
				//刷新页面
				location.reload();
			}
		}
		);
}


var userClickDeleteDiary_did = 0;
var userClickDeleteDiary_sid = 0;
function deletediary(diary_id,scene_id)
{
	var username=getCookie('username',true);
	if(!username)
	{	
		setZero();
		userClickDeleteDiary_did = diary_id;
		userClickDeleteDiary_sid = scene_id;
		showPopWin('http://www.meijialz.com/pop_login.php', 500, 426, null, false);
		return;
	}
	
	window_box_close();

	jq.post(
		'http://www.meijialz.com/riji/ajax.php?ac=deletediary',
		{
    		did:diary_id
  		},
		function(msg){
			msg = eval('(' + msg + ')');

			if(msg.result=='ok'){
				//刷新页面
				successTip("删除成功！")
				location.href='http://www.meijialz.com/riji/scenedetail.php?id='+scene_id;
			}
			if(msg.result=='notok'){
				//刷新页面
				//failTip("删除失败!");	
			}
		}
		);
}

var userCommentDiary = 0;
function comment_diary()
{
	var username=getCookie('username',true);
	if(!username)
	{	
		setZero();
		userCommentDiary = 1;
		showPopWin('http://www.meijialz.com/pop_login.php', 500, 426, null, false);
		return;
	}

	//验证是否是装修公司，以及装修公司的评论权限
	jq.post(
			'http://www.meijialz.com/riji/ajax.php?ac=commentdiary',
			{
				checkallow:1,//请求同一个ajax，这里只做权限判断就返回。
				sid:sid,
				did:did
			},
			function(msg){
				msg = eval('(' + msg + ')');
				
				if(msg.result=='notallow'){
					failTip('您不是本现场的装修公司，没有评论权限！');
					hideCommentGate()
					return;
				}

				if(msg.result=='ok'){
						jq("#parent_id").val('');
						jq("#replyTo").html('');
						jq("#parent_cid").val('');
						scrollToComment();
				}
				
			}
			);


}

var replayI = 0;
var replayName = 0;
var replayCid = 0;
function replay(i,name,cid){
	var username=getCookie('username',true);
	if(!username)
	{	
		setZero();
		replayI = i;
		replayName= name;
		replayCid = cid;
		showPopWin('http://www.meijialz.com/pop_login.php', 500, 426, null, false);
		return;
	}

	//验证是否是装修公司，以及装修公司的评论权限
	jq.post(
			'http://www.meijialz.com/riji/ajax.php?ac=commentdiary',
			{
				checkallow:1,//请求同一个ajax，这里只做权限判断就返回。
				sid:sid,
				did:did
			},
			function(msg){
				msg = eval('(' + msg + ')');
				
				if(msg.result=='notallow'){
					failTip('您不是本现场的装修公司，没有评论权限！');
					//隐藏所有的回复入口按钮
					hideCommentGate()
					return;
				}

				if(msg.result=='ok'){
					jq("#parent_id").val(i);
					jq("#replyTo").html('回复 “<span style="color:#F36F20">' + name + '</span>” 的评论');
					jq("#parent_cid").val(cid);
					scrollToComment();
				}
				
			}
			);
}

function scrollToComment() {
	var h = jq("#send_comment").offset().top-50;

	jq("html,body").animate({scrollTop:h}, 500);		
}


//日记评论做成ajax提交后刷新页面
var userSendContent = 0 ;
function sendContent(){
	if(is_submit){return false;}
	setIsSubmitTrue();

	var username=getCookie('username',true);
	if(!username)
	{	
		setZero();
		userSendContent = 1 ;
		setIsSubmitFalse();
		showPopWin('http://www.meijialz.com/pop_login.php', 500, 426, null, false);
		return;
	}

	
	var owner_id = jq("#owner_id").val();
	var parent_id = jq("#parent_id").val();
	var parent_cid = jq("#parent_cid").val();
	var content = editor_a.getContent();
	var status=1;
	var content1 = editor_a.getContentTxt();
	var imgReg = /<img.*?>/;
	if(content1.length==0 && !imgReg.test(content))
	{	
		jq(".editor_error").html('<span class="form_error_ico"></span>评论内容不能为空');
		jq(".editor_error").show();
		setIsSubmitFalse();
		return false;
	}
	else if(content1.length>140)
	{
		setIsSubmitFalse();
		//jq(".editor_error").html('<span class="form_error_ico"></span>评论内容不能超过140字');
		//jq(".editor_error").show();
		return false;
	}
	else
	{
		jq(".editor_error").hide();
	}


	if(content.length>0){
		jq.post(
			'http://www.meijialz.com/riji/ajax.php?ac=commentdiary',
			{
				checkallow:0,//区别于权限判断
				owner_id:owner_id,
				content:content,
				sid:sid,
				did:did,
				parent_id:parent_id,
				parent_cid:parent_cid,
				status: status
			},
			function(msg){
				msg = eval('(' + msg + ')');
				if(msg.result=='unlogin'){
					failTip('您尚未登录！不能评论');
					setIsSubmitFalse();
					return;
				}
				if(msg.result=='notallow'){
					failTip(msg.msg);
					hideCommentGate()
					setIsSubmitFalse();
					return;
				}

				if(msg.result=='notallow1'){
					failTip('对不起，您发表的评论含有违规内容，请修改后发布。');
					//editor_a.setContent('');
					setIsSubmitFalse();
					return;
				}

				if(msg.result=='ok'){
					//刷新页面
					//清空回复信息
					jq("#replyTo").html('')
                    jq("#parent_id").val('');
                    jq("#parent_cid").val('');
                    //编辑器清除内容
                    editor_a.setContent('');
                    status = 1;
					//window.location.reload();
					getPostData(did,isowner,allowComment,1,numperpage);
					//提交后需要等待十秒才能再提交
					setIsSubmitFalse();
					//setTimeout('setIsSubmitFalse()',10000);
				}
				if(msg.result=='notok'){
					failTip('评论失败！');
					setIsSubmitFalse();
					return;
				}
				
			}
			);
	}else{
		failTip('请输入评论！');
		return false;
	}

}

function setIsSubmitTrue()
{
	is_submit =true;
}

function setIsSubmitFalse()
{
	is_submit =false;
}



function getPostData(did,isowner,allowComment,page,numperpage)
{
	jq(".comment_bd").html('<ul><li><center><img src="/img/icon/load_circle.gif" /></center></li></ul>');
	jq(".pages").html('');
	jq.post(
		'http://www.meijialz.com/riji/ajax.php?ac=getPageComment',
		{
			did:did,
			page:page,
			numperpage:numperpage,
			isowner:isowner,
			allowComment:allowComment
		},
		function(msg){
			if(msg.res=='ok')
			{
				page = msg.page;
				pageMax = msg.pageMax;
				jq(".comment_num").html(msg.total);
				var showCommentBtn = msg.showCommentBtn;
				jq(".comment_bd").html(msg.commentsHtml);
				
				//发表评论按钮显示
				if(showCommentBtn==1 && allowComment==1)
				{
					jq(".col_r").show();
				}
				else
				{
					jq(".col_r").hide();
				}

				if(msg.pageHtml.length>0)
				{
					jq(".pages").show();
					jq(".pages").html(msg.pageHtml);
				}
				else
				{
					jq(".pages").hide();
				}
				//回复按钮显示


			}

		},
		'json'
	);
}

function goto(str)
{
	if(str=='first')
	{
		page =1;
	}
	else if(str=='last')
	{
		page = pageMax;
	}
	else if(str=='pre')
	{
		page = page-1;
	}
	else if(str=='next')
	{
		page = page+1;
	}
	else
	{
		//跳转到指定页？
		page = jq(str).attr("pid");
	}
	getPostData(did,isowner,allowComment,page,numperpage);
}
 

jq("body").on("keydown click",".edit_form .text",function(){
	jq(this).parent().find('.form_error').remove();
})


//清除标记
function setZero(){
	userWriteDiary = 0;
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

//隐藏所有的回复入口按钮
function hideCommentGate()
{
	jq(".col_r").hide();
	jq(".comment_opt_reply").hide();
	jq("#send_comment").hide();
}

jq(function(){
	jq("body").on("focus",".edit_form .text,.edit_form .select",function() {
		jq(this).css("border-color","#96d5b9");	
	});	
	jq("body").on("blur",".edit_form .text,.edit_form .select",function() {
		jq(this).css("border-color","#eee");	
	});
});