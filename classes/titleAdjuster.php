<?php
/*
Truncates any title or string so that it may fit the respective page
*/

class titleAdjuster {

function tAdjuster($category, $title, $param) {
	$catLength = strlen($category);
	$titleLength = strlen($title);
	$totaLength = $catLength+$titleLength;
		if($totaLength>=$param){
			$paramAdj = $param-$catLength;
			$title = $title." "; 
			$title = substr($title,0,$paramAdj); 
			$title = $title."...";
			return $title; 
		}else{
			return $title;
		}
    }
	
}
?>