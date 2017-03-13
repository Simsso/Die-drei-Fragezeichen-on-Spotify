var localStorageHelper = (function() {
	const COMPACT_ENABLED_KEY = "COMPACT_ENABLED";

	function available() {
		return (typeof(Storage) !== "undefined");
	}

	function getCompactEnabled() {
		if (!available()) {
			return false;
		}

		return !!localStorage.getItem(COMPACT_ENABLED_KEY);
	}

	function setCompactEnabled(enabled) {
		if (!available()) {
			return;
		}


		localStorage.setItem(COMPACT_ENABLED_KEY, enabled ? "true" : "");
	}

	return {
		available: available,
		getCompactEnabled: getCompactEnabled,
		setCompactEnabled: setCompactEnabled
	};
})();