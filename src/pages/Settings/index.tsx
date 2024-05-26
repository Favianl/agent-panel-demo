import EntityTable from '../../components/EntityTable';
import { useBank } from '../../context/BankContext';
import { useCash } from '../../context/CashContext';
import EntityForm from '../../components/EntityForm';
import { useAuthContext } from '../../context/AuthContext';
import UserForm from '../../components/UserForm';
import { Tab, Tabs } from '../../components/ui/Tabs';
import { Toaster } from 'sonner';
import Loader from '../../components/ui/Loader';
import UserRow from '../../components/ui/UserRow';

const Settings = () => {
  const { banks, deleteBank, loadingBank } = useBank();
  const { cashList, deleteCash, loadingCash } = useCash();
  const { users, deleteUser, loadingAuth } = useAuthContext();

  if (!banks || !cashList || !users) return null;

  return (
    <section>
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
      {(loadingAuth || loadingCash || loadingBank) && <Loader />}
      <Tabs>
        <Tab label='Entidades'>
          <section className='bg-gray-100 dark:bg-slate-900 p-4 rounded-b-md rounded-tr-md'>
            <section className='mb-16'>
              <h2 className='text-xl font-semibold text-center mb-2'>Bancos</h2>
              <EntityTable
                entityList={banks}
                handleDelete={deleteBank}
                typeEntity='bank'
              />
              <h2 className='text-xl font-semibold text-center mb-2 mt-16'>
                Efectivos
              </h2>
              <EntityTable
                entityList={cashList}
                handleDelete={deleteCash}
                typeEntity='cash'
              />
            </section>
            <EntityForm />
          </section>
        </Tab>
        <Tab label='Usuarios'>
          <section className='bg-gray-100 dark:bg-slate-900 p-4 rounded-b-md rounded-tr-md'>
            <section className='mb-16'>
              <h2 className='text-xl font-semibold text-center mb-2'>
                Usuarios
              </h2>
              <div className='max-h-[300px] min-h-[200px] overflow-auto'>
                {users.length < 1 ? (
                  <div className='text-center italic text-sm py-8'>
                    No hay usuarios disponibles
                  </div>
                ) : (
                  <table className='table-auto w-full'>
                    <thead className='text-gray-900 dark:text-gray-200'>
                      <tr className='border-b-[10px] border-b-gray-100 dark:border-b-slate-900'>
                        <th className='bg-gray-300 dark:bg-slate-800 rounded-l-md'>
                          Usuario
                        </th>
                        <th className='bg-gray-300 dark:bg-slate-800 pr-4'>
                          Nombre
                        </th>
                        <th className='bg-gray-300 dark:bg-slate-800 rounded-r-md'>
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className='text-left'>
                      {users.map((user, index) => (
                        <UserRow
                          key={user.id}
                          user={user}
                          userIndex={index}
                          deleteUser={deleteUser}
                        />
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </section>
            <UserForm />
          </section>
        </Tab>
      </Tabs>
    </section>
  );
};

export default Settings;
