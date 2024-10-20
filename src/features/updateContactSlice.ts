import { createSlice } from "@reduxjs/toolkit";
import { ThunkUpdateContact } from "../api/contactsApi";

interface InitialState {
    state: boolean | null
}

const initialState: InitialState = {
    state: null
}

const updateContactSlice = createSlice({
    name: "updateContactSlice",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(ThunkUpdateContact.fulfilled, (state, action)=> {
            state.state = action.payload;
        }) 
    },
})

export default updateContactSlice.reducer;

