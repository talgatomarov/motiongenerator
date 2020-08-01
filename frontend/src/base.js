import firebase from "firebase/app";
import "firebase/analytics";

const firebaseConfig = JSON.parse(JSON.stringify(process.env.FIREBASE_CONFIG));
const app = firebase.initializeApp(firebaseConfig);

export const analytics = firebase.analytics();
export default app;
