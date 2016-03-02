$(function() {
/* --------------------
 * pluginExists
 * @return boolean
 * プラグイン存在確認
----------------------- */
function pluginExists( pluginName ){
	return [pluginName] || $.fn[pluginName] ? true : false;
}

/* --------------------
 * titleBlockAccord
----------------------- */
function titleBlockAccord(){
	$(".accordionTitleBlock01").click(function() {
		var $target = $(this);
		if ($target.next().css('display') == 'none') {
				$target.next().slideDown('fast');
				$target.addClass('close');
		} else {
				$target.next().slideUp('fast');
				$target.removeClass('close');
		}
	});
}
if(typeof titleBlockAccord == 'function'){
	titleBlockAccord();
}

/* --------------------
 * profile
----------------------- */
function configProfileTab(){
	$('.profileBlock').not('.profileConfigBlock').addClass('active');
	$('.profileConfigBlock').hide();

	$('.profileCondigBtn').on('click',function(){
		$('.profileBlock').toggle('fast').toggleClass('active');

		return false;
	});
}
configProfileTab();

/* --------------------
 * fontResizeWatcher
----------------------- */
function fontResizeWatcher(){
	$('body').append('<div id="fontResizeWatchBox">S</div>');
	var watcher = $('#fontResizeWatchBox').hide().css({'opacity':0,'position':'absolute'});
	var defHeight = watcher.outerHeight();

	function checkBoxSize(){
		if(defHeight != watcher.outerHeight()){
			// add custum event font size changed
			var event = new $.Event('fontSizeChanged');
			$('.autoHeight').trigger(event);
			defHeight= watcher.outerHeight();
		}
	}
	// set watching interval
	var fontResizeTimer = setInterval(checkBoxSize,1000);
}
fontResizeWatcher();

if(pluginExists('autoHeight')){
	var opts = [];
	opts = {column:2,clear:1,reset:'reset'};
	$('.autoHeight').on('fontSizeChanged',function(){
		$('.autoHeight').autoHeight(opts);
	});
	$('.autoHeight').autoHeight(opts);

	var timer = false;
	$(window).resize(function() {
		if (timer !== false) {
			clearTimeout(timer);
		}
		timer = setTimeout(function() {
			$('.autoHeight').autoHeight(opts);
		}, 200);
	});
}


/* --------------------
 * smartRollover
 * マウスオーバー
----------------------- */
function smartRollover() {
	if(document.getElementsByTagName) {
		var images = document.getElementsByTagName("img");
		for(var i=0; i < images.length; i++) {
			if(images[i].getAttribute("src").match("_off."))
			{
				images[i].onmouseover = function() {
					this.setAttribute("src", this.getAttribute("src").replace("_off.", "_on."));
				}
				images[i].onmouseout = function() {
					this.setAttribute("src", this.getAttribute("src").replace("_on.", "_off."));
				}
			}
		}
	}
}
if(window.addEventListener) {
		window.addEventListener("load", smartRollover, false);
}
else if(window.attachEvent) {
		window.attachEvent("onload", smartRollover);
}

});
