import { Transaction } from '../types/GlobalTypes';
import AmountFormat from './AmountFormat';

interface Props {
  transaction: Transaction;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  createdAt: string;
}

const TransactionModal = ({ transaction, closeModal, createdAt }: Props) => {
  return (
    <div
      onClick={() => closeModal(false)}
      className='overflow-auto fixed inset-0 z-[200] bg-black bg-opacity-60'
    >
      <section
        onClick={(e) => e.stopPropagation()}
        className='relative my-16 mx-auto max-w-sm w-full bg-gray-100 dark:bg-slate-900 p-3 rounded-md overflow-hidden'
      >
        <button
          className='rounded-full bg-gray-200 dark:bg-slate-800 h-8 w-8 font-bold text-xl flex justify-center items-center ml-auto mb-3'
          onClick={() => closeModal(false)}
        >
          &#x2715;
        </button>
        <div className='overflow-auto'>
          <table className='w-[90%] mx-auto bg-gray-300 dark:bg-slate-800 rounded-md mb-4'>
            <tbody>
              <tr className='border-b-[3px] border-gray-100 dark:border-slate-900'>
                <td className='text-right pr-4 font-semibold py-1'>ID</td>
                <td className='text-left pl-4 bg-gray-200 dark:bg-slate-950 py-1 rounded-tr'>
                  {transaction.id}
                </td>
              </tr>
              <tr className='border-b-[3px] border-gray-100 dark:border-slate-900'>
                <td className='text-right pr-4 font-semibold py-1'>BANCO</td>
                <td className='text-left pl-4 bg-gray-200 dark:bg-slate-950 py-1'>
                  {transaction.bank_name}
                </td>
              </tr>
              <tr className='border-b-[3px] border-gray-100 dark:border-slate-900'>
                <td className='text-right pr-4 font-semibold py-1'>
                  TIPO DE OPERACIÓN
                </td>
                <td className='text-left pl-4 bg-gray-200 dark:bg-slate-950 py-1'>
                  {transaction.type === 'deposit' ? 'Depósito' : 'Retiro'}
                </td>
              </tr>
              <tr className='border-b-[3px] border-gray-100 dark:border-slate-900'>
                <td className='text-right pr-4 font-semibold py-1'>MONTO</td>
                <td className='text-left pl-4 py-1 bg-gray-200 dark:bg-slate-950'>
                  <AmountFormat amount={transaction.amount} fixedDecimal />
                </td>
              </tr>
              <tr className='border-b-[3px] border-gray-100 dark:border-slate-900'>
                <td className='text-right pr-4 font-semibold py-1'>COMISIÓN</td>
                <td className='text-left pl-4 py-1 bg-gray-200 dark:bg-slate-950'>
                  <AmountFormat amount={transaction.fee || 0} fixedDecimal />
                </td>
              </tr>
              <tr className='border-b-[3px] border-gray-100 dark:border-slate-900'>
                <td className='text-right pr-4 font-semibold py-1'>
                  FECHA Y HORA
                </td>
                <td className='text-left pl-4 py-1 bg-gray-200 dark:bg-slate-950'>
                  {createdAt}
                </td>
              </tr>
              <tr className='border-b-[3px] border-gray-100 dark:border-slate-900'>
                <td className='text-right pr-4 font-semibold py-1'>
                  CREADO POR
                </td>
                <td className='text-left pl-4 py-1 bg-gray-200 dark:bg-slate-950'>
                  {transaction.created_by}
                </td>
              </tr>
              <tr>
                <td className='text-right pr-4 font-semibold py-1'>
                  DESCRIPCIÓN
                </td>
                <td className='text-left pl-4 py-1 bg-gray-200 dark:bg-slate-950 rounded-br-md'>
                  {!transaction.description ? (
                    <span className='italic text-sm'>Sin descripción</span>
                  ) : (
                    transaction.description
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default TransactionModal;
