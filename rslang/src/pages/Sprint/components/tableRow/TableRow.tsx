import { ButtonSpeak } from '../buttons';
import trueChoise from '../../../../images/true-choise.svg';

export function TableRow() {
  return (
    <tr className="table-row">
      <td>
        <ButtonSpeak />
      </td>
      <td>English</td>
      <td>{`[ˈɪŋglɪʃ]`}</td>
      <td>Английский</td>
      <td>
        <img src={trueChoise} alt="true" className="sprint-ui__circle sprint-ui__circle_small" />
      </td>
    </tr>
  );
}
