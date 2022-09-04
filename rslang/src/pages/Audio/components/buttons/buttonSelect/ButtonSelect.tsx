import { FC, MouseEvent } from 'react';
import './ButtonSelect.scss';

export interface IButtonSelect {
  description: string;
  bgColor: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
}

const ButtonSelect: FC<IButtonSelect> = ({ description, bgColor, disabled, onClick }) => {
  return (
    <button className={`audio-btn-select ${bgColor}`} disabled={disabled} onClick={onClick}>
      {description}
    </button>
  );
};

export { ButtonSelect };
