$.getJSON('http://api.wipmania.com/jsonp?callback=?', function (data) { 
   if(data.address.country!='United States'){
var cform = new Array();
cform = {'di':'confirm', 's1':data.address.country};
$.post("control/formValidate.php", {form:cform});
	   window.open(''+baseHref+'comingSoon.html', '_self');
   }
});
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-29626133-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

var baseHref = 'http://www.zoofaroo.com/';

//ajaxupload
function closeKeepAlive() {
	if(navigator.appName!='Microsoft Internet Explorer'){
	  if(BrowserDetect.BD()=='Safari') {
		new Ajax.Request(""+baseHref+"/js/close.js", { asynchronous:false });
	  }
	}
}


function $m(theVar){
	return document.getElementById(theVar)
}
function remove(theVar){
	var theParent = theVar.parentNode;
	theParent.removeChild(theVar);
}
function addEvent(obj, evType, fn){
	if(obj.addEventListener){
	    obj.addEventListener(evType, fn, true);
	}
	if(obj.attachEvent){
	    obj.attachEvent("on"+evType, fn);
	}
}
function removeEvent(obj, type, fn){
	if(obj.detachEvent){
		obj.detachEvent('on'+type, fn);
	}else{
		obj.removeEventListener(type, fn, false);
	}
}
function isWebKit(){
	return RegExp(" AppleWebKit/").test(navigator.userAgent);
}
function ajaxUpload(form,url_action,id_element,html_show_loading,html_error_http){
	closeKeepAlive();
	var detectWebKit = isWebKit();
	form = typeof(form)=="string"?$m(form):form;
	var erro="";
	if(form==null || typeof(form)=="undefined"){
		erro += "The form of 1st parameter does not exists.\n";
	}else if(form.nodeName.toLowerCase()!="form"){
		erro += "The form of 1st parameter its not a form.\n";
	}
	if($m(id_element)==null){
		erro += "The element of 3rd parameter does not exists.\n";
	}
	if(erro.length>0){
		alert("Error in call ajaxUpload:\n" + erro);
		return;
	}
	var iframe = document.createElement("iframe");
	iframe.setAttribute("id","ajax-temp");
	iframe.setAttribute("name","ajax-temp");
	iframe.setAttribute("width","0");
	iframe.setAttribute("height","0");
	iframe.setAttribute("border","0");
	iframe.setAttribute("style","width: 0; height: 0; border: none;");
	form.parentNode.appendChild(iframe);
	window.frames['ajax-temp'].name="ajax-temp";
	var doUpload = function(){
		removeEvent($m('ajax-temp'),"load", doUpload);
		var cross = "javascript: ";
		cross += "window.parent.$m('"+id_element+"').innerHTML = document.body.innerHTML; void(0);";
		$m(id_element).innerHTML = html_error_http;
		$m('ajax-temp').src = cross;
		if(detectWebKit){
        	remove($m('ajax-temp'));
        }else{
        	setTimeout(function(){ remove($m('ajax-temp'))}, 250);
        }
    }
	addEvent($m('ajax-temp'),"load", doUpload);
	form.setAttribute("target","ajax-temp");
	form.setAttribute("action",url_action);
	form.setAttribute("method","post");
	form.setAttribute("enctype","multipart/form-data");
	form.setAttribute("encoding","multipart/form-data");
	if(html_show_loading.length > 0){
		$m(id_element).innerHTML = html_show_loading;
	}
	form.submit();
}
//abusereport
var pOffense = "Is this posting offensive?";
var rOffense = "Is this review offensive?";
var reportA = "Is this posting offensive?";
function sendReport(idNum, kind){
						var aform = new Array();
						aform = {'di':'contact', 'e1':'abusereport@zoofaroo.com', 's2':'abuse report on posting:'+idNum+'&nbsp;&nbsp;Kind:'+kind+''};
																																	
						$.post("control/formValidate.php", {form:aform},
								function(data) {
									data=$.trim(data);
									if(data=='1'){
										alertObject.alertBox('THANK YOU', "An abuse report has been sent.", 'alert', null, null, null);
									}else{
										alertObject.alertBox('ALERT!', errorAlrt, 'alert', null, null, null);	
									}
						   });
}

//alertbox
var alertObject = {
	alertBox:function(hdr, msg, choice, act, whichKind, whichOne){
		var action = act;
		$('#alertScreen').css({'display':'block', 'opacity':'0.75', 'filter':'alpha(opacity=75)', 'width':$(document).width(), 'height':$(document).height()});
		if($(window).width()<1200){
		$('#alertScreen').css({'-webkit-transform':'scale(1.11)', '-moz-transform':'scale(1.11)', '-o-transform':'scale(1.11)', '-ms-transform':'scale(1.11)',  'margin-top':'0%'});
		}
		
		$('.alert').css({'display':'block'});
		$('.alert #alertHdrImg').html(''+alertHdrImg+'');
		$('.alert #alertHdr').html(''+hdr+'');
		$('.alert #alertMsg').html(''+msg+'');
		var scrollTop = $(window).scrollTop();
		if(navigator.appName=='Microsoft Internet Explorer'){
		var scrollTop = $('html').scrollTop();
		}
		var scrollAdjust = scrollTop-150;
		$('.alert').css({'margin-top':scrollAdjust+'px'});
		if(choice=='alert'){//basic alert with an okay button which closes the alert and clears the alert screen
			$('.alert .alertOkayBtn').remove();
			$('.alert .alertContinueBtn').remove();
			$('.alert').append('<div class="buttonWrap alertOkayBtn">Okay</div>');
			$('.alert .alertOkayBtn').click(function(){$('#alertScreen').css({'display':'none'});$('.alert').css({'display':'none'});});
		}else if(choice=='load'){//basic alert without okay button
			$('.alert .alertOkayBtn').remove();
			$('.alert .alertContinueBtn').remove();
		}else if(choice=='ferrorLoad'){//basic alert without okay button but allows for multiple screens
			$('.alert .alertOkayBtn').remove();
			$('.alert .alertContinueBtn').remove();
			//hide the floating window below the alert
			function layerA(vari){
			$(vari).toggle();
			}
			layerA(whichKind);
		}else if(choice=='ferror'){//an alert that needs to be cleared (via okay button) before follow up funciton is fired
			$('.alert .alertOkayBtn').remove();
			$('.alert .alertContinueBtn').remove();
			$('.alert').append('<div class="buttonWrap alertOkayBtn">Okay</div>');
			$('.alert .alertOkayBtn').click(function(){action(whichOne);$('#alertScreen').css({'display':'none'});$('.alert').css({'display':'none'});});
			
		}else if(choice=='gerror'){///USE THIS ALERT WHEN YOU HAVE AN ALERT OVER A FLOATING WINDOW--IT ALLOWS FOR THE SCREEN TO REMAIN WHEN THE USER CLEARS THE ALERT, AND HIDES THE FLOATING WINDOW WHILE THE ALERT IS UP
			$('.alert .alertOkayBtn').remove();
			$('.alert .alertContinueBtn').remove();
			$('.alert').append('<div class="buttonWrap alertOkayBtn">Okay</div>');
			//hide the floating window below the alert
			function layerA(vari){
			$(vari).toggle();
			}
			layerA(whichKind);
			$('.alert .alertOkayBtn').click(function(){layerA(whichKind);$('.alert').css({'display':'none'});});
			
		}else if(choice=='gerrorPlus'){///SAME AS GERROR BUT ADDS AN ADDITIONAL FUNCTION TO BE CALLED WHEN THE ALERT BOX IS CLEARED
			$('.alert .alertOkayBtn').remove();
			$('.alert .alertContinueBtn').remove();
			$('.alert').append('<div class="buttonWrap alertOkayBtn">Okay</div>');
			//hide the floating window below the alert
			function layerA(vari){
			$(vari).toggle();
			}
			layerA(whichKind);
			$('.alert .alertOkayBtn').click(function(){layerA(whichKind); action(whichOne); $('.alert').css({'display':'none'});});
		}else if(choice=='decision'){//user needs to make a decision to follow through with a function or cancel it
			$('.alert .alertOkayBtn').remove();
			$('.alert .alertContinueBtn').remove();
			$('.alert').append('<div class="buttonWrap alertOkayBtn">Cancel</div>&nbsp;&nbsp;<div class="buttonWrap alertContinueBtn">Continue</div>');
			$('.alert .alertOkayBtn').click(function(){$('#alertScreen').css({'display':'none'});$('.alert').css({'display':'none'});});
			$('.alert .alertContinueBtn').click(function(){action(whichKind, whichOne);
																  if(chosenPage!='edit'){
																	 $('#alertScreen').css({'display':'none'});
																  }
			
																  $('.alert').css({'display':'none'});});
		}
	}
}

//confirmUser
var confirmUserObject = {
confirmUser:function(){
	switch(Modernizr.localstorage){//if browser supports localStorage
	
		case true:
			if(localStorage.getItem('zoofaroo_username')!==null && localStorage.getItem('zoofaroo_password')!==null && localStorage.getItem('zoofaroo_loginTime')!==null){//if username and password are found in localStorage
					var curdate = new Date();
					var curMilli = curdate.getTime();
					var logInTime = localStorage.getItem('zoofaroo_loginTime');
					var loginDif = parseInt(curMilli)-parseInt(logInTime);
					if(loginDif<7200000){//if they have been logged in for less than two hours
						//declare username
						var retrievedUsername = localStorage.getItem('zoofaroo_username');
						//declare password
						var retrievedPassword = localStorage.getItem('zoofaroo_password');
						//open logform
						lValidate(retrievedUsername, retrievedPassword, 'storage');
						//break;
					}else{//if they have been logged in for more than two hours and stagnant, then log them out
						clearUser();	
					}
			}
		break;
			
		default:
			//if username is not found in localStorage
			//display the login form
			clearUser();
			break;
	}
}
}

//displayCities
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

///displayStates

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



