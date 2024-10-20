import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';

import modalReducer from '../features/modalSlice'
import getContactsReducer from '../features/getContactsSlice'
import addContactReducer from '../features/addContactSlice'
import getSingleContactReducer from '../features/getSingleContactSlice'
import updateContactReducer from '../features/updateContactSlice'

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()

export const store = configureStore({
    reducer: {
        getContactsReducer,
        addContactReducer,
        modalReducer,
        getSingleContactReducer,
        updateContactReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch