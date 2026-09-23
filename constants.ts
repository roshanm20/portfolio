import { Experience, Project, Award, SkillCategory, Position, Education, Principle, Stat } from './types';

export const PERSONAL_INFO = {
  name: "Muhammed Roshan M",
  tagline: "AI Data Operations | Evaluation & Delivery | Physics-trained",
  location: "Bhopal, India. Ready to relocate.",
  email: "muhammedroshanmangat@gmail.com",
  linkedin: "https://www.linkedin.com/in/mroshan1",
  github: "https://github.com/roshanm20",
  cv: "/Muhammed_Roshan_M_CV.pdf",
  summary: "I work on the part of AI data projects that decides whether they ship: scoping, quality bars, reviewer loops and deadlines. For the last year I have owned frontier-model evaluation tasks at Mercor from first draft to approved delivery, after more than two years of AI training work on other platforms. I trained as a physicist at IISER Bhopal and EPFL, and I co-founded Nayrix, a small software company."
};

export const STATS: Stat[] = [
  { value: "25", label: "Mercor contracts across 8+ domains" },
  { value: "2x", label: "Top Performer rating" },
  { value: "2.5 yrs", label: "AI training data work" },
  { value: "200+", label: "person team led at Singularity" }
];

export const EDUCATION_HISTORY: Education[] = [
  {
    institution: "IISER Bhopal",
    degree: "Integrated BS-MS in Physics",
    period: "2020 – 2025",
    details: "Minor in Earth & Environmental Science. CGPA 8.1/10, top 10%. DST INSPIRE Fellow."
  }
];

export const WORK_EXPERIENCE: Experience[] = [
  {
    id: "mercor",
    role: "Engineering Writer, premium evaluation program",
    organization: "Mercor",
    location: "Remote",
    period: "Aug 2025 – Present",
    type: "work",
    link: "https://www.mercor.com/",
    description: [
      "Worked 25 contracts across physics, maths, biology, electrical engineering, quant, research, Hindi RLHF and Malayalam safety annotation. Earned two Top Performer ratings and moved from hourly review work into a premium per-task writing role.",
      "Own evaluation tasks end to end: scope the task, build the source material, write the prompt, answer key and rubric, run the models, and take the task through reviewer and QA gates to approved delivery on fixed deadlines.",
      "Took over a task another writer had abandoned halfway, kept the approved work instead of restarting, and shipped it. Turned a reviewer's regression finding into a rubric fix that moved a stalled task into the next stage.",
      "Ran failure analysis across model runs. When two reworks showed computation was not the weak point, found the one failure that kept repeating (structure and formatting) and refocused the task on it.",
      "Wrote the standards I now work to: folder and file conventions, a source registration template, a difficulty design playbook and a pre-run checklist, because one stale input file can void a whole set of model runs."
    ]
  },
  {
    id: "nayrix",
    role: "Co-founder",
    organization: "Nayrix Software Solutions",
    location: "Kerala, India",
    period: "2025 – Present",
    type: "work",
    link: "https://www.nayrix.com/",
    description: [
      "Built and launched CompEdge, an AI competitive intelligence platform, from scope to live product on React, Supabase, Vercel and a Python report engine.",
      "Ran go-to-market end to end: LinkedIn content, Reddit outreach, n8n email automation and a warm-lead pipeline. A senior Big Four audit professional cleared a CompEdge report for client delivery.",
      "Client analytics for IMTC Qute Solutions Pvt. Ltd.: a home-loan dashboard with competitor benchmarking and an EMI calculator."
    ]
  },
  {
    id: "platforms",
    role: "AI Trainer and Task Author, Physics and STEM",
    organization: "Outlier, Soul AI, AfterQuery",
    location: "Remote",
    period: "Mar 2024 – Present",
    type: "work",
    description: [
      "Reviewed and rewrote model answers and reasoning in physics against detailed rubrics, and wrote gold answers used for fine-tuning. Worked to each platform's own guidelines, tools and quality bar.",
      "Author containerised science benchmark tasks with reference solutions and sealed verifiers, checked through automated difficulty, anti-cheat and quality review before acceptance."
    ]
  },
  {
    id: "crafted-learning",
    role: "Co-founder (past venture)",
    organization: "Crafted Learning Hub",
    location: "Kerala, India",
    period: "Past",
    type: "work",
    link: "https://www.craftedlearn.com/",
    description: [
      "Set up an EdTech venture for personalised learning. Tested the model, judged it would not scale the way we needed, and stepped away rather than keep spending on it."
    ]
  },
  {
    id: "teaching",
    role: "Physics Faculty and Tutor",
    organization: "JeeConnect, Superprof, Quidei",
    location: "Remote",
    period: "2019 – Present",
    type: "work",
    description: [
      "Taught Class 11 and 12 physics for JEE and CBSE, in live batches and one to one. Explaining hard ideas in plain words is the same skill I use when writing guidelines for contributors."
    ]
  }
];

