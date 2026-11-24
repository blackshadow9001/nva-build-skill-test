/* NVA · Flow 1e · Photo-first intake — vanilla JS, no dependencies.
   Each page sets <body data-page="..."> and this file runs that page's setup.
   Answers are kept in sessionStorage so later screens reflect earlier choices. */
(function () {
  "use strict";

  /* ---------- Shared state ---------- */
  var KEY = "nva-flow-1e";
  var DEFAULTS = {
    photo: 0,
    name: "Waffles",
    species: "Dog",
    breed: "Golden Retriever",
    age: "10 weeks",
    weight: "14 lb",
    place: "Fremont, Seattle",
    collar: "#d7f36a",
    easy: ["Close to home", "Evening and weekend times", "Book online"],
    calendar: true,
    cost: "A predictable monthly plan",
    help: ["Puppy shots", "Finding a vet"],
    note: "",
    confirmed: false
  };
  function load() {
    try {
      var saved = JSON.parse(sessionStorage.getItem(KEY) || "{}");
      return Object.assign({}, DEFAULTS, saved);
    } catch (e) { return Object.assign({}, DEFAULTS); }
  }
  var state = load();
  function save(patch) {
    Object.assign(state, patch);
    try { sessionStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* storage off: keep in memory */ }
  }
  function reset() {
    try { sessionStorage.removeItem(KEY); } catch (e) {}
    state = Object.assign({}, DEFAULTS);
  }

  /* ---------- Helpers ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function icon(name, size) { return window.Icons.svg(name, size); }

  var toastBox;
  function toast(msg) {
    if (!toastBox) {
      toastBox = document.createElement("div");
      toastBox.className = "toasts";
      toastBox.setAttribute("aria-live", "polite");
      document.body.appendChild(toastBox);
    }
    var t = document.createElement("div");
    t.className = "toast";
    t.textContent = msg;
    toastBox.appendChild(t);
    setTimeout(function () { t.classList.add("leaving"); setTimeout(function () { t.remove(); }, 200); }, 2800);
  }
  window.NVA = { toast: toast, state: function () { return state; }, reset: reset };

  // Anything with data-toast shows a message instead of navigating.
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-toast]");
    if (!t) return;
    e.preventDefault();
    toast(t.getAttribute("data-toast"));
  });

  /* ---------- Shared visuals ---------- */
  // NVA shield wordmark: <span data-mark="16"></span>
  function mark(w) {
    var h = Math.round(w * 30 / 26);
    return '<svg aria-hidden="true" width="' + w + '" height="' + h + '" viewBox="0 0 26 30" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linejoin="round" stroke-linecap="round" style="flex-shrink:0"><path d="M2 2h22v13c0 6.5-4.8 10.8-11 13C6.8 25.8 2 21.5 2 15V2z"/><path d="M6.5 16.5L13 5.5l6.5 11"/><path d="M6.5 16.5v3M19.5 16.5v3"/></svg>';
  }

  // Contour lines behind the hero: <svg class="waves" data-waves></svg>, sized to its hero.
  function drawWaves(svg) {
    var hero = svg.parentElement;
    var h = Math.max(160, hero.offsetHeight || 260);
    var n = Math.min(12, Math.floor((h - 60) / 22));
    var d = "";
    for (var k = 0; k < n; k++) {
      var y = 30 + 16 * k, b = h - 30 - 10 * k;
      d += '<path d="M0 ' + y + " C 120 " + y + ", 140 " + b + ", 195 " + b + " S 270 " + y + ", 390 " + y + '"/>';
    }
    svg.setAttribute("viewBox", "0 0 390 " + h);
    svg.setAttribute("preserveAspectRatio", "none");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", svg.getAttribute("data-stroke") || "rgba(215,243,106,.22)");
    svg.setAttribute("stroke-width", "1.2");
    svg.innerHTML = d;
  }

  // Waffles' illustrated avatar. Each copy gets unique gradient ids.
  var pupId = 0;
  function puppy(size, collar, label) {
    var i = "p" + (++pupId);
    return '<svg class="puppy" ' + (label ? 'role="img" aria-label="' + esc(label) + '"' : 'aria-hidden="true"') +
      ' width="' + size + '" height="' + size + '" viewBox="0 0 160 160"><defs>' +
      '<radialGradient id="hd' + i + '" cx="42%" cy="30%" r="78%"><stop offset="0" stop-color="#f7d7a3"/><stop offset=".5" stop-color="#e3ad69"/><stop offset=".85" stop-color="#b87d3e"/><stop offset="1" stop-color="#94602b"/></radialGradient>' +
      '<linearGradient id="er' + i + '" x1="0" y1="0" x2=".3" y2="1"><stop offset="0" stop-color="#c58b4c"/><stop offset=".6" stop-color="#9c6630"/><stop offset="1" stop-color="#6f4520"/></linearGradient>' +
      '<radialGradient id="mz' + i + '" cx="46%" cy="32%" r="70%"><stop offset="0" stop-color="#fff6e6"/><stop offset=".7" stop-color="#f0d7ad"/><stop offset="1" stop-color="#d9b47f"/></radialGradient>' +
      '<radialGradient id="ns' + i + '" cx="38%" cy="28%" r="75%"><stop offset="0" stop-color="#6b5444"/><stop offset=".45" stop-color="#2b1e15"/><stop offset="1" stop-color="#0e0906"/></radialGradient>' +
      '<radialGradient id="ey' + i + '" cx="38%" cy="32%" r="70%"><stop offset="0" stop-color="#5a3f2a"/><stop offset=".6" stop-color="#1a110b"/><stop offset="1" stop-color="#070403"/></radialGradient>' +
      '<linearGradient id="cl' + i + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".28"/></linearGradient>' +
      '<radialGradient id="rm' + i + '" cx="50%" cy="45%" r="55%"><stop offset=".72" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#5a3412" stop-opacity=".35"/></radialGradient>' +
      '<filter id="sh' + i + '" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="5"/></filter></defs>' +
      '<ellipse cx="80" cy="152" rx="44" ry="7" fill="#0b2a20" opacity=".28" filter="url(#sh' + i + ')"/>' +
      '<g class="pp-earL"><path d="M42 48 C 22 54, 13 92, 27 112 C 39 120, 51 100, 55 70 Z" fill="url(#er' + i + ')"/><path d="M40 60 C 30 70, 27 92, 33 104" stroke="#5e3a1a" stroke-opacity=".35" stroke-width="3" fill="none" stroke-linecap="round"/></g>' +
      '<g class="pp-earR"><path d="M118 48 C 138 54, 147 92, 133 112 C 121 120, 109 100, 105 70 Z" fill="url(#er' + i + ')"/><path d="M120 60 C 130 70, 133 92, 127 104" stroke="#5e3a1a" stroke-opacity=".35" stroke-width="3" fill="none" stroke-linecap="round"/></g>' +
      '<path d="M80 30 C 113 30, 128 54, 126 82 C 124 111, 105 128, 80 128 C 55 128, 36 111, 34 82 C 32 54, 47 30, 80 30 Z" fill="url(#hd' + i + ')"/>' +
      '<path d="M80 30 C 113 30, 128 54, 126 82 C 124 111, 105 128, 80 128 C 55 128, 36 111, 34 82 C 32 54, 47 30, 80 30 Z" fill="url(#rm' + i + ')"/>' +
      '<ellipse cx="66" cy="46" rx="20" ry="9" fill="#fff" opacity=".22" transform="rotate(-14 66 46)"/>' +
      '<ellipse cx="80" cy="100" rx="26" ry="19" fill="url(#mz' + i + ')"/>' +
      '<g class="pp-eyes"><circle cx="61" cy="78" r="6.6" fill="url(#ey' + i + ')"/><circle cx="99" cy="78" r="6.6" fill="url(#ey' + i + ')"/><ellipse cx="63.4" cy="75.4" rx="2.4" ry="2" fill="#fff" opacity=".95"/><ellipse cx="101.4" cy="75.4" rx="2.4" ry="2" fill="#fff" opacity=".95"/><circle cx="58.6" cy="80.6" r=".9" fill="#fff" opacity=".6"/><circle cx="96.6" cy="80.6" r=".9" fill="#fff" opacity=".6"/></g>' +
      '<path d="M70 90 C 70 85, 90 85, 90 90 C 90 96, 84 99, 80 99 C 76 99, 70 96, 70 90 Z" fill="url(#ns' + i + ')"/>' +
      '<ellipse cx="76" cy="88.6" rx="4" ry="1.8" fill="#fff" opacity=".35"/>' +
      '<path d="M80 99 L80 104 M71 105 C 75 109, 80 108, 80 104 C 80 108, 85 109, 89 105" stroke="#3a281b" stroke-width="2" fill="none" stroke-linecap="round" opacity=".8"/>' +
      '<path class="pp-collar" d="M49 119 C 64 131, 96 131, 111 119 L 114 129 C 97 141, 63 141, 46 129 Z" fill="' + (collar || state.collar) + '"/>' +
      '<path d="M49 119 C 64 131, 96 131, 111 119 L 114 129 C 97 141, 63 141, 46 129 Z" fill="url(#cl' + i + ')"/>' +
      '<path d="M73 133 h14 v7 c0 4.5 -3.5 7 -7 8.2 c-3.5 -1.2 -7 -3.7 -7 -8.2 z" fill="#123b2d"/><path d="M73 133 h14 v3 h-14 z" fill="#fff" opacity=".18"/>' +
      '<path d="M76.5 142 L80 136.5 L83.5 142" stroke="#d7f36a" stroke-width="1.3" fill="none" stroke-linecap="round"/></svg>';
  }

  // Summary text built from the answers so far.
  function possessive(n) { return /s$/i.test(n) ? n + "\u2019" : n + "\u2019s"; }
  function shortAge(a) { return a.replace(" weeks", " wks").replace(" week", " wk"); }
  function area(p) { return p.split(",")[0]; }
  function profileLine() {
    var parts = [state.breed, shortAge(state.age), state.weight];
    if (state.place.indexOf(",") > -1) parts.push(area(state.place));
    return parts.join(" · ");
  }
  var EASY_SHORT = { "Close to home": "Close by", "Evening and weekend times": "evenings", "Book online": "online", "Video visits": "video", "Short waits": "short waits" };
  var COST_SHORT = { "A predictable monthly plan": "Monthly plan", "Pay as I go": "Pay as I go", "Use pet insurance": "Insurance", "Not sure yet": "Deciding later" };
  function easySummary() {
    if (!state.easy.length) return "No preferences";
    var s = state.easy.map(function (x) { return EASY_SHORT[x] || x; }).join(" · ");
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  /* ---------- Generic wiring ---------- */
  function hydrate() {
    $$("[data-mark]").forEach(function (el) { el.outerHTML = mark(+el.getAttribute("data-mark") || 16); });
    $$("[data-puppy]").forEach(function (el) {
      el.innerHTML = puppy(+el.getAttribute("data-puppy"), null, el.getAttribute("data-label"));
    });
    $$("[data-bind]").forEach(function (el) {
      var k = el.getAttribute("data-bind");
      var v = k === "possessive" ? possessive(state.name) : k === "profile" ? profileLine() : k === "pet" ? [state.breed, shortAge(state.age), state.weight].join(" · ") : k === "area" ? area(state.place) : k === "easy" ? easySummary() : k === "cost" ? COST_SHORT[state.cost] : state[k];
      el.textContent = v;
    });
    window.Icons.render();
    $$("svg[data-waves]").forEach(drawWaves);
  }

  // Pill groups. data-group="easy" + data-multi for multi-select; values come from button text.
  function pills(container, key, multi, onChange) {
    var btns = $$("button", container);
    function paint() {
      btns.forEach(function (b) {
        var v = b.getAttribute("data-value") || b.textContent.trim();
        var on = multi ? state[key].indexOf(v) > -1 : state[key] === v;
        b.setAttribute(multi ? "aria-pressed" : "aria-checked", String(on));
      });
    }
    btns.forEach(function (b) {
      if (!b.querySelector(".ck")) b.insertAdjacentHTML("afterbegin", '<span class="ck">' + icon("check", 16) + "</span>");
      b.addEventListener("click", function () {
        var v = b.getAttribute("data-value") || b.textContent.trim();
        if (multi) {
          var list = state[key].slice();
          var i = list.indexOf(v);
          if (i > -1) list.splice(i, 1); else list.push(v);
          save(obj(key, list));
        } else {
          save(obj(key, v));
        }
        paint();
        if (onChange) onChange();
      });
    });
    // Arrow keys move between radios in single-choice groups.
    if (!multi) {
      container.addEventListener("keydown", function (e) {
        if (["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].indexOf(e.key) < 0) return;
        var i = btns.indexOf(document.activeElement);
        if (i < 0) return;
        e.preventDefault();
        var next = btns[(i + (e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : btns.length - 1)) % btns.length];
        next.focus(); next.click();
      });
    }
    paint();
  }
  function obj(k, v) { var o = {}; o[k] = v; return o; }

  /* ---------- Pages ---------- */
  var pages = {
    /* IP00 · Homepage */
    home: function () {
      reset(); // Starting over clears earlier answers.
      var img = $("#hero-photo");
      if (img) img.addEventListener("error", function () { img.hidden = true; $("#hero-fallback").hidden = false; });
      if (img && img.complete && !img.naturalWidth) { img.hidden = true; $("#hero-fallback").hidden = false; }
    },

    /* IP01 · Meet your pet */
    meet: function () {
      var grid = $("#photo-grid");
      var tones = ["", "filter:hue-rotate(-8deg) brightness(1.05)", "filter:saturate(.8) brightness(.92)"];
      grid.innerHTML = tones.map(function (tone, i) {
        return '<button type="button" role="radio" class="photo-opt" data-i="' + i + '" aria-label="Photo ' + (i + 1) + ' of your dog">' +
          '<span class="photo" style="' + tone + '"></span><span class="puppy-wrap">' + puppy(84) + "</span>" +
          '<span class="tick">' + icon("check", 14) + "</span></button>";
      }).join("");
      var opts = $$(".photo-opt", grid);
      function paint() { opts.forEach(function (b, i) { b.setAttribute("aria-checked", String(state.photo === i)); b.tabIndex = state.photo === i ? 0 : -1; }); }
      opts.forEach(function (b, i) { b.addEventListener("click", function () { save({ photo: i }); paint(); }); });
      grid.addEventListener("keydown", function (e) {
        var d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
        if (!d) return;
        e.preventDefault();
        var n = (state.photo + d + opts.length) % opts.length;
        save({ photo: n }); paint(); opts[n].focus();
      });
      paint();

      // Take a photo / Library open the device picker; the chosen image previews in the first tile.
      function usePicked(input) {
        input.addEventListener("change", function () {
          var f = input.files && input.files[0];
          if (!f) return;
          var url = URL.createObjectURL(f);
          var tile = opts[0];
          var old = tile.querySelector("img.user-photo");
          if (old) old.remove();
          tile.querySelector(".photo").insertAdjacentHTML("beforeend", '<img class="user-photo" alt="Your photo" src="' + url + '">');
          tile.querySelector(".puppy-wrap").hidden = true;
          tile.setAttribute("aria-label", "Your photo");
          save({ photo: 0 }); paint();
          toast("Photo added. We'll read it next.");
        });
      }
      usePicked($("#file-camera"));
      usePicked($("#file-library"));
      $("#btn-camera").addEventListener("click", function () { $("#file-camera").click(); });
      $("#btn-library").addEventListener("click", function () { $("#file-library").click(); });
    },

    /* IP02 · AI reads the photo */
    reading: function () {
      var cta = $("#cta");
      // The button is hidden until the read-out finishes, like the canvas timing.
      setTimeout(function () { $(".scan-wrap").classList.add("scan-done"); }, 0);
      setTimeout(function () { cta.hidden = false; cta.classList.add("pop"); $("#status-text").textContent = "Photo read"; }, 2900);
    },

    /* IP03 · Confirm or correct */
    confirm: function () {
      var name = $("#pet-name");
      var praise = $("#praise");
      name.value = state.name;
      name.addEventListener("input", function () {
        save({ name: name.value.trim() || "your pet" });
        praise.hidden = !name.value.trim();
      });

      var defs = [
        ["species", "paw-print", "Species", true, ["Dog", "Cat", "Something else"]],
        ["breed", "dna", "Breed", true, ["Golden Retriever", "Labrador Retriever", "Golden mix"]],
        ["age", "cake", "Age", false, ["8 weeks", "10 weeks", "12 weeks", "Enter birthday"]],
        ["weight", "scale", "Weight", false, ["12 lb", "14 lb", "16 lb"]],
        ["place", "map-pin", "Location", true, ["Fremont, Seattle", "Use a different ZIP", "Don't use location"]]
      ];
      var open = "age";
      var list = $("#detail-rows");
      function render() {
        list.innerHTML = defs.map(function (d) {
          var id = d[0], isOpen = open === id;
          return '<div style="border-bottom:1px solid var(--line)">' +
            '<button type="button" class="row" data-row="' + id + '" aria-expanded="' + isOpen + '" aria-controls="opts-' + id + '">' +
            '<span class="tile-icon">' + icon(d[1], 16) + "</span>" +
            '<span class="kv"><span class="kv-k">' + d[2] + '</span><span class="kv-v">' + esc(state[id]) + "</span></span>" +
            '<span class="badge' + (d[3] ? "" : " badge--guess") + '">' + (d[3] ? "Sure" : "Best guess") + "</span>" +
            '<span style="color:var(--muted)">' + icon(isOpen ? "chevron-up" : "pencil", 16) + "</span></button>" +
            (isOpen ? '<div id="opts-' + id + '" role="radiogroup" aria-label="' + d[2] + '" class="pop" style="display:flex;flex-wrap:wrap;gap:8px;padding:0 16px 14px 64px;transform-origin:top left">' +
              d[4].map(function (o) { return '<button type="button" role="radio" class="chip" data-pick="' + id + '" data-value="' + esc(o) + '" aria-checked="' + (state[id] === o) + '">' + esc(o) + "</button>"; }).join("") +
              "</div>" : "") +
            "</div>";
        }).join("");
      }
      list.addEventListener("click", function (e) {
        var row = e.target.closest("[data-row]");
        var pick = e.target.closest("[data-pick]");
        if (row) { var id = row.getAttribute("data-row"); open = open === id ? "" : id; render(); var again = list.querySelector('[data-row="' + id + '"]'); if (again) again.focus(); }
        if (pick) {
          var k = pick.getAttribute("data-pick"), v = pick.getAttribute("data-value");
          if (v === "Enter birthday" || v === "Use a different ZIP") { toast("That input isn't part of this prototype yet."); return; }
          save(obj(k, v)); render();
          var same = list.querySelector('[data-pick="' + k + '"][data-value="' + CSS.escape(v) + '"]'); if (same) same.focus();
        }
      });
      render();
    },

    /* IP04 · Avatar reveal */
    avatar: function () {
      var cols = [["#d7f36a", "Lime"], ["#1f5240", "Forest"], ["#efe6d3", "Sand"], ["#2e3430", "Charcoal"]];
      var box = $("#swatches");
      box.innerHTML = cols.map(function (c) { return '<button type="button" role="radio" class="swatch" aria-label="' + c[1] + '" data-hex="' + c[0] + '" style="background:' + c[0] + '"></button>'; }).join("");
      var sw = $$(".swatch", box);
      function paint() {
        sw.forEach(function (b) { var on = b.getAttribute("data-hex") === state.collar; b.setAttribute("aria-checked", String(on)); b.tabIndex = on ? 0 : -1; });
        $$(".pp-collar").forEach(function (p) { p.setAttribute("fill", state.collar); });
      }
      function pick(i) { save({ collar: cols[i][0] }); paint(); }
      sw.forEach(function (b, i) { b.addEventListener("click", function () { pick(i); }); });
      box.addEventListener("keydown", function (e) {
        var d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
        if (!d) return;
        e.preventDefault();
        var cur = cols.findIndex(function (c) { return c[0] === state.collar; });
        var n = (cur + d + cols.length) % cols.length; pick(n); sw[n].focus();
      });
      $("#another-look").addEventListener("click", function () {
        var cur = cols.findIndex(function (c) { return c[0] === state.collar; });
        pick((cur + 1) % cols.length);
        var av = $("#avatar-pop");
        av.classList.remove("pop"); void av.offsetWidth; av.classList.add("pop");
      });
      paint();
    },

    /* IP05 · What makes care easy */
    easy: function () {
      pills($("#easy-opts"), "easy", true);
      var t = $("#cal-toggle");
      function paint() { t.setAttribute("aria-checked", String(state.calendar)); }
      t.addEventListener("click", function () { save({ calendar: !state.calendar }); paint(); });
      paint();
    },

    /* IP06 · Care costs */
    costs: function () {
      var tips = {
        "A predictable monthly plan": ["About $45 a month", "Puppy Care Plan covers the shot series, checkups and exams. First-year routine care is usually around $1,100 to $1,400."],
        "Pay as I go": ["About $85 per puppy visit", "Waffles needs 3 to 4 visits before 16 weeks. We'll show prices before you book."],
        "Use pet insurance": ["Plans from about $30 a month", "Insurance helps with accidents and illness. Routine shots usually aren't covered, so many owners pair it with a plan."],
        "Not sure yet": ["We'll show you both", "You'll see plan and per-visit prices side by side, so you can decide later."]
      };
      function paintTip() { var t = tips[state.cost]; $("#tip-big").textContent = t[0]; $("#tip-small").textContent = t[1]; }
      pills($("#cost-opts"), "cost", false, paintTip);
      paintTip();
    },

    /* IP07 · What would help */
    help: function () {
      pills($("#help-opts"), "help", true);
      var input = $("#note"), box = $("#voice"), mic = $("#mic");
      input.value = state.note;
      input.addEventListener("input", function () { save({ note: input.value }); });
      var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      var rec = null;
      mic.addEventListener("click", function () {
        if (!SR) { toast("Voice input isn't available in this browser. Type instead."); input.focus(); return; }
        if (rec) { rec.stop(); return; }
        rec = new SR();
        rec.lang = "en-US"; rec.interimResults = true;
        rec.onresult = function (e) {
          var text = "";
          for (var i = 0; i < e.results.length; i++) text += e.results[i][0].transcript;
          input.value = text; save({ note: text });
        };
        rec.onend = function () { rec = null; box.classList.remove("listening"); mic.setAttribute("aria-label", "Speak"); mic.setAttribute("aria-pressed", "false"); };
        rec.onerror = function () { toast("Couldn't hear that. Try again or type."); };
        box.classList.add("listening"); mic.setAttribute("aria-label", "Stop listening"); mic.setAttribute("aria-pressed", "true");
        rec.start();
      });
    },

    /* IP08 · Building her plan */
    building: function () {
      setTimeout(function () { var c = $("#cta"); c.hidden = false; c.classList.add("pop"); c.focus({ preventScroll: true }); }, 3200);
    },

    /* IP09 · Waffles' home */
    tailored: function () {
      var h = new Date().getHours();
      $("#greeting").textContent = (h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening") + ", Lucy";
      var held = $("#held");
      function paintHeld() {
        if (!state.confirmed) return;
        $("#held-label").textContent = "Booked for " + state.name;
        $("#held-expiry").textContent = "Added to your calendar";
        $("#held-actions").innerHTML = '<button type="button" class="ghost ghost--dark ghost--block" data-toast="Rescheduling isn\'t part of this prototype yet.">' + icon("calendar-check", 16) + "Manage visit</button>";
      }
      $("#confirm-visit").addEventListener("click", function () {
        save({ confirmed: true }); paintHeld();
        held.classList.remove("pop"); void held.offsetWidth; held.classList.add("pop");
        toast("Booked. See you Tuesday at 6:00 PM.");
      });
      paintHeld();
    }
  };

  hydrate();
  var page = document.body.getAttribute("data-page");
  if (pages[page]) pages[page]();
  window.addEventListener("resize", function () { $$("svg[data-waves]").forEach(drawWaves); });
})();
