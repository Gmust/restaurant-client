import { Metadata } from 'next';

import { Registration } from '@/src/components/auth/Registration';

export const metadata: Metadata = {
  title: 'Registration',
  description: 'Create account in our app to receive an ability of real-time order status tracking',
};

const RegistrationPage = () => {

  return (
    <>
      <Registration />
    </>
  );
};

export default RegistrationPage;
