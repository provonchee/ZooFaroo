<?
$a = array();
$a[0][0] = "00";
$a[0][1] = "01";
$a[0][2] = "02";
$a[1][0] = "10";
$a[1][1] = "11";
$a[1][2] = "12";
$a[2][0] = "20";
$a[2][1] = "21";
$a[2][2] = "22";
$a[3][0] = "30";
$a[3][1] = "31";
$a[3][2] = "32";

/*function make_list($array){
	global $a;
	foreach($array as $key => $subarray){
		if(isset($a[$key])){
			foreach($a[$key] as $key => $subarray){
				echo $subarray."\n";
			}
		}
	}
}
make_list($a);*/

foreach($a as $gkey) {
		echo $gkey."\n";
	}
?>