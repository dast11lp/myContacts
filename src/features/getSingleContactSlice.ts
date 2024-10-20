import { createSlice } from "@reduxjs/toolkit";
import { Contact } from "../types/contact.type";
import { thunkContactById } from "../api/contactsApi";

interface InitialState {
    contact: Contact | null
    contactToEdit: Contact | null
}

const initialState: InitialState = {
    contact: null,
    contactToEdit: null
}

const getSingleContactSlice = createSlice({
    name: 'getSingleContactSlice',
    initialState,
    reducers: {},
    // extraReducers(builder) {
    //     builder.addCase(thunkContactById.fulfilled, (state, actions) => { 
    //         state.contact = actions.payload;
    //     })
    // },
    extraReducers(builder) {
        builder.addCase(thunkContactById.fulfilled, (state, actions) => { 
            state.contact = actions.payload;
            state.contactToEdit = actions.payload; // Guarda también el contacto para editar
        });
    }
    
})

export default getSingleContactSlice.reducer;