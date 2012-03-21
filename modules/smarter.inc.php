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
<div class="boxBasic smarterBase1">
<div id="breadCrumbs"><? echo $breadCrumbs; ?></div><!--breadCrumbs-->
<div class="boxGradientDrop aboutBase2">
<hgroup class="sectionHeaderFormat blueHeader"><h2 class="about-title">Barter Smarter!</h2></hgroup>
<div class="about-content">
Barter Smarter!&nbsp;Always use a common sense approach to your bartering activities.<br/><br/>
We’ve met many great people with many great services to offer, and we created ZooFaroo to give you all a means to get together.<br/>
Meeting great people and finding valuable exchanges through ZooFaroo can be fun and rewarding, but still we recommend taking common sense precautions to protect yourself. 
<br/><br/>
<dl>
<dt>Important suggestions to consider:</dt>
	<dd><li>When first meeting someone in person, do so in a public place or bring along a friend.</li><dd>

	<dd><li>Use caution when allowing a stranger into your home.</li></dd>

	<dd><li>Use caution when money or high value items are involved.</li></dd>

	<dd><li>Do not wire funds and avoid mailing payment for items sight-unseen or services yet to be provided</li></dd>

	<dd><li>Be wary of fake cashier’s checks and money orders, ask to see ID and record the driver’s license number</li></dd>

	<dd><li>Never give out personal financial information (bank account numbers, social security number, credit card numbers, etc.)</li></dd>

	<dd><li>Prepare a written contract (LINK:suggestions for writing a contract)</li></dd>

	<dd><li>Be cautious of someone who refuses to sign a contract agreement or show identification</li></dd>

</dl>

If you feel you have been defrauded, contact you local police department.
<br/><br/>
<dl>
<dt>Internet fraud or scam attempts can be reported to:</dt>
    <dd><li>Internet Fraud Complaint Center</li></dd>
    <dd><li>FTC Video: How to report scams to the FTC</li></dd>
    <dd><li>FTC online complaint form</li></dd>
    <dd><li>FTC toll free hotline: 877-FTC-HELP (877-382-4357)</li></dd>
</dl>


<dl>
<dt>For more information about personal safety online, check out these resources:</dt>
    <dd><li>http://getsafeonline.org</li></dd>
    <dd><li>http://wiredsafety.org</li></dd>
</dl>
<dl>
    <dt>Suggestions on writing a contract:</dt>
    <dd><li>When negotiating a transaction for services, create a written contract and provide a copy for both parties.</li></dd>
     The contract should include:
    <dd><li>Description of the services to be provided, the more detail the better</li></dd>
    
    <dd><li>The time-frame during which work is to be completed</li></dd>
    
    <dd><li>Materials involved</li></dd>
   
    <dd><li>Any specific quality standards to be met</li></dd>
   
    <dd><li>Agreed-upon method and amount of compensation</li></dd>
   
    <dd><li>Names and signatures of parties involved and contact information. It is wise to check personal identification</li></dd>
</dl>
</div>
</div><!--aboutBase2-->
</div><!--boxDrop aboutBase1-->
</div><!--separator-->
</div><!--mainBase-->
<script>
$('.boxDrop smarterBase1').hide();
$('.boxDrop smarterBase1').fadeIn('slow');
</script>