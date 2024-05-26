import { UseFormRegisterReturn } from 'react-hook-form';

interface Props {
  id: string;
  register: UseFormRegisterReturn;
  defaultOptionLabel: string;
  options: {
    label: string;
    value: string | number;
  }[];
}

const SelectField = ({ id, register, defaultOptionLabel, options }: Props) => {
  return (
    <select
      id={id}
      {...register}
      className='block w-full rounded-md bg-gray-200 dark:bg-slate-800 text-lg p-1'
    >
      <option className='' value=''>
        {defaultOptionLabel}
      </option>
      {options.map((option) => (
        <option key={option.label} value={option.value} className=''>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectField;
