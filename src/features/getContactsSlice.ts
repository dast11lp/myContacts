import { createSlice } from "@reduxjs/toolkit";
import { Contact } from "../types/contact.type";
import { thunkListContacts } from "../api/contactsApi";

interface InitialState {
    contacts: Contact[] | null
}

const initialState: InitialState = {
    contacts: []
}

const getContactsSlice = createSlice({
    name: 'getContactsSlice',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(thunkListContacts.fulfilled, (state, action) => {
            state.contacts = action.payload
        })
    },
})

export default getContactsSlice.reducer