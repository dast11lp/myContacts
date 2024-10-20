import { useDispatch, useSelector } from 'react-redux';
import './modal.css';
import { setModal } from '../../features/modalSlice';
import { RootState } from '../../app/store.ts';
import React from 'react';

interface Props {
    children?: React.ReactNode;
}

export const Modal: React.FC<Props> = ({ children }) => {
    const dispatch = useDispatch();
    const modalSlice = useSelector((state: RootState) => state.modalReducer.modalData);

    const closeModal = () => {
        dispatch(setModal({ type: null, title: null, message: null, open: false }));
    };

    return (
        <div className="modal">
            <div className="modal__box">
                <div className="modal__box__close-button" onClick={closeModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><g fill="none" stroke="#db2777" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="m14 10l-4 4m0-4l4 4" /></g></svg>
                </div>
                <div className="modal__box__content">
                    <h2>{modalSlice.title}</h2>
                    {children || (
                        <>
                            <p>{modalSlice.message}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

