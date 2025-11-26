import { Experience, Project, Award, SkillCategory, Workshop, Position, Education } from './types';

export const PERSONAL_INFO = {
  name: "Muhammed Roshan M",
  tagline: "BS-MS Physics Graduate | Astrophysics & AI Researcher",
  location: "Bhopal, India",
  email: "muhammedroshanmangat@gmail.com",
  alt_email: "roshanm20@iiserb.ac.in",
  linkedin: "https://www.linkedin.com/in/mroshan1", 
  github: "https://github.com/roshanm20",
  phone: "+91 8606 829038",
  summary: "Astrophysics researcher specializing in radio interferometry and spectral analysis, with deep expertise in machine learning and deep learning architectures. Pioneering the application of AI in astronomy by developing novel U-Net pipelines for image deconvolution and sophisticated simulation engines. Dedicated to advancing scientific discovery through the convergence of rigorous physics and modern artificial intelligence."
};

export const EDUCATION_HISTORY: Education[] = [
  {
    institution: "Indian Institute of Science Education and Research Bhopal",
    degree: "Integrated BS-MS in Physics",
    period: "Dec 2020 – Jun 2025",
    details: "Graduated. Major in Physics. Minor in Earth & Environmental Science. CGPA: 8.1/10."
  },
  {
    institution: "EMEA HSS, Kondotty",
    degree: "Class XII (Board of Higher Secondary Examination, Kerala)",
    period: "March 2020",
    details: "Score: 100% (Revenue District Topper)"
  },
  {
    institution: "Markazul Uloom English School, Kondotty",
    degree: "Class X (CBSE)",
    period: "March 2018",
    details: "Score: 94.6%"
  }
];

export const RESEARCH_EXPERIENCE: Experience[] = [
  {
    id: "epfl-2024",
    role: "Developing Novel Deconvolution Techniques",
    organization: "EPFL, Switzerland",
    location: "Lausanne, CH",
    period: "Jun 2024 – Aug 2024",
    type: "research",
    advisors: "Dr. Emma Tolley",
    skills: ["Python", "PyTorch", "U-Net", "BIPP", "WSClean", "Bash", "TensorFlow", "Scikit-learn", "Pytorch", "Keras"],
    description: [
      "Developed U-Net architecture for deconvolution of Eigen Images from radio interferometric imaging software (BIPP).",
      "Tailored a fully automated pipeline for deconvolution of simulated LOFAR data.",
      "Benchmarked model performance, finding it superior to conventional WSClean outputs."
    ]
  },
  {
    id: "iia-2025",
    role: "Finding Multi Epoch Quasars",
    organization: "Indian Institute of Astrophysics",
    location: "Bengaluru, IN",
    period: "May 2024 – Apr 2025",
    type: "research",
    advisors: "Dr. Vivek M",
    skills: ["Python", "SDSS Dr16Q", "SQL", "TOPCAT", "Astropy", "Pandas"],
    description: [
      "Prepared a dedicated catalogue for Multi-BAL Quasars from SDSS DR16Q.",
      "Applied critical thinking to extract meaningful findings on absorption line variabilities.",
      "Selected peculiar sources to study characteristics and reasons for variability."
    ]
  },
  {
    id: "iiserb-pulsar",
    role: "Filtering Out Noise from Simulated Pulsar Signal",
    organization: "IISER Bhopal",
    location: "Bhopal, IN",
    period: "Mar 2023 – Apr 2023",
    type: "research",
    advisors: "Dr. Mayuresh Surnis, Dr. Nirmal Ganguly",
    skills: ["Python", "Fourier Transform", "NumPy", "SciPy", "Signal Processing"],
    description: [
      "Employed advanced Fourier Transform and window averaging algorithms to amplify intrinsic periodicity.",
      "Enhanced signal-to-noise discrimination to facilitate precise frequency analysis.",
      "Detected faint astronomical phenomena amidst noisy backgrounds using sophisticated processing techniques."
    ]
  },
  {
    id: "iiserb-lca",
    role: "Comparative Life Cycle Analysis",
    organization: "IISER Bhopal",
    location: "Bhopal, IN",
    period: "Jan 2023 – Apr 2023",
    type: "research",
    advisors: "Prof. Ramya Sunder Raman",
    skills: ["Python", "Plotly", "Matplotlib", "Data Visualization", "Sankey Diagrams"],
    description: [
      "Led Python development for visualizing LCA data (radar charts, Sankey diagrams, tree maps).",
      "Conducted comparative analysis of online vs. pen & paper exams.",
      "Calculated overall environmental impacts associated with paper and tablet production."
    ]
  },
  {
    id: "gmrt-interferometry",
    role: "Multi Element Interferometry Simulation",
    organization: "GMRT Pune",
    location: "Pune, IN",
    period: "Dec 2022 – Apr 2023",
    type: "research",
    advisors: "Ms. Mekhala Muley, Dr. Jayanta Roy",
    skills: ["Python", "NumPy", "Electromagnetism", "Simulation"],
    description: [
      "Developed robust power pattern analysis algorithm using Python/NumPy for electric field evaluation.",
      "Leveraged complex number operations and element-wise exponentiation to characterize power distribution.",
      "Demonstrated profound understanding of electromagnetic wave phenomena."
    ]
  },
  {
    id: "gmrt-fpga",
    role: "Converting Output from Beamformer in FPGA",
    organization: "GMRT Pune",
    location: "Pune, IN",
    period: "Jun 2022 – Aug 2022",
    type: "research",
    advisors: "Ms. Mekhala Muley, Dr. Jayanta Roy",
    skills: ["C", "Python", "FPGA", "Digital Signal Processing", "Linux"],
    description: [
      "Spearheaded conversion of output data from FPGA accelerator card into GP Tool compatible format.",
      "Developed Python-based solution to convert float data to ShortInt with minimal precision loss.",
      "Enabled seamless analysis of radio astronomical observations in GMRT Pulsar Analysis Tool."
    ]
  }
];

