import { atom, selectorFamily } from 'recoil';
import LocationDto, { LocationEmpty } from '../../../Common/Dto/LocationDto';
import { Nullable } from '../../../Common/Dto/Nullable';

type Error = {
  [name: string]: string;
}

const enum LocationFormStateActions {
  setError,
  clearError
}

const locationFormStepState = atom<number>({
  key: 'locationForm.step',
  default: 0,
});

const locationFormErrorState = atom<Nullable<Error>>({
  key: 'locationForm.error',
  default: undefined,
});

const locationFormDataState = atom<LocationDto>({
  key: 'locationForm.data',
  default: LocationEmpty,
});

const updateError = selectorFamily<Nullable<Error>, LocationFormStateActions>({
  key: 'locationsForm.updateError',
  get: () => ({ get }) => get(locationFormErrorState),
  set: (action) => ({ set }, value) => {
    if (value instanceof Error) {
      if (action === LocationFormStateActions.setError) {
        set(locationFormErrorState, value);
      } else if (action === LocationFormStateActions.clearError) {
        set(locationFormErrorState, undefined);
      }
    }
  },

});

export {
  locationFormDataState, locationFormErrorState, locationFormStepState, updateError,
};
