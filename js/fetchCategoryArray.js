var fetchCategoryObject = {
fetchCategoryArray:function(){
	
	switch(Modernizr.localstorage){//if browser supports localStorage
	
		case true:
		//go get the most current version number
					$.ajax({
					   type:'POST',
					   url:'control/versionControl.php',
					   data:'version=cat_version',
					   success: function(currentVersion){
						 var curVerCat = $.trim(currentVersion);
								if(localStorage.getItem('zoofaroo_cat_version') !== null){
									//go get client side current version number
										   var clientVerCat = localStorage.getItem('zoofaroo_cat_version');
										  
										   if(curVerCat==clientVerCat){
												 //versions up to date, continue...
												 //categories
												if(localStorage.getItem('zoofaroo_categories') !== null){//if categories array is found in localStorage
														var retrievedCategories = localStorage.getItem('zoofaroo_categories');
														var parsedCategories = JSON.parse(retrievedCategories);
														displayCategories(parsedCategories);
												}else{
														//if categories array is not found in localStorage
														fetchCats(true);//query db for categories and then commit to local storage
												}
										  }else{//version numbers do not match
										 	 fetchCats(true);//query db for categories and then commit to local storage 
										  }		
		
								}else{//no version number found
									fetchCats(true);//query db for categories and then commit to local storage 
								}
								localStorage.setItem('zoofaroo_cat_version',curVerCat);
						}//success
									   
					});//ajax
			break;
	default:
		//browser does not support localStorage
		fetchCats(false);//query db for cities but DO NOT commit to local storage
		break;
}

//go out and get the current categories
function fetchCats(setCategories){
		$.ajax({  //populate category drop down lists
				type: "POST",
				url:"control/pageQuery.php",
				data:"page=city",
				success: function(categoriesArray){
					if(categoriesArray!='X10'){
					 categoriesArray = jQuery.parseJSON(categoriesArray);
					 if(categoriesArray[0][0]!='X10'){
						 displayCategories(categoriesArray);
						 if(setCategories && Modernizr.localstorage){//commit array to localStorage
						 try {
							localStorage.setItem('zoofaroo_categories',JSON.stringify(categoriesArray)); 
								} catch (e) {if(e=='Error: QUOTA_EXCEEDED_ERR: DOM Exception 22'){
	 									 	alert('An error has occured while loading page.  This site utlizes HTML 5\'s local storage to speed up page loading.  Please check to make sure that your browser is not in \'Private Browsing\' mode.'); //data wasn't successfully saved due to quota exceed so throw an error
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
}
	
	
	
}
}