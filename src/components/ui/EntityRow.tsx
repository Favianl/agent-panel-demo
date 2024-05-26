import { useEffect, useState } from 'react';
import { useCash } from '../../context/CashContext';
import { Bank, Cash } from '../../types/GlobalTypes';
import AmountFormat from '../AmountFormat';
import ConfirmPopover from '../ConfirmPopover';
import EditSVG from './EditSVG';
import DeleteSVG from './DeleteSVG';

interface Props {
  entity: Bank | Cash;
  entityIndex: number;
  handleDelete: (entityId: string) => void;
  typeEntity: 'cash' | 'bank';
}

const EntityRow = ({
  entity,
  entityIndex,
  handleDelete,
  typeEntity,
}: Props) => {
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const { editableData, setEditableData } = useCash();

  useEffect(() => {
    if (deleteConfirm) {
      handleDelete(entity.id);
      setDeleteConfirm(false);
      setEditableData(null);
    }
  }, [deleteConfirm, handleDelete, entity.id, setEditableData]);

  return (
    <tr className=' odd:bg-gray-200 dark:odd:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-950'>
      <td className='py-2 pl-4'>{entity.name}</td>
      <td className='py-2 pr-4 text-right'>
        <AmountFormat amount={entity.amount} fixedDecimal />
      </td>
      <td className='py-2'>
        <div className='flex justify-center items-center gap-2'>
          {typeEntity === 'cash' && (
            <button
              className='flex justify-center items-center hover:text-slate-700 dark:hover:text-gray-400'
              onClick={() => setEditableData(entity)}
            >
              <EditSVG />
            </button>
          )}
          {(typeEntity === 'bank'
            ? true
            : entity.id === 'f886e431-f093-425a-b06a-3d3dabf4694d' ||
                entity.id === '184a1508-7aec-4abd-a03a-7378f7371248'
              ? false
              : true) && (
            <ConfirmPopover
              handleConfirm={setDeleteConfirm}
              contentConfirm={
                <div className='mb-3'>
                  <p className='text-center'>
                    ¿Estas seguro de eliminar{' '}
                    {typeEntity === 'cash' ? 'Efectivo' : 'Banco'}?
                  </p>
                  <p className='text-center font-semibold'>{entity.name}</p>
                </div>
              }
              textBtnConfirm='Eliminar'
              popoverStyles={`right-0 ${entityIndex !== 0 ? 'bottom-0' : ''} min-w-[300px]`}
            >
              <button
                disabled={!!editableData}
                className='flex justify-center items-center hover:text-slate-700 dark:hover:text-gray-400'
              >
                <DeleteSVG />
              </button>
            </ConfirmPopover>
          )}
        </div>
      </td>
    </tr>
  );
};

export default EntityRow;
