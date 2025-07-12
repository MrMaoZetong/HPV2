import { User, Thread, Segment, Genre, UserStats } from '@/types/story';

// Mock data service - In a real app, this would connect to Firebase/Supabase
class DatabaseService {
  private users: User[] = [];
  private threads: Thread[] = [];
  private segments: Segment[] = [];
  private genres: Genre[] = [
    {
      id: 'fantasy',
      name: 'Fantasy',
      description: 'Mondes magiques, créatures mystiques et aventures épiques',
      color: '#8B5CF6',
      icon: 'sparkles',
    },
    {
      id: 'scifi',
      name: 'Sci-Fi',
      description: 'Technologie avancée, voyages spatiaux et futurs alternatifs',
      color: '#06B6D4',
      icon: 'zap',
    },
    {
      id: 'comedy',
      name: 'Comédie',
      description: 'Histoires drôles et situations loufoques',
      color: '#F59E0B',
      icon: 'smile',
    },
    {
      id: 'horror',
      name: 'Horreur',
      description: 'Suspense, terreur et mystères sombres',
      color: '#EF4444',
      icon: 'ghost',
    },
    {
      id: 'romance',
      name: 'Romance',
      description: 'Histoires d\'amour et relations touchantes',
      color: '#EC4899',
      icon: 'heart',
    },
    {
      id: 'multiverse',
      name: 'Multivers',
      description: 'Réalités parallèles et dimensions alternatives',
      color: '#10B981',
      icon: 'globe',
    },
  ];

  // User methods
  async createUser(userData: Partial<User>): Promise<User> {
    const newUser: User = {
      id: Date.now().toString(),
      username: userData.username || 'Anonyme',
      email: userData.email || '',
      level: 1,
      xp: 0,
      badges: [],
      createdAt: new Date(),
      ...userData,
    };
    
    this.users.push(newUser);
    return newUser;
  }

  async getUserById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;
    
    this.users[userIndex] = { ...this.users[userIndex], ...updates };
    return this.users[userIndex];
  }

  // Thread methods
  async createThread(threadData: Partial<Thread>): Promise<Thread> {
    const newThread: Thread = {
      id: Date.now().toString(),
      title: threadData.title || 'Nouvelle Histoire',
      description: threadData.description || '',
      genre: threadData.genre || this.genres[0],
      status: 'ongoing',
      createdBy: threadData.createdBy || '',
      participants: threadData.participants || [],
      segments: [],
      trending: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...threadData,
    };
    
    this.threads.push(newThread);
    return newThread;
  }

  async getThreads(filter?: { status?: string; genre?: string }): Promise<Thread[]> {
    let filteredThreads = [...this.threads];
    
    if (filter?.status) {
      filteredThreads = filteredThreads.filter(thread => thread.status === filter.status);
    }
    
    if (filter?.genre) {
      filteredThreads = filteredThreads.filter(thread => thread.genre.id === filter.genre);
    }
    
    return filteredThreads.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }

  async getThreadById(id: string): Promise<Thread | null> {
    return this.threads.find(thread => thread.id === id) || null;
  }

  async updateThread(id: string, updates: Partial<Thread>): Promise<Thread | null> {
    const threadIndex = this.threads.findIndex(thread => thread.id === id);
    if (threadIndex === -1) return null;
    
    this.threads[threadIndex] = { 
      ...this.threads[threadIndex], 
      ...updates,
      updatedAt: new Date(),
    };
    return this.threads[threadIndex];
  }

  // Segment methods
  async createSegment(segmentData: Partial<Segment>): Promise<Segment> {
    const thread = await this.getThreadById(segmentData.threadId || '');
    if (!thread) throw new Error('Thread not found');
    
    const newSegment: Segment = {
      id: Date.now().toString(),
      threadId: segmentData.threadId || '',
      authorId: segmentData.authorId || '',
      content: segmentData.content || '',
      likes: 0,
      comments: [],
      order: thread.segments.length + 1,
      createdAt: new Date(),
      ...segmentData,
    };
    
    this.segments.push(newSegment);
    
    // Update thread
    thread.segments.push(newSegment);
    if (!thread.participants.includes(newSegment.authorId)) {
      thread.participants.push(newSegment.authorId);
    }
    await this.updateThread(thread.id, { segments: thread.segments, participants: thread.participants });
    
    return newSegment;
  }

  async getSegmentsByThread(threadId: string): Promise<Segment[]> {
    return this.segments
      .filter(segment => segment.threadId === threadId)
      .sort((a, b) => a.order - b.order);
  }

  async updateSegment(id: string, updates: Partial<Segment>): Promise<Segment | null> {
    const segmentIndex = this.segments.findIndex(segment => segment.id === id);
    if (segmentIndex === -1) return null;
    
    this.segments[segmentIndex] = { ...this.segments[segmentIndex], ...updates };
    return this.segments[segmentIndex];
  }

  // Genre methods
  async getGenres(): Promise<Genre[]> {
    return [...this.genres];
  }

  async getGenreById(id: string): Promise<Genre | null> {
    return this.genres.find(genre => genre.id === id) || null;
  }

  // Stats methods
  async getUserStats(userId: string): Promise<UserStats> {
    const userSegments = this.segments.filter(segment => segment.authorId === userId);
    const userThreads = this.threads.filter(thread => 
      thread.participants.includes(userId) || thread.createdBy === userId
    );
    
    const totalLikes = userSegments.reduce((sum, segment) => sum + segment.likes, 0);
    const user = await this.getUserById(userId);
    
    return {
      totalSegments: userSegments.length,
      totalLikes,
      totalThreads: userThreads.length,
      currentStreak: 0, // TODO: Calculate based on activity
      totalXP: user?.xp || 0,
      level: user?.level || 1,
    };
  }
}

export const databaseService = new DatabaseService();