import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Home from './page'

describe('Home Page', () => {
  it('renders the name and title', () => {
    render(<Home />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Daniel Fuentes')
    expect(screen.getByText('Full-Stack & Cloud Engineer')).toBeInTheDocument()
  })

  it('renders social links', () => {
    render(<Home />)
    expect(screen.getByRole('link', { name: /linkedin profile/i })).toHaveAttribute('href', 'https://linkedin.com/in/daniel-a-fuentes/')
    expect(screen.getByRole('link', { name: /github profile/i })).toHaveAttribute('href', 'https://github.com/fuentesdaniel0')
  })

  it('renders coming soon message', () => {
    render(<Home />)
    expect(screen.getByText('Building')).toBeInTheDocument()
  })

  it('renders the projects section with trackvenn and epoch', () => {
    render(<Home />)
    expect(screen.getByRole('heading', { level: 2, name: /projects/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /trackvenn/i })).toHaveAttribute('href', 'https://venn.tools')
    expect(screen.getByRole('link', { name: /epoch/i })).toHaveAttribute('href', 'https://epoch.sh')
  })
})