export const PRINCIPLES: Principle[] = [
  {
    id: "own",
    title: "Own it end to end",
    text: "Scope, build, review, deliver. If it is late or wrong, it is mine to fix, not someone else's ticket."
  },
  {
    id: "process",
    title: "Fix the process, not the symptom",
    text: "If the same problem shows up twice, I write the checklist, template or rule so it does not show up a third time."
  },
  {
    id: "quality",
    title: "Quality bars you can check",
    text: "Clear, atomic criteria that two reviewers would grade the same way. Vague guidelines are where rework comes from."
  },
  {
    id: "data",
    title: "Find the real failure",
    text: "Look across runs and people before changing anything. One repeating cause is worth more than ten one-off fixes."
  }
];

export const POSITIONS: Position[] = [
  {
    id: "singularity-conv",
    role: "Convenor",
    organization: "Singularity, IISER Bhopal",
    period: "2022 – 2024",
    detail: "Largest science festival in central India. Led a 200+ member team and an INR 5 lakh budget from planning to event day."
  },
  {
    id: "sec",
    role: "Science Council Secretary",
    organization: "IISER Bhopal",
    period: "2022 – 2023",
    detail: "Coordinated the student science council, its clubs and its events for the year."
  },
  {
    id: "placement",
    role: "Placement Coordinator",
    organization: "Physics Department, IISER Bhopal",
    period: "2024",
    detail: "Point of contact between the department and visiting recruiters."
  },
  {
    id: "sciastra",
    role: "Campus Ambassador",
    organization: "SciAstra",
    period: "2023 – 2024",
    detail: "Represented an EdTech company on campus."
  }
];

export const SKILLS: SkillCategory[] = [
  {
    category: "Operations",
    skills: ["Delivery ownership", "QA and rubric design", "Failure analysis", "Contributor guidelines", "Process documentation", "Deadline planning"]
  },
  {
    category: "Data & Tools",
    skills: ["Python", "Pandas", "NumPy", "SQL", "Excel modelling", "Git", "Docker", "LaTeX"]
  },
  {
    category: "Build",
    skills: ["React", "TypeScript", "Supabase", "Vercel", "n8n"]
  },
  {
    category: "Domains Worked",
    skills: ["Physics", "Mathematics", "Biology", "Electrical Engineering", "Quant", "Astronomy"]
  },
  {
    category: "Languages",
    skills: ["English", "Malayalam", "Hindi"]
  }
];

