import {
  countFollowers,
  countThreads,
  countLikesOnThreads,
  countRepliesOnThreads,
  findTopThreads,
  findLatestLikes,
  findLatestReplies,
  findLatestFollows,
} from "../repositories/analytics.repository";

export async function getAnalyticsSummary(userId: string) {
  const [total_followers, total_threads, total_likes, total_replies] = await Promise.all([
    countFollowers(userId),
    countThreads(userId),
    countLikesOnThreads(userId),
    countRepliesOnThreads(userId),
  ]);

  return { total_followers, total_threads, total_likes, total_replies };
}

export async function getTopThreadsForUser(userId: string) {
  const threads = await findTopThreads(userId);

  return threads
    .map((thread) => ({
      id: thread.id,
      content: thread.content,
      image: thread.image,
      created_at: thread.created_at,
      total_likes: thread._count.likes,
      total_replies: thread._count.replies,
      total_engagement: thread._count.likes + thread._count.replies,
    }))
    .sort((a, b) => b.total_engagement - a.total_engagement)
    .slice(0, 20);
}

export async function getActivityFeed(userId: string) {
  const [likes, replies, follows] = await Promise.all([
    findLatestLikes(userId),
    findLatestReplies(userId),
    findLatestFollows(userId),
  ]);

  const likeItems = likes.map((item) => ({
    type: "LIKE" as const,
    actor: { username: item.user.username, photo_profile: item.user.photo_profile },
    thread_content: item.thread.content,
    created_at: item.created_at,
  }));

  const replyItems = replies.map((item) => ({
    type: "REPLY" as const,
    actor: { username: item.user.username, photo_profile: item.user.photo_profile },
    thread_content: item.thread.content,
    reply_content: item.content,
    created_at: item.created_at,
  }));

  const followItems = follows.map((item) => ({
    type: "FOLLOW" as const,
    actor: { username: item.follower.username, photo_profile: item.follower.photo_profile },
    created_at: item.created_at,
  }));

  return [...likeItems, ...replyItems, ...followItems]
    .sort((a, b) => b.created_at.getTime() - a.created_at.getTime())
    .slice(0, 30);
}
