$('.postBase1:eq(0)').hide();

var offerMakeOffer;
var needMakeOffer;

var specificLocation=null;

var offerCategoryID;
var offerCategoryName;
var offerTitleChosen;
var offerPostingChosen;
var offerGSW;

var needCategoryID;
var needCategoryName;
var needTitleChosen;
var needPostingChosen;
var needGSW;

var offerEmailNotes;
var needEmailNotes;

var offerMoneyOffered;
var needMoneyOffered;

var whichGoodsServices;
var whichNotGoodsServices;

var states = new Array();
var categoriesArrayAlt = new Array();
var goodsCategoryID = new Array();
var servicesCategoryID = new Array();

var photosArray = new Array();

var nextOne = 0;

var postNumber;

var offerGSWArray = new Array();
var offerCategoryArray = new Array();
var offerTitleArray = new Array();
var offerPostingArray = new Array();
var offerEmailNotesArray = new Array();
var offerMoneyArray = new Array();

var needGSWArray = new Array();
var needCategoryArray = new Array();
var needTitleArray = new Array();
var needPostingArray = new Array();
var needEmailNotesArray = new Array();
var needMoneyArray = new Array();

var needArrayTemp = new Array();
var offerArrayTemp = new Array();

var offerValFirst=null;
var needValFirst=null;

var categoriesArray;

$("#post-leavePostTitle").html('Leave Your Own Posting!');

var photoInterval = null;
var photoTimer = null;

var tempPhotoEdit = new Array();

function editFormPhotoAction(tPEArray){
	tempPhotoEdit = tPEArray;
	if(tempPhotoEdit[1]=='0'){//arrived empty
		//change button on empty
		if(tempPhotoEdit[5]=='change'){
				removeTempPhoto(tempPhotoEdit[4], 'rTemp', 'null', 'null');
				photosArray[tempPhotoEdit[0]]='1';
				tempPhotoEdit[3] = 'empty';
				tempPhotoEdit[4] = '1';
			}
		//cancel button on empty
		if(tempPhotoEdit[5]=='cancel'){
			if(tempPhotoEdit[4]!='1'){
				removeTempPhoto(tempPhotoEdit[4], 'rTemp', 'null', 'null');
				tempPhotoEdit[3] = 'empty';
				tempPhotoEdit[4] = '1';
				photosArray[tempPhotoEdit[0]]='1';
			}else{
				tempPhotoEdit[3] = 'empty';
				tempPhotoEdit[4] = '1';
				photosArray[tempPhotoEdit[0]]='1';
			}
		}
		//save on empty
		if(tempPhotoEdit[5]=='save'){
				if(tempPhotoEdit[4]!='1'){//a photo needs to be saved
					photosArray[tempPhotoEdit[0]] = tempPhotoEdit[4];
				}else{
					tempPhotoEdit[3]='empty';
					tempPhotoEdit[4]='1';
					photosArray[tempPhotoEdit[0]]='1';	
				}
		}
	}else if(tempPhotoEdit[1]=='1'){//arrived with photo
		//change button on full
		if(tempPhotoEdit[5]=='change'){
			if(tempPhotoEdit[3] == 'empty'){
				tempPhotoEdit[3] = tempPhotoEdit[4];
				tempPhotoEdit[4] = '1';
				photosArray[tempPhotoEdit[0]]='1';
			}else if(tempPhotoEdit[3] != 'empty'){
				removeTempPhoto(tempPhotoEdit[4], 'rTemp', 'null', 'null');
				tempPhotoEdit[4] = '1';
				photosArray[tempPhotoEdit[0]]='1';
			}
			}
		//cancel button on full
		if(tempPhotoEdit[5]=='cancel'){
			if(tempPhotoEdit[4]!='1'){//there is a photo visible, but is it the original?
				if(tempPhotoEdit[3] == 'empty'){// yes it is the original
					photosArray[tempPhotoEdit[0]] = tempPhotoEdit[4];//just to make sure
				}else if(tempPhotoEdit[3] != 'empty' && tempPhotoEdit[3] != tempPhotoEdit[4]){//not the original, go erase the one the user just uploaded, ie the new one because this is a cancel
					photosArray[tempPhotoEdit[0]] = tempPhotoEdit[3];//just to make sure
					//now erase the new one from the temp folder
					removeTempPhoto(tempPhotoEdit[4], 'rTemp', 'null', 'null');
					tempPhotoEdit[4] = tempPhotoEdit[3];//grab the original name and make sure it's still in photosarray where it should be
					tempPhotoEdit[3] = 'empty';
				}
			}else if(tempPhotoEdit[4]=='1'){//the user removed the photo from the edit form but did not uplolad a new one then hit cancel
				tempPhotoEdit[4] = tempPhotoEdit[3];//grab the original name and make sure it's still in photosarray where it should be
				tempPhotoEdit[3] = 'empty';
				photosArray[tempPhotoEdit[0]] = tempPhotoEdit[4];
			}
		}
		//save on full
		if(tempPhotoEdit[5]=='save'){
			if(tempPhotoEdit[4]!='1'){//there is a photo visible, but is it the original?
				if(tempPhotoEdit[3] == 'empty'){// yes it is the original
					photosArray[tempPhotoEdit[0]] = tempPhotoEdit[4];//just to make sure
				}else if(tempPhotoEdit[3] != 'empty' && tempPhotoEdit[3] != tempPhotoEdit[4]){//not the original, which means the user wants to save a new photo
					photosArray[tempPhotoEdit[0]] = tempPhotoEdit[4];//the new photo name
					//now erase the old one from the temp folder
					removeTempPhoto(tempPhotoEdit[3], 'rTemp', 'null', 'null');
				}
			}else if(tempPhotoEdit[4]=='1'){//the user removed the photo from the edit form but did not uplolad a new one then hit save, so they don't want a photo at all assoc with this post
				removeTempPhoto(tempPhotoEdit[3], 'rTemp', 'null', 'null');
				tempPhotoEdit[4] = '1';
				tempPhotoEdit[3] = 'empty';
				photosArray[tempPhotoEdit[0]] = '1';
			}
	}
	}
	
	if(pOrE=='edit'){
	$(''+divLocale+' #post-offerPhoto').show();
	$(''+divLocale+' #post-offerActPhoto').empty();
	$(''+divLocale+' .post-offerChangePhoto').unbind('click');
	$(''+divLocale+' #post-offerFormPhoto .post-offerChangePhoto').hide();
	}
}

