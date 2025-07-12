import { MediaGenerationRequest } from '@/types/story';

// AI Service for media generation
class AIService {
  private apiKey: string = '';
  private baseUrl: string = 'https://api.example.com'; // Placeholder

  constructor() {
    // In a real app, get from environment variables
    // this.apiKey = process.env.EXPO_PUBLIC_AI_API_KEY || '';
  }

  async generateImage(request: MediaGenerationRequest): Promise<string> {
    try {
      // Placeholder implementation
      // In a real app, this would call Gemini, DALL-E, or another AI service
      
      const prompt = this.enhancePrompt(request.prompt, 'image');
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Return placeholder image URL for demo
      const placeholderImages = [
        'https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg',
        'https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg',
        'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
        'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg',
      ];
      
      return placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
      
    } catch (error) {
      console.error('Error generating image:', error);
      throw new Error('Failed to generate image');
    }
  }

  async generateVideo(request: MediaGenerationRequest): Promise<string> {
    try {
      const prompt = this.enhancePrompt(request.prompt, 'video');
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Return placeholder video URL for demo
      return 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4';
      
    } catch (error) {
      console.error('Error generating video:', error);
      throw new Error('Failed to generate video');
    }
  }

  private enhancePrompt(originalPrompt: string, mediaType: 'image' | 'video'): string {
    const baseEnhancement = mediaType === 'image' 
      ? 'High quality, detailed illustration, cinematic lighting, 4K resolution'
      : 'Cinematic video, smooth animation, high quality, dramatic lighting';
    
    return `${originalPrompt}. ${baseEnhancement}`;
  }

  async generateStoryIdeas(genre: string, count: number = 3): Promise<string[]> {
    // Placeholder for story idea generation
    const ideas = [
      'Un mystérieux artefact découvert dans une bibliothèque ancienne',
      'Une rencontre inattendue dans un café interdimensionnel',
      'L\'éveil d\'un pouvoir oublié dans un monde post-apocalyptique',
    ];
    
    return ideas.slice(0, count);
  }

  setApiKey(key: string): void {
    this.apiKey = key;
  }
}

export const aiService = new AIService();