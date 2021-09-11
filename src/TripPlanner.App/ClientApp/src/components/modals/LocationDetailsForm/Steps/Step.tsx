import React from 'react';
import { Location } from '../../../../Common/Dto/Location';

export interface IStepValidator {
  validate: (location: Location) => boolean;
}

export type Step = {
  title: string;
  view: React.ComponentType;
  validator: IStepValidator;
}
