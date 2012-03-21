$('#search-keywordsInput #search_keyword').val('');
$("input:radio").attr("checked", false);
if(searchType == 'b'){//quicksearch
	$('.searchBase1 #advancedBtn').show();
	var n = $('.searchBase1 .searchBase2').length;
	for(i=0; i<n; i++){
		$('.searchBase1 .searchBase2:eq('+i+')').hide();
	}
	$('.searchBase1').css('height', '75px').fadeIn('fast');
	$('#advancedBtn').unbind('click').click(function(){window.open(''+baseHref+'search.html', '_self');});
	
}else{//advanced search
	$('.searchBase1 #advancedBtn').hide();
	var n = $('.searchBase1 .searchBase2').length;
	for(i=0; i<n; i++){
		$('.searchBase1 .searchBase2:eq('+i+')').show();
	}
	$('.searchBase1 .searchBase2:eq(0)').css('margin-top', '20px');
	$('.searchBase1').css('height', '480px').fadeIn('fast');
}

fetchStateObject.fetchStateArray('AdvSearch');

 var searchListArrayParsed = new Array();
var chosenCategoryKind;
var chosenGS= new Array();
var search_keyword = '';
var offerNeed = null;

var offerPostCount = null;
var needPostCount = null;
var totalPostCount = null;

$('#search-keywordsInput #search_keyword').unbind('keypress').keypress(function(e){
								
								 if(e.which==13){
									 search_keyword = $('#search-keywordsInput #search_keyword').val();
									 $('#search-keywordsInput #search_keyword').blur();
									 submitSearchAction(); 
								 }
						   });

$('#search-searchBtn').unbind('click').click(function(){
					search_keyword = $('#search-keywordsInput #search_keyword').val();
					submitSearchAction(); 								  
});//search btn

function submitSearchAction(){
		$('#search-startOverBtn').hide();
		$('.searchBase3 .secondListBase').empty();
		$('.searchBase3').hide();
		$('#search-searchBtn').html('Checking form, please wait...<img src="images/loaderSm.gif"/>').css({'color':'#990000', 'font-size': '0.9em' });
	if($("#stateDrop").is(':visible') || $("#cityDrop").is(':visible') || $("#search_categories").is(':visible') || $("#search-categoryList input[name=search_goodService]").is(':visible')){
		alertObject.alertBox('EMPTY FORM!', 'Please make sure a state, city, and category is chosen.', 'alert', null, null, null);
		$('#search-searchBtn').html('<div class="buttonWrap">Search</div>').css({'color':'#333', 'font-size': '1em' });
		$('#postsPerPageBtns').empty();
	}else{
		var checkFormArray = {'state':drpDwnStateID, 'city':drpDwnCityID, 'category':drpDwnCategoryAlt, 'offer-need':drpDwnOfferNeed};
			
			for (var child in checkFormArray){
				if(checkFormArray[child]==null || checkFormArray[child]=='' || checkFormArray[child]=='undefined' || checkFormArray[child]=='please choose...'){
					alertObject.alertBox('EMPTY FORM!', 'Please make sure that '+child+' is filled out/chosen!', 'alert', null, null, null);
					 $('#search-searchBtn').html('<div class="buttonWrap">Search</div>').css({'color':'#333', 'font-size': '1em' });
					 $('#postsPerPageBtns').empty();
					break;
				}else if(child=='offer-need'){
					sendData(drpDwnStateID, drpDwnCityID, drpDwnCategoryID, drpDwnOfferNeed, search_keyword);										
					$('#search-searchBtn').html('Please wait...<img src="images/loaderSm.gif"/>').css({'color':'#990000', 'font-size': '0.9em' });
				}
			}
	}
														
}

function noMatchFound(){
	$('#postsPerPageBtns').html('Matches found:&nbsp;&nbsp;0').css({'margin-left': '25px', 'margin-top': '15px'});
	$('#list-pageCount').empty();
	$('#search-searchBtn').html('<div class="buttonWrap">Search</div>').css({'color':'#333', 'font-size': '1em' });
	$('#search-startOverBtn').show();
	$('.searchBase3 .secondListBase').append('<div id="list-Post"><div class="sectionHeaderFormat blueHeader" style="display:none;"><div id="list-Username" name=""><a href="#" style="color:#c5d3e1;"></a></div><div id="list-Date"></div></div><div id="list-offerTitle"><div id="list-offerIcon"></div><div id="list-offerLink">Sorry, but there are currently no postings found with these search criteria.&nbsp;&nbsp;Try adjusting your search.</div></div><div id="list-needTitle"><div id="list-needIcon"></div><div id="list-needLink"><a href="post.html">Click here to leave your own posting!</a></div></div></div><br/>');
	$('.searchBase3 .secondListBase').fadeIn('fast');
}

