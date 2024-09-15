import axios from 'axios';
import { errors } from './constants';

export const handleError = (error: any): string => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            const status = error.response.status;
            switch (status) {
                case 400:
                    return errors.ERROR_400;
                case 403:
                    return errors.ERROR_403;
                case 404:
                    return errors.ERROR_404;
                case 500:
                    return errors.ERROR_500;
                default:
                    return `${errors.ERROR_UNEXPECTED} ${error.response.statusText}`;
            }
        } else if (error.request) {
            return errors.ERROR_NETWORK;
        } else {
            return `${errors.ERROR_REQUEST} ${error.message}`;
        }
    } else {
        return errors.ERROR_UNEXPECTED;
    }
};
