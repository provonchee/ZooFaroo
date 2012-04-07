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
</script>