export const WORK_EXPERIENCE: Experience[] = [
  {
    id: "nayrix",
    role: "Co-Founder",
    organization: "Nayrix",
    location: "Kerala, IN",
    period: "Present",
    type: "work",
    link: "https://www.nayrix.com/",
    description: [
      "Co-founded a software solutions company delivering bespoke digital products.",
      "Overseeing technical strategy, client delivery, and full-stack development."
    ]
  },
  {
    id: "crafted-learning",
    role: "Co-Founder",
    organization: "Crafted Learning Hub",
    location: "Kerala, IN",
    period: "Present",
    type: "work",
    link: "https://www.craftedlearn.com/",
    description: [
      "Leading an EdTech initiative focused on personalized learning pathways.",
      "Developing educational content strategies and technical infrastructure for online delivery."
    ]
  },
  {
    id: "jee-connect",
    role: "Physics Faculty",
    organization: "JeeConnect",
    location: "Mumbai",
    period: "Jan 2023 – Mar 2025",
    type: "work",
    description: [
      "Delivered advanced physics instruction for competitive exams.",
      "Developed curriculum aligned with national standards."
    ]
  },
  {
    id: "quidei",
    role: "Individual Tutor - Physics",
    organization: "Quidei",
    location: "Remote",
    period: "2023",
    type: "work",
    description: [
      "Provided one-on-one tutoring for XI and XII NCERT physics curriculum."
    ]
  },
  {
    id: "superprof",
    role: "Physics Tutor",
    organization: "Superprof",
    location: "Remote",
    period: "2019 – Present",
    type: "work",
    description: [
      "Tutoring students from grades X to XII following NCERT curriculum.",
      "Personalized mentorship and problem-solving strategies."
    ]
  }
];

export const WORKSHOPS: Workshop[] = [
  {
    id: "mwa-2024",
    title: "MWA Project Meeting",
    role: "Session Chair",
    location: "EPFL, Switzerland",
    date: "August 2024"
  },
  {
    id: "ska-ch-2024",
    title: "SKA-CH Project Meeting",
    location: "Zurich University of Applied Sciences",
    date: "June 2024"
  },
  {
    id: "solar-2024",
    title: "Computational Solar Physics Workshop",
    location: "IIT Bhubaneswar",
    date: "January 2024",
    details: ["Hands-on with SunPy and PFSS.", "Predicted solar cycle maxima using Helioviewer."]
  },
  {
    id: "meerkat-2021",
    title: "MEERKAT Radio Astronomy Workshop",
    role: "Remote",
    location: "Swinburne University, Australia",
    date: "June 2021",
    details: ["Radio data analysis from MEERKAT.", "Advanced Linux scripting and R programming."]
  }
];

export const POSITIONS: Position[] = [
  { id: "placement", role: "Placement Coordinator", organization: "Physics Dept, IISERB", period: "2024" },
  { id: "sciastra", role: "Campus Ambassador", organization: "SciAstra", period: "2023-24" },
  { id: "sec", role: "Science Council Secretary", organization: "IISERB", period: "2022-23" },
  { id: "singularity-conv", role: "Convenor", organization: "Singularity (Science Fest)", period: "2022" },
  { id: "council-core", role: "Science Council Core Committee", organization: "IISERB", period: "2020-21" },
  { id: "astro-club", role: "Core Committee Member", organization: "Astronomy Club", period: "2021-22" },
  { id: "physics-club", role: "Core Committee Member", organization: "Physics Club", period: "2021-22" },
  { id: "peer", role: "Peer Counsellor", organization: "IISERB", period: "2021-22" },
];

