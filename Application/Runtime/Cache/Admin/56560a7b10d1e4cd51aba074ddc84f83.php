<?php if (!defined('THINK_PATH')) exit();?>﻿<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title></title>
    <meta name="description" content="">
    <meta name="keywords" content="">
    <link rel="stylesheet" href="/Public/css/style.css">
    <link rel="stylesheet" href="/Public/css/font-awesome.css">
    <link rel="stylesheet" href="/Public/css/bootstrap.css">
    <link rel="stylesheet" href="http://7xleak.com1.z0.glb.clouddn.com/css/bootstrap-table.css">
    <script src="http://cdn.bootcss.com/jquery/1.11.2/jquery.min.js"></script>
    <script src="/Public/js/bootstrap.js"></script>
</head>
<body>

<div style="height:10px;"></div>
    <!-- 全部列表开始 -->
    <form class="form-horizontal" method="post" action="<?php echo U('Content/gets',array('panel'=>'weixinconfig','do'=>'edit','wechat'=>I('get.wechat')));?>">
        <div class="form-group">
            <label class="col-sm-2 control-label">公众号名称</label>
            <div class="col-sm-2">
                <input type="text" class="form-control" name="weixin[name]" value="<?php echo ($wechat["name"]); ?>">
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-2 control-label">公众号原始id</label>
            <div class="col-sm-2">
                <input type="text" class="form-control" name="weixin[wechat]" value="<?php echo ($wechat["wechat"]); ?>">
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-2 control-label">微信号</label>
            <div class="col-sm-2">
                <input type="text" class="form-control" name="weixin[weixinhao]" value="<?php echo ($wechat["weixinhao"]); ?>">
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-2 control-label">公众号类型</label>
            <div class="col-sm-2">
				
                <input type="radio" value="1" class="regular-radio" id="inlineRadio1" name="weixin[type]" <?php echo ($dingyue); ?>>
				<label for="type_0"></label> 订阅号
                <input type="radio" value="2" id="inlineRadio2" name="weixin[type]" <?php echo ($fuwu); ?>/>
                <label for="type_0"></label>服务号
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-2 control-label">AppId （认证服务号的AppId）</label>
            <div class="col-sm-2">
                <input type="text" class="form-control" name="weixin[appid]" value="<?php echo ($wechat["appid"]); ?>">
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-2 control-label">Secret （认证服务号的Secret）</label>
            <div class="col-sm-2">
                <input type="text" class="form-control" name="weixin[secret]" value="<?php echo ($wechat["secret"]); ?>">
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
                <button type="submit" class="btn btn-success">确定</button>
            </div>
        </div>
    </form>



</body>
</html>