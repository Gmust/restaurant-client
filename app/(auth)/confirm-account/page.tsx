import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Button } from '@/src/components/shared/Button';
import { AuthService } from '@/src/service/authService';

type ConfirmAccountSearchParams = {
  token: string,
  email: string
}

type Props = {
  params: {},
  searchParams: ConfirmAccountSearchParams,
}


export const metadata: Metadata = {
  title: 'Account confirmation',
  description: 'Account confirmation page',
};

const ConfirmAccountPage = async ({ params, searchParams }: Props) => {
  if (!searchParams) {
    notFound();
  }

  const response = await AuthService.confirmAccount({
    token: encodeURIComponent(searchParams.token),
    email: searchParams.email,
  });

  return (
    <div className='flex justify-around items-center h-5/6'>
      {
        response.statusCode === 401 &&
        <p className='text-4xl font-semibold'>
          <div>{response.message}</div>
        </p>
      }
      {
        !response.statusCode &&
        <div className='flex flex-col items-center space-y-6'>
          <p className='text-4xl font-semibold'>{response.message}</p>
          <Link href='/login'>
            <Button size='lg'>
              Login
            </Button>
          </Link>
        </div>
      }
    </div>
  );
};


export default ConfirmAccountPage;
