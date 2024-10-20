import { useAppDispatch } from "../../app/store"
import { search } from "../../features/getContactsSlice";
// import { search } from "../../features/getContactsSlice";
import { setModal } from "../../features/modalSlice";

import './navbar.css'

export const Navbar = () => {

    const dispatch = useAppDispatch()

    const AddContact = () => {
        dispatch(setModal({ type: 'addContact', open: true, title:"Agregar Contacto"}));
      }

    const atChange= (data: String) => {
        dispatch(search(data))
    }

    return (
        <div className="navbar">
            <input className="search" type="text"  placeholder="Buscar Número teléfono o correo" onChange={(e)=> atChange(e.target.value)}/>
            <button className='btn' onClick={AddContact}>Agregar</button>
        </div>
    )
}
