/* =========================================================
   ROYAL FEAST — gallery.js
   Category filtering + lightbox for the Gallery page.
   ========================================================= */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var grid = document.querySelector("[data-gallery-grid]");
    if (!grid) return;

    var filterBtns = document.querySelectorAll("[data-gallery-filter]");
    var items = grid.querySelectorAll(".gallery-item");
    var lightbox = document.querySelector(".lightbox");
    var lightboxImg = lightbox ? lightbox.querySelector("img") : null;
    var visibleItems = Array.prototype.slice.call(items);
    var currentIndex = 0;

    /* ---- Filtering ---- */
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var cat = btn.getAttribute("data-gallery-filter");
        filterBtns.forEach(function (b) { b.classList.toggle("is-active", b === btn); });
        items.forEach(function (item) {
          var match = cat === "all" || item.getAttribute("data-category") === cat;
          item.hidden = !match;
        });
        visibleItems = Array.prototype.slice.call(items).filter(function (i) { return !i.hidden; });
      });
    });

    /* ---- Lightbox ---- */
    function openLightbox(index) {
      if (!lightbox || !lightboxImg) return;
      currentIndex = index;
      var img = visibleItems[currentIndex].querySelector("img");
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }
    function closeLightbox() {
      if (!lightbox) return;
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
    }
    function showRelative(delta) {
      if (!visibleItems.length) return;
      currentIndex = (currentIndex + delta + visibleItems.length) % visibleItems.length;
      openLightbox(currentIndex);
    }

    items.forEach(function (item, idx) {
      item.addEventListener("click", function () {
        var indexInVisible = visibleItems.indexOf(item);
        openLightbox(indexInVisible === -1 ? 0 : indexInVisible);
      });
    });

    if (lightbox) {
      lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
      lightbox.querySelector(".lightbox-nav.prev").addEventListener("click", function () { showRelative(-1); });
      lightbox.querySelector(".lightbox-nav.next").addEventListener("click", function () { showRelative(1); });
      lightbox.addEventListener("click", function (e) { if (e.target === lightbox) closeLightbox(); });
      document.addEventListener("keydown", function (e) {
        if (!lightbox.classList.contains("is-open")) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") showRelative(-1);
        if (e.key === "ArrowRight") showRelative(1);
      });
    }
  });
})();
