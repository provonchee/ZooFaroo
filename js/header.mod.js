$('.listPostingBtn').unbind('click').click(function(){window.open(''+baseHref+'post.html', '_self');});
$('#header-menu .header-menuBtn:eq(0)').unbind('click').click(function(){window.open(''+baseHref+$('#header-menu .header-menuBtn:eq(0)').attr('id')+'', '_self');localStorage.removeItem('zoofaroo_chosenState');localStorage.removeItem('zoofaroo_chosenCity');});
$('#header-menu .header-menuBtn:eq(1)').unbind('click').click(function(){window.open(''+baseHref+$('#header-menu .header-menuBtn:eq(1)').attr('id')+'', '_self');});
$('#header-menu .header-menuBtn:eq(2)').unbind('click').click(function(){window.open(''+baseHref+$('#header-menu .header-menuBtn:eq(2)').attr('id')+'', '_self');});
$('#header-menu .header-menuBtn:eq(3)').unbind('click').click(function(){window.open(''+baseHref+$('#header-menu .header-menuBtn:eq(3)').attr('id')+'', '_self');});
$('#header-menu .header-menuBtn:eq(4)').unbind('click').click(function(){window.open(''+baseHref+$('#header-menu .header-menuBtn:eq(4)').attr('id')+'', '_self');});
$('#header-menu .header-menuBtn:eq(5)').unbind('click').click(function(){window.open(''+baseHref+$('#header-menu .header-menuBtn:eq(5)').attr('id')+'', '_self');});
$('#header-menu .header-menuBtn:eq(6)').unbind('click').click(function(){window.open(''+baseHref+$('#header-menu .header-menuBtn:eq(6)').attr('id')+'', '_self');});
$('#header-menu .header-menuBtn:eq(7)').unbind('click').click(function(){window.open(''+baseHref+$('#header-menu .header-menuBtn:eq(7)').attr('id')+'', '_self');});
function refreshBackOne(){
	history.go(-1);
}