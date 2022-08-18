import cn from 'classnames';

interface IPropsLogin {
  isShowLogin: boolean;
  handlerCloseLogin: () => void;
}

export function Login({ isShowLogin, handlerCloseLogin }: IPropsLogin) {
  return (
    <div className={cn('modal', { open: isShowLogin })}>
      <div className="modal__body">
        <div className="modal__content">
          <span className="modal__close close-modal" onClick={handlerCloseLogin}>
            X
          </span>
          <div className="modal__title">Login!</div>
          <input className="modal__input" type="text" placeholder="entry login" />
          <input className="modal__input" type="text" placeholder="entry password" />
          <div className="modal__buttons">
            <button className="modal__button">Login</button>
            <button className="modal__button">Register</button>
          </div>
        </div>
      </div>
    </div>
  );
}
