// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('Portfolio App', () => {
  it('renders name and title', () => {
    render(<App />);
    expect(screen.getByText('Daniel A. Fuentes')).toBeInTheDocument();
    expect(screen.getByText('Full-Stack & Cloud Engineer')).toBeInTheDocument();
  });

  it('renders LinkedIn and GitHub links', () => {
    render(<App />);
    const linkedin = screen.getByRole('link', { name: /linkedin/i });
    const github = screen.getByRole('link', { name: /github/i });
    expect(linkedin).toHaveAttribute('href', 'https://linkedin.com/in/daniel-a-fuentes/');
    expect(github).toHaveAttribute('href', 'https://github.com/fuentesdaniel0');
  });

  it('renders coming soon message', () => {
    render(<App />);
    expect(screen.getByText('Portfolio coming soon.')).toBeInTheDocument();
  });
});
