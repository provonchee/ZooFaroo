<?php
function forget($forgetForm){

function __autoload($class_name) {
    include '../classes/'.$class_name . '.php';
}

$user = $forgetForm['s1'];
$email = $forgetForm['e1'];


$fetchSingleData = mysql_query("SELECT * FROM barter_users WHERE username=$user") or die('X10');
$rowsNum = mysql_num_rows($fetchSingleData);
$fetchSingleDataArray = mysql_fetch_array($fetchSingleData);
if($rowsNum>0){
	if($email=="'".$fetchSingleDataArray[1]."'"){
	$decipherAction = new decipherAction();
	$decipherAction->decipher($fetchSingleDataArray[3]);
	$retreivedPW = $decipherAction->unCodedPw;
	$retreivedEmail = $fetchSingleDataArray[1];
	$sendEmail = new sendEmail('forgot', $email, $user, $retreivedPW, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
							
		//if the message is sent successfully print "1". Otherwise print "X10" 
		echo $sendEmail->emailConfirm;
	}else{
		echo 'X11';
	}
}else{
	echo 'X12';
}
}
?>

