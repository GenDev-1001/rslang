import { AnimatePresence, motion } from 'framer-motion';
import { IPaginatedResultUpdated } from '../../features/aggregaredWords/aggregaredWordsApiSlice.inteface';
import { Card } from '../Card/Card';

interface IPropsDifficultyCardList {
  difficultyWords: IPaginatedResultUpdated[];
  activeColor: number;
}

export const DifficultyCardList = ({ difficultyWords, activeColor }: IPropsDifficultyCardList) => {
  return (
    <motion.div
      className="dictionary-words__wrapper"
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 1 }}
      transition={{ type: 'tween', duration: 1 }}>
      <AnimatePresence>
        {difficultyWords.map((word) => {
          return <Card word={word} key={word.id} activeColor={activeColor} />;
        })}
      </AnimatePresence>
    </motion.div>
  );
};
