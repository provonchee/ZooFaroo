function reseter(){window.open(''+baseHref+'edit.html', '_self');};
function retrieveEditList(ssSec){//utilized when the person logs in and when they delete or edit
	$.getScript("js/reviewsEditInfo.mod.js", function(){editssSec = ssSec;});
}
				
$('#list-Listings #postList-listings').hide();

$.getScript('js/photoEdit.mod.js');