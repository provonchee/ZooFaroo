<?php
include_once('../classes/decipherAction.php');
class secCodeCheck {
	
	public $matchResult=NULL;
	public $userID=NULL;
	public $passID=NULL;
	
	public function __construct($user, $ssSec){

	
		$fetchSecCode = mysql_query("SELECT * FROM barter_users WHERE username='$user' AND secCode = '$ssSec'");
			$fetchSecCodeArray = mysql_fetch_array($fetchSecCode, MYSQL_NUM);
			//if the user and pass are in the system continue on with the posting
				if($fetchSecCodeArray>0){
						$this->matchResult = 'houstonMatch';
				}else{
					$this->matchResult = 'noMatch';
				}
	}
				
}
?>