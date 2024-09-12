const admin = require('firebase-admin');

// Initialiser Firebase Admin avec votre configuration de projet
const serviceAccount = require('./fir-691e8-firebase-adminsdk-bjm1c-51cdd1be0b.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fir-691e8-default-rtdb.firebaseio.com" // Remplacez par l'URL de votre base de données
   });

const db = admin.database();

// Fonction pour simuler l'envoi de données
function simulateData() {
 const sensorDataRef = db.ref('sensorData');

 // Exemple de données à envoyer
 const data = {
    temperature: Math.random() * (30 - 26) + 26,// Générer une température aléatoire entre 0 et 100
    lightIntensity: Math.random() * 1000000, // Générer une intensité lumineuse aléatoire entre 0 et 1000
    soilMoisture: Math.random() * 60, // Générer une humidité du sol aléatoire entre 0 et 100
    gasConcentration: Math.random() * 400 // Générer une concentration de gaz aléatoire entre 0 et 1000
 };

 // Envoyer les données à Firebase
 sensorDataRef.push(data, function(error) {
    if (error) {
      console.log("Erreur lors de l'envoi des données :", error);
    } else {
      console.log("Données envoyées avec succès :", data);
    }
 });
}

// Simuler l'envoi de données toutes les 10 secondes
setInterval(simulateData, 10000);
