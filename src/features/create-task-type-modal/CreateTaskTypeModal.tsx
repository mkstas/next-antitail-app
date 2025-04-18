'use client';

import { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { UiModal, UiForm, UiInput, UiButton } from '@/components';
import { useCreateTaskTypeMutation, TaskTypeCreateData } from '@/entities/task-types';

interface Props {
  closeModal: () => void;
}

export const CreateTaskTypeModal: FC<Props> = ({ closeModal }) => {
  const { control, formState, handleSubmit } = useForm<TaskTypeCreateData>({ mode: 'onChange' });
  const [createTaskType, { isSuccess }] = useCreateTaskTypeMutation();

  useEffect(() => {
    if (isSuccess) {
      closeModal();
    }
  }, [isSuccess, closeModal]);

  return (
    <UiModal title='Добавление типа работы' overlayId='modalOverlay' closeButtonId='modalCloseButton'>
      <UiForm onSubmit={handleSubmit(formData => createTaskType(formData))}>
        <Controller
          control={control}
          name='title'
          defaultValue=''
          rules={{
            required: 'Это поле обязательно',
          }}
          render={({ field }) => (
            <UiInput
              type='text'
              id='title'
              label='Тип работы'
              placeholder='Лабораторная работа'
              error={formState.errors.title?.message}
              {...field}
            />
          )}
        />
        <div className='ml-auto'>
          <UiButton>Добавить</UiButton>
        </div>
      </UiForm>
    </UiModal>
  );
};
