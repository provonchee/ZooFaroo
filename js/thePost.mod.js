var postTitleAdj=null;
var emailOfferTitleAdj=null;
var emailNeedTitleAdj=null;
var thePostingArrayParsed=null;
var loaderTimer=null;
var postLoaded=false;
var replyierHeight = 220;
var userBusiness = null;
var userRatingCount = null;
var userRatingPercent = null;
var userLink = null;
$('#postShare-layout').hide();
$('#postShare-layout #postReply-form').load('modules/loginForm.php');
if(chosenOfferNeed=='Needed'){
	$('.replyPostingBtn').css({'margin-top':'0px'});
	$('#postShare').css({'margin-top':'0px'});
	$('.thePostBase .primaryThePostBase').height('250px')
}
$('.replyPostingBtn').click(function(){
	$(this).toggle();
	$('#postShare-layout').fadeIn('fast');
		if($('#postShare-layout #postReply-form').children().length>0){
			$('#postShare-layout #postReply-form').css({'margin-top':'35px'}).show();
			$('#postShare-layout').css({'height':'100px'});
			$('#postShare-layout #postReply-form').css({'margin-left':'180px'});
		}else{
			$('.postReplySecCode').show();
			$('#postShare-layout').css('height', '365px');
			$('.thePostBase').height($('.thePostBase').height()+365);
		}
});
	
