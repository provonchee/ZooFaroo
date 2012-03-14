<?php
// Redirect if this page was accessed directly:
if (!defined('BASE_URL')) {

	// Need the BASE_URL, defined in the config file:
	require_once ('../../config/config.inc.php');
	
	// Redirect to the index page:
	$url = BASE_URL . 'index.php';
	header ("Location: $url");
	exit;
	
} // End of defined() IF.
$user = $_GET['user'];
?>
<script> var RecaptchaOptions = {
    theme : 'clean'
 };</script><div id="review-account-greeting-btns"></div>
<div class="boxBasic reviewsBase1" style="padding:0px;">
<div id="breadCrumbs"><? echo $breadCrumbs; ?></div><!--breadCrumbs-->


<div id="preloader"></div><!--preloader-->


<!--reviews-->
<div class="boxBare thirdListBase"><div id="reviews-greeting"></div></div>
<!--leaveReview-->

<div class="boxGradient reviewFormBase1">
<script>$('.firstListBase').hide();$('.secondListBase').hide();$('.thirdListBase').hide();$('.reviewFormBase1').hide();var myImagePR = new Image;myImagePR.src = "images/preloader.gif";myImagePR.id = "preload";$('#preloader').append(myImagePR);</script>
<div class="sectionHeaderFormat ltGrayHeader">Rate your experience with this User!</div>
<div id="post-form"></div><!--post-form-->

<div id="review-form">
    <script>$('#review-form').hide();</script>
    <div class="boxBare reviewFormBase2">
    <h2 id="reviews-greeting" style="float:left;">Rate this User</h2>
    <div id="reviews-recommend">How was your experience?</div><div id='ratePositive'><img src="../../modules/images/plus.png"/><br/>positive&nbsp;<input type="radio" name="review-recommend" value="2"  checked></div><div id='rateNegative'><img src="../../modules/images/minus.png"/><br/>negative &nbsp;<input type="radio" name="review-recommend" value="1"></div>
    <br/>
      <h2 id="reviews-greeting">Review this User</h2>(optional)
      <div id="reviews-title">Review Title:&nbsp;<input name="review-title" id="review-title" class="input" type="text" size="75"  maxlength="75"/></div>
    <br/>
    <div id="reviews-post">The Review:<br/><TEXTAREA NAME="review-post" id="review-post" class="textarea"  maxlength="600" COLS=92 ROWS=6></TEXTAREA> </div>
    <br/>
	  <div id="post-captcha">
 
    <div class='secCodeRefresh'>Refresh Code</div>
	<? require_once('../../modules/lib/recaptchalib.php');
       echo recaptcha_get_html($publickey);
	?>
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

