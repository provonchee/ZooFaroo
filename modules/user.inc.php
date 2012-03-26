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
$user = $_GET['user'];
include_once('modules/editBox.inc.php');
?>
<script> var RecaptchaOptions = {
    theme : 'clean'
 };</script>

 <div id="review-account-greeting-btns"></div>
<div class="boxBasic reviewsBase1" style="padding:0px;">
<div id="breadCrumbs"><? echo $breadCrumbs; ?></div><!--breadCrumbs-->
<div id="preloader"></div>
<!--reviews-->
<div class="boxBare thirdListBase"><div class="reviews-greeting"></div></div>
<!--leaveReview-->
<div class="boxGradient reviewFormBase1">
<script>$('.firstListBase').hide();$('.secondListBase').hide();$('.thirdListBase').hide();$('.reviewFormBase1').hide();var myImagePR = new Image;myImagePR.src = "images/preloader.gif";myImagePR.id = "preload";$('#preloader').append(myImagePR);</script>
<div class="sectionHeaderFormat ltGrayHeader">Rate your experience with this User!</div>
<div id="post-form"></div><!--post-form-->
<div id="review-form">
    <script>$('#review-form').hide();</script>
    <div class="boxBare reviewFormBase2">
    <h2 class="reviews-greeting" style="float:left;">Rate this User</h2>
    <div id="reviews-recommend">How was your experience?</div><div id='ratePositive'><img src="images/plus.png" alt="positive rating"/><br/>positive&nbsp;<input type="radio" name="review-recommend" value="2"  checked></div><div id='rateNegative'><img src="images/minus.png" alt="negative rating"/><br/>negative &nbsp;<input type="radio" name="review-recommend" value="1"></div>
    <br/>
      <h2 class="reviews-greeting">Review this User</h2>(optional)
      <div id="reviews-title">Review Title:&nbsp;<input name="review-title" id="review-title" class="input" type="text" size="75"  maxlength="75"/></div>
    <br/>
    <div id="reviews-post">The Review:<br/><TEXTAREA NAME="review-post" id="review-post" class="textarea"  maxlength="600" COLS=92 ROWS=6></TEXTAREA> </div>
    <br/>
	  <div id="post-captcha">
    	<div class='secCodeRefresh'>Refresh Code</div>
		<? require_once('lib/recaptchalib.php');echo recaptcha_get_html($publickey);?>
    	<div id="refreshCodeMsg">Having trouble reading the security code?&nbsp;&nbsp;Refresh it!</div>
    </div>
    <div class='startOverBtnBottom' style="margin-top:65px; padding-right: 70px;">Start Over</div>
    <div class='buttonWrap submitBtn'>Submit</div>
    <br/>
    </div><!--reviewFormBase2-->
</div><!--review-form-->
</div><!--reviewFormBase1-->
<!--account info-->
<div class="boxBare firstListBase" style="margin-top:0px; padding-bottom:20px;"></div><!--firstListBase-->
<!--postings-->
<div class="boxBare secondListBase" style="position:relative;"><div id='review-postings-greeting'></div></div><!--secondListBase-->
<div id="list-pageCount"></div>
</div><!--reviewsBase1-->
</div><!--secondBase-->
</div><!--mainBase-->

<script>
$('#post-form').load('modules/loginForm.php');
chosenPage = '<? echo $p; ?>';
chosenUser = '<? echo $user; ?>';
$.getScript("js/user.mod.js");
</script>