var listArrayParsed = new Array();
var postListArrayParsed = new Array();
var userEditInfoArray = new Array();
var theListArray = new Array();
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
var offerPostCount = null;
var needPostCount = null;
var totalPostCount = null;
var postCount=0;
var listDisplayOfferNeed = null;

//calls to fill the list
function populateList(theFirstArray, theSecondArray, kind){
			
				listDisplayOfferNeed = $.trim(kind);
				if(listDisplayOfferNeed=='Needed'){theFirstArray=theSecondArray};//if offers is empty then default to the needs
				 for(j=listStart; j<listFinish; j++){
					var year = theFirstArray[j][3].substring(0,4);
					var month = theFirstArray[j][3].substring(5,7);
					var day = theFirstArray[j][3].substring(8);
					
					var dateAdjusted = ''+month+'-'+day+'-'+year+'';
					
					var postLocaleLinkPkg = '<div id="headerFooter-city">Post Location:&nbsp;'+theFirstArray[j][17]+'&nbsp;&nbsp;(<a href="'+theFirstArray[j][7]+'/'+theFirstArray[j][5]+'.html">'+theFirstArray[j][5].replace(/__/g, '/').replace(/_/g, ' ')+'</a></div><div id="headerFooter-state">&nbsp;,&nbsp;<a href="'+theFirstArray[j][7]+'.html">'+theFirstArray[j][7].replace(/__/g, '/').replace(/_/g, ' ')+'</a></div>)';
					
				
					 if(theFirstArray[j][18][0]!='0'){
						 userRatingCount = theFirstArray[j][18][0];
			 	 		 userRatingPercent = "<span style='color:#669900;'>"+theFirstArray[j][18][1]+"%</span>";
						 userBusiness = theFirstArray[j][18][2];
					 }else{
						userRatingCount = '0'; 
						userRatingPercent = "";
					 }
					
					userLink = '<a href="user/'+theFirstArray[j][1]+'.html" style="text-decoration:none"><div class="buttonWrap reviewLink">'+theFirstArray[j][1]+'('+userRatingCount+')&nbsp;<b>'+userRatingPercent+'</b></div></a>';
					
					var postUserLinkPkg = '<div id="list-Username" name="'+theFirstArray[j][1]+'"><span style="float:left;">Posted by:&nbsp;</span>'+userLink+'</div>';
					
					var hasPhoto='';
					if(theFirstArray[j][8]!='1' && listDisplayOfferNeed!='Needed'){
						hasPhoto = '&nbsp;&nbsp;<img src="images/photo.png" alt="This posting has a photo" title="This posting has a photo"/>';
					}else{
						hasPhoto = '';
					}
					
					if(theFirstArray[j][8]!='1' && listDisplayOfferNeed!='Needed'){
						$('.secondListBase .listPost:eq('+j+') #list-offerTitle #list-offerLink #hasPic').unbind('click').click(function(){
						alertObject.alertBox('THIS POST HAS A PHOTO', hasPhotoGraph, 'alert', null, null, null);																		 
																				});
					}
					
					
				   if(listDisplayOfferNeed == 'Offered'){
					   var remainingOffers = theFirstArray[j][20]-1;
						var primarySection = "<div id='list-offerTitle'><div id='list-offerIcon'><div id='list-offerTag'>offered</div></div><div id='list-offerLink'>&nbsp;&#187;&nbsp;<div id='titleCategory'>"+theFirstArray[j][12].replace(/_/g, ' ')+"</div>&nbsp;&#187;&nbsp;<a href='"+theFirstArray[j][7]+"/"+theFirstArray[j][5]+"/"+listDisplayOfferNeed+"/"+theFirstArray[j][12].replace(/ /g, '_')+"/"+theFirstArray[j][15]+".html'> <div id='offerTitle'>"+theFirstArray[j][13]+"</div></a><div id='hasPic'>"+hasPhoto+"</div></div></div>";
						if(theFirstArray[j][1]!=userName||chosenPage=='postList'||chosenPage=='search'||chosenPage=='searchAdvanced'){//not logged in
							if(chosenPage!='user'){
								var secondarySection = "<div id='list-needTitle'  style='font-size: 0.85em; float: right; padding-right: 10px;'>"+userLink+"&nbsp;also&nbsp;has&nbsp;<div id='list-needIcon'><div id='list-needTag'>"+theFirstArray[j][21]+"&nbsp;needs</div></div>&nbsp;and&nbsp;<div id='list-offerIcon'><div id='list-offerTag'>"+remainingOffers+"&nbsp;more&nbsp;offers</div></div></div>";
								$('.secondListBase').append('<div class="boxGradient listPostListPg listPost"><div class="sectionHeaderFormat ltGrayHeader sectionHeader1"><div class="buttonWrap abuseReport" aux="'+theFirstArray[j][15]+'">!</div>'+postUserLinkPkg+'<div id="list-Date">Posted on:&nbsp;&nbsp;'+dateAdjusted+'</div>'+postLocaleLinkPkg+'</div>'+primarySection+''+secondarySection+'</div><br/>');
							}else if(chosenPage=='user'){
								var secondarySection = "";	
								$('.secondListBase').append('<div class="boxGradient listPost"><div class="sectionHeaderFormat ltGrayHeader sectionHeader1"><div class="buttonWrap abuseReport" aux="'+theFirstArray[j][15]+'">!</div>'+postUserLinkPkg+'<div id="list-Date">Posted on:&nbsp;&nbsp;'+dateAdjusted+'</div>'+postLocaleLinkPkg+'</div>'+primarySection+''+secondarySection+'</div><br/>');
							}
						}else if(theFirstArray[j][1]==userName&&passWord!=null&&chosenPage!='postList'&&chosenPage!='search'&&chosenPage!='searchAdvanced'){//logged in
							var secondarySection = "";
							$('.secondListBase').append('<div class="boxGradient listPost"><div class="sectionHeaderFormat ltGrayHeader sectionHeader1">'+postUserLinkPkg+'<div id="list-Date">Posted on:&nbsp;&nbsp;'+dateAdjusted+'</div>'+postLocaleLinkPkg+'<div class="buttonWrap deletePostColor list-deletePost" postID="'+theFirstArray[j][15]+'" aux="'+j+'" type="offer" style="margin-top:-4px; font-weight:normal;">delete</div><div class="buttonWrap editPostColor list-editPost" postID="'+theFirstArray[j][15]+'" aux="'+j+'" type="offer" style="margin-top:-4px; font-weight:normal;">edit</div></div>'+primarySection+''+secondarySection+'</div><br/>');
						}
				   }else if(listDisplayOfferNeed == 'Needed'){
					   var remainingNeeds = theFirstArray[j][21]-1;
						var primarySection = "<div id='list-needTitle'><div id='list-needIcon'><div id='list-needTag'>needed</div></div><div id='list-needLink'>&nbsp;&#187;&nbsp;<div id='titleCategory'>"+theFirstArray[j][12].replace(/_/g, ' ')+"</div>&nbsp;&#187;&nbsp;<a href='"+theFirstArray[j][7]+"/"+theFirstArray[j][5]+"/"+listDisplayOfferNeed+"/"+theFirstArray[j][12].replace(/ /g, '_')+"/"+theFirstArray[j][15]+".html'> <div id='needTitle'>"+theFirstArray[j][13]+"</div></a></div><div id='hasPic'>"+hasPhoto+"</div></div>";
						if(theFirstArray[j][1]!=userName||chosenPage=='postList'||chosenPage=='search'||chosenPage=='searchAdvanced'){//not logged in
							if(chosenPage!='user'){
								var secondarySection = "<div id='list-offerTitle' style='font-size: 0.85em; float: right; padding-right: 10px;'>"+userLink+"&nbsp;has&nbsp;<div id='list-offerIcon'><div id='list-offerTag'>"+theFirstArray[j][20]+"&nbsp;offers</div></div>&nbsp;and&nbsp;<div id='list-needIcon'><div id='list-needTag'>"+remainingNeeds+"&nbsp;more&nbsp;needs</div></div></div>";
								$('.secondListBase').append('<div class="boxGradient listPostListPg listPost"><div class="sectionHeaderFormat ltGrayHeader sectionHeader1"><div class="buttonWrap abuseReport" aux="'+theFirstArray[j][15]+'">!</div>'+postUserLinkPkg+'<div id="list-Date">Posted on:&nbsp;&nbsp;'+dateAdjusted+'</div>'+postLocaleLinkPkg+'</div>'+primarySection+''+secondarySection+'</div><br/>');
							}else if(chosenPage=='user'){
								var secondarySection = "";
								$('.secondListBase').append('<div class="boxGradient listPost"><div class="sectionHeaderFormat ltGrayHeader sectionHeader1"><div class="buttonWrap abuseReport" aux="'+theFirstArray[j][15]+'">!</div>'+postUserLinkPkg+'<div id="list-Date">Posted on:&nbsp;&nbsp;'+dateAdjusted+'</div>'+postLocaleLinkPkg+'</div>'+primarySection+''+secondarySection+'</div><br/>');
							}
				   		}else if(theFirstArray[j][1]==userName&&passWord!=null&&chosenPage!='postList'&&chosenPage!='search'&&chosenPage!='searchAdvanced'){//logged in
						var secondarySection = "";
						$('.secondListBase').append('<div class="boxGradient listPost"><div class="sectionHeaderFormat ltGrayHeader sectionHeader1">'+postUserLinkPkg+'<div id="list-Date">Posted on:&nbsp;&nbsp;'+dateAdjusted+'</div>'+postLocaleLinkPkg+'<div class="buttonWrap deletePostColor list-deletePost" postID="'+theFirstArray[j][15]+'" aux="'+j+'" type="need" style="margin-top:-4px; font-weight:normal;">delete</div><div class="buttonWrap editPostColor list-editPost" postID="'+theFirstArray[j][15]+'" aux="'+j+'" type="need" style="margin-top:-4px; font-weight:normal;">edit</div></div>'+primarySection+''+secondarySection+'</div><br/>');
						 
						}
				   }
				   
				   if(theFirstArray[j][5]==theFirstArray[j][7]){//city and state are the same as in Maine/Maine for states that only have one section
					//hide the state in the header
					$('.secondListBase .listPost .sectionHeader1 #headerFooter-state').hide();
					}
				   
					
					mOfferObject.mOffer(theFirstArray, j, listDisplayOfferNeed);
					
					if(theFirstArray[j][8]!='1' && listDisplayOfferNeed!='Needed'){
						var jPlus = j;
						$('.secondListBase .listPost:eq('+jPlus+') #list-offerTitle #list-offerLink #hasPic').unbind('click').click(function(){
						alertObject.alertBox('THIS POST HAS A PHOTO', hasPhotoGraph, 'alert', null, null, null);																		 
																								 });
					}
					
					//user name link alt info
					$('.secondListBase .listPost:eq('+j+') .reviewLink').attr({ title: "Check out "+theFirstArray[j][1]+"'s User Page", alt:"Check out "+theFirstArray[j][1]+"'s User Page"});
					
					var editBtnsPosi = $('.secondListBase .listPost').length-1;
					if(theFirstArray[j][1]==userName&&passWord!=null&&$('.secondListBase .listPost:eq('+editBtnsPosi+') .list-editPost').is(":visible")&&$('.secondListBase .listPost:eq('+editBtnsPosi+') .list-deletePost').is(":visible")){//this doesn't need to check the page but rather if the user is logged in and these are his/her posts
						//EDIT BUTTONS
								$('.secondListBase .listPost:eq('+editBtnsPosi+') .list-editPost').unbind('click').click(function(){editObject.editBox($(this).attr('type'), $('.secondListBase .listPost').length-1, $(this).attr('postID'), $(this).attr('aux'), 'editPost');});
								   $('.secondListBase .listPost:eq('+editBtnsPosi+') .list-deletePost').unbind('click').click(function(){								
											editObject.editBox($(this).attr('type'), $('.secondListBase .listPost').length-1, $(this).attr('postID'), 'delete', 'editPost');
									});
					}else{
						
					//abuse buttons
					 $('.secondListBase .listPost:eq('+j+') .abuseReport').unbind('click').click(function(){
							var thisOne = $(this).attr('aux');
							alertObject.alertBox('ALERT!', reportConfirm, 'decision', sendReport, thisOne, listDisplayOfferNeed);
					 });
					 
					 $('.secondListBase .listPost:eq('+j+') .abuseReport').attr({ 
						title: pOffense,
						alt: reportA
					});
			
					} 
					 
					 ///if REVIEWS/EDIT/USER/THE POST PAGE
					 if(j==listFinish-1 && (chosenPage=='user' || chosenPage=='edit' || chosenPage=='thePost')){
						 if(listDisplayOfferNeed!='Needed' && needPostCount!='0'){
							 pageCount = 1;
							 listTicker = 0;
							 postCount = needPostCount;
							 listFinish = postCount;
							 theFirstArray = theSecondArray
							 populateList(theFirstArray, theSecondArray, 'Needed');
						 }
						 if(chosenPage=='thePost'){
							$('#review-postings-greeting').html(''+userLink+'&nbsp;also&nbsp;has&nbsp;<div id="list-offerTag">'+offerPostCount+'&nbsp;other&nbsp;offer</div> postings and <div id="list-needTag">'+needPostCount+'&nbsp;other&nbsp;need</div> postings.').css({'font-size':'inherit'});
						 }else{
							$('#review-postings-greeting').html('<div class="boxGradient editUserPgDivider listPost">A total of&nbsp;<span style="color:#3366cc">'+totalPostCount+'</span>&nbsp;posting(s) found under username:&nbsp;<span style="color:#3366cc">'+greetingUserName+'</span></div>');
						 }
					 }
					 
					 //if SEARCH PAGE
					  if(j==listFinish-1 && (chosenPage=='search'||chosenPage=='searchAdvanced')){
						  
						 if(listDisplayOfferNeed!='Needed' && needPostCount!='0'){
							 listTicker = 0;
							 postCount = needPostCount;
							 listFinish = needPostCount;
							 theFirstArray = theSecondArray
							 populateList(theFirstArray, theSecondArray, 'Needed');
						 }
					 }
					
					
					//pagination only for list page
					//do not display page numbers if there is only one page
						if(pageCount!=1&&j==listFinish-1){
							
							$('.secondListBase').css({'padding-bottom':'20px'}).append('<div id="list-pageCount"></div>');
							//position page number buttons
							pgBtnPosition = 495-((pageCount/2)*30)+'px';
							//$('#list-pageCount').empty();
							//display page numbers
							for(r=pageCount; r>0; r--){
								//highlight the selected page number
								if(selectPage==r){
									$('.secondListBase #list-pageCount').css({'margin-left':pgBtnPosition, 'margin-top':'-15px'}).append('<div class="buttonWrap" name="'+r+'" style="margin-right:10px; background:#336699; color:#FFF;">'+r+'</div>');
								}else{
									$('.secondListBase #list-pageCount').css({'margin-left':pgBtnPosition, 'margin-top':'-15px'}).append('<div class="buttonWrap" name="'+r+'" style="margin-right:10px;">'+r+'</div>');
								}
							}
							
							
							//give page numbers actions
							$('.secondListBase #list-pageCount .buttonWrap').unbind('click').click(function(){
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
									populateList(theFirstArray, listDisplayOfferNeed);
									
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