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

<div class="boxBasic searchBase1"><script>chosenPage = '<? echo $p; ?>';$('.searchBase1').hide();</script>
<div class="sectionHeaderFormat ltGrayHeader"><h2 id="index-title">ZooFaroo User Directory</h2></div>
<div class="boxBasic searchBase2 sideBySide">
        <div class="sectionHeaderFormat ltGrayHeader sectionHeader3">Search Users by Location</div>
       <div id="stateDropDwn" style="margin-left:75px;"></div><!--stateDropDwn-->
       <div id="cityDropDwn" style="margin-left:75px;"></div><!--cityDropDwn-->
        <div class="buttonWrap userSearchBtn" id="location">search</div>
       </div><!--searchBase2-->
<div class="boxBasic searchBase2 sideBySide">
        <div class="sectionHeaderFormat ltGrayHeader sectionHeader3">Find a User by their Username</div>
            <div class="userNameSearch"><div class="userSearchTxt"><input type="search" placeholder="" id="user_keyword" name="user_keyword" class="input" size="20"/></div><div class="buttonWrap userSearchBtn" style="margin-left:0px;margin-top:0px;" id="username">search</div></div><!--userNameSearch-->        
       </div><!--searchBase2-->
<div class="boxBasic searchBase2 sideBySide">
        <div class="sectionHeaderFormat ltGrayHeader sectionHeader3">Find a Business by their Name</div>
            <div class="userNameSearch"><div class="userSearchTxt"><input type="search" placeholder="" id="bus_keyword" name="bus_keyword" class="input" size="20"/></div><div class="buttonWrap userSearchBtn" style="margin-left:0px;margin-top:0px;" id="busname">search</div></div><!--userNameSearch-->        
       </div><!--searchBase2-->
</div><!--searchBase1-->
<div id="postsPerPageBtns"></div>
<!--results-->
<div class="boxBare searchBase3" style="padding-bottom:20px; margin-top:20px;">
<div id="preloader"></div>
<div class="boxBare secondListBase"></div>
<div id="list-pageCount"></div>
</div><!--postindex-Search-->
</div><!--separator-->
</div><!--mainBase-->
<script>
$.getScript('js/directory.mod.js');
</script>