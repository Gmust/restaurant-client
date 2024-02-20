import { ReactNode, useEffect, useState } from 'react';

export const HydrationZustand = ({ children }: { children: ReactNode }) => {

  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <>
      {
        isHydrated ? children  : null
      }
    </>
  );
};

