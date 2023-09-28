import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCXgIsSO1nLXbXTFV5p8ZJaSw6rRfdA1H0",
  authDomain: "smileagainhealth.firebaseapp.com",
  databaseURL: "https://smileagainhealth-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "smileagainhealth",
  storageBucket: "smileagainhealth.appspot.com",
  messagingSenderId: "749000002314",
  appId: "1:749000002314:web:9ec5e975be6d962fab08f3",
  measurementId: "G-SPDY1KWDPR"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);