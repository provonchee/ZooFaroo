<?

class getTallies {

	///////////KEY///////////////////
	//$tallies[$][0] = offered tally
	//$tallies[$][1] = needed tally
	/////////////////////////////////
	
	public $catsLength;
	public $tallies = array();
	
	public $offerNeedsCount = NULL;
	
	function gTallies($cityID, $stateID, $catsArrayLength){
		
		if(ctype_digit($catsArrayLength) && ctype_digit($stateID) && ctype_digit($cityID)){//make sure all of these are numbers
				
		$this->tallies[0][0] = $stateID;
		$this->tallies[0][1] = $stateID;
		$this->tallies[0][2] = $cityID;
		$this->tallies[0][3] = $cityID;
		$this->catsLength = $catsArrayLength;//the minus one compensates for the additional NULL at the end of the categories on the DB
		//$catTick=1;
			//OFFERED
			for($o=1; $o<=$this->catsLength; $o++){
				$goodsOfferTallyResult = mysql_query("SELECT COUNT(*) FROM barter_offered WHERE (barter_offered.city_id = '$cityID') AND (barter_offered.category_id = '$o') AND (barter_offered.posting_date!='0000-00-00') AND (barter_offered.secCode='clear')");
				$goodsOfferTallyResultRow = mysql_fetch_array($goodsOfferTallyResult, MYSQL_NUM);
					$this->tallies[$o][0] = $goodsOfferTallyResultRow[0];
			}
			//NEEDED
			for($n=1; $n<=$this->catsLength; $n++){
				$goodsNeededTallyResult = mysql_query("SELECT COUNT(*) FROM barter_needed WHERE (barter_needed.city_id = '$cityID') AND (barter_needed.category_id = '$n') AND (barter_needed.posting_date!='0000-00-00') AND (barter_needed.secCode='clear')");
				$goodsNeededTallyResultRow = mysql_fetch_array($goodsNeededTallyResult, MYSQL_NUM);
					$this->tallies[$n][1] = $goodsNeededTallyResultRow[0];
				
			}
			
		}else{
			die('X10');//vars are not numeric, kill it
		}//confirm numeric
			
	}
	
	function offerNeedTally($userID, $whichKind){
		if(ctype_digit($userID)){//make sure all of these are numbers
				$offerNeedTallyResult = mysql_query("SELECT COUNT(*) FROM barter_".$whichKind." WHERE user_id = '$userID' AND (barter_".$whichKind.".posting_date!='0000-00-00') AND (barter_".$whichKind.".secCode='clear')");
				$offerNeedTallyResultRow = mysql_fetch_array($offerNeedTallyResult, MYSQL_NUM);
					$this->offerNeedsCount = $offerNeedTallyResultRow[0];
		}else{
			die('X10');//vars are not numeric, kill it
		}//confirm numeric
	}
}
?>