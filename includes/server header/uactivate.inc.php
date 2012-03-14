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
</div><!--register-form-->




<div id="register-successful" style="text-align:center;"></div>
</div><!--registerBase2-->
</div><!--activateBase1-->
</div><!--separator-->
</div><!--mainBase-->   
 <script>
 
var key='<? echo $key; ?>';var sec='<? echo $ssSec; ?>';var form=new Array();form={'di':'activation','s1':'user','s2':''+key+'','s3':''+sec+''};genTimerObject.genTimer();$.post("control/formValidate.php",{form:form},function(confirmation){clearTimeout(genericTimer);var confirmer=$.trim(confirmation);if(confirmer=='1'){$('#register-successful').html('<br/><br/>Thank you, your registration has been successfully activated.<br/><br/>Please <a href="login.html">click here</a> to log in.<br/><br/>Thank you again, and enjoy ZooFaroo!');$('#register-form').empty();}else if(confirmer=='2'){$('#register-successful').html('<br/><br/>Whoops!&nbsp;&nbsp;It looks like you\'ve already successfully registered.<br/><br/>Go ahead and try to log in.&nbsp;&nbsp;If you have trouble, please email us.<br/><br/>Thank you again, and enjoy ZooFaroo!');$('#register-form').empty();}else if(confirmer=='0'){alertObject.alertBox('ALERT!',errorAlrt,'ferror',errorReset,null,null);}});
</script>
<!--w5phmf^CPZocFUWU-->