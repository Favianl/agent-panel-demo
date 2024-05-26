interface Props {
  checked: boolean;
  onChange: () => void;
}

function HamburguerButton({ checked, onChange }: Props) {
  return (
    <div
      onClick={onChange}
      className='cursor-pointer bg-gray-200 dark:bg-slate-800 p-2 rounded-full z-50'
    >
      <input
        type='checkbox'
        id='menuBtn'
        checked={checked}
        onChange={onChange}
        className='hidden'
      />
      <label
        htmlFor='menuBtn'
        className='cursor-pointer w-4 h-4 flex justify-between flex-col'
      >
        <div
          className={`w-full h-[2px] bg-gray-900 dark:bg-gray-100 rounded-full transition duration-500 ${checked ? 'transform rotate-45 translate-y-[7px]' : ''}`}
        ></div>
        <div
          className={`w-full h-[2px] bg-gray-900 dark:bg-gray-100 rounded-full opacity-0 transition duration-500 ${checked ? 'opacity-0' : 'opacity-100'}`}
        ></div>
        <div
          className={`w-full h-[2px] bg-gray-900 dark:bg-gray-100 rounded-full transition duration-500 ${checked ? 'transform -rotate-45 -translate-y-[7px]' : ''}`}
        ></div>
      </label>
    </div>
  );
}

export default HamburguerButton;
