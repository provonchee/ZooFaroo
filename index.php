<?php # Script 2.4 - index.php

/* 
 *	This is the main page.
 *	This page includes the configuration file, 
 *	the templates, and any content-specific modules.
 */

// Require the configuration file before any PHP code:
require_once ('./config/config.inc.php');

// Validate what page to show:
if (isset($_GET['pg'])) {
	$p = $_GET['pg'];
} elseif (isset($_POST['pg'])) { // Forms
	$p = $_POST['pg'];
} else {
	$p = NULL;
}

if(isset($_GET['regionName'])) {
	$regionName = $_GET['regionName'];
}else{
	$regionName = NULL;
}

if(isset($_GET['state'])) {
	$state = $_GET['state'];
}else{
	$state = NULL;
}

if(isset($_GET['city'])) {
	$city = $_GET['city'];
}else{
	$city = NULL;
}

if(isset($_GET['offerNeed'])) {
	$offerNeed = $_GET['offerNeed'];
}else{
	$offerNeed = NULL;
}

if(isset($_GET['category'])) {
	$category = $_GET['category'];
}else{
	$category = NULL;
}

if(isset($_GET['postingID'])) {
	$postingID = $_GET['postingID'];
}else{
	$postingID = NULL;
}

if(isset($_GET['user'])) {
	$reviewID = $_GET['user'];
}else{
	$reviewID = NULL;
}

if(isset($_GET['activatePost'])) {
	$userID = $_GET['user'];
	$key = $_GET['key'];
}else{
	$userID = NULL;
	$key = NULL;
}

if(isset($_GET['activateUser'])) {
	$userID = $_GET['user'];
	$key = $_GET['key'];
}else{
	$userID = NULL;
	$key = NULL;
}

if(isset($_GET['sType'])){
	$sType = $_GET['sType'];//search type--basic or advanced
}else{
	$sType = 'advanced';
}
if(isset($_GET['sID'])){
	$sID = $_GET['sID'];//stateID
}else{
	$sID = '';
}
if(isset($_GET['cID'])){
	$cID = $_GET['cID'];//cityID
}else{
	$cID = '';
}
if(isset($_GET['catID'])){
	$catID = $_GET['catID'];//categoryID
}else{
	$catID = '';
}
if(isset($_GET['oN'])){
	$oN = $_GET['oN'];//offerNeed
}else{
	$oN = '';
}
if(isset($_GET['kW'])){
	$kW = $_GET['kW'];//keyWordString
}else{
	$kW = '';
}

$patterns = array();
$patterns[0] = '/__/';
$patterns[1] = '/_/';
$replacements = array();
$replacements[0] = '/';
$replacements[1] = ' ';

$regionNameDisplay = preg_replace($patterns, $replacements, $regionName);
$stateDisplay = preg_replace($patterns, $replacements, $state);
$cityDisplay = preg_replace($patterns, $replacements, $city);
$categoryDisplay = preg_replace($patterns, $replacements, $category);
$offerNeedDisplay = preg_replace($patterns, $replacements, $offerNeed);

