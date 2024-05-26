import { createContext, useContext, useState } from 'react';
import { Cash } from '../types/GlobalTypes';
import { toast } from 'sonner';
import { v4 } from 'uuid';

interface ProviderProps {
  children: React.ReactNode;
}

interface ContextTypes {
  cashList: Cash[];
  globalTotal: number;
  setCashList: React.Dispatch<React.SetStateAction<Cash[]>>;
  createCash: (cashData: { name: string; amount: number }) => void;
  updateCash: (
    cashData: { name: string; amount: number },
    cashId: string,
  ) => void;
  deleteCash: (cashId: string) => void;
  loadingCash: boolean;
  editableData: Cash | null;
  setEditableData: React.Dispatch<React.SetStateAction<Cash | null>>;
  setGlobalTotal: React.Dispatch<React.SetStateAction<number>>;
  resetEntityForm: boolean;
  setResetEntityForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const CashContext = createContext<ContextTypes>({} as ContextTypes);

export const useCash = () => {
  const context = useContext(CashContext);
  if (!context) throw new Error('Context Error');
  return context;
};

const cashData = [
  {
    id: 'f886e431-f093-425a-b06a-3d3dabf4694d',
    name: 'Efectivo Principal',
    amount: 1672,
  },
  {
    id: '184a1508-7aec-4abd-a03a-7378f7371248',
    name: 'Efectivo Comisión',
    amount: 16,
  },
];

export const CashProvider = ({ children }: ProviderProps) => {
  const [cashList, setCashList] = useState<Cash[]>(cashData);
  const [loadingCash, setLoadingCash] = useState(false);
  const [editableData, setEditableData] = useState<Cash | null>(null);
  const [globalTotal, setGlobalTotal] = useState(0);
  const [resetEntityForm, setResetEntityForm] = useState(false);

  const mainCashId = 'f886e431-f093-425a-b06a-3d3dabf4694d';
  const feeCashId = '184a1508-7aec-4abd-a03a-7378f7371248';

  const simulatedWait = () => {
    setLoadingCash(true);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setLoadingCash(false);
        resolve();
      }, 500);
    });
  };

  const createCash = async (cashData: { name: string; amount: number }) => {
    const newCash = {
      id: v4(),
      is_active: true,
      ...cashData,
    };
    await simulatedWait();

    setCashList((prevCashList) => {
      if (
        prevCashList.some(
          (c) => c.name.toLowerCase() === cashData.name.toLowerCase(),
        )
      ) {
        toast.error('Nombre de efectivo ya existe.', { closeButton: true });
        return prevCashList;
      } else {
        const newCashList = prevCashList.map((c) =>
          c.id === mainCashId ? { ...c, amount: c.amount + newCash.amount } : c,
        );

        toast.success('Efectivo creado', { closeButton: true });
        setResetEntityForm(true);
        return [...newCashList, newCash];
      }
    });
  };

  const updateCash = async (
    cashData: { name: string; amount: number },
    cashId: string,
  ) => {
    await simulatedWait();

    setCashList((prevCashList) => {
      if (
        prevCashList.some(
          (c) =>
            c.id !== cashId &&
            c.name.toLowerCase() === cashData.name.toLowerCase(),
        )
      ) {
        toast.error('Nombre de efectivo ya existe.', { closeButton: true });
        return prevCashList;
      }

      if (cashId === mainCashId || cashId === feeCashId) {
        toast.success('Actualización Exitosa', { closeButton: true });
        setResetEntityForm(true);
        setEditableData(null);

        return prevCashList.map((c) =>
          c.id === cashId
            ? { ...c, name: cashData.name, amount: cashData.amount }
            : c,
        );
      } else {
        const currentAmount =
          prevCashList.find((c) => c.id === cashId)?.amount || 0;

        const mainAmount =
          prevCashList.find((c) => c.id === mainCashId)?.amount || 0;

        let resultAmount = 0;

        if (cashData.amount < currentAmount) {
          resultAmount = mainAmount - (currentAmount - cashData.amount);
        } else if (cashData.amount > currentAmount) {
          resultAmount = mainAmount + (cashData.amount - currentAmount);
        } else {
          resultAmount = mainAmount;
        }

        if (resultAmount < 0) {
          toast.error('Error de monto', { closeButton: true });

          return prevCashList;
        }

        toast.success('Actualización Exitosa', { closeButton: true });
        setResetEntityForm(true);
        setEditableData(null);
        return prevCashList.map((c) => {
          if (c.id === mainCashId) {
            return { ...c, amount: resultAmount };
          } else if (c.id === cashId) {
            return { ...c, name: cashData.name, amount: cashData.amount };
          } else {
            return c;
          }
        });
      }
    });
  };

  const deleteCash = async (cashId: string) => {
    await simulatedWait();

    setCashList((prevCashList) => {
      const amountToSubtract =
        prevCashList.find((c) => c.id === cashId)?.amount || 0;

      const mainCashAmount =
        prevCashList.find((c) => c.id === mainCashId)?.amount || 0;

      const resultAmount = mainCashAmount - amountToSubtract;

      if (resultAmount > 0) {
        const newCashList = prevCashList.map((c) =>
          c.id === mainCashId ? { ...c, amount: resultAmount } : c,
        );

        toast.success('Efectivo eliminado', { closeButton: true });
        return newCashList.filter((c) => c.id !== cashId);
      } else {
        toast.error('Error de monto', { closeButton: true });
        return prevCashList;
      }
    });
  };

  const values = {
    cashList,
    globalTotal,
    setGlobalTotal,
    setCashList,
    loadingCash,
    createCash,
    updateCash,
    deleteCash,
    editableData,
    setEditableData,
    resetEntityForm,
    setResetEntityForm,
  };

  return <CashContext.Provider value={values}>{children}</CashContext.Provider>;
};
