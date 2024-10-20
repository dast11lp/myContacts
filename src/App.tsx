import './App.css'
import { ContactDetails } from './components/contactDetails/ContactDetails'
import { ContactList } from './components/contactList/ContactList'
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import { Modal } from './components/Modal/Modal';
import { ContactForm } from './components/contactForm/ContactForm';

function App() {
  const modalSlice = useSelector((state: RootState) => state.modalReducer.modalData);
  const modalOpen = modalSlice.open;


  return (
    <div className='layout'>
      <h1 className='contact-title'>Contactos</h1>
      <ContactDetails />
      <div className='layout__content'>

        <ContactList />

      </div>
      {modalOpen && (
        <Modal>
          {(modalSlice.type === 'addContact' || modalSlice.type === 'editContact')
            && <ContactForm />}
        </Modal>
      )}
    </div>
  )
}

export default App
