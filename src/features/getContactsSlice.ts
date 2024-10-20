import { createSlice } from "@reduxjs/toolkit";
import { Contact } from "../types/contact.type";
import { thunkListContacts } from "../api/contactsApi";

interface InitialState {
    contacts: Contact[] | null
    originalContacts: Contact[];
}

const initialState: InitialState = {
    contacts: [],
    originalContacts: [],
}

const getContactsSlice = createSlice({
    name: 'getContactsSlice',
    initialState,
    reducers: {
        search: (state, action) => {
            const keys: Array<keyof Contact> = ['name', 'phone', 'email'];
            const searchTerm = action.payload.toLowerCase();

            state.contacts = state.originalContacts.filter((item) =>
                keys.some((key) => {
                    const value = item[key];
                    return value && typeof value !== 'number'
                        && value.toLowerCase().replace(/ /g, '')
                            .includes(searchTerm);
                })
            );
        }
    },
    extraReducers(builder) {
        builder.addCase(thunkListContacts.fulfilled, (state, action) => {
            state.contacts = action.payload;
            state.originalContacts = action.payload; 
        });
    }
})

export default getContactsSlice.reducer
export const { search } = getContactsSlice.actions;