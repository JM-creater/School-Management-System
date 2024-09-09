import '@testing-library/jest-dom';
import App from './App';
import { render } from '@testing-library/react';

describe('App Component', () => {
    it('renders without crashing', () => {
      render(<App />);
    });
});