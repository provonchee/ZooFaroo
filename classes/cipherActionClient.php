<?php
class cipherActionClient {
	
	
	public $codedClientPw = 'NULL';

	function cipherClient($cpwc){
		include_once("../includes/alphaCipherClient.php");
	//THIS CODES PW
	$clientCipher = '6842351970';
	$clientCipherArray = str_split($clientCipher);
	$code = '';
	$passwordArrayClient = array();	
	if(ctype_alnum($cpwc) && strlen($cpwc)<=12){//is the ps alphanumeric and less than 11 chars and greater than 7 chars?
		$passwordArrayClient = str_split($cpwc);
		for($p=0; $p<count($passwordArrayClient); $p++){
			//grab coresponding number for each letter/number from the alphacipher array
			for($q=0; $q<count($alphaCipher); $q++){
				if($passwordArrayClient[$p]==$alphaCipher[$q][0]){
					$passwordArrayClient[$p]=$alphaCipher[$q][1];
					//add the ciphercodearray to the number retreived from the alphacipher
					$passwordArrayClient[$p]=$passwordArrayClient[$p]+$clientCipherArray[$p];
				}
			}
			
		}
		
		//put it all together
		for($r=0; $r<count($passwordArrayClient); $r++){
			$codedPasswordClient .= $passwordArrayClient[$r];
		}
		
		$this->codedClientPw = $codedPasswordClient;
	}else{//not alphanumeric or too long/short
		$this->codedClientPw = 'X10';	
	}
	}
}
?>