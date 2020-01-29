/**
 * @author JungHyunKwon
 * @version 1.0.0
 */
(function() {
	'use strict';

	var html = document.documentElement;

	/**
	 * @name isInPage
	 * @since 2017-12-06
	 * @param {*} element
	 * @return {boolean}
	 */
	window.isInPage = function(element) {
		var result = false;
		
		try {
			result = html.contains(element);
		}catch(e) {
			//console.error(e);
		}

		return result;
	};
})();