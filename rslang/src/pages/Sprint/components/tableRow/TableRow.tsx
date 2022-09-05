import { FC } from 'react';
import { ButtonSpeak } from '../buttons';
import { ITableRow } from './TableRow.interface';
import trueChoise from '../../../../images/true-choise.svg';
import falseChoise from '../../../../images/false-choise.svg';

const TableRow: FC<ITableRow> = ({ audio, word, wordTranslate, transcription, result }) => {
  return (
    <tr className="table-row">
      <td>
        <ButtonSpeak audio={audio} />
      </td>
      <td>{word}</td>
      <td>{transcription}</td>
      <td>{wordTranslate}</td>
      <td>
        <img
          src={result ? trueChoise : falseChoise}
          alt="true"
          className="sprint-ui__circle sprint-ui__circle_small"
        />
      </td>
    </tr>
  );
};

export { TableRow };
