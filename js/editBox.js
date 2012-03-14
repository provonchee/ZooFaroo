var editObject = {
	editBox:function(whichKind, whichOne, postID, aux, subKind){
		
		//TAKES CARE OF SCREEN AND ALERT AS WELL AS MULTPLE ALERTS AND HOW TO DEAL WITH THEIR SCREENS RESPECTIVELY
		function screenAndAlert(){
		if($('.mainBase .postBaseEdit').height()>$('.mainBase').height()){
		$('#alertScreen').css({'display':'block', 'opacity':'0.5', 'filter':'alpha(opacity=50)', 'width':$(document).width(), 'height':$('.mainBase .postBaseEdit').height()+500});
		}else{
		$('#alertScreen').css({'display':'block', 'opacity':'0.5', 'filter':'alpha(opacity=50)', 'width':$(document).width(), 'height':$(document).height()});
		}
		if($(window).width()<1200){
		$('#alertScreen').css({'-webkit-transform':'scale(1.11)', '-moz-transform':'scale(1.11)', '-o-transform':'scale(1.11)', '-ms-transform':'scale(1.11)',  'margin-top':'0%'});
		}
		$('.mainBase .postBaseEdit').css({'display':'block'});
		}
		
		if(chosenPage=='post'){
			screenAndAlert();
			$('.mainBase .postBaseEdit').load("modules/postingForm.php?whichKind="+whichKind+"&whichOne="+whichOne+"&postOrEdit=edit", function(){
						
																								  
						$('.mainBase .postBaseEdit').prepend('<div id="index-ZooFaroo" style="float:none;">'+alertHdrImg+'</div>');
						$(".mainBase .postBaseEdit input[value='"+window[""+whichKind+"GSWArray"][whichOne]+"']").attr('checked', true);
						$(".mainBase .postBaseEdit #post-"+whichKind+"formTop").css({'margin-top':'20px'});
		
						$('.mainBase .postBaseEdit #w').hide();
						$(".mainBase .postBaseEdit #post-formClear").hide();
						$(".mainBase .postBaseEdit #post-formEdit").hide();
						$(".mainBase .postBaseEdit #post-formDelete").hide();
						
						$('.mainBase .postBaseEdit #post-'+whichKind+'FormPhoto').hide();

																															
						$(".mainBase .postBaseEdit #"+whichKind+"Categories").html("Listing category: <select name='"+whichKind+"GoodsCategory' id='"+whichKind+"GoodsCategory' style='display: inline;'></select><select name='"+whichKind+"ServicesCategory' id='"+whichKind+"ServicesCategory' style='display: inline;'></select>").css({"color": "#333333", "font-size": "1em"});
						$(".mainBase .postBaseEdit #"+whichKind+"GoodsCategory").prepend("<option value='please choose...'>please choose...</option>");
						$(".mainBase .postBaseEdit #"+whichKind+"ServicesCategory").prepend("<option value='please choose...'>please choose...</option>");
						
						
							for(i=0; i<categoriesArray.length; i++){
								if(categoriesArray[i][2]=="g"){
									categoriesArrayAlt[i] = categoriesArray[i][1].replace(/_/g," ");
									goodsCategoryID[i] = categoriesArray[i][0];
									$(".mainBase .postBaseEdit #"+whichKind+"GoodsCategory").append("<option value='"+goodsCategoryID[i]+"'>"+categoriesArrayAlt[i]+"</option>");
									
								}else if(categoriesArray[i][2]=='s'){
									categoriesArrayAlt[i] = categoriesArray[i][1].replace(/_/g," ");
									servicesCategoryID[i] = categoriesArray[i][0];
									$(".mainBase .postBaseEdit #"+whichKind+"ServicesCategory").append("<option value='"+servicesCategoryID[i]+"'>"+categoriesArrayAlt[i]+"</option>");
								}
							}
						
						$(".mainBase .postBaseEdit input[name='"+whichKind+"GoodsServices"+whichOne+"']").unbind('click').click(function(){
											if($(".mainBase .postBaseEdit input[name='"+whichKind+"GoodsServices"+whichOne+"']:checked").val()=='g'){
																	$(".mainBase .postBaseEdit #"+whichKind+"ServicesCategory").hide();	
																	$(".mainBase .postBaseEdit #"+whichKind+"GoodsCategory").show();
											}else{
																	$(".mainBase .postBaseEdit #"+whichKind+"ServicesCategory").show();	
																	$(".mainBase .postBaseEdit #"+whichKind+"GoodsCategory").hide();
											}
																																		 });
							
						if(window[""+whichKind+"GSWArray"][whichOne]=='g'){
							$(".mainBase .postBaseEdit #"+whichKind+"ServicesCategory").hide();
							$(".mainBase .postBaseEdit #"+whichKind+"GoodsCategory").val(''+window[""+whichKind+"CategoryArray"][whichOne]+'');
						}
						if(window[""+whichKind+"GSWArray"][whichOne]=='s'){
							$(".mainBase .postBaseEdit #"+whichKind+"GoodsCategory").hide();
							$(".mainBase .postBaseEdit #"+whichKind+"ServicesCategory").val(''+window[""+whichKind+"CategoryArray"][whichOne]+'');
						}	
																														
						$(".mainBase .postBaseEdit #post-"+whichKind+"FormMiddle #"+whichKind+"Title"+whichOne+"").val(''+window[""+whichKind+"TitleArray"][whichOne]+'');
						$(".mainBase .postBaseEdit #post-"+whichKind+"FormMiddle #"+whichKind+"Posting"+whichOne+"").val(''+window[""+whichKind+"PostingArray"][whichOne]+'');
						
						if(window[""+whichKind+"EmailNotesArray"][whichOne]=='2'){
							$(".mainBase .postBaseEdit #post-"+whichKind+"emailNotes input[value='2']").attr('checked', true);
						}else{
							$(".mainBase .postBaseEdit #post-"+whichKind+"emailNotes input[value='2']").attr('checked', false);
						}
						
						if(window[""+whichKind+"MoneyArray"][whichOne]=='2'){
										$(".mainBase .postBaseEdit #post-"+whichKind+"FormBottom #"+whichKind+"Money input[value='2']").attr('checked', true);
									}else{
										$(".mainBase .postBaseEdit #post-"+whichKind+"FormBottom #"+whichKind+"Money input[value='2']").attr('checked', false);
									}
						if(whichKind=='offer'){
							$(".mainBase .postBaseEdit #post-"+whichKind+"FormBottom #"+whichKind+"Money #moneymsg").html('I will <b>only</b> accept money for what I\'m offering');
						}else{
							$(".mainBase .postBaseEdit #post-"+whichKind+"FormBottom #"+whichKind+"Money #moneymsg").html('I am open to paying for what I need');
						}
						
						
						if(whichKind=='offer'){
							$('.mainBase .postBaseEdit #post-'+whichKind+'FormPhoto').show();
							tempPhotoEdit.length = 0;
							divLocale = '.mainBase .postBaseEdit';
							pOrE = 'edit';
																					
							if(photosArray[whichOne]=='1'){
								tempPhotoEdit[0] = whichOne;
								tempPhotoEdit[1] =  '0';
								tempPhotoEdit[2] = '0';
								tempPhotoEdit[3] = '1';
								tempPhotoEdit[4] = '1';
								tempPhotoEdit[5] = '1';
								$('.mainBase .postBaseEdit .post-'+whichKind+'ChangePhoto').hide();
								$('.mainBase .postBaseEdit #post-'+whichKind+'ActPhoto').empty();
								$('.mainBase .postBaseEdit #post-'+whichKind+'FormPhoto').fadeIn('fast');
																
							}else{
								tempPhotoEdit[0] = whichOne;
								tempPhotoEdit[1] =  '1';
								tempPhotoEdit[2] = '1';
								tempPhotoEdit[3] = 'empty';
								tempPhotoEdit[4] = photosArray[whichOne];
								tempPhotoEdit[5] = '1';
								$('.mainBase .postBaseEdit #post-offerFormPhoto').css({'margin-top':'50px','display':'block', 'margin-left':'-350px'});
								$('.mainBase .postBaseEdit #post-offerFormPhoto #post-offerPhoto').hide();
								$('.mainBase .postBaseEdit .post-offerChangePhoto').unbind('click').show();
								
								$('.mainBase .postBaseEdit #post-offerActPhoto').html('<img id="'+tempPhotoEdit[4]+'" src="photos/tempPhotos/'+tempPhotoEdit[4]+'" name="100"/>');
								photoListen(whichOne, 'edit');
							}
						}
										
																												
						
						$(".mainBase .postBaseEdit").append("<div class='buttonWrap regEditSubmitBtn' style='margin-left:600px; margin-top:0px; float:left;'>Save and Continue</div><div class='buttonWrap editCancelBtn' style='margin-top: 0px; float:left;'>Cancel</div>");
						$(".mainBase .postBaseEdit .editCancelBtn").unbind('click').click(function(){
																								tempPhotoEdit[5] = 'cancel';
																								editFormPhotoAction(tempPhotoEdit);
																								$(".mainBase .postBaseEdit").empty();
																								$('#alertScreen').css({'display':'none'});
																								$('.postBaseEdit').css({'display':'none'});
																								
							});
						$(".mainBase .postBaseEdit .regEditSubmitBtn").unbind('click').click(function(){
																								drpDwnGSW = null;
																								drpDwnCategoryID = null;
																								drpDwnTitle = null;
																								drpDwnPosting = null;
																								drpDwnEmailNotes = null;
																								drpDwnMoneyOffer = null;
																								 
																								 if($(".mainBase .postBaseEdit input[name='"+whichKind+"GoodsServices"+whichOne+"']:checked").val()=='g'){
																									 drpDwnGSW = 'g';
																								 	drpDwnCategoryID = $(".mainBase .postBaseEdit #"+whichKind+"GoodsCategory option:selected").val();
																									drpDwnCategory = $(".mainBase .postBaseEdit #"+whichKind+"GoodsCategory option:selected").text();
																								 }else{
																									 drpDwnGSW = 's';
																									drpDwnCategoryID = $(".mainBase .postBaseEdit #"+whichKind+"ServicesCategory option:selected").val();
																									drpDwnCategory = $(".mainBase .postBaseEdit #"+whichKind+"ServicesCategory option:selected").text(); 
																								 }
																								 																								 
																								 
																								 drpDwnTitle = $(".mainBase .postBaseEdit #post-"+whichKind+"FormMiddle #"+whichKind+"Title"+whichOne+"").val();
																								
																								 drpDwnPosting = $(".mainBase .postBaseEdit #post-"+whichKind+"FormMiddle #"+whichKind+"Posting"+whichOne+"").val(); 	 
																								 
																								 if($(".mainBase .postBaseEdit input[name='"+whichKind+"EmailNotes"+whichOne+"']").is(':checked')){//if true
																								 	drpDwnEmailNotes = '2';
																								 }else{
																									drpDwnEmailNotes = '1'; 
																								 }
																								 
																								 if($(".mainBase .postBaseEdit input[name='"+whichKind+"Money"+whichOne+"']").is(':checked')){//if true
																								 	drpDwnMoneyOffer = '2';
																								 }else{
																									drpDwnMoneyOffer = '1'; 
																								 }
																								
																								 photosArray[whichOne]='1';
																								 
																								 if(drpDwnGSW && drpDwnCategoryID && drpDwnTitle && drpDwnPosting && drpDwnEmailNotes&&drpDwnMoneyOffer){
																								 	
																												 window[""+whichKind+"TitleArray"][whichOne] = drpDwnTitle;
																												 window[""+whichKind+"PostingArray"][whichOne] = drpDwnPosting;
																												 window[""+whichKind+"EmailNotesArray"][whichOne] = drpDwnEmailNotes;
																												 window[""+whichKind+"MoneyArray"][whichOne] = drpDwnMoneyOffer;
																													
																												 if(whichKind=='offer'){
																													 tempPhotoEdit[5] = 'save';
																													 editFormPhotoAction(tempPhotoEdit);
																												 }
																												 window[""+whichKind+"CategoryArray"][whichOne] = drpDwnCategoryID;
																												 window[""+whichKind+"GSWArray"][whichOne] = drpDwnGSW;
																												 var editPostNumber = whichKind+'&nbsp;#'+(whichOne+1);
																												 $("#post-"+whichKind+"Forms .post-"+whichKind+"Separator:eq("+whichOne+") #post-"+whichKind+"FormTop").html("<div id='post-"+whichKind+"Tag'>"+editPostNumber+"</div>&nbsp;-&nbsp;<b>"+drpDwnCategory+"</b>&nbsp;-&nbsp;"+drpDwnTitle+"");
																												
																												 $(".mainBase .postBaseEdit").empty();
																												 $('#alertScreen').css({'display':'none'});
																												 $('.postBaseEdit').css({'display':'none'});
																												  
																												 alertObject.alertBox('SUCCESS!', 'Your changes to&nbsp;'+whichKind+'&nbsp;#'+(whichOne+1)+' have been successfully saved!', 'alert', null, null, null);
																										
																								 }else{
																									alertObject.alertBox('ALERT!', emptyForm, 'gerror', null, '.postBaseEdit', null);
																								 }
																								 
																								 });
						
																												  
							});
		
		}else if(chosenPage=='edit'){///IF EDIT PAGE
		//RESET EDIT BOX BUTTONS
			function btnReset(action){
				Recaptcha.reload();
				
				$(".editCancelBtn").unbind('click').click(function(){tempPhotoEdit[5] = 'cancel';editFormPhotoAction(tempPhotoEdit, tempPhotoEdit[0], tempPhotoEdit[2]);$('.mainBase .postBaseEdit .postBaseEdit2').empty(); $('#alertScreen').css({'display':'none'});$('.postBaseEdit').css({'display':'none'});});
				$(".regEditSubmitBtn").html('Save and Continue');	
			
				$('.regEditSubmitBtn').unbind('click').click(function(){action();});
				$(".secCodeRefresh").unbind('click').click(function(){Recaptcha.reload();});
			}
			
			function editRefresh(){
				window.location.reload();	
				}
			
			switch(subKind){
				//EDITING A POSTING
			case 'editPost':
				if(aux!='delete'){
					screenAndAlert();
					$(window).scrollTop(0);
					if(navigator.appName=='Microsoft Internet Explorer'){
					$('html').scrollTop(0);
					}
					
					
					whichSubList = parseInt(aux);//which number in the list
					
					var oORn = null;//because we distinguish our 'offer' array and 'need' array with a '0' and '1' we have to assign that value to this variable
					if(whichKind=='offer'){
							oORn = 0;
						}else if(whichKind=='need'){
							oORn = 1;
						}
					
					$('.mainBase .postBaseEdit').css({'margin-left':'-8px'});
					$('.mainBase .postBaseEdit .postBaseEdit2').load("modules/postingForm.php?whichKind="+whichKind+"&whichOne="+whichOne+"&postID="+postID+"&postOrEdit=edit", function(){
						
						$('.mainBase .postBaseEdit .postBaseEdit2').css({'height':'auto'});
						$(".mainBase .postBaseEdit .postBaseEdit2 #post-"+whichKind+"FormTop #post-"+whichKind+"Tag").html(''+whichKind+'');
						$(".mainBase .postBaseEdit .postBaseEdit2 #post-"+whichKind+"FormTop").css({'margin-top':'25px', 'margin-left':'10px'});
						$(".mainBase .postBaseEdit .postBaseEdit2 #post-"+whichKind+"FormMiddle").css({'margin-left':'10px'});
						$(".mainBase .postBaseEdit .postBaseEdit2 #post-"+whichKind+"FormBottom").css({'margin-left':'10px'});
						$(".mainBase .postBaseEdit .postBaseEdit2 #post-"+whichKind+"FormPhoto").css({'margin-top':'50px','display':'block', 'margin-left':'-350px'});
						
						$('.mainBase .postBaseEdit .postBaseEdit2').prepend('<div class="sectionHeaderFormat blueHeader sectionHeader1"><span style="color:#FFFFFF;">Edit Your Posting</span></div>');
						
						$('.mainBase .postBaseEdit #index-ZooFaroo').html(''+alertHdrImg+'');
						
								$(".mainBase .postBaseEdit input[value='"+reviewsArrayParsed[oORn][whichSubList][9]+"']").attr('checked', true);
								
				
								$('.mainBase .postBaseEdit #w').hide();
								$(".mainBase .postBaseEdit #post-formClear").hide();
								$(".mainBase .postBaseEdit #post-formEdit").hide();
								$(".mainBase .postBaseEdit #post-formDelete").hide();
								
								$('.mainBase .postBaseEdit #post-'+whichKind+'FormPhoto').hide();
																																	
								$(".mainBase .postBaseEdit #"+whichKind+"Categories").html("Listing category: <select name='"+whichKind+"GoodsCategory' id='"+whichKind+"GoodsCategory' style='display: inline;'></select><select name='"+whichKind+"ServicesCategory' id='"+whichKind+"ServicesCategory' style='display: inline;'></select>").css({"color": "#333333", "font-size": "1em", "margin-top":"30px"});
								$(".mainBase .postBaseEdit #"+whichKind+"GoodsCategory").prepend("<option value='please choose...'>please choose...</option>");
								$(".mainBase .postBaseEdit #"+whichKind+"ServicesCategory").prepend("<option value='please choose...'>please choose...</option>");
									
									for(i=0; i<categoriesArray.length; i++){
										if(categoriesArray[i][2]=="g"){
											categoriesArrayAlt[i] = categoriesArray[i][1].replace(/_/g," ");
											goodsCategoryID[i] = categoriesArray[i][0];
											$(".mainBase .postBaseEdit #"+whichKind+"GoodsCategory").append("<option value='"+goodsCategoryID[i]+"'>"+categoriesArrayAlt[i]+"</option>");
											
										}else if(categoriesArray[i][2]=='s'){
											categoriesArrayAlt[i] = categoriesArray[i][1].replace(/_/g," ");
											servicesCategoryID[i] = categoriesArray[i][0];
											$(".mainBase .postBaseEdit #"+whichKind+"ServicesCategory").append("<option value='"+servicesCategoryID[i]+"'>"+categoriesArrayAlt[i]+"</option>");
										}
									}
									
								
								$(".mainBase .postBaseEdit input[name='"+whichKind+"GoodsServices"+whichOne+"']").unbind('click').click(function(){
									
													if($(".mainBase .postBaseEdit input[name='"+whichKind+"GoodsServices"+whichOne+"']:checked").val()=='g'){
																			$(".mainBase .postBaseEdit #"+whichKind+"ServicesCategory").hide();	
																			$(".mainBase .postBaseEdit #"+whichKind+"GoodsCategory").show();
													}else if($(".mainBase .postBaseEdit input[name='"+whichKind+"GoodsServices"+whichOne+"']:checked").val()=='s'){
																			$(".mainBase .postBaseEdit #"+whichKind+"ServicesCategory").show();	
																			$(".mainBase .postBaseEdit #"+whichKind+"GoodsCategory").hide();
													}
																																				 });
									
								if(reviewsArrayParsed[oORn][whichSubList][9]=='g'){
									$(".mainBase .postBaseEdit #"+whichKind+"ServicesCategory").hide();
									$(".mainBase .postBaseEdit #"+whichKind+"GoodsCategory").val(''+reviewsArrayParsed[oORn][whichSubList][11]+'');
								}
								if(reviewsArrayParsed[oORn][whichSubList][9]=='s'){
									$(".mainBase .postBaseEdit #"+whichKind+"GoodsCategory").hide();
									$(".mainBase .postBaseEdit #"+whichKind+"ServicesCategory").val(''+reviewsArrayParsed[oORn][whichSubList][11]+'');
								}	
																																
								$(".mainBase .postBaseEdit #post-"+whichKind+"FormMiddle #"+whichKind+"Title"+whichOne+"").val(''+reviewsArrayParsed[oORn][whichSubList][13]+'');
								$(".mainBase .postBaseEdit #post-"+whichKind+"FormMiddle #"+whichKind+"Posting"+whichOne+"").val(''+reviewsArrayParsed[oORn][whichSubList][17]+'');
								
								$(".mainBase .postBaseEdit input[value='"+reviewsArrayParsed[oORn][whichSubList][10]+"']").attr('checked', true);
									if(reviewsArrayParsed[oORn][whichSubList][14]=='2'){
										$(".mainBase .postBaseEdit #post-"+whichKind+"FormBottom #"+whichKind+"Money input[value='2']").attr('checked', true);
									}else{
										$(".mainBase .postBaseEdit #post-"+whichKind+"FormBottom #"+whichKind+"Money input[value='2']").attr('checked', false);
									}
									if(whichKind=='offer'){
										$(".mainBase .postBaseEdit #post-"+whichKind+"FormBottom #"+whichKind+"Money #moneymsg").html('I will <b>only</b> accept money for what I\'m offering');
									}else{
										$(".mainBase .postBaseEdit #post-"+whichKind+"FormBottom #"+whichKind+"Money #moneymsg").html('I am open to paying for what I need');
									}
									
								if(whichKind=='offer'){
									$('.mainBase .postBaseEdit #post-'+whichKind+'FormPhoto').show();
									tempPhotoEdit.length = 0;
									divLocale = '.mainBase .postBaseEdit';
									pOrE = 'edit';
																							
									if(reviewsArrayParsed[oORn][whichSubList][8]=='1'){
										tempPhotoEdit[0] = '0';//offer
										tempPhotoEdit[1] = '0';//arrived empty or full, '0' or '1'
										tempPhotoEdit[2] = ''+whichSubList+'';//which number in the list of offers/needs
										tempPhotoEdit[3] = '1';//photoname new
										tempPhotoEdit[4] = '1';//photoname old
										tempPhotoEdit[5] = '1';//what kind of action, save, change, cancel
										$('.mainBase .postBaseEdit .post-'+whichKind+'ChangePhoto').hide();
										$('.mainBase .postBaseEdit #post-'+whichKind+'ActPhoto').empty();
										$('.mainBase .postBaseEdit #post-'+whichKind+'FormPhoto').fadeIn('fast');
																		
									}else{
										tempPhotoEdit[0] = '0';//offer
										tempPhotoEdit[1] =  '1';//arrived empty or full, '0' or '1'
										tempPhotoEdit[2] = ''+whichSubList+'';//which number in the list of offers/needs
										tempPhotoEdit[3] = 'empty';//photoname new
										tempPhotoEdit[4] = reviewsArrayParsed[oORn][whichSubList][8];//photoname old
										tempPhotoEdit[5] = '1';//what kind of action, save, change, cancel
										$('.mainBase .postBaseEdit #post-offerFormPhoto #post-offerPhoto').hide();
										$('.mainBase .postBaseEdit .post-offerChangePhoto').unbind('click').show();
										
										$('.mainBase .postBaseEdit #post-offerActPhoto').html('<img id="'+tempPhotoEdit[4]+'" src="photos/'+reviewsArrayParsed[oORn][whichSubList][6]+'/'+tempPhotoEdit[4]+'" name="100"/>');
										photoListen(whichOne, 'edit');
									}
									
									
								}else if(whichKind=='need'){
									tempPhotoEdit.length=0;
									tempPhotoEdit[0] = '1';//need
									tempPhotoEdit[2] = ''+whichSubList+'';//which number in the list of offers/needs
								}
												
								$(".secCodeRefresh").unbind('click').click(function(){Recaptcha.reload();});																						
								$(".mainBase .postBaseEdit #post-captcha .editCancelBtn").unbind('click').click(function(){
																										tempPhotoEdit[5] = 'cancel';
																										editFormPhotoAction(tempPhotoEdit, tempPhotoEdit[0], tempPhotoEdit[2]);
																										$(".mainBase .postBaseEdit .postBaseEdit2").empty();
																										$('#alertScreen').css({'display':'none'});
																										$('.postBaseEdit').css({'display':'none'});
																										
									});
								$(".mainBase .postBaseEdit #post-captcha .regEditSubmitBtn").unbind('click').click(function(){editSave();});
								//SAVING A POSTING
								function editSave(){
									
									 $(".mainBase .postBaseEdit #post-captcha .regEditSubmitBtn").unbind('click'); $(".mainBase .postBaseEdit #post-captcha .regEditSubmitBtn").html('Please wait...<img src="images/loaderSm.gif"/>'); var checkFormArray = new Array(); checkFormArray = { 'Title':$(".mainBase .postBaseEdit #post-"+whichKind+"FormMiddle #"+whichKind+"Title"+whichOne+"").val(), 'Posting':$(".mainBase .postBaseEdit #post-"+whichKind+"FormMiddle #"+whichKind+"Posting"+whichOne+"").val(), 'arrayEnd':'arrayEnd' }; if($(".mainBase .postBaseEdit input[name='"+whichKind+"GoodsServices"+whichOne+"']:checked").val()=='g'){ checkFormArray['Category'] = $(".mainBase .postBaseEdit #"+whichKind+"GoodsCategory option:selected").val(); }else{ checkFormArray['Category'] = $(".mainBase .postBaseEdit #"+whichKind+"ServicesCategory option:selected").val(); } for (var child in checkFormArray){ if(checkFormArray[child]==null || checkFormArray[child]=='' || checkFormArray[child]=='undefined' || checkFormArray[child]=='please choose...'){ alertObject.alertBox('EMPTY FORM!', 'Please make sure that '+child+' is filled out/chosen!', 'gerrorPlus', btnReset, '.postBaseEdit', editSave); break; }else if(checkFormArray[child]=='arrayEnd'){ subMitEditPostAccountForm(); } } function subMitEditPostAccountForm() {genTimerObject.genTimer(); var response = $('#recaptcha_response_field').val(); var challenge = $('#recaptcha_challenge_field').val(); $.ajax({ type: "POST", url:'control/verifyUser.php', data: "type=advanced&user="+userName+"&pass="+passWord+"&ssSec="+editssSec+"&response="+response+"&challenge="+challenge+"", success: function(confirmi){clearTimeout(genericTimer); confirmi = $.trim(confirmi); if(confirmi!='X11' && confirmi!='X10'){ editssSec = confirmi; if($(".mainBase .postBaseEdit input[name='"+whichKind+"GoodsServices"+whichOne+"']:checked").val()=='g'){ reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][9] = 'g'; reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][11] = $(".mainBase .postBaseEdit #"+whichKind+"GoodsCategory option:selected").val(); if(reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][11]=='please choose...'){ reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][11]=null; } }else if($(".mainBase .postBaseEdit input[name='"+whichKind+"GoodsServices"+whichOne+"']:checked").val()=='s'){ reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][9] = 's'; reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][11] = $(".mainBase .postBaseEdit #"+whichKind+"ServicesCategory option:selected").val(); if(reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][11]=='please choose...'){ reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][11]=null; } } if($(".mainBase .postBaseEdit #post-"+whichKind+"FormMiddle #"+whichKind+"Title"+whichOne+"").val().length==0){ reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][13] = null; }else{ reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][13] = $(".mainBase .postBaseEdit #post-"+whichKind+"FormMiddle #"+whichKind+"Title"+whichOne+"").val(); } if($(".mainBase .postBaseEdit #post-"+whichKind+"FormMiddle #"+whichKind+"Posting"+whichOne+"").val().length==0){ reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][17] = null; }else{ reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][17] = $(".mainBase .postBaseEdit #post-"+whichKind+"FormMiddle #"+whichKind+"Posting"+whichOne+"").val(); } if($(".mainBase .postBaseEdit input[name='"+whichKind+"EmailNotes"+whichOne+"']").is(':checked')){ reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][10] = '2'; }else{ reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][10] = '1'; } if(whichKind=='need'){ reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][8] = '2'; } if($(".mainBase .postBaseEdit input[name="+whichKind+"Money"+whichOne+"]").is(':checked')){ reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][14] = '2'; }else{ reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][14] = '1'; } var specificPostingStateID = reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][6]; if(whichKind=='offer'){ tempPhotoEdit[5] = 'save'; editFormPhotoAction(tempPhotoEdit, whichSubList, whichSubList);} var theArray = new Array(); theArray = {'s1':reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][9], 's2':reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][11], 's3':reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][13], 's4':reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][17], 's5':reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][10], 's6':reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][8], 's7':reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][14], 's8':reviewsArrayParsed[tempPhotoEdit[0]][tempPhotoEdit[2]][15], 's9':whichKind}; genTimerObject.genTimer(); var form = new Array(); form = {'di':'edit', 'd2':'editPost', 'i1':postID, 's2':userName, 's3':passWord, 's4':editssSec, 'i2':specificPostingStateID, 'a1': theArray}; $.post("control/formValidate.php", {form:form}, function(confirmation){ clearTimeout(genericTimer); var confirmate = $.trim(confirmation); if(confirmate=='X10'){ alertObject.alertBox('ALERT!', errorAlrt, 'ferror', editRefresh, null, null); }else{ Recaptcha.reload(); $('.mainBase .postBaseEdit .postBaseEdit2').empty(); $('#alertScreen').css({'display':'none'}); $('.postBaseEdit').css({'display':'none'}); alertObject.alertBox('SUCCESS!', updatePostSuccess, 'ferror', editRefresh, null, null); } }); }else if(confirmi=='X10'){ alertObject.alertBox('ALERT!', invalidUP, 'ferror', editRefresh, null, null); }else if(confirmi=='X11'){ alertObject.alertBox('ALERT!', codeAlrt, 'gerrorPlus', btnReset, '.postBaseEdit', editSave); } } }); }
											
							}//editSave;
																						  
						});
				}
				
				//DELETE A SINGULAR POST
				if(aux=='delete'){
					   alertObject.alertBox('ALERT!', deleteConfirm, 'decision', editDelete, whichOne, postID);
				   }
						   function editDelete(whichOne, postID){
							    genTimerObject.genTimer();//start the timeout timer
								 $('.list-deletePost:eq('+whichOne+')').html('Please wait...<img src="images/loaderSm.gif"/>');
												 var form = new Array();
												 form = {'di':'edit', 'd2':'deletePost', 'i1':postID, 's2':greetingUserName, 's3':passWord, 's4':editssSec, 's5':whichKind};
												
												 $.post('control/formValidate.php', {'form':form}, function(confirmer){
														clearTimeout(genericTimer);
														confirmer = $.trim(confirmer);
													 switch(confirmer){ 
													 case '1': cleanSlate(); $('#alertScreen').css({'display':'none'}); alertObject.alertBox('SUCCESS!', deleteSuccess, 'alert', null, null, null); retrieveEditList(editssSec); break; 
													 case'X10': $('#alertScreen').css({'display':'none'}); alertObject.alertBox('ALERT!', errorAlrt, 'alert', null, null, null); break; }
												});
				}
				break;
				
				case 'editAccount':
				
				//EDIT USER ACCOUNT
				if(aux=='edit'){
					screenAndAlert();
					$(window).scrollTop(0);
								if(navigator.appName=='Microsoft Internet Explorer'){
								$('html').scrollTop(0);
								}
				$('.mainBase .postBaseEdit .postBaseEdit2').load("modules/regEditForm.inc.php", function(){
					$('.mainBase .postBaseEdit .postBaseEdit2 #register-terms').hide();
					$('.mainBase .postBaseEdit .postBaseEdit2').prepend('<div class="sectionHeaderFormat blueHeader sectionHeader1"><span style="color:#FFFFFF;">Edit Your Account Information</span></div>');
					$('.maxLengthMsg').html('<u>NOTE</u>:&nbsp;&nbsp;Username cannot be changed.  The Password must be between 8 and 12 characters long and must contain both letters and numbers.').css({'margin-left':'500px'});
					$('#username-input').remove();
					$('.secCodeRefresh').css({'margin-left':'400px', 'margin-top':'110px'});
					$('.editCancelBtn').css({'margin-top':'0px'});
					$('#refreshCodeMsg').css({'margin-left':'50px'});
					$('.regEditSubmitBtn').html('Save and Continue').css({'margin-left':'600px', 'margin-top':'0px'});
					$('#password-input').focus(function() {$(this).val('')});
					$('#passwordConfirm').focus(function() {$(this).val('')});
					fetchStateObject.fetchStateArray('edit');
					$('.mainBase .postBaseEdit .postBaseEdit2').css({'width':'98%', 'height':'880px'});
					$('.mainBase .postBaseEdit #index-ZooFaroo').html(''+alertHdrImg+'');
					$('.mainBase .postBaseEdit #register-option:eq(3)').append(''+greetingUserName+'').css({'margin-right':'125px'});;//username cannot be changed
					$('.mainBase .postBaseEdit #password-input').val(editPSO);
					$('.mainBase .postBaseEdit #passwordConfirm').val(editPSO);
					$('.mainBase .postBaseEdit #email').val(editEmail);
					$('.mainBase .postBaseEdit #city').val(editCity);
					$('.mainBase .postBaseEdit #stateDropDwn #stateDrop').val(''+editState+'');
					drpDwnStateID=editState;
					$(".mainBase .postBaseEdit input[name=business]").filter("[value="+editBus+"]").attr("checked",true);
					$('.mainBase .postBaseEdit #url-input').val(editURL);
					$('.mainBase .postBaseEdit #urldr').val(editURLSuf);
					$('.mainBase .postBaseEdit #facebook-input').val(editFB);
					$('.mainBase .postBaseEdit #twitter-input').val(editTW);
					$('.mainBase .postBaseEdit #linkedin-input').val(editLI);
					$('.mainBase .postBaseEdit #google-input').val(editGP);
					if(editBus=='2'){
					$('.mainBase .postBaseEdit #busName').show().val(editBusName);
					}
					$(".mainBase .postBaseEdit #recaptcha_widget_div").css({'margin-left':'55px'});
					//////////////////////////if you want to reinstate the capchta
					$(".mainBase .postBaseEdit #recaptcha_widget_div").hide();
					$(".mainBase .postBaseEdit #refreshCodeMsg").hide();
					////////////////////////////
					$(".mainBase .postBaseEdit .editCancelBtn").unbind('click').click(function(){Recaptcha.reload();$('.mainBase .postBaseEdit .postBaseEdit2').empty(); $('#alertScreen').css({'display':'none'});$('.postBaseEdit').css({'display':'none'});});
					
				
					$(".mainBase .postBaseEdit .regEditSubmitBtn").unbind('click').click(function(){accountSave()});//regEditSubmitBtn
						
					//SAVE CHANGES MADE TO THE ACCOUNT
					function accountSave(){
					$(".mainBase .postBaseEdit .regEditSubmitBtn").unbind('click');
					$(".mainBase .postBaseEdit .regEditSubmitBtn").html('Please wait...<img src="images/loaderSm.gif"/>');
			
			
					var checkFormArray = new Array();
					checkFormArray = {'City or Town':''+$('#city').val()+'',
									'State':''+drpDwnStateID+'',
									'Email':''+$('#email').val()+'',
									'Username':''+greetingUserName+'',
									'Password':''+$('#password-input').val()+'',
									'PasswordConfirm':''+$('#passwordConfirm').val()+'',
									'arrayEnd':'arrayEnd'
									};
									
							var addyurl='null';
							var fburl = 'null';
							var twyurl = 'null';
							var lnurl = 'null';
							var gourl = 'null';
							var busname = 'null';
							
								if($('#url-input').val().length){
									addyurl = 'http://www.'+$('#url-input').val()+''+$('#urldr').val()+'/';
								}
								if($('#busName').val().length){
									busname = ''+$('#busName').val()+'';
								}
								if($('#facebook-input').val().length){
									fburl = 'http://www.facebook.com/'+$('#facebook-input').val()+'';
								}
								if($('#twitter-input').val().length){
									twyurl = 'http://www.twitter.com/'+$('#twitter-input').val()+'';
								}
								if($('#linkedin-input').val().length){
									lnurl = 'http://www.linkedin.com/'+$('#linkedin-input').val()+'';
								}
								if($('#google-input').val().length){
									gourl = 'https://plus.google.com/'+$('#google-input').val()+'';
								}
								
							for (var child in checkFormArray){
								if(checkFormArray[child]==null || checkFormArray[child]=='' || checkFormArray[child]=='undefined' || checkFormArray[child]=='please choose...'){
									alertObject.alertBox('EMPTY FORM!', 'Please make sure that '+child+' is filled out/chosen!', 'gerrorPlus', btnReset, '.postBaseEdit', accountSave);
									break;
								}else if(checkFormArray[child]=='arrayEnd'){
									//form checks out move on
									subMitEditAccountForm();
								}
							}
									
						function subMitEditAccountForm(){
						//////REDUNDANT SEE EDIT POST ABOVE
						genTimerObject.genTimer();//start the timeout timer
						var response = $('#recaptcha_response_field').val();
						var challenge = $('#recaptcha_challenge_field').val();
																											
							$.ajax({
							type: "POST",
							url:'control/verifyUser.php',
							data: "type=basic&user="+userName+"&pass="+passWord+"&ssSec="+editssSec+"&response="+response+"&challenge="+challenge+"",
							success: function(confirmi){
								clearTimeout(genericTimer);
								confirmi = $.trim(confirmi);
							if(confirmi!='X11' && confirmi!='X10'){//username, pass, and captcha all clear
										genTimerObject.genTimer();//start the timeout timer
										editssSec = confirmi;
										var form = new Array();
										form = {'di':'edit', 'd2':'editAccount', 's1':''+$('#city').val()+'','e1':''+$('#email').val()+'','s2':''+greetingUserName+'','s3':''+editPSO+'','s4':''+editssSec+'', 's5':''+$('#password-input').val()+'', 'i1':''+drpDwnStateID+'', 'i2':''+$("input[name='business']:checked").val()+'','u1':''+fburl+'','u2':''+twyurl+'','u3':''+gourl+'', 'u4':''+lnurl+'', 'u5':''+addyurl+'', 's6':''+busname+''};
										 $.post("control/formValidate.php", {form:form}, //form validation
														   function(confirmation){
															   clearTimeout(genericTimer);
															  confirmation = $.trim(confirmation);
															  if(confirmation=='X10'){
																  alertObject.alertBox('ALERT!', errorAlrt, 'gerrorPlus', editRefresh, '.postBaseEdit', null);
															   }else if(confirmation=='X12'){
																	$('#register-alert').empty();
																	alertObject.alertBox('ALERT!', emailInUse, 'gerrorPlus', btnReset, '.postBaseEdit', accountSave);
															   }else if(confirmation=='X13'){
																	$('#register-alert').empty();
																	alertObject.alertBox('ALERT!', userNameInUse, 'gerrorPlus', btnReset, '.postBaseEdit', accountSave);
															   }else{//form is filled out properly, moving on
																		
																Recaptcha.reload();$('.mainBase .postBaseEdit .postBaseEdit2').empty(); 
																$('#alertScreen').css({'display':'none'});$('.postBaseEdit').css({'display':'none'});
																alertObject.alertBox('SUCCESS!', updateSuccess, 'ferror', clearUser, null, null);
					
															   }
														   });//formValidate
			
							}else if(confirmi=='X10'){
								alertObject.alertBox('ALERT!', errorAlrt, 'gerrorPlus', editRefresh, '.postBaseEdit', null);
							}else if(confirmi=='X11'){
								alertObject.alertBox('ALERT!', codeAlrt, 'gerrorPlus', btnReset, '.postBaseEdit', accountSave);
							}
						}// validate success
						});//verifyUser
						}
						}
			
			
			});//load regEdit form
		}
		
		function deleteFinish(){
				clearUser();
			}
			function finalDelete(editssSec){
				genTimerObject.genTimer();//start the timeout timer
				var form = new Array();
				form = {'di':'edit', 'd2':'deleteAccount', 's2':greetingUserName, 's3':passWord, 's4':editssSec};
				$.post('control/formValidate.php', {form:form}, function(confirmed){
					clearTimeout(genericTimer);
					confirmed = $.trim(confirmed);
					switch(confirmed){
						case '1':
							$('.firstListBase').empty();
							$('.secondListBase').empty();
							alertObject.alertBox('ALERT!', deleteAccountSuccess, 'ferror', deleteFinish, null, null);
							break;
						default:
							alertObject.alertBox('ALERT!', errorAlrt, 'alert', null, null, null);
							$(".mainBase .postBaseEdit .regEditSubmitBtn").html('edit');
							break;
					}//switch
					});
			}
		
			//DELETE USER ACCOUNT AND ALL RELATED INFORMATION, POST, REVIEWS, ETC
		if(aux=='delete'){
				alertObject.alertBox('ALERT!', accountDelete, 'decision', finalDelete, whichOne, null);
			}
		
				break;
			}
			
		}//edit or post page
	}
}