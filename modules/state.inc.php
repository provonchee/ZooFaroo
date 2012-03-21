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

<div class="boxBare stateBase">
<div id="breadCrumbs"><? echo $breadCrumbs; ?></div><!--breadCrumbs-->
<figure class="state-image"></figure>
<div id="preloader"></div><!--preloader-->
<p class="state-menu"></p><!--state-menu-->
</div><!--boxDrop stateBase-->
</div><!--separator-->
</div><!--mainBase-->

<script>
chosenState = '<? echo $state; ?>';
$.getScript('js/state.mod.js');
</script>