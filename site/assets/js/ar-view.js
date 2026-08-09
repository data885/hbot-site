(function () {
  "use strict";

  var MODEL_NAMES = {
    "solo-lounge": "Apex Solo Lounge",
    "solo": "Apex Solo",
    "duo": "Apex Duo",
    "quad-cube": "Apex Quad-Cube",
    "nexus": "Apex Nexus"
  };

  function getParam(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  function isMobileDevice() {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var modelId = getParam("model");
    if (!modelId || !MODEL_NAMES[modelId]) modelId = "solo-lounge";

    var viewer = document.getElementById("ar-model");
    viewer.setAttribute("src", "/assets/ar/" + modelId + ".glb");
    viewer.setAttribute("ios-src", "/assets/ar/" + modelId + ".usdz");

    var nameEl = document.getElementById("ar-model-name");
    if (nameEl) nameEl.textContent = MODEL_NAMES[modelId];

    if (!isMobileDevice()) {
      var note = document.getElementById("ar-fallback-note");
      if (note) note.style.display = "block";
    }

    var lang = (localStorage.getItem("hbot_lang") || document.documentElement.lang || "tr");
    var dict = window.TRANSLATIONS && window.TRANSLATIONS[lang];
    if (dict) {
      document.documentElement.lang = lang;
      document.documentElement.dir = dict.dir || "ltr";
      document.querySelectorAll("[data-i18n]").forEach(function (elm) {
        var key = elm.getAttribute("data-i18n");
        var value = key.split(".").reduce(function (o, k) { return o && o[k] !== undefined ? o[k] : undefined; }, dict);
        if (value !== undefined) elm.textContent = value;
      });
    }
  });
})();
