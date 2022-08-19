import { MouseEvent } from 'react';
import { mockButtonSelect } from '../../../../shared/mockButtonSelect';
import { ButtonSelect } from '../buttons';
import './ButtonSelectList.scss';

export interface IButtonSelectList {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export function ButtonSelectList({ onClick }: IButtonSelectList) {
  return (
    <div className="button-select__wrapper">
      {mockButtonSelect.map(({ description, bgColor, id }) => {
        return (
          <ButtonSelect key={id} description={description} bgColor={bgColor} onClick={onClick} />
        );
      })}
    </div>
  );
}
