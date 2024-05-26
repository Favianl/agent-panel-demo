import { Toaster } from 'sonner';
import CustomForm, { Field } from '../../components/ui/CustomForm';
import { useAuthContext } from '../../context/AuthContext';
import Loader from '../../components/ui/Loader';

const Account = () => {
  const {
    userAuth,
    changePassword,
    resetAuthForm,
    setResetAuthForm,
    loadingAuth,
  } = useAuthContext();

  const fields: Field[] = [
    {
      type: 'password',
      label: 'Contraseña Actual',
      name: 'oldPassword',
      validation: {
        required: 'Contraseña actual es requerida',
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
      label: 'Nueva Contraseña',
      name: 'newPassword',
      validation: {
        required: 'Nueva Contraseña es requerida',
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
      label: 'Repetir Nueva Contraseña',
      name: 'newPasswordConfirm',
      validation: {
        required: 'Repetir nueva contraseña es requerido',
        validate: {
          matchPasswords: (value, formValues) => {
            const { newPassword } = formValues;
            return newPassword === value || 'Las contraseñas deben coincidir';
          },
        },
      },
    },
  ];

  const handleSubmit = async () => {
    changePassword();
  };

  return (
    <div className='flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto'>
      <Toaster
        toastOptions={{
          classNames: {
            toast: 'bg-gray-100 dark:bg-slate-950 border',
            error:
              'text-red-800 dark:text-red-600 border-red-800 dark:border-red-600',
            success:
              'text-green-800 dark:text-green-600 border-green-800 dark:border-green-600',
            closeButton:
              'bg-gray-200 dark:bg-slate-950 border-none dark:hover:bg-slate-900',
          },
        }}
      />
      {loadingAuth && <Loader />}
      <article className='bg-gray-100 dark:bg-slate-900 self-start p-4 mx-auto sm:flex-1 rounded-md'>
        <h2 className='text-xl mb-4'>Información de Usuario</h2>
        <p>
          <span className='font-semibold'>Usuario :</span>{' '}
          <span>{userAuth?.username}</span>
        </p>
        <p>
          <span className='font-semibold'>Nombre :</span>{' '}
          <span>{userAuth?.name}</span>
        </p>
      </article>

      <CustomForm
        formTitle='Cambiar Contraseña'
        formStyles='flex-1'
        fields={fields}
        submit={handleSubmit}
        submitBtn='Enviar'
        resetLabel='Limpiar'
        manualResetForm={resetAuthForm}
        setManualResetForm={setResetAuthForm}
      />
    </div>
  );
};

export default Account;
