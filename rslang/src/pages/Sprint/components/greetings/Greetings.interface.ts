import { MouseEvent } from 'react';

export interface IGreetings {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  isGameOpenFromMenu: boolean;
}
