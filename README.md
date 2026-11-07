# 🏡 Adam's Place — House Showcase, Blueprint & Gift Registry

A public, responsive web app showcasing room-by-room bare space planning perspectives, house electrical & utility blueprints, an ongoing DIY project log, and a gift wishlist for friends and family.

🔗 **Live Site:** [https://majora1987-debug.github.io/house/](https://majora1987-debug.github.io/house/)

---

## ⚡ Features

- **🏠 Room Hub & Dedicated Showcases:** Clean, high-resolution bare room perspectives (13 decluttered views) with interior decorating visions and quick specs for each zone.
- **🎁 House Wishlist & Gift Registry:** Categorized wishlist with status filter chips:
  - 🔴 **Must Have:** Immediate essentials for settling in.
  - 🟡 **Nice to Have:** Great quality-of-life additions.
  - 🔵 **Could Have:** Future wishlist & aesthetic upgrades.
  - 🟢 **Purchased / Claimed:** Items already acquired to prevent duplicate gifting.
- **📐 House Blueprint & Utilities Hub:**
  - Interactive diagram and full circuit breakdown of the **PDL DBF 15** switchboard (40A main supply, dual 40A 30mA RCDs, and 4 spare DIN poles).
  - Ceiling fan compatibility guide (replacing B22 surface oyster bases with quiet DC fans).
  - Heating & cooling overview (Brivis gas ducted heating + living split system).
- **⏱️ Timestamped Project Timeline:** Real-time log of projects, quotes, and installations with filter-by-room capabilities.
- **👑 Private Admin Studio:**
  - Public visitors see a 100% read-only site.
  - Adam signs in via Google OAuth (`majora1987@gmail.com`) to unlock inline room vision editing, one-click wishlist status toggling, and instant project updates saved to Cloud Firestore in real time.
- **🛡️ 100% Privacy-First:**
  - Zero sensitive conveyancing, legal, title, or loan documents.
  - Zero personal belongings or furnished photos.
  - 100% of bundled images have had iPhone EXIF/GPS coordinates permanently scrubbed.

---

## 🛠️ Tech Stack

- **Frontend:** Semantic HTML5, modern vanilla CSS (warm-minimalist dark mode), and modular Vanilla JavaScript.
- **Hosting:** GitHub Pages (static, fast, global CDN).
- **Authentication & Database:** Firebase Auth (Google Sign-In) + Cloud Firestore for real-time room notes, project updates, and wishlist synchronization.
- **PWA:** Web App Manifest for mobile installation ("Add to Home Screen" on iOS & Android).

---

## 🚀 Local Development

To run the site locally:
```bash
python3 -m http.server 8000
```
Open `http://localhost:8000` in your web browser.
