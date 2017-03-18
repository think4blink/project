$(function() {


	// use code
	var box = $('div[class*="item"]');

	$(box).on('click', function() {
		var current = $(this);
		if(current.hasClass('--active')) return;
		current.attr('data-height', current.outerHeight())


		// let currentPositionTop = current.offset().top - $(window).scrollTop();
		let currentPositionTop = current.offset().top - $(window).scrollTop();
		let windowSizeHeight = $(window).outerHeight();
console.log(windowSizeHeight);
console.log('element offset', currentPositionTop);



		setTimeout(() => {
			current.addClass('--active');
			$('body').addClass('--overlay')
			current.animate({
				top: (currentPositionTop - 10) * -1,
				height : windowSizeHeight - 20,
				'margin-bottom' : (currentPositionTop - 10) * -1
			}, function() {
				current.find('div').fadeIn()
				let closeElement = $('<div />', {
					class : 'close_btn',
					html : 'X',
					click : function() {
						current.find('div').fadeOut()
						current.animate({
							'margin-bottom' : 10,
							top: 0,
							height : current.data('height')
						}, 400, function() {
							current.removeClass('--active');
							$('body').removeClass('--overlay');
						})
						$(this).remove()
					}
				}).prependTo(current).slideDown()
			})
		}, 200)
	});

});






$(function() {
    $('.select').on('click', function(e) {
    	var divs = $(this).find('> div:hidden');
    	divs.slideDown()
    	console.log(divs.length);
    })

    $('.select > div > div').on('click', function() {
    	var parent = $(this).parent();
    	var current = $(this);
    	if(parent.hasClass('hidden')) {
    		parent.animate({
    			top : -34
    		}, function() {
    			parent.removeClass('hidden')
    			current.addClass('current')
    		})
    	}
    	if(!$(this).index()) {
    		if($(this).next().is(':hidden')) {
    			$(this).next().slideDown();
    			return;
    		}
    		$(this).next().fadeOut()
    		return;
    	}
    	$(this)
    		.fadeOut(function() {
    			$(this).prependTo(parent);
    			$(this).next().removeClass('current')
    			$(this).addClass('current')
    		}).slideDown(function() {
    			$(this).next().fadeOut()
    		})
    })
})