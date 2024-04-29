'use client';

import { ReactNode, useState } from 'react';
import { Toaster } from 'react-hot-toast';

import { HydrationZustand } from '@/src/components/shared/HydrationZustand';

export const Providers = ({ children }: { children: ReactNode }) => {


  return (
      <HydrationZustand>
        <Toaster/>
        {children}
      </HydrationZustand>
  );
};

