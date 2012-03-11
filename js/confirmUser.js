var confirmUserObject = {
confirmUser:function(){
	switch(Modernizr.localstorage){//if browser supports localStorage
	
		case true:
			if(localStorage.getItem('zoofaroo_username')!==null && localStorage.getItem('zoofaroo_password')!==null && localStorage.getItem('zoofaroo_loginTime')!==null){//if username and password are found in localStorage
					var curdate = new Date();
					var curMilli = curdate.getTime();
					var logInTime = localStorage.getItem('zoofaroo_loginTime');
					var loginDif = parseInt(curMilli)-parseInt(logInTime);
					if(loginDif<7200000){//if they have been logged in for less than two hours
						//declare username
						var retrievedUsername = localStorage.getItem('zoofaroo_username');
						//declare password
						var retrievedPassword = localStorage.getItem('zoofaroo_password');
						//open logform
						lValidate(retrievedUsername, retrievedPassword, 'storage');
						//break;
					}else{//if they have been logged in for more than two hours and stagnant, then log them out
						clearUser();	
					}
			}
		break;
			
		default:
			//if username is not found in localStorage
			//display the login form
			clearUser();
			break;
	}
}
}