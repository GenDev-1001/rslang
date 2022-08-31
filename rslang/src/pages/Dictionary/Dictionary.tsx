import cn from 'classnames';
import { AnimatePresence } from 'framer-motion';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserWordStatus } from '../../common/interfaces';
import { AuthCardList } from '../../components/AuthCardList/AuthCardList';
import { BtnScrool } from '../../components/BtnScrool/BtnScrool';
import { Card } from '../../components/Card/Card';
import { DifficultyCardList } from '../../components/DifficultyCardList/DifficultyCardList';
import { Footer } from '../../components/Footer/Footer';
import { LevelCard } from '../../components/LevelCard/LevelCard';
import Pagination from '../../components/Pagination/Pagination';
import { WorkingCardList } from '../../components/WorkingCardList/WorkingCardList';
import { useDictionaryWordsQuery } from '../../features/aggregaredWords/aggregaredWordsApiSlice';
import { useGetWordsQuery } from '../../features/words/wordsApiSlice';
import { useAuth } from '../../hooks/useAuth';
import './Dictionary.scss';

export interface IDictionary {
  handleGameOpenFromMenu: (value: boolean) => void;
}

const localPage = localStorage.getItem('currentPage');
const localGroup = localStorage.getItem('currentGroup');

const Dictionary: FC<IDictionary> = ({ handleGameOpenFromMenu }) => {
  const [currentPage, setCurrentPage] = useState(localPage ? +localPage : 1);
  const [currentGroup, setCurrentGroup] = useState(localGroup ? +localGroup : 0);
  const [isDictionary, setIsDictionary] = useState(false);
  const [isDifficulty, setIsDifficulty] = useState(false);
  const [isWorking, setIsWorking] = useState(false);
  const [activeColor, setActiveColor] = useState(0);
  const [wordPlaying, setWordPlaying] = useState<string | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    localStorage.setItem('currentPage', String(currentPage));
    localStorage.setItem('currentGroup', String(currentGroup));
  }, [currentPage, currentGroup]);

  const { data: activeWords } = useGetWordsQuery({
    group: currentGroup,
    page: currentPage - 1,
  });

  const { data: difficultyWords } = useDictionaryWordsQuery({
    userId: user.userId || '',
    group: currentGroup,
    page: currentPage - 1,
    difficulty: UserWordStatus.HARD,
  });

  const { data: workingWords } = useDictionaryWordsQuery({
    userId: user.userId || '',
    group: currentGroup,
    page: currentPage - 1,
    difficulty: UserWordStatus.EASY,
  });

  const handlerClickDictionary = (prev: boolean) => {
    setIsDictionary(!prev);
    setIsDifficulty(false);
    setIsWorking(false);
  };

  const handlerClickDifficulty = () => {
    setIsDifficulty(true);
    setCurrentPage(1);
    setIsWorking(false);
  };

  const handlerClickWorking = () => {
    setIsWorking(true);
    setCurrentPage(1);
    setIsDifficulty(false);
  };

  const handleClickGroup = (group: number) => {
    setCurrentGroup(group);
    setActiveColor(group);
  };

  return (
    <>
      <div className="container">
        <div className="dictionary-block">
          <a
            className={cn('dictionary-block-title', { active: !isDictionary })}
            onClick={() => handlerClickDictionary(true)}>
            Учебник
          </a>

          {user.token && (
            <>
              <span className="dictionary-block-title__dev">|</span>
              <a
                className={cn('dictionary-block-title', { active: isDictionary })}
                onClick={() => handlerClickDictionary(false)}>
                Словарь
              </a>
            </>
          )}
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
            <li
              className={cn('dictionary-lvls-custom__wrapper-li', { active: isDifficulty })}
              onClick={() => handlerClickDifficulty()}>
              <LevelCard
                levelWord="Сложные"
                range={`Слов: ${difficultyWords?.totalCount}`}
                levelIndex="С"
              />
            </li>
            <li
              className={cn('dictionary-lvls-custom__wrapper-li', { active: isWorking })}
              onClick={() => handlerClickWorking()}>
              <LevelCard
                levelWord="Изученные"
                range={`Слов: ${workingWords?.totalCount}`}
                levelIndex="И"
              />
            </li>
          </div>
        )}
        <h4 className="dictionary-lvl__title">Игры</h4>
        <ul className="dictionary-games">
          <li className="dictionary-games__item">
            <Link
              to="/audio"
              className="dictionary-games__link"
              onClick={() => handleGameOpenFromMenu(false)}>
              <LevelCard levelWord="Аудиовызов" range="Тренировка" levelIndex="play" />
            </Link>
          </li>
          <li className="dictionary-games__item">
            <Link
              to="/sprint"
              className="dictionary-games__link"
              onClick={() => handleGameOpenFromMenu(false)}>
              <LevelCard levelWord="Спринт" range="Тренировка" levelIndex="play" />
            </Link>
          </li>
        </ul>
        <h4 className="dictionary-words__title">Слова</h4>
        {isDifficulty && difficultyWords ? (
          <>
            <DifficultyCardList
              isDictionary={isDictionary}
              difficultyWords={difficultyWords?.paginatedResults}
              activeColor={activeColor}
              wordPlaying={wordPlaying}
              playWordCard={setWordPlaying}
            />
            <Pagination
              className="pagination"
              currentPage={currentPage}
              total={difficultyWords?.totalCount}
              pageSize={20}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </>
        ) : isWorking && workingWords ? (
          <>
            <WorkingCardList
              isDictionary={isDictionary}
              workingWords={workingWords?.paginatedResults}
              activeColor={activeColor}
              wordPlaying={wordPlaying}
              playWordCard={setWordPlaying}
            />
            <Pagination
              className="pagination"
              currentPage={currentPage}
              total={workingWords?.totalCount}
              pageSize={20}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </>
        ) : user.token ? (
          <>
            <AuthCardList
              currentGroup={currentGroup}
              isDictionary={isDictionary}
              currentPage={currentPage}
              activeColor={activeColor}
              wordPlaying={wordPlaying}
              playWordCard={setWordPlaying}
            />
            <Pagination
              className="pagination"
              currentPage={currentPage}
              total={600}
              pageSize={20}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </>
        ) : (
          <>
            <div className="dictionary-words__wrapper">
              {activeWords?.map((word) => (
                <AnimatePresence>
                  <Card
                    word={word}
                    isDictionary={isDictionary}
                    key={word.id}
                    activeColor={activeColor}
                    wordPlaying={wordPlaying}
                    playWordCard={setWordPlaying}
                  />
                </AnimatePresence>
              ))}
            </div>
            <Pagination
              className="pagination"
              currentPage={currentPage}
              total={600}
              pageSize={20}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </>
        )}
      </div>
      <BtnScrool />
      <Footer />
    </>
  );
};

export { Dictionary };
