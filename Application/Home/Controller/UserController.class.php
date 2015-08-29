<?php
namespace Home\Controller;
use Think\BaseController;
class UserController extends BaseController {
    public function bind(){		
		#session_destroy();
		#var_dump(session('system_config.apptitle'));
		#die();
		$mOpenid3 = session('loginuser.openid3');
	    $mWechat = I('get.wechat');
		$mMap = array(
						'openid3'=>$mOpenid3,
						'wechat'=>$mWechat,
						'show'=>'1'
					);
		$mRs = M('wexinacc_user')->where($mMap)->find();
		if(empty($mRs)){
			$this->error('未找到此用户');
		}
		if(!empty($mRs['username'])){
			$this->error('未找到此用户');
		}
	   if(IS_POST){
		   
		   
		   $tmpCookieUrl = cookie('my_history_uri');
		   $reBackUri = empty( $tmpCookieUrl)?
		   U('user/info',array('wechat'=>I('get.wechat')),'.'.C('URL_HTML_SUFFIX'),true):$tmpCookieUrl;		   
		   $mUserName = I('post.username',null,'intval');
		   $mPasswd = I('post.password',null,'string');		 
		   ($mUserName == 0) && $this->error('学号必须为数字');
		   #检测帐号密码是否为空
		   (empty($mUserName) || empty($mPasswd)) && $this->error('绑定失败，帐号密码不能为空');
		   #进行加密
		   $mUserName = encode($mUserName, C('USERNAME_KEY'));
		   $mPasswd = encode($mPasswd, $mOpenid3.$mWechat);
		   $saveData = array(
						'username'=>$mUserName,
						'password'=>$mPasswd,
					);
			
			$ok = M('wexinacc_user')->where($mMap)->save($saveData);
			if($ok) 
				$this->success('绑定成功',$reBackUri);
				else
				$this->success('绑定失败，请重试');
		   die;
	   }
	   $this->assign('title',session('system_config.apptitle').'-绑定信息');
       $this->display('/Changda/bind');
    }
	
}