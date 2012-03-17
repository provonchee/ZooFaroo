<!DOCTYPE html>
<html xmlns:fb="http://ogp.me/ns/fb#" lang="en">
<head>
<noscript><style type="text/css">.wrapper {display:none;}</style><div class="boxDrop mainBase"><div class="boxBasic secondBase"><div id="index-ZooFaroo"><img src='images/zoofaroo.png' alt='ZooFaroo - Be social.  Trade local.'  style='border:none;'/></div><div class="primaryThePostBase" style="margin-top: 75px; padding:10px;">It looks like you have javascript disabled. Zoofaroo currently will not display without javascript.<br/>If you'd like you use our site (please do, it's a lot of fun) you must enable javascript.</div></div></div></noscript>
<base href="http://www.zoofaroo.com/"/>
<meta charset="UTF-8" />
<META NAME="description" CONTENT="<?php echo $page_title; ?> the online social marketplace for the free exchange of goods or services through trade, barter, or money.">
<META NAME="keywords" CONTENT="barter, exchange, goods, services, offered, needed, fair, equal, money">
<meta property="og:title" content="ZooFaroo - <?php echo $_SERVER['REQUEST_URI'] ?>" />
<meta property="og:type" content="activity" />
<meta property="og:url" content="http://www.zoofaroo.com<?php echo $_SERVER['REQUEST_URI'] ?>" />
<meta property="og:image" content="http://www.zoofaroo.com/images/zoofaroo.png" />
<meta property="og:site_name" content="ZooFaroo - Be social.  Trade local" />
<meta property="fb:admins" content="787939672" />
<meta property="og:description"content="The online social marketplace for the free exchange of goods or services through trade, barter, or money."/>
<title id="title"><?php echo $page_title; ?></title>
<link rel="stylesheet" type="text/css" href="css/barter.css" />
<!--[if IE 8]><link rel="stylesheet" type="text/css" href="css/ie8barter.css" /><![endif]-->
<!--[if lt IE 8]><script>window.open('http://www.zoofaroo.com/updateIE.html', '_self');</script><![endif]-->
<!--[if !IE]><!--><script src="js/SD.js"></script><!--<![endif]-->
<script src="js/jquery.js"></script>
<script src="js/modernizr.js"></script>
<script src="js/zoofaroo.js"></script>
<? $baseHref = 'http://www.zoofaroo.com/'; ?>
</head>
<body>
<div id="fb-root"></div>
<script src="js/fb.js"></script>
<div id="alertScreen"></div>
<div class="boxGradientDrop  postBaseShare"></div>
<div class="boxDrop alert"><div id="alertHdrImg"></div><div id="alertHdr"></div><div id="alertMsg"></div></div>
<script>$('html, body').animate({scrollTop:0});chosenPage = '<? echo $p; ?>';function pageRefresh(){clearTimeout(genericTimer);window.location.reload();}</script>
<div class="wrapper">
<div class="boxBasic sideBar">
<div id='shareBtns'>
<!--Facebook-->
<div id="facebook">
<a href="http://www.facebook.com/ZooFaroo" target="_blank"><img src="images/facebookFollow.png" height="25" width="25" alt="Find us on Facebook!" style="border:none;"/></a>
</div>
<div id="twitter">
<!--Twitter-->
<a href="https://twitter.com/ZooFaroo" target="_blank"><img src="images/twitterFollow.png" height="25" width="25" alt="Follow us on Twitter!" style="border:none;"/></a>
</div>
<!--Google-->
<div id="plus1">
<link href="https://plus.google.com/103958829492703792482" rel="publisher" />
<a href="https://plus.google.com/103958829492703792482?prsrc=3" style="text-decoration: none;"><img src="images/googlePlusFollow.png" height="25" width="25" alt="Follow us on Twitter!" style="border:none;"/></a>
</div>
</div><!--share btns-->
</div>
<div class="boxDrop mainBase">
<div class="boxBasic secondBase">
<div class="header">
<div id="logStatus"><div class="loggedInAs"></div><div class="gotoUserPage"></div><div class="logOut"></div><div class="notUser"></div></div>
<div id="index-ZooFaroo"><a href="home.html"><img src='images/zoofaroo.png' alt='ZooFaroo - Be social.  Trade local.' width="346" height="65"  style='border:none;'/></a></div>
<div id="h1Header"><h1>www.zoofaroo.com</h1><h2>be social.  trade local.</h2></div>
<div id="index-barterDef">ZooFaroo<img src="images/definition.jpg" alt='ZooFaroo definition' width=99 height=18 style="float:right; margin-top:2px; margin-right:70px;"/><div id="definition"><div>noun</div>online social marketplace for the free exchange of goods or services through trade, goodwill, or money.</div></div>
<div id="header-menu">
<div class="buttonWrap header-menuBtn" aux="home.html">home</div>
<div class="buttonWrap header-menuBtn" aux="register.html">register</div>
<div class="buttonWrap header-menuBtn" aux="edit.html">eidt your account</div>
<div class="buttonWrap header-menuBtn" aux="contact.html">contact us</div>
<div class="buttonWrap header-menuBtn" aux="blog/">blog</div>
<div class="buttonWrap header-menuBtn" aux="login.html">login</div>
<div class="buttonWrap header-menuBtn" aux="directory.html">user directory</div>
<div class="buttonWrap header-menuBtn" aux="about.html">What is ZooFaroo?</div>
</div><!--header-menu-->
<div class="buttonWrap listPostingBtn">Leave your own posting!</div>
<div class="searchPartial"></div>
</div><!--header-->
<script>
$('.listPostingBtn').unbind('click').click(function(){window.open(''+baseHref+'post.html', '_self');});
$('#header-menu .header-menuBtn:eq(0)').unbind('click').click(function(){window.open(''+baseHref+$('#header-menu .header-menuBtn:eq(0)').attr('aux')+'', '_self');localStorage.removeItem('zoofaroo_chosenState');localStorage.removeItem('zoofaroo_chosenCity');});
$('#header-menu .header-menuBtn:eq(1)').unbind('click').click(function(){window.open(''+baseHref+$('#header-menu .header-menuBtn:eq(1)').attr('aux')+'', '_self');});
$('#header-menu .header-menuBtn:eq(2)').unbind('click').click(function(){window.open(''+baseHref+$('#header-menu .header-menuBtn:eq(2)').attr('aux')+'', '_self');});
$('#header-menu .header-menuBtn:eq(3)').unbind('click').click(function(){window.open(''+baseHref+$('#header-menu .header-menuBtn:eq(3)').attr('aux')+'', '_self');});
$('#header-menu .header-menuBtn:eq(4)').unbind('click').click(function(){window.open(''+baseHref+$('#header-menu .header-menuBtn:eq(4)').attr('aux')+'', '_self');});
$('#header-menu .header-menuBtn:eq(5)').unbind('click').click(function(){window.open(''+baseHref+$('#header-menu .header-menuBtn:eq(5)').attr('aux')+'', '_self');});
$('#header-menu .header-menuBtn:eq(6)').unbind('click').click(function(){window.open(''+baseHref+$('#header-menu .header-menuBtn:eq(6)').attr('aux')+'', '_self');});
$('#header-menu .header-menuBtn:eq(7)').unbind('click').click(function(){window.open(''+baseHref+$('#header-menu .header-menuBtn:eq(7)').attr('aux')+'', '_self');});
</script>