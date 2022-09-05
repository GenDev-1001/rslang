import { FC } from 'react';
import falseChoise from '../../../../images/false-choise.svg';
import trueChoise from '../../../../images/true-choise.svg';
import { ButtonSpeak } from '../buttons';

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
        <ButtonSpeak audioLink={audio} />
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
