'use client'

import { useState } from 'react';

import { ITable } from '@/@types/tables';
import { Entrance } from '@/src/components/booking/tables/Entrance';
import { FifthTable } from '@/src/components/booking/tables/FifthTable';
import { FirstTable } from '@/src/components/booking/tables/FirstTable';
import { FourthTable } from '@/src/components/booking/tables/FourthTable';
import { SecondTable } from '@/src/components/booking/tables/SecondTable';
import { ThirdTable } from '@/src/components/booking/tables/ThirdTable';


interface BuildingPlanProps {
  tables: ITable[];
}

export const BuildingPlan = ({ tables }: BuildingPlanProps) => {

  return (
    <div className='tablesContainer'>
      <div className='entrance'>
        <Entrance />
      </div>
      <div className='firstTable'>
        <FirstTable {...tables[0]} />
      </div>
      <div className='secondTable'>
        <SecondTable {...tables[1]} />
      </div>
      <div className='thirdTable '>
        <ThirdTable {...tables[2]} />
      </div>
      <div className='fourthTable'>
        <FourthTable {...tables[3]} />
      </div>
      <div className='fifthTable'>
        <FifthTable {...tables[4]} />
      </div>
    </div>
  );
};
