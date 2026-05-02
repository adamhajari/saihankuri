# Sai Hankuri

Static site for [saihankuri.com](https://saihankuri.com), generated from WordPress using the Simply Static plugin and hosted on GitHub Pages.

## Serving locally

You need a local HTTP server — opening `index.html` directly in a browser won't work because relative asset paths require a server.

**Python (no install required):**
```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

**Node.js (with `npx`):**
```bash
npx serve .
```

Then open the URL printed in the terminal (usually [http://localhost:3000](http://localhost:3000)).
