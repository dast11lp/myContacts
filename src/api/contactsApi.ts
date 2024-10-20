import { createAsyncThunk } from "@reduxjs/toolkit"
import { NewContact } from "../types/contact.type";

const API_URL = 'http://localhost:5000/api/'

////////////////////////////////////////////////////////////
/// fetchAllContacts

const fetchListContacts = async () => {
    try {
        const response = await fetch(`${API_URL}contacts`);
        if (!response.ok) throw new Error('Error al obtener contactos');
        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error fetching contacts:', error);
    }
};

export const thunkListContacts = createAsyncThunk(
    '/ contacts',
    async () => {
        const request = await fetchListContacts()

        return request;
    }
)

///////////////////////////////////////
// addContact

const addContact = async (newContact: NewContact) => {
    try {
        const response = await fetch(`${API_URL}contacts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newContact)
        });
        if (!response.ok) throw new Error('Error al agregar contacto');
        const addedContact = await response.json();
        return addedContact;
    } catch (error) {
        console.error('Error adding contact:', error);
    }
};

export const thunkAddContact = createAsyncThunk(
    '/ contacts',
    async (newContact: NewContact) => {
        const request = await addContact(newContact)

        return request;
    }
)

///////////////////////////////////////
/// get one contact

const fetchContactById = async (id: number) => {
    try {
        const response = await fetch(`${API_URL}contacts/${id}`);
        if (!response.ok) throw new Error('Error al obtener el contacto');
        const contact = await response.json();
        return contact;
    } catch (error) {
        console.error('Error fetching contact:', error);
    }
};

export const thunkContactById = createAsyncThunk(
    '/api/contacts/:id',
    async (id: number) => {
        const request = await fetchContactById(id)
        return request;
    }
)

///////////////////////////////////
/// update single contact

const updateContact = async (id: number, updatedContact: NewContact) => {
    try {
        const response = await fetch(`${API_URL}contacts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedContact)
        });
        if (!response.ok) throw new Error('Error al actualizar contacto');
        const contact = await response.json();
        return contact;
    } catch (error) {
        console.error('Error updating contact:', error);
    }
};

export const ThunkUpdateContact = createAsyncThunk(
    '/api/contacts/:id',
    async ({ id, contact }: { id: number; contact: NewContact }) => {
        const request = await updateContact(id, contact);
        return request;
    }
);

///////////////////////////
//// delete contact

const deleteContact = async (id: number) => {
    try {
        const response = await fetch(`${API_URL}contacts/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Error al eliminar contacto');
        return true; // Confirmación de eliminación
    } catch (error) {
        console.error('Error deleting contact:', error);
    }
};

export const thunkDeleteContact = createAsyncThunk(
    '/api/contacts/:id',
    async (id: number) => {
        const request = await deleteContact(id);
        return request;
    }
)