function removeTempPhoto(tphotonm, removeType, stateID, postID){
	if(stateID=='null'&&postID=='null'){
		stateID=0; postID=0;
	}
	var form = new Array();
	form = {'di':'photoCancel', 's1':tphotonm, 'i1':chosenUserID, 's2':ssSec, 's3':removeType, 'i2':stateID, 'i3':postID};
	$.post('control/formValidate.php', {'form':form}, function(ireturn){});
}

function photoChangeActivate(tphotonm, whichOne){
	//change photo
		$(''+divLocale+' #post-offerFormPhoto .post-offerChangePhoto').click(function(){
			if(pOrE=='edit'){
					tempPhotoEdit[5] = 'change';
					editFormPhotoAction(tempPhotoEdit);
					$('.mainBase .postBaseEdit #post-offerFormPhoto').css({'margin-top':'10px','margin-left': '0px'});
			}else if(pOrE=='post'){
				
				tempPhotoEdit[5] = 'change';
				editFormPhotoAction(tempPhotoEdit);
				$(''+divLocale+' #post-offerFormPhoto').show().css({'margin-left': '0px'});
				$(''+divLocale+' #post-offerPhoto').show();
				$(''+divLocale+' #post-offerActPhoto').empty();
				$(''+divLocale+' .post-offerChangePhoto').unbind('click');
				$(''+divLocale+' #post-offerFormPhoto .post-offerChangePhoto').hide();
				$(''+divLocale+' #post-offerActPhoto').hide().css({'margin-top':'0px', 'margin-left':'0px'});
				$('.postBase1 .post-offerAdditional').css({'margin-top':'50px'});
			}
					});
}


function photoLoaded(whichOne){
	if($(''+divLocale+' #post-offerFormPhoto #post-offerActPhoto').contents().attr('id')){
		
	var tphotonm=$(''+divLocale+' #post-offerFormPhoto #post-offerActPhoto').contents().attr('id');
	
	if(tphotonm=='X10' || tphotonm=='X11' || tphotonm=='X12' || tphotonm=='undefined' || tphotonm=='' || tphotonm==null){
		clearInterval(photoInterval);
		clearTimeout(photoTimer);
		$('#alertScreen').css({'display':'none'});$('.alert').css({'display':'none'});
		switch(tphotonm){
			
			case 'X10':
				if(pOrE=='post'){
					alertObject.alertBox('ALERT!', photoAlrt, 'alert', null, null, null);
				}else if(pOrE=='edit'){
					alertObject.alertBox('ALERT!', photoAlrt, 'gerror', null, divLocale, null);
				}
				break;
				
			case 'X11':
				if(pOrE=='post'){
					alertObject.alertBox('ALERT!', photoErr, 'alert', null, null, null);
				}else if(pOrE=='edit'){
					alertObject.alertBox('ALERT!', photoErr, 'gerror', null, divLocale, null);
				}
				break;
				
			case 'X12':
				if(pOrE=='post'){
					alertObject.alertBox('ALERT!', photoErr, 'alert', null, null, null);
				}else if(pOrE=='edit'){
					alertObject.alertBox('ALERT!', photoErr, 'gerror', null, divLocale, null);
				}
				break;
				
			case '':
				if(pOrE=='post'){
					alertObject.alertBox('ALERT!', photoErr, 'alert', null, null, null);
				}else if(pOrE=='edit'){
					alertObject.alertBox('ALERT!', photoErr, 'gerror', null, divLocale, null);
				}
				break;
				
			case null:
				if(pOrE=='post'){
					alertObject.alertBox('ALERT!', photoErr, 'alert', null, null, null);
				}else if(pOrE=='edit'){
					alertObject.alertBox('ALERT!', photoErr, 'gerror', null, divLocale, null);
				}
				break;
				
			case 'undefined':
				if(pOrE=='post'){
					alertObject.alertBox('ALERT!', photoErr, 'alert', null, null, null);
				}else if(pOrE=='edit'){
					alertObject.alertBox('ALERT!', photoErr, 'gerror', null, divLocale, null);
				}
				break;
				
			default:
				if(pOrE=='post'){
					alertObject.alertBox('ALERT!', photoErr, 'alert', null, null, null);
				}else if(pOrE=='edit'){
					alertObject.alertBox('ALERT!', photoErr, 'gerror', null, divLocale, null);
				}
			break;
		}
		
	}else if(tphotonm.substr(tphotonm.length - 3)=='jpg' || tphotonm.substr(tphotonm.length - 3)=='JPG' || tphotonm.substr(tphotonm.length - 4)=='jpeg' || tphotonm.substr(tphotonm.length - 4)=='JPEG'  || tphotonm.substr(tphotonm.length - 3)=='png' || tphotonm.substr(tphotonm.length - 3)=='gif' && $('#post-offerActPhoto').height()!=0 && $('#post-offerActPhoto').height()>0){
				
				clearInterval(photoInterval);
				clearTimeout(photoTimer);
				//Photos
				var tphotoht = parseInt($(''+divLocale+' #post-offerFormPhoto #post-offerActPhoto').contents().attr('name'));
				$(''+divLocale+' #post-offerFormPhoto #photoLoading').empty();
				var photoFormAdjust = tphotoht+40;
				
				$(''+divLocale+' #post-offerFormPhoto #post-offerPhoto').hide();
				var offersLast = $("#post-offerForms .post-offerSeparator").length-1;
				$("#post-offerForms .post-offerSeparator:eq("+whichOne+") #post-offerActPhoto").css({'margin-top':'100px', 'margin-left':'-400px'}).show();
				if(pOrE=='post'){
					tempPhotoEdit[4] = tphotonm;
					photosArray[whichOne] = tphotonm;
					$('#alertScreen').css({'display':'none'});$('.alert').css({'display':'none'});
					$(''+divLocale+' #post-offerFormPhoto').show().css({'margin-left': '100px'});
					$(''+divLocale+' #post-offerFormPhoto .post-offerChangePhoto').show().css({'margin-left': '300px'});
				}else if(pOrE=='edit'){
					tempPhotoEdit[4] = tphotonm;//each time a photo is loaded into the edit form we must save it's name
					photosArray[whichOne] = tphotonm;
					$('.alert').css({'display':'none'});
					$(''+divLocale+'').toggle();
					$('.mainBase .postBaseEdit #post-offerFormPhoto').css({'margin-top':'50px','display':'block', 'margin-left':'-350px'});
				}
				$(''+divLocale+' #post-offerFormPhoto .post-offerChangePhoto').show().css({'margin-top': '100px'});
				if($('.mainBase .postBaseEdit').is(':hidden')){
				$('.postBase1 .post-offerAdditional').css({'margin-top':photoFormAdjust+'px'});
				}
				photoChangeActivate(tphotonm, whichOne);
				tphotonm=null;
				tphotoht=null;
				
	}
	
	}
			
	}//photoLoaded
