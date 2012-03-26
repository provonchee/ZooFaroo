<?php

class editList extends getReviews{
	
	protected $editID=NULL;
	protected $editName=NULL;
	protected $editPass=NULL;
	protected $editEmail=NULL;
	protected $editCity=NULL;
	protected $editState=NULL;
	protected $editBusiness=NULL;
	protected $editFB=NULL;
	protected $editTW=NULL;
	protected $editGPlus=NULL;
	protected $editLinkedIn=NULL;
	protected $editURL=NULL;
	protected $editURLSuf=NULL;
	protected $editBusName=NULL;
	public $editArray = array(NULL);
	
	function eList($variable, $page){
		if(ctype_alnum($variable)){//make sure all of these are either letters and/or numbers
		switch($page){
			case 'editInfo':
				$singleCheck = new singleCheck($variable,"username");
				break;
			
			case 'userInfo':
				$singleCheck = new singleCheck($variable,"username");
				break;
			
			default:
				$singleCheck = 'X10';
				break;
			}
			
			switch($singleCheck->singleMatchResult){
			
			case 'X10':
			$this->editArray[0][0] = 'X10';
			break;
		
			default:
			$this->fetchUserInfo($page, $singleCheck->singleResults);
			break;
			}
		}else{
			die('X10');//vars are not numeric, kill it
		}//confirm numeric
	}
	
	function fetchUserInfo($page, $results){
		
		$this->editID = $results[0];
		$this->editName = $results[2];
		
		if($page=='editInfo'){
		$this->editEmail = $results[1];
		$this->editPass = $results[3];
		//decode server side passw
		$decipherAction = new decipherAction();
		$decipherAction->decipher($this->editPass);
		$this->editPass = $decipherAction->unCodedPw;
		//code password for client side storage
		$cipherActionClient = new cipherActionClient();
		$cipherActionClient->cipherClient($this->editPass);
		$this->editPass = $cipherActionClient->codedClientPw;
		}else if($page=='userInfo'){
			$this->editEmail = NULL;
			$this->editPass = NULL;
		}
		
		$this->editCity = $results[6];
		$this->editState = $results[7];
		$this->editBusiness = $results[8];
		$this->editFB = $results[9];
		$this->editFB = substr($this->editFB, 24);
		$this->editTW = $results[10];
		$this->editTW = substr($this->editTW, 23);
		$this->editGPlus = $results[11];
		$this->editGPlus = substr($this->editGPlus, 24);
		$this->editLinkedIn = $results[12];
		$this->editLinkedIn = substr($this->editLinkedIn, 24);
		$this->editURL = $results[13];
		$this->editURLSuf = substr($this->editURL, -5);
		$this->editURL = substr($this->editURL, 11, -5);
		$this->editBusName = $results[14];
		
		$listRetrieval = new grabPosts("offered.user_id = '$this->editID'", 'offered');
		if($listRetrieval->fetchedArray[0][19]!=0){//numrows
			$offeredPosts = $listRetrieval->fetchedArray;
		}else{
			$offeredPosts = 'noOffers';
		}
		
		$listRetrieval = new grabPosts("needed.user_id = '$this->editID'", 'needed');
		if($listRetrieval->fetchedArray[0][19]!=0){//numrows
			$neededPosts = $listRetrieval->fetchedArray;
		}else{
			$neededPosts = 'noNeeds';
		}
		$userInfoArray = array($this->editID, $this->editName, $this->editEmail, $this->editPass, $this->editCity, $this->editState, $this->editBusiness, $this->editFB, $this->editTW, $this->editGPlus, $this->editLinkedIn, $this->editURL, $this->editURLSuf, $this->editBusName);//user data
		
		$this->editArray[0] = $offeredPosts;
		$this->editArray[1] = $neededPosts;
		$this->editArray[2] = $userInfoArray;
		
		if($page=='userInfo' || $page=='editInfo'){//go get the reviews
			$this->totalReviews($this->editArray[2][0]);//retreive it with the user's id
			$this->editArray[3] = $this->reviewData;  //for user page--tack on the reviews
		}
		
	}
}
?>