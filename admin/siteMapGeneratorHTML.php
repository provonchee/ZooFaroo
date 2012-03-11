<?
include_once('../includes/connect.php');
///this is the html generator
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
echo htmlentities("<div id='siteMap-title'>SiteMap&nbsp;|&nbsp;ZooFaroo</div>");
$fetchStates = mysql_query("SELECT * FROM barter_states");
while($fetchStatesArray = mysql_fetch_array($fetchStates)){
	$states[$sA] = $fetchStatesArray['state'];
	$statesID[$sA] = $fetchStatesArray['state_id'];
	$sA++;
}
				
for($j=0; $j<count($states); $j++){
		
	echo htmlentities('<div id="siteMap-state">');
	
	echo htmlentities('<hr /><hr />');

	//state name
	echo htmlentities('<a href="'.$baseHref.$states[$j].'.html"><div id="siteMap-stateName">'.str_replace('_', ' ', $states[$j]).'</div></a>');
	//city names
	$fetchCities = mysql_query("SELECT * FROM barter_cities WHERE state_id = '$statesID[$j]'");
			while($fetchCitiesArray = mysql_fetch_array($fetchCities)){
					echo htmlentities('<a href="'.$baseHref.$states[$j].'/'.$fetchCitiesArray['city'].'.html"><div id="siteMap-cityName">'.str_replace('_', ' ', $fetchCitiesArray['city']).'</div></a>');
					$cities[$cA] = $fetchCitiesArray['city'];
					
					echo htmlentities('<div id="siteMap-oN">'.str_replace('_', ' ', $states[$j]).'&nbsp;&rarr;&nbsp;'.str_replace('_', ' ', $cities[$cA]).'&nbsp;&rarr;&nbsp;Offered:</div>');
					
					echo htmlentities('<div id="siteMap-categories">');
					
					//categories
					$fetchCategories = mysql_query("SELECT * FROM barter_categories");
					while($fetchCategoriesArray = mysql_fetch_array($fetchCategories)){
						if($fetchCategoriesArray['category']!=NULL){
								echo htmlentities('<div style="display:inline; margin-right:20px;"><a href="'.$baseHref.$states[$j].'/'.$cities[$cA].'/Offered/'.$fetchCategoriesArray['category'].'.html">'.str_replace('_', ' ', $fetchCategoriesArray['category']).'</a></div>');
						}
					}
					echo htmlentities('</div>');//cats
					
					
					echo htmlentities('<div id="siteMap-oN">'.str_replace('_', ' ', $states[$j]).'&nbsp;&rarr;&nbsp;'.str_replace('_', ' ', $cities[$cA]).'&nbsp;&rarr;&nbsp;Needed:</div>');
					
					echo htmlentities('<div id="siteMap-categories">');
					
					//categories
					$fetchCategories = mysql_query("SELECT * FROM barter_categories");
					while($fetchCategoriesArray = mysql_fetch_array($fetchCategories)){
						if($fetchCategoriesArray['category']!=NULL){
								echo htmlentities('<div style="display:inline; margin-right:20px;"><a href="'.$baseHref.$states[$j].'/'.$cities[$cA].'/Needed/'.$fetchCategoriesArray['category'].'.html">'.str_replace('_', ' ', $fetchCategoriesArray['category']).'</a></div>');
						}
					}

					$cA++;
					
					echo htmlentities('</div>');//cats
			}
	echo htmlentities('<hr /><hr />');		
	echo htmlentities('</div>');
}
echo htmlentities('</div><!--separator--></div><!--mainBase-->');
?>