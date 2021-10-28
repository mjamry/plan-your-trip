import React from 'react';
import { LocationFormStateProvider } from './LocationDetailsFormState';
import ModalHeader from '../ModalHeader';

import { ModalDto } from '../../../Common/Dto/ModalDto';
import { Location } from '../../../Common/Dto/Location';
import LocationDetailsFormBody from './LocationDetailsFormBody';
import LocationDetailsFooter from './LocationDetailsFormFooter';

type BuilderDto = {
  title: string;
  location: Location;
  onSubmit: (location: Location) => void;
  onCancel?: () => void;
}

const useLocationFormBuilder = () => {
  const build = (data: BuilderDto): ModalDto<typeof LocationFormStateProvider> => ({
    header: <ModalHeader title={data.title} />,
    body: <LocationDetailsFormBody location={data.location} />,
    footer: <LocationDetailsFooter onSubmit={data.onSubmit} />,
    state: LocationFormStateProvider,
  });

  return build;
};

export default useLocationFormBuilder;
