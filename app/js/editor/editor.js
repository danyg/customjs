/*
* @Author: Daniel Goberitz
* @Date:   2017-02-18 17:32:16
* @Last Modified by:   danyg
* @Last Modified time: 2017-02-19 11:16:16
*/

define([
	'ace/ace',
	'jquery',
	'workarea/workarea',

	'text!./editor.html',
	'css!./editor',

	'ace/ext-language_tools',
], function(
	ace,
	$,
	workarea,

	editorHTML
) {
	'use strict';

	class Editor {
		constructor() {
			$(() => {
				var $template = $(editorHTML);
				this._jsTabId = workarea.addTab('JS', $('#jsEditor', $template));
				this._cssTabId = workarea.addTab('CSS', $('#cssEditor', $template));

				this._jsEditor = this.createEditor('js');
				this._cssEditor = this.createEditor('css');

				workarea.activeTab(this._jsTabId);
			});
		}

		createEditor(type) {
			var mode;
			switch(type) {
				case 'css': mode = 'ace/mode/css'; break;
				case 'js':  mode = 'ace/mode/javascript'; break;
			}

			var editor = ace.edit(type + "Editor");
			editor.setTheme('ace/theme/twilight');
			editor.session.setMode(mode);
			editor.setOptions({
				enableBasicAutocompletion: true,
				enableSnippets: true,
				enableLiveAutocompletion: false
			});
			editor.commands.addCommand({
				name: 'PrevTab',
				bindKey: {win: 'Ctrl-PageUp',  mac: 'Command-PageUp'},
				exec: function(editor) {
					workarea.prevTab();
			    },
			    readOnly: true
			});
			editor.commands.addCommand({
				name: 'NextTab',
				bindKey: {win: 'Ctrl-PageDown',  mac: 'Command-PageDown'},
				exec: function(editor) {
					workarea.nextTab();
			    },
			    readOnly: true
			});
			return editor;
		}
	}

	return new Editor();
});