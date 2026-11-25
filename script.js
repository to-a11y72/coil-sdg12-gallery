/* =========================================================
   SDG 15 – Life on Land
   script.js: navigation, gallery filters, lightbox and the game
   ========================================================= */

(function () {
  "use strict";

  /* ---------------------------------------------------------
     1. Navigation (mobile menu + active link)
     --------------------------------------------------------- */
  var nav = document.getElementById("nav");
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  if (nav && navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    navLinks.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  var navItems = Array.prototype.slice.call(document.querySelectorAll(".nav__link"));
  var pageSections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));

  if ("IntersectionObserver" in window && pageSections.length) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var target = "#" + entry.target.id;
          navItems.forEach(function (item) {
            item.classList.toggle("is-active", item.getAttribute("href") === target);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    pageSections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  /* ---------------------------------------------------------
     2. Gentle reveal on scroll
     --------------------------------------------------------- */
  var revealTargets = Array.prototype.slice.call(
    document.querySelectorAll(".section-head, .goal-card, .problem-card, .callout, .video-card")
  );

  if ("IntersectionObserver" in window && revealTargets.length) {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    revealTargets.forEach(function (el) {
      el.classList.add("reveal");
      revealObserver.observe(el);
    });
  }

  /* ---------------------------------------------------------
     3. Gallery: placeholders, filters
     --------------------------------------------------------- */
  var photoCards = Array.prototype.slice.call(document.querySelectorAll(".photo-card"));

  // If a photo does not exist yet, show a tidy frame with an emoji instead.
  photoCards.forEach(function (card) {
    var img = card.querySelector("img");
    var frame = card.querySelector(".photo-frame");
    if (!img || !frame) return;

    var markMissing = function () {
      frame.classList.add("is-missing");
    };

    if (img.complete && img.naturalWidth === 0) markMissing();
    img.addEventListener("error", markMissing);
  });

  var filterButtons = Array.prototype.slice.call(document.querySelectorAll(".filter-btn"));

  function applyFilter(value) {
    photoCards.forEach(function (card) {
      var show = value === "all" || card.dataset.author === value;
      card.classList.toggle("is-hidden", !show);
      if (show) {
        card.style.animation = "none";
        void card.offsetWidth;
        card.style.animation = "";
      }
    });
  }

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      filterButtons.forEach(function (other) {
        var on = other === button;
        other.classList.toggle("is-active", on);
        other.setAttribute("aria-pressed", on ? "true" : "false");
      });
      applyFilter(button.dataset.filter);
    });
  });

  /* ---------------------------------------------------------
     4. Lightbox
     --------------------------------------------------------- */
  var lightbox = document.getElementById("lightbox");
  var lightboxMedia = document.getElementById("lightboxMedia");
  var lightboxTitle = document.getElementById("lightboxTitle");
  var lightboxDesc = document.getElementById("lightboxDesc");
  var lightboxCounter = document.getElementById("lightboxCounter");
  var lightboxClose = document.getElementById("lightboxClose");
  var lightboxPrev = document.getElementById("lightboxPrev");
  var lightboxNext = document.getElementById("lightboxNext");

  var currentList = [];
  var currentIndex = 0;

  function visibleCards() {
    return photoCards.filter(function (card) {
      return !card.classList.contains("is-hidden");
    });
  }

  function mediaPlaceholder(card) {
    var wrap = document.createElement("div");
    wrap.className = "lightbox__placeholder";
    var icon = document.createElement("span");
    icon.textContent = card.dataset.emoji || "🌿";
    var note = document.createElement("small");
    note.textContent = "Photo coming soon";
    wrap.appendChild(icon);
    wrap.appendChild(note);
    return wrap;
  }

  function renderLightbox() {
    var card = currentList[currentIndex];
    if (!card || !lightboxMedia) return;

    Array.prototype.forEach.call(
      lightboxMedia.querySelectorAll("img, .lightbox__placeholder"),
      function (node) {
        node.remove();
      }
    );

    var frame = card.querySelector(".photo-frame");
    var missing = frame && frame.classList.contains("is-missing");

    if (missing) {
      lightboxMedia.prepend(mediaPlaceholder(card));
    } else {
      var img = document.createElement("img");
      img.alt = card.dataset.title || "";
      img.src = card.dataset.src;
      img.addEventListener("error", function () {
        img.replaceWith(mediaPlaceholder(card));
      });
      lightboxMedia.prepend(img);
    }

    if (lightboxTitle) lightboxTitle.textContent = card.dataset.title || "";
    if (lightboxDesc) lightboxDesc.textContent = card.dataset.desc || "";
    if (lightboxCounter) {
      lightboxCounter.textContent = currentIndex + 1 + " / " + currentList.length;
    }
  }

  function openLightbox(card) {
    if (!lightbox) return;
    currentList = visibleCards();
    currentIndex = Math.max(0, currentList.indexOf(card));
    renderLightbox();
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (lightboxClose) lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function stepLightbox(direction) {
    if (!currentList.length) return;
    currentIndex = (currentIndex + direction + currentList.length) % currentList.length;
    renderLightbox();
  }

  photoCards.forEach(function (card) {
    card.addEventListener("click", function () {
      openLightbox(card);
    });
    card.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(card);
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightboxPrev)
    lightboxPrev.addEventListener("click", function (event) {
      event.stopPropagation();
      stepLightbox(-1);
    });
  if (lightboxNext)
    lightboxNext.addEventListener("click", function (event) {
      event.stopPropagation();
      stepLightbox(1);
    });
  if (lightbox) {
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener("keydown", function (event) {
    if (!lightbox || !lightbox.classList.contains("is-open")) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") stepLightbox(-1);
    if (event.key === "ArrowRight") stepLightbox(1);
  });

  /* ---------------------------------------------------------
     5. Game "Forest Cleaner"
     --------------------------------------------------------- */
  var stage = document.getElementById("gameStage");
  var overlay = document.getElementById("gameOverlay");
  var overlayTitle = document.getElementById("overlayTitle");
  var overlayText = document.getElementById("overlayText");
  var overlayButton = document.getElementById("gameOverlayBtn");
  var startButton = document.getElementById("gameStart");
  var scoreOutput = document.getElementById("gameScore");
  var livesOutput = document.getElementById("gameLives");
  var tipOutput = document.getElementById("gameTip");

  var TRASH = ["🧴", "🥫", "🛞", "🛍️"];
  var NATURE = ["🦔", "🍄", "🌰", "🐝", "🌸"];
  var TIPS = [
    "Eco tip: always take your bottle home and put it in the recycling bin.",
    "Eco tip: never leave food in the forest – animals get used to waste and fall ill.",
    "Eco tip: when you spot an illegal dump, report it to your municipality or forest ranger.",
    "Eco tip: do not carry Japanese knotweed to new places – it spreads through its roots.",
    "Eco tip: leave part of your lawn unmown so pollinators have food.",
    "Eco tip: put up an insect hotel in your garden – shelter for bees and beetles.",
    "Eco tip: old wood and fallen leaves are home to many species – do not clear everything away.",
    "Eco tip: take a bag on your walk and pick up at least one piece of litter."
  ];

  var items = [];
  var running = false;
  var score = 0;
  var lives = 3;
  var rafId = null;
  var lastTime = 0;
  var elapsed = 0;
  var spawnAccumulator = 0;

  function hearts(value) {
    if (value <= 0) return "—";
    return "❤".repeat(value);
  }

  function updateHud() {
    if (scoreOutput) scoreOutput.textContent = score;
    if (livesOutput) livesOutput.textContent = hearts(lives);
  }

  function clearItems() {
    items.forEach(function (item) {
      item.el.remove();
    });
    items = [];
    Array.prototype.forEach.call(
      stage ? stage.querySelectorAll(".falling-item, .float-score") : [],
      function (node) {
        node.remove();
      }
    );
  }

  function spawnItem() {
    if (!stage) return;
    var isTrash = Math.random() < 0.55;
    var pool = isTrash ? TRASH : NATURE;
    var emoji = pool[Math.floor(Math.random() * pool.length)];

    var el = document.createElement("span");
    el.className = "falling-item";
    el.textContent = emoji;

    var width = stage.clientWidth || 600;
    var x = 12 + Math.random() * Math.max(width - 70, 20);
    el.style.left = x + "px";
    el.style.transform = "translateY(0px)";
    stage.appendChild(el);

    var item = {
      el: el,
      x: x,
      y: -60,
      speed: 95 + Math.random() * 70 + elapsed * 5,
      kind: isTrash ? "trash" : "nature",
      alive: true
    };

    el.addEventListener("click", function (event) {
      event.stopPropagation();
      hitItem(item);
    });

    items.push(item);
  }

  function floatText(x, y, text, kind) {
    if (!stage) return;
    var node = document.createElement("span");
    node.className = "float-score float-score--" + kind;
    node.textContent = text;
    node.style.left = x + "px";
    node.style.top = y + "px";
    stage.appendChild(node);
    window.setTimeout(function () {
      node.remove();
    }, 800);
  }

  function hitItem(item) {
    if (!item.alive) return;
    item.alive = false;

    var index = items.indexOf(item);
    if (index > -1) items.splice(index, 1);

    item.el.classList.add("is-gone");
    window.setTimeout(function () {
      item.el.remove();
    }, 320);

    if (item.kind === "trash") {
      score += 10;
      floatText(item.x, item.y + 20, "+10", "plus");
    } else {
      lives -= 1;
      floatText(item.x, item.y + 20, "−1 ❤", "minus");
      if (lives <= 0) {
        updateHud();
        endGame();
        return;
      }
    }
    updateHud();
  }

  function tick(timestamp) {
    if (!running || !stage) return;

    var delta = Math.min((timestamp - lastTime) / 1000, 0.06);
    lastTime = timestamp;
    elapsed += delta;
    spawnAccumulator += delta * 1000;

    var interval = Math.max(390, 820 - elapsed * 14);
    if (spawnAccumulator >= interval) {
      spawnAccumulator = 0;
      spawnItem();
    }

    var stageHeight = stage.clientHeight;

    for (var i = items.length - 1; i >= 0; i--) {
      var item = items[i];
      item.y += item.speed * delta;
      item.el.style.transform = "translateY(" + item.y + "px)";

      if (item.y > stageHeight - 30) {
        item.alive = false;
        item.el.remove();
        items.splice(i, 1);
      }
    }

    rafId = window.requestAnimationFrame(tick);
  }

  function endGame() {
    running = false;
    if (rafId) window.cancelAnimationFrame(rafId);
    rafId = null;
    clearItems();

    if (overlayTitle) overlayTitle.textContent = "Game over!";
    if (overlayText) {
      overlayText.textContent =
        "You scored " + score + " points. The forest thanks you for every piece of litter you picked up.";
    }
    if (tipOutput) {
      tipOutput.textContent = TIPS[Math.floor(Math.random() * TIPS.length)];
      tipOutput.hidden = false;
    }
    if (overlayButton) overlayButton.textContent = "Play again";
    if (startButton) startButton.textContent = "Play again";
    if (overlay) overlay.classList.remove("is-hidden");
  }

  function startGame() {
    if (!stage) return;

    clearItems();
    running = true;
    score = 0;
    lives = 3;
    elapsed = 0;
    spawnAccumulator = 0;
    lastTime = window.performance.now();
    updateHud();

    if (overlay) overlay.classList.add("is-hidden");
    if (tipOutput) tipOutput.hidden = true;
    if (startButton) startButton.textContent = "Play again";

    if (rafId) window.cancelAnimationFrame(rafId);
    rafId = window.requestAnimationFrame(tick);
  }

  if (startButton) startButton.addEventListener("click", startGame);
  if (overlayButton) overlayButton.addEventListener("click", startGame);

  /* ---------------------------------------------------------
     6. Year in the footer
     --------------------------------------------------------- */
  var yearNode = document.getElementById("year");
  if (yearNode) yearNode.textContent = new Date().getFullYear();
})();
