import { FC } from 'react';
import { IButtonSelect } from './ButtonSelect.interface';
import './ButtonSelect.scss';

const ButtonSelect: FC<IButtonSelect> = ({ description, bgColor, disabled, onClick }) => {
  return (
    <button className={`audio-btn-select ${bgColor}`} disabled={disabled} onClick={onClick}>
      {description}
    </button>
  );
};

export { ButtonSelect };
