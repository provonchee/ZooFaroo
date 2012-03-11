<!DOCTYPE html>
<html xmlns:fb="http://ogp.me/ns/fb#" lang="en">
<html>
<head>
<base href="http://localhost:8888/ZooFarooMAMP/"/>
<meta charset="UTF-8" />
<META NAME="description" CONTENT="<?php echo $page_title; ?> where you exhange goods and services for other goods and services.">
<META NAME="keywords" CONTENT="barter, exchange, goods, services, offered, needed, fair, equal">
<meta property="og:title" content="ZooFaroo - Be social.  Trade local." />
<meta property="og:type" content="activity" />
<meta property="og:url" content="http://www.zoofaroo.com" />
<meta property="og:image" content="http://www.zoofaroo.com/images/zoofaroo.png" />
<meta property="og:site_name" content="ZooFaroo" />
<meta property="fb:admins" content="787939672" />
<title id="title">TESTME</title>

<link rel="stylesheet" type="text/css" href="css/barter.css" />
<script type="text/javascript" src="js/jquery-1.5.1.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.8.14.custom.min.js"></script>
<script src="js/modernizr.js"></script>
<script src="js/variables.js"></script>
</head>
<body>
<center><div id='postBtn' style="cursor:pointer;">TESTME -POST</div></center>
<center><div id='regBtn' style="cursor:pointer; margin-top:50px;">TESTME -REG</div></center>
<center><div id='reviewBtn' style="cursor:pointer; margin-top:100px;">TESTME -REVIEW</div></center>
<center><div id='searchBtn' style="cursor:pointer; margin-top:150px;">TESTME -SESRCH</div></center>
<script>
var form = new Array();
var offersArray = new Array();
var needsArray = new Array();

var offerGSWArray =  new Array("s");
var offerCategoryArray = new Array("34");
var offerTitleArray = new Array("This is a title of a offer post #1");
var offerPostingArray = new Array("ZooFarooZooFarooZooFarooZooFarooZooFarooZooFarooZooFarooZooFarooZooFarooZooFarooZooFarooZooFarooZooFarooZooFarooZooFaroo");
var offerEmailNotesArray = new Array("2");
var photosArray = new Array("01121274np92qjxt.jpg");

var needGSWArray =  new Array("s");
var needCategoryArray = new Array("24");
var needTitleArray = new Array("ZooFarooZooFarooZooFarooZooFarooZooFarooZooFarooZooFaroo");
var needPostingArray = new Array("ZooFarooZooFarooZooFarooZooFarooZooFarooZooFarooZooFarooZooFarooZooFarooZooFaroo");
var needEmailNotesArray = new Array("2");
var needMoneyArray = new Array("1");

offersArray.push(offerGSWArray,offerCategoryArray,offerTitleArray,offerPostingArray,offerEmailNotesArray,photosArray);
needsArray.push(needGSWArray,needCategoryArray,needTitleArray,needPostingArray,needEmailNotesArray,needMoneyArray);

//form = {'di':'post', 'i1':'1', 's1':'ZooFaroo', 's2':'8667634181526068', 's3':'4c2nmy', 'i2':'38', 'i3':'331', 's4':'Portlond', 'a1':offersArray, 'a2':needsArray};//post

var test1 = 'joshua@stinky.com';
var test2 = 'jacky';
var test3 = 'jorpy';
form = {'di':'register', 's1':'Portland', 'e1':'joshua@jowadesigns.com', 's2':'ZooFaroo3', 's3':'ZooFaroo3', 'i1':'38', 'i2':'2', 'u1':'http://www.facebook.com/jojo1234', 'u2':'http://www.twitter.com/jojo1234', 'u3':'https://plus.google.com/jojo1234', 'u4':'http://www.linkedin.com/jojo1234', 'u5':'http://www.zoofaroo.com.com/'};//reg

					
//form = {'di':'review', 'i1':'1', 's1':'jojo', 's2':'juju', 's3':'<img src="poop.png">bitch!</>', 's4':'This is the mutha fuckin post!', 'i2':'1', 's5':'h6twp5'};//review

//form = {'di':'search', 'i1':38, 'i2':331, 'i3':15, 's1':'Offered', 'd2':'lawyer_aquired'}; //search
														
														
														function searchit(){
														 $.post('control/formValidate.php', {form:form }, function(result){
															 	console.log(result);
														});
														}
																																					
											
										function review(){
											$.post("control/formValidate.php", {form:form},
												function(reviewConfirmation) {
													console.log(reviewConfirmation);
												});
											}
										
										function post(){
									   $.post("control/formValidate.php", {form:form},
									   function(confirmation){
										 console.log(confirmation);
									   });
										}
										
										function reg(){
									   $.post("control/formValidate.php", {form:form},
									   function(confirmation){
										 console.log(confirmation);
									   });
										}
									   
									   $('#postBtn').click(function(){post();});
									   $('#regBtn').click(function(){reg();});
									   $('#reviewBtn').click(function(){review();});
									   $('#searchBtn').click(function(){searchit();});
