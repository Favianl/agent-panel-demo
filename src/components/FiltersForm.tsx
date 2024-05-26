import { useEffect } from 'react';
import { useBank } from '../context/BankContext';
import { useTransaction } from '../context/TransactionContext';
import CustomForm, { Field } from './ui/CustomForm';
import { compareObjects } from '../helpers/compareObjects';
import { Filters } from '../types/GlobalTypes';

const FiltersForm = () => {
  const { banks } = useBank();
  const { setFilters, setPage } = useTransaction();

  useEffect(() => {
    return () => {
      setFilters((prevFilters) => {
        if (compareObjects(prevFilters, {})) return prevFilters;
        return {};
      });

      setPage(1);
    };
  }, [setFilters, setPage]);

  if (!banks) return null;

  const banksList = banks.map((bank) => ({ label: bank.name, value: bank.id }));

  const fields: Field[] = [
    {
      type: 'select',
      label: 'Banco',
      name: 'bank_id',
      defaultOptionLabel: 'Todos los Bancos',
      options: banksList,
    },
    {
      type: 'select',
      label: 'Tipo de Operación',
      name: 'type',
      defaultOptionLabel: 'Todos',
      options: [
        { label: 'Depósito', value: 'deposit' },
        { label: 'Retiro', value: 'withdraw' },
      ],
    },
    {
      type: 'select',
      label: 'Comisión',
      name: 'fee',
      defaultOptionLabel: 'Todos',
      options: [
        { label: 'Sin Comisión', value: 0 },
        { label: 'Con Comisión', value: 1 },
      ],
      validation: {
        valueAsNumber: true,
      },
    },
    {
      type: 'date',
      label: 'Fecha Inicio',
      name: 'startDate',
    },
    {
      type: 'date',
      label: 'Fecha Fin',
      name: 'endDate',
    },
  ];

  const handleSubmit = async (data: Filters) => {
    Object.keys(data).forEach((filter) => {
      if (filter === 'fee') {
        if (data[filter] !== 0 && data[filter] !== 1) delete data[filter];
      } else {
        if (!data[filter as keyof Filters])
          delete data[filter as keyof Filters];
      }
    });

    setFilters((prev) => {
      if (compareObjects(prev, data)) return prev;
      setPage(1);
      return data;
    });
  };

  const handleReset = () => {
    setFilters((prev) => {
      if (compareObjects(prev, {})) return prev;
      setPage(1);
      return {};
    });
  };

  return (
    <CustomForm
      formTitle='Filtros'
      formStyles='flex-1 sm:max-w-[300px]'
      fields={fields}
      submit={handleSubmit}
      submitBtn='Aplicar Filtros'
      resetLabel='Reiniciar Filtros'
      handleReset={handleReset}
    />
  );
};

export default FiltersForm;
