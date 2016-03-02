/*
 * form input text Valideter
 *
 */
;(function($) {
$.fn.formValidator = function (options){
	//default options
	$.fn.formValidator.defaults = {
		errorMessageBefore 		: '<div class="error-message"><span>',
		errorMessageAfter 		: '</span></div>',
		errorMessageSelecter	: '.error-message',

		requiredMessage				: '※必須項目です',
		mailMessage						: '※メールアドレスとして正しくありません',
		passwordMessage				: '※半角英数のみで入力してください',
		numberMessage					: '※半角数字のみで入力してください',

		messageAnimType				:	'fade',
		messageDuration				:	'slow'
	};

	//set options
	var opts = $.extend({}, $.fn.formValidator.defaults, options);

	var $matcheObj = this;

	function _init (){
		if($matcheObj.prop('tagName') == 'FORM'){
			$matcheObj.find('input').each(function(){
				_start(this);
			});
		}else{
			$matcheObj.each(function(){
				_start(this);
			});
		}

	}

	function _start ($targetObj){
			$($targetObj).on('focus',function(){
				// input area focus process
				if( opts.messageAnimType == 'fade' ){
					$.when(
						$(this).prev(opts.errorMessageSelecter).fadeOut(opts.messageDuration)
					).done(function(){
						$(this).prev(opts.errorMessageSelecter).remove();
					});
				}else{
					$.when(
						$(this).prev(opts.errorMessageSelecter).hide(opts.messageDuration)
					).done(function(){
						$(this).prev(opts.errorMessageSelecter).remove();
					});
				}

			}).on('blur',function(){
				_checkProcess($(this));
			});
	}

	function _checkProcess ($checkInputObj){
		var errorCheckFlag = false;
		// input area blur process

		// setting error text outer html before
		var errorText = [];
		errorText.push(opts.errorMessageBefore);

		// required data-type check
		if(blankCheck($checkInputObj) &&
				($checkInputObj.attr('data-required') === 'required' || $checkInputObj.attr('required') === 'required')){
			errorCheckFlag = true;
			errorText.push(opts.requiredMessage);
		}

		//mail format check
		if( $checkInputObj.hasClass('mail-address') ){
			if( mailFormatCheck($checkInputObj) ){
				errorCheckFlag = true;
				errorText.push(opts.mailMessage);
			}
		}

		//single-byte Check
		if( $checkInputObj.attr('type') === 'password' ){
			if( singleByteCheck($checkInputObj) ){
				errorCheckFlag = true;
				errorText.push(opts.passwordMessage);
			}
		}

		//number Check
		if( $checkInputObj.hasClass('number') ){
			if( numberCheck($checkInputObj) ){
				errorCheckFlag = true;
				errorText.push(opts.numberMessage);
			}
		}

		// setting error text outer html after
		errorText.push(opts.errorMessageAfter);

		if( errorCheckFlag ){
			var errorHtml = '',
			errorLength = errorText.length;
			errorText.forEach(function(value, index){
				if( errorLength > 3 && index > 1){
					errorHtml += '<br />';
				}
				errorHtml += value;
			});
			// if this required data and no input
			$checkInputObj.before(errorHtml);
			$checkInputObj.prev(opts.errorMessageSelecter).hide();
			if( opts.messageAnimType == 'fade' ){
				$checkInputObj.prev(opts.errorMessageSelecter).fadeIn(opts.messageDuration);
			}else{
				$checkInputObj.prev(opts.errorMessageSelecter).show(opts.messageDuration);
			}
		}

	}

	//init function
	_init();

/*
 * If input area is blank,return error by boolean data type
 * Parameter : jQueryObject
 * Return boolean
 */
function blankCheck($this){
	var inputText = $this.val();
	if(inputText === ''){
		return true;
	}else{
		return false;
	}
}

/*
 * compare input text with mail address format by regular expression
 * Parameter : jQueryObject
 * Return boolean
 */
function mailFormatCheck($this){
	var inputText = $this.val();
	if(inputText != ''){
		if(inputText.match(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/)){
			return false;
		}else {
			return true;
		}
	}
}

/*
 * single byte check
 * Parameter : jQueryObject
 * Return boolean
 */
function singleByteCheck($this){
	var inputText = $this.val();
	if(inputText != ''){
		if(inputText.match ( /[^0-9a-zA-Z_]+/ )){
			return true;
		}else {
			return false;
		}
	}
}

/*
 * number check
 * Parameter : jQueryObject
 * Return boolean
 */
function numberCheck($this){
	var inputText = $this.val();
	if(inputText != ''){
		if(inputText.match ( /[^0-9_]+/ )){
			return true;
		}else {
			return false;
		}
	}
}

}

})(jQuery);
