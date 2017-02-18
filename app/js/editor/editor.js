/*
* @Author: Daniel Goberitz
* @Date:   2017-02-18 17:32:16
* @Last Modified by:   danyg
* @Last Modified time: 2017-02-18 19:29:56
*/

define([
	'ace/ace',
	'jquery',
	'mousetrap',

	'text!./editor.html',
	'css!./editor',

	'ace/ext-language_tools'
], function(
	ace,
	$,
	mousetrap,

	editorHTML
) {
	'use strict';
	var toExport = {
			jsEditorElm: null,
			cssEditorElm: null,
			jsEditor: null,
			cssEditor: null
		}
	;

	var tabs = {
		list: [],
		current: null,

		activeTab: function (rel) {
			$('.tab.active', '#container').removeClass('active');
			$('.tab[rel='+rel+']', '#container').addClass('active');
			this.current = rel;
		},
		prevTab: function() {
			console.log('prevTab')
			var p = this.list.indexOf(this.current);
			p--;
			if(p < 0) {
				p = this.list.length-1;
			}
			this.activeTab(this.list[p]);
		},
		nextTab: function() {
			console.log('nextTab')
			var p = this.list.indexOf(this.current);
			p++;
			if(p >= this.list.length) {
				p = 0;
			}
			this.activeTab(this.list[p]);
		}
	};

	function createEditor(type) {
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
				tabs.prevTab();
		    },
		    readOnly: true
		});
		editor.commands.addCommand({
			name: 'NextTab',
			bindKey: {win: 'Ctrl-PageDown',  mac: 'Command-PageDown'},
			exec: function(editor) {
				tabs.nextTab();
		    },
		    readOnly: true
		});
		return editor;
	}

	$(() => {
		var container = $(editorHTML).appendTo(document.body);

		toExport.jsEditor = createEditor('js');
		toExport.cssEditor = createEditor('css');

		$('.tabs .tab').each(function() {
			var $tab = $(this),
				rel = $tab.attr('rel')
			;
			tabs.list.push(rel);
			$tab.on('click', function() {
				tabs.activeTab(rel);
			});
		});
		tabs.activeTab('js');

		// mousetrap.bind('ctrl+pageup', tabs.prevTab.bind(tabs));
		// mousetrap.bind('ctrl+pagedown', tabs.nextTab.bind(tabs));
	});


	return toExport;
});