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
    <script src="http://cdn.bootcss.com/jquery/1.11.2/jquery.min.js"></script>
    <script src="/Public/js/bootstrap.js"></script>
	<script>
	var pages = "<?php echo U('content/gets',array('panel'=>'weixinconfig','p'=>'__PAGE__'));?>";
	var lists_tr='';
	var lists_td='';
	var lists_a='';
	$(document).ready(function(){
		lists_tr = $('tr[data-role="listdata_tr"]');
		lists_td = lists_tr.find('td');
		lists_a = $(lists_td[5]).find('a');
		$('[data-role="listdata"]').hide();
		getPage(<?php echo I('get.p');?>);
	});
	function getPage(p){
		
		$.get(
				pages.replace('__PAGE__',p),
				function(data){
				if(data.status){
						$('[data-role="listdata"]').fadeOut('slow',function(){
						$('[data-role="listdata"]').html('');
						
						$.each(
							data.info.data,
							function(){
								var icount = 0;
								$.each(
									this,
									function(key,val){
									if(key == 'type'){
										if(val == 1){
											val = '订阅号';
										}else{
											val = '服务号';
										}
									}
									if(key == 'isnow'){
										if(val == 1){
											val = '是';
										}else{
											val = '否';
										}
									}
									if(key == 'wechat'){
										var editUrl = "<?php echo U('Content/gets',array('panel'=>'weixinconfig','do'=>'edit','wechat'=>'__WECHAT__'));?>";
										
										var delUrl = "<?php echo U('Content/gets',array('panel'=>'weixinconfig','do'=>'del','wechat'=>'__WECHAT__'));?>";
										var doactiveUrl = "<?php echo U('Content/gets',array('panel'=>'weixinconfig','do'=>'doactive','wechat'=>'__WECHAT__'));?>";
									
										$(lists_a[0]).attr('href',editUrl.replace('__WECHAT__',val));
										$(lists_a[1]).attr('href',delUrl.replace('__WECHAT__',val));
										$(lists_a[1]).attr(
													'onclick',
													'return confirm("此操作无法恢复，确定执行吗？")'
													);
										$(lists_a[2]).attr('href',doactiveUrl.replace('__WECHAT__',val));
									}
									$(lists_td[icount]).html(val);								
									icount ++;
								});
								$('[data-role="listdata"]').append(lists_tr[0].outerHTML);
							});
						
						$('[data-role="listdata"]').fadeIn();
					});
					$('nav[data-role="page"]').html(data.info.pagestr);
				}
				console.log(data.info.data);
			});
	}
	</script>
</head>
<body style="background:#ffffff">


    <!-- 全部列表开始 -->
	<div style="height:10px;"></div>
    <div class="alert alert-warning" role="alert">当前公众号配置信息：<p class="text-danger">你的接口URL是：<?php echo U('/Weixin/index/api',array(),'.'.C(URL_HTML_SUFFIX),true);?>
        <br/>
        Token固定是：<?php echo C('WX_TOKEN');?></p></div>
    <div class="nav_anniu">
        <a href="<?php echo U('Content/gets',array('panel'=>'weixinconfig','do'=>'add','wechat'=>I('get.wechat')));?>" class="btn btn-default">新增</a>
    </div>
    <div role="tabpanel" class="tab-pane  active in " id="quanbu">
        <table class="table table-hover ">
            <thead>
            <tr>                
                <th> 公众号名称</th>
				<th> 微信号</th>
                <th> 类型</th>
                <th>Wechat</th>
                <th>当前公众号</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody data-role="listdata">
            <tr  data-role="listdata_tr">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><a href="">编辑</a> <a href="">删除</a> <a href="">切换为当前公众号</a></td>

            </tr>

            </tbody>
        </table>
		
        <nav data-role="page" align="center">
            
        </nav>
		
    </div>
    <!-- End -->


</body>
</html>