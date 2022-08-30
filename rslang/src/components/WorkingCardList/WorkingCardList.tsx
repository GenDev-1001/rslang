import { AnimatePresence, motion } from 'framer-motion';
import { IPaginatedResultUpdated } from '../../features/aggregaredWords/aggregaredWordsApiSlice.inteface';
import { Card } from '../Card/Card';

interface IPropsWorkingCardList {
  workingWords: IPaginatedResultUpdated[];
  activeColor: number;
  wordPlaying: null | string;
  playWordCard: (value: string | null) => void;
}

export const WorkingCardList = ({
  workingWords,
  activeColor,
  wordPlaying,
  playWordCard,
}: IPropsWorkingCardList) => {
  return workingWords.length === 0 ? (
    <p className="no-results">There are no workings words at the moment</p>
  ) : (
    <motion.div
      className="dictionary-words__wrapper"
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 1 }}
      transition={{ type: 'tween', duration: 1 }}>
      <AnimatePresence>
        {workingWords.map((word) => {
          return (
            <Card
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
