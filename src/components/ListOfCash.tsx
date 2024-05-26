import { useCash } from '../context/CashContext';
import AmountFormat from './AmountFormat';

const ListOfCash = () => {
  const { cashList, globalTotal } = useCash();

  if (!cashList) return null;

  return (
    <>
      <section className='bg-gray-200 dark:bg-slate-800 mt-3 p-2 mb-3 rounded-md max-h-[200px] overflow-y-scroll'>
        {cashList.map((cash) => (
          <article
            className='flex justify-between gap-1 flex-wrap bg-gray-100 dark:bg-slate-900 rounded-md p-2 mb-2'
            key={cash.id}
          >
            <h3 className='text-lg'>{cash.name}</h3>
            <h3 className='text-lg font-semibold'>
              <AmountFormat amount={cash.amount} fixedDecimal />
            </h3>
          </article>
        ))}
      </section>

      <article className='flex justify-between flex-wrap bg-gray-100 dark:bg-slate-900 rounded-md p-2 mb-2'>
        <h3 className='text-xl'>Total General</h3>
        <h3 className='text-xl font-semibold'>
          <AmountFormat amount={globalTotal} fixedDecimal />
        </h3>
      </article>
    </>
  );
};

export default ListOfCash;
