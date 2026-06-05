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
  interests?: string[];
}

export const resumeData: ResumeData = {
  contact: {
    name: "Daniel Fuentes",
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
      items: ["TypeScript / JS", "Python", "C++", "SQL"]
    },
    {
      category: "Cloud & Infrastructure",
      items: ["GCP", "Docker", "Kubernetes", "Terraform", "CI/CD (GitHub Actions)", "Slurm"]
    },
    {
      category: "Web Frameworks",
      items: ["React", "Next.js", "Node.js / Express", "Angular", "Django", "Flask"]
    },
    {
      category: "Data & AI",
      items: ["Vertex AI", "BigQuery", "Dataflow", "Document AI", "RAG / LLM Pipelines"]
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
            "Architected highly-available data ingestion pipelines using Cloud Run and BigQuery, processing [e.g., 5TB+ of daily unstructured data] with 99.9% uptime, enabling real-time analytics for [e.g., 10+ enterprise clients].",
            "Engineered distributed GPU computing environments by deploying automated Slurm clusters via Terraform, reducing ML model training lifecycles by [e.g., 40%] for high-performance compute (HPC) workloads.",
            "Designed and validated complex backend architectures for [e.g., 15+ high-growth startups], securely integrating disparate legacy systems with managed AI services (Document AI) to automate [e.g., 10M+ document processing pipelines].",
            "Established production-grade MLOps infrastructure by deploying containerized ML training workloads and managed inference endpoints on Vertex AI, supporting [e.g., 500+ QPS] with sub-100ms latency."
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
            "Engineered an evaluation pipeline and optimized a Retrieval-Augmented Generation (RAG) endpoint using Vertex Search-grounded LLMs, increasing automated response accuracy by [e.g., 25%] across [e.g., 5,000+ monthly] internal sales inquiries.",
            "Led backend development for an internal Python platform, automating the provisioning of complex GCP environments and reducing infrastructure deployment times from [e.g., days to minutes] for [e.g., 200+ engineers].",
            "Designed fault-tolerant infrastructure deployments, including highly available Managed Instance Groups (MIGs) capable of handling [e.g., 10,000+ concurrent connections] across multi-region cloud architectures."
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
      title: "Resume Analytics & Portfolio",
      technologies: ["React 19", "Next.js 15", "TypeScript", "Vitest", "Cloud Run", "GitHub Actions"],
      bulletPoints: [
        "Architected a server-rendered portfolio and analytics dashboard utilizing the Next.js App Router for optimized performance and SEO.",
        "Engineered a custom NLP heuristics analyzer in TypeScript to parse and evaluate resume linguistic scannability, XYZ metric density, and ATS keyword matching.",
        "Implemented a secure cryptographic authentication gate using the Web Crypto API (SHA-256) and deployed the containerized application to Cloud Run via automated GitHub Actions pipelines.",
        "Established robust continuous integration (CI) workflows via GitHub Actions, integrating ESLint and Vitest to enforce code quality and automate unit testing."
      ]
    },
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
  },
  interests: ["Bouldering", "Guitar", "Hiking", "Thriller", "Comedy"]
};
