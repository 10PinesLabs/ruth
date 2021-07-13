import * as axios from 'axios';
import { toast } from 'react-toastify';

const backendUrl = '/api';

const extractResponse = (response) => response.data;

const handleError = (error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    if (error.response){
        toast.error(error.response.data);

    }else{
        toast.error(error.message);

    }
    return Promise.reject(error);
};

const Requester = {
  createDefaultRequester: () => {
    const defaultRequester = axios.create({
      baseURL: backendUrl,
      timeout: 60000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    defaultRequester.interceptors.response.use(
      extractResponse,
      handleError,
    );

    return defaultRequester;
  },
};

export default Requester;
