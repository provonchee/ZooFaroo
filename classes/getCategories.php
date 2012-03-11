<?
class getCategories {

	public $categories = array();
	public $fa=1;
	
	function gCategories(){
		
		
		//SELECTS ALL CATEGORIES (WITH THEIR ID'S) FROM THE DB AND PUTS THEM INTO AN ARRAY
		$this->categories[0][0] = NULL;//<---these slots are not used and should be left at NULL
		$this->categories[0][1] = NULL;
		$this->categories[0][2] = NULL;
		$this->categories[0][3] = NULL;
		
			$fetchCategories = mysql_query("SELECT * FROM barter_categories ORDER BY category ASC");
				while($fetchCategoriesArray = mysql_fetch_array($fetchCategories, MYSQL_NUM)){
						$this->categories[$this->fa][0] = $fetchCategoriesArray[0];
						$this->categories[$this->fa][1] = $fetchCategoriesArray[1];
						$this->categories[$this->fa][2] = $fetchCategoriesArray[2];
						$this->fa++;
				}
	}
			
	//}
			
}
?>