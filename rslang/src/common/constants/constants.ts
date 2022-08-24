import { UserWordStatus } from '../interfaces';

class Filter {
  private difficultyHard = `{"userWord.difficulty":"${UserWordStatus.HARD}"}`;

  private difficultyWork = `{"userWord.difficulty":"${UserWordStatus.WORK}"}`;

  private difficultyDelete = `{"userWord.difficulty":"${UserWordStatus.DELETE}"}`;

  readonly count = `{"$or":[${this.difficultyWork},${this.difficultyHard}]}`;

  readonly active = `{"$or":[${this.difficultyWork},${this.difficultyHard},${this.difficultyDelete},{"userWord":null}]}`;

  dictionary(difficulty: UserWordStatus) {
    return `{"$or":[{"userWord.difficulty":"${difficulty}"}${
      difficulty === UserWordStatus.WORK ? `,${this.difficultyHard}` : ''
    }]}`;
  }
}

export const FILTER_PARAMS = new Filter();
