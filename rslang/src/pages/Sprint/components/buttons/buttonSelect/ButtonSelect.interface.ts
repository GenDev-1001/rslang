import { MouseEvent } from 'react';

export interface IButtonSelect {
  description: string;
  bgColor: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}
