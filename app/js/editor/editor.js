/*
* @Author: Daniel Goberitz
* @Date:   2017-02-18 17:32:16
* @Last Modified by:   danyg
* @Last Modified time: 2017-02-18 18:00:04
*/

define([
	'ace/ace',
	'utils',

	'css!./editor'
], function(
	ace,
	utils
) {
	'use strict';
	var $ = utils.$,
		editorElm,
		editor,
		toExport = {
			editorElm: null,
			editor: null
		}
	;

	utils.onReady(() => {
		editorElm = $('<div id="editor"></div>');
		document.body.appendChild(editorElm);
		editor = ace.edit("editor");

		toExport.editorElm = editorElm;
		toExport.editor = editor;

		editor.setTheme("ace/theme/twilight");
		editor.session.setMode("ace/mode/javascript");
	});

	return toExport;
});