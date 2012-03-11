var fetchStateObject = {
fetchStateArray:function(whichPage){
		var thePage = whichPage;
	switch(Modernizr.localstorage){//if browser supports localStorage
				case true:
				//go get the most current version number
					$.ajax({
					   type:'POST',
					   url:'control/versionControl.php',
					    data:'version=state_version',
					   success: function(currentVersion){
						 var curVerState = $.trim(currentVersion);
						 
								if(localStorage.getItem('zoofaroo_state_version') !== null){
									//go get client side current version number
										   var clientVerState = localStorage.getItem('zoofaroo_state_version');
										  
										   if(curVerState==clientVerState){
											  //versions up to date, continue...
											 
											  //if states are in localstorage
											  if(localStorage.getItem('zoofaroo_states') !== null){
												  
											  //retrieve states array from localStorage
												var retrievedStates = localStorage.getItem('zoofaroo_states');
												var parsedStates = JSON.parse(retrievedStates); 
												
												switch(thePage){
										
													   case'post':
															displayStatesObject.displayStates(parsedStates, 'post');//display states list
														break;	
													   case'edit':
															displayStatesObject.displayStates(parsedStates, 'edit');//display states list
														break;	
													   case'register':
															displayStatesObject.displayStates(parsedStates, 'register');//display states list
														break;	
													   case'AdvSearch':
															displayStatesObject.displayStates(parsedStates, 'AdvSearch');//display states list
														break;		
													   case'quickSearch':
															quickSearchDisplayStates.displayStates(parsedStates);//sends state array to quicksearch
														break;
													   case'home':
														  displayStates(parsedStates); //sends state array to home 
														  break;
														case'default':
															checkStateStatus(parsedStates);
															break;
													   }
												}else{//states not found on local storage
													//fetch states from DB then commit results to localStorage
													fetchStates(true);								  
											  }
													   
											   
										   }else{//version numbers do not match
											//fetch states from DB then commit results to localStorage
												fetchStates(true);   
										   }		
								}else{//no version number found
									//fetch states from DB then commit results to localStorage
									fetchStates(true);
								}
								localStorage.setItem('zoofaroo_state_version',curVerState); 
						}//success
									   
					});//ajax
				
					break;
				default:
					//if browser does not support localStorage
					fetchStates(false);
					break;
				}
				

				function fetchStates(setStates){
					
				$.ajax({
					   type:'POST',
					   url:'control/pageQuery.php',
					   data:'page=home',
					   success: function(homeResults){
						   if(homeResults!='X10'){
								  homeResults = jQuery.parseJSON(homeResults);
														 
								   switch(thePage){
										
								   case'post':
										displayStatesObject.displayStates(homeResults, 'post');//display states list
									break;	
								   case'edit':
										displayStatesObject.displayStates(homeResults, 'edit');//display states list
									break;	
								   case'register':
										displayStatesObject.displayStates(homeResults, 'register');//display states list
									break;	
								   case'AdvSearch':
										displayStatesObject.displayStates(homeResults, 'AdvSearch');//display states list
									break;		
								   case'quickSearch':
										quickSearchDisplayStates.displayStates(homeResults);//sends state array to quicksearch
									break;
								   case'home':
									  displayStates(homeResults); //sends state array to home 
									  break;
								   case'default':
									checkStateStatus(homeResults);
									break;  
								   }
								   
								   //commit results to localStorage
								   if(setStates && Modernizr.localstorage){
									   try {
									 		localStorage.setItem('zoofaroo_states',JSON.stringify(homeResults));
									 	} catch (e) {if(e=='Error: QUOTA_EXCEEDED_ERR: DOM Exception 22'){
	 									 	alert('An error has occured while loading page.  This site utlizes HTML 5\'s local storage to speed up page loading.  Please check to make sure that your browser is not in \'Private Browsing\' mode.'); //data wasn't successfully saved due to quota exceed so throw an error
									 	}
								}  
								   }
						   }else{
							 alertObject.alertBox('ALERT!', errorAlrt, 'ferror', errorReset, null, null);   
						   }
					   }
					   
					   });
				}
}
};