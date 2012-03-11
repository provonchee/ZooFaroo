<?
class photoCommitAction{
public $updatedPhoto = array();
function photoCommit($chosenUserID, $chosenStateID, $photosArray){
	
$tick = 0;
foreach($photosArray as $key){
	
	$photosArray[$tick] = str_replace("'","",$photosArray[$tick]);
	
	if($photosArray[$tick]!='1'){
		
		$photosArray[$tick] = str_replace("'","",$photosArray[$tick]);
		$file_ext = strtolower(substr($photosArray[$tick], strrpos($photosArray[$tick], '.') + 1));
		
		$secCodeCreate = new secCodeCreate(6);
		$secCode = $secCodeCreate->extractcode;
		
		$ssSec = str_replace("'","",$secCode);
		$today=date("mdy");
		$newPhotoName = $chosenStateID.'_'.$chosenUserID.'_'.$today.'_'.$ssSec.'.'.$file_ext;
		
				 $photoFile = '../photos/tempPhotos/'.$photosArray[$tick].'';
				 $newPhotoFile = '../photos/'.$chosenStateID.'/'.$newPhotoName.'';
				
				if (copy($photoFile, $newPhotoFile)) {
					unlink($photoFile);
					$newPhotoName = "'".mysql_real_escape_string($newPhotoName)."'";
					array_push($this->updatedPhoto, $newPhotoName);
					$tick++;
				}else{
					unlink($photoFile);
					die('X10');
				}
		
	}else{
		
		array_push($this->updatedPhoto, '1');
		$tick++;
	}
}

}
}
?>