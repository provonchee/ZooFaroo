<?php

$host = "localhost";

$usernameDB = "root";

$passwordDB = "bird25";

$whichDB = "barter";

/*$usernameDB = "square18_joshua";

$passwordDB = "B1rdP01nt103";

$whichDB = "square18_barter";*/

$con = mysql_connect($host,$usernameDB,$passwordDB);

//if it cant connect echo cant connect and mysql_error;

if (!$con) {

	echo "unable to connect to the database";

	echo mysql_error($con);

	exit();

}else{$connected=1;}

//select the database

$db = mysql_select_db($whichDB);

//if it cant open the DB, echo cant open DB and echo mysql_error

if (!$db) {

	echo "unable to open DB";

	echo mysql_error($db);

	exit();

}else{$opened=1;}

?>