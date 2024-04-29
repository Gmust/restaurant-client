import { Metadata } from 'next';

import { BuildingPlan } from '@/src/components/booking/BuildingPlan';
import { TablesService } from '@/src/service/tablesService';

export const metadata: Metadata = {
  title: 'Booking page',
  description: 'Pick and book table for special time',
};

const BookingPage = async () => {

  const tables = await TablesService.fetchAllTables();
  return (
    < >
      {
        tables ? <div className='flex items-center justify-center w-full h-4/5 md:h-fit'>
            <BuildingPlan tables={tables} />
          </div>
          :
          <p className='text-2xl flex items-center justify-center h-4/6'>Unfortunately booking service is not available
            at the moment, try again later,
            please</p>
      }
    </>
  );
};

export default BookingPage;
