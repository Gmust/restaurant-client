'use client';

import { Elements } from '@stripe/react-stripe-js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, useState } from 'react';
import { Toaster } from 'react-hot-toast';

import { HydrationZustand } from '@/src/components/shared/HydrationZustand';

export const Providers = ({ children }: { children: ReactNode }) => {

  const [client] = useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <HydrationZustand>
        <Toaster/>
        {children}
      </HydrationZustand>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

