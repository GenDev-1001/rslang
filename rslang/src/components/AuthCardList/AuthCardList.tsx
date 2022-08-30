import { AnimatePresence } from 'framer-motion';
import { useActiveWordsByUserQuery } from '../../features/aggregaredWords/aggregaredWordsApiSlice';
import { useAuth } from '../../hooks/useAuth';
import { Card } from '../Card/Card';

interface IPropsCardList {
  currentPage: number;
  currentGroup: number;
  activeColor: number;
  wordPlaying: null | string;
  playWordCard: (value: string | null) => void;
}

export const AuthCardList = ({
  currentPage,
  currentGroup,
  activeColor,
  wordPlaying,
  playWordCard,
}: IPropsCardList) => {
  const {
    user: { userId },
  } = useAuth();

  const { data: activeWords } = useActiveWordsByUserQuery({
    userId: userId || '',
    group: currentGroup,
    page: currentPage - 1,
  });

  return (
    <div className="dictionary-words__wrapper">
      <AnimatePresence>
        {activeWords?.paginatedResults.map((word) => {
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
    </div>
  );
};
