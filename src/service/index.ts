import axios from 'axios';


const $unAuthHost = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL,
});

const $authHost = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL,
  withCredentials: true,
});


$authHost.interceptors.request.use(async (config) => {


    const res = await fetch('/api/auth/token');

    const resData = await res.json();
    const token = resData?.token;

    config.headers!['Authorization'] = 'Bearer ' + token;
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
