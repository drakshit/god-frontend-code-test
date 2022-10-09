import axios from 'axios';

/*
  This returns an axios instance with config values
*/
const AxiosInstance = axios.create({
    timeout: 1000*60,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
  });

export default AxiosInstance;