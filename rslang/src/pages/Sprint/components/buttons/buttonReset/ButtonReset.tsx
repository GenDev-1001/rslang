import { FC } from 'react';
import './ButtonReset.scss';

export interface IButtonReset {
  description: string;
  bgColor?: string;
  disabled?: boolean;
  onClick: () => void;
}

const ButtonReset: FC<IButtonReset> = ({ description, bgColor, disabled, onClick }) => {
  return (
    <button className={`button-reset ${bgColor}`} disabled={disabled} onClick={onClick}>
      {description}
    </button>
  );
};

export { ButtonReset };
