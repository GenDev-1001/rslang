import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__inner">
          <h1 className="logo">
            <a href="#" className="logo-link">
              RSLang
            </a>
          </h1>
          <ul className="menu-list">
            <li className="menu-list__item">
              <Link to="/dictionary" className="menu-list__link">
                Учебник
              </Link>
            </li>
            <li className="menu-list__item">
              <Link to="/audio" className="menu-list__link">
                Аудиовызов
              </Link>
            </li>
            <li className="menu-list__item">
              <Link to="/sprint" className="menu-list__link">
                Спринт
              </Link>
            </li>
            <li className="menu-list__item">
              <Link to="/statistics" className="menu-list__link">
                Статистика
              </Link>
            </li>
            <li className="menu-list__item">
              <Link to="/about" className="menu-list__link">
                О нас
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
