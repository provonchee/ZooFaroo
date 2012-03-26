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

<div class="boxBasic recentBlogPost">
<hgroup class="sectionHeaderFormat blueHeader"><h2 id="index-title">Most Recent ZooFaroo Blog Post</h2></hgroup>
<div class="recentBlogWrap">
<div id="bTitle"></div><!--bTitle-->
Posted by:&nbsp;<div id="bAuthor"></div><!--bAuthor-->
<div id="bPost"></div><!--bPost-->
</div><!--recentBlogP-->
</div><!--boxBasic recentBlogPost-->

</div><!--separator-->
</div><!--mainBase-->
<script>
switch(Modernizr.localstorage){//if browser supports localStorage
case true:
if(localeObject.localeAction('state')){ chosenStateAlt = localeObject.localeAction('state'); if(localeObject.localeAction('city')){ chosenCityAlt = localeObject.localeAction('city'); window.open(''+baseHref+chosenStateAlt+'/'+chosenCityAlt+'.html', '_self'); localStorage.removeItem('zoofaroo_chosenState'); localStorage.removeItem('zoofaroo_chosenCity'); }else{ window.open(''+baseHref+chosenStateAlt+'.html', '_self'); localStorage.removeItem('zoofaroo_chosenState'); localStorage.removeItem('zoofaroo_chosenCity'); }} 
}
var myImagePR = new Image; myImagePR.src = "images/preloader.gif"; myImagePR.id = "preload"; 
$('.homeBase #preloader').append(myImagePR); 
$('.homeBase #preloader').show(); 
$('.homeBase #index-menu').empty().hide(); 
fetchStateObject.fetchStateArray('home'); 
function displayStates(sArray){ 
var t=1; for($i=0; $i<51; $i++){ 
if(t<6){ $('.homeBase #index-menu').append('<div style="display:inline;"><a href="'+sArray[$i][1]+'.html"style="text-decoration:underline;">'+sArray[$i][1].replace(/_/g, " ")+'</a></div>&nbsp;&nbsp;'); t++; 
}else{ 
$('.homeBase #index-menu').append('<div style="display:inline;"><a href="'+sArray[$i][1]+'.html"style="text-decoration:underline;">'+sArray[$i][1].replace(/_/g, " ")+'</a></div>&nbsp;&nbsp;<br/>'); t=1; } } 
$('.homeBase #preloader').empty(); $('.homeBase #index-menu').fadeIn('fast'); } 		
</script>
<? include_once('modules/map.inc.php'); ?>
<script>
$.post('control/recentBlogInput.php', function(data){
	var bData = jQuery.parseJSON(data);
	$('#bTitle').html(''+bData[1]+'');
	$('#bAuthor').html(''+bData[0]+'');
	$('#bPost').html(''+bData[2]+'');
	});
</script>

