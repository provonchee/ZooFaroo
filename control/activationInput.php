<?
function activation($activationForm){
	
	function __autoload($class_name) {
    	include '../classes/'.$class_name . '.php';
	}
	
	$page = str_replace("'","",$activationForm['s1']);
	$key = $activationForm['s2'];
	
	if($page=='user'){
	
		$ssSec = $activationForm['s3'];

		$activation = new activation();
		$activation->activate($ssSec, $key, 'user');
		echo $activation->reponse;
		
	}else if($page=='post'){
		
		$userID = $activationForm['s3']; 
		
		$activation = new activation();
		$activation->activate($userID, $key, 'post');
		echo json_encode($activation->linkInfo);
	
	}
	
		
}


?>