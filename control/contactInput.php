<?php
function contact($contactForm){
	
function __autoload($class_name) {
    include '../classes/'.$class_name . '.php';
}

$email = $contactForm['e1'];
$message = $contactForm['s1'];							

$sendEmail = new sendEmail('contact', $email, NULL, NULL, NULL, NULL, NULL, 'feedback@zoofaroo.com', NULL, NULL, NULL, NULL, NULL, NULL, $message, NULL);
							
//if the message is sent successfully print "1". Otherwise print "X10"

echo $sendEmail->emailConfirm;
}
?>

