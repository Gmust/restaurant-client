'use client';

import { Button } from '@/src/components/shared/Button';

const Error = () => {
  return (
    <div className='flex flex-col items-center justify-center text-2xl text-red-600 font-semibold'>
      Error, try to reload the page
      <Button onClick={() => window.location.reload()}>Reload</Button>
    </div>
  );
};

export default Error;
