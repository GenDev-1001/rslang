import { FC } from 'react';
import { IMultiplier } from './Multiplier.interface';

const Multiplier: FC<IMultiplier> = ({ multiplier, value, description }) => {
  return (
    <li className="sprint-ui__circle sprint-ui__circle_small">
      <span className={`opacity_zero ${multiplier > value ? 'opacity_one' : ''}`}>
        {description}
      </span>
    </li>
  );
};

export { Multiplier };
