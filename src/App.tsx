import './App.css';
import { AuthProvider } from './context/AuthContext';
import { BankProvider } from './context/BankContext';
import { CashProvider } from './context/CashContext';
import { TransactionProvider } from './context/TransactionContext';
import AppRouter from './pages/AppRouter';

function App() {
  return (
    <AuthProvider>
      <CashProvider>
        <BankProvider>
          <TransactionProvider>
            <div className='font-open bg-gray-300 dark:bg-slate-950 text-gray-900 dark:text-gray-100 min-h-screen min-w-[400px] pt-[0.1px]'>
              <AppRouter />
            </div>
          </TransactionProvider>
        </BankProvider>
      </CashProvider>
    </AuthProvider>
  );
}

export default App;
