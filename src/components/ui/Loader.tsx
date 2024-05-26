const Loader = () => {
  return (
    <div className='fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center bg-black bg-opacity-40 z-[500]'>
      <div
        className='inline-block h-16 w-16 animate-spin rounded-full border-[8px] border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
        role='status'
      ></div>
    </div>
  );
};

export default Loader;
