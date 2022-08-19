export interface IGame {
  level: string;
  onClick: () => void;
}

export function Game({ level, onClick }: IGame) {
  return (
    <div className="sprint-frame">
      <h2>{`Вы выбрали уровень №${level}`}</h2>
      <button onClick={onClick}>Сброс уровня</button>
    </div>
  );
}
