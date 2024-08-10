import { create } from 'zustand';

type State = {
  min: number;
  setMin: (newValue: number) => void;
};

export const useMinStore = create<State>((set) => ({
  min: 0,
  setMin: (newValue) => set({ min: newValue }),
}));
