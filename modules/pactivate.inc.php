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

$key = $_REQUEST['key'];
$userID = $_REQUEST['user'];
$tally= $_REQUEST['tally'];
?>

<div class="activateBase1">
<div class="boxGradientDrop registerBase2" style="margin-top:-100px;">
<hgroup class="sectionHeaderFormat blueHeader"><h2 id="register-title">ZooFaroo Posting Activation</h2></hgroup>

<div id="register-form" style="width:600px;">
<br/>
</div><!--register-form-->

<div id="register-successful" style="text-align:center;"></div>
</div><!--registerBase2-->
</div><!--activateBase1-->
</div><!--separator-->
</div><!--mainBase-->   
 <script>
 	var pCategory=null;
 	var pON = null;
	var pTally = <? echo $tally; ?>;
	var key = '<? echo $key; ?>';
	var uid = <? echo $userID; ?>;
$.getScript('js/pactivate.mod.js');
</script>