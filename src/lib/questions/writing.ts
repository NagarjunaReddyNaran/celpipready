export type WritingPrompt = {
  id: string;
  taskNumber: 1 | 2;
  title: string;
  situation: string;
  instructions: string[];
  timeSeconds: number;
  wordMin: number;
  wordMax: number;
  rubric: string[];
};

export type WritingSet = {
  id: "mock-a" | "mock-b";
  name: string;
  task1: WritingPrompt;
  task2: WritingPrompt;
};

export const WRITING_RUBRIC = [
  "Content/Coherence: All required points are addressed clearly and relevantly.",
  "Organization: Ideas are logically structured with a clear opening, body, and closing.",
  "Vocabulary Range: A variety of precise, contextually appropriate words are used.",
  "Grammar & Mechanics: Sentences are grammatically accurate with proper punctuation.",
];

export const WRITING_SETS: WritingSet[] = [
  {
    id: "mock-a",
    name: "Mock Test A",
    task1: {
      id: "mock-a-task1",
      taskNumber: 1,
      title: "Email About a Damaged Laptop",
      situation:
        "Three weeks ago, you ordered a new laptop from an online electronics retailer called TechDirect. When the laptop arrived, the packaging was clearly damaged, and upon opening it, you discovered a crack in the screen and a dent on the corner of the casing. You attempted to use the laptop, and it functioned briefly before completely stopping working after two days. You have called TechDirect's customer service line twice — once on the day the laptop stopped working and again one week later. On both calls, you were told a manager would follow up within 48 hours, but you have received no response. You are now writing a formal email to TechDirect's Customer Relations Department.",
      instructions: [
        "Clearly describe the condition of the laptop when it arrived and the problem that developed after two days of use.",
        "Explain the two previous attempts you made to resolve this issue through TechDirect's customer service and what happened on each call.",
        "State clearly what resolution you are requesting — either a full refund or a replacement laptop — and specify that you expect a response within 7 business days.",
      ],
      timeSeconds: 27 * 60,
      wordMin: 150,
      wordMax: 200,
      rubric: WRITING_RUBRIC,
    },
    task2: {
      id: "mock-a-task2",
      taskNumber: 2,
      title: "Community Centre Survey",
      situation:
        "Your city is planning to build a new community centre and is gathering public input through an online survey. The community centre will serve residents of all ages and will include both recreational and social spaces. City planners want to understand what facilities residents consider most valuable and how the centre should be funded. Please respond to both questions in the survey.",
      instructions: [
        "Question 1: What recreational facilities should the new community centre include, and why do you believe these specific facilities are important for the community?",
        "Question 2: Should the community centre charge a membership fee to access its facilities, or should it be free and accessible to all residents? Explain your position.",
      ],
      timeSeconds: 26 * 60,
      wordMin: 150,
      wordMax: 200,
      rubric: WRITING_RUBRIC,
    },
  },
  {
    id: "mock-b",
    name: "Mock Test B",
    task1: {
      id: "mock-b-task1",
      taskNumber: 1,
      title: "Email to City Councillor About Library Funding Cuts",
      situation:
        "Your city councillor has announced a proposal to redirect a significant portion of the public library system's operating budget toward road repair and infrastructure maintenance. Under the proposal, two branch libraries in lower-income neighbourhoods would close, evening hours at all remaining branches would be eliminated, and the library's digital resources and community programming budget would be cut by 40 percent. A public consultation period is currently open, and residents are invited to send written comments to their local councillor. You are writing a formal letter to your councillor to share your position on this proposal.",
      instructions: [
        "Clearly state whether you support or oppose the proposed library funding cuts.",
        "Provide at least two specific reasons for your position, explaining the impact the cuts would have on the community.",
        "Suggest an alternative approach to addressing the city's infrastructure funding needs that does not require reducing library services to this extent.",
      ],
      timeSeconds: 27 * 60,
      wordMin: 150,
      wordMax: 200,
      rubric: WRITING_RUBRIC,
    },
    task2: {
      id: "mock-b-task2",
      taskNumber: 2,
      title: "Workplace and Education Survey",
      situation:
        "A national research organization is conducting a survey to better understand Canadians' experiences with learning challenges and evolving workplace practices. Your responses will be used anonymously to inform education and employment policy. Please answer both questions as fully as possible within the word limit.",
      instructions: [
        "Question 1: Describe a specific challenge you faced when learning something new — whether in school, at work, or in your personal life — and explain how you overcame it.",
        "Question 2: Many employers now use artificial intelligence (AI) tools to screen job applications before a human recruiter reviews them. Do you think this practice is fair to job applicants? Explain your view.",
      ],
      timeSeconds: 26 * 60,
      wordMin: 150,
      wordMax: 200,
      rubric: WRITING_RUBRIC,
    },
  },
];
