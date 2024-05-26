import { useAuthContext } from '../context/AuthContext';
import { BaseUser } from '../types/GlobalTypes';
import CustomForm, { Field } from './ui/CustomForm';

const UserForm = () => {
  const { register, resetAuthForm, setResetAuthForm } = useAuthContext();
  const fields: Field[] = [
    {
      type: 'text',
      label: 'Usuario',
      name: 'username',
      validation: {
        required: 'Usuario es requerido',
        pattern: {
          value: /^[a-zA-Z][a-zA-Z0-9]*$/,
          message:
            'Campo usuario solo acepta letras y números, debe empezar con una letra.',
        },
        maxLength: {
          value: 50,
          message: 'El máximo permitido es 50 caracteres',
        },
        minLength: {
          value: 3,
          message: 'El minimo permitido es 3 caracteres',
        },
      },
    },
    {
      type: 'text',
      label: 'Nombre',
      name: 'name',
      validation: {
        required: 'Nombre es requerido',
        pattern: {
          value: /^(?! *$)(?!.*\s{2,})[a-zA-ZÀ-ÿ]+(?:\s[a-zA-ZÀ-ÿ]+)*$/,
          message: 'Formato de nombre incorrecto.',
        },
        maxLength: {
          value: 50,
          message: 'El máximo permitido es 50 caracteres',
        },
        minLength: {
          value: 3,
          message: 'El minimo permitido es 3 caracteres',
        },
      },
    },
    {
      type: 'password',
      label: 'Contraseña',
      name: 'password',
      validation: {
        required: 'Contraseña es requerida',
        pattern: {
          value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          message:
            'La contraseña debe tener al menos una letra y un número, longitud minima de 8 caracteres.',
        },
        maxLength: {
          value: 50,
          message: 'El máximo permitido es 50 caracteres',
        },
      },
    },
    {
      type: 'password',
      label: 'Repetir Contraseña',
      name: 'passwordConfirm',
      validation: {
        required: 'Confirmar contraseña es requerido',
        validate: {
          matchPasswords: (value, formValues) => {
            const { password } = formValues;
            return password === value || 'Las contraseñas deben coincidir';
          },
        },
      },
    },
  ];

  const handleSubmit = async (data: BaseUser) => {
    delete data.passwordConfirm;
    register(data);
  };

  return (
    <section className='border-[3px] border-gray-300 dark:border-slate-800 rounded-md'>
      <CustomForm
        formTitle='Crear Usuario'
        formStyles=''
        fields={fields}
        submit={handleSubmit}
        submitBtn='Crear'
        resetLabel='Limpiar'
        manualResetForm={resetAuthForm}
        setManualResetForm={setResetAuthForm}
      />
    </section>
  );
};

export default UserForm;
