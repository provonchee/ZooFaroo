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
<div class="boxBasic forgetBase1">
<div id="breadCrumbs"><? echo $breadCrumbs; ?></div><!--breadCrumbs-->
<div class="boxGradientDrop forgetBase2">
<hgroup class="sectionHeaderFormat blueHeader"><h2 id="register-title">Did you forget your ZooFaroo password?</h2></hgroup>
<div id="forget-form">
    Enter your username and email address.&nbsp;&nbsp;Your password will be sent to you via email.
    <br/><br/>
    <div id="forget-username">Your Username:
    <input name="username" id="username-input" type="text"  size="35" class="input"  maxlength="12"/></div>
    <div id="forget-username">Your Email (the one you registered with):
    <input name="email-input" id="email-input" type="text"  size="35" class="input"  maxlength="40"/></div>
    <div id="forget-submitBtn"><div class='buttonWrap'>Submit</div></div>
</div><!--register-form-->
</div>
<div id="forget-alert"></div>
</div><!--forgetBase1-->
</div><!--separator-->
</div><!--mainBase-->
<script>
$.getScript('js/forget.mod.js');
</script>