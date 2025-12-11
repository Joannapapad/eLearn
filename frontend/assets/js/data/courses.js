const COURSES = [
    {
      id: "101",
      title: "Introduction to Computer Science",
      category: "core",
      level: "beginner",
      credits: 6,
      semester: 1,
      prerequisites: [],
      description: "Overview of computing, problem solving and basic programming concepts."
    },
    {
      id: "102",
      title: "Mathematics for Computer Science",
      category: "mathematics",
      level: "beginner",
      credits: 6,
      semester: 1,
      prerequisites: [],
      description: "Logic, sets, combinatorics and discrete mathematics foundations."
    },
    {
      id: "103",
      title: "Introduction to Programming with Java",
      category: "programming",
      level: "beginner",
      credits: 6,
      semester: 2,
      prerequisites: ["Introduction to Computer Science"],
      description: "Java syntax, OOP, basic algorithms and program structuring."
    },
    {
      id: "104",
      title: "Linear Algebra",
      category: "mathematics",
      level: "beginner",
      credits: 5,
      semester: 2,
      prerequisites: [],
      description: "Vectors, matrices, linear transformations and applications in computing."
    },
    {
      id: "201",
      title: "Data Structures & Algorithms",
      category: "programming",
      level: "intermediate",
      credits: 6,
      semester: 3,
      prerequisites: ["Introduction to Programming with Java"],
      description: "Lists, trees, graphs, sorting, algorithm complexity and design techniques."
    },
    {
      id: "202",
      title: "Database Systems",
      category: "databases",
      level: "intermediate",
      credits: 6,
      semester: 3,
      prerequisites: ["Introduction to Programming with Java"],
      description: "Relational databases, SQL, schema design and normalization."
    },
    {
      id: "203",
      title: "Statistics & Probability",
      category: "mathematics",
      level: "intermediate",
      credits: 5,
      semester: 3,
      prerequisites: [],
      description: "Probability theory, distributions, inference and statistical modeling."
    },
    {
      id: "204",
      title: "Computer Architecture",
      category: "systems",
      level: "intermediate",
      credits: 6,
      semester: 3,
      prerequisites: ["Introduction to Computer Science"],
      description: "CPU organization, memory hierarchy, instruction cycles and assembly basics."
    },
    {
      id: "301",
      title: "Operating Systems",
      category: "systems",
      level: "intermediate",
      credits: 6,
      semester: 4,
      prerequisites: ["Data Structures & Algorithms"],
      description: "Processes, threads, memory management, scheduling and file systems."
    },
    {
      id: "302",
      title: "Algorithms & Complexity",
      category: "mathematics",
      level: "intermediate",
      credits: 6,
      semester: 4,
      prerequisites: ["Data Structures & Algorithms"],
      description: "Advanced algorithms, NP-completeness, dynamic programming and graph algorithms."
    },
    {
      id: "303",
      title: "Web Development",
      category: "engineering",
      level: "intermediate",
      credits: 5,
      semester: 4,
      prerequisites: ["Database Systems"],
      description: "Front-end and back-end fundamentals, HTTP, REST and web application design."
    },
    {
      id: "304",
      title: "Human-Computer Interaction",
      category: "design",
      level: "intermediate",
      credits: 4,
      semester: 4,
      prerequisites: [],
      description: "User-centered design, usability evaluation and UX principles."
    },
    {
      id: "401",
      title: "Computer Networks",
      category: "networks",
      level: "intermediate",
      credits: 6,
      semester: 5,
      prerequisites: ["Operating Systems"],
      description: "Network layers, routing, TCP/IP protocols, wireless and network applications."
    },
    {
      id: "402",
      title: "Software Engineering",
      category: "engineering",
      level: "intermediate",
      credits: 6,
      semester: 5,
      prerequisites: ["Web Development"],
      description: "Software lifecycle, agile methodologies, testing and design patterns."
    },
    {
      id: "403",
      title: "Distributed Systems",
      category: "systems",
      level: "advanced",
      credits: 6,
      semester: 5,
      prerequisites: ["Operating Systems", "Computer Networks"],
      description: "Distributed architectures, consensus algorithms, cloud computing and scalability."
    },
    {
      id: "404",
      title: "Information Security",
      category: "security",
      level: "intermediate",
      credits: 5,
      semester: 5,
      prerequisites: ["Computer Networks"],
      description: "Cryptography basics, threat models, secure protocols and cybersecurity principles."
    },
    {
      id: "501",
      title: "Machine Learning",
      category: "ai",
      level: "advanced",
      credits: 6,
      semester: 6,
      prerequisites: ["Statistics & Probability", "Linear Algebra"],
      description: "Supervised learning, unsupervised learning and model evaluation."
    },
    {
      id: "502",
      title: "Artificial Intelligence",
      category: "ai",
      level: "advanced",
      credits: 6,
      semester: 6,
      prerequisites: ["Algorithms & Complexity"],
      description: "Search, reasoning, planning, agents and basic neural networks."
    },
    {
      id: "503",
      title: "Mobile Application Development",
      category: "programming",
      level: "advanced",
      credits: 5,
      semester: 6,
      prerequisites: ["Web Development"],
      description: "Mobile UI design, platform APIs, sensors and deployment."
    },
    {
      id: "504",
      title: "Big Data & Cloud Technologies",
      category: "data",
      level: "advanced",
      credits: 6,
      semester: 6,
      prerequisites: ["Distributed Systems"],
      description: "Big data architectures, cloud services, parallel computing and data pipelines."
    }
  ];
  