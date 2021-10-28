import { LocationDetailsStep, LocationDetailsStepValidator } from './LocationDetailsStep';
import { LocationCoordinatesStep, LocationCoordinatesStepValidator } from './LocationCoordinatesStep';
import { LocationImageStep, LocationImageStepValidator } from './LocationImageStep';
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
