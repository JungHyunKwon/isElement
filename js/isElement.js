/**
 * @author JungHyunKwon
 * @version 1.0.0
 */
try {
	'use strict';

	(function($) {
		/**
		 * @name 요소확인
		 * @since 2017-12-06
		 * @param {window || document || element} element
		 * @return {boolean}
		 */
		window.isElement = function(element) {
			var result = false;
			
			try {
				result = document.documentElement.contains(element);
			}catch(error) {
				//console.error(error);
			}

			//window 또는 document일때
			if(element === window || element === document) {
				result = true;						
			}

			return result;
		};

		//제이쿼리가 있을때
		if(typeof $ === 'function') {
			/**
			 * @name 제이쿼리 요소확인
			 * @since 2017-12-06
			 * @param {jQueryElement || jQueryObject} element
			 * @return {boolean}
			 */
			$.isJQueryElement = function(element) {
				var result = false;

				//제이쿼리 객체일때
				if(element instanceof $) {
					var elementLength = element.length;
					
					result = [];

					for(var i = 0; i < elementLength; i++) {
						var elementI = element[i];

						if(isElement(elementI)) {
							result.push(elementI);
						}
					}

					var resultLength = result.length;

					//제이쿼리 엘리먼트일때
					if(resultLength && elementLength === resultLength) {
						result = true;
					}else{
						result = false;
					}
				}

				return result;
			};

			/**
			 * @name 요소 또는 제이쿼리 요소인지 구하기
			 * @since 2017-12-06
			 * @param {window || document || element || jQueryElement} element
			 * @return {boolean}
			 */
			$.isElement = function(element) {
				var result = false;

				//window 또는 document 또는 요소 또는 제이쿼리 요소일때
				if(window.isElement(element) || $.isJQueryElement(element)) {
					result = true;
				}

				return result;
			};
		}
	})(jQuery);
}catch(error) {
	console.error(error);
}