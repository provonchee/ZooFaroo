var form = new Array();
				form = {'di':'activation', 's1':'user', 's2':''+key+'', 's3':''+sec+''};
				genTimerObject.genTimer();//start the timeout timer	
				$.post("control/formValidate.php", {form:form},
					function(confirmation){
						clearTimeout(genericTimer);
						var confirmer = $.trim(confirmation);
						
						if(confirmer=='1'){
							$('#register-successful').html('<br/><br/>Thank you, your registration has been successfully activated.<br/><br/>Please <a href="login.html">click here</a> to log in.<br/><br/>Thank you again, and enjoy ZooFaroo!');
							$('#register-form').empty();
						 }else if(confirmer=='2'){
							$('#register-successful').html('<br/><br/>Whoops!&nbsp;&nbsp;It looks like you\'ve already successfully registered.<br/><br/>Go ahead and try to log in.&nbsp;&nbsp;If you have trouble, please email us.<br/><br/>Thank you again, and enjoy ZooFaroo!');
						 	$('#register-form').empty();
						 }else if(confirmer=='0'){
							alertObject.alertBox('ALERT!', errorAlrt, 'ferror', errorReset, null, null);
						 }
						
					});