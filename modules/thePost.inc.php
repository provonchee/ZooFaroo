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
include_once('modules/editBox.inc.php');
?>

<script>
$('#post-postForm').hide();
 var RecaptchaOptions = {
    theme : 'clean'
 };
</script>

<div class="boxBare thePostBase">

<div id="breadCrumbs"><? echo $breadCrumbs; ?></div><!--breadCrumbs-->

<div id="preloader"></div><!--preloader-->
<div class="boxBasic primaryThePostBase"></div><!--primaryThePostBase-->
<div id="postShare-layout">
<div class="sectionHeaderFormat" style="margin-top:15px; font-size: 1.1em; float:left; margin-left:400px; border-bottom: none;"><div id="header-title">Reply to this Posting!</div></div>
<script>$('.thePostBase .primaryThePostBase').hide();$('#postShare-layout').hide();var myImagePR = new Image;myImagePR.src = "images/preloader.gif";myImagePR.id = "preload";$('#preloader').append(myImagePR);</script>
<div id="postReply-form"></div><!--postReply-form-->
    <br/>
    <div class="boxBasic postReplySecCode">
    <span style="color:#900; font-size:0.8em;margin-left: 175px;">Please Note: Your email address will be attached to this message so that the user may contact you directly.</span> 
    <div id="postReply-message"><!--[if IE]>Compose your message here:<br/><![endif]--><TEXTAREA NAME="reply-message" id="reply-message" placeholder="Compose your message here" class="textarea" COLS=92 ROWS=6 maxlength="400" style="font-family:Arial, Helvetica, sans-serif; font-size:0.9em;"></TEXTAREA></div>
    <br/>
    <div id="post-captcha">
    <div class='secCodeRefresh' style="margin-left:350px;">Refresh Code</div>
	<? require_once('lib/recaptchalib.php');echo recaptcha_get_html($publickey);?>
    <div id="refreshCodeMsg">Having trouble reading the security code?&nbsp;&nbsp;Refresh it!</div>
    </div><!--post-captcha-->
    <div class='startOverBtnBottom' style="padding-right:150px; margin-top:65px;">Start Over</div>
    <div class='buttonWrap submitBtn'>Send Your Reply!</div>
    <div id="postReply-alert"></div>
    </div><!--postReplySecCode-->
    <br/>
</div><!--postShare-layout-->
<div class="boxBare thirdListBase" style="position:relative; margin-top:25px; font-weight:bold; font-size:0.9em;"><div class="reviews-greeting"></div></div>

<div id="secondaryHouse"></div>
<div class="boxBare secondListBase" style="position:relative;"><div id='review-postings-greeting'></div></div><!--secondListBase-->
<div id="terteiryHouse"><div class="boxGradient thePostBaseMsg"><div class="sectionHeaderFormat regBlueHeader sectionHeader2">ZooFaroo Helpful Hint:</div>  <div id="postHint"></div></div></div>
<script>$('#terteiryHouse').hide();</script>


</div><!--thePostBase-->

</div><!--secondBase(header)-->
</div><!--mainBase(header)-->



<script>
chosenPage = '<? echo $p; ?>';
chosenState = '<? echo $state; ?>';
chosenCity = '<? echo $city; ?>';
chosenCategory = '<? echo $category; ?>';
chosenOfferNeed = '<? echo $offerNeed; ?>';
chosenPostingID = '<? echo $postingID; ?>';
chosenRegionName = '<? echo $regionName; ?>';
var BreadCrumbTitle = '<? echo $offerNeed; ?>';
function retrieveEditList(ssSec){
	$.getScript("js/thePost.mod.js");
}
if(!ssSec){
	$.getScript("js/thePost.mod.js");
}
</script>