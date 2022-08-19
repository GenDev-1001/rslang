import { MouseEvent } from 'react';

export interface IButtonLevel {
  description: string;
  bgColor: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export function ButtonLevel({ description, bgColor, onClick }: IButtonLevel) {
  return (
    <button className={`button-level ${bgColor}`} onClick={onClick}>
      {description}
    </button>
  );
}
