<?php
include_once('secCodeCommit.php');

class userReviewCheck extends secCodeCommit{
	
	public $allowReview = NULL;
	
	function uReviewCheck($user, $pass, $chosenUser, $chosenUserID){//$chosenUser is the user ID of who's user page this is
		$this->ssSecCommit($user, $pass, false);
				
		if($this->userPassConfirm == true){//their username and password checked out on the server
		
			if($this->userNameConfirm==$chosenUser){
							$this->allowReview = 'mltisme'.$this->IDuser.'_'.$this->ssSec; //they cannot leave a review for themselves but allow them to stay logged in
			}else{
							
							///MAKE SURE THEY ARE NOT LEAVING A REVIEW FOR ANOTHER USER MORE THAN ONCE
							$fetchReviewCount = mysql_query("SELECT * FROM barter_reviews WHERE reviewedBy_id = $this->userID AND user_id = $chosenUserID");
							
							$fetchReviewCountRows = mysql_num_rows($fetchReviewCount);
							$fetchReviewCountArray = mysql_fetch_array($fetchReviewCount, MYSQL_NUM);
						
							if($fetchReviewCountRows==0){//go ahead and allow them to leave a review
								$this->allowReview = 'allcool'.$this->IDuser.'_'.$this->ssSec;
							}else if($fetchReviewCountRows>=1){  ///if they have reviewed this user before then they are cut off but allowed to stay logged in
								if($fetchReviewCountArray[3] != 'null'){
									$this->allowReview = 'alrdyrv'.$this->IDuser.'_'.$this->ssSec;
								}else{
									$this->allowReview = 'alrdyra'.$this->IDuser.'_'.$this->ssSec;
								}
							}
			}
			
		}else if($this->userPassConfirm == false){//their username and password did not check out on the server
			$this->allowReview = 'X10';
		}
	}
				
}

?>