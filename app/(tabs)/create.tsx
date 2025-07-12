import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CirclePlus as PlusCircle, Wand as Wand2, Image as ImageIcon, Video, Send, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const genres = [
  { id: 'fantasy', name: 'Fantasy', color: '#8B5CF6', image: 'https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg' },
  { id: 'scifi', name: 'Sci-Fi', color: '#06B6D4', image: 'https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg' },
  { id: 'comedy', name: 'Comédie', color: '#F59E0B', image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg' },
  { id: 'horror', name: 'Horreur', color: '#EF4444', image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg' },
  { id: 'romance', name: 'Romance', color: '#EC4899', image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg' },
  { id: 'multiverse', name: 'Multivers', color: '#10B981', image: 'https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg' },
];

const featuredThreads = [
  {
    id: '1',
    title: 'Les Gardiens d\'Aetheria',
    genre: 'Fantasy',
    participants: 47,
    image: 'https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg',
  },
  {
    id: '2',
    title: 'Station Alpha-7',
    genre: 'Sci-Fi',
    participants: 32,
    image: 'https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg',
  },
];

export default function CreateScreen() {
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedThread, setSelectedThread] = useState<string>('');
  const [segmentText, setSegmentText] = useState<string>('');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');

  const handleCreateSegment = () => {
    if (!selectedThread || !segmentText) {
      Alert.alert('Erreur', 'Veuillez sélectionner une trame et écrire votre segment.');
      return;
    }
    
    Alert.alert(
      'Segment créé !', 
      'Votre segment a été ajouté à l\'histoire. Voulez-vous générer un média pour l\'accompagner ?',
      [
        { text: 'Plus tard', style: 'cancel' },
        { text: 'Générer maintenant', onPress: handleGenerateMedia },
      ]
    );
    
    // Reset form
    setSegmentText('');
  };

  const handleGenerateMedia = () => {
    Alert.alert(
      'Génération en cours...', 
      `Votre ${mediaType === 'image' ? 'image' : 'vidéo'} est en cours de génération par IA. Vous recevrez une notification quand elle sera prête.`
    );
  };

  const renderGenreCard = (genre: any) => (
    <TouchableOpacity
      key={genre.id}
      style={styles.genreCard}
      onPress={() => setSelectedGenre(genre.id)}
    >
      <Image source={{ uri: genre.image }} style={styles.genreImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.genreGradient}
      >
        <View style={[
          styles.genreIndicator,
          selectedGenre === genre.id && { backgroundColor: genre.color }
        ]} />
        <Text style={styles.genreName}>{genre.name}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderThreadCard = (thread: any) => (
    <TouchableOpacity
      key={thread.id}
      style={[
        styles.threadCard,
        selectedThread === thread.id && styles.selectedThreadCard
      ]}
      onPress={() => setSelectedThread(thread.id)}
    >
      <Image source={{ uri: thread.image }} style={styles.threadImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.9)']}
        style={styles.threadGradient}
      >
        <View style={styles.threadContent}>
          <Text style={styles.threadTitle}>{thread.title}</Text>
          <Text style={styles.threadGenre}>{thread.genre}</Text>
          <Text style={styles.threadParticipants}>{thread.participants} participants</Text>
        </View>
        {selectedThread === thread.id && (
          <View style={styles.selectedIndicator}>
            <PlusCircle size={20} color="#FFFFFF" strokeWidth={2} />
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <LinearGradient
          colors={['#8B5CF6', '#EC4899']}
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <Sparkles size={24} color="#FFFFFF" strokeWidth={2} />
            <Text style={styles.headerTitle}>Créer un Segment</Text>
          </View>
        </LinearGradient>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Genre Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choisir un Genre</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genreScroll}>
            {genres.map(renderGenreCard)}
          </ScrollView>
        </View>

        {/* Featured Threads */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Histoires Populaires</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.threadScroll}>
            {featuredThreads.map(renderThreadCard)}
          </ScrollView>
        </View>

        {/* Segment Text */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Votre Contribution</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textArea}
              placeholder="Continuez l'histoire... Que se passe-t-il ensuite ?"
              placeholderTextColor="#6B7280"
              value={segmentText}
              onChangeText={setSegmentText}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              maxLength={500}
            />
            <View style={styles.textInputFooter}>
              <Text style={styles.characterCount}>{segmentText.length}/500</Text>
              <TouchableOpacity style={styles.aiAssistButton}>
                <Wand2 size={16} color="#8B5CF6" strokeWidth={2} />
                <Text style={styles.aiAssistText}>Aide IA</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Media Generation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Média Généré par IA</Text>
          <View style={styles.mediaContainer}>
            <View style={styles.mediaTypeContainer}>
              <TouchableOpacity
                style={[
                  styles.mediaTypeButton,
                  mediaType === 'image' && styles.selectedMediaType
                ]}
                onPress={() => setMediaType('image')}
              >
                <ImageIcon 
                  size={20} 
                  color={mediaType === 'image' ? '#FFFFFF' : '#9CA3AF'} 
                  strokeWidth={2} 
                />
                <Text style={[
                  styles.mediaTypeText,
                  mediaType === 'image' && styles.selectedMediaTypeText
                ]}>
                  Image
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.mediaTypeButton,
                  mediaType === 'video' && styles.selectedMediaType
                ]}
                onPress={() => setMediaType('video')}
              >
                <Video 
                  size={20} 
                  color={mediaType === 'video' ? '#FFFFFF' : '#9CA3AF'} 
                  strokeWidth={2} 
                />
                <Text style={[
                  styles.mediaTypeText,
                  mediaType === 'video' && styles.selectedMediaTypeText
                ]}>
                  Vidéo
                </Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity style={styles.generateButton} onPress={handleGenerateMedia}>
              <LinearGradient
                colors={['#F97316', '#EF4444']}
                style={styles.generateButtonGradient}
              >
                <Wand2 size={20} color="#FFFFFF" strokeWidth={2} />
                <Text style={styles.generateButtonText}>Générer avec IA</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Button */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.createButton} onPress={handleCreateSegment}>
            <LinearGradient
              colors={['#8B5CF6', '#EC4899']}
              style={styles.createButtonGradient}
            >
              <Send size={20} color="#FFFFFF" strokeWidth={2} />
              <Text style={styles.createButtonText}>Publier le Segment</Text>
            </LinearGradient>
          </TouchableOpacity>
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
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  genreScroll: {
    flexDirection: 'row',
  },
  genreCard: {
    width: 120,
    height: 160,
    marginRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  genreImage: {
    width: '100%',
    height: '100%',
  },
  genreGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    justifyContent: 'flex-end',
    padding: 12,
  },
  genreIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#374151',
    marginBottom: 8,
  },
  genreName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  threadScroll: {
    flexDirection: 'row',
  },
  threadCard: {
    width: 200,
    height: 120,
    marginRight: 16,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedThreadCard: {
    borderColor: '#8B5CF6',
  },
  threadImage: {
    width: '100%',
    height: '100%',
  },
  threadGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    justifyContent: 'space-between',
    padding: 12,
  },
  threadContent: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  threadTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  threadGenre: {
    fontSize: 12,
    fontWeight: '500',
    color: '#D1D5DB',
    marginBottom: 2,
  },
  threadParticipants: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#8B5CF6',
    borderRadius: 16,
    padding: 4,
  },
  textInputContainer: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  textArea: {
    fontSize: 16,
    color: '#FFFFFF',
    minHeight: 120,
    textAlignVertical: 'top',
  },
  textInputFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  characterCount: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  aiAssistButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#374151',
    borderRadius: 8,
  },
  aiAssistText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#8B5CF6',
  },
  mediaContainer: {
    gap: 16,
  },
  mediaTypeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  mediaTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F2937',
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
  },
  selectedMediaType: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  mediaTypeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  selectedMediaTypeText: {
    color: '#FFFFFF',
  },
  generateButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  generateButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  generateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  actionContainer: {
    marginTop: 20,
  },
  createButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  createButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 8,
  },
  createButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  bottomSpacer: {
    height: 40,
  },
});