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
<div class="boxBasic registerBase1">
 <script>$('.registerBase1').hide();</script>
<div id="breadCrumbs"><? echo $breadCrumbs; ?></div><!--breadCrumbs-->

<div class="boxGradientDrop registerBase2">
<div class="sectionHeaderFormat blueHeader"><h2 id="register-title">Register with ZooFaroo</h2></div>

<? include('regEditForm.inc.php'); ?>
<script>$('#post-postForm').hide();var RecaptchaOptions = {theme : 'clean'};function secCodeRefresh(){Recaptcha.reload();}</script>

 <div id="post-captcha" style="float:none; margin-left:0px;">
    <div class='secCodeRefresh' style="margin-left: 400px;">Refresh Code</div>
	<? require_once('lib/recaptchalib.php');
       echo recaptcha_get_html($publickey);
	?>
    <div id="refreshCodeMsg" style="margin-left: 50px;">Having trouble reading the security code?&nbsp;&nbsp;Refresh it!</div>
	<div class='buttonWrap regEditSubmitBtn' style="margin-right: 100px; margin-top:-75px;">Submit Form</div>
    </div>

<script>$('.maxLengthMsg').html('<u>PLEASE NOTE</u>:&nbsp;&nbsp;The <b>Password</b> must be between 8-12 characters and must contain <b>both</b> letters and numbers.');</script>	
 

</div>

<div id="register-alert"><span style="color:#990000"><u>Please Note:</u>  You must use a valid email address to successfully register</span></div>
</div><!--registerBase1-->
</div><!--separator-->
</div><!--mainBase-->

   
 <script>
 $('input[name="business"]').attr('checked', true);
 $('.registerBase1').hide();
 $('#city').val('');
 $('#email').val('');
 $('#username-input').val('');
 $('#password-input').val('');
 $('#passwordConfirm').val('');
 $('#facebook-input').val('');
 $('#twitter-input').val('');
 $('#google-input').val('');
 $('#linkedin-input').val('');
 $('#url-input').val('');
 $('#busName').val('');
 $("#agree").attr('checked', false);
 var emailNotes = false;
 $('#register-form').css({'margin-left':'35px'});
$(".secCodeRefresh").unbind('click').click(function(){Recaptcha.reload();});
fetchStateObject.fetchStateArray('register');
$(".registerBase1 .registerBase2 #recaptcha_widget_div").css({'margin-left':'55px'});
$('.registerBase1').fadeIn('slow');

