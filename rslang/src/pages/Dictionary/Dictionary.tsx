import { Card } from '../../components/Card/Card';
import { Footer } from '../../components/Footer/Footer';
import { LevelCard } from '../../components/LevelCard/LevelCard';
import './Dictionary.scss';

export function Dictionary() {
  return (
    <>
      <div className="container">
        <div className="dictionary-block">
          <a className="dictionary-block-title">Учебник</a>
          <span className="dictionary-block-title__dev">|</span>
          <a className="dictionary-block-title">Словарь</a>
        </div>
        <h4 className="dictionary-lvl__title">Уровни сложности слов</h4>
        <div className="dictionary-lvls__wrapper">
          <LevelCard levelWord="Easy" range="1-600" levelIndex="A1" />
          <LevelCard levelWord="Easy" range="601-1200" levelIndex="A1" />
          <LevelCard levelWord="Medium" range="1201-1800" levelIndex="B1" />
          <LevelCard levelWord="Medium" range="1801-2400" levelIndex="B2" />
          <LevelCard levelWord="Hard" range="2401-3000" levelIndex="C1" />
          <LevelCard levelWord="Hard" range="3001-3600" levelIndex="C2" />
          <LevelCard levelWord="Сложные" range="Слов: 0" levelIndex="C" />
        </div>
        <h4 className="dictionary-words__title">Слова</h4>
        <div className="dictionary-words__wrapper">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
        <div className="pagination">
          <ul className="pagination-ul">
            <li className="pagination-first">
              <button className="pagination-first__btn pagination-btn">&#60;&#60;</button>
            </li>
            <li className="pagination-prev">
              <button className="pagination-prev__btn pagination-btn">&#60;</button>
            </li>
            <li className="pagination-page">
              <button className="pagination-page__btn pagination-btn">1</button>
            </li>
            <li className="pagination-next">
              <button className="pagination-next__btn pagination-btn">&#62;</button>
            </li>
            <li className="pagination-last">
              <button className="pagination-last__btn pagination-btn">&#62;&#62;</button>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}
