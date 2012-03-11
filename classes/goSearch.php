<?php

class goSearch {
	
		protected $sr=NULL;
		protected $evalLisitngs = array(NULL);
		protected $offeredPosts = array(NULL);
		protected $neededPosts = array(NULL);
		protected $searchResult = array(NULL);
		protected $noMatches=NULL;
		public $results=NULL;
		protected $TSearch=NULL;
		protected $PSearch=NULL;
		protected $postingIDArray = array(NULL);
		
	 function populate($oORn, $eval){
			 		 $this->searchResult[$oORn][$this->sr][0] =  $this->evalLisitngs[$oORn][$eval][0];//userID
					 $this->searchResult[$oORn][$this->sr][1] =  $this->evalLisitngs[$oORn][$eval][1];//username
					 $this->searchResult[$oORn][$this->sr][2] =  $this->evalLisitngs[$oORn][$eval][2];//business
					 $this->searchResult[$oORn][$this->sr][3] =  $this->evalLisitngs[$oORn][$eval][3];//posting date
					 $this->searchResult[$oORn][$this->sr][4] =  $this->evalLisitngs[$oORn][$eval][4];//city id
					 $this->searchResult[$oORn][$this->sr][5] =  $this->evalLisitngs[$oORn][$eval][5];//city name
					 $this->searchResult[$oORn][$this->sr][6] =  $this->evalLisitngs[$oORn][$eval][6];//state id
					 $this->searchResult[$oORn][$this->sr][7] =  $this->evalLisitngs[$oORn][$eval][7];//state name
					 $this->searchResult[$oORn][$this->sr][8] =  $this->evalLisitngs[$oORn][$eval][8];//photograph
					 $this->searchResult[$oORn][$this->sr][9] =  $this->evalLisitngs[$oORn][$eval][9];//GSW
					 $this->searchResult[$oORn][$this->sr][10] = $this->evalLisitngs[$oORn][$eval][10];//emailNotes
					 $this->searchResult[$oORn][$this->sr][11] = $this->evalLisitngs[$oORn][$eval][11];//category ID
					 $this->searchResult[$oORn][$this->sr][12] = $this->evalLisitngs[$oORn][$eval][12];//category
					 $this->searchResult[$oORn][$this->sr][13] = $this->evalLisitngs[$oORn][$eval][13];//title
					 $this->searchResult[$oORn][$this->sr][14] = $this->evalLisitngs[$oORn][$eval][14];//money
					 $this->searchResult[$oORn][$this->sr][15] = $this->evalLisitngs[$oORn][$eval][15];//empty
					 $this->searchResult[$oORn][$this->sr][16] = $this->evalLisitngs[$oORn][$eval][16];//postingID
					 $this->searchResult[$oORn][$this->sr][17] = $this->evalLisitngs[$oORn][$eval][17];//posting
					 $this->searchResult[$oORn][$this->sr][18] = $this->evalLisitngs[$oORn][$eval][18];//specific Locale
					 $this->searchResult[$oORn][$this->sr][19] = $this->evalLisitngs[$oORn][$eval][19];//user reiews
					 $this->searchResult[$oORn][$this->sr][20] = $this->evalLisitngs[$oORn][$eval][20];//# of total postings
					  $this->searchResult[$oORn][$this->sr][21] = $this->evalLisitngs[$oORn][$eval][21];//# of postings for the opposite, i.e. if this is a call for offers, this number is the number of needs the user has
					 
					 array_push($this->postingIDArray, $this->evalLisitngs[$oORn][$eval][16]);//to avoid duplicates, keep record of postingID 
					 
					 $this->sr++;
		}//populate
	
