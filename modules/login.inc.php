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

<div class="boxGradientDrop  postBaseEdit"></div>

<div class="boxBare loginBase1">
<div id="breadCrumbs"><? echo $breadCrumbs; ?></div><!--breadCrumbs-->
<div class="boxGradient loginBase2">
<div class="sectionHeaderFormat grayHeader"><h2 id="header-title">Login to ZooFaroo</h2></div>
<div id="post-form"></div><!--post-form-->
</div><!--loginBase2-->
</div><!--loginBase1-->
<div class="boxBasic homeBase" style="margin-top:10px;">
<div class="sectionHeaderFormat blueHeader"><h2 id="index-title">Welcome to ZooFaroo - the online barter community.</h2></div>
<div id="index-Map"><img height="289" width="460" alt="" border="0" src="images/usa.gif" usemap="#map_usa" id="usa"/></div>
<div id="preloader"></div>
<div id="index-menu"></div><!--index-menu-->
</div><!--boxDrop homeBase-->
</div><!--separator-->
</div><!--mainBase-->
<script>
		   var myImagePR = new Image;
		   myImagePR.src = "images/preloader.gif";
		   myImagePR.id = "preload";
		   $('.homeBase #preloader').append(myImagePR);
		   $('.homeBase #preloader').show();
			$('.homeBase #index-menu').empty().hide();
			
			fetchStateObject.fetchStateArray('home');
			
			function displayStates(sArray){
			
				var t=1;
					   for($i=0; $i<51; $i++){
						    if(t<6){
					   			$('.homeBase #index-menu').append('<div style="display:inline;"><a href="'+sArray[$i][1]+'.html"style="text-decoration:underline;">'+sArray[$i][1].replace(/_/g, " ")+'</a></div>&nbsp;&nbsp;');
								t++;
					   		}else{
								$('.homeBase #index-menu').append('<div style="display:inline;"><a href="'+sArray[$i][1]+'.html"style="text-decoration:underline;">'+sArray[$i][1].replace(/_/g, " ")+'</a></div>&nbsp;&nbsp;<br/>');
								t=1;
							}
					   }
					   $('.homeBase #preloader').empty();
					   $('.homeBase #index-menu').fadeIn('fast');	   
			}
			
</script>
<? include_once('modules/map.inc.php'); ?>
<script>
$('#post-form').load('modules/loginForm.php');
</script>