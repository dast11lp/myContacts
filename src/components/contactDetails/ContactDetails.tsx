import './contact-details.module.css'
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

export const ContactDetails = () => {

    const contact = useSelector((state: RootState) => state.getSingleContactReducer.contact);

    return (
        contact ?
            <div className='resume'>
                <h4>Nombre: {contact?.name}</h4>
                <div>
                    <p>Telefono: {contact?.phone}</p>
                </div>

                <div>
                    <p>Fecha de Nacimiento: {contact?.date_of_birth}</p>
                    <p>Direccion: {contact?.address}</p>
                    <p>Correo electrónico: {contact?.email}</p>
                </div>
            </div> :
            <h2>Selecciona contacto</h2>
    )
}