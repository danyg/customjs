/*
* @Author: Daniel Goberitz
* @Date:   2017-02-18 17:30:44
* @Last Modified by:   danyg
* @Last Modified time: 2017-02-19 11:08:31
*/

requirejs.config({
	baseUrl: "/app/js",
	paths: {
		ace: '/../node_modules/ace-builds/src',
		css: '/../node_modules/require-css/css.min',
		text: '/../node_modules/requirejs-text/text',
		jquery: '/../node_modules/jquery/dist/jquery',
		'font-awesome': '/../node_modules/font-awesome/css/font-awesome',
		mousetrap: '/../node_modules/mousetrap/mousetrap.min'
	}
})

define([
	'toolbar/toolbar',
	'workarea/workarea',
	'editor/editor',

	'css!./main/main',
	'css!font-awesome'

], function(
	toolbar,
	workarea,
	editor
) {

	'use strict';

});