/*
	*********************************************************************************************************************
	Custom Javascript - Project: Fluke template
	Platform: Themeforest
	Version: 1.0
	********************************************************************************************************************
*/


/* ************************************************************************************************************** */
//  GLOBAL VARIABLES
var myWindow = $(window),
	windowWidth = myWindow.width(),
	windowHeight = myWindow.height(),
	htmlbody = $('html, body'),
	device = false,
	tablet = false,
	tabletPortrait = false,
	mobile = false,
	menuOpen = false,
	mapStyles, mapStylesFullscreen, openMenu, closeMenu;



/* *********************************************************************************************************************
 * DOCUMENT READY
 */
$(document).ready(function() {


	/* ************************************************************************************************************** */
	//  DOM VARIABLES
	var wrapper = $('#wrapper'),
		header = $('#header'),
		menu = $('#header .nav'),
		scrollUp = $('.scrollup a'),
		hamburguer = $('.hamburguer');


	/* ************************************************************************************************************** */
	//  CHECKERS
	
	// DETECT MOBILES & TABLETS (ANDROID & IOS & WINDOWS8 & BLACKBERRY)
	var android = MobileEsp.DetectAndroid(),
		aphone = MobileEsp.DetectAndroidPhone(),
		atablet = MobileEsp.DetectAndroidTablet(),
		iphone = MobileEsp.DetectIphone(),
		ios = MobileEsp.DetectIos(),
		iphone = MobileEsp.DetectIphone(),
		ipad = MobileEsp.DetectIpad(),
		windows = MobileEsp.DetectWindowsPhone(),
		blackberry = MobileEsp.DetectBlackBerry();

	if (android || ios || windows || blackberry) {
		device = true;
		if(atablet || ipad) tablet = true;
		if(windowWidth < 768) mobile = true;
		if(windowWidth >= 768 && windowWidth < 980) tabletPortrait = true;
	};

	console.log('device:' + device + ' / mobile:' + mobile + ' / tablet:' + tablet + ' / tabletPortrait:' + tabletPortrait);

	// ADD .mac CLASS TO BODY TO TARGET ALL MAC DEVICES. PLAY WITH IT ON .CSS
	if (navigator.userAgent.indexOf('Mac') > 0) $('body').addClass('mac');











	/* ************************************************************************************************************** */ 
	// WINDOW ON RESIZE

	// ADD ONRESIZE EVENT
	myWindow.resize(function() {
		windowWidth = myWindow.width();
		windowHeight = myWindow.height();
	});












	/* ************************************************************************************************************** */
	// ANIMSITION CALL (FOR GLOBAL PAGE TRANSITIONS)

	wrapper.animsition({
		inClass: "fade-in",
		outClass: "fade-out",
		inDuration: 500,
		outDuration: 500,
		linkElement: '.pagelink',
		loading: true
	});










	/* ************************************************************************************************************** */
	// ON SCROLL EVENTS

	var controlScroll = function() {

		var scrollTop = myWindow.scrollTop();

		// SCROLL TO TOP
		if (scrollTop > 190) {

			//STUFF FOR ONEPAGE SITE (ONLY DESKTOP)
			if (wrapper.hasClass('onepage') && !mobile) {
				header.addClass('sticky');
				$('.logo img').attr('src', 'images/shared/logo-sticky.svg');
			};

		} else {

			//STUFF FOR ONEPAGE SITE (ONLY DESKTOP)
			if (wrapper.hasClass('onepage') && !mobile) {
				header.removeClass('sticky');
				$('.logo img').attr('src', 'images/shared/logo.svg');
			};
		}

	};
	
	controlScroll();

	// SCROLL UP BUTTON
	scrollUp.click(function () {
		htmlbody.animate({ scrollTop: 0 }, 600);
		return false;
	});

	// WINDOW SCROLL EVENT
	myWindow.scroll(function() {
		controlScroll();
	});

	










	/* ************************************************************************************************************** */
	//  HEADER STUFF

	// ACTIVATE SUPERFISH FOR DESKTOP AND TABLETS
	if (!mobile) {
		menu.find('ul').superfish({
			delay: 0,
			animation: {opacity:'show',height:'show'},
			speed: 'fast',
			cssArrows: false,
			disableHI: true,							//HOVERINTENT DISABLED
			onBeforeShow : function (){  				//CHANGE THIRD LEVEL TO LEFT SIDE IF OUT OF WINDOW               
				if ($(this).hasClass('third')) {
					var subMenuWidth = $(this).width();
					var parentLi = $(this).parent();                    
					var parentWidth = parentLi.width();
					var subMenuRight = parentLi.offset().left + parentWidth + subMenuWidth + 60;
					if(subMenuRight > windowWidth){
						$(this).css('left','auto');
						$(this).css('right', parentWidth+'px');
					}
				}
			}
		});
	};

	// MOBILE MENU
	if (mobile) {

		// ACTIVATE SWIPE FOR CLOSE MENU ON MOBILE
		function activateSwipeAndClick() {
			menu.swipe( {
				swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
					if (direction == 'left' && distance > 50) closeMenu(); else menu.animate({'left': 0}, 500, 'easeOutQuart');
				},
				swipeStatus:function(event, phase, direction, distance, duration, fingers) {
					if (direction == 'left') menu.css({'left': -distance});
				},
				threshold:0,
				allowPageScroll:"vertical" 
			});
		};

		// OPEN FUNCTION
		openMenu = function() {
			menu.show().animate({'left': '0px'}, 800, 'easeOutQuart');
			activateSwipeAndClick();
			menu.swipe("enable");
			menuOpen = true;
			hamburguer.find($('.fa')).removeClass('fa-navicon').addClass('fa-close');
		};

		// CLOSE FUNCTION
		closeMenu = function() {
			menu.animate({'left': '-100%'}, 500, 'easeInOutQuart', function() {
				$(this).hide();
			});
			menu.swipe("disable");
			menuOpen = false;			
			hamburguer.find($('.fa')).removeClass('fa-close').addClass('fa-navicon');
		};

		// OPEN / CLOSE BUTTON
		hamburguer.click(function () {
			if (!menuOpen) openMenu(); else closeMenu();
			return false;
		});

	};
	











	/* ************************************************************************************************************** */ 
	// GLOBAL STUFF

	/// FOOTER LEGAL BUTTON
	$('#legal').lightGallery({
		thumbnail: false,
		selector: '#legal'
	});

	// SOCIAL NETWORKS TOOLTIP
	var tipperMargin = 15;
	$('.social').each(function() {
		if ($(this).hasClass('bigger')) tipperMargin = 20;
		$(this).find('a').tipper({
			direction: 'top',
			margin: tipperMargin
		});
	});

	// SOCIAL NETWORKS CLICK EVENT
	$('.share a').click(function (e) {
		e.preventDefault();

		var top = windowHeight / 2 - 235,
			left = windowWidth / 2 - 285,
			url = window.location.href,
			network = $(this).data('title'),
			twitterUser = $(this).data('user'),
			href;

		// DIFFERENT BEHAVIOUR FOR EACH NETWORK
		switch (network) {
			case 'Twitter':
				href = 'https://twitter.com/intent/tweet?url=' + url + '&via=' + twitterUser;
				break;
			case 'Facebook':
				href = 'https://www.facebook.com/sharer.php?u=' + url; 
				break;
			case 'Pinterest':
				PinUtils.pinAny();
				break;
			case 'Google+':
				href = 'https://plus.google.com/share?url=' + url;
				break;
		}

		// IF NOT PINTEREST - OPEN WINDOW
		if (network != 'Pinterest') window.open(href, "_blank", "top=" + top + ",left=" + left + ",width=550,height=450");
	});

	// GOOGLE MAPS GLOBAL STYLES
	// CREATE YOUR OWN STYLES ON https://snazzymaps.com
	// PASTE THE PROVIDED HERE, REPLACING THE BELOW ONES - WITHIN THE []
	mapStyles = [{
		stylers: [
			{ hue: "#b1dbd7" },
			{ saturation: -80 }
		]
	}, {
		featureType: "road",
		elementType: "geometry",
		stylers: [
			{ lightness: 100 },
			{ visibility: "simplified" }
		]
	}, {
		featureType: "road",
		elementType: "labels",
		stylers: [
			{ visibility: "off" }
		]
	}];

	// STYLES FOR FULLSCREEN MAP
	mapStylesFullscreen = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.country","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.country","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.country","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":"-100"},{"lightness":"30"}]},{"featureType":"administrative.locality","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.neighborhood","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"simplified"},{"gamma":"0.00"},{"lightness":"74"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"lightness":"3"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"transit","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]}]





	




	/* ************************************************************************************************************** */ 
	// STUFF FOR MOBILE & TABLET
	if (device) {

		$(function() {
			FastClick.attach(document.body);	// FASTCLICK
		});

	};

	
});