import { MouseEvent } from 'react';
import { ButtonLevel } from '../buttons';
import { mockButtonLevel } from '../../../../shared/mockButtonLevel';
import './ButtonLevelList.scss';

export interface IButtonLevelList {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export function ButtonLevelList({ onClick }: IButtonLevelList) {
  return (
    <div className="button-level__wrapper">
      {mockButtonLevel.map(({ description, bgColor, id }) => {
        return (
          <ButtonLevel key={id} description={description} bgColor={bgColor} onClick={onClick} />
        );
      })}
    </div>
  );
}
