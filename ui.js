var ui = (function() {
	// cache DOM
	var downloadSuccess = $('#download-success');
	var mainTable = $('#main-table');
	var btnToggleCompactView = $('.toggle-compact-view');

	btnToggleCompactView.on('click', toggleCompactView);

	function toggleCompactView() {
		mainTable.toggleClass('compact-view');
	}

	function show(data) {
		downloadSuccess.removeClass('hidden');
		sort(data);
		console.log(data);
		var html = '';
		for (var i = 0; i < data.length; i++) {
			var episode = data[i];
			html += "<tr>" +
						"<td>" + getEpisodeImageHTML(episode) + "</td>" + 
						"<td><h4>" + episode.name + "</h4>" + 
							"<a href=\"" + episode.external_urls.spotify + "\" target=\"_blank\">" + episode.external_urls.spotify + "</a></td>" + 
					"</tr>";
		}
		mainTable.html(html);
	}

	function removeSpecialEpisodes(data) {
		return data;
	}

	function sort(data) {
		data.sort(function(a, b) {
			var aNr = getEpisodeNumber(a), bNr = getEpisodeNumber(b);
			if (aNr < bNr || bNr === undefined) return -1;
			else return 1;
		});
	}

	function getEpisodeNumber(episode) {
		var parts = episode.name.split('/');
		if (parts.length !== 2) {
			return;
		}
		try {
			return parseInt(parts[0]);
		} catch (e) {
			return;
		}
	}

	function getEpisodeImageHTML(episode) {
		var imgHTML = "";
		if (episode.images.length > 0) {
			imgHTML = "<img class=\"episode-icon\" src=\"" + episode.images[0].url + "\" />";
		}
		return imgHTML;
	}

	return {
		showData: show
	}
})();