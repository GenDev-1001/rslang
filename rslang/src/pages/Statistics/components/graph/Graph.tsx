import addDays from 'date-fns/addDays';
import format from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';
import { FC } from 'react';
import { Chart } from 'react-google-charts';
import { useAppSelector } from '../../../../app/hooks';
import { selectStatistic } from '../../../../features';
import { IStatistic } from '../../../../features/statistic/statisticApiSlice.interface';
import './Graph.scss';

export const dataS = [
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
  data: IStatistic[];
}

const Graph: FC<IGraph> = ({ title, subtitle, data }) => {
  const options = {
    chart: {
      title,
      subtitle,
    },
  };

  const { statistics, learnedWords } = useAppSelector(selectStatistic);

  const getDataChart = (games: IStatistic[]) => {
    if (games.length === 0)
      return [
        ['День', '🚀'],
        [format(addDays(new Date(), -1), 'dd.MM.yyyy'), 0],
      ];

    const dataValues: any[] = [
      ['День', '🚀'],
      [format(addDays(new Date(), -1), 'dd.MM.yyyy'), 0],
    ];
    const gamesTotal = [];

    let currentDay = new Date(games[0].timeStart);
    const endDay = new Date(games[games.length - 1].timeStart);

    while (currentDay <= endDay) {
      // eslint-disable-next-line @typescript-eslint/no-loop-func
      const gamesPerDay = games.filter((game) => isSameDay(currentDay, new Date(game.timeStart)));
      gamesTotal.push(...gamesPerDay);
      dataValues.push([format(currentDay, 'dd.MM.yyyy'), learnedWords]);
      currentDay = addDays(currentDay, 1);
    }

    return dataValues;
  };

  return (
    <div className="graph-wrapper">
      <Chart
        chartType="Line"
        width="100%"
        height="400px"
        data={getDataChart(data)}
        options={options}
      />
    </div>
  );
};

export { Graph };
