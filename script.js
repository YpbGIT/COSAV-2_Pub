document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById('searchInput');
    const tableHead = document.getElementById('table-head');
    const tableBody = document.getElementById('table-body');

    // Fonction pour charger et afficher les données
    window.loadDataSet = function(dataSetName) {
        fetch(`./Chargeur_Json/${dataSetName}.json`)
        .then(response => response.json())
        .then(data => {
            // Réinitialiser l'en-tête et le corps du tableau
            tableHead.innerHTML = '';
            tableBody.innerHTML = '';

            // Déterminer les clés à partir du premier objet (supposé que tous les objets ont les mêmes clés)
            const keys = Object.keys(data[0]);

            // Créer et insérer les en-têtes du tableau
            const headerRow = tableHead.insertRow();
            keys.forEach(key => {
                const headerCell = document.createElement('th');
                headerCell.textContent = key;
                headerRow.appendChild(headerCell);
            });

            // Créer et insérer les données dans le tableau
            data.forEach(item => {
                const row = tableBody.insertRow();
                keys.forEach(key => {
                    const cell = row.insertCell();
                    // Insérer la valeur de la clé si elle existe, sinon insérer une chaîne vide
                    cell.textContent = key in item ? item[key] : '';
                });
            });
        })
        .catch(error => {
            console.error('Error loading data:', error);
            // Afficher une ligne d'erreur qui s'étend sur toutes les colonnes
            tableBody.innerHTML = `<tr><td colspan="${keys.length}">Erreur lors du chargement des données.</td></tr>`;
        });
    };

    // Fonction de filtrage pour la recherche
    window.filterData = function() {
        const filter = searchInput.value.toUpperCase();
        const rows = tableBody.getElementsByTagName('tr');

        for (let i = 0; i < rows.length; i++) {
            let visible = false;
            const cells = rows[i].getElementsByTagName('td');
            for (let j = 0; j < cells.length; j++) {
                if (cells[j].textContent.toUpperCase().includes(filter)) {
                    visible = true;
                    break;
                }
            }
            rows[i].style.display = visible ? "" : "none";
        }
    };

    // Charger le premier ensemble de données par défaut
    loadDataSet('Data_1');
});
