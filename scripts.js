document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('dataEntryForm');
    const response = document.getElementById('response');
    const dataTable = document.getElementById('dataTable').querySelector('tbody');
    
    // Load stored entries
    loadEntries();

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(this);
        const entry = Object.fromEntries(formData);
        
        saveEntry(entry);
        addRowToTable(entry);
        this.reset();
        response.textContent = 'Data submitted successfully!';
    });

    function saveEntry(entry) {
        const entries = getEntries();
        entries.push(entry);
        localStorage.setItem('entries', JSON.stringify(entries));
    }

    function getEntries() {
        const entries = localStorage.getItem('entries');
        return entries ? JSON.parse(entries) : [];
    }

    function loadEntries() {
        const entries = getEntries();
        entries.forEach(entry => addRowToTable(entry));
    }

    function addRowToTable(entry) {
        const row = dataTable.insertRow();
        row.insertCell(0).textContent = entry.name;
        row.insertCell(1).textContent = entry.email;
        row.insertCell(2).textContent = entry.phone;
        row.insertCell(3).textContent = entry.address;
        row.insertCell(4).textContent = entry.role;
        const actionsCell = row.insertCell(5);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');
        deleteButton.onclick = () => {
            row.remove();
            deleteEntry(entry);
        };
        actionsCell.appendChild(deleteButton);
    }

    function deleteEntry(entry) {
        let entries = getEntries();
        entries = entries.filter(e => e.email !== entry.email);
        localStorage.setItem('entries', JSON.stringify(entries));
    }
});

