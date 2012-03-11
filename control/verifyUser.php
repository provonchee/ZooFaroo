<?php
include_once('../includes/connect.php');

function __autoload($class_name) {
    include '../classes/'.$class_name . '.php';
}

$type = $_REQUEST['type'];

switch($type){

	case 'advanced':

//checks captcha to make sure it was entered correctly
$response=$_REQUEST['response'];
$challenge=$_REQUEST['challenge'];
require_once('../lib/recaptchalib.php');
$privatekey = "6Lfxn8cSAAAAAEsjS02SI9RDrOkRG9Vl0hSEQai7";
$origin = $_SERVER["REMOTE_ADDR"];

$resp = recaptcha_check_answer ($privatekey,$origin,$challenge,$response);
				  if (!$resp->is_valid) {
					// What happens when the CAPTCHA was entered incorrectly
					die ("X11");
				  } else { //captcha was entered correctly, go ahead and check username and password and security code.  If all checks out, refresh the server security code and send it back to the client's page.
						checkit();
				  }
	break;
	
	case 'basic':
		checkit();
	break;
				  
}//switch

function checkit(){
	$user=$_REQUEST['user'];
	$pass=$_REQUEST['pass'];
	$ssSec=$_REQUEST['ssSec'];//server side security code
								
	if(isset($_REQUEST['ssSec'])){
		$secCodeCheck = new secCodeCheck($user, $ssSec);
		$matchResult = $secCodeCheck->matchResult;
		if($matchResult=='houstonMatch'){//username and password and ssSec have cleared, go ahead and refresh ssSec on server for this user
		
		//decipher client side password
		$deCipherActionClient = new deCipherActionClient();
		$deCipherActionClient->decipherClient($pass);
		$pass = $deCipherActionClient->unCodedClientPw;
		
			$secCodeCommit = new secCodeCommit();
			$secCodeCommit->ssSecCommit($user, $pass, false);
			if($secCodeCommit->userPassConfirm==true){
				$extractcode = $secCodeCommit->ssSec;
				$extractcode = substr($extractcode, 0, 6);
				echo $extractcode;
			}else{//second verification of username and password are not found on the server
				echo 'X10';
			}
		}else{//if username and password are not found on the server
			echo 'X10';
		}
	}else{
		echo '1';				   
	}
}
?>