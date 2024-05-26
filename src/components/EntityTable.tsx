import { Bank, Cash } from '../types/GlobalTypes';
import EntityRow from './ui/EntityRow';

interface Props {
  entityList: Bank[] | Cash[];
  handleDelete: (entityId: string) => void;
  typeEntity: 'cash' | 'bank';
}
const EntityTable = ({ entityList, handleDelete, typeEntity }: Props) => {
  return (
    <div className='max-h-[300px] min-h-[200px] overflow-auto'>
      {entityList.length < 1 ? (
        <div className='text-center italic text-sm py-8'>
          No hay {typeEntity === 'cash' ? 'Efectivos' : 'Bancos'} disponibles
        </div>
      ) : (
        <table className='table-auto w-full'>
          <thead className='text-gray-900 dark:text-gray-200'>
            <tr className='border-b-[10px] border-b-gray-100 dark:border-b-slate-900'>
              <th className='bg-gray-300 dark:bg-slate-800 rounded-l-md'>
                Nombre
              </th>
              <th className='bg-gray-300 dark:bg-slate-800 text-right pr-4'>
                Monto
              </th>
              <th className='bg-gray-300 dark:bg-slate-800 rounded-r-md'>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className='text-left'>
            {entityList.map((entity, index) => (
              <EntityRow
                key={entity.id}
                entityIndex={index}
                entity={entity}
                handleDelete={handleDelete}
                typeEntity={typeEntity}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EntityTable;
