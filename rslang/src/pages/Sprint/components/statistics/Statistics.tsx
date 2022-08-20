import { ButtonReset, ButtonSpeak } from '../buttons';
import trueChoise from '../../../../images/true-choise.svg';
import './Statistics.scss';

export interface IStatistics {
  endGame: () => void;
  resetLevel: () => void;
}

export function Statistics({ endGame, resetLevel }: IStatistics) {
  return (
    <>
      <div className="sprint-frame sprint-table__wrapper">
        <h2 className="sprint-frame__header">Statistics</h2>
        <table className="sprint-table">
          <tr className="table-row">
            <td>
              <ButtonSpeak />
            </td>
            <td>English</td>
            <td>{`[ˈɪŋglɪʃ]`}</td>
            <td>Английский</td>
            <td>
              <img
                src={trueChoise}
                alt="true"
                className="sprint-ui__circle sprint-ui__circle_small"
              />
            </td>
          </tr>
          <tr className="table-row">
            <td>
              <ButtonSpeak />
            </td>
            <td>English</td>
            <td>{`[ˈɪŋglɪʃ]`}</td>
            <td>Английский</td>
            <td>
              <img
                src={trueChoise}
                alt="true"
                className="sprint-ui__circle sprint-ui__circle_small"
              />
            </td>
          </tr>
          <tr className="table-row">
            <td>
              <ButtonSpeak />
            </td>
            <td>English</td>
            <td>{`[ˈɪŋglɪʃ]`}</td>
            <td>Английский</td>
            <td>
              <img
                src={trueChoise}
                alt="true"
                className="sprint-ui__circle sprint-ui__circle_small"
              />
            </td>
          </tr>
          <tr className="table-row">
            <td>
              <ButtonSpeak />
            </td>
            <td>English</td>
            <td>{`[ˈɪŋglɪʃ]`}</td>
            <td>Английский</td>
            <td>
              <img
                src={trueChoise}
                alt="true"
                className="sprint-ui__circle sprint-ui__circle_small"
              />
            </td>
          </tr>
          <tr className="table-row">
            <td>
              <ButtonSpeak />
            </td>
            <td>English</td>
            <td>{`[ˈɪŋglɪʃ]`}</td>
            <td>Английский</td>
            <td>
              <img
                src={trueChoise}
                alt="true"
                className="sprint-ui__circle sprint-ui__circle_small"
              />
            </td>
          </tr>
          <tr className="table-row">
            <td>
              <ButtonSpeak />
            </td>
            <td>English</td>
            <td>{`[ˈɪŋglɪʃ]`}</td>
            <td>Английский</td>
            <td>
              <img
                src={trueChoise}
                alt="true"
                className="sprint-ui__circle sprint-ui__circle_small"
              />
            </td>
          </tr>
          <tr className="table-row">
            <td>
              <ButtonSpeak />
            </td>
            <td>English</td>
            <td>{`[ˈɪŋglɪʃ]`}</td>
            <td>Английский</td>
            <td>
              <img
                src={trueChoise}
                alt="true"
                className="sprint-ui__circle sprint-ui__circle_small"
              />
            </td>
          </tr>
          <tr className="table-row">
            <td>
              <ButtonSpeak />
            </td>
            <td>English</td>
            <td>{`[ˈɪŋglɪʃ]`}</td>
            <td>Английский</td>
            <td>
              <img
                src={trueChoise}
                alt="true"
                className="sprint-ui__circle sprint-ui__circle_small"
              />
            </td>
          </tr>
          <tr className="table-row">
            <td>
              <ButtonSpeak />
            </td>
            <td>English</td>
            <td>{`[ˈɪŋglɪʃ]`}</td>
            <td>Английский</td>
            <td>
              <img
                src={trueChoise}
                alt="true"
                className="sprint-ui__circle sprint-ui__circle_small"
              />
            </td>
          </tr>
          <tr className="table-row">
            <td>
              <ButtonSpeak />
            </td>
            <td>English</td>
            <td>{`[ˈɪŋglɪʃ]`}</td>
            <td>Английский</td>
            <td>
              <img
                src={trueChoise}
                alt="true"
                className="sprint-ui__circle sprint-ui__circle_small"
              />
            </td>
          </tr>
        </table>
      </div>
      <nav className="button-menu">
        <ButtonReset description="Play Again" bgColor="bg_green" onClick={endGame} />
        <ButtonReset description="Level Reset" onClick={resetLevel} />
      </nav>
    </>
  );
}
