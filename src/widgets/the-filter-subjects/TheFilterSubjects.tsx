'use client';

import { FC, useState } from 'react';
import { useOpenModal } from '@/shared/utils';
import { UiDelimiter, UiSheet } from '@/components';
import { Subject, useFindSubjectsQuery } from '@/entities/subjects';
import { OpenCreateFilter } from '@/features/open-create-filter';
import { SelectFilterItem, SelectFilterItemSkeleton } from '@/features/select-filter-item';
import { ResetFilterItem } from '@/features/reset-filter-item';
import { CreateSubjectModal } from '@/features/create-subject-modal';
import { OpenUpdateFilter } from '@/features/open-update-filter';
import { UpdateSubjectModal } from '@/features/update-subject-modal';

export const TheFilterSubjects: FC = () => {
  const { data: subjects, isLoading, isSuccess } = useFindSubjectsQuery();

  const [currentSubject, setCurrentSubject] = useState<Subject>({ subjectId: 0, title: '' });

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

  const onOpenModalUpdate = (subject: Subject) => {
    setCurrentSubject(() => subject);
    openModalUpdate();
  };

  return (
    <UiSheet>
      <section className='space-y-2'>
        <h2 className='text-lg font-medium'>Учебные дисциплины</h2>
        <div className='space-y-1'>
          {isLoading &&
            Array(3)
              .fill(0)
              .map((_, index) => <SelectFilterItemSkeleton key={index} />)}
          {!isLoading && isSuccess && (
            <ul className='space-y-1'>
              {subjects?.map(subject => (
                <li key={subject.subjectId} className='flex space-x-2'>
                  <SelectFilterItem filterName='subject' title={subject.title} />
                  <OpenUpdateFilter onClickButton={() => onOpenModalUpdate(subject)} />
                </li>
              ))}
            </ul>
          )}
          {!isLoading && (
            <>
              <div>
                <OpenCreateFilter onClickButton={openModalCreate} />
                {isOpenModalCreate && <CreateSubjectModal closeModal={closeModalCreate} />}
              </div>
              {isOpenModalUpdate && <UpdateSubjectModal subject={currentSubject} closeModal={closeModalUpdate} />}
            </>
          )}
        </div>
        <UiDelimiter />
        <ResetFilterItem filterName='subject' />
      </section>
    </UiSheet>
  );
};
