function addPropertyToServer(server_html_element, property_title, property_value) {
	let server_property_html_element = document.createElement('div');

	let server_property_title_html_element = document.createElement('span');
	server_property_title_html_element.textContent = property_title;

	let server_property_value_html_element = document.createElement('span');
	server_property_value_html_element.textContent = property_value;

	server_property_html_element.append(server_property_title_html_element);
	server_property_html_element.append(server_property_value_html_element);

	server_html_element.append(server_property_html_element);
}

function addServerToList(server) {
	let server_html_element = document.createElement('div');
	addPropertyToServer(server_html_element, 'Servername: ', server.name);
	addPropertyToServer(server_html_element, 'Address: ', server.ip + ':' + server.port);
	addPropertyToServer(server_html_element, 'Game: ', server.game);
	addPropertyToServer(server_html_element, 'Status: ', server.status == 1 ? 'Online' : 'Offline');
	addPropertyToServer(server_html_element, 'Password: ', server.password == 1 ? 'Yes' : 'No');
	addPropertyToServer(
		server_html_element,
		'Players: ', server.players + ' / ' + server.players_max + ' (Peak: ' + server.max_online_players + ')'
	);
	addPropertyToServer(server_html_element, 'Map: ', server.map);
	addPropertyToServer(server_html_element, 'Country: ', server.country);

	let servers_html_element = document.getElementById('servers');
	servers_html_element.append(
		server_html_element
	);
	servers_html_element.append(
		document.createElement('hr')
	);
}
