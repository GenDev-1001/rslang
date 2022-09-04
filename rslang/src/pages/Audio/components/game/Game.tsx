import React, { FC, useState, useEffect, useRef, KeyboardEvent } from 'react';
import { ButtonReset, ButtonSpeak, ButtonSelect } from '../buttons';
import { Circle } from '../circle/Circle';
import { Multiplier } from '../multiplier/Multiplier';
import { IStatistics, keyCodesArr, wordsArrayFilds, WordsType } from '../../constants';
import '../../Audio.scss';
import { WordPicture } from './WordPicture';

export interface IGame {
  data: WordsType[] | undefined;
  group: string;
  handleStatistics: ({
    id,
    audio,
    word,
    wordTranslate,
    transcription,
    answer,
  }: IStatistics) => void;
  resetGame: () => void;
  handleIsEndGame: (value: boolean) => void;
}

export const Game: FC<IGame> = ({ data, group, handleStatistics, resetGame, handleIsEndGame }) => {
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [multiplier, setMultiplier] = useState<number>(1);
  const [wordIndex, setWordIndex] = useState<number>(0);

  const [wordsArr, setWordsArr] = useState<WordsType[]>([]);
  const [checkWordsArr, setCheckWordsArr] = useState<WordsType[]>([]);
  const [rightWord, setRightWord] = useState<WordsType>(wordsArrayFilds);

  const [randomWord, setRandomWord] = useState<WordsType>(wordsArrayFilds);
  const [gameBtn, setGameBtn] = useState<string>('не знаю');
  const [disable, setDisable] = useState(false);
  const prevBtn = useRef(null);

  const createRightWord = (wordslist: WordsType[]) => {
    let array: WordsType[] = wordslist;
    let result: WordsType;
    do {
      result = array[Math.floor(Math.random() * array.length)];
      // eslint-disable-next-line @typescript-eslint/no-loop-func
      array = array.filter((elem) => elem.id !== result.id);
    } while (
      array.length && // eslint-disable-next-line @typescript-eslint/no-loop-func
      checkWordsArr.findIndex((elem: WordsType) => elem.id === result.id) !== -1
    );
    if (array.length) {
      setRightWord(result);
      const newCheckWordsArr = JSON.parse(JSON.stringify(checkWordsArr));
      newCheckWordsArr.push(result);
      setCheckWordsArr(newCheckWordsArr);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      createWordsArray();
    }
  };

  async function createWordsArray() {
    if (data) {
      const array: WordsType[] = [];
      while (array.length < 5) {
        const elem = data && data[Math.floor(Math.random() * data.length)];
        if (!array.includes(elem)) {
          array.push(elem);
        }
      }
      setWordsArr(array);
      createRightWord(array);
    }
  }

  const handleWordIndex = () => {
    if (wordIndex < 19) {
      setWordIndex(wordIndex + 1);
    } else {
      handleIsEndGame(true);
    }
  };

  const countSreak = (
    id: string,
    audio: string,
    word: string,
    wordTranslate: string,
    transcription: string,
    answer: boolean,
  ) => {
    if (!disable) {
      if (answer) {
        if (streak === 3) {
          if (multiplier !== 4) {
            setMultiplier((prevState) => prevState + 1);
          }
          setStreak(1);
        }

        if (streak !== 3) {
          setStreak((prevState) => prevState + 1);
        }

        setScore((prevState) => prevState + 10 * multiplier);

        handleStatistics({
          id,
          audio,
          word,
          wordTranslate,
          transcription,
          answer,
        });
      } else {
        setStreak(0);
        setMultiplier(1);
        handleStatistics({ id, audio, word, wordTranslate, transcription, answer });
      }
    }
  };

  const continueGame = () => {
    const wordsArrCopy = JSON.parse(JSON.stringify(wordsArr));
    let modWordsArr: WordsType[];
    if (gameBtn === 'не знаю') {
      modWordsArr = wordsArrCopy.map((elem: WordsType) => {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        elem.wordTranslate === rightWord.wordTranslate
          ? (elem['status'!] = 'bg_white')
          : (elem['status'!] = 'bg_grey');
        return elem;
      });
      setWordsArr(modWordsArr);
      setGameBtn('→');
      setDisable(true);
    } else {
      createWordsArray();
      setGameBtn('не знаю');
      setDisable(false);
    }
  };

  const changeBtnStatus = (answer: boolean, selectedWord: WordsType) => {
    const wordsArrCopy = JSON.parse(JSON.stringify(wordsArr));
    const selectedIndex = wordsArrCopy.findIndex((item: WordsType) => item.id === selectedWord.id);
    let modWordsArr: WordsType[];
    continueGame();

    if (answer) {
      modWordsArr = wordsArrCopy.map((elem: WordsType, index: number) => {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        index === selectedIndex ? (elem['status'] = 'bg_white') : (elem['status'] = 'bg_grey');
        return elem;
      });
      setWordsArr(modWordsArr);
      setGameBtn('→');
    } else {
      modWordsArr = wordsArrCopy.map((elem: WordsType, index: number) => {
        if (elem.wordTranslate === rightWord.wordTranslate) {
          elem['status'!] = 'bg_white';
        } else if (index === selectedIndex && elem.wordTranslate !== rightWord.wordTranslate) {
          elem['status'!] = 'answer_wrong';
        } else {
          elem['status'!] = 'bg_grey';
        }
        return elem;
      });
      setWordsArr(modWordsArr);
      setGameBtn('→');
    }
  };

  const checkAnswer = (selectedWord: WordsType) => {
    const answer = rightWord.wordTranslate === selectedWord.wordTranslate;

    const id = data ? data[wordIndex].id : '';
    const audio = data ? data[wordIndex].audio : '';
    const word = data ? data[wordIndex].word : '';
    const wordTranslate = data ? data[wordIndex].wordTranslate : '';
    const transcription = data ? data[wordIndex].transcription : '';

    countSreak(id, audio, word, wordTranslate, transcription, answer);
    changeBtnStatus(answer, selectedWord);

    handleStatistics({
      id,
      audio,
      word,
      wordTranslate,
      transcription,
      answer,
    });
  };

  const handleButtonSelect = (selectedWord: WordsType) => {
    setWordIndex(wordIndex + 1);
    setRandomWord(selectedWord);
    checkAnswer(selectedWord);
    handleWordIndex();
    setDisable(true);
  };

  const onKeydown = (event: KeyboardEventInit) => {
    const code: number | undefined = event.keyCode;
    if (!disable && wordsArr.length && code && keyCodesArr.includes(code)) {
      const keyValue = Number(event.key);
      handleButtonSelect(wordsArr[keyValue - 1]);
    }
  };

  useEffect(() => {
    createWordsArray();
    document.addEventListener('keypress', (e: KeyboardEventInit) => onKeydown(e));
    return function cleanup() {
      document.addEventListener('keypress', (e: KeyboardEventInit) => onKeydown(e));
    };
  }, []);

  return (
    <div className="audio-frame">
      <div className="audio-ui">
        <Circle title="Level" value={`№${group}`} />
        <div className="audio-ui__streak-wrapper">
          <ul className="audio-ui__streak">
            <Multiplier multiplier={streak} value={0} description="&#128293;" />
            <Multiplier multiplier={streak} value={1} description="&#128293;" />
            <Multiplier multiplier={streak} value={2} description="&#128293;" />
          </ul>
          <ul className="audio-ui__level">
            <Multiplier multiplier={multiplier} value={0} description="x1" />
            <Multiplier multiplier={multiplier} value={1} description="x2" />
            <Multiplier multiplier={multiplier} value={2} description="x3" />
            <Multiplier multiplier={multiplier} value={3} description="x4" />
          </ul>
        </div>
        <Circle title="Score:" value={score} />
      </div>
      <div className="select-wrapper">
        {gameBtn === 'не знаю' ? (
          <ButtonSpeak rightWord={rightWord} />
        ) : (
          <WordPicture rightWord={rightWord} />
        )}
      </div>

      <div className="audio-btn-select__wrapper">
        {wordsArr.map((elem, index) => (
          <ButtonSelect
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            description={elem.wordTranslate}
            bgColor={elem.status || ''}
            disabled={disable}
            onClick={() => handleButtonSelect(elem)}
          />
        ))}
      </div>
      <ButtonSelect
        description={gameBtn}
        bgColor="bg_red"
        disabled={false}
        onClick={continueGame}
      />
      <nav className="button-menu">
        <ButtonReset description="Level Reset" onClick={resetGame} />
      </nav>
    </div>
  );
};
