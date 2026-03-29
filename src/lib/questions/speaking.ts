export type SpeakingTask = {
  taskNumber: number;
  title: string;
  type:
    | "advice"
    | "personal-experience"
    | "describe-scene"
    | "make-predictions"
    | "compare-persuade"
    | "difficult-situation"
    | "express-opinion"
    | "unusual-situation";
  prompt: string;
  imageAlt?: string;
  prepSeconds: 30;
  recordSeconds: number;
  tips: string[];
};

export type SpeakingSet = {
  id: "mock-a" | "mock-b";
  name: string;
  tasks: SpeakingTask[];
};

export const SPEAKING_SETS: SpeakingSet[] = [
  {
    id: "mock-a",
    name: "Mock Test A",
    tasks: [
      {
        taskNumber: 1,
        title: "Giving Advice",
        type: "advice",
        prompt:
          "Your close friend recently moved to a new city for a job opportunity. While they are excited about the new role, they have been calling you frequently to say they feel lonely and are having a lot of difficulty making new friends. They don't know anyone in the city yet, don't feel comfortable approaching strangers, and feel awkward in social situations outside of work. They have asked for your advice. What would you suggest they do to build a social life and feel more connected in their new city?",
        prepSeconds: 30,
        recordSeconds: 90,
        tips: [
          "Start with empathy — acknowledge how your friend feels before jumping into suggestions.",
          "Give at least two or three specific, practical pieces of advice rather than general statements.",
          "Use natural connectors like 'First, I would suggest...', 'Another thing you could try is...', and 'Most importantly...'",
        ],
      },
      {
        taskNumber: 2,
        title: "Talking About a Personal Experience",
        type: "personal-experience",
        prompt:
          "Think about a time in your life when you had to adapt to an unexpected change — something that happened that you did not plan for and that required you to adjust your approach, your routine, or your expectations. Describe what happened, how you felt at the time, and what you did to cope with or adapt to the change. What did you learn from that experience?",
        prepSeconds: 30,
        recordSeconds: 60,
        tips: [
          "Use the structure: situation → how you felt → what you did → what you learned.",
          "Be specific — use real details about the situation rather than speaking generally.",
          "Use past tense consistently and vary your vocabulary (e.g., 'I was caught off guard,' 'I had to reconsider,' 'it turned out that...').",
        ],
      },
      {
        taskNumber: 3,
        title: "Describing a Scene",
        type: "describe-scene",
        prompt:
          "Look at the picture. It shows a busy farmers market taking place outdoors on a sunny morning. Describe what you see in as much detail as possible — the people, the stalls, the products, the activity, and the overall atmosphere of the scene.",
        imageAlt:
          "A vibrant outdoor farmers market on a sunny day. Colourful canvas tents and wooden stalls line a wide pedestrian path. Vendors stand behind tables displaying fresh vegetables, fruit, homemade jams, bread, and flowers. Shoppers of various ages walk between the stalls, some carrying reusable bags, some talking to vendors, and some looking at produce. A child holds a bunch of sunflowers. In the background, trees and a park setting are visible. The atmosphere feels lively, communal, and cheerful.",
        prepSeconds: 30,
        recordSeconds: 60,
        tips: [
          "Organize your description: start with the overall scene, then move to specific people, then focus on details in the foreground and background.",
          "Use descriptive language — mention colours, actions, and the general atmosphere.",
          "Don't just list what you see — use complete sentences: 'In the foreground, a vendor is arranging...' rather than just 'I see a vendor.'",
        ],
      },
      {
        taskNumber: 4,
        title: "Making Predictions",
        type: "make-predictions",
        prompt:
          "Look at the picture. It shows a construction site where a large bridge is being built over a wide river. The bridge is about halfway complete — the supports are in place on both sides of the river, but the central span has not yet been connected. A crew of workers in hard hats and safety vests can be seen on the site, and heavy equipment is positioned nearby. Based on what you see, describe what is happening in this picture and make predictions about what will happen next — both in the near future and in the longer term.",
        imageAlt:
          "A large bridge construction site over a wide river. Two concrete pylons rise from the water on each side, connected to partial bridge decks that extend toward the centre but have not yet met. Construction cranes are visible on both banks. Workers in orange and yellow safety vests move around the base of the pylons and on the partial deck. Heavy machinery, including a concrete mixer and a flatbed truck loaded with steel beams, is parked nearby. The river flows underneath. The sky is overcast.",
        prepSeconds: 30,
        recordSeconds: 60,
        tips: [
          "Start by describing the current state of the scene, then move to short-term predictions, then longer-term outcomes.",
          "Use future tense structures: 'In the coming weeks, workers will likely...', 'Once the bridge is complete, it will...'",
          "Think beyond the obvious — consider how the bridge might affect the surrounding community, traffic, or economy.",
        ],
      },
      {
        taskNumber: 5,
        title: "Comparing and Persuading",
        type: "compare-persuade",
        prompt:
          "Look at the two pictures. The first shows a small, independently owned local coffee shop — a cozy space with mismatched furniture, local artwork on the walls, a chalkboard menu, and a barista who appears to know the customers personally. The second shows a large chain coffee franchise with uniform branding, standardized furniture, a digital menu board, efficient counter service, and a long line of customers. Your friend is deciding whether to open a small independent coffee shop or purchase a franchise licence for the large chain. Which option would you recommend, and why?",
        imageAlt:
          "Two contrasting coffee shop environments side by side. Left image: A warm, intimate independent coffee shop with wooden furniture, plants, local art on the walls, a handwritten chalkboard menu, and a friendly barista chatting with a regular customer. Right image: A bright, modern chain coffee franchise with standardized green-and-white branding, a digital menu board, uniform seating, and a busy counter with multiple staff serving a long queue of customers.",
        prepSeconds: 30,
        recordSeconds: 60,
        tips: [
          "State your recommendation clearly at the start — don't leave the listener guessing.",
          "Acknowledge at least one advantage of the option you are NOT recommending before explaining why your choice is better.",
          "Use persuasive language: 'I strongly believe...', 'The key advantage is...', 'Ultimately...'",
        ],
      },
      {
        taskNumber: 6,
        title: "Dealing With a Difficult Situation",
        type: "difficult-situation",
        prompt:
          "You are a team leader at work. One of your team members, Jordan, has been missing project deadlines consistently over the past month. This has caused delays that affect the rest of the team and has put a key client project at risk. You have noticed that Jordan seems stressed but has not said anything to you. You need to call Jordan to address the situation professionally. What would you say in this phone call? Speak as if you are actually making the call.",
        prepSeconds: 30,
        recordSeconds: 60,
        tips: [
          "Open with a professional greeting and clearly state the purpose of the call without being accusatory.",
          "Use a balanced tone — address the issue firmly but also show you care about Jordan's wellbeing.",
          "Suggest a specific path forward: a check-in meeting, a revised deadline, or an offer of support.",
        ],
      },
      {
        taskNumber: 7,
        title: "Expressing an Opinion",
        type: "express-opinion",
        prompt:
          "Some people believe that children under the age of 16 should not be allowed to own or use smartphones. They argue that smartphones are harmful to children's mental health, social development, and academic performance. Others believe that smartphones are essential tools that help children stay connected, access information, and develop digital skills they will need in their lives. What is your opinion on this issue? Do you agree or disagree that children should not have smartphones before age 16? Support your point of view with specific reasons and examples.",
        prepSeconds: 30,
        recordSeconds: 90,
        tips: [
          "State your position clearly in the first sentence.",
          "Give two or three well-developed reasons — don't just list points; explain each one with a brief example or consequence.",
          "Address the opposing view briefly and explain why you still hold your position despite that argument.",
        ],
      },
      {
        taskNumber: 8,
        title: "Dealing With an Unusual Situation",
        type: "unusual-situation",
        prompt:
          "Look at the picture. It shows a man dressed in a full business suit — tie, briefcase, polished shoes — sitting on a park bench. Surrounding him on the bench and on the ground are approximately fifteen live chickens. The man appears completely calm and is reading a newspaper. Passersby are looking at him with surprise and confusion. Imagine you are one of the passersby who has stopped to observe this scene. Describe what you see, what you think might be happening, and what you would do in this situation.",
        imageAlt:
          "A park bench scene with a well-dressed businessman sitting calmly in a dark suit and tie, briefcase by his feet, reading a broadsheet newspaper. Surrounding him are roughly fifteen chickens of various colours — some perched on the bench beside him, some pecking at the ground around his feet. His expression is completely neutral and unbothered. In the background, a park path is visible with several pedestrians stopped and staring with expressions of disbelief and amusement.",
        prepSeconds: 30,
        recordSeconds: 60,
        tips: [
          "Begin by describing what you see, then move quickly to speculating about why this is happening — be creative but logical.",
          "Use hedging language for speculation: 'He might be...', 'Perhaps he is...', 'It looks as though...'",
          "Describe what you would do — approach him, call someone, take a photo — and explain why.",
        ],
      },
    ],
  },
  {
    id: "mock-b",
    name: "Mock Test B",
    tasks: [
      {
        taskNumber: 1,
        title: "Giving Advice",
        type: "advice",
        prompt:
          "Your younger sibling has been studying business at university for two years. They recently told you they want to drop out of school to launch their own online business selling handmade goods. They have a small following on social media and some early sales, but no formal business plan, limited savings, and no outside funding. They are excited but nervous, and they have come to you for honest advice. What would you tell them? Would you encourage them to pursue the business, finish their degree first, or find another path? Give specific, practical advice.",
        prepSeconds: 30,
        recordSeconds: 90,
        tips: [
          "Acknowledge your sibling's ambition and excitement before giving your advice — this keeps the tone supportive.",
          "Provide a balanced perspective: what are the risks, and what steps could reduce them?",
          "Give concrete suggestions: 'You could try running the business part-time while finishing school' or 'Consider speaking to a mentor or small business advisor first.'",
        ],
      },
      {
        taskNumber: 2,
        title: "Talking About a Personal Experience",
        type: "personal-experience",
        prompt:
          "Think about the most difficult decision you have ever had to make — a choice that was genuinely hard because both options had real advantages and real costs, or because the outcome was uncertain. Describe the situation, the decision you faced, what you ultimately chose to do, and how things turned out. What would you do differently, if anything, looking back?",
        prepSeconds: 30,
        recordSeconds: 60,
        tips: [
          "Set the scene briefly — give enough context so the listener understands the stakes.",
          "Be honest and specific: the most compelling answers involve real dilemmas, not simple choices.",
          "Structure your response: context → the choice you faced → what you decided → the outcome → what you learned.",
        ],
      },
      {
        taskNumber: 3,
        title: "Describing a Scene",
        type: "describe-scene",
        prompt:
          "Look at the picture. It shows the waiting room of a busy hospital emergency department. Describe everything you see in as much detail as possible — the people present, their expressions and actions, the layout of the space, and the overall atmosphere.",
        imageAlt:
          "A busy hospital emergency room waiting area. Rows of plastic chairs, most of them occupied, line the walls of a brightly lit room with white walls and a linoleum floor. A triage nurse in scrubs stands behind a raised reception desk reviewing paperwork. Patients in various states of distress fill the chairs — an elderly man holds his arm in a sling, a young woman with her head bowed holds an ice pack to her face, a parent holds a crying toddler, and a man in work clothes with a bandaged hand leans forward anxiously. A digital triage number display on the wall shows number 47. Staff in the background move quickly between a set of double swing doors.",
        prepSeconds: 30,
        recordSeconds: 60,
        tips: [
          "Move systematically through the scene — background to foreground, or left to right — so your description feels organized.",
          "Describe specific people's actions and emotions, not just their physical appearance.",
          "Capture the overall atmosphere with descriptive words: 'The room has a tense, anxious feeling...' or 'Despite the chaos, staff seem focused and purposeful.'",
        ],
      },
      {
        taskNumber: 4,
        title: "Making Predictions",
        type: "make-predictions",
        prompt:
          "Look at the picture. It shows a city street where a large older building has recently been demolished. Rubble and broken concrete fill much of the lot. Two large construction cranes are positioned at the edge of the cleared area, and a construction fence surrounds the site with a permit notice visible. Based on what you see, describe what is currently happening and make predictions about what will be built here and what impact it will have on the surrounding neighbourhood.",
        imageAlt:
          "A city block demolition and construction site. The foreground shows a cleared lot covered in rubble — broken bricks, dust, and demolished concrete foundations. Two tall yellow construction cranes are positioned at opposite ends of the site. A metal construction fence runs along the street perimeter with a project sign displaying a city building permit. Neighbouring buildings on either side — a pharmacy and a dry cleaner — remain standing. The street beyond is partially blocked with temporary orange barriers and detour signs. Pedestrians walk along the opposite sidewalk, some glancing at the site.",
        prepSeconds: 30,
        recordSeconds: 60,
        tips: [
          "Describe the current state first, then predict what will be constructed, then predict the longer-term neighbourhood impact.",
          "Use varied future language: 'Construction will likely begin...', 'Within a year, we can expect...', 'Once completed, the building may...'",
          "Consider who is affected — residents, nearby businesses, commuters — to add depth to your predictions.",
        ],
      },
      {
        taskNumber: 5,
        title: "Comparing and Persuading",
        type: "compare-persuade",
        prompt:
          "Look at the two pictures. The first shows a traditional classroom with students sitting in rows of desks, a teacher writing on a whiteboard, and a structured, formal learning environment. The second shows a student at home studying online — seated at a desk with a laptop, headphones on, multiple browser tabs open, and textbooks and notes spread around them. A friend of yours is deciding how to complete a certificate program: through in-person classes at a local college or through a fully online program at the same institution. Which option would you recommend, and why?",
        imageAlt:
          "Two contrasting educational environments side by side. Left image: A traditional college classroom with approximately twenty students seated in rows at desks, all facing a teacher who stands at the front writing on a whiteboard. Students take notes. The room is formal, well-lit, and structured. Right image: A student studying at home in a home office setup. They sit at a desk with a laptop showing a video lecture, headphones around their neck, course materials spread out around them. A coffee mug sits beside the laptop. The setting is personal, flexible, and informal.",
        prepSeconds: 30,
        recordSeconds: 60,
        tips: [
          "Make your recommendation in the first sentence.",
          "Compare both options fairly — mention what the option you did NOT choose does well before explaining its limitations.",
          "Tailor your recommendation to the scenario: your friend's needs, schedule, and learning style are relevant factors.",
        ],
      },
      {
        taskNumber: 6,
        title: "Dealing With a Difficult Situation",
        type: "difficult-situation",
        prompt:
          "You live in an apartment building and have an assigned parking spot in the underground garage. For the past three weeks, your neighbour from unit 8B has been parking in your spot, even though their own spot is directly beside yours. You have left two written notes on the car on previous occasions, but the situation has continued. You have decided to knock on your neighbour's door and speak to them directly. What would you say? Speak as if you are actually having that conversation.",
        prepSeconds: 30,
        recordSeconds: 60,
        tips: [
          "Start the conversation politely — introduce yourself if needed and explain why you are there.",
          "Be direct about the problem without being aggressive: state the impact on you clearly.",
          "Propose a clear resolution and leave the door open for a positive outcome: 'I'm sure we can sort this out.'",
        ],
      },
      {
        taskNumber: 7,
        title: "Expressing an Opinion",
        type: "express-opinion",
        prompt:
          "Some people argue that immigration benefits a country's economy more than it creates social or economic problems. They say immigrants fill critical labour shortages, contribute to innovation, pay taxes, and enrich the cultural fabric of a society. Others argue that large-scale immigration puts pressure on housing, public services, and job markets for existing residents, and can create social tensions. What is your opinion on this topic? Do you believe that immigration benefits Canada's economy more than it creates problems? Support your view with specific reasoning and examples.",
        prepSeconds: 30,
        recordSeconds: 90,
        tips: [
          "Open with a clear, direct statement of your position.",
          "Use at least two developed arguments to support your view — go beyond surface-level points and explain the reasoning.",
          "Acknowledge the complexity of the issue: 'While it is true that...', 'Critics rightly point out...', before returning to your main argument.",
        ],
      },
      {
        taskNumber: 8,
        title: "Dealing With an Unusual Situation",
        type: "unusual-situation",
        prompt:
          "Look at the picture. It shows a woman dressed in a full NASA-style spacesuit — white suit, helmet under her arm, mission patch on the sleeve — standing at a regular supermarket checkout line. She is looking at her phone and has a basket of ordinary groceries: milk, bread, eggs, and a bag of chips. The cashier and other customers around her appear stunned. Imagine you are the next person in line behind her. Describe what you see, speculate about what might be happening, and explain what you would do or say.",
        imageAlt:
          "A supermarket checkout line. In the foreground, a woman in a white NASA-style spacesuit stands at the conveyor belt. Her helmet is tucked under one arm and she is looking down at her phone with one hand. On the conveyor belt in front of her: a carton of milk, a loaf of bread, a carton of eggs, and a bag of potato chips. The cashier — a teenager in a store uniform — stares at her with wide eyes and an open mouth. A man behind the woman in line holds his shopping basket and looks equally shocked. The store lighting is bright and ordinary.",
        prepSeconds: 30,
        recordSeconds: 60,
        tips: [
          "Describe the scene vividly first, using specific details from the image.",
          "Have fun with your speculation — be creative, but use logical connectors: 'She might have just returned from...', 'Perhaps she is...'",
          "Explain your reaction in character — would you say something? Take a photo? What would you actually do in this moment?",
        ],
      },
    ],
  },
];
