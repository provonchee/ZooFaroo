<?php
	$pass = $_REQUEST['pass'];
	
	
	function __autoload($class_name) {
    	include '../classes/'.$class_name . '.php';
	}
	
	
	function decipherit($cpw){
				$decipherAction = new decipherAction();
				$decipherAction->decipher($cpw);
				print($decipherAction->unCodedPw);
	}
	
	decipherit($pass);
	
?>