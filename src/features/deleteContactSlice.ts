import { createSlice } from "@reduxjs/toolkit";
import { Contact } from "../types/contact.type";
// import { thunkDeleteContact } from "../api/contactsApi";

interface InitialState {
    contact: Contact | null
}

const initialState: InitialState = {
    contact: null
}

const deleteContactSlice = createSlice({
    name: 'deleteContactSlice',
    initialState,
    reducers: {},
    // extraReducers(builder) {
    //     builder.addCase(thunkDeleteContact.fulfilled, (state, action)=> {
    //         // state.contact = action.payload;
    //     }) 
    // },
})

export default deleteContactSlice.reducer