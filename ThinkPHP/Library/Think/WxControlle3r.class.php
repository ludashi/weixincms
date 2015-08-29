<?php
namespace Think;
class WxController extends Controller {
	protected $mWechat = null;
	private $errorMsg = null;
    public function _initialize(){
		#加载配置文件
		#加载home文件
		
		#添加配置
		/*
		$arrayConfig =  array(
						'sh'=>1,#默认开启审核
						'index_head_img'=>__ROOT__.'/Public/Images/539bd726ce73d.jpg',#首页顶部通栏图片
						'wechat_allow'=>'cesiopenid',#允许投票的公众号ID
						'secret'=>'cesisecret',#允许投票的公众号ID
						);
		
		$insertData = array(
						'wechat'=>'cesiopenid',
						'config'=>serialize($arrayConfig),
					  );
		M('config')->add($insertData);
		*/
		$this->mWechat = getWeChat();
		$this->mOpenid = getOpenid();		
		empty($this->mWechat) && $this->error('公众号没有找到');	
		$mMap = array(
					'wechat'=>$this->mWechat
				);
		#获取公众号配置
		$mRs = M('config')->where($mMap)->find();	
		(empty($mRs)) && $this->error('公众号信息丢失，请关闭重新进入页面');
		$tArrayConfig = unserialize($mRs['config']);
		/*
		#打印当前配置		
		unset($tArrayConfig['wechat_allow']);
		$tArrayConfig['appid'] = 'appid';
		$tArrayConfig['piao1'] = 1;	#一天给一人投票
		$tArrayConfig['piao2'] = 5; #一天共投票		
		$mRs = M('config')->where($mMap)->save(array('config'=>serialize($tArrayConfig)));		
		*/
		#var_dump($tArrayConfig);
		#die();
		#进入投票程序
		#判断是否是第一次点击
		$oneClick = session('onclick');
		if($oneClick != 1){
			#点击次数+1,记录浏览
			M('config')->where($mMap)->setInc('dianji');
			session('onclick','1');
		}
		#加入数据库信息到配置
		C('zcname',$mRs['zcname']);#投票主场名称
		C('openid',$this->mOpenid);#投票主场名称
		C('wechat',$mRs['wechat']);#投票主场微信号
		C('baoming',$mRs['baoming']);#报名人数
		C('toupiao',$mRs['toupiao']);#投票人数
		C('dianji',$mRs['dianji']);#点击次数
		C('access_token',$mRs['access_token']);#token_get_all
		C('expires_end',$mRs['expires_end']);#token过期时间
		$this->mUsername = $mRs['username'];#用户登录用
		$this->mPassword = $mRs['password'];#用户登录用
		$this->mToken = $mRs['token'];#用户登录用
		foreach($tArrayConfig as $pKey=>$pValue){
			C($pKey,$pValue);
		}
		#request
		$tArrRequest = I();
		if(!empty($tArrRequest['p'])) unset($tArrRequest['p']);
		if(!empty($tArrRequest['ss'])) unset($tArrRequest['ss']);
		#模板变量
		$this->assign('zcname',$mRs['zcname']);
		$this->assign('baoming',$mRs['baoming']);
		$this->assign('toupiao',$mRs['toupiao']);
		$this->assign('dianji',$mRs['dianji']);
		$this->assign('title',$mRs['最美老板娘评选']);
		$this->assign('arrRequest',$tArrRequest);
		$this->assign('wxPage',C('wxpage'));
		$this->assign('title',C('hdtitle'));
    }
	public function checkOpenid(){
		
		if(!C('openid')) return false;
		#查找数据库看看是否存在
		$mMap = array(
						'openid'=>C('openid'),
						'wechat'=>C('wechat'),
						);
		
		$countFollow = implode(M('follow')->where($mMap)->field('count(openid)')->find());
		#存在验证通过
		if($countFollow > 0) return true;
		
		#检测用户openid是否存在
		$mWechat = new WeChat;
		
		if($mWechat->getAccessToken($this->mWechat)){		
			if($mWechat->checkOpenid($this->mOpenid))
			return true;	
		}
	
		$this->errorMsg = $mWechat->getError();		
		return false;
	
	}
	public function UPDATEUSERDATA(){
		
		#更新用户信息
		$modelFollow = M('follow');
		$mWechat = new WeChat;
		$mFollows = $modelFollow->select();
		foreach($mFollows as $fFollow){
			if($mWechat->getAccessToken($this->mWechat)){		
				$mWechat->checkOpenid($fFollow['openid']);
			
			}
		}
	}
}