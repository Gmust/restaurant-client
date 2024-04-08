'use client';

import { Roles } from '@/@types/user';
import { capitalizeFirstLetter } from '@/src/lib/utils';
import { CustomInput } from '@/src/components/shared/CustomInput';
import { Button } from '@/src/components/shared/Button';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { notifyUserValidator } from '@/src/lib/validations/notify-user';
import { z, ZodError } from 'zod';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { NotificationsService } from '@/src/service/notificationsService';

type formData = z.infer<typeof notifyUserValidator>


export const NotificationForm = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { reset, register, setError, formState: { errors, isValid }, handleSubmit } = useForm<formData>({
    resolver: zodResolver(notifyUserValidator),
    mode: 'all',
  });

  const onSubmit = async ({ message, subject, role }: formData) => {
    setIsLoading(true);
    try {

      const response = await NotificationsService.sendNotification({
        message,
        subject,
        role,
      });

      toast.success(response.message)
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(e.response!.data.message);
      } else if (e instanceof ZodError) {
        toast.error(e.message);
      } else toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-5/6 mt-2 space-y-4'>
      <div>
        <label htmlFor='role'>Select receivers:</label>
        <select id='role'   {...register('role')}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'>
          {Object.values(Roles).map(role =>
            <option value={role} key={role}>{capitalizeFirstLetter(role)}</option>,
          )}
        </select>
        <p className='text-xl text-red-700'>{errors.role && errors.role.message}</p>
      </div>
      <div>
        <label htmlFor='subject'>Subject of email:</label>
        <CustomInput id='subject' variant='rounded' className='text-xl' {...register('subject')}
                     type='text' />
        <p className='text-xl text-red-700'>{errors.subject && errors.subject.message}</p>
      </div>
      <div>
        <label htmlFor='message'>Message:</label>
        <textarea id='message' rows={4} {...register('message')}
                  className='block min-w-96 p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500' />
        <p className='text-xl text-red-700'>{errors.message && errors.message.message}</p>
      </div>
      <Button type='submit' isLoading={isLoading} disabled={!isValid || isLoading}>
        Notify users
      </Button>
    </form>
  );
};

