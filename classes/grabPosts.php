<?php
include_once('../includes/connect.php');
class grabPosts{
	public $fetchedArray = array(NULL);
	protected $pl;
	protected $orow=NULL;
	protected $numRows;
	function __construct($queryParam1, $queryParam2){
		static $pl = 0;
		static $nl = 0;
		
							
		$fetchOfferData = mysql_query("SELECT user.user_id, user.username, user.business, ".$queryParam2.".posting_date, cityName.city_id, cityName.city, stateName.state_id, stateName.state, ".$queryParam2.".photoLocale, ".$queryParam2.".GSW, ".$queryParam2.".emailNotes, cat.category_id, cat.category, ".$queryParam2.".title, ".$queryParam2.".money, ".$queryParam2.".empty, ".$queryParam2.".posting_id, ".$queryParam2.".posting, ".$queryParam2.".specificLocale
							 FROM barter_".$queryParam2." AS ".$queryParam2." 
							 INNER JOIN barter_users AS user 
							 ON user.user_id = ".$queryParam2.".user_id 
							 INNER JOIN barter_cities AS cityName 
							 ON cityName.city_id = ".$queryParam2.".city_id 
							 INNER JOIN barter_states AS stateName 
							 ON stateName.state_id = ".$queryParam2.".state_id 
							 INNER JOIN barter_categories AS cat 
							 ON cat.category_id = ".$queryParam2.".category_id
							 WHERE ".$queryParam1." AND (".$queryParam2.".posting_date!='0000-00-00') AND (".$queryParam2.".secCode='clear') ORDER BY ".$queryParam2.".posting_date DESC
							");
		
							
	$this->numRows = mysql_num_rows($fetchOfferData);
	 						
	while($this->orow = mysql_fetch_array($fetchOfferData, MYSQL_NUM)){
		
			$this->fetchedArray[$pl][0] = $this->orow[0];//userID
			$this->fetchedArray[$pl][1]= $this->orow[1];//username
			$this->fetchedArray[$pl][2]= $this->orow[2];//business
			$this->fetchedArray[$pl][3]= $this->orow[3];//posting date
			$this->fetchedArray[$pl][4] = $this->orow[4];//city id
			$this->fetchedArray[$pl][5] = $this->orow[5];//city name
			$this->fetchedArray[$pl][6] = $this->orow[6];//state id
			$this->fetchedArray[$pl][7] = $this->orow[7];//state name
			$this->fetchedArray[$pl][8] = $this->orow[8];//photograph
			$this->fetchedArray[$pl][9] = $this->orow[9];//GSW
			$this->fetchedArray[$pl][10] = $this->orow[10];//EmailNotes
			$this->fetchedArray[$pl][11] = $this->orow[11];//Category ID
			$this->fetchedArray[$pl][12] = $this->orow[12];//Category
			$this->fetchedArray[$pl][13] = mb_convert_encoding($this->orow[13], "UTF-8", "HTML-ENTITIES");//Title
			$this->fetchedArray[$pl][14] = $this->orow[14];//Money
			$this->fetchedArray[$pl][15] = $this->orow[15];//Empty
			$this->fetchedArray[$pl][16] = $this->orow[16];//postingID
			$this->fetchedArray[$pl][17] =  mb_convert_encoding($this->orow[17], "UTF-8", "HTML-ENTITIES");//Posting
			$this->fetchedArray[$pl][18] =  mb_convert_encoding($this->orow[18], "UTF-8", "HTML-ENTITIES");//specificLocale
			$this->fetchedArray[$pl][19] =  userLinkInfo::reviewTallies($this->orow[0]);//user link info
			$this->fetchedArray[$pl][20] = $this->numRows;//number of total postings with said criteria
			
			//grabs the tally number of the opposite, offer or need, so as to show on the list and search pages
			$getTallies = new getTallies();
			if($queryParam2=='offered'){
				$getTallies->offerNeedTally($this->fetchedArray[$pl][0], 'needed');
				$this->fetchedArray[$pl][21] = $getTallies->offerNeedsCount;
			}else{
				$getTallies->offerNeedTally($this->fetchedArray[$pl][0], 'offered');
				$this->fetchedArray[$pl][21] = $getTallies->offerNeedsCount;
			}
			
			$pl++;
	}
	
	$pl=0;
	$orow=NULL;
	}
}
?>