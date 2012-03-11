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
<script>
if(localeObject.localeAction('state')){
	chosenStateAlt = localeObject.localeAction('state');
	if(localeObject.localeAction('city')){
		chosenCityAlt = localeObject.localeAction('city');
		window.open(''+baseHref+chosenStateAlt+'/'+chosenCityAlt+'.html', '_self');
				localStorage.removeItem('zoofaroo_chosenState');
				localStorage.removeItem('zoofaroo_chosenCity');
	}else{
		window.open(''+baseHref+chosenStateAlt+'.html', '_self');
				localStorage.removeItem('zoofaroo_chosenState');
				localStorage.removeItem('zoofaroo_chosenCity');
	}
}
</script>
<div class="boxBasic homeBase">
<div class="sectionHeaderFormat blueHeader"><h2 id="index-title">Welcome to ZooFaroo - the online barter community.</h2></div>

<div id="index-Map"><img height="289" width="460" alt="" border="0" src="images/usa.gif" usemap="#map_usa" id="usa"/></div>
<div id="preloader"></div>

<div id="index-menu">
</div><!--index-menu-->

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
<map name="map_usa" id="map_usa">
<area alt="AL" href="Alabama.html" coords="322,214,320,209,342,205,342,191,332,165,312,167,313,214,320,216,322,214" shape="poly" />
<area alt="AK" href="Alaska.html" coords="58,186,28,183,7,199,1,215,6,247,15,259,27,262,28,265,9,281,25,278,45,260,65,247,94,252,101,248,119,262,123,259,120,251,93,237,89,243,81,238,63,187,58,186" shape="poly" />
<area alt="AZ" href="Arizona.html" coords="139,144,99,136,97,147,93,145,91,159,94,164,91,167,86,176,88,179,85,180,84,182,113,199,132,201,139,144" shape="poly" />
<area alt="AR" href="Arkansas.html" coords="258,156,259,183,262,184,262,190,288,189,288,183,297,160,292,159,285,155,258,156" shape="poly" />
<area alt="CA" href="California.html" coords="32,69,64,76,55,106,91,156,91,160,93,163,93,165,90,167,90,170,88,172,88,173,87,178,85,180,66,178,62,169,40,151,34,128,27,100,26,85,32,69" shape="poly" />
<area alt="CO" href="Colorado.html" coords="146,102,199,106,196,149,140,144,146,102" shape="poly" />
<area alt="CT" href="Connecticut.html" coords="428,73,428,78,416,86,416,80,415,67,421,73,428,73" shape="poly" />
<area alt="DE" href="Delaware.html" coords="404,103,407,115,434,114,434,106,415,106,413,109,411,110,405,102,404,103" shape="poly" />
<area alt="DC" href="Washington_DC.html" coords="411,128,430,128,431,138,413,138,411,128" shape="poly" />
<area alt="DC" href="Washington_DC.html" coords="394,114,395,118,399,115,396,111,393,112,394,114" shape="poly" />
<area alt="FL" href="Florida.html" coords="323,213,321,208,342,205,343,208,369,207,370,204,374,203,394,241,395,258,386,260,379,252,367,234,367,225,353,214,341,220,338,214,323,213" shape="poly" />
<area alt="GA" href="Georgia.html" coords="333,165,353,163,353,165,376,189,373,202,370,204,369,207,344,207,342,205,343,189,333,165" shape="poly" />
<area alt="HI" href="Hawaii.html" coords="110,231,119,229,161,246,171,256,176,265,163,273,158,268,158,258,119,238,110,237,108,235,110,231" shape="poly" />
<area alt="ID" href="Idaho.html" coords="101,11,107,13,106,23,107,28,114,38,112,48,116,49,118,58,121,63,133,62,130,90,88,82,87,81,91,56,97,45,96,42,96,30,101,11" shape="poly" />
<area alt="IL" href="Illinois.html" coords="302,147,299,145,299,141,291,134,293,129,288,126,280,114,285,103,289,100,289,94,287,91,307,89,310,96,313,128,310,140,307,146,302,147" shape="poly" />
<area alt="IN" href="Indiana.html" coords="311,97,316,95,330,94,334,123,332,127,326,134,311,136,311,97" shape="poly" />
<area alt="IA" href="Iowa.html" coords="241,82,280,81,282,88,284,89,290,95,288,101,284,102,283,104,284,105,281,113,277,111,248,111,241,91,241,82" shape="poly" />
<area alt="KS" href="Kansas.html" coords="199,117,249,117,257,127,257,148,197,148,199,117" shape="poly" />
<area alt="KY" href="Kentucky.html" coords="335,122,326,134,312,137,308,146,302,147,302,152,347,146,358,135,352,126,335,122" shape="poly" />
<area alt="LA" href="Louisiana.html" coords="262,191,288,190,290,196,284,210,301,210,300,213,310,229,291,231,283,224,279,227,265,225,268,209,262,198,262,191" shape="poly" />
<area alt="ME" href="Maine.html" coords="425,37,427,30,430,12,438,11,454,33,433,59,425,37" shape="poly" />
<area alt="MD" href="Maryland.html" coords="383,106,403,102,406,115,434,115,431,126,411,127,408,129,404,124,399,121,396,119,398,116,397,112,394,110,393,112,389,109,388,107,383,106" shape="poly" />
<area alt="MA" href="Massachusetts.html" coords="417,67,420,64,429,64,433,62,443,71,435,76,428,73,423,73,417,67" shape="poly" />
<area alt="MI" href="Michigan.html" coords="273,47,301,37,301,43,323,43,336,49,338,62,345,72,347,83,341,92,317,96,311,61,306,61,304,55,273,47" shape="poly" />
<area alt="MN" href="Minnesota.html" coords="237,25,251,21,289,33,271,49,272,55,268,59,268,69,281,79,281,81,241,82,241,54,239,37,236,32,237,25" shape="poly" />
<area alt="MS" href="Mississippi.html" coords="295,168,311,166,314,214,306,219,300,213,301,210,285,210,290,196,288,186,295,168" shape="poly" />
<area alt="MO" href="Missouri.html" coords="248,111,277,112,280,114,281,118,288,127,293,128,291,134,299,142,299,146,302,147,302,151,298,158,292,159,285,154,258,155,257,127,250,118,248,111" shape="poly" />
<area alt="MT" href="Montana.html" coords="108,13,109,12,189,24,186,64,136,59,134,62,131,62,128,63,122,63,118,57,116,50,116,48,113,48,112,47,115,38,106,28,108,13" shape="poly" />
<area alt="NE" href="Nebraska.html" coords="185,85,226,87,240,90,249,117,198,117,199,106,184,105,185,85" shape="poly" />
<area alt="NV" href="Nevada.html" coords="64,76,108,86,97,146,93,145,90,156,56,107,64,76" shape="poly" />
<area alt="NH" href="New_Hampshire.html" coords="422,41,423,52,420,65,429,65,433,61,424,38,422,41" shape="poly" />
<area alt="NJ" href="New_Jersey.html" coords="415,86,427,79,429,85,416,92,417,100,412,110,406,102,406,92,407,84,414,88,415,86" shape="poly" />
<area alt="NM" href="New_Mexico.html" coords="140,144,188,149,185,200,154,198,141,197,140,202,132,201,140,144" shape="poly" />
<area alt="NY" href="New_York.html" coords="365,84,373,76,371,70,388,67,392,63,391,58,397,46,408,45,415,68,416,88,407,84,406,82,400,77,366,85,366,84,365,84" shape="poly" />
<area alt="NC" href="North_Carolina.html" coords="363,144,352,154,346,156,343,163,353,163,370,158,373,159,384,160,393,166,398,167,412,154,414,143,409,135,363,144" shape="poly" />
<area alt="ND" href="North_Dakota.html" coords="189,23,236,25,237,33,239,38,239,48,240,56,187,53,189,23" shape="poly" />
<area alt="OH" href="Ohio.html" coords="331,94,335,121,348,124,350,124,353,126,356,119,366,108,363,85,354,94,348,95,341,92,331,94" shape="poly" />
<area alt="OK" href="Oklahoma.html" coords="189,149,188,153,212,154,213,173,259,183,257,150,189,149" shape="poly" />
<area alt="OR" href="Oregon.html" coords="46,33,47,26,52,29,54,34,95,41,98,45,89,57,91,59,86,81,32,69,33,64,34,58,46,33" shape="poly" />
<area alt="PA" href="Pennsylvania.html" coords="364,86,366,109,406,101,407,84,400,78,364,86" shape="poly" />
<area alt="RI" href="Rhode_Island.html" coords="428,74,430,86,439,90,447,87,445,82,441,78,434,76,428,74" shape="poly" />
<area alt="SC" href="South_Carolina.html" coords="354,162,372,158,373,160,384,160,393,167,390,177,377,189,357,169,354,162" shape="poly" />
<area alt="SD" href="South_Dakota.html" coords="187,54,240,57,239,60,241,63,241,90,225,86,185,85,187,54" shape="poly" />
<area alt="TN" href="Tennessee.html" coords="295,167,301,151,363,144,354,152,346,157,345,162,332,165,312,166,295,167" shape="poly" />
<area alt="TX" href="Texas.html" coords="185,200,152,198,168,218,171,223,181,232,191,222,200,226,217,258,235,265,236,263,233,246,266,225,268,210,262,196,262,185,252,181,212,174,212,155,189,153,188,154,185,200" shape="poly" />
<area alt="UT" href="Utah.html" coords="130,90,109,86,99,136,140,144,145,102,129,100,130,90" shape="poly" />
<area alt="VT" href="Vermont.html" coords="409,45,421,41,423,48,420,66,416,68,409,45" shape="poly" />
<area alt="VA" href="Virginia.html" coords="358,136,348,146,409,135,409,132,403,125,395,119,395,114,390,110,379,121,376,121,373,132,364,136,362,136,358,136" shape="poly" />
<area alt="WA" href="Washington.html" coords="48,3,61,9,61,2,101,10,96,33,96,42,70,38,54,35,53,30,47,25,46,9,48,3" shape="poly" /> 
<area alt="WV" href="West_Virginia.html" coords="366,109,376,108,387,107,388,111,378,122,376,121,373,133,362,137,358,135,353,126,358,118,366,109" shape="poly" />
<area alt="WI" href="Wisconsin.html" coords="310,61,307,89,288,91,281,86,281,78,268,68,268,58,272,55,272,52,272,51,272,48,276,47,304,55,305,61,310,61" shape="poly" />
<area alt="WY" href="Wyoming.html" coords="136,59,186,63,183,106,129,100,134,62,136,59" shape="poly" />
</map>