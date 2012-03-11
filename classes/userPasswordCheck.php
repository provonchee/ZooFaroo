<?php

class userPasswordCheck{
	
	public $userID=NULL;
	public $passID=NULL;
	public $user=NULL;
	public $pass=NULL;
	public $secCode=NULL;
	
	//this just checks username and password
	function uPCheck($user, $pass){
		
		 $secCodeCreate = new secCodeCreate(6);

		$this->user = $user;
		$this->user = "'".mysql_real_escape_string($this->user)."'";
		$this->pass = $pass;
		
	//check to make sure they're in the system
			$fetchUserInfo = mysql_query("SELECT * FROM barter_users WHERE username=$this->user") or die('X10');
				$fetchUserInfoArray = mysql_fetch_array($fetchUserInfo, MYSQL_NUM);
				$this->userID = $fetchUserInfoArray[0];
				$this->user = $fetchUserInfoArray[2];
				$this->passID = $fetchUserInfoArray[3];
				$this->secCode = $fetchUserInfoArray[5];
				
				if(strlen($this->secCode)>6 && strstr($this->secCode, '^')){//the user has not cleared their registration so do not grant them access
					die('ifNotCleared');
				}else if(strlen($this->secCode)<=6 && !strstr($this->secCode, '^')){//the user has previously cleared their initial registration--ok to move forward
	
					$decipherAction = new decipherAction();
					$decipherAction->decipher($this->passID);
					$this->passID = $decipherAction->unCodedPw;
				
					//if the user and pass in the system continue
					if($this->passID==$this->pass){
						//code password for client side storage
						$cipherActionClient = new cipherActionClient();
						$cipherActionClient->cipherClient($this->pass);
						$this->pass = $cipherActionClient->codedClientPw;
						$this->secCode = $secCodeCreate->extractcode.$this->pass;
						return true;
					}else{
						return false;
					}
				}
	}			
}

?>