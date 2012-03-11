<?
include_once('../includes/connect.php');
///this is the xml generator
$states = array();
$statesID = array();
$cities = array();
$citiesID = array();
$stateCity = array();
$categories = array();
$sA = 0;
$cA = 0;
$catA = 0;
$fin = 0;
$fetchStates = mysql_query("SELECT * FROM barter_states");
while($fetchStatesArray = mysql_fetch_array($fetchStates)){
	echo htmlspecialchars('<url><loc>http://www.zoofaroo.com/'.$fetchStatesArray['state'].'.html</loc></url>').'<br/>';
	$states[$sA] = $fetchStatesArray['state'];
	$statesID[$sA] = $fetchStatesArray['state_id'];
	$sA++;
}
for($i=0; $i<count($states); $i++){
$fetchCities = mysql_query("SELECT * FROM barter_cities WHERE state_id = '$statesID[$i]'");
			while($fetchCitiesArray = mysql_fetch_array($fetchCities)){
					echo htmlspecialchars('<url><loc>http://www.zoofaroo.com/'.$states[$i].'/'.$fetchCitiesArray['city'].'.html</loc></url>').'<br/>';
					$stateCity[$cA] = '<url><loc>http://www.zoofaroo.com/'.$states[$i].'/'.$fetchCitiesArray['city'].'';
					//$cities[$cA] = $fetchCitiesArray['city'];
					//$citiesID[$cA] = $fetchCitiesArray['city_id'];
					$cA++;
			}
}

$fetchCategories = mysql_query("SELECT * FROM barter_categories");
				while($fetchCategoriesArray = mysql_fetch_array($fetchCategories)){
					if($fetchCategoriesArray['category']!=NULL){
						$categories[$catA] = $fetchCategoriesArray['category'];
						$catA++;
					}
				}
				
for($j=0; $j<count($stateCity); $j++){
	for($k=0; $k<count($categories); $k++){
		echo htmlspecialchars($stateCity[$j].'/Offered/'.$categories[$k].'.html</loc></url>').'<br/>';
		echo htmlspecialchars($stateCity[$j].'/Needed/'.$categories[$k].'.html</loc></url>').'<br/>';
	}
}

?>