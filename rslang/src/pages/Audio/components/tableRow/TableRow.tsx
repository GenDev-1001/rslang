import { FC } from 'react';
import { ButtonSpeak } from '../buttons';
import trueChoise from '../../../../images/true-choise.svg';

const TableRow: FC = () => {
  return (
    <tr className="table-row">
      <td>
        <ButtonSpeak />
      </td>
      <td>English</td>
      <td>[ˈɪŋglɪʃ]</td>
      <td>Английский</td>
      <td>
        <img src={trueChoise} alt="true" className="sprint-ui__circle sprint-ui__circle_small" />
      </td>
    </tr>
  );
};

export { TableRow };
