import { SubmitHandler, useForm } from 'react-hook-form';
import { RootState, useAppDispatch } from '../../app/store.ts';
import { useSelector } from 'react-redux';
import { thunkAddContact, thunkContactById, thunkListContacts, ThunkUpdateContact } from '../../api/contactsApi.ts';
import { useEffect } from 'react';
import './contact-form.css';
import { NewContact } from '../../types/contact.type.ts';
import { closeModal } from '../../features/modalSlice.ts';

interface IformInput {
  id?: number;
  name: string;
  phone: string;
  date_of_birth: string;
  address: string;
  email: string;
}

export const ContactForm = () => {
  const labelOff = {
    top: "0",
    left: "0",
  };

  const dispatch = useAppDispatch();
  const { type } = useSelector((state: RootState) => state.modalReducer.modalData);
  const { object } = useSelector((state: RootState) => state.modalReducer.modalData);
  const contactToEdit = useSelector((state: RootState) => state.getSingleContactReducer.contact);

  const id = object?.id;

  const today = new Date();
  const minDate = new Date(today.setFullYear(today.getFullYear() - 5)).toISOString().split('T')[0];
  const maxDate = today.toISOString().split('T')[0];

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<IformInput>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<NewContact> = (data) => {
    const newContact: NewContact = { ...data };
    if (type === 'addContact') {

      dispatch(thunkAddContact(newContact)).then(() => {
        dispatch(thunkListContacts());
        reset()
      });
    }
    if (type === 'editContact') {
      dispatch(ThunkUpdateContact({ id, contact: newContact })).then(() => {
        dispatch(thunkListContacts());
        dispatch(thunkContactById(id));
        dispatch(closeModal())
      });
    }
  };


  useEffect(() => {
    if (type === 'editContact') {
      dispatch(thunkContactById(id));
    }
  }, [type, id, dispatch]);

  useEffect(() => {
    if (type === 'editContact') {
      if (contactToEdit) {
        reset(contactToEdit);
      }
    }
  }, [contactToEdit, reset]);





  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <div className="input">
        <input {...register("name", { required: 'El nombre es requerido' })} className="input__input-box" type='text' />
        <label style={watch("name") ? labelOff : {}} className="input__label">Nombre</label>
        <span className="input__msg input__msg--error">{errors.name?.message}</span>
      </div>

      <div className="input">
        <input {...register("phone", { required: 'El teléfono es requerido', pattern: { value: /^(\d{10}|\d{7})$/, message: 'El número debe  tener 7 o 10 caracteres' } })} className="input__input-box" type='text' />
        <label style={watch("phone") ? labelOff : {}} className="input__label">Teléfono</label>
        <span className="input__msg input__msg--error">{errors.phone?.message}</span>
      </div>

      <div className="input">
        <input {...register("date_of_birth", {
          required: 'La fecha de nacimiento es requerida', validate: {
            minDate: value => value <= minDate || "La persona debe tener al menos 5 años",
            maxDate: value => value <= maxDate || "La fecha no puede ser futura"
          }
        })} className="input__input-box" type='date' />
        <label className="input__label input__label--date">Fecha de nacimiento</label>
        <span className="input__msg input__msg--error">{errors.date_of_birth?.message}</span>
      </div>

      <div className="input">
        <input
          {...register("address", {
            required: 'La dirección es requerida',
            minLength: {
              value: 8,
              message: 'Al menos 12 caracteres'
            }
          })}
          className="input__input-box"
          type='text'
        />
        <label style={watch("address") ? labelOff : {}} className="input__label">Dirección</label>
        <span className="input__msg input__msg--error">{errors.address?.message}</span>
      </div>

      <div className="input">
        <input {...register("email", { required: 'El correo electrónico es requerido', pattern: { value: /^\S+@\S+$/i, message: 'Correo electrónico inválido' } })} className="input__input-box" type='text' />
        <label style={watch("email") ? labelOff : {}} className="input__label">Correo electrónico</label>
        <span className="input__msg input__msg--error">{errors.email?.message}</span>
      </div>

      <input className='btn btn--sec' type='submit' value={'Guardar'} />
    </form>
  );
}
