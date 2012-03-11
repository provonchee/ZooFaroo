<?php
include ('../classes/userPasswordCheck.php');

class secCodeCommit extends userPasswordCheck{
	public $ssSec=NULL;
	public $userPassConfirm=NULL;
	public $IDuser=NULL;
	public $userNameConfirm=NULL;
	
	function ssSecCommit($user, $pass, $clear){
		
		if($this->uPCheck($user, $pass) && $clear==false){//if username and pass do match, this tells client side to grant access and commits seccode to server
			$this->IDuser = $this->userID;
			$this->userNameConfirm = $this->user;
			$this->ssSec = $this->secCode;//this is the seccode and pw combined
			$isolatedSecCode = "'".mysql_real_escape_string(substr($this->secCode, 0, 6))."'";//isolates the secode from the pw
			mysql_query("UPDATE barter_users SET secCode = $isolatedSecCode WHERE user_id = $this->IDuser") or die('X10');
			$this->userPassConfirm=true;
			
		}else if(!$this->uPCheck($user, $pass)){
			
			$this->ssSec = 'X10';//if username and pass do not match, this tells client side to prohibit access
			$this->userPassConfirm=false;
			
		}
	}
									
}
?>