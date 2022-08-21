import cn from 'classnames';
import { MdLogout } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../app/hooks';
import { logOut } from '../../features/auth/authSlice';
import { useAuth } from '../../hooks/useAuth';
import { IHeaderProps } from './Header.interface';
import './Header.scss';

export function Header({ isMain, handler }: IHeaderProps) {
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  const hendlerAuth = () => {
    if (user.token) {
      toast.success('User Logout Successfully');
      dispatch(logOut());
      return;
    }

    handler();
  };

  return (
    <header className={cn('header', { header_main: isMain })}>
      <div className="header__container">
        <div className="header__inner">
          <h1 className="logo">
            <Link to="/" className="logo-link">
              RSLang
            </Link>
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

            <li className="menu-list__item" onClick={hendlerAuth}>
              {user.token ? <MdLogout /> : <button className="menu-list__btn">Login</button>}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
