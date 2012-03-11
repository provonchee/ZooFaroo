<?php
function post($postForm){
	
	function __autoload($class_name) {
    	include '../classes/'.$class_name . '.php';
	}

	$postingTally = $postForm['i1'];

	$cityID = $postForm['i3'];
	$stateID = $postForm['i2'];
	
	$specificLocale = $postForm['s4'];
	
	$userN = $postForm['s1'];
	$passW = str_replace("'", "", $postForm['s2']);
	$ssSec = $postForm['s3'];
	
	$oArray = array();
	$nArray = array();
	$oArray = $postForm['0'];
	$nArray = $postForm['1'];
		
	$o=0;
	$n=0;
	
		$offerGSW = array();
		$offerCategoryID = array();
		$offerTitle = array();
		$offerPosting = array();
		$offerEmailNotes = array();
		$offerPhotosArray = array();
		$offerMoney = array();
		
		$needGSW = array();
		$needCategoryID = array();
		$needTitle = array();
		$needPosting = array();
		$needEmailNotes = array();
		$needPhotosArray = array();
		$needMoney = array();
	
	for($o=0; $o<count($oArray['a1']); $o++) {
		array_push($offerGSW, $oArray['a1'][$o]);
		array_push($offerCategoryID, $oArray['a2'][$o]);
		array_push($offerTitle, $oArray['a3'][$o]);
		array_push($offerPosting, $oArray['a4'][$o]);
		array_push($offerEmailNotes, $oArray['a5'][$o]);
		array_push($offerPhotosArray, $oArray['a6'][$o]);
		array_push($offerMoney, $oArray['a7'][$o]);
		
		$offerGSW[$o] = "'".$offerGSW[$o]."'";
		$offerCategoryID[$o] = "'".$offerCategoryID[$o]."'";
		$offerTitle[$o] = "'".$offerTitle[$o]."'";
		$offerPosting[$o] = "'".$offerPosting[$o]."'";
		$offerEmailNotes[$o] = "'".$offerEmailNotes[$o]."'";
		$offerPhotosArray[$o] = "'".$offerPhotosArray[$o]."'";
		$offerMoney[$o] = "'".$offerMoney[$o]."'";
		
	}
	
for($n=0; $n<count($nArray['a1']); $n++) {
		array_push($needGSW, $nArray['a1'][$n]);
		array_push($needCategoryID, $nArray['a2'][$n]);
		array_push($needTitle, $nArray['a3'][$n]);
		array_push($needPosting, $nArray['a4'][$n]);
		array_push($needEmailNotes, $nArray['a5'][$n]);
		array_push($needPhotosArray, 'null');
		array_push($needMoney, $nArray['a7'][$n]);
		
		$needGSW[$n] = "'".$needGSW[$n]."'";
		$needCategoryID[$n] = "'".$needCategoryID[$n]."'";
		$needTitle[$n] = "'".$needTitle[$n]."'";
		$needPosting[$n] = "'".$needPosting[$n]."'";
		$needEmailNotes[$n] = "'".$needEmailNotes[$n]."'";
		$needPhotosArray[$n] = "'".$needPhotosArray[$n]."'";
		$needMoney[$n] = "'".$needMoney[$n]."'";
	}
	
	
	include_once('../includes/connect.php');
	
	//decipher client side password
	$deCipherActionClient = new deCipherActionClient();
	$deCipherActionClient->decipherClient($passW);
	$clientPassW = "'".$deCipherActionClient->unCodedClientPw."'";	
	
	//check to make sure their username and password is in the system
	$fetchUserInfo = mysql_query("SELECT * FROM barter_users WHERE username = $userN AND secCode = $ssSec") or die('X10');
		$fetchUserInfoArray = mysql_fetch_array($fetchUserInfo, MYSQL_NUM);
		//if the username and password is in the system continue on with the posting
			if($fetchUserInfoArray>0){
				//grab pw from server and decipher it
				$decipherAction = new decipherAction();
				$decipherAction->decipher($fetchUserInfoArray[3]);
				if($decipherAction->unCodedPw!='X10'){
					$serverPass = "'".$decipherAction->unCodedPw."'";
				}else{
					die('X10');//password could not be ciphered
				}
			
				//take client side pw and compare it to server side pw--if match then move on
				if($clientPassW==$serverPass){	
				
						$userID = $fetchUserInfoArray[0];
						
						$userEmail = $fetchUserInfoArray[1];
												
						$tableName = 'barter_postings';
						
						if(count($offerPhotosArray)>=1 && $offerPhotosArray[0]!="'null'"){
						//PHOTOS FOR OFFERS ONLY
						$photoCommit = new photoCommitAction();
						$photoCommit->photoCommit($userID, $stateID, $offerPhotosArray);
						$offerPhotosArray = $photoCommit->updatedPhoto;
						}
						
						
						///OFFERS SAVE
						$wc = str_replace("'","",$offerGSW[0]); 
						if($wc!='null'){
						$offersCount = count($offerGSW);
						for($i=0; $i<$offersCount; $i++){
									
								mysql_query("INSERT INTO barter_offered (user_id, state_id, city_id, category_id, title, posting, GSW, emailNotes, photoLocale, money, secCode, specificLocale) VALUES ($userID, $stateID, $cityID, $offerCategoryID[$i], $offerTitle[$i], $offerPosting[$i], $offerGSW[$i], $offerEmailNotes[$i], $offerPhotosArray[$i], $offerMoney[$i], $ssSec, $specificLocale)") or die('X10');
						}
						}
						
						///NEEDS SAVE
						$wc = str_replace("'","",$needGSW[0]); 
						if($wc!='null'){
						$needsCount = count($needGSW);
						for($j=0; $j<$needsCount; $j++){
	
								mysql_query("INSERT INTO barter_needed (user_id, state_id, city_id, category_id, title, posting, GSW, emailNotes, photoLocale, money, secCode, specificLocale) VALUES ($userID, $stateID, $cityID, $needCategoryID[$j], $needTitle[$j], $needPosting[$j], $needGSW[$j], $needEmailNotes[$j], $needPhotosArray[$j], $needMoney[$j], $ssSec, $specificLocale)") or die('X10');
								
							}
						}
						
						//sends a confirmation email to registered user
						
						$sendEmail = new sendEmail('posting', $userEmail, NULL, NULL, NULL, $userID, $ssSec, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, $postingTally);
						
						echo $sendEmail->emailConfirm;
				}
						
			}else{
						echo 'X10';
			}
}
?>

