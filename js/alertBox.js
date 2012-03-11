var alertObject = {
	alertBox:function(hdr, msg, choice, act, whichKind, whichOne){
		var action = act;
		$('#alertScreen').css({'display':'block', 'opacity':'0.75', 'filter':'alpha(opacity=75)', 'width':$(document).width(), 'height':$(document).height()});
		if($(window).width()<1200){
		$('#alertScreen').css({'-webkit-transform':'scale(1.11)', '-moz-transform':'scale(1.11)', '-o-transform':'scale(1.11)', '-ms-transform':'scale(1.11)',  'margin-top':'0%'});
		}
		
		$('.alert').css({'display':'block'});
		$('.alert #alertHdrImg').html(''+alertHdrImg+'');
		$('.alert #alertHdr').html(''+hdr+'');
		$('.alert #alertMsg').html(''+msg+'');
		var scrollTop = $(window).scrollTop();
		if(navigator.appName=='Microsoft Internet Explorer'){
		var scrollTop = $('html').scrollTop();
		}
		var scrollAdjust = scrollTop-150;
		$('.alert').css({'margin-top':scrollAdjust+'px'});
		if(choice=='alert'){//basic alert with an okay button which closes the alert and clears the alert screen
			$('.alert .alertOkayBtn').remove();
			$('.alert .alertContinueBtn').remove();
			$('.alert').append('<div class="buttonWrap alertOkayBtn">Okay</div>');
			$('.alert .alertOkayBtn').click(function(){$('#alertScreen').css({'display':'none'});$('.alert').css({'display':'none'});});
		}else if(choice=='load'){//basic alert without okay button
			$('.alert .alertOkayBtn').remove();
			$('.alert .alertContinueBtn').remove();
		}else if(choice=='ferrorLoad'){//basic alert without okay button but allows for multiple screens
			$('.alert .alertOkayBtn').remove();
			$('.alert .alertContinueBtn').remove();
			//hide the floating window below the alert
			function layerA(vari){
			$(vari).toggle();
			}
			layerA(whichKind);
		}else if(choice=='ferror'){//an alert that needs to be cleared (via okay button) before follow up funciton is fired
			$('.alert .alertOkayBtn').remove();
			$('.alert .alertContinueBtn').remove();
			$('.alert').append('<div class="buttonWrap alertOkayBtn">Okay</div>');
			$('.alert .alertOkayBtn').click(function(){action(whichOne);$('#alertScreen').css({'display':'none'});$('.alert').css({'display':'none'});});
			
		}else if(choice=='gerror'){///USE THIS ALERT WHEN YOU HAVE AN ALERT OVER A FLOATING WINDOW--IT ALLOWS FOR THE SCREEN TO REMAIN WHEN THE USER CLEARS THE ALERT, AND HIDES THE FLOATING WINDOW WHILE THE ALERT IS UP
			$('.alert .alertOkayBtn').remove();
			$('.alert .alertContinueBtn').remove();
			$('.alert').append('<div class="buttonWrap alertOkayBtn">Okay</div>');
			//hide the floating window below the alert
			function layerA(vari){
			$(vari).toggle();
			}
			layerA(whichKind);
			$('.alert .alertOkayBtn').click(function(){layerA(whichKind);$('.alert').css({'display':'none'});});
			
		}else if(choice=='gerrorPlus'){///SAME AS GERROR BUT ADDS AN ADDITIONAL FUNCTION TO BE CALLED WHEN THE ALERT BOX IS CLEARED
			$('.alert .alertOkayBtn').remove();
			$('.alert .alertContinueBtn').remove();
			$('.alert').append('<div class="buttonWrap alertOkayBtn">Okay</div>');
			//hide the floating window below the alert
			function layerA(vari){
			$(vari).toggle();
			}
			layerA(whichKind);
			$('.alert .alertOkayBtn').click(function(){layerA(whichKind); action(whichOne); $('.alert').css({'display':'none'});});
		}else if(choice=='decision'){//user needs to make a decision to follow through with a function or cancel it
			$('.alert .alertOkayBtn').remove();
			$('.alert .alertContinueBtn').remove();
			$('.alert').append('<div class="buttonWrap alertOkayBtn">Cancel</div>&nbsp;&nbsp;<div class="buttonWrap alertContinueBtn">Continue</div>');
			$('.alert .alertOkayBtn').click(function(){$('#alertScreen').css({'display':'none'});$('.alert').css({'display':'none'});});
			$('.alert .alertContinueBtn').click(function(){action(whichKind, whichOne);
																  if(chosenPage!='edit'){
																	 $('#alertScreen').css({'display':'none'});
																  }
			
																  $('.alert').css({'display':'none'});});
		}
	}
}