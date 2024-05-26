export interface LoginUser {
  username: string;
  password: string;
}

export interface BaseUser extends LoginUser {
  name: string;
  passwordConfirm?: string;
}

export interface User extends Omit<BaseUser, 'password' | 'passwordConfirm'> {
  id: string;
  is_admin: boolean;
  is_active: boolean;
}

export interface Bank {
  id: string;
  name: string;
  amount: number;
  is_active: boolean;
}

export interface Cash {
  id: string;
  name: string;
  amount: number;
  is_active?: boolean;
}

export type TransactionType = 'withdraw' | 'deposit';

export interface BaseTransaction {
  bank_id: string;
  type: TransactionType;
  amount: number | string;
  fee?: number | string;
  description?: string | null;
}

export interface Transaction extends BaseTransaction {
  bank_name: string;
  id: string;
  created_at: string;
  created_by: string;
}

export interface LastTransactions {
  bank_id: string;
  transactions: Transaction[];
}

export interface Filters {
  bank_id?: string;
  type?: TransactionType;
  fee?: number;
  startDate?: string;
  endDate?: string;
}
