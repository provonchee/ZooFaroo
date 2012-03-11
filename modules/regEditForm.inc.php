<div id="register-form">
	<div class="boxBare registerBase3">
    
     <div class="registerBase3 maxLengthMsg"></div>

     <div id="register-option">Your City/Town:
     <input name="city" id="city" type="text" class="input" size="25"/></div>
    
     <div id="register-option">
	 <div id="stateDropDwn"></div><!--stateDropDwn--></div>
     
 	<div id="register-option">Email:
    <input name="email" id="email" type="text" class="input"  size="25"/></div>
  
    <div id="register-option">Username:
    <input name="username" id="username-input" class="input" type="text" size="25" maxlength="12"/></div>
    
    <div id="register-option">Password:
    <input name="password" id="password-input" class="input" type="password" size="25" maxlength="12"/></div>
    
   <div id="register-option">Confirm Password:
    <input name="passwordConfirm" id="passwordConfirm" class="input" type="password" size="25" maxlength="12"/></div>
    
    <div id="register-terms"><span style="color:#666666; font-size:0.95em;"><input type="checkbox" id="agree" name="agree" value="yes">&nbsp;By checking this box you agree to ZooFaroo's <a href="legal/ZooFaroo_Terms_of_Use.pdf">Terms of Use</a> and <a href="legal/ZooFaroo_Privacy_Policy.pdf">Privacy Policy</a></span></div>     
	<div id="register-zoofarooPromise">***ZooFaroo values your privacy and DOES NOT sell or share any of your registraion information.***</div>
    </div><!--registerBase3-->
    
  <div class="boxBasic registerBase3">
  <div id="register-optionalInfo">
  	<b><u>Optional Information</u></b><br/><br/>
    The information you give below will appear as links on your user profile and can be edited/removed by you at any time.  
    This is a great way for ZooFaroo members to get to know you a little bit before contacting you.  It helps personalize the whole
    experience and offers a 'soft' introduction while cultivating the confidence to make connections throughout the ZooFaroo community.  Fill in one, two, all of them, or none of them, it's up to you!</div>
    
  
    <div id="register-optional"><img src="images/facebookFollow.png" height="25" width="25" alt="Find us on Facebook!" style="border:none;"/>&nbsp;&nbsp;&nbsp;&nbsp;<div id="register-preaddress">http://www.facebook.com/</div>
    <input name="facebook" id="facebook-input" type="text" class="input"  size="35" maxlength="35"/></div>
    
    <div id="register-optional"><img src="images/twitterFollow.png" height="25" width="25" alt="Follow us on Twitter!" style="border:none;"/>&nbsp;&nbsp;&nbsp;&nbsp;<div id="register-preaddress">http://www.twitter.com/</div>
    <input name="twitter" id="twitter-input" type="text" class="input"  size="35" maxlength="35"/></div>
    
    <div id="register-optional"><img src="images/googlePlusFollow.png" height="25" width="25" alt="Follow us on Google Plus!" style="border:none;"/>&nbsp;&nbsp;&nbsp;&nbsp;<div id="register-preaddress">https://plus.google.com/</div>
    <input name="google" id="google-input" type="text" class="input"  size="35" maxlength="35"/></div>
    
    <div id="register-optional"><img src="images/linkedinFollow.png" height="25" width="25" alt="Check us out on LinkedIn!" style="border:none;"/>&nbsp;&nbsp;&nbsp;&nbsp;<div id="register-preaddress">http://www.linkedin.com/</div>
    <input name="linkedin" id="linkedin-input" type="text" class="input"  size="35" maxlength="35"/></div>
    
    <div id="register-optional"><img src="images/websiteFollow.png" height="25" width="25" alt="My own website" style="border:none;"/>&nbsp;&nbsp;Your Own Website:&nbsp;&nbsp;&nbsp;&nbsp;<div id="register-preaddress">http://www.</div>
    <input name="url" id="url-input" type="text" class="input"  size="35"/>&nbsp;<select id="urldr"><option>.com</option><option>.org</option><option>.edu</option><option>.net</option><option>.gov</option><option>.biz</option></select></div>
    
    <div id="register-optional"><img src="images/businessFollow.png" height="25" width="25" alt="I am a business" style="border:none;"/>&nbsp;&nbsp;Are you a business?
  	<input type="radio" name="business" id="business-input" value="2" /> yes&nbsp;&nbsp;<input type="radio" name="business" id="business-input" value="1"/> no<br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If yes, what is your business name?<input name="busName" id="busName" type="text" class="input"  size="35" maxlength="60"/></div>
      
     <div id="register-optionalInfo">*If you do not wish to include an item simply leave the input blank.</div>
    </div>
    
</div><!--register-form-->

<script>$('.secCodeRefresh').unbind('click').click(function(){secCodeRefresh();});
$('#busName').hide();
$("input[name='business']").unbind('click').click(function(){ 
	if($(this).val()==1){
		$('#busName').val('').hide();
	}else{
		$('#busName').fadeIn('fast');
	}
});</script>