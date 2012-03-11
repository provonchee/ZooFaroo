<?php

class singleCheck {
	
	public $singleMatchResult;
	public $singleResults=array(NULL);
	
	public function __construct($varName, $servVarName){

		  $varName = mysql_real_escape_string(filter_var($varName, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES));
			$varName = "'".stripslashes($varName)."'";
			
		$fetchSingleData = mysql_query("SELECT * FROM barter_users WHERE $servVarName=$varName") or die('X10');
		
		$rowsNum = mysql_num_rows($fetchSingleData);
		
			
			//if the *whatever* is in the system continue on with the posting
				if($rowsNum>0){
					$this->singleMatchResult = 'houstonMatch';
					
					$fetchSingleDataArray = mysql_fetch_array($fetchSingleData, MYSQL_NUM);
					$this->singleResults[0]=$fetchSingleDataArray[0];//id
					$this->singleResults[1]=$fetchSingleDataArray[1];//email
					$this->singleResults[2]=$fetchSingleDataArray[2];//name
					$this->singleResults[3]=$fetchSingleDataArray[3];//ps
					$this->singleResults[4]=$fetchSingleDataArray[4];//randKey
					$this->singleResults[5]=$fetchSingleDataArray[5];//secCode
					$this->singleResults[6]=$fetchSingleDataArray[6];//city
					$this->singleResults[7]=$fetchSingleDataArray[7];//state
					$this->singleResults[8]=$fetchSingleDataArray[8];//buisness
					$this->singleResults[9]=$fetchSingleDataArray[9];//fb
					$this->singleResults[10]=$fetchSingleDataArray[10];//twitter
					$this->singleResults[11]=$fetchSingleDataArray[11];//google
					$this->singleResults[12]=$fetchSingleDataArray[12];//linkedin
					$this->singleResults[13]=$fetchSingleDataArray[13];//url
					$this->singleResults[14]=$fetchSingleDataArray[14];//business name
					
				}else{
					$this->singleMatchResult = 'X10';
				}
	}
				
}
?>