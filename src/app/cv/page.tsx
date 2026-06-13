import React from 'react';
import { resumeData } from '../../data/resumeData';
import './cv.css';

export const metadata = {
  title: 'CV - ' + resumeData.contact.name,
  description: 'Minimal Resume for ' + resumeData.contact.name,
  openGraph: {
    title: 'CV - ' + resumeData.contact.name,
    description: 'Minimal Resume for ' + resumeData.contact.name,
    url: 'https://resume-app-849688752380.us-central1.run.app/cv',
    type: 'profile',
    images: [
      {
        url: '/opengraph_preview.png',
        width: 1200,
        height: 630,
        alt: 'Daniel Fuentes - CV / Resume',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CV - ' + resumeData.contact.name,
    description: 'Minimal Resume for ' + resumeData.contact.name,
    images: ['/opengraph_preview.png'],
  },
};

export default function CVPage() {
  const { contact, skills, experience, projects, education } = resumeData;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: contact.name,
      jobTitle: contact.title,
      url: 'https://resume-app-849688752380.us-central1.run.app/',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="cv-page">
      <header className="cv-header">
        <h1>{contact.name}</h1>
        <h2>{contact.title}</h2>
        <div className="cv-contact-info">
          <span>{contact.email}</span> &bull; 
          <span>{contact.phone}</span> &bull; 
          <span>{contact.location}</span> &bull; 
          <a id="cv-social-linkedin" href={`https://${contact.linkedin}`} target="_blank" rel="noreferrer">LinkedIn</a> &bull; 
          <a id="cv-social-github" href={`https://${contact.github}`} target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </header>

      <section className="cv-section">
        <h3>Skills</h3>
        <div className="cv-skills">
          {skills.map((skillGroup, idx) => (
            <div key={idx} className="cv-skill-group">
              <strong>{skillGroup.category}: </strong>
              <span>{skillGroup.items.join(', ')}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="cv-section">
        <h3>Experience</h3>
        <div className="cv-experience">
          {experience.map((exp, idx) => (
            <div key={idx} className="cv-job">
              <div className="cv-job-header">
                <strong>{exp.company}</strong> — <span>{exp.location}</span>
              </div>
              {exp.roles.map((role, rIdx) => (
                <div key={rIdx} className="cv-role">
                  <div className="cv-role-title">
                    <em>{role.title}</em>
                    <span className="cv-role-dates">{role.startDate} - {role.endDate}</span>
                  </div>
                  <ul className="cv-role-bullets">
                    {role.bulletPoints.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="cv-section">
        <h3>Projects</h3>
        <div className="cv-projects">
          {projects.map((proj, idx) => (
            <div key={idx} className="cv-project">
              <div className="cv-project-header">
                <strong>
                  {proj.link ? (
                    <a id={`cv-project-link-${proj.title.toLowerCase()}`} href={proj.link} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
                      {proj.title}
                    </a>
                  ) : (
                    proj.title
                  )}
                </strong>
              </div>
              <p className="cv-project-tech"><em>{proj.technologies.join(', ')}</em></p>
              <ul className="cv-project-bullets">
                {proj.bulletPoints.map((bullet, bIdx) => (
                  <li key={bIdx}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="cv-section">
        <h3>Education</h3>
        <div className="cv-education">
          <div className="cv-edu-header">
            <strong>{education.institution}</strong> — <span>{education.location}</span>
            <span className="cv-edu-dates" style={{float: 'right'}}>{education.gradDate}</span>
          </div>
          <div>
            <em>{education.degree}</em>
            {education.minor && <span> (Minor in {education.minor})</span>}
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
