<?
$whichOne = $_REQUEST['whichOne'];
$whichKind = $_REQUEST['whichKind'];
$usrid=$_REQUEST['userid'];
$postOrEdit = $_REQUEST['postOrEdit'];
if($whichKind=='offer'){
	$GoodsServices = 'offerGoodsServices'.$whichOne;
	$Title = 'offerTitle'.$whichOne;
	$Posting = 'offerPosting'.$whichOne;
	$emailNotes = 'offerEmailNotes'.$whichOne;
	$Money = 'offerMoney'.$whichOne;
	$OfferNeedGS = 'What are you offering?: ';
	$Nothing = 'Nothing to offer right now.';
	$TitleLabel = 'Offering Title:';
	$DescriptionLabel = 'Offering Description:';
	$EmailNotesMsg = 'Do you want to be notified via email when someone posts something they need similar to what you\'re offering here?';
	$MoneyMsg = 'I will <b>only</b> accept money for what I\'m offering';
	$moneyPNG = 'onlyMoney.png';
}else if($whichKind=='need'){
	$GoodsServices = 'needGoodsServices'.$whichOne;
	$Title = 'needTitle'.$whichOne;
	$Posting = 'needPosting'.$whichOne;
	$emailNotes = 'needEmailNotes'.$whichOne;
	$Money = 'needMoney'.$whichOne;
	$OfferNeedGS = 'What do you need?: ';
	$Nothing = 'Nothing I need right now.';
	$TitleLabel = 'Need Title:';
	$DescriptionLabel = 'Need Description:';
	$EmailNotesMsg = 'Do you want to be notified via email when someone posts something they\'re offering that is similar to what you need?';
	$MoneyMsg = 'I am open to paying for what I need';
	$moneyPNG = 'money.png';
}
$postNumber = $whichOne+1;
?>
<div id="post-<? echo $whichKind ?>FormTop">
    <div id="post-<? echo $whichKind ?>Tag"><? echo $whichKind ?>&nbsp;&nbsp;#<? echo $postNumber; ?></div>&nbsp;&nbsp;<label for="<? echo $whichKind ?>GoodsServices" ><? echo $OfferNeedGS; ?></label>
    <input type="radio" name="<? echo $GoodsServices; ?>" value="g"> Goods &nbsp;&nbsp;
	<input type="radio" name="<? echo $GoodsServices; ?>" value="s"> Services &nbsp;&nbsp;
    <div id="w" style="display:inline;"><input type="radio" name="<? echo $GoodsServices; ?>" value="w"> <? echo $Nothing; ?></div>
</div><!--FormTop-->

    <div id="post-formClear" name="<? echo $postNumber; ?>"></div>
    <div id="post-formEdit" name="<? echo $postNumber; ?>">edit</div>
    <div id="post-formDelete" name="<? echo $postNumber; ?>">delete</div>
    <br/>

  
<div id="post-<? echo $whichKind ?>FormMiddle">
     <br/>
     <div class="maxLengthMsg" style="margin-top:50px;"></div>
     <script>$('.maxLengthMsg').html('<u>PLEASE NOTE</u>:<br/>The Title must not be longer than 75 characters and the Description must not be longer than 600 characters.');</script>
     <div id="<? echo $whichKind ?>Categories"></div><!--categories-->
    <br/>
    <? echo $TitleLabel; ?>
    <br/>
	<input name="<? echo $Title; ?>" id="<? echo $Title; ?>" aux="title" type="text" class="input" size="95" maxlength="75" style="font-family:Arial, Helvetica, sans-serif; font-size:0.9em;"/>
    <br/>
   	<br/>
    <? echo $DescriptionLabel; ?>
     <br/>
  	<TEXTAREA NAME="<? echo $Posting; ?>" id="<? echo $Posting; ?>" aux="description" class="textarea" COLS="110" ROWS="6" maxlength="600" style="font-family:Arial, Helvetica, sans-serif; font-size:0.9em;"></TEXTAREA>
    <br/>
    	<input type="hidden" name="cityName" value="<? echo $cityName; ?>" />
		<input type="hidden" name="stateName" value="<? echo $stateName;  ?>" />
        
    <div id="post-<? echo $whichKind ?>emailNotes" style="margin-top:15px;"><div class="moneyOption" style="padding-right: 5px;"><img src="images/mail.png"/></div><? echo $EmailNotesMsg; ?>
    <input type="checkbox" name="<? echo $emailNotes; ?>" value="2"></div> 
</div><!--FormMiddle-->

<div id="post-<? echo $whichKind ?>FormBottom">
     <div id="<? echo $whichKind ?>Money" style=""><br/><div class="moneyOption"><img src="images/<? echo $moneyPNG; ?>"/></div><div id="moneymsg" style="display:inline; margin-left:5px;"><? echo $MoneyMsg; ?>&nbsp;</div>
	<input type="checkbox" name="<? echo $Money; ?>" value="2"></div>
 
</div><!--FormBottom-->


<div id="post-<? echo $whichKind ?>FormPhoto">
<div class='buttonWrap post-offerChangePhoto'>Change or Remove Photo</div>
<div id="post-<? echo $whichKind ?>Photo" ><div class="moneyOption"><img src="images/photo.png"/></div>
Do you have a photo of this offer you'd like to upload?&nbsp;&nbsp;(Accepted image formats: jpg, jpeg, png, gif)
<form action="control/ajaxuploadInput.php" method="post" name="pupload" id="pupload" enctype="multipart/form-data">
<input type="hidden" name="maxSize" value="9999999999" />
<input type="hidden" name="maxW" value="400" />
<input type="hidden" name="fullPath" value="<? echo $baseHref; ?>photos/tempPhotos/" />
<input type="hidden" name="relPath" value="../photos/tempPhotos/" />
<input type="hidden" name="colorR" value="255" />
<input type="hidden" name="colorG" value="255" />
<input type="hidden" name="colorB" value="255" />
<input type="hidden" name="maxH" value="1200" />
<input type="hidden" name="filename" value="filename" />
<input type="file" name="filename" onchange="ajaxUpload(this.form,'control/ajaxuploadInput.php?filename=name&amp;maxSize=9999999999&amp;maxW=400&amp;fullPath=<? echo $baseHref; ?>photos/tempPhotos/&amp;relPath=photos/tempPhotos/&amp;colorR=255&amp;colorG=255&amp;colorB=255&amp;maxH=1200','post-<? echo $whichKind ?>ActPhoto','','');photoListen(<? echo $whichOne; ?>, '<? echo $postOrEdit; ?>'); return false;" />
</form>
</div><div id="photoLoading"></div>
<div id="post-<? echo $whichKind ?>ActPhoto" style="border:5px solid #ffffff"></div>
</div>

