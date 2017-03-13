var ui = (function() {
	// cache DOM
	var downloadSuccess = $('#download-success');
	var mainTable = $('#main-table');
	var btnToggleCompactView = $('.toggle-compact-view'),
		btnScrollDown = $('.scroll-down');

	btnToggleCompactView.on('click', toggleCompactView);

	btnScrollDown.on('click', scrollDown);

	function scrollDown() {
		$("html, body").animate({ scrollTop: $(document).height()-$(window).height() });
	}

	function enableCompactView() {
		mainTable.addClass('compact-view');
	}

	function toggleCompactView() {
		mainTable.toggleClass('compact-view');
		localStorageHelper.setCompactEnabled(mainTable.hasClass('compact-view'));
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
							"<a href=\"" + episode.external_urls.spotify + "\">Spotify<span class=\"link-url\"> (" + episode.external_urls.spotify + ")</span></a><br>"+
							"<a href=\"https://www.amazon.de/s/?field-keywords=" + encodeURIComponent(episode.name) + "\" target=\"_blank\">Amazon<span class=\"link-url\"> (https://www.amazon.de/s/?field-keywords=" + encodeURIComponent(episode.name) + ")</span></a>" + 
						"</td>" + 
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

		var minRes = 150, imageIndex = 0;
		// determine image index to reduce data volume
		for (var i = episode.images.length - 1; i >= 0; i--) {
			if (episode.images[i].height >= minRes && episode.images[i].width >= minRes) {
				imageIndex = i;
				break;
			}
		}

		if (episode.images.length > 0) {
			imgHTML = "<img class=\"episode-icon\" src=\"" + episode.images[imageIndex].url + "\" />";
		}
		return imgHTML;
	}

	return {
		showData: show,
		enableCompactView: enableCompactView
	}
})();