'use client';

import { FC, useState } from 'react';
import { Pacifico } from 'next/font/google';
import { redirect } from 'next/navigation';
import { BellIcon, UserIcon } from '@heroicons/react/24/solid';
import { cn } from '@/shared/utils/cn';
import { UiSheet, UiButton } from '@/shared/ui-kit';
import { useAppDispatch } from '@/shared/store';
import { api } from '@/shared/store/api';
import { ROUTES } from '@/shared/routes';
import { useLogoutUserMutation } from '@/entities/users';

const pacifico = Pacifico({ weight: '400' });

export const TheHeader: FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [logoutUser] = useLogoutUserMutation();

  const onClickExit = async () => {
    await logoutUser();
    dispatch(api.util.resetApiState());
    redirect(ROUTES.AUTH_LOGIN);
  };

  return (
    <header className='relative flex items-center justify-between rounded-b-2xl bg-white p-4'>
      <span className={cn('font-semibold', pacifico.className)}>АнтиХвост</span>
      <div className='flex items-center gap-3'>
        <button className='group cursor-pointer p-2'>
          <BellIcon className='group-hover:text-custom-blue size-4 text-slate-500 transition-colors' />
        </button>
        <button onClick={() => setIsOpenModal(!isOpenModal)} className='group cursor-pointer p-2'>
          <UserIcon className='group-hover:text-custom-blue size-4 text-slate-500 transition-colors' />
        </button>
        {isOpenModal && (
          <div className='absolute top-20 right-0 w-full max-w-52'>
            <UiSheet>
              <div className='grid'>
                <UiButton onClick={onClickExit}>Выйти</UiButton>
              </div>
            </UiSheet>
          </div>
        )}
      </div>
    </header>
  );
};
