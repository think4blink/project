$(function() {

	// current list in menu
	var _url = { path : location.pathname.split('/').pop() || '/' }
	$('nav').find('[class*="item"]').each(function(i) {
		var link = $(this).find('> a'),
			linkHref = !i ? 
				'/' : 
				link.text().toLowerCase() + '.html';
		link.attr('href', linkHref);

		linkHref !== _url.path ?
			link.removeClass('--active') : 
			link.addClass('--active').removeAttr('href');
	});



});