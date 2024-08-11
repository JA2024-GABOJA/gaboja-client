import { create } from 'zustand';

type State = {
  min: number;
  setMin: (newValue: number) => void;
};

export const useMinStore = create<State>((set) => ({
  min: 60,
  setMin: (newValue) => set({ min: newValue }),
}));

type ModalState = {
  modal: {
    type: 'destination' | 'target';
    id?: number;
  } | null;
  openModal: (newValue: {
    type: 'destination' | 'target';
    id?: number;
  }) => void;
  onCloseModal: () => void;
};

export const useModalState = create<ModalState>((set) => ({
  modal: null,
  openModal: (newValue) => set({ modal: newValue }),
  onCloseModal: () =>
    set({
      modal: null,
    }),
}));
