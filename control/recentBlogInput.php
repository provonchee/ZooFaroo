<?
$host = "localhost";

$usernameDB = "root";

$passwordDB = "bird25";

$whichDB = "blog";

/*$usernameDB = "square18_joshua";

$passwordDB = "B1rdP01nt103";

$whichDB = "square18_blog";*/

$con = mysql_connect($host,$usernameDB,$passwordDB);
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
$currentPost = array();
$dbTable = 'wp_posts';
$recentPost = mysql_query("SELECT * FROM $dbTable ORDER BY ID DESC") or die(mysql_error());
$recentPostsArray = mysql_fetch_array($recentPost);
if($recentPostsArray[1]==2){//author
	$currentPost[0] = 'Joshua';
}else if($recentPostsArray[1]==3){//author
	$currentPost[0] = 'Joel';
}
$currentPost[1] = $recentPostsArray[5];//title
$currentPost[2] = $recentPostsArray[4];//post
echo json_encode($currentPost);
?>