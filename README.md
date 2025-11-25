
# Pet Care — README

## Short project description
**Pet Care in Winter** helps pet owners keep their pets safe, warm, and healthy during winter.
It provides grooming & nutrition tips, weather protection, and easy recommendations.

**Live demo:** https://pet-care-next.vercel.app/

---

## Setup & installation

```bash
git clone <your-repo-url>
cd pet-care
npm install
npm run dev
```

---

## Environment variables

Create `.env.local` with:

```env
NEXT_PUBLIC_API_URL=https://smart-deals-server-sz.vercel.app

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=app_id
```

---

## Scripts

- npm run dev
- npm run build
- npm run start
- npm run server
- npm run lint

---

## Route Summary

### Public routes
- `/` — Home
- `/login` — Login
- `/register` — Register

### Private routes
- `/services` — Pet services
- `/profile` — User dashboard (protected)

---

## Backend notes
Backend is deployed separately.  
Set `NEXT_PUBLIC_API_URL` to match your backend deployment.

