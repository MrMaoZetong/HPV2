import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookOpen, Users, Clock, CircleCheck as CheckCircle, TrendingUp, Filter, Play, Star } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface Thread {
  id: string;
  title: string;
  genre: string;
  description: string;
  participants: number;
  segments: number;
  status: 'ongoing' | 'completed';
  imageUrl: string;
  trending: boolean;
  rating?: number;
}

const mockFeaturedThread: Thread = {
  id: 'featured',
  title: 'Les Gardiens d\'Aetheria',
  genre: 'Fantasy',
  description: 'Une quête épique dans un monde magique rempli de créatures mystiques et de pouvoirs anciens. Rejoignez Luna dans sa découverte du grimoire légendaire...',
  participants: 47,
  segments: 89,
  status: 'ongoing',
  imageUrl: 'https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg',
  trending: true,
  rating: 4.8,
};

const mockOngoingThreads: Thread[] = [
  {
    id: '1',
    title: 'Station Alpha-7',
    genre: 'Sci-Fi',
    description: 'L\'exploration d\'une station spatiale abandonnée révèle des secrets terrifiants...',
    participants: 32,
    segments: 56,
    status: 'ongoing',
    imageUrl: 'https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg',
    trending: true,
    rating: 4.6,
  },
  {
    id: '2',
    title: 'Café des Multivers',
    genre: 'Comédie',
    description: 'Un café ordinaire qui sert des clients de toutes les dimensions...',
    participants: 28,
    segments: 43,
    status: 'ongoing',
    imageUrl: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
    trending: false,
    rating: 4.4,
  },
  {
    id: '3',
    title: 'Nuit Éternelle',
    genre: 'Horreur',
    description: 'Dans une ville où le soleil ne se lève jamais...',
    participants: 19,
    segments: 34,
    status: 'ongoing',
    imageUrl: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg',
    trending: false,
    rating: 4.2,
  },
];

const mockCompletedThreads: Thread[] = [
  {
    id: '4',
    title: 'La Dernière Bibliothèque',
    genre: 'Fantasy',
    description: 'Dans un monde post-apocalyptique, une bibliothèque magique protège le savoir...',
    participants: 23,
    segments: 67,
    status: 'completed',
    imageUrl: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg',
    trending: false,
    rating: 4.9,
  },
  {
    id: '5',
    title: 'Amour Quantique',
    genre: 'Romance',
    description: 'Une histoire d\'amour à travers les dimensions parallèles...',
    participants: 15,
    segments: 45,
    status: 'completed',
    imageUrl: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
    trending: false,
    rating: 4.7,
  },
];

const genreColors: { [key: string]: string } = {
  'Fantasy': '#8B5CF6',
  'Sci-Fi': '#06B6D4',
  'Comédie': '#F59E0B',
  'Horreur': '#EF4444',
  'Romance': '#EC4899',
  'Multivers': '#10B981',
};

