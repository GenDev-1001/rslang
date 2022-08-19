import './ButtonReset.scss';

export interface IButtonReset {
  onClick: () => void;
}

export function ButtonReset({ onClick }: IButtonReset) {
  return (
    <button className="button-reset" onClick={onClick}>
      Reset
    </button>
  );
}
