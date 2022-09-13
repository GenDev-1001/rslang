import React, { FC, useEffect, useState } from 'react';
import { UserWordStatus } from '../../../../common/interfaces';
import { IActivePaginatedResult } from '../../../../features/aggregaredWords/aggregaredWordsApiSlice.inteface';
import {
  useCreateUserWordMutation,
  useUpdateUserWordMutation,
} from '../../../../features/userWords/userWordsApiSlice';
import { IWordsResponse } from '../../../../features/words/wordsSlice.interface';
import { useAuth } from '../../../../hooks/useAuth';
import '../../Audio.scss';
import { IStatistics, keyCodesArr, wordsArrayFilds, WordsType } from '../../constants';
import { ButtonReset, ButtonSelect, ButtonSpeak } from '../buttons';
import { Circle } from '../circle/Circle';
import { Multiplier } from '../multiplier/Multiplier';
import { WordPicture } from './WordPicture';

export interface IGame {
  data: IWordsResponse[] | undefined | IActivePaginatedResult[];
  group: number;
  handleGameStatistics: ({
    id,
    audio,
    word,
    wordTranslate,
    transcription,
    result,
  }: IStatistics) => void;
  resetGame: () => void;
  handleTimeStartGame: () => void;
  handleTimeEndGame: () => void;
  handleIsEndGame: (value: boolean) => void;
  handleStatistic: (streak: number, score: number, timeStop: string) => void;
}

