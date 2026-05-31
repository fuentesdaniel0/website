import type { ResumeData, ExperienceRole } from '../data/resumeData';


export interface SkillAnalysis {
  name: string;
  category: string;
  frequency: number;
  monthsOfExperience: number;
  yearsOfExperience: number;
}

export interface ActionVerbCategory {
  category: string;
  count: number;
  verbs: string[];
  description: string;
}

export interface VerbCount {
  verb: string;
  count: number;
}

export interface LinguisticAnalysis {
  totalBullets: number;
  verbsFound: VerbCount[];
  categories: ActionVerbCategory[];
  recommendations: string[];
}

export interface ReadabilityMetrics {
  totalWords: number;
  averageBulletLength: number; // in words
  quantifiableBulletCount: number;
  quantifiablePercentage: number;
  scannabilityScore: number; // 0 - 100
  recruiterFlags: string[];
}

export interface ResumeAnalysisResult {
  skills: SkillAnalysis[];
  linguistics: LinguisticAnalysis;
  readability: ReadabilityMetrics;
}

// Map skill names to their categories for robust classification
const skillToCategoryMap: Record<string, string> = {
  // Languages
  "Python": "Languages",
  "JavaScript": "Languages",
  "TypeScript": "Languages",
  "C++": "Languages",
  "SQL": "Languages",
  "HTML/CSS": "Languages",
  
  // Cloud & Infrastructure
  "Google Cloud (GCP)": "Cloud & Infrastructure",
  "Cloud Run": "Cloud & Infrastructure",
  "Docker": "Cloud & Infrastructure",
  "Kubernetes (GKE)": "Cloud & Infrastructure",
  "Terraform": "Cloud & Infrastructure",
  "Git": "Cloud & Infrastructure",
  "CI/CD": "Cloud & Infrastructure",
  "Linux": "Cloud & Infrastructure",
  "Slurm": "Cloud & Infrastructure",
  "Cluster Toolkit": "Cloud & Infrastructure",
  "Managed Instance Groups": "Cloud & Infrastructure",
  "Firestore": "Cloud & Infrastructure",
  
  // Web Frameworks
  "React": "Web Frameworks",
  "Node.js": "Web Frameworks",
  "Express.js": "Web Frameworks",
  "Angular": "Web Frameworks",
  "Flask": "Web Frameworks",
  "Django": "Web Frameworks",
  "Electron": "Web Frameworks",
  
  // Data & AI
  "Vertex AI": "Data & AI",
  "BigQuery": "Data & AI",
  "Document AI": "Data & AI",
  "Dataflow": "Data & AI",
  "RAG Pipelines": "Data & AI",
  "API Testing": "Data & AI",
  "Jest": "Data & AI",
  "React Testing Library": "Data & AI"
};

// Verb categorization dictionary
const verbCategories = [
  {
    category: "Architecture & System Design",
    verbs: ["architected", "configured", "deployed", "designed", "established", "structured"],
    description: "Strong engineering capabilities in systems layout and orchestration."
  },
  {
    category: "Engineering & Implementation",
    verbs: ["developed", "engineered", "built", "created", "coded", "implemented", "integrated"],
    description: "Solid hands-on software development and execution capability."
  },
  {
    category: "Optimization, Impact & Leadership",
    verbs: ["improved", "optimized", "reduced", "increased", "led", "streamlined", "accelerated", "enhanced"],
    description: "Results-driven focus, demonstrating ownership, efficiency gains, and performance optimizations."
  },
  {
    category: "Quality, Testing & Verification",
    verbs: ["introduced", "tested", "validated", "monitored", "managed", "evaluated"],
    description: "Quality assurance focus, showing reliability and meticulous systems review."
  }
];

// Helper to calculate role duration in months
export function getRoleDurationInMonths(role: ExperienceRole, referenceDate?: Date): number {
  const current = referenceDate || new Date();
  const endYear = role.isCurrent ? current.getFullYear() : role.endYear;
  const endMonth = role.isCurrent ? (current.getMonth() + 1) : role.endMonth;
  
  // (End Year - Start Year) * 12 + (End Month - Start Month) + 1 (inclusive)
  const duration = (endYear - role.startYear) * 12 + (endMonth - role.startMonth) + 1;
  return Math.max(1, duration); // minimum 1 month
}

