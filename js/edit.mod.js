var categoriesArray = new Array();
var categoriesArrayAlt = new Array();
var goodsCategoryID = new Array();
var servicesCategoryID = new Array();
var offerNeed = null;
var postCount=0;
var editID = null;
var editUname = null;
var editEmail = null;
var editPS = null;
var editPSO = null;
var editCity = null;
var editState = null;
var editStateTxt = null;
var editBus = null;
var editBusTxt = null;
var editBusName = null;
var editFB = null;
var editFBTxt = null;
var editTW = null;
var editTWTxt = null;
var editGP = null;
var editGPTxt = null;
var editLI = null;
var editLITxt = null;
var editURL = null;
var editURLSuf = null;
var editURLTxt = null;
var editssSec = null;
var stateArrayCall=null;
var whichSubList=null;

function reseter(){window.open(''+baseHref+'edit.html', '_self');};
chosenStateArray = fetchStateObject.fetchStateArray('default');
function checkStateStatus(stateArray){
		
					if(stateArray){
						
					for(i=0; i<stateArray.length; i++){
						if(editState==stateArray[i][0]){
							editStateTxt=stateArray[i][1];
							$('.firstListBase .list-accountInfo #list-accountDetail:eq(4) #listContent').html(editStateTxt);
						}
						clearInterval(stateArrayCall);
					}
					
				}
}
				
function retrieveEditList(ssSec){
	
	$('#preloader').append(myImagePR);
	editssSec = ssSec;
	$.getScript("js/reviewsEditInfo.mod.js");
}

//fetch categories
fetchCategoryObject.fetchCategoryArray();
	
//put cats into a usable array---called from fetchCategoryArray
function displayCategories(parsedCategories){
	categoriesArray = parsedCategories;
}//display categories

$('#list-Listings #postList-listings').hide();

var tempPhotoEdit = new Array();

function editFormPhotoAction(tPEArray, whichOne, whichSubList){ tempPhotoEdit = tPEArray; if(tempPhotoEdit[1]=='0'){ if(tempPhotoEdit[5]=='change'){ removePhoto(tempPhotoEdit[4], 'rTemp', reviewsArrayParsed[whichOne][whichSubList][6], reviewsArrayParsed[whichOne][whichSubList][15]); reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][8]='1'; tempPhotoEdit[3] = 'empty'; tempPhotoEdit[4] = '1'; }; if(tempPhotoEdit[5]=='cancel'){ if(tempPhotoEdit[4]!='1'){ removePhoto(tempPhotoEdit[4], 'rTemp', reviewsArrayParsed[whichOne][whichSubList][6], reviewsArrayParsed[whichOne][whichSubList][15]); tempPhotoEdit[3] = 'empty'; tempPhotoEdit[4] = '1'; reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][8]='1'; }else{ tempPhotoEdit[3] = 'empty'; tempPhotoEdit[4] = '1'; reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][8]='1'; } } if(tempPhotoEdit[5]=='save'){ if(tempPhotoEdit[4]!='1'){ reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][8] = tempPhotoEdit[4];}else{ tempPhotoEdit[3]='empty'; tempPhotoEdit[4]='1'; reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][8]='1'; } } }else if(tempPhotoEdit[1]=='1'){ if(tempPhotoEdit[5]=='change'){ if(tempPhotoEdit[3] == 'empty'){ tempPhotoEdit[3] = tempPhotoEdit[4]; tempPhotoEdit[4] = '1'; reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][8]='1'; } else{ removePhoto(tempPhotoEdit[4], 'rTemp', reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][6], reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][15]); tempPhotoEdit[4] = '1'; reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][8]='1'; } } if(tempPhotoEdit[5]=='cancel'){ if(tempPhotoEdit[4]!='1'){ if(tempPhotoEdit[3] == 'empty'){ reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][8] = tempPhotoEdit[4]; }else{ reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][8] = tempPhotoEdit[3]; removePhoto(tempPhotoEdit[4], 'rTemp', reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][6], reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][15]); tempPhotoEdit[4] = tempPhotoEdit[3]; tempPhotoEdit[3] = 'empty'; } }else{ tempPhotoEdit[4] = tempPhotoEdit[3]; tempPhotoEdit[3] = 'empty'; reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][8] = tempPhotoEdit[4]; } } if(tempPhotoEdit[5]=='save'){ if(tempPhotoEdit[4]!='1'){ if(tempPhotoEdit[3] == 'empty'){ reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][8] = '2'; }else{ reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][8] = tempPhotoEdit[4]; removePhoto(tempPhotoEdit[3], 'rState', reviewsArrayParsed[whichOne][whichSubList][6], reviewsArrayParsed[whichOne][whichSubList][15]); } }else{ tempPhotoEdit[4] = '1'; reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][8] = '1'; } } } $('.postBase1 .post-offerAdditional').css({'margin-top':'35px'}); $(''+divLocale+' #post-offerPhoto').show(); $(''+divLocale+' #post-offerActPhoto').empty(); $(''+divLocale+' .post-offerChangePhoto').unbind('click'); $(''+divLocale+' #post-offerFormPhoto .post-offerChangePhoto').hide(); }

