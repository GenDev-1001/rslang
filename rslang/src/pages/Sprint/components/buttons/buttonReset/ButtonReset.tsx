import { FC } from 'react';
import { IButtonReset } from './ButtonReset.interface';
import './ButtonReset.scss';

const ButtonReset: FC<IButtonReset> = ({ description, bgColor, disabled, onClick }) => {
  return (
    <button className={`button-reset ${bgColor}`} disabled={disabled} onClick={onClick}>
      {description}
    </button>
  );
};

export { ButtonReset };