// 1. Analyze Skills (Frequency + Experience Duration)
export function analyzeSkills(resume: ResumeData, referenceDate?: Date): SkillAnalysis[] {
  const skillStats: Record<string, { frequency: number; months: number }> = {};

  // Initialize stats for all declared skills in the resume
  resume.skills.forEach(category => {
    category.items.forEach(skill => {
      skillStats[skill] = { frequency: 0, months: 0 };
    });
  });

  // Helper to safely fetch or create a stat entry
  const getStat = (name: string) => {
    if (!skillStats[name]) {
      skillStats[name] = { frequency: 0, months: 0 };
    }
    return skillStats[name];
  };

  // Helper to check text for skill keywords (case-insensitive string search)
  const countMatchesInText = (text: string, skill: string): number => {
    // Escape regex characters
    const escaped = skill.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    // Match word boundaries, or handle special characters like C++, HTML/CSS, Node.js
    let patternStr = `\\b${escaped}\\b`;
    if (skill.includes('+') || skill.includes('.') || skill.includes('/')) {
      patternStr = escaped; // literal search
    }
    const regex = new RegExp(patternStr, 'gi');
    const matches = text.match(regex);
    return matches ? matches.length : 0;
  };

  // Process Experience Roles
  resume.experience.forEach(exp => {
    exp.roles.forEach(role => {
      const duration = getRoleDurationInMonths(role, referenceDate);
      
      // 1. Direct explicit skills mapped to this role
      role.skillsUsed.forEach(skill => {
        const stats = getStat(skill);
        stats.months += duration;
        stats.frequency += 1; // Explicit tagging counts as a match
      });

      // 2. Count textual mentions in bullet points
      role.bulletPoints.forEach(bullet => {
        Object.keys(skillStats).forEach(skill => {
          const textMatches = countMatchesInText(bullet, skill);
          if (textMatches > 0) {
            const stats = getStat(skill);
            stats.frequency += textMatches;
          }
        });
      });
    });
  });

  // Process Projects
  resume.projects.forEach(proj => {
    // 1. Explicitly tagged technologies
    proj.technologies.forEach(tech => {
      const stats = getStat(tech);
      stats.frequency += 1;
      // Projects give a small flat credit to experience duration if not otherwise accumulated
      stats.months += 3; 
    });

    // 2. Textual mentions in project bullets
    proj.bulletPoints.forEach(bullet => {
      Object.keys(skillStats).forEach(skill => {
        const textMatches = countMatchesInText(bullet, skill);
        if (textMatches > 0) {
          const stats = getStat(skill);
          stats.frequency += textMatches;
        }
      });
    });
  });

  // Transform into final array
  return Object.entries(skillStats).map(([name, stats]) => {
    const category = skillToCategoryMap[name] || "Other";
    return {
      name,
      category,
      frequency: stats.frequency,
      monthsOfExperience: stats.months,
      yearsOfExperience: parseFloat((stats.months / 12).toFixed(1))
    };
  }).sort((a, b) => b.monthsOfExperience - a.monthsOfExperience || b.frequency - a.frequency);
}

// 2. Analyze Linguistic Action Verbs
export function analyzeActionVerbs(resume: ResumeData): LinguisticAnalysis {
  const allBullets: string[] = [];
  
  resume.experience.forEach(exp => {
    exp.roles.forEach(role => {
      allBullets.push(...role.bulletPoints);
    });
  });
  
  resume.projects.forEach(proj => {
    allBullets.push(...proj.bulletPoints);
  });

  const verbCounts: Record<string, number> = {};
  
  // Extract the first word of each bullet (removing punctuation/spaces)
  allBullets.forEach(bullet => {
    const cleanBullet = bullet.trim();
    if (!cleanBullet) return;
    
    // Grab the first word
    const firstWordMatch = cleanBullet.match(/^[a-zA-Z]+/);
    if (firstWordMatch) {
      const verb = firstWordMatch[0].toLowerCase();
      verbCounts[verb] = (verbCounts[verb] || 0) + 1;
    }
  });

  // Structure action verb categories
  const categories: ActionVerbCategory[] = verbCategories.map(cat => {
    const matchingVerbs: string[] = [];
    let count = 0;
    
    Object.entries(verbCounts).forEach(([verb, val]) => {
      if (cat.verbs.includes(verb)) {
        matchingVerbs.push(verb);
        count += val;
      }
    });

    return {
      category: cat.category,
      count,
      verbs: matchingVerbs.sort((a, b) => verbCounts[b] - verbCounts[a]),
      description: cat.description
    };
  });

  // Verbs list sorted by frequency
  const sortedVerbs: VerbCount[] = Object.entries(verbCounts)
    .map(([verb, count]) => ({ verb, count }))
    .sort((a, b) => b.count - a.count);

  // Recommendations and critiques
  const recommendations: string[] = [];
  
  // Check for repeated verbs
  sortedVerbs.slice(0, 3).forEach(item => {
    if (item.count > 2) {
      const verbFormatted = item.verb.charAt(0).toUpperCase() + item.verb.slice(1);
      recommendations.push(
        `Action verb **"${verbFormatted}"** is used ${item.count} times. Consider substituting some occurrences with synonyms (e.g. if using "Developed" frequently, try "Engineered", "Synthesized", or "Formulated").`
      );
    }
  });

  // Check category balance
  const implementationCat = categories.find(c => c.category.includes("Engineering"));
  const impactCat = categories.find(c => c.category.includes("Optimization"));
  
  if (implementationCat && impactCat) {
    if (implementationCat.count > impactCat.count * 2) {
      recommendations.push(
        `Your writing leans heavily towards execution (*"${implementationCat.count}* implementation verbs") compared to optimization and business impact (*"${impactCat.count}* impact verbs"). Try adding more focus on results (e.g., *Optimized*, *Increased*, *Reduced*).`
      );
    }
  }

  if (allBullets.length > 0 && sortedVerbs.length === 0) {
    recommendations.push("Ensure your bullet points start with active, descriptive action verbs instead of passive phrases or nouns.");
  }

  return {
    totalBullets: allBullets.length,
    verbsFound: sortedVerbs,
    categories,
    recommendations
  };
}