var emailCatGoods = new Array();
var emailCatServices = new Array();
function registerActivate(){
$('.regEditSubmitBtn').unbind('click').click(function(){
	
	var checkFormArray = new Array();
	checkFormArray = {'City or Town':''+$('#city').val()+'',
					'State':''+drpDwnStateID+'',
					'Email':''+$('#email').val()+'',
					'Username':''+$('#username-input').val()+'',
					'Password':''+$('#password-input').val()+'',
					'PasswordConfirm':''+$('#passwordConfirm').val()+'',
					'Privacy Policy and User Agreement':''+$("input[id='agree']:checked").val()+'',
					'arrayEnd':'arrayEnd'
					};
					
					var addyurl='null';
					var fburl = 'null';
					var twyurl = 'null';
					var lnurl = 'null';
					var gourl = 'null';
					var busname = 'null';
					
						if($('#url-input').val().length){
							addyurl = 'http://www.'+$('#url-input').val()+''+$('#urldr').val()+'/';
						}
						if($('#busName').val().length){
							busname = ''+$('#busName').val()+'';
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
				
				for (var child in checkFormArray){
					if(checkFormArray[child]==null || checkFormArray[child]=='' || checkFormArray[child]=='undefined' || checkFormArray[child]=='please choose...' || checkFormArray[child]=='null'){
						alertObject.alertBox('EMPTY FORM!', 'Please make sure that '+child+' is filled out/chosen! And re-enter the security code.', 'gerrorPlus', buttonsReset, '.postBaseEdit', null);
						break;
					}else if(checkFormArray[child]=='arrayEnd'){
						if(checkFormArray['Username']==checkFormArray['Password']){
							alertObject.alertBox('EMPTY FORM!', sameUP, 'gerrorPlus', buttonsReset, '.postBaseEdit', null);
						}else{
							if(checkFormArray['PasswordConfirm']==checkFormArray['Password']){
								//form checks out move on
								subMitRegisterForm();
							}else{
								alertObject.alertBox('EMPTY FORM!', passWordMatch, 'gerrorPlus', buttonsReset, '.postBaseEdit', null);
							}
						}
					}
					}
				
				
				
				
			function 	subMitRegisterForm(){			
	 		var form = new Array();
			form = {'di':'register','s1':''+$('#city').val()+'','e1':''+$('#email').val()+'','s2':''+$('#username-input').val()+'','s3':''+$('#password-input').val()+'','i1':''+drpDwnStateID+'', 'i2':''+$("input[name='business']:checked").val()+'','u1':''+fburl+'','u2':''+twyurl+'','u3':''+gourl+'', 'u4':''+lnurl+'', 'u5':''+addyurl+'', 's4':''+busname+''};

			genTimerObject.genTimer();//start the timeout timer
			var response = $('#recaptcha_response_field').val();
			var challenge = $('#recaptcha_challenge_field').val();
		
			$(".regEditSubmitBtn").unbind('click');
			$(".secCodeRefresh").unbind('click');
			$(".regEditSubmitBtn").html('Please wait...<img src="images/loaderSm.gif"/>');
			
			$.ajax({
				type: "POST",
				url:'control/verifyUser.php',
				data: "type=advanced&response="+response+"&challenge="+challenge+"",
				success: function(confirmi){
					clearTimeout(genericTimer);
					confirmi = $.trim(confirmi);
				if(confirmi!='X11' && confirmi!='X10' && confirmi=='1'){//username, pass, and captcha all clear
			 				genTimerObject.genTimer();//start the timeout timer
							$.post("control/formValidate.php", {form:form}, //form validation
											   function(confirmation){
												   clearTimeout(genericTimer);
												  confirmation = $.trim(confirmation);
												  if(confirmation=='psAlphaNum'){
													   alertObject.alertBox('ALERT!', "Your password must contain at least one number and one letter and be 8 to 12 characters.  No special characters.", 'gerrorPlus', buttonsReset, '.postBaseEdit', null);
												  }else if(confirmation=='X10'){
													  alertObject.alertBox('ALERT!', errorAlrt, 'gerrorPlus', buttonsReset, '.postBaseEdit', null);
												   }else if(confirmation=='X12'){
														$('#register-alert').empty();
														alertObject.alertBox('ALERT!', emailInUse, 'gerrorPlus', buttonsReset, '.postBaseEdit', null);
												   }else if(confirmation=='X13'){
														$('#register-alert').empty();
														alertObject.alertBox('ALERT!', userNameInUse, 'gerrorPlus', buttonsReset, '.postBaseEdit', null);
													}else if(confirmation=='X14'){
														$('#register-alert').empty();
														alertObject.alertBox('ALERT!', "Your username must be 8 to 12 characters long and contain no special characters.", 'gerrorPlus', buttonsReset, '.postBaseEdit', null);
													}else if(confirmation=='X15'){
														$('#register-alert').empty();
														alertObject.alertBox('ALERT!', "Your password must contain at least one number and one letter and be 8 to 12 characters.  No special characters.", 'gerrorPlus', buttonsReset, '.postBaseEdit', null);
												   }else{//form is filled out properly, moving on
												   	
															$('#register-form').fadeOut('fast', function(){
															$('#register-terms').hide();
															$('#register-alert').empty();
															$('.secCodeRefresh').hide();
															$(".regEditSubmitBtn").hide();
															$('#recaptcha_widget_div').hide();
															$('#refreshCodeMsg').hide();
															$('.sectionHeaderFormat blueHeader #register-title').html('Almost there!&nbsp;&nbsp;Just one more step...');
															$('#register-form').html(regSuccess);
															$('.registerBase2').css('height', '240px');
															$('#register-form').fadeIn('fast');
															});
															
												   }
											   });
											   
				}else if(confirmi=='X10'){
					alertObject.alertBox('ALERT!', codeAlrt, 'gerrorPlus', buttonsReset, '.postBaseEdit', null);
				}else if(confirmi=='X11'){
					alertObject.alertBox('ALERT!', codeAlrt, 'gerrorPlus', buttonsReset, '.postBaseEdit', null);
				}
			}// validate success
			});//verifyUser	
			}//subMitRegisterForm
});
}
registerActivate();

function buttonsReset(){
			Recaptcha.reload();
			$(".secCodeRefresh").unbind('click').click(function(){Recaptcha.reload();});
			$('#alertScreen').css({'display':'none'});$('.postBaseEdit').css({'display':'none'});
			$(".regEditSubmitBtn").html('Submit');
			registerActivate();
	
}
</script>