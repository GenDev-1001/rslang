import { rsImg } from '../../images';
import './Footer.scss';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__inner">
          <div className="footer__data">
            <p className="footer__data-text">
              <span className="footer__data-copy">©2022&nbsp;</span>
              <div className="footer__data-links">
                <a className="footer__data-link" href="https://github.com/mitrofanzxc">
                  Dzmitry Karakulka
                </a>
                &ensp;
                <a className="footer__data-link" href="https://github.com/GenDev-1001">
                  Gennadiy Konko
                </a>
                &ensp;
                <a className="footer__data-link" href="https://github.com/ShadowFox35">
                  Anastasia Chernova
                </a>
              </div>
            </p>
          </div>
          <a className="footer__link" href="https://rs.school/js/">
            <img className="footer__img" src={rsImg} alt="footer" />
          </a>
        </div>
      </div>
    </footer>
  );
}
