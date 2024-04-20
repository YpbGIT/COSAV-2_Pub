document.addEventListener("DOMContentLoaded", function() {
    fetch('./Chargeur_Json/data.json')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
        data.forEach(item => {
            const row = tableBody.insertRow();
            Object.keys(item).forEach(key => {
                const cell = row.insertCell();
                cell.textContent = item[key];
            });
        });

        window.filterData = function() {
            const input = document.getElementById('searchInput');
            const filter = input.value.toUpperCase();
            const tr = tableBody.getElementsByTagName('tr');

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
    })
    .catch(error => console.error('Error loading the data:', error));
});
