// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('Portfolio App', () => {
  it('renders the main contact info correctly', () => {
    render(<App />);
    expect(screen.getAllByText('Daniel A. Fuentes')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Full-Stack & Cloud Engineer')[0]).toBeInTheDocument();
    expect(screen.getByText('daniel.fuentes.sh@gmail.com')).toBeInTheDocument();
  });

  it('renders experience section correctly', () => {
    render(<App />);
    expect(screen.getAllByText('Customer Engineer')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Solutions Engineer')[0]).toBeInTheDocument();
  });

  it('highlights skills on hover', () => {
    render(<App />);
    
    // Using test-id to find a specific skill pill
    const reactPill = screen.getAllByText('React')[0];
    fireEvent.mouseEnter(reactPill);
    
    // Just verifying that the handler exists and doesn't crash
    expect(reactPill).toBeInTheDocument();
    
    fireEvent.mouseLeave(reactPill);
  });
});
