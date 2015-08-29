<?php
namespace Admin\Controller;
use Think\Controller;
class UserController extends Controller {
	public function _initialize(){
		
	}
	public function logout(){
		session_destroy();
		$this->success('退出成功',U('user/login'));
	}
    public function login(){
		$mIsLogin = (Session(C('AUTH_LABLE').'.isadmin') === '1')?true:false;
		if($mIsLogin == true){
			define('IS_LOGIN',false);
			$this->error('您已成功登陆，正在执行跳转……',U('index/index'));
			die();
		}
		if(IS_AJAX){
		#header('content-type:text/html;charset=utf8');
		#获取账号密码
		$mUsername = encode(I('post.username'),C('USERNAME_KEY'));
		$tPassword = I('post.password');			
		(empty($mUsername) || empty($tPassword)) && $this->error('账号密码不能为空') && die();
		#根据账号查找用户信息
		$mUser = M('user')->where("cate=10000 and username='{$mUsername}'")->find();		
		empty($mUser) && $this->error('用户不存在') && die();		
		#检测错误登陆次数
		$this->checkerrortimes($mUser);
		#根据token加密密码
		$mPassword = md5($tPassword.$mUser['token']);	
		#$this->error(($mPassword .'/'.$mUser['password'])) && die;
		#对比密码
		($mPassword !== $mUser['password']) && $this->adderrortimes($mUser) && $this->error('密码错误') && die();
		
		$ipLocation = new \Org\Net\IpLocation;
		$tArea = $ipLocation->getlocation();
		foreach($tArea as $fKey=>$fVal){
		$typeEncode = mb_detect_encoding($fVal, array('ASCII','UTF-8','GB2312','GBK','BIG5'));
		if($typeEncode !== 'UTF-8') $tArea[$fKey] = @iconv($typeEncode,'UTF-8',$fVal);
		}	
		$tLoginData = array(
					'logintime'=>time(),
					'loginaddress'=>$tArea['country'].$tArea['area'],
					'loginip'=>$tArea['ip']
					);
		$tSaveData = array(
					'errendtime'=>time(),
					'errtimes'=>0,
					'loginstr'=>serialize($tLoginData),					
					);
		M('user')->field('loginstr,errtimes,errendtime')->where("username='{$mUsername}'")->save($tSaveData);	
		#获取最近20次登陆记录，删除20以外的
		$tLoginrecode = array(
							'username'=>$mUsername,
							'time'=>$tSaveData['errendtime'],
							'address'=>$tLoginData['loginaddress'],
							'ip'=>$tLoginData['loginip'],
							
						);
		M('loginrecode')->add($tLoginrecode);
		$tRs = M('loginrecode')->field('time')->where("username='{$mUsername}'")->order('time desc')->limit(20)->select();
		$tTimes = '';
		foreach($tRs as $V){
			$tTimes .= $V['time'] . ',';
		}
		(!empty($tTimes)) && $tTimes = substr($tTimes,0,-1);
		M('loginrecode')->where("username='{$mUsername}' and time not in({$tTimes})")->delete();
		
		#处理数据
		$mUser['loginstr'] = @unserialize($mUser['loginstr']);
		$mUser['realusername'] = I('post.username');
		Session(C('AUTH_LABLE'),$mUser);#登陆记录	
		$this->success('登陆成功',U('index/index'));		
		return;
		}		
       $this->display();
    }
	private function checkerrortimes($tUser){		
		$tTime =  time();
		$mErrorTimes = $tUser;
		($mErrorTimes['errendtime'] >= $tTime)?
		$mErrorTimes['errtimes']++:
		$mErrorTimes['errtimes'] = 0;
		if($mErrorTimes['errtimes'] > 5){	
			$this->error('您登陆错误次数过多，请15分钟后再登陆');
			return false;			
		}
	}
	#的登录错误次数+1
	private function adderrortimes($tUser){
		#配置
		$tTime =  time();
		$mUsername = $tUser['username'];
		$mErrorTimes = $tUser;
		($mErrorTimes['errendtime'] >= $tTime)?
		$mErrorTimes['errtimes']++:
		$mErrorTimes['errtimes'] = 1;				
		$mErrorTimes['errendtime'] = $tTime+300;		
		#保存
		if($mErrorTimes['errtimes'] > 5){	
			$mErrorTimes['errendtime'] = $tTime+900;			
			M('user')->field('errtimes,errendtime')->where("cate=10000 and username='{$mUsername}'")->save($mErrorTimes);
			$this->error('您登陆错误次数过多，请15分钟后再登陆');
			return false;			
		}
		M('user')->field('errtimes,errendtime')->where("username='{$mUsername}'")->save($mErrorTimes);
		return true;
	}
	
}