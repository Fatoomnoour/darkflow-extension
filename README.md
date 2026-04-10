# DarkFlow

> Smart dark mode for any website — instant, lightweight, customizable.

<p align="center">
  <img src="https://img.shields.io/badge/Manifest-V3-orange?style=flat-square" alt="Manifest V3">
  <img src="https://img.shields.io/badge/Size-12KB-blue?style=flat-square" alt="Size">
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License">
</p>

---

## Features

- **Zero flicker** — injects CSS at `document_start` before paint
- **Image-safe** — skips inversion on images, videos, SVGs, and icons
- **3 intensity levels** — Light / Medium / Full
- **Per-site toggle** — each site remembers its own state
- **No tracking** — zero data collection, minimal permissions

## Install

1. Download the [ZIP](../../archive/refs/heads/main.zip) or clone:
   ```bash
   git clone https://github.com/Fatoomnoour/darkflow-extension.git
Open chrome://extensions (or edge://extensions)
Enable Developer mode
Click Load unpacked → select the darkflow-extension folder
Done. Click the icon on any site to toggle.
File Structure
darkflow-extension/
├── manifest.json      # Extension config (Manifest V3)
├── background.js      # Service worker
├── content.js         # Injected into every page
├── dark.css           # Dark mode styles
├── popup.html         # Popup UI
└── popup.js           # Popup logic
How It Works

Page loads → content.js runs at document_start
           → dark.css applied instantly (no white flash)
           → checks chrome.storage for per-site preference
           → user toggles via popup → message sent → state updates live
License
MIT © Fatma Nour

صُنع بـ ❤️ لراحة عينيك

