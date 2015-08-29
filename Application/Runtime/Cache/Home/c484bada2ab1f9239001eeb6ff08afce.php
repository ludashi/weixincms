<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="zh-cn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimal-ui">
  <!--
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  -->
  <meta name="format-detection"content="telephone=no, email=no">
  <title><?php echo ($title); ?></title>
  <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
  <link rel="stylesheet" type="text/css" href="http://7xlb4q.com1.z0.glb.clouddn.com/css/h-style.css">
  <link rel="stylesheet" href="http://7xlb4q.com1.z0.glb.clouddn.com/css/font-awesome.min.css">
    <script src="http://7xlb4q.com1.z0.glb.clouddn.com/js/jquery-1.11.1.min.js"></script>
    <script src="http://7xlb4q.com1.z0.glb.clouddn.com/js/hs_main.js"></script>
<script>
	var btn=true;
	$(document).ready(function(){
		bindclicks();
	});
	function bindclicks(){
		$('a.enterBtn').click(function(){
			submitform();
		});
	}
	function submitform(){
		if(btn == false) return;
		$('a.enterBtn').html('<i class="fa fa-circle-o-notch dh_xuanzhuan"></i> 操作中');
		btn = false;
		var url = "<?php echo U('user/bind',array('wechat'=>I('get.wechat')));?>";
		var data = 'username='+$('input.number').val()+'&password='+$('input.pwd').val();		
		$.post(url,data,function(data){functionreback(data)});
	}
	function functionreback(data){
		//console.log(data);
		$('div.inner_info').html(data.info);
		if(data.status == 0){
		$('a.enterBtn').text('绑 定');
		btn = true;
		}else{
		$('a.enterBtn').text('已完成');
			if(data.url != ''){
				windows.localhost.href = data.url;
			}
		}
	}
</script>
</head>
<body>
   	<div class="enter-register-content">
    	<a class="return" href="javascript:history.back()"></a>
        <div class="tab-box">
        	<div class="t-l">
            	<div class="title_bd">绑定教务处学号登录信息</div>
            </div>
        </div>
        <div class="content-box">
        	<div class="enter-box item-box">
            	<div class="inner">
                	<div class="number-box"><span class="c-t">学号</span><input type="tel" class="number"></div>
                	<div class="pwd-box"><span class="c-t">密码</span><input type="password" class="pwd"></div>
                </div>
				<div class="inner_info"> </div>
            	<a href="javascript:void(0)" class="enterBtn">绑  定</a>
                <div class="other-enter">
                	<div class="line"></div>
                    <p class="title">提示信息</p>
                </div>
                <div class="other-link">
                    <ul class="info">
                        <li>微工院由长江大学工程技术学院网络协会开发运营,并由荆州天明科技有限公司提供技术支持。我们将保证您的个人信息不会泄漏。</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>


</body>
</html>