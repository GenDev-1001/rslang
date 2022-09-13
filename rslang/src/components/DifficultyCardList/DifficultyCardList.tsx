import { AnimatePresence, motion } from 'framer-motion';
import { IPaginatedResultUpdated } from '../../features/aggregaredWords/aggregaredWordsApiSlice.inteface';
import { Card } from '../Card/Card';

interface IPropsDifficultyCardList {
  difficultyWords: IPaginatedResultUpdated[];
  activeColor: number;
  wordPlaying: null | string;
  playWordCard: (value: string | null) => void;
  isDictionary: boolean;
}

export const DifficultyCardList = ({
  difficultyWords,
  activeColor,
  wordPlaying,
  playWordCard,
  isDictionary,
}: IPropsDifficultyCardList) => {
  return difficultyWords.length === 0 ? (
    <p className="no-results">There are no difficult words at the moment</p>
  ) : (
    <motion.div
      className="dictionary-words__wrapper"
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 1 }}
      transition={{ type: 'tween', duration: 1 }}>
      <AnimatePresence>
        {difficultyWords.map((word) => {
          return (
            <Card
              isDictionary={isDictionary}
              word={word}
              key={word.id}
              activeColor={activeColor}
              wordPlaying={wordPlaying}
              playWordCard={playWordCard}
            />
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
};
