import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';

import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, query, where  } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js';

import firebaseConfig from "./firebaseConfig.js";

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {app, db, doc, setDoc, getDoc, updateDoc, collection, query, where };