export const RESEARCH_EXPERIENCE: Experience[] = [
  {
    id: "epfl-2024",
    role: "Deep learning for radio image reconstruction",
    organization: "EPFL, Switzerland (ThinkSwiss Fellow)",
    location: "Lausanne, CH",
    period: "Jun 2024 – Aug 2024",
    type: "research",
    advisors: "Dr. Emma Tolley",
    skills: ["Python", "PyTorch", "U-Net", "WSClean"],
    description: [
      "Built a U-Net pipeline to deconvolve simulated LOFAR radio images, end to end and fully automated.",
      "Benchmarked it against the standard tool (WSClean) and it came out ahead on morphological and statistical metrics.",
      "Chaired a session at the MWA project meeting and attended the SKA-CH project meeting."
    ]
  },
  {
    id: "iia-2025",
    role: "Multi-epoch quasar catalogue",
    organization: "Indian Institute of Astrophysics",
    location: "Bengaluru, IN",
    period: "2024 – 2025",
    type: "research",
    advisors: "Dr. Vivek M",
    skills: ["Python", "SQL", "Astropy", "Pandas"],
    description: [
      "Built a catalogue of multi-epoch broad absorption line quasars from SDSS DR16Q for my master's thesis.",
      "Automated the measurement and plotting so the same analysis ran the same way across every source."
    ]
  },
  {
    id: "gmrt",
    role: "Interferometry and beamformer data",
    organization: "GMRT, NCRA-TIFR",
    location: "Pune, IN",
    period: "2022 – 2023",
    type: "research",
    advisors: "Ms. Mekhala Muley, Dr. Jayanta Roy",
    skills: ["Python", "C", "NumPy", "Linux"],
    description: [
      "Converted FPGA beamformer output into the format the observatory's pulsar tools read, with minimal precision loss.",
      "Simulated multi-element interferometer power patterns."
    ]
  },
  {
    id: "iiserb",
    role: "Signal processing and data visualisation",
    organization: "IISER Bhopal",
    location: "Bhopal, IN",
    period: "2023",
    type: "research",
    advisors: "Dr. Nirmal Ganguly, Prof. Ramya Sunder Raman",
    skills: ["Python", "SciPy", "Plotly"],
    description: [
      "Pulled faint periodic signals out of simulated noisy pulsar data using Fourier methods.",
      "Led the Python work for a life cycle analysis comparing online and pen-and-paper exams."
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "compedge",
    title: "CompEdge",
    year: "2025",
    description: "AI competitive intelligence platform, built and launched under Nayrix. Produces client-ready competitor reports; one passed review by a senior Big Four audit professional for client delivery.",
    tech: ["React", "Supabase", "Vercel", "Python", "LaTeX"],
    demoLink: "https://compedge.nayrix.com"
  },
  {
    id: "decision-lab",
    title: "Decision Lab",
    year: "2026",
    description: "One worked piece a day on business intelligence, AI product decisions and how companies make money. A running habit of breaking down real decisions with numbers.",
    tech: ["Python", "Business analysis"],
    link: "https://github.com/roshanm20/decision-lab"
  },
  {
    id: "autobal-ai",
    title: "Autobal.AI",
    year: "2025",
    description: "Pipeline for broad absorption line quasar spectra: smoothing, continuum fitting and automatic extraction of equivalent width and outflow velocity, with an AI analyst that explains the numbers.",
    tech: ["React", "TypeScript", "Data pipeline"],
    link: "https://github.com/roshanm20/Autobal.AI"
  },
  {
    id: "cosmoscope",
    title: "CosmoScope",
    year: "2025",
    description: "Research sandbox that connects SDSS archive data to physical models, with multi-epoch simulation and variability diagnostics.",
    tech: ["React", "SDSS", "Recharts"],
    link: "https://github.com/roshanm20/Cosmoscope"
  },
  {
    id: "stellar-lens",
    title: "STELLAR-LENS",
    year: "2025",
    description: "Dashboard that simulates accretion variability in young stars in real time and explains what the simulation is showing.",
    tech: ["React", "Physics engine", "Recharts"],
    link: "https://github.com/roshanm20/Stellar-lens",
    demoLink: "https://stellar-lens.netlify.app/"
  },
  {
    id: "yso-latent",
    title: "YSO Latent Explorer",
    year: "2025",
    description: "Turns light-curve time series into a latent space you can explore, to spot unusual sources and suggest what is causing them.",
    tech: ["React", "TypeScript", "Recharts"],
    link: "https://github.com/roshanm20/astrobench-yso-explorer",
    demoLink: "https://astrobench-yso-explorer.netlify.app"
  }
];

export const AWARDS: Award[] = [
  { id: "mercor-tp", title: "Top Performer rating, twice", organization: "Mercor", year: "2025 – 26" },
  { id: "thinkswiss", title: "ThinkSwiss Research Scholarship: Asia Pacific", organization: "SERI / Swissnex", year: "2024" },
  { id: "porto", title: "Selected for summer research internship", organization: "Instituto de Astrofísica e Ciências do Espaço, Porto", year: "2023" },
  { id: "nius", title: "Selected for NIUS Physics (18.1 and 18.2)", organization: "HBCSE, TIFR Mumbai", year: "2020 – 23" },
  { id: "dst", title: "DST INSPIRE Fellowship", organization: "DST, Govt of India", year: "2020 – 25" },
  { id: "vijyoshi", title: "VIJYOSHI National Science Camp", organization: "IISc Bengaluru", year: "2020" }
];
