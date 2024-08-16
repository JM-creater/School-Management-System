import axios from 'axios';

export const handleError = (error: any): string => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            const status = error.response.status;
            switch (status) {
                case 400:
                    return 'Invalid request data.';
                case 404:
                    return 'Resource not found.';
                case 500:
                    return 'Internal server error. Please try again later.';
                default:
                    return `An unexpected error occurred: ${error.response.statusText}`;
            }
        } else if (error.request) {
            return 'Network error. Please check your connection and try again.';
        } else {
            return `Request error: ${error.message}`;
        }
    } else {
        return 'An unexpected error occurred.';
    }
};
