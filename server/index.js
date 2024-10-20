import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener __dirname en un módulo ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Ruta para obtener todos los contactos
app.get('/api/contacts', (req, res) => {
    fs.readFile(path.join(__dirname, 'contacts.json'), 'utf8', (err, data) => {
        if (err) return res.status(500).send(err);
        res.send(JSON.parse(data));
    });
});

// Ruta para obtener un contacto por ID
app.get('/api/contacts/:id', (req, res) => {
    fs.readFile(path.join(__dirname, 'contacts.json'), 'utf8', (err, data) => {
        if (err) return res.status(500).send(err);
        const contacts = JSON.parse(data);
        const contact = contacts.find(c => c.id === parseInt(req.params.id));
        if (!contact) return res.status(404).send('Contacto no encontrado');
        res.send(contact);
    });
});

// Ruta para agregar un nuevo contacto
app.post('/api/contacts', (req, res) => {
    fs.readFile(path.join(__dirname, 'contacts.json'), 'utf8', (err, data) => {
        if (err) return res.status(500).send(err);
        const contacts = JSON.parse(data);
        const newContact = {
            id: contacts.length ? contacts[contacts.length - 1].id + 1 : 1,
            ...req.body,
        };
        contacts.push(newContact);
        fs.writeFile(path.join(__dirname, 'contacts.json'), JSON.stringify(contacts, null, 2), (err) => {
            if (err) return res.status(500).send(err);
            res.status(201).send(newContact);
        });
    });
});

// Ruta para actualizar un contacto
app.put('/api/contacts/:id', (req, res) => {
    fs.readFile(path.join(__dirname, 'contacts.json'), 'utf8', (err, data) => {
        if (err) return res.status(500).send(err);
        const contacts = JSON.parse(data);
        const contactIndex = contacts.findIndex(c => c.id === parseInt(req.params.id));
        if (contactIndex === -1) return res.status(404).send('Contacto no encontrado');

        contacts[contactIndex] = { id: parseInt(req.params.id), ...req.body };
        fs.writeFile(path.join(__dirname, 'contacts.json'), JSON.stringify(contacts, null, 2), (err) => {
            if (err) return res.status(500).send(err);
            res.send(contacts[contactIndex]);
        });
    });
});

// Ruta para borrar un contacto
app.delete('/api/contacts/:id', (req, res) => {
    fs.readFile(path.join(__dirname, 'contacts.json'), 'utf8', (err, data) => {
        if (err) return res.status(500).send(err);
        let contacts = JSON.parse(data);
        contacts = contacts.filter(c => c.id !== parseInt(req.params.id));
        fs.writeFile(path.join(__dirname, 'contacts.json'), JSON.stringify(contacts, null, 2), (err) => {
            if (err) return res.status(500).send(err);
            res.status(204).send();
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
