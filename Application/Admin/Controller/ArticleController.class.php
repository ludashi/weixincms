<?php
namespace Admin\Controller;
use Think\PbAdmController;
class ArticleController extends PbAdmController {

	public function gets(){
		$mId = I('get.id',null,'intval');
		if(empty($mId)) return $this->error('抱歉，文章编号未找到');
		$mRs = M('kz_article')->find($mId);
		if(empty($mRs)) return $this->error('抱歉，文章编号未找到');
		$mRs['ext'] = unserialize($mRs['ext']);
		$this->assign('article',$mRs);
		$this->assign('panel',I('get.panel'));
		$this->display('content');
	}
	public function del(){		
		$mId = I('get.id',null,'intval');
		$saveData = array(
					 'check'=>'0'
					);
		$mOk = M('kz_article')->where("id={$mId}")->save($saveData);
		
		if($mOk)
			$this->success('删除成功');
			else
			$this->error('删除失败');	
	}
	public function realdel(){		
		$mId = I('get.id',null,'intval');		
		$mOk = M('kz_article')->delete($mId);
		
		if($mOk)
			$this->success('删除成功');
			else
			$this->error('删除失败');	
	}
	public function redel(){		
		$mId = I('get.id',null,'intval');
		$saveData = array(
					 'check'=>'1'
					);
		$mOk = M('kz_article')->where("id={$mId}")->save($saveData);
		
		if($mOk)
			$this->success('删除成功');
			else
			$this->error('删除失败');	
	}
}