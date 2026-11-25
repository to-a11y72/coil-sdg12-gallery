# SDG 15 – Življenje na kopnem

Odzivna spletna galerija v slovenščini o Cilju trajnostnega razvoja 15: varovanje kopenskih ekosistemov, gozdov, travnikov in biotske raznovrstnosti. Projekt uporablja izključno HTML, CSS in JavaScript brez ogrodij, zato je primeren za neposredno objavo na GitHub Pages.

## Datoteke

- `index.html` – vsebina strani, galerija, videa in igrica.
- `style.css` – barvna podoba in prilagoditev za telefone, tablice ter računalnike.
- `script.js` – mobilna navigacija, filtri, povečava fotografij in igra.
- `images/dijakA/` – šest fotografij Dijaka A (`slika1.jpg`–`slika6.jpg`).
- `images/dijakB/` – šest fotografij Dijaka B (`slika1.jpg`–`slika6.jpg`).

## Kako dodati fotografije

V ustrezno mapo naložita svoje fotografije in jih poimenujta natančno `slika1.jpg`, `slika2.jpg` … `slika6.jpg`. Nadomestni barvni okvirji so prikazani, dokler datoteke ne obstajajo. Fotografije naj bodo v formatu JPG; po potrebi popravita tudi končnico v `data-src` in v `src` elementov v `index.html`.

## YouTube videa

V `index.html` poiščita `VIDEO_ID_DIJAK_A` in `VIDEO_ID_DIJAK_B` ter nadomestita oznaki z ID-jema vajinih videov. ID je del YouTube povezave za `watch?v=...` ali za `youtu.be/...`.

## Igrica »Gozdni čistilec«

1. Kliknita **Začni igro**.
2. Klik na smet (🧴 🥫 🛞 🛍️) prinese 10 točk.
3. Klik na žival ali rastlino (🦔 🍄 🌰 🐝 🌸) odvzame eno življenje.
4. Igra se konča po 30 sekundah ali ko zmanjka treh življenj. Nato se prikažeta rezultat in eko nasvet.
5. Kliknita **Igraj znova** za nov krog.

## Razdelitev dela

- **Dijak A – Lepota narave:** uvod v SDG 15, pomen gozdov in travnikov ter prvih šest fotografij (gozdna pot, staro drevo, čebela, gozdna ptica, cvetoči travnik, gozdni potok).
- **Dijak B – Ogroženost in ukrepi:** opis okoljskih težav in rešitev ter drugih šest fotografij (odpadki, poseka, japonski dresnik, hotel za žuželke, ptičja hišica, gozdna učna pot).
- **Skupaj:** oblikovanje galerije, videoposnetka, igrice in zaključka. Avtorja: Dijak A in Dijak B – COIL projekt.

## Objavi na GitHub Pages

1. Ustvarita GitHub repozitorij in vanj naložita vse datoteke ter mapi.
2. Odpreta **Settings → Pages**.
3. Pri **Build and deployment** izberita **Deploy from a branch**, vejo `main` in mapo `/ (root)`.
4. Shranita. Ko GitHub Pages zaključi objavo, bo spletna stran dostopna prek prikazanega naslova.

Stran deluje tudi lokalno: odpreta `index.html` v brskalniku.