function postHeightAdjuster(){
	
	if(postLoaded){
		clearInterval(loaderTimer);
		if($('#secondaryHouse').children().length!=0){
		var secondaryHeight = 120;
		secondaryHeight = $('#secondaryHouse').children().length*secondaryHeight;
		var postingHeight = $('.thePostBase .primaryThePostBase').height()+175+secondaryHeight;
			if($('.replyPostingBtn').is(':hidden')){
				$('#postShare-layout #postReply-form').empty();
				$('.postReplySecCode').show();
				$('#postShare-layout').css('height', '365px');
				postingHeight = $('.thePostBase .primaryThePostBase').height()+575+secondaryHeight;
			}
			$('.thePostBase').css({'height':postingHeight+'px'});
		}else{
			var postingHeight = $('.thePostBase .primaryThePostBase').height()+200;
			if($('.replyPostingBtn').is(':hidden')){
				$('#postShare-layout #postReply-form').empty();
				$('.postReplySecCode').show();
				$('#postShare-layout').css('height', '365px');
				postingHeight = $('.thePostBase .primaryThePostBase').height()+575;
			}
			$('.thePostBase').css({'height':postingHeight+'px'});
		}
	}
}
$('#postReply-message').hide();
$('.postReplySecCode').hide();
function reseter(){window.open(''+baseHref+chosenState+'/'+chosenCity+'/'+chosenOfferNeed+'/'+chosenCategory+'/'+chosenPostingID+'.html', '_self')};
	//breadcrumb/emailshare titles to be adjusted
	  function getTitleAdjusted(category, title, param, delivery, kind){
			   var combLength = (category.length)+(title.length);
				if(combLength>=param){
					var paramAdj = param-(category.length);
					titleAdj = decodeURI(title.substr(0,paramAdj));
					titleAdj = titleAdj+'...';
					delivery(titleAdj, kind);
				}else{
					delivery(decodeURI(title), kind);
				}
		   }
		   
	//adjust the title for the emailShare so that none runneth over
	function emailAdjusted(tAdjusted, kind){
		if(kind=='offer'){
			emailOfferTitleAdj=tAdjusted.replace(/\\/g, "");
			//adjust the need title
			getTitleAdjusted(thePostingArrayParsed[17], thePostingArrayParsed[18], 65, emailAdjusted, 'need');
		}else if(kind=='need'){
			emailNeedTitleAdj=tAdjusted.replace(/\\/g, "");
			
			oC=thePostingArrayParsed[11];//ocategory
			oT=thePostingArrayParsed[12];//otitle
			nC=thePostingArrayParsed[17];//ncategory
			nT=thePostingArrayParsed[18];//ntitle
			
			shareObject.shareBox(encodeURIComponent(emailOfferTitleAdj), encodeURIComponent(emailNeedTitleAdj), encodeURIComponent(urli), encodeURIComponent(oC), encodeURIComponent(oT), encodeURIComponent(nC), encodeURIComponent(nT));
		}
	}
		
	//adjust the breadcrumbs title so that it doesn't runneth over
	function breadCrumbs(breadCrumbTitle, kind){
		BreadCrumbTitle = breadCrumbTitle.replace(/\\/g, "");
		$('#breadCrumbs').append('&nbsp;&hArr;&nbsp;<span style="color:#0066cc">'+BreadCrumbTitle+'</span>');
		$("#breadCrumbs .backBtn").unbind("click").click(function(){history.go(-1)});
	}	
	
	
	function sortPosting(whichPostingKind, thePostInfo, kind, whichThePostBase){
			
			postTitleAdj=thePostInfo[13].replace(/\\/g, "");
			
			var year = thePostInfo[3].substring(0,4);
			var month = thePostInfo[3].substring(5,7);
			var day = thePostInfo[3].substring(8);
			var dateAdjusted = ''+month+'-'+day+'-'+year+'';
			
			var hasPhoto='';
			
			var postSection=null;
			if(kind=='offer'){
				if(whichPostingKind=='primary'){
					displayPrimary('Offer');
				}else if(whichPostingKind=='secondary'){
					if(thePostInfo[8]!='1'){
						hasPhoto = '&nbsp;&nbsp;<img src="images/photo.png" alt="This posting has a photo" title="This posting has a photo"/>';
					}else{
						hasPhoto = '';
					}
					displaySecondary('Offer', hasPhoto);
				}
			}else if(kind=='need'){
				if(whichPostingKind=='primary'){
					displayPrimary('Need');
				}else if(whichPostingKind=='secondary'){
					hasPhoto = '';
					displaySecondary('Need', hasPhoto);
				}
			}
			
			
		
			
					
			//DISPLAY THE PRIMARY POSTING
			function displayPrimary(cappedKind){
				 if(thePostInfo[19][0]!='0'){
				 		 userRatingCount = thePostInfo[19][0];
			 	 		 userRatingPercent = "<span style='color:#669900;'>"+thePostInfo[19][1]+"%</span>";
						 userBusiness = thePostInfo[19][2];
					 }else{
						userRatingCount = '0'; 
						
						userRatingPercent = "";
					 }
				
			 	 userLink = '<a href="user/'+thePostInfo[1]+'.html" style="text-decoration:none"><div class="buttonWrap reviewLink">'+thePostInfo[1]+'('+userRatingCount+')&nbsp;<b>'+userRatingPercent+'</b></div></a>';
				 
				postSection = '<div id="post-'+kind+'Posting"><div id="post-'+kind+'Icon"><div id="thePost-'+kind+'Tag">'+kind+'ed</div></div><div id="post-'+kind+'Title"><div id="titleCategory">&nbsp;<span style="color:#bbbbbb;">&#187;</span>&nbsp;'+thePostInfo[12].replace(/_/g, ' ')+'&nbsp;<span style="color:#bbbbbb;">&#187;</span>&nbsp;</div><b><div id="'+kind+'Title">'+postTitleAdj+'</b>'+mOfferObject.mOffer(thePostInfo[14], kind)+'</div></div><br/><div id="post-'+kind+'Desc">'+thePostInfo[17]+'</div><div id="post-'+kind+'Photo"></div></div>';
		   		$('.thePostBase '+whichThePostBase+'').prepend('<div class="sectionHeaderFormat ltGrayHeader sectionHeader1"><span style="float:left;">Posted by:&nbsp;&nbsp;</span>'+userLink+'<div id="post-postedDate">Posted on:&nbsp;&nbsp;<span >'+dateAdjusted+'</span></div><div id="headerFooter-city">Post Location:&nbsp;&nbsp;'+thePostInfo[18]+'&nbsp;&nbsp;(<a class="aLink" href="'+baseHref+'/'+thePostInfo[7]+'/'+thePostInfo[5]+'.html">'+thePostInfo[5].replace(/_/g, ' ')+'</a></div><div id="headerFooter-state">&nbsp;,&nbsp;<a class="aLink"  href="'+baseHref+'/'+thePostInfo[7]+'.html">'+thePostInfo[7].replace(/_/g, ' ')+'</a></div>)<div class="buttonWrap abuseReport">!</div></div>'+postSection+'');
				if(thePostInfo[5]==thePostInfo[7]){//city and state are the same as in Maine/Maine for states that only have one section
					//hide the state in the header
					$('.thePostBase '+whichThePostBase+' .sectionHeader1 #headerFooter-state').hide();
				}
				
				//photo display, if there is one
				if(thePostInfo[8]!='1' && kind=='offer'){
				$('.thePostBase '+whichThePostBase+' #post-offerPosting #post-offerPhoto').html('<img src="'+baseHref+'photos/'+chosenStateID+'/'+thePostInfo[8]+'" alt="'+thePostInfo[0]+'/'+thePostInfo[4]+'/'+thePostInfo[6]+'/'+thePostInfo[16].replace(/_/g, ' ')+'"/>');
				}	
				if(thePostInfo[14]=='2'){
					$('.thePostBase '+whichThePostBase+' .moneyOption').unbind('click').click(function(){alertObject.alertBox('OPEN TO OFFERS', window["acceptMoney"+cappedKind+""], 'alert', null, null, null);});
				}

				$('.thePostBase '+whichThePostBase+' .abuseReport').unbind('click').click(function(){alertObject.alertBox('ALERT!', reportConfirm, 'decision', sendReport, thePostInfo[16], kind);});
				
			}
			
			//DISPLAY THE SECONDARY POSTING
			function displaySecondary(cappedKind, hasPhoto){
				if(thePostInfo[19][0]!='0'){
						 userRatingCount = thePostInfo[19][0];
			 	 		 userRatingPercent = "<span style='color:#669900;'>"+thePostInfo[19][1]+"%</span>";
						 userBusiness = thePostInfo[19][2];
					 }else{
						userRatingCount = '0'; 
						
						userRatingPercent = "";
					 }
			 	 userLink = '<a href="user/'+thePostInfo[1]+'.html" style="text-decoration:none"><div class="buttonWrap reviewLink">'+thePostInfo[1]+'('+userRatingCount+')&nbsp;<b>'+userRatingPercent+'</b></div></a>';					
				 //secondary tally
					$('.thirdListBase .reviews-greeting').html(''+userLink+'&nbsp;has&nbsp;<div id="list-offerTag">'+numOfOffers+'&nbsp;offer</div> postings and <div id="list-needTag">'+numOfNeeds+'&nbsp;need</div> postings.').css({'font-size':'inherit'});
					postSection = "<div id='list-"+kind+"Title'><div id='list-"+kind+"Icon'><div id='list-"+kind+"Tag'>"+kind+"ed</div></div><div id='list-"+kind+"Link'>&nbsp;&#187;&nbsp;<div id='titleCategory'>"+thePostInfo[12].replace(/_/g, ' ')+"</div>&nbsp;&#187;&nbsp;<a href='"+thePostInfo[7]+"/"+thePostInfo[5]+"/"+cappedKind+"ed/"+thePostInfo[12].replace(/ /g, '_')+"/"+thePostInfo[16]+".html'> <div id='"+kind+"Title'>"+thePostInfo[13]+"</div></a></div>"+mOfferObject.mOffer(thePostInfo[14], kind)+"<div id='hasPic'>"+hasPhoto+"</div></div>";
		   			$('.thePostBase '+whichThePostBase+'').prepend('<div class="sectionHeaderFormat ltGrayHeader sectionHeader1"><span style="float:left;">Posted by:&nbsp;&nbsp;</span>'+userLink+'<div id="post-postedDate">Posted on:&nbsp;&nbsp;<span >'+dateAdjusted+'</span></div><div id="headerFooter-city">Post Location:&nbsp;&nbsp;'+thePostInfo[18]+'&nbsp;&nbsp;(<a class="aLink" href="'+baseHref+'/'+thePostInfo[7]+'/'+thePostInfo[5]+'.html">'+thePostInfo[5].replace(/_/g, ' ')+'</a></div><div id="headerFooter-state">&nbsp;,&nbsp;<a class="aLink"  href="'+baseHref+'/'+thePostInfo[7]+'.html">'+thePostInfo[7].replace(/_/g, ' ')+'</a></div>)<div class="buttonWrap abuseReport">!</div></div>'+postSection+'');
					
					if(thePostInfo[5]==thePostInfo[7]){//city and state are the same as in Maine/Maine for states that only have one section
					//hide the state in the header
					$('.thePostBase '+whichThePostBase+' .sectionHeader1 #headerFooter-state').hide();
					}
					
					if(thePostInfo[14]=='2'){
					$('.thePostBase '+whichThePostBase+' .moneyOption').unbind('click').click(function(){alertObject.alertBox('OPEN TO OFFERS', window["acceptMoney"+cappedKind+""], 'alert', null, null, null);});
					}
					$('.thePostBase '+whichThePostBase+' .abuseReport').unbind('click').click(function(){alertObject.alertBox('ALERT!', reportConfirm, 'decision', sendReport, thePostInfo[16], kind);});
			}
					
			
			
			//abuse report alt
			$('.thePostBase '+whichThePostBase+' .sectionHeader1 .abuseReport').attr({ 
				title: pOffense,
				alt: reportA
			});
			
			
			
			$('.thePostBase #preloader').fadeOut('fast', function(){
				$('.thePostBase  #preloader').remove();
					$('.thePostBase '+whichThePostBase+'').fadeIn('fast', function(){						
						 $('.thePostBase .primaryThePostBase').fadeIn('fast', function(){postLoaded=true;});
				});
			});
			
			
		
	}//sortPosting

