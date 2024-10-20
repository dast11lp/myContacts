import { SubmitHandler, useForm } from 'react-hook-form';
import './contact-form.css';
import { RootState, useAppDispatch } from '../../app/store.ts';
// import { AddContact, updateSingleContact } from '../../features/getContactsSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { thunkAddContact, ThunkUpdateContact } from '../../api/contactsApi.ts';
// import { thunkAddContact } from '../../api/contact';
// import { clearSlice } from '../../features/updateContactSlice';

interface IformInput {
  name: string
  phone: string
  date_of_birth: string
  address: string
  email: string
}

export const ContactForm = () => {

  const labelOff = {
    top: "0",
    left: "0",
  };

  const dispatch = useAppDispatch();

  const { type } = useSelector((state: RootState) => state.modalReducer.modalData);
  const { object } = useSelector((state: RootState) => state.modalReducer.modalData);
  // const contactToEdit = useSelector((state: RootState) => state.updateContactReducer.contact);


  const id = object?.id;

  const { register, handleSubmit, watch, reset } = useForm<IformInput>();

  const onSubmit: SubmitHandler<IformInput> = (data) => {
    // dispatch(thunkAddContact(data))

    if (type === 'addContact') dispatch(thunkAddContact(data))

    if (type === 'editContact') {
      dispatch(ThunkUpdateContact({id, contact: data}))
    }

  };

  // useEffect(() => {
  //   if (contactToEdit && Object.keys(contactToEdit).length > 0) {
  //     reset(contactToEdit);
  //   }

  //   return () => {
  //     reset();
  //     dispatch(clearSlice())
  //   }
  // }, [contactToEdit]);


  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <div className="input">
        <input {...register("name", { required: 'yes' })} className="input__input-box" type='text' />
        <label style={watch("name") ? labelOff : {}} className="input__label">Nombre</label>
        <span className="input__msg input__msg--error"></span>
      </div>

      <div className="input">
        <input {...register("phone", { required: 'yes', pattern: /^(\d{10}|\d{7})$/g })} className="input__input-box" type='text' />
        <label style={watch("phone") ? labelOff : {}} className="input__label">Teléfono</label>
        <span className="input__msg input__msg--error"></span>
      </div>

      <div className="input">
        <input {...register("date_of_birth", { required: 'yes' })} className="input__input-box" type='date' />
        <label className="input__label input__label--date">Fecha de nacimiento</label>
        <span className="input__msg input__msg--error"></span>
      </div>

      <div className="input">
        <input {...register("address", { required: 'yes' })} className="input__input-box" type='text' />
        <label className="input__label">Dirección</label>
        <span className="input__msg input__msg--error"></span>
      </div>

      <div className="input">
        <input {...register("email", { required: 'yes' })} className="input__input-box" type='text' />
        <label style={watch("email") ? labelOff : {}} className="input__label">Correo electrónico</label>
        <span className="input__msg input__msg--error"></span>
      </div>

      <input className='btn' type='submit' />
    </form>
  )
}
