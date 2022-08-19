import { MouseEvent } from 'react';
import './ButtonSelect.scss';

export interface IButtonSelect {
  description: string;
  bgColor: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export function ButtonSelect({ description, bgColor, onClick }: IButtonSelect) {
  return (
    <button className={`button-select ${bgColor}`} onClick={onClick}>
      {description}
    </button>
  );
}
