document.addEventListener("DOMContentLoaded", () => {
  // ================= MOBILE NAV TOGGLING =================
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      mainNav.classList.toggle("open");
    });
  }

  // ================= AUTO YEAR IN FOOTER =================
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // =======================================================
  // ================ GREEN SKILL UPDATES ==================
  // =======================================================
  const updatesData = [
    {
      id: "unccelearn-climate-change-learning-action",
      title: "Climate Change: From Learning to Action",
      provider: "UN CC:Learn",
      description:
        "A comprehensive introduction to climate change science, impacts, international frameworks, and actions individuals and organisations can take.",
      level: "Beginner",
      duration: "2 – 4 hours",
      format: "Self-paced online",
      sector: "carbon",
      trainingType: "online-course",
      priceType: "Free",
      typeLabel: "Online Course",
      link: "https://unccelearn.org/course/view.php?id=48",
      ctaText: "View course →",
      tags: ["Climate", "UN", "Beginner", "Free"]
    },
    {
      id: "coursera-climate-change-mitigation",
      title: "Climate Change Mitigation in Developing Countries",
      provider: "University of Cape Town (Coursera)",
      description:
        "Learn about climate change mitigation strategies, policy approaches, and the role of developing countries in reducing emissions.",
      level: "Intermediate",
      duration: "6 weeks",
      format: "Self-paced online",
      sector: "carbon",
      trainingType: "online-course",
      priceType: "Free / Paid Certificate",
      typeLabel: "Online Course",
      link: "https://www.coursera.org/learn/climate-change-mitigation",
      ctaText: "View course →",
      tags: ["Climate", "Policy", "Mitigation", "MOOC"]
    },
    {
      id: "edx-sustainable-energy",
      title: "Sustainable Energy",
      provider: "Delft University of Technology (edX)",
      description:
        "Understand the fundamentals of renewable energy technologies, energy systems, and sustainable energy transitions.",
      level: "Intermediate",
      duration: "10 weeks",
      format: "Self-paced online",
      sector: "energy",
      trainingType: "online-course",
      priceType: "Free / Paid Certificate",
      typeLabel: "Online Course",
      link: "https://www.edx.org/learn/sustainable-energy/delft-university-of-technology-sustainable-energy-design-a-renewable-future",
      ctaText: "View course →",
      tags: ["Energy", "Renewables", "Engineering", "MOOC"]
    },
	{
  id: "embodied-carbon-video-training",
  title: "Embodied Carbon Video Training Series",
  provider: "Carbon Leadership Forum",
  description:
    "Training modules covering embodied carbon fundamentals, life cycle assessment (LCA), environmental product declarations (EPDs), and whole-building life-cycle assessment.",
  level: "Intermediate",
  duration: "Self-paced",
  format: "Online",
  sector: "carbon",
  trainingType: "online-course",
  priceType: "Free",
  typeLabel: "Online Course",
  link: "https://carbonleadershipforum.org/embodied-carbon-video-training-series/",
  ctaText: "View course →",
  tags: ["Embodied Carbon", "Construction", "LCA"]
},
    {
      id: "gri-academy-sustainability-reporting",
      title: "GRI Sustainability Reporting Standards Course",
      provider: "GRI Academy",
      description:
        "Professional training on sustainability reporting using the Global Reporting Initiative standards and ESG disclosure frameworks.",
      level: "Intermediate",
      duration: "4 – 6 hours",
      format: "Self-paced online",
      sector: "climate-finance",
      trainingType: "certification-course",
      priceType: "Paid",
      typeLabel: "Certification Course",
      link: "https://www.globalreporting.org/academy/courses/",
      ctaText: "Explore training →",
      tags: ["ESG", "Reporting", "GRI", "Professional"]
    },
    {
      id: "edge-green-buildings-online-training",
      title: "EDGE Green Buildings Online Training",
      provider: "IFC EDGE",
      description:
        "Training program covering green building design, energy efficiency, water savings, and materials optimisation using the EDGE certification system.",
      level: "Intermediate",
      duration: "Self-paced",
      format: "Online",
      sector: "built-environment",
      trainingType: "certification-training",
      priceType: "Paid",
      typeLabel: "Certification Training",
      link: "https://edgebuildings.com/training/",
      ctaText: "View program →",
      tags: ["EDGE", "Green Buildings", "Energy Efficiency", "Certification"]
    },
	{
  id: "global-energy-climate-policy",
  title: "Global Energy and Climate Policy",
  provider: "SOAS University of London (Coursera)",
  description:
    "Learn how climate and energy policies are designed and analyzed globally, including the transition to low-carbon energy systems.",
  level: "Intermediate",
  duration: "6 weeks",
  format: "Online",
  sector: "digital",
  trainingType: "online-course",
  priceType: "Free / Paid Certificate",
  typeLabel: "Online Course",
  link: "https://www.coursera.org/learn/globalenergyandclimatepolicy",
  ctaText: "View course →",
  tags: ["Climate Policy", "Energy", "Data Analysis"]
},
{
  id: "mitx-sustainable-energy",
  title: "Sustainable Energy",
  provider: "MITx (edX)",
  description:
    "Study renewable energy technologies and global energy systems while evaluating the transition to a sustainable energy future.",
  level: "Advanced",
  duration: "4 months",
  format: "Online",
  sector: "energy",
  trainingType: "online-course",
  priceType: "Paid / Audit Available",
  typeLabel: "Online Course",
  link: "https://www.edx.org/learn/sustainable-energy/massachusetts-institute-of-technology-sustainable-energy",
  ctaText: "View course →",
  tags: ["Energy Systems", "Climate", "Renewables"]
},
{
  id: "ashrae-hvac-design-level-1",
  title: "HVAC Design: Level I – Essentials",
  provider: "ASHRAE Learning Institute",
  description:
    "Practical training covering HVAC system fundamentals, equipment, load calculations, and building performance.",
  level: "Intermediate",
  duration: "18 hours",
  format: "Online / Instructor-led",
  sector: "energy",
  trainingType: "professional-course",
  priceType: "Paid",
  typeLabel: "Professional Course",
  link: "https://www.ashrae.org/professional-development/all-instructor-led-training/catalog-of-instructor-led-training/hvac-design-level-i-essentials-18-hour",
  ctaText: "View program →",
  tags: ["HVAC", "Energy Efficiency", "Building Systems"]
},
{
  id: "esg-data-accountability",
  title: "ESG Data and Accountability",
  provider: "Coursera",
  description:
    "Learn how to analyze ESG datasets, interpret sustainability disclosures, and use data-driven tools to evaluate corporate sustainability performance.",
  level: "Intermediate",
  duration: "Self-paced",
  format: "Online",
  sector: "digital",
  trainingType: "online-course",
  priceType: "Free / Paid Certificate",
  typeLabel: "Online Course",
  link: "https://www.coursera.org/learn/esg-data-and-accountability",
  ctaText: "View course →",
  tags: ["ESG Data", "Analytics", "Sustainability"]
},
{
  id: "iesve-on-demand-learning",
  title: "IESVE On-Demand Learning – Building Performance & Energy Modelling",
  provider: "Integrated Environmental Solutions (IES)",
  description:
    "Professional training on building performance modelling, energy simulation, HVAC modelling, daylight analysis, and sustainable building design using IESVE software.",
  level: "Beginner – Advanced",
  duration: "Self-paced",
  format: "Online",
  sector: "built-environment",
  trainingType: "professional-course",
  priceType: "Free / Paid Modules",
  typeLabel: "Professional Training",
  link: "https://www.iesve.com/training/on-demand-learning",
  ctaText: "View training →",
  tags: ["Energy Modelling", "HVAC", "Building Simulation"]
},
{
  id: "ibpsa-building-simulation-training",
  title: "Building Performance Simulation Training",
  provider: "IBPSA (International Building Performance Simulation Association)",
  description:
    "Professional education resources on building energy modelling, simulation techniques, and performance analysis.",
  level: "Intermediate",
  duration: "Varies",
  format: "Online / Workshops",
  sector: "built-environment",
  trainingType: "professional-course",
  priceType: "Free / Paid",
  typeLabel: "Professional Training",
  link: "https://ibpsa.org/education/",
  ctaText: "View training →",
  tags: ["Energy Modelling", "Simulation", "Buildings"]
},
{
  id: "autodesk-sustainability-training",
  title: "Autodesk Sustainability & Building Performance Training",
  provider: "Autodesk",
  description:
    "Training on building performance analysis, sustainable design strategies, and energy modelling using Autodesk tools.",
  level: "Beginner – Intermediate",
  duration: "Self-paced",
  format: "Online",
  sector: "built-environment",
  trainingType: "online-course",
  priceType: "Free",
  typeLabel: "Online Course",
  link: "https://www.autodesk.com/learning",
  ctaText: "View training →",
  tags: ["Sustainable Design", "Energy Modelling", "BIM"]
},
{
  id: "iesve-getting-started",
  title: "Getting Started with IESVE",
  provider: "Integrated Environmental Solutions (IES)",
  description:
    "Introduction to IESVE building performance modelling software covering energy simulation, airflow, daylight, and HVAC analysis.",
  level: "Beginner",
  duration: "Self-paced",
  format: "Online",
  sector: "built-environment",
  trainingType: "online-course",
  priceType: "Free",
  typeLabel: "Online Course",
  link: "https://distance-learning.iesve.com/p/getting-started",
  ctaText: "View course →",
  tags: ["Energy Modelling", "HVAC", "Building Performance"]
},
{
  id: "energyplus-training",
  title: "EnergyPlus Building Energy Modelling Training",
  provider: "U.S. Department of Energy",
  description:
    "Official training resources for EnergyPlus software used to model building energy consumption, HVAC systems, and thermal performance.",
  level: "Advanced",
  duration: "Self-paced",
  format: "Online",
  sector: "built-environment",
  trainingType: "professional-course",
  priceType: "Free",
  typeLabel: "Professional Training",
  link: "https://energyplus.net/training",
  ctaText: "View training →",
  tags: ["EnergyPlus", "Energy Modelling", "HVAC"]
},
{
  id: "breeam-associate-training",
  title: "BREEAM Associate Training",
  provider: "BRE Academy",
  description:
    "Learn the BREEAM sustainability assessment framework for green buildings.",
  level: "Intermediate",
  duration: "Self-paced",
  format: "Online",
  sector: "built-environment",
  trainingType: "certification-training",
  priceType: "Paid",
  typeLabel: "Certification Training",
  link: "https://www.bregroup.com/products/breeam/breeam-associate/",
  ctaText: "View training →",
  tags: ["Green Buildings", "BREEAM"]
},
{
  id: "circular-economy-ellen-macarthur",
  title: "Circular Economy: An Introduction",
  provider: "Ellen MacArthur Foundation",
  description:
    "Learn the principles of circular economy and sustainable production systems.",
  level: "Beginner",
  duration: "Self-paced",
  format: "Online",
  sector: "circular-economy",
  trainingType: "online-course",
  priceType: "Free",
  typeLabel: "Online Course",
  link: "https://ellenmacarthurfoundation.org/resources/learn/circular-economy-introduction",
  ctaText: "View course →",
  tags: ["Circular Economy", "Sustainability"]
},
{
  id: "data-science-sustainability",
  title: "Data Science for Environmental Sustainability",
  provider: "University of London (Coursera)",
  description:
    "Learn data analytics techniques to analyze environmental and sustainability datasets.",
  level: "Intermediate",
  duration: "6 weeks",
  format: "Online",
  sector: "digital",
  trainingType: "online-course",
  priceType: "Free / Paid Certificate",
  typeLabel: "Online Course",
  link: "https://www.coursera.org/learn/data-science-for-environmental-sustainability",
  ctaText: "View course →",
  tags: ["Data", "Analytics"]
},
{
  id: "cambridge-sustainable-finance",
  title: "Sustainable Finance",
  provider: "University of Cambridge (edX)",
  description:
    "Learn how finance can support climate solutions, ESG integration, and sustainable investment strategies.",
  level: "Intermediate",
  duration: "6 weeks",
  format: "Online",
  sector: "climate-finance",
  trainingType: "online-course",
  priceType: "Paid",
  typeLabel: "Online Course",
  link: "https://www.edx.org/learn/sustainable-finance/university-of-cambridge-sustainable-finance",
  ctaText: "View course →",
  tags: ["ESG", "Finance"]
},
{
  id: "well-ap-training",
  title: "WELL Accredited Professional Training",
  provider: "International WELL Building Institute",
  description:
    "Training on the WELL Building Standard focusing on human health and sustainable building design.",
  level: "Intermediate",
  duration: "Self-paced",
  format: "Online",
  sector: "built-environment",
  trainingType: "certification-training",
  priceType: "Paid",
  typeLabel: "Certification Training",
  link: "https://www.wellcertified.com/",
  ctaText: "View program →",
  tags: ["WELL", "Healthy Buildings"]
},
{
  id: "designbuilder-training",
  title: "DesignBuilder Energy Modelling Training",
  provider: "DesignBuilder",
  description:
    "Training on building energy simulation, daylight modelling, HVAC analysis, and carbon performance using DesignBuilder software.",
  level: "Intermediate",
  duration: "Self-paced / Workshops",
  format: "Online",
  sector: "built-environment",
  trainingType: "professional-course",
  priceType: "Paid",
  typeLabel: "Professional Training",
  link: "https://designbuilder.co.uk/training",
  ctaText: "View training →",
  tags: ["Energy Modelling", "Simulation", "Buildings"]
},
{
  id: "ed4s-esg-training",
  title: "ESG & Sustainability Training Courses",
  provider: "ED4S (Education for Sustainability)",
  description:
    "A collection of ESG and sustainability courses including ESG fundamentals, climate risk, sustainable finance, and responsible investing.",
  level: "Beginner – Intermediate",
  duration: "Self-paced",
  format: "Online",
  sector: "esg",
  trainingType: "certification-training",
  priceType: "Free / Paid",
  typeLabel: "Professional Training",
  link: "https://www.ed4s.org/courses-for-individuals",
  ctaText: "View training →",
  tags: ["ESG", "Sustainable Finance", "Climate Risk"]
},
{
  id: "ed4s-esg-9-weeks",
  title: "ESG in 9 Weeks",
  provider: "ED4S Academy",
  description:
    "A comprehensive self-paced program covering ESG fundamentals, sustainability reporting frameworks, and how ESG is applied in business and investing.",
  level: "Beginner",
  duration: "9 weeks (≈80 hours)",
  format: "Online",
  sector: "esg",
  trainingType: "online-course",
  priceType: "Free / Paid Certificate",
  typeLabel: "Online Course",
  link: "https://learn.ed4s.org/courses/esg-9-weeks",
  ctaText: "View course →",
  tags: ["ESG", "Sustainability", "Responsible Investing"]
},
{
  id: "cfi-greenhouse-gas-accounting",
  title: "Greenhouse Gas Accounting",
  provider: "Corporate Finance Institute",
  description:
    "Learn the fundamentals of carbon accounting including Scope 1, Scope 2, and Scope 3 emissions reporting and sustainability disclosures.",
  level: "Beginner",
  duration: "3 – 6 hours",
  format: "Online",
  sector: "carbon",
  trainingType: "online-course",
  priceType: "Paid",
  typeLabel: "Online Course",
  link: "https://corporatefinanceinstitute.com/course/greenhouse-gas-accounting/",
  ctaText: "View course →",
  tags: ["Carbon Accounting", "GHG", "ESG"]
},
{
  id: "oneclick-lca-training",
  title: "One Click LCA Training for Embodied Carbon and Life Cycle Assessment",
  provider: "One Click LCA",
  description:
    "Official training on One Click LCA software covering embodied carbon calculations, whole-building life-cycle assessment, and sustainability reporting for construction projects.",
  level: "Intermediate",
  duration: "Self-paced / Webinars",
  format: "Online",
  sector: "built-environment",
  trainingType: "professional-course",
  priceType: "Free / Paid",
  typeLabel: "Professional Training",
  link: "https://oneclicklca.com/en/resources/training",
  ctaText: "View training →",
  tags: ["Embodied Carbon", "LCA", "Construction"]
},
{
  id: "carbon-accounting-mastery",
  title: "Carbon Accounting Mastery",
  provider: "FutureSkills Prime",
  description:
    "Comprehensive course covering GHG Protocol scopes, emissions boundaries, carbon accounting tools, and sustainability reporting.",
  level: "Intermediate",
  duration: "Self-paced",
  format: "Online",
  sector: "carbon",
  trainingType: "online-course",
  priceType: "Free",
  typeLabel: "Online Course",
  link: "https://www.futureskillsprime.in/pathways/carbon-accounting-mastery-from-ghg-protocol-to-assurance-ready-reporting/",
  ctaText: "View course →",
  tags: ["Carbon Accounting", "GHG Protocol"]
},
{
  id: "world-bank-ghg-accounting",
  title: "GHG Accounting 101",
  provider: "World Bank",
  description:
    "Introduction to greenhouse gas accounting concepts and emissions analysis frameworks used in international climate projects.",
  level: "Beginner",
  duration: "Self-paced",
  format: "Online",
  sector: "carbon",
  trainingType: "online-course",
  priceType: "Free",
  typeLabel: "Online Course",
  link: "https://www.worldbank.org/en/olc/course/39857",
  ctaText: "View course →",
  tags: ["Carbon Accounting", "GHG", "Climate"]
},
{
  id: "esg-institute-training",
  title: "ESG & Sustainability Professional Training",
  provider: "The ESG Institute",
  description:
    "Professional ESG training programs covering sustainability reporting, carbon markets, sustainable finance, ESG strategy, and sustainable technology.",
  level: "Beginner – Advanced",
  duration: "Self-paced",
  format: "Online",
  sector: "esg",
  trainingType: "certification-training",
  priceType: "Paid / Some Free Programs",
  typeLabel: "Professional Training",
  link: "https://www.the-esg-institute.org/training",
  ctaText: "View training →",
  tags: ["ESG", "Sustainability Reporting", "Climate Finance"]
},
    {
      id: "futurelearn-sustainable-cities",
      title: "Sustainable Cities: Governing Urban Adaptation Under Climate Change",
      provider: "University of Groningen (FutureLearn)",
      description:
        "Discover governance strategies for preparing urban areas to face climate change and adaptation challenges.",
      level: "Beginner – Intermediate",
      duration: "3 weeks",
      format: "Online",
      sector: "cities",
      trainingType: "online-course",
      priceType: "Free / Paid Upgrade",
      typeLabel: "Online Course",
      link: "https://www.futurelearn.com/courses/governing-urban-adaptation",
      ctaText: "View course →",
      tags: ["Urban", "Sustainability", "Cities", "Planning"]
    },
    {
      id: "leed-green-associate",
      title: "LEED Green Associate Exam Preparation",
      provider: "US Green Building Council",
      description:
        "Foundational credential covering green building principles, sustainability strategies, and the LEED rating system.",
      level: "Intermediate",
      duration: "Self-paced",
      format: "Online",
      sector: "built-environment",
      trainingType: "certification-training",
      priceType: "Paid",
      typeLabel: "Certification Training",
      link: "https://www.usgbc.org/credentials/leed-green-associate",
      ctaText: "View program →",
      tags: ["LEED", "Green Building", "Certification"]
    },
    {
      id: "edge-expert-training",
      title: "EDGE Expert Training",
      provider: "IFC EDGE",
      description:
        "Professional training to become an EDGE Expert and support energy, water, and material efficiency in buildings.",
      level: "Intermediate",
      duration: "Self-paced",
      format: "Online",
      sector: "built-environment",
      trainingType: "certification-training",
      priceType: "Paid",
      typeLabel: "Certification Training",
      link: "https://edgebuildings.com/training/",
      ctaText: "View program →",
      tags: ["EDGE", "Green Buildings", "Energy Efficiency"]
    },
    {
      id: "circular-economy-introduction",
      title: "Circular Economy: An Introduction",
      provider: "Delft University of Technology (edX)",
      description:
        "Learn circular economy strategies and how businesses transition from linear to regenerative economic models.",
      level: "Beginner",
      duration: "4 weeks",
      format: "Online",
      sector: "circular-economy",
      trainingType: "online-course",
      priceType: "Free / Paid Certificate",
      typeLabel: "Online Course",
      link: "https://www.edx.org/learn/circular-economy/delft-university-of-technology-circular-economy-an-introduction",
      ctaText: "View course →",
      tags: ["Circular Economy", "Sustainability", "Resources"]
    },
    {
      id: "solar-energy-basics",
      title: "Solar Energy Basics",
      provider: "The State University of New York (Coursera)",
      description:
        "Introduction to photovoltaic systems, solar technologies, and the fundamentals of solar power generation.",
      level: "Beginner",
      duration: "4 weeks",
      format: "Online",
      sector: "energy",
      trainingType: "online-course",
      priceType: "Free / Paid Certificate",
      typeLabel: "Online Course",
      link: "https://www.coursera.org/learn/solar-energy-basics",
      ctaText: "View course →",
      tags: ["Solar", "Energy", "Renewables"]
    },
    {
      id: "sustainable-food-systems",
      title: "Sustainable Food Systems",
      provider: "Université de Montréal (edX)",
      description:
        "Explore the role, challenges, and potential of sustainable food systems in ensuring food security, human health, and planetary health.",
      level: "Beginner",
      duration: "6 weeks",
      format: "Self-paced online",
      sector: "agriculture",
      trainingType: "online-course",
      priceType: "Free / Paid Certificate",
      typeLabel: "Online Course",
      link: "https://www.edx.org/learn/food-nutrition/universite-de-montreal-sustainable-food-systems",
      ctaText: "View course →",
      tags: ["Agriculture", "Food", "Sustainability"]
    },
    {
      id: "climate-challenges-solutions",
      title: "Climate Change: Challenges and Solutions",
      provider: "University of Exeter (FutureLearn)",
      description:
        "Understand the causes of climate change and explore practical solutions in energy, policy, and technology.",
      level: "Beginner",
      duration: "8 weeks",
      format: "Online",
      sector: "carbon",
      trainingType: "online-course",
      priceType: "Free / Paid Upgrade",
      typeLabel: "Online Course",
      link: "https://www.futurelearn.com/courses/climate-change-challenges-and-solutions",
      ctaText: "View course →",
      tags: ["Climate", "Solutions", "Sustainability"]
    },
	
	{
  id: "coursera-introduction-to-sustainability",
  title: "Introduction to Sustainability",
  provider: "University of Illinois (Coursera)",
  description:
    "Learn the foundations of sustainability including ecosystems, global change, energy systems, agriculture, water, and environmental policy.",
  level: "Beginner",
  duration: "8 weeks",
  format: "Online",
  sector: "environment",
  trainingType: "online-course",
  priceType: "Free / Paid Certificate",
  typeLabel: "Online Course",
  link: "https://www.coursera.org/learn/sustainability",
  ctaText: "View course →",
  tags: ["Sustainability", "Environment", "Policy"]
},

{
  id: "coursera-global-warming-science",
  title: "Global Warming I: The Science and Modeling of Climate Change",
  provider: "University of Chicago (Coursera)",
  description:
    "Understand the science behind global warming and how climate systems are modeled and predicted.",
  level: "Beginner",
  duration: "12 modules",
  format: "Online",
  sector: "carbon",
  trainingType: "online-course",
  priceType: "Free / Paid Certificate",
  typeLabel: "Online Course",
  link: "https://www.coursera.org/learn/global-warming",
  ctaText: "View course →",
  tags: ["Climate", "Science", "Climate Modeling"]
},

{
  id: "coursera-climate-resilience-urban",
  title: "Climate Resilience and Urban Sustainability",
  provider: "University of Colorado Boulder (Coursera)",
  description:
    "Learn how cities can build resilience against climate change using sustainable planning and urban development strategies.",
  level: "Intermediate",
  duration: "5 modules",
  format: "Online",
  sector: "cities",
  trainingType: "online-course",
  priceType: "Free / Paid Certificate",
  typeLabel: "Online Course",
  link: "https://www.coursera.org/learn/climate-resilience-and-urban-sustainability",
  ctaText: "View course →",
  tags: ["Urban Sustainability", "Cities", "Climate"]
},

{
  id: "coursera-planning-climate-change",
  title: "Planning with Climate Change in Mind",
  provider: "University of Michigan (Coursera)",
  description:
    "Explore how climate risks affect sectors such as water, agriculture, health, and infrastructure and how planners can respond.",
  level: "Intermediate",
  duration: "3 modules",
  format: "Online",
  sector: "cities",
  trainingType: "online-course",
  priceType: "Free / Paid Certificate",
  typeLabel: "Online Course",
  link: "https://www.coursera.org/learn/planning-with-climate-change-in-mind",
  ctaText: "View course →",
  tags: ["Planning", "Climate Adaptation", "Cities"]
},

{
  id: "coursera-climate-change-public-health",
  title: "Climate Change, Sustainability and Global Public Health",
  provider: "University of Michigan (Coursera)",
  description:
    "Explore how climate change impacts human health and how sustainability frameworks can help address global environmental challenges.",
  level: "Intermediate",
  duration: "5 weeks",
  format: "Online",
  sector: "environment",
  trainingType: "online-course",
  priceType: "Free / Paid Certificate",
  typeLabel: "Online Course",
  link: "https://www.coursera.org/learn/climate-change-sustainability-and-global-public-health",
  ctaText: "View course →",
  tags: ["Climate", "Health", "Sustainability"]
},

{
  id: "coursera-esg-and-climate-change",
  title: "ESG and Climate Change",
  provider: "Coursera",
  description:
    "Understand how climate change affects financial markets, ESG disclosures, and business decision-making.",
  level: "Intermediate",
  duration: "4 modules",
  format: "Online",
  sector: "climate-finance",
  trainingType: "online-course",
  priceType: "Free / Paid Certificate",
  typeLabel: "Online Course",
  link: "https://www.coursera.org/learn/esg-and-climate-change",
  ctaText: "View course →",
  tags: ["ESG", "Finance", "Climate"]
},
{
  id: "edx-incorporating-renewables-grid",
  title: "Incorporating Renewable Energy in Electricity Grids",
  provider: "Imperial College London (edX)",
  description:
    "Learn how electricity systems integrate renewable energy technologies while maintaining reliability and cost efficiency.",
  level: "Intermediate",
  duration: "6 weeks",
  format: "Self-paced online",
  sector: "energy",
  trainingType: "online-course",
  priceType: "Free / Paid Certificate",
  typeLabel: "Online Course",
  link: "https://www.edx.org/learn/renewable-energy/imperial-college-london-incorporating-renewable-energy-in-electricity-grids",
  ctaText: "View course →",
  tags: ["Energy", "Electricity Grid", "Renewables"]
},

{
  id: "ghg-management-corporate",
  title: "Greenhouse Gas Accounting and Reporting",
  provider: "GHG Management Institute",
  description:
    "Professional training on carbon accounting, emissions inventories, and Scope 1, 2, and 3 reporting.",
  level: "Intermediate",
  duration: "Self-paced",
  format: "Online",
  sector: "carbon",
  trainingType: "certification-course",
  priceType: "Paid",
  typeLabel: "Certification Course",
  link: "https://ghginstitute.org",
  ctaText: "View program →",
  tags: ["Carbon Accounting", "GHG", "ESG"]
},
{
  id: "corporate-climate-action",
  title: "Corporate Climate Action: Net Zero Strategies",
  provider: "edX",
  description:
    "Learn how companies measure emissions, set science-based targets, and implement decarbonisation strategies.",
  level: "Intermediate",
  duration: "6 weeks",
  format: "Online",
  sector: "carbon",
  trainingType: "online-course",
  priceType: "Paid / Audit option",
  typeLabel: "Online Course",
  link: "https://www.edx.org",
  ctaText: "View course →",
  tags: ["Carbon Accounting", "Net Zero", "Climate"]
},
{
	
  id: "building-energy-systems-engineering",
  title: "Building Energy Systems Engineering",
  provider: "University of Colorado Boulder (Coursera)",
  description:
    "Advanced program covering HVAC systems, energy modelling, building energy systems design, and energy efficiency strategies.",
  level: "Advanced",
  duration: "3 – 6 months",
  format: "Online",
  sector: "built-environment",
  trainingType: "professional-certificate",
  priceType: "Paid / Financial Aid Available",
  typeLabel: "Professional Certificate",
  link: "https://www.coursera.org/specializations/building-energy-systems",
  ctaText: "View program →",
  tags: ["Energy Modelling", "HVAC", "Buildings"]
},
{
  id: "engineering-foundations-building-energy",
  title: "Engineering Foundations of Building Energy Systems",
  provider: "University of Colorado Boulder (Coursera)",
  description:
    "Learn psychrometrics, heat transfer, and building energy calculations used in building performance simulation.",
  level: "Advanced",
  duration: "5 weeks",
  format: "Online",
  sector: "built-environment",
  trainingType: "online-course",
  priceType: "Free / Paid Certificate",
  typeLabel: "Online Course",
  link: "https://www.coursera.org/learn/engineering-foundation-for-building-energy-systems",
  ctaText: "View course →",
  tags: ["Energy Modelling", "Buildings", "Simulation"]
},
{
  id: "edx-solar-energy-professional-certificate",
  title: "Solar Energy Professional Certificate",
  provider: "Delft University of Technology (edX)",
  description:
    "Professional certificate program covering solar cell technology and photovoltaic system design.",
  level: "Intermediate",
  duration: "Professional Certificate",
  format: "Online",
  sector: "energy",
  trainingType: "professional-certificate",
  priceType: "Paid",
  typeLabel: "Professional Certificate",
  link: "https://www.edx.org/certificates/professional-certificate/delftx-solar-energy",
  ctaText: "View program →",
  tags: ["Solar", "Energy", "Engineering"]
},
    {
      id: "climate-finance-fundamentals",
      title: "Introduction to Sustainable Finance",
      provider: "UN CC:Learn",
      description:
        "Learn the basics of sustainable finance, key instruments, methodologies, and frameworks for integrating sustainability into financial decisions.",
      level: "Beginner",
      duration: "2 hours",
      format: "Self-paced online",
      sector: "climate-finance",
      trainingType: "online-course",
      priceType: "Free",
      typeLabel: "Online Course",
      link: "https://unccelearn.org/course/view.php?id=139",
      ctaText: "View course →",
      tags: ["Climate Finance", "UN", "Sustainability"]
    },
    {
      id: "environmental-impact-assessment",
      title: "Environmental Impact Assessment",
      provider: "The University of Adelaide (FutureLearn)",
      description:
        "Learn the principles and methods used to assess environmental impacts of projects.",
      level: "Intermediate",
      duration: "4 weeks",
      format: "Online",
      sector: "environment",
      trainingType: "online-course",
      priceType: "Paid / Upgrade Available",
      typeLabel: "Online Course",
      link: "https://www.futurelearn.com/courses/environmental-impact-assessment",
      ctaText: "View course →",
      tags: ["EIA", "Environment", "Policy"]
    }
  ];

  const updatesPreviewGrid = document.getElementById("updatesPreviewGrid");
  const updatesGrid = document.getElementById("updatesGrid");
  const updatesPagination = document.getElementById("updatesPagination");
  const updatesSearchInput = document.getElementById("updatesSearch");
  const updatesSectorFilter = document.getElementById("updatesSectorFilter");
  const updatesTypeFilter = document.getElementById("updatesTypeFilter");

  function formatLabel(value) {
    return value
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  function renderUpdateCard(item) {
    const badgeClass = item.priceType === "Free" ? "badge-free" : "badge-paid";
    const tagsHtml =
      item.tags && item.tags.length
        ? `<div class="update-tags">
            ${item.tags
              .map((tag) => `<span class="update-tag-pill">${tag}</span>`)
              .join("")}
           </div>`
        : "";

    return `
      <article class="card update-card" data-sector="${item.sector}" data-type="${item.trainingType}">
        <div class="update-header">
          <span class="badge ${badgeClass}">${item.priceType}</span>
          <span class="update-category">${item.typeLabel}</span>
        </div>
        <h3>${item.title}</h3>
        <p class="update-provider">Offered by: ${item.provider}</p>
        <p>${item.description}</p>
        <ul class="update-meta-list">
          <li>Sector: ${formatLabel(item.sector)}</li>
          <li>Type: ${formatLabel(item.trainingType)}</li>
          <li>Level: ${item.level}</li>
          <li>Duration: ${item.duration}</li>
          <li>Format: ${item.format}</li>
        </ul>
        ${tagsHtml}
        <a href="${item.link}" class="card-link" target="_blank" rel="noopener">${item.ctaText}</a>
      </article>
    `;
  }

  // ================= HOMEPAGE UPDATES PREVIEW =================
  if (updatesPreviewGrid) {
    const previewItems = updatesData.slice(0, 4);
    updatesPreviewGrid.innerHTML = previewItems.map(renderUpdateCard).join("");
  }

  // ================= FULL UPDATES PAGE =================
  if (updatesGrid) {
    let currentSectorFilter = "all";
    let currentTypeFilter = "all";
    let currentSearch = "";
    let currentPage = 1;
    const pageSize = 6;

    function getFilteredUpdates() {
      const term = currentSearch.trim().toLowerCase();

      return updatesData.filter((item) => {
        if (currentSectorFilter !== "all" && item.sector !== currentSectorFilter) return false;
        if (currentTypeFilter !== "all" && item.trainingType !== currentTypeFilter) return false;
        if (!term) return true;

        const haystack = [
          item.title,
          item.provider,
          item.description,
          item.sector,
          item.trainingType,
          item.typeLabel,
          ...(item.tags || [])
        ]
          .join(" ")
          .toLowerCase();

        return haystack.includes(term);
      });
    }

    function renderUpdates() {
      const filtered = getFilteredUpdates();
      const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
      if (currentPage > totalPages) currentPage = totalPages;

      const startIndex = (currentPage - 1) * pageSize;
      const pageItems = filtered.slice(startIndex, startIndex + pageSize);

      if (!pageItems.length) {
        updatesGrid.innerHTML =
          '<p class="no-results">No opportunities match your search yet. Try clearing the search or changing your filters.</p>';
      } else {
        updatesGrid.innerHTML = pageItems.map(renderUpdateCard).join("");
      }

      if (updatesPagination) {
        updatesPagination.innerHTML = `
          <div class="pagination-inner">
            <button class="btn-page" data-dir="prev" ${currentPage === 1 ? "disabled" : ""}>
              Previous
            </button>
            <span class="pagination-info">
              Page ${currentPage} of ${totalPages}
            </span>
            <button class="btn-page" data-dir="next" ${
              currentPage === totalPages ? "disabled" : ""
            }>
              Next
            </button>
          </div>
        `;

        const pageButtons = updatesPagination.querySelectorAll(".btn-page");
        pageButtons.forEach((btn) => {
          btn.addEventListener("click", () => {
            const dir = btn.getAttribute("data-dir");

            if (dir === "prev" && currentPage > 1) {
              currentPage--;
            } else if (dir === "next" && currentPage < totalPages) {
              currentPage++;
            }

            renderUpdates();
          });
        });
      }
    }

    renderUpdates();

    if (updatesSectorFilter) {
      updatesSectorFilter.addEventListener("change", () => {
        currentSectorFilter = updatesSectorFilter.value || "all";
        currentPage = 1;
        renderUpdates();
      });
    }

    if (updatesTypeFilter) {
      updatesTypeFilter.addEventListener("change", () => {
        currentTypeFilter = updatesTypeFilter.value || "all";
        currentPage = 1;
        renderUpdates();
      });
    }

    if (updatesSearchInput) {
      updatesSearchInput.addEventListener("input", () => {
        currentSearch = updatesSearchInput.value;
        currentPage = 1;
        renderUpdates();
      });
    }
  }

  // =======================================================
  // =============== ARTICLES / PUBLICATIONS ===============
  // =======================================================
  const articlesData = [
    {
      id: "green-skill-revolution-sept-2025",
      title: "Green Skill Revolution: Building a Workforce for the Future",
      type: "Monthly Publication",
      description:
        "Edition 1 of the Green Skills series exploring global green talent demand, supply gaps, sectoral trends, and opportunities for workforce transformation.",
      period: "September 2025",
      link: "assets/pubs/green-skills-sept-2025.pdf",
      tags: ["Green Skills", "Workforce", "Sustainability", "Global Trends"],
      featured: true,
      category: "publication"
    },
    {
      id: "green-skills-global-priority-oct-2025",
      title: "Green Skills: The Global Priority for a Sustainable Future",
      type: "Monthly Publication",
      description:
        "Edition 2 of the Green Skills series with in-depth analysis of why green skills are essential, global demand vs supply, and the widening sustainability workforce gap.",
      period: "October 2025",
      link: "assets/pubs/green-skills-oct-2025.pdf",
      tags: ["Climate", "Green Economy", "Skills Gap", "Sustainability"],
      featured: true,
      category: "publication"
    },
    {
      id: "green-skills-global-outlook-2026",
      title: "Green Skills Global Outlook 2026",
      type: "Forthcoming Report",
      description:
        "A forthcoming review covering global sustainability skills, labour-market trends, and emerging climate-tech opportunities shaping the next decade.",
      period: "Coming Soon",
      link: "#",
      tags: ["Futures", "Forecast", "Global"],
      featured: false,
      category: "coming-soon"
    }
  ];

  const featuredArticlesGrid = document.getElementById("featuredArticlesGrid");
  const articlesGrid = document.getElementById("articlesGrid");
  const articlesSearchInput = document.getElementById("articlesSearch");
  const articlesFilterButtons = document.querySelectorAll("#articlesFilters .pill-filter");
  const articlesPagination = document.getElementById("articlesPagination");

  function renderArticleCard(item) {
    const isComingSoon = !item.link || item.link === "#";

    return `
      <article class="card article-card">
        <div class="card-tag">${item.type}</div>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <div class="card-meta">
          <span>${item.period}</span>
          <span>${isComingSoon ? "Report" : "PDF"}</span>
        </div>
        ${
          isComingSoon
            ? `<span class="card-link">Coming soon</span>`
            : `<a href="${item.link}" target="_blank" class="card-link">Open PDF →</a>`
        }
      </article>
    `;
  }

  // Homepage featured
  if (featuredArticlesGrid) {
    const featured = articlesData.filter((a) => a.featured).slice(0, 3);
    featuredArticlesGrid.innerHTML = featured.map(renderArticleCard).join("");
  }

  // Articles page
  if (articlesGrid) {
    let articleFilter = "all";
    let articleSearch = "";
    let articlePage = 1;
    const articlePageSize = 6;

    function getFilteredArticles() {
      const term = articleSearch.trim().toLowerCase();

      return articlesData.filter((item) => {
        if (articleFilter !== "all" && item.category !== articleFilter) return false;
        if (!term) return true;

        const haystack = [
          item.title,
          item.type,
          item.period,
          ...(item.tags || [])
        ]
          .join(" ")
          .toLowerCase();

        return haystack.includes(term);
      });
    }

    function renderArticles() {
      const filtered = getFilteredArticles();
      const totalPages = Math.max(1, Math.ceil(filtered.length / articlePageSize));
      if (articlePage > totalPages) articlePage = totalPages;

      const startIndex = (articlePage - 1) * articlePageSize;
      const pageItems = filtered.slice(startIndex, startIndex + articlePageSize);

      if (!pageItems.length) {
        articlesGrid.innerHTML =
          '<p class="no-results">No publications match your search yet. Try clearing the search or changing your filters.</p>';
      } else {
        articlesGrid.innerHTML = pageItems.map(renderArticleCard).join("");
      }

      if (articlesPagination) {
        articlesPagination.innerHTML = `
          <div class="pagination-inner">
            <button class="btn-page" data-dir="prev" ${articlePage === 1 ? "disabled" : ""}>
              Previous
            </button>
            <span class="pagination-info">
              Page ${articlePage} of ${totalPages}
            </span>
            <button class="btn-page" data-dir="next" ${
              articlePage === totalPages ? "disabled" : ""
            }>
              Next
            </button>
          </div>
        `;

        const pageButtons = articlesPagination.querySelectorAll(".btn-page");
        pageButtons.forEach((btn) => {
          btn.addEventListener("click", () => {
            const dir = btn.getAttribute("data-dir");

            if (dir === "prev" && articlePage > 1) {
              articlePage--;
            } else if (dir === "next" && articlePage < totalPages) {
              articlePage++;
            }

            renderArticles();
          });
        });
      }
    }

    renderArticles();

    if (articlesFilterButtons.length) {
      articlesFilterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          const filter = btn.getAttribute("data-filter") || "all";
          articleFilter = filter;
          articlePage = 1;

          articlesFilterButtons.forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");

          renderArticles();
        });
      });
    }

    if (articlesSearchInput) {
      articlesSearchInput.addEventListener("input", () => {
        articleSearch = articlesSearchInput.value;
        articlePage = 1;
        renderArticles();
      });
    }
  }

  // =======================================================
  // ================= RESOURCES / TOOLKITS =================
  // =======================================================
  const resourcesData = [
    {
      id: "green-skills-starter-guide",
      title: "Green Skills Starter Guide",
      description:
        "A high-level introduction to green skills, key sectors, and pathways for students, career switchers, and professionals.",
      format: "PDF",
      use: "Overview & orientation",
      category: "guide",
      link: "assets/resources/green-skills-starter-guide.pdf",
      tags: ["Green skills", "Introduction", "Guide"]
    },
    {
      id: "sustainability-career-roadmap",
      title: "Sustainability Career Roadmap Template",
      description:
        "A step-by-step roadmap template to help you plan your transition into a green or sustainability-focused career.",
      format: "PDF + Editable",
      use: "Career planning / mentoring",
      category: "template",
      link: "assets/resources/sustainability-career-roadmap.pdf",
      tags: ["Career", "Template", "Planning"]
    },
    {
      id: "green-skills-course-tracker",
      title: "Green Skills Course Tracker",
      description:
        "A simple tracker to record courses taken, certifications completed, and skills you are building over time.",
      format: "Spreadsheet / PDF",
      use: "Personal learning log",
      category: "tracker",
      link: "assets/resources/green-skills-course-tracker.xlsx",
      tags: ["Tracker", "Learning", "Courses"]
    }
  ];

  const resourcesGrid = document.getElementById("resourcesGrid");
  const resourcesSearchInput = document.getElementById("resourcesSearch");
  const resourcesFilterButtons = document.querySelectorAll("#resourcesFilters .pill-filter");
  const resourcesPagination = document.getElementById("resourcesPagination");

  function renderResourceCard(item) {
    return `
      <article class="card resource-card">
        <div class="resource-icon">${
          item.category === "guide" ? "📗" : item.category === "template" ? "🧭" : "📊"
        }</div>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <ul class="resource-meta-list">
          <li>Format: ${item.format}</li>
          <li>Use: ${item.use}</li>
        </ul>
        <a href="${item.link}" target="_blank" class="btn btn-sm btn-secondary">Download</a>
      </article>
    `;
  }

  if (resourcesGrid) {
    let resourcesFilter = "all";
    let resourcesSearch = "";
    let resourcesPage = 1;
    const resourcesPageSize = 9;

    function getFilteredResources() {
      const term = resourcesSearch.trim().toLowerCase();

      return resourcesData.filter((item) => {
        if (resourcesFilter !== "all" && item.category !== resourcesFilter) return false;
        if (!term) return true;

        const haystack = [item.title, item.description, item.format, item.use, ...(item.tags || [])]
          .join(" ")
          .toLowerCase();

        return haystack.includes(term);
      });
    }

    function renderResources() {
      const filtered = getFilteredResources();
      const totalPages = Math.max(1, Math.ceil(filtered.length / resourcesPageSize));
      if (resourcesPage > totalPages) resourcesPage = totalPages;

      const startIndex = (resourcesPage - 1) * resourcesPageSize;
      const pageItems = filtered.slice(startIndex, startIndex + resourcesPageSize);

      if (!pageItems.length) {
        resourcesGrid.innerHTML =
          '<p class="no-results">No resources match your search yet. Try clearing the search or changing your filters.</p>';
      } else {
        resourcesGrid.innerHTML = pageItems.map(renderResourceCard).join("");
      }

      if (resourcesPagination) {
        resourcesPagination.innerHTML = `
          <div class="pagination-inner">
            <button class="btn-page" data-dir="prev" ${resourcesPage === 1 ? "disabled" : ""}>
              Previous
            </button>
            <span class="pagination-info">
              Page ${resourcesPage} of ${totalPages}
            </span>
            <button class="btn-page" data-dir="next" ${
              resourcesPage === totalPages ? "disabled" : ""
            }>
              Next
            </button>
          </div>
        `;

        const pageButtons = resourcesPagination.querySelectorAll(".btn-page");
        pageButtons.forEach((btn) => {
          btn.addEventListener("click", () => {
            const dir = btn.getAttribute("data-dir");

            if (dir === "prev" && resourcesPage > 1) {
              resourcesPage--;
            } else if (dir === "next" && resourcesPage < totalPages) {
              resourcesPage++;
            }

            renderResources();
          });
        });
      }
    }

    renderResources();

    if (resourcesFilterButtons.length) {
      resourcesFilterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          const filter = btn.getAttribute("data-filter") || "all";
          resourcesFilter = filter;
          resourcesPage = 1;

          resourcesFilterButtons.forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");

          renderResources();
        });
      });
    }

    if (resourcesSearchInput) {
      resourcesSearchInput.addEventListener("input", () => {
        resourcesSearch = resourcesSearchInput.value;
        resourcesPage = 1;
        renderResources();
      });
    }
  }
});

// ============ DARK MODE TOGGLE ==============
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("themeToggle");
  const body = document.body;

  if (localStorage.getItem("gsh-theme") === "dark") {
    body.classList.add("dark-mode");
  }

  toggleBtn?.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("gsh-theme", "dark");
    } else {
      localStorage.setItem("gsh-theme", "light");
    }
  });
});