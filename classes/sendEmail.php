<?php
include_once('../includes/connect.php');

class sendEmail{
	public $emailConfirm;
	function __construct($kind, $userEmail, $userName, $password, $randKey, $userID, $ssSec, $replierEmail, $replierUsername, $postingDate, $catName, $title, $empty1, $empty2, $message, $postingTally){
	
						function addyCheck($emailAddy){
						$fetchSingleData = mysql_query("SELECT * FROM barter_users WHERE email=$emailAddy");
						$rows = mysql_num_rows($fetchSingleData);
							if($rows>0){
								return 'houstonMatch';
							}else{
								return 'nowayMatch';
							}
						}						
					
						
						if($kind=='contact'){
										///CONTACTING ZOOFAROO
										if(addyCheck($userEmail)=='houstonMatch' || $userEmail=="'abusereport@zoofaroo.com'"){
											$to = 'feedback@zoofaroo.com';
											$from = str_replace("'","",$userEmail);
											$fromname = str_replace("'","",$userEmail);
											$subject = 'ZooFaroo User Inquiry';
											$body = str_replace("'","",$message);
										}else{
											die('X10');
										}
						}else if($kind=='register'){
										///REGISTER
										$to = ''.str_replace("'","",$userEmail).'';
										$from = 'NoReply@ZooFaroo.com';
										$fromname = 'NoReply@ZooFaroo.com';
										$subject = 'ZooFaroo Registration';
										$body = 'Thank you for registering with ZooFaroo the online bartering community.<br/><br/>';
										$body .='Your username is:&nbsp;'.str_replace("'","",$userName).'<br/><br/>';
										$body .='Your password is:&nbsp;'.str_replace("'","",$password).'<br/><br/>';
										$body .='Please follow the link to activate your registration.<br/><br/>';
										$body .='If you do not visit this link, your registration will not be activated and you will not be able to submit postings or reply to postings.<br/><br/>';
										$body .='Visit this link to activate your account: www.zoofaroo.com/uactivation/'.str_replace("'","",$ssSec).'/'.str_replace("'","",$randKey).'.html<br/><br/>';
										$body .='(If you cannot click the above link you can always copy and paste it into your browser\'s address bar.)<br/><br/>';
										$body .='If you feel you are receiving this email in error, please contact ZooFaroo at feedback@zoofaroo.com<br/><br/>';
										$body .='ZooFaroo - Be social.  Trade local.<br/>';
										$body .='web:&nbsp;&nbsp;www.zoofaroo.com<br/>';
										$body .='email:&nbsp;&nbsp;feedback@zoofaroo.com<br/><br/>';
										$body .='Thank you for using ZooFaroo - Be social.  Trade local!';
						}else{
								
								if($kind=='reply'){
									if(addyCheck("'".$userEmail."'")=='houstonMatch'){//email found, ie, they are registered
										//REPLYING TO A POSTING
										$subject = 'ZooFaroo Posting Response';
										$body = 'ZooFaroo User: <b>'.str_replace("'","",$replierUsername).'</b> responded to your posting.<br/><br/>';
										$body .='Regarding your post on: <b>'.str_replace("'","",$postingDate).'</b><br/><br/>';
										$body .='Your Title: <b>'.str_replace("'","",$catName).'</b>--'.str_replace("'","",$title).'<br/><br/>';
										$body .='<b>'.str_replace("'","",$replierUsername).'</b>\'s Message: '.$message.'<br/><br/>';
										$body .='<b>'.str_replace("'","",$replierUsername).'</b>\'s Email: '.str_replace("'","",$replierEmail).'<br/><br/>';
										$body .='Please use the user\'s email above to respond to this inquiry.<br/><br/>';
										$body .='If you feel you are receiving this email in error, please contact ZooFaroo at feedback@zoofaroo.com<br/><br/>';
										$body .='To report abuse please forward this email to abuse@zoofaroo.com<br/><br/>';
										$body .='ZooFaroo - Be social.  Trade local.<br/>';
										$body .='web:&nbsp;&nbsp;www.zoofaroo.com<br/>';
										$body .='email:&nbsp;&nbsp;feedback@zoofaroo.com<br/><br/>';
										$body .='Thank you for using ZooFaroo - Be social.  Trade local!';
									}else{
										die('X10');//sender's email was not found on the server
									}
								}else if($kind=='emailShare'){
									if(addyCheck("'".$userEmail."'")=='houstonMatch'){//email found, ie, they are registered
										///SHARING A POSTING
										$subject = ''.str_replace("'","",$replierEmail).' shared a ZooFaroo posting with you';
										$body = ''.str_replace("'","",$replierEmail).' thought you would be interested in this posting on ZooFaroo.<br/><br/>';
										$body .= ''.str_replace("'","",$message).'';
										$body .= '<br/><br/>What is ZooFaroo?  It\'s only the best barter community on the web!  Check it out by following the link above.<br/><br/>';
										$body .='If you feel you are receiving this email in error, please contact ZooFaroo at feedback@zoofaroo.com<br/><br/>';
										$body .='ZooFaroo - Be social.  Trade local.<br/>';
										$body .='web:&nbsp;&nbsp;www.zoofaroo.com<br/>';
										$body .='email:&nbsp;&nbsp;feedback@zoofaroo.com<br/><br/>';
										$body .='Thank you for using ZooFaroo - Be social.  Trade local!';
									}else{
										die('X10');//sender's email was not found on the server
									}
								}else if($kind=='forgot'){
										///FORGOT
										if(addyCheck($userEmail)=='houstonMatch'){
										$subject = 'ZooFaroo Password Request';
										$body .='Dear '.str_replace("'","",$userEmail).'<br/><br/>';
										$body .='You are receiving this email because you have requested your ZooFaroo password.<br/><br/>';
										$body .='Your password is: '.str_replace("'","",$password).'<br/><br/>';
										$body .='Please let us know if we can be of further assistance. Thank you for choosing ZooFaroo!<br/><br/>';
										$body .='If you feel you are receiving this email in error, please contact ZooFaroo at feedback@zoofaroo.com<br/><br/>';
										$body .='ZooFaroo - Be social.  Trade local.<br/>';
										$body .='web:&nbsp;&nbsp;www.zoofaroo.com<br/>';
										$body .='email:&nbsp;&nbsp;feedback@zoofaroo.com<br/><br/>';
										$body .='Thank you for using ZooFaroo - Be social.  Trade local!';
										}else{
										die('X10');//sender's email was not found on the server
									}
								}else if($kind=='edit'){
										///EDITING THE USER'S ACCOUNT INFO
										if(addyCheck("'".$userEmail."'")=='houstonMatch'){
										$subject = 'ZooFaroo Account Update';
										$body .='Dear '.str_replace("'","",$userEmail).'<br/><br/>';
										$body .='You are receiving this email because you have recently updated your user account information.<br/><br/>';
										$body .='If you have not recently updated your account or feel you are receiving this email in error please contact ZooFaroo at feedback@zoofaroo.com<br/><br/>';
										$body .='Let us know if we can be of further assistance. Thank you for choosing ZooFaroo!<br/><br/>';
										$body .='ZooFaroo - Be social.  Trade local.<br/>';
										$body .='web:&nbsp;&nbsp;www.zoofaroo.com<br/>';
										$body .='email:&nbsp;&nbsp;feedback@zoofaroo.com<br/><br/>';
										$body .='Thank you for using ZooFaroo - Be social.  Trade local!';
										}else{
										die('X10');//sender's email was not found on the server
									}
								}else if($kind=='posting'){
										///LEAVE POSTING
										if(addyCheck("'".$userEmail."'")=='houstonMatch'){
										$subject = 'ZooFaroo Posting';
										$body = 'Thank you for leaving '.str_replace("'","",$postingTally).' post(s) on ZooFaroo the online bartering site.<br/><br/>';
										$body .='For your posting(s) to become active you must click on the link below.<br/><br/>';
										$body .='If you do not visit this link, your posting will not be activated and will not be seen by the public.<br/><br/>';
										$body .='Visit this link to activate your posting: http://www.zoofaroo.com/pactivation/'.str_replace("'","",$userID).'/'.str_replace("'","",$ssSec).'/'.str_replace("'","",$postingTally).'.html<br/><br/>';
										$body .='(If you cannot click the above link you can always copy and paste it into your browser\'s address bar.)<br/><br/>';
										$body .='If you feel you are receiving this email in error, please contact ZooFaroo at feedback@zoofaroo.com<br/><br/>';
										$body .='ZooFaroo - Be social.  Trade local.<br/>';
										$body .='web:&nbsp;&nbsp;www.zoofaroo.com<br/>';
										$body .='email:&nbsp;&nbsp;feedback@zoofaroo.com<br/><br/>';
										$body .='Thank you for using ZooFaroo - Be social.  Trade local!';
										}else{
										die('X10');//sender's email was not found on the server
									}
								}
									
									$to = ''.str_replace("'","",$userEmail).'';
									$from = 'NoReply@ZooFaroo.com';
									$fromname = 'NoReply@ZooFaroo.com';
							}
							
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
							
							//if the message is sent successfully "1". Otherwise "X10"
							$this->emailConfirm = $mail_sent ? "1" : "X10";
	}//construct
	
}//sendEmail
?>