import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Link href='/'>
      <Image src='/restaurant-logo.png' alt='restaurant-logo' fill className='cursor-pointer' />
    </Link>
  );
};

