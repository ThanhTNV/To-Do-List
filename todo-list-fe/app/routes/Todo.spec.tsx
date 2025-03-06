import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Todo from './Todo';

test('renders background color', () => {
  const { container } = render(<Todo />);
  expect(container.firstChild).toHaveClass('bg-gradient-to-b from-pink-100 to-indigo-200');
});
