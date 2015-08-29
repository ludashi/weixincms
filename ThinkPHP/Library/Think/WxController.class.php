<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2014 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------
namespace Think;
/**
 * ThinkPHP 控制器基类 抽象类
 */
abstract class WxController extends Controller{
	protected $mOpenid = '';
	protected $mWechat = '';
   /**
     * 架构函数 取得模板对象实例
     * @access public
     */
    public function __construct() {
        parent::__construct();		
		($this->mWechat = get_wechat()) && C('wechat',$this->mWechat);		
		#根据wechat查询公众号是否存在
		$mWechat = session('datawechat');
		if(empty($mWechat)){
		$mMap['wechat'] = $this->mWechat;
		$mWechat = M('kz_user')					
					->where($mMap)
					->find();
		}
		
		#检测access_token是否可用
		if(accessToken_Test($mWechat)){
			C('datawechat',$mWechat);#可用保存
		}else{
			$mWechat = accessToken_Get($mWechat);
			C('datawechat',$mWechat);#不可用重新获取
		}
		session('datawechat',$mWechat);
		#获取用户的openid,用户信息
		($this->mOpenid = get_openid()) && C('openid',$this->mOpenid);		
		$openTemp = C('openidlable');		
    }

   
}

