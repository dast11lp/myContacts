import { createSlice } from "@reduxjs/toolkit";

interface ModalData {
    type: string | null,
    title: string | null,
    message: string | null,
    open: boolean ,
    object?: any,
}


export interface InitialState {
    modalData: ModalData;
}

const initialState: InitialState = {
    modalData: {
        type: null,
        title: null,
        message: null,
        open: false,
        object: {}
    }
}

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setModal: (state, action) => {
            state.modalData = { ...action.payload }
        },

        closeModal :  (state) => {
            state.modalData.type = null,
            state.modalData.title = null,
            state.modalData.message = null,
            state.modalData.open = false,
            state.modalData.object = {}
        }
    }

})

export const { setModal } = modalSlice.actions;
export default modalSlice.reducer;