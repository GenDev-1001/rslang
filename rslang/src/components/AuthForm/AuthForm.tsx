import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../app/hooks';

import { useAuthMutation } from '../../features/auth/authApiSlice';
import { newUser, setUser } from '../../features/auth/authSlice';
import { useCreateUserMutation } from '../../features/user/userApiSlice';
import Input from '../Input/Input';
import { IAuthForm, IAuthFormProps } from './AuthForm.interface';

function AuthForm({ isRegister, handleLogin, navigate, hideModal }: IAuthFormProps) {
  const {
    formState: { errors },
    handleSubmit,
    clearErrors,
    register,
    reset,
  } = useForm<IAuthForm>();

  const [createUser] = useCreateUserMutation();
  const [loginUser] = useAuthMutation();
  // const [setStatistic] = usePutStatisticMutation();
  // const [setSettings] = usePutSettingsMutation();
  const dispatch = useAppDispatch();

  const createNewUser = useCallback(async (formData: IAuthForm) => {
    await createUser(formData)
      .unwrap()
      .then((data) => {
        toast.success('User Register Successfully');
        dispatch(newUser(data.id));
        reset();
        handleLogin();
      })
      .catch((err) => {
        toast.error('Wrong registration data');
      });
  }, []);

  const loginUserHandler = useCallback(async ({ name, ...rest }: IAuthForm) => {
    await loginUser(rest)
      .unwrap()
      .then(({ message, ...user }) => {
        toast.success('User Login Successfully');
        // const newUserId = checkNewRegister();
        hideModal();
        dispatch(setUser(user));
        navigate();

        // if (newUserId) {
        //   setStatistic({ userId: user.userId, statistic });
        //   setSettings({ userId: user.userId, settings });
        // }
      })
      .catch((err) => {
        toast.error('Invalid email or password');
      });
  }, []);

  const onSubmit = async (formData: IAuthForm): Promise<void> => {
    if (isRegister) {
      createNewUser(formData);
    } else {
      loginUserHandler(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isRegister && (
        <Input
          {...register('name', {
            required: { value: true, message: 'Name is required' },
            minLength: {
              value: 2,
              message: 'Name must be at least 2 characters',
            },
          })}
          error={errors.name}
          className="modal__input"
          placeholder="entry name"
        />
      )}

      <Input
        {...register('email', {
          required: { value: true, message: 'Email is required' },
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'Please enter a valid email address',
          },
        })}
        error={errors.email}
        className="modal__input"
        placeholder="entry email"
      />

      <Input
        {...register('password', {
          required: { value: true, message: 'Password is required' },
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters',
          },
        })}
        autoComplete="on"
        error={errors.password}
        className="modal__input"
        type="password"
        placeholder="entry password"
      />

      <button className="modal__button" onClick={() => clearErrors()}>
        {!isRegister ? 'Login' : 'Register'}
      </button>
    </form>
  );
}

export default AuthForm;
