// === CeritaKita Types ===

export interface SoundTrigger {
  id: string;
  /** X position as percentage (0-100) */
  x: number;
  /** Y position as percentage (0-100) */
  y: number;
  /** URL to MP3 file */
  audioUrl: string;
  /** Label for accessibility */
  label: string;
}

export interface Slide {
  id: string;
  /** Order index of the slide */
  order: number;
  /** URL to slide PNG image */
  imageUrl: string;
  /** Sound triggers on this slide */
  soundTriggers: SoundTrigger[];
}

export interface GameOption {
  id: string;
  /** URL to option image */
  imageUrl: string;
  /** Alt text */
  label: string;
  /** Whether this is the correct answer */
  isCorrect: boolean;
}

export interface MiniGame {
  /** The question text */
  question: string;
  /** Game option choices (max 4) */
  options: GameOption[];
}

export interface Book {
  id: string;
  title: string;
  description: string;
  /** URL to cover image */
  coverUrl: string;
  /** Estimated read time in minutes */
  readTimeMinutes: number;
  /** Category/age group */
  category: string;
  /** Publication status */
  status: "draft" | "published" | "unpublished";
  /** Book slides */
  slides: Slide[];
  /** Mini game at the end */
  game: MiniGame | null;
  /** Date created */
  createdAt: string;
  /** Date last updated */
  updatedAt: string;
}
