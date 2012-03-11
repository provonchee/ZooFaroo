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