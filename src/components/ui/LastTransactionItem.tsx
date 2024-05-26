import { useState } from 'react';
import { Transaction } from '../../types/GlobalTypes';
import AmountFormat from '../AmountFormat';
import TransactionModal from '../TransactionModal';

const LastTransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const [showModal, setShowModal] = useState(false);

  const date = new Date(transaction.created_at);
  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const year = date.getUTCFullYear();
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');

  const createdAt = `${day}/${month} ${hours}:${minutes}`;
  const createdAtForModal = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

  return (
    <>
      {showModal && (
        <TransactionModal
          transaction={transaction}
          createdAt={createdAtForModal}
          closeModal={setShowModal}
        />
      )}
      <div
        onClick={() => setShowModal(true)}
        className='flex items-center gap-2 text-xs my-2 opacity-70 hover:opacity-100 transition-opacity duration-300 cursor-pointer'
      >
        <div>{createdAt}</div>
        <div
          className={`${transaction.type === 'deposit' ? 'text-red-700' : 'text-green-700'} font-semibold bg-gray-300 dark:bg-slate-950 px-1 rounded-md`}
        >
          {transaction.type === 'deposit' ? 'Dep.' : 'Ret.'}
        </div>
        <div className='ml-auto font-semibold'>
          <AmountFormat amount={transaction.amount} />
        </div>
      </div>
    </>
  );
};

export default LastTransactionItem;
