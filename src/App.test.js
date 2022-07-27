import React from 'react';
import { render } from '@testing-library/react';
import App from './Components/App';

test('renders basic empty template', () => {
  const { getByText } = render(
    <>
      <App />
    </>);
});
