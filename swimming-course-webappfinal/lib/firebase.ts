import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyABweOYLYz5FArcdKP6lrmIp4md1v5-YJ0",
  authDomain: "swimmingcourse-933fe.firebaseapp.com",
  projectId: "swimmingcourse-933fe",
  storageBucket: "swimmingcourse-933fe.firebasestorage.app",
  messagingSenderId: "852003594187",
  appId: "1:852003594187:web:4570fdbc12836c825d204e",
  measurementId: "G-FJWGL8VSNN"
};

export const APP_ID = FIREBASE_CONFIG.appId.split(':')[3];

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

export const initializeFirebase = () => {
  if (!app) {
    app = initializeApp(FIREBASE_CONFIG);
    auth = getAuth(app);
    db = getFirestore(app);
  }
  return { app, auth, db };
};

export const getFirebaseAuth = () => {
  if (!auth) {
    initializeFirebase();
  }
  return auth;
};

export const getFirebaseDb = () => {
  if (!db) {
    initializeFirebase();
  }
  return db;
};
