import { User, Badge } from '@/types/story';

export interface LevelRequirement {
  level: number;
  xpRequired: number;
  title: string;
}

export const LEVEL_REQUIREMENTS: LevelRequirement[] = [
  { level: 1, xpRequired: 0, title: 'Apprenti Conteur' },
  { level: 2, xpRequired: 100, title: 'Narrateur Novice' },
  { level: 3, xpRequired: 250, title: 'Écrivain Prometteur' },
  { level: 4, xpRequired: 500, title: 'Conteur Confirmé' },
  { level: 5, xpRequired: 1000, title: 'Maître des Mots' },
  { level: 6, xpRequired: 1750, title: 'Architecte d\'Histoires' },
  { level: 7, xpRequired: 2750, title: 'Créateur de Mondes' },
  { level: 8, xpRequired: 4000, title: 'Légende Vivante' },
  { level: 9, xpRequired: 6000, title: 'Gardien des Récits' },
  { level: 10, xpRequired: 10000, title: 'Maître du Multivers' },
];

export const XP_REWARDS = {
  FIRST_SEGMENT: 50,
  NEW_SEGMENT: 25,
  SEGMENT_LIKED: 5,
  COMMENT_RECEIVED: 3,
  THREAD_COMPLETED: 100,
  BADGE_EARNED: 75,
  DAILY_LOGIN: 10,
  CONSECUTIVE_DAYS: 5, // per day of streak
};

export function calculateLevel(xp: number): number {
  for (let i = LEVEL_REQUIREMENTS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_REQUIREMENTS[i].xpRequired) {
      return LEVEL_REQUIREMENTS[i].level;
    }
  }
  return 1;
}

export function getXPForNextLevel(currentLevel: number): number {
  const nextLevel = LEVEL_REQUIREMENTS.find(req => req.level === currentLevel + 1);
  return nextLevel ? nextLevel.xpRequired : LEVEL_REQUIREMENTS[LEVEL_REQUIREMENTS.length - 1].xpRequired;
}

export function getLevelTitle(level: number): string {
  const levelReq = LEVEL_REQUIREMENTS.find(req => req.level === level);
  return levelReq ? levelReq.title : 'Conteur Mystérieux';
}

export function calculateXPGain(action: keyof typeof XP_REWARDS, multiplier: number = 1): number {
  return XP_REWARDS[action] * multiplier;
}

export function checkBadgeEligibility(user: User, userStats: any): Badge[] {
  const newBadges: Badge[] = [];
  
  // Define badge conditions
  const badgeConditions = [
    {
      id: 'first_segment',
      name: 'Premier Segment',
      description: 'Créer votre premier segment',
      condition: () => userStats.totalSegments >= 1,
      rarity: 'common' as const,
    },
    {
      id: 'prolific_writer',
      name: 'Conteur Prolifique',
      description: 'Créer 10 segments',
      condition: () => userStats.totalSegments >= 10,
      rarity: 'rare' as const,
    },
    {
      id: 'multiverse_master',
      name: 'Maître du Multivers',
      description: 'Participer à 5 trames différentes',
      condition: () => userStats.totalThreads >= 5,
      rarity: 'epic' as const,
    },
    {
      id: 'inspirator',
      name: 'Inspirateur',
      description: 'Recevoir 100 likes',
      condition: () => userStats.totalLikes >= 100,
      rarity: 'rare' as const,
    },
    {
      id: 'legendary_creator',
      name: 'Créateur Légendaire',
      description: 'Atteindre le niveau 10',
      condition: () => user.level >= 10,
      rarity: 'legendary' as const,
    },
  ];
  
  for (const badgeCondition of badgeConditions) {
    const alreadyHas = user.badges.some(badge => badge.id === badgeCondition.id);
    if (!alreadyHas && badgeCondition.condition()) {
      newBadges.push({
        id: badgeCondition.id,
        name: badgeCondition.name,
        description: badgeCondition.description,
        icon: 'award',
        rarity: badgeCondition.rarity,
        requirements: badgeCondition.description,
      });
    }
  }
  
  return newBadges;
}