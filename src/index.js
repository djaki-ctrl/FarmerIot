import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, deleteDoc, doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
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

// Initialisation de l'application Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
//const Authentication = firebase.auth();
// Obtenez une référence à la base de données Firestore
const db = getFirestore(app);

// Sélectionnez la référence à la collection "utilisateurs"
//const userRef = collection(db, "utilisateurs");

// Sélectionnez le formulaire d'ajout d'utilisateur
// Sélectionnez le formulaire d'ajout d'utilisateur
const addUserForm = document.querySelector(".Ajouter");
if (addUserForm) {
  
  const successMessage = document.createElement("div");
  successMessage.textContent = "Votre compte a été créé avec succès. Veuillez contacter le service technique.";
  successMessage.style.display = "none"; // Masquez-le par défaut
  successMessage.classList.add("success-message");
  document.body.appendChild(successMessage);
  // Ajoutez un écouteur d'événements pour le formulaire
  addUserForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Empêche le formulaire de faire une requête HTTP


    try {
      // Créer un compte utilisateur dans Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        addUserForm.email.value,
        addUserForm.password.value
      );
      const user = userCredential.user;

      // Créer un objet pour stocker les données de l'utilisateur
      const userData = {
        uid: user.uid,
        email: addUserForm.email.value,

        dateDajout: serverTimestamp(),
      };

      // Ajouter les champs facultatifs s'ils sont remplis
      if (addUserForm.nom && addUserForm.nom.value) {
        userData.nom = addUserForm.nom.value;
      }
      if (addUserForm.prenom && addUserForm.prenom.value) {
        userData.prenom = addUserForm.prenom.value;
      }
      if (addUserForm.role && addUserForm.role.value) {
        userData.role = addUserForm.role.value;
      }
      if (addUserForm.telephone && addUserForm.telephone.value) {
        userData.telephone = addUserForm.telephone.value;
      }
      if (addUserForm.adresse && addUserForm.adresse.value) {
        userData.adresse = addUserForm.adresse.value;
      }
      if (addUserForm.ville && addUserForm.ville.value) {
        userData.ville = addUserForm.ville.value;
      }

      // Ajoutez un document utilisateur à Firestore avec les données du formulaire
      const userDocRef = doc(db, "utilisateurs", user.uid);
      await setDoc(userDocRef, userData);

      // Réinitialiser le formulaire après l'ajout de l'utilisateur
      addUserForm.reset();

       // Afficher le message de succès
       successMessage.style.display = "block";


      location.reload();

      console.log("Utilisateur ajouté avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'utilisateur :", error);
    }
  });
} else {
  console.error(
    "Le formulaire d'ajout d'utilisateur n'a pas été trouvé."
  );
}



