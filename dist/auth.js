// Assurez-vous d'avoir importé et initialisé Firebase dans ce fichier
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, deleteDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAuppdI3nS-GDaM7wC1uB9mhIzonB1STNE",
  authDomain: "esp32firebase-cac38.firebaseapp.com",
  databaseURL: "https://esp32firebase-cac38-default-rtdb.firebaseio.com",
  projectId: "esp32firebase-cac38",
  storageBucket: "esp32firebase-cac38.appspot.com",
  messagingSenderId: "904491983155",
  appId: "1:904491983155:web:9278c9a444cc75eecdde46"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Assurez-vous que firebase est correctement initialisé

const loginForm = document.querySelector(".login");
loginForm.addEventListener('submit', (e)=> {
 e.preventDefault();

 const email = loginForm.email.value;
 const password = loginForm.password.value;

 console.log("Email:", email, "Password:", password); // Pour vérifier les valeurs

 signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("l'utilisateur est connecter :", userCredential.user);
          loginForm.reset();
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("Erreur de connexion :", errorMessage);
          // Gestion des erreurs spécifiques
          if (errorCode === 'auth/wrong-password') {
            console.log('Mot de passe incorrect.');
          } else {
            console.log(errorMessage);
          }
        });
});

const logoutbtn = document.querySelector(".logout-btn");
logoutbtn.addEventListener("click", () => {
 signOut(auth)
 .then(() => console.log("utilisateur deconnecter"))
 .catch((err) => console.log(err.message));
});
