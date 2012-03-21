$('.searchBase3').hide();$('.searchPartial').hide();
$('.userSearchTxt #user_keyword').val('');

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
var activeSearchCrit = 'null';
function usernameAction(input1,input2, input3){//the button clicked, and the button not clicked, and is this a username or business
	if($('.userSearchTxt #'+input1+'').val()){
									window[input2] = 'null';
									$("#stateDropDwn #changeSelection").unbind('click').html('<img src="images/loaderSm.gif"/>');
									$('#stateDrop').empty();
									$("#cityDropDwn").empty();
									fetchStateObject.fetchStateArray('AdvSearch');
									 activeSearchCrit = 'the keyword:&nbsp;&nbsp;<b>"'+$('.userSearchTxt #'+input1+'').val()+'"</b>';
									 window[input1] = $('.userSearchTxt #'+input1+'').val();
									 $('.userSearchTxt #'+input1+'').blur();
									 $('.searchBase2 .userSearchTxt #'+input1+'').val('');
									 $('.searchBase2 .userSearchTxt #'+input2+'').val('');
									 drpDwnStateID='52';
									 drpDwnCityID='52';
									 submitSearchAction();
									}else{
										alertObject.alertBox('EMPTY FORM!', 'Please make sure you have filled in a '+input3+'!', 'alert', null, null, null);
									}
}
//user button
$('.searchBase2:eq(1) .userSearchTxt #user_keyword').unbind('keypress').keypress(function(e){
								 if(e.which==13){
									usernameAction('user_keyword', 'bus_keyword', 'Username');
								 }
						   });

$('.searchBase2:eq(1) .userNameSearch #username').unbind('click').click(function(){
	usernameAction('user_keyword', 'bus_keyword', 'Username');							  
});//user search btn


//business button
$('.searchBase2:eq(2) .userSearchTxt #bus_keyword').unbind('keypress').keypress(function(e){
								 if(e.which==13){
									usernameAction('bus_keyword','user_keyword', 'Business Name');
								 }
						   });

$('.searchBase2:eq(2) .userNameSearch #busname').unbind('click').click(function(){
	usernameAction('bus_keyword','user_keyword', 'Business Name');							  
});//business search btn


//location search button
$('.searchBase2:eq(0) #location').unbind('click').click(function(){
	if($('#stateDrop').val()!="please choose..."){
		if($('#cityDrop').val()!="please choose..."){
					user_keyword='null';
					bus_keyword = 'null';
					activeSearchCrit = 'the state of <b>'+drpDwnState+'</b>';
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
				sendData(drpDwnStateID, drpDwnCityID, user_keyword, bus_keyword);										
				$('#search-searchBtn').html('Please wait...<img src="images/loaderSm.gif"/>').css({'color':'#990000', 'font-size': '0.9em' });
}

function noMatchFound(){
	$('#postsPerPageBtns').html('No matches found for '+activeSearchCrit+'').css({'margin-left': '25px', 'margin-top': '15px'});
	$('#list-pageCount').empty();
	$('#search-searchBtn').html('<div class="buttonWrap">Search</div>').css({'color':'#333', 'font-size': '1em' });
	$('#search-startOverBtn').show();
	$('.searchBase3').append('<span style="margin-left:20px;">Sorry, but there are currently no users found with these search criteria.&nbsp;&nbsp;Try adjusting your search.</span><br/>');
	$('.searchBase3').fadeIn('fast');
}
var percentage = null;
function sendData(stateID, cityID, kWord, busName){
	
												//cleanSlate();
												
														switch(kWord){
														case 'null':
														kWord = 'X10';
														break;
														}
														switch(busName){
														case 'null':
														busName = 'X10';
														break;
														}
														
														genTimerObject.genTimer();//start the timeout timer
													 	var form = new Array();
													 	form = {'di':'directory', 'i1':stateID, 'i2':cityID, 's1':kWord, 's2':busName}; //notice category is sending the alt name because by defult the categoryID is 66
														
														 $.post('control/formValidate.php', {form:form }, function(result){
															 clearTimeout(genericTimer);
															
																if(result!='X10' && result!='noMatches'){
																  searchListArrayParsed = jQuery.parseJSON(result);
																  console.log(searchListArrayParsed);
																  for(i=0; i<searchListArrayParsed.length; i++){
																	  if(searchListArrayParsed[i][1][1]>0){
																		percentage = '<b><span style="color:#669900;">'+searchListArrayParsed[i][1][1]+'%</span></b>';
																	  }else{
																		percentage = '';  
																	  }
																  $('.searchBase3').show().append('<a href="user/'+searchListArrayParsed[i][0]+'.html" style="text-decoration:none"><div class="buttonWrap reviewLink" style="margin-left:15px; margin-top:10px;">'+searchListArrayParsed[i][0]+'('+searchListArrayParsed[i][1][0]+')&nbsp;'+percentage+'</div></a>');;
																  if(searchListArrayParsed.length>1){
																	  var he = 450+(Math.ceil(searchListArrayParsed.length/5)*25);
																	  var re = he+12;
																	  $('.mainBase').height(re+'px');
																	  $('.mainBase .secondBase').height(he+'px');
																  }else{
																	   $('.mainBase').height('462px');
																	   $('.mainBase .secondBase').height('450px');
																  }
																  }
																 
																		var totalPostCount = searchListArrayParsed.length;
																		
																		$('#postsPerPageBtns').html('<b><u>'+totalPostCount+'</u></b>&nbsp;&nbsp;User(s) found for '+activeSearchCrit+'').css({'margin-left': '25px', 'margin-top': '15px'});

																}else if(result=='X10'){
																	alertObject.alertBox('ALERT!', errorAlrt, 'ferror', errorReset, null, null); 
																}else if(result=='noMatches'){
																	noMatchFound();
																}
															 });
	
}