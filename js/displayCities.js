var displayCities_cities = null;
var displayCities_citiesID = null;
var displayCitiesObject = {
	displayCities:function(citiesArrayAlt){
					if(citiesArrayAlt[0][3]!=drpDwnStateAlt && chosenPage!='directory'){//if the state has sections, cities, regions, etc
					$("#cityDropDwn").show();
									$("#cityDropDwn").html('<div id="inputLabelTxt">Please choose a city:</div>&nbsp;<select name="cityDrop" id="cityDrop" style="display: inline;"></select>');
									$("#cityDrop").prepend('<option value="please choose...">please choose...</option>');
									for(i=0; i<citiesArrayAlt.length-1; i++){
											displayCities_cities = citiesArrayAlt[i][3].replace(/_/g," ");
											displayCities_citiesID = citiesArrayAlt[i][2];
											$("#cityDrop").append('<option value="'+displayCities_citiesID+'">'+displayCities_cities+'</option>');
																		 }
																		
								$("#cityDropDwn").unbind('change').change(function(e){
												   
										drpDwnCity = $("#cityDropDwn option:selected").text();
										drpDwnCityAlt = $("#cityDropDwn option:selected").text().replace(/ /g,"_");
										drpDwnCityID = $("#cityDrop").val();
										
										$("#cityDropDwn").html('<div id="inputLabelTxt">City chosen:</div>&nbsp;<b>'+drpDwnCity+'</b>&nbsp;&nbsp;<div id="changeSelection">change selection</div>'); 
										$("#cityDropDwn #changeSelection").unbind('click').click(function(){
														$("#cityDropDwn #changeSelection").unbind('click').html('<img src="images/loaderSm.gif"/>');
														fetchCityObject.fetchCityArray(drpDwnStateAlt, true);
																								});
																			});///$("#cityDropDwn").change
					
					//if the state does not have sections such as Maine, then default to this
					}else{
						$("#cityDropDwn").hide();
						drpDwnCity = citiesArrayAlt[0][3].replace(/_/g," ");
						drpDwnCityAlt = citiesArrayAlt[0][3];
						drpDwnCityID = citiesArrayAlt[0][2];
					}
	
	}///fetchCityArray
}