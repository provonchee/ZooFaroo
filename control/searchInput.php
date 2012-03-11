<?
function search($searchForm){
	$searchType = $searchForm['di'];
	$stateID = ''.$searchForm['i1'].'';
	$cityID = ''.$searchForm['i2'].'';
	$categoryID = ''.$searchForm['i3'].'';
	$offerNeed = str_replace("'", "", $searchForm['s1']);
	$keywordString = str_replace("'", "", $searchForm['s2']);
	
	function __autoload($class_name) {
    	include '../classes/'.$class_name . '.php';
	}
	
	$keywordCleaner = new keywordCleaner();
	
	
	//for the quicksearch
	if($cityID=='' || $cityID=='1111'){
		$cityID=NULL;
	}
	if($categoryID=='' || $categoryID=='1111'){
		$categoryID=NULL;
	}
	if($offerNeed=='' || $offerNeed=='1111'){
		$offerNeed=NULL;
	}
	
	if($keywordString=='' || $keywordString=="X10"){
		$keywordCleaner->pieces=NULL;//search without any keywords--a broad search
		
	}else{
		$keywordCleaner->kCleaner($keywordString);
	}
	//with everything sorted, send parameters to search the DB
	$goSearch =  new goSearch();
	$goSearch->gSearch($stateID, $cityID, $categoryID, $offerNeed, $keywordCleaner->pieces);
	echo json_encode($goSearch->results);
}

?>