// Fonction pour afficher la liste des utilisateurs dans le tableau
// Function to display users
async function afficherListeUtilisateurs() {
  const userList = document.querySelector("#userList tbody");
  userList.innerHTML = ""; // Clear previous content
 
  let totalUsers = 0;
  let activeUsers = 0;
 
  try {
     const snapshot = await getDocs(collection(db, "utilisateurs"));
     snapshot.forEach((doc) => {
       const user = doc.data();
       const userRow = `
         <tr class="user" data-user-id="${doc.id}">
           <td class="username">${user.nom} ${user.prenom}</td>
           <td class="email">${user.email}</td>
           <td class="role">${user.role}</td>
           <td class="userActions">
             <button class="editBtn btn btn-info btn-action" data-toggle="modal" data-target="#editUserModal">Modifier</button>
             <button class="deleteBtn btn btn-danger btn-action" data-user-id="${doc.id}">Supprimer</button>
           </td>
         </tr>`;
       userList.innerHTML += userRow;
 
       totalUsers++; // Increment total users count
 
       // Assuming an "active" user has a "status" property set to "active"
       if (user.status === "active") {
         activeUsers++; // Increment active users count
       }
     });
 
     // Update the total users count in the UI
     document.getElementById("totalUsers").textContent = totalUsers;
 
     // Update the active users count in the UI
     document.getElementById("activeUsers").textContent = activeUsers;
 
  } catch (error) {
     console.error("Erreur lors de la récupération des utilisateurs :", error);
  }
 }
 
 
 // Attach event listeners to delete buttons
 function attachDeleteButtonListeners() {
  document.querySelector("#userList").addEventListener('click', function(event) {
     if (event.target.classList.contains('deleteBtn')) {
       const userId = event.target.getAttribute('data-user-id');
       supprimerUser(userId).catch(error => console.error("Erreur lors de l'appel de supprimerUser :", error));
     }
  });
 }
 
 // Function to delete a user
 async function supprimerUser(userId) {
  const confirmation = confirm("Voulez-vous vraiment supprimer cet utilisateur ?");
  if (confirmation) {
     try {
       await deleteDoc(doc(db, "utilisateurs", userId));
       console.log("Utilisateur supprimé avec succès !");
       afficherListeUtilisateurs(); // Update the list after deletion
     } catch (error) {
       console.error("Erreur lors de la suppression de l'utilisateur :", error);
     }
  }
 }
 
 // Attach event listeners to edit buttons
 document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('.editBtn').forEach(button => {
     button.addEventListener('click', function() {
       const userId = this.closest('.user').getAttribute('data-user-id');
       const userDoc = doc(db, "utilisateurs", userId);
   
       getDoc(userDoc).then((docSnapshot) => {
         if (docSnapshot.exists()) {
           const userData = docSnapshot.data();
           console.log(userData);
   
           // Populate the modal form with user data
           document.querySelector('#editUsername').value = userData.nom;
           document.querySelector('#editEmail').value = userData.email;
           document.querySelector('#editRole').value = userData.role;
           // Add a hidden input field to store the user ID
           document.querySelector('#editUserForm').insertAdjacentHTML('beforeend', `<input type="hidden" id="userId" name="userId" value="${userId}">`);
   
           // Show the modal
           $('#editUserModal').modal('show');
         } else {
           console.log("No such document!");
         }
       }).catch((error) => {
         console.log("Error getting document:", error);
       });
     });
  });
 });
 
 
 
 // Function to handle the form submission for updating the user's data
 document.querySelector('#editUserForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const userId = document.querySelector('#userId').value;
  const userDoc = doc(db, "utilisateurs", userId);
  
  try {
      await updateDoc(userDoc, {
        nom: document.querySelector('#editUsername').value,
        email: document.querySelector('#editEmail').value,
        role: document.querySelector('#editRole').value,
      });
  
      // Update the user's password
      const newPassword = document.querySelector('#editPassword').value;
      if (newPassword) {
        // Assuming you have access to the Firebase Admin SDK
        const userRecord = await getUser(auth, userId);
        await updateUser(auth, userId, {
          password: newPassword,
        });
      }
  
      console.log("Utilisateur modifié avec succès !");
      // Optionally, refresh the user list to reflect the changes
      afficherListeUtilisateurs();
  } catch (error) {
      console.error("Erreur lors de la modification de l'utilisateur :", error);
  }
 });
 
 
 
 // Call the function to display users
 afficherListeUtilisateurs().then(() => {
  attachDeleteButtonListeners(); // Attach event listeners after the list is updated
 });

// Initialize Firebase (assuming you have already done this elsewhere in your application)
// firebase.initializeApp(firebaseConfig);
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

 const logoutbtn =document.querySelector(".logout-btn");
 logoutbtn.addEventListener("click", () =>{
  signOut(auth)
  .then(() => console.log("utilisateur deconnecter"))
  .catch((err) => console.log(err.message));
 });

 
 // Fonction pour basculer la visibilité du mot de passe
 function togglePasswordVisibility() {
  const passwordInput = document.getElementById('password');
  const toggleButton = document.querySelector('.toggle-password');
 
  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;
 
  toggleButton.classList.toggle('fa-eye-slash');
  toggleButton.classList.toggle('fa-eye');
 }

 function createSession(userId) {
  const sessionRef = db.collection('sessions').doc();
  sessionRef.set({
     userId: userId,
     createdAt: firebase.firestore.FieldValue.serverTimestamp(),
     // Ajoutez d'autres informations de session si nécessaire
  })
  .then(() => {
     console.log("Session créée avec succès");
  })
  .catch((error) => {
     console.error("Erreur lors de la création de la session: ", error);
  });
 }
 function checkActiveSession(userId) {
  const sessionsRef = db.collection('sessions');
  sessionsRef.where('userId', '==', userId).get()
     .then((querySnapshot) => {
       if (!querySnapshot.empty) {
         // Une session active existe déjà
         console.log("Session active trouvée");
         // Gérez la situation comme vous le souhaitez
       } else {
         // Aucune session active trouvée, créez une nouvelle session
         createSession(userId);
       }
     })
     .catch((error) => {
       console.error("Erreur lors de la vérification des sessions: ", error);
     });
 }
 const logoutBtn = document.getElementById('logoutBtn');
 if (logoutBtn) {
     logoutBtn.addEventListener('click', function () {
         // Logique de déconnexion
         firebase.auth().signOut().then(() => {
             // Redirection vers la page de connexion
             window.location.href = 'connexion.html';
         }).catch((error) => {
             // Gérer les erreurs de déconnexion
             console.error("Erreur lors de la déconnexion: ", error);
         });
     });
 }
