<?php

class activation {


public $linkInfo = array();
public $response;

function activate($userID, $key, $kind){//the $userID argument can be either the userID OR the actual username, ID for the 'post' and NAME for the 'user'
	if($kind=='post'){
		$this->linkInfo[0][0] = 'notFound';
		$this->linkInfo[1][0] = 'notFound';
		static $al = 0;
			$offeredClear = mysql_query("SELECT offered.posting_id, cat.category, statie.state, citie.city, offered.title, offered.city_id, offered.category_id
										 FROM barter_offered AS offered 
										 INNER JOIN barter_categories AS cat
										 ON cat.category_id = offered.category_id
										 INNER JOIN barter_states AS statie
										 ON statie.state_id = offered.state_id
										 INNER JOIN barter_cities as citie
										 ON citie.city_id = offered.city_id
										 WHERE user_id = $userID AND secCode = $key") or die('X10');
			
			
			
			$neededClear = mysql_query("SELECT needed.posting_id, cat.category, statie.state, citie.city, needed.title, needed.city_id, needed.category_id 
										 FROM barter_needed AS needed 
										 INNER JOIN barter_categories AS cat
										 ON cat.category_id = needed.category_id
										 INNER JOIN barter_states AS statie
										 ON statie.state_id = needed.state_id
										 INNER JOIN barter_cities as citie
										 ON citie.city_id = needed.city_id
										 WHERE user_id = $userID AND secCode = $key") or die('X10');
						
			$oNumRows = mysql_num_rows($offeredClear);
			
			$nNumRows = mysql_num_rows($neededClear);
			$emailNotesAction = new emailNotesAction();
			if($oNumRows>0){
			
			while($oNumRows = mysql_fetch_array($offeredClear, MYSQL_NUM)){
										
							$this->linkInfo[$al][0] = $oNumRows[0];//postingID
							$this->linkInfo[$al][1] = 'Offered';
							$this->linkInfo[$al][2] = $oNumRows[2];//state
							$this->linkInfo[$al][3] = $oNumRows[3];//city
							$this->linkInfo[$al][4] = $oNumRows[1];//category
							
							//OFFERED
							mysql_query("UPDATE barter_offered SET posting_date = CURDATE() WHERE secCode = $key AND posting_id = '$oNumRows[0]'") or die('X10');
							mysql_query("UPDATE barter_offered SET secCode = 'clear' WHERE secCode = $key AND posting_id = '$oNumRows[0]'") or die('X10');
							$emailNotesAction->emailNotes("needed", $oNumRows[0], $oNumRows[2], $oNumRows[3], $oNumRows[1], $oNumRows[4], $oNumRows[5], $oNumRows[6], $userID);//send emails to users who have requested them
							$al++;
			}//while loop
			}else{
				$this->linkInfo[0][0] = 'alreadyCleared';
			}
			
			if($nNumRows>0){
			
			while($nNumRows = mysql_fetch_array($neededClear, MYSQL_NUM)){
										
							$this->linkInfo[$al][0] = $nNumRows[0];//postingID
							$this->linkInfo[$al][1] = 'Needed';
							$this->linkInfo[$al][2] = $nNumRows[2];//state
							$this->linkInfo[$al][3] = $nNumRows[3];//city
							$this->linkInfo[$al][4] = $nNumRows[1];//category
							
							//NEEDED
							mysql_query("UPDATE barter_needed SET posting_date = CURDATE() WHERE secCode = $key AND posting_id = '$nNumRows[0]'") or die('X10');
							mysql_query("UPDATE barter_needed SET secCode = 'clear' WHERE secCode = $key AND posting_id = '$nNumRows[0]'") or die('X10');
							$emailNotesAction->emailNotes('offered', $nNumRows[0], $nNumRows[2], $nNumRows[3], $nNumRows[1], $nNumRows[4], $nNumRows[5], $nNumRows[6], $userID);//send emails to users who have requested them
							$al++;
			}//while loop
			}else{
				$this->linkInfo[1][0] = 'alreadyCleared';
			}
			
	}else if($kind=='user'){
		$ssSec = str_replace("'","",$userID).'^'.str_replace("'","",$key);
		$ssSecServ = mysql_query("SELECT * FROM barter_users WHERE randKey=$key AND secCode='$ssSec'");
		$ssSecServRow = mysql_num_rows($ssSecServ);
		if($ssSecServRow==1){
				mysql_query("UPDATE barter_users SET secCode = 'first' WHERE secCode = '$ssSec' AND randKey = $key") or die('X10');
				$this->reponse = '1';//everything is good, registration completed
		}else{
			$ssSecServ = mysql_query("SELECT * FROM barter_users WHERE randKey = $key && secCode = 'first'") or die('X10');
			$ssSecServRow = mysql_num_rows($ssSecServ);
			if($ssSecServRow==1){//user has already successfully registered but has accidentially returned to the activations page
					mysql_query("UPDATE barter_users SET secCode = NULL WHERE randKey = $key") or die('X10');
				$this->reponse = '2';
			}else{
			//someone trying to access the page who has not gone through the register process
				$this->reponse =  '0';
			}
		}
		
	}//kind conditional

}//activate

}
?>