<?php
include_once('../includes/connect.php');
$version = $_REQUEST['version'];
		$versionData = mysql_query("SELECT * FROM barter_admin WHERE id = '1'") or die('X10');
		$versionArray = mysql_fetch_array($versionData, MYSQL_ASSOC);
		$currentVersion = $versionArray[$version];
		echo $currentVersion;
?>