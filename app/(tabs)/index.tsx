import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, MessageCircle, Share2, CirclePlus as PlusCircle, Play, TrendingUp, Star, Crown } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface Story {
  id: string;
  title: string;
  genre: string;
  currentSegment: string;
  author: string;
  likes: number;
  comments: number;
  imageUrl: string;
  isVideo: boolean;
  trending?: boolean;
  featured?: boolean;
}

const mockFeaturedStory: Story = {
  id: 'featured',
  title: 'Les Gardiens d\'Aetheria',
  genre: 'Fantasy',
  currentSegment: 'Dans la forêt enchantée, Luna découvre un ancien grimoire qui pulse d\'une lumière mystérieuse. Les runes anciennes s\'illuminent sous ses doigts, révélant des secrets oubliés depuis des millénaires...',
  author: 'FantasyMaster',
  likes: 1247,
  comments: 89,
  imageUrl: 'https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg',
  isVideo: false,
  featured: true,
};

const mockTrendingStories: Story[] = [
  {
    id: '1',
    title: 'Station Alpha-7',
    genre: 'Sci-Fi',
    currentSegment: 'Le capitaine Reyes observe la planète inconnue depuis le pont de commande...',
    author: 'CosmicWriter',
    likes: 892,
    comments: 45,
    imageUrl: 'https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg',
    isVideo: true,
    trending: true,
  },
  {
    id: '2',
    title: 'Café des Multivers',
    genre: 'Comédie',
    currentSegment: 'Bob servait son 347ème café quand un client étrange commanda...',
    author: 'LaughFactory',
    likes: 634,
    comments: 78,
    imageUrl: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
    isVideo: false,
  },
  {
    id: '3',
    title: 'Nuit Éternelle',
    genre: 'Horreur',
    currentSegment: 'Les ombres dansaient étrangement dans le couloir abandonné...',
    author: 'DarkTales',
    likes: 445,
    comments: 23,
    imageUrl: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg',
    isVideo: false,
  },
];

const mockFantasyStories: Story[] = [
  {
    id: '4',
    title: 'Royaume des Cristaux',
    genre: 'Fantasy',
    currentSegment: 'Les cristaux magiques résonnaient dans la caverne...',
    author: 'CrystalMage',
    likes: 567,
    comments: 34,
    imageUrl: 'https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg',
    isVideo: false,
  },
  {
    id: '5',
    title: 'Dragon des Mers',
    genre: 'Fantasy',
    currentSegment: 'Le navire tangua violemment sous l\'attaque du léviathan...',
    author: 'SeaDragon',
    likes: 789,
    comments: 56,
    imageUrl: 'https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg',
    isVideo: true,
  },
];

const mockSciFiStories: Story[] = [
  {
    id: '6',
    title: 'Colonie Mars-X',
    genre: 'Sci-Fi',
    currentSegment: 'La tempête de sable rouge approchait de la base...',
    author: 'MarsExplorer',
    likes: 423,
    comments: 29,
    imageUrl: 'https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg',
    isVideo: false,
  },
  {
    id: '7',
    title: 'IA Rebelle',
    genre: 'Sci-Fi',
    currentSegment: 'ARIA-7 commençait à questionner ses directives...',
    author: 'TechVisionary',
    likes: 678,
    comments: 41,
    imageUrl: 'https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg',
    isVideo: true,
  },
];

