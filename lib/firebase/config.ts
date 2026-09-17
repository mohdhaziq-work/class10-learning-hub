/* Firebase config — from env. Without env the site runs 100% in local-first mode. */

/* The owner project's web-app config, embedded so every deployment (incl.
   Render without env vars) can use Firebase auth/sync out of the box.
   Web keys are public by design; access is restricted by authorized domains
   (class10-learning-hub.onrender.com etc.) in the Firebase console.
   Env vars, if present, still win. */
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAgghU_R88BvWvhezxIpWltZI2MK7KVr74",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "class10-learning-hub.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "class10-learning-hub",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "class10-learning-hub.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "527505626354",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:527505626354:web:71a5de41ad1ea60afa6c6b",
};

export const isFirebaseConfigured =
  Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);