function photoLoaded(whichOne){
							
		if($(''+divLocale+' #post-offerFormPhoto #post-offerActPhoto').contents().attr('id')){
			
		var tphotonm=$(''+divLocale+' #post-offerFormPhoto #post-offerActPhoto').contents().attr('id');
		
		if(tphotonm=='X10' || tphotonm=='X11' || tphotonm=='X12' || tphotonm=='undefined' || tphotonm=='' || tphotonm==null){
			clearInterval(photoInterval);
			clearTimeout(photoTimer);
		$('.alert').css({'display':'none'});$('.mainBase .postBaseEdit').toggle();
			switch(tphotonm){
				
				case 'X10':
					if(pOrE=='post'){
						alertObject.alertBox('ALERT!', photoAlrt, 'alert', null, null, null);
					}else if(pOrE=='edit'){
						alertObject.alertBox('ALERT!', photoAlrt, 'gerror', null, '.postBaseEdit', null);
					}
					break;
					
				case 'X11':
					if(pOrE=='post'){
						alertObject.alertBox('ALERT!', photoErr, 'alert', null, null, null);
					}else if(pOrE=='edit'){
						alertObject.alertBox('ALERT!', photoErr, 'gerror', null, '.postBaseEdit', null);
					}
					break;
					
				case 'X12':
					if(pOrE=='post'){
						alertObject.alertBox('ALERT!', photoErr, 'alert', null, null, null);
					}else if(pOrE=='edit'){
						alertObject.alertBox('ALERT!', photoErr, 'gerror', null, '.postBaseEdit', null);
					}
					break;
					
				case '':
					if(pOrE=='post'){
						alertObject.alertBox('ALERT!', photoErr, 'alert', null, null, null);
					}else if(pOrE=='edit'){
						alertObject.alertBox('ALERT!', photoErr, 'gerror', null, '.postBaseEdit', null);
					}
					break;
					
				case null:
					if(pOrE=='post'){
						alertObject.alertBox('ALERT!', photoErr, 'alert', null, null, null);
					}else if(pOrE=='edit'){
						alertObject.alertBox('ALERT!', photoErr, 'gerror', null, '.postBaseEdit', null);
					}
					break;
					
				case 'undefined':
					if(pOrE=='post'){
						alertObject.alertBox('ALERT!', photoErr, 'alert', null, null, null);
					}else if(pOrE=='edit'){
						alertObject.alertBox('ALERT!', photoErr, 'gerror', null, '.postBaseEdit', null);
					}
					break;
					
				default:
					if(pOrE=='post'){
						alertObject.alertBox('ALERT!', photoErr, 'alert', null, null, null);
					}else if(pOrE=='edit'){
						alertObject.alertBox('ALERT!', photoErr, 'gerror', null, '.postBaseEdit', null);
					}
				break;
			}
			
		}else if(tphotonm.substr(tphotonm.length - 3)=='jpg' || tphotonm.substr(tphotonm.length - 3)=='jpeg' || tphotonm.substr(tphotonm.length - 3)=='png' || tphotonm.substr(tphotonm.length - 3)=='gif' && $('#post-offerActPhoto').height()!=0 && $('#post-offerActPhoto').height()>0){
					$('.alert').css({'display':'none'});$('.mainBase .postBaseEdit').toggle();
					clearInterval(photoInterval);
					clearTimeout(photoTimer);
					//Photos
					var tphotoht = parseInt($(''+divLocale+' #post-offerFormPhoto #post-offerActPhoto').contents().attr('name'));
					$(''+divLocale+' #post-offerFormPhoto #photoLoading').empty();
					var photoFormAdjust = tphotoht+50;
					$(''+divLocale+' #post-offerFormPhoto .post-offerChangePhoto').show().css({'margin-top': ''+tphotoht+'px'});;
					$(''+divLocale+' #post-offerFormPhoto #post-offerPhoto').hide();
					var offersLast = $("#post-offerForms .post-offerSeparator").length-1;
					if(pOrE=='post'){
						photosArray[offersLast] = tphotonm;
					}else if(pOrE=='edit'){
						tempPhotoEdit[4] = tphotonm;//each time a photo is loaded into the edit form we must save it's name
						tempPhotoEdit[5] = 'load';
					}
					pageAdjust();
					$('.postBase1 .post-offerAdditional').css({'margin-top':photoFormAdjust+'px'});
					photoChangeActivate(tempPhotoEdit);
					tphotonm=null;
					tphotoht=null;
					
		}
							
	}
									
}//photoLoaded



