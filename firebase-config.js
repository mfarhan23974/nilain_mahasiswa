// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAR-xmIv7FOizd2yfmWV710pRLomX99iSs",
  authDomain: "webmahasiswa-cdf7a.firebaseapp.com",
  projectId: "webmahasiswa-cdf7a",
  storageBucket: "webmahasiswa-cdf7a.firebasestorage.app",
  messagingSenderId: "558080601615",
  appId: "1:558080601615:web:193cd91062b792ae5dfd7a"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
