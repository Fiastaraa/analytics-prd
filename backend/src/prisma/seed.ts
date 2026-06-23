import bcrypt from "bcryptjs";
import { prisma } from "../prisma";

const users = [
  {
    email: "demo@creator.com",
    username: "demo_creator",
    full_name: "Demo Creator",
    bio: "Analytics-first creator companion.",
    photo_profile: null,
    password: "Demo123!",
  },
  {
    email: "sarah@creator.com",
    username: "sarah_j",
    full_name: "Sarah Jones",
    bio: "Story-driven creator.",
    photo_profile: null,
    password: "Demo123!",
  },
  {
    email: "mike@creator.com",
    username: "mike_dev",
    full_name: "Mike Developer",
    bio: "Tech creator and builder.",
    photo_profile: null,
    password: "Demo123!",
  },
];

const threadContents = [
  "Just launched my new project with a clean analytics stack.",
  "Why authenticity matters more than perfection in content.",
  "Top engagement tactics for creator product launches.",
  "How I plan my weekly content roadmap.",
  "Building community with daily creator check-ins.",
  "The story behind my most successful thread.",
  "Lessons learned from pivoting my creator goals.",
  "How I measure creator momentum without burnout.",
  "Best tips for turning replies into deeper conversations.",
  "Behind the scenes of my content analytics setup.",
];

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
  const existing = await prisma.user.findUnique({ where: { email: "demo@creator.com" } });
  if (existing) return;

  const hashedPassword = await bcrypt.hash("Demo123!", 10);

  const createdUsers = [] as Array<{ id: string }>;

  for (const user of users) {
    const created = await prisma.user.create({
      data: {
        email: user.email,
        username: user.username,
        full_name: user.full_name,
        bio: user.bio,
        photo_profile: user.photo_profile,
        password: hashedPassword,
      },
    });
    createdUsers.push({ id: created.id });
  }

  for (const user of createdUsers) {
    for (let index = 0; index < 10; index += 1) {
      await prisma.thread.create({
        data: {
          content: threadContents[index % threadContents.length],
          image: null,
          created_by: user.id,
        },
      });
    }
  }

  const demoUser = createdUsers[0];
  const threads = await prisma.thread.findMany({ where: { created_by: demoUser.id } });

  for (const thread of threads) {
    for (let i = 0; i < randomInt(8, 15); i += 1) {
      const liker = createdUsers[(i + 1) % (createdUsers.length - 1) + 1];
      await prisma.like.create({ data: { thread_id: thread.id, user_id: liker.id } });
    }

    for (let j = 0; j < randomInt(4, 10); j += 1) {
      const replier = createdUsers[(j + 2) % (createdUsers.length - 1) + 1];
      await prisma.reply.create({
        data: {
          thread_id: thread.id,
          user_id: replier.id,
          content: `Reply ${j + 1}: This is great insight and I want to learn more!`,
        },
      });
    }
  }

  await prisma.follow.createMany({
    data: [
      { follower_id: createdUsers[1].id, following_id: demoUser.id },
      { follower_id: createdUsers[2].id, following_id: demoUser.id },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
