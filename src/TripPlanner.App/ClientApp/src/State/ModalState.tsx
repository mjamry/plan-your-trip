import { atom, selector } from 'recoil';

const enum ModalTypes {
  addLocation,
  editLocation,
  loading,
  removeLocation,
  addPlan,
  editPlan,
  removePlan,
  sharePlan,
}

type ModalState = {
  type?: ModalTypes;
  data?: any;
  isVisible?: boolean;
}

const modalState = atom<ModalState>({
  key: 'modalState',
  default: { type: undefined, data: undefined },
});

const showModalState = selector<ModalState>({
  key: 'modalState.show',
  get: ({ get }) => get(modalState),
  set: ({ set }, value) => {
    set(modalState, { ...value, isVisible: true });
  },
});

const hideModalState = selector<ModalState>({
  key: 'modalState.hide',
  get: ({ get }) => get(modalState),
  set: ({ set }) => {
    set(modalState, { type: undefined, data: undefined, isVisible: false });
  },
});

const updateModalState = selector<ModalState>({
  key: 'modalState.update',
  get: ({ get }) => get(modalState),
  set: ({ set }, value) => {
    set(modalState, { ...value, isVisible: true });
  },
});

export {
  modalState, ModalTypes, showModalState, hideModalState, updateModalState,
};
