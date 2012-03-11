var localeObject = {
	localeAction:function(local){
	switch(Modernizr.localstorage){//if browser supports localStorage
					case true:
						if(localStorage.getItem('zoofaroo_chosenState') !== null){
								//retrieve states array from localStorage
								var retrievedChosenState = localStorage.getItem('zoofaroo_chosenState');
						}
						if(localStorage.getItem('zoofaroo_chosenCity') !== null){
								//retrieve states array from localStorage
								var retrievedChosenCity = localStorage.getItem('zoofaroo_chosenCity');
						}
						
						if(local=='state'){
							return retrievedChosenState;
						}
						
						if(local=='city'){
							return retrievedChosenCity;
						}
						break;
		}
	}
}