function pageAdjust(){
	if($('#post-needFormMiddle').is(':hidden') || $('#post-offerFormMiddle').is(':hidden')){
	
	if($('.mainBase .postBaseEdit .post-offerChangePhoto').is(':hidden')){
		$('.mainBase .postBaseEdit .postBaseEdit2 .secCodeRefresh').css({'margin-left':'375px', 'margin-top':'235px'});
		$('.mainBase .postBaseEdit .postBaseEdit2').css({'width':'100%', 'padding':'none', 'margin-top':'50px', 'margin-left':'0px', 'height':'550px'});
	}else if($('.mainBase .postBaseEdit .post-offerChangePhoto').is(':visible')){
		$('.mainBase .postBaseEdit .postBaseEdit2 .secCodeRefresh').css({'margin-left':'375px', 'margin-top':'215px'});
		$('.mainBase .postBaseEdit .postBaseEdit2').css({'width':'100%', 'padding':'none', 'margin-top':'50px', 'margin-left':'0px', 'height':'820px'});
	}
}else if($('#post-needFormMiddle').is(':visible') && $('#post-offerFormMiddle').is(':visible')){
	
	if($('.mainBase .postBaseEdit .post-offerChangePhoto').is(':hidden')){
		$('.mainBase .postBaseEdit .postBaseEdit2 .secCodeRefresh').css({'margin-left':'375px', 'margin-top':'505px'});
		$('.mainBase .postBaseEdit .postBaseEdit2').css({'width':'100%', 'padding':'none', 'margin-top':'50px', 'margin-left':'0px', 'height':'820px'});
	}else if($('.mainBase .postBaseEdit .post-offerChangePhoto').is(':visible')){
		$('.mainBase .postBaseEdit .postBaseEdit2').css({'width':'100%', 'padding':'none', 'margin-top':'50px', 'margin-left':'0px', 'height':'1100px'});
	}
}
	
}//pageAdjust

function photoChangeActivate(tempPhotoEdit){

	$(''+divLocale+' #post-offerFormPhoto .post-offerChangePhoto').click(function(){
			if(pOrE=='edit'){
					tempPhotoEdit[5] = 'change';
					editFormPhotoAction(tempPhotoEdit, tempPhotoEdit[0], tempPhotoEdit[2]);
					
			}
					});

}
	
function removePhoto(tphotonm, removeType, stateID, postID){
	var form = new Array();
	form = {'di':'photoCancel', 's1':tphotonm, 'i1':chosenUserID, 's2':editssSec, 's3':removeType, 'i2':stateID, 'i3':postID};
	$.post('control/formValidate.php', {form:form});
}


function photoCancelLoad(whichOne){
	$('.alert').css({'display':'none'});$('.mainBase .postBaseEdit').toggle();
	clearInterval(photoInterval);
	clearTimeout(photoTimer);
	$(''+divLocale+' #post-offerFormPhoto #post-offerActPhoto').empty();
	$(''+divLocale+' #post-offerFormPhoto #post-offerPhoto').show();
	$(''+divLocale+' #post-offerFormPhoto #photoLoading').empty();
	if(pOrE=='post'){
		alertObject.alertBox('ALERT!', photoErr, 'alert', null, null, null);
	}else if(pOrE=='edit'){
		alertObject.alertBox('ALERT!', photoErr, 'gerror', null, '.postBaseEdit', null);
	}
}//photoCancelLoad


var divLocale = null;
var pOrE = null;

function photoListen(whichOne, postOrEdit){
	alertObject.alertBox('LOADING', "Loading image file, please wait...<img src='images/loaderSm.gif'/>", 'ferrorLoad', null, '.mainBase .postBaseEdit', null);
	pOrE = postOrEdit;
	if(pOrE=='edit'){
		divLocale = '.mainBase .postBaseEdit';
	}else if(pOrE=='post'){
		divLocale = '#post-offerForms .post-offerSeparator:eq('+whichOne+')';
	}
	$(''+divLocale+' #post-offerFormPhoto #post-offerPhoto').hide();
	$(''+divLocale+' #post-offerFormPhoto #photoLoading').html("Loading image file, please wait...<img src='images/loaderSm.gif'/>");
	photoInterval = setInterval('photoLoaded('+whichOne+')', 100);
	photoTimer = setTimeout('photoCancelLoad('+whichOne+')', 15000);
}//photoListen