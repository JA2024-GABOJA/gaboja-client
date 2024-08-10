import { create } from "zustand";

type State = {
	min: number;
	setMin: (newValue: number) => void;
};

export const useMinStore = create<State>((set) => ({
	min: 60,
	setMin: (newValue) => set({ min: newValue }),
}));
