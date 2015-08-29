<?php
namespace Admin\Controller;
use Think\PbAdmController;
class ContentController extends PbAdmController {
   
	#获取模块
	public function gets(){
		$getMethod = I('get.panel');
		#默认
		if($getMethod == 'default'){
			$loginAdmin = session(C('AUTH_LABLE'));
			$defaultPanel = $loginAdmin['panel'];
				if($defaultPanel == 'default'){
				$this->show('<br/><br/>还未设置首页模板');
				die();
				}else{
					return $this->$defaultPanel();					
				}
		}
		#非默认
		if(empty($getMethod)) return ;		
		if(method_exists($this,$getMethod)){
			$this->$getMethod();
		}else{
			$this->error('模块不存在',U('Content/gets',array('panel'=>'default')));
		}
	}
	/*
	 * 以下模块不可直接访问
	 *
	 */
	#默认模块
	private function index(){
		
		$loginAdmin = session(C('AUTH_LABLE'));
		$defaultPanel = $loginAdmin['panel'];
		if($defaultPanel == 'default'){
			$this->show('<br/><br/>还未设置首页模板');
			die();
		}else{
			$this->$defaultPanel();
		}
	
		
	}
	
	/*
	 * 以下模块为功能模块
	 */
	#我的信息
	private function myinfo(){		
		$mUserData = Session(C('AUTH_LABLE'));
		$mLoginRecord =  M('loginrecode')->where("username='{$mUserData['username']}'")->order('time desc')->limit(1)->select();
		var_dump($mUserData,$mLoginRecord);		
	}
	#微信设置
	private function weixinconfig(){		
		switch(I('get.do',null)){
			case 'add':
				$this->weixinconfig_add();
			break;
			case 'edit':
				$this->weixinconfig_edit();
			break;
			case 'doactive':
				$this->weixinconfig_doactive();
			break;
			case 'del':
				$this->weixinconfig_del();
			break;
			default:
				$this->weixinconfig_default();
		}
	}
	/*
	 * 复杂逻辑
	 */
	#删除公众号
	private function weixinconfig_del(){		
		$mMap = array('username'=>session(C('AUTH_LABLE').'.username'));
		empty($mMap['username']) && $this->error('请先进行登录');
		$mMap['wechat'] = I('get.wechat');
		$mMap['isnow'] = '0';
		M('wexinacc')->where($mMap)->delete()?
			$this->success('删除成功',U('Content/gets',array('panel'=>'weixinconfig'))):
			$this->error('删除失败,若激活了，请取消激活再删除');
		//echo M('wexinacc')->getLastSql();
	}
	#激活公众号
	private function weixinconfig_doactive(){
		
		$mMap = array('username'=>session(C('AUTH_LABLE').'.username'));
		empty($mMap['username']) && $this->error('请先进行登录');
		M('wexinacc')->where($mMap)->save(array('isnow'=>'0'));
		$mMap['wechat'] = I('get.wechat');
		M('wexinacc')->where($mMap)->save(array('isnow'=>'1'))?
			$this->success('激活成功',U('Content/gets',array('panel'=>'weixinconfig'))):
			$this->error('激活失败');
		
	}
	#添加公众号
	private function weixinconfig_add(){
		if(IS_POST){
			$mMap = array('username'=>session(C('AUTH_LABLE').'.username'));
			empty($mMap['username']) && $this->error('请先进行登录');
			#$mMap['wechat'] = I('get.wechat');		
			#empty($mMap['wechat']) && $this->error('公众号不存在');
			
			$saveData = I('weixin');
			(
			 empty($saveData['name']) ||
			 empty($saveData['wechat']) ||
			 empty($saveData['weixinhao']) ||
			 empty($saveData['type']) ||
			 empty($saveData['appid']) || 
			 empty($saveData['secret'])
			 ) && $this->error('所有项都不能为空');			
			$saveData['update_time'] = $saveData['create_time'] = time();
			$saveData['isnow'] ='0';
			$saveData['username'] = $mMap['username'];
			M('wexinacc')->where($mMap)->add($saveData)?
			$this->success('添加成功',U('Content/gets',array('panel'=>'weixinconfig'))):
			$this->error('添加失败');
			die;
		}
		$this->display('/Weixin/SystemConfig/add');
	}
	#配置编辑页面
	private function weixinconfig_edit(){
		if(IS_POST){
			$mMap = array('username'=>session(C('AUTH_LABLE').'.username'));
			empty($mMap['username']) && $this->error('请先进行登录');
			$mMap['wechat'] = I('get.wechat');		
			empty($mMap['wechat']) && $this->error('公众号不存在');
			
			$saveData = I('weixin');
			(
			 empty($saveData['name']) ||
			 empty($saveData['wechat']) ||
			 empty($saveData['weixinhao']) ||
			 empty($saveData['type']) ||
			 empty($saveData['appid']) || 
			 empty($saveData['secret'])
			 ) && $this->error('所有项都不能为空');			
			$saveData['update_time'] = time();
			M('wexinacc')->where($mMap)->save($saveData)?
			$this->success('更新成功',U('Content/gets',array('panel'=>'weixinconfig'))):
			$this->error('更新失败');
			die;
		}
		#设置map
		$mMap = array('username'=>session(C('AUTH_LABLE').'.username'));
		empty($mMap['username']) && $this->error('请先进行登录');
		$mMap['wechat'] = I('get.wechat');		
		
		empty($mMap['wechat']) && $this->error('公众号不存在');
		#查询
		$mRs = M('wexinacc')->field('name,wechat,weixinhao,type,appid,secret')->where($mMap)->find();
		$this->assign('fuwu','');
		$this->assign('dingyue','');		
		if($mRs['type'] == 2){
			$this->assign('fuwu','checked="checked"');
		}else{
			$this->assign('dingyue','checked="checked"');
		}
		$this->assign('wechat',$mRs);
		$this->display('/Weixin/SystemConfig/edit');
	}
	#默认配置页面
	private function weixinconfig_default(){
		$mMap = array('username'=>session(C('AUTH_LABLE').'.username'));
		empty($mMap['username']) && $this->error('请先进行登录');
		if(IS_AJAX){
			$mPage = I('get.p',1,'intval');
			#获取数量
			$pageCount = 16;
			$myWechatCount = M('wexinacc')->where($mMap)->field('name,weixinhao,type,wechat,isnow')->count();
			#分页
			$modelPage = new \Think\Page($myWechatCount,$pageCount);
			$modelPage->setConfig('prev','上一页');
			$modelPage->setConfig('next','下一页');
			$modelPage->setConfig('last','末页');
			$modelPage->setConfig('first','首页');
			$modelPage->setConfig('rollPage',7);
			$pageShow = $modelPage->show();
				
			$myWechat = M('wexinacc')
						->where($mMap)
						->field('name,weixinhao,type,wechat,isnow')
						->page($mPage)
						->limit($pageCount)
						->select();
			$returnArr = array(
							'pagestr'=>$pageShow,
							'data'=>$myWechat
						);
			if(!empty($myWechat)){
				$this->success($returnArr);
			}else{
				$this->error('没有数据');
			}
			die;
		}		
		$this->display('/Weixin/SystemConfig/lists');
	}
}