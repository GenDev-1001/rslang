import { FC } from 'react';
import { Chart } from 'react-google-charts';
import './Graph.scss';

export const data = [
  ['День', '🚀'],
  [`20.01.2022`, 1],
  [`21.01.2022`, 2],
  [`22.01.2022`, 3],
  [`23.01.2022`, 4],
  [`24.01.2022`, 5],
  [`25.01.2022`, 6],
  [`26.01.2022`, 7],
  [`27.01.2022`, 7],
  [`28.01.2022`, 6],
  [`29.01.2022`, 5],
  [`30.01.2022`, 4],
  [`31.01.2022`, 3],
  [`32.01.2022`, 2],
  [`33.01.2022`, 1],
];

export interface IGraph {
  title: string;
  subtitle: string;
}

const Graph: FC<IGraph> = ({ title, subtitle }) => {
  const options = {
    chart: {
      title,
      subtitle,
    },
  };

  return (
    <div className="graph-wrapper">
      <Chart chartType="Line" width="100%" height="400px" data={data} options={options} />
    </div>
  );
};

export { Graph };
