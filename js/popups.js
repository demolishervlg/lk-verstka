$(function(){
	$('.image-pop-up').magnificPopup({
		type: "image",
	});
});

function clickPortfolio (id){
	$.ajax({
		type: 'get',
		url: '/ajax/get-ajax-content.php',
		data: id,
		success: function (data) {
			$.magnificPopup.open({
				mainClass: 'mfp-zoom-in',
				removalDelay: 300,
				type: 'inline',
				preloader: false,
				closeMarkup: '<a class="mfp-close-set"><span class="mfp-close close-icon"></span></a>',
				items: {
					src: '#pp-portfolio'
				},
				callbacks: {
					beforeOpen: function() {
					},
					beforeClose: function() {
					},
					open: function() {
						$(this.content).find(".title").text(data.title);
						$(this.content).find(".date").text(data.date);
						$(this.content).find(".img").find("img").attr('src',data.img);
						setTimeout(function() { $('.mfp-zoom-in').addClass('mfp-image-loaded'); }, 16);
					}
				}
			});
		}
	});
}

function addPortfolio (){
	$.magnificPopup.open({
		mainClass: 'mfp-zoom-in',
		removalDelay: 300,
		type: 'inline',
		preloader: false,
		closeMarkup: '<a class="mfp-close-set"><span class="mfp-close close-icon"></span></a>',
		items: {
			src: '#pp-add-portfolio'
		},
		callbacks: {
			beforeOpen: function() {
			},
			beforeClose: function() {
			},
			open: function() {
				setTimeout(function() { $('.mfp-zoom-in').addClass('mfp-image-loaded'); }, 16);
			}
		}
	});
}
