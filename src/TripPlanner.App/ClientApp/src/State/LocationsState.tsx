import {
  atom, selectorFamily,
} from 'recoil';
import LocationDto from '../Common/Dto/LocationDto';

import { Nullable } from '../Common/Dto/Nullable';

const enum LocationsStateActions {
  addLocation,
  removeLocation,
  editLocation,
  removeAllLocations,
}

const handleLocationsStateAction = (
  action: LocationsStateActions,
  state: LocationDto[],
  data: LocationDto,
): LocationDto[] => {
  let newState: LocationDto[] = state;

  switch (action) {
    case LocationsStateActions.addLocation:
      newState = [...state, data];
      break;
    case LocationsStateActions.removeLocation:
      const updatedLocations = state.filter((l) => l.id !== data.id) || [];
      newState = updatedLocations;
      break;
    case LocationsStateActions.editLocation:
      const editedItemIndex = state.findIndex((l) => l.id === data.id);
      const newArray = [...state];
      newArray[editedItemIndex] = data;
      newState = newArray;
      break;
    case LocationsStateActions.removeAllLocations:
      newState = [];
      break;
    default:
      break;
  }

  return newState;
};

const locationsState = atom<LocationDto[]>({
  key: 'locationsState.locations',
  default: [],
});

const locationSelectedOnMap = atom<Nullable<LocationDto>>({
  key: 'locationState.selectedOnMap',
  default: undefined,
});

const isLoadingState = atom<boolean>({
  key: 'locationsState.isLoading',
  default: false,
});

const modifyLocationsState = selectorFamily<LocationDto[], LocationsStateActions>({
  key: 'locationState.addLocation',
  get: () => ({ get }) => get(locationsState),
  set: (action) => ({ get, set }, value) => {
    const state = get(locationsState);
    const newState = handleLocationsStateAction(action, state, value[0]);
    set(locationsState, newState);
  },

});

export {
  locationsState,
  isLoadingState,
  locationSelectedOnMap,
  modifyLocationsState,
  LocationsStateActions,
};
