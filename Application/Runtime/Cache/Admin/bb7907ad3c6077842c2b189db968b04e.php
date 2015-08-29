<?php if (!defined('THINK_PATH')) exit();?>﻿<!DOCTYPE html>
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
	<div class="left-nav">
	<div class="dh">
		<p class="text"><i class="fa fa-user"></i> 
   <a href="<?php echo U('content/gets',array('panel'=>'myinfo'));?>" target="lower_right">管理员：<?php echo ($username); ?></a> &nbsp;
   <a target="_parent" href="<?php echo U('user/logout');?>"><i class="fa fa-power-off"></i> 退出</a></p>
	</div>
<ul class="" role="tablist" id="myTab">
  <?php if(is_array($navs)): foreach($navs as $key=>$nav): ?><li role="presentation"><a href="<?php echo U($nav['u1'],json_decode($nav['u2'],true));?>" target="lower_right"  ><img src="<?php echo ($nav["face"]); ?>" alt="" width="25" height="25"> <?php echo ($nav["name"]); ?></a></li><?php endforeach; endif; ?>
</ul>
   <div class="footer">
   <p> 2015 © 江陵巡警版权所有</p>
 
   </div>
  </div>
 <script>
$(document).ready(function(){
 $('li[role="presentation"]').click(function(){	
	$('li[role="presentation"]').attr('class','');
	$(this).attr('class','active');
 });
});
 
 </script>
</body>
</html>