export const SKILLS: SkillCategory[] = [
  {
    category: "Languages",
    skills: ["Python", "Wolfram", "LaTeX", "C", "MATLAB", "TypeScript", "SQL"]
  },
  {
    category: "Software & Tools",
    skills: ["Mathematica", "CASA", "TOPCAT", "Vite", "React 19", "Tailwind", "Linux"]
  },
  {
    category: "Scientific Libraries",
    skills: [
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Astropy",
      "Gammapy",
      "Scipy",
      "Scikit-learn",
      "Tensorflow",
      "Keras",
      "Pytorch"
    ]
  },
  {
    category: "Core Physics",
    skills: ["Quantum Mechanics", "Electromagnetism", "Astrophysics", "Statistical Mechanics", "Particle Physics", "Non-Linear Dynamics"]
  },
  {
    category: "Domain Specific",
    skills: ["Spectral Analysis", "Radio Image Deconvolution", "Machine Learning", "Deep Learning in Astronomy", "Model Benchmarking", "CSV/Pipeline Dev", "Interferometry"]
  }
];

export const PROJECTS: Project[] = [
    {
        id: "cosmoscope",
        title: "CosmoScope SDSS Research",
        year: "2025",
        description: "A specialized React-based web app for astronomical research on BAL Quasars using SDSS data. Features a custom simulation engine for Multi-Epoch Generation (MJD 52000–59000) and Physics Simulation of Power Law continuum with Gaussian/Lorentzian lines. Integrated with Gemini 2.5 Flash to act as an AI Advisor for detailed spectral analysis (Equivalent Width, Outflow Velocity) and publication potential evaluation. Includes a 'SkyViewer' utilizing SDSS SkyServer for target acquisition.",
        tech: ["React 19", "SDSS SkyServer", "Gemini 2.5", "Physics Simulation", "Recharts"],
        link: "https://github.com/roshanm20"
    },
    {
        id: "autobal-ai",
        title: "Autobal.AI Spectroscopy Suite",
        year: "2025",
        description: "Research-grade reduction pipeline for Broad Absorption Line Quasars (BALQSO). Implements a rigorous astrophysical pipeline including Savitzky-Golay filtering, continuum normalization (Power-law model), and automated metric extraction (EW, Centroid Velocity, Spectral Index). Features an AI Analyst chatbot (Gemini 2.5 Flash) that interprets derived metrics in real-time. Visualizes correlations like Flux vs. EW and supports FITS file ingestion or synthetic data generation.",
        tech: ["React 19", "Gemini 2.5 Flash", "Savitzky-Golay", "Tailwind", "Data Vis"],
        link: "https://github.com/roshanm20"
    },
  {
    id: "stellar-lens",
    title: "STELLAR-LENS",
    year: "2025",
    description: "A multimodal scientific dashboard modeling accretion dynamics of YSOs. Features a custom real-time physics engine (60fps) and an embedded AI Astrophysicist (Gemini 2.5) that provides live, context-aware interpretation of simulation data with verified citations.",
    tech: ["React 19", "Gemini 2.5", "Physics Engine", "Recharts", "Tailwind"],
    link: "https://github.com/roshanm20"
  },
  {
    id: "yso-latent",
    title: "YSO Latent Explorer",
    year: "2025",
    description: "AI-driven dashboard bridging raw astronomical time-series data and physical interpretation. Visualizes high-dimensional latent spaces and utilizes Gemini 2.5 Flash (Reasoning Engine) with RAG to classify anomalies and identify physical mechanisms from light curves.",
    tech: ["React 19", "TypeScript", "Gemini 2.5 Flash", "RAG", "Recharts"],
    link: "https://github.com/roshanm20"
  }
];

export const AWARDS: Award[] = [
  { id: "thinkswiss", title: "ThinkSwiss Research Scholarship: Asia Pacific", organization: "SERI / Swissnex", year: "2024" },
  { id: "internship", title: "Selected for Summer Internship", organization: "Instituto de astrofísica (Porto, Portugal)", year: "2023" },
  { id: "nius-18.2", title: "Selected for NIUS (Physics) 18.2", organization: "HBCSE, TIFR-Mumbai", year: "2023" },
  { id: "astro-group", title: "Selected for Astronomy Research Group", organization: "IISER Bhopal", year: "2023" },
  { id: "vijyoshi", title: "VIJYOSHI National Science Camp", organization: "IISC Bengaluru", year: "2020" },
  { id: "nius-18.1", title: "Selected for NIUS (Physics) 18.1", organization: "HBCSE, TIFR-Mumbai", year: "2020" },
  { id: "dst", title: "DST Inspire Fellowship", organization: "DST, Govt of India", year: "2020" },
  { id: "topper", title: "Revenue District Topper (Class XII)", organization: "Kerala Board", year: "2020" },
  { id: "iisf", title: "Indian International Science Festival", organization: "NBRI, Lucknow", year: "2018" },
  { id: "kerala-congress", title: "Kerala Science Congress", organization: "Calicut", year: "2017" }
];