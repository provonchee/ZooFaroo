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
					
					var postLocaleLinkPkg = '<div id="headerFooter-city">Post Location:&nbsp;'+uniqueArrayParsed[j][17]+'&nbsp;&nbsp;(<a href="'+uniqueArrayParsed[j][7]+'/'+uniqueArrayParsed[j][5]+'.html">'+uniqueArrayParsed[j][5].replace(/__/g, '/').replace(/_/g, ' ')+'</a></div><div id="headerFooter-state">&nbsp;,&nbsp;<a href="'+uniqueArrayParsed[j][7]+'.html">'+uniqueArrayParsed[j][7].replace(/__/g, '/').replace(/_/g, ' ')+'</a></div>)';
					
				
					 if(uniqueArrayParsed[j][18][0]!='0'){
						 userRatingCount = uniqueArrayParsed[j][18][0];
			 	 		 userRatingPercent = "<span style='color:#669900;'>"+uniqueArrayParsed[j][18][1]+"%</span>";
						 userBusiness = uniqueArrayParsed[j][18][2];
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
						var primarySection = "<div id='list-offerTitle'><div id='list-offerIcon'><div id='list-offerTag'>offered</div></div><div id='list-offerLink'>&nbsp;&#187;&nbsp;<div id='titleCategory'>"+uniqueArrayParsed[j][12].replace(/_/g, ' ')+"</div>&nbsp;&#187;&nbsp;<a href='"+uniqueArrayParsed[j][7]+"/"+uniqueArrayParsed[j][5]+"/"+chosenOfferNeed+"/"+uniqueArrayParsed[j][12].replace(/ /g, '_')+"/"+uniqueArrayParsed[j][15]+".html'> <div id='offerTitle'>"+uniqueArrayParsed[j][13]+"</div></a><div id='hasPic'>"+hasPhoto+"</div></div></div>";
						if(uniqueArrayParsed[j][1]!=userName||chosenPage=='postList'){//not logged in
							if(chosenPage!='user'){
								var secondarySection = "<div id='list-needTitle'  style='font-size: 0.85em; float: right; padding-right: 10px;'>"+userLink+"&nbsp;also&nbsp;has&nbsp;<div id='list-needIcon'><div id='list-needTag'>"+uniqueArrayParsed[j][21]+"&nbsp;needs</div></div>&nbsp;and&nbsp;<div id='list-offerIcon'><div id='list-offerTag'>"+uniqueArrayParsed[j][20]+"&nbsp;more&nbsp;offers</div></div></div></div>";
								$('.secondListBase').append('<div class="boxGradient listPostListPg listPost"><div class="sectionHeaderFormat ltGrayHeader sectionHeader1"><div class="buttonWrap abuseReport" aux="'+uniqueArrayParsed[j][15]+'">!</div>'+postUserLinkPkg+'<div id="list-Date">Posted on:&nbsp;&nbsp;'+dateAdjusted+'</div>'+postLocaleLinkPkg+'</div>'+primarySection+''+secondarySection+'</div><br/>');
							}else if(chosenPage=='user'){
								var secondarySection = "";	
								$('.secondListBase').append('<div class="boxGradient listPost"><div class="sectionHeaderFormat ltGrayHeader sectionHeader1"><div class="buttonWrap abuseReport" aux="'+uniqueArrayParsed[j][15]+'">!</div>'+postUserLinkPkg+'<div id="list-Date">Posted on:&nbsp;&nbsp;'+dateAdjusted+'</div>'+postLocaleLinkPkg+'</div>'+primarySection+''+secondarySection+'</div><br/>');
							}
						}else if(uniqueArrayParsed[j][1]==userName&&passWord!=null){//logged in
							var secondarySection = "";
							$('.secondListBase').append('<div class="boxGradient listPost"><div class="sectionHeaderFormat ltGrayHeader sectionHeader1">'+postUserLinkPkg+'<div id="list-Date">Posted on:&nbsp;&nbsp;'+dateAdjusted+'</div>'+postLocaleLinkPkg+'<div class="buttonWrap deletePostColor list-deletePost" postID="'+uniqueArrayParsed[j][15]+'" aux="'+j+'" type="offer" style="margin-top:-4px; font-weight:normal;">delete</div><div class="buttonWrap editPostColor list-editPost" postID="'+uniqueArrayParsed[j][15]+'" aux="'+j+'" type="offer" style="margin-top:-4px; font-weight:normal;">edit</div></div>'+primarySection+''+secondarySection+'</div><br/>');
						}
				   }else if(chosenOfferNeed == 'Needed'){
						var primarySection = "<div id='list-needTitle'><div id='list-needIcon'><div id='list-needTag'>needed</div></div><div id='list-needLink'>&nbsp;&#187;&nbsp;<div id='titleCategory'>"+uniqueArrayParsed[j][12].replace(/_/g, ' ')+"</div>&nbsp;&#187;&nbsp;<a href='"+uniqueArrayParsed[j][7]+"/"+uniqueArrayParsed[j][5]+"/"+chosenOfferNeed+"/"+uniqueArrayParsed[j][12].replace(/ /g, '_')+"/"+uniqueArrayParsed[j][15]+".html'> <div id='needTitle'>"+uniqueArrayParsed[j][13]+"</div></a></div><div id='hasPic'>"+hasPhoto+"</div></div>";
						if(uniqueArrayParsed[j][1]!=userName||chosenPage=='postList'){//not logged in
							if(chosenPage!='user'){
								var secondarySection = "<div id='list-offerTitle' style='font-size: 0.85em; float: right; padding-right: 10px;'>"+userLink+"&nbsp;has&nbsp;<div id='list-offerIcon'><div id='list-offerTag'>"+uniqueArrayParsed[j][20]+"&nbsp;offers</div></div>&nbsp;and&nbsp;<div id='list-needIcon'><div id='list-needTag'>"+uniqueArrayParsed[j][21]+"&nbsp;more&nbsp;needs</div></div></div>";
								$('.secondListBase').append('<div class="boxGradient listPostListPg listPost"><div class="sectionHeaderFormat ltGrayHeader sectionHeader1"><div class="buttonWrap abuseReport" aux="'+uniqueArrayParsed[j][15]+'">!</div>'+postUserLinkPkg+'<div id="list-Date">Posted on:&nbsp;&nbsp;'+dateAdjusted+'</div>'+postLocaleLinkPkg+'</div>'+primarySection+''+secondarySection+'</div><br/>');
							}else if(chosenPage=='user'){
								var secondarySection = "";
								$('.secondListBase').append('<div class="boxGradient listPost"><div class="sectionHeaderFormat ltGrayHeader sectionHeader1"><div class="buttonWrap abuseReport" aux="'+uniqueArrayParsed[j][15]+'">!</div>'+postUserLinkPkg+'<div id="list-Date">Posted on:&nbsp;&nbsp;'+dateAdjusted+'</div>'+postLocaleLinkPkg+'</div>'+primarySection+''+secondarySection+'</div><br/>');
							}
				   		}else if(uniqueArrayParsed[j][1]==userName&&passWord!=null){//logged in
						var secondarySection = "";
						$('.secondListBase').append('<div class="boxGradient listPost"><div class="sectionHeaderFormat ltGrayHeader sectionHeader1">'+postUserLinkPkg+'<div id="list-Date">Posted on:&nbsp;&nbsp;'+dateAdjusted+'</div>'+postLocaleLinkPkg+'<div class="buttonWrap deletePostColor list-deletePost" postID="'+uniqueArrayParsed[j][15]+'" aux="'+j+'" type="need" style="margin-top:-4px; font-weight:normal;">delete</div><div class="buttonWrap editPostColor list-editPost" postID="'+uniqueArrayParsed[j][15]+'" aux="'+j+'" type="need" style="margin-top:-4px; font-weight:normal;">edit</div></div>'+primarySection+''+secondarySection+'</div><br/>');
						 
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
					
					
					if(uniqueArrayParsed[j][1]==userName&&passWord!=null){//this doesn't need to check the page but rather if the user is logged in and these are his/her posts
						//EDIT BUTTONS
						var editBtnsPosi = $('.secondListBase .listPost').length-1;
								$('.secondListBase .listPost:eq('+editBtnsPosi+') .list-editPost').unbind('click').click(function(){editObject.editBox($(this).attr('type'), editBtnsPosi, $(this).attr('postID'), $(this).attr('aux'), 'editPost');});
								   $('.secondListBase .listPost:eq('+editBtnsPosi+') .list-deletePost').unbind('click').click(function(){								
											editObject.editBox($(this).attr('type'), editBtnsPosi, $(this).attr('postID'), 'delete', 'editPost');
									});
					}else{
					//abuse buttons
					 $('.secondListBase .listPost:eq('+j+') .abuseReport').unbind('click').click(function(){
							var thisOne = $(this).attr('aux');
							alertObject.alertBox('ALERT!', reportConfirm, 'decision', sendReport, thisOne, chosenOfferNeed);
					 });
					 
					 $('.secondListBase .listPost:eq('+j+') .abuseReport').attr({ 
						title: pOffense,
						alt: reportA
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
					 
					$('.secondListBase').fadeIn('slow');
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