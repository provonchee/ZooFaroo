<?
include_once('../includes/connect.php');

function photoCancel($photoCancelForm){
	$photoName = $photoCancelForm['s1']; 
	$chosenUserID = $photoCancelForm['i1'];
	$ssSec = $photoCancelForm['s2'];
	$removeType = str_replace("'", "", $photoCancelForm['s3']);
	$stateID = $photoCancelForm['i2'];
	$postID = $photoCancelForm['i3'];
	$photoName = str_replace("'", "", $photoName);

	$fetchUserInfo = mysql_query("SELECT * FROM barter_users WHERE user_id=$chosenUserID && secCode=$ssSec") or die('X10');

	$numRows = mysql_num_rows($fetchUserInfo);
	
	if($numRows==1){
		if($removeType=='rState'){//means the photo resides onthe db and the user is changing it
  				unlink("../photos/".$stateID."/".$photoName."");//if it's in the regular folder, go ahead and delete it---the middle variable os the state id for this posting
		}else if($removeType=='rTemp'){
  			unlink("../photos/tempPhotos/".$photoName."");//if it's in the temp folder, go ahead and delete it
		}	
	}else{
		echo 'X10';
	}
}
?>