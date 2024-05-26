import { Transaction } from '../types/GlobalTypes';
import LastTransactionItem from './ui/LastTransactionItem';

const LastTransactions = ({
  listOfTransactions,
}: {
  listOfTransactions: Transaction[];
}) => {
  return (
    <section className='flex-1 bg-gray-200 dark:bg-slate-800 p-1 rounded-md'>
      {listOfTransactions.map((t) => (
        <LastTransactionItem key={t.id} transaction={t} />
      ))}
    </section>
  );
};

export default LastTransactions;
