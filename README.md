# Executive Portfolio & Autonomous Administration Engine

Architectural Portfolio Platform engineered for **Uthayagunasingam Vanojan** (Full-Stack Software Engineer & Solutions Architect). Designed with a deep cinematic navy & champagne-gold aesthetic, featuring an enterprise-grade administration console, Cloudinary project screenshot galleries, cryptographic authentication, and direct Gmail SMTP relays via Nodemailer.

---

## 🏛️ Architectural Overview & Tech Stack

- **Client Tier**: React 18, Vite, Three.js (preserved Hero canvas), Canvas Confetti, Lucide Icons, Glassmorphic CSS Design System.
- **Server Tier**: Node.js, Express, Serverless API entrypoint (`api/index.js`).
- **Database Tier**: MongoDB Atlas (`vanojanPortfolio` cluster) with offline fallback synchronization (`server/data/db.json`).
- **Cloud Storage**: Cloudinary Signed Asset Management & In-Memory Streaming Uploads.
- **Email Relay**: Nodemailer with Google App Password over SSL/TLS (`smtp.gmail.com:465`).
- **Cryptographic Security**: Bcrypt with 12 salt rounds, SHA-256 tokens for 15-minute single-use forgot-password links, sliding session rate-limiters.

---

## 🔑 Administrative Access

- **Admin Username**: `vanojanSE`
- **Initial Password Setup**:
  To initialize or change the admin password locally without ever exposing credentials:
  ```bash
  node server/setup-admin.js <your_secure_password>
  ```
  This hashes the passphrase using 12 rounds of bcrypt and updates both MongoDB Atlas and the local sync store.

---

## 📧 Gmail SMTP Integration (Nodemailer)

To enable automatic email notifications when visitors submit messages on the contact form, direct email replies from the Admin Inbox, and self-service Forgot Password reset links:

1. Enable **2-Step Verification** on your Google Account (`uthayanvanojan5@gmail.com`).
2. Generate an **App Password** (16 characters) under *Google Account > Security > 2-Step Verification > App passwords*.
3. Configure the following environment variables in your server `.env` or Vercel Project Settings:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_USER=uthayanvanojan5@gmail.com
   SMTP_PASS=your_16_char_google_app_password
   ADMIN_EMAIL=uthayanvanojan5@gmail.com
   APP_BASE_URL=https://portfolio-website-src.vercel.app
   ```

---

## 🖼️ Cloudinary Project Gallery System

Each showcase project supports:
- Main project showcase cover photo.
- Multi-screenshot gallery uploads with captions and detailed descriptions.
- Drag-and-drop reordering, replacement, deletion, and "Set as Cover" actions.
- Client-side full-screen lightbox modal with thumbnail navigation filmstrip and keyboard navigation (`Esc`, `ArrowLeft`, `ArrowRight`).

---

## 🚀 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start local backend API server (Port 5000)
node server/index.js

# 3. Start Vite frontend dev server (Port 5173)
npm run dev

# 4. Build for production
npm run build
```

---

## ☁️ Production Deployment on Vercel

1. Push code to your GitHub repository.
2. Link the repository to your Vercel project.
3. Configure Environment Variables in Vercel Dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_SECURE`
   - `SMTP_USER`
   - `SMTP_PASS`
   - `ADMIN_EMAIL`
   - `APP_BASE_URL`
4. Deploy. The project uses `vercel.json` with `@vercel/node` routing for `/api/*` and SPA static client routing.
