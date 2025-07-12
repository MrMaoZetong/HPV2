export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  level: number;
  xp: number;
  badges: Badge[];
  createdAt: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  requirements: string;
}

export interface Thread {
  id: string;
  title: string;
  description: string;
  genre: Genre;
  status: 'ongoing' | 'completed' | 'paused';
  createdBy: string;
  participants: string[];
  segments: Segment[];
  maxSegments?: number;
  trending: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Segment {
  id: string;
  threadId: string;
  authorId: string;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  likes: number;
  comments: Comment[];
  order: number;
  createdAt: Date;
}

export interface Comment {
  id: string;
  segmentId: string;
  authorId: string;
  content: string;
  likes: number;
  createdAt: Date;
}

export interface Genre {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
}

export interface MediaGenerationRequest {
  segmentId: string;
  prompt: string;
  type: 'image' | 'video';
  style?: string;
  duration?: number; // for videos, in seconds
}

export interface UserStats {
  totalSegments: number;
  totalLikes: number;
  totalThreads: number;
  currentStreak: number;
  totalXP: number;
  level: number;
}