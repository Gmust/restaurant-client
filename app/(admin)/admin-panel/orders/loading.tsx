'use client';

const Loading = () => {
  return (
    <section className='flex items-start p-4 justify-between'>
      <div className='flex flex-col space-y-4 overflow-y-auto w-2/3'>
        {Array.from({ length: 5 }).map((order, index) =>
          <div key={index}
               className='flex flex-col text-xl text-black border-[3px] border-black rounded-md p-2 animate-pulse cursor-pointer hover:scale-95 hover:shadow-2xl transition duration-300'>
            <div className='flex justify-between'>
              <div>
                <div className='h-6 w-32 bg-gray-300 mb-2'></div>
                <div className='h-6 w-20 bg-gray-300'></div>
              </div>
              <div>
                <div className='h-6 w-20 bg-gray-300'></div>
                <div className='h-6 w-16 bg-gray-300'></div>
              </div>
            </div>
            <div className='flex justify-between space-x-3 mt-2'>
              <div className='h-6 w-36 bg-gray-300'></div>
              <div className='h-6 w-36 bg-gray-300'></div>
            </div>
          </div>)}
      </div>
      <div className='space-y-2'>
        <p className='font-bold'>Order number: <span
          className='animate-pulse bg-gray-200 inline-block h-5 w-20 rounded-md'></span></p>
        <p className='font-bold'>Email: <span
          className='animate-pulse bg-gray-200 inline-block h-5 w-48 rounded-md'></span></p>
        <p className='font-bold'>Price: <span
          className='animate-pulse bg-gray-200 inline-block h-5 w-20 rounded-md'></span></p>
        <p className='font-bold'>Is takeaway: <span
          className='animate-pulse bg-gray-200 inline-block h-5 w-10 rounded-md'></span></p>
        <div className='space-y-2 max-h-[350px] overflow-y-auto'>
          {/* Skeleton for order items */}
          {[...Array(5)].map((_, index) => (
            <div key={index} className='animate-pulse bg-gray-200 h-8 w-full rounded-md'></div>
          ))}
        </div>
        <div className='space-y-2'>
          <p className='font-bold'>Current status: <span
            className='animate-pulse bg-gray-200 inline-block h-5 w-20 rounded-md'></span></p>
          <div className='w-full'>
            <select
              className='text-2xl block py-1 w-full text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'>
              <option value='' className='animate-pulse bg-gray-200'></option>
            </select>
          </div>
          <div className='flex space-x-4'>
            <div className='animate-pulse bg-gray-200 h-10 w-24 rounded-md'></div>
            <div className='animate-pulse bg-gray-200 h-10 w-24 rounded-md'></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Loading;
