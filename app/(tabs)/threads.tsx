import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookOpen, Users, Clock, CircleCheck as CheckCircle, TrendingUp, Filter } from 'lucide-react-native';

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
}

const mockThreads: Thread[] = [
  {
    id: '1',
    title: 'Les Gardiens d\'Aetheria',
    genre: 'Fantasy',
    description: 'Une quête épique dans un monde magique rempli de créatures mystiques...',
    participants: 23,
    segments: 45,
    status: 'ongoing',
    imageUrl: 'https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg',
    trending: true,
  },
  {
    id: '2',
    title: 'Station Alpha-7',
    genre: 'Sci-Fi',
    description: 'L\'exploration d\'une station spatiale abandonnée révèle des secrets terrifiants...',
    participants: 18,
    segments: 32,
    status: 'ongoing',
    imageUrl: 'https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg',
    trending: true,
  },
  {
    id: '3',
    title: 'Café des Multivers',
    genre: 'Comédie',
    description: 'Un café ordinaire qui sert des clients de toutes les dimensions...',
    participants: 31,
    segments: 67,
    status: 'ongoing',
    imageUrl: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
    trending: false,
  },
  {
    id: '4',
    title: 'La Dernière Bibliothèque',
    genre: 'Fantasy',
    description: 'Dans un monde post-apocalyptique, une bibliothèque magique protège le savoir...',
    participants: 15,
    segments: 28,
    status: 'completed',
    imageUrl: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg',
    trending: false,
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

  const filteredThreads = mockThreads.filter(thread => {
    if (selectedFilter === 'all') return true;
    return thread.status === selectedFilter;
  });

  const renderThreadCard = (thread: Thread) => (
    <TouchableOpacity key={thread.id} style={styles.threadCard}>
      <View style={styles.cardHeader}>
        <Image source={{ uri: thread.imageUrl }} style={styles.threadImage} />
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
      </View>

      <View style={styles.cardContent}>
        <View style={styles.cardTop}>
          <Text style={styles.threadTitle}>{thread.title}</Text>
          <View style={[styles.genreTag, { backgroundColor: genreColors[thread.genre] || '#9CA3AF' }]}>
            <Text style={styles.genreTagText}>{thread.genre}</Text>
          </View>
        </View>

        <Text style={styles.threadDescription}>{thread.description}</Text>

        <View style={styles.cardStats}>
          <View style={styles.statItem}>
            <Users size={16} color="#6B7280" strokeWidth={2} />
            <Text style={styles.statText}>{thread.participants} participants</Text>
          </View>
          <View style={styles.statItem}>
            <BookOpen size={16} color="#6B7280" strokeWidth={2} />
            <Text style={styles.statText}>{thread.segments} segments</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trames Disponibles</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#8B5CF6" strokeWidth={2} />
        </TouchableOpacity>
      </View>

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

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {filteredThreads.map(renderThreadCard)}
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
  filterButton: {
    padding: 4,
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  activeFilterTab: {
    backgroundColor: '#EDE9FE',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeFilterTabText: {
    color: '#8B5CF6',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  threadCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  cardHeader: {
    position: 'relative',
  },
  threadImage: {
    width: '100%',
    height: 150,
  },
  cardBadges: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    gap: 8,
  },
  trendingBadge: {
    backgroundColor: '#F97316',
    borderRadius: 12,
    padding: 4,
  },
  statusBadge: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    padding: 4,
  },
  completedBadge: {
    backgroundColor: '#6B7280',
  },
  cardContent: {
    padding: 16,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  threadTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
    marginRight: 12,
  },
  genreTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  genreTagText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  threadDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#6B7280',
    marginBottom: 16,
  },
  cardStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
});