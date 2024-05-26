import { useBank } from '../context/BankContext';
import { useTransaction } from '../context/TransactionContext';
import AmountFormat from './AmountFormat';
import LastTransactions from './LastTransactions';

const Banks = () => {
  const { banks } = useBank();
  const { setLoadValues, lastTransactions } = useTransaction();

  if (!banks) return null;

  const getLastTransactionsOfBank = (bankId: string) => {
    const listFound = lastTransactions.find((list) => list.bank_id === bankId);
    return listFound ? listFound.transactions : [];
  };

  const activeBanks = banks.filter((b) => b.is_active === true);

  return (
    <>
      {activeBanks.length < 1 ? (
        <div className='font-thin text-gray-700 dark:text-gray-300 flex-1 italic text-center py-8'>
          Sin Bancos
        </div>
      ) : (
        <section
          className={`w-full sm:w-auto max-h-[400px] sm:max-h-[800px] overflow-y-auto mb-8 sm:mb-auto self-start flex-1 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3 p-3 border border-gray-800 dark:border-gray-200 md:border-none rounded-md`}
        >
          {activeBanks.map((bank) => (
            <article
              className='flex flex-col bg-gray-100 dark:bg-slate-900 rounded-md p-2'
              key={bank.id}
            >
              <div className='flex justify-between text-xs'>
                <button
                  className='bg-red-800 text-gray-100 p-2 rounded-md font-semibold opacity-70 hover:opacity-100'
                  onClick={() => {
                    setLoadValues({ bank_id: bank.id, type: 'deposit' });
                  }}
                >
                  Depósito -
                </button>
                <button
                  className='bg-green-800 text-gray-100 p-2 rounded-md font-semibold opacity-70 hover:opacity-100'
                  onClick={() => {
                    setLoadValues({ bank_id: bank.id, type: 'withdraw' });
                  }}
                >
                  Retiro +
                </button>
              </div>
              <section
                className={`flex gap-1 ${bank.name.length + String(bank.amount).length > 16 ? 'justify-around' : 'justify-between'} py-2 flex-wrap`}
              >
                <h3 className=''>{bank.name}</h3>
                <h3 className='font-semibold'>
                  <AmountFormat amount={bank.amount} />
                </h3>
              </section>
              <LastTransactions
                listOfTransactions={getLastTransactionsOfBank(bank.id)}
              />
            </article>
          ))}
        </section>
      )}
    </>
  );
};

export default Banks;
