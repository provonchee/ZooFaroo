//static variables
var chosenPage = null;
var chosenRegionName = null;
var chosenStateID = null;
var chosenState = null;
var chosenStateAlt = null;
var chosenCityID = null;
var chosenCity = null;
var chosenCityAlt = null;
var chosenSpecificLocale = null;
var chosenCategoryID = null;
var chosenCategory = null;
var chosenCategoryAlt = null;
var chosenOfferNeed = null;
var chosenTitle = null;
var chosenPostingID = null;
var chosenUserID = null;
var chosenUser = null;
var chosenStateArray = null;
var chosenCategoryArray = null;
var genericTimer = null;
//static variables

//interactive variables
var drpDwnStateID = null;
var drpDwnState = null;
var drpDwnStateAlt = null;
var drpDwnCityID = null;
var drpDwnCity = null;
var drpDwnCityAlt = null;
var drpDwnCategoryID = null;
var drpDwnCategory = null;
var drpDwnCategoryAlt = null;
var drpDwnOfferNeed = null;
var drpDwnTitle = null;
var drpDwnPosting = null;
var drpDwnEmailNotes = null;
var drpDwnMoneyOffer = null;
var drpDwnGSW = null;
//interacive variables

//images
var hdrImg = "<img src='images/zoofaroo.png' alt='ZooFaroo - Be social.  Trade local.'  style='border:none;'/>";
var alertHdrImg = "<img src='images/zoofaroo.png' alt='ZooFaroo - Be social.  Trade local.'  style='border:none; height:40px;'/>";

//universal error alert
function errorReset(){window.open(''+baseHref+'home.html', '_self')};

//alerts
var wildcard = 'A \'wild card\' is any posting where either the \'offer\' or the \'need\' (just one of them) is left open.  In such cases, the user either can\'t think of anything specific to \'offer\', or can\'t think of anything specific they \'need\' but are open to receiving suggestions, deals, inquiries, etc. for the \'offer\' or \'need\' that they have filled out.';
var savedAlrt = 'Your changes have been successfully saved!';
var errorAlrt = 'We\'re sorry, there was an unexplained error processing your request, please try again later.';
var deleteConfirm = 'Are you sure you want to delete this forever?';
var deleteSuccess = 'Your post has been successfully deleted!';
var updateSuccess = 'Your account was succesfully updated.  Please login to your account to view the changes';
var updatePostSuccess = 'Your posting was succesfully updated!';
var accountDelete = 'Are you sure you want to delete your account and all posts/information associated with it?  This cannot be undone.';
var deleteAccountSuccess = 'Your account and all postings associated with it have been successfully deleted.  Thank you for using ZooFaroo and we hope to see you again soon!';
var emptyForm = 'Please make sure the form is completely filled in.';
var formCheck = 'Please make sure the form is completely filled in.';
var invalidUP = 'Username and/or Password not in our records!  Please make sure you are a registered user.';
var atLeastOne = 'We\'re sorry, you have to at least have one \'offer\' or one \'need\' filled out.';
var cityStateAlrt = 'Please make sure you have chosen a city and state and specific location!';
var moneyOfferAlrt = 'Please check whether or not you are open to the idea of exchanging money.';
var codeAlrt = 'Sorry, the security code was not entered correctly.';
var emailInUse = 'We\'re sorry, but that email address is alreay in use.&nbsp;&nbsp;Please try a different one.';
var userNameInUse = 'We\'re sorry, but that username is alreay in use.&nbsp;&nbsp;Please try a different one.';
var reportConfirm = 'Are you sure you want to report this as offensive?';
var passWordMatch = 'Please make sure that your passwords match!';
var acceptMoneyOffer =  'This user will only accept money for what they are offering';
var acceptMoneyNeed = 'In addition to trading, this user will condsider paying for this need';
var quickSearchAlrt = 'Please check to make sure that a state is chosen and that a keyword is filled in.';
var alrdyrv = 'We\'re sorry, but our records show that you\'ve already left a review for this user.  If you feel you are getting this message in error please feel free to contact us.';
var invalidUN = 'The username you entered is not the correct format, please try again.';
var invalidPW = 'The password you entered is not the correct format, please try again.';
var invalidEM = 'The email you entered is not on our records, please try again.';
var regSuccess = '<div id="register-successful-text"><b style="font-size:1.1em;">Almost Finished!&nbsp:&nbsp;One More Step...</b><br/>You should be receiving a confirmation email shortly.<br/><br/><b style="color:#FF0000; font-size:1.2em;">Be sure to visit the link within the email or your registration will not be activated.</b><br/><br/>If the email does not arrive in the next 30 minutes <b>check your junk and spam folders</b>, it could be hiding there.<br/><br/>Please note: Some Internet Service Providers (ISPs) have recently implemented a new Spam Filtering System. As a result, your confirmation email may be filtered to your Junk E-Mail folder unless you add us to your Safe List or White List.<br/><br/>Enjoy ZooFaroo!</div>';
var photoAlrt = 'You must first choose a photo before you can upload it!';
var photoErr = 'We\'re sorry, an error has occured while trying to upload your photo.  It is either too big to upload or of the wrong file type.  Please try again with a different photo or a smaller version of this one.';
var sameUP = 'Please make sure that your username and password are not the same.';
var hasPhotoGraph = 'This posting has a photograph'
//alerts