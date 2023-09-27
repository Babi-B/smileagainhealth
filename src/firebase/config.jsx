// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFireStore, collection, getDocs } from "firebase/firestore"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXgIsSO1nLXbXTFV5p8ZJaSw6rRfdA1H0",
  authDomain: "smileagainhealth.firebaseapp.com",
  projectId: "smileagainhealth",
  storageBucket: "smileagainhealth.appspot.com",
  messagingSenderId: "749000002314",
  appId: "1:749000002314:web:9ec5e975be6d962fab08f3",
  measurementId: "G-SPDY1KWDPR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize service
const firestoreDB = getFireStore()

// Collection Reference
const colRef = collection(firestoreDB, "staff")

// Get Collection Data
getDocs(colRef).then((snapshot) => {
  console.log(snapshot.docs)
})
