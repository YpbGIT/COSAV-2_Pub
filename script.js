document.addEventListener("DOMContentLoaded", function() {
    loadData('Data_1.json'); // Chargez le premier ensemble de données par défaut
});

function loadData(dataSet) {
    fetch(`./Chargeur_Json/${dataSet}`)
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = ''; // Vide le contenu actuel du tableau
        data.forEach(item => {
            const row = tableBody.insertRow();
            Object.keys(item).forEach(key => {
                const cell = row.insertCell();
                cell.textContent = item[key];
            });
        });
    })
    .catch(error => {
        console.error('Erreur lors du chargement des données:', error);
    });
}

window.filterData = function() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toUpperCase();
    const tr = document.getElementById('dataTable').getElementsByTagName('tr');

    for (let i = 0; i < tr.length; i++) {
        let visible = false;
        const td = tr[i].getElementsByTagName('td');
        for (let j = 0; j < td.length; j++) {
            if (td[j].textContent.toUpperCase().indexOf(filter) > -1) {
                visible = true;
                break;
            }
        }
        tr[i].style.display = visible ? "" : "none";
    }
};
