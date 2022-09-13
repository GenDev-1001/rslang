import { FC } from 'react';
import { IButtonSelect } from './ButtonSelect.interface';
import './ButtonSelect.scss';

const ButtonSelect: FC<IButtonSelect> = ({ description, bgColor, onClick }) => {
  return (
    <button className={`button-select ${bgColor}`} onClick={onClick}>
      {description}
    </button>
  );
};

export { ButtonSelect };
