import Member from './Member';
import { membersArray } from './constants';
import { MemberType } from './types';
import './style.scss';

export const About: React.FC = () => {
  return (
    <div className="container">
      <h2 className="title">Над проектом работали:</h2>
      <div className="team">
        {membersArray.map((member: MemberType, index: number) => (
          // eslint-disable-next-line react/no-array-index-key
          <Member key={index} member={member} />
        ))}
      </div>
    </div>
  );
};
