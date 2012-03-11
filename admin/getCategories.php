<?
include('connect.php');
$categories = array();
$fc=1;
$categories[0][0] = 'NULL';
$categories[0][1] = 'NULL';
$categories[0][2] = 'NULL';

	$fetchCategories = mysql_query("SELECT * FROM barter_categories");
		while($fetchCategoriesArray = mysql_fetch_array($fetchCategories)){
				$categories[$fc][0] = $fetchCategoriesArray['category_id'];
				$categories[$fc][1] = $fetchCategoriesArray['category'];
				$categories[$fc][2] = $fetchCategoriesArray['parent_category'];
				echo '"'.mb_convert_case($categories[$fc][1], MB_CASE_TITLE, "UTF-8").'", "'.$categories[$fc][2].'",';
				$fc++;
				
		}
?>