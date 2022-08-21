import { FC, MouseEvent } from 'react';
import './ButtonLevel.scss';

export interface IButtonLevel {
  description: string;
  bgColor: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const ButtonLevel: FC<IButtonLevel> = ({ description, bgColor, onClick }) => {
  return (
    <button className={`button-level ${bgColor}`} onClick={onClick}>
      {description}
    </button>
  );
};

export { ButtonLevel };
