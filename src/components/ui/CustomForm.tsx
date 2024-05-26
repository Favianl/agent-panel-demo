import {
  Controller,
  DefaultValues,
  FieldError,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import SelectField from './SelectField';
import InputField from './InputField';
import { NumericFormat } from 'react-number-format';
import { useEffect, useRef } from 'react';

interface BaseField {
  name: string;
  label: string;
  validation?: RegisterOptions;
}

interface InputField extends BaseField {
  type: 'text' | 'number' | 'password' | 'email' | 'date' | 'currency';
}
interface SelectField extends BaseField {
  type: 'select';
  defaultOptionLabel: string;
  options: {
    label: string;
    value: string | number;
  }[];
}

export type Field = InputField | SelectField;

interface Props<T extends FieldValues> {
  fields: Field[];
  submit: SubmitHandler<T>;
  submitBtn: string;
  formTitle: string;
  formStyles: string;
  resetLabel?: string;
  handleReset?: () => void;
  autoreset?: boolean;
  defaultValues?: DefaultValues<T> | undefined;
  manualResetForm?: boolean;
  setManualResetForm?: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomForm = <T extends FieldValues>({
  fields,
  submitBtn,
  submit,
  formTitle,
  formStyles,
  resetLabel,
  handleReset,
  autoreset = false,
  defaultValues,
  manualResetForm,
  setManualResetForm,
}: Props<T>) => {
  const {
    register,
    control,
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<T>();

  const watchAllFields = watch();

  const isFormEmpty = Object.values(watchAllFields).every(
    (x) => x === null || x === '' || x === undefined,
  );

  const inputAmountRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (defaultValues) {
      Object.keys(defaultValues).forEach((fieldName) => {
        setValue(fieldName as Path<T>, defaultValues[fieldName]);
      });

      if (inputAmountRef.current) {
        inputAmountRef.current.focus();
      }
    }
  }, [defaultValues, setValue, fields]);

  useEffect(() => {
    if (manualResetForm) {
      reset();
      setManualResetForm && setManualResetForm(false);
    }
  }, [manualResetForm, reset, setManualResetForm]);

  return (
    <form
      className={`bg-gray-100 dark:bg-slate-900 rounded-md p-3 ${formStyles}`}
      onSubmit={handleSubmit((formData) => {
        submit(formData);
        if (autoreset) reset();
      })}
    >
      <h2 className='text-center font-bold text-xl'>{formTitle}</h2>
      {fields.map((field) => {
        const error = errors[field.name] as FieldError | undefined;
        return (
          <section key={field.name} className='my-5'>
            <label
              className='block mb-1 font-semibold text-lg'
              htmlFor={field.name}
            >
              {field.label}
            </label>
            {field.type === 'select' ? (
              <SelectField
                id={field.name}
                defaultOptionLabel={field.defaultOptionLabel}
                register={register(field.name as Path<T>, field.validation)}
                options={field.options}
              />
            ) : field.type === 'currency' ? (
              <Controller
                name={field.name as Path<T>}
                control={control}
                rules={field.validation}
                render={({ field: f }) => (
                  <NumericFormat
                    getInputRef={
                      field.name === 'amount' ? inputAmountRef : undefined
                    }
                    id={field.name}
                    className='block w-full rounded-md bg-gray-200 dark:bg-slate-800 text-xl font-semibold p-1'
                    thousandSeparator=','
                    decimalSeparator='.'
                    // fixedDecimalScale
                    decimalScale={2}
                    value={f.value === undefined ? '' : f.value}
                    placeholder='0.00'
                    onValueChange={(values) => f.onChange(values.floatValue)}
                  />
                )}
              />
            ) : (
              <InputField
                id={field.name}
                type={field.type}
                register={register(field.name as Path<T>, field.validation)}
                onBlur={(e) => {
                  if (field.type === 'text') {
                    const formatSpacesInText = e.target.value
                      .replace(/\s+/g, ' ')
                      .trim();

                    setValue(
                      field.name as Path<T>,
                      formatSpacesInText as PathValue<T, Path<T>>,
                    );
                  }
                }}
              />
            )}
            {error && <p className='text-red-600'>{error.message}</p>}
          </section>
        );
      })}
      <section className='flex justify-around gap-4 mt-8'>
        <button
          className='text-gray-100 font-bold bg-blue-600 p-2 rounded-md flex-1'
          type='submit'
        >
          {submitBtn}
        </button>
        {resetLabel && (
          <button
            className='bg-gray-200 dark:bg-slate-800 text-bold p-2 rounded-md flex-1'
            disabled={isFormEmpty}
            type='button'
            onClick={() => {
              handleReset && handleReset();
              reset();
            }}
          >
            {resetLabel}
          </button>
        )}
      </section>
    </form>
  );
};

export default CustomForm;
