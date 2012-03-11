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

<div class="boxBasic searchBase1"><script>chosenPage = '<? echo $p; ?>';$('.searchBase1').hide();</script>
<div class="sectionHeaderFormat ltGrayHeader"><h2 id="index-title">ZooFaroo User Directory</h2></div>


<div class="boxBasic searchBase2 sideBySide">
        <div class="sectionHeaderFormat ltGrayHeader sectionHeader3">Search Users by Location</div>
       <div id="stateDropDwn" style="margin-left:75px;"></div><!--stateDropDwn-->
       <div id="cityDropDwn" style="margin-left:75px;"></div><!--cityDropDwn-->
        <div class="buttonWrap userSearchBtn" id="location">search</div>
       </div><!--searchBase2-->
<br/>

<div class="boxBasic searchBase2 sideBySide">
        <div class="sectionHeaderFormat ltGrayHeader sectionHeader3">Find a User by their Username</div>
            <div id="userNameSearch"><div id="userSearchTxt"><input type="search" placeholder="" width="30" id="user_keyword" name="user_keyword" class="input"  /></input></div><div class="buttonWrap userSearchBtn" style="margin-left:0px;margin-top:0px;" id="username">search</div></div><!--userNameSearch-->        
       </div><!--searchBase2-->


<div class="boxBasic searchBase2 sideBySide" style="margin-top:20px;">
        <div class="sectionHeaderFormat ltGrayHeader sectionHeader3">Find a Business by their Name</div>
            <div id="userNameSearch"><div id="userSearchTxt"><input type="search" placeholder="" width="30" id="bus_keyword" name="bus_keyword" class="input"  /></input></div><div class="buttonWrap userSearchBtn" style="margin-left:0px;margin-top:0px;" id="busname">search</div></div><!--userNameSearch-->        
       </div><!--searchBase2-->
<br/>

</div><!--searchBase1-->
<div id="postsPerPageBtns"></div>
<!--results-->
<div class="boxBare searchBase3" style="padding-bottom:20px; margin-top:20px;">
<div id="preloader"></div>
<div class="boxBare secondListBase"></div>
<div id="list-pageCount"></div>
<script>$('.searchBase3').hide();$('.searchPartial').hide();</script>
</div><!--postindex-Search-->

</div><!--separator-->
</div><!--mainBase-->
<script>
$('#userSearchTxt #user_keyword').val('');

var n = $('.searchBase1 .searchBase2').length;
for(i=0; i<n; i++){
	$('.searchBase1 .searchBase2:eq('+i+')').show();
}
$('.searchBase1 .searchBase2:eq(0)').css('margin-top', '40px');
$('.searchBase1').css('height', '200px').fadeIn('fast');

fetchStateObject.fetchStateArray('AdvSearch');

var searchListArrayParsed = new Array();
var user_keyword = 'null';
var bus_keyword = 'null';
function usernameAction(){
	if($('#userSearchTxt #user_keyword').val()){
									$("#stateDropDwn #changeSelection").unbind('click').html('<img src="images/loaderSm.gif"/>');
									$('#stateDrop').empty();
									$("#cityDropDwn").empty();
									fetchStateObject.fetchStateArray('AdvSearch');
									 user_keyword = $('#userSearchTxt #user_keyword').val();
									 $('#userSearchTxt #user_keyword').blur();
									 drpDwnStateID='52';
									 drpDwnCityID='52';
									 submitSearchAction();
									}else{
										alertObject.alertBox('EMPTY FORM!', 'Please make sure you have filled in a username!', 'alert', null, null, null);
									}
}
//user button
$('searchBase2:eq(1) #userSearchTxt #user_keyword').unbind('keypress').keypress(function(e){
								
								 if(e.which==13){
									usernameAction();
								 }
						   });

$('searchBase2:eq(1) #userNameSearch #username').unbind('click').click(function(){
	usernameAction();							  
});//user search btn


