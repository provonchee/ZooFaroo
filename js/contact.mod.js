 $('.contactBase1').hide();
 $('#email').val('');
 $('#emailMessage').val('');

 $('#email').focus(function(){
		$('#contact-alert').empty();
		});
  $('#emailMessage').focus(function(){
		$('#contact-alert').empty();
		});

$('.contactBase1').fadeIn('slow');

$('#contact-submitBtn').click(function(){
			contactSubmit();				   
});
function contactSubmit(){
							   
							   if($('#email').val()==""){
								   alertObject.alertBox('ALERT!', emptyForm, 'alert', null, null, null);
							   }else if($('#emailMessage').val()==""){
								  alertObject.alertBox('ALERT!', emptyForm, 'alert', null, null, null);
							   }else{
							   $('#contact-submitBtn').html('Please wait...<img src="images/loaderSm.gif"/>');
							   
							   var form = new Array();
							   form = {'di':'contact', 'e1':$('#email').val(), 's1':$('#emailMessage').val()};
									genTimerObject.genTimer();//start the timeout timer																												
								$.post("control/formValidate.php", {form:form}, function(returnConfirm) {
									clearTimeout(genericTimer);
												returnConfirm = $.trim(returnConfirm);
										 		if(returnConfirm=='1'){
														$('#contact-submitBtn').hide();
														$('.contactBase2').css('height', '80px');
														$('.contactBase1').css('height', '145px');
														$('.sectionHeaderFormat blueHeader #contact-title').html('Message Successfully Sent!');
														$('#contact-form').html('<div id="contact-successful-text">Thank you, your message has been successfully sent!</div>');
														
												 }else if(returnConfirm=='X10'){//error
													function reseter(){window.open(''+baseHref+'contact.html', '_self')};
													alertObject.alertBox('ALERT!', invalidUP, 'ferror', reseter, null, null);
												}
									});
							   
							   }
}