<?php
/*fetches the total number of reviews left to a user based upon the userID sent to this class*/
class userLinkInfo{
	protected $ratingTally = NULL;//numnber of ratings and reviews total
	
	protected $recommendPercent = NULL;//what percentage of ratings are positive
	public $uLInfo = array(NULL); 
		function reviewTallies($uID){
			static $reviewsRows = 0;
			static $positiveRows = 0;
			$positiveRevs = array();
			$reviewTally = array();//number of reviews NOT ratings
			$fetchRevTallyInfo = mysql_query("SELECT linkInfo.recommend, linkInfo.reviewTitle, user.business
											 FROM barter_reviews AS linkInfo
											 INNER JOIN barter_users AS user
											 ON user.user_id = linkInfo.user_id
											 WHERE linkInfo.user_id = '$uID'");
			$fetchNumRows = mysql_num_rows($fetchRevTallyInfo);
			while($fetchRevTallyArray = mysql_fetch_array($fetchRevTallyInfo, MYSQL_NUM)){
				//get the number of positive ratings and put them into an array
				if($fetchRevTallyArray[0]==2){
					$positiveRevs[$positiveRows] = $fetchRevTallyArray[0];
					$positiveRows++;
				}
				//get the number of total reviews NOT ratings and put them into an array 
				if($fetchRevTallyArray[1]!='null'){
					$reviewTally[$reviewsRows] = $fetchRevTallyArray[0];
					$reviewsRows++;
				}
				
				$userBusiness = $fetchRevTallyArray[2];
			}
		
		if($fetchNumRows!=0){
			$this->ratingTally = $fetchNumRows;//total number of rating/reviews
			$this->recommendPercent = round((count($positiveRevs)/$this->ratingTally)*100);//the positive percentage
			$uLInfo[0] = $this->ratingTally;
			$uLInfo[1] = $this->recommendPercent;
			$uLInfo[2] = $userBusiness;
			$uLInfo[3] = $reviewsRows;
			return $uLInfo;
		}else{
			$uLInfo[0] = 0;
			$uLInfo[1] = 0;
			$uLInfo[2] = 0;
			$uLInfo[3] = 0;
			return $uLInfo;
		}
	}
	
	
}


?>