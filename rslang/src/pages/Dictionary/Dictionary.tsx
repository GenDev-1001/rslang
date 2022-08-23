import { useState } from 'react';
import { Card } from '../../components/Card/Card';
import { Footer } from '../../components/Footer/Footer';
import { LevelCard } from '../../components/LevelCard/LevelCard';
import Pagination from '../../components/Pagination/Pagination';

import {
  useActiveWordsByUserQuery,
  useCountWordsByGroupQuery,
} from '../../features/aggregaredWords/aggregaredWordsApiSlice';
import { useAuth } from '../../hooks/useAuth';
import './Dictionary.scss';

export function Dictionary() {
  const {
    user: { userId },
  } = useAuth();

  const [currentPage, setCurrentPage] = useState(1);
  const { data: countWords } = useCountWordsByGroupQuery({ userId: userId || '', group: 0 });
  const { data: activeWords } = useActiveWordsByUserQuery({
    userId: userId || '',
    group: 0,
    page: 0,
  });

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
        </div>
        <div className="dictionary-lvls-custom__wrapper">
          <LevelCard levelWord="Сложные" range="Слов: 0" levelIndex="С" />
          <LevelCard levelWord="Изученные" range="Слов: 0" levelIndex="И" />
        </div>
        <h4 className="dictionary-words__title">Слова</h4>
        <div className="dictionary-words__wrapper">
          {activeWords?.paginatedResults.map((word) => {
            return <Card word={word} />;
          })}
        </div>
        <Pagination
          currentPage={currentPage}
          total={600}
          pageSize={20}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
      <Footer />
    </>
  );
}
