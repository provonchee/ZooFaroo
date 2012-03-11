var genTimerObject = {
	genTimer:function(){
		function pageRefresh(){window.location.reload();}
		genericTimer = setTimeout('alertObject.alertBox("ALERT!", errorAlrt, "ferror", pageRefresh, null, null)', 10000);
	}
}
//clearTimeout(genericTimer);