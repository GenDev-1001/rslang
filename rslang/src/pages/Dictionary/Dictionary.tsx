import cn from 'classnames';
import { useState } from 'react';
import { Card } from '../../components/Card/Card';
import { Footer } from '../../components/Footer/Footer';
import { LevelCard } from '../../components/LevelCard/LevelCard';
import Pagination from '../../components/Pagination/Pagination';
import { useGetWordsQuery } from '../../features/words/wordsApiSlice';

import './Dictionary.scss';

export function Dictionary() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentGroup, setCurrentGroup] = useState(0);
  const [isDictionary, setIsDictionary] = useState(false);

  const { data: activeWords } = useGetWordsQuery({
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
          <a className="dictionary-block-title" onClick={() => setIsDictionary(false)}>
            Учебник
          </a>
          <span className="dictionary-block-title__dev">|</span>
          <a className="dictionary-block-title" onClick={() => setIsDictionary(true)}>
            Словарь
          </a>
        </div>
        <h4 className="dictionary-lvl__title">Уровни сложности слов</h4>
        <div className="dictionary-lvls__wrapper">
          <li
            className={cn('dictionary-lvls__wrapper-li', { active: currentGroup === 0 })}
            onClick={() => handleClickGroup(0)}>
            <LevelCard levelWord="Easy" range="1-600" levelIndex="A1" />
          </li>
          <li
            className={cn('dictionary-lvls__wrapper-li', { active: currentGroup === 1 })}
            onClick={() => handleClickGroup(1)}>
            <LevelCard levelWord="Easy" range="601-1200" levelIndex="A1" />
          </li>
          <li
            className={cn('dictionary-lvls__wrapper-li', { active: currentGroup === 2 })}
            onClick={() => handleClickGroup(2)}>
            <LevelCard levelWord="Medium" range="1201-1800" levelIndex="B1" />
          </li>
          <li
            className={cn('dictionary-lvls__wrapper-li', { active: currentGroup === 3 })}
            onClick={() => handleClickGroup(3)}>
            <LevelCard levelWord="Medium" range="1801-2400" levelIndex="B2" />
          </li>
          <li
            className={cn('dictionary-lvls__wrapper-li', { active: currentGroup === 4 })}
            onClick={() => handleClickGroup(4)}>
            <LevelCard levelWord="Hard" range="2401-3000" levelIndex="C1" />
          </li>
          <li
            className={cn('dictionary-lvls__wrapper-li', { active: currentGroup === 5 })}
            onClick={() => handleClickGroup(5)}>
            <LevelCard levelWord="Hard" range="3001-3600" levelIndex="C2" />
          </li>
        </div>
        {isDictionary && (
          <div className="dictionary-lvls-custom__wrapper">
            <li>
              <LevelCard levelWord="Сложные" range="Слов: 0" levelIndex="С" />
            </li>
            <li>
              <LevelCard levelWord="Изученные" range="Слов: 0" levelIndex="И" />
            </li>
          </div>
        )}
        <h4 className="dictionary-words__title">Слова</h4>
        <div className="dictionary-words__wrapper">
          {activeWords?.map((word) => {
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
