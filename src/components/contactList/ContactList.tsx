import './contact-list.css'
// import { ContactItem } from "./contactItem/ContactItem"
import { useEffect } from "react"
// import { useSelector } from "react-redux"
// import { RootState, useAppDispatch } from "../../app/store"
// import { thunkContacts } from "../../api/contact"
import { Navbar } from "../Navbar/Navbar"
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../app/store'
import { ContactItem } from './contactItem/ContactItem'
import { thunkListContacts } from '../../api/contactsApi'


export const ContactList = () => {

  const dispatch = useAppDispatch();

  const contactList = useSelector((state: RootState) => state.getContactsReducer.contacts);

  useEffect(() => {
    dispatch(thunkListContacts())
  }, [])


  useEffect(() => { }, [contactList])


  return (
    <div className='list'>
      <h2>Lista de Contactos</h2>
      <Navbar />
      {contactList && contactList.length > 0 && contactList.map((contact, i) => (
        <ContactItem key={i} contact={contact} />
      ))}
    </div>
  )
}