'use client';

const Loading = () => {
  return (
    <div className='flex flex-col text-black text-2xl p-2'>
      <h2 className='font-semibold text-3xl'>Available promo codes:</h2>
      <div className='flex items-start justify-between h-full'>
        <div className='grid grid-cols-1 gap-y-1 mt-2 max-h-[500px] overflow-y-auto'>
          {Array.from({ length: 3 }).map((promoCode, index) => (
            <div key={index} className='flex flex-col p-2 border-2 border-black rounded-md'>
              <p className='font-bold'>Promo code: <span
                className='animate-pulse bg-gray-200 inline-block h-5 w-20 rounded-md'></span></p>
              <div className='flex justify-between space-x-8'>
                <div>
                  <p className='font-bold'>Discount value: <span
                    className='animate-pulse bg-gray-200 inline-block h-5 w-16 rounded-md'></span></p>
                  <p className='font-bold'>Expires in: <span
                    className='animate-pulse bg-gray-200 inline-block h-5 w-20 rounded-md'></span></p>
                </div>
                <div>
                  <p className='font-bold'>Created at: <span
                    className='animate-pulse bg-gray-200 inline-block h-5 w-20 rounded-md'></span></p>
                  <p className='font-bold'>Updated at: <span
                    className='animate-pulse bg-gray-200 inline-block h-5 w-20 rounded-md'></span></p>
                </div>
              </div>
              <div className='mt-2'>
                <button className='animate-pulse bg-red-200 hover:bg-red-300 h-10 w-10 rounded-md'></button>
              </div>
            </div>
          ))}
        </div>
        <button className='animate-pulse bg-gray-200 hover:bg-gray-300 h-12 px-4 rounded-lg mt-4'>Create promo code
        </button>
      </div>
    </div>
  );
};

export default Loading;
