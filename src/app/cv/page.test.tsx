import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CVPage from './page'

describe('CV Page', () => {
  it('renders the name and title', () => {
    render(<CVPage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Daniel Fuentes')
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Full-Stack & Cloud Engineer')
  })

  it('renders standard resume sections', () => {
    render(<CVPage />)
    expect(screen.getByRole('heading', { level: 3, name: /skills/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: /experience/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: /projects/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: /education/i })).toBeInTheDocument()
  })

  it('renders ProfilePage JSON-LD schema', () => {
    const { container } = render(<CVPage />)
    const script = container.querySelector('script[type="application/ld+json"]')
    expect(script).toBeInTheDocument()
    const json = JSON.parse(script?.textContent || '{}')
    expect(json['@context']).toBe('https://schema.org')
    expect(json['@type']).toBe('ProfilePage')
    expect(json['mainEntity']['@type']).toBe('Person')
    expect(json['mainEntity']['name']).toBe('Daniel Fuentes')
  })
})
