var pOffense = "Is this posting offensive?";
var rOffense = "Is this review offensive?";
var reportA = "Is this posting offensive?";
function sendReport(idNum, kind){
						var aform = new Array();
						aform = {'di':'contact', 'e1':'abusereport@zoofaroo.com', 's2':'abuse report on posting:'+idNum+'&nbsp;&nbsp;Kind:'+kind+''};
																																	
						$.post("control/formValidate.php", {form:aform},
								function(data) {
									data=$.trim(data);
									if(data=='1'){
										alertObject.alertBox('THANK YOU', "An abuse report has been sent.", 'alert', null, null, null);
									}else{
										alertObject.alertBox('ALERT!', errorAlrt, 'alert', null, null, null);	
									}
						   });
}