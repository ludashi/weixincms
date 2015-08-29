<?php

/**
 * 简单对称加密算法之加密
 * @param String $string 需要加密的字串
 * @param String $skey 加密EKY
 * @author Anyon Zou <zoujingli@qq.com>
 * @date 2013-08-13 19:30
 * @update 2014-10-10 10:10
 * @return String
 */
 function encode($string = '', $skey = 'by771699') {
    $strArr = str_split(base64_encode($string));
    $strCount = count($strArr);
    foreach (str_split($skey) as $key => $value)
        $key < $strCount && $strArr[$key].=$value;
    return str_replace(array('=', '+', '/'), array('O0O0O', 'o000o', 'oo00o'), join('', $strArr));
 }
 /**
 * 简单对称加密算法之解密
 * @param String $string 需要解密的字串
 * @param String $skey 解密KEY
 * @author Anyon Zou <zoujingli@qq.com>
 * @date 2013-08-13 19:30
 * @update 2014-10-10 10:10
 * @return String
 */
 function decode($string = '', $skey = 'by771699') {
    $strArr = str_split(str_replace(array('O0O0O', 'o000o', 'oo00o'), array('=', '+', '/'), $string), 2);
    $strCount = count($strArr);
    foreach (str_split($skey) as $key => $value)
        $key <= $strCount && $strArr[$key][1] === $value && $strArr[$key] = $strArr[$key][0];
    return base64_decode(join('', $strArr));
 }
