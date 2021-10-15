
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBadUdd4c2TSMOtLUUlPCYKcjTm5_JbEHI",
    authDomain: "todo-app-ce19d.firebaseapp.com",
    projectId: "todo-app-ce19d",
    storageBucket: "todo-app-ce19d.appspot.com",
    messagingSenderId: "718949542187",
    appId: "1:718949542187:web:0f00d6c1db3acd9ff67d6e",
    measurementId: "G-0XBF47P0X0"
});


const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {auth, storage };
export default db;