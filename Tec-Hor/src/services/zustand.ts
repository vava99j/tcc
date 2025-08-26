import { create } from 'zustand';

type Store = {
  hor: string;
  setHor: (valor: string) => void;
};



export const useStore = create<Store>((set) => ({
  hor: '',
  setHor: (valor: string) => set(() => ({ hor: valor })),
}));
