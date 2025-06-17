import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Counter from '../Counter'; // Assuming Counter.tsx is in the parent directory

describe('Counter', () => {
  test('renders with initial count of 0', () => {
    // Render the Counter component
    render(<Counter />);

    // Assert that the initial count is displayed by checking the button's text
    expect(screen.getByText('count is 0')).toBeInTheDocument();
  });

  test('increments count when the button is clicked', () => {
    // Render the Counter component
    render(<Counter />);

    // Find the increment button using a regex that matches "count is X"
    // The button's text changes, so we look for "count is"
    const incrementButton = screen.getByRole('button', { name: /count is \d+/i });

    // Click the button once
    fireEvent.click(incrementButton);

    // Assert that the count has increased to 1 by checking the button's text
    // We need to re-query for the text as the component re-renders
    expect(screen.getByText('count is 1')).toBeInTheDocument();

    // Click the button again
    // Re-query the button as its accessible name (text) might have changed
    const updatedIncrementButton = screen.getByRole('button', { name: /count is \d+/i });
    fireEvent.click(updatedIncrementButton);

    // Assert that the count has increased to 2 by checking the button's text
    expect(screen.getByText('count is 2')).toBeInTheDocument();
  });

  test('does not decrement count (assuming no decrement functionality)', () => {
    // This test ensures that without a decrement button, the count only goes up.
    // If a decrement feature is added, this test would need to be adjusted or removed.

    render(<Counter />);
    // Find the increment button using a regex that matches "count is X"
    const incrementButton = screen.getByRole('button', { name: /count is \d+/i });

    fireEvent.click(incrementButton); // count is 1
    // Re-query the button as its accessible name (text) might have changed
    const updatedIncrementButtonAfterFirstClick = screen.getByRole('button', { name: /count is \d+/i });
    fireEvent.click(updatedIncrementButtonAfterFirstClick); // count is 2

    // Verify no unexpected decrementing has occurred
    expect(screen.queryByText('count is -1')).not.toBeInTheDocument();
    // After two clicks, the count should be 2, so 0 should not be in the document
    expect(screen.queryByText('count is 0')).not.toBeInTheDocument();
  });
});