<?
// Redirect if this page was accessed directly:
if (!defined('BASE_URL')) {

	// Need the BASE_URL, defined in the config file:
	require_once ('../config/config.inc.php');
	
	// Redirect to the index page:
	$url = BASE_URL . 'index.php';
	header ("Location: $url");
	exit;
	
} // End of defined() IF.

$regionName = $_REQUEST['regionName'];
$state = $_REQUEST['state'];
$city = $_REQUEST['city'];
$offerNeed = $_REQUEST['offerNeed'];
$category = $_REQUEST['category'];

?>

<div class="boxBare listBase">

<div id="breadCrumbs"><? echo $breadCrumbs; ?></div><!--breadCrumbs-->
<div id="preloader"></div>
<div id="postsPerPageBtns"></div>
<div class="boxBare secondListBase"></div><!--secondListBase-->
<div id="list-pageCount"></div>
<script>$('.listBase .secondListBase').hide();$('.listBase #postsPerPageBtns').hide();var myImagePR = new Image;myImagePR.src = "images/preloader.gif";myImagePR.id = "preload";$('#preloader').append(myImagePR);</script>
</div><!--listBase-->
</div><!--secondBase-->
</div><!--mainBase-->

<script>

var offerNeed = '<? echo $offerNeed; ?>';
var listCategory = '<? echo $category; ?>';
chosenState = '<? echo $state; ?>';
chosenCity = '<? echo $city; ?>';
var postCount=0;
$.getScript('js/postList.mod.js');
</script>