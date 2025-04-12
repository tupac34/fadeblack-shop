# 🧢 FadeBlack Builder Platform

A powerful platform to create and host custom business sites — from eCommerce stores to landing pages, all under your own brand.

## 🚀 Features
- Create your own store, portfolio, landing page, or service site
- Full dashboard for branding and content control
- Stripe/PayPal-ready upgrade system
- Firebase + Netlify backend
- Printful integration for print-on-demand businesses

## 📁 File Structure
```
/public
  index.html           ← Homepage + Pricing
  create-site.html     ← Sign-up page for new sites
  site-template.html   ← Dynamic live site loader
  site-dashboard.html  ← Owner control panel
  dashboard-builder.html ← Drag & drop builder UI
  upgrade-plan.html    ← PayPal-based upgrade system

/netlify/functions
  get-site-config.js   ← Loads branding/data from Firestore
  paypal-upgrade.js    ← Secure webhook to unlock features
```

## ⚙️ Setup
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

## 🔗 Connect Firebase
- Update your `/js/firebase.js` with your Firebase config
- Firestore collections:
  - `sites` → name, email, plan, logo, color, content
  - `orders` → if used with Printful

## 📦 Deploy to Netlify
Set these:
- **Publish Directory**: `public`
- **Functions Directory**: `netlify/functions`

## 🛠 Built With
- HTML, JS, Firebase
- Netlify Functions
- Stripe + PayPal (planned)

---

## 🖤 Made with love by [FadeBlack](https://fadeblack.shop)
