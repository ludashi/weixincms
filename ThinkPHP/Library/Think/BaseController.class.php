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
abstract class BaseController extends Controller{

    public function __construct() {
       parent::__construct();
	   
	   if(!session('system_config')){
		   $mRs = M('systemconfig')->select();
		   $mCfg = array();
		   foreach($mRs as $tmp_cfg){
			  $mCfg[$tmp_cfg['keys']] = $tmp_cfg['values'];
		   }
		   session('system_config', $mCfg); //配置	   
	   }
    }

   
}
