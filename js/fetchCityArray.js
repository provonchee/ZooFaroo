var fetchCityObject = {
fetchCityArray:function(state, citiesDropDown){
	switch(Modernizr.localstorage){//if browser supports localStorage
	case true:
	//go get the most current version number
	$.ajax({
	   type:'POST',
	   url:'control/versionControl.php',
	   data:'version=city_version',
	   success: function(currentVersion){
		 var curVerCity = $.trim(currentVersion);
				if(localStorage.getItem('zoofaroo_city_version') !== null){
					//go get client side current version number
						   var clientVerCity = localStorage.getItem('zoofaroo_city_version');
						   
						   if(curVerCity==clientVerCity){
							  //versions up to date, continue...
							 if(localStorage.getItem("zoofaroo_"+state+"_cities") !== null){//if cities array is found in localStorage
								var retrievedCities = localStorage.getItem("zoofaroo_"+state+"_cities");
								var parsedCities = JSON.parse(retrievedCities);
								if(citiesDropDown){
									displayCitiesObject.displayCities(parsedCities);
								}else{
									displayCities(parsedCities);
								}
							}else{//if cities array is not found in localStorage
								fetchCities(state, true);//query db for cities and then commit to local storage
							}
							
						 }else{//version numbers do not match
								fetchCities(state, true);//query db for cities and then commit to local storage
						}
				}else{//no version number found
					fetchCities(state, true);//query db for cities and then commit to local storage
				}
				localStorage.setItem('zoofaroo_city_version',curVerCity);
			}//success
									   
	});//ajax
	break;
	
	default://browser does not support localStorage
	fetchCities(state, false);//query db for cities but DO NOT commit to local storage
	break;
	}//Modernizr
			
			
	function fetchCities(state, setCities){
		$.ajax({
			   type:'POST',
			   url:'control/pageQuery.php',
			   data:'page=state&state='+state,
			   success: function(stateResults){
				   if(stateResults!='X10'){
				   stateResults = jQuery.parseJSON(stateResults);
				   
				   if(stateResults[0][0]!='X10'){
				   		if(citiesDropDown){
							displayCitiesObject.displayCities(stateResults);
						}else{
							displayCities(stateResults);
						}
						
						if(setCities && Modernizr.localstorage){
							try {
							 	localStorage.setItem("zoofaroo_"+state+"_cities",JSON.stringify(stateResults));
							 } catch (e) {if(e=='Error: QUOTA_EXCEEDED_ERR: DOM Exception 22'){
	 									 	alert('An error has occured while loading page.  Please check to make sure that your browser is not in \'Private Browsing\' mode.'); //data wasn't successfully saved due to quota exceed so throw an error
									 	}
								}
						}
				   }else{//if nothing returned
					  alertObject.alertBox('ALERT!', errorAlrt, 'ferror', errorReset, null, null); 
				   }
				   
				   }else{
					 alertObject.alertBox('ALERT!', errorAlrt, 'ferror', errorReset, null, null);   
				   }
			   }
			   });
		}//fetchCities
}
}