export const Game: FC<IGame> = ({
  data,
  group,
  handleGameStatistics,
  resetGame,
  handleIsEndGame,
  handleTimeStartGame,
  handleTimeEndGame,
  handleStatistic,
}) => {
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [multiplier, setMultiplier] = useState<number>(1);
  const [wordIndex, setWordIndex] = useState<number>(0);

  const [wordsArr, setWordsArr] = useState<WordsType[]>([]);
  const [checkWordsArr, setCheckWordsArr] = useState<WordsType[]>([]);
  const [rightWord, setRightWord] = useState<WordsType>(wordsArrayFilds);

  const [gameBtn, setGameBtn] = useState<string>('не знаю');
  const [disable, setDisable] = useState<boolean>(false);

  const { user } = useAuth();
  const [updateWord] = useUpdateUserWordMutation();
  const [createUserWord] = useCreateUserWordMutation();

  const playRightWordAudio = (wordSound?: string) => {
    if (rightWord) {
      const audio = new Audio(
        `https://rs-lang-team-84.herokuapp.com/${wordSound || rightWord.audio || ''}`,
      );
      audio.play();
    }
  };

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
    if (checkWordsArr.length === 20) {
      handleIsEndGame(true);
      handleTimeEndGame();
      handleStatistic(streak, score, new Date().toISOString());
      return;
    }
    if (array.length) {
      setRightWord(result);
      // playRightWordAudio(result.audio);
      const newCheckWordsArr = JSON.parse(JSON.stringify(checkWordsArr));
      newCheckWordsArr.push(result);
      setCheckWordsArr(newCheckWordsArr);

      playRightWordAudio(result.audio);
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
      handleTimeEndGame();
      handleStatistic(streak, score, new Date().toISOString());
    }
  };

  const countSreak = (
    id: string,
    audio: string,
    word: string,
    wordTranslate: string,
    transcription: string,
    result: boolean,
  ) => {
    if (!disable) {
      if (result) {
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

        handleGameStatistics({
          id,
          audio,
          word,
          wordTranslate,
          transcription,
          result,
        });
      } else {
        setStreak(0);
        setMultiplier(1);
        handleGameStatistics({ id, audio, word, wordTranslate, transcription, result });
      }
    }
  };

  const changeBtnStatus = (answer: boolean, selectedWord: WordsType | undefined) => {
    const wordsArrCopy = JSON.parse(JSON.stringify(wordsArr));
    const selectedIndex = wordsArrCopy.findIndex(
      (item: WordsType) => selectedWord && item.id === selectedWord.id,
    );
    let modWordsArr: WordsType[];

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

  const playAudio = (value: boolean) => {
    if (value) {
      const successSound = new Audio(`
        https://allsoundsaround.com/wp-content/uploads/2021/01/zvuk-otkryitiya-pravilnoy-stroki-na-tablo-v-teleshou-100-k-1-5511.mp3?_=1,
      `);
      successSound.play();
    } else {
      const errorSound = new Audio(`
      https://allsoundsaround.com/wp-content/uploads/2021/01/zvuk-nevernogo-otveta-v-peredache-sto-k-odnomu-5541.mp3?_=2,
      `);
      errorSound.play();
    }
  };

  const handleAccuracy = (value: boolean) => {
    let correctCountSprintValue = rightWord?.userWord
      ? rightWord?.userWord.optional.correctCountSprint
      : 0;
    let errorCountSprintValue = rightWord?.userWord
      ? rightWord?.userWord.optional.errorCountSprint
      : 0;
    const correctCountAudioValue = rightWord?.userWord
      ? rightWord?.userWord.optional.correctCountAudio
      : 0;
    const errorCountAudioValue = rightWord?.userWord
      ? rightWord?.userWord.optional.errorCountAudio
      : 0;

    const optional = {
      correctCountSprint: value ? (correctCountSprintValue += 1) : correctCountSprintValue,
      errorCountSprint: !value ? (errorCountSprintValue += 1) : errorCountSprintValue,
      correctCountAudio: correctCountAudioValue,
      errorCountAudio: errorCountAudioValue,
    };

    const wordRequest = {
      word: {
        difficulty:
          correctCountSprintValue >= 5 && errorCountSprintValue === 0
            ? UserWordStatus.EASY
            : UserWordStatus.HARD,
        optional,
      },
      wordId: rightWord.id,
      userId: user.userId || '',
    };

    if (rightWord?.userWord) {
      updateWord(wordRequest);
    } else {
      createUserWord(wordRequest);
    }
  };

  const checkAnswer = (selectedWord: WordsType | undefined) => {
    const result = !!selectedWord && rightWord.wordTranslate === selectedWord.wordTranslate;
    const id = data ? rightWord.id : '';
    const audio = data ? rightWord.audio : '';
    const word = data ? rightWord.word : '';
    const wordTranslate = data ? rightWord.wordTranslate : '';
    const transcription = data ? rightWord.transcription : '';

    countSreak(id, audio, word, wordTranslate, transcription, result);
    changeBtnStatus(result, selectedWord);
    playAudio(!!result);

    handleGameStatistics({
      id,
      audio,
      word,
      wordTranslate,
      transcription,
      result,
    });
    user.token && handleAccuracy(!!user.token);
  };

  const continueGame = () => {
    if (gameBtn === 'не знаю') {
      checkAnswer(undefined);
      setDisable(true);
      handleWordIndex();
      playRightWordAudio();
    } else {
      createWordsArray();
      setGameBtn('не знаю');
      setDisable(false);
    }
  };
  const handleButtonSelect = (selectedWord: WordsType) => {
    handleWordIndex();
    checkAnswer(selectedWord);
    setDisable(true);
  };

  const onKeydown = (event: KeyboardEventInit) => {
    event.preventDefault();
    const code: number = event.keyCode!;
    const enterCode = 13;
    const spaceCode = 32;

    if (code === spaceCode) {
      playRightWordAudio();
    }
    if (code === enterCode) {
      continueGame();
      return;
    }

    if (disable) {
      return;
    }

    if (wordsArr.length && code && keyCodesArr.includes(code)) {
      const keyValue = Number(event.key);
      handleButtonSelect(wordsArr[keyValue - 1]);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  }, [wordsArr]);

  useEffect(() => {
    createWordsArray();
    handleTimeStartGame();
  }, []);

  return (
    <div className="audio-frame">
      <div className="audio-ui">
        <Circle title="Level" value={`№${group + 1}`} />
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
          <ButtonSpeak audioLink={rightWord.audio} />
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
        onClick={() => continueGame()}
      />
      <nav className="button-menu">
        <ButtonReset description="Level Reset" onClick={resetGame} />
      </nav>
    </div>
  );
};
