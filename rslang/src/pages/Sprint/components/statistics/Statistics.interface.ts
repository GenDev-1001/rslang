export interface IStatistics {
  statistics: {
    id: string;
    word: string;
    audio: string;
    transcription: string;
    wordTranslate: string;
    result: boolean;
  }[];
  endGame: () => void;
  resetGame: () => void;
}
