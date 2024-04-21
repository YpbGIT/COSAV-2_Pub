document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById('searchInput');
    const tableHead = document.getElementById('table-head');
    const tableBody = document.getElementById('table-body');

    // Fonction pour charger et afficher les données
    window.loadDataSet = function(dataSetName) {
        fetch(`./Chargeur_Json/${dataSetName}.json`)
        .then(response => response.json())
        .then(data => {
            tableHead.innerHTML = ''; // Réinitialiser l'en-tête du tableau
            tableBody.innerHTML = ''; // Réinitialiser le corps du tableau

            // Créer et insérer les en-têtes du tableau
            const headerRow = tableHead.insertRow();
            Object.keys(data[0]).forEach(key => {
                const headerCell = document.createElement('th');
                headerCell.textContent = key;
                headerRow.appendChild(headerCell);
            });

            // Créer et insérer les données dans le tableau
            data.forEach(item => {
                const row = tableBody.insertRow();
                Object.keys(item).forEach(key => {
                    const cell = row.insertCell();
                    cell.textContent = item[key];
                });
            });
        })
        .catch(error => {
            console.error('Error loading data:', error);
            tableBody.innerHTML = `<tr><td colspan="3">Erreur lors du chargement des données.</td></tr>`;
        });
    };

    // Fonction de filtrage de la recherche
    window.filterData = function() {
        const filter = searchInput.value.toUpperCase();
        const rows = tableBody.getElementsByTagName('tr');

        for (let i = 0; i < rows.length; i++) {
            let visible = false;
            const cells = rows[i].getElementsByTagName('td');
            for (let j = 0; j < cells.length; j++) {
                if (cells[j].textContent.toUpperCase().indexOf(filter) > -1) {
                    visible = true;
                    break;
                }
            }
            rows[i].style.display = visible ? "" : "none";
        }
    };

    // Chargez le premier ensemble de données par défaut
    loadDataSet('Data_1');
});
