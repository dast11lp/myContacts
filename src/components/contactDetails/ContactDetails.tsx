import './contact-details.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

export const ContactDetails = () => {
    const contact = useSelector((state: RootState) => state.getSingleContactReducer.contact);

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

                    </div>
                </>

            ) : (
                <h2>Selecciona contacto</h2>
            )}
        </div>
    );
}
