<?php
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2014 http://www.jztmkj.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: 丶梦在想我 <luqiang19921025@vip.qq.com>
// +----------------------------------------------------------------------
namespace Think;
/**
 *  CMS控制器基类 抽象类
 */
abstract class WeixinController extends BaseController{

    public function __construct() {
       parent::__construct();
	   
	   $mMap = array();
	   $mMap['wechat'] = I('get.wechat');			#获取微信平台标识
	   $mMap['show'] = '1';
	   $mRs = M('wexinacc')->where($mMap)->find();	   
	   //获取双ID
	   if($mRs['type'] == 2){#服务号
		   $mAppid = $mRs['appid'];
		   $mSecret = $mRs['secret'];
	   }else{#订阅号
		   $mAppid = session('system_config.appid');
		   $mSecret = session('system_config.secret');
	   }
	   #如果没有oauth2登录和没有cookie(openid_wechat)，则执行
	   #cookie('dreamofmewx_logincode',1,'expire=2592000');
	   
	   if(!cookie('logincode')){			
			if(!session('tmp.state') || session('tmp.state') != I('get.state')){
				#生成 state
				$mTmp = session('tmp');
				$mTmp['state'] = time().rand(1,1000);
				session('tmp',$mTmp);
				#回调链接
				$mRedirect_uri = session('system_config.host').'/Home/'.$_SERVER['PATH_INFO'];	   				
				#实例化SDK
				$mAuth = new \Com\WechatAuth;
				$mAuth->setParam($mAppid,$mSecret);
				#获取微信接入链接
				$mRequestcodeurl = $mAuth->getRequestCodeURL($mRedirect_uri,session('tmp.state'));		
				#die($mRedirect_uri);
				#执行跳转
				session('tmp.requestcodeurl',$mRequestcodeurl);
				header('location:'.$mRequestcodeurl);#跳转
				die();
			}else{
				#实例化SDK
				$mAuth = new \Com\WechatAuth;
				$mAuth->setParam($mAppid,$mSecret);
				#获取许可
				$TokenAuth = $mAuth->getAccessToken('code',I('get.code'));
				(session('system_config.jsontests') == 1) && file_put_contents('./oauth2.json',json_encode($TokenAuth));				
				if($TokenAuth['errcode']) die('登录错误');				
				#根据openid3进行查询如果不存在，则提示绑定
				$mMap = array();
				$mMap['openid3'] = $TokenAuth['openid'];
				$mMap['wechat'] = I('get.wechat');				
				$mUser = M('wexinacc_user')->field('openid,openid3,wechat,show,info,create_time,username')->where($mMap)->find();
				if(empty($mUser)) die('帐号不存在，请在公主号页面进行注册');
				if($mUser['show'] != 1) die('此帐号被冻结');				
				
				#读取用户info
				$mUser['info'] = $mAuth->getUserInfo($TokenAuth['openid']);
				
				session('loginuser',$mUser);#登录标记1
				
				$mUser['info'] = json_encode($mUser['info']);
				#存储用户信息
				M('wexinacc_user')
				->field('info')
				->where($mMap)
				->save($mUser);
				
				#长期登录标记2				
				unset($mUser['show'],$mUser['info'],$mUser['create_time'],$mUser['username']);
				cookie('logincode',serialize($mUser),session('system_config.logincookie'));#设置登录标记,已经成功获取openid3
				/*
				{
				   "access_token":"ACCESS_TOKEN",
				   "expires_in":7200,
				   "refresh_token":"REFRESH_TOKEN",
				   "openid":"OPENID",
				   "scope":"SCOPE",
				   "unionid": "o6_bmasdasdsad6_2sgVt7hMZOPfL"
				}
				*/
			}
	   }
	   
		if(!session('loginuser')){
			$mLogincode = unserialize(cookie('logincode'));
			$mMap = array();
			$mMap['openid3'] = $mLogincode['openid3'];
			$mMap['openid'] = $mLogincode['openid'];
			$mMap['wechat'] = I('get.wechat');	
			$mUser = M('wexinacc_user')->field('openid,openid3,wechat,show,info,create_time,username')->where($mMap)->find();
			(empty($mUser['info'])) && cookie('logincode',null);	#入股info没有，则清除		
			(empty($mUser)) && $this->error('用户不存在，请先注册');
			$mUser['info'] = json_decode($mUser['info'],true);
			session('loginuser',$mUser);
		}
		$mUser = session('loginuser');
		$mRedirect_uri = session('system_config.host').'/Home/'.$_SERVER['PATH_INFO'];
		cookie('my_history_uri',$mRedirect_uri);
		if(empty($mUser['username'])){
			$mMap = array();
			$mMap['openid3'] = $mUser['openid3'];
			$mMap['openid'] = $mUser['openid'];
			$mMap['wechat'] = $mUser['wechat'];	
			$mUser['username'] = @implode(M('wexinacc_user')->field('username')->where($mMap)->find());
			session('loginuser.username',$mUser['username']);
		}
		(empty($mUser['username'])) && $this->error('请先绑定教务处帐号',U('user/bind',array('wechat'=>I('get.wechat')),'.'.C('URL_HTML_SUFFIX'),true));
    }

   
}