function  displayCategories(categoryArray){
for(i=1; i<categoryArray.length; i++){
	if(categoryArray[i][1]==''+chosenCategory+''){
		chosenCategoryID=categoryArray[i][0];
	}
}
}//displayCategories

function  displayCities(parsedCities){
for(i=0; i<parsedCities.length; i++){
	if(parsedCities[i][3]==''+chosenCity+''){
		chosenStateID=parsedCities[i][0];
		chosenCityID=parsedCities[i][2];
		chosenStateAlt=parsedCities[i][1];
		chosenCityAlt=parsedCities[i][3];
		if(Modernizr.localstorage){
			try{
				localStorage.setItem('zoofaroo_chosenState',chosenStateAlt); 
				localStorage.setItem('zoofaroo_chosenCity',chosenCityAlt);
			} catch (e) {
								}
		}
	}
}
}//displayCities
fetchCategoryObject.fetchCategoryArray();
fetchCityObject.fetchCityArray(''+chosenState+'', false);

var arrayCheckerInterval = setInterval ( "arrayChecker()", 100 );

function arrayChecker(){
  if(chosenStateID&&chosenCityID&&chosenCategoryID){
	  clearInterval(arrayCheckerInterval);
	  thePoster();
  }
}
var numOfOffers = null;
var numOfNeeds = null;
var chosenPost = null;
var secondaryPosts = new Array();	
function thePoster(){
	$.ajax({
	   type:'POST',
	   url:'control/pageQuery.php',
	   data:'page=thePost&cityID='+chosenCityID+'&stateID='+chosenStateID+'&categoryID='+chosenCategoryID+'&postingID='+chosenPostingID+'&offerNeed='+chosenOfferNeed+'',
	   success: function(thePostingArray){
		   if(thePostingArray!='X10'){
		   //THE POSTING IN AN ARRAY
		   thePostingArrayParsed = jQuery.parseJSON(thePostingArray);
		   
		   if(thePostingArrayParsed[0]!='X10'){
			
			
			//thePostingArrayParsed[0] = offersArray
			//thePostingArrayParsed[1] = needArray
			
//			[0]//userID
//			[1]//username
//			[2]//business
//			[3]//posting date
//			[4]//city id
//			[5]//city name
//			[6]//state id
//			[7]//state name
//			[8]//photograph
//			[9]//GSW
//			[10]//EmailNotes
//			[11]//Category ID
//			[12]//Category
//			[13]//Title
//			[14]//Money
//			[15]//Empty
//			[16]//postingID
//			[17]//Posting
//			[18]//specificLocale
//			[19]//user reviews
			
			//find the post with the postingID--this is the one that will display prominently
			
				if(chosenOfferNeed=='Offered'){
					for(i=0; i<thePostingArrayParsed[0].length; i++){
						if(thePostingArrayParsed[0][i][16]==chosenPostingID){
							chosenPost = thePostingArrayParsed[0][i];//primary post
							thePostingArrayParsed[0].splice(i,1);
							secondaryPosts = thePostingArrayParsed[1].concat(thePostingArrayParsed[0]);
							numOfOffers = thePostingArrayParsed[0].length;
							numOfNeeds= thePostingArrayParsed[1].length;
							if(thePostingArrayParsed[0][i][14]=='1'){
								$('#terteiryHouse').show();
								$('#terteiryHouse .thePostBaseMsg #postHint').html('Don\'t be afraid to contact this user with your own creative offer.&nbsp;&nbsp;Don\'t have anything to offer?&nbsp;&nbsp;Heck, money works!');
							}else{
								$('#terteiryHouse').show();
								$('#terteiryHouse .thePostBaseMsg #postHint').html('Looks like this user is only interested in money for this particular offer.&nbsp;&nbsp;Best not to bug them with non-monetary offers.');
							}
							if(thePostingArrayParsed[1][0]){//in case the user has no needs
							for(r=0; r<secondaryPosts.length; r++){
							$('#secondaryHouse').append('<div class="boxGradient secondaryThePostBase"></div><!--secondaryThePostBase-->');
							sortPosting('secondary', secondaryPosts[r], secondaryPosts[r][22], '.secondaryThePostBase:eq('+r+')');//secondary posts
							}
							}else{
							$('.thirdListBase .reviews-greeting').html('This user has&nbsp;<div id="list-needTag">0&nbsp; need</div> postings.');	
							}
							
							
							console.log(secondaryPosts.length);
							//breadcrumbs
							getTitleAdjusted(chosenPost[12], chosenPost[13], 45, breadCrumbs, 'bc');
							sortPosting('primary',chosenPost, 'offer', '.primaryThePostBase');//primary post
						}
					}
					
					
					
				}else if(chosenOfferNeed=='Needed'){
					for(i=0; i<thePostingArrayParsed[1].length; i++){
						if(thePostingArrayParsed[1][i][16]==chosenPostingID){
							chosenPost = thePostingArrayParsed[1][i];//primary post
							secondaryPosts = thePostingArrayParsed[0];
							numOfOffers = thePostingArrayParsed[0].length;
							numOfNeeds= thePostingArrayParsed[1].length;
								$('#terteiryHouse').show();
								$('#terteiryHouse .thePostBaseMsg #postHint').html('Do you have what they need but don\'t need what they\'re offering?&nbsp;&nbsp;Contact them with what you\'re looking for, you might be suprised.');
							if(thePostingArrayParsed[0][0]){//in case the user has no offers
							for(r=0; r<thePostingArrayParsed[0].length; r++){
							$('#secondaryHouse').append('<div class="boxGradient secondaryThePostBase"></div><!--secondaryThePostBase-->');
							sortPosting('secondary', secondaryPosts[r], 'offer', '.secondaryThePostBase:eq('+r+')');//secondary posts
							}
							}else{
							$('.thirdListBase .reviews-greeting').html('This user has&nbsp;<div id="list-offerTag">0&nbsp; offer</div> postings.');	
							}
							
							//breadcrumbs
							getTitleAdjusted(chosenPost[12], chosenPost[13], 45, breadCrumbs, 'bc');
							sortPosting('primary',chosenPost, 'need', '.primaryThePostBase');//primary post
						}
					}
				
				}else{//no match on db
				    alertObject.alertBox('ALERT!', errorAlrt, 'ferror', errorReset, null, null); 
			   }
			
				
		   }else{//no match on db
			    alertObject.alertBox('ALERT!', errorAlrt, 'ferror', errorReset, null, null);
		   }
		   }else{//post does not exist
			 alertObject.alertBox('ALERT!', errorAlrt, 'ferror', errorReset, null, null);  
		   }
		}//success
	   });
}