//business button
$('searchBase2:eq(2) #userSearchTxt #bus_keyword').unbind('keypress').keypress(function(e){
								 if(e.which==13){
									usernameAction();
								 }
						   });

$('searchBase2:eq(2) #userNameSearch #busname').unbind('click').click(function(){
	usernameAction();							  
});//business search btn


//location search button
$('.searchBase2 #location').unbind('click').click(function(){
	if($('#stateDrop').val()!="please choose..."){
		if($('#cityDrop').val()!="please choose..."){
					user_keyword='null';
					submitSearchAction(); 	
		}else{
			alertObject.alertBox('EMPTY FORM!', 'Please make sure you have chosen a city and state!', 'alert', null, null, null);
		}
	}else{
		alertObject.alertBox('EMPTY FORM!', 'Please make sure you have chosen a city and state!', 'alert', null, null, null);
	}
});//location search btn



function submitSearchAction(){
		$('#search-startOverBtn').hide();
		$('.searchBase3').empty();
		$('.searchBase3').hide();
				sendData(drpDwnStateID, drpDwnCityID, user_keyword, bus_name);										
				$('#search-searchBtn').html('Please wait...<img src="images/loaderSm.gif"/>').css({'color':'#990000', 'font-size': '0.9em' });
}

function noMatchFound(){
	$('#postsPerPageBtns').html('Matches found:&nbsp;&nbsp;0').css({'margin-left': '25px', 'margin-top': '15px'});
	$('#list-pageCount').empty();
	$('#search-searchBtn').html('<div class="buttonWrap">Search</div>').css({'color':'#333', 'font-size': '1em' });
	$('#search-startOverBtn').show();
	$('.searchBase3').append('<span style="margin-left:20px;">Sorry, but there are currently no users found with these search criteria.&nbsp;&nbsp;Try adjusting your search.</span><br/>');
	$('.searchBase3').fadeIn('fast');
}

function sendData(stateID, cityID, kWord, busName){
	
												//cleanSlate();
												
														switch(kWord){
														case 'null':
														kWord = 'X10';
														break;
														}
														
														genTimerObject.genTimer();//start the timeout timer
													 	var form = new Array();
													 	form = {'di':'directory', 'i1':stateID, 'i2':cityID, 's1':kWord}; //notice category is sending the alt name because by defult the categoryID is 66
														
														 $.post('control/formValidate.php', {form:form }, function(result){
															 clearTimeout(genericTimer);
															
																if(result!='X10' && result!='noMatches'){
																  searchListArrayParsed = jQuery.parseJSON(result);
																  for(i=0; i<searchListArrayParsed.length; i++){
																  $('.searchBase3').show().append('<a href="user/'+searchListArrayParsed[i][0]+'.html" style="text-decoration:none"><div class="buttonWrap reviewLink" style="margin-left:15px; margin-top:10px;">'+searchListArrayParsed[i][0]+'('+searchListArrayParsed[i][1][0]+')&nbsp;<b><span style="color:#669900;">'+searchListArrayParsed[i][1][1]+'%</span></b></div></a>');;
																  if(searchListArrayParsed.length>1){
																	  var he = 400+(Math.round(searchListArrayParsed.length/5)*25);
																	  var re = he+12;
																	  $('.mainBase').height(re+'px');
																	  $('.mainBase .secondBase').height(he+'px');
																  }else{
																	   $('.mainBase').height('412px');
																	   $('.mainBase .secondBase').height('400px');
																  }
																  }
																 
																		var totalPostCount = searchListArrayParsed.length;
																		
																		$('#postsPerPageBtns').html('Users found:&nbsp;&nbsp;<b><u>'+totalPostCount+'</u></b>').css({'margin-left': '25px', 'margin-top': '15px'});

																}else if(result=='X10'){
																	alertObject.alertBox('ALERT!', errorAlrt, 'ferror', errorReset, null, null); 
																}else if(result=='noMatches'){
																	noMatchFound();
																}
															 });
	
}
</script>