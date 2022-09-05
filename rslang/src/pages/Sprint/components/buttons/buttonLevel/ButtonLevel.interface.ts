import { MouseEvent } from 'react';

export interface IButtonLevel {
  description: string;
  bgColor: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}
