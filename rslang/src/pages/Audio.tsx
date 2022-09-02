import { FC } from 'react';

export interface IAudio {
  isGameOpenFromMenu: boolean;
}

const Audio: FC<IAudio> = ({ isGameOpenFromMenu }) => {
  return (
    <div className="container">
      <h2>Audio</h2>
    </div>
  );
};

export { Audio };
