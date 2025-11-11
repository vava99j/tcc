import { create } from 'zustand';

type IdUser = {
  id: string;
  setId: (valor: string) => void;
};



export const useId = create<IdUser>((set) => ({
  id: '',
  setId: (valor: string) => set(() => ({ id: valor })),
}));
