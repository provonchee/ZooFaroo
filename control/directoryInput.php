<?
function directory($directoryForm){
	$stateID = $directoryForm['i1'];
	$cityID = $directoryForm['i2'];
	$keywordString = str_replace("'", "", $directoryForm['s1']);
	$businessString = str_replace("'", "", $directoryForm['s2']);
	$aResults = NULL;
	$fetchedUArray = array();
	$fetchedIDS = array();
	function __autoload($class_name) {
    	include '../classes/'.$class_name . '.php';
	}
	$userLinkInfo = new userLinkInfo();
	$keywordCleaner = new keywordCleaner();
	
	if($keywordString!='X10'){
		$keywordCleaner->kCleaner($keywordString);
		$keywordArray = $keywordCleaner->pieces;
	}
	
	if($businessString!='X10'){
		$keywordCleaner->kCleaner($businessString);
		$busniessArray = $keywordCleaner->pieces;
	}
	
	$pl=0;
	//state
	if($stateID!='52'&&$cityID!='52'&&$keywordString=='X10'&&$businessString=='X10'){
		$fetchUsers = mysql_query("SELECT * FROM barter_users WHERE state = $stateID ORDER BY username") or die('X10');
		while($aResults = mysql_fetch_array($fetchUsers, MYSQL_NUM)){
			$fetchedUArray[$pl][0] = $aResults[2];
			$fetchedUArray[$pl][1] = $userLinkInfo->reviewTallies($aResults[0]);//user link info
			$pl++;
		}
		
	
	}
	//username
	if($stateID=='52'&&$cityID=='52'&&$keywordString!='X10'&&$businessString=='X10'){
		$fetchUsers = mysql_query("SELECT * FROM barter_users") or die('X10');
		
		while($aResults = mysql_fetch_array($fetchUsers, MYSQL_NUM)){
			for($i=0; $i<count($keywordArray); $i++){
				$uSearch = stripos($aResults[2], $keywordArray[$i]);
				if($uSearch!==false && in_array($aResults[0], $fetchedIDS)==false){
					$fetchedUArray[$pl][0] = $aResults[2];//username
					$fetchedUArray[$pl][1] = $userLinkInfo->reviewTallies($aResults[0]);//user link info
					$fetchedIDS[$pl] = $aResults[0];//userid
					$pl++;
				}
			}
			
		}
	
	}
	
	//business
	if($stateID=='52'&&$cityID=='52'&&$keywordString=='X10'&&$businessString!='X10'){
		$fetchUsers = mysql_query("SELECT * FROM barter_users") or die('X10');
		
		while($aResults = mysql_fetch_array($fetchUsers, MYSQL_NUM)){
			for($i=0; $i<count($busniessArray); $i++){
				$bSearch = stripos($aResults[14], $busniessArray[$i]);
				if($bSearch!==false && in_array($aResults[0], $fetchedIDS)==false){
					$fetchedUArray[$pl][0] = $aResults[2];
					$fetchedUArray[$pl][1] = $userLinkInfo->reviewTallies($aResults[0]);//user link info
					$fetchedIDS[$pl] = $aResults[0];//userid
					$pl++;
				}
			}
			
			
		}
	
	}
	
	if(count($fetchedUArray)>0){
		echo json_encode($fetchedUArray);
	}else{
		echo 'noMatches';
	}
}

?>