	//get all posts that match initial criteria-->state, city, etc
	function gSearch($search_stateID, $search_cityID, $search_categoryID, $search_offerNeed, $pieces){
		
		$this->TSearch=false;
		$this->PSearch=false;
		$this->sr=0;
		$this->noMatches='noMatches';
		
		$sStateID = str_replace("'","", $search_stateID);
		$sCityID = str_replace("'","", $search_cityID);
		$sOfferNeed = str_replace("'","", $search_offerNeed);
		$categoryID = str_replace("'","", $search_categoryID);
		
	if($sCityID==NULL){//state and keyword search
			$listRetrieval = new grabPosts("offered.state_id=".$sStateID."", "offered");
			$offeredPosts = $listRetrieval->fetchedArray;
					
			$listRetrieval = new grabPosts("needed.state_id=".$sStateID."", "needed");
			$neededPosts = $listRetrieval->fetchedArray;
		}else{//cityID provided
			if($categoryID==NULL){//state, city, and keyword search
				$listRetrieval = new grabPosts("offered.state_id=".$search_stateID." && offered.city_id=".$search_cityID."", "offered");
				$offeredPosts = $listRetrieval->fetchedArray;
						
				$listRetrieval = new grabPosts("needed.state_id=".$search_stateID." && needed.city_id=".$search_cityID."", "needed");
				$neededPosts = $listRetrieval->fetchedArray;
			}else{//category ID provided
				if($sOfferNeed=='Both'){//full search, also search in both 'offered' and 'needed' (keyword optional)
					$listRetrieval = new grabPosts("offered.state_id=".$search_stateID." && offered.city_id=".$search_cityID." && offered.category_id =".$search_categoryID."", "offered");
					$offeredPosts = $listRetrieval->fetchedArray;
					
					$listRetrieval = new grabPosts("needed.state_id=".$search_stateID." && needed.city_id=".$search_cityID." && needed.category_id =".$search_categoryID."", "needed");
					$neededPosts = $listRetrieval->fetchedArray;
					
				}else if($sOfferNeed=='Offered'){//full search, but only in 'offered' (keyword optional)
					$listRetrieval = new grabPosts("offered.state_id=".$search_stateID." && offered.city_id=".$search_cityID." && offered.category_id =".$search_categoryID."", "offered");
					$offeredPosts = $listRetrieval->fetchedArray;
					
				}else if($sOfferNeed=='Needed'){//full search, but only in 'needed' (keyword optional)
					$listRetrieval = new grabPosts("needed.state_id=".$search_stateID." && needed.city_id=".$search_cityID." && needed.category_id =".$search_categoryID."", "needed");
					$neededPosts = $listRetrieval->fetchedArray;
				}
			}
		}
		
		if($offeredPosts[0]!=NULL){
			$this->evalLisitngs[0] = $offeredPosts;
		}else{
			$this->evalLisitngs[0] = NULL;
		}
		
		if($neededPosts[0]!=NULL){
			$this->evalLisitngs[1] = $neededPosts;
		}else{
			$this->evalLisitngs[1] = NULL;
		}
		
		
				
if($this->evalLisitngs[0]!=NULL || $this->evalLisitngs[1]!=NULL){

		//narrow the findings by use of keywordds (if there are any)
		if($pieces!=NULL){//pieces not null
		
		for($e=0; $e<2; $e++){//attend to each offer list and each need list
			
			$this->sr=0;
			for($k=0; $k<count($pieces); $k++){//pieces
				
				for($j=0; $j<=count($this->evalLisitngs[$e]); $j++){
					
						//search the titles and postings for the keyword match
						$this->TSearch = stripos($this->evalLisitngs[$e][$j][13], $pieces[$k]);
						$this->PSearch = stripos($this->evalLisitngs[$e][$j][17], $pieces[$k]);

					//these conditionals just make sure there are no duplicates in the final list of results
					if($this->TSearch!==false && in_array($this->evalLisitngs[$e][$j][16], $this->postingIDArray)==false){//1
							self::populate($e, $j);
					}//1
					if($this->PSearch!==false && in_array($this->evalLisitngs[$e][$j][16], $this->postingIDArray)==false){//2
							self::populate($e, $j);
					}//2
				}
				
			}
				
			}
			
			if(count($this->searchResult[0])==0 && count($this->searchResult[1])==0){
					$this->results = $this->noMatches;
				}else{
					if(count($this->searchResult[0])>0){
						$this->searchResult[0][0][20] = count($this->searchResult[0]);//number of search results when the user enters a keyword
					}else if(count($this->searchResult[0])==0){
						$this->searchResult[0][0][0] = $this->noMatches;
					}
					
					if(count($this->searchResult[1])>0){
						$this->searchResult[1][0][20] = count($this->searchResult[1]);//number of search results when the user enters a keyword
					}else if(count($this->searchResult[1])==0){
						$this->searchResult[1][0][0] = $this->noMatches;
					}
					
					$this->results = $this->searchResult;
				}
			
		}else{//pieces is NULL which means the keyword input was left blank OR it was only filled with exceptWords
			if($this->evalLisitngs[0]!=NULL){
				$this->evalLisitngs[0] = $offeredPosts;
			}else{
				$this->evalLisitngs[0] = $this->noMatches;	
			}
			if($this->evalLisitngs[1]!=NULL){
				$this->evalLisitngs[1] = $neededPosts;
			}else{
				$this->evalLisitngs[1] = $this->noMatches;	
			}
			$this->results = $this->evalLisitngs;
		}



}else if($this->evalLisitngs[0]==NULL && $this->evalLisitngs[1]==NULL){//returned row came back false which means there were no matches
	$this->evalLisitngs[0] = $this->noMatches;
	$this->evalLisitngs[1] = $this->noMatches;
	$this->results = $this->evalLisitngs;
}
			
	}//gSearch
}
?>