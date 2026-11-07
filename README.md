# Adam's Place — Space Planning & House Showcase

A personal, responsive web app showcasing room-by-room space planning perspectives, house electrical & utility blueprints, an ongoing project log, and a curated purchase wishlist.

🔗 **Live Site:** [https://majora1987-debug.github.io/house/](https://majora1987-debug.github.io/house/)

---

## Features

- **Room Hub & Dedicated Showcases:** High-resolution room perspectives with furniture layout visions and specifications for each zone.
- **House Wishlist:** Categorized wishlist with priority status filters:
  - **Must Have:** Immediate essentials for settling in.
  - **Nice to Have:** Quality-of-life additions.
  - **Could Have:** Future aesthetic or lifestyle upgrades.
  - **Purchased:** Items already acquired.
- **House Blueprint & Utilities Hub:**
  - Interactive switchboard layout and circuit breakdown for the PDL DBF 15 panel (40A main supply, dual 40A 30mA RCDs, and 4 spare DIN poles).
  - Ceiling fan compatibility guide (replacing B22 surface oyster bases with quiet DC fans).
  - Climate systems overview (Brivis gas ducted heating + reverse-cycle split system).
- **Timestamped Project Log:** Chronological log of space planning, inspections, installations, and quotes with room filtering.
- **Private Admin Mode:**
  - Public visitors see a 100% read-only site.
  - Owner signs in via Google OAuth (`majora1987@gmail.com`) to unlock inline room vision editing, one-click wishlist status toggling, and project note publishing saved to Cloud Firestore in real time.
- **Privacy First:**
  - Zero sensitive conveyancing, legal, title, or financial documents.
  - 100% of bundled images have had iPhone EXIF/GPS coordinates permanently stripped.

---

## Tech Stack

- **Frontend:** Semantic HTML5, custom architectural warm-dark CSS design system, modular Vanilla JavaScript.
- **Hosting:** GitHub Pages (static, fast, global CDN).
- **Authentication & Database:** Firebase Auth (Google Sign-In) + Cloud Firestore for real-time room notes, project updates, and wishlist synchronization.
- **PWA:** Web App Manifest for mobile installation ("Add to Home Screen" on iOS & Android).
