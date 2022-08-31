import { FC } from 'react';
import { ButtonSpeak } from '../buttons';
import trueChoise from '../../../../images/true-choise.svg';
import falseChoise from '../../../../images/false-choise.svg';

export interface ITableRow {
  word: string;
  audio: string;
  transcription: string;
  wordTranslate: string;
  result: boolean;
}

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