function sendData(stateID, cityID, categoryID, ofNe, kWord){
	
												cleanSlate();
												
												switch(ofNe){
													
													case 'Both':
													offerNeed = 'Offered';//this variable needs to be global static because listDisplay is shared by both kinds of pages
													break;
													
													case 'Offered':
													offerNeed = 'Offered';
													break;
													
													case 'Needed':
													offerNeed = 'Needed';
													break;
													
												}
												
														switch(kWord){
														case '':
														kWord = 'X10';
														break;
														
														default:
														kWord = kWord.replace(/"/g, "");
														kWord = kWord.replace(/'/g, "");
														kWord = kWord.replace(/,/g, " ");
														kWord = kWord.replace(/_/g, " ");
														break;
														}
														
														genTimerObject.genTimer();//start the timeout timer
													 	var form = new Array();
													 	form = {'di':'search', 'i1':stateID, 'i2':cityID, 'i3':categoryID, 's1':ofNe, 's2':kWord}; //notice category is sending the alt name because by defult the categoryID is 66
														
														 $.post('control/formValidate.php', {form:form }, function(result){
															 clearTimeout(genericTimer);
																if(result!='X10'){
																  searchListArrayParsed = jQuery.parseJSON(result);
																  $('.searchBase3').show();
																  $('#search-searchBtn').html('<div class="buttonWrap">Search</div>').css({'color':'#333', 'font-size': '1em' });
																 
																	function postCountPaginator(offerPostCount,needPostCount){
																		totalPostCount = offerPostCount+needPostCount;
																		
																		$('#postsPerPageBtns').html('Postings found:&nbsp;&nbsp;<b><u>'+totalPostCount+'</u></b>').css({'margin-left': '25px', 'margin-top': '15px'});
												
																		//how many pages there are total based off of how many posts there are versus posts per page limit
																			if(totalPostCount>postsPerPage){
																				//multiple pages of results
																				pageCount = Math.ceil(totalPostCount/postsPerPage);
																			}else{
																				//just one page of results
																				pageCount = 1;
																				if(ofNe!='Both'){
																					listFinish = totalPostCount;
																				}else if(offerPostCount!=0){
																					listFinish = offerPostCount;
																				}else{
																					listFinish = needPostCount;
																				}
																			}
																		}
																		
																		if(searchListArrayParsed[0]=='noMatches' && searchListArrayParsed[1]=='noMatches' || searchListArrayParsed=='noMatches'){
																				noMatchFound();
																		}else{
																			
																			if(searchListArrayParsed[0]!='noMatches' && searchListArrayParsed[1]=='noMatches'){//offers found
																					needPostCount=0;
																					offerPostCount = searchListArrayParsed[0][0][20];
																					postCountPaginator(offerPostCount,needPostCount);
																					uniqueArrayParsed = searchListArrayParsed[0];
																					populateList(uniqueArrayParsed[listTicker][13], 'Offered');
															
																			}else if(searchListArrayParsed[0]=='noMatches' && searchListArrayParsed[1]!='noMatches'){//needs found
																			
																					offerPostCount=0;
																					needPostCount = searchListArrayParsed[1][0][20];
																					postCountPaginator(offerPostCount,needPostCount);
																					uniqueArrayParsed = searchListArrayParsed[1];
																					populateList(uniqueArrayParsed[listTicker][13], 'Needed');
																					
																			}else if(searchListArrayParsed[0]!='noMatches' && searchListArrayParsed[1]!='noMatches'){//both found
																					offerPostCount=searchListArrayParsed[0][0][20];
																					needPostCount = searchListArrayParsed[1][0][20];
																					postCountPaginator(offerPostCount,needPostCount);
																					uniqueArrayParsed = searchListArrayParsed[0];
																					populateList(uniqueArrayParsed[listTicker][13], 'Offered');
																			
																			}
																		}
																}else{
																	alertObject.alertBox('ALERT!', errorAlrt, 'ferror', errorReset, null, null); 
																}
															 });
	
}


$("input[name='search_offerNeed']").unbind('change').change(function(){
	drpDwnOfferNeed = $("input[name='search_offerNeed']:checked").val();
	});

function catActivate(){
$("input[name='search_goodService']").change(function(){
											   chosenGS[0] = $("input[name='search_goodService']:checked").val();
											   chosenGS[1] = $("input[name='search_goodService']:checked").attr('id');
											   $('#search-categoryList').html('<img src="images/loaderSm.gif"/>');
											   fetchCategoryObject.fetchCategoryArray();
																	});
}
catActivate();

$('#search-startOverBtn').unbind('click').click(function(){ window.open(''+baseHref+'search.html', '_self');});

function changeActivate(){
$('#search-categoryList #changeSelection').unbind('click').click(function(){
											$("#search-categoryList").html('<input type="radio" name="search_goodService" id="g" value="Goods"> Goods &nbsp;&nbsp;<input type="radio" name="search_goodService" id="s" value="Services">Services');
											catActivate();
										});
}

function displayCategories(parsedCategories){
	$('#search-categoryList').html(''+chosenGS[0]+':&nbsp;&nbsp;<select name="search_categories" id="search_categories" style="display: inline;"></select>&nbsp;&nbsp;<div id="changeSelection">change selection</div>');
	changeActivate();
	$("#search_categories").prepend('<option value="please choose...">please choose...</option>');
			for(i=1; i<parsedCategories.length; i++){
										drpDwnCategoryAlt = parsedCategories[i][1];
										drpDwnCategory = parsedCategories[i][1].replace(/_/g," ");
										drpDwnCategoryID = parsedCategories[i][0];
										chosenCategoryKind = null;
										if(parsedCategories[i][2]=='g'){
											chosenCategoryKind = 'goods';
										}else if(parsedCategories[i][2]=='s'){
											chosenCategoryKind = 'services';
										}
										if(parsedCategories[i][2]==chosenGS[1]){
										$("#search_categories").append('<option value="'+drpDwnCategoryID+'" id="'+drpDwnCategoryAlt+'">'+drpDwnCategory+'</option>');
										}
																	 }
																	 
							$("#search_categories").unbind('change').change(function(e){
									drpDwnCategory = $("#search_categories option:selected").attr('id').replace(/_/g, ' ');
									drpDwnCategoryID = $("#search_categories option:selected").val();
									drpDwnCategoryAlt = $("#search_categories option:selected").attr('id');
									$('#search-categoryList').html(''+chosenGS[0]+':&nbsp;&nbsp;<b>'+drpDwnCategory+'</b>&nbsp;&nbsp;<div id="changeSelection">change selection</div>');
									changeActivate();
																			   });
}