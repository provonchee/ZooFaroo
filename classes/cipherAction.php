<?php

class cipherAction {
	
	protected $codedPasswordRetreived = array();
	protected $codedPassWordSection = array();
	protected $codedPasswordSectionMinus = array();
	protected $codedPasswordSectionCleaned = array();
	public $codedPw = 'NULL';

	function cipher($cpw){
		include_once("../includes/alphaCipher.php");
	//THIS CODES PW
	$possible = '1234567890';
	$code = '';
	$passwordArray = array();	
	if(ctype_alnum($cpw) && strlen($cpw)<=12 && strlen($cpw)>=8){//is the ps alphanumeric and less than 11 chars and greater than 7 chars?
		$passwordArray = str_split($cpw);
		for($p=0; $p<count($passwordArray); $p++){
			//grab coresponding number for each letter/number from the alphacipher array
			for($q=0; $q<count($alphaCipher); $q++){
				if($passwordArray[$p]==$alphaCipher[$q][0]){
					$passwordArray[$p]=$alphaCipher[$q][1];
					//add the ciphercodearray to the number retreived from the alphacipher
					$passwordArray[$p]=$passwordArray[$p]+$cipherCodeArray[$p];
					//generate the tack on integer
					$numLength = $cipherCodeArray[$p];
					for ($j=0; $j < $numLength; $j++) {
						//merry the alpha cipher num with the tack on int 
						$passwordArray[$p] .= substr($possible, mt_rand(0, strlen($possible)-1), 1);
					}
				}
			}
			
		}
		
		for($r=0; $r<count($passwordArray); $r++){
			$codedPassword .= $passwordArray[$r];
		}
			$this->codedPw = $codedPassword;
	}else{//not alphanumeric or too long/short
		$this->codedPw = 'X10';	
	}
	}
}
?>