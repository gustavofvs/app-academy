export async function initClientManagement() {
    const clientTableBody = document.getElementById('clientTableBody');
    const searchInput = document.getElementById('clientSearch');
    const addClientModal = new bootstrap.Modal(document.getElementById('addClientModal'));
    const addClientForm = document.querySelector('#addClientModal form');

    let clients = [];

    async function fetchClients() {
        try {
            const response = await fetch('http://localhost:3000/api/clients');
            clients = await response.json();
            renderClientTable();
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    }

    function renderClientTable(filter = '') {
        clientTableBody.innerHTML = '';
        const filteredClients = clients.filter(client =>
            client.name.toUpperCase().includes(filter)
        );

        filteredClients.forEach(client => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${client.name}</td>
                <td>${client.age}</td>
                <td>${client.objective}</td>
                <td><span class="badge bg-${client.status === 'Ativo' ? 'success' : 'warning'}">${client.status}</span></td>
                <td>
                    <button class="btn btn-sm btn-link text-decoration-none view-client" data-id="${client.id}" style="color:var(--primary-color)"><i class="bi bi-eye-fill"></i></button>
                    <button class="btn btn-sm btn-link text-decoration-none edit-client" data-id="${client.id}" style="color:var(--warning-color)"><i class="bi bi-pencil-fill"></i></button>
                    <button class="btn btn-sm btn-link text-decoration-none delete-client" data-id="${client.id}" style="color:var(--danger-color)" data-bs-toggle="modal" data-bs-target="#deleteModal"><i class="bi bi-trash-fill"></i></button>
                </td>
            `;
            clientTableBody.appendChild(row);
        });
    }

    searchInput.addEventListener('keyup', function() {
        const filter = searchInput.value.toUpperCase();
        renderClientTable(filter);
    });

    addClientForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const newClient = {
            name: this.querySelector('input[type="text"]').value,
            email: this.querySelector('input[type="email"]').value,
            phone: this.querySelector('input[type="tel"]').value,
            objective: this.querySelector('select').value,
            medicalHistory: this.querySelector('textarea').value,
            // photo: this.querySelector('input[type="file"]').files[0] // Handle file upload separately
        };

        try {
            const response = await fetch('http://localhost:3000/api/clients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newClient)
            });
            const addedClient = await response.json();
            clients.push(addedClient);
            renderClientTable();
            addClientModal.hide();
            addClientForm.reset();
        } catch (error) {
            console.error('Error adding client:', error);
        }
    });

    // Initial fetch
    fetchClients();
}