export default function ThreadsScreen() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'ongoing' | 'completed'>('all');

  const renderFeaturedThread = () => (
    <View style={styles.featuredContainer}>
      <Image source={{ uri: mockFeaturedThread.imageUrl }} style={styles.featuredImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.9)']}
        style={styles.featuredGradient}
      >
        <View style={styles.featuredContent}>
          <View style={styles.featuredBadges}>
            <View style={styles.trendingBadge}>
              <TrendingUp size={14} color="#FFFFFF" strokeWidth={2} />
              <Text style={styles.badgeText}>TENDANCE</Text>
            </View>
            <View style={[styles.genreBadge, { backgroundColor: genreColors[mockFeaturedThread.genre] }]}>
              <Text style={styles.badgeText}>{mockFeaturedThread.genre}</Text>
            </View>
          </View>
          
          <Text style={styles.featuredTitle}>{mockFeaturedThread.title}</Text>
          <Text style={styles.featuredDescription} numberOfLines={3}>
            {mockFeaturedThread.description}
          </Text>
          
          <View style={styles.featuredStats}>
            <View style={styles.statGroup}>
              <Users size={16} color="#D1D5DB" strokeWidth={2} />
              <Text style={styles.statText}>{mockFeaturedThread.participants} participants</Text>
            </View>
            <View style={styles.statGroup}>
              <BookOpen size={16} color="#D1D5DB" strokeWidth={2} />
              <Text style={styles.statText}>{mockFeaturedThread.segments} segments</Text>
            </View>
            <View style={styles.statGroup}>
              <Star size={16} color="#FFD700" strokeWidth={2} fill="#FFD700" />
              <Text style={styles.statText}>{mockFeaturedThread.rating}</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.joinButton}>
            <Play size={20} color="#000000" strokeWidth={2} />
            <Text style={styles.joinButtonText}>Rejoindre l'histoire</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );

  const renderThreadCard = (thread: Thread, isLarge: boolean = false) => (
    <TouchableOpacity 
      key={thread.id} 
      style={[styles.threadCard, isLarge && styles.largeThreadCard]}
    >
      <Image 
        source={{ uri: thread.imageUrl }} 
        style={[styles.threadImage, isLarge && styles.largeThreadImage]} 
      />
      
      <View style={styles.cardBadges}>
        {thread.trending && (
          <View style={styles.trendingBadge}>
            <TrendingUp size={12} color="#FFFFFF" strokeWidth={2} />
          </View>
        )}
        <View style={[styles.statusBadge, thread.status === 'completed' && styles.completedBadge]}>
          {thread.status === 'completed' ? (
            <CheckCircle size={12} color="#FFFFFF" strokeWidth={2} />
          ) : (
            <Clock size={12} color="#FFFFFF" strokeWidth={2} />
          )}
        </View>
      </View>

      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.9)']}
        style={[styles.cardGradient, isLarge && styles.largeCardGradient]}
      >
        <View style={styles.cardContent}>
          <Text style={[styles.cardTitle, isLarge && styles.largeCardTitle]} numberOfLines={2}>
            {thread.title}
          </Text>
          <Text style={[styles.cardGenre, isLarge && styles.largeCardGenre]}>
            {thread.genre}
          </Text>
          {isLarge && (
            <>
              <Text style={styles.cardDescription} numberOfLines={2}>
                {thread.description}
              </Text>
              <View style={styles.cardStats}>
                <View style={styles.statItem}>
                  <Users size={12} color="#D1D5DB" strokeWidth={2} />
                  <Text style={styles.cardStatText}>{thread.participants}</Text>
                </View>
                <View style={styles.statItem}>
                  <BookOpen size={12} color="#D1D5DB" strokeWidth={2} />
                  <Text style={styles.cardStatText}>{thread.segments}</Text>
                </View>
                {thread.rating && (
                  <View style={styles.statItem}>
                    <Star size={12} color="#FFD700" strokeWidth={2} fill="#FFD700" />
                    <Text style={styles.cardStatText}>{thread.rating}</Text>
                  </View>
                )}
              </View>
            </>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderSection = (title: string, threads: Thread[], isLarge: boolean = false) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={threads}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
        renderItem={({ item }) => renderThreadCard(item, isLarge)}
        keyExtractor={(item) => item.id}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trames Disponibles</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Featured Thread */}
        {renderFeaturedThread()}

        {/* Filter Tabs */}
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterTab, selectedFilter === 'all' && styles.activeFilterTab]}
            onPress={() => setSelectedFilter('all')}
          >
            <Text style={[styles.filterTabText, selectedFilter === 'all' && styles.activeFilterTabText]}>
              Toutes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterTab, selectedFilter === 'ongoing' && styles.activeFilterTab]}
            onPress={() => setSelectedFilter('ongoing')}
          >
            <Text style={[styles.filterTabText, selectedFilter === 'ongoing' && styles.activeFilterTabText]}>
              En cours
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterTab, selectedFilter === 'completed' && styles.activeFilterTab]}
            onPress={() => setSelectedFilter('completed')}
          >
            <Text style={[styles.filterTabText, selectedFilter === 'completed' && styles.activeFilterTabText]}>
              Terminées
            </Text>
          </TouchableOpacity>
        </View>

        {/* Ongoing Threads */}
        {(selectedFilter === 'all' || selectedFilter === 'ongoing') && 
          renderSection('🔥 Histoires Populaires', mockOngoingThreads, true)
        }

        {/* Completed Threads */}
        {(selectedFilter === 'all' || selectedFilter === 'completed') && 
          renderSection('✅ Histoires Complètes', mockCompletedThreads)
        }

        {/* More sections based on filter */}
        {selectedFilter === 'all' && (
          <>
            {renderSection('⚔️ Fantasy', mockOngoingThreads.filter(t => t.genre === 'Fantasy'))}
            {renderSection('🚀 Science-Fiction', mockOngoingThreads.filter(t => t.genre === 'Sci-Fi'))}
          </>
        )}

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#0F0F0F',
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  filterButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  featuredContainer: {
    height: 400,
    position: 'relative',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  featuredContent: {
    gap: 12,
  },
  featuredBadges: {
    flexDirection: 'row',
    gap: 8,
  },
  trendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  genreBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  featuredTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  featuredDescription: {
    fontSize: 16,
    lineHeight: 22,
    color: '#D1D5DB',
  },
  featuredStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 14,
    color: '#D1D5DB',
    fontWeight: '500',
  },
  joinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
    alignSelf: 'flex-start',
  },
  joinButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: '#0F0F0F',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 8,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#1F2937',
  },
  activeFilterTab: {
    backgroundColor: '#8B5CF6',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  activeFilterTabText: {
    color: '#FFFFFF',
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 20,
    marginBottom: 16,
  },
  horizontalList: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  threadCard: {
    width: 160,
    height: 220,
    marginRight: 12,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  largeThreadCard: {
    width: 220,
    height: 300,
  },
  threadImage: {
    width: '100%',
    height: '100%',
  },
  largeThreadImage: {
    width: '100%',
    height: '100%',
  },
  cardBadges: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    gap: 4,
  },
  statusBadge: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    padding: 4,
  },
  completedBadge: {
    backgroundColor: '#6B7280',
  },
  cardGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    justifyContent: 'flex-end',
    padding: 12,
  },
  largeCardGradient: {
    height: '50%',
    padding: 16,
  },
  cardContent: {
    gap: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  largeCardTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  cardGenre: {
    fontSize: 12,
    fontWeight: '500',
    color: '#D1D5DB',
  },
  largeCardGenre: {
    fontSize: 14,
  },
  cardDescription: {
    fontSize: 12,
    lineHeight: 16,
    color: '#9CA3AF',
    marginTop: 4,
  },
  cardStats: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cardStatText: {
    fontSize: 12,
    color: '#D1D5DB',
    fontWeight: '500',
  },
  bottomSpacer: {
    height: 100,
  },
});