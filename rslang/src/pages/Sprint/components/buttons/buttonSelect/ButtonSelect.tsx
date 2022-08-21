import { FC, MouseEvent } from 'react';
import './ButtonSelect.scss';

export interface IButtonSelect {
  description: string;
  bgColor: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const ButtonSelect: FC<IButtonSelect> = ({ description, bgColor, onClick }) => {
  return (
    <button className={`button-select ${bgColor}`} onClick={onClick}>
      {description}
    </button>
  );
};

export { ButtonSelect };
