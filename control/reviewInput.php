<?php
function review($reviewForm){
$userName = $reviewForm['s6'];//person being reviewed
$revByUser = $reviewForm['s1'];//person doing the reviewing
$revTitle = $reviewForm['s2'];
$revPost = $reviewForm['s3'];
$recommend = $reviewForm['s4'];
$secCodeTxt = $reviewForm['s5'];
$passWord = str_replace("'","",$reviewForm['s7']);


	function __autoload($class_name) {
    	include '../classes/'.$class_name . '.php';
	}

include_once('../includes/connect.php');

	//decipher client side password
	$deCipherActionClient = new deCipherActionClient();
	$deCipherActionClient->decipherClient($passWord);
	$clientPassW = "'".$deCipherActionClient->unCodedClientPw."'";	
   
	$tableName = 'barter_users';
	//check to make sure the reviewer is in the system
	$confirmUserInfo = mysql_query("SELECT * FROM $tableName WHERE username= $revByUser AND secCode = $secCodeTxt") or die('X10');
		$confirmUserInfoArray = mysql_fetch_array($confirmUserInfo, MYSQL_NUM);
		
		//if the email is in the system continue on with the posting
		if($confirmUserInfoArray>0){
			
			//grab pw from server and decipher it
				$decipherAction = new decipherAction();
				$decipherAction->decipher($confirmUserInfoArray[3]);
				if($decipherAction->unCodedPw!='X10'){
					$serverPass = "'".$decipherAction->unCodedPw."'";
				}else{
					die('X10');//password could not be ciphered
				}
				
		//take client side pw and compare it to server side pw--if match then move on
		if($clientPassW==$serverPass){	
			
			$revByUserID = $confirmUserInfoArray[0];//reviewer's ID number
			//get the reviewee's ID number
			$confirmRevieweeInfo = mysql_query("SELECT * FROM $tableName WHERE username= $userName") or die('X10');
			$confirmRevieweeInfoArray = mysql_fetch_array($confirmRevieweeInfo, MYSQL_NUM);
			$userID = $confirmRevieweeInfoArray[0];
			
			//has this reviewee already left a review for this other user?
			$confirmMultipleRatings = mysql_query("SELECT * FROM barter_reviews WHERE reviewedBy_id = $revByUserID AND user_id = $userID") or die('X10');
			
			$confirmMultipleRatingsRows = mysql_num_rows($confirmMultipleRatings);
			
			if($confirmMultipleRatingsRows==0){//reviewee has not left a rating OR review for this user--continue as normal
								
								mysql_query("INSERT INTO barter_reviews (user_id, reviewedBy_id, reviewTitle, reviewPost, recommend, date_reviewed) VALUES ($userID, $revByUserID, $revTitle, $revPost, $recommend, CURDATE())") or die('X10');
								echo '1';
			}else{//the reviewee has left either a rating or a rating AND review--let's find out which one
				$confirmMultipleRatingsArray = mysql_fetch_array($confirmMultipleRatings, MYSQL_NUM);
				
				if($confirmMultipleRatingsArray[3]=='null' && $confirmMultipleRatingsArray[4]=='null'){//the reviewee has ONLY left a rating
					mysql_query("UPDATE barter_reviews SET reviewTitle=$revTitle, reviewPost=$revPost WHERE user_id=$userID AND reviewedBy_id = $revByUserID") or die('X10');
					echo '1';
				}else{//the reviewee has left a rating AND a review---hence they are denied
					echo 'X13';
				}
			}
		}
}else{//confirm user and email are in system
	echo 'X14';
}
}
?>

