<?
class emailNotesAction{
	protected $notesQueryRows = NULL;
	protected $emailAddys = array(NULL);
	protected $userIDs = array(NULL);
	function emailNotes($offerNeed, $postID, $state, $city, $category, $title, $cityID, $catID, $uID){
		
		$notesQuery = mysql_query("SELECT users.email, users.user_id 
									FROM barter_users AS users 
									INNER JOIN barter_".$offerNeed." 
									AS ".$offerNeed." 
									ON ".$offerNeed.".user_id = users.user_id 
									WHERE ".$offerNeed.".city_id = '$cityID' && ".$offerNeed.".category_id = '$catID' && ".$offerNeed.".emailNotes='2' && ".$offerNeed.".secCode='clear'") or die('X10');
		
		$this->notesQueryRows = mysql_num_rows($notesQuery);
				
		if($this->notesQueryRows>0){
			 
			 if($offerNeed=='offered'){
				 $oN = 'Needed';
				 $oNS = 'needs something you may have offered.';
			 }else{
				 $oN = 'Offered';
				 $oNS = 'has offered something you may need.';
			 }
			 
		 $em=0;
		 
		 while($notesQueryArray = mysql_fetch_array($notesQuery, MYSQL_NUM)){
			 $this->emailAddys[$em] = $notesQueryArray[0];
			 $this->userIDs[$em] = $notesQueryArray[1];
			 $em++; 
		 }
		 
		for($i=0; $i<count($this->emailAddys); $i++){ 
		 	if($this->userIDs[$i]!=$uID){
				$to = ''.str_replace("'","",$this->emailAddys[$i]).'';
				$from = 'NoReply@ZooFaroo.com';
				$fromname = 'NoReply@ZooFaroo.com';
				
				$subject = 'ZooFaroo Posting Notification';
				$body = 'Per your request, this email has been sent to you to notify you that a ZooFaroo user '.$oNS.'  Their posting info is below.<br/><br/>';
				$body .='Posting Title:'.$title.'.<br/><br/>';
				$body .='Posting Category:'.$category.'.<br/><br/>';
				$body .='Posting In:'.$city.', '.$state.'.<br/><br/>';
				$body .='The full posting can be found here: http://www.zoofaroo.com/'.$state.'/'.$city.'/'.$oN.'/'.$category.'/'.$postID.'.html<br/><br/>';
				$body .='(You can also copy and paste the above link to your browser\'s menu bar)<br/><br/>';
				$body .='You may discontinue Email Notifications at any time by logging into your ZooFaroo User Account<br/><br/>';
				$body .='If you feel you are receiving this email in error, please contact ZooFaroo at feedback@zoofaroo.com<br/><br/>';
				$body .='ZooFaroo - Be social.  Trade local.<br/>';
				$body .='web:&nbsp;&nbsp;www.zoofaroo.com<br/>';
				$body .='email:&nbsp;&nbsp;feedback@zoofaroo.com<br/><br/>';
				$body .='Thank you for using ZooFaroo!';
			
				$headers = "Date: ".date('r')."\n";
				$headers .= "Return-Path: ".str_replace("'","",$from)."\n";
				$headers .= "From: ".str_replace("'","",$fromname)."\n";
				$headers .= "Message-ID: <".md5(uniqid(time()))."@zoofaroo.com>\n";
				$headers .= "X-Priority: 3\n";
				$headers .= "MIME-Version: 1.0\n";
				$headers .= "Content-Transfer-Encoding: 8bit\n";
				$headers .= 'Content-Type: text/html; charset="iso-8859-1"'."\n";
				
				$body = stripslashes($body);
		
				$mail_sent = @mail( $to, $subject, $body, $headers );
			}
		
		}
	  }
		
	}
}
?>