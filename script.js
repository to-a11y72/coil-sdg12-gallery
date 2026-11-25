// SDG 15 – gallery, navigation, and Forest Cleanup Challenge interactions
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  menuToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.textContent = open ? "×" : "☰";
  });
  navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  }));

  // Gallery filtering
  const filterButtons = document.querySelectorAll(".filter-btn");
  const photoCards = document.querySelectorAll(".photo-card");
  filterButtons.forEach(button => button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    photoCards.forEach(card => {
      card.hidden = filter !== "all" && card.dataset.student !== filter;
    });
  }));

  // Lightbox: displays the actual image if it exists; otherwise, the placeholder remains visible.
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxDescription = document.getElementById("lightbox-description");
  const closeLightbox = document.getElementById("lightbox-close");
  let lastFocused = null;
  document.querySelectorAll(".photo-open").forEach(button => button.addEventListener("click", () => {
    lastFocused = button;
    const src = button.dataset.src;
    const title = button.dataset.title;
    lightboxTitle.textContent = title;
    lightboxDescription.textContent = button.dataset.description;
    lightboxImage.replaceChildren();
    const img = new Image();
    img.src = src;
    img.alt = title;
    img.onerror = () => {
      lightboxImage.textContent = button.querySelector(".photo-placeholder span").textContent;
    };
    lightboxImage.append(img);
    lightbox.hidden = false;
    closeLightbox.focus();
  }));
  function closeBox() {
    lightbox.hidden = true;
    if (lastFocused) lastFocused.focus();
  }
  closeLightbox.addEventListener("click", closeBox);
  lightbox.addEventListener("click", event => { if (event.target === lightbox) closeBox(); });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !lightbox.hidden) closeBox();
  });

  // Forest Cleanup Challenge game
  const field = document.getElementById("game-field");
  const startButton = document.getElementById("start-game");
  const scoreDisplay = document.getElementById("score");
  const livesDisplay = document.getElementById("lives");
  const statusDisplay = document.getElementById("game-status");
  const intro = document.getElementById("game-intro");
  const rubbish = ["🧴", "🥫", "🛞", "🛍️"];
  const nature = ["🦔", "🍄", "🌰", "🐝", "🌸"];
  let score = 0, lives = 3, running = false, spawnTimer = null, endTimer = null;
  let activeItems = new Set();

  function updateScoreboard() {
    scoreDisplay.textContent = score;
    livesDisplay.textContent = "❤️".repeat(lives) + "♡".repeat(3 - lives);
  }
  function clearItems() {
    activeItems.forEach(item => item.remove());
    activeItems.clear();
  }
  function endGame() {
    running = false;
    clearInterval(spawnTimer);
    clearTimeout(endTimer);
    clearItems();
    intro.hidden = false;
    intro.innerHTML = `<span>🌱</span><strong>Game over!</strong><p>You scored <b>${score} points</b>. Every piece of litter disposed of properly helps nature.</p><small> Eco tip: use a reusable water bottle and avoid single-use plastics.</small>`;
    startButton.textContent = "Play Again";
    statusDisplay.textContent = "Game finished";
  }
  function spawnItem() {
    if (!running) return;
    const isTrash = Math.random() < 0.62;
    const item = document.createElement("button");
    item.type = "button";
    item.className = "falling-item";
    item.textContent = isTrash ? rubbish[Math.floor(Math.random() * rubbish.length)] : nature[Math.floor(Math.random() * nature.length)];
    item.setAttribute("aria-label", isTrash ? "Pick up litter" : "Leave nature alone");
    item.style.left = `${5 + Math.random() * 88}%`;
    item.style.top = "-45px";
    const duration = 3.4 + Math.random() * 1.7;
    item.style.animationDuration = `${duration}s`;
    let handled = false;
    item.addEventListener("click", () => {
      if (handled || !running) return;
      handled = true;
      if (isTrash) {
        score += 10;
        statusDisplay.textContent = "Great! Litter collected. +10";
      } else {
        lives -= 1;
        statusDisplay.textContent = "Watch out for the forest inhabitants! −1 life";
      }
      updateScoreboard();
      item.remove();
      activeItems.delete(item);
      if (lives <= 0) endGame();
    });
    item.addEventListener("animationend", () => {
      item.remove();
      activeItems.delete(item);
    });
    activeItems.add(item);
    field.append(item);
  }
  function startGame() {
    clearInterval(spawnTimer);
    clearTimeout(endTimer);
    clearItems();
    score = 0; lives = 3; running = true;
    updateScoreboard();
    intro.hidden = true;
    startButton.textContent = "Game in progress …";
    statusDisplay.textContent = "Collect as many points as you can!";
    spawnItem();
    spawnTimer = setInterval(spawnItem, 850);
    // Short game round; the final score and an eco tip appear when time runs out.
    endTimer = setTimeout(endGame, 30000);
  }
  startButton.addEventListener("click", startGame);
  updateScoreboard();
});
