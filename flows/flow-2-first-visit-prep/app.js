/* Flow 2 · First Visit Prep. Vanilla JS, no dependencies.
   State the guide keeps lives in sessionStorage under "flow-2-first-visit-prep" (the email, the entry screen, clears it). */
(function () {
  "use strict";

  var KEY = "flow-2-first-visit-prep";
  var page = document.body.getAttribute("data-page");

  /* ---------- Storage (fails quietly in private mode) ---------- */
  function load() {
    try { return JSON.parse(sessionStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  function save(state) {
    try { sessionStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }
  function clear() {
    try { sessionStorage.removeItem(KEY); } catch (e) { /* ignore */ }
  }

  /* ---------- Toasts ---------- */
  var region = document.querySelector(".toast-region");
  function toast(message) {
    if (!region) return;
    var el = document.createElement("div");
    el.className = "toast";
    el.textContent = message;
    region.appendChild(el);
    setTimeout(function () {
      el.classList.add("is-leaving");
      setTimeout(function () { el.remove(); }, 200);
    }, 2800);
  }
  // Anything with data-toast explains itself instead of navigating.
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-toast]");
    if (!t) return;
    e.preventDefault();
    toast(t.getAttribute("data-toast"));
  });

  if (page === "email") clear();
  if (page === "guide") initGuide();

  function initGuide() {
    /* Data as on the canvas artboard (FVP-Guide renderVals) */
    var BRING = [
      { id: "b1", done: true, label: "Previous vet or shelter records", note: "Upload them in the portal or bring a copy" },
      { id: "b2", done: true, label: "Vaccination history", note: "Including the date of the last rabies shot" },
      { id: "b3", done: false, label: "Leash, harness or carrier", note: "Keeps Waffles safe in the waiting room" },
      { id: "b4", done: false, label: "Current food and medications", note: "Names and amounts, or a photo of the labels" },
      { id: "b5", done: false, label: "Favourite treats or toy", note: "Helps make the visit a good experience" },
      { id: "b6", done: false, label: "Your questions", note: "Jot them down so nothing gets missed" }
    ];
    var TEAM = [
      { initials: "PS", name: "Dr. Priya Shah", role: "Veterinarian · Waffles’ primary vet" },
      { initials: "VT", name: "[VET TECH NAME]", role: "Veterinary technician" },
      { initials: "CC", name: "[CLIENT CARE NAME]", role: "Client care · check-in and billing" }
    ];

    var state = load();
    if (!state.bring) {
      state.bring = {};
      BRING.forEach(function (b) { state.bring[b.id] = b.done; });
    }
    if (!state.temper) state.temper = "anxious";
    if (!state.open) state.open = ["anxious"];
    if (typeof state.notes !== "string") state.notes = "";

    /* What to bring: checklist + progress */
    var list = document.getElementById("bring-list");
    BRING.forEach(function (b) {
      var row = document.createElement("div");
      row.className = "check-field";
      row.innerHTML =
        '<input type="checkbox" class="checkbox" id="' + b.id + '" aria-describedby="' + b.id + '-note">' +
        '<span class="check-text"><label class="check-label" for="' + b.id + '"></label>' +
        '<span class="check-note" id="' + b.id + '-note"></span></span>';
      row.querySelector("label").textContent = b.label;
      row.querySelector(".check-note").textContent = b.note;
      var box = row.querySelector("input");
      box.checked = !!state.bring[b.id];
      box.addEventListener("change", function () {
        state.bring[b.id] = box.checked;
        save(state);
        renderProgress();
      });
      list.appendChild(row);
    });

    function renderProgress() {
      var done = BRING.filter(function (b) { return state.bring[b.id]; }).length;
      var pct = Math.round((done / BRING.length) * 100);
      document.getElementById("progress-count").textContent = done + " of " + BRING.length + " done";
      document.getElementById("progress-indicator").style.width = pct + "%";
      document.querySelector('[role="progressbar"]').setAttribute("aria-valuenow", String(pct));
    }
    renderProgress();

    /* Pet prep: temperament (single choice). Picking Anxious or Reactive opens its tips. */
    var toggles = Array.prototype.slice.call(document.querySelectorAll("[data-temper]"));
    function renderTemper() {
      toggles.forEach(function (t) {
        var on = t.getAttribute("data-temper") === state.temper;
        t.setAttribute("aria-checked", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
      });
    }
    function pick(value, focus) {
      state.temper = value;
      if ((value === "anxious" || value === "reactive") && state.open.indexOf(value) === -1) {
        state.open.push(value);
        renderAccordion();
      }
      save(state);
      renderTemper();
      if (focus) document.querySelector('[data-temper="' + value + '"]').focus();
    }
    toggles.forEach(function (t, i) {
      t.addEventListener("click", function () { pick(t.getAttribute("data-temper")); });
      t.addEventListener("keydown", function (e) {
        var d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
        if (!d) return;
        e.preventDefault();
        pick(toggles[(i + d + toggles.length) % toggles.length].getAttribute("data-temper"), true);
      });
    });
    renderTemper();

    /* Accordion (several can be open) */
    var items = Array.prototype.slice.call(document.querySelectorAll(".accordion-item"));
    function renderAccordion() {
      items.forEach(function (it) {
        var open = state.open.indexOf(it.getAttribute("data-item")) !== -1;
        it.querySelector(".accordion-trigger").setAttribute("aria-expanded", open ? "true" : "false");
        it.querySelector(".accordion-content").hidden = !open;
      });
    }
    items.forEach(function (it) {
      it.querySelector(".accordion-trigger").addEventListener("click", function () {
        var v = it.getAttribute("data-item");
        var i = state.open.indexOf(v);
        if (i === -1) state.open.push(v); else state.open.splice(i, 1);
        save(state);
        renderAccordion();
      });
    });
    renderAccordion();

    /* Notes for the care team */
    var notes = document.getElementById("notes");
    notes.value = state.notes;
    notes.addEventListener("input", function () { state.notes = notes.value; save(state); });

    /* Care team */
    var team = document.getElementById("team-list");
    TEAM.forEach(function (t) {
      var li = document.createElement("li");
      li.className = "item";
      li.innerHTML = '<span class="avatar" aria-hidden="true"></span><span class="item-text"><span class="item-title"></span><span class="item-description"></span></span>';
      li.querySelector(".avatar").textContent = t.initials;
      li.querySelector(".item-title").textContent = t.name;
      li.querySelector(".item-description").textContent = t.role;
      team.appendChild(li);
    });

    /* Map zoom (illustrated map, so zoom just scales it) */
    var zoom = 1;
    var canvas = document.getElementById("map-canvas");
    document.querySelectorAll("[data-zoom]").forEach(function (b) {
      b.addEventListener("click", function () {
        zoom = b.getAttribute("data-zoom") === "in" ? Math.min(zoom + 0.25, 2) : Math.max(zoom - 0.25, 1);
        canvas.style.transform = "scale(" + zoom + ")";
      });
    });
  }
})();
