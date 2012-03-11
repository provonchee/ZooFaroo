var shareObject = {
	shareBox:function(emailOfferTitleAdj, emailNeedTitleAdj, url, oC, oT, nC, nT){
		$('#alertScreen').css({'display':'block', 'opacity':'0.5', 'filter':'alpha(opacity=50)', 'width':$(document).width(), 'height':$(document).height()});
		if($(window).width()<1200){
		$('#alertScreen').css({'-webkit-transform':'scale(1.11)', '-moz-transform':'scale(1.11)', '-o-transform':'scale(1.11)', '-ms-transform':'scale(1.11)',  'margin-top':'0%'});
		}
		$('.postBaseShare').css({'display':'block'});
		var scrollTop = $(window).scrollTop();
		if(navigator.appName=='Microsoft Internet Explorer'){
		var scrollTop = $('html').scrollTop();
		}
		var scrollAdjust = scrollTop-250;
		$('.postBaseShare').css({'margin-top':scrollAdjust+'px'});
		
		$('.postBaseShare').load("modules/emailShareForm.php?oTAdj="+emailOfferTitleAdj+"&nTAdj="+emailNeedTitleAdj+"&u="+url+"&oC="+oC+"&oT="+oT+"&nC="+nC+"&nT="+nT+"", function(){
																															
																															});
	}
}