<!DOCTYPE html>
<html xmlns:fb="http://ogp.me/ns/fb#" lang="en">
<head>
<base href="http://localhost:8888/ZooFaroo/"/>
<meta charset="UTF-8" />
<META NAME="description" CONTENT="<?php echo $page_title; ?> the online social marketplace for the free exchange of goods or services through trade, barter, or money.">
<META NAME="keywords" CONTENT="barter, exchange, goods, services, offered, needed, fair, equal, money">
<meta property="og:title" content="ZooFaroo - Be social.  Trade local." />
<meta property="og:type" content="activity" />
<meta property="og:url" content="http://www.zoofaroo.com<?php echo $_SERVER['REQUEST_URI'] ?>" />
<meta property="og:image" content="http://www.zoofaroo.com/images/zoofaroo.png" />
<meta property="og:site_name" content="ZooFaroo" />
<meta property="fb:admins" content="787939672" />
<meta property="og:description"content="<?php echo $page_title; ?> the online social marketplace for the free exchange of goods or services through trade, barter, or money."/>
<title id="title"><?php echo $page_title; ?></title>

<script src="js/SD.js"></script>
<script src="js/jquery.js"></script>
<script src="js/modernizr.js"></script>
<!--<script src="js/zoofaroo.js"></script>-->
<script src="js/variables.js"></script>
<script src="js/confirmUser.js"></script>
<script src="js/fetchCategoryArray.js"></script>
<script src="js/fetchCityArray.js"></script>
<script src="js/fetchStateArray.js"></script>
<script src="js/displayCities.js"></script>
<script src="js/displayStates.js"></script>
<script src="js/quickSearch.js"></script>
<script src="js/listDisplay.js"></script>
<script src="js/alertBox.js"></script>
<script src="js/editBox.js"></script>
<script src="js/shareBox.js"></script>
<script src="js/mOffer.js"></script>
<script src="js/localeAction.js"></script>
<script src="js/loginAction.js"></script>
<script src="js/ajaxUpload.js"></script>
<script src="js/genTimer.js"></script>
<script src="js/abuseReport.js"></script>
<script src="js/bcInjector.js"></script>
<link rel="stylesheet" type="text/css" href="css/barter.css" />
<script type="text/javascript">
var baseHref = 'http://localhost:8888/ZooFaroo/';
<? $baseHref = 'http://localhost:8888/ZooFaroo/'; ?>
chosenPage = '<? echo $p; ?>';
</script>
</head>
<body>
<script src="js/fb.js"></script>
<div id="fb-root"></div>
<div id="alertScreen"></div>
<div class="boxGradientDrop  postBaseShare"></div>
<div class="boxDrop alert"><div id="alertHdrImg"></div><div id="alertHdr"></div><div id="alertMsg"></div></div>
<script>$('html, body').animate({scrollTop:0});chosenPage = '<? echo $p; ?>';function pageRefresh(){clearTimeout(genericTimer);window.location.reload();}</script>
<div class="wrapper">
<div class="boxBasic sideBar"> <div id='shareBtns'> <!--Facebook--> <div id="facebook"> <a href="http://www.facebook.com/ZooFaroo" target="_blank"><img src="images/facebookFollow.png" height="25" width="25" alt="Find us on Facebook!" style="border:none;"/></a> </div> <div id="twitter"> <!--Twitter--> <a href="https://twitter.com/ZooFaroo" target="_blank"><img src="images/twitterFollow.png" height="25" width="25" alt="Follow us on Twitter!" style="border:none;"/></a> </div> <!--Google--> <div id="plus1"> <link href="https://plus.google.com/103958829492703792482" rel="publisher" /> <a href="https://plus.google.com/103958829492703792482?prsrc=3" style="text-decoration: none;"><img src="images/googlePlusFollow.png" height="25" width="25" alt="Follow us on Twitter!" style="border:none;"/></a> </div> </div><!--share btns--> </div>
<div class="boxDrop mainBase">
<div class="boxBasic secondBase">
<header class="header">
<div id="logStatus"><div class="loggedInAs"></div><div class="gotoUserPage"></div><div class="logOut"></div><div class="notUser"></div></div>
<div class="index-ZooFaroo"><a href="home.html"><img src='images/zoofaroo.png' alt='ZooFaroo - Be social.  Trade local.' width="346" height="65"  style='border:none;'/></a></div>
<hgroup id="h1Header"><h1>www.zoofaroo.com</h1><h2>be social.  trade local.</h2></hgroup>
<div id="index-barterDef">ZooFaroo<img src="images/definition.jpg" alt='ZooFaroo definition' width=99 height=18 style="float:right; margin-top:2px; margin-right:70px;"/><div id="definition"><div>noun</div>online social marketplace for the free exchange of goods or services through trade, goodwill, or money.</div></div>
<nav id="header-menu">
<div class="buttonWrap header-menuBtn" id="home.html">home</div>
<div class="buttonWrap header-menuBtn" id="register.html">register</div>
<div class="buttonWrap header-menuBtn" id="edit.html">edit your account</div>
<div class="buttonWrap header-menuBtn" id="contact.html">contact us</div>
<div class="buttonWrap header-menuBtn" id="blog/">blog</div>
<div class="buttonWrap header-menuBtn" id="login.html">login</div>
<div class="buttonWrap header-menuBtn" id="directory.html">user directory</div>
<div class="buttonWrap header-menuBtn" id="about.html">What is ZooFaroo?</div>
</nav><!--header-menu-->
<div class="buttonWrap listPostingBtn">Leave your own posting!</div>
<div class="searchPartial"></div>
</header><!--header-->
<script>
$.getScript('js/header.mod.js');
</script>