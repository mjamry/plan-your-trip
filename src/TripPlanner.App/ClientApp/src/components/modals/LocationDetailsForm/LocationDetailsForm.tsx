import React from 'react';
import ModalHeader from '../ModalHeader';

import { ModalDto } from '../../../Common/Dto/ModalDto';
import LocationDetailsFormBody from './LocationDetailsFormBody';
import LocationDetailsFooter from './LocationDetailsFormFooter';
import LocationDto from '../../../Common/Dto/LocationDto';

type BuilderDto = {
  title: string;
  location: LocationDto;
  onSubmit: (location: LocationDto) => void;
  onCancel?: () => void;
}

const useLocationFormBuilder = () => {
  const build = (data: BuilderDto): ModalDto => ({
    header: <ModalHeader title={data.title} />,
    body: <LocationDetailsFormBody location={data.location} />,
    footer: <LocationDetailsFooter onSubmit={data.onSubmit} />,
  });

  return build;
};

export default useLocationFormBuilder;
