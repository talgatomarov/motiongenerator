import firebase from "firebase/app";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCQ43yRZaNL1qi9RFEDavrken9r53xtRFU",
  authDomain: "motiongenerator.firebaseapp.com",
  databaseURL: "https://motiongenerator.firebaseio.com",
  projectId: "motiongenerator",
  storageBucket: "motiongenerator.appspot.com",
  messagingSenderId: "685271605729",
  appId: "1:685271605729:web:8d119bfdb93eacbadaf2a0",
  measurementId: "G-P6ZDH1HQ2V",
};

const app = firebase.initializeApp(firebaseConfig);

export const analytics = firebase.analytics();
export default app;
