<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تحميل README.md</title>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;700;900&family=IBM+Plex+Sans+Arabic:wght@300;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <style>
        :root {
            --bg: #0C0A09;
            --bg2: #1C1917;
            --bg3: #292524;
            --fg: #FAFAF9;
            --fg2: #D6D3D1;
            --muted: #78716C;
            --accent: #F97316;
            --accent2: #FB923C;
            --accent-glow: rgba(249, 115, 22, 0.2);
            --border: rgba(250, 250, 249, 0.07);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: 'IBM Plex Sans Arabic', sans-serif;
            background: var(--bg);
            color: var(--fg);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }

        body::before {
            content: '';
            position: fixed;
            inset: 0;
            background: radial-gradient(ellipse 600px 500px at 50% 50%, rgba(249, 115, 22, 0.07), transparent);
            pointer-events: none;
        }

        .card {
            position: relative;
            z-index: 1;
            background: var(--bg2);
            border: 1px solid var(--border);
            border-radius: 20px;
            padding: 2.5rem;
            max-width: 440px;
            width: 100%;
            text-align: center;
        }

        .icon-wrap {
            width: 64px;
            height: 64px;
            border-radius: 16px;
            background: linear-gradient(135deg, var(--accent), var(--accent2));
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            font-size: 1.6rem;
            color: #fff;
            box-shadow: 0 6px 28px var(--accent-glow);
        }

        .card h1 {
            font-family: 'Noto Kufi Arabic', sans-serif;
            font-weight: 900;
            font-size: 1.5rem;
            margin-bottom: 0.4rem;
        }

        .card h1 span {
            background: linear-gradient(135deg, var(--accent), var(--accent2));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .card .sub {
            color: var(--muted);
            font-size: 0.85rem;
            margin-bottom: 2rem;
        }

        .file-tag {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.7rem 1.4rem;
            background: var(--bg);
            border: 1px solid var(--border);
            border-radius: 12px;
            margin-bottom: 1.5rem;
            font-size: 0.9rem;
            font-weight: 700;
            direction: ltr;
        }

        .file-tag i { color: var(--fg2); }

        .dl-btn {
            width: 100%;
            padding: 1rem;
            border-radius: 14px;
            border: none;
            background: linear-gradient(135deg, var(--accent), var(--accent2));
            color: #fff;
            font-family: 'Noto Kufi Arabic', sans-serif;
            font-weight: 700;
            font-size: 1rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.6rem;
            transition: all 0.3s ease;
            box-shadow: 0 4px 20px var(--accent-glow);
        }

        .dl-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 32px rgba(249, 115, 22, 0.35);
        }

        .dl-btn:active { transform: translateY(0); }

        .hint {
            margin-top: 1.5rem;
            color: var(--muted);
            font-size: 0.78rem;
            line-height: 1.7;
        }

        .toast-box {
            position: fixed;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%);
            z-index: 9999;
        }

        .toast {
            background: var(--bg3);
            color: var(--fg);
            border: 1px solid var(--border);
            padding: 0.7rem 1.4rem;
            border-radius: 12px;
            font-size: 0.85rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            box-shadow: 0 8px 30px rgba(0,0,0,0.4);
            animation: tIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .toast.out { animation: tOut 0.3s ease forwards; }
        .toast i { color: var(--green); }

        @keyframes tIn {
            from { opacity: 0; transform: translateY(16px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes tOut {
            to { opacity: 0; transform: translateY(10px) scale(0.95); }
        }
    </style>
</head>
<body>

    <div class="card">
        <div class="icon-wrap"><i class="fas fa-file-lines"></i></div>
        <h1>تحميل <span>README.md</span></h1>
        <p class="sub">ملف توثيق إكستنشن DarkFlow للـ GitHub</p>

        <div class="file-tag">
            <i class="fas fa-file-lines"></i>
            README.md
        </div>

        <button class="dl-btn" id="dlBtn">
            <i class="fas fa-download"></i>
            تحميل الملف
        </button>

        <p class="hint">
            ضع الملف داخل مجلد <strong>darkflow-extension</strong> بجانب باقي الملفات قبل رفعه على GitHub
        </p>
    </div>

    <div class="toast-box" id="toastBox"></div>

    <script>
        const readme = `# DarkFlow

> Smart dark mode for any website — instant, lightweight, customizable.

<p align="center">
  <img src="https://img.shields.io/badge/Manifest-V3-orange?style=flat-square" alt="Manifest V3">
  <img src="https://img.shields.io/badge/Size-12KB-blue?style=flat-square" alt="Size">
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License">
</p>

---

## Features

- **Zero flicker** — injects CSS at \`document_start\` before paint
- **Image-safe** — skips inversion on images, videos, SVGs, and icons
- **3 intensity levels** — Light / Medium / Full
- **Per-site toggle** — each site remembers its own state
- **No tracking** — zero data collection, minimal permissions

## Install

1. Download the [ZIP](../../archive/refs/heads/main.zip) or clone:
   \`\`\`bash
   git clone https://github.com/fatmanour/darkflow-extension.git
   \`\`\`
2. Open \`chrome://extensions\` (or \`edge://extensions\`)
3. Enable **Developer mode**
4. Click **Load unpacked** → select the \`darkflow-extension\` folder
5. Done. Click the icon on any site to toggle.

## File Structure

\`\`\`
darkflow-extension/
├── manifest.json      # Extension config (Manifest V3)
├── background.js      # Service worker
├── content.js         # Injected into every page
├── dark.css           # Dark mode styles
├── popup.html         # Popup UI
└── popup.js           # Popup logic
\`\`\`

## How It Works

\`\`\`
Page loads → content.js runs at document_start
           → dark.css applied instantly (no white flash)
           → checks chrome.storage for per-site preference
           → user toggles via popup → message sent → state updates live
\`\`\`

## License

MIT © [Fatma Nour](https://github.com/fatmanour)

---

<p align="center">صُنع بـ ❤️ لراحة عينيك</p>`;

        document.getElementById('dlBtn').addEventListener('click', function() {
            const blob = new Blob([readme], { type: 'text/markdown;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'README.md';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            showToast('تم تحميل README.md');
        });

        function showToast(msg) {
            const box = document.getElementById('toastBox');
            box.innerHTML = '';
            const t = document.createElement('div');
            t.className = 'toast';
            t.innerHTML = '<i class="fas fa-circle-check"></i> ' + msg;
            box.appendChild(t);
            setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 300); }, 2200);
        }
    </script>
</body>
</html>