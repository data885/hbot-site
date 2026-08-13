(function () {
  "use strict";

  var MODEL_NAMES = {
    "solo-lounge": "Oslo",
    "solo": "Dubai",
    "duo": "Tokyo",
    "quad-cube": "Milan",
    "nexus": "Geneva"
  };

  function getParam(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  function isMobileDevice() {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }

  /* glTF baseColorFactor beklenen renk uzayi linear'dir, hex kodlar sRGB'dir —
     donusum yapilmazsa renkler solgun/yanlis gorunur. */
  function srgbToLinear(c) {
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  }

  function hexToLinearRgba(hex) {
    if (!hex) return null;
    var m = /^#?([0-9a-f]{6})$/i.exec(hex);
    if (!m) return null;
    var n = parseInt(m[1], 16);
    var r = ((n >> 16) & 255) / 255;
    var g = ((n >> 8) & 255) / 255;
    var b = (n & 255) / 255;
    return [srgbToLinear(r), srgbToLinear(g), srgbToLinear(b), 1];
  }

  /* Konfiguratorde secilen dis renk AR onizlemesine de yansisin — model-viewer'in
     canli materyal API'si uzerinden hacmin rengini musterinin secimiyle esler. */
  function applySelectedColor(viewer, hex) {
    var rgba = hexToLinearRgba(hex);
    if (!rgba) return;
    var apply = function () {
      try {
        var material = viewer.model && viewer.model.materials && viewer.model.materials[0];
        if (material) material.pbrMetallicRoughness.setBaseColorFactor(rgba);
      } catch (e) { /* sessiz fallback: renk uygulanamazsa varsayilan gorunur */ }
    };
    if (viewer.loaded) apply();
    viewer.addEventListener("load", apply);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var modelId = getParam("model");
    if (!modelId || !MODEL_NAMES[modelId]) modelId = "solo-lounge";
    var colorId = getParam("color");

    var lang = (localStorage.getItem("hbot_lang") || document.documentElement.lang || "tr");
    var dict = (typeof TRANSLATIONS !== "undefined") && TRANSLATIONS[lang];

    var viewer = document.getElementById("ar-model");
    viewer.setAttribute("src", "/assets/ar/" + modelId + ".glb");
    viewer.setAttribute("ios-src", "/assets/ar/" + modelId + ".usdz");
    if (colorId && dict) {
      var colorInfo = (dict.configurator.colors || []).find(function (c) { return c.id === colorId; });
      if (colorInfo) applySelectedColor(viewer, colorInfo.hex);
    }

    var nameEl = document.getElementById("ar-model-name");
    if (nameEl) nameEl.textContent = MODEL_NAMES[modelId];

    var dimEl = document.getElementById("ar-view-dimensions");
    if (dimEl && dict && dict.arView && dict.arView.dimensionsLabel) {
      fetch("/assets/ar/manifest.json")
        .then(function (r) { return r.json(); })
        .then(function (manifest) {
          var d = manifest[modelId];
          if (!d) return;
          dimEl.innerHTML = dict.arView.dimensionsLabel + ": <strong>" + d.length_m + " m × " + d.diameter_m + " m</strong>";
          dimEl.hidden = false;
        })
        .catch(function () { /* sessiz fallback: boyut satiri gosterilmez */ });
    }

    if (!isMobileDevice()) {
      var note = document.getElementById("ar-fallback-note");
      if (note) note.style.display = "block";
    }

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
