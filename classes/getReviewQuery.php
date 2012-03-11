<?
/*QUERIES THE DATA BASE AND GRABS ALL RELAVENT REVIEW DATA BASED ON THE USER ID DELIVERED TO IT*/
class getReviewQuery{
	public $fetchData = NULL;
		function __construct($uID){
			$this->fetchData = mysql_query("SELECT reviewee.username, reviewee.user_id, reviewedBy.username, reviewedBy.user_id, review.date_reviewed, review.reviewTitle, review.reviewPost, review.recommend, review.review_id 
								 FROM barter_reviews AS review
								 INNER JOIN barter_users AS reviewee 
								 ON reviewee.user_id = review.user_id 
								 INNER JOIN barter_users AS reviewedBy 
								 ON reviewedBy.user_id = review.reviewedBy_id 
								 WHERE review.user_id = '$uID' ORDER BY review.date_reviewed DESC
								 ");
								 
		}
}
?>