import { v4 } from 'uuid';
import { createContext, useContext, useState } from 'react';
import { BaseUser, User } from '../types/GlobalTypes';
import { toast } from 'sonner';

interface ProviderProps {
  children: React.ReactNode;
}

interface ContextTypes {
  userAuth: User;
  loadingAuth: boolean;
  register: (userData: BaseUser) => void;
  users: User[];
  deleteUser: (userId: string) => void;
  changePassword: () => void;
  resetAuthForm: boolean;
  setResetAuthForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<ContextTypes>({} as ContextTypes);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('Context Error');
  return context;
};

const usersData = [
  {
    id: '4629ad28-a704-44e8-8277-74235f9e3aca',
    username: 'user1',
    name: 'primer usuario',
    is_admin: false,
    is_active: true,
  },
];

export const AuthProvider = ({ children }: ProviderProps) => {
  const [userAuth, setUserAuth] = useState<User>({
    id: '207334d8-edaf-453f-b8c6-a8c0c92f9b27',
    username: 'admin',
    name: 'Administrador',
    is_admin: true,
    is_active: true,
  });

  const [users, setUsers] = useState<User[]>(usersData);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [resetAuthForm, setResetAuthForm] = useState(false);

  const simulatedWait = () => {
    setLoadingAuth(true);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setLoadingAuth(false);
        resolve();
      }, 500);
    });
  };

  const register = async (userData: BaseUser) => {
    await simulatedWait();

    const newUser = {
      id: v4(),
      username: userData.username,
      name: userData.name,
      is_admin: false,
      is_active: true,
    };

    setUsers((prevUsers) => {
      if (
        prevUsers.some(
          (u) => u.username.toLowerCase() === userData.username.toLowerCase(),
        ) ||
        'admin' === userData.username.toLowerCase()
      ) {
        toast.error('Nombre de usuario ya existe.', { closeButton: true });
        return prevUsers;
      }

      toast.success('Usuario creado.', { closeButton: true });
      setResetAuthForm(true);
      return [...prevUsers, newUser];
    });

    setUserAuth((prevState) => prevState);
  };

  const changePassword = async () => {
    await simulatedWait();

    toast.success('Contraseña actualizada', { closeButton: true });
    setResetAuthForm(true);
  };

  const deleteUser = async (userId: string) => {
    await simulatedWait();
    setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));
    toast.success('Usuario Eliminado', { closeButton: true });
  };

  const values = {
    userAuth,
    register,
    users,
    deleteUser,
    changePassword,
    resetAuthForm,
    setResetAuthForm,
    loadingAuth,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
