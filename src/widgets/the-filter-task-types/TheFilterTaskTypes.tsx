'use client';

import { FC, useState } from 'react';
import { useOpenModal } from '@/shared/utils';
import { UiDelimiter, UiSheet } from '@/components';
import { TaskType, useFindTaskTypesQuery } from '@/entities/task-types';
import { OpenCreateFilter } from '@/features/open-create-filter';
import { SelectFilterItem, SelectFilterItemSkeleton } from '@/features/select-filter-item';
import { ResetFilterItem } from '@/features/reset-filter-item';
import { CreateTaskTypeModal } from '@/features/create-task-type-modal';
import { UpdateTaskTypeModal } from '@/features/update-task-type-modal';
import { OpenUpdateFilter } from '@/features/open-update-filter';

export const TheFilterTaskTypes: FC = () => {
  const { data: taskTypes, isLoading, isSuccess } = useFindTaskTypesQuery();

  const [currentTaskType, setCurrentTaskType] = useState<TaskType>({ taskTypeId: 0, title: '' });

  const {
    isOpenModal: isOpenModalCreate,
    openModal: openModalCreate,
    closeModal: closeModalCreate,
  } = useOpenModal('modalOverlay', 'modalCloseButton');

  const {
    isOpenModal: isOpenModalUpdate,
    openModal: openModalUpdate,
    closeModal: closeModalUpdate,
  } = useOpenModal('modalOverlay', 'modalCloseButton');

  const onOpenModalUpdate = (taskType: TaskType) => {
    setCurrentTaskType(() => taskType);
    openModalUpdate();
  };

  return (
    <UiSheet>
      <section className='space-y-2'>
        <h2 className='text-lg font-medium'>Типы работ</h2>
        <div className='space-y-1'>
          {isLoading &&
            Array(3)
              .fill(0)
              .map((_, index) => <SelectFilterItemSkeleton key={index} />)}
          {!isLoading && isSuccess && (
            <ul className='space-y-1'>
              {taskTypes?.map(taskType => (
                <li key={taskType.taskTypeId} className='flex space-x-2'>
                  <SelectFilterItem filterName='taskType' title={taskType.title} />
                  <OpenUpdateFilter onClickButton={() => onOpenModalUpdate(taskType)} />
                </li>
              ))}
            </ul>
          )}
          {!isLoading && (
            <>
              <div>
                <OpenCreateFilter onClickButton={openModalCreate} />
                {isOpenModalCreate && <CreateTaskTypeModal closeModal={closeModalCreate} />}
              </div>
              {isOpenModalUpdate && <UpdateTaskTypeModal taskType={currentTaskType} closeModal={closeModalUpdate} />}
            </>
          )}
        </div>
        <UiDelimiter />
        <ResetFilterItem filterName='taskType' />
      </section>
    </UiSheet>
  );
};
