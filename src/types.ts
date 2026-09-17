export interface Word { id: string; categoryId: string; english: string; portuguese: string; image: string; audio: string }
export interface Category { id: string; title: string; emoji: string; color: string; words: Word[] }
export type ActivityId = 'learn' | 'memory' | 'match' | 'categorize' | 'listen' | 'two-choice' | 'image' | 'spell' | 'search';
export interface Answer { wordId: string | null; correct: boolean }
export interface GameResult { id: string; categoryId: string; activity: ActivityId; completedAt: string; answers: Answer[]; visitedWordIds: string[] }
export interface Progress { version: 1; results: GameResult[]; visitedWordIds: string[] }
export interface PackManifest { categoryId: string; version: string; bytes: number; assets: { url: string; bytes: number; hash: string }[] }
