<?
include('connect.php');
include('theArrays.php');

$ft=0;
//CATEGORIES
//services
/*foreach($services as $value){
	if($services[$ft]){
	mysql_query("INSERT INTO barter_categories (category, parent_category) VALUES ('$services[$ft]', 's')");
	echo $services[$ft].'<br/>';
	$ft=$ft+2;
	}
}*/
//goods
/*foreach($goods as $value){
	if($goods[$ft]){
	mysql_query("INSERT INTO barter_categories (category, parent_category) VALUES ('$goods[$ft]', 'g')");
	echo $goods[$ft].'<br/>';
	$ft=$ft+2;
	}
}*/


//STATES
/*for($j=0; $j<count($states); $j++){
		$nState = $states[$j];
		mysql_query("INSERT INTO barter_states (state) VALUES ('$nState')");
		echo $nState.'<br/>';
}*/



//CITIES
for($j=0; $j<count($states); $j++){
	$tick = $j+1;
	for($i=0; $i<count(${$states[$j]}); $i++){
		$nCity = str_replace(" ", "_", ${$states[$j]}[$i]);
		mysql_query("INSERT INTO barter_cities (state_id, city) VALUES ('$tick', '$nCity')");
		echo $tick.''.$nCity.'<br/>';
	}
}

//CREATES THE STATES ARRAYS WITH CITIES
/*for($i=2; $i<count($states); $i++){
	for($j=0; $j<count(${$states[$i]}); $j++){
		if($j==0){
			echo ');<br/><br/>$'.$states[$i].' = array(\''.mb_convert_case(${$states[$i]}[$j], MB_CASE_TITLE, "UTF-8").'\', ';
		}else{
			echo '\''.mb_convert_case(${$states[$i]}[$j], MB_CASE_TITLE, "UTF-8").'\', ';
		}
		
	}
}*/
?>
