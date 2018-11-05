/**
 * @author JungHyunKwon
 * @version 1.0.0
 */
try {
	'use strict';

	(function() {
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
				//null일때
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
					
					//콘솔이거나 매개변수일 때
					}else if(result === 'console' || result === 'arguments') {
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
				result = false;

			//요소이거나 배열이거나 객체일 때
			if(optionsType === 'element' || optionsType === 'array' || optionsType === 'object') {
				var element = options.element || options,
					elementType = _getType(element);

				//window 또는 document 또는 요소일 때
				if(elementType === 'window' || elementType === 'document' || elementType === 'element') {
					element = [element];
					elementType = 'array';
				}
				
				//배열 또는 객체일 때
				if(elementType === 'array' || elementType === 'object') {
					var elementLength = element.length;
					
					//요소 갯수가 있을 때
					if(elementLength) {
						var checkedElement = [],
							isIncludeWindow = options.isIncludeWindow === true,
							isIncludeDocument = options.isIncludeDocument === true,
							isInPage = options.isInPage === true,
							html = document.documentElement;

						for(var i = 0; i < elementLength; i++) {
							var elementI = element[i],
								elementIType = _getType(elementI),
								isElementI = elementIType === 'element',
								isElement = false;

							//요소이거나 window이면서 window를 포함시키는 옵션을 허용했거나 document이면서 document를 포함시키는 옵션을 허용했을 때
							if(isElementI || (elementIType === 'window' && isIncludeWindow) || (elementIType === 'document' && isIncludeDocument)) {
								//요소이면서 페이지안에 존재 여부를 허용했을 때
								if(isElementI && isInPage) {
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
			}

			return result;
		};
	})();
}catch(e) {
	console.error(e);
}