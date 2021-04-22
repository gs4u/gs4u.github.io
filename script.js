function addPropertyToServer(server_html_element, property_title, property_value, css_class) {
	let server_property_html_element = document.createElement('div');
	if(css_class) {
		server_property_html_element.className = css_class;
	}

	let server_property_title_html_element = document.createElement('span');
	server_property_title_html_element.textContent = property_title;
	server_property_title_html_element.className = 'title';

	let server_property_value_html_element = document.createElement('span');
	server_property_value_html_element.textContent = property_value;
	server_property_value_html_element.className = 'value';

	server_property_html_element.append(server_property_title_html_element);
	server_property_html_element.append(server_property_value_html_element);

	server_html_element.append(server_property_html_element);
}

function addServerToList(server) {
	let server_html_element = document.createElement('div');
	server_html_element.className = 'server';
	addPropertyToServer(
		server_html_element,
		'Servername: ',
		server.name,
		'server-name'
	);
	addPropertyToServer(
		server_html_element,
		'Address: ',
		server.ip + ':' + server.port,
		'server-address'
	);
	addPropertyToServer(
		server_html_element,
		'Game: ',
		server.game,
		'server-game'
	);
	addPropertyToServer(
		server_html_element,
		'Status: ',
		server.status == 1 ? 'Online' : 'Offline',
		'server-status'
	);
	addPropertyToServer(
		server_html_element,
		'Password: ',
		server.password == 1 ? 'Yes' : 'No',
		'server-password'
	);
	addPropertyToServer(
		server_html_element,
		'Players: ', server.players + ' / ' + server.players_max +
			' (Peak: ' + server.max_online_players + ')',
		'server-players-count'
	);
	addPropertyToServer(
		server_html_element,
		'Map: ',
		server.map,
		'server-map'
	);
	addPropertyToServer(
		server_html_element,
		'Country: ',
		server.country,
		'server-country'
	);

	let servers_html_element = document.getElementById('servers');
	servers_html_element.append(
		server_html_element
	);
}
