var myImagePR = new Image;
	myImagePR.src = "images/preloader.gif";
	myImagePR.id = "preload";
	$('.cityBase #preloader').append(myImagePR);
	$('.cityBase #city-results').hide();
function  displayCategories(categoryArray){
		fetchTallies(categoryArray, chosenCityID, chosenStateID, categoryArray.length);//the middle argument is the city ID
}//displayCategories

function  displayCities(parsedCities){
for(i=0; i<parsedCities.length; i++){
	if(parsedCities[i][3]==requestCity){
		chosenStateID=parsedCities[i][0];
		chosenState=parsedCities[i][1].replace(/_/g, " ");
		chosenStateAlt=parsedCities[i][1];
		chosenCityID=parsedCities[i][2];
		chosenCityAlt=parsedCities[i][3];
		chosenCity=parsedCities[i][3].replace(/_/g, " ");;
		chosenCategoryID = 'X10';
		chosenOfferNeed = 'X10';
		fetchCategoryObject.fetchCategoryArray();
		if(Modernizr.localstorage){
			try{
			localStorage.setItem('zoofaroo_chosenState',chosenStateAlt); 
			localStorage.setItem('zoofaroo_chosenCity',chosenCityAlt);
			} catch (e) {
								}
		}
	}
}
}//displayCities
if(requestCity!=requestState){
$('#welcomeMsg').html('Welcome to ZooFaroo&nbsp;'+cityDisplay+', '+stateDisplay+'');
$('#dynamicMsg').html('We\'re brand new and you\'re one of our very first visitors.  You\'re a ZooFaroo pioneer!  Join in (it\'s totally free!) the exciting new social marketplace.  Spread the word, tell your friends, family, co-workers and make the ZooFaroo <? echo str_replace("_"," ",$city); ?> community all your own!<div id="forgetCategory"><a href="contact.html">Did we forget a category?&nbsp;&nbsp;Let us know!</a>');
}else{
$('#welcomeMsg').html('Welcome to ZooFaroo&nbsp;<? echo str_replace("_"," ",$state); ?>');
$('#dynamicMsg').html('We\'re brand new and you\'re one of our very first visitors.  You\'re a ZooFaroo pioneer!  Join in (it\'s totally free!) the exciting new social marketplace.  Spread the word, tell your friends, family, co-workers and make the ZooFaroo <? echo str_replace("_"," ",$state); ?> community all your own!<div id="forgetCategory"><a href="contact.html">Did we forget a category?&nbsp;&nbsp;Let us know!</a>');
}
fetchCityObject.fetchCityArray(requestState, false);

function fetchTallies(categoriesArray, cityID, stateID, categoriesArrayLength){//retreive the tally numbers of posts per category
	$.ajax({
												type: "POST",
												url:'control/pageQuery.php',
												data:'page=getTallies&cityID='+cityID+'&stateID='+stateID+'&catsLength='+categoriesArrayLength+'',
												success: function(tallyResults){
													if(tallyResults!='X10'){
														tallyResults = jQuery.parseJSON(tallyResults);//parse tally results
														displayCats(categoriesArray, tallyResults);
													}else{
														alertObject.alertBox('ALERT!', errorAlrt, 'ferror', errorReset, null, null); 
													}
													}
				   });
}


function displayCats(catResultsArray, tallyResultsArray){
													for(i=1; i<catResultsArray.length; i++){//we start with one here because the zero space is reserved for the city/state info specific to the query
														if(catResultsArray[i][2]=='s'){
																$('.cityBase #city-results .cityServicesBase').append('<li style="list-style-type: none;"> <a href="'+chosenStateAlt+'/'+chosenCityAlt+'/Offered/'+catResultsArray[i][1]+'.html" style="text-decoration:none;"><div class="buttonWrap city-offerTag">offered&nbsp;('+tallyResultsArray[catResultsArray[i][0]][0]+')</div></a><div id="city-categoryName">'+catResultsArray[i][1].replace(/_/g, ' ')+'</div><a href="'+chosenStateAlt+'/'+chosenCityAlt+'/Needed/'+catResultsArray[i][1]+'.html" style="text-decoration:none;"><div class="buttonWrap city-needTag">needed&nbsp;('+tallyResultsArray[catResultsArray[i][0]][1]+')</div></a></li><br/><br/>');
														}else if(catResultsArray[i][2]=='g'){
															$('.cityBase #city-results .cityGoodsBase').append('<li style="list-style-type: none;"><a href="'+chosenStateAlt+'/'+chosenCityAlt+'/Offered/'+catResultsArray[i][1]+'.html" style="text-decoration:none;"><div class="buttonWrap city-offerTag">offered&nbsp;('+tallyResultsArray[catResultsArray[i][0]][0]+')</div></a><div id="city-categoryName">'+catResultsArray[i][1].replace(/_/g, ' ')+'</div><a href="'+chosenStateAlt+'/'+chosenCityAlt+'/Needed/'+catResultsArray[i][1]+'.html" style="text-decoration:none;"><div class="buttonWrap city-needTag">needed&nbsp;('+tallyResultsArray[catResultsArray[i][0]][1]+')</div></a></li><br/><br/>');
														}
														
													}
													$('.cityBase #city-results').css('height', 'auto');
													$('.cityBase #preloader').fadeOut('fast', function(){$('.cityBase #preloader').remove();
																														$('#welcomeMsg').fadeIn('fast');$('#dynamicSubHeader').fadeIn('fast');$('.wildCardBase').fadeIn('fast');
																													   $('.cityBase #city-results').fadeIn('slow');
													});
	
}//displayCats
$('.wildCardBtn:eq(0)').unbind('click').click(function(){
	window.open(''+baseHref+''+chosenStateAlt+'/'+chosenCityAlt+'/Needed/All.html', '_self');
	});
$('.wildCardBtn:eq(1)').unbind('click').click(function(){
	window.open(''+baseHref+''+chosenStateAlt+'/'+chosenCityAlt+'/Offered/All.html', '_self');
	});