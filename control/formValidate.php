<?php
//php_flag magic_quotes_gpc Off
include_once('../includes/connect.php');

$keyKey=array(NULL);
$form = $_REQUEST['form'];
$r=0;
$keys= array();
$newKeys= array();

//parse form data into an array
while ($formList = current($form)) {
        $keys[$r] = key($form);
		$newKeys[$r] = substr(key($form), 0, 1);//make the first letter of each the new key
    	$r++;
		next($form);
}

function stringEscape($stringer){
	$stringer = filter_var($stringer, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
	if($stringer != FALSE){
			return $stringer;
		}else{
			die('X10');
		}	
}

//sanatize the strings and mysql escape them
function realEscape($stringer){

		if (get_magic_quotes_gpc()){
				$stringer = stripslashes(stringEscape($stringer));
		  }
		  $stringer = "'".mysql_real_escape_string(stringEscape($stringer))."'";
		  return $stringer;	
}

//sanatize the arrays and mysql escape them
function arrayEscape($stringer){
	
		if (get_magic_quotes_gpc()){
				$stringer = stripslashes(stringEscape($stringer));
		  }
		  $stringer = mysql_real_escape_string(stringEscape($stringer));
		  return $stringer;	
}


function emailerEscape($emailer){
	$emailer = filter_var($emailer, FILTER_VALIDATE_EMAIL);
		if($emailer != FALSE){
			if (get_magic_quotes_gpc()){
						$emailer = stripslashes($emailer);
			}
		  $emailer = "'".mysql_real_escape_string($emailer)."'";
		  return $emailer;
		}else{
			die('X10');
		}
}

function intEscape($int){
	$int = filter_var($int, FILTER_VALIDATE_INT);
	if($int != FALSE){
		return $int;
	}else{
		die('X10');
	}
	
}

function boolEscape($boo){
	if($boo =='false' || $boo =='true'){
		return $boo;
	}else{
		die('X10');
	}
	
}

function urlEscape($url){
	
	if($url!='null'){
		$url=html_entity_decode($url);
		//regex to check for multiple 'http', '.com', '.co', 'www.', '.org', '.biz', '.net', '.gov', '.edu'
		$ctr=0;
		$ptn=array("/[http]{4}/","/[w]{3}[\.]{1}/","/(\.{1})[a-zA-Z]{2,3}(\W{1}|$)/");
		$found=0;
		foreach($ptn as $key){
			preg_match_all($ptn[$ctr], $url, $matches, PREG_PATTERN_ORDER);
			if(count($matches[0])>1){
				die('X10');
			}else if(count($matches[0])==1 && $ctr>=2){
				$found++;
			}
			if($found>1){
				$found=0;
				die('X10');
			}
			$ctr++;
		}
	
		$url = filter_var($url, FILTER_VALIDATE_URL);
			if($url!=FALSE){
				if (get_magic_quotes_gpc()){
						$url = stripslashes($url);
				}
		  		$url = "'".mysql_real_escape_string($url)."'";
				
				return $url;
			}else{
				die('X10');	
			}
	}else{
		return $url;
	}
}

//our filter library
$strFilter=array("filter"=>FILTER_CALLBACK, "flags"=>FILTER_FLAG_ARRAY|FILTER_NULL_ON_FAILURE, "options"=>"stringEscape");
$realFilter=array("filter"=>FILTER_CALLBACK, "flags"=>FILTER_FLAG_ARRAY|FILTER_NULL_ON_FAILURE, "options"=>"realEscape");
$arrFilter=array("filter"=>FILTER_CALLBACK, "flags"=>FILTER_FLAG_ARRAY|FILTER_NULL_ON_FAILURE, "options"=>"arrayEscape");
$intFilter=array("filter"=>FILTER_CALLBACK, "flags"=>FILTER_FLAG_ARRAY|FILTER_NULL_ON_FAILURE, "options"=>"intEscape");
$emailerFilter=array("filter"=>FILTER_CALLBACK, "flags"=>FILTER_FLAG_ARRAY|FILTER_NULL_ON_FAILURE, "options"=>"emailerEscape");
$boolFilter=array("filter"=>FILTER_CALLBACK, "flags"=>FILTER_FLAG_ARRAY|FILTER_NULL_ON_FAILURE, "options"=>"boolEscape");
$urlFilter=array("filter"=>FILTER_CALLBACK, "flags"=>FILTER_FLAG_ARRAY|FILTER_NULL_ON_FAILURE, "options"=>"urlEscape");

//populate the master filter array based upon the type (string, int, etc) 
$filters = array();
$arrayFilter = array();
$arrayForm = array();

$cc=0;

for($f=0; $f<count($keys); $f++){
	
	if($newKeys[$f]=='d'){//string
		$filters[$keys[$f]]=$strFilter;
	}else if($newKeys[$f]=='i'){//int
		$filters[$keys[$f]]=$intFilter;
	}else if($newKeys[$f]=='s'){//special string
		$filters[$keys[$f]]=$realFilter;
	}else if($newKeys[$f]=='e'){//email
		$filters[$keys[$f]]=$emailerFilter;
	}else if($newKeys[$f]=='b'){//boolean
		$filters[$keys[$f]]=$boolFilter;
	}else if($newKeys[$f]=='u'){//url
		$filters[$keys[$f]]=$urlFilter;
	}else if($newKeys[$f]=='a'){//array
		//arrays go here
		if($form['di']=='edit'){
			$arrayForm[$cc] = $form[$keys[$f]];
			for($af=0; $af<count($arrayForm[$cc]); $af++){
				$ac='s'.(string)($af+1);
				$arrayFilter[$ac] = $arrFilter;
			}
			$cc++;
		}else if($form['di']=='post'){
			$arrayForm[$cc] = $form[$keys[$f]];
			for($af=0; $af<count($arrayForm[$cc]); $af++){
				$ac='a'.(string)($af+1);
				$arrayForm[$cc][$ac] = $arrayForm[$cc][$af];//changes keys
				unset($arrayForm[$cc][$af]);
				$arrayFilter[$ac] = $arrFilter;
			}
			$cc++;
		}
			
	}
	
}

$filtered_array = filter_var_array($form, $filters);

//take the filtered array and merry the filtered array arrays(if applicable)
$afa=0;
foreach($arrayForm as $key){
$array_filtered_array[$afa] = filter_var_array($arrayForm[$afa], $arrayFilter);
array_push($filtered_array, $array_filtered_array[$afa]);
$afa++;
}
unset($key);

	$fileName = str_replace("'", "", $filtered_array['di']);
	include_once('../control/'.$fileName.'Input.php');
	$dataFunction = ''.$fileName.'';
	$dataFunction($filtered_array);
	//echo json_encode($filtered_array);
?>