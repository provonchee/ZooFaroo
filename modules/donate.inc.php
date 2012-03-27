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
<div class="boxBasic donateBase1">
<div id="breadCrumbs"><? echo $breadCrumbs; ?></div><!--breadCrumbs-->
<div class="boxGradientDrop donateBase2">
<div class="sectionHeaderFormat blueHeader"><h2 id="donate-title">Donate to ZooFaroo</h2></div>
<div id="donate-content">
Currently ZooFaroo is a service that is completely free to use.  If you use and enjoy ZooFaroo please consider making a small donation.  Every little bit helps.  Thank you!
<br/><br/>
<form action="https://www.paypal.com/cgi-bin/webscr" method="post">
<input type="hidden" name="cmd" value="_s-xclick">
<input type="hidden" name="hosted_button_id" value="P26R7MZXSQNC6">
<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
</form>
</div><!--donate-content-->
</div><!--donateBase2-->
</div><!--donateBase1-->
</div><!--separator-->
</div><!--mainBase-->
<script>
$(".donateBase1").hide();
$(".donateBase1").fadeIn('slow');</script>