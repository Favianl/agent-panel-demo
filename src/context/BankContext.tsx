import { createContext, useContext, useEffect, useState } from 'react';
import { Bank } from '../types/GlobalTypes';
import { useCash } from './CashContext';
import { toast } from 'sonner';
import { v4 } from 'uuid';

interface ProviderProps {
  children: React.ReactNode;
}

interface ContextTypes {
  banks: Bank[];
  setBanks: React.Dispatch<React.SetStateAction<Bank[]>>;
  loadingBank: boolean;
  createBank: (cashData: { name: string; amount: number }) => void;
  deleteBank: (bankId: string) => void;
}

const BankContext = createContext<ContextTypes>({} as ContextTypes);

export const useBank = () => {
  const context = useContext(BankContext);
  if (!context) throw new Error('Context Error');
  return context;
};

const banksData = [
  {
    id: '7e0f9185-516e-478b-bddc-95b2447f6266',
    name: 'Banco A',
    amount: 500,
    is_active: true,
  },
  {
    id: '7f711f3d-f708-4aaa-a776-af9e8cb5178c',
    name: 'Banco B',
    amount: 1000,
    is_active: true,
  },
  {
    id: 'bbf350ee-5fb8-4056-a585-1aacd8ca8ec0',
    name: 'Banco C',
    amount: 1500,
    is_active: true,
  },
  {
    id: 'ad9cc702-e7cf-48e0-b282-22536913411d',
    name: 'Banco D',
    is_active: true,
    amount: 120.5,
  },
  {
    id: '419f45f2-d13f-4b19-b434-cabb6e0e1c29',
    name: 'Banco E',
    is_active: true,
    amount: 223.5,
  },
];

export const BankProvider = ({ children }: ProviderProps) => {
  const [banks, setBanks] = useState<Bank[]>(banksData);
  const [loadingBank, setLoadingBank] = useState(false);

  const { setGlobalTotal, cashList } = useCash();

  const simulatedWait = () => {
    setLoadingBank(true);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setLoadingBank(false);
        resolve();
      }, 500);
    });
  };

  useEffect(() => {
    const total =
      banks.reduce((acc, b) => b.amount + acc, 0) +
      (cashList.find((c) => c.id === 'f886e431-f093-425a-b06a-3d3dabf4694d')
        ?.amount || 0);

    setGlobalTotal(total);
  }, [banks, cashList, setGlobalTotal]);

  const createBank = async (bankData: { name: string; amount: number }) => {
    await simulatedWait();

    const newBank = {
      id: v4(),
      is_active: true,
      ...bankData,
    };

    setBanks((prevBanks) => {
      if (
        prevBanks.some(
          (b) => b.name.toLowerCase() === bankData.name.toLowerCase(),
        )
      ) {
        toast.error('Nombre de banco ya existe.', { closeButton: true });
        return prevBanks;
      }

      toast.success('Banco creado', { closeButton: true });
      return [...prevBanks, newBank];
    });
  };

  const deleteBank = async (bankId: string) => {
    await simulatedWait();

    setBanks((prevBanks) => prevBanks.filter((b) => b.id !== bankId));
    toast.success('Banco eliminado', { closeButton: true });
  };

  const values = {
    banks,
    setBanks,
    loadingBank,
    createBank,
    deleteBank,
  };

  return <BankContext.Provider value={values}>{children}</BankContext.Provider>;
};
