<?php
include_once('../includes/connect.php');

	$checkType = $_REQUEST['checkType'];
	$user = $_REQUEST['user'];
	$pass = $_REQUEST['pass'];
	$origin = $_REQUEST['org'];
	$offerNeed = $_REQUEST['oN'];
	
	
	function __autoload($class_name) {
    	include '../classes/'.$class_name . '.php';
	}
	
	//make sure everything coming in is alphanumeric only
	if(!ctype_alnum($user)){
		die('X10');
	}else if(!ctype_alnum($pass)){
		die('X10');
	}else if(!ctype_alnum($origin)){
		die('X10');
	}else if(!ctype_alnum($checkType)){
		die('X10');
	}
	
	///if password is coming from localstorage we must decipher it
	if($origin=='storage'){
		//decipher client side password
		$deCipherActionClient = new deCipherActionClient();
		$deCipherActionClient->decipherClient($pass);
		$pass = $deCipherActionClient->unCodedClientPw;
	}
	
					if($checkType=='post' || $checkType=='edit' || $checkType=='login'){
						
						$secCodeCommit = new secCodeCommit();
						
						$secCodeCommit->ssSecCommit($user, $pass, false);
						$userID = $secCodeCommit->IDuser;
					
						if($secCodeCommit->userPassConfirm){ //if this var is 'X10' then the username and password did not match and the user is denied access, otherwise it is the user's seccode+password(coded) that is associated with the session
							echo 'houstonMatch'.$userID.'_'.$secCodeCommit->ssSec; 
						}else{
							echo 'sorryNoMatch'.'X10';
						}
					}
						


					if($checkType=='thePost'){  ///if they are replyng to a post
						
						$postingID = $_REQUEST['postingID'];//only for replies
						
						$timesConnected = new timesConnected();
						
							$timesConnected->tConnected($user, $pass, $postingID, $offerNeed);
							
							if($timesConnected->connectedCount!='X10'){
								
								$userRC = substr($timesConnected->userID,0,7);//this grabs the beginning of the userID from timesconnected and sees if a message was sent along
								
								if($userRC=='mltcnct'){//if 'mltcnct' was found attached to the ID then this user is cut off from replying to this post again
									$userID = substr($timesConnected->userID,8);//isolate the userID and tack it to the secCode password combo
									echo 'mltcnctMatch'.$userID.'_'.$timesConnected->connectedCount;
								}else if($userRC=='sameuse'){//if 'sameuse' was found attached to the ID the user cannot reply to themselves
									$userID = substr($timesConnected->userID,8);//isolate the userID and tack it to the secCode password combo
									echo 'sameuseMatch'.$userID.'_'.$timesConnected->connectedCount;
								}else{
									echo 'houstonMatch'.$timesConnected->userID.'_'.$timesConnected->connectedCount;//everything's cool, let the user reply to this post
								}
							}else{
								echo 'sorryNoMatch'.'X10';
							}
					}
						
						
					if($checkType=='user'){  //if they are leaving a review for a user
					
						$chosenUser=$_REQUEST['chosenUser'];
						if(!ctype_alnum($chosenUser)){
							die('X10');
						}else{
							$singleCheck = new singleCheck($chosenUser, 'username');
							$chosenUserID=$singleCheck->singleResults[0];//the person who's user page it is---we must get their userID
						}
						
						$userReviewCheck = new userReviewCheck();
						
						$userReviewCheck->uReviewCheck($user, $pass, $chosenUser, $chosenUserID);//chosenUser is is the user ID of who's user page this is
						
						if($userReviewCheck->allowReview!='X10'){
							
							$userRC = substr($userReviewCheck->allowReview,0,7); 
							
							if($userRC=='alrdyrv'){//already reviewed AND rated this user
								//grab seccode and pw
								$userRC = substr($userReviewCheck->allowReview,7);
								echo 'alrdyrnMatch'.$userRC;//the user ID has already been added by userReviewCheck.php
							}else if($userRC=='alrdyra'){//already RATED this user BUT NOT REVIEWED
								//grab seccode and pw
								$userRC = substr($userReviewCheck->allowReview,7);
								echo 'alrdyraMatch'.$userRC;//the user ID has already been added by userReviewCheck.php
							}else if($userRC=='mltisme'){//cannot leave a review for themselves
								//grab seccode and pw
								$userRC = substr($userReviewCheck->allowReview,7);
								echo 'mltismnMatch'.$userRC;//the user ID has already been added by userReviewCheck.php
							}else if($userRC=='allcool'){
								$userRC = substr($userReviewCheck->allowReview,7);
								echo 'houstonMatch'.$userRC;//the user ID has already been added by userReviewCheck.php
							}
													
						}else{
							echo 'sorryNoMatch'.'X10';
						}
					}
?>