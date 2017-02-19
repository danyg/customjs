/*
* @Author: Daniel Goberitz
* @Date:   2017-02-18 17:32:16
* @Last Modified by:   danyg
* @Last Modified time: 2017-02-19 12:17:10
*/

define([
	'jquery',
	'mousetrap',

	'text!./workarea.html',
	'css!./workarea'

], function(
	$,
	mousetrap,

	workareaHTML
) {
	'use strict';

	class Tabs {
		constructor () {
			this._list = [];
			this._current = null;
			$(() => {
				this.$workarea = $(workareaHTML);
				$('#workarea').replaceWith(this.$workarea);
				this.$tabs = $('.tabs', this.$workarea);
				this.$tabsContents = $('.content-container', this.$workarea);
				this._setScrollBtns();


				mousetrap.bind('ctrl+pageup', this.prevTab.bind(this));
				mousetrap.bind('ctrl+pagedown', this.nextTab.bind(this));
			});
		}

		_titleToId(title) {
			var id = title
				.toLowerCase()
				.replace(/[\s\W]/g, '_')
			;
			if(id.charAt(0).match(/[0-9]/)) {
				id = '_' + id;
			}
			var i = 0, pid = id;
			while(this._list.indexOf(id) !== -1) {
				id = pid + '_' + ++i;
			}
			return id;
		}

		_setScrollBtns() {
			this.$scrollBtns = $('.scroll-btn', this.$workarea)
				.hide()
			;
			$('.scroll-btn-left', this.$workarea)
				.on('mousedown', this._startScroll.bind(this, -1))
			;
			$('.scroll-btn-right', this.$workarea)
				.on('mousedown', this._startScroll.bind(this, 1))
			;
			$('.scroll-btn', this.$workarea)
				.on('mouseup', this._stopScroll.bind(this))
				.on('mouseleave', this._stopScroll.bind(this))
				.on('mouseout', this._stopScroll.bind(this))
			;
			$(window)
				.on('mouseleave', this._stopScroll.bind(this))
				.on('mouseout', this._stopScroll.bind(this))
			;
		}

		addTab(title, $content) {
			var id = this._titleToId(title);
			var $tab = $('<li class="tab" rel="' + id + '">' + title + '</li>')
				.appendTo(this.$tabs)
				.attr('title', title)
				.on('click', () => {
					this.activeTab(id);
				})
			;
			var $tabContent = $('<div class="tab" rel="' + id + '"></div>')
				.appendTo(this.$tabsContents)
				.append($content)
			;
			this._list.push(id);
			this._checkScroll();
			return id;
		}

		activeTab(rel) {
			$('.tab.active', this.$workarea).removeClass('active');
			$('.tab[rel='+rel+']', this.$workarea).addClass('active');
			this._current = rel;

			return this;
		}

		prevTab() {
			var p = this._list.indexOf(this._current);
			p--;
			if(p < 0) {
				p = this._list.length-1;
			}
			this.activeTab(this._list[p]);

			return this;
		}

		nextTab() {
			var p = this._list.indexOf(this._current);
			p++;
			if(p >= this._list.length) {
				p = 0;
			}
			this.activeTab(this._list[p]);

			return this;
		}

		_startScroll(delta) {
			this._stopScroll();
			this._scrollStarted = Date.now();
			this._scrollInterval = setInterval(()=>{
				this._scroll(delta);
			}, 10);
		}
		_stopScroll() {
			clearInterval(this._scrollInterval);
		}
		_scroll(delta) {
			var m = parseInt(((Date.now() - this._scrollStarted) / 300), 10);
			if (m > 0) {
				delta = delta * m;
			}

			var t = this.$tabs[0];
			var nSL = t.scrollLeft + delta;
			if(nSL < 0) {
				nSL = 0;
			} else if(nSL > t.scrollWidth) {
				nSL = t.scrollWidth;
			}
			t.scrollLeft = nSL;
		}

		_checkScroll() {
			if(this.$tabs[0].scrollWidth > this.$tabs.innerWidth()) {
				this.$scrollBtns.show();
			} else {
				this.$scrollBtns.hide();
			}

			// also check if current active tab is visible and show it
		}
	}

	return new Tabs();
});