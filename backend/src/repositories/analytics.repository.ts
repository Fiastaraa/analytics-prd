import { prisma } from "../prisma";

export async function countFollowers(userId: string) {
  return prisma.follow.count({ where: { following_id: userId } });
}

export async function countThreads(userId: string) {
  return prisma.thread.count({ where: { created_by: userId } });
}

export async function countLikesOnThreads(userId: string) {
  return prisma.like.count({ where: { thread: { created_by: userId } } });
}

export async function countRepliesOnThreads(userId: string) {
  return prisma.reply.count({ where: { thread: { created_by: userId } } });
}

export async function findTopThreads(userId: string) {
  return prisma.thread.findMany({
    where: { created_by: userId },
    include: { _count: { select: { likes: true, replies: true } } },
    orderBy: [{ created_at: "desc" }],
    take: 20,
  });
}

export async function findLatestLikes(userId: string) {
  return prisma.like.findMany({
    where: { thread: { created_by: userId } },
    select: {
      created_at: true,
      user: { select: { username: true, photo_profile: true } },
      thread: { select: { content: true } },
    },
    orderBy: { created_at: "desc" },
    take: 15,
  });
}

export async function findLatestReplies(userId: string) {
  return prisma.reply.findMany({
    where: { thread: { created_by: userId } },
    select: {
      created_at: true,
      content: true,
      user: { select: { username: true, photo_profile: true } },
      thread: { select: { content: true } },
    },
    orderBy: { created_at: "desc" },
    take: 15,
  });
}

export async function findLatestFollows(userId: string) {
  return prisma.follow.findMany({
    where: { following_id: userId },
    select: {
      created_at: true,
      follower: { select: { username: true, photo_profile: true } },
    },
    orderBy: { created_at: "desc" },
    take: 15,
  });
}
