<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
    <meta name="format-detection" content="telephone=no"/>
 	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
 	<title><?php echo ($title); ?></title>
	<script type="text/javascript" src="http://7xlb4q.com1.z0.glb.clouddn.com/js/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="http://7xlb4q.com1.z0.glb.clouddn.com/js/jquery.validate.min.js"></script>
	<link rel="stylesheet" href="http://7xlb4q.com1.z0.glb.clouddn.com/css/style.css?version=1">
    <link rel="stylesheet" href="http://7xlb4q.com1.z0.glb.clouddn.com/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="http://7xlb4q.com1.z0.glb.clouddn.com/css/swiper.min.css">
    <script type="text/javascript" src="http://7xlb4q.com1.z0.glb.clouddn.com/js/swiper.min.js"></script>
	<script type="text/javascript">
	var btn=true;
	var page='face';
	var urlcode = encodeURIComponent("<?php echo ($imgsrc); ?>");
	$(function(){
		getlove(urlcode);
		$('[data-type="hide"]').hide();
		$('.user_list').hide();
        var mySwiper = new Swiper('.swiper-container', {
            onSlideChangeEnd: function(swiper){
				if(page == 'face')
					page = 'list';
					else
					page = 'face';
                $(".zp_nav li").find("a").removeClass("zp_cur_nav");
                $(".zp_nav li").eq(swiper.activeIndex).find("a").addClass("zp_cur_nav");
				if(page == 'list'){
					var data = 'accesstoken=<?php echo ($accesstoken); ?>';
					$.post(
					"<?php echo U('photo/getlists',array('wechat'=>I('get.wechat')));?>",
					data,
					function(data){
						//console.log(data);
						$('.user_list').html(data);
						$('.zp_jiazai').hide();
						$('.user_list').show();
					});
				}
								
            },
			onSlideChangeStart: function(swiper){
				$('[data-role="fadetoggle"]').fadeToggle();
			}

        });
		$(".z_nav li").click(function(){
             $(".zp_nav li").find("a").removeClass("zp_cur_nav");
             $(this).find("a").addClass("zp_cur_nav");
             var aa=$(".zp_nav li").index($(this));
             mySwiper.slideTo(aa, 1000, true);
        });
		
		$('button[type="submit"]').click(function(){
			btn = false;
			$('button[type="submit"]').html('<i class="fa fa-spinner dh_xuanzhuan"></i>');
			getPic($('input[name="xuehao"]').val());
		});
		$('input[name="xuehao"]').keydown(function(data){
			if(data.keyCode == 13){
				$('button[type="submit"]').click();
			}
		});
		$('.cd_1_1').click(function(){
			console.log('clicks');
			loveInc();
		});
	});
	function getPic(xuehao){
			var data = 'xuehao='+xuehao;
			$.post("<?php echo U('photo/geturl',array('wechat'=>I('get.wechat')));?>",
			data,
			function(data){
				//console.log(data);
				$('img[data-role="serchface"]').attr('src',data);				
				$('button[type="submit"]').html('<i class="fa fa-search"></i>');
				urlcode = encodeURIComponent(data);
				getlove();
				btn=true;
			});
	}
	function loveInc(){
		var data = 'url='+urlcode;
		$.post(
			"<?php echo U('photo/loveinc',array('wechat'=>I('get.wechat')));?>",
			data,
			function(data){
			console.log(data);
				$("span.cd_1_1").html(data);
			});
		
	}
	function getlove(){
		var data = 'url='+urlcode;
		$.post(
			"<?php echo U('photo/getlove',array('wechat'=>I('get.wechat')));?>",
			data,
			function(data){
			console.log(data);
				$("span.cd_1_1").html(data);
			});
		
	}
	</script>

 </head>
 <style>
    /*.z_nav li a{ -webkit-transition: .5s;}*/
        .z_list_nopay, .z_list_alreay_pay, .z_list_alreay_cancle {
            display: block;
    }
</style>
 <body>
 	<div class="zp_top">
 		<a class="zp_link" href="#"><i class="fa fa-angle-double-left"></i></a>
 		<p><i class="fa fa-search"></i> 照片查询</p>
 	</div>

    <div class="swiper-container" style="min-height:calc(100% - 95px);position: absolute;padding-bottom:40px;
    width: 100%;">
    	<ul class="z_order_content swiper-wrapper">
    		<li class="zp_sousuo swiper-slide">
				<div data-role="fadetoggle">
                <div class="inner">
                   
					<span class="c-t">输入学号：</span><input type="tel" name="xuehao" class="number"><span class="zp_anniu"><button type="submit" class="enterBtn"><i class="fa fa-search"></i></button></span>
					
                </div>
                <div class="zp_c1">
                    <img data-role="serchface" src="<?php echo ($imgsrc); ?>" alt=""/>
                    <div class="cd_1"><span class="cd_1_1"><i class="fa fa-heart kong"></i> 点击喜欢</span><span class="cd_1_2">禁止别人查询</span></div>
                </div>
				</div>
    		</li>
    		<li class="zp_paihang swiper-slide" >
				<div data-role="fadetoggle" data-type="hide">
					<div class="zp_jiazai" style="text-align:center"><i class="fa fa-spinner dh_xuanzhuan"></i></div>

					<div class="user_list"  >
					   
					</div>
			   </div>
    		</li>
    	</ul>
    </div>
    <div style="height: 40px;;"></div>
    <ul class="zp_nav duding_bottom">
        <li><a class="zp_cur_nav" href="#">查询界面</a></li>
        <li><a href="#">点赞排行榜</a></li>
    </ul>
</body>
</html>