#获取当前URL
function get_url() {
    $sys_protocal = isset($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == '443' ? 'https://' : 'http://';
    $php_self = $_SERVER['PHP_SELF'] ? $_SERVER['PHP_SELF'] : $_SERVER['SCRIPT_NAME'];
    $path_info = isset($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : '';
    $relate_url = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : $php_self.(isset($_SERVER['QUERY_STRING']) ? '?'.$_SERVER['QUERY_STRING'] : $path_info);
    return $sys_protocal.(isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : '').$relate_url;
 }

function get_wechat(){
	#先从get获取，并保存+返回
	$tWechat = I('get.wechat');	
	if(!empty($tWechat)){
		session(C('wechatlable'),$tWechat);			
		return $tWechat;
	}	
	#如果wechat么有，则从session获取
	$tWechat = session(C('wechatlable'));
	return $tWechat;
}
function get_userinfo($mRefreshToken,$mOpenid,$mAccessToken){
	#检测serssion(C('User'))是否有用户信息，有则直接返回
	$dataUser = session(C('Userlable'));
	if(!empty($dataUser)) return $dataUser;
	#查询是否没有用户信息且是否超过3天没更新，满足一条执行下面逻辑，否则记录到serssion(C('User'))
	$mMap['openid'] = C('openidlable');
	$dataUser = M('kz_follow')->where($mMap)->find();
	if(($dataUser['time'] + 259200) > time()){		
		return $dataUser;
	}
	
	#检测access_token是否可用
	$mUrl = "https://api.weixin.qq.com/sns/auth?access_token={$mAccessToken}&openid={$mOpenid}";
	$jsonData = file_get_contents($mUrl);
	$arrData = json_decode($jsonData,true);
	##var_dump($jsonData);
	
	#先获取当前公众号access_token
	if(!empty($jsonData['errcode'])){
		$mAppid = C('DSF_APPID');
		$mUrl = "https://api.weixin.qq.com/sns/oauth2/refresh_token?appid={$mAppid}&grant_type=refresh_token&refresh_token={$mRefreshToken}";
		$jsonData = file_get_contents($mUrl);
		$arrData = json_decode($jsonData,true);
		if(empty($jsonData['errcode'])) return null;	
		$mAccessToken = $arrData['access_token'];		
	}
	#拉取用户信息，更新或添加到数据库，并记录到serssion(C('User'))，并返回
	$mUrl = "https://api.weixin.qq.com/sns/userinfo?access_token={$mAccessToken}&openid={$mOpenid}";
	$jsonData = file_get_contents($mUrl);
	$arrData = json_decode($jsonData,true);
	#var_dump($arrData);
	if(!empty($jsonData['errcode'])){
		$mMap['wechat'] = C('wechat');
		$mMap['openid'] = $arrData['openid'];
		$mRs = M('kz_follow')->where($mMap)->find();
		$userData = array(
						'username'=>$arrData['nickname'],
						'face'=>$arrData['headimgurl'],
						'json'=>$jsonData,
					);
		if(!empty($mRs)){
			M('kz_follow')->where($mMap)->save($userData);
		}else{
			
			if(!empty($userData['face']) && !empty($userData['username'])){
			#var_dump($userData);
			$userData['wechat'] =  $mMap['wechat'];
			$userData['openid'] =  $arrData['openid'];			
			$userData['create_time'] = $userData['update_time'] = time();	
			M('kz_follow')->add($userData);
			}
		}
		$mRs = M('kz_follow')->where($mMap)->find();
		##var_dump(M('kz_follow')->getLastSql());		
		session(C('Userlable'),$mRs);
		return $mRs;
	}
}
function get_openid(){
	#先从session获取，如果有则返回
	$tOpenid = session(C('openidlable'));
	#session_destroy();
	#如果openid没有，则从OA获取,并保存在session
	if(empty($tOpenid)){
		$arrOpenid = OAuth2();		
		if(!empty($arrOpenid)){			
			##var_dump($tOpenid);
			session(C('openidlable'),$arrOpenid['openid']);	
			$tOpenid = $arrOpenid['openid'];
			
		}
	}
	#var_dump($tOpenid);
	return $tOpenid;
}
#从网络获取openid
function OAuth2(){
		$mAppid = C('DSF_APPID');
		$mSecret = C('DSF_SECRET');
		#检查登陆状态
		$ok=false;
		$jsonUserData = session(C('AUTH_LABLE'));
		if(!$ok && !empty($jsonUserData)) {
			$ok=true;				
		}
		$openid = cookie('openid');
		$access_token = cookie('access_token');
		$refresh_token = cookie('refresh_token');
		#从cookie获取数据，cookie保存一天
		if(!$ok && empty($jsonUserData) && !empty($openid) && !empty($access_token) && !empty($refresh_token)) {
			$jsonUserData = array();
			$jsonUserData['openid'] = $openid;
			$jsonUserData['access_token'] = $access_token;
			$jsonUserData['refresh_token'] = $refresh_token;
			$ok=true;		
		}
		#上一步失败，则获取code
		(!$ok) && $mCode = I('get.code');		
		((!$ok) && ((empty($mCode)) || (I('get.state') !== session('rand')))) || ($ok=true);
		if(!empty($mCode)){	
		if(I('get.state') !== session('rand')) $ok = false;		
		}
		
		#上一步失败，用户登陆
		if(!$ok){	
			
			$mRedirect_uri = get_url();
			$mRedirect_uri = UrlEncode($mRedirect_uri);
			$mRand = time().rand(0,100);
			session('rand',$mRand);
			$mUrl="https://open.weixin.qq.com/connect/oauth2/authorize?appid={$mAppid}&redirect_uri={$mRedirect_uri}&response_type=code&scope=snsapi_login&state={$mRand}#wechat_redirect";
			header('Location:'.$mUrl);
			return;
		}
		#获取openid
		$getUrl = "https://api.weixin.qq.com/sns/oauth2/access_token?appid={$mAppid}&secret={$mSecret}&code={$mCode}&grant_type=authorization_code";
		#读取用户数据
		if(empty($jsonUserData)) {
			$jsonUserData = file_get_contents($getUrl);
			$jsonUserData = json_decode($jsonUserData,true);
		}
		if(!get_userinfo($jsonUserData['refresh_token'],$jsonUserData['access_token'],$jsonUserData['openid'])) return null;
		#保存登陆状态，C('AUTH_LABLE')
		session(C('AUTH_LABLE'),$jsonUserData);
		cookie('openid',$jsonUserData['openid'],array('expire'=>86400,'prefix'=>'wp_'));
		cookie('access_token',$jsonUserData['access_token'],array('expire'=>86400,'prefix'=>'wp_'));
		cookie('refresh_token',$jsonUserData['refresh_token'],array('expire'=>86400,'prefix'=>'wp_'));
		#返回用户信息
		return $jsonUserData;
	}

	function accessToken_Test(){
		
	}
	function accessToken_Get(){
		
	}
?>