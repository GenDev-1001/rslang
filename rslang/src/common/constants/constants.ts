import { UserWordStatus } from '../interfaces';

class Filter {
  private difficultyHard = `{"userWord.difficulty":"${UserWordStatus.HARD}"}`;

  private difficultyWork = `{"userWord.difficulty":"${UserWordStatus.WORK}"}`;

  private difficultyEasy = `{"userWord.difficulty":"${UserWordStatus.EASY}"}`;

  readonly count = `{"$or":[${this.difficultyWork},${this.difficultyHard}]}`;

  readonly active = `{"$or":[${this.difficultyWork},${this.difficultyHard},${this.difficultyEasy},{"userWord":null}]}`;

  dictionary(difficulty: UserWordStatus) {
    return `{"$or":[{"userWord.difficulty":"${difficulty}"}${
      difficulty === UserWordStatus.WORK ? `,${this.difficultyHard}` : ''
    }]}`;
  }
}

export const FILTER_PARAMS = new Filter();
