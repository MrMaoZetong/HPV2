import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  User, 
  Settings, 
  Award, 
  BookOpen, 
  Users, 
  Heart,
  Zap,
  Crown,
  Trophy,
  Star,
  TrendingUp
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const mockBadges: Badge[] = [
  {
    id: '1',
    name: 'Premier Segment',
    description: 'Créer votre premier segment',
    icon: 'star',
    earned: true,
    rarity: 'common',
  },
  {
    id: '2',
    name: 'Conteur Prolifique',
    description: 'Créer 10 segments',
    icon: 'crown',
    earned: true,
    rarity: 'rare',
  },
  {
    id: '3',
    name: 'Maître du Multivers',
    description: 'Participer à 5 trames différentes',
    icon: 'trophy',
    earned: false,
    rarity: 'epic',
  },
  {
    id: '4',
    name: 'Inspirateur',
    description: 'Recevoir 100 likes',
    icon: 'award',
    earned: true,
    rarity: 'legendary',
  },
];

const rarityColors = {
  common: '#9CA3AF',
  rare: '#3B82F6',
  epic: '#8B5CF6',
  legendary: '#F59E0B',
};

const getIconComponent = (iconName: string, size: number, color: string) => {
  switch (iconName) {
    case 'star':
      return <Star size={size} color={color} strokeWidth={2} />;
    case 'crown':
      return <Crown size={size} color={color} strokeWidth={2} />;
    case 'trophy':
      return <Trophy size={size} color={color} strokeWidth={2} />;
    case 'award':
    default:
      return <Award size={size} color={color} strokeWidth={2} />;
  }
};

