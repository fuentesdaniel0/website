import { describe, it, expect } from 'vitest';
import { resumeData } from '../data/resumeData';
import {
  getRoleDurationInMonths,
  analyzeSkills,
  analyzeActionVerbs,
  analyzeScannability,
  runResumeAnalysis
} from './resumeAnalyzer';

describe('Resume Analyzer Engine', () => {
  // Use a fixed reference date (May 2026) for reproducible testing
  const testRefDate = new Date(2026, 4, 30); // May 2026 (Month is 0-indexed, so 4 is May)

  describe('Duration Calculator', () => {
    it('calculates static role duration correctly', () => {
      // Solutions Engineer: Oct 2021 to Jan 2022
      const solutionsEngineerRole = resumeData.experience[0].roles[1];
      const duration = getRoleDurationInMonths(solutionsEngineerRole, testRefDate);
      
      // Oct, Nov, Dec, Jan = 4 months
      expect(duration).toBe(4);
    });

    it('calculates current role duration correctly using reference date', () => {
      // Customer Engineer: Aug 2022 to Present (reference date May 2026)
      const customerEngineerRole = resumeData.experience[0].roles[0];
      const duration = getRoleDurationInMonths(customerEngineerRole, testRefDate);
      
      // 2022-08 to 2026-05
      // (2026 - 2022) * 12 + (5 - 8) + 1 = 48 - 3 + 1 = 46 months
      expect(duration).toBe(46);
    });

    it('calculates short intern role correctly', () => {
      // Intern: June 2020 to August 2020
      const internRole = resumeData.experience[1].roles[0];
      const duration = getRoleDurationInMonths(internRole, testRefDate);
      
      // Jun, Jul, Aug = 3 months
      expect(duration).toBe(3);
    });
  });

  describe('Skills Analyzer', () => {
    it('correctly reports frequency and duration for top skills', () => {
      const skills = analyzeSkills(resumeData, testRefDate);
      
      // Verify array properties
      expect(skills.length).toBeGreaterThan(0);
      
      // Google Cloud (GCP) is used in Customer Engineer (46m), Solutions Engineer (4m), and Playlist Project (3m credit)
      // Total months: 46 + 4 + 3 = 53 months
      const gcpSkill = skills.find(s => s.name === 'Google Cloud (GCP)');
      expect(gcpSkill).toBeDefined();
      expect(gcpSkill?.monthsOfExperience).toBe(53);
      expect(gcpSkill?.yearsOfExperience).toBe(4.4); // 53 / 12 = 4.416... -> 4.4
      
      // Python is used in Customer Engineer (46m) and Solutions Engineer (4m) and Coda.sys (3m credit) = 53m
      const pythonSkill = skills.find(s => s.name === 'Python');
      expect(pythonSkill).toBeDefined();
      expect(pythonSkill?.monthsOfExperience).toBe(53);
    });

    it('sorts skills by experience duration', () => {
      const skills = analyzeSkills(resumeData, testRefDate);
      
      // The skills should be in descending order of monthsOfExperience
      for (let i = 0; i < skills.length - 1; i++) {
        expect(skills[i].monthsOfExperience).toBeGreaterThanOrEqual(skills[i + 1].monthsOfExperience);
      }
    });
  });

  describe('Linguistic / Action Verbs Analyzer', () => {
    it('extracts action verbs successfully', () => {
      const linguistics = analyzeActionVerbs(resumeData);
      
      expect(linguistics.totalBullets).toBe(16); // 4 + 3 + 3 (experience bullets) + 3 + 3 (project bullets) = 16
      
      // Let's verify:
      // Customer Eng: 4 bullets
      // Solutions Eng: 3 bullets
      // Intern: 3 bullets
      // Coda: 3 bullets
      // Playlist Spotify: 3 bullets
      // Total = 16 bullets

      expect(linguistics.totalBullets).toBe(16);
      
      // Verbs found should include architected, engineered, developed, led, etc.
      const verbs = linguistics.verbsFound.map(v => v.verb);
      expect(verbs).toContain('architected');
      expect(verbs).toContain('engineered');
      expect(verbs).toContain('developed');
    });

    it('clusters action verbs into distinct, valid categories', () => {
      const linguistics = analyzeActionVerbs(resumeData);
      
      const implementation = linguistics.categories.find(c => c.category.includes('Engineering'));
      expect(implementation).toBeDefined();
      expect(implementation?.count).toBeGreaterThan(0);
      
      const architecture = linguistics.categories.find(c => c.category.includes('Architecture'));
      expect(architecture).toBeDefined();
      expect(architecture?.count).toBeGreaterThan(0);
    });
  });

  describe('Scannability and Readability Analyzer', () => {
    it('computes word count and quantitative ratios', () => {
      const readability = analyzeScannability(resumeData);
      
      expect(readability.totalWords).toBeGreaterThan(200);
      expect(readability.averageBulletLength).toBeLessThan(25);
      expect(readability.averageBulletLength).toBeGreaterThan(12);
      
      // Should find quantifiable metrics (e.g. "40 dynamic pricing endpoints", etc.)
      expect(readability.quantifiableBulletCount).toBeGreaterThan(0);
      expect(readability.quantifiablePercentage).toBeGreaterThan(0);
    });

    it('generates a scannability score and recruiter checklist', () => {
      const readability = analyzeScannability(resumeData);
      
      expect(readability.scannabilityScore).toBeGreaterThanOrEqual(0);
      expect(readability.scannabilityScore).toBeLessThanOrEqual(100);
      
      // Recruiter flags can be empty or populated depending on thresholds, let's verify format
      expect(Array.isArray(readability.recruiterFlags)).toBe(true);
    });
  });

  describe('Full Suite Integration', () => {
    it('runs full combined analysis successfully', () => {
      const result = runResumeAnalysis(resumeData, testRefDate);
      
      expect(result.skills).toBeDefined();
      expect(result.linguistics).toBeDefined();
      expect(result.readability).toBeDefined();
    });
  });
});
