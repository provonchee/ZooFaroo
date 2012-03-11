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