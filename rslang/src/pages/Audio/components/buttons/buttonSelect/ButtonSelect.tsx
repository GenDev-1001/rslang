import { FC, MouseEvent } from 'react';
import './ButtonSelect.scss';

export interface IButtonSelect {
  description: string;
  bgColor: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
  ref: any;
}

const ButtonSelect: FC<IButtonSelect> = ({ description, bgColor, disabled, onClick, ref }) => {
  return (
    <button className={`audio-btn-select ${bgColor}`} disabled={disabled} onClick={onClick}>
      {description}
    </button>
  );
};

export { ButtonSelect };
