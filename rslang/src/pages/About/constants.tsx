import { MemberType } from './types';
import dzmitryK from '../../images/Dzmitry_Karakulka.jpg';
import gennadiyK from '../../images/Gennadiy_Konko.jpg';
import anastasiaC from '../../images/Anastasia_Chernova.jpg';
import githubImg from '../../images/github_link.svg';

export const membersArray: MemberType[] = [
  {
    img: dzmitryK,
    name: 'Dzmitry Karakulka',
    gitImg: githubImg,
    gitName: 'mitrofanzxc',
    link: `https://github.com/mitrofanzxc`,
    position: 'Team Lead',
    contribution: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis.',
  },

  {
    img: gennadiyK,
    name: 'Gennadiy Konko',
    gitImg: githubImg,
    gitName: 'gendev-1001',
    link: 'https://github.com/gendev-1001',
    position: 'Developer',
    contribution: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis.',
  },

  {
    img: anastasiaC,
    name: 'Anastasia Chernova',
    gitImg: githubImg,
    gitName: 'shadowfox35',
    link: 'https://github.com/shadowfox35',
    position: 'Developer',
    contribution: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis.',
  },
];
