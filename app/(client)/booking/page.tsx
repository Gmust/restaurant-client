import { BuildingPlan } from '@/src/components/booking/BuildingPlan';
import { TablesService } from '@/src/service/tablesService';

const BookingPage = async () => {

  const tables = await TablesService.fetchAllTables();
  return (
    < >
      {
        tables ? <div className='flex items-center justify-center w-full'>
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
