import { createContext, useContext, useEffect, useState } from 'react';
import {
  BaseTransaction,
  Filters,
  LastTransactions,
  Transaction,
  TransactionType,
} from '../types/GlobalTypes';
import { useBank } from './BankContext';
import { useCash } from './CashContext';
import { transactionsData } from '../helpers/transactionsData';
import { toast } from 'sonner';
import { v4 } from 'uuid';

interface ProviderProps {
  children: React.ReactNode;
}

interface TransactionProps extends BaseTransaction {
  bank_name: string;
}

interface ContextTypes {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  loadingT: boolean;
  addTransaction: (transaction: TransactionProps) => void;
  deleteTransaction: (id: string) => void;
  totalAmount: number;
  setTotalAmount: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  limitPerPage: number;
  setLimitPerPage: React.Dispatch<React.SetStateAction<number>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  loadValues: {
    bank_id: string;
    type: TransactionType;
  } | null;
  setLoadValues: React.Dispatch<
    React.SetStateAction<{
      bank_id: string;
      type: TransactionType;
    } | null>
  >;
  resetTransactionForm: boolean;
  setResetTransactionForm: React.Dispatch<React.SetStateAction<boolean>>;
  lastTransactions: LastTransactions[];
}

const TransactionContext = createContext<ContextTypes>({} as ContextTypes);

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (!context) throw new Error('Context Error');
  return context;
};

export const TransactionProvider = ({ children }: ProviderProps) => {
  const [transactions, setTransactions] =
    useState<Transaction[]>(transactionsData);
  const [filters, setFilters] = useState<Filters>({});
  const [loadingT, setLoadingT] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [page, setPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(20);
  const [loadValues, setLoadValues] = useState<{
    bank_id: string;
    type: TransactionType;
  } | null>(null);

  const [lastTransactions, setLastTransactions] = useState<
    LastTransactions[] | []
  >([]);

  const { banks, setBanks } = useBank();
  const { cashList, setCashList } = useCash();

  const [resetTransactionForm, setResetTransactionForm] = useState(false);

  const mainCashId = 'f886e431-f093-425a-b06a-3d3dabf4694d';
  const feeCashId = '184a1508-7aec-4abd-a03a-7378f7371248';

  const simulatedWait = () => {
    setLoadingT(true);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setLoadingT(false);
        resolve();
      }, 500);
    });
  };

  useEffect(() => {
    const transactionsByBank = transactions?.reduce(
      (acc: { [bankId: string]: Transaction[] }, t) => {
        const bankId = t.bank_id;
        if (!acc[bankId]) {
          acc[bankId] = [];
        }
        acc[bankId].push(t);
        return acc;
      },
      {},
    );

    const lastTransactionsByBank = Object.keys(transactionsByBank).map(
      (bankId) => {
        const transactionsFromBank = transactionsByBank[bankId];
        const lastT = transactionsFromBank.slice(-3);
        return {
          bank_id: bankId,
          transactions: lastT.reverse(),
        };
      },
    );

    setLastTransactions(lastTransactionsByBank);
  }, [transactions]);

  const addTransaction = async (transaction: TransactionProps) => {
    await simulatedWait();

    const newTransaction = {
      id: v4(),
      created_at: new Date().toISOString(),
      created_by: 'admin',
      ...transaction,
    };

    setTransactions((prevT) => prevT && [...prevT, newTransaction]);

    setBanks((prevBanks) =>
      prevBanks.map((bank) => {
        if (bank.id === transaction.bank_id) {
          bank.amount =
            transaction.type === 'deposit'
              ? bank.amount - Number(transaction.amount)
              : bank.amount + Number(transaction.amount);
          return bank;
        } else {
          return bank;
        }
      }),
    );

    setCashList((prevCash) =>
      prevCash.map((cash) => {
        if (cash.id === mainCashId) {
          cash.amount =
            transaction.type === 'deposit'
              ? cash.amount + Number(transaction.amount)
              : cash.amount - Number(transaction.amount);
          if (Number(transaction.fee) > 0) {
            cash.amount = cash.amount + Number(transaction.fee);
          }
          return cash;
        } else if (Number(transaction.fee) > 0 && cash.id === feeCashId) {
          cash.amount = cash.amount + Number(transaction.fee);
          return cash;
        } else {
          return cash;
        }
      }),
    );

    toast.success('Transacción Añadida', { closeButton: true });
    setResetTransactionForm(true);
  };

  const deleteTransaction = async (id: string) => {
    await simulatedWait();

    const transactionFound = transactions.find((t) => t.id === id);

    if (transactionFound) {
      if (transactionFound.type === 'withdraw') {
        if (
          Number(transactionFound.amount) >
          (banks.find((t) => t.id === transactionFound.bank_id)?.amount || 0)
        ) {
          return toast.error('Error en monto de banco', { closeButton: true });
        }
      } else {
        if (
          Number(transactionFound.amount) >
          (cashList.find((t) => t.id === mainCashId)?.amount || 0)
        ) {
          return toast.error('Error en monto de efectivo', {
            closeButton: true,
          });
        }
      }

      if (
        Number(transactionFound.fee) >
        (cashList.find((c) => c.id === feeCashId)?.amount || 0)
      ) {
        return toast.error('Error en monto de comisión', { closeButton: true });
      }

      setTransactions((prevT) => {
        toast.success('Transacción Eliminada', { closeButton: true });
        return prevT.filter((t) => t.id !== id);
      });

      setCashList((prevCash) =>
        prevCash.map((cash) => {
          if (cash.id === mainCashId) {
            cash.amount =
              transactionFound.type === 'deposit'
                ? cash.amount - Number(transactionFound.amount)
                : cash.amount + Number(transactionFound.amount);
            if (Number(transactionFound.fee) > 0) {
              cash.amount = cash.amount - Number(transactionFound.fee);
            }
            return cash;
          } else if (
            Number(transactionFound.fee) > 0 &&
            cash.id === feeCashId
          ) {
            cash.amount = cash.amount - Number(transactionFound.fee);
            return cash;
          } else {
            return cash;
          }
        }),
      );

      setBanks((prevBanks) =>
        prevBanks.map((bank) => {
          if (bank.id === transactionFound.bank_id) {
            bank.amount =
              transactionFound.type === 'deposit'
                ? bank.amount + Number(transactionFound.amount)
                : bank.amount - Number(transactionFound.amount);
            return bank;
          } else {
            return bank;
          }
        }),
      );
    }
  };

  const values = {
    transactions,
    setTransactions,
    setFilters,
    filters,
    loadingT,
    addTransaction,
    deleteTransaction,
    totalAmount,
    setTotalAmount,
    page,
    limitPerPage,
    setLimitPerPage,
    setPage,
    loadValues,
    setLoadValues,
    resetTransactionForm,
    setResetTransactionForm,
    lastTransactions,
  };

  return (
    <TransactionContext.Provider value={values}>
      {children}
    </TransactionContext.Provider>
  );
};
