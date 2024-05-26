import { useEffect } from 'react';
import { useTransaction } from '../context/TransactionContext';
import AmountFormat from './AmountFormat';

const Pagination = () => {
  const { transactions, totalAmount, page, limitPerPage, setPage } =
    useTransaction();

  const totalPages =
    totalAmount < 1 ? 1 : Math.ceil(totalAmount / limitPerPage);

  useEffect(() => {
    if (transactions && page > totalPages) {
      setPage(totalPages);
    }
  }, [totalPages, setPage]);

  return (
    <div className='flex items-center justify-between bg-gray-100 dark:bg-slate-900 rounded-md p-2'>
      <span className='text-xs text-center'>
        Total: <AmountFormat amount={totalAmount} />
      </span>
      <div className='flex justify-center items-center gap-2 flex-wrap'>
        <span className='text-xs'>
          Página <AmountFormat amount={page} /> de{' '}
          <AmountFormat amount={totalPages} />
        </span>

        <div className='space-x-1'>
          <button
            title='previous'
            type='button'
            className='inline-flex items-center justify-center w-8 h-8 py-0 border border-gray-300 dark:border-gray-700 rounded-md shadow'
            onClick={() => {
              setPage((prev) => (prev > 1 ? prev - 1 : prev));
            }}
          >
            <svg
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='2'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='w-4'
            >
              <polyline points='15 18 9 12 15 6'></polyline>
            </svg>
          </button>
          <button
            title='next'
            type='button'
            className='inline-flex items-center justify-center w-8 h-8 py-0 border border-gray-300 dark:border-gray-700 rounded-md shadow'
            onClick={() => {
              setPage((prev) => (prev < totalPages ? prev + 1 : prev));
            }}
          >
            <svg
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='2'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='w-4'
            >
              <polyline points='9 18 15 12 9 6'></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
