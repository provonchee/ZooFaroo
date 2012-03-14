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
<div class="boxBasic contactBase1">
<div id="breadCrumbs"><? echo $breadCrumbs; ?></div><!--breadCrumbs-->
<div class="boxGradientDrop contactBase2">
<div class="sectionHeaderFormat blueHeader"><h2 id="contact-title">Contact ZooFaroo</h2></div>
<div id="contact-form">
Questions?&nbsp;&nbsp;Comments?&nbsp;&nbsp;Find a bug?&nbsp;&nbsp;Have a suggestion?&nbsp;&nbsp;Let us know, we'd love to hear from you.
 	<div id="contact-email">Your Email:
    <input name="email" id="email" type="text"  class="input" size="35"/></div>
    
    <div id="contact-message">Your Message:<br/><TEXTAREA NAME="emailMessage" id="emailMessage" class="textarea" COLS=93 ROWS=4></TEXTAREA> </div>
    <div id="contact-submitBtn"><div class='buttonWrap'>Send</div></div>
</div><!--contact-form-->

</div>
</div><!--contact-mainMenu-->
</div><!--separator-->
</div><!--mainBase-->

   
 <script>

$('.contactBase1').hide();$('#email').val('');$('#emailMessage').val('');$('#email').focus(function(){$('#contact-alert').empty();});$('#emailMessage').focus(function(){$('#contact-alert').empty();});$('.contactBase1').fadeIn('slow');$('#contact-submitBtn').click(function(){contactSubmit();});function contactSubmit(){if($('#email').val()==""){alertObject.alertBox('ALERT!',emptyForm,'alert',null,null,null);}else if($('#emailMessage').val()==""){alertObject.alertBox('ALERT!',emptyForm,'alert',null,null,null);}else{$('#contact-submitBtn').html('Please wait...<img src="images/loaderSm.gif"/>');var form=new Array();form={'di':'contact','e1':$('#email').val(),'s1':$('#emailMessage').val()};genTimerObject.genTimer();$.post("control/formValidate.php",{form:form},function(returnConfirm){clearTimeout(genericTimer);returnConfirm=$.trim(returnConfirm);if(returnConfirm=='1'){$('#contact-submitBtn').hide();$('.contactBase2').css('height','80px');$('.contactBase1').css('height','145px');$('.sectionHeaderFormat blueHeader #contact-title').html('Message Successfully Sent!');$('#contact-form').html('<div id="contact-successful-text">Thank you, your message has been successfully sent!</div>');}else if(returnConfirm=='X10'){function reseter(){window.open(''+baseHref+'contact.html','_self')};alertObject.alertBox('ALERT!',invalidUP,'ferror',reseter,null,null);}});}}
</script>
