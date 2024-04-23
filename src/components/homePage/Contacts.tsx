export const Contacts = () => {
  return (
    <section className='flex flex-col md:flex-row justify-between items-center mt-10 md:px-40 animate-fadeInBottom'>
      <div
        className='md:divide-y space-y-7 flex md:flex-col bg-orange-900 border-2 border-amber-700  p-2 md:p-6 rounded-md '>
        <div className='flex flex-col space-y-4 text-sm'>
          <div title='Location' id='location' className='flex flex-col space-y-2'>
            <h3 className='text-2xl text-bold'>Location</h3>
            <p className='text-md'>Kościelna 17, 60-536 Poznań</p>
          </div>
          <div title='Telephone' id='telephone' className='flex flex-col space-y-2'>
            <h3 className='text-2xl text-bold'>Telephone</h3>
            <p className='text-md'> +48 8 800 555 3535 </p>
          </div>
          <div title='Opening-hours' id='opening-hours' className='flex flex-col space-y-2'>
            <h3 className='text-2xl text-bold'>Opening hours</h3>
            <p className='text-md'>Working days: form 10:00 till 19:00</p>
            <p className='text-md'>Weekends: form 10:00 till 17:00</p>
          </div>
        </div>
        <div className='space-y-6'>
          <div title='Director' id='director' className='space-y-2'>
            <h3 className='text-2xl text-bold'>Director</h3>
            <p className='md:text-xl'>Fitzwilliam Alexander</p>
          </div>
          <div title='Chef' id='chef' className='space-y-2'>
            <h3 className='text-2xl text-bold'>Chef</h3>
            <p className='md:text-xl'>Adrijana Niraj</p>
          </div>
        </div>
      </div>
      <div className='relative overflow-hidden w-full pt-[56.25%] mt-10'>
        <iframe className='absolute top-0 left-0 bottom-0 right-0 w-full h-full' frameBorder='0' scrolling='no'
                marginHeight={0} marginWidth={0}
                src='https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Ko%C5%9Bcielna%2017,%2060-536%20Pozna%C5%84+(Bar)&amp;t=k&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed'>
        </iframe>
      </div>
    </section>
  );
};

