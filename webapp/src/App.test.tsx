import { Button } from '@mui/material';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', async () => {
  render(<App />);
  
  const buttonElement = await screen.findByRole('button', { name: 'Women' });
  expect(buttonElement).toBeInTheDocument();
});
