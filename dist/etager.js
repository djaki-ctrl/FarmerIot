// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAuppdI3nS-GDaM7wC1uB9mhIzonB1STNE",
    authDomain: "esp32firebase-cac38.firebaseapp.com",
    databaseURL: "https://esp32firebase-cac38-default-rtdb.firebaseio.com",
    projectId: "esp32firebase-cac38",
    storageBucket: "esp32firebase-cac38.appspot.com",
    messagingSenderId: "904491983155",
    appId: "1:904491983155:web:9278c9a444cc75eecdde46"
};

// Initialiser Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Référence à la base de données
const sensorDataRef = database.ref('sensorData');

// Fonction pour mettre à jour la table avec les données de Firebase
function updateTable(data) {
    const tableBody = document.getElementById('data-table');
    tableBody.innerHTML = ''; // Effacer les anciennes données

    data.forEach(item => {
        const row = document.createElement('tr');
        const articleCell = document.createElement('td');
        const availabilityCell = document.createElement('td');

        articleCell.textContent = item.key;
        availabilityCell.textContent = item.val() ? 'Présent' : 'Absent';

        row.appendChild(articleCell);
        row.appendChild(availabilityCell);
        tableBody.appendChild(row);
    });
}

// Écouter les changements dans la base de données
sensorDataRef.on('value', (snapshot) => {
    const data = [];
    snapshot.forEach((childSnapshot) => {
        data.push({ key: childSnapshot.key, val: childSnapshot.val() });
    });
    updateTable(data);
});
