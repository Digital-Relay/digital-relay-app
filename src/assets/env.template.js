(function (window) {
  window.env = window.env || {};

  // Environment variables
  window["env"]["apiUrl"] = "${API_URL}";
  window["env"]["debug"] = ${DEBUG};
  window["env"]["raceDate"] = "${RACE_DATE}";
  window["env"]["pushPublicKey"] = "${PUSH_PUBLIC_KEY}";
  window["env"]["dryRun"] = ("true" === "$DRY_RUN")
})(this);
