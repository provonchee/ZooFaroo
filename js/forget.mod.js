$('.forgetBase1').hide();
$('#username-input').val('');
$('.forgetBase1').fadeIn('slow');
$('#forget-submitBtn').click(function(){
			forgetSubmit();				   							   							
});
$('#username-input').unbind('keypress').keypress(function(e){
								 if(e.which==13){
									forgetSubmit(); 
								 }
						   });
$('#email-input').unbind('keypress').keypress(function(e){
	 if(e.which==13){
		forgetSubmit(); 
	 }
});
function forgetSubmit(){
							   var username = $("#username-input").val();
							    var email = $("#email-input").val();
							   if($('#username-input').val()=="" || $("#email-input").val()==""){
								   alertObject.alertBox('ALERT!', emptyForm, 'alert', null, null, null);
							   }else{
							   $('#forget-submitBtn').hide();
							   $('#forget-alert').html('Please wait...<img src="images/loaderSm.gif"/>');
							   genTimerObject.genTimer();//start the timeout timer
							   var form = new Array();
								form = {'di':'forget', 's1':username, 'e1':email}; 
								$.post('control/formValidate.php', {form:form}, function(data) {	
								clearTimeout(genericTimer);
									data = $.trim(data);
										 if(data=='1'){
											 $('#forget-form').fadeOut('fast', function(){
																						$('#forget-alert').empty();
																						$('.forgetBase2').css('height', '170px');
																						  $('.sectionHeaderFormat blueHeader #register-title').html('Password Successfully Sent!');
																						  $('#forget-form').html('<center><div id="forget-successful-text">Your username and password have been successfully submitted!&nbsp;&nbsp;Your password has been sent to the email address you registered with.<br/><br/><b>If you don\'t see it immediately be sure to check your email\'s junk and spam folders.</b><br/>Thank you for choosing ZooFaroo!</div></center>');
																						 $('#forget-form').fadeIn('slow');
																						 });
										 }else if(data=='X10'){
											 $('#forget-submitBtn').show();
											 $('#forget-alert').empty();
											 alertObject.alertBox('ALERT!', errorAlrt, 'alert', null, null, null);
										 }else if(data=='X11'){
											 $('#forget-submitBtn').show();
											 $('#forget-alert').empty();
											 alertObject.alertBox('ALERT!', invalidEM, 'alert', null, null, null);
										 }else if(data=='X12'){
											 $('#forget-submitBtn').show();
											 $('#forget-alert').empty();
											 alertObject.alertBox('ALERT!', invalidUN, 'alert', null, null, null);
										 }
									
									});
							   
							   }
}