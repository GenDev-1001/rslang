import { FC, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from '../components/Header/Header';
import { Login } from '../components/Login/Login';

export interface ILayout {
  handleGameOpenFromMenu: (value: boolean) => void;
}

const Layout: FC<ILayout> = ({ handleGameOpenFromMenu }) => {
  const [isShowLogin, setIsShowLogin] = useState<boolean>(false);
  const location = useLocation();

  return (
    <>
      <Header
        isMain={location.pathname === '/'}
        handler={() => setIsShowLogin((prev) => !prev)}
        handleGameOpenFromMenu={handleGameOpenFromMenu}
      />
      <main className="main">
        <Outlet />
        <Login isShowLogin={isShowLogin} handler={() => setIsShowLogin(false)} />
        <ToastContainer autoClose={2000} />
      </main>
    </>
  );
};

export { Layout };
