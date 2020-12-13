GS4uApp = {
	api_url: 'https://www.gs4u.net/',
	language: 'ru',
	game_alias: 'all',
	page: 1,
	pageContent: [],
	summary: null,
	server_list_selector: '#serverlist .tbody',
	server_list_head_selector: '#serverlist .thead',
	pagination_selector: '#pagination',
	filter_selector: '#header .filter',
	summary_selector: '#header .summary',
	show_game: true,
	init: function (options) {
		if (options) {
			if (options.game_alias) {
				GS4uApp.game_alias = options.game_alias;
			}
			if (options.page) {
				GS4uApp.page = options.page;
			}
		}
		GS4uApp.changePage(1);
	},
	changePage: function (pageNumber) {
		GS4uApp.page = pageNumber;
		GS4uApp.loadPage(
			GS4uApp.page,
			function () {
				GS4uApp.showPage(GS4uApp.page);
			},
			function (e) {
				GS4uApp.showError(e)
			}
		);
	},
	showError: function (e) {
		console.error(e);
	},
	loadPage: function (page, onSuccess, onError) {
		let _url = GS4uApp.api_url + GS4uApp.language + '/' +
			(GS4uApp.game_alias ? GS4uApp.game_alias + '/' : '') + 'page-' + page + '.json';
		jQuery.ajax({
			url: _url,
			success: function (r) {
				if (!r) {
					if (onError) {
						onError();
					}
				} else {
					GS4uApp.summary = r.summary;
					GS4uApp.pageContent[page] = r.servers;
					if (onSuccess) {
						onSuccess();
					}
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				if (onError) {
					onError(jqXHR, textStatus, errorThrown);
				}
			}
		});
	},
	showPage: function (page) {
		GS4uApp.showSummary();
		GS4uApp.showListHead();
		GS4uApp.showPagination();
		jQuery(GS4uApp.server_list_selector).empty();
		let _servers = GS4uApp.pageContent[page];
		for (let i = 0; i < _servers.length; i++) {
			GS4uApp.addServer(_servers[i]);
		}
	},
	addServer: function (server) {
		let _s = jQuery('<div>')
			.addClass('row');
		_s.append(
			GS4uApp.getServerStatusElement(server.status)
		);
		if (GS4uApp.show_game) {
			_s.append(
				GS4uApp.getServerGameElement(server.game, server.gamealias)
			);
		}
		_s.append(
			GS4uApp.getServerNameElement(server.id, server.name)
		);
		_s.append(
			GS4uApp.getServerAddressElement(server.ip, server.port)
		);
		_s.append(
			GS4uApp.getServerPlayersElement(server.players, server.players_max)
		);
		_s.append(
			GS4uApp.getServerMapElement(server.map)
		);
		jQuery(GS4uApp.server_list_selector).append(
			_s
		);
	},
	getServerStatusElement: function (status) {
		let _st = 'offline';
		if (status > 0) {
			_st = 'online';
		}
		return jQuery('<div>')
			.addClass('status')
			.append(
				jQuery('<span>')
					.addClass('sysicon serverstatus ' + _st)
			);
	},
	getServerGameElement: function (game, gamealias) {
		let gamealias_class = gamealias;
		if (!isNaN(gamealias_class.charAt(0))) {
			gamealias_class = '_' + gamealias_class;
		}
		let _icon = jQuery('<span>')
			.addClass('gameicon16 ' + gamealias_class)
			.attr('game_alias', gamealias)
			.prop('title', game);
		if (GS4uApp.game_alias == 'all') {
			_icon.on('touch click', function () {
				GS4uApp.setFilter(
					{
						'game_alias':
							{
								'value': jQuery(this).attr('game_alias'),
								'name': jQuery(this).prop('title')
							}
					}
				);
			});
			_icon.css({'cursor': 'pointer'});
		}
		return jQuery('<div>')
			.addClass('game')
			.append(
				_icon
			);
	},
	setFilter: function (filters) {
		if (filters) {
			if (filters.game_alias) {
				GS4uApp.game_alias = filters.game_alias.value;
				GS4uApp.changePage(1);
			}
			let _f = jQuery(GS4uApp.filter_selector);
			_f.empty();
			if (filters.game_alias.value != 'all') {
				_f.append(
					jQuery('<span>')
						.addClass('game_alias')
						.append(
							jQuery('<span>')
								.addClass('value')
								.text(filters.game_alias.name)
						)
						.append(
							jQuery('<span>')
								.addClass('remove')
						)
						.on('touch click', function () {
							GS4uApp.removeGameFilter();
						})
				);
			}
		}
	},
	removeGameFilter: function() {
		GS4uApp.game_alias = 'all';
		GS4uApp.changePage(1);
		let _f = jQuery(GS4uApp.filter_selector);
		_f.empty();
	},
	getServerNameElement: function (server_id, server_name) {
		return jQuery('<div>')
			.addClass('name')
			.append(
				jQuery('<a>')
					.prop('href', GS4uApp.api_url + GS4uApp.language + '/s/' + server_id + '.html')
					.prop('target', '_blank')
					.text(server_name)
			);
	},
	getServerAddressElement: function (ip, port) {
		return jQuery('<div>')
			.addClass('ipport')
			.append(
				jQuery('<span>')
					.text(ip, port)
			);
	},
	getServerPlayersElement: function (players, players_max) {
		return jQuery('<div>')
			.addClass('players')
			.text(players + ' / ' + players_max);
	},
	getServerMapElement: function (map) {
		return jQuery('<div>')
			.addClass('map')
			.text(map);
	},
	showPagination: function () {
		let _c = 5;
		let _start = GS4uApp.summary.page - _c;
		if (_start < 1) {
			_start = 1;
		}
		let _end = GS4uApp.summary.page + _c;
		if (_end > GS4uApp.summary.pagesTotal) {
			_end = GS4uApp.summary.pagesTotal;
		}
		jQuery(GS4uApp.pagination_selector).empty();
		for (let i = _start; i <= _end; i++) {
			let _p = jQuery('<span>')
				.addClass('page')
				.attr('page', i)
				.text(i);
			if (i != GS4uApp.summary.page) {
				_p.on('touch click', function () {
					GS4uApp.changePage(jQuery(this).attr('page'));
				});
			} else {
				_p.addClass('current');
			}
			jQuery(GS4uApp.pagination_selector).append(
				_p
			);
		}
	},
	showSummary: function () {
		let _s = jQuery(GS4uApp.summary_selector);
		_s.text('Серверов: ' + GS4uApp.summary.total +
			'. Страница ' + GS4uApp.summary.page + ' из ' + GS4uApp.summary.pagesTotal + '.');
		//
	},
	showListHead: function () {
		jQuery(GS4uApp.server_list_head_selector).empty();
		let _s = jQuery('<div>').addClass('row');
		_s.append(
			jQuery('<div>').addClass('status')
		);
		_s.append(
			jQuery('<div>').addClass('game')
		);
		_s.append(
			jQuery('<div>').addClass('name').text('Название')
		);
		_s.append(
			jQuery('<div>').addClass('ipport').text('IP:Порт')
		);
		if (GS4uApp.show_game) {
			_s.append(
				jQuery('<div>').addClass('players').text('Игроки')
			);
		}
		_s.append(
			jQuery('<div>').addClass('map').text('Карта')
		);
		jQuery(GS4uApp.server_list_head_selector).append(
			_s
		);
	}
};
