document.addEventListener("DOMContentLoaded", function() {
    const dataSelect = document.getElementById('dataSelect');
    dataSelect.addEventListener('change', loadSelectedData);

    // Charge initialement le premier jeu de données
    loadSelectedData();

    function loadSelectedData() {
        const selectedFile = dataSelect.value;
        const filePath = './Chargeur_Json/' + selectedFile;
        fetch(filePath)
        .then(response => response.json())
        .then(data => {
            const tableHead = document.getElementById('tableHead');
            const tableBody = document.getElementById('tableBody');
            tableBody.innerHTML = ''; // Vider le corps du tableau
            tableHead.innerHTML = ''; // Vider les entêtes du tableau

            // Remplir les entêtes de tableau
            if(data.length > 0) {
                const headers = Object.keys(data[0]);
                headers.forEach(header => {
                    let th = document.createElement('th');
                    th.textContent = header;
                    tableHead.appendChild(th);
                });
            }

            // Remplir les lignes de données
            data.forEach(rowData => {
                const row = tableBody.insertRow();
                Object.values(rowData).forEach(text => {
                    const cell = row.insertCell();
                    cell.textContent = text;
                });
            });
        })
        .catch(error => {
            console.error('Erreur lors du chargement des données:', error);
            tableBody.innerHTML = '<tr><td colspan="100%">Erreur lors du chargement des données.</td></tr>';
        });
    }

    window.filterData = function() {
        const input = document.getElementById('searchInput');
        const filter = input.value.toUpperCase();
        const tr = tableBody.getElementsByTagName('tr');

        for (let i = 0; i < tr.length; i++) {
            tr[i].style.display = "none";
            const td = tr[i].getElementsByTagName('td');
            for (let j = 0; j < td.length; j++) {
                if (td[j].textContent.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    break;
                }
            }
        }
    };
});
