<?php
function confirm($confirmForm){
	
function __autoload($class_name) {
    include '../classes/'.$class_name . '.php';
}

$message = $confirmForm['s1'];

$to = 'feedback@zoofaroo.com';
$from = 'feedback@zoofaroo.com';;
$fromname = 'feedback@zoofaroo.com';
$subject = 'ZooFaroo User Confirmation';
$body = str_replace("'","",$message);
$to = 'feedback@zoofaroo.com';
$from = 'NoReply@ZooFaroo.com';
$fromname = 'NoReply@ZooFaroo.com';
					
$headers = "Date: ".date('r')."\n";
$headers .= "Return-Path: ".str_replace("'","",$from)."\n";
$headers .= "From: ".str_replace("'","",$fromname)."\n";
$headers .= "Message-ID: <".md5(uniqid(time()))."@zoofaroo.com>\n";
$headers .= "X-Priority: 3\n";
$headers .= "MIME-Version: 1.0\n";
$headers .= "Content-Transfer-Encoding: 8bit\n";
$headers .= 'Content-Type: text/html; charset="iso-8859-1"'."\n";

$body = stripslashes($body);

$mail_sent = @mail( $to, $subject, $body, $headers );

}
?>