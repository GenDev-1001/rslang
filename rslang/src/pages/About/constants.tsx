import { MemberType } from './types';
import dzmitryK from '../../images/Dzmitry_Karakulka.jpg';
import gennadiyK from '../../images/Gennadiy_Konko.jpg';
import anastasiaC from '../../images/Anastasia_Chernova.jpg';
import githubImg from '../../images/github_link.svg';

export const membersArray: MemberType[] = [
  {
    img: gennadiyK,
    name: 'Gennadiy Konko',
    gitImg: githubImg,
    gitName: 'gendev-1001',
    link: 'https://github.com/gendev-1001',
    position: 'Team Lead',
    contribution:
      'Разработал архитектуру приложения и занимался организацией командной работы. Сделал страницу учебника, настроил аутентификацию и общую статистику игр.',
  },

  {
    img: dzmitryK,
    name: 'Dzmitry Karakulka',
    gitImg: githubImg,
    gitName: 'mitrofanzxc',
    link: `https://github.com/mitrofanzxc`,
    position: 'Developer',
    contribution:
      'Разработал игру Спринт, участвовал в разработке страницы статистики, отвечал за адаптивный режим приложения.',
  },

  {
    img: anastasiaC,
    name: 'Anastasia Chernova',
    gitImg: githubImg,
    gitName: 'shadowfox35',
    link: 'https://github.com/shadowfox35',
    position: 'Developer',
    contribution: 'Разработала игру Аудиовызов, сделала страницу "О нас".',
  },
];
