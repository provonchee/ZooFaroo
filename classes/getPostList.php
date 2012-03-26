<?php
include_once('../includes/connect.php');

class getPostList {
	
	
	public $postListArray = array();
	protected $pl;
	
	function gPostList(){
		static $pl = 0;
		
		$categoryID = $_REQUEST['categoryID'];
		$offerNeed = $_REQUEST['offerNeed'];
		$stateID = $_REQUEST['stateID'];
		$cityID = $_REQUEST['cityID'];
		
		if(ctype_digit($categoryID) && ctype_digit($stateID) && ctype_digit($cityID)){//make sure all of these are numbers
	
			if($offerNeed=='Offered'){
				$primary = 'offered';
				$primNumber = '20';
				$secondary = 'needed';
			}else if($offerNeed=='Needed'){
				$primary = 'needed';
				$primNumber = '21';
				$secondary = 'offered';
			}
			
			
			if($stateID!='X10' && $cityID!='X10' && $offerNeed!='X10' && $categoryID!='X10'){
				
				if($categoryID!='999'){//non-wildcard
					$listRetrieval = new grabPosts("".$primary.".city_id=$cityID && ".$primary.".category_id=$categoryID", $primary);
				}else{//wild card, i.e., grab all within city
					$listRetrieval = new grabPosts("".$primary.".city_id=$cityID", $primary);
				}
			
				$chosenArray = $listRetrieval->fetchedArray;
				
				if($chosenArray[0][$primNumber]!=0){
					
					$this->postListArray = $chosenArray;				
					
				}else{
					
					$this->postListArray[0][0] = 'empty';
						
				}
			}else{
				$this->postListArray[0][0]='X10';
			}
		
		}else{
			die('X10');//vars are not numeric, kill it
		}//confirm numeric

}//gPostList


}
?>