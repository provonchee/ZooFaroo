<?php
function edit($editForm){
	
	$kind = str_replace("'", "", $editForm['d2']);//remove the quotes that formValidate added
	
	function __autoload($class_name) {
    	include '../classes/'.$class_name . '.php';
	}

	//cipher the new pw
	function cipher($cpw){
		$cipherAction = new cipherAction();
		$cipherAction->cipher($cpw);
				if($cipherAction->codedPw!='X10'){
					$cpw = "'".$cipherAction->codedPw."'";
					return $cpw;
				}else{
					die('X10');//password could not be ciphered
				}	
	}
	//decipher pw from server
	function decipher($dpw){
		$decipherAction = new decipherAction();
		$decipherAction->decipher($dpw);
				if($decipherAction->unCodedPw!='X10'){
					$dpw = "'".$decipherAction->unCodedPw."'";
					return $dpw;
				}else{
					die('X10');//password could not be ciphered
				}	
	}
	
	include_once('../includes/connect.php');
	
	$userN = $editForm['s2'];
	$passW = str_replace("'", "", $editForm['s3']);//original password
	$ssSec = $editForm['s4'];
	
	$specificPostingStateID = $editForm['i2'];
	
	//decipher client side pw
	$deCipherActionClient = new deCipherActionClient();
	$deCipherActionClient->decipherClient($passW);
	$passW = $deCipherActionClient->unCodedClientPw;
	$passW = $passW;
	
	//check to make sure their username and password is in the system
	$fetchUserInfo = mysql_query("SELECT * FROM barter_users WHERE username=$userN AND secCode=$ssSec") or die('X10');// || username='$userNold' AND password='$passWold'

		$fetchUserInfoArray = mysql_fetch_array($fetchUserInfo, MYSQL_NUM);
		//if the username and password is in the system continue on with the posting
		if($fetchUserInfoArray>0){
					
		$userID = $fetchUserInfoArray[0];
		$retreivedPW = $fetchUserInfoArray[3];
		$emailOriginal = $fetchUserInfoArray[1];
		//grab the coded pw from teh db and decode it to compare to the submitted pw
		//we do it this way because we cannot encode a pw and compare it to an earlier encoded pw

				$decipherPW = decipher($retreivedPW);//mysql ready psw
				
				$retreivedPWuncoded =  str_replace("'", "", $decipherPW);//this is the coded password sans quotes that should be checked against $passW
			 		
	if($passW==$retreivedPWuncoded){//if the pw from the server matched the submitted pw, go ahead and let the user proceed
	
	if($kind=="editPost"){
	/////EDIT POST/////////
	$postID = $editForm['i1'];
	$photosArray = array();
	$theArray =$editForm['0'];
	
	$oGSW = $theArray['s1'];
	$oCat = $theArray['s2'];
	$oTitle = $theArray['s3'];
	$oPost = $theArray['s4'];
	$oEmail = $theArray['s5'];
	$photosArray=$theArray['s6'];
	$oMoney = $theArray['s7'];
	
	$whichKind = $theArray['s9'];
	
	$tableName = 'barter_'.$whichKind.'ed';
	
	$oCat = "'".$oCat."'";
	$oTitle = "'".$oTitle."'";
	$oPost = "'".$oPost."'";
	$nPost = "'".$nPost."'";
	$oGSW = "'".$oGSW."'";
	$oEmail = "'".$oEmail."'";
	$oMoney = "'".$oMoney."'";
	
	
	
	if($photosArray=='2'){
		
		mysql_query("UPDATE $tableName SET category_id=$oCat, title=$oTitle, posting=$oPost, GSW=$oGSW, emailNotes=$oEmail, money=$oMoney WHERE posting_id=$postID") or die('X10');
		
	}else if($photosArray=='1'){
		
		mysql_query("UPDATE $tableName SET category_id=$oCat, title=$oTitle, posting=$oPost, GSW=$oGSW, emailNotes=$oEmail, photoLocale=1, money=$oMoney WHERE posting_id=$postID") or die('X10');
		
	}else{
		$photo = array($photosArray);
		$photoCommit = new photoCommitAction();
		$photoCommit->photoCommit($userID, $specificPostingStateID, $photo);
		$photo  = $photoCommit->updatedPhoto;
		$newPhoto = $photo[0];
		echo $newPhoto;
		mysql_query("UPDATE $tableName SET category_id=$oCat, title=$oTitle, posting=$oPost, GSW=$oGSW, emailNotes=$oEmail, photoLocale=$newPhoto, money=$oMoney WHERE posting_id=$postID") or die('X10');

	}
	
	echo $photosArray;
	
	}else{
	
		if($kind=='deletePost'){
			
				$tablename = 'barter_'.str_replace("'","",$editForm['s5']).'ed';
				$postID = "'".$editForm['i1']."'";
				
				mysql_query("DELETE from barter_connections WHERE posting_id = $postID AND (user_id=$userID OR connected_to = $userID)") or die('X10');
				mysql_query("DELETE from $tablename WHERE posting_id = $postID AND user_id=$userID") or die('X10');
				echo '1';
		}else if($kind=='editAccount'){
			
			$passWold = str_replace("'", "", $editForm['s3']);
			$ssSec = $editForm['s4'];
			$passWnew = str_replace("'", "", $editForm['s5']);
	
			if($passWold==$passWnew){//the user has not changed their password
				//use the decipher origianl pw from above
				$newPWuncoded = $passW;
			}else{
				$newPWuncoded = $passWnew;//user did change their password
			}
			
			//take pw (whether it's new or original) and code it for server side
				$newPW = cipher($newPWuncoded);
					
				$email = $editForm['e1'];
				$city = $editForm['s1'];
				$state = $editForm['i1'];
				$business = $editForm['i2'];
				$businessName = $editForm['s6'];
				$facebook = $editForm['u1'];
				$twitter = $editForm['u2'];
				$google = $editForm['u3'];
				$linkedin = $editForm['u4'];
				$url = $editForm['u5'];
				mysql_query("UPDATE barter_users SET email=$email, password=$newPW, city=$city, state=$state, business=$business, facebook=$facebook, twitter=$twitter, google=$google, linkedin=$linkedin, url=$url, businessName=$businessName WHERE username=$userN AND secCode=$ssSec") or die('X10');
				
				//send back the client side coded version of the new password
				$cipherActionClient = new cipherActionClient();
				$cipherActionClient->cipherClient($newPWuncoded);
				$clientSidePW = $cipherActionClient->codedClientPw;
				
				//sends a confirmation email to registered user
				$sendEmail = new sendEmail('edit', $emailOriginal, $username, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
				echo json_encode($editForm);
				
		}else if($kind=='deleteAccount'){
			
			
			$accountPostings = mysql_query("DELETE connections.*
										FROM barter_connections AS connections
										WHERE (connections.user_id = $userID OR connections.connected_to = $userID)") or die('X10');
										
			$accountPostings = mysql_query("DELETE offered.*
										FROM barter_offered AS offered
										WHERE offered.user_id = $userID") or die('X10');
										
			$accountPostings = mysql_query("DELETE needed.*
										FROM barter_needed AS needed
										WHERE needed.user_id = $userID") or die('X10');
										
			$accountPostings = mysql_query("DELETE reviews.*
										FROM barter_reviews AS reviews
										WHERE (reviews.user_id = $userID OR reviews.reviewedBy_id = $userID)") or die('X10');
										
			$accountPostings = mysql_query("DELETE users.*
										FROM barter_users AS users
										WHERE users.user_id = $userID AND password=$retreivedPW") or die('X10');
				echo '1';
		
		}else{//kind conditional
			die('X10');
		}
	
	}//edit post conditional
	
		}else{//if pw doesn't match
			die('X10');
		}
		
	}else{//fetchUserInfoArray
	die('X10');
	}
}
?>

