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
$userID = $_REQUEST['user'];
$tally= $_REQUEST['tally'];
?>

<div class="activateBase1">
<div class="boxGradientDrop registerBase2" style="margin-top:-100px;">
<div class="sectionHeaderFormat blueHeader"><h2 id="register-title">ZooFaroo Posting Activation</h2></div>

<div id="register-form" style="width:600px;">
<br/>
</div><!--register-form-->

<div id="register-successful" style="text-align:center;"></div>
</div><!--registerBase2-->
</div><!--activateBase1-->
</div><!--separator-->
</div><!--mainBase-->   
 <script>
 	var pCategory=null;
 	var pON = null;
	var pTally = <? echo $tally; ?>;
	var key = '<? echo $key; ?>';
	var uid = <? echo $userID; ?>;

	if(pTally&&key&&uid){
				var form = new Array();
				form = {'di':'activation', 's1':'post', 's2':''+key+'', 's3':''+uid+''};
				genTimerObject.genTimer();//start the timeout timer	
				$.post("control/formValidate.php", {form:form},
					function(confirmation){
						clearTimeout(genericTimer);
						var confirmer = $.trim(confirmation);
					
						if(confirmer!='X10'){
						
						linkInfo = jQuery.parseJSON(confirmer);
						
						if(linkInfo[0][0]=='alreadyCleared' && linkInfo[1][0]=='alreadyCleared'){
							$('#register-successful').html('Whoops!&nbsp;&nbsp;It looks like these posting(s) have already been cleared and are active on ZooFaroo.<br/><br/>Please check to see if they are available.&nbsp;&nbsp;If not, please email us with the details. <br/><br/>Thank you for choosing ZooFaroo!');
						 	$('#register-form').empty();
						 }else if(linkInfo[0][0]=='notFound' && linkInfo[1][0]=='notFound'){
							$('#register-form').empty();
							$('#register-successful').html('An error has ocurred while trying to activate your posting.&nbsp;&nbsp;We are sorry for the inconvenience.<br/><br/>Please return to your posting email and try the link again.<br/><br/>If you continue to have trouble activating your posting, please email us.');
						 }else{
							 
							 if(pTally==1){//just one post
									
										pCategory = linkInfo[0][4];
										pON = linkInfo[0][1];
									
								$('#register-successful').html('Thank you, your posting has been successfully activated.&nbsp;&nbsp;Please <a href="'+linkInfo[0][2]+'/'+linkInfo[0][3]+'/'+pON+'/'+pCategory+'/'+linkInfo[0][0]+'.html">click here to see your posting.</a><br/><br/>You may edit or delete your postings by visiting the \'edit postings/account\' page.<br/><br/>Thank you again, and enjoy ZooFaroo!');
							 	$('#register-form').empty();
							 }else{//more than one post
								 $('#register-successful').html('Thank you, your&nbsp;'+pTally+'&nbsp;postings have been successfully activated!<br/><br/>');
								 for(i=0; i<pTally; i++){
									
											pCategory = linkInfo[i][4];
											pON = linkInfo[i][1];
									
									 var j=i+1;
								 $('#register-successful').append('Please <a href="'+baseHref+linkInfo[i][2]+'/'+linkInfo[i][3]+'/'+pON+'/'+pCategory+'/'+linkInfo[i][0]+'.html">click here to see posting&nbsp;#'+j+'</a><br/><br/>');
								 }
								 $('#register-successful').append('You may edit or delete your postings by visiting the \'edit postings/account\' page.<br/><br/>Thank you again, and enjoy ZooFaroo!');
							 	$('#register-form').empty();
							 }
						 }
						 
						}else{
							alertObject.alertBox('ALERT!', errorAlrt, 'ferror', errorReset, null, null); 	
						}
						
					});
	}else{
		window.open(''+baseHref+'home.html', '_self');
	}
</script>