// Determine what page to display:
switch ($p) {
	
	case 'directory':
		$page = 'directory.inc.php';
		$page_title = 'User Directory | ZooFaroo - Be social.  Trade local.';
		break;
	
	case 'updateIE':
		$page = 'updateIE.inc.php';
		$page_title = 'Update Your Browser | ZooFaroo - Be social.  Trade local.';
		break;
	
	case 'comingSoon':
		$page = 'comingSoon.inc.php';
		$page_title = 'Coming Soon | ZooFaroo - Be social.  Trade local.';
		break;
	
	case 'search':
		$page = 'search.inc.php';
		$pageSpec = '?sType='.$sType.'&sID='.$sID.'&cID='.$cID.'&catID='.$catID.'&oN='.$oN.'&kW='.$kW.'';
		$page_title = 'Search | ZooFaroo - Be social.  Trade local.';
		$breadCrumbs = '<div class="buttonWrap backBtn">&lArr;&nbsp;Back</div>';
		break;
		
	case 'searchAdvanced':
		$page = 'search.inc.php';
		$page_title = 'Advanced Search | ZooFaroo - Be social.  Trade local.';
		$breadCrumbs = '<div class="buttonWrap backBtn">&lArr;&nbsp;Back</div>';
		break;

	case 'about':
		$page = 'about.inc.php';
		$page_title = 'About | ZooFaroo - Be social.  Trade local.';
		$breadCrumbs = '<div class="buttonWrap backBtn">&lArr;&nbsp;Back</div>';
		break;

	case 'smarter':
		$page = 'smarter.inc.php';
		$page_title = 'Barter Smarter | ZooFaroo - Be social.  Trade local.';
		$breadCrumbs = '<div class="buttonWrap backBtn">&lArr;&nbsp;Back</div>';
		break;
		
	case 'sitemap':
		$page = 'sitemap.inc.php';
		$page_title = 'Sitemap | ZooFaroo - Be social.  Trade local.';
		$breadCrumbs = '<div class="buttonWrap backBtn">&lArr;&nbsp;Back</div>';
		break;

	case 'register':
		$page = 'register.inc.php';
		$page_title = 'Register | ZooFaroo - Be social.  Trade local.';
		$breadCrumbs = '<div class="buttonWrap backBtn">&lArr;&nbsp;Back</div>';
		break;
	
	case 'contact':
		$page = 'contact.inc.php';
		$page_title = 'Contact Us | ZooFaroo - Be social.  Trade local.';
		$breadCrumbs = '<div class="buttonWrap backBtn">&lArr;&nbsp;Back</div>';
		break;
	
	case 'forget':
		$page = 'forget.inc.php';
		$page_title = 'Forget Your Password? | ZooFaroo - Be social.  Trade local.';
		$breadCrumbs = '<div class="buttonWrap backBtn">&lArr;&nbsp;Back</div>';
		break;
	
	case 'edit':
		$page = 'edit.inc.php';
		$page_title = 'User Account | ZooFaroo - Be social.  Trade local.';
		$breadCrumbs = '<div class="buttonWrap backBtn">&lArr;&nbsp;Back</div>';
		break;
		
	case 'login':
		$page = 'login.inc.php';
		$page_title = 'Login | ZooFaroo - Be social.  Trade local.';
		$breadCrumbs = '<div class="buttonWrap backBtn">&lArr;&nbsp;Back</div>';
		break;
		
	case 'donate':
		$page = 'donate.inc.php';
		$page_title = 'Donate | ZooFaroo - Be social.  Trade local.';
		$breadCrumbs = '<div class="buttonWrap backBtn">&lArr;&nbsp;Back</div>';
		break;
		
	case 'post':
		$page = 'post.inc.php';
		$page_title = 'List Your Posting | ZooFaroo - Be social.  Trade local.';
		$breadCrumbs = '<div class="buttonWrap backBtn">&lArr;&nbsp;Back</div>';
		break;
		
	case 'state':
		$page = 'state.inc.php';
		$pageSpec = '?regionName='.$regionName.'&state='.$state.'';
		$page_title = ''.$stateDisplay.' | ZooFaroo - Be social.  Trade local.';
		$breadCrumbs = '<div class="buttonWrap backBtn">&lArr;&nbsp;Back</div>&nbsp;&nbsp;&nbsp;&nbsp;<div id="bcRegion"><a href="login.html">'.$regionNameDisplay.'</a></div><div id="bcState">&nbsp;&hArr;&nbsp;<a href="'.$state.'.html">'.$stateDisplay.'</a></div>';
		break;
		
	case 'city':
		$page = 'city.inc.php';
		$pageSpec = '?regionName='.$regionName.'&state='.$state.'&city='.$city.'';
		$page_title = ''.$cityDisplay.' | '.$stateDisplay.' | ZooFaroo - Be social.  Trade local.';
		$breadCrumbs = '<div class="buttonWrap backBtn">&lArr;&nbsp;Back</div>&nbsp;&nbsp;&nbsp;&nbsp;<div id="bcRegion"><a href="login.html">'.$regionNameDisplay.'</a></div><div id="bcState">&nbsp;&hArr;&nbsp;<a href="'.$state.'.html">'.$stateDisplay.'</a></div><div id="bcCity">&nbsp;&hArr;&nbsp;<a href="'.$state.'/'.$city.'.html">'.$cityDisplay.'</a></div>';
		break;
		
	case 'postList':
		$page = 'postList.inc.php';
		$pageSpec = '?regionName='.$regionName.'&state='.$state.'&city='.$city.'&offerNeed='.$offerNeed.'&category='.$category.'';
		$page_title = ''.$categoryDisplay.' | '.$cityDisplay.' | '.$stateDisplay.' | ZooFaroo';
		$breadCrumbs = '<div class="buttonWrap backBtn">&lArr;&nbsp;Back</div>&nbsp;&nbsp;&nbsp;&nbsp;<div id="bcRegion"><a href="login.html">'.$regionNameDisplay.'</a></div><div id="bcState">&nbsp;&hArr;&nbsp;<a href="'.$state.'.html">'.$stateDisplay.'</a></div><div id="bcCity">&nbsp;&hArr;&nbsp;<a href="'.$state.'/'.$city.'.html">'.$cityDisplay.'</a></div><div id="bcOfferNeed">&nbsp;&hArr;&nbsp;<a href="'.$state.'/'.$city.'.html">'.$offerNeedDisplay.'</a></div><div id="bcCategory">&nbsp;&hArr;&nbsp;<a href="'.$state.'/'.$city.'/'.$offerNeed.'/'.$category.'.html">'.$categoryDisplay.'</a></div>';
		break;
		
	case 'thePost':
		$page = 'thePost.inc.php';
		$pageSpec = '?regionName='.$regionName.'&state='.$state.'&city='.$city.'&offerNeed='.$offerNeed.'&category='.$category.'&postingID='.$postingID.'';
		$page_title = ''.$categoryDisplay.' | '.$cityDisplay.' | '.$stateDisplay.' | ZooFaroo';
		$breadCrumbs = '<div class="buttonWrap backBtn">&lArr;&nbsp;Back</div>&nbsp;&nbsp;&nbsp;&nbsp;<div id="bcRegion"><a href="login.html">'.$regionNameDisplay.'</a></div><div id="bcState">&nbsp;&hArr;&nbsp;<a href="'.$state.'.html">'.$stateDisplay.'</a></div><div id="bcCity">&nbsp;&hArr;&nbsp;<a href="'.$state.'/'.$city.'.html">'.$cityDisplay.'</a></div><div id="bcOfferNeed">&nbsp;&hArr;&nbsp;<a href="'.$state.'/'.$city.'.html">'.$offerNeedDisplay.'</a></div><div id="bcCategory">&nbsp;&hArr;&nbsp;<a href="'.$state.'/'.$city.'/'.$offerNeed.'/'.$category.'.html">'.$categoryDisplay.'</a></div>';
		break;
		
	case 'user':
		$page = 'user.inc.php';
		$pageSpec = '?user='.$reviewID.'';
		$page_title = 'User Information | ZooFaroo - Be social.  Trade local.';
		$breadCrumbs = '<div class="buttonWrap backBtn">&lArr;&nbsp;Back</div>';
		break;
		
	case 'activatePost':
		$page = 'pactivate.inc.php';
		$pageSpec = '?user='.$userID.'&key='.$key.'';
		$page_title = 'Posting Activation | ZooFaroo - Be social.  Trade local.';
		$breadCrumbs = '<div class="buttonWrap backBtn">&lArr;&nbsp;Back</div>';
		break;
		
	case 'activateUser':
		$page = 'uactivate.inc.php';
		$pageSpec = '?user='.$userID.'&key='.$key.'';
		$page_title = 'User Activation | ZooFaroo - Be social.  Trade local.';
		$breadCrumbs = '<div class="buttonWrap backBtn">&lArr;&nbsp;Back</div>';
		break;
	
	// Default is to include the main page.
	default:
		$page = 'home.inc.php';
		$page_title = 'ZooFaroo - Be social.  Trade local.';
		break;
		
} // End of main switch.

// Make sure the file exists:
if (!file_exists('./modules/'.$page)) {
	$page = 'home.inc.php';
	$page_title = 'ZooFaroo - Be social.  Trade local.';
}

if($p!='comingSoon' && $p!='updateIE'){
include_once ('./includes/header.php');
}
// Include the content-specific module:
// $page is determined from the above switch.
include ('./modules/'.$page);

// Include the footer file to complete the template:
if($p!='comingSoon' && $p!='updateIE'){
include_once ('./includes/footer.php');
}
?>