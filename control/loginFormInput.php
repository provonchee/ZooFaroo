<?
function loginForm($loginForm){
	
	
	$username = $loginForm['d1'];
	$password = $loginForm['d2'];
	$org = $loginForm['d3'];
	
	$loginData = array();
	array_push($loginData, $username, $password, $org);
	
	echo json_encode($loginData);
}
?>