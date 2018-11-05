/**
 * @author JungHyunKwon
 * @version 1.0.0
 */
try {
	'use strict';

	(function($) {
		/**
		 * @name 형태 얻기
		 * @since 2017-12-06
		 * @param {*} value
		 * @return {string || undefined}
		 */
		function _getType(value) {
			var result;
			
			//매개변수가 있을 때
			if(arguments.length) {
				//null일 때
				if(value === null) {
					result = 'null';
				
				//undefined일 때
				}else if(value === undefined) {
					result = 'undefined';
				}else{
					result = Object.prototype.toString.call(value).toLowerCase().replace('[object ', '').replace(']', '');
					
					//Invalid Date일 때
					if(result === 'date' && isNaN(new Date(value))) {
						result = 'Invalid Date';
					
					//숫자일 때
					}else if(result === 'number') {
						//NaN일 때
						if(isNaN(value)) {
							result = 'NaN';
						
						//Infinity일 때
						}else if(!isFinite(value)) {
							result = value.toString();
						}
					
					//콘솔일 때
					}else if(result === 'console') {
						result = 'object';
					
					//요소일 때
					}else if(result.indexOf('element') > -1) {
						result = 'element';
					
					//문서일 때
					}else if(result.indexOf('document') > -1) {
						result = 'document';
					}
				}
			}

			return result;
		}

		/**
		 * @name 요소 확인
		 * @since 2017-12-06
		 * @param {object} options element || jQueryElement || {element : element || window || document || jQueryElement || array, isInPage : boolean, isIncludeWindow : boolean, isIncludeDocument : boolean, isMatch : boolean}
		 * @return {boolean}
		 */
		window.isElement = function(options) {
			var optionsType = _getType(options),
				hasJQuery = typeof window.jQuery === 'function',
				isElementOrArrayType = optionsType === 'element' || optionsType === 'array',
				result = false;
			
			//요소이거나 배열이거나 제이쿼리 요소일 때
			if(isElementOrArrayType || (hasJQuery && options)) {
				options = {
					element : options
				};
				
				//요소이거나 배열일때
				if(isElementOrArrayType) {
					optionsType = 'object';
				}
			}

			//객체 또는 요소일 때
			if(optionsType === 'object') {
				var element = options.element,
					elementType = _getType(element);
				
				//window 또는 document 또는 요소일 때
				if(elementType === 'window' || elementType === 'document' || elementType === 'element') {
					element = [element];
					elementType = 'array';
				}

				//배열이거나 제이쿼리 요소일 때
				if(elementType === 'array' || (hasJQuery && element instanceof $)) {
					var checkedElement = [],
						elementLength = element.length,
						isIncludeWindow = options.isIncludeWindow === true,
						isIncludeDocument = options.isIncludeDocument === true,
						isInPage = options.isInPage === true,
						html = document.documentElement;

					for(var i = 0; i < elementLength; i++) {
						var elementI = element[i],
							elementIType = _getType(elementI),
							isElementType = elementIType === 'element',
							isElement = false;

						//요소이거나 window이면서 window를 포함시키는 옵션을 허용했거나 document이면서 document를 포함시키는 옵션을 허용했을 때
						if(isElementType || (elementIType === 'window' && isIncludeWindow) || (elementIType === 'document' && isIncludeDocument)) {
							//요소이면서 페이지안에 존재 여부를 허용했을 때
							if(isElementType && isInPage) {
								isElement = html.contains(elementI);
							}else{
								isElement = true;
							}
						}

						//요소일때
						if(isElement) {
							checkedElement.push(elementI);
						}
					}

					var checkedElementLength = checkedElement.length;
					
					//결과가 있을 때
					if(checkedElementLength) {
						//일치를 허용했을 때
						if(options.isMatch === true) {
							//요소갯수와 결과갯수가 같을 때
							if(elementLength === checkedElementLength) {
								result = true;
							}
						}else{
							result = true;
						}
					}
				}
			}

			return result;
		};
	})(window.jQuery);
}catch(error) {
	console.error(error);
}