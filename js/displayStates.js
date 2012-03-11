
var displayStates_states=null;
var displayStates_statesID=null;

var  displayStatesObject = {
		displayStates:function (statesArrayAlt, whichPage){
				var thePage = whichPage;
											$("#stateDropDwn").html('<div id="inputLabelTxt"></div>&nbsp;<select name="stateDrop" id="stateDrop" style="display: inline;"></select>');
											$("#stateDropDwn #stateDrop").prepend('<option value="please choose...">please choose...</option>');
											for(i=0; i<51; i++){
												displayStates_states = statesArrayAlt[i][1].replace(/_/g," ");
												displayStates_statesID = statesArrayAlt[i][0];
													$('#stateDropDwn #stateDrop').append('<option value="'+displayStates_statesID+'">'+displayStates_states+'</option>');
											}
											
											  $("#stateDropDwn #stateDrop").unbind('change').change(function(e) {
															  drpDwnState = $("#stateDropDwn #stateDrop option:selected").text();
															  $("#cityDropDwn").html('<img src="images/loaderSm.gif"/>');
															  if(drpDwnState!='please choose...'){
																  	drpDwnState = drpDwnState;
																	drpDwnStateAlt = drpDwnState.replace(/ /g, "_");//server side state name
																	drpDwnStateID = $("#stateDropDwn #stateDrop").val();
																	$("#stateDropDwn").html('<div id="inputLabelTxt">State chosen:</div>&nbsp;<b><u>'+drpDwnState+'</u></b>&nbsp;&nbsp;<div id="changeSelection">change selection</div>');
																	fetchCityObject.fetchCityArray(drpDwnStateAlt, true);
																    $("#stateDropDwn #changeSelection").unbind('click').click(function(){
																				$("#stateDropDwn #changeSelection").unbind('click').html('<img src="images/loaderSm.gif"/>');
																				$('#stateDrop').empty();
																				$("#cityDropDwn").empty();
																				fetchStateObject.fetchStateArray(thePage);
																										   });
																  
															  }
															 
												});/// $("#stateDropDwn").change
												
											  switch(thePage){
												  
												case 'post':
												$("#stateDropDwn #inputLabelTxt").html('Please choose a state:');
												break;
												
												case 'edit':
												$("#stateDropDwn #inputLabelTxt").html('Your State:');
												$("#stateDropDwn #inputLabelTxt").css({'font-size':'1em'});
												$("#stateDropDwn").css({'display':'inline', 'margin-left':'0px', 'margin-top':'0px'});
												chosenStateArray = statesArrayAlt;
												$('.mainBase .postBaseEdit #stateDropDwn #stateDrop').val(''+editState+'');
												break;
												
												case 'register':
												$("#stateDropDwn #inputLabelTxt").html('Your State:');
												$("#stateDropDwn #inputLabelTxt").css({'font-size':'1em'});
												$("#stateDropDwn").css({'display':'inline', 'margin-left':'0px', 'margin-top':'0px'});
												break;
												
												case 'AdvSearch':
												$("#stateDropDwn #inputLabelTxt").html('Please choose a state:');
												break;	
											
											  }
											  					
}

}
