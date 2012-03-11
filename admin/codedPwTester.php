<?php
	$pass = $_REQUEST['pass'];
	
	
	function __autoload($class_name) {
    	include '../classes/'.$class_name . '.php';
	}
	
	$cipherAction = new cipherAction();
	$cipherAction->cipher($pass);
	$pass = $cipherAction->codedPw;
	echo $pass;
	
	?>
    <br/>&lt;
    
    <br/>
    <br/>
    <br/>
    <?
	
	function decipherit($cpw){
				$decipherAction = new decipherAction();
				$decipherAction->decipher($cpw);
				print($decipherAction->unCodedPw);
	}
	
	decipherit($pass);
	
?>