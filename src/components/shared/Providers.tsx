'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, useState } from 'react';
import { HydrationZustand } from '@/src/components/shared/HydrationZustand';
import { Elements } from '@stripe/react-stripe-js';

export const Providers = ({ children }: { children: ReactNode }) => {

  const [client] = useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <HydrationZustand>
        {children}
      </HydrationZustand>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

