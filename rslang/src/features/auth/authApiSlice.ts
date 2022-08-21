import { apiSlice } from '../../app/api/apiSlice';
import { ISighInResponse, ISignInRequest } from './authSlice.inteface';

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    auth: builder.mutation<ISighInResponse, ISignInRequest>({
      query: (body) => ({
        url: 'signin',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useAuthMutation } = authApiSlice;
