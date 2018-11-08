/**
 * @author JungHyunKwon
 * @version 1.0.0
 */
try {
	'use strict';

	(function() {
		window.isElement = function(element) {
			var result = false;
			
			try {
				result = document.documentElement.contains(element);
			}catch(e) {
				//throw e;
			}

			return result;
		};
	})();
}catch(e) {
	console.error(e);
}