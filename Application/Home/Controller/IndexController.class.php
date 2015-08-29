<?php
namespace Home\Controller;
use Think\WeixinController;
class IndexController extends WeixinController {
    public function index(){
	   $this->assign('title',session('system_config.apptitle'));
       $this->display();
    }
	
}