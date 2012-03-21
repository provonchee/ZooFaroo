$('.state-image').hide();
$('.stateBase .state-menu').hide();



var myImagePR = new Image;
	myImagePR.src = "images/preloader.gif";
	$('.stateBase #preloader').append(myImagePR);
	
	fetchCityObject.fetchCityArray(chosenState, false);
	
	function displayCities(citiesArray){
		
		//globals
		chosenStateID = citiesArray[0][0];
		chosenState =  citiesArray[0][1].replace(/_/g, " ");
		chosenStateAlt = citiesArray[0][1];
		chosenCityID = 'X10';
		chosenCity =  'X10';
		chosenCityAlt = 'X10';
		chosenCategoryID = 'X10';
		chosenOfferNeed = 'X10';
		   
		   $('.state-image').html('<img name="n20" src="images/states/'+citiesArray[0][0]+'.gif" class="state-image" id="n'+citiesArray[0][0]+'" usemap="#m_'+citiesArray[0][0]+'" alt="'+chosenState+'" /><map name="m_'+citiesArray[0][0]+'" id="m_'+citiesArray[0][0]+'"></map>');
		   if(citiesArray[0][1]==citiesArray[0][3]){
			   window.open(''+baseHref+''+citiesArray[0][1]+'/'+citiesArray[0][3]+'.html', '_self');
		   }
		   
		   
		   var s=1;
		   for(var i=0; i<(citiesArray.length-1); i++){
			   if(s<5){
				   $('.stateBase .state-menu').append('<span style="padding:5px;"><a href="'+citiesArray[i][1]+'/'+citiesArray[i][3]+'.html">'+citiesArray[i][3].replace(/__/g, '/').replace(/_/g, ' ')+'</a></span>');
				   s++;
			   }else{
				   $('.stateBase .state-menu').append('<span style="padding:5px;"><a href="'+citiesArray[i][1]+'/'+citiesArray[i][3]+'.html">'+citiesArray[i][3].replace(/__/g, '/').replace(/_/g, ' ')+'</a></span><br/>');
				   s=1;
			   }
			   if(citiesArray[i][4]!=null){
			   $('.state-image #m_'+citiesArray[i][0]+'').append('<area shape="rect" coords="'+citiesArray[i][4]+'" href="'+citiesArray[i][1]+'/'+citiesArray[i][3]+'.html" target="_self" title="'+citiesArray[i][3].replace(/__/g, '/').replace(/_/g, ' ')+', '+citiesArray[i][1].replace(/__/g, '/').replace(/_/g, ' ')+'" alt="'+citiesArray[i][3].replace(/__/g, '/').replace(/_/g, ' ')+', '+citiesArray[i][1]+'" />');
			   }
		   }
		
			$('.stateBase #preloader').fadeOut('fast', function(){
																	 	if(Modernizr.localstorage){
																			try {
																				localStorage.setItem('zoofaroo_chosenState',chosenStateAlt);
																				localStorage.removeItem('zoofaroo_chosenCity');
																			} catch (e) {
																			}
																		}
																		$('.stateBase #preloader').empty();
																		$('.state-image').fadeIn('fast');
																		$('.stateBase .state-menu').fadeIn('fast');
																		
																   });
	}//displayCities