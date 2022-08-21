import { FC } from 'react';
import loading from '../../../../images/loading.gif';

const Loading: FC = () => {
  return (
    <div className="sprint-frame">
      <img src={loading} alt="loading" className="loading user-select_none" />
    </div>
  );
};

export { Loading };