//emailShare
var urli = null;
$('#postShare-layout #postShare-email').unbind('click').click(function(){
													 urli=location.href;
													  //adjusts offer title length on emailShare
														getTitleAdjusted(thePostingArrayParsed[11], thePostingArrayParsed[12], 65, emailAdjusted, 'offer');

													 });





$(document).ready(function(){
	$('#postReply-message #reply-message').val('');			   
});

	
$('#security_code').unbind('keypress').keypress(function(e){
								 if(e.which==13){
									submitBtnAction(); 
								 }
						   });

function submitBtnAction(){
	//verify the user
	var response = $('#recaptcha_response_field').val();
	var challenge = $('#recaptcha_challenge_field').val();
	
	 var message = $("#reply-message").val();
																															  
			if(message.length==0){
					alertObject.alertBox('ALERT!', emptyForm, 'alert', null, null, null);
			}else{//2
					if(response==''){//3
							alertObject.alertBox('ALERT!', emptyForm, 'alert', null, null, null);
					}else{//3
							$("#loginAlert").html('Sending reply, please wait... <img src="images/loaderSm.gif"/>');
																																		
							$('.postReplySecCode .submitBtn').hide();
							$('.postReplySecCode .startOverBtnBottom').hide();
							$('.postReplySecCode').hide();
																																					 
							message = message.replace(/\n/g,'  ');
							message = message.replace(/\r/g,'  ');
							
							genTimerObject.genTimer();//start the timeout timer
																																				
							$.ajax({
									type: "POST",
									url:'control/verifyUser.php',
									data: "type=advanced&user="+userName+"&pass="+passWord+"&ssSec="+ssSec+"&response="+response+"&challenge="+challenge+"",
									success: function(confirmi){
										clearTimeout(genericTimer);
											confirmi = $.trim(confirmi);																							
									if(confirmi!='X11' && confirmi!='X10'){
																																								
											ssSec = confirmi;//reset
											//if all checks out send reply
											genTimerObject.genTimer();//start the timeout timer
											var form = new Array();
											form = {'di':'postReply', 'i1':chosenPostingID, 's1':userName, 's2':message, 's3':ssSec, 's4':chosenOfferNeed, 's5':passWord}; 
											$.post('control/formValidate.php', {form:form}, function(replyConfirmation) {
												clearTimeout(genericTimer);																										
												var replyConfirm = $.trim(replyConfirmation);
												if(replyConfirm == '1'){//everything cleared and email was sent
														$('.postReplySecCode').hide();
														$('#postShare-layout').css({'height':'35px'});
														$('#postShare-layout .sectionHeaderFormat').css({'margin-left':'0px'});
														$('#postShare-layout .sectionHeaderFormat #header-title').html('<span style="color:#669900;">Thank you, your reply has been successfully sent!</span>').css({'margin-left': '300px'});
														$('.thePostBase').height($('.thePostBase').height()-330);
												}else if(replyConfirm == 'X10'){//either the email failed to send or the info access info sent was incorrect
														alertObject.alertBox('ALERT!', errorAlrt, 'ferror', reseter, null, null);
												}else if(replyConfirm == 'X12'){//either the email failed to send or the info access info sent was incorrect
														alertObject.alertBox('ALERT!', 'Our records show that you\'ve already contacted this user twice regarding this post.', 'ferror', reseter, null, null);
												}
																																								
											});//postreplyInput
																																		
									}else if(confirmi=='X11'){// sec code entered improperly
										alertObject.alertBox('ALERT!', codeAlrt, 'alert', null, null, null);
										$('.postReplySecCode .submitBtn').show();
										$('.postReplySecCode .startOverBtnBottom').show();
										$('.postReplySecCode').show();
										javascript:Recaptcha.reload();
									}else if(confirmi=='X10'){// username password error
										alertObject.alertBox('ALERT!', invalidUP, 'ferror', reseter, null, null);
										
									}
									
									},//verfifyUser success
							});//verifyUser

																																					
																																			 
			}//3
																																	
	}//2
																														
																														   
																				 	
}