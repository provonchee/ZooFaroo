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
$ssSec = $_REQUEST['ssSec'];

?>
<div class="activateBase1">
<div class="boxGradientDrop registerBase2" style="margin-top:-100px;">
<hgroup class="sectionHeaderFormat blueHeader"><h2 id="register-title">ZooFaroo User Activation</h2></hgroup>

<div id="register-form" style="width:600px;">
<br/>
</div><!--register-form-->




<div id="register-successful" style="text-align:center;"></div>
</div><!--registerBase2-->
</div><!--activateBase1-->
</div><!--separator-->
</div><!--mainBase-->   
 <script>
 	var key = '<? echo $key; ?>';
	var sec = '<? echo $ssSec; ?>';
	$.getScript('js/uactivate.mod.js');
</script>
<!--w5phmf^CPZocFUWU-->