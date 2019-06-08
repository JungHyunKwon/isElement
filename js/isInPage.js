/**
 * @author JungHyunKwon
 * @version 1.0.0
 */
try {
	'use strict';

	(function() {
		var _html = document.documentElement;

		/**
		 * @name isInPage
		 * @since 2017-12-06
		 * @param {*} value
		 * @return {boolean}
		 */
		window.isInPage = function(value) {
			var result = false;
			
			try {
				result = _html.contains(value);
			}catch(e) {
				//throw e;
			}

			return result;
		};
	})();
}catch(e) {
	console.error(e);
}