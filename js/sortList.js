var sortListObject = { sortListDisplay:function(offerArray, needArray, greetingUserName){


if(offerArray){//start with offers
		offerPostCount = offerArray[0][19];
		postCount = offerPostCount;//start with offers
	if(needArray){
		needPostCount = needArray[0][19];
	}else{
		needPostCount = 0;
	}
}else if(needArray){//if there are no offers then default to needs
	offerPostCount = 0;
	if(needArray){
		needPostCount = needArray[0][19];
		postCount = needPostCount;//start with needs
	}else{
		needPostCount = 0;
	}
	
}else{
	offerPostCount = 0;
	needPostCount = 0;
	postCount = 0;
}

totalPostCount = offerPostCount+needPostCount;

if(postCount>0){
	$('.secondListBase').fadeIn('fast');
	
	//since user/edit page shows an all postings list, we bypass pagination here
		pageCount = 1;
		listFinish = postCount;
							  
	//begin cycle
	if(offerPostCount!=0){
		//uniqueArrayParsed = offerArray;
		populateList(offerArray, needArray, 'Offered');
		//uniqueArrayParsed = needArray;
	 }else{
		//uniqueArrayParsed = needArray;
		populateList(offerArray, needArray, 'Needed');
		//uniqueArrayParsed = offerArray;
	 }
		
}else{//no postings to edit
$('.secondListBase').fadeIn('fast');
$('#review-postings-greeting').html('<div class="boxGradient editUserPgDivider listPost">A total of&nbsp;<span style="color:#3366cc">0</span>&nbsp;postings found under username:&nbsp;<span style="color:#3366cc">'+greetingUserName+'</span></div>');
}

}
}