var revTitle=null;var revPost=null;var recUser=null;var recommend=null;var reviews=null;var reviewCount=null;var stateArrayCall=null;var greetingUserName=null;var editID=null;var editUname=null;var editEmail=null;var editPS=null;var editPSO=null;var editCity=null;var editState=null;var editStateTxt=null;var editBus=null;var editBusTxt=null;var editBusName=null;var editFB=null;var editFBTxt=null;var editTW=null;var editTWTxt=null;var editGP=null;var editGPTxt=null;var editLI=null;var editLITxt=null;var editURL=null;var editURLSuf=null;var editURLTxt=null;var editssSec=null;var offerPostCount=null;var needPostCount=null;var totalPostCount=null;chosenPage='<? echo $p; ?>';chosenUser='<? echo $user; ?>';$('#post-form').load('modules/loginForm.php');function reseter(){window.open(''+baseHref+'user/'+chosenUser+'.html','_self')};chosenStateArray=fetchStateObject.fetchStateArray('default');function checkStateStatus(stateArray){if(stateArray){for(i=0;i<stateArray.length;i++){if(editState==stateArray[i][0]){editStateTxt=stateArray[i][1];$('.firstListBase .list-accountInfo #list-accountDetail:eq(3) #listContent').html(editStateTxt);};clearInterval(stateArrayCall);}}}<? include_once('modules/reviewsEditInfo.inc.php'); ?>$(document).ready(function(){$('input[name=review-recommend]:eq(0)').removeAttr("checked");$('#backTop').click(function(){$(window).scrollTop(0);if(navigator.appName=='Microsoft Internet Explorer'){$('html').scrollTop(0);}});});$('.secCodeRefresh').unbind('click').click(function(){secCodeRefresh();});function secCodeRefresh(){Recaptcha.reload();};function checkForm(){revTitle=$('#review-title').val();revPost=$("#review-post").val();recUser=$.trim(recUser);if(recUser!='alrdyraMatch'){recUser=$("input[name='review-recommend']:checked").val();};var checkFormArray=new Array();checkFormArray={'Review Title':revTitle,'Review Post':revPost,'Rate this User':recUser};if(checkFormArray['Rate this User']!='1'&&checkFormArray['Rate this User']!='2'&&checkFormArray['Rate this User']!='alrdyraMatch'){alertObject.alertBox('EMPTY FORM!','Please make sure that Rate this User is checked.','alert',null,null,null);}else if(checkFormArray['Rate this User']=='1'||checkFormArray['Rate this User']=='2'&&checkFormArray['Rate this User']!='alrdyraMatch'){if((checkFormArray['Review Title']==null||checkFormArray['Review Title']==''||checkFormArray['Review Title']=='undefined')&&(checkFormArray['Review Post']==null||checkFormArray['Review Post']==''||checkFormArray['Review Post']=='undefined')){revTitle='null';revPost='null';submitReview(revTitle,revPost,recUser);}else if((checkFormArray['Review Title']!=null&&checkFormArray['Review Title']!=''&&checkFormArray['Review Title']!='undefined')&&(checkFormArray['Review Post']!=null&&checkFormArray['Review Post']!=''&&checkFormArray['Review Post']!='undefined')){submitReview(revTitle,revPost,recUser);}else{alertObject.alertBox('EMPTY FORM!','If leaving a review, please make sure both the title and review are filled out.','alert',null,null,null);}}else if(checkFormArray['Rate this User']!='1'&&checkFormArray['Rate this User']!='2'&&checkFormArray['Rate this User']=='alrdyraMatch'){if((checkFormArray['Review Title']==null||checkFormArray['Review Title']==''||checkFormArray['Review Title']=='undefined')||(checkFormArray['Review Post']==null||checkFormArray['Review Post']==''||checkFormArray['Review Post']=='undefined')){alertObject.alertBox('ALERT!',emptyForm,'alert',null,null,null);}else{submitReview(revTitle,revPost,recUser);}}};function submitReview(revTitle,revPost){var response=$('#recaptcha_response_field').val();var challenge=$('#recaptcha_challenge_field').val();$(".submitBtn").unbind('click').html('Please wait...<img src="images/loaderSm.gif"/>');$(".startOverBtnBottom").hide();$(".secCodeRefresh").hide();$.ajax({type:"POST",url:'control/verifyUser.php',data:"type=advanced&user="+userName+"&pass="+passWord+"&ssSec="+ssSec+"&response="+response+"&challenge="+challenge+"",success:function(confirmi){if(confirmi!='X11'&&confirmi!='X10'){ssSec=confirmi;$("#loginAlert").html('Submitting review, Please wait...<img src="images/loaderSm.gif"/>');if(recUser==2){recommend='2';}else if(recUser==1){recommend='1';}else{recommend='alrdyraMatch';};var form=new Array();form={'di':'review','s6':chosenUser,'s1':userName,'s2':revTitle,'s3':revPost,'s4':recommend,'s5':ssSec,'s7':passWord};$.post("control/formValidate.php",{form:form},function(reviewConfirmation){var reviewConfirm=$.trim(reviewConfirmation);console.log(reviewConfirm);$('.reviewFormBase2').hide();if(reviewConfirm=='1'){$('#review-form').remove();$('.reviewFormBase1').css('height','80px');$('.reviewFormBase1 #post-form #loginFormBody').html('Thank you. Your rating/review was successfully submitted.<br/>Refresh the page to see the results.').css({'color':'#669900','text-align':'center'});$('.reviewFormBase1 #post-form').fadeIn('fast');}else if(reviewConfirm=='X10'){alertObject.alertBox('ALERT!',errorAlrt,'alert',null,null,null);}else if(reviewConfirm=='X13'){$('.reviewFormBase1').css({'height':'80px'});$('.reviewFormBase1 #post-form').css({'text-align':'center','height':'10px','color':'#990000'}).show();$('.reviewFormBase1 #post-form #loginFormBody').empty().html('We\'re sorry, but our records show that you\'ve already left a rating and review for this user.<br/>If you feel you are getting this message in error please feel free to contact us.');$('#review-account-greeting-btns #leaveReview').hide();}else if(reviewConfirm=='X14'){alertObject.alertBox('ALERT!',invalidUP,'ferror',reseter,null,null);}else{alertObject.alertBox('ALERT!',errorAlrt,'ferror',reseter,null,null);}});}else if(confirmi=='X11'){$("#loginAlert").empty();alertObject.alertBox('ALERT!',codeAlrt,'alert',null,null,null);$(".submitBtn").click(function(){checkForm();}).html('Submit');$(".startOverBtnBottom").show();$(".secCodeRefresh").show();secCodeRefresh();}else if(confirmi=='X10'){alertObject.alertBox('ALERT!',invalidUP,'ferror',reseter,null,null);}}});}
</script>