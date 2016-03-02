/*
 * form input text Valideter
 *
 */
;(function($) {
$.fn.mordalWindow = function (options){
	$.fn.mordalWindow.defaults = {
		contentsType 					: 'html',
		targetClass 					: '.modal',
		defaultsStartTarget		: 'modal-default',

		overlayBody						:	'<div id="modal-overlay"></div><div id="modal-content"><div id="modal-content-inner"><div id="modal-close"><a href="#"><span>閉じる</span></a></div></div></div>',

		modalAnimType					:	'fade',
		modalDuration					:	'slow'
	};
	//set options
	var opts = $.extend({}, $.fn.mordalWindow.defaults, options);
	var $matcheObj = (typeof(this) == 'undefined') ? this : $(opts.targetClass);

	_init();

	// init modal window
	function _init (){

		$matcheObj.each(function(){
			$(this).bind('click',function(){
				// modal target exists check
				var target = $(this).attr('href');
				//$(this).toggleClass('active');

				if( typeof( target )=='undefined' || !target || target==null ){
					return false ;
				}

				// modal target contents exists check
				var thisModalContent = $(target).html();
				if(thisModalContent == null){
					return false ;
				}

				_start(thisModalContent);

				return false;
			});
		});
		if($('#' + opts.defaultsStartTarget)[0]){
			var thisModalContent = $('#' + opts.defaultsStartTarget).html();

			_start(thisModalContent);
		}

		$( window ).resize(__centeringModalInner);
	}

	function _start (thisModalContent){
		// modal overlap check
		if($('#modal-overlay')[0]) return false;

		// setting overlay html
		$('body').append(opts.overlayBody);

		if(opts.modalAnimType == 'fade'){
			$('#modal-overlay').fadeIn(opts.modalDuration);
		}

		$('#modal-content-inner').append(thisModalContent);

		__centeringModalInner();

		if(opts.modalAnimType == 'fade'){
			$('#modal-content').fadeIn(opts.modalDuration);
		}

		_finish();
	}

	function _finish (){
		$('#modal-overlay,#modal-close').unbind().click( function(){
			if(opts.modalAnimType == 'fade'){
				$('#modal-content,#modal-overlay').fadeOut(opts.modalDuration,function(){
					$('#modal-overlay').remove();
					$('#modal-content').remove();
				});
			}
			return false;
		});
	}

	function __centeringModalInner() {
		// check modal exsists
		if( $('#modal-content') == null ) return false ;

		var modalBody = $('#modal-content');
		var windowsize = [];

		windowsize.w = $(window).width() ;
		windowsize.h = $(window).height() ;

		windowsize.cw = modalBody.outerWidth() ;
		windowsize.ch = modalBody.outerHeight() ;

		//$('.modal-content').css( {'left': ((windowsize.w - windowsize.cw)/2) + 'px','top': ((windowsize.h - windowsize.ch)/2) + 'px'} ) ;
		modalBody.css( {'left': ((windowsize.w - windowsize.cw)/2) + 'px','top': ((windowsize.h - windowsize.ch)/2) + 'px','position':'fixed'} );

		if(windowsize.h < modalBody.outerHeight() || windowsize.w < modalBody.outerWidth()){
			modalBody.css( {'left': ((windowsize.w - windowsize.cw)/2) + 'px','top': ( $(window).scrollTop()+50 ) + 'px','position':'absolute'} );
		}
	}
};
})(jQuery);
