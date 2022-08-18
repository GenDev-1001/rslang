import { useState } from 'react';
import { Header } from '../components/Header';
import { Login } from '../components/Login';
import { mainPage } from '../images';

export function Main() {
  const [isShowLogin, setIsShowLogin] = useState(false);

  return (
    <div className="main-wrapper">
      <Header />
      <div className="container">
        <div className="main-page">
          <div className="main-page__block">
            <h6 className="main-page__subtitle">Learning english</h6>
            <h1 className="main-page__title">Welcome to our Application</h1>
            <p className="main-page__text">
              This application was created: &ensp;
              <a className="main-page__text-link" href="https://github.com/mitrofanzxc">
                Dzmitry Karakulka
              </a>
              &ensp;
              <a className="main-page__text-link" href="https://github.com/GenDev-1001">
                Gennadiy Konko
              </a>
              &ensp;
              <a className="main-page__text-link" href="https://github.com/ShadowFox35">
                Anastasia Chernova
              </a>
              &ensp;
            </p>
            <button className="main-page__button" onClick={() => setIsShowLogin(true)}>
              Login
            </button>
          </div>
          <img className="main-page__img" src={mainPage} alt="main img" />
        </div>
        <Login isShowLogin={isShowLogin} handlerCloseLogin={() => setIsShowLogin(false)} />
      </div>
    </div>
  );
}
