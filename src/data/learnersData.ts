import { LearnerProfile, Quiz } from '../types/index.js';

export const INITIAL_PROFILES: LearnerProfile[] = [
  {
    id: 'learner-alex',
    name: 'Alex',
    avatarColor: 'from-purple-700 to-indigo-900',
    avatarType: 'purple-glasses',
    targetRole: 'Machine Learning Engineer',
    learningGoal: 'Master Deep Learning and Large Language Models for production AI deployment',
    currentProficiency: 'Intermediate',
    preferredTopics: ['Artificial Intelligence & ML', 'Data Structures & Algorithms'],
    completedCourses: ['cs-ml-03', 'cs-ml-07'],
    inProgressCourses: [
      { courseId: 'cs-ml-01', progressPercent: 65 }
    ],
    currentSkills: {
      'Python Fundamentals': 88,
      'Linear Algebra': 75,
      'Calculus Basics': 62,
      'Scikit-Learn': 70,
      'Neural Networks': 58,
      'PyTorch': 38,
      'Transformers & LLMs': 24,
      'Model Deployment': 20,
    },
    targetSkills: {
      'Python Fundamentals': 95,
      'Linear Algebra': 85,
      'Calculus Basics': 75,
      'Scikit-Learn': 85,
      'Neural Networks': 90,
      'PyTorch': 85,
      'Transformers & LLMs': 85,
      'Model Deployment': 80,
    },
    assessmentHistory: [
      {
        quizId: 'quiz-ml-01',
        topic: 'Neural Networks & PyTorch Fundamentals',
        score: 62,
        date: '2026-11-02',
        weakAreas: ['PyTorch Autograd', 'Transformer Self-Attention', 'Backpropagation through Time']
      }
    ],
    isColdStart: false
  },
  {
    id: 'learner-maya',
    name: 'Maya',
    avatarColor: 'from-cyan-500 to-teal-700',
    avatarType: 'cyan-smile',
    targetRole: 'Full-Stack Cloud Architect',
    learningGoal: 'Build high-concurrency microservices, modern React 19 apps, and Kubernetes deployment pipelines',
    currentProficiency: 'Intermediate',
    preferredTopics: ['Full Stack Development', 'Cloud & DevOps'],
    completedCourses: ['cs-fs-01'],
    inProgressCourses: [
      { courseId: 'cs-fs-02', progressPercent: 40 }
    ],
    currentSkills: {
      'HTML & CSS': 90,
      'JavaScript ES6+': 82,
      'React': 65,
      'Node.js & Express': 55,
      'PostgreSQL & SQL': 45,
      'Docker & Containers': 30,
      'Kubernetes': 15,
      'System Architecture': 25,
    },
    targetSkills: {
      'HTML & CSS': 95,
      'JavaScript ES6+': 90,
      'React': 90,
      'Node.js & Express': 85,
      'PostgreSQL & SQL': 80,
      'Docker & Containers': 85,
      'Kubernetes': 80,
      'System Architecture': 85,
    },
    assessmentHistory: [
      {
        quizId: 'quiz-fs-01',
        topic: 'Microservices & Containerization',
        score: 48,
        date: '2026-11-04',
        weakAreas: ['Kubernetes Pod Networking', 'Database Migration Transactions', 'Docker Multi-stage Builds']
      }
    ],
    isColdStart: false
  },
  {
    id: 'learner-jordan',
    name: 'Jordan',
    avatarColor: 'from-lime-600 to-green-700',
    avatarType: 'green-smile',
    targetRole: 'Data Scientist',
    learningGoal: 'Design end-to-end data analytics pipelines, statistical modeling, and automated business intelligence',
    currentProficiency: 'Intermediate',
    preferredTopics: ['Data Science & Analytics', 'Artificial Intelligence & ML'],
    completedCourses: ['cs-ds-03'],
    inProgressCourses: [
      { courseId: 'cs-ds-01', progressPercent: 55 }
    ],
    currentSkills: {
      'SQL & Databases': 85,
      'Data Wrangling with Pandas': 72,
      'Data Visualization': 68,
      'Probability & Statistics': 50,
      'Hypothesis Testing': 40,
      'Machine Learning Models': 45,
      'Feature Engineering': 35,
    },
    targetSkills: {
      'SQL & Databases': 95,
      'Data Wrangling with Pandas': 90,
      'Data Visualization': 85,
      'Probability & Statistics': 85,
      'Hypothesis Testing': 80,
      'Machine Learning Models': 80,
      'Feature Engineering': 85,
    },
    assessmentHistory: [
      {
        quizId: 'quiz-ds-01',
        topic: 'Applied Statistical Inference',
        score: 55,
        date: '2026-11-05',
        weakAreas: ['p-value interpretation', 'ANOVA vs Chi-Square', 'Maximum Likelihood Estimation']
      }
    ],
    isColdStart: false
  },
  {
    id: 'learner-samira',
    name: 'Samira',
    avatarColor: 'from-red-600 to-red-900',
    avatarType: 'red-kid',
    targetRole: 'Junior Developer (Cold-Start)',
    learningGoal: 'Beginner starting computer science journey, seeking foundational orientation and clean learning path',
    currentProficiency: 'Beginner',
    preferredTopics: ['Data Structures & Algorithms', 'Full Stack Development'],
    completedCourses: [],
    inProgressCourses: [],
    currentSkills: {
      'Computational Thinking': 20,
      'Python Basics': 15,
      'Math Foundations': 30,
      'Problem Solving': 25,
      'Git & Version Control': 10,
    },
    targetSkills: {
      'Computational Thinking': 85,
      'Python Basics': 80,
      'Math Foundations': 75,
      'Problem Solving': 80,
      'Git & Version Control': 75,
    },
    assessmentHistory: [],
    isColdStart: true
  },
  {
    id: 'learner-liam',
    name: 'Keaton',
    avatarColor: 'from-blue-600 to-indigo-800',
    avatarType: 'blue-smile',
    targetRole: 'Cybersecurity Engineer',
    learningGoal: 'Master network penetration testing, Wireshark packet analysis, and secure Linux cloud infrastructure',
    currentProficiency: 'Intermediate',
    preferredTopics: ['Cyber Security', 'Cloud & DevOps'],
    completedCourses: ['cs-sec-01'],
    inProgressCourses: [
      { courseId: 'cs-devops-01', progressPercent: 30 }
    ],
    currentSkills: {
      'Network Security': 78,
      'Wireshark': 70,
      'Linux Administration': 65,
      'Cryptography': 50,
      'Penetration Testing': 40,
    },
    targetSkills: {
      'Network Security': 90,
      'Wireshark': 85,
      'Linux Administration': 85,
      'Cryptography': 80,
      'Penetration Testing': 85,
    },
    assessmentHistory: [],
    isColdStart: false
  }
];

