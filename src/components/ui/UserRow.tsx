import { useEffect, useState } from 'react';
import ConfirmPopover from '../ConfirmPopover';
import { User } from '../../types/GlobalTypes';
import DeleteSVG from './DeleteSVG';

interface Props {
  user: User;
  userIndex: number;
  deleteUser: (userId: string) => void;
}

const UserRow = ({ user, userIndex, deleteUser }: Props) => {
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  useEffect(() => {
    if (deleteConfirm) {
      deleteUser(user.id);
      setDeleteConfirm(false);
    }
  }, [deleteConfirm, deleteUser, user.id]);

  return (
    <tr className=' odd:bg-gray-200 dark:odd:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-950'>
      <td className='py-2 pl-4'>{user.username}</td>
      <td className='py-2'>{user.name}</td>
      <td className='py-2 flex justify-center'>
        <ConfirmPopover
          handleConfirm={setDeleteConfirm}
          contentConfirm={
            <div className='mb-3'>
              <p className='text-center'>¿Estas seguro de eliminar usuario?</p>
              <p className='text-center font-semibold'>{user.username}</p>
            </div>
          }
          textBtnConfirm='Eliminar'
          popoverStyles={`right-0 ${userIndex !== 0 ? 'bottom-0' : ''} min-w-[300px]`}
        >
          <button className='flex justify-center items-center hover:text-slate-700 dark:hover:text-gray-400'>
            <DeleteSVG />
          </button>
        </ConfirmPopover>
      </td>
    </tr>
  );
};

export default UserRow;
