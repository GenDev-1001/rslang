import { IPaginatedResultUpdated } from '../../features/aggregaredWords/aggregaredWordsApiSlice.inteface';
import { Card } from '../Card/Card';

interface IPropsWorkingCardList {
  workingWords: IPaginatedResultUpdated[];
}

export const WorkingCardList = ({ workingWords }: IPropsWorkingCardList) => {
  return (
    <div className="dictionary-words__wrapper">
      {workingWords.map((word) => {
        return <Card word={word} key={word.id} />;
      })}
    </div>
  );
};
