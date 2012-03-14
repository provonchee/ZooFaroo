<?php
// Redirect if this page was accessed directly:
if (!defined('BASE_URL')) {

	// Need the BASE_URL, defined in the config file:
	require_once ('../config/config.inc.php');
	
	// Redirect to the index page:
	$url = BASE_URL . 'index.php';
	header ("Location: $url");
	exit;
	
} // End of defined() IF.

?>

<div class="boxBare cityBase">

<div id="breadCrumbs"><? echo $breadCrumbs; ?></div><!--breadCrumbs-->
<div id="preloader"></div><!--preloader-->

<h2 id="welcomeMsg" style="display: block;"></h2>
<div id='dynamicSubHeader'><div id='dynamicMsg'></div></div>
<div class="boxBasic wildCardBase">Want to browse all the 'offers' or all the 'needs' at once?<div class="buttonWrap wildCardBtn">Show all <span style="color:#FF9900;">needs</span> in this area!</div><div class="buttonWrap wildCardBtn">Show all <span style="color:#669900;">offers</span> in this area!</div></div>
<script>$('#welcomeMsg').hide();$('#dynamicSubHeader').hide();$('.wildCardBase').hide();</script>
<div id="city-results">
<div class="sectionHeaderFormat blueHeader city-servicesTag">Services</div>
<div class="boxBasic cityServicesBase">
<br/>

</div><!--services-->

<div class="sectionHeaderFormat blueHeader city-goodsTag">Goods</div>
<div class="boxBasic cityGoodsBase">
<br/>

</div><!--goods-->

</div><!--city-results-->

</div><!--cityBase-->

</div><!--separator-->
</div><!--mainBase-->

<script>

var myImagePR=new Image;myImagePR.src="images/preloader.gif";myImagePR.id="preload";$('.cityBase #preloader').append(myImagePR);$('.cityBase #city-results').hide();function displayCategories(categoryArray){fetchTallies(categoryArray,chosenCityID,chosenStateID,categoryArray.length);};function displayCities(parsedCities){for(i=0;i<parsedCities.length;i++){if(parsedCities[i][3]=='<? echo $city; ?>'){chosenStateID=parsedCities[i][0];chosenState=parsedCities[i][1].replace(/_/g," ");chosenStateAlt=parsedCities[i][1];chosenCityID=parsedCities[i][2];chosenCityAlt=parsedCities[i][3];chosenCity=parsedCities[i][3].replace(/_/g," ");;chosenCategoryID='X10';chosenOfferNeed='X10';fetchCategoryObject.fetchCategoryArray();if(Modernizr.localstorage){try{localStorage.setItem('zoofaroo_chosenState',chosenStateAlt);localStorage.setItem('zoofaroo_chosenCity',chosenCityAlt);}catch(e){}}}}};var requestCity='<? echo $city; ?>';var requestState='<? echo $state; ?>';if(requestCity!=requestState){$('#welcomeMsg').html('Welcome to ZooFaroo&nbsp;<? echo str_replace("_"," ",$city); ?>, <? echo str_replace("_"," ",$state); ?>');$('#dynamicMsg').html('We\'re brand new and you\'re one of our very first visitors.  You\'re a ZooFaroo pioneer!  Join in (it\'s totally free!) the exciting new social marketplace.  Spread the word, tell your friends, family, co-workers and make the ZooFaroo <? echo str_replace("_"," ",$city); ?> community all your own!<div id="forgetCategory"><a href="contact.html">Did we forget a category?&nbsp;&nbsp;Let us know!</a>');}else{$('#welcomeMsg').html('Welcome to ZooFaroo&nbsp;<? echo str_replace("_"," ",$state); ?>');$('#dynamicMsg').html('We\'re brand new and you\'re one of our very first visitors.  You\'re a ZooFaroo pioneer!  Join in (it\'s totally free!) the exciting new social marketplace.  Spread the word, tell your friends, family, co-workers and make the ZooFaroo <? echo str_replace("_"," ",$state); ?> community all your own!<div id="forgetCategory"><a href="contact.html">Did we forget a category?&nbsp;&nbsp;Let us know!</a>');};fetchCityObject.fetchCityArray('<? echo $state; ?>',false);function fetchTallies(categoriesArray,cityID,stateID,categoriesArrayLength){$.ajax({type:"POST",url:'control/pageQuery.php',data:'page=getTallies&cityID='+cityID+'&stateID='+stateID+'&catsLength='+categoriesArrayLength+'',success:function(tallyResults){if(tallyResults!='X10'){tallyResults=jQuery.parseJSON(tallyResults);displayCats(categoriesArray,tallyResults);}else{alertObject.alertBox('ALERT!',errorAlrt,'ferror',errorReset,null,null);}}});};function displayCats(catResultsArray,tallyResultsArray){for(i=1;i<catResultsArray.length;i++){if(catResultsArray[i][2]=='s'){$('.cityBase #city-results .cityServicesBase').append('<li style="list-style-type: none;"> <a href="'+chosenStateAlt+'/'+chosenCityAlt+'/Offered/'+catResultsArray[i][1]+'.html" style="text-decoration:none;"><div class="buttonWrap city-offerTag">offered&nbsp;('+tallyResultsArray[catResultsArray[i][0]][0]+')</div></a><div id="city-categoryName">'+catResultsArray[i][1].replace(/_/g,' ')+'</div><a href="'+chosenStateAlt+'/'+chosenCityAlt+'/Needed/'+catResultsArray[i][1]+'.html" style="text-decoration:none;"><div class="buttonWrap city-needTag">needed&nbsp;('+tallyResultsArray[catResultsArray[i][0]][1]+')</div></a></li><br/><br/>');}else if(catResultsArray[i][2]=='g'){$('.cityBase #city-results .cityGoodsBase').append('<li style="list-style-type: none;"><a href="'+chosenStateAlt+'/'+chosenCityAlt+'/Offered/'+catResultsArray[i][1]+'.html" style="text-decoration:none;"><div class="buttonWrap city-offerTag">offered&nbsp;('+tallyResultsArray[catResultsArray[i][0]][0]+')</div></a><div id="city-categoryName">'+catResultsArray[i][1].replace(/_/g,' ')+'</div><a href="'+chosenStateAlt+'/'+chosenCityAlt+'/Needed/'+catResultsArray[i][1]+'.html" style="text-decoration:none;"><div class="buttonWrap city-needTag">needed&nbsp;('+tallyResultsArray[catResultsArray[i][0]][1]+')</div></a></li><br/><br/>');}};$('.cityBase #city-results').css('height','auto');$('.cityBase #preloader').fadeOut('fast',function(){$('.cityBase #preloader').remove();$('#welcomeMsg').fadeIn('fast');$('#dynamicSubHeader').fadeIn('fast');$('.wildCardBase').fadeIn('fast');$('.cityBase #city-results').fadeIn('slow');});};$('.wildCardBtn:eq(0)').unbind('click').click(function(){window.open(''+baseHref+''+chosenStateAlt+'/'+chosenCityAlt+'/Needed/All.html','_self');});$('.wildCardBtn:eq(1)').unbind('click').click(function(){window.open(''+baseHref+''+chosenStateAlt+'/'+chosenCityAlt+'/Offered/All.html','_self');});
</script>