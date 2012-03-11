function checkForm(){
			var checkFormArray = new Array();
			checkFormArray = {'City or Town':''+$('#registerCity').val()+'',
							'Email':''+$('#email').val()+'',
							'Username':''+$('#username-input').val()+'',
							'Password':''+$('#password-input').val()+'',
							'Privacy Policy and User Agreement':''+$("input[id='agree']:checked").val()+'',
							};
							
			if($('#password-input').val()==$('#passwordConfirm').val()){
					for (var child in checkFormArray){
					if(checkFormArray[child]==null || checkFormArray[child]=='' || checkFormArray[child]=='undefined'){
						alertObject.alertBox('EMPTY FORM!', 'Please make sure the '+child+' is filled out/checked!', 'alert', null, null, null);
						break;
					}else if(/[^a-zA-Z0-9]/.test(checkFormArray['Username']) || checkFormArray['Username'].length<=7) {
						alertObject.alertBox('ALERT!', invalidUN, 'alert', null, null, null);
						break;
					}else if(/[^a-zA-Z0-9]/.test(checkFormArray['Password']) || checkFormArray['Password'].length<=7) {
						alertObject.alertBox('ALERT!', invalidPW, 'alert', null, null, null);
						break;
					}else if(child=='Privacy Policy and User Agreement'){
						registerSubmit();
						break;
					}
				}
			}else{
				alertObject.alertBox('ALERT!', passWordMatch, 'alert', null, null, null);
			}
		}

function registerSubmit(){
    //verify the user and the captcha field
			var response = $('#recaptcha_response_field').val();
			var challenge = $('#recaptcha_challenge_field').val();
			
			$(".regEditSubmitBtn").unbind('click');
			$(".secCodeRefresh").unbind('click');
			$(".buttonWrap .regEditSubmitBtn").html('Please wait...<img src="images/loaderSm.gif"/>');
			
			$.ajax({
				type: "POST",
				url:'control/verifyUser.php',
				data: "type=advanced&response="+response+"&challenge="+challenge+"",
				success: function(confirmi){
				if(confirmi!='X11' && confirmi!='X10' && confirmi=='1'){//uername, pass, and captcha all clear
				
					var addyurl='null';
					var fburl = 'null';
					var twyurl = 'null';
					var lnurl = 'null';
					var gourl = 'null';
					
						if($('#url-input').val().length){
							addyurl = 'http://www.'+$('#url-input').val()+''+$('#urldr').val()+'/';
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
			 
							var form = new Array();
							form = {'di':'edit', 'd2':'editAccount', 's1':''+$('#registerCity').val()+'','e1':''+$('#email').val()+'','s2':''+editUname+'','s3':''+editPSO+'','s4':''+ssSec+'', 's5':''+$('#password-input').val()+'', 'i1':''+drpDwnStateID+'', 'i2':''+$("input[name='business']:checked").val()+'','u1':''+fburl+'','u2':''+twyurl+'','u3':''+gourl+'', 'u4':''+lnurl+'', 'u5':''+addyurl+''};
							$.post("control/formValidate.php", {form:form}, //form validation
											   function(confirmation){
												  
												   if(confirmation=='X10'){
													  alertObject.alertBox('ALERT!', errorAlrt, 'ferror', btnsReset, null, null);
												   }else if(confirmation=='X12'){
														$('#register-alert').empty();
														alertObject.alertBox('ALERT!', emailInUse, 'ferror', btnsReset, null, null);
												   }else if(confirmation=='X13'){
														$('#register-alert').empty();
														alertObject.alertBox('ALERT!', userNameInUse, 'ferror', btnsReset, null, null);
												   }else if(confirmation=='1'){//form is filled out properly, moving on
															$('#register-form').fadeOut('fast', function(){
															$('#register-terms').hide();
															$('#register-alert').empty();
															$('.sectionHeaderFormat blueHeader #register-title').html('Almost there!&nbsp;&nbsp;Just one more step...');
															$('#register-form').html('<div id="register-successful-text">Thank you, your registration has been successfully submitted!<br/>You should be receiving a confirmation email shortly.<br/><b>Be sure to visit the link within the email or your registration will not be activated.</b><br/>If the email does not arrive in the next 30 minutes <b style="color:#FF0000;">check your junk and spam folders</b>, it could be hiding there.<br/><br/>Please note: Some Internet Service Providers (ISPs) have recently implemented a new Spam Filtering System. As a result, your confirmation email may be filtered to your Junk E-Mail folder unless you add us to your Safe List or White List.<br/><br/>Enjoy ZooFaroo!</div>');
															$('.registerBase2').css('height', '240px');
															$('#register-form').fadeIn('fast');
															});
												   }else{//default
														$('#register-alert').empty();
														alertObject.alertBox('ALERT!', errorAlrt, 'ferror', btnsReset, null, null);
													}
											   });
											   
				}else if(confirmi=='X10'){
					alertObject.alertBox('ALERT!', codeAlrt, 'ferror', btnsReset, null, null);
				}else if(confirmi=='X11'){
					alertObject.alertBox('ALERT!', codeAlrt, 'ferror', btnsReset, null, null);
				}
			}// validate success
			});//validateUser
	}
}//registerSubmit

function btnsReset(){
	Recaptcha.reload();
	$(".buttonWrap .regEditSubmitBtn").html('Submit');
	$('.regEditSubmitBtn').unbind('click').click(function(){registerSubmit();});
	 $(".secCodeRefresh").unbind('click').click(function(){Recaptcha.reload();});
}