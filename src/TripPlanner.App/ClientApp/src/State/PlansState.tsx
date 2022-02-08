import React, { createContext, useContext, useReducer } from 'react';
import PlanDto from '../Common/Dto/PlanDto';

const enum PlanViewType {
  grid,
  list,
}

const enum PlansStateActions {
  selectPlan,
  loadPlans,
  setView,
  addPlan,
  editPlan,
  removePlan,
  isLoading,
}

type State = {
  plans: PlanDto[],
  selectedPlanId: number,
  view: PlanViewType,
  isLoading: boolean,
}

type Action =
  | { type: PlansStateActions.selectPlan, data: number }
  | { type: PlansStateActions.loadPlans, data: PlanDto[] }
  | { type: PlansStateActions.removePlan, data: PlanDto }
  | { type: PlansStateActions.editPlan, data: PlanDto }
  | { type: PlansStateActions.addPlan, data: PlanDto }
  | { type: PlansStateActions.setView, data: PlanViewType }
  | { type: PlansStateActions.isLoading, data: boolean }

type Dispatch = (action: Action) => void;

const initialState: State = {
  plans: [],
  selectedPlanId: 0,
  view: PlanViewType.grid,
  isLoading: false,
};

const reducer: React.Reducer<State, Action> = (state: State, action: Action) => {
  let newState: State = state;

  switch (action.type) {
    case PlansStateActions.selectPlan:
      newState = { ...state, selectedPlanId: action.data };
      break;
    case PlansStateActions.loadPlans:
      newState = { ...state, plans: action.data };
      break;
    case PlansStateActions.removePlan:
      const updatedPlans = state.plans.filter((l) => l.id !== action.data.id) || [];
      newState = { ...state, plans: updatedPlans, selectedPlanId: updatedPlans[0].id };
      break;
    case PlansStateActions.editPlan:
      const editedItemIndex = state.plans.findIndex((l) => l.id === action.data.id);
      const newArray = [...state.plans];
      newArray[editedItemIndex] = action.data;
      newState = { ...state, plans: newArray };
      break;
    case PlansStateActions.addPlan:
      newState = { ...state, plans: [...state.plans, action.data] };
      break;
    case PlansStateActions.setView:
      newState = { ...state, view: action.data };
      break;
    case PlansStateActions.isLoading:
      newState = { ...state, isLoading: action.data };
      break;
    default:
      break;
  }

  return newState;
};

const PlansStateContext = createContext<{state: State, dispatch: Dispatch}>(
  {
    state: initialState,
    dispatch: () => undefined,
  },
);

const usePlansState = () => useContext(PlansStateContext);

type Props = {
  children: JSX.Element
}

function PlansStateProvider({ children }: Props) {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(reducer, initialState);

  return (
    <PlansStateContext.Provider value={{ state, dispatch }}>
      {children}
    </PlansStateContext.Provider>
  );
}

export {
  PlansStateProvider, PlansStateActions, usePlansState, PlanViewType,
};
