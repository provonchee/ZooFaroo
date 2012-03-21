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
<div class="boxBasic contactBase1">
<div id="breadCrumbs"><? echo $breadCrumbs; ?></div><!--breadCrumbs-->
<div class="boxGradientDrop contactBase2">
<hgroup class="sectionHeaderFormat blueHeader"><h2 id="contact-title">Contact ZooFaroo</h2></hgroup>
<div id="contact-form">
Questions?&nbsp;&nbsp;Comments?&nbsp;&nbsp;Find a bug?&nbsp;&nbsp;Have a suggestion?&nbsp;&nbsp;Let us know, we'd love to hear from you.
 	<div id="contact-email">Your Email:
    <input name="email" id="email" type="text"  class="input" size="35"/></div>
    <div id="contact-message">Your Message:<br/><TEXTAREA NAME="emailMessage" id="emailMessage" class="textarea" COLS=93 ROWS=4></TEXTAREA> </div>
    <div id="contact-submitBtn"><div class='buttonWrap'>Send</div></div>
</div><!--contact-form-->
</div>
</div><!--contact-mainMenu-->
</div><!--separator-->
</div><!--mainBase-->
<script>
$.getScript('js/contact.mod.js');
</script>
