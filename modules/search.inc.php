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
<div id="breadCrumbs"><? echo $breadCrumbs; ?></div><!--breadCrumbs-->

<div class="boxBasic searchBase1"><script>$('.searchBase1').hide();</script>
<div class="sectionHeaderFormat blueHeader"><h2 id="index-title">Search ZooFaroo - Be social.  Trade local.</h2></div>
<div id="advancedBtn"><div class='buttonWrap'>Advanced Search</div></div>

<div class="boxBasic searchBase2">
        <div class="sectionHeaderFormat ltGrayHeader sectionHeader3">Where to begin your search?</div>
       <div id="stateDropDwn" style="margin-left:350px;"></div><!--stateDropDwn-->
       <div id="cityDropDwn" style="margin-left:350px;"></div><!--cityDropDwn-->
       </div><!--searchBase2-->
<br/>
<div class="boxBasic searchBase2">
        <div class="sectionHeaderFormat ltGrayHeader sectionHeader3">Within which category?</div>
		<div id="search-categoryList"><input type="radio" name="search_goodService" id='g' value="Goods"> Goods &nbsp;&nbsp;<input type="radio" name="search_goodService" id='s' value="Services">Services</div><!--categories-->
</div><!--searchBase2-->

<br/>
<div class="boxBasic searchBase2">
        <div class="sectionHeaderFormat ltGrayHeader sectionHeader3">Searching for an Offer or a Need?</div>
        <div id="search-OfferNeedMsg">Are you searching for something someone has to offer?&nbsp;&nbsp;Or are you searching for something someone needs?</div>
		<div id="search-OfferNeedBtns"><input type="radio" name="search_offerNeed" value="Offered"> Offered &nbsp;&nbsp;<input type="radio" name="search_offerNeed" value="Needed">Needed&nbsp;&nbsp;<input type="radio" name="search_offerNeed" value="Both">Both&nbsp;&nbsp;</div><!--Offer or Need-->
</div><!--searchBase2-->

<br/>
<div class="boxBasic searchBase2">
        <div class="sectionHeaderFormat ltGrayHeader sectionHeader3">What are you looking for?</div>
        <div id="search-keywordMsg">You may leave this empty for a broader search</div>
		<div id="search-keywordsInput"><input name="search_keyword" id="search_keyword" type="search" class="input" size="30"></div><!--keywords-->
        <div id="search-searchBtn"><div class='buttonWrap'>Search</div></div> <div id="search-startOverBtn"><div class='buttonWrap'>Start Over</div></div><script>$('#search-startOverBtn').hide();</script>
</div><!--searchBase2-->




</div><!--searchBase1-->
<div id="postsPerPageBtns"></div>
<!--results-->
<div class="boxBare searchBase3" style="margin-top:0px;">
<div id="preloader"></div>
<div class="boxBare secondListBase"></div>
<div id="list-pageCount"></div>
<script>$('.searchBase3').hide();$('.searchPartial').hide();</script>
</div><!--postindex-Search-->

</div><!--separator-->
</div><!--mainBase-->
<script>
var searchType = '<? echo $sType; ?>';
var searchSid = '<? echo $sID; ?>';
var searchCid = '<? echo $cID; ?>';
var searchCatid = '<? echo $catID; ?>';
var searchOn = '<? echo $oN; ?>';
var searchKw = '<? echo $kW; ?>';
$.getScript('js/search.mod.js');
</script>