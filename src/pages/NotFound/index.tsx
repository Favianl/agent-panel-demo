import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className='h-[calc(100vh-3rem)] flex justify-center items-center'>
      <div className='text-center'>
        <h1 className='text-4xl'>404</h1>
        <h2 className='text-2xl'>Página no encontrada</h2>
        <p className='text-xs mb-4'>
          Lo sentimos, la página solicitada no existe.
        </p>
        <Link className='bg-blue-600 p-2 rounded-md text-gray-100' to='/'>
          Volver
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
