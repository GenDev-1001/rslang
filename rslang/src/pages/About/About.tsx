import { Header } from '../../components/Header';
import Member from './Member';
import { membersArray } from './constants';
import { memberType } from './types';
import './style.scss';

export const About: React.FC = () => {
  return (
    <>
      <Header />
      <div className="container">
        <h2 className="title">Над проектом работали:</h2>
        <div className="team">
          {membersArray.map((member: memberType, index: number) => (
            <Member key={index} member={member} />
          ))}
        </div>
      </div>
    </>
  );
};
