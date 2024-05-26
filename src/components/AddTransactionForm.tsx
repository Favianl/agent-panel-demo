import { useEffect } from 'react';
import { useBank } from '../context/BankContext';
import { useTransaction } from '../context/TransactionContext';
import { BaseTransaction } from '../types/GlobalTypes';
import CustomForm, { Field } from './ui/CustomForm';
import { useCash } from '../context/CashContext';

const AddTransactionForm = () => {
  const { banks } = useBank();
  const { cashList } = useCash();
  const {
    addTransaction,
    loadValues,
    setLoadValues,
    resetTransactionForm,
    setResetTransactionForm,
  } = useTransaction();

  useEffect(() => {
    return () => {
      if (!loadValues) {
        setLoadValues(null);
      }
    };
  }, []);

  if (!banks || !cashList) return null;

  const banksList = banks.map((bank) => ({ label: bank.name, value: bank.id }));

  const fields: Field[] = [
    {
      type: 'select',
      label: 'Banco',
      name: 'bank_id',
      defaultOptionLabel: 'Seleccionar Banco',
      options: banksList,
      validation: {
        required: 'Campo banco es requerido',
      },
    },
    {
      type: 'select',
      label: 'Tipo de Operación',
      name: 'type',
      defaultOptionLabel: 'Seleccionar Tipo de Op.',
      options: [
        { label: 'Depósito', value: 'deposit' },
        { label: 'Retiro', value: 'withdraw' },
      ],
      validation: {
        required: 'Campo tipo es requerido',
      },
    },
    {
      type: 'currency',
      label: 'Monto',
      name: 'amount',
      validation: {
        required: 'Campo monto es requerido',
        max: {
          value: 99999999,
          message: 'El monto supera el máximo permitido',
        },
        min: { value: 1, message: 'El monto mínimo es 1.00' },
        validate: {
          allowedAmount: (value, formValues) => {
            const { bank_id, type } = formValues;
            const bankAmount = banks.find((bank) => bank.id === bank_id);
            const availableCash = cashList.find(
              (cash) => cash.id === 'f886e431-f093-425a-b06a-3d3dabf4694d',
            );
            if (type === 'deposit' && bankAmount) {
              return (
                value <= bankAmount.amount ||
                'El monto supera el saldo disponible'
              );
            }

            if (type === 'withdraw' && availableCash) {
              return (
                value <= availableCash.amount ||
                'El monto supera el efectivo disponible'
              );
            }
          },
        },
      },
    },
    {
      type: 'currency',
      label: 'Comisión',
      name: 'fee',
      validation: {
        max: {
          value: 100,
          message: 'Comisión supera el máximo permitido',
        },
        min: { value: 1, message: 'Comisión mínima es 1.00' },
      },
    },
    {
      type: 'text',
      label: 'Descripción',
      name: 'description',

      validation: {
        maxLength: {
          value: 255,
          message: 'El máximo permitido es 255 caracteres',
        },
        minLength: {
          value: 3,
          message: 'El minimo permitido es 3 caracteres',
        },
      },
    },
  ];

  const handleSubmit = async (data: BaseTransaction) => {
    if (!data.fee) data.fee = 0;
    if (!data.description?.trim()) data.description = null;

    const newData = {
      ...data,
      bank_name: banks.find((b) => b.id === data.bank_id)?.name || '',
    };

    addTransaction(newData);
    setLoadValues(null);
  };

  return (
    <CustomForm
      formTitle='Añadir Transacción'
      formStyles=''
      fields={fields}
      submit={handleSubmit}
      submitBtn='Añadir'
      resetLabel='Limpiar'
      defaultValues={
        loadValues
          ? { ...loadValues, amount: '', fee: '', description: '' }
          : undefined
      }
      manualResetForm={resetTransactionForm}
      setManualResetForm={setResetTransactionForm}
      autoreset
    />
  );
};

export default AddTransactionForm;
