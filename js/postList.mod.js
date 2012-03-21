function  displayCategories(categoryArray){
for(i=1; i<categoryArray.length; i++){
	if(categoryArray[i][1]==listCategory){
		chosenCategoryID=categoryArray[i][0];
	}else if(listCategory=='All'){
		chosenCategoryID='999';
	}
}
}//displayCategories

function  displayCities(parsedCities){
for(i=0; i<parsedCities.length; i++){
	if(parsedCities[i][3]==chosenCity){
		chosenStateID=parsedCities[i][0];
		chosenCityID=parsedCities[i][2];
	}
}
}//displayCities

fetchCategoryObject.fetchCategoryArray();
fetchCityObject.fetchCityArray(chosenState, false);

var arrayCheckerInterval = setInterval ( "arrayChecker()", 100 );

function arrayChecker(){
  if(chosenStateID!=null&&chosenCityID!=null&&chosenCategoryID!=null){
	  clearInterval (arrayCheckerInterval);
	  postLister();
  }
}

function postLister(){
	 
$.ajax({
	   type:'POST',
	   url:'control/pageQuery.php',
	   data:'page=postList&regionName=NULL&stateID='+chosenStateID+'&cityID='+chosenCityID+'&offerNeed='+offerNeed+'&categoryID='+chosenCategoryID+'',
	   success: function(postListArray){
		 if(postListArray!='X10'){
		   postListArrayParsed = jQuery.parseJSON(postListArray);
		  
			if(postListArrayParsed[0][0]=='X10'){
					alertObject.alertBox('ALERT!', errorAlrt, 'ferror', errorReset, null, null);//url mismatch, redirects home
			}else if(postListArrayParsed[0][0]=='empty'){
					$('.listBase .secondListBase').html('<center>Sorry, but there are currently no postings for this category.<br/>Why not be the first?<br/><br/><a href="post.html">Click here to leave your own posting!</a></center><br/>');
						var menuHeight = $('.listBase .secondListBase').height()+87;
						$('.listBase').css('height', menuHeight+'px');
						$('.listBase #preloader').fadeOut('fast', function(){
						$('.listBase  #preloader').remove();
						$('.listBase .secondListBase').fadeIn('fast');
						});
		   }else{
						
						//globals
						chosenStateID = postListArrayParsed[0][6];
						chosenState =  postListArrayParsed[0][7].replace(/_/g, " ");
						chosenStateAlt = postListArrayParsed[0][7];
						chosenCityID = postListArrayParsed[0][4];
						chosenCity =  postListArrayParsed[0][5].replace(/_/g, " ");
						chosenCityAlt = postListArrayParsed[0][5];
						chosenSpecificLocale = postListArrayParsed[0][18];
						postCount = postListArrayParsed[0][20];
						if(Modernizr.localstorage){
							try{
							localStorage.setItem('zoofaroo_chosenState',chosenStateAlt); 
							localStorage.setItem('zoofaroo_chosenCity',chosenCityAlt);
							} catch (e) {
								}
						}
						postListArrayParsed[0][20]=null;
						
						$('#postsPerPageBtns').html('Postings found:&nbsp;&nbsp;<b><u>'+postCount+'</u></b>').css('margin-left', '90px');

						//how many pages there are total based off of how many posts there are versus posts per page limit
							if(postCount>postsPerPage){
								//multiple pages of results
								pageCount = Math.ceil(postCount/postsPerPage);
							}else{
								//just one page of results
								pageCount = 1;
								listFinish = postCount;
							}
						//begin cycle - sends offer title to function to be adjusted
						uniqueArrayParsed = postListArrayParsed;
						populateList(uniqueArrayParsed[listTicker][13], offerNeed);
						$('.listBase #preloader').fadeOut('fast', function(){
						$('.listBase  #preloader').remove();
						$('.listBase #postsPerPageBtns').fadeIn('fast');
						$('.listBase .secondListBase').fadeIn('fast');
						});
						
			}
		 }else{
			alertObject.alertBox('ALERT!', errorAlrt, 'ferror', errorReset, null, null);  
		 }
				
	   }//sucess
	   
	   });
}