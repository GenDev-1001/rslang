import { useState } from 'react';
import { Card } from '../../components/Card/Card';
import { Footer } from '../../components/Footer/Footer';
import { LevelCard } from '../../components/LevelCard/LevelCard';
import Pagination from '../../components/Pagination/Pagination';

import { useActiveWordsByUserQuery } from '../../features/aggregaredWords/aggregaredWordsApiSlice';
import { useAuth } from '../../hooks/useAuth';
import './Dictionary.scss';

export function Dictionary() {
  const {
    user: { userId },
  } = useAuth();

  const [currentPage, setCurrentPage] = useState(1);
  const [currentGroup, setCurrentGroup] = useState(0);

  const { data: activeWords } = useActiveWordsByUserQuery({
    userId: userId || '',
    group: currentGroup,
    page: currentPage - 1,
  });

  const handleClickGroup = (group: number) => {
    setCurrentGroup(group);
  };

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
          <li onClick={() => handleClickGroup(0)}>
            <LevelCard levelWord="Easy" range="1-600" levelIndex="A1" />
          </li>
          <li onClick={() => handleClickGroup(1)}>
            <LevelCard levelWord="Easy" range="601-1200" levelIndex="A1" />
          </li>
          <li onClick={() => handleClickGroup(2)}>
            <LevelCard levelWord="Medium" range="1201-1800" levelIndex="B1" />
          </li>
          <li onClick={() => handleClickGroup(3)}>
            <LevelCard levelWord="Medium" range="1801-2400" levelIndex="B2" />
          </li>
          <li onClick={() => handleClickGroup(4)}>
            <LevelCard levelWord="Hard" range="2401-3000" levelIndex="C1" />
          </li>
          <li onClick={() => handleClickGroup(5)}>
            <LevelCard levelWord="Hard" range="3001-3600" levelIndex="C2" />
          </li>
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
          className="pagination"
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
