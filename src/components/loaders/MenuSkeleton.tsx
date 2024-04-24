interface IMenuSkeleton {
  itemsAmount: number;
}

export const MenuSkeleton = ({ itemsAmount }: IMenuSkeleton) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 align-middle justify-items-center gap-6 md:gap-12 mx-8'>

      {Array.from({ length: itemsAmount }).map((_, index) =>
        <div
          key={index}
          className='w-[310px] h-[110px] flex flex-row space-x-3 bg-inherit transition duration-200 shadow-md border-2 border-[#591d25] p-1'
        >
          <div className='w-[70px] h-[50px] bg-gray-300 rounded-sm'></div>
          <div className='flex flex-col w-full'>
            <div className='flex flex-row  justify-between'>
              <div className='flex flex-col'>
                <h3 className='text-xl bg-gray-200 w-[60px]'>&nbsp;</h3>
                <p className='text-amber-500 bg-gray-200 w-[60px]'>&nbsp;</p>
              </div>
              <span
                className='border-2 border-amber-400 flex justify-center items-center h-10 w-10 p-1 bg-gray-200'>
                &nbsp;
              </span>
            </div>
            <p className='line-clamp-2 bg-gray-200 w-[100px] h-[50px]'>&nbsp;</p>
          </div>
        </div>,
      )}
    </div>
  );
};
3;
