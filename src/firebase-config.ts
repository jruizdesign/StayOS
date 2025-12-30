import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAI, getGenerativeModel, GoogleAIBackend } from 'firebase/ai';

const firebaseConfig = {
  apiKey: "AIzaSyAjy0c23LT9SztfJecn0CtXkQXYIsurXSc",
  authDomain: "gen-lang-client-0876167477.firebaseapp.com",
  projectId: "gen-lang-client-0876167477",
  storageBucket: "gen-lang-client-0876167477.firebasestorage.app",
  messagingSenderId: "722882714614",
  appId: "1:722882714614:web:c1431c85a703ac480e05d7",
  measurementId: "G-T4JF04RTD1"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Services
export const db = getFirestore(app);

// Initialize Vertex AI
const ai = getAI(app, { backend: new GoogleAIBackend() });
export const model = getGenerativeModel(ai, { model: "gemini-2.5-flash" });

export default app;
