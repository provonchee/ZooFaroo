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
<div class="boxBare cityBase">
    <div id="breadCrumbs"><? echo $breadCrumbs; ?></div><!--breadCrumbs-->
    <div id="preloader"></div>
    <h2 id="welcomeMsg" style="display: block;"></h2>
    <div id='dynamicSubHeader'><div id='dynamicMsg'></div>
</div>

<div class="boxBasic wildCardBase">Want to browse all the 'offers' or all the 'needs' at once?<div class="buttonWrap wildCardBtn">Show all <span style="color:#FF9900;">needs</span> in this area!</div><div class="buttonWrap wildCardBtn">Show all <span style="color:#669900;">offers</span> in this area!</div></div>
<script>$('#welcomeMsg').hide();$('#dynamicSubHeader').hide();$('.wildCardBase').hide();</script>
<div id="city-results">
	<div class="sectionHeaderFormat blueHeader city-servicesTag">Services</div>
	<div class="boxBasic cityServicesBase"></div><!--services-->

	<div class="sectionHeaderFormat blueHeader city-goodsTag">Goods</div>
	<div class="boxBasic cityGoodsBase"></div><!--goods-->
</div><!--city-results-->
</div><!--cityBase-->
</div><!--separator-->
</div><!--mainBase-->

<script>
	var requestCity = '<? echo $city; ?>';
	var requestState = '<? echo $state; ?>';
	var stateDisplay = '<? echo $stateDisplay; ?>';
	var cityDisplay = '<? echo $cityDisplay; ?>';
	
$.getScript('js/city.mod.js');
</script>