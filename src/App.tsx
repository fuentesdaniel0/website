import { useState, useEffect, useRef } from 'react';
import { resumeData } from './shared';

import './App.css';

function App() {
  const [highlightedSkill, setHighlightedSkill] = useState<string | null>(null);
  const [activeTimelineNode, setActiveTimelineNode] = useState<string | null>(null);
  const [showHeaderInNavbar, setShowHeaderInNavbar] = useState(false);

  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show in navbar when header is scrolled past the bottom edge of the docked navbar (65px from top)
        setShowHeaderInNavbar(!entry.isIntersecting && entry.boundingClientRect.top < 65);
      },
      { 
        threshold: 0,
        rootMargin: '-65px 0px 0px 0px' // Offset by the docked navbar's exact height so it triggers as the navbar starts covering the name
      }
    );

    const currentHeader = headerRef.current;
    if (currentHeader) {
      observer.observe(currentHeader);
    }

    return () => {
      if (currentHeader) {
        observer.unobserve(currentHeader);
      }
    };
  }, []);

  const resetHighlight = () => setHighlightedSkill(null);

  // Quick helper to determine if a bullet point contains a highlighted skill
  const containsHighlightedSkill = (bullet: string) => {
    if (!highlightedSkill) return false;
    // Escape regex characters
    const escaped = highlightedSkill.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    let patternStr = `\\b${escaped}\\b`;

    if (highlightedSkill.includes('+') || highlightedSkill.includes('.') || highlightedSkill.includes('/')) {
      patternStr = escaped;
    }
    const regex = new RegExp(patternStr, 'i');
    return regex.test(bullet);
  };

  return (
    <div className="portfolio-app">
      {/* Sleek Top Status & Navigation Bar */}
      <nav className="top-navbar">
        <div className="navbar-content">
          {/* Social Links on the Left */}
          <div className="contact-links-container">
            <a 
              href={`mailto:${resumeData.contact.email}`} 
              className="social-link-btn" 
              aria-label="Send Email"
              title="Email Daniel"
            >
              <svg viewBox="0 0 24 24" className="social-icon" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span className="social-tooltip">{resumeData.contact.email}</span>
            </a>
            
            <a 
              href={`https://${resumeData.contact.linkedin}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link-btn" 
              aria-label="LinkedIn Profile"
              title="LinkedIn"
            >
              <svg viewBox="0 0 24 24" className="social-icon" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <span className="social-tooltip">LinkedIn Profile</span>
            </a>

            <a 
              href={`https://${resumeData.contact.github}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link-btn" 
              aria-label="GitHub Profile"
              title="GitHub"
            >
              <svg viewBox="0 0 24 24" className="social-icon" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              <span className="social-tooltip">GitHub Profile</span>
            </a>

            <a 
              href="/Daniel_Fuentes_Resume.pdf" 
              download="Daniel_Fuentes_Resume.pdf"
              className="social-link-btn" 
              aria-label="Download Resume PDF"
              title="Download PDF"
            >
              <svg viewBox="0 0 24 24" className="social-icon" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span className="social-tooltip">Download Resume PDF</span>
            </a>
          </div>

          {/* Centered Profile Info in Navbar (Visible on Scroll) */}
          <div className={`navbar-profile-info ${showHeaderInNavbar ? 'visible' : ''}`}>
            <span className="navbar-user-name">{resumeData.contact.name}</span>
            <span className="navbar-user-title">{resumeData.contact.title}</span>
          </div>

          {/* Status Badges on the Right */}
          <div className="status-badges-container">
            <span className="availability-badge">
              <span className="pulse-dot"></span> Available for Opportunities
            </span>
            <span className="location-badge">
              <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2" />
              </svg>
              {resumeData.contact.location}
            </span>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="portfolio-main">
        <div className="cv-view animate-fade-in">
            {/* Interactive SVG Career Timeline Map */}
            <div className="career-map-container glass-panel">
              <h3 className="career-map-title">Interactive Career Journey Map</h3>
              <p className="career-map-subtitle">Click or hover over any milestone node to highlight details or scroll directly to that role.</p>
              
              <div className="svg-timeline-wrapper">
                <svg className="svg-timeline" viewBox="0 0 800 120" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <linearGradient id="timeline-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="var(--primary)" />
                      <stop offset="50%" stopColor="var(--secondary)" />
                      <stop offset="100%" stopColor="var(--primary)" />
                    </linearGradient>
                    <filter id="node-shadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="var(--primary)" floodOpacity="0.3" />
                    </filter>
                  </defs>

                  {/* Base Connection Track */}
                  <line x1="120" y1="60" x2="680" y2="60" stroke="var(--border-glass)" strokeWidth="4" strokeLinecap="round" />
                  
                  {/* Glowing Highlight Track */}
                  <path 
                    d="M 120 60 L 680 60" 
                    stroke="url(#timeline-line-grad)" 
                    strokeWidth="4" 
                    strokeLinecap="round"
                    className="timeline-path-glow"
                  />

                  {/* Milestone Nodes */}
                  
                  {/* Node 1: PROS Software Development Intern */}
                  <g 
                    className={`timeline-node-group ${activeTimelineNode === 'PROS-Software Development Intern' ? 'active' : ''}`}
                    onMouseEnter={() => setActiveTimelineNode('PROS-Software Development Intern')}
                    onMouseLeave={() => setActiveTimelineNode(null)}
                    onClick={() => {
                      const el = document.getElementById('PROS-Software Development Intern');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                  >
                    <circle cx="150" cy="60" r="16" className="node-bg" />
                    <circle cx="150" cy="60" r="10" className="node-core" filter="url(#node-shadow)" />
                    <text x="150" y="32" className="node-company" textAnchor="middle">PROS</text>
                    <text x="150" y="94" className="node-role" textAnchor="middle">SWE Intern</text>
                    <text x="150" y="108" className="node-dates-label" textAnchor="middle">Summer 2020</text>
                  </g>

                  {/* Node 2: Google Cloud Solutions Engineer */}
                  <g 
                    className={`timeline-node-group ${activeTimelineNode === 'Google Cloud-Solutions Engineer' ? 'active' : ''}`}
                    onMouseEnter={() => setActiveTimelineNode('Google Cloud-Solutions Engineer')}
                    onMouseLeave={() => setActiveTimelineNode(null)}
                    onClick={() => {
                      const el = document.getElementById('Google Cloud-Solutions Engineer');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                  >
                    <circle cx="400" cy="60" r="16" className="node-bg" />
                    <circle cx="400" cy="60" r="10" className="node-core" filter="url(#node-shadow)" />
                    <text x="400" y="32" className="node-company" textAnchor="middle">Google Cloud</text>
                    <text x="400" y="94" className="node-role" textAnchor="middle">Solutions Eng</text>
                    <text x="400" y="108" className="node-dates-label" textAnchor="middle">2021 – 2022</text>
                  </g>

                  {/* Node 3: Google Cloud Customer Engineer */}
                  <g 
                    className={`timeline-node-group ${activeTimelineNode === 'Google Cloud-Customer Engineer' ? 'active' : ''}`}
                    onMouseEnter={() => setActiveTimelineNode('Google Cloud-Customer Engineer')}
                    onMouseLeave={() => setActiveTimelineNode(null)}
                    onClick={() => {
                      const el = document.getElementById('Google Cloud-Customer Engineer');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                  >
                    <circle cx="650" cy="60" r="16" className="node-bg" />
                    <circle cx="650" cy="60" r="10" className="node-core" filter="url(#node-shadow)" />
                    <text x="650" y="32" className="node-company" textAnchor="middle">Google Cloud</text>
                    <text x="650" y="94" className="node-role" textAnchor="middle">Customer Eng</text>
                    <text x="650" y="108" className="node-dates-label" textAnchor="middle">2022 – Present</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* Interactive Notice */}
            <div className="interactive-banner">
              <svg className="banner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
              <span><strong>Interactive Feature:</strong> Hover over any skill pill to highlight where it was used across projects and roles!</span>
            </div>

            <header className="inline-profile-header" ref={headerRef}>
              <h1 className="user-name">{resumeData.contact.name}</h1>
              <h2 className="user-title">{resumeData.contact.title}</h2>
            </header>

            <div className="cv-layout">
              {/* Left Column: Experience & Projects */}
              <div className="cv-left-col">
                <section className="cv-section">
                  <h3 className="section-title">Professional Experience</h3>
                  <div className="experience-timeline">
                    {resumeData.experience.map((exp, idx) => (
                      <div className="timeline-item" key={idx}>
                        <div className="timeline-marker"></div>
                        <div className="timeline-header">
                          <h4 className="company-name">{exp.company}</h4>
                          <span className="company-location">{exp.location}</span>
                        </div>
                        
                        {exp.roles.map((role, rIdx) => {
                          const roleKey = `${exp.company}-${role.title}`;
                          const isRoleHighlighted = activeTimelineNode === roleKey;
                          return (
                            <div 
                              className={`role-block ${isRoleHighlighted ? 'active-role-highlight' : ''}`} 
                              key={rIdx}
                              id={roleKey}
                            >
                            <div className="role-header">
                              <h5 className="role-title">{role.title}</h5>
                              <span className="role-dates">{role.startDate} – {role.endDate}</span>
                            </div>
                            
                            <ul className="role-bullets">
                              {role.bulletPoints.map((bullet, bIdx) => {
                                const isHighlighted = containsHighlightedSkill(bullet);
                                return (
                                  <li 
                                    className={`bullet-point ${isHighlighted ? 'highlight-glow' : ''}`} 
                                    key={bIdx}
                                    dangerouslySetInnerHTML={{
                                      __html: bullet.replace(
                                        new RegExp(`\\b(${highlightedSkill || 'NONEXISTENT_SKILL_GLOW'})\\b`, 'gi'),
                                        '<strong class="text-glow">$1</strong>'
                                      )
                                    }}
                                  />
                                );
                              })}
                            </ul>

                            <div className="role-skills">
                              {role.skillsUsed.map((skill, sIdx) => {
                                const isHighlighted = highlightedSkill === skill;
                                return (
                                  <span 
                                    className={`skill-pill ${isHighlighted ? 'active-highlight' : ''}`}
                                    key={sIdx}
                                    onMouseEnter={() => setHighlightedSkill(skill)}
                                    onMouseLeave={resetHighlight}
                                  >
                                    {skill}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                      </div>
                    ))}
                  </div>
                </section>

                <section className="cv-section">
                  <h3 className="section-title">Selected Projects</h3>
                  <div className="projects-grid">
                    {resumeData.projects.map((proj, idx) => (
                      <div className="project-card" key={idx}>
                        <h4 className="project-title">{proj.title}</h4>
                        <ul className="project-bullets">
                          {proj.bulletPoints.map((bullet, bIdx) => {
                            const isHighlighted = containsHighlightedSkill(bullet);
                            return (
                              <li 
                                className={`bullet-point ${isHighlighted ? 'highlight-glow' : ''}`} 
                                key={bIdx}
                                dangerouslySetInnerHTML={{
                                  __html: bullet.replace(
                                    new RegExp(`\\b(${highlightedSkill || 'NONEXISTENT_SKILL_GLOW'})\\b`, 'gi'),
                                    '<strong class="text-glow">$1</strong>'
                                  )
                                }}
                              />
                            );
                          })}
                        </ul>
                        <div className="project-tech">
                          {proj.technologies.map((tech, tIdx) => {
                            const isHighlighted = highlightedSkill === tech;
                            return (
                              <span 
                                className={`skill-pill project-pill ${isHighlighted ? 'active-highlight' : ''}`}
                                key={tIdx}
                                onMouseEnter={() => setHighlightedSkill(tech)}
                                onMouseLeave={resetHighlight}
                              >
                                {tech}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Right Column: Skills, Education */}
              <div className="cv-right-col">
                <section className="cv-section">
                  <h3 className="section-title">Technical Skills</h3>
                  <div className="skills-sidebar-list">
                    {resumeData.skills.map((category, idx) => (
                      <div className="skills-category-group" key={idx}>
                        <h4 className="category-title">{category.category}</h4>
                        <div className="skills-pill-box">
                          {category.items.map((skill, sIdx) => {
                            const isHighlighted = highlightedSkill === skill;
                            return (
                              <span 
                                className={`skill-pill sidebar-pill ${isHighlighted ? 'active-highlight' : ''}`}
                                key={sIdx}
                                onMouseEnter={() => setHighlightedSkill(skill)}
                                onMouseLeave={resetHighlight}
                              >
                                {skill}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="cv-section">
                  <h3 className="section-title">Education</h3>
                  <div className="education-card">
                    <h4 className="edu-institution">{resumeData.education.institution}</h4>
                    <div className="edu-meta">
                      <span>{resumeData.education.degree}</span>
                      <span className="edu-minor">{resumeData.education.minor}</span>
                    </div>
                    <div className="edu-details">
                      <span className="edu-gpa">GPA: <strong>{resumeData.education.gpa}</strong></span>
                      <span className="edu-date">{resumeData.education.gradDate}</span>
                    </div>
                    <div className="edu-coursework">
                      <h5>Key Coursework:</h5>
                      <ul>
                        {resumeData.education.coursework.map((course, cIdx) => (
                          <li key={cIdx}>{course}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
      </main>

      {/* Modern Gradient Footer */}
      <footer className="portfolio-footer">
        <div className="footer-content">
          <p>© 2026 {resumeData.contact.name}. Built as a React & TypeScript Resume Application.</p>
          <div className="tech-tag-row">
            <span>React 19</span>
            <span>TypeScript 6</span>
            <span>Vite 8</span>
            <span>Vitest</span>
            <span>JSDOM</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
