import Image from 'next/image';

export const RestaurantImage = () => {
  return (
    <div data-testid='restaurant-image' className='animate-fadeInLeft relative lg:w-[800px] lg:h-[435px] md:w-[600px] md:h-[300px] sm:w-[300px]  sm:h-[300px] h-[300px] w-[360px]'>
      <Image
        src='/restaurant-picture.jpg'
        alt='restaurant-image'
        className='rounded-lg'
        draggable={false}
        fill
      />
    </div>
  );
};

