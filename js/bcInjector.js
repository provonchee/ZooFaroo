var bcObject = {
	bcInjector:function(){
if(chosenPage!='state' && chosenPage!='city' && chosenPage!='postList' && chosenPage!='thePost' && chosenPage!='post' && chosenPage!='search' && chosenPage!='searchAdvanced'){
if(localeObject.localeAction('state')||localeObject.localeAction('city')){
	var bcCity = localeObject.localeAction('city');
	var bcState = localeObject.localeAction('state');
	if(bcCity&&bcState&& bcCity!=bcState){
		$('#breadCrumbs').append('&nbsp;&nbsp;&nbsp;&nbsp;<u><div id="bcRegion"><a href="login.html">United States</a></div><div id="bcState">&nbsp;&hArr;&nbsp;<a href="'+localeObject.localeAction('state')+'.html">'+bcState.replace(/_/g, " ")+'</a></div>&nbsp;&hArr;&nbsp;<a href="'+localeObject.localeAction('state')+'/'+localeObject.localeAction('city')+'.html">'+bcCity.replace(/_/g, " ")+'</a></u>');
	}else if(bcCity&&bcState && bcCity==bcState){
		$('#breadCrumbs').append('&nbsp;&nbsp;&nbsp;&nbsp;<u><div id="bcRegion"><a href="login.html">United States</a></div>&nbsp;&hArr;&nbsp;<a href="'+localeObject.localeAction('state')+'/'+localeObject.localeAction('city')+'.html">'+bcCity.replace(/_/g, " ")+'</a></u>');
	}else if(bcState){
		$('#breadCrumbs').append('&nbsp;&nbsp;&nbsp;&nbsp;<u><a href="login.html">United States</a>&nbsp;&hArr;&nbsp;<a href="'+localeObject.localeAction('state')+'.html">'+bcState.replace(/_/g, " ")+'</a></u>');
	}
}
}
if($('#bcState').text()==$('#bcCity').text()){
	$('#bcState').hide();
}
$("#breadCrumbs .backBtn").unbind("click").click(function(){refreshBackOne();});
}
}