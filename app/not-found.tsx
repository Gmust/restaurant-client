import Link from 'next/link';
import { Button } from '@/src/components/shared/Button';

const NotFound = () => {
  return (
    <div className='animate-fadeInBottom flex flex-col h-3/4  items-center justify-center text-2xl '>
      <h2 className='font-bold'>Not Found</h2>
      <p>Could not find requested resource</p>
      <Button>
        <Link href='/menu'>
          Return to the main page
        </Link>
      </Button>
    </div>
  );
};


export default NotFound;
