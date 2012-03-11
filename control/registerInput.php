<?php
function register($registerForm){
	


function __autoload($class_name) {
    include '../classes/'.$class_name . '.php';
}

//make sure u and p is alphanumeric only
	$unTest = str_replace("'", "", ($registerForm['s2']));
	$psTest = str_replace("'", "", ($registerForm['s3']));
	if(!ctype_alnum($unTest) || strlen($unTest)<5 || strlen($unTest)>12){//is it made up of only alphanumeric
		die('X14');
	}
	if(!ctype_alnum($psTest) || ctype_alpha($psTest) || ctype_digit($psTest) || strlen($psTest)<8 || strlen($psTest)>12){
		die('X15');
	}

	$username = $registerForm['s2'];
	$email = $registerForm['e1'];
	$passwordDeCif = str_replace("'", "", ($registerForm['s3']));
	
	$cipherAction = new cipherAction();
	$cipherAction->cipher($passwordDeCif);
	if($cipherAction->codedPw!='X10'){
		$password = "'".$cipherAction->codedPw."'";
	}else{
		die('psAlphaNum');//password could not be ciphered
	}
	$registerCity = $registerForm['s1'];
	$registerState = $registerForm['i1'];
	$business = $registerForm['i2'];
	$facebook = $registerForm['u1'];
	$twitter = $registerForm['u2'];
	$google = $registerForm['u3'];
	$linkedin = $registerForm['u4'];
	$url = $registerForm['u5'];
	$businessName = $registerForm['s4'];

    // makes a random alpha numeric string of a given lenth 
    $randomKey = makePin(10);
	
	include_once('../includes/connect.php');
	
	$tableName = "barter_users";
	///checks for duplicate email
		$emailresult = mysql_query("SELECT * FROM $tableName WHERE email = $email") or die('X10');
			$emailrow = mysql_fetch_array($emailresult, MYSQL_NUM);
			if($emailrow>0){
				die('X12');//email already in use
			}else{
				
				///checks for duplicate username
				$usernameresult = mysql_query("SELECT * FROM $tableName WHERE username=$username") or die('X10');
				$usernamerow = mysql_fetch_array($usernameresult, MYSQL_NUM);
				if($usernamerow>0){
					die('X13');//username already in use
				}else{
						$secCodeCreate = new secCodeCreate(6);
						$secCode = str_replace("'", "",$secCodeCreate->extractcode);
						$superSec = "'".mysql_real_escape_string($secCode.'^'.str_replace("'", "",$randomKey))."'";
						
						///if everything checks out, go ahead and send to server
						mysql_query("INSERT INTO $tableName (email, username, password, randKey, secCode, city, state, business, facebook, twitter, google, linkedin, url, businessName) VALUES ($email, $username, $password, $randomKey, $superSec, $registerCity, $registerState, $business, $facebook, $twitter, $google, $linkedin, $url, $businessName)") or die('X10');
						
						//sends a confirmation email to registered user
						$sendEmail = new sendEmail('register', $email, $username, $passwordDeCif, $randomKey, NULL, $secCode, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
						
						if($sendEmail->emailConfirm=='1'){//everything's cool
							echo $sendEmail->emailConfirm;
						}else{//there was an error sending the email, remove the user data from the db
							mysql_query("DELETE FROM $tableName WHERE email= $email ") or die('X10');
							echo 'X10';
						}
				}
			}
}
function makePin($num){
	 // makes a random alpha numeric string of a given lenth 
    $aZ09 = array_merge(range('A', 'Z'), range('a', 'z'),range(0, 9)); 
    $out =''; 
    for($c=0;$c < $num;  $c++) { //the number is the length of the randkey, change it if you want the rand key to be bigger or smaller
       $out .= $aZ09[mt_rand(0,count($aZ09)-1)]; 
    } 
    $randomK = "'".mysql_real_escape_string(rtrim($out))."'";
	return $randomK;
}
?>