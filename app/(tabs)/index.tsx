import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, MessageCircle, Share2, CirclePlus as PlusCircle, Sparkles, Play } from 'lucide-react-native';

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
}

const mockStories: Story[] = [
  {
    id: '1',
    title: 'Les Gardiens d\'Aetheria',
    genre: 'Fantasy',
    currentSegment: 'Dans la forêt enchantée, Luna découvre un ancien grimoire qui pulse d\'une lumière mystérieuse...',
    author: 'FantasyMaster',
    likes: 127,
    comments: 23,
    imageUrl: 'https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg',
    isVideo: false,
  },
  {
    id: '2',
    title: 'Station Alpha-7',
    genre: 'Sci-Fi',
    currentSegment: 'Le capitaine Reyes observe la planète inconnue depuis le pont de commande. Les scanners détectent une forme de vie...',
    author: 'CosmicWriter',
    likes: 89,
    comments: 15,
    imageUrl: 'https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg',
    isVideo: true,
  },
  {
    id: '3',
    title: 'Café des Multivers',
    genre: 'Comédie',
    currentSegment: 'Bob servait son 347ème café de la journée quand un client étrange commanda "un expresso interdimensionnel"...',
    author: 'LaughFactory',
    likes: 203,
    comments: 45,
    imageUrl: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
    isVideo: false,
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

  const renderStoryCard = (story: Story) => (
    <View key={story.id} style={styles.storyCard}>
      <View style={styles.storyHeader}>
        <View>
          <Text style={styles.storyTitle}>{story.title}</Text>
          <View style={styles.genreContainer}>
            <Text style={styles.genreText}>{story.genre}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <PlusCircle size={24} color="#8B5CF6" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <View style={styles.mediaContainer}>
        <Image source={{ uri: story.imageUrl }} style={styles.storyImage} />
        {story.isVideo && (
          <View style={styles.playOverlay}>
            <Play size={32} color="#FFFFFF" strokeWidth={2} />
          </View>
        )}
      </View>

      <Text style={styles.segmentText}>{story.currentSegment}</Text>

      <View style={styles.storyFooter}>
        <View style={styles.authorInfo}>
          <Text style={styles.authorText}>Par {story.author}</Text>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => toggleLike(story.id)}
          >
            <Heart 
              size={20} 
              color={likedStories.has(story.id) ? "#EC4899" : "#9CA3AF"} 
              strokeWidth={2}
              fill={likedStories.has(story.id) ? "#EC4899" : "transparent"}
            />
            <Text style={[
              styles.actionText, 
              likedStories.has(story.id) && styles.likedText
            ]}>
              {story.likes + (likedStories.has(story.id) ? 1 : 0)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MessageCircle size={20} color="#9CA3AF" strokeWidth={2} />
            <Text style={styles.actionText}>{story.comments}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Share2 size={20} color="#9CA3AF" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Multiverse Threads</Text>
        <Sparkles size={24} color="#8B5CF6" strokeWidth={2} />
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {mockStories.map(renderStoryCard)}
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
  scrollView: {
    flex: 1,
  },
  storyCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
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
  storyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  genreContainer: {
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  genreText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#8B5CF6',
  },
  addButton: {
    padding: 8,
  },
  mediaContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  storyImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  playOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -16 }, { translateY: -16 }],
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    padding: 8,
  },
  segmentText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#374151',
    marginBottom: 16,
  },
  storyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorInfo: {
    flex: 1,
  },
  authorText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  likedText: {
    color: '#EC4899',
  },
});