/**
 * Author: Heather Corey
 * jQuery Simple Parallax Plugin
 * Modified and enhanced by pezflash
 */

(function($) {

	$.fn.parallax = function(options) {

		// ESTABLISH DEFAULT SETTINGS
		var settings = $.extend({
			mobile: false
		}, options);

		
		// ITERATE OVER EACH OBJECT IN COLLECTION
		return this.each( function() {

			// VARS
			var $this = $(this),
				imageSrc = $this.data('image-src'),
				scrollSpeed = $this.data('speed'),
				internalHeight = $this.data('height'),
				internalMobileHeight = $this.data('mobile-height'),
				
				windowHeight = $(window).height(),
				offset = $this.offset().top,
				height = $this.outerHeight(),
				scrollTop = $(window).scrollTop(),
				yBgPosition = Math.round((offset - scrollTop) * scrollSpeed);

			// IF NOT MOBILE, GO WITH PARALLAX
			if(!mobile) {

				// ADD IMAGE SOURCE AS BACKGROUND
				$this.css({
					'background-image': 'url('+ imageSrc + ')',
					'background-position': 'center ' + yBgPosition + 'px',
					'height': internalHeight
				});

				// SET UP SCROLL HANDLER
				$(document).scroll(function(){

					windowHeight = $(window).height();
					offset = $this.offset().top;
					height = $this.outerHeight();
					scrollTop = $(window).scrollTop();

					// CHECK IF ABOVE OR BELOW VIEWPORT
					if (offset + height <= scrollTop || offset >= scrollTop + windowHeight) {
						return;
					}

					yBgPosition = Math.round((offset - scrollTop) * scrollSpeed);

					// APPLY THE Y BACKGROUND POSITION TO SET THE PARALLAX EFFECT   
					$this.css('background-position', 'center ' + yBgPosition + 'px');
					
				});

			} else {	// IF MOBILE, JUST PLACE THE BACKGROUND IMAGE AND CHANGE CSS ATTACHMENT METHOD

				$this.css({
					'background-image': 'url('+ imageSrc + ')',
					'background-position': 'center top',
					'background-attachment': 'scroll',
					'height': internalMobileHeight
				});

			}
		});
	}
}(jQuery));