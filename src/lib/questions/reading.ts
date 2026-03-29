export type ReadingQuestion = {
  q: string;
  options: [string, string, string, string];
  correct: number; // 0-indexed
  explanation: string;
};

export type ReadingPart = {
  part: 1 | 2 | 3 | 4;
  partTitle: string;
  passageTitle: string;
  passageText: string;
  questions: ReadingQuestion[];
};

export type ReadingSet = {
  id: "mock-a" | "mock-b";
  name: string;
  parts: [ReadingPart, ReadingPart, ReadingPart, ReadingPart];
  totalQuestions: 38;
};

export const READING_SETS: ReadingSet[] = [
  {
    id: "mock-a",
    name: "Mock Test A",
    totalQuestions: 38,
    parts: [
      {
        part: 1,
        partTitle: "Reading Correspondence",
        passageTitle: "Tenant Complaint and Property Management Response",
        passageText: `EMAIL 1 — From Tenant to Property Management

From: Marcus Webb <m.webb@personalmail.ca>
To: Lakeview Property Management <info@lakeviewpm.ca>
Date: February 5, 2024
Subject: Ongoing Maintenance Failures — Unit 4B, 220 Harlow Drive

Dear Lakeview Property Management,

I am writing to formally document my continued dissatisfaction with the maintenance services provided at my unit, 4B, located at 220 Harlow Drive. Over the past four weeks, I have experienced three separate and serious maintenance failures that have significantly disrupted my daily life and, in my view, constitute negligence on the part of your management team.

The first incident occurred on January 10th, when a burst pipe in my kitchen ceiling caused water to leak into my living space for nearly six hours before a technician arrived. Although the immediate leak was eventually stopped, no follow-up inspection was conducted to assess potential water damage to the walls or flooring.

The second incident took place on January 24th, when the building's central heating system failed entirely. My unit reached an indoor temperature of 12 degrees Celsius. I was not notified in advance, and when I called your emergency line, I was placed on hold for over forty minutes before speaking to anyone. The heat was restored the following day, but I was not offered any temporary accommodation or compensation.

The third and most concerning incident occurred on February 3rd, when I discovered visible black mould growing along the baseboards in my bathroom. I am deeply concerned that this mould may be connected to the unaddressed water damage from January 10th. I have photographed the affected area and can provide documentation upon request.

I am respectfully requesting that your company rectify these issues immediately by (1) conducting a full inspection of my unit for water damage and mould, (2) providing written confirmation of the repairs planned and their scheduled dates, and (3) compensating me appropriately for the inconvenience and potential health hazards I have been subjected to.

Please be advised that if I do not receive a satisfactory response within five business days, I will have no choice but to contact the Ontario Tenant Board and seek independent legal counsel.

Sincerely,
Marcus Webb
Tenant, Unit 4B — 220 Harlow Drive


---


EMAIL 2 — From Property Management to Tenant

From: Lakeview Property Management <info@lakeviewpm.ca>
To: Marcus Webb <m.webb@personalmail.ca>
Date: February 7, 2024
Subject: RE: Ongoing Maintenance Failures — Unit 4B, 220 Harlow Drive

Dear Mr. Webb,

Thank you for taking the time to write to us and for bringing these matters to our attention in detail. We sincerely apologize for the inconvenience you have experienced and acknowledge that our response times during the January heating failure did not meet our own standards.

We would like to address each of your concerns:

Regarding the pipe burst on January 10th: Our records confirm that a technician attended the unit and completed the immediate repair. We agree that a follow-up inspection should have been scheduled and was not. We apologize for this oversight.

Regarding the heating failure on January 24th: We recognize that our emergency line response was unacceptably slow on that evening. We are currently reviewing our after-hours support procedures to prevent a recurrence. We are pleased to confirm that the heating system has since been fully serviced and is functioning normally.

Regarding the mould in your bathroom: We take this matter very seriously. A licensed mould remediation specialist has been booked to visit your unit on February 15th between 9:00 a.m. and 12:00 p.m. Please ensure that access to the bathroom is available. If that time is not convenient, please contact our office directly at 1-800-555-4729 to reschedule.

As a gesture of goodwill, we would like to apply a credit of $100.00 to your February rent invoice. We understand this does not fully address the disruption you have experienced, but we hope it reflects our commitment to improving your experience as a resident.

We look forward to resolving these matters to your satisfaction and thank you for your continued tenancy.

Warm regards,
Sandra Okonkwo
Resident Relations Manager
Lakeview Property Management`,
        questions: [
          {
            q: "What is the primary purpose of Marcus Webb's email?",
            options: [
              "To request a reduction in monthly rent",
              "To formally document multiple maintenance failures and demand resolution",
              "To introduce himself as a new tenant at 220 Harlow Drive",
              "To report a single plumbing emergency to the building manager",
            ],
            correct: 1,
            explanation:
              "Marcus Webb explicitly states he is 'writing to formally document my continued dissatisfaction' and lists three separate incidents before making specific demands. The email is not solely about rent, a single issue, or introduction.",
          },
          {
            q: "How many separate maintenance incidents does Marcus Webb describe in his email?",
            options: ["Two", "Four", "Three", "Five"],
            correct: 2,
            explanation:
              "Marcus Webb describes exactly three incidents: the burst pipe on January 10th, the heating failure on January 24th, and the mould discovered on February 3rd.",
          },
          {
            q: "As used in the email, the word 'negligence' most closely means:",
            options: [
              "Intentional harm caused by a landlord",
              "A failure to provide adequate care or attention",
              "A legal violation of tenant rights",
              "A delay in responding to emergency calls",
            ],
            correct: 1,
            explanation:
              "Negligence refers to a failure to exercise reasonable care. Marcus uses it to suggest the management team did not adequately attend to their responsibilities — not necessarily intentional harm, a legal violation specifically, or just delayed calls.",
          },
          {
            q: "Where exactly did Marcus discover the mould?",
            options: [
              "Along the kitchen ceiling near the burst pipe",
              "In the hallway adjacent to the heating unit",
              "Along the baseboards in his bathroom",
              "On the walls of his living room",
            ],
            correct: 2,
            explanation:
              "The passage states explicitly: 'I discovered visible black mould growing along the baseboards in my bathroom.' Other locations are plausible distractors but are not mentioned.",
          },
          {
            q: "What does Lakeview Property Management offer Marcus as compensation?",
            options: [
              "A full month of free rent",
              "Temporary accommodation for the duration of the repairs",
              "A $100 credit applied to his February rent",
              "A written apology and a discount on future renewals",
            ],
            correct: 2,
            explanation:
              "The company's email states: 'we would like to apply a credit of $100.00 to your February rent invoice.' No full-month waiver, accommodation, or renewal discount is mentioned.",
          },
          {
            q: "What does Lakeview Property Management acknowledge about the heating failure on January 24th?",
            options: [
              "The heating system has not yet been fully repaired",
              "The emergency line response was unacceptably slow",
              "The tenant was offered temporary hotel accommodation",
              "The failure was caused by damage from the January 10th pipe burst",
            ],
            correct: 1,
            explanation:
              "The company's email explicitly states: 'we recognize that our emergency line response was unacceptably slow on that evening.' It does not say repairs are unfinished, that accommodation was offered, or link the events causally.",
          },
          {
            q: "The word 'rectify' as used in Marcus Webb's email most closely means:",
            options: [
              "Document in writing for legal purposes",
              "Correct or fix a problem",
              "Provide financial compensation",
              "Report to a government authority",
            ],
            correct: 1,
            explanation:
              "Marcus uses 'rectify' when asking the company to fix the ongoing problems. The word means to put something right or correct it. It does not specifically mean documenting, compensating, or reporting.",
          },
          {
            q: "What does Marcus threaten to do if he does not receive a satisfactory response?",
            options: [
              "Move out immediately and withhold the security deposit",
              "Publish a negative review on a public housing website",
              "Contact the Ontario Tenant Board and seek legal counsel",
              "Have the mould independently tested at his own cost",
            ],
            correct: 2,
            explanation:
              "Marcus states: 'I will have no choice but to contact the Ontario Tenant Board and seek independent legal counsel.' He does not threaten to withhold deposit, write reviews, or test the mould independently.",
          },
          {
            q: "What is the overall tone of Marcus Webb's email?",
            options: [
              "Casual and friendly, with informal language",
              "Hostile and threatening throughout",
              "Formal and firm, with polite but serious complaints",
              "Apologetic and uncertain about the validity of his claims",
            ],
            correct: 2,
            explanation:
              "Marcus uses formal language ('I am respectfully requesting,' 'please be advised') while clearly stating dissatisfaction and making firm demands. He is not casual, not purely hostile from the start, and not apologetic.",
          },
          {
            q: "Based on the property management's response, what can be inferred about the repair scheduled for February 15th?",
            options: [
              "The repair will address all three issues Marcus raised",
              "The technician will specifically address the mould in the bathroom",
              "The repair will focus on the central heating system",
              "The visit will assess whether Marcus qualifies for a larger credit",
            ],
            correct: 1,
            explanation:
              "The February 15th visit is described specifically in connection with the mould: 'A licensed mould remediation specialist has been booked to visit your unit on February 15th.' The other issues are addressed separately in the letter.",
          },
          {
            q: "If Marcus cannot attend the scheduled February 15th appointment, what should he do according to the property management's email?",
            options: [
              "Send a written letter to Sandra Okonkwo requesting a new date",
              "Call the office directly at 1-800-555-4729 to reschedule",
              "Contact the Ontario Tenant Board to arrange access",
              "Email the management team to defer the appointment by 30 days",
            ],
            correct: 1,
            explanation:
              "The email states: 'please contact our office directly at 1-800-555-4729 to reschedule.' No mention is made of a written letter, the Tenant Board, or a 30-day deferral policy.",
          },
        ],
      },
      {
        part: 2,
        partTitle: "Reading to Apply a Diagram",
        passageTitle: "Ontario Health Card Application — Applicant Guide",
        passageText: `ONTARIO HEALTH CARD APPLICATION GUIDE
Issued by: Ontario Ministry of Health — ServiceOntario
Document Version: 2024-01

PURPOSE OF THIS GUIDE
This guide explains how to apply for, renew, or replace your Ontario Health Insurance Plan (OHIP) health card. Please read all sections carefully before attending your appointment at a ServiceOntario location. Applications submitted without the correct documentation will not be processed.

---

WHO MUST APPLY?

There are three categories of applicants. Identify your category before gathering your documents.

CATEGORY A — New Resident (First-Time Applicants)
You fall into this category if you have never held an Ontario health card, have recently moved to Ontario from another Canadian province or territory, or have recently arrived in Canada as a permanent resident, refugee claimant, or protected person.

CATEGORY B — Renewal
You fall into this category if your current Ontario health card has expired or is set to expire within the next 60 days. Renewal applicants must attend in person and cannot renew by mail or online.

CATEGORY C — Replacement
You fall into this category if your current card has been lost, stolen, or damaged. Your eligibility status has not changed and your card remains valid if found.

---

REQUIRED DOCUMENTS BY CATEGORY

All applicants must bring:
• One piece of government-issued photo identification (e.g., passport, driver's licence, permanent resident card)

CATEGORY A (New Resident) must also bring:
• Proof of Ontario residency (e.g., utility bill, bank statement, or lease agreement dated within the last 90 days)
• Proof of immigration status or Canadian citizenship (e.g., citizenship certificate, study permit, work permit, confirmation of permanent residence)
• Note: Proof of residency must show a physical Ontario address. P.O. Boxes are not accepted.

CATEGORY B (Renewal) must also bring:
• Your existing (expiring or recently expired) health card
• Proof of Ontario residency (same requirements as Category A)

CATEGORY C (Replacement) must also bring:
• A completed Statutory Declaration form (available at any ServiceOntario office or online at ontario.ca/serviceontario)
• If your card was stolen, a copy of your police report is strongly recommended

---

PROCESSING TIMES

Category A (New Resident): 6–8 weeks from date of application. Interim coverage is available; ask ServiceOntario staff for a temporary validation form at the time of your appointment.

Category B (Renewal): 2–3 weeks. Your existing card remains valid until it expires. Begin the renewal process at least 60 days before the expiry date.

Category C (Replacement): Interim coverage form issued same day. Replacement card arrives within 4–6 weeks.

---

SPECIAL INSTRUCTIONS

International Students:
International students on a valid study permit are eligible to apply after completing three consecutive months of residency in Ontario. You must bring your study permit, acceptance letter from an Ontario institution, and proof of residency in Ontario.

Temporary Foreign Workers:
Temporary foreign workers with a work permit valid for six months or longer are eligible. You must bring your work permit, employer's letter of support, and proof of Ontario residency.

Workers with work permits valid for less than six months are not eligible for OHIP and should contact their employer for private health insurance options.

---

CONTACT INFORMATION
ServiceOntario Health Card Inquiries: 1-800-664-8988
Hours: Monday–Friday, 8:30 a.m. to 5:00 p.m.`,
        questions: [
          {
            q: "Amara recently moved to Ontario from British Columbia. She has never held an Ontario health card. Which category should she apply under?",
            options: [
              "Category B — Renewal, because she held a health card in BC",
              "Category A — New Resident, because she has never held an Ontario health card",
              "Category C — Replacement, because her BC card is still valid",
              "She is not eligible to apply because she is a Canadian citizen, not an immigrant",
            ],
            correct: 1,
            explanation:
              "The guide states that Category A includes people who 'have recently moved to Ontario from another Canadian province or territory.' Amara fits this description. Category B is for renewals of existing Ontario cards, and Category C is for lost/stolen/damaged cards.",
          },
          {
            q: "Jin-ho's Ontario health card expires in 45 days. He wants to renew it. According to the guide, what is true about his renewal?",
            options: [
              "He must wait until the card has already expired before renewing",
              "He can renew by mail to avoid attending in person",
              "He must attend in person and can begin renewal since expiry is within 60 days",
              "He must apply as a new resident because his card will soon expire",
            ],
            correct: 2,
            explanation:
              "The guide states renewal applicants 'must attend in person and cannot renew by mail or online' and advises beginning 'at least 60 days before the expiry date.' Since his card expires in 45 days, he qualifies and must go in person.",
          },
          {
            q: "Maria is a Category A applicant. Which document will NOT be accepted as proof of Ontario residency?",
            options: [
              "A utility bill dated 60 days ago showing her apartment address",
              "A lease agreement for her Ontario apartment signed last month",
              "A bank statement from 3 months ago showing her Ontario address",
              "A P.O. Box listed on her bank statement",
            ],
            correct: 3,
            explanation:
              "The guide explicitly states: 'Proof of residency must show a physical Ontario address. P.O. Boxes are not accepted.' A utility bill, lease, or bank statement dated within 90 days showing a physical address would be acceptable.",
          },
          {
            q: "How long does it typically take for a Category A (New Resident) applicant to receive their health card?",
            options: [
              "2–3 weeks after the application is submitted",
              "4–6 weeks after the application is submitted",
              "6–8 weeks from the date of application",
              "Same day, with a temporary card issued at the appointment",
            ],
            correct: 2,
            explanation:
              "The guide states under Processing Times: 'Category A (New Resident): 6–8 weeks from date of application.' A temporary validation form is available, but the actual card takes 6–8 weeks.",
          },
          {
            q: "David is an international student on a valid study permit who moved to Ontario 10 weeks ago. Is he eligible to apply for OHIP?",
            options: [
              "No, because international students are never eligible for OHIP",
              "Yes, because he has completed more than three consecutive months in Ontario",
              "No, because he has not yet completed three consecutive months in Ontario",
              "Yes, but only if he brings his employer's letter of support",
            ],
            correct: 2,
            explanation:
              "The guide states international students are 'eligible to apply after completing three consecutive months of residency in Ontario.' Ten weeks is less than three months (approximately 12–13 weeks), so David is not yet eligible.",
          },
          {
            q: "Sunita's health card was stolen last week. Which of the following should she bring to her ServiceOntario appointment?",
            options: [
              "Her existing health card and a utility bill",
              "A completed Statutory Declaration form, photo ID, and ideally a police report",
              "Only a government-issued photo ID, since her status has not changed",
              "Her immigration documents and proof of residency",
            ],
            correct: 1,
            explanation:
              "Category C (Replacement) applicants must bring: photo ID (required by all), a completed Statutory Declaration form, and a police report is 'strongly recommended' for stolen cards. The guide does not require immigration documents for replacements.",
          },
          {
            q: "A temporary foreign worker holds a work permit valid for four months. According to the guide, what should he do?",
            options: [
              "Apply under Category A since he is new to Ontario",
              "Apply under Category C since his status is temporary",
              "Contact his employer about private health insurance, as he is not eligible for OHIP",
              "Wait until his permit is extended before applying for OHIP",
            ],
            correct: 2,
            explanation:
              "The guide states: 'Workers with work permits valid for less than six months are not eligible for OHIP and should contact their employer for private health insurance options.' Four months is less than six months.",
          },
          {
            q: "Which of the following best describes the purpose of this guide?",
            options: [
              "To explain the benefits covered under the Ontario health insurance plan",
              "To instruct applicants on how to prepare for and complete their health card application",
              "To compare Ontario's health system with those of other provinces",
              "To outline the penalties for submitting an incomplete health card application",
            ],
            correct: 1,
            explanation:
              "The guide's purpose statement reads: 'This guide explains how to apply for, renew, or replace your Ontario Health Insurance Plan (OHIP) health card.' It focuses on the application process and required documents, not benefits, comparisons, or penalties.",
          },
        ],
      },
      {
        part: 3,
        partTitle: "Reading for Information",
        passageTitle:
          "Understanding Canada's National Occupational Classification System",
        passageText: `Understanding Canada's National Occupational Classification System

When newcomers arrive in Canada with professional experience and academic credentials from other countries, one of their first challenges is understanding how their skills translate into the Canadian labour market. A central tool in this process is the National Occupational Classification (NOC) system — a standardized framework developed by Employment and Social Development Canada (ESDC) that organizes and describes every occupation in the Canadian workforce.

The NOC was created to bring consistency and clarity to how jobs are categorized across industries, provinces, and government programs. Rather than relying on informal job titles that may vary from employer to employer, the NOC assigns each occupation a unique five-digit code and a standardized description. As of the 2021 revision, the system covers more than 500 distinct occupations, with detailed information on the typical duties, required education, and working conditions for each role.

The most significant change introduced in the 2021 update was the replacement of the old skill-level system with a new classification structure called TEER — Training, Education, Experience, and Responsibilities. The TEER framework organizes all occupations into six categories, numbered 0 through 5.

TEER 0 includes management and executive-level positions, such as chief executives, senior managers, and directors. These roles typically require significant experience and decision-making authority. TEER 1 encompasses occupations that generally require a university degree, such as engineers, accountants, and physicians. TEER 2 covers jobs that usually require a college diploma, apprenticeship training, or at least two years of post-secondary education — examples include paramedics and industrial mechanics. TEER 3 includes roles requiring an apprenticeship of less than two years, a secondary school diploma with additional on-the-job training, or over six months of work experience, such as bakers, dental assistants, and heavy-duty equipment operators. TEER 4 encompasses occupations needing secondary school education and limited on-the-job training, such as retail salespersons and driver's licence examiners. Finally, TEER 5 includes jobs that require only short demonstrations or on-the-job training, such as cleaners, landscapers, and some agricultural workers.

For immigrants applying through federal programs such as Express Entry, the NOC code attached to their primary occupation plays a critical role in determining eligibility. Under the Canadian Experience Class, Federal Skilled Worker, and Federal Skilled Trades programs, only applicants whose work experience falls under specific TEER categories qualify. As a general rule, applicants must have worked in a TEER 0, 1, 2, or 3 occupation to be eligible for most federal immigration streams.

Beyond immigration, the NOC system is used extensively by employers, career counsellors, researchers, and government statisticians. Labour market data — including employment rates, average wages, and projected job growth — is organized and published using NOC codes, which makes it easier to track workforce trends across the country.

Critics of the system note that not all job duties fit neatly into a single NOC code, particularly in emerging fields like artificial intelligence, renewable energy, and remote work-based roles. ESDC updates the NOC periodically to address these gaps, but there can be a lag between when new occupations become common in the labour market and when they receive their own standardized code. Despite these limitations, the NOC remains the most comprehensive and widely accepted framework for occupational classification in Canada.`,
        questions: [
          {
            q: "What is the main purpose of the National Occupational Classification (NOC) system?",
            options: [
              "To determine the wages employers must pay workers in each occupation",
              "To organize and describe every occupation in the Canadian workforce using a standardized framework",
              "To assess the foreign credentials of newcomers arriving in Canada",
              "To track immigration applications made through the Express Entry program",
            ],
            correct: 1,
            explanation:
              "The article states the NOC is 'a standardized framework developed by ESDC that organizes and describes every occupation in the Canadian workforce.' It is not a wage-setting tool, credential assessment, or immigration tracker.",
          },
          {
            q: "How many distinct occupations does the NOC system cover as of the 2021 revision?",
            options: [
              "Approximately 200 distinct occupations",
              "More than 500 distinct occupations",
              "Exactly 450 distinct occupations",
              "Over 1,000 distinct occupations",
            ],
            correct: 1,
            explanation:
              "The article explicitly states: 'As of the 2021 revision, the system covers more than 500 distinct occupations.' The other numbers are not mentioned in the passage.",
          },
          {
            q: "According to the article, which TEER category would most likely include a licensed electrician who completed a two-year apprenticeship program?",
            options: [
              "TEER 1, because electricians require specialized technical knowledge",
              "TEER 2, because the role requires a college diploma or apprenticeship training",
              "TEER 3, because it involves on-the-job training with limited formal education",
              "TEER 0, because trades workers often hold supervisory responsibilities",
            ],
            correct: 1,
            explanation:
              "The article states TEER 2 covers 'jobs that usually require a college diploma, apprenticeship training, or at least two years of post-secondary education.' A two-year apprenticeship fits this description precisely.",
          },
          {
            q: "As used in the article, the word 'encompasses' most closely means:",
            options: [
              "Excludes or limits to a narrow set",
              "Requires or makes mandatory",
              "Includes or covers a range of",
              "Promotes or advocates for",
            ],
            correct: 2,
            explanation:
              "In context, 'TEER 1 encompasses occupations that generally require a university degree' means TEER 1 includes or covers those occupations. The word means to include or contain a range of things.",
          },
          {
            q: "What was the most significant change introduced by the 2021 update to the NOC?",
            options: [
              "The addition of more than 500 new occupational codes",
              "The creation of a federal immigration eligibility list",
              "The replacement of the old skill-level system with the TEER framework",
              "The introduction of wage data organized by occupational category",
            ],
            correct: 2,
            explanation:
              "The article states: 'The most significant change introduced in the 2021 update was the replacement of the old skill-level system with a new classification structure called TEER.' The other options are not described as the most significant change.",
          },
          {
            q: "According to the article, for which federal immigration programs does the NOC code matter most?",
            options: [
              "Provincial nominee programs operated by each province independently",
              "Express Entry programs including Canadian Experience Class and Federal Skilled Worker",
              "Refugee resettlement programs managed by Immigration, Refugees and Citizenship Canada",
              "International student visa programs managed by universities",
            ],
            correct: 1,
            explanation:
              "The article specifically mentions: 'Under the Canadian Experience Class, Federal Skilled Worker, and Federal Skilled Trades programs, only applicants whose work experience falls under specific TEER categories qualify.' These are Express Entry streams.",
          },
          {
            q: "What criticism of the NOC system does the author acknowledge?",
            options: [
              "The system is biased toward applicants from certain countries",
              "Not all job duties fit neatly into a single NOC code, particularly in emerging fields",
              "The TEER framework makes it harder for immigrants to qualify for immigration",
              "The system has not been updated since its original release",
            ],
            correct: 1,
            explanation:
              "The article states: 'Critics of the system note that not all job duties fit neatly into a single NOC code, particularly in emerging fields like artificial intelligence, renewable energy, and remote work-based roles.' The other criticisms are not mentioned.",
          },
          {
            q: "Why does the author mention bakers, dental assistants, and heavy-duty equipment operators?",
            options: [
              "To argue that skilled trades workers are undervalued in the NOC system",
              "To show that TEER 3 occupations are the most common in Canada",
              "To provide concrete examples of occupations that fall under TEER 3",
              "To compare wages between TEER 3 and TEER 2 workers",
            ],
            correct: 2,
            explanation:
              "The author lists these occupations immediately after describing TEER 3, using 'such as' to introduce them. They serve as concrete examples to illustrate what types of jobs fall in that category, making an abstract classification more relatable.",
          },
          {
            q: "Based on the article, what can be inferred about a pharmacist who holds a university degree and applies to immigrate to Canada through Express Entry?",
            options: [
              "The pharmacist would not qualify because pharmacy is not listed in the NOC",
              "The pharmacist would likely qualify, as pharmacy is a TEER 1 occupation requiring a university degree",
              "The pharmacist would need to apply under TEER 3 because pharmacy involves on-the-job training",
              "The pharmacist's qualifications cannot be evaluated without knowing the province of destination",
            ],
            correct: 1,
            explanation:
              "TEER 1 covers occupations 'that generally require a university degree, such as engineers, accountants, and physicians.' A pharmacist with a university degree fits TEER 1, and TEER 0–3 occupations qualify for most federal immigration streams.",
          },
        ],
      },
      {
        part: 4,
        partTitle: "Reading for Viewpoints",
        passageTitle:
          "Cities Must Ban Single-Use Plastics at Major Events / Response: Bans Punish Vendors Unfairly",
        passageText: `ARTICLE: Cities Must Ban Single-Use Plastics at Major Events

Every summer, cities across Canada host thousands of outdoor festivals, sporting events, and concerts that draw hundreds of thousands of attendees. These events are cultural and economic engines — they bring communities together, support local businesses, and generate tourism revenue. But they also leave behind an enormous environmental footprint, one that falls disproportionately on the cities and taxpayers who host them.

According to data compiled by several Canadian municipalities, cities collectively spend an estimated $2 million annually on cleanup operations following major public events. A significant portion of this cost is driven by the sheer volume of single-use plastic waste — water bottles, food packaging, straws, cutlery, and plastic bags — that attendees discard carelessly throughout venues and surrounding public spaces. This waste does not simply disappear after the event ends. It clogs storm drains, contaminates waterways, and harms urban wildlife.

Opponents of event-based plastic bans often argue that convenience drives attendee satisfaction. But this argument misunderstands the nature of behavioural change. Habits are formed through consistent exposure to new norms. When bans are enforced thoughtfully — with adequate water refill stations, compostable packaging options, and clear signage — attendees adapt quickly. Research from cities in the United Kingdom and Australia that have implemented event-based bans shows that attendee satisfaction scores remained stable even after the removal of single-use plastics from large festivals.

Additionally, banning single-use plastics at events sends a powerful cultural signal. It communicates that environmental responsibility is not optional — that it is a shared community value. The role of policy is not only to manage existing behaviour but to set standards that redefine what normal looks like. Cities that have taken this step have reported measurable improvements in overall recycling participation rates in the months following major events, suggesting that temporary event-based norms can influence longer-term civic behaviour.

Critics point out that some vendors — particularly small food sellers and emerging entrepreneurs — may face additional costs when switching to compostable packaging. This is a legitimate concern and should not be dismissed. However, the appropriate response is to design phase-in timelines that give businesses adequate preparation time, and to offer municipal subsidies for packaging transitions where feasible. The burden should not be used as an excuse to abandon a policy that serves the public interest.

The environmental and financial arguments for banning single-use plastics at major events are clear. The question is not whether to act, but how to act thoughtfully so that the transition is fair, effective, and lasting.

---

LETTER TO THE EDITOR: Bans Punish Vendors Disproportionately

The recent discussion about banning single-use plastics at public events has overlooked the very people who will bear the greatest cost of this policy: small-scale food vendors.

Compostable packaging currently costs between 30 and 50 percent more than conventional plastic alternatives. For a food vendor operating at a weekend festival with thin margins, this difference can make the gap between profit and loss. Unlike large corporate concession companies that can absorb transition costs across multiple revenue streams, independent vendors lack that financial cushion.

Proponents of such bans suggest that municipal subsidies could offset these costs. But subsidies are never guaranteed, are often insufficient, and create a new layer of bureaucratic dependence that small businesses can ill afford. In practice, subsidies are inconsistently applied and frequently delayed — meaning vendors must absorb higher costs upfront with only a vague promise of reimbursement.

Furthermore, not all reusable or compostable alternatives are practical for every type of food product. Hot liquids, oily foods, and heavily portioned meals require packaging with specific structural and moisture-resistance properties. Compostable options that meet these standards are available, but they remain significantly more expensive and are not yet widely distributed through standard supply channels in many Canadian cities.

The article's author rightly acknowledges vendor concerns but ultimately dismisses them in favour of broad policy goals. This is precisely the pattern of top-down environmental regulation that erodes trust between city governments and the small business community. Effective environmental policy should be built on partnership, not mandates that protect one public interest at the expense of another.

— Name Withheld, Festival Food Vendor, Saskatoon`,
        questions: [
          {
            q: "What is the main argument of the first article?",
            options: [
              "Canadian cities are failing to invest adequately in event cleanup operations",
              "Single-use plastic bans at major events are environmentally and financially justified",
              "Attendees at outdoor events are primarily responsible for plastic waste problems",
              "Cultural events should be reduced in frequency to lower environmental impact",
            ],
            correct: 1,
            explanation:
              "The article argues throughout that banning single-use plastics at events is both environmentally beneficial and financially sensible, citing cleanup costs, behavioural research, and cultural norm-setting. It does not argue for reducing events or place sole blame on attendees.",
          },
          {
            q: "According to the first article, how much do Canadian cities collectively spend annually on event cleanup?",
            options: [
              "Approximately $500,000",
              "Approximately $1 million",
              "An estimated $2 million",
              "More than $5 million",
            ],
            correct: 2,
            explanation:
              "The article states: 'cities collectively spend an estimated $2 million annually on cleanup operations following major public events.' The other amounts are not mentioned.",
          },
          {
            q: "What evidence does the first article use to counter the argument that bans reduce attendee satisfaction?",
            options: [
              "A Statistics Canada survey showing that Canadians prefer reusable packaging",
              "Research from UK and Australian cities showing satisfaction scores remained stable after bans",
              "Data showing a decline in event attendance after bans were introduced",
              "Interviews with festival organizers who support single-use plastic restrictions",
            ],
            correct: 1,
            explanation:
              "The author cites 'research from cities in the United Kingdom and Australia that have implemented event-based bans shows that attendee satisfaction scores remained stable.' No Canadian survey, attendance decline, or organizer interviews are cited.",
          },
          {
            q: "How does the first article characterize the concern about extra costs for small vendors?",
            options: [
              "It dismisses the concern entirely, arguing vendors benefit from bans long-term",
              "It acknowledges the concern as legitimate but argues it should not prevent the policy",
              "It ignores the concern and focuses only on environmental arguments",
              "It argues that all vendors are equally capable of absorbing higher packaging costs",
            ],
            correct: 1,
            explanation:
              "The author writes: 'This is a legitimate concern and should not be dismissed. However, the appropriate response is to design phase-in timelines.' The concern is acknowledged but not treated as a reason to abandon the policy.",
          },
          {
            q: "What is the main argument of the letter to the editor?",
            options: [
              "Single-use plastics are not as harmful as the article suggests",
              "Plastic bans at events unfairly burden small-scale food vendors who lack resources to adapt",
              "Municipal subsidies are the best solution to addressing vendor concerns about bans",
              "Environmental regulations should be managed by provincial governments, not cities",
            ],
            correct: 1,
            explanation:
              "The letter argues that 'small-scale food vendors' bear the greatest cost of the policy, that compostable packaging is significantly more expensive, and that subsidies are unreliable. The letter's central point is that the ban is disproportionately harmful to small vendors.",
          },
          {
            q: "According to the letter writer, why are municipal subsidies an inadequate solution?",
            options: [
              "Because vendors have already invested in plastic packaging and cannot switch easily",
              "Because subsidies are inconsistently applied, often insufficient, and frequently delayed",
              "Because the city has already confirmed there is no budget available for vendor support",
              "Because large corporations receive a greater share of the subsidies than small vendors",
            ],
            correct: 1,
            explanation:
              "The letter states subsidies 'are never guaranteed, are often insufficient, and create a new layer of bureaucratic dependence' and are 'inconsistently applied and frequently delayed.' The other claims are not made in the letter.",
          },
          {
            q: "How does the letter writer characterize the first article's treatment of vendor concerns?",
            options: [
              "As thorough and balanced, with practical solutions offered",
              "As sympathetic but ultimately dismissive in favour of broad policy goals",
              "As uninformed and based on incorrect financial data",
              "As overly focused on the concerns of large corporate vendors",
            ],
            correct: 1,
            explanation:
              "The letter writer states: 'The article's author rightly acknowledges vendor concerns but ultimately dismisses them in favour of broad policy goals.' This captures the letter writer's critique precisely.",
          },
          {
            q: "The phrase 'thin margins' as used in the letter most closely refers to:",
            options: [
              "A small gap between food vendor stalls at an outdoor festival",
              "A limited financial profit remaining after covering costs",
              "A narrow range of products that a vendor sells",
              "A short time window during which vendors can operate at events",
            ],
            correct: 1,
            explanation:
              "In the context of 'a food vendor operating at a weekend festival with thin margins,' the phrase means the vendor makes very little profit after expenses. The other interpretations misread the financial idiom.",
          },
          {
            q: "Both the article and the letter agree on which of the following points?",
            options: [
              "Compostable packaging is not yet practical for most food vendors",
              "Small food vendors face real additional costs when switching from plastic packaging",
              "Municipal subsidies are an effective and reliable solution to vendor concerns",
              "Attendee satisfaction is more important than environmental outcomes at events",
            ],
            correct: 1,
            explanation:
              "The article acknowledges vendor costs as 'a legitimate concern,' while the letter details the 30–50% higher cost of compostable packaging. Both texts agree vendors face real additional costs. They disagree on whether this justifies blocking the ban.",
          },
          {
            q: "What can be inferred about the letter writer's overall view of environmental regulations?",
            options: [
              "The letter writer opposes all environmental regulation as economically harmful",
              "The letter writer believes good environmental policy should involve small businesses as partners, not subjects of mandates",
              "The letter writer believes provincial governments should set all environmental standards",
              "The letter writer supports plastic bans but only in corporate-operated venues",
            ],
            correct: 1,
            explanation:
              "The letter's final sentence states: 'Effective environmental policy should be built on partnership, not mandates that protect one public interest at the expense of another.' This suggests support for collaborative policy design, not blanket opposition to regulation.",
          },
        ],
      },
    ],
  },
  {
    id: "mock-b",
    name: "Mock Test B",
    totalQuestions: 38,
    parts: [
      {
        part: 1,
        partTitle: "Reading Correspondence",
        passageTitle: "Freelance Dispute Over Payment Withholding",
        passageText: `EMAIL 1 — From Freelancer to Client

From: Priya Nair <priya.nair.design@gmail.com>
To: Brightmark Creative <accounts@brightmarkcreative.com>
Date: March 12, 2024
Subject: Dispute Regarding Withheld Payment — Project: Halcyon Brand Package

Dear Brightmark Creative Accounts Team,

I am writing to formally dispute the decision to withhold the final payment installment of $3,200 for the Halcyon Brand Package project, completed under the contract signed on November 14, 2023.

As outlined in Section 4.2 of our signed contract, the final payment is due upon delivery of all agreed deliverables and the completion of any revision requests within the 30-day revision window. I delivered all final files — including the logo suite, brand guidelines document, and stationery templates — on February 1, 2024, which is 78 days after the contract was signed. This is well within any reasonable timeline for a project of this scope.

Between February 1st and February 20th, your team submitted three revision requests, all of which I completed and redelivered within 48 hours of each request. The 30-day revision window closed on March 3, 2024. No further revision requests were received after February 20th. I therefore consider all contractual obligations on my part to have been fully met.

Your email of March 8th stated that the final delivery "did not meet the full scope of the project." However, your message did not specify which elements were allegedly missing or below standard. The scope of work, as itemized in Appendix A of our contract, lists the following deliverables: primary logo, secondary logo, colour palette document, typography guide, business card template, letterhead template, and email signature template. I have confirmation receipts for all seven items, which I can provide if required.

I respectfully request that you either (a) release the withheld payment of $3,200 within five business days, or (b) provide a written and specific description of any outstanding scope items you believe have not been delivered. Vague references to unmet scope are not a contractual basis for withholding payment.

Please be aware that I have documented all project communications and deliverables and am prepared to escalate this matter to a freelance dispute mediator or small claims court if a resolution is not reached promptly.

Sincerely,
Priya Nair
Freelance Graphic Designer


---


EMAIL 2 — From Client to Freelancer

From: Brightmark Creative <accounts@brightmarkcreative.com>
To: Priya Nair <priya.nair.design@gmail.com>
Date: March 14, 2024
Subject: RE: Dispute Regarding Withheld Payment — Project: Halcyon Brand Package

Dear Ms. Nair,

Thank you for your email and for the detailed summary of your deliverables. We appreciate your thoroughness and understand that this situation has been frustrating.

We would like to clarify our position. When we refer to the final delivery not meeting the full scope of the project, we are specifically referring to the social media template kit — a set of five branded templates for Instagram, LinkedIn, and Facebook — which was discussed in our kickoff meeting on November 20, 2023, and referenced in the meeting notes circulated on November 22nd.

We acknowledge that this item does not appear in Appendix A of the signed contract. However, it was an agreed-upon addition discussed verbally and confirmed via email on November 25th, 2023. We believe this formed part of the project scope, even if the formal contract document was not amended to reflect it.

We recognize that this creates an ambiguous situation and that a formal contract amendment should have been requested at the time. We are willing to meet you halfway: we will release $2,400 of the withheld amount immediately upon your agreement to deliver the five social media templates within ten business days. The remaining $800 would be released upon delivery and acceptance of the templates.

We value the quality of your work and would welcome the opportunity to work together again in the future. We hope we can resolve this matter without involving third parties.

Warm regards,
Thomas Richter
Project Coordinator
Brightmark Creative`,
        questions: [
          {
            q: "What is the primary reason Priya Nair is writing her email?",
            options: [
              "To introduce herself and propose a new branding project to Brightmark Creative",
              "To dispute the withholding of her final payment and assert her contractual obligations were met",
              "To request an extension on the project deadline outlined in the original contract",
              "To apologize for submitting deliverables outside the agreed revision window",
            ],
            correct: 1,
            explanation:
              "Priya's opening paragraph states she is 'writing to formally dispute the decision to withhold the final payment installment.' Her email documents her completed deliverables and requests payment release.",
          },
          {
            q: "How much money is being withheld from Priya Nair?",
            options: ["$800", "$2,400", "$3,200", "$4,000"],
            correct: 2,
            explanation:
              "Priya's email refers to 'the final payment installment of $3,200' being withheld. Brightmark's offer splits this into $2,400 and $800, but the full withheld amount is $3,200.",
          },
          {
            q: "According to Priya's email, how quickly did she complete each revision request submitted by Brightmark?",
            options: [
              "Within 24 hours of each request",
              "Within 48 hours of each request",
              "Within five business days of each request",
              "Within the 30-day revision window, without a specific timeframe stated",
            ],
            correct: 1,
            explanation:
              "Priya states: 'all of which I completed and redelivered within 48 hours of each request.' The other timeframes are not mentioned in connection with the revisions.",
          },
          {
            q: "What is Brightmark Creative's specific reason for withholding the final payment?",
            options: [
              "The logo suite did not match the brand guidelines submitted",
              "All seven deliverables listed in Appendix A were below the agreed quality standard",
              "A set of social media templates discussed in November was not included in the final delivery",
              "The project was delivered more than 90 days after the contract was signed",
            ],
            correct: 2,
            explanation:
              "Brightmark's email clarifies their position: they are referring specifically to 'the social media template kit — a set of five branded templates for Instagram, LinkedIn, and Facebook' which they claim was a verbally agreed addition.",
          },
          {
            q: "As used in Priya's email, what does the word 'deliverables' most likely refer to?",
            options: [
              "The payment schedule outlined in the contract",
              "The specific work products that Priya was contracted to produce and submit",
              "The revision requests submitted by Brightmark during the project",
              "The emails sent between Priya and Brightmark during the contract period",
            ],
            correct: 1,
            explanation:
              "Priya uses 'deliverables' when listing specific project outputs: logo suite, brand guidelines, stationery templates. In contract language, deliverables are the specific products or outputs a contractor must produce.",
          },
          {
            q: "What does Brightmark Creative acknowledge in their response email?",
            options: [
              "That Priya was wrong about the scope of work and that the contract is clear",
              "That the social media templates were listed in Appendix A but accidentally omitted from their records",
              "That the social media templates were not listed in the signed contract, but were agreed upon verbally",
              "That Priya completed all seven deliverables on time and to the required standard",
            ],
            correct: 2,
            explanation:
              "Brightmark states: 'We acknowledge that this item does not appear in Appendix A of the signed contract. However, it was an agreed-upon addition discussed verbally and confirmed via email on November 25th.'",
          },
          {
            q: "What compromise does Brightmark Creative propose?",
            options: [
              "They will release the full $3,200 if Priya delivers the social media templates within five days",
              "They will release $2,400 immediately and $800 after the social media templates are delivered",
              "They will cancel the contract and return all deliverables to Priya",
              "They will pay Priya $1,600 immediately as a full and final settlement",
            ],
            correct: 1,
            explanation:
              "Brightmark offers: '$2,400 of the withheld amount immediately' upon agreement to deliver templates, and 'the remaining $800 would be released upon delivery and acceptance of the templates.'",
          },
          {
            q: "What action does Priya warn she will take if a resolution is not reached?",
            options: [
              "File a complaint with the Canadian Freelancers Association",
              "Publish her project files publicly to demonstrate the scope was completed",
              "Escalate the matter to a freelance dispute mediator or small claims court",
              "Return all deliverables and void the original contract",
            ],
            correct: 2,
            explanation:
              "Priya writes: 'I am prepared to escalate this matter to a freelance dispute mediator or small claims court if a resolution is not reached promptly.'",
          },
          {
            q: "What is the overall tone of Brightmark Creative's response email?",
            options: [
              "Defensive and dismissive, refusing to acknowledge any fault",
              "Conciliatory and willing to negotiate, while clarifying their own position",
              "Apologetic and willing to release the full payment without conditions",
              "Formal and threatening, warning Priya of potential legal consequences",
            ],
            correct: 1,
            explanation:
              "Brightmark acknowledges the 'ambiguous situation,' accepts partial blame ('a formal contract amendment should have been requested'), offers a compromise, and expresses hope to work together again. This reflects a conciliatory and negotiating tone.",
          },
          {
            q: "Based on both emails, which of the following best describes the central source of the dispute?",
            options: [
              "Priya delivered the project after the contract deadline, causing Brightmark to withhold payment",
              "Brightmark claims a deliverable verbally agreed upon after signing was not completed; Priya argues it was not in the written contract",
              "Priya submitted revisions outside the 30-day window, violating Section 4.2 of the contract",
              "Both parties disagree about the quality of the logo suite included in the final delivery",
            ],
            correct: 1,
            explanation:
              "The core of the dispute is whether a verbally added deliverable (social media templates) was part of the contract. Priya argues it is not in Appendix A; Brightmark argues it was verbally confirmed. Neither quality concerns nor timeline violations are the central issue.",
          },
          {
            q: "What does Brightmark Creative's final paragraph suggest about their relationship with Priya?",
            options: [
              "They plan to take legal action regardless of whether Priya agrees to their compromise",
              "They have already hired another designer for future projects",
              "They view Priya positively and would like to continue working together if this dispute is resolved",
              "They believe Priya is acting in bad faith and are unwilling to negotiate further",
            ],
            correct: 2,
            explanation:
              "Brightmark writes: 'We value the quality of your work and would welcome the opportunity to work together again in the future.' This suggests a positive professional regard and openness to an ongoing relationship.",
          },
        ],
      },
      {
        part: 2,
        partTitle: "Reading to Apply a Diagram",
        passageTitle:
          "Understanding Canada's Express Entry Comprehensive Ranking System (CRS)",
        passageText: `CANADA EXPRESS ENTRY — COMPREHENSIVE RANKING SYSTEM (CRS) GUIDE
Prepared for Prospective Applicants — Immigration, Refugees and Citizenship Canada (IRCC)

WHAT IS THE CRS?
The Comprehensive Ranking System (CRS) is the points-based scoring method used to rank candidates in Canada's Express Entry pool. Candidates with the highest CRS scores are invited to apply for permanent residence in periodic draws conducted by IRCC. Understanding how your score is calculated can help you identify areas where improvement is possible.

---

SECTION 1: CORE HUMAN CAPITAL FACTORS (Maximum: 500 points for single applicants)

These factors relate directly to you as the principal applicant.

Age (Maximum: 110 points)
Points are awarded on a sliding scale. The maximum of 110 points is awarded to applicants aged 20–29. Points begin to decrease after age 29, and no age points are awarded to applicants over 45.

Education (Maximum: 150 points)
Points are awarded based on the highest completed level of education. A PhD or two or more university degrees at the master's level or higher earns the maximum 150 points. A bachelor's degree earns 120 points. A two-year college diploma earns 91 points. A one-year college diploma earns 84 points. A secondary school diploma earns 28 points.

Official Language Proficiency (Maximum: 160 points)
Points are awarded based on test scores in reading, writing, listening, and speaking. For English, the IELTS General Training or CELPIP General test is accepted. For French, the TEF Canada or TCF Canada test is accepted. A CLB 9 score across all four skills earns the maximum 160 points. CLB 7–8 earns 110 points. CLB 5–6 earns 64 points.

Canadian Work Experience (Maximum: 80 points)
Points are awarded for full-time work experience in a TEER 0, 1, 2, or 3 occupation in Canada. One year of Canadian experience earns 40 points. Two years earn 53 points. Three or more years earn 80 points.

---

SECTION 2: ADDITIONAL FACTORS (Maximum: 600 points)

These factors can significantly increase your score if applicable.

Provincial Nomination (600 points)
If you receive a nomination from a Canadian province or territory under a Provincial Nominee Program (PNP), you receive 600 additional points. This virtually guarantees an invitation to apply for permanent residence.

Valid Job Offer in Canada (50–200 points)
A valid job offer in a TEER 0 senior management occupation earns 200 points. A job offer in any other TEER 0, 1, 2, or 3 occupation earns 50 points.

Sibling in Canada (15 points)
If you or your spouse has a brother or sister who is a permanent resident or citizen of Canada, 15 additional points are awarded.

Canadian Education (Maximum: 30 points)
Completing a one- or two-year post-secondary credential in Canada earns 15 points. Completing a credential of three or more years in Canada earns 30 points.

---

SECTION 3: UNDERSTANDING CRS DRAW CUTOFFS

IRCC conducts Express Entry draws approximately every two weeks. In each draw, all candidates above a cutoff score receive an Invitation to Apply (ITA) for permanent residence. Cutoff scores vary by draw and by program stream. In recent years, cutoff scores for the Federal Skilled Worker program have ranged from approximately 470 to 520 points. Scores above 500 are generally considered competitive. Candidates below the cutoff remain in the pool and may be invited in future draws.

---

SECTION 4: IMPORTANT NOTES
• CRS scores are calculated automatically based on information submitted in your Express Entry profile.
• Scores may change over time if you improve your language test results, gain additional work experience, or receive a provincial nomination.
• Spouses and common-law partners can also contribute to a combined CRS score if they are co-applicants.`,
        questions: [
          {
            q: "Ana is 27 years old with a bachelor's degree, CLB 8 English scores, and one year of Canadian work experience in a TEER 1 occupation. What is her Core Human Capital score?",
            options: [
              "310 points",
              "340 points",
              "380 points",
              "420 points",
            ],
            correct: 2,
            explanation:
              "Using the guide's tables: Age 27 earns 110 points (maximum, ages 20–29). A bachelor's degree earns 120 points. CLB 8 falls in the CLB 7–8 band, earning 110 points. One year of Canadian work experience earns 40 points. Total: 110 + 120 + 110 + 40 = 380 points.",
          },
          {
            q: "Which factor in the Additional Factors section has the single highest potential point value?",
            options: [
              "A valid job offer in a TEER 1 occupation (200 points)",
              "A sibling who is a Canadian permanent resident (15 points)",
              "A provincial nomination (600 points)",
              "Completing a three-year Canadian degree (30 points)",
            ],
            correct: 2,
            explanation:
              "The guide states a provincial nomination earns 600 additional points, which is described as virtually guaranteeing an invitation. This is the highest value in Section 2, far exceeding the 200 points for a senior management job offer.",
          },
          {
            q: "Marco is 46 years old. According to the guide, how many age points does he receive?",
            options: [
              "110 points, the maximum",
              "80 points, because he is over 40",
              "28 points, the minimum",
              "0 points, because no age points are awarded over 45",
            ],
            correct: 3,
            explanation:
              "The guide explicitly states: 'no age points are awarded to applicants over 45.' Marco is 46, so he receives 0 age points.",
          },
          {
            q: "Yuki has a two-year college diploma, CLB 6 English, and no Canadian work experience. She is 24 years old. Which statement best describes her situation?",
            options: [
              "She has the maximum score in all four core human capital categories",
              "She earns full age points but reduced points in education and language categories",
              "She is not eligible for Express Entry because she lacks Canadian experience",
              "She earns the maximum education points because a diploma is equivalent to a degree",
            ],
            correct: 1,
            explanation:
              "Yuki at 24 earns 110 age points (maximum). Her two-year college diploma earns 91 points (not the maximum 150). Her CLB 6 earns 64 points (not the maximum 160). She earns 0 Canadian experience points. So she earns full age points but reduced points in other categories. The guide does not say she is ineligible for lacking Canadian experience.",
          },
          {
            q: "According to the guide, what CRS score is generally considered competitive for a Federal Skilled Worker draw?",
            options: [
              "Above 350 points",
              "Above 420 points",
              "Above 500 points",
              "Above 600 points",
            ],
            correct: 2,
            explanation:
              "The guide states: 'Scores above 500 are generally considered competitive.' Recent cutoffs have ranged from 470–520, and 500 is cited as the general competitiveness threshold.",
          },
          {
            q: "David received a provincial nomination. Before the nomination, his CRS score was 420. What is his approximate new score?",
            options: [
              "470 points, since nominations add 50 points",
              "620 points, since nominations add 200 points",
              "1,020 points, since nominations add 600 points",
              "435 points, since nominations add 15 points",
            ],
            correct: 2,
            explanation:
              "A provincial nomination adds 600 CRS points. 420 + 600 = 1,020. The guide notes this 'virtually guarantees an invitation to apply,' which is consistent with a very high combined score.",
          },
          {
            q: "According to the guide, in which situation can a person's CRS score change after creating their Express Entry profile?",
            options: [
              "Only if they submit a new application with different personal information",
              "If they improve language test results, gain more work experience, or receive a provincial nomination",
              "Only if they gain a valid job offer in a TEER 0 senior management position",
              "CRS scores are fixed once a profile is submitted and cannot be changed",
            ],
            correct: 1,
            explanation:
              "Section 4 states: 'Scores may change over time if you improve your language test results, gain additional work experience, or receive a provincial nomination.' Multiple triggers are listed, not just job offers, and scores are not fixed.",
          },
          {
            q: "What best describes the purpose of this document?",
            options: [
              "To compare the Express Entry system with provincial immigration pathways",
              "To explain how CRS scores are calculated and help applicants identify ways to improve their scores",
              "To list all occupations that qualify under the Federal Skilled Worker program",
              "To outline the application procedures for submitting a completed Express Entry profile",
            ],
            correct: 1,
            explanation:
              "The introduction states: 'Understanding how your score is calculated can help you identify areas where improvement is possible.' The document focuses on score calculation and improvement — not comparisons, occupation lists, or application filing procedures.",
          },
        ],
      },
      {
        part: 3,
        partTitle: "Reading for Information",
        passageTitle: "The Rise of Remote Work in Canadian Technology Companies",
        passageText: `The Rise of Remote Work in Canadian Technology Companies

The transformation of the Canadian technology sector over the past several years has been remarkable in scope and speed. Among the most significant shifts has been the widespread adoption of remote work — not as a temporary accommodation, but as a permanent structural feature of how technology companies operate. According to industry research published in 2023, approximately 40 percent of Canadian technology workers are now fully remote, with an additional 35 percent working in hybrid arrangements that blend office time with remote days. Only 25 percent of tech employees report working exclusively from a physical office.

For companies, the benefits of remote work are often framed in financial terms. Office space in major Canadian tech hubs such as Toronto, Vancouver, and Montreal is among the most expensive in North America. Eliminating or downsizing physical office requirements can generate substantial cost savings — savings that some firms redirect toward hiring, research and development, or employee benefits. But perhaps the more strategically significant advantage is the ability to recruit from a wider talent pool. A technology company headquartered in Toronto that previously drew candidates from the Greater Toronto Area can now recruit engineers, product managers, and data scientists from Halifax, Winnipeg, or even from Canadian citizens working abroad who wish to return.

Employees, for their part, frequently cite improved work-life balance and the elimination of daily commutes as the primary personal benefits of remote arrangements. A software developer who previously spent ninety minutes commuting each way in a major city recovers nearly three hours of productive or personal time per workday — a meaningful quality-of-life improvement that many workers now treat as a near-non-negotiable condition of employment.

However, the transition to remote work has not been without friction. Collaboration remains the most commonly cited challenge. While video conferencing platforms and project management tools have made communication more accessible, many technology leaders argue that spontaneous, in-person interaction still drives innovation in ways that structured virtual meetings do not replicate. "There's a certain energy in a room when a team is physically working through a hard problem together," says Meera Pillai, Chief Technology Officer at a mid-sized Ottawa software firm. "We've built workarounds, but we haven't fully replaced that dynamic."

Time zone differences present an additional complication for companies that have expanded their remote hiring nationally. A development team distributed across British Columbia, Ontario, and Newfoundland spans a four-hour time difference, compressing the window in which synchronous meetings can reasonably be scheduled. This can slow decision-making cycles and create communication gaps, particularly for teams working on fast-moving projects.

The most nuanced concern, however, involves the development of junior employees. Entry-level workers benefit significantly from informal learning — observing how senior colleagues handle client calls, overhearing how problems are discussed in real time, or receiving spontaneous mentorship during shared lunches. These opportunities are substantially reduced in remote environments. "We're very good at teaching junior developers the technical skills they need," observes Rajiv Chen, a senior engineering manager at a Vancouver-based e-commerce platform. "What we're struggling with is transmitting the professional culture and judgment that used to come from working side by side." Several Canadian technology firms have responded by requiring junior employees to work from a physical office for the first year of their employment, before transitioning to hybrid or fully remote arrangements.

Despite these challenges, the consensus among industry observers is that remote work is not a trend that will reverse. The competitive pressure to offer flexibility is too strong, and the workforce expectations it has created are deeply embedded. The more pressing question for Canadian technology companies is not whether to offer remote work, but how to design organizational structures and management practices that make distributed teams genuinely effective.`,
        questions: [
          {
            q: "According to the 2023 industry research cited in the article, what percentage of Canadian tech workers are fully remote?",
            options: [
              "25 percent",
              "35 percent",
              "40 percent",
              "75 percent",
            ],
            correct: 2,
            explanation:
              "The article states: 'approximately 40 percent of Canadian technology workers are now fully remote.' 25 percent work exclusively in offices, and 35 percent work in hybrid arrangements.",
          },
          {
            q: "According to the article, what is described as the 'more strategically significant' benefit of remote work for companies?",
            options: [
              "Saving on office rental costs in expensive Canadian cities",
              "Reducing the time employees spend commuting to work",
              "The ability to recruit from a wider national and international talent pool",
              "Redirecting savings toward employee benefits and research",
            ],
            correct: 2,
            explanation:
              "The article states: 'But perhaps the more strategically significant advantage is the ability to recruit from a wider talent pool.' Office cost savings are mentioned first but described as the less strategic benefit.",
          },
          {
            q: "What example does the article use to illustrate the personal benefit of remote work for employees?",
            options: [
              "A project manager who is able to work from a family home in another province",
              "A software developer who recovers nearly three hours per workday by eliminating commute time",
              "An engineer who avoids childcare costs by working from home",
              "A data scientist who earns higher wages at a remote-first company",
            ],
            correct: 1,
            explanation:
              "The article uses the specific example of 'a software developer who previously spent ninety minutes commuting each way' recovering 'nearly three hours of productive or personal time per workday.'",
          },
          {
            q: "What does Meera Pillai, the CTO quoted in the article, suggest about remote collaboration tools?",
            options: [
              "They are superior to in-person meetings for structured decision-making",
              "They have eliminated the need for physical office space entirely",
              "They have helped communication but have not fully replaced the dynamic of in-person collaboration",
              "They are used primarily by junior employees and not by senior technology leaders",
            ],
            correct: 2,
            explanation:
              "Meera Pillai says: 'We've built workarounds, but we haven't fully replaced that dynamic.' She acknowledges that tools have helped but argues that the energy of in-person problem-solving has not been replicated.",
          },
          {
            q: "According to the article, how many hours of time difference can exist within a development team distributed across British Columbia, Ontario, and Newfoundland?",
            options: [
              "Two hours",
              "Three hours",
              "Four hours",
              "Six hours",
            ],
            correct: 2,
            explanation:
              "The article states: 'A development team distributed across British Columbia, Ontario, and Newfoundland spans a four-hour time difference.' This is given as a specific complication for nationally distributed teams.",
          },
          {
            q: "What does Rajiv Chen identify as the primary challenge with junior employees in remote environments?",
            options: [
              "Junior employees lack the technical skills required to work independently from home",
              "Transmitting professional culture and judgment that previously came from working side by side",
              "Junior employees in remote settings are more likely to leave for other companies",
              "The cost of training junior employees remotely is higher than training them in person",
            ],
            correct: 1,
            explanation:
              "Rajiv Chen says: 'What we're struggling with is transmitting the professional culture and judgment that used to come from working side by side.' He separately affirms that technical skills are being taught successfully.",
          },
          {
            q: "How have some Canadian technology firms responded to the challenge of developing junior employees remotely?",
            options: [
              "By requiring junior employees to work from the office for their entire career",
              "By limiting remote work options exclusively to senior employees and managers",
              "By requiring junior employees to work from a physical office for their first year before going remote",
              "By providing junior employees with additional paid training courses delivered online",
            ],
            correct: 2,
            explanation:
              "The article states: 'Several Canadian technology firms have responded by requiring junior employees to work from a physical office for the first year of their employment, before transitioning to hybrid or fully remote arrangements.'",
          },
          {
            q: "As used in the article, the word 'synchronous' most closely means:",
            options: [
              "Happening at the same time or simultaneously",
              "Efficient and well-organized",
              "Conducted through video conferencing technology",
              "Scheduled in advance and structured",
            ],
            correct: 0,
            explanation:
              "The article uses 'synchronous' in the context of meetings where all participants are present and communicating at the same time, as opposed to asynchronous communication (like email) where responses happen at different times.",
          },
          {
            q: "What is the author's overall conclusion about the future of remote work in Canadian technology?",
            options: [
              "Remote work will gradually decline as companies return to office-based models",
              "Remote work is a permanent feature and companies must focus on making distributed teams effective",
              "Remote work benefits employees significantly but consistently harms company performance",
              "The Canadian government should introduce regulations to manage remote work policies",
            ],
            correct: 1,
            explanation:
              "The article's final paragraph states: 'the consensus among industry observers is that remote work is not a trend that will reverse' and frames the key question as 'how to design organizational structures and management practices that make distributed teams genuinely effective.'",
          },
        ],
      },
      {
        part: 4,
        partTitle: "Reading for Viewpoints",
        passageTitle:
          "Financial Literacy Should Be Mandatory in Canadian High Schools / Response: Financial Education Belongs at Home",
        passageText: `OP-ED: Financial Literacy Should Be Mandatory in Canadian High Schools

Every year, thousands of Canadian young adults graduate from high school equipped with knowledge of photosynthesis, the quadratic formula, and the causes of World War I — but without the faintest understanding of how to create a budget, file a tax return, manage debt, or save for retirement. The gap between what schools teach and what life actually requires has never been more costly.

A 2022 survey conducted by Statistics Canada found that 60 percent of Canadian adults over 30 reported regretting that they had not received formal financial education earlier in their lives. The financial consequences of this gap are measurable: Canadians carry among the highest household debt levels in the developed world, and personal insolvency filings have risen steadily over the past decade. These are not abstract statistics — they represent real families navigating financial crises that could, in many cases, have been prevented with basic education.

The solution is straightforward: introduce a mandatory financial literacy course at the Grade 10 level in all Canadian provinces. The course should cover budgeting, compound interest, credit scores, basic taxation, investment fundamentals, and the mathematics of loans and mortgages. This is not a radical proposition. Several provinces have already taken steps in this direction — Ontario introduced a mandatory financial literacy component in its Grade 10 math curriculum in 2021, and British Columbia has embedded personal finance concepts across its secondary mathematics curriculum.

Critics argue that financial literacy is better taught by parents within the family environment. This view, while understandable, overlooks a fundamental inequity: not all parents have the knowledge, time, or resources to provide meaningful financial education. A child raised in a household that has never held investment accounts, built credit, or navigated government benefit systems is likely to inherit not just financial habits but financial blind spots. If we accept that public education exists to equalize opportunity, then withholding a subject as practically vital as financial literacy from the public curriculum is a profound failure of that mandate.

Others suggest that one course cannot meaningfully address financial complexity. But critics demanding perfection should not be the enemy of meaningful progress. Even a single, well-designed mandatory course reduces the information asymmetry that allows predatory lending practices, high-interest credit products, and opaque fee structures to exploit young Canadians who simply do not know better.

The Canadian classroom has always evolved to meet the demands of the times. Teaching young people how money works is not a departure from academic tradition — it is its fullest expression.

---

RESPONSE LETTER: Financial Education Belongs at Home

The op-ed calling for mandatory financial literacy in Canadian high schools is well-intentioned, but it misidentifies both the problem and the solution.

Financial habits are not formed through classroom instruction. They are formed through lived experience — through watching how parents handle bills, discuss financial decisions, respond to financial stress, and make trade-offs between wants and needs. No 75-minute class period, however well-designed, can replicate the formative influence of a household that regularly models responsible financial behaviour.

There is also a practical concern. High school curricula are already overcrowded with mandatory content. Adding another required course — even a valuable one — means displacing something else. Given that Canadian students already trail international peers in mathematical proficiency, a case could be made that the same curriculum time would be better spent reinforcing foundational numeracy skills that underpin all financial reasoning.

The op-ed cites the Statistics Canada figure showing that 60 percent of adults regret not learning about finances earlier. But this statistic measures regret — not the cause of poor financial outcomes, and not evidence that a school-based course would have changed those outcomes. Correlation between financial regret and the absence of school instruction does not establish that schools are the appropriate or most effective intervention.

The suggestion that not all parents are equipped to teach financial literacy is accurate. But the right response to parental limitations is to support parents — through community programs, accessible government resources, and employer-supported financial wellness programs — not to transfer a parental responsibility wholesale to the school system.

Financial literacy matters enormously. But the path to improving it runs through families and communities, not mandatory course lists.

— Submitted by a high school educator, Ontario`,
        questions: [
          {
            q: "What is the main argument of the op-ed?",
            options: [
              "Canadian schools should reduce the number of mandatory subjects to free time for practical education",
              "A mandatory financial literacy course should be introduced in Grade 10 in all Canadian provinces",
              "Financial education is the sole responsibility of parents and communities",
              "Canadian students are falling behind international peers in mathematical skills",
            ],
            correct: 1,
            explanation:
              "The op-ed explicitly proposes: 'introduce a mandatory financial literacy course at the Grade 10 level in all Canadian provinces.' This is the central recommendation supported by statistics and arguments throughout the piece.",
          },
          {
            q: "What does the Statistics Canada survey cited in the op-ed reveal?",
            options: [
              "That 60 percent of Canadian students currently receive no financial education",
              "That 60 percent of Canadian adults over 30 regret not receiving formal financial education earlier",
              "That Canadians have the highest household debt levels in the world",
              "That personal insolvency filings have doubled in the past decade",
            ],
            correct: 1,
            explanation:
              "The op-ed states: 'A 2022 survey conducted by Statistics Canada found that 60 percent of Canadian adults over 30 reported regretting that they had not received formal financial education earlier in their lives.'",
          },
          {
            q: "The op-ed author mentions Ontario and British Columbia. What is the purpose of including these examples?",
            options: [
              "To argue that those provinces have superior education systems overall",
              "To show that some provinces have already moved toward mandatory financial literacy, making the proposal less radical",
              "To criticize the federal government for allowing unequal provincial education policies",
              "To argue that financial literacy should only be mandatory in large provinces",
            ],
            correct: 1,
            explanation:
              "The author uses Ontario and BC as examples to support the claim that the proposal 'is not a radical proposition' — framing these provinces as precedents that demonstrate feasibility.",
          },
          {
            q: "How does the op-ed author respond to the criticism that financial literacy is better taught by parents?",
            options: [
              "By agreeing that parents are more effective teachers but arguing that schools should supplement family instruction",
              "By arguing that not all parents have the knowledge or resources to provide meaningful financial education, creating inequity",
              "By dismissing the concern entirely and focusing on the statistical evidence",
              "By proposing that parents and schools share responsibility through co-delivered programs",
            ],
            correct: 1,
            explanation:
              "The author acknowledges the criticism as 'understandable' but argues it 'overlooks a fundamental inequity: not all parents have the knowledge, time, or resources to provide meaningful financial education.'",
          },
          {
            q: "The response letter argues that financial habits are primarily formed through:",
            options: [
              "Formal classroom instruction delivered at a developmentally appropriate age",
              "Government-funded community programs designed for young adults",
              "Lived experience and observing how parents model financial behaviour",
              "Reading materials provided by financial institutions",
            ],
            correct: 2,
            explanation:
              "The response letter states: 'Financial habits are not formed through classroom instruction. They are formed through lived experience — through watching how parents handle bills, discuss financial decisions, respond to financial stress.'",
          },
          {
            q: "How does the response letter challenge the Statistics Canada figure used in the op-ed?",
            options: [
              "By claiming the survey was conducted incorrectly and its sample size was too small",
              "By arguing the statistic measures regret, not evidence that school instruction would have improved outcomes",
              "By citing a different Statistics Canada study that shows opposite results",
              "By pointing out that the survey only included respondents from large urban centres",
            ],
            correct: 1,
            explanation:
              "The letter states: 'this statistic measures regret — not the cause of poor financial outcomes, and not evidence that a school-based course would have changed those outcomes.' It challenges the interpretation of the data, not its accuracy.",
          },
          {
            q: "What does the response letter suggest as an alternative to mandatory school-based financial education?",
            options: [
              "Introducing optional financial literacy electives that students can self-select",
              "Supporting parents through community programs, government resources, and employer-supported wellness programs",
              "Strengthening financial literacy through university and college programs for adults",
              "Partnering with banks to deliver financial education through advertising",
            ],
            correct: 1,
            explanation:
              "The letter argues: 'the right response to parental limitations is to support parents — through community programs, accessible government resources, and employer-supported financial wellness programs.'",
          },
          {
            q: "As used in the op-ed, the phrase 'information asymmetry' most closely refers to:",
            options: [
              "A gap in financial knowledge between younger and older Canadians",
              "A situation where one party (lenders) has significantly more knowledge than another (young borrowers)",
              "The unequal distribution of financial resources across Canadian provinces",
              "The difference between what is taught in school and what is needed in adult life",
            ],
            correct: 1,
            explanation:
              "The op-ed uses 'information asymmetry' in the context of predatory lending exploiting young people 'who simply do not know better.' This refers to the lender having knowledge that the borrower lacks — a classic definition of information asymmetry.",
          },
          {
            q: "Both the op-ed and the response letter agree on which of the following?",
            options: [
              "Schools are the most effective setting for teaching financial literacy",
              "Financial literacy matters and is important for Canadians",
              "The Statistics Canada survey is reliable evidence that schools should act",
              "Parents are uniformly unequipped to teach financial literacy",
            ],
            correct: 1,
            explanation:
              "The response letter's final paragraph states: 'Financial literacy matters enormously.' The op-ed's entire argument is premised on its importance. Both agree on its importance — they disagree on how and where it should be taught.",
          },
          {
            q: "What is the overall tone of the response letter?",
            options: [
              "Mocking and dismissive of the op-ed's core concerns",
              "Measured and critical, acknowledging some merit in the op-ed while challenging its conclusions",
              "Fully supportive of the op-ed, with minor reservations about implementation",
              "Emotional and personal, based primarily on the letter writer's classroom experiences",
            ],
            correct: 1,
            explanation:
              "The letter opens by calling the op-ed 'well-intentioned,' acknowledges the accuracy of some points ('The suggestion that not all parents are equipped to teach financial literacy is accurate'), but systematically challenges its logic and conclusion. This reflects a measured, critical tone.",
          },
        ],
      },
    ],
  },
];
