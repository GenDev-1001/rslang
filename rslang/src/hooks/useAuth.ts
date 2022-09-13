import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { safeParse } from '../common/utils/safeParse';
import { selectAuth, setUser } from '../features/auth/authSlice';
import { IAuthPayload } from '../features/auth/authSlice.inteface';

export const useAuth = () => {
  const user = safeParse<IAuthPayload>(localStorage.getItem('user') || 'null');
  const { newAccount, ...userSelected } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user && userSelected.token === null) {
      dispatch(setUser(user));
    }
  }, [dispatch]);

  return { auth: !!user || !!userSelected.token, user: user || userSelected };
};
