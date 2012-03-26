function reseter(){window.open(''+baseHref+'edit.html', '_self');};
function retrieveEditList(ssSec){
	$.getScript("js/reviewsEditInfo.mod.js", function(){editssSec = ssSec;});
}
				
$('#list-Listings #postList-listings').hide();

$.getScript('js/photoEdit.mod.js');