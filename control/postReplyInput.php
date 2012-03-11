<?php
function postReply($postReplyForm){//cleansed array is passed
	
	include('../includes/connect.php');
	
	function __autoload($class_name) {
		include '../classes/'.$class_name . '.php';
	}
	
	$postingID = $postReplyForm['i1'];
	$replierUsername =  $postReplyForm['s1'];
	$message = stripslashes($postReplyForm['s2']);//strip slashes because this is an email being sent
	$secCodeTxt = $postReplyForm['s3'];
	$offerOrNeed = str_replace("'","", $postReplyForm['s4']);
	$passWord = str_replace("'","", $postReplyForm['s5']);
	
	if($offerOrNeed=='Offered'){
		$tableName='barter_offered';
		$joinName = 'offered';
	}else if($offerOrNeed=='Needed'){
		$tableName='barter_needed';
		$joinName = 'needed';
	}
		
$fetchPosterData = mysql_query("SELECT user.username, user.user_id, user.email, $joinName.posting_date, cat.category, $joinName.title
							 FROM $tableName AS $joinName 
							 INNER JOIN barter_users AS user 
							 ON user.user_id = $joinName.user_id 
							 INNER JOIN barter_categories AS cat 
							 ON cat.category_id = $joinName.category_id
							 WHERE $joinName.posting_id = $postingID");

$fetchPosterDataRow = mysql_fetch_array($fetchPosterData, MYSQL_NUM);

  $posterUserName= $fetchPosterDataRow[0];
  $posterUserID= $fetchPosterDataRow[1];
  $posterEmail= $fetchPosterDataRow[2];
  $postingDate= $fetchPosterDataRow[3];
	$categoryName = $fetchPosterDataRow[4];
  	$title = $fetchPosterDataRow[5];
 
	//decipher client side password
	$deCipherActionClient = new deCipherActionClient();
	$deCipherActionClient->decipherClient($passWord);
	$clientPassW = "'".$deCipherActionClient->unCodedClientPw."'";
	
	//check to make sure replier's email address is in the system
	$fetchReplierInfo = mysql_query("SELECT * FROM barter_users WHERE username = $replierUsername AND secCode = $secCodeTxt") or die('X10');
	
		$fetchReplierInfoArray = mysql_fetch_array($fetchReplierInfo, MYSQL_NUM);
		//if the email is in the system continue on with the reply
			if($fetchReplierInfoArray>0 && $message!=''){
				
				//grab pw from server and decipher it
				$decipherAction = new decipherAction();
				$decipherAction->decipher($fetchReplierInfoArray[3]);
				if($decipherAction->unCodedPw!='X10'){
					$serverPass = "'".$decipherAction->unCodedPw."'";
				}else{
					die('X10');//password could not be ciphered
				}
				
		//take client side pw and compare it to server side pw--if match then move on
		if($clientPassW==$serverPass){	
				
				$replierEmailAddy = $fetchReplierInfoArray[1];
				$replierUserID = $fetchReplierInfoArray[0];
				
				//check to make sure that have not replied to this user's post more than two times
				$fetchConnections = mysql_query("SELECT times_connected FROM barter_connections WHERE user_id = '$replierUserID'  AND posting_id = $postingID  AND connected_to = $posterUserID") or die('X10');
				$fetchConnectionsArray = mysql_fetch_array($fetchConnections, MYSQL_NUM);
				
				if($fetchConnectionsArray[0]<2){//okay to continue
				
							//sends a confirmation email to registered user
							$sendEmail = new sendEmail('reply', $posterEmail, NULL, NULL, NULL, NULL, NULL, $replierEmailAddy, $replierUsername, $postingDate, $categoryName, $title, NULL, NULL, $message, NULL);
								
							//if email is successful this records the connection on the times_connected DB 
							if($sendEmail->emailConfirm=='1'){
								if($fetchConnectionsArray[0]==1){
									$times_connected = 2;
									mysql_query("UPDATE barter_connections SET times_connected='$times_connected' WHERE user_id = '$replierUserID' AND posting_id = $postingID AND connected_to = '$posterUserID'") or die('X10');
								}else{
									$times_connected = 1;
									mysql_query("INSERT INTO barter_connections (user_id, posting_id, connected_to, date_connected, times_connected) VALUES ('$replierUserID', $postingID, '$posterUserID', CURDATE(), '$times_connected')") or die('X10');
								}
								//if the message is sent successfully
								echo $sendEmail->emailConfirm;
								
							}else{//email was not successful
								echo 'X10';
							}
							
				}else if($fetchConnectionsArray[0]>=2){//they've already contacted this user twice regarding this post--they're cut off
					echo 'X12';
				}
		}
			}else{
				//the replier's username/ssSec combo is not in the system--denies sending of email
				echo 'X10';
			}
}
?>