function photoCancelLoad(whichOne){
	$('#alertScreen').css({'display':'none'});$('.alert').css({'display':'none'});
	clearInterval(photoInterval);
	clearTimeout(photoTimer);
	$(''+divLocale+' #post-offerFormPhoto #post-offerActPhoto').empty();
	$(''+divLocale+' #post-offerFormPhoto #post-offerPhoto').show();
	$(''+divLocale+' #post-offerFormPhoto #photoLoading').empty();
	if(pOrE=='post'){
		alertObject.alertBox('ALERT!', photoErr, 'alert', null, null, null);
	}else if(pOrE=='edit'){
		alertObject.alertBox('ALERT!', photoErr, 'gerror', null, divLocale, null);
	}
}
var divLocale = null;
var pOrE = null;
function photoListen(whichOne, postOrEdit){
	pOrE = postOrEdit;
	if(pOrE=='edit'){
		divLocale = '.mainBase .postBaseEdit';
		alertObject.alertBox('LOADING', "Loading image file, please wait...<img src='images/loaderSm.gif'/>", 'ferrorLoad', null, divLocale, null);
	}else if(pOrE=='post'){
			divLocale = '#post-offerForms .post-offerSeparator:eq('+whichOne+')';
			alertObject.alertBox('LOADING', "Loading image file, please wait...<img src='images/loaderSm.gif'/>", 'load', null, null, null);
			
			tempPhotoEdit[0] = whichOne;
			tempPhotoEdit[1] =  '0';
			tempPhotoEdit[2] = '0';
			tempPhotoEdit[3] = 'empty';
			tempPhotoEdit[4] = '1';
			tempPhotoEdit[5] = '1';	
	}
	$(''+divLocale+' #post-offerFormPhoto #post-offerPhoto').hide();
	$(''+divLocale+' #post-offerFormPhoto #photoLoading').html("Loading image file, please wait...<img src='images/loaderSm.gif'/>");
	photoInterval = setInterval('photoLoaded('+whichOne+')', 100);
	photoTimer = setTimeout('photoCancelLoad('+whichOne+')', 15000);
}



