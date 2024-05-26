import { Toaster } from 'sonner';
import AddTransactionForm from '../../components/AddTransactionForm';
import Banks from '../../components/Banks';
import ListOfCash from '../../components/ListOfCash';
import { useBank } from '../../context/BankContext';
import { useCash } from '../../context/CashContext';
import Loader from '../../components/ui/Loader';
import { useTransaction } from '../../context/TransactionContext';

const Dashboard = () => {
  const { loadingBank } = useBank();
  const { loadingCash } = useCash();
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

      {(loadingBank || loadingCash || loadingT) && <Loader />}
      <div className='flex gap-2 flex-col sm:flex-row'>
        <Banks />
        <div className=' sm:mt-3 sm:flex-1 md:max-w-[300px]'>
          <AddTransactionForm />
          <ListOfCash />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
