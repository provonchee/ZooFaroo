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
<div class="boxBasic registerBase1"> <script>$('.registerBase1').hide();</script> 
<div id="breadCrumbs"><? echo $breadCrumbs; ?></div><!--breadCrumbs--> 
<div class="boxGradientDrop registerBase2"> <div class="sectionHeaderFormat blueHeader"><h2 id="register-title">Register with ZooFaroo</h2></div> 
<? include('regEditForm.inc.php'); ?> 
<script>$('#post-postForm').hide();var RecaptchaOptions = {theme : 'clean'};function secCodeRefresh(){Recaptcha.reload();}</script> 
<div id="post-captcha" style="float:none; margin-left:0px;"> <div class='secCodeRefresh' style="margin-left: 400px;">Refresh Code</div> 
<? require_once('lib/recaptchalib.php'); echo recaptcha_get_html($publickey); ?> 
<div id="refreshCodeMsg" style="margin-left: 50px;">Having trouble reading the security code?&nbsp;&nbsp;Refresh it!</div> 
<div class='buttonWrap regEditSubmitBtn' style="margin-right: 100px; margin-top:-75px;">Submit Form</div> </div> 
<script>$('.maxLengthMsg').html('<u>PLEASE NOTE</u>:&nbsp;&nbsp;The <b>Password</b> must be between 8-12 characters and must contain <b>both</b> letters and numbers.').css({'margin-left':'500px'});</script> 
</div> <div id="register-alert"><span style="color:#990000"><u>Please Note:</u> You must use a valid email address to successfully register</span></div> </div><!--registerBase1--> </div><!--separator--> </div><!--mainBase-->
 <script>
$.getScript('js/register.mod.js');
</script>