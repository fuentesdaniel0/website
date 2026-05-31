export interface ContactInfo {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
}

export interface ExperienceRole {
  title: string;
  startDate: string; // e.g., "Aug 2022"
  endDate: string;   // e.g., "Present" or "Jan 2022"
  startYear: number;
  startMonth: number; // 1-indexed
  endYear: number;
  endMonth: number;
  isCurrent: boolean;
  bulletPoints: string[];
  skillsUsed: string[];
}

export interface Experience {
  company: string;
  location: string;
  roles: ExperienceRole[];
}

export interface Project {
  title: string;
  technologies: string[];
  bulletPoints: string[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Education {
  institution: string;
  location: string;
  degree: string;
  minor: string;
  gpa: string;
  gradDate: string;
  coursework: string[];
}

export interface ResumeData {
  contact: ContactInfo;
  skills: SkillCategory[];
  experience: Experience[];
  projects: Project[];
  education: Education;
}

export const resumeData: ResumeData = {
  contact: {
    name: "Daniel A. Fuentes",
    title: "Full-Stack & Cloud Engineer",
    location: "Austin, TX",
    phone: "832-302-3211",
    email: "daniel.fuentes.sh@gmail.com",
    linkedin: "linkedin.com/in/daniel-a-fuentes/",
    github: "github.com/fuentesdaniel0" // Standard addition for developers
  },
  skills: [
    {
      category: "Languages",
      items: ["Python", "JavaScript", "TypeScript", "C++", "SQL", "HTML/CSS"]
    },
    {
      category: "Cloud & Infrastructure",
      items: ["Google Cloud (GCP)", "Docker", "Kubernetes (GKE)", "Terraform", "Git", "CI/CD", "Linux", "Slurm"]
    },
    {
      category: "Web Frameworks",
      items: ["React", "Node.js", "Express.js", "Angular", "Flask", "Django"]
    },
    {
      category: "Data & AI",
      items: ["Vertex AI", "BigQuery", "Document AI", "Dataflow", "RAG Pipelines"]
    }
  ],
  experience: [
    {
      company: "Google Cloud",
      location: "Austin, TX",
      roles: [
        {
          title: "Customer Engineer",
          startDate: "Aug 2022",
          endDate: "Present",
          startYear: 2022,
          startMonth: 8,
          endYear: 2026, // Treated as May 2026 for duration calculations in testing, or dynamic
          endMonth: 5,
          isCurrent: true,
          bulletPoints: [
            "Architected and deployed scalable, cloud-native backend services and data ingestion pipelines leveraging Cloud Run, BigQuery, and Document AI for high-growth startups.",
            "Engineered distributed computing environments, including deploying Slurm GPU clusters via Cluster Toolkit for high-performance computing workloads.",
            "Developed full-stack proof-of-concepts, integrating frontend frameworks with managed backend services to validate complex business architectures and data flows.",
            "Deployed containerized machine learning models for training workloads and established managed inference endpoints on Vertex AI."
          ],
          skillsUsed: ["Google Cloud (GCP)", "Cloud Run", "BigQuery", "Document AI", "Slurm", "React", "Node.js", "Python", "Docker", "Vertex AI"]
        },
        {
          title: "Solutions Engineer",
          startDate: "Oct 2021",
          endDate: "Jan 2022",
          startYear: 2021,
          startMonth: 10,
          endYear: 2022,
          endMonth: 1,
          isCurrent: false,
          bulletPoints: [
            "Led full-stack development of an internal demo platform using an Angular frontend and Python backend, streamlining the deployment of GCP integrations.",
            "Engineered an evaluation pipeline for Vertex Search-grounded LLMs, optimizing an internal Retrieval-Augmented Generation (RAG) endpoint used to automatically answer sales and forum inquiries.",
            "Configured and managed diverse infrastructure deployments, ranging from highly available Managed Instance Groups (MIGs) to flexible, single-instance architectures."
          ],
          skillsUsed: ["Google Cloud (GCP)", "Angular", "Python", "Vertex AI", "RAG Pipelines", "Git"]
        }
      ]
    },
    {
      company: "PROS",
      location: "Houston, TX",
      roles: [
        {
          title: "Software Development Intern",
          startDate: "Jun 2020",
          endDate: "Aug 2020",
          startYear: 2020,
          startMonth: 6,
          endYear: 2020,
          endMonth: 8,
          isCurrent: false,
          bulletPoints: [
            "Developed a suite of reusable React components for an Electron application, enabling comprehensive API testing across ~40 dynamic pricing endpoints.",
            "Improved application performance by implementing frontend optimizations that significantly reduced component rendering times and increased responsiveness.",
            "Introduced unit and integration tests using Jest and React Testing Library, improving overall code reliability."
          ],
          skillsUsed: ["React", "JavaScript", "HTML/CSS", "Jest", "React Testing Library"]
        }
      ]
    }
  ],
  projects: [
    {
      title: "Coda.sys (Terminal-Native Operating System)",
      technologies: ["Python", "TypeScript", "Node.js", "GitHub Actions"],
      bulletPoints: [
        "Architected a fully automated CI/CD pipeline and local telemetry system to manage a structured SWE upskilling pivot.",
        "Developed a local Node.js/TypeScript Model Context Protocol (MCP) server, enabling AI agents to natively invoke local Python scripts and read sprint state securely.",
        "Integrated GitHub Projects via GraphQL and Python CLI tools (`add_task.py`) for bi-directional sprint planning and task synchronization."
      ]
    },
    {
      title: "Playlist Intersection for Spotify",
      technologies: ["React", "Node.js", "Express.js", "Firestore", "Spotify API", "Cloud Run", "Google Cloud (GCP)", "Docker"],
      bulletPoints: [
        "Engineered a full-stack dashboard managing Spotify OAuth 2.0 authentication and stateful user sessions.",
        "Developed an Express.js backend to handle asynchronous data fetching and compute intersections across multiple user \"Liked Songs\" libraries.",
        "Containerized the service using Docker and deployed it to Google Cloud Run for scalable, serverless execution."
      ]
    }
  ],
  education: {
    institution: "University of Houston",
    location: "Houston, TX",
    degree: "Bachelor of Science in Computer Science",
    minor: "Minor in Mathematics",
    gpa: "3.88",
    gradDate: "December 2020",
    coursework: [
      "Data Structures & Algorithms",
      "Software Engineering & Design",
      "Operating Systems",
      "Database Systems",
      "Computer Architecture"
    ]
  }
};
