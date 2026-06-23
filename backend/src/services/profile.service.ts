import { prisma } from "../prisma";

export async function getProfile(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      bio: true,
      createdAt: true,
      following: { select: { followedId: true } },
      followedBy: { select: { followerId: true } },
    },
  });

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    bio: user.bio,
    joinedAt: user.createdAt,
    followingCount: user.following.length,
    followerCount: user.followedBy.length,
  };
}
