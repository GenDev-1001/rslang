import cn from 'classnames';
import { AnimatePresence } from 'framer-motion';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { UserWordStatus } from '../../common/interfaces';
import { navData } from '../../common/utils/defaultData';
import { AuthCardList } from '../../components/AuthCardList/AuthCardList';
import { BtnScrool } from '../../components/BtnScrool/BtnScrool';
import { Card } from '../../components/Card/Card';
import { DifficultyCardList } from '../../components/DifficultyCardList/DifficultyCardList';
import { Footer } from '../../components/Footer/Footer';
import { LevelCard } from '../../components/LevelCard/LevelCard';
import Pagination from '../../components/Pagination/Pagination';
import { WorkingCardList } from '../../components/WorkingCardList/WorkingCardList';
import { useDictionaryWordsQuery } from '../../features/aggregaredWords/aggregaredWordsApiSlice';
import { selectSettings, setGroup, setPage } from '../../features/settings/settingsSlice';
import { useGetWordsQuery } from '../../features/words/wordsApiSlice';
import { useAuth } from '../../hooks/useAuth';
import './Dictionary.scss';

export interface IDictionary {
  handleGameOpenFromMenu: (value: boolean) => void;
}

const Dictionary: FC<IDictionary> = ({ handleGameOpenFromMenu }) => {
  const { page, group } = useAppSelector(selectSettings);
  const [isDictionary, setIsDictionary] = useState(false);
  const [isDifficulty, setIsDifficulty] = useState(false);
  const [isWorking, setIsWorking] = useState(false);
  const [activeColor, setActiveColor] = useState(group);
  const [wordPlaying, setWordPlaying] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const { user } = useAuth();

  const { data: activeWords } = useGetWordsQuery({
    group,
    page: page - 1,
  });

  const { data: difficultyWords } = useDictionaryWordsQuery({
    userId: user.userId || '',
    page: page - 1,
    group,
    difficulty: UserWordStatus.HARD,
  });

  const { data: workingWords } = useDictionaryWordsQuery({
    userId: user.userId || '',
    page: page - 1,
    group,
    difficulty: UserWordStatus.EASY,
  });

  const handlePage = (pageNumber: number) => {
    dispatch(setPage(pageNumber));
  };

  const handlerClickDictionary = (prev: boolean) => {
    setIsDictionary(!prev);
    setIsDifficulty(false);
    setIsWorking(false);
  };

  const handlerClickDifficulty = () => {
    setIsDifficulty(true);
    handlePage(1);
    setIsWorking(false);
  };

  const handlerClickWorking = () => {
    setIsWorking(true);
    handlePage(1);
    setIsDifficulty(false);
  };

  const handleClickGroup = (groupNumber: number) => {
    dispatch(setGroup(groupNumber));
    setActiveColor(groupNumber);
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
          {navData.map((navItem) => (
            <li
              key={navItem.id}
              className={cn('dictionary-lvls__wrapper-li', {
                active: group === navItem.id,
              })}
              onClick={() => handleClickGroup(navItem.id)}>
              <LevelCard
                levelWord={navItem.levelWord}
                range={navItem.range}
                levelIndex={navItem.levelIndex}
              />
            </li>
          ))}
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
              currentPage={page}
              total={difficultyWords?.totalCount}
              pageSize={20}
              onPageChange={(pageNumber) => handlePage(pageNumber)}
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
              currentPage={page}
              total={workingWords?.totalCount}
              pageSize={20}
              onPageChange={(pageNumber) => handlePage(pageNumber)}
            />
          </>
        ) : user.token ? (
          <>
            <AuthCardList
              currentGroup={group}
              isDictionary={isDictionary}
              currentPage={page}
              activeColor={activeColor}
              wordPlaying={wordPlaying}
              playWordCard={setWordPlaying}
            />
            <Pagination
              className="pagination"
              currentPage={page}
              total={600}
              pageSize={20}
              onPageChange={(pageNumber) => handlePage(pageNumber)}
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
              currentPage={page}
              total={600}
              pageSize={20}
              onPageChange={(pageNumber) => handlePage(pageNumber)}
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
