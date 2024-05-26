import { UseFormRegisterReturn } from 'react-hook-form';

interface Props {
  id: string;
  type: 'text' | 'number' | 'email' | 'password' | 'date';
  register: UseFormRegisterReturn;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
}

const InputField = ({ id, type, register, onBlur }: Props) => {
  return (
    <input
      className='block w-full rounded-md bg-gray-200 dark:bg-slate-800 text-lg p-1'
      id={id}
      type={type}
      {...register}
      onBlur={onBlur}
    />
  );
};

export default InputField;