</script>
</body>
</html>
<?php
/*$url='http://www.zoofaroo.org.com/';
$url = htmlspecialchars_decode($url);
echo $url;
$ctr=0;
		//$ptn=array("/[http]{4}/","/[w]{3}[\.]{1}/","/[\.]{1}[c]{1}[o]{1}[m]{1}([\W|$]{1})/","/[\.]{1}[o]{1}[r]{1}[g]{1}/","/[\.]{1}[b]{1}[i]{1}[z]{1}/","/[\.]{1}[n]{1}[e]{1}[t]{1}/","/[\.]{1}[e]{1}[d]{1}[u]{1}/","/[\.]{1}[g]{1}[o]{1}[v]{1}/","/[\.]{1}[u]{1}[k]{1}/");
		$ptn=array("/[http]{4}/","/[w]{3}[\.]{1}/","/(\.{1})[a-zA-Z]{2,3}(\W{1}|$)/");
		$found=0;
		foreach($ptn as $key){
			preg_match_all($ptn[$ctr], $url, $matches, PREG_PATTERN_ORDER);
			if(count($matches[0])>1){
				die(json_encode($matches[0]).'X12');
			}else if(count($matches[0])==1 && $ctr>=2){
				$found++;
				echo json_encode($matches[0]);
			}
			if($found>1){
				$found=0;
				die('X13');
			}
			$ctr++;
		}*/

//echo json_encode($matches[0]);
/*$test = stripslashes("*6F]O1F%R;V\\\\Q,@``\n`");
$pass = convert_uudecode('*6F]O1F%R;V\\Q,@```');//*6F]O1F%R;V\\\\Q,@``\n`
echo $pass;*/



/*include_once("../includes/alphaCipher.php");
	//THIS CODES PW
	$cpw = 'AB190bnec';
	$clientCipher = '6842351970';
	$clientCipherArray = str_split($clientCipher);
	$code = '';
	$passwordArray = array();	
	if(ctype_alnum($cpw) && strlen($cpw)<=10){//is the ps alphanumeric and less than 11 chars and greater than 7 chars?
		$passwordArray = str_split($cpw);
		for($p=0; $p<count($passwordArray); $p++){
			//grab coresponding number for each letter/number from the alphacipher array
			for($q=0; $q<count($alphaCipher); $q++){
				if($passwordArray[$p]==$alphaCipher[$q][0]){
					$passwordArray[$p]=$alphaCipher[$q][1];
					//add the ciphercodearray to the number retreived from the alphacipher
					$passwordArray[$p]=$passwordArray[$p]+$clientCipherArray[$p];
				}
			}
			
		}
		
		//put it all together
		for($r=0; $r<count($passwordArray); $r++){
			$codedPassword .= $passwordArray[$r];
		}
		
		echo $codedPassword.'<br/>';
		
		
		$dpw = $codedPassword;
		
		include_once("../includes/alphaDecipher.php");
	
	//DECODE
		$j=0;
		//separate the coded pasword into it's appropriate chunks
		for($i=0; $i<strlen($dpw)/2; $i++){
			$csEndPoint = 2;//end point of section to remove from coded password
			$csStartPoint = $j;
			$dcodedPassWordSection[$i] = substr($dpw, $csStartPoint, $csEndPoint);//separate each coded letter
			$j=$j+2;
			//$dcodedPasswordSectionMinus[$i] = substr($dcodedPassWordSection[$i],0, 2);
			$dcodedPasswordSectionCleaned[$i] = intval($dcodedPassWordSection[$i])-intval($clientCipherArray[$i]);
			for($k=0; $k<count($alphaDecipher); $k++){
				if($dcodedPasswordSectionCleaned[$i]==$alphaDecipher[$k][1]){
					$dcodedPasswordSectionCleaned[$i] = $alphaDecipher[$k][0];
				}
			}
		}
	//put it all together
		for($r=0; $r<count($dcodedPasswordSectionCleaned); $r++){
			$deCodedPassword .= $dcodedPasswordSectionCleaned[$r];
		}
		echo $deCodedPassword;
		
	}*/
	

	
	include_once('../includes/connect.php');
	$dpw='833766401309601459361038303652496265407329639321626774143702';
	$cpw='ZooFaroo12';
	$spw='86676341815260686870';
	
	function __autoload($class_name) {
    	include '../classes/'.$class_name . '.php';
	}
	
	$deCipherActionClient = new deCipherActionClient();
		$deCipherActionClient->decipherClient($spw);
		$spw = $deCipherActionClient->unCodedClientPw;
	
	$fetchUserInfo = mysql_query("SELECT * FROM barter_users WHERE username='ZooFaroo'") or die('X10');
				$fetchUserInfoArray = mysql_fetch_array($fetchUserInfo);
				$userID = $fetchUserInfoArray['user_id'];
				$passID = $fetchUserInfoArray['password'];
	
	$decipherAction = new decipherAction();
				$decipherAction->decipher($passID);
				$passID = $decipherAction->unCodedPw;
				
				$cipherActionClient = new cipherActionClient();
						$cipherActionClient->cipherClient($cpw);
						$cpw = $cipherActionClient->codedClientPw;
						$tester = $cpw;
						
	echo $passID.'<br/>'.$tester.'<br/>'.$spw;


?>