# SDG 15 – Life on Land

A responsive website gallery in English about United Nations Sustainable Development Goal 15: protecting terrestrial ecosystems, forests, meadows, and biodiversity. The project uses only HTML, CSS, and JavaScript (no frameworks), so it is ready to publish directly on GitHub Pages.

## Project files

- `index.html` – page content, photo gallery, videos, and game.
- `style.css` – visual design and responsive layouts for phones, tablets, and desktops.
- `script.js` – mobile navigation, gallery filters, image lightbox, and game logic.
- `images/dijakA/` – Student A’s six photos (`slika1.jpg`–`slika6.jpg`).
- `images/dijakB/` – Student B’s six photos (`slika1.jpg`–`slika6.jpg`).

## Adding your photos

Upload your photos to the appropriate folder and name them exactly `slika1.jpg`, `slika2.jpg`, …, `slika6.jpg`. The gallery currently shows styled placeholder panels until the image files are added. Use JPG format; if you use another format, update the `data-src` values in `index.html` as well.

## YouTube videos

In `index.html`, find `VIDEO_ID_DIJAK_A` and `VIDEO_ID_DIJAK_B` and replace them with the IDs of your YouTube videos. The ID is the part after `watch?v=` or in a `youtu.be/` link.

## Forest Cleanup Challenge game

1. Click **Start Game**.
2. Click litter (🧴 🥫 🛞 🛍️) to collect it and earn 10 points.
3. Avoid clicking plants and animals (🦔 🍄 🌰 🐝 🌸), or you will lose one life.
4. The game ends after 30 seconds or when all three lives are lost. Your score and an eco tip will appear.
5. Click **Play Again** to start a new round.

## Who does what?

- **Student A – The Beauty of Nature:** introduction to SDG 15, the importance of forests and meadows, and the first six photos (forest path, old tree, bee, forest bird, flowering meadow, forest stream).
- **Student B – Threats and Solutions:** description of environmental challenges and possible solutions, plus the other six photos (litter, cleared forest, Japanese knotweed, insect hotel, bird nesting box, forest nature trail).
- **Together:** website design, gallery, videos, game, and conclusion. Authors: Student A and Student B – COIL Project.

## Publish with GitHub Pages

1. Create a GitHub repository and upload all files and folders.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select the `main` branch and the `/ (root)` folder.
4. Save. Once GitHub Pages finishes publishing, your website will be available at the URL shown there.

You can also run the website locally by opening `index.html` in a browser.
