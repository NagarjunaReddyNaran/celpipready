export type ListeningQuestion = {
  part: number;
  title: string;
  context: string;        // Situation shown to the user before audio
  ttsScript: string;      // Clean text read by Web Speech API (no speaker labels)
  displayScript: string;  // Full script with speaker names shown in transcript view
  prompt: string;
  options: string[];
  correct: number;        // 0-indexed
  explanation: string;
  isPremium: boolean;
};

export const LISTENING_QUESTIONS: ListeningQuestion[] = [
  // ─── FREE TIER: Parts 1–4 ───────────────────────────────────────────────────

  {
    part: 1,
    title: "Daily Life Conversation",
    context: "Two coworkers, David and Sarah, are talking after a project meeting.",
    ttsScript: `Hey Sarah, I just got back from the project meeting. Did you hear about the new timeline?
I heard there were some changes, but I don't have the details yet. What happened?
The client moved the deadline up by two weeks. Instead of June 15th, they want everything delivered by June 1st.
That's a huge change. Do we even have enough people to pull that off?
That's exactly my concern. I think we need to request two additional team members, otherwise we'll be working every weekend until then.
I agree completely. Let's raise that with the manager this afternoon. Can you send me the updated project requirements before the meeting?
Of course. I'll email everything to you right after lunch.`,
    displayScript: `David: Hey Sarah, I just got back from the project meeting. Did you hear about the new timeline?
Sarah: I heard there were some changes, but I don't have the details yet. What happened?
David: The client moved the deadline up by two weeks. Instead of June 15th, they want everything delivered by June 1st.
Sarah: That's a huge change. Do we even have enough people to pull that off?
David: That's exactly my concern. I think we need to request two additional team members, otherwise we'll be working every weekend until then.
Sarah: I agree completely. Let's raise that with the manager this afternoon. Can you send me the updated project requirements before the meeting?
David: Of course. I'll email everything to you right after lunch.`,
    prompt: "What is David's main concern about the new project deadline?",
    options: [
      "The client has not paid the invoice yet",
      "The team does not have enough resources to finish on time",
      "The manager is unavailable for the afternoon meeting",
      "The project requirements have not been finalized",
    ],
    correct: 1,
    explanation: "David says 'That's exactly my concern' after Sarah questions whether they have enough people, then adds they would need two additional team members.",
    isPremium: false,
  },

  {
    part: 2,
    title: "Recorded Message",
    context: "You will hear a voicemail left by a medical clinic.",
    ttsScript: `Hi, this message is for Mr. James Chen. This is Gina calling from Doctor Patel's office at Westview Medical Clinic. I'm calling to confirm your appointment scheduled for this Thursday, March 28th, at 2:30 in the afternoon. We ask that you arrive 15 minutes early to complete some updated patient forms. Also, please remember to bring your provincial health card and a list of any current medications you are taking. If you need to reschedule or if you have any questions, please call us back at 555-0147 before 4pm today. Our regular office hours are Monday to Friday, 8am to 5pm. We look forward to seeing you on Thursday. Thank you, and have a great day.`,
    displayScript: `[Voicemail from Westview Medical Clinic]

"Hi, this message is for Mr. James Chen. This is Gina calling from Dr. Patel's office at Westview Medical Clinic. I'm calling to confirm your appointment scheduled for this Thursday, March 28th, at 2:30 in the afternoon. We ask that you arrive 15 minutes early to complete some updated patient forms. Also, please remember to bring your provincial health card and a list of any current medications you are taking. If you need to reschedule or if you have any questions, please call us back at 555-0147 before 4pm today. Our regular office hours are Monday to Friday, 8am to 5pm. We look forward to seeing you on Thursday. Thank you, and have a great day."`,
    prompt: "What two items does the receptionist ask Mr. Chen to bring to the appointment?",
    options: [
      "His employee benefits card and a photo ID",
      "A referral letter and his previous test results",
      "His provincial health card and a list of current medications",
      "His insurance documents and his appointment confirmation",
    ],
    correct: 2,
    explanation: "The receptionist clearly states: 'please remember to bring your provincial health card and a list of any current medications you are taking.'",
    isPremium: false,
  },

  {
    part: 3,
    title: "Short Conversation",
    context: "Two university students, Marcus and Elena, are talking before class.",
    ttsScript: `Hey Elena, have you started on the biology group project yet?
Not really. I was waiting for us to divide the tasks first. What sections did Professor Kim assign us?
We have three topics: cell division, genetic mutations, and protein synthesis. I was thinking I'd take protein synthesis since I already have notes from last semester.
That makes sense. I'll take cell division then. I find that topic more interesting anyway.
Great. That leaves genetic mutations for James. Should we set a time to compare our research before the deadline?
How about Wednesday afternoon around 3pm? The campus library usually has quiet study rooms available.
Perfect. I'll text James right now to make sure he can make it.`,
    displayScript: `Marcus: Hey Elena, have you started on the biology group project yet?
Elena: Not really. I was waiting for us to divide the tasks first. What sections did Professor Kim assign us?
Marcus: We have three topics: cell division, genetic mutations, and protein synthesis. I was thinking I'd take protein synthesis since I already have notes from last semester.
Elena: That makes sense. I'll take cell division then. I find that topic more interesting anyway.
Marcus: Great. That leaves genetic mutations for James. Should we set a time to compare our research before the deadline?
Elena: How about Wednesday afternoon around 3pm? The campus library usually has quiet study rooms available.
Marcus: Perfect. I'll text James right now to make sure he can make it.`,
    prompt: "Which topic does Elena agree to research for the group project?",
    options: [
      "Protein synthesis",
      "Genetic mutations",
      "Cell division",
      "DNA replication",
    ],
    correct: 2,
    explanation: "Elena says 'I'll take cell division then — I find that topic more interesting anyway.'",
    isPremium: false,
  },

  {
    part: 4,
    title: "News Item",
    context: "Listen to a local radio news report.",
    ttsScript: `Good morning. You're listening to CKMT News Radio. In local news, the City of Riverside has announced that the downtown public library will undergo a major renovation beginning this Monday. The library will be closed to the public for approximately six weeks while crews upgrade the heating and ventilation system, install new flooring throughout the building, and expand the children's reading section by nearly double its current size. During the closure, residents can access library services at the Eastside Community Branch on Fifth Avenue. Library card holders may also request books through the online portal at citylibrary dot ca. The mayor expressed confidence that the project will be completed on schedule, with the library expected to reopen on May 12th. For renovation updates, follow the city's official social media accounts. Now let's check in with traffic.`,
    displayScript: `[CKMT News Radio — Morning Broadcast]

"Good morning. You're listening to CKMT News Radio. In local news, the City of Riverside has announced that the downtown public library will undergo a major renovation beginning this Monday. The library will be closed to the public for approximately six weeks while crews upgrade the heating and ventilation system, install new flooring throughout the building, and expand the children's reading section by nearly double its current size. During the closure, residents can access library services at the Eastside Community Branch on Fifth Avenue. Library card holders may also request books through the online portal at citylibrary.ca. The mayor expressed confidence that the project will be completed on schedule, with the library expected to reopen on May 12th. For renovation updates, follow the city's official social media accounts."`,
    prompt: "According to the news report, approximately how long will the library be closed for renovation?",
    options: [
      "Two weeks",
      "Four weeks",
      "Six weeks",
      "Eight weeks",
    ],
    correct: 2,
    explanation: "The reporter says the library 'will be closed to the public for approximately six weeks.'",
    isPremium: false,
  },

  // ─── PREMIUM: Parts 5–8 ──────────────────────────────────────────────────────

  {
    part: 5,
    title: "Workplace Discussion",
    context: "A manager is orienting a new employee named Michael on company policies.",
    ttsScript: `Welcome to your first week at Harrington Financial, Michael. I just want to walk you through a few important policies. Regarding vacation time, all full-time employees receive fifteen days per year. To request any vacation days, you'll need to submit your request through the HR portal at least two weeks in advance. For longer absences — anything over five consecutive business days — you'll also need your direct manager's written approval before submitting through the portal. For sick days, we have ten paid sick days annually. You simply notify your supervisor by 8am on the day you'll be absent — no advance approval is needed for that. We also have a work-from-home option. After your three-month probationary period, you can work remotely up to two days per week. Any questions so far?
That's really clear, thank you. Just to confirm — for a ten-day vacation, I would need both the two-week advance notice and my manager's written approval?
Exactly right.`,
    displayScript: `Manager: Welcome to your first week at Harrington Financial, Michael. I just want to walk you through a few important policies. Regarding vacation time, all full-time employees receive fifteen days per year. To request any vacation days, you'll need to submit your request through the HR portal at least two weeks in advance. For longer absences — anything over five consecutive business days — you'll also need your direct manager's written approval before submitting through the portal. For sick days, we have ten paid sick days annually. You simply notify your supervisor by 8am on the day you'll be absent — no advance approval is needed for that. We also have a work-from-home option. After your three-month probationary period, you can work remotely up to two days per week. Any questions so far?
Michael: That's really clear, thank you. Just to confirm — for a ten-day vacation, I would need both the two-week advance notice and my manager's written approval?
Manager: Exactly right.`,
    prompt: "According to the manager, what must an employee do BEFORE submitting a request for more than five consecutive days off?",
    options: [
      "Submit a doctor's medical certificate",
      "Obtain written approval from their direct manager",
      "Give one full month of advance notice",
      "Speak in person with the HR department",
    ],
    correct: 1,
    explanation: "The manager states: 'you'll also need your direct manager's written approval before submitting through the portal' for absences over five consecutive business days.",
    isPremium: true,
  },

  {
    part: 6,
    title: "Store Announcement",
    context: "You will hear a recorded in-store announcement at a furniture store.",
    ttsScript: `Attention valued customers, welcome to Greenfield Home Furnishings. We'd like to remind you of our store hours. Our regular weekday hours are Monday through Friday, 9am to 8pm. On Saturdays, we are open from 10am to 7pm. Please note that on Sundays, our hours are 11am to 5pm. This weekend only, we are hosting our Annual Spring Clearance Sale with up to 40 percent off selected furniture and home accessories. Our sale associates are positioned throughout the store and are happy to assist you. If you'd like to book a free interior design consultation, please speak with a team member at the Customer Service desk near the main entrance. We accept all major credit cards, debit, and cash. Thank you for choosing Greenfield Home Furnishings, and enjoy your shopping experience today.`,
    displayScript: `[Greenfield Home Furnishings — In-Store Announcement]

"Attention valued customers, welcome to Greenfield Home Furnishings. We'd like to remind you of our store hours. Our regular weekday hours are Monday through Friday, 9am to 8pm. On Saturdays, we are open from 10am to 7pm. Please note that on Sundays, our hours are 11am to 5pm. This weekend only, we are hosting our Annual Spring Clearance Sale with up to 40% off selected furniture and home accessories. Our sale associates are positioned throughout the store and are happy to assist you. If you'd like to book a free interior design consultation, please speak with a team member at the Customer Service desk near the main entrance. We accept all major credit cards, debit, and cash. Thank you for choosing Greenfield Home Furnishings, and enjoy your shopping experience today."`,
    prompt: "According to the announcement, what are the store's hours on Sundays?",
    options: [
      "9am to 8pm",
      "10am to 7pm",
      "11am to 5pm",
      "10am to 6pm",
    ],
    correct: 2,
    explanation: "The announcement states: 'on Sundays, our hours are 11am to 5pm.'",
    isPremium: true,
  },

  {
    part: 7,
    title: "Neighbourhood Conversation",
    context: "Two neighbours, Linda and Robert, are talking outside their homes.",
    ttsScript: `Hi Robert! Are you going to the neighbourhood barbecue this Saturday?
Oh, didn't you hear? They had to push it back. The park's sprinkler system malfunctioned overnight and flooded the entire picnic area. The grounds crew needs a few days to dry it out properly before it's safe to set up.
Oh no, that's too bad. When did they reschedule it to?
They moved it to the following Saturday, the 15th. Same time — noon until four.
Oh good, I can make that work. I was going to bring my potato salad anyway.
The organizers are asking everyone who signed up to bring a dish to still come. They updated the neighbourhood app with the new date about an hour ago.
Perfect. I'll check the app and update my RSVP. Thanks for letting me know, Robert.`,
    displayScript: `Linda: Hi Robert! Are you going to the neighbourhood barbecue this Saturday?
Robert: Oh, didn't you hear? They had to push it back. The park's sprinkler system malfunctioned overnight and flooded the entire picnic area. The grounds crew needs a few days to dry it out properly before it's safe to set up.
Linda: Oh no, that's too bad. When did they reschedule it to?
Robert: They moved it to the following Saturday, the 15th. Same time — noon until four.
Linda: Oh good, I can make that work. I was going to bring my potato salad anyway.
Robert: The organizers are asking everyone who signed up to bring a dish to still come. They updated the neighbourhood app with the new date about an hour ago.
Linda: Perfect. I'll check the app and update my RSVP. Thanks for letting me know, Robert.`,
    prompt: "Why was the neighbourhood barbecue rescheduled?",
    options: [
      "Not enough residents registered to attend",
      "The park's sprinkler system flooded the picnic area",
      "The event organizers had an unexpected conflict",
      "The weather forecast predicted heavy rain",
    ],
    correct: 1,
    explanation: "Robert explains: 'The park's sprinkler system malfunctioned overnight and flooded the entire picnic area.'",
    isPremium: true,
  },

  {
    part: 8,
    title: "Service Call",
    context: "A tenant named Maria is calling a property management office about a maintenance issue.",
    ttsScript: `Good afternoon, Riverside Property Management, how can I help you?
Hi, I'm calling about a maintenance issue in my apartment. This is Maria Gonzalez in unit 412.
Hi Maria, thanks for calling. What seems to be the problem?
The kitchen faucet has been dripping constantly for three days, and it's actually getting worse. On top of that, the sink is draining very slowly — it's starting to back up.
I'm sorry to hear that. I'll put in an urgent maintenance request for you right away. Our plumber is actually scheduled to be in the building tomorrow morning, so he should be able to look at both issues while he's there.
That's great news. Will I receive any kind of notification or confirmation?
Yes, absolutely. I'll send a confirmation text message to the phone number we have on file for you, along with an estimated arrival time so you know when to expect him.
Perfect, that's very helpful. Thank you so much.
Of course, Maria. Thank you for letting us know, and have a good afternoon.`,
    displayScript: `Property Manager: Good afternoon, Riverside Property Management, how can I help you?
Maria: Hi, I'm calling about a maintenance issue in my apartment. This is Maria Gonzalez in unit 412.
Property Manager: Hi Maria, thanks for calling. What seems to be the problem?
Maria: The kitchen faucet has been dripping constantly for three days, and it's actually getting worse. On top of that, the sink is draining very slowly — it's starting to back up.
Property Manager: I'm sorry to hear that. I'll put in an urgent maintenance request for you right away. Our plumber is actually scheduled to be in the building tomorrow morning, so he should be able to look at both issues while he's there.
Maria: That's great news. Will I receive any kind of notification or confirmation?
Property Manager: Yes, absolutely. I'll send a confirmation text message to the phone number we have on file for you, along with an estimated arrival time so you know when to expect him.
Maria: Perfect, that's very helpful. Thank you so much.
Property Manager: Of course, Maria. Thank you for letting us know, and have a good afternoon.`,
    prompt: "What does the property manager promise to send Maria?",
    options: [
      "An email with the repair cost estimate",
      "A confirmation text message and estimated arrival time",
      "A letter explaining the cause of the delay",
      "An updated copy of her lease agreement",
    ],
    correct: 1,
    explanation: "The property manager says: 'I'll send a confirmation text message to the phone number we have on file for you, along with an estimated arrival time.'",
    isPremium: true,
  },
];
