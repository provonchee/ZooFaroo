var categoriesArray = new Array();
var revTitle = null;
var revPost = null;
var recUser = null;
var recommend=null;
var reviews = null;
var reviewCount = null;

function reseter(){window.open(''+baseHref+'user/'+chosenUser+'.html', '_self')};
function retrieveEditList(ssSec){
	$.getScript("js/reviewsEditInfo.mod.js", function(){editssSec = ssSec;});
}	  
$(document).ready(function(){
							$('input[name=review-recommend]:eq(0)').removeAttr("checked");
						   });							

$('.secCodeRefresh').unbind('click').click(function(){secCodeRefresh();});	
function secCodeRefresh(){
		Recaptcha.reload();
}


function checkForm(){
	
	revTitle = $('#review-title').val();
	revPost = $("#review-post").val();
	recUser = $.trim(recUser);
	if(recUser != 'alrdyraMatch'){//the user has left a rating but not a review
		recUser = $("input[name='review-recommend']:checked").val();
	}
	var checkFormArray = new Array();
	checkFormArray = {'Review Title':revTitle, 'Review Post':revPost, 'Rate this User':recUser};
	
	//because the review is optional we must check that the rating is at least checked
	if(checkFormArray['Rate this User']!='1' && checkFormArray['Rate this User']!='2' && checkFormArray['Rate this User']!='alrdyraMatch'){//rating has not been ticked
			alertObject.alertBox('EMPTY FORM!', 'Please make sure that Rate this User is checked.', 'alert', null, null, null);
	}else if(checkFormArray['Rate this User']=='1' || checkFormArray['Rate this User']=='2' && checkFormArray['Rate this User']!='alrdyraMatch'){//rating HAS been checked, go ahead and make sure that the review is either completely empty or completely filled out
			if((checkFormArray['Review Title']==null || checkFormArray['Review Title']=='' || checkFormArray['Review Title']=='undefined') && (checkFormArray['Review Post']==null || checkFormArray['Review Post']=='' || checkFormArray['Review Post']=='undefined')){
				//review empty, only submitting a rating
				revTitle = 'null';
				revPost = 'null';
				submitReview(revTitle,revPost, recUser);
			}else if((checkFormArray['Review Title']!=null && checkFormArray['Review Title']!='' && checkFormArray['Review Title']!='undefined') && (checkFormArray['Review Post']!=null && checkFormArray['Review Post']!='' && checkFormArray['Review Post']!='undefined')){
				//review and rating filled out
				submitReview(revTitle, revPost, recUser);
			}else{
				//either title or review are empty while the other is filled out
				alertObject.alertBox('EMPTY FORM!', 'If leaving a review, please make sure both the title and review are filled out.', 'alert', null, null, null);
			}
	}else if(checkFormArray['Rate this User']!='1' && checkFormArray['Rate this User']!='2' && checkFormArray['Rate this User']=='alrdyraMatch'){//rating already recorded, now just leaving review
	
		if((checkFormArray['Review Title']==null || checkFormArray['Review Title']=='' || checkFormArray['Review Title']=='undefined') || (checkFormArray['Review Post']==null || checkFormArray['Review Post']=='' || checkFormArray['Review Post']=='undefined')){//is this a review only? make sure the form is filled out
			alertObject.alertBox('ALERT!', emptyForm, 'alert', null, null, null);
		}else{
			submitReview(revTitle, revPost, recUser);
		}
	}
}


function submitReview(revTitle,revPost){
	
	//verify the user and the captcha field
	var response = $('#recaptcha_response_field').val();
	var challenge = $('#recaptcha_challenge_field').val();

	
					$(".submitBtn").unbind('click').html('Please wait...<img src="images/loaderSm.gif"/>');
					$(".startOverBtnBottom").hide();
					$(".secCodeRefresh").hide();
																														
					$.ajax({
							type: "POST",
							url:'control/verifyUser.php',
							data: "type=advanced&user="+userName+"&pass="+passWord+"&ssSec="+ssSec+"&response="+response+"&challenge="+challenge+"",
							success: function(confirmi){
								if(confirmi!='X11' && confirmi!='X10'){//username, pass, and captcha all clear
									ssSec = confirmi;//reset code
										$("#loginAlert").html('Submitting review, Please wait...<img src="images/loaderSm.gif"/>');
																																					
											if(recUser==2){
													recommend = '2';
											}else if(recUser==1){
													recommend = '1';
											}else{
												recommend = 'alrdyraMatch';//user has already left a rating but not a review
											}
											
											var form = new Array();
											form = {'di':'review', 's6':chosenUser, 's1':userName, 's2':revTitle, 's3':revPost, 's4':recommend, 's5':ssSec, 's7':passWord};
																																
											$.post("control/formValidate.php", {form:form},
												function(reviewConfirmation) {
													
														var reviewConfirm = $.trim(reviewConfirmation);
														
														$('.reviewFormBase2').hide();
														if(reviewConfirm == '1'){
															$('#review-form').remove();
															$('.reviewFormBase1').css('height', '80px');
															$('.reviewFormBase1 #post-form #loginFormBody').html('Thank you. Your rating/review was successfully submitted.<br/>Refresh the page to see the results.').css({'color':'#669900', 'text-align':'center'});
															$('.reviewFormBase1 #post-form').fadeIn('fast');
														}else if(reviewConfirm == 'X10'){
															
															alertObject.alertBox('ALERT!', errorAlrt, 'alert', null, null, null);
														}else if(reviewConfirm == 'X13'){
															$('.reviewFormBase1').css({'height':'80px'}); 
															$('.reviewFormBase1 #post-form').css({'text-align':'center', 'height':'10px', 'color':'#990000'}).show();
															$('.reviewFormBase1 #post-form #loginFormBody').empty().html('We\'re sorry, but our records show that you\'ve already left a rating and review for this user.<br/>If you feel you are getting this message in error please feel free to contact us.');
															$('#review-account-greeting-btns #leaveReview').hide();//hide the 'leave a review' button
														}else if(reviewConfirm == 'X14'){
															alertObject.alertBox('ALERT!', invalidUP, 'ferror', reseter, null, null);
														}else{
															alertObject.alertBox('ALERT!', errorAlrt, 'ferror', reseter, null, null);
														}
																																					
											});//reviewInput
								
								}else if(confirmi=='X11'){// sec code entered improperly
								
										$("#loginAlert").empty();
										alertObject.alertBox('ALERT!', codeAlrt, 'alert', null, null, null);
										$(".submitBtn").click(function(){checkForm();}).html('Submit');
										$(".startOverBtnBottom").show();
										$(".secCodeRefresh").show();
										secCodeRefresh();
										
								}else if(confirmi=='X10'){// username password error
										alertObject.alertBox('ALERT!', invalidUP, 'ferror', reseter, null, null);
										
								}
							}//success
					
						});
}

$.getScript('js/photoEdit.mod.js');