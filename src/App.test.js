import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;

describe('App Component', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.clear.mockClear();
  });

  test('renders task manager title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Task Manager/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('adds a new task', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Add a new task/i);
    const addButton = screen.getByText(/Add Task/i);

    fireEvent.change(input, { target: { value: 'Test task' } });
    fireEvent.click(addButton);

    expect(screen.getByText('Test task')).toBeInTheDocument();
  });

  test('toggles task completion', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Add a new task/i);
    const addButton = screen.getByText(/Add Task/i);

    fireEvent.change(input, { target: { value: 'Test task' } });
    fireEvent.click(addButton);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  test('deletes a task', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Add a new task/i);
    const addButton = screen.getByText(/Add Task/i);

    fireEvent.change(input, { target: { value: 'Test task' } });
    fireEvent.click(addButton);

    const deleteButton = screen.getByText(/Delete/i);
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Test task')).not.toBeInTheDocument();
  });

  test('filters tasks correctly', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Add a new task/i);
    const addButton = screen.getByText(/Add Task/i);

    // Add two tasks
    fireEvent.change(input, { target: { value: 'Task 1' } });
    fireEvent.click(addButton);
    fireEvent.change(input, { target: { value: 'Task 2' } });
    fireEvent.click(addButton);

    // Complete first task
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    // Filter to show only active tasks
    const activeFilter = screen.getByText('Active');
    fireEvent.click(activeFilter);

    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
  });
});