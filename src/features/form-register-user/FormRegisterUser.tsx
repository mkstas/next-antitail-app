'use client';

import { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/shared/routes';
import { UiButton, UiForm, UiInput } from '@/components';
import { AuthData, useRegisterUserMutation } from '@/entities/users';

export const FormRegisterUser: FC = () => {
  const { control, formState, handleSubmit, setError } = useForm<AuthData>({ mode: 'onChange' });
  const [registerUser, { isLoading, isSuccess, isError }] = useRegisterUserMutation();

  useEffect(() => {
    if (isSuccess) {
      redirect(ROUTES.DASHBOARD);
    }
    if (!isLoading && isError) {
      setError('email', { message: 'Электронная почта уже занята' });
    }
  }, [isSuccess, isLoading, isError, setError]);

  return (
    <UiForm onSubmit={handleSubmit(formData => registerUser(formData))}>
      <Controller
        control={control}
        name='email'
        defaultValue=''
        rules={{
          required: 'Это поле обязательно',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: 'Неверный формат почты',
          },
        }}
        render={({ field }) => (
          <UiInput
            type='text'
            id='email'
            label='Электронная почта'
            placeholder='example@mail.ru'
            variant='lg'
            error={formState.errors.email?.message}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name='password'
        defaultValue=''
        rules={{
          required: 'Это поле обязательно',
          minLength: {
            value: 8,
            message: 'Не менее 8 символов',
          },
        }}
        render={({ field }) => (
          <UiInput
            type='password'
            id='password'
            label='Пароль'
            placeholder='••••••••'
            variant='lg'
            error={formState.errors.password?.message}
            {...field}
          />
        )}
      />
      <UiButton variant='lg' disabled={isLoading}>
        Зарегистрироваться
      </UiButton>
    </UiForm>
  );
};
