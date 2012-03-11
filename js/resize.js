
$(window).bind("resize", function(){//Adjusts image when browser resized

if($(window).width()<1200){
	$('body').css({'-webkit-transform':'scale(0.9)', '-moz-transform':'scale(0.9)', '-o-transform':'scale(0.9)', '-ms-transform':'scale(0.9)',  'margin-top':'-2%'});
	 if($('#alertScreen').is(':visible')){
		$('#alertScreen').css({'display':'block', 'opacity':'0.5', 'filter':'alpha(opacity=50)','width':$(document).width(), 'height':$(document).height()});
		$('#alertScreen').css({'-webkit-transform':'scale(1.11)', '-moz-transform':'scale(1.11)', '-o-transform':'scale(1.11)', '-ms-transform':'scale(1.11)',  'margin-top':'0%'});
 	}; 
}else{
	$('body').css({'-webkit-transform':'inherit', '-moz-transform':'inherit', '-o-transform':'inherit', '-ms-transform':'inherit',  'margin-top':'0%'});
	 if($('#alertScreen').is(':visible')){
		$('#alertScreen').css({'display':'block', 'opacity':'0.5', 'filter':'alpha(opacity=50)','width':$(document).width(), 'height':$(document).height()});
		$('#alertScreen').css({'-webkit-transform':'inherit', '-moz-transform':'inherit', '-o-transform':'inherit', '-ms-transform':'inherit',  'margin-top':'0%'});
 	}; 
}
 });

$(document).ready(function(){
if($(window).width()<1200){
	$('body').css({'-webkit-transform':'scale(0.9)', '-moz-transform':'scale(0.9)', '-o-transform':'scale(0.9)', '-ms-transform':'scale(0.9)', 'margin-top':'-2%'});
	
}else{
	$('body').css({'-webkit-transform':'inherit', '-moz-transform':'inherit', '-o-transform':'inherit', '-ms-transform':'inherit', 'margin-top':'0%'});
}

								  

});