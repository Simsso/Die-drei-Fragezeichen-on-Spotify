var main = (function() {
	NProgress.start();

	if (localStorageHelper.getCompactEnabled()) {
		ui.enableCompactView();
	}

	api.fetchData(function(err, data) {
		$('.loading-msg').addClass('hidden');

		if (err) {
			$('.error-msg, .error-msg-details').removeClass('hidden');
			$('.error-msg-details').html(err);
		}
		else {
			ui.showData(data);
		}

		NProgress.done();
	});
})();