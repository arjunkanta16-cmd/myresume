export type Skill = {
  name: string;
  level: number;
  note?: string;
};

export type SkillCategory = {
  title: string;
  description: string;
  items: Skill[];
};

export type Experience = {
  role: string;
  company: string;
  duration: string;
  location: string;
  summary: string;
  highlights: string[];
};

export type Project = {
  title: string;
  strapline: string;
  problem: string;
  solution: string;
  tech: string[];
  outcome: string;
};

export type Certification = {
  title: string;
  issuer: string;
  note: string;
};

export type ContactInfo = {
  emails: string[];
  phone: string;
  location: string;
  addressLines?: string[];
  github?: string;
  linkedin?: string;
};

export type Stat = {
  label: string;
  value: string;
  detail: string;
};

export type PortfolioData = {
  name: string;
  fullName: string;
  role: string;
  tagline: string;
  professionalIdentity: string;
  shortIntro: string;
  heroBlurb: string;
  aboutStory: string[];
  stats: Stat[];
  skills: SkillCategory[];
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
  careerGoal: string;
  contact: ContactInfo;
};

export const adminPassword = "system-architect";
export const mockOtp = "2604";
export const portfolioStorageKey = "arjun-portfolio-content-v2";

export const defaultPortfolioData: PortfolioData = {
  name: "KANTA LEELA TRILOK ARJUN",
  fullName: "KANTA LEELA TRILOK ARJUN",
  role: "IT Developer | DevOps Enthusiast | Systems Thinker",
  tagline: "System-driven IT Engineer building scalable and intelligent solutions",
  professionalIdentity:
    "I build real-world digital systems by combining engineering fundamentals with modern software technologies.",
  shortIntro:
    "B.Tech graduate in Electrical and Electronics Engineering from Sri Venkateswara Engineering College, now focused on software delivery, automation, cloud operations, and full-stack systems.",
  heroBlurb:
    "From industrial engineering environments and apprenticeship training to modern web and DevOps workflows, I approach software as a system: designed for clarity, automation, reliability, and measurable outcomes across cloud and operational environments.",
  aboutStory: [
    "My foundation started with a B.Tech in Electrical and Electronics Engineering at Sri Venkateswara Engineering College, Tirupati, where I learned to think in terms of systems, constraints, signal flow, power quality, and reliability. That training still shapes how I solve problems today: not as isolated tasks, but as connected components inside a larger architecture.",
    "Industrial exposure through Rayalaseema Thermal Power Project and apprenticeship training at Bharat Dynamics Limited strengthened my understanding of process-driven environments, technical documentation, system testing, debugging, and disciplined execution. Those experiences gave me a strong appreciation for dependable systems and operational clarity.",
    "I am now channeling that engineering rigor into software development, DevOps, automation, and AI-oriented systems. My focus is on building digital products and workflows that are not only functional, but thoughtfully structured, maintainable, and ready for real-world cloud, web, and R&D environments."
  ],
  stats: [
    {
      label: "Education",
      value: "B.Tech EEE",
      detail: "Sri Venkateswara Engineering College, Tirupati (2020-2024)"
    },
    {
      label: "Industrial Exposure",
      value: "BDL + APGENCO",
      detail: "Training shaped by testing, operations, documentation, and process discipline"
    },
    {
      label: "Career Direction",
      value: "Software + DevOps + AI",
      detail: "Building toward scalable products, automation, cloud operations, and intelligent workflows"
    }
  ],
  skills: [
    {
      title: "Programming",
      description: "Practical coding foundation for problem solving, automation, and application development.",
      items: [
        { name: "Python", level: 86, note: "Automation, logic building, AI-oriented learning" },
        { name: "JavaScript", level: 78, note: "Frontend logic and modern web interfaces" },
        { name: "C", level: 70, note: "Engineering-oriented programming fundamentals" },
        { name: "Java", level: 58, note: "Basic OOP and application structure" }
      ]
    },
    {
      title: "Web Development",
      description: "Building responsive interfaces and project-driven frontend systems.",
      items: [
        { name: "HTML", level: 90, note: "Semantic structure and accessibility awareness" },
        { name: "CSS / Tailwind", level: 84, note: "Responsive layouts and polished UI systems" },
        { name: "JavaScript DOM", level: 80, note: "Interactive client-side experiences" },
        { name: "React", level: 72, note: "Used in product-style projects and modern component-based interfaces" },
        { name: "Next.js", level: 70, note: "Used for structured multi-page apps and production-ready frontend systems" },
        { name: "UI / UX Systems", level: 82, note: "Designing clean user flows, dashboards, and responsive product interfaces" }
      ]
    },
    {
      title: "DevOps & Cloud",
      description: "Developing operational awareness for deployment, infrastructure, and automation.",
      items: [
        { name: "AWS Fundamentals", level: 72, note: "EC2, S3, IAM and cloud service understanding" },
        { name: "Git & Version Control", level: 78, note: "Basic branching, collaboration, and code history discipline" },
        { name: "DevOps Lifecycle", level: 76, note: "Awareness of CI/CD, release flow, monitoring, and feedback loops" },
        { name: "Automation Concepts", level: 78, note: "Reducing repeated effort through scripts and process simplification" },
        { name: "Deployment Awareness", level: 72, note: "Thinking about build, hosting, release readiness, and maintainable delivery" }
      ]
    },
    {
      title: "Systems & Tools",
      description: "Tooling and systems awareness shaped by engineering and software environments.",
      items: [
        { name: "Linux Basics", level: 72, note: "Filesystems, permissions, commands, and operating environment awareness" },
        { name: "MATLAB / Simulink", level: 90, note: "Modeling, simulation, and technical experimentation" },
        { name: "Monitoring Awareness", level: 68, note: "Thinking in observability, system health, and reliability" },
        { name: "Documentation", level: 88, note: "Clear reporting, process capture, and technical communication" },
        { name: "Product Workflow Thinking", level: 80, note: "Structuring features, pages, and user journeys as connected systems" }
      ]
    },
    {
      title: "Professional Strengths",
      description: "Human skills that improve execution, communication, and team outcomes.",
      items: [
        { name: "Problem Solving", level: 91, note: "Structured approach to ambiguity and constraints" },
        { name: "Analytical Thinking", level: 90, note: "Breaking large systems into actionable components" },
        { name: "Team Collaboration", level: 84, note: "Cross-functional coordination with accountability" },
        { name: "Adaptability", level: 82, note: "Learning quickly in new technical and operational contexts" }
      ]
    }
  ],
  experience: [
    {
      role: "Graduate Apprentice Engineer",
      company: "Bharat Dynamics Limited (BDL) - Ministry of Defence",
      duration: "2025",
      location: "India",
      summary:
        "Worked inside a structured industrial engineering environment where system testing, technical documentation, quality discipline, and coordinated execution were essential to dependable outcomes.",
      highlights: [
        "Assisted engineering teams in system testing, validation support, and documentation activities",
        "Worked in a process-driven environment shaped by quality standards, debugging, and technical workflows",
        "Collaborated with cross-functional teams to support project activities and technical coordination",
        "Strengthened analytical thinking, observation discipline, and a debugging-first mindset"
      ]
    },
    {
      role: "Industrial Trainee",
      company: "Rayalaseema Thermal Power Project (APGENCO)",
      duration: "2023",
      location: "Andhra Pradesh, India",
      summary:
        "Studied real-world thermal power generation processes and gained practical exposure to plant operations, industrial safety, and large-scale power systems.",
      highlights: [
        "Observed plant workflows, power system operations, and industrial engineering practices",
        "Built practical understanding of operational reliability, safety discipline, and technical process awareness",
        "Connected classroom engineering concepts with real-world infrastructure execution"
      ]
    },
    {
      role: "Full Stack Development Virtual Intern",
      company: "IIDT (APSCH)",
      duration: "2024",
      location: "Remote",
      summary:
        "Gained hands-on exposure to frontend and backend web development concepts in a virtual project-driven environment.",
      highlights: [
        "Developed responsive web pages using HTML, CSS, and JavaScript",
        "Learned fundamentals of RESTful services and web application workflows",
        "Collaborated in an agile-style virtual development environment"
      ]
    },
    {
      role: "Artificial Intelligence with Python Virtual Intern",
      company: "EdVedha (AICTE)",
      duration: "2024",
      location: "Remote",
      summary:
        "Expanded technical focus into AI-assisted workflows using Python, with emphasis on data preprocessing, experimentation, and future-ready systems thinking.",
      highlights: [
        "Implemented basic machine learning models using Python",
        "Worked with data preprocessing and model evaluation techniques",
        "Explored AI workflow integration concepts through a structured 3-month training program"
      ]
    }
  ],
  projects: [
    {
      title: "Solar-Assisted EV Charging System",
      strapline: "Simulation-led energy system for efficient charging behavior",
      problem:
        "EV charging can place uneven demand on power systems, especially when renewable input and energy balance are not planned effectively.",
      solution:
        "Designed and implemented control logic in MATLAB/Simulink to study solar-assisted EV charging behavior, improve power flow management, and automate simulation scenarios across multiple operating conditions.",
      tech: ["MATLAB", "Simulink", "Power Systems", "Simulation Automation"],
      outcome:
        "Built an engineering model that helped evaluate charging performance, grid power quality behavior, and THD-oriented improvement opportunities."
    },
    {
      title: "Agricultural Power Optimization",
      strapline: "Efficiency-focused analysis for smarter energy usage",
      problem:
        "Agricultural energy systems often experience inefficient utilization due to limited visibility into consumption patterns and optimization strategies.",
      solution:
        "Analyzed agricultural power usage and documented data-driven strategies for improving energy efficiency and resource planning.",
      tech: ["Data Analysis", "Energy Systems", "Optimization Thinking", "Documentation"],
      outcome:
        "Presented actionable insights for reducing waste, improving utilization, and supporting better planning decisions."
    },
    {
      title: "Portfolio & Web Systems",
      strapline: "Modern responsive interfaces positioned for professional impact",
      problem:
        "Many personal sites fail to communicate engineering depth, structured thinking, and recruiter-ready clarity at the same time.",
      solution:
        "Built responsive web interfaces with strong UI/UX focus, modular structure, and content strategy that positions projects as outcomes inside larger systems.",
      tech: ["Next.js", "React", "Tailwind CSS", "Motion Design", "Component Architecture"],
      outcome:
        "Delivered web experiences that are visually polished, mobile-ready, and aligned with professional storytelling for career growth."
    },
    {
      title: "SaaS Platform Interfaces",
      strapline: "Product-style platforms built with scalable UI structure",
      problem:
        "SaaS products need interfaces that can handle dashboards, feature flows, administration, and clear user journeys without becoming cluttered or inconsistent.",
      solution:
        "Built SaaS-style web platforms with modular components, responsive layouts, dashboard-oriented UI, and structured feature flows designed for maintainability and product clarity.",
      tech: ["Next.js", "React", "Tailwind CSS", "Dashboard UI", "Component Architecture", "Responsive Design"],
      outcome:
        "Demonstrated the ability to build product-oriented platforms that feel organized, scalable, and aligned with real-world software usage."
    },
    {
      title: "E-Commerce Website",
      strapline: "Conversion-focused web experience for product browsing and purchase flow",
      problem:
        "E-commerce experiences must balance product discovery, trust, usability, and smooth customer journeys across desktop and mobile screens.",
      solution:
        "Developed a responsive e-commerce website with structured product browsing, clear catalog presentation, cart-oriented flow, and user-focused UI decisions for a smoother shopping experience.",
      tech: ["HTML", "CSS", "JavaScript", "React", "Responsive Design", "UI / UX"],
      outcome:
        "Showed practical full-stack product thinking by translating business and user needs into a clearer, more usable digital commerce experience."
    }
  ],
  certifications: [
    {
      title: "AWS Academy Graduate - Cloud Foundations",
      issuer: "AWS Academy",
      note: "Core awareness of cloud services, identity, storage, and deployment concepts"
    },
    {
      title: "MATLAB Onramp & Simulink Onramp",
      issuer: "MathWorks",
      note: "Demonstrates simulation, modeling, and control-system workflow capability"
    },
    {
      title: "NPTEL Power Quality",
      issuer: "NPTEL",
      note: "Deepened technical understanding of electrical system performance"
    },
    {
      title: "Core Employability Skills Program",
      issuer: "Wadhwani Foundation",
      note: "Strengthened workplace readiness, communication, and professional execution skills"
    },
    {
      title: "Project Expo - 2nd Prize",
      issuer: "AMPLE 2023, SVCE",
      note: "Recognition for applied project quality, technical presentation, and engineering execution"
    },
    {
      title: "IEEE Technical Participation",
      issuer: "IEEE Circuits & Systems Society / IEEE PES",
      note: "Participated in Boolean Master and IEEE PES technical quiz events"
    }
  ],
  careerGoal:
    "Seeking opportunities as a Software Developer / DevOps / Automation Engineer to build scalable, efficient, and intelligent systems across cloud, web, and engineering environments.",
  contact: {
    emails: ["arjunkanta16@gmail.com", "arjunkanta02@gmail.com"],
    phone: "+91 63009 94709",
    location: "Vempalle, Kadapa, Andhra Pradesh, India",
    addressLines: [
      "5/312, near Usha Kiran High School",
      "Vempalle, Kadapa District",
      "Andhra Pradesh 516329, India"
    ]
  }
};
