import React from 'react'
import { Contact } from '../../../types/contact.type'
import './contact-item.css'
import { useAppDispatch } from '../../../app/store'
import { setModal } from '../../../features/modalSlice'
import { thunkContactById, thunkDeleteContact } from '../../../api/contactsApi'
// import { useAppDispatch } from '../../../app/store.ts'
// import { thunkSingleContact } from '../../../api/contact'
// import { updateContact } from '../../../features/updateContactSlice'

interface Props {
  contact: Contact
}


export const ContactItem: React.FC<Props> = ({ contact }) => {

  const dispatch = useAppDispatch();

  const edit = () => {
    dispatch(setModal({ type: 'editContact', open: true, title: 'Editar Contacto', object: { id: contact.id } }));
    // dispatch(updateContact(contact))
  }

  const getSingleContact = async () => {
    dispatch(thunkContactById(contact.id))
  }

  const deleteSingleContact = async (id: number) => {
    dispatch(thunkDeleteContact(id))
  }

  return (
    <div className='item' onClick={getSingleContact}>
      <p className='name'>{contact.name}</p>
      <p className='email'>{contact.phone}</p>
      <div className='btn-box'>
        <button className='btn btn--pri' onClick={edit} >Editar</button>
        <button className='btn btn--sec' onClick={()=> deleteSingleContact(contact.id)}>Eliminar</button>
      </div>

    </div>
  )
}
