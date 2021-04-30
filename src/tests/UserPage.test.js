import { render, screen } from '@testing-library/react';
import UserPage from '../js/user/UserPage';

test('renders learn react link', () => {
  render(<UserPage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
