import React from 'react';
import { render, screen } from '@testing-library/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from '../Components/App/index';

beforeAll(() => {

});

test('renders react component App', () => {
  render(<App />);
});
