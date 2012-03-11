<?
class getReviews {
	
	protected $ratingTally;
	public $reviewData = array();
	protected $rows;
		
	function totalReviews($uID){
		$userID = $uID;
		//collect all reviews on this user
		$ratingCount = 0;
		$revCount = 0;
		
		$getReviewQuery = new getReviewQuery($userID);
		
		$userLinkInfo = new userLinkInfo();
		
		$this->rows = mysql_num_rows($getReviewQuery->fetchData);
		
		if($this->rows>0){
			
		while($fetchSingleDataRow = mysql_fetch_array($getReviewQuery->fetchData, MYSQL_NUM)){
			$this->reviewData[$ratingCount][0]= $fetchSingleDataRow[0];//user being reviewed
			$this->reviewData[$ratingCount][1]= $fetchSingleDataRow[1];//user being reviewed ID
			$this->reviewData[$ratingCount][2]= $fetchSingleDataRow[2];//user doing the reviewing
			$this->reviewData[$ratingCount][3]= $fetchSingleDataRow[3];//user doing the reviewing ID
			$this->reviewData[$ratingCount][4] = $userLinkInfo->reviewTallies($fetchSingleDataRow[3]);//user doing the reviewing's OWN review tally--see above
			$this->reviewData[$ratingCount][5] = $fetchSingleDataRow[4];//review date
			$this->reviewData[$ratingCount][6] = $fetchSingleDataRow[5];//review Title
			$this->reviewData[$ratingCount][7] = $fetchSingleDataRow[6];//review post
			$this->reviewData[$ratingCount][8] = $fetchSingleDataRow[7];//if the reviewee is recommended
			$this->reviewData[$ratingCount][9] = $fetchSingleDataRow[8];//review_id
			
			
			$ratingCount++;
			
			if($this->reviewData[$ratingCount][6]!='null' && $this->reviewData[$ratingCount][7]!='null'){//a review was left, up the review ticker
				$revCount++;
			}
			
			
			$this->reviewData[0][11] = $revCount;//this is the number of filled in reviews		
		}
		
		//grab the reviewee's rating tally (as well as business status)
		$uLInfoi = $userLinkInfo->reviewTallies($userID);
		
		
			//get positive percentage
			if($uLInfoi[0]!='0'){
				$this->reviewData[0][10] = $uLInfoi[0];//total number of ratings
				$this->reviewData[0][12] = $uLInfoi[1];//the positive percentage
				$this->reviewData[0][13] = 100-$uLInfoi[1];//the negative percentage
			}else{
				$this->reviewData[0][10] = 0;
				$this->reviewData[0][12] = 0;
				$this->reviewData[0][13] = 0;
			}
		}else{// no reviews were found so just retrieve the users info and send it back
			$this->reviewData[0][0]='X10';
		}
		
	}
	
	
}
?>