export const DIAGNOSTIC_QUIZZES: Quiz[] = [
  {
    id: 'quiz-ml-01',
    title: 'AI & Deep Learning Competency Check',
    category: 'Artificial Intelligence & ML',
    description: '5 high-impact questions testing backpropagation, vectorization, PyTorch autograd, and Transformer attention mechanisms.',
    questions: [
      {
        id: 'q1',
        topic: 'Artificial Intelligence & ML',
        subskill: 'Neural Networks',
        question: 'During backpropagation in a multi-layer perceptron, what does the chain rule fundamentally compute for each weight matrix?',
        options: [
          'The exact value that the forward pass activation should take',
          'The partial derivative of the loss function with respect to that weight matrix',
          'The ratio between the learning rate and mini-batch sample count',
          'The covariance matrix between input vectors and hidden layer biases'
        ],
        correctIndex: 1,
        explanation: 'Backpropagation computes dL/dW (the gradient of the loss with respect to each parameter) via successive application of the calculus chain rule.',
        difficulty: 'Intermediate'
      },
      {
        id: 'q2',
        topic: 'Artificial Intelligence & ML',
        subskill: 'PyTorch',
        question: 'In PyTorch, what occurs when calling tensor.backward() on a scalar loss value?',
        options: [
          'It clears all historical gradients in optimizer.step()',
          'It triggers autograd engine to traverse the computational graph and accumulate gradients into .grad attributes',
          'It transfers the entire tensor directly from host RAM to GPU VRAM',
          'It applies L1 and L2 weight decay penalties to all linear layers'
        ],
        correctIndex: 1,
        explanation: 'loss.backward() executes reverse-mode automatic differentiation over the computational graph, accumulating gradients into each leaf tensor\'s .grad field.',
        difficulty: 'Intermediate'
      },
      {
        id: 'q3',
        topic: 'Artificial Intelligence & ML',
        subskill: 'Transformers & LLMs',
        question: 'What is the primary role of the scaled dot-product factor (1 / sqrt(d_k)) in Transformer Attention (Q * K^T) / sqrt(d_k)?',
        options: [
          'To ensure matrix multiplication outputs strictly integers',
          'To prevent dot products from growing excessively large for large dimensions, which would push softmax into regions with vanishing gradients',
          'To double the throughput of multi-head attention on Tensor Cores',
          'To penalize repetitive tokens during autoregressive greedy decoding'
        ],
        correctIndex: 1,
        explanation: 'For large values of d_k, dot products grow large in magnitude, driving the softmax function into regions with extremely small gradients. Scaling by 1/sqrt(d_k) counteracts this effect.',
        difficulty: 'Advanced'
      },
      {
        id: 'q4',
        topic: 'Artificial Intelligence & ML',
        subskill: 'Linear Algebra',
        question: 'If a matrix A satisfies A * v = λ * v for a non-zero vector v, what are v and λ called?',
        options: [
          'v is the orthogonal projection, λ is the Euclidean norm',
          'v is an eigenvector, λ is the corresponding eigenvalue',
          'v is a kernel basis, λ is the determinant scale factor',
          'v is a singular vector, λ is the rank decomposition'
        ],
        correctIndex: 1,
        explanation: 'By definition, an eigenvector v undergoes only uniform scaling by factor λ (the eigenvalue) when transformed by matrix A.',
        difficulty: 'Beginner'
      },
      {
        id: 'q5',
        topic: 'Artificial Intelligence & ML',
        subskill: 'Model Deployment',
        question: 'Which quantization technique compresses FP32 model weights into INT8 after training without requiring full retraining?',
        options: [
          'Quantization-Aware Training (QAT)',
          'Post-Training Quantization (PTQ)',
          'LoRA Rank Pruning',
          'Batch Normalization Fusion'
        ],
        correctIndex: 1,
        explanation: 'Post-Training Quantization (PTQ) converts trained FP32/FP16 weights into low-bit representation (INT8) using calibration data without running the full training loop.',
        difficulty: 'Advanced'
      }
    ]
  },
  {
    id: 'quiz-fs-01',
    title: 'Full Stack & Web Architecture Diagnostic',
    category: 'Full Stack Development',
    description: 'Evaluates proficiency in React 19 state concurrency, REST/GraphQL design, Docker networking, and database indexing.',
    questions: [
      {
        id: 'q-fs-1',
        topic: 'Full Stack Development',
        subskill: 'React',
        question: 'What distinguishes React Server Components (RSC) from traditional client components?',
        options: [
          'Server components re-render automatically on every browser click event',
          'Server components execute only on the server, zero client bundle overhead, and can directly access databases and backend resources',
          'Server components cannot receive any props from parent components',
          'Server components require Redux Toolkit to maintain state across pages'
        ],
        correctIndex: 1,
        explanation: 'RSCs execute strictly on the server and stream serialized UI elements (JSX virtual representation) to the client, shipping 0KB of component JavaScript to the browser bundle.',
        difficulty: 'Intermediate'
      },
      {
        id: 'q-fs-2',
        topic: 'Full Stack Development',
        subskill: 'Docker & Containers',
        question: 'Why are multi-stage Docker builds recommended for production Node/Go/Rust web applications?',
        options: [
          'They allow containers to bypass Linux kernel network firewalls',
          'They separate the build environment (compilers, npm cache) from the final minimal runtime image, reducing image size and security surface',
          'They enforce multi-core CPU affinity on cloud instances',
          'They eliminate the requirement for Dockerfiles'
        ],
        correctIndex: 1,
        explanation: 'Multi-stage builds leave behind heavy SDKs, build toolchains, and devDependencies, producing lean, secure container images consisting only of production artifacts.',
        difficulty: 'Intermediate'
      },
      {
        id: 'q-fs-3',
        topic: 'Full Stack Development',
        subskill: 'PostgreSQL & SQL',
        question: 'Which SQL indexing structure is best suited for accelerating range queries (e.g. `WHERE created_at BETWEEN ? AND ?`)?',
        options: [
          'Hash Index',
          'B-Tree Index',
          'GIN (Generalized Inverted) Index',
          'Bloom Filter Index'
        ],
        correctIndex: 1,
        explanation: 'B-Tree indexes maintain sorted leaf nodes connected in a doubly linked list, making ordered range traversals logarithmic O(log N) + sequential scan.',
        difficulty: 'Intermediate'
      }
    ]
  }
];

