import { createSlice } from "@reduxjs/toolkit";
import { Contact } from "../types/contact.type";
import { thunkContactById } from "../api/contactsApi";
// import { thunkSingleContact } from "../api/contact";

interface InitialState {
    contact: Contact | null
}

const initialState: InitialState = {
    contact: null,
}

const getSingleContactSlice = createSlice({
    name: 'getSingleContactSlice',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(thunkContactById.fulfilled, (state, actions) => { 
            state.contact = actions.payload;
        })
    },
})

export default getSingleContactSlice.reducer;