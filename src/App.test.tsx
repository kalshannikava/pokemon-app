import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App container', () => {
  render(<App />);
  const container = screen.getByTestId('app');
  expect(container).toBeInTheDocument();
});
