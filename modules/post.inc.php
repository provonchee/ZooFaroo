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

<div class="boxGradient  postBaseEdit" style="margin-left:-10px;"></div>

<div id="breadCrumbs"><? echo $breadCrumbs; ?></div><!--breadCrumbs-->
<div id="post-postForm">

<script>
chosenPage = '<? echo $p; ?>';
$('#post-postForm').hide();
 var RecaptchaOptions = {
    theme : 'clean'
 };
 $('.listPostingBtn').hide();
 //$('.searchPartial').hide();
</script>

<div class="boxGradient loginBase2">
<hgroup class="sectionHeaderFormat grayHeader"><h2 id="header-title">Post Your Own Offers and Needs!</h2></hgroup>

<div id="preloader"></div><!--preloader-->
<div id="post-form"></div><!--post-form-->
    </div><!--postBase1-->
<div id="postingForms" style="margin-top:20px;">
<script>$('#postingForms').hide();</script>
       <div class="boxBasic whereToPost postBase1">
        <div class="sectionHeaderFormat blueHeader sectionHeader2">Where to post?</div>
       <div id="stateDropDwn"></div><!--stateDropDwn-->
       <div id="cityDropDwn"></div><!--cityDropDwn-->
       <div id="specificLocale"><div id='inputLabelTxt'>Your Specific City/Town Location:&nbsp;</div><input name="specificLocaleInput" id="specificLocaleInput" type="text" class="input" size="25" maxlength="30" style="display:inline; font-family:Arial, Helvetica, sans-serif; font-size:0.9em;"/></div><!--specificLocale-->
       </div><!--postBase1-->
<br/>

	<div class="boxGradient postBase1"><!--offer separator-->
        <div class="sectionHeaderFormat blueHeader sectionHeader2" style="background:#669900;">What are you offering?</div>
        <div id="post-offerForms"></div><!--post-offerForms-->
        <div class="boxBasic post-offerAdditional">
        <div id="post-offerTag" style="display:inline;">additional offers</div>&nbsp;&nbsp;<span style="display:inline; padding-left:10px;">Do you have an another offer you'd like to post?</span>&nbsp;&nbsp;<div class='buttonWrap yesPleaseBtn'>Post another offer!</div><!--&nbsp;&nbsp;<div class='buttonWrap noThanksBtn'>No thanks, I'm done with offers!</div>&nbsp;&nbsp;&larr;<div id="post-Explained">Multiple offers?  How does this work?</div>-->
        </div><!--post-offerAdditional-->
 	</div><!--offer separator-->
    
    <br/>
    
    
    <div class="boxGradient postBase1"><!--need separator-->
    <div class="sectionHeaderFormat blueHeader sectionHeader2" style="background:#F90;">What do you need?</div>
     <div id="post-needForms"></div><!--post-offerForms-->
    <div class="boxBasic post-needAdditional">
    <div id="post-needTag" style="display:inline;">additional needs</div>&nbsp;&nbsp;<span style="display:inline; padding-left:10px;">Do you have an another need you'd like to post?</span>&nbsp;&nbsp;<div class='buttonWrap yesPleaseBtn'>Post another need!</div><!--&nbsp;&nbsp;<div class='buttonWrap noThanksBtn'>No thanks, I'm done with needs!</div>&nbsp;&nbsp;&larr;<div id="post-Explained">Multiple needs?  How does this work?</div>-->
	</div><!--post-offerAdditional-->
    </div><!--need separator-->
    
    
    <br/>
   
	<div class="boxGradient postBaseSecCode"> 
    <div class="sectionHeaderFormat blueHeader sectionHeader2">Ready to submit?</div>
    
    <div id="post-captcha">
    <div class='secCodeRefresh'>Refresh Code</div>
	<? require_once('lib/recaptchalib.php');
       echo recaptcha_get_html($publickey);
	?>
    <div id="refreshCodeMsg">Having trouble reading the security code?&nbsp;&nbsp;Refresh it!</div>
    </div>
    
    <div class='startOverBtnBottom'>Clear All Forms And Start Over</div>
    
    <div class='buttonWrap submitBtn'>Submit Your Postings!</div>

    <br/>
    <div id="post-alert"></div>
    </div>
       
    <br/>
    </div><!--postingForms-->
</div><!--post-postForm-->

</div><!--secondBase-->
</div><!--mainBase-->

<script>
$('#post-form').load('modules/loginForm.php');
$.getScript('js/post.mod.js');
</script>