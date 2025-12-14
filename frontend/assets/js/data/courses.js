const COURSES = [
  {
    id: "101",
    title: "Introduction to Computer Science",
    category: "core",
    level: "beginner",
    credits: 6,
    semester: 1,
    image: "ai.png",
    prerequisites: [],
    description:
      "This course provides a broad and engaging introduction to the foundations of computer science. Students explore how computers work, how software is developed, and how computational thinking can be applied to problem-solving. Topics include data representation, hardware fundamentals, algorithmic processes, simple programming structures, and introductory topics in the history and impact of computing.",
    content: [
      "Foundations of computing and digital information",
      "Introduction to algorithms and problem-solving strategies",
      "Basic programming constructs (variables, loops, conditionals)",
      "Overview of hardware components and operating systems",
      "Introduction to data representation and binary logic",
      "Ethics and societal implications of computing"
    ],
    learningOutcomes: [
      "Explain fundamental concepts of computing and digital systems",
      "Apply logical reasoning to break down simple problems",
      "Design and implement small programs using procedural logic",
      "Understand how data is represented and processed in a computer",
      "Recognize the societal and ethical challenges of modern computing"
    ],
    bibliography: ["B101", "B102"],
    professor: {
      name: "Dr. Alice Johnson",
      photo: "assets/img/professors/alice-johnson.jpg",
      email: "alice.johnson@university.edu"
    }
  },

  {
    id: "102",
    title: "Mathematics for Computer Science",
    category: "mathematics",
    level: "beginner",
    credits: 6,
    semester: 1,
    prerequisites: [],
    description:
      "A foundational mathematics course designed to equip students with essential tools used throughout computer science. Topics include logic, proofs, set theory, combinatorics, graph theory basics, and discrete structures. Emphasis is placed on rigorous thinking and understanding how mathematical reasoning supports programming, algorithms, cryptography, and data structures.",
    content: [
      "Propositional and predicate logic",
      "Proof techniques: induction, contradiction, direct proof",
      "Set theory, functions, and relations",
      "Combinatorics and counting principles",
      "Graph theory fundamentals",
      "Number theory basics relevant to computing"
    ],
    learningOutcomes: [
      "Construct formal proofs and reason mathematically",
      "Apply combinatorial methods to solve computational problems",
      "Analyze relationships using sets, functions, and relations",
      "Use graph theory to understand data structures and networks",
      "Understand the mathematical foundations behind algorithms"
    ],
    bibliography: ["B103"],
    professor: {
      name: "Dr. Alice Johnson",
      photo: "assets/img/professors/alice-johnson.jpg",
      email: "alice.johnson@university.edu"
    }
  },

  {
    id: "103",
    title: "Introduction to Programming with Java",
    category: "programming",
    level: "beginner",
    credits: 6,
    semester: 2,
    prerequisites: ["101"],
    description:
      "An entry-level programming course focusing on Java and the principles of object-oriented programming. Students learn core programming structures, data types, classes and objects, as well as basic algorithms and software design principles. The course emphasizes hands-on programming and problem-solving through structured lab assignments.",
    content: [
      "Java fundamentals: syntax, variables, and data types",
      "Control structures: loops, conditionals, and branching",
      "Object-oriented programming: classes, objects, encapsulation",
      "Methods, parameters, and returns",
      "File I/O and exception handling",
      "Basic algorithms on arrays and strings"
    ],
    learningOutcomes: [
      "Write, compile, and debug Java programs",
      "Use object-oriented principles in software design",
      "Implement algorithms using Java data structures",
      "Apply modular programming using functions and classes",
      "Solve computational problems using Java"
    ],
    bibliography: ["B105"],
    professor: {
      name: "Dr. Alice Johnson",
      photo: "assets/img/professors/alice-johnson.jpg",
      email: "alice.johnson@university.edu"
    }
  },

  {
    id: "104",
    title: "Linear Algebra",
    category: "mathematics",
    level: "beginner",
    credits: 5,
    semester: 2,
    prerequisites: [],
    description:
      "This course develops the foundational concepts of linear algebra with applications to computer science. Students study vector spaces, matrices, transformations, eigenvalues, and systems of equations. Real-world applications include graphics, machine learning, scientific computing, and data analysis.",
    content: [
      "Vectors, vector spaces, and subspaces",
      "Matrix arithmetic and operations",
      "Determinants and invertibility",
      "Linear transformations and matrix representations",
      "Eigenvalues and eigenvectors",
      "Applications to graphics, ML, and systems of equations"
    ],
    learningOutcomes: [
      "Perform operations with matrices and vectors",
      "Analyze and solve linear systems",
      "Interpret key matrix properties such as rank and determinants",
      "Compute eigenvalues and eigenvectors and identify applications",
      "Apply linear algebra concepts to computing problems"
    ],
    bibliography: ["B104"],
    professor: {
      name: "Dr. Alice Johnson",
      photo: "assets/img/professors/alice-johnson.jpg",
      email: "alice.johnson@university.edu"
    }
  },

  {
    id: "201",
    title: "Data Structures & Algorithms",
    category: "programming",
    level: "intermediate",
    credits: 6,
    semester: 3,
    prerequisites: ["103"],
    description:
      "This course covers fundamental data structures and core algorithms essential to software development. Students learn how to efficiently organize, store, and manipulate data using structures such as lists, trees, heaps, and graphs. Algorithmic strategies—including sorting, searching, recursion, greedy algorithms, and complexity analysis—are explored in depth.",
    content: [
      "Algorithm complexity and Big-O notation",
      "Linked lists, stacks, and queues",
      "Trees, binary search trees, heaps",
      "Graphs, traversal algorithms (DFS, BFS)",
      "Sorting algorithms and efficiency comparisons",
      "Greedy, divide-and-conquer, and recursive strategies"
    ],
    learningOutcomes: [
      "Analyze algorithm complexity and runtime efficiency",
      "Choose appropriate data structures for computational problems",
      "Implement complex data structures from scratch",
      "Apply algorithmic techniques to solve real-world problems",
      "Compare, evaluate, and optimize algorithm performance"
    ],
    bibliography: ["B106", "B112"],
    professor: {
      name: "Dr. Alice Johnson",
      photo: "assets/img/professors/alice-johnson.jpg",
      email: "alice.johnson@university.edu"
    }
  },
  {
      id: "101",
      title: "Introduction to Computer Science",
      category: "core",
      level: "beginner",
      credits: 6,
      semester: 1,
      prerequisites: [],
      description:
        "This course provides a broad and engaging introduction to the foundations of computer science. Students explore how computers work, how software is developed, and how computational thinking can be applied to problem-solving. Topics include data representation, hardware fundamentals, algorithmic processes, simple programming structures, and introductory topics in the history and impact of computing.",
      content: [
        "Foundations of computing and digital information",
        "Introduction to algorithms and problem-solving strategies",
        "Basic programming constructs (variables, loops, conditionals)",
        "Overview of hardware components and operating systems",
        "Introduction to data representation and binary logic",
        "Ethics and societal implications of computing"
      ],
      learningOutcomes: [
        "Explain fundamental concepts of computing and digital systems",
        "Apply logical reasoning to break down simple problems",
        "Design and implement small programs using procedural logic",
        "Understand how data is represented and processed in a computer",
        "Recognize the societal and ethical challenges of modern computing"
      ],
      bibliography: ["B101", "B102"],
      professor: {
        name: "Dr. Alice Johnson",
        photo: "assets/img/professors/alice-johnson.jpg",
        email: "alice.johnson@university.edu"
      }
    },
  
    {
      id: "102",
      title: "Mathematics for Computer Science",
      category: "mathematics",
      level: "beginner",
      credits: 6,
      semester: 1,
      prerequisites: [],
      description:
        "A foundational mathematics course designed to equip students with essential tools used throughout computer science. Topics include logic, proofs, set theory, combinatorics, graph theory basics, and discrete structures. Emphasis is placed on rigorous thinking and understanding how mathematical reasoning supports programming, algorithms, cryptography, and data structures.",
      content: [
        "Propositional and predicate logic",
        "Proof techniques: induction, contradiction, direct proof",
        "Set theory, functions, and relations",
        "Combinatorics and counting principles",
        "Graph theory fundamentals",
        "Number theory basics relevant to computing"
      ],
      learningOutcomes: [
        "Construct formal proofs and reason mathematically",
        "Apply combinatorial methods to solve computational problems",
        "Analyze relationships using sets, functions, and relations",
        "Use graph theory to understand data structures and networks",
        "Understand the mathematical foundations behind algorithms"
      ],
      bibliography: ["B103"],
      professor: {
        name: "Dr. Alice Johnson",
        photo: "assets/img/professors/alice-johnson.jpg",
        email: "alice.johnson@university.edu"
      }
    },
  
    {
      id: "103",
      title: "Introduction to Programming with Java",
      category: "programming",
      level: "beginner",
      credits: 6,
      semester: 2,
      prerequisites: ["101"],
      description:
        "An entry-level programming course focusing on Java and the principles of object-oriented programming. Students learn core programming structures, data types, classes and objects, as well as basic algorithms and software design principles. The course emphasizes hands-on programming and problem-solving through structured lab assignments.",
      content: [
        "Java fundamentals: syntax, variables, and data types",
        "Control structures: loops, conditionals, and branching",
        "Object-oriented programming: classes, objects, encapsulation",
        "Methods, parameters, and returns",
        "File I/O and exception handling",
        "Basic algorithms on arrays and strings"
      ],
      learningOutcomes: [
        "Write, compile, and debug Java programs",
        "Use object-oriented principles in software design",
        "Implement algorithms using Java data structures",
        "Apply modular programming using functions and classes",
        "Solve computational problems using Java"
      ],
      bibliography: ["B105"],
      professor: {
        name: "Dr. Alice Johnson",
        photo: "assets/img/professors/alice-johnson.jpg",
        email: "alice.johnson@university.edu"
      }
    },
  
    {
      id: "104",
      title: "Linear Algebra",
      category: "mathematics",
      level: "beginner",
      credits: 5,
      semester: 2,
      prerequisites: [],
      description:
        "This course develops the foundational concepts of linear algebra with applications to computer science. Students study vector spaces, matrices, transformations, eigenvalues, and systems of equations. Real-world applications include graphics, machine learning, scientific computing, and data analysis.",
      content: [
        "Vectors, vector spaces, and subspaces",
        "Matrix arithmetic and operations",
        "Determinants and invertibility",
        "Linear transformations and matrix representations",
        "Eigenvalues and eigenvectors",
        "Applications to graphics, ML, and systems of equations"
      ],
      learningOutcomes: [
        "Perform operations with matrices and vectors",
        "Analyze and solve linear systems",
        "Interpret key matrix properties such as rank and determinants",
        "Compute eigenvalues and eigenvectors and identify applications",
        "Apply linear algebra concepts to computing problems"
      ],
      bibliography: ["B104"],
      professor: {
        name: "Dr. Alice Johnson",
        photo: "assets/img/professors/alice-johnson.jpg",
        email: "alice.johnson@university.edu"
      }
    },
  
    {
      id: "201",
      title: "Data Structures & Algorithms",
      category: "programming",
      level: "intermediate",
      credits: 6,
      semester: 3,
      prerequisites: ["103"],
      description:
        "This course covers fundamental data structures and core algorithms essential to software development. Students learn how to efficiently organize, store, and manipulate data using structures such as lists, trees, heaps, and graphs. Algorithmic strategies—including sorting, searching, recursion, greedy algorithms, and complexity analysis—are explored in depth.",
      content: [
        "Algorithm complexity and Big-O notation",
        "Linked lists, stacks, and queues",
        "Trees, binary search trees, heaps",
        "Graphs, traversal algorithms (DFS, BFS)",
        "Sorting algorithms and efficiency comparisons",
        "Greedy, divide-and-conquer, and recursive strategies"
      ],
      learningOutcomes: [
        "Analyze algorithm complexity and runtime efficiency",
        "Choose appropriate data structures for computational problems",
        "Implement complex data structures from scratch",
        "Apply algorithmic techniques to solve real-world problems",
        "Compare, evaluate, and optimize algorithm performance"
      ],
      bibliography: ["B106", "B112"],
      professor: {
        name: "Dr. Alice Johnson",
        photo: "assets/img/professors/alice-johnson.jpg",
        email: "alice.johnson@university.edu"
      }
    },
    {
      id: "204",
      title: "Computer Architecture",
      category: "systems",
      level: "intermediate",
      credits: 6,
      semester: 3,
      prerequisites: ["Introduction to Computer Science"],
      description: "CPU organization, memory hierarchy, instruction cycles, and assembly basics. Focuses on understanding how computers execute programs and manage resources.",
      content: [
        "CPU structure and function",
        "Memory hierarchy: cache, RAM, storage",
        "Instruction set architecture",
        "Assembly language programming",
        "Pipelining and performance optimization"
      ],
      learningOutcomes: [
        "Understand CPU architecture and memory systems",
        "Analyze instruction execution",
        "Write simple assembly programs",
        "Evaluate performance trade-offs",
        "Apply concepts to system design problems"
      ],
      bibliography: ["B108"],
      professor: {
        name: "Dr. Alice Johnson",
        photo: "assets/img/professors/alice-johnson.jpg",
        email: "alice.johnson@university.edu"
      }
    },
    {
      id: "301",
      title: "Operating Systems",
      category: "systems",
      level: "intermediate",
      credits: 6,
      semester: 4,
      prerequisites: ["Data Structures & Algorithms"],
      description: "Processes, threads, memory management, scheduling, and file systems. Covers core concepts of modern operating systems and how software interacts with hardware.",
      content: [
        "Process management and scheduling",
        "Threading and concurrency",
        "Memory management and virtual memory",
        "File systems and I/O management",
        "Synchronization and deadlocks"
      ],
      learningOutcomes: [
        "Understand OS structure and components",
        "Manage processes and threads",
        "Implement memory allocation strategies",
        "Analyze file system design",
        "Handle concurrency and synchronization issues"
      ],
      bibliography: ["B108"],
      professor: {
        name: "Dr. Alice Johnson",
        photo: "assets/img/professors/alice-johnson.jpg",
        email: "alice.johnson@university.edu"
      }
    },
    {
      id: "302",
      title: "Algorithms & Complexity",
      category: "mathematics",
      level: "intermediate",
      credits: 6,
      semester: 4,
      prerequisites: ["Data Structures & Algorithms"],
      description: "Advanced algorithms, NP-completeness, dynamic programming, and graph algorithms. Focuses on designing efficient algorithms and understanding computational limits.",
      content: [
        "Divide and conquer algorithms",
        "Dynamic programming techniques",
        "Greedy algorithms",
        "Graph algorithms: shortest paths, MST",
        "NP-completeness and computational complexity"
      ],
      learningOutcomes: [
        "Design efficient algorithms",
        "Apply dynamic programming solutions",
        "Analyze algorithm complexity",
        "Understand NP-complete problems",
        "Solve advanced graph problems"
      ],
      bibliography: ["B112"],
      professor: {
        name: "Dr. Alice Johnson",
        photo: "assets/img/professors/alice-johnson.jpg",
        email: "alice.johnson@university.edu"
      }
    },
    {
      id: "303",
      title: "Web Development",
      category: "engineering",
      level: "intermediate",
      credits: 5,
      semester: 4,
      prerequisites: ["Database Systems"],
      description: "Front-end and back-end web development fundamentals, HTTP, REST APIs, and web application design. Students gain practical experience building web applications.",
      content: [
        "HTML, CSS, and JavaScript basics",
        "Client-server architecture",
        "RESTful APIs and HTTP methods",
        "Backend development and databases",
        "Deployment and web security basics"
      ],
      learningOutcomes: [
        "Build functional web pages",
        "Develop client-server applications",
        "Consume and implement REST APIs",
        "Work with databases in web apps",
        "Understand web security practices"
      ],
      bibliography: ["B114"],
      professor: {
        name: "Dr. Alice Johnson",
        photo: "assets/img/professors/alice-johnson.jpg",
        email: "alice.johnson@university.edu"
      }
    },
    {
      id: "304",
      title: "Human-Computer Interaction",
      category: "design",
      level: "intermediate",
      credits: 4,
      semester: 4,
      prerequisites: [],
      description: "User-centered design, usability evaluation, and UX principles. Students learn to create intuitive and accessible user interfaces.",
      content: [
        "Principles of human-computer interaction",
        "Usability heuristics and evaluation",
        "Interface design patterns",
        "Prototyping and wireframing",
        "Accessibility and inclusive design"
      ],
      learningOutcomes: [
        "Design user-centered interfaces",
        "Evaluate usability of systems",
        "Create prototypes and wireframes",
        "Apply UX principles in projects",
        "Consider accessibility in design"
      ],
      bibliography: ["B113"],
      professor: {
        name: "Dr. Alice Johnson",
        photo: "assets/img/professors/alice-johnson.jpg",
        email: "alice.johnson@university.edu"
      }
    },
    {
      id: "401",
      title: "Computer Networks",
      category: "networks",
      level: "intermediate",
      credits: 6,
      semester: 5,
      prerequisites: ["Operating Systems"],
      description: "Network layers, routing, TCP/IP protocols, wireless networks, and network applications. Covers the design and analysis of modern communication networks.",
      content: [
        "OSI and TCP/IP models",
        "Routing protocols and algorithms",
        "Switching and network topologies",
        "Wireless communication basics",
        "Network security and management"
      ],
      learningOutcomes: [
        "Understand network architecture and protocols",
        "Analyze routing and switching techniques",
        "Design small network topologies",
        "Apply wireless networking concepts",
        "Evaluate network security measures"
      ],
      bibliography: ["B109"],
      professor: {
        name: "Dr. Alice Johnson",
        photo: "assets/img/professors/alice-johnson.jpg",
        email: "alice.johnson@university.edu"
      }
    },
    {
      id: "402",
      title: "Software Engineering",
      category: "engineering",
      level: "intermediate",
      credits: 6,
      semester: 5,
      prerequisites: ["Web Development"],
      description: "Software lifecycle, agile methodologies, testing, and design patterns. Focuses on producing maintainable, reliable, and scalable software.",
      content: [
        "Software development lifecycle models",
        "Agile methodologies and Scrum",
        "Unit testing and integration testing",
        "Design patterns and best practices",
        "Version control and collaboration"
      ],
      learningOutcomes: [
        "Apply software development processes",
        "Use agile methodologies effectively",
        "Write and test maintainable code",
        "Implement design patterns",
        "Collaborate using version control systems"
      ],
      bibliography: [],
      professor: {
        name: "Dr. Alice Johnson",
        photo: "assets/img/professors/alice-johnson.jpg",
        email: "alice.johnson@university.edu"
      }
    },
    {
      id: "403",
      title: "Distributed Systems",
      category: "systems",
      level: "advanced",
      credits: 6,
      semester: 5,
      prerequisites: ["Operating Systems", "Computer Networks"],
      description: "Distributed architectures, consensus algorithms, cloud computing, and scalability. Students learn to design robust distributed applications.",
      content: [
        "Distributed system models and architectures",
        "Consistency and consensus protocols",
        "Cloud computing fundamentals",
        "Fault tolerance and replication",
        "Scalability and performance tuning"
      ],
      learningOutcomes: [
        "Design distributed systems",
        "Implement consensus algorithms",
        "Deploy applications to cloud platforms",
        "Ensure fault tolerance and reliability",
        "Optimize distributed system performance"
      ],
      bibliography: ["B115"],
      professor: {
        name: "Dr. Alice Johnson",
        photo: "assets/img/professors/alice-johnson.jpg",
        email: "alice.johnson@university.edu"
      }
    },
    {
      id: "404",
      title: "Information Security",
      category: "security",
      level: "intermediate",
      credits: 5,
      semester: 5,
      prerequisites: ["Computer Networks"],
      description: "Cryptography, threat models, secure protocols, and cybersecurity principles. Covers practical and theoretical aspects of securing information systems.",
      content: [
        "Introduction to cryptography",
        "Symmetric and asymmetric encryption",
        "Network security protocols",
        "Threat models and attack types",
        "Security policies and risk assessment"
      ],
      learningOutcomes: [
        "Understand cryptographic principles",
        "Analyze security protocols",
        "Identify and mitigate threats",
        "Apply security measures to systems",
        "Evaluate information security policies"
      ],
      bibliography: [],
      professor: {
        name: "Dr. Alice Johnson",
        photo: "assets/img/professors/alice-johnson.jpg",
        email: "alice.johnson@university.edu"
      }
    },
    {
      id: "501",
      title: "Machine Learning",
      category: "ai",
      level: "advanced",
      credits: 6,
      semester: 6,
      prerequisites: ["Statistics & Probability", "Linear Algebra"],
      description: "Supervised and unsupervised learning, model evaluation, and feature engineering. Students gain practical experience building ML models.",
      content: [
        "Supervised learning algorithms",
        "Unsupervised learning techniques",
        "Model evaluation and validation",
        "Feature selection and engineering",
        "Practical ML projects and applications"
      ],
      learningOutcomes: [
        "Implement supervised and unsupervised models",
        "Evaluate and improve model performance",
        "Prepare data for machine learning",
        "Understand ML theory and applications",
        "Develop practical machine learning projects"
      ],
      bibliography: ["B111"],
      professor: {
        name: "Dr. Alice Johnson",
        photo: "assets/img/professors/alice-johnson.jpg",
        email: "alice.johnson@university.edu"
      }
    },
    {
      id: "502",
      title: "Artificial Intelligence",
      category: "ai",
      level: "advanced",
      credits: 6,
      semester: 6,
      prerequisites: ["Algorithms & Complexity"],
      description: "Search, reasoning, planning, agents, and neural networks. Introduces intelligent systems and problem-solving approaches in AI.",
      content: [
        "Search algorithms: BFS, DFS, A*",
        "Knowledge representation and reasoning",
        "Planning algorithms and decision-making",
        "Intelligent agents and environments",
        "Introduction to neural networks and AI applications"
      ],
      learningOutcomes: [
        "Implement AI search and planning algorithms",
        "Design intelligent agents",
        "Represent and reason with knowledge",
        "Understand basic neural networks",
        "Apply AI techniques to practical problems"
      ],
      bibliography: ["B110"],
      professor: {
        name: "Dr. Alice Johnson",
        photo: "assets/img/professors/alice-johnson.jpg",
        email: "alice.johnson@university.edu"
      }
    },
    {
      id: "503",
      title: "Mobile Application Development",
      category: "programming",
      level: "advanced",
      credits: 5,
      semester: 6,
      prerequisites: ["Web Development"],
      description: "Mobile UI design, platform APIs, sensors, and deployment. Students learn to build native and hybrid mobile applications.",
      content: [
        "Mobile UI/UX design principles",
        "Platform-specific APIs (iOS/Android)",
        "Accessing sensors and device features",
        "Networking and data storage in mobile apps",
        "App deployment and publishing"
      ],
      learningOutcomes: [
        "Design and implement mobile interfaces",
        "Use device APIs for app functionality",
        "Build native and hybrid apps",
        "Handle data storage and networking",
        "Deploy apps to app stores"
      ],
      bibliography: [],
      professor: {
        name: "Dr. Alice Johnson",
        photo: "assets/img/professors/alice-johnson.jpg",
        email: "alice.johnson@university.edu"
      }
    },
    {
      id: "504",
      title: "Big Data & Cloud Technologies",
      category: "data",
      level: "advanced",
      credits: 6,
      semester: 6,
      prerequisites: ["Distributed Systems"],
      description: "Big data architectures, cloud services, parallel computing, and data pipelines. Students explore scalable data processing and cloud infrastructure.",
      content: [
        "Big data processing frameworks (Hadoop, Spark)",
        "Cloud computing platforms and services",
        "Parallel and distributed computing",
        "Data pipelines and ETL processes",
        "Scalable storage and database systems"
      ],
      learningOutcomes: [
        "Design and implement big data solutions",
        "Use cloud services for computing",
        "Build distributed data pipelines",
        "Process and analyze large datasets",
        "Optimize systems for scalability"
      ],
      bibliography: ["B116"],
      professor: {
        name: "Dr. Alice Johnson",
        photo: "assets/img/professors/alice-johnson.jpg",
        email: "alice.johnson@university.edu"
      }
    }
  ];