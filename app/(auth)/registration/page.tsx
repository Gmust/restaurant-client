'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { MdEmail, MdPassword, MdRepeat } from 'react-icons/md';
import { PiTextbox, PiTextT } from 'react-icons/pi';
import { z } from 'zod';

import { Button } from '@/src/components/shared/Button';
import { CustomInput } from '@/src/components/shared/CustomInput';
import { cn } from '@/src/lib/utils';
import { createAccountValidator } from '@/src/lib/validations/create-account';
import { AuthService } from '@/src/service/authService';


type formData = z.infer<typeof createAccountValidator>

const RegistrationPage = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    reset,
  } = useForm<formData>({ resolver: zodResolver(createAccountValidator), mode: 'all' });

  const onSubmit = async (formData: formData) => {
    setIsLoading(true);
    try {
      const response = await AuthService.registerUser(formData);
      if (response!.statusCode && response!.statusCode === 400) {
        toast.error(response!.message);
      } else {
        toast.success(response!.message);
        reset();
      }
    } catch (e) {
      toast('Something went wrong, try again later');
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center'>
      <div className='bg-white flex flex-col p-8 rounded-md items-center space-y-2 w-1/3'>
        <h1 className='text-4xl text-black font-semibold'>Registration</h1>
        <div className='border-b-4 border-amber-700 w-full'></div>
        <form className='flex flex-col space-y-4 w-full' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col'>
            <label htmlFor='email' className='text-2xl text-black '>Email:</label>
            <CustomInput autoComplete='email' size='md' id='email' variant='default' Icon={MdEmail}
                         type='email' {...register('email')} />
            <p className='text-red-700 font-semibold'>{errors.email && errors.email.message}</p>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='firstName' className='text-2xl text-black '>First name</label>
            <CustomInput autoComplete='given-name' size='md' id='firstName' variant='default' type='text'
                         Icon={PiTextbox} {...register('firstName')} />
            <p className='text-red-700 font-semibold'>{errors.firstName && errors.firstName.message}</p>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='secondName' className='text-2xl text-black '>Second name</label>
            <CustomInput autoComplete='family-name' size='md' id='secondName' variant='default' type='text'
                         Icon={PiTextbox} {...register('secondName')} />
            <p className='text-red-700 font-semibold'>{errors.secondName && errors.secondName.message}</p>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='password' className='text-2xl text-black '>Password:</label>
            <CustomInput autoComplete='new-password' size='md' id='password' variant='default' Icon={MdPassword}
                         type='password' {...register('password')} />
            <p className='text-red-700 font-semibold'>{errors.password && errors.password.message}</p>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='repeat-password' className='text-2xl text-black '>Repeat password:</label>
            <CustomInput size='md' id='repeat-password' variant='default' Icon={MdRepeat}
                         type='password' {...register('confirmPassword')} />
            <p className='text-red-700 font-semibold'>{errors.confirmPassword && errors.confirmPassword.message}</p>
          </div>
          <div className='flex text-black justify-around'>
            <label htmlFor='receive-news'>I want receive news about events etc...</label>
            <input id='receive-news' type='checkbox'{...register('receiveNews')}
                   className='w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 cursor-pointer' />
          </div>
          <Button type='submit' variant='default' disabled={!isValid && isLoading} isLoading={isLoading}>
            Register
          </Button>
        </form>
        <div className='border-b-4 border-amber-700 w-full'></div>
        <div className='flex items-center space-x-1 text-xl text-black opacity-80'>
          <p>Already have account?</p>
          <Link href='/login' className='opacity-100 font-semibold underline decoration-amber-600'>Login to
            it!</Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
