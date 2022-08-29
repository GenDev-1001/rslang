import {
  useActiveWordsByUserQuery,
  useCountWordsByGroupQuery,
} from '../../features/aggregaredWords/aggregaredWordsApiSlice';
import { useAuth } from '../../hooks/useAuth';
import { Card } from '../Card/Card';

interface IPropsCardList {
  currentPage: number;
  currentGroup: number;
}

export const AuthCardList = ({ currentPage, currentGroup }: IPropsCardList) => {
  const {
    user: { userId },
  } = useAuth();

  const { data: activeWords } = useActiveWordsByUserQuery({
    userId: userId || '',
    group: currentGroup,
    page: currentPage - 1,
  });

  console.log('activeWords ===', activeWords);

  return (
    <div className="dictionary-words__wrapper">
      {activeWords?.paginatedResults.map((word) => {
        return <Card word={word} key={word.id} />;
      })}
    </div>
  );
};
