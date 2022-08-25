import { FC } from 'react';

export interface ICircle {
  title: string;
  value: string | number;
}

const Circle: FC<ICircle> = ({ title, value }) => {
  return (
    <div className="sprint-ui__circle user-select_none">
      {title}
      <br />
      {value}
    </div>
  );
};

export { Circle };
