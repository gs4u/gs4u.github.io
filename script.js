function addPropertyToServer(server_html_element, property_title, property_value, html, css_class) {
	let server_property_html_element = document.createElement('div');
	if(css_class) {
		server_property_html_element.className = css_class;
	}

	if(html) {
		server_property_html_element.innerHTML = html;
	} else {
		let server_property_title_html_element = document.createElement('span');
		server_property_title_html_element.textContent = property_title;
		server_property_title_html_element.className = 'title';

		let server_property_value_html_element = document.createElement('span');
		server_property_value_html_element.textContent = property_value;
		server_property_value_html_element.className = 'value';

		server_property_html_element.append(server_property_title_html_element);
		server_property_html_element.append(server_property_value_html_element);
	}

	server_html_element.append(server_property_html_element);
}

function addServerToList(server) {
	let server_html_element = document.createElement('div');
	server_html_element.className = 'server';
	addPropertyToServer(
		server_html_element,
		'Servername: ',
		server.name,
		null,
		'server-name'
	);
	addPropertyToServer(
		server_html_element,
		'Address: ',
		server.ip + ':' + server.port,
		null,
		'server-address'
	);
	addPropertyToServer(
		server_html_element,
		null,
		null,
		'' +
		'<picture><source srcset="https://www.gs4u.net/ru/map/' + server.gamealias + '/' + server.map + '.png 1x,' +
			' https://www.gs4u.net/ru/mapx2/' + server.gamealias + '/' + server.map + '.png 2x">' +
			'<img alt="' + server.map +
			'" src="https://www.gs4u.net/en/map/' + server.gamealias + '/' + server.map + '.png"></picture>',
		'server-map-image'
	);
	addPropertyToServer(
		server_html_element,
		'Game: ',
		server.game,
		null,
		'server-game'
	);
	addPropertyToServer(
		server_html_element,
		'Status: ',
		server.status == 1 ? 'Online' : 'Offline',
		null,
		'server-status'
	);
	addPropertyToServer(
		server_html_element,
		'Password: ',
		server.password == 1 ? 'Yes' : 'No',
		null,
		'server-password'
	);
	addPropertyToServer(
		server_html_element,
		'Players: ', server.players + ' / ' + server.players_max +
			' (Peak: ' + server.max_online_players + ')',
		null,
		'server-players-count'
	);
	addPropertyToServer(
		server_html_element,
		'Map: ',
		server.map,
		null,
		'server-map'
	);
	addPropertyToServer(
		server_html_element,
		'Country: ',
		server.country,
		null,
		'server-country'
	);

	let servers_html_element = document.getElementById('servers');
	servers_html_element.append(
		server_html_element
	);
}
