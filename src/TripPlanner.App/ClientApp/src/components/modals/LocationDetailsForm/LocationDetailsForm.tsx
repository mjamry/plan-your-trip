import React from 'react';
import { useResetRecoilState } from 'recoil';
import ModalHeader from '../ModalHeader';

import { ModalDto } from '../../../Common/Dto/ModalDto';
import LocationDetailsFormBody from './LocationDetailsFormBody';
import LocationDetailsFooter from './LocationDetailsFormFooter';
import LocationDto from '../../../Common/Dto/LocationDto';
import { Nullable } from '../../../Common/Dto/Nullable';
import { locationFormDataState, locationFormErrorState, locationFormStepState } from './LocationDetailsFormState';

type BuilderDto = {
  title: string;
  location: LocationDto;
  onSubmit: (location: LocationDto, imageFile: Nullable<File>) => void;
  onCancel?: () => void;
}

const useLocationFormBuilder = () => {
  const resetLocationFormData = useResetRecoilState(locationFormDataState);
  const resetLocationFormStep = useResetRecoilState(locationFormStepState);
  const resetLocationFormError = useResetRecoilState(locationFormErrorState);

  const build = (data: BuilderDto): ModalDto => ({
    header: <ModalHeader title={data.title} />,
    body: <LocationDetailsFormBody location={data.location} />,
    footer: <LocationDetailsFooter onSubmit={data.onSubmit} />,
    onClose: () => {
      resetLocationFormStep();
      resetLocationFormData();
      resetLocationFormError();
    },
  });

  return build;
};

export default useLocationFormBuilder;
