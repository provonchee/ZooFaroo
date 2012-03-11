<?
include_once('../includes/connect.php');

function __autoload($class_name) {
    include '../classes/'.$class_name . '.php';
}

$page = $_REQUEST['page'];
$state = $_REQUEST['state'];
$city = $_REQUEST['city'];
$regionName = $_REQUEST['regionName'];
$category = $_REQUEST['category'];
$categoryID = $_REQUEST['categoryID'];
$offerNeed = $_REQUEST['offerNeed'];
$postingID = $_REQUEST['postingID'];
$userID = $_REQUEST['userID'];
$stateID = $_REQUEST['stateID'];
$cityID = $_REQUEST['cityID'];
$chosenStateID = $_REQUEST['chosenStateID'];
$catsArrayLength = $_REQUEST['catsLength'];//the number of total categories
$key = $_REQUEST['key'];//utilized for user and post activation
$keywordString = $_REQUEST['keywordString'];
$ssSec = $_REQUEST['ssSec'];

///THIS GETS CALLED IF WE ARE ON THE HOME PAGE
if($page=='home'){
	$getStates = new getStates();
	
	$homePageInfo = array();
	
	for($i=0; $i<count($getStates->states); $i++){
		$homePageInfo[$i][0] = $getStates->states[$i][0];//stateID
		$homePageInfo[$i][1] = $getStates->states[$i][1];//stateName
	}
	echo json_encode($homePageInfo);
			
///THIS GETS CALLED IF WE ARE ON THE SECOND TIER STATE PAGE DISPLAYING THE CHOSEN STATE'S CITIES
}else if($page=='state'){
	$getCities = new getCities();
	$getCities->gCities();
	echo json_encode($getCities->statePageInfo);
	
///THIS GETS CALLED IF WHEN A FINAL CITY IS CHOSEN--SHOWING THE OFFERINGS AND THE NEEDS POSTS FOR THAT CITY
///THIS CAN ALSO BE CALLED WHEN A PAGE WANTS ONLY A LIST OF THE CATEGORIES, LIKE THE POST PAGE
}else if($page=='city'){
	$getCategories = new getCategories();
	$getCategories->gCategories();

	echo json_encode($getCategories->categories);
	
}else if($page=='getTallies'){///THIS IS FOR THE CITY PAGE SPECIFICALLY, TO GATHER THE NUMBER OF POSTS FOR EACH CATEGORY
	$getTallies = new getTallies();
	$getTallies->gTallies($cityID, $stateID, $catsArrayLength);
	
	echo json_encode($getTallies->tallies);
	
////THIS IS THE QUERY FOR THE LISTING PAGE, ONCE THE USER HAS CHOSEN A SPECIFIC CATEGORY, THIS PAGE WILL LIST THEM ALL BY TITLE AND DATE POSTED
}else if($page=='postList'){
		
	$getPostList = new getPostList();
	$getPostList->gPostList();
	echo json_encode($getPostList->postListArray);
	
}else if($page=='thePost'){
	
	$getThePost = new getThePost();
	$getThePost->gThePost();
	echo json_encode($getThePost->thePostArray);

}else if($page=='user'){
	$editList = new editList();
	$editList->eList($userID, 'userInfo');
	echo json_encode($editList->editArray);
	
}else if($page=='edit'){
	$editList = new editList();
	$editList->eList($userID, 'editInfo');
	echo json_encode($editList->editArray);
	
}
?>