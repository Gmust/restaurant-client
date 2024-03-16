import axios from 'axios';


const $unAuthHost = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL,
});

const $authHost = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL,
  withCredentials: true,
});


const authInterceptors = async (config: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/auth-next/token`, { method: 'GET' });
  const resData = await res.json();
  const token = resData?.access_token;
  config.headers.authorization = `Bearer ${token}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptors, error => {
  return Promise.reject(error);
});


export {
  $authHost,
  $unAuthHost,
};
