export const OrderInfoSkeleton = () => {
  return (
    <div
      className='bg-white p-4 border rounded-md border-black text-black flex flex-col items-center space-y-2 animate-pulse'>
      <h2 className='text-2xl bg-gray-200 h-8 w-32 mb-4'></h2>
      <h3 className='text-xl bg-gray-200 h-6 w-48'></h3>
      <div className='flex flex-col md:grid md:grid-cols-2 md:gap-x-4'>
        <div className='flex-col snap-y snap-mandatory'>
          <p className='text-xl bg-gray-200 h-6 w-36 mb-4'></p>
          <div className='overflow-auto max-h-96 border-2 border-black bg-gray-200 w-full'>
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index}
                   className='flex justify-between text-xl items-center bg-inherit shadow-md border-2 border-[#591d25] p-1 space-x-2 mb-2'>
                <div className='flex items-center space-x-1'>
                  <div className='flex flex-col'>
                    <p className='font-semibold line-clamp-1 bg-gray-200 h-4 w-48'></p>
                    <p className='text-gray-400 opacity-80 bg-gray-200 h-4 w-24'></p>
                  </div>
                </div>
                <div className='flex flex-col items-center'>
                  <p className='bg-gray-200 h-6 w-16'></p>
                  <p className='bg-gray-200 h-6 w-16'></p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='flex flex-col mt-6 justify-start text-lg'>
          <p className='bg-gray-200 h-6 w-36 mb-2'></p>
          <p className='bg-gray-200 h-6 w-28 mb-2'></p>
          <p className='bg-gray-200 h-6 w-48 mb-2'></p>
          <p className='bg-gray-200 h-6 w-20 mb-2'></p>
        </div>
      </div>
    </div>

  );
};

