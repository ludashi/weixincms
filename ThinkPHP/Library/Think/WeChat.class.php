<?php
namespace Think;
class WeChat{
	#api_url
	protected $_url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=[APPID]&secret=[APPSECRET]';
	#ACCESS_TOKEN
	protected $_accesstoken = '';
	#错误信息
	private $_ErrorMsg = null;
	public function getAccessToken($pWechat = ''){
		if(empty($pWechat)) return false;
		#OK默认为真实
		$ok = true;
		$tAccess_token = C('access_token');
		$tExpires_end = C('expires_end');
		#检查数据库是否存在ACCESS_TOKEN,$ok=true;		
		if($ok)
			$ok = $ok & (!empty($tAccess_token));			
		#检查时间是否已经超时失效,$ok=true;		
		if($ok)
			$ok = $ok & ($tExpires_end >= time());	
	
		#检查ACCESS_TOKEN是否可用,$ok=true;
		if($ok)
			$ok = $ok & ($this->check_access_token($tAccess_token));	
		#如果以上检查失败,重新获取	
		
		if(!$ok){
			$this->_accesstoken=$this->get_access_token();
		}else{
			$this->_accesstoken =$tAccess_token;
		}
		return $this->_accesstoken;
	}
	#通过获取服务器IP来测试access_token是否可用	
	private function check_access_token($pAccessToken){
		$mUrl = 'https://api.weixin.qq.com/cgi-bin/getcallbackip?access_token=[ACCESS_TOKEN]';
		$mUrl = str_replace('[ACCESS_TOKEN]',$pAccessToken,$mUrl);
		$rbCode = json_decode(file_get_contents($mUrl),1);
		$mErrcode = array(
					 '40001',#错误token
					 '42001',#失效token
					 '41001' #没有token
					 );
	
		if(isset($rbCode['errcode']) && in_array($rbCode['errcode'],$mErrcode)){
			return false;
		}else{
			return true;
		}
	}
	#获取access_token
	private function get_access_token(){		
		$mUrl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=[APPID]&secret=[APPSECRET]';
		$mUrl = str_replace(
						array('[APPID]','[APPSECRET]'),
						array(C('appid'),C('secret')),
						$mUrl);		
		$rbCode = json_decode(curlGet($mUrl),1);
		if(isset($rbCode['errcode'])){
			$this->setError($rbCode['errmsg']);
			return false;
		}
		
		if(isset($rbCode['access_token']) && isset($rbCode['expires_in'])){
			$memberUpdateData['access_token'] = $rbCode['access_token'];
			$memberUpdateData['expires_end'] = time() + $rbCode['expires_in'];
			$mMap['wechat'] = C('wechat');
			#存储token
			$objectConfig = M('config')->where($mMap);
			$objectConfig->save($memberUpdateData);
			//var_dump($objectConfig->getLastSql());
		}
		C('access_token',$rbCode['access_token']);
		return $rbCode['access_token'];
	}
	#检测openid是否是本平台用户
	public function checkOpenid($pOpenid,$pUpdate = false){
		$mUrl = 'https://api.weixin.qq.com/cgi-bin/user/info?access_token=[ACCESS_TOKEN]&openid=[OPENID]&lang=zh_CN';
		$mUrl = str_replace(array('[ACCESS_TOKEN]','[OPENID]'),array(C('access_token'),$pOpenid),$mUrl);
		$rbCode = json_decode(curlGet($mUrl),1);		
		if(!empty($rbCode['subscribe']) && $rbCode['subscribe'] == 1){
			#粉丝模型
			$modelFollow = M('follow');
			$mMap = array(
						'openid'=>$rbCode['openid'],
						'wechat'=>C('wechat'),
						);
			$rbCode['wechat'] = C('wechat');
			$countFollow = implode($modelFollow->where($mMap)->field('count(openid)')->find());
			if(!$countFollow){
				$modelFollow->add($rbCode);
			}elseif($pUpdate){
				$modelFollow->update($rbCode);
			}
			return  $rbCode;
		}else{
			return false;
		}
		
	}
	#设置错误
	public function setError($pErrorMsg= ''){
		$this->_ErrorMsg = $pErrorMsg;
	}
	#获取错误
	public function getError(){
		return $this->_ErrorMsg;
	}
}


?>