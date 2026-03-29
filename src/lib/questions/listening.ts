export type PartQuestion = {
  prompt: string;
  options: string[];
  correct: number; // 0-indexed
  explanation: string;
};

export type ListeningPart = {
  part: number;
  title: string;
  context: string;       // Situation shown before audio plays
  ttsScript: string;     // Clean text for Web Speech API
  displayScript: string; // Speaker-labelled transcript for review
  isPremium: boolean;
  questions: PartQuestion[];
};

export const LISTENING_PARTS: ListeningPart[] = [

  // ═══════════════════════════════════════════════════════
  // FREE — Parts 1–4
  // ═══════════════════════════════════════════════════════

  {
    part: 1,
    title: "Following a Daily Conversation",
    context: "Two coworkers, Priya and Tom, are discussing their company's upcoming anniversary event.",
    isPremium: false,
    ttsScript: `Priya, have you seen the email about the company's 25th anniversary celebration?
I just read it. Sounds like quite the event. Have you signed up for anything yet?
Not yet. I was thinking about joining the decorations committee, but I might volunteer for catering instead. The email said catering volunteers get a free dinner the night before the event.
Oh, I didn't catch that detail. I already signed up for the audio-visual team. They need four people total and I was the third to register.
Good for you. Where's the event being held? I thought I saw something about the Riverside Convention Centre.
No, they changed venues. It's now at Hillside Gardens, the outdoor space near the park. Apparently the original venue had a booking conflict they only discovered last week.
Oh right, I think I remember reading that. And the event is Saturday the 22nd?
It was moved to Sunday the 23rd, actually. The weather forecast is showing rain on Saturday, so they pushed it one day.
That's smart planning. Are partners allowed to come?
Yes, every employee gets one plus-one included. Any additional guests beyond that are $35 per person.
Good to know. I should register before the deadline. When is it?
The deadline is this Friday at 5pm. I'd sign up soon if you want to volunteer for catering — those spots tend to fill up.`,
    displayScript: `Tom: Priya, have you seen the email about the company's 25th anniversary celebration?
Priya: I just read it. Sounds like quite the event. Have you signed up for anything yet?
Tom: Not yet. I was thinking about joining the decorations committee, but I might volunteer for catering instead. The email said catering volunteers get a free dinner the night before the event.
Priya: Oh, I didn't catch that detail. I already signed up for the audio-visual team. They need four people total and I was the third to register.
Tom: Good for you. Where's the event being held? I thought I saw something about the Riverside Convention Centre.
Priya: No, they changed venues. It's now at Hillside Gardens, the outdoor space near the park. Apparently the original venue had a booking conflict they only discovered last week.
Tom: Oh right, I think I remember reading that. And the event is Saturday the 22nd?
Priya: It was moved to Sunday the 23rd, actually. The weather forecast is showing rain on Saturday, so they pushed it one day.
Tom: That's smart planning. Are partners allowed to come?
Priya: Yes, every employee gets one plus-one included. Any additional guests beyond that are $35 per person.
Tom: Good to know. I should register before the deadline. When is it?
Priya: The deadline is this Friday at 5pm. I'd sign up soon if you want to volunteer for catering — those spots tend to fill up.`,
    questions: [
      {
        prompt: "Why does Tom consider volunteering for the catering team?",
        options: [
          "He has professional cooking experience",
          "The decorations committee is already full",
          "Catering volunteers receive a free dinner the night before",
          "He was specifically asked by the event organizer",
        ],
        correct: 2,
        explanation: "Tom says 'The email said catering volunteers get a free dinner the night before the event.'",
      },
      {
        prompt: "How many people does the audio-visual team require?",
        options: ["Two", "Three", "Four", "Five"],
        correct: 2,
        explanation: "Priya states the audio-visual team 'need four people total.'",
      },
      {
        prompt: "Why was the venue changed from the Riverside Convention Centre?",
        options: [
          "The convention centre was too expensive",
          "The outdoor venue could hold more guests",
          "The original venue had a booking conflict",
          "The new venue is closer to the office",
        ],
        correct: 2,
        explanation: "Priya explains 'the original venue had a booking conflict they only discovered last week.'",
      },
      {
        prompt: "On which day was the anniversary event rescheduled?",
        options: ["Friday the 21st", "Saturday the 22nd", "Sunday the 23rd", "Monday the 24th"],
        correct: 2,
        explanation: "Priya says it was moved to 'Sunday the 23rd' because the forecast showed rain on Saturday.",
      },
      {
        prompt: "What is the cost per additional guest beyond each employee's plus-one?",
        options: ["Free of charge", "$25", "$35", "$50"],
        correct: 2,
        explanation: "Priya states 'Any additional guests beyond that are $35 per person.'",
      },
    ],
  },

  {
    part: 2,
    title: "Listening to a Problem-Solution",
    context: "A customer named Robert is calling his bank's customer service line.",
    isPremium: false,
    ttsScript: `Thank you for calling Northland Bank. This is Lisa speaking. How can I help you today?
Hi Lisa. I'm calling because I noticed two charges on my credit card statement that I don't recognize at all.
I'm sorry to hear that. I can look into that right away. Could I please have your name and the last four digits of your card?
Sure. Robert Liang. Last four digits are 7824.
Thank you, Mr. Liang. I have your account here. Can you describe the charges — the amounts and approximate dates?
Yes. One is $47.99 on March 14th from somewhere called StreamPlus Media. The other is $129 on March 16th, listed only as "online purchase."
I can see both of those. The StreamPlus Media charge appears to be a recurring subscription. Did you sign up for a new streaming service recently?
No, definitely not. I haven't signed up for anything like that.
Understood. I'll initiate a dispute for both charges immediately. I'll also place a security hold on your current card and issue a replacement card with a new number as a precaution. You'll receive the new card within five to seven business days.
Will I still be able to use my current card while I wait for the new one?
The hold will take effect in approximately two hours, so I'd recommend using an alternate payment method after that point. You'll also receive a confirmation email with your dispute reference numbers within 24 hours.
That's very helpful. Thank you, Lisa.`,
    displayScript: `Lisa: Thank you for calling Northland Bank. This is Lisa speaking. How can I help you today?
Robert: Hi Lisa. I'm calling because I noticed two charges on my credit card statement that I don't recognize at all.
Lisa: I'm sorry to hear that. I can look into that right away. Could I please have your name and the last four digits of your card?
Robert: Sure. Robert Liang. Last four digits are 7824.
Lisa: Thank you, Mr. Liang. I have your account here. Can you describe the charges — the amounts and approximate dates?
Robert: Yes. One is $47.99 on March 14th from somewhere called StreamPlus Media. The other is $129 on March 16th, listed only as "online purchase."
Lisa: I can see both of those. The StreamPlus Media charge appears to be a recurring subscription. Did you sign up for a new streaming service recently?
Robert: No, definitely not. I haven't signed up for anything like that.
Lisa: Understood. I'll initiate a dispute for both charges immediately. I'll also place a security hold on your current card and issue a replacement card with a new number as a precaution. You'll receive the new card within five to seven business days.
Robert: Will I still be able to use my current card while I wait for the new one?
Lisa: The hold will take effect in approximately two hours, so I'd recommend using an alternate payment method after that point. You'll also receive a confirmation email with your dispute reference numbers within 24 hours.
Robert: That's very helpful. Thank you, Lisa.`,
    questions: [
      {
        prompt: "Why is Robert calling the bank?",
        options: [
          "To request an increase to his credit limit",
          "To report two unrecognized charges on his statement",
          "To cancel his credit card account",
          "To dispute a late payment fee",
        ],
        correct: 1,
        explanation: "Robert says he is calling 'because I noticed two charges on my credit card statement that I don't recognize.'",
      },
      {
        prompt: "What is the amount of the charge from StreamPlus Media?",
        options: ["$12.99", "$47.99", "$129.00", "$176.99"],
        correct: 1,
        explanation: "Robert specifies the StreamPlus Media charge is '$47.99 on March 14th.'",
      },
      {
        prompt: "What does Lisa suggest the StreamPlus Media charge likely is?",
        options: [
          "A one-time merchandise order",
          "A foreign transaction fee",
          "A recurring subscription charge",
          "A cash advance fee",
        ],
        correct: 2,
        explanation: "Lisa says 'The StreamPlus Media charge appears to be a recurring subscription.'",
      },
      {
        prompt: "How long will it take for Robert to receive his new replacement card?",
        options: [
          "One to two business days",
          "Three to four business days",
          "Five to seven business days",
          "Seven to ten business days",
        ],
        correct: 2,
        explanation: "Lisa says 'You'll receive the new card within five to seven business days.'",
      },
    ],
  },

  {
    part: 3,
    title: "Listening to a Discussion",
    context: "Friends Maya and Chen are talking over coffee about Maya's apartment search.",
    isPremium: false,
    ttsScript: `So how is the apartment hunt going? You've been looking for a while now.
Honestly, it's been exhausting. I found a beautiful two-bedroom on Elm Street last week, but the landlord rented it to someone else before I even had a chance to schedule a viewing.
That happens so quickly these days. What's your budget?
I'd like to stay under $1,800 a month, utilities included. That's become really difficult to find in this part of the city.
What about that area near the university? My colleague mentioned some units are opening up there.
I actually viewed one last Tuesday. The apartment was fine — reasonable size, updated kitchen. But it's on the third floor with no elevator, which would be a real problem for moving in all my furniture.
That's a pain. What were the lease terms like?
One-year lease with a two-month security deposit. Most places only ask for one month, so that felt steep.
Did it have parking? You mentioned you got your car back from your brother.
Yes, I got it back last month, so parking is non-negotiable for me now. The university building only had street parking, and apparently it's incredibly competitive there — residents sometimes park several blocks away.
I actually know someone who manages properties near Lakeview Park. Should I reach out and see if anything's available?
That would be amazing. Lakeview is actually one of my top target neighbourhoods because of how close it is to my office.
I'll message them tonight and let you know what I hear by the weekend.`,
    displayScript: `Chen: So how is the apartment hunt going? You've been looking for a while now.
Maya: Honestly, it's been exhausting. I found a beautiful two-bedroom on Elm Street last week, but the landlord rented it to someone else before I even had a chance to schedule a viewing.
Chen: That happens so quickly these days. What's your budget?
Maya: I'd like to stay under $1,800 a month, utilities included. That's become really difficult to find in this part of the city.
Chen: What about that area near the university? My colleague mentioned some units are opening up there.
Maya: I actually viewed one last Tuesday. The apartment was fine — reasonable size, updated kitchen. But it's on the third floor with no elevator, which would be a real problem for moving in all my furniture.
Chen: That's a pain. What were the lease terms like?
Maya: One-year lease with a two-month security deposit. Most places only ask for one month, so that felt steep.
Chen: Did it have parking? You mentioned you got your car back from your brother.
Maya: Yes, I got it back last month, so parking is non-negotiable for me now. The university building only had street parking, and apparently it's incredibly competitive there — residents sometimes park several blocks away.
Chen: I actually know someone who manages properties near Lakeview Park. Should I reach out and see if anything's available?
Maya: That would be amazing. Lakeview is actually one of my top target neighbourhoods because of how close it is to my office.
Chen: I'll message them tonight and let you know what I hear by the weekend.`,
    questions: [
      {
        prompt: "What happened with the apartment on Elm Street?",
        options: [
          "The rent was over Maya's budget",
          "It was rented before Maya could schedule a viewing",
          "Maya decided the apartment was too small",
          "The landlord refused her application",
        ],
        correct: 1,
        explanation: "Maya says 'the landlord rented it to someone else before I even had a chance to schedule a viewing.'",
      },
      {
        prompt: "What is Maya's maximum monthly budget, including utilities?",
        options: ["$1,500", "$1,600", "$1,800", "$2,000"],
        correct: 2,
        explanation: "Maya states she wants to stay 'under $1,800 a month, utilities included.'",
      },
      {
        prompt: "What is the problem with the university area apartment?",
        options: [
          "The rent is over her budget",
          "The kitchen has not been updated",
          "It is on the third floor with no elevator",
          "It does not allow pets",
        ],
        correct: 2,
        explanation: "Maya says the apartment is 'on the third floor with no elevator, which would be a real problem for moving in all my furniture.'",
      },
      {
        prompt: "What is unusual about the security deposit for the university apartment?",
        options: [
          "There is no deposit required",
          "It is three months' rent",
          "It requires two months instead of the typical one",
          "The deposit is non-refundable",
        ],
        correct: 2,
        explanation: "Maya says it requires 'a two-month security deposit' and adds 'Most places only ask for one month.'",
      },
      {
        prompt: "Why does Maya need a parking space?",
        options: [
          "She is purchasing a new car soon",
          "She recently got her car back from her brother",
          "She needs to park a work vehicle",
          "Her current building removed parking",
        ],
        correct: 1,
        explanation: "Maya says 'I got it back last month' referring to her car that she got back from her brother.",
      },
    ],
  },

  {
    part: 4,
    title: "Listening to a News Item",
    context: "You are listening to a local radio news bulletin on CKWN 94.5.",
    isPremium: false,
    ttsScript: `Good afternoon. You are listening to CKWN 94.5 News. Our top story: the city of Harborview has approved a $2.3 billion expansion of its public transit network. Mayor Deborah Okafor made the announcement at a press conference this morning, calling it the most significant infrastructure investment in the city's history.
The approved plan includes two new subway lines. The Eastside Connector will run from the city centre to the international airport. The Lakefront Express will link the northern suburbs to the downtown core. Construction on the Eastside Connector is expected to begin in the spring of next year. The Lakefront Express will follow approximately 18 months after that.
Once fully operational, the expansion is projected to serve an additional 200,000 daily commuters. Funding will come from a combination of federal grants, which will cover 40 percent of total costs, and a new transit levy applied to commercial properties.
Critics have raised concerns about construction disruptions, particularly along Main Street, where businesses fear significant loss of customer traffic during the estimated 22-month construction window. Mayor Okafor addressed these concerns directly, announcing a local hiring initiative that aims to fill at least 60 percent of all construction positions with Harborview residents. Full completion of both lines is targeted for 2029.`,
    displayScript: `[CKWN 94.5 News — Afternoon Bulletin]

"Good afternoon. You are listening to CKWN 94.5 News. Our top story: the city of Harborview has approved a $2.3 billion expansion of its public transit network. Mayor Deborah Okafor made the announcement at a press conference this morning, calling it the most significant infrastructure investment in the city's history.

The approved plan includes two new subway lines. The Eastside Connector will run from the city centre to the international airport. The Lakefront Express will link the northern suburbs to the downtown core. Construction on the Eastside Connector is expected to begin in the spring of next year. The Lakefront Express will follow approximately 18 months after that.

Once fully operational, the expansion is projected to serve an additional 200,000 daily commuters. Funding will come from a combination of federal grants, which will cover 40 percent of total costs, and a new transit levy applied to commercial properties.

Critics have raised concerns about construction disruptions, particularly along Main Street, where businesses fear significant loss of customer traffic during the estimated 22-month construction window. Mayor Okafor addressed these concerns directly, announcing a local hiring initiative that aims to fill at least 60 percent of all construction positions with Harborview residents. Full completion of both lines is targeted for 2029."`,
    questions: [
      {
        prompt: "What is the total approved budget for Harborview's transit expansion?",
        options: ["$1.8 billion", "$2.3 billion", "$3.1 billion", "$4.5 billion"],
        correct: 1,
        explanation: "The report states 'the city of Harborview has approved a $2.3 billion expansion of its public transit network.'",
      },
      {
        prompt: "Where will the Eastside Connector subway line run?",
        options: [
          "From the northern suburbs to the downtown core",
          "From the city centre to the international airport",
          "From the eastern suburbs to the western waterfront",
          "From the main station to the university campus",
        ],
        correct: 1,
        explanation: "The report says 'The Eastside Connector will run from the city centre to the international airport.'",
      },
      {
        prompt: "What percentage of the total project cost will be covered by federal grants?",
        options: ["25 percent", "30 percent", "40 percent", "60 percent"],
        correct: 2,
        explanation: "The report states federal grants 'will cover 40 percent of total costs.'",
      },
      {
        prompt: "What is the target for local workers in the construction hiring initiative?",
        options: [
          "At least 40 percent",
          "At least 50 percent",
          "At least 60 percent",
          "At least 75 percent",
        ],
        correct: 2,
        explanation: "The mayor's initiative 'aims to fill at least 60 percent of all construction positions with Harborview residents.'",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // PREMIUM — Parts 5–8
  // ═══════════════════════════════════════════════════════

  {
    part: 5,
    title: "Listening to a Discussion",
    context: "Marketing manager Sandra is holding a team meeting about an upcoming product launch.",
    isPremium: true,
    ttsScript: `Okay everyone, let's get started. We have a lot to cover for the Horizon product launch. As you know, we've moved the launch date from September 10th to October 3rd to give the development team additional time to finalize the mobile app.
That's probably the right call. How does the delay affect our advertising timeline?
We had planned to begin the digital ad campaign six weeks before launch — we'll keep that window, which means digital ads go live on August 22nd. The print campaign, however, will only have a three-week lead and will begin September 12th. Our research shows print has a shorter window to influence purchasing decisions.
What about the launch event venue? Are we still using the rooftop space?
No, unfortunately. The rooftop venue fell through — there's a private corporate event that same weekend we weren't aware of when we booked. We've secured the Meridian Conference Centre instead. The room accommodates up to 200 guests, which is actually 30 more than the rooftop could hold.
That's a relief, because we already have 175 confirmed RSVPs.
Exactly, so timing worked out. One more item — I need two volunteers to manage media kit distribution on launch day. It requires being at the venue by 7am. Marcus, you've handled this role before. Are you available?
I can do it, but I can't arrive until 7:30. I have a school drop-off that morning.
That works fine. The critical time is 7:45 when press begins arriving. I'll confirm the second volunteer by end of this week.`,
    displayScript: `Sandra: Okay everyone, let's get started. We have a lot to cover for the Horizon product launch. As you know, we've moved the launch date from September 10th to October 3rd to give the development team additional time to finalize the mobile app.
Marcus: That's probably the right call. How does the delay affect our advertising timeline?
Sandra: We had planned to begin the digital ad campaign six weeks before launch — we'll keep that window, which means digital ads go live on August 22nd. The print campaign, however, will only have a three-week lead and will begin September 12th. Our research shows print has a shorter window to influence purchasing decisions.
Elena: What about the launch event venue? Are we still using the rooftop space?
Sandra: No, unfortunately. The rooftop venue fell through — there's a private corporate event that same weekend we weren't aware of when we booked. We've secured the Meridian Conference Centre instead. The room accommodates up to 200 guests, which is actually 30 more than the rooftop could hold.
Elena: That's a relief, because we already have 175 confirmed RSVPs.
Sandra: Exactly, so timing worked out. One more item — I need two volunteers to manage media kit distribution on launch day. It requires being at the venue by 7am. Marcus, you've handled this role before. Are you available?
Marcus: I can do it, but I can't arrive until 7:30. I have a school drop-off that morning.
Sandra: That works fine. The critical time is 7:45 when press begins arriving. I'll confirm the second volunteer by end of this week.`,
    questions: [
      {
        prompt: "Why was the Horizon product launch date postponed?",
        options: [
          "The advertising budget was not yet approved",
          "A competitor released a similar product",
          "The development team needed more time to complete the mobile app",
          "The launch venue was unavailable on the original date",
        ],
        correct: 2,
        explanation: "Sandra says the date was moved 'to give the development team additional time to finalize the mobile app.'",
      },
      {
        prompt: "When will the digital advertising campaign begin?",
        options: ["August 22nd", "September 10th", "September 12th", "October 3rd"],
        correct: 0,
        explanation: "Sandra says 'digital ads go live on August 22nd' — six weeks before the October 3rd launch.",
      },
      {
        prompt: "Why was the rooftop venue replaced with the Meridian Conference Centre?",
        options: [
          "The rooftop venue exceeded the event budget",
          "There was a private corporate event at the rooftop that same weekend",
          "The rooftop venue could not accommodate enough guests",
          "The team preferred an indoor setting for the event",
        ],
        correct: 1,
        explanation: "Sandra says 'there's a private corporate event that same weekend we weren't aware of when we booked.'",
      },
      {
        prompt: "How many guests can the Meridian Conference Centre accommodate?",
        options: ["150", "170", "175", "200"],
        correct: 3,
        explanation: "Sandra says 'The room accommodates up to 200 guests.'",
      },
      {
        prompt: "Why can Marcus not arrive at the venue by 7am on launch day?",
        options: [
          "He lives too far from the conference centre",
          "He has an early morning client call",
          "He has a school drop-off that morning",
          "He is presenting at another event",
        ],
        correct: 2,
        explanation: "Marcus says 'I can't arrive until 7:30. I have a school drop-off that morning.'",
      },
    ],
  },

  {
    part: 6,
    title: "Listening for Information",
    context: "A tour guide named Diane is welcoming a group at the Harborview Natural History Museum.",
    isPremium: true,
    ttsScript: `Welcome everyone to the Harborview Natural History Museum. My name is Diane and I will be guiding your visit today. Before we begin, I want to go over a few guidelines to ensure a great experience for everyone.
Photography is welcome throughout all galleries. However, please ensure your devices are on silent mode, and please note that flash photography is strictly not permitted, as it can cause deterioration to the exhibits over time. If you'd like high-quality prints of any exhibit, those are available for purchase in our gift shop on the ground floor.
Food and beverages are permitted only in the second-floor café. Outside food may not be brought into any gallery. For visitors with young children, our café features a dedicated family seating section near the east window with high chairs available.
Today's tour will cover four main galleries. We begin here on the main floor with the Ocean Life exhibit. We'll then move to the second floor for the Dinosaur Discovery Hall, followed by the Climate and Earth gallery on the third floor. We will conclude with the Arctic Expedition exhibit, also on the third floor, which is our newest and most popular addition. We're visiting it last specifically to avoid the peak crowds that gather there in the morning.
The full tour takes approximately 90 minutes. If you need to step away at any point, I can provide you with a self-guided map. Any questions before we begin?`,
    displayScript: `Diane: Welcome everyone to the Harborview Natural History Museum. My name is Diane and I will be guiding your visit today. Before we begin, I want to go over a few guidelines to ensure a great experience for everyone.

Photography is welcome throughout all galleries. However, please ensure your devices are on silent mode, and please note that flash photography is strictly not permitted, as it can cause deterioration to the exhibits over time. If you'd like high-quality prints of any exhibit, those are available for purchase in our gift shop on the ground floor.

Food and beverages are permitted only in the second-floor café. Outside food may not be brought into any gallery. For visitors with young children, our café features a dedicated family seating section near the east window with high chairs available.

Today's tour will cover four main galleries. We begin here on the main floor with the Ocean Life exhibit. We'll then move to the second floor for the Dinosaur Discovery Hall, followed by the Climate and Earth gallery on the third floor. We will conclude with the Arctic Expedition exhibit, also on the third floor, which is our newest and most popular addition. We're visiting it last specifically to avoid the peak crowds that gather there in the morning.

The full tour takes approximately 90 minutes. If you need to step away at any point, I can provide you with a self-guided map.`,
    questions: [
      {
        prompt: "What type of photography is NOT allowed anywhere in the museum galleries?",
        options: [
          "Video recording on phones",
          "Photography in portrait mode",
          "Flash photography",
          "Group photographs",
        ],
        correct: 2,
        explanation: "Diane says 'flash photography is strictly not permitted, as it can cause deterioration to the exhibits over time.'",
      },
      {
        prompt: "Where in the museum are food and beverages permitted?",
        options: [
          "The ground floor lobby seating area",
          "The second-floor café only",
          "Any designated rest area in the galleries",
          "The outdoor courtyard at the back",
        ],
        correct: 1,
        explanation: "Diane states 'Food and beverages are permitted only in the second-floor café.'",
      },
      {
        prompt: "Why will the group visit the Arctic Expedition exhibit last?",
        options: [
          "It requires a separate admission ticket",
          "It is still being prepared for the day",
          "It is located furthest from the entrance",
          "To avoid the peak crowds that form there in the morning",
        ],
        correct: 3,
        explanation: "Diane says they are 'visiting it last specifically to avoid the peak crowds that gather there in the morning.'",
      },
    ],
  },

  {
    part: 7,
    title: "Listening to a Viewpoint",
    context: "Journalist Clara Hayes is being interviewed on a podcast about remote work trends.",
    isPremium: true,
    ttsScript: `Clara, you have been researching remote and hybrid work policies for about three years. What is the most significant shift you have observed?
The biggest change is not the technology — we have had the tools for years. It is the shift in how companies measure employee performance. Before the pandemic, productivity was largely measured by visibility: were you at your desk, were you in meetings? Now, forward-thinking companies are measuring output — what did you actually produce?
Does that shift translate into better results for companies?
For most, yes. Our research found that knowledge workers — those in roles like software development, writing, and financial analysis — reported a 22 percent increase in focused work time when working remotely at least three days per week. However, it is not universal. Roles that depend on real-time collaboration, such as product design or client consulting, showed more mixed outcomes.
And what about employee well-being?
There is a nuanced picture here. About 68 percent of remote workers in our study reported lower daily stress levels compared to full in-office work. Eliminating the commute alone is significant — the average Canadian commutes 26 minutes each way. But roughly 30 percent reported feeling isolated, particularly those living alone or in smaller spaces. Companies that are succeeding long-term are investing in intentional in-person time — quarterly off-sites, team retreats — rather than simply mandating daily office attendance.
What is your main recommendation for organizations?
Stop treating remote work as a perk or a temporary arrangement and start treating it as a design challenge. The organizations doing this well have completely redesigned their communication rhythms. They have not just moved their old office habits online.`,
    displayScript: `Host: Clara, you have been researching remote and hybrid work policies for about three years. What is the most significant shift you have observed?
Clara: The biggest change is not the technology — we have had the tools for years. It is the shift in how companies measure employee performance. Before the pandemic, productivity was largely measured by visibility: were you at your desk, were you in meetings? Now, forward-thinking companies are measuring output — what did you actually produce?
Host: Does that shift translate into better results for companies?
Clara: For most, yes. Our research found that knowledge workers — those in roles like software development, writing, and financial analysis — reported a 22 percent increase in focused work time when working remotely at least three days per week. However, it is not universal. Roles that depend on real-time collaboration, such as product design or client consulting, showed more mixed outcomes.
Host: And what about employee well-being?
Clara: There is a nuanced picture here. About 68 percent of remote workers in our study reported lower daily stress levels compared to full in-office work. Eliminating the commute alone is significant — the average Canadian commutes 26 minutes each way. But roughly 30 percent reported feeling isolated, particularly those living alone or in smaller spaces. Companies that are succeeding long-term are investing in intentional in-person time — quarterly off-sites, team retreats — rather than simply mandating daily office attendance.
Host: What is your main recommendation for organizations?
Clara: Stop treating remote work as a perk or a temporary arrangement and start treating it as a design challenge. The organizations doing this well have completely redesigned their communication rhythms. They have not just moved their old office habits online.`,
    questions: [
      {
        prompt: "According to Clara, what is the most significant shift in how companies now measure productivity?",
        options: [
          "Adopting newer collaboration software platforms",
          "Moving from measuring visibility to measuring output",
          "Reducing the total number of required meetings",
          "Hiring managers who specialize in remote teams",
        ],
        correct: 1,
        explanation: "Clara says the shift is from measuring visibility ('were you at your desk') to measuring output ('what did you actually produce').",
      },
      {
        prompt: "By how much did focused work time increase for remote knowledge workers in Clara's research?",
        options: ["15 percent", "18 percent", "22 percent", "30 percent"],
        correct: 2,
        explanation: "Clara states knowledge workers 'reported a 22 percent increase in focused work time when working remotely at least three days per week.'",
      },
      {
        prompt: "What percentage of remote workers in Clara's study reported lower daily stress levels?",
        options: ["50 percent", "60 percent", "68 percent", "75 percent"],
        correct: 2,
        explanation: "Clara says 'About 68 percent of remote workers in our study reported lower daily stress levels.'",
      },
      {
        prompt: "What does Clara recommend as a solution for worker isolation in remote settings?",
        options: [
          "Requiring all employees to return to office full-time",
          "Providing financial allowances for home office upgrades",
          "Investing in intentional in-person time like quarterly off-sites",
          "Hiring only local employees to reduce commute stress",
        ],
        correct: 2,
        explanation: "Clara recommends 'investing in intentional in-person time — quarterly off-sites, team retreats' rather than mandating daily office attendance.",
      },
    ],
  },

  {
    part: 8,
    title: "Listening to a Discussion",
    context: "A public town hall is being held about a proposed renovation of Greenfield Community Park.",
    isPremium: true,
    ttsScript: `Good evening and welcome to the public town hall for the proposed Greenfield Park Renovation. Tonight we have city planner Howard Kim, parks director Alicia Torres, and local business representative Frank Nguyen. Howard, can you walk everyone through the proposal?
Thank you. The city is proposing a $4.2 million phased renovation of Greenfield Park. Phase one covers replacement of the playground equipment, construction of new fully accessible pathways, and a restored splash pad. We expect phase one to be complete within 14 months of breaking ground. Phase two will add an outdoor amphitheatre and expanded parking. However, phase two is contingent on receiving a provincial infrastructure grant we have applied for.
My first question is about parking. Several businesses on Greenfield Avenue depend on that lot. What happens to it during construction?
During phase one, the western lot will be fully closed. The city has arranged a temporary overflow parking area at the former Fairview School property, three blocks north. A free shuttle service will run between that lot and the park entrance every 20 minutes throughout the day.
I want to raise another concern on behalf of local businesses. Many of us are worried about 14 months of reduced foot traffic in front of our stores. We need a commitment from the city that it will actively advertise which parts of the park remain open during construction.
That is a completely fair request, Frank. We will build a dedicated communications and marketing campaign specifically to inform the community about ongoing park access throughout the construction period.
One final question: what is the source of funding for phase one?
Phase one is fully funded through the city's existing capital reserves, so it will proceed regardless of the provincial grant decision. Phase two, as I mentioned, is entirely dependent on receiving that grant. We expect to hear the outcome of the grant application by next spring.`,
    displayScript: `Moderator: Good evening and welcome to the public town hall for the proposed Greenfield Park Renovation. Tonight we have city planner Howard Kim, parks director Alicia Torres, and local business representative Frank Nguyen. Howard, can you walk everyone through the proposal?
Howard: Thank you. The city is proposing a $4.2 million phased renovation of Greenfield Park. Phase one covers replacement of the playground equipment, construction of new fully accessible pathways, and a restored splash pad. We expect phase one to be complete within 14 months of breaking ground. Phase two will add an outdoor amphitheatre and expanded parking. However, phase two is contingent on receiving a provincial infrastructure grant we have applied for.
Audience Member: My first question is about parking. Several businesses on Greenfield Avenue depend on that lot. What happens to it during construction?
Alicia: During phase one, the western lot will be fully closed. The city has arranged a temporary overflow parking area at the former Fairview School property, three blocks north. A free shuttle service will run between that lot and the park entrance every 20 minutes throughout the day.
Frank: I want to raise another concern on behalf of local businesses. Many of us are worried about 14 months of reduced foot traffic in front of our stores. We need a commitment from the city that it will actively advertise which parts of the park remain open during construction.
Howard: That is a completely fair request, Frank. We will build a dedicated communications and marketing campaign specifically to inform the community about ongoing park access throughout the construction period.
Audience Member: One final question: what is the source of funding for phase one?
Howard: Phase one is fully funded through the city's existing capital reserves, so it will proceed regardless of the provincial grant decision. Phase two, as I mentioned, is entirely dependent on receiving that grant. We expect to hear the outcome of the grant application by next spring.`,
    questions: [
      {
        prompt: "What is the total proposed budget for the Greenfield Park renovation?",
        options: ["$2.8 million", "$3.5 million", "$4.2 million", "$5.6 million"],
        correct: 2,
        explanation: "Howard states 'The city is proposing a $4.2 million phased renovation of Greenfield Park.'",
      },
      {
        prompt: "What three elements are included in phase one of the renovation?",
        options: [
          "An amphitheatre, expanded parking, and new lighting",
          "Playground replacement, accessible pathways, and a restored splash pad",
          "A community centre, benches, and pathway repairs",
          "New landscaping, a fountain, and a sports court",
        ],
        correct: 1,
        explanation: "Howard says phase one covers 'replacement of the playground equipment, construction of new fully accessible pathways, and a restored splash pad.'",
      },
      {
        prompt: "Where will drivers park during the phase one construction?",
        options: [
          "In a nearby underground parking garage",
          "On residential streets east of the park",
          "A temporary lot at the former Fairview School, three blocks north",
          "At the Greenfield Community Centre lot",
        ],
        correct: 2,
        explanation: "Alicia says the city has arranged 'a temporary overflow parking area at the former Fairview School property, three blocks north.'",
      },
      {
        prompt: "What does Frank Nguyen ask the city to commit to?",
        options: [
          "Financially compensating businesses for lost revenue",
          "Completing the construction ahead of the 14-month schedule",
          "Actively advertising which parts of the park stay open during construction",
          "Restricting noisy construction work to after business hours",
        ],
        correct: 2,
        explanation: "Frank asks for 'a commitment from the city that it will actively advertise which parts of the park remain open during construction.'",
      },
      {
        prompt: "What determines whether phase two of the renovation will go ahead?",
        options: [
          "A public vote by local residents",
          "Approval from the business association on Greenfield Avenue",
          "The city's annual capital budget review",
          "Receiving the provincial infrastructure grant",
        ],
        correct: 3,
        explanation: "Howard says 'Phase two is entirely dependent on receiving that grant' — the provincial infrastructure grant.",
      },
    ],
  },
];
