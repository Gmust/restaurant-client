import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className='mx-5 flex flex-col mt-14 p-4 '>
      <span className='bg-gray-300 opacity-80 h-0.5 w-full'></span>
      <div className='flex flex-row justify-between mt-2'>
        <p className='text-md text-gray-400 text-opacity-95'>Copyright © 2024. All rights reserved.</p>
        <Link href='https://github.com/Gmust'>
          <p className='text-md text-gray-400 text-opacity-95'>Developed by Illia Dolbnia</p>
        </Link>
      </div>
    </footer>
  );
};

