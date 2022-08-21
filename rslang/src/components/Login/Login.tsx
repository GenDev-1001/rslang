import cn from 'classnames';
import { useState } from 'react';
import AuthForm from '../AuthForm/AuthForm';
import './Login.scss';

interface IPropsLogin {
  isShowLogin: boolean;
  handler: () => void;
}

export function Login({ isShowLogin, handler }: IPropsLogin) {
  const [showRegister, setShowRegister] = useState<boolean>(false);

  const navigatePage = () => {};

  return (
    <div className={cn('modal', { open: isShowLogin })}>
      <div className="modal__body">
        <div className="modal__content">
          <span className="modal__close close-modal" onClick={handler}>
            X
          </span>

          <div className="modal__title">{!showRegister ? 'Login!' : 'Register'} </div>
          <p>
            {!showRegister ? 'Please enter your Email & Password' : 'Please enter your User detail'}
          </p>
          <AuthForm
            isRegister={showRegister}
            handleLogin={() => setShowRegister(false)}
            navigate={navigatePage}
            hideModal={handler}
          />

          <h5>
            {!showRegister ? (
              <>
                Dont&rsquo;t have an account ? <p onClick={() => setShowRegister(true)}>Sign Up</p>
              </>
            ) : (
              <>
                Alredy have an account ? <p onClick={() => setShowRegister(false)}>Sign In</p>
              </>
            )}
          </h5>
        </div>
      </div>
    </div>
  );
}