//populates the form sections
function formPopulate(whichKind, whichOne){
clearIt(whichKind, whichOne, false);
$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+")").load("modules/postingForm.php?whichKind="+whichKind+"&whichOne="+whichOne+"&postOrEdit=post", function(){
																		
										$('#post-offerForms .post-offerSeparator:eq('+whichOne+') #post-offerFormPhoto .post-offerChangePhoto').hide();
									
									//hide the forms edit controls
									$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #post-formEdit").hide();
									$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #post-formDelete").hide();
									
								  $("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #post-"+whichKind+"FormMiddle").hide();
								  $("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #post-"+whichKind+"FormPhoto").hide();
								  $("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #post-offerActPhoto").hide();
								  $("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #"+whichKind+"GoodsCategory").val(0);
								  $("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #"+whichKind+"ServicesCategory").val(0);
								  $(".post-"+whichKind+"Additional").hide();
								  $("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #post-"+whichKind+"FormBottom #"+whichKind+"Money").hide();
								  
								   
								   //if the user has more than one offer or need respectively then the 'w' is hidden
								   if(whichOne>=1){
									   $("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #w").hide();
									   $("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #post-formDelete").fadeIn('fast');
									   activateDeleteBtns(whichKind, whichOne);
								   }
								   
									///goods and services radio button actions
								  $("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") input[name='"+whichKind+"GoodsServices"+whichOne+"']").unbind('click').click(function(){
											
											//store whether or not the user has chosen 'g', 's', or 'w' or none of the above for the first forms
												offerValFirst = $("#post-offerForms .post-offerSeparator:eq(0) input[name='offerGoodsServices0']:checked").val();
												needValFirst = $("#post-needForms .post-needSeparator:eq(0) input[name='needGoodsServices0']:checked").val();
											
											//offer/needGSW variable
											var GSW = $("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") input[name='"+whichKind+"GoodsServices"+whichOne+"']:checked").val();
											
											if(GSW == 'g'){
												whichGoodsServices = 'Goods'; //the goods/service they have chosen
												whichNotGoodsServices = 'Services'; //the goods/service they have NOT chosen
											}else if(GSW == 's'){
												whichGoodsServices = 'Services'; //the goods/service they have chosen
												whichNotGoodsServices = 'Goods'; //the goods/service they have NOT chosen
											}
								
									if(GSW == 'g' || GSW == 's'){
										
										//if the form is already open and the user switches from goods to services and vice versa
										if($("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #post-"+whichKind+"FormMiddle").is(":visible")){
											 $("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #"+whichKind+""+whichGoodsServices+"Category").show();
											 $("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #"+whichKind+""+whichNotGoodsServices+"Category").val(0).hide();
											 
										}else{//if the form is not already open, go ahead and animate the opening
										
											$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #post-"+whichKind+"FormBottom #"+whichKind+"Money").hide();
											
											//hides the additional choice if they reach the max (10)
											if(whichOne<=8){
												$(".post-"+whichKind+"Additional").show();
											}
											
											//animate opening
											$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+")").animate({height:"420px"}, {duration:250, complete:function(){
																																												   
																	  $("#post-"+whichKind+"FormMiddle #"+whichKind+"Title"+whichOne+"").val('');
																	  $("#post-"+whichKind+"FormMiddle #"+whichKind+"Posting"+whichOne+"").val('');
																																												   
																	$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #post-"+whichKind+"FormMiddle").fadeIn("fast");
																	$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #"+whichKind+""+whichGoodsServices+"Category").show();
																	 $("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #"+whichKind+""+whichNotGoodsServices+"Category").val(0).hide();
																	 if(whichKind=='offer'){
																								$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #post-"+whichKind+"FormPhoto").fadeIn('fast');
																		}else if(whichKind=='need'){
																								$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #post-"+whichKind+"FormPhoto").empty();
																								}
																		$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #post-"+whichKind+"FormBottom #"+whichKind+"Money").fadeIn('fast');
											 
											 }});//animate opening
											 
											 }
									
									}else if (GSW == "w"){
										
										if(needValFirst!=offerValFirst){
											$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #post-"+whichKind+"FormMiddle").hide();
											$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #post-"+whichKind+"FormBottom #"+whichKind+"Money").hide();
											$(".post-"+whichKind+"Additional").hide();
											
											clearIt(whichKind, whichOne, true);
											
											//animate closing
											if(whichKind=='offer'){
												if($('.post-offerChangePhoto:eq('+whichOne+')').is(':visible')){
													removeTempPhoto($('#post-offerActPhoto').contents().attr('id'), 'rTemp', 'null', 'null');
													photosArray.length=0;
													$(''+divLocale+' #post-offerPhoto').show();
													$(''+divLocale+' #post-offerActPhoto').empty();
													$(''+divLocale+' .post-offerChangePhoto').unbind('click');
													$(''+divLocale+' #post-offerFormPhoto .post-offerChangePhoto').hide();
													$('.postBase1 .post-offerAdditional').css({'margin-top':'50px'});
												}
											
												$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #post-"+whichKind+"FormPhoto").hide();
												$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+")").animate({height:"18px"}, {duration:250, complete:function(){}});
											}else if(whichKind=='need'){
												$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+")").animate({height:"18px"}, {duration:250, complete:function(){}});
												
											}
											 
										}else{///if the other 'w' is checked ---the user cannot have more than one 'w' checked
										
												$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq(0) input[value='w']").attr('checked', false);
												 alertObject.alertBox('ALERT!', atLeastOne, 'alert', null, null, null);
												if($("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #post-"+whichKind+"FormMiddle").is(":visible")){
													$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq(0) input[value='g']").attr('checked', true);
													categoryPop(whichKind, 0);
												}
										}
									}
									
									});
								  
								//populate the categories
								  categoryPop(whichKind, whichOne);
								 
								 //activate the button that allows user to fill in another offer/need form
								  activateAdditionalBtn(whichKind, whichOne);
});
};//formPopulate


function displayCategories(parsedCategories){
	categoriesArray = parsedCategories;
					 $("#post-offerForms").append("<div class='boxBare post-offerSeparator' name='0'>Loading, please wait...<img src='images/loaderSm.gif'/></div><!--post-offerSeparator 0-->");
					 formPopulate("offer",0);
					 $("#post-needForms").append("<div class='boxBare post-needSeparator' name='0'>Loading, please wait...<img src='images/loaderSm.gif'/></div><!--post-needSeparator 0-->");
					 formPopulate("need",0);
					
}

fetchCategoryObject.fetchCategoryArray();

