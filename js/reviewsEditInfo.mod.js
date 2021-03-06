var categoriesArray = new Array();
var categoriesArrayAlt = new Array();
var goodsCategoryID = new Array();
var servicesCategoryID = new Array();
var stateArrayCall=null;
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
var offerNeed = null;
var whichSubList=null;
var greetingUserName=null;


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



//fetch categories
fetchCategoryObject.fetchCategoryArray();
	
//put cats into a usable array---called from fetchCategoryArray
function displayCategories(parsedCategories){
	categoriesArray = parsedCategories;
}//display categories

$.ajax({
			type:'POST',
			url:'control/pageQuery.php',
			data:'page=edit&userID='+chosenUser+'',
			success: function(editList){
            
            if(editList!='X10'){
			userEditInfoArray = jQuery.parseJSON(editList);
      		
			$('#preloader').fadeOut('fast', function(){$('#preloader').remove();});
            
            //clear posts and reviews just in case this is a refresh(from edit page) we don't want the new to get tacked on to the old
                	$('.secondListBase').empty().html('<div id="review-postings-greeting"></div>');
                	$('.thirdListBase').empty().html('<div class="reviews-greeting"></div>');
            
			switch(userEditInfoArray[0][0]){
				
				case 'X10':
				alertObject.alertBox('ALERT!', errorAlrt, 'ferror', reseter, null, null);
				break;
				
				default:
				editID = userEditInfoArray[2][0];
				greetingUserName = userEditInfoArray[2][1];
				editUname = '<div id="list-accountDetail">Username:&nbsp;<div id="listContent">'+greetingUserName+'</div>';
				editEmail = userEditInfoArray[2][2];
				editPSO = userEditInfoArray[2][3];
				editCity = userEditInfoArray[2][4];
				editState = userEditInfoArray[2][5];
				editBus = userEditInfoArray[2][6];
				editFB = userEditInfoArray[2][7];
				editFBTxt = (editFB ? "http://www.facebook.com/"+editFB : '');
				editFB = (editFB ? editFB : '');
				editTW = userEditInfoArray[2][8];
				editTWTxt = (editTW ? "http://www.twitter.com/"+editTW : '');
				editTW = (editTW ? editTW : '');
				editGP = userEditInfoArray[2][9];
				editGPTxt = (editGP ? "https://plus.google.com/"+editGP : '');
				editGP = (editGP ? editGP : '');
				editLI = userEditInfoArray[2][10];
				editLITxt = (editLI ? "http://www.linkedin.com/"+editLI : '');
				editLI = (editLI ? editLI : '');
				editURL = userEditInfoArray[2][11];
				editURL = (editURL ? editURL : '');
				editURLSuf = (editURL ? userEditInfoArray[2][12] : '');
				editURLTxt = (editURL ? "http://www."+editURL+editURLSuf : '');
               
                if(userEditInfoArray[2][13]!=null){
					editBusName = userEditInfoArray[2][13];
                }else{
               	 	editBusName = '';
                }

				//get state name				
				stateArrayCall = setInterval("checkStateStatus(fetchStateObject.fetchStateArray('default'))", 500);
				
				//set business to 'yes' or 'no'
				if(editBus=='1'){
					editBusTxt='No';
				}else if(editBus=='2'){
					editBusTxt='Yes';
				}
				
				if(chosenPage!='edit'){//hide ps and email
					editPSO = '**********';
					editEmail = '**********';
				}
				
				userEditInfoArray[2]=null;
			
				var business = '<img src="images/businessFollow.png" height="25" alt="I am a business" style="border:none;"/>&nbsp;&nbsp;Business:&nbsp;<div id="listContent">'+editBusTxt+'</div>&nbsp;&nbsp;&nbsp;Business Name:&nbsp;<div id="listContent">'+editBusName+'</div>';
				var fb = '<img src="images/facebookFollow.png" height="25" alt="Find us on Facebook!" style="border:none;"/>&nbsp;&nbsp;Facebook:&nbsp;<div id="listContent"><a href="'+editFBTxt+'"target="_blank">'+editFBTxt+'</a></div>';
				var tw = '<img src="images/twitterFollow.png" height="25" alt="Follow us on Twitter!" style="border:none;"/>&nbsp;&nbsp;Twitter:&nbsp;<div id="listContent"><a href="'+editTWTxt+'"target="_blank">'+editTWTxt+'</a></div>';
				var gp = '<img src="images/googlePlusFollow.png" height="25" alt="Follow us on Google Plus!" style="border:none;"/>&nbsp;&nbsp;Google Plus:&nbsp;<div id="listContent"><a href="'+editGPTxt+'"target="_blank">'+editGPTxt+'</a></div>';
				var ln = '<img src="images/linkedinFollow.png" height="25" alt="Check us out on LinkedIn!" style="border:none;"/>&nbsp;&nbsp;LinkedIn:&nbsp;<div id="listContent"><a href="'+editLITxt+'"target="_blank">'+editLITxt+'</a></div>';
				var web = '<img src="images/websiteFollow.png" height="25" alt="My own website" style="border:none;"/>&nbsp;&nbsp;Website:&nbsp;<div id="listContent"><a href="'+editURLTxt+'"target="_blank">'+editURLTxt+'</a></div>';
				
				
				$('.firstListBase').html('<div class="reviews-greeting"></div><div class="list-accountInfo"><div id="list-accountDetail">Username:&nbsp;<div id="listContent">'+greetingUserName+'</div></div><div id="list-accountDetail">Password:&nbsp;<div id="listContent">*******</div></div><div id="list-accountDetail">Email:&nbsp;<div id="listContent">'+editEmail+'</div></div><div id="list-accountDetail">City/Town:&nbsp;<div id="listContent">'+editCity+'</div></div><div id="list-accountDetail">State:&nbsp;<div id="listContent">Loading...</div></div></div><div class="boxBare list-accountInfo"><div id="list-accountDetail"><u>Optional Information</u></div><div id="list-accountDetail">'+business+'</div><div id="list-accountDetail">'+fb+'</div><div id="list-accountDetail">'+tw+'</div><div id="list-accountDetail">'+gp+'</div><div id="list-accountDetail">'+ln+'</div><div id="list-accountDetail">'+web+'</div></div><div class="buttonWrap deletePostColor list-deletePost" style="margin-right:10px;">delete account</div><div class="buttonWrap editPostColor list-editPost">edit</div></div>');
					//USER ACCOUNT EDIT/DELETE CONTROLS
                    $('.list-editPost:eq(0)').unbind('click').click(function(){editObject.editBox('account', editssSec, null, 'edit', 'editAccount');});
                            $('.list-deletePost:eq(0)').unbind('click').click(function(){editObject.editBox('account', editssSec, null, 'delete', 'editAccount');});
                            if(chosenPage!='edit'){
                                //hide edit delete btns
                                  $('.list-editPost:eq(0)').remove();
                                    $('.list-deletePost:eq(0)').remove();
                            }
				$('.firstListBase').fadeIn('fast');
				
				
				sortListObject.sortListDisplay(userEditInfoArray[0],userEditInfoArray[1],greetingUserName);
				
			//////REVIEWS
              $(".firstListBase .reviews-greeting").html('<div class="boxGradient editUserPgDivider listPost">ZooFaroo User Information for:&nbsp;<span style="color:#3366cc">'+greetingUserName+'</span></div>');
			if(userEditInfoArray[3][0][0]!='X10'){
				$(".thirdListBase .reviews-greeting").html('<div class="boxGradient editUserPgDivider listPost">User Ratings for:&nbsp;<span style="color:#3366cc">'+userEditInfoArray[3][0][0]+'</span> &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#3366cc">'+userEditInfoArray[3][0][10]+'</span>&nbsp;rating(s) &nbsp;&nbsp;&nbsp;'+userEditInfoArray[3][0][12]+'%&nbsp;<img src="images/plus.png" style="vertical-align:sub;"/>&nbsp;&nbsp;&nbsp;&nbsp;'+userEditInfoArray[3][0][13]+'%&nbsp;<img src="images/minus.png" style="vertical-align:sub;"/></h2></div>');
                var rw=0;
				reviews = userEditInfoArray[3];
                reviewCount = userEditInfoArray[3][0][4][3];
				ratingCount = userEditInfoArray[3][0][10];
				for(rw=0; rw<ratingCount; rw++){
                                
                        if(reviews[rw][8]=='2'){
                            reviews[rw][8]='<div id="reviews-recommended"><img src="images/plus.png"/></div>';
                        }else if(reviews[rw][8]=='1'){
                            reviews[rw][8]='<div id="reviews-recommended"><img src="images/minus.png"/></div>';
                        }
                        var year = reviews[rw][5].substring(0,4);
                        var month = reviews[rw][5].substring(5,7);
                        var day = reviews[rw][5].substring(8);
                        var dateAdjusted = ''+month+'-'+day+'-'+year+'';
                        
                        if(reviews[rw][4][0]!='0'){
					
							var reviewerRatingCount = reviews[rw][4][0];
					
							var reviewerRatingPercent = "<span style='color:#669900;'>"+reviews[rw][4][1]+"%</span>";																																																											
                        }else{
                        	var reviewerRatingCount = '0';
					
							var reviewerRatingPercent = "";	
                        }
                        
                        $('.thirdListBase').append('<div class="boxGradient listPost"><div class="sectionHeaderFormat ltGrayHeader sectionHeader1" style="text-align:left; padding-left:10px;"><div id="list-Username"><span style="float:left;">Rated by:&nbsp;&nbsp;</span><a href="user/'+reviews[rw][2]+'.html" style="text-decoration:none"><div class="buttonWrap reviewLink">'+reviews[rw][2]+'&nbsp;('+reviewerRatingCount+')&nbsp;<b>'+reviewerRatingPercent+'</b></div></a></div><div id="list-Date">Rated on:&nbsp;&nbsp;'+dateAdjusted+'</div><div class="buttonWrap abuseReport" aux="'+reviews[rw][9]+'">!</div></div><div id="reviews-reviewTitle"><b>'+reviews[rw][6]+'</b></div>'+reviews[rw][8]+'<div id="reviews-reviewPost">'+reviews[rw][7]+'</div></div>').fadeIn('fast');

                        if(reviews[rw][6]=='null' && reviews[rw][7]=='null'){  //if only a rating then hide the title and review divs
                         	var targetReview = rw+1;
                         	$('.thirdListBase .listPost:eq('+targetReview+') #reviews-reviewTitle').empty();
                            $('.thirdListBase .listPost:eq('+targetReview+') #reviews-reviewPost').html('This user has left a rating but has not yet left a review.');
                              $('.thirdListBase .listPost:eq('+targetReview+') #reviews-recommended').css({'margin-top':'5px'});
                         }
                         
                        
                        //user name link alt info
                        $('.thirdListBase .listPost .reviewLink').attr({ title: "Check out "+reviews[rw][2]+"'s User Page", alt:"Check out "+reviews[rw][2]+"'s User Page"});
    
                        
                        //abuse buttons
                         $('.reviewsBase1 .thirdListBase .listPost .sectionHeader1 .abuseReport').unbind('click').click(function(){
                                var thisOneR = $(this).attr('aux');
                                alertObject.alertBox('ALERT!', reportConfirm, 'decision', sendReport, thisOneR, 'review');
                         });
                         
                         $('.reviewsBase1 .thirdListBase .listPost .sectionHeader1 .abuseReport').attr({ 
                            title: rOffense,
                            alt: reportA
                        });
                         
                   }//for loop
                
						 	$('.reviewFormBase1').fadeIn('fast');//at this point, go ahead and reveal the review form
                            
				}else{//no ratings or reviews found
					ratingCount = 0;
                    reviewCount=0;
                  
					$(".thirdListBase .reviews-greeting").html('<div class="boxGradient editUserPgDivider listPost">Currently no Ratings for <span style="color:#3366cc">'+greetingUserName+'.</span>&nbsp;&nbsp;</div>');
                   
                    if(chosenPage=='user'){
                    	$(".thirdListBase .reviews-greeting .listPost").append('&nbsp;&nbsp;<span style="color:#669900">Why not be the first?</span>');
                    }
					$('.thirdListBase').fadeIn('fast');
					$('.reviewFormBase1').fadeIn('fast');
				}
				                
                if(chosenPage!='edit'){
				$('#review-account-greeting-btns').html('<div class="buttonWrap review-accountBtns" id="postings">Postings('+totalPostCount+')</div><div class="buttonWrap review-accountBtns" id="reviews">Ratings('+ratingCount+')</div><div class="buttonWrap review-accountBtns" id="leaveReview">Leave a Rating for&nbsp;'+greetingUserName+'</div>');
				}
                
				$('#postings').unbind('click').click(function(){
					var ofst = $('.secondListBase').offset();
					 window.scrollTo(0,ofst.top);
    				 return false;
					});
				$('#reviews').unbind('click').click(function(){
					var ofst = $('.thirdListBase').offset();
					 window.scrollTo(0,ofst.top);
    				 return false;
					});
				$('#leaveReview').unbind('click').click(function(){
					var ofst = $('.reviewFormBase1').offset();
					 window.scrollTo(0,ofst.top);
    				 return false;
					});

	///////////REVIEWS
			break;
			}//switch
            
            }else{
           		 //alertObject.alertBox('ALERT!', errorAlrt, 'ferror', errorReset, null, null); 
            }
			
			}//success
	});