/*
* @Author: Daniel Goberitz
* @Date:   2017-02-18 17:32:16
* @Last Modified by:   danyg
* @Last Modified time: 2017-02-18 17:57:46
*/

define([], function() {
	'use strict';

	document.addEventListener('DOMContentLoaded', function() {

	});

	var utils;

	utils = {

		$: function(s) {
			if(s.charAt(0) === '<') {
				return utils.ce(s);
			}
			return document.querySelectorAll(s);
		},
		ce: function(html) {
			var div = document.createElement('div');
			div.innerHTML = html;
			return div.firstChild;
		},
		onReady: function(cbk) {
			if(document.readyState.toLowerCase() !== 'loading') {
				cbk();
			} else {
				document.addEventListener('DOMContentLoaded', cbk);
			}
		}

	};

	return utils;

});