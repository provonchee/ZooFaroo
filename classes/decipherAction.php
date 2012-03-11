<?php
class decipherAction {
	
	protected $uncodedPassword = NULL;
	protected $dcodedPassWordSection = array();
	protected $dcodedPasswordSectionMinus = array();
	protected $dcodedPasswordSectionCleaned = array();
	public $unCodedPw = NULL;
	protected $csEndPoint = NULL;
	protected $csStartPoint = NULL;

	function decipher($dpw){
		include_once("../includes/alphaDecipher.php");
	//DECODE
	$j=0;
		//separate the coded pasword into it's appropriate chunks
		for($i=0; $i<strlen($dpw); $i++){
			$this->csEndPoint = $cipherDecodeArray[$i]+2;//end point of section to remove from coded password
			$this->csStartPoint = $j;
			$this->dcodedPassWordSection[$i] = substr($dpw, $this->csStartPoint, $this->csEndPoint);//separate each coded letter
			$j=$j+$cipherDecodeArray[$i]+2;
			$this->dcodedPasswordSectionMinus[$i] = substr($this->dcodedPassWordSection[$i],0, 2);
			$this->dcodedPasswordSectionCleaned[$i] = intval($this->dcodedPasswordSectionMinus[$i])-intval($cipherDecodeArray[$i]);
			for($k=0; $k<count($alphaDecipher); $k++){
				if($this->dcodedPasswordSectionCleaned[$i]==$alphaDecipher[$k][1]){
					$this->uncodedPassword = $this->uncodedPassword.$alphaDecipher[$k][0];
				}
			}
		}
	$this->unCodedPw = $this->uncodedPassword;
	}
}
?>