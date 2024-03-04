'use client';

import { CustomInput } from '@/src/components/shared/CustomInput';
import { MdEmail, MdPassword } from 'react-icons/md';
import { Button } from '@/src/components/shared/Button';
import Link from 'next/link';

const LoginPage = () => {


  return (
    <div className='flex justify-center items-center h-2/3'>
      <div className='bg-white flex flex-col p-8 rounded-md items-center space-y-2 w-1/3'>
        <h1 className='text-4xl text-black font-semibold'>Login</h1>
        <div className='border-b-4 border-amber-700 w-full'></div>
        <form className='flex flex-col space-y-4 w-full'>
          <div className='flex flex-col'>
            <label htmlFor='email' className='text-2xl text-black '>Email:</label>
            <CustomInput autoComplete='email' size='md' id='email' variant='default' Icon={MdEmail} type='email' />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='password' className='text-2xl text-black '>Password:</label>
            <CustomInput autoComplete='current-password' size='md' id='password' variant='default' Icon={MdPassword}
                         type='password' />
          </div>
          <Button type='submit' variant='default'>
            Login
          </Button>
        </form>
        <div className='border-b-4 border-amber-700 w-full'></div>
        <div className='flex items-center space-x-1 text-xl text-black opacity-80'>
          <p>Don`t have account?</p>
          <Link href='/registration' className='opacity-100 font-semibold underline decoration-amber-600'>Create
            it!</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
