import axios from 'axios';

axios.defaults.baseURL = 'https://andela-genie-backend.herokuapp.com/api/v1';

axios.interceptors.request.use((config) => {
  const getToken = () => window.localStorage.getItem('jwtToken_genie');
  const token  = getToken();
    // Do something before request is sent
  return Object.assign({}, config, { headers: { Authorization: `bearer ${token}` } });
}, (error) => {
    // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use((response) => {
    // Do something with response data
  return response;
}, (error) => {
    // Do something with response error
  return Promise.reject(error);
});


export default axios;