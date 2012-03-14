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

<script>
$('#post-postForm').hide();
 var RecaptchaOptions = {
    theme : 'clean'
 };
</script>

<div class="boxBare thePostBase">

<div id="breadCrumbs"><? echo $breadCrumbs; ?></div><!--breadCrumbs-->

<div id="preloader"></div><!--preloader-->

<div class="boxBasic primaryThePostBase">
<div class="buttonWrap replyPostingBtn" style="margin-top: -55px; margin-left: 820px; float: left;">Reply To This Posting</div>
<div id="postShare">
<div id="postShare-shareMsg">Share this Posting</div>

<!--facebook-->
<div id='postShare-facebook'>

<script>function fbs_click() {u=location.href;t=document.title;window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(u)+'&t='+encodeURIComponent(t),'sharer','toolbar=0,status=0,width=626,height=436');return false;}</script>
	<a rel="nofollow" href="#" class="fb_share_button" onclick="return fbs_click()" target="_blank" style="text-decoration:none;"><img src='images/facebook.png'alt="Share on Facebook"  width="23" height="23" border="none"/></a>
</div>

<!--twitter-->
<div id='postShare-twitter'>
<script>function twitter_click() {u=location.href;t=document.title;window.open('https://twitter.com/share?u='+encodeURIComponent(u)+'&t='+encodeURIComponent(t),'sharer','toolbar=0,status=0,width=626,height=436');return false;}</script>
    <a href="https://twitter.com" class="twitter_share_button" onclick="return twitter_click()" target="_blank" style="text-decoration:none;"><img src='images/twitter.png' alt="Share on Twitter" width="23" height="23" border="none"/></a>
</div>
<!--email-->
<!--<div id='postShare-email'>
<img src='images/email.png'alt="Email this Posting"  height="30" border="none" style="text-decoration:none;"/>
</div>--><!--postShare-email-->
</div><!--postShare-->

</div><!--primaryThePostBase-->

<div id="postShare-layout">
<div class="sectionHeaderFormat" style="margin-top:15px; font-size: 1.1em; float:left; margin-left:400px; border-bottom: none;"><div id="header-title">Reply to this Posting!</div></div>

<script>$('.thePostBase .primaryThePostBase').hide();$('#postShare-layout').hide();var myImagePR = new Image;myImagePR.src = "images/preloader.gif";myImagePR.id = "preload";$('#preloader').append(myImagePR);</script>


<div id="postReply-form"></div><!--postReply-form-->


    <br/>
    
    <div class="boxBasic postReplySecCode">
    
    <span style="color:#900; font-size:0.8em;margin-left: 175px;">Please Note: Your email address will be attached to this message so that the user may contact you directly.</span> 
   
    <div id="postReply-message"><!--[if IE]>Compose your message here:<br/><![endif]--><TEXTAREA NAME="reply-message" id="reply-message" placeholder="Compose your message here" class="textarea" COLS=92 ROWS=6 maxlength="400" style="font-family:Arial, Helvetica, sans-serif; font-size:0.9em;"></TEXTAREA></div>
    <br/>
    
    <div id="post-captcha">
   
    <div class='secCodeRefresh' style="margin-left:350px;">Refresh Code</div>
 
	<? require_once('lib/recaptchalib.php');
       echo recaptcha_get_html($publickey);
	?>
    <div id="refreshCodeMsg">Having trouble reading the security code?&nbsp;&nbsp;Refresh it!</div>
    </div><!--post-captcha-->
    
    <div class='startOverBtnBottom' style="padding-right:150px; margin-top:65px;">Start Over</div>
    
    <div class='buttonWrap submitBtn'>Send Your Reply!</div>
    
    <div id="postReply-alert"></div>
    
    </div><!--postReplySecCode-->
    <br/>
</div><!--postShare-layout-->
<div class="boxBare thirdListBase" style="position:relative; margin-top:25px; font-weight:bold; font-size:0.9em;"><div id="reviews-greeting"></div></div>

<div id="secondaryHouse"></div>

<div id="terteiryHouse"><div class="boxGradient thePostBaseMsg"><div class="sectionHeaderFormat regBlueHeader sectionHeader2">ZooFaroo Helpful Hint:</div>  <div id="postHint"></div></div></div>
<script>$('#terteiryHouse').hide();</script>


</div><!--thePostBase-->



</div><!--secondBase(header)-->
</div><!--mainBase(header)-->



<script>
chosenPage = '<? echo $p; ?>';
chosenState = '<? echo $state; ?>';
chosenCity = '<? echo $city; ?>';
chosenCategory = '<? echo $category; ?>';
chosenOfferNeed = '<? echo $offerNeed; ?>';
chosenPostingID = '<? echo $postingID; ?>';
chosenRegionName = '<? echo $regionName; ?>';

var BreadCrumbTitle = '<? echo $offerNeed; ?>';
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
					$('.thirdListBase #reviews-greeting').html(''+userLink+'&nbsp;has&nbsp;<div id="list-'+kind+'Tag">'+numOfSecondaries+'&nbsp; '+kind+'</div> postings.').css({'font-size':'inherit'});
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
var numOfSecondaries = null;
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
							secondaryPosts = thePostingArrayParsed[1];
							numOfSecondaries = thePostingArrayParsed[1].length;
							if(thePostingArrayParsed[0][i][14]=='1'){
								$('#terteiryHouse').show();
								$('#terteiryHouse .thePostBaseMsg #postHint').html('Don\'t be afraid to contact this user with your own creative offer.&nbsp;&nbsp;Don\'t have anything to offer?&nbsp;&nbsp;Heck, money works!');
							}else{
								$('#terteiryHouse').show();
								$('#terteiryHouse .thePostBaseMsg #postHint').html('Looks like this user is only interested in money for this particular offer.&nbsp;&nbsp;Best not to bug them with non-monetary offers.');
							}
							if(thePostingArrayParsed[1][0]){//in case the user has no needs
							for(r=0; r<thePostingArrayParsed[1].length; r++){
							$('#secondaryHouse').append('<div class="boxGradient secondaryThePostBase"></div><!--secondaryThePostBase-->');
							sortPosting('secondary', secondaryPosts[r], 'need', '.secondaryThePostBase:eq('+r+')');//secondary posts
							}
							}else{
							$('.thirdListBase #reviews-greeting').html('This user has&nbsp;<div id="list-needTag">0&nbsp; need</div> postings.');	
							}
							
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
							numOfSecondaries = thePostingArrayParsed[0].length;
								$('#terteiryHouse').show();
								$('#terteiryHouse .thePostBaseMsg #postHint').html('Do you have what they need but don\'t need what they\'re offering?&nbsp;&nbsp;Contact them with what you\'re looking for, you might be suprised.');
							if(thePostingArrayParsed[0][0]){//in case the user has no offers
							for(r=0; r<thePostingArrayParsed[0].length; r++){
							$('#secondaryHouse').append('<div class="boxGradient secondaryThePostBase"></div><!--secondaryThePostBase-->');
							sortPosting('secondary', secondaryPosts[r], 'offer', '.secondaryThePostBase:eq('+r+')');//secondary posts
							}
							}else{
							$('.thirdListBase #reviews-greeting').html('This user has&nbsp;<div id="list-offerTag">0&nbsp; offer</div> postings.');	
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
</script>