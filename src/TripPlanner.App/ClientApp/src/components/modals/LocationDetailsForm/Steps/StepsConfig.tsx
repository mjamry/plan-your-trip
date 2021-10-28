import { LocationDetailsStep, LocationDetailsStepValidator } from './../Steps/LocationDetailsStep';
import { LocationCoordinatesStep, LocationCoordinatesStepValidator } from './../Steps/LocationCoordinatesStep';
import { LocationImageStep, LocationImageStepValidator } from './../Steps/LocationImageStep';
import { Step } from './Step';

const StepsConfiguration: Step[] = [
  {
    title: 'Fill location details',
    view: LocationDetailsStep,
    validator: LocationDetailsStepValidator(),
  },
  {
    title: 'Find GPS coordinates',
    view: LocationCoordinatesStep,
    validator: LocationCoordinatesStepValidator(),
  },
  {
    title: 'Setup image URL',
    view: LocationImageStep,
    validator: LocationImageStepValidator(),
  },
];

export default StepsConfiguration;