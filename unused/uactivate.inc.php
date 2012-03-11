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

$key = $_REQUEST['key'];
$ssSec = $_REQUEST['ssSec'];

?>
<div class="activateBase1">
<div class="boxGradientDrop registerBase2" style="margin-top:-100px;">
<div class="sectionHeaderFormat blueHeader"><h2 id="register-title">ZooFaroo User Activation</h2></div>

<div id="register-form" style="width:600px;">
<br/>
To activate your account please fill in the security code.
<br/><br/>
<script>var RecaptchaOptions = {theme : 'clean'};function secCodeRefresh(){Recaptcha.reload();}</script>
<? require_once('lib/recaptchalib.php');echo recaptcha_get_html($publickey);?>

<div class='buttonWrap regEditSubmitBtn' style="margin-top:-3em; margin-left:0px;">Activate Account</div>

<div class='secCodeRefresh' style="margin-left:330px; margin-top:0px;">Refresh Code</div>
</div><!--register-form-->




<div id="register-successful" style="text-align:center;"></div>
</div><!--registerBase2-->
</div><!--activateBase1-->
</div><!--separator-->
</div><!--mainBase-->   
 <script>
 $('.regEditSubmitBtn').click(function(){submitActivateForm();});
 $('.secCodeRefresh').click(function(){Recaptcha.reload();});
 
 function submitActivateForm(){
 $('.regEditSubmitBtn').unbind('click');
 
 	//verify the user and the captcha field
	var response = $('#recaptcha_response_field').val();
	var challenge = $('#recaptcha_challenge_field').val();
	
	$(".secCodeRefresh").unbind('click');
	$(".regEditSubmitBtn").html('Please wait...<img src="images/loaderSm.gif"/>');
	genTimerObject.genTimer();//start the timeout timer																													
	$.ajax({
			type: "POST",
			url:'control/verifyUser.php',
			data: "type=advanced&&response="+response+"&challenge="+challenge+"",
			success: function(confirmi){
				clearTimeout(genericTimer);
				confirmi = $.trim(confirmi);
				if(confirmi!='X11'&&confirmi=='1'){//captcha all clear
	
				var form = new Array();
				form = {'di':'activation', 's1':'user', 's2':'<? echo $key; ?>', 's3':'<? echo $ssSec; ?>'};
				genTimerObject.genTimer();//start the timeout timer	
				$.post("control/formValidate.php", {form:form},
					function(confirmation){
						clearTimeout(genericTimer);
						var confirmer = $.trim(confirmation);
						
						if(confirmer=='1'){
							$('#register-successful').html('<br/><br/>Thank you, your registration has been successfully activated.<br/><br/>Please <a href="login.html">click here</a> to log in.<br/><br/>Thank you again, and enjoy ZooFaroo!');
							$('#register-form').empty();
						 }else if(confirmer=='2'){
							$('#register-successful').html('<br/><br/>Whoops!&nbsp;&nbsp;It looks like you\'ve already successfully registered.<br/><br/>Go ahead and try to log in.&nbsp;&nbsp;If you have trouble, please email us.<br/><br/>Thank you again, and enjoy ZooFaroo!');
						 	$('#register-form').empty();
						 }else if(confirmer=='0'){
							$('#register-successful').html('<br/><br/>An unexplained error has ocurred.&nbsp;&nbsp;We are sorry for the inconvenience.<br/><br/>Please try again later.<br/><br/>If you continue to have trouble, please email us.');
							$('#register-form').empty();
						 }
						
					});
 
 				}else{// sec code entered improperly
					alertObject.alertBox('ALERT!', codeAlrt, 'alert', null, null, null);
					$(".regEditSubmitBtn").html('Activate Account');
					$('.regEditSubmitBtn').click(function(){submitActivateForm();});
					$('.secCodeRefresh').click(function(){Recaptcha.reload();});
					secCodeRefresh();
				}
			}
	});
 }
</script>
<!--w5phmf^CPZocFUWU-->