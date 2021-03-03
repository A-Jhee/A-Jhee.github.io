(function($){

	"use strict"; 

/* ---------------------------------------------- /*
* Preloader
/* ---------------------------------------------- */

$(window).load(function() {
	$('#loading').fadeOut();
	$('#loading').delay(350).fadeOut('slow');
});

/* ---------------------------------------------- /*
* Animated scrolling / Scroll Up
/* ---------------------------------------------- */

$('a[href*=#]').on("click", function(e){
	var anchor = $(this);
	$('html, body').stop().animate({
		scrollTop: $(anchor.attr('href')).offset().top
	}, 1000);
	e.preventDefault();
});

$("#scroll-up").click(function (e) {
	e.preventDefault();
   $("html, body").animate({scrollTop: 0}, 1000);
});

$(window).scroll(function() {
	if ($(this).scrollTop() > 100) {
		$('.scroll-up').fadeIn();
	} else {
		$('.scroll-up').fadeOut();
	}
});

/* ---------------------------------------------- /*
* Navbar
/* ---------------------------------------------- */

$('.header').sticky({
	topSpacing: 0
});

$('body').scrollspy({
	target: '.navbar-custom',
	offset: 70
})

/* ---------------------------------------------- /*
* Background image.
/* ---------------------------------------------- */

$(".js-height-full").height($(window).height());

$(window).resize(function(){
	$(".js-height-full").height($(window).height());
});

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
	$('#home').css({'background-attachment': 'scroll'});
} else {
	$('#home').parallax('50%', 0.1);
}

/* ---------------------------------------------- /*
* Twitter
/* ---------------------------------------------- */


$('.testimonials').owlCarousel({
	singleItem: true,
	navigation: false,
	pagination: true,
	slideSpeed : 300,
	paginationSpeed : 400,
	autoPlay: 5000,
	navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>']
});

/* ---------------------------------------------- /*
* Initialize shuffle plugin
/* ---------------------------------------------- */

var $portfolioContainer = $('.list-items-container');

$('#filter li').on('click', function (e) {
	e.preventDefault();

	$('#filter li').removeClass('active');
	$(this).addClass('active');

	var group = $(this).attr('data-group');
	var groupName = $(this).attr('data-group');

	$portfolioContainer.shuffle('shuffle', groupName );
});

$('.simple-ajax-popup').magnificPopup({
	type: 'image',
	gallery:{enabled:true}
});

/* ---------------------------------------------- /*
* WOW Animation When You Scroll
/* ---------------------------------------------- */

new WOW().init();


/* ---------------------------------------------- /*
* A jQuery plugin for fluid width video embeds
/* ---------------------------------------------- */

$('body').fitVids();

/* ---------------------------------------------- /*
* Submit contact form using AJAX
/* ---------------------------------------------- */

// when the form is submitted
$('#contact-form').on('submit', function (e) {
  var url = "contact.php";

  // POST values in the background the the script URL
  $.ajax({
      type: "POST",
      url: url,
      data: $(this).serialize(),
      success: function (data)
      {
          // data = JSON object that contact.php returns

          // we recieve the type of the message: success x danger and apply it to the 
          var messageAlert = 'alert-' + data.type;
          var messageText = data.message;

          // let's compose Bootstrap alert box HTML
          var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
          
          // If we have messageAlert and messageText
          if (messageAlert && messageText) {
              // inject the alert to .messages div in our form
              $('#contact-form').find('.messages').html(alertBox);
              // empty the form
              $('#contact-form')[0].reset();
          }
      }
  });
  return false;
});


})(jQuery);