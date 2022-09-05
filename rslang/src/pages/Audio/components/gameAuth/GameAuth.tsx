import { FC, useEffect, useRef, useState } from 'react';
import { UserWordStatus } from '../../../../common/interfaces';
import {
  useCreateUserWordMutation,
  useUpdateUserWordMutation,
} from '../../../../features/userWords/userWordsApiSlice';
import { useAuth } from '../../../../hooks/useAuth';
import '../../Audio.scss';
import { keyCodesArr, wordsArrayFilds, WordsType } from '../../constants';
import { ButtonReset, ButtonSelect, ButtonSpeak } from '../buttons';
import { Circle, WordPicture, Multiplier } from '..';
import { IGameAuth } from './GameAuth.interface';

export const GameAuth: FC<IGameAuth> = ({
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
  const [randomWord, setRandomWord] = useState<WordsType>(wordsArrayFilds);

  const [gameBtn, setGameBtn] = useState<string>('не знаю');
  const [sound, setSound] = useState<string>('');
  const [disable, setDisable] = useState<boolean>(false);
  const [skip, setSkip] = useState<boolean>(false);
  const prevBtn = useRef(null);

  const { user } = useAuth();

  const [updateWord] = useUpdateUserWordMutation();
  const [createUserWord] = useCreateUserWordMutation();

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
      handleTimeEndGame();
      handleStatistic(streak, score, new Date().toISOString());
    }
  };

  const handleAccuracy = (value: boolean) => {
    const word = data![wordIndex];

    const correctCountSprintValue = word?.userWord ? word?.userWord.optional.correctCountSprint : 0;
    const errorCountSprintValue = word?.userWord ? word?.userWord.optional.errorCountSprint : 0;
    let correctCountAudioValue = word?.userWord ? word?.userWord.optional.correctCountAudio : 0;
    let errorCountAudioValue = word?.userWord ? word?.userWord.optional.errorCountAudio : 0;

    const optional = {
      correctCountSprint: correctCountSprintValue,
      errorCountSprint: errorCountSprintValue,
      correctCountAudio: value ? (correctCountAudioValue += 1) : correctCountAudioValue,
      errorCountAudio: !value ? (errorCountAudioValue += 1) : errorCountAudioValue,
    };

    const wordRequest = {
      word: {
        difficulty:
          correctCountAudioValue >= 5 && correctCountAudioValue === 0
            ? UserWordStatus.EASY
            : UserWordStatus.HARD,
        optional,
      },
      wordId: word.id,
      userId: user.userId || '',
    };

    if (word?.userWord) {
      updateWord(wordRequest);
    } else {
      createUserWord(wordRequest);
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

        if (user.token) {
          handleAccuracy(true);
        }

        handleGameStatistics({
          id,
          audio,
          word,
          wordTranslate,
          transcription,
          result,
        });
      } else {
        if (user.token) {
          handleAccuracy(false);
        }
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

  // const playSound = (answer: boolean) => {
  //   const sountP = new Audio(success);
  //   sountP.play();
  // };

  const checkAnswer = (selectedWord: WordsType | undefined) => {
    const result = !!selectedWord && rightWord.wordTranslate === selectedWord.wordTranslate;
    const id = data ? rightWord.id : '';
    const audio = data ? rightWord.audio : '';
    const word = data ? rightWord.word : '';
    const wordTranslate = data ? rightWord.wordTranslate : '';
    const transcription = data ? rightWord.transcription : '';

    countSreak(id, audio, word, wordTranslate, transcription, result);
    changeBtnStatus(result, selectedWord);
    // playSound(answer);

    handleGameStatistics({
      id,
      audio,
      word,
      wordTranslate,
      transcription,
      result,
    });
  };
  const continueGame = () => {
    if (gameBtn === 'не знаю') {
      checkAnswer(undefined);
      setDisable(true);
      handleWordIndex();
    } else {
      createWordsArray();
      setGameBtn('не знаю');
      setDisable(false);
    }
  };
  const handleButtonSelect = (selectedWord: WordsType) => {
    handleWordIndex();
    setRandomWord(selectedWord);
    checkAnswer(selectedWord);
    setDisable(true);
  };

  const onKeydown = (event: KeyboardEventInit) => {
    const code: number | undefined = event.keyCode;
    if (!skip && wordsArr.length && code && keyCodesArr.includes(code)) {
      const keyValue = Number(event.key);
      handleButtonSelect(wordsArr[keyValue - 1]);
      setSkip(true);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onKeydown);
    return () => window.addEventListener('keydown  ', onKeydown);
  }, [skip, wordsArr]);
  useEffect(() => {
    createWordsArray();
    handleTimeStartGame();
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
        onClick={continueGame}
      />
      <nav className="button-menu">
        <ButtonReset description="Level Reset" onClick={resetGame} />
      </nav>
    </div>
  );
};
