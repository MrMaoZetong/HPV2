import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CirclePlus as PlusCircle, Wand as Wand2, Image as ImageIcon, Video, Send } from 'lucide-react-native';

const genres = [
  { id: 'fantasy', name: 'Fantasy', color: '#8B5CF6' },
  { id: 'scifi', name: 'Sci-Fi', color: '#06B6D4' },
  { id: 'comedy', name: 'Comédie', color: '#F59E0B' },
  { id: 'horror', name: 'Horreur', color: '#EF4444' },
  { id: 'romance', name: 'Romance', color: '#EC4899' },
  { id: 'multiverse', name: 'Multivers', color: '#10B981' },
];

export default function CreateScreen() {
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [storyTitle, setStoryTitle] = useState<string>('');
  const [segmentText, setSegmentText] = useState<string>('');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');

  const handleCreateSegment = () => {
    if (!selectedGenre || !storyTitle || !segmentText) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs requis.');
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
    setStoryTitle('');
    setSegmentText('');
  };

  const handleGenerateMedia = () => {
    Alert.alert(
      'Génération en cours...', 
      `Votre ${mediaType === 'image' ? 'image' : 'vidéo'} est en cours de génération par IA. Vous recevrez une notification quand elle sera prête.`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Créer un Segment</Text>
        <PlusCircle size={24} color="#8B5CF6" strokeWidth={2} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Genre Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choisir une Trame</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genreScroll}>
            {genres.map((genre) => (
              <TouchableOpacity
                key={genre.id}
                style={[
                  styles.genreChip,
                  selectedGenre === genre.id && { backgroundColor: genre.color }
                ]}
                onPress={() => setSelectedGenre(genre.id)}
              >
                <Text style={[
                  styles.genreChipText,
                  selectedGenre === genre.id && styles.selectedGenreText
                ]}>
                  {genre.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Story Title */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Titre de l'Histoire</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Ex: Les Gardiens d'Aetheria"
            value={storyTitle}
            onChangeText={setStoryTitle}
            maxLength={100}
          />
        </View>

        {/* Segment Text */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Votre Segment</Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            placeholder="Écrivez la suite de l'histoire..."
            value={segmentText}
            onChangeText={setSegmentText}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            maxLength={500}
          />
          <Text style={styles.characterCount}>{segmentText.length}/500</Text>
        </View>

        {/* Media Generation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Type de Média à Générer</Text>
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
                color={mediaType === 'image' ? '#FFFFFF' : '#6B7280'} 
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
                color={mediaType === 'video' ? '#FFFFFF' : '#6B7280'} 
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
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.generateButton} onPress={handleGenerateMedia}>
            <Wand2 size={20} color="#FFFFFF" strokeWidth={2} />
            <Text style={styles.generateButtonText}>Générer Média IA</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.createButton} onPress={handleCreateSegment}>
            <Send size={20} color="#FFFFFF" strokeWidth={2} />
            <Text style={styles.createButtonText}>Publier Segment</Text>
          </TouchableOpacity>
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
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  genreScroll: {
    flexDirection: 'row',
  },
  genreChip: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  genreChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  selectedGenreText: {
    color: '#FFFFFF',
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
  },
  textArea: {
    height: 120,
    paddingTop: 12,
  },
  characterCount: {
    textAlign: 'right',
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
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
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 12,
    gap: 8,
  },
  selectedMediaType: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  mediaTypeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  selectedMediaTypeText: {
    color: '#FFFFFF',
  },
  actionContainer: {
    gap: 12,
    marginTop: 20,
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F97316',
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
  },
  generateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});