var api = (function() {
	var spotifyDataUrl = 'https://api.spotify.com/v1/artists/3meJIgRw7YleJrmbpbJK6S/albums';

	var downloaded = []; // spotify API serves only limited number of entries at once

	function fetchData(callback) {
		request(callback, 0);
	}

	function request(callback, offset) {
		var jqxhr = jQuery.getJSON(spotifyDataUrl + '?offset=' + offset).done(function(data) {
			downloaded = downloaded.concat(data.items);
			NProgress.set(downloaded.length / data.total);
			if (downloaded.length >= data.total || data.offset + data.limit > data.total) {
				callback(null, downloaded);
			}
			else {
				request(callback, data.offset + data.limit);
			}
		}).fail(function(err) {
			callback(err);
		});
	}

	return {
		fetchData: fetchData
	};
})();