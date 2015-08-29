<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2014 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 麦当苗儿 <zuojiazi@vip.qq.com> <http://www.zjzit.cn>
// +----------------------------------------------------------------------

namespace Weixin\Controller;

use Think\BaseController;
use Com\Wechat;
use Com\WechatAuth;

class IndexController extends BaseController{
    /**
     * 微信消息接口入口
     * 所有发送到微信的消息都会推送到该操作
     * 所以，微信公众平台后台填写的api地址则为该操作的访问地址
     */
    public function api($id = ''){
		//获取微信号信息
		
        //调试
        try{
            #$appid = 'wx58aebef2023e68cd'; //AppID(应用ID)
			#$crypt = 'q6FPCUoCQWaOiR3UUe5RfQu8A7hlJcMW4BnNyH9z2il'; //消息加密KEY（EncodingAESKey）
            $token = C('WX_TOKEN'); //微信后台填写的TOKEN
           
            
            /* 加载微信SDK */
            $wechat = new Wechat($token);
            
            /* 获取请求信息 */
            $data = $wechat->request();

            if($data && is_array($data)){
                /**
                 * 你可以在这里分析数据，决定要返回给用户什么样的信息
                 * 接受到的信息类型有10种，分别使用下面10个常量标识
                 * Wechat::MSG_TYPE_TEXT       //文本消息
                 * Wechat::MSG_TYPE_IMAGE      //图片消息
                 * Wechat::MSG_TYPE_VOICE      //音频消息
                 * Wechat::MSG_TYPE_VIDEO      //视频消息
                 * Wechat::MSG_TYPE_SHORTVIDEO //视频消息
                 * Wechat::MSG_TYPE_MUSIC      //音乐消息
                 * Wechat::MSG_TYPE_NEWS       //图文消息（推送过来的应该不存在这种类型，但是可以给用户回复该类型消息）
                 * Wechat::MSG_TYPE_LOCATION   //位置消息
                 * Wechat::MSG_TYPE_LINK       //连接消息
                 * Wechat::MSG_TYPE_EVENT      //事件消息
                 *
                 * 事件消息又分为下面五种
                 * Wechat::MSG_EVENT_SUBSCRIBE    //订阅
                 * Wechat::MSG_EVENT_UNSUBSCRIBE  //取消订阅
                 * Wechat::MSG_EVENT_SCAN         //二维码扫描
                 * Wechat::MSG_EVENT_LOCATION     //报告位置
                 * Wechat::MSG_EVENT_CLICK        //菜单点击
                 */

                //记录微信推送过来的数据
                file_put_contents('./data.json', json_encode($data));

                /* 响应当前请求(自动回复) */
                //$wechat->response($content, $type);

                /**
                 * 响应当前请求还有以下方法可以使用
                 * 具体参数格式说明请参考文档
                 * 
                 * $wechat->replyText($text); //回复文本消息
                 * $wechat->replyImage($media_id); //回复图片消息
                 * $wechat->replyVoice($media_id); //回复音频消息
                 * $wechat->replyVideo($media_id, $title, $discription); //回复视频消息
                 * $wechat->replyMusic($title, $discription, $musicurl, $hqmusicurl, $thumb_media_id); //回复音乐消息
                 * $wechat->replyNews($news, $news1, $news2, $news3); //回复多条图文消息
                 * $wechat->replyNewsOnce($title, $discription, $url, $picurl); //回复单条图文消息
                 * 
                 */
                
                //执行回调
                $this->returnplay($wechat, $data);
            }
        } catch(\Exception $e){
            file_put_contents('./error.json', json_encode($e->getMessage()));
        }
        
    }
	/**
	 * 消息发送
	 *
	 */
	private function reply($wechat  = null ,$data = null){
		if(!$wechat || !$data) return $wechat->replyText('参数错误');
		/****关注事件发送****/
		$mMap['wechat'] = $data['ToUserName'];
		$mMap['show'] = '1';
		$mMap['text'] = $data['Content'];
		$mRs = M('wexinacc_reply')->where($mMap)->find();
		if(empty($mRs)) {			
			$tData = array(
					'openid'=>$data['FromUserName'],
					'wechat'=>$data['ToUserName'],
					'json'=>json_encode($data),
					'create_time'=>time()
					);
			M('wexinacc_message')->add($tData);
			$wechat->replyText('我们已经将您的问题提交给客服，请等待回复。');
			
			die();
		}
		 switch ($mRs['msgtype']) {            
			case Wechat::MSG_TYPE_TEXT:#文本
					$wechat->replyText($mRs['content']);
				break;
			case Wechat::MSG_TYPE_IMAGE:#图片
					$wechat->replyImage($mRs['content']);
				break;
			case Wechat::MSG_TYPE_VOICE:#声音
					$wechat->replyVoice(json_decode($mRs['content']));
				break;
			case Wechat::MSG_TYPE_VIDEO:#视频
					$wechat->replyVideo(json_decode($mRs['content']));
				break;
			case Wechat::MSG_TYPE_LOCATION:#地址
					#$wechat->replyNews(json_decode($mRs['content']));#上传地址
				break;
			case Wechat::MSG_TYPE_LINK:#单图文
					$wechat->replyNewsOnce(json_decode($mRs['content']));
				break;
			case Wechat::MSG_TYPE_MUSIC:#音乐
					$wechat->replyMusic(json_decode($mRs['content']));
				break;
			case Wechat::MSG_TYPE_NEWS:	#多图文
					$tNews = json_decode($mRs['content']);					
					$wechat->replyNews($tNews[0],$tNews[1],$tNews[2],$tNews[3],$tNews[4],$tNews[5],$tNews[6],$tNews[7]);
				break;
			case Wechat::MSG_TYPE_ADDON:	#扩展
					/**
					 * json编码
					 * 格式
					   array(
						'addon'=>'AddonName',
						'action'=>'Action',
						'param'=>array(
									'paramkey'=>'paramval'
								),
					   );
					 */
					$tAddon = json_decode($mRs['content'],true);	
					$mClass = '\\Addon\\'.ucfirst($tAddon['addon']);					
					$moudleAddon = new $mClass($wechat,$data);				
					$moudleAddon->$tAddon['action']($tAddon['param']);
				break;
		 }
	}
    /**
     * 消息返回
     * @param  Object $wechat Wechat对象
     * @param  array  $data   接受到微信推送的消息
     */
    private function returnplay($wechat, $data){
		/*
		$arr = array(
				'addon'=>'tests',
			    'param'=>array(
							'echo'=>'这是测试信息',
							'data'=>'这是测试数据',							
						),
			   );
		
		echo json_encode($arr);
		die();
		*/
		#$wechat->replyText('扩展程序有误，请联系17771615219提供技术支持');
		#检测事件类型
		 switch ($data['MsgType']) {
            case Wechat::MSG_TYPE_EVENT:
				 switch ($data['Event']) {
					
                    case Wechat::MSG_EVENT_SUBSCRIBE:
						//关注						
							$data['Content'] = 'subscribe';
							$tData = array(
									'openid'=>$data['FromUserName'],
									'wechat'=>$data['ToUserName'],
									);							
							$mCount = M('wexinacc_user')->where($tData)->count();
							if($mCount >0 ){
							$data['Content'] = 'subscribe_error';
							$this->reply($wechat, $data);
							die();
							}
							$tData = array(
									'openid'=>$data['FromUserName'],
									'wechat'=>$data['ToUserName'],
									'md5hash'=>md5($data['FromUserName'].$data['ToUserName'].time().rand(0,10000)),
									'create_time'=>time()
									);
							(session('wechat.type') == 2) && $tData['openid3'] = $data['FromUserName'];
							M('wexinacc_user')->add($tData);
							$this->reply($wechat, $data);
							die();
					    break;

                    case Wechat::MSG_EVENT_UNSUBSCRIBE:
                        //取消关注
							$data['Content'] = 'unsubscribe';
							$tData = array(
									'openid'=>$data['FromUserName'],
									'wechat'=>$data['ToUserName'],
									);
							M('wexinacc_user')->where($tData)->delete();
							$this->reply($wechat, $data);
							die();
                        break;

                    default:
						($data['Event'] != Wechat::MSG_EVENT_CLICK) && $data['Content'] = $data['Event'];
                    break;
				 }
			case Wechat::MSG_TYPE_TEXT:
				$this->reply($wechat, $data);
				die();
			break;
		 }
		
		/*****测试******/

		/*****正文开始*****/
		/*
        switch ($data['MsgType']) {
            case Wechat::MSG_TYPE_EVENT:
                switch ($data['Event']) {
                    case Wechat::MSG_EVENT_SUBSCRIBE:
						#查找关注推送事件
						$mMap['wechat'] = $data['ToUserName'];
						$mMap['show'] = '1';
						$mRs = M('wexinacc_subscribe')->where($mMap)->find();
						
                        $wechat->replyText('欢迎您关注麦当苗儿公众平台！回复“文本”，“图片”，“语音”，“视频”，“音乐”，“图文”，“多图文”查看相应的信息！');
                        break;

                    case Wechat::MSG_EVENT_UNSUBSCRIBE:
                        //取消关注，记录日志
                        break;

                    default:
                        $wechat->replyText("欢迎访问麦当苗儿公众平台！您的事件类型：{$data['Event']}，EventKey：{$data['EventKey']}");
                        break;
                }
                break;

            case Wechat::MSG_TYPE_TEXT:
                switch ($data['Content']) {			
                    case '文本':
                        $wechat->replyText('欢迎访问麦当苗儿公众平台，这是文本回复的内容！');
                        break;
					
                    case '图片':
                        //$media_id = $this->upload('image');
                        $media_id = '1J03FqvqN_jWX6xe8F-VJr7QHVTQsJBS6x4uwKuzyLE';
                        $wechat->replyImage($media_id);
                        break;

                    case '语音':
                        //$media_id = $this->upload('voice');
                        $media_id = '1J03FqvqN_jWX6xe8F-VJgisW3vE28MpNljNnUeD3Pc';
                        $wechat->replyVoice($media_id);
                        break;

                    case '视频':
                        //$media_id = $this->upload('video');
                        $media_id = '1J03FqvqN_jWX6xe8F-VJn9Qv0O96rcQgITYPxEIXiQ';
                        $wechat->replyVideo($media_id, '视频标题', '视频描述信息。。。');
                        break;

                    case '音乐':
                        //$thumb_media_id = $this->upload('thumb');
                        $thumb_media_id = '1J03FqvqN_jWX6xe8F-VJrjYzcBAhhglm48EhwNoBLA';
                        $wechat->replyMusic(
                            'Wakawaka!', 
                            'Shakira - Waka Waka, MaxRNB - Your first R/Hiphop source', 
                            'http://wechat.zjzit.cn/Public/music.mp3', 
                            'http://wechat.zjzit.cn/Public/music.mp3', 
                            $thumb_media_id
                        ); //回复音乐消息
                        break;

                    case '图文':
                        $wechat->replyNewsOnce(
                            "全民创业蒙的就是你，来一盆冷水吧！",
                            "全民创业已经如火如荼，然而创业是一个非常自我的过程，它是一种生活方式的选择。从外部的推动有助于提高创业的存活率，但是未必能够提高创新的成功率。第一次创业的人，至少90%以上都会以失败而告终。创业成功者大部分年龄在30岁到38岁之间，而且创业成功最高的概率是第三次创业。", 
                            "http://www.topthink.com/topic/11991.html",
                            "http://yun.topthink.com/Uploads/Editor/2015-07-30/55b991cad4c48.jpg"
                        ); //回复单条图文消息
                        break;

                    case '多图文':
                        $news = array(
                            "全民创业蒙的就是你，来一盆冷水吧！",
                            "全民创业已经如火如荼，然而创业是一个非常自我的过程，它是一种生活方式的选择。从外部的推动有助于提高创业的存活率，但是未必能够提高创新的成功率。第一次创业的人，至少90%以上都会以失败而告终。创业成功者大部分年龄在30岁到38岁之间，而且创业成功最高的概率是第三次创业。", 
                            "http://www.topthink.com/topic/11991.html",
                            "http://yun.topthink.com/Uploads/Editor/2015-07-30/55b991cad4c48.jpg"
                        ); //回复单条图文消息

                        $wechat->replyNews($news, $news, $news, $news, $news);
                        break;
                    
                    default:
                        $wechat->replyText("欢迎访问麦当苗儿公众平台！您输入的内容是：{$data['Content']}");
                        break;
                }
                break;
            
            default:
                # code...
                break;
        }
		*/
    }
	

    /**
     * 资源文件上传方法
     * @param  string $type 上传的资源类型
     * @return string       媒体资源ID
     */
    private function upload($type){
        $token = session("token");

        if($token){
            $auth = new WechatAuth($token);
        } else {
            $auth  = new WechatAuth($token);
            $token = $auth->getAccessToken();

            session(array('expire' => $token['expires_in']));
            session("token", $token['access_token']);
        }

        switch ($type) {
            case 'image':
                $filename = './Public/image.jpg';
                $media    = $auth->materialAddMaterial($filename, $type);
                break;

            case 'voice':
                $filename = './Public/voice.mp3';
                $media    = $auth->materialAddMaterial($filename, $type);
                break;

            case 'video':
                $filename    = './Public/video.mp4';
                $discription = array('title' => '视频标题', 'introduction' => '视频描述');
                $media       = $auth->materialAddMaterial($filename, $type, $discription);
                break;

            case 'thumb':
                $filename = './Public/music.jpg';
                $media    = $auth->materialAddMaterial($filename, $type);
                break;
            
            default:
                return '';
        }

        if($media["errcode"] == 42001){ //access_token expired
            session("token", null);
            $this->upload($type);
        }

        return $media['media_id'];
    }
}
