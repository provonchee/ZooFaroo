<div id="loginFormBody"><label id="usernameLabel">Username:&nbsp;</label><input name="usernameInput" class="input" id="usernameInput" type="text" size="22" maxlength="20"/>&nbsp;&nbsp; <label id="passwordLabel">Password:&nbsp;</label><input name="passwordInput" id="passwordInput" class="input"  type="password" size="22" maxlength="20"/>&nbsp;&nbsp;<div class='buttonWrap nextBtn'>Next</div>
<div id="loginAlert">Not registered? <a href="register.html">Register here,&nbsp;it's free!</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="forget.html">Forgot your password?</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="smarter.html">Barter Smarter!</a></div></div>

<script>
$('#usernameInput').val('');
	$('#passwordInput').val('');
	$('#usernameInput').unbind('keypress').keypress(function(e){
								 if(e.which==13){
									 userName = $('#usernameInput').val();
									 passWord = $('#passwordInput').val();
									 if(userName!="" && passWord!=""){
										lValidate(userName, passWord, 'form');
									 }else{
										alertObject.alertBox('ALERT!', emptyForm, 'alert', null, null, null);	 
									 }
								 }
						   });
							$('#passwordInput').unbind('keypress').keypress(function(e){
								 if(e.which==13){
									userName = $('#usernameInput').val();
									 passWord = $('#passwordInput').val();
									 if(userName!="" && passWord!=""){
										lValidate(userName, passWord, 'form');
									 }else{
										alertObject.alertBox('ALERT!', emptyForm, 'alert', null, null, null);	 
									 }  
								 }
						   });
						   
						   	$('.nextBtn').unbind('click').click(function(){
								   userName = $('#usernameInput').val();
									 passWord = $('#passwordInput').val();
									 if(userName!="" && passWord!=""){
										lValidate(userName, passWord, 'form');
									 }else{
										alertObject.alertBox('ALERT!', emptyForm, 'alert', null, null, null);	 
									 }  
								 });
								 
								 
								 
								 
function loginConfirmed(sdata, iddata, un){
	
	switch(chosenPage){
		
	case 'post':
	chosenUserID = iddata;
	ssSec = sdata;
	$('.loginBase2').html('<div class="sectionHeaderFormat grayHeader"><h2 id="header-title">Post Your Own Offers and Needs!</h2></div>');
	$('#postingForms').fadeIn('fast');//postingForms fade in
	$('#post-message').show();
	$('#post-Explained').show();
	$('.startOverBtnBottom').unbind('click').click(function(){window.location.reload();});
	$('.secCodeRefresh').unbind('click').click(function(){secCodeRefresh();}); ///REFRESH captcha
	$('.submitBtn').unbind('click').click(function(){
				submitBtnAction();
	});//submitBtn
	break;
	
	case 'thePost':

		ssSec = sdata;
		$('#postShare-layout #postReply-form').empty();
		$('#postingForms').fadeIn('fast');
		$('.postReplySecCode').hide();
		$('#postReply-message').val('').show();
		$('.secCodeRefresh').unbind('click').click(function(){javascript:Recaptcha.reload();});
		$('.submitBtn').unbind('click').click(function(){
				submitBtnAction();							 		  
		});//submitBtn
		replyierHeight = 660;
		loaderTimer = setInterval('postHeightAdjuster()', 100);																		 
	
	break;
	
	case 'edit':
	ssSec = sdata;
	chosenUserID = iddata;
	chosenUser = un;
	$('.loginBase2').html('<div class="sectionHeaderFormat grayHeader"><h2 id="header-title">Your ZooFaroo User Account</h2></div>');
	retrieveEditList(ssSec);
	break;
	
	case 'user':
	ssSec = sdata;
	$('.reviewFormBase1').css({'height':'auto'}); 
	$('.reviewFormBase1 #post-form').hide();
	$('.reviewFormBase1 .reviewFormBox').fadeIn('slow');
	$('.reviewFormBase1 #review-form').fadeIn('fast');
	$('.submitBtn').unbind('click').click(function(){
			checkForm();									   
	 });//review-submitBtn
	break;
	
	case 'login':
	ssSec = sdata;
	$('.loginBase2 #post-form').hide();
	$('.loginBase2 .grayHeader #header-title').html('You are currently logged in<div id="logStatus"><div class="logOut" style="float:right; color:#FFF;"></div></div>');
	break;
	
	}//switch
}
</script>