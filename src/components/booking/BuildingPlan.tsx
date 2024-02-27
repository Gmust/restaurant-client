import { FirstTable } from '@/src/components/booking/tables/FirstTable';
import { SecondTable } from '@/src/components/booking/tables/SecondTable';
import { ITable } from '@/@types/tables';
import { ThirdTable } from '@/src/components/booking/tables/ThirdTable';
import { FourthTable } from '@/src/components/booking/tables/FourthTable';
import { FifthTable } from '@/src/components/booking/tables/FifthTable';
import { Entrance } from '@/src/components/booking/tables/Entrance';


interface BuildingPlanProps {
  tables: ITable[];
}

export const BuildingPlan = ({ tables }: BuildingPlanProps) => {
  // Sample data of tables

  return (
    <div className='tablesContainer'>
      <div className='entrance'>
        <Entrance />
      </div>
      <div className='thirdTable '>
        <ThirdTable {...tables[2]} />
      </div>
      <div className='firstTable'>
        <FirstTable {...tables[0]} />
      </div>
      <div className='fifthTable'>
        <FifthTable {...tables[4]} />
      </div>
      <div className='secondTable'>
        <SecondTable {...tables[1]} />
      </div>
      <div className='fourthTable'>
        <FourthTable {...tables[3]} />
      </div>
    </div>
  );
};
