document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('dataSelector').addEventListener('change', function() {
        loadJsonData(this.value);
    });

    function loadJsonData(jsonFile) {
        fetch(jsonFile)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('dataTable');
            tableBody.innerHTML = ''; // Clear the table first
            data.forEach(item => {
                const row = tableBody.insertRow();
                Object.keys(item).forEach(key => {
                    const cell = row.insertCell();
                    cell.textContent = item[key];
                });
            });
        })
        .catch(error => console.error('Error loading the data:', error));
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

    // Load initial data set
    loadJsonData('Chargeur_Json/Data_1.json'); // Load the first dataset by default
});
