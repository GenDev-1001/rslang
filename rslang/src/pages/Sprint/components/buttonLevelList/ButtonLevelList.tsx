import { MouseEvent } from 'react';
import { ButtonLevel } from '../buttons';
import { mockButtonLevel } from '../../../../shared/mockButtonLevel';

export interface IButtonLevelList {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export function ButtonLevelList({ onClick }: IButtonLevelList) {
  return (
    <div className="button-level__wrapper">
      {mockButtonLevel.map(({ description, id }) => {
        return <ButtonLevel key={id} description={description} onClick={onClick} />;
      })}
    </div>
  );
}
