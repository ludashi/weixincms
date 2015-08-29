<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2014 http://0716it.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 梦在想我 <345340585@qq.com>
// +----------------------------------------------------------------------
namespace Think;
/**
 * ThinkPHP 控制器基类 抽象类
 */
class PbAdmController extends Controller
{
	#重写构造函数
	public function __construct(){
		parent::__construct();
		define('IS_WEIXIN',is_weixin());
		define('IS_MOBILE',is_mobile());
		(IS_MOBILE || IS_WEIXIN) && die('请使用电脑访问');
		#检测用户是否登陆，未登录的自动跳转到登录界面
		#var_dump(Session(C('AUTH_LABLE').'.isadmin'));
		#die();
		$mIsLogin = (Session(C('AUTH_LABLE').'.isadmin') === '1')?true:false;
		if($mIsLogin !== true){
			define('IS_LOGIN',false);
			$this->error('您还没有登陆',U('user/login'));
			return false;
		}
		define('IS_LOGIN',$mIsLogin);	
	}
	
	
}


