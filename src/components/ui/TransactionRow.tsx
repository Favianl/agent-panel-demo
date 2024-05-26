import { useEffect, useState } from 'react';
import { Transaction } from '../../types/GlobalTypes';
import AmountFormat from '../AmountFormat';
import ConfirmPopover from '../ConfirmPopover';
import TransactionModal from '../TransactionModal';
import DeleteSVG from './DeleteSVG';
import DetailsSVG from './DetailsSVG';

interface Props {
  transaction: Transaction;
  transactionIndex: number;
  deleteTransaction: (id: string) => void;
  showActions?: boolean;
}

const TransactionRow = ({
  transaction,
  transactionIndex,
  deleteTransaction,
  showActions,
}: Props) => {
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (deleteConfirm) {
      deleteTransaction(transaction.id);
      setDeleteConfirm(false);
    }
  }, [deleteConfirm, deleteTransaction, setDeleteConfirm, transaction.id]);

  const date = new Date(transaction.created_at);
  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const year = date.getUTCFullYear();
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');

  const createdAt = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

  return (
    <>
      <tr className=' odd:bg-gray-200 dark:odd:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-950'>
        <td className='py-2 pl-4'>{transaction.bank_name}</td>
        <td className='py-2 pl-4'>
          {transaction.type === 'deposit' ? 'Depósito' : 'Retiro'}
        </td>
        <td className='py-2 text-right'>
          <AmountFormat amount={transaction.amount} fixedDecimal />
        </td>
        <td className='py-2 text-right'>
          <AmountFormat amount={transaction.fee || 0} fixedDecimal />
        </td>
        <td className='py-2 text-center'>{createdAt}</td>
        <td className='py-2'>
          <div className='flex gap-2 justify-center items-center'>
            {showActions && (
              <ConfirmPopover
                handleConfirm={setDeleteConfirm}
                contentConfirm={
                  <div className='mb-3'>
                    <p className='text-center'>
                      ¿Estas seguro de eliminar transacción?
                    </p>
                    <p className='text-center font-semibold'>
                      {transaction.bank_name} |{' '}
                      {transaction.type === 'deposit' ? 'Depósito' : 'Retiro'} |{' '}
                      <AmountFormat amount={transaction.amount} fixedDecimal />
                    </p>
                  </div>
                }
                textBtnConfirm='Eliminar'
                popoverStyles={`right-0 ${transactionIndex !== 0 ? 'bottom-0' : ''} min-w-[300px]`}
              >
                <button className='flex justify-center items-center hover:text-slate-700 dark:hover:text-gray-400 '>
                  <DeleteSVG />
                </button>
              </ConfirmPopover>
            )}

            <button
              className='flex justify-center items-center hover:text-slate-700 dark:hover:text-gray-400'
              onClick={() => setShowModal(true)}
            >
              <DetailsSVG />
            </button>

            {showModal && (
              <TransactionModal
                closeModal={setShowModal}
                transaction={transaction}
                createdAt={createdAt}
              />
            )}
          </div>
        </td>
      </tr>
    </>
  );
};

export default TransactionRow;
