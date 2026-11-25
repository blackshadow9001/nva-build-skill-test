/* Lucide icons (ISC licence), inlined so the pages need no build step or CDN.
   Usage in HTML: <i data-icon="map-pin" data-size="16"></i> (replaced with an <svg> on load). */
(function () {
  var P = {
    "chevron-left": '<path d="m15 18-6-6 6-6" />',
    "archive": '<rect width="20" height="5" x="2" y="3" rx="1" /><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" /><path d="M10 12h4" />',
    "ellipsis": '<circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />',
    "calendar-days": '<path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" /><path d="M16 18h.01" />',
    "stethoscope": '<path d="M11 2v2" /><path d="M5 2v2" /><path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1" /><path d="M8 15a6 6 0 0 0 12 0v-3" /><circle cx="20" cy="10" r="2" />',
    "arrow-right": '<path d="M5 12h14" /><path d="m12 5 7 7-7 7" />',
    "hospital": '<path d="M12 6v4" /><path d="M14 14h-4" /><path d="M14 18h-4" /><path d="M14 8h-4" /><path d="M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2" /><path d="M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18" />',
    "plus": '<path d="M5 12h14" /><path d="M12 5v14" />',
    "minus": '<path d="M5 12h14" />',
    "external-link": '<path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />',
    "map-pin": '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" />',
    "clock": '<circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />',
    "phone": '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />',
    "navigation": '<polygon points="3 11 22 2 13 21 11 13 3 11" />',
    "square-parking": '<rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 17V7h4a3 3 0 0 1 0 6H9" />',
    "message-circle": '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />',
    "chevron-down": '<path d="m6 9 6 6 6-6" />'
  };
  document.querySelectorAll("i[data-icon]").forEach(function (el) {
    var name = el.getAttribute("data-icon");
    if (!P[name]) return;
    var size = el.getAttribute("data-size") || "16";
    var svg = '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size +
      '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + P[name] + "</svg>";
    el.insertAdjacentHTML("afterend", svg);
    el.remove();
  });
})();
