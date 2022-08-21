import { apiSlice } from '../../app/api/apiSlice';
import {
  ICreateUserRequest,
  ICreateUserResponse,
  IGetUserResponse,
  IUpdateUserRequest,
  IUpdateUserResponse,
} from './userSlice.interface';

const userApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ['User'] }).injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation<ICreateUserResponse, ICreateUserRequest>({
      query: (body) => ({
        url: 'users',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    getUser: builder.query<IGetUserResponse, string>({
      query: (id) => `users/${id}`,
      providesTags: ['User'],
    }),
    updateUser: builder.mutation<IUpdateUserResponse, IUpdateUserRequest>({
      query: ({ id, ...body }) => ({
        url: `users/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation<null, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useCreateUserMutation, useGetUserQuery } = userApiSlice;
