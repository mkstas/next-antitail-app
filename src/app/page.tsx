import { UiLink, UiLogo, UiSheet } from '@/components';
import { ROUTES } from '@/shared/routes';
import { FormLoginUser } from '@/features/form-login-user';
import { AuthProvider } from '@/shared/providers';

export default function Index() {
  return (
    <AuthProvider>
      <div className='mx-auto max-w-sm space-y-8 py-32'>
        <UiLogo className='mx-auto' />
        <UiSheet>
          <div className='space-y-8'>
            <h1 className='text-center text-xl font-semibold'>Вход в аккаунт</h1>
            <FormLoginUser />
            <div className='text-center'>
              <span>Нет аккаунта? </span>
              <UiLink href={ROUTES.REGISTER}>Зарегистрироваться</UiLink>
            </div>
          </div>
        </UiSheet>
      </div>
    </AuthProvider>
  );
}