export default function ProfileScreen() {
  const userLevel = 7;
  const userXP = 2350;
  const nextLevelXP = 3000;
  const progressPercentage = (userXP / nextLevelXP) * 100;

  const renderStatCard = (icon: any, value: string, label: string, color: string) => (
    <View style={styles.statCard}>
      <LinearGradient
        colors={[color + '20', color + '10']}
        style={styles.statCardGradient}
      >
        <View style={[styles.statIcon, { backgroundColor: color + '30' }]}>
          {icon}
        </View>
        <Text style={styles.statNumber}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </LinearGradient>
    </View>
  );

  const renderBadgeCard = (badge: Badge) => (
    <View key={badge.id} style={[styles.badgeCard, !badge.earned && styles.lockedBadge]}>
      <LinearGradient
        colors={badge.earned ? [rarityColors[badge.rarity] + '30', rarityColors[badge.rarity] + '10'] : ['#374151', '#1F2937']}
        style={styles.badgeCardGradient}
      >
        <View style={[
          styles.badgeIcon, 
          { backgroundColor: badge.earned ? rarityColors[badge.rarity] + '40' : '#4B5563' }
        ]}>
          {getIconComponent(
            badge.icon, 
            24, 
            badge.earned ? rarityColors[badge.rarity] : '#9CA3AF'
          )}
        </View>
        <Text style={[styles.badgeName, !badge.earned && styles.lockedBadgeName]}>
          {badge.name}
        </Text>
        <Text style={styles.badgeDescription}>{badge.description}</Text>
        <View style={[styles.rarityIndicator, { backgroundColor: rarityColors[badge.rarity] }]}>
          <Text style={styles.rarityText}>{badge.rarity.toUpperCase()}</Text>
        </View>
      </LinearGradient>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header with gradient */}
      <View style={styles.header}>
        <LinearGradient
          colors={['#8B5CF6', '#EC4899']}
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Mon Profil</Text>
            <TouchableOpacity style={styles.settingsButton}>
              <Settings size={24} color="#FFFFFF" strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.profileCard}>
            <LinearGradient
              colors={['#1F2937', '#111827']}
              style={styles.profileCardGradient}
            >
              <View style={styles.avatarContainer}>
                <LinearGradient
                  colors={['#8B5CF6', '#EC4899']}
                  style={styles.avatar}
                >
                  <User size={40} color="#FFFFFF" strokeWidth={2} />
                </LinearGradient>
                <View style={styles.levelBadge}>
                  <Text style={styles.levelText}>{userLevel}</Text>
                </View>
              </View>
              
              <View style={styles.profileInfo}>
                <Text style={styles.username}>FantasyMaster</Text>
                <Text style={styles.userTitle}>Créateur de Mondes</Text>
                <Text style={styles.userBio}>Créateur d'histoires épiques depuis 2024</Text>
                
                <View style={styles.xpContainer}>
                  <View style={styles.xpBar}>
                    <LinearGradient
                      colors={['#8B5CF6', '#EC4899']}
                      style={[styles.xpProgress, { width: `${progressPercentage}%` }]}
                    />
                  </View>
                  <Text style={styles.xpText}>{userXP} / {nextLevelXP} XP</Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          {renderStatCard(
            <BookOpen size={24} color="#8B5CF6" strokeWidth={2} />,
            '23',
            'Segments',
            '#8B5CF6'
          )}
          {renderStatCard(
            <Users size={24} color="#06B6D4" strokeWidth={2} />,
            '7',
            'Trames',
            '#06B6D4'
          )}
          {renderStatCard(
            <Heart size={24} color="#EC4899" strokeWidth={2} />,
            '156',
            'Likes',
            '#EC4899'
          )}
          {renderStatCard(
            <TrendingUp size={24} color="#F59E0B" strokeWidth={2} />,
            '89',
            'Streak',
            '#F59E0B'
          )}
        </View>

        {/* Badges Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏆 Collection de Badges</Text>
          <View style={styles.badgesContainer}>
            {mockBadges.map(renderBadgeCard)}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📈 Activité Récente</Text>
          <View style={styles.activityContainer}>
            <LinearGradient
              colors={['#1F2937', '#111827']}
              style={styles.activityCardGradient}
            >
              <View style={styles.activityItem}>
                <View style={[styles.activityIcon, { backgroundColor: '#8B5CF630' }]}>
                  <BookOpen size={16} color="#8B5CF6" strokeWidth={2} />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityText}>Nouveau segment ajouté à "Les Gardiens d'Aetheria"</Text>
                  <Text style={styles.activityTime}>Il y a 2 heures</Text>
                </View>
              </View>
              
              <View style={styles.activityItem}>
                <View style={[styles.activityIcon, { backgroundColor: '#EC489930' }]}>
                  <Heart size={16} color="#EC4899" strokeWidth={2} />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityText}>Votre segment a reçu 12 nouveaux likes</Text>
                  <Text style={styles.activityTime}>Il y a 5 heures</Text>
                </View>
              </View>
              
              <View style={styles.activityItem}>
                <View style={[styles.activityIcon, { backgroundColor: '#F59E0B30' }]}>
                  <Award size={16} color="#F59E0B" strokeWidth={2} />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityText}>Badge "Inspirateur" débloqué !</Text>
                  <Text style={styles.activityTime}>Il y a 1 jour</Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  header: {
    height: 100,
  },
  headerGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  settingsButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    padding: 20,
    paddingBottom: 0,
  },
  profileCard: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileCardGradient: {
    flexDirection: 'row',
    padding: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#F59E0B',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#0F0F0F',
  },
  levelText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  username: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  userTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5CF6',
    marginBottom: 4,
  },
  userBio: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 16,
  },
  xpContainer: {
    gap: 8,
  },
  xpBar: {
    height: 8,
    backgroundColor: '#374151',
    borderRadius: 4,
    overflow: 'hidden',
  },
  xpProgress: {
    height: '100%',
  },
  xpText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  statCardGradient: {
    padding: 16,
    alignItems: 'center',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  badgeCard: {
    width: '48%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  lockedBadge: {
    opacity: 0.6,
  },
  badgeCardGradient: {
    padding: 16,
    alignItems: 'center',
    minHeight: 140,
  },
  badgeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  badgeName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  lockedBadgeName: {
    color: '#9CA3AF',
  },
  badgeDescription: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 8,
  },
  rarityIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  rarityText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  activityContainer: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  activityCardGradient: {
    padding: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  bottomSpacer: {
    height: 100,
  },
});