//populates the category drop down lists
function categoryPop(whichKind, whichOne){
					
							$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #"+whichKind+"Categories").html("Listing category: <select name='"+whichKind+"GoodsCategory' id='"+whichKind+"GoodsCategory' style='display: inline;'></select><select name='"+whichKind+"ServicesCategory' id='"+whichKind+"ServicesCategory' style='display: inline;'></select>").css({"color": "#333333", "font-size": "1em"});
							$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #"+whichKind+"GoodsCategory").prepend("<option value='please choose...'>please choose...</option>");
							$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #"+whichKind+"ServicesCategory").prepend("<option value='please choose...'>please choose...</option>");
							
							for(i=0; i<categoriesArray.length; i++){
								if(categoriesArray[i][2]=="g"){
									categoriesArrayAlt[i] = categoriesArray[i][1].replace(/_/g," ");
									goodsCategoryID[i] = categoriesArray[i][0];
									$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #"+whichKind+"GoodsCategory").append("<option value='"+goodsCategoryID[i]+"'>"+categoriesArrayAlt[i]+"</option>");
									
								}else if(categoriesArray[i][2]=='s'){
									categoriesArrayAlt[i] = categoriesArray[i][1].replace(/_/g," ");
									servicesCategoryID[i] = categoriesArray[i][0];
									$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #"+whichKind+"ServicesCategory").append("<option value='"+servicesCategoryID[i]+"'>"+categoriesArrayAlt[i]+"</option>");
								}
							}
							
							$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #"+whichKind+"ServicesCategory").hide();
		
}//categoryPop
																								   																										
$('.postBaseSecCode #security_code').unbind('keypress').keypress(function(e){
								 if(e.which==13){
									submitBtnAction(); 
								 }
						   });																								

function submitBtnAction(){
	
	if($("#stateDropDwn option:selected").text()=='please choose...' || $("#cityDropDwn option:selected").text()=='please choose...' || $('#specificLocaleInput').val()==''){//city and state and specific locale

																													alertObject.alertBox('ALERT!', cityStateAlrt, 'alert', null, null, null);
																														  
																												}else{
																													needChecked = null;
																													offerChecked = null;
																													
																													specificLocation = $('#specificLocaleInput').val();
																														
																													//check to make sure the offer form is not blank, the need form gets checked from within checkform, after the offer form is checked
																														  var offersLast = $("#post-offerForms .post-offerSeparator").length-1;
																														  var needsLast = $("#post-needForms .post-needSeparator").length-1;
																														  if($("#post-offerForms .post-offerSeparator:eq("+offersLast+") #post-offerPhoto").is(':visible') || $("#post-offerForms .post-offerSeparator:eq("+offersLast+") #post-offerActPhoto").is(':visible') || (offersLast==0 && $("#post-offerFormMiddle").is(':visible'))){//if offer photoForm is visible or it's the first form then the form must be validated
																																 checkForm('offer', offersLast, preSendCheck);
																																 
																														  }else if($("#post-needForms .post-needSeparator:eq("+needsLast+") input[name=needMoney"+needsLast+"]").is(':visible') || (needsLast==0 && $("#post-needFormMiddle").is(':visible'))){//if need moneyOffer is visible or it's the first form then the form must be validated
																															  	checkForm('need', needsLast, preSendCheck);
																																  
																														  }else{//both forms are collapsed hence they have already been validated, send it
																															 sendPosting();
																															  
																														  }
																														
																												}//city and state
}
var needChecked = null;
var offerChecked = null;
function preSendCheck(whichKind, whichOne){
		
	if(whichKind == 'offer'){
		var needsLast = $("#post-needForms .post-needSeparator").length-1;
		if($("#post-needForms .post-needSeparator:eq("+needsLast+") #post-needFormMiddle").is(':visible') && needChecked != 'roger'){//if need middle is visible then the form must be validated
			checkForm('need', needsLast, preSendCheck);
		}else{
			sendPosting();
			
		}
	}else if(whichKind=='need'){
		var offersLast = $("#post-offerForms .post-offerSeparator").length-1;
		if($("#post-offerForms .post-offerSeparator:eq("+offersLast+") #post-offerFormMiddle").is(':visible') && offerChecked != 'roger'){//if offer photoForm is visible then the form must be validated
			checkForm('offer', offersLast, preSendCheck);
		}else{
			sendPosting();
			
		}
	}
	
}

//checks to make sure the current form is completely filled out and then populates the form's data into the approriate array to be used when the data is submitted to the server
function checkForm(whichKind, whichOne, allsetAction){
	
	window[""+whichKind+"GSW"] = $("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") input[name='"+whichKind+"GoodsServices"+whichOne+"']:checked").val();//GSW
	
	
	
	if(window[""+whichKind+"GSW"]!='w'){//either a 'g' or 's'
		if($("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") input[name="+whichKind+"Money"+whichOne+"]").is(':checked')){//if true
			window[""+whichKind+"MoneyOffered"] = '2';//moneyOffer
		}else{
			window[""+whichKind+"MoneyOffered"] = '1';//moneyOffer
		}
		if($("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #"+whichKind+"ServicesCategory").is(':visible')){
			window[""+whichKind+"CategoryID"] = $("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #"+whichKind+"ServicesCategory option:selected").val();//servicesCategoryID
			window[""+whichKind+"CategoryName"] = $("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #"+whichKind+"ServicesCategory option:selected").text();//servicesCategory
		}else{
			window[""+whichKind+"CategoryID"] = $("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #"+whichKind+"GoodsCategory option:selected").val();//goodsCategoryID
			window[""+whichKind+"CategoryName"] = $("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #"+whichKind+"GoodsCategory option:selected").text();//goodsCategory																												 
		}
		
		window[""+whichKind+"TitleChosen"] = $("#"+whichKind+"Title"+whichOne+"").val();//title
		window[""+whichKind+"PostingChosen"] = $("#"+whichKind+"Posting"+whichOne+"").val();//posting
		
		if($("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") input[name='"+whichKind+"EmailNotes"+whichOne+"']").is(':checked')){//emailNotes if true
			window[""+whichKind+"EmailNotes"] = '2';
		}else{
			window[""+whichKind+"EmailNotes"] = '1';
		}
	
		//put form values into an array and send it to formValidator
		var checkFormArray = {
		'goodsServices':''+window[""+whichKind+"GSW"]+'',
		'Listing Category':''+window[""+whichKind+"CategoryName"]+'',
		'Title':''+window[""+whichKind+"TitleChosen"]+'',
		'Description':''+window[""+whichKind+"PostingChosen"]+'',
		};
				
		for (var child in checkFormArray){
			if(checkFormArray[child]==null || checkFormArray[child]=='' || checkFormArray[child]=='undefined' || checkFormArray[child]=='please choose...'){
				alertObject.alertBox('EMPTY FORM!', 'Please make sure that '+whichKind+' form #'+(whichOne+1)+' '+child+' is filled out/chosen!', 'alert', null, null, null);
				break;
			}else if(child=='Description'){
				
				if(whichKind=='offer' && photosArray[whichOne]==null){
					photosArray[whichOne]='1';
				}
				
				ifaW(whichKind, whichOne, null);
				if(allsetAction==preSendCheck){
					window[""+whichKind+"Checked"] = 'roger';
				}
				allsetAction(whichKind, whichOne);//makes the new form appear OR submits
			}
		}
		
	}else if(window[""+whichKind+"GSW"]=='w'){//if it is a 'w'
	
		//photosArray[whichOne]='1';
			
		if(allsetAction==preSendCheck){
					window[""+whichKind+"Checked"] = 'roger';
				}
				
				allsetAction(whichKind, whichOne);//makes the new form appear OR submits
	}
	

}

