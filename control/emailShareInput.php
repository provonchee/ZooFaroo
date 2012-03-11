<?php
function emailShare($emailShareForm){

$senderEmail = $emailShareForm['e1'];
$senderPassWord = $emailShareForm['s1'];
$recipientEmail = $emailShareForm['e2'];


$oC = $emailShareForm['s2'];
$oT = $emailShareForm['s3'];
$nC = $emailShareForm['s4'];
$nT = $emailShareForm['s5'];
$urlLink = $emailShareForm['u1'];

$urlLinkCheck = strpos($urlLink, 'http://www.zoofaroo.com/');
if ($urlLinkCheck === false) {
	die('X10');
}

$message = "<b>Offer Category:</b>".$oC."<br/><b>Offer Title:</b>".$oT."<br/><br/><b>Need Category:</b>".$nC."<br/><b>Need Title:</b>".$nT."<br/><br/><b>Link:</b>".$urlLink."";	
	
function __autoload($class_name) {
    include '../classes/'.$class_name . '.php';
}

$senderPassWordCheck = new singleCheck($senderEmail, 'email');//checks server for sender's password--to see if they are registered
if($senderPassWordCheck->singleMatchResult=='houstonMatch'){
	
	$decipherAction = new decipherAction();
	$decipherAction->decipher($senderPassWordCheck->singleResults[3]);
	$retreivedPW = $decipherAction->unCodedPw;
	
	if($retreivedPW==$senderPassWord){
			$sendEmail = new sendEmail('emailShare', $recipientEmail, NULL, NULL, NULL, NULL, NULL, $senderEmail, NULL, NULL, NULL, NULL, NULL, NULL, $message, NULL);
			//if the message is sent successfully print "0". Otherwise print "1" 
			echo $sendEmail->emailConfirm;
	}else{
	die('X11');	
	}
	
}else{
	die('X11');	
}							
}
?>