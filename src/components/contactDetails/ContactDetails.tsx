import './contact-details.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import calcularEdad from '../../helpers/calculateAge';
import { useState, useEffect } from 'react';

export const ContactDetails = () => {
    const contact = useSelector((state: RootState) => state.getSingleContactReducer.contactToEdit);
    const [age, setAge] = useState<number | undefined>(undefined); 

    useEffect(() => {
        if (contact?.date_of_birth) {
            setAge(calcularEdad(contact.date_of_birth));
        }
    }, [contact]);

    return (
        <div className='resume'>
            {contact ? (
                <>
                    <h4 className='title'>{contact.name}</h4>
                    <div className='content'>
                        <p className='phone'><strong>Teléfono:</strong> {contact.phone}</p>
                        <p><strong>Fecha de Nacimiento:</strong> {contact.date_of_birth}</p>
                        <p><strong>Dirección:</strong> {contact.address}</p>
                        <p><strong>Correo electrónico:</strong> {contact.email}</p>
                        <p><strong>Edad:</strong> {age}</p>
                    </div>
                </>
            ) : (
                <h2>Selecciona contacto</h2>
            )}
        </div>
    );
};