//populates the array and sends post to be submitted
function ifaW(whichKind, whichOne, send){
					
				//if the form is fully filled out commit the form values to the arrays
				window[""+whichKind+"PostingArray"].push(window[""+whichKind+"PostingChosen"]);
				window[""+whichKind+"TitleArray"].push(window[""+whichKind+"TitleChosen"]);
				window[""+whichKind+"CategoryArray"].push(window[""+whichKind+"CategoryID"]);
				window[""+whichKind+"GSWArray"].push(window[""+whichKind+"GSW"]);
				window[""+whichKind+"EmailNotesArray"].push(window[""+whichKind+"EmailNotes"]);
				window[""+whichKind+"MoneyArray"].push(window[""+whichKind+"MoneyOffered"]);

}//ifaW

var pTally = null;//total number of posts for this session
function sendPosting(){
	
	if(offerGSWArray.length==0){//if no offers are filled out make sure the array sent to the input file knows this
	
			offerPostingArray.push('null');
			offerTitleArray.push('null');
			offerCategoryArray.push('null');
			offerGSWArray.push('null');
			offerEmailNotesArray.push('null');
			offerMoneyArray.push('null');
			
		pTally = 0 + needGSWArray.length;//keep track of the number of posts
			
	}else if(needGSWArray.length==0){//if no needs are filled out make sure the array sent to the input file knows this
			needPostingArray.push('null');
			needTitleArray.push('null');
			needCategoryArray.push('null');
			needGSWArray.push('null');
			needEmailNotesArray.push('null');
			needMoneyArray.push('null');
			
		pTally = offerGSWArray.length + 0;//keep track of the number of posts
	}else{
		pTally = offerGSWArray.length + needGSWArray.length;//keep track of the number of posts	
	}
	
	$("#post-alert").empty();
		
	//verify the user and the captcha field
	var response = $('#recaptcha_response_field').val();
	var challenge = $('#recaptcha_challenge_field').val();
	
	$("#submitBtn").hide();
	$("#startOverBtnBottom").hide();
	$(".secCodeRefresh").hide();
	$("#post-alert").html('Checking security code, please wait...<img src="images/loaderSm.gif"/>');
	genTimerObject.genTimer();//start the timeout timer																											
	$.ajax({
			type: "POST",
			url:'control/verifyUser.php',
			data: "type=advanced&user="+userName+"&pass="+passWord+"&ssSec="+ssSec+"&response="+response+"&challenge="+challenge+"",
			success: function(confirmi){
				clearTimeout(genericTimer);
				confirmi = $.trim(confirmi);
				
				if(confirmi!='X10' && confirmi!='X11'){//uername, pass, and captcha all clear
					
				ssSec = confirmi;//reset security code
				if(photosArray.length==0){
					photosArray[0]='null';
				}
					
				//take all offers and put them into an array
				var offersArray = new Array();
				offersArray.push(offerGSWArray,offerCategoryArray,offerTitleArray,offerPostingArray,offerEmailNotesArray,photosArray,offerMoneyArray);
				//take all needs and puts them into an array
				var needsArray = new Array();
				needsArray.push(needGSWArray,needCategoryArray,needTitleArray,needPostingArray,needEmailNotesArray,photosArray,needMoneyArray);
				
				genTimerObject.genTimer();//start the timeout timer	
					var form = new Array();
					form = {'di':'post', 'i1':pTally, 's1':userName, 's2':passWord, 's3':ssSec, 'i2':drpDwnStateID, 'i3':drpDwnCityID, 's4':specificLocation, 'a1':offersArray, 'a2':needsArray};
					
									   $.post("control/formValidate.php", {form:form},
									   function(confirmation){
										clearTimeout(genericTimer);
										  var confirmer = $.trim(confirmation);
											if(confirmer=='1'){
												if(pTally==1){
												$('#postingForms .postBase1:eq(0)').html('<center><br/>Thank you, 1 posting has been successfully submitted!<br/><br/>You should be receiving a confirmation email shortly.<br/><br/><b><span style="color:#FF0000;">Be sure to visit the link within the email or your posting will not be viewable by the public.</span></b><br/><br/><span style="color:#990000;">Please note: Some Internet Service Providers (ISPs) have recently implemented a new Spam Filtering System. As a result, your confirmation email may be filtered to your Junk E-Mail folder unless you add us to your Safe List or White List.</span><br/><br/>Please contact us should you have any questions.<br/><br/>Enjoy ZooFaroo!</center>');
												}else{
												$('#postingForms .postBase1:eq(0)').html('<center><br/>Thank you,&nbsp;'+pTally+'&nbsp;postings have been successfully submitted!<br/><br/>You should be receiving a confirmation email shortly.<br/><br/><b><span style="color:#FF0000;">Be sure to visit the link within the email or your posting will not be viewable by the public.</span></b><br/><br/><span style="color:#990000;">Please note: Some Internet Service Providers (ISPs) have recently implemented a new Spam Filtering System. As a result, your confirmation email may be filtered to your Junk E-Mail folder unless you add us to your Safe List or White List.</span><br/><br/>Please contact us should you have any questions.<br/><br/>Enjoy ZooFaroo!</center>');
												}
												$('#postingForms .postBase1:eq(1)').hide();
												$('#postingForms .postBase1:eq(2)').hide();
												$('#postingForms .postBaseSecCode').hide();
												$('#postingForms .postBase1:eq(0)').css({'margin-top':'25px'});
											}else if(confirmer=='X10'){
												secCodeRefresh();
												$("#submitBtn").show();
												$("#startOverBtnBottom").show();
												$(".secCodeRefresh").show();
												$("#post-alert").empty();
												alertObject.alertBox('ALERT!', errorAlrt, 'alert', null, null, null);
											}
											})
				}else if(confirmi=='X11'){// sec code entered improperly
										$("#post-alert").empty();
										alertObject.alertBox('ALERT!', codeAlrt, 'alert', null, null, null);
										$("#submitBtn").show();
										$("#startOverBtnBottom").show();
										$(".secCodeRefresh").show();
										secCodeRefresh();
				}else if(confirmi=='X10'){// username password error
										function reseter(){window.open(''+baseHref+'post.html', '_self');};
										alertObject.alertBox('ALERT!', invalidUP, 'ferror', reseter, null, null);
				}
				
		},//verfifyUser success
	});//verifyUser

}//sendPosting
	
function secCodeRefresh(){
		Recaptcha.reload();
}

function activateAdditionalBtn(whichKind, whichOne){
	
	 $(".post-"+whichKind+"Additional .yesPleaseBtn").unbind("click").click(function(){
			var lastSeparator = $("#post-"+whichKind+"Forms .post-"+whichKind+"Separator").length-1;
				//if the last form was JUST filled out and visible, ie not collapsed
				if($("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+lastSeparator+") input[name="+whichKind+"Money"+whichOne+"]").is(':visible') || $("#post-offerForms .post-offerSeparator:eq("+lastSeparator+") #post-offerPhoto").is(':visible') || $("#post-offerForms .post-offerSeparator:eq("+lastSeparator+") #post-offerActPhoto").is(':visible')){//if moneyOffer or photo upload is visible or phot upload then the form must be validated
					///check to make sure the forms are all filled out
					checkForm(whichKind, lastSeparator, newFormAction);
				}else{//if the last form has already been filled out and collapsed just add a fresh form below
					$(".post-"+whichKind+"Additional").hide();
					nextOne = lastSeparator+1;
					$("#post-"+whichKind+"Forms").append("<div class='boxBasic post-"+whichKind+"Separator' name='"+nextOne+"'>Loading, please wait...<img src='images/loaderSm.gif'/></div><!--post-"+whichKind+"Separator "+nextOne+"-->");
					formPopulate(whichKind, nextOne);//adds the next form graphically
				}
	});
	
	$(".post-"+whichKind+"Additional .noThanksBtn").unbind("click").click(function(){
		$(".post-"+whichKind+"Additional").children().fadeOut('fast', function(){});
	});
}

function newFormAction(whichKind, lastSeparator){
	$(".post-"+whichKind+"Additional").hide();
	if(whichKind=='offer'){
		$("#post-offerForms .post-offerSeparator:eq("+lastSeparator+") #post-offerFormPhoto").empty();
	}
	//find the posting number
							postNumber = $("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+lastSeparator+") #post-"+whichKind+"Tag").text();							
							//reduces the previous post and animate close
							$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+lastSeparator+")").animate({height:"20px"}, {duration:500, complete:function(){
																																															  
							nextOne = lastSeparator+1;
							$("#post-"+whichKind+"Forms").append("<div class='boxBasic post-"+whichKind+"Separator' name='"+nextOne+"'>Loading, please wait...<img src='images/loaderSm.gif'/></div><!--post-"+whichKind+"Separator "+nextOne+"-->");
																		
							formPopulate(whichKind, nextOne);//adds the next form graphically
																																						  }});
							//this just displays the title and category
							$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+lastSeparator+") #post-"+whichKind+"FormTop").html("<div id='post-"+whichKind+"Tag'>"+postNumber+"</div>&nbsp;-&nbsp;<b>"+window[""+whichKind+"CategoryName"]+"</b>&nbsp;-&nbsp;"+window[""+whichKind+"TitleChosen"]+"");
							$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+lastSeparator+") #post-"+whichKind+"FormMiddle").hide();
							$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+lastSeparator+") #post-"+whichKind+"FormBottom").hide();
							//the collapsed filled out form now shows the options of deleting or editing the form
							$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+lastSeparator+") #post-formEdit").fadeIn('fast');
							$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+lastSeparator+") #post-formDelete").fadeIn('fast');
							activateDeleteBtns(whichKind, lastSeparator);
							activateEditBtns(whichKind, lastSeparator);
}

