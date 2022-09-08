import { useState } from 'react';
import { Login } from '../../components/Login/Login';
import { useAuth } from '../../hooks/useAuth';
import { Footer } from '../../components/Footer/Footer';
import { mainPage } from '../../images';
import './Main.scss';

export function Main() {
  const [isShowLogin, setIsShowLogin] = useState(false);
  const { user } = useAuth();

  return (
    <>
      <div className="main-wrapper">
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
              <p className="main-page__text">
                Learning English has never been so easy. Thanks to our app, you can practice your
                English every day with Sprint and Audio Call games. You also have a dictionary at
                your disposal in which you can track your progress. And thanks to Statistics, you
                can see the accuracy of your correct answers.
              </p>
              {!user.token && (
                <button className="main-page__button" onClick={() => setIsShowLogin(true)}>
                  Login
                </button>
              )}
            </div>
            <img className="main-page__img" src={mainPage} alt="main img" />
          </div>
          <Login isShowLogin={isShowLogin} handler={() => setIsShowLogin(false)} />
        </div>
      </div>
      <Footer />
    </>
  );
}
