import { FC } from 'react';
import { IButtonLevel } from './ButtonLevel.interface';
import './ButtonLevel.scss';

const ButtonLevel: FC<IButtonLevel> = ({ description, bgColor, onClick }) => {
  return (
    <button className={`button-level ${bgColor}`} onClick={onClick}>
      {description}
    </button>
  );
};

export { ButtonLevel };