// 3. Analyze Scannability & Readability
export function analyzeScannability(resume: ResumeData): ReadabilityMetrics {
  const allBullets: string[] = [];
  
  resume.experience.forEach(exp => {
    exp.roles.forEach(role => {
      allBullets.push(...role.bulletPoints);
    });
  });
  
  resume.projects.forEach(proj => {
    allBullets.push(...proj.bulletPoints);
  });

  let totalWords = 0;
  let quantifiableCount = 0;

  allBullets.forEach(bullet => {
    const words = bullet.trim().split(/\s+/).filter(Boolean);
    totalWords += words.length;

    // Check if the bullet contains numeric quantitative data (excluding isolated years like 2020 or 2022)
    // We filter out 4-digit years between 2000 and 2030 to prevent counting timeline dates as business metrics
    const hasNumber = words.some(word => {
      const match = word.match(/\d+/);
      if (match) {
        const num = parseInt(match[0], 10);
        const isYear = num >= 2000 && num <= 2030;
        return !isYear;
      }
      return false;
    });

    if (hasNumber) {
      quantifiableCount++;
    }
  });

  const averageBulletLength = allBullets.length > 0 ? parseFloat((totalWords / allBullets.length).toFixed(1)) : 0;
  const quantifiablePercentage = allBullets.length > 0 ? Math.round((quantifiableCount / allBullets.length) * 100) : 0;

  // Recruiter Flags & Suggestions
  const recruiterFlags: string[] = [];
  
  if (averageBulletLength > 22) {
    recruiterFlags.push("Bullet points are slightly wordy (average length > 22 words). Keep sentences punchy, ideally between 12-18 words, to avoid visual fatigue.");
  } else if (averageBulletLength < 10 && allBullets.length > 0) {
    recruiterFlags.push("Bullet points are overly brief (average length < 10 words). Make sure to elaborate on how you accomplished each task and the impact it had.");
  }

  if (quantifiablePercentage < 30) {
    recruiterFlags.push("Low metric density! Only " + quantifiablePercentage + "% of bullet points contain quantifiable numbers or percentages. Recruiters love seeing data-driven results (e.g. 'reduced component rendering times by 15%' or 'handling ~40 pricing endpoints').");
  }

  // Recruiter Scan Score computation (0 - 100)
  // 1. Length penalty/credit (up to 30 points)
  let lengthScore = 30;
  if (averageBulletLength > 25) lengthScore = 10;
  else if (averageBulletLength > 20) lengthScore = 20;
  else if (averageBulletLength < 10) lengthScore = 15;

  // 2. Metrics weight (up to 40 points)
  const metricScore = Math.min(40, quantifiablePercentage * 1.2);

  // 3. Size balance weight (up to 30 points)
  let countScore = 30;
  if (allBullets.length > 18) countScore = 15; // too verbose, over 1 page
  else if (allBullets.length < 8) countScore = 15; // too light

  const scannabilityScore = Math.round(lengthScore + metricScore + countScore);

  return {
    totalWords,
    averageBulletLength,
    quantifiableBulletCount: quantifiableCount,
    quantifiablePercentage,
    scannabilityScore,
    recruiterFlags
  };
}

// 4. Combined Analysis Suite
export function runResumeAnalysis(resume: ResumeData, referenceDate?: Date): ResumeAnalysisResult {
  return {
    skills: analyzeSkills(resume, referenceDate),
    linguistics: analyzeActionVerbs(resume),
    readability: analyzeScannability(resume)
  };
}
