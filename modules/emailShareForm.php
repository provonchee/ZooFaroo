<?php
$link = $_REQUEST['u'];
$oC = $_REQUEST['oC'];//oCategory
$oT = $_REQUEST['oT'];//oTitle
$nC = $_REQUEST['nC'];//nCategory
$nT = $_REQUEST['nT'];//nTitle
$oTAdj = $_REQUEST['oTAdj'];//oTitleAdj
$nTAdj = $_REQUEST['nTAdj'];//nTitleAdj
$linkLength = strlen($link);
?>
<div class="boxDrop">
	<img src="images/zoofaroo.jpg" alt='ZooFaroo - Be social.  Trade local.' height=45 style="border:none; margin-top:6px; margin-left:5px;"/>
	<h2 id="emailShare-title" style="float:right; font-size:1em; margin-right:15px; margin-top:30px;">Share this ZooFaroo Posting</h2>
</div>
	
    <div class="boxDrop emailShare-body">
    <br/>
 	<div id="emailShare-sender">Your Email:
    <input name="senderEmail" id="senderEmail" type="text"  size="35"  maxlength="40"/><span style="color:#666666;">&nbsp;&larr;You must be a registered user</span></div>
    <br/>
    <div id="emailShare-senderPW">Your Password:
    <input name="senderPassword" id="senderPassword" type="password"  size="35"  maxlength="12"/><span style="color:#666666;">&nbsp;&larr;You must be a registered user</span></div>
    <br/>
    <div id="emailShare-recipient">Recipient's Email:
    <input name="recipientEmail" id="recipientEmail" type="text"  size="35"  maxlength="40"/><span style="color:#666666;">&nbsp;&larr;Only one email address</span></div>
 
    <div class ="boxGradient emailShare-message">
    		<div id="post-offerPosting">
            <div id="post-offerIcon">
            <div id="thePost-offerTag">offered</div>
            </div>
            <div id="post-offerTitle">
            <span style="color:#777; font-size:0.9em">-&nbsp;(<? echo str_replace("_", "", $oC); ?>)-&nbsp;</span><b><? echo stripslashes($oTAdj); ?></b>
            </div>
            </div>
            <div id="post-needPosting">
            <div id="post-needIcon">
            <div id="thePost-needTag">needed</div>
            </div>
            <div id="post-needTitle"><span style="color:#777; font-size:0.9em">-&nbsp;(<? echo str_replace("_", "", $nC); ?>)-&nbsp;</span><b><? echo stripslashes($nTAdj); ?></b></div>
            </div>
             
            <div id="emailShare-link"><div id="post-genericTag">link:</div>&nbsp;<div id="emailShare-postingLink"><? echo $link;?></div></div>
            
           
	</div><!--emailShare-message-->
    
    <div id="emailShare-submitBtn"><div class='buttonWrap'>Send Email</div></div>

<div id="emailShare-closeBtn"><div class='buttonWrap'>Cancel</div></div>
</div>
<div id="emailShare-alert"></div>


 <script>
if($('#emailShare-postingLink').text().length>85){
	var adjustedLink = $.trim($('#emailShare-postingLink').text().slice(0, 80));
	$('#emailShare-postingLink').html(adjustedLink+'...');
}
 $('#senderEmail').val('');
 $('#recipientEmail').val('');

$('#emailShare-submitBtn').click(function(){
	if($('#senderEmail').val()=="" || $('#recipientEmail').val()==""){
		alertObject.alertBox('ALERT!', emptyForm, 'gerror', null, '.postBaseShare', null);
	}else{
		contactSubmit();		
	}
});
		
$('#emailShare-closeBtn').click(function(){
			$('#alertScreen').css({'display':'none'});$('.postBaseShare').css({'display':'none'});		   
								   							
});
function contactSubmit(){
								$('#emailShare-submitBtn').unbind('click').html('<div class="buttonWrap">Sending...</div>');
							   	$('#emailShare-alert').css('color','#333333').html('Please wait...<img src="images/loaderSm.gif"/>');
								var oC = '<? echo $oC; ?>';
								var oT = '<? echo $oT; ?>';
								var nC = '<? echo $nC; ?>';
								var nT = '<? echo $nT; ?>';
								var urlLink = '<? echo $link; ?>';
										 
								var form = new Array();
								form = {'di':'emailShare', 'e1':$('#senderEmail').val(), 'e2':$('#recipientEmail').val(), 's1':$('#senderPassword').val(), 's2':oC, 's3':oT, 's4':nC, 's5':nT, 'u1':urlLink}; 
								$.post('control/formValidate.php', {form:form}, function(data) {
									data = $.trim(data);		
										 if(data=="1"){
											 $('#emailShare-submitBtn').html('<div class="buttonWrap">Email Sent!</div>');
											  $('#emailShare-closeBtn').html('<div class="buttonWrap">Close</div>');
											$('#emailShare-alert').css('color','#FF0000').html('Thank you, your message has been successfully sent!');
										 }else if(data=="X10"){
											 $('#emailShare-submitBtn').html('<div class="buttonWrap">Error!</div>');
											  $('#emailShare-closeBtn').html('<div class="buttonWrap">Close</div>');
											$('#emailShare-alert').css('color','#FF0000').html('Sorry, there was an error while trying to send your email, please try again later.'); 
										 }else{
											$('#emailShare-submitBtn').html('<div class="buttonWrap">Error!</div>');
											 $('#emailShare-closeBtn').html('<div class="buttonWrap">Close</div>');
											$('#emailShare-alert').css('color','#FF0000').html('You must be a registered user to send emails.  Why not register?  It\'s free!'); 
										 }
									});
}
</script>