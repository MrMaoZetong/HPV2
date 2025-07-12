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
  Star
} from 'lucide-react-native';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
}

const mockBadges: Badge[] = [
  {
    id: '1',
    name: 'Premier Segment',
    description: 'Créer votre premier segment',
    icon: 'star',
    earned: true,
  },
  {
    id: '2',
    name: 'Conteur Prolifique',
    description: 'Créer 10 segments',
    icon: 'crown',
    earned: true,
  },
  {
    id: '3',
    name: 'Maître du Multivers',
    description: 'Participer à 5 trames différentes',
    icon: 'trophy',
    earned: false,
  },
  {
    id: '4',
    name: 'Inspirateur',
    description: 'Recevoir 100 likes',
    icon: 'award',
    earned: true,
  },
];

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mon Profil</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color="#8B5CF6" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <User size={40} color="#8B5CF6" strokeWidth={2} />
            </View>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>{userLevel}</Text>
            </View>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.username}>FantasyMaster</Text>
            <Text style={styles.userBio}>Créateur d'histoires épiques depuis 2024</Text>
            
            <View style={styles.xpContainer}>
              <View style={styles.xpBar}>
                <View style={[styles.xpProgress, { width: `${progressPercentage}%` }]} />
              </View>
              <Text style={styles.xpText}>{userXP} / {nextLevelXP} XP</Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <BookOpen size={24} color="#8B5CF6" strokeWidth={2} />
            <Text style={styles.statNumber}>23</Text>
            <Text style={styles.statLabel}>Segments</Text>
          </View>
          <View style={styles.statCard}>
            <Users size={24} color="#06B6D4" strokeWidth={2} />
            <Text style={styles.statNumber}>7</Text>
            <Text style={styles.statLabel}>Trames</Text>
          </View>
          <View style={styles.statCard}>
            <Heart size={24} color="#EC4899" strokeWidth={2} />
            <Text style={styles.statNumber}>156</Text>
            <Text style={styles.statLabel}>Likes</Text>
          </View>
          <View style={styles.statCard}>
            <Zap size={24} color="#F59E0B" strokeWidth={2} />
            <Text style={styles.statNumber}>89</Text>
            <Text style={styles.statLabel}>Streak</Text>
          </View>
        </View>

        {/* Badges Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Badges Débloqués</Text>
          <View style={styles.badgesContainer}>
            {mockBadges.map((badge) => (
              <View key={badge.id} style={[styles.badgeCard, !badge.earned && styles.lockedBadge]}>
                <View style={[styles.badgeIcon, !badge.earned && styles.lockedBadgeIcon]}>
                  {getIconComponent(
                    badge.icon, 
                    24, 
                    badge.earned ? '#F59E0B' : '#9CA3AF'
                  )}
                </View>
                <Text style={[styles.badgeName, !badge.earned && styles.lockedBadgeName]}>
                  {badge.name}
                </Text>
                <Text style={styles.badgeDescription}>{badge.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activité Récente</Text>
          <View style={styles.activityContainer}>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <BookOpen size={16} color="#8B5CF6" strokeWidth={2} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Nouveau segment ajouté à "Les Gardiens d'Aetheria"</Text>
                <Text style={styles.activityTime}>Il y a 2 heures</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Heart size={16} color="#EC4899" strokeWidth={2} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Votre segment a reçu 12 nouveaux likes</Text>
                <Text style={styles.activityTime}>Il y a 5 heures</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Award size={16} color="#F59E0B" strokeWidth={2} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Badge "Inspirateur" débloqué !</Text>
                <Text style={styles.activityTime}>Il y a 1 jour</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  settingsButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  profileCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EDE9FE',
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
    borderColor: '#FFFFFF',
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
    color: '#111827',
    marginBottom: 4,
  },
  userBio: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  xpContainer: {
    gap: 8,
  },
  xpBar: {
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  xpProgress: {
    height: '100%',
    backgroundColor: '#8B5CF6',
  },
  xpText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  badgeCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  lockedBadge: {
    opacity: 0.6,
  },
  badgeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  lockedBadgeIcon: {
    backgroundColor: '#F3F4F6',
  },
  badgeName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 4,
  },
  lockedBadgeName: {
    color: '#9CA3AF',
  },
  badgeDescription: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  activityContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});