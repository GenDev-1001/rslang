import { IPaginatedResultUpdated } from '../../features/aggregaredWords/aggregaredWordsApiSlice.inteface';
import { Card } from '../Card/Card';

interface IPropsDifficultyCardList {
  difficultyWords: IPaginatedResultUpdated[];
}

export const DifficultyCardList = ({ difficultyWords }: IPropsDifficultyCardList) => {
  return (
    <div className="dictionary-words__wrapper">
      {difficultyWords.map((word) => {
        return <Card word={word} key={word.id} />;
      })}
    </div>
  );
};
