import { useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useTransaction } from '../context/TransactionContext';
import { Filters, Transaction } from '../types/GlobalTypes';
import TransactionRow from './ui/TransactionRow';

const TransactionsTable = () => {
  const {
    transactions,
    deleteTransaction,
    limitPerPage,
    filters,
    setTotalAmount,
    page,
  } = useTransaction();
  const { userAuth } = useAuthContext();

  const startPage = (page - 1) * limitPerPage;
  const endPage = page * limitPerPage;

  const filteredTransactions = transactions
    .filter((t) => {
      for (const key in filters) {
        if (key === 'startDate') {
          if (
            filters.startDate &&
            t.created_at < filters.startDate + 'T00:00:00.000'
          ) {
            return false;
          }
        } else if (key === 'endDate') {
          if (
            filters.endDate &&
            t.created_at > filters.endDate + 'T23:59:59.999'
          ) {
            return false;
          }
        } else if (key === 'fee') {
          if (filters.fee !== undefined) {
            if (filters.fee === 0 && Number(t.fee) > 0) return false;
            if (filters.fee === 1 && Number(t.fee) === 0) return false;
          }
        } else {
          if (t[key as keyof Transaction] !== filters[key as keyof Filters]) {
            return false;
          }
        }
      }
      return true;
    })
    .reverse();

  const transactionsToShow = filteredTransactions.slice(startPage, endPage);

  useEffect(() => {
    setTotalAmount(filteredTransactions.length);
  }, [filteredTransactions]);

  const amountOfRowsToFill = limitPerPage - transactionsToShow.length;
  const rowsToFill = Array(amountOfRowsToFill).fill(null);

  return (
    <div className='bg-gray-100 dark:bg-slate-900 rounded-md overflow-auto my-2 p-2'>
      {transactionsToShow.length < 1 ? (
        <div className='text-center italic text-sm py-8'>
          No hay transacciones disponibles
        </div>
      ) : (
        <table className='table-auto min-w-[900px] w-full'>
          <thead className=''>
            <tr className='border-b-[10px] border-b-gray-100 dark:border-b-slate-900'>
              <th className='bg-gray-300 dark:bg-slate-800 rounded-l-md'>
                Banco
              </th>
              <th className='bg-gray-300 dark:bg-slate-800'>Tipo Op.</th>
              <th className='bg-gray-300 dark:bg-slate-800 text-right'>
                Monto
              </th>
              <th className='bg-gray-300 dark:bg-slate-800 text-right'>
                Comisión
              </th>
              <th className='bg-gray-300 dark:bg-slate-800'>Fecha</th>
              <th className='bg-gray-300 dark:bg-slate-800 rounded-r-md'>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className='text-left'>
            {transactionsToShow.map((item, index) => (
              <TransactionRow
                key={item.id}
                transaction={item}
                transactionIndex={index}
                deleteTransaction={deleteTransaction}
                showActions={userAuth.is_admin}
              />
            ))}
            {rowsToFill.length > 0 &&
              rowsToFill.map((_, idx) => (
                <tr key={idx + Date.now()}>
                  <td className='py-2 text-transparent select-none'>.</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionsTable;
