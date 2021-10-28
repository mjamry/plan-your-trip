import React from 'react';
import LocationDto from '../../../../Common/Dto/LocationDto';

export interface IStepValidator {
  validate: (location: LocationDto) => boolean;
}

export type Step = {
  title: string;
  view: React.ComponentType;
  validator: IStepValidator;
}
