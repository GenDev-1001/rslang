import { Footer } from '../../components/Footer/Footer';
import { membersArray } from './constants';
import Member from './Member';
import './style.scss';
import { MemberType } from './types';

export const About: React.FC = () => {
  return (
    <>
      <div className="aboutUs-container">
        <h2 className="title">Над проектом работали:</h2>
        <div className="team">
          {membersArray.map((member: MemberType, index: number) => (
            // eslint-disable-next-line react/no-array-index-key
            <Member key={index} member={member} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};