// Peer interaction matrix (Simulating 30 real learners and their course interactions)
// Used for Collaborative Filtering demonstration
export interface PeerInteractionRecord {
  userId: string;
  targetRole: string;
  courseRatings: Record<string, number>; // courseId -> rating 1 to 5
}

export const PEER_INTERACTION_MATRIX: PeerInteractionRecord[] = [
  {
    userId: 'peer-01',
    targetRole: 'Machine Learning Engineer',
    courseRatings: { 'cs-ml-01': 5, 'cs-ml-02': 5, 'cs-ml-03': 5, 'cs-ml-06': 4, 'cs-dsa-01': 4 }
  },
  {
    userId: 'peer-02',
    targetRole: 'Machine Learning Engineer',
    courseRatings: { 'cs-ml-01': 5, 'cs-ml-03': 4, 'cs-ml-07': 5, 'cs-ml-02': 5, 'cs-ds-01': 4 }
  },
  {
    userId: 'peer-03',
    targetRole: 'Machine Learning Engineer',
    courseRatings: { 'cs-ml-02': 5, 'cs-ml-06': 5, 'cs-ml-05': 4, 'cs-dsa-01': 5 }
  },
  {
    userId: 'peer-04',
    targetRole: 'Full-Stack Cloud Architect',
    courseRatings: { 'cs-fs-01': 5, 'cs-fs-02': 5, 'cs-fs-03': 4, 'cs-devops-01': 5, 'cs-dsa-02': 4 }
  },
  {
    userId: 'peer-05',
    targetRole: 'Full-Stack Cloud Architect',
    courseRatings: { 'cs-fs-02': 5, 'cs-devops-01': 5, 'cs-devops-02': 4, 'cs-fs-03': 5 }
  },
  {
    userId: 'peer-06',
    targetRole: 'Quantitative Data Scientist',
    courseRatings: { 'cs-ds-01': 5, 'cs-ds-02': 5, 'cs-ds-03': 5, 'cs-ml-07': 4, 'cs-ml-03': 4 }
  },
  {
    userId: 'peer-07',
    targetRole: 'Quantitative Data Scientist',
    courseRatings: { 'cs-ds-01': 4, 'cs-ds-03': 5, 'cs-ml-07': 5, 'cs-ml-01': 4 }
  },
  {
    userId: 'peer-08',
    targetRole: 'Associate Software Engineer',
    courseRatings: { 'cs-beg-01': 5, 'cs-dsa-02': 4, 'cs-fs-01': 4, 'cs-ds-03': 4 }
  },
  {
    userId: 'peer-09',
    targetRole: 'Associate Software Engineer',
    courseRatings: { 'cs-beg-01': 5, 'cs-dsa-02': 5, 'cs-fs-01': 5 }
  },
  {
    userId: 'peer-10',
    targetRole: 'Machine Learning Engineer',
    courseRatings: { 'cs-ml-01': 5, 'cs-ml-02': 5, 'cs-ml-04': 4, 'cs-ml-06': 5, 'cs-devops-01': 3 }
  }
];
