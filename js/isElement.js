/**
 * @author JungHyunKwon
 * @version 1.0.0
 */
try {
	'use strict';

	(function($) {
		/**
		 * @name 형태얻기
		 * @since 2017-12-06
		 * @param {*} value
		 * @return {string || undefined}
		 */
		function _getType(value) {
			var result;
			
			//매개변수가 있을때
			if(arguments.length) {
				//null일때
				if(value === null) {
					result = 'null';
				
				//undefined일때
				}else if(value === undefined) {
					result = 'undefined';
				}else{
					result = Object.prototype.toString.call(value).toLowerCase().replace('[object ', '').replace(']', '');
					
					//Invalid Date일때
					if(result === 'date' && isNaN(new Date(value))) {
						result = 'Invalid Date';
					
					//숫자일때
					}else if(result === 'number') {
						//NaN일때
						if(isNaN(value)) {
							result = 'NaN';
						
						//Infinity일때
						}else if(!isFinite(value)) {
							result = value.toString();
						}
					
					//콘솔일때
					}else if(result === 'console') {
						result = 'object';
					
					//요소일때
					}else if(result.indexOf('element') > -1) {
						result = 'element';
					
					//문서일때
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
		 * @param {object} options element || jQueryElement || {element : element || window || document || array || jQueryElement, isInPage : boolean, include : window || document || array, match : boolean}
		 * @return {boolean}
		 */
		window.isElement = function(options) {
			var hasJQuery = (typeof $ === 'function') ? true : false,
				optionsType = _getType(options),
				result = false;
			
			//요소이거나 제이쿼리 요소일때
			if(optionsType === 'element' || (hasJQuery && options instanceof $)) {
				options = {
					element : options
				};

				optionsType = 'object';
			}

			//객체 또는 요소일때
			if(optionsType === 'object') {
				var element = options.element,
					elementType = _getType(element),
					include = options.include,
					includeType = _getType(include),
					isInPage = (options.isInPage === true) ? true : false;
				
				//window 또는 document 또는 요소일때
				if(elementType === 'window' || elementType === 'document' || elementType === 'element') {
					element = [element];
					elementType = 'array';
				}

				//window 또는 document일때
				if(include === 'window' || includeType === 'document') {
					include = [include];
					includeType = 'array';
				}

				/**
				 * @name 요소검사
				 * @since 2017-12-06
				 * @param {window || document || element} element
				 * @return {boolean}
				 */
				function checkElement(element) {
					var result = false,
						elementType = _getType(element);

					//배열일때
					if(includeType === 'array') {
						for(var i = 0, includeLength = include.length; i < includeLength; i++) {
							var includeI = include[i];
							
							//window 또는 document 포함여부
							if((includeI === window || includeI === document) && element === includeI) {
								result = true;
								break;
							}
						}
					
					//요소일때
					}else if(elementType === 'element') {
						//페이지안에 존재여부를 허용했을때
						if(isInPage) {
							result = document.documentElement.contains(element);
						}else{
							result = true;
						}
					}

					return result;
				}

				//배열이거나 제이쿼리 요소일때
				if(elementType === 'array' || (hasJQuery && element instanceof $)) {
					var checkedElement = [],
						elementLength = element.length;

					for(var i = 0; i < elementLength; i++) {
						var elementI = element[i];

						//요소일때
						if(checkElement(elementI)) {
							checkedElement.push(elementI);
						}
					}

					var checkedElementLength = checkedElement.length;
					
					//결과가 있을때
					if(checkedElementLength) {
						//일치를 허용했을때
						if(options.match === true) {
							//요소갯수와 결과갯수가 같을때
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