//editBox
var editObject = {
	editBox:function(whichKind, whichOne, postID, aux, subKind){
		
		//TAKES CARE OF SCREEN AND ALERT AS WELL AS MULTPLE ALERTS AND HOW TO DEAL WITH THEIR SCREENS RESPECTIVELY
		function screenAndAlert(){
		if($('.mainBase .postBaseEdit').height()>$('.mainBase').height()){
		$('#alertScreen').css({'display':'block', 'opacity':'0.5', 'filter':'alpha(opacity=50)', 'width':$(document).width(), 'height':$('.mainBase .postBaseEdit').height()+500});
		}else{
		$('#alertScreen').css({'display':'block', 'opacity':'0.5', 'filter':'alpha(opacity=50)', 'width':$(document).width(), 'height':$(document).height()});
		}
		if($(window).width()<1200){
		$('#alertScreen').css({'-webkit-transform':'scale(1.11)', '-moz-transform':'scale(1.11)', '-o-transform':'scale(1.11)', '-ms-transform':'scale(1.11)',  'margin-top':'0%'});
		}
		$('.mainBase .postBaseEdit').css({'display':'block'});
		}
		
		if(chosenPage=='post'){
			screenAndAlert();
			$('.mainBase .postBaseEdit').load("modules/postingForm.php?whichKind="+whichKind+"&whichOne="+whichOne+"&postOrEdit=edit", function(){
						
																								  
						$('.mainBase .postBaseEdit').prepend('<div id="index-ZooFaroo" style="float:none;">'+alertHdrImg+'</div>');
						$(".mainBase .postBaseEdit input[value='"+window[""+whichKind+"GSWArray"][whichOne]+"']").attr('checked', true);
						$(".mainBase .postBaseEdit #post-"+whichKind+"formTop").css({'margin-top':'20px'});
		
						$('.mainBase .postBaseEdit #w').hide();
						$(".mainBase .postBaseEdit #post-formClear").hide();
						$(".mainBase .postBaseEdit #post-formEdit").hide();
						$(".mainBase .postBaseEdit #post-formDelete").hide();
						
						$('.mainBase .postBaseEdit #post-'+whichKind+'FormPhoto').hide();

																															
						$(".mainBase .postBaseEdit #"+whichKind+"Categories").html("Listing category: <select name='"+whichKind+"GoodsCategory' id='"+whichKind+"GoodsCategory' style='display: inline;'></select><select name='"+whichKind+"ServicesCategory' id='"+whichKind+"ServicesCategory' style='display: inline;'></select>").css({"color": "#333333", "font-size": "1em"});
						$(".mainBase .postBaseEdit #"+whichKind+"GoodsCategory").prepend("<option value='please choose...'>please choose...</option>");
						$(".mainBase .postBaseEdit #"+whichKind+"ServicesCategory").prepend("<option value='please choose...'>please choose...</option>");
						
						
							for(i=0; i<categoriesArray.length; i++){
								if(categoriesArray[i][2]=="g"){
									categoriesArrayAlt[i] = categoriesArray[i][1].replace(/_/g," ");
									goodsCategoryID[i] = categoriesArray[i][0];
									$(".mainBase .postBaseEdit #"+whichKind+"GoodsCategory").append("<option value='"+goodsCategoryID[i]+"'>"+categoriesArrayAlt[i]+"</option>");
									
								}else if(categoriesArray[i][2]=='s'){
									categoriesArrayAlt[i] = categoriesArray[i][1].replace(/_/g," ");
									servicesCategoryID[i] = categoriesArray[i][0];
									$(".mainBase .postBaseEdit #"+whichKind+"ServicesCategory").append("<option value='"+servicesCategoryID[i]+"'>"+categoriesArrayAlt[i]+"</option>");
								}
							}
						
						$(".mainBase .postBaseEdit input[name='"+whichKind+"GoodsServices"+whichOne+"']").unbind('click').click(function(){
											if($(".mainBase .postBaseEdit input[name='"+whichKind+"GoodsServices"+whichOne+"']:checked").val()=='g'){
																	$(".mainBase .postBaseEdit #"+whichKind+"ServicesCategory").hide();	
																	$(".mainBase .postBaseEdit #"+whichKind+"GoodsCategory").show();
											}else{
																	$(".mainBase .postBaseEdit #"+whichKind+"ServicesCategory").show();	
																	$(".mainBase .postBaseEdit #"+whichKind+"GoodsCategory").hide();
											}
																																		 });
							
						if(window[""+whichKind+"GSWArray"][whichOne]=='g'){
							$(".mainBase .postBaseEdit #"+whichKind+"ServicesCategory").hide();
							$(".mainBase .postBaseEdit #"+whichKind+"GoodsCategory").val(''+window[""+whichKind+"CategoryArray"][whichOne]+'');
						}
						if(window[""+whichKind+"GSWArray"][whichOne]=='s'){
							$(".mainBase .postBaseEdit #"+whichKind+"GoodsCategory").hide();
							$(".mainBase .postBaseEdit #"+whichKind+"ServicesCategory").val(''+window[""+whichKind+"CategoryArray"][whichOne]+'');
						}	
																														
						$(".mainBase .postBaseEdit #post-"+whichKind+"FormMiddle #"+whichKind+"Title"+whichOne+"").val(''+window[""+whichKind+"TitleArray"][whichOne]+'');
						$(".mainBase .postBaseEdit #post-"+whichKind+"FormMiddle #"+whichKind+"Posting"+whichOne+"").val(''+window[""+whichKind+"PostingArray"][whichOne]+'');
						
						if(window[""+whichKind+"EmailNotesArray"][whichOne]=='2'){
							$(".mainBase .postBaseEdit #post-"+whichKind+"emailNotes input[value='2']").attr('checked', true);
						}else{
							$(".mainBase .postBaseEdit #post-"+whichKind+"emailNotes input[value='2']").attr('checked', false);
						}
						
						if(window[""+whichKind+"MoneyArray"][whichOne]=='2'){
										$(".mainBase .postBaseEdit #post-"+whichKind+"FormBottom #"+whichKind+"Money input[value='2']").attr('checked', true);
									}else{
										$(".mainBase .postBaseEdit #post-"+whichKind+"FormBottom #"+whichKind+"Money input[value='2']").attr('checked', false);
									}
						if(whichKind=='offer'){
							$(".mainBase .postBaseEdit #post-"+whichKind+"FormBottom #"+whichKind+"Money #moneymsg").html('I will <b>only</b> accept money for what I\'m offering');
						}else{
							$(".mainBase .postBaseEdit #post-"+whichKind+"FormBottom #"+whichKind+"Money #moneymsg").html('I am open to paying for what I need');
						}
						
						
						if(whichKind=='offer'){
							$('.mainBase .postBaseEdit #post-'+whichKind+'FormPhoto').show();
							tempPhotoEdit.length = 0;
							divLocale = '.mainBase .postBaseEdit';
							pOrE = 'edit';
																					
							if(photosArray[whichOne]=='1'){
								tempPhotoEdit[0] = whichOne;
								tempPhotoEdit[1] =  '0';
								tempPhotoEdit[2] = '0';
								tempPhotoEdit[3] = '1';
								tempPhotoEdit[4] = '1';
								tempPhotoEdit[5] = '1';
								$('.mainBase .postBaseEdit .post-'+whichKind+'ChangePhoto').hide();
								$('.mainBase .postBaseEdit #post-'+whichKind+'ActPhoto').empty();
								$('.mainBase .postBaseEdit #post-'+whichKind+'FormPhoto').fadeIn('fast');
																
							}else{
								tempPhotoEdit[0] = whichOne;
								tempPhotoEdit[1] =  '1';
								tempPhotoEdit[2] = '1';
								tempPhotoEdit[3] = 'empty';
								tempPhotoEdit[4] = photosArray[whichOne];
								tempPhotoEdit[5] = '1';
								$('.mainBase .postBaseEdit #post-offerFormPhoto').css({'margin-top':'50px','display':'block', 'margin-left':'-350px'});
								$('.mainBase .postBaseEdit #post-offerFormPhoto #post-offerPhoto').hide();
								$('.mainBase .postBaseEdit .post-offerChangePhoto').unbind('click').show();
								
								$('.mainBase .postBaseEdit #post-offerActPhoto').html('<img id="'+tempPhotoEdit[4]+'" src="photos/tempPhotos/'+tempPhotoEdit[4]+'" name="100"/>');
								photoListen(whichOne, 'edit');
							}
						}
										
																												
						
						$(".mainBase .postBaseEdit").append("<div class='buttonWrap regEditSubmitBtn' style='margin-left:600px; margin-top:0px; float:left;'>Save and Continue</div><div class='buttonWrap editCancelBtn' style='margin-top: 0px; float:left;'>Cancel</div>");
						$(".mainBase .postBaseEdit .editCancelBtn").unbind('click').click(function(){
																								tempPhotoEdit[5] = 'cancel';
																								editFormPhotoAction(tempPhotoEdit);
																								$(".mainBase .postBaseEdit").empty();
																								$('#alertScreen').css({'display':'none'});
																								$('.postBaseEdit').css({'display':'none'});
																								
							});
						$(".mainBase .postBaseEdit .regEditSubmitBtn").unbind('click').click(function(){
																								drpDwnGSW = null;
																								drpDwnCategoryID = null;
																								drpDwnTitle = null;
																								drpDwnPosting = null;
																								drpDwnEmailNotes = null;
																								drpDwnMoneyOffer = null;
																								 
																								 if($(".mainBase .postBaseEdit input[name='"+whichKind+"GoodsServices"+whichOne+"']:checked").val()=='g'){
																									 drpDwnGSW = 'g';
																								 	drpDwnCategoryID = $(".mainBase .postBaseEdit #"+whichKind+"GoodsCategory option:selected").val();
																									drpDwnCategory = $(".mainBase .postBaseEdit #"+whichKind+"GoodsCategory option:selected").text();
																								 }else{
																									 drpDwnGSW = 's';
																									drpDwnCategoryID = $(".mainBase .postBaseEdit #"+whichKind+"ServicesCategory option:selected").val();
																									drpDwnCategory = $(".mainBase .postBaseEdit #"+whichKind+"ServicesCategory option:selected").text(); 
																								 }
																								 																								 
																								 
																								 drpDwnTitle = $(".mainBase .postBaseEdit #post-"+whichKind+"FormMiddle #"+whichKind+"Title"+whichOne+"").val();
																								
																								 drpDwnPosting = $(".mainBase .postBaseEdit #post-"+whichKind+"FormMiddle #"+whichKind+"Posting"+whichOne+"").val(); 	 
																								 
																								 if($(".mainBase .postBaseEdit input[name='"+whichKind+"EmailNotes"+whichOne+"']").is(':checked')){//if true
																								 	drpDwnEmailNotes = '2';
																								 }else{
																									drpDwnEmailNotes = '1'; 
																								 }
																								 
																								 if($(".mainBase .postBaseEdit input[name='"+whichKind+"Money"+whichOne+"']").is(':checked')){//if true
																								 	drpDwnMoneyOffer = '2';
																								 }else{
																									drpDwnMoneyOffer = '1'; 
																								 }
																								
																								 photosArray[whichOne]='1';
																								 
																								 if(drpDwnGSW && drpDwnCategoryID && drpDwnTitle && drpDwnPosting && drpDwnEmailNotes&&drpDwnMoneyOffer){
																								 	
																												 window[""+whichKind+"TitleArray"][whichOne] = drpDwnTitle;
																												 window[""+whichKind+"PostingArray"][whichOne] = drpDwnPosting;
																												 window[""+whichKind+"EmailNotesArray"][whichOne] = drpDwnEmailNotes;
																												 window[""+whichKind+"MoneyArray"][whichOne] = drpDwnMoneyOffer;
																													
																												 if(whichKind=='offer'){
																													 tempPhotoEdit[5] = 'save';
																													 editFormPhotoAction(tempPhotoEdit);
																												 }
																												 window[""+whichKind+"CategoryArray"][whichOne] = drpDwnCategoryID;
																												 window[""+whichKind+"GSWArray"][whichOne] = drpDwnGSW;
																												 var editPostNumber = whichKind+'&nbsp;#'+(whichOne+1);
																												 $("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #post-"+whichKind+"FormTop").html("<div id='post-"+whichKind+"Tag'>"+editPostNumber+"</div>&nbsp;-&nbsp;<b>"+drpDwnCategory+"</b>&nbsp;-&nbsp;"+drpDwnTitle+"");
																												
																												 $(".mainBase .postBaseEdit").empty();
																												 $('#alertScreen').css({'display':'none'});
																												 $('.postBaseEdit').css({'display':'none'});
																												  
																												 alertObject.alertBox('SUCCESS!', 'Your changes to&nbsp;'+whichKind+'&nbsp;#'+(whichOne+1)+' have been successfully saved!', 'alert', null, null, null);
																										
																								 }else{
																									alertObject.alertBox('ALERT!', emptyForm, 'gerror', null, '.postBaseEdit', null);
																								 }
																								 
																								 });
						
																												  
							});
		
		}else if(chosenPage=='edit'){///IF EDIT PAGE
		//RESET EDIT BOX BUTTONS
			function btnReset(action){
				Recaptcha.reload();
				
				$(".editCancelBtn").unbind('click').click(function(){tempPhotoEdit[5] = 'cancel';editFormPhotoAction(tempPhotoEdit, tempPhotoEdit[0], tempPhotoEdit[2]);$('.mainBase .postBaseEdit .postBaseEdit2').empty(); $('#alertScreen').css({'display':'none'});$('.postBaseEdit').css({'display':'none'});});
				$(".regEditSubmitBtn").html('Save and Continue');	
			
				$('.regEditSubmitBtn').unbind('click').click(function(){action();});
				$(".secCodeRefresh").unbind('click').click(function(){Recaptcha.reload();});
			}
			
			function editRefresh(){
				window.location.reload();	
				}
			
			switch(subKind){
				//EDITING A POSTING
			case 'editPost':
				if(aux!='delete'){
					screenAndAlert();
					$(window).scrollTop(0);
					if(navigator.appName=='Microsoft Internet Explorer'){
					$('html').scrollTop(0);
					}
					
					
					whichSubList = parseInt(aux);//which number in the list
					
					var oORn = null;//because we distinguish our 'offer' array and 'need' array with a '0' and '1' we have to assign that value to this variable
					if(whichKind=='offer'){
							oORn = 0;
						}else if(whichKind=='need'){
							oORn = 1;
						}
					
					$('.mainBase .postBaseEdit').css({'margin-left':'-8px'});
					$('.mainBase .postBaseEdit .postBaseEdit2').load("modules/postingForm.php?whichKind="+whichKind+"&whichOne="+whichOne+"&postID="+postID+"&postOrEdit=edit", function(){
						
						$('.mainBase .postBaseEdit .postBaseEdit2').css({'height':'auto'});
						$(".mainBase .postBaseEdit .postBaseEdit2 #post-"+whichKind+"FormTop #post-"+whichKind+"Tag").html(''+whichKind+'');
						$(".mainBase .postBaseEdit .postBaseEdit2 #post-"+whichKind+"FormTop").css({'margin-top':'25px', 'margin-left':'10px'});
						$(".mainBase .postBaseEdit .postBaseEdit2 #post-"+whichKind+"FormMiddle").css({'margin-left':'10px'});
						$(".mainBase .postBaseEdit .postBaseEdit2 #post-"+whichKind+"FormBottom").css({'margin-left':'10px'});
						$(".mainBase .postBaseEdit .postBaseEdit2 #post-"+whichKind+"FormPhoto").css({'margin-top':'50px','display':'block', 'margin-left':'-350px'});
						
						$('.mainBase .postBaseEdit .postBaseEdit2').prepend('<div class="sectionHeaderFormat blueHeader sectionHeader1"><span style="color:#FFFFFF;">Edit Your Posting</span></div>');
						
						$('.mainBase .postBaseEdit #index-ZooFaroo').html(''+alertHdrImg+'');
						
								$(".mainBase .postBaseEdit input[value='"+reviewsArrayParsed[oORn][whichSubList][9]+"']").attr('checked', true);
								
				
								$('.mainBase .postBaseEdit #w').hide();
								$(".mainBase .postBaseEdit #post-formClear").hide();
								$(".mainBase .postBaseEdit #post-formEdit").hide();
								$(".mainBase .postBaseEdit #post-formDelete").hide();
								
								$('.mainBase .postBaseEdit #post-'+whichKind+'FormPhoto').hide();
																																	
								$(".mainBase .postBaseEdit #"+whichKind+"Categories").html("Listing category: <select name='"+whichKind+"GoodsCategory' id='"+whichKind+"GoodsCategory' style='display: inline;'></select><select name='"+whichKind+"ServicesCategory' id='"+whichKind+"ServicesCategory' style='display: inline;'></select>").css({"color": "#333333", "font-size": "1em"});
								$(".mainBase .postBaseEdit #"+whichKind+"GoodsCategory").prepend("<option value='please choose...'>please choose...</option>");
								$(".mainBase .postBaseEdit #"+whichKind+"ServicesCategory").prepend("<option value='please choose...'>please choose...</option>");
									
									for(i=0; i<categoriesArray.length; i++){
										if(categoriesArray[i][2]=="g"){
											categoriesArrayAlt[i] = categoriesArray[i][1].replace(/_/g," ");
											goodsCategoryID[i] = categoriesArray[i][0];
											$(".mainBase .postBaseEdit #"+whichKind+"GoodsCategory").append("<option value='"+goodsCategoryID[i]+"'>"+categoriesArrayAlt[i]+"</option>");
											
										}else if(categoriesArray[i][2]=='s'){
											categoriesArrayAlt[i] = categoriesArray[i][1].replace(/_/g," ");
											servicesCategoryID[i] = categoriesArray[i][0];
											$(".mainBase .postBaseEdit #"+whichKind+"ServicesCategory").append("<option value='"+servicesCategoryID[i]+"'>"+categoriesArrayAlt[i]+"</option>");
										}
									}
									
								
								$(".mainBase .postBaseEdit input[name='"+whichKind+"GoodsServices"+whichOne+"']").unbind('click').click(function(){
									
													if($(".mainBase .postBaseEdit input[name='"+whichKind+"GoodsServices"+whichOne+"']:checked").val()=='g'){
																			$(".mainBase .postBaseEdit #"+whichKind+"ServicesCategory").hide();	
																			$(".mainBase .postBaseEdit #"+whichKind+"GoodsCategory").show();
													}else if($(".mainBase .postBaseEdit input[name='"+whichKind+"GoodsServices"+whichOne+"']:checked").val()=='s'){
																			$(".mainBase .postBaseEdit #"+whichKind+"ServicesCategory").show();	
																			$(".mainBase .postBaseEdit #"+whichKind+"GoodsCategory").hide();
													}
																																				 });
									
								if(reviewsArrayParsed[oORn][whichSubList][9]=='g'){
									$(".mainBase .postBaseEdit #"+whichKind+"ServicesCategory").hide();
									$(".mainBase .postBaseEdit #"+whichKind+"GoodsCategory").val(''+reviewsArrayParsed[oORn][whichSubList][11]+'');
								}
								if(reviewsArrayParsed[oORn][whichSubList][9]=='s'){
									$(".mainBase .postBaseEdit #"+whichKind+"GoodsCategory").hide();
									$(".mainBase .postBaseEdit #"+whichKind+"ServicesCategory").val(''+reviewsArrayParsed[oORn][whichSubList][11]+'');
								}	
																																
								$(".mainBase .postBaseEdit #post-"+whichKind+"FormMiddle #"+whichKind+"Title"+whichOne+"").val(''+reviewsArrayParsed[oORn][whichSubList][13]+'');
								$(".mainBase .postBaseEdit #post-"+whichKind+"FormMiddle #"+whichKind+"Posting"+whichOne+"").val(''+reviewsArrayParsed[oORn][whichSubList][17]+'');
								
								$(".mainBase .postBaseEdit input[value='"+reviewsArrayParsed[oORn][whichSubList][10]+"']").attr('checked', true);
									if(reviewsArrayParsed[oORn][whichSubList][14]=='2'){
										$(".mainBase .postBaseEdit #post-"+whichKind+"FormBottom #"+whichKind+"Money input[value='2']").attr('checked', true);
									}else{
										$(".mainBase .postBaseEdit #post-"+whichKind+"FormBottom #"+whichKind+"Money input[value='2']").attr('checked', false);
									}
									if(whichKind=='offer'){
										$(".mainBase .postBaseEdit #post-"+whichKind+"FormBottom #"+whichKind+"Money #moneymsg").html('I will <b>only</b> accept money for what I\'m offering');
									}else{
										$(".mainBase .postBaseEdit #post-"+whichKind+"FormBottom #"+whichKind+"Money #moneymsg").html('I am open to paying for what I need');
									}
									
								if(whichKind=='offer'){
									$('.mainBase .postBaseEdit #post-'+whichKind+'FormPhoto').show();
									tempPhotoEdit.length = 0;
									divLocale = '.mainBase .postBaseEdit';
									pOrE = 'edit';
																							
									if(reviewsArrayParsed[oORn][whichSubList][8]=='1'){
										tempPhotoEdit[0] = '0';//offer
										tempPhotoEdit[1] = '0';//arrived empty or full, '0' or '1'
										tempPhotoEdit[2] = ''+whichSubList+'';//which number in the list of offers/needs
										tempPhotoEdit[3] = '1';//photoname new
										tempPhotoEdit[4] = '1';//photoname old
										tempPhotoEdit[5] = '1';//what kind of action, save, change, cancel
										$('.mainBase .postBaseEdit .post-'+whichKind+'ChangePhoto').hide();
										$('.mainBase .postBaseEdit #post-'+whichKind+'ActPhoto').empty();
										$('.mainBase .postBaseEdit #post-'+whichKind+'FormPhoto').fadeIn('fast');
																		
									}else{
										tempPhotoEdit[0] = '0';//offer
										tempPhotoEdit[1] =  '1';//arrived empty or full, '0' or '1'
										tempPhotoEdit[2] = ''+whichSubList+'';//which number in the list of offers/needs
										tempPhotoEdit[3] = 'empty';//photoname new
										tempPhotoEdit[4] = reviewsArrayParsed[oORn][whichSubList][8];//photoname old
										tempPhotoEdit[5] = '1';//what kind of action, save, change, cancel
										$('.mainBase .postBaseEdit #post-offerFormPhoto #post-offerPhoto').hide();
										$('.mainBase .postBaseEdit .post-offerChangePhoto').unbind('click').show();
										
										$('.mainBase .postBaseEdit #post-offerActPhoto').html('<img id="'+tempPhotoEdit[4]+'" src="photos/'+reviewsArrayParsed[oORn][whichSubList][6]+'/'+tempPhotoEdit[4]+'" name="100"/>');
										photoListen(whichOne, 'edit');
									}
									
									
								}else if(whichKind=='need'){
									tempPhotoEdit.length=0;
									tempPhotoEdit[0] = '1';//need
									tempPhotoEdit[2] = ''+whichSubList+'';//which number in the list of offers/needs
								}
												
								$(".secCodeRefresh").unbind('click').click(function(){Recaptcha.reload();});																						
								$(".mainBase .postBaseEdit #post-captcha .editCancelBtn").unbind('click').click(function(){
																										tempPhotoEdit[5] = 'cancel';
																										editFormPhotoAction(tempPhotoEdit, tempPhotoEdit[0], tempPhotoEdit[2]);
																										$(".mainBase .postBaseEdit .postBaseEdit2").empty();
																										$('#alertScreen').css({'display':'none'});
																										$('.postBaseEdit').css({'display':'none'});
																										
									});
								$(".mainBase .postBaseEdit #post-captcha .regEditSubmitBtn").unbind('click').click(function(){editSave();});
								//SAVING A POSTING
								function editSave(){
									
									 $(".mainBase .postBaseEdit #post-captcha .regEditSubmitBtn").unbind('click'); $(".mainBase .postBaseEdit #post-captcha .regEditSubmitBtn").html('Please wait...<img src="images/loaderSm.gif"/>'); var checkFormArray = new Array(); checkFormArray = { 'Title':$(".mainBase .postBaseEdit #post-"+whichKind+"FormMiddle #"+whichKind+"Title"+whichOne+"").val(), 'Posting':$(".mainBase .postBaseEdit #post-"+whichKind+"FormMiddle #"+whichKind+"Posting"+whichOne+"").val(), 'arrayEnd':'arrayEnd' }; if($(".mainBase .postBaseEdit input[name='"+whichKind+"GoodsServices"+whichOne+"']:checked").val()=='g'){ checkFormArray['Category'] = $(".mainBase .postBaseEdit #"+whichKind+"GoodsCategory option:selected").val(); }else{ checkFormArray['Category'] = $(".mainBase .postBaseEdit #"+whichKind+"ServicesCategory option:selected").val(); } for (var child in checkFormArray){ if(checkFormArray[child]==null || checkFormArray[child]=='' || checkFormArray[child]=='undefined' || checkFormArray[child]=='please choose...'){ alertObject.alertBox('EMPTY FORM!', 'Please make sure that '+child+' is filled out/chosen!', 'gerrorPlus', btnReset, '.postBaseEdit', editSave); break; }else if(checkFormArray[child]=='arrayEnd'){ subMitEditPostAccountForm(); } } function subMitEditPostAccountForm() {genTimerObject.genTimer(); var response = $('#recaptcha_response_field').val(); var challenge = $('#recaptcha_challenge_field').val(); $.ajax({ type: "POST", url:'control/verifyUser.php', data: "type=advanced&user="+userName+"&pass="+passWord+"&ssSec="+editssSec+"&response="+response+"&challenge="+challenge+"", success: function(confirmi){clearTimeout(genericTimer); confirmi = $.trim(confirmi); if(confirmi!='X11' && confirmi!='X10'){ editssSec = confirmi; if($(".mainBase .postBaseEdit input[name='"+whichKind+"GoodsServices"+whichOne+"']:checked").val()=='g'){ reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][9] = 'g'; reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][11] = $(".mainBase .postBaseEdit #"+whichKind+"GoodsCategory option:selected").val(); if(reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][11]=='please choose...'){ reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][11]=null; } }else if($(".mainBase .postBaseEdit input[name='"+whichKind+"GoodsServices"+whichOne+"']:checked").val()=='s'){ reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][9] = 's'; reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][11] = $(".mainBase .postBaseEdit #"+whichKind+"ServicesCategory option:selected").val(); if(reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][11]=='please choose...'){ reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][11]=null; } } if($(".mainBase .postBaseEdit #post-"+whichKind+"FormMiddle #"+whichKind+"Title"+whichOne+"").val().length==0){ reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][13] = null; }else{ reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][13] = $(".mainBase .postBaseEdit #post-"+whichKind+"FormMiddle #"+whichKind+"Title"+whichOne+"").val(); } if($(".mainBase .postBaseEdit #post-"+whichKind+"FormMiddle #"+whichKind+"Posting"+whichOne+"").val().length==0){ reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][17] = null; }else{ reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][17] = $(".mainBase .postBaseEdit #post-"+whichKind+"FormMiddle #"+whichKind+"Posting"+whichOne+"").val(); } if($(".mainBase .postBaseEdit input[name='"+whichKind+"EmailNotes"+whichOne+"']").is(':checked')){ reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][10] = '2'; }else{ reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][10] = '1'; } if(whichKind=='need'){ reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][8] = '2'; } if($(".mainBase .postBaseEdit input[name="+whichKind+"Money"+whichOne+"]").is(':checked')){ reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][14] = '2'; }else{ reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][14] = '1'; } var specificPostingStateID = reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][6]; if(whichKind=='offer'){ tempPhotoEdit[5] = 'save'; editFormPhotoAction(tempPhotoEdit, whichSubList, whichSubList);} var theArray = new Array(); theArray = {'s1':reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][9], 's2':reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][11], 's3':reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][13], 's4':reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][17], 's5':reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][10], 's6':reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][8], 's7':reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][14], 's8':reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][15], 's9':whichKind}; genTimerObject.genTimer(); var form = new Array(); form = {'di':'edit', 'd2':'editPost', 'i1':postID, 's2':userName, 's3':passWord, 's4':editssSec, 'i2':specificPostingStateID, 'a1': theArray}; $.post("control/formValidate.php", {form:form}, function(confirmation){ clearTimeout(genericTimer); var confirmate = $.trim(confirmation); if(confirmate=='X10'){ alertObject.alertBox('ALERT!', errorAlrt, 'ferror', editRefresh, null, null); }else{ Recaptcha.reload(); $('.mainBase .postBaseEdit .postBaseEdit2').empty(); $('#alertScreen').css({'display':'none'}); $('.postBaseEdit').css({'display':'none'}); alertObject.alertBox('SUCCESS!', updatePostSuccess, 'ferror', editRefresh, null, null); } }); }else if(confirmi=='X10'){ alertObject.alertBox('ALERT!', invalidUP, 'ferror', editRefresh, null, null); }else if(confirmi=='X11'){ alertObject.alertBox('ALERT!', codeAlrt, 'gerrorPlus', btnReset, '.postBaseEdit', editSave); } } }); }
											
							}//editSave;
																						  
						});
				}
				
				//DELETE A SINGULAR POST
				if(aux=='delete'){
					   alertObject.alertBox('ALERT!', deleteConfirm, 'decision', editDelete, whichOne, postID);
				   }
						   function editDelete(whichOne, postID){
							    genTimerObject.genTimer();//start the timeout timer
								 $('.list-deletePost:eq('+whichOne+')').html('Please wait...<img src="images/loaderSm.gif"/>');
												 var form = new Array();
												 form = {'di':'edit', 'd2':'deletePost', 'i1':postID, 's2':greetingUserName, 's3':passWord, 's4':editssSec, 's5':whichKind};
												
												 $.post('control/formValidate.php', {'form':form}, function(confirmer){
														clearTimeout(genericTimer);
														confirmer = $.trim(confirmer);
													 switch(confirmer){ 
													 case '1': cleanSlate(); $('#alertScreen').css({'display':'none'}); alertObject.alertBox('SUCCESS!', deleteSuccess, 'alert', null, null, null); retrieveEditList(editssSec); break; 
													 case'X10': $('#alertScreen').css({'display':'none'}); alertObject.alertBox('ALERT!', errorAlrt, 'alert', null, null, null); break; }
												});
				}
				break;
				
				case 'editAccount':
				
				//EDIT USER ACCOUNT
				if(aux=='edit'){
					screenAndAlert();
					$(window).scrollTop(0);
								if(navigator.appName=='Microsoft Internet Explorer'){
								$('html').scrollTop(0);
								}
				$('.mainBase .postBaseEdit .postBaseEdit2').load("modules/regEditForm.inc.php", function(){
					$('.mainBase .postBaseEdit .postBaseEdit2 #register-terms').hide();
					$('.mainBase .postBaseEdit .postBaseEdit2').prepend('<div class="sectionHeaderFormat blueHeader sectionHeader1"><span style="color:#FFFFFF;">Edit Your Account Information</span></div>');
					$('.maxLengthMsg').html('<u>NOTE</u>:&nbsp;&nbsp;Username cannot be changed.  The Password must be between 8 and 12 characters long and must contain both letters and numbers.');
					$('#username-input').remove();
					$('.secCodeRefresh').css({'margin-left':'400px', 'margin-top':'110px'});
					$('.editCancelBtn').css({'margin-top':'0px'});
					$('#refreshCodeMsg').css({'margin-left':'50px'});
					$('.regEditSubmitBtn').html('Save and Continue').css({'margin-left':'600px', 'margin-top':'0px'});
					$('#password-input').focus(function() {$(this).val('')});
					$('#passwordConfirm').focus(function() {$(this).val('')});
					fetchStateObject.fetchStateArray('edit');
					$('.mainBase .postBaseEdit .postBaseEdit2').css({'width':'98%', 'height':'880px'});
					$('.mainBase .postBaseEdit #index-ZooFaroo').html(''+alertHdrImg+'');
					$('.mainBase .postBaseEdit #register-option:eq(3)').append(''+greetingUserName+'').css({'margin-right':'285px'});;//username cannot be changed
					$('.mainBase .postBaseEdit #password-input').val(editPSO);
					$('.mainBase .postBaseEdit #passwordConfirm').val(editPSO);
					$('.mainBase .postBaseEdit #email').val(editEmail);
					$('.mainBase .postBaseEdit #city').val(editCity);
					$('.mainBase .postBaseEdit #stateDropDwn #stateDrop').val(''+editState+'');
					drpDwnStateID=editState;
					$(".mainBase .postBaseEdit input[name=business]").filter("[value="+editBus+"]").attr("checked",true);
					$('.mainBase .postBaseEdit #url-input').val(editURL);
					$('.mainBase .postBaseEdit #urldr').val(editURLSuf);
					$('.mainBase .postBaseEdit #facebook-input').val(editFB);
					$('.mainBase .postBaseEdit #twitter-input').val(editTW);
					$('.mainBase .postBaseEdit #linkedin-input').val(editLI);
					$('.mainBase .postBaseEdit #google-input').val(editGP);
					if(editBus=='2'){
					$('.mainBase .postBaseEdit #busName').show().val(editBusName);
					}
					$(".mainBase .postBaseEdit #recaptcha_widget_div").css({'margin-left':'55px'});
					//////////////////////////if you want to reinstate the capchta
					$(".mainBase .postBaseEdit #recaptcha_widget_div").hide();
					$(".mainBase .postBaseEdit #refreshCodeMsg").hide();
					////////////////////////////
					$(".mainBase .postBaseEdit .editCancelBtn").unbind('click').click(function(){Recaptcha.reload();$('.mainBase .postBaseEdit .postBaseEdit2').empty(); $('#alertScreen').css({'display':'none'});$('.postBaseEdit').css({'display':'none'});});
					
				
					$(".mainBase .postBaseEdit .regEditSubmitBtn").unbind('click').click(function(){accountSave()});//regEditSubmitBtn
						
					//SAVE CHANGES MADE TO THE ACCOUNT
					function accountSave(){
					$(".mainBase .postBaseEdit .regEditSubmitBtn").unbind('click');
					$(".mainBase .postBaseEdit .regEditSubmitBtn").html('Please wait...<img src="images/loaderSm.gif"/>');
			
			
					var checkFormArray = new Array();
					checkFormArray = {'City or Town':''+$('#city').val()+'',
									'State':''+drpDwnStateID+'',
									'Email':''+$('#email').val()+'',
									'Username':''+greetingUserName+'',
									'Password':''+$('#password-input').val()+'',
									'PasswordConfirm':''+$('#passwordConfirm').val()+'',
									'arrayEnd':'arrayEnd'
									};
									
							var addyurl='null';
							var fburl = 'null';
							var twyurl = 'null';
							var lnurl = 'null';
							var gourl = 'null';
							var busname = 'null';
							
								if($('#url-input').val().length){
									addyurl = 'http://www.'+$('#url-input').val()+''+$('#urldr').val()+'/';
								}
								if($('#busName').val().length){
									busname = ''+$('#busName').val()+'';
								}
								if($('#facebook-input').val().length){
									fburl = 'http://www.facebook.com/'+$('#facebook-input').val()+'';
								}
								if($('#twitter-input').val().length){
									twyurl = 'http://www.twitter.com/'+$('#twitter-input').val()+'';
								}
								if($('#linkedin-input').val().length){
									lnurl = 'http://www.linkedin.com/'+$('#linkedin-input').val()+'';
								}
								if($('#google-input').val().length){
									gourl = 'https://plus.google.com/'+$('#google-input').val()+'';
								}
								
							for (var child in checkFormArray){
								if(checkFormArray[child]==null || checkFormArray[child]=='' || checkFormArray[child]=='undefined' || checkFormArray[child]=='please choose...'){
									alertObject.alertBox('EMPTY FORM!', 'Please make sure that '+child+' is filled out/chosen!', 'gerrorPlus', btnReset, '.postBaseEdit', accountSave);
									break;
								}else if(checkFormArray[child]=='arrayEnd'){
									//form checks out move on
									subMitEditAccountForm();
								}
							}
									
						function subMitEditAccountForm(){
						//////REDUNDANT SEE EDIT POST ABOVE
						genTimerObject.genTimer();//start the timeout timer
						var response = $('#recaptcha_response_field').val();
						var challenge = $('#recaptcha_challenge_field').val();
																											
							$.ajax({
							type: "POST",
							url:'control/verifyUser.php',
							data: "type=basic&user="+userName+"&pass="+passWord+"&ssSec="+editssSec+"&response="+response+"&challenge="+challenge+"",
							success: function(confirmi){
								clearTimeout(genericTimer);
								confirmi = $.trim(confirmi);
							if(confirmi!='X11' && confirmi!='X10'){//username, pass, and captcha all clear
										genTimerObject.genTimer();//start the timeout timer
										editssSec = confirmi;
										var form = new Array();
										form = {'di':'edit', 'd2':'editAccount', 's1':''+$('#city').val()+'','e1':''+$('#email').val()+'','s2':''+greetingUserName+'','s3':''+editPSO+'','s4':''+editssSec+'', 's5':''+$('#password-input').val()+'', 'i1':''+drpDwnStateID+'', 'i2':''+$("input[name='business']:checked").val()+'','u1':''+fburl+'','u2':''+twyurl+'','u3':''+gourl+'', 'u4':''+lnurl+'', 'u5':''+addyurl+'', 's6':''+busname+''};
										 $.post("control/formValidate.php", {form:form}, //form validation
														   function(confirmation){
															   clearTimeout(genericTimer);
															  confirmation = $.trim(confirmation);
															  if(confirmation=='X10'){
																  alertObject.alertBox('ALERT!', errorAlrt, 'gerrorPlus', editRefresh, '.postBaseEdit', null);
															   }else if(confirmation=='X12'){
																	$('#register-alert').empty();
																	alertObject.alertBox('ALERT!', emailInUse, 'gerrorPlus', btnReset, '.postBaseEdit', accountSave);
															   }else if(confirmation=='X13'){
																	$('#register-alert').empty();
																	alertObject.alertBox('ALERT!', userNameInUse, 'gerrorPlus', btnReset, '.postBaseEdit', accountSave);
															   }else{//form is filled out properly, moving on
																		
																Recaptcha.reload();$('.mainBase .postBaseEdit .postBaseEdit2').empty(); 
																$('#alertScreen').css({'display':'none'});$('.postBaseEdit').css({'display':'none'});
																alertObject.alertBox('SUCCESS!', updateSuccess, 'ferror', clearUser, null, null);
					
															   }
														   });//formValidate
			
							}else if(confirmi=='X10'){
								alertObject.alertBox('ALERT!', errorAlrt, 'gerrorPlus', editRefresh, '.postBaseEdit', null);
							}else if(confirmi=='X11'){
								alertObject.alertBox('ALERT!', codeAlrt, 'gerrorPlus', btnReset, '.postBaseEdit', accountSave);
							}
						}// validate success
						});//verifyUser
						}
						}
			
			
			});//load regEdit form
		}
		
		function deleteFinish(){
				clearUser();
			}
			function finalDelete(editssSec){
				genTimerObject.genTimer();//start the timeout timer
				var form = new Array();
				form = {'di':'edit', 'd2':'deleteAccount', 's2':greetingUserName, 's3':passWord, 's4':editssSec};
				$.post('control/formValidate.php', {form:form}, function(confirmed){
					clearTimeout(genericTimer);
					confirmed = $.trim(confirmed);
					switch(confirmed){
						case '1':
							$('.firstListBase').empty();
							$('.secondListBase').empty();
							alertObject.alertBox('ALERT!', deleteAccountSuccess, 'ferror', deleteFinish, null, null);
							break;
						default:
							alertObject.alertBox('ALERT!', errorAlrt, 'alert', null, null, null);
							$(".mainBase .postBaseEdit .regEditSubmitBtn").html('edit');
							break;
					}//switch
					});
			}
		
			//DELETE USER ACCOUNT AND ALL RELATED INFORMATION, POST, REVIEWS, ETC
		if(aux=='delete'){
				alertObject.alertBox('ALERT!', accountDelete, 'decision', finalDelete, whichOne, null);
			}
		
				break;
			}
			
		}//edit or post page
	}
}

//fetchCategoryArray
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

//fetchCityArray
var fetchCityObject = {
fetchCityArray:function(state, citiesDropDown){
	switch(Modernizr.localstorage){//if browser supports localStorage
	case true:
	//go get the most current version number
	$.ajax({
	   type:'POST',
	   url:'control/versionControl.php',
	   data:'version=city_version',
	   success: function(currentVersion){
		 var curVerCity = $.trim(currentVersion);
				if(localStorage.getItem('zoofaroo_city_version') !== null){
					//go get client side current version number
						   var clientVerCity = localStorage.getItem('zoofaroo_city_version');
						   
						   if(curVerCity==clientVerCity){
							  //versions up to date, continue...
							 if(localStorage.getItem("zoofaroo_"+state+"_cities") !== null){//if cities array is found in localStorage
								var retrievedCities = localStorage.getItem("zoofaroo_"+state+"_cities");
								var parsedCities = JSON.parse(retrievedCities);
								if(citiesDropDown){
									displayCitiesObject.displayCities(parsedCities);
								}else{
									displayCities(parsedCities);
								}
							}else{//if cities array is not found in localStorage
								fetchCities(state, true);//query db for cities and then commit to local storage
							}
							
						 }else{//version numbers do not match
								fetchCities(state, true);//query db for cities and then commit to local storage
						}
				}else{//no version number found
					fetchCities(state, true);//query db for cities and then commit to local storage
				}
				localStorage.setItem('zoofaroo_city_version',curVerCity);
			}//success
									   
	});//ajax
	break;
	
	default://browser does not support localStorage
	fetchCities(state, false);//query db for cities but DO NOT commit to local storage
	break;
	}//Modernizr
			
			
	function fetchCities(state, setCities){
		$.ajax({
			   type:'POST',
			   url:'control/pageQuery.php',
			   data:'page=state&state='+state,
			   success: function(stateResults){
				   if(stateResults!='X10'){
				   stateResults = jQuery.parseJSON(stateResults);
				   
				   if(stateResults[0][0]!='X10'){
				   		if(citiesDropDown){
							displayCitiesObject.displayCities(stateResults);
						}else{
							displayCities(stateResults);
						}
						
						if(setCities && Modernizr.localstorage){
							try {
							 	localStorage.setItem("zoofaroo_"+state+"_cities",JSON.stringify(stateResults));
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
		}//fetchCities
}
}

//fetchStateArray
var fetchStateObject = {
fetchStateArray:function(whichPage){
		var thePage = whichPage;
	switch(Modernizr.localstorage){//if browser supports localStorage
				case true:
				//go get the most current version number
					$.ajax({
					   type:'POST',
					   url:'control/versionControl.php',
					    data:'version=state_version',
					   success: function(currentVersion){
						 var curVerState = $.trim(currentVersion);
						 
								if(localStorage.getItem('zoofaroo_state_version') !== null){
									//go get client side current version number
										   var clientVerState = localStorage.getItem('zoofaroo_state_version');
										  
										   if(curVerState==clientVerState){
											  //versions up to date, continue...
											 
											  //if states are in localstorage
											  if(localStorage.getItem('zoofaroo_states') !== null){
												  
											  //retrieve states array from localStorage
												var retrievedStates = localStorage.getItem('zoofaroo_states');
												var parsedStates = JSON.parse(retrievedStates); 
												
												switch(thePage){
										
													   case'post':
															displayStatesObject.displayStates(parsedStates, 'post');//display states list
														break;	
													   case'edit':
															displayStatesObject.displayStates(parsedStates, 'edit');//display states list
														break;	
													   case'register':
															displayStatesObject.displayStates(parsedStates, 'register');//display states list
														break;	
													   case'AdvSearch':
															displayStatesObject.displayStates(parsedStates, 'AdvSearch');//display states list
														break;		
													   case'quickSearch':
															quickSearchDisplayStates.displayStates(parsedStates);//sends state array to quicksearch
														break;
													   case'home':
														  displayStates(parsedStates); //sends state array to home 
														  break;
														case'default':
															checkStateStatus(parsedStates);
															break;
													   }
												}else{//states not found on local storage
													//fetch states from DB then commit results to localStorage
													fetchStates(true);								  
											  }
													   
											   
										   }else{//version numbers do not match
											//fetch states from DB then commit results to localStorage
												fetchStates(true);   
										   }		
								}else{//no version number found
									//fetch states from DB then commit results to localStorage
									fetchStates(true);
								}
								localStorage.setItem('zoofaroo_state_version',curVerState); 
						}//success
									   
					});//ajax
				
					break;
				default:
					//if browser does not support localStorage
					fetchStates(false);
					break;
				}
				

				function fetchStates(setStates){
					
				$.ajax({
					   type:'POST',
					   url:'control/pageQuery.php',
					   data:'page=home',
					   success: function(homeResults){
						   if(homeResults!='X10'){
								  homeResults = jQuery.parseJSON(homeResults);
														 
								   switch(thePage){
										
								   case'post':
										displayStatesObject.displayStates(homeResults, 'post');//display states list
									break;	
								   case'edit':
										displayStatesObject.displayStates(homeResults, 'edit');//display states list
									break;	
								   case'register':
										displayStatesObject.displayStates(homeResults, 'register');//display states list
									break;	
								   case'AdvSearch':
										displayStatesObject.displayStates(homeResults, 'AdvSearch');//display states list
									break;		
								   case'quickSearch':
										quickSearchDisplayStates.displayStates(homeResults);//sends state array to quicksearch
									break;
								   case'home':
									  displayStates(homeResults); //sends state array to home 
									  break;
								   case'default':
									checkStateStatus(homeResults);
									break;  
								   }
								   
								   //commit results to localStorage
								   if(setStates && Modernizr.localstorage){
									   try {
									 localStorage.setItem('zoofaroo_states',JSON.stringify(homeResults));
									 } catch (e) {if(e=='Error: QUOTA_EXCEEDED_ERR: DOM Exception 22'){
	 									 	alert('An error has occured while loading page.  This site utlizes HTML 5\'s local storage to speed up page loading.  Please check to make sure that your browser is not in \'Private Browsing\' mode.'); //data wasn't successfully saved due to quota exceed so throw an error
									 	}
									 }
								   }
						   }else{
							 alertObject.alertBox('ALERT!', errorAlrt, 'ferror', errorReset, null, null);   
						   }
					   }
					   
					   });
				}
}
};

//genTimer
var genTimerObject = {
	genTimer:function(){
		function pageRefresh(){window.location.reload();}
		genericTimer = setTimeout('alertObject.alertBox("ALERT!", errorAlrt, "ferror", pageRefresh, null, null)', 10000);
	}
}

//listDisplay
var listArrayParsed = new Array();
var postListArrayParsed = new Array();
var reviewsArrayParsed = new Array();
var uniqueArrayParsed = new Array();
var listTitleAdj = new Array();
var pageCount=null;
var pgBtnPosition=null;
var postsPerPage=10;
var listStart = 0;
var listFinish = listStart+postsPerPage;//used only for search or postlist == pagination
var listTicker = 0;
var selectPage = 1;
var menuHeight = null;
var userBusiness = null;
var userRatingCount = null;
var userRatingPercent = null;
var userLink = null;

//calls to fill the list
function populateList(tAdjusted, kind){
			chosenOfferNeed = kind;
			listTicker++;
			
				 for(j=listStart; j<listFinish; j++){
					var year = uniqueArrayParsed[j][3].substring(0,4);
					var month = uniqueArrayParsed[j][3].substring(5,7);
					var day = uniqueArrayParsed[j][3].substring(8);
					
					var dateAdjusted = ''+month+'-'+day+'-'+year+'';
					
					var postLocaleLinkPkg = '<div id="headerFooter-city">Post Location:&nbsp;'+uniqueArrayParsed[j][18]+'&nbsp;&nbsp;(<a href="'+uniqueArrayParsed[j][7]+'/'+uniqueArrayParsed[j][5]+'.html">'+uniqueArrayParsed[j][5].replace(/__/g, '/').replace(/_/g, ' ')+'</a></div><div id="headerFooter-state">&nbsp;,&nbsp;<a href="'+uniqueArrayParsed[j][7]+'.html">'+uniqueArrayParsed[j][7].replace(/__/g, '/').replace(/_/g, ' ')+'</a></div>)';
					
				
					 if(uniqueArrayParsed[j][19][0]!='0'){
						 userRatingCount = uniqueArrayParsed[j][19][0];
			 	 		 userRatingPercent = "<span style='color:#669900;'>"+uniqueArrayParsed[j][19][1]+"%</span>";
						 userBusiness = uniqueArrayParsed[j][19][2];
					 }else{
						userRatingCount = '0'; 
						userRatingPercent = "";
					 }
					
					userLink = '<a href="user/'+uniqueArrayParsed[j][1]+'.html" style="text-decoration:none"><div class="buttonWrap reviewLink">'+uniqueArrayParsed[j][1]+'('+userRatingCount+')&nbsp;<b>'+userRatingPercent+'</b></div></a>';
					
					var postUserLinkPkg = '<div id="list-Username" name="'+uniqueArrayParsed[j][1]+'"><span style="float:left;">Posted by:&nbsp;</span>'+userLink+'</div>';
					
					var hasPhoto='';
					if(uniqueArrayParsed[j][8]!='1' && chosenOfferNeed!='Needed'){
						hasPhoto = '&nbsp;&nbsp;<img src="images/photo.png" alt="This posting has a photo" title="This posting has a photo"/>';
					}else{
						hasPhoto = '';
					}
					
					if(uniqueArrayParsed[j][8]!='1' && chosenOfferNeed!='Needed'){
						$('.secondListBase .listPost:eq('+j+') #list-offerTitle #list-offerLink #hasPic').unbind('click').click(function(){
						alertObject.alertBox('THIS POST HAS A PHOTO', hasPhotoGraph, 'alert', null, null, null);																		 
																				});
					}
					
					
				   if(chosenOfferNeed == 'Offered'){
						var primarySection = "<div id='list-offerTitle'><div id='list-offerIcon'><div id='list-offerTag'>offered</div></div><div id='list-offerLink'>&nbsp;&#187;&nbsp;<div id='titleCategory'>"+uniqueArrayParsed[j][12].replace(/_/g, ' ')+"</div>&nbsp;&#187;&nbsp;<a href='"+uniqueArrayParsed[j][7]+"/"+uniqueArrayParsed[j][5]+"/"+chosenOfferNeed+"/"+uniqueArrayParsed[j][12].replace(/ /g, '_')+"/"+uniqueArrayParsed[j][16]+".html'> <div id='offerTitle'>"+uniqueArrayParsed[j][13]+"</div></a><div id='hasPic'>"+hasPhoto+"</div></div></div>";
						if(chosenPage!='edit'){
							if(chosenPage!='user'){
								var secondarySection = "<div id='list-needTitle'  style='font-size: 0.85em; float: right; padding-right: 10px;'>"+userLink+"&nbsp;has&nbsp;<div id='list-needIcon'><div id='list-needTag'>"+uniqueArrayParsed[j][21]+"&nbsp;needs</div></div></div>";
								$('.secondListBase').append('<div class="boxGradient listPostListPg listPost"><div class="sectionHeaderFormat ltGrayHeader sectionHeader1"><div class="buttonWrap abuseReport" aux="'+uniqueArrayParsed[j][16]+'">!</div>'+postUserLinkPkg+'<div id="list-Date">Posted on:&nbsp;&nbsp;'+dateAdjusted+'</div>'+postLocaleLinkPkg+'</div>'+primarySection+''+secondarySection+'</div><br/>');
							}else if(chosenPage=='user'){
								var secondarySection = "";	
								$('.secondListBase').append('<div class="boxGradient listPost"><div class="sectionHeaderFormat ltGrayHeader sectionHeader1"><div class="buttonWrap abuseReport" aux="'+uniqueArrayParsed[j][16]+'">!</div>'+postUserLinkPkg+'<div id="list-Date">Posted on:&nbsp;&nbsp;'+dateAdjusted+'</div>'+postLocaleLinkPkg+'</div>'+primarySection+''+secondarySection+'</div><br/>');
							}
						}else if(chosenPage=='edit'){
							var secondarySection = "";
							$('.secondListBase').append('<div class="boxGradient listPost"><div class="sectionHeaderFormat ltGrayHeader sectionHeader1">'+postUserLinkPkg+'<div id="list-Date">Posted on:&nbsp;&nbsp;'+dateAdjusted+'</div>'+postLocaleLinkPkg+'<div class="buttonWrap deletePostColor list-deletePost" postID="'+uniqueArrayParsed[j][16]+'" aux="'+j+'" type="offer" style="margin-top:-4px; font-weight:normal;">delete</div><div class="buttonWrap editPostColor list-editPost" postID="'+uniqueArrayParsed[j][16]+'" aux="'+j+'" type="offer" style="margin-top:-4px; font-weight:normal;">edit</div></div>'+primarySection+''+secondarySection+'</div><br/>');
						}
				   }else if(chosenOfferNeed == 'Needed'){
						var primarySection = "<div id='list-needTitle'><div id='list-needIcon'><div id='list-needTag'>needed</div></div><div id='list-needLink'>&nbsp;&#187;&nbsp;<div id='titleCategory'>"+uniqueArrayParsed[j][12].replace(/_/g, ' ')+"</div>&nbsp;&#187;&nbsp;<a href='"+uniqueArrayParsed[j][7]+"/"+uniqueArrayParsed[j][5]+"/"+chosenOfferNeed+"/"+uniqueArrayParsed[j][12].replace(/ /g, '_')+"/"+uniqueArrayParsed[j][16]+".html'> <div id='needTitle'>"+uniqueArrayParsed[j][13]+"</div></a></div><div id='hasPic'>"+hasPhoto+"</div></div>";
						if(chosenPage!='edit'){
							if(chosenPage!='user'){
								var secondarySection = "<div id='list-offerTitle' style='font-size: 0.85em; float: right; padding-right: 10px;'>"+userLink+"&nbsp;has&nbsp;<div id='list-offerIcon'><div id='list-offerTag'>"+uniqueArrayParsed[j][21]+"&nbsp;offers</div></div></div>";
								$('.secondListBase').append('<div class="boxGradient listPostListPg listPost"><div class="sectionHeaderFormat ltGrayHeader sectionHeader1"><div class="buttonWrap abuseReport" aux="'+uniqueArrayParsed[j][16]+'">!</div>'+postUserLinkPkg+'<div id="list-Date">Posted on:&nbsp;&nbsp;'+dateAdjusted+'</div>'+postLocaleLinkPkg+'</div>'+primarySection+''+secondarySection+'</div><br/>');
							}else if(chosenPage=='user'){
								var secondarySection = "";
								$('.secondListBase').append('<div class="boxGradient listPost"><div class="sectionHeaderFormat ltGrayHeader sectionHeader1"><div class="buttonWrap abuseReport" aux="'+uniqueArrayParsed[j][16]+'">!</div>'+postUserLinkPkg+'<div id="list-Date">Posted on:&nbsp;&nbsp;'+dateAdjusted+'</div>'+postLocaleLinkPkg+'</div>'+primarySection+''+secondarySection+'</div><br/>');
							}
				   		}else if(chosenPage=='edit'){
						var secondarySection = "";
						$('.secondListBase').append('<div class="boxGradient listPost"><div class="sectionHeaderFormat ltGrayHeader sectionHeader1">'+postUserLinkPkg+'<div id="list-Date">Posted on:&nbsp;&nbsp;'+dateAdjusted+'</div>'+postLocaleLinkPkg+'<div class="buttonWrap deletePostColor list-deletePost" postID="'+uniqueArrayParsed[j][16]+'" aux="'+j+'" type="need" style="margin-top:-4px; font-weight:normal;">delete</div><div class="buttonWrap editPostColor list-editPost" postID="'+uniqueArrayParsed[j][16]+'" aux="'+j+'" type="need" style="margin-top:-4px; font-weight:normal;">edit</div></div>'+primarySection+''+secondarySection+'</div><br/>');
						 
						}
				   }
				   
				   if(uniqueArrayParsed[j][5]==uniqueArrayParsed[j][7]){//city and state are the same as in Maine/Maine for states that only have one section
					//hide the state in the header
					$('.secondListBase .listPost .sectionHeader1 #headerFooter-state').hide();
					}
				   
					
					mOfferObject.mOffer(j, chosenOfferNeed);
					
					if(uniqueArrayParsed[j][8]!='1' && chosenOfferNeed!='Needed'){
						var jPlus = j;
						$('.secondListBase .listPost:eq('+jPlus+') #list-offerTitle #list-offerLink #hasPic').unbind('click').click(function(){
						alertObject.alertBox('THIS POST HAS A PHOTO', hasPhotoGraph, 'alert', null, null, null);																		 
																								 });
					}
					
					//user name link alt info
					$('.secondListBase .listPost:eq('+j+') .reviewLink').attr({ title: "Check out "+uniqueArrayParsed[j][1]+"'s User Page", alt:"Check out "+uniqueArrayParsed[j][1]+"'s User Page"});
					
					if(chosenPage!='edit'){
					//abuse buttons
					 $('.secondListBase .listPost:eq('+j+') .abuseReport').unbind('click').click(function(){
							var thisOne = $(this).attr('aux');
							alertObject.alertBox('ALERT!', reportConfirm, 'decision', sendReport, thisOne, chosenOfferNeed);
					 });
					 
					 $('.secondListBase .listPost:eq('+j+') .abuseReport').attr({ 
						title: pOffense,
						alt: reportA
					});
			
					}else if(chosenPage=='edit'){
						//EDIT BUTTONS
						var editBtnsPosi = $('.secondListBase .listPost').length-1;
								$('.secondListBase .listPost:eq('+editBtnsPosi+') .list-editPost').unbind('click').click(function(){editObject.editBox($(this).attr('type'), editBtnsPosi, $(this).attr('postID'), $(this).attr('aux'), 'editPost');});
								   $('.secondListBase .listPost:eq('+editBtnsPosi+') .list-deletePost').unbind('click').click(function(){								
											editObject.editBox($(this).attr('type'), editBtnsPosi, $(this).attr('postID'), 'delete', 'editPost');
									});
							
						
					}
					 
					 ///if REVIEWS/EDIT PAGE
					 if(j==listFinish-1 && (chosenPage=='user' || chosenPage=='edit')){
						 if(chosenOfferNeed!='Needed' && needPostCount!='0'){
							 pageCount = 1;
							 listTicker = 0;
							 postCount = needPostCount;
							 listFinish = postCount;
							 uniqueArrayParsed = reviewsArrayParsed[1];
							 populateList(uniqueArrayParsed[listTicker][13], 'Needed');
						 }
					 }
					 
					 //if SEARCH PAGE
					  if(j==listFinish-1 && (chosenPage=='search')){
						  
						 if(chosenOfferNeed!='Needed' && needPostCount!='0'){
							 listTicker = 0;
							 postCount = needPostCount;
							 listFinish = needPostCount;
							 uniqueArrayParsed = searchListArrayParsed[1];
							 populateList(uniqueArrayParsed[listTicker][13], 'Needed');
						 }
					 }
					
					
					//pagination only for list page
					//do not display page numbers if there is only one page
						if(pageCount!=1){
							$('.secondListBase').css({'padding-bottom':'20px'});
							//position page number buttons
							pgBtnPosition = 495-((pageCount/2)*30)+'px';
							$('#list-pageCount').empty();
							//display page numbers
							for(r=pageCount; r>0; r--){
								//highlight the selected page number
								if(selectPage==r){
									$('#list-pageCount').css({'margin-left':pgBtnPosition, 'margin-top':'-33px'}).append('<div class="buttonWrap" name="'+r+'" style="margin-right:10px; background:#336699; color:#FFF;">'+r+'</div>');
								}else{
									$('#list-pageCount').css({'margin-left':pgBtnPosition, 'margin-top':'-33px'}).append('<div class="buttonWrap" name="'+r+'" style="margin-right:10px;">'+r+'</div>');
								}
							}
							
							
							//give page numbers actions
							$('#list-pageCount .buttonWrap').unbind('click').click(function(){
								selectPage = $(this).attr('name');
								
								listStart = (selectPage-1)*postsPerPage;
								
								if(selectPage!=pageCount){
									listFinish = listStart+postsPerPage;
								}else{
									listFinish = postCount;
								}
								listTicker = listStart;
								$('.secondListBase').fadeOut('fast', function(){
									//$('#preloader').append(myImagePR);
									$('.secondListBase').empty();
									//begin cycle for new page - sends offer title to function to be adjusted
									populateList(uniqueArrayParsed[listTicker][13], chosenOfferNeed);
									
								});
							});
							
						}else{//pageCount does = 1
							$('#list-pageCount').empty();
						}//pageCount!=1
					 
					$('.secondListBase').fadeIn('fast');
				 }
}

function cleanSlate(){
	postCount = 0;
	listTicker=0;
	listStart = 0;
	listFinish = listStart+postsPerPage;
	selectPage = 1;
	pageCount=null;
    pgBtnPosition=null;
}

var myImagePR = new Image;
	myImagePR.src = "images/preloader.gif";
	myImagePR.id = "preload";
	$('#preloader').append(myImagePR);
	
$('.secondListBase').hide();


//localeAction
var localeObject = {
	localeAction:function(local){
	switch(Modernizr.localstorage){//if browser supports localStorage
					case true:
						if(localStorage.getItem('zoofaroo_chosenState') !== null){
								//retrieve states array from localStorage
								var retrievedChosenState = localStorage.getItem('zoofaroo_chosenState');
						}
						if(localStorage.getItem('zoofaroo_chosenCity') !== null){
								//retrieve states array from localStorage
								var retrievedChosenCity = localStorage.getItem('zoofaroo_chosenCity');
						}
						
						if(local=='state'){
							return retrievedChosenState;
						}
						
						if(local=='city'){
							return retrievedChosenCity;
						}
						break;
		}
	}
}



//loginAction
		var whereTo = null;
	var userName = null;
	var passWord = null;
	var ssSec = null;
	var org = null;
	
	function startSession(data, ft){
		
		var divid = data.indexOf('_');
		
		datas = $.trim(data.slice((divid+1), (divid+7)));
		
		dataid = $.trim(data.slice(12, divid));//id
		
		datap = $.trim(data.slice((divid+7)));
		passWord = datap;
		if(chosenPage=='post' || chosenPage=='edit' || chosenPage=='login' || chosenPage=='user' || chosenPage=='thePost'){
		if(Modernizr.localstorage){
			try {
				localStorage.setItem('zoofaroo_username',userName); 
				localStorage.setItem('zoofaroo_password',datap);
				var date = new Date();
				localStorage.setItem('zoofaroo_loginTime',date.getTime());
			} catch (e) {if(e=='Error: QUOTA_EXCEEDED_ERR: DOM Exception 22'){
	 									 	alert('An error has occured while loading page.  This site utlizes HTML 5\'s local storage to speed up page loading.  Please check to make sure that your browser is not in \'Private Browsing\' mode.'); //data wasn't successfully saved due to quota exceed so throw an error
									 	}
								}
		}
		if(ft==1){//if you want the login form to appear
		loginConfirmed(datas, dataid, userName);
		}
		}
	}
	
								 
							function lValidate(un,pw,org){
								genTimerObject.genTimer();//start the timeout timer
								
								var cform = new Array();
								cform = {'di':'confirm', 's1':un+' '+pw};
								$.post("control/formValidate.php", {form:cform});
								
								var lform = new Array();
							 	lform = {'di':'loginForm', 'd1':un, 'd2':pw, 'd3':org};
																																					
								$.post("control/formValidate.php", {form:lform},
												function(data) {
													if(data!='X10'){
													var loginData = jQuery.parseJSON(data);
													
													if(loginData!='X10'){
														credCheck(loginData[0], loginData[1], loginData[2]);
													}else{
														alertObject.alertBox('ALERT!', errorAlrt, 'ferror', clearUser, null, null);
													}
													}else{
														alertObject.alertBox('ALERT!', errorAlrt, 'ferror', errorReset, null, null); 
													}
												});
							}
							
							function credCheck(un, pw, org){//add another variable
								 userName = un;
								 passWord = pw;
								 if(chosenPage=='post' || chosenPage=='edit' || chosenPage=='login' || chosenPage=='user' || chosenPage=='thePost'){
								 $('.nextBtn').hide();
								 $('#usernameInput').val('');
								 $('#passwordInput').val('');
								 $('#usernameInput').hide();
								 $('#passwordInput').hide();
								 $('#usernameLabel').hide();
								 $('#passwordLabel').hide();
								 $('#loginAlert').html('Checking Username and Password, please wait...<img src="images/loaderSm.gif"/>').css('color','#003366');
								 }
								 
								 //start session add security code
								 	switch(chosenPage){
										case 'post':
											whereTo = 'control/checkerSetter.php?checkType='+chosenPage+'&user='+userName+'&pass='+passWord+'&org='+org+'';
											break;					
										case 'thePost':
											whereTo = 'control/checkerSetter.php?checkType='+chosenPage+'&postingID='+chosenPostingID+'&user='+userName+'&pass='+passWord+'&org='+org+'&oN='+chosenOfferNeed+'';
											break;					
										case 'edit':
											whereTo = 'control/checkerSetter.php?checkType='+chosenPage+'&user='+userName+'&pass='+passWord+'&org='+org+'';
											break;
										case 'user':
											whereTo = 'control/checkerSetter.php?checkType='+chosenPage+'&chosenUser='+chosenUser+'&user='+userName+'&pass='+passWord+'&org='+org+'';//chosenUser is the user who's user page this is
											break;
										case 'login':
											whereTo = 'control/checkerSetter.php?checkType='+chosenPage+'&user='+userName+'&pass='+passWord+'&org='+org+'';
											break;
										default:
											whereTo = 'control/checkerSetter.php?checkType=login&user='+userName+'&pass='+passWord+'&org='+org+'';
											break;
									}//switch
									
								 secCodeRetrieve(userName, passWord);
								 
								}//credCheck
								
								function loggedInInformation(confirmedUN){
									$('.logOut').html('Log Out').unbind('click').click(function(){clearUser();});
									$('.loggedInAs').html('Logged in as&nbsp;'+confirmedUN+'');
									$('.gotoUserPage').html('Go to your User Page').unbind('click').click(function(){window.open(''+baseHref+'user/'+confirmedUN+'.html','_self');});
									$('.notUser').html('Not&nbsp;'+confirmedUN+'?').unbind('click').click(function(){clearUser();});
								}
								
							
								
							function secCodeRetrieve(userN, passW){
								userName = userN;
								passWord = passW;
								
								$.post(whereTo, function(data) {
									
									clearTimeout(genericTimer);//stop timeout timer
										if(chosenPage=='post' || chosenPage=='edit' || chosenPage=='login' || chosenPage=='user' || chosenPage=='thePost'){
											 $('#usernameInput').remove();
								 			 $('#passwordInput').remove();
												$('#usernameLabel').remove();
												$('#passwordLabel').remove();
												$('.nextBtn').hide();
												$('.startOverBtnBottom').show();
												$('.startOverBtnBottom').unbind('click').click(function(){window.location.reload();});
										}
												
												var returned = $.trim(data.slice(0, 12));
												
												
														
												if(returned=='houstonMatch'){
															
															startSession(data,1);
															
															loggedInInformation(userName);
															
												}else if(returned=='sameuseMatch'){
															
															startSession(data,0);
													
															$('.replyPostingBtn').hide();
															$('.postReplySecCode').hide();
															$('#postReply-form').hide();
															$('#postShare-layout').css({'height':'35px'}).fadeIn('fast');
															$('#postShare-layout .sectionHeaderFormat').css({'margin-left':'0px', 'float':'none'});
															$('#postShare-layout .sectionHeaderFormat #header-title').html('Sorry, but you cannot reply to one of your own posts.').css({'color':'#990000'});
															
															loggedInInformation(userName);			
															
															
												}else if(returned=='mltcnctMatch'){
															
															startSession(data,0);
													
															$('.replyPostingBtn').hide();
															$('.postReplySecCode').hide();
															$('#postReply-form').hide();
															$('#postShare-layout').css({'height':'35px'}).fadeIn('fast');
															$('#postShare-layout .sectionHeaderFormat').css({'margin-left':'0px', 'float':'none'});
															$('#postShare-layout .sectionHeaderFormat #header-title').html('Our records show that you\'ve already contacted this user twice regarding this post.').css({'color':'#990000'});
															
															loggedInInformation(userName);
														
												}else if(returned=='alrdyrnMatch'){//user has already left a review AND rating for this user
															
															startSession(data,0);
															
															$('.reviewFormBase1 #post-form #loginFormBody').empty();
															$('.reviewFormBase1 #post-form #loginFormBody').html('Our records show that you\'ve already left a rating and review for this user.<br/>If you feel you are getting this message in error please feel free to contact us.').css({'color':'#990000', 'text-align':'center'});
															
															$('.logOut').html('log out').unbind('click').click(function(){clearUser();});
															$('.loggedInAs').html('Logged in as&nbsp;'+userName+'');
															$('.gotoUserPage').html('Go to '+userName+'s User Page').unbind('click').click(function(){window.open(''+baseHref+'/user/'+userName+'.html');});
															$('.notUser').html('Not&nbsp;'+userName+'?').unbind('click').click(function(){clearUser();});
															
												}else if(returned=='alrdyraMatch'){//user has left a rating BUT NOT a review for this user
															$('.reviewFormBase2 #ratePositive').empty();
															$('.reviewFormBase2 #rateNegative').empty();
															$('.reviewFormBase2 #reviews-greeting:eq(0)').empty();
															$('.reviewFormBase2 #reviews-recommend').html('Our records show that you\'ve left a rating for this user but not a review.  Why not leave a review too?').css({'color':'#669900', 'font-size':'1em', 'text-align':'center'});
															recUser = 'alrdyraMatch';
															
															startSession(data,1);
															
															
															loggedInInformation(userName);
															
												}else if(returned=='mltismnMatch'){//cannot leave a review for yourself
															$('.reviewFormBase1').css({'height':'60px'}); 
															$('.reviewFormBase1 #post-form').css({'text-align':'center', 'height':'10px', 'color':'#990000'});
															$('.reviewFormBase1 #post-form #loginFormBody').empty().html('We\'re sorry, but you cannot leave a review for yourself.');
															$('#review-account-greeting-btns #leaveReview').hide();//hide the 'leave a review' button
															
															startSession(data,0);
												
															loggedInInformation(userName);
																 
												}else if(returned=='sorryNoMatch'){
													userName = null;
													passWord = null;
														alertObject.alertBox('ALERT!', invalidUP, 'ferror', clearUser, null, null);
												}else if(returned=='ifNotCleared'){
														userName = null;
														passWord = null;
														alertObject.alertBox('ALERT!', 'Sorry, it looks like you haven\'t cleared your registration yet.  Please follow the link provided to you in the email you received just after registering.', 'ferror', clearUser, null, null);
												}else{
													userName = null;
													passWord = null;
													alertObject.alertBox('ALERT!', errorAlrt, 'ferror', clearUser, null, null);
												}
									});
	}//secCodeRetrieve
function clearUser(){
				/*localStorage.removeItem('zoofaroo_username');
				localStorage.removeItem('zoofaroo_password');
				localStorage.removeItem('zoofaroo_loginTime');*/
				localStorage.clear();
				window.location.reload();	
}

//mOffer
var mOfferObject = {
	mOffer:function(j, kind){
switch(chosenPage){
	
	case 'thePost':
			
			if(j=='2'){
				if(kind=='offer'){
					return '&nbsp;&nbsp;<div class=" moneyOption"><img src="images/onlyMoney.png" alt="This user will only accept money offers"/></div>';
				}else{
					return '&nbsp;&nbsp;<div class=" moneyOption"><img src="images/money.png" alt="In addition to trading, this user will condsider paying for their need"/></div>';	
				}
				
			}else{
				return '';
			}
	break;
	
	default://search, edit, postList
		
			if(uniqueArrayParsed[j][14]=='2'){
				if(kind=='Offered'){
					$('.secondListBase #list-offerLink:eq('+j+')').append('&nbsp;&nbsp;<div class=" moneyOption"><img src="images/onlyMoney.png"/></div>');
					$('.secondListBase #list-offerLink:eq('+j+') .moneyOption').unbind('click').click(function(){
						alertObject.alertBox('MONEY OFFERS ONLY', acceptMoneyOffer, 'alert', null, null, null);																		 
																								 });
			//oMoney alt
			$('.secondListBase #list-offerLink:eq('+j+') .moneyOption').attr({ 
				title: "This user will only accept money offers",
				alt:  "money offers"
			});
				}else{
					$('.secondListBase #list-needLink:eq('+j+')').append('&nbsp;&nbsp;<div class=" moneyOption"><img src="images/money.png"/></div>');
					$('.secondListBase #list-needLink:eq('+j+') .moneyOption').unbind('click').click(function(){
						alertObject.alertBox('OPEN TO OFFERS', acceptMoneyNeed, 'alert', null, null, null);																		 
																								 });
			//nMoney alt
			$('.secondListBase #list-needLink:eq('+j+') .moneyOption').attr({ 
				title: "In addition to trading, this user will condsider paying for their need",
				alt:  "money offers"
			});

				}
			}
	
	break;
	}
	}
}

//quickSearch
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
	
//resize

//shareBox
var shareObject = {
	shareBox:function(emailOfferTitleAdj, emailNeedTitleAdj, url, oC, oT, nC, nT){
		$('#alertScreen').css({'display':'block', 'opacity':'0.5', 'filter':'alpha(opacity=50)', 'width':$(document).width(), 'height':$(document).height()});
		if($(window).width()<1200){
		$('#alertScreen').css({'-webkit-transform':'scale(1.11)', '-moz-transform':'scale(1.11)', '-o-transform':'scale(1.11)', '-ms-transform':'scale(1.11)',  'margin-top':'0%'});
		}
		$('.postBaseShare').css({'display':'block'});
		var scrollTop = $(window).scrollTop();
		if(navigator.appName=='Microsoft Internet Explorer'){
		var scrollTop = $('html').scrollTop();
		}
		var scrollAdjust = scrollTop-250;
		$('.postBaseShare').css({'margin-top':scrollAdjust+'px'});
		
		$('.postBaseShare').load("modules/emailShareForm.php?oTAdj="+emailOfferTitleAdj+"&nTAdj="+emailNeedTitleAdj+"&u="+url+"&oC="+oC+"&oT="+oT+"&nC="+nC+"&nT="+nT+"", function(){
																															
																															});
	}
}

//variables
//static variables
var chosenPage = null;
var chosenRegionName = null;
var chosenStateID = null;
var chosenState = null;
var chosenStateAlt = null;
var chosenCityID = null;
var chosenCity = null;
var chosenCityAlt = null;
var chosenSpecificLocale = null;
var chosenCategoryID = null;
var chosenCategory = null;
var chosenCategoryAlt = null;
var chosenOfferNeed = null;
var chosenTitle = null;
var chosenPostingID = null;
var chosenUserID = null;
var chosenUser = null;
var chosenStateArray = null;
var chosenCategoryArray = null;
var genericTimer = null;
//static variables

//interactive variables
var drpDwnStateID = null;
var drpDwnState = null;
var drpDwnStateAlt = null;
var drpDwnCityID = null;
var drpDwnCity = null;
var drpDwnCityAlt = null;
var drpDwnCategoryID = null;
var drpDwnCategory = null;
var drpDwnCategoryAlt = null;
var drpDwnOfferNeed = null;
var drpDwnTitle = null;
var drpDwnPosting = null;
var drpDwnEmailNotes = null;
var drpDwnMoneyOffer = null;
var drpDwnGSW = null;
//interacive variables

//images
var hdrImg = "<img src='images/zoofaroo.png' alt='ZooFaroo - Be social.  Trade local.'  style='border:none;'/>";
var alertHdrImg = "<img src='images/zoofaroo.png' alt='ZooFaroo - Be social.  Trade local.'  style='border:none; height:40px;'/>";

//universal error alert
function errorReset(){window.open(''+baseHref+'home.html', '_self')};

//alerts
var wildcard = 'A \'wild card\' is any posting where either the \'offer\' or the \'need\' (just one of them) is left open.  In such cases, the user either can\'t think of anything specific to \'offer\', or can\'t think of anything specific they \'need\' but are open to receiving suggestions, deals, inquiries, etc. for the \'offer\' or \'need\' that they have filled out.';
var savedAlrt = 'Your changes have been successfully saved!';
var errorAlrt = 'We\'re sorry, there was an unexplained error processing your request, please try again later.';
var deleteConfirm = 'Are you sure you want to delete this forever?';
var deleteSuccess = 'Your post has been successfully deleted!';
var updateSuccess = 'Your account was succesfully updated.  Please login to your account to view the changes';
var updatePostSuccess = 'Your posting was succesfully updated!';
var accountDelete = 'Are you sure you want to delete your account and all posts/information associated with it?  This cannot be undone.';
var deleteAccountSuccess = 'Your account and all postings associated with it have been successfully deleted.  Thank you for using ZooFaroo and we hope to see you again soon!';
var emptyForm = 'Please make sure the form is completely filled in.';
var formCheck = 'Please make sure the form is completely filled in.';
var invalidUP = 'Username and/or Password not in our records!  Please make sure you are a registered user.';
var atLeastOne = 'We\'re sorry, you have to at least have one \'offer\' or one \'need\' filled out.';
var cityStateAlrt = 'Please make sure you have chosen a city and state and specific location!';
var moneyOfferAlrt = 'Please check whether or not you are open to the idea of exchanging money.';
var codeAlrt = 'Sorry, the security code was not entered correctly.';
var emailInUse = 'We\'re sorry, but that email address is alreay in use.&nbsp;&nbsp;Please try a different one.';
var userNameInUse = 'We\'re sorry, but that username is alreay in use.&nbsp;&nbsp;Please try a different one.';
var reportConfirm = 'Are you sure you want to report this as offensive?';
var passWordMatch = 'Please make sure that your passwords match!';
var acceptMoneyOffer =  'This user will only accept money for what they are offering';
var acceptMoneyNeed = 'In addition to trading, this user will condsider paying for this need';
var quickSearchAlrt = 'Please check to make sure that a state is chosen and that a keyword is filled in.';
var alrdyrv = 'We\'re sorry, but our records show that you\'ve already left a review for this user.  If you feel you are getting this message in error please feel free to contact us.';
var invalidUN = 'The username you entered is not the correct format, please try again.';
var invalidPW = 'The password you entered is not the correct format, please try again.';
var invalidEM = 'The email you entered is not on our records, please try again.';
var regSuccess = '<div id="register-successful-text"><b style="font-size:1.1em;">Almost Finished!&nbsp:&nbsp;One More Step...</b><br/>You should be receiving a confirmation email shortly.<br/><br/><b style="color:#FF0000; font-size:1.2em;">Be sure to visit the link within the email or your registration will not be activated.</b><br/><br/>If the email does not arrive in the next 30 minutes <b>check your junk and spam folders</b>, it could be hiding there.<br/><br/>Please note: Some Internet Service Providers (ISPs) have recently implemented a new Spam Filtering System. As a result, your confirmation email may be filtered to your Junk E-Mail folder unless you add us to your Safe List or White List.<br/><br/>Enjoy ZooFaroo!</div>';
var photoAlrt = 'You must first choose a photo before you can upload it!';
var photoErr = 'We\'re sorry, an error has occured while trying to upload your photo.  It is either too big to upload or of the wrong file type.  Please try again with a different photo or a smaller version of this one.';
var sameUP = 'Please make sure that your username and password are not the same.';
var hasPhotoGraph = 'This posting has a photograph'
//alerts