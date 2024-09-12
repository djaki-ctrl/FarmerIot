// Fonction pour créer un graphique interactif avec des options personnalisées
function createInteractiveChart(chartId, label, data, backgroundColor, borderColor, textColor) {
    return new Chart(document.getElementById(chartId), {
        type: 'line',
        data: {
            labels: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'], // Utiliser les jours de la semaine
            datasets: [{
                label: label,
                data: data,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontColor: textColor // Couleur du texte de l'axe y
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: textColor // Couleur du texte de l'axe x
                    }
                }]
            },
            legend: {
                labels: {
                    fontColor: textColor // Couleur du texte de la légende
                }
            },
            tooltips: {
                mode: 'index',
                intersect: false,
                backgroundColor: 'rgba(255, 255, 255, 0.7)', // Couleur de l'arrière-plan du tooltip
                titleFontColor: 'black', // Couleur du texte du titre du tooltip
                bodyFontColor: 'black' // Couleur du texte du corps du tooltip
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                zoom: {
                    pan: {
                        enabled: true,
                        mode: 'xy'
                    },
                    zoom: {
                        enabled: true,
                        mode: 'xy'
                    }
                }
            }
        }
    });
}

// Fonction pour récupérer les données de l'API PipeDream
async function fetchDataFromAPI() {
    try {
        const response = await fetch('');
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données de l\'API');
        }
        const data = await response.json();
        console.log(data);

        // Mettez à jour les données des graphiques avec les données récupérées
        temperatureChart.data.datasets[0].data = data.temperature;
        lightIntensityChart.data.datasets[0].data = data.lightIntensity;
        soilMoistureChart.data.datasets[0].data = data.soilMoisture;
        gasConcentrationChart.data.datasets[0].data = data.gasConcentration;

        // Mettez à jour les graphiques
        temperatureChart.update();
        lightIntensityChart.update();
        soilMoistureChart.update();
        gasConcentrationChart.update();
    } catch (error) {
        console.error('Erreur:', error.message);
        // Gérer l'erreur ici, par exemple, afficher un message à l'utilisateur
    }
}

// Création des graphiques avec des données factices
var temperatureChart = createInteractiveChart(
    'temperatureChart',
    'Température (°C)',
    [22, 22, 23, 25, 27, 30, null], // Remplacer null par les données du capteur
    'rgba(255, 255, 255, 0.2)', // Arrière-plan blanc avec une faible opacité
    'rgba(255, 255, 255, 1)', // Bordure blanche
    'white' // Texte en blanc
);

var lightIntensityChart = createInteractiveChart(
    'lightIntensityChart',
    'Intensité Lumineuse (lux)',
    [500, 800, 700, 800, 800, 1000, null], // Remplacer null par les données du capteur
    'rgba(255, 255, 255, 0.2)',
    'rgba(255, 255, 255, 1)',
    'white'
);

var soilMoistureChart = createInteractiveChart(
    'soilMoistureChart',
    'Humidité du Sol (%)',
    [20, 25, 30, 35, 40, null, null], // Remplacer null par les données du capteur
    'rgba(255, 255, 255, 0.2)',
    'rgba(255, 255, 255, 1)',
    'white'
);

var gasConcentrationChart = createInteractiveChart(
    'gasConcentrationChart',
    'Concentration de Gaz (ppm)',
    [100, 120, 140, 160, null, null, null], // Remplacer null par les données du capteur
    'rgba(255, 255, 255, 0.2)',
    'rgba(255, 255, 255, 1)',
    'white'
);

// Mettre à jour les graphiques avec les données de l'API toutes les 5 secondes
setInterval(fetchDataFromAPI, 5000);

// Simulation de récupération de données depuis une API fictive (valeurs aléatoires)
setInterval(function() {
    var temperatureData = [Math.random() * 10 + 20, Math.random() * 10 + 20, Math.random() * 10 + 20, Math.random() * 10 + 20, Math.random() * 10 + 20, Math.random() * 10 + 20, null];
    var lightIntensityData = [Math.random() * 300 + 500, Math.random() * 500 + 800, Math.random() * 400 + 700, Math.random() * 500 + 800, Math.random() * 200 + 800, Math.random() * 200 + 1000, null];
    var soilMoistureData = [Math.random() * 10 + 20, Math.random() * 10 + 25, Math.random() * 10 + 30, Math.random() * 10 + 35, Math.random() * 10 + 40, null, null];
    var gasConcentrationData = [Math.random() * 50 + 100, Math.random() * 50 + 120, Math.random() * 50 + 140, Math.random() * 50 + 160, null, null, null];

    temperatureChart.data.datasets[0].data = temperatureData;
    lightIntensityChart.data.datasets[0].data = lightIntensityData;
    soilMoistureChart.data.datasets[0].data = soilMoistureData;
    gasConcentrationChart.data.datasets[0].data = gasConcentrationData;

    temperatureChart.update();
    lightIntensityChart.update();
    soilMoistureChart.update();
    gasConcentrationChart.update();
}, 5000); // Mettre à jour toutes les 5 secondes
