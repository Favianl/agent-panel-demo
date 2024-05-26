import { ReactNode, useEffect, useRef, useState } from 'react';

function ConfirmPopover({
  children,
  contentConfirm,
  textBtnConfirm,
  handleConfirm,
  popoverStyles,
}: {
  children: ReactNode;
  contentConfirm: ReactNode;
  textBtnConfirm: string;
  handleConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  popoverStyles: string;
}) {
  const [show, setShow] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    }

    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [show, wrapperRef]);

  return (
    <div ref={wrapperRef} className='w-fit h-fit relative flex justify-center'>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setShow((prevState) => !prevState);
        }}
      >
        {children}
      </div>
      <div
        className={`${show ? 'block' : 'hidden'} absolute ${popoverStyles} z-50`}
      >
        <div className='border dark:border-gray-100 border-gray-900 bg-gray-100 dark:bg-slate-900 rounded-md p-3'>
          <div className='text-sm'>
            {contentConfirm}
            <div className='flex justify-around'>
              <button
                onClick={() => setShow(false)}
                className='bg-gray-200 dark:bg-slate-800 p-1 px-2 rounded-md'
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  handleConfirm(true);
                  setShow(false);
                }}
                className='bg-blue-600 text-gray-100 p-1 px-2 rounded-md'
              >
                {textBtnConfirm || 'Aceptar'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmPopover;
