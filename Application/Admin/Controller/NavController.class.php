<?php
namespace Admin\Controller;
use Think\PbAdmController;
class NavController extends PbAdmController {
   
	
	public function left(){
		$tPid = I('get.pid',5,'intval');
		$mMap[0][0]['pid'] = array('Like','% ,'.$tPid.' %');	
		$mMap[0][1]['pid'] = $tPid;
		$mMap[0]['_logic'] = 'OR';
		$mMap[1]['show'] = '1';
		$mNav = M('nav')->field('name,u1,u2,face')->order('paixu asc')->where($mMap)->select();
		#echo '<br/><br/><br/><br/>';
		#var_dump(M('nav')->getLastSql());
		#die();
		$mUser = session(C('AUTH_LABLE'));
		$this->assign('username',$mUser['realusername']);
		$this->assign('navs',$mNav);
		$this->assign('tests',json_encode(array('admin'=>1)));
		$this->display();		
	}
	public function top(){
		$mMap['pid'] = '0';
		$mMap['show'] = '1';
		$mNavs = M('nav')->field('id,name')->order('paixu asc')->where($mMap)->select();
		$mStr = '';
		foreach($mNavs as $kNav){
			$mStr .= "<a href=\"".U('nav/left',array('pid'=>$kNav['id']))."\" target=\"lower_left\">{$kNav['name']} </a>&nbsp;&nbsp;" ;
		}
		echo "$('[data-role=\"topnav\"]').html('{$mStr}');";
		#echo "$('[data-role=\"topnav\"]').html('<font color=\"#fff\">系统设置，文档管理，会员管理，工具箱，<a href=\"".U('nav/left',array('pid'=>$kNav['id']))."\" target=\"lower_left\">个人信息（下拉菜单）</font>');";
	}
	
}