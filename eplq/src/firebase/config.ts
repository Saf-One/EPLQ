import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBaJqiTEAfy6sLP7oOivK8Jke6nCq0uuhQ",
  authDomain: "eplq-location-query.firebaseapp.com",
  projectId: "eplq-location-query",
  storageBucket: "eplq-location-query.firebasestorage.app",
  messagingSenderId: "991922172505",
  appId: "1:991922172505:web:6dd7c97a5e48831e05b748"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

