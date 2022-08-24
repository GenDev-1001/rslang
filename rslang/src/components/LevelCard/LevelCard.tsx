import './LevelCard.scss';

interface IPropsLevelCard {
  levelWord: string;
  range: string;
  levelIndex: string;
}

export function LevelCard({ levelWord, range, levelIndex }: IPropsLevelCard) {
  return (
    <button className="dictionary-lvls__button directory-button" type="button">
      <div className="directory-button-left">
        <h5 className="directory-button-left__title">{levelWord}</h5>
        <p className="directory-button-left__subtitle">{range}</p>
      </div>
      <div className="directory-button-right">
        <h5 className="directory-button-right__title">{levelIndex}</h5>
      </div>
      <div className="directory-button-circle" />
    </button>
  );
}
