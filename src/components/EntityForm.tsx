import { useEffect } from 'react';
import { useBank } from '../context/BankContext';
import { useCash } from '../context/CashContext';
import CustomForm, { Field } from './ui/CustomForm';

const EntityForm = () => {
  const { createBank } = useBank();
  const {
    createCash,
    editableData,
    setEditableData,
    updateCash,
    resetEntityForm,
    setResetEntityForm,
  } = useCash();

  useEffect(() => {
    return () => {
      setEditableData((prevData) => (prevData ? null : prevData));
    };
  }, []);

  const fields: Field[] = [
    {
      type: 'select',
      label: 'Tipo de Entidad',
      name: 'entity',
      defaultOptionLabel: 'Seleccionar',
      options: [
        { label: 'Banco', value: 'bank' },
        { label: 'Efectivo', value: 'cash' },
      ],
      validation: {
        required: 'Campo tipo es requerido',
      },
    },
    {
      type: 'text',
      label: 'Nombre',
      name: 'name',
      validation: {
        required: 'Nombre es requerido',
        pattern: {
          value: /^(?! *$)(?!\s)(?!.*\s$)[a-zA-ZÀ-ÿ\d]+(?:\s[a-zA-ZÀ-ÿ\d]+)*$/,
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
      type: 'currency',
      label: 'Monto',
      name: 'amount',
      validation: {
        required: 'El monto es requerido',
        max: {
          value: 99999999,
          message: 'El monto supera el máximo permitido',
        },
        min: { value: 0, message: 'El monto mínimo es 0.00' },
      },
    },
  ];

  const [, ...editFields] = fields;

  const handleSubmitCreate = async (data: {
    name: string;
    amount: number;
    entity: string;
  }) => {
    const { name, amount } = data;

    if (data.entity === 'bank') {
      createBank({ name, amount });
    } else {
      createCash({ name, amount });
    }
  };

  const handleSubmitEdit = async (data: { name: string; amount: number }) => {
    const { name, amount } = data;
    if (editableData) {
      updateCash({ name, amount }, editableData.id);
    }
  };

  const handleReset = () => {
    setEditableData(null);
  };

  return (
    <section className='border-[3px] border-gray-300 dark:border-slate-800 rounded-md'>
      {editableData ? (
        <CustomForm
          formTitle='Editar Entidad'
          formStyles=''
          fields={editFields}
          submit={handleSubmitEdit}
          submitBtn='Guardar'
          resetLabel='Cancelar'
          handleReset={handleReset}
          defaultValues={{
            name: editableData.name,
            amount: editableData.amount,
          }}
          manualResetForm={resetEntityForm}
          setManualResetForm={setResetEntityForm}
        />
      ) : (
        <CustomForm
          formTitle='Crear Entidad'
          formStyles=''
          fields={fields}
          submit={handleSubmitCreate}
          submitBtn='Crear'
          resetLabel='Limpiar'
          handleReset={handleReset}
          manualResetForm={resetEntityForm}
          setManualResetForm={setResetEntityForm}
          autoreset
        />
      )}
    </section>
  );
};

export default EntityForm;