function clearIt(whichKind, whichOne, exclusion){
	$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #"+whichKind+"GoodsCategory").val(0);
		$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #"+whichKind+"ServicesCategory").val(0);
		$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #"+whichKind+"Title"+whichOne+"").val("");
		$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #"+whichKind+"Posting"+whichOne+"").val("");
		$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") input:radio").removeAttr("checked");
		if(exclusion){
			$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") input[value='w']").attr('checked', true);
		}
		if(whichKind=='offer'){
			$('.postBase1 .post-offerAdditional').css({'margin-top':'50px'});
		}
}

function activateEditBtns(whichKind, whichOne){																			
	//edit one of the completed forms
	$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #post-formEdit").unbind("click").click(function(){
		$(window).scrollTop(0);
		if(navigator.appName=='Microsoft Internet Explorer'){
		$('html').scrollTop(0);
		}
		
			editObject.editBox(whichKind, whichOne, null, null, null);
	});
}

function activateDeleteBtns(whichKind, whichOne){
	
	$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #post-formDelete").unbind("click").click(function(){
					if(!$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #post-"+whichKind+"FormTop input[name='"+whichKind+"GoodsServices"+whichOne+"']").is(':visible')){//if only one form is filled out and the user wants to delete it
						 alertObject.alertBox('ALERT!', deleteConfirm, 'decision', postDelete, whichKind, whichOne);
					}else{
						clearIt(whichKind, whichOne, false);
						$(".post-"+whichKind+"Additional").show();
						$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+")").remove();
					}
				  });
}
function postDelete(whichKind, whichOne){
	var lastSeparator = ($("#post-"+whichKind+"Forms .post-"+whichKind+"Separator").length-1);//targets last separator
	//if there is only one entry and only one entry
	if(whichOne == 0 && window[""+whichKind+"CategoryArray"].length==1){//1
		
		window[""+whichKind+"PostingArray"].length = 0;
		window[""+whichKind+"TitleArray"].length = 0;
		window[""+whichKind+"CategoryArray"].length = 0;
		window[""+whichKind+"GSWArray"].length = 0;
		window[""+whichKind+"EmailNotesArray"].length = 0;
		window[""+whichKind+"MoneyArray"].length = 0;
		if(whichKind=='offer'){
			removeTempPhoto(photosArray[0], 'rTemp', 'null', 'null');
			photosArray.length=0;	
		}
		
		
		//makes sure the option below shows the additional button
		clearIt(whichKind, whichOne, false);
		$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+lastSeparator+")").remove();
		formPopulate(whichKind,0);
		
	}else if(whichOne>=0 && window[""+whichKind+"CategoryArray"].length>1){//1
	//takes care of the array
	window[""+whichKind+"PostingArray"].splice(whichOne,1);
	window[""+whichKind+"TitleArray"].splice(whichOne,1);
	window[""+whichKind+"CategoryArray"].splice(whichOne,1);
	window[""+whichKind+"GSWArray"].splice(whichOne,1);
	window[""+whichKind+"EmailNotesArray"].splice(whichOne,1);
	window[""+whichKind+"MoneyArray"].splice(whichOne,1);
	if(whichKind=='offer'){
		removeTempPhoto(photosArray[whichOne], 'rTemp', 'null', 'null');
		photosArray.splice(whichOne,1);
	}
	
	//takes care of the graphics
	$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+")").remove();
	
	for(j=0; j<$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator").length; j++){
		var k = j+1;
		$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+j+")").attr('name', ''+j+'');
		$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+j+") #post-"+whichKind+"FormTop #post-"+whichKind+"Tag").html(""+whichKind+"&nbsp;&nbsp;#"+k+"");
		$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+j+") #post-"+whichKind+"FormTop input[value='g']").attr('name', ''+whichKind+'GoodsServices'+j+'');
		$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+j+") #post-"+whichKind+"FormTop input[value='s']").attr('name', ''+whichKind+'GoodsServices'+j+'');
		$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+j+") #post-formEdit").attr('name', ''+j+'');
		$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+j+") #post-formDelete").attr('name', ''+j+'');
		$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+j+") #post-"+whichKind+"FormMiddle input[aux='title']").attr('name', ''+whichKind+'Title'+j+'');
		$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+j+") #post-"+whichKind+"FormMiddle input[aux='title']").attr('id', ''+whichKind+'Title'+j+'');
		$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+j+") #post-"+whichKind+"FormMiddle textarea[aux='description']").attr('name', ''+whichKind+'Posting'+j+'');
		$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+j+") #post-"+whichKind+"FormMiddle textarea[aux='description']").attr('id', ''+whichKind+'Posting'+j+'');
		$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+j+") #post-"+whichKind+"FormMiddle #post-"+whichKind+"emailNotes input[value='2']").attr('name', ''+whichKind+'EmailNotes'+j+'');
		
		$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+j+") #post-"+whichKind+"FormBottom #"+whichKind+"Money input[value='2']").attr('name', ''+whichKind+'Money'+j+'');
		
		//takes care of activating the edit buttons after a deletion
		activateDeleteBtns(whichKind, j);
		activateAdditionalBtn(whichKind, j);
		activateEditBtns(whichKind, j);
	}
	

	//changes the last separator back to an additional choice, if need be
	if($(".post-"+whichKind+"Additional").is(":hidden")){
		clearIt(whichKind, lastSeparator, false);
		$(".post-"+whichKind+"Additional").css({'margin-top':'0px'}).show();
		$("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+($("#post-"+whichKind+"Forms .post-"+whichKind+"Separator").length-1)+")").remove();
	}
	}//1
}

$(document).ready(function(){	
			   
						   $('#post-postForm').show();
						   $('.postBase1:eq(0)').fadeIn('slow');
						fetchStateObject.fetchStateArray('post');										
});//on ready