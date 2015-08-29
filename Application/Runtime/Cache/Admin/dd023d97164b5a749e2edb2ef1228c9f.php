<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>江陵巡警功能后台</title>
<meta name="description" content="">
<meta name="keywords" content="">
<link rel="stylesheet" href="/Public/css/style_login.css">
<link rel="stylesheet" href="/Public/css/font-awesome.css">
<link rel="stylesheet" href="/Public/css/bootstrap.css">
<script src="http://cdn.bootcss.com/jquery/1.11.2/jquery.min.js"></script>
<script src="/Public/js/bootstrap.js"></script>
	<script type="text/javascript">
	
	$(document).ready(function(){
		$("#login").click(function(){
			
			var action = $("#lg-form").attr('action');
			var form_data = {
				username: $("#username").val(),
				password: $("#password").val(),
				is_ajax: 1
			};
			
			$.ajax({
				type: "POST",
				url: action,
				data: form_data,
				success: function(response)
				{
					
					if(typeof(response) == 'object')
					if(response.status == 1)
						$("#lg-form").slideUp('slow', function(){
							$("#message").html('<p class="success"><i class="fa fa-exclamation-circle"></i>' + response.info + '</p><p>正在<a href="'+response.url+'">跳转</a>....</p>');
							setTimeout('redirect("'+response.url+'")',500);
						});
					else
						$("#message").html('<p class="error"><i class="fa fa-exclamation-circle"></i> 错误提示: ' + response.info + '</p>');
				},	
				error:function(){
					$("#message").html('<p class="error">错误提示: 无法连接到服务器 </p>');
				}
			});
			return false;
		});
	});
	function redirect(url){
		window.location.href=url;
	}
	</script>
</head>
<body class="bg">
    <div class="container">
        <div class="row" style="margin-top:200px;">
            <div class="col-md-4 col-md-offset-4">
                <div class="login-panel panel panel-danger login">
                    <div class="panel-heading">
                        <h3 class="panel-title"><i class="fa fa-bus"></i> 江陵巡警微信管理平台</h3>
                    </div>
                    <div class="panel-body">
		<form action="<?php echo U('user/login');?>" id="lg-form" name="lg-form" method="post">
			
			<div class="form-group">
				<input type="text" class="form-control" name="username" id="username" placeholder="帐号"/>
			</div>
			
			<div class="form-group">
				<input type="password" class="form-control" name="password" id="password" placeholder="密码" />
			</div>
			
			<div>				
				<button type="submit" id="login" class="btn btn-danger  btn-block">登陆</button>
			</div>
			
		</form>
		<style>
		.error{color:#d9534f;padding:10px;}
		</style>
		<div id="message" class="text-langer"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>