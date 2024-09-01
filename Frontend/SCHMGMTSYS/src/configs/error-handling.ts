import axios, { AxiosError } from 'axios';

export const handleError = <TError extends any = unknown>(error: TError): string => {
    // Check if the error is an AxiosError
    if (axios.isAxiosError(error)) {
        return handleAxiosError(error);
    } 
    
    // If the error is not an AxiosError, handle it generically
    return handleGenericError(error);
};

// Handles Axios specific errors
const handleAxiosError = (error: AxiosError): string => {
    if (error.response) {
        const status = error.response.status;
        const data = error.response.data as any;

        switch (status) {
            case 400:
                return `Invalid request data: ${data?.message || 'Bad Request'}.`;
            case 401:
                return `Unauthorized: ${data?.message || 'Please log in and try again.'}.`;
            case 403:
                return `Forbidden: ${data?.message || 'You do not have permission to perform this action.'}.`;
            case 404:
                return `Resource not found: ${data?.message || 'The requested resource could not be found.'}.`;
            case 500:
                return `Internal server error: ${data?.message || 'Please try again later.'}.`;
            default:
                return `Unexpected error (${status}): ${data?.message || error.response.statusText}.`;
        }
    } else if (error.request) {
        return 'Network error: Please check your connection and try again.';
    } else {
        return `Request error: ${error.message}`;
    }
};

const handleGenericError = <TError>(error: TError): string => {
    if (error instanceof Error) {
        return `Error: ${error.message}`;
    }
    
    if (typeof error === 'string') {
        return `Error: ${error}`;
    }
    
    return 'An unexpected error occurred.';
};
