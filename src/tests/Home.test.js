import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Home } from '../Components/utils';

test('Renders all components in Home.js', () => {
  render(<Home />);
});