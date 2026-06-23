import api from './axios';

export type DashboardSummary = {
  total_followers: number;
  total_threads: number;
  total_likes: number;
  total_replies: number;
};

export type TopThread = {
  id: string;
  content: string;
  image: string | null;
  created_at: string;
  total_likes: number;
  total_replies: number;
  total_engagement: number;
};

export type ActivityActor = {
  username: string;
  photo_profile: string | null;
};

export type ActivityItem = {
  type: 'LIKE' | 'REPLY' | 'FOLLOW';
  actor: ActivityActor;
  thread_content?: string;
  reply_content?: string;
  created_at: string;
};

export async function fetchDashboardSummary() {
  const response = await api.get<DashboardSummary>('/analytics/summary');
  return response.data;
}

export async function fetchTopThreads() {
  const response = await api.get<TopThread[]>('/analytics/top-threads');
  return response.data;
}

export async function fetchActivityFeed() {
  const response = await api.get<ActivityItem[]>('/analytics/activity');
  return response.data;
}
