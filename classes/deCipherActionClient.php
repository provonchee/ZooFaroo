<?php
class deCipherActionClient {
	
	
	public $unCodedClientPw = NULL;
	protected $dcodedPassWordSectionClient = array();
	protected $dcodedPasswordSectionCleanedClient = array();
	protected $cscEndPoint = NULL;
	protected $cscStartPoint = NULL;

	function decipherClient($dpwc){
		include_once("../includes/alphaDecipherClient.php");
	$clientCipher = '6842351970';
	$clientCipherArray = str_split($clientCipher);
	
	//DECODE
		$w=0;
		//separate the coded pasword into it's appropriate chunks
		for($g=0; $g<strlen($dpwc)/2; $g++){
			$this->cscEndPoint = 2;//end point of section to remove from coded password
			$this->cscStartPoint = $w;
			$this->dcodedPassWordSectionClient[$g] = substr($dpwc, $this->cscStartPoint, $this->cscEndPoint);//separate each coded letter
			$w=$w+2;
			$this->dcodedPasswordSectionCleanedClient[$g] = intval($this->dcodedPassWordSectionClient[$g])-intval($clientCipherArray[$g]);
			for($k=0; $k<count($alphaDecipher); $k++){
				if($this->dcodedPasswordSectionCleanedClient[$g]==$alphaDecipher[$k][1]){
					$this->dcodedPasswordSectionCleanedClient[$g] = $alphaDecipher[$k][0];
				}
			}
		}
	//put it all together
		for($h=0; $h<count($this->dcodedPasswordSectionCleanedClient); $h++){
			$this->deCodedPasswordClient .= $this->dcodedPasswordSectionCleanedClient[$h];
		}
		
		$this->unCodedClientPw = $this->deCodedPasswordClient;
	}
}
?>