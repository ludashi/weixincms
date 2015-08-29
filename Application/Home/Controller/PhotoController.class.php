<?php
namespace Home\Controller;
use Think\Controller;
class PhotoController extends Controller {
    public function info(){		
		$mXuehao = '201162207';
		#设置token
		$mToken = session('api_accesstoken.photolist');
		if(empty($mToken)){
		$mToken = substr(md5(time().rand(0,1000)),0,8);
		session('api_accesstoken.photolist',$mToken);
		}
		(strlen($mXuehao) != 9) && $this->error("学号{$mXuehao}不正确，请重新填写");
		#根据学号获取图片
		(is_numeric($mXuehao) == 1) || $mImgUrl = 'http://7xlb4q.com1.z0.glb.clouddn.com/images/404.jpg';
		empty($mImgUrl) && $mImgUrl = $this->getUrlByXuehao($mXuehao);
		if(empty($mImgUrl)){
		$mFolder =  substr($mXuehao,0,4);
		(is_numeric($mXuehao) == 1)?
			$mImgUrl = "http://jwc2.yangtzeu.edu.cn:8080/photo/{$mFolder}/{$mXuehao}.jpg":		
			$this->error('请输入正确的学号');
			#$mUrl = 'http://58.54.133.238:89/photo/';
		}
	  # $this->assign('title',session('system_config.apptitle').'-照片查询');
	  #检查是否有图片
		if( @fopen( $mImgUrl, 'r' ) ){
			$this->addurl($mImgUrl,$mXuehao);				
		}else{
			$mImgUrl = 'http://7xlb4q.com1.z0.glb.clouddn.com/images/404.jpg';
		}
	   $this->assign('imgsrc',$mImgUrl);
	   $this->assign('title','照片查询');
	   $this->assign('accesstoken',$mToken);	   
       $this->display('/Changda/photo');
	   
    }
	//获取图片url
	public function geturl(){
		$mImgUrl = '';
		$mXuehao = I('post.xuehao');
		(is_numeric($mXuehao) == 1) || $mImgUrl = 'http://7xlb4q.com1.z0.glb.clouddn.com/images/404.jpg';
		//201160328
		#检查是否是禁止查询的
		$mMap = array(
					'forbidden'=>$mXuehao
				);		
		$mCount = M('ext_forbidden_xuehao')->where($mMap)->count();
		($mCount > 0 ) && 
		$mImgUrl = 'http://7xlb4q.com1.z0.glb.clouddn.com/images/404.jpg';
		#根据学号获取图片
		empty($mImgUrl) && $mImgUrl = $this->getUrlByXuehao($mXuehao);
		#判断是否是9位
		(empty($mImgUrl) && strlen($mXuehao) != 9) && 
		$mImgUrl = 'http://7xlb4q.com1.z0.glb.clouddn.com/images/404.jpg';
		#拼装图片路径
		if(empty($mImgUrl)){
			$mFolder =  substr($mXuehao,0,4);	
			$mImgUrl = "http://jwc2.yangtzeu.edu.cn:8080/photo/{$mFolder}/{$mXuehao}.jpg";
		}
		#检查是否有图片
		if( @fopen( $mImgUrl, 'r' ) ){
			$this->addurl($mImgUrl,$mXuehao);
			echo $mImgUrl;			
		}else{
			echo 'http://7xlb4q.com1.z0.glb.clouddn.com/images/404.jpg';
		}
	}
	#获取选美列表
	public function getlists(){
		if(session('api_accesstoken.photolist') != I('post.accesstoken')){
			$mItems = '<tr>
                           <th colspan="4">验证未通过，请通过正规渠道获取信息</th>
                          
                       </tr>';
		}
		if(empty($mItems)){
			$mRs = M('ext_xuanmei')->select();
			
			if(!empty($mRs)){
				$i = 1;
				foreach($mRs as $item){				
					$mItems .= "<tr>
								   <td>{$i}</td>
								   <td class='list_img'><img src='{$item['urlcode']}' alt=''/></td>
								   <td>{$item['name']}</td>
								   <td><i class='fa fa-heart'></i> {$item['piaoshu']}</td>
							   </tr>
							";
					$i++;
				}
				
			}else{
				$mItems = '<tr>
                           <th colspan="4">还没有人投票哦，快来做第一个参与的人吧。</th>
                       </tr>';
			}
		}
		
		echo "<table>
                       <thead>
                       <tr>
                           <td>排名</td>
                           <td>照片</td>
                           <td>年级</td>
                           <td>人气</td>
                       </tr>
                       </thead>
                       <tbody>
                       {$mItems}
                       </tbody>
        </table>";
	}
	#获取指定url的喜欢数目
	public function getlove(){
		$mXuehao = '201161469';	
		$getUrl = I('post.url');
		$getXuehao = array();
		preg_match('/.*\/(.*)\.\s*/i',$getUrl,$getXuehao);#从url中提取学号
		$loveMap = array('xuehao'=>$mXuehao);
		$loveMap = array('target'=>$getXuehao[1]);
		$isLove = (M('ext_xuanmei_canyu')->where($loveMap)->count() > 0);
		if($isLove)
			$mMylove = 'hong';
		else
			$mMylove = 'kong';
		
		$mMap = array('xuehao'=>$getXuehao[1]);
		$mRs = M('ext_xuanmei')->where($mMap)->getField('piaoshu');
		if(is_numeric($mRs) != 1) $mRs = 0;
		if($mMylove == 'kong') $mRs = '点击喜欢'; else $mRs .= '人';
		echo '<i class="fa fa-heart '.$mMylove.'"></i> ' . $mRs;
	}
	#喜欢+1
	public function loveinc(){
		$mXuehao = '201161469';
		$getUrl = I('post.url');
		$getXuehao = array();
		preg_match('/.*\/(.*)\.\s*/i',$getUrl,$getXuehao);#从url中提取学号
		$loveMap = array('xuehao'=>$mXuehao);
		$loveMap = array('target'=>$getXuehao[1]);
		$isLove = (M('ext_xuanmei_canyu')->where($loveMap)->count() > 0);		
		$mMap = array('xuehao'=>$getXuehao[1]);		
		($isLove) || (M('ext_xuanmei')->where($mMap)->setInc('piaoshu') && M('ext_xuanmei_canyu')->add(array('target'=>$getXuehao[1],'xuehao'=>$mXuehao,'create_time'=>time())));	#+1	
		$mRs = M('ext_xuanmei')->where($mMap)->getField('piaoshu');#查询		
		if($mRs)
			$mMylove = 'hong';
		else
			$mMylove = 'kong';
		
		if(is_numeric($mRs) != 1) $mRs = 0;
		if($mMylove == 'kong') $mRs = '点击喜欢'; else $mRs .= '人';
		echo '<i class="fa fa-heart '.$mMylove.'"></i> ' . $mRs;
	}
	#添加URL到选美
	private function addurl($pUrl,$pXuehao){
		$mMap = array(
					'xuehao'=>$pXuehao,					
					);
		$saveData = array(
					// 'urlcode'=>$pUrl,
					 'xuehao'=>$pXuehao,
					 'piaoshu'=>'0'
					);
		$mRs = M('ext_xuanmei')->field('xuehao')->where($mMap)->select();
		if(empty($mRs)){
			M('ext_xuanmei')->add($saveData);
		}
		
		
		
	}
	#根据学号获取图片路径
	private function getUrlByXuehao($pXuehao){		
		$mMap = array(
					'xuehao'=>$pXuehao,					
					);
		$mRs = M('ext_xuanmei')->where($mMap)->field('urlcode,show')->find();
		
		if($mRs['show'] == 2){ 
			$rUrl = 'http://7xlb4q.com1.z0.glb.clouddn.com/images/404.jpg';
		}else{
			$rUrl = $mRs['urlcode'];
		}
		
		return $rUrl;
	}
}