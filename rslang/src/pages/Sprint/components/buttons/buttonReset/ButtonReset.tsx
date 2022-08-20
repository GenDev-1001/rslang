import './ButtonReset.scss';

export interface IButtonReset {
  description: string;
  bgColor?: string;
  disabled?: boolean;
  onClick: () => void;
}

export function ButtonReset({ description, bgColor, disabled, onClick }: IButtonReset) {
  return (
    <button className={`button-reset ${bgColor}`} disabled={disabled} onClick={onClick}>
      {description}
    </button>
  );
}
