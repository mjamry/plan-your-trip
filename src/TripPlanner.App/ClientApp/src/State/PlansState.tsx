import { atom, selectorFamily } from 'recoil';
import PlanDto from '../Common/Dto/PlanDto';

const enum PlansStateActions {
  addPlan,
  editPlan,
  removePlan,
}

const handlePlansStateAction = (
  action: PlansStateActions,
  state: PlanDto[],
  data: PlanDto,
) => {
  let newState: PlanDto[] = state;

  switch (action) {
    case PlansStateActions.removePlan:
      const updatedPlans = state.filter((l) => l.id !== data.id) || [];
      newState = [...state, ...updatedPlans];
      break;
    case PlansStateActions.editPlan:
      const editedItemIndex = state.findIndex((l) => l.id === data.id);
      const newArray = [...state];
      newArray[editedItemIndex] = data;
      newState = [...state, ...newArray];
      break;
    case PlansStateActions.addPlan:
      newState = [...state, data];
      break;
    default:
      break;
  }

  return newState;
};

const isPlanLoadingState = atom<boolean>({
  key: 'plansState.isPlanLoading',
  default: false,
});

const plansState = atom<PlanDto[]>({
  key: 'plansState',
  default: [],
});

const selectedPlanIdState = atom<number>({
  key: 'plansState.selectedPlanId',
  default: 0,
});

const modifyPlansState = selectorFamily<PlanDto[], PlansStateActions>({
  key: 'plansState.modifyPlansState',
  get: () => ({ get }) => get(plansState),
  set: (action) => ({ set, get }, value) => {
    const state = get(plansState);
    const newState = handlePlansStateAction(action, state, value[0]);
    set(plansState, newState);
  },
});

export {
  isPlanLoadingState,
  plansState,
  selectedPlanIdState,
  modifyPlansState,
  PlansStateActions,
};
