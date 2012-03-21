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

<div class="boxGradientDrop  postBaseEdit">
	<div class="index-ZooFaroo"></div><div class="boxBare postBaseEdit2"></div>
	<script>$('#post-postForm').hide();var RecaptchaOptions = {theme : 'clean'};function secCodeRefresh(){Recaptcha.reload();}</script>
  	<div id="post-captcha">
        <div class='secCodeRefresh'>Refresh Code</div>
        <? require_once('lib/recaptchalib.php');
           echo recaptcha_get_html($publickey);
        ?>
        <div id="refreshCodeMsg">Having trouble reading the security code?&nbsp;&nbsp;Refresh it!</div>
        <div class='buttonWrap editCancelBtn'>Cancel</div>
        <div class='buttonWrap regEditSubmitBtn'>Save and Continue</div>
    </div>
</div><!--postBaseEdit-->
<div class="boxBare editBase1">
	<div id="breadCrumbs"><? echo $breadCrumbs; ?></div>
	<div class="boxGradient loginBase2">
	<hgroup class="sectionHeaderFormat grayHeader"><h2 id="header-title">You must sign in to access your ZooFaroo User Account Page</h2></hgroup>
	<div id="post-form"></div>
</div><!--editBase1-->
<div id="preloader"></div>
<!--results-->
<!--account info-->
<div class="boxBasic firstListBase"></div><!--firstListBase-->
<!--postings-->
<div id='edit-postingTally'></div>
<div class="boxBare secondListBase" style="margin-top:0px;"><div id='review-postings-greeting'></div></div><!--secondListBase-->
<div id="list-pageCount"></div>
<!--reviews-->
<div class="boxBare thirdListBase" style="position:relative;"><div class="reviews-greeting"></div></div>
<script>$('.firstListBase').hide();$('.secondListBase').hide();$('.thirdListBase').hide();var myImagePR = new Image;myImagePR.src = "images/preloader.gif";myImagePR.id = "preload";</script>
</div><!--editBase1-->
</div><!--secondBase-->
</div><!--mainBase-->


<script>
$('#post-form').load('modules/loginForm.php');
$.getScript("js/edit.mod.js");
</script>