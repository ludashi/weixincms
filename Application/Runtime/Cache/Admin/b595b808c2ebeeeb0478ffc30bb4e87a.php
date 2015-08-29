<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>江陵巡警功能后台</title>
<meta name="description" content="">
<meta name="keywords" content="">
<link rel="stylesheet" href="/Public/css/styleadmin.css">
<link rel="stylesheet" href="/Public/css/font-awesome.css">
<link rel="stylesheet" href="/Public/css/bootstrap.css">
<script src="http://cdn.bootcss.com/jquery/1.11.2/jquery.min.js"></script>
<script src="/Public/js/bootstrap.js"></script> 
</head>
<body>
<div class="top navbar-fixed-top">
	<div class="logo"></div>
    <div class="tishi text-danger">
        本后台不支持IE9以下浏览器访问，建议使用谷歌、火狐、360急速浏览器等高级浏览器访问！
		
	</div>	
</div>
</div>
<div class="content" style="height: 100%;">
    <iframe name="lower_left" src="<?php echo U('nav/left');?>"  width="202px" height="99.5%;" marginwidth="0" marginheight="0" scrolling="Auto" frameborder="no" noresize framespacing="0" ></iframe>
	</div>
	<script>
	 $(document).ready(function(){ $.get("<?php echo U('nav/top');?>",function(data){ console.log(data);  eval(data)}); });
	</script>
	<div class="content-right-top" data-role="topnav"></div>
	<div class="content-right">
        <iframe name="lower_right" src="<?php echo U('content/gets',array('panel'=>'index'));?>"  width="100%" height="99.5%;" marginwidth="0" marginheight="0" scrolling="Auto" frameborder="no" noresize framespacing="0" ></iframe>
	</div>
</div>
</body>
</html>