<?php
namespace Addon;

class Tests {
	private $mWechat = null;
	private $mData = null;
	public function __construct($wechat,$data){
		if(empty($wechat) || empty($data)){
			echo '
<?xml version="1.0"?>
<xml>
    <ToUserName>
        <![CDATA[aaa]]>
    </ToUserName>
    <FromUserName>
        <![CDATA[gh_9b97a51160aa]]>
    </FromUserName>
    <CreateTime>1440473265</CreateTime>
    <MsgType>
        <![CDATA[text]]>
    </MsgType>
    <Content>
        <![CDATA[扩展程序有误，请联系17771615219提供技术支持]]>
    </Content>
</xml>';
		die();
		}
		$this->mWechat = $wechat;
		$this->mData = $data;
	}
	public function echodata($data){
		$this->mWechat->replyText('状态：恭喜您扩展测试可用'. PHP_EOL .'技术支持：'. PHP_EOL .'<a href="http://www.jztmkj.com" >荆州天明科技有限公司</a>' . PHP_EOL . 'echo' . $data['echo'] . PHP_EOL . '数据：' .$data['data']);
	}
}

?>