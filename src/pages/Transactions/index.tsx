import { Toaster } from 'sonner';
import FiltersForm from '../../components/FiltersForm';
import Pagination from '../../components/Pagination';
import TransactionsTable from '../../components/TransactionsTable';
import { useBank } from '../../context/BankContext';
import { useTransaction } from '../../context/TransactionContext';
import { useAuthContext } from '../../context/AuthContext';
import Loader from '../../components/ui/Loader';

const Transactions = () => {
  const { loadingAuth } = useAuthContext();
  const { loadingBank } = useBank();
  const { loadingT } = useTransaction();

  return (
    <>
      <Toaster
        toastOptions={{
          classNames: {
            toast: 'bg-gray-100 dark:bg-slate-950 border',
            error:
              'text-red-800 dark:text-red-600 border-red-800 dark:border-red-600',
            success:
              'text-green-800 dark:text-green-600 border-green-800 dark:border-green-600',
            closeButton:
              'bg-gray-200 dark:bg-slate-950 border-none dark:hover:bg-slate-900',
          },
        }}
      />
      {(loadingAuth || loadingBank || loadingT) && <Loader />}
      <section className={`flex flex-col sm:flex-row gap-4`}>
        <FiltersForm />
        <div className='flex-1 px-2 overflow-hidden'>
          <Pagination />
          <TransactionsTable />
          <Pagination />
        </div>
      </section>
    </>
  );
};

export default Transactions;
