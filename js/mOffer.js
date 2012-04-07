var mOfferObject = {
	mOffer:function(theFirstArray, j, kind){
switch(theFirstArray){
	
	case 'theMainPost':
			
			if(j=='2'){
				if(kind=='offer'){
					return '&nbsp;&nbsp;<div class=" moneyOption"><img src="images/onlyMoney.png" alt="This user will only accept money offers"/></div>';
				}else{
					return '&nbsp;&nbsp;<div class=" moneyOption"><img src="images/money.png" alt="In addition to trading, this user will condsider paying for their need"/></div>';	
				}
				
			}else{
				return '';
			}
	break;
	
	default://search, edit, postList
		
			if(theFirstArray[j][14]=='2'){
				if(kind=='Offered'){
					$('.secondListBase #list-offerLink:eq('+j+')').append('&nbsp;&nbsp;<div class=" moneyOption"><img src="images/onlyMoney.png"/></div>');
					$('.secondListBase #list-offerLink:eq('+j+') .moneyOption').unbind('click').click(function(){
						alertObject.alertBox('MONEY OFFERS ONLY', acceptMoneyOffer, 'alert', null, null, null);																		 
																								 });
			//oMoney alt
			$('.secondListBase #list-offerLink:eq('+j+') .moneyOption').attr({ 
				title: "This user will only accept money offers",
				alt:  "money offers"
			});
				}else{
					$('.secondListBase #list-needLink:eq('+j+')').append('&nbsp;&nbsp;<div class=" moneyOption"><img src="images/money.png"/></div>');
					$('.secondListBase #list-needLink:eq('+j+') .moneyOption').unbind('click').click(function(){
						alertObject.alertBox('OPEN TO OFFERS', acceptMoneyNeed, 'alert', null, null, null);																		 
																								 });
			//nMoney alt
			$('.secondListBase #list-needLink:eq('+j+') .moneyOption').attr({ 
				title: "In addition to trading, this user will condsider paying for their need",
				alt:  "money offers"
			});

				}
			}
	
	break;
	}
	}
}