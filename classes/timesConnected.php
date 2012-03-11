<?php
include_once('../classes/secCodeCommit.php');

class timesConnected extends secCodeCommit {
	
	public $connectedCount;
	public $userID;
	
	///IF THEY ARE RESPONDING TO A POST, CHECK TO SEE HOW MANY TIMES THEY HAVE RESPONDED TO THE PARTICULAR POST
						///IF MORE THAN TWICE, THEN THEY'RE CUT OFF
	function tConnected($user, $pass, $postID, $offerNeed){
		$this->ssSecCommit($user, $pass, false);
		
		if($this->userPassConfirm){
			
			$dbTable = 'barter_'.strtolower($offerNeed).'';
			//CHECK TO MAKE SURE THEY AREN'T REPLYING TO THEIR OWN POST
			$fetchUserPostInfo = mysql_query("SELECT * FROM $dbTable WHERE user_id='$this->userID' AND posting_id ='$postID'");
			$fetchUserPostRows = mysql_num_rows($fetchUserPostInfo);
			if($fetchUserPostRows==0){
					$fetchConnections = mysql_query("SELECT times_connected FROM barter_connections WHERE user_id='$this->userID' AND posting_id ='$postID'");
										$fetchConnectionsArray = mysql_fetch_array($fetchConnections, MYSQL_NUM);
										if($fetchConnectionsArray[0]==1 || $fetchConnectionsArray[0]==NULL){ ///if they have contacted this user one time or zero times then go ahead and let them contact the user
											$this->userID = $this->IDuser;
											$this->connectedCount=$this->ssSec;
										}else if($fetchConnectionsArray[0]==2){  ///if they have contacted this user two times already then this replier is cut off
											$this->userID = 'mltcnct'.$this->IDuser;//add 'mltcnct' to the beginning of the user id, this will tip off the code on checksetter that the user is cut off
											$this->connectedCount=$this->ssSec;
										}
			}else{//THEY CANNOT LEAVE A REVIEW FOR THEMSELVES
			
				$this->userID = 'sameuse'.$this->userID;
				$this->connectedCount=$this->ssSec;
			}
		}else{
			$this->connectedCount = 'X10';//if username and pass do not match, this tells client side to prohibit access
		}
	}
									
}
?>