import React from 'react';
import { getByText, render, screen } from '@testing-library/react';
import './matchMedia';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import App from '../Components/App';

test('renders react component App', () => {
  render(<App />);
  const divElement = screen(getByText(/hello world/i));
  expect(divElement).toBeInTheDocument();
});
