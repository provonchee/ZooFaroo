<?php
// Redirect if this page was accessed directly:
if (!defined('BASE_URL')) {

	// Need the BASE_URL, defined in the config file:
	require_once ('../config/config.inc.php');
	
	// Redirect to the index page:
	$url = BASE_URL . 'index.php';
	header ("Location: $url");
	exit;
	
} // End of defined() IF.
?>
<div class="boxBasic homeBase">
<hgroup class="sectionHeaderFormat blueHeader"><h2 id="index-title">Welcome to ZooFaroo - the online barter community.</h2></hgroup>

<div id="index-Map"><img height="289" width="460" alt="" src="images/usa.gif" usemap="#map_usa" id="usa"/></div>
<div id="preloader"></div>

<div id="index-menu">
</div><!--index-menu-->
</div><!--boxDrop homeBase-->
</div><!--separator-->
</div><!--mainBase-->
<script>
if(localeObject.localeAction('state')){ chosenStateAlt = localeObject.localeAction('state'); if(localeObject.localeAction('city')){ chosenCityAlt = localeObject.localeAction('city'); window.open(''+baseHref+chosenStateAlt+'/'+chosenCityAlt+'.html', '_self'); localStorage.removeItem('zoofaroo_chosenState'); localStorage.removeItem('zoofaroo_chosenCity'); }else{ window.open(''+baseHref+chosenStateAlt+'.html', '_self'); localStorage.removeItem('zoofaroo_chosenState'); localStorage.removeItem('zoofaroo_chosenCity'); }} var myImagePR = new Image; myImagePR.src = "images/preloader.gif"; myImagePR.id = "preload"; $('.homeBase #preloader').append(myImagePR); $('.homeBase #preloader').show(); $('.homeBase #index-menu').empty().hide(); fetchStateObject.fetchStateArray('home'); function displayStates(sArray){ var t=1; for($i=0; $i<51; $i++){ if(t<6){ $('.homeBase #index-menu').append('<div style="display:inline;"><a href="'+sArray[$i][1]+'.html"style="text-decoration:underline;">'+sArray[$i][1].replace(/_/g, " ")+'</a></div>&nbsp;&nbsp;'); t++; }else{ $('.homeBase #index-menu').append('<div style="display:inline;"><a href="'+sArray[$i][1]+'.html"style="text-decoration:underline;">'+sArray[$i][1].replace(/_/g, " ")+'</a></div>&nbsp;&nbsp;<br/>'); t=1; } } $('.homeBase #preloader').empty(); $('.homeBase #index-menu').fadeIn('fast'); } 		
</script>
<? include_once('modules/map.inc.php'); ?>