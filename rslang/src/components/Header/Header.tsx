import cn from 'classnames';
import { useState } from 'react';
import { MdLogout } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../app/hooks';
import { logOut } from '../../features/auth/authSlice';
import { resetStatistics } from '../../features/statistic/statisticSlice';
import { useAuth } from '../../hooks/useAuth';
import { IHeaderProps } from './Header.interface';
import './Header.scss';

export function Header({ isMain, handler, handleGameOpenFromMenu }: IHeaderProps) {
  const [isBurger, setIsBurger] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  const handlerClickBurger = (prev: boolean) => {
    isBurger ? setIsBurger(!prev) : setIsBurger(prev);
  };

  const hendlerAuth = () => {
    setIsBurger(false);
    if (user.token) {
      toast.success('User Logout Successfully');
      dispatch(logOut());

      dispatch(resetStatistics());
      return;
    }
    dispatch(resetStatistics());
    handler();
  };

  const handlerLink = () => {
    setIsBurger(false);
    handleGameOpenFromMenu(true);
  };

  return (
    <header className={cn('header', { header_main: isMain })}>
      <div className="header__container">
        <div className="header__inner">
          <h1 className="logo">
            <Link to="/" className="logo-link" onClick={() => setIsBurger(false)}>
              RSLang
            </Link>
          </h1>
          <div
            className={cn('header__menu-btn', { active: isBurger })}
            onClick={() => handlerClickBurger(true)}>
            <span className="header__menu-span" />
          </div>
          <ul className={cn('menu-list', { active: isBurger })}>
            <li className="menu-list__item">
              <Link to="/dictionary" className="menu-list__link" onClick={() => setIsBurger(false)}>
                Учебник
              </Link>
            </li>
            <li className="menu-list__item">
              <Link to="/audio" className="menu-list__link" onClick={handlerLink}>
                Аудиовызов
              </Link>
            </li>
            <li className="menu-list__item">
              <Link to="/sprint" className="menu-list__link" onClick={handlerLink}>
                Спринт
              </Link>
            </li>
            <li className="menu-list__item">
              <Link to="/statistics" className="menu-list__link" onClick={() => setIsBurger(false)}>
                Статистика
              </Link>
            </li>
            <li className="menu-list__item">
              <Link to="/about" className="menu-list__link" onClick={() => setIsBurger(false)}>
                О нас
              </Link>
            </li>

            <li className="menu-list__item" onClick={hendlerAuth}>
              {user.token ? (
                <MdLogout className="menu-list__exit" />
              ) : (
                <button className="menu-list__btn">Login</button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
