import { Metadata } from 'next';

import { Login } from '@/src/components/auth/Login';

export const metadata: Metadata = {
  title: 'Login Page',
  description: 'Log in into your account in our Restaurant app',
};

const LoginPage = () => {
  return (
    <>
      <Login/>
    </>
  );
};

export default LoginPage;