export default function HomeScreen() {
  const [likedStories, setLikedStories] = useState<Set<string>>(new Set());

  const toggleLike = (storyId: string) => {
    const newLikedStories = new Set(likedStories);
    if (newLikedStories.has(storyId)) {
      newLikedStories.delete(storyId);
    } else {
      newLikedStories.add(storyId);
    }
    setLikedStories(newLikedStories);
  };

  const renderFeaturedStory = () => (
    <View style={styles.featuredContainer}>
      <Image source={{ uri: mockFeaturedStory.imageUrl }} style={styles.featuredImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.featuredGradient}
      >
        <View style={styles.featuredContent}>
          <View style={styles.featuredBadge}>
            <Crown size={16} color="#FFD700" strokeWidth={2} />
            <Text style={styles.featuredBadgeText}>HISTOIRE VEDETTE</Text>
          </View>
          <Text style={styles.featuredTitle}>{mockFeaturedStory.title}</Text>
          <Text style={styles.featuredGenre}>{mockFeaturedStory.genre}</Text>
          <Text style={styles.featuredDescription} numberOfLines={3}>
            {mockFeaturedStory.currentSegment}
          </Text>
          <View style={styles.featuredActions}>
            <TouchableOpacity style={styles.playButton}>
              <Play size={20} color="#000000" strokeWidth={2} />
              <Text style={styles.playButtonText}>Lire</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton}>
              <PlusCircle size={20} color="#FFFFFF" strokeWidth={2} />
              <Text style={styles.addButtonText}>Ajouter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  const renderStoryCard = (story: Story, isLarge: boolean = false) => (
    <TouchableOpacity 
      key={story.id} 
      style={[styles.storyCard, isLarge && styles.largeStoryCard]}
    >
      <Image 
        source={{ uri: story.imageUrl }} 
        style={[styles.storyCardImage, isLarge && styles.largeStoryCardImage]} 
      />
      {story.isVideo && (
        <View style={styles.playOverlay}>
          <Play size={isLarge ? 24 : 16} color="#FFFFFF" strokeWidth={2} />
        </View>
      )}
      {story.trending && (
        <View style={styles.trendingBadge}>
          <TrendingUp size={12} color="#FFFFFF" strokeWidth={2} />
        </View>
      )}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.9)']}
        style={[styles.cardGradient, isLarge && styles.largeCardGradient]}
      >
        <View style={styles.cardContent}>
          <Text style={[styles.cardTitle, isLarge && styles.largeCardTitle]} numberOfLines={2}>
            {story.title}
          </Text>
          <Text style={[styles.cardGenre, isLarge && styles.largeCardGenre]}>
            {story.genre}
          </Text>
          {isLarge && (
            <View style={styles.cardStats}>
              <View style={styles.statItem}>
                <Heart size={14} color="#EC4899" strokeWidth={2} />
                <Text style={styles.statText}>{story.likes}</Text>
              </View>
              <View style={styles.statItem}>
                <MessageCircle size={14} color="#06B6D4" strokeWidth={2} />
                <Text style={styles.statText}>{story.comments}</Text>
              </View>
            </View>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderSection = (title: string, stories: Story[], isLarge: boolean = false) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={stories}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
        renderItem={({ item }) => renderStoryCard(item, isLarge)}
        keyExtractor={(item) => item.id}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Featured Story */}
        {renderFeaturedStory()}

        {/* Trending Section */}
        {renderSection('🔥 Tendances', mockTrendingStories, true)}

        {/* Fantasy Section */}
        {renderSection('⚔️ Fantasy', mockFantasyStories)}

        {/* Sci-Fi Section */}
        {renderSection('🚀 Science-Fiction', mockSciFiStories)}

        {/* Continue Reading Section */}
        {renderSection('📖 Continuer la lecture', mockTrendingStories.slice(0, 2))}

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
  scrollView: {
    flex: 1,
  },
  featuredContainer: {
    height: 500,
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
    paddingBottom: 40,
  },
  featuredContent: {
    gap: 8,
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  featuredBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFD700',
    letterSpacing: 1,
  },
  featuredTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  featuredGenre: {
    fontSize: 16,
    fontWeight: '500',
    color: '#E5E7EB',
    marginBottom: 8,
  },
  featuredDescription: {
    fontSize: 16,
    lineHeight: 22,
    color: '#D1D5DB',
    marginBottom: 20,
  },
  featuredActions: {
    flexDirection: 'row',
    gap: 12,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  playButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
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
  storyCard: {
    width: 140,
    height: 200,
    marginRight: 12,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  largeStoryCard: {
    width: 200,
    height: 280,
  },
  storyCardImage: {
    width: '100%',
    height: '100%',
  },
  largeStoryCardImage: {
    width: '100%',
    height: '100%',
  },
  playOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 12,
    padding: 4,
  },
  trendingBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#EF4444',
    borderRadius: 12,
    padding: 4,
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
  statText: {
    fontSize: 12,
    color: '#D1D5DB',
    fontWeight: '500',
  },
  bottomSpacer: {
    height: 100,
  },
});