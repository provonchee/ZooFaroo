var whichPage = null;
var qs_stateChosen = null;
var qs_cityChosen = null;
var qs_categoryChosen = null;
var qs_offerNeedChosen = null;
var qs_stateArray = null;
var qs_cityArray = null;
var qs_chosenStateID = null;
var qs_chosenCityID = null;
var qs_chosenCategoryID = null;

var quickSearchObject = {
	
	quickSearch:function(pg, state, city, oN, category){
		
		whichPage = pg;
		qs_stateChosen = state;
		qs_cityChosen = city;
		qs_categoryChosen = category;
		qs_offerNeedChosen = oN;
		
												
	$('.searchPartial').prepend('<div id="qs_stateDwn" style="margin-left:0px;display:inline-block; padding-left:5px;"><div id="inputLabelTxt"></div></div><div id="qs_cityDwn" style="margin-left:0px; display:inline-block; padding-left:5px;"><div id="inputLabelTxt"></div></div><div id="qs_offerNeedDwn" style="margin-left:0px; display:inline-block; padding-left:5px;"><div id="inputLabelTxt"></div></div><div id="qs_categoryDwn" style="margin-left:0px; display:inline-block; padding-left:5px;"><div id="inputLabelTxt"></div></div><div id="qSearchTxt"><input type="search" placeholder="" width="30" id="qs_keyword" name="qs_keyword" class="input"  /></input></div><div class="buttonWrap quickSearchBtn">search</div>&nbsp;|&nbsp;<div class="advSearchBtn">advanced search</div>');
	$('.quickSearchBtn').unbind('click').click(function(){
														quickSearchIt(); 
																});
	$('#qs_keyword').unbind('keypress').keypress(function(e){
								 if(e.which==13){
									quickSearchIt(); 
								 }
						   });
						   
	$('.advSearchBtn').unbind('click').click(function(){window.open(''+baseHref+'search.html', '_self')});
	
	 fetchStateObject.fetchStateArray('quickSearch');//populate quick search with the already retrieved state array
	
	}
	
}


function quickSearchIt(){
	if($("#qs_keyword").val()!='' && $("#qs_stateDwn #qs_state option:selected").text()!='where to search...'){
															qs_keyword = $("#qs_keyword").val().replace(/"/g, '').replace(/'/g, '').replace(/ /g, '_');
															window.open(''+baseHref+'search/b/'+chosenStateID+'/'+qs_chosenCityID+'/'+qs_chosenCategoryID+'/'+qs_offerNeedChosen+'/'+qs_keyword+'.html', '_self');
														}else{
														alertObject.alertBox('ALERT!', quickSearchAlrt, 'alert', null, null, null);
														}
}

var quickSearchDisplayStates = {
	
	displayStates:function(statesArray){
	
		qs_stateArray = statesArray;
		
		switch(whichPage){
			
			
			case 'state':
				qs_offerNeedChosen = 'Both';
				$('#qs_state').empty();
				$("#qs_cityDwn").empty();
				$("#qs_stateDwn").html('<div id="inputLabelTxt">'+qs_stateChosen.replace(/_/g, ' ')+'</div>&nbsp;&nbsp;<div style="color:#669900;display:inline-block;">&rArr;</div>');
				  qs_chosenCityID = '1111';
				  qs_chosenCategoryID = '1111';
				break;
				
			case 'city':
				qs_offerNeedChosen = 'Both';
				$('#qs_state').empty();
				$("#qs_cityDwn").empty();
				$("#qs_stateDwn").html('<div id="inputLabelTxt">'+qs_stateChosen.replace(/_/g, ' ')+'</div>&nbsp;&nbsp;<div style="color:#669900;display:inline-block;">&rArr;</div>');
				$("#qs_cityDwn").html('<div id="inputLabelTxt">'+qs_cityChosen.replace(/_/g, ' ')+'</div>&nbsp;&nbsp;<div style="color:#669900;display:inline-block;">&rArr;</div>');
				 qs_chosenCityID = chosenCityID;
				qs_chosenCategoryID = '1111';
				break;
				
			case 'postList':
				
				$('#qs_state').empty();
				$("#qs_cityDwn").empty();
				$("#qs_stateDwn").html('<div id="inputLabelTxt">'+qs_stateChosen.replace(/_/g, ' ')+'</div>&nbsp;&nbsp;<div style="color:#669900;display:inline-block;">&rArr;</div>');
				$("#qs_cityDwn").html('<div id="inputLabelTxt">'+qs_cityChosen.replace(/_/g, ' ')+'</div>&nbsp;&nbsp;<div style="color:#669900;display:inline-block;">&rArr;</div>');
				$("#qs_offerNeedDwn").html('<div id="inputLabelTxt">'+qs_offerNeedChosen.replace(/_/g, ' ')+'</div>&nbsp;&nbsp;<div style="color:#669900;display:inline-block;">&rArr;</div>');
				$("#qs_categoryDwn").html('<div id="inputLabelTxt">'+qs_categoryChosen.replace(/_/g, ' ')+'</div>&nbsp;&nbsp;<div style="color:#669900;display:inline-block;">&rArr;</div>');
				 qs_chosenCityID = chosenCityID;
				qs_chosenCategoryID = chosenCategoryID;
				break;
				
			case 'searchAdvanced':
				//do nothing
				
			default:
			
			//normally we would use drpDwn variables here but since quicksearch (with a drop down) may appear on the same page as a form with drop downs we will use the static vars
			$("#qs_stateDwn").html('<div id="inputLabelTxt"></div>&nbsp;<select name="qs_state" id="qs_state" style="display: inline-block;"></select>');
											$("#qs_stateDwn #qs_state").prepend('<option value="please choose...">where to search...</option>');
											for(i=0; i<51; i++){
												qs_stateArray[i][1].replace(/_/g," ");
													$('#qs_stateDwn #qs_state').append('<option value="'+qs_stateArray[i][0]+'">'+qs_stateArray[i][1].replace(/_/g," ")+'</option>');
											}
											
											  $("#qs_stateDwn #qs_state").unbind('change').change(function(e) {
															  drpDwnState = $("#qs_stateDwn #qs_state option:selected").text();
															  if(drpDwnState!='where to search...'){
																	$("#qs_stateDwn").html('<div id="inputLabelTxt"></div>&nbsp;<b><u>'+drpDwnState+'</u></b>&nbsp;&nbsp;<div id="changeSelection">change</div>');
																	
																    $("#qs_stateDwn #changeSelection").unbind('click').click(function(){
																				$("#qs_stateDwn").unbind('click').html('<img src="images/loaderSm.gif"/>');
																				$('#qs_state').empty();
																				fetchStateObject.fetchStateArray('quickSearch');
																										   });
																	  for(j=0; j<51; j++){
																		  if(drpDwnState==statesArray[j][1].replace(/_/g," ")){
																			  chosenState = statesArray[j][1].replace(/_/g," ");
																			  chosenStateAlt = statesArray[j][1];//server side state name
																			  chosenStateID = statesArray[j][0];//this is what gets sent to search.inc.php
																			  qs_chosenCityID = '1111';
																			  chosenCity = '1111';
																			  chosenCityAlt = '1111';
																			  qs_chosenCategoryID = '1111';
																			  chosenCategory = '1111';
																			  chosenCategoryAlt = '1111';
																			  qs_offerNeedChosen = 'Both';
																		  }
																	  }
																  
															  }
															 
												});/// $("#qs_stateDwn").change

		}
		if(qs_stateChosen==qs_cityChosen && (chosenPage=='city' || chosenPage=='postList')){
			$('#qs_stateDwn').empty();
		}
	}
}