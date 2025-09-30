const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const dataFilePath = path.join(__dirname, 'src', 'data', 'data.json');

// Helper function to read data
function readData() {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading data file:', error);
        return { clients: [], plans: [], classes: [] };
    }
}

// Helper function to write data
function writeData(data) {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing data file:', error);
    }
}

// Initialize data file if it doesn't exist or is empty
if (!fs.existsSync(dataFilePath) || fs.readFileSync(dataFilePath, 'utf8').trim() === '') {
    writeData({
        clients: [
            { id: 1, name: 'Ana Clara Souza', age: 28, objective: 'Hipertrofia', status: 'Ativo' },
            { id: 2, name: 'Bruno Gomes', age: 35, objective: 'Perda de Peso', status: 'Ativo' },
            { id: 3, name: 'Carla Martins', age: 42, objective: 'Condicionamento', status: 'Inativo' }
        ],
        plans: [],
        classes: []
    });
}

// API Endpoints
app.get('/api/dashboard', (req, res) => {
    const data = readData();
    res.json({
        activeClients: data.clients.filter(c => c.status === 'Ativo').length,
        registeredPlans: data.plans.length,
        scheduledClasses: data.classes.length, // Assuming this is for the week
        newNotifications: 5 // Placeholder
    });
});

app.get('/api/clients', (req, res) => {
    const data = readData();
    res.json(data.clients);
});

app.post('/api/clients', (req, res) => {
    const data = readData();
    const newClient = {
        id: data.clients.length > 0 ? Math.max(...data.clients.map(c => c.id)) + 1 : 1,
        ...req.body,
        status: 'Ativo' // Default status for new clients
    };
    data.clients.push(newClient);
    writeData(data);
    res.status(201).json(newClient);
});

app.put('/api/clients/:id', (req, res) => {
    const data = readData();
    const clientId = parseInt(req.params.id);
    const clientIndex = data.clients.findIndex(c => c.id === clientId);

    if (clientIndex > -1) {
        data.clients[clientIndex] = { ...data.clients[clientIndex], ...req.body };
        writeData(data);
        res.json(data.clients[clientIndex]);
    } else {
        res.status(404).json({ message: 'Client not found' });
    }
});

app.delete('/api/clients/:id', (req, res) => {
    const data = readData();
    const clientId = parseInt(req.params.id);
    const initialLength = data.clients.length;
    data.clients = data.clients.filter(c => c.id !== clientId);

    if (data.clients.length < initialLength) {
        writeData(data);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Client not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});