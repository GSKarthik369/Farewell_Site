import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Akshay and recognizes tester contributions', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /farewell, akshay/i })).toBeInTheDocument();
  expect(screen.getByText(/excellent bug hunts/i)).toBeInTheDocument();
  expect(screen.getByText(/help investigate and resolve prod issues/i)).toBeInTheDocument();
});
