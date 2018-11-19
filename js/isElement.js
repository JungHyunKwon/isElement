/**
 * @author JungHyunKwon
 * @version 1.0.0
 */
try {
	'use strict';

	(function(html) {
		/**
		 * @name isElement
		 * @since 2017-12-06
		 * @param {element} value
		 * @return {boolean}
		 */
		window.isElement = function(value) {
			var result = false;
			
			try {
				result = html.contains(value);
			}catch(e) {
				//throw e;
			}

			return result;
		};
	})(document.documentElement);
}catch(e) {
	console.error(e);
}