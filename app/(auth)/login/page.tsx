'use client';

import { CustomInput } from '@/src/components/shared/CustomInput';
import { MdEmail, MdPassword } from 'react-icons/md';
import { Button } from '@/src/components/shared/Button';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { loginUserValidator } from '@/src/lib/validations/login-user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { AuthService } from '@/src/service/authService';
import { storeToken } from '@/src/lib/store-token';
import { useUserStore } from '@/src/store/user-store';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


type formData = z.infer<typeof loginUserValidator>

const LoginPage = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { actions: { setUser, setIsAuth } } = useUserStore();
  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<formData>({
    mode: 'all',
    resolver: zodResolver(loginUserValidator),
  });

  const onSubmit = async ({ password, email }: formData) => {
    setIsLoading(true);
    try {
      const response = await AuthService.loginUser({ email, password });
      if (response?.user) {
        await storeToken({
          refresh_token: response!.refresh_token,
          access_token: response!.access_token,
          email: response!.user.email,
        });
        setUser(response!.user);
        setIsAuth(true);
        reset();
        toast.success('Successfully logged in!');
        router.push('/user/account');
      } else if (response?.statusCode && response.statusCode == 401) {
        toast.error(response?.message!);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className='flex justify-center items-center h-2/3'>
      <div className='bg-white flex flex-col p-8 rounded-md items-center space-y-2 w-1/3'>
        <h1 className='text-4xl text-black font-semibold'>Login</h1>
        <div className='border-b-4 border-amber-700 w-full'></div>
        <form className='flex flex-col space-y-4 w-full' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col'>
            <label htmlFor='email' className='text-2xl text-black '>Email:</label>
            <CustomInput autoComplete='email' size='md' id='email' variant='default' Icon={MdEmail}
                         type='email' {...register('email')} />
            <p className='text-red-700 font-semibold'>{errors.email && errors.email.message}</p>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='password' className='text-2xl text-black '>Password:</label>
            <CustomInput autoComplete='current-password' size='md' id='password' variant='default' Icon={MdPassword}
                         type='password'  {...register('password')} />
            <p className='text-red-700 font-semibold'>{errors.password && errors.password?.message}</p>
          </div>
          <Button type='submit' variant='default' isLoading={isLoading}>
            Login
          </Button>
        </form>
        <div className='border-b-4 border-amber-700 w-full'></div>
        <div className='flex items-center space-x-1 text-xl text-black opacity-80'>
          <p>Don`t have account?</p>
          <Link href='/registration' className='opacity-100 font-semibold underline decoration-amber-600'>
            Create it!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
