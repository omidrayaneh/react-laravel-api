
## About Laravel API

composer require laravel/breeze --dev

php artisan breeze:install
or
php artisan breeze:install api

this is code for 419 error  use in axios and react frontend:
```axios setup
const ApiAuth = axios.create({
  baseURL: import.meta.env.VITE_API_AUTH_URL,
  withCredentials: true,
});

ApiAuth.interceptors.request.use((config) => {
  const token = decodeURIComponent(document.cookie.replace('XSRF-TOKEN=', ''));
  ApiAuth.defaults.headers['X-XSRF-TOKEN'] = token;

  return config;
});
```
