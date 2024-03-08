import axios from 'axios';


const $unAuthHost = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL,
});

const $authHost = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL,
  withCredentials: true,
});


// $authHost.interceptors.request.use(async (config) => {
//   try {
//     const response = await $authHost.get('/api/auth-next/token');
//     const token = response.data?.token;
//     config.headers['Authorization'] = `Bearer ${token}`;
//   } catch (error) {
//     console.error('Error fetching token:', error);
//   }
//   return config;
// });

$authHost.interceptors.request.use(async (config) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/auth-next/token`, { method: 'GET' });
    const resData = await res.json();
    const token = resData?.token;

    config.headers!['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
export {
  $authHost,
  $unAuthHost,
};
