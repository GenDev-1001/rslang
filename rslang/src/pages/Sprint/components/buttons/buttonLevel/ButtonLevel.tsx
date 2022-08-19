import { MouseEvent } from 'react';

export interface IButtonLevel {
  description: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export function ButtonLevel({ description, onClick }: IButtonLevel) {
  return (
    <button className="button-level" onClick={onClick}>
      {description}
    </button>
  );
}
