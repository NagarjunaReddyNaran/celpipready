import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.question.createMany({
    data: [
      {
        section: "listening",
        taskType: "daily_conversation",
        difficulty: "intermediate",
        prompt: "Listen to the conversation. What does Sarah suggest doing on Saturday morning?",
        options: JSON.stringify(["Go hiking in the park", "Visit the art museum", "Have brunch downtown", "Go to the farmer's market"]),
        correctAnswer: "Go hiking in the park",
        explanation: "Sarah specifically mentions wanting to get exercise before afternoon activities.",
        isPremium: false
      },
      {
        section: "reading",
        taskType: "correspondence",
        difficulty: "intermediate",
        prompt: "Read the email. What does the applicant need to do?\n\nSubject: Job Application — Marketing Coordinator\n\nDear Ms. Chen, Thank you for your application. We would like to invite you for a panel interview on March 15th at 2:00 PM. Please confirm your availability by responding to this email.\n\nBest regards, James Okafor, HR Manager",
        options: JSON.stringify(["Send a new portfolio", "Confirm availability by email", "Call the HR manager", "Submit a writing exercise"]),
        correctAnswer: "Confirm availability by email",
        explanation: "The email asks Ms. Chen to confirm her availability by responding to this email.",
        isPremium: false
      },
      {
        section: "writing",
        taskType: "email",
        difficulty: "intermediate",
        prompt: "You recently had a problem with a product you bought online. Write an email to customer service. Describe the product and problem, explain how it affected you, and request a specific solution. Write 150-200 words.",
        isPremium: false
      },
      {
        section: "writing",
        taskType: "survey",
        difficulty: "intermediate",
        prompt: "Your city is planning transit improvements. Respond to all three survey points: 1) Subway extension or more bus routes — which do you support and why? 2) Suggest a solution to crowded rush-hour trains. 3) What feature would be most useful in a new transit app? Write 150-200 words.",
        isPremium: false
      },
      {
        section: "speaking",
        taskType: "giving_advice",
        difficulty: "intermediate",
        prompt: "Your friend just moved to a new city and is struggling to meet people. Give your friend advice on how to make friends in a new place. Speak for 60-90 seconds.",
        isPremium: true
      },
      {
        section: "speaking",
        taskType: "talking_about_experience",
        difficulty: "intermediate",
        prompt: "Describe a time when you had to learn something new quickly. What did you learn, how did you learn it, and what was the result? Speak for 60-90 seconds.",
        isPremium: true
      }
    ]
  });
  console.log("Database seeded successfully");
}

main().catch(console.error).finally(() => prisma.$disconnect());
