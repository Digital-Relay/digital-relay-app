(function (window) {
  window["env"] = window["env"] || {};

  // Environment variables
  window["env"]["apiUrl"] = "http://dxcrun-dev-api.azurewebsites.net/api";
  window["env"]["debug"] = true;
  window["env"]["raceDate"] = Date.parse("2020-06-20")
  window["env"]["pushPublicKey"] = ''
  window["env"]["dryRun"] = false
})(this);
