$(function(){

	// INIT

	$.fn.device();
	$.fn.gnbSize();

	navi();
	small_nav();
	search();


	// WINDOW RESIZE FUNCTION

	$(window).resize( function() {
	
		$.fn.device();
		$.fn.gnbSize();

	});


	// GNB PC

	function navi() {

		$("#gnb").on("mouseenter", "> .box > ul > li", function(e) {
			if (e.type == 'mouseenter') {
				$("#gnb > .box > ul > li").removeClass("on");
				$(this).addClass('on');
			}
		});

		$("#gnb").on("mouseleave", "> .box > ul > li", function(e) {
			if (e.type == 'mouseleave') {
				$("#gnb > .box > ul > li").removeClass("on");
			}
		});

		$("#gnb").on("mouseenter", "> .box > ul > li", function() {
			if($("body").data("device") != "mobile") {
				$(".h_group").addClass("on");
				// $(this).css("height","320px");
				$(this).parents(".h_group").stop().animate({"height":"300px"}, 300);
				$("#gnb .sub_menu").show();
			}
		});

		$(".h_group").on("mouseleave", function() {
			if($("body").data("device") != "mobile") {
				$("#gnb > .box > ul > li").css("height","auto");
				$("#gnb > .box > ul > li").parents(".h_group").stop().animate({"height":"90px"}, 300, function() {
					$("#gnb > .box > ul > li").siblings().children(".sub_menu").hide();
					$(".h_group").removeClass("on");
				});
			}
		});

		// GNB 키보드 접근
		
		$("#gnb").on("focusin", "> .box > ul > li > a", function() {
			if($("body").data("device") != "mobile") {
				if($(".h_group").hasClass("on") == false) {
					// $(this).css("height","320px");
					$(this).parents(".h_group").stop().animate({"height":"300px"}, 300);
					$("#gnb .sub_menu").show();
				}
			}
		}); 

		$(document).on('focus', '.util', function() {
			if($("body").data("device") != "mobile") {
				$("#gnb > .box > ul > li").parents(".h_group").stop().animate({"height":"90px"}, 300, function() {
					$("#gnb > .box > ul > li").siblings().children(".sub_menu").hide();
				});
			}
		});

	}
	

	// GNB MOBILE

	function small_nav() {

		$(".btn_menu").on("click", function() {
			var overflowChk = $("body").css("overflow");
			var deviceHeight = $(window).height();

			if(overflowChk == "hidden") {
				$("body").css({
					"overflow":"visible",
					"height":"auto"
				});
			} else {
				$("body").css({
					"overflow":"hidden",
					"height":deviceHeight
				});
			}

			$(this).next().stop().animate({"right":"0%"}, 300);
			$("#gnb > .dim").fadeIn();
		});

		$("#gnb > .box").on("click", "> ul > li > a", function() {
			if($("body").data("device") == "mobile") {
				$("#gnb > .box > ul > li > .sub_menu > .inner > ul").filter(":not(:animated)").slideUp("fast");
				$(this).parent().find("> .sub_menu > .inner > ul").filter(":not(:animated)").slideToggle();
				if( $(this).parent().hasClass("current") ) {
					$(this).parent().removeClass("current");
					return;
				}
				$("#gnb > .box > ul > li").removeClass("current");
				$(this).parent().toggleClass("current");
			}
		});

		$("#gnb").on("click", "> .dim, > .box > .btn_close", function() {
			$("body").css("overflow","visible");
			$("#gnb > .dim").hide();
			$("#gnb > .box").stop().animate({"right":"-80%"}, 300);
			$("#gnb .btn_menu").focus();
		});

	}

	function search() {

		// 검색

		$("#header .util-menu .keyword .util").click(function() {
			if(!$(this).hasClass("on")) {
				$("#header .util-menu .keyword input").show();
				$(this).addClass("on");
				setTimeout(function() {
					$("#header .util-menu .keyword").addClass("show");
					$("#header .util-menu .keyword input").focus();
				}, 10);
				return false;
			}
		});

		$("#header .util-menu .keyword .btn-cl-search").click(function() {
			$("#header .util-menu .keyword").removeClass("show");
			$("#header .util-menu .keyword a").removeClass("on");
			$("#header .util-menu .keyword a.util").focus();
		});

	}


	// HOME

	if( $('body').hasClass('home') ) {

		// 메인 슬라이드

		$('.visual').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			dots: true,
			fade: true,
			autoplay: true,
			autoplaySpeed: 5000
		});

		// visual pause, play

		$('.btn_play').on('click', function() {
			var $pauseBtn = $(this);
			if($pauseBtn.hasClass('on')) {
				$(".visual").slick('slickPlay');
				$(this).text("시작");
				$pauseBtn.removeClass('on');
			} else {
				$(".visual").slick('slickPause');
				$(this).text("정지");
				$pauseBtn.addClass('on');
			}
		});

		// info

		$('.g_family').slick({
			infinite: true,
			slidesToShow: 8,
			slidesToScroll: 1,
			autoplay: true,
			responsive: [
				{
				  breakpoint: 1200,
				  settings: {
					slidesToShow: 5,
					infinite: true
				  }
				},
				{
				  breakpoint: 1000,
				  settings: {
					slidesToShow: 4
				  }
				},
				{
				  breakpoint: 600,
				  settings: {
					slidesToShow: 2
				  }
				},
				{
				  breakpoint: 420,
				  settings: {
					slidesToShow: 1
				  }
				}
			]
		});

	}

});


// DEVICE CHK

$.fn.device = function() {

	var size = $(window).width() + 17; // 스크롤바 width 추가
		
	if(size <= 1200) {
		$("body").data("device","mobile");
	} else {
		$("body").data("device","pc");
	}

}

// GNB SETTING

$.fn.gnbSize = function() {

	var deviceWidth = $(window).width();
	var deviceHeight = $(window).height();
	
	if($("body").data("device") == "mobile") {

		$("body").css("overflow","visible");
		$("#gnb > .box").css({
			"height":deviceHeight,
			"background":"#424242"
		});
		$("#gnb .sub_menu").show();
		$("#gnb .sub_menu ul").hide();
		if($("#gnb > .dim").length == 0) {
			$("#gnb").append("<div class='dim' style='display:none;position:absolute;top:-30px;left:0px;z-index:10;width:" + (deviceWidth + 17) + "px;height:" + deviceHeight + "px;background:#000;filter:alpha(opacity=50);opacity:0.5'></div>");
		}

	} else {

		$("body").css("overflow","visible");
		$("#gnb > div.box").css({
			"height":"auto",
			"background":"none"
		});
		$("#gnb > div.box").css("right","-80%");
		$("#gnb > div.box > ul > li").removeClass("current");
		$("#gnb .sub_menu").hide();
		$("#gnb .sub_menu ul").show();
		$("#gnb .sub_menu > div .inner > ul").show();
		$("#gnb > .dim").remove();

	}

}