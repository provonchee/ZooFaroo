<?php

class getThePost{

	public $thePostArray = array();
	
	function gThePost(){
		
		$postingID = $_REQUEST['postingID'];
		$postingID = filter_var($postingID, FILTER_VALIDATE_INT);
		$offerNeed = $_REQUEST['offerNeed'];
		$stateID = $_REQUEST['stateID'];
		$stateID = filter_var($stateID, FILTER_VALIDATE_INT);
		$cityID = $_REQUEST['cityID'];
		$cityID = filter_var($cityID, FILTER_VALIDATE_INT);
		$categoryID = $_REQUEST['categoryID'];
		$categoryID = filter_var($categoryID, FILTER_VALIDATE_INT);
		
		switch($offerNeed){
			case 'Offered':
			$dbTable = 'barter_offered';
			break;
			
			case 'Needed':
			$dbTable = 'barter_needed';
			break;
		}
		$fetchSingleData = mysql_query("SELECT * FROM $dbTable WHERE posting_id=$postingID && state_id=$stateID && city_id=$cityID && category_id=$categoryID") or die('X10');
		
		$fetchSingleDataArray = mysql_fetch_array($fetchSingleData, MYSQL_NUM);
		if($fetchSingleDataArray>0){
			$userID = $fetchSingleDataArray[1];
		}else{
			die('X10');
		}
		
		$grabOfferPosts = new grabPosts("offered.user_id = '$userID'", "offered");
		$this->thePostArray[0] = $grabOfferPosts->fetchedArray;
		
		
		$grabNeedPosts = new grabPosts("needed.user_id = '$userID'", "needed");
		$this->thePostArray[1]= $grabNeedPosts->fetchedArray;
	
	}
	
}
?>