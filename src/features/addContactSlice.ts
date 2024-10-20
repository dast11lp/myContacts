import { createSlice } from "@reduxjs/toolkit";
import { Contact } from "../types/contact.type";
import { thunkAddContact } from "../api/contactsApi";

interface InitialState {
    contact: Contact | null
}



const initialState: InitialState = {
    contact: null
}

const  addContactSlice = createSlice({
    name: 'addContactSlice',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(thunkAddContact.fulfilled, (state,action)=> {
            state.contact = action.payload
        })
    },
})

export default addContactSlice.reducer