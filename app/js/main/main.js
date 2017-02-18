/*
* @Author: Daniel Goberitz
* @Date:   2017-02-18 17:30:44
* @Last Modified by:   danyg
* @Last Modified time: 2017-02-18 19:16:33
*/

requirejs.config({
	baseUrl: "/app/js",
	paths: {
		ace: '/../node_modules/ace-builds/src',
		css: '/../node_modules/require-css/css.min',
		text: '/../node_modules/requirejs-text/text',
		jquery: '/../node_modules/jquery/dist/jquery',
		mousetrap: '/../node_modules/mousetrap/mousetrap.min'
	}
})

define([
	'editor/editor',

	'css!./main/main'
], function(
	editor
) {

	'use strict';

});