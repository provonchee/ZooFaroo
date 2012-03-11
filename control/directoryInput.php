<?
function directory($directoryForm){
	//echo json_encode($directoryForm);
	$stateID = $directoryForm['i1'];
	$cityID = $directoryForm['i2'];
	$keywordString = str_replace("'", "", $directoryForm['s1']);
	$aResults = NULL;
	$fetchedUArray = array();
	function __autoload($class_name) {
    	include '../classes/'.$class_name . '.php';
	}
	$userLinkInfo = new userLinkInfo();
	$keywordCleaner = new keywordCleaner();
	
	if($keywordString=='X10'){
		$keywordCleaner->pieces=NULL;
	}else{
		$keywordCleaner->kCleaner($keywordString);
	}
	$pl=0;
	if($stateID!='52'&&$cityID!='52'&&$keywordString=='X10'){
		$fetchUsers = mysql_query("SELECT * FROM barter_users WHERE state = $stateID ORDER BY username") or die('X10');
		while($aResults = mysql_fetch_array($fetchUsers, MYSQL_NUM)){
			$fetchedUArray[$pl][0] = $aResults[2];
			$fetchedUArray[$pl][1] = $userLinkInfo->reviewTallies($aResults[0]);//user link info
			$pl++;
		}
		
	
	}
	
	if($stateID=='52'&&$cityID=='52'&&$keywordString!='null'){
		$fetchUsers = mysql_query("SELECT * FROM barter_users WHERE username = '$keywordString'") or die('X10');
		
		while($aResults = mysql_fetch_array($fetchUsers, MYSQL_NUM)){
			$fetchedUArray[$pl][0] = $aResults[2];
			$fetchedUArray[$pl][1] = $userLinkInfo->reviewTallies($aResults[0]);//user link info
			$pl++;
		}
	
	}
	if(count($fetchedUArray)>0){
		echo json_encode($fetchedUArray);
	}else{
		echo 